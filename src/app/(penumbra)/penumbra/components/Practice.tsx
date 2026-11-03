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
      className="relative py-24 md:py-32 bg-[#111318] border-t border-[#F2EBE2]/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div id="practice-heading">
          <SectionHeading
            label="02 / The practice"
            headline="Light is never just light"
            intro="It defines a threshold, reveals a texture, slows a moment, and gives architecture a second life after sunset. We begin with the space, then design what the light allows you to feel."
          />
        </div>

        {/* Three Editorial Principles + Architectural Detail Study */}
        <div className="mt-12 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Three Editorial Principles List */}
          <div className="lg:col-span-7 divide-y divide-[#F2EBE2]/10 border-t border-b border-[#F2EBE2]/10">
            {PRACTICE_PRINCIPLES.map((item, idx) => {
              const isSelected = activePrincipleIndex === idx;
              return (
                <div
                  key={item.number}
                  className={`py-8 md:py-9 transition-colors ${
                    isSelected ? 'bg-[#1c2027] px-6 -mx-6 border-l-2 border-[#D7A779]' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActivePrincipleIndex(idx)}
                    aria-expanded={isSelected}
                    className="w-full text-left group focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-mono-tech text-xs tracking-wider uppercase text-[#D7A779] tabular-nums">
                        {item.number}
                      </span>
                      <span className="font-mono-tech text-xs text-[#A6A29F]">
                        {item.opticalNote}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl text-[#F2EBE2] group-hover:text-[#E9BB86] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base text-[#A6A29F] leading-relaxed max-w-2xl">
                      {item.summary}
                    </p>

                    {isSelected && (
                      <p className="mt-4 pt-4 border-t border-[#F2EBE2]/10 text-sm text-[#F2EBE2] leading-relaxed max-w-2xl">
                        {item.detail}
                      </p>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right: Tactile Architectural Close-up & Shadow Study */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#1c2027] border border-[#F2EBE2]/10 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F2EBE2]/10">
              <span className="font-mono-tech text-xs uppercase tracking-wider text-[#D7A779]">
                Material study · Concrete formwork
              </span>
              <span className="font-mono-tech text-xs text-[#A6A29F] tabular-nums">
                0{activePrincipleIndex + 1} / 03
              </span>
            </div>

            {/* Cropped close-up corresponding to the active principle */}
            <div className="relative my-6 h-72 sm:h-80 overflow-hidden bg-[#111318] border border-[#F2EBE2]/10">
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
                  transform: 'scale(1.36)',
                }}
                className="w-full h-full object-cover transition-transform duration-500 ease-out"
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
                  transform: 'scale(1.36)',
                  opacity: activePrincipleIndex === 0 ? 0.25 : activePrincipleIndex === 1 ? 0.88 : 1,
                }}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#111318]/80 via-transparent to-transparent"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono-tech text-[#F2EBE2]">
                <span>
                  {activePrincipleIndex === 0
                    ? 'Phase I: Blue Hour Ambient'
                    : activePrincipleIndex === 1
                    ? 'Phase II: Grazing & Shadow Relief'
                    : 'Phase III: Warm Interior Threshold'}
                </span>
                <span className="text-[#E9BB86] tabular-nums">
                  {activePrincipleIndex === 0
                    ? '4200K Sky'
                    : activePrincipleIndex === 1
                    ? '2650K Linear'
                    : '2400K Core'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#A6A29F] leading-relaxed">
              Select each principle to observe how Penumbra transitions from unlit twilight observation (01 / Observe) to structural relief (02 / Sculpt) and interior warmth (03 / Reveal).
            </p>
          </div>
        </div>

        {/* Studio Monograph Note (#journal) */}
        <div
          id="journal"
          className="mt-16 md:mt-24 pt-10 border-t border-[#F2EBE2]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          <div className="lg:col-span-4">
            <span className="font-mono-tech text-xs tracking-wider uppercase text-[#D7A779]">
              Studio journal · Note 01
            </span>
            <h3 className="mt-3 font-display text-3xl text-[#F2EBE2]">
              In Praise of the Unlit Surface
            </h3>
            <p className="mt-2 font-mono-tech text-xs text-[#A6A29F]">
              Autumn 2026 · Editorial Monograph Note
            </p>
          </div>

          <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-[#A6A29F] leading-relaxed">
            <p className="text-[#F2EBE2]">
              When every facade is washed at uniform intensity, architecture loses its gravity. A cantilever only appears to float when the eye can read the darkness beneath and above it.
            </p>
            <p>
              In our conceptual studies, we deliberately leave over sixty percent of the building envelope in natural twilight shadow. By concentrating warm 2400K–2700K illumination along structural seams, soffit reveals, and water edges, the eye is invited to linger rather than squint.
            </p>
            {essayExpanded && (
              <p className="text-[#F2EBE2] pt-2 border-t border-[#F2EBE2]/10">
                True nocturnal comfort also relies on preserving the reflection of the night sky in still water. Shielded apertures ensure that visitors never see the diode or lamp source directly—only its warm consequence across stone and concrete.
              </p>
            )}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setEssayExpanded((prev) => !prev)}
                aria-expanded={essayExpanded}
                className="font-mono-tech text-xs uppercase tracking-wider text-[#D7A779] hover:text-[#E9BB86] transition-colors focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
              >
                {essayExpanded ? 'Collapse monograph note ↑' : 'Read full monograph note ↓'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
