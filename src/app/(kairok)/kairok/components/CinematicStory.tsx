'use client';
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
