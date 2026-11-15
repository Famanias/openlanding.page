'use client';

import React, { useMemo, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { useFold } from '../fold/FoldProvider';
import { FoldStage } from '../fold/FoldStage';
import { HeroStudioDock } from '../fold/HeroStudioDock';
import { RoomScene2D5 } from '../fold/room/RoomScene2D5';
import { deriveRoomScene } from '../fold/room/deriveRoomScene';
import { useHarmonizedRoomVars } from '../fold/room/paletteCssVars';
import type { RoomLightingState } from '../fold/FoldScene';
import { useHeroMotion } from '../motion/useHeroMotion';

/** A word whose letters hinge up from the baseline crease (see useHeroMotion). */
const HingeWord: React.FC<{ text: string; stretch?: boolean }> = ({ text, stretch = false }) => (
  <span className="srf-hm-wordbox" data-hm-stretch={stretch ? '' : undefined}>
    {Array.from(text).map((ch, i) => (
      <span key={i} data-hm="char" className="srf-hm-char">
        {ch}
      </span>
    ))}
  </span>
);

export const Hero: React.FC = () => {
  const { demoActive, design, view, effectiveOpening, uploadedArt, env, replayFoldSequence } =
    useFold();
  const [heroAnnouncement, setHeroAnnouncement] = useState('');
  const [fullBleedHostEl, setFullBleedHostEl] = useState<HTMLDivElement | null>(null);
  const shapeInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const roomRecipe = useMemo(
    () =>
      deriveRoomScene({
        design: {
          ...design,
          opening: effectiveOpening,
        },
        view,
        hasUpload: Boolean(uploadedArt),
      }),
    [design, effectiveOpening, view, uploadedArt],
  );

  const isDarkRoom = roomRecipe.palette.isDarkEnvelope;

  useHarmonizedRoomVars(sectionRef, roomRecipe.palette, env.reducedMotion);
  useHeroMotion(sectionRef, { roomCode: roomRecipe.code, demoActive });

  const roomLighting = useMemo<RoomLightingState>(
    () => ({
      lightTint: roomRecipe.palette.lightTint,
      ambientTint: roomRecipe.palette.ambientTint,
      shadowTint: roomRecipe.palette.shadowTint,
      floorBase: roomRecipe.palette.floorBase,
      isDarkEnvelope: roomRecipe.palette.isDarkEnvelope,
    }),
    [
      roomRecipe.palette.lightTint,
      roomRecipe.palette.ambientTint,
      roomRecipe.palette.shadowTint,
      roomRecipe.palette.floorBase,
      roomRecipe.palette.isDarkEnvelope,
    ],
  );

  const handleDesignInHero = () => {
    shapeInputRef.current?.focus();
  };

  const handleSeeHowItFolds = () => {
    if (env.reducedMotion) {
      const target = document.getElementById('fold');
      target?.scrollIntoView({ behavior: 'auto', block: 'start' });
      setHeroAnnouncement('Jumped to The fold section.');
      return;
    }
    replayFoldSequence();
    setHeroAnnouncement(
      'Demonstrating mechanical folding across all sixteen connected panels.',
    );
  };

  const handleSectionPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (env.reducedMotion || env.isCoarsePointer || e.pointerType !== 'mouse') return;
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    el.style.setProperty('--room-pointer-x', nx.toFixed(3));
  };

  const handleSectionPointerLeave = () => {
    sectionRef.current?.style.setProperty('--room-pointer-x', '0');
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      data-testid="hero-section"
      data-hero-motion="pending"
      data-dark-envelope={isDarkRoom ? 'true' : 'false'}
      onPointerMove={handleSectionPointerMove}
      onPointerLeave={handleSectionPointerLeave}
      className="srf-hero-section relative min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-5rem)] flex flex-col justify-between pt-3 pb-4 lg:pt-4 lg:pb-5 border-b border-[var(--srf-hairline)] overflow-x-clip"
    >
      {/* Dynamic coded 2.5D architectural living-room studio driven by the divider */}
      <RoomScene2D5 />

      {/* Full-bleed WebGL & 2D Still layer spanning 100% of the Hero independently of editorial containers */}
      <div
        ref={setFullBleedHostEl}
        data-testid="hero-fullbleed-scene-layer"
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      />

      <div className="srf-container relative z-10 pointer-events-none flex-1 flex flex-col justify-between">
        {/* Main Atelier Composition: Editorial Column (~33%) + Large Frameless 3D Centerpiece (~67%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center flex-1 my-auto">
          {/* Top/Left: Editorial Headline, Copy, Primary & Secondary CTAs */}
          <div className="lg:col-span-4 min-w-0 flex flex-col justify-center pointer-events-auto">
            <div data-hm="eyebrow" className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-2">
              <p
                className="srf-mono-caption tracking-[0.06em]"
                style={{ color: 'var(--room-text-secondary)' }}
              >
                SERRAFORM / FOLD 16
              </p>
              <span
                aria-hidden="true"
                className="srf-mono-caption opacity-50"
                style={{ color: 'var(--room-text-secondary)' }}
              >
                ·
              </span>
              <p
                data-testid="hero-room-mood"
                className="srf-mono-caption uppercase tracking-[0.05em] font-medium overflow-hidden"
                style={{ color: 'var(--room-text-primary)' }}
              >
                <span data-hm-mood className="block">
                  {roomRecipe.code} / {roomRecipe.name}
                </span>
              </p>
            </div>
            <span data-hm="rule" aria-hidden="true" className="srf-hm-rule mb-3" />

            <h1
              aria-label="Make room for your imagination."
              className="srf-h1-studio mb-3.5"
              style={{ color: 'var(--room-text-primary)' }}
            >
              <span aria-hidden="true" className="block whitespace-nowrap">
                <HingeWord text="Make" /> <HingeWord text="room" stretch />
              </span>
              <span aria-hidden="true" className="block">
                <HingeWord text="for" /> <HingeWord text="your" />{' '}
                <HingeWord text="imagination." />
              </span>
            </h1>

            <p
              data-hm="lead"
              className="text-[15px] leading-6 sm:text-[17px] sm:leading-[26px] max-w-[40ch] mb-4"
              style={{ color: 'var(--room-text-secondary)' }}
            >
              Shape the fold, choose your colors, and make a divider that feels
              at home in your space.
            </p>


            {/* Primary CTA + Secondary mechanical fold demo CTA */}
            <div className="hidden lg:flex flex-wrap items-center gap-3 mb-4">
              <span data-hm="cta" className="inline-flex">
                <button
                  type="button"
                  onClick={handleDesignInHero}
                  className="srf-btn-primary"
                >
                  <span>Design your divider</span>
                  <ArrowRight className="w-4 h-4 srf-btn-arrow" aria-hidden="true" />
                </button>
              </span>

              <span data-hm="cta" className="inline-flex">
                <button
                  type="button"
                  aria-pressed={demoActive}
                  onClick={handleSeeHowItFolds}
                  className={`srf-btn-secondary !min-h-[48px] ${
                    isDarkRoom
                      ? '!text-[#F8F2EE] !border-[#F8F2EE]/35 hover:!border-[#F8F2EE] hover:!bg-white/10'
                      : ''
                  }`}
                >
                  <Play data-hm-play className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true" />
                  <span>{demoActive ? 'Unfolding divider…' : 'See how it folds'}</span>
                </button>
              </span>
            </div>

          </div>

          {/* Center-Right: Large, Unboxed 3D Fold 16 Centerpiece integrated in living room */}
          <div className="lg:col-span-8 min-w-0">
            <div className="h-[340px] sm:h-[440px] lg:h-[min(680px,calc(100svh-200px))] lg:min-h-[480px] w-full">
              <FoldStage
                hostId="hero"
                variant="atelier"
                darkSurface={isDarkRoom}
                roomLighting={roomLighting}
                showStoryBadge={false}
                showSpanBracket={true}
                canvasPortalEl={fullBleedHostEl}
                useFullBleedPortal={true}
              />
            </div>
          </div>

          {/* Mobile/Tablet CTA row placed directly beneath the dedicated model stage */}
          <div className="lg:hidden flex flex-wrap items-center gap-2.5 pt-1 pointer-events-auto">
            <span data-hm="cta" className="flex flex-1 sm:flex-initial">
              <button
                type="button"
                onClick={handleDesignInHero}
                className="srf-btn-primary w-full"
              >
                <span>Design your divider</span>
                <ArrowRight className="w-4 h-4 srf-btn-arrow" aria-hidden="true" />
              </button>
            </span>

            <span data-hm="cta" className="inline-flex">
              <button
                type="button"
                aria-pressed={demoActive}
                onClick={handleSeeHowItFolds}
                className={`srf-btn-secondary !min-h-[48px] ${
                  isDarkRoom
                    ? '!text-[#F8F2EE] !border-[#F8F2EE]/35 hover:!border-[#F8F2EE] hover:!bg-white/10'
                    : ''
                }`}
              >
                <Play data-hm-play className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true" />
                <span>{demoActive ? 'Unfolding…' : 'See how it folds'}</span>
              </button>
            </span>
          </div>
        </div>

        {/* Floating Atelier Studio Control Dock */}
        <div className="mt-auto pt-3 lg:pt-3 pointer-events-auto">
          <HeroStudioDock
            shapeInputRef={shapeInputRef}
          />
        </div>
      </div>

      <div className="sr-only" aria-live="polite">
        {heroAnnouncement}
      </div>
    </section>
  );
};

