'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import { LUNAR_EXPERIENCES, type LunarExperienceItem } from '../../lib/orbit-beyond/data';
import { GlassButton } from './GlassButton';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

export interface LunarExperiencesProps {
  onSelectForMission?: (enableRover: boolean) => void;
}

export function LunarExperiences({ onSelectForMission }: LunarExperiencesProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selectedExperience, setSelectedExperience] = useState<LunarExperienceItem | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selectedExperience) return;
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 30);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedExperience(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedExperience]);

  return (
    <section
      id="lunar-experiences"
      aria-labelledby="experiences-heading"
      className="relative w-full bg-[#030812] py-20 sm:py-28 overflow-clip"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="font-hud-mono text-xs tracking-[0.22em] text-[#8DE9FF] uppercase mb-2.5">
              04 · BEYOND THE DOME
            </p>
            <h2
              id="experiences-heading"
              className="font-display-sans text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.025em] text-[#EDF6FD] uppercase leading-[1.04]"
            >
              THE SURFACE IS JUST THE BEGINNING.
            </h2>
          </div>

          <p className="font-editorial-serif italic text-2xl sm:text-3xl text-[#AAB7C4] lg:text-right">
            Outside on ancient regolith, or warm inside the glass ring.
          </p>
        </div>

        {/* Offset Staggered Cinematic Plates */}
        <div className="flex flex-col gap-12 lg:gap-16">
          {LUNAR_EXPERIENCES.map((exp, idx) => {
            const isFirst = idx === 0;
            return (
              <div
                key={exp.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
              >
                {/* Oversized Cinematic Media Plate */}
                <div
                  className={`lg:col-span-8 ${
                    isFirst ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="group relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-white/15 bg-[#091525] shadow-2xl">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={exp.image}
                        alt={exp.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />

                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(3,8,18,0.22) 0%, rgba(3,8,18,0.05) 55%, rgba(3,8,18,0.75) 100%)',
                        }}
                      />

                      {/* Genuine SVG Ridge / Horizon Annotation Overlay */}
                      {isFirst ? (
                        <svg
                          viewBox="0 0 800 500"
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 h-full w-full"
                        >
                          <path
                            d="M 60 340 Q 290 210, 560 255 T 750 310"
                            fill="none"
                            stroke="#8DE9FF"
                            strokeWidth="1.75"
                            strokeDasharray="6 6"
                            strokeOpacity="0.75"
                          />
                          <circle cx="560" cy="255" r="6" fill="#8DE9FF" />
                          <circle
                            cx="560"
                            cy="255"
                            r="16"
                            fill="none"
                            stroke="#8DE9FF"
                            strokeWidth="1.2"
                            strokeOpacity="0.6"
                          />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 800 500"
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 h-full w-full"
                        >
                          <circle
                            cx="695"
                            cy="195"
                            r="58"
                            fill="none"
                            stroke="#F6C98C"
                            strokeWidth="1.4"
                            strokeDasharray="4 5"
                            strokeOpacity="0.75"
                          />
                        </svg>
                      )}

                      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                        <span className="liquid-glass rounded-full px-3.5 py-1.5 font-hud-mono text-[11px] tracking-[0.18em] text-[#EDF6FD] uppercase">
                          {exp.kicker}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Distilled Editorial Card */}
                <div
                  className={`lg:col-span-4 ${
                    isFirst ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="liquid-glass rounded-[28px] p-6 sm:p-8">
                    <span className="font-hud-mono text-xs tracking-[0.2em] text-[#8DE9FF] uppercase">
                      {exp.code}
                    </span>
                    <h3 className="mt-2.5 font-display-sans text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-[#EDF6FD] uppercase">
                      {exp.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#AAB7C4]">
                      {exp.description}
                    </p>

                    <div className="mt-5 flex items-center gap-3 font-hud-mono text-xs text-[#EDF6FD]/80">
                      <span>{exp.durationSpec}</span>
                      <span aria-hidden="true" className="text-white/25">·</span>
                      <span className="text-[#8DE9FF]">{exp.elevationSpec}</span>
                    </div>

                    <div className="mt-6">
                      <GlassButton
                        type="button"
                        variant="glass"
                        size="md"
                        onClick={() => setSelectedExperience(exp)}
                        className="w-full justify-between"
                      >
                        <span>EXPLORE {exp.title}</span>
                        <ArrowUpRight className="h-4 w-4 text-[#8DE9FF]" />
                      </GlassButton>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessible Experience Specification Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-modal-title"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#030812]/85 p-4 sm:p-6 backdrop-blur-xl"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedExperience(null);
              }
            }}
          >
            <motion.div
              initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.96, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { scale: 1 } : { scale: 0.96, y: 10 }}
              className="liquid-glass relative w-full max-w-xl rounded-[32px] p-6 sm:p-8 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-hud-mono text-[11px] tracking-[0.2em] text-[#8DE9FF] uppercase">
                    {selectedExperience.code}
                  </span>
                  <h3
                    id="experience-modal-title"
                    className="mt-1 font-display-sans text-2xl font-bold text-[#EDF6FD] uppercase"
                  >
                    {selectedExperience.title}
                  </h3>
                </div>

                <button
                  ref={closeBtnRef}
                  type="button"
                  aria-label="Close experience dossier"
                  onClick={() => setSelectedExperience(null)}
                  className="liquid-glass inline-flex h-10 w-10 items-center justify-center rounded-full text-[#EDF6FD] hover:border-[#8DE9FF]/50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 relative aspect-[16/9] w-full overflow-hidden rounded-[20px] border border-white/12">
                <img
                  src={selectedExperience.image}
                  alt={selectedExperience.imageAlt}
                  className="h-full w-full object-cover"
                />
              </div>

              <ul className="mt-5 space-y-2">
                {selectedExperience.extendedNotes.map((note) => (
                  <li key={note} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#AAB7C4]">
                    <CheckCircle2 className="h-4 w-4 text-[#8DE9FF] shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                {onSelectForMission && (
                  <GlassButton
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      onSelectForMission(selectedExperience.id === 'low-gravity-walk');
                      setSelectedExperience(null);
                    }}
                  >
                    APPLY TO MISSION PLANNER
                  </GlassButton>
                )}
                <GlassButton
                  type="button"
                  variant="subtle"
                  size="sm"
                  onClick={() => setSelectedExperience(null)}
                >
                  CLOSE
                </GlassButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
