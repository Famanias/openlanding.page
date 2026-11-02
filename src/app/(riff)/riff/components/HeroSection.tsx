'use client';

import React, { useState } from 'react';
import {
  HandStar,
  MusicGreaterLooksScrawl,
  VinylDisc,
} from './ZineMotifs';

interface HeroSectionProps {
  motionEnabled: boolean;
  onOpenPreviewModal: (source: string) => void;
}

interface SharedTrackItem {
  id: string;
  title: string;
  artist: string;
  album: string;
  thumb: string;
  icebreaker: string;
  sharedStat: string;
}

const HERO_SHARED_TRACKS: SharedTrackItem[] = [
  {
    id: 'kyoto',
    title: 'Kyoto',
    artist: 'Phoebe Bridgers',
    album: 'Punisher',
    thumb: '/templates/riff/album-kyoto.jpg',
    icebreaker: 'Ask them about "Punisher"',
    sharedStat: 'Both played after midnight 4x this week',
  },
  {
    id: 'starburster',
    title: 'Starburster',
    artist: 'Fontaines D.C.',
    album: 'Romance',
    thumb: '/templates/riff/shared-track-2.jpg',
    icebreaker: 'Ask which Fontaines D.C. opener hit hardest live',
    sharedStat: 'Top 2% overlap on Dublin post-punk',
  },
  {
    id: 'chaise',
    title: 'Chaise Longue',
    artist: 'Wet Leg',
    album: 'Wet Leg',
    thumb: '/templates/riff/shared-track-3.jpg',
    icebreaker: 'Ask about their loudest basement gig memory',
    sharedStat: 'Saved on both "Walk to the Train" playlists',
  },
];

export function HeroSection({
  motionEnabled,
  onOpenPreviewModal,
}: HeroSectionProps) {
  // Interactive state inside the two Hero phones
  const [phone1Tab, setPhone1Tab] = useState<'profile' | 'dna'>('profile');
  const [selectedArtists, setSelectedArtists] = useState<string[]>([
    'Fontaines D.C.',
    'Wet Leg',
    'Phoebe Bridgers',
  ]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([
    'SHOEGAZE',
    'POST-PUNK',
    'LATE-NIGHT INDIE',
  ]);
  const [activeTrackId, setActiveTrackId] = useState<string>('kyoto');
  const [kyotoExpanded, setKyotoExpanded] = useState<boolean>(false);
  const [waveformActive, setWaveformActive] = useState<boolean>(false);
  const [vinylSide, setVinylSide] = useState<'A' | 'B'>('A');
  const [activeTicketNote, setActiveTicketNote] = useState<string | null>(null);
  const [mobilePhoneFocus, setMobilePhoneFocus] = useState<'both' | 'phone1' | 'phone2'>('both');

  // Subtle pointer counter-parallax state
  const [pointerOffset, setPointerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!motionEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setPointerOffset({ x: nx, y: ny });
  };

  const handlePointerLeave = () => {
    setPointerOffset({ x: 0, y: 0 });
  };

  const toggleArtist = (artist: string) => {
    setSelectedArtists((prev) =>
      prev.includes(artist)
        ? prev.length > 1
          ? prev.filter((a) => a !== artist)
          : prev
        : [...prev, artist]
    );
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.length > 1
          ? prev.filter((g) => g !== genre)
          : prev
        : [...prev, genre]
    );
  };

  // Deterministic demo scores derived from active selections (defaults to 94% on Phone 1 and 91% on Phone 2)
  const totalSelected = selectedArtists.length + selectedGenres.length;
  const phone1Score = 82 + totalSelected * 2; // 6 items -> 94%
  const phone2Score = 79 + totalSelected * 2; // 6 items -> 91%

  const activeSharedTrack =
    HERO_SHARED_TRACKS.find((t) => t.id === activeTrackId) || HERO_SHARED_TRACKS[0];

  const waveformHeights = [
    18, 28, 14, 34, 48, 22, 64, 38, 86, 52, 30, 74, 95, 44, 62, 82, 36, 58, 90, 42, 68, 32, 46, 24, 16,
  ];

  return (
    <section
      id="home"
      aria-label="Riff hero introduction"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative min-h-[calc(100vh-76px)] w-full overflow-hidden pt-6 pb-16 lg:py-12 border-b border-[#F4F0E8]/15"
    >
      {/* Concentrated halftone dot patches in lower-left and upper-right corners */}
      <div
        aria-hidden="true"
        className="halftone-patch absolute -bottom-12 -left-10 w-80 h-64 opacity-55 pointer-events-none rotate-6"
      />
      <div
        aria-hidden="true"
        className="halftone-patch-fine absolute top-10 right-0 w-96 h-80 opacity-45 pointer-events-none -rotate-3"
      />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          {/* LEFT EDITORIAL COLUMN (~48% on desktop -> 6 cols) */}
          <div className="lg:col-span-6 z-20 flex flex-col items-start text-left pr-0 lg:pr-2">
            <h1 className="font-editorial font-black tracking-[-0.03em] leading-[0.98] text-[#F4F0E8] select-none sm:select-text">
              <span className="block text-[3.1rem] sm:text-[4.35rem] lg:text-[4.55rem] xl:text-[5.15rem] reveal-paper-slit-1">
                &ldquo;Fall for
              </span>
              <span className="block italic font-extrabold text-[#C92533] text-[3.35rem] sm:text-[4.65rem] lg:text-[4.85rem] xl:text-[5.5rem] tracking-[-0.02em] my-0.5 transform -skew-x-3 reveal-paper-slit-2">
                the sound
              </span>
              <span className="block text-[2.45rem] sm:text-[3.85rem] lg:text-[3.95rem] xl:text-[4.55rem] sm:whitespace-nowrap reveal-paper-slit-3">
                before the selfie.&rdquo;
              </span>
            </h1>

            <p className="mt-7 sm:mt-8 max-w-[34rem] text-[1.08rem] sm:text-[1.35rem] leading-[1.48] text-[#AAA8A6] font-normal">
              A music-first dating app that matches people through playlists,
              genres, favorite artists, and listening chemistry.
            </p>

            {/* Primary & Secondary Rectangular CTAs */}
            <div className="mt-8 sm:mt-9 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onOpenPreviewModal('Hero — Download the App')}
                className="btn-screenprint bg-[#C92533] hover:bg-[#b51f2c] text-[#F4F0E8] font-medium text-base sm:text-[1.08rem] px-7 py-4 rounded-[4px] border border-[#C92533] whitespace-nowrap shrink-0 cursor-pointer"
              >
                Download the App
              </button>

              <a
                href="#how-it-works"
                className="btn-screenprint bg-transparent hover:bg-[#F4F0E8]/8 text-[#F4F0E8] font-medium text-base sm:text-[1.08rem] px-7 py-4 rounded-[4px] border border-[#F4F0E8]/75 whitespace-nowrap shrink-0"
              >
                See How Matching Works
              </a>
            </div>

            {/* Feature rail matching screenshot bottom-left */}
            <div className="mt-10 sm:mt-12 pt-2 w-full">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[0.78rem] sm:text-[0.86rem] font-condensed tracking-[0.09em] uppercase text-[#AAA8A6]">
                <span>PLAYLIST MATCHING</span>
                <span aria-hidden="true" className="text-[#F4F0E8]/50">
                  &bull;
                </span>
                <span className="relative text-[#F4F0E8]/90">
                  TASTE COMPATIBILITY
                  <svg
                    viewBox="0 0 140 6"
                    className="absolute -bottom-1.5 left-0 w-full h-1.5 text-[#F4F0E8]/40 pointer-events-none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 3 Q70 1 138 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
                <span aria-hidden="true" className="text-[#F4F0E8]/50">
                  &bull;
                </span>
                <span>SHARED ARTISTS</span>
                <span aria-hidden="true" className="text-[#F4F0E8]/50">
                  &bull;
                </span>
                <span>CONVERSATION STARTERS</span>
              </div>

              {/* Subtle interactive hint for screen readers & curious users */}
              <p
                className="mt-3 text-xs font-mono-code text-[#777575]"
                aria-live="polite"
              >
                Interactive demo phones: click artists, genres, or shared tracks on the devices to recalculate taste overlap ({phone1Score}% / {phone2Score}%).
              </p>
            </div>
          </div>

          {/* RIGHT COLLAGE COLUMN (~52% on desktop -> 6 cols) */}
          <div className="lg:col-span-6 relative z-10">
            {/* Mobile compact switcher so small viewports can inspect either phone cleanly */}
            <div className="flex sm:hidden items-center justify-between gap-2 mb-4 p-1.5 bg-[#141414] border border-[#F4F0E8]/20 rounded-[4px]">
              <button
                type="button"
                onClick={() => setMobilePhoneFocus('both')}
                className={`flex-1 py-1.5 text-xs font-mono-code uppercase rounded-[2px] whitespace-nowrap ${
                  mobilePhoneFocus === 'both'
                    ? 'bg-[#C92533] text-[#F4F0E8]'
                    : 'text-[#AAA8A6]'
                }`}
              >
                Collage View
              </button>
              <button
                type="button"
                onClick={() => setMobilePhoneFocus('phone1')}
                className={`flex-1 py-1.5 text-xs font-mono-code uppercase rounded-[2px] whitespace-nowrap ${
                  mobilePhoneFocus === 'phone1'
                    ? 'bg-[#C92533] text-[#F4F0E8]'
                    : 'text-[#AAA8A6]'
                }`}
              >
                Mila (94%)
              </button>
              <button
                type="button"
                onClick={() => setMobilePhoneFocus('phone2')}
                className={`flex-1 py-1.5 text-xs font-mono-code uppercase rounded-[2px] whitespace-nowrap ${
                  mobilePhoneFocus === 'phone2'
                    ? 'bg-[#C92533] text-[#F4F0E8]'
                    : 'text-[#AAA8A6]'
                }`}
              >
                Match (91%)
              </button>
            </div>

            {/* Collage Stage */}
            <div className="relative w-full min-h-[600px] sm:min-h-[690px] flex items-center justify-center">
              {/* 1. Top-Right / Center Background Vinyl peeking behind Phone 1 & 2 */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute -top-6 left-[34%] z-0 opacity-85"
                style={{
                  transform: `translate(${pointerOffset.x * -6}px, ${pointerOffset.y * -6}px)`,
                }}
              >
                <VinylDisc className="w-44 h-44" labelSide={vinylSide} />
              </div>

              {/* 2. Left Vinyl Record with Crimson Center Label peeking behind Phone 1 */}
              <div
                className="absolute top-[41%] -left-8 sm:-left-4 z-0"
                style={{
                  transform: `translate(${pointerOffset.x * -8}px, ${pointerOffset.y * 5}px)`,
                }}
              >
                <VinylDisc
                  className="w-44 h-44 sm:w-52 sm:h-52"
                  labelSide={vinylSide}
                  interactive
                  onFlip={() => setVinylSide((s) => (s === 'A' ? 'B' : 'A'))}
                />
              </div>

              {/* 3. Hand-drawn stars matching reference positions */}
              <div className="absolute top-[3%] left-[2%] sm:left-[2%] z-20">
                <HandStar
                  className="w-9 h-9 sm:w-11 sm:h-11"
                  variant={1}
                  interactive
                  label="Pin top star sticker"
                />
              </div>
              <div className="absolute top-[11%] left-[-1%] sm:left-[-1%] z-20">
                <HandStar className="w-8 h-8 sm:w-9 sm:h-9 -rotate-12" variant={2} />
              </div>
              <div className="absolute bottom-[25%] left-[-2%] sm:left-[-1%] z-20">
                <HandStar
                  className="w-9 h-9 sm:w-10 sm:h-10 rotate-6"
                  variant={3}
                  interactive
                  label="Pin lower star sticker"
                />
              </div>

              {/* 4. Perforated Ticket Stubs (Upper Left: Red 569614 + Cream 795965757) */}
              <button
                type="button"
                onClick={() =>
                  setActiveTicketNote(
                    activeTicketNote === 'lexington'
                      ? null
                      : 'Stub #569614: Late-night shoegaze showcase @ The Lexington · Doors 9 PM'
                  )
                }
                aria-label="Inspect red concert ticket stub 569614"
                className="ticket-perforated absolute top-[20%] left-[-1%] sm:left-[0%] z-10 w-28 sm:w-32 bg-[#B8323C] text-[#141414] p-2.5 shadow-lg transform -rotate-[19deg] hover:-translate-y-1 hover:bg-[#C92533] transition-transform cursor-pointer text-left"
              >
                <div className="border border-[#141414]/40 p-1.5 flex items-center justify-between">
                  <span className="font-mono-code text-[9px] font-bold tracking-tighter [writing-mode:vertical-rl] rotate-180">
                    569614
                  </span>
                  <div className="text-right">
                    <div className="font-mono-code text-[7px] uppercase tracking-wider opacity-75">
                      ADMIT ONE
                    </div>
                    <div className="font-condensed font-extrabold text-lg leading-none tracking-wider">
                      TIC
                    </div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveTicketNote(
                    activeTicketNote === 'windmill'
                      ? null
                      : 'Stub #795965757: Brixton Windmill Post-Punk All-Nighter · £8 Entry'
                  )
                }
                aria-label="Inspect cream concert ticket stub 795965757"
                className="ticket-perforated absolute top-[28%] left-[-1%] sm:left-[0%] z-10 w-28 sm:w-32 bg-[#D8C9AE] text-[#141414] p-2.5 shadow-lg transform -rotate-[14deg] hover:-translate-y-1 transition-transform cursor-pointer text-left"
              >
                <div className="border border-[#141414]/40 p-1.5 flex items-center justify-between">
                  <span className="font-mono-code text-[9px] font-bold tracking-tighter [writing-mode:vertical-rl] rotate-180">
                    795965757
                  </span>
                  <div className="text-right">
                    <div className="font-condensed font-bold text-sm leading-none">
                      TICK
                    </div>
                    <div className="font-condensed font-extrabold text-base leading-none">
                      TICKET
                    </div>
                  </div>
                </div>
              </button>

              {/* Top-center barcode ticket stub ("KICET 6000") */}
              <div
                aria-hidden="true"
                className="hidden sm:block ticket-perforated absolute top-[6%] left-[44%] z-10 w-28 bg-[#D8D3C8] text-[#141414] p-2 shadow-md transform -rotate-[18deg] select-none"
              >
                <div className="border border-[#141414]/35 p-1 flex items-center justify-between">
                  <div>
                    <div className="font-condensed font-extrabold text-sm leading-none">
                      KICET
                    </div>
                    <div className="font-mono-code text-[10px] font-bold">6000</div>
                  </div>
                  <div className="w-3 h-8 bg-[repeating-linear-gradient(0deg,#141414,#141414_1px,transparent_1px,transparent_2px)]" />
                </div>
              </div>

              {/* Lower-left pale ticket stub ("TIC T") */}
              <div
                aria-hidden="true"
                className="hidden sm:block ticket-perforated absolute bottom-[16%] left-[1%] z-10 w-24 bg-[#CFCBC2] text-[#141414] p-2 shadow-md transform -rotate-[16deg] select-none"
              >
                <div className="border border-[#141414]/35 p-1.5 text-right">
                  <div className="font-condensed font-bold text-sm leading-none">TIC</div>
                  <div className="font-condensed font-extrabold text-base leading-none">T</div>
                </div>
              </div>

              {/* Optional ticket stub note toast */}
              {activeTicketNote && (
                <div
                  role="status"
                  className="absolute top-2 left-4 z-50 bg-[#141414] border border-[#C92533] text-[#F4F0E8] px-3 py-2 text-xs font-mono-code rounded-[3px] shadow-xl max-w-xs flex items-center justify-between gap-2"
                >
                  <span>{activeTicketNote}</span>
                  <button
                    type="button"
                    onClick={() => setActiveTicketNote(null)}
                    aria-label="Close ticket note"
                    className="text-[#AAA8A6] hover:text-[#F4F0E8] px-1"
                  >
                    &times;
                  </button>
                </div>
              )}

              {/* 5. Upper-Right Handwritten "MUSIC > LOOKS" Scrawl */}
              <div className="hidden sm:block absolute top-[7%] right-[-2%] xl:right-0 z-20 w-52 transform rotate-[7deg]">
                <MusicGreaterLooksScrawl />
              </div>

              {/* 6. Right-Edge Monochrome Zine Clippings & Bottom-Right "CONCERT FLYER" */}
              <div
                aria-hidden="true"
                className="hidden xl:block absolute top-[24%] -right-8 z-0 w-36 bg-[#EAE5DC] text-[#141414] p-2 shadow-xl transform rotate-[9deg]"
              >
                <div className="h-10 flex items-center justify-center border-b border-black/20">
                  <svg viewBox="0 0 120 32" className="w-full h-7 text-[#141414]">
                    <path
                      d="M2 16 L8 12 L13 22 L18 6 L23 26 L28 10 L33 21 L39 4 L44 28 L49 11 L55 20 L61 8 L66 24 L72 13 L78 19 L84 9 L90 23 L96 14 L103 18 L118 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                </div>
                <img
                  src="/templates/riff/zine-strip-photo.jpg"
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-full h-24 object-cover grayscale contrast-125 mt-1"
                />
              </div>

              {/* Bottom-Right CONCERT FLYER Card matching reference */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute -bottom-6 -right-4 xl:-right-8 z-10 w-44 sm:w-48 bg-[#EFECE4] text-[#0B0B0B] p-2.5 shadow-2xl transform rotate-[8deg] border border-black/20 select-none"
              >
                <div className="font-condensed font-extrabold text-xl leading-none tracking-tight border-b-2 border-[#0B0B0B] pb-1">
                  MUSIC &gt; LOOKS
                </div>
                <div className="my-1.5 bg-[#0B0B0B] overflow-hidden">
                  <img
                    src="/templates/riff/zine-band-photo.jpg"
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-28 object-cover grayscale contrast-125"
                  />
                </div>
                <div className="text-center font-condensed font-extrabold text-sm leading-tight uppercase">
                  CONCERT FLYER
                </div>
                <div className="text-center font-condensed font-bold text-[11px] leading-tight uppercase border-b border-black/30 pb-1">
                  CONCERT = PODCHART
                </div>
                <div className="mt-1 text-[7px] font-mono-code leading-tight text-center uppercase opacity-75">
                  SUBTERRANEAN STAGE &bull; DOORS 21:00 &bull; NO HEADLINER EGO
                </div>
              </div>

              {/* ============================================================
                  PHONE 1 (LEFT): MILA, 24 — LIVE INTERACTIVE PROFILE UI
                 ============================================================ */}
              <div
                className={`relative z-30 w-[285px] sm:w-[295px] rounded-[42px] bg-[#161618] p-[10px] shadow-[0_28px_70px_rgba(0,0,0,0.95)] border-[2.5px] border-[#343438] transition-transform duration-300 ${
                  mobilePhoneFocus === 'phone2' ? 'hidden sm:block' : 'block'
                } ${
                  mobilePhoneFocus === 'both'
                    ? 'sm:absolute sm:top-[4%] sm:left-[6%] -rotate-[4.5deg]'
                    : 'mx-auto rotate-0'
                }`}
                style={
                  mobilePhoneFocus === 'both' && motionEnabled
                    ? {
                        transform: `rotate(-4.5deg) translate(${pointerOffset.x * 7}px, ${
                          pointerOffset.y * 5
                        }px)`,
                      }
                    : undefined
                }
              >
                {/* Inner Phone Screen */}
                <div className="w-full rounded-[33px] bg-[#0D0D0F] text-[#F4F0E8] px-4 pt-3 pb-5 overflow-hidden border border-white/5">
                  {/* iOS Status Bar + Dynamic Island */}
                  <div className="flex items-center justify-between text-[11px] font-semibold tracking-tight px-1 mb-2.5">
                    <span>9:41</span>
                    <div className="w-20 h-4 bg-black rounded-full border border-white/10" />
                    <div className="flex items-center gap-1" aria-hidden="true">
                      <span className="inline-block w-3 h-2.5 border-b-2 border-r-2 border-white/80" />
                      <span className="inline-block w-4 h-2.5 rounded-[2px] bg-white/90" />
                    </div>
                  </div>

                  {/* Interactive Phone Mode Switcher */}
                  <div
                    role="tablist"
                    aria-label="Mila phone screen mode"
                    className="flex items-center gap-1 mb-2.5 bg-[#17171A] p-1 rounded-md border border-white/10"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={phone1Tab === 'profile'}
                      onClick={() => setPhone1Tab('profile')}
                      className={`flex-1 py-1 text-[10px] font-mono-code uppercase rounded transition-colors cursor-pointer whitespace-nowrap ${
                        phone1Tab === 'profile'
                          ? 'bg-[#C92533] text-[#F4F0E8] font-semibold'
                          : 'text-[#AAA8A6] hover:text-[#F4F0E8]'
                      }`}
                    >
                      Music Profile
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={phone1Tab === 'dna'}
                      onClick={() => setPhone1Tab('dna')}
                      className={`flex-1 py-1 text-[10px] font-mono-code uppercase rounded transition-colors cursor-pointer whitespace-nowrap ${
                        phone1Tab === 'dna'
                          ? 'bg-[#C92533] text-[#F4F0E8] font-semibold'
                          : 'text-[#AAA8A6] hover:text-[#F4F0E8]'
                      }`}
                    >
                      Listening Rituals
                    </button>
                  </div>

                  {phone1Tab === 'profile' ? (
                    <>
                      {/* Portrait Card with Grainy Monochrome Photo */}
                      <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-[#1A1A1A] border border-white/10">
                        <img
                          src="/templates/riff/mila-portrait.jpg"
                          alt="Mila, 24 monochrome analog portrait"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top contrast-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                        <div className="absolute bottom-2.5 left-3 font-condensed font-extrabold text-2xl tracking-wide text-[#F4F0E8]">
                          MILA, 24
                        </div>
                      </div>

                      {/* 94% MATCH Ring + Interactive Waveform */}
                      <div className="mt-3.5 flex items-center justify-between gap-3">
                        <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                          <svg viewBox="0 0 68 68" className="w-full h-full -rotate-90">
                            <circle
                              cx="34"
                              cy="34"
                              r="29"
                              fill="none"
                              stroke="rgba(244,240,232,0.18)"
                              strokeWidth="3.5"
                            />
                            <circle
                              cx="34"
                              cy="34"
                              r="29"
                              fill="none"
                              stroke="#F4F0E8"
                              strokeWidth="3.5"
                              strokeDasharray={`${(phone1Score / 100) * 182} 182`}
                              strokeLinecap="round"
                            />
                            <circle
                              cx="34"
                              cy="34"
                              r="25"
                              fill="none"
                              stroke="#C92533"
                              strokeWidth="1.5"
                              opacity="0.85"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                            <span className="text-sm font-bold tabular-nums text-[#F4F0E8]">
                              {phone1Score}%
                            </span>
                            <span className="text-[8px] font-mono-code uppercase tracking-wider text-[#AAA8A6] mt-0.5">
                              MATCH
                            </span>
                          </div>
                        </div>

                        {/* Interactive SVG Waveform */}
                        <button
                          type="button"
                          onClick={() => setWaveformActive((w) => !w)}
                          aria-pressed={waveformActive}
                          aria-label="Toggle visual waveform animation preview"
                          title="Visual equalizer only (no audio autoplay)"
                          className="flex-1 h-14 px-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-transparent hover:border-white/10 flex items-center justify-between gap-[2px] cursor-pointer transition-colors"
                        >
                          {waveformHeights.map((h, i) => {
                            const dynamicH = waveformActive
                              ? ((h * ((i % 3) + 1.2)) % 85) + 15
                              : h;
                            return (
                              <span
                                key={i}
                                style={{ height: `${dynamicH}%` }}
                                className={`w-[2px] rounded-full transition-all duration-300 ${
                                  waveformActive && i % 4 === 0
                                    ? 'bg-[#C92533]'
                                    : 'bg-[#F4F0E8]/70'
                                }`}
                              />
                            );
                          })}
                        </button>
                      </div>

                      {/* Top Artists (Interactive selection) */}
                      <div className="mt-3">
                        <div className="text-xs font-bold text-[#F4F0E8] tracking-tight">
                          Top Artists:
                        </div>
                        <div className="mt-1 flex flex-col gap-0.5">
                          {['Fontaines D.C.', 'Wet Leg', 'Phoebe Bridgers'].map((artist) => {
                            const isSelected = selectedArtists.includes(artist);
                            return (
                              <button
                                key={artist}
                                type="button"
                                onClick={() => toggleArtist(artist)}
                                aria-pressed={isSelected}
                                className={`text-left text-[13.5px] leading-snug py-0.5 px-1.5 -mx-1.5 rounded flex items-center justify-between transition-colors cursor-pointer ${
                                  isSelected
                                    ? 'text-[#F4F0E8] font-medium hover:bg-white/5'
                                    : 'text-[#777575] line-through hover:bg-white/5'
                                }`}
                              >
                                <span>{artist}</span>
                                <span
                                  className={`text-[9px] font-mono-code uppercase ${
                                    isSelected ? 'text-[#C92533]' : 'text-[#777575]'
                                  }`}
                                >
                                  {isSelected ? 'Shared' : 'Muted'}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Recently Played: Kyoto */}
                      <div className="mt-3">
                        <div className="text-xs font-bold text-[#F4F0E8] tracking-tight mb-1.5">
                          Recently Played:
                        </div>
                        <button
                          type="button"
                          onClick={() => setKyotoExpanded((prev) => !prev)}
                          aria-expanded={kyotoExpanded}
                          className="w-full text-left p-2 rounded-xl bg-[#16171B] hover:bg-[#1E1F24] border border-white/10 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <img
                              src="/templates/riff/album-kyoto.jpg"
                              alt="Kyoto single cover art"
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-md object-cover shrink-0 border border-white/10"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-[#F4F0E8] truncate">
                                  Kyoto
                                </span>
                                <span className="text-[#AAA8A6] text-xs leading-none">
                                  &bull;&bull;&bull;
                                </span>
                              </div>
                              <div className="mt-2 w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
                                <div className="w-[68%] h-full bg-[#F4F0E8] rounded-full" />
                              </div>
                            </div>
                          </div>
                          {kyotoExpanded && (
                            <p className="mt-2 pt-2 border-t border-white/10 text-[10px] font-mono-code text-[#AAA8A6]">
                              Phoebe Bridgers &bull; &ldquo;Punisher&rdquo; &bull; Played 4x on late-night overground rides.
                            </p>
                          )}
                        </button>
                      </div>

                      {/* Interactive Genre Chips at Bottom of Phone 1 */}
                      <div className="mt-3 flex items-center gap-1.5 justify-between">
                        {(['SHOEGAZE', 'POST-PUNK', 'LATE-NIGHT INDIE'] as const).map(
                          (genre) => {
                            const active = selectedGenres.includes(genre);
                            return (
                              <button
                                key={genre}
                                type="button"
                                onClick={() => toggleGenre(genre)}
                                aria-pressed={active}
                                className={`px-2 py-1 rounded-full text-[8.5px] font-mono-code tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                                  active
                                    ? 'bg-[#222328] text-[#F4F0E8] border border-white/20'
                                    : 'bg-[#121215] text-[#777575] border border-white/5'
                                }`}
                              >
                                {genre}
                              </button>
                            );
                          }
                        )}
                      </div>
                    </>
                  ) : (
                    /* Alternate tab inside Phone 1: Listening Rituals / Audio DNA */
                    <div className="py-2 space-y-3">
                      <div className="p-3 rounded-xl bg-[#151519] border border-[#C92533]/40">
                        <div className="text-[10px] font-mono-code uppercase text-[#C92533]">
                          Listening Ritual #01
                        </div>
                        <div className="text-sm font-semibold text-[#F4F0E8] mt-0.5">
                          Full-Album Midnight Walks
                        </div>
                        <p className="text-xs text-[#AAA8A6] mt-1">
                          Never shuffles an album on the first listen. Always checks who produced the drum sound.
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#151519] border border-white/10">
                        <div className="text-[10px] font-mono-code uppercase text-[#AAA8A6]">
                          Last 3 Small Gigs
                        </div>
                        <ul className="mt-1.5 space-y-1 text-xs text-[#F4F0E8]">
                          <li>1. The Windmill, Brixton (Front left)</li>
                          <li>2. Moth Club, Hackney (Sold out)</li>
                          <li>3. Rough Trade East In-Store</li>
                        </ul>
                      </div>
                      <div className="p-3 rounded-xl bg-[#151519] border border-white/10">
                        <div className="text-[10px] font-mono-code uppercase text-[#AAA8A6]">
                          Record Crate Prompt
                        </div>
                        <p className="text-xs italic text-[#F4F0E8] mt-1">
                          &ldquo;Tell me the one B-side you defend with your life.&rdquo;
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ============================================================
                  PHONE 2 (RIGHT): YOU MATCHED THROUGH MUSIC TASTE (91%)
                 ============================================================ */}
              <div
                className={`relative z-20 w-[290px] sm:w-[305px] rounded-[42px] bg-[#161618] p-[10px] shadow-[0_32px_80px_rgba(0,0,0,0.95)] border-[2.5px] border-[#343438] transition-transform duration-300 ${
                  mobilePhoneFocus === 'phone1' ? 'hidden sm:block' : 'block'
                } ${
                  mobilePhoneFocus === 'both'
                    ? 'mt-6 sm:mt-0 sm:absolute sm:top-[16%] sm:right-[3%] rotate-[6.5deg]'
                    : 'mx-auto rotate-0'
                }`}
                style={
                  mobilePhoneFocus === 'both' && motionEnabled
                    ? {
                        transform: `rotate(6.5deg) translate(${pointerOffset.x * -8}px, ${
                          pointerOffset.y * -5
                        }px)`,
                      }
                    : undefined
                }
              >
                <div className="w-full rounded-[33px] bg-[#0D0D0F] text-[#F4F0E8] px-4 pt-3 pb-5 overflow-hidden border border-white/5">
                  {/* iOS Status Bar + Dynamic Island */}
                  <div className="flex items-center justify-between text-[11px] font-semibold tracking-tight px-1 mb-3">
                    <span>9:41</span>
                    <div className="w-20 h-4 bg-black rounded-full border border-white/10" />
                    <div className="flex items-center gap-1" aria-hidden="true">
                      <span className="inline-block w-3 h-2.5 border-b-2 border-r-2 border-white/80" />
                      <span className="inline-block w-4 h-2.5 rounded-[2px] bg-white/90" />
                    </div>
                  </div>

                  {/* Header: YOU MATCHED THROUGH MUSIC TASTE */}
                  <div className="text-center mt-1">
                    <div className="font-condensed font-extrabold text-[1.45rem] leading-[1.03] tracking-wide uppercase text-[#F4F0E8]">
                      YOU MATCHED
                      <br />
                      THROUGH MUSIC
                      <br />
                      TASTE
                    </div>

                    {/* Big 91% Compatibility readout */}
                    <div className="mt-3 font-sans-ui font-extrabold text-[3.35rem] leading-none tracking-tight text-[#F4F0E8] tabular-nums">
                      {phone2Score}%
                    </div>
                    <div className="mt-1 text-sm text-[#AAA8A6] font-normal">
                      Compatibility
                    </div>
                  </div>

                  {/* Three Overlapping Circular Artwork Bubbles + Red Vertical Stem Accents */}
                  <div className="relative h-32 mt-3 flex items-center justify-center">
                    {/* Vertical sound-stem bars rising behind circles matching screenshot */}
                    <span
                      aria-hidden="true"
                      className="absolute -top-6 left-6 w-[2px] h-16 bg-gradient-to-b from-transparent to-[#F4F0E8]/35"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute -top-8 right-5 w-[2.5px] h-20 bg-gradient-to-b from-transparent to-[#C92533]"
                    />

                    {/* Left Circle */}
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#F4F0E8]/40 shadow-lg -mr-5 z-10 bg-[#18181B]">
                      <img
                        src="/templates/riff/match-art-1.jpg"
                        alt="Shared artist sleeve left"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Center Circle (Crimson Border Ring) */}
                    <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#C92533] shadow-2xl z-20 bg-[#121215]">
                      <img
                        src="/templates/riff/match-art-2.jpg"
                        alt="Shared artist sleeve center"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Right Circle (Vinyl Texture) */}
                    <div className="w-20 h-20 rounded-full overflow-hidden border border-white/25 shadow-lg -ml-5 z-10 bg-[#0B0B0B] flex items-center justify-center">
                      <VinylDisc className="w-20 h-20" />
                    </div>
                  </div>

                  {/* Your Shared Tracks (Interactive selector) */}
                  <div className="mt-3">
                    <div className="text-xs font-semibold text-[#F4F0E8] mb-2">
                      Your Shared Tracks
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {HERO_SHARED_TRACKS.map((track) => {
                        const isCurrent = track.id === activeSharedTrack.id;
                        return (
                          <button
                            key={track.id}
                            type="button"
                            onClick={() => setActiveTrackId(track.id)}
                            aria-pressed={isCurrent}
                            className={`group relative rounded-lg overflow-hidden h-14 border transition-all cursor-pointer ${
                              isCurrent
                                ? 'border-[#C92533] ring-1 ring-[#C92533] scale-[1.03]'
                                : 'border-white/10 opacity-75 hover:opacity-100'
                            }`}
                            title={`${track.title} — ${track.artist}`}
                          >
                            <img
                              src={track.thumb}
                              alt={`${track.title} by ${track.artist}`}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <span className="absolute bottom-1 left-1 right-1 text-[8px] font-mono-code text-[#F4F0E8] truncate">
                              {track.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Break the ice prompt box */}
                  <div className="mt-3 p-2.5 rounded-xl bg-[#17181C] border border-white/10 text-center">
                    <div className="text-[11px] font-bold text-[#F4F0E8]">
                      Break the ice:
                    </div>
                    <div className="text-xs text-[#AAA8A6] mt-0.5">
                      {activeSharedTrack.icebreaker}
                    </div>
                    <div className="text-[9px] font-mono-code text-[#C92533] mt-1">
                      {activeSharedTrack.sharedStat}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Collage Scribble: "MUSIC > ||||||||" below Phone 1 */}
              <div
                aria-hidden="true"
                className="hidden sm:flex absolute bottom-2 left-[14%] z-20 items-center gap-3 opacity-85 pointer-events-none select-none"
              >
                <span className="font-condensed font-light text-2xl tracking-widest text-[#F4F0E8]/85 italic">
                  MUSIC &gt;
                </span>
                <svg viewBox="0 0 110 36" className="w-28 h-9 text-[#F4F0E8]/80">
                  <path
                    d="M2 18 L8 15 L12 24 L16 8 L20 29 L24 6 L28 31 L33 11 L37 26 L42 4 L46 33 L51 12 L55 25 L60 9 L65 28 L70 13 L75 23 L80 10 L85 26 L90 15 L96 21 L108 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
