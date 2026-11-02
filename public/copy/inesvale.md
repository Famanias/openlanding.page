<template slug="inesvale" name="Ines Vale">
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
    <file path="src/app/(inesvale)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./inesvale/inesvale.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ines Vale — Independent Photographer",
  description:
    "Photographs of fleeting places, quiet emotions, and everything we almost miss. Fine-art and editorial photography portfolio of Ines Vale.",
  openGraph: {
    title: "Ines Vale — Independent Photographer",
    description:
      "Photographs of fleeting places, quiet emotions, and everything we almost miss. Fine-art and editorial photography portfolio of Ines Vale.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function InesValeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${display.variable} ${body.variable}`}>
      <body className="bg-[#F2ECE0] text-[#201C19] antialiased selection:bg-[#A65D46]/20 selection:text-[#201C19]">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(inesvale)/inesvale/assets.generated.ts">
<![CDATA[export const ASSETS = {};
]]>
    </file>
    <file path="src/app/(inesvale)/inesvale/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/inesvale";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

export function Picture({ assetKey, alt, className }: { assetKey: string; alt: string; className?: string }) {
  const source = assetSrc(assetKey, 800);
  if (!source) {
    return (
      <div className={`iv-picture-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span>{assetKey}</span>
      </div>
    );
  }
  return <img src={source} alt={alt} className={className} loading="eager" decoding="async" fetchPriority="high" />;
}
]]>
    </file>
    <file path="src/app/(inesvale)/inesvale/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#F2ECE0"/>
  <circle cx="32" cy="32" r="20" fill="none" stroke="#201C19" stroke-width="2"/>
  <circle cx="32" cy="32" r="10" fill="none" stroke="#A65D46" stroke-width="1.5"/>
  <path d="M32 12v6M32 46v6M12 32h6M46 32h6" stroke="#BFB7AC" stroke-width="1.5" stroke-linecap="round"/>
</svg>
]]>
    </file>
    <file path="src/app/(inesvale)/inesvale/inesvale.css">
<![CDATA[@import "tailwindcss";

:root {
  --ivory: #F2ECE0;
  --ivory-soft: #F7F4ED;
  --ink: #201C19;
  --rust: #A65D46;
  --slate: #6D8795;
  --muted: #79756F;
  --rule: #BFB7AC;
  --ease-editorial: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-shutter: cubic-bezier(0.65, 0, 0.35, 1);
}

@layer base {
  html {
    background-color: var(--ivory);
    color: var(--ink);
    font-family: var(--font-jakarta), "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif;
    scroll-behavior: smooth;
  }

  h1, h2, h3, .font-serif-editorial {
    font-family: var(--font-cormorant), "Cormorant Garamond", Georgia, serif;
  }
}

/* Subtle photographic paper texture and film ambience */
.paper-grain {
  background-image: radial-gradient(rgba(32, 28, 25, 0.03) 1px, transparent 0);
  background-size: 24px 24px;
}

/* Viewfinder calibration rule draw */
@keyframes drawRuleLTR {
  0% {
    transform: scaleX(0);
    transform-origin: left center;
  }
  100% {
    transform: scaleX(1);
    transform-origin: left center;
  }
}

.animate-rule-draw {
  animation: drawRuleLTR 1.1s var(--ease-editorial) forwards;
}

/* Staggered headline line mask reveal */
@keyframes lineRevealUp {
  0% {
    transform: translateY(108%);
    letter-spacing: 0.02em;
  }
  100% {
    transform: translateY(0%);
    letter-spacing: -0.025em;
  }
}

.animate-line-reveal-1 {
  animation: lineRevealUp 0.95s var(--ease-editorial) 0.08s both;
}
.animate-line-reveal-2 {
  animation: lineRevealUp 0.95s var(--ease-editorial) 0.2s both;
}
.animate-line-reveal-3 {
  animation: lineRevealUp 0.95s var(--ease-editorial) 0.32s both;
}

/* Rust brush stroke draw */
@keyframes brushDraw {
  0% {
    stroke-dashoffset: 120;
    opacity: 0.2;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

.animate-brush-stroke {
  stroke-dasharray: 120;
  stroke-dashoffset: 120;
  animation: brushDraw 0.9s var(--ease-editorial) 0.58s forwards;
}

/* Hero shutter aperture reveal */
@keyframes shutterOpenVertical {
  0% {
    clip-path: inset(14% 0% 14% 0%);
    transform: scale(1.06);
  }
  100% {
    clip-path: inset(0% 0% 0% 0%);
    transform: scale(1);
  }
}

.animate-shutter-entrance {
  animation: shutterOpenVertical 1.25s var(--ease-editorial) 0.15s both;
}

/* Directional curtain wipes for gallery transitions */
@keyframes shutterWipeNext {
  0% {
    clip-path: inset(0 0 0 100%);
    transform: scale(1.04) translateX(18px);
  }
  100% {
    clip-path: inset(0 0 0 0%);
    transform: scale(1) translateX(0);
  }
}

@keyframes shutterWipePrev {
  0% {
    clip-path: inset(0 100% 0 0);
    transform: scale(1.04) translateX(-18px);
  }
  100% {
    clip-path: inset(0 0% 0 0);
    transform: scale(1) translateX(0);
  }
}

.shutter-wipe-next {
  animation: shutterWipeNext 0.78s var(--ease-editorial) forwards;
}

.shutter-wipe-prev {
  animation: shutterWipePrev 0.78s var(--ease-editorial) forwards;
}

/* Subtle ambient image breathing */
@keyframes filmBreathe {
  0%, 100% {
    transform: scale(1.005) translate3d(0, 0, 0);
  }
  50% {
    transform: scale(1.022) translate3d(-1.5px, -1px, 0);
  }
}

.film-breathe {
  animation: filmBreathe 18s ease-in-out infinite;
}

/* Ink-like directional hover underline */
.ink-link {
  position: relative;
}

.ink-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform 0.36s var(--ease-editorial);
}

.ink-link:hover::after,
.ink-link:focus-visible::after,
.ink-link-active::after {
  transform: scaleX(1);
  transform-origin: left center;
}

/* Focus ring accessibility */
:focus-visible {
  outline: 1.5px solid var(--rust);
  outline-offset: 3px;
}

/* Reduced motion compliance */
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .film-breathe {
    animation: none !important;
  }
}
]]>
    </file>
    <file path="src/app/(inesvale)/inesvale/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ines Vale — Independent Photographer";

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
          backgroundColor: "#F2ECE0",
          color: "#201C19",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.08em" }}>
          <span>INES VALE</span>
          <span style={{ color: "#BFB7AC" }}>/</span>
          <span style={{ fontSize: 18, color: "#79756F" }}>INDEPENDENT PHOTOGRAPHER</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 68, lineHeight: 1.05, maxWidth: 900 }}>
            The beauty between moments.
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#79756F", maxWidth: 800 }}>
            Photographs of fleeting places, quiet emotions, and everything we almost miss.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "#79756F" }}>
          <span>Fine-Art & Editorial Monograph</span>
          <span style={{ color: "#A65D46" }}>Series 01 — 04</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
]]>
    </file>
    <file path="src/app/(inesvale)/inesvale/page.tsx">
<![CDATA["use client";

import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { SelectedStoriesSection } from "./components/SelectedStoriesSection";
import { ArchiveSection } from "./components/ArchiveSection";
import { CloserLookSection } from "./components/CloserLookSection";
import { ArtistSection } from "./components/ArtistSection";
import { NotesSection } from "./components/NotesSection";
import { InquireSection } from "./components/InquireSection";
import { LightboxModal } from "./components/LightboxModal";
import { StoryDrawerModal } from "./components/StoryDrawerModal";
import {
  ARCHIVE_PHOTOS,
  type ArchivePhoto,
  type HeroSlide,
  type JournalNote,
  type StoryItem,
} from "./data/portfolioData";

export default function InesValePage() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [lightboxState, setLightboxState] = useState<{
    photos: ArchivePhoto[];
    index: number;
  } | null>(null);
  const [activeStory, setActiveStory] = useState<{
    story: StoryItem;
    initialIndex: number;
  } | null>(null);
  const [activeNote, setActiveNote] = useState<JournalNote | null>(null);

  useEffect(() => {
    const sectionIds = ["hero", "stories", "archive", "closer-look", "about", "notes", "inquire"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0.05 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleInspectHeroSlide = (slide: HeroSlide) => {
    const matchingIdx = ARCHIVE_PHOTOS.findIndex((p) => p.src === slide.image);
    setLightboxState({
      photos: ARCHIVE_PHOTOS,
      index: matchingIdx >= 0 ? matchingIdx : 0,
    });
  };

  return (
    <div className="min-h-screen bg-[#F2ECE0] text-[#201C19] paper-grain relative selection:bg-[#A65D46]/20">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      <main id="main-content">
        {/* 01 / Hero — The Beauty Between Moments */}
        <HeroSection
          onNavigate={handleNavigate}
          onInspectSlide={handleInspectHeroSlide}
        />

        {/* 02 / Selected Stories — Cinematic Project Strip */}
        <SelectedStoriesSection
          onOpenStory={(story, initialIndex = 0) => {
            setActiveNote(null);
            setActiveStory({ story, initialIndex });
          }}
        />

        {/* 03 / Archive — Filterable Photographic Collection */}
        <ArchiveSection
          onSelectPhoto={(photo, list) => {
            const idx = list.findIndex((item) => item.id === photo.id);
            setLightboxState({
              photos: list,
              index: idx >= 0 ? idx : 0,
            });
          }}
        />

        {/* 04 / A Closer Look — Pinned Editorial Sequence */}
        <CloserLookSection />

        {/* 05 / Artist — About Ines Vale */}
        <ArtistSection onNavigateInquire={() => handleNavigate("inquire")} />

        {/* 06 / Notes — Editorial Field Journal */}
        <NotesSection
          onSelectNote={(note) => {
            setActiveStory(null);
            setActiveNote(note);
          }}
        />
      </main>

      {/* 07 / Inquire — Contact + Footer */}
      <InquireSection onNavigate={handleNavigate} />

      {/* Fullscreen Archival Lightbox */}
      {lightboxState && (
        <LightboxModal
          photos={lightboxState.photos}
          currentIndex={lightboxState.index}
          onClose={() => setLightboxState(null)}
          onChangeIndex={(newIdx) =>
            setLightboxState((prev) => (prev ? { ...prev, index: newIdx } : null))
          }
        />
      )}

      {/* Monograph Story & Field Note Reader Drawer */}
      <StoryDrawerModal
        story={activeStory?.story ?? null}
        initialImageIndex={activeStory?.initialIndex ?? 0}
        note={activeNote}
        onClose={() => {
          setActiveStory(null);
          setActiveNote(null);
        }}
      />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(inesvale)/inesvale/components/ArchiveSection.tsx">
<![CDATA[import React, { useState, useMemo } from 'react';
import { ARCHIVE_PHOTOS, ArchiveCategory, ArchivePhoto } from '../data/portfolioData';
import { filterArchivePhotos, getCategoryCounts } from '../utils/portfolioLogic';

interface ArchiveSectionProps {
  onSelectPhoto: (photo: ArchivePhoto, filteredList: ArchivePhoto[]) => void;
}

const CATEGORIES: ArchiveCategory[] = [
  'All',
  'Portraits',
  'Places',
  'Architecture',
  'Details'
];

export const ArchiveSection: React.FC<ArchiveSectionProps> = ({ onSelectPhoto }) => {
  const [selectedCategory, setSelectedCategory] = useState<ArchiveCategory>('All');
  const [transitioning, setTransitioning] = useState(false);

  const counts = useMemo(() => getCategoryCounts(ARCHIVE_PHOTOS), []);
  const filteredPhotos = useMemo(
    () => filterArchivePhotos(ARCHIVE_PHOTOS, selectedCategory),
    [selectedCategory]
  );

  const handleCategoryChange = (category: ArchiveCategory) => {
    if (category === selectedCategory) return;
    setTransitioning(true);
    setSelectedCategory(category);
    window.setTimeout(() => {
      setTransitioning(false);
    }, 280);
  };

  return (
    <section
      id="archive"
      aria-labelledby="archive-heading"
      className="w-full px-5 sm:px-8 lg:px-14 py-20 lg:py-28 border-t border-[#BFB7AC]"
    >
      {/* Header & Interactive Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#BFB7AC]">
        <div>
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#79756F] mb-3 tabular-nums">
            03 — ARCHIVE COLLECTION
          </p>
          <h2
            id="archive-heading"
            className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.02em] text-[#201C19] leading-[0.98]"
          >
            INDEX OF PLATES.
          </h2>
        </div>

        {/* Category Filter Buttons (Clean Editorial Segmented Bar) */}
        <div
          role="group"
          aria-label="Filter archive by photographic subject"
          className="flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                aria-pressed={isActive}
                className={`min-h-[44px] py-2 text-[13px] tracking-[0.05em] uppercase whitespace-nowrap shrink-0 transition-colors flex items-baseline gap-1.5 border-b-2 ${
                  isActive
                    ? 'border-[#A65D46] text-[#201C19] font-medium'
                    : 'border-transparent text-[#79756F] hover:text-[#201C19]'
                }`}
              >
                <span>{category}</span>
                <span className="text-[10.5px] text-[#79756F] tabular-nums">
                  ({counts[category]})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Status Readout */}
      <div className="flex items-center justify-between py-4 text-[11px] tracking-[0.06em] uppercase text-[#79756F] tabular-nums">
        <span aria-live="polite">
          SHOWING {filteredPhotos.length} OF {ARCHIVE_PHOTOS.length} ARCHIVAL PLATES ·{' '}
          {selectedCategory.toUpperCase()}
        </span>
        <span>CLICK ANY PLATE TO OPEN LIGHTBOX</span>
      </div>

      {/* Editorial Contact-Sheet & Asymmetric Gallery Grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-12 pt-6 transition-all duration-300 ${
          transitioning ? 'opacity-75 translate-y-1' : 'opacity-100 translate-y-0'
        }`}
      >
        {filteredPhotos.map((photo) => {
          const gridSpan =
            selectedCategory === 'All' ? photo.spanClass : 'md:col-span-4';

          return (
            <figure
              key={photo.id}
              className={`${gridSpan} flex flex-col justify-between group`}
            >
              <button
                type="button"
                onClick={() => onSelectPhoto(photo, filteredPhotos)}
                aria-label={`Open ${photo.title} (${photo.plateNumber}) in lightbox`}
                className={`relative w-full ${photo.aspectClass} overflow-hidden bg-[#D8D0C5] text-left block focus:outline-none`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />

                {/* Sliding Darkroom Matte Overlay on Hover/Focus */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-300 ease-out bg-[#201C19]/90 text-[#F7F4ED] px-4 py-3 flex items-center justify-between gap-3">
                  <span className="text-[11px] tracking-[0.04em] truncate">
                    {photo.caption}
                  </span>
                  <span className="text-[10px] tracking-[0.08em] uppercase text-[#F7F4ED]/75 whitespace-nowrap shrink-0 tabular-nums">
                    {photo.exif}
                  </span>
                </div>
              </button>

              {/* Unboxed Clean Editorial Metadata Below Plate */}
              <figcaption className="pt-3 flex items-baseline justify-between gap-4 border-b border-[#BFB7AC]/50 pb-2.5">
                <div className="flex items-baseline gap-2.5 min-w-0">
                  <span className="text-[10.5px] tracking-[0.07em] uppercase text-[#A65D46] tabular-nums shrink-0">
                    {photo.plateNumber}
                  </span>
                  <span className="font-serif-editorial text-xl text-[#201C19] truncate">
                    {photo.title}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-[#79756F] whitespace-nowrap shrink-0 tabular-nums">
                  <span>{photo.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{photo.year}</span>
                </div>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(inesvale)/inesvale/components/ArtistSection.tsx">
<![CDATA[import React, { useState } from 'react';
import { ARTIST_CREDITS } from '../data/portfolioData';

interface ArtistSectionProps {
  onNavigateInquire: () => void;
}

export const ArtistSection: React.FC<ArtistSectionProps> = ({ onNavigateInquire }) => {
  const [approachExpanded, setApproachExpanded] = useState(false);

  return (
    <section
      id="about"
      aria-labelledby="artist-heading"
      className="w-full px-5 sm:px-8 lg:px-14 py-20 lg:py-28 border-t border-[#BFB7AC]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Intimate Portrait & Studio Availability */}
        <div className="lg:col-span-5">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#79756F] mb-4 tabular-nums">
            05 — THE ARTIST
          </p>

          <figure className="bg-[#F7F4ED] border border-[#BFB7AC]/70 p-4 sm:p-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#D8D0C5]">
              <img
                src="/templates/inesvale/artist-portrait.webp"
                alt="Editorial portrait of photographer Ines Vale in natural north window light"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
            <figcaption className="pt-3.5 flex items-center justify-between text-[11px] tracking-[0.05em] uppercase text-[#79756F]">
              <span>INES VALE · LISBON & PORTO</span>
              <span className="tabular-nums">B. 1991</span>
            </figcaption>
          </figure>

          {/* Studio & Availability Note */}
          <div className="mt-6 pt-5 border-t border-[#BFB7AC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.07em] uppercase text-[#A65D46]">
                STUDIO AVAILABILITY · Q4 2026 / Q1 2027
              </p>
              <p className="text-[13.5px] text-[#201C19]/85 mt-1">
                Available for editorial commissions, architectural monographs, and archival print editions across Europe.
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateInquire}
              className="ink-link text-[12px] tracking-[0.07em] uppercase text-[#201C19] whitespace-nowrap shrink-0 min-h-[44px] self-start sm:self-center"
            >
              COMMISSION INQUIRY ↗
            </button>
          </div>
        </div>

        {/* Right Column: Biography, Expandable Approach & Monograph Credits */}
        <div className="lg:col-span-7 lg:pl-6 pt-2 lg:pt-8">
          <h2
            id="artist-heading"
            className="font-serif-editorial text-4xl sm:text-5xl lg:text-[54px] font-normal tracking-[-0.02em] text-[#201C19] leading-[1.02]"
          >
            QUIET OBSERVATION IN MEDIUM FORMAT.
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[15.5px] leading-[1.65] text-[#201C19]/85">
            <p>
              Ines Vale is an independent fine-art and editorial photographer working between Lisbon, Porto, and the North Atlantic littoral. Trained initially in architectural conservation before turning to analog photography, her work examines how weather, lime, stone, and solitary human presence register the passage of time.
            </p>
            <p>
              Working almost exclusively with mechanical medium-format and 4×5 field cameras under natural twilight or north-window illumination, she avoids artificial staging in favor of unhurried sittings and extended coastal residencies.
            </p>
          </div>

          {/* Expandable "READ MY APPROACH" Paper-Sheet Extension */}
          <div className="mt-8 border-t border-b border-[#BFB7AC]">
            <button
              type="button"
              onClick={() => setApproachExpanded((prev) => !prev)}
              aria-expanded={approachExpanded}
              aria-controls="artist-approach-panel"
              className="w-full py-4 min-h-[48px] flex items-center justify-between text-left group"
            >
              <span className="text-[12.5px] tracking-[0.08em] uppercase text-[#201C19] font-medium group-hover:text-[#A65D46] transition-colors">
                {approachExpanded ? 'CLOSE MY APPROACH' : 'READ MY APPROACH'}
              </span>
              <span
                aria-hidden="true"
                className="text-sm text-[#A65D46] tracking-[0.06em] uppercase tabular-nums"
              >
                {approachExpanded ? '— COLLAPSE' : '+ EXPAND'}
              </span>
            </button>

            <div
              id="artist-approach-panel"
              role="region"
              aria-label="Ines Vale Photographic Approach"
              className={`grid transition-all duration-500 ease-out overflow-hidden ${
                approachExpanded ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="min-h-0">
                <div className="bg-[#F7F4ED] border border-[#BFB7AC]/70 p-6 sm:p-8 space-y-4 text-[15px] leading-[1.65] text-[#201C19]/85">
                  <p className="font-serif-editorial italic text-xl text-[#201C19]">
                    “A photograph succeeds when it leaves room for the viewer’s own silence.”
                  </p>
                  <p>
                    1. <strong>Analog Restraint:</strong> Every project is photographed on 120 roll film or 4×5 sheet film. Having only ten or twelve exposures per roll changes the posture of the photographer from hunter to listener.
                  </p>
                  <p>
                    2. <strong>Natural Luminance Only:</strong> Whether photographing a writer in a Lisbon apartment or a basalt beach in winter fog, no strobes or artificial modifiers are introduced. Shadows are allowed to remain deep and tactile.
                  </p>
                  <p>
                    3. <strong>Tactile Print Permanence:</strong> Digital files are treated only as intermediate notes; every body of work is color-graded and proofed for warm archival cotton rag and hand-bound monograph signatures.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Exhibitions & Monographs (Clearly Labeled Illustrative Fictional Content) */}
          <div className="mt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-[#BFB7AC]/70">
              <h3 className="text-[11.5px] tracking-[0.08em] uppercase text-[#201C19]">
                SELECTED EXHIBITIONS & MONOGRAPHS
              </h3>
              <span className="text-[11px] text-[#79756F] italic">
                ({ARTIST_CREDITS.note})
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <div>
                <h4 className="text-[11px] tracking-[0.07em] uppercase text-[#79756F] mb-3">
                  EXHIBITIONS
                </h4>
                <ul className="divide-y divide-[#BFB7AC]/50">
                  {ARTIST_CREDITS.exhibitions.map((ex) => (
                    <li
                      key={ex.title}
                      className="py-2.5 flex items-baseline justify-between gap-4 text-[13.5px]"
                    >
                      <span className="text-[#201C19]">{ex.title}</span>
                      <span className="text-[11.5px] text-[#79756F] whitespace-nowrap shrink-0 tabular-nums">
                        {ex.venue} · {ex.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[11px] tracking-[0.07em] uppercase text-[#79756F] mb-3">
                  PUBLICATIONS
                </h4>
                <ul className="divide-y divide-[#BFB7AC]/50">
                  {ARTIST_CREDITS.publications.map((pub) => (
                    <li
                      key={pub.title}
                      className="py-2.5 flex items-baseline justify-between gap-4 text-[13.5px]"
                    >
                      <span className="text-[#201C19]">{pub.title}</span>
                      <span className="text-[11.5px] text-[#79756F] whitespace-nowrap shrink-0 tabular-nums">
                        {pub.year}
                      </span>
                    </li>
                  ))}
                </ul>
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
    <file path="src/app/(inesvale)/inesvale/components/CloserLookSection.tsx">
<![CDATA[import React, { useState, useEffect, useRef } from 'react';
import { CLOSER_LOOK_STEPS } from '../data/portfolioData';
import { computeCloserLookStep } from '../utils/portfolioLogic';

export const CloserLookSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [stepProgress, setStepProgress] = useState<number>(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId: number | null = null;

    const updateOnScroll = () => {
      rafId = null;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const rawProgress = -rect.top / scrollableDistance;
      if (rawProgress < -0.1 || rawProgress > 1.1) return;

      const { activeIndex: nextIdx, stepProgress: nextSub } = computeCloserLookStep(
        rawProgress,
        CLOSER_LOOK_STEPS.length
      );
      setActiveIndex(nextIdx);
      setStepProgress(nextSub);
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateOnScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateOnScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const currentStep = CLOSER_LOOK_STEPS[activeIndex] || CLOSER_LOOK_STEPS[0];

  const handleManualStepSelect = (idx: number) => {
    setActiveIndex(idx);
    setStepProgress(0.5);
  };

  return (
    <section
      id="closer-look"
      aria-labelledby="closer-look-heading"
      ref={containerRef}
      className="relative w-full border-t border-[#BFB7AC] bg-[#201C19] text-[#F2ECE0] lg:min-h-[210vh]"
    >
      <div className="lg:sticky lg:top-0 lg:min-h-screen w-full px-5 sm:px-8 lg:px-14 py-16 lg:py-20 flex flex-col justify-between">
        {/* Top Calibration Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#F2ECE0]/20">
          <div className="flex items-center gap-3">
            <span className="text-[11px] tracking-[0.08em] uppercase text-[#F2ECE0]/70 tabular-nums">
              04 — A CLOSER LOOK
            </span>
            <span aria-hidden="true" className="text-[#F2ECE0]/40">
              ·
            </span>
            <span
              id="closer-look-heading"
              className="text-[11px] tracking-[0.08em] uppercase text-[#F2ECE0]"
            >
              FIELD METHODOLOGY IN THREE EXPOSURES
            </span>
          </div>

          {/* Interactive Step Selector Tabs (Observe / Wait / Remember) */}
          <div
            role="tablist"
            aria-label="Field methodology stages"
            className="flex items-center gap-6"
          >
            {CLOSER_LOOK_STEPS.map((step, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  onClick={() => handleManualStepSelect(idx)}
                  className={`min-h-[44px] text-[12px] tracking-[0.08em] uppercase transition-colors flex items-center gap-2 border-b-2 ${
                    isCurrent
                      ? 'border-[#A65D46] text-[#F2ECE0]'
                      : 'border-transparent text-[#F2ECE0]/55 hover:text-[#F2ECE0]/85'
                  }`}
                >
                  <span className="tabular-nums text-[10px] text-[#A65D46]">
                    0{idx + 1}
                  </span>
                  <span>{step.verb}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Pinned Sequence Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center my-auto py-8">
          {/* Left Typographic Mask & Calibration Progress */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="flex items-center gap-3 text-[11.5px] tracking-[0.08em] uppercase text-[#A65D46] tabular-nums">
              <span>EXPOSURE STAGE {currentStep.stepNumber}</span>
            </div>

            <div className="overflow-hidden">
              <div
                key={currentStep.verb}
                className="font-serif-editorial text-5xl sm:text-6xl lg:text-7xl tracking-[-0.02em] leading-[0.95] text-[#F2ECE0] transition-transform duration-500"
              >
                {currentStep.verb}.
              </div>
            </div>

            {/* Dynamic Rust Calibration Rule that Grows with Scroll/Step */}
            <div className="w-full h-[2px] bg-[#F2ECE0]/15 overflow-hidden">
              <div
                className="h-full bg-[#A65D46] transition-all duration-300"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(18, ((activeIndex + Math.max(0.25, stepProgress)) / 3) * 100)
                  )}%`
                }}
              />
            </div>

            <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#F2ECE0]/95 font-normal leading-[1.2]">
              {currentStep.headline}
            </h3>

            <p className="text-[15px] leading-[1.65] text-[#F2ECE0]/75 max-w-[460px]">
              {currentStep.reflection}
            </p>

            <p className="pt-2 text-[11px] tracking-[0.06em] uppercase text-[#F2ECE0]/55">
              {currentStep.technicalNote}
            </p>
          </div>

          {/* Right Masked Exposure Diptych */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-6 items-end">
            <div className="sm:col-span-8 relative aspect-[4/4.6] overflow-hidden bg-[#141210]">
              {CLOSER_LOOK_STEPS.map((step, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={step.id}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isActive
                        ? 'opacity-100 scale-100'
                        : idx < activeIndex
                        ? 'opacity-0 scale-105 -translate-x-6'
                        : 'opacity-0 scale-95 translate-x-6'
                    }`}
                  >
                    <img
                      src={step.image}
                      alt={step.alt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
              <div className="absolute bottom-3 left-3 bg-[#141210]/70 px-3 py-1 text-[10px] tracking-[0.08em] uppercase text-[#F2ECE0]/85 tabular-nums">
                {currentStep.stepNumber} — {currentStep.verb}
              </div>
            </div>

            <div className="sm:col-span-4 hidden sm:flex flex-col gap-3">
              <div className="aspect-[4/5] overflow-hidden bg-[#141210] border border-[#F2ECE0]/15">
                <img
                  src={currentStep.secondaryImage}
                  alt={`${currentStep.verb} companion contact plate`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-700"
                />
              </div>
              <span className="text-[10.5px] tracking-[0.06em] uppercase text-[#F2ECE0]/55">
                CONTACT PROOF · {currentStep.verb}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Sequence Footer */}
        <div className="pt-6 border-t border-[#F2ECE0]/15 flex items-center justify-between text-[11px] tracking-[0.06em] uppercase text-[#F2ECE0]/60 tabular-nums">
          <span>OBSERVE · WAIT · REMEMBER</span>
          <span>SCROLL OR SELECT STAGE TO ADVANCE</span>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(inesvale)/inesvale/components/Header.tsx">
<![CDATA[import React, { useState, useEffect } from 'react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'archive', label: 'Work' },
  { id: 'stories', label: 'Stories' },
  { id: 'about', label: 'About' },
  { id: 'inquire', label: 'Contact' }
];

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header className="w-full px-5 sm:px-8 lg:px-14 pt-6 sm:pt-8 pb-2 relative z-40">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[#201C19] focus:text-[#F2ECE0] focus:px-4 focus:py-2 focus:text-xs focus:tracking-widest focus:uppercase"
      >
        Skip to content
      </a>

      {/* Top 3-Zone Bar */}
      <div className="flex items-center justify-between gap-8 pb-3.5">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, 'hero')}
          className="font-serif-editorial text-[26px] sm:text-[31px] leading-none tracking-[-0.02em] text-[#201C19] uppercase whitespace-nowrap shrink-0 overflow-hidden"
        >
          <span className="inline-block animate-line-reveal-1">INES VALE</span>
        </a>

        {/* Zone 2: Primary Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-9 lg:gap-11 text-[14.5px] font-normal text-[#201C19]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`ink-link whitespace-nowrap shrink-0 py-1 transition-colors duration-200 ${
                  isActive ? 'ink-link-active text-[#201C19]' : 'text-[#201C19]/85 hover:text-[#201C19]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Mobile Toggle */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href="#inquire"
            onClick={(e) => handleLinkClick(e, 'inquire')}
            className="ink-link text-[12px] sm:text-[12.5px] tracking-[0.06em] uppercase text-[#201C19] whitespace-nowrap shrink-0 py-1.5 inline-flex items-center gap-1.5 group"
          >
            <span>INQUIRE</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-sheet"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden min-h-[44px] min-w-[44px] px-2.5 flex items-center justify-center text-[11px] tracking-[0.08em] uppercase text-[#201C19] border border-[#BFB7AC]/80"
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>

      {/* Viewfinder Calibration Rule & Independent Photographer Kicker */}
      <div className="w-full h-[1px] bg-[#BFB7AC] animate-rule-draw" />
      <div className="flex items-center justify-between pt-2">
        <p className="text-[10px] sm:text-[10.5px] tracking-[0.07em] uppercase text-[#201C19]/75 font-normal">
          INDEPENDENT PHOTOGRAPHER
        </p>
      </div>

      {/* Mobile Navigation Sheet */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-[#201C19]/30 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <nav
            id="mobile-navigation-sheet"
            aria-label="Mobile Navigation"
            className="absolute left-5 right-5 top-full mt-2 bg-[#F7F4ED] border border-[#BFB7AC] p-6 z-50 md:hidden shadow-sm"
          >
            <ul className="flex flex-col divide-y divide-[#BFB7AC]/60">
              {NAV_ITEMS.map((item, idx) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleLinkClick(e, item.id)}
                    className="flex items-center justify-between py-3.5 min-h-[44px] text-[#201C19] hover:text-[#A65D46] transition-colors"
                  >
                    <span className="font-serif-editorial text-2xl tracking-tight">
                      {item.label}
                    </span>
                    <span className="text-[11px] tracking-[0.08em] text-[#79756F] tabular-nums">
                      0{idx + 1}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#notes"
                  onClick={(e) => handleLinkClick(e, 'notes')}
                  className="flex items-center justify-between py-3.5 min-h-[44px] text-[#201C19] hover:text-[#A65D46] transition-colors"
                >
                  <span className="font-serif-editorial text-2xl tracking-tight">Notes</span>
                  <span className="text-[11px] tracking-[0.08em] text-[#79756F] tabular-nums">
                    05
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </>
      )}
    </header>
  );
};
]]>
    </file>
    <file path="src/app/(inesvale)/inesvale/components/HeroSection.tsx">
<![CDATA[import React, { useState, useRef } from 'react';
import { HERO_SLIDES, CONTACT_SHEET_THUMBNAILS, HeroSlide } from '../data/portfolioData';
import { getNextSlideIndex, formatSlideCounter } from '../utils/portfolioLogic';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onInspectSlide: (slide: HeroSlide) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onInspectSlide
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [wipeDirection, setWipeDirection] = useState<'next' | 'prev'>('next');
  const [animKey, setAnimKey] = useState<number>(0);
  const [parallax, setParallax] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStartX = useRef<number | null>(null);

  const currentSlide = HERO_SLIDES[currentIndex];
  const prevSlide = previousIndex !== null ? HERO_SLIDES[previousIndex] : null;

  const transitionToSlide = (targetIndex: number, dir: 'next' | 'prev') => {
    if (targetIndex === currentIndex) return;
    setPreviousIndex(currentIndex);
    setWipeDirection(dir);
    setCurrentIndex(targetIndex);
    setAnimKey((k) => k + 1);
  };

  const handleStep = (dir: 'next' | 'prev') => {
    const nextIdx = getNextSlideIndex(currentIndex, HERO_SLIDES.length, dir);
    transitionToSlide(nextIdx, dir);
  };

  const handleThumbnailSelect = (slideIndex: number) => {
    if (slideIndex === currentIndex) {
      // Clicking active contact sheet thumbnail returns smoothly to primary cover slide (0)
      transitionToSlide(0, 'prev');
      return;
    }
    const dir = slideIndex > currentIndex ? 'next' : 'prev';
    transitionToSlide(slideIndex, dir);
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

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({
      x: Number((relX * -6).toFixed(2)),
      y: Number((relY * -6).toFixed(2))
    });
  };

  const handlePointerLeave = () => {
    setParallax({ x: 0, y: 0 });
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
      id="hero"
      aria-label="Featured Portfolio Series"
      onKeyDown={handleKeyDown}
      className="w-full px-5 sm:px-8 lg:px-14 pt-2 pb-10 lg:pb-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch lg:min-h-[735px]">
        {/* Left Editorial Column (46% visual ratio -> 6 of 12 cols with right padding) */}
        <div className="lg:col-span-6 flex flex-col justify-between pt-4 sm:pt-8 lg:pt-11 lg:pr-6">
          {/* Upper Monumental Display Block */}
          <div>
            <h1
              className="font-serif-editorial uppercase text-[#201C19] font-normal tracking-[-0.025em] leading-[0.93] select-none"
              style={{ fontSize: 'clamp(3.25rem, 6.1vw, 5.65rem)' }}
            >
              <span className="block overflow-hidden pb-0.5">
                <span className="block animate-line-reveal-1">THE BEAUTY</span>
              </span>
              <span className="block overflow-hidden pb-0.5">
                <span className="block animate-line-reveal-2">BETWEEN</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="block animate-line-reveal-3">MOMENTS.</span>
              </span>
            </h1>

            {/* Hand-painted Rust Brush Underline */}
            <div className="mt-4 sm:mt-5 mb-6 sm:mb-8" aria-hidden="true">
              <svg
                width="88"
                height="12"
                viewBox="0 0 88 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
              >
                <path
                  d="M2 7.2C24.5 5.6 54.2 5.1 85.5 5.8"
                  stroke="#A65D46"
                  strokeWidth="6.5"
                  strokeLinecap="round"
                  className="animate-brush-stroke"
                />
                <path
                  d="M4 8.6C31 7.2 61 6.8 83 7.4"
                  stroke="#A65D46"
                  strokeOpacity="0.65"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  className="animate-brush-stroke"
                />
              </svg>
            </div>

            {/* Editorial Lead Copy */}
            <p className="text-[15.5px] sm:text-[17px] leading-[1.48] text-[#201C19]/90 font-normal max-w-[440px]">
              Photographs of fleeting places, quiet emotions,{' '}
              <br className="hidden sm:inline" />
              and everything we almost miss.
            </p>
          </div>

          {/* Lower Editorial Bar: Stacked CTAs + 3-Image Contact Sheet */}
          <div className="mt-10 lg:mt-12 pt-2 flex flex-col sm:flex-row sm:items-end justify-between gap-8 lg:gap-6">
            {/* Left Bottom CTAs */}
            <div className="w-full sm:w-[215px] shrink-0 pb-1">
              <a
                href="#archive"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('archive');
                }}
                className="group flex items-center justify-between sm:justify-start gap-2 text-[12px] sm:text-[12.5px] tracking-[0.05em] uppercase text-[#201C19] pb-3 min-h-[44px]"
              >
                <span className="ink-link">EXPLORE THE ARCHIVE</span>
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>

              <div className="w-full h-[1px] bg-[#BFB7AC]" />

              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('about');
                }}
                className="group flex items-center justify-between sm:justify-start gap-2 text-[12px] sm:text-[12.5px] tracking-[0.05em] uppercase text-[#201C19] pt-3 min-h-[44px]"
              >
                <span className="ink-link">THE ARTIST</span>
              </a>
            </div>

            {/* Right Bottom 3-Image Contact Sheet */}
            <div
              role="group"
              aria-label="Featured Series Contact Sheet"
              className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full sm:max-w-[300px]"
            >
              {CONTACT_SHEET_THUMBNAILS.map((item) => {
                const isSelected = currentIndex === item.slideIndex;
                return (
                  <button
                    key={item.serial}
                    type="button"
                    onClick={() => handleThumbnailSelect(item.slideIndex)}
                    aria-pressed={isSelected}
                    aria-label={`Select Serial ${item.serial} featured photograph`}
                    className="group text-left focus:outline-none"
                  >
                    <div
                      className={`relative aspect-[4/4.7] w-full overflow-hidden bg-[#D8D0C5] transition-transform duration-500 ${
                        isSelected
                          ? 'ring-1 ring-[#A65D46] ring-offset-2 ring-offset-[#F2ECE0]'
                          : 'opacity-95 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-1.5 text-[9px] tracking-[0.06em] uppercase text-[#201C19]/80 tabular-nums">
                      <span>{item.label}</span>
                      <span>{item.serial}</span>
                    </div>
                    <div
                      className={`h-[1.5px] mt-0.5 transition-all duration-300 ${
                        isSelected
                          ? 'w-full bg-[#A65D46]'
                          : 'w-0 group-hover:w-full bg-[#201C19]/40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Dominant Photographic Frame (54% visual ratio -> 6 of 12 cols) */}
        <div className="lg:col-span-6 flex flex-col">
          <div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full h-full min-h-[460px] sm:min-h-[580px] lg:min-h-[735px] overflow-hidden bg-[#4E616D] animate-shutter-entrance select-none group"
          >
            {/* Previous Slide Underlay for Two-Layer Shutter Wipe */}
            {prevSlide && (
              <img
                key={`prev-${prevSlide.id}-${animKey}`}
                src={prevSlide.image}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            )}

            {/* Active Hero Photograph with Directional Shutter Wipe & Subtle Breathing */}
            <div
              key={`active-${currentSlide.id}-${animKey}`}
              className={`absolute inset-0 w-full h-full ${
                animKey > 0
                  ? wipeDirection === 'next'
                    ? 'shutter-wipe-next'
                    : 'shutter-wipe-prev'
                  : ''
              }`}
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.alt}
                referrerPolicy="no-referrer"
                onClick={() => onInspectSlide(currentSlide)}
                style={{
                  transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0) scale(1.02)`
                }}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out cursor-zoom-in film-breathe"
              />
            </div>

            {/* Measured Bottom Scrim for WCAG AA Overlay Legibility */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#141210]/85 via-[#141210]/40 to-transparent"
            />

            {/* Top-right subtle inspect trigger on hover/focus */}
            <button
              type="button"
              onClick={() => onInspectSlide(currentSlide)}
              aria-label={`Open ${currentSlide.seriesTitle} in fullscreen viewer`}
              className="absolute top-4 right-4 z-20 px-3 py-1.5 text-[10px] tracking-[0.08em] uppercase text-[#F7F4ED]/90 bg-[#141210]/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300"
            >
              INSPECT PLATE ↗
            </button>

            {/* Bottom Caption, Counter & Gallery Arrows (Exact Match to Screenshot) */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8 lg:px-9 lg:pb-7 flex items-end justify-between gap-6 text-[#F7F4ED]">
              {/* Left Series Metadata */}
              <div className="max-w-[70%]">
                <p
                  aria-live="polite"
                  className="text-[11.5px] sm:text-[12.5px] tracking-[0.06em] uppercase font-normal text-[#F7F4ED]"
                >
                  {currentSlide.seriesTitle}
                </p>
                <div className="mt-2.5 sm:mt-3 text-[11px] sm:text-[11.5px] leading-[1.35] tracking-[0.05em] uppercase text-[#F7F4ED]/85 tabular-nums">
                  <p>{currentSlide.year}</p>
                  <p>{currentSlide.workType}</p>
                </div>
              </div>

              {/* Right Counter & Slim Gallery Arrows */}
              <div className="w-[116px] sm:w-[126px] shrink-0">
                <div
                  aria-live="polite"
                  className="text-[12px] sm:text-[12.5px] tracking-[0.06em] text-[#F7F4ED] tabular-nums pb-2.5"
                >
                  {formatSlideCounter(currentIndex, HERO_SLIDES.length)}
                </div>

                <div className="w-full h-[1px] bg-[#F7F4ED]/35 mb-1" />

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleStep('prev')}
                    aria-label="Previous featured photograph"
                    className="group/btn min-h-[44px] min-w-[44px] -ml-1 flex items-center justify-start text-[#F7F4ED]/80 hover:text-[#F7F4ED] active:scale-95 transition-all"
                  >
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 24 12"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover/btn:-translate-x-1"
                    >
                      <path
                        d="M23 6H2M2 6L6.5 1.5M2 6L6.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStep('next')}
                    aria-label="Next featured photograph"
                    className="group/btn min-h-[44px] min-w-[44px] -mr-1 flex items-center justify-end text-[#F7F4ED]/80 hover:text-[#F7F4ED] active:scale-95 transition-all"
                  >
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 24 12"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    >
                      <path
                        d="M1 6H22M22 6L17.5 1.5M22 6L17.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </svg>
                  </button>
                </div>
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
    <file path="src/app/(inesvale)/inesvale/components/InquireSection.tsx">
<![CDATA[import React, { useState } from 'react';
import {
  InquiryFormInput,
  InquiryValidationErrors,
  validateInquiryForm,
  buildInquiryMailtoUrl
} from '../utils/portfolioLogic';

interface InquireSectionProps {
  onNavigate: (sectionId: string) => void;
}

const PROJECT_TYPES = [
  'Editorial Commission',
  'Fine Art Print Acquisition',
  'Architectural Monograph',
  'Exhibition / Curatorial Loan',
  'Personal Portrait Sitting'
];

export const InquireSection: React.FC<InquireSectionProps> = ({ onNavigate }) => {
  const [formState, setFormState] = useState<InquiryFormInput>({
    name: '',
    email: '',
    projectType: 'Editorial Commission',
    timeline: '',
    message: ''
  });
  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [draftUrl, setDraftUrl] = useState<string | null>(null);

  const handleFieldChange = (
    field: keyof InquiryFormInput,
    value: string
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof InquiryValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setDraftUrl(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateInquiryForm(formState);
    if (!validation.valid) {
      setErrors(validation.errors);
      setDraftUrl(null);
      return;
    }
    setErrors({});
    const mailto = buildInquiryMailtoUrl(formState);
    setDraftUrl(mailto);
    // Trigger native mailto draft cleanly without window.open popup blocking
    window.location.href = mailto;
  };

  const currentYear = 2026;

  return (
    <footer
      id="inquire"
      aria-labelledby="inquire-heading"
      className="w-full px-5 sm:px-8 lg:px-14 pt-20 lg:pt-28 pb-14 border-t border-[#BFB7AC] bg-[#F2ECE0]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 pb-20 border-b border-[#BFB7AC]">
        {/* Left Closing Editorial Call */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <p className="text-[11px] tracking-[0.08em] uppercase text-[#79756F] mb-4 tabular-nums">
              07 — INQUIRE & CORRESPONDENCE
            </p>
            <h2
              id="inquire-heading"
              className="font-serif-editorial text-4xl sm:text-5xl lg:text-[62px] font-normal tracking-[-0.02em] text-[#201C19] leading-[0.96] uppercase"
              style={{ textWrap: 'balance' }}
            >
              LET&apos;S MAKE SOMETHING WORTH REMEMBERING.
            </h2>

            <div className="mt-5 mb-8" aria-hidden="true">
              <div className="w-16 h-[3px] bg-[#A65D46]" />
            </div>

            <p className="text-[15.5px] leading-[1.6] text-[#201C19]/85 max-w-[430px]">
              For editorial assignments, monograph collaborations, or signed archival pigment prints from the collection, prepare a correspondence draft below or write directly to the studio.
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-[#BFB7AC]/70 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[13px]">
            <div>
              <p className="text-[10.5px] tracking-[0.08em] uppercase text-[#79756F] mb-1">
                DIRECT STUDIO DESK
              </p>
              <a
                href="mailto:studio@inesvale.studio"
                className="ink-link text-[#201C19] font-medium"
              >
                studio@inesvale.studio
              </a>
              <p className="text-[#79756F] mt-1">Lisbon · Rua da Escola Politécnica</p>
            </div>

            <div>
              <p className="text-[10.5px] tracking-[0.08em] uppercase text-[#79756F] mb-1">
                PRINT EDITIONS & LICENSING
              </p>
              <p className="text-[#201C19]">Archival Cotton Rag · Editions of 7 + 2 AP</p>
              <p className="text-[#79756F] mt-1">Certificate of Authenticity included</p>
            </div>
          </div>
        </div>

        {/* Right Honest Inquiry Form -> Pre-filled Mailto Draft */}
        <div className="lg:col-span-6 bg-[#F7F4ED] border border-[#BFB7AC] p-6 sm:p-10">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#BFB7AC]/60 pb-3">
              <span className="text-[11px] tracking-[0.08em] uppercase text-[#201C19]">
                STUDIO INQUIRY SHEET
              </span>
              <span className="text-[10.5px] tracking-[0.06em] uppercase text-[#79756F]">
                PRE-FILLED EMAIL DRAFT
              </span>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="inquiry-name"
                className="block text-[11px] tracking-[0.07em] uppercase text-[#201C19] mb-2"
              >
                YOUR NAME OR STUDIO *
              </label>
              <input
                id="inquiry-name"
                name="name"
                type="text"
                required
                value={formState.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                placeholder="e.g. Clara Mendes / Atelier Sul"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
                className="w-full bg-transparent border-b border-[#BFB7AC] focus:border-[#A65D46] py-2.5 text-[15px] text-[#201C19] placeholder:text-[#79756F]/60 focus:outline-none transition-colors"
              />
              {errors.name && (
                <p
                  id="inquiry-name-error"
                  role="alert"
                  className="mt-1.5 text-[12px] text-[#A65D46]"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="inquiry-email"
                className="block text-[11px] tracking-[0.07em] uppercase text-[#201C19] mb-2"
              >
                RETURN EMAIL ADDRESS *
              </label>
              <input
                id="inquiry-email"
                name="email"
                type="email"
                required
                value={formState.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                placeholder="name@publication.org"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
                className="w-full bg-transparent border-b border-[#BFB7AC] focus:border-[#A65D46] py-2.5 text-[15px] text-[#201C19] placeholder:text-[#79756F]/60 focus:outline-none transition-colors"
              />
              {errors.email && (
                <p
                  id="inquiry-email-error"
                  role="alert"
                  className="mt-1.5 text-[12px] text-[#A65D46]"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Project Type & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="inquiry-type"
                  className="block text-[11px] tracking-[0.07em] uppercase text-[#201C19] mb-2"
                >
                  NATURE OF INQUIRY *
                </label>
                <select
                  id="inquiry-type"
                  name="projectType"
                  value={formState.projectType}
                  onChange={(e) => handleFieldChange('projectType', e.target.value)}
                  className="w-full bg-[#F7F4ED] border-b border-[#BFB7AC] focus:border-[#A65D46] py-2.5 text-[14.5px] text-[#201C19] focus:outline-none"
                >
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="inquiry-timeline"
                  className="block text-[11px] tracking-[0.07em] uppercase text-[#201C19] mb-2"
                >
                  PROPOSED TIMELINE / EDITION
                </label>
                <input
                  id="inquiry-timeline"
                  name="timeline"
                  type="text"
                  value={formState.timeline}
                  onChange={(e) => handleFieldChange('timeline', e.target.value)}
                  placeholder="e.g. Winter 2026 / Plate I"
                  className="w-full bg-transparent border-b border-[#BFB7AC] focus:border-[#A65D46] py-2.5 text-[15px] text-[#201C19] placeholder:text-[#79756F]/60 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="inquiry-message"
                className="block text-[11px] tracking-[0.07em] uppercase text-[#201C19] mb-2"
              >
                PROJECT NOTES OR PRINT SPECIFICATION *
              </label>
              <textarea
                id="inquiry-message"
                name="message"
                rows={4}
                required
                value={formState.message}
                onChange={(e) => handleFieldChange('message', e.target.value)}
                placeholder="Share location, publication context, or archival plate number..."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
                className="w-full bg-transparent border-b border-[#BFB7AC] focus:border-[#A65D46] py-2 text-[15px] text-[#201C19] placeholder:text-[#79756F]/60 focus:outline-none transition-colors resize-y"
              />
              {errors.message && (
                <p
                  id="inquiry-message-error"
                  role="alert"
                  className="mt-1.5 text-[12px] text-[#A65D46]"
                >
                  {errors.message}
                </p>
              )}
            </div>

            {/* Honest Mailto Action */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                type="submit"
                className="min-h-[46px] px-7 py-3 bg-[#201C19] text-[#F2ECE0] hover:bg-[#A65D46] text-[12px] tracking-[0.08em] uppercase transition-colors whitespace-nowrap shrink-0"
              >
                OPEN EMAIL DRAFT ↗
              </button>
              <span className="text-[11.5px] text-[#79756F]">
                Opens your default mail client with a formatted inquiry to studio@inesvale.studio.
              </span>
            </div>

            {/* Prepared Mailto Link Confirmation Box */}
            {draftUrl && (
              <div
                role="status"
                aria-live="polite"
                className="mt-4 p-4 border border-[#A65D46]/60 bg-[#F2ECE0] text-[13px] text-[#201C19] space-y-2"
              >
                <p className="font-medium text-[#201C19]">
                  Email draft prepared for {formState.name} ({formState.projectType}).
                </p>
                <p className="text-[12px] text-[#79756F]">
                  If your mail client did not launch automatically, use the direct link below:
                </p>
                <a
                  href={draftUrl}
                  className="inline-block text-[11.5px] tracking-[0.07em] uppercase text-[#A65D46] underline"
                >
                  LAUNCH MAILTO DRAFT FOR STUDIO@INESVALE.STUDIO ↗
                </a>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Footer Colophon */}
      <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-[11.5px] tracking-[0.05em] uppercase text-[#79756F]">
        <div className="flex items-center gap-3 tabular-nums">
          <span className="font-serif-editorial text-lg text-[#201C19] tracking-tight">
            INES VALE
          </span>
          <span aria-hidden="true">·</span>
          <span>© {currentYear} INES VALE STUDIO</span>
        </div>

        <nav aria-label="Footer Anchor Navigation" className="flex flex-wrap items-center gap-6">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('hero');
            }}
            className="ink-link text-[#201C19]/80 hover:text-[#201C19]"
          >
            TOP ↑
          </a>
          <a
            href="#stories"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('stories');
            }}
            className="ink-link text-[#201C19]/80 hover:text-[#201C19]"
          >
            STORIES
          </a>
          <a
            href="#archive"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('archive');
            }}
            className="ink-link text-[#201C19]/80 hover:text-[#201C19]"
          >
            ARCHIVE
          </a>
          <a
            href="#closer-look"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('closer-look');
            }}
            className="ink-link text-[#201C19]/80 hover:text-[#201C19]"
          >
            METHOD
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('about');
            }}
            className="ink-link text-[#201C19]/80 hover:text-[#201C19]"
          >
            ARTIST
          </a>
          <a
            href="#notes"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('notes');
            }}
            className="ink-link text-[#201C19]/80 hover:text-[#201C19]"
          >
            NOTES
          </a>
        </nav>
      </div>
    </footer>
  );
};
]]>
    </file>
    <file path="src/app/(inesvale)/inesvale/components/LightboxModal.tsx">
<![CDATA[import React, { useEffect, useRef } from 'react';
import { ArchivePhoto } from '../data/portfolioData';
import { formatSlideCounter, getNextSlideIndex } from '../utils/portfolioLogic';

interface LightboxModalProps {
  photos: ArchivePhoto[];
  currentIndex: number;
  onClose: () => void;
  onChangeIndex: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  onClose,
  onChangeIndex
}) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const photo = photos[currentIndex];

  useEffect(() => {
    closeButtonRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onChangeIndex(getNextSlideIndex(currentIndex, photos.length, 'next'));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onChangeIndex(getNextSlideIndex(currentIndex, photos.length, 'prev'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, photos.length, onClose, onChangeIndex]);

  if (!photo) return null;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      onChangeIndex(
        getNextSlideIndex(currentIndex, photos.length, delta < 0 ? 'next' : 'prev')
      );
    }
    touchStartX.current = null;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Archival Lightbox — ${photo.title}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-50 bg-[#141210]/95 text-[#F2ECE0] flex flex-col justify-between p-5 sm:p-8 lg:p-12"
    >
      {/* Top Lightbox Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[#F2ECE0]/20 pb-4">
        <div className="flex items-center gap-3 text-[11.5px] tracking-[0.08em] uppercase tabular-nums">
          <span className="text-[#A65D46]">{photo.plateNumber}</span>
          <span aria-hidden="true">·</span>
          <span>{photo.series}</span>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <span className="hidden sm:inline text-[#F2ECE0]/65">{photo.location}</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-[12px] tracking-[0.06em] tabular-nums text-[#F2ECE0]/80">
            {formatSlideCounter(currentIndex, photos.length)}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close lightbox viewer"
            className="min-h-[44px] px-3 py-1.5 text-[11.5px] tracking-[0.08em] uppercase border border-[#F2ECE0]/35 hover:border-[#A65D46] hover:text-[#A65D46] transition-colors"
          >
            CLOSE [ESC] ✕
          </button>
        </div>
      </div>

      {/* Center Image Stage */}
      <div className="relative my-auto py-6 flex items-center justify-center max-h-[72vh]">
        <img
          key={photo.id}
          src={photo.src}
          alt={photo.alt}
          referrerPolicy="no-referrer"
          className="max-h-[68vh] w-auto max-w-full object-contain select-none shadow-2xl"
        />
      </div>

      {/* Bottom Caption & Prev/Next Controls */}
      <div className="border-t border-[#F2ECE0]/20 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#F2ECE0] font-normal">
            {photo.title}
          </h3>
          <p className="text-[13.5px] text-[#F2ECE0]/75 mt-0.5">
            {photo.caption}{' '}
            <span className="text-[#F2ECE0]/50 uppercase text-[11px] tracking-[0.06em] ml-2 tabular-nums">
              [{photo.exif}]
            </span>
          </p>
        </div>

        <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
          <button
            type="button"
            onClick={() =>
              onChangeIndex(getNextSlideIndex(currentIndex, photos.length, 'prev'))
            }
            aria-label="Previous plate"
            className="min-h-[44px] px-4 py-2 border border-[#F2ECE0]/30 hover:border-[#F2ECE0] text-[12px] tracking-[0.07em] uppercase transition-colors"
          >
            ← PREV
          </button>
          <button
            type="button"
            onClick={() =>
              onChangeIndex(getNextSlideIndex(currentIndex, photos.length, 'next'))
            }
            aria-label="Next plate"
            className="min-h-[44px] px-4 py-2 border border-[#F2ECE0]/30 hover:border-[#F2ECE0] text-[12px] tracking-[0.07em] uppercase transition-colors"
          >
            NEXT →
          </button>
        </div>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(inesvale)/inesvale/components/NotesSection.tsx">
<![CDATA[import React from 'react';
import { JOURNAL_NOTES, JournalNote } from '../data/portfolioData';

interface NotesSectionProps {
  onSelectNote: (note: JournalNote) => void;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ onSelectNote }) => {
  const leadNote = JOURNAL_NOTES[0];
  const secondaryNotes = JOURNAL_NOTES.slice(1);

  return (
    <section
      id="notes"
      aria-labelledby="notes-heading"
      className="w-full px-5 sm:px-8 lg:px-14 py-20 lg:py-28 border-t border-[#BFB7AC]"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-[#BFB7AC]">
        <div>
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#79756F] mb-3 tabular-nums">
            06 — NOTES & FIELD JOURNAL
          </p>
          <h2
            id="notes-heading"
            className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.02em] text-[#201C19] leading-[0.98]"
          >
            DARKROOM & FIELD NOTES.
          </h2>
        </div>
        <p className="text-[14.5px] sm:text-[15.5px] leading-[1.55] text-[#201C19]/80 max-w-[390px]">
          Short essays on metering for fog, studio silence, lime architecture, and sequencing photographs on physical paper.
        </p>
      </div>

      {/* Editorial Asymmetric Broadsheet Layout (Lead Note + 3 Indexed Entries) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-12">
        {/* Left Featured Essay */}
        <article className="lg:col-span-6 flex flex-col justify-between bg-[#F7F4ED] border border-[#BFB7AC]/70 p-6 sm:p-8">
          <div>
            <div className="flex items-center justify-between text-[11px] tracking-[0.07em] uppercase text-[#79756F] pb-4 tabular-nums">
              <span className="text-[#A65D46]">{leadNote.issueNumber}</span>
              <span>
                {leadNote.date} · {leadNote.readTime}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onSelectNote(leadNote)}
              aria-label={`Read journal note: ${leadNote.title}`}
              className="group relative aspect-[16/10] w-full overflow-hidden bg-[#D8D0C5] block text-left"
            >
              <img
                src={leadNote.image}
                alt={leadNote.alt}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </button>

            <h3 className="mt-6 font-serif-editorial text-3xl sm:text-4xl font-normal text-[#201C19] leading-[1.08]">
              <button
                type="button"
                onClick={() => onSelectNote(leadNote)}
                className="text-left hover:text-[#A65D46] transition-colors"
              >
                {leadNote.title}
              </button>
            </h3>

            <p className="mt-3 text-[15px] leading-[1.6] text-[#201C19]/80">
              {leadNote.excerpt}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#BFB7AC]/60 flex items-center justify-between">
            <span className="text-[11.5px] text-[#79756F]">{leadNote.subtitle}</span>
            <button
              type="button"
              onClick={() => onSelectNote(leadNote)}
              className="group inline-flex items-center gap-2 text-[12px] tracking-[0.07em] uppercase text-[#201C19] min-h-[44px] whitespace-nowrap shrink-0"
            >
              <span className="ink-link">READ NOTE</span>
              <span
                aria-hidden="true"
                className="inline-block text-[#A65D46] transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          </div>
        </article>

        {/* Right Stacked Editorial Index */}
        <div className="lg:col-span-6 divide-y divide-[#BFB7AC] flex flex-col justify-between">
          {secondaryNotes.map((note) => (
            <article
              key={note.id}
              className="py-6 first:pt-0 last:pb-0 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center group"
            >
              <div className="sm:col-span-4">
                <button
                  type="button"
                  onClick={() => onSelectNote(note)}
                  aria-label={`Read journal note: ${note.title}`}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#D8D0C5] block"
                >
                  <img
                    src={note.image}
                    alt={note.alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </button>
              </div>

              <div className="sm:col-span-8 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-[11px] tracking-[0.06em] uppercase text-[#79756F] tabular-nums">
                  <span className="text-[#A65D46]">{note.issueNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{note.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{note.readTime}</span>
                </div>

                <h3 className="mt-1.5 font-serif-editorial text-2xl sm:text-[26px] font-normal text-[#201C19] leading-[1.12]">
                  <button
                    type="button"
                    onClick={() => onSelectNote(note)}
                    className="text-left group-hover:text-[#A65D46] transition-colors"
                  >
                    {note.title}
                  </button>
                </h3>

                <p className="mt-2 text-[14px] leading-[1.55] text-[#201C19]/80 line-clamp-2">
                  {note.excerpt}
                </p>

                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => onSelectNote(note)}
                    className="inline-flex items-center gap-1.5 text-[11.5px] tracking-[0.07em] uppercase text-[#201C19]"
                  >
                    <span className="ink-link">READ ESSAY</span>
                    <span
                      aria-hidden="true"
                      className="inline-block text-[#A65D46] transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </button>
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
    <file path="src/app/(inesvale)/inesvale/components/SelectedStoriesSection.tsx">
<![CDATA[import React from 'react';
import { SELECTED_STORIES, StoryItem } from '../data/portfolioData';

interface SelectedStoriesSectionProps {
  onOpenStory: (story: StoryItem, initialImageIndex?: number) => void;
}

export const SelectedStoriesSection: React.FC<SelectedStoriesSectionProps> = ({
  onOpenStory
}) => {
  return (
    <section
      id="stories"
      aria-labelledby="stories-heading"
      className="w-full px-5 sm:px-8 lg:px-14 py-20 lg:py-28 border-t border-[#BFB7AC]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 lg:pb-20 border-b border-[#BFB7AC]/70">
        <div>
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#79756F] mb-3 tabular-nums">
            02 — SELECTED STORIES
          </p>
          <h2
            id="stories-heading"
            className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.02em] text-[#201C19] leading-[0.98]"
          >
            SEQUENCED MONOGRAPHS.
          </h2>
        </div>
        <p className="text-[14.5px] sm:text-[15.5px] leading-[1.55] text-[#201C19]/80 max-w-[410px]">
          Long-form photographic chapters made on medium- and large-format film across Atlantic coastlines and quiet domestic rooms.
        </p>
      </div>

      {/* Alternating Editorial Story Spreads (No Repeated Card Grids) */}
      <div className="divide-y divide-[#BFB7AC]">
        {SELECTED_STORIES.map((story, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <article
              key={story.id}
              aria-labelledby={`story-title-${story.id}`}
              className="py-16 lg:py-24"
            >
              {/* Top Story Metadata Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline mb-10 lg:mb-12">
                <div className="lg:col-span-2 flex items-baseline gap-3">
                  <span className="font-serif-editorial text-3xl sm:text-4xl text-[#A65D46] tabular-nums">
                    {story.number}
                  </span>
                  <span className="text-[11px] tracking-[0.08em] uppercase text-[#79756F] tabular-nums">
                    / {story.year}
                  </span>
                </div>

                <div className="lg:col-span-5">
                  <h3
                    id={`story-title-${story.id}`}
                    className="font-serif-editorial text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-[-0.02em] text-[#201C19] leading-[1.02]"
                  >
                    {story.title}
                  </h3>
                  <p className="mt-2 text-[12px] tracking-[0.04em] text-[#79756F]">
                    {story.locationMood}
                  </p>
                </div>

                <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col justify-between items-start sm:items-end lg:items-end gap-4">
                  <p className="text-[15px] leading-[1.55] text-[#201C19]/85 max-w-[430px] lg:text-right">
                    {story.summary}
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenStory(story, 0)}
                    className="group inline-flex items-center gap-2 text-[12px] tracking-[0.07em] uppercase text-[#201C19] min-h-[44px] pt-1"
                  >
                    <span className="ink-link font-medium">VIEW STORY</span>
                    <span
                      aria-hidden="true"
                      className="inline-block text-[#A65D46] transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </button>
                </div>
              </div>

              {/* Varied Multi-Image Editorial Spread */}
              {isEven ? (
                /* Spread Variant A: Wide Dominant Frame + Picture-in-Paper Diptych Side */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                  <div className="lg:col-span-7 flex flex-col">
                    <button
                      type="button"
                      onClick={() => onOpenStory(story, 0)}
                      aria-label={`View ${story.title} — ${story.images[0].caption}`}
                      className="group relative w-full aspect-[16/11] overflow-hidden bg-[#D8D0C5] text-left"
                    >
                      <img
                        src={story.images[0].src}
                        alt={story.images[0].alt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </button>
                    <div className="flex items-center justify-between pt-3 text-[11.5px] text-[#79756F]">
                      <span>{story.images[0].caption}</span>
                      <span className="uppercase tracking-[0.06em] tabular-nums">01 / 03</span>
                    </div>
                  </div>

                  {/* Picture-in-Paper Inset Treatment */}
                  <div className="lg:col-span-5 bg-[#F7F4ED] border border-[#BFB7AC]/60 p-6 sm:p-8 flex flex-col justify-between gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      {story.images.slice(1, 3).map((img, subIdx) => (
                        <div key={img.src} className="flex flex-col">
                          <button
                            type="button"
                            onClick={() => onOpenStory(story, subIdx + 1)}
                            aria-label={`View ${story.title} — ${img.caption}`}
                            className="group relative aspect-[4/5] w-full overflow-hidden bg-[#D8D0C5]"
                          >
                            <img
                              src={img.src}
                              alt={img.alt}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                            />
                          </button>
                          <span className="pt-2 text-[11px] text-[#79756F] leading-snug">
                            {img.caption}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-[#BFB7AC]/60 flex items-center justify-between gap-4 text-[11px] tracking-[0.05em] uppercase text-[#79756F]">
                      <span>{story.technicalSpecs}</span>
                      <button
                        type="button"
                        onClick={() => onOpenStory(story, 0)}
                        className="ink-link text-[#201C19] whitespace-nowrap shrink-0"
                      >
                        READ ESSAY (3 PLATES) ↗
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Spread Variant B: Asymmetric 3-Column Monograph Strip */
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-end">
                  <div className="md:col-span-4 bg-[#F7F4ED] border border-[#BFB7AC]/60 p-5 sm:p-6">
                    <button
                      type="button"
                      onClick={() => onOpenStory(story, 0)}
                      aria-label={`View ${story.title} — ${story.images[0].caption}`}
                      className="group relative aspect-[4/5] w-full overflow-hidden bg-[#D8D0C5] block"
                    >
                      <img
                        src={story.images[0].src}
                        alt={story.images[0].alt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </button>
                    <p className="pt-3 text-[11.5px] text-[#79756F]">
                      {story.images[0].caption}
                    </p>
                  </div>

                  <div className="md:col-span-5">
                    <button
                      type="button"
                      onClick={() => onOpenStory(story, 1)}
                      aria-label={`View ${story.title} — ${story.images[1].caption}`}
                      className="group relative aspect-[16/11] w-full overflow-hidden bg-[#D8D0C5] block"
                    >
                      <img
                        src={story.images[1].src}
                        alt={story.images[1].alt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </button>
                    <div className="flex items-center justify-between pt-3 text-[11.5px] text-[#79756F]">
                      <span>{story.images[1].caption}</span>
                      <span className="uppercase tracking-[0.06em] tabular-nums">02 / 03</span>
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <button
                      type="button"
                      onClick={() => onOpenStory(story, 2)}
                      aria-label={`View ${story.title} — ${story.images[2].caption}`}
                      className="group relative aspect-[4/5] w-full overflow-hidden bg-[#D8D0C5] block"
                    >
                      <img
                        src={story.images[2].src}
                        alt={story.images[2].alt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </button>
                    <p className="pt-3 text-[11.5px] text-[#79756F]">
                      {story.images[2].caption}
                    </p>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(inesvale)/inesvale/components/StoryDrawerModal.tsx">
<![CDATA[import React, { useEffect, useRef, useState } from 'react';
import { StoryItem, JournalNote } from '../data/portfolioData';

interface StoryDrawerModalProps {
  story: StoryItem | null;
  note: JournalNote | null;
  initialImageIndex?: number;
  onClose: () => void;
}

export const StoryDrawerModal: React.FC<StoryDrawerModalProps> = ({
  story,
  note,
  initialImageIndex = 0,
  onClose
}) => {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [activeImgIdx, setActiveImgIdx] = useState(initialImageIndex);

  useEffect(() => {
    setActiveImgIdx(initialImageIndex);
  }, [initialImageIndex, story]);

  useEffect(() => {
    if (!story && !note) return;
    closeBtnRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [story, note, onClose]);

  if (!story && !note) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={story ? `Story Monograph: ${story.title}` : `Journal Note: ${note?.title}`}
      className="fixed inset-0 z-50 bg-[#201C19]/60 backdrop-blur-[2px] flex justify-end"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#F2ECE0] text-[#201C19] h-full overflow-y-auto p-6 sm:p-10 lg:p-14 border-l border-[#BFB7AC] shadow-2xl flex flex-col justify-between"
      >
        {story ? (
          <div>
            {/* Story Header */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#BFB7AC]">
              <div className="flex items-center gap-3 text-[11px] tracking-[0.08em] uppercase text-[#79756F] tabular-nums">
                <span className="text-[#A65D46]">STORY {story.number}</span>
                <span aria-hidden="true">·</span>
                <span>{story.year}</span>
                <span aria-hidden="true">·</span>
                <span>{story.locationMood}</span>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close story monograph"
                className="min-h-[44px] px-3 py-1.5 text-[11px] tracking-[0.08em] uppercase border border-[#BFB7AC] hover:border-[#201C19] transition-colors"
              >
                CLOSE [ESC] ✕
              </button>
            </div>

            <h2 className="mt-8 font-serif-editorial text-4xl sm:text-5xl text-[#201C19] font-normal tracking-[-0.02em]">
              {story.title}
            </h2>
            <p className="mt-2 text-[12px] tracking-[0.06em] uppercase text-[#A65D46]">
              {story.technicalSpecs}
            </p>

            {/* Primary Selected Plate */}
            <div className="mt-8 bg-[#F7F4ED] border border-[#BFB7AC]/70 p-4 sm:p-6">
              <div className="aspect-[16/11] w-full overflow-hidden bg-[#D8D0C5]">
                <img
                  src={story.images[activeImgIdx]?.src || story.images[0].src}
                  alt={story.images[activeImgIdx]?.alt || story.images[0].alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-3 flex items-center justify-between text-[12px] text-[#79756F]">
                <span>{story.images[activeImgIdx]?.caption}</span>
                <span className="tabular-nums uppercase tracking-[0.06em]">
                  PLATE 0{activeImgIdx + 1} / 0{story.images.length}
                </span>
              </div>

              {/* Thumbnail Selector Strip */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#BFB7AC]/60">
                {story.images.map((img, idx) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveImgIdx(idx)}
                    aria-pressed={activeImgIdx === idx}
                    className={`text-left p-1.5 border transition-colors ${
                      activeImgIdx === idx
                        ? 'border-[#A65D46] bg-[#F2ECE0]'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-[#D8D0C5]">
                      <img
                        src={img.src}
                        alt={img.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Monograph Essay Prose */}
            <div className="mt-8 space-y-4 text-[16px] leading-[1.7] text-[#201C19]/90">
              {story.essay.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        ) : note ? (
          <div>
            {/* Note Header */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#BFB7AC]">
              <div className="flex items-center gap-3 text-[11px] tracking-[0.08em] uppercase text-[#79756F] tabular-nums">
                <span className="text-[#A65D46]">{note.issueNumber}</span>
                <span aria-hidden="true">·</span>
                <span>{note.date}</span>
                <span aria-hidden="true">·</span>
                <span>{note.readTime}</span>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close journal note"
                className="min-h-[44px] px-3 py-1.5 text-[11px] tracking-[0.08em] uppercase border border-[#BFB7AC] hover:border-[#201C19] transition-colors"
              >
                CLOSE [ESC] ✕
              </button>
            </div>

            <h2 className="mt-8 font-serif-editorial text-3xl sm:text-5xl text-[#201C19] font-normal leading-[1.06]">
              {note.title}
            </h2>
            <p className="mt-2 text-[14px] text-[#79756F]">{note.subtitle}</p>

            <div className="mt-8 aspect-[16/10] w-full overflow-hidden bg-[#D8D0C5]">
              <img
                src={note.image}
                alt={note.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-[#201C19]/90">
              {note.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-12 pt-6 border-t border-[#BFB7AC] flex items-center justify-between text-[11px] tracking-[0.07em] uppercase text-[#79756F]">
          <span>INES VALE — MONOGRAPH ARCHIVE</span>
          <button
            type="button"
            onClick={onClose}
            className="ink-link text-[#201C19]"
          >
            RETURN TO PORTFOLIO
          </button>
        </div>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(inesvale)/inesvale/data/portfolioData.ts">
<![CDATA[export type ArchiveCategory = 'All' | 'Portraits' | 'Places' | 'Architecture' | 'Details';

export interface HeroSlide {
  id: string;
  indexNumber: number; // 1..6
  serialCode?: '01' | '02' | '03';
  seriesTitle: string;
  year: string;
  workType: string;
  image: string;
  alt: string;
  location: string;
  cameraNote: string;
}

export interface StoryItem {
  id: string;
  number: string;
  title: string;
  year: string;
  locationMood: string;
  layoutVariant: 'wide-lead' | 'paper-inset' | 'diptych-lead' | 'asymmetric-offset';
  summary: string;
  essay: string[];
  technicalSpecs: string;
  images: {
    src: string;
    alt: string;
    caption: string;
    aspect: 'portrait' | 'landscape' | 'wide';
  }[];
}

export interface ArchivePhoto {
  id: string;
  plateNumber: string;
  title: string;
  series: string;
  category: Exclude<ArchiveCategory, 'All'>;
  year: string;
  location: string;
  src: string;
  alt: string;
  caption: string;
  exif: string;
  spanClass: string;
  aspectClass: string;
}

export interface CloserLookStep {
  id: string;
  stepNumber: string;
  verb: 'OBSERVE' | 'WAIT' | 'REMEMBER';
  headline: string;
  reflection: string;
  technicalNote: string;
  image: string;
  secondaryImage: string;
  alt: string;
}

export interface JournalNote {
  id: string;
  issueNumber: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  readTime: string;
  image: string;
  alt: string;
  excerpt: string;
  paragraphs: string[];
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'quiet-coast-main',
    indexNumber: 1,
    seriesTitle: 'SERIES 04 — THE QUIET COAST',
    year: '2026',
    workType: 'PERSONAL WORK',
    image: '/templates/inesvale/quiet-coast-01.webp',
    alt: 'Solitary figure in a dark rust coat standing on a misty slate-blue ocean shoreline at dusk',
    location: 'North Atlantic Littoral, 57°N',
    cameraNote: 'Hasselblad 500C/M · 80mm f/2.8 · Kodak Portra 400'
  },
  {
    id: 'serial-01-portrait',
    indexNumber: 2,
    serialCode: '01',
    seriesTitle: 'SERIES 01 — INTIMATE SHADOWS',
    year: '2026',
    workType: 'PORTRAIT STUDY',
    image: '/templates/inesvale/portrait-study-01.webp',
    alt: 'Intimate low-key portrait of a woman in dark studio light with hand raised near her face',
    location: 'Lisbon North-Light Studio',
    cameraNote: 'Leica M6 · 50mm Summilux · Kodak Portra 800'
  },
  {
    id: 'serial-02-architecture',
    indexNumber: 3,
    serialCode: '02',
    seriesTitle: 'SERIES 02 — MONOLITH & SALT',
    year: '2025',
    workType: 'ARCHITECTURAL STUDY',
    image: '/templates/inesvale/architecture-01.webp',
    alt: 'Minimalist pale geometric coastal concrete architecture under a muted blue-gray sky',
    location: 'Algarve Chalk Coast',
    cameraNote: 'Mamiya 7II · 65mm f/4 · Fujifilm Pro 400H'
  },
  {
    id: 'serial-03-shoreline',
    indexNumber: 4,
    serialCode: '03',
    seriesTitle: 'SERIES 04 — THE QUIET COAST II',
    year: '2026',
    workType: 'PERSONAL WORK',
    image: '/templates/inesvale/quiet-coast-02.webp',
    alt: 'High-angle photograph of a curved dark wet sand beach meeting foaming slate-blue tide in fog',
    location: 'Vík Black Sand Spit',
    cameraNote: 'Hasselblad 500C/M · 150mm f/4 · Kodak Portra 400'
  },
  {
    id: 'soft-distances-main',
    indexNumber: 5,
    seriesTitle: 'SERIES 03 — SOFT DISTANCES',
    year: '2025',
    workType: 'EDITORIAL monograph',
    image: '/templates/inesvale/distance-01.webp',
    alt: 'Misty coastal headlands and sea stacks veiled in dense silver-blue marine fog',
    location: 'Faroe Islands, Late October',
    cameraNote: 'Pentax 67 · 105mm f/2.4 · Ilford Delta 400'
  },
  {
    id: 'common-silences-main',
    indexNumber: 6,
    seriesTitle: 'SERIES 05 — COMMON SILENCES',
    year: '2026',
    workType: 'STILL LIFE STUDY',
    image: '/templates/inesvale/still-life-01.webp',
    alt: 'Matte unglazed stoneware vessel resting on a warm travertine plinth in soft side window light',
    location: 'Porto Atelier, Winter Light',
    cameraNote: 'Chamonix 4x5 · 150mm Symmar · Kodak Ektar 100'
  }
];

export const CONTACT_SHEET_THUMBNAILS = [
  {
    serial: '01' as const,
    slideIndex: 1,
    label: 'SERIAL',
    image: '/templates/inesvale/portrait-study-01.webp',
    alt: 'Serial 01 — Intimate portrait study in low-key warm light'
  },
  {
    serial: '02' as const,
    slideIndex: 2,
    label: 'SERIAL',
    image: '/templates/inesvale/architecture-01.webp',
    alt: 'Serial 02 — Minimalist pale coastal architecture'
  },
  {
    serial: '03' as const,
    slideIndex: 3,
    label: 'SERIAL',
    image: '/templates/inesvale/quiet-coast-02.webp',
    alt: 'Serial 03 — Curved dark wet shoreline disappearing into fog'
  }
];

export const SELECTED_STORIES: StoryItem[] = [
  {
    id: 'the-quiet-coast',
    number: '01',
    title: 'THE QUIET COAST',
    year: '2026',
    locationMood: 'North Atlantic · Marine Twilight & Wet Basalt',
    layoutVariant: 'wide-lead',
    summary:
      'Six weeks along the northern tide line during the winter solstice, waiting for the twenty-minute window when sea mist and dusk erase the horizon.',
    essay: [
      'Along the basalt beaches of the North Atlantic, winter light does not arrive so much as it briefly hesitates. Between three and four in the afternoon, the cloud ceiling drops until the ocean and sky share a single slate-gray density.',
      'Working exclusively on medium-format film with a tripod sunk into wet tidal sand, these frames were exposed at half-second shutter speeds. A solitary wool coat becomes the only warm anchor against miles of cold mineral water.',
      'The series asks what remains in a landscape when spectacle is stripped away—leaving only tide lines, damp air, and the quiet posture of waiting.'
    ],
    technicalSpecs: '120 Medium Format · Kodak Portra 400 pushed +1 · Natural Twilight',
    images: [
      {
        src: '/templates/inesvale/quiet-coast-01.webp',
        alt: 'Solitary figure in rust coat facing misty ocean horizon',
        caption: 'Plate I — Low tide before nightfall, 16:12 GMT.',
        aspect: 'portrait'
      },
      {
        src: '/templates/inesvale/quiet-coast-02.webp',
        alt: 'Curved dark volcanic beach and white foam',
        caption: 'Plate IV — Receding surf along the western spit.',
        aspect: 'portrait'
      },
      {
        src: '/templates/inesvale/quiet-coast-03.webp',
        alt: 'Wet sand reflection under dusk clouds',
        caption: 'Plate VI — Mirror film on wet tidal flats.',
        aspect: 'landscape'
      }
    ]
  },
  {
    id: 'soft-distances',
    number: '02',
    title: 'SOFT DISTANCES',
    year: '2025',
    locationMood: 'Western Headlands · Altitude, Fog & Scale',
    layoutVariant: 'paper-inset',
    summary:
      'An inquiry into human scale within immense coastal and mountain topographies where weather acts as a physical curtain.',
    essay: [
      'Distance in photography is rarely measured in meters; it is measured in atmospheric density. When sea fog rolls inland across high coastal pastures, a ridge three hundred meters away reads like a memory.',
      'In Soft Distances, figures appear only at the threshold of legibility—never posing, never claiming the frame, merely passing through geological time.',
      'Printed on warm cotton rag paper, the highlights intentionally hold the cream tone of the sheet so the mist feels continuous with the page itself.'
    ],
    technicalSpecs: 'Pentax 67 · 105mm & 165mm Lenses · Silver Gelatin & Chromogenic Prints',
    images: [
      {
        src: '/templates/inesvale/distance-01.webp',
        alt: 'Misty coastal headlands and sea stacks veiled in fog',
        caption: 'Plate II — Sea mist crossing the headland at dawn.',
        aspect: 'wide'
      },
      {
        src: '/templates/inesvale/distance-02.webp',
        alt: 'Long-exposure ocean swell between dark coastal rocks',
        caption: 'Plate V — Four-second exposure in rising tide.',
        aspect: 'landscape'
      },
      {
        src: '/templates/inesvale/distance-03.webp',
        alt: 'Distant solitary figure on a misty mountain ridge',
        caption: 'Plate VIII — Ridge walker before rain.',
        aspect: 'wide'
      }
    ]
  },
  {
    id: 'after-the-light',
    number: '03',
    title: 'AFTER THE LIGHT',
    year: '2025',
    locationMood: 'Iberian Coast · Monolithic Lime, Shadow & Salt',
    layoutVariant: 'diptych-lead',
    summary:
      'Architectural fragments and quiet domestic thresholds photographed in the final hour after direct sunlight leaves the lime-washed walls.',
    essay: [
      'Mediterranean and Atlantic architecture is habitually photographed at high noon, when shadows are razor-sharp and theatrical. Yet buildings breathe most honestly twenty minutes after sunset.',
      'During that interval, whitewashed concrete and travertine absorb the slate blue of the upper sky while holding the last residual warmth of the day in recessed doorways.',
      'Each frame in After the Light treats walls and apertures as quiet sundials recording the end of an afternoon.'
    ],
    technicalSpecs: 'Mamiya 7II · 65mm f/4 · Unfiltered Daylight & Dusk Exposures',
    images: [
      {
        src: '/templates/inesvale/architecture-01.webp',
        alt: 'Minimalist pale concrete architecture against muted sky',
        caption: 'Plate I — Upper terrace volumes facing north.',
        aspect: 'portrait'
      },
      {
        src: '/templates/inesvale/architecture-02.webp',
        alt: 'Crisp diagonal sunlight and shadow across gridded white wall',
        caption: 'Plate III — Late equinox shadow across tiled facade.',
        aspect: 'landscape'
      },
      {
        src: '/templates/inesvale/after-light-01.webp',
        alt: 'Deep blue-hour ocean surface under pale horizon',
        caption: 'Plate VII — Sea horizon from the lower courtyard.',
        aspect: 'landscape'
      }
    ]
  },
  {
    id: 'common-silences',
    number: '04',
    title: 'COMMON SILENCES',
    year: '2026',
    locationMood: 'Porto & Lisbon · Studio Objects & Intimate Portraits',
    layoutVariant: 'asymmetric-offset',
    summary:
      'Portraits made without conversation and still lifes arranged from everyday stoneware, linen, and winter north light.',
    essay: [
      'A portrait changes character the moment the sitter stops preparing their expression for the lens. My studio sessions last three hours, though I rarely expose more than two rolls of ten frames.',
      'Between portraits, the camera turns toward the corner table: unglazed clay vessels, folded linen, a branch brought back from the estuary.',
      'Placed side by side, human gestures and inanimate objects share the same quiet gravity.'
    ],
    technicalSpecs: 'Hasselblad 500C/M & 4x5 Field Camera · North Window Illumination',
    images: [
      {
        src: '/templates/inesvale/portrait-study-01.webp',
        alt: 'Low-key portrait of woman with hand near hair in warm shadow',
        caption: 'Plate I — Clara, late November studio sitting.',
        aspect: 'portrait'
      },
      {
        src: '/templates/inesvale/still-life-01.webp',
        alt: 'Matte cream ceramic vase on travertine stone plinth',
        caption: 'Plate IV — Stoneware vessel on travertine block.',
        aspect: 'portrait'
      },
      {
        src: '/templates/inesvale/still-life-02.webp',
        alt: 'Handmade ceramic plates and bowls on weathered wood table',
        caption: 'Plate VI — Wheel-thrown ceramics in raking light.',
        aspect: 'landscape'
      }
    ]
  }
];

export const ARCHIVE_PHOTOS: ArchivePhoto[] = [
  {
    id: 'arch-01',
    plateNumber: 'PL. 01',
    title: 'Low Tide Watcher',
    series: 'The Quiet Coast',
    category: 'Places',
    year: '2026',
    location: 'North Atlantic',
    src: '/templates/inesvale/quiet-coast-01.webp',
    alt: 'Solitary person in a rust coat on a misty dark beach facing the sea',
    caption: 'Solitary figure in wool coat along the basalt tide line at dusk.',
    exif: '80mm · f/4 · 1/15s · Portra 400',
    spanClass: 'md:col-span-5',
    aspectClass: 'aspect-[4/5]'
  },
  {
    id: 'arch-02',
    plateNumber: 'PL. 02',
    title: 'Study in Chiaroscuro I',
    series: 'Common Silences',
    category: 'Portraits',
    year: '2026',
    location: 'Lisbon Studio',
    src: '/templates/inesvale/portrait-study-01.webp',
    alt: 'Low-key studio portrait of a woman against dark charcoal shadow',
    caption: 'Unstaged pause between frames under diffused north window light.',
    exif: '50mm · f/2 · 1/60s · Portra 800',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/5]'
  },
  {
    id: 'arch-03',
    plateNumber: 'PL. 03',
    title: 'Cantilever & Sky',
    series: 'After the Light',
    category: 'Architecture',
    year: '2025',
    location: 'Algarve',
    src: '/templates/inesvale/architecture-01.webp',
    alt: 'Minimalist white geometric architectural volumes under pale blue-gray sky',
    caption: 'Lime-washed geometric volumes photographed twenty minutes before dusk.',
    exif: '65mm · f/8 · 1/125s · Pro 400H',
    spanClass: 'md:col-span-3',
    aspectClass: 'aspect-[4/5]'
  },
  {
    id: 'arch-04',
    plateNumber: 'PL. 04',
    title: 'Headland Fog Curtain',
    series: 'Soft Distances',
    category: 'Places',
    year: '2025',
    location: 'Faroe Islands',
    src: '/templates/inesvale/distance-01.webp',
    alt: 'Misty coastal headlands and sea stacks veiled in fog',
    caption: 'Advancing marine layer erasing the western sea stacks.',
    exif: '105mm · f/5.6 · 1/30s · Delta 400',
    spanClass: 'md:col-span-7',
    aspectClass: 'aspect-[16/10]'
  },
  {
    id: 'arch-05',
    plateNumber: 'PL. 05',
    title: 'Travertine & Vessel',
    series: 'Common Silences',
    category: 'Details',
    year: '2026',
    location: 'Porto Atelier',
    src: '/templates/inesvale/still-life-01.webp',
    alt: 'Matte stoneware vase resting on a travertine plinth',
    caption: 'Unglazed stoneware vessel and botanical branch on cut travertine.',
    exif: '150mm · f/16 · 1/4s · Ektar 100',
    spanClass: 'md:col-span-5',
    aspectClass: 'aspect-[4/5]'
  },
  {
    id: 'arch-06',
    plateNumber: 'PL. 06',
    title: 'Equinox Facade Shadow',
    series: 'After the Light',
    category: 'Architecture',
    year: '2025',
    location: 'Porto',
    src: '/templates/inesvale/architecture-02.webp',
    alt: 'Diagonal patch of sunlight on a minimalist gridded white wall',
    caption: 'Forty-minute trapezoidal light projection across interior courtyard tile.',
    exif: '65mm · f/11 · 1/250s · Portra 160',
    spanClass: 'md:col-span-6',
    aspectClass: 'aspect-[4/3]'
  },
  {
    id: 'arch-07',
    plateNumber: 'PL. 07',
    title: 'Black Sand Littoral',
    series: 'The Quiet Coast',
    category: 'Places',
    year: '2026',
    location: 'Vík Shoreline',
    src: '/templates/inesvale/quiet-coast-02.webp',
    alt: 'Elevated view of curved dark beach and foaming slate-blue tide',
    caption: 'Tidal arc seen from the basalt bluff during incoming mist.',
    exif: '150mm · f/5.6 · 1/60s · Portra 400',
    spanClass: 'md:col-span-6',
    aspectClass: 'aspect-[4/5]'
  },
  {
    id: 'arch-08',
    plateNumber: 'PL. 08',
    title: 'Helena in Dusk Light',
    series: 'Common Silences',
    category: 'Portraits',
    year: '2025',
    location: 'Madrid',
    src: '/templates/inesvale/portrait-study-02.webp',
    alt: 'Close-up editorial portrait of a dark-haired woman against warm terracotta backdrop',
    caption: 'Late afternoon sitting on medium format, natural courtyard bounce.',
    exif: '110mm · f/2.8 · 1/60s · Portra 400',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/5]'
  },
  {
    id: 'arch-09',
    plateNumber: 'PL. 09',
    title: 'Stoneware Stack',
    series: 'Common Silences',
    category: 'Details',
    year: '2026',
    location: 'Alentejo Kiln',
    src: '/templates/inesvale/still-life-02.webp',
    alt: 'Handmade ceramic plates and bowls on rustic wooden table',
    caption: 'Mineral-glazed stoneware cooled after wood-kiln firing.',
    exif: '80mm · f/5.6 · 1/30s · Portra 400',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/3]'
  },
  {
    id: 'arch-10',
    plateNumber: 'PL. 10',
    title: 'Pleated Concrete Fold',
    series: 'After the Light',
    category: 'Architecture',
    year: '2025',
    location: 'Sines Coast',
    src: '/templates/inesvale/architecture-03.webp',
    alt: 'Abstract close-up of pale architectural pleats and soft tonal shadows',
    caption: 'Vertical concrete fluting under overcast winter sky.',
    exif: '90mm · f/11 · 1/60s · Pro 400H',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/5]'
  },
  {
    id: 'arch-11',
    plateNumber: 'PL. 11',
    title: 'Four-Second Swell',
    series: 'Soft Distances',
    category: 'Places',
    year: '2025',
    location: 'Basque Coast',
    src: '/templates/inesvale/distance-02.webp',
    alt: 'Long exposure ocean mist swirling around dark sea stacks',
    caption: 'Tidal channel photographed with a neutral-density glass filter at dusk.',
    exif: '80mm · f/16 · 4.0s · Delta 100',
    spanClass: 'md:col-span-6',
    aspectClass: 'aspect-[16/10]'
  },
  {
    id: 'arch-12',
    plateNumber: 'PL. 12',
    title: 'Ridge Figure at First Rain',
    series: 'Soft Distances',
    category: 'Places',
    year: '2025',
    location: 'Picos de Europa',
    src: '/templates/inesvale/distance-03.webp',
    alt: 'Tiny solitary person standing on a craggy mountain ridge in mist',
    caption: 'Solitary figure on limestone crest as low cloud fills the valley.',
    exif: '105mm · f/8 · 1/125s · Portra 400',
    spanClass: 'md:col-span-6',
    aspectClass: 'aspect-[16/10]'
  },
  {
    id: 'arch-13',
    plateNumber: 'PL. 13',
    title: 'Self-Timer in North Light',
    series: 'Studio Archive',
    category: 'Portraits',
    year: '2026',
    location: 'Lisbon',
    src: '/templates/inesvale/artist-portrait.webp',
    alt: 'Editorial portrait of Ines Vale in soft natural daylight',
    caption: 'Test frame from the winter monograph proof session.',
    exif: '80mm · f/2.8 · 1/60s · Portra 400',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/5]'
  },
  {
    id: 'arch-14',
    plateNumber: 'PL. 14',
    title: 'Quiet Room with Dried Grass',
    series: 'Common Silences',
    category: 'Details',
    year: '2025',
    location: 'Comporta',
    src: '/templates/inesvale/still-life-03.webp',
    alt: 'Minimalist interior corner with dried coastal grass and afternoon light',
    caption: 'Afternoon silence inside a lime-plastered writer’s cabin.',
    exif: '50mm · f/5.6 · 1/30s · Portra 160',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/3]'
  },
  {
    id: 'arch-15',
    plateNumber: 'PL. 15',
    title: 'Tidal Mirror at Last Light',
    series: 'The Quiet Coast',
    category: 'Places',
    year: '2026',
    location: 'Ovar Littoral',
    src: '/templates/inesvale/quiet-coast-03.webp',
    alt: 'Shallow wet sand reflecting twilight clouds along a quiet beach',
    caption: 'Thin sheet of receding tide holding the warm amber remnant of sunset.',
    exif: '80mm · f/5.6 · 1/15s · Portra 400',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/3]'
  }
];

export const CLOSER_LOOK_STEPS: CloserLookStep[] = [
  {
    id: 'step-observe',
    stepNumber: '01 / 03',
    verb: 'OBSERVE',
    headline: 'Before raising the viewfinder, read the weight of the air.',
    reflection:
      'Every place carries an acoustic and tonal signature before a lens is ever uncapped. I spend the first hour on location without exposing a frame—watching how mist settles against dark stone and where the eye naturally rests when nothing demands attention.',
    technicalNote: 'Incident meter reading · Uncoated 80mm glass · Patience before composition',
    image: '/templates/inesvale/quiet-coast-01.webp',
    secondaryImage: '/templates/inesvale/architecture-02.webp',
    alt: 'Solitary figure on misty shoreline under vast overcast sky'
  },
  {
    id: 'step-wait',
    stepNumber: '02 / 03',
    verb: 'WAIT',
    headline: 'Stillness arrives only after the obvious moment has passed.',
    reflection:
      'The decisive moment in editorial and landscape work is rarely a sudden action; it is the quiet exhale after movement subsides. When wind drops for three seconds or a sitter forgets the camera is present, the frame aligns.',
    technicalNote: 'Cable release · 1/4s to 4s shutter durations · Medium-format 6x6 negative',
    image: '/templates/inesvale/distance-02.webp',
    secondaryImage: '/templates/inesvale/portrait-study-01.webp',
    alt: 'Long exposure ocean mist swirling gently between dark coastal rocks'
  },
  {
    id: 'step-remember',
    stepNumber: '03 / 03',
    verb: 'REMEMBER',
    headline: 'A photograph is not a document of a place, but how it felt to stand there.',
    reflection:
      'In the darkroom and colour-grading suite, highlights are softened toward warm photographic paper while shadows retain mineral depth. The final print should feel like an half-remembered evening you have carried for years.',
    technicalNote: '310gsm Warm Cotton Rag · Hand-trimmed borders · Archival pigment & silver prints',
    image: '/templates/inesvale/quiet-coast-03.webp',
    secondaryImage: '/templates/inesvale/still-life-01.webp',
    alt: 'Wet tidal sand reflecting warm twilight clouds'
  }
];

export const JOURNAL_NOTES: JournalNote[] = [
  {
    id: 'note-winter-tides',
    issueNumber: 'NOTE NO. 14',
    title: 'On Metering for Fog and Wet Basalt',
    subtitle: 'Field notes from six weeks along the 57th parallel',
    date: 'October 2026',
    location: 'North Atlantic',
    readTime: '4 min read',
    image: '/templates/inesvale/quiet-coast-02.webp',
    alt: 'Curved dark volcanic shoreline meeting misty ocean tide',
    excerpt:
      'Why reflected-light meters misread sea mist, and how placing dark wet sand on Zone III preserves the quiet weight of overcast twilight.',
    paragraphs: [
      'When you point an internal camera meter at a wall of coastal fog, the instrument assumes the world is middle gray and underexposes by nearly two stops. The resulting negative turns luminous mist into muddy ash.',
      'Throughout the making of The Quiet Coast, I relied exclusively on an old selenium incident meter held toward the camera position, overexposing Portra 400 by two-thirds of a stop and pulling development slightly in the bath.',
      'That small calibration allows the wet volcanic sand to hold rich charcoal detail while the upper sky breathes like damp cotton paper.'
    ]
  },
  {
    id: 'note-north-window',
    issueNumber: 'NOTE NO. 13',
    title: 'The Architecture of a Three-Hour Sitting',
    subtitle: 'Why silence in the studio matters more than direction',
    date: 'August 2026',
    location: 'Lisbon Studio',
    readTime: '5 min read',
    image: '/templates/inesvale/portrait-study-01.webp',
    alt: 'Intimate low-key portrait in studio window light',
    excerpt:
      'Most portrait subjects arrive carrying a practiced mask. It takes ninety minutes of unhurried quiet for the shoulders to drop by half an inch.',
    paragraphs: [
      'In commercial photography, speed is treated as a virtue: forty frames a minute under strobe banks. Yet the human face under strobe light almost always registers a subtle defensive tension.',
      'In my Lisbon room, there is only one north-facing casement window and a heavy wool curtain to control falloff. We drink tea, listen to rain in the courtyard, and let the medium-format waist-level finder sit at chest height so I never hide behind a black camera body.',
      'The frame that survives into the archive is almost always exposed while the sitter believes we are pausing between takes.'
    ]
  },
  {
    id: 'note-lime-and-shadow',
    issueNumber: 'NOTE NO. 12',
    title: 'Lime Plaster as a Slow Photographic Emulsion',
    subtitle: 'Observing southern walls after sunset',
    date: 'May 2026',
    location: 'Algarve & Porto',
    readTime: '3 min read',
    image: '/templates/inesvale/architecture-02.webp',
    alt: 'Geometric white wall with diagonal natural shadow',
    excerpt:
      'Traditional lime-washed walls weather with salt air and rain, recording seasons with the same fidelity as silver gelatin paper.',
    paragraphs: [
      'Modern elastomeric paint seals a building in plastic; it looks identical in January and August until it peels. Lime wash, by contrast, is porous and mineral.',
      'When coastal humidity rises at dusk, lime plaster darkens subtly in tone, drinking in the ambient slate blue of the Atlantic sky. Photographing these surfaces requires treating the wall not as a geometric diagram, but as skin.'
    ]
  },
  {
    id: 'note-paper-permanence',
    issueNumber: 'NOTE NO. 11',
    title: 'Why Every Series Begins as a Sequenced Dummy Book',
    subtitle: 'Pacing, blank pages, and the weight of uncoated stock',
    date: 'February 2026',
    location: 'Porto Bindery',
    readTime: '4 min read',
    image: '/templates/inesvale/still-life-01.webp',
    alt: 'Ceramic vessel on travertine stone in quiet studio light',
    excerpt:
      'A single photograph is a chord; a sequence across folded signatures of warm paper is where rhythm and memory actually live.',
    paragraphs: [
      'Long before an exhibition is hung or a digital gallery is published, I print small 10×12cm work proofs and tape them into hand-sewn signatures of 120gsm ivory paper.',
      'Living with a physical dummy book on the studio table reveals immediately when two images are shouting over each other, or where a blank left-hand page is required so a quiet seascape can land with full emotional weight.'
    ]
  }
];

export const ARTIST_CREDITS = {
  note: 'Illustrative fictional portfolio credits curated for Ines Vale',
  exhibitions: [
    { year: '2026', title: 'The Quiet Coast (Solo Monograph Exhibition)', venue: 'Galeria da Calçada, Lisbon' },
    { year: '2025', title: 'Soft Distances & Other Silences', venue: 'Atelier Nordisk, Copenhagen' },
    { year: '2024', title: 'New Iberian Topography (Group)', venue: 'Fundación Piedra & Luz, Madrid' },
    { year: '2023', title: 'After the Light: Architectural Studies', venue: 'Fondazione Forma, Milan' }
  ],
  publications: [
    { year: '2026', title: 'The Quiet Coast — Hardcover Cloth Monograph (96 plates)', publisher: 'Vale & Quarto Press' },
    { year: '2025', title: 'Cahier No. 08: Atlantic Littoral', publisher: 'Éditions du Brume, Paris' },
    { year: '2024', title: 'Stillness in Medium Format', publisher: 'Koto Architectural Annual' }
  ]
};
]]>
    </file>
    <file path="src/app/(inesvale)/inesvale/utils/portfolioLogic.ts">
<![CDATA[import { ArchiveCategory, ArchivePhoto } from '../data/portfolioData';

export interface InquiryFormInput {
  name: string;
  email: string;
  projectType: string;
  timeline: string;
  message: string;
}

export interface InquiryValidationErrors {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

export interface InquiryValidationResult {
  valid: boolean;
  errors: InquiryValidationErrors;
}

export function getNextSlideIndex(
  currentIndex: number,
  total: number,
  direction: 'next' | 'prev'
): number {
  if (total <= 0) return 0;
  if (direction === 'next') {
    return (currentIndex + 1) % total;
  }
  return (currentIndex - 1 + total) % total;
}

export function formatSlideCounter(indexZeroBased: number, total: number): string {
  const safeCurrent = Math.max(1, Math.min(total, indexZeroBased + 1));
  const paddedCurrent = String(safeCurrent).padStart(2, '0');
  const paddedTotal = String(Math.max(1, total)).padStart(2, '0');
  return `${paddedCurrent} — ${paddedTotal}`;
}

export function filterArchivePhotos(
  photos: ArchivePhoto[],
  category: ArchiveCategory
): ArchivePhoto[] {
  if (category === 'All') {
    return photos;
  }
  return photos.filter((photo) => photo.category === category);
}

export function getCategoryCounts(
  photos: ArchivePhoto[]
): Record<ArchiveCategory, number> {
  const counts: Record<ArchiveCategory, number> = {
    All: photos.length,
    Portraits: 0,
    Places: 0,
    Architecture: 0,
    Details: 0
  };
  for (const photo of photos) {
    counts[photo.category] = (counts[photo.category] || 0) + 1;
  }
  return counts;
}

export function validateInquiryForm(input: InquiryFormInput): InquiryValidationResult {
  const errors: InquiryValidationErrors = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedType = input.projectType.trim();
  const trimmedMessage = input.message.trim();

  if (!trimmedName) {
    errors.name = 'Please share your name or studio.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!trimmedEmail) {
    errors.email = 'Please provide an email address for correspondence.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g. name@domain.com).';
  }

  if (!trimmedType) {
    errors.projectType = 'Please select the nature of your inquiry.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please include a brief note about your project or print inquiry.';
  } else if (trimmedMessage.length < 12) {
    errors.message = 'Please share a few more details (at least 12 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export function buildInquiryMailtoUrl(input: InquiryFormInput): string {
  const recipient = 'studio@inesvale.studio';
  const subject = `Commission / Archive Inquiry — ${input.projectType.trim()} (${input.name.trim()})`;
  const lines = [
    'Dear Ines Vale Studio,',
    '',
    input.message.trim(),
    '',
    '—',
    `Name: ${input.name.trim()}`,
    `Email: ${input.email.trim()}`,
    `Inquiry Type: ${input.projectType.trim()}`,
    `Preferred Timeline: ${input.timeline.trim() || 'Flexible / Open'}`
  ];
  const body = lines.join('\n');
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function computeCloserLookStep(
  progressZeroToOne: number,
  totalSteps: number
): { activeIndex: number; stepProgress: number } {
  const clamped = Math.max(0, Math.min(1, progressZeroToOne));
  if (totalSteps <= 1) {
    return { activeIndex: 0, stepProgress: clamped };
  }
  const scaled = clamped * totalSteps;
  const activeIndex = Math.min(totalSteps - 1, Math.floor(scaled));
  const stepProgress = Math.max(0, Math.min(1, scaled - activeIndex));
  return { activeIndex, stepProgress };
}
]]>
    </file>
  </files>
</template>
