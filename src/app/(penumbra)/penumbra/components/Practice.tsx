'use client';

import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { PRACTICE_PRINCIPLES } from '../lib/projectData';
import { HERO_BASE, HERO_REVEAL } from '../lib/motion';

export const Practice: React.FC = () => {
  const [activePrincipleIndex, setActivePrincipleIndex] = useState<number>(1);
  const [essayExpanded, setEssayExpanded] = useState<boolean>(false);

  return (
    <section
      id="practice"
      aria-labelledby="practice-heading"
      className="relative py-24 md:py-36 bg-[#111318] border-t border-[#F2EBE2]/18"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div id="practice-heading">
          <SectionHeading
            label="02 / THE PRACTICE"
            headline="LIGHT IS NEVER JUST LIGHT."
            intro="It defines a threshold, reveals a texture, slows a moment, and gives architecture a second life after sunset. We begin with the space, then design what the light allows you to feel."
          />
        </div>

        {/* Three Editorial Principles + Architectural Detail Study */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Three Editorial Principles List */}
          <div className="lg:col-span-7 divide-y divide-[#F2EBE2]/15 border-t border-b border-[#F2EBE2]/15">
            {PRACTICE_PRINCIPLES.map((item, idx) => {
              const isSelected = activePrincipleIndex === idx;
              return (
                <div
                  key={item.number}
                  className={`py-8 md:py-10 transition-colors ${
                    isSelected ? 'bg-[#20252D]/45 px-5 -mx-5' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActivePrincipleIndex(idx)}
                    aria-expanded={isSelected}
                    className="w-full text-left group focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-mono-tech text-xs tracking-[0.2em] uppercase text-[#D7A779]">
                        {item.number}
                      </span>
                      <span className="font-mono-tech text-xs text-[#A6A29F]">
                        {item.opticalNote}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl text-[#F2EBE2] group-hover:text-[#E9BB86] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm sm:text-base text-[#A6A29F] leading-relaxed max-w-2xl">
                      {item.summary}
                    </p>

                    {isSelected && (
                      <p className="mt-4 pt-4 border-t border-[#F2EBE2]/12 text-sm text-[#F2EBE2]/85 leading-relaxed max-w-2xl">
                        {item.detail}
                      </p>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right: Tactile Architectural Close-up & Shadow Study */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#20252D]/50 border border-[#F2EBE2]/15 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F2EBE2]/12">
              <span className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#D7A779]">
                Material Study · Board-Formed Concrete
              </span>
              <span className="font-mono-tech text-xs text-[#A6A29F]">
                0{activePrincipleIndex + 1} / 03
              </span>
            </div>

            {/* Cropped close-up corresponding to the active principle */}
            <div className="relative my-6 h-72 sm:h-80 overflow-hidden bg-[#111318] border border-[#F2EBE2]/12">
              <img
                src={HERO_BASE}
                alt="Architectural concrete and twilight reflection study"
                loading="lazy"
                style={{
                  objectPosition:
                    activePrincipleIndex === 0
                      ? '22% 45%'
                      : activePrincipleIndex === 1
                      ? '46% 62%'
                      : '78% 64%',
                  transform: 'scale(1.38)',
                }}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <img
                src={HERO_REVEAL}
                alt=""
                aria-hidden="true"
                loading="lazy"
                style={{
                  objectPosition:
                    activePrincipleIndex === 0
                      ? '22% 45%'
                      : activePrincipleIndex === 1
                      ? '46% 62%'
                      : '78% 64%',
                  transform: 'scale(1.38)',
                  opacity: activePrincipleIndex === 0 ? 0.25 : activePrincipleIndex === 1 ? 0.88 : 1,
                }}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#111318]/80 via-transparent to-transparent"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono-tech text-[#F2EBE2]/90">
                <span>
                  {activePrincipleIndex === 0
                    ? 'Phase I: Blue Hour Ambient'
                    : activePrincipleIndex === 1
                    ? 'Phase II: Grazing & Shadow Relief'
                    : 'Phase III: Warm Interior Threshold'}
                </span>
                <span className="text-[#E9BB86]">
                  {activePrincipleIndex === 0
                    ? '4200K Sky'
                    : activePrincipleIndex === 1
                    ? '2650K Linear'
                    : '2400K Core'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#A6A29F] leading-relaxed">
              Select each principle to observe how PENUMBRA transitions from unlit twilight observation (01 / Observe) to structural relief (02 / Sculpt) and interior warmth (03 / Reveal).
            </p>
          </div>
        </div>

        {/* On-Page Editorial Journal Note (#journal) so the Header 'Journal' link leads to a rich studio essay */}
        <div
          id="journal"
          className="mt-20 md:mt-28 pt-12 border-t border-[#F2EBE2]/18 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          <div className="lg:col-span-4">
            <span className="font-mono-tech text-xs tracking-[0.2em] uppercase text-[#D7A779]">
              STUDIO JOURNAL / NOTE 01
            </span>
            <h3 className="mt-3 font-display text-3xl text-[#F2EBE2]">
              In Praise of the Unlit Surface.
            </h3>
            <p className="mt-2 font-mono-tech text-xs text-[#A6A29F]">
              Autumn 2026 · Editorial Monograph Note
            </p>
          </div>

          <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-[#A6A29F] leading-relaxed">
            <p className="text-[#F2EBE2]/90">
              When every facade is washed at uniform intensity, architecture loses its gravity. A cantilever only appears to float when the eye can read the darkness beneath and above it.
            </p>
            <p>
              In our conceptual studies, we deliberately leave over sixty percent of the building envelope in natural twilight shadow. By concentrating warm 2400K–2700K illumination along structural seams, soffit reveals, and water edges, the eye is invited to linger rather than squint.
            </p>
            {essayExpanded && (
              <p className="text-[#F2EBE2]/85 pt-2 border-t border-[#F2EBE2]/12">
                True nocturnal comfort also relies on preserving the reflection of the night sky in still water. Shielded apertures ensure that visitors never see the diode or lamp source directly—only its warm consequence across stone and concrete.
              </p>
            )}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setEssayExpanded((prev) => !prev)}
                aria-expanded={essayExpanded}
                className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#D7A779] hover:text-[#E9BB86] transition-colors focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
              >
                {essayExpanded ? 'Collapse Monograph Note ↑' : 'Read Full Monograph Note ↓'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
