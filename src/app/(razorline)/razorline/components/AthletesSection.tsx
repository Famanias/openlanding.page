"use client";

import React from 'react';
import { ATHLETE_STORIES } from '../data/catalog';

export const AthletesSection: React.FC = () => {
  return (
    <section
      id="athletes"
      aria-labelledby="athletes-heading"
      className="relative w-full py-20 lg:py-28 scroll-mt-20 lg:scroll-mt-24 bg-[#0B0B0A] border-b border-[#F1F0E9]/10"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 lg:mb-18 border-b border-[#F1F0E9]/15 pb-8">
          <div>
            <div className="font-mono-tech text-xs tracking-[0.16em] text-[#D3FF35] uppercase mb-2">
              04. FIELD TELEMETRY · FICTIONAL TEST PERSONAS
            </div>
            <h2
              id="athletes-heading"
              className="font-display italic font-black text-[clamp(2.5rem,5vw,4.25rem)] text-[#F1F0E9] uppercase leading-[0.92]"
            >
              MOVEMENT STORIES
            </h2>
          </div>
          <p className="text-[#777A7A] text-sm sm:text-base max-w-md leading-relaxed">
            Built for unsanctioned night miles, wet tarmac intervals, and relentless tempo blocks. Editorial test logs from fictional Razorline development runners.
          </p>
        </div>

        {/* Staggered Editorial Story Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {ATHLETE_STORIES.map((story, idx) => (
            <article
              key={story.id}
              className={`bg-[#111210] border border-[#F1F0E9]/15 flex flex-col justify-between p-6 sm:p-8 ${
                idx === 1 ? 'lg:translate-y-6' : ''
              }`}
            >
              <div>
                {/* Top Numbered Frame Header */}
                <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-[#F1F0E9]/10">
                  <span className="font-display italic font-black text-3xl text-[#D3FF35]">
                    FRAME {story.frameNumber}
                  </span>
                  <span className="font-mono-tech text-[11px] text-[#777A7A] uppercase">
                    {story.location}
                  </span>
                </div>

                {/* Product / Action Visual Frame */}
                <div className="relative h-48 mb-6 bg-[#0B0B0A] border border-[#F1F0E9]/10 overflow-hidden flex items-center justify-center p-4 bg-blueprint-grid">
                  <img
                    src={story.image}
                    alt={`${story.athleteName} test shoe ${story.modelUsed}`}
                    width={640}
                    height={500}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-[82%] h-auto object-contain"
                  />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between font-mono-tech text-[10px] text-[#F1F0E9]/75 bg-[#0B0B0A]/85 px-2.5 py-1">
                    <span>{story.sessionData}</span>
                  </div>
                </div>

                {/* Typographic Pull Quote */}
                <blockquote className="font-display italic font-bold text-2xl sm:text-[26px] leading-[1.08] text-[#F1F0E9] uppercase mb-4">
                  {story.quote}
                </blockquote>

                <p className="text-[#F1F0E9]/75 text-sm leading-relaxed mb-6">
                  {story.narrative}
                </p>
              </div>

              {/* Persona Attribution Footer */}
              <div className="pt-4 border-t border-[#F1F0E9]/10 flex items-center justify-between gap-4">
                <div>
                  <div className="font-display italic font-extrabold text-xl text-[#F1F0E9] uppercase">
                    {story.athleteName}
                  </div>
                  <div className="text-xs text-[#777A7A]">{story.discipline}</div>
                </div>
                <span
                  className={`font-mono-tech text-[11px] font-semibold uppercase ${
                    story.accentColor === 'lime' ? 'text-[#D3FF35]' : 'text-[#375CFF]'
                  }`}
                >
                  {story.modelUsed}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
