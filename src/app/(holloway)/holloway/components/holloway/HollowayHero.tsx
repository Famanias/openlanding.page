'use client';

import React from 'react';
import HollowayNav from './HollowayNav';
import {
  FURNITURE_CATALOG,
  HOLLOWAY_ASSETS,
  ORDERED_FURNITURE_IDS,
} from '../../lib/holloway/floorPlan';

interface HollowayHeroProps {
  selectedModuleId: string | null;
  onSelectInstrumentModule: (moduleId: string) => void;
  onExploreRoom: () => void;
  onViewCollection: () => void;
  onResetRoom: () => void;
}

const LEFT_RULER_NUMS = ['5', '10', '15', '20', '25', '30', '75', '50', '25', '0'];
const RIGHT_RULER_NUMS = ['10', '120', '185', '160', '195', '200', '225', '350', '275', '400', '590'];

export default function HollowayHero({
  selectedModuleId,
  onSelectInstrumentModule,
  onExploreRoom,
  onViewCollection,
  onResetRoom,
}: HollowayHeroProps) {
  return (
    <section
      id="top"
      aria-label="HOLLOWAY Modular Living Introduction"
      className="relative min-h-screen w-full overflow-hidden bg-[#E6E0D4] flex flex-col justify-between select-none"
    >
      {/* Full-bleed 16:9 Architectural Room Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={HOLLOWAY_ASSETS.heroScene}
          alt="Sunlit architectural living space featuring HOLLOWAY powder-blue modular sofa, muted burgundy lounge chair, natural oak low table, built-in oak shelving, and Washi paper floor lamp against a warm plaster wall."
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center"
        />
        {/* Subtle atmospheric top/center legibility veil preserving room warmth */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#F5F2EA]/15 via-transparent to-[#262824]/10"
        />
      </div>

      {/* Top Navigation */}
      <HollowayNav />

      {/* Center Editorial Typography Group — positioned slightly above vertical midpoint so furniture & instrument strip breathe */}
      <div className="relative z-20 mx-auto flex w-full max-w-[960px] flex-1 flex-col items-center justify-center px-6 pt-4 pb-24 md:pb-32 text-center">
        <p className="animate-hw-reveal font-ui text-[10.5px] md:text-[12px] font-medium tracking-[0.2em] text-[#262824] uppercase mb-4 md:mb-5">
          A STUDY IN MODULAR LIVING — NO. 092
        </p>

        <h1
          style={{ textWrap: 'balance' }}
          className="animate-hw-reveal font-editorial text-[46px] sm:text-[66px] md:text-[84px] lg:text-[98px] font-medium leading-[0.93] tracking-[0.015em] text-[#262824] uppercase"
        >
          SPACE, MADE
          <br />
          PERSONAL.
        </h1>

        <p className="animate-hw-reveal-delay-1 mt-5 md:mt-6 max-w-[520px] font-editorial text-[19px] sm:text-[23px] md:text-[27px] font-normal leading-[1.32] text-[#262824]">
          Thoughtful pieces. Infinite arrangements.
          <br />
          A room that becomes yours.
        </p>

        {/* Primary & Secondary CTAs */}
        <div className="animate-hw-reveal-delay-2 mt-7 md:mt-9 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={onExploreRoom}
            className="bg-[#262824] text-[#F5F2EA] px-7 py-3.5 font-ui text-[11px] md:text-[11.5px] font-medium tracking-[0.16em] uppercase transition-colors hover:bg-[#3A3D37] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#262824] whitespace-nowrap shrink-0 cursor-pointer"
          >
            EXPLORE THE ROOM <span aria-hidden="true" className="ml-1">↗</span>
          </button>

          <button
            type="button"
            onClick={onViewCollection}
            className="font-ui text-[10.5px] md:text-[11.5px] font-medium tracking-[0.15em] text-[#262824] uppercase border-b border-[#262824]/75 pb-0.5 transition-colors hover:text-[#262824]/70 hover:border-[#262824]/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#262824] whitespace-nowrap shrink-0 cursor-pointer"
          >
            VIEW THE COLLECTION
          </button>
        </div>
      </div>

      {/* Bottom Instrument Strip — Full-Width Room Elements & Architectural Ruler */}
      <div
        role="region"
        aria-label="Room Studio Instrument Strip"
        className="relative z-20 w-full border-t border-[#262824]/25 bg-[#DED6C6]/75 backdrop-blur-[5px]"
      >
        {/* Row 1: 01 / SOFA ... 05 / LAMP */}
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 sm:grid-cols-5 items-center px-6 md:px-12 py-2.5 md:py-3 gap-y-1">
          {ORDERED_FURNITURE_IDS.map((id, idx) => {
            const item = FURNITURE_CATALOG[id];
            const isSelected = selectedModuleId === id;
            const alignmentClass =
              idx === 0
                ? 'justify-self-start'
                : idx === ORDERED_FURNITURE_IDS.length - 1
                ? 'justify-self-start sm:justify-self-end col-span-2 sm:col-span-1'
                : 'justify-self-start sm:justify-self-center';

            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelectInstrumentModule(id)}
                className={`${alignmentClass} group flex items-center gap-2 py-0.5 font-ui text-[11px] md:text-[12px] tracking-[0.12em] uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#262824] ${
                  isSelected
                    ? 'font-semibold text-[#262824]'
                    : 'font-medium text-[#262824]/85 hover:text-[#262824]'
                }`}
              >
                <span className="font-drafting">{item.index}</span>
                <span aria-hidden="true" className="text-[#262824]/50">
                  /
                </span>
                <span className="border-b border-transparent group-hover:border-[#262824]/60">
                  {item.shortName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Hairline Calibration Divider with Crosshair */}
        <div className="relative border-t border-[#262824]/30 px-6 md:px-12 pt-1.5 pb-2.5">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
            {/* Left Measurement Numerals */}
            <div className="hidden lg:flex flex-1 items-center justify-between pr-8 font-drafting text-[9px] text-[#262824]/75">
              <span aria-hidden="true" className="text-[11px] leading-none text-[#262824]">
                +
              </span>
              {LEFT_RULER_NUMS.map((num, i) => (
                <span key={`l-${i}`}>{num}</span>
              ))}
            </div>

            {/* Center Action Note: MOVE / ROTATE / RESET */}
            <div className="mx-auto flex items-center gap-2 font-ui text-[10px] md:text-[10.5px] font-medium tracking-[0.14em] text-[#262824] uppercase whitespace-nowrap shrink-0">
              <button
                type="button"
                onClick={onExploreRoom}
                className="hover:underline cursor-pointer focus-visible:outline-1 focus-visible:outline-[#262824]"
              >
                MOVE
              </button>
              <span aria-hidden="true" className="text-[#262824]/50">
                /
              </span>
              <button
                type="button"
                onClick={onExploreRoom}
                className="hover:underline cursor-pointer focus-visible:outline-1 focus-visible:outline-[#262824]"
              >
                ROTATE
              </button>
              <span aria-hidden="true" className="text-[#262824]/50">
                /
              </span>
              <button
                type="button"
                onClick={onResetRoom}
                className="hover:underline cursor-pointer focus-visible:outline-1 focus-visible:outline-[#262824]"
              >
                RESET
              </button>
            </div>

            {/* Right Measurement Numerals */}
            <div className="hidden lg:flex flex-1 items-center justify-between pl-8 font-drafting text-[9px] text-[#262824]/75">
              {RIGHT_RULER_NUMS.map((num, i) => (
                <span key={`r-${i}`}>{num}</span>
              ))}
            </div>
          </div>

          {/* Fine Bottom Architectural Millimeter Ticks */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[6px] opacity-45"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to right, #262824 0px, #262824 1px, transparent 1px, transparent 8px)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
