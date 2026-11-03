'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from './SectionHeading';
import { PROCESS_STAGES } from '../lib/projectData';

gsap.registerPlugin(ScrollTrigger);

interface ProcessProps {
  reducedMotion: boolean;
}

export const Process: React.FC<ProcessProps> = ({ reducedMotion }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl || reducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top 65%',
        end: 'bottom 55%',
        scrub: 0.25,
        onUpdate: (self) => {
          if (progressLineRef.current) {
            progressLineRef.current.style.transform = `scaleX(${self.progress.toFixed(3)})`;
          }
          const idx = Math.min(
            PROCESS_STAGES.length - 1,
            Math.floor(self.progress * PROCESS_STAGES.length)
          );
          setActiveStepIndex(idx);
        },
      });
    }, sectionEl);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="relative py-24 md:py-36 bg-[#111318] border-t border-[#F2EBE2]/18"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div id="process-heading">
          <SectionHeading
            label="04 / OUR APPROACH"
            headline="FROM FIRST SHADOW TO FINAL GLOW."
            intro="Four deliberate phases that carry an architectural space from initial twilight observation to commissioned evening permanence."
          />
        </div>

        {/* Progressive Architectural Timeline Bar */}
        <div className="mt-16 md:mt-20">
          <div className="relative h-px w-full bg-[#F2EBE2]/15 overflow-hidden">
            <div
              ref={progressLineRef}
              style={{ transform: reducedMotion ? 'scaleX(1)' : 'scaleX(0.25)' }}
              className="origin-left h-full w-full bg-gradient-to-r from-[#D7A779] via-[#E9BB86] to-[#D7A779] transition-transform duration-150"
            />
          </div>

          {/* Four Architectural Stages Grid */}
          <ol className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {PROCESS_STAGES.map((stage, idx) => {
              const isIlluminated = reducedMotion || idx <= activeStepIndex;
              return (
                <li
                  key={stage.step}
                  className={`flex flex-col justify-between p-6 border transition-colors duration-300 ${
                    isIlluminated
                      ? 'border-[#D7A779]/55 bg-[#20252D]/55'
                      : 'border-[#F2EBE2]/14 bg-[#111318]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#F2EBE2]/12">
                      <span
                        className={`font-mono-tech text-xs tracking-[0.2em] uppercase ${
                          isIlluminated ? 'text-[#E9BB86]' : 'text-[#A6A29F]'
                        }`}
                      >
                        STAGE {stage.step}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveStepIndex(idx)}
                        className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#A6A29F] hover:text-[#F2EBE2] focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
                      >
                        {idx === activeStepIndex ? 'Active' : 'Inspect'}
                      </button>
                    </div>

                    <h3 className="mt-6 font-display text-3xl sm:text-4xl text-[#F2EBE2]">
                      {stage.title}
                    </h3>

                    <p className="mt-4 text-sm sm:text-base text-[#F2EBE2]/85 leading-relaxed">
                      {stage.summary}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#F2EBE2]/12 space-y-1.5">
                    <p className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#D7A779]">
                      {stage.deliverable}
                    </p>
                    <p className="font-mono-tech text-xs text-[#A6A29F]">
                      {stage.luxTarget}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
