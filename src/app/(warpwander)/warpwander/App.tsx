'use client';
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
