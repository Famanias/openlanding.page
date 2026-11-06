import React, { useEffect, useRef, useState } from 'react';
import { HandStar, MusicGreaterLooksScrawl, VinylDisc } from './ZineMotifs';

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
    shortLine:
      'Profiles open with your rotation, last three gigs, and desert-island records — never a full-screen selfie carousel.',
    expandedDetail:
      'Photos stay softly tucked inside a secondary sleeve until you have actually read what someone listens to at 1 A.M. You never swipe on a face in isolation.',
    zineNote: 'NO EGO SWIPING · CRATE BEFORE CAMERA',
  },
  {
    id: 'connection-second',
    number: '02.',
    title: 'Connection second',
    shortLine:
      'Every match comes with a real reason you overlapped and a specific track or album memory to break the ice.',
    expandedDetail:
      'Instead of "hey, how was your weekend?", Riff highlights the exact post-punk B-side, shoegaze pedal tone, or late-night playlist habit you share.',
    zineNote: 'ZERO DEAD OPENERS · SONG-LED PROMPTS',
  },
  {
    id: 'meet-when-ready',
    number: '03.',
    title: 'Meet when ready',
    shortLine:
      'Trade a three-song mini-mix, talk about a record sleeve, and suggest catching a local support band when the vibe clicks.',
    expandedDetail:
      'Designed for 18+ music lovers who prefer low-pressure coffee near a record shop or a £10 basement gig over high-stakes dinner interviews.',
    zineNote: '18+ COMMUNITY · RESPECTFUL PACE',
  },
];

export type HowVisualStageId = 'hm-01' | 'hm-00' | 'hm-02' | 'hm-03';

interface VisualStageSpec {
  stageId: HowVisualStageId;
  parentStepIndex: number; // Maps to 0, 1, or 2 in the 3-step onboarding structure
  badge: string;
  captionTitle: string;
  captionLine: string;
  imageSrc: string;
  imageAlt: string;
  transitionClass: 'anim-sleeve-wipe' | 'anim-ring-expand';
  tiltStyle: string;
  ringOverlay?: {
    centerXPct: string;
    centerYPct: string;
    score: number;
    sublabel: string;
  };
}

const VISUAL_STAGES: VisualStageSpec[] = [
  {
    stageId: 'hm-01',
    parentStepIndex: 0,
    badge: 'STEP 01 OF 03 · DROP YOUR FAVORITES',
    captionTitle: 'Log your core scenes, anchor artists & nocturnal habits.',
    captionLine: 'Start by tagging Shoegaze, Post-Punk, Indie Rock, and the records on heavy rotation.',
    imageSrc: '/assets/riff/phones/riff-hm-01-drop-favorites.webp',
    imageAlt: 'Riff app screen Step 01: Drop Your Favorites with core genres, artists on repeat, and listening habits',
    transitionClass: 'anim-sleeve-wipe',
    tiltStyle: 'perspective(1100px) rotateZ(-1.2deg) rotateY(4deg)',
  },
  {
    stageId: 'hm-00',
    parentStepIndex: 0,
    badge: 'MUSIC IDENTITY BRIDGE · MILA, 24',
    captionTitle: 'Meet Mila. A personality told through music.',
    captionLine: 'Before matching, your crate becomes an editorial music identity card with live compatibility readiness.',
    imageSrc: '/assets/riff/phones/riff-hm-00-music-identity.webp',
    imageAlt: 'Riff app screen Music Identity: Mila 24 profile with scene tags, top artists, and Kyoto waveform',
    transitionClass: 'anim-sleeve-wipe',
    tiltStyle: 'perspective(1100px) rotateZ(0.6deg) rotateY(-3deg)',
    ringOverlay: {
      centerXPct: '69.5%',
      centerYPct: '40.6%',
      score: 94,
      sublabel: 'MATCH',
    },
  },
  {
    stageId: 'hm-02',
    parentStepIndex: 1,
    badge: 'STEP 02 OF 03 · FIND YOUR OVERLAP',
    captionTitle: 'Surface shared artists, scenes & concert rituals.',
    captionLine: 'Riff maps exact intersections between your crate and Mila’s — no opaque romance black box.',
    imageSrc: '/assets/riff/phones/riff-hm-02-find-overlap.webp',
    imageAlt: 'Riff app screen Step 02: Find Your Overlap showing shared genres, artists in common, and shared rituals',
    transitionClass: 'anim-ring-expand',
    tiltStyle: 'perspective(1100px) rotateZ(1.2deg) rotateY(-4deg)',
    ringOverlay: {
      centerXPct: '71.3%',
      centerYPct: '31.7%',
      score: 91,
      sublabel: 'MATCH',
    },
  },
  {
    stageId: 'hm-03',
    parentStepIndex: 2,
    badge: 'STEP 03 OF 03 · START A CONVERSATION',
    captionTitle: 'Skip small talk with a song-first icebreaker.',
    captionLine: 'Tap a shared mini-mix or prompt to open the chat with a specific record memory.',
    imageSrc: '/assets/riff/phones/riff-hm-03-start-conversation.webp',
    imageAlt: 'Riff app screen Step 03: Start a Conversation with shared mini-mix After the Encore and message composer',
    transitionClass: 'anim-sleeve-wipe',
    tiltStyle: 'perspective(1100px) rotateZ(-0.7deg) rotateY(2.5deg)',
  },
];

interface TrackStep {
  index: number;
  defaultVisualStage: HowVisualStageId;
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
    defaultVisualStage: 'hm-01',
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
    defaultVisualStage: 'hm-02',
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
    defaultVisualStage: 'hm-03',
    trackCode: 'TRACK 03 / SIDE B',
    duration: '2:45 — 4:02',
    title: 'Start a conversation',
    subtitle: 'Use real prompts about a song or memory.',
    description:
      'Skip the small talk. Tap any shared track or album sleeve to send a specific music question — like asking which song on "Punisher" they play on rainy train rides home.',
    ticketStamp: 'STATION 03 · FRONT BARRIER HELLO',
    ticketSerial: 'RF-030442',
    previewChips: ['Ask about "Punisher"', 'Trade a 3-song mix', 'Compare first gigs'],
    sampleOutput: 'Icebreaker queued: "We both love shoegaze and late-night drives. What’s your zero-skip album?"',
  },
];

export function ManifestoAndHowItWorks() {
  const [expandedPrinciples, setExpandedPrinciples] = useState<string[]>(['taste-first']);
  const [revealSongQuote, setRevealSongQuote] = useState<boolean>(true);
  const [visualStageId, setVisualStageId] = useState<HowVisualStageId>('hm-01');
  const sectionRef = useRef<HTMLElement | null>(null);
  const manualOverrideUntilRef = useRef<number>(0);

  const togglePrinciple = (id: string) => {
    setExpandedPrinciples((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentVisualIndex = Math.max(
    0,
    VISUAL_STAGES.findIndex((s) => s.stageId === visualStageId)
  );
  const currentVisual = VISUAL_STAGES[currentVisualIndex] || VISUAL_STAGES[0];
  const activeStepIndex = currentVisual.parentStepIndex;
  const currentTrack = HOW_IT_WORKS_STEPS[activeStepIndex] || HOW_IT_WORKS_STEPS[0];

  // Progress bar reflects the 4 visual stages smoothly (25%, 50%, 75%, 100%)
  const progressPercent = ((currentVisualIndex + 1) / VISUAL_STAGES.length) * 100;

  // Reversible scroll-driven progression across the 4 visual states when scrolling through Section 01
  useEffect(() => {
    const handleScroll = () => {
      if (Date.now() < manualOverrideUntilRef.current) return;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;

      // Only sync when section is actively traversing the viewport
      if (rect.bottom < vh * 0.25 || rect.top > vh * 0.75) return;

      const totalTravel = rect.height + vh * 0.3;
      const traveled = vh * 0.65 - rect.top;
      const ratio = Math.max(0, Math.min(0.999, traveled / Math.max(1, totalTravel)));
      const stageIdx = Math.min(
        VISUAL_STAGES.length - 1,
        Math.floor(ratio * VISUAL_STAGES.length)
      );
      const nextStage = VISUAL_STAGES[stageIdx]?.stageId;
      if (nextStage) {
        setVisualStageId((prev) => (prev === nextStage ? prev : nextStage));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const selectStepManually = (stepIdx: number) => {
    manualOverrideUntilRef.current = Date.now() + 4000;
    const step = HOW_IT_WORKS_STEPS[stepIdx];
    if (step) {
      setVisualStageId(step.defaultVisualStage);
    }
  };

  const selectVisualStageManually = (stageId: HowVisualStageId) => {
    manualOverrideUntilRef.current = Date.now() + 4000;
    setVisualStageId(stageId);
  };

  const handlePrevTrack = () => {
    manualOverrideUntilRef.current = Date.now() + 4000;
    const nextStep =
      activeStepIndex > 0 ? activeStepIndex - 1 : HOW_IT_WORKS_STEPS.length - 1;
    setVisualStageId(HOW_IT_WORKS_STEPS[nextStep].defaultVisualStage);
  };

  const handleNextTrack = () => {
    manualOverrideUntilRef.current = Date.now() + 4000;
    const nextStep = (activeStepIndex + 1) % HOW_IT_WORKS_STEPS.length;
    setVisualStageId(HOW_IT_WORKS_STEPS[nextStep].defaultVisualStage);
  };

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
          SECTION C (01): HOW MATCHING WORKS — THE FIRST THREE TRACKS
         ==================================================================== */}
      <section
        ref={sectionRef}
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
              Click any track station below or scrub the groove rail to move from dropping your favorites, through Mila&rsquo;s music identity, to overlap and conversation.
            </p>
          </div>

          {/* Music-Player Progress Rail & 3 Core Track Stations */}
          <div className="mt-10 bg-[#141414] border border-[#F4F0E8]/20 p-5 sm:p-7 rounded-[4px]">
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-[#AAA8A6] mb-3">
              <span>PLAYHEAD: {currentTrack.trackCode} ({currentVisual.badge})</span>
              <span className="tabular-nums">{currentTrack.duration}</span>
            </div>

            {/* Interactive Groove Waveform Progress Bar */}
            <div className="relative py-2">
              <div className="w-full h-1.5 bg-[#0B0B0B] border border-[#F4F0E8]/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C92533] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* 3 Core Onboarding Station Nodes */}
              <div className="mt-3 sm:mt-0 sm:absolute sm:inset-0 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:px-4 pointer-events-none">
                {HOW_IT_WORKS_STEPS.map((step) => {
                  const reached = step.index <= activeStepIndex;
                  const isCurrent = step.index === activeStepIndex;
                  return (
                    <button
                      key={step.trackCode}
                      type="button"
                      onClick={() => selectStepManually(step.index)}
                      aria-label={`Jump to ${step.title}`}
                      className={`pointer-events-auto px-2.5 sm:px-3 py-1.5 rounded-[3px] text-[11px] sm:text-xs font-mono-code uppercase tracking-wider border transition-all cursor-pointer whitespace-nowrap ${
                        isCurrent
                          ? 'bg-[#C92533] text-[#F4F0E8] border-[#F4F0E8] sm:scale-105 shadow-lg'
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

            {/* 4-Stage Visual Screen Sequence Switcher (including intermediate HM-00 Music Identity bridge) */}
            <div
              role="group"
              aria-label="Visual phone screen sequence"
              className="mt-4 pt-3 border-t border-[#F4F0E8]/10 flex flex-wrap items-center justify-between gap-2"
            >
              <span className="text-[11px] font-mono-code uppercase text-[#AAA8A6]">
                Screen Walkthrough Sequence:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {VISUAL_STAGES.map((stage, idx) => {
                  const active = stage.stageId === visualStageId;
                  const label =
                    stage.stageId === 'hm-01'
                      ? '01. Drop Favorites'
                      : stage.stageId === 'hm-00'
                      ? '↳ Music Identity (Mila)'
                      : stage.stageId === 'hm-02'
                      ? '02. Find Overlap'
                      : '03. Start Conversation';
                  return (
                    <button
                      key={stage.stageId}
                      type="button"
                      onClick={() => selectVisualStageManually(stage.stageId)}
                      aria-pressed={active}
                      className={`px-2.5 py-1 rounded-[3px] text-[11px] font-mono-code uppercase transition-colors cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-[#F4F0E8] text-[#0B0B0B] font-bold'
                          : 'bg-[#0B0B0B] text-[#AAA8A6] border border-[#F4F0E8]/20 hover:text-[#F4F0E8]'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Stage: Central Phone Cutout Walkthrough + Perforated Ticket & Track Details */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left/Center 5 Cols: Stabilized Phone Cutout Stage with Vinyl Grooves & Masked Transitions */}
              <div className="lg:col-span-5 flex flex-col items-center justify-between bg-[#0B0B0B] border border-[#F4F0E8]/15 p-5 sm:p-6 rounded-[4px] relative overflow-hidden">
                <div
                  aria-hidden="true"
                  className="halftone-patch absolute inset-0 opacity-20 pointer-events-none"
                />

                {/* Subtle Concentric Vinyl Groove Backdrop Behind Device */}
                <div
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[310px] h-[310px] opacity-25 pointer-events-none"
                >
                  <VinylDisc className="w-full h-full" labelSide={activeStepIndex === 2 ? 'B' : 'A'} />
                </div>

                {/* Stage Top Caption Badge */}
                <div className="relative z-10 w-full flex items-center justify-between text-[11px] font-mono-code uppercase text-[#AAA8A6] border-b border-[#F4F0E8]/15 pb-2 mb-3">
                  <span className="text-[#C92533] font-bold">{currentVisual.badge}</span>
                  <span className="tabular-nums">VIEW {currentVisualIndex + 1}/4</span>
                </div>

                {/* Aspect-Ratio Locked Phone Cutout Container */}
                <div
                  key={currentVisual.stageId}
                  data-testid="how-it-works-phone-stage"
                  data-visual-stage={currentVisual.stageId}
                  className={`relative z-10 w-full max-w-[275px] aspect-[720/1490] mx-auto transition-transform duration-500 ${currentVisual.transitionClass}`}
                  style={{ transform: currentVisual.tiltStyle }}
                >
                  <img
                    src={currentVisual.imageSrc}
                    alt={currentVisual.imageAlt}
                    className="w-full h-full object-contain drop-shadow-[0_20px_38px_rgba(0,0,0,0.85)] select-none"
                  />

                  {/* Live Compatibility Score Overlay Centered Inside HM-00 (94%) and HM-02 (91%) Ring */}
                  {currentVisual.ringOverlay && (
                    <div
                      style={{
                        left: currentVisual.ringOverlay.centerXPct,
                        top: currentVisual.ringOverlay.centerYPct,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none text-center"
                    >
                      <span className="font-sans-ui font-extrabold text-lg sm:text-xl text-[#F4F0E8] tabular-nums leading-none drop-shadow">
                        {currentVisual.ringOverlay.score}%
                      </span>
                      <span className="text-[7.5px] font-mono-code uppercase tracking-widest text-[#C92533] font-bold mt-1">
                        {currentVisual.ringOverlay.sublabel}
                      </span>
                    </div>
                  )}
                </div>

                {/* Editorial Bridge Caption Under Phone */}
                <div className="relative z-10 w-full mt-4 pt-3 border-t border-[#F4F0E8]/15 text-center">
                  <div className="font-editorial italic text-base sm:text-lg text-[#F4F0E8]">
                    {currentVisual.captionTitle}
                  </div>
                  <p className="mt-0.5 text-xs text-[#AAA8A6]">
                    {currentVisual.captionLine}
                  </p>
                </div>
              </div>

              {/* Right 7 Cols: Station Details, Travelling Perforated Ticket & Step Controls */}
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

                  {/* Travelling Perforated Paper Ticket Stub */}
                  <div className="mt-6">
                    <div
                      className="ticket-perforated w-full bg-[#EAE3D5] text-[#0B0B0B] p-4 sm:p-5 shadow-xl transition-transform duration-300"
                      style={{
                        transform: `rotate(${
                          activeStepIndex === 0 ? '-0.8deg' : activeStepIndex === 1 ? '0.8deg' : '-0.5deg'
                        })`,
                      }}
                    >
                      <div className="border-2 border-[#0B0B0B] p-3.5 sm:p-4">
                        <div className="flex items-center justify-between border-b border-[#0B0B0B]/40 pb-2 text-[10px] font-mono-code uppercase">
                          <span className="font-bold">{currentTrack.ticketStamp}</span>
                          <span>#{currentTrack.ticketSerial}</span>
                        </div>

                        <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-2">
                          <div className="font-condensed font-extrabold text-2xl sm:text-3xl uppercase leading-none tracking-tight">
                            0{currentTrack.index + 1}. {currentTrack.title}
                          </div>
                          <span className="text-[11px] font-mono-code uppercase text-[#C92533] font-bold">
                            {currentTrack.subtitle}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {currentTrack.previewChips.map((chip) => (
                            <span
                              key={chip}
                              className="px-2 py-0.5 bg-[#0B0B0B] text-[#F4F0E8] text-[10px] font-mono-code uppercase"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>

                        <div className="mt-3 pt-2 border-t border-dashed border-[#0B0B0B]/50 flex items-center justify-between text-[10px] font-mono-code">
                          <span className="text-[#C92533] font-bold">ADMIT TWO · 18+</span>
                          <span>MUSIC &gt; LOOKS</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Station Output + Optional Bridge Toggle */}
                  <div className="mt-6 p-4 bg-[#141414] border border-[#F4F0E8]/15 rounded-[3px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] font-mono-code uppercase text-[#AAA8A6]">
                        Live Station Output
                      </div>
                      <div className="mt-1 text-sm font-mono-code text-[#F4F0E8]">
                        {currentTrack.sampleOutput}
                      </div>
                    </div>
                    {activeStepIndex === 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          selectVisualStageManually(
                            visualStageId === 'hm-00' ? 'hm-01' : 'hm-00'
                          )
                        }
                        className="px-3 py-1.5 text-[11px] font-mono-code uppercase border border-[#C92533] text-[#F4F0E8] hover:bg-[#C92533] rounded-[3px] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        {visualStageId === 'hm-00'
                          ? '← Back to Favorites (HM-01)'
                          : 'Inspect Mila Identity (HM-00) →'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Previous / Next Track Controls */}
                <div className="mt-8 pt-4 border-t border-[#F4F0E8]/15 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handlePrevTrack}
                    className="px-4 py-2 text-xs font-mono-code uppercase border border-[#F4F0E8]/30 text-[#F4F0E8] hover:border-[#F4F0E8] rounded-[3px] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    &larr; Previous Track
                  </button>

                  <div className="flex items-center gap-2">
                    {HOW_IT_WORKS_STEPS.map((s) => (
                      <button
                        key={s.index}
                        type="button"
                        onClick={() => selectStepManually(s.index)}
                        aria-label={`Select Track 0${s.index + 1}`}
                        className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                          s.index === activeStepIndex ? 'bg-[#C92533]' : 'bg-[#F4F0E8]/25'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextTrack}
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
