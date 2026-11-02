import React, { useState, useEffect, useRef } from 'react';
import { CLOSER_LOOK_STEPS } from '../data/portfolioData';
import { computeCloserLookStep } from '../utils/portfolioLogic';

export const CloserLookSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [stepProgress, setStepProgress] = useState<number>(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId: number | null = null;

    const updateOnScroll = () => {
      rafId = null;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const rawProgress = -rect.top / scrollableDistance;
      if (rawProgress < -0.1 || rawProgress > 1.1) return;

      const { activeIndex: nextIdx, stepProgress: nextSub } = computeCloserLookStep(
        rawProgress,
        CLOSER_LOOK_STEPS.length
      );
      setActiveIndex(nextIdx);
      setStepProgress(nextSub);
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateOnScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateOnScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const currentStep = CLOSER_LOOK_STEPS[activeIndex] || CLOSER_LOOK_STEPS[0];

  const handleManualStepSelect = (idx: number) => {
    setActiveIndex(idx);
    setStepProgress(0.5);
  };

  return (
    <section
      id="closer-look"
      aria-labelledby="closer-look-heading"
      ref={containerRef}
      className="relative w-full border-t border-[#BFB7AC] bg-[#201C19] text-[#F2ECE0] lg:min-h-[210vh]"
    >
      <div className="lg:sticky lg:top-0 lg:min-h-screen w-full px-5 sm:px-8 lg:px-14 py-16 lg:py-20 flex flex-col justify-between">
        {/* Top Calibration Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#F2ECE0]/20">
          <div className="flex items-center gap-3">
            <span className="text-[11px] tracking-[0.08em] uppercase text-[#F2ECE0]/70 tabular-nums">
              04 — A CLOSER LOOK
            </span>
            <span aria-hidden="true" className="text-[#F2ECE0]/40">
              ·
            </span>
            <span
              id="closer-look-heading"
              className="text-[11px] tracking-[0.08em] uppercase text-[#F2ECE0]"
            >
              FIELD METHODOLOGY IN THREE EXPOSURES
            </span>
          </div>

          {/* Interactive Step Selector Tabs (Observe / Wait / Remember) */}
          <div
            role="tablist"
            aria-label="Field methodology stages"
            className="flex items-center gap-6"
          >
            {CLOSER_LOOK_STEPS.map((step, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  onClick={() => handleManualStepSelect(idx)}
                  className={`min-h-[44px] text-[12px] tracking-[0.08em] uppercase transition-colors flex items-center gap-2 border-b-2 ${
                    isCurrent
                      ? 'border-[#A65D46] text-[#F2ECE0]'
                      : 'border-transparent text-[#F2ECE0]/55 hover:text-[#F2ECE0]/85'
                  }`}
                >
                  <span className="tabular-nums text-[10px] text-[#A65D46]">
                    0{idx + 1}
                  </span>
                  <span>{step.verb}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Pinned Sequence Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center my-auto py-8">
          {/* Left Typographic Mask & Calibration Progress */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="flex items-center gap-3 text-[11.5px] tracking-[0.08em] uppercase text-[#A65D46] tabular-nums">
              <span>EXPOSURE STAGE {currentStep.stepNumber}</span>
            </div>

            <div className="overflow-hidden">
              <div
                key={currentStep.verb}
                className="font-serif-editorial text-5xl sm:text-6xl lg:text-7xl tracking-[-0.02em] leading-[0.95] text-[#F2ECE0] transition-transform duration-500"
              >
                {currentStep.verb}.
              </div>
            </div>

            {/* Dynamic Rust Calibration Rule that Grows with Scroll/Step */}
            <div className="w-full h-[2px] bg-[#F2ECE0]/15 overflow-hidden">
              <div
                className="h-full bg-[#A65D46] transition-all duration-300"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(18, ((activeIndex + Math.max(0.25, stepProgress)) / 3) * 100)
                  )}%`
                }}
              />
            </div>

            <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#F2ECE0]/95 font-normal leading-[1.2]">
              {currentStep.headline}
            </h3>

            <p className="text-[15px] leading-[1.65] text-[#F2ECE0]/75 max-w-[460px]">
              {currentStep.reflection}
            </p>

            <p className="pt-2 text-[11px] tracking-[0.06em] uppercase text-[#F2ECE0]/55">
              {currentStep.technicalNote}
            </p>
          </div>

          {/* Right Masked Exposure Diptych */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-6 items-end">
            <div className="sm:col-span-8 relative aspect-[4/4.6] overflow-hidden bg-[#141210]">
              {CLOSER_LOOK_STEPS.map((step, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={step.id}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isActive
                        ? 'opacity-100 scale-100'
                        : idx < activeIndex
                        ? 'opacity-0 scale-105 -translate-x-6'
                        : 'opacity-0 scale-95 translate-x-6'
                    }`}
                  >
                    <img
                      src={step.image}
                      alt={step.alt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
              <div className="absolute bottom-3 left-3 bg-[#141210]/70 px-3 py-1 text-[10px] tracking-[0.08em] uppercase text-[#F2ECE0]/85 tabular-nums">
                {currentStep.stepNumber} — {currentStep.verb}
              </div>
            </div>

            <div className="sm:col-span-4 hidden sm:flex flex-col gap-3">
              <div className="aspect-[4/5] overflow-hidden bg-[#141210] border border-[#F2ECE0]/15">
                <img
                  src={currentStep.secondaryImage}
                  alt={`${currentStep.verb} companion contact plate`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-700"
                />
              </div>
              <span className="text-[10.5px] tracking-[0.06em] uppercase text-[#F2ECE0]/55">
                CONTACT PROOF · {currentStep.verb}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Sequence Footer */}
        <div className="pt-6 border-t border-[#F2ECE0]/15 flex items-center justify-between text-[11px] tracking-[0.06em] uppercase text-[#F2ECE0]/60 tabular-nums">
          <span>OBSERVE · WAIT · REMEMBER</span>
          <span>SCROLL OR SELECT STAGE TO ADVANCE</span>
        </div>
      </div>
    </section>
  );
};
