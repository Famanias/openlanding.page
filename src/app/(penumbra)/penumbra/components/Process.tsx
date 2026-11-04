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
      className="relative py-20 md:py-28 bg-[#111318] border-t border-[#F2EBE2]/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div id="process-heading">
          <SectionHeading
            label="04 / Approach"
            headline="From first shadow to final glow"
            intro="Four deliberate phases from initial twilight observation to evening commissioning."
          />
        </div>

        {/* Timeline Bar */}
        <div className="mt-12 md:mt-16">
          <div className="relative h-px w-full bg-[#F2EBE2]/10 overflow-hidden">
            <div
              ref={progressLineRef}
              style={{ transform: reducedMotion ? 'scaleX(1)' : 'scaleX(0.25)' }}
              className="origin-left h-full w-full bg-[#D7A779] transition-transform duration-150"
            />
          </div>

          {/* Four Stages Grid */}
          <ol className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {PROCESS_STAGES.map((stage, idx) => {
              const isIlluminated = reducedMotion || idx <= activeStepIndex;
              return (
                <li
                  key={stage.step}
                  className={`flex flex-col justify-between p-6 border transition-colors duration-200 ${
                    isIlluminated
                      ? 'border-[#D7A779]/50 bg-[#1c2027]'
                      : 'border-[#F2EBE2]/10 bg-[#111318]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F2EBE2]/10">
                      <span
                        className={`font-mono-tech text-xs tracking-wider uppercase tabular-nums ${
                          isIlluminated ? 'text-[#E9BB86]' : 'text-[#A6A29F]'
                        }`}
                      >
                        Stage {stage.step}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveStepIndex(idx)}
                        className="font-mono-tech text-xs uppercase tracking-wider text-[#A6A29F] hover:text-[#F2EBE2] focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
                      >
                        {idx === activeStepIndex ? 'Active' : 'View'}
                      </button>
                    </div>

                    <h3 className="mt-4 font-display text-3xl text-[#F2EBE2]">
                      {stage.title}
                    </h3>

                    <p className="mt-2 text-sm text-[#A6A29F] leading-relaxed">
                      {stage.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#F2EBE2]/10 flex items-center justify-between text-xs font-mono-tech">
                    <span className="text-[#D7A779] uppercase tracking-wider">{stage.deliverable}</span>
                    <span className="text-[#A6A29F]">{stage.luxTarget}</span>
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
