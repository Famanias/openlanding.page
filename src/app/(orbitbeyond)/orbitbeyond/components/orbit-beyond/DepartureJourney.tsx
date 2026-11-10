'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ORBIT_ASSETS } from '../../lib/orbit-beyond/assets';
import { DEPARTURE_STAGES, type DepartureStage } from '../../lib/orbit-beyond/data';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

gsap.registerPlugin(ScrollTrigger);

export function DepartureJourney() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const userInteractedRef = useRef<boolean>(false);

  const [activeStageId, setActiveStageId] = useState<DepartureStage['id']>('launch');
  const [imageSrc, setImageSrc] = useState<string>(ORBIT_ASSETS.orbitalTransit);
  const [imageFailed, setImageFailed] = useState<boolean>(false);

  const activeStage =
    DEPARTURE_STAGES.find((stage) => stage.id === activeStageId) ?? DEPARTURE_STAGES[0];

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 65%',
        end: 'bottom 35%',
        onUpdate: (self) => {
          if (userInteractedRef.current) return;
          const p = self.progress;
          if (p < 0.34) {
            setActiveStageId('launch');
          } else if (p < 0.7) {
            setActiveStageId('transfer');
          } else {
            setActiveStageId('arrival');
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleStageSelect = (id: DepartureStage['id']) => {
    userInteractedRef.current = true;
    setActiveStageId(id);
  };

  const handleImageError = () => {
    if (imageSrc === ORBIT_ASSETS.orbitalTransit) {
      setImageSrc(ORBIT_ASSETS.orbitalTransitAltPath);
      return;
    }
    setImageFailed(true);
  };

  return (
    <section
      id="the-journey"
      ref={sectionRef}
      aria-labelledby="departure-heading"
      className="relative isolate w-full bg-[#030812] py-20 sm:py-28 overflow-clip"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Top Editorial Header Row */}
        <div className="mb-10 lg:mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="font-hud-mono text-xs tracking-[0.22em] text-[#8DE9FF] uppercase mb-2.5">
              01 · THE DEPARTURE
            </p>
            <h2
              id="departure-heading"
              className="font-display-sans text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.025em] text-[#EDF6FD] uppercase leading-[1.04]"
            >
              A LITTLE FURTHER FROM ORDINARY.
            </h2>
          </div>

          <p className="font-editorial-serif italic text-2xl sm:text-3xl text-[#AAB7C4] lg:text-right">
            From the familiar blue to a view few can imagine.
          </p>
        </div>

        {/* Main Interactive Stage Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Concise Mission Ledger (4 cols) */}
          <div
            role="tablist"
            aria-label="Mission Departure Stages"
            className="lg:col-span-4 liquid-glass rounded-[28px] p-5 sm:p-6 flex flex-col justify-between gap-3"
          >
            {DEPARTURE_STAGES.map((stage) => {
              const isSelected = stage.id === activeStage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  id={`tab-stage-${stage.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-stage-${stage.id}`}
                  onClick={() => handleStageSelect(stage.id)}
                  className={`w-full text-left rounded-[20px] p-5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] ${
                    isSelected
                      ? 'bg-[#178CFA]/22 border border-[#8DE9FF]/50 text-[#EDF6FD] shadow-[0_8px_24px_rgba(23,140,250,0.18)]'
                      : 'bg-white/[0.02] border border-transparent text-[#AAB7C4] hover:bg-white/[0.05] hover:text-[#EDF6FD]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-hud-mono text-xs font-semibold tracking-[0.18em] uppercase text-[#8DE9FF]">
                      {stage.code}
                    </span>
                    <span className="font-hud-mono text-[11px] text-[#AAB7C4]">
                      {stage.altitude}
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-lg font-bold text-[#EDF6FD]">
                    {stage.title}
                  </h3>
                  {isSelected && (
                    <p
                      id={`panel-stage-${stage.id}`}
                      className="mt-2 text-xs sm:text-sm leading-relaxed text-[#AAB7C4]"
                    >
                      {stage.summary}
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Wide Orbital Viewport + SVG Trajectory Overlay (8 cols) */}
          <div className="lg:col-span-8 relative min-h-[380px] sm:min-h-[460px] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/12 bg-[#091525] flex flex-col justify-between p-6 sm:p-8">
            {!imageFailed && (
              <img
                src={imageSrc}
                alt="Curved spacecraft observation window looking out over Earth's glowing blue atmospheric limb in deep space."
                loading="lazy"
                decoding="async"
                onError={handleImageError}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out"
                style={{
                  transform:
                    activeStage.id === 'launch'
                      ? 'scale(1.02)'
                      : activeStage.id === 'transfer'
                      ? 'scale(1.06) translateX(-1.5%)'
                      : 'scale(1.1) translateX(-3%)',
                }}
              />
            )}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(3, 8, 18, 0.55) 0%, rgba(3, 8, 18, 0.25) 50%, rgba(3, 8, 18, 0.78) 100%)',
              }}
            />

            {/* Top Minimal Phase Indicator */}
            <div className="relative z-10 flex items-center justify-between gap-3">
              <span className="liquid-glass rounded-full px-3.5 py-1.5 font-hud-mono text-[11px] tracking-[0.2em] text-[#EDF6FD] uppercase">
                CISLUNAR TRAJECTORY
              </span>
              <span className="font-hud-mono text-xs tracking-[0.2em] text-[#8DE9FF] uppercase">
                {activeStage.label} · {activeStage.durationMark}
              </span>
            </div>

            {/* Interactive SVG Orbital Trajectory Plot */}
            <div className="relative z-10 my-auto py-4">
              <svg
                viewBox="0 0 1000 360"
                className="w-full h-auto overflow-visible"
                role="img"
                aria-label={`Cislunar orbital trajectory plot showing current phase ${activeStage.code}`}
              >
                <defs>
                  <linearGradient id="orbitArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#178CFA" stopOpacity="0.95" />
                    <stop offset="55%" stopColor="#8DE9FF" stopOpacity="1" />
                    <stop offset="100%" stopColor="#F6C98C" stopOpacity="0.95" />
                  </linearGradient>
                </defs>

                <path
                  d="M 185 310 C 310 95, 640 85, 845 215"
                  fill="none"
                  stroke="rgba(237, 246, 253, 0.2)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />

                <motion.path
                  d="M 185 310 C 310 95, 640 85, 845 215"
                  fill="none"
                  stroke="url(#orbitArcGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={false}
                  animate={{ pathLength: activeStage.pathProgress }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }}
                />

                {DEPARTURE_STAGES.map((stage) => {
                  const isCurrent = stage.id === activeStage.id;
                  return (
                    <g
                      key={stage.id}
                      className="cursor-pointer"
                      onClick={() => handleStageSelect(stage.id)}
                    >
                      <circle
                        cx={stage.markerCoords.x}
                        cy={stage.markerCoords.y}
                        r={isCurrent ? 15 : 8}
                        fill={isCurrent ? 'rgba(23, 140, 250, 0.28)' : 'rgba(3, 8, 18, 0.7)'}
                        stroke={isCurrent ? '#8DE9FF' : 'rgba(237, 246, 253, 0.45)'}
                        strokeWidth={isCurrent ? 2 : 1.2}
                      />
                      <circle
                        cx={stage.markerCoords.x}
                        cy={stage.markerCoords.y}
                        r={isCurrent ? 5 : 3.5}
                        fill={isCurrent ? '#EDF6FD' : '#8DE9FF'}
                      />
                      <text
                        x={stage.markerCoords.x}
                        y={stage.markerCoords.y - 22}
                        textAnchor="middle"
                        fill={isCurrent ? '#EDF6FD' : '#AAB7C4'}
                        className="font-hud-mono text-[12px] tracking-[0.16em] uppercase"
                      >
                        {stage.code}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Single Clean Bottom Line */}
            <div className="relative z-10 flex items-center justify-between gap-4 pt-3 border-t border-white/12 font-hud-mono text-xs text-[#EDF6FD]/85">
              <span>{activeStage.title}</span>
              <span className="text-[#8DE9FF]">{activeStage.velocity}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
