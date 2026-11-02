'use client';

import React, { useState } from 'react';
import { HandStar, MusicGreaterLooksScrawl } from './ZineMotifs';

interface PrincipleItem {
  id: string;
  number: string;
  title: string;
  shortLine: string;
  expandedDetail: string;
  zineNote: string;
}

const PRINCIPLES: PrincipleItem[] = [
  {
    id: 'taste-first',
    number: '01.',
    title: 'Taste first',
    shortLine: 'Profiles open with your rotation, last three gigs, and desert-island records — never a full-screen selfie carousel.',
    expandedDetail:
      'Photos stay softly tucked inside a secondary sleeve until you have actually read what someone listens to at 1 A.M. You never swipe on a face in isolation.',
    zineNote: 'NO EGO SWIPING · CRATE BEFORE CAMERA',
  },
  {
    id: 'connection-second',
    number: '02.',
    title: 'Connection second',
    shortLine: 'Every match comes with a real reason you overlapped and a specific track or album memory to break the ice.',
    expandedDetail:
      'Instead of "hey, how was your weekend?", Riff highlights the exact post-punk B-side, shoegaze pedal tone, or late-night playlist habit you share.',
    zineNote: 'ZERO DEAD OPENERS · SONG-LED PROMPTS',
  },
  {
    id: 'meet-when-ready',
    number: '03.',
    title: 'Meet when ready',
    shortLine: 'Trade a three-song mini-mix, talk about a record sleeve, and suggest catching a local support band when the vibe clicks.',
    expandedDetail:
      'Designed for 18+ music lovers who prefer low-pressure coffee near a record shop or a £10 basement gig over high-stakes dinner interviews.',
    zineNote: '18+ COMMUNITY · RESPECTFUL PACE',
  },
];

interface TrackStep {
  index: number;
  trackCode: string;
  duration: string;
  title: string;
  subtitle: string;
  description: string;
  ticketStamp: string;
  ticketSerial: string;
  previewChips: string[];
  sampleOutput: string;
}

const HOW_IT_WORKS_STEPS: TrackStep[] = [
  {
    index: 0,
    trackCode: 'TRACK 01 / SIDE A',
    duration: '0:00 — 1:18',
    title: 'Drop your favorites',
    subtitle: 'Choose genres, artists, and listening moods.',
    description:
      'Build your sonic liner notes in two minutes: pick your core scenes (from shoegaze and post-punk to alt folk and darkwave), pin three records you never skip, and tag how you actually listen.',
    ticketStamp: 'STATION 01 · PRESSING PLANT',
    ticketSerial: 'RF-010184',
    previewChips: ['Shoegaze', 'Post-Punk', 'Fontaines D.C.', 'Night Drives', 'Vinyl Crate'],
    sampleOutput: 'Crate logged: 4 core scenes · 3 anchor artists · 2 nocturnal rituals',
  },
  {
    index: 1,
    trackCode: 'TRACK 02 / SIDE A',
    duration: '1:19 — 2:44',
    title: 'Find your overlap',
    subtitle: 'See shared interests and why a pairing might click.',
    description:
      'Riff maps where your crates intersect — not with a mysterious black-box romance score, but by surfacing shared artists, mutual sub-genres, and compatible concert energy.',
    ticketStamp: 'STATION 02 · SOUNDCHECK OVERLAP',
    ticketSerial: 'RF-020910',
    previewChips: ['91% Taste Overlap', 'Shared: Phoebe Bridgers', 'Both love 200-cap gigs'],
    sampleOutput: 'Overlap found: 3 shared artists + mutual late-night album listening habit',
  },
  {
    index: 2,
    trackCode: 'TRACK 03 / SIDE B',
    duration: '2:45 — 4:02',
    title: 'Start a conversation',
    subtitle: 'Use real prompts about a song or memory.',
    description:
      'Skip the small talk. Tap any shared track or album sleeve to send a specific music question — like asking which song on "Punisher" they play on rainy train rides home.',
    ticketStamp: 'STATION 03 · FRONT BARRIER HELLO',
    ticketSerial: 'RF-030442',
    previewChips: ['Ask about "Punisher"', 'Trade a 3-song mix', 'Compare first gigs'],
    sampleOutput: 'Icebreaker queued: "Which track on Souvlaki do you play loudest?"',
  },
];

export function ManifestoAndHowItWorks() {
  const [expandedPrinciples, setExpandedPrinciples] = useState<string[]>(['taste-first']);
  const [revealSongQuote, setRevealSongQuote] = useState<boolean>(true);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const togglePrinciple = (id: string) => {
    setExpandedPrinciples((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentTrack = HOW_IT_WORKS_STEPS[activeStepIndex];
  const progressPercent = ((activeStepIndex + 1) / HOW_IT_WORKS_STEPS.length) * 100;

  return (
    <>
      {/* ====================================================================
          SECTION B: MANIFESTO — MUSIC BEFORE LOOKS
         ==================================================================== */}
      <section
        id="manifesto"
        aria-label="Riff Manifesto: Music before looks"
        className="relative py-20 lg:py-28 border-b border-[#F4F0E8]/15 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="halftone-patch-crimson absolute top-12 left-6 w-64 h-48 opacity-40 pointer-events-none -rotate-6"
        />

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Zine Issue Header Line */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#F4F0E8]/20">
            <div className="flex items-center gap-3 text-xs font-mono-code uppercase tracking-widest text-[#AAA8A6]">
              <span>ISSUE 01 · EDITORIAL MANIFESTO</span>
              <span aria-hidden="true">&bull;</span>
              <span className="text-[#C92533]">SOUND OVER SELFIE</span>
            </div>
            <div className="w-40">
              <MusicGreaterLooksScrawl showUnderline={false} />
            </div>
          </div>

          {/* Wheat-Pasted Torn Poster Statement */}
          <div className="mt-12 lg:mt-16 relative">
            <div className="space-y-3 sm:space-y-4">
              {/* Strip 1 */}
              <div className="inline-block torn-paper-strip bg-[#F4F0E8] text-[#0B0B0B] px-5 sm:px-8 py-2.5 sm:py-3 transform -rotate-[1.1deg] shadow-xl">
                <span className="font-condensed font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase">
                  THERE&rsquo;S MORE TO A PERSON
                </span>
              </div>

              <br />

              {/* Strip 2 */}
              <div className="inline-block torn-paper-strip bg-[#C92533] text-[#F4F0E8] px-5 sm:px-8 py-2.5 sm:py-4 transform rotate-[0.9deg] shadow-xl sm:ml-10">
                <span className="font-editorial italic font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight">
                  THAN A PHOTO.
                </span>
              </div>
            </div>

            {/* Pull-apart interactive reveal banner: "A shared song is a better hello." */}
            <div className="mt-10 sm:mt-12 p-6 sm:p-8 bg-[#141414] border border-[#F4F0E8]/20 rounded-[4px] relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start sm:items-center gap-4">
                  <HandStar className="w-10 h-10 shrink-0 text-[#C92533]" variant={2} />
                  <div>
                    <div className="text-xs font-mono-code uppercase tracking-widest text-[#AAA8A6]">
                      The Riff Premise
                    </div>
                    <p className="mt-1 font-editorial italic text-2xl sm:text-4xl text-[#F4F0E8]">
                      &ldquo;A shared song is a better hello.&rdquo;
                    </p>
                    {revealSongQuote && (
                      <p className="mt-2 text-sm sm:text-base text-[#AAA8A6] max-w-2xl">
                        Swiping through silent headshots tells you who has good lighting. Seeing someone&rsquo;s 2 A.M. shoegaze playlist, favorite small venue, and desert-island LP tells you what it actually feels like to sit next to them on the night train.
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setRevealSongQuote((prev) => !prev)}
                  aria-expanded={revealSongQuote}
                  className="self-start md:self-center px-4 py-2 text-xs font-mono-code uppercase tracking-wider border border-[#F4F0E8]/35 text-[#F4F0E8] hover:border-[#C92533] hover:text-[#C92533] rounded-[3px] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {revealSongQuote ? 'Fold Liner Notes' : 'Read Liner Notes'}
                </button>
              </div>
            </div>
          </div>

          {/* 3 Product Principles with Expand-in-Place Reveals */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRINCIPLES.map((item) => {
              const isExpanded = expandedPrinciples.includes(item.id);
              return (
                <article
                  key={item.id}
                  className="bg-[#141414] border border-[#F4F0E8]/20 p-6 sm:p-7 rounded-[4px] flex flex-col justify-between transition-colors hover:border-[#F4F0E8]/45"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-code text-[#AAA8A6]">
                      <span className="text-[#C92533] font-semibold">{item.number}</span>
                      <span>{item.zineNote}</span>
                    </div>

                    <h2 className="mt-3 font-editorial font-bold text-2xl sm:text-3xl text-[#F4F0E8]">
                      {item.title}
                    </h2>

                    <p className="mt-3 text-sm sm:text-base text-[#AAA8A6] leading-relaxed">
                      {item.shortLine}
                    </p>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-[#F4F0E8]/15 text-sm text-[#F4F0E8]/90 leading-relaxed">
                        {item.expandedDetail}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => togglePrinciple(item.id)}
                    aria-expanded={isExpanded}
                    className="mt-6 pt-3 border-t border-[#F4F0E8]/10 flex items-center justify-between w-full text-xs font-mono-code uppercase tracking-wider text-[#F4F0E8] hover:text-[#C92533] transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Collapse Principle' : 'Expand Principle'}</span>
                    <span aria-hidden="true" className="text-base leading-none">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION C: HOW IT WORKS — THE FIRST THREE TRACKS
         ==================================================================== */}
      <section
        id="how-it-works"
        aria-label="How Riff matching works in three tracks"
        className="relative py-20 lg:py-28 border-b border-[#F4F0E8]/15 overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-xs font-mono-code uppercase tracking-widest text-[#C92533]">
                01. HOW MATCHING WORKS · THE FIRST THREE TRACKS
              </div>
              <h2 className="mt-2 font-editorial font-bold text-3xl sm:text-5xl text-[#F4F0E8] tracking-tight">
                Less swipe. More soundtrack.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#AAA8A6] max-w-md">
              Click any track station below or scrub the groove rail to pass the ticket stub from crate curation to your first conversation.
            </p>
          </div>

          {/* Music-Player Progress Rail & Animated Groove */}
          <div className="mt-10 bg-[#141414] border border-[#F4F0E8]/20 p-5 sm:p-7 rounded-[4px]">
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-[#AAA8A6] mb-3">
              <span>PLAYHEAD: {currentTrack.trackCode}</span>
              <span className="tabular-nums">{currentTrack.duration}</span>
            </div>

            {/* Interactive SVG Groove Waveform Progress Bar */}
            <div className="relative h-12 flex items-center">
              <div className="w-full h-1.5 bg-[#0B0B0B] border border-[#F4F0E8]/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C92533] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Station Nodes on the Rail */}
              <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-8 pointer-events-none">
                {HOW_IT_WORKS_STEPS.map((step) => {
                  const reached = step.index <= activeStepIndex;
                  const isCurrent = step.index === activeStepIndex;
                  return (
                    <button
                      key={step.trackCode}
                      type="button"
                      onClick={() => setActiveStepIndex(step.index)}
                      aria-label={`Jump to ${step.title}`}
                      className={`pointer-events-auto px-3 py-1.5 rounded-[3px] text-xs font-mono-code uppercase tracking-wider border transition-all cursor-pointer whitespace-nowrap ${
                        isCurrent
                          ? 'bg-[#C92533] text-[#F4F0E8] border-[#F4F0E8] scale-105 shadow-lg'
                          : reached
                          ? 'bg-[#1D1D20] text-[#F4F0E8] border-[#C92533]/60'
                          : 'bg-[#0B0B0B] text-[#AAA8A6] border-[#F4F0E8]/25 hover:border-[#F4F0E8]/60'
                      }`}
                    >
                      0{step.index + 1}. {step.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Traveling Paper Ticket Pass + Active Station Breakdown */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left 5 Cols: Travelling Perforated Paper Ticket */}
              <div className="lg:col-span-5 flex items-center justify-center bg-[#0B0B0B] border border-[#F4F0E8]/15 p-6 rounded-[4px] relative overflow-hidden">
                <div
                  aria-hidden="true"
                  className="halftone-patch absolute inset-0 opacity-25 pointer-events-none"
                />

                <div
                  className="ticket-perforated relative z-10 w-full max-w-sm bg-[#EAE3D5] text-[#0B0B0B] p-5 shadow-2xl transition-transform duration-300"
                  style={{
                    transform: `rotate(${
                      activeStepIndex === 0 ? '-2deg' : activeStepIndex === 1 ? '1.5deg' : '-1deg'
                    })`,
                  }}
                >
                  <div className="border-2 border-[#0B0B0B] p-4">
                    <div className="flex items-center justify-between border-b border-[#0B0B0B]/40 pb-2 text-[10px] font-mono-code uppercase">
                      <span className="font-bold">{currentTrack.ticketStamp}</span>
                      <span>#{currentTrack.ticketSerial}</span>
                    </div>

                    <div className="mt-3 font-condensed font-extrabold text-3xl uppercase leading-none tracking-tight">
                      0{currentTrack.index + 1}. {currentTrack.title}
                    </div>

                    <p className="mt-1.5 text-xs font-medium text-[#141414]/80">
                      {currentTrack.subtitle}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {currentTrack.previewChips.map((chip) => (
                        <span
                          key={chip}
                          className="px-2 py-0.5 bg-[#0B0B0B] text-[#F4F0E8] text-[10px] font-mono-code uppercase"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 pt-2 border-t border-dashed border-[#0B0B0B]/50 flex items-center justify-between text-[10px] font-mono-code">
                      <span className="text-[#C92533] font-bold">ADMIT TWO · 18+</span>
                      <span>MUSIC &gt; LOOKS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 7 Cols: Station Details & Step Controls */}
              <div className="lg:col-span-7 flex flex-col justify-between bg-[#0B0B0B] border border-[#F4F0E8]/15 p-6 sm:p-8 rounded-[4px]">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono-code uppercase text-[#C92533]">
                      {currentTrack.trackCode}
                    </span>
                    <span className="text-xs font-mono-code text-[#AAA8A6] tabular-nums">
                      STEP {currentTrack.index + 1} OF 3
                    </span>
                  </div>

                  <h3 className="mt-2 font-editorial font-bold text-2xl sm:text-4xl text-[#F4F0E8]">
                    {currentTrack.title}
                  </h3>

                  <p className="mt-3 text-base text-[#AAA8A6] leading-relaxed">
                    {currentTrack.description}
                  </p>

                  <div className="mt-6 p-4 bg-[#141414] border border-[#F4F0E8]/15 rounded-[3px]">
                    <div className="text-[11px] font-mono-code uppercase text-[#AAA8A6]">
                      Live Station Output
                    </div>
                    <div className="mt-1 text-sm font-mono-code text-[#F4F0E8]">
                      {currentTrack.sampleOutput}
                    </div>
                  </div>
                </div>

                {/* Previous / Next Track Controls */}
                <div className="mt-8 pt-4 border-t border-[#F4F0E8]/15 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex((i) => (i > 0 ? i - 1 : HOW_IT_WORKS_STEPS.length - 1))}
                    className="px-4 py-2 text-xs font-mono-code uppercase border border-[#F4F0E8]/30 text-[#F4F0E8] hover:border-[#F4F0E8] rounded-[3px] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    &larr; Previous Track
                  </button>

                  <div className="flex items-center gap-2">
                    {HOW_IT_WORKS_STEPS.map((s) => (
                      <button
                        key={s.index}
                        type="button"
                        onClick={() => setActiveStepIndex(s.index)}
                        aria-label={`Select Track 0${s.index + 1}`}
                        className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                          s.index === activeStepIndex ? 'bg-[#C92533]' : 'bg-[#F4F0E8]/25'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveStepIndex((i) => (i + 1) % HOW_IT_WORKS_STEPS.length)}
                    className="px-4 py-2 text-xs font-mono-code uppercase bg-[#C92533] text-[#F4F0E8] hover:bg-[#b51f2c] rounded-[3px] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Next Track &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
