import React, { useState } from 'react';
import { SparkleStar, CoralUnderline, CurlyArrow } from './DoodleSvg';

interface HeroSectionProps {
  onExploreKits: () => void;
}

export function HeroSection({ onExploreKits }: HeroSectionProps) {
  const [highlightHotspots, setHighlightHotspots] = useState(false);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-4 pb-14 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24"
    >
      {/* Subtle organic cream paper-cut background shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-[480px] h-[420px] rounded-full bg-[#FAF3E3]/70 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-0 w-[520px] h-[520px] rounded-full bg-[#F28B72]/8 blur-3xl"
      />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* Left Column: Editorial Headline, Stamp, Copy, CTA Row, Benefits */}
          <div className="lg:col-span-6 xl:col-span-6 relative z-10 flex flex-col items-start text-left">
            {/* Tilted Hand-Drawn Lavender Oval Stamp: A LITTLE MAGIC, RIGHT AT HOME. */}
            <div className="relative mb-5 sm:mb-6 ml-2 sm:ml-4 animate-stamp-press">
              <SparkleStar className="w-5 h-5 absolute -top-3 -right-3 text-[#4A2E25]" />
              <SparkleStar className="w-4 h-4 absolute -bottom-2 -left-3 text-[#4A2E25]" />
              <div className="relative px-6 py-3 -rotate-6 rounded-[50%] border-[3px] border-[#DFB3DD] bg-[#F7ECD6]/90 shadow-[0_3px_0_rgba(223,179,221,0.4)]">
                <p className="text-[13px] sm:text-[15px] font-semibold tracking-[0.08em] uppercase leading-snug text-[#4A2E25] text-center">
                  A LITTLE MAGIC,
                  <br />
                  RIGHT AT HOME.
                </p>
              </div>
            </div>

            {/* 3-Line Masked Display Serif Headline */}
            <div className="relative w-full max-w-[600px]">
              <h1
                id="hero-heading"
                className="font-serif-display font-black text-[#4A2E25] tracking-[-0.02em] leading-[0.96] text-[clamp(2.35rem,5.4vw,5.1rem)] uppercase select-none"
              >
                <span className="block overflow-hidden py-0.5 sm:pl-14">
                  <span className="block animate-headline-1">GROW</span>
                </span>
                <span className="block overflow-hidden py-0.5 sm:pl-4">
                  <span className="block animate-headline-2">SOMETHING</span>
                </span>
                <span className="block overflow-hidden py-0.5 relative">
                  <span className="inline-flex items-baseline animate-headline-3">
                    <span>WONDERFUL.</span>
                    <SparkleStar className="w-5 h-5 sm:w-7 sm:h-7 ml-1 -translate-y-4 sm:-translate-y-6 shrink-0" />
                  </span>
                </span>
              </h1>

              {/* Hand-drawn Coral Underline under WONDERFUL. */}
              <div className="w-[88%] sm:w-[82%] mt-1 ml-2">
                <CoralUnderline className="w-full h-5" />
              </div>
            </div>

            {/* Editorial Subtitle */}
            <p className="mt-5 sm:mt-6 text-[18px] sm:text-[21px] leading-[1.48] text-[#4A2E25] max-w-[46ch] font-normal">
              Your very own little mushroom garden.
              <br className="hidden sm:inline" /> Easy to grow, impossible not to love.
            </p>

            {/* Primary CTA Row */}
            <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-6 sm:gap-8">
              <button
                type="button"
                onClick={onExploreKits}
                className="btn-clay-coral px-8 sm:px-10 py-4 sm:py-4.5 text-[15px] sm:text-[16px] font-bold tracking-[0.06em] uppercase text-[#4A2E25] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A2E25]"
              >
                FIND YOUR FIRST KIT
              </button>

              <a
                href="#how-it-grows"
                className="group inline-flex items-center gap-2.5 text-[#4A2E25] hover:text-[#B85338] transition-colors py-2 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A2E25] rounded"
              >
                <span className="relative font-hand text-[24px] sm:text-[26px] font-bold tracking-wide uppercase after:content-[''] after:absolute after:left-0 after:bottom-0.5 after:w-full after:h-[2px] after:bg-[#4A2E25] group-hover:after:bg-[#B85338]">
                  HOW IT WORKS
                </span>
                <CurlyArrow className="w-8 h-7 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Bottom Editorial Benefits */}
            <ul
              aria-label="Key kit highlights"
              className="mt-9 sm:mt-11 pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] sm:text-[15px] font-medium text-[#4A2E25]"
            >
              <li className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <SparkleStar className="w-4 h-4 shrink-0" />
                <span>Beginner Friendly</span>
              </li>
              <li className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <SparkleStar className="w-4 h-4 shrink-0" />
                <span>Grows in 10–14 Days (typical)</span>
              </li>
              <li className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <SparkleStar className="w-4 h-4 shrink-0" />
                <span>Made for Curious Minds</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Tactile Layered Clay Mushroom Kit Composition */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[650px] aspect-[676/640] mx-auto select-none">
              {/* Crisp Sculptural Mushroom Kit Diorama */}
              <img
                src="/templates/poppypatch/hero-kit-main.png"
                alt="Poppy Patch kraft cardboard mushroom growing kit overflowing with sculpted terracotta oyster mushrooms, cream button mushrooms, pastel lavender spotted caps, pistachio leaves, and a tiny clay gardener holding a watering can"
                width={676}
                height={640}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain animate-kit-arrive drop-shadow-[0_18px_28px_rgba(140,96,70,0.18)]"
              />

              {/* Interactive Anatomical Callout Pins when user toggles Anatomy view */}
              {highlightHotspots && (
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div className="FieldCallout absolute top-[16%] left-[6%] bg-[#FAF3E3]/95 border border-[#4A2E25]/30 px-3 py-1.5 rounded-xl shadow-md text-xs font-medium text-[#4A2E25]">
                    <strong className="block font-serif-display">Coral Oyster Flush</strong>
                    Ruffled caps fruit in 10–14 days
                  </div>
                  <div className="FieldCallout absolute top-[34%] right-[4%] bg-[#FAF3E3]/95 border border-[#4A2E25]/30 px-3 py-1.5 rounded-xl shadow-md text-xs font-medium text-[#4A2E25]">
                    <strong className="block font-serif-display">Twice-Daily Mist</strong>
                    6–8 gentle spritzes of tap water
                  </div>
                  <div className="FieldCallout absolute bottom-[18%] left-[12%] bg-[#FAF3E3]/95 border border-[#4A2E25]/30 px-3 py-1.5 rounded-xl shadow-md text-xs font-medium text-[#4A2E25]">
                    <strong className="block font-serif-display">Breathable Kraft Box</strong>
                    Recessed window holds humidity
                  </div>
                </div>
              )}
            </div>

            {/* Subtle Interactive Toggle to inspect Kit Anatomy */}
            <div className="mt-2 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setHighlightHotspots((prev) => !prev)}
                aria-pressed={highlightHotspots}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-[#4A2E25]/85 hover:text-[#4A2E25] bg-[#FAF3E3]/80 hover:bg-[#FAF3E3] border border-[#4A2E25]/15 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#4A2E25]"
              >
                <span>{highlightHotspots ? 'Hide Kit Anatomy Notes' : 'Peek Inside the Kit Anatomy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
