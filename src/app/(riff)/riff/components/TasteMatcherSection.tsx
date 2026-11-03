import React, { useEffect, useState } from 'react';
import {
  ALL_GENRES,
  ALL_HABITS,
  GenreId,
  HabitId,
  SAMPLE_PROFILES,
  calculateTasteOverlap,
} from '../utils/matching';
import { HandStar, VinylDisc } from './ZineMotifs';

const DEFAULT_GENRES: GenreId[] = ['shoegaze', 'post-punk', 'indie rock'];
const DEFAULT_HABITS: HabitId[] = ['night drives', 'live gigs', 'late-night headphones'];

export type TasteBandId = 'tm-01' | 'tm-02' | 'tm-03' | 'tm-04';

export function TasteMatcherSection() {
  const [selectedGenres, setSelectedGenres] = useState<GenreId[]>(DEFAULT_GENRES);
  const [selectedHabits, setSelectedHabits] = useState<HabitId[]>(DEFAULT_HABITS);
  const [partnerId, setPartnerId] = useState<string>('mila');
  const [conversationFocus, setConversationFocus] = useState<boolean>(false);
  const [historyStack, setHistoryStack] = useState<{ genres: GenreId[]; habits: HabitId[] }[]>([]);
  const [spinningBoost, setSpinningBoost] = useState<boolean>(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  const partner =
    SAMPLE_PROFILES.find((p) => p.id === partnerId) || SAMPLE_PROFILES[0];

  const overlap = calculateTasteOverlap(selectedGenres, selectedHabits, partner);

  // Determine which of the 4 cutout phone states is active based on live score + conversation focus
  const scoreBand: 'high' | 'medium' | 'low' =
    overlap.percentage >= 85
      ? 'high'
      : overlap.percentage >= 65
      ? 'medium'
      : 'low';

  const activePhoneState: TasteBandId = conversationFocus
    ? 'tm-04'
    : scoreBand === 'high'
    ? 'tm-01'
    : scoreBand === 'medium'
    ? 'tm-02'
    : 'tm-03';

  const phoneAssetMap: Record<
    TasteBandId,
    { src: string; alt: string; bandLabel: string }
  > = {
    'tm-01': {
      src: '/assets/riff/phones/riff-tm-01-high-overlap.webp',
      alt: 'Riff Taste Matcher phone in high overlap state with illuminated crimson ring',
      bandLabel: 'HIGH FREQUENCY (85%+)',
    },
    'tm-02': {
      src: '/assets/riff/phones/riff-tm-02-medium-overlap.webp',
      alt: 'Riff Taste Matcher phone in medium overlap state with segmented crimson arc',
      bandLabel: 'SOLID OVERLAP (65–84%)',
    },
    'tm-03': {
      src: '/assets/riff/phones/riff-tm-03-low-overlap.webp',
      alt: 'Riff Taste Matcher phone in low overlap state with sparse dotted ring and chalk arrows',
      bandLabel: 'CRATE CONTRAST (<65%)',
    },
    'tm-04': {
      src: '/assets/riff/phones/riff-tm-04-conversation-focus.webp',
      alt: 'Riff Taste Matcher phone in conversation focus state showing perforated First Riff prompt card',
      bandLabel: 'THE FIRST RIFF · PROMPT CARD',
    },
  };

  const activePhoneMeta = phoneAssetMap[activePhoneState];

  // Trigger brief vinyl spin + waveform pulse whenever selections change
  useEffect(() => {
    setSpinningBoost(true);
    const timer = setTimeout(() => setSpinningBoost(false), 950);
    return () => clearTimeout(timer);
  }, [selectedGenres, selectedHabits, partnerId]);

  const pushHistory = () => {
    setHistoryStack((prev) => [
      ...prev.slice(-8),
      { genres: [...selectedGenres], habits: [...selectedHabits] },
    ]);
  };

  const handleToggleGenre = (id: GenreId) => {
    pushHistory();
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setSavedNotice(null);
  };

  const handleToggleHabit = (id: HabitId) => {
    pushHistory();
    setSelectedHabits((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setSavedNotice(null);
  };

  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const last = historyStack[historyStack.length - 1];
    setSelectedGenres(last.genres);
    setSelectedHabits(last.habits);
    setHistoryStack((prev) => prev.slice(0, -1));
  };

  const handleReset = () => {
    pushHistory();
    setSelectedGenres(DEFAULT_GENRES);
    setSelectedHabits(DEFAULT_HABITS);
    setConversationFocus(false);
    setSavedNotice('Reset to default post-punk / shoegaze demo crate.');
  };

  const handleClear = () => {
    pushHistory();
    setSelectedGenres([]);
    setSelectedHabits([]);
    setConversationFocus(false);
    setSavedNotice('Cleared all selections.');
  };

  const handleSaveLocally = () => {
    try {
      localStorage.setItem(
        'riff_demo_crate',
        JSON.stringify({ genres: selectedGenres, habits: selectedHabits, partnerId })
      );
      setSavedNotice('Saved your demo crate to browser localStorage (local only).');
    } catch {
      setSavedNotice('Kept in session memory.');
    }
  };

  const handleCopyPrompt = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(overlap.introPrompt).catch(() => {});
    }
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // Red ink ring circumference math for the live SVG trace overlay inside the phone ring
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (overlap.percentage / 100) * circumference;

  // Format up to 3 shared genre slots and 3 shared habit slots for the phone's pill slots
  const genreSlots = [0, 1, 2].map((idx) => {
    const gId = overlap.sharedGenres[idx];
    if (!gId) return null;
    return ALL_GENRES.find((g) => g.id === gId)?.label || gId;
  });

  const habitSlots = [0, 1, 2].map((idx) => {
    const hId = overlap.sharedHabits[idx];
    if (!hId) return null;
    const label = ALL_HABITS.find((h) => h.id === hId)?.label || hId;
    return label.replace('Vinyl crate digging', 'Vinyl').replace('Late-night headphones', 'Headphones');
  });

  return (
    <section
      id="taste-matcher"
      aria-label="Interactive Taste Matcher Demo"
      className="relative py-20 lg:py-28 border-b border-[#F4F0E8]/15 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="halftone-patch absolute bottom-8 right-8 w-80 h-64 opacity-40 pointer-events-none"
      />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-[#C92533]">
              <span>02. INTERACTIVE TASTE MATCHER · LIVE FRONT-END DEMO</span>
            </div>
            <h2 className="mt-2 font-editorial font-bold text-3xl sm:text-5xl text-[#F4F0E8] tracking-tight">
              Find your frequency.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#AAA8A6] max-w-xl">
            Toggle your favorite scenes and listening rituals below. Overlap is calculated deterministically in your browser from shared genres and habits — an honest taste-overlap illustration, not verified romance science.
          </p>
        </div>

        {/* Two-Panel Matcher Workspace */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT PANEL (7 Cols): User Genre & Ritual Selector */}
          <div className="lg:col-span-7 bg-[#141414] border border-[#F4F0E8]/20 p-6 sm:p-8 rounded-[4px]">
            {/* Physical Tape Strip showing currently snapped genres & habits */}
            <div className="p-4 bg-[#EAE3D5] text-[#0B0B0B] rounded-[2px] shadow-md transform -rotate-[0.4deg]">
              <div className="flex items-center justify-between border-b border-[#0B0B0B]/25 pb-1.5 text-[11px] font-mono-code uppercase">
                <span className="font-bold">
                  YOUR ACTIVE TAPE STRIP ({selectedGenres.length} GENRES · {selectedHabits.length} RITUALS)
                </span>
                <span className="text-[#C92533] font-bold">SIDE A</span>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1.5 min-h-[28px] items-center">
                {selectedGenres.length === 0 && selectedHabits.length === 0 ? (
                  <span className="text-xs font-mono-code italic text-[#0B0B0B]/65">
                    Tape strip is blank — click genre or ritual chips below to snap them onto your reel.
                  </span>
                ) : (
                  <>
                    {selectedGenres.map((g) => (
                      <span
                        key={g}
                        className="px-2 py-0.5 bg-[#0B0B0B] text-[#F4F0E8] text-xs font-mono-code uppercase tracking-wider"
                      >
                        {g}
                      </span>
                    ))}
                    {selectedHabits.map((h) => (
                      <span
                        key={h}
                        className="px-2 py-0.5 bg-[#C92533] text-[#F4F0E8] text-xs font-mono-code uppercase tracking-wider"
                      >
                        {h}
                      </span>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Step 1: Genre Chips */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono-code uppercase tracking-wider text-[#F4F0E8]">
                  1. Pick your core genres
                </h3>
                <span className="text-xs font-mono-code text-[#AAA8A6]">
                  {selectedGenres.length} of {ALL_GENRES.length} selected
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ALL_GENRES.map((genre) => {
                  const isSelected = selectedGenres.includes(genre.id);
                  const isSharedWithPartner =
                    isSelected && partner.genres.includes(genre.id);
                  return (
                    <button
                      key={genre.id}
                      type="button"
                      onClick={() => handleToggleGenre(genre.id)}
                      aria-pressed={isSelected}
                      className={`p-3 rounded-[3px] border text-left transition-all cursor-pointer flex items-start justify-between gap-2 ${
                        isSelected
                          ? 'bg-[#1D1D22] border-[#C92533] text-[#F4F0E8] shadow-[3px_3px_0px_rgba(201,37,51,0.45)]'
                          : 'bg-[#0B0B0B] border-[#F4F0E8]/20 text-[#AAA8A6] hover:border-[#F4F0E8]/50 hover:text-[#F4F0E8]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{genre.label}</span>
                          {isSharedWithPartner && (
                            <span className="text-[10px] font-mono-code uppercase text-[#C92533] font-bold">
                              &bull; Shared with {partner.name}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#AAA8A6] mt-0.5">{genre.subnote}</p>
                      </div>
                      <span
                        aria-hidden="true"
                        className={`w-5 h-5 rounded-[2px] border flex items-center justify-center text-xs font-mono-code shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-[#C92533] border-[#C92533] text-[#F4F0E8]'
                            : 'border-[#F4F0E8]/30 text-transparent'
                        }`}
                      >
                        ✓
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Listening Habits / Rituals */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono-code uppercase tracking-wider text-[#F4F0E8]">
                  2. Toggle listening rituals
                </h3>
                <span className="text-xs font-mono-code text-[#AAA8A6]">
                  {selectedHabits.length} of {ALL_HABITS.length} active
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ALL_HABITS.map((habit) => {
                  const isSelected = selectedHabits.includes(habit.id);
                  const isSharedWithPartner =
                    isSelected && partner.habits.includes(habit.id);
                  return (
                    <button
                      key={habit.id}
                      type="button"
                      onClick={() => handleToggleHabit(habit.id)}
                      aria-pressed={isSelected}
                      className={`p-3 rounded-[3px] border text-left transition-all cursor-pointer flex items-start justify-between gap-2 ${
                        isSelected
                          ? 'bg-[#1D1D22] border-[#F4F0E8]/80 text-[#F4F0E8]'
                          : 'bg-[#0B0B0B] border-[#F4F0E8]/20 text-[#AAA8A6] hover:border-[#F4F0E8]/50 hover:text-[#F4F0E8]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{habit.label}</span>
                          {isSharedWithPartner && (
                            <span className="text-[10px] font-mono-code uppercase text-[#C92533] font-bold">
                              &bull; Match
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#AAA8A6] mt-0.5">{habit.detail}</p>
                      </div>
                      <span
                        aria-hidden="true"
                        className={`w-5 h-5 rounded-[2px] border flex items-center justify-center text-xs font-mono-code shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-[#F4F0E8] border-[#F4F0E8] text-[#0B0B0B]'
                            : 'border-[#F4F0E8]/30 text-transparent'
                        }`}
                      >
                        ✓
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Bar: Reset, Undo, Clear, Optional Local Save */}
            <div className="mt-7 pt-5 border-t border-[#F4F0E8]/15 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3.5 py-2 text-xs font-mono-code uppercase border border-[#F4F0E8]/35 text-[#F4F0E8] hover:border-[#F4F0E8] rounded-[3px] cursor-pointer whitespace-nowrap"
                >
                  Reset Default
                </button>
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={historyStack.length === 0}
                  className="px-3.5 py-2 text-xs font-mono-code uppercase border border-[#F4F0E8]/25 text-[#AAA8A6] hover:text-[#F4F0E8] disabled:opacity-40 rounded-[3px] cursor-pointer whitespace-nowrap"
                >
                  Undo
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3.5 py-2 text-xs font-mono-code uppercase border border-[#F4F0E8]/25 text-[#AAA8A6] hover:text-[#C92533] hover:border-[#C92533] rounded-[3px] cursor-pointer whitespace-nowrap"
                >
                  Clear All
                </button>
              </div>

              <button
                type="button"
                onClick={handleSaveLocally}
                className="px-3.5 py-2 text-xs font-mono-code uppercase bg-[#0B0B0B] border border-[#C92533]/70 text-[#F4F0E8] hover:bg-[#C92533] rounded-[3px] transition-colors cursor-pointer whitespace-nowrap"
              >
                Save Demo Choices Locally
              </button>
            </div>

            {savedNotice && (
              <p role="status" className="mt-3 text-xs font-mono-code text-[#C92533]">
                {savedNotice}
              </p>
            )}
          </div>

          {/* RIGHT PANEL (5 Cols): Sample Profile Switcher + Live Cutout Phone Composite + DOM Overlays */}
          <div className="lg:col-span-5 bg-[#141414] border border-[#F4F0E8]/20 p-6 sm:p-8 rounded-[4px] relative">
            {/* Partner Profile Selector Tabs */}
            <div>
              <div className="text-xs font-mono-code uppercase tracking-wider text-[#AAA8A6]">
                Compare your crate against sample 18+ profile:
              </div>
              <div
                role="tablist"
                aria-label="Sample profiles"
                className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2"
              >
                {SAMPLE_PROFILES.map((p) => {
                  const active = p.id === partner.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setPartnerId(p.id)}
                      className={`py-2 px-3 rounded-[3px] text-xs font-mono-code uppercase border transition-colors cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-[#C92533] text-[#F4F0E8] border-[#C92533] font-bold'
                          : 'bg-[#0B0B0B] text-[#AAA8A6] border-[#F4F0E8]/20 hover:text-[#F4F0E8]'
                      }`}
                    >
                      {p.name}, {p.age}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Phone View Mode Switcher: Score Dial (TM-01/02/03) vs Conversation Focus (TM-04) */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 bg-[#0B0B0B] p-2.5 border border-[#F4F0E8]/15 rounded-[3px]">
              <div className="flex items-center gap-2">
                <VinylDisc className="w-7 h-7 shrink-0" fast={spinningBoost} labelSide="A" />
                <span className="text-[11px] font-mono-code uppercase text-[#AAA8A6]">
                  {activePhoneMeta.bandLabel}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setConversationFocus(false)}
                  aria-pressed={!conversationFocus}
                  className={`px-2.5 py-1 text-[10px] font-mono-code uppercase rounded-[2px] cursor-pointer transition-colors whitespace-nowrap ${
                    !conversationFocus
                      ? 'bg-[#C92533] text-[#F4F0E8] font-bold'
                      : 'bg-[#141414] text-[#AAA8A6] hover:text-[#F4F0E8]'
                  }`}
                >
                  Score Dial
                </button>
                <button
                  type="button"
                  onClick={() => setConversationFocus(true)}
                  aria-pressed={conversationFocus}
                  className={`px-2.5 py-1 text-[10px] font-mono-code uppercase rounded-[2px] cursor-pointer transition-colors whitespace-nowrap ${
                    conversationFocus
                      ? 'bg-[#C92533] text-[#F4F0E8] font-bold'
                      : 'bg-[#141414] text-[#AAA8A6] hover:text-[#F4F0E8]'
                  }`}
                >
                  First Riff Card
                </button>
              </div>
            </div>

            {/* Cutout Phone Stage with Normalized Live DOM Overlays */}
            <div
              className="mt-5 py-4 px-2 bg-[#0B0B0B] border border-[#F4F0E8]/15 rounded-[4px] relative overflow-hidden flex flex-col items-center"
              aria-live="polite"
            >
              <div
                aria-hidden="true"
                className="halftone-patch absolute inset-0 opacity-20 pointer-events-none"
              />

              {/* Aspect-Ratio Locked Phone Cutout Wrapper (720 x 1490) */}
              <div
                key={activePhoneState}
                data-testid="taste-matcher-phone"
                data-phone-state={activePhoneState}
                className="relative z-10 w-full max-w-[300px] aspect-[720/1490] mx-auto anim-band-sweep"
              >
                <img
                  src={activePhoneMeta.src}
                  alt={activePhoneMeta.alt}
                  className="w-full h-full object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.9)] select-none"
                />

                {/* Dynamic Partner Header Overlay when comparing against Julian, Sora, or Deon */}
                {partner.id !== 'mila' && (
                  <div
                    style={{ top: '20.2%', left: '22.5%', width: '69%', height: '6.8%' }}
                    className="absolute bg-[#121214]/95 border border-[#C92533]/40 rounded-[4px] px-2.5 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-editorial font-bold text-sm text-[#F4F0E8] uppercase tracking-tight">
                        {partner.name} / {partner.age}
                      </span>
                      <span className="text-[8px] font-mono-code uppercase text-[#C92533]">
                        {partner.city}
                      </span>
                    </div>
                    <span className="text-[8px] font-mono-code uppercase text-[#AAA8A6] truncate">
                      {partner.topArtists.join(' · ')}
                    </span>
                  </div>
                )}

                {/* OVERLAY MODE A: SCORE DIAL (TM-01, TM-02, TM-03) */}
                {!conversationFocus ? (
                  <>
                    {/* Central Compatibility Ring Score Readout Centered at Y=47.5% */}
                    <div
                      style={{ top: '38.5%', left: '24%', width: '52%', height: '18%' }}
                      className="absolute flex flex-col items-center justify-center text-center pointer-events-none"
                    >
                      <span
                        data-testid="taste-overlap-score"
                        className="font-sans-ui font-extrabold text-3xl sm:text-4xl text-[#F4F0E8] tabular-nums leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                      >
                        {overlap.percentage}%
                      </span>
                      <span className="mt-1 text-[8px] font-mono-code uppercase tracking-widest text-[#C92533] font-bold">
                        {partner.name.toUpperCase()} OVERLAP
                      </span>
                    </div>

                    {/* SHARED SCENES 3 Pill Slots Overlay (Y=65.5%..68.7%) */}
                    <div
                      style={{ top: '65.5%', left: '7.5%', width: '85%', height: '3.2%' }}
                      className="absolute grid grid-cols-3 gap-1.5 items-center pointer-events-none"
                    >
                      {genreSlots.map((label, idx) => (
                        <div
                          key={idx}
                          className="h-full flex items-center justify-center px-1 rounded-full text-[7.5px] font-mono-code uppercase tracking-tighter truncate text-[#F4F0E8] font-semibold"
                        >
                          {label || '—'}
                        </div>
                      ))}
                    </div>

                    {/* LISTENING RITUALS 3 Pill Slots Overlay (Y=72.0%..75.2%) */}
                    <div
                      style={{ top: '72.0%', left: '7.5%', width: '85%', height: '3.2%' }}
                      className="absolute grid grid-cols-3 gap-1.5 items-center pointer-events-none"
                    >
                      {habitSlots.map((label, idx) => (
                        <div
                          key={idx}
                          className="h-full flex items-center justify-center px-1 rounded-full text-[7.5px] font-mono-code uppercase tracking-tighter truncate text-[#F4F0E8] font-semibold"
                        >
                          {label || '—'}
                        </div>
                      ))}
                    </div>

                    {/* YOUR INTRO Live Text Slot Overlay (Y=76.5%..80.5%) */}
                    <div
                      style={{ top: '76.5%', left: '8.0%', width: '84%', height: '4.1%' }}
                      className="absolute flex items-center px-2.5 bg-[#0D0D0F]/92 rounded-[3px] pointer-events-none"
                    >
                      <p className="text-[8px] font-mono-code text-[#F4F0E8] leading-tight line-clamp-2">
                        {overlap.introPrompt}
                      </p>
                    </div>
                  </>
                ) : (
                  /* OVERLAY MODE B: CONVERSATION FOCUS (TM-04) */
                  <>
                    {/* SHARED SOUND Top Slot (Y=36.2%..43.2%) */}
                    <div
                      style={{ top: '36.2%', left: '8.0%', width: '84%', height: '6.8%' }}
                      className="absolute flex items-center justify-between px-3 pointer-events-none"
                    >
                      <div className="truncate pr-2">
                        <div className="text-[8px] font-mono-code uppercase text-[#C92533] font-bold">
                          SHARED CRATE WITH {partner.name.toUpperCase()}
                        </div>
                        <div className="text-[8.5px] font-mono-code text-[#F4F0E8] truncate mt-0.5">
                          {overlap.sharedScenes.length > 0
                            ? overlap.sharedScenes.slice(0, 3).join(' · ')
                            : 'Opposite crates · Mixtape trade'}
                        </div>
                      </div>
                      <span
                        data-testid="taste-overlap-score"
                        className="px-2 py-0.5 bg-[#C92533] text-[#F4F0E8] font-sans-ui font-extrabold text-xs tabular-nums rounded-[2px] shrink-0"
                      >
                        {overlap.percentage}%
                      </span>
                    </div>

                    {/* Perforated Stamp-Edged Blackboard Card Overlay (Y=48.5%..72.0%) */}
                    <div
                      style={{ top: '48.5%', left: '12.0%', width: '76%', height: '23.2%' }}
                      className="absolute flex flex-col justify-between p-3 text-left pointer-events-none"
                    >
                      <div className="text-[8px] font-mono-code uppercase tracking-widest text-[#C92533] font-bold">
                        ICEBREAKER FOR {partner.name.toUpperCase()}, {partner.age}
                      </div>
                      <p className="font-editorial italic text-xs sm:text-[13px] text-[#F4F0E8] leading-snug">
                        {overlap.introPrompt}
                      </p>
                      <div className="pt-1.5 border-t border-[#F4F0E8]/15 text-[8px] font-mono-code text-[#AAA8A6] truncate">
                        &rarr; {overlap.couldTalkAbout[0]}
                      </div>
                    </div>

                    {/* Lower Track Context Slot (Y=76.5%..80.8%) */}
                    <div
                      style={{ top: '76.5%', left: '8.0%', width: '84%', height: '4.3%' }}
                      className="absolute flex items-center justify-between px-2.5 bg-[#0D0D0F]/85 rounded-[3px] pointer-events-none"
                    >
                      <span className="text-[8px] font-mono-code text-[#F4F0E8] truncate">
                        ON REPEAT: {partner.recentTrack.title} — {partner.recentTrack.artist}
                      </span>
                    </div>
                  </>
                )}

                {/* Interactive Bottom Phone CTA Button ("SEND A RIFF ->", Y=82.5%..87.5%) */}
                <button
                  type="button"
                  onClick={() => {
                    handleCopyPrompt();
                    setConversationFocus((prev) => !prev);
                  }}
                  style={{ top: '82.5%', left: '7.5%', width: '85%', height: '5.0%' }}
                  aria-label="Send a Riff: copy conversation prompt and toggle First Riff card"
                  className="absolute rounded-[5px] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F4F0E8] hover:bg-white/10 transition-colors"
                />
              </div>
            </div>

            {/* Plainly Explained Formula Note */}
            <p className="mt-3 text-[11px] font-mono-code text-[#AAA8A6] leading-relaxed">
              {overlap.formulaSummary}
            </p>

            {/* Shared Scenes */}
            <div className="mt-4">
              <div className="text-xs font-mono-code uppercase tracking-wider text-[#F4F0E8]">
                Shared scenes &amp; rituals ({overlap.sharedScenes.length})
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {overlap.sharedScenes.length > 0 ? (
                  overlap.sharedScenes.map((scene) => (
                    <span
                      key={scene}
                      className="px-2.5 py-1 bg-[#1D1D22] border border-[#C92533]/60 text-[#F4F0E8] text-xs font-mono-code"
                    >
                      {scene}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-[#AAA8A6]">
                    No direct overlap yet — opposite crates make great mixtape trades.
                  </span>
                )}
              </div>
            </div>

            {/* Could Talk About */}
            <div className="mt-4">
              <div className="text-xs font-mono-code uppercase tracking-wider text-[#F4F0E8]">
                Could talk about:
              </div>
              <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-[#AAA8A6]">
                {overlap.couldTalkAbout.map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C92533] font-mono-code">&rarr;</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Intro Prompt Box */}
            <div className="mt-4 p-4 bg-[#0B0B0B] border border-[#C92533]/60 rounded-[3px]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono-code uppercase text-[#C92533] font-semibold">
                  Suggested Intro Prompt
                </span>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="text-[11px] font-mono-code uppercase text-[#F4F0E8] hover:text-[#C92533] underline cursor-pointer"
                >
                  {copiedPrompt ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>
              <p className="mt-1.5 text-sm font-editorial italic text-[#F4F0E8]">
                {overlap.introPrompt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
