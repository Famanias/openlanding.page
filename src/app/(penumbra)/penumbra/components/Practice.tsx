'use client';

import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { PRACTICE_PRINCIPLES } from '../lib/projectData';
import { HERO_BASE, HERO_REVEAL } from '../lib/motion';

export const Practice: React.FC = () => {
  const [activePrincipleIndex, setActivePrincipleIndex] = useState<number>(1);

  return (
    <section
      id="practice"
      aria-labelledby="practice-heading"
      className="relative py-20 md:py-28 bg-[#111318] border-t border-[#F2EBE2]/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div id="practice-heading">
          <SectionHeading
            label="02 / Practice"
            headline="Light is never just light"
            intro="It defines a threshold, reveals texture, and gives architecture a second life after sunset."
          />
        </div>

        {/* Three Editorial Principles + Visual Material Study */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Three Editorial Principles List */}
          <div className="lg:col-span-7 divide-y divide-[#F2EBE2]/10 border-t border-b border-[#F2EBE2]/10">
            {PRACTICE_PRINCIPLES.map((item, idx) => {
              const isSelected = activePrincipleIndex === idx;
              return (
                <div
                  key={item.number}
                  className={`py-7 md:py-8 transition-colors ${
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

                    <h3 className="mt-2.5 font-display text-2xl sm:text-3xl text-[#F2EBE2] group-hover:text-[#E9BB86] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="mt-2.5 text-sm sm:text-base text-[#A6A29F] leading-relaxed max-w-xl">
                      {item.summary}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right: Tactile Material Close-up & Phase Study */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#1c2027] border border-[#F2EBE2]/10 p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#F2EBE2]/10">
              <span className="font-mono-tech text-xs uppercase tracking-wider text-[#D7A779]">
                Material study · Concrete formwork
              </span>
              <span className="font-mono-tech text-xs text-[#A6A29F] tabular-nums">
                0{activePrincipleIndex + 1} / 03
              </span>
            </div>

            <div className="relative my-5 h-64 sm:h-72 overflow-hidden bg-[#111318] border border-[#F2EBE2]/10">
              <img
                src={HERO_BASE}
                alt="Architectural concrete study"
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
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono-tech text-[#F2EBE2]">
                <span>
                  {activePrincipleIndex === 0
                    ? 'Phase I · Blue Hour'
                    : activePrincipleIndex === 1
                    ? 'Phase II · Graze & Relief'
                    : 'Phase III · Warm Core'}
                </span>
                <span className="text-[#E9BB86] tabular-nums">
                  {activePrincipleIndex === 0
                    ? '4200K'
                    : activePrincipleIndex === 1
                    ? '2650K'
                    : '2400K'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono-tech text-[#A6A29F]">
              <span>Interactive stage</span>
              <span className="text-[#D7A779]">Click principles to compare</span>
            </div>
          </div>
        </div>

        {/* Distilled Studio Monograph Note (#journal) */}
        <div
          id="journal"
          className="mt-16 md:mt-20 pt-8 border-t border-[#F2EBE2]/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
        >
          <div className="lg:col-span-4">
            <span className="font-mono-tech text-xs tracking-wider uppercase text-[#D7A779]">
              Studio journal · Note 01
            </span>
            <h3 className="mt-2 font-display text-2xl sm:text-3xl text-[#F2EBE2]">
              In Praise of the Unlit Surface
            </h3>
          </div>

          <div className="lg:col-span-8 text-base text-[#A6A29F] leading-relaxed">
            <p className="text-[#F2EBE2] text-lg font-light leading-relaxed">
              “Architecture only floats when the eye can read the shadow beneath it. We concentrate warm 2400K–2700K illumination along structural seams—leaving over sixty percent of the building envelope in natural twilight quiet.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
