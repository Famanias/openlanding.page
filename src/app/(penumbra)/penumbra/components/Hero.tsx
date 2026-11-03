'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Sun, Sparkles } from 'lucide-react';
import { SpotlightReveal } from './SpotlightReveal';
import { useSpotlight } from '../hooks/useSpotlight';
import { SpotlightMode } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  reducedMotion: boolean;
  illuminationVisible: boolean;
  onToggleIllumination: () => void;
  spotlightMode: SpotlightMode;
  onSpotlightModeChange: (mode: SpotlightMode) => void;
  onNavigate: (targetId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  reducedMotion,
  illuminationVisible,
  onToggleIllumination,
  spotlightMode,
  onSpotlightModeChange,
  onNavigate,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const maskLayerRef = useRef<HTMLDivElement | null>(null);
  const scatterLayerRef = useRef<HTMLDivElement | null>(null);
  const cursorIndicatorRef = useRef<HTMLDivElement | null>(null);
  const editorialContentRef = useRef<HTMLDivElement | null>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement | null>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement | null>(null);
  const subcopyRef = useRef<HTMLDivElement | null>(null);

  const [hasMovedPointer, setHasMovedPointer] = useState(false);
  const [touchSweepActive, setTouchSweepActive] = useState(false);

  const { updatePointerFromClient, handlePointerLeave, setScrollProgress } = useSpotlight({
    stageRef,
    maskLayerRef,
    scatterLayerRef,
    cursorIndicatorRef,
    reducedMotion,
    illuminationVisible,
    mode: spotlightMode,
    onModeChange: onSpotlightModeChange,
    onFirstPointerMove: () => setHasMovedPointer(true),
  });

  // Handle mouse/pen pointer movement across the hero section
  const handleHeroPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
      updatePointerFromClient(e.clientX, e.clientY);
    } else if (touchSweepActive) {
      updatePointerFromClient(e.clientX, e.clientY);
    }
  };

  // Intro choreography & desktop ScrollTrigger full-illumination takeover
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const ctx = gsap.context(() => {
      if (!reducedMotion) {
        // 1. Subtle shared architecture scale settle (1.035 -> 1)
        if (imageWrapperRef.current) {
          gsap.fromTo(
            imageWrapperRef.current,
            { scale: 1.035 },
            { scale: 1, duration: 1.75, ease: 'power3.out' }
          );
        }

        // 2. Line-by-line headline reveal & supporting copy rise
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        if (headlineLine1Ref.current && headlineLine2Ref.current) {
          tl.fromTo(
            [headlineLine1Ref.current, headlineLine2Ref.current],
            { yPercent: 28, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.14 },
            0.12
          );
        }
        if (subcopyRef.current) {
          tl.fromTo(
            subcopyRef.current,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9 },
            0.42
          );
        }
      }

      // 3. Reversible scroll-driven illumination takeover on desktop viewports
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        ScrollTrigger.create({
          trigger: sectionEl,
          start: 'top top',
          end: '+=55%',
          pin: true,
          scrub: 0.35,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            if (editorialContentRef.current) {
              const p = self.progress;
              editorialContentRef.current.style.transform = `translate3d(0, ${Math.round(
                -p * 42
              )}px, 0)`;
              editorialContentRef.current.style.opacity = `${Math.max(0.12, 1 - p * 0.85)}`;
            }
          },
        });
      });

      // Fallback non-pinned scroll reveal for tablet/mobile
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        ScrollTrigger.create({
          trigger: sectionEl,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            setScrollProgress(Math.min(1, self.progress * 1.35));
          },
        });
      });
    }, sectionEl);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, setScrollProgress]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={handleHeroPointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="Hero — Architecture, After Dark"
      className="relative w-full min-h-[680px] h-[100dvh] overflow-hidden bg-[#111318] select-none"
    >
      {/* Shared-coordinate Base & Illuminated Architectural Stage */}
      <div className="absolute inset-0 z-0">
        <SpotlightReveal
          stageRef={stageRef}
          imageWrapperRef={imageWrapperRef}
          maskLayerRef={maskLayerRef}
          scatterLayerRef={scatterLayerRef}
          cursorIndicatorRef={cursorIndicatorRef}
          illuminationVisible={illuminationVisible}
          onPointerMove={(e) => {
            if (e.pointerType === 'mouse' || e.pointerType === 'pen' || touchSweepActive) {
              updatePointerFromClient(e.clientX, e.clientY);
            }
          }}
          onPointerLeave={handlePointerLeave}
          onRevealLoad={() => ScrollTrigger.refresh()}
        />
      </div>

      {/* Measured left-to-right and bottom-to-top contrast scrims for guaranteed text readability in both states */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#111318]/90 via-[#111318]/52 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#111318] via-transparent to-[#111318]/45"
      />

      {/* Layer 3 & 4: Editorial Hero Content + Interactive Controls */}
      <div className="relative z-20 mx-auto max-w-[1440px] h-full px-6 md:px-12 pt-24 pb-8 md:pb-12 flex flex-col justify-between pointer-events-none">
        {/* Top studio calibration bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#F2EBE2]/15">
          <p className="font-mono-tech text-[10px] sm:text-xs tracking-[0.13em] sm:tracking-[0.22em] uppercase text-[#D7A779] whitespace-nowrap">
            INDEPENDENT LIGHTING PRACTICE / EST. 2026
          </p>
          <span className="hidden sm:inline font-mono-tech text-[11px] tracking-[0.18em] uppercase text-[#F2EBE2]/65">
            SCENE 00 · BLUE HOUR TO 2700K WARMTH
          </span>
        </div>

        {/* Asymmetric Left/Center Editorial Lockup */}
        <div ref={editorialContentRef} className="my-auto max-w-3xl py-6 will-change-transform">
          <h1 className="font-display text-[3.35rem] sm:text-[4.75rem] md:text-[6.1rem] lg:text-[6.8rem] leading-[0.94] tracking-[-0.015em] text-[#F2EBE2]">
            <span className="block overflow-hidden pb-1">
              <span ref={headlineLine1Ref} className="block">
                ARCHITECTURE,
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span ref={headlineLine2Ref} className="block italic text-[#E9BB86]">
                AFTER DARK.
              </span>
            </span>
          </h1>

          <div ref={subcopyRef} className="mt-6 md:mt-8 max-w-xl">
            <p className="text-base sm:text-lg md:text-xl text-[#F2EBE2]/90 font-light leading-relaxed">
              We shape how spaces are seen, felt, and remembered through light.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4 pointer-events-auto">
              <a
                href="#projects"
                onClick={(e) => handleAnchorClick(e, 'projects')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs tracking-[0.18em] uppercase bg-[#F2EBE2] text-[#111318] font-medium hover:bg-[#E9BB86] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-4"
              >
                <span>EXPLORE OUR WORK</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#process"
                onClick={(e) => handleAnchorClick(e, 'process')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs tracking-[0.18em] uppercase text-[#F2EBE2] border border-[#F2EBE2]/35 bg-[#111318]/55 hover:border-[#D7A779] hover:text-[#E9BB86] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-4"
              >
                <span>OUR APPROACH</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Architectural Bar: Instruction Cue + Accessible Illumination Controls */}
        <div className="pt-5 border-t border-[#F2EBE2]/18 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pointer-events-auto">
          {/* Pointer discovery cue */}
          <div className="flex items-center gap-3">
            <span
              className={`font-mono-tech text-xs tracking-[0.2em] uppercase transition-opacity duration-500 ${
                hasMovedPointer || illuminationVisible
                  ? 'text-[#A6A29F]/75'
                  : 'text-[#E9BB86]'
              }`}
            >
              MOVE TO REVEAL THE LIGHT
            </span>
            <span className="hidden md:inline text-xs text-[#A6A29F]/60" aria-hidden="true">
              ·
            </span>
            <span className="hidden md:inline font-mono-tech text-xs text-[#A6A29F]">
              {illuminationVisible
                ? 'Full architectural illumination active'
                : spotlightMode === 'scroll' || spotlightMode === 'complete'
                ? 'Scroll takeover active'
                : 'Interactive spotlight active'}
            </span>
          </div>

          {/* Accessible Keyboard & Mobile Reveal Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Mobile opt-in touch sweep zone button so normal vertical scrolling is never hijacked */}
            <button
              type="button"
              onClick={() => setTouchSweepActive((prev) => !prev)}
              aria-pressed={touchSweepActive}
              className="md:hidden inline-flex items-center gap-2 px-3.5 py-2 text-xs tracking-[0.14em] uppercase border border-[#F2EBE2]/25 bg-[#111318]/75 text-[#F2EBE2] hover:border-[#D7A779] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D7A779]" aria-hidden="true" />
              <span>{touchSweepActive ? 'Touch Sweep: On' : 'Touch Sweep'}</span>
            </button>

            <button
              type="button"
              onClick={onToggleIllumination}
              aria-pressed={illuminationVisible}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.16em] uppercase border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-2 ${
                illuminationVisible
                  ? 'border-[#E9BB86] bg-[#D7A779]/20 text-[#E9BB86]'
                  : 'border-[#F2EBE2]/25 bg-[#111318]/75 text-[#F2EBE2] hover:border-[#D7A779]'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-[#D7A779]" aria-hidden="true" />
              <span>{illuminationVisible ? 'Restore Blue Hour' : 'Reveal Lighting'}</span>
            </button>

            <a
              href="#projects"
              onClick={(e) => handleAnchorClick(e, 'projects')}
              className="hidden lg:inline-flex items-center gap-2 font-mono-tech text-xs tracking-[0.16em] uppercase text-[#A6A29F] hover:text-[#F2EBE2] transition-colors pl-2 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
            >
              <span>SCROLL</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
