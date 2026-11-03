import React, { useState } from 'react';
import {
  PlaylistItem,
  SCENE_PLAYLISTS,
  filterPlaylists,
} from '../utils/matching';
import { HandStar, VinylDisc } from './ZineMotifs';

type ChemistryMode = 'records' | 'concert' | 'latenight';

interface ChemistryCase {
  id: ChemistryMode;
  label: string;
  compositeAsset: string;
  compositeAlt: string;
  tiltStyle: string;
  paperBridgeTitle: string;
  paperBridgeDetail: string;
  sharedPrompt: string;
  milaScreen: {
    header: string;
    primaryTitle: string;
    primaryMeta: string;
    bullets: string[];
    badge: string;
  };
  julianScreen: {
    header: string;
    primaryTitle: string;
    primaryMeta: string;
    bullets: string[];
    badge: string;
  };
}

const CHEMISTRY_MODES: ChemistryCase[] = [
  {
    id: 'records',
    label: 'Favorite records',
    compositeAsset: '/assets/riff/chemistry/riff-mc-01-favorite-records.webp',
    compositeAlt: 'Paired phones comparing Mila’s Crate (Sulk LP) and Julian’s Crate (Out of Time EP)',
    tiltStyle: 'perspective(1200px) rotateZ(-0.6deg) rotateY(2deg)',
    paperBridgeTitle: 'SHARED LP DNA // 1990s SHOEGAZE & ANALOG REVERB',
    paperBridgeDetail:
      'Both pinned heavy glide-guitar pressings in their top 3 records and prefer full-side vinyl listens.',
    sharedPrompt:
      '"If we only had 40 minutes before the record shop closed, which crate are you heading to first?"',
    milaScreen: {
      header: 'MILA, 24 · FAVORITE RECORDS',
      primaryTitle: 'Sulk (Crimson Mono LP)',
      primaryMeta: 'Sweetest Dream / Echo Valley · 180g pressing',
      bullets: [
        'Side A: "Sweetest Dream — Fade" (zero-skip opener)',
        'Side B: "Echo Valley — Ghosts" (rainy walk anthem)',
        'Sleeves kept in poly outer jackets, sorted by mood',
      ],
      badge: 'CRATE ANCHOR #01',
    },
    julianScreen: {
      header: 'JULIAN, 26 · FAVORITE RECORDS',
      primaryTitle: 'Out of Time EP (12" Cut)',
      primaryMeta: 'Shiver / Glass · White-label pressing',
      bullets: [
        'Side A: "Shiver — Slo-Blur" (Fender Jaguar + reverse delay)',
        'Side B: "Last Call — Echoes" (infinite locked groove)',
        'Repaired a 1984 belt-drive turntable just for this EP',
      ],
      badge: 'CRATE ANCHOR #01',
    },
  },
  {
    id: 'concert',
    label: 'Concert energy',
    compositeAsset: '/assets/riff/chemistry/riff-mc-02-concert-energy.webp',
    compositeAlt: 'Paired phones comparing Mila’s Gigs (Barrier / 200-Cap Rooms) and Julian’s Gigs (Soundboard / Intimate Rooms)',
    tiltStyle: 'perspective(1200px) rotateZ(0.6deg) rotateY(-2deg)',
    paperBridgeTitle: 'MATCHED GIG RITUAL // 200-CAP ROOMS & SOUNDBOARD SPOT',
    paperBridgeDetail:
      'Neither talks during the acoustic support set; both stand inside intimate 200-capacity basement rooms.',
    sharedPrompt:
      '"We both arrive for the 8:15 PM opening band — want to split a £10 basement show next Thursday?"',
    milaScreen: {
      header: 'MILA, 24 · CONCERT ENERGY',
      primaryTitle: 'Barrier / The Pit · 200-Cap Rooms',
      primaryMeta: 'The Subway DIY & mid-week basement residencies',
      bullets: [
        'Always catches the first local support band at 8:00 PM',
        'Earplugs in coat pocket, setlist folded into phone case',
        'Will stay outside for 20 minutes talking about the drum tone',
      ],
      badge: 'GIG CADENCE: 2x / MONTH',
    },
    julianScreen: {
      header: 'JULIAN, 26 · CONCERT ENERGY',
      primaryTitle: 'Soundboard · Intimate Rooms',
      primaryMeta: 'The Warehouse DIY & small tape-release stages',
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
    compositeAsset: '/assets/riff/chemistry/riff-mc-03-late-night-playlist.webp',
    compositeAlt: 'Paired phones comparing Mila’s Late-Night (2 AM Stories) and Julian’s Late-Night (Midnight Drive)',
    tiltStyle: 'perspective(1200px) rotateZ(-0.4deg) rotateY(1.5deg)',
    paperBridgeTitle: 'SYNCHRONIZED HOURS // 11:30 PM — 02:00 AM ROTATION',
    paperBridgeDetail:
      'Both switch from angular post-punk to nocturnal lo-fi, dusty tape echoes, and darkwave after midnight.',
    sharedPrompt:
      '"Trade me your favorite song for staring out the night-bus window at 2 A.M."',
    milaScreen: {
      header: 'MILA, 24 · AFTER MIDNIGHT MIX',
      primaryTitle: '2 AM Stories (Side A)',
      primaryMeta: 'Nightwalk · After Hours · The Crypt',
      bullets: [
        '01. "Nightwalk — Lo-Fi" (rain-streaked window cut)',
        '02. "After Hours — Nocturne" (sparse four-track)',
        '03. "The Crypt — Ambient" (headphone closer)',
      ],
      badge: 'PEAK HOUR: 02:00 AM',
    },
    julianScreen: {
      header: 'JULIAN, 26 · AFTER MIDNIGHT MIX',
      primaryTitle: 'Midnight Drive (Side B)',
      primaryMeta: 'Midnight Special · Taped Echoes · Neon Shadows',
      bullets: [
        '01. "Midnight Special — Dusty" (empty highway pulse)',
        '02. "Taped Echoes — Raw" (analog warmth)',
        '03. "Neon Shadows — Ambient" (late-night insomnia)',
      ],
      badge: 'PEAK HOUR: 01:45 AM',
    },
  },
];

const SCENE_EPHEMERA = [
  {
    id: 'flyer-culture',
    tag: 'EPHEMERA 01 · XEROX FLYER WALL',
    title: 'Basement Night Live! DIY Bill',
    detail: 'Photocopied venue handbills pinned at record counters and rehearsal rooms.',
    src: '/assets/riff/ephemera/riff-sc-support-01-flyer-culture.webp',
    alt: 'Riff Presents Basement Night Live photocopied punk and shoegaze concert flyer',
    rotate: '-1.5deg',
  },
  {
    id: 'ticket-ephemera',
    tag: 'EPHEMERA 02 · SAVED WRISTBANDS & STUBS',
    title: 'Live at the Subterranean Stubs',
    detail: 'Perforated paper admit-one tickets kept in coat pockets long after the encore.',
    src: '/assets/riff/ephemera/riff-sc-support-02-ticket-ephemera.webp',
    alt: 'Collage of torn Riff Subterranean concert ticket stubs with red ink stamps',
    rotate: '1.2deg',
  },
  {
    id: 'scene-photo',
    tag: 'EPHEMERA 03 · 35MM CONTACT SHEET',
    title: 'RIFF 400 Film Proof Sheet',
    detail: 'Grainy 35mm frames from soundcheck, record bins, and late-night train platforms.',
    src: '/assets/riff/ephemera/riff-sc-support-03-scene-photo.webp',
    alt: 'RIFF 400 black-and-white 35mm film contact sheet with red grease-pencil crop marks',
    rotate: '-0.8deg',
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
          SECTION E (03): MUSIC CHEMISTRY / PHONES IN MOTION
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
                Switch the lens below to see how Mila (24) and Julian (26) connect across favorite records, concert energy, and late-night playlists.
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

          {/* Cohesive Dual-Phone Cutout Stage + Animated Red Connecting Thread + Torn Paper Bridge */}
          <div className="mt-10 bg-[#141414] border border-[#F4F0E8]/20 rounded-[4px] p-5 sm:p-8 relative overflow-hidden">
            <div
              aria-hidden="true"
              className="halftone-patch absolute inset-0 opacity-20 pointer-events-none"
            />

            {/* Composite Dual-Phone Cutout Container with SVG Connector Thread Behind/Across */}
            <div className="relative z-10 max-w-[1060px] mx-auto">
              {/* Animated SVG Red Ink Thread & Waveform Spanning Between Mila (left) and Julian (right) */}
              <svg
                viewBox="0 0 600 180"
                className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[56%] h-auto pointer-events-none z-0"
                aria-hidden="true"
              >
                <path
                  d="M 10 90 C 160 20, 440 160, 590 90"
                  fill="none"
                  stroke="#C92533"
                  strokeWidth="2.8"
                  strokeDasharray="8 6"
                />
                <path
                  d="M 10 90 C 180 145, 420 35, 590 90"
                  fill="none"
                  stroke="rgba(244,240,232,0.3)"
                  strokeWidth="1.4"
                  strokeDasharray="4 4"
                />
                <circle cx="16" cy="90" r="6" fill="#C92533" />
                <circle cx="584" cy="90" r="6" fill="#C92533" />
              </svg>

              {/* Transparent Paired-Phone Composite Asset */}
              <div
                key={activeChemistry.id}
                data-testid="chemistry-composite-stage"
                data-chemistry-mode={activeChemistry.id}
                className="relative z-10 w-full aspect-[1440/902] anim-ticket-whip transition-transform duration-500"
                style={{ transform: activeChemistry.tiltStyle }}
              >
                <img
                  src={activeChemistry.compositeAsset}
                  alt={activeChemistry.compositeAlt}
                  className="w-full h-full object-contain drop-shadow-[0_24px_44px_rgba(0,0,0,0.9)] select-none"
                />

                {/* Center Floating Torn-Paper Bridge Positioned in the Gap Between the Two Phones on Desktop */}
                <div className="hidden lg:flex absolute inset-y-0 left-[34%] right-[34%] items-center justify-center pointer-events-auto">
                  <div className="torn-paper-strip w-full bg-[#EFECE4] text-[#0B0B0B] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transform -rotate-1 border border-[#0B0B0B]/20">
                    <div className="flex items-center justify-between border-b border-[#0B0B0B]/25 pb-1.5 text-[9px] font-mono-code uppercase">
                      <span className="font-bold text-[#C92533]">OVERLAP CONNECTOR</span>
                      <span>LENS: {activeChemistry.label.toUpperCase()}</span>
                    </div>

                    <div className="mt-2 font-condensed font-extrabold text-lg xl:text-xl uppercase leading-tight">
                      {activeChemistry.paperBridgeTitle}
                    </div>

                    <p className="mt-1.5 text-xs text-[#141414]/85 leading-relaxed">
                      {activeChemistry.paperBridgeDetail}
                    </p>

                    <div className="mt-3 p-2.5 bg-[#0B0B0B] text-[#F4F0E8] rounded-[2px]">
                      <div className="text-[8px] font-mono-code uppercase text-[#C92533]">
                        Instant Conversation Starter
                      </div>
                      <p className="mt-0.5 text-xs italic font-editorial">
                        {activeChemistry.sharedPrompt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile / Tablet Torn-Paper Bridge Below Composite */}
              <div className="lg:hidden mt-4">
                <div className="torn-paper-strip w-full bg-[#EFECE4] text-[#0B0B0B] p-5 shadow-2xl transform -rotate-1">
                  <div className="flex items-center justify-between border-b border-[#0B0B0B]/25 pb-2 text-[10px] font-mono-code uppercase">
                    <span className="font-bold text-[#C92533]">OVERLAP CONNECTOR</span>
                    <span>MODE: {activeChemistry.label.toUpperCase()}</span>
                  </div>

                  <div className="mt-2 font-condensed font-extrabold text-xl uppercase leading-tight">
                    {activeChemistry.paperBridgeTitle}
                  </div>

                  <p className="mt-1.5 text-xs sm:text-sm text-[#141414]/85 leading-relaxed">
                    {activeChemistry.paperBridgeDetail}
                  </p>

                  <div className="mt-3 p-3 bg-[#0B0B0B] text-[#F4F0E8] rounded-[2px]">
                    <div className="text-[9px] font-mono-code uppercase text-[#C92533]">
                      Instant Conversation Starter
                    </div>
                    <p className="mt-1 text-xs italic font-editorial">
                      {activeChemistry.sharedPrompt}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Synchronized Accessible Crate Liner Breakdown Strip Below the Phones */}
            <div className="relative z-10 mt-6 pt-6 border-t border-[#F4F0E8]/15 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mila Liner Summary */}
              <div className="p-4 sm:p-5 bg-[#0B0B0B] border border-[#F4F0E8]/15 rounded-[3px]">
                <div className="flex items-center justify-between text-[11px] font-mono-code text-[#AAA8A6] pb-2 border-b border-[#F4F0E8]/10">
                  <span>{activeChemistry.milaScreen.header}</span>
                  <span className="text-[#C92533] font-bold">{activeChemistry.milaScreen.badge}</span>
                </div>
                <h3 className="mt-2.5 font-editorial font-bold text-xl text-[#F4F0E8]">
                  {activeChemistry.milaScreen.primaryTitle}
                </h3>
                <p className="text-xs font-mono-code text-[#AAA8A6] mt-0.5">
                  {activeChemistry.milaScreen.primaryMeta}
                </p>
                <ul className="mt-3 space-y-1 text-xs text-[#F4F0E8]/90">
                  {activeChemistry.milaScreen.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C92533] font-mono-code">&bull;</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Julian Liner Summary */}
              <div className="p-4 sm:p-5 bg-[#0B0B0B] border border-[#F4F0E8]/15 rounded-[3px]">
                <div className="flex items-center justify-between text-[11px] font-mono-code text-[#AAA8A6] pb-2 border-b border-[#F4F0E8]/10">
                  <span>{activeChemistry.julianScreen.header}</span>
                  <span className="text-[#C92533] font-bold">{activeChemistry.julianScreen.badge}</span>
                </div>
                <h3 className="mt-2.5 font-editorial font-bold text-xl text-[#F4F0E8]">
                  {activeChemistry.julianScreen.primaryTitle}
                </h3>
                <p className="text-xs font-mono-code text-[#AAA8A6] mt-0.5">
                  {activeChemistry.julianScreen.primaryMeta}
                </p>
                <ul className="mt-3 space-y-1 text-xs text-[#F4F0E8]/90">
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
      </section>

      {/* ====================================================================
          SECTION F (04): THE SCENE / PLAYLIST CULTURE (#playlists)
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
                Filter the collage wall by listening mood and click any record sleeve to unfold its gatefold liner notes, tracklist, and conversation starter inline.
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
            <div
              key={selectedPlaylist.id}
              data-testid="scene-gatefold-drawer"
              data-playlist-id={selectedPlaylist.id}
              className="mt-10 bg-[#141414] border-2 border-[#C92533]/75 rounded-[4px] p-5 sm:p-8 shadow-2xl anim-gatefold-unfold"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Gatefold Spread Visual (Open Gatefold for 01–04, Full Square Sleeve + Vinyl Backing for 05–06) */}
                <div className="lg:col-span-5">
                  {selectedPlaylist.gatefoldAsset ? (
                    <div className="relative rounded-[4px] overflow-hidden border border-[#F4F0E8]/25 shadow-2xl bg-[#0B0B0B]">
                      <img
                        src={selectedPlaylist.gatefoldAsset}
                        alt={`Opened gatefold record spread for ${selectedPlaylist.title}`}
                        className="w-full h-auto object-cover block"
                      />
                      {/* Subtle Live Liner Stamp Overlay on the Right-Hand Open Gatefold Sheet */}
                      <div className="hidden sm:flex absolute top-[14%] right-[7%] w-[41%] bottom-[14%] flex-col justify-between p-3 text-[#0B0B0B] pointer-events-none">
                        <div className="border-b border-[#0B0B0B]/30 pb-1 flex items-center justify-between text-[8px] font-mono-code uppercase">
                          <span className="font-bold text-[#C92533]">RIFF PRESSING</span>
                          <span>{selectedPlaylist.duration}</span>
                        </div>
                        <div className="space-y-1 my-auto">
                          {selectedPlaylist.tracks.map((tr) => (
                            <div
                              key={tr.number}
                              className="text-[8.5px] font-mono-code leading-tight truncate border-b border-[#0B0B0B]/15 pb-0.5"
                            >
                              <span className="font-bold text-[#C92533]">{tr.number}.</span>{' '}
                              <span className="font-semibold">{tr.title}</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-[7.5px] font-mono-code uppercase tracking-wider text-[#0B0B0B]/70">
                          SIDE A / B &bull; {selectedPlaylist.moodLabel}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Covers 05 & 06: Full-Size Square Sleeve Art + Peeking Vinyl Record in Gatefold Frame */
                    <div className="relative flex items-center justify-center py-2">
                      <div className="relative w-full max-w-[340px] flex items-center">
                        <div className="relative z-10 w-[82%] aspect-square rounded-[4px] overflow-hidden border border-[#F4F0E8]/30 shadow-2xl">
                          <img
                            src={selectedPlaylist.sleeveAsset}
                            alt={`Full record sleeve artwork for ${selectedPlaylist.title}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-[54%] -ml-[36%] z-0">
                          <VinylDisc className="w-full h-full drop-shadow-2xl" labelSide="B" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sleeve Liner Notes + Live HTML Tracklist + Copyable Icebreaker */}
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code text-[#AAA8A6]">
                    <span className="text-[#C92533] font-bold uppercase">
                      {selectedPlaylist.gatefoldAsset
                        ? 'OPEN GATEFOLD SPREAD'
                        : 'SLEEVE EDITION LINER NOTES'}{' '}
                      &bull; {selectedPlaylist.moodLabel}
                    </span>
                    <span className="tabular-nums">
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

          {/* Collage Grid of 6 Square Record Sleeves */}
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
                    {/* Square Record Sleeve Image + Peeking Vinyl Accent */}
                    <div className="relative aspect-square w-full rounded-[3px] overflow-hidden border border-white/10 bg-[#0B0B0B]">
                      <img
                        src={item.sleeveAsset}
                        alt={`${item.title} record sleeve cover art`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#0B0B0B]/85 border border-[#F4F0E8]/25 text-[10px] font-mono-code uppercase text-[#F4F0E8]">
                        {item.gatefoldAsset ? 'Gatefold LP' : '12" Sleeve'}
                      </div>
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

          {/* Tactile Scene Ephemera Strip (3 Supplied Ephemera Support Assets) */}
          <div className="mt-14 pt-10 border-t border-[#F4F0E8]/15">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <div className="text-xs font-mono-code uppercase tracking-widest text-[#C92533]">
                  PHYSICAL SCENE ARTIFACTS · FLYER, TICKET &amp; 35MM ARCHIVE
                </div>
                <h3 className="mt-1 font-editorial font-bold text-2xl sm:text-3xl text-[#F4F0E8]">
                  Built from basement bills, torn stubs, and contact sheets.
                </h3>
              </div>
              <span className="text-xs font-mono-code uppercase text-[#AAA8A6]">
                ARCHIVE SERIES 01–03
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {SCENE_EPHEMERA.map((ep) => (
                <article
                  key={ep.id}
                  style={{ transform: `rotate(${ep.rotate})` }}
                  className="bg-[#141414] border border-[#F4F0E8]/20 p-4 rounded-[4px] flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 shadow-xl"
                >
                  <div>
                    <div className="h-56 sm:h-64 w-full rounded-[3px] overflow-hidden bg-[#0B0B0B] border border-[#F4F0E8]/15">
                      <img
                        src={ep.src}
                        alt={ep.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-3 text-[10px] font-mono-code uppercase tracking-wider text-[#C92533] font-bold">
                      {ep.tag}
                    </div>
                    <h4 className="mt-1 font-editorial font-bold text-xl text-[#F4F0E8]">
                      {ep.title}
                    </h4>
                  </div>
                  <p className="mt-1.5 text-xs text-[#AAA8A6] leading-relaxed">
                    {ep.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
