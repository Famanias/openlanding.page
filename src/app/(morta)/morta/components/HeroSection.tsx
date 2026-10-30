import React from 'react';
import { MORTA_ASSETS } from '../utils/mortaLogic';
import { MortaImage } from './MortaImage';
import { PointedSealOrnament } from './MortaMark';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="oath"
      aria-labelledby="hero-heading"
      className="relative bg-black border-b border-white/20 overflow-hidden"
    >
      {/* Subtle architectural pointed-arch background lines */}
      <div
        className="pointer-events-none absolute inset-0 max-w-[1920px] mx-auto px-6 md:px-8 flex justify-between"
        aria-hidden="true"
      >
        <div className="w-px h-full bg-white/10" />
        <div className="hidden lg:block w-px h-full bg-white/10" />
        <div className="w-px h-full bg-white/10" />
      </div>

      <div className="relative max-w-[1920px] mx-auto px-6 md:px-8 py-8 sm:py-12 md:py-20 lg:py-24">
        {/* Top ornamental rule that settles on load */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-white/20 morta-unfurl-line">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono tracking-[0.18em] sm:tracking-[0.2em] uppercase text-white/75">
            <span className="whitespace-nowrap">CH. I — THE OATH</span>
            <span aria-hidden="true">·</span>
            <span className="whitespace-nowrap">STERLING SILVER 925</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs font-mono tracking-[0.18em] text-white/65 tabular-nums">
            <span>OBJ. NO. 00</span>
            <span aria-hidden="true">/</span>
            <span>OGIVAL SIGNET STUDY</span>
          </div>
        </div>

        {/* Hero Frame: Uses CSS Grid stacking so foreground content never clips or overflows on narrow screens */}
        <div className="relative grid grid-cols-1 border border-white/25 bg-black overflow-hidden">
          {/* Layer 1: Cinematic Hero Plate */}
          <div className="col-start-1 row-start-1 relative w-full h-full min-h-[540px] sm:min-h-[580px] lg:min-h-[640px]">
            <MortaImage
              asset={MORTA_ASSETS.hero}
              priority={true}
              className="w-full h-full min-h-[540px] sm:min-h-[580px] lg:min-h-[640px]"
              imgClassName="object-right md:object-center"
            />
            {/* Measured monochrome scrim over the left dark region to guarantee >12:1 contrast */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30 lg:to-transparent lg:via-black/55"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/35"
              aria-hidden="true"
            />
          </div>

          {/* Layer 2: Editorial Foreground Content positioned in the dark text-safe region */}
          <div className="col-start-1 row-start-1 relative z-10 flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16">
            {/* Restrained object label */}
            <div className="flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-3 text-xs font-mono tracking-[0.18em] sm:tracking-[0.2em] uppercase text-white/80">
                <PointedSealOrnament className="w-3.5 h-5 text-white shrink-0" />
                <span>PLATE I · ARCHIVE SIGNET IN SHADOW</span>
              </div>
            </div>

            {/* Main Headline, Supporting Copy & Primary CTA */}
            <div className="max-w-xl my-auto py-8 sm:py-10">
              <div className="overflow-hidden pb-2">
                <h1
                  id="hero-heading"
                  className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.03] morta-rise-headline"
                  style={{ textWrap: 'balance' }}
                >
                  Wear what
                  <br />
                  remains.
                </h1>
              </div>

              <p className="mt-5 sm:mt-6 text-base sm:text-lg text-white/85 leading-relaxed max-w-md font-sans morta-fade-copy">
                Sculptural silver for the stories we carry. Cast in small
                editions and solitary commissions shaped around an intentional
                void.
              </p>

              <div className="mt-8 sm:mt-9 flex flex-wrap items-center gap-4 sm:gap-5 morta-fade-cta">
                <a
                  href="#collection"
                  className="inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 bg-white text-black font-mono text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] border border-white hover:bg-black hover:text-white active:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Discover the collection</span>
                  <span aria-hidden="true">↓</span>
                </a>

                <a
                  href="#craft"
                  className="inline-flex items-center gap-2 px-5 py-3.5 sm:py-4 text-xs font-mono uppercase tracking-[0.18em] text-white/90 hover:text-white border border-white/35 hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Observe the craft</span>
                </a>
              </div>
            </div>

            {/* Bottom Bar: Object label & Scroll cue */}
            <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-white/75">
              <div className="flex flex-wrap items-center gap-2 tracking-[0.16em] uppercase">
                <span>HALLMARK: MORTA 925</span>
                <span aria-hidden="true">·</span>
                <span>OXIDIZED &amp; HAND-BURNISHED</span>
              </div>

              <a
                href="#house"
                aria-label="Scroll to The House chapter"
                className="inline-flex items-center gap-3 text-white/85 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white self-start sm:self-auto whitespace-nowrap"
              >
                <span className="tracking-[0.2em] uppercase">
                  Scroll to gather the contour
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center w-6 h-6 border border-white/40 text-xs shrink-0"
                >
                  ↓
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
