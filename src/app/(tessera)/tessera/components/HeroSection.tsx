'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  RotateCcw,
  RotateCw,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {
  HERO_COMPOSITIONS,
  HeroCompositionId,
  MaterialFinishId,
} from '../domain/tesseraSystem';
import {
  HERO_MATERIAL_MODES,
  HeroMaterialModeId,
  PresetRotationMap,
  RESONANCE_COLS,
  RESONANCE_ROWS,
  TileQuarterTurns,
  buildResonanceWallCatalog,
  createInitialPresetRotationMap,
  getTileQuarterTurns,
  quarterTurnsToDegrees,
  resetPresetRotations,
  rotateTileQuarterTurns,
  setTileQuarterTurnsInPreset,
} from '../domain/resonanceWall';
import { HeroCanvas3D } from './HeroCanvas3D';
import { ResilientImage, usePrefersReducedMotion } from './InteractivePrimitives';
import { playTactileClick } from '../utils/acousticAudio';

const HERO_FALLBACK_IMG = '/templates/tessera/atrium_installation_hero_1794380180899.jpg';

interface HeroSectionProps {
  scrollProgressRef: React.MutableRefObject<number>;
  onSyncMaterial?: (material: MaterialFinishId) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  scrollProgressRef,
  onSyncMaterial,
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const [composition, setComposition] = useState<HeroCompositionId>('wave');
  const [materialMode, setMaterialMode] = useState<HeroMaterialModeId>('ivory-plaster');
  const [exploded, setExploded] = useState<boolean>(false);
  const [modeDrawerOpen, setModeDrawerOpen] = useState<boolean>(false);
  const [hudHidden, setHudHidden] = useState<boolean>(false);

  // Per-preset user tile rotation overrides (never auto-reset on hover, scroll, preset switch, or material switch)
  const [presetRotations, setPresetRotations] = useState<PresetRotationMap>(() =>
    createInitialPresetRotationMap(),
  );
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>('');
  const [webglUnavailable, setWebglUnavailable] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);

  const catalog = useMemo(
    () => buildResonanceWallCatalog(RESONANCE_COLS, RESONANCE_ROWS),
    [],
  );

  const activePresetRotations = useMemo(
    () => presetRotations[composition] ?? {},
    [presetRotations, composition],
  );

  const editedCountInCurrentPreset = Object.keys(activePresetRotations).length;

  const selectedTileSpec = useMemo(
    () => (selectedTileId ? catalog.find((t) => t.id === selectedTileId) ?? null : null),
    [catalog, selectedTileId],
  );

  const selectedTileQuarterTurns: TileQuarterTurns = selectedTileId
    ? getTileQuarterTurns(presetRotations, composition, selectedTileId)
    : 0;
  const selectedTileDegrees = quarterTurnsToDegrees(selectedTileQuarterTurns);

  const activeCompositionIndex = HERO_COMPOSITIONS.findIndex((c) => c.id === composition);
  const activeCompositionSpec =
    HERO_COMPOSITIONS[activeCompositionIndex] ?? HERO_COMPOSITIONS[0];

  // Choreographed editorial typography & cue entrance
  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-rule-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: 'power3.out', delay: 0.1 },
      );

      gsap.fromTo(
        '.hero-headline-line',
        { yPercent: 108 },
        {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.25,
        },
      );

      gsap.fromTo(
        '.hero-editorial-fade',
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.45,
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Keyboard shortcuts: Escape closes inspector/drawer without resetting rotations; H toggles secondary mode controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'Escape') {
        if (selectedTileId !== null) {
          setSelectedTileId(null);
        } else if (modeDrawerOpen) {
          setModeDrawerOpen(false);
        }
        return;
      }

      if (e.key === 'h' || e.key === 'H') {
        setHudHidden((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedTileId, modeDrawerOpen]);

  const handleCommitTileRotation = useCallback(
    (tileId: string, nextTurns: TileQuarterTurns) => {
      setPresetRotations((prev) =>
        setTileQuarterTurnsInPreset(prev, composition, tileId, nextTurns),
      );
      const spec = catalog.find((t) => t.id === tileId);
      const deg = quarterTurnsToDegrees(nextTurns);
      if (spec) {
        setLiveAnnouncement(
          `Module ${spec.displayCode} (${spec.familyLabel}) rotated to ${deg} degrees.`,
        );
      }
    },
    [catalog, composition],
  );

  const handleStepSelectedTileRotation = (delta: 1 | -1) => {
    if (!selectedTileId) return;
    playTactileClick(delta > 0 ? 320 : 260);
    const current = getTileQuarterTurns(presetRotations, composition, selectedTileId);
    const next = rotateTileQuarterTurns(current, delta);
    handleCommitTileRotation(selectedTileId, next);
  };

  const handleResetSelectedTile = () => {
    if (!selectedTileId) return;
    playTactileClick(210);
    handleCommitTileRotation(selectedTileId, 0);
  };

  const handleResetCurrentWallPreset = () => {
    playTactileClick(190);
    setPresetRotations((prev) => resetPresetRotations(prev, composition));
    setLiveAnnouncement(
      `Reset all module rotations for ${activeCompositionSpec.label} to original continuous relief.`,
    );
  };

  const handleSelectNeighborModule = (step: 1 | -1) => {
    playTactileClick(240);
    if (!selectedTileId) {
      setSelectedTileId(catalog[27]?.id ?? catalog[0].id);
      return;
    }
    const idx = catalog.findIndex((t) => t.id === selectedTileId);
    const nextIdx = (idx + step + catalog.length) % catalog.length;
    setSelectedTileId(catalog[nextIdx].id);
  };

  const handleSelectMaterialMode = (modeId: HeroMaterialModeId) => {
    playTactileClick(270);
    setMaterialMode(modeId);
    const modeSpec = HERO_MATERIAL_MODES.find((m) => m.id === modeId);
    if (modeSpec) {
      onSyncMaterial?.(modeSpec.linkedConfiguratorMaterial);
      setLiveAnnouncement(`Sculpture surface changed to ${modeSpec.shortLabel}.`);
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      data-composition={composition}
      data-material-mode={materialMode}
      data-selected-tile={selectedTileId ?? ''}
      data-edited-count={editedCountInCurrentPreset}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#131311] flex flex-col justify-between pt-20 pb-28 sm:pb-24 select-none"
    >
      {/* Screen-Reader Live Region for Tile Rotations & Mode Shifts */}
      <div className="sr-only" role="status" aria-live="polite">
        {liveAnnouncement}
      </div>

      {/* Architectural Gallery Chamber Environment (Layered Dark Micro-Concrete Walls, Plaster Texture, Spotlight Bloom, Shadow Pooling & Polished Stone Floor) */}
      <div
        aria-hidden="true"
        data-testid="hero-gallery-environment"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Base Layered Gallery Wall Planes (Warm grazing gallery light from upper-left across dark Venetian plaster & micro-concrete) */}
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#211F1B_0%,#191815_34%,#141412_68%,#0F100E_100%)]" />

        {/* Upper-Left Grazing Museum Wall-Washer Light Cone */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_48%_at_26%_18%,rgba(230,202,162,0.13)_0%,rgba(168,140,104,0.05)_48%,transparent_80%)]" />

        {/* Restrained Warm Spotlight Bloom Behind the 3D Acoustic Wall */}
        <div
          data-testid="hero-spotlight-bloom"
          className="absolute inset-0 bg-[radial-gradient(ellipse_44%_50%_at_67%_43%,rgba(244,210,160,0.26)_0%,rgba(202,164,114,0.12)_42%,rgba(128,100,68,0.04)_68%,transparent_86%)]"
        />

        {/* Layered Architectural Wall Planes: Recessed Left Wall Bay, Stepped Pilaster & Vertical Shadow-Gap Reveals */}
        <div className="absolute inset-y-0 left-0 w-[37.5%] bg-gradient-to-r from-[#131311]/75 via-[#1A1916]/35 to-[#24211C]/20 border-r border-[#D8CFC2]/[0.06]" />
        {/* Deep Architectural Shadow-Gap Reveal Channel at Pilaster Step (x = 37.5%) */}
        <div className="absolute inset-y-0 left-[37.5%] w-4 bg-gradient-to-r from-[#070706]/80 via-[#0B0B09]/40 to-transparent" />
        {/* Secondary Architectural Formwork Joint Line (x = 18%) */}
        <div className="absolute inset-y-0 left-[18%] w-[1px] bg-gradient-to-b from-transparent via-[#090908]/55 to-transparent" />
        {/* Upper Board-Formed Micro-Concrete Datum Joint */}
        <div className="absolute inset-x-0 top-[21%] h-[1px] bg-gradient-to-r from-[#090908]/45 via-[#D8CFC2]/[0.04] to-[#090908]/55" />

        {/* Procedural Tactile Venetian Plaster & Micro-Concrete Grain Texture */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.17] mix-blend-overlay">
          <filter id="hero-gallery-plaster-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              seed="14"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 0.96 0 0 0  0 0 0.9 0 0  0 0 0 0.55 0"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-gallery-plaster-grain)" />
        </svg>

        {/* Dark Polished Concrete / Honed Basalt Gallery Floor Horizon (Aligned with 3D Wall Plinth Base) */}
        <div
          data-testid="hero-gallery-floor"
          className="absolute inset-x-0 bottom-0 h-[18%] bg-[linear-gradient(180deg,transparent_0%,#121210_18%,#171614_48%,#0E0F0D_100%)]"
        >
          {/* Realistic Shadow Pooling at the Base Plinth of the Gallery Wall & Acoustic Installation */}
          <div className="absolute inset-x-0 top-1 h-8 bg-gradient-to-b from-[#060605]/85 via-[#090908]/55 to-transparent" />
          <div className="absolute right-[6%] top-0 w-[64%] h-14 bg-[radial-gradient(ellipse_60%_70%_at_52%_15%,rgba(4,4,3,0.9)_0%,rgba(8,8,7,0.55)_55%,transparent_100%)]" />

          {/* Gentle Blurred Reflections of the Illuminated Acoustic Wall & S-Curve on the Polished Dark Floor */}
          <div className="absolute right-[4%] top-1 w-[66%] h-full bg-[radial-gradient(ellipse_54%_70%_at_54%_24%,rgba(236,214,182,0.22)_0%,rgba(196,168,132,0.11)_45%,rgba(128,108,84,0.04)_72%,transparent_92%)] blur-md" />
          {/* Secondary Left Gallery Floor Specular Sheen */}
          <div className="absolute left-[8%] top-2 w-[38%] h-[75%] bg-[radial-gradient(ellipse_55%_60%_at_45%_35%,rgba(212,190,158,0.07)_0%,transparent_75%)] blur-sm" />
        </div>
      </div>

      {/* Live Procedural Three.js Resonance Wall OR Non-WebGL Architectural Fallback */}
      {!webglUnavailable ? (
        <HeroCanvas3D
          composition={composition}
          materialMode={materialMode}
          exploded={exploded}
          reducedMotion={reducedMotion}
          tileRotations={activePresetRotations}
          selectedTileId={selectedTileId}
          scrollProgressRef={scrollProgressRef}
          onSelectTile={setSelectedTileId}
          onCommitTileRotation={handleCommitTileRotation}
          onWebGLUnavailable={() => setWebglUnavailable(true)}
        />
      ) : (
        <div
          data-testid="hero-webgl-fallback"
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          <ResilientImage
            src={HERO_FALLBACK_IMG}
            alt="Sculptural Tessera Resonance Wall acoustic relief installation in warm mineral plaster, charcoal felt, and pale oak"
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121311] via-[#121311]/80 to-transparent" />
        </div>
      )}

      {/* Slight Atmospheric Gallery Haze & Grazing Light Mist for Interior Depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(122deg,rgba(236,208,168,0.05)_0%,rgba(182,152,112,0.025)_42%,transparent_72%)]"
      />
      {/* Soft Architectural Gallery Perimeter Vignette Falloff */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_150px_rgba(5,5,4,0.82)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#090908]/75 via-[#0E0F0D]/28 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0A0B09]/78 via-[#10110F]/22 to-transparent"
      />

      {/* Left Editorial Column (Matches 01_APPROVED_RESONANCE_WALL_HERO.png) */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-10 my-auto pt-4 pb-8 pointer-events-none">
        <div className="max-w-[500px] pointer-events-auto select-text">
          {/* Small Uppercase Project Descriptor */}
          <div className="hero-editorial-fade flex flex-wrap items-center gap-2 text-[11px] font-mono-tabular tracking-[0.18em] uppercase text-[#AFA9A0] mb-5">
            <span>Resonance Wall Prototype</span>
            <span aria-hidden="true" className="text-[#A78960]">
              ·
            </span>
            <span>Architectural Acoustic Relief</span>
          </div>

          {/* Immense High-Contrast Serif Display Headline */}
          <h1 className="font-display text-[clamp(3rem,5.4vw,5.25rem)] font-normal leading-[0.98] tracking-[-0.015em] text-[#EFEAE0] mb-6">
            <span className="line-mask block pb-1">
              <span className="hero-headline-line block">See the shape</span>
            </span>
            <span className="line-mask block pb-1">
              <span className="hero-headline-line block">of silence.</span>
            </span>
          </h1>

          {/* Restrained Supporting Copy */}
          <p className="hero-editorial-fade text-[15px] sm:text-base leading-[1.68] text-[#AFA9A0] max-w-[40ch] mb-8">
            A modular acoustic surface system engineered as sculptural
            architecture—layering absorption, depth, and rhythm into one
            configurable wall.
          </p>

          {/* Primary CTA & Secondary Text Action */}
          <div className="hero-editorial-fade flex flex-wrap items-center gap-5">
            <a
              href="#configurator"
              onClick={() => playTactileClick(250)}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-[4px] bg-[#23201B]/95 border border-[#A78960]/55 text-xs sm:text-[13px] font-medium tracking-[0.04em] text-[#EFEAE0] hover:border-[#E4DBCC] hover:bg-[#2C2822] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78960]"
            >
              <span>Launch Configurator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C8B9A5]" />
            </a>

            <button
              type="button"
              data-testid="hero-modes-trigger"
              onClick={() => {
                playTactileClick(260);
                setHudHidden(false);
                setModeDrawerOpen((prev) => !prev);
              }}
              aria-expanded={modeDrawerOpen}
              aria-controls="hero-sculpture-mode-drawer"
              className="inline-flex items-center gap-2 py-2 text-xs sm:text-[13px] font-medium tracking-[0.04em] text-[#CBC5BB] hover:text-[#EFEAE0] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78960] rounded-sm"
            >
              <span>View Acoustic Modes</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A78960]" />
            </button>
          </div>

          {/* Interactive Module Hint + Keyboard Module Selector Trigger */}
          <div className="hero-editorial-fade mt-8 pt-4 border-t border-[#EFEAE0]/10 flex flex-wrap items-center justify-between gap-3 max-w-[430px]">
            <span className="hero-rule-line origin-left text-[11px] font-mono-tabular tracking-[0.12em] uppercase text-[#AFA9A0]">
              Click or drag any 3D module to rotate 90°
            </span>

            <button
              type="button"
              data-testid="hero-inspect-toggle"
              onClick={() => {
                playTactileClick(240);
                if (!selectedTileId) {
                  // Default to a central S-curve ribbon module (row 2, col 5 -> 03·06)
                  setSelectedTileId('r02-c05');
                } else {
                  setSelectedTileId(null);
                }
              }}
              className="text-[11px] font-mono-tabular tracking-[0.1em] uppercase text-[#C8B9A5] hover:text-[#EFEAE0] underline underline-offset-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78960] rounded-sm"
            >
              {selectedTileId ? 'Close Module Inspector' : 'Inspect Module'}
            </button>
          </div>
        </div>
      </div>

      {/* Lower-Left Minimal Scroll Indicator & Preset Counter (01 / 04) */}
      <div className="pointer-events-none absolute bottom-6 left-5 sm:left-10 z-20 hidden sm:flex items-end gap-5 text-[#AFA9A0]">
        <div className="flex flex-col items-center gap-1.5">
          <span className="w-[1px] h-9 bg-gradient-to-b from-transparent via-[#AFA9A0]/50 to-[#EFEAE0]" />
          <span className="text-[10px] leading-none text-[#EFEAE0]">↓</span>
        </div>
        <div className="font-mono-tabular text-xs tracking-[0.16em] text-[#AFA9A0] pb-0.5">
          <span className="text-[#EFEAE0]">
            {String(activeCompositionIndex + 1).padStart(2, '0')}
          </span>{' '}
          / 04
        </div>
      </div>

      {/* Selected Tile Floating Inspector (Appears when any 3D module is clicked/selected) */}
      {selectedTileSpec && (
        <div
          role="region"
          aria-label="Selected Acoustic Module Inspector"
          data-testid="hero-tile-inspector"
          className="absolute bottom-28 sm:bottom-24 left-5 sm:left-10 z-30 w-[min(420px,92vw)] bg-[#171815]/95 border border-[#A78960]/55 rounded-md p-3.5 shadow-2xl pointer-events-auto select-text"
        >
          <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-[#EFEAE0]/10">
            <div className="flex items-center gap-2 min-w-0">
              <span
                data-testid="inspector-tile-id"
                className="font-mono-tabular text-xs font-semibold tracking-[0.14em] uppercase text-[#EFEAE0] whitespace-nowrap"
              >
                MODULE {selectedTileSpec.displayCode}
              </span>
              <span aria-hidden="true" className="text-[#A78960]">
                ·
              </span>
              <span
                data-testid="inspector-tile-family"
                className="text-xs text-[#AFA9A0] truncate"
              >
                {selectedTileSpec.familyLabel}
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                aria-label="Select previous module"
                data-testid="inspector-prev-tile"
                onClick={() => handleSelectNeighborModule(-1)}
                className="p-1 rounded text-[#AFA9A0] hover:text-[#EFEAE0] hover:bg-[#252420] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A78960]"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                aria-label="Select next module"
                data-testid="inspector-next-tile"
                onClick={() => handleSelectNeighborModule(1)}
                className="p-1 rounded text-[#AFA9A0] hover:text-[#EFEAE0] hover:bg-[#252420] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A78960]"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                aria-label="Close module inspector"
                data-testid="inspector-close"
                onClick={() => setSelectedTileId(null)}
                className="p-1 rounded text-[#AFA9A0] hover:text-[#EFEAE0] hover:bg-[#252420] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A78960]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="text-xs font-mono-tabular text-[#AFA9A0]">
              Orientation:{' '}
              <strong
                data-testid="inspector-tile-angle"
                className="text-[#EFEAE0] font-semibold"
              >
                {selectedTileDegrees}°
              </strong>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                data-testid="inspector-rotate-left"
                onClick={() => handleStepSelectedTileRotation(-1)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#23221E] border border-[#EFEAE0]/12 hover:border-[#A78960] text-[11px] font-mono-tabular text-[#EFEAE0] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A78960]"
              >
                <RotateCcw className="w-3 h-3 text-[#C8B9A5]" />
                <span>Rotate Left</span>
              </button>

              <button
                type="button"
                data-testid="inspector-rotate-right"
                onClick={() => handleStepSelectedTileRotation(1)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#23221E] border border-[#EFEAE0]/12 hover:border-[#A78960] text-[11px] font-mono-tabular text-[#EFEAE0] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A78960]"
              >
                <span>Rotate Right</span>
                <RotateCw className="w-3 h-3 text-[#C8B9A5]" />
              </button>

              <button
                type="button"
                data-testid="inspector-reset-tile"
                disabled={selectedTileDegrees === 0}
                onClick={handleResetSelectedTile}
                className="px-2 py-1 rounded bg-[#1B1B18] border border-[#EFEAE0]/10 hover:border-[#A78960] disabled:opacity-40 disabled:pointer-events-none text-[11px] font-mono-tabular text-[#AFA9A0] hover:text-[#EFEAE0] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A78960]"
              >
                Reset Tile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lower-Right Restrained MATERIAL / MODE Control Surface + Expandable Secondary Preset Drawer */}
      <div
        className="absolute bottom-5 right-5 sm:right-10 z-30 flex flex-col items-end gap-2 max-w-[92vw] pointer-events-auto"
        role="region"
        aria-label="Material and Sculpture Mode Controls"
      >
        {/* Expandable Secondary Sculpture Mode Drawer (Preserves Harmonic Wave, Cathedral Vault, Radial Aperture, Tectonic Grid, Explode Assembly, Reset Wall, Hide Controls) */}
        {modeDrawerOpen && !hudHidden && (
          <div
            id="hero-sculpture-mode-drawer"
            data-testid="hero-mode-drawer"
            className="w-full sm:w-[540px] bg-[#171815]/96 border border-[#EFEAE0]/15 rounded-md p-3.5 shadow-2xl space-y-3"
          >
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#EFEAE0]/10">
              <span className="text-[10px] font-mono-tabular tracking-[0.18em] uppercase text-[#AFA9A0]">
                SCULPTURE PRESETS · {activeCompositionSpec.nrcRating}
              </span>
              <div className="flex items-center gap-2">
                {editedCountInCurrentPreset > 0 && (
                  <button
                    type="button"
                    data-testid="drawer-reset-wall"
                    onClick={handleResetCurrentWallPreset}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#26231E] border border-[#A78960]/50 text-[10px] font-mono-tabular text-[#EFEAE0] hover:border-[#EFEAE0] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-2.5 h-2.5 text-[#C8B9A5]" />
                    <span>Reset Wall ({editedCountInCurrentPreset})</span>
                  </button>
                )}
                <button
                  type="button"
                  data-testid="drawer-hide-controls"
                  onClick={() => setHudHidden(true)}
                  className="text-[10px] font-mono-tabular text-[#AFA9A0] hover:text-[#EFEAE0] cursor-pointer"
                >
                  Hide Controls (H)
                </button>
              </div>
            </div>

            {/* 4 Presets Segmented Control */}
            <div
              role="group"
              aria-label="Acoustic Wall Compositions"
              className="grid grid-cols-2 sm:grid-cols-4 gap-1.5"
            >
              {HERO_COMPOSITIONS.map((item) => {
                const active = composition === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-testid={`preset-${item.id}`}
                    aria-pressed={active}
                    onClick={() => {
                      playTactileClick(260);
                      setComposition(item.id);
                    }}
                    className={`px-2.5 py-1.5 text-[11px] font-medium rounded border transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A78960] ${
                      active
                        ? 'bg-[#A78960] border-[#A78960] text-[#121311] font-semibold'
                        : 'bg-[#1E1F1B] border-[#EFEAE0]/10 text-[#CBC5BB] hover:text-[#EFEAE0] hover:border-[#EFEAE0]/25'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Summary + Explode Assembly */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <span className="text-[11px] text-[#AFA9A0] truncate max-w-[260px]">
                {activeCompositionSpec.summary}
              </span>

              <button
                type="button"
                data-testid="hero-explode-toggle"
                aria-pressed={exploded}
                onClick={() => {
                  playTactileClick(310);
                  setExploded((prev) => !prev);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono-tabular rounded border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A78960] ${
                  exploded
                    ? 'bg-[#2C2720] border-[#A78960] text-[#EFEAE0]'
                    : 'bg-[#1E1F1B] border-[#EFEAE0]/12 text-[#CBC5BB] hover:border-[#EFEAE0]/30'
                }`}
              >
                <Layers className="w-3 h-3 text-[#C8B9A5]" />
                <span>{exploded ? 'Assemble Layers' : 'Explode Assembly'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Primary Compact MATERIAL / MODE Card (Matches 01_APPROVED_RESONANCE_WALL_HERO.png) */}
        {hudHidden ? (
          <button
            type="button"
            data-testid="hero-show-controls"
            onClick={() => setHudHidden(false)}
            className="px-3.5 py-2 rounded-md bg-[#171815]/95 border border-[#EFEAE0]/15 text-[11px] font-mono-tabular tracking-[0.14em] uppercase text-[#AFA9A0] hover:text-[#EFEAE0] transition-colors cursor-pointer"
          >
            Show Controls (H)
          </button>
        ) : (
          <div className="bg-[#171815]/95 border border-[#EFEAE0]/12 rounded-md px-4 sm:px-5 py-3 shadow-2xl">
            <div className="flex items-center justify-between gap-6 mb-2">
              <span className="text-[10px] font-mono-tabular tracking-[0.18em] uppercase text-[#AFA9A0]">
                MATERIAL / MODE
              </span>

              <div className="flex items-center gap-3">
                {editedCountInCurrentPreset > 0 && !modeDrawerOpen && (
                  <button
                    type="button"
                    data-testid="hud-reset-wall"
                    onClick={handleResetCurrentWallPreset}
                    className="text-[10px] font-mono-tabular tracking-[0.12em] uppercase text-[#C8B9A5] hover:text-[#EFEAE0] cursor-pointer"
                  >
                    Reset Wall ({editedCountInCurrentPreset})
                  </button>
                )}

                <button
                  type="button"
                  data-testid="hud-preset-drawer-toggle"
                  onClick={() => {
                    playTactileClick(240);
                    setModeDrawerOpen((prev) => !prev);
                  }}
                  aria-expanded={modeDrawerOpen}
                  aria-controls="hero-sculpture-mode-drawer"
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono-tabular tracking-[0.14em] uppercase text-[#CBC5BB] hover:text-[#EFEAE0] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A78960] rounded-sm"
                >
                  <SlidersHorizontal className="w-3 h-3 text-[#A78960]" />
                  <span>{activeCompositionSpec.label}</span>
                </button>
              </div>
            </div>

            {/* Three Material Mode Tabs: 01 IVORY PLASTER | 02 CHARCOAL FELT | 03 PALE OAK */}
            <div
              role="group"
              aria-label="Sculpture Material Mode"
              className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6"
            >
              {HERO_MATERIAL_MODES.map((mode) => {
                const isActive = materialMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    data-testid={`material-mode-${mode.id}`}
                    aria-pressed={isActive}
                    onClick={() => handleSelectMaterialMode(mode.id)}
                    className={`relative pb-1 text-[11px] font-mono-tabular tracking-[0.14em] uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A78960] ${
                      isActive
                        ? 'text-[#EFEAE0] font-medium'
                        : 'text-[#8E8980] hover:text-[#CBC5BB]'
                    }`}
                  >
                    {mode.label}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 right-0 bottom-0 h-[1.5px] bg-[#A78960] transition-transform duration-200 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
