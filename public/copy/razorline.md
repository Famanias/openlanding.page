<template slug="razorline" name="RAZORLINE">
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
    <file path="src/app/(razorline)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./razorline/razorline.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RAZORLINE — RL-01 Performance Footwear",
  description:
    "Uncompromising velocity. Engineered rebellion. Direct-to-consumer launch flagship for the RAZORLINE RL-01 performance running series.",
  openGraph: {
    title: "RAZORLINE — RL-01 Performance Footwear",
    description:
      "Uncompromising velocity. Engineered rebellion. Direct-to-consumer launch flagship for the RAZORLINE RL-01 performance running series.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0B0A",
  colorScheme: "dark",
};

export default function RazorlineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-[#0B0B0A] text-[#F1F0E9] antialiased selection:bg-[#D3FF35] selection:text-[#0B0B0A] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(razorline)/razorline/assets.generated.ts">
<![CDATA[// Generated asset inventory for RAZORLINE
export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(razorline)/razorline/assets.tsx">
<![CDATA[import React from "react";
import { ASSETS } from "./assets.generated";

const BASE = "/templates/razorline";

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
        className={`rzl-placeholder ${className ?? ""}`}
        role="img"
        aria-label={alt}
        data-asset={assetKey}
      >
        <span className="font-mono-tech">{assetKey}</span>
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
    <file path="src/app/(razorline)/razorline/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="8" fill="#0B0B0A"/>
  <g transform="translate(14, 18)">
    <path d="M3 4H21L27 10.5L19.5 16.5H11L18.5 10.5H8L3 4Z" fill="#F1F0E9"/>
    <path d="M9 14.5L2.5 24H10.5L15.5 17.5L22.5 25.5H30.5L20.5 14.5H9Z" fill="#F1F0E9"/>
    <path d="M25.5 4L33.5 11.5L28.5 15.5L31 11L23.5 4H25.5Z" fill="#D3FF35"/>
  </g>
</svg>
]]>
    </file>
    <file path="src/app/(razorline)/razorline/opengraph-image.tsx">
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
        background: "#0B0B0A",
        color: "#F1F0E9",
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
          color: "#D3FF35",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#D3FF35",
            color: "#0B0B0A",
            fontWeight: "bold",
            fontSize: 22,
          }}
        >
          //
        </div>
        RAZORLINE
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: 1,
            color: "#F1F0E9",
          }}
        >
          RAZORLINE — RL-01 PERFORMANCE FOOTWEAR
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#777A7A",
            maxWidth: 960,
            lineHeight: 1.4,
          }}
        >
          Uncompromising velocity. Engineered rebellion. Direct-to-consumer launch flagship for the RAZORLINE RL-01 performance running series.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(241,240,233,0.12)",
          paddingTop: 24,
          fontSize: 18,
          color: "#777A7A",
          letterSpacing: 2,
        }}
      >
        <span>LAUNCH EDITION // RL-01 SERIES</span>
        <span style={{ color: "#D3FF35" }}>ACCEL // 9.8m/s² · LAT 45.10</span>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(razorline)/razorline/page.tsx">
<![CDATA["use client";

import RazorlineApp from "./RazorlineApp";

export default function RazorlinePage() {
  return <RazorlineApp />;
}
]]>
    </file>
    <file path="src/app/(razorline)/razorline/razorline.css">
<![CDATA[@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

@layer base {
  :root {
    --carbon: #0B0B0A;
    --chalk: #F1F0E9;
    --lime: #D3FF35;
    --cobalt: #375CFF;
    --steel: #777A7A;
    --font-display: var(--font-display, 'Barlow Condensed', 'Impact', 'Arial Narrow', sans-serif);
    --font-sans: var(--font-sans, 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif);
    --font-mono: var(--font-mono, 'JetBrains Mono', monospace);
  }

  body {
    background-color: #0B0B0A;
    color: #F1F0E9;
    font-family: var(--font-sans);
    overflow-x: hidden;
  }
}

.font-display {
  font-family: var(--font-display);
}

.font-mono-tech {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}

/* Slanted Hero Display Headline matching reference geometry */
.hero-headline-word {
  font-family: var(--font-display);
  font-weight: 900;
  font-style: italic;
  text-transform: uppercase;
  line-height: 0.84;
  letter-spacing: -0.02em;
  transform: skewX(-6deg);
  display: inline-block;
}

/* Slanted Parallelogram CTA clip */
.clip-slant-cta {
  clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
}

.clip-slant-card {
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
}

.clip-diagonal-frame {
  clip-path: polygon(0 0, 100% 0, 96% 100%, 0% 100%);
}

/* Architectural Blueprint Grid & Halftone Matrix */
.bg-blueprint-grid {
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgba(241, 240, 233, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(241, 240, 233, 0.04) 1px, transparent 1px);
}

.bg-halftone-dots {
  background-image: radial-gradient(rgba(241, 240, 233, 0.22) 1.25px, transparent 1.25px);
  background-size: 9px 9px;
}

/* Opening Choreographed Keyframes (0 - 1800ms) */
@keyframes maskSlideReveal {
  0% {
    clip-path: inset(0 100% 0 0);
    transform: translateX(-28px) skewX(-10deg);
  }
  100% {
    clip-path: inset(0 0% 0 0);
    transform: translateX(0) skewX(-6deg);
  }
}

@keyframes slashShoot {
  0% {
    clip-path: inset(100% 100% 0 0);
    transform: translate(-36px, 36px) scale(0.92);
  }
  100% {
    clip-path: inset(0 0 0 0);
    transform: translate(0, 0) scale(1);
  }
}

@keyframes shoeLaunchSettle {
  0% {
    opacity: 0;
    transform: translate(42px, 28px) rotate(-4deg) scale(0.94);
  }
  68% {
    opacity: 1;
    transform: translate(-6px, -5px) rotate(1.2deg) scale(1.015);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
}

@keyframes orbitTrace {
  0% {
    stroke-dashoffset: 1400;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes subtleFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
}

.animate-mask-word-1 {
  animation: maskSlideReveal 680ms cubic-bezier(0.16, 1, 0.3, 1) 80ms both;
}
.animate-mask-word-2 {
  animation: maskSlideReveal 680ms cubic-bezier(0.16, 1, 0.3, 1) 230ms both;
}
.animate-mask-word-3 {
  animation: maskSlideReveal 680ms cubic-bezier(0.16, 1, 0.3, 1) 380ms both;
}
.animate-slash-shoot {
  animation: slashShoot 620ms cubic-bezier(0.16, 1, 0.3, 1) 260ms both;
}
.animate-shoe-enter {
  animation: shoeLaunchSettle 950ms cubic-bezier(0.16, 1, 0.3, 1) 340ms both;
}
.animate-orbit-trace {
  stroke-dasharray: 1400;
  animation: orbitTrace 1350ms cubic-bezier(0.16, 1, 0.3, 1) 420ms both;
}
.animate-shoe-idle {
  animation: subtleFloat 5.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
]]>
    </file>
    <file path="src/app/(razorline)/razorline/RazorlineApp.tsx">
<![CDATA["use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { RL01_COLLECTION, ProductModel } from './data/catalog';
import {
  BagItem,
  addToBag,
  updateBagQuantity,
  calculateBagTotals
} from './utils/storeLogic';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeStrip } from './components/MarqueeStrip';
import { CollectionSection } from './components/CollectionSection';
import { BreakawaySection } from './components/BreakawaySection';
import { TechnologySection } from './components/TechnologySection';
import { AthletesSection } from './components/AthletesSection';
import { LookbookSection } from './components/LookbookSection';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { LaunchCtaFooter } from './components/LaunchCtaFooter';

export default function RazorlineApp() {
  const [activeHeroModel, setActiveHeroModel] = useState<ProductModel>(RL01_COLLECTION[0]);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({
    'rl01-voltage': 10.0,
    'rl01-cobalt': 10.0,
    'rl01-shadow': 10.5
  });
  const [bagItems, setBagItems] = useState<BagItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [quickViewModel, setQuickViewModel] = useState<ProductModel | null>(null);

  const bagTotals = useMemo(() => calculateBagTotals(bagItems), [bagItems]);

  const handleSelectSize = (modelId: string, size: number) => {
    setSelectedSizes((prev) => ({ ...prev, [modelId]: size }));
  };

  const handleAddToBag = (model: ProductModel, size: number) => {
    setBagItems((prev) => addToBag(prev, model, size, 1));
    setBagOpen(true);
  };

  const handleUpdateQty = (key: string, delta: number) => {
    setBagItems((prev) => updateBagQuantity(prev, key, delta));
  };

  const handleClearBag = () => {
    setBagItems([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0A] text-[#F1F0E9] flex flex-col">
      <Navbar
        bagCount={bagTotals.itemCount}
        onOpenBag={() => setBagOpen(true)}
        onShopNow={() => scrollToSection('footwear')}
      />

      <main className="flex-1">
        <HeroSection
          models={RL01_COLLECTION}
          activeHeroModel={activeHeroModel}
          onSelectHeroModel={setActiveHeroModel}
          onExploreCollection={() => scrollToSection('footwear')}
          onDiscoverTech={() => scrollToSection('technology')}
          onQuickInspect={(model) => setQuickViewModel(model)}
        />

        <MarqueeStrip />

        <CollectionSection
          models={RL01_COLLECTION}
          selectedSizes={selectedSizes}
          onSelectSize={handleSelectSize}
          onAddToBag={handleAddToBag}
          onOpenQuickView={(model) => setQuickViewModel(model)}
        />

        <BreakawaySection />

        <TechnologySection />

        <AthletesSection />

        <LookbookSection />

        <LaunchCtaFooter
          onExploreCollection={() => scrollToSection('footwear')}
        />
      </main>

      <QuickViewModal
        model={quickViewModel}
        selectedSize={
          quickViewModel ? selectedSizes[quickViewModel.id] ?? 10.0 : 10.0
        }
        onSelectSize={handleSelectSize}
        onAddToBag={handleAddToBag}
        onClose={() => setQuickViewModel(null)}
      />

      <CartDrawer
        isOpen={bagOpen}
        items={bagItems}
        totals={bagTotals}
        onUpdateQty={handleUpdateQty}
        onClearBag={handleClearBag}
        onClose={() => setBagOpen(false)}
      />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(razorline)/razorline/components/AthletesSection.tsx">
<![CDATA["use client";

import React from 'react';
import { ATHLETE_STORIES } from '../data/catalog';

export const AthletesSection: React.FC = () => {
  return (
    <section
      id="athletes"
      aria-labelledby="athletes-heading"
      className="relative w-full py-20 lg:py-28 scroll-mt-20 lg:scroll-mt-24 bg-[#0B0B0A] border-b border-[#F1F0E9]/10"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 lg:mb-18 border-b border-[#F1F0E9]/15 pb-8">
          <div>
            <div className="font-mono-tech text-xs tracking-[0.16em] text-[#D3FF35] uppercase mb-2">
              04. FIELD TELEMETRY · FICTIONAL TEST PERSONAS
            </div>
            <h2
              id="athletes-heading"
              className="font-display italic font-black text-[clamp(2.5rem,5vw,4.25rem)] text-[#F1F0E9] uppercase leading-[0.92]"
            >
              MOVEMENT STORIES
            </h2>
          </div>
          <p className="text-[#777A7A] text-sm sm:text-base max-w-md leading-relaxed">
            Built for unsanctioned night miles, wet tarmac intervals, and relentless tempo blocks. Editorial test logs from fictional Razorline development runners.
          </p>
        </div>

        {/* Staggered Editorial Story Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {ATHLETE_STORIES.map((story, idx) => (
            <article
              key={story.id}
              className={`bg-[#111210] border border-[#F1F0E9]/15 flex flex-col justify-between p-6 sm:p-8 ${
                idx === 1 ? 'lg:translate-y-6' : ''
              }`}
            >
              <div>
                {/* Top Numbered Frame Header */}
                <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-[#F1F0E9]/10">
                  <span className="font-display italic font-black text-3xl text-[#D3FF35]">
                    FRAME {story.frameNumber}
                  </span>
                  <span className="font-mono-tech text-[11px] text-[#777A7A] uppercase">
                    {story.location}
                  </span>
                </div>

                {/* Product / Action Visual Frame */}
                <div className="relative h-48 mb-6 bg-[#0B0B0A] border border-[#F1F0E9]/10 overflow-hidden flex items-center justify-center p-4 bg-blueprint-grid">
                  <img
                    src={story.image}
                    alt={`${story.athleteName} test shoe ${story.modelUsed}`}
                    width={640}
                    height={500}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-[82%] h-auto object-contain"
                  />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between font-mono-tech text-[10px] text-[#F1F0E9]/75 bg-[#0B0B0A]/85 px-2.5 py-1">
                    <span>{story.sessionData}</span>
                  </div>
                </div>

                {/* Typographic Pull Quote */}
                <blockquote className="font-display italic font-bold text-2xl sm:text-[26px] leading-[1.08] text-[#F1F0E9] uppercase mb-4">
                  {story.quote}
                </blockquote>

                <p className="text-[#F1F0E9]/75 text-sm leading-relaxed mb-6">
                  {story.narrative}
                </p>
              </div>

              {/* Persona Attribution Footer */}
              <div className="pt-4 border-t border-[#F1F0E9]/10 flex items-center justify-between gap-4">
                <div>
                  <div className="font-display italic font-extrabold text-xl text-[#F1F0E9] uppercase">
                    {story.athleteName}
                  </div>
                  <div className="text-xs text-[#777A7A]">{story.discipline}</div>
                </div>
                <span
                  className={`font-mono-tech text-[11px] font-semibold uppercase ${
                    story.accentColor === 'lime' ? 'text-[#D3FF35]' : 'text-[#375CFF]'
                  }`}
                >
                  {story.modelUsed}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(razorline)/razorline/components/BreakawaySection.tsx">
<![CDATA["use client";

import React from 'react';
import { BREAKAWAY_FEATURES } from '../data/catalog';

export const BreakawaySection: React.FC = () => {
  return (
    <section
      aria-labelledby="breakaway-heading"
      className="relative w-full py-20 lg:py-28 bg-[#0B0B0A] border-b border-[#F1F0E9]/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-14 lg:mb-18">
          <div className="lg:col-span-7">
            <div className="font-mono-tech text-xs tracking-[0.16em] text-[#375CFF] uppercase mb-2">
              02. STRUCTURAL ANATOMY · MACRO BREAKDOWN
            </div>
            <h2
              id="breakaway-heading"
              className="font-display italic font-black text-[clamp(2.5rem,5.2vw,4.5rem)] text-[#F1F0E9] uppercase leading-[0.9]"
            >
              BUILT FOR THE <span className="text-[#D3FF35]">BREAKAWAY.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[#F1F0E9]/75 text-base leading-relaxed">
              Every gram on the RL-01 earns its place through mechanical structure rather than decorative padding. Three core assemblies work together from heel touch to toe-off.
            </p>
          </div>
        </div>

        {/* 3 Editorial Macro Feature Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {BREAKAWAY_FEATURES.map((feat) => (
            <article
              key={feat.index}
              className="group bg-[#111210] border border-[#F1F0E9]/15 flex flex-col justify-between overflow-hidden"
            >
              {/* Macro Photography Frame */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#0B0B0A] border-b border-[#F1F0E9]/10">
                <img
                  src={feat.image}
                  alt={feat.imageAlt}
                  width={600}
                  height={420}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-transparent to-transparent opacity-85" />

                {/* Top-left index & kicker */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="font-mono-tech text-xs font-bold text-[#D3FF35] bg-[#0B0B0A]/85 px-2.5 py-1 border border-[#D3FF35]/30">
                    {feat.index}. {feat.kicker}
                  </span>
                </div>

                {/* Bottom-left large data readout */}
                <div className="absolute bottom-4 left-5 right-5 flex items-baseline justify-between">
                  <span className="font-display italic font-black text-4xl sm:text-5xl text-[#F1F0E9] tracking-tight">
                    {feat.metric}
                  </span>
                  <span className="font-mono-tech text-xs text-[#D3FF35] uppercase tracking-wider">
                    {feat.unit}
                  </span>
                </div>
              </div>

              {/* Copy Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display italic font-extrabold text-2xl sm:text-3xl text-[#F1F0E9] uppercase tracking-tight mb-3">
                    {feat.index}. {feat.title}
                  </h3>
                  <p className="text-[#F1F0E9]/80 text-sm sm:text-[15px] leading-relaxed mb-6">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F1F0E9]/10 font-mono-tech text-[11px] text-[#777A7A]">
                  {feat.specNote}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(razorline)/razorline/components/CartDrawer.tsx">
<![CDATA["use client";

import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, CheckCircle2, ArrowRight } from 'lucide-react';
import { BagItem, BagTotals } from '../utils/storeLogic';

interface CartDrawerProps {
  isOpen: boolean;
  items: BagItem[];
  totals: BagTotals;
  onUpdateQty: (key: string, delta: number) => void;
  onClearBag: () => void;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  totals,
  onUpdateQty,
  onClearBag,
  onClose
}) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setOrderConfirmed(false);
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDemoCheckout = () => {
    setOrderConfirmed(true);
    onClearBag();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bag-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-[#0B0B0A]/80 backdrop-blur-xs"
    >
      <div className="w-full max-w-md bg-[#111210] border-l border-[#F1F0E9]/20 h-full flex flex-col justify-between">
        {/* Drawer Header */}
        <div className="px-6 py-5 bg-[#0B0B0A] border-b border-[#F1F0E9]/15 flex items-center justify-between">
          <div>
            <h2
              id="bag-drawer-title"
              className="font-display italic font-black text-2xl text-[#F1F0E9] uppercase tracking-tight"
            >
              YOUR BAG ({totals.itemCount})
            </h2>
            <p className="font-mono-tech text-[11px] text-[#777A7A]">
              FICTIONAL DEMO STOREFRONT · NO REAL CHARGE
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="w-9 h-9 border border-[#F1F0E9]/20 hover:border-[#D3FF35] text-[#F1F0E9] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          {orderConfirmed ? (
            <div
              data-testid="demo-order-confirmation"
              className="border border-[#D3FF35] bg-[#0B0B0A] p-6 space-y-4"
            >
              <CheckCircle2 className="w-8 h-8 text-[#D3FF35]" />
              <div className="font-mono-tech text-xs text-[#D3FF35] uppercase">
                ORDER #RL-1042 CONFIRMED (DEMO)
              </div>
              <h3 className="font-display italic font-black text-2xl text-[#F1F0E9] uppercase">
                ALLOCATION RESERVED
              </h3>
              <p className="text-sm text-[#F1F0E9]/75 leading-relaxed">
                This is a fictional RAZORLINE product demonstration. Your simulated RL-01 order has been logged with zero payment transmission.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="w-full h-11 bg-[#D3FF35] text-[#0B0B0A] font-display italic font-black text-base uppercase cursor-pointer"
              >
                RETURN TO STOREFRONT
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <p className="font-display italic font-bold text-2xl text-[#F1F0E9]/60 uppercase mb-2">
                YOUR BAG IS EMPTY
              </p>
              <p className="text-sm text-[#777A7A] max-w-xs mb-6">
                Select a size from the RL-01 Collection to configure your pair.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-6 h-11 bg-[#D3FF35] text-[#0B0B0A] font-display italic font-black text-sm uppercase tracking-wider cursor-pointer"
              >
                EXPLORE RL-01 MODELS
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.key}
                  data-testid={`bag-item-${item.key}`}
                  className="bg-[#0B0B0A] border border-[#F1F0E9]/15 p-4 flex gap-4 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={75}
                    referrerPolicy="no-referrer"
                    className="w-20 h-16 object-contain bg-[#111210] p-1 border border-[#F1F0E9]/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display italic font-black text-lg text-[#F1F0E9] uppercase truncate">
                        {item.name}
                      </h3>
                      <span className="font-mono-tech text-sm font-bold text-[#D3FF35]">
                        ${item.unitPrice * item.quantity}
                      </span>
                    </div>
                    <div className="font-mono-tech text-xs text-[#777A7A] mb-3">
                      SIZE: US {item.size.toFixed(1)} · ${item.unitPrice} EA
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.key, -1)}
                        aria-label={`Decrease quantity for ${item.name} US ${item.size.toFixed(1)}`}
                        className="w-7 h-7 border border-[#F1F0E9]/25 hover:border-[#D3FF35] text-[#F1F0E9] flex items-center justify-center cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span
                        data-testid={`bag-qty-${item.key}`}
                        className="font-mono-tech text-xs font-bold w-6 text-center text-[#F1F0E9]"
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.key, 1)}
                        aria-label={`Increase quantity for ${item.name} US ${item.size.toFixed(1)}`}
                        className="w-7 h-7 border border-[#F1F0E9]/25 hover:border-[#D3FF35] text-[#F1F0E9] flex items-center justify-center cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && !orderConfirmed && (
          <div className="p-6 bg-[#0B0B0A] border-t border-[#F1F0E9]/15 space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between font-mono-tech text-xs text-[#777A7A]">
                <span>EXPRESS DISPATCH</span>
                <span>{totals.shippingLabel}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-[#F1F0E9]/10">
                <span className="font-mono-tech text-xs text-[#F1F0E9] uppercase">
                  DEMO SUBTOTAL
                </span>
                <span
                  data-testid="bag-subtotal"
                  className="font-mono-tech text-2xl font-bold text-[#D3FF35]"
                >
                  ${totals.subtotal}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDemoCheckout}
              className="w-full h-12 bg-[#D3FF35] hover:bg-[#e1ff66] text-[#0B0B0A] font-display italic font-black text-lg tracking-[0.08em] uppercase flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>COMPLETE DEMO ORDER</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(razorline)/razorline/components/CollectionSection.tsx">
<![CDATA["use client";

import React, { useState } from 'react';
import { Eye, Plus, Check } from 'lucide-react';
import { ProductModel, US_SHOE_SIZES } from '../data/catalog';

interface CollectionSectionProps {
  models: ProductModel[];
  selectedSizes: Record<string, number>;
  onSelectSize: (modelId: string, size: number) => void;
  onAddToBag: (model: ProductModel, size: number) => void;
  onOpenQuickView: (model: ProductModel) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  models,
  selectedSizes,
  onSelectSize,
  onAddToBag,
  onOpenQuickView
}) => {
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const handleAddClick = (model: ProductModel) => {
    const chosenSize = selectedSizes[model.id] ?? 10.0;
    onAddToBag(model, chosenSize);
    setRecentlyAddedId(model.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === model.id ? null : prev));
    }, 1200);
  };

  return (
    <section
      id="footwear"
      aria-labelledby="collection-heading"
      className="relative w-full py-20 lg:py-28 scroll-mt-20 lg:scroll-mt-24 bg-[#0B0B0A] border-b border-[#F1F0E9]/10"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16 border-b border-[#F1F0E9]/15 pb-8">
          <div>
            <div className="font-mono-tech text-xs tracking-[0.16em] text-[#D3FF35] uppercase mb-2">
              01. LAUNCH ARCHIVE · THREE CONFIGURATIONS
            </div>
            <h2
              id="collection-heading"
              className="font-display italic font-black text-[clamp(2.5rem,5vw,4.25rem)] tracking-[-0.01em] text-[#F1F0E9] uppercase leading-[0.92]"
            >
              THE RL-01 COLLECTION
            </h2>
          </div>
          <p className="text-[#777A7A] text-sm sm:text-base max-w-md leading-relaxed">
            Three sculpted finishes built on the identical hollow-chamber propulsion platform. Select your US size directly on any colorway or inspect full chassis geometry.
          </p>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {models.map((model, index) => {
            const currentSize = selectedSizes[model.id] ?? 10.0;
            const isAdded = recentlyAddedId === model.id;

            return (
              <article
                key={model.id}
                data-testid={`product-card-${model.id}`}
                className="group relative bg-[#111210] border border-[#F1F0E9]/15 hover:border-[#D3FF35]/70 transition-colors duration-200 flex flex-col justify-between"
              >
                {/* Top Card Header Bar */}
                <div className="p-6 pb-0 flex items-center justify-between gap-4">
                  <span className="font-mono-tech text-xs tracking-[0.14em] text-[#777A7A] uppercase">
                    0{index + 1} · {model.code}
                  </span>
                  <span className="font-mono-tech text-xs tracking-[0.08em] text-[#F1F0E9]/70">
                    {model.weightGrams}G · {model.dropMm}MM DROP
                  </span>
                </div>

                {/* Product Image Stage (65-70% visual dominance) */}
                <div className="relative h-64 sm:h-72 px-6 py-4 flex items-center justify-center overflow-hidden bg-blueprint-grid my-2">
                  {/* Subtle Diagonal Accent Line */}
                  <div
                    aria-hidden="true"
                    style={{ backgroundColor: model.accentHex }}
                    className="pointer-events-none absolute w-48 h-[2px] -rotate-28 opacity-35 group-hover:opacity-80 group-hover:w-64 transition-all duration-300"
                  />

                  <img
                    src={model.heroImage}
                    alt={model.altText}
                    width={640}
                    height={500}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="relative z-10 w-[88%] max-h-60 object-contain transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-1"
                  />

                  <button
                    type="button"
                    onClick={() => onOpenQuickView(model)}
                    aria-label={`Quick view specifications for ${model.name}`}
                    className="absolute bottom-3 right-4 z-20 inline-flex items-center gap-1.5 bg-[#0B0B0A]/90 border border-[#F1F0E9]/25 hover:border-[#D3FF35] text-[#F1F0E9] hover:text-[#D3FF35] px-3 py-1.5 font-mono-tech text-[11px] tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>QUICK SPEC</span>
                  </button>
                </div>

                {/* Product Metadata & Interactive Size Matrix */}
                <div className="p-6 pt-4 flex-1 flex flex-col justify-between border-t border-[#F1F0E9]/10">
                  <div>
                    {/* Quiet 1-line unboxed kicker */}
                    <div className="text-xs text-[#777A7A] mb-1.5 flex items-center gap-2">
                      <span>{model.colorway}</span>
                    </div>

                    {/* Title & Tabular Price */}
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3 className="font-display italic font-black text-3xl tracking-tight text-[#F1F0E9] uppercase group-hover:text-[#D3FF35] transition-colors">
                        {model.name}
                      </h3>
                      <div className="text-right shrink-0">
                        <span className="font-mono-tech text-xl font-bold text-[#F1F0E9]">
                          ${model.price}
                        </span>
                        <span className="block font-mono-tech text-[10px] text-[#777A7A] uppercase">
                          DEMO USD
                        </span>
                      </div>
                    </div>

                    <p className="text-[#F1F0E9]/75 text-sm leading-relaxed mb-5">
                      {model.tagline}
                    </p>

                    {/* Interactive Size Selector Chips */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono-tech text-[11px] tracking-[0.1em] text-[#777A7A] uppercase">
                          SELECT SIZE (US)
                        </span>
                        <span
                          data-testid={`selected-size-${model.id}`}
                          className="font-mono-tech text-[11px] font-semibold text-[#D3FF35]"
                        >
                          US {currentSize.toFixed(1)} SELECTED
                        </span>
                      </div>

                      <div
                        role="group"
                        aria-label={`Select US shoe size for ${model.name}`}
                        className="grid grid-cols-6 gap-1.5"
                      >
                        {US_SHOE_SIZES.map((size) => {
                          const available = model.availableSizes.includes(size);
                          const selected = currentSize === size;
                          return (
                            <button
                              key={size}
                              type="button"
                              disabled={!available}
                              onClick={() => onSelectSize(model.id, size)}
                              aria-pressed={selected}
                              aria-label={`${model.name} size US ${size.toFixed(1)}`}
                              className={`h-9 font-mono-tech text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                                selected
                                  ? 'bg-[#D3FF35] text-[#0B0B0A] font-bold border border-[#D3FF35]'
                                  : available
                                  ? 'bg-[#0B0B0A] text-[#F1F0E9] border border-[#F1F0E9]/20 hover:border-[#F1F0E9]/60'
                                  : 'bg-[#0B0B0A]/40 text-[#777A7A]/40 border border-[#F1F0E9]/5 cursor-not-allowed line-through'
                              }`}
                            >
                              {size.toFixed(1)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Primary Action Row */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleAddClick(model)}
                      className={`flex-1 h-12 px-5 font-display italic font-black text-base tracking-[0.08em] uppercase flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                        isAdded
                          ? 'bg-[#375CFF] text-[#F1F0E9]'
                          : 'bg-[#F1F0E9] hover:bg-[#D3FF35] text-[#0B0B0A]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>ADDED TO BAG · US {currentSize.toFixed(1)}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>ADD TO BAG · US {currentSize.toFixed(1)}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(razorline)/razorline/components/HeroSection.tsx">
<![CDATA["use client";

import React, { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductModel } from '../data/catalog';

interface HeroSectionProps {
  models: ProductModel[];
  activeHeroModel: ProductModel;
  onSelectHeroModel: (model: ProductModel) => void;
  onExploreCollection: () => void;
  onDiscoverTech: () => void;
  onQuickInspect: (model: ProductModel) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  models,
  activeHeroModel,
  onSelectHeroModel,
  onExploreCollection,
  onDiscoverTech,
  onQuickInspect
}) => {
  const [pointerOffset, setPointerOffset] = useState<{ x: number; y: number; rot: number }>({
    x: 0,
    y: 0,
    rot: 0
  });
  const rafRef = useRef<number | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setPointerOffset({
        x: Math.max(-9, Math.min(9, relX * 16)),
        y: Math.max(-8, Math.min(8, relY * 14)),
        rot: Math.max(-2.5, Math.min(2.5, relX * 4.5))
      });
    });
  };

  const handlePointerLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setPointerOffset({ x: 0, y: 0, rot: 0 });
  };

  return (
    <section
      id="top"
      aria-label="RL-01 Performance Launch Hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full min-h-[calc(100vh-86px)] bg-[#0B0B0A] overflow-hidden flex items-center border-b border-[#F1F0E9]/10"
    >
      {/* Subtle architectural left-edge blueprint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-24 lg:w-36 bg-blueprint-grid opacity-65 border-r border-[#F1F0E9]/5"
      />

      {/* Main 1440px container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* LEFT 45% COLUMN: Massive Slanted Condensed Typography + Copy + CTAs */}
          <div className="lg:col-span-5 xl:col-span-5 relative z-20 flex flex-col items-start">
            {/* Halftone dot matrix positioned right beside 'THE' like the reference */}
            <div
              aria-hidden="true"
              className="hidden sm:block pointer-events-none absolute right-0 lg:-right-6 top-[32%] w-36 sm:w-44 h-24 bg-halftone-dots opacity-85"
            />

            {/* Massive 3-level stacked slanted headline: BREAK / THE / LIMIT. */}
            <h1
              aria-label="BREAK THE LIMIT."
              className="flex flex-col select-none mb-5 sm:mb-6 pl-1"
            >
              <span className="overflow-hidden py-0.5 pr-4">
                <span className="hero-headline-word animate-mask-word-1 text-[#F1F0E9] text-[clamp(4.6rem,11vw,9.2rem)]">
                  BREAK
                </span>
              </span>
              <span className="overflow-hidden py-0.5 pr-4 -mt-1 sm:-mt-2">
                <span className="hero-headline-word animate-mask-word-2 text-[#375CFF] text-[clamp(4.6rem,11vw,9.2rem)]">
                  THE
                </span>
              </span>
              <span className="overflow-hidden py-0.5 pr-4 -mt-1 sm:-mt-2">
                <span className="hero-headline-word animate-mask-word-3 text-[#D3FF35] text-[clamp(4.6rem,11vw,9.2rem)]">
                  LIMIT.
                </span>
              </span>
            </h1>

            {/* Lime subheading */}
            <p className="font-display font-bold text-[19px] sm:text-[23px] lg:text-[25px] tracking-[0.04em] text-[#D3FF35] uppercase leading-tight mb-3">
              ENGINEERED TO OUTRUN EXPECTATIONS.
            </p>

            {/* Body copy */}
            <p className="text-[#F1F0E9]/85 text-[15px] sm:text-[17px] leading-[1.55] max-w-[430px] mb-7 sm:mb-8 font-normal">
              Precision-built performance footwear for athletes who refuse to stand still.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-7 w-full sm:w-auto">
              <button
                type="button"
                onClick={onExploreCollection}
                className="group relative clip-slant-cta bg-[#F1F0E9] text-[#0B0B0A] px-7 sm:px-8 py-3.5 sm:py-4 font-display italic font-black text-[17px] sm:text-[19px] tracking-[0.05em] uppercase overflow-hidden transition-transform duration-150 active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D3FF35]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#D3FF35] translate-x-[-102%] group-hover:translate-x-0 transition-transform duration-200 ease-out"
                />
                <span className="relative z-10">EXPLORE THE COLLECTION</span>
              </button>

              <button
                type="button"
                onClick={onDiscoverTech}
                className="group inline-flex items-center gap-2.5 font-display font-semibold text-[15px] sm:text-[16px] tracking-[0.08em] text-[#F1F0E9] hover:text-[#D3FF35] uppercase py-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D3FF35]"
              >
                <span>DISCOVER THE TECHNOLOGY</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
              </button>
            </div>
          </div>

          {/* RIGHT 55% COLUMN: Blueprint Coordinate Grid + Outlined RL-01 + Orbital SVG + Floating Shoe + Vertical Spec Rail */}
          <div className="lg:col-span-7 xl:col-span-7 relative min-h-[390px] sm:min-h-[480px] lg:min-h-[590px] flex items-center justify-center">
            {/* Architectural Blueprint Axes, Outlined RL-01 Stencil, Orbital Ellipses, and Velocity Slashes */}
            <svg
              viewBox="0 0 800 620"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 w-full h-full object-contain select-none"
            >
              {/* Outlined blueprint stencil behind the shoe */}
              <g opacity="0.16">
                <text
                  x="75"
                  y="290"
                  fill="none"
                  stroke="#F1F0E9"
                  strokeWidth="1.5"
                  fontFamily="Barlow Condensed, sans-serif"
                  fontWeight="900"
                  fontStyle="italic"
                  fontSize="250"
                  letterSpacing="-4"
                >
                  RL
                </text>
                <text
                  x="415"
                  y="280"
                  fill="#F1F0E9"
                  fillOpacity="0.45"
                  fontFamily="Barlow Condensed, sans-serif"
                  fontWeight="900"
                  fontStyle="italic"
                  fontSize="265"
                  letterSpacing="-6"
                >
                  01
                </text>
              </g>

              {/* Vertical Ruler Axis & Tick Marks */}
              <line x1="395" y1="15" x2="395" y2="605" stroke="#F1F0E9" strokeOpacity="0.18" strokeWidth="1" />
              {Array.from({ length: 28 }).map((_, idx) => (
                <line
                  key={`vt-${idx}`}
                  x1={idx % 5 === 0 ? 383 : 389}
                  y1={30 + idx * 20}
                  x2="395"
                  y2={30 + idx * 20}
                  stroke="#F1F0E9"
                  strokeOpacity={idx % 5 === 0 ? '0.32' : '0.16'}
                  strokeWidth="1"
                />
              ))}

              {/* Horizontal Ruler Axis & Tick Marks */}
              <line x1="25" y1="335" x2="740" y2="335" stroke="#F1F0E9" strokeOpacity="0.18" strokeWidth="1" />
              {Array.from({ length: 34 }).map((_, idx) => (
                <line
                  key={`ht-${idx}`}
                  x1={45 + idx * 20}
                  y1="335"
                  x2={45 + idx * 20}
                  y2={idx % 5 === 0 ? 347 : 341}
                  stroke="#F1F0E9"
                  strokeOpacity={idx % 5 === 0 ? '0.32' : '0.16'}
                  strokeWidth="1"
                />
              ))}

              {/* Left bracket ruler leading to RL-01 / PERFORMANCE SERIES */}
              <polyline
                points="68,335 68,480 120,480"
                fill="none"
                stroke="#F1F0E9"
                strokeOpacity="0.24"
                strokeWidth="1"
              />

              {/* Diagonal Voltage Lime Motion Slashes (behind shoe) */}
              <g className="animate-slash-shoot">
                {/* Upper-left heel velocity spikes */}
                <polygon points="35,112 152,188 144,197 35,112" fill="#F1F0E9" />
                <polygon points="18,136 168,232 154,245 18,136" fill="#D3FF35" />
                <polygon points="72,188 152,248 142,258 72,188" fill="#F1F0E9" />

                {/* Upper-right forefoot velocity spikes */}
                <polygon points="502,265 628,142 612,185 502,265" fill="#F1F0E9" />
                <polygon points="588,208 776,38 665,168 588,208" fill="#D3FF35" />
                <polygon points="668,182 758,104 736,136 668,182" fill="#D3FF35" />

                {/* Lower-left midfoot velocity slash */}
                <polygon points="52,588 308,365 288,415 52,588" fill="#D3FF35" />
                <polygon points="210,432 292,368 306,382 210,432" fill="#D3FF35" />
              </g>

              {/* Orbital Trajectory Ellipses around the shoe */}
              <ellipse
                cx="445"
                cy="395"
                rx="295"
                ry="82"
                transform="rotate(-31 445 395)"
                stroke="#F1F0E9"
                strokeOpacity="0.7"
                strokeWidth="1.35"
                className="animate-orbit-trace"
              />
              <ellipse
                cx="458"
                cy="406"
                rx="285"
                ry="72"
                transform="rotate(-31 458 406)"
                stroke="#D3FF35"
                strokeOpacity="0.78"
                strokeWidth="1.35"
                strokeDasharray="420 180"
                className="animate-orbit-trace"
              />

              {/* Lower-right orbital arc accent */}
              <path
                d="M 555 495 A 115 56 18 0 1 705 555"
                stroke="#D3FF35"
                strokeWidth="1.6"
                fill="none"
                className="animate-orbit-trace"
              />
              <path
                d="M 525 512 A 125 60 18 0 0 698 565"
                stroke="#F1F0E9"
                strokeOpacity="0.45"
                strokeWidth="1"
                fill="none"
              />
            </svg>

            {/* Technical Coordinate Annotations (Design Fiction Telemetry) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-4 left-6 sm:left-12 font-display text-[13px] tracking-[0.08em] text-[#777A7A] uppercase"
            >
              ACCEL // 9.8m/s²
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-4 left-[50%] font-display text-[13px] tracking-[0.08em] text-[#777A7A] uppercase"
            >
              LAT. 45.10
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[28%] right-10 sm:right-14 font-display text-[13px] tracking-[0.08em] text-[#777A7A] uppercase"
            >
              LAT. 45.10
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 left-[62%] hidden sm:block font-display text-[13px] tracking-[0.08em] text-[#777A7A] uppercase"
            >
              LAT. 45.10
            </div>

            {/* Centerpiece Isolated RL-01 Sneaker Image */}
            <div
              style={{
                transform: `translate3d(${pointerOffset.x}px, ${pointerOffset.y}px, 0) rotate(${pointerOffset.rot}deg)`
              }}
              className="relative z-10 w-[92%] sm:w-[84%] lg:w-[88%] max-w-[650px] transition-transform duration-200 ease-out select-none"
            >
              <div className="animate-shoe-enter">
                <img
                  src={activeHeroModel.heroImage}
                  alt={activeHeroModel.altText}
                  width={640}
                  height={500}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.85)] animate-shoe-idle"
                />
              </div>
            </div>

            {/* Bottom-Left Shoe Label Callout matching reference */}
            <div className="absolute bottom-14 sm:bottom-16 left-6 sm:left-14 z-20 flex items-start gap-2.5 bg-[#0B0B0A]/80 backdrop-blur-xs px-2.5 py-1.5">
              <span
                aria-hidden="true"
                className="w-2 h-2 mt-1.5 bg-[#D3FF35] shrink-0"
              />
              <div>
                <div className="font-display font-semibold text-[15px] sm:text-[16px] tracking-[0.06em] text-[#F1F0E9] leading-tight uppercase">
                  {activeHeroModel.code.split(' ')[0]} /
                </div>
                <div className="font-display font-semibold text-[15px] sm:text-[16px] tracking-[0.06em] text-[#F1F0E9] leading-tight uppercase">
                  PERFORMANCE SERIES
                </div>
              </div>
            </div>

            {/* Interactive Finish Switcher + Quick Inspect Trigger */}
            <div
              role="group"
              aria-label="Preview RL-01 Colorway Finish"
              className="absolute bottom-2 left-6 sm:left-14 z-20 flex items-center gap-2"
            >
              {models.map((m) => {
                const isSelected = m.id === activeHeroModel.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onSelectHeroModel(m)}
                    aria-pressed={isSelected}
                    className={`px-2.5 py-1 font-mono-tech text-[11px] uppercase tracking-wider border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'border-[#D3FF35] bg-[#D3FF35]/15 text-[#D3FF35] font-semibold'
                        : 'border-[#F1F0E9]/20 bg-[#0B0B0A]/80 text-[#777A7A] hover:text-[#F1F0E9] hover:border-[#F1F0E9]/45'
                    }`}
                  >
                    {m.name.replace('RL-01 ', '')}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => onQuickInspect(activeHeroModel)}
                className="px-2.5 py-1 font-mono-tech text-[11px] uppercase tracking-wider border border-[#F1F0E9]/20 bg-[#0B0B0A]/80 text-[#F1F0E9]/80 hover:border-[#D3FF35] hover:text-[#D3FF35] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                SPEC SHEET +
              </button>
            </div>

            {/* Far-Right Vertical Technical Specification Rail matching reference */}
            <aside
              aria-label="RL-01 Concept Specifications"
              className="hidden sm:flex flex-col items-end justify-between gap-3 absolute right-0 top-6 bottom-6 z-20"
            >
              <div className="border border-[#F1F0E9]/15 bg-[#0B0B0A]/80 px-1.5 py-3">
                <span className="block font-mono-tech text-[10px] tracking-[0.16em] text-[#777A7A] uppercase [writing-mode:vertical-rl] rotate-180">
                  WEIGHT: {activeHeroModel.weightGrams}G
                </span>
              </div>
              <div className="border border-[#F1F0E9]/15 bg-[#0B0B0A]/80 px-1.5 py-3">
                <span className="block font-mono-tech text-[10px] tracking-[0.16em] text-[#777A7A] uppercase [writing-mode:vertical-rl] rotate-180">
                  DROP: {activeHeroModel.dropMm}MM
                </span>
              </div>
              <div className="flex items-end gap-1.5">
                <div className="border border-[#F1F0E9]/15 bg-[#0B0B0A]/80 px-1.5 py-3">
                  <span className="block font-mono-tech text-[10px] tracking-[0.16em] text-[#777A7A] uppercase [writing-mode:vertical-rl] rotate-180">
                    STACK: 38/32MM
                  </span>
                </div>
                <div className="border border-[#F1F0E9]/15 bg-[#0B0B0A]/80 px-1.5 py-3.5">
                  <span className="block font-mono-tech text-[10px] tracking-[0.16em] text-[#F1F0E9]/70 uppercase [writing-mode:vertical-rl] rotate-180">
                    UPPER: MATRIX MESH
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(razorline)/razorline/components/LaunchCtaFooter.tsx">
<![CDATA["use client";

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { validateLaunchSignup } from '../utils/storeLogic';

interface LaunchCtaFooterProps {
  onExploreCollection: () => void;
}

export const LaunchCtaFooter: React.FC<LaunchCtaFooterProps> = ({ onExploreCollection }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [activePolicyNote, setActivePolicyNote] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateLaunchSignup(email);
    if (!res.valid) {
      setError(res.error);
      setSubmittedEmail(null);
      return;
    }
    setError(null);
    setSubmittedEmail(res.normalizedEmail);
    setEmail('');
  };

  const policyNotes: Record<string, string> = {
    sizing:
      'RL-01 runs true to standard US performance road-running sizing with a locked midfoot saddle. Between sizes, order 0.5 up.',
    shipping:
      'Fictional DTC launch demo: All simulated orders display instant confirmation with zero real payment or carrier dispatch.',
    warranty:
      'Fictional brand concept: All performance numbers and coordinate labels on this page represent editorial design fiction.'
  };

  return (
    <>
      {/* 8. Final Launch CTA Section */}
      <section
        aria-labelledby="launch-cta-heading"
        className="relative w-full py-20 lg:py-28 bg-[#0B0B0A] border-b border-[#F1F0E9]/15 overflow-hidden"
      >
        {/* Diagonal Lime Slash Graphic Echoing Hero */}
        <svg
          viewBox="0 0 1440 500"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-35"
        >
          <polygon points="880,480 1390,20 1330,110 880,480" fill="#D3FF35" />
          <polygon points="980,460 1420,90 1380,150 980,460" fill="#375CFF" />
        </svg>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#111210] border border-[#F1F0E9]/20 p-6 sm:p-10 lg:p-14">
            {/* Left Copy & Email Signup (7 columns) */}
            <div className="lg:col-span-7">
              <div className="font-mono-tech text-xs tracking-[0.16em] text-[#D3FF35] uppercase mb-3">
                06. RL-01 LAUNCH DISPATCH · DIRECT TO ATHLETE
              </div>
              <h2
                id="launch-cta-heading"
                className="font-display italic font-black text-[clamp(3rem,6.5vw,5.75rem)] text-[#F1F0E9] uppercase leading-[0.88] mb-4"
              >
                RUN PAST <span className="text-[#D3FF35]">ORDINARY.</span>
              </h2>
              <p className="text-[#F1F0E9]/80 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
                Register for RL-01 colorway restocks, prototype lab notes, and future hollow-chassis track releases. Validated locally with zero external transmission.
              </p>

              {/* Validated Email Signup Form */}
              <form onSubmit={handleSubmit} noValidate className="max-w-lg mb-6">
                <label
                  htmlFor="launch-email-input"
                  className="block font-mono-tech text-xs text-[#777A7A] uppercase tracking-wider mb-2"
                >
                  ATHLETE DISPATCH EMAIL
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="launch-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="runner@razorline.lab"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'launch-email-error' : undefined}
                    className="flex-1 h-12 px-4 bg-[#0B0B0A] border border-[#F1F0E9]/25 focus:border-[#D3FF35] text-[#F1F0E9] placeholder:text-[#777A7A] font-mono-tech text-sm focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="h-12 px-7 bg-[#D3FF35] hover:bg-[#e1ff66] text-[#0B0B0A] font-display italic font-black text-base tracking-[0.08em] uppercase flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>JOIN DISPATCH</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {error && (
                  <div
                    id="launch-email-error"
                    role="alert"
                    data-testid="signup-error-msg"
                    className="mt-2.5 flex items-center gap-2 text-xs font-mono-tech text-[#FF5C5C]"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {submittedEmail && (
                  <div
                    role="status"
                    data-testid="signup-success-msg"
                    className="mt-3 p-3 bg-[#0B0B0A] border border-[#D3FF35] flex items-center gap-2.5 text-xs font-mono-tech text-[#D3FF35]"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>
                      DEMO DISPATCH CONFIRMED FOR {submittedEmail.toUpperCase()} — NO EXTERNAL DATA SENT.
                    </span>
                  </div>
                )}
              </form>

              <button
                type="button"
                onClick={onExploreCollection}
                className="inline-flex items-center gap-2 font-mono-tech text-xs text-[#F1F0E9]/80 hover:text-[#D3FF35] uppercase tracking-wider cursor-pointer"
              >
                <span>OR JUMP DIRECTLY TO THE RL-01 COLLECTION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right Product Close-Up (5 columns) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#0B0B0A] border border-[#F1F0E9]/15 p-6 bg-blueprint-grid">
              <img
                src="/templates/razorline/rl01-hero.png"
                alt="RAZORLINE RL-01 Voltage close-up profile"
                width={640}
                height={500}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full max-w-[380px] h-auto object-contain"
              />
              <div className="w-full mt-4 pt-3 border-t border-[#F1F0E9]/10 flex items-center justify-between font-mono-tech text-[11px] text-[#777A7A]">
                <span>RL-01 // PERFORMANCE SERIES</span>
                <span className="text-[#D3FF35]">IN STOCK · DEMO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="w-full bg-[#0B0B0A] text-[#F1F0E9] py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#F1F0E9]/10">
            {/* Brand Column */}
            <div className="lg:col-span-5 space-y-4">
              <a
                href="#top"
                className="inline-flex items-center gap-2.5 whitespace-nowrap"
              >
                <svg
                  width="32"
                  height="24"
                  viewBox="0 0 36 28"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M3 4H21L27 10.5L19.5 16.5H11L18.5 10.5H8L3 4Z" fill="#F1F0E9" />
                  <path d="M9 14.5L2.5 24H10.5L15.5 17.5L22.5 25.5H30.5L20.5 14.5H9Z" fill="#F1F0E9" />
                  <path d="M25.5 4L33.5 11.5L28.5 15.5L31 11L23.5 4H25.5Z" fill="#D3FF35" />
                </svg>
                <span className="font-display italic font-black text-3xl text-[#F1F0E9]">
                  RAZORLINE
                </span>
              </a>
              <p className="text-sm text-[#777A7A] max-w-sm leading-relaxed">
                Uncompromising velocity. Engineered rebellion. A fictional performance footwear company for athletes who outrun the expected.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-3 space-y-2.5">
              <div className="font-mono-tech text-xs text-[#D3FF35] uppercase tracking-wider mb-3">
                NAVIGATION
              </div>
              <ul className="space-y-2 text-sm text-[#F1F0E9]/80">
                <li>
                  <a href="#top" className="hover:text-[#D3FF35] transition-colors">
                    RL-01 Launch Hero
                  </a>
                </li>
                <li>
                  <a href="#footwear" className="hover:text-[#D3FF35] transition-colors">
                    The RL-01 Collection
                  </a>
                </li>
                <li>
                  <a href="#technology" className="hover:text-[#D3FF35] transition-colors">
                    Technology Breakdown
                  </a>
                </li>
                <li>
                  <a href="#athletes" className="hover:text-[#D3FF35] transition-colors">
                    Movement Stories
                  </a>
                </li>
                <li>
                  <a href="#journal" className="hover:text-[#D3FF35] transition-colors">
                    Product Lookbook
                  </a>
                </li>
              </ul>
            </div>

            {/* Fictional Store Policies & Notes */}
            <div className="lg:col-span-4 space-y-2.5">
              <div className="font-mono-tech text-xs text-[#D3FF35] uppercase tracking-wider mb-3">
                STORE POLICIES & DESIGN NOTES
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActivePolicyNote(activePolicyNote === 'sizing' ? null : 'sizing')}
                  className="px-3 py-1.5 border border-[#F1F0E9]/20 hover:border-[#D3FF35] font-mono-tech text-xs text-[#F1F0E9]/85 cursor-pointer"
                >
                  SIZING GUIDE
                </button>
                <button
                  type="button"
                  onClick={() => setActivePolicyNote(activePolicyNote === 'shipping' ? null : 'shipping')}
                  className="px-3 py-1.5 border border-[#F1F0E9]/20 hover:border-[#D3FF35] font-mono-tech text-xs text-[#F1F0E9]/85 cursor-pointer"
                >
                  DEMO DISPATCH POLICY
                </button>
                <button
                  type="button"
                  onClick={() => setActivePolicyNote(activePolicyNote === 'warranty' ? null : 'warranty')}
                  className="px-3 py-1.5 border border-[#F1F0E9]/20 hover:border-[#D3FF35] font-mono-tech text-xs text-[#F1F0E9]/85 cursor-pointer"
                >
                  DESIGN FICTION NOTICE
                </button>
              </div>
              {activePolicyNote && (
                <p className="mt-3 p-3 bg-[#111210] border border-[#D3FF35]/40 text-xs text-[#F1F0E9]/80 leading-relaxed">
                  {policyNotes[activePolicyNote]}
                </p>
              )}
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777A7A] font-mono-tech">
            <span>© {new Date().getFullYear()} RAZORLINE FOOTWEAR LAB. FICTIONAL DTC CONCEPT.</span>
            <span>RL-01 SERIES · ALL SPECIFICATIONS ARE DESIGN FICTION</span>
          </div>
        </div>
      </footer>
    </>
  );
};
]]>
    </file>
    <file path="src/app/(razorline)/razorline/components/LookbookSection.tsx">
<![CDATA["use client";

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LOOKBOOK_FRAMES } from '../data/catalog';
import { stepLookbookIndex } from '../utils/storeLogic';

export const LookbookSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const currentFrame = LOOKBOOK_FRAMES[activeSlide] ?? LOOKBOOK_FRAMES[0];

  const handlePrev = () => {
    setActiveSlide((prev) => stepLookbookIndex(prev, -1, LOOKBOOK_FRAMES.length));
  };

  const handleNext = () => {
    setActiveSlide((prev) => stepLookbookIndex(prev, 1, LOOKBOOK_FRAMES.length));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <section
      id="journal"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-labelledby="lookbook-heading"
      className="relative w-full py-20 lg:py-28 scroll-mt-20 lg:scroll-mt-24 bg-[#0B0B0A] border-b border-[#F1F0E9]/10 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#D3FF35]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header + Gallery Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-[#F1F0E9]/15 pb-8">
          <div>
            <div className="font-mono-tech text-xs tracking-[0.16em] text-[#375CFF] uppercase mb-2">
              05. VISUAL ARCHIVE · LOOKBOOK GALLERY
            </div>
            <h2
              id="lookbook-heading"
              className="font-display italic font-black text-[clamp(2.5rem,5vw,4.25rem)] text-[#F1F0E9] uppercase leading-[0.92]"
            >
              PRODUCT LOOKBOOK
            </h2>
          </div>

          {/* Functional Previous / Next Controls */}
          <div className="flex items-center gap-3">
            <span
              data-testid="lookbook-counter"
              className="font-mono-tech text-sm text-[#D3FF35] mr-2"
            >
              {currentFrame.index}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous lookbook frame"
              className="w-11 h-11 border border-[#F1F0E9]/25 hover:border-[#D3FF35] text-[#F1F0E9] hover:text-[#D3FF35] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next lookbook frame"
              className="w-11 h-11 border border-[#F1F0E9]/25 hover:border-[#D3FF35] text-[#F1F0E9] hover:text-[#D3FF35] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Asymmetric Split Lookbook Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Primary Diagonal Image Frame (8 columns) */}
          <div className="lg:col-span-8 bg-[#111210] border border-[#F1F0E9]/15 p-6 sm:p-10 relative overflow-hidden flex flex-col justify-between min-h-[380px] sm:min-h-[460px] bg-blueprint-grid">
            <div className="flex items-center justify-between gap-4 z-10">
              <span className="font-mono-tech text-xs text-[#D3FF35] uppercase">
                {currentFrame.aspectLabel}
              </span>
              <span className="font-mono-tech text-xs text-[#777A7A] uppercase">
                {currentFrame.locationCode}
              </span>
            </div>

            <div className="my-6 flex items-center justify-center relative z-10">
              <img
                key={currentFrame.id}
                src={currentFrame.image}
                alt={currentFrame.title}
                width={640}
                height={500}
                referrerPolicy="no-referrer"
                className="max-h-[310px] w-auto object-contain transition-transform duration-300"
              />
            </div>

            <div className="z-10 pt-4 border-t border-[#F1F0E9]/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3
                  data-testid="lookbook-frame-title"
                  className="font-display italic font-black text-2xl sm:text-3xl text-[#F1F0E9] uppercase"
                >
                  {currentFrame.title}
                </h3>
                <p className="text-[#F1F0E9]/75 text-sm max-w-xl mt-1">
                  {currentFrame.caption}
                </p>
              </div>
              <span className="font-mono-tech text-xs text-[#D3FF35] shrink-0">
                {currentFrame.modelName}
              </span>
            </div>
          </div>

          {/* Secondary Companion Detail Frame + Direct Frame Selector (4 columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="bg-[#111210] border border-[#F1F0E9]/15 p-5 flex-1 flex flex-col justify-between">
              <div className="font-mono-tech text-xs text-[#777A7A] uppercase mb-3">
                DETAIL CROP // {currentFrame.modelName}
              </div>
              <div className="h-52 overflow-hidden bg-[#0B0B0A] border border-[#F1F0E9]/10 mb-4">
                <img
                  src={currentFrame.secondaryImage}
                  alt={`Macro detail for ${currentFrame.modelName}`}
                  width={600}
                  height={420}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-mono-tech text-xs text-[#F1F0E9]/70 leading-relaxed">
                USE KEYBOARD LEFT/RIGHT ARROWS OR SELECT A FRAME BELOW TO INSPECT FINISH VARIATIONS.
              </p>
            </div>

            {/* Frame Index Selector Buttons */}
            <div
              role="tablist"
              aria-label="Lookbook Frame Selector"
              className="grid grid-cols-4 gap-2"
            >
              {LOOKBOOK_FRAMES.map((frame, idx) => {
                const selected = idx === activeSlide;
                return (
                  <button
                    key={frame.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-11 font-mono-tech text-xs uppercase transition-colors cursor-pointer ${
                      selected
                        ? 'bg-[#D3FF35] text-[#0B0B0A] font-bold'
                        : 'bg-[#111210] text-[#F1F0E9]/75 border border-[#F1F0E9]/15 hover:border-[#F1F0E9]/50'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(razorline)/razorline/components/MarqueeStrip.tsx">
<![CDATA["use client";

import React, { useEffect, useState } from 'react';
import { computeScrollMarqueeOffset } from '../utils/storeLogic';

export const MarqueeStrip: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'reverse'>('forward');

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        setDirection(currentY >= lastScrollY ? 'forward' : 'reverse');
        setOffset(computeScrollMarqueeOffset(currentY, 340));
        lastScrollY = currentY;
        rafId = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const phrases = [
    'NO LIMITS',
    'NO EXCUSES',
    'PURE MOMENTUM',
    'RL-01 PERFORMANCE SERIES',
    'ENGINEERED REBELLION',
    'ZERO COMPROMISE'
  ];

  return (
    <div
      aria-label="Brand statement strip"
      className="relative w-full bg-[#D3FF35] text-[#0B0B0A] border-y border-[#0B0B0A] overflow-hidden py-3 sm:py-3.5 select-none"
    >
      <div
        style={{
          transform: `translate3d(${offset}px, 0, 0)`
        }}
        className="flex items-center whitespace-nowrap transition-transform duration-150 ease-out will-change-transform"
      >
        {[0, 1, 2].map((repeatIndex) => (
          <div key={repeatIndex} className="flex items-center shrink-0">
            {phrases.map((phrase, idx) => (
              <React.Fragment key={`${repeatIndex}-${idx}`}>
                <span className="font-display italic font-black text-xl sm:text-2xl tracking-[0.06em] uppercase px-5 sm:px-7">
                  {phrase}
                </span>
                <span
                  aria-hidden="true"
                  className={`font-mono-tech text-xs font-bold px-2 transition-transform duration-200 ${
                    direction === 'reverse' ? 'rotate-180' : ''
                  }`}
                >
                  ///
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(razorline)/razorline/components/Navbar.tsx">
<![CDATA["use client";

import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  bagCount: number;
  onOpenBag: () => void;
  onShopNow: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ bagCount, onOpenBag, onShopNow }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'FOOTWEAR', href: '#footwear' },
    { label: 'TECHNOLOGY', href: '#technology' },
    { label: 'ATHLETES', href: '#athletes' },
    { label: 'JOURNAL', href: '#journal' }
  ];

  return (
    <header className="sticky top-0 z-40 h-20 lg:h-[86px] w-full bg-[#0B0B0A]/95 backdrop-blur-md border-b border-[#F1F0E9]/10">
      <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-8 lg:px-10 flex items-center justify-between gap-6">
        {/* Zone 1: Angular RAZORLINE SVG mark + slanted condensed wordmark */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D3FF35]"
          aria-label="RAZORLINE Home"
        >
          <svg
            width="36"
            height="28"
            viewBox="0 0 36 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <path
              d="M3 4H21L27 10.5L19.5 16.5H11L18.5 10.5H8L3 4Z"
              fill="#F1F0E9"
            />
            <path
              d="M9 14.5L2.5 24H10.5L15.5 17.5L22.5 25.5H30.5L20.5 14.5H9Z"
              fill="#F1F0E9"
            />
            <path
              d="M25.5 4L33.5 11.5L28.5 15.5L31 11L23.5 4H25.5Z"
              fill="#D3FF35"
            />
          </svg>
          <span className="font-display italic font-black text-[28px] sm:text-[33px] tracking-[-0.02em] text-[#F1F0E9] leading-none">
            RAZORLINE
          </span>
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 lg:gap-11"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative font-display font-semibold text-[15px] lg:text-[16px] tracking-[0.12em] text-[#F1F0E9]/85 hover:text-[#F1F0E9] transition-colors whitespace-nowrap shrink-0 py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#D3FF35] after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D3FF35]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Cart icon + Rectangular Voltage Lime SHOP NOW CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBag}
            aria-label={`Shopping bag with ${bagCount} items`}
            className="relative w-11 h-11 border border-[#F1F0E9]/25 bg-[#0B0B0A] hover:border-[#D3FF35] text-[#F1F0E9] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D3FF35]"
          >
            <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.75} />
            {bagCount > 0 && (
              <span
                data-testid="bag-count-badge"
                className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-[#D3FF35] text-[#0B0B0A] font-mono-tech text-[11px] font-bold flex items-center justify-center"
              >
                {bagCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onShopNow}
            className="hidden sm:inline-flex items-center justify-center h-11 px-6 lg:px-7 bg-[#D3FF35] hover:bg-[#e1ff66] active:scale-[0.98] text-[#0B0B0A] font-display font-extrabold text-[15px] tracking-[0.09em] uppercase transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1F0E9]"
          >
            SHOP NOW
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden w-11 h-11 border border-[#F1F0E9]/25 text-[#F1F0E9] flex items-center justify-center hover:border-[#D3FF35] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#0B0B0A] border-b border-[#F1F0E9]/20 px-6 py-6 space-y-4"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display italic font-extrabold text-2xl tracking-[0.08em] text-[#F1F0E9] hover:text-[#D3FF35] py-1.5 border-b border-[#F1F0E9]/10"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onShopNow();
            }}
            className="w-full h-12 bg-[#D3FF35] text-[#0B0B0A] font-display font-extrabold text-base tracking-[0.1em] uppercase flex items-center justify-center"
          >
            SHOP NOW
          </button>
        </div>
      )}
    </header>
  );
};
]]>
    </file>
    <file path="src/app/(razorline)/razorline/components/QuickViewModal.tsx">
<![CDATA["use client";

import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { ProductModel, US_SHOE_SIZES } from '../data/catalog';

interface QuickViewModalProps {
  model: ProductModel | null;
  selectedSize: number;
  onSelectSize: (modelId: string, size: number) => void;
  onAddToBag: (model: ProductModel, size: number) => void;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  model,
  selectedSize,
  onSelectSize,
  onAddToBag,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'macro'>('profile');

  useEffect(() => {
    setActiveTab('profile');
  }, [model?.id]);

  useEffect(() => {
    if (!model) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [model, onClose]);

  if (!model) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B0B0A]/85 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-4xl bg-[#111210] border border-[#D3FF35]/60 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top Modal Header */}
        <div className="px-6 py-4 bg-[#0B0B0A] border-b border-[#F1F0E9]/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-xs text-[#D3FF35] uppercase">
              SPECIFICATION SHEET // {model.code}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quick view dialog"
            className="w-9 h-9 border border-[#F1F0E9]/20 hover:border-[#D3FF35] text-[#F1F0E9] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Visual Switcher (6 columns) */}
          <div className="lg:col-span-6">
            <div className="h-64 sm:h-72 bg-[#0B0B0A] border border-[#F1F0E9]/15 flex items-center justify-center p-4 bg-blueprint-grid mb-3 overflow-hidden">
              <img
                src={activeTab === 'profile' ? model.heroImage : model.detailImage}
                alt={model.altText}
                width={640}
                height={500}
                referrerPolicy="no-referrer"
                className={`w-full h-full ${
                  activeTab === 'profile' ? 'object-contain' : 'object-cover'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`h-10 font-mono-tech text-xs uppercase cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-[#D3FF35] text-[#0B0B0A] font-bold'
                    : 'bg-[#0B0B0A] text-[#F1F0E9]/70 border border-[#F1F0E9]/15'
                }`}
              >
                01. LATERAL PROFILE
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('macro')}
                className={`h-10 font-mono-tech text-xs uppercase cursor-pointer ${
                  activeTab === 'macro'
                    ? 'bg-[#D3FF35] text-[#0B0B0A] font-bold'
                    : 'bg-[#0B0B0A] text-[#F1F0E9]/70 border border-[#F1F0E9]/15'
                }`}
              >
                02. MACRO CHASSIS
              </button>
            </div>
          </div>

          {/* Right Specifications & Full Size Matrix (6 columns) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="text-xs text-[#777A7A] mb-1">{model.statusLabel}</div>
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h2
                  id="quickview-title"
                  className="font-display italic font-black text-3xl sm:text-4xl text-[#F1F0E9] uppercase"
                >
                  {model.name}
                </h2>
                <span className="font-mono-tech text-2xl font-bold text-[#D3FF35]">
                  ${model.price}
                </span>
              </div>

              <p className="text-[#F1F0E9]/80 text-sm leading-relaxed mb-5">
                {model.description}
              </p>

              {/* Architecture Notes */}
              <div className="mb-5 border-y border-[#F1F0E9]/10 py-3.5 space-y-1.5">
                {model.architectureNotes.map((note, idx) => (
                  <div key={idx} className="font-mono-tech text-xs text-[#F1F0E9]/75">
                    0{idx + 1}. {note}
                  </div>
                ))}
              </div>

              {/* Full US Size Matrix */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono-tech text-xs text-[#777A7A] uppercase">
                    FULL SIZE RUN (US)
                  </span>
                  <span className="font-mono-tech text-xs text-[#D3FF35]">
                    SELECTED: US {selectedSize.toFixed(1)}
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {US_SHOE_SIZES.map((size) => {
                    const available = model.availableSizes.includes(size);
                    const selected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        disabled={!available}
                        onClick={() => onSelectSize(model.id, size)}
                        aria-pressed={selected}
                        className={`h-9 font-mono-tech text-xs cursor-pointer ${
                          selected
                            ? 'bg-[#D3FF35] text-[#0B0B0A] font-bold'
                            : available
                            ? 'bg-[#0B0B0A] text-[#F1F0E9] border border-[#F1F0E9]/20 hover:border-[#F1F0E9]/60'
                            : 'bg-[#0B0B0A]/40 text-[#777A7A]/35 border border-[#F1F0E9]/5 cursor-not-allowed line-through'
                        }`}
                      >
                        {size.toFixed(1)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onAddToBag(model, selectedSize);
                onClose();
              }}
              className="w-full h-12 bg-[#D3FF35] hover:bg-[#e1ff66] text-[#0B0B0A] font-display italic font-black text-lg tracking-[0.08em] uppercase flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>ADD TO BAG · US {selectedSize.toFixed(1)} · ${model.price}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(razorline)/razorline/components/TechnologySection.tsx">
<![CDATA["use client";

import React, { useState } from 'react';
import { TECH_CHAPTERS } from '../data/catalog';

export const TechnologySection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentChapter = TECH_CHAPTERS[activeIndex] ?? TECH_CHAPTERS[0];

  return (
    <section
      id="technology"
      aria-labelledby="technology-heading"
      className="relative w-full py-20 lg:py-28 scroll-mt-20 lg:scroll-mt-24 bg-[#0B0B0A] border-b border-[#F1F0E9]/10"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16 border-b border-[#F1F0E9]/15 pb-8">
          <div>
            <div className="font-mono-tech text-xs tracking-[0.16em] text-[#D3FF35] uppercase mb-2">
              03. ENGINEERING SPECIFICATION · INTERACTIVE SCHEMATIC
            </div>
            <h2
              id="technology-heading"
              className="font-display italic font-black text-[clamp(2.5rem,5vw,4.25rem)] text-[#F1F0E9] uppercase leading-[0.92]"
            >
              TECHNOLOGY BREAKDOWN
            </h2>
          </div>
          <div className="font-mono-tech text-xs text-[#777A7A] uppercase tracking-wider">
            ACTIVE MODULE: {currentChapter.coordinates}
          </div>
        </div>

        {/* Sticky Inspection Stage Left + 3 Indexed Engineering Chapters Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Sticky Visual Stage (7 columns on desktop) */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 bg-[#111210] border border-[#F1F0E9]/15 overflow-hidden">
            {/* Top Technical Bar */}
            <div className="px-5 py-3.5 border-b border-[#F1F0E9]/10 flex items-center justify-between gap-4 bg-[#0B0B0A]">
              <span className="font-mono-tech text-xs text-[#D3FF35] font-semibold">
                CHAPTER {currentChapter.index} // {currentChapter.title}
              </span>
              <span className="font-mono-tech text-xs text-[#777A7A]">
                {currentChapter.coordinates}
              </span>
            </div>

            {/* Macro Crop Display with SVG Technical Callouts */}
            <div className="relative h-[340px] sm:h-[420px] w-full bg-[#0B0B0A] overflow-hidden flex items-center justify-center">
              <img
                key={currentChapter.id}
                src={currentChapter.image}
                alt={currentChapter.imageAlt}
                width={600}
                height={420}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-[#0B0B0A]/20 to-transparent" />

              {/* Blueprint crosshairs overlay */}
              <svg
                viewBox="0 0 600 420"
                fill="none"
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 w-full h-full"
              >
                <line x1="0" y1="210" x2="600" y2="210" stroke="#F1F0E9" strokeOpacity="0.14" strokeDasharray="4 4" />
                <line x1="300" y1="0" x2="300" y2="420" stroke="#F1F0E9" strokeOpacity="0.14" strokeDasharray="4 4" />
                <rect x="20" y="20" width="560" height="380" stroke="#D3FF35" strokeOpacity="0.22" strokeWidth="1" />
              </svg>

              {/* Interactive Callout Pins */}
              {currentChapter.callouts.map((callout, idx) => (
                <div
                  key={callout.label}
                  style={{ left: callout.x, top: callout.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0B0B0A]/90 border border-[#D3FF35]/70 px-3 py-1.5 shadow-lg"
                >
                  <div className="font-mono-tech text-[10px] text-[#D3FF35] uppercase tracking-wider">
                    0{idx + 1} · {callout.label}
                  </div>
                  <div className="font-mono-tech text-xs text-[#F1F0E9] font-semibold">
                    {callout.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Telemetry Readout Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-[#F1F0E9]/10 border-t border-[#F1F0E9]/15 bg-[#0B0B0A]">
              <div className="p-4 sm:p-5">
                <div className="font-mono-tech text-[11px] text-[#777A7A] uppercase mb-1">
                  {currentChapter.metricLabel}
                </div>
                <div
                  data-testid="tech-active-primary-metric"
                  className="font-display italic font-black text-2xl sm:text-3xl text-[#D3FF35]"
                >
                  {currentChapter.metricValue}
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="font-mono-tech text-[11px] text-[#777A7A] uppercase mb-1">
                  {currentChapter.secondaryMetricLabel}
                </div>
                <div className="font-display italic font-black text-2xl sm:text-3xl text-[#F1F0E9]">
                  {currentChapter.secondaryMetricValue}
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 p-4 sm:p-5 border-t sm:border-t-0 border-[#F1F0E9]/10">
                <div className="font-mono-tech text-[11px] text-[#777A7A] uppercase mb-1">
                  PLATFORM SERIES
                </div>
                <div className="font-display italic font-black text-2xl sm:text-3xl text-[#375CFF]">
                  RL-01 LAB
                </div>
              </div>
            </div>
          </div>

          {/* Right Indexed Engineering Chapters (5 columns on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {TECH_CHAPTERS.map((chapter, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={chapter.id}
                  className={`transition-colors duration-200 border ${
                    isActive
                      ? 'bg-[#141612] border-[#D3FF35]'
                      : 'bg-[#111210] border-[#F1F0E9]/15 hover:border-[#F1F0E9]/40'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-expanded={isActive}
                    className="w-full text-left p-6 sm:p-7 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D3FF35]"
                  >
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span
                        className={`font-mono-tech text-xs tracking-[0.14em] uppercase ${
                          isActive ? 'text-[#D3FF35] font-bold' : 'text-[#777A7A]'
                        }`}
                      >
                        CHAPTER {chapter.index}
                      </span>
                      <span className="font-mono-tech text-xs text-[#777A7A]">
                        {chapter.metricValue}
                      </span>
                    </div>

                    <h3 className="font-display italic font-black text-2xl sm:text-3xl text-[#F1F0E9] uppercase tracking-tight mb-1.5">
                      {chapter.title}
                    </h3>
                    <div className="font-mono-tech text-xs text-[#375CFF] uppercase tracking-wider mb-4">
                      {chapter.subtitle}
                    </div>

                    <p className="text-[#F1F0E9]/80 text-sm sm:text-[15px] leading-relaxed">
                      {chapter.summary}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(razorline)/razorline/data/catalog.ts">
<![CDATA[export interface ProductModel {
  id: string;
  code: string;
  name: string;
  colorway: string;
  tagline: string;
  price: number;
  weightGrams: number;
  dropMm: number;
  stackHeightMm: string;
  accentHex: string;
  secondaryHex: string;
  heroImage: string;
  detailImage: string;
  altText: string;
  statusLabel: string;
  description: string;
  architectureNotes: string[];
  availableSizes: number[];
}

export interface TechChapter {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  summary: string;
  image: string;
  imageAlt: string;
  metricLabel: string;
  metricValue: string;
  secondaryMetricLabel: string;
  secondaryMetricValue: string;
  coordinates: string;
  callouts: { label: string; value: string; x: string; y: string }[];
}

export interface BreakawayFeature {
  index: string;
  title: string;
  kicker: string;
  metric: string;
  unit: string;
  description: string;
  image: string;
  imageAlt: string;
  specNote: string;
}

export interface AthleteStory {
  id: string;
  frameNumber: string;
  athleteName: string;
  discipline: string;
  location: string;
  sessionData: string;
  quote: string;
  narrative: string;
  modelUsed: string;
  image: string;
  accentColor: 'lime' | 'cobalt';
}

export interface LookbookFrame {
  id: string;
  index: string;
  title: string;
  caption: string;
  locationCode: string;
  modelName: string;
  image: string;
  secondaryImage: string;
  aspectLabel: string;
}

export const US_SHOE_SIZES: number[] = [7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 13.0];

export const RL01_COLLECTION: ProductModel[] = [
  {
    id: 'rl01-voltage',
    code: 'RL-01 // VLT',
    name: 'RL-01 VOLTAGE',
    colorway: 'Carbon Black / Voltage Lime / Cobalt',
    tagline: 'Flagship asymmetric hollow-cavity road racer.',
    price: 240,
    weightGrams: 168,
    dropMm: 6,
    stackHeightMm: '38mm / 32mm',
    accentHex: '#D3FF35',
    secondaryHex: '#375CFF',
    heroImage: '/templates/razorline/rl01-voltage.png',
    detailImage: '/templates/razorline/rl01-detail-sole.png',
    altText: 'RAZORLINE RL-01 Voltage performance running shoe in three-quarter lateral profile with translucent voltage-lime hollow midsole and cobalt accents',
    statusLabel: 'Launch Edition · Fictional Demo Price',
    description:
      'Built around an exposed three-tunnel sculptural midsole that compresses and rebounds under high-cadence forefoot strikes without excess foam bulk.',
    architectureNotes: [
      'Sculpted dual-density hollow cavity midsole geometry',
      'Ripstop carbon-weave monofilament upper with cobalt tension saddle',
      '6mm offset geometry tuned for midfoot-to-forefoot transition'
    ],
    availableSizes: [7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 13.0]
  },
  {
    id: 'rl01-cobalt',
    code: 'RL-01 // CBL',
    name: 'RL-01 COBALT',
    colorway: 'Obsidian / Electric Cobalt / Acid Lime',
    tagline: 'High-visibility night-track interval configuration.',
    price: 240,
    weightGrams: 168,
    dropMm: 6,
    stackHeightMm: '38mm / 32mm',
    accentHex: '#375CFF',
    secondaryHex: '#D3FF35',
    heroImage: '/templates/razorline/rl01-cobalt.png',
    detailImage: '/templates/razorline/rl01-detail-mesh.png',
    altText: 'RAZORLINE RL-01 Cobalt performance running shoe featuring an electric cobalt hollow-cavity midsole and voltage-lime eyelet lock',
    statusLabel: 'Track Series · Fictional Demo Price',
    description:
      'Engineered for high-speed cornering and wet tarmac grip. Features an electric cobalt structural chassis paired with voltage-lime lockdown eyelets.',
    architectureNotes: [
      'Reinforced lateral eyelet cage for tight radius track turns',
      'High-contrast cobalt polymer chassis with micro-siped outsole lugs',
      'Breathable zero-stretch matrix mesh across the vamp and midfoot'
    ],
    availableSizes: [8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0]
  },
  {
    id: 'rl01-shadow',
    code: 'RL-01 // SHD',
    name: 'RL-01 SHADOW',
    colorway: 'Matte Carbon / Smoked Graphite / Raw Steel',
    tagline: 'Sub-zero stealth finish for long-distance tempo blocks.',
    price: 255,
    weightGrams: 171,
    dropMm: 6,
    stackHeightMm: '38mm / 32mm',
    accentHex: '#A1A5A5',
    secondaryHex: '#D3FF35',
    heroImage: '/templates/razorline/rl01-shadow.png',
    detailImage: '/templates/razorline/rl01-detail-heel.png',
    altText: 'RAZORLINE RL-01 Shadow stealth performance running shoe in matte carbon black and smoked graphite hollow midsole',
    statusLabel: 'Blackout Run · Fictional Demo Price',
    description:
      'Stripped of high-chroma pigment for runners who prefer raw structural form. Uses a weather-treated carbon weave upper and smoked graphite cavity sole.',
    architectureNotes: [
      'Hydrophobic micro-coated carbon mesh upper for wet-weather sessions',
      'Smoked translucent elastomer sole with raw steel reflective stitch lines',
      'Extended Achilles pull-loop and molded heel counter lock'
    ],
    availableSizes: [7.5, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 12.0, 13.0]
  }
];

export const BREAKAWAY_FEATURES: BreakawayFeature[] = [
  {
    index: '01',
    title: 'Adaptive Sole Geometry',
    kicker: 'STRUCTURAL CAVITY CHASSIS',
    metric: '3-Chamber',
    unit: 'Mechanical Void Layout',
    description:
      'Instead of relying on solid blocks of soft foam that bottom out over distance, the RL-01 midsole carves three directional compression tunnels through the heel and midfoot. At footstrike, the walls flex inward and snap back as weight rolls toward the toe.',
    image: '/templates/razorline/rl01-detail-sole.png',
    imageAlt: 'Macro close-up of the RL-01 translucent lime hollow cavity midsole and sculpted compression struts',
    specNote: 'Design concept specification · Non-certified fictional architecture'
  },
  {
    index: '02',
    title: 'Engineered Matrix Mesh',
    kicker: 'CARBON-THREAD MONOFILAMENT',
    metric: '168g',
    unit: 'Target Concept Mass (US 9)',
    description:
      'Woven from non-absorbent monofilament yarns reinforced with directional ripstop ribs. The upper holds the foot flat over the footbed during sharp pace changes while shedding trapped heat through open-weave forefoot zones.',
    image: '/templates/razorline/rl01-detail-mesh.png',
    imageAlt: 'Macro close-up of the black carbon-textured monofilament mesh upper and cobalt blue support overlays',
    specNote: 'Design concept specification · Non-certified fictional architecture'
  },
  {
    index: '03',
    title: 'Precise Heel Support',
    kicker: 'CANTILEVERED ACHILLES CRADLE',
    metric: '6.0mm',
    unit: 'Heel-to-Toe Geometry Offset',
    description:
      'An external carbon-patterned heel wrap pairs with a flared rear sole lip to stabilize high-velocity landings. The sculpted collar flares away from the Achilles tendon to eliminate friction while locking the calcaneus in place.',
    image: '/templates/razorline/rl01-detail-heel.png',
    imageAlt: 'Macro close-up of the RL-01 rear heel counter, pull tab, and cantilevered lime midsole bulb',
    specNote: 'Design concept specification · Non-certified fictional architecture'
  }
];

export const TECH_CHAPTERS: TechChapter[] = [
  {
    id: 'chapter-sole',
    index: '01',
    title: 'HOLLOW-CORE AERO MIDSOLE',
    subtitle: 'Directional Void Compression & Propulsion',
    summary:
      'Traditional marathon foams trade stability for softness. The RL-01 replaces solid foam mass with three tuned geometric chambers that deform along a 14-degree forward vector, storing mechanical energy on impact and releasing it through toe-off.',
    image: '/templates/razorline/rl01-detail-sole.png',
    imageAlt: 'Detailed view of the translucent voltage-lime hollow midsole cavities',
    metricLabel: 'STACK GEOMETRY',
    metricValue: '38mm / 32mm',
    secondaryMetricLabel: 'CHAMBER WALL',
    secondaryMetricValue: '4.2mm Elastomer',
    coordinates: 'SEC // MIDSOLE-01 · LAT 45.10',
    callouts: [
      { label: 'REAR IMPACT VOID', value: '18mm Vertical Travel', x: '24%', y: '52%' },
      { label: 'MIDFOOT BRIDGE', value: 'Torsion Ribbing', x: '58%', y: '68%' },
      { label: 'FOREFOOT FLARE', value: '6mm Offset Roll', x: '82%', y: '78%' }
    ]
  },
  {
    id: 'chapter-mesh',
    index: '02',
    title: 'MATRIX MONOFILAMENT UPPER',
    subtitle: 'Zero-Stretch Lockdown & Thermal Venting',
    summary:
      'A dual-layer grid blends hydrophobic carbon-look ripstop across the heel and saddle with an ultra-open micro-mesh over the metatarsals. Cobalt TPU eyelet wings distribute lace tension evenly across the instep without pressure points.',
    image: '/templates/razorline/rl01-detail-mesh.png',
    imageAlt: 'Detailed view of the black carbon-weave mesh upper and cobalt-blue eyelet reinforcements',
    metricLabel: 'UPPER WEAVE',
    metricValue: '0.45mm Grid',
    secondaryMetricLabel: 'TENSION SADDLE',
    secondaryMetricValue: 'Dual Cobalt TPU',
    coordinates: 'SEC // UPPER-02 · LAT 45.10',
    callouts: [
      { label: 'COBALT EYELET STAY', value: 'Multi-Vector Lock', x: '46%', y: '28%' },
      { label: 'LATERAL SADDLE', value: 'Double-Stitched Seam', x: '42%', y: '56%' },
      { label: 'VAMP VENT ZONE', value: 'High-Airflow Weave', x: '76%', y: '64%' }
    ]
  },
  {
    id: 'chapter-heel',
    index: '03',
    title: 'TORSION-LOCK HEEL CRADLE',
    subtitle: 'Rearfoot Centering & Outsole Bite',
    summary:
      'The rear quarter combines a rigid woven heel cup with an extended bevelled midsole tail. Under the forefoot and heel strike zones, a high-durometer cobalt rubber outsole provides biting traction on wet asphalt and synthetic track surfaces.',
    image: '/templates/razorline/rl01-detail-heel.png',
    imageAlt: 'Detailed view of the sculpted heel counter and rear midsole geometry',
    metricLabel: 'HEEL LOCK',
    metricValue: '360° Cradle',
    secondaryMetricLabel: 'OUTSOLE COMPOUND',
    secondaryMetricValue: 'Cobalt Grip-70',
    coordinates: 'SEC // CHASSIS-03 · LAT 45.10',
    callouts: [
      { label: 'BALLISTIC PULL LOOP', value: 'Rapid Entry Tab', x: '48%', y: '18%' },
      { label: 'MOLDED COUNTER', value: 'Carbon-Weave Wrap', x: '38%', y: '48%' },
      { label: 'BEVELLED TAIL', value: 'Smooth Strike Entry', x: '26%', y: '74%' }
    ]
  }
];

export const ATHLETE_STORIES: AthleteStory[] = [
  {
    id: 'story-01',
    frameNumber: '01',
    athleteName: 'KAI VANCE',
    discipline: 'Unsanctioned Night Mile & Road 10K',
    location: 'BERLIN // TEMPELHOF RUNWAY',
    sessionData: 'PACE: 2:54/KM · SURFACE: WET TARMAC',
    quote: '“WHEN THE PACE DROPS BELOW THREE MINUTES PER KILOMETER, YOU WANT A SHOE THAT FEELS LIKE A BLADE, NOT A PILLOW.”',
    narrative:
      'Fictional test runner persona. Tested across 400km of late-night tarmac intervals on decommissioned runway strips where lateral stiffness and immediate ground read matter most.',
    modelUsed: 'RL-01 VOLTAGE // US 10.0',
    image: '/templates/razorline/rl01-voltage.png',
    accentColor: 'lime'
  },
  {
    id: 'story-02',
    frameNumber: '02',
    athleteName: 'SORA TAKAHASHI',
    discipline: 'Urban Tempo & Bridge Repeats',
    location: 'TOKYO // SHIBUYA OVERPASS LOOP',
    sessionData: 'CADENCE: 194 SPM · ELEVATION: +310M',
    quote: '“THE HOLLOW CHAMBERS COMPRESS ON THE DOWNHILL AND SNAP BACK INSTANTLY WHEN YOU HIT THE FLAT.”',
    narrative:
      'Fictional test runner persona. Focused on steep urban camber transitions and steel bridge grates, evaluating midfoot torsion control and forefoot traction.',
    modelUsed: 'RL-01 COBALT // US 8.5',
    image: '/templates/razorline/rl01-cobalt.png',
    accentColor: 'cobalt'
  },
  {
    id: 'story-03',
    frameNumber: '03',
    athleteName: 'MARCUS VEY',
    discipline: 'Threshold Half-Marathon Progression',
    location: 'ZURICH // INDUSTRIAL CANAL SECTOR',
    sessionData: 'SPLIT: 63:40 · TEMP: 4°C RAIN',
    quote: '“ZERO WATER RETENTION IN THE MESH. KILOMETER TWENTY FEELS EXACTLY AS LIGHT AS KILOMETER ONE.”',
    narrative:
      'Fictional test runner persona. Long-duration wet-weather progression runs verifying non-absorbent monofilament upper stability and Achilles collar comfort.',
    modelUsed: 'RL-01 SHADOW // US 10.5',
    image: '/templates/razorline/rl01-shadow.png',
    accentColor: 'lime'
  }
];

export const LOOKBOOK_FRAMES: LookbookFrame[] = [
  {
    id: 'look-01',
    index: '01 / 04',
    title: 'RL-01 VOLTAGE — LATERAL FLIGHT PROFILE',
    caption: 'Three-quarter suspended studio study highlighting the sculpted lime cavity chassis and cobalt tension stays.',
    locationCode: 'STUDIO LAB // SECTOR 01',
    modelName: 'RL-01 VOLTAGE',
    image: '/templates/razorline/rl01-voltage.png',
    secondaryImage: '/templates/razorline/rl01-detail-sole.png',
    aspectLabel: 'LATERAL ARCHIVE // 01'
  },
  {
    id: 'look-02',
    index: '02 / 04',
    title: 'HOLLOW-CHAMBER MIDSOLE COMPRESSION STUDY',
    caption: 'Macro cross-section of the three aerodynamic tunnels engineered to deform and rebound under forefoot load.',
    locationCode: 'CHASSIS TEST // SECTOR 02',
    modelName: 'AERO-SOLE CHASSIS',
    image: '/templates/razorline/rl01-detail-sole.png',
    secondaryImage: '/templates/razorline/rl01-voltage.png',
    aspectLabel: 'MACRO SOLE // 02'
  },
  {
    id: 'look-03',
    index: '03 / 04',
    title: 'RL-01 COBALT — NIGHT TRACK SPECIFICATION',
    caption: 'Electric cobalt structural polymer paired with high-visibility voltage-lime lockdown hardware for nocturnal speed.',
    locationCode: 'NIGHT TRACK // SECTOR 03',
    modelName: 'RL-01 COBALT',
    image: '/templates/razorline/rl01-cobalt.png',
    secondaryImage: '/templates/razorline/rl01-detail-mesh.png',
    aspectLabel: 'COBALT EDITION // 03'
  },
  {
    id: 'look-04',
    index: '04 / 04',
    title: 'RL-01 SHADOW — SUB-ZERO STEALTH ARCHITECTURE',
    caption: 'Matte carbon monofilament weave and smoked graphite sole geometry stripped to pure mechanical silhouette.',
    locationCode: 'BLACKOUT LAB // SECTOR 04',
    modelName: 'RL-01 SHADOW',
    image: '/templates/razorline/rl01-shadow.png',
    secondaryImage: '/templates/razorline/rl01-detail-heel.png',
    aspectLabel: 'SHADOW EDITION // 04'
  }
];
]]>
    </file>
    <file path="src/app/(razorline)/razorline/utils/storeLogic.ts">
<![CDATA[import { ProductModel } from '../data/catalog';

export interface BagItem {
  key: string;
  modelId: string;
  name: string;
  code: string;
  colorway: string;
  size: number;
  unitPrice: number;
  quantity: number;
  image: string;
  accentHex: string;
}

export interface BagTotals {
  itemCount: number;
  subtotal: number;
  shippingLabel: string;
  total: number;
}

export interface ValidationResult {
  valid: boolean;
  error: string | null;
  normalizedEmail: string;
}

export function addToBag(
  items: BagItem[],
  model: ProductModel,
  size: number,
  quantityToAdd: number = 1
): BagItem[] {
  const safeQty = Math.max(1, Math.floor(quantityToAdd));
  const key = `${model.id}::${size.toFixed(1)}`;
  const existingIndex = items.findIndex((item) => item.key === key);

  if (existingIndex >= 0) {
    return items.map((item, idx) =>
      idx === existingIndex
        ? { ...item, quantity: Math.min(10, item.quantity + safeQty) }
        : item
    );
  }

  const nextItem: BagItem = {
    key,
    modelId: model.id,
    name: model.name,
    code: model.code,
    colorway: model.colorway,
    size,
    unitPrice: model.price,
    quantity: safeQty,
    image: model.heroImage,
    accentHex: model.accentHex
  };

  return [...items, nextItem];
}

export function updateBagQuantity(
  items: BagItem[],
  key: string,
  delta: number
): BagItem[] {
  return items
    .map((item) => {
      if (item.key !== key) return item;
      const nextQty = item.quantity + delta;
      return { ...item, quantity: Math.min(10, nextQty) };
    })
    .filter((item) => item.quantity > 0);
}

export function calculateBagTotals(items: BagItem[]): BagTotals {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  return {
    itemCount,
    subtotal,
    shippingLabel: subtotal > 0 ? 'COMPLIMENTARY EXPRESS (DEMO)' : '—',
    total: subtotal
  };
}

export function validateLaunchSignup(rawInput: string): ValidationResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      valid: false,
      error: 'Enter an email address to reserve RL-01 drop dispatches.',
      normalizedEmail: ''
    };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return {
      valid: false,
      error: 'Enter a valid email format (e.g., runner@razorline.lab).',
      normalizedEmail: ''
    };
  }
  return {
    valid: true,
    error: null,
    normalizedEmail: trimmed.toLowerCase()
  };
}

export function stepLookbookIndex(current: number, delta: number, total: number): number {
  if (total <= 0) return 0;
  return ((current + delta) % total + total) % total;
}

export function computeScrollMarqueeOffset(scrollY: number, maxRange: number = 360): number {
  if (!Number.isFinite(scrollY) || scrollY <= 0) return 0;
  const raw = (scrollY * 0.22) % (maxRange * 2);
  return raw <= maxRange ? -raw : -(maxRange * 2 - raw);
}
]]>
    </file>
  </files>
</template>
