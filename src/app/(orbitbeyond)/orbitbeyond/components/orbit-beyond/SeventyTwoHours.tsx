'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ITINERARY_DAYS, type ItineraryDay } from '../../lib/orbit-beyond/data';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

export function SeventyTwoHours() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeDayId, setActiveDayId] = useState<ItineraryDay['id']>('day-01');

  const activeDayIndex = ITINERARY_DAYS.findIndex((d) => d.id === activeDayId);
  const activeDay = ITINERARY_DAYS[activeDayIndex] ?? ITINERARY_DAYS[0];

  return (
    <section
      id="seventy-two-hours"
      aria-labelledby="itinerary-heading"
      className="relative isolate w-full bg-[#030812] py-20 sm:py-28 overflow-clip"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-10 lg:mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="font-hud-mono text-xs tracking-[0.22em] text-[#8DE9FF] uppercase mb-2.5">
              03 · 72 HOURS
            </p>
            <h2
              id="itinerary-heading"
              className="font-display-sans text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.025em] text-[#EDF6FD] uppercase leading-[1.04]"
            >
              72 HOURS. AN ENTIRELY NEW PERSPECTIVE.
            </h2>
          </div>

          <p className="font-hud-mono text-xs tracking-[0.18em] text-[#AAB7C4] uppercase">
            THREE DAYS · ONE WORLD AWAY
          </p>
        </div>

        {/* Live region for screen readers */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {`Showing ${activeDay.code}: ${activeDay.title}. ${activeDay.subtitle}`}
        </div>

        {/* Main Mission Log Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Vertical Mission Timeline (4 cols) */}
          <div
            role="tablist"
            aria-label="72-Hour Lunar Weekend Days"
            className="lg:col-span-4 relative flex flex-col justify-between gap-3"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-6 top-6 bottom-6 w-[2px] bg-white/10 hidden sm:block"
            >
              <motion.div
                className="w-full bg-[#178CFA]"
                initial={false}
                animate={{
                  height: `${((activeDayIndex + 1) / ITINERARY_DAYS.length) * 100}%`,
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {ITINERARY_DAYS.map((day) => {
              const isSelected = day.id === activeDay.id;
              return (
                <button
                  key={day.id}
                  type="button"
                  role="tab"
                  id={`itinerary-tab-${day.id}`}
                  aria-selected={isSelected}
                  aria-controls={`itinerary-panel-${day.id}`}
                  onClick={() => setActiveDayId(day.id)}
                  className={`relative sm:pl-14 text-left rounded-[24px] p-5 flex-1 flex flex-col justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] ${
                    isSelected
                      ? 'liquid-glass border-[#8DE9FF]/50 text-[#EDF6FD]'
                      : 'bg-white/[0.02] border border-white/6 text-[#AAB7C4] hover:bg-white/[0.04] hover:text-[#EDF6FD]'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`hidden sm:flex absolute left-[18px] top-1/2 -translate-y-1/2 h-3.5 w-3.5 items-center justify-center rounded-full border transition-colors ${
                      isSelected
                        ? 'bg-[#178CFA] border-[#8DE9FF] shadow-[0_0_12px_#178CFA]'
                        : 'bg-[#030812] border-white/30'
                    }`}
                  />

                  <div className="flex items-center justify-between gap-2">
                    <span className="font-hud-mono text-xs font-semibold tracking-[0.2em] text-[#8DE9FF] uppercase">
                      {day.code}
                    </span>
                    <span className="font-hud-mono text-[11px] text-[#AAB7C4]">
                      {day.windowLabel}
                    </span>
                  </div>

                  <h3 className="mt-1 text-lg font-bold text-[#EDF6FD]">
                    {day.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Right Large Shared Scene Viewport (8 cols) */}
          <div
            id={`itinerary-panel-${activeDay.id}`}
            role="tabpanel"
            aria-labelledby={`itinerary-tab-${activeDay.id}`}
            className="lg:col-span-8 liquid-glass rounded-[28px] sm:rounded-[36px] overflow-hidden flex flex-col justify-between"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay.id}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, clipPath: 'inset(0 0 8% 0 round 32px)' }
                }
                animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0 round 32px)' }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, clipPath: 'inset(6% 0 0 0 round 32px)' }
                }
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col h-full justify-between"
              >
                {/* Visual Plate */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#091525]">
                  <img
                    src={activeDay.image}
                    alt={activeDay.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(3,8,18,0.3) 0%, rgba(3,8,18,0.05) 45%, rgba(3,8,18,0.88) 100%)',
                    }}
                  />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="liquid-glass rounded-full px-3.5 py-1.5 font-hud-mono text-[11px] tracking-[0.2em] text-[#EDF6FD] uppercase">
                      {activeDay.code}
                    </span>
                    <span className="liquid-glass rounded-full px-3.5 py-1.5 font-hud-mono text-[11px] tracking-[0.18em] text-[#8DE9FF] uppercase">
                      {activeDay.elevation}
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-6 right-6">
                    <h3 className="font-display-sans text-2xl sm:text-3xl font-bold text-[#EDF6FD]">
                      {activeDay.title}
                    </h3>
                    <p className="mt-1 text-sm sm:text-base text-[#EDF6FD]/85 max-w-xl">
                      {activeDay.subtitle}
                    </p>
                  </div>
                </div>

                {/* Distilled Single-Line Checkpoints Strip */}
                <div className="px-6 py-4 sm:px-8 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#030812]/75 border-t border-white/10">
                  {activeDay.highlights.map((item) => (
                    <div key={item.time} className="flex items-center gap-3">
                      <span className="font-hud-mono text-xs font-semibold text-[#8DE9FF]">
                        {item.time}
                      </span>
                      <span aria-hidden="true" className="text-white/25">·</span>
                      <span className="text-xs sm:text-sm font-medium text-[#EDF6FD]">
                        {item.activity}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
