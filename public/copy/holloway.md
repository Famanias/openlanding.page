<template slug="holloway" name="HOLLOWAY">
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
    <file path="src/app/(holloway)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./holloway/holloway.css";

const cormorant_Garamond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
});

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "HOLLOWAY — Modular Living & Architectural Room Studio",
  description: "Objects for the spaces we live in. Explore the HOLLOWAY modular furniture collection and interactive architectural room-design studio.",
  openGraph: {
    title: "HOLLOWAY — Modular Living & Architectural Room Studio",
    description: "Objects for the spaces we live in. Explore the HOLLOWAY modular furniture collection and interactive architectural room-design studio.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F2EA",
};

export default function HollowayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant_Garamond.variable} ${plus_Jakarta_Sans.variable} scroll-smooth`}>
      <body className="bg-[#F5F2EA] text-[#262824] antialiased selection:bg-[#262824] selection:text-[#F5F2EA]">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(holloway)/holloway/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(holloway)/holloway/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/holloway";

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
        className={`holloway-placeholder ${className ?? ""}`}
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
    <file path="src/app/(holloway)/holloway/holloway.css">
<![CDATA[@import "tailwindcss";

@layer base {
  :root {
    --hw-ivory: #F5F2EA;
    --hw-stone: #EBE5D8;
    --hw-ink: #262824;
    --hw-oak: #B88C60;
    --hw-blue: #A6BBC7;
    --hw-burgundy: #874C54;
    --hw-graphite: #777974;
    --hw-line: rgba(38, 40, 36, 0.16);
    --hw-line-strong: rgba(38, 40, 36, 0.42);
  }

  html {
    scroll-behavior: smooth;
    background-color: #F5F2EA;
    color: #262824;
    font-family: var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

.font-editorial {
  font-family: var(--font-cormorant-garamond), 'Cormorant Garamond', Georgia, serif;
}

.font-ui {
  font-family: var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}

.font-drafting {
  font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;
  font-variant-numeric: tabular-nums;
}

@keyframes hwFadeLift {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-hw-reveal {
  animation: hwFadeLift 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.animate-hw-reveal-delay-1 {
  animation: hwFadeLift 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both;
}

.animate-hw-reveal-delay-2 {
  animation: hwFadeLift 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.24s both;
}
]]>
    </file>
    <file path="src/app/(holloway)/holloway/HollowayApp.tsx">
<![CDATA['use client';

import HollowayPage from './components/holloway/HollowayPage';

export default function HollowayApp() {
  return <HollowayPage />;
}
]]>
    </file>
    <file path="src/app/(holloway)/holloway/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#F5F2EA" />
  <text x="32" y="42" font-family="system-ui, sans-serif" font-size="30" font-weight="bold" fill="#262824" text-anchor="middle">H</text>
</svg>
]]>
    </file>
    <file path="src/app/(holloway)/holloway/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "HOLLOWAY — Modular Living & Architectural Room Studio";

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
          backgroundColor: "#F5F2EA",
          color: "#262824",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.08em" }}>
          <span>HOLLOWAY</span>
          <span style={{ color: "#B88C60" }}>/</span>
          <span style={{ fontSize: 18, opacity: 0.8 }}>LANDING TEMPLATE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: "bold", lineHeight: 1.1, maxWidth: 950 }}>
            HOLLOWAY — Modular Living & Architectural Room Studio
          </div>
          <div style={{ display: "flex", fontSize: 22, opacity: 0.75, maxWidth: 850 }}>
            Objects for the spaces we live in. Explore the HOLLOWAY modular furniture collection and interactive architectural room-design studio.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.7 }}>
          <span>openlanding.page</span>
          <span style={{ color: "#B88C60" }}>Next.js 16 · React 19 · Tailwind v4</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
]]>
    </file>
    <file path="src/app/(holloway)/holloway/page.tsx">
<![CDATA["use client";

import HollowayApp from "./HollowayApp";

export default function HollowayPage() {
  return <HollowayApp />;
}
]]>
    </file>
    <file path="src/app/(holloway)/holloway/components/holloway/CollectionOverview.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import {
  FURNITURE_CATALOG,
  HOLLOWAY_ASSETS,
  ORDERED_FURNITURE_IDS,
} from '../../lib/holloway/floorPlan';

interface CollectionOverviewProps {
  onInspectInStudio: (moduleId: string) => void;
}

export default function CollectionOverview({ onInspectInStudio }: CollectionOverviewProps) {
  const [activeId, setActiveId] = useState<string>('sofa');
  const activeItem = FURNITURE_CATALOG[activeId] ?? FURNITURE_CATALOG.sofa;

  return (
    <section
      id="collection"
      aria-labelledby="collection-heading"
      className="relative w-full border-b border-[#262824]/15 bg-[#F5F2EA] py-20 md:py-28 lg:py-32"
    >
      {/* Top Architectural Datum Line with Crosshairs */}
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="flex items-center justify-between border-b border-[#262824]/20 pb-4 font-drafting text-[11px] tracking-[0.14em] text-[#777974] uppercase">
          <span>01 / MODULAR COLLECTION SYSTEM</span>
          <span className="hidden sm:inline">SERIES NO. 092 — FIVE CORE TYPOLOGIES</span>
          <span>SCALE 1:20</span>
        </div>

        {/* Editorial Split Composition */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Essay & Interactive Typology Ledger */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="font-ui text-[11px] font-medium tracking-[0.18em] text-[#777974] uppercase">
                ARCHITECTURAL DOMESTICITY
              </p>

              <h2
                id="collection-heading"
                style={{ textWrap: 'balance' }}
                className="mt-3 font-editorial text-[38px] sm:text-[46px] md:text-[54px] font-normal leading-[1.02] tracking-[0.01em] text-[#262824] uppercase"
              >
                OBJECTS PROPORTIONED FOR EVOLVING ROOMS.
              </h2>

              <p className="mt-6 font-ui text-[15px] md:text-[16px] leading-[1.7] text-[#262824]/85">
                Rather than isolated statement pieces that compete for attention, the HOLLOWAY
                collection is conceived as a quiet architectural kit of parts. Five foundational
                forms—seating, lounge, horizontal plinth, open vertical storage, and warm
                illumination—share a unified datum and honest material palette.
              </p>

              <p className="mt-4 font-ui text-[15px] md:text-[16px] leading-[1.7] text-[#262824]/75">
                Every module aligns to a logical spatial grid, allowing rooms to expand, contract,
                or reconfigure as daily rituals shift from solitude to gathering.
              </p>
            </div>

            {/* Interactive Typology Ledger (Clean unboxed editorial index) */}
            <div className="mt-10 border-t border-[#262824]/20">
              <div className="py-3 flex items-center justify-between font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase border-b border-[#262824]/15">
                <span>INDEX / TYPOLOGY</span>
                <span>FOOTPRINT · METRIC</span>
              </div>

              <div role="tablist" aria-label="Collection Furniture Typologies">
                {ORDERED_FURNITURE_IDS.map((id) => {
                  const entry = FURNITURE_CATALOG[id];
                  const isCurrent = activeId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={isCurrent}
                      onClick={() => setActiveId(id)}
                      className={`w-full text-left py-4 border-b border-[#262824]/15 transition-colors flex items-baseline justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#262824] ${
                        isCurrent
                          ? 'text-[#262824]'
                          : 'text-[#262824]/60 hover:text-[#262824]'
                      }`}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-drafting text-[11px] text-[#777974]">
                          {entry.index}
                        </span>
                        <span
                          className={`font-editorial text-[22px] md:text-[25px] tracking-[0.02em] ${
                            isCurrent ? 'font-medium underline underline-offset-8 decoration-[#262824]/50' : 'font-normal'
                          }`}
                        >
                          {entry.fullName}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 font-drafting text-[11px] whitespace-nowrap shrink-0">
                        <span className="text-[#777974]">{entry.gridFootprintLabel}</span>
                        <span aria-hidden="true" className="text-[#262824]/30">
                          ·
                        </span>
                        <span>{entry.dimensionsMetric.split('×')[0].trim()} mm</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Cutout & Scale Model Study */}
          <div className="lg:col-span-7">
            <div className="relative border border-[#262824]/20 bg-[#ECE7DC] p-6 sm:p-10 md:p-12">
              {/* Corner Drafting Crosshairs */}
              <span
                aria-hidden="true"
                className="absolute top-2 left-3 font-drafting text-[11px] text-[#262824]/45"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="absolute top-2 right-3 font-drafting text-[11px] text-[#262824]/45"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-2 left-3 font-drafting text-[11px] text-[#262824]/45"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-2 right-3 font-drafting text-[11px] text-[#262824]/45"
              >
                +
              </span>

              {/* Top Spec Header inside Frame */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#262824]/15 pb-4">
                <div className="flex items-center gap-3 font-drafting text-[11px] tracking-[0.12em] text-[#262824]">
                  <span>REF. {activeItem.code}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#777974] uppercase">{activeItem.category}</span>
                </div>
                <div className="flex items-center gap-2 font-drafting text-[11px] text-[#262824]">
                  <span
                    aria-hidden="true"
                    className="inline-block h-3 w-3 border border-[#262824]/40"
                    style={{ backgroundColor: activeItem.swatchHex }}
                  />
                  <span>{activeItem.gridFootprintLabel}</span>
                </div>
              </div>

              {/* Primary Object Study + Architectural Scale Model Context */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 relative aspect-square overflow-hidden border border-[#262824]/15 bg-[#F5F2EA]">
                  <img
                    src={activeItem.imageUrl}
                    alt={`${activeItem.fullName} — ${activeItem.materialSummary}`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between border-t border-[#262824]/20 pt-2 font-drafting text-[10px] text-[#262824]/80 bg-[#F5F2EA]/75 backdrop-blur-[2px] px-2.5 py-1">
                    <span>ORTHOGRAPHIC STUDY</span>
                    <span>{activeItem.dimensionsMetric}</span>
                  </div>
                </div>

                {/* Secondary Fragment: Scale Model Workshop + Specification Notes */}
                <div className="md:col-span-5 flex flex-col justify-between gap-6">
                  <div className="border border-[#262824]/15 bg-[#F5F2EA] p-2.5">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={HOLLOWAY_ASSETS.emptyRoomModel}
                        alt="HOLLOWAY 1:20 timber and plaster architectural room model on studio drafting table"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="mt-2 font-drafting text-[10px] tracking-[0.08em] text-[#777974] uppercase">
                      FIG. 01 — PHYSICAL DATUM MODEL (12 × 8 GRID)
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase">
                        MATERIAL SPECIFICATION
                      </p>
                      <p className="mt-1 font-ui text-[14px] leading-[1.55] text-[#262824]">
                        {activeItem.materialSummary}
                      </p>
                    </div>

                    <div>
                      <p className="font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase">
                        SPATIAL ROLE
                      </p>
                      <p className="mt-1 font-ui text-[14px] leading-[1.55] text-[#262824]/80">
                        {activeItem.architecturalNote}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => onInspectInStudio(activeItem.id)}
                        className="font-ui text-[11px] font-medium tracking-[0.15em] text-[#262824] uppercase border-b border-[#262824] pb-1 hover:text-[#874C54] hover:border-[#874C54] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#262824]"
                      >
                        POSITION {activeItem.shortName} IN ROOM STUDIO <span aria-hidden="true">↗</span>
                      </button>
                    </div>
                  </div>
                </div>
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
    <file path="src/app/(holloway)/holloway/components/holloway/DesignPhilosophy.tsx">
<![CDATA['use client';

import React from 'react';
import { HOLLOWAY_ASSETS } from '../../lib/holloway/floorPlan';

export default function DesignPhilosophy() {
  return (
    <section
      id="about"
      aria-labelledby="philosophy-heading"
      className="relative w-full border-b border-[#262824]/15 bg-[#EFECE3] py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Top Section Datum Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#262824]/20 pb-4 font-drafting text-[11px] tracking-[0.14em] text-[#777974] uppercase">
          <span>04 / DESIGN PHILOSOPHY & JOINERY CRAFT</span>
          <span className="hidden sm:inline">CONSTRUCTED SIMPLICITY · ARCHITECTURAL LONGEVITY</span>
          <span>ATELIER NOTES</span>
        </div>

        {/* Full-Width Editorial Studio Scene with Architectural Caption */}
        <div className="mt-12 border border-[#262824]/20 bg-[#F5F2EA] p-4 sm:p-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <img
              src={HOLLOWAY_ASSETS.lifestyleRoom}
              alt="HOLLOWAY architectural studio living space featuring walnut modular shelving wall, powder-blue sofa with burgundy throw, low timber table with architectural scale models, and tall daylight window"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 font-drafting text-[10.5px] tracking-[0.1em] text-[#777974] uppercase">
            <span>
              FIG. 04 — RESIDENCE & STUDIO STUDY: WALNUT SHELVING SYSTEM, ATELIER SOFA & PLINTH TABLE
            </span>
            <span>NATURAL NORTH-EAST DAYLIGHT</span>
          </div>
        </div>

        {/* Editorial Narrative + Joinery Craft Photography */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Joinery Craft Close-up */}
          <div className="lg:col-span-5">
            <div className="border border-[#262824]/20 bg-[#F5F2EA] p-4 sm:p-5">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={HOLLOWAY_ASSETS.assemblyDetail}
                  alt="Craftsperson assembling precision three-way interlocking walnut joinery with a hex key on a timber workbench"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-3.5 flex items-center justify-between border-t border-[#262824]/15 pt-3 font-drafting text-[10px] tracking-[0.1em] text-[#777974] uppercase">
                <span>FIG. 05 — THREE-WAY INTERLOCKING TIMBER JOINT</span>
                <span>HEX FASTENER · DRY ASSEMBLY</span>
              </div>
            </div>
          </div>

          {/* Right: Architectural Narrative & Principles */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <p className="font-ui text-[11px] font-medium tracking-[0.18em] text-[#777974] uppercase">
                THE HOLLOWAY APPROACH
              </p>
              <h2
                id="philosophy-heading"
                style={{ textWrap: 'balance' }}
                className="mt-3 font-editorial text-[38px] sm:text-[48px] md:text-[56px] font-normal leading-[1.02] tracking-[0.01em] text-[#262824] uppercase"
              >
                THE HOME AS AN EVOLVING COMPOSITION.
              </h2>
            </div>

            <div className="space-y-5 font-ui text-[15.5px] md:text-[16.5px] leading-[1.75] text-[#262824]/85 max-w-[64ch]">
              <p>
                Architecture is rarely static; the rooms we inhabit shift between work, quiet reading,
                and shared conversation. Yet conventional furniture is built as if a floor plan is
                permanent—heavy, fixed, and difficult to disassemble when life moves.
              </p>
              <p>
                Every HOLLOWAY piece begins at the joinery level. By combining precision-milled
                interlocking timber shoulders with recessed mechanical fasteners, our modules
                assemble with structural rigidity and disassemble cleanly without wear.
              </p>
            </div>

            {/* Three Measured Editorial Tenets (Clean Hairline Rows, Zero Cards/Pills) */}
            <div className="border-t border-[#262824]/20 pt-2">
              <div className="py-5 border-b border-[#262824]/15 grid grid-cols-1 sm:grid-cols-12 gap-3 items-baseline">
                <span className="sm:col-span-4 font-drafting text-[11px] tracking-[0.14em] text-[#262824] uppercase">
                  01. DRY-FIT PRECISION
                </span>
                <p className="sm:col-span-8 font-ui text-[14.5px] leading-[1.6] text-[#262824]/80">
                  Milled bridle and lap joints lock along three axes using a single hex key,
                  allowing pieces to move through narrow doorways and re-anchor in new rooms.
                </p>
              </div>

              <div className="py-5 border-b border-[#262824]/15 grid grid-cols-1 sm:grid-cols-12 gap-3 items-baseline">
                <span className="sm:col-span-4 font-drafting text-[11px] tracking-[0.14em] text-[#262824] uppercase">
                  02. SHARED DATUM LINES
                </span>
                <p className="sm:col-span-8 font-ui text-[14.5px] leading-[1.6] text-[#262824]/80">
                  Seat heights, table plinths, and lower shelf tiers share consistent horizontal
                  elevations so any arrangement reads with visual calm.
                </p>
              </div>

              <div className="py-5 border-b border-[#262824]/15 grid grid-cols-1 sm:grid-cols-12 gap-3 items-baseline">
                <span className="sm:col-span-4 font-drafting text-[11px] tracking-[0.14em] text-[#262824] uppercase">
                  03. RENEWABLE COMPONENTS
                </span>
                <p className="sm:col-span-8 font-ui text-[14.5px] leading-[1.6] text-[#262824]/80">
                  Upholstery covers, cushion cores, and solid timber rails can be individually
                  refreshed or re-oiled over decades rather-than replacing the whole object.
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
    <file path="src/app/(holloway)/holloway/components/holloway/FeaturedObjects.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import { HOLLOWAY_ASSETS } from '../../lib/holloway/floorPlan';

interface MaterialStudy {
  id: string;
  index: string;
  code: string;
  title: string;
  origin: string;
  finish: string;
  description: string;
  textureUrl: string;
  pairedObjectUrl: string;
  pairedObjectCaption: string;
  swatchHex: string;
}

const MATERIAL_STUDIES: MaterialStudy[] = [
  {
    id: 'timber',
    index: '01',
    code: 'MAT-W07',
    title: 'Oiled Quartersawn Walnut & Oak',
    origin: 'FSC-Certified European & North American Timber',
    finish: 'Hand-rubbed plant oil & matte beeswax',
    description:
      'Selected for straight architectural grain and warm honey-to-umber undertones. Left open-pored so the surface deepens in character with light and daily touch.',
    textureUrl: HOLLOWAY_ASSETS.woodTexture,
    pairedObjectUrl: HOLLOWAY_ASSETS.tableAlpha,
    pairedObjectCaption: 'HW-092-T3 · Plinth Low Table in Oiled Walnut',
    swatchHex: '#B88C60',
  },
  {
    id: 'boucle',
    index: '02',
    code: 'MAT-F09',
    title: 'Powder-Blue Architectural Wool Weave',
    origin: '100% Combed Norwegian & New Zealand Virgin Wool',
    finish: 'Two-tone yarn-dyed plain weave (100,000 Martindale)',
    description:
      'Engineered to hold crisp rectilinear tailoring across modular seating while offering breathable domestic softness in every season.',
    textureUrl: HOLLOWAY_ASSETS.fabricTexture,
    pairedObjectUrl: HOLLOWAY_ASSETS.sofaAlpha,
    pairedObjectCaption: 'HW-092-S1 · Atelier 01 Modular Sofa in Powder Blue',
    swatchHex: '#A6BBC7',
  },
  {
    id: 'plaster',
    index: '03',
    code: 'MAT-S08',
    title: 'Warm Mineral Lime & Travertine Finish',
    origin: 'Slaked Dolomitic Lime & Crushed Marble Aggregate',
    finish: 'Matte mineral wash & powder-coated architectural steel',
    description:
      'Provides the quiet, light-diffusing backdrop and structural shelving tone that anchors both warm timber and deep oxblood upholstery.',
    textureUrl: HOLLOWAY_ASSETS.plasterTexture,
    pairedObjectUrl: HOLLOWAY_ASSETS.shelfAlpha,
    pairedObjectCaption: 'HW-092-SH4 · Cadence Open Shelving in Mineral Steel',
    swatchHex: '#E8E2D5',
  },
];

interface FeaturedObjectsProps {
  onSelectForStudio: (moduleId: string) => void;
}

export default function FeaturedObjects({ onSelectForStudio }: FeaturedObjectsProps) {
  const [activeMaterialId, setActiveMaterialId] = useState<string>('timber');
  const activeMaterial =
    MATERIAL_STUDIES.find((m) => m.id === activeMaterialId) ?? MATERIAL_STUDIES[0];

  return (
    <section
      id="materials"
      aria-labelledby="materials-heading"
      className="relative w-full border-b border-[#262824]/15 bg-[#F5F2EA] py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Top Section Datum Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#262824]/20 pb-4 font-drafting text-[11px] tracking-[0.14em] text-[#777974] uppercase">
          <span>03 / FEATURED OBJECTS & MATERIAL PALETTE</span>
          <span className="hidden sm:inline">TACTILE HONESTY · SOFTNESS VERSUS STRUCTURE</span>
          <span>ARCHIVE 092-M</span>
        </div>

        {/* Part A: Asymmetrical Editorial Object Studies (Seating, Storage, Illumination) */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="font-ui text-[11px] font-medium tracking-[0.18em] text-[#777974] uppercase">
              FORM & PROPORTION
            </p>
            <h2
              id="materials-heading"
              style={{ textWrap: 'balance' }}
              className="mt-3 font-editorial text-[38px] sm:text-[46px] md:text-[54px] font-normal leading-[1.02] tracking-[0.01em] text-[#262824] uppercase"
            >
              SOFTNESS HELD BY STRUCTURE.
            </h2>
            <p className="mt-5 font-ui text-[15px] md:text-[16px] leading-[1.7] text-[#262824]/80">
              Every HOLLOWAY object balances architectural discipline with tactile warmth. Deep
              upholstered volumes rest on slender timber plinths; open shelving frames air and light
              rather than closing off walls.
            </p>
          </div>

          {/* Asymmetrical Diptych: Lounge Chair + Floor Lamp */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-8 items-end">
            <article className="sm:col-span-7 border border-[#262824]/20 bg-[#ECE7DC] p-5">
              <div className="flex items-center justify-between font-drafting text-[10px] text-[#777974] pb-3 border-b border-[#262824]/15">
                <span>STUDY A · MODULAR SEATING</span>
                <span>820 × 840 MM</span>
              </div>
              <div className="mt-4 aspect-[4/3] overflow-hidden bg-[#F5F2EA]">
                <img
                  src={HOLLOWAY_ASSETS.chairAlpha}
                  alt="HOLLOWAY Vesper Lounge Chair upholstered in muted burgundy wool on a turned walnut base"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="font-editorial text-[24px] text-[#262824]">
                    Vesper Lounge Chair
                  </h3>
                  <p className="mt-1 font-ui text-[13.5px] leading-[1.55] text-[#262824]/75">
                    Muted oxblood wool shell with curved acoustic embrace and solid walnut legs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectForStudio('chair')}
                  className="font-drafting text-[10.5px] uppercase tracking-[0.12em] text-[#262824] border-b border-[#262824]/60 pb-0.5 hover:text-[#874C54] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  STUDIO ↗
                </button>
              </div>
            </article>

            <article className="sm:col-span-5 border border-[#262824]/20 bg-[#ECE7DC] p-5">
              <div className="flex items-center justify-between font-drafting text-[10px] text-[#777974] pb-3 border-b border-[#262824]/15">
                <span>STUDY B · ILLUMINATION</span>
                <span>H 1480 MM</span>
              </div>
              <div className="mt-4 aspect-square overflow-hidden bg-[#F5F2EA]">
                <img
                  src={HOLLOWAY_ASSETS.lampAlpha}
                  alt="HOLLOWAY Column Floor Lamp with warm parchment shade and oxblood steel stem"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="font-editorial text-[22px] text-[#262824]">
                    Column Floor Lamp
                  </h3>
                  <p className="mt-1 font-ui text-[13px] leading-[1.55] text-[#262824]/75">
                    Hand-laid Washi diffuser casting a warm perimeter glow.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectForStudio('lamp')}
                  className="font-drafting text-[10.5px] uppercase tracking-[0.12em] text-[#262824] border-b border-[#262824]/60 pb-0.5 hover:text-[#874C54] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  STUDIO ↗
                </button>
              </div>
            </article>
          </div>
        </div>

        {/* Part B: Interactive Materiality & Texture Workbench */}
        <div className="mt-20 md:mt-24 border-t border-[#262824]/20 pt-14">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-10">
            <div>
              <p className="font-ui text-[11px] font-medium tracking-[0.18em] text-[#777974] uppercase">
                TACTILE PALETTE
              </p>
              <h3 className="mt-2 font-editorial text-[32px] md:text-[40px] font-normal text-[#262824] uppercase">
                RAW SURFACES, MEASURED WARMTH.
              </h3>
            </div>
            <p className="font-drafting text-[11px] text-[#777974] uppercase">
              SELECT SWATCH TO INSPECT GRAIN & APPLICATION
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left: Material Swatch Selector Tabs */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {MATERIAL_STUDIES.map((study) => {
                const isSelected = study.id === activeMaterial.id;
                return (
                  <button
                    key={study.id}
                    type="button"
                    onClick={() => setActiveMaterialId(study.id)}
                    aria-pressed={isSelected}
                    className={`w-full text-left p-5 border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#262824] ${
                      isSelected
                        ? 'border-[#262824] bg-[#ECE7DC]'
                        : 'border-[#262824]/15 bg-[#F5F2EA] hover:border-[#262824]/45'
                    }`}
                  >
                    <div className="flex items-center justify-between font-drafting text-[10.5px] text-[#777974]">
                      <span>
                        {study.index} / {study.code}
                      </span>
                      <span
                        aria-hidden="true"
                        className="inline-block h-3.5 w-3.5 border border-[#262824]/40"
                        style={{ backgroundColor: study.swatchHex }}
                      />
                    </div>
                    <h4 className="mt-2 font-editorial text-[24px] text-[#262824]">
                      {study.title}
                    </h4>
                    <p className="mt-1 font-drafting text-[10.5px] text-[#777974] uppercase">
                      {study.origin}
                    </p>
                    <p className="mt-2.5 font-ui text-[13.5px] leading-[1.6] text-[#262824]/80">
                      {study.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right: Macro Texture + Paired Object Comparison */}
            <div className="lg:col-span-7 border border-[#262824]/20 bg-[#ECE7DC] p-6 md:p-8 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-[#262824]/15 pb-3 font-drafting text-[10.5px] text-[#262824] uppercase">
                <span>MACRO SURFACE STUDY · 1:1 GRAIN</span>
                <span>FINISH: {activeMaterial.finish}</span>
              </div>

              <div className="my-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* 1:1 Macro Texture */}
                <div className="sm:col-span-7 relative aspect-square overflow-hidden border border-[#262824]/20 bg-[#F5F2EA]">
                  <img
                    src={activeMaterial.textureUrl}
                    alt={`Macro surface texture of ${activeMaterial.title}`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#F5F2EA]/85 backdrop-blur-xs px-3 py-1 font-drafting text-[10px] text-[#262824] border border-[#262824]/20">
                    {activeMaterial.code} — NATURAL DAYLIGHT (5500K)
                  </div>
                </div>

                {/* Paired Furniture Application */}
                <div className="sm:col-span-5 flex flex-col gap-4">
                  <div className="aspect-square overflow-hidden border border-[#262824]/20 bg-[#F5F2EA]">
                    <img
                      src={activeMaterial.pairedObjectUrl}
                      alt={activeMaterial.pairedObjectCaption}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="border-t border-[#262824]/15 pt-3">
                    <p className="font-drafting text-[10px] tracking-[0.1em] text-[#777974] uppercase">
                      APPLIED FORM
                    </p>
                    <p className="mt-1 font-ui text-[13px] font-medium text-[#262824]">
                      {activeMaterial.pairedObjectCaption}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#262824]/15 pt-3 flex items-center justify-between font-drafting text-[10px] text-[#777974]">
                <span>VOC-FREE FINISHES · REPAIRABLE SURFACES</span>
                <span>LONGEVITY SPECIFICATION</span>
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
    <file path="src/app/(holloway)/holloway/components/holloway/FinalTransition.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import { HOLLOWAY_ASSETS } from '../../lib/holloway/floorPlan';

interface FinalTransitionProps {
  onDesignSpace: () => void;
  onExploreCollection: () => void;
  inquiryOpen: boolean;
  onToggleInquiry: (open: boolean) => void;
}

export default function FinalTransition({
  onDesignSpace,
  onExploreCollection,
  inquiryOpen,
  onToggleInquiry,
}: FinalTransitionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Private Residence');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail || !trimmedEmail.includes('@')) {
      setErrorMessage('Please provide your name and a valid studio or personal email address.');
      return;
    }
    setErrorMessage('');
    setSubmitted(true);
  };

  return (
    <section
      id="transition"
      aria-labelledby="transition-heading"
      className="relative w-full overflow-hidden bg-[#EAE5D9]"
    >
      {/* Full-Bleed Architectural Room Composition matching approved footer-reference */}
      <div className="relative min-h-[480px] md:min-h-[560px] lg:h-[63vh] w-full flex flex-col justify-between">
        {/* Background Room Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={HOLLOWAY_ASSETS.collectionScene}
            alt="HOLLOWAY living room composition with three-module powder-blue sofa, solid oak low table, burgundy cabinet, built-in oak shelves, and architectural drafting overlay"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#F5F2EA]/60 via-[#F5F2EA]/15 to-transparent md:from-[#F5F2EA]/35 md:via-transparent"
          />
        </div>

        {/* Left-Aligned Editorial Headline & CTAs matching footer-reference */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between px-6 py-10 md:px-14 md:py-12">
          <div className="max-w-[660px]">
            <h2
              id="transition-heading"
              className="font-editorial text-[46px] sm:text-[62px] md:text-[76px] lg:text-[86px] font-medium leading-[0.93] tracking-[0.01em] text-[#262824] uppercase"
            >
              MAKE ROOM
              <br />
              FOR WHAT
              <br />
              MATTERS.
            </h2>

            <p className="mt-4 md:mt-5 font-ui text-[15px] sm:text-[17px] md:text-[19px] font-normal tracking-[0.01em] text-[#262824]">
              Built to fit. Made to last. Arranged by you.
            </p>
          </div>

          {/* Bottom-Left Action Links matching footer-reference */}
          <div className="mt-10 md:mt-14 flex flex-wrap items-center gap-7 md:gap-10">
            <button
              type="button"
              onClick={onDesignSpace}
              className="font-ui text-[12px] md:text-[13.5px] font-medium tracking-[0.12em] text-[#262824] uppercase border-b-[1.5px] border-[#262824] pb-1 transition-colors hover:text-[#874C54] hover:border-[#874C54] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#262824]"
            >
              DESIGN YOUR SPACE <span aria-hidden="true" className="ml-1">↗</span>
            </button>

            <button
              type="button"
              onClick={onExploreCollection}
              className="font-ui text-[11.5px] md:text-[12.5px] font-medium tracking-[0.12em] text-[#262824]/90 uppercase transition-colors hover:text-[#262824] underline-offset-4 hover:underline whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#262824]"
            >
              EXPLORE THE COLLECTION
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Architectural Inquiry & Material Sample Dossier */}
      {inquiryOpen && (
        <div
          id="studio-inquiries"
          role="region"
          aria-label="Material Sample and Studio Inquiry Form"
          className="border-t border-[#262824]/30 bg-[#EFECE3] px-6 py-10 md:px-14"
        >
          <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <p className="font-drafting text-[10.5px] tracking-[0.14em] text-[#777974] uppercase">
                ARCHITECTURAL INQUIRIES & MATERIAL SWATCH BOX
              </p>
              <h3 className="mt-2 font-editorial text-[30px] md:text-[36px] text-[#262824] uppercase">
                EXPERIENCE THE PALETTE IN YOUR LIGHT.
              </h3>
              <p className="mt-3 font-ui text-[14.5px] leading-[1.65] text-[#262824]/80">
                Request our physical presentation box containing oiled walnut, quartersawn oak,
                powder-blue virgin wool bouclé, and oxblood felt swatches, or schedule a private
                room planning consultation.
              </p>
            </div>

            <div className="lg:col-span-7">
              {submitted ? (
                <div className="border border-[#262824]/25 bg-[#F5F2EA] p-6">
                  <p className="font-drafting text-[11px] tracking-[0.14em] text-[#262824] uppercase">
                    DOSSIER REGISTERED — REF. HW-092
                  </p>
                  <p className="mt-2 font-editorial text-[24px] text-[#262824]">
                    Thank you, {name}. Your {projectType.toLowerCase()} swatch kit & studio notes
                    have been queued for dispatch to {email}.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                    }}
                    className="mt-4 font-drafting text-[11px] uppercase tracking-[0.12em] text-[#262824] border-b border-[#262824] pb-0.5 cursor-pointer"
                  >
                    SUBMIT ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 border border-[#262824]/20 bg-[#F5F2EA] p-6"
                >
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="hw-inquiry-name"
                      className="block font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase mb-1.5"
                    >
                      NAME / PRACTICE
                    </label>
                    <input
                      id="hw-inquiry-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Clara Lindqvist"
                      className="w-full border border-[#262824]/25 bg-white px-3 py-2 font-ui text-[13.5px] text-[#262824] focus:border-[#262824] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="hw-inquiry-email"
                      className="block font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase mb-1.5"
                    >
                      EMAIL ADDRESS
                    </label>
                    <input
                      id="hw-inquiry-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="studio@practice.com"
                      className="w-full border border-[#262824]/25 bg-white px-3 py-2 font-ui text-[13.5px] text-[#262824] focus:border-[#262824] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="hw-inquiry-type"
                      className="block font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase mb-1.5"
                    >
                      PROJECT CONTEXT
                    </label>
                    <select
                      id="hw-inquiry-type"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full border border-[#262824]/25 bg-white px-3 py-2 font-ui text-[13.5px] text-[#262824] focus:border-[#262824] focus:outline-none"
                    >
                      <option value="Private Residence">Private Residence</option>
                      <option value="Architectural Specification">Architectural Specification</option>
                      <option value="Editorial / Press">Editorial / Press</option>
                    </select>
                  </div>

                  {errorMessage && (
                    <div className="sm:col-span-12 font-drafting text-[11px] text-[#874C54]">
                      {errorMessage}
                    </div>
                  )}

                  <div className="sm:col-span-12 flex items-center justify-between pt-2">
                    <span className="font-drafting text-[10px] text-[#777974] uppercase">
                      COMPLIMENTARY DISPATCH · SHIPS WITHIN 48 HOURS
                    </span>
                    <button
                      type="submit"
                      className="bg-[#262824] text-[#F5F2EA] px-6 py-2.5 font-ui text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-[#3A3D37] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      REQUEST SWATCH DOSSIER ↗
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(holloway)/holloway/components/holloway/FurnitureControls.tsx">
<![CDATA['use client';

import React from 'react';
import {
  FURNITURE_CATALOG,
  ORDERED_FURNITURE_IDS,
  ROOM_PRESETS,
  type FurnitureCatalogEntry,
  type FurniturePiece,
} from '../../lib/holloway/floorPlan';
import {
  formatColumnNumber,
  formatRowLetter,
  getFootprint,
  type RoomMetrics,
} from '../../lib/holloway/collision';
import type { StudioStatusMessage } from '../../lib/holloway/useRoomStudio';

interface FurnitureControlsProps {
  modules: FurniturePiece[];
  selectedId: string | null;
  selectedPiece: FurniturePiece | null;
  selectedCatalog: FurnitureCatalogEntry | null;
  activePresetId: string;
  metrics: RoomMetrics;
  status: StudioStatusMessage;
  copiedRecently: boolean;
  onSelectModule: (id: string | null) => void;
  onMoveSelected: (dx: number, dy: number) => void;
  onRotateSelected: () => void;
  onApplyPreset: (presetId: string) => void;
  onResetArrangement: () => void;
  onCopyConfiguration: () => void;
}

export default function FurnitureControls({
  modules,
  selectedId,
  selectedPiece,
  selectedCatalog,
  activePresetId,
  metrics,
  status,
  copiedRecently,
  onSelectModule,
  onMoveSelected,
  onRotateSelected,
  onApplyPreset,
  onResetArrangement,
  onCopyConfiguration,
}: FurnitureControlsProps) {
  const activeFootprint = selectedPiece ? getFootprint(selectedPiece) : null;

  return (
    <div className="flex w-full flex-col justify-between border border-[#262824]/25 bg-[#EFECE3] p-5 md:p-6">
      <div>
        {/* Studio Control Header */}
        <div className="flex items-center justify-between border-b border-[#262824]/20 pb-3 font-drafting text-[11px] tracking-[0.14em] text-[#262824] uppercase">
          <span>ARCHITECTURAL PLANNING TABLE</span>
          <span className="text-[#777974]">{metrics.openPercentage}% OPEN FLOOR</span>
        </div>

        {/* 1. Furniture Module Selector Strip */}
        <div className="mt-4">
          <p className="font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase mb-2">
            01 / SELECT MODULE TO ARRANGE
          </p>
          <div
            role="group"
            aria-label="Select furniture piece"
            className="grid grid-cols-1 gap-1.5"
          >
            {ORDERED_FURNITURE_IDS.map((id) => {
              const cat = FURNITURE_CATALOG[id];
              const piece = modules.find((m) => m.id === id);
              const isSelected = selectedId === id;
              const fp = piece ? getFootprint(piece) : { w: 1, h: 1 };

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSelectModule(id)}
                  aria-pressed={isSelected}
                  className={`flex items-center justify-between gap-3 px-3 py-2 border text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#262824] ${
                    isSelected
                      ? 'border-[#262824] bg-[#262824] text-[#F5F2EA]'
                      : 'border-[#262824]/20 bg-[#F5F2EA] text-[#262824] hover:border-[#262824]/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      aria-hidden="true"
                      className="inline-block h-2.5 w-2.5 shrink-0 border border-current/30"
                      style={{ backgroundColor: cat.swatchHex }}
                    />
                    <span className="font-drafting text-[10.5px] opacity-75 shrink-0">
                      {cat.index}
                    </span>
                    <span className="font-ui text-[11.5px] font-medium tracking-[0.1em] uppercase truncate">
                      {cat.shortName}
                    </span>
                  </div>

                  {piece && (
                    <span className="font-drafting text-[10.5px] opacity-80 whitespace-nowrap shrink-0">
                      {formatColumnNumber(piece.x)}
                      {formatRowLetter(piece.y)} · {fp.w}×{fp.h} · {piece.rotation}°
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Selected Module Scale-Model Preview & Telemetry */}
        {selectedPiece && selectedCatalog && activeFootprint ? (
          <div className="mt-4 border border-[#262824]/20 bg-[#F5F2EA] p-3.5">
            <div className="grid grid-cols-12 gap-3.5 items-center">
              <div className="col-span-3 aspect-square overflow-hidden border border-[#262824]/15 bg-[#EAE4D7]">
                <img
                  src={selectedCatalog.imageUrl}
                  alt={selectedCatalog.fullName}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="col-span-9 space-y-1">
                <div className="flex items-center justify-between font-drafting text-[10px] text-[#777974]">
                  <span>{selectedCatalog.code}</span>
                  <span>
                    GRID {formatColumnNumber(selectedPiece.x)}
                    {formatRowLetter(selectedPiece.y)}
                  </span>
                </div>
                <h3 className="font-editorial text-[20px] font-medium leading-tight text-[#262824]">
                  {selectedCatalog.fullName}
                </h3>
                <p className="font-ui text-[11.5px] leading-[1.4] text-[#262824]/75">
                  {selectedCatalog.dimensionsMetric}
                </p>
                <div className="pt-0.5 flex items-center gap-3 font-drafting text-[10px] text-[#262824]">
                  <span>
                    FOOTPRINT: {activeFootprint.w} × {activeFootprint.h}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>AXIS: {selectedPiece.rotation}°</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 border border-[#262824]/20 bg-[#F5F2EA] p-3.5 font-ui text-[12.5px] text-[#777974]">
            Select any module from the list above or on the floor plan to inspect and position it.
          </div>
        )}

        {/* 3. Spatial Placement & Rotation Controls */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase">
              02 / POSITION & ORIENTATION
            </p>
            <span className="font-drafting text-[10px] text-[#777974]">STEP = 1 LOGICAL CELL</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            <button
              type="button"
              onClick={() => onMoveSelected(0, -1)}
              disabled={!selectedPiece}
              aria-label="Move selected furniture up (North)"
              className="py-2 px-2.5 border border-[#262824]/30 bg-[#F5F2EA] font-drafting text-[10.5px] text-[#262824] hover:bg-[#262824] hover:text-[#F5F2EA] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              ↑ NORTH
            </button>
            <button
              type="button"
              onClick={() => onMoveSelected(-1, 0)}
              disabled={!selectedPiece}
              aria-label="Move selected furniture left (West)"
              className="py-2 px-2.5 border border-[#262824]/30 bg-[#F5F2EA] font-drafting text-[10.5px] text-[#262824] hover:bg-[#262824] hover:text-[#F5F2EA] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              ← WEST
            </button>
            <button
              type="button"
              onClick={() => onMoveSelected(0, 1)}
              disabled={!selectedPiece}
              aria-label="Move selected furniture down (South)"
              className="py-2 px-2.5 border border-[#262824]/30 bg-[#F5F2EA] font-drafting text-[10.5px] text-[#262824] hover:bg-[#262824] hover:text-[#F5F2EA] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              ↓ SOUTH
            </button>
            <button
              type="button"
              onClick={() => onMoveSelected(1, 0)}
              disabled={!selectedPiece}
              aria-label="Move selected furniture right (East)"
              className="py-2 px-2.5 border border-[#262824]/30 bg-[#F5F2EA] font-drafting text-[10.5px] text-[#262824] hover:bg-[#262824] hover:text-[#F5F2EA] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              → EAST
            </button>
          </div>

          <div className="mt-1.5 grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={onRotateSelected}
              disabled={!selectedPiece}
              className="py-2 px-2.5 border border-[#262824] bg-[#262824] text-[#F5F2EA] font-ui text-[10.5px] font-medium tracking-[0.12em] uppercase hover:bg-[#3A3D37] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              ROTATE 90°
            </button>
            <button
              type="button"
              onClick={onResetArrangement}
              className="py-2 px-2.5 border border-[#262824]/30 bg-[#F5F2EA] text-[#262824] font-ui text-[10.5px] font-medium tracking-[0.12em] uppercase hover:border-[#262824] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              RESET
            </button>
            <button
              type="button"
              onClick={onCopyConfiguration}
              className="py-2 px-2.5 border border-[#262824]/30 bg-[#F5F2EA] text-[#262824] font-ui text-[10.5px] font-medium tracking-[0.12em] uppercase hover:border-[#262824] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {copiedRecently ? 'COPIED ✓' : 'COPY SPEC'}
            </button>
          </div>
        </div>

        {/* 4. Architectural Room Presets */}
        <div className="mt-4 border-t border-[#262824]/15 pt-4">
          <p className="font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase mb-2">
            03 / SPATIAL STUDIES (PRESET COMPOSITIONS)
          </p>
          <div className="grid grid-cols-1 gap-1.5">
            {ROOM_PRESETS.map((preset) => {
              const isCurrent = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onApplyPreset(preset.id)}
                  className={`w-full text-left px-3 py-2 border transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                    isCurrent
                      ? 'border-[#262824] bg-[#E3DDD0] text-[#262824]'
                      : 'border-[#262824]/15 bg-[#F5F2EA]/70 text-[#262824]/80 hover:border-[#262824]/45'
                  }`}
                >
                  <div className="min-w-0">
                    <span className="font-drafting text-[10px] text-[#777974] mr-2">
                      {preset.index}
                    </span>
                    <span className="font-ui text-[11.5px] font-medium tracking-[0.06em] uppercase">
                      {preset.name}
                    </span>
                  </div>
                  <span className="font-drafting text-[10px] text-[#777974] truncate">
                    {preset.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Live Placement Feedback & Collision Readout */}
      <div
        aria-live="polite"
        className={`mt-4 border-t pt-3 font-drafting text-[10.5px] leading-[1.45] ${
          status.tone === 'rejected'
            ? 'border-[#874C54] text-[#874C54]'
            : status.tone === 'valid'
            ? 'border-[#262824]/30 text-[#262824]'
            : 'border-[#262824]/20 text-[#777974]'
        }`}
      >
        <div className="flex items-center justify-between text-[9.5px] tracking-[0.14em] uppercase mb-1">
          <span>
            {status.tone === 'rejected'
              ? 'PLACEMENT REJECTED — COLLISION RULE'
              : 'STUDIO READOUT'}
          </span>
          <span>
            OCCUPIED: {metrics.occupiedCount}/{metrics.totalCells - metrics.blockedCount} CELLS
          </span>
        </div>
        <p>{status.text}</p>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(holloway)/holloway/components/holloway/HollowayFooter.tsx">
<![CDATA['use client';

import React from 'react';
import { HOLLOWAY_ASSETS } from '../../lib/holloway/floorPlan';

interface HollowayFooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenInquiry: () => void;
}

export default function HollowayFooter({
  onNavigateSection,
  onOpenInquiry,
}: HollowayFooterProps) {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onNavigateSection(sectionId);
  };

  const handleInquiryLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onOpenInquiry();
  };

  return (
    <footer
      aria-label="HOLLOWAY Editorial Brand Footer"
      className="relative w-full bg-[#F3EFE6] text-[#262824] select-none"
    >
      {/* Top Full-Width Architectural Rule with Measured Vertical Ticks (matching footer-reference) */}
      <div className="relative w-full border-t-[1.5px] border-[#262824]">
        <div
          aria-hidden="true"
          className="mx-auto max-w-[1600px] px-6 md:px-14 flex items-center justify-between"
        >
          {[0, 1, 2, 3, 4].map((tick) => (
            <span
              key={`top-tick-${tick}`}
              className="inline-block h-3.5 w-[1.5px] -mt-[7px] bg-[#262824]"
            />
          ))}
        </div>
      </div>

      {/* Main Editorial Footer Body */}
      <div className="mx-auto max-w-[1600px] px-6 py-8 md:px-14 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Brand Plate: Large HOLLOWAY Wordmark + Descriptor */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <a
              href="#top"
              onClick={(e) => handleNav(e, 'top')}
              className="inline-block font-editorial text-[52px] sm:text-[68px] md:text-[80px] lg:text-[86px] font-medium leading-[0.92] tracking-[0.025em] text-[#262824] uppercase focus-visible:outline-2 focus-visible:outline-[#262824]"
            >
              HOLLOWAY
            </a>
            <p className="mt-2.5 md:mt-3 font-ui text-[12px] sm:text-[13.5px] font-normal tracking-[0.14em] text-[#262824] uppercase">
              OBJECTS FOR THE SPACES WE LIVE IN.
            </p>
          </div>

          {/* Right Multi-Column Navigation: 01 / EXPLORE, 02 / INFORMATION, 03 / CONNECT */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 pt-1">
            {/* Column 01 */}
            <div>
              <h2 className="font-ui text-[13px] md:text-[14px] font-medium tracking-[0.08em] text-[#262824] uppercase mb-3.5">
                01 / EXPLORE
              </h2>
              <ul className="space-y-2 font-ui text-[15px] md:text-[16px] text-[#262824]/90">
                <li>
                  <a
                    href="#collection"
                    onClick={(e) => handleNav(e, 'collection')}
                    className="hover:text-[#874C54] hover:underline underline-offset-4 transition-colors"
                  >
                    Collection
                  </a>
                </li>
                <li>
                  <a
                    href="#room-studio"
                    onClick={(e) => handleNav(e, 'room-studio')}
                    className="hover:text-[#874C54] hover:underline underline-offset-4 transition-colors"
                  >
                    Room Studio
                  </a>
                </li>
                <li>
                  <a
                    href="#materials"
                    onClick={(e) => handleNav(e, 'materials')}
                    className="hover:text-[#874C54] hover:underline underline-offset-4 transition-colors"
                  >
                    Materials
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 02 */}
            <div>
              <h2 className="font-ui text-[13px] md:text-[14px] font-medium tracking-[0.08em] text-[#262824] uppercase mb-3.5">
                02 / INFORMATION
              </h2>
              <ul className="space-y-2 font-ui text-[15px] md:text-[16px] text-[#262824]/90">
                <li>
                  <a
                    href="#about"
                    onClick={(e) => handleNav(e, 'about')}
                    className="hover:text-[#874C54] hover:underline underline-offset-4 transition-colors"
                  >
                    Our Approach
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => handleNav(e, 'about')}
                    className="hover:text-[#874C54] hover:underline underline-offset-4 transition-colors"
                  >
                    Craft
                  </a>
                </li>
                <li>
                  <a
                    href="#studio-inquiries"
                    onClick={handleInquiryLink}
                    className="hover:text-[#874C54] hover:underline underline-offset-4 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 03 */}
            <div>
              <h2 className="font-ui text-[13px] md:text-[14px] font-medium tracking-[0.08em] text-[#262824] uppercase mb-3.5">
                03 / CONNECT
              </h2>
              <ul className="space-y-2 font-ui text-[15px] md:text-[16px] text-[#262824]/90">
                <li>
                  <a
                    href="#about"
                    onClick={(e) => handleNav(e, 'about')}
                    className="hover:text-[#874C54] hover:underline underline-offset-4 transition-colors"
                  >
                    Journal
                  </a>
                </li>
                <li>
                  <a
                    href="#materials"
                    onClick={(e) => handleNav(e, 'materials')}
                    className="hover:text-[#874C54] hover:underline underline-offset-4 transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#studio-inquiries"
                    onClick={handleInquiryLink}
                    className="hover:text-[#874C54] hover:underline underline-offset-4 transition-colors"
                  >
                    Inquiries
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Material Swatch Strip separated by Measured Hairline with Ticks */}
      <div className="relative w-full border-t border-[#262824]/45">
        <div
          aria-hidden="true"
          className="pointer-events-none mx-auto max-w-[1600px] px-6 md:px-14 flex items-center justify-between"
        >
          {[0, 1, 2, 3, 4].map((tick) => (
            <span
              key={`bottom-tick-${tick}`}
              className="inline-block h-2 w-[1px] -mt-[4px] bg-[#262824]/65"
            />
          ))}
        </div>

        <div className="mx-auto flex max-w-[1600px] flex-col sm:flex-row items-stretch sm:items-center justify-between pl-6 md:pl-14">
          <div className="flex flex-wrap items-center gap-8 md:gap-14 py-3.5 pr-6 font-ui text-[10.5px] md:text-[11px] font-medium tracking-[0.08em] text-[#262824] uppercase">
            <span>OPENLANDING / 092</span>
            <span>© HOLLOWAY. ALL RIGHTS RESERVED.</span>
          </div>

          {/* 4 Signature Architectural Material Swatch Blocks Flush Bottom-Right (matching footer-reference) */}
          <div
            aria-label="HOLLOWAY Signature Material Palette Swatches"
            className="grid grid-cols-4 h-10 sm:w-[320px] md:w-[380px] shrink-0"
          >
            <div
              title="Charcoal Ink (#262824)"
              className="h-full w-full bg-[#2B2D2B]"
            />
            <div
              title="Natural Oak (#B88C60)"
              className="h-full w-full bg-[#B88C60] bg-cover bg-center"
              style={{ backgroundImage: `url(${HOLLOWAY_ASSETS.woodTexture})` }}
            />
            <div
              title="Powder Blue (#A6BBC7)"
              className="h-full w-full bg-[#B4C5D0]"
            />
            <div
              title="Muted Burgundy (#63313A)"
              className="h-full w-full bg-[#63313A]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
]]>
    </file>
    <file path="src/app/(holloway)/holloway/components/holloway/HollowayHero.tsx">
<![CDATA['use client';

import React from 'react';
import HollowayNav from './HollowayNav';
import {
  FURNITURE_CATALOG,
  HOLLOWAY_ASSETS,
  ORDERED_FURNITURE_IDS,
} from '../../lib/holloway/floorPlan';

interface HollowayHeroProps {
  selectedModuleId: string | null;
  onSelectInstrumentModule: (moduleId: string) => void;
  onExploreRoom: () => void;
  onViewCollection: () => void;
  onResetRoom: () => void;
}

const LEFT_RULER_NUMS = ['5', '10', '15', '20', '25', '30', '75', '50', '25', '0'];
const RIGHT_RULER_NUMS = ['10', '120', '185', '160', '195', '200', '225', '350', '275', '400', '590'];

export default function HollowayHero({
  selectedModuleId,
  onSelectInstrumentModule,
  onExploreRoom,
  onViewCollection,
  onResetRoom,
}: HollowayHeroProps) {
  return (
    <section
      id="top"
      aria-label="HOLLOWAY Modular Living Introduction"
      className="relative min-h-screen w-full overflow-hidden bg-[#E6E0D4] flex flex-col justify-between select-none"
    >
      {/* Full-bleed 16:9 Architectural Room Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={HOLLOWAY_ASSETS.heroScene}
          alt="Sunlit architectural living space featuring HOLLOWAY powder-blue modular sofa, muted burgundy lounge chair, natural oak low table, built-in oak shelving, and Washi paper floor lamp against a warm plaster wall."
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center"
        />
        {/* Subtle atmospheric top/center legibility veil preserving room warmth */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#F5F2EA]/15 via-transparent to-[#262824]/10"
        />
      </div>

      {/* Top Navigation */}
      <HollowayNav />

      {/* Center Editorial Typography Group — positioned slightly above vertical midpoint so furniture & instrument strip breathe */}
      <div className="relative z-20 mx-auto flex w-full max-w-[960px] flex-1 flex-col items-center justify-center px-6 pt-4 pb-24 md:pb-32 text-center">
        <p className="animate-hw-reveal font-ui text-[10.5px] md:text-[12px] font-medium tracking-[0.2em] text-[#262824] uppercase mb-4 md:mb-5">
          A STUDY IN MODULAR LIVING — NO. 092
        </p>

        <h1
          style={{ textWrap: 'balance' }}
          className="animate-hw-reveal font-editorial text-[46px] sm:text-[66px] md:text-[84px] lg:text-[98px] font-medium leading-[0.93] tracking-[0.015em] text-[#262824] uppercase"
        >
          SPACE, MADE
          <br />
          PERSONAL.
        </h1>

        <p className="animate-hw-reveal-delay-1 mt-5 md:mt-6 max-w-[520px] font-editorial text-[19px] sm:text-[23px] md:text-[27px] font-normal leading-[1.32] text-[#262824]">
          Thoughtful pieces. Infinite arrangements.
          <br />
          A room that becomes yours.
        </p>

        {/* Primary & Secondary CTAs */}
        <div className="animate-hw-reveal-delay-2 mt-7 md:mt-9 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={onExploreRoom}
            className="bg-[#262824] text-[#F5F2EA] px-7 py-3.5 font-ui text-[11px] md:text-[11.5px] font-medium tracking-[0.16em] uppercase transition-colors hover:bg-[#3A3D37] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#262824] whitespace-nowrap shrink-0 cursor-pointer"
          >
            EXPLORE THE ROOM <span aria-hidden="true" className="ml-1">↗</span>
          </button>

          <button
            type="button"
            onClick={onViewCollection}
            className="font-ui text-[10.5px] md:text-[11.5px] font-medium tracking-[0.15em] text-[#262824] uppercase border-b border-[#262824]/75 pb-0.5 transition-colors hover:text-[#262824]/70 hover:border-[#262824]/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#262824] whitespace-nowrap shrink-0 cursor-pointer"
          >
            VIEW THE COLLECTION
          </button>
        </div>
      </div>

      {/* Bottom Instrument Strip — Full-Width Room Elements & Architectural Ruler */}
      <div
        role="region"
        aria-label="Room Studio Instrument Strip"
        className="relative z-20 w-full border-t border-[#262824]/25 bg-[#DED6C6]/75 backdrop-blur-[5px]"
      >
        {/* Row 1: 01 / SOFA ... 05 / LAMP */}
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 sm:grid-cols-5 items-center px-6 md:px-12 py-2.5 md:py-3 gap-y-1">
          {ORDERED_FURNITURE_IDS.map((id, idx) => {
            const item = FURNITURE_CATALOG[id];
            const isSelected = selectedModuleId === id;
            const alignmentClass =
              idx === 0
                ? 'justify-self-start'
                : idx === ORDERED_FURNITURE_IDS.length - 1
                ? 'justify-self-start sm:justify-self-end col-span-2 sm:col-span-1'
                : 'justify-self-start sm:justify-self-center';

            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelectInstrumentModule(id)}
                className={`${alignmentClass} group flex items-center gap-2 py-0.5 font-ui text-[11px] md:text-[12px] tracking-[0.12em] uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#262824] ${
                  isSelected
                    ? 'font-semibold text-[#262824]'
                    : 'font-medium text-[#262824]/85 hover:text-[#262824]'
                }`}
              >
                <span className="font-drafting">{item.index}</span>
                <span aria-hidden="true" className="text-[#262824]/50">
                  /
                </span>
                <span className="border-b border-transparent group-hover:border-[#262824]/60">
                  {item.shortName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Hairline Calibration Divider with Crosshair */}
        <div className="relative border-t border-[#262824]/30 px-6 md:px-12 pt-1.5 pb-2.5">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
            {/* Left Measurement Numerals */}
            <div className="hidden lg:flex flex-1 items-center justify-between pr-8 font-drafting text-[9px] text-[#262824]/75">
              <span aria-hidden="true" className="text-[11px] leading-none text-[#262824]">
                +
              </span>
              {LEFT_RULER_NUMS.map((num, i) => (
                <span key={`l-${i}`}>{num}</span>
              ))}
            </div>

            {/* Center Action Note: MOVE / ROTATE / RESET */}
            <div className="mx-auto flex items-center gap-2 font-ui text-[10px] md:text-[10.5px] font-medium tracking-[0.14em] text-[#262824] uppercase whitespace-nowrap shrink-0">
              <button
                type="button"
                onClick={onExploreRoom}
                className="hover:underline cursor-pointer focus-visible:outline-1 focus-visible:outline-[#262824]"
              >
                MOVE
              </button>
              <span aria-hidden="true" className="text-[#262824]/50">
                /
              </span>
              <button
                type="button"
                onClick={onExploreRoom}
                className="hover:underline cursor-pointer focus-visible:outline-1 focus-visible:outline-[#262824]"
              >
                ROTATE
              </button>
              <span aria-hidden="true" className="text-[#262824]/50">
                /
              </span>
              <button
                type="button"
                onClick={onResetRoom}
                className="hover:underline cursor-pointer focus-visible:outline-1 focus-visible:outline-[#262824]"
              >
                RESET
              </button>
            </div>

            {/* Right Measurement Numerals */}
            <div className="hidden lg:flex flex-1 items-center justify-between pl-8 font-drafting text-[9px] text-[#262824]/75">
              {RIGHT_RULER_NUMS.map((num, i) => (
                <span key={`r-${i}`}>{num}</span>
              ))}
            </div>
          </div>

          {/* Fine Bottom Architectural Millimeter Ticks */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[6px] opacity-45"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to right, #262824 0px, #262824 1px, transparent 1px, transparent 8px)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(holloway)/holloway/components/holloway/HollowayNav.tsx">
<![CDATA['use client';

import React, { useState } from 'react';

interface HollowayNavProps {
  onNavigate?: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { label: 'COLLECTION', href: '#collection', id: 'collection' },
  { label: 'ROOM STUDIO', href: '#room-studio', id: 'room-studio' },
  { label: 'MATERIALS', href: '#materials', id: 'materials' },
  { label: 'ABOUT', href: '#about', id: 'about' },
] as const;

export default function HollowayNav({ onNavigate }: HollowayNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const target = document.getElementById(id);
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative z-30 w-full px-6 pt-6 pb-4 md:px-12 md:pt-8">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-editorial text-[28px] md:text-[36px] font-medium tracking-[0.04em] text-[#262824] uppercase whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#262824]"
        >
          HOLLOWAY
        </a>

        {/* Zone 2: Minimal Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-9 lg:gap-12"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.id)}
              className="font-ui text-[11.5px] font-medium tracking-[0.14em] text-[#262824] uppercase whitespace-nowrap shrink-0 pb-1 border-b border-transparent hover:border-[#262824]/60 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#262824]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="holloway-mobile-nav"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="font-ui text-[11px] font-medium tracking-[0.16em] uppercase text-[#262824] px-3 py-2 border border-[#262824]/30 bg-[#F5F2EA]/85 backdrop-blur-sm whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#262824]"
          >
            {mobileMenuOpen ? 'CLOSE' : 'INDEX'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <nav
          id="holloway-mobile-nav"
          aria-label="Mobile Navigation"
          className="md:hidden mt-3 border border-[#262824]/20 bg-[#F5F2EA]/95 backdrop-blur-md px-6 py-5 shadow-sm"
        >
          <ul className="flex flex-col gap-4">
            {NAV_ITEMS.map((item, idx) => (
              <li key={item.id} className="border-b border-[#262824]/10 pb-3 last:border-none last:pb-0">
                <a
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className="flex items-center justify-between font-ui text-[12px] font-medium tracking-[0.15em] text-[#262824] uppercase"
                >
                  <span>{item.label}</span>
                  <span className="font-drafting text-[10px] text-[#777974]">0{idx + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
]]>
    </file>
    <file path="src/app/(holloway)/holloway/components/holloway/HollowayPage.tsx">
<![CDATA['use client';

import React, { useCallback, useState } from 'react';
import HollowayHero from './HollowayHero';
import CollectionOverview from './CollectionOverview';
import RoomStudio from './RoomStudio';
import FeaturedObjects from './FeaturedObjects';
import DesignPhilosophy from './DesignPhilosophy';
import FinalTransition from './FinalTransition';
import HollowayFooter from './HollowayFooter';
import { useRoomStudio } from '../../lib/holloway/useRoomStudio';

export default function HollowayPage() {
  const studio = useRoomStudio();
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSelectAndScrollToStudio = useCallback(
    (moduleId: string) => {
      studio.selectModule(moduleId);
      const studioSection = document.getElementById('room-studio');
      studioSection?.scrollIntoView({ behavior: 'smooth' });
    },
    [studio]
  );

  const handleOpenInquiry = useCallback(() => {
    setInquiryOpen(true);
    setTimeout(() => {
      const el = document.getElementById('studio-inquiries') ?? document.getElementById('transition');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#F5F2EA] text-[#262824]">
      <main>
        {/* SECTION 1 — HERO */}
        <HollowayHero
          selectedModuleId={studio.selectedId}
          onSelectInstrumentModule={handleSelectAndScrollToStudio}
          onExploreRoom={() => scrollToSection('room-studio')}
          onViewCollection={() => scrollToSection('collection')}
          onResetRoom={() => {
            studio.resetArrangement();
            scrollToSection('room-studio');
          }}
        />

        {/* SECTION 2 — COLLECTION OVERVIEW */}
        <CollectionOverview onInspectInStudio={handleSelectAndScrollToStudio} />

        {/* SECTION 3 — ROOM STUDIO */}
        <RoomStudio
          plan={studio.plan}
          modules={studio.modules}
          selectedId={studio.selectedId}
          selectedPiece={studio.selectedPiece}
          selectedCatalog={studio.selectedCatalog}
          activePresetId={studio.activePresetId}
          metrics={studio.metrics}
          status={studio.status}
          copiedRecently={studio.copiedRecently}
          hoveredPreview={studio.hoveredPreview}
          onSelectModule={studio.selectModule}
          onMoveSelected={studio.moveSelected}
          onRotateSelected={studio.rotateSelected}
          onPlaceSelectedAt={studio.placeSelectedAt}
          onHoverCell={studio.setHoveredCell}
          onApplyPreset={studio.applyPreset}
          onResetArrangement={studio.resetArrangement}
          onCopyConfiguration={studio.copyConfiguration}
        />

        {/* SECTION 4 — FEATURED OBJECTS / MATERIALS */}
        <FeaturedObjects onSelectForStudio={handleSelectAndScrollToStudio} />

        {/* SECTION 5 — DESIGN PHILOSOPHY / CRAFT */}
        <DesignPhilosophy />

        {/* SECTION 6 — FINAL CTA / INFORMATION TRANSITION */}
        <FinalTransition
          onDesignSpace={() => scrollToSection('room-studio')}
          onExploreCollection={() => scrollToSection('collection')}
          inquiryOpen={inquiryOpen}
          onToggleInquiry={setInquiryOpen}
        />
      </main>

      {/* SECTION 7 — EDITORIAL FOOTER */}
      <HollowayFooter
        onNavigateSection={scrollToSection}
        onOpenInquiry={handleOpenInquiry}
      />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(holloway)/holloway/components/holloway/RoomCanvas.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import {
  FURNITURE_CATALOG,
  HOLLOWAY_ASSETS,
  type FloorPlanData,
  type FurniturePiece,
} from '../../lib/holloway/floorPlan';
import {
  formatColumnNumber,
  formatRowLetter,
  getFootprint,
} from '../../lib/holloway/collision';

interface RoomCanvasProps {
  plan: FloorPlanData;
  modules: FurniturePiece[];
  selectedId: string | null;
  hoveredPreview: {
    x: number;
    y: number;
    w: number;
    h: number;
    valid: boolean;
  } | null;
  collidingCells?: { x: number; y: number }[];
  onSelectModule: (id: string | null) => void;
  onMoveSelected: (dx: number, dy: number) => void;
  onRotateSelected: () => void;
  onPlaceSelectedAt: (x: number, y: number) => void;
  onHoverCell: (cell: { x: number; y: number } | null) => void;
}

export default function RoomCanvas({
  plan,
  modules,
  selectedId,
  hoveredPreview,
  collidingCells,
  onSelectModule,
  onMoveSelected,
  onRotateSelected,
  onPlaceSelectedAt,
  onHoverCell,
}: RoomCanvasProps) {
  const [showReferenceSvg, setShowReferenceSvg] = useState(false);

  const { columns, rows, cellSize: c, originX: ox, originY: oy } = plan.grid;
  const gridWidth = columns * c;
  const gridHeight = rows * c;

  const handleKeyDown = (event: React.KeyboardEvent<SVGSVGElement | SVGGElement>) => {
    const keyMap: Record<string, [number, number]> = {
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
    };
    if (keyMap[event.key]) {
      event.preventDefault();
      event.stopPropagation();
      onMoveSelected(...keyMap[event.key]);
      return;
    }
    if (event.key.toLowerCase() === 'r') {
      event.preventDefault();
      event.stopPropagation();
      onRotateSelected();
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onSelectModule(null);
    }
  };

  return (
    <div className="relative flex flex-col border border-[#262824]/25 bg-[#F1E8D9]">
      {/* Top Drafting Sheet Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#262824]/20 bg-[#EAE0D0] px-5 py-3">
        <div className="flex items-center gap-3 font-drafting text-[11px] tracking-[0.14em] text-[#262824] uppercase">
          <span className="font-medium">SHEET 12 / INTERACTIVE FLOOR PLAN</span>
          <span aria-hidden="true" className="text-[#262824]/35">
            ·
          </span>
          <span className="text-[#76404B]">
            {columns} × {rows} LOGICAL GRID
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline font-drafting text-[10px] tracking-[0.1em] text-[#777974] uppercase">
            CLICK CELL TO PLACE · ARROWS NUDGE · R ROTATES
          </span>
          <button
            type="button"
            onClick={() => setShowReferenceSvg((prev) => !prev)}
            className="font-drafting text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 border border-[#262824]/30 bg-[#F5F2EA] text-[#262824] hover:bg-[#262824] hover:text-[#F5F2EA] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#262824]"
          >
            {showReferenceSvg ? 'RETURN TO LIVE STUDIO' : 'VIEW STATIC CAD SHEET'}
          </button>
        </div>
      </div>

      {showReferenceSvg ? (
        <div className="p-4 md:p-6 bg-[#F1E8D9]">
          <img
            src={HOLLOWAY_ASSETS.floorPlanSvg}
            alt="HOLLOWAY canonical 12 by 8 floor plan drafting SVG reference"
            className="w-full h-auto border border-[#262824]/20"
          />
        </div>
      ) : (
        <div className="relative p-2 sm:p-4 md:p-6">
          <svg
            viewBox="0 0 768 600"
            width="100%"
            role="group"
            tabIndex={0}
            aria-label="Interactive 12 by 8 architectural room arrangement grid. Select a furniture piece and use arrow keys or click grid cells to position, R to rotate, and Escape to clear selection."
            onKeyDown={handleKeyDown}
            onMouseLeave={() => onHoverCell(null)}
            className="w-full h-auto block select-none focus-visible:outline-2 focus-visible:outline-[#262824]"
          >
            <defs>
              <pattern id="hw-paper-grain" width="9" height="9" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.35" fill="#604431" opacity="0.14" />
              </pattern>
              <pattern id="hw-grid-cells" width={c} height={c} patternUnits="userSpaceOnUse">
                <path
                  d={`M${c} 0H0V${c}`}
                  fill="none"
                  stroke="#9B9082"
                  strokeWidth="0.75"
                />
              </pattern>
              <pattern id="hw-reserved-hatch" width="9" height="9" patternUnits="userSpaceOnUse">
                <path
                  d="M-2 2L2 -2M0 9L9 0M7 11L11 7"
                  stroke="#76404B"
                  strokeOpacity="0.48"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            {/* Drafting Paper Backdrop */}
            <rect width="768" height="600" fill="#F1E8D9" />
            <rect width="768" height="600" fill="url(#hw-paper-grain)" />

            {/* Sheet Header Typography inside SVG matching 12-room-floor-plan.svg */}
            <text
              x="96"
              y="42"
              fontFamily="IBM Plex Mono, ui-monospace, monospace"
              fontSize="13"
              fontWeight="600"
              letterSpacing="2"
              fill="#262824"
            >
              HOLLOWAY / SPACE ARRANGER
            </text>
            <text
              x="96"
              y="64"
              fontFamily="IBM Plex Mono, ui-monospace, monospace"
              fontSize="9.5"
              letterSpacing="1.2"
              fill="#76404B"
            >
              PLAN 12 × 8 • DIAGRAMMATIC / INTERACTIVE STUDIO
            </text>
            <text
              x="672"
              y="64"
              textAnchor="end"
              fontFamily="IBM Plex Mono, ui-monospace, monospace"
              fontSize="9.5"
              letterSpacing="1.2"
              fill="#766A5F"
            >
              {selectedId
                ? `ACTIVE: ${selectedId.toUpperCase()}`
                : 'NO MODULE SELECTED'}
            </text>
            <path d="M96 76H672" stroke="#262824" strokeWidth="1" strokeOpacity="0.45" />

            {/* Floor Grid Surface */}
            <rect x={ox} y={oy} width={gridWidth} height={gridHeight} fill="#F7F1E8" />
            <rect x={ox} y={oy} width={gridWidth} height={gridHeight} fill="url(#hw-grid-cells)" />

            {/* Column Numerals (01 - 12) */}
            {Array.from({ length: columns }).map((_, colIdx) => (
              <text
                key={`col-label-${colIdx}`}
                x={ox + colIdx * c + c / 2}
                y={91}
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="10"
                fill="#766A5F"
              >
                {formatColumnNumber(colIdx)}
              </text>
            ))}

            {/* Row Letters (A - H) */}
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <text
                key={`row-label-${rowIdx}`}
                x={82}
                y={oy + rowIdx * c + c / 2 + 3.5}
                textAnchor="end"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="10"
                fill="#766A5F"
              >
                {formatRowLetter(rowIdx)}
              </text>
            ))}

            {/* Interactive Clickable Grid Cells for Direct Placement */}
            {Array.from({ length: rows }).map((_, rIdx) =>
              Array.from({ length: columns }).map((__, cIdx) => (
                <rect
                  key={`cell-${cIdx}-${rIdx}`}
                  x={ox + cIdx * c}
                  y={oy + rIdx * c}
                  width={c}
                  height={c}
                  fill="transparent"
                  className="cursor-crosshair"
                  onMouseEnter={() => onHoverCell({ x: cIdx, y: rIdx })}
                  onClick={() => onPlaceSelectedAt(cIdx, rIdx)}
                />
              ))
            )}

            {/* Blocked / Reserved Architectural Zones */}
            {plan.blockedCells.map((block, i) => (
              <g key={`blocked-${i}`} pointerEvents="none">
                <rect
                  x={ox + block.x * c + 2}
                  y={oy + block.y * c + 2}
                  width={c - 4}
                  height={c - 4}
                  fill="url(#hw-reserved-hatch)"
                  stroke="#76404B"
                  strokeOpacity="0.55"
                >
                  <title>{block.reason}</title>
                </rect>
              </g>
            ))}

            {/* Collision Flash Highlight if user attempted invalid move */}
            {collidingCells?.map((cell, idx) => (
              <rect
                key={`collide-${idx}`}
                x={ox + cell.x * c + 2}
                y={oy + cell.y * c + 2}
                width={c - 4}
                height={c - 4}
                fill="#874C54"
                fillOpacity="0.28"
                stroke="#874C54"
                strokeWidth="1.5"
                pointerEvents="none"
              />
            ))}

            {/* Hover Placement Preview Outline */}
            {hoveredPreview && selectedId && (
              <rect
                x={ox + hoveredPreview.x * c + 3}
                y={oy + hoveredPreview.y * c + 3}
                width={hoveredPreview.w * c - 6}
                height={hoveredPreview.h * c - 6}
                rx="2"
                fill={hoveredPreview.valid ? '#A6BBC7' : '#874C54'}
                fillOpacity={hoveredPreview.valid ? '0.16' : '0.18'}
                stroke={hoveredPreview.valid ? '#262824' : '#874C54'}
                strokeWidth="1.25"
                strokeDasharray="4 3"
                pointerEvents="none"
              />
            )}

            {/* Architectural Perimeter Walls & Entry Swing Arc */}
            <path
              d={`M${ox} ${oy}H${ox + gridWidth}V${oy + gridHeight}H${ox + 2 * c}M${ox} ${oy}V${oy + (rows - 2) * c}`}
              fill="none"
              stroke="#262824"
              strokeWidth="7.5"
              strokeLinejoin="miter"
              pointerEvents="none"
            />
            <path
              d="M96 388V484H192"
              fill="none"
              stroke="#262824"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              pointerEvents="none"
            />
            <path
              d="M96 484A96 96 0 0 1 192 388"
              fill="none"
              stroke="#76404B"
              strokeWidth="1.2"
              strokeDasharray="4 5"
              pointerEvents="none"
            />
            <text
              x="104"
              y="476"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="8"
              fill="#76404B"
              pointerEvents="none"
            >
              ENTRY CLEARANCE
            </text>
            <text
              x="533"
              y="115"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="8"
              fill="#76404B"
              pointerEvents="none"
            >
              FIXED ZONE
            </text>

            {/* Movable Furniture Modules */}
            {modules.map((item) => {
              const { w, h } = getFootprint(item);
              const isSelected = selectedId === item.id;
              const px = ox + item.x * c;
              const py = oy + item.y * c;
              const pw = w * c;
              const ph = h * c;
              const isDarkFill = item.id === 'chair' || item.id === 'shelf';
              const labelColor = isDarkFill ? '#F5F2EA' : '#262824';
              const catalogItem = FURNITURE_CATALOG[item.id];

              return (
                <g
                  key={item.id}
                  id={`h-module-${item.id}`}
                  data-module-id={item.id}
                  data-x={item.x}
                  data-y={item.y}
                  data-rotation={item.rotation}
                  tabIndex={0}
                  role="button"
                  aria-label={`${item.label}, Grid ${formatColumnNumber(item.x)}${formatRowLetter(item.y)}, column ${item.x + 1}, row ${item.y + 1}, rotated ${item.rotation} degrees${
                    isSelected ? ', currently selected' : ''
                  }`}
                  aria-pressed={isSelected}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectModule(item.id);
                  }}
                  onKeyDown={handleKeyDown}
                  className="cursor-pointer focus:outline-none"
                >
                  <title>{`${item.label} (${formatColumnNumber(item.x)}${formatRowLetter(item.y)}, ${item.rotation}°)`}</title>

                  {/* Module Footprint Block */}
                  <rect
                    x={px + 4}
                    y={py + 4}
                    width={pw - 8}
                    height={ph - 8}
                    rx="3"
                    fill={item.fill}
                    fillOpacity="0.88"
                    stroke="#262824"
                    strokeWidth={isSelected ? '2.2' : '1.5'}
                  />

                  {/* Architectural Orientation Datum Line inside Module */}
                  <path
                    d={`M${px + 10} ${py + 12}H${px + pw - 10}`}
                    stroke={labelColor}
                    strokeOpacity="0.45"
                    strokeWidth="1"
                    pointerEvents="none"
                  />

                  {/* Module Code & Label */}
                  <text
                    x={px + pw / 2}
                    y={py + ph / 2 + (ph > 56 ? -2 : 4)}
                    textAnchor="middle"
                    fontFamily="IBM Plex Mono, ui-monospace, monospace"
                    fontSize="10"
                    fontWeight="600"
                    letterSpacing="0.8"
                    fill={labelColor}
                    pointerEvents="none"
                  >
                    {item.id.toUpperCase()}
                  </text>

                  {ph > 56 && (
                    <text
                      x={px + pw / 2}
                      y={py + ph / 2 + 12}
                      textAnchor="middle"
                      fontFamily="IBM Plex Mono, ui-monospace, monospace"
                      fontSize="8.5"
                      fill={labelColor}
                      opacity="0.8"
                      pointerEvents="none"
                    >
                      {catalogItem?.index ?? ''} · {formatColumnNumber(item.x)}
                      {formatRowLetter(item.y)}
                    </text>
                  )}

                  {/* Active Selection Drafting Frame (matching 12-room-floor-plan.svg) */}
                  {isSelected && (
                    <g pointerEvents="none">
                      <rect
                        x={px - 3}
                        y={py - 3}
                        width={pw + 6}
                        height={ph + 6}
                        rx="1"
                        fill="none"
                        stroke="#874C54"
                        strokeWidth="2"
                        strokeDasharray="6 3"
                      />
                      <circle cx={px - 3} cy={py - 3} r="3.5" fill="#874C54" />
                      <circle cx={px + pw + 3} cy={py + ph + 3} r="3.5" fill="#874C54" />
                      <text
                        x={px}
                        y={Math.max(oy + 12, py - 9)}
                        fill="#76404B"
                        fontFamily="IBM Plex Mono, monospace"
                        fontSize="9.5"
                        fontWeight="600"
                      >
                        SELECTED / {item.id.toUpperCase()} ({item.rotation}°)
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Bottom Drafting Legend inside SVG */}
            <path d="M96 505H672" stroke="#262824" strokeWidth="1" strokeOpacity="0.45" />
            <text
              x="96"
              y="529"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="10"
              fill="#262824"
            >
              01 SELECT ITEM • ARROWS OR CLICK CELL TO MOVE • R ROTATES • ESC DESELECTS
            </text>

            <rect x="96" y="544" width="13" height="13" fill="#B5C8DA" stroke="#262824" />
            <text
              x="115"
              y="555"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="9"
              fill="#262824"
            >
              MOVABLE MODULE
            </text>

            <rect
              x="235"
              y="544"
              width="13"
              height="13"
              fill="url(#hw-reserved-hatch)"
              stroke="#76404B"
            />
            <text
              x="254"
              y="555"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="9"
              fill="#262824"
            >
              NO PLACEMENT (RESERVED)
            </text>

            <path
              d="M425 551H445"
              stroke="#874C54"
              strokeWidth="2"
              strokeDasharray="5 3"
            />
            <text
              x="452"
              y="555"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="9"
              fill="#262824"
            >
              ACTIVE SELECTION
            </text>

            <text
              x="672"
              y="581"
              textAnchor="end"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="9"
              fill="#766A5F"
            >
              HOLLOWAY / DIAGRAM 12
            </text>
          </svg>
        </div>
      )}
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(holloway)/holloway/components/holloway/RoomStudio.tsx">
<![CDATA['use client';

import React from 'react';
import RoomCanvas from './RoomCanvas';
import FurnitureControls from './FurnitureControls';
import {
  FURNITURE_CATALOG,
  type FloorPlanData,
  type FurnitureCatalogEntry,
  type FurniturePiece,
} from '../../lib/holloway/floorPlan';
import {
  formatColumnNumber,
  formatRowLetter,
  getFootprint,
  type RoomMetrics,
} from '../../lib/holloway/collision';
import type { StudioStatusMessage } from '../../lib/holloway/useRoomStudio';

interface RoomStudioProps {
  plan: FloorPlanData;
  modules: FurniturePiece[];
  selectedId: string | null;
  selectedPiece: FurniturePiece | null;
  selectedCatalog: FurnitureCatalogEntry | null;
  activePresetId: string;
  metrics: RoomMetrics;
  status: StudioStatusMessage;
  copiedRecently: boolean;
  hoveredPreview: {
    x: number;
    y: number;
    w: number;
    h: number;
    valid: boolean;
  } | null;
  onSelectModule: (id: string | null) => void;
  onMoveSelected: (dx: number, dy: number) => void;
  onRotateSelected: () => void;
  onPlaceSelectedAt: (x: number, y: number) => void;
  onHoverCell: (cell: { x: number; y: number } | null) => void;
  onApplyPreset: (presetId: string) => void;
  onResetArrangement: () => void;
  onCopyConfiguration: () => void;
}

export default function RoomStudio({
  plan,
  modules,
  selectedId,
  selectedPiece,
  selectedCatalog,
  activePresetId,
  metrics,
  status,
  copiedRecently,
  hoveredPreview,
  onSelectModule,
  onMoveSelected,
  onRotateSelected,
  onPlaceSelectedAt,
  onHoverCell,
  onApplyPreset,
  onResetArrangement,
  onCopyConfiguration,
}: RoomStudioProps) {
  return (
    <section
      id="room-studio"
      aria-labelledby="room-studio-heading"
      className="relative w-full border-b border-[#262824]/15 bg-[#ECE7DC] py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Top Section Datum Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#262824]/20 pb-4 font-drafting text-[11px] tracking-[0.14em] text-[#777974] uppercase">
          <span>02 / INTERACTIVE ROOM DESIGN STUDIO</span>
          <span className="hidden md:inline">
            PLAN 12 × 8 LOGICAL CELLS · COLLISION-VALIDATED GEOMETRY
          </span>
          <span>REF. 12-ROOM-FLOOR-PLAN</span>
        </div>

        {/* Section Header */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="font-ui text-[11px] font-medium tracking-[0.18em] text-[#777974] uppercase">
              SPATIAL ARRANGEMENT WORKSHOP
            </p>
            <h2
              id="room-studio-heading"
              style={{ textWrap: 'balance' }}
              className="mt-3 font-editorial text-[38px] sm:text-[46px] md:text-[56px] font-normal leading-[1.0] tracking-[0.01em] text-[#262824] uppercase"
            >
              COMPOSE THE ROOM AROUND HOW YOU LIVE.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="font-ui text-[15px] leading-[1.65] text-[#262824]/80">
              Test proportion, sightlines, and circulation across a 12 × 8 architectural grid.
              Select any piece to reposition by keyboard arrow keys, directional controls, or direct
              cell placement—while entry clearances and fixed fixtures remain protected.
            </p>
          </div>
        </div>

        {/* Main Studio Workspace: Left Drafting Canvas (7 cols) + Right Planning Controls (5 cols) */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <RoomCanvas
              plan={plan}
              modules={modules}
              selectedId={selectedId}
              hoveredPreview={hoveredPreview}
              collidingCells={status.collidingCells}
              onSelectModule={onSelectModule}
              onMoveSelected={onMoveSelected}
              onRotateSelected={onRotateSelected}
              onPlaceSelectedAt={onPlaceSelectedAt}
              onHoverCell={onHoverCell}
            />

            {/* Live Coordinate Ledger Bar under the Canvas */}
            <div className="mt-4 border border-[#262824]/20 bg-[#F5F2EA] px-5 py-3.5">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#262824]/15 pb-2 font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase">
                <span>LIVE ARCHITECTURAL SCHEDULE</span>
                <span>CLICK ANY ENTRY TO SELECT</span>
              </div>
              <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-5 gap-3">
                {modules.map((m) => {
                  const fp = getFootprint(m);
                  const cat = FURNITURE_CATALOG[m.id];
                  const isActive = selectedId === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => onSelectModule(m.id)}
                      className={`text-left p-2 border transition-colors cursor-pointer ${
                        isActive
                          ? 'border-[#262824] bg-[#EAE3D5]'
                          : 'border-transparent hover:border-[#262824]/25'
                      }`}
                    >
                      <div className="flex items-center justify-between font-drafting text-[10px] text-[#777974]">
                        <span>{cat?.index ?? '00'}</span>
                        <span>
                          {formatColumnNumber(m.x)}
                          {formatRowLetter(m.y)}
                        </span>
                      </div>
                      <p className="mt-0.5 font-ui text-[11.5px] font-semibold tracking-[0.08em] text-[#262824] uppercase truncate">
                        {cat?.shortName ?? m.id}
                      </p>
                      <p className="font-drafting text-[10px] text-[#262824]/75">
                        {fp.w}×{fp.h} · {m.rotation}°
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex">
            <FurnitureControls
              modules={modules}
              selectedId={selectedId}
              selectedPiece={selectedPiece}
              selectedCatalog={selectedCatalog}
              activePresetId={activePresetId}
              metrics={metrics}
              status={status}
              copiedRecently={copiedRecently}
              onSelectModule={onSelectModule}
              onMoveSelected={onMoveSelected}
              onRotateSelected={onRotateSelected}
              onApplyPreset={onApplyPreset}
              onResetArrangement={onResetArrangement}
              onCopyConfiguration={onCopyConfiguration}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(holloway)/holloway/lib/holloway/collision.ts">
<![CDATA[import type { BlockedCell, FloorPlanData, FurniturePiece } from './floorPlan';

export interface Footprint {
  w: number;
  h: number;
}

export type PlacementRejectionReason =
  | 'out-of-bounds'
  | 'blocked-cell'
  | 'module-overlap';

export interface PlacementValidationResult {
  valid: boolean;
  reason?: PlacementRejectionReason;
  detail?: string;
  collidingCells?: { x: number; y: number }[];
  collidingModuleId?: string;
}

export interface RoomMetrics {
  totalCells: number;
  blockedCount: number;
  occupiedCount: number;
  openCount: number;
  openPercentage: number;
}

/**
 * Computes axis-aligned cell footprint after rotation (0/180 vs 90/270).
 */
export function getFootprint(piece: Pick<FurniturePiece, 'widthCells' | 'heightCells' | 'rotation'>): Footprint {
  const normalizedRotation = ((piece.rotation % 360) + 360) % 360;
  return normalizedRotation % 180 === 0
    ? { w: piece.widthCells, h: piece.heightCells }
    : { w: piece.heightCells, h: piece.widthCells };
}

/**
 * Returns all grid cells covered by a furniture piece.
 */
export function getOccupiedCells(piece: FurniturePiece): { x: number; y: number }[] {
  const { w, h } = getFootprint(piece);
  const cells: { x: number; y: number }[] = [];
  for (let y = piece.y; y < piece.y + h; y++) {
    for (let x = piece.x; x < piece.x + w; x++) {
      cells.push({ x, y });
    }
  }
  return cells;
}

/**
 * Checks whether two furniture pieces overlap in grid space.
 */
export function doPiecesOverlap(a: FurniturePiece, b: FurniturePiece): boolean {
  const A = getFootprint(a);
  const B = getFootprint(b);
  return (
    a.x < b.x + B.w &&
    a.x + A.w > b.x &&
    a.y < b.y + B.h &&
    a.y + A.h > b.y
  );
}

/**
 * Checks whether a single cell is reserved/blocked in the floor plan.
 */
export function getBlockedCellAt(
  x: number,
  y: number,
  blockedCells: BlockedCell[]
): BlockedCell | undefined {
  return blockedCells.find((cell) => cell.x === x && cell.y === y);
}

/**
 * Validates whether a candidate piece placement is legal within the floor plan.
 */
export function validatePlacement(
  candidate: FurniturePiece,
  allModules: FurniturePiece[],
  plan: Pick<FloorPlanData, 'grid' | 'blockedCells'>
): PlacementValidationResult {
  const { w, h } = getFootprint(candidate);
  const { columns, rows } = plan.grid;

  // 1. Check grid bounds
  if (
    candidate.x < 0 ||
    candidate.y < 0 ||
    candidate.x + w > columns ||
    candidate.y + h > rows
  ) {
    return {
      valid: false,
      reason: 'out-of-bounds',
      detail: `Placement exceeds perimeter wall bounds (${columns} × ${rows} grid).`,
    };
  }

  // 2. Check blocked architectural zones
  const collidingBlocked: { x: number; y: number }[] = [];
  let blockedReason = '';
  for (let y = candidate.y; y < candidate.y + h; y++) {
    for (let x = candidate.x; x < candidate.x + w; x++) {
      const blocked = getBlockedCellAt(x, y, plan.blockedCells);
      if (blocked) {
        collidingBlocked.push({ x, y });
        if (!blockedReason) blockedReason = blocked.reason;
      }
    }
  }

  if (collidingBlocked.length > 0) {
    return {
      valid: false,
      reason: 'blocked-cell',
      detail: `Placement intersects reserved architectural zone (${blockedReason}).`,
      collidingCells: collidingBlocked,
    };
  }

  // 3. Check overlap with other furniture modules
  for (const other of allModules) {
    if (other.id === candidate.id) continue;
    if (doPiecesOverlap(candidate, other)) {
      const otherCells = getOccupiedCells(other);
      const candidateCells = getOccupiedCells(candidate);
      const overlapCells = candidateCells.filter((c) =>
        otherCells.some((o) => o.x === c.x && o.y === c.y)
      );
      return {
        valid: false,
        reason: 'module-overlap',
        detail: `Placement collides with ${other.label.toLowerCase()}.`,
        collidingCells: overlapCells,
        collidingModuleId: other.id,
      };
    }
  }

  return { valid: true };
}

/**
 * Boolean convenience wrapper matching the canonical floor plan specification.
 */
export function isLegalPlacement(
  candidate: FurniturePiece,
  allModules: FurniturePiece[],
  plan: Pick<FloorPlanData, 'grid' | 'blockedCells'>
): boolean {
  return validatePlacement(candidate, allModules, plan).valid;
}

/**
 * Attempts to rotate a piece by 90 degrees clockwise. If rotating in place hits
 * a boundary or obstacle, attempts a 1-cell architectural wall kick so rotation
 * near room edges feels responsive while strictly honoring collision rules.
 */
export function rotatePieceWithKick(
  piece: FurniturePiece,
  allModules: FurniturePiece[],
  plan: Pick<FloorPlanData, 'grid' | 'blockedCells'>
): { result: PlacementValidationResult; piece: FurniturePiece } {
  const nextRotation = (piece.rotation + 90) % 360;
  const directCandidate: FurniturePiece = { ...piece, rotation: nextRotation };
  const directValidation = validatePlacement(directCandidate, allModules, plan);
  if (directValidation.valid) {
    return { result: directValidation, piece: directCandidate };
  }

  // Try subtle 1-cell kick offsets for edge rotation
  const kickOffsets: [number, number][] = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
    [-2, 0],
    [0, -2],
  ];
  for (const [dx, dy] of kickOffsets) {
    const kicked: FurniturePiece = {
      ...piece,
      x: piece.x + dx,
      y: piece.y + dy,
      rotation: nextRotation,
    };
    const kickValidation = validatePlacement(kicked, allModules, plan);
    if (kickValidation.valid) {
      return { result: kickValidation, piece: kicked };
    }
  }

  return { result: directValidation, piece };
}

/**
 * Formats row index (0-based) as architectural row letter (A-H).
 */
export function formatRowLetter(rowIndex: number): string {
  return String.fromCharCode(65 + Math.max(0, rowIndex));
}

/**
 * Formats column index (0-based) as 2-digit architectural grid numeral (01-12).
 */
export function formatColumnNumber(colIndex: number): string {
  return String(colIndex + 1).padStart(2, '0');
}

/**
 * Formats a coordinate pair as architectural grid reference (e.g., "04 / C").
 */
export function formatGridCoordinate(x: number, y: number): string {
  return `${formatColumnNumber(x)} · ${formatRowLetter(y)}`;
}

/**
 * Computes spatial occupancy metrics for the room studio readout.
 */
export function calculateRoomMetrics(
  modules: FurniturePiece[],
  plan: Pick<FloorPlanData, 'grid' | 'blockedCells'>
): RoomMetrics {
  const totalCells = plan.grid.columns * plan.grid.rows;
  const blockedCount = plan.blockedCells.length;
  const occupiedCount = modules.reduce((sum, piece) => {
    const { w, h } = getFootprint(piece);
    return sum + w * h;
  }, 0);
  const usableCells = Math.max(1, totalCells - blockedCount);
  const openCount = Math.max(0, usableCells - occupiedCount);
  const openPercentage = Math.round((openCount / usableCells) * 100);

  return {
    totalCells,
    blockedCount,
    occupiedCount,
    openCount,
    openPercentage,
  };
}

/**
 * Formats a copyable architectural schedule for the current arrangement.
 */
export function formatConfigurationSummary(
  modules: FurniturePiece[],
  plan: Pick<FloorPlanData, 'grid' | 'blockedCells'>
): string {
  const metrics = calculateRoomMetrics(modules, plan);
  const lines = modules.map((m) => {
    const { w, h } = getFootprint(m);
    return `${m.id.toUpperCase().padEnd(6, ' ')} | ${m.label.padEnd(14, ' ')} | Grid ${formatColumnNumber(m.x)}${formatRowLetter(m.y)} (Col ${m.x + 1}, Row ${m.y + 1}) | Footprint ${w}×${h} | Rot ${m.rotation}°`;
  });
  return [
    'HOLLOWAY — ARCHITECTURAL ROOM SCHEDULE (NO. 092)',
    `GRID: ${plan.grid.columns} × ${plan.grid.rows} LOGICAL CELLS · OPEN CIRCULATION: ${metrics.openPercentage}%`,
    '------------------------------------------------------------------------',
    ...lines,
  ].join('\n');
}
]]>
    </file>
    <file path="src/app/(holloway)/holloway/lib/holloway/floorPlan.ts">
<![CDATA[export interface GridConfig {
  columns: number;
  rows: number;
  cellSize: number;
  originX: number;
  originY: number;
}

export interface BlockedCell {
  x: number;
  y: number;
  reason: string;
}

export interface FurniturePiece {
  id: string;
  label: string;
  widthCells: number;
  heightCells: number;
  x: number;
  y: number;
  rotation: number;
  fill: string;
}

export interface FloorPlanData {
  schemaVersion?: number;
  name?: string;
  notes?: string;
  grid: GridConfig;
  blockedCells: BlockedCell[];
  modules: FurniturePiece[];
}

export interface FurnitureCatalogEntry {
  id: string;
  index: string;
  code: string;
  shortName: string;
  fullName: string;
  category: string;
  materialSummary: string;
  dimensionsMetric: string;
  gridFootprintLabel: string;
  architecturalNote: string;
  imageUrl: string;
  swatchHex: string;
  textColorHex: string;
}

/**
 * Centralized asset & metadata registry for HOLLOWAY No. 092.
 * Note: Preserves existing files in /templates/holloway/holloway/ while mapping each furniture ID
 * to its matching visual photograph (03-chair-alpha.webp is the walnut table;
 * 04-table-alpha.webp is the muted burgundy lounge chair).
 */
export const HOLLOWAY_ASSETS = {
  heroScene: '/templates/holloway/holloway/00-hero-room-scene.jpg',
  heroReference: '/templates/holloway/holloway/hero-reference.webp',
  footerReference: '/templates/holloway/holloway/footer-reference.webp',
  collectionScene: '/templates/holloway/holloway/13-collection-room-scene.jpg',
  emptyRoomModel: '/templates/holloway/holloway/01-empty-room-base.webp',
  sofaAlpha: '/templates/holloway/holloway/02-sofa-alpha.webp',
  tableAlpha: '/templates/holloway/holloway/03-chair-alpha.webp',
  chairAlpha: '/templates/holloway/holloway/04-table-alpha.webp',
  shelfAlpha: '/templates/holloway/holloway/05-shelf-alpha.webp',
  lampAlpha: '/templates/holloway/holloway/06-lamp-alpha.webp',
  woodTexture: '/templates/holloway/holloway/07-wood-texture.webp',
  plasterTexture: '/templates/holloway/holloway/08-fabric-texture.webp',
  fabricTexture: '/templates/holloway/holloway/09-stone-texture.webp',
  lifestyleRoom: '/templates/holloway/holloway/10-lifestyle-room.webp',
  assemblyDetail: '/templates/holloway/holloway/11-assembly-detail.webp',
  floorPlanSvg: '/templates/holloway/holloway/12-room-floor-plan.svg',
  floorPlanJson: '/templates/holloway/holloway/12-room-floor-plan.data.json',
} as const;

export const FURNITURE_CATALOG: Record<string, FurnitureCatalogEntry> = {
  sofa: {
    id: 'sofa',
    index: '01',
    code: 'HW-092-S1',
    shortName: 'SOFA',
    fullName: 'Atelier 01 Modular Sofa',
    category: 'Primary Seating System',
    materialSummary: 'Powder-blue architectural wool bouclé over kiln-dried European oak plinth',
    dimensionsMetric: '2400 × 1520 × 740 mm',
    gridFootprintLabel: '3 × 2 Cells',
    architecturalNote:
      'Low-profile horizontal datum designed to anchor open floor plans without obstructing sightlines across the room.',
    imageUrl: HOLLOWAY_ASSETS.sofaAlpha,
    swatchHex: '#A6BBC7',
    textColorHex: '#262824',
  },
  chair: {
    id: 'chair',
    index: '02',
    code: 'HW-092-C2',
    shortName: 'CHAIR',
    fullName: 'Vesper Lounge Chair',
    category: 'Occasional Seating',
    materialSummary: 'Muted burgundy felted wool shell with turned walnut underframe',
    dimensionsMetric: '820 × 840 × 730 mm',
    gridFootprintLabel: '2 × 2 Cells',
    architecturalNote:
      'Cantilevered wrap-around bolster offering acoustic intimacy and an oblique conversational axis.',
    imageUrl: HOLLOWAY_ASSETS.chairAlpha,
    swatchHex: '#874C54',
    textColorHex: '#F5F2EA',
  },
  table: {
    id: 'table',
    index: '03',
    code: 'HW-092-T3',
    shortName: 'TABLE',
    fullName: 'Plinth Low Table',
    category: 'Horizontal Surface',
    materialSummary: 'Oiled American walnut & quartersawn oak with bridle-jointed lower shelf',
    dimensionsMetric: '780 × 540 × 410 mm',
    gridFootprintLabel: '1 × 1 Cell',
    architecturalNote:
      'Conceived as an architectural datum plane—proportioned for monographs, ceramic vessels, and daily reach.',
    imageUrl: HOLLOWAY_ASSETS.tableAlpha,
    swatchHex: '#B88C60',
    textColorHex: '#262824',
  },
  shelf: {
    id: 'shelf',
    index: '04',
    code: 'HW-092-SH4',
    shortName: 'SHELF',
    fullName: 'Cadence Open Shelving',
    category: 'Vertical Architecture',
    materialSummary: 'Powder-coated mineral steel uprights with recessed timber inlay channels',
    dimensionsMetric: '1800 × 420 × 1140 mm',
    gridFootprintLabel: '1 × 3 Cells',
    architecturalNote:
      'Acts as either a wall-bound library or a porous spatial partition that filters natural light through the room.',
    imageUrl: HOLLOWAY_ASSETS.shelfAlpha,
    swatchHex: '#343536',
    textColorHex: '#F5F2EA',
  },
  lamp: {
    id: 'lamp',
    index: '05',
    code: 'HW-092-L5',
    shortName: 'LAMP',
    fullName: 'Column Floor Lamp',
    category: 'Atmospheric Illumination',
    materialSummary: 'Hand-laid warm Washi parchment diffuser on oxblood-lacquered steel stem',
    dimensionsMetric: 'Ø 340 × 1480 mm',
    gridFootprintLabel: '1 × 1 Cell',
    architecturalNote:
      'Vertical punctuation mark that casts a 2700K architectural wash across lime plaster walls at dusk.',
    imageUrl: HOLLOWAY_ASSETS.lampAlpha,
    swatchHex: '#C89D66',
    textColorHex: '#262824',
  },
};

export const ORDERED_FURNITURE_IDS = ['sofa', 'chair', 'table', 'shelf', 'lamp'] as const;

export const DEFAULT_FLOOR_PLAN: FloorPlanData = {
  schemaVersion: 1,
  name: 'HOLLOWAY example room',
  notes: 'Illustrative 12 × 8 logical-cell room; cell values are not real-world measurements.',
  grid: {
    columns: 12,
    rows: 8,
    cellSize: 48,
    originX: 96,
    originY: 100,
  },
  blockedCells: [
    { x: 9, y: 0, reason: 'fixed service fixture' },
    { x: 10, y: 0, reason: 'fixed service fixture' },
    { x: 0, y: 6, reason: 'entry clearance' },
    { x: 1, y: 6, reason: 'entry clearance' },
    { x: 0, y: 7, reason: 'entry clearance' },
    { x: 1, y: 7, reason: 'entry clearance' },
  ],
  modules: [
    {
      id: 'sofa',
      label: 'Modular sofa',
      widthCells: 3,
      heightCells: 2,
      x: 3,
      y: 2,
      rotation: 0,
      fill: '#B5C8DA',
    },
    {
      id: 'chair',
      label: 'Lounge chair',
      widthCells: 2,
      heightCells: 2,
      x: 8,
      y: 4,
      rotation: 0,
      fill: '#76404B',
    },
    {
      id: 'table',
      label: 'Side table',
      widthCells: 1,
      heightCells: 1,
      x: 7,
      y: 2,
      rotation: 0,
      fill: '#604431',
    },
    {
      id: 'shelf',
      label: 'Shelf',
      widthCells: 1,
      heightCells: 3,
      x: 11,
      y: 1,
      rotation: 0,
      fill: '#343536',
    },
    {
      id: 'lamp',
      label: 'Floor lamp',
      widthCells: 1,
      heightCells: 1,
      x: 2,
      y: 1,
      rotation: 0,
      fill: '#C89D66',
    },
  ],
};

export interface RoomPreset {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  description: string;
  modules: FurniturePiece[];
}

export const ROOM_PRESETS: RoomPreset[] = [
  {
    id: 'canonical',
    index: '01',
    name: 'Canonical Salon',
    subtitle: 'Open Conversation & North Light',
    description:
      'The signature HOLLOWAY arrangement: sofa anchored centrally with oblique lounge chair and perimeter vertical storage.',
    modules: DEFAULT_FLOOR_PLAN.modules,
  },
  {
    id: 'reading-sanctuary',
    index: '02',
    name: 'Reading Sanctuary',
    subtitle: 'Zoned Library & Quiet Corner',
    description:
      'Rotates the shelving to divide the studio while clustering the lounge chair, lamp, and low table into an intimate study alcove.',
    modules: [
      {
        id: 'sofa',
        label: 'Modular sofa',
        widthCells: 3,
        heightCells: 2,
        x: 2,
        y: 3,
        rotation: 0,
        fill: '#B5C8DA',
      },
      {
        id: 'chair',
        label: 'Lounge chair',
        widthCells: 2,
        heightCells: 2,
        x: 8,
        y: 2,
        rotation: 90,
        fill: '#76404B',
      },
      {
        id: 'table',
        label: 'Side table',
        widthCells: 1,
        heightCells: 1,
        x: 7,
        y: 3,
        rotation: 0,
        fill: '#604431',
      },
      {
        id: 'shelf',
        label: 'Shelf',
        widthCells: 1,
        heightCells: 3,
        x: 6,
        y: 0,
        rotation: 90,
        fill: '#343536',
      },
      {
        id: 'lamp',
        label: 'Floor lamp',
        widthCells: 1,
        heightCells: 1,
        x: 10,
        y: 2,
        rotation: 0,
        fill: '#C89D66',
      },
    ],
  },
  {
    id: 'architect-atelier',
    index: '03',
    name: 'Architect’s Atelier',
    subtitle: 'Perimeter Flow & Open Center',
    description:
      'Clears the central floor datum for circulation and spatial openness, aligning seating along the architectural axes.',
    modules: [
      {
        id: 'sofa',
        label: 'Modular sofa',
        widthCells: 3,
        heightCells: 2,
        x: 1,
        y: 1,
        rotation: 90,
        fill: '#B5C8DA',
      },
      {
        id: 'chair',
        label: 'Lounge chair',
        widthCells: 2,
        heightCells: 2,
        x: 5,
        y: 5,
        rotation: 180,
        fill: '#76404B',
      },
      {
        id: 'table',
        label: 'Side table',
        widthCells: 1,
        heightCells: 1,
        x: 4,
        y: 2,
        rotation: 0,
        fill: '#604431',
      },
      {
        id: 'shelf',
        label: 'Shelf',
        widthCells: 1,
        heightCells: 3,
        x: 11,
        y: 3,
        rotation: 0,
        fill: '#343536',
      },
      {
        id: 'lamp',
        label: 'Floor lamp',
        widthCells: 1,
        heightCells: 1,
        x: 1,
        y: 4,
        rotation: 0,
        fill: '#C89D66',
      },
    ],
  },
];

/**
 * Normalizes loaded JSON floor plan data and ensures all 5 core HOLLOWAY modules
 * (sofa, chair, table, shelf, lamp) are present without colliding.
 */
export function normalizeFloorPlanData(raw: Partial<FloorPlanData> | null | undefined): FloorPlanData {
  if (!raw || !raw.grid || !Array.isArray(raw.modules)) {
    return structuredClone(DEFAULT_FLOOR_PLAN);
  }

  const modules: FurniturePiece[] = raw.modules.map((m) => ({
    id: String(m.id),
    label: String(m.label),
    widthCells: Number(m.widthCells) || 1,
    heightCells: Number(m.heightCells) || 1,
    x: Number(m.x) || 0,
    y: Number(m.y) || 0,
    rotation: Number(m.rotation) || 0,
    fill: String(m.fill || '#B5C8DA'),
  }));

  // Ensure the 05 / LAMP piece is available in the interactive studio alongside the 4 JSON modules
  if (!modules.some((m) => m.id === 'lamp')) {
    modules.push({
      id: 'lamp',
      label: 'Floor lamp',
      widthCells: 1,
      heightCells: 1,
      x: 2,
      y: 1,
      rotation: 0,
      fill: '#C89D66',
    });
  }

  return {
    schemaVersion: raw.schemaVersion ?? 1,
    name: raw.name ?? DEFAULT_FLOOR_PLAN.name,
    notes: raw.notes ?? DEFAULT_FLOOR_PLAN.notes,
    grid: {
      columns: Number(raw.grid.columns) || 12,
      rows: Number(raw.grid.rows) || 8,
      cellSize: Number(raw.grid.cellSize) || 48,
      originX: Number(raw.grid.originX) || 96,
      originY: Number(raw.grid.originY) || 100,
    },
    blockedCells: Array.isArray(raw.blockedCells)
      ? raw.blockedCells.map((b) => ({
          x: Number(b.x),
          y: Number(b.y),
          reason: String(b.reason || 'reserved zone'),
        }))
      : DEFAULT_FLOOR_PLAN.blockedCells,
    modules,
  };
}
]]>
    </file>
    <file path="src/app/(holloway)/holloway/lib/holloway/useRoomStudio.ts">
<![CDATA[import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_FLOOR_PLAN,
  FURNITURE_CATALOG,
  HOLLOWAY_ASSETS,
  ROOM_PRESETS,
  normalizeFloorPlanData,
  type FloorPlanData,
  type FurniturePiece,
} from './floorPlan';
import {
  calculateRoomMetrics,
  formatColumnNumber,
  formatConfigurationSummary,
  formatRowLetter,
  getFootprint,
  rotatePieceWithKick,
  validatePlacement,
} from './collision';

export interface StudioStatusMessage {
  text: string;
  tone: 'neutral' | 'valid' | 'rejected';
  collidingCells?: { x: number; y: number }[];
}

export function useRoomStudio() {
  const [plan, setPlan] = useState<FloorPlanData>(DEFAULT_FLOOR_PLAN);
  const [modules, setModules] = useState<FurniturePiece[]>(DEFAULT_FLOOR_PLAN.modules);
  const [selectedId, setSelectedId] = useState<string | null>('sofa');
  const [activePresetId, setActivePresetId] = useState<string>('canonical');
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(null);
  const [copiedRecently, setCopiedRecently] = useState(false);
  const [status, setStatus] = useState<StudioStatusMessage>({
    text: 'Select a module on the drafting plan. Use arrow keys or studio controls to position, R to rotate.',
    tone: 'neutral',
  });

  // Load canonical floor plan data from /templates/holloway/holloway/12-room-floor-plan.data.json
  useEffect(() => {
    let active = true;
    fetch(HOLLOWAY_ASSETS.floorPlanJson)
      .then((res) => {
        if (!res.ok) throw new Error('Floor plan JSON unavailable');
        return res.json();
      })
      .then((raw: Partial<FloorPlanData>) => {
        if (!active) return;
        const normalized = normalizeFloorPlanData(raw);
        setPlan(normalized);
        setModules(normalized.modules);
      })
      .catch(() => {
        if (!active) return;
        setStatus({
          text: 'Loaded canonical 12 × 8 architectural floor plan specification.',
          tone: 'neutral',
        });
      });

    return () => {
      active = false;
    };
  }, []);

  const selectedPiece = useMemo(
    () => modules.find((m) => m.id === selectedId) ?? null,
    [modules, selectedId]
  );

  const selectedCatalog = useMemo(
    () => (selectedId ? FURNITURE_CATALOG[selectedId] ?? null : null),
    [selectedId]
  );

  const metrics = useMemo(() => calculateRoomMetrics(modules, plan), [modules, plan]);

  const selectModule = useCallback(
    (id: string | null) => {
      setSelectedId(id);
      if (!id) {
        setStatus({ text: 'Selection cleared. Choose a module to resume editing.', tone: 'neutral' });
        return;
      }
      const found = modules.find((m) => m.id === id);
      const cat = FURNITURE_CATALOG[id];
      if (found) {
        const { w, h } = getFootprint(found);
        setStatus({
          text: `${cat?.fullName ?? found.label} active at Grid ${formatColumnNumber(found.x)}${formatRowLetter(found.y)} (${w} × ${h} cells, ${found.rotation}°).`,
          tone: 'neutral',
        });
      }
    },
    [modules]
  );

  const moveSelected = useCallback(
    (dx: number, dy: number) => {
      if (!selectedId) return false;
      const current = modules.find((m) => m.id === selectedId);
      if (!current) return false;

      const candidate: FurniturePiece = {
        ...current,
        x: current.x + dx,
        y: current.y + dy,
      };

      const validation = validatePlacement(candidate, modules, plan);
      if (!validation.valid) {
        setStatus({
          text: validation.detail || 'Placement blocked by room geometry.',
          tone: 'rejected',
          collidingCells: validation.collidingCells,
        });
        return false;
      }

      setModules((prev) => prev.map((m) => (m.id === selectedId ? candidate : m)));
      setActivePresetId('custom');
      setStatus({
        text: `${current.label} positioned at Column ${formatColumnNumber(candidate.x)}, Row ${formatRowLetter(candidate.y)} (${candidate.rotation}°).`,
        tone: 'valid',
      });
      return true;
    },
    [modules, plan, selectedId]
  );

  const placeSelectedAt = useCallback(
    (targetX: number, targetY: number) => {
      if (!selectedId) return false;
      const current = modules.find((m) => m.id === selectedId);
      if (!current) return false;

      const candidate: FurniturePiece = {
        ...current,
        x: targetX,
        y: targetY,
      };

      const validation = validatePlacement(candidate, modules, plan);
      if (!validation.valid) {
        setStatus({
          text: validation.detail || 'Selected cell cannot accommodate this module footprint.',
          tone: 'rejected',
          collidingCells: validation.collidingCells,
        });
        return false;
      }

      setModules((prev) => prev.map((m) => (m.id === selectedId ? candidate : m)));
      setActivePresetId('custom');
      setStatus({
        text: `${current.label} placed at Grid ${formatColumnNumber(candidate.x)}${formatRowLetter(candidate.y)} (${candidate.rotation}°).`,
        tone: 'valid',
      });
      return true;
    },
    [modules, plan, selectedId]
  );

  const rotateSelected = useCallback(() => {
    if (!selectedId) return false;
    const current = modules.find((m) => m.id === selectedId);
    if (!current) return false;

    const { result, piece } = rotatePieceWithKick(current, modules, plan);
    if (!result.valid) {
      setStatus({
        text: result.detail || 'Rotation blocked by adjacent boundary or module.',
        tone: 'rejected',
        collidingCells: result.collidingCells,
      });
      return false;
    }

    setModules((prev) => prev.map((m) => (m.id === selectedId ? piece : m)));
    setActivePresetId('custom');
    const { w, h } = getFootprint(piece);
    setStatus({
      text: `${current.label} rotated to ${piece.rotation}° (${w} × ${h} cells at Grid ${formatColumnNumber(piece.x)}${formatRowLetter(piece.y)}).`,
      tone: 'valid',
    });
    return true;
  }, [modules, plan, selectedId]);

  const applyPreset = useCallback(
    (presetId: string) => {
      const preset = ROOM_PRESETS.find((p) => p.id === presetId);
      if (!preset) return;
      setModules(structuredClone(preset.modules));
      setActivePresetId(preset.id);
      if (!selectedId) setSelectedId('sofa');
      setStatus({
        text: `Applied architectural preset: ${preset.index} / ${preset.name} (${preset.subtitle}).`,
        tone: 'valid',
      });
    },
    [selectedId]
  );

  const resetArrangement = useCallback(() => {
    setModules(structuredClone(plan.modules));
    setSelectedId('sofa');
    setActivePresetId('canonical');
    setStatus({
      text: 'Room arrangement restored to canonical 12 × 8 studio baseline.',
      tone: 'neutral',
    });
  }, [plan.modules]);

  const copyConfiguration = useCallback(async () => {
    const summary = formatConfigurationSummary(modules, plan);
    try {
      await navigator.clipboard?.writeText(summary);
      setCopiedRecently(true);
      setStatus({
        text: 'Architectural room schedule copied to clipboard.',
        tone: 'valid',
      });
      setTimeout(() => setCopiedRecently(false), 2600);
    } catch {
      setCopiedRecently(true);
      setStatus({
        text: 'Schedule generated and ready for specification review.',
        tone: 'valid',
      });
      setTimeout(() => setCopiedRecently(false), 2600);
    }
    return summary;
  }, [modules, plan]);

  // Preview validity when hovering over a cell on the grid
  const hoveredPreview = useMemo(() => {
    if (!hoveredCell || !selectedPiece) return null;
    const candidate: FurniturePiece = {
      ...selectedPiece,
      x: hoveredCell.x,
      y: hoveredCell.y,
    };
    const validation = validatePlacement(candidate, modules, plan);
    const { w, h } = getFootprint(candidate);
    return {
      x: hoveredCell.x,
      y: hoveredCell.y,
      w,
      h,
      valid: validation.valid,
    };
  }, [hoveredCell, modules, plan, selectedPiece]);

  return {
    plan,
    modules,
    selectedId,
    selectedPiece,
    selectedCatalog,
    activePresetId,
    metrics,
    status,
    copiedRecently,
    hoveredCell,
    hoveredPreview,
    setHoveredCell,
    selectModule,
    moveSelected,
    placeSelectedAt,
    rotateSelected,
    applyPreset,
    resetArrangement,
    copyConfiguration,
  };
}
]]>
    </file>
  </files>
</template>
