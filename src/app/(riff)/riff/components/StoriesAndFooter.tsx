import React, { useState } from 'react';
import {
  HandStar,
  MusicGreaterLooksScrawl,
  VinylDisc,
  WaveformLogo,
} from './ZineMotifs';

interface StoriesAndFooterProps {
  motionEnabled: boolean;
  onToggleMotion: () => void;
  onOpenPreviewModal: (source: string) => void;
}

interface ZineVignette {
  id: string;
  issueTag: string;
  headline: string;
  names: string;
  sharedAnchor: string;
  storyBody: string;
  quote: string;
  footnote: string;
}

const FICTIONAL_VIGNETTES: ZineVignette[] = [
  {
    id: 'vignette-1',
    issueTag: 'ILLUSTRATIVE VIGNETTE #01 · FICTIONAL SCENARIO',
    headline: 'Two copies of the same Japanese pressing in a Dalston basement.',
    names: 'Mila (24) & Julian (26) · East London',
    sharedAnchor: 'Matched via: Slowdive — Souvlaki (1993) + 200-cap venue habit',
    storyBody:
      'Instead of spending three weeks texting "how was your Tuesday?", they realized they had both queued the same four-track shoegaze B-side after midnight. Their first meet-up was a £9 support-band showcase where they stood ten feet in front of the soundboard and traded cassette recs between sets.',
    quote:
      '"When you already know someone can sit through a seven-minute instrumental outro without checking their phone, the first coffee is effortless."',
    footnote: 'Editorial scenario illustrating Riff’s song-first prompt flow.',
  },
  {
    id: 'vignette-2',
    issueTag: 'ILLUSTRATIVE VIGNETTE #02 · FICTIONAL SCENARIO',
    headline: 'A shared playlist for the 11:40 PM train home.',
    names: 'Sora (23) & Elena (25) · Chicago',
    sharedAnchor: 'Matched via: Wednesday — Rat Saw God + Late-Night Headphones',
    storyBody:
      'Neither wanted a high-pressure bar date. They used Riff’s three-song trade prompt to build a 14-minute mini-mix for their respective late-night train commutes, then met on a Sunday afternoon to dig through the $3 7-inch bins at Reckless Records.',
    quote:
      '"Seeing someone’s honest listening habits felt ten times more personal than five curated vacation photos."',
    footnote: 'Editorial scenario illustrating Riff’s crate-before-selfie design.',
  },
  {
    id: 'vignette-3',
    issueTag: 'ILLUSTRATIVE VIGNETTE #03 · FICTIONAL SCENARIO',
    headline: 'Standing on the same side of the amp stack.',
    names: 'Deon (28) & Ren (27) · Berlin',
    sharedAnchor: 'Matched via: Boy Harsher + Darkwave / Vinyl Crate Digging',
    storyBody:
      'They overlapped at 93% on nocturnal synth-punk and post-punk basslines. The icebreaker prompt asked which record stays permanently on their turntable — turning what is usually an awkward first message into a two-hour conversation about drum machines.',
    quote:
      '"A shared song is a better hello. We skipped the small talk entirely."',
    footnote: 'Editorial scenario illustrating Riff’s icebreaker engine.',
  },
];

export function StoriesAndFooter({
  motionEnabled,
  onToggleMotion,
  onOpenPreviewModal,
}: StoriesAndFooterProps) {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [footerVinylSide, setFooterVinylSide] = useState<'A' | 'B'>('A');

  const activeStory = FICTIONAL_VIGNETTES[slideIndex];

  const handlePrevSlide = () => {
    setSlideIndex((prev) =>
      prev === 0 ? FICTIONAL_VIGNETTES.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % FICTIONAL_VIGNETTES.length);
  };

  return (
    <>
      {/* ====================================================================
          SECTION G: STORIES & VALUES (#stories)
         ==================================================================== */}
      <section
        id="stories"
        aria-label="Zine Stories and 18+ Community Values"
        className="relative py-20 lg:py-28 border-b border-[#F4F0E8]/15 overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Faux-Negative Film Strip Header */}
          <div className="mb-10 bg-[#141414] border-y-2 border-dashed border-[#F4F0E8]/25 py-2.5 px-4 flex items-center justify-between text-[11px] font-mono-code uppercase tracking-widest text-[#AAA8A6] overflow-x-auto whitespace-nowrap gap-8">
            <span>35MM CONTACT SHEET &bull; FRAME 24A</span>
            <span className="text-[#C92533]">ILLUSTRATIVE STORIES (FICTIONAL DEMO SCENARIOS)</span>
            <span>NO FABRICATED ENDORSEMENTS</span>
            <span>18+ ADULT MUSIC COMMUNITY</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Cols: Interactive Zine Article Vignette Carousel */}
            <div className="lg:col-span-7 bg-[#141414] border border-[#F4F0E8]/20 p-6 sm:p-9 rounded-[4px] relative">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#F4F0E8]/15">
                <span className="text-xs font-mono-code uppercase text-[#C92533]">
                  {activeStory.issueTag}
                </span>
                <span
                  className="text-xs font-mono-code text-[#AAA8A6] tabular-nums"
                  aria-live="polite"
                >
                  SLIDE {slideIndex + 1} OF {FICTIONAL_VIGNETTES.length}
                </span>
              </div>

              <h2 className="mt-5 font-editorial font-bold text-2xl sm:text-4xl text-[#F4F0E8] leading-tight">
                {activeStory.headline}
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-mono-code text-[#AAA8A6]">
                <span className="text-[#F4F0E8] font-semibold">{activeStory.names}</span>
                <span aria-hidden="true">&bull;</span>
                <span>{activeStory.sharedAnchor}</span>
              </div>

              <p className="mt-5 text-base text-[#AAA8A6] leading-relaxed">
                {activeStory.storyBody}
              </p>

              <blockquote className="mt-6 p-5 bg-[#0B0B0B] border border-[#F4F0E8]/15 rounded-[3px] font-editorial italic text-lg sm:text-xl text-[#F4F0E8]">
                {activeStory.quote}
              </blockquote>

              <p className="mt-3 text-[11px] font-mono-code text-[#777575]">
                * {activeStory.footnote}
              </p>

              {/* Carousel Controls */}
              <div className="mt-7 pt-5 border-t border-[#F4F0E8]/15 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  aria-label="Previous story vignette"
                  className="px-4 py-2 text-xs font-mono-code uppercase border border-[#F4F0E8]/35 text-[#F4F0E8] hover:border-[#F4F0E8] rounded-[3px] transition-colors cursor-pointer whitespace-nowrap"
                >
                  &larr; Prev Story
                </button>

                <div className="flex items-center gap-2" role="tablist" aria-label="Story slides">
                  {FICTIONAL_VIGNETTES.map((v, i) => (
                    <button
                      key={v.id}
                      type="button"
                      role="tab"
                      aria-selected={i === slideIndex}
                      aria-label={`View story ${i + 1}`}
                      onClick={() => setSlideIndex(i)}
                      className={`px-2.5 py-1 text-xs font-mono-code rounded-[2px] cursor-pointer ${
                        i === slideIndex
                          ? 'bg-[#C92533] text-[#F4F0E8] font-bold'
                          : 'bg-[#0B0B0B] text-[#AAA8A6] border border-[#F4F0E8]/20'
                      }`}
                    >
                      0{i + 1}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNextSlide}
                  aria-label="Next story vignette"
                  className="px-4 py-2 text-xs font-mono-code uppercase bg-[#C92533] text-[#F4F0E8] hover:bg-[#b51f2c] rounded-[3px] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Next Story &rarr;
                </button>
              </div>
            </div>

            {/* Right 5 Cols: 18+ Safety, Consent & Proposed Architecture */}
            <div className="lg:col-span-5 bg-[#141414] border border-[#F4F0E8]/20 p-6 sm:p-8 rounded-[4px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#C92533]">
                  COMMUNITY STANDARDS &amp; SAFETY
                </span>
                <span className="px-2 py-0.5 bg-[#0B0B0B] border border-[#F4F0E8]/30 text-[11px] font-mono-code text-[#F4F0E8]">
                  STRICTLY 18+
                </span>
              </div>

              <h3 className="mt-3 font-editorial font-bold text-2xl sm:text-3xl text-[#F4F0E8]">
                Built for music heads, not gatekeepers.
              </h3>

              <p className="mt-2.5 text-sm text-[#AAA8A6] leading-relaxed">
                Whether you know every shoegaze pedal setting or just found your first post-punk playlist last week, Riff is a welcoming 18+ space built on consent, curiosity, and zero snobbery.
              </p>

              <div className="mt-6 space-y-4">
                <div className="p-4 bg-[#0B0B0B] border border-[#F4F0E8]/15 rounded-[3px]">
                  <div className="text-xs font-mono-code uppercase text-[#F4F0E8] font-semibold">
                    1. Taste Before Portrait Privacy (Proposed App Feature)
                  </div>
                  <p className="mt-1 text-xs text-[#AAA8A6] leading-relaxed">
                    In the proposed native Riff product, portraits remain secondary until both people choose to connect over shared artists or prompts.
                  </p>
                </div>

                <div className="p-4 bg-[#0B0B0B] border border-[#F4F0E8]/15 rounded-[3px]">
                  <div className="text-xs font-mono-code uppercase text-[#F4F0E8] font-semibold">
                    2. One-Tap Block, Report &amp; Venue Safety (Proposed App Feature)
                  </div>
                  <p className="mt-1 text-xs text-[#AAA8A6] leading-relaxed">
                    Proposed product controls include instant unmatch/block, human-reviewed harassment reporting, and never exposing live GPS venue check-ins.
                  </p>
                </div>

                <div className="p-4 bg-[#0B0B0B] border border-[#C92533]/45 rounded-[3px]">
                  <div className="text-xs font-mono-code uppercase text-[#C92533] font-semibold">
                    3. Honest Web Demo Privacy
                  </div>
                  <p className="mt-1 text-xs text-[#AAA8A6] leading-relaxed">
                    This marketing site is a standalone front-end product preview. We never collect personal data, never require a real login, and keep your Taste Matcher selections in local memory only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION H: FINAL CTA + RECORD SLEEVE FOOTER
         ==================================================================== */}
      <section
        aria-label="Join the Riff final call to action"
        className="relative py-24 lg:py-32 border-b border-[#F4F0E8]/20 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="halftone-patch-crimson absolute -bottom-10 right-10 w-96 h-72 opacity-40 pointer-events-none"
        />

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 text-xs font-mono-code uppercase tracking-widest text-[#AAA8A6]">
                <HandStar className="w-7 h-7 text-[#C92533]" variant={3} />
                <span>SIDE B · RUNOUT GROOVE</span>
              </div>

              <h2 className="mt-4 font-editorial font-black text-4xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight text-[#F4F0E8] text-balance">
                YOUR NEXT FAVORITE PERSON MIGHT HAVE{' '}
                <span className="italic text-[#C92533]">
                  YOUR NEXT FAVORITE SONG.
                </span>
              </h2>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenPreviewModal('Final CTA — Join the Riff')}
                  className="btn-screenprint bg-[#C92533] hover:bg-[#b51f2c] text-[#F4F0E8] font-medium text-base sm:text-lg px-8 py-4 rounded-[4px] border border-[#C92533] cursor-pointer whitespace-nowrap"
                >
                  Join the Riff
                </button>

                <a
                  href="#music-chemistry"
                  className="btn-screenprint bg-transparent hover:bg-[#F4F0E8]/8 text-[#F4F0E8] font-medium text-base sm:text-lg px-7 py-4 rounded-[4px] border border-[#F4F0E8]/75 whitespace-nowrap"
                >
                  Explore Music Chemistry
                </a>
              </div>
            </div>

            {/* Large Slow-Turning Red-Label Vinyl Punctuation */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <VinylDisc
                className="w-64 h-64 sm:w-72 sm:h-72"
                labelSide={footerVinylSide}
                interactive
                onFlip={() =>
                  setFooterVinylSide((s) => (s === 'A' ? 'B' : 'A'))
                }
              />
              <span className="mt-3 text-xs font-mono-code text-[#AAA8A6] uppercase">
                Click vinyl to flip label (Side {footerVinylSide})
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Record Sleeve Footer */}
      <footer className="bg-[#0B0B0B] py-12 text-xs font-mono-code text-[#AAA8A6]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-[#F4F0E8]/15">
            {/* Brand Lockup */}
            <div className="flex items-center gap-4">
              <a
                href="#home"
                className="flex items-center gap-2.5 text-[#F4F0E8] hover:opacity-90"
              >
                <WaveformLogo className="w-8 h-7" />
                <span className="font-editorial font-black text-2xl tracking-tight">
                  Riff
                </span>
              </a>
              <span className="text-[#777575]">|</span>
              <div className="w-32">
                <MusicGreaterLooksScrawl showUnderline={false} />
              </div>
            </div>

            {/* Working Anchor Links + Motion Control */}
            <div className="flex flex-wrap items-center gap-6">
              <a href="#how-it-works" className="hover:text-[#F4F0E8] transition-colors">
                How It Works
              </a>
              <a href="#music-chemistry" className="hover:text-[#F4F0E8] transition-colors">
                Chemistry
              </a>
              <a href="#playlists" className="hover:text-[#F4F0E8] transition-colors">
                Playlists
              </a>
              <a href="#stories" className="hover:text-[#F4F0E8] transition-colors">
                Stories
              </a>
              <button
                type="button"
                onClick={onToggleMotion}
                aria-pressed={!motionEnabled}
                className="px-3 py-1.5 border border-[#F4F0E8]/25 rounded-[3px] text-[#F4F0E8] hover:border-[#C92533] transition-colors cursor-pointer whitespace-nowrap"
              >
                {motionEnabled ? 'Pause Ambient Motion' : 'Resume Ambient Motion'}
              </button>
              <a
                href="#home"
                className="px-3 py-1.5 bg-[#141414] border border-[#F4F0E8]/25 text-[#F4F0E8] hover:border-[#F4F0E8] rounded-[3px] whitespace-nowrap"
              >
                BACK TO THE TOP &#8599;
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#777575]">
            <p>
              &copy; 2026 RIFF PRESSING CO. · 18+ MUSIC-FIRST DATING CONCEPT DEMO · ALL ARTISTS &amp; SCENARIOS ILLUSTRATIVE.
            </p>
            <p className="text-[#AAA8A6]">
              FALL FOR THE SOUND BEFORE THE SELFIE.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
