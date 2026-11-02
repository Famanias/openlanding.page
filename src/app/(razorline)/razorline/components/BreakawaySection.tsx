"use client";

import React from 'react';
import { BREAKAWAY_FEATURES } from '../data/catalog';

export const BreakawaySection: React.FC = () => {
  return (
    <section
      aria-labelledby="breakaway-heading"
      className="relative w-full py-20 lg:py-28 bg-[#0B0B0A] border-b border-[#F1F0E9]/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-14 lg:mb-18">
          <div className="lg:col-span-7">
            <div className="font-mono-tech text-xs tracking-[0.16em] text-[#375CFF] uppercase mb-2">
              02. STRUCTURAL ANATOMY · MACRO BREAKDOWN
            </div>
            <h2
              id="breakaway-heading"
              className="font-display italic font-black text-[clamp(2.5rem,5.2vw,4.5rem)] text-[#F1F0E9] uppercase leading-[0.9]"
            >
              BUILT FOR THE <span className="text-[#D3FF35]">BREAKAWAY.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[#F1F0E9]/75 text-base leading-relaxed">
              Every gram on the RL-01 earns its place through mechanical structure rather than decorative padding. Three core assemblies work together from heel touch to toe-off.
            </p>
          </div>
        </div>

        {/* 3 Editorial Macro Feature Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {BREAKAWAY_FEATURES.map((feat) => (
            <article
              key={feat.index}
              className="group bg-[#111210] border border-[#F1F0E9]/15 flex flex-col justify-between overflow-hidden"
            >
              {/* Macro Photography Frame */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#0B0B0A] border-b border-[#F1F0E9]/10">
                <img
                  src={feat.image}
                  alt={feat.imageAlt}
                  width={600}
                  height={420}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-transparent to-transparent opacity-85" />

                {/* Top-left index & kicker */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="font-mono-tech text-xs font-bold text-[#D3FF35] bg-[#0B0B0A]/85 px-2.5 py-1 border border-[#D3FF35]/30">
                    {feat.index}. {feat.kicker}
                  </span>
                </div>

                {/* Bottom-left large data readout */}
                <div className="absolute bottom-4 left-5 right-5 flex items-baseline justify-between">
                  <span className="font-display italic font-black text-4xl sm:text-5xl text-[#F1F0E9] tracking-tight">
                    {feat.metric}
                  </span>
                  <span className="font-mono-tech text-xs text-[#D3FF35] uppercase tracking-wider">
                    {feat.unit}
                  </span>
                </div>
              </div>

              {/* Copy Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display italic font-extrabold text-2xl sm:text-3xl text-[#F1F0E9] uppercase tracking-tight mb-3">
                    {feat.index}. {feat.title}
                  </h3>
                  <p className="text-[#F1F0E9]/80 text-sm sm:text-[15px] leading-relaxed mb-6">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F1F0E9]/10 font-mono-tech text-[11px] text-[#777A7A]">
                  {feat.specNote}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
