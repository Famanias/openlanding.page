'use client';
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FORUM_ASSETS, ForumAssetEntry } from '../../lib/forum/assets';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ResilientImage } from './ResilientImage';

gsap.registerPlugin(ScrollTrigger);

interface EngineStage {
  index: number;
  code: string;
  shortLabel: string;
  headline: string;
  description: string;
  metricNote: string;
  asset: ForumAssetEntry;
  objectPosition: string;
}

const ENGINE_STAGES: EngineStage[] = [
  {
    index: 0,
    code: '01 / COLLECT',
    shortLabel: 'COLLECT',
    headline: 'COLLECT THE RIGHT SIGNALS',
    description:
      'A signal stream finds a single listening point. FORUM isolates high-intent contact activity, replies, and evaluation touches from background noise.',
    metricNote: 'PHASE 01 // APERTURE INTAKE',
    asset: FORUM_ASSETS.cardSignalObservatory,
    objectPosition: '50% 42%',
  },
  {
    index: 1,
    code: '02 / CONNECT',
    shortLabel: 'CONNECT',
    headline: 'GIVE EVERY SIGNAL CONTEXT',
    description:
      'The archival corridor emerges, threading isolated conversations across historical account notes, stakeholders, and active pipeline stages.',
    metricNote: 'PHASE 02 // ORBITAL ARCHIVE',
    asset: FORUM_ASSETS.cardOrbitalArchive,
    objectPosition: '50% 50%',
  },
  {
    index: 2,
    code: '03 / ALIGN',
    shortLabel: 'ALIGN',
    headline: 'MOVE WITH ONE CLEAR DIRECTION',
    description:
      'The orbital alignment mechanism locks into focus. When contact history and pipeline timing converge, the next priority is unmistakable.',
    metricNote: 'PHASE 03 // ALIGNMENT ENGINE',
    asset: FORUM_ASSETS.cardAlignmentEngine,
    objectPosition: '50% 50%',
  },
];

export const IntelligenceEngine: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  const [activeStage, setActiveStage] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const manualOverrideRef = useRef<number | null>(null);

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      const mm = gsap.matchMedia();

      // Desktop 235vh scroll-scrubbed 3-phase narrative with sticky viewport
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top+=80',
          end: 'bottom bottom',
          scrub: 0.25,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            // If user just clicked a tab, respect it briefly unless scroll moves significantly
            if (manualOverrideRef.current !== null) {
              return;
            }
            if (p < 0.33) {
              setActiveStage(0);
            } else if (p < 0.67) {
              setActiveStage(1);
            } else {
              setActiveStage(2);
            }
          },
        });

        return () => st.kill();
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  const handleSelectStage = (stageIdx: number) => {
    manualOverrideRef.current = stageIdx;
    setActiveStage(stageIdx);
    setScrollProgress(stageIdx === 0 ? 0.12 : stageIdx === 1 ? 0.5 : 0.92);
    window.setTimeout(() => {
      manualOverrideRef.current = null;
    }, 1200);
  };

  const currentStage = ENGINE_STAGES[activeStage] || ENGINE_STAGES[0];

  return (
    <section
      id="intelligence"
      ref={sectionRef}
      aria-labelledby="intelligence-heading"
      className="relative scroll-mt-[72px] lg:scroll-mt-[80px] w-full lg:min-h-[230vh] bg-[#171814] border-b border-[#B9B28A]/38"
    >
      <div className="lg:sticky lg:top-[80px] mx-auto flex min-h-[calc(100svh-80px)] max-w-[1920px] flex-col justify-center px-5 sm:px-8 lg:px-14 py-14 lg:py-10">
        {/* Top Kicker Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#B9B28A]/35 pb-4 mb-6 lg:mb-8">
          <div className="flex items-center gap-3">
            <span className="reg-cross text-[#B9B28A]" aria-hidden="true" />
            <span className="font-mono-tech text-xs tracking-[0.16em] text-[#B9B28A] uppercase">
              003 / INTELLIGENCE
            </span>
          </div>
          <span className="font-mono-tech text-xs tracking-[0.14em] text-[#D7D1B8]/75 uppercase">
            THREE-STAGE CONNECTED ARCHITECTURE
          </span>
        </div>

        {/* Main 12-Column Pinned Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Persistent Editorial Column (Cols 1-6) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <h2
                id="intelligence-heading"
                className="font-doto-display uppercase text-[#F6F3EA] text-[clamp(1.95rem,3.8vw,3.65rem)] leading-[0.94] tracking-[-0.02em] text-balance"
              >
                AN INTELLIGENT SYSTEM IS A CONNECTED SYSTEM.
              </h2>

              {/* Interactive Phase Selector Tabs (Accessible via Click & Keyboard) */}
              <div
                role="tablist"
                aria-label="Intelligence Engine Stages"
                className="mt-6 grid grid-cols-3 border border-[#B9B28A]/40 bg-[#0E100C]"
              >
                {ENGINE_STAGES.map((stage) => {
                  const selected = activeStage === stage.index;
                  return (
                    <button
                      key={stage.code}
                      type="button"
                      role="tab"
                      id={`engine-tab-${stage.index}`}
                      aria-selected={selected}
                      aria-controls={`engine-panel-${stage.index}`}
                      data-testid={`engine-tab-${stage.index}`}
                      onClick={() => handleSelectStage(stage.index)}
                      className={`px-3 py-3.5 text-left font-doto-ui text-xs sm:text-sm tracking-[0.1em] uppercase transition-colors border-r last:border-r-0 border-[#B9B28A]/30 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EA] ${
                        selected
                          ? 'bg-[#B9B28A] text-[#0E100C]'
                          : 'bg-[#0E100C] text-[#D7D1B8] hover:text-[#F6F3EA] hover:bg-[#171814]'
                      }`}
                    >
                      <span className="block font-mono-tech text-[10px] opacity-80">
                        0{stage.index + 1}
                      </span>
                      <span className="block whitespace-nowrap">{stage.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Narrative Beat Detail */}
            <div
              id={`engine-panel-${currentStage.index}`}
              role="tabpanel"
              aria-labelledby={`engine-tab-${currentStage.index}`}
              className="border border-[#B9B28A]/35 bg-[#0E100C] p-6 sm:p-7 space-y-4"
            >
              <div className="flex items-center justify-between font-mono-tech text-xs text-[#B9B28A] uppercase tracking-[0.14em]">
                <span>{currentStage.code}</span>
                <span>{currentStage.metricNote}</span>
              </div>

              <h3
                data-testid="engine-active-headline"
                className="font-doto-display text-2xl sm:text-3xl text-[#F6F3EA] uppercase tracking-tight"
              >
                {currentStage.headline}
              </h3>

              <p className="font-prose-support text-base sm:text-lg text-[#D7D1B8] leading-relaxed">
                {currentStage.description}
              </p>

              {/* All Three Stage Summaries for Mobile & Quick Scanning */}
              <div className="pt-4 border-t border-[#B9B28A]/20 grid grid-cols-3 gap-2 font-mono-tech text-[11px] uppercase">
                {ENGINE_STAGES.map((s) => (
                  <div
                    key={s.code}
                    className={
                      s.index === activeStage ? 'text-[#F6F3EA]' : 'text-[#8C876B]'
                    }
                  >
                    {s.code}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Signal Rail Tracer (Col 7) */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center py-4">
            <svg
              viewBox="0 0 48 420"
              className="h-full max-h-[420px] w-12 overflow-visible"
              aria-hidden="true"
            >
              <line
                x1="24"
                y1="24"
                x2="24"
                y2="396"
                stroke="rgba(185, 178, 138, 0.28)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1="24"
                y1="24"
                x2="24"
                y2={24 + Math.max(0.08, scrollProgress) * 372}
                stroke="#B9B28A"
                strokeWidth="2"
              />
              {[0, 1, 2].map((nodeIdx) => {
                const cy = 24 + nodeIdx * 186;
                const reached = activeStage >= nodeIdx;
                return (
                  <g key={nodeIdx}>
                    <rect
                      x="16"
                      y={cy - 8}
                      width="16"
                      height="16"
                      fill={reached ? '#B9B28A' : '#0E100C'}
                      stroke="#B9B28A"
                      strokeWidth="1.5"
                    />
                    {activeStage === nodeIdx && (
                      <rect
                        x="11"
                        y={cy - 13}
                        width="26"
                        height="26"
                        fill="none"
                        stroke="#F6F3EA"
                        strokeWidth="1"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Right Large Portrait Art Viewport (Cols 8-12) */}
          <div className="lg:col-span-5">
            <div className="relative h-[440px] sm:h-[520px] lg:h-[540px] w-full overflow-hidden border border-[#B9B28A]/45 bg-[#0E100C]">
              {ENGINE_STAGES.map((stage) => {
                const isCurrent = stage.index === activeStage;
                return (
                  <div
                    key={stage.code}
                    aria-hidden={!isCurrent}
                    className={`absolute inset-0 h-full w-full transition-all duration-500 ease-out ${
                      isCurrent
                        ? 'opacity-100 scale-100 z-10'
                        : 'opacity-0 scale-105 z-0 pointer-events-none'
                    }`}
                  >
                    <ResilientImage
                      asset={stage.asset}
                      objectPosition={stage.objectPosition}
                      className="h-full w-full"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E100C]/80 via-transparent to-[#0E100C]/30"
                    />
                  </div>
                );
              })}

              {/* Top & Bottom Viewport HUD Annotations */}
              <div className="pointer-events-none absolute top-4 left-4 right-4 z-20 flex items-center justify-between font-mono-tech text-[11px] text-[#F6F3EA] uppercase tracking-[0.14em] bg-[#0E100C]/80 border border-[#B9B28A]/35 px-3 py-1.5">
                <span>{currentStage.code}</span>
                <span>{currentStage.asset.filename}</span>
              </div>

              <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between font-mono-tech text-xs text-[#B9B28A] uppercase tracking-[0.14em] bg-[#0E100C]/85 border border-[#B9B28A]/35 px-3.5 py-2">
                <span>{currentStage.headline}</span>
                <span>[0{currentStage.index + 1}/03]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
