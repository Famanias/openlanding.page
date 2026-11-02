"use client";

import React, { useState } from 'react';
import { TECH_CHAPTERS } from '../data/catalog';

export const TechnologySection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentChapter = TECH_CHAPTERS[activeIndex] ?? TECH_CHAPTERS[0];

  return (
    <section
      id="technology"
      aria-labelledby="technology-heading"
      className="relative w-full py-20 lg:py-28 scroll-mt-20 lg:scroll-mt-24 bg-[#0B0B0A] border-b border-[#F1F0E9]/10"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16 border-b border-[#F1F0E9]/15 pb-8">
          <div>
            <div className="font-mono-tech text-xs tracking-[0.16em] text-[#D3FF35] uppercase mb-2">
              03. ENGINEERING SPECIFICATION · INTERACTIVE SCHEMATIC
            </div>
            <h2
              id="technology-heading"
              className="font-display italic font-black text-[clamp(2.5rem,5vw,4.25rem)] text-[#F1F0E9] uppercase leading-[0.92]"
            >
              TECHNOLOGY BREAKDOWN
            </h2>
          </div>
          <div className="font-mono-tech text-xs text-[#777A7A] uppercase tracking-wider">
            ACTIVE MODULE: {currentChapter.coordinates}
          </div>
        </div>

        {/* Sticky Inspection Stage Left + 3 Indexed Engineering Chapters Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Sticky Visual Stage (7 columns on desktop) */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 bg-[#111210] border border-[#F1F0E9]/15 overflow-hidden">
            {/* Top Technical Bar */}
            <div className="px-5 py-3.5 border-b border-[#F1F0E9]/10 flex items-center justify-between gap-4 bg-[#0B0B0A]">
              <span className="font-mono-tech text-xs text-[#D3FF35] font-semibold">
                CHAPTER {currentChapter.index} // {currentChapter.title}
              </span>
              <span className="font-mono-tech text-xs text-[#777A7A]">
                {currentChapter.coordinates}
              </span>
            </div>

            {/* Macro Crop Display with SVG Technical Callouts */}
            <div className="relative h-[340px] sm:h-[420px] w-full bg-[#0B0B0A] overflow-hidden flex items-center justify-center">
              <img
                key={currentChapter.id}
                src={currentChapter.image}
                alt={currentChapter.imageAlt}
                width={600}
                height={420}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-[#0B0B0A]/20 to-transparent" />

              {/* Blueprint crosshairs overlay */}
              <svg
                viewBox="0 0 600 420"
                fill="none"
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 w-full h-full"
              >
                <line x1="0" y1="210" x2="600" y2="210" stroke="#F1F0E9" strokeOpacity="0.14" strokeDasharray="4 4" />
                <line x1="300" y1="0" x2="300" y2="420" stroke="#F1F0E9" strokeOpacity="0.14" strokeDasharray="4 4" />
                <rect x="20" y="20" width="560" height="380" stroke="#D3FF35" strokeOpacity="0.22" strokeWidth="1" />
              </svg>

              {/* Interactive Callout Pins */}
              {currentChapter.callouts.map((callout, idx) => (
                <div
                  key={callout.label}
                  style={{ left: callout.x, top: callout.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0B0B0A]/90 border border-[#D3FF35]/70 px-3 py-1.5 shadow-lg"
                >
                  <div className="font-mono-tech text-[10px] text-[#D3FF35] uppercase tracking-wider">
                    0{idx + 1} · {callout.label}
                  </div>
                  <div className="font-mono-tech text-xs text-[#F1F0E9] font-semibold">
                    {callout.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Telemetry Readout Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-[#F1F0E9]/10 border-t border-[#F1F0E9]/15 bg-[#0B0B0A]">
              <div className="p-4 sm:p-5">
                <div className="font-mono-tech text-[11px] text-[#777A7A] uppercase mb-1">
                  {currentChapter.metricLabel}
                </div>
                <div
                  data-testid="tech-active-primary-metric"
                  className="font-display italic font-black text-2xl sm:text-3xl text-[#D3FF35]"
                >
                  {currentChapter.metricValue}
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="font-mono-tech text-[11px] text-[#777A7A] uppercase mb-1">
                  {currentChapter.secondaryMetricLabel}
                </div>
                <div className="font-display italic font-black text-2xl sm:text-3xl text-[#F1F0E9]">
                  {currentChapter.secondaryMetricValue}
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 p-4 sm:p-5 border-t sm:border-t-0 border-[#F1F0E9]/10">
                <div className="font-mono-tech text-[11px] text-[#777A7A] uppercase mb-1">
                  PLATFORM SERIES
                </div>
                <div className="font-display italic font-black text-2xl sm:text-3xl text-[#375CFF]">
                  RL-01 LAB
                </div>
              </div>
            </div>
          </div>

          {/* Right Indexed Engineering Chapters (5 columns on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {TECH_CHAPTERS.map((chapter, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={chapter.id}
                  className={`transition-colors duration-200 border ${
                    isActive
                      ? 'bg-[#141612] border-[#D3FF35]'
                      : 'bg-[#111210] border-[#F1F0E9]/15 hover:border-[#F1F0E9]/40'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-expanded={isActive}
                    className="w-full text-left p-6 sm:p-7 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D3FF35]"
                  >
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span
                        className={`font-mono-tech text-xs tracking-[0.14em] uppercase ${
                          isActive ? 'text-[#D3FF35] font-bold' : 'text-[#777A7A]'
                        }`}
                      >
                        CHAPTER {chapter.index}
                      </span>
                      <span className="font-mono-tech text-xs text-[#777A7A]">
                        {chapter.metricValue}
                      </span>
                    </div>

                    <h3 className="font-display italic font-black text-2xl sm:text-3xl text-[#F1F0E9] uppercase tracking-tight mb-1.5">
                      {chapter.title}
                    </h3>
                    <div className="font-mono-tech text-xs text-[#375CFF] uppercase tracking-wider mb-4">
                      {chapter.subtitle}
                    </div>

                    <p className="text-[#F1F0E9]/80 text-sm sm:text-[15px] leading-relaxed">
                      {chapter.summary}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
