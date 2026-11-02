'use client';

import React, { useState } from 'react';
import {
  PlaylistItem,
  SCENE_PLAYLISTS,
  filterPlaylists,
} from '../utils/matching';
import { AlbumArtGraphic, HandStar } from './ZineMotifs';

type ChemistryMode = 'records' | 'concert' | 'latenight';

interface ChemistryCase {
  id: ChemistryMode;
  label: string;
  paperBridgeTitle: string;
  paperBridgeDetail: string;
  sharedPrompt: string;
  milaScreen: {
    header: string;
    primaryTitle: string;
    primaryMeta: string;
    artVariant: PlaylistItem['artVariant'];
    bullets: string[];
    badge: string;
  };
  julianScreen: {
    header: string;
    primaryTitle: string;
    primaryMeta: string;
    artVariant: PlaylistItem['artVariant'];
    bullets: string[];
    badge: string;
  };
}

const CHEMISTRY_MODES: ChemistryCase[] = [
  {
    id: 'records',
    label: 'Favorite records',
    paperBridgeTitle: 'SHARED LP DNA // 1990s SHOEGAZE & ANALOG REVERB',
    paperBridgeDetail:
      'Both pinned heavy glide-guitar pressings in their top 3 records and prefer full-side vinyl listens.',
    sharedPrompt: '"If we only had 40 minutes before the record shop closed, which crate are you heading to first?"',
    milaScreen: {
      header: 'MILA, 24 · FAVORITE RECORDS',
      primaryTitle: 'Glass Platform (Mono LP)',
      primaryMeta: 'Velvet Escalator · Pressed on 180g crimson wax',
      artVariant: 'crimson-horizon',
      bullets: [
        'Side A: "Sodium Vapor" (zero-skip opener)',
        'Side B: "Last Overground North" (rainy walk anthem)',
        'Sleeves kept in poly outer jackets, sorted by mood',
      ],
      badge: 'CRATE ANCHOR #01',
    },
    julianScreen: {
      header: 'JULIAN, 26 · FAVORITE RECORDS',
      primaryTitle: 'Reverse Cathedral (12" EP)',
      primaryMeta: 'Pale Filament · Rough Trade white-label pressing',
      artVariant: 'tape-reel',
      bullets: [
        'Side A: "Velvet Capo" (Fender Jaguar + reverse delay)',
        'Side B: "Runout Groove Loop" (infinite locked groove)',
        'Repaired a 1984 belt-drive turntable just for this EP',
      ],
      badge: 'CRATE ANCHOR #01',
    },
  },
  {
    id: 'concert',
    label: 'Concert energy',
    paperBridgeTitle: 'MATCHED GIG RITUAL // 200-CAP ROOMS & SOUNDBOARD SPOT',
    paperBridgeDetail:
      'Neither talks during the acoustic support set; both stand ten feet in front of the mixing desk.',
    sharedPrompt: '"We both arrive for the 8:15 PM opening band — want to split a £10 basement show next Thursday?"',
    milaScreen: {
      header: 'MILA, 24 · CONCERT ENERGY',
      primaryTitle: 'Front-Left Speaker Stack',
      primaryMeta: '200-capacity basements & mid-week residencies',
      artVariant: 'basement-flyer',
      bullets: [
        'Always catches the first local support band at 8:00 PM',
        'Earplugs in coat pocket, setlist folded into phone case',
        'Will stay outside for 20 minutes talking about the drum tone',
      ],
      badge: 'GIG CADENCE: 2x / MONTH',
    },
    julianScreen: {
      header: 'JULIAN, 26 · CONCERT ENERGY',
      primaryTitle: 'Right by the Soundboard',
      primaryMeta: 'Small warehouse stages & DIY tape-release nights',
      artVariant: 'static-guitar',
      bullets: [
        'Watches the pedalboard changes between every song',
        'Buys the 7-inch or cassette directly from the merch table',
        'Never films the whole set on a bright phone screen',
      ],
      badge: 'GIG CADENCE: 3x / MONTH',
    },
  },
  {
    id: 'latenight',
    label: 'Late-night playlist',
    paperBridgeTitle: 'SYNCHRONIZED HOURS // 11:30 PM — 01:45 AM ROTATION',
    paperBridgeDetail:
      'Both switch from angular post-punk to sparse four-track indie and darkwave after midnight.',
    sharedPrompt: '"Trade me your favorite song for staring out the night-bus window at 1 A.M."',
    milaScreen: {
      header: 'MILA, 24 · AFTER MIDNIGHT MIX',
      primaryTitle: 'Songs for the N29 Night Bus',
      primaryMeta: '11 fictional demo tracks · 47 minutes · No shuffle',
      artVariant: 'rain-window',
      bullets: [
        '01. Clara Vance — "Radiator Hum in B-Flat"',
        '02. Siren & the Static — "Tremolo Letter"',
        '03. Pine & Mercury — "Voicemail from October"',
      ],
      badge: 'PEAK HOUR: 00:30 AM',
    },
    julianScreen: {
      header: 'JULIAN, 26 · AFTER MIDNIGHT MIX',
      primaryTitle: 'Sodium Streetlight Tape #09',
      primaryMeta: '10 fictional demo tracks · 51 minutes · Analog warmth',
      artVariant: 'tube-amp',
      bullets: [
        '01. Mirror Bahnhof — "Fluorescent Exit"',
        '02. Starling Engine — "Fuzz Pedal Lullaby"',
        '03. Half-Lit Windows — "Corner Bodega Tulips"',
      ],
      badge: 'PEAK HOUR: 00:45 AM',
    },
  },
];

export function ChemistryAndSceneSections() {
  const [chemistryMode, setChemistryMode] = useState<ChemistryMode>('records');
  const [moodFilter, setMoodFilter] = useState<'all' | PlaylistItem['mood']>('all');
  const [activePlaylistId, setActivePlaylistId] = useState<string>('midnight-static');
  const [questionCopiedId, setQuestionCopiedId] = useState<string | null>(null);

  const activeChemistry =
    CHEMISTRY_MODES.find((m) => m.id === chemistryMode) || CHEMISTRY_MODES[0];

  const visiblePlaylists = filterPlaylists(SCENE_PLAYLISTS, moodFilter);
  const selectedPlaylist =
    SCENE_PLAYLISTS.find((p) => p.id === activePlaylistId) ||
    visiblePlaylists[0] ||
    SCENE_PLAYLISTS[0];

  const handleCopyQuestion = (id: string, question: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(question).catch(() => {});
    }
    setQuestionCopiedId(id);
    setTimeout(() => setQuestionCopiedId(null), 2000);
  };

  return (
    <>
      {/* ====================================================================
          SECTION E: MUSIC CHEMISTRY / PHONES IN MOTION
         ==================================================================== */}
      <section
        id="music-chemistry"
        aria-label="Music chemistry dual-phone case study"
        className="relative py-20 lg:py-28 border-b border-[#F4F0E8]/15 overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Header + Mode Switcher Control Panel */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="text-xs font-mono-code uppercase tracking-widest text-[#C92533]">
                03. MUSIC CHEMISTRY · PHONES IN MOTION CASE STUDY
              </div>
              <h2 className="mt-2 font-editorial font-bold text-3xl sm:text-5xl text-[#F4F0E8] tracking-tight">
                Two crates. One conversation.
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#AAA8A6] max-w-2xl">
                Switch the lens below to see how Mila (24) and Julian (26) connect across original demo records, concert habits, and late-night playlists.
              </p>
            </div>

            {/* Segmented Mode Control */}
            <div
              role="tablist"
              aria-label="Chemistry comparison dimension"
              className="flex flex-wrap items-center gap-2 bg-[#141414] p-1.5 border border-[#F4F0E8]/25 rounded-[4px] self-start lg:self-end"
            >
              {CHEMISTRY_MODES.map((m) => {
                const active = m.id === chemistryMode;
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setChemistryMode(m.id)}
                    className={`px-4 py-2 text-xs font-mono-code uppercase tracking-wider rounded-[3px] transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#C92533] text-[#F4F0E8] font-bold shadow'
                        : 'text-[#AAA8A6] hover:text-[#F4F0E8]'
                    }`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dual Phones + Unfurling Paper Connector Strip */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Phone A: Mila, 24 */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-[330px] rounded-[38px] bg-[#161619] p-3 border-2 border-[#323236] shadow-2xl transform lg:-rotate-2 transition-transform duration-300">
                <div className="rounded-[28px] bg-[#0C0C0E] p-4 border border-white/10">
                  <div className="flex items-center justify-between text-[10px] font-mono-code text-[#AAA8A6] pb-2 border-b border-white/10">
                    <span>{activeChemistry.milaScreen.header}</span>
                    <span className="text-[#C92533]">DEMO DATA</span>
                  </div>

                  <div className="mt-3 h-36 rounded-xl overflow-hidden border border-white/15">
                    <AlbumArtGraphic variant={activeChemistry.milaScreen.artVariant} />
                  </div>

                  <div className="mt-3">
                    <span className="inline-block text-[10px] font-mono-code uppercase text-[#C92533]">
                      {activeChemistry.milaScreen.badge}
                    </span>
                    <h3 className="text-lg font-bold text-[#F4F0E8] mt-0.5">
                      {activeChemistry.milaScreen.primaryTitle}
                    </h3>
                    <p className="text-xs text-[#AAA8A6]">
                      {activeChemistry.milaScreen.primaryMeta}
                    </p>
                  </div>

                  <ul className="mt-3 pt-3 border-t border-white/10 space-y-1.5 text-xs text-[#F4F0E8]/90">
                    {activeChemistry.milaScreen.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#C92533] font-mono-code">&bull;</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Center Unfurling Paper Strip Bridge */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center relative py-4">
              {/* SVG Ink Connector Line */}
              <svg
                viewBox="0 0 300 44"
                className="hidden lg:block w-full h-11 text-[#C92533] mb-2"
                aria-hidden="true"
              >
                <path
                  d="M4 22 C85 4, 215 40, 296 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeDasharray="6 4"
                />
                <circle cx="8" cy="22" r="4" fill="#C92533" />
                <circle cx="292" cy="22" r="4" fill="#C92533" />
              </svg>

              <div className="torn-paper-strip w-full bg-[#EFECE4] text-[#0B0B0B] p-5 sm:p-6 shadow-2xl transform -rotate-1">
                <div className="flex items-center justify-between border-b border-[#0B0B0B]/25 pb-2 text-[10px] font-mono-code uppercase">
                  <span className="font-bold text-[#C92533]">OVERLAP CONNECTOR</span>
                  <span>MODE: {activeChemistry.label.toUpperCase()}</span>
                </div>

                <div className="mt-2.5 font-condensed font-extrabold text-xl uppercase leading-tight">
                  {activeChemistry.paperBridgeTitle}
                </div>

                <p className="mt-2 text-xs sm:text-sm text-[#141414]/85 leading-relaxed">
                  {activeChemistry.paperBridgeDetail}
                </p>

                <div className="mt-4 p-3 bg-[#0B0B0B] text-[#F4F0E8] rounded-[2px]">
                  <div className="text-[9px] font-mono-code uppercase text-[#C92533]">
                    Instant Conversation Starter
                  </div>
                  <p className="mt-1 text-xs italic font-editorial">
                    {activeChemistry.sharedPrompt}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone B: Julian, 26 */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-[330px] rounded-[38px] bg-[#161619] p-3 border-2 border-[#323236] shadow-2xl transform lg:rotate-2 transition-transform duration-300">
                <div className="rounded-[28px] bg-[#0C0C0E] p-4 border border-white/10">
                  <div className="flex items-center justify-between text-[10px] font-mono-code text-[#AAA8A6] pb-2 border-b border-white/10">
                    <span>{activeChemistry.julianScreen.header}</span>
                    <span className="text-[#C92533]">DEMO DATA</span>
                  </div>

                  <div className="mt-3 h-36 rounded-xl overflow-hidden border border-white/15">
                    <AlbumArtGraphic variant={activeChemistry.julianScreen.artVariant} />
                  </div>

                  <div className="mt-3">
                    <span className="inline-block text-[10px] font-mono-code uppercase text-[#C92533]">
                      {activeChemistry.julianScreen.badge}
                    </span>
                    <h3 className="text-lg font-bold text-[#F4F0E8] mt-0.5">
                      {activeChemistry.julianScreen.primaryTitle}
                    </h3>
                    <p className="text-xs text-[#AAA8A6]">
                      {activeChemistry.julianScreen.primaryMeta}
                    </p>
                  </div>

                  <ul className="mt-3 pt-3 border-t border-white/10 space-y-1.5 text-xs text-[#F4F0E8]/90">
                    {activeChemistry.julianScreen.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#C92533] font-mono-code">&bull;</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION F: THE SCENE / PLAYLIST CULTURE (#playlists)
         ==================================================================== */}
      <section
        id="playlists"
        aria-label="The Scene and Playlist Culture Wall"
        className="relative py-20 lg:py-28 border-b border-[#F4F0E8]/15 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="halftone-patch-fine absolute top-16 left-0 w-72 h-72 opacity-35 pointer-events-none"
        />

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Header & Mood Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="text-xs font-mono-code uppercase tracking-widest text-[#C92533]">
                04. THE SCENE · PLAYLIST &amp; FLYER CULTURE
              </div>
              <h2 className="mt-2 font-editorial font-bold text-3xl sm:text-5xl text-[#F4F0E8] tracking-tight">
                Playlists are the new love letters.
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#AAA8A6] max-w-xl">
                Filter the collage wall by listening mood and click any record sleeve to open its gatefold liner notes and conversation starter inline.
              </p>
            </div>

            {/* Interactive Mood Filter Buttons */}
            <div
              role="group"
              aria-label="Filter playlists by mood"
              className="flex flex-wrap items-center gap-2 bg-[#141414] p-1.5 border border-[#F4F0E8]/20 rounded-[4px] self-start lg:self-end"
            >
              {(
                [
                  { id: 'all', label: 'All Scenes (6)' },
                  { id: 'shoegaze', label: 'Shoegaze' },
                  { id: 'post-punk', label: 'Post-Punk' },
                  { id: 'late-night', label: 'Late-Night' },
                  { id: 'live-basement', label: 'Live Basement' },
                ] as const
              ).map((tab) => {
                const active = moodFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setMoodFilter(tab.id)}
                    aria-pressed={active}
                    className={`px-3.5 py-1.5 text-xs font-mono-code uppercase rounded-[3px] transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#C92533] text-[#F4F0E8] font-bold'
                        : 'text-[#AAA8A6] hover:text-[#F4F0E8]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Inline Expanding Gatefold Record Sleeve Drawer */}
          {selectedPlaylist && (
            <div className="mt-10 bg-[#141414] border-2 border-[#C92533]/75 rounded-[4px] p-6 sm:p-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Sleeve Artwork */}
                <div className="lg:col-span-4">
                  <div className="aspect-square max-w-[280px] mx-auto rounded-[4px] overflow-hidden border border-[#F4F0E8]/25 shadow-2xl relative">
                    <AlbumArtGraphic variant={selectedPlaylist.artVariant} />
                  </div>
                </div>

                {/* Sleeve Liner Notes + Tracklist + Prompt */}
                <div className="lg:col-span-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code text-[#AAA8A6]">
                    <span className="text-[#C92533] font-bold uppercase">
                      OPEN GATEFOLD SLEEVE &bull; {selectedPlaylist.moodLabel}
                    </span>
                    <span>
                      {selectedPlaylist.trackCount} TRACKS &bull; {selectedPlaylist.duration}
                    </span>
                  </div>

                  <h3 className="mt-2 font-editorial font-bold text-3xl sm:text-4xl text-[#F4F0E8]">
                    {selectedPlaylist.title}
                  </h3>
                  <p className="mt-1 text-xs font-mono-code text-[#AAA8A6]">
                    {selectedPlaylist.curator}
                  </p>

                  <p className="mt-3 text-sm sm:text-base text-[#F4F0E8]/90 leading-relaxed">
                    {selectedPlaylist.context}
                  </p>

                  {/* Fictional Tracklist */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedPlaylist.tracks.map((tr) => (
                      <div
                        key={tr.number}
                        className="p-2.5 bg-[#0B0B0B] border border-[#F4F0E8]/15 rounded-[3px] flex items-center justify-between text-xs"
                      >
                        <div className="truncate pr-2">
                          <span className="font-mono-code text-[#C92533] mr-2">
                            {tr.number}.
                          </span>
                          <span className="font-semibold text-[#F4F0E8]">
                            {tr.title}
                          </span>
                          <span className="text-[#AAA8A6]"> — {tr.artist}</span>
                        </div>
                        <span className="font-mono-code text-[#777575] tabular-nums shrink-0">
                          {tr.length}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Conversation Starter Question inside Sleeve */}
                  <div className="mt-5 p-4 bg-[#0B0B0B] border border-[#F4F0E8]/20 rounded-[3px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-mono-code uppercase text-[#C92533]">
                        Attached Conversation Starter
                      </div>
                      <p className="mt-0.5 text-sm font-editorial italic text-[#F4F0E8]">
                        &ldquo;{selectedPlaylist.conversationQuestion}&rdquo;
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyQuestion(
                          selectedPlaylist.id,
                          selectedPlaylist.conversationQuestion
                        )
                      }
                      className="px-4 py-2 text-xs font-mono-code uppercase bg-[#C92533] text-[#F4F0E8] hover:bg-[#b51f2c] rounded-[3px] whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {questionCopiedId === selectedPlaylist.id
                        ? 'Copied Question!'
                        : 'Copy Icebreaker'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Collage Grid of Playlist Sleeves */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visiblePlaylists.map((item) => {
              const isSelected = selectedPlaylist?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePlaylistId(item.id)}
                  aria-pressed={isSelected}
                  style={{ transform: `rotate(${item.rotationDeg * 0.45}deg)` }}
                  className={`group text-left bg-[#141414] p-5 rounded-[4px] border transition-all duration-200 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#C92533] ring-1 ring-[#C92533] shadow-2xl'
                      : 'border-[#F4F0E8]/20 hover:border-[#F4F0E8]/55'
                  }`}
                >
                  <div>
                    <div className="h-48 w-full rounded-[3px] overflow-hidden border border-white/10 relative">
                      <AlbumArtGraphic variant={item.artVariant} />
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs font-mono-code text-[#AAA8A6]">
                      <span>{item.moodLabel}</span>
                      <span className="tabular-nums">
                        {item.trackCount} tracks &bull; {item.duration}
                      </span>
                    </div>

                    <h3 className="mt-1.5 font-editorial font-bold text-2xl text-[#F4F0E8] group-hover:text-[#C92533] transition-colors">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-sm text-[#AAA8A6] leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F4F0E8]/15 flex items-center justify-between text-xs font-mono-code uppercase">
                    <span className={isSelected ? 'text-[#C92533] font-bold' : 'text-[#F4F0E8]'}>
                      {isSelected ? 'Sleeve Open Above' : 'Inspect Sleeve & Tracks'}
                    </span>
                    <HandStar className="w-5 h-5" variant={2} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
