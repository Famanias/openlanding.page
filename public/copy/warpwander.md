<template slug="warpwander" name="WARP & WANDER">
  <dependencies>
    {
      "dependencies": {
        "gsap": "^3.15.0"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(warpwander)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./warpwander/warpwander.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "WARP & WANDER — Every World Begins With Play | Featuring Analogue Pocket",
  description:
    "An original 16-bit-inspired side-scrolling pixel adventure and interactive concept showcasing the Analogue Pocket multi-format handheld.",
  openGraph: {
    title: "WARP & WANDER — Every World Begins With Play",
    description:
      "Pocket-sized portal. Endless possibility. Explore the interactive pixel world featuring Analogue Pocket.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#23244F",
  colorScheme: "dark",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="ww-body">{children}</body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/App.tsx">
<![CDATA['use client';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import {
  ACTS,
  ActDefinition,
  CARTRIDGE_ARTIFACTS,
  PRECISION_MARKERS,
  PrecisionFeatureMarker,
  getActiveActFromProgress,
} from './lib/world/worldMap';
import { soundEngine } from './lib/audio/soundEngine';
import { WorldCanvas } from './components/world/WorldCanvas';
import { FieldGuideNav } from './components/site/FieldGuideNav';
import { AnaloguePocketHardware } from './components/product/AnaloguePocketHardware';
import {
  CartridgeArtifactSprite,
  PipSpriteBadge,
  PixelCompassIcon,
} from './components/sprites/PixelArtSprites';
import { CloudCityMiniGame } from './components/game/CloudCityMiniGame';

export default function App() {
  const scrollProgressRef = useRef<number>(0);
  const heroContainerRef = useRef<HTMLDivElement | null>(null);

  const [activeAct, setActiveAct] = useState<ActDefinition>(ACTS[0]);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [trailMapOpen, setTrailMapOpen] = useState<boolean>(false);

  // Act 1: Discovered Cartridge Artifacts
  const [discoveredArtifactIds, setDiscoveredArtifactIds] = useState<string[]>(['artifact-gb']);
  const [selectedArtifactId, setSelectedArtifactId] = useState<string>('artifact-gb');

  // Act 2: Display View Mode ('pixel' | 'device')
  const [displayViewMode, setDisplayViewMode] = useState<'pixel' | 'device'>('device');

  // Act 3: Clockwork Ridge Precision Hardware Marker
  const [activeMarkerId, setActiveMarkerId] = useState<PrecisionFeatureMarker['id']>('dpad');

  // Act 4: Cloud City Mini-Game state
  const [collectedShardsCount, setCollectedShardsCount] = useState<number>(0);
  const [miniGameCompleted, setMiniGameCompleted] = useState<boolean>(false);

  // Act 5: Final Reveal Hardware Options
  const [pocketColorway, setPocketColorway] = useState<'black' | 'white'>('black');
  const [showRearCartridgeBay, setShowRearCartridgeBay] = useState<boolean>(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Initial Load Storyboard (Section 4 Act 0: 0.00s - 1.45s cadence)
  useEffect(() => {
    if (reducedMotion || !heroContainerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-title-group',
        { opacity: 0.15, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          delay: 0.2,
          ease: 'steps(4)',
        }
      );
      gsap.fromTo(
        '.hero-pip-badge',
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.45,
          delay: 0.45,
          ease: 'steps(5)',
        }
      );
      gsap.fromTo(
        '.hero-portal-hardware',
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.7,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }
      );
      gsap.fromTo(
        '.hero-cta-group',
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 1.0,
          ease: 'power2.out',
        }
      );
    }, heroContainerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Unified Single Scroll Driver correlating document scroll to horizontal World X
  useEffect(() => {
    const updateScroll = () => {
      const docEl = document.documentElement;
      const maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
      const rawProgress = window.scrollY / maxScroll;
      const clamped = Math.max(0, Math.min(1, rawProgress));
      scrollProgressRef.current = clamped;

      const nextAct = getActiveActFromProgress(clamped);
      setActiveAct((prev) => (prev.id !== nextAct.id ? nextAct : prev));
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  const handleJumpToSection = useCallback((actId: string) => {
    soundEngine.playButtonClick();
    const target = document.getElementById(actId);
    if (target) {
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }, [reducedMotion]);

  const handleToggleSound = useCallback(() => {
    const next = soundEngine.toggle();
    setSoundEnabled(next);
  }, []);

  const handleDiscoverArtifact = useCallback((artifactId: string) => {
    setSelectedArtifactId(artifactId);
    setDiscoveredArtifactIds((prev) => {
      if (prev.includes(artifactId)) {
        soundEngine.playButtonClick();
        return prev;
      }
      soundEngine.playArtifactDiscover();
      return [...prev, artifactId];
    });
  }, []);

  const handleReplayJourney = useCallback(() => {
    soundEngine.playButtonClick();
    setDiscoveredArtifactIds(['artifact-gb']);
    setSelectedArtifactId('artifact-gb');
    setDisplayViewMode('device');
    setActiveMarkerId('dpad');
    setShowRearCartridgeBay(false);
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [reducedMotion]);

  const selectedArtifact =
    CARTRIDGE_ARTIFACTS.find((a) => a.id === selectedArtifactId) || CARTRIDGE_ARTIFACTS[0];
  const selectedPrecisionMarker =
    PRECISION_MARKERS.find((m) => m.id === activeMarkerId) || PRECISION_MARKERS[0];

  return (
    <div className="relative min-h-screen text-[#FFF1D3] selection:bg-[#FFD06A] selection:text-[#23244F]">
      {/* Continuous 2D Pixel-Art Background World Canvas */}
      <WorldCanvas
        scrollProgressRef={scrollProgressRef}
        reducedMotion={reducedMotion}
        discoveredArtifactsCount={discoveredArtifactIds.length}
        miniGameCompleted={miniGameCompleted}
      />

      {/* Compact Field Guide Top Header & Compass Trail Progress Bar */}
      <FieldGuideNav
        activeAct={activeAct}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenTrailMap={() => {
          soundEngine.playButtonClick();
          setTrailMapOpen(true);
        }}
        onJumpToSection={handleJumpToSection}
        discoveredArtifactsCount={discoveredArtifactIds.length}
        collectedShardsCount={collectedShardsCount}
      />

      {/* Main Accessible DOM Story Milestones */}
      <main className="relative z-10">
        {/* =====================================================================
            ACT 0 — THE PORTAL / HERO
           ===================================================================== */}
        <section
          id="act-0"
          ref={heroContainerRef}
          aria-labelledby="heading-act-0"
          className="min-h-[90vh] max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-28 flex flex-col justify-center"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 ww-storybook-panel storybook-panel p-6 sm:p-10">
              <div className="ww-font-hud font-hud text-xs sm:text-sm text-[#FFD06A] tracking-wider mb-3">
                WW-01 · THE LOST LEVELS OF PLAY · FICTIONAL CREATIVE CONCEPT
              </div>

              <h1
                id="heading-act-0"
                className="hero-title-group ww-font-pixel font-pixel text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFF1D3] leading-[1.08] tracking-tight mb-4"
                style={{ textWrap: 'balance' }}
              >
                EVERY WORLD BEGINS WITH PLAY.
              </h1>

              <p className="text-lg sm:text-xl text-[#FFD06A] font-medium italic mb-3">
                Pocket-sized portal. Endless possibility.
              </p>

              <p className="text-base sm:text-lg text-[#FFF1D3]/90 leading-relaxed max-w-2xl mb-6">
                Meet the handheld that brings the classics along for the ride. Follow Pip the mapmaker across an original 16-bit-inspired landscape—and discover how the real{' '}
                <strong className="text-[#FFF1D3] font-semibold">Analogue Pocket</strong> turns physical game cartridges into living worlds.
              </p>

              {/* Pip Trail Guide Callout */}
              <div className="hero-pip-badge flex items-center gap-4 p-3.5 bg-[#191A3B] border border-[#604A79] mb-7">
                <PipSpriteBadge pose="idle" size={48} />
                <div>
                  <div className="ww-font-hud font-hud text-xs text-[#6DDCC5]">
                    PROTAGONIST · PIP THE MAPMAKER
                  </div>
                  <p className="text-xs sm:text-sm text-[#FFF1D3]/90">
                    Scroll down to travel horizontally along the Sunrise Valley trail, or jump directly to any milestone in the Field Guide.
                  </p>
                </div>
              </div>

              {/* Hero CTAs */}
              <div className="hero-cta-group flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleJumpToSection('act-1')}
                  className="ww-btn-tactile btn-tactile px-6 py-3.5 bg-[#FFD06A] text-[#23244F] ww-font-pixel font-pixel text-base sm:text-lg font-bold tracking-wide cursor-pointer whitespace-nowrap shrink-0"
                >
                  ENTER THE WORLD
                </button>

                <button
                  type="button"
                  onClick={() => handleJumpToSection('act-5')}
                  className="ww-btn-tactile btn-tactile px-6 py-3.5 bg-[#2F644F] text-[#FFF1D3] border-2 border-[#FFD06A] hover:bg-[#6DDCC5] hover:text-[#23244F] ww-font-pixel font-pixel text-base sm:text-lg font-bold tracking-wide cursor-pointer whitespace-nowrap shrink-0"
                >
                  MEET ANALOGUE POCKET
                </button>
              </div>
            </div>

            {/* Right Pixel-Portal Opening Framing Crisp Analogue Pocket Hardware */}
            <div className="lg:col-span-5 flex flex-col items-center hero-portal-hardware">
              <AnaloguePocketHardware variant="hero-portal" colorway="black" />
              <p className="mt-3 ww-font-hud font-hud text-xs text-[#FFF1D3]/85 text-center max-w-xs">
                Real hardware spotlight: Analogue Pocket multi-system portable handheld (cartridges not included).
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================================
            ACT 1 — THE FOREST OF CARTRIDGES
           ===================================================================== */}
        <section
          id="act-1"
          aria-labelledby="heading-act-1"
          className="scroll-mt-16 min-h-[90vh] max-w-7xl mx-auto px-4 sm:px-8 py-20 flex flex-col justify-center"
        >
          <div className="ww-storybook-panel storybook-panel p-6 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#604A79] pb-4">
              <div>
                <div className="ww-font-hud font-hud text-xs sm:text-sm text-[#6DDCC5] tracking-wider mb-1">
                  ACT 01 · THE FOREST OF CARTRIDGES · MULTI-FORMAT COMPATIBILITY
                </div>
                <h2
                  id="heading-act-1"
                  className="ww-font-pixel font-pixel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFF1D3]"
                  style={{ textWrap: 'balance' }}
                >
                  OLD ADVENTURES. NEW JOURNEYS.
                </h2>
              </div>

              <div className="ww-font-hud font-hud text-xs sm:text-sm text-[#FFD06A]">
                ARTIFACTS INSPECTED: {discoveredArtifactIds.length} / {CARTRIDGE_ARTIFACTS.length}
              </div>
            </div>

            <p className="text-base sm:text-lg text-[#FFF1D3]/90 leading-relaxed max-w-3xl mb-8">
              Analogue Pocket is a portable multi-system handheld designed for physical classic game cartridges. Out of the box, it supports{' '}
              <strong className="text-[#FFD06A]">Game Boy</strong>,{' '}
              <strong className="text-[#FFD06A]">Game Boy Color</strong>, and{' '}
              <strong className="text-[#FFD06A]">Game Boy Advance</strong> cartridges—while optional cartridge adapters open the door to other classic portable libraries. Inspect each forest artifact along the trail below:
            </p>

            {/* 3 Interactive Cartridge Artifacts Grid + Active Inspection Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left: 3 Collectible Cartridge Buttons */}
              <div className="lg:col-span-5 flex flex-col gap-4" role="listbox" aria-label="Cartridge Forest Artifacts">
                {CARTRIDGE_ARTIFACTS.map((artifact) => {
                  const isDiscovered = discoveredArtifactIds.includes(artifact.id);
                  const isSelected = selectedArtifactId === artifact.id;

                  return (
                    <button
                      key={artifact.id}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleDiscoverArtifact(artifact.id)}
                      className={`w-full text-left p-4 border-2 transition-all cursor-pointer flex items-center gap-4 ${
                        isSelected
                          ? 'bg-[#2F644F] border-[#FFD06A] shadow-[0_6px_0_0_#151633] -translate-y-0.5'
                          : 'bg-[#191A3B]/90 border-[#604A79] hover:border-[#FFD06A]'
                      }`}
                    >
                      <div className="ww-hotspot-float hotspot-float">
                        <CartridgeArtifactSprite
                          accentColor={artifact.accentColor}
                          glyphPattern={artifact.glyphPattern}
                          discovered={isDiscovered}
                          frame={isSelected ? 1 : 0}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="ww-font-hud font-hud text-xs text-[#FFD06A] mb-0.5">
                          {artifact.scrollUnlockMark} · {isDiscovered ? 'DISCOVERED' : 'UNINSPECTED'}
                        </div>
                        <div className="ww-font-pixel font-pixel text-lg text-[#FFF1D3] truncate">
                          {artifact.name}
                        </div>
                        <div className="text-xs sm:text-sm text-[#6DDCC5] font-medium">
                          {artifact.systemBadge}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right: Semantic Accessible Artifact Detail Panel (Never hover-only!) */}
              <div className="lg:col-span-7 ww-ww-storybook-panel storybook-panel-cream ww-storybook-panel storybook-panel-cream p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#23244F]/20 pb-3 mb-4">
                    <span className="ww-font-hud font-hud text-xs font-bold uppercase tracking-wider text-[#2F644F]">
                      FIELD LOG ENTRY · {selectedArtifact.worldLandmark}
                    </span>
                    <span className="ww-font-hud font-hud text-xs font-bold text-[#23244F]">
                      VERIFIED HARDWARE COMPATIBILITY
                    </span>
                  </div>

                  <h3 className="ww-font-pixel font-pixel text-2xl sm:text-3xl font-bold text-[#23244F] mb-2">
                    {selectedArtifact.systemBadge}
                  </h3>

                  <p className="text-base sm:text-lg font-semibold text-[#2F644F] mb-4">
                    {selectedArtifact.verifiedFact}
                  </p>

                  <p className="text-sm sm:text-base text-[#23244F]/90 leading-relaxed mb-6">
                    {selectedArtifact.detailDescription}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-[#23244F]/20 flex flex-wrap items-center justify-between gap-4">
                  <div className="ww-font-hud font-hud text-xs text-[#23244F]/80">
                    Physical cartridges &amp; adapters sold separately · No bundled games included
                  </div>
                  <button
                    type="button"
                    onClick={() => handleJumpToSection('act-2')}
                    className="ww-btn-tactile btn-tactile px-4 py-2 bg-[#23244F] text-[#FFF1D3] ww-font-pixel font-pixel text-xs sm:text-sm font-bold cursor-pointer whitespace-nowrap shrink-0"
                  >
                    CROSS TO CRYSTAL LAKE →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            ACT 2 — THE CRYSTAL LAKE / DISPLAY
           ===================================================================== */}
        <section
          id="act-2"
          aria-labelledby="heading-act-2"
          className="scroll-mt-16 min-h-[90vh] max-w-7xl mx-auto px-4 sm:px-8 py-20 flex flex-col justify-center"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ww-storybook-panel storybook-panel p-6 sm:p-10">
            {/* Left Copy & Interactive PIXEL VIEW / DEVICE VIEW Toggle */}
            <div className="lg:col-span-7">
              <div className="ww-font-hud font-hud text-xs sm:text-sm text-[#6DDCC5] tracking-wider mb-2">
                ACT 02 · THE CRYSTAL LAKE · HIGH-PPI DISPLAY CLARITY
              </div>

              <h2
                id="heading-act-2"
                className="ww-font-pixel font-pixel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFF1D3] mb-4"
                style={{ textWrap: 'balance' }}
              >
                A WINDOW INTO EVERY DETAIL.
              </h2>

              <p className="text-base sm:text-lg text-[#FFF1D3]/90 leading-relaxed mb-6">
                As Pip reaches the Crystalline Basin, the water reflects every tile with geometric precision. Analogue Pocket features a custom{' '}
                <strong className="text-[#FFD06A]">3.5-inch, 1600 × 1440 resolution LCD</strong>. At 615 pixels per inch, it delivers{' '}
                <strong className="text-[#6DDCC5]">10× the resolution</strong> of the original Game Boy—allowing exact integer scaling with zero fractional blur.
              </p>

              {/* Interactive PIXEL VIEW / DEVICE VIEW Segmented Toggle */}
              <div className="mb-6">
                <div className="ww-font-hud font-hud text-xs text-[#FFD06A] uppercase tracking-wider mb-2">
                  INTERACTIVE DISPLAY INSPECTION MODE:
                </div>
                <div
                  className="inline-flex p-1.5 bg-[#171838] border-2 border-[#FFD06A]"
                  role="group"
                  aria-label="Display inspection view toggle"
                >
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playButtonClick();
                      setDisplayViewMode('device');
                    }}
                    aria-pressed={displayViewMode === 'device'}
                    className={`px-5 py-2.5 ww-font-pixel font-pixel text-sm font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      displayViewMode === 'device'
                        ? 'bg-[#FFD06A] text-[#23244F]'
                        : 'text-[#FFF1D3] hover:text-[#FFD06A]'
                    }`}
                  >
                    DEVICE VIEW
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playButtonClick();
                      setDisplayViewMode('pixel');
                    }}
                    aria-pressed={displayViewMode === 'pixel'}
                    className={`px-5 py-2.5 ww-font-pixel font-pixel text-sm font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      displayViewMode === 'pixel'
                        ? 'bg-[#6DDCC5] text-[#23244F]'
                        : 'text-[#FFF1D3] hover:text-[#6DDCC5]'
                    }`}
                  >
                    PIXEL VIEW
                  </button>
                </div>
              </div>

              {/* Accessible Description Card that updates with Toggle */}
              <div className="p-5 bg-[#191A3B] border-2 border-[#6DDCC5] mb-6">
                <div className="ww-font-hud font-hud text-xs text-[#6DDCC5] mb-1">
                  {displayViewMode === 'pixel'
                    ? 'MODE · 10× INTEGER LATTICE MAGNIFICATION'
                    : 'MODE · PHYSICAL 3.5-INCH GORILLA GLASS LCD'}
                </div>
                <p className="text-sm sm:text-base text-[#FFF1D3]/95 leading-relaxed">
                  {displayViewMode === 'pixel'
                    ? 'In Pixel View, each classic 160 × 144 frame maps cleanly onto a 10 × 10 cluster of physical pixels on the 1600 × 1440 panel—preserving razor-sharp sprite edges and authentic sub-pixel grid geometry.'
                    : 'In Device View, the custom 3.5-inch LCD sits beneath laminated Gorilla Glass, delivering vivid color accuracy, deep contrast, and edge-to-edge clarity in handheld play.'}
                </p>
              </div>

              {/* Verified Display Specs Strip (Tabular Numerals) */}
              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-[#604A79]">
                <div>
                  <div className="ww-font-hud font-hud text-xs text-[#FFF1D3]/75">DIAGONAL SIZE</div>
                  <div className="ww-font-hud font-hud text-xl sm:text-2xl font-bold text-[#FFD06A] tabular-nums">
                    3.5&quot; LCD
                  </div>
                </div>
                <div>
                  <div className="ww-font-hud font-hud text-xs text-[#FFF1D3]/75">NATIVE RESOLUTION</div>
                  <div className="ww-font-hud font-hud text-xl sm:text-2xl font-bold text-[#6DDCC5] tabular-nums">
                    1600×1440
                  </div>
                </div>
                <div>
                  <div className="ww-font-hud font-hud text-xs text-[#FFF1D3]/75">PIXEL DENSITY</div>
                  <div className="ww-font-hud font-hud text-xl sm:text-2xl font-bold text-[#FF907A] tabular-nums">
                    615 PPI
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Hardware Display Close-up */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <AnaloguePocketHardware
                variant="display-comparison"
                displayViewMode={displayViewMode}
                colorway="black"
              />
              <p className="mt-2 ww-font-hud font-hud text-xs text-[#FFF1D3]/80 text-center">
                Screen artwork shown is an original WARP &amp; WANDER illustration demonstrating aspect ratio.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================================
            ACT 3 — THE CLOCKWORK RIDGE / PRECISION
           ===================================================================== */}
        <section
          id="act-3"
          aria-labelledby="heading-act-3"
          className="scroll-mt-16 min-h-[90vh] max-w-7xl mx-auto px-4 sm:px-8 py-20 flex flex-col justify-center"
        >
          <div className="ww-storybook-panel storybook-panel p-6 sm:p-10">
            <div className="mb-8">
              <div className="ww-font-hud font-hud text-xs sm:text-sm text-[#FF907A] tracking-wider mb-2">
                ACT 03 · THE CLOCKWORK RIDGE · TACTILE HARDWARE &amp; FPGA ARCHITECTURE
              </div>
              <h2
                id="heading-act-3"
                className="ww-font-pixel font-pixel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFF1D3] mb-3"
                style={{ textWrap: 'balance' }}
              >
                BUILT FOR THE WAY PLAY FEELS.
              </h2>
              <p className="text-base sm:text-lg text-[#FFF1D3]/90 max-w-3xl leading-relaxed">
                High on Clockwork Ridge, handmade brass gears interlock without a millisecond of drift. Select any hardware marker on the device or list below to inspect how Analogue Pocket pairs tactile physical controls with FPGA-based hardware precision.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Interactive Hardware Close-up with Clickable Hotspots */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <AnaloguePocketHardware
                  variant="precision-inspector"
                  activeMarkerId={activeMarkerId}
                  onSelectMarker={(id) => {
                    soundEngine.playButtonClick();
                    setActiveMarkerId(id);
                  }}
                  markers={PRECISION_MARKERS}
                />
                <span className="mt-2 ww-font-hud font-hud text-xs text-[#FFD06A]">
                  Click numbered markers (01–04) on the device or tabs to inspect
                </span>
              </div>

              {/* Right: Tactile Feature Selector & Active Hardware Specification */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  role="tablist"
                  aria-label="Hardware precision feature markers"
                >
                  {PRECISION_MARKERS.map((marker) => {
                    const isSelected = marker.id === activeMarkerId;
                    return (
                      <button
                        key={marker.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => {
                          soundEngine.playButtonClick();
                          setActiveMarkerId(marker.id);
                        }}
                        className={`p-4 text-left border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FFD06A] text-[#23244F] border-[#23244F] shadow-[0_5px_0_0_#151633]'
                            : 'bg-[#191A3B] text-[#FFF1D3] border-[#604A79] hover:border-[#FFD06A]'
                        }`}
                      >
                        <div
                          className={`ww-font-hud font-hud text-xs font-bold mb-1 ${
                            isSelected ? 'text-[#23244F]' : 'text-[#FFD06A]'
                          }`}
                        >
                          MARKER {marker.code}
                        </div>
                        <div className="ww-font-pixel font-pixel text-lg font-bold">{marker.label}</div>
                        <div
                          className={`text-xs ${
                            isSelected ? 'text-[#23244F]/85' : 'text-[#FFF1D3]/75'
                          }`}
                        >
                          {marker.subtitle}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Feature Inspection Readout */}
                <div className="ww-ww-storybook-panel storybook-panel-cream ww-storybook-panel storybook-panel-cream p-6 sm:p-8" role="tabpanel">
                  <div className="ww-font-hud font-hud text-xs font-bold text-[#2F644F] uppercase tracking-wider mb-1">
                    ACTIVE INSPECTION · {selectedPrecisionMarker.code} · {selectedPrecisionMarker.subtitle}
                  </div>
                  <h3 className="ww-font-pixel font-pixel text-2xl sm:text-3xl font-bold text-[#23244F] mb-2">
                    {selectedPrecisionMarker.label}
                  </h3>
                  <p className="text-base font-semibold text-[#2F644F] mb-3">
                    {selectedPrecisionMarker.verifiedClaim}
                  </p>
                  <p className="text-sm sm:text-base text-[#23244F]/90 leading-relaxed">
                    {selectedPrecisionMarker.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            ACT 4 — THE CLOUD CITY / PLAYFUL INTERLUDE
           ===================================================================== */}
        <section
          id="act-4"
          aria-labelledby="heading-act-4"
          className="scroll-mt-16 min-h-[90vh] max-w-7xl mx-auto px-4 sm:px-8 py-16 flex flex-col justify-center"
        >
          <div className="text-center max-w-3xl mx-auto mb-6 ww-storybook-panel storybook-panel p-5 sm:p-6">
            <div className="ww-font-hud font-hud text-xs sm:text-sm text-[#FFD06A] tracking-wider mb-2">
              ACT 04 · THE CLOUD CITY · OPTIONAL PLAYABLE INTERLUDE
            </div>
            <h2
              id="heading-act-4"
              className="ww-font-pixel font-pixel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFF1D3] mb-3"
              style={{ textWrap: 'balance' }}
            >
              FOLLOW THE NEXT LITTLE ADVENTURE.
            </h2>
            <p className="text-base sm:text-lg text-[#FFF1D3]/90">
              Pause along the sky-bridges of Cloud City for a quick, optional jump across the clouds to collect three Compass Shards—or press{' '}
              <strong className="text-[#FFD06A]">Skip Game</strong> at any time to step straight through the Last Gate.
            </p>
          </div>

          <CloudCityMiniGame
            onShardsUpdate={(count) => setCollectedShardsCount(count)}
            onCompleteGame={() => setMiniGameCompleted(true)}
            onSkipOrContinue={() => handleJumpToSection('act-5')}
          />
        </section>

        {/* =====================================================================
            ACT 5 — THE LAST GATE / PRODUCT REVEAL
           ===================================================================== */}
        <section
          id="act-5"
          aria-labelledby="heading-act-5"
          className="scroll-mt-16 min-h-[92vh] max-w-7xl mx-auto px-4 sm:px-8 py-20 flex flex-col justify-center"
        >
          <div className="ww-storybook-panel storybook-panel p-6 sm:p-12 border-4 border-[#FFD06A]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left: Central Sanctuary Product Reveal & Verified Summary */}
              <div className="lg:col-span-7">
                <div className="ww-font-hud font-hud text-xs sm:text-sm text-[#FFD06A] tracking-wider mb-2">
                  ACT 05 · THE LAST GATE · OFFICIAL PRODUCT REVEAL
                </div>

                <h2
                  id="heading-act-5"
                  className="ww-font-pixel font-pixel text-3xl sm:text-5xl lg:text-6xl font-bold text-[#FFF1D3] leading-[1.08] mb-4"
                  style={{ textWrap: 'balance' }}
                >
                  THE ADVENTURE FITS IN YOUR HANDS.
                </h2>

                <p className="text-lg sm:text-xl text-[#FFD06A] font-medium mb-6">
                  A tribute to portable play, made for real cartridges and real moments.
                </p>

                {/* Verified Feature Summary List */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="p-4 bg-[#191A3B] border border-[#604A79]">
                    <div className="ww-font-hud font-hud text-xs text-[#6DDCC5] mb-1">01. CARTRIDGES</div>
                    <div className="ww-font-pixel font-pixel text-lg text-[#FFF1D3] mb-1">
                      Multi-System Slot
                    </div>
                    <p className="text-xs text-[#FFF1D3]/85 leading-relaxed">
                      Plays Game Boy, Game Boy Color, and Game Boy Advance cartridges out of the box, plus other formats via optional adapters.
                    </p>
                  </div>

                  <div className="p-4 bg-[#191A3B] border border-[#604A79]">
                    <div className="ww-font-hud font-hud text-xs text-[#FFD06A] mb-1">02. DISPLAY</div>
                    <div className="ww-font-pixel font-pixel text-lg text-[#FFF1D3] mb-1">
                      3.5&quot; 1600×1440 LCD
                    </div>
                    <p className="text-xs text-[#FFF1D3]/85 leading-relaxed">
                      Custom 615 ppi high-resolution Gorilla Glass display engineered for 10× integer scaling and vivid clarity.
                    </p>
                  </div>

                  <div className="p-4 bg-[#191A3B] border border-[#604A79]">
                    <div className="ww-font-hud font-hud text-xs text-[#FF907A] mb-1">03. HARDWARE</div>
                    <div className="ww-font-pixel font-pixel text-lg text-[#FFF1D3] mb-1">
                      FPGA Precision
                    </div>
                    <p className="text-xs text-[#FFF1D3]/85 leading-relaxed">
                      Dual dedicated FPGAs and responsive physical controls engineered for authentic handheld play without software emulation.
                    </p>
                  </div>
                </div>

                {/* Primary & Secondary CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="https://www.analogue.co/pocket"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundEngine.playButtonClick()}
                    className="ww-btn-tactile btn-tactile px-7 py-4 bg-[#FFD06A] text-[#23244F] ww-font-pixel font-pixel text-base sm:text-lg font-bold tracking-wide cursor-pointer whitespace-nowrap shrink-0 inline-flex items-center gap-2"
                  >
                    DISCOVER ANALOGUE POCKET ↗
                  </a>

                  <button
                    type="button"
                    onClick={handleReplayJourney}
                    className="ww-btn-tactile btn-tactile px-6 py-4 bg-[#23244F] text-[#FFF1D3] border-2 border-[#FFF1D3] hover:border-[#FFD06A] hover:text-[#FFD06A] ww-font-pixel font-pixel text-sm sm:text-base font-bold tracking-wide cursor-pointer whitespace-nowrap shrink-0"
                  >
                    REPLAY THE JOURNEY ↺
                  </button>
                </div>
              </div>

              {/* Right: Sanctuary Hardware Showcase with Finish & Angle Switcher */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <AnaloguePocketHardware
                  variant="sanctuary-reveal"
                  colorway={pocketColorway}
                  showRearSlot={showRearCartridgeBay}
                />

                {/* Interactive Finish & Angle Controls */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playButtonClick();
                      setPocketColorway('black');
                    }}
                    aria-pressed={pocketColorway === 'black'}
                    className={`px-3 py-1.5 ww-font-hud font-hud text-xs font-semibold border cursor-pointer whitespace-nowrap shrink-0 ${
                      pocketColorway === 'black'
                        ? 'bg-[#FFD06A] text-[#23244F] border-[#23244F]'
                        : 'bg-[#191A3B] text-[#FFF1D3] border-[#604A79]'
                    }`}
                  >
                    Matte Black
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playButtonClick();
                      setPocketColorway('white');
                    }}
                    aria-pressed={pocketColorway === 'white'}
                    className={`px-3 py-1.5 ww-font-hud font-hud text-xs font-semibold border cursor-pointer whitespace-nowrap shrink-0 ${
                      pocketColorway === 'white'
                        ? 'bg-[#FFD06A] text-[#23244F] border-[#23244F]'
                        : 'bg-[#191A3B] text-[#FFF1D3] border-[#604A79]'
                    }`}
                  >
                    Matte White
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playButtonClick();
                      setShowRearCartridgeBay((prev) => !prev);
                    }}
                    aria-pressed={showRearCartridgeBay}
                    className={`px-3 py-1.5 ww-font-hud font-hud text-xs font-semibold border cursor-pointer whitespace-nowrap shrink-0 ${
                      showRearCartridgeBay
                        ? 'bg-[#6DDCC5] text-[#23244F] border-[#23244F]'
                        : 'bg-[#191A3B] text-[#FFF1D3] border-[#604A79]'
                    }`}
                  >
                    {showRearCartridgeBay ? 'View Front Display' : 'View Rear Cartridge Bay'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          QUIET FOOTER WITH MANDATORY DISCLAIMER
         ===================================================================== */}
      <footer className="relative z-10 bg-[#171838] border-t-2 border-[#FFD06A] px-4 sm:px-8 pt-10 pb-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <PixelCompassIcon size={20} />
              <span className="ww-font-pixel font-pixel text-lg font-bold text-[#FFF1D3]">
                WARP &amp; WANDER
              </span>
              <span className="text-[#604A79]" aria-hidden="true">
                ·
              </span>
              <span className="ww-font-hud font-hud text-xs text-[#FFD06A]">
                WW-01 · THE LOST LEVELS OF PLAY
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#FFF1D3]/90 max-w-2xl">
              WARP &amp; WANDER is an independent fictional design concept. Analogue Pocket is a product of Analogue. No affiliation or endorsement is implied.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setReducedMotion((prev) => !prev)}
              aria-pressed={reducedMotion}
              className="px-3 py-1.5 bg-[#23244F] border border-[#604A79] hover:border-[#FFD06A] ww-font-hud font-hud text-xs text-[#FFF1D3] cursor-pointer whitespace-nowrap shrink-0"
            >
              Motion: {reducedMotion ? 'Reduced (Static)' : 'Full World Travel'}
            </button>
            <a
              href="https://www.analogue.co/pocket"
              target="_blank"
              rel="noopener noreferrer"
              className="ww-font-hud font-hud text-xs text-[#FFD06A] hover:underline whitespace-nowrap shrink-0"
            >
              Official Analogue Pocket Page ↗
            </a>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          TRAIL MAP & EXPEDITION LOG MODAL
         ===================================================================== */}
      {trailMapOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#151633]/85 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="trail-map-dialog-title"
        >
          <div className="w-full max-w-2xl ww-ww-storybook-panel storybook-panel-cream ww-storybook-panel storybook-panel-cream p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 border-b-2 border-[#23244F]/20 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <PixelCompassIcon size={24} />
                <div>
                  <div className="ww-font-hud font-hud text-xs font-bold text-[#2F644F]">
                    FIELD GUIDE · WORLD ATLAS &amp; COLLECTIBLES
                  </div>
                  <h2 id="trail-map-dialog-title" className="ww-font-pixel font-pixel text-2xl font-bold text-[#23244F]">
                    Pip&apos;s Expedition Trail Map
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setTrailMapOpen(false)}
                className="ww-btn-tactile btn-tactile px-3.5 py-1.5 bg-[#23244F] text-[#FFF1D3] ww-font-pixel font-pixel text-xs font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                CLOSE [ESC]
              </button>
            </div>

            {/* Chapter Jump Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {ACTS.map((act) => {
                const isCurrent = act.id === activeAct.id;
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => {
                      setTrailMapOpen(false);
                      handleJumpToSection(act.id);
                    }}
                    className={`p-3.5 text-left border-2 transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-[#23244F] text-[#FFF1D3] border-[#23244F]'
                        : 'bg-white/70 text-[#23244F] border-[#23244F]/30 hover:border-[#23244F]'
                    }`}
                  >
                    <div className="ww-font-hud font-hud text-xs font-bold text-[#FF907A]">
                      {act.code} {isCurrent ? '· CURRENT LOCATION' : ''}
                    </div>
                    <div className="ww-font-pixel font-pixel text-base font-bold">{act.shortTitle}</div>
                    <div className="text-xs opacity-85 truncate">{act.headline}</div>
                  </button>
                );
              })}
            </div>

            {/* Collectibles Summary */}
            <div className="p-4 bg-[#23244F] text-[#FFF1D3] flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="ww-font-hud font-hud text-xs text-[#FFD06A]">EXPEDITION DISCOVERIES</div>
                <div className="text-sm">
                  Forest Cartridge Relics: <strong>{discoveredArtifactIds.length}/3</strong> · Cloud City Shards: <strong>{collectedShardsCount}/3</strong>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTrailMapOpen(false);
                  handleJumpToSection('act-5');
                }}
                className="px-4 py-2 bg-[#FFD06A] text-[#23244F] ww-font-pixel font-pixel text-xs font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                JUMP TO PRODUCT REVEAL →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#23244F"/>
  <rect x="8" y="4" width="16" height="3" fill="#FFD06A"/>
  <rect x="6" y="7" width="20" height="18" fill="#151633"/>
  <rect x="8" y="7" width="16" height="18" stroke="#FFD06A" stroke-width="2" fill="none"/>
  <polygon points="16,9 19,16 16,15 13,16" fill="#FF907A"/>
  <polygon points="16,23 19,16 16,17 13,16" fill="#6DDCC5"/>
  <circle cx="16" cy="16" r="2" fill="#FFF1D3"/>
  <rect x="25" y="5" width="2" height="2" fill="#FFD06A"/>
</svg>
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/page.tsx">
<![CDATA[import App from "./App";

export default function Page() {
  return <App />;
}
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/warpwander.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-ww-indigo: #23244F;
  --color-ww-forest: #2F644F;
  --color-ww-nectar: #FFD06A;
  --color-ww-coral: #FF907A;
  --color-ww-cream: #FFF1D3;
  --color-ww-lagoon: #6DDCC5;
  --color-ww-mulberry: #604A79;

  --font-ww-display: var(--font-pixelify, 'Pixelify Sans', monospace);
  --font-ww-body: var(--font-dm-sans, 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif);
  --font-ww-hud: var(--font-jetbrains-mono, 'JetBrains Mono', monospace);
}

:root {
  --twilight-indigo: #23244F;
  --fern-forest: #2F644F;
  --golden-nectar: #FFD06A;
  --coral-bloom: #FF907A;
  --daylight-cream: #FFF1D3;
  --lagoon-mist: #6DDCC5;
  --mulberry-shadow: #604A79;

  --ww-twilight-indigo: #23244F;
  --ww-fern-forest: #2F644F;
  --ww-golden-nectar: #FFD06A;
  --ww-coral-bloom: #FF907A;
  --ww-daylight-cream: #FFF1D3;
  --ww-lagoon-mist: #6DDCC5;
  --ww-mulberry-shadow: #604A79;

  --font-display: var(--font-pixelify, 'Pixelify Sans', monospace);
  --font-body: var(--font-dm-sans, 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif);
  --font-hud: var(--font-jetbrains-mono, 'JetBrains Mono', monospace);

  --ww-font-display: var(--font-pixelify, 'Pixelify Sans', monospace);
  --ww-font-body: var(--font-dm-sans, 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif);
  --ww-font-hud: var(--font-jetbrains-mono, 'JetBrains Mono', monospace);
}

.ww-body {
  scroll-behavior: smooth;
  font-family: var(--ww-font-body);
  background-color: var(--ww-twilight-indigo);
  color: var(--ww-daylight-cream);
  min-height: 100vh;
}

@media (prefers-reduced-motion: reduce) {
  .ww-body {
    scroll-behavior: auto;
  }
}

.ww-font-pixel,
.font-pixel {
  font-family: var(--ww-font-display);
  letter-spacing: 0.02em;
}

.ww-font-body,
.font-body {
  font-family: var(--ww-font-body);
}

.ww-font-hud,
.font-hud {
  font-family: var(--ww-font-hud);
  font-variant-numeric: tabular-nums;
}

.ww-pixelated,
.pixelated {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

/* Tactile pixel button press micro-interaction (100-160ms, 2px depress, shadow compression) */
.ww-btn-tactile,
.btn-tactile {
  transition: transform 120ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 120ms cubic-bezier(0.16, 1, 0.3, 1), background-color 120ms ease;
  box-shadow: 0 4px 0 0 #151633;
}

.ww-btn-tactile:hover:not(:disabled),
.btn-tactile:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 0 #151633;
}

.ww-btn-tactile:active:not(:disabled),
.btn-tactile:active:not(:disabled) {
  transform: translateY(2px);
  box-shadow: 0 1px 0 0 #151633;
}

/* Collectible hotspot 3-frame pulse and 2-4px lift */
@keyframes ww-hotspot-pulse {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-4px);
  }
}

.ww-hotspot-float,
.hotspot-float {
  animation: ww-hotspot-pulse 1.8s steps(3, end) infinite;
}

@media (prefers-reduced-motion: reduce) {
  .ww-hotspot-float,
  .hotspot-float {
    animation: none;
  }
}

/* Stepped tile reveal for headings */
@keyframes ww-tile-step-in {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  50% {
    opacity: 0.6;
    transform: translateY(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.ww-tile-reveal,
.tile-reveal {
  animation: ww-tile-step-in 650ms steps(4, end) forwards;
}

/* Accessible focus ring in Golden Nectar / Lagoon Mist */
*:focus-visible {
  outline: 3px solid var(--ww-golden-nectar);
  outline-offset: 3px;
}

/* Custom subtle storybook border */
.ww-storybook-panel,
.storybook-panel {
  background-color: rgba(35, 36, 79, 0.92);
  border: 2px solid var(--ww-golden-nectar);
  box-shadow: 0 8px 0 0 rgba(21, 22, 51, 0.75);
}

.ww-storybook-panel-cream,
.storybook-panel-cream {
  background-color: var(--ww-daylight-cream);
  color: var(--ww-twilight-indigo);
  border: 2px solid var(--ww-twilight-indigo);
  box-shadow: 0 6px 0 0 rgba(35, 36, 79, 0.45);
}
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/audio/soundEngine.ts">
<![CDATA[export * from '../lib/audio/soundEngine';
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/game/CloudCityMiniGame.tsx">
<![CDATA[export * from '../components/game/CloudCityMiniGame';
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/game/miniGamePhysics.ts">
<![CDATA[export * from '../lib/game/miniGamePhysics';
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/product/AnaloguePocketHardware.tsx">
<![CDATA[export * from '../components/product/AnaloguePocketHardware';
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/site/FieldGuideNav.tsx">
<![CDATA[export * from '../components/site/FieldGuideNav';
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/sprites/PixelArtSprites.tsx">
<![CDATA[export * from '../components/sprites/PixelArtSprites';
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/world/WorldCanvas.tsx">
<![CDATA[export * from '../components/world/WorldCanvas';
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/world/worldMap.ts">
<![CDATA[export * from '../lib/world/worldMap';
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/components/game/CloudCityMiniGame.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  createInitialMiniGameState,
  stepMiniGameSimulation,
  MiniGameWorldState,
  MiniGameInputState,
  GAME_CONSTANTS,
} from '../../lib/game/miniGamePhysics';
import { PALETTE } from '../../lib/world/worldMap';
import { drawPipSpriteToCanvas, PixelCompassIcon } from '../sprites/PixelArtSprites';
import { soundEngine } from '../../lib/audio/soundEngine';

interface CloudCityMiniGameProps {
  onShardsUpdate: (count: number) => void;
  onCompleteGame: () => void;
  onSkipOrContinue: () => void;
}

/**
 * ACT 4 — THE CLOUD CITY / PLAYFUL INTERLUDE
 * Short, optional, accessible 2D platformer where Pip leaps across floating cloud platforms
 * to collect three Compass Shards.
 * - Scoped keyboard listener only active while game is in 'playing' mode and focused/active.
 * - Large accessible touch/click controls while active.
 * - Always-visible SKIP GAME and CONTINUE JOURNEY buttons.
 */
export const CloudCityMiniGame: React.FC<CloudCityMiniGameProps> = ({
  onShardsUpdate,
  onCompleteGame,
  onSkipOrContinue,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const worldStateRef = useRef<MiniGameWorldState>(createInitialMiniGameState(false));
  const inputRef = useRef<MiniGameInputState>({
    left: false,
    right: false,
    jumpHeld: false,
    jumpJustPressed: false,
    jumpJustReleased: false,
  });

  const [uiStatus, setUiStatus] = useState<'title' | 'playing' | 'paused' | 'victory'>('title');
  const [collectedCount, setCollectedCount] = useState<number>(0);

  const onShardsUpdateRef = useRef(onShardsUpdate);
  const onCompleteGameRef = useRef(onCompleteGame);

  useEffect(() => {
    onShardsUpdateRef.current = onShardsUpdate;
    onCompleteGameRef.current = onCompleteGame;
  }, [onShardsUpdate, onCompleteGame]);

  // Check for autostart query param safely on client mount
  useEffect(() => {
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('autostart') === '1') {
      const fresh = createInitialMiniGameState(true);
      worldStateRef.current = fresh;
      setUiStatus('playing');
    }
  }, []);

  // Sync dataset.state for accessibility / automated verification
  useEffect(() => {
    const mapped = uiStatus === 'victory' ? 'gameover' : uiStatus;
    if (typeof document !== 'undefined') {
      document.body.dataset.state = mapped;
    }
  }, [uiStatus]);

  const startOrRestartGame = useCallback(() => {
    const fresh = createInitialMiniGameState(true);
    worldStateRef.current = fresh;
    inputRef.current = {
      left: false,
      right: false,
      jumpHeld: false,
      jumpJustPressed: false,
      jumpJustReleased: false,
    };
    setCollectedCount(0);
    onShardsUpdateRef.current(0);
    setUiStatus('playing');
    soundEngine.playButtonClick();
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    canvasRef.current?.focus();
  }, []);

  const togglePause = useCallback(() => {
    const current = worldStateRef.current.status;
    if (current === 'playing') {
      worldStateRef.current.status = 'paused';
      setUiStatus('paused');
      soundEngine.playButtonClick();
    } else if (current === 'paused') {
      worldStateRef.current.status = 'playing';
      setUiStatus('playing');
      soundEngine.playButtonClick();
    }
  }, []);

  // Scoped keyboard listener: only intercepts movement keys when mini-game is in 'playing' state
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Never hijack input if user is typing in an input/textarea
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      const status = worldStateRef.current.status;

      if (status !== 'playing') {
        return;
      }

      const code = e.code;
      if (code === 'ArrowLeft' || code === 'KeyA') {
        e.preventDefault();
        inputRef.current.left = true;
      } else if (code === 'ArrowRight' || code === 'KeyD') {
        e.preventDefault();
        inputRef.current.right = true;
      } else if (code === 'Space' || code === 'ArrowUp' || code === 'KeyW') {
        e.preventDefault();
        if (!inputRef.current.jumpHeld) {
          inputRef.current.jumpJustPressed = true;
        }
        inputRef.current.jumpHeld = true;
      } else if (code === 'KeyP' || code === 'Escape') {
        e.preventDefault();
        togglePause();
      } else if (code === 'KeyR') {
        e.preventDefault();
        startOrRestartGame();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const code = e.code;
      if (code === 'ArrowLeft' || code === 'KeyA') {
        inputRef.current.left = false;
      } else if (code === 'ArrowRight' || code === 'KeyD') {
        inputRef.current.right = false;
      } else if (code === 'Space' || code === 'ArrowUp' || code === 'KeyW') {
        if (inputRef.current.jumpHeld) {
          inputRef.current.jumpJustReleased = true;
        }
        inputRef.current.jumpHeld = false;
      }
    };

    const clearInputs = () => {
      inputRef.current.left = false;
      inputRef.current.right = false;
      inputRef.current.jumpHeld = false;
      inputRef.current.jumpJustPressed = false;
      inputRef.current.jumpJustReleased = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', clearInputs);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', clearInputs);
    };
  }, [startOrRestartGame, togglePause]);

  // 60 FPS Canvas Simulation & Rendering Loop (Decoupled from React State)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    let rafId = 0;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const rawDt = (now - lastTime) / 1000;
      lastTime = now;

      const state = worldStateRef.current;
      const events = stepMiniGameSimulation(state, inputRef.current, rawDt);

      // Consume single-frame edge triggers
      inputRef.current.jumpJustPressed = false;
      inputRef.current.jumpJustReleased = false;

      if (events.jumped) {
        soundEngine.playJump();
      }
      if (events.collectedShardIds.length > 0) {
        soundEngine.playShardPickup();
        setCollectedCount(state.collectedCount);
        onShardsUpdateRef.current(state.collectedCount);
      }
      if (events.justWon) {
        soundEngine.playVictoryFanfare();
        setUiStatus('victory');
        onCompleteGameRef.current();
      }

      // ================= RENDER CLOUD CITY SCENE =================
      const w = state.width;
      const h = state.height;

      // Sky background bands
      ctx.fillStyle = PALETTE.twilightIndigo;
      ctx.fillRect(0, 0, w, 120);
      ctx.fillStyle = PALETTE.mulberryShadow;
      ctx.fillRect(0, 120, w, 110);
      ctx.fillStyle = PALETTE.goldenNectar;
      ctx.fillRect(0, 230, w, 90);
      ctx.fillStyle = PALETTE.daylightCream;
      ctx.fillRect(0, 320, w, h - 320);

      // Gentle background wind current lines
      const windShift = Math.floor((now * 0.04) % 180);
      ctx.fillStyle = 'rgba(255, 241, 211, 0.35)';
      for (let i = 0; i < 5; i++) {
        const wx = ((i * 190 + windShift) % (w + 120)) - 60;
        const wy = 70 + i * 52;
        ctx.fillRect(wx, wy, 48, 4);
        ctx.fillRect(wx + 24, wy - 8, 32, 4);
      }

      // Draw Platforms
      for (let i = 0; i < state.platforms.length; i++) {
        const plat = state.platforms[i];
        if (plat.kind === 'stone') {
          ctx.fillStyle = PALETTE.fernForest;
          ctx.fillRect(plat.x, plat.y, plat.width, 8);
          ctx.fillStyle = PALETTE.twilightIndigo;
          ctx.fillRect(plat.x, plat.y + 8, plat.width, plat.height - 8);
          ctx.fillStyle = PALETTE.goldenNectar;
          ctx.fillRect(plat.x + 8, plat.y + 12, 16, 4);
          ctx.fillRect(plat.x + plat.width - 24, plat.y + 12, 16, 4);
        } else {
          // Fluffy stepped pixel cloud platform
          ctx.fillStyle = PALETTE.daylightCream;
          ctx.fillRect(plat.x, plat.y, plat.width, plat.height - 6);
          ctx.fillRect(plat.x + 8, plat.y - 4, plat.width - 16, 4);
          ctx.fillStyle = plat.kind === 'wind-lift' ? PALETTE.lagoonMist : PALETTE.coralBloom;
          ctx.fillRect(plat.x + 4, plat.y + plat.height - 6, plat.width - 8, 6);
        }
      }

      // Draw Collectible Compass Shards
      const pulseTick = Math.floor(now / 180);
      for (let i = 0; i < state.shards.length; i++) {
        const shard = state.shards[i];
        if (shard.collected) continue;

        const bobY = (pulseTick + i) % 2 === 0 ? -3 : 2;
        const sx = Math.round(shard.x);
        const sy = Math.round(shard.y + bobY);

        // Outer aura
        ctx.fillStyle = 'rgba(255, 208, 106, 0.28)';
        ctx.fillRect(sx - 14, sy - 14, 28, 28);

        // Diamond pixel shard
        ctx.fillStyle = shard.color;
        ctx.fillRect(sx - 4, sy - 10, 8, 20);
        ctx.fillRect(sx - 10, sy - 4, 20, 8);
        ctx.fillStyle = PALETTE.daylightCream;
        ctx.fillRect(sx - 4, sy - 4, 8, 8);
      }

      // Draw Pooled Particles
      for (let i = 0; i < state.particles.length; i++) {
        const pt = state.particles[i];
        if (!pt.active) continue;
        ctx.fillStyle = pt.color;
        ctx.fillRect(Math.round(pt.x), Math.round(pt.y), pt.size, pt.size);
      }

      // Draw Pip the Mapmaker
      const frameTick = Math.floor(state.player.walkDistance / 18) + Math.floor(now / 220);
      drawPipSpriteToCanvas(
        ctx,
        state.player.x - 7,
        state.player.y - 12,
        3,
        state.player.animState,
        frameTick,
        state.player.facing,
        state.player.scaleX,
        state.player.scaleY
      );

      const delay = state.status === 'playing' ? 16 : 120;
      timerId = window.setTimeout(() => {
        rafId = window.requestAnimationFrame(loop);
      }, delay);
    };

    let timerId = 0;
    rafId = window.requestAnimationFrame(loop);
    return () => {
      window.clearTimeout(timerId);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto ww-storybook-panel storybook-panel p-4 sm:p-6">
      {/* Top Game Shell Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b-2 border-[#604A79]">
        <div className="flex items-center gap-3">
          <PixelCompassIcon size={24} />
          <div>
            <div className="ww-font-hud font-hud text-xs text-[#FFD06A] uppercase tracking-wider">
              OPTIONAL BROWSER MINI-GAME · CLOUD CITY
            </div>
            <h3 className="ww-font-pixel font-pixel text-lg sm:text-xl text-[#FFF1D3]">
              Wayfinder&apos;s Cloud Stepping Stones
            </h3>
          </div>
        </div>

        {/* Live Mechanics-Backed Compass Shard Counter + Always-Visible Skip/Continue Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div
            className="px-3 py-1.5 bg-[#171838] border-2 border-[#FFD06A] ww-font-hud font-hud text-xs sm:text-sm font-bold text-[#FFF1D3] whitespace-nowrap shrink-0"
            aria-live="polite"
          >
            COMPASS SHARDS: {collectedCount} / 3
          </div>

          {uiStatus === 'playing' && (
            <button
              type="button"
              onClick={togglePause}
              className="px-3 py-1.5 bg-[#604A79] text-[#FFF1D3] hover:bg-[#FFD06A] hover:text-[#23244F] ww-font-hud font-hud text-xs font-bold cursor-pointer whitespace-nowrap shrink-0"
            >
              Pause [P]
            </button>
          )}

          <button
            type="button"
            onClick={onSkipOrContinue}
            className="ww-btn-tactile btn-tactile px-3.5 py-1.5 bg-[#2F644F] text-[#FFF1D3] hover:bg-[#6DDCC5] hover:text-[#23244F] ww-font-pixel font-pixel text-xs sm:text-sm font-bold cursor-pointer whitespace-nowrap shrink-0"
          >
            {uiStatus === 'victory' ? 'CONTINUE JOURNEY →' : 'SKIP GAME →'}
          </button>
        </div>
      </div>

      {/* Interactive 2D Pixel Canvas Stage */}
      <div className="relative w-full aspect-[2/1] bg-[#23244F] border-2 border-[#FFD06A] overflow-hidden">
        <canvas
          ref={canvasRef}
          width={GAME_CONSTANTS.CANVAS_WIDTH}
          height={GAME_CONSTANTS.CANVAS_HEIGHT}
          tabIndex={0}
          data-testid="cloud-city-game-canvas"
          aria-label="Cloud City optional mini-game canvas. Use A and D or Arrow keys to move Pip, Space or W to jump and collect 3 Compass Shards."
          className="w-full h-full block ww-pixelated pixelated focus:outline-none"
        />

        {/* TITLE OVERLAY */}
        {uiStatus === 'title' && (
          <div className="absolute inset-0 bg-[#23244F]/88 flex flex-col items-center justify-center p-6 text-center">
            <p className="ww-font-hud font-hud text-xs text-[#6DDCC5] uppercase tracking-widest mb-2">
              ACT 04 · PLAYFUL INTERLUDE
            </p>
            <h4 className="ww-font-pixel font-pixel text-2xl sm:text-3xl text-[#FFF1D3] mb-2">
              Gather the Three Compass Shards
            </h4>
            <p className="text-sm text-[#FFF1D3]/90 max-w-md mb-5">
              Guide Pip across the sunlit cloud platforms to collect 3 glowing shards—or skip straight to the Last Gate whenever you like.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                data-start="true"
                onClick={startOrRestartGame}
                className="ww-btn-tactile btn-tactile px-6 py-3 bg-[#FFD06A] text-[#23244F] ww-font-pixel font-pixel text-base font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                PLAY INTERLUDE
              </button>
              <button
                type="button"
                onClick={onSkipOrContinue}
                className="ww-btn-tactile btn-tactile px-5 py-3 bg-[#23244F] text-[#FFF1D3] border-2 border-[#FFF1D3] hover:border-[#FFD06A] hover:text-[#FFD06A] ww-font-pixel font-pixel text-sm font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                CONTINUE JOURNEY
              </button>
            </div>
            <p className="mt-4 ww-font-hud font-hud text-xs text-[#FFF1D3]/75">
              A/D or Arrow Keys Move · Space or W Jump · Touch Buttons Below
            </p>
          </div>
        )}

        {/* PAUSED MODAL OVERLAY */}
        {uiStatus === 'paused' && (
          <div className="absolute inset-0 bg-[#23244F]/90 flex flex-col items-center justify-center p-6 text-center">
            <h4 className="ww-font-pixel font-pixel text-2xl text-[#FFD06A] mb-2">EXPEDITION PAUSED</h4>
            <p className="ww-font-hud font-hud text-xs text-[#FFF1D3] mb-5">
              SHARDS GATHERED: {collectedCount} / 3
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={togglePause}
                className="ww-btn-tactile btn-tactile px-5 py-2.5 bg-[#FFD06A] text-[#23244F] ww-font-pixel font-pixel text-sm font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                RESUME
              </button>
              <button
                type="button"
                onClick={startOrRestartGame}
                className="ww-btn-tactile btn-tactile px-5 py-2.5 bg-[#604A79] text-[#FFF1D3] ww-font-pixel font-pixel text-sm font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                RESTART
              </button>
              <button
                type="button"
                onClick={onSkipOrContinue}
                className="ww-btn-tactile btn-tactile px-5 py-2.5 bg-[#2F644F] text-[#FFF1D3] ww-font-pixel font-pixel text-sm font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                SKIP TO FINAL GATE
              </button>
            </div>
          </div>
        )}

        {/* VICTORY MODAL OVERLAY */}
        {uiStatus === 'victory' && (
          <div className="absolute inset-0 bg-[#23244F]/90 flex flex-col items-center justify-center p-6 text-center">
            <div className="px-3 py-1 bg-[#6DDCC5] text-[#23244F] ww-font-hud font-hud text-xs font-bold mb-2">
              WAYFINDER COMPASS RESTORED · 3 / 3 SHARDS
            </div>
            <h4 className="ww-font-pixel font-pixel text-2xl sm:text-3xl text-[#FFD06A] mb-2">
              The Sanctuary Gate Awaits!
            </h4>
            <p className="text-sm text-[#FFF1D3]/90 max-w-md mb-5">
              Pip raises the restored lantern compass! You have unlocked the Cloud City Wayfinder Badge in your Field Guide.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={onSkipOrContinue}
                className="ww-btn-tactile btn-tactile px-6 py-3 bg-[#FFD06A] text-[#23244F] ww-font-pixel font-pixel text-base font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                CONTINUE JOURNEY →
              </button>
              <button
                type="button"
                data-start="true"
                onClick={startOrRestartGame}
                className="ww-btn-tactile btn-tactile px-5 py-3 bg-[#23244F] text-[#FFF1D3] border-2 border-[#FFD06A] ww-font-pixel font-pixel text-sm font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                PLAY AGAIN
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Accessible On-Screen Touch / Pointer Controls + Quick Collect Assist */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-3" role="group" aria-label="Game Movement Controls">
          <button
            type="button"
            onPointerDown={() => {
              if (uiStatus !== 'playing') startOrRestartGame();
              inputRef.current.left = true;
            }}
            onPointerUp={() => {
              inputRef.current.left = false;
            }}
            onPointerLeave={() => {
              inputRef.current.left = false;
            }}
            aria-label="Move Left"
            className="ww-btn-tactile btn-tactile min-w-[68px] min-h-[44px] px-4 py-2.5 bg-[#23244F] border-2 border-[#FFD06A] text-[#FFF1D3] ww-font-pixel font-pixel text-sm font-bold cursor-pointer select-none whitespace-nowrap shrink-0"
          >
            ◀ LEFT
          </button>

          <button
            type="button"
            onPointerDown={() => {
              if (uiStatus !== 'playing') startOrRestartGame();
              inputRef.current.jumpJustPressed = true;
              inputRef.current.jumpHeld = true;
            }}
            onPointerUp={() => {
              inputRef.current.jumpJustReleased = true;
              inputRef.current.jumpHeld = false;
            }}
            onPointerLeave={() => {
              inputRef.current.jumpHeld = false;
            }}
            aria-label="Jump"
            className="ww-btn-tactile btn-tactile min-w-[84px] min-h-[44px] px-5 py-2.5 bg-[#FFD06A] text-[#23244F] ww-font-pixel font-pixel text-sm font-bold cursor-pointer select-none whitespace-nowrap shrink-0"
          >
            ▲ JUMP
          </button>

          <button
            type="button"
            onPointerDown={() => {
              if (uiStatus !== 'playing') startOrRestartGame();
              inputRef.current.right = true;
            }}
            onPointerUp={() => {
              inputRef.current.right = false;
            }}
            onPointerLeave={() => {
              inputRef.current.right = false;
            }}
            aria-label="Move Right"
            className="ww-btn-tactile btn-tactile min-w-[68px] min-h-[44px] px-4 py-2.5 bg-[#23244F] border-2 border-[#FFD06A] text-[#FFF1D3] ww-font-pixel font-pixel text-sm font-bold cursor-pointer select-none whitespace-nowrap shrink-0"
          >
            RIGHT ▶
          </button>
        </div>

        <p className="ww-font-hud font-hud text-xs text-[#FFF1D3]/80">
          Note: Optional browser interlude created for WARP &amp; WANDER; not bundled software on Analogue Pocket.
        </p>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/components/product/AnaloguePocketHardware.tsx">
<![CDATA['use client';
import React from 'react';
import { PrecisionFeatureMarker } from '../../lib/world/worldMap';

/**
 * Crisp, non-pixelated studio hardware visualization of the real Analogue Pocket.
 * Per Section 3 & Section 8:
 * - Product representations remain sharp studio renders, never passed through a pixel filter.
 * - Contrast between the 16-bit pixel world and the physically real Analogue Pocket is intentional.
 * - Never displays unlicensed commercial video game screenshots on the screen.
 */

interface AnaloguePocketHardwareProps {
  variant: 'hero-portal' | 'display-comparison' | 'precision-inspector' | 'sanctuary-reveal';
  colorway?: 'black' | 'white';
  displayViewMode?: 'pixel' | 'device';
  activeMarkerId?: PrecisionFeatureMarker['id'];
  onSelectMarker?: (id: PrecisionFeatureMarker['id']) => void;
  markers?: PrecisionFeatureMarker[];
  showRearSlot?: boolean;
}

export const AnaloguePocketHardware: React.FC<AnaloguePocketHardwareProps> = ({
  variant,
  colorway = 'black',
  displayViewMode = 'device',
  activeMarkerId = 'dpad',
  onSelectMarker,
  markers = [],
  showRearSlot = false,
}) => {
  const isWhite = colorway === 'white';
  const shellFill = isWhite ? '#F3F2EE' : '#18181B';
  const shellEdge = isWhite ? '#D6D3CD' : '#2E2E34';
  const controlFill = isWhite ? '#E5E4DF' : '#232329';
  const controlStroke = isWhite ? '#C7C4BC' : '#383842';
  const labelText = isWhite ? '#78756E' : '#71717A';

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Act 0 Pixel Portal Archway Cut-Out Frame when variant === 'hero-portal' */}
      <div
        className={`relative flex items-center justify-center transition-transform duration-700 ${
          variant === 'hero-portal'
            ? 'p-5 sm:p-7 bg-[#23244F]/95 border-4 border-[#FFD06A] shadow-[0_12px_0_0_#151633]'
            : 'p-4'
        }`}
      >
        {variant === 'hero-portal' && (
          <>
            {/* Stepped Pixel Portal Corner Tiles */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#FFD06A]" aria-hidden="true" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#FFD06A]" aria-hidden="true" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#FFD06A]" aria-hidden="true" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#FFD06A]" aria-hidden="true" />
            <div className="absolute top-2 left-2 text-[11px] ww-font-hud font-hud uppercase tracking-wider text-[#FFD06A]">
              PORTAL · REAL HARDWARE
            </div>
          </>
        )}

        {/* Crisp High-Resolution Studio Render of Analogue Pocket */}
        <div className="relative w-[250px] sm:w-[288px] aspect-[10/16.8] flex items-center justify-center">
          {/* Ambient Studio Halo behind physical device */}
          <div
            className="absolute inset-4 rounded-3xl opacity-45 blur-xl pointer-events-none"
            style={{
              background:
                variant === 'display-comparison' && displayViewMode === 'pixel'
                  ? 'radial-gradient(circle, #6DDCC5 0%, transparent 70%)'
                  : 'radial-gradient(circle, #FFD06A 0%, #FF907A 45%, transparent 75%)',
            }}
            aria-hidden="true"
          />

          <svg
            viewBox="0 0 300 504"
            className="w-full h-full drop-shadow-[0_24px_32px_rgba(12,13,30,0.75)]"
            role="img"
            aria-label={`Analogue Pocket portable handheld in Matte ${isWhite ? 'White' : 'Black'}`}
          >
            <defs>
              <linearGradient id={`shellGrad-${colorway}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isWhite ? '#FAF9F5' : '#242429'} />
                <stop offset="50%" stopColor={shellFill} />
                <stop offset="100%" stopColor={isWhite ? '#DFDDD7' : '#101013'} />
              </linearGradient>

              <linearGradient id="gorillaGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E2030" />
                <stop offset="45%" stopColor="#0C0D14" />
                <stop offset="100%" stopColor="#141622" />
              </linearGradient>

              <linearGradient id="glassSheen" x1="0%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
                <stop offset="35%" stopColor="rgba(255,255,255,0.03)" />
                <stop offset="40%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>

            {!showRearSlot ? (
              /* ================= FRONT STUDIO HARDWARE VIEW ================= */
              <g>
                {/* Outer Precision ABS Enclosure */}
                <rect
                  x="18"
                  y="12"
                  width="264"
                  height="480"
                  rx="26"
                  ry="26"
                  fill={`url(#shellGrad-${colorway})`}
                  stroke={shellEdge}
                  strokeWidth="2.5"
                />

                {/* Subtle inner chamfer highlight */}
                <rect
                  x="22"
                  y="16"
                  width="256"
                  height="472"
                  rx="23"
                  ry="23"
                  fill="none"
                  stroke={isWhite ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.06)'}
                  strokeWidth="1"
                />

                {/* Side Power & Volume physical buttons on left edge */}
                <rect x="14" y="92" width="4" height="24" rx="1.5" fill={shellEdge} />
                <rect x="14" y="128" width="4" height="18" rx="1.5" fill={shellEdge} />
                <rect x="14" y="152" width="4" height="18" rx="1.5" fill={shellEdge} />

                {/* Custom Gorilla Glass 3.5" Lens Bezel */}
                <rect
                  x="32"
                  y="26"
                  width="236"
                  height="218"
                  rx="12"
                  ry="12"
                  fill="url(#gorillaGlass)"
                  stroke="#09090D"
                  strokeWidth="2"
                />

                {/* Active 3.5-inch 1600x1440 (10:9 ratio) High-PPI LCD Viewport */}
                <g transform="translate(46, 40)">
                  <rect x="0" y="0" width="208" height="187" rx="3" fill="#23244F" />

                  {variant === 'display-comparison' && displayViewMode === 'pixel' ? (
                    /* PIXEL VIEW: 10x Integer-Scaled Subpixel Matrix Demonstration */
                    <g>
                      <rect x="0" y="0" width="208" height="187" fill="#191A3B" />
                      {/* Magnified 1600x1440 subpixel grid lattice */}
                      {Array.from({ length: 13 }).map((_, row) =>
                        Array.from({ length: 14 }).map((__, col) => {
                          const isLit =
                            (row + col) % 3 === 0 ||
                            (row >= 4 && row <= 8 && col >= 4 && col <= 9);
                          const cellColor =
                            row === 6 && col === 7
                              ? '#FFD06A'
                              : (row + col) % 4 === 0
                              ? '#6DDCC5'
                              : isLit
                              ? '#FF907A'
                              : '#2F644F';
                          return (
                            <g key={`${row}-${col}`} transform={`translate(${col * 14 + 7}, ${row * 14 + 4})`}>
                              <rect
                                x="0"
                                y="0"
                                width="12"
                                height="12"
                                fill={cellColor}
                                opacity={isLit ? 0.95 : 0.35}
                              />
                              {/* Individual sub-pixel RGB/aperture lines */}
                              <rect x="1" y="1" width="3" height="10" fill="rgba(255,255,255,0.18)" />
                            </g>
                          );
                        })
                      )}
                      <rect
                        x="10"
                        y="148"
                        width="188"
                        height="28"
                        rx="3"
                        fill="rgba(35, 36, 79, 0.92)"
                        stroke="#6DDCC5"
                        strokeWidth="1.5"
                      />
                      <text
                        x="104"
                        y="166"
                        textAnchor="middle"
                        fill="#FFF1D3"
                        fontSize="10"
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight="600"
                      >
                        10× INTEGER SCALE · 615 PPI
                      </text>
                    </g>
                  ) : (
                    /* DEVICE VIEW: Crisp Original WARP & WANDER Horizon Artwork on Screen */
                    <g>
                      {/* Warm sky gradient inside screen */}
                      <rect x="0" y="0" width="208" height="65" fill="#23244F" />
                      <rect x="0" y="65" width="208" height="45" fill="#604A79" />
                      <rect x="0" y="110" width="208" height="42" fill="#FFD06A" />
                      {/* Sun disk */}
                      <circle cx="104" cy="98" r="24" fill="#FFF1D3" />
                      {/* Layered mountain silhouettes */}
                      <polygon points="0,125 48,88 96,125" fill="#23244F" />
                      <polygon points="64,125 128,76 190,125" fill="#604A79" />
                      <polygon points="140,125 182,92 208,125" fill="#23244F" />
                      {/* Foreground Fern Forest & Lagoon reflection */}
                      <rect x="0" y="125" width="208" height="32" fill="#2F644F" />
                      <rect x="0" y="157" width="208" height="30" fill="#6DDCC5" opacity="0.85" />
                      {/* Crisp vector badge on screen */}
                      <rect
                        x="28"
                        y="18"
                        width="152"
                        height="24"
                        rx="4"
                        fill="rgba(35,36,79,0.85)"
                        stroke="#FFD06A"
                        strokeWidth="1"
                      />
                      <text
                        x="104"
                        y="34"
                        textAnchor="middle"
                        fill="#FFF1D3"
                        fontSize="9.5"
                        fontFamily="JetBrains Mono, monospace"
                        letterSpacing="1"
                      >
                        3.5&quot; · 1600 × 1440 LCD
                      </text>
                    </g>
                  )}

                  {/* Optical Laminated Gorilla Glass Diagonal Sheen */}
                  <polygon points="0,0 135,0 65,187 0,187" fill="url(#glassSheen)" />
                </g>

                {/* Subtle Screen Bezel Branding */}
                <text
                  x="150"
                  y="237"
                  textAnchor="middle"
                  fill={isWhite ? '#71717A' : '#52525B'}
                  fontSize="7.5"
                  fontFamily="DM Sans, sans-serif"
                  letterSpacing="2.5"
                >
                  ANALOGUE POCKET
                </text>

                {/* ================= PHYSICAL CONTROLS SECTION ================= */}
                {/* Left: Iconic Recessed Cross Directional Pad */}
                <g
                  transform="translate(78, 326)"
                  className={
                    variant === 'precision-inspector' && activeMarkerId === 'dpad'
                      ? 'opacity-100'
                      : 'opacity-95'
                  }
                >
                  <circle
                    cx="0"
                    cy="0"
                    r="42"
                    fill={isWhite ? '#ECEAE4' : '#141418'}
                    stroke={
                      variant === 'precision-inspector' && activeMarkerId === 'dpad'
                        ? '#FFD06A'
                        : controlStroke
                    }
                    strokeWidth={
                      variant === 'precision-inspector' && activeMarkerId === 'dpad' ? '2.5' : '1'
                    }
                  />
                  {/* Cross arms */}
                  <rect
                    x="-13"
                    y="-34"
                    width="26"
                    height="68"
                    rx="4"
                    fill={controlFill}
                    stroke={controlStroke}
                    strokeWidth="1.5"
                  />
                  <rect
                    x="-34"
                    y="-13"
                    width="68"
                    height="26"
                    rx="4"
                    fill={controlFill}
                    stroke={controlStroke}
                    strokeWidth="1.5"
                  />
                  {/* Center Seamless Cover over Cross Intersection */}
                  <rect x="-12" y="-12" width="24" height="24" fill={controlFill} />
                  {/* Central Pivot Dish */}
                  <circle cx="0" cy="0" r="6" fill={isWhite ? '#DCD9D0' : '#1B1B21'} />
                  {/* Directional micro-ticks */}
                  <rect x="-1.5" y="-28" width="3" height="7" rx="1" fill={labelText} />
                  <rect x="-1.5" y="21" width="3" height="7" rx="1" fill={labelText} />
                  <rect x="-28" y="-1.5" width="7" height="3" rx="1" fill={labelText} />
                  <rect x="21" y="-1.5" width="7" height="3" rx="1" fill={labelText} />
                </g>

                {/* Right: Four Precision Action Face Buttons (Diamond Layout) */}
                <g transform="translate(220, 324)">
                  {variant === 'precision-inspector' && activeMarkerId === 'buttons' && (
                    <circle
                      cx="0"
                      cy="0"
                      r="48"
                      fill="none"
                      stroke="#FFD06A"
                      strokeWidth="2.5"
                      strokeDasharray="4 3"
                    />
                  )}
                  {/* Top Button (X) */}
                  <circle
                    cx="0"
                    cy="-27"
                    r="13.5"
                    fill={controlFill}
                    stroke={controlStroke}
                    strokeWidth="1.5"
                  />
                  {/* Bottom Button (B) */}
                  <circle
                    cx="0"
                    cy="27"
                    r="13.5"
                    fill={controlFill}
                    stroke={controlStroke}
                    strokeWidth="1.5"
                  />
                  {/* Left Button (Y) */}
                  <circle
                    cx="-27"
                    cy="0"
                    r="13.5"
                    fill={controlFill}
                    stroke={controlStroke}
                    strokeWidth="1.5"
                  />
                  {/* Right Button (A) */}
                  <circle
                    cx="27"
                    cy="0"
                    r="13.5"
                    fill={controlFill}
                    stroke={controlStroke}
                    strokeWidth="1.5"
                  />
                </g>

                {/* Bottom Center: Three Pill System Buttons (SELECT, ANALOGUE, START) */}
                <g transform="translate(150, 424)">
                  <rect
                    x="-42"
                    y="-5"
                    width="20"
                    height="9"
                    rx="4.5"
                    fill={controlFill}
                    stroke={controlStroke}
                    strokeWidth="1.2"
                  />
                  <rect
                    x="-11"
                    y="-6"
                    width="22"
                    height="11"
                    rx="5.5"
                    fill={controlFill}
                    stroke="#FFD06A"
                    strokeWidth="1.2"
                  />
                  <rect
                    x="22"
                    y="-5"
                    width="20"
                    height="9"
                    rx="4.5"
                    fill={controlFill}
                    stroke={controlStroke}
                    strokeWidth="1.2"
                  />
                </g>

                {/* Bottom Right: Precision Machined Speaker Grille Perforations */}
                <g transform="translate(206, 444)">
                  {Array.from({ length: 3 }).map((_, r) =>
                    Array.from({ length: 6 }).map((__, c) => (
                      <circle
                        key={`spk-${r}-${c}`}
                        cx={c * 7}
                        cy={r * 7}
                        r="1.6"
                        fill={isWhite ? '#A19E95' : '#09090C'}
                      />
                    ))
                  )}
                </g>

                {/* Bottom Edge USB-C & Status LED */}
                <circle cx="115" cy="488" r="2" fill="#6DDCC5" />
                <rect x="138" y="489" width="24" height="3" rx="1.5" fill="#09090C" />
              </g>
            ) : (
              /* ================= REAR CARTRIDGE BAY & SHOULDER TRIGGERS VIEW ================= */
              <g>
                <rect
                  x="18"
                  y="12"
                  width="264"
                  height="480"
                  rx="26"
                  ry="26"
                  fill={`url(#shellGrad-${colorway})`}
                  stroke={shellEdge}
                  strokeWidth="2.5"
                />
                {/* Recessed Multi-Format Cartridge Bay */}
                <rect
                  x="48"
                  y="18"
                  width="204"
                  height="168"
                  rx="10"
                  fill={isWhite ? '#E2E0D8' : '#111115'}
                  stroke={controlStroke}
                  strokeWidth="2"
                />
                {/* Physical Classic Cartridge Seated in Slot */}
                <rect
                  x="62"
                  y="10"
                  width="176"
                  height="156"
                  rx="6"
                  fill="#2F644F"
                  stroke="#FFD06A"
                  strokeWidth="2"
                />
                <rect x="78" y="28" width="144" height="68" rx="4" fill="#23244F" />
                <text
                  x="150"
                  y="60"
                  textAnchor="middle"
                  fill="#FFD06A"
                  fontSize="11"
                  fontFamily="Pixelify Sans, monospace"
                >
                  PHYSICAL CARTRIDGE BAY
                </text>
                <text
                  x="150"
                  y="78"
                  textAnchor="middle"
                  fill="#FFF1D3"
                  fontSize="8.5"
                  fontFamily="JetBrains Mono, monospace"
                >
                  GB · GBC · GBA + ADAPTERS
                </text>

                {/* Sculpted Left & Right Shoulder Triggers */}
                <rect
                  x="22"
                  y="194"
                  width="68"
                  height="26"
                  rx="6"
                  fill={controlFill}
                  stroke={controlStroke}
                  strokeWidth="1.5"
                />
                <rect
                  x="210"
                  y="194"
                  width="68"
                  height="26"
                  rx="6"
                  fill={controlFill}
                  stroke={controlStroke}
                  strokeWidth="1.5"
                />
                <text
                  x="150"
                  y="320"
                  textAnchor="middle"
                  fill={labelText}
                  fontSize="11"
                  fontFamily="JetBrains Mono, monospace"
                  letterSpacing="2"
                >
                  DUAL FPGA HARDWARE CORE
                </text>
              </g>
            )}
          </svg>

          {/* Interactive Precision Feature Hotspots for Act 3 (Clockwork Ridge) */}
          {variant === 'precision-inspector' &&
            markers.map((marker) => {
              const isSelected = marker.id === activeMarkerId;
              return (
                <button
                  key={marker.id}
                  type="button"
                  onClick={() => onSelectMarker?.(marker.id)}
                  style={{
                    left: `${marker.coordinates.xPercent}%`,
                    top: `${marker.coordinates.yPercent}%`,
                  }}
                  aria-label={`Inspect ${marker.label}`}
                  aria-pressed={isSelected}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center ww-font-hud font-hud text-xs font-bold transition-transform cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFD06A] text-[#23244F] border-2 border-[#23244F] scale-110 shadow-[0_4px_0_0_#151633]'
                      : 'bg-[#23244F]/95 text-[#FFF1D3] border-2 border-[#FFD06A] hover:scale-105'
                  }`}
                >
                  {marker.code.replace('M-', '')}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/components/site/FieldGuideNav.tsx">
<![CDATA['use client';
import React from 'react';
import { ACTS, ActDefinition } from '../../lib/world/worldMap';
import { PixelCompassIcon } from '../sprites/PixelArtSprites';

interface FieldGuideNavProps {
  activeAct: ActDefinition;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenTrailMap: () => void;
  onJumpToSection: (actId: string) => void;
  discoveredArtifactsCount: number;
  collectedShardsCount: number;
}

/**
 * Compact Field-Guide Header and Compass-Trail Progress Navigator.
 * - Strictly adheres to the 3-zone Top Bar Contract in <header>.
 * - No rounded floating glass pill navbar.
 * - Provides accessible polite live region for active act announcements.
 */
export const FieldGuideNav: React.FC<FieldGuideNavProps> = ({
  activeAct,
  soundEnabled,
  onToggleSound,
  onOpenTrailMap,
  onJumpToSection,
  discoveredArtifactsCount,
  collectedShardsCount,
}) => {
  return (
    <>
      {/* Top Bar Contract: 3 zones separated by gap-8, solid storybook field-guide bar */}
      <header className="sticky top-0 z-40 w-full bg-[#23244F] border-b-2 border-[#FFD06A] px-4 sm:px-8 py-3 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#act-0"
          onClick={(e) => {
            e.preventDefault();
            onJumpToSection('act-0');
          }}
          className="ww-font-pixel font-pixel text-lg sm:text-xl font-bold tracking-wider text-[#FFF1D3] hover:text-[#FFD06A] transition-colors whitespace-nowrap shrink-0"
        >
          WARP &amp; WANDER
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Chapter Trail Navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#FFF1D3]/90"
        >
          <a
            href="#act-1"
            onClick={(e) => {
              e.preventDefault();
              onJumpToSection('act-1');
            }}
            className={`hover:text-[#FFD06A] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 ${
              activeAct.id === 'act-1' ? 'text-[#FFD06A] underline font-semibold' : ''
            }`}
          >
            01. Cartridge Forest
          </a>
          <a
            href="#act-2"
            onClick={(e) => {
              e.preventDefault();
              onJumpToSection('act-2');
            }}
            className={`hover:text-[#FFD06A] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 ${
              activeAct.id === 'act-2' ? 'text-[#FFD06A] underline font-semibold' : ''
            }`}
          >
            02. Crystal Lake
          </a>
          <a
            href="#act-3"
            onClick={(e) => {
              e.preventDefault();
              onJumpToSection('act-3');
            }}
            className={`hover:text-[#FFD06A] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 ${
              activeAct.id === 'act-3' ? 'text-[#FFD06A] underline font-semibold' : ''
            }`}
          >
            03. Clockwork Ridge
          </a>
          <a
            href="#act-4"
            onClick={(e) => {
              e.preventDefault();
              onJumpToSection('act-4');
            }}
            className={`hover:text-[#FFD06A] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 ${
              activeAct.id === 'act-4' ? 'text-[#FFD06A] underline font-semibold' : ''
            }`}
          >
            04. Cloud City
          </a>
          <a
            href="#act-5"
            onClick={(e) => {
              e.preventDefault();
              onJumpToSection('act-5');
            }}
            className={`hover:text-[#FFD06A] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 ${
              activeAct.id === 'act-5' ? 'text-[#FFD06A] underline font-semibold' : ''
            }`}
          >
            05. The Last Gate
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <a
            href="#act-5"
            onClick={(e) => {
              e.preventDefault();
              onJumpToSection('act-5');
            }}
            className="ww-btn-tactile btn-tactile px-4 py-2 bg-[#FFD06A] text-[#23244F] ww-font-pixel font-pixel text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap shrink-0 cursor-pointer"
          >
            MEET ANALOGUE POCKET
          </a>
        </div>
      </header>

      {/* Secondary Field-Guide Compass Strip (Anchored on desktop right edge / compact bar) */}
      <aside
        aria-label="Compass Trail Progress & Field Controls"
        className="fixed bottom-4 right-4 z-30 flex items-center gap-2 bg-[#23244F]/95 border-2 border-[#FFD06A] px-3 py-2 shadow-[0_6px_0_0_#151633]"
      >
        {/* Polite screen-reader announcement of current chapter */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Current milestone: {activeAct.code} — {activeAct.shortTitle}
        </div>

        <PixelCompassIcon size={20} />

        {/* 6 Act Compass Trail Step Markers */}
        <div className="hidden sm:flex items-center gap-1.5" role="group" aria-label="Jump to Act">
          {ACTS.map((act) => {
            const isCurrent = act.id === activeAct.id;
            return (
              <button
                key={act.id}
                type="button"
                onClick={() => onJumpToSection(act.id)}
                title={`${act.code}: ${act.shortTitle}`}
                aria-label={`Jump to ${act.code}: ${act.shortTitle}`}
                aria-current={isCurrent ? 'step' : undefined}
                className={`w-7 h-7 ww-font-hud font-hud text-xs font-bold flex items-center justify-center transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isCurrent
                    ? 'bg-[#FFD06A] text-[#23244F] border border-[#23244F]'
                    : 'bg-[#23244F] text-[#FFF1D3]/80 border border-[#604A79] hover:border-[#FFD06A] hover:text-[#FFF1D3]'
                }`}
              >
                0{act.actNumber}
              </button>
            );
          })}
        </div>

        <span className="hidden sm:inline text-[#604A79]" aria-hidden="true">
          |
        </span>

        {/* Trail Map Field Log Button */}
        <button
          type="button"
          onClick={onOpenTrailMap}
          className="px-2.5 py-1 bg-[#2F644F] text-[#FFF1D3] hover:bg-[#FFD06A] hover:text-[#23244F] ww-font-hud font-hud text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          Trail Map ({discoveredArtifactsCount + collectedShardsCount}/6)
        </button>

        {/* Opt-in Ambient Sound Toggle (Off by default) */}
        <button
          type="button"
          onClick={onToggleSound}
          aria-pressed={soundEnabled}
          aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          className={`px-2.5 py-1 ww-font-hud font-hud text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            soundEnabled
              ? 'bg-[#6DDCC5] text-[#23244F] border-[#23244F]'
              : 'bg-[#23244F] text-[#FFF1D3] border-[#604A79] hover:border-[#FFD06A]'
          }`}
        >
          Sound: {soundEnabled ? 'On' : 'Off'}
        </button>
      </aside>
    </>
  );
};
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/components/sprites/PixelArtSprites.tsx">
<![CDATA['use client';

import React from 'react';

/**
 * Original 2D pixel-art sprite matrices and components for WARP & WANDER.
 * Protagonist: Pip, an original small caped mapmaker carrying a lantern-shaped compass.
 * Palette strictly adheres to the WARP & WANDER exclusive color tokens:
 *  I = #23244F (Twilight Indigo)
 *  F = #2F644F (Fern Forest)
 *  G = #FFD06A (Golden Nectar)
 *  C = #FF907A (Coral Bloom)
 *  D = #FFF1D3 (Daylight Cream)
 *  L = #6DDCC5 (Lagoon Mist)
 *  M = #604A79 (Mulberry Shadow)
 */

const PIXEL_COLOR_MAP: Record<string, string> = {
  I: '#23244F',
  F: '#2F644F',
  G: '#FFD06A',
  C: '#FF907A',
  D: '#FFF1D3',
  L: '#6DDCC5',
  M: '#604A79',
};

// 14x16 logical pixel grid for Pip the Mapmaker
const PIP_FRAMES: Record<'idle0' | 'idle1' | 'walk0' | 'walk1' | 'jump' | 'celebrate', string[]> = {
  idle0: [
    '....GGGG......',
    '...GGGGGG.....',
    '..IIIIIIII....',
    '..IDDDDDDI....',
    '..IDIDDIDI....',
    '..IDDDDDDI....',
    '...CCCCCC.....',
    '..CCCCCCCC..G.',
    '.CCCCCCCCCCGGG',
    '.CCCIIIICCC.G.',
    '.CC.IIII.CC...',
    '....IIII......',
    '....IIII......',
    '...FF..FF.....',
    '...FF..FF.....',
    '..............',
  ],
  idle1: [
    '..............',
    '....GGGG......',
    '...GGGGGG.....',
    '..IIIIIIII....',
    '..IDDDDDDI....',
    '..IDIDDIDI....',
    '..IDDDDDDI....',
    '...CCCCCC...G.',
    '..CCCCCCCC.GGG',
    '.CCCCCCCCCC.G.',
    '.CCCIIIICCC...',
    '....IIII......',
    '....IIII......',
    '...FF..FF.....',
    '...FF..FF.....',
    '..............',
  ],
  walk0: [
    '....GGGG......',
    '...GGGGGG.....',
    '..IIIIIIII....',
    '..IDDDDDDI....',
    '..IDIDDIDI....',
    '..IDDDDDDI....',
    '...CCCCCC..G..',
    '..CCCCCCCCGGG.',
    '.CCCCCCCCCCG..',
    '.CCCIIIICCC...',
    '....IIII......',
    '...II..II.....',
    '..FF....FF....',
    '..FF....FF....',
    '..............',
    '..............',
  ],
  walk1: [
    '....GGGG......',
    '...GGGGGG.....',
    '..IIIIIIII....',
    '..IDDDDDDI....',
    '..IDIDDIDI....',
    '..IDDDDDDI....',
    '...CCCCCC...G.',
    '..CCCCCCCC.GGG',
    '.CCCCCCCCCC.G.',
    '.CCCIIIICCC...',
    '....IIII......',
    '....IIII......',
    '....FF.FF.....',
    '...FF...FF....',
    '..............',
    '..............',
  ],
  jump: [
    '....GGGG...G..',
    '...GGGGGG.GGG.',
    '..IIIIIIII.G..',
    '..IDDDDDDI....',
    '..IDIDDIDI....',
    '..IDDDDDDI....',
    '..CCCCCCCC....',
    '.CCCCCCCCCC...',
    'CCC.IIII.CCC..',
    '....IIII......',
    '...II..II.....',
    '..FF....FF....',
    '..............',
    '..............',
    '..............',
    '..............',
  ],
  celebrate: [
    '.....GG....G..',
    '...GGGGGG.GGG.',
    '..IIIIIIII.L..',
    '..IDDDDDDI....',
    '..IDGDDGDI....',
    '..IDDDDDDI....',
    '.CCCCCCCCCC...',
    'CCCCCCCCCCCC..',
    'CC..IIII..CC..',
    '....IIII......',
    '...II..II.....',
    '..FF....FF....',
    '..............',
    '..............',
    '..............',
    '..............',
  ],
};

/**
 * Draw Pip directly onto a 2D Canvas context at (x, y) using nearest-neighbor logical pixels.
 */
export function drawPipSpriteToCanvas(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale = 3,
  pose: 'idle' | 'walk' | 'jump' | 'celebrate' = 'idle',
  frameTick = 0,
  facing: 'left' | 'right' = 'right',
  scaleX = 1,
  scaleY = 1
): void {
  let frameKey: keyof typeof PIP_FRAMES = 'idle0';
  if (pose === 'idle') {
    frameKey = frameTick % 2 === 0 ? 'idle0' : 'idle1';
  } else if (pose === 'walk') {
    frameKey = frameTick % 2 === 0 ? 'walk0' : 'walk1';
  } else if (pose === 'jump') {
    frameKey = 'jump';
  } else {
    frameKey = 'celebrate';
  }

  const rows = PIP_FRAMES[frameKey];
  const width = 14 * scale;
  const height = 16 * scale;

  ctx.save();
  ctx.translate(Math.round(x + width / 2), Math.round(y + height));
  ctx.scale((facing === 'left' ? -1 : 1) * scaleX, scaleY);
  ctx.translate(-Math.round(width / 2), -height);

  // Subtle ground shadow
  ctx.fillStyle = 'rgba(35, 36, 79, 0.45)';
  ctx.fillRect(scale * 2, height - scale * 2, scale * 10, scale * 2);

  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    for (let c = 0; c < row.length; c++) {
      const ch = row[c];
      if (ch === '.') continue;
      ctx.fillStyle = PIXEL_COLOR_MAP[ch] || '#FFF1D3';
      ctx.fillRect(c * scale, r * scale, scale, scale);
    }
  }

  // Lantern compass aura glow
  ctx.fillStyle = 'rgba(255, 208, 106, 0.28)';
  ctx.fillRect(10 * scale, 6 * scale, 5 * scale, 5 * scale);

  ctx.restore();
}

export const PipSpriteBadge: React.FC<{
  pose?: 'idle' | 'walk' | 'jump' | 'celebrate';
  size?: number;
  className?: string;
}> = ({ pose = 'idle', size = 56, className = '' }) => {
  const frameKey =
    pose === 'jump' ? 'jump' : pose === 'celebrate' ? 'celebrate' : pose === 'walk' ? 'walk0' : 'idle0';
  const rows = PIP_FRAMES[frameKey];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 16"
      className={`ww-pixelated pixelated shrink-0 ${className}`}
      aria-label="Pip the caped mapmaker carrying a lantern compass"
      role="img"
    >
      {rows.map((row, rIdx) =>
        row.split('').map((ch, cIdx) => {
          if (ch === '.') return null;
          return (
            <rect
              key={`${rIdx}-${cIdx}`}
              x={cIdx}
              y={rIdx}
              width={1}
              height={1}
              fill={PIXEL_COLOR_MAP[ch]}
            />
          );
        })
      )}
    </svg>
  );
};

export const PixelCompassIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 24,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    className={`ww-pixelated pixelated shrink-0 ${className}`}
    aria-hidden="true"
  >
    <rect x="4" y="0" width="4" height="1" fill="#FFD06A" />
    <rect x="5" y="1" width="2" height="1" fill="#FFD06A" />
    <rect x="3" y="2" width="6" height="1" fill="#FFD06A" />
    <rect x="2" y="3" width="8" height="6" fill="#23244F" />
    <rect x="1" y="4" width="1" height="4" fill="#FFD06A" />
    <rect x="10" y="4" width="1" height="4" fill="#FFD06A" />
    <rect x="2" y="2" width="1" height="1" fill="#FFD06A" />
    <rect x="9" y="2" width="1" height="1" fill="#FFD06A" />
    <rect x="2" y="9" width="8" height="1" fill="#FFD06A" />
    <rect x="3" y="10" width="6" height="1" fill="#FFD06A" />
    {/* Compass needle: Coral North, Lagoon South */}
    <rect x="5" y="4" width="2" height="2" fill="#FF907A" />
    <rect x="5" y="6" width="2" height="2" fill="#6DDCC5" />
    <rect x="5" y="5" width="2" height="2" fill="#FFF1D3" />
  </svg>
);

export const CartridgeArtifactSprite: React.FC<{
  accentColor: string;
  glyphPattern: number[][];
  discovered: boolean;
  frame?: number;
}> = ({ accentColor, glyphPattern, discovered, frame = 0 }) => {
  const pulseLift = frame % 2 === 0 ? 0 : -1;

  return (
    <svg
      width={64}
      height={64}
      viewBox="0 0 16 16"
      className="ww-pixelated pixelated shrink-0"
      aria-hidden="true"
    >
      <g transform={`translate(0, ${pulseLift})`}>
        {/* Outer cartridge silhouette */}
        <rect x="3" y="1" width="9" height="1" fill={accentColor} />
        <rect x="2" y="2" width="12" height="12" fill="#23244F" />
        <rect x="3" y="2" width="10" height="11" fill={discovered ? accentColor : '#604A79'} />
        {/* Grip grooves at top left/right */}
        <rect x="3" y="3" width="2" height="1" fill="#23244F" />
        <rect x="11" y="3" width="2" height="1" fill="#23244F" />
        {/* Recessed label window */}
        <rect x="4" y="5" width="8" height="7" fill="#23244F" />
        {/* Invented abstract rune glyph inside cartridge */}
        {glyphPattern.map((row, r) =>
          row.map((cell, c) =>
            cell === 1 ? (
              <rect
                key={`${r}-${c}`}
                x={5 + c}
                y={6 + r}
                width={1}
                height={1}
                fill={discovered ? '#FFF1D3' : accentColor}
              />
            ) : null
          )
        )}
        {/* Bottom connector pins */}
        <rect x="4" y="13" width="1" height="1" fill="#FFD06A" />
        <rect x="6" y="13" width="1" height="1" fill="#FFD06A" />
        <rect x="9" y="13" width="1" height="1" fill="#FFD06A" />
        <rect x="11" y="13" width="1" height="1" fill="#FFD06A" />
      </g>
      {/* Sparkle corners when discovered */}
      {discovered && (
        <>
          <rect x="1" y="1" width="1" height="1" fill="#FFD06A" />
          <rect x="14" y="2" width="1" height="1" fill="#6DDCC5" />
          <rect x="1" y="13" width="1" height="1" fill="#FF907A" />
        </>
      )}
    </svg>
  );
};
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/components/world/WorldCanvas.tsx">
<![CDATA['use client';

import React, { useEffect, useRef } from 'react';
import {
  PALETTE,
  PARALLAX_RATIOS,
  WORLD_TOTAL_WIDTH,
  scrollProgressToWorldX,
  interpolateSkyPalette,
  getTerrainHeightAtX,
  lerpHexColor,
} from '../../lib/world/worldMap';
import { drawPipSpriteToCanvas } from '../sprites/PixelArtSprites';

interface WorldCanvasProps {
  scrollProgressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
  discoveredArtifactsCount: number;
  miniGameCompleted: boolean;
}

/**
 * Continuous 2D Pixel-Art Side-Scrolling World Renderer.
 * - Single scene renderer using native Canvas 2D with nearest-neighbor quantization.
 * - Correlates vertical document scroll with horizontal camera X translation across 6 acts.
 * - Respects prefers-reduced-motion and ResizeObserver without React re-renders on scroll frames.
 */
export const WorldCanvas: React.FC<WorldCanvasProps> = ({
  scrollProgressRef,
  reducedMotion,
  discoveredArtifactsCount,
  miniGameCompleted,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotionRef = useRef(reducedMotion);
  const discoveredRef = useRef(discoveredArtifactsCount);
  const miniGameRef = useRef(miniGameCompleted);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    discoveredRef.current = discoveredArtifactsCount;
  }, [discoveredArtifactsCount]);

  useEffect(() => {
    miniGameRef.current = miniGameCompleted;
  }, [miniGameCompleted]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const PIXEL = 4; // Logical 4px grid unit for crisp 16-bit aesthetic

    const updateDimensions = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      ctx.imageSmoothingEnabled = false;
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(document.documentElement);

    let rafId = 0;
    let lastProgress = scrollProgressRef.current;
    let walkActivityTimer = 0;
    let facingDir: 'left' | 'right' = 'right';
    let smoothedWorldX = scrollProgressToWorldX(scrollProgressRef.current);

    const snap = (val: number) => Math.floor(val / PIXEL) * PIXEL;

    const drawPixelGear = (
      cx: number,
      cy: number,
      radius: number,
      angleRad: number,
      fillHex: string,
      coreHex: string
    ) => {
      ctx.fillStyle = fillHex;
      const r = snap(radius);
      ctx.fillRect(snap(cx - r), snap(cy - r * 0.65), snap(r * 2), snap(r * 1.3));
      ctx.fillRect(snap(cx - r * 0.65), snap(cy - r), snap(r * 1.3), snap(r * 2));

      // 8 rotating teeth stepped to pixel grid
      for (let i = 0; i < 8; i++) {
        const a = angleRad + (i * Math.PI) / 4;
        const tx = snap(cx + Math.cos(a) * (r + PIXEL * 2));
        const ty = snap(cy + Math.sin(a) * (r + PIXEL * 2));
        ctx.fillRect(tx - PIXEL * 2, ty - PIXEL * 2, PIXEL * 4, PIXEL * 4);
      }

      // Inner hub
      ctx.fillStyle = coreHex;
      ctx.fillRect(snap(cx - r * 0.35), snap(cy - r * 0.35), snap(r * 0.7), snap(r * 0.7));
    };

    const renderFrame = (timestamp: number) => {
      const progress = scrollProgressRef.current;
      const targetWorldX = scrollProgressToWorldX(progress);
      const isReduced = reducedMotionRef.current;

      if (isReduced) {
        smoothedWorldX = targetWorldX;
      } else {
        smoothedWorldX += (targetWorldX - smoothedWorldX) * 0.22;
      }

      const deltaProgress = progress - lastProgress;
      if (Math.abs(deltaProgress) > 0.0004) {
        walkActivityTimer = 0.25;
        facingDir = deltaProgress >= 0 ? 'right' : 'left';
      } else {
        walkActivityTimer = Math.max(0, walkActivityTimer - 0.016);
      }
      lastProgress = progress;

      // Discrete sprite frame clock (6 steps per second)
      const spriteTick = isReduced ? 0 : Math.floor(timestamp / 180);

      // 1. CONTINUOUS SKY & HORIZON BANDS (Zero vertical/horizontal section seams)
      const skyColors = interpolateSkyPalette(smoothedWorldX);
      const skyBands = 10;
      const bandHeight = Math.ceil(height / skyBands / PIXEL) * PIXEL;

      for (let b = 0; b < skyBands; b++) {
        const t = b / (skyBands - 1);
        const bandColor =
          t < 0.7
            ? lerpHexColor(skyColors.skyTop, skyColors.skyBottom, t / 0.7)
            : lerpHexColor(skyColors.skyBottom, skyColors.horizonGlow, (t - 0.7) / 0.3);
        ctx.fillStyle = bandColor;
        ctx.fillRect(0, b * bandHeight, width, bandHeight + PIXEL);
      }

      const baselineY = snap(height * 0.87);

      // 2. FAR SKY LAYER (0.15x Parallax) — Sun/Moon Orb, Stars, Pixel Clouds
      const skyOffset = snap(smoothedWorldX * PARALLAX_RATIOS.farSky);
      const sunX = snap(width * 0.72 - (skyOffset % (width * 1.4)) + width * 0.3);
      const sunY = snap(height * 0.18);

      // Stepped Pixel Sun Disk in Golden Nectar & Daylight Cream
      ctx.fillStyle = 'rgba(255, 208, 106, 0.28)';
      ctx.fillRect(sunX - PIXEL * 16, sunY - PIXEL * 12, PIXEL * 32, PIXEL * 24);
      ctx.fillRect(sunX - PIXEL * 12, sunY - PIXEL * 16, PIXEL * 24, PIXEL * 32);
      ctx.fillStyle = PALETTE.goldenNectar;
      ctx.fillRect(sunX - PIXEL * 10, sunY - PIXEL * 8, PIXEL * 20, PIXEL * 16);
      ctx.fillRect(sunX - PIXEL * 8, sunY - PIXEL * 10, PIXEL * 16, PIXEL * 20);
      ctx.fillStyle = PALETTE.daylightCream;
      ctx.fillRect(sunX - PIXEL * 6, sunY - PIXEL * 6, PIXEL * 12, PIXEL * 12);

      // Drifting Original Stepped Clouds
      const cloudDrift = isReduced ? 0 : snap((timestamp * 0.012) % 1200);
      for (let i = 0; i < 9; i++) {
        const cx =
          snap(((i * 340 - skyOffset + cloudDrift) % (width + 420)) + (width + 420)) %
            (width + 420) -
          210;
        const cy = snap(height * 0.11 + (i % 3) * 44);
        const cw = (14 + (i % 3) * 6) * PIXEL;
        ctx.fillStyle = i % 2 === 0 ? PALETTE.daylightCream : PALETTE.goldenNectar;
        ctx.fillRect(cx, cy, cw, PIXEL * 3);
        ctx.fillRect(cx + PIXEL * 2, cy - PIXEL * 2, cw - PIXEL * 4, PIXEL * 2);
      }

      // 3. DISTANT MOUNTAINS LAYER (0.30x Parallax) — Mulberry Shadow & Twilight Indigo Peaks
      const mountainOffset = snap(smoothedWorldX * PARALLAX_RATIOS.mountains);
      for (let m = -1; m < Math.ceil(width / 240) + 2; m++) {
        const worldPeakIndex = Math.floor((mountainOffset + m * 240) / 240);
        const mx = snap(m * 240 - (mountainOffset % 240));
        const peakHeight = snap(120 + ((Math.abs(worldPeakIndex * 73) % 5) * 28));
        const steps = Math.floor(peakHeight / (PIXEL * 3));

        ctx.fillStyle =
          Math.abs(worldPeakIndex) % 2 === 0 ? PALETTE.mulberryShadow : PALETTE.twilightIndigo;
        for (let s = 0; s < steps; s++) {
          const stepY = baselineY - peakHeight + s * PIXEL * 3;
          const halfSpan = (s + 2) * PIXEL * 3;
          ctx.fillRect(mx + 120 - halfSpan, stepY, halfSpan * 2, PIXEL * 3);
        }
      }

      // 4. MIDGROUND WORLD LANDMARKS (0.58x Parallax) — Act-Specific Connected Scenery
      const midOffset = snap(smoothedWorldX * PARALLAX_RATIOS.midground);

      // Act 0 Midground: Daybreak Stone Archway & Hanging Vines (worldX ~ 0..700)
      const archScreenX = snap(520 - midOffset);
      if (archScreenX > -320 && archScreenX < width + 320) {
        ctx.fillStyle = PALETTE.mulberryShadow;
        ctx.fillRect(archScreenX, baselineY - 168, PIXEL * 8, 168);
        ctx.fillRect(archScreenX + PIXEL * 24, baselineY - 168, PIXEL * 8, 168);
        ctx.fillRect(archScreenX - PIXEL * 3, baselineY - 184, PIXEL * 38, PIXEL * 5);
        ctx.fillStyle = PALETTE.fernForest;
        ctx.fillRect(archScreenX + PIXEL * 2, baselineY - 180, PIXEL * 12, PIXEL * 8);
        ctx.fillRect(archScreenX + PIXEL * 24, baselineY - 156, PIXEL * 4, PIXEL * 18);
      }

      // Act 1 Midground: Oversized Round-Leaf Enchanted Trees & Teal Streams (worldX ~ 600..1500)
      for (let t = 0; t < 7; t++) {
        const treeX = snap(640 + t * 145 - midOffset);
        if (treeX > -200 && treeX < width + 200) {
          const trunkH = 96 + (t % 3) * 24;
          ctx.fillStyle = PALETTE.twilightIndigo;
          ctx.fillRect(treeX + PIXEL * 7, baselineY - trunkH, PIXEL * 5, trunkH);
          ctx.fillStyle = PALETTE.fernForest;
          ctx.fillRect(treeX, baselineY - trunkH - PIXEL * 12, PIXEL * 19, PIXEL * 14);
          ctx.fillRect(treeX + PIXEL * 3, baselineY - trunkH - PIXEL * 16, PIXEL * 13, PIXEL * 4);
          ctx.fillStyle = t % 2 === 0 ? PALETTE.goldenNectar : PALETTE.lagoonMist;
          ctx.fillRect(treeX + PIXEL * 4, baselineY - trunkH - PIXEL * 16, PIXEL * 11, PIXEL * 2);
        }
      }

      // Act 2 Midground: Crystal Lake Shimmering Geometric Reflections (worldX ~ 1150..1850)
      const lakeStartX = snap(1120 - midOffset);
      const lakeWidth = snap(720);
      if (lakeStartX + lakeWidth > -100 && lakeStartX < width + 100) {
        ctx.fillStyle = PALETTE.lagoonMist;
        ctx.fillRect(lakeStartX, baselineY - PIXEL * 3, lakeWidth, PIXEL * 18);

        for (let r = 0; r < 14; r++) {
          const rx = snap(lakeStartX + 36 + r * 48);
          const ry = snap(baselineY + ((r + spriteTick) % 3) * PIXEL * 3);
          ctx.fillStyle = (r + spriteTick) % 2 === 0 ? PALETTE.daylightCream : PALETTE.goldenNectar;
          ctx.fillRect(rx, ry, PIXEL * 5, PIXEL);
          ctx.fillRect(rx + PIXEL, ry - PIXEL, PIXEL * 3, PIXEL * 3);
        }
      }

      // Act 3 Midground: Clockwork Ridge Rotating Brass Gears & Mechanical Lift (worldX ~ 1700..2400)
      const ridgeBaseX = snap(1820 - midOffset);
      if (ridgeBaseX > -400 && ridgeBaseX < width + 400) {
        const gearAngle = isReduced ? 0 : (timestamp * 0.0012) % (Math.PI * 2);
        drawPixelGear(
          ridgeBaseX + 120,
          baselineY - 92,
          36,
          gearAngle,
          PALETTE.goldenNectar,
          PALETTE.twilightIndigo
        );
        drawPixelGear(
          ridgeBaseX + 196,
          baselineY - 56,
          26,
          -gearAngle * 1.3,
          PALETTE.coralBloom,
          PALETTE.twilightIndigo
        );
        drawPixelGear(
          ridgeBaseX + 270,
          baselineY - 116,
          42,
          gearAngle * 0.8,
          PALETTE.mulberryShadow,
          PALETTE.goldenNectar
        );

        ctx.fillStyle = PALETTE.twilightIndigo;
        ctx.fillRect(ridgeBaseX + 340, baselineY - 180, PIXEL * 3, 180);
        ctx.fillRect(ridgeBaseX + 384, baselineY - 180, PIXEL * 3, 180);
        const liftProgress = Math.max(0, Math.min(1, (smoothedWorldX - 3000) / 900));
        const liftY = snap(baselineY - 32 - liftProgress * 110);
        ctx.fillStyle = PALETTE.goldenNectar;
        ctx.fillRect(ridgeBaseX + 332, liftY, 68, PIXEL * 3);
      }

      // Act 4 Midground: Cloud City Floating Platforms & Wind Currents (worldX ~ 2350..3000)
      const cloudCityX = snap(2420 - midOffset);
      if (cloudCityX > -400 && cloudCityX < width + 400) {
        for (let c = 0; c < 5; c++) {
          const platX = snap(cloudCityX + c * 115);
          const platY = snap(baselineY - 76 - (c % 3) * 34);
          ctx.fillStyle = PALETTE.daylightCream;
          ctx.fillRect(platX, platY, PIXEL * 18, PIXEL * 4);
          ctx.fillStyle = PALETTE.lagoonMist;
          ctx.fillRect(platX + PIXEL * 2, platY + PIXEL * 4, PIXEL * 14, PIXEL * 2);
        }
      }

      // Act 5 Midground: The Last Gate Luminous Chamber Pillars (worldX ~ 2950..3600)
      const gateX = snap(3120 - midOffset);
      if (gateX > -400 && gateX < width + 400) {
        ctx.fillStyle = PALETTE.goldenNectar;
        ctx.fillRect(gateX, baselineY - 210, PIXEL * 7, 210);
        ctx.fillRect(gateX + 180, baselineY - 210, PIXEL * 7, 210);
        ctx.fillRect(gateX - 16, baselineY - 226, 240, PIXEL * 5);
        ctx.fillStyle = 'rgba(255, 241, 211, 0.16)';
        ctx.fillRect(gateX + 28, 0, 152, baselineY);
      }

      // 5. WALKABLE GROUND & FOREGROUND PATH (0.85x Parallax)
      const groundScroll = snap(smoothedWorldX * PARALLAX_RATIOS.walkableGround);
      const tileStride = PIXEL * 8;
      const cols = Math.ceil(width / tileStride) + 3;

      for (let col = -1; col < cols; col++) {
        const screenX = snap(col * tileStride - (groundScroll % tileStride));
        const tileWorldX =
          ((screenX - width * 0.5) / PARALLAX_RATIOS.walkableGround) + smoothedWorldX;
        const elev = getTerrainHeightAtX(tileWorldX);
        const topY = snap(baselineY - elev);

        const isLake = tileWorldX >= 2050 && tileWorldX <= 2900;
        const isSanctuary = tileWorldX >= 5000;

        ctx.fillStyle = isSanctuary
          ? PALETTE.goldenNectar
          : isLake
          ? PALETTE.lagoonMist
          : PALETTE.fernForest;
        ctx.fillRect(screenX, topY, tileStride, PIXEL * 3);

        ctx.fillStyle = PALETTE.twilightIndigo;
        ctx.fillRect(screenX, topY + PIXEL * 3, tileStride, height - topY);

        ctx.fillStyle = PALETTE.mulberryShadow;
        ctx.fillRect(
          screenX + PIXEL * 2,
          topY + PIXEL * ((Math.abs(col) % 2) * 3 + 5),
          PIXEL * 4,
          PIXEL * 2
        );
      }

      // 6. PIP THE MAPMAKER ON THE CENTER-BOTTOM SCENIC TRAIL
      const pipScreenX = snap(width * 0.52);
      const pipElev = getTerrainHeightAtX(smoothedWorldX);
      const pipFeetY = snap(baselineY - pipElev);
      const pipPose: 'idle' | 'walk' | 'jump' | 'celebrate' =
        smoothedWorldX >= 5400 || miniGameRef.current
          ? 'celebrate'
          : walkActivityTimer > 0.02
          ? 'walk'
          : 'idle';

      drawPipSpriteToCanvas(
        ctx,
        pipScreenX - 21,
        pipFeetY - 46,
        3,
        pipPose,
        spriteTick,
        facingDir
      );

      // Trail Milepost Sign beside Pip in Act 0
      const signX = snap(pipScreenX + 64 - groundScroll * 0.35);
      if (signX > -60 && signX < width + 60) {
        ctx.fillStyle = PALETTE.goldenNectar;
        ctx.fillRect(signX + PIXEL * 3, baselineY - 36, PIXEL * 2, 36);
        ctx.fillStyle = PALETTE.coralBloom;
        ctx.fillRect(signX, baselineY - 48, PIXEL * 10, PIXEL * 4);
      }

      // 7. FOREGROUND FOLIAGE SILHOUETTES (1.0x Parallax)
      const fgOffset = snap(smoothedWorldX * PARALLAX_RATIOS.foreground);
      for (let f = 0; f < 8; f++) {
        const fx =
          snap(((f * 420 - fgOffset) % (width + 420)) + (width + 420)) % (width + 420) - 120;
        const fy = height - PIXEL * 6;
        ctx.fillStyle = PALETTE.fernForest;
        ctx.fillRect(fx, fy, PIXEL * 14, PIXEL * 6);
        ctx.fillRect(fx + PIXEL * 3, fy - PIXEL * 3, PIXEL * 8, PIXEL * 3);
      }

      // Software-friendly frame scheduling: fast when scrolling, relaxed 12fps sprite cadence when idle
      const isScrolling = Math.abs(targetWorldX - smoothedWorldX) > 1 || walkActivityTimer > 0;
      const delayMs = isReduced ? 250 : isScrolling ? 16 : 90;
      timerId = window.setTimeout(() => {
        rafId = window.requestAnimationFrame(renderFrame);
      }, delayMs);
    };

    let timerId = 0;
    rafId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.clearTimeout(timerId);
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [scrollProgressRef]);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      data-testid="world-canvas-container"
    >
      <canvas ref={canvasRef} className="w-full h-full block ww-pixelated pixelated" />
      {/* Subtle atmospheric vignette leaving the pixel landscape vivid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(35,36,79,0.32) 0%, rgba(35,36,79,0.12) 55%, rgba(35,36,79,0.42) 100%)',
        }}
      />
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/lib/audio/soundEngine.ts">
<![CDATA[/**
 * Opt-in procedural Web Audio API sound synthesizer for WARP & WANDER.
 * Strictly OFF by default as required by Section 5 & Section 8.8 of the specification.
 * Generates original warm 16-bit-inspired chimes and tactile clicks without external audio files.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled = false;

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(next: boolean): boolean {
    this.enabled = next;
    if (next) {
      this.ensureContext();
      this.playTone(523.25, 0.08, 'triangle', 0.08); // C5 gentle confirmation chime
      setTimeout(() => this.playTone(659.25, 0.11, 'triangle', 0.08), 70); // E5
    }
    return this.enabled;
  }

  public toggle(): boolean {
    return this.setEnabled(!this.enabled);
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'triangle',
    volume = 0.08
  ): void {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      // Add slight ±4% organic pitch variation
      const detune = 1 + (Math.random() - 0.5) * 0.03;
      osc.frequency.setValueAtTime(freq * detune, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration + 0.02);
    } catch {
      // Ignore audio errors in restricted headless environments
    }
  }

  public playButtonClick(): void {
    this.playTone(440, 0.05, 'square', 0.04);
  }

  public playArtifactDiscover(): void {
    if (!this.enabled) return;
    this.playTone(587.33, 0.09, 'triangle', 0.09); // D5
    setTimeout(() => this.playTone(783.99, 0.12, 'triangle', 0.09), 75); // G5
    setTimeout(() => this.playTone(1046.5, 0.18, 'sine', 0.1), 150); // C6
  }

  public playJump(): void {
    this.playTone(349.23, 0.08, 'triangle', 0.07);
    setTimeout(() => this.playTone(466.16, 0.09, 'triangle', 0.06), 45);
  }

  public playShardPickup(): void {
    if (!this.enabled) return;
    this.playTone(659.25, 0.08, 'triangle', 0.09);
    setTimeout(() => this.playTone(880, 0.12, 'triangle', 0.09), 65);
    setTimeout(() => this.playTone(1318.5, 0.2, 'sine', 0.1), 130);
  }

  public playVictoryFanfare(): void {
    if (!this.enabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playTone(n, 0.18, 'triangle', 0.1), idx * 95);
    });
  }
}

export const soundEngine = new SoundEngine();
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/lib/game/miniGamePhysics.ts">
<![CDATA[/**
 * Pure, deterministic 2D platformer physics engine for Act 4: Cloud City Interlude.
 * Implements clamped dt, coyote time, jump buffering, variable jump height cut,
 * squash-and-stretch damping, pooled particle ring buffer, and Compass Shard collection.
 */

export interface PlatformRect {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  kind: 'cloud' | 'stone' | 'wind-lift';
}

export interface CompassShard {
  id: string;
  name: string;
  x: number;
  y: number;
  radius: number;
  collected: boolean;
  color: string;
}

export interface PooledParticle {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export interface MiniGameInputState {
  left: boolean;
  right: boolean;
  jumpHeld: boolean;
  jumpJustPressed: boolean;
  jumpJustReleased: boolean;
}

export interface MiniGameWorldState {
  status: 'title' | 'playing' | 'paused' | 'victory';
  width: number;
  height: number;
  elapsedTime: number;
  player: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    width: number;
    height: number;
    grounded: boolean;
    facing: 'left' | 'right';
    coyoteTimer: number;
    jumpBufferTimer: number;
    scaleX: number;
    scaleY: number;
    walkDistance: number;
    animState: 'idle' | 'walk' | 'jump' | 'celebrate';
  };
  platforms: PlatformRect[];
  shards: CompassShard[];
  collectedCount: number;
  totalShards: number;
  particles: PooledParticle[];
  particleCursor: number;
}

export const GAME_CONSTANTS = {
  CANVAS_WIDTH: 760,
  CANVAS_HEIGHT: 380,
  GRAVITY: 980,
  MOVE_SPEED: 220,
  GROUND_ACCEL: 1800,
  AIR_ACCEL: 1300,
  FRICTION: 1600,
  JUMP_VELOCITY: -435,
  COYOTE_TIME: 0.11,
  JUMP_BUFFER_TIME: 0.13,
  JUMP_CUT_MULTIPLIER: 0.45,
  MAX_DT: 0.05,
  PARTICLE_POOL_SIZE: 48,
} as const;

export function createInitialMiniGameState(autostart = false): MiniGameWorldState {
  const platforms: PlatformRect[] = [
    // Starting wide stone sanctuary terrace (safe spawn >= 3 tiles wide)
    { id: 'plat-start', x: 30, y: 296, width: 170, height: 28, kind: 'stone' },
    // Low stepping cloud
    { id: 'plat-cloud-1', x: 230, y: 246, width: 120, height: 22, kind: 'cloud' },
    // Center sky bridge cloud
    { id: 'plat-cloud-2', x: 380, y: 196, width: 136, height: 22, kind: 'cloud' },
    // Lower wind-current platform
    { id: 'plat-wind', x: 320, y: 304, width: 130, height: 22, kind: 'wind-lift' },
    // Upper eastern terrace
    { id: 'plat-cloud-3', x: 548, y: 156, width: 164, height: 26, kind: 'stone' },
    // Eastern lower landing pad
    { id: 'plat-east-low', x: 540, y: 278, width: 170, height: 24, kind: 'cloud' },
  ];

  const shards: CompassShard[] = [
    {
      id: 'shard-dawn',
      name: 'Dawn Needle Shard',
      x: 290,
      y: 204,
      radius: 14,
      collected: false,
      color: '#FFD06A',
    },
    {
      id: 'shard-mist',
      name: 'Lagoon Horizon Shard',
      x: 448,
      y: 152,
      radius: 14,
      collected: false,
      color: '#6DDCC5',
    },
    {
      id: 'shard-coral',
      name: 'Starlight Crest Shard',
      x: 630,
      y: 112,
      radius: 14,
      collected: false,
      color: '#FF907A',
    },
  ];

  const particles: PooledParticle[] = Array.from(
    { length: GAME_CONSTANTS.PARTICLE_POOL_SIZE },
    () => ({
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      maxLife: 0.5,
      size: 4,
      color: '#FFD06A',
    })
  );

  return {
    status: autostart ? 'playing' : 'title',
    width: GAME_CONSTANTS.CANVAS_WIDTH,
    height: GAME_CONSTANTS.CANVAS_HEIGHT,
    elapsedTime: 0,
    player: {
      x: 84,
      y: 296 - 36,
      vx: 0,
      vy: 0,
      width: 28,
      height: 36,
      grounded: true,
      facing: 'right',
      coyoteTimer: GAME_CONSTANTS.COYOTE_TIME,
      jumpBufferTimer: 0,
      scaleX: 1,
      scaleY: 1,
      walkDistance: 0,
      animState: 'idle',
    },
    platforms,
    shards,
    collectedCount: 0,
    totalShards: shards.length,
    particles,
    particleCursor: 0,
  };
}

/**
 * Spawn particles from the pre-allocated ring buffer (Zero GC inside RAF).
 */
export function emitPooledParticles(
  state: MiniGameWorldState,
  x: number,
  y: number,
  count: number,
  color: string,
  speedScale = 1
): void {
  for (let i = 0; i < count; i++) {
    const p = state.particles[state.particleCursor];
    state.particleCursor = (state.particleCursor + 1) % state.particles.length;

    const angle = (Math.PI * 2 * i) / count + (i % 2) * 0.25;
    const speed = (45 + (i % 4) * 28) * speedScale;
    p.active = true;
    p.x = x;
    p.y = y;
    p.vx = Math.cos(angle) * speed;
    p.vy = Math.sin(angle) * speed - 35;
    p.life = 0;
    p.maxLife = 0.35 + (i % 3) * 0.12;
    p.size = i % 2 === 0 ? 4 : 6;
    p.color = color;
  }
}

/**
 * Step the Cloud City platformer simulation forward by rawDt seconds.
 * Mutates state in-place for 60Hz zero-allocation performance and returns events triggered.
 */
export function stepMiniGameSimulation(
  state: MiniGameWorldState,
  input: MiniGameInputState,
  rawDt: number
): {
  jumped: boolean;
  landed: boolean;
  collectedShardIds: string[];
  justWon: boolean;
} {
  const events = {
    jumped: false,
    landed: false,
    collectedShardIds: [] as string[],
    justWon: false,
  };

  if (state.status !== 'playing') {
    return events;
  }

  // Clamp dt to <= 0.05s to prevent tunneling
  const dt = Math.min(Math.max(rawDt, 0), GAME_CONSTANTS.MAX_DT);
  state.elapsedTime += dt;

  const p = state.player;
  const wasGrounded = p.grounded;

  // Update coyote & jump buffer timers
  if (p.grounded) {
    p.coyoteTimer = GAME_CONSTANTS.COYOTE_TIME;
  } else {
    p.coyoteTimer = Math.max(0, p.coyoteTimer - dt);
  }

  if (input.jumpJustPressed) {
    p.jumpBufferTimer = GAME_CONSTANTS.JUMP_BUFFER_TIME;
  } else {
    p.jumpBufferTimer = Math.max(0, p.jumpBufferTimer - dt);
  }

  // Horizontal movement with acceleration & friction
  const moveDir = (input.right ? 1 : 0) - (input.left ? 1 : 0);
  const accel = p.grounded ? GAME_CONSTANTS.GROUND_ACCEL : GAME_CONSTANTS.AIR_ACCEL;

  if (moveDir !== 0) {
    p.vx += moveDir * accel * dt;
    if (p.vx > GAME_CONSTANTS.MOVE_SPEED) p.vx = GAME_CONSTANTS.MOVE_SPEED;
    if (p.vx < -GAME_CONSTANTS.MOVE_SPEED) p.vx = -GAME_CONSTANTS.MOVE_SPEED;
    p.facing = moveDir > 0 ? 'right' : 'left';
  } else {
    const decel = GAME_CONSTANTS.FRICTION * dt;
    if (Math.abs(p.vx) <= decel) {
      p.vx = 0;
    } else {
      p.vx -= Math.sign(p.vx) * decel;
    }
  }

  // Execute buffered jump if within coyote window
  if (p.jumpBufferTimer > 0 && p.coyoteTimer > 0) {
    p.vy = GAME_CONSTANTS.JUMP_VELOCITY;
    p.grounded = false;
    p.coyoteTimer = 0;
    p.jumpBufferTimer = 0;
    // Squash-and-stretch on takeoff
    p.scaleX = 0.85;
    p.scaleY = 1.18;
    events.jumped = true;
    emitPooledParticles(state, p.x + p.width / 2, p.y + p.height, 6, '#FFF1D3', 0.8);
  }

  // Variable jump height cut when releasing jump early while ascending
  if (input.jumpJustReleased && p.vy < 0) {
    p.vy *= GAME_CONSTANTS.JUMP_CUT_MULTIPLIER;
  }

  // Apply gravity
  p.vy += GAME_CONSTANTS.GRAVITY * dt;
  if (p.vy > 620) p.vy = 620;

  // Integrate position
  const prevBottom = p.y + p.height;
  p.x += p.vx * dt;
  p.y += p.vy * dt;

  // Horizontal screen boundary clamp
  if (p.x < 12) {
    p.x = 12;
    p.vx = 0;
  } else if (p.x + p.width > state.width - 12) {
    p.x = state.width - 12 - p.width;
    p.vx = 0;
  }

  // One-way platform landing collision check
  p.grounded = false;
  const newBottom = p.y + p.height;

  if (p.vy >= 0) {
    for (let i = 0; i < state.platforms.length; i++) {
      const plat = state.platforms[i];
      const overlapsX = p.x + p.width - 4 > plat.x && p.x + 4 < plat.x + plat.width;
      const crossedTop = prevBottom <= plat.y + 8 && newBottom >= plat.y;

      if (overlapsX && crossedTop) {
        p.y = plat.y - p.height;
        p.vy = 0;
        p.grounded = true;
        if (!wasGrounded) {
          events.landed = true;
          p.scaleX = 1.22;
          p.scaleY = 0.78;
          emitPooledParticles(state, p.x + p.width / 2, plat.y, 5, '#6DDCC5', 0.6);
        }
        break;
      }
    }
  }

  // Cozy safety updraft if Pip slips below the bottom of the cloud canvas
  if (p.y > state.height + 24) {
    p.x = 84;
    p.y = 296 - p.height;
    p.vx = 0;
    p.vy = 0;
    p.grounded = true;
    p.coyoteTimer = GAME_CONSTANTS.COYOTE_TIME;
    emitPooledParticles(state, p.x + p.width / 2, p.y + p.height, 8, '#FFD06A', 1);
  }

  // Smoothly damp squash-and-stretch back to (1, 1)
  const dampFactor = Math.min(1, dt * 14);
  p.scaleX += (1 - p.scaleX) * dampFactor;
  p.scaleY += (1 - p.scaleY) * dampFactor;

  // Gait sync to distance traveled
  if (p.grounded && Math.abs(p.vx) > 8) {
    p.walkDistance += Math.abs(p.vx) * dt;
    p.animState = 'walk';
  } else if (!p.grounded) {
    p.animState = 'jump';
  } else {
    p.animState = 'idle';
  }

  // Check Compass Shard collection
  const playerCenterX = p.x + p.width / 2;
  const playerCenterY = p.y + p.height / 2;

  for (let i = 0; i < state.shards.length; i++) {
    const shard = state.shards[i];
    if (shard.collected) continue;

    const dx = playerCenterX - shard.x;
    const dy = playerCenterY - shard.y;
    const distSq = dx * dx + dy * dy;
    const hitRadius = shard.radius + 18;

    if (distSq <= hitRadius * hitRadius) {
      shard.collected = true;
      state.collectedCount += 1;
      events.collectedShardIds.push(shard.id);
      emitPooledParticles(state, shard.x, shard.y, 14, shard.color, 1.25);
    }
  }

  // Check Victory condition (all 3 Compass Shards collected)
  if (state.collectedCount >= state.totalShards && state.status === 'playing') {
    state.status = 'victory';
    p.vx = 0;
    p.animState = 'celebrate';
    events.justWon = true;
    emitPooledParticles(state, playerCenterX, playerCenterY - 10, 24, '#FFD06A', 1.5);
  }

  // Update active particles in pool
  for (let i = 0; i < state.particles.length; i++) {
    const pt = state.particles[i];
    if (!pt.active) continue;
    pt.life += dt;
    if (pt.life >= pt.maxLife) {
      pt.active = false;
      continue;
    }
    pt.x += pt.vx * dt;
    pt.y += pt.vy * dt;
    pt.vy += 180 * dt;
  }

  return events;
}
]]>
    </file>
    <file path="src/app/(warpwander)/warpwander/lib/world/worldMap.ts">
<![CDATA[/**
 * Pure world map geometry, scroll-to-camera interpolation, act definitions,
 * and verified Analogue Pocket product data for WARP & WANDER.
 */

export const PALETTE = {
  twilightIndigo: '#23244F',
  fernForest: '#2F644F',
  goldenNectar: '#FFD06A',
  coralBloom: '#FF907A',
  daylightCream: '#FFF1D3',
  lagoonMist: '#6DDCC5',
  mulberryShadow: '#604A79',
} as const;

export const PARALLAX_RATIOS = {
  farSky: 0.15,
  mountains: 0.30,
  midground: 0.58,
  walkableGround: 0.85,
  foreground: 1.0,
} as const;

export interface ActDefinition {
  id: string;
  actNumber: number;
  code: string;
  shortTitle: string;
  title: string;
  headline: string;
  supportCopy: string;
  worldXStart: number;
  worldXEnd: number;
  skyTopHex: string;
  skyBottomHex: string;
  horizonGlowHex: string;
  pipNarrativeNote: string;
}

export const WORLD_TOTAL_WIDTH = 6000;

export const ACTS: ActDefinition[] = [
  {
    id: 'act-0',
    actNumber: 0,
    code: 'ACT 00',
    shortTitle: 'The Portal',
    title: 'THE PORTAL / HERO',
    headline: 'EVERY WORLD BEGINS WITH PLAY.',
    supportCopy: 'Meet the handheld that brings the classics along for the ride.',
    worldXStart: 0,
    worldXEnd: 1000,
    skyTopHex: '#23244F',
    skyBottomHex: '#FFD06A',
    horizonGlowHex: '#FFF1D3',
    pipNarrativeNote: 'Pip waits beside the Daybreak Archway where pixel paths meet physical hardware.',
  },
  {
    id: 'act-1',
    actNumber: 1,
    code: 'ACT 01',
    shortTitle: 'Cartridge Forest',
    title: 'THE FOREST OF CARTRIDGES',
    headline: 'OLD ADVENTURES. NEW JOURNEYS.',
    supportCopy:
      'Out of the box, Analogue Pocket is compatible with the 2,780+ Game Boy, Game Boy Color, and Game Boy Advance game cartridge library—with optional cartridge adapters for other classic portable formats.',
    worldXStart: 1000,
    worldXEnd: 2000,
    skyTopHex: '#23244F',
    skyBottomHex: '#2F644F',
    horizonGlowHex: '#FFD06A',
    pipNarrativeNote: 'Beneath the oversized fern canopy, three cartridge relics hum with multi-system memory.',
  },
  {
    id: 'act-2',
    actNumber: 2,
    code: 'ACT 02',
    shortTitle: 'Crystal Lake',
    title: 'THE CRYSTAL LAKE / DISPLAY',
    headline: 'A WINDOW INTO EVERY DETAIL.',
    supportCopy:
      'A custom 3.5-inch, 1600 × 1440 resolution LCD delivering 615 ppi and 10× the resolution of the original Game Boy—engineered for razor-sharp integer scaling and faithful display modes.',
    worldXStart: 2000,
    worldXEnd: 3000,
    skyTopHex: '#23244F',
    skyBottomHex: '#604A79',
    horizonGlowHex: '#6DDCC5',
    pipNarrativeNote: 'The Crystalline Basin reflects every individual sub-pixel with zero blur or distortion.',
  },
  {
    id: 'act-3',
    actNumber: 3,
    code: 'ACT 03',
    shortTitle: 'Clockwork Ridge',
    title: 'THE CLOCKWORK RIDGE / PRECISION',
    headline: 'BUILT FOR THE WAY PLAY FEELS.',
    supportCopy:
      'Engineered with dual dedicated FPGAs—no software emulation—paired with responsive physical controls, a precision directional pad, and an iconic handheld silhouette.',
    worldXStart: 3000,
    worldXEnd: 4000,
    skyTopHex: '#23244F',
    skyBottomHex: '#604A79',
    horizonGlowHex: '#FF907A',
    pipNarrativeNote: 'Brass gears interlock on Clockwork Ridge, mirroring hardware-level FPGA timing accuracy.',
  },
  {
    id: 'act-4',
    actNumber: 4,
    code: 'ACT 04',
    shortTitle: 'Cloud City',
    title: 'THE CLOUD CITY / PLAYFUL INTERLUDE',
    headline: 'FOLLOW THE NEXT LITTLE ADVENTURE.',
    supportCopy:
      'Take an optional detour across the wind-swept platforms of Cloud City to gather three Compass Shards with Pip—or skip straight ahead to the final gate.',
    worldXStart: 4000,
    worldXEnd: 5000,
    skyTopHex: '#23244F',
    skyBottomHex: '#FFD06A',
    horizonGlowHex: '#FFF1D3',
    pipNarrativeNote: 'Floating stepping stones drift in the warm afternoon breeze—an optional browser interlude.',
  },
  {
    id: 'act-5',
    actNumber: 5,
    code: 'ACT 05',
    shortTitle: 'The Last Gate',
    title: 'THE LAST GATE / PRODUCT REVEAL',
    headline: 'THE ADVENTURE FITS IN YOUR HANDS.',
    supportCopy: 'A tribute to portable play, made for real cartridges and real moments.',
    worldXStart: 5000,
    worldXEnd: 6000,
    skyTopHex: '#23244F',
    skyBottomHex: '#FFD06A',
    horizonGlowHex: '#FFF1D3',
    pipNarrativeNote: 'The ancient stone sanctuary opens onto the real Analogue Pocket.',
  },
];

export interface CartridgeArtifact {
  id: string;
  name: string;
  systemBadge: string;
  worldLandmark: string;
  scrollUnlockMark: string;
  verifiedFact: string;
  detailDescription: string;
  accentColor: string;
  glyphPattern: number[][];
}

export const CARTRIDGE_ARTIFACTS: CartridgeArtifact[] = [
  {
    id: 'artifact-gb',
    name: 'Sunstone Relic',
    systemBadge: 'Game Boy & Game Boy Color',
    worldLandmark: 'Canopy Trail Marker (25% Traverse)',
    scrollUnlockMark: '01 · NATIVE SLOT',
    verifiedFact: 'Supports original Game Boy and Game Boy Color physical cartridges right out of the box.',
    detailDescription:
      'Slide your original monochrome or color cartridges directly into the built-in rear cartridge slot. No ROM dumps, no software emulation layers—just immediate hardware-level recognition of your physical collection.',
    accentColor: '#FFD06A',
    glyphPattern: [
      [0, 1, 1, 1, 1, 0],
      [1, 1, 0, 0, 1, 1],
      [1, 0, 1, 1, 0, 1],
      [1, 0, 1, 1, 0, 1],
      [1, 1, 0, 0, 1, 1],
      [0, 1, 1, 1, 1, 0],
    ],
  },
  {
    id: 'artifact-gba',
    name: 'Lagoon Prism Slate',
    systemBadge: 'Game Boy Advance',
    worldLandmark: 'Old Moss Bridge (55% Traverse)',
    scrollUnlockMark: '02 · 32-BIT PORTABLE',
    verifiedFact: 'Natively plays Game Boy Advance cartridges through the same multi-format cartridge bay.',
    detailDescription:
      'Across the Old Moss Bridge, 32-bit portable classics come to life with dedicated aspect-ratio framing and authentic hardware timing across the entire Game Boy Advance cartridge catalog.',
    accentColor: '#6DDCC5',
    glyphPattern: [
      [0, 0, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 0],
      [1, 1, 0, 0, 1, 1],
      [1, 1, 0, 0, 1, 1],
      [0, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 0, 0],
    ],
  },
  {
    id: 'artifact-adapters',
    name: 'Coral Wayfinder Crest',
    systemBadge: 'Optional Cartridge Adapters',
    worldLandmark: 'Lakeside Archway (80% Traverse)',
    scrollUnlockMark: '03 · EXPANDED SYSTEMS',
    verifiedFact:
      'Optional snap-in cartridge adapters expand support to Game Gear, Neo Geo Pocket Color, Atari Lynx, and TurboGrafx-16 / PC Engine.',
    detailDescription:
      'Engineered as a true multi-system tribute to portable history, Analogue Pocket transforms with optional physical cartridge adapters while preserving direct FPGA hardware execution.',
    accentColor: '#FF907A',
    glyphPattern: [
      [1, 0, 1, 1, 0, 1],
      [0, 1, 1, 1, 1, 0],
      [1, 1, 0, 0, 1, 1],
      [1, 1, 0, 0, 1, 1],
      [0, 1, 1, 1, 1, 0],
      [1, 0, 1, 1, 0, 1],
    ],
  },
];

export interface PrecisionFeatureMarker {
  id: 'dpad' | 'buttons' | 'fpga' | 'shell';
  code: string;
  label: string;
  subtitle: string;
  verifiedClaim: string;
  description: string;
  coordinates: { xPercent: number; yPercent: number };
}

export const PRECISION_MARKERS: PrecisionFeatureMarker[] = [
  {
    id: 'dpad',
    code: 'M-01',
    label: 'Tactile Directional Pad',
    subtitle: 'Pivot-balanced four-way input',
    verifiedClaim: 'Engineered physical D-pad designed for crisp diagonals and responsive directional control.',
    description:
      'Every step across a pixel world relies on muscle memory. The physical directional pad sits flush against the matte shell with a central pivot that prevents false inputs during rapid platforming.',
    coordinates: { xPercent: 26, yPercent: 64 },
  },
  {
    id: 'buttons',
    code: 'M-02',
    label: 'Action & System Controls',
    subtitle: 'Four face buttons + Analogue / Start / Select',
    verifiedClaim: 'Physical face buttons, shoulder triggers, and dedicated system controls—zero touchscreen gimmicks.',
    description:
      'Textured face buttons and sculpted shoulder buttons on the back casing provide unmistakable mechanical travel and immediate tactile rebound.',
    coordinates: { xPercent: 74, yPercent: 62 },
  },
  {
    id: 'fpga',
    code: 'M-03',
    label: 'Dual FPGA Architecture',
    subtitle: 'Altera Cyclone V + Cyclone 10',
    verifiedClaim: 'Uses FPGA-based hardware rather than software emulation for cycle-accurate cartridge execution.',
    description:
      'Instead of approximating classic consoles in software, Analogue Pocket configures Field Programmable Gate Arrays at the transistor logic level to operate directly with physical cartridges.',
    coordinates: { xPercent: 50, yPercent: 34 },
  },
  {
    id: 'shell',
    code: 'M-04',
    label: 'Sculpted Handheld Form',
    subtitle: 'Gorilla Glass lens & precision enclosure',
    verifiedClaim: 'Compact vertical handheld ergonomics built around a custom alkali-aluminosilicate glass display lens.',
    description:
      'Balanced weight distribution, recessed cartridge guides, USB-C charging, a 3.5mm headphone jack, and an original link cable port honor the heritage of portable hardware.',
    coordinates: { xPercent: 50, yPercent: 84 },
  },
];

/**
 * Clamp a number between min and max.
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/**
 * Convert normalized document scroll progress [0..1] to world X coordinate [0..WORLD_TOTAL_WIDTH].
 */
export function scrollProgressToWorldX(progress: number): number {
  const clamped = clamp(progress, 0, 1);
  return Math.round(clamped * WORLD_TOTAL_WIDTH);
}

/**
 * Determine which Act (0..5) is currently active given normalized scroll progress [0..1].
 */
export function getActiveActFromProgress(progress: number): ActDefinition {
  const worldX = scrollProgressToWorldX(progress);
  for (let i = ACTS.length - 1; i >= 0; i--) {
    if (worldX >= ACTS[i].worldXStart) {
      return ACTS[i];
    }
  }
  return ACTS[0];
}

/**
 * Parse a 6-digit hex color string into RGB [0..255].
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * Convert RGB [0..255] back to #RRGGBB hex string.
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Linearly interpolate between two hex colors.
 */
export function lerpHexColor(hexA: string, hexB: string, t: number): string {
  const ratio = clamp(t, 0, 1);
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  return rgbToHex(
    a.r + (b.r - a.r) * ratio,
    a.g + (b.g - a.g) * ratio,
    a.b + (b.b - a.b) * ratio
  );
}

/**
 * Compute continuous sky colors for any worldX position so there are never section seams.
 */
export function interpolateSkyPalette(worldX: number): {
  skyTop: string;
  skyBottom: string;
  horizonGlow: string;
} {
  const x = clamp(worldX, 0, WORLD_TOTAL_WIDTH);
  const rawIndex = x / 1000;
  const idxA = clamp(Math.floor(rawIndex), 0, ACTS.length - 1);
  const idxB = clamp(idxA + 1, 0, ACTS.length - 1);
  const localT = clamp(rawIndex - idxA, 0, 1);

  const actA = ACTS[idxA];
  const actB = ACTS[idxB];

  return {
    skyTop: lerpHexColor(actA.skyTopHex, actB.skyTopHex, localT),
    skyBottom: lerpHexColor(actA.skyBottomHex, actB.skyBottomHex, localT),
    horizonGlow: lerpHexColor(actA.horizonGlowHex, actB.horizonGlowHex, localT),
  };
}

/**
 * Compute walkable ground elevation offset (in logical pixels from baseline) at worldX.
 * Quantized to 4px steps for authentic pixel-art terrain contour.
 */
export function getTerrainHeightAtX(worldX: number): number {
  const x = clamp(worldX, 0, WORLD_TOTAL_WIDTH);

  // Act 0 (0..1000): Gentle sunrise valley slope leading to stone archway
  if (x < 1000) {
    const wave = Math.sin((x / 1000) * Math.PI) * 16;
    return Math.round(wave / 4) * 4;
  }
  // Act 1 (1000..2000): Forest path with arched wooden bridge between 1500..1800
  if (x < 2000) {
    const localX = x - 1000;
    if (localX >= 500 && localX <= 800) {
      const bridgeT = (localX - 500) / 300;
      const bridgeArch = Math.sin(bridgeT * Math.PI) * 28;
      return Math.round(bridgeArch / 4) * 4;
    }
    return Math.round((Math.sin(localX * 0.01) * 8) / 4) * 4;
  }
  // Act 2 (2000..3000): Low crystalline lakeshore boardwalk
  if (x < 3000) {
    return -8;
  }
  // Act 3 (3000..4000): Clockwork Ridge ascending mechanical lift & terraced cliff
  if (x < 4000) {
    const localX = x - 3000;
    const climb = Math.min(48, (localX / 800) * 48);
    return Math.round(climb / 4) * 4;
  }
  // Act 4 (4000..5000): Cloud City stepped floating islands
  if (x < 5000) {
    const localX = x - 4000;
    const step = Math.sin((localX / 1000) * Math.PI * 2) * 20 + 28;
    return Math.round(step / 4) * 4;
  }
  // Act 5 (5000..6000): Sanctuary chamber level stone terrace
  return 16;
}
]]>
    </file>
  </files>
</template>
