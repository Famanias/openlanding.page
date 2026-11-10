'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ORBIT_ASSETS } from '../../lib/orbit-beyond/assets';
import { HABITAT_HOTSPOTS, type HabitatHotspot } from '../../lib/orbit-beyond/data';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

gsap.registerPlugin(ScrollTrigger);

export function HabitatExplorer() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);

  const [activeHotspotId, setActiveHotspotId] = useState<HabitatHotspot['id']>('lounge');
  const [imageSrc, setImageSrc] = useState<string>(ORBIT_ASSETS.habitatInterior);
  const [imageFailed, setImageFailed] = useState<boolean>(false);

  const activeHotspot =
    HABITAT_HOTSPOTS.find((h) => h.id === activeHotspotId) ?? HABITAT_HOTSPOTS[0];

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !frameRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frameRef.current,
        { scale: 0.93, borderRadius: '40px' },
        {
          scale: 1,
          borderRadius: '28px',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 20%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleImageError = () => {
    if (imageSrc === ORBIT_ASSETS.habitatInterior) {
      setImageSrc(ORBIT_ASSETS.habitatInteriorAltPath);
      return;
    }
    setImageFailed(true);
  };

  return (
    <section
      id="the-habitat"
      ref={sectionRef}
      aria-labelledby="habitat-heading"
      className="relative isolate w-full bg-[#030812] py-20 sm:py-28 overflow-clip"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Heading & Instrument Serif Editorial Accent */}
        <div className="mb-8 sm:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="font-hud-mono text-xs tracking-[0.22em] text-[#F6C98C] uppercase mb-2.5">
              02 · THE HABITAT
            </p>
            <h2
              id="habitat-heading"
              className="font-display-sans text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.025em] text-[#EDF6FD] uppercase leading-[1.04]"
            >
              YOUR WINDOW TO EVERYTHING.
            </h2>
          </div>

          <p className="font-editorial-serif italic text-2xl sm:text-4xl text-[#F6C98C]/95">
            Home, but somewhere entirely new.
          </p>
        </div>

        {/* Accessible Tablist */}
        <div
          role="tablist"
          aria-label="Habitat Architectural Zones"
          className="mb-5 flex flex-wrap items-center gap-2.5"
        >
          {HABITAT_HOTSPOTS.map((spot) => {
            const isSelected = spot.id === activeHotspot.id;
            return (
              <button
                key={spot.id}
                type="button"
                role="tab"
                id={`habitat-tab-${spot.id}`}
                aria-selected={isSelected}
                aria-controls={`habitat-panel-${spot.id}`}
                onClick={() => setActiveHotspotId(spot.id)}
                className={`rounded-full px-4 py-2 font-hud-mono text-xs tracking-[0.16em] uppercase transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] ${
                  isSelected
                    ? 'bg-[#178CFA] text-[#EDF6FD] shadow-[0_0_24px_rgba(23,140,250,0.4)]'
                    : 'liquid-glass text-[#AAB7C4] hover:text-[#EDF6FD] hover:border-white/25'
                }`}
              >
                {spot.code}
              </button>
            );
          })}
        </div>

        {/* Immersive Rounded Panoramic View */}
        <div
          ref={frameRef}
          className="relative w-full overflow-hidden rounded-[28px] sm:rounded-[36px] border border-white/15 bg-[#091525] shadow-2xl"
        >
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
            {!imageFailed ? (
              <img
                src={imageSrc}
                alt="Interior of the Orbit & Beyond lunar habitat showing the warm amber Earthrise Lounge on the left, central dual-tier Sleep Pod berths, and right-side Observation Deck window looking out at the Moon and Earth."
                loading="lazy"
                decoding="async"
                onError={handleImageError}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#091525] p-8">
                <p className="font-hud-mono text-sm text-[#8DE9FF]">
                  ARCHITECTURAL SECTIONAL SCHEMATIC · DOME 01
                </p>
              </div>
            )}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(3,8,18,0.25) 0%, rgba(3,8,18,0.04) 50%, rgba(3,8,18,0.75) 100%)',
              }}
            />

            {/* 16:9 SVG Architectural Annotation Linework */}
            <svg
              viewBox="0 0 160 90"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <polyline
                points="40,61.2 76.8,44.1 132.8,41.4"
                fill="none"
                stroke="rgba(141, 233, 255, 0.32)"
                strokeWidth="0.35"
                strokeDasharray="1.8 1.8"
              />
            </svg>

            {/* Interactive Touch-Friendly Hotspot Buttons */}
            {HABITAT_HOTSPOTS.map((spot) => {
              const isSelected = spot.id === activeHotspot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  aria-label={`Inspect ${spot.code}: ${spot.shortTitle}`}
                  aria-pressed={isSelected}
                  onClick={() => setActiveHotspotId(spot.id)}
                  style={{
                    left: `${spot.coords.xPercent}%`,
                    top: `${spot.coords.yPercent}%`,
                  }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-2.5 rounded-full p-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF]"
                >
                  <span className="relative flex items-center justify-center">
                    {isSelected && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-2 rounded-full border border-[#8DE9FF]/75"
                      />
                    )}
                    <span
                      className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full font-hud-mono text-xs font-semibold transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#178CFA] text-[#EDF6FD] ring-4 ring-[#8DE9FF]/35 scale-105'
                          : 'liquid-glass text-[#EDF6FD] hover:border-[#8DE9FF]/60 hover:scale-105'
                      }`}
                    >
                      {spot.code.slice(0, 2)}
                    </span>
                  </span>
                  <span
                    className={`hidden md:inline-flex rounded-full px-3 py-1 font-hud-mono text-[10px] tracking-[0.16em] uppercase transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#030812]/90 text-[#8DE9FF] border border-[#8DE9FF]/50'
                        : 'bg-[#030812]/75 text-[#EDF6FD]/85 border border-white/15 opacity-90 group-hover:opacity-100'
                    }`}
                  >
                    {spot.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Distilled Bottom-Edge Liquid-Glass Annotation Bar */}
          <div
            id={`habitat-panel-${activeHotspot.id}`}
            role="tabpanel"
            aria-labelledby={`habitat-tab-${activeHotspot.id}`}
            className="relative z-20 border-t border-white/12 bg-[#030812]/88 backdrop-blur-xl px-6 py-5 sm:px-8 sm:py-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHotspot.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-hud-mono text-xs font-semibold tracking-[0.2em] text-[#8DE9FF] uppercase">
                      {activeHotspot.code}
                    </span>
                    <span aria-hidden="true" className="text-white/25">·</span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#EDF6FD]">
                      {activeHotspot.shortTitle}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-[#AAB7C4] max-w-2xl">
                    {activeHotspot.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 font-hud-mono text-xs shrink-0">
                  <span className="text-[#EDF6FD]">{activeHotspot.capacitySpec}</span>
                  <span aria-hidden="true" className="text-white/25">·</span>
                  <span className="text-[#F6C98C]">{activeHotspot.lightingSpec}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
