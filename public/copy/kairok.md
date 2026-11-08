<template slug="kairok" name="KAIRO K">
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
    <file path="src/app/(kairok)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./kairok/kairok.css";

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "KAIRO K-01 — Concept Mirrorless Camera",
  description: "See beyond the expected. An interactive cinematic product experience and optical exploration for the fictional KAIRO K-01 mirrorless camera concept.",
  openGraph: {
    title: "KAIRO K-01 — Concept Mirrorless Camera",
    description: "See beyond the expected. An interactive cinematic product experience and optical exploration for the fictional KAIRO K-01 mirrorless camera concept.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#121315",
};

export default function KairokLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`js-ready ${plus_Jakarta_Sans.variable} scroll-smooth`}>
      <body className="bg-[#121315] text-[#f2efe9] antialiased selection:bg-[#e68f63]/30 selection:text-[#f2efe9]">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(kairok)/kairok/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(kairok)/kairok/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/kairok";

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
        className={`kairok-placeholder ${className ?? ""}`}
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
    <file path="src/app/(kairok)/kairok/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#121315" />
  <text x="32" y="42" font-family="system-ui, sans-serif" font-size="30" font-weight="bold" fill="#E68F63" text-anchor="middle">K</text>
</svg>
]]>
    </file>
    <file path="src/app/(kairok)/kairok/kairok.css">
<![CDATA[@import "tailwindcss";
@import "./styles/globals.css";
@import "./styles/cinematic-story.css";
@import "./styles/product-sections.css";
]]>
    </file>
    <file path="src/app/(kairok)/kairok/KairokApp.tsx">
<![CDATA['use client';
import React, { useCallback, useEffect, useState } from 'react';
import { CameraFinishId } from './lib/assets';
import { useReducedMotion } from './hooks/useReducedMotion';
import { SiteHeader } from './components/SiteHeader';
import { CinematicStory } from './components/CinematicStory';
import { OpticalLab } from './components/OpticalLab';
import { SensorDetail } from './components/SensorDetail';
import { PhotoFieldNotes } from './components/PhotoFieldNotes';
import { CollectionExplorer } from './components/CollectionExplorer';
import { WaitlistDialog } from './components/WaitlistDialog';
import { SiteFooter } from './components/SiteFooter';

const SECTION_IDS = ['experience', 'optics', 'engineering', 'gallery', 'collection'];

export default function KairokApp() {
  const systemReducedMotion = useReducedMotion();
  const [manualReducedMotion, setManualReducedMotion] = useState<boolean | null>(null);
  const reducedMotion =
    manualReducedMotion !== null ? manualReducedMotion : systemReducedMotion;

  const [activeSection, setActiveSection] = useState<string>('experience');
  const [selectedFinish, setSelectedFinish] = useState<CameraFinishId>('carbon');
  const [waitlistOpen, setWaitlistOpen] = useState<boolean>(false);

  // Track active chapter in top navigation via IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: 0.01,
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [reducedMotion]);

  const handleNavigate = useCallback(
    (sectionId: string) => {
      const target = document.getElementById(sectionId);
      if (!target) return;
      target.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      setActiveSection(sectionId);
    },
    [reducedMotion]
  );

  const handleOpenWaitlistWithFinish = useCallback((finish?: CameraFinishId) => {
    if (finish) {
      setSelectedFinish(finish);
    }
    setWaitlistOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#121315] text-[#f2efe9] selection:bg-[#e68f63]/30 selection:text-[#f2efe9]">
      <SiteHeader
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenWaitlist={() => handleOpenWaitlistWithFinish()}
      />

      <main>
        {/* Section A: 6-Beat Continuous Pinned Film Sequence */}
        <CinematicStory
          reducedMotion={reducedMotion}
          onJumpToSection={handleNavigate}
        />

        {/* Section B: Light & Lens Interactive Optical Lab */}
        <OpticalLab />

        {/* Section C: Precision / Exploded Engineering Studio */}
        <SensorDetail />

        {/* Section D: Photographic Field Notes & Exposure Curtain */}
        <PhotoFieldNotes />

        {/* Section E: Product Collection / Three-Finish Exploration */}
        <CollectionExplorer
          selectedFinish={selectedFinish}
          onSelectFinish={setSelectedFinish}
          onOpenWaitlist={(finish) => handleOpenWaitlistWithFinish(finish)}
        />
      </main>

      {/* Section F: Closing Quiet Invitation & Minimal Footer */}
      <SiteFooter
        onNavigate={handleNavigate}
        onOpenWaitlist={() => handleOpenWaitlistWithFinish()}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() =>
          setManualReducedMotion((prev) =>
            prev === null ? !systemReducedMotion : !prev
          )
        }
      />

      {/* Accessible Demo Waitlist Dialog */}
      <WaitlistDialog
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        preferredFinish={selectedFinish}
        onChangePreferredFinish={setSelectedFinish}
      />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(kairok)/kairok/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "KAIRO K-01 — Concept Mirrorless Camera";

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
          backgroundColor: "#121315",
          color: "#E68F63",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.08em" }}>
          <span>KAIRO K</span>
          <span style={{ color: "#E68F63" }}>/</span>
          <span style={{ fontSize: 18, opacity: 0.8 }}>LANDING TEMPLATE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: "bold", lineHeight: 1.1, maxWidth: 950 }}>
            KAIRO K-01 — Concept Mirrorless Camera
          </div>
          <div style={{ display: "flex", fontSize: 22, opacity: 0.75, maxWidth: 850 }}>
            See beyond the expected. An interactive cinematic product experience and optical exploration for the fictional KAIRO K-01 mirrorless camera concept.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.7 }}>
          <span>openlanding.page</span>
          <span style={{ color: "#E68F63" }}>Next.js 16 · React 19 · Tailwind v4</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
]]>
    </file>
    <file path="src/app/(kairok)/kairok/page.tsx">
<![CDATA["use client";

import KairokApp from "./KairokApp";

export default function KairokPage() {
  return <KairokApp />;
}
]]>
    </file>
    <file path="src/app/(kairok)/kairok/components/CameraHero.tsx">
<![CDATA['use client';
import React, { useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { KAIRO_ASSETS } from '../lib/assets';

export interface CameraHeroProps {
  heroOpacity: number;
  heroTranslateY: number;
  heroCutoutScale: number;
  heroCutoutOpacity: number;
  pointerOffset: { x: number; y: number };
  reducedMotion: boolean;
  onExploreScroll: () => void;
  onViewCamera: () => void;
}

export const CameraHero: React.FC<CameraHeroProps> = ({
  heroOpacity,
  heroTranslateY,
  heroCutoutScale,
  heroCutoutOpacity,
  pointerOffset,
  reducedMotion,
  onExploreScroll,
  onViewCamera,
}) => {
  const [cutoutFailed, setCutoutFailed] = useState(false);

  const visible = heroOpacity > 0.02;
  const parallaxX = reducedMotion ? 0 : pointerOffset.x * 10;
  const parallaxY = reducedMotion ? 0 : pointerOffset.y * 8;

  return (
    <div
      aria-hidden={!visible}
      style={{
        opacity: heroOpacity,
        pointerEvents: visible ? 'auto' : 'none',
      }}
      className="absolute inset-0 z-20 flex flex-col justify-between px-5 pt-16 pb-10 md:px-10 md:pt-20 lg:pb-20"
    >
      {/* Upper Editorial Headline Layer ( sits behind foreground camera cutout ) */}
      <div
        style={{
          transform: reducedMotion
            ? 'none'
            : `translate3d(${-parallaxX * 0.35}px, ${heroTranslateY}px, 0)`,
        }}
        className="relative z-10 mx-auto w-full max-w-[1360px] pt-1 text-center"
      >
        <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-mono-kairo tracking-[0.2em] text-[#e68f63] mb-2">
          <span className="whitespace-nowrap">KAIRO / K-01</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#f2efe9]/75 whitespace-nowrap">CONCEPT MIRRORLESS SYSTEM</span>
        </div>

        <h1
          style={{ textWrap: 'balance' }}
          className="font-display-kairo mx-auto max-w-[16ch] text-[clamp(2.25rem,5.1vw,4.65rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-[#f2efe9] drop-shadow-[0_10px_28px_rgba(0,0,0,0.75)]"
        >
          See beyond the expected.
        </h1>
      </div>

      {/* Foreground Chroma-Keyed Camera Cutout (layers subtly in front of lower headline stem at rest) */}
      {!cutoutFailed && heroCutoutOpacity > 0.02 && (
        <div
          aria-hidden="true"
          style={{
            opacity: heroCutoutOpacity,
            transform: reducedMotion
              ? 'none'
              : `translate3d(${parallaxX}px, ${parallaxY}px, 0) scale(${heroCutoutScale})`,
          }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
        >
          <img
            src={KAIRO_ASSETS.cameraCutout}
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setCutoutFailed(true)}
            className="h-full w-full object-cover select-none"
          />
          {/* Subtle copper specular glint along the optical barrel on initial reveal */}
          <div className="kairo-lens-glint absolute w-[28vw] max-w-[420px] aspect-square rounded-full border border-[#e68f63]/35 pointer-events-none" />
        </div>
      )}

      {/* Lower Supporting Proposition & Dual Intentional Actions */}
      <div
        style={{
          transform: reducedMotion
            ? 'none'
            : `translate3d(0, ${-heroTranslateY * 0.45}px, 0)`,
        }}
        className="relative z-30 mx-auto flex w-full max-w-[1360px] flex-col items-center justify-between gap-6 md:flex-row md:items-end"
      >
        <div className="max-w-md text-center md:text-left bg-[#121315]/70 backdrop-blur-md p-4 rounded-[2px] border border-[#f2efe9]/10">
          <p className="text-sm md:text-[15px] leading-relaxed text-[#f2efe9]/90">
            A camera that invites you to find more in the ordinary—light,
            atmosphere, texture, and moments that vanish when you blink.
          </p>
          <div className="mt-2 flex items-center justify-center md:justify-start gap-2 text-xs font-mono-kairo text-[#a8aaa9]">
            <span>01 / THE OBJECT</span>
            <span aria-hidden="true">·</span>
            <span>SCROLL TO ENTER THE LENS</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onExploreScroll}
            className="kairo-btn-primary group"
          >
            <span>Explore KAIRO</span>
            <ArrowDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>

          <button
            type="button"
            onClick={onViewCamera}
            className="kairo-btn-secondary group"
          >
            <span>View the camera</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(kairok)/kairok/components/CinematicStory.tsx">
<![CDATA['use client';
import React, { useRef, useState } from 'react';
import {
  CITY_HOTSPOTS,
  CityHotspot,
  FOCUS_EMPHASIS_MODES,
  FocusEmphasisMode,
  KAIRO_ASSETS,
} from '../lib/assets';
import { computeStoryState, STORY_BEATS, StoryBeatId } from '../lib/motion';
import { useFrameScrubber } from '../hooks/useFrameScrubber';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { CameraHero } from './CameraHero';
import { LensTunnel } from './LensTunnel';
import { CityFocusExplorer } from './CityFocusExplorer';

export interface CinematicStoryProps {
  reducedMotion: boolean;
  onJumpToSection: (sectionId: string) => void;
}

const BEAT_JUMP_TARGETS: { id: StoryBeatId; label: string; progress: number }[] = [
  { id: 'hero', label: '01 Object', progress: 0.0 },
  { id: 'approach', label: '02 Approach', progress: 0.19 },
  { id: 'aperture', label: '03 Aperture', progress: 0.37 },
  { id: 'arrival', label: '04 Arrival', progress: 0.56 },
  { id: 'field-notes', label: '05 Field Notes', progress: 0.76 },
];

export const CinematicStory: React.FC<CinematicStoryProps> = ({
  reducedMotion,
  onJumpToSection,
}) => {
  const trackRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [selectedHotspotId, setSelectedHotspotId] = useState<CityHotspot['id']>('light');
  const [focusMode, setFocusMode] = useState<FocusEmphasisMode>('balanced');
  const [pointerOffset, setPointerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const { progress, scrollToProgress } = useScrollProgress(trackRef, reducedMotion);
  const storyState = computeStoryState(progress);

  const { ready, usingVideoFallback } = useFrameScrubber(
    canvasRef,
    videoRef,
    storyState.sequenceFrame,
    storyState.videoTimeSec,
    reducedMotion
  );

  const activeFocusConfig =
    FOCUS_EMPHASIS_MODES.find((m) => m.id === focusMode) || FOCUS_EMPHASIS_MODES[0];

  const handlePointerMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion || storyState.heroOpacity <= 0.05) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
    const ny = ((event.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
    setPointerOffset({
      x: Math.max(-1, Math.min(1, nx)),
      y: Math.max(-1, Math.min(1, ny)),
    });
  };

  // Reduced Motion Accessible Static Experience: preserves all story beats, visuals & Field Notes hotspots without pinned scrubbing
  if (reducedMotion) {
    return (
      <section
        id="experience"
        aria-label="KAIRO K-01 Concept Introduction and Field Notes"
        className="bg-[#121315] text-[#f2efe9] pt-24 pb-16"
      >
        {/* Static Scene 1: Hero */}
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="relative overflow-hidden rounded-[2px] border border-[#f2efe9]/12 bg-[#16181c]">
            <img
              src={KAIRO_ASSETS.hero}
              alt="KAIRO K-01 mirrorless camera concept suspended in a dark studio with a copper-ringed lens"
              referrerPolicy="no-referrer"
              className="w-full h-[540px] md:h-[680px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121315] via-[#121315]/35 to-[#121315]/70 flex flex-col justify-between p-6 md:p-12">
              <div>
                <p className="font-mono-kairo text-xs tracking-[0.2em] text-[#e68f63]">
                  KAIRO / K-01 · 01 / THE OBJECT (REDUCED MOTION VIEW)
                </p>
                <h1 className="font-display-kairo mt-3 max-w-[16ch] text-4xl md:text-6xl font-semibold tracking-tight text-[#f2efe9]">
                  See beyond the expected.
                </h1>
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <p className="max-w-lg text-sm md:text-base text-[#f2efe9]/85">
                  A camera that invites you to find more in the ordinary—light,
                  atmosphere, texture, and moments that vanish when you blink.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('reduced-motion-field-notes');
                      el?.scrollIntoView({ behavior: 'auto' });
                    }}
                    className="kairo-btn-primary"
                  >
                    Explore Field Notes
                  </button>
                  <button
                    type="button"
                    onClick={() => onJumpToSection('collection')}
                    className="kairo-btn-secondary"
                  >
                    View the camera
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Static Scene 4 & 5: City Arrival & Interactive Field Notes */}
          <div
            id="reduced-motion-field-notes"
            className="mt-12 relative overflow-hidden rounded-[2px] border border-[#f2efe9]/15 bg-[#121315] min-h-[680px]"
          >
            <img
              src={KAIRO_ASSETS.city}
              alt="Rain-wet evening city street illuminated by warm storefront bulbs and distant traffic lights"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-10 min-h-[680px]">
              <CityFocusExplorer
                opacity={1}
                interactive={true}
                selectedHotspotId={selectedHotspotId}
                onSelectHotspot={setSelectedHotspotId}
                focusMode={focusMode}
                onChangeFocusMode={setFocusMode}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Standard Pinned Scroll-Scrubbed Cinematic Film Stage
  const showCityPosterHold = storyState.progress >= 0.62;

  return (
    <section
      id="experience"
      ref={trackRef}
      aria-label="KAIRO K-01 Interactive Optical Journey"
      onMouseMove={handlePointerMove}
      className="kairo-story-track"
    >
      <div className="kairo-story-sticky">
        {/* Layer 1: Exact first-frame poster fallback so first paint is instant */}
        <img
          src={KAIRO_ASSETS.videoFirst}
          alt="KAIRO K-01 concept camera front view in studio"
          referrerPolicy="no-referrer"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
        />

        {/* Layer 1B: 120-frame WebP Sequence Canvas Scrubber */}
        <canvas
          ref={canvasRef}
          data-testid="kairo-scrub-canvas"
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 h-full w-full block transition-opacity duration-200 ${
            ready && !usingVideoFallback ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Layer 1C: Coalesced <video> fallback scrubber ( always loaded for metadata & fallback ) */}
        <video
          ref={videoRef}
          src={KAIRO_ASSETS.flythrough}
          poster={KAIRO_ASSETS.videoFirst}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
            usingVideoFallback ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Layer 1D: Matched near-final frame city hold during Scene 5 Field Notes */}
        <img
          src={KAIRO_ASSETS.videoLast}
          alt="Rain-wet city street seen through the KAIRO K-01 aperture"
          referrerPolicy="no-referrer"
          style={{
            opacity: showCityPosterHold ? 1 : 0,
            filter:
              storyState.fieldNotesOpacity > 0.1 && activeFocusConfig.edgeBlurPx > 0
                ? `contrast(1.04)`
                : 'none',
          }}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 select-none"
        />

        {/* Focus Explorer optical emphasis vignette during Scene 5 */}
        {storyState.fieldNotesOpacity > 0.05 && (
          <div
            aria-hidden="true"
            style={{
              opacity: storyState.fieldNotesOpacity * activeFocusConfig.vignetteOpacity,
              background: `radial-gradient(circle 340px at ${activeFocusConfig.focalOriginX}% ${activeFocusConfig.focalOriginY}%, transparent 0%, rgba(12, 13, 15, 0.88) 100%)`,
            }}
            className="pointer-events-none absolute inset-0 z-10 transition-all duration-300"
          />
        )}

        {/* Subtle atmospheric scrim for text legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#121315]/55 via-transparent to-[#121315]/65"
        />

        {/* Layer 2 & 3: Scene 1 — THE OBJECT Hero Reveal & Keyed Foreground Camera Cutout */}
        <CameraHero
          heroOpacity={storyState.heroOpacity}
          heroTranslateY={storyState.heroTranslateY}
          heroCutoutScale={storyState.heroCutoutScale}
          heroCutoutOpacity={storyState.heroCutoutOpacity}
          pointerOffset={pointerOffset}
          reducedMotion={reducedMotion}
          onExploreScroll={() => scrollToProgress(0.37)}
          onViewCamera={() => onJumpToSection('collection')}
        />

        {/* Layer 4 & 5: Scene 2, 3, 4 — Approach, Aperture Reticle & City Arrival */}
        <LensTunnel
          approachOpacity={storyState.approachOpacity}
          apertureOpacity={storyState.apertureOpacity}
          apertureRotationDeg={storyState.apertureRotationDeg}
          copperGlintOpacity={storyState.copperGlintOpacity}
          arrivalOpacity={storyState.arrivalOpacity}
          sequenceFrame={storyState.sequenceFrame}
        />

        {/* Layer 6: Scene 5 — Interactive City Hotspots & Focus Explorer */}
        <CityFocusExplorer
          opacity={storyState.fieldNotesOpacity}
          interactive={storyState.fieldNotesInteractive}
          selectedHotspotId={selectedHotspotId}
          onSelectHotspot={setSelectedHotspotId}
          focusMode={focusMode}
          onChangeFocusMode={setFocusMode}
        />

        {/* Layer 7: Restrained Viewfinder Progress HUD & Beat Quick-Jump Rail */}
        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-30 hidden lg:flex items-center justify-between mx-auto max-w-[1360px] px-10">
          <div className="pointer-events-auto flex items-center gap-1.5 bg-[#121315]/80 backdrop-blur-md px-3 py-1.5 rounded-[2px] border border-[#f2efe9]/12">
            <span className="font-mono-kairo text-[11px] text-[#e68f63] mr-2">
              0{storyState.stepNumber} / 06 · { STORY_BEATS[storyState.beat].shortTitle }
            </span>
            {BEAT_JUMP_TARGETS.map((target) => {
              const isCurrent = storyState.beat === target.id;
              return (
                <button
                  key={target.id}
                  type="button"
                  onClick={() => scrollToProgress(target.progress)}
                  className={`px-2 py-0.5 text-[11px] font-mono-kairo rounded-[2px] transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-[#e68f63] text-[#121315] font-semibold'
                      : 'text-[#a8aaa9] hover:text-[#f2efe9]'
                  }`}
                >
                  {target.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 bg-[#121315]/80 backdrop-blur-md px-3 py-1.5 rounded-[2px] border border-[#f2efe9]/12">
            <span className="font-mono-kairo text-[11px] text-[#a8aaa9]">
              OPTICAL PROGRESS
            </span>
            <div className="w-28 h-1 bg-[#f2efe9]/15 overflow-hidden rounded-full">
              <div
                style={{ transform: `scaleX(${storyState.progress})` }}
                className="h-full w-full origin-left bg-[#e68f63]"
              />
            </div>
            <span className="font-mono-kairo text-[11px] text-[#f2efe9]">
              {Math.round(storyState.progress * 100)}%
            </span>
          </div>
        </div>

        {/* Scene 6: THE HANDOFF — Deliberate Optical Viewfinder / Iris Curtain into Porcelain Chapter */}
        {storyState.handoffProgress > 0.01 && (
          <div
            aria-hidden="true"
            style={{
              opacity: storyState.handoffProgress,
              transform: `translate3d(0, ${(1 - storyState.handoffProgress) * 28}%, 0)`,
            }}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-[46svh] bg-gradient-to-t from-[#f2efe9] via-[#f2efe9]/92 to-transparent flex items-end justify-center pb-8"
          >
            <div className="flex items-center gap-3 text-xs font-mono-kairo tracking-[0.2em] text-[#121315]/80">
              <span>06 / THE HANDOFF</span>
              <span aria-hidden="true">·</span>
              <span>ENTERING OPTICAL ARCHITECTURE</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(kairok)/kairok/components/CityFocusExplorer.tsx">
<![CDATA['use client';
import React from 'react';
import {
  CITY_HOTSPOTS,
  CityHotspot,
  FOCUS_EMPHASIS_MODES,
  FocusEmphasisMode,
} from '../lib/assets';

export interface CityFocusExplorerProps {
  opacity: number;
  interactive: boolean;
  selectedHotspotId: CityHotspot['id'];
  onSelectHotspot: (id: CityHotspot['id']) => void;
  focusMode: FocusEmphasisMode;
  onChangeFocusMode: (mode: FocusEmphasisMode) => void;
}

export const CityFocusExplorer: React.FC<CityFocusExplorerProps> = ({
  opacity,
  interactive,
  selectedHotspotId,
  onSelectHotspot,
  focusMode,
  onChangeFocusMode,
}) => {
  const activeHotspot =
    CITY_HOTSPOTS.find((h) => h.id === selectedHotspotId) || CITY_HOTSPOTS[0];
  const activeFocusConfig =
    FOCUS_EMPHASIS_MODES.find((m) => m.id === focusMode) || FOCUS_EMPHASIS_MODES[0];

  if (opacity <= 0.02 && !interactive) {
    return null;
  }

  return (
    <div
      style={{
        opacity,
        pointerEvents: interactive ? 'auto' : 'none',
      }}
      className="absolute inset-0 z-30 flex flex-col justify-between p-4 pt-20 pb-8 md:px-10 md:pt-24 lg:pb-20"
    >
      {/* Cover-matched coordinate stage for desktop/tablet hotspot pins */}
      <div className="kairo-cover-stage">
        {CITY_HOTSPOTS.map((spot) => {
          const isSelected = spot.id === selectedHotspotId;
          return (
            <button
              key={spot.id}
              type="button"
              onClick={() => {
                onSelectHotspot(spot.id);
                onChangeFocusMode(spot.focusZone);
              }}
              aria-label={`Inspect ${spot.label}: ${spot.title}`}
              aria-pressed={isSelected}
              style={{
                left: `${spot.xPercent}%`,
                top: `${spot.yPercent}%`,
                pointerEvents: interactive ? 'auto' : 'none',
              }}
              className={`group absolute -translate-x-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] border text-xs font-mono-kairo transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-[#e68f63] text-[#121315] border-[#e68f63] font-semibold scale-105 shadow-[0_0_24px_rgba(230,143,99,0.45)]'
                  : 'bg-[#121315]/85 text-[#f2efe9] border-[#f2efe9]/30 hover:border-[#e68f63] hover:text-[#e68f63]'
              }`}
            >
              <span className="text-[10px] opacity-80">{spot.code}</span>
              <span>{spot.label}</span>
            </button>
          );
        })}
      </div>

      {/* Top Row: Scene 5 Title & Illustrative Focus Explorer Bar */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="bg-[#121315]/82 backdrop-blur-md px-4 py-2.5 rounded-[2px] border border-[#f2efe9]/15">
          <div className="flex items-center gap-2 font-mono-kairo text-[11px] text-[#e68f63]">
            <span>05 / FIELD NOTES</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#f2efe9]/75">A WORLD WORTH NOTICING</span>
          </div>
          <p className="text-xs text-[#f2efe9]/85 mt-0.5">
            Select a focus marker or shift emphasis across the street scene (visual illustration).
          </p>
        </div>

        {/* Focus Explorer Control */}
        <div
          role="group"
          aria-label="Focus Explorer emphasis selector"
          className="flex flex-wrap items-center gap-1.5 bg-[#121315]/85 backdrop-blur-md p-1.5 rounded-[2px] border border-[#f2efe9]/15"
        >
          <span className="px-2 text-[11px] font-mono-kairo text-[#a8aaa9]">
            FOCUS EXPLORER:
          </span>
          {FOCUS_EMPHASIS_MODES.map((mode) => {
            const active = mode.id === focusMode;
            return (
              <button
                key={mode.id}
                type="button"
                aria-pressed={active}
                onClick={() => onChangeFocusMode(mode.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-[2px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#e68f63] text-[#121315] font-semibold'
                    : 'text-[#f2efe9]/80 hover:text-[#f2efe9] hover:bg-[#f2efe9]/10'
                }`}
              >
                {mode.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Row: Mobile/Keyboard Hotspot Selector + Active Annotation Card */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-col gap-3 md:flex-row md:items-end md:justify-between">
        {/* Stable horizontal hotspot selector bar (always accessible on touch/mobile & keyboard) */}
        <div
          role="tablist"
          aria-label="Scene field note markers"
          className="flex items-center gap-1.5 overflow-x-auto bg-[#121315]/88 backdrop-blur-md p-1.5 rounded-[2px] border border-[#f2efe9]/15"
        >
          {CITY_HOTSPOTS.map((spot) => {
            const active = spot.id === selectedHotspotId;
            return (
              <button
                key={spot.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  onSelectHotspot(spot.id);
                  onChangeFocusMode(spot.focusZone);
                }}
                className={`min-h-[40px] px-3.5 py-2 text-xs font-mono-kairo rounded-[2px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#f2efe9] text-[#121315] font-semibold'
                    : 'text-[#f2efe9]/80 hover:text-[#f2efe9] hover:bg-[#f2efe9]/10'
                }`}
              >
                {spot.code} · {spot.label}
              </button>
            );
          })}
        </div>

        {/* Active Hotspot Detail Panel */}
        <div
          aria-live="polite"
          className="w-full md:max-w-md bg-[#121315]/90 backdrop-blur-md p-4 md:p-5 rounded-[2px] border border-[#f2efe9]/18"
        >
          <div className="flex items-center justify-between gap-2 text-[11px] font-mono-kairo text-[#e68f63] mb-1">
            <span>
              {activeHotspot.code} / {activeHotspot.label}
            </span>
            <span className="text-[#a8aaa9]">{activeFocusConfig.label}</span>
          </div>
          <h2 className="font-display-kairo text-base md:text-lg font-semibold text-[#f2efe9]">
            {activeHotspot.title}
          </h2>
          <p className="mt-1.5 text-xs md:text-sm leading-relaxed text-[#f2efe9]/80">
            {activeHotspot.summary}
          </p>
          <p className="mt-2.5 pt-2 border-t border-[#f2efe9]/10 font-mono-kairo text-[11px] text-[#a8aaa9]">
            {activeHotspot.opticalNote}
          </p>
        </div>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(kairok)/kairok/components/CollectionExplorer.tsx">
<![CDATA['use client';
import React, { useState } from 'react';
import {
  CAMERA_FINISHES,
  CameraFinishId,
  KAIRO_ASSETS,
} from '../lib/assets';

export interface CollectionExplorerProps {
  selectedFinish: CameraFinishId;
  onSelectFinish: (finish: CameraFinishId) => void;
  onOpenWaitlist: (finish: CameraFinishId) => void;
}

export const CollectionExplorer: React.FC<CollectionExplorerProps> = ({
  selectedFinish,
  onSelectFinish,
  onOpenWaitlist,
}) => {
  const [framingMode, setFramingMode] = useState<'focus' | 'lineup'>('focus');

  const activeFinish =
    CAMERA_FINISHES.find((f) => f.id === selectedFinish) || CAMERA_FINISHES[0];

  return (
    <section
      id="collection"
      aria-labelledby="collection-heading"
      className="kairo-porcelain-chapter py-20 md:py-32 px-5 md:px-10 border-t border-[#121315]/12"
    >
      <div className="mx-auto max-w-[1360px]">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#121315]/12">
          <div className="lg:col-span-4 flex items-baseline gap-4">
            <span className="font-display-kairo text-6xl md:text-8xl font-semibold tracking-tighter text-[#121315]/15 select-none">
              04
            </span>
            <div>
              <p className="font-mono-kairo text-xs tracking-[0.18em] text-[#b8785d]">
                THE K-01 COLLECTION
              </p>
              <p className="text-xs text-[#121315]/65 mt-1">
                Three Material Studies · One Copper Signature
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2
                id="collection-heading"
                style={{ textWrap: 'balance' }}
                className="font-display-kairo text-[clamp(2.25rem,4.3vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-[#121315]"
              >
                Three finishes milled from solid alloy.
              </h2>
              <p className="mt-3 max-w-xl text-base text-[#121315]/75">
                Choose a material study below to pan across the K-01 collection
                table and inspect each chassis treatment.
              </p>
            </div>

            {/* Framing Mode Toggle: Isolate Selected Finish vs Full Lineup Trio */}
            <div
              role="group"
              aria-label="Collection framing mode"
              className="inline-flex items-center gap-1 bg-[#d2cec7] p-1 rounded-[2px] self-start md:self-auto"
            >
              <button
                type="button"
                aria-pressed={framingMode === 'focus'}
                onClick={() => setFramingMode('focus')}
                className={`px-3 py-1.5 text-xs font-mono-kairo rounded-[2px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  framingMode === 'focus'
                    ? 'bg-[#121315] text-[#f2efe9] font-semibold'
                    : 'text-[#121315]/75 hover:text-[#121315]'
                }`}
              >
                Focus Selected
              </button>
              <button
                type="button"
                aria-pressed={framingMode === 'lineup'}
                onClick={() => setFramingMode('lineup')}
                className={`px-3 py-1.5 text-xs font-mono-kairo rounded-[2px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  framingMode === 'lineup'
                    ? 'bg-[#121315] text-[#f2efe9] font-semibold'
                    : 'text-[#121315]/75 hover:text-[#121315]'
                }`}
              >
                Full Trio Table
              </button>
            </div>
          </div>
        </div>

        {/* Oversized Gallery Table Artwork (`kairo-07-camera-collection.webp`) */}
        <div className="mt-10 relative overflow-hidden rounded-[2px] bg-[#121315] border border-[#121315]/20 h-[320px] sm:h-[440px] md:h-[540px]">
          <img
            src={KAIRO_ASSETS.lineup}
            alt="Three KAIRO K-01 concept cameras arranged on a dark mineral studio table in Carbon, Silver, and Titanium finishes"
            loading="lazy"
            referrerPolicy="no-referrer"
            style={{
              objectPosition: '50% 54%',
              transform:
                framingMode === 'focus'
                  ? 'scale(2.15)'
                  : 'scale(1.0)',
              transformOrigin: `${activeFinish.cropOriginXPercent}% 55%`,
            }}
            className="kairo-pan-surface w-full h-full object-cover select-none"
          />

          {/* Subtle Framing Reticle Overlay */}
          <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-4 md:p-6 bg-gradient-to-t from-[#121315]/80 via-transparent to-transparent">
            <div className="font-mono-kairo text-xs text-[#f2efe9]">
              <span className="text-[#e68f63]">ACTIVE FINISH:</span>{' '}
              <span>{activeFinish.fullName}</span>
            </div>
            <div className="hidden sm:block font-mono-kairo text-xs text-[#a8aaa9]">
              {activeFinish.characterNote}
            </div>
          </div>
        </div>

        {/* Horizontal Swatch / Index Rail + Active Finish Details */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 3 Finish Swatch Cards */}
          <div
            role="radiogroup"
            aria-label="KAIRO K-01 camera finish selection"
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {CAMERA_FINISHES.map((finish, idx) => {
              const isSelected = finish.id === selectedFinish;
              return (
                <button
                  key={finish.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => {
                    onSelectFinish(finish.id);
                    setFramingMode('focus');
                  }}
                  className={`text-left p-5 rounded-[2px] border transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#121315] text-[#f2efe9] border-[#121315] shadow-lg'
                      : 'bg-[#e6e1d8] text-[#121315] border-[#121315]/15 hover:border-[#121315]/45'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono-kairo text-xs opacity-70">
                        0{idx + 1} / FINISH
                      </span>
                      <span
                        aria-hidden="true"
                        style={{ backgroundColor: finish.swatchHex }}
                        className="w-5 h-5 rounded-full border border-[#e68f63]"
                      />
                    </div>
                    <h3 className="font-display-kairo mt-4 text-xl font-semibold">
                      {finish.name}
                    </h3>
                  </div>

                  <p
                    className={`mt-4 text-xs leading-relaxed ${
                      isSelected ? 'text-[#f2efe9]/75' : 'text-[#121315]/70'
                    }`}
                  >
                    {finish.surfaceNote}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Finish Detail & Conversion Card */}
          <div
            aria-live="polite"
            className="lg:col-span-5 bg-[#e6e1d8] p-6 md:p-8 rounded-[2px] border border-[#121315]/15 flex flex-col justify-between"
          >
            <div>
              <p className="font-mono-kairo text-xs text-[#b8785d]">
                SELECTED STUDY · {activeFinish.name.toUpperCase()}
              </p>
              <h3 className="font-display-kairo mt-2 text-2xl font-semibold text-[#121315]">
                {activeFinish.fullName}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#121315]/80">
                {activeFinish.description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#121315]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-mono-kairo text-[11px] text-[#121315]/65">
                  CONCEPT EDITION INTEREST
                </p>
                <p className="text-xs font-medium text-[#121315]">
                  Register interest in the {activeFinish.name} finish
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenWaitlist(activeFinish.id)}
                className="px-5 py-3 text-xs font-semibold tracking-wide bg-[#121315] text-[#f2efe9] hover:bg-[#e68f63] hover:text-[#121315] rounded-[2px] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Join the KAIRO list
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(kairok)/kairok/components/LensTunnel.tsx">
<![CDATA['use client';
import React from 'react';

export interface LensTunnelProps {
  approachOpacity: number;
  apertureOpacity: number;
  apertureRotationDeg: number;
  copperGlintOpacity: number;
  arrivalOpacity: number;
  sequenceFrame: number;
}

export const LensTunnel: React.FC<LensTunnelProps> = ({
  approachOpacity,
  apertureOpacity,
  apertureRotationDeg,
  copperGlintOpacity,
  arrivalOpacity,
  sequenceFrame,
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {/* Subtle warm copper optical flash as aperture iris opens into the city */}
      {copperGlintOpacity > 0.01 && (
        <div
          aria-hidden="true"
          style={{ opacity: copperGlintOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(230,143,99,0.55),rgba(18,19,21,0.1)_65%,transparent_100%)] mix-blend-screen"
        />
      )}

      {/* Scene 2: THE APPROACH caption */}
      {approachOpacity > 0.02 && (
        <div
          style={{ opacity: approachOpacity }}
          className="absolute inset-x-0 bottom-14 flex flex-col items-center text-center px-6"
        >
          <span className="font-mono-kairo text-[11px] tracking-[0.22em] text-[#e68f63] mb-2">
            02 / THE APPROACH · OPTICAL AXIS
          </span>
          <p className="font-display-kairo text-2xl md:text-4xl font-medium tracking-tight text-[#f2efe9] drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
            Look closer. Follow the light into the glass.
          </p>
        </div>
      )}

      {/* Scene 3: THE APERTURE optical reticle & transient copy */}
      {apertureOpacity > 0.02 && (
        <div
          style={{ opacity: apertureOpacity }}
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          {/* Restrained optical coordinate ring */}
          <div
            aria-hidden="true"
            style={{ transform: `rotate(${apertureRotationDeg}deg)` }}
            className="relative flex items-center justify-center w-[68vw] max-w-[540px] aspect-square rounded-full border border-[#f2efe9]/15"
          >
            <div className="w-[76%] aspect-square rounded-full border border-dashed border-[#e68f63]/35" />
            <span className="absolute -top-6 font-mono-kairo text-[10px] tracking-[0.2em] text-[#e68f63]/80">
              IRIS · 9-BLADE CIRCULAR GEOMETRY
            </span>
            <span className="absolute -bottom-6 font-mono-kairo text-[10px] tracking-[0.2em] text-[#f2efe9]/60">
              FRAME {String(sequenceFrame).padStart(3, '0')} / 120
            </span>
          </div>

          {/* Transient statement */}
          <div className="absolute inset-x-0 flex flex-col items-center text-center px-6">
            <div className="bg-[#121315]/65 backdrop-blur-md px-6 py-4 rounded-[2px] border border-[#f2efe9]/12">
              <span className="block font-mono-kairo text-[11px] tracking-[0.22em] text-[#e68f63] mb-1.5">
                03 / THE APERTURE THRESHOLD
              </span>
              <p className="font-display-kairo text-2xl md:text-4xl font-semibold tracking-tight text-[#f2efe9]">
                Every detail changes the story.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Scene 4: THROUGH THE FRAME city arrival caption */}
      {arrivalOpacity > 0.02 && (
        <div
          style={{ opacity: arrivalOpacity }}
          className="absolute inset-x-0 bottom-14 flex flex-col items-center text-center px-6"
        >
          <div className="bg-[#121315]/75 backdrop-blur-md px-6 py-4 rounded-[2px] border border-[#f2efe9]/15 max-w-xl">
            <span className="block font-mono-kairo text-[11px] tracking-[0.22em] text-[#e68f63] mb-1.5">
              04 / THROUGH THE FRAME
            </span>
            <p className="font-display-kairo text-2xl md:text-4xl font-semibold tracking-tight text-[#f2efe9]">
              Make the ordinary impossible to overlook.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(kairok)/kairok/components/OpticalLab.tsx">
<![CDATA['use client';
import React, { useState } from 'react';
import {
  APERTURE_PRESETS,
  ApertureStateId,
  KAIRO_ASSETS,
} from '../lib/assets';

export const OpticalLab: React.FC = () => {
  const [selectedAperture, setSelectedAperture] = useState<ApertureStateId>('open');

  const activePreset =
    APERTURE_PRESETS.find((preset) => preset.id === selectedAperture) ||
    APERTURE_PRESETS[0];

  // Calculate SVG iris opening radius (in viewBox 0..200)
  const irisOpeningRadius = Number(((activePreset.irisRadiusPercent / 100) * 68).toFixed(2));

  return (
    <section
      id="optics"
      aria-labelledby="optics-heading"
      className="kairo-porcelain-chapter relative py-20 md:py-32 px-5 md:px-10 border-t border-[#121315]/10"
    >
      <div className="mx-auto max-w-[1360px]">
        {/* Asymmetric Editorial Header with Massive Numbering */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 md:pb-16 border-b border-[#121315]/12">
          <div className="lg:col-span-4 flex items-baseline gap-4">
            <span className="font-display-kairo text-6xl md:text-8xl font-semibold tracking-tighter text-[#121315]/15 select-none">
              01
            </span>
            <div>
              <p className="font-mono-kairo text-xs tracking-[0.18em] text-[#b8785d]">
                OPTICAL ARCHITECTURE
              </p>
              <p className="text-xs text-[#121315]/65 mt-1">
                Copper-Ringed Prime Assembly · Illustrative Study
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <h2
              id="optics-heading"
              style={{ textWrap: 'balance' }}
              className="font-display-kairo text-[clamp(2.25rem,4.5vw,4rem)] font-semibold leading-[1.04] tracking-tight text-[#121315]"
            >
              Light changes everything.
            </h2>
            <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-[#121315]/75">
              Before a photograph reaches a screen, it is shaped by glass and air.
              KAIRO K-01 centers the entire body around a single oversized optical
              throat—inviting you to shape depth, atmosphere, and peripheral falloff
              by feel.
            </p>
          </div>
        </div>

        {/* Asymmetric Main Stage: 7-col Lens Macro + Iris Visualizer / 5-col Interactive Aperture Control */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left: Large Lens Macro Field with Real Animated Iris Overlay */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-[2px] bg-[#121315] border border-[#121315]/15 min-h-[380px] md:min-h-[520px] flex items-center justify-center">
            <img
              src={KAIRO_ASSETS.lens}
              alt="Extreme macro view of the KAIRO K-01 copper-ringed camera lens and multi-coated glass elements"
              loading="lazy"
              referrerPolicy="no-referrer"
              style={{
                transform: `scale(${selectedAperture === 'open' ? 1.04 : selectedAperture === 'balanced' ? 1.01 : 0.99})`,
              }}
              className="w-full h-full object-cover transition-transform duration-500"
            />

            {/* Dynamic 9-Blade Optical Iris SVG Overlay */}
            <svg
              viewBox="0 0 200 200"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 m-auto w-[72%] max-w-[380px] aspect-square"
            >
              <defs>
                <radialGradient id="kairoIrisMask" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(230,143,99,0.08)" />
                  <stop offset="70%" stopColor="rgba(18,19,21,0.55)" />
                  <stop offset="100%" stopColor="rgba(18,19,21,0.88)" />
                </radialGradient>
              </defs>

              {/* Outer copper coordinate ring */}
              <circle
                cx="100"
                cy="100"
                r="86"
                fill="none"
                stroke="rgba(230, 143, 99, 0.45)"
                strokeWidth="0.75"
                strokeDasharray="3 3"
              />

              {/* Rotating blade geometry */}
              <g
                style={{
                  transform: `rotate(${activePreset.bladeRotationDeg}deg)`,
                  transformOrigin: '100px 100px',
                  transition: 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {Array.from({ length: 9 }).map((_, idx) => {
                  const angle = idx * 40;
                  const rad1 = (angle * Math.PI) / 180;
                  const rad2 = ((angle + 55) * Math.PI) / 180;
                  const x1 = Number((100 + irisOpeningRadius * Math.cos(rad1)).toFixed(2));
                  const y1 = Number((100 + irisOpeningRadius * Math.sin(rad1)).toFixed(2));
                  const x2 = Number((100 + 82 * Math.cos(rad2)).toFixed(2));
                  const y2 = Number((100 + 82 * Math.sin(rad2)).toFixed(2));
                  return (
                    <line
                      key={idx}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(242, 239, 233, 0.48)"
                      strokeWidth="1.25"
                    />
                  );
                })}
              </g>

              {/* Dynamic iris opening circle */}
              <circle
                cx="100"
                cy="100"
                r={irisOpeningRadius}
                fill="url(#kairoIrisMask)"
                stroke="#e68f63"
                strokeWidth="1.5"
                style={{
                  transition: 'r 420ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </svg>

            {/* Bottom status readout */}
            <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-2 bg-[#121315]/85 backdrop-blur-md px-4 py-2.5 rounded-[2px] border border-[#f2efe9]/15 text-xs font-mono-kairo text-[#f2efe9]">
              <span>IRIS STATE: {activePreset.label.toUpperCase()}</span>
              <span className="text-[#e68f63]">{activePreset.displayStop}</span>
            </div>
          </div>

          {/* Right: Interactive Aperture Control & Live Sample Depth Preview */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#e8e3db] p-6 md:p-8 rounded-[2px] border border-[#121315]/12">
            <div>
              <div className="flex items-center justify-between gap-2 font-mono-kairo text-xs text-[#121315]/65">
                <span>INTERACTIVE IRIS STUDY</span>
                <span>ILLUSTRATIVE DEMO</span>
              </div>

              <h3 className="font-display-kairo mt-3 text-2xl font-semibold text-[#121315]">
                Select an aperture character
              </h3>
              <p className="mt-1.5 text-sm text-[#121315]/75">
                Switch between three illustrative diaphragm positions to inspect how
                the iris geometry and atmospheric field respond.
              </p>

              {/* 3-State Accessible Selector (`Open`, `Balanced`, `Narrow`) */}
              <div
                role="group"
                aria-label="Illustrative aperture selector"
                className="mt-6 grid grid-cols-3 gap-2 bg-[#d2cec7]/70 p-1.5 rounded-[2px]"
              >
                {APERTURE_PRESETS.map((preset) => {
                  const isSelected = preset.id === selectedAperture;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedAperture(preset.id)}
                      className={`py-2.5 px-3 text-xs font-mono-kairo rounded-[2px] transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-[#121315] text-[#f2efe9] font-semibold shadow-sm'
                          : 'text-[#121315]/75 hover:text-[#121315] hover:bg-[#f2efe9]/50'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

              {/* Active Preset Explanation */}
              <div aria-live="polite" className="mt-6 pt-6 border-t border-[#121315]/12">
                <div className="flex items-center justify-between text-xs font-mono-kairo text-[#b8785d]">
                  <span>{activePreset.displayStop}</span>
                  <span>{activePreset.lightTransmissionLabel}</span>
                </div>
                <h4 className="font-display-kairo mt-2 text-lg font-semibold text-[#121315]">
                  {activePreset.characterTitle}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#121315]/80">
                  {activePreset.description}
                </p>
              </div>
            </div>

            {/* Corresponding Sample Vignette / Blur Preview */}
            <div className="mt-8 pt-6 border-t border-[#121315]/12">
              <div className="flex items-center justify-between text-xs font-mono-kairo text-[#121315]/65 mb-2.5">
                <span>FIELD & VIGNETTE RESPONSE</span>
                <span>PREVIEW</span>
              </div>
              <div className="relative h-40 overflow-hidden rounded-[2px] bg-[#121315] border border-[#121315]/20">
                {/* Background layer blurred according to aperture preset */}
                <img
                  src={KAIRO_ASSETS.sample}
                  alt="Illustrative street depth preview"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  style={{
                    filter: `blur(${activePreset.sampleBlurPx}px)`,
                    transform: 'scale(1.06)',
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
                />
                {/* Sharp central subject window when open/balanced */}
                <img
                  src={KAIRO_ASSETS.sample}
                  alt=""
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  style={{
                    clipPath: 'circle(28% at 48% 56%)',
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Vignette overlay */}
                <div
                  aria-hidden="true"
                  style={{
                    opacity: activePreset.vignetteStrength,
                  }}
                  className="absolute inset-0 bg-[radial-gradient(circle_at_48%_56%,transparent_25%,#121315_100%)] transition-opacity duration-300"
                />
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono-kairo text-[#f2efe9]/90">
                  <span>BACKGROUND BLUR: {activePreset.sampleBlurPx}PX</span>
                  <span>IRIS OPENING: {activePreset.irisRadiusPercent}%</span>
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
    <file path="src/app/(kairok)/kairok/components/PhotoFieldNotes.tsx">
<![CDATA['use client';
import React, { useState } from 'react';
import { KAIRO_ASSETS } from '../lib/assets';

type GalleryViewMode = 'after-dark' | 'field-notes';

export const PhotoFieldNotes: React.FC = () => {
  const [viewMode, setViewMode] = useState<GalleryViewMode>('after-dark');
  const [exposureCurtain, setExposureCurtain] = useState<number>(54);

  const activeImage =
    viewMode === 'after-dark' ? KAIRO_ASSETS.sample : KAIRO_ASSETS.city;
  const activeImageAlt =
    viewMode === 'after-dark'
      ? 'Moody street photograph of a figure with an umbrella passing an illuminated corner cafe in the rain'
      : 'Wide night street perspective in the rain with warm storefront lights and wet crosswalk reflections';

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-gradient-to-b from-[#121315] via-[#18191c] to-[#f2efe9] pt-20 pb-24 md:pt-32 md:pb-36 px-5 md:px-10 border-t border-[#f2efe9]/12"
    >
      <div className="mx-auto max-w-[1360px]">
        {/* Header & Mode Switcher (`City / After dark` vs `Field notes`) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#f2efe9]/15">
          <div>
            <div className="flex items-center gap-3 font-mono-kairo text-xs tracking-[0.18em] text-[#e68f63]">
              <span>03 / PHOTOGRAPHIC FIELD NOTES</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#a8aaa9]">ILLUSTRATIVE STUDY</span>
            </div>
            <h2
              id="gallery-heading"
              style={{ textWrap: 'balance' }}
              className="font-display-kairo mt-3 max-w-[18ch] text-[clamp(2.25rem,4.5vw,4rem)] font-semibold leading-[1.04] tracking-tight text-[#f2efe9]"
            >
              Made for the moment you almost missed.
            </h2>
          </div>

          {/* View Mode Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="font-mono-kairo text-xs text-[#a8aaa9]">
              COMPOSITION MODE:
            </span>
            <div
              role="tablist"
              aria-label="Photographic study selector"
              className="inline-flex items-center gap-1.5 bg-[#1d2024] p-1.5 rounded-[2px] border border-[#f2efe9]/18"
            >
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'after-dark'}
                onClick={() => setViewMode('after-dark')}
                className={`px-4 py-2 text-xs font-mono-kairo rounded-[2px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'after-dark'
                    ? 'bg-[#e68f63] text-[#121315] font-semibold'
                    : 'text-[#f2efe9]/80 hover:text-[#f2efe9]'
                }`}
              >
                City / After dark
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'field-notes'}
                onClick={() => setViewMode('field-notes')}
                className={`px-4 py-2 text-xs font-mono-kairo rounded-[2px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'field-notes'
                    ? 'bg-[#e68f63] text-[#121315] font-semibold'
                    : 'text-[#f2efe9]/80 hover:text-[#f2efe9]'
                }`}
              >
                Field notes
              </button>
            </div>
          </div>
        </div>

        {/* Main Photographic Stage with Illustrative Exposure Curtain */}
        <div className="mt-10 rounded-[2px] overflow-hidden bg-[#121315] border border-[#f2efe9]/20 shadow-2xl">
          <div className="relative h-[380px] sm:h-[500px] md:h-[640px] w-full overflow-hidden select-none">
            {/* Base Layer: Natural Low-Key Night Render */}
            <img
              src={activeImage}
              alt={activeImageAlt}
              loading="lazy"
              referrerPolicy="no-referrer"
              style={{
                filter: 'brightness(0.88) contrast(1.06)',
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Top Clipped Layer: Shadow-Recovered Warm Exposure Latitude Preview */}
            <img
              src={activeImage}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
              style={{
                clipPath: `inset(0 ${100 - exposureCurtain}% 0 0)`,
                filter: 'brightness(1.18) contrast(0.98) saturate(1.12)',
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Vertical Curtain Divider Line */}
            <div
              aria-hidden="true"
              style={{ left: `${exposureCurtain}%` }}
              className="pointer-events-none absolute inset-y-0 w-[1.5px] bg-[#e68f63] shadow-[0_0_12px_rgba(230,143,99,0.8)]"
            >
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-[2px] bg-[#e68f63] text-[#121315] font-mono-kairo text-[10px] font-semibold whitespace-nowrap">
                LATITUDE SPLIT
              </div>
            </div>

            {/* Field Notes Compositional Grid & Annotations when `field-notes` mode is active */}
            {viewMode === 'field-notes' && (
              <div className="pointer-events-none absolute inset-0 z-10">
                {/* Rule-of-thirds hairline compositional grid */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                  <div className="border-r border-b border-[#f2efe9]/15" />
                  <div className="border-r border-b border-[#f2efe9]/15" />
                  <div className="border-b border-[#f2efe9]/15" />
                  <div className="border-r border-b border-[#f2efe9]/15" />
                  <div className="border-r border-b border-[#f2efe9]/15" />
                  <div className="border-b border-[#f2efe9]/15" />
                  <div className="border-r border-[#f2efe9]/15" />
                  <div className="border-r border-[#f2efe9]/15" />
                  <div />
                </div>

                <div className="absolute top-6 left-6 bg-[#121315]/88 backdrop-blur-md p-4 rounded-[2px] border border-[#e68f63]/50 max-w-xs">
                  <p className="font-mono-kairo text-[11px] text-[#e68f63]">
                    ANNOTATION A · TUNGSTEN GLOW
                  </p>
                  <p className="mt-1 text-xs text-[#f2efe9]/90">
                    Warm interior café light holds natural amber saturation against
                    cool slate rain mist.
                  </p>
                </div>

                <div className="absolute bottom-16 right-6 bg-[#121315]/88 backdrop-blur-md p-4 rounded-[2px] border border-[#e68f63]/50 max-w-xs">
                  <p className="font-mono-kairo text-[11px] text-[#e68f63]">
                    ANNOTATION B · SPECULAR PAVEMENT
                  </p>
                  <p className="mt-1 text-xs text-[#f2efe9]/90">
                    Wet asphalt mirrors overhead lamps without crushing deep shadow
                    graduation in the crosswalk.
                  </p>
                </div>
              </div>
            )}

            {/* Corner Exposure Labels */}
            <div className="pointer-events-none absolute top-4 left-4 bg-[#121315]/80 backdrop-blur-md px-3 py-1.5 rounded-[2px] border border-[#f2efe9]/15 font-mono-kairo text-[11px] text-[#f2efe9]">
              SHADOW RECOVERY PREVIEW (+1.2 EV ILLUSTRATIVE)
            </div>
            <div className="pointer-events-none absolute top-4 right-4 bg-[#121315]/80 backdrop-blur-md px-3 py-1.5 rounded-[2px] border border-[#f2efe9]/15 font-mono-kairo text-[11px] text-[#a8aaa9]">
              NATURAL LOW-KEY BASELINE
            </div>
          </div>

          {/* Interactive Curtain Slider Bar */}
          <div className="bg-[#181a1e] px-5 py-4 md:px-8 md:py-5 border-t border-[#f2efe9]/12 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <label
                htmlFor="kairo-exposure-slider"
                className="block font-mono-kairo text-xs text-[#e68f63]"
              >
                ILLUSTRATIVE EXPOSURE PREVIEW · {exposureCurtain}% SPLIT
              </label>
              <p className="text-xs text-[#a8aaa9] mt-0.5">
                Drag the curtain to compare shadow-lifted tonal grading with the
                low-key night atmosphere (illustrative visual demonstration).
              </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-80">
              <span className="font-mono-kairo text-[11px] text-[#a8aaa9]">0%</span>
              <input
                id="kairo-exposure-slider"
                type="range"
                min={5}
                max={95}
                value={exposureCurtain}
                onChange={(e) => setExposureCurtain(Number(e.target.value))}
                className="w-full accent-[#e68f63] cursor-pointer"
              />
              <span className="font-mono-kairo text-[11px] text-[#a8aaa9]">100%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(kairok)/kairok/components/SensorDetail.tsx">
<![CDATA['use client';
import React, { useState } from 'react';
import {
  ENGINEERING_CALLOUTS,
  EngineeringCallout,
  KAIRO_ASSETS,
} from '../lib/assets';

export const SensorDetail: React.FC = () => {
  const [selectedCalloutId, setSelectedCalloutId] =
    useState<EngineeringCallout['id']>('optical-assembly');
  const [sensorClipView, setSensorClipView] = useState<'full' | 'core'>('full');

  const activeCallout =
    ENGINEERING_CALLOUTS.find((c) => c.id === selectedCalloutId) ||
    ENGINEERING_CALLOUTS[0];

  return (
    <section
      id="engineering"
      aria-labelledby="engineering-heading"
      className="kairo-carbon-chapter relative py-20 md:py-32 px-5 md:px-10 border-t border-[#f2efe9]/12"
    >
      <div className="mx-auto max-w-[1360px]">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#f2efe9]/12">
          <div className="lg:col-span-4 flex items-baseline gap-4">
            <span className="font-display-kairo text-6xl md:text-8xl font-semibold tracking-tighter text-[#f2efe9]/15 select-none">
              02
            </span>
            <div>
              <p className="font-mono-kairo text-xs tracking-[0.18em] text-[#e68f63]">
                PRECISION ENGINEERING
              </p>
              <p className="text-xs text-[#a8aaa9] mt-1">
                Internal Optical & Mechanical Architecture
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <h2
              id="engineering-heading"
              style={{ textWrap: 'balance' }}
              className="font-display-kairo text-[clamp(2.25rem,4.2vw,3.75rem)] font-semibold leading-[1.06] tracking-tight text-[#f2efe9]"
            >
              Form meets focus. Every element aligned on a single axis.
            </h2>
            <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-[#a8aaa9]">
              Inspect the disassembled K-01 architecture. Select an assembly callout
              below or directly on the optical diagram to shift framing across the
              barrel, sensor throat, and milled top plate.
            </p>
          </div>
        </div>

        {/* Accessible Callout Selector Bar */}
        <div
          role="tablist"
          aria-label="Exploded camera assembly callouts"
          className="mt-10 flex flex-wrap items-center gap-2"
        >
          {ENGINEERING_CALLOUTS.map((callout) => {
            const active = callout.id === selectedCalloutId;
            return (
              <button
                key={callout.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCalloutId(callout.id)}
                className={`px-4 py-2.5 text-xs font-mono-kairo rounded-[2px] border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#e68f63] text-[#121315] border-[#e68f63] font-semibold'
                    : 'bg-[#1d2024] text-[#f2efe9]/80 border-[#f2efe9]/15 hover:border-[#e68f63]'
                }`}
              >
                {callout.index} · {callout.label}
              </button>
            );
          })}
        </div>

        {/* Dominant Exploded Camera Composition + Interactive Callout Pins */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 relative overflow-hidden rounded-[2px] bg-[#0d0e10] border border-[#f2efe9]/15 min-h-[340px] md:min-h-[480px]">
            <img
              src={KAIRO_ASSETS.exploded}
              alt="Exploded engineering view of the KAIRO K-01 camera showing multi-element lens glass, copper ring, bayonet mount, sensor, and body"
              loading="lazy"
              referrerPolicy="no-referrer"
              style={{
                objectPosition: `${activeCallout.imagePanXPercent}% 50%`,
                transform: `scale(${activeCallout.imageScale})`,
                transformOrigin: `${activeCallout.xPercent}% ${activeCallout.yPercent}%`,
              }}
              className="kairo-pan-surface w-full h-full object-cover select-none"
            />

            {/* Interactive Callout Pins Anchored to Image Regions */}
            {ENGINEERING_CALLOUTS.map((callout) => {
              const isSelected = callout.id === selectedCalloutId;
              return (
                <button
                  key={callout.id}
                  type="button"
                  aria-label={`Inspect ${callout.label}`}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCalloutId(callout.id)}
                  style={{
                    left: `${callout.xPercent}%`,
                    top: `${callout.yPercent}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-[2px] border font-mono-kairo text-[11px] transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#e68f63] text-[#121315] border-[#e68f63] font-semibold scale-105 shadow-[0_0_24px_rgba(230,143,99,0.5)]'
                      : 'bg-[#121315]/85 text-[#f2efe9] border-[#f2efe9]/35 hover:border-[#e68f63]'
                  }`}
                >
                  <span>{callout.index}</span>
                  <span className="hidden sm:inline"> · {callout.label}</span>
                </button>
              );
            })}

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono-kairo text-[#a8aaa9] bg-[#121315]/80 backdrop-blur-md px-4 py-2 rounded-[2px] border border-[#f2efe9]/10">
              <span>ACTIVE CALLOUT: {activeCallout.code}</span>
              <span>CONCEPT EXPLODED DIAGRAM</span>
            </div>
          </div>

          {/* Active Callout Engineering Note Panel */}
          <div
            aria-live="polite"
            className="lg:col-span-4 flex flex-col justify-between bg-[#1d2024] p-6 md:p-8 rounded-[2px] border border-[#f2efe9]/12"
          >
            <div>
              <div className="flex items-center justify-between font-mono-kairo text-xs text-[#e68f63]">
                <span>ASSEMBLY NOTE {activeCallout.index}</span>
                <span>{activeCallout.code}</span>
              </div>
              <h3 className="font-display-kairo mt-3 text-2xl font-semibold text-[#f2efe9]">
                {activeCallout.headline}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#f2efe9]/80">
                {activeCallout.summary}
              </p>

              <ul className="mt-6 space-y-3 border-t border-[#f2efe9]/12 pt-5">
                {activeCallout.detailPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs md:text-sm text-[#a8aaa9]"
                  >
                    <span className="font-mono-kairo text-[#e68f63] shrink-0">
                      0{idx + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-8 pt-4 border-t border-[#f2efe9]/10 font-mono-kairo text-[11px] text-[#a8aaa9]">
              Illustrative concept architecture · Static high-resolution study
            </p>
          </div>
        </div>

        {/* Secondary Detail Panel: Sensor & Bayonet Mount (`kairo-05-sensor-detail.webp`) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#181a1e] p-6 md:p-10 rounded-[2px] border border-[#f2efe9]/12">
          <div className="lg:col-span-5">
            <p className="font-mono-kairo text-xs tracking-[0.18em] text-[#e68f63]">
              RECESSED SENSOR CHAMBER
            </p>
            <h3 className="font-display-kairo mt-2 text-2xl md:text-3xl font-semibold text-[#f2efe9]">
              Short-flange mount built around light integrity.
            </h3>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-[#a8aaa9]">
              Removing the mechanical mirror box allows the rear optical element to
              sit millimeters from the imaging plane. Toggle the inspection mask to
              isolate the gold contact throat and anti-reflective sensor surround.
            </p>

            <div
              role="group"
              aria-label="Sensor mount inspection view"
              className="mt-6 inline-flex items-center gap-2 bg-[#121315] p-1.5 rounded-[2px] border border-[#f2efe9]/15"
            >
              <button
                type="button"
                aria-pressed={sensorClipView === 'full'}
                onClick={() => setSensorClipView('full')}
                className={`px-3.5 py-2 text-xs font-mono-kairo rounded-[2px] transition-colors cursor-pointer ${
                  sensorClipView === 'full'
                    ? 'bg-[#f2efe9] text-[#121315] font-semibold'
                    : 'text-[#a8aaa9] hover:text-[#f2efe9]'
                }`}
              >
                Full Mount Assembly
              </button>
              <button
                type="button"
                aria-pressed={sensorClipView === 'core'}
                onClick={() => setSensorClipView('core')}
                className={`px-3.5 py-2 text-xs font-mono-kairo rounded-[2px] transition-colors cursor-pointer ${
                  sensorClipView === 'core'
                    ? 'bg-[#e68f63] text-[#121315] font-semibold'
                    : 'text-[#a8aaa9] hover:text-[#f2efe9]'
                }`}
              >
                Isolate Sensor Plane
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 relative overflow-hidden rounded-[2px] bg-[#121315] border border-[#f2efe9]/15 h-[300px] md:h-[380px]">
            <img
              src={KAIRO_ASSETS.sensor}
              alt="Macro closeup of the KAIRO K-01 camera sensor plane and machined lens mount"
              loading="lazy"
              referrerPolicy="no-referrer"
              style={{
                transform: sensorClipView === 'core' ? 'scale(1.28)' : 'scale(1.0)',
                clipPath:
                  sensorClipView === 'core'
                    ? 'inset(8% 12% 8% 12% round 2px)'
                    : 'inset(0% 0% 0% 0% round 2px)',
              }}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute bottom-3 right-3 bg-[#121315]/85 backdrop-blur-md px-3 py-1.5 rounded-[2px] border border-[#f2efe9]/15 font-mono-kairo text-[11px] text-[#e68f63]">
              {sensorClipView === 'core'
                ? 'SENSOR PLANE · MICROLENS SURFACE STUDY'
                : 'BAYONET THROAT · FULL MOUNT VIEW'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(kairok)/kairok/components/SiteFooter.tsx">
<![CDATA['use client';
import React from 'react';
import { KAIRO_ASSETS } from '../lib/assets';

export interface SiteFooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenWaitlist: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  onNavigate,
  onOpenWaitlist,
  reducedMotion,
  onToggleReducedMotion,
}) => {
  const handleAnchor = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    onNavigate(id);
  };

  return (
    <footer className="bg-[#121315] text-[#f2efe9] border-t border-[#f2efe9]/12">
      {/* Section F: Quiet Invitation — Final Frame of a Film */}
      <div className="mx-auto max-w-[1360px] px-5 pt-20 pb-16 md:px-10 md:pt-28 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <p className="font-mono-kairo text-xs tracking-[0.22em] text-[#e68f63]">
              FINAL FRAME · KAIRO K-01
            </p>
            <h2
              style={{ textWrap: 'balance' }}
              className="font-display-kairo mt-3 text-[clamp(2.25rem,4.8vw,4.25rem)] font-semibold leading-[1.02] tracking-tight text-[#f2efe9]"
            >
              Your next frame starts here.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#a8aaa9]">
              See beyond the expected. Reserve your place on the concept dispatch
              list or return to the optical journey above.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenWaitlist}
                className="kairo-btn-primary"
              >
                Join the KAIRO list
              </button>
              <button
                type="button"
                onClick={() => onNavigate('experience')}
                className="kairo-btn-secondary"
              >
                Replay optical journey
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[2px] border border-[#f2efe9]/15 bg-[#16181c]">
              <img
                src={KAIRO_ASSETS.hero}
                alt="KAIRO K-01 mirrorless camera resting in warm studio rim light"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-[280px] sm:h-[360px] object-cover"
              />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono-kairo text-[11px] text-[#f2efe9]/75">
                <span>KAIRO K-01 CONCEPT</span>
                <span>SEE BEYOND THE EXPECTED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Restrained Footer Bar */}
      <div className="border-t border-[#f2efe9]/12 bg-[#0e0f11]">
        <div className="mx-auto max-w-[1360px] px-5 py-8 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <a
              href="#experience"
              onClick={(e) => handleAnchor(e, 'experience')}
              className="font-display-kairo text-base font-semibold tracking-[0.2em] text-[#f2efe9] hover:text-[#e68f63] transition-colors"
            >
              KAIRO
            </a>
            <p className="mt-1.5 text-xs text-[#a8aaa9] max-w-xl">
              KAIRO and the K-01 mirrorless system are a fictional industrial design
              and interactive optical study created for demonstration purposes. All
              controls and settings represent illustrative concept behaviors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono-kairo text-[#a8aaa9]">
            <a
              href="#experience"
              onClick={(e) => handleAnchor(e, 'experience')}
              className="hover:text-[#f2efe9] transition-colors"
            >
              Experience
            </a>
            <a
              href="#optics"
              onClick={(e) => handleAnchor(e, 'optics')}
              className="hover:text-[#f2efe9] transition-colors"
            >
              Optics
            </a>
            <a
              href="#engineering"
              onClick={(e) => handleAnchor(e, 'engineering')}
              className="hover:text-[#f2efe9] transition-colors"
            >
              Engineering
            </a>
            <a
              href="#gallery"
              onClick={(e) => handleAnchor(e, 'gallery')}
              className="hover:text-[#f2efe9] transition-colors"
            >
              Field Notes
            </a>
            <a
              href="#collection"
              onClick={(e) => handleAnchor(e, 'collection')}
              className="hover:text-[#f2efe9] transition-colors"
            >
              K-01
            </a>
            <button
              type="button"
              aria-pressed={reducedMotion}
              onClick={onToggleReducedMotion}
              className="px-2.5 py-1 rounded-[2px] border border-[#f2efe9]/20 text-[#f2efe9]/85 hover:border-[#e68f63] transition-colors cursor-pointer"
            >
              {reducedMotion ? 'Motion: Reduced' : 'Motion: Standard'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
]]>
    </file>
    <file path="src/app/(kairok)/kairok/components/SiteHeader.tsx">
<![CDATA['use client';
import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export interface SiteHeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenWaitlist: () => void;
}

const NAV_ITEMS = [
  { id: 'experience', label: 'Experience' },
  { id: 'optics', label: 'Optics' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'gallery', label: 'Field Notes' },
  { id: 'collection', label: 'K-01' },
];

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenWaitlist,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          scrolled
            ? 'bg-[#121315]/92 backdrop-blur-md border-b border-[#f2efe9]/12'
            : 'bg-gradient-to-b from-[#121315]/80 to-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-5 py-4 md:px-10">
          {/* Zone 1: Single text wordmark */}
          <a
            href="#experience"
            onClick={(e) => handleLinkClick(e, 'experience')}
            className="font-display-kairo text-lg font-semibold tracking-[0.18em] text-[#f2efe9] whitespace-nowrap shrink-0 hover:text-[#e68f63] transition-colors"
          >
            KAIRO
          </a>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-xs font-medium tracking-wide text-[#f2efe9]/75"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive ? 'text-[#f2efe9]' : 'hover:text-[#f2efe9]'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#e68f63] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action (+ mobile menu trigger on small screens) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenWaitlist}
              className="px-4 py-2 text-xs font-semibold tracking-wide text-[#121315] bg-[#f2efe9] hover:bg-[#e68f63] rounded-[2px] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Join the list
            </button>

            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="kairo-mobile-nav"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex md:hidden items-center justify-center w-10 h-10 text-[#f2efe9] border border-[#f2efe9]/20 rounded-[2px] hover:border-[#e68f63] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="kairo-mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-40 md:hidden bg-[#121315]/96 backdrop-blur-lg flex flex-col justify-between px-6 pt-24 pb-10"
          onClick={() => setMobileMenuOpen(false)}
        >
          <nav
            aria-label="Mobile sections"
            className="flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className="flex items-baseline justify-between border-b border-[#f2efe9]/12 pb-4 text-xl font-display-kairo font-medium text-[#f2efe9] hover:text-[#e68f63] transition-colors"
              >
                <span>{item.label}</span>
                <span className="font-mono-kairo text-xs text-[#a8aaa9]">
                  0{idx + 1}
                </span>
              </a>
            ))}
          </nav>

          <div
            className="flex flex-col gap-4 border-t border-[#f2efe9]/15 pt-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs text-[#a8aaa9]">
              KAIRO K-01 · Concept Mirrorless Camera Study
            </p>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWaitlist();
              }}
              className="kairo-btn-primary w-full justify-center"
            >
              Join the KAIRO list
            </button>
          </div>
        </div>
      )}
    </>
  );
};
]]>
    </file>
    <file path="src/app/(kairok)/kairok/components/WaitlistDialog.tsx">
<![CDATA['use client';
import React, { useEffect, useRef, useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { CAMERA_FINISHES, CameraFinishId } from '../lib/assets';
import { validateWaitlistInput } from '../lib/motion';

export interface WaitlistDialogProps {
  isOpen: boolean;
  onClose: () => void;
  preferredFinish: CameraFinishId;
  onChangePreferredFinish: (finish: CameraFinishId) => void;
}

const STORAGE_KEY = 'kairo_k01_demo_waitlist';

export const WaitlistDialog: React.FC<WaitlistDialogProps> = ({
  isOpen,
  onClose,
  preferredFinish,
  onChangePreferredFinish,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedEntry, setSubmittedEntry] = useState<{
    email: string;
    finish: CameraFinishId;
  } | null>(null);

  const emailInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setErrorMessage(null);

    const timer = window.setTimeout(() => {
      emailInputRef.current?.focus();
    }, 40);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateWaitlistInput(email);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Please enter a valid email address.');
      return;
    }

    setErrorMessage(null);
    const payload = {
      email: validation.normalizedEmail,
      name: name.trim(),
      finish: preferredFinish,
      savedAt: new Date().toISOString(),
    };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota errors in restricted environments
    }

    setSubmittedEntry({
      email: validation.normalizedEmail,
      finish: preferredFinish,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="kairo-waitlist-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121315]/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-[2px] bg-[#181a1e] border border-[#f2efe9]/20 p-6 md:p-8 text-[#f2efe9] shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono-kairo text-xs tracking-[0.2em] text-[#e68f63]">
              KAIRO / K-01 DISPATCH
            </p>
            <h2
              id="kairo-waitlist-title"
              className="font-display-kairo mt-1.5 text-2xl md:text-3xl font-semibold text-[#f2efe9]"
            >
              Join the KAIRO list
            </h2>
          </div>

          <button
            type="button"
            aria-label="Close waitlist dialog"
            onClick={onClose}
            className="inline-flex items-center justify-center w-9 h-9 rounded-[2px] border border-[#f2efe9]/15 text-[#a8aaa9] hover:text-[#f2efe9] hover:border-[#e68f63] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submittedEntry ? (
          <div className="mt-6 pt-6 border-t border-[#f2efe9]/12">
            <div className="flex items-start gap-3 p-4 rounded-[2px] bg-[#121315] border border-[#e68f63]/45">
              <CheckCircle2 className="w-5 h-5 text-[#e68f63] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display-kairo text-base font-semibold text-[#f2efe9]">
                  Local concept preference recorded
                </h3>
                <p className="mt-1 text-xs md:text-sm leading-relaxed text-[#a8aaa9]">
                  Recorded <span className="text-[#f2efe9]">{submittedEntry.email}</span>{' '}
                  with interest in the{' '}
                  <span className="text-[#e68f63] uppercase font-mono-kairo">
                    {submittedEntry.finish}
                  </span>{' '}
                  finish.
                </p>
                <p className="mt-2 font-mono-kairo text-[11px] text-[#a8aaa9]">
                  Demo transparency note: KAIRO K-01 is a fictional camera concept.
                  Your entry is stored locally in this browser only and no external
                  email was transmitted.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setSubmittedEntry(null);
                  setEmail('');
                }}
                className="kairo-btn-secondary"
              >
                Update preference
              </button>
              <button
                type="button"
                onClick={onClose}
                className="kairo-btn-primary"
              >
                Return to KAIRO
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-5">
            <p className="text-sm text-[#a8aaa9] leading-relaxed">
              Explore how the K-01 concept develops. This interactive preview
              validates your input locally without sending data to an external server.
            </p>

            <div>
              <label
                htmlFor="waitlist-email"
                className="block font-mono-kairo text-xs text-[#f2efe9] mb-2"
              >
                EMAIL ADDRESS *
              </label>
              <input
                ref={emailInputRef}
                id="waitlist-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="photographer@studio.com"
                aria-invalid={Boolean(errorMessage)}
                aria-describedby={errorMessage ? 'waitlist-email-error' : undefined}
                className="w-full px-4 py-3 text-sm bg-[#121315] border border-[#f2efe9]/20 rounded-[2px] text-[#f2efe9] placeholder:text-[#a8aaa9]/50 focus:border-[#e68f63] focus:outline-none"
              />
              {errorMessage && (
                <p
                  id="waitlist-email-error"
                  role="alert"
                  className="mt-2 text-xs font-mono-kairo text-[#e68f63]"
                >
                  {errorMessage}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="waitlist-name"
                className="block font-mono-kairo text-xs text-[#f2efe9]/80 mb-2"
              >
                NAME OR STUDIO (OPTIONAL)
              </label>
              <input
                id="waitlist-name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Elena Vance"
                className="w-full px-4 py-3 text-sm bg-[#121315] border border-[#f2efe9]/20 rounded-[2px] text-[#f2efe9] placeholder:text-[#a8aaa9]/50 focus:border-[#e68f63] focus:outline-none"
              />
            </div>

            <div>
              <span className="block font-mono-kairo text-xs text-[#f2efe9]/80 mb-2">
                PREFERRED K-01 FINISH
              </span>
              <div className="grid grid-cols-3 gap-2">
                {CAMERA_FINISHES.map((finish) => {
                  const selected = finish.id === preferredFinish;
                  return (
                    <button
                      key={finish.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onChangePreferredFinish(finish.id)}
                      className={`py-2.5 px-3 text-xs font-mono-kairo rounded-[2px] border transition-colors cursor-pointer ${
                        selected
                          ? 'bg-[#e68f63] text-[#121315] border-[#e68f63] font-semibold'
                          : 'bg-[#121315] text-[#f2efe9]/80 border-[#f2efe9]/15 hover:border-[#e68f63]'
                      }`}
                    >
                      {finish.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="font-mono-kairo text-[11px] text-[#a8aaa9]">
                Interactive local demo · Press Esc to close
              </p>
              <button type="submit" className="kairo-btn-primary">
                Join the KAIRO list
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(kairok)/kairok/hooks/useFrameScrubber.ts">
<![CDATA[import { RefObject, useEffect, useRef, useState } from 'react';
import {
  KAIRO_ASSETS,
  SEQUENCE_FRAME_COUNT,
  getSequenceFrameUrl,
} from '../lib/assets';

export interface FrameScrubberStatus {
  ready: boolean;
  loadedFramesCount: number;
  usingVideoFallback: boolean;
}

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  canvasWidth: number,
  canvasHeight: number
) {
  if (!sourceWidth || !sourceHeight || !canvasWidth || !canvasHeight) return;
  const scale = Math.max(canvasWidth / sourceWidth, canvasHeight / sourceHeight);
  const drawW = sourceWidth * scale;
  const drawH = sourceHeight * scale;
  const offsetX = (canvasWidth - drawW) * 0.5;
  const offsetY = (canvasHeight - drawH) * 0.5;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(source, offsetX, offsetY, drawW, drawH);
}

export function useFrameScrubber(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
  sequenceFrame: number,
  videoTimeSec: number,
  disabled = false
): FrameScrubberStatus {
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const [ready, setReady] = useState(false);
  const [loadedFramesCount, setLoadedFramesCount] = useState(0);
  const [usingVideoFallback, setUsingVideoFallback] = useState(false);
  const lastDrawnFrameRef = useRef<number>(-1);
  const seekingRef = useRef<boolean>(false);
  const pendingTimeRef = useRef<number | null>(null);

  // Preload boundary posters and sequence frames in priority tiers
  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;
    let cancelled = false;
    const cache = imagesRef.current;

    const loadSingleFrame = (index: number, urlOverride?: string): Promise<HTMLImageElement | null> => {
      if (cache.has(index)) {
        return Promise.resolve(cache.get(index) || null);
      }
      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = urlOverride || getSequenceFrameUrl(index);
        img.onload = () => {
          if (cancelled) {
            resolve(null);
            return;
          }
          cache.set(index, img);
          setLoadedFramesCount(cache.size);
          if (index === 1 || cache.size >= 4) {
            setReady(true);
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
      });
    };

    const runPreload = async () => {
      // Tier 1: Exact first and last frames immediately so endpoints are rock-solid
      const firstImg = await loadSingleFrame(1, KAIRO_ASSETS.videoFirst);
      await loadSingleFrame(SEQUENCE_FRAME_COUNT, KAIRO_ASSETS.videoLast);

      if (!firstImg && !cancelled) {
        // Sequence files unavailable — activate <video> seek fallback
        setUsingVideoFallback(true);
        setReady(true);
        return;
      }

      // Tier 2: Keyframes every 6 frames across the 120-frame sequence
      const tier2: number[] = [];
      for (let i = 1; i <= SEQUENCE_FRAME_COUNT; i += 6) {
        if (!cache.has(i)) tier2.push(i);
      }
      await Promise.all(tier2.map((idx) => loadSingleFrame(idx)));

      if (cancelled) return;

      // Tier 3: Remaining intermediate frames in small non-blocking batches of 10
      const remaining: number[] = [];
      for (let i = 1; i <= SEQUENCE_FRAME_COUNT; i++) {
        if (!cache.has(i)) remaining.push(i);
      }
      for (let b = 0; b < remaining.length; b += 10) {
        if (cancelled) break;
        const batch = remaining.slice(b, b + 10);
        await Promise.all(batch.map((idx) => loadSingleFrame(idx)));
      }
    };

    runPreload();

    return () => {
      cancelled = true;
    };
  }, [disabled]);

  // Draw the closest available frame to the canvas whenever sequenceFrame or viewport size changes
  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;

    const renderFrameToCanvas = (force = false) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const targetW = Math.max(1, Math.round(rect.width * dpr));
      const targetH = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        force = true;
      }

      // Find exact frame or nearest cached frame
      const cache = imagesRef.current;
      let chosenImg = cache.get(sequenceFrame);
      let chosenIdx = sequenceFrame;

      if (!chosenImg && cache.size > 0) {
        let bestDist = Infinity;
        for (const [idx, img] of cache.entries()) {
          const dist = Math.abs(idx - sequenceFrame);
          if (dist < bestDist) {
            bestDist = dist;
            chosenImg = img;
            chosenIdx = idx;
          }
        }
      }

      if (chosenImg && (force || lastDrawnFrameRef.current !== chosenIdx)) {
        drawCoverImage(
          ctx,
          chosenImg,
          chosenImg.naturalWidth || 1280,
          chosenImg.naturalHeight || 720,
          canvas.width,
          canvas.height
        );
        lastDrawnFrameRef.current = chosenIdx;
      }
    };

    renderFrameToCanvas(false);

    const handleResize = () => renderFrameToCanvas(true);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef, sequenceFrame, loadedFramesCount, disabled]);

  // Coalesced <video> seek controller for fallback or supplemental sync
  useEffect(() => {
    const video = videoRef.current;
    if (!video || disabled) return;

    const applySeek = (targetSec: number) => {
      if (!Number.isFinite(video.duration) || video.readyState < 1) return;
      const safeTime = Math.max(0, Math.min(video.duration - 0.04, targetSec));
      if (Math.abs(video.currentTime - safeTime) < 0.03) return;

      if (seekingRef.current) {
        pendingTimeRef.current = safeTime;
        return;
      }

      seekingRef.current = true;
      try {
        video.currentTime = safeTime;
      } catch {
        seekingRef.current = false;
      }
    };

    const handleSeeked = () => {
      seekingRef.current = false;
      if (pendingTimeRef.current !== null) {
        const nextTime = pendingTimeRef.current;
        pendingTimeRef.current = null;
        applySeek(nextTime);
      }
    };

    video.addEventListener('seeked', handleSeeked);
    applySeek(videoTimeSec);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [videoRef, videoTimeSec, disabled]);

  return {
    ready,
    loadedFramesCount,
    usingVideoFallback,
  };
}
]]>
    </file>
    <file path="src/app/(kairok)/kairok/hooks/useReducedMotion.ts">
<![CDATA['use client';
import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => {};
  }
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () =>
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia(QUERY).matches
        : false,
    () => false
  );
}
]]>
    </file>
    <file path="src/app/(kairok)/kairok/hooks/useScrollProgress.ts">
<![CDATA[import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { clamp01 } from '../lib/motion';

export interface ScrollProgressResult {
  progress: number;
  rawProgress: number;
  isPinned: boolean;
  scrollToProgress: (targetProgress: number, behavior?: ScrollBehavior) => void;
}

export function useScrollProgress(
  containerRef: RefObject<HTMLElement | null>,
  disabled = false
): ScrollProgressResult {
  const [progress, setProgress] = useState(0);
  const [rawProgress, setRawProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  const targetRef = useRef(0);
  const smoothedRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const measureScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el || typeof window === 'undefined') return 0;
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 900;
    const scrollableDistance = Math.max(1, el.offsetHeight - viewportHeight);
    const nextRaw = clamp01(-rect.top / scrollableDistance);
    const pinnedNow = rect.top <= 4 && rect.bottom >= viewportHeight - 4;
    setIsPinned(pinnedNow);
    return nextRaw;
  }, [containerRef]);

  useEffect(() => {
    if (disabled || typeof window === 'undefined') {
      setProgress(0);
      setRawProgress(0);
      setIsPinned(false);
      return;
    }

    let active = true;

    const tick = (now: number) => {
      if (!active) return;
      const dt = lastTimeRef.current ? Math.min(64, now - lastTimeRef.current) : 16.67;
      lastTimeRef.current = now;

      const measured = measureScroll();
      targetRef.current = measured;

      const current = smoothedRef.current;
      const diff = targetRef.current - current;

      // Time-corrected exponential damping (~140ms response)
      const alpha = 1 - Math.exp(-dt / 42);
      const next = Math.abs(diff) < 0.0004 ? targetRef.current : current + diff * alpha;

      if (Math.abs(next - smoothedRef.current) > 0.0002 || Math.abs(measured - rawProgress) > 0.001) {
        smoothedRef.current = next;
        setProgress(next);
        setRawProgress(measured);
      }

      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    const initial = measureScroll();
    targetRef.current = initial;
    smoothedRef.current = initial;
    setProgress(initial);
    setRawProgress(initial);

    const handleScrollOrResize = () => {
      const m = measureScroll();
      targetRef.current = m;
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    rafIdRef.current = window.requestAnimationFrame(tick);

    return () => {
      active = false;
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [disabled, measureScroll, rawProgress]);

  const scrollToProgress = useCallback(
    (targetProgress: number, behavior: ScrollBehavior = 'smooth') => {
      const el = containerRef.current;
      if (!el || typeof window === 'undefined') return;
      const rect = el.getBoundingClientRect();
      const containerTop = window.scrollY + rect.top;
      const viewportHeight = window.innerHeight || 900;
      const scrollableDistance = Math.max(1, el.offsetHeight - viewportHeight);
      const targetScrollY = containerTop + clamp01(targetProgress) * scrollableDistance;
      window.scrollTo({
        top: targetScrollY,
        behavior,
      });
    },
    [containerRef]
  );

  return {
    progress,
    rawProgress,
    isPinned,
    scrollToProgress,
  };
}
]]>
    </file>
    <file path="src/app/(kairok)/kairok/lib/assets.ts">
<![CDATA[export const KAIRO_ASSETS = {
  hero: '/templates/kairok/kairo-01-hero-camera.webp',
  cameraCutout: '/templates/kairok/kairo-02-camera-cutout-alpha.png',
  lens: '/templates/kairok/kairo-03-lens-macro.webp',
  city: '/templates/kairok/kairo-04-city-environment.webp',
  sensor: '/templates/kairok/kairo-05-sensor-detail.webp',
  exploded: '/templates/kairok/kairo-06-exploded-camera.webp',
  lineup: '/templates/kairok/kairo-07-camera-collection.webp',
  sample: '/templates/kairok/kairo-08-sample-photo.webp',
  flythrough: '/templates/kairok/kairo-09-lens-to-city-flythrough.mp4',
  videoFirst: '/templates/kairok/kairo-video-first.webp',
  videoLast: '/templates/kairok/kairo-video-last.webp',
  icons: {
    aperture: '/templates/kairok/icons/aperture.svg',
    reticle: '/templates/kairok/icons/reticle.svg',
    arrowUpRight: '/templates/kairok/icons/arrow-up-right.svg',
  },
} as const;

export const SEQUENCE_FRAME_COUNT = 120;
export const FLYTHROUGH_DURATION_SEC = 7.91;

export function getSequenceFrameUrl(frameNumber1Based: number): string {
  const clamped = Math.max(1, Math.min(SEQUENCE_FRAME_COUNT, Math.round(frameNumber1Based)));
  const padded = String(clamped).padStart(3, '0');
  return `/templates/kairok/sequence/frame-${padded}.webp`;
}

export interface CityHotspot {
  id: 'light' | 'depth' | 'motion' | 'detail';
  code: string;
  label: string;
  title: string;
  xPercent: number;
  yPercent: number;
  summary: string;
  opticalNote: string;
  focusZone: 'shopfront' | 'distant' | 'balanced';
}

export const CITY_HOTSPOTS: CityHotspot[] = [
  {
    id: 'light',
    code: 'FN-01',
    label: 'LIGHT',
    title: 'Warm practical highlights without blooming spill',
    xPercent: 24,
    yPercent: 54,
    summary:
      'Incandescent storefront bulbs hold their warm filament core against the damp brick facade while surrounding shadow detail stays intact.',
    opticalNote: 'Illustrative concept note · Highlight roll-off study',
    focusZone: 'shopfront',
  },
  {
    id: 'motion',
    code: 'FN-02',
    label: 'MOTION',
    title: 'Quiet stillness inside a moving street',
    xPercent: 32,
    yPercent: 62,
    summary:
      'A figure beneath an umbrella separates cleanly from the wet pavement reflections, preserving posture and atmosphere in low ambient light.',
    opticalNote: 'Illustrative concept note · Subject separation study',
    focusZone: 'shopfront',
  },
  {
    id: 'depth',
    code: 'FN-03',
    label: 'DEPTH',
    title: 'Layered atmospheric perspective into the mist',
    xPercent: 50,
    yPercent: 52,
    summary:
      'From foreground crosswalk texture to distant traffic signals suspended in rain haze, tonal planes recede naturally without artificial flattening.',
    opticalNote: 'Illustrative concept note · Axial transition study',
    focusZone: 'distant',
  },
  {
    id: 'detail',
    code: 'FN-04',
    label: 'DETAIL',
    title: 'Micro-texture across rain-slicked asphalt',
    xPercent: 72,
    yPercent: 74,
    summary:
      'Copper and amber reflections skim across wet stone grain and painted road markings without harsh digital oversharpening.',
    opticalNote: 'Illustrative concept note · Surface micro-contrast study',
    focusZone: 'balanced',
  },
];

export type FocusEmphasisMode = 'balanced' | 'shopfront' | 'distant';

export interface FocusEmphasisConfig {
  id: FocusEmphasisMode;
  label: string;
  subtitle: string;
  description: string;
  focalOriginX: number;
  focalOriginY: number;
  vignetteOpacity: number;
  edgeBlurPx: number;
}

export const FOCUS_EMPHASIS_MODES: FocusEmphasisConfig[] = [
  {
    id: 'balanced',
    label: 'Full Street Frame',
    subtitle: 'Natural deep field across foreground & avenue',
    description:
      'Balanced scene rendering across both the warm corner bistro and the misty avenue vanishing point.',
    focalOriginX: 50,
    focalOriginY: 56,
    vignetteOpacity: 0.22,
    edgeBlurPx: 0,
  },
  {
    id: 'shopfront',
    label: 'Shopfront Warmth',
    subtitle: 'Near-plane emphasis on awning light & umbrella figure',
    description:
      'Draws visual weight toward the illuminated left-side storefront and pedestrian silhouette while softening distant traffic glare.',
    focalOriginX: 28,
    focalOriginY: 58,
    vignetteOpacity: 0.48,
    edgeBlurPx: 3.5,
  },
  {
    id: 'distant',
    label: 'Distant Signals',
    subtitle: 'Far-plane emphasis down the rain-wet corridor',
    description:
      'Centers emphasis on the suspended street lamps and receding tail lights in the central atmospheric mist.',
    focalOriginX: 51,
    focalOriginY: 50,
    vignetteOpacity: 0.45,
    edgeBlurPx: 3.0,
  },
];

export type ApertureStateId = 'open' | 'balanced' | 'narrow';

export interface AperturePreset {
  id: ApertureStateId;
  label: string;
  displayStop: string;
  irisRadiusPercent: number;
  bladeRotationDeg: number;
  sampleBlurPx: number;
  vignetteStrength: number;
  lightTransmissionLabel: string;
  characterTitle: string;
  description: string;
}

export const APERTURE_PRESETS: AperturePreset[] = [
  {
    id: 'open',
    label: 'Open',
    displayStop: 'Wide · Shallow Plane',
    irisRadiusPercent: 78,
    bladeRotationDeg: 0,
    sampleBlurPx: 4.5,
    vignetteStrength: 0.46,
    lightTransmissionLabel: 'Maximum ambient gathering',
    characterTitle: 'Intimate subject isolation in nocturnal light',
    description:
      'Opens the mechanical iris to gather every trace of street-level tungsten and neon, melting background clutter into smooth circular bokeh.',
  },
  {
    id: 'balanced',
    label: 'Balanced',
    displayStop: 'Mid · Contextual Depth',
    irisRadiusPercent: 52,
    bladeRotationDeg: 18,
    sampleBlurPx: 1.5,
    vignetteStrength: 0.26,
    lightTransmissionLabel: 'Equilibrium of subject & place',
    characterTitle: 'Crisp subject framing with environmental story',
    description:
      'Balances center-to-corner clarity with gentle depth separation—made for documentary street frames where place matters as much as portrait.',
  },
  {
    id: 'narrow',
    label: 'Narrow',
    displayStop: 'Stopped Down · Deep Field',
    irisRadiusPercent: 28,
    bladeRotationDeg: 36,
    sampleBlurPx: 0,
    vignetteStrength: 0.14,
    lightTransmissionLabel: 'Structured point-source geometry',
    characterTitle: 'Edge-to-edge architectural precision',
    description:
      'Contracts the nine-blade iris to hold foreground pavement texture, mid-ground figures, and distant skyline geometry in simultaneous focus.',
  },
];

export interface EngineeringCallout {
  id: 'optical-assembly' | 'image-sensor' | 'body-control';
  index: string;
  code: string;
  label: string;
  headline: string;
  xPercent: number;
  yPercent: number;
  imagePanXPercent: number;
  imageScale: number;
  summary: string;
  detailPoints: string[];
}

export const ENGINEERING_CALLOUTS: EngineeringCallout[] = [
  {
    id: 'optical-assembly',
    index: '01',
    code: 'OPTICAL ASSEMBLY',
    label: 'OPTICAL ASSEMBLY',
    headline: 'Multi-group glass pathway with anodized copper control ring',
    xPercent: 31,
    yPercent: 60,
    imagePanXPercent: 28,
    imageScale: 1.12,
    summary:
      'Precision-aligned optical groups sit inside a damped barrel with a signature copper accent ring engineered for deliberate manual focus throw.',
    detailPoints: [
      'Nine-blade circular iris geometry for smooth out-of-focus transitions',
      'Anti-reflective multi-coating formulated to tame harsh wet-street glare',
      'Tactile knurled focus collar with consistent mechanical resistance',
    ],
  },
  {
    id: 'image-sensor',
    index: '02',
    code: 'IMAGE SENSOR',
    label: 'IMAGE SENSOR',
    headline: 'Direct light path onto the recessed full-surface sensor mount',
    xPercent: 69,
    yPercent: 49,
    imagePanXPercent: 65,
    imageScale: 1.16,
    summary:
      'A short flange focal distance places the rear glass element close to the sensor plane, preserving oblique light rays across the frame edges.',
    detailPoints: [
      'Machined stainless bayonet throat with copper-toned contact array',
      'Matte light-baffled inner chamber to suppress internal stray reflections',
      'Illustrative concept architecture designed around tonal latitude',
    ],
  },
  {
    id: 'body-control',
    index: '03',
    code: 'BODY & CONTROL',
    label: 'BODY & CONTROL',
    headline: 'Monolithic top deck with twin milled tactile dials',
    xPercent: 79,
    yPercent: 27,
    imagePanXPercent: 76,
    imageScale: 1.12,
    summary:
      'Sculpted from a single top plate with low-profile command dials and a sculpted thumb contour so your eye never has to leave the frame.',
    detailPoints: [
      'Direct physical dials for intuitive exposure and focus mode adjustments',
      'Textured high-grip bolster balanced for one-handed street carry',
      'Uncluttered top profile free of unnecessary status screens or distractions',
    ],
  },
];

export type CameraFinishId = 'carbon' | 'silver' | 'titanium';

export interface CameraFinishOption {
  id: CameraFinishId;
  name: string;
  fullName: string;
  swatchHex: string;
  accentHex: string;
  cropPositionXPercent: number;
  cropOriginXPercent: number;
  surfaceNote: string;
  description: string;
  characterNote: string;
}

export const CAMERA_FINISHES: CameraFinishOption[] = [
  {
    id: 'carbon',
    name: 'Carbon',
    fullName: 'K-01 · Stealth Carbon & Brushed Slate',
    swatchHex: '#1f2226',
    accentHex: '#e68f63',
    cropPositionXPercent: 0,
    cropOriginXPercent: 18,
    surfaceNote: 'Matte carbon lower chassis · Dark graphite top plate · Copper ring',
    description:
      'Designed to disappear into night streets and dimly lit interiors. The deep carbon finish minimizes reflections when shooting through glass or rain.',
    characterNote: 'Left unit in collection study · Low-visibility street profile',
  },
  {
    id: 'silver',
    name: 'Silver',
    fullName: 'K-01 · Bead-Blasted Alumina Silver',
    swatchHex: '#9ea3a8',
    accentHex: '#e68f63',
    cropPositionXPercent: 50,
    cropOriginXPercent: 50,
    surfaceNote: 'Fine-grain silver alloy body · Black textured grip · Copper ring',
    description:
      'A bright, sculptural tribute to classic mechanical instruments. Fine bead-blasting catches natural daylight across every chamfered edge.',
    characterNote: 'Center unit in collection study · Classic studio silhouette',
  },
  {
    id: 'titanium',
    name: 'Titanium',
    fullName: 'K-01 · Warm Raw Titanium',
    swatchHex: '#6e6963',
    accentHex: '#e68f63',
    cropPositionXPercent: 100,
    cropOriginXPercent: 82,
    surfaceNote: 'Warm mineral titanium finish · Obsidian grip · Copper ring',
    description:
      'An understated warm metallic tone that bridges dark carbon and classic silver, pairing organically with the warm copper lens ring.',
    characterNote: 'Right unit in collection study · Warm architectural finish',
  },
];
]]>
    </file>
    <file path="src/app/(kairok)/kairok/lib/motion.ts">
<![CDATA[import { FLYTHROUGH_DURATION_SEC, SEQUENCE_FRAME_COUNT } from './assets';

export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function clamp01(value: number): number {
  return clamp(value, 0, 1);
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * clamp01(t);
}

export function segment(progress: number, start: number, end: number): number {
  if (end <= start) return progress >= end ? 1 : 0;
  return clamp01((progress - start) / (end - start));
}

export function smoothstep(t: number): number {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

export type StoryBeatId =
  | 'hero'
  | 'approach'
  | 'aperture'
  | 'arrival'
  | 'field-notes'
  | 'handoff';

export interface StoryBeatMeta {
  id: StoryBeatId;
  indexLabel: string;
  shortTitle: string;
  caption: string;
}

export const STORY_BEATS: Record<StoryBeatId, StoryBeatMeta> = {
  hero: {
    id: 'hero',
    indexLabel: '01 / THE OBJECT',
    shortTitle: 'THE OBJECT',
    caption: 'See beyond the expected.',
  },
  approach: {
    id: 'approach',
    indexLabel: '02 / THE APPROACH',
    shortTitle: 'THE APPROACH',
    caption: 'Look closer.',
  },
  aperture: {
    id: 'aperture',
    indexLabel: '03 / THE APERTURE',
    shortTitle: 'THE APERTURE',
    caption: 'Every detail changes the story.',
  },
  arrival: {
    id: 'arrival',
    indexLabel: '04 / THROUGH THE FRAME',
    shortTitle: 'THROUGH THE FRAME',
    caption: 'Make the ordinary impossible to overlook.',
  },
  'field-notes': {
    id: 'field-notes',
    indexLabel: '05 / FIELD NOTES',
    shortTitle: 'FIELD NOTES',
    caption: 'A world worth noticing.',
  },
  handoff: {
    id: 'handoff',
    indexLabel: '06 / THE HANDOFF',
    shortTitle: 'THE HANDOFF',
    caption: 'Form meets focus.',
  },
};

export interface ComputedStoryState {
  progress: number;
  beat: StoryBeatId;
  beatMeta: StoryBeatMeta;
  stepNumber: number; // 1..6
  /** Normalized progress of the flythrough video/sequence (0..1) */
  videoProgress: number;
  /** 1-based sequence frame index (1..120) */
  sequenceFrame: number;
  /** Target video time in seconds (0..7.91) */
  videoTimeSec: number;
  /** Opacity of Scene 1 Hero overlay & cutout */
  heroOpacity: number;
  /** Y-translation of Hero headline in px */
  heroTranslateY: number;
  /** Scale of foreground camera cutout during initial push */
  heroCutoutScale: number;
  /** Opacity of foreground camera cutout (fades smoothly into aligned video frame) */
  heroCutoutOpacity: number;
  /** Opacity of Scene 2 approach annotation */
  approachOpacity: number;
  /** Opacity of Scene 3 aperture reticle & transient copy */
  apertureOpacity: number;
  /** Rotation of subtle optical reticle in degrees */
  apertureRotationDeg: number;
  /** Warm copper optical glint opacity around aperture threshold */
  copperGlintOpacity: number;
  /** Opacity of Scene 4 arrival headline */
  arrivalOpacity: number;
  /** Opacity of Scene 5 field notes hotspots & focus explorer */
  fieldNotesOpacity: number;
  /** Whether Scene 5 interactive hotspots should receive pointer events */
  fieldNotesInteractive: boolean;
  /** Progress of Scene 6 optical handoff curtain (0..1) */
  handoffProgress: number;
}

export function getBeatFromProgress(p: number): StoryBeatId {
  const clamped = clamp01(p);
  if (clamped < 0.12) return 'hero';
  if (clamped < 0.29) return 'approach';
  if (clamped < 0.48) return 'aperture';
  if (clamped < 0.66) return 'arrival';
  if (clamped < 0.86) return 'field-notes';
  return 'handoff';
}

export function computeStoryState(rawProgress: number): ComputedStoryState {
  const p = clamp01(rawProgress);
  const beat = getBeatFromProgress(p);
  const beatMeta = STORY_BEATS[beat];

  const stepMap: Record<StoryBeatId, number> = {
    hero: 1,
    approach: 2,
    aperture: 3,
    arrival: 4,
    'field-notes': 5,
    handoff: 6,
  };

  // Map scroll progress 0.06..0.64 to full 0..1 video scrubbing so:
  // - 0.00..0.06: Camera sits poised in studio (frame 1)
  // - 0.06..0.29: Push toward lens (frames 1..50)
  // - 0.29..0.48: Inside the optical barrel & iris opening (frames 50..88)
  // - 0.48..0.64: Emerges into wet city street & settles at frame 120
  // - 0.64..1.00: Holds stable city frame 120 for Field Notes & Handoff
  const videoProgress = smoothstep(segment(p, 0.06, 0.64));
  const sequenceFrame = Math.max(
    1,
    Math.min(SEQUENCE_FRAME_COUNT, Math.round(1 + videoProgress * (SEQUENCE_FRAME_COUNT - 1)))
  );
  const videoTimeSec = Number((videoProgress * FLYTHROUGH_DURATION_SEC).toFixed(3));

  // Scene 1: Hero copy & cutout
  const heroFadeOut = smoothstep(segment(p, 0.08, 0.21));
  const heroOpacity = 1 - heroFadeOut;
  const heroTranslateY = -lerp(0, 72, heroFadeOut);

  // Foreground cutout aligns at rest and crossfades cleanly into video as approach starts
  const cutoutFade = smoothstep(segment(p, 0.04, 0.14));
  const heroCutoutOpacity = 1 - cutoutFade;
  const heroCutoutScale = lerp(1, 1.08, smoothstep(segment(p, 0, 0.14)));

  // Scene 2: Approach subtle caption
  const approachIn = smoothstep(segment(p, 0.13, 0.18));
  const approachOut = smoothstep(segment(p, 0.24, 0.29));
  const approachOpacity = clamp01(approachIn - approachOut);

  // Scene 3: Aperture optical pass & "Every detail changes the story."
  const apertureIn = smoothstep(segment(p, 0.29, 0.34));
  const apertureOut = smoothstep(segment(p, 0.43, 0.48));
  const apertureOpacity = clamp01(apertureIn - apertureOut);
  const apertureRotationDeg = lerp(-18, 24, segment(p, 0.26, 0.50));

  // Subtle warm copper flash right as the iris blades part (around p = 0.44..0.52)
  const glintIn = smoothstep(segment(p, 0.42, 0.47));
  const glintOut = smoothstep(segment(p, 0.47, 0.54));
  const copperGlintOpacity = clamp01(glintIn - glintOut) * 0.38;

  // Scene 4: City arrival caption ("Make the ordinary impossible to overlook.")
  const arrivalIn = smoothstep(segment(p, 0.50, 0.55));
  const arrivalOut = smoothstep(segment(p, 0.62, 0.67));
  const arrivalOpacity = clamp01(arrivalIn - arrivalOut);

  // Scene 5: Field notes interactive stage (0.64..0.88)
  const fieldIn = smoothstep(segment(p, 0.64, 0.69));
  const fieldOut = smoothstep(segment(p, 0.85, 0.90));
  const fieldNotesOpacity = clamp01(fieldIn - fieldOut);
  const fieldNotesInteractive = p >= 0.63 && p <= 0.89;

  // Scene 6: Handoff iris/veil transition (0.86..1.00)
  const handoffProgress = smoothstep(segment(p, 0.86, 1.0));

  return {
    progress: p,
    beat,
    beatMeta,
    stepNumber: stepMap[beat],
    videoProgress,
    sequenceFrame,
    videoTimeSec,
    heroOpacity,
    heroTranslateY,
    heroCutoutScale,
    heroCutoutOpacity,
    approachOpacity,
    apertureOpacity,
    apertureRotationDeg,
    copperGlintOpacity,
    arrivalOpacity,
    fieldNotesOpacity,
    fieldNotesInteractive,
    handoffProgress,
  };
}

export interface WaitlistValidationResult {
  valid: boolean;
  error?: string;
  normalizedEmail: string;
}

export function validateWaitlistInput(email: string): WaitlistValidationResult {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    return {
      valid: false,
      error: 'Please enter an email address to receive KAIRO K-01 concept updates.',
      normalizedEmail: '',
    };
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailPattern.test(trimmed)) {
    return {
      valid: false,
      error: 'Please enter a valid email address (for example, name@domain.com).',
      normalizedEmail: trimmed.toLowerCase(),
    };
  }
  return {
    valid: true,
    normalizedEmail: trimmed.toLowerCase(),
  };
}
]]>
    </file>
    <file path="src/app/(kairok)/kairok/styles/cinematic-story.css">
<![CDATA[.kairo-story-track {
  position: relative;
  width: 100%;
  height: 580vh;
  background-color: var(--black-carbon);
}

@media (max-width: 1024px) {
  .kairo-story-track {
    height: 480vh;
  }
}

@media (max-width: 640px) {
  .kairo-story-track {
    height: 410vh;
  }
}

.kairo-story-sticky {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100svh;
  min-height: 560px;
  overflow: hidden;
  background-color: var(--black-carbon);
}

/* Shared 16:9 cover coordinate box for city hotspots so markers stay locked to subject features on any aspect ratio */
.kairo-cover-stage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: max(100vw, 177.78svh);
  height: max(100svh, 56.25vw);
  pointer-events: none;
}

/* Optical copper ring specular sweep on load */
@keyframes kairoLensGlint {
  0% {
    opacity: 0;
    transform: rotate(-35deg) scale(0.98);
  }
  35% {
    opacity: 0.55;
  }
  100% {
    opacity: 0;
    transform: rotate(25deg) scale(1.01);
  }
}

.kairo-lens-glint {
  animation: kairoLensGlint 2.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s 1 forwards;
}

/* Viewfinder reticle corner brackets */
.kairo-reticle-corner {
  position: absolute;
  width: 14px;
  height: 14px;
  border-color: rgba(230, 143, 99, 0.65);
  pointer-events: none;
}
]]>
    </file>
    <file path="src/app/(kairok)/kairok/styles/globals.css">
<![CDATA[:root {
  --black-carbon: #121315;
  --graphite: #1d2024;
  --titanium: #7f858d;
  --porcelain: #f2efe9;
  --copper: #e68f63;
  --copper-soft: #b8785d;
  --stone: #d2cec7;
  --body-muted: #a8aaa9;
  --panel-line: rgba(242, 239, 233, 0.15);
  --panel-line-dark: rgba(18, 19, 21, 0.12);

  --font-display: 'Bricolage Grotesque', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  background-color: var(--black-carbon);
  color: var(--porcelain);
  font-family: var(--font-sans);
  scroll-behavior: smooth;
  overflow-x: clip;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--black-carbon);
  color: var(--porcelain);
  font-family: var(--font-sans);
  overflow-x: clip;
  min-height: 100%;
  text-rendering: optimizeLegibility;
}

.font-display-kairo {
  font-family: var(--font-display);
}

.font-sans-kairo {
  font-family: var(--font-sans);
}

.font-mono-kairo {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}

/* Intentional keyboard focus ring */
:focus-visible {
  outline: 2px solid var(--copper);
  outline-offset: 3px;
}

/* Button edge copper line response */
.kairo-btn-primary {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 0.75rem 1.375rem;
  background-color: var(--porcelain);
  color: var(--black-carbon);
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: 1px solid rgba(242, 239, 233, 0.9);
  border-radius: 2px;
  transition:
    background-color 180ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 180ms cubic-bezier(0.16, 1, 0.3, 1),
    color 180ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  white-space: nowrap;
}

.kairo-btn-primary:hover {
  background-color: var(--copper);
  border-color: var(--copper);
  color: var(--black-carbon);
}

.kairo-btn-secondary {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 0.75rem 1.375rem;
  background-color: rgba(18, 19, 21, 0.55);
  color: var(--porcelain);
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  border: 1px solid rgba(242, 239, 233, 0.24);
  border-radius: 2px;
  backdrop-filter: blur(8px);
  transition:
    border-color 180ms cubic-bezier(0.16, 1, 0.3, 1),
    background-color 180ms cubic-bezier(0.16, 1, 0.3, 1),
    color 180ms cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  white-space: nowrap;
}

.kairo-btn-secondary:hover {
  border-color: var(--copper);
  background-color: rgba(230, 143, 99, 0.12);
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
  }
}
]]>
    </file>
    <file path="src/app/(kairok)/kairok/styles/product-sections.css">
<![CDATA[/* Optical handoff mask and editorial chapter surfaces */
.kairo-porcelain-chapter {
  background-color: var(--porcelain);
  color: var(--black-carbon);
}

.kairo-stone-chapter {
  background-color: var(--stone);
  color: var(--black-carbon);
}

.kairo-carbon-chapter {
  background-color: var(--black-carbon);
  color: var(--porcelain);
}

.kairo-hairline-top {
  border-top: 1px solid var(--panel-line);
}

.kairo-hairline-dark-top {
  border-top: 1px solid var(--panel-line-dark);
}

/* Smooth image pan for exploded camera and collection trio */
.kairo-pan-surface {
  transition:
    transform 520ms cubic-bezier(0.16, 1, 0.3, 1),
    object-position 520ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 320ms cubic-bezier(0.16, 1, 0.3, 1);
}
]]>
    </file>
  </files>
</template>
