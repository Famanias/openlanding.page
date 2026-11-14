'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { AdvancedStudioDrawer } from '../fold/AdvancedStudioDrawer';
import { useFold } from '../fold/FoldProvider';
import { FoldStage } from '../fold/FoldStage';
import { AdvancedDrawerSection, HeroStudioDock } from '../fold/HeroStudioDock';
import { RoomScene2D5 } from '../fold/room/RoomScene2D5';
import { deriveRoomScene } from '../fold/room/deriveRoomScene';
import { useHarmonizedRoomVars } from '../fold/room/paletteCssVars';
import type { RoomLightingState } from '../fold/FoldScene';

export const Hero: React.FC = () => {
  const { demoActive, design, view, effectiveOpening, uploadedArt, env, replayFoldSequence } =
    useFold();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSection, setDrawerSection] = useState<AdvancedDrawerSection>('all');
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

  const openDrawer = useCallback((section: AdvancedDrawerSection = 'all') => {
    setDrawerSection(section);
    setDrawerOpen(true);
  }, []);

  const handleDesignInHero = () => {
    openDrawer('all');
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
      data-dark-envelope={isDarkRoom ? 'true' : 'false'}
      onPointerMove={handleSectionPointerMove}
      onPointerLeave={handleSectionPointerLeave}
      className="srf-hero-section relative pt-3 pb-6 lg:pt-4 lg:pb-6 border-b border-[var(--srf-hairline)] overflow-x-clip"
    >
      {/* Dynamic coded 2.5D architectural living-room studio driven by the divider */}
      <RoomScene2D5 />

      {/* Full-bleed WebGL & 2D Still layer spanning 100% of the Hero independently of editorial containers */}
      <div
        ref={setFullBleedHostEl}
        data-testid="hero-fullbleed-scene-layer"
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      />

      <div className="srf-container relative z-10 pointer-events-none">
        {/* Main Atelier Composition: Editorial Column (~33%) + Large Frameless 3D Centerpiece (~67%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
          {/* Top/Left: Editorial Headline, Copy, Primary & Secondary CTAs */}
          <div className="lg:col-span-4 min-w-0 flex flex-col justify-center pointer-events-auto">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-2">
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
                className="srf-mono-caption uppercase tracking-[0.05em] font-medium"
                style={{ color: 'var(--room-text-primary)' }}
              >
                {roomRecipe.code} / {roomRecipe.name}
              </p>
            </div>

            <h1
              className="srf-h1-studio mb-3.5 text-balance"
              style={{ color: 'var(--room-text-primary)' }}
            >
              <span className="block overflow-hidden">
                <span className="block srf-hero-line-1">Make room</span>
              </span>
              <span className="block overflow-hidden">
                <span className="block srf-hero-line-2">for your imagination.</span>
              </span>
            </h1>

            <p
              className="srf-hero-lead text-[15px] leading-6 sm:text-[17px] sm:leading-[26px] max-w-[40ch] mb-4"
              style={{ color: 'var(--room-text-secondary)' }}
            >
              Shape the fold, choose your colors, and make a divider that feels
              at home in your space.
            </p>


            {/* Primary CTA + Secondary mechanical fold demo CTA */}
            <div className="srf-hero-actions hidden lg:flex flex-wrap items-center gap-3 mb-4">
              <button
                type="button"
                onClick={handleDesignInHero}
                className="srf-btn-primary"
              >
                <span>Design your divider</span>
                <ArrowRight className="w-4 h-4 srf-btn-arrow" aria-hidden="true" />
              </button>

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
                <Play className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true" />
                <span>{demoActive ? 'Unfolding divider…' : 'See how it folds'}</span>
              </button>
            </div>

          </div>

          {/* Center-Right: Large, Unboxed 3D Fold 16 Centerpiece integrated in living room */}
          <div className="lg:col-span-8 min-w-0">
            <div className="h-[340px] sm:h-[440px] lg:h-[min(610px,calc(100svh-236px))] lg:min-h-[480px] w-full">
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
            <button
              type="button"
              onClick={handleDesignInHero}
              className="srf-btn-primary flex-1 sm:flex-initial"
            >
              <span>Design your divider</span>
              <ArrowRight className="w-4 h-4 srf-btn-arrow" aria-hidden="true" />
            </button>

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
              <Play className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true" />
              <span>{demoActive ? 'Unfolding…' : 'See how it folds'}</span>
            </button>
          </div>
        </div>

        {/* Floating Atelier Studio Control Dock (Shape, Base Color, Print, View + Advanced Drawer trigger) */}
        <div className="mt-3.5 lg:mt-3 pointer-events-auto">
          <HeroStudioDock
            onOpenAdvanced={openDrawer}
            shapeInputRef={shapeInputRef}
          />
        </div>
      </div>

      {/* Expandable Advanced Studio Drawer sharing live FoldProvider state */}
      <AdvancedStudioDrawer
        open={drawerOpen}
        initialSection={drawerSection}
        onClose={() => setDrawerOpen(false)}
      />

      <div className="sr-only" aria-live="polite">
        {heroAnnouncement}
      </div>
    </section>
  );
};

