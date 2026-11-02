<template slug="poppypatch" name="Poppy Patch">
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
    <file path="src/app/(poppypatch)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./poppypatch/poppypatch.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "Poppy Patch — At-Home Mushroom Growing Kits",
  description:
    "Playful, tactile starter kits for growing edible mushrooms at home. Easy to grow, impossible not to love.",
  openGraph: {
    title: "Poppy Patch — At-Home Mushroom Growing Kits",
    description:
      "Playful, tactile starter kits for growing edible mushrooms at home. Easy to grow, impossible not to love.",
    type: "website",
  },
  icons: { icon: "/templates/poppypatch/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#F7ECD6",
  colorScheme: "light",
};

export default function PoppyPatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} ${caveat.variable} scroll-smooth`}
    >
      <body className="bg-[#F7ECD6] text-[#4D3025] antialiased selection:bg-[#F28B72]/30 selection:text-[#4D3025]">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(poppypatch)/poppypatch/App.tsx">
<![CDATA[/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  MUSHROOM_KITS,
  JOURNAL_ARTICLES,
  MushroomKit,
  JournalArticle
} from './data/poppyPatchData';
import {
  BagItem,
  updateBagItems,
  calculateBagSummary
} from './utils/storeLogic';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PurposeStrip } from './components/PurposeStrip';
import { KitsSection } from './components/KitsSection';
import { HowItGrowsSection } from './components/HowItGrowsSection';
import { WhyDifferentSection } from './components/WhyDifferentSection';
import { JournalSection } from './components/JournalSection';
import { CommunitySection } from './components/CommunitySection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import {
  KitDetailModal,
  ArticleReaderModal,
  ShoppingBagDrawer
} from './components/Overlays';

export default function PoppyPatchApp() {
  const [bagItems, setBagItems] = useState<BagItem[]>([
    { kit: MUSHROOM_KITS[0], quantity: 1 }
  ]);
  const [bagDrawerOpen, setBagDrawerOpen] = useState(false);
  const [selectedKit, setSelectedKit] = useState<MushroomKit | null>(null);
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);

  const bagSummary = calculateBagSummary(bagItems);

  const handleAddToBag = (kit: MushroomKit) => {
    setBagItems((prev) => updateBagItems(prev, kit, 1));
  };

  const handleUpdateQty = (kit: MushroomKit, delta: number) => {
    setBagItems((prev) => updateBagItems(prev, kit, delta));
  };

  const handleClearBag = () => {
    setBagItems([]);
  };

  const scrollToKits = () => {
    const kitsEl = document.getElementById('our-kits');
    if (kitsEl) {
      kitsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Close active modal/drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedKit(null);
        setActiveArticle(null);
        setBagDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col paper-surface text-[#4A2E25]">
      <Navbar
        bagCount={bagSummary.totalItems}
        onOpenBag={() => setBagDrawerOpen(true)}
      />

      <main className="flex-1">
        <HeroSection onExploreKits={scrollToKits} />
        <PurposeStrip />
        <KitsSection
          kits={MUSHROOM_KITS}
          onAddToBag={handleAddToBag}
          onSelectKitDetails={(kit) => setSelectedKit(kit)}
        />
        <HowItGrowsSection />
        <WhyDifferentSection />
        <JournalSection
          articles={JOURNAL_ARTICLES}
          onReadArticle={(article) => setActiveArticle(article)}
        />
        <CommunitySection />
        <FaqSection />
        <FinalCtaSection onScrollToKits={scrollToKits} />
      </main>

      <Footer />

      {/* Interactive Modals & Bag Drawer */}
      <KitDetailModal
        kit={selectedKit}
        onClose={() => setSelectedKit(null)}
        onAddToBag={handleAddToBag}
      />

      <ArticleReaderModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />

      <ShoppingBagDrawer
        isOpen={bagDrawerOpen}
        items={bagItems}
        onClose={() => setBagDrawerOpen(false)}
        onUpdateQty={handleUpdateQty}
        onClearBag={handleClearBag}
      />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(poppypatch)/poppypatch/assets.generated.ts">
<![CDATA[// Generated by scripts/process-images.ts — do not edit by hand.
export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(poppypatch)/poppypatch/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

export function Picture({
  assetKey,
  alt,
  className = "",
  priority = false,
}: {
  assetKey: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const asset = ASSETS[assetKey];
  if (!asset)
    return (
      <div className={`pp-placeholder ${className}`} role="img" aria-label={alt}>
        {assetKey}
      </div>
    );
  const src = (width: number, format: string) =>
    `/templates/poppypatch/${assetKey}-${width}.${format}`;
  return (
    <picture className={className}>
      <source
        type="image/avif"
        srcSet={`${src(800, "avif")} 800w, ${src(1600, "avif")} 1600w`}
        sizes="100vw"
      />
      <img
        src={src(1600, "webp")}
        srcSet={`${src(800, "webp")} 800w, ${src(1600, "webp")} 1600w`}
        sizes="100vw"
        width={asset.w}
        height={asset.h}
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
    <file path="src/app/(poppypatch)/poppypatch/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" fill="none">
  <rect width="44" height="44" rx="10" fill="#F7ECD6"/>
  <path d="M8 22C8 12.5 14.5 7 22 7C29.5 7 36 12.5 36 22C36 24.5 33.5 25.5 22 25.5C10.5 25.5 8 24.5 8 22Z" fill="#E58267" stroke="#4A2E25" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M17.5 25.5C17 30.5 16 35 17.5 37.5C19 39.5 25 39.5 26.5 37.5C28 35 27 30.5 26.5 25.5" fill="#FAF3E3" stroke="#4A2E25" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="16" cy="15" r="2" fill="#FAF3E3" />
  <circle cx="23" cy="13" r="2.4" fill="#FAF3E3" />
  <circle cx="29" cy="17" r="1.8" fill="#FAF3E3" />
</svg>
]]>
    </file>
    <file path="src/app/(poppypatch)/poppypatch/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: 80,
          background: "#F7ECD6",
          color: "#4A2E25",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#4A2E25",
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path
              d="M8 22C8 12.5 14.5 7 22 7C29.5 7 36 12.5 36 22C36 24.5 33.5 25.5 22 25.5C10.5 25.5 8 24.5 8 22Z"
              fill="#E58267"
              stroke="#4A2E25"
              strokeWidth="2.5"
            />
            <path
              d="M17.5 25.5C17 30.5 16 35 17.5 37.5C19 39.5 25 39.5 26.5 37.5C28 35 27 30.5 26.5 25.5"
              fill="#FAF3E3"
              stroke="#4A2E25"
              strokeWidth="2.5"
            />
            <circle cx="16" cy="15" r="2" fill="#FAF3E3" />
            <circle cx="23" cy="13" r="2.4" fill="#FAF3E3" />
            <circle cx="29" cy="17" r="1.8" fill="#FAF3E3" />
          </svg>
          poppy patch
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 72,
            lineHeight: 1.08,
            fontWeight: 700,
          }}
        >
          Fresh kitchen-grown mushrooms.{" "}
          <span style={{ color: "#E58267" }}>Mist twice daily, harvest in 10 days.</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#735449" }}>
          Playful, tactile starter kits for growing edible mushrooms at home.
        </div>
      </div>
    ),
    size
  );
}
]]>
    </file>
    <file path="src/app/(poppypatch)/poppypatch/page.tsx">
<![CDATA["use client";

import PoppyPatchApp from "./App";

export default function PoppyPatchPage() {
  return <PoppyPatchApp />;
}
]]>
    </file>
    <file path="src/app/(poppypatch)/poppypatch/poppypatch.css">
<![CDATA[@import "tailwindcss";

@layer base {
  :root {
    --bg-vanilla: #F7ECD6;
    --bg-vanilla-soft: #FAF3E3;
    --bg-card-cream: #FBF6EA;
    --coral-primary: #E58267;
    --coral-deep: #D96E52;
    --coral-tint: #F7D4C8;
    --pistachio: #A8B96C;
    --pistachio-tint: #E2EAC7;
    --lilac: #E3B6E0;
    --lilac-tint: #F3E2F2;
    --cocoa-ink: #4A2E25;
    --cocoa-muted: #735449;
    --warm-shadow: #C3A58E;
  }

  body {
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: var(--bg-vanilla);
    color: var(--cocoa-ink);
    overflow-x: hidden;
  }

  h1, h2, h3, .font-serif-display {
    font-family: 'Fraunces', Georgia, serif;
    font-variation-settings: "SOFT" 80, "WONK" 1;
  }

  .font-hand {
    font-family: 'Caveat', cursive;
  }
}

/* Subtle paper grain overlay */
.paper-surface {
  background-color: #F7ECD6;
  background-image: 
    radial-gradient(at 18% 12%, rgba(242, 139, 114, 0.08) 0px, transparent 50%),
    radial-gradient(at 82% 24%, rgba(168, 185, 108, 0.10) 0px, transparent 48%),
    radial-gradient(at 50% 75%, rgba(233, 182, 226, 0.08) 0px, transparent 55%);
}

/* Organic hand-sculpted button shape */
.btn-clay-coral {
  background-color: #E58267;
  color: #4A2E25;
  border-radius: 36px 42px 34px 40px / 32px 36px 30px 38px;
  box-shadow: 
    0 6px 0 #C4684E,
    0 12px 20px -4px rgba(138, 86, 65, 0.28),
    inset 0 2px 3px rgba(255, 244, 235, 0.45);
  transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 180ms cubic-bezier(0.16, 1, 0.3, 1), background-color 180ms ease;
}

.btn-clay-coral:hover {
  background-color: #EB8B71;
  transform: translateY(-2px);
  box-shadow: 
    0 8px 0 #C4684E,
    0 16px 24px -4px rgba(138, 86, 65, 0.32),
    inset 0 2px 4px rgba(255, 244, 235, 0.55);
}

.btn-clay-coral:active {
  transform: translateY(3px) scale(0.985);
  box-shadow: 
    0 2px 0 #C4684E,
    0 6px 10px -2px rgba(138, 86, 65, 0.22),
    inset 0 2px 3px rgba(90, 40, 28, 0.18);
}

/* Organic card shapes */
.card-papier {
  border-radius: 28px 34px 26px 32px / 26px 30px 28px 32px;
  box-shadow: 0 12px 28px -10px rgba(124, 88, 66, 0.16), 0 2px 0 rgba(86, 58, 50, 0.08);
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms cubic-bezier(0.16, 1, 0.3, 1), border-radius 250ms ease;
}

.card-papier:hover {
  border-radius: 34px 26px 32px 28px / 30px 26px 32px 28px;
}

/* Postage stamp perforated border look */
.postage-stamp {
  background-color: #FAF3E3;
  border: 1.5px dashed rgba(86, 58, 50, 0.35);
  box-shadow: 0 4px 10px rgba(115, 84, 73, 0.12);
}

/* Opening & Scroll Animations */
@keyframes heroHeadlineRise {
  0% {
    opacity: 0;
    transform: translateY(105%) rotate(1.5deg);
  }
  70% {
    opacity: 1;
    transform: translateY(-3%) rotate(-0.3deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotate(0deg);
  }
}

@keyframes kitBounceSettle {
  0% {
    opacity: 0;
    transform: translateY(28px) scale(0.92);
  }
  65% {
    opacity: 1;
    transform: translateY(-5px) scale(1.015);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes rootedSproutGrow {
  0% {
    opacity: 0;
    transform: scale(0.25) rotate(-6deg);
  }
  72% {
    opacity: 1;
    transform: scale(1.05) rotate(1.5deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes stampPressIn {
  0% {
    opacity: 0;
    transform: scale(1.35) rotate(-14deg);
  }
  70% {
    opacity: 1;
    transform: scale(0.94) rotate(7deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(5deg);
  }
}

@keyframes gardenerGentleRock {
  0%, 100% {
    transform: rotate(0deg) translateY(0px);
  }
  50% {
    transform: rotate(-2.5deg) translateY(-2px);
  }
}

@keyframes strokeDraw {
  from {
    stroke-dashoffset: 400;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.animate-headline-1 {
  animation: heroHeadlineRise 700ms cubic-bezier(0.16, 1, 0.3, 1) 80ms both;
}
.animate-headline-2 {
  animation: heroHeadlineRise 750ms cubic-bezier(0.16, 1, 0.3, 1) 200ms both;
}
.animate-headline-3 {
  animation: heroHeadlineRise 800ms cubic-bezier(0.16, 1, 0.3, 1) 320ms both;
}

.animate-kit-arrive {
  animation: kitBounceSettle 850ms cubic-bezier(0.16, 1, 0.3, 1) 180ms both;
}

.animate-sprout-1 {
  transform-origin: bottom center;
  animation: rootedSproutGrow 750ms cubic-bezier(0.16, 1, 0.3, 1) 420ms both;
}
.animate-sprout-2 {
  transform-origin: bottom center;
  animation: rootedSproutGrow 780ms cubic-bezier(0.16, 1, 0.3, 1) 560ms both;
}
.animate-sprout-3 {
  transform-origin: bottom center;
  animation: rootedSproutGrow 820ms cubic-bezier(0.16, 1, 0.3, 1) 700ms both;
}

.animate-stamp-press {
  transform-origin: center center;
  animation: stampPressIn 650ms cubic-bezier(0.16, 1, 0.3, 1) 840ms both;
}

.animate-gardener-rock {
  transform-origin: bottom center;
  animation: gardenerGentleRock 4.5s ease-in-out infinite;
}

.animate-stroke-draw {
  stroke-dasharray: 400;
  animation: strokeDraw 1.1s cubic-bezier(0.16, 1, 0.3, 1) 500ms both;
}

/* Reduced motion compliance */
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
    <file path="src/app/(poppypatch)/poppypatch/components/CommunitySection.tsx">
<![CDATA[import React from 'react';
import { COMMUNITY_VIGNETTES } from '../data/poppyPatchData';
import { SparkleStar } from './DoodleSvg';

export function CommunitySection() {
  return (
    <section
      aria-labelledby="community-heading"
      className="py-16 sm:py-24 relative"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-bold tracking-[0.12em] uppercase text-[#8A4D38] mb-2">
              COUNTERTOP STORIES
            </p>
            <h2
              id="community-heading"
              className="font-serif-display font-bold text-[#4A2E25] text-[clamp(2.1rem,4vw,3.2rem)] leading-[1.08] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Little moments of magic from happy growers.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#69493E] max-w-[44ch] bg-[#FAF3E3] px-4 py-3 rounded-2xl border border-[#4A2E25]/12">
            <strong className="text-[#4A2E25]">Editorial studio note:</strong> The stories below are fictional example vignettes created for the Poppy Patch concept world to illustrate typical countertop growing moments.
          </p>
        </div>

        {/* 4-Card Editorial Mosaic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {COMMUNITY_VIGNETTES.map((item) => (
            <article
              key={item.id}
              style={{ backgroundColor: item.bgTint }}
              className="card-papier p-6 sm:p-8 border border-[#4A2E25]/15 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between"
            >
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[#69493E]">
                  <span>{item.kitUsed}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.daysToHarvest}</span>
                </div>

                <blockquote className="font-serif-display text-lg sm:text-[19px] text-[#4A2E25] leading-relaxed">
                  {item.quote}
                </blockquote>

                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-[#563A32]">
                  <SparkleStar className="w-3.5 h-3.5 shrink-0" />
                  <strong className="font-bold text-[#4A2E25]">{item.growerName}</strong>
                  <span aria-hidden="true">·</span>
                  <span>{item.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>Spot: {item.countertopSpot}</span>
                </div>
              </div>

              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#FAF3E3]/85 border border-[#4A2E25]/12 p-3 shrink-0 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={`Mushroom cluster for ${item.growerName}'s story`}
                  width={112}
                  height={112}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain drop-shadow-[0_8px_12px_rgba(90,54,40,0.18)]"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(poppypatch)/poppypatch/components/DoodleSvg.tsx">
<![CDATA[import React from 'react';

export function SparkleStar({
  className = 'w-6 h-6',
  color = '#4A2E25'
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 2C16.8 10.2 21.8 15.2 30 16C21.8 16.8 16.8 21.8 16 30C15.2 21.8 10.2 16.8 2 16C10.2 15.2 15.2 10.2 16 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CoralUnderline({ className = 'w-full h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 26"
      fill="none"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M6 17C98 6 278 4 412 13C348 16 184 18 52 22"
        stroke="#E58267"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-stroke-draw"
      />
    </svg>
  );
}

export function CurlyArrow({ className = 'w-9 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 38"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M38 6C43 13 36 22 28 18C22 15 26 8 32 11C38 14 31 28 10 31M10 31L18 25M10 31L19 35"
        stroke="#4A2E25"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BotanicalSprig({
  className = 'w-12 h-16',
  color = '#4A2E25'
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 88"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M32 82C31 58 34 32 42 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M33 62C20 58 14 46 22 40C30 34 35 48 33 62Z"
        stroke={color}
        strokeWidth="1.8"
        fill="#A8B96C"
        fillOpacity="0.35"
      />
      <path
        d="M35 46C48 42 54 30 46 24C38 18 33 32 35 46Z"
        stroke={color}
        strokeWidth="1.8"
        fill="#A8B96C"
        fillOpacity="0.35"
      />
      <path
        d="M38 26C26 22 22 12 29 7C36 2 40 15 38 26Z"
        stroke={color}
        strokeWidth="1.8"
        fill="#F28B72"
        fillOpacity="0.3"
      />
    </svg>
  );
}

export function HandDrawnMushroomIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 22C8 12.5 14.5 7 22 7C29.5 7 36 12.5 36 22C36 24.5 33.5 25.5 22 25.5C10.5 25.5 8 24.5 8 22Z"
        fill="#E58267"
        stroke="#4A2E25"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 25.5C17 30.5 16 35 17.5 37.5C19 39.5 25 39.5 26.5 37.5C28 35 27 30.5 26.5 25.5"
        fill="#FAF3E3"
        stroke="#4A2E25"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="15" r="2" fill="#FAF3E3" />
      <circle cx="23" cy="13" r="2.4" fill="#FAF3E3" />
      <circle cx="29" cy="17" r="1.8" fill="#FAF3E3" />
    </svg>
  );
}
]]>
    </file>
    <file path="src/app/(poppypatch)/poppypatch/components/FaqSection.tsx">
<![CDATA[import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/poppyPatchData';
import { ChevronDown } from 'lucide-react';

export function FaqSection() {
  const [openIds, setOpenIds] = useState<string[]>([FAQ_ITEMS[0].id]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-16 sm:py-24 relative border-t border-[#4A2E25]/10 bg-[#FAF3E3]/45"
    >
      <div className="max-w-[1040px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs sm:text-sm font-bold tracking-[0.12em] uppercase text-[#8A4D38] mb-2">
            CARE, STORAGE & REALISTIC ANSWERS
          </p>
          <h2
            id="faq-heading"
            className="font-serif-display font-bold text-[#4A2E25] text-[clamp(2rem,3.8vw,3.1rem)] leading-[1.08] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Questions from curious first-time growers.
          </h2>
          <p className="mt-3 text-[15px] text-[#5E4137]">
            Straightforward tips on storing, misting, and cooking your harvest—no mycology degree required.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openIds.includes(item.id);
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-btn-${item.id}`;

            return (
              <div
                key={item.id}
                className="card-papier bg-[#FAF3E3] border border-[#4A2E25]/15 overflow-hidden"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left px-6 py-5 sm:px-7 sm:py-6 flex items-center justify-between gap-4 hover:bg-[#F4E8D0]/60 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#4A2E25]"
                  >
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-[#8A4D38] mb-1">
                        {item.category}
                      </span>
                      <span className="font-serif-display font-bold text-lg sm:text-xl text-[#4A2E25]">
                        {item.question}
                      </span>
                    </div>
                    <span
                      className={`w-9 h-9 rounded-full border border-[#4A2E25]/20 bg-[#F7ECD6] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[#E58267]/30' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 text-[#4A2E25]" aria-hidden="true" />
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-6 pb-6 sm:px-7 sm:pb-7 pt-1 border-t border-[#4A2E25]/10 text-[15px] text-[#563A32] leading-relaxed"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(poppypatch)/poppypatch/components/FinalCtaSection.tsx">
<![CDATA[import React, { useState } from 'react';
import { validateNewsletterEmail } from '../utils/storeLogic';
import { SparkleStar, CoralUnderline } from './DoodleSvg';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface FinalCtaSectionProps {
  onScrollToKits: () => void;
}

export function FinalCtaSection({ onScrollToKits }: FinalCtaSectionProps) {
  const [emailInput, setEmailInput] = useState('');
  const [favoriteVariety, setFavoriteVariety] = useState('Coral Oyster');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateNewsletterEmail(emailInput);

    if (!validation.valid) {
      setErrorMsg(validation.error || 'Please enter a valid email address.');
      setSubmittedEmail(null);
      return;
    }

    setErrorMsg(null);
    setSubmittedEmail(validation.normalizedEmail || emailInput.trim());
    setEmailInput('');
  };

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="py-16 sm:py-24 relative overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="card-papier bg-[#F9DFD5] border-2 border-[#4A2E25]/15 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Decorative pistachio paper-cut circle */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -bottom-16 w-72 h-72 rounded-full bg-[#E3EBC9]/80 border border-[#4A2E25]/10"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Big Papier-Collé Heading & Kit CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF3E3] border border-[#4A2E25]/20 text-xs font-bold uppercase tracking-wider text-[#4A2E25]">
                <SparkleStar className="w-3.5 h-3.5" />
                <span>READY FOR YOUR FIRST HARVEST?</span>
              </div>

              <div>
                <h2
                  id="final-cta-heading"
                  className="font-serif-display font-black text-[#4A2E25] text-[clamp(2.4rem,4.8vw,4.1rem)] leading-[1.02] tracking-tight uppercase"
                  style={{ textWrap: 'balance' }}
                >
                  LET’S GROW SOMETHING GOOD.
                </h2>
                <div className="w-64 mt-1">
                  <CoralUnderline className="w-full h-4" />
                </div>
              </div>

              <p className="text-[17px] text-[#4A2E25]/90 max-w-[48ch] leading-relaxed">
                Pick a starter block for your own kitchen counter or send a little box of everyday wonder to a curious friend.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-5">
                <button
                  type="button"
                  onClick={onScrollToKits}
                  className="btn-clay-coral px-8 py-4 text-sm sm:text-base font-bold uppercase tracking-wider text-[#4A2E25] cursor-pointer whitespace-nowrap"
                >
                  CHOOSE YOUR FIRST KIT
                </button>

                <div className="flex items-center gap-3">
                  <img
                    src="/templates/poppypatch/cutout-gardener.png"
                    alt="Miniature clay gardener holding watering can"
                    width={56}
                    height={66}
                    referrerPolicy="no-referrer"
                    className="w-12 h-14 object-contain rounded-lg"
                  />
                  <span className="text-xs font-medium text-[#563A32] max-w-[22ch]">
                    Includes our illustrated 16-page starter field guide in every box.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Validated Field Notes Club Form (Demo State) */}
            <div className="lg:col-span-5 bg-[#FAF3E3] rounded-3xl p-6 sm:p-8 border border-[#4A2E25]/18 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8A4D38]">
                  SUNDAY GROWING NOTES
                </span>
                <span className="postage-stamp px-2 py-0.5 text-[10px] font-bold uppercase text-[#4A2E25] rounded">
                  DEMO SIGNUP
                </span>
              </div>

              <h3 className="font-serif-display font-bold text-2xl text-[#4A2E25] mb-2">
                Get seasonal care tips & skillet recipes
              </h3>
              <p className="text-sm text-[#563A32] mb-5 leading-relaxed">
                Join our studio dispatch for printable misting calendars and seasonal mushroom recipes.
              </p>

              {submittedEmail ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-5 rounded-2xl bg-[#E3EBC9] border border-[#4A2E25]/20 space-y-3"
                >
                  <div className="flex items-center gap-2 text-[#2E3A13] font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Welcome to the Poppy Patch Journal!</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#3A461C] leading-relaxed">
                    Demo confirmation: We’ve registered <strong>{submittedEmail}</strong> with a preference for <strong>{favoriteVariety}</strong> notes.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmittedEmail(null)}
                    className="text-xs font-bold underline text-[#2E3A13] cursor-pointer"
                  >
                    Register another email address
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label
                      htmlFor="newsletter-variety"
                      className="block text-xs font-bold uppercase tracking-wider text-[#4A2E25] mb-1.5"
                    >
                      Variety You’re Most Curious About
                    </label>
                    <select
                      id="newsletter-variety"
                      value={favoriteVariety}
                      onChange={(e) => setFavoriteVariety(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F7ECD6] border border-[#4A2E25]/25 text-sm font-medium text-[#4A2E25] focus:outline-2 focus:outline-[#4A2E25]"
                    >
                      <option value="Coral Oyster">Terracotta Coral Oyster</option>
                      <option value="Cream Pearl Oyster">Cream Pearl Oyster</option>
                      <option value="Velvet Lilac Oyster">Velvet Lilac Oyster</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="newsletter-email"
                      className="block text-xs font-bold uppercase tracking-wider text-[#4A2E25] mb-1.5"
                    >
                      Your Email Address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={emailInput}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                        if (errorMsg) setErrorMsg(null);
                      }}
                      placeholder="clara@kitchenpatch.com"
                      aria-invalid={Boolean(errorMsg)}
                      aria-describedby={errorMsg ? 'newsletter-error' : undefined}
                      className="w-full px-4 py-3 rounded-xl bg-[#F7ECD6] border border-[#4A2E25]/25 text-sm text-[#4A2E25] placeholder:text-[#7A5447]/60 focus:outline-2 focus:outline-[#4A2E25]"
                    />
                    {errorMsg && (
                      <p
                        id="newsletter-error"
                        role="alert"
                        className="mt-2 flex items-start gap-1.5 text-xs font-semibold text-[#B42318]"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{errorMsg}</span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#4A2E25] hover:bg-[#382119] text-[#FAF3E3] font-bold text-sm tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Send Me Field Notes
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(poppypatch)/poppypatch/components/Footer.tsx">
<![CDATA[import React from 'react';
import { BotanicalSprig } from './DoodleSvg';

export function Footer() {
  return (
    <footer className="bg-[#4A2E25] text-[#F7ECD6] pt-16 pb-12 border-t border-[#4A2E25]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F7ECD6]/15">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2.5">
              <span className="font-serif-display font-bold text-3xl tracking-tight text-[#FAF3E3]">
                poppy patch
              </span>
              <img
                src="/templates/poppypatch/logo-mushroom.png"
                alt=""
                width={32}
                height={34}
                referrerPolicy="no-referrer"
                className="w-7 h-7 object-contain bg-[#FAF3E3] rounded-full p-0.5"
              />
            </div>
            <p className="text-sm text-[#F7ECD6]/80 max-w-[38ch] leading-relaxed">
              Small-batch culinary mushroom starter kits designed for curious kitchens, patient mornings, and warm skillets.
            </p>
            <p className="text-xs text-[#F7ECD6]/65">
              Fictional brand & interactive showcase · Crafted with tactile clay & botanical art direction.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2 space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#F28B72]">
              The Patch
            </h3>
            <ul className="space-y-2 text-sm text-[#F7ECD6]/85">
              <li>
                <a href="#our-kits" className="hover:text-[#F28B72] transition-colors">
                  Our Kits
                </a>
              </li>
              <li>
                <a href="#how-it-grows" className="hover:text-[#F28B72] transition-colors">
                  How It Grows
                </a>
              </li>
              <li>
                <a href="#our-story" className="hover:text-[#F28B72] transition-colors">
                  Why It’s Different
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#A8B96C]">
              Learn & Cook
            </h3>
            <ul className="space-y-2 text-sm text-[#F7ECD6]/85">
              <li>
                <a href="#the-journal" className="hover:text-[#A8B96C] transition-colors">
                  Growing Journal
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#A8B96C] transition-colors">
                  Care & Storage FAQ
                </a>
              </li>
              <li>
                <a href="#how-it-grows" className="hover:text-[#A8B96C] transition-colors">
                  Conditions Planner
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div className="flex items-center gap-3 bg-[#5A3A2E] p-3.5 rounded-2xl border border-[#F7ECD6]/12">
              <img
                src="/templates/poppypatch/cutout-coral-oysters.png"
                alt=""
                width={54}
                height={50}
                referrerPolicy="no-referrer"
                className="w-12 h-12 object-contain shrink-0"
              />
              <div className="text-xs text-[#F7ECD6]/90">
                <strong className="block font-serif-display text-sm text-[#FAF3E3]">
                  10–14 Day Typical Cycle
                </strong>
                Just add tap water & indirect kitchen light.
              </div>
            </div>
          </div>
        </div>

        {/* Oversized Wordmark & Copyright */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-serif-display font-black text-[clamp(2.5rem,7vw,5.5rem)] leading-none tracking-tight text-[#FAF3E3]/15 select-none">
            poppy patch
          </p>
          <div className="flex items-center gap-4 text-xs text-[#F7ECD6]/70">
            <BotanicalSprig className="w-6 h-8" color="#F7ECD6" />
            <span>© 2026 Poppy Patch Studio. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
]]>
    </file>
    <file path="src/app/(poppypatch)/poppypatch/components/HeroSection.tsx">
<![CDATA[import React, { useState } from 'react';
import { SparkleStar, CoralUnderline, CurlyArrow } from './DoodleSvg';

interface HeroSectionProps {
  onExploreKits: () => void;
}

export function HeroSection({ onExploreKits }: HeroSectionProps) {
  const [highlightHotspots, setHighlightHotspots] = useState(false);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-4 pb-14 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24"
    >
      {/* Subtle organic cream paper-cut background shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-[480px] h-[420px] rounded-full bg-[#FAF3E3]/70 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-0 w-[520px] h-[520px] rounded-full bg-[#F28B72]/8 blur-3xl"
      />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* Left Column: Editorial Headline, Stamp, Copy, CTA Row, Benefits */}
          <div className="lg:col-span-6 xl:col-span-6 relative z-10 flex flex-col items-start text-left">
            {/* Tilted Hand-Drawn Lavender Oval Stamp: A LITTLE MAGIC, RIGHT AT HOME. */}
            <div className="relative mb-5 sm:mb-6 ml-2 sm:ml-4 animate-stamp-press">
              <SparkleStar className="w-5 h-5 absolute -top-3 -right-3 text-[#4A2E25]" />
              <SparkleStar className="w-4 h-4 absolute -bottom-2 -left-3 text-[#4A2E25]" />
              <div className="relative px-6 py-3 -rotate-6 rounded-[50%] border-[3px] border-[#DFB3DD] bg-[#F7ECD6]/90 shadow-[0_3px_0_rgba(223,179,221,0.4)]">
                <p className="text-[13px] sm:text-[15px] font-semibold tracking-[0.08em] uppercase leading-snug text-[#4A2E25] text-center">
                  A LITTLE MAGIC,
                  <br />
                  RIGHT AT HOME.
                </p>
              </div>
            </div>

            {/* 3-Line Masked Display Serif Headline */}
            <div className="relative w-full max-w-[600px]">
              <h1
                id="hero-heading"
                className="font-serif-display font-black text-[#4A2E25] tracking-[-0.02em] leading-[0.96] text-[clamp(2.35rem,5.4vw,5.1rem)] uppercase select-none"
              >
                <span className="block overflow-hidden py-0.5 sm:pl-14">
                  <span className="block animate-headline-1">GROW</span>
                </span>
                <span className="block overflow-hidden py-0.5 sm:pl-4">
                  <span className="block animate-headline-2">SOMETHING</span>
                </span>
                <span className="block overflow-hidden py-0.5 relative">
                  <span className="inline-flex items-baseline animate-headline-3">
                    <span>WONDERFUL.</span>
                    <SparkleStar className="w-5 h-5 sm:w-7 sm:h-7 ml-1 -translate-y-4 sm:-translate-y-6 shrink-0" />
                  </span>
                </span>
              </h1>

              {/* Hand-drawn Coral Underline under WONDERFUL. */}
              <div className="w-[88%] sm:w-[82%] mt-1 ml-2">
                <CoralUnderline className="w-full h-5" />
              </div>
            </div>

            {/* Editorial Subtitle */}
            <p className="mt-5 sm:mt-6 text-[18px] sm:text-[21px] leading-[1.48] text-[#4A2E25] max-w-[46ch] font-normal">
              Your very own little mushroom garden.
              <br className="hidden sm:inline" /> Easy to grow, impossible not to love.
            </p>

            {/* Primary CTA Row */}
            <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-6 sm:gap-8">
              <button
                type="button"
                onClick={onExploreKits}
                className="btn-clay-coral px-8 sm:px-10 py-4 sm:py-4.5 text-[15px] sm:text-[16px] font-bold tracking-[0.06em] uppercase text-[#4A2E25] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A2E25]"
              >
                FIND YOUR FIRST KIT
              </button>

              <a
                href="#how-it-grows"
                className="group inline-flex items-center gap-2.5 text-[#4A2E25] hover:text-[#B85338] transition-colors py-2 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A2E25] rounded"
              >
                <span className="relative font-hand text-[24px] sm:text-[26px] font-bold tracking-wide uppercase after:content-[''] after:absolute after:left-0 after:bottom-0.5 after:w-full after:h-[2px] after:bg-[#4A2E25] group-hover:after:bg-[#B85338]">
                  HOW IT WORKS
                </span>
                <CurlyArrow className="w-8 h-7 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Bottom Editorial Benefits */}
            <ul
              aria-label="Key kit highlights"
              className="mt-9 sm:mt-11 pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] sm:text-[15px] font-medium text-[#4A2E25]"
            >
              <li className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <SparkleStar className="w-4 h-4 shrink-0" />
                <span>Beginner Friendly</span>
              </li>
              <li className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <SparkleStar className="w-4 h-4 shrink-0" />
                <span>Grows in 10–14 Days (typical)</span>
              </li>
              <li className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <SparkleStar className="w-4 h-4 shrink-0" />
                <span>Made for Curious Minds</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Tactile Layered Clay Mushroom Kit Composition */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[650px] aspect-[676/640] mx-auto select-none">
              {/* Crisp Sculptural Mushroom Kit Diorama */}
              <img
                src="/templates/poppypatch/hero-kit-main.png"
                alt="Poppy Patch kraft cardboard mushroom growing kit overflowing with sculpted terracotta oyster mushrooms, cream button mushrooms, pastel lavender spotted caps, pistachio leaves, and a tiny clay gardener holding a watering can"
                width={676}
                height={640}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain animate-kit-arrive drop-shadow-[0_18px_28px_rgba(140,96,70,0.18)]"
              />

              {/* Interactive Anatomical Callout Pins when user toggles Anatomy view */}
              {highlightHotspots && (
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div className="FieldCallout absolute top-[16%] left-[6%] bg-[#FAF3E3]/95 border border-[#4A2E25]/30 px-3 py-1.5 rounded-xl shadow-md text-xs font-medium text-[#4A2E25]">
                    <strong className="block font-serif-display">Coral Oyster Flush</strong>
                    Ruffled caps fruit in 10–14 days
                  </div>
                  <div className="FieldCallout absolute top-[34%] right-[4%] bg-[#FAF3E3]/95 border border-[#4A2E25]/30 px-3 py-1.5 rounded-xl shadow-md text-xs font-medium text-[#4A2E25]">
                    <strong className="block font-serif-display">Twice-Daily Mist</strong>
                    6–8 gentle spritzes of tap water
                  </div>
                  <div className="FieldCallout absolute bottom-[18%] left-[12%] bg-[#FAF3E3]/95 border border-[#4A2E25]/30 px-3 py-1.5 rounded-xl shadow-md text-xs font-medium text-[#4A2E25]">
                    <strong className="block font-serif-display">Breathable Kraft Box</strong>
                    Recessed window holds humidity
                  </div>
                </div>
              )}
            </div>

            {/* Subtle Interactive Toggle to inspect Kit Anatomy */}
            <div className="mt-2 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setHighlightHotspots((prev) => !prev)}
                aria-pressed={highlightHotspots}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-[#4A2E25]/85 hover:text-[#4A2E25] bg-[#FAF3E3]/80 hover:bg-[#FAF3E3] border border-[#4A2E25]/15 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#4A2E25]"
              >
                <span>{highlightHotspots ? 'Hide Kit Anatomy Notes' : 'Peek Inside the Kit Anatomy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(poppypatch)/poppypatch/components/HowItGrowsSection.tsx">
<![CDATA[import React, { useState } from 'react';
import { GROW_STAGES } from '../data/poppyPatchData';
import { estimateCountertopConditions } from '../utils/storeLogic';
import { SparkleStar } from './DoodleSvg';

export function HowItGrowsSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [roomTempF, setRoomTempF] = useState<number>(68);
  const [mistsPerDay, setMistsPerDay] = useState<1 | 2 | 3>(2);

  const activeStage = GROW_STAGES[activeStageIndex];
  const conditionEstimate = estimateCountertopConditions(roomTempF, mistsPerDay);

  return (
    <section
      id="how-it-grows"
      aria-labelledby="how-it-grows-heading"
      className="py-16 sm:py-24 relative border-t border-[#4A2E25]/10 bg-[#FAF3E3]/45"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-bold tracking-[0.12em] uppercase text-[#8A4D38] mb-2">
            FROM BOX TO SKILLET IN FOUR CHAPTERS
          </p>
          <h2
            id="how-it-grows-heading"
            className="font-serif-display font-bold text-[#4A2E25] text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            How it grows: open, mist, watch, harvest.
          </h2>
          <p className="mt-3 text-[16px] text-[#5E4137] leading-relaxed">
            No soil to pot, no grow lights to wire. Follow our continuous four-step countertop vine—or test how your kitchen temperature shapes the timeline below.
          </p>
        </div>

        {/* Continuous Botanical Vine Step Selector */}
        <div className="relative mb-12">
          {/* Hand-drawn SVG vine connecting the 4 chapters on desktop */}
          <svg
            viewBox="0 0 1200 44"
            fill="none"
            className="hidden md:block w-full h-11 mb-2 pointer-events-none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M40 24 C 240 6, 380 40, 600 22 C 820 4, 980 38, 1160 20"
              stroke="#4A2E25"
              strokeOpacity="0.2"
              strokeWidth="3"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
            <path
              d="M40 24 C 240 6, 380 40, 600 22 C 820 4, 980 38, 1160 20"
              stroke="#A8B96C"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeDasharray="1200"
              strokeDashoffset={1200 - ((activeStageIndex + 1) / 4) * 1200}
              className="transition-all duration-500 ease-out"
            />
          </svg>

          <div
            role="tablist"
            aria-label="Four stages of mushroom growth"
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5"
          >
            {GROW_STAGES.map((stage, idx) => {
              const isSelected = idx === activeStageIndex;
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  id={`tab-${stage.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${stage.id}`}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E25] ${
                    isSelected
                      ? 'bg-[#4A2E25] text-[#FAF3E3] border-[#4A2E25] shadow-[0_8px_20px_rgba(74,46,37,0.2)] -translate-y-0.5'
                      : 'bg-[#FAF3E3] hover:bg-[#F3E6CC] text-[#4A2E25] border-[#4A2E25]/18'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-xs font-bold tracking-widest uppercase ${
                        isSelected ? 'text-[#F28B72]' : 'text-[#8A4D38]'
                      }`}
                    >
                      STEP {stage.stepNumber}
                    </span>
                    <span
                      className={`text-[11px] font-medium ${
                        isSelected ? 'text-[#FAF3E3]/80' : 'text-[#69493E]'
                      }`}
                    >
                      {stage.daysWindow.split('·')[0].trim()}
                    </span>
                  </div>
                  <p className="font-serif-display font-bold text-xl sm:text-2xl tracking-tight">
                    {stage.verb}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Story Panel + Sticky Visual Cutout */}
        <div
          id={`panel-${activeStage.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeStage.id}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-14"
        >
          {/* Left: Tactile Stage Visual Card */}
          <div
            style={{ backgroundColor: activeStage.accentBg }}
            className="lg:col-span-5 card-papier p-7 sm:p-9 border border-[#4A2E25]/15 flex flex-col items-center justify-between relative overflow-hidden"
          >
            <div className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#4A2E25]">
              <span>CHAPTER {activeStage.stepNumber} · {activeStage.verb}</span>
              <span>{activeStage.daysWindow}</span>
            </div>

            <div className="my-6 w-full max-w-[300px] aspect-square rounded-3xl bg-[#FAF3E3]/80 border border-[#4A2E25]/12 flex items-center justify-center p-6 shadow-inner">
              <img
                src={activeStage.image}
                alt={`${activeStage.verb}: ${activeStage.title}`}
                width={320}
                height={320}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain drop-shadow-[0_14px_20px_rgba(90,54,40,0.2)] transition-transform duration-300"
              />
            </div>

            <p className="text-xs font-medium text-[#4A2E25]/85 text-center max-w-[36ch]">
              Illustrated with our tactile clay reference model · Results vary with home humidity & temperature.
            </p>
          </div>

          {/* Right: Stage Instructions & Timeline */}
          <div className="lg:col-span-7 card-papier bg-[#FAF3E3] p-7 sm:p-10 border border-[#4A2E25]/15 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[#8A4D38] mb-3">
                <SparkleStar className="w-4 h-4" />
                <span>{activeStage.daysWindow}</span>
              </div>

              <h3 className="font-serif-display font-bold text-2xl sm:text-3xl text-[#4A2E25] leading-tight mb-4">
                {activeStage.title}
              </h3>

              <p className="text-base sm:text-lg font-medium text-[#4A2E25] leading-relaxed mb-4">
                {activeStage.summary}
              </p>

              <p className="text-[15px] text-[#5E4137] leading-relaxed mb-6">
                {activeStage.detail}
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#F7ECD6] border border-[#4A2E25]/15">
                <p className="text-xs font-bold uppercase tracking-wider text-[#4A2E25] mb-1">
                  Countertop Field Note
                </p>
                <p className="text-sm text-[#563A32] leading-relaxed">
                  {activeStage.conditionTip}
                </p>
              </div>
            </div>

            {/* Chapter Navigation Footer */}
            <div className="mt-8 pt-5 border-t border-[#4A2E25]/12 flex items-center justify-between gap-4">
              <span className="text-xs font-semibold text-[#69493E]">
                Showing stage {activeStageIndex + 1} of {GROW_STAGES.length}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setActiveStageIndex((prev) =>
                      prev === 0 ? GROW_STAGES.length - 1 : prev - 1
                    )
                  }
                  className="px-4 py-2 rounded-xl border border-[#4A2E25]/25 text-xs font-bold uppercase tracking-wider text-[#4A2E25] hover:bg-[#F2E3C6] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Previous Stage
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveStageIndex((prev) =>
                      prev === GROW_STAGES.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="px-4 py-2 rounded-xl bg-[#E58267] hover:bg-[#D97255] text-xs font-bold uppercase tracking-wider text-[#4A2E25] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Next Stage →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Countertop Conditions Estimator */}
        <div className="card-papier bg-[#EFE0F0]/75 border border-[#4A2E25]/15 p-6 sm:p-9">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#6B3F69] mb-1">
                  INTERACTIVE GROWING PLANNER
                </p>
                <h3 className="font-serif-display font-bold text-xl sm:text-2xl text-[#4A2E25]">
                  Check how your kitchen conditions shape growth
                </h3>
                <p className="text-sm text-[#563A32] mt-1">
                  Adjust your typical room temperature and daily spritz routine to preview a realistic timeline.
                </p>
              </div>

              {/* Room Temperature Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm font-semibold text-[#4A2E25]">
                  <label htmlFor="kitchen-temp-slider">Average Kitchen Temperature</label>
                  <span className="font-serif-display text-lg tabular-nums">{roomTempF}°F</span>
                </div>
                <input
                  id="kitchen-temp-slider"
                  type="range"
                  min={58}
                  max={78}
                  step={1}
                  value={roomTempF}
                  onChange={(e) => setRoomTempF(Number(e.target.value))}
                  className="w-full accent-[#E58267] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-medium text-[#69493E]">
                  <span>58°F (Cool Pantry)</span>
                  <span>68°F (Ideal Counter)</span>
                  <span>78°F (Warm Summer Kitchen)</span>
                </div>
              </div>

              {/* Daily Misting Frequency Selector */}
              <div>
                <span className="block text-sm font-semibold text-[#4A2E25] mb-2">
                  Daily Spritz Routine
                </span>
                <div className="inline-flex p-1 rounded-xl bg-[#FAF3E3] border border-[#4A2E25]/15 gap-1">
                  {([1, 2, 3] as const).map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setMistsPerDay(count)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                        mistsPerDay === count
                          ? 'bg-[#4A2E25] text-[#FAF3E3]'
                          : 'text-[#4A2E25] hover:bg-[#F1E4CA]'
                      }`}
                    >
                      {count}× Daily ({count === 1 ? 'Light' : count === 2 ? 'Standard' : 'Extra Humid'})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Estimator Output Card */}
            <div className="lg:col-span-6 bg-[#FAF3E3] rounded-2xl p-6 border border-[#4A2E25]/15 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[#4A2E25]/12">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#7A5447]">
                    First Baby Pins
                  </span>
                  <p className="font-serif-display font-bold text-xl text-[#4A2E25] tabular-nums mt-0.5">
                    {conditionEstimate.pinningDays}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#7A5447]">
                    Estimated First Harvest
                  </span>
                  <p className="font-serif-display font-bold text-xl text-[#B85338] tabular-nums mt-0.5">
                    {conditionEstimate.harvestWindowDays}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-[#4A2E25]">
                <p>
                  <strong className="font-semibold">Expected cap character:</strong>{' '}
                  {conditionEstimate.capTextureNote}
                </p>
                <p className="text-[#5E4137]">
                  <strong className="font-semibold text-[#4A2E25]">Gardener’s tip:</strong>{' '}
                  {conditionEstimate.careRecommendation}
                </p>
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
    <file path="src/app/(poppypatch)/poppypatch/components/JournalSection.tsx">
<![CDATA[import React, { useState } from 'react';
import { JournalArticle, JournalCategory } from '../data/poppyPatchData';
import { filterJournalArticles } from '../utils/storeLogic';
import { BookOpen } from 'lucide-react';

interface JournalSectionProps {
  articles: JournalArticle[];
  onReadArticle: (article: JournalArticle) => void;
}

const CATEGORIES: Array<'All' | JournalCategory> = [
  'All',
  'Getting started',
  'Care',
  'Recipes'
];

export function JournalSection({ articles, onReadArticle }: JournalSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | JournalCategory>('All');

  const visibleArticles = filterJournalArticles(articles, activeCategory);

  return (
    <section
      id="the-journal"
      aria-labelledby="journal-heading"
      className="py-16 sm:py-24 relative border-t border-[#4A2E25]/10 bg-[#FAF3E3]/50"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header + Filter Tabs Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs sm:text-sm font-bold tracking-[0.12em] uppercase text-[#8A4D38] mb-2">
              THE LITTLE GROWING JOURNAL
            </p>
            <h2
              id="journal-heading"
              className="font-serif-display font-bold text-[#4A2E25] text-[clamp(2.1rem,4vw,3.2rem)] leading-[1.08] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Field notes, misting wisdom & skillet recipes.
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div
              role="tablist"
              aria-label="Filter journal stories by topic"
              className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#F0E2C8] border border-[#4A2E25]/15"
            >
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                const count =
                  category === 'All'
                    ? articles.length
                    : articles.filter((a) => a.category === category).length;

                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#4A2E25] ${
                      isActive
                        ? 'bg-[#4A2E25] text-[#FAF3E3] shadow-sm'
                        : 'text-[#4A2E25] hover:bg-[#FAF3E3]/70'
                    }`}
                  >
                    <span>{category === 'All' ? 'All Notes' : category}</span>
                    <span className="ml-1.5 opacity-75 tabular-nums">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filtered Journal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {visibleArticles.map((article) => (
            <article
              key={article.id}
              className="card-papier bg-[#FAF3E3] border border-[#4A2E25]/15 p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Artwork Thumbnail */}
                <div
                  style={{ backgroundColor: article.accentTint }}
                  className="w-full aspect-[16/10] rounded-2xl border border-[#4A2E25]/10 mb-5 flex items-center justify-center p-4 overflow-hidden"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    width={260}
                    height={180}
                    referrerPolicy="no-referrer"
                    className="w-36 h-36 object-contain transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2 drop-shadow-[0_10px_14px_rgba(90,54,40,0.18)]"
                  />
                </div>

                {/* Clean Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs font-semibold text-[#7A5447] mb-2">
                  <span>{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.seasonNote}</span>
                </div>

                <h3 className="font-serif-display font-bold text-xl text-[#4A2E25] leading-snug mb-2.5 group-hover:text-[#B85338] transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm text-[#563A32] leading-relaxed mb-5">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#4A2E25]/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onReadArticle(article)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#4A2E25] hover:text-[#B85338] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#4A2E25] rounded"
                >
                  <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Read Field Note →</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(poppypatch)/poppypatch/components/KitsSection.tsx">
<![CDATA[import React, { useState } from 'react';
import { MushroomKit } from '../data/poppyPatchData';
import { SparkleStar, BotanicalSprig } from './DoodleSvg';
import { Check, Plus, Eye } from 'lucide-react';

interface KitsSectionProps {
  kits: MushroomKit[];
  onAddToBag: (kit: MushroomKit) => void;
  onSelectKitDetails: (kit: MushroomKit) => void;
}

export function KitsSection({
  kits,
  onAddToBag,
  onSelectKitDetails
}: KitsSectionProps) {
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const handleAdd = (kit: MushroomKit) => {
    onAddToBag(kit);
    setRecentlyAddedId(kit.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === kit.id ? null : prev));
    }, 1400);
  };

  return (
    <section
      id="our-kits"
      aria-labelledby="kits-heading"
      className="py-16 sm:py-24 relative"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-bold tracking-[0.12em] uppercase text-[#8A4D38] mb-2">
              CURATED STARTER PATCHES
            </p>
            <h2
              id="kits-heading"
              className="font-serif-display font-bold text-[#4A2E25] text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Meet the kits made for curious kitchen counters.
            </h2>
          </div>

          <p className="text-[15px] sm:text-[16px] text-[#5E4137] max-w-[42ch] leading-relaxed">
            Every box arrives pre-colonized on clean hardwood sawdust with a handheld fine mister and our illustrated field guide. Just pop the window and spritz with tap water.
          </p>
        </div>

        {/* 3-Column Editorial Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9 items-stretch">
          {kits.map((kit, index) => {
            const isAdded = recentlyAddedId === kit.id;

            return (
              <article
                key={kit.id}
                style={{ backgroundColor: kit.cardBg }}
                className="group card-papier relative flex flex-col justify-between p-6 sm:p-7 border border-[#4A2E25]/15"
              >
                {/* Top Postage Stamp Tag */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#5E4137]">
                      0{index + 1} · {kit.tag}
                    </span>
                    <span className="postage-stamp px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase text-[#4A2E25] rounded">
                      {kit.badgeText}
                    </span>
                  </div>

                  {/* Product Cutout Showcase with Hover Lift & 2D Tilt */}
                  <div className="relative w-full aspect-[4/3] mb-6 rounded-2xl bg-[#F7ECD6] border border-[#4A2E25]/10 flex items-center justify-center p-2.5 overflow-hidden">
                    <BotanicalSprig className="w-10 h-14 absolute -bottom-2 -right-1 opacity-40 transition-transform duration-300 group-hover:rotate-6 origin-bottom" />
                    <img
                      src={kit.image}
                      alt={`${kit.name} — ${kit.subtitle}`}
                      width={676}
                      height={640}
                      referrerPolicy="no-referrer"
                      className="w-[92%] h-[94%] object-contain transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:-rotate-1 drop-shadow-[0_12px_16px_rgba(124,88,66,0.18)]"
                    />
                  </div>

                  {/* Clean Unboxed Metadata Line */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#69493E] mb-2">
                    <span>{kit.difficulty}</span>
                    <span aria-hidden="true">·</span>
                    <span>{kit.typicalDays}</span>
                    <span aria-hidden="true">·</span>
                    <span>{kit.flushes}</span>
                  </div>

                  {/* Title & Tabular Price */}
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="font-serif-display font-bold text-2xl sm:text-[26px] text-[#4A2E25] leading-tight">
                      {kit.name}
                    </h3>
                    <span className="font-serif-display font-bold text-2xl text-[#4A2E25] tabular-nums shrink-0">
                      ${kit.price}
                    </span>
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-[#7A5447] mb-3">
                    {kit.subtitle}
                  </p>

                  <p className="text-[15px] text-[#4A2E25]/90 leading-relaxed mb-4">
                    {kit.shortDescription}
                  </p>

                  {/* Culinary & Countertop Notes */}
                  <div className="pt-3 pb-5 border-t border-[#4A2E25]/12 space-y-1.5 text-xs text-[#563A32]">
                    <p>
                      <strong className="font-semibold text-[#4A2E25]">Kitchen notes:</strong>{' '}
                      {kit.flavorNotes}
                    </p>
                    <p>
                      <strong className="font-semibold text-[#4A2E25]">Happy spot:</strong>{' '}
                      {kit.idealSpot}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleAdd(kit)}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl font-bold text-sm tracking-wide transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E25] ${
                      isAdded
                        ? 'bg-[#A8B96C] text-[#2F3B12] shadow-[0_3px_0_#7A8B43]'
                        : 'bg-[#4A2E25] hover:bg-[#3A221A] text-[#FAF3E3] shadow-[0_3px_0_#261510] active:translate-y-0.5'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Add to Bag · ${kit.price}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectKitDetails(kit)}
                    aria-label={`View full details for ${kit.name}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-2xl bg-[#FAF3E3] hover:bg-[#F3E5CA] text-[#4A2E25] border border-[#4A2E25]/25 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E25]"
                  >
                    <Eye className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>View Details</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Realistic Expectation Footnote */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 px-6 py-4 rounded-2xl bg-[#FAF3E3]/85 border border-[#4A2E25]/12 text-xs sm:text-sm text-[#5E4137]">
          <p className="inline-flex items-center gap-2">
            <SparkleStar className="w-4 h-4 shrink-0 text-[#4A2E25]" />
            <span>
              <strong className="text-[#4A2E25]">A note on living kits:</strong> Every block is a real biological garden. Typical first-flush timing (10–14 days) and yield naturally vary with your room’s humidity, temperature, and airflow.
            </span>
          </p>
          <span className="font-semibold text-[#4A2E25] whitespace-nowrap">
            Free shipping on orders $55+
          </span>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(poppypatch)/poppypatch/components/Navbar.tsx">
<![CDATA[import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  bagCount: number;
  onOpenBag: () => void;
}

export function Navbar({ bagCount, onOpenBag }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Our Kits', href: '#our-kits' },
    { label: 'How It Grows', href: '#how-it-grows' },
    { label: 'The Journal', href: '#the-journal' },
    { label: 'Our Story', href: '#our-story' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F7ECD6]/95 backdrop-blur-sm border-b border-[#4A2E25]/10">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark + Hand-drawn mushroom mark */}
        <a
          href="#"
          className="inline-flex items-center gap-2 text-2xl sm:text-[28px] font-serif-display font-bold tracking-tight text-[#4A2E25] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A2E25] rounded-lg"
        >
          <span>poppy patch</span>
          <img
            src="/templates/poppypatch/logo-mushroom.png"
            alt=""
            width={34}
            height={36}
            referrerPolicy="no-referrer"
            className="w-8 h-8 object-contain -mt-1 select-none"
          />
        </a>

        {/* Zone 2: 4 Single-line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 lg:gap-11 text-[16px] font-medium text-[#4A2E25]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 hover:text-[#B85338] transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#E58267] after: rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A2E25] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary CTA + Bag Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBag}
            aria-label={`Open shopping bag (${bagCount} ${bagCount === 1 ? 'item' : 'items'})`}
            className="relative inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#4A2E25]/25 bg-[#FAF3E3] hover:bg-[#F3E6CC] text-[#4A2E25] text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E25]"
          >
            <ShoppingBag className="w-4 h-4 text-[#4A2E25]" aria-hidden="true" />
            <span className="tabular-nums">{bagCount}</span>
          </button>

          <a
            href="#our-kits"
            className="hidden sm:inline-flex items-center justify-center px-6 py-3 bg-[#E58267] hover:bg-[#DC7458] active:translate-y-0.5 text-[#3B2219] font-semibold text-sm tracking-wider uppercase rounded-full shadow-[0_3px_0_#B85A40] transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E25]"
          >
            GET GROWING
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#4A2E25]/20 bg-[#FAF3E3] text-[#4A2E25] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#4A2E25]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#FAF3E3] border-b border-[#4A2E25]/15 px-6 py-5 space-y-3"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-2.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-lg font-serif-display font-semibold text-[#4A2E25] hover:text-[#C45B3E]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <a
              href="#our-kits"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center px-6 py-3 bg-[#E58267] text-[#3B2219] font-bold text-sm tracking-wider uppercase rounded-full shadow-[0_3px_0_#B85A40]"
            >
              GET GROWING
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
]]>
    </file>
    <file path="src/app/(poppypatch)/poppypatch/components/Overlays.tsx">
<![CDATA[import React, { useState } from 'react';
import { JournalArticle, MushroomKit } from '../data/poppyPatchData';
import { BagItem, calculateBagSummary } from '../utils/storeLogic';
import { X, Plus, Minus, ShoppingBag, CheckCircle2 } from 'lucide-react';

interface KitDetailModalProps {
  kit: MushroomKit | null;
  onClose: () => void;
  onAddToBag: (kit: MushroomKit) => void;
}

export function KitDetailModal({ kit, onClose, onAddToBag }: KitDetailModalProps) {
  if (!kit) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="kit-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2A1812]/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card-papier bg-[#FAF3E3] border-2 border-[#4A2E25]/25 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-[#4A2E25]"
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#4A2E25]/12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A4D38]">
              {kit.tag} · {kit.typicalDays}
            </span>
            <h2 id="kit-modal-title" className="font-serif-display font-bold text-2xl sm:text-3xl mt-0.5">
              {kit.name} — ${kit.price}
            </h2>
            <p className="text-sm text-[#69493E]">{kit.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close kit details dialog"
            className="w-10 h-10 rounded-full bg-[#F7ECD6] border border-[#4A2E25]/20 flex items-center justify-center hover:bg-[#E58267]/30 cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 py-6 items-center">
          <div
            style={{ backgroundColor: kit.cardBg }}
            className="sm:col-span-5 aspect-square rounded-2xl p-4 flex items-center justify-center border border-[#4A2E25]/12"
          >
            <img
              src={kit.image}
              alt={kit.name}
              width={260}
              height={260}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>

          <div className="sm:col-span-7 space-y-4 text-sm">
            <p className="text-[15px] leading-relaxed text-[#4A2E25]">
              {kit.shortDescription}
            </p>

            <div>
              <h3 className="font-bold uppercase text-xs tracking-wider text-[#8A4D38] mb-1.5">
                What’s Inside the Kraft Box
              </h3>
              <ul className="space-y-1 text-[#563A32] list-disc list-inside">
                {kit.boxContents.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F7ECD6] border border-[#4A2E25]/12 space-y-1 text-xs text-[#563A32]">
              <p>
                <strong className="text-[#4A2E25]">Substrate:</strong> {kit.substrateInfo}
              </p>
              <p>
                <strong className="text-[#4A2E25]">Realistic harvest note:</strong> {kit.yieldNote}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#4A2E25]/12 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-xl border border-[#4A2E25]/25 text-sm font-bold text-[#4A2E25] hover:bg-[#F2E3C6] cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onAddToBag(kit);
              onClose();
            }}
            className="btn-clay-coral px-7 py-3 text-sm font-bold uppercase tracking-wider text-[#4A2E25] cursor-pointer"
          >
            Add {kit.name} to Bag · ${kit.price}
          </button>
        </div>
      </div>
    </div>
  );
}

interface ArticleReaderModalProps {
  article: JournalArticle | null;
  onClose: () => void;
}

export function ArticleReaderModal({ article, onClose }: ArticleReaderModalProps) {
  if (!article) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2A1812]/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card-papier bg-[#FAF3E3] border-2 border-[#4A2E25]/25 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-9 text-[#4A2E25]"
      >
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#4A2E25]/12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A4D38] mb-1">
              <span>{article.category}</span>
              <span>·</span>
              <span>{article.readTime}</span>
              <span>·</span>
              <span>{article.seasonNote}</span>
            </div>
            <h2 id="article-modal-title" className="font-serif-display font-bold text-2xl sm:text-3xl leading-snug">
              {article.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close journal article"
            className="w-10 h-10 rounded-full bg-[#F7ECD6] border border-[#4A2E25]/20 flex items-center justify-center hover:bg-[#E58267]/30 cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 space-y-5">
          <div
            style={{ backgroundColor: article.accentTint }}
            className="w-full h-44 rounded-2xl border border-[#4A2E25]/12 flex items-center justify-center p-4"
          >
            <img
              src={article.image}
              alt={article.title}
              width={160}
              height={160}
              referrerPolicy="no-referrer"
              className="w-36 h-36 object-contain drop-shadow-md"
            />
          </div>

          {article.recipeIngredients && (
            <div className="p-5 rounded-2xl bg-[#E3EBC9]/60 border border-[#4A2E25]/15">
              <h3 className="font-serif-display font-bold text-lg text-[#4A2E25] mb-2">
                Skillet Ingredients
              </h3>
              <ul className="space-y-1 text-sm text-[#4A2E25] list-disc list-inside">
                {article.recipeIngredients.map((ing) => (
                  <li key={ing}>{ing}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4 text-[15px] text-[#563A32] leading-relaxed">
            {article.bodyParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-[#F7ECD6] border border-[#4A2E25]/15">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8A4D38] mb-2">
              Quick Countertop Takeaways
            </h3>
            <ul className="space-y-1.5 text-sm text-[#4A2E25] list-disc list-inside">
              {article.keyTakeaways.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-[#4A2E25]/12 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#4A2E25] text-[#FAF3E3] text-sm font-bold cursor-pointer"
          >
            Back to Journal
          </button>
        </div>
      </div>
    </div>
  );
}

interface ShoppingBagDrawerProps {
  isOpen: boolean;
  items: BagItem[];
  onClose: () => void;
  onUpdateQty: (kit: MushroomKit, delta: number) => void;
  onClearBag: () => void;
}

export function ShoppingBagDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onClearBag
}: ShoppingBagDrawerProps) {
  const [demoOrderPlaced, setDemoOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const summary = calculateBagSummary(items);

  const handlePlaceDemoOrder = () => {
    setDemoOrderPlaced(true);
    onClearBag();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bag-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-[#2A1812]/55 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#FAF3E3] h-full shadow-2xl border-l border-[#4A2E25]/20 flex flex-col justify-between p-6 text-[#4A2E25]"
      >
        {/* Top Bar */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#4A2E25]/15">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h2 id="bag-drawer-title" className="font-serif-display font-bold text-2xl">
                Your Growing Bag
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setDemoOrderPlaced(false);
                onClose();
              }}
              aria-label="Close shopping bag"
              className="w-9 h-9 rounded-full bg-[#F7ECD6] border border-[#4A2E25]/20 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          {items.length > 0 && (
            <div className="my-4 p-3.5 rounded-2xl bg-[#F7ECD6] border border-[#4A2E25]/12 text-xs">
              {summary.qualifiesForFreeShipping ? (
                <p className="font-bold text-[#3E5216]">
                  ✦ Your patch qualifies for complimentary studio shipping!
                </p>
              ) : (
                <p className="text-[#563A32]">
                  Add <strong className="font-bold text-[#4A2E25] tabular-nums">${summary.amountToFreeShipping}</strong> more for free shipping (orders $55+).
                </p>
              )}
            </div>
          )}

          {/* Bag Contents or Demo Order Confirmation */}
          {demoOrderPlaced ? (
            <div className="my-8 p-6 rounded-3xl bg-[#E3EBC9] border border-[#4A2E25]/20 space-y-3 text-center">
              <CheckCircle2 className="w-10 h-10 text-[#2E3A13] mx-auto" />
              <h3 className="font-serif-display font-bold text-2xl text-[#2E3A13]">
                Demo Patch Preview Reserved!
              </h3>
              <p className="text-sm text-[#3A461C] leading-relaxed">
                Poppy Patch is a fictional concept showcase—no payment was processed or charged. Happy countertop growing!
              </p>
              <button
                type="button"
                onClick={() => {
                  setDemoOrderPlaced(false);
                  onClose();
                }}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#4A2E25] text-[#FAF3E3] text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Continue Exploring
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <img
                src="/templates/poppypatch/cutout-cream-mushrooms.png"
                alt=""
                width={100}
                height={100}
                referrerPolicy="no-referrer"
                className="w-24 h-24 object-contain mx-auto opacity-85"
              />
              <p className="font-serif-display font-bold text-xl text-[#4A2E25]">
                Your bag is waiting for its first sprout.
              </p>
              <p className="text-sm text-[#69493E] max-w-[28ch] mx-auto">
                Explore our starter kits to bring a miniature mushroom garden to your kitchen counter.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-[#4A2E25]/12 max-h-[52vh] overflow-y-auto pr-1">
              {items.map(({ kit, quantity }) => (
                <li key={kit.id} className="py-4 flex items-center gap-4">
                  <div
                    style={{ backgroundColor: kit.cardBg }}
                    className="w-16 h-16 rounded-xl p-2 border border-[#4A2E25]/12 shrink-0 flex items-center justify-center"
                  >
                    <img
                      src={kit.image}
                      alt={kit.name}
                      width={56}
                      height={56}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif-display font-bold text-base text-[#4A2E25] truncate">
                      {kit.name}
                    </h3>
                    <p className="text-xs text-[#69493E] truncate">{kit.subtitle}</p>
                    <div className="mt-2 inline-flex items-center gap-2 bg-[#F7ECD6] rounded-lg px-2 py-1 border border-[#4A2E25]/15">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(kit, -1)}
                        aria-label={`Decrease quantity of ${kit.name}`}
                        className="p-0.5 hover:text-[#B85338] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold tabular-nums px-1">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(kit, 1)}
                        aria-label={`Increase quantity of ${kit.name}`}
                        className="p-0.5 hover:text-[#B85338] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-serif-display font-bold text-base tabular-nums">
                    ${kit.price * quantity}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Bag Footer */}
        {items.length > 0 && !demoOrderPlaced && (
          <div className="pt-4 border-t border-[#4A2E25]/15 space-y-3">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-[#563A32]">
                <span>Subtotal</span>
                <span className="tabular-nums font-semibold">${summary.subtotal}</span>
              </div>
              <div className="flex justify-between text-[#563A32]">
                <span>Estimated Shipping</span>
                <span className="tabular-nums font-semibold">
                  {summary.shippingEstimate === 0 ? 'Free' : `$${summary.shippingEstimate}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif-display font-bold text-[#4A2E25] pt-1 border-t border-[#4A2E25]/10">
                <span>Total (Demo Preview)</span>
                <span className="tabular-nums">${summary.grandTotal}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePlaceDemoOrder}
              className="w-full btn-clay-coral py-3.5 px-6 text-sm font-bold uppercase tracking-wider text-[#4A2E25] cursor-pointer"
            >
              Complete Demo Order Preview
            </button>
            <p className="text-[11px] text-center text-[#69493E]">
              Fictional concept brand · No real checkout or payment is collected.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(poppypatch)/poppypatch/components/PurposeStrip.tsx">
<![CDATA[import React, { useEffect, useState } from 'react';
import { SparkleStar } from './DoodleSvg';

const STICKERS = [
  { text: 'GROWN WITH CURIOSITY', tint: '#F9DFD5' },
  { text: 'A LITTLE MAGIC AT HOME', tint: '#EFE0F0' },
  { text: 'NO GREEN THUMB REQUIRED', tint: '#E3EBC9' },
  { text: 'COUNTERTOP BOTANICAL WONDER', tint: '#FAF3E3' },
  { text: 'TYPICAL HARVEST IN 10–14 DAYS', tint: '#F9DFD5' },
  { text: '2 TO 3 FLUSHES PER BLOCK', tint: '#E3EBC9' }
];

export function PurposeStrip() {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        setScrollOffset(Math.min(60, y * 0.04));
        rafId = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      aria-label="Brand values and growing highlights"
      className="py-5 sm:py-7 overflow-hidden border-y border-[#4A2E25]/10 bg-[#FAF3E3]/60"
    >
      <div className="max-w-[1440px] mx-auto px-4">
        <div
          style={{ transform: `translate3d(${-scrollOffset}px, 0, 0)` }}
          className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-4 transition-transform duration-150 ease-out"
        >
          {STICKERS.map((sticker, index) => (
            <div
              key={sticker.text}
              style={{ backgroundColor: sticker.tint }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-[#4A2E25]/15 text-xs sm:text-[13px] font-bold tracking-[0.06em] text-[#4A2E25] whitespace-nowrap shrink-0 shadow-[0_2px_0_rgba(74,46,37,0.08)] ${
                index % 2 === 0 ? '-rotate-1' : 'rotate-1'
              }`}
            >
              <SparkleStar className="w-3.5 h-3.5 shrink-0" />
              <span>{sticker.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(poppypatch)/poppypatch/components/WhyDifferentSection.tsx">
<![CDATA[import React from 'react';
import { WHY_DIFFERENT_ITEMS } from '../data/poppyPatchData';
import { BotanicalSprig } from './DoodleSvg';

export function WhyDifferentSection() {
  return (
    <section
      id="our-story"
      aria-labelledby="why-different-heading"
      className="py-16 sm:py-24 relative"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Sticky Story Column */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs sm:text-sm font-bold tracking-[0.12em] uppercase text-[#8A4D38]">
              OUR STUDIO PHILOSOPHY
            </p>
            <h2
              id="why-different-heading"
              className="font-serif-display font-bold text-[#4A2E25] text-[clamp(2.1rem,3.8vw,3.1rem)] leading-[1.08] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Why Poppy Patch feels like a tiny studio, not a biology lab.
            </h2>
            <p className="text-[16px] text-[#563A32] leading-relaxed">
              We started Poppy Patch because traditional mushroom kits either looked like sterile plastic science experiments or made wild promises about effortless ten-pound harvests.
            </p>
            <p className="text-[15px] text-[#69493E] leading-relaxed">
              Our boxes are crafted for curious cooks, apartment dwellers, and patient mornings—pairing honest culinary instructions with packaging warm enough to leave out on the counter.
            </p>

            {/* Stamp + Cutout Card */}
            <div className="pt-2 flex items-center gap-5">
              <img
                src="/templates/poppypatch/stamp-grow-happy.png"
                alt="Grow Happy Poppy Patch circular ink stamp"
                width={112}
                height={112}
                referrerPolicy="no-referrer"
                className="w-24 h-24 object-contain shrink-0"
              />
              <div className="text-xs text-[#563A32] space-y-1">
                <p className="font-serif-display font-bold text-base text-[#4A2E25]">
                  Small-batch hardwood blocks
                </p>
                <p>
                  Mixed from clean sawdust, organic oat bran, and spring water—zero synthetic fertilizers or complicated gadgets.
                </p>
              </div>
            </div>
          </div>

          {/* Right 4-Card Editorial Bento Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {WHY_DIFFERENT_ITEMS.map((item, idx) => (
              <article
                key={item.id}
                style={{ backgroundColor: item.accent }}
                className={`card-papier p-6 sm:p-7 border border-[#4A2E25]/15 flex flex-col justify-between relative overflow-hidden ${
                  idx % 2 === 1 ? 'sm:translate-y-4' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="font-serif-display font-bold text-2xl text-[#4A2E25]">
                      {item.number}.
                    </span>
                    <span className="postage-stamp px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase text-[#4A2E25] rounded">
                      {item.stamp}
                    </span>
                  </div>

                  <h3 className="font-serif-display font-bold text-xl text-[#4A2E25] leading-snug mb-3">
                    {item.title}
                  </h3>

                  <p className="text-[15px] text-[#563A32] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#4A2E25]/10 flex items-center justify-between text-xs font-semibold text-[#69493E]">
                  <span>Poppy Patch Standard</span>
                  <BotanicalSprig className="w-6 h-8 opacity-60" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(poppypatch)/poppypatch/data/poppyPatchData.ts">
<![CDATA[export interface MushroomKit {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  tag: string;
  difficulty: string;
  typicalDays: string;
  flushes: string;
  cardBg: string;
  accentColor: string;
  badgeText: string;
  image: string;
  shortDescription: string;
  flavorNotes: string;
  idealSpot: string;
  boxContents: string[];
  substrateInfo: string;
  yieldNote: string;
}

export interface GrowStage {
  id: string;
  stepNumber: string;
  verb: 'OPEN' | 'MIST' | 'WATCH' | 'HARVEST';
  title: string;
  daysWindow: string;
  summary: string;
  detail: string;
  conditionTip: string;
  image: string;
  accentBg: string;
}

export type JournalCategory = 'Getting started' | 'Care' | 'Recipes';

export interface JournalArticle {
  id: string;
  title: string;
  category: JournalCategory;
  readTime: string;
  seasonNote: string;
  excerpt: string;
  image: string;
  accentTint: string;
  keyTakeaways: string[];
  bodyParagraphs: string[];
  recipeIngredients?: string[];
}

export interface GrowerVignette {
  id: string;
  growerName: string;
  location: string;
  kitUsed: string;
  daysToHarvest: string;
  quote: string;
  countertopSpot: string;
  image: string;
  bgTint: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const MUSHROOM_KITS: MushroomKit[] = [
  {
    id: 'first-sprout',
    name: 'First Sprout',
    subtitle: 'Terracotta Pink & Coral Oyster Starter Kit',
    price: 34,
    tag: 'Most Popular Starter',
    difficulty: 'Beginner Friendly',
    typicalDays: '10–14 Days typical',
    flushes: 'Up to 2 harvests',
    cardBg: '#F9DFD5',
    accentColor: '#E58267',
    badgeText: 'Warm Countertop Favorite',
    image: '/templates/poppypatch/kit-first-sprout.png',
    shortDescription:
      'Our signature single-block kit that bursts into ruffled terracotta-coral caps right out of the front window.',
    flavorNotes: 'Savory, delicate, crisp edges when pan-seared in olive oil or butter',
    idealSpot: 'Warm kitchen counter away from direct midday sun (65–74°F)',
    boxContents: [
      '1× Colonized organic sawdust & oat bran fruiting block (3.2 lbs)',
      '1× BPA-free fine-mist handheld spritzer bottle',
      '1× Illustrated 16-page "First Sprout" folding field manual',
      '1× Wooden humidity tent peg & breathable kraft display box'
    ],
    substrateInfo:
      'Upcycled hardwood sawdust enriched with organic hulless oat bran, hydrated with filtered spring water and fully colonized before shipping.',
    yieldNote:
      'First flush typically yields 1 to 1.5 bowls of fresh mushrooms (~220–320g), depending on room humidity and daily misting.'
  },
  {
    id: 'oyster-party',
    name: 'Oyster Party',
    subtitle: 'Cream Pearl & Velvet Lilac Oyster Duo',
    price: 48,
    tag: 'Double Color Harvest',
    difficulty: 'Beginner Friendly',
    typicalDays: '10–14 Days typical',
    flushes: '2–3 harvests',
    cardBg: '#EFE0F0',
    accentColor: '#C58EC2',
    badgeText: 'Two Flavor Profiles',
    image: '/templates/poppypatch/kit-oyster-party.png',
    shortDescription:
      'A joyful pairing of plump cream pearl caps and cool-toned lilac-gray oyster mushrooms for weeknight pasta & toast.',
    flavorNotes: 'Velvety, mellow umami with a subtle nutty aroma when roasted whole',
    idealSpot: 'Cooler bookshelf, pantry nook, or kitchen island (60–70°F)',
    boxContents: [
      '1× Cream Pearl Oyster fruiting block (2.8 lbs)',
      '1× Velvet Dove/Lilac-tinted Oyster fruiting block (2.8 lbs)',
      '1× Refillable amber-glass fine mister',
      '2× Botanical harvest log postcards & recipe booklet'
    ],
    substrateInfo:
      'Locally sourced beech and maple sawdust blend inoculated with vigorous culinary Pleurotus strains.',
    yieldNote:
      'Combined typical harvest of 2 to 3 medium bowls across both blocks over a two-week window.'
  },
  {
    id: 'kitchen-garden',
    name: 'Kitchen Garden',
    subtitle: 'Complete Countertop Trio + Gardenery Set',
    price: 68,
    tag: 'Full Studio Bundle',
    difficulty: 'Curious All-Rounder',
    typicalDays: '10–16 Days typical',
    flushes: 'Up to 3 harvests',
    cardBg: '#E3EBC9',
    accentColor: '#A8B96C',
    badgeText: 'Free Shipping Included',
    image: '/templates/poppypatch/kit-kitchen-garden.png',
    shortDescription:
      'Everything you need to turn a sunny windowsill shadow into a staggered three-part culinary mushroom patch.',
    flavorNotes: 'Full range from crisp coral petals to meaty, buttery golden-cream clusters',
    idealSpot: 'Any shaded countertop or dining sideboard with gentle household airflow',
    boxContents: [
      '3× Staggered-ready fruiting blocks (Coral, Cream Pearl, and Golden Oyster)',
      '1× Continuous fine-mist botanical atomizer',
      '1× Carbon-steel folding mushroom harvest knife with brush',
      '1× Collectible clay gardener keepsake & illustrated recipe deck'
    ],
    substrateInfo:
      'Three individually dated blocks so you can open them all at once for a feast or stagger them week by week.',
    yieldNote:
      'Staggering one box every 7 days provides a steady countertop harvest for nearly a month under typical indoor conditions.'
  }
];

export const GROW_STAGES: GrowStage[] = [
  {
    id: 'stage-open',
    stepNumber: '01',
    verb: 'OPEN',
    title: 'Pop the perforated window & wake the block',
    daysWindow: 'Day 1 · 5 Minutes of Setup',
    summary:
      'Press along the dotted kraft cardboard petals on the front of your Poppy Patch box and scratch a gentle "X" into the inner wrap.',
    detail:
      'Inside the box lives a solid, snowy-white block of colonized hardwood sawdust. Pressing open the cardboard window lets fresh kitchen air signal to the mycelium that it has reached the surface of a fallen log—its natural cue to start forming baby mushrooms.',
    conditionTip:
      'Place your box somewhere you walk past every morning—indirect kitchen light is great; avoid direct window sun or heating vents.',
    image: '/templates/poppypatch/kit-first-sprout.png',
    accentBg: '#F9DFD5'
  },
  {
    id: 'stage-mist',
    stepNumber: '02',
    verb: 'MIST',
    title: 'Give it a gentle morning & evening spritz',
    daysWindow: 'Days 2–5 · 30 Seconds Twice a Day',
    summary:
      'Use the included spritzer to mist the exposed slit with 6 to 8 puffs of regular tap water around breakfast and dinner.',
    detail:
      'Mushrooms breathe like we do and Drink through micro-droplets on their surface. You are not soaking soil—just keeping a light, dewy sheen inside the cardboard recess so the emerging pinheads stay supple while they organize.',
    conditionTip:
      'If your home runs dry in winter or with AC, an extra midday spritz (3x daily) keeps the tiny caps from drying at the edges.',
    image: '/templates/poppypatch/cutout-gardener.png',
    accentBg: '#EFE0F0'
  },
  {
    id: 'stage-watch',
    stepNumber: '03',
    verb: 'WATCH',
    title: 'Watch tiny pinheads double in size overnight',
    daysWindow: 'Days 6–11 · The Daily Magic Phase',
    summary:
      'Tiny coral and cream clusters ("pins") emerge around day 5–7 and visibly double in size every 24 hours.',
    detail:
      'This is the part nobody quite believes until they see it on their own counter. One morning you will spot pebble-sized buds; three days later, sculptural ruffles are spilling out of the kraft window like a miniature clay sculpture come to life.',
    conditionTip:
      'Growth speed naturally varies with room temperature (64–72°F is the sweet spot). Cooler rooms grow slightly slower and denser.',
    image: '/templates/poppypatch/cutout-coral-oysters.png',
    accentBg: '#E3EBC9'
  },
  {
    id: 'stage-harvest',
    stepNumber: '04',
    verb: 'HARVEST',
    title: 'Twist, gather, sear & soak for round two',
    daysWindow: 'Days 12–14 · Typical First Flush',
    summary:
      'When the mushroom caps uncurl nearly flat at the edges, hold the base of the cluster and twist gently free.',
    detail:
      'Harvest the whole cluster at once right before the edges turn fully upward. Brush off any specks of sawdust at the base, tear into ribbons for a hot skillet, and let your block rest for a week before soaking it overnight for a bonus second flush.',
    conditionTip:
      'Actual harvest weight and timing always depend on your room humidity, airflow, and temperature—every patch grows with its own personality.',
    image: '/templates/poppypatch/cutout-cream-mushrooms.png',
    accentBg: '#F9DFD5'
  }
];

export const WHY_DIFFERENT_ITEMS = [
  {
    id: 'plain-human-guide',
    number: '01',
    title: 'Written in human, not laboratory mycology',
    description:
      'No sterile petri dishes, Latin taxonomy quizzes, or complicated humidity tents. Our illustrated pocket manual walks you through every stage with real photos showing what healthy pins, dry edges, and harvest-ready caps actually look like.',
    accent: '#F9DFD5',
    stamp: 'ZERO LAB JARGON'
  },
  {
    id: 'countertop-worthy-box',
    number: '02',
    title: 'Designed to live proudly next to the kettle',
    description:
      'Most grow kits look like industrial shipping cartons you want to hide in a basement. We use warm, thick-walled unbleached kraft board with recessed moisture flaps and botanical ink stamps meant for open kitchen shelves.',
    accent: '#E3EBC9',
    stamp: 'KITCHEN READY'
  },
  {
    id: 'realistic-expectations',
    number: '03',
    title: 'Honest expectations about how nature grows',
    description:
      'We will never promise ten pounds of giant supermarket mushrooms from a small box. One kit typically yields 1 to 2 delicious bowls of ultra-fresh culinary mushrooms over 10–14 days, depending on your home temperature and misting rhythm.',
    accent: '#EFE0F0',
    stamp: 'HONEST YIELDS'
  },
  {
    id: 'small-daily-wonder',
    number: '04',
    title: 'A two-week ritual of tiny morning surprises',
    description:
      'Half the joy is dinner; the other half is wandering into the kitchen with your first cup of coffee to see how much your mushroom bouquet grew while you were asleep.',
    accent: '#FBF4E4',
    stamp: 'EVERYDAY WONDER'
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'picking-countertop-spot',
    title: 'Finding the Goldilocks Spot on Your Kitchen Counter',
    category: 'Getting started',
    readTime: '3 min read',
    seasonNote: 'Field Guide No. 01',
    excerpt:
      'Not too sunny, not too drafty: how to pick a happy corner where your kit stays humid and reminds you to spritz.',
    image: '/templates/poppypatch/kit-first-sprout.png',
    accentTint: '#F9DFD5',
    keyTakeaways: [
      'If you can comfortably read a book there without turning on a lamp, the light is plenty.',
      'Keep your kit at least 3 feet away from toaster ovens, stovetop steam, and radiator vents.',
      'Near the kitchen sink or coffee maker is ideal so misting becomes a 20-second habit.'
    ],
    bodyParagraphs: [
      'One of the biggest misconceptions about growing mushrooms at home is that they belong in a pitch-black cellar. In nature, oyster mushrooms fruit on shaded forest logs where dappled daylight filters through the canopy.',
      'On your countertop, indirect ambient room light—or even normal kitchen lighting for a few hours a day—gives your mushrooms the cue they need to develop rich coral, cream, or dusty-lilac color.',
      'The real secret to a happy kit is avoiding fast-moving dry air. Place your Poppy Patch box tucked slightly back against a tile backsplash or beside a cookbook stand to buffer household drafts.'
    ]
  },
  {
    id: 'art-of-the-morning-mist',
    title: 'How to Tell When Your Mushrooms Are Thirsty',
    category: 'Care',
    readTime: '4 min read',
    seasonNote: 'Field Guide No. 02',
    excerpt:
      'Reading cap edges and surface sheen so you never under-mist in dry winter heating or over-water during humid weeks.',
    image: '/templates/poppypatch/cutout-gardener.png',
    accentTint: '#EFE0F0',
    keyTakeaways: [
      'Mist from 8–10 inches away so micro-droplets settle gently like morning fog.',
      'Slightly pale or crinkly cap rims mean your room air is dry—add one midday spritz.',
      'Never let standing puddles collect inside the bottom of the plastic bag.'
    ],
    bodyParagraphs: [
      'Because culinary mushrooms expand so quickly—sometimes doubling in size between Tuesday morning and Wednesday night—they draw a surprising amount of moisture from the air right around the box.',
      'Hold your mister about eight inches back from the box window and pump 6 to 8 times. You want to see tiny beads of mist on the plastic folds and a velvety, matte-satin finish on the mushroom caps, rather than heavy dripping drops.',
      'Going away for a Saturday night? Give your kit a slightly heavier mist before you leave and tuck a loose tent of parchment or wax paper over the top to slow evaporation until Sunday evening.'
    ]
  },
  {
    id: 'crispy-coral-oyster-toast',
    title: 'Crispy Skillet Coral Oysters on Garlic Sourdough',
    category: 'Recipes',
    readTime: '5 min read',
    seasonNote: 'Kitchen Table No. 04',
    excerpt:
      'Tear, press, and sear your first harvest until the ruffled edges turn lacy and golden-brown over whipped ricotta.',
    image: '/templates/poppypatch/cutout-coral-oysters.png',
    accentTint: '#E3EBC9',
    keyTakeaways: [
      'Tear oyster clusters by hand along their natural gills instead of chopping them into cubes.',
      'Start in a hot skillet with a heavy pan pressed on top for 3 minutes to sear the edges.',
      'Finish with salted butter, lemon zest, and thyme right at the very end.'
    ],
    recipeIngredients: [
      '1 full cluster fresh Poppy Patch Coral or Cream Oyster mushrooms (~200g)',
      '2 thick slices country sourdough bread, toasted',
      '2 tbsp extra-virgin olive oil + 1 tbsp salted butter',
      '1/2 cup whole-milk ricotta or creamy white bean spread',
      '1 clove garlic (halved for rubbing toast), flaky sea salt & fresh thyme'
    ],
    bodyParagraphs: [
      'Freshly harvested home-grown oyster mushrooms contain far less water than plastic-wrapped grocery store mushrooms, which means they sear into crisp, nutty ribbons in under seven minutes.',
      'Hold your harvested cluster by the firm central stem, trim away the very bottom 1/4 inch where sawdust clings, and gently pull the caps apart into bite-sized fans.',
      'Heat olive oil in a cast-iron or heavy stainless skillet over medium-high heat. Lay the mushroom fans flat without crowding, press them gently with the back of a spatula, and let them sizzle undisturbed for 3 minutes until deeply caramelized before flipping with butter and thyme.'
    ]
  },
  {
    id: 'waking-up-second-flush',
    title: 'Coaxing a Bonus Second Harvest From Your Block',
    category: 'Care',
    readTime: '4 min read',
    seasonNote: 'Field Guide No. 05',
    excerpt:
      'After your first harvest, your mycelium block isn’t finished yet—here is the simple rest-and-soak method for round two.',
    image: '/templates/poppypatch/cutout-side-oysters.png',
    accentTint: '#F9DFD5',
    keyTakeaways: [
      'Let the block rest dry in a cool cabinet for 5 to 7 days after your first harvest.',
      'Submerge the block in a bowl of cold water weighted with a plate for 6–8 hours.',
      'Second harvests are usually smaller (3 to 5 larger caps) with deeper, meatier stems.'
    ],
    bodyParagraphs: [
      'Once you twist off your first big bouquet of mushrooms, the sawdust block inside your Poppy Patch box has spent a lot of its initial water reserve—Wait before soaking it right away.',
      'Clean off any tiny leftover stem stubs from the opening, fold the plastic flaps closed, and let the block rest quietly for about a week. This pause lets the mycelium consolidate its energy.',
      'After its rest, soak the block in cold tap water for 6 hours, drain thoroughly, pop it back into the kraft box, and resume twice-daily misting. Within 7 to 12 days, a second wave of pins often appears!'
    ]
  },
  {
    id: 'brown-butter-miso-noodles',
    title: '15-Minute Brown Butter & Roasted Oyster Udon',
    category: 'Recipes',
    readTime: '4 min read',
    seasonNote: 'Kitchen Table No. 07',
    excerpt:
      'Plump cream pearl mushrooms glazed in white miso, toasted sesame, and nutty brown butter for a cozy weeknight bowl.',
    image: '/templates/poppypatch/cutout-cream-mushrooms.png',
    accentTint: '#EFE0F0',
    keyTakeaways: [
      'Roast whole mini clusters at 425°F for 14 minutes for crisp tops and tender stems.',
      'Whisk white miso with warm noodle water so it emulsifies into a glossy sauce.',
      'Top with sliced scallions and a squeeze of lime.'
    ],
    recipeIngredients: [
      '200g fresh Cream Pearl or Lilac Oyster mushrooms, torn into clusters',
      '2 packs fresh or frozen sanuki udon noodles',
      '3 tbsp unsalted butter + 1.5 tbsp sweet white miso paste',
      '1 tsp toasted sesame oil, thinly sliced scallions, toasted sesame seeds'
    ],
    bodyParagraphs: [
      'When your Oyster Party kit gives you those round, pillowy cream clusters, roasting them at high heat locks in their bounce while turning the thin cap margins crisp as potato chips.',
      'While the mushrooms roast on a parchment-lined sheet pan, brown the butter in a wide pan until it smells like toasted hazelnuts, then swirl in the white miso and a splash of starchy udon cooking water.',
      'Toss the chewy noodles through the glaze and pile the roasted homegrown mushrooms right on top so half stay crunchy and half soak up the broth.'
    ]
  },
  {
    id: 'unboxing-day-one-checklist',
    title: 'Just Opened Your Box? Your 5-Minute Day-One Checklist',
    category: 'Getting started',
    readTime: '2 min read',
    seasonNote: 'Field Guide No. 03',
    excerpt:
      'Whether you want to start growing tonight or store your kit for a gift next month, here is what to do first.',
    image: '/templates/poppypatch/kit-kitchen-garden.png',
    accentTint: '#E3EBC9',
    keyTakeaways: [
      'Starting today? Pop the front cardboard panel and cut a 3-inch X in the bag.',
      'Saving it for later? Keep the box unopened in a cool closet (up to 3 weeks) or fridge.',
      'Snap a Day 1 photo so you can compare it with Day 10!'
    ],
    bodyParagraphs: [
      'Your Poppy Patch kit arrives alive and breathing, packed in dormant readiness. If you are ready to start immediately, all you need is a pair of clean kitchen scissors and tap water.',
      'Press open the perforated front window, make a clean 3-inch "X" slice through the clear inner film (only about 1/8 inch deep into the white block), and mist the X five times.',
      'If you bought the kit as a birthday gift or are leaving on vacation soon, leave the cardboard window sealed and store it in a cool pantry (below 68°F) for up to three weeks before starting.'
    ]
  }
];

export const COMMUNITY_VIGNETTES: GrowerVignette[] = [
  {
    id: 'vignette-1',
    growerName: 'Clara & Theo',
    location: 'Portland, OR (Fictional Studio Story)',
    kitUsed: 'First Sprout · Coral Oyster',
    daysToHarvest: 'Harvested on Day 11',
    countertopSpot: 'Next to the espresso machine',
    quote:
      '“We named our box Barnaby. Between Day 7 and Day 9 the coral ruffles grew so fast our seven-year-old ran downstairs before school every morning with a ruler.”',
    image: '/templates/poppypatch/cutout-coral-oysters.png',
    bgTint: '#F9DFD5'
  },
  {
    id: 'vignette-2',
    growerName: 'Mateo R.',
    location: 'Brooklyn, NY (Fictional Studio Story)',
    kitUsed: 'Oyster Party Duo',
    daysToHarvest: 'Harvested on Day 13',
    countertopSpot: 'North-facing bookshelf nook',
    quote:
      '“My apartment gets almost zero direct sunlight—every basil plant I have ever owned gave up in a week. These pearl oysters thrived in the shade and made two Sunday pasta nights.”',
    image: '/templates/poppypatch/cutout-lilac-mushrooms.png',
    bgTint: '#EFE0F0'
  },
  {
    id: 'vignette-3',
    growerName: 'Sora & Jin',
    location: 'Chicago, IL (Fictional Studio Story)',
    kitUsed: 'Kitchen Garden Trio',
    daysToHarvest: 'Staggered over 3 weeks',
    countertopSpot: 'Butcher-block island corner',
    quote:
      '“Because our radiator heat makes the kitchen dry, we misted three times a day like the field guide suggested. Watching the cream caps pop out of the little kraft window felt like stop-motion animation.”',
    image: '/templates/poppypatch/cutout-cream-mushrooms.png',
    bgTint: '#E3EBC9'
  },
  {
    id: 'vignette-4',
    growerName: 'Hannah L.',
    location: 'Austin, TX (Fictional Studio Story)',
    kitUsed: 'First Sprout · Second Flush',
    daysToHarvest: 'Bonus flush on Day 24',
    countertopSpot: 'Shaded pantry baker’s rack',
    quote:
      '“I genuinely didn’t expect the overnight cold-water soak to work after we ate the first batch, but ten days later five huge velvety caps popped right back out.”',
    image: '/templates/poppypatch/cutout-side-oysters.png',
    bgTint: '#FBF4E4'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-timeline',
    category: 'Growing & Timing',
    question: 'Will my kit definitely grow in 10 to 14 days?',
    answer:
      '10 to 14 days is our typical countertop window when room temperatures sit between 64°F and 72°F with twice-daily misting. Because mushrooms are living organisms, cooler rooms (58–63°F) or drier winter air can stretch pinning closer to 16–20 days. Every block grows on nature’s schedule!'
  },
  {
    id: 'faq-storage',
    category: 'Storage & Gifting',
    question: 'How long can I store a Poppy Patch kit before opening it?',
    answer:
      'If you are gifting a kit or waiting until after a trip, keep the kraft box closed in a cool, dark closet (60–68°F) for up to 3 weeks from delivery. For storage up to 6 weeks, place the sealed inner block in your refrigerator vegetable crisper (never the freezer), then let it warm to room temperature for 24 hours before slicing the X.'
  },
  {
    id: 'faq-light-space',
    category: 'Placement',
    question: 'Do mushrooms need sunlight or a dark closet?',
    answer:
      'Neither! Skip the dark closet and skip the sunny south windowsill. Culinary oyster mushrooms love ordinary, indirect kitchen light—just enough ambient daylight or room lamps to read a recipe card. Direct sun can overheat the box and dry out the delicate pinheads.'
  },
  {
    id: 'faq-spores-pets',
    category: 'Home & Kitchen',
    question: 'Is it safe and tidy to keep on an open kitchen counter?',
    answer:
      'Yes—our kits grow common culinary oyster mushrooms (Pleurotus species) on clean hardwood sawdust and oat bran. When you harvest at our recommended stage (just as the cap edges unflatten), the mushrooms are at peak tenderness before heavy spore release. As with any houseplant or raw produce, keep out of reach of curious pets who like to chew cardboard.'
  },
  {
    id: 'faq-cooking',
    category: 'Culinary Use',
    question: 'Can I eat the mushrooms raw, or should I always cook them?',
    answer:
      'Always cook home-grown oyster mushrooms thoroughly before eating! A hot skillet sear with olive oil or butter breaks down their firm chitin cell walls, brings out their savory, nutty flavor, and turns their ruffled edges deliciously crisp. We focus purely on culinary joy—no medicinal claims or supplements.'
  },
  {
    id: 'faq-after-harvest',
    category: 'Second Harvest & Compost',
    question: 'What do I do with the block once it finishes fruiting?',
    answer:
      'After 2 to 3 harvests, your block has given everything it has. Because it is made purely of hardwood sawdust, oat bran, and mushroom mycelium, you can crumble the spent block directly into an outdoor garden bed, compost bin, or mulch ring around backyard shrubs.'
  }
];
]]>
    </file>
    <file path="src/app/(poppypatch)/poppypatch/utils/storeLogic.ts">
<![CDATA[import { JournalArticle, JournalCategory, MushroomKit } from '../data/poppyPatchData';

export interface BagItem {
  kit: MushroomKit;
  quantity: number;
}

export interface BagSummary {
  totalItems: number;
  subtotal: number;
  freeShippingThreshold: number;
  amountToFreeShipping: number;
  qualifiesForFreeShipping: boolean;
  shippingEstimate: number;
  grandTotal: number;
}

export const FREE_SHIPPING_THRESHOLD = 55;
export const STANDARD_SHIPPING_FEE = 7;

export function updateBagItems(
  currentItems: BagItem[],
  kit: MushroomKit,
  delta: number
): BagItem[] {
  const existingIndex = currentItems.findIndex((item) => item.kit.id === kit.id);

  if (existingIndex === -1) {
    if (delta <= 0) return [...currentItems];
    return [...currentItems, { kit, quantity: delta }];
  }

  const nextQuantity = currentItems[existingIndex].quantity + delta;
  if (nextQuantity <= 0) {
    return currentItems.filter((item) => item.kit.id !== kit.id);
  }

  return currentItems.map((item, idx) =>
    idx === existingIndex ? { ...item, quantity: nextQuantity } : item
  );
}

export function calculateBagSummary(items: BagItem[]): BagSummary {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce(
    (acc, item) => acc + item.kit.price * item.quantity,
    0
  );
  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingEstimate =
    totalItems === 0 ? 0 : qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const grandTotal = subtotal + shippingEstimate;

  return {
    totalItems,
    subtotal,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    amountToFreeShipping,
    qualifiesForFreeShipping,
    shippingEstimate,
    grandTotal
  };
}

export function filterJournalArticles(
  articles: JournalArticle[],
  activeCategory: 'All' | JournalCategory
): JournalArticle[] {
  if (activeCategory === 'All') {
    return articles;
  }
  return articles.filter((article) => article.category === activeCategory);
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  normalizedEmail?: string;
}

export function validateNewsletterEmail(rawEmail: string): ValidationResult {
  const trimmed = rawEmail.trim();
  if (!trimmed) {
    return {
      valid: false,
      error: 'Please enter your email address so we know where to send your growing notes.'
    };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailPattern.test(trimmed)) {
    return {
      valid: false,
      error: 'Please enter a complete email address (like clara@kitchenpatch.com).'
    };
  }

  return {
    valid: true,
    normalizedEmail: trimmed.toLowerCase()
  };
}

export interface HarvestConditionEstimate {
  pinningDays: string;
  harvestWindowDays: string;
  capTextureNote: string;
  careRecommendation: string;
}

export function estimateCountertopConditions(
  roomTempF: number,
  mistsPerDay: 1 | 2 | 3
): HarvestConditionEstimate {
  const isCool = roomTempF < 64;
  const isWarm = roomTempF > 74;

  let pinningDays = 'Days 5–7';
  let harvestWindowDays = '10–14 days (typical)';

  if (isCool) {
    pinningDays = 'Days 7–10';
    harvestWindowDays = '14–18 days (cooler room pace)';
  } else if (isWarm) {
    pinningDays = 'Days 4–6';
    harvestWindowDays = '9–12 days (warmer room pace)';
  }

  let capTextureNote = 'Plump, velvety caps with supple ruffled margins';
  let careRecommendation =
    'Your room conditions are right in the cozy countertop sweet spot! Keep misting morning and evening.';

  if (mistsPerDay === 1) {
    capTextureNote = 'Slightly lighter caps that may crinkle at the outer rim if air is dry';
    careRecommendation =
      'With once-daily misting, tuck the box away from drafts and add an evening spritz once pins appear.';
  } else if (mistsPerDay === 3 && !isWarm) {
    capTextureNote = 'Extra-lush, dewy bouquets with deep coral and pearl coloring';
    careRecommendation =
      'Great for winter heating or air-conditioned homes—just make sure water never pools inside the bag.';
  } else if (isWarm && mistsPerDay < 3) {
    capTextureNote = 'Fast-expanding fans that drink moisture quickly';
    careRecommendation =
      'Warmer kitchens evaporate mist faster; consider 3 light spritzes daily and harvest before caps flatten.';
  }

  return {
    pinningDays,
    harvestWindowDays,
    capTextureNote,
    careRecommendation
  };
}
]]>
    </file>
  </files>
</template>
