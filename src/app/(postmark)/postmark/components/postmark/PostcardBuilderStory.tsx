'use client';

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, Check, Copy, Eye, RotateCcw } from 'lucide-react';
import { POSTMARK_ASSETS } from '../../lib/postmark/assets';
import {
  POSTCARD_NOTE_MAX_LENGTH,
  createInitialBuilderState,
  getBuilderStageFromProgress,
  getProgressForBuilderStage,
  getRemainingNoteChars,
  sanitizePostcardNote,
  selectBuilderDestination,
  type BuilderStageIndex,
} from '../../lib/postmark/logic';
import {
  DESTINATION_LIST,
  DESTINATIONS,
  PHOTO_STYLES,
  STAMP_DEFINITIONS,
  type DestinationId,
  type PhotoStyleId,
  type StampStyleId,
} from '../../lib/postmark/sampleMemories';
import { ensureGsapRegistered, usePrefersReducedMotion } from '../../lib/postmark/motion';
import { MotionText } from './MotionText';
import { PaperButton } from './PaperButton';
import { PostcardPreviewDialog } from './PostcardPreviewDialog';
import { PostalCancellationSeal, SVGStamp } from './SVGStamp';

const STAGE_META: ReadonlyArray<{
  index: BuilderStageIndex;
  code: string;
  shortLabel: string;
  title: string;
  subtitle: string;
}> = [
  {
    index: 0,
    code: 'STEP 01',
    shortLabel: 'Choose',
    title: 'CHOOSE A MOMENT',
    subtitle: 'Start with a photograph that takes you right back.',
  },
  {
    index: 1,
    code: 'STEP 02',
    shortLabel: 'Write',
    title: 'WRITE WHAT MATTERED',
    subtitle: 'The best travel stories fit in a few honest lines.',
  },
  {
    index: 2,
    code: 'STEP 03',
    shortLabel: 'Stamp',
    title: 'STAMP & KEEP',
    subtitle: 'Mark the place, save the feeling.',
  },
];

export const PostcardBuilderStory: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();
  const [isDesktopPinViewport, setIsDesktopPinViewport] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 901px)').matches : true
  );

  const [builderState, setBuilderState] = useState(() => createInitialBuilderState('lisbon'));
  const [activeStage, setActiveStage] = useState<BuilderStageIndex>(0);
  const [stepCounterLabel, setStepCounterLabel] = useState<'1/3' | '2/3' | '3/3'>('1/3');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [copiedFeedback, setCopiedFeedback] = useState<boolean>(false);

  const noteInputId = useId();
  const mobileNoteInputId = useId();

  const outerSectionRef = useRef<HTMLElement | null>(null);
  const pinStageRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const cardCanvasRef = useRef<HTMLDivElement | null>(null);
  const penStrokePathRef = useRef<SVGPathElement | null>(null);
  const stampDropWrapRef = useRef<HTMLDivElement | null>(null);
  const previewTriggerRef = useRef<HTMLButtonElement | null>(null);

  const isPinnedMode = isDesktopPinViewport && !reducedMotion;

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(min-width: 901px)');
    const update = () => setIsDesktopPinViewport(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Desktop Pinned ScrollTrigger across all 3 stages (CHOOSE -> WRITE -> STAMP)
  useEffect(() => {
    if (!isPinnedMode) {
      scrollTriggerRef.current = null;
      return;
    }

    ensureGsapRegistered();
    const pinEl = pinStageRef.current;
    if (!pinEl) return;

    const ctx = gsap.context(() => {
      if (penStrokePathRef.current) {
        const len = penStrokePathRef.current.getTotalLength();
        gsap.set(penStrokePathRef.current, { strokeDasharray: len, strokeDashoffset: len });
      }

      const st = ScrollTrigger.create({
        trigger: pinEl,
        start: 'top top',
        end: '+=255%',
        pin: true,
        scrub: 0.55,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const metrics = getBuilderStageFromProgress(self.progress);
          setScrollProgress(self.progress);
          setActiveStage((prev) => (prev === metrics.activeStage ? prev : metrics.activeStage));
          setStepCounterLabel((prev) =>
            prev === metrics.stepCounterLabel ? prev : metrics.stepCounterLabel
          );

          // Physical paper card transformation per stage
          if (cardCanvasRef.current) {
            const angles = [-1.8, 0.9, -0.4];
            const scales = [0.985, 1, 1.015];
            gsap.to(cardCanvasRef.current, {
              rotateZ: angles[metrics.activeStage],
              scale: scales[metrics.activeStage],
              duration: 0.28,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }

          // Animate vector fountain-pen line during Stage 2+
          if (penStrokePathRef.current) {
            const len = penStrokePathRef.current.getTotalLength();
            const writeDraw =
              metrics.activeStage === 0
                ? 0
                : metrics.activeStage === 1
                ? Math.min(1, metrics.stageLocalProgress * 1.45)
                : 1;
            gsap.set(penStrokePathRef.current, {
              strokeDashoffset: len * (1 - writeDraw),
            });
          }
        },
      });

      scrollTriggerRef.current = st;
    }, outerSectionRef);

    return () => {
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, [isPinnedMode]);

  // Tactile stamp impulse when entering Stage 3
  useEffect(() => {
    if (reducedMotion || activeStage !== 2 || !stampDropWrapRef.current) return;
    gsap.fromTo(
      stampDropWrapRef.current,
      { scale: 1.24, rotateZ: -9 },
      { scale: 1, rotateZ: -2, duration: 0.42, ease: 'back.out(2.1)', overwrite: 'auto' }
    );
  }, [activeStage, builderState.stampStyleId, reducedMotion]);

  // Manual step selection synchronized cleanly with ScrollTrigger progress
  const goToStage = useCallback(
    (targetStage: BuilderStageIndex) => {
      setActiveStage(targetStage);
      const labels: ['1/3', '2/3', '3/3'] = ['1/3', '2/3', '3/3'];
      setStepCounterLabel(labels[targetStage]);

      const st = scrollTriggerRef.current;
      if (isPinnedMode && st) {
        const targetProgress = getProgressForBuilderStage(targetStage);
        const targetScrollY = st.start + (st.end - st.start) * targetProgress;
        window.scrollTo({
          top: targetScrollY,
          behavior: reducedMotion ? 'auto' : 'smooth',
        });
      }
    },
    [isPinnedMode, reducedMotion]
  );

  const handleSelectDestination = (destId: DestinationId) => {
    setBuilderState((prev) => selectBuilderDestination(prev, destId, true));
  };

  const handleSelectPhotoStyle = (photoStyleId: PhotoStyleId) => {
    setBuilderState((prev) => ({ ...prev, photoStyleId }));
  };

  const handleSelectStamp = (stampStyleId: StampStyleId) => {
    setBuilderState((prev) => ({ ...prev, stampStyleId }));
  };

  const handleNoteChange = (value: string) => {
    setBuilderState((prev) => ({ ...prev, note: sanitizePostcardNote(value) }));
  };

  const handleReset = () => {
    setBuilderState(createInitialBuilderState('lisbon'));
  };

  const handleCopyNote = async () => {
    const dest = DESTINATIONS[builderState.destinationId];
    const payload = `${builderState.note.trim()} — ${dest.city}, ${dest.country}`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(payload);
      } else {
        const el = document.createElement('textarea');
        el.value = payload;
        el.className = 'sr-only';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopiedFeedback(true);
      window.setTimeout(() => setCopiedFeedback(false), 2200);
    } catch {
      setCopiedFeedback(true);
      window.setTimeout(() => setCopiedFeedback(false), 2200);
    }
  };

  const currentDest = DESTINATIONS[builderState.destinationId];
  const currentPhoto =
    PHOTO_STYLES.find((p) => p.id === builderState.photoStyleId) ?? PHOTO_STYLES[0];
  const remainingChars = getRemainingNoteChars(builderState.note);

  return (
    <section
      id="features"
      ref={outerSectionRef}
      aria-labelledby="pm-builder-heading"
      className="relative w-full bg-[var(--pm-paper)] pm-paper-grain border-t border-[var(--pm-brown)]/12"
    >
      {isPinnedMode ? (
        /* =====================================================================
           DESKTOP PINNED 3-STAGE PRESENTATION (CHOOSE -> WRITE -> STAMP)
           ===================================================================== */
        <div
          ref={pinStageRef}
          className="mx-auto flex min-h-screen w-full max-w-[1380px] flex-col justify-center px-8 lg:px-12 py-8"
        >
          {/* Top Chapter Header + Deterministic 1/3, 2/3, 3/3 Progress Indicator */}
          <div className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-[var(--pm-brown)]/15">
            <div>
              <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--pm-red-deep)]">
                02 · Postcard Builder · Interactive Demo — No Account or Memory Saved
              </p>
              <h2
                id="pm-builder-heading"
                className="mt-1.5 font-editorial text-[clamp(2rem,3.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[var(--pm-ink)]"
              >
                A MEMORY, MADE YOURS.
              </h2>
              <p className="mt-1 font-ui text-[16px] text-[var(--pm-ink)]/80">
                From a photo to a postcard worth sending yourself.
              </p>
            </div>

            {/* Step Counter & Prev/Next Controls */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span
                  data-testid="builder-step-counter"
                  className="block font-editorial text-2xl font-semibold tabular-nums text-[var(--pm-ink)]"
                >
                  {stepCounterLabel}
                </span>
                <span className="block font-ui text-[11px] uppercase tracking-[0.14em] text-[var(--pm-brown)]/75">
                  Scroll or Select Stage
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Previous builder stage"
                  disabled={activeStage === 0}
                  onClick={() => goToStage(Math.max(0, activeStage - 1) as BuilderStageIndex)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--pm-brown)]/25 bg-[var(--pm-ivory)] text-[var(--pm-ink)] hover:bg-[var(--pm-parchment)] disabled:opacity-40 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next builder stage"
                  disabled={activeStage === 2}
                  onClick={() => goToStage(Math.min(2, activeStage + 1) as BuilderStageIndex)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--pm-brown)]/25 bg-[var(--pm-ivory)] text-[var(--pm-ink)] hover:bg-[var(--pm-parchment)] disabled:opacity-40 cursor-pointer"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Asymmetric Two-Zone Workspace */}
          <div className="mt-7 grid grid-cols-12 gap-8 xl:gap-12 items-center">
            {/* LEFT: 4:5 Scenic Builder Frame (03-feature-postcard-builder.webp) + Live Transforming Postcard */}
            <div className="col-span-6 relative flex items-center justify-center">
              {/* Supplied 4:5 Scenic Product Print Backdrop */}
              <div className="relative w-full max-w-[490px] aspect-[4/5] overflow-hidden rounded-xl border border-[var(--pm-brown)]/20 bg-[var(--pm-ivory)] shadow-[0_22px_50px_rgba(62,41,26,0.14)]">
                <img
                  src={POSTMARK_ASSETS.postcardBuilder}
                  alt="POSTMARK Postcard Builder mobile interface surrounded by Amalfi coast prints, stamps, and transit tickets"
                  width={896}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover opacity-35"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F7F1E8]/92 via-[#F7F1E8]/48 to-transparent" />

                {/* Live Transforming Paper Postcard Centered Over Scenic Desk */}
                <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-7">
                  <div
                    ref={cardCanvasRef}
                    className="relative w-full max-w-[400px] pm-postcard-sheet p-4 sm:p-5 will-change-transform"
                  >
                    {/* Stage 3 Airmail Seal Strip along top edge */}
                    <div
                      className={`pm-airmail-band absolute inset-x-0 top-0 h-1.5 transition-opacity duration-300 ${
                        activeStage === 2 ? 'opacity-100' : 'opacity-0'
                      }`}
                      aria-hidden="true"
                    />

                    {/* Card Top Bar: Destination Label + Stamp Slot */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-ui text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--pm-red-deep)]">
                          {STAGE_META[activeStage].code} · {currentDest.code}
                        </span>
                        <h3 className="font-editorial text-xl font-semibold text-[var(--pm-ink)]">
                          {currentDest.city}, {currentDest.country}
                        </h3>
                        <p className="font-ui text-[11px] text-[var(--pm-brown)]/75">
                          {currentDest.dateLabel}
                        </p>
                      </div>

                      {/* Upper-right Stamp Zone */}
                      <div className="relative shrink-0">
                        {activeStage >= 2 ? (
                          <div ref={stampDropWrapRef} className="relative flex items-center">
                            <PostalCancellationSeal
                              topText={currentDest.city.toUpperCase()}
                              bottomText="POSTMARK"
                              centerText={currentDest.code}
                              className="h-12 w-12 text-[var(--pm-brown)]/75 -mr-3 z-10"
                            />
                            <SVGStamp stampId={builderState.stampStyleId} size="sm" />
                          </div>
                        ) : (
                          <div className="flex h-[76px] w-[62px] flex-col items-center justify-center border border-dashed border-[var(--pm-brown)]/35 bg-[var(--pm-paper)]/65 text-center px-1">
                            <span className="font-ui text-[9px] uppercase tracking-[0.12em] text-[var(--pm-brown)]/65">
                              Stamp
                            </span>
                            <span className="font-ui text-[9px] text-[var(--pm-brown)]/50">
                              Step 03
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stage 1+ Curated Photograph Mat with Corner Tabs */}
                    <div className={`relative mt-3.5 p-2 border border-[var(--pm-brown)]/15 ${currentPhoto.frameTintClass}`}>
                      {/* Four tactile photo-corner mounts */}
                      <span aria-hidden="true" className="absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 border-[var(--pm-brown)]/50" />
                      <span aria-hidden="true" className="absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2 border-[var(--pm-brown)]/50" />
                      <span aria-hidden="true" className="absolute left-1 bottom-1 h-3 w-3 border-l-2 border-b-2 border-[var(--pm-brown)]/50" />
                      <span aria-hidden="true" className="absolute right-1 bottom-1 h-3 w-3 border-r-2 border-b-2 border-[var(--pm-brown)]/50" />

                      <div className="aspect-[16/10] w-full overflow-hidden bg-[var(--pm-parchment)]">
                        <img
                          src={currentPhoto.assetUrl}
                          alt={`${currentDest.city} — ${currentPhoto.label}`}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className={`h-full w-full transition-transform duration-500 ${currentPhoto.cropClass}`}
                        />
                      </div>
                    </div>

                    {/* Stage 2+ Handwritten Note Lines & Vector Pen Flourish */}
                    <div
                      className={`mt-3.5 pm-ruled-paper border border-[var(--pm-brown)]/12 p-3 transition-opacity duration-300 ${
                        activeStage >= 1 ? 'opacity-100' : 'opacity-65'
                      }`}
                    >
                      <p className="font-hand text-[21px] leading-[1.28] text-[var(--pm-ink)] line-clamp-3 min-h-[54px]">
                        {builderState.note.trim() || currentDest.sampleNote}
                      </p>
                      <svg
                        viewBox="0 0 320 12"
                        className="mt-1 h-2.5 w-full overflow-visible"
                        aria-hidden="true"
                      >
                        <path
                          ref={penStrokePathRef}
                          d="M 4 8 Q 92 2 178 7 T 312 5"
                          fill="none"
                          stroke="#D85743"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    {/* Archive Pocket Strip */}
                    <div className="mt-3 flex items-center justify-between font-ui text-[11px] text-[var(--pm-brown)]/80">
                      <span>{currentDest.coordinatesLabel}</span>
                      <span className="font-semibold text-[var(--pm-red-deep)]">
                        {activeStage === 2 ? 'READY TO KEEP' : currentDest.postmarkCode}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: 3-Step Vertical Index + Active Stage Paper Editing Surface */}
            <div className="col-span-6 flex flex-col">
              {/* 3-Step Interactive Index Tabs */}
              <div
                role="tablist"
                aria-label="Postcard builder stages"
                className="grid grid-cols-3 gap-2.5"
              >
                {STAGE_META.map((stage) => {
                  const isCurrent = activeStage === stage.index;
                  return (
                    <button
                      key={stage.code}
                      role="tab"
                      type="button"
                      aria-selected={isCurrent}
                      onClick={() => goToStage(stage.index)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowRight') {
                          e.preventDefault();
                          goToStage(((stage.index + 1) % 3) as BuilderStageIndex);
                        } else if (e.key === 'ArrowLeft') {
                          e.preventDefault();
                          goToStage(((stage.index + 2) % 3) as BuilderStageIndex);
                        }
                      }}
                      className={`min-h-[56px] text-left p-3 border transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[var(--pm-ivory)] border-[var(--pm-red)] shadow-[0_8px_20px_rgba(216,87,67,0.12)]'
                          : 'bg-[var(--pm-parchment)]/45 border-[var(--pm-brown)]/18 hover:bg-[var(--pm-ivory)]/80'
                      }`}
                    >
                      <span
                        className={`block font-ui text-[10px] font-bold uppercase tracking-[0.14em] ${
                          isCurrent ? 'text-[var(--pm-red)]' : 'text-[var(--pm-brown)]/70'
                        }`}
                      >
                        {stage.code}
                      </span>
                      <span className="mt-0.5 block font-editorial text-[15px] font-semibold text-[var(--pm-ink)] whitespace-nowrap truncate">
                        {stage.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Overall Scroll Progress Hairline */}
              <div className="mt-2 h-1 w-full bg-[var(--pm-brown)]/12 overflow-hidden" aria-hidden="true">
                <div
                  className="h-full bg-[var(--pm-red)] origin-left transition-transform duration-100"
                  style={{ transform: `scaleX(${Math.max(0.06, scrollProgress)})` }}
                />
              </div>

              {/* Active Stage Detail & Interactive Controls */}
              <div className="mt-5 pm-postcard-sheet p-6 xl:p-7">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-ui text-xs font-semibold uppercase tracking-[0.15em] text-[var(--pm-red-deep)]">
                    {STAGE_META[activeStage].code} — {STAGE_META[activeStage].title}
                  </span>
                  <span className="font-ui text-xs tabular-nums text-[var(--pm-brown)]/70">
                    Stage {activeStage + 1} of 3
                  </span>
                </div>

                <p className="mt-1.5 font-editorial text-2xl text-[var(--pm-ink)]">
                  {STAGE_META[activeStage].subtitle}
                </p>

                {/* STAGE 01 CONTROLS: Destination + Photo Style */}
                {activeStage === 0 && (
                  <div className="mt-5 space-y-5">
                    <div>
                      <span className="block font-ui text-xs font-semibold uppercase tracking-[0.12em] text-[var(--pm-brown)]">
                        1. Choose Sample Destination
                      </span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {DESTINATION_LIST.map((dest, idx) => {
                          const selected = builderState.destinationId === dest.id;
                          return (
                            <button
                              key={dest.id}
                              type="button"
                              data-builder-first-control={idx === 0 ? 'true' : undefined}
                              aria-pressed={selected}
                              onClick={() => handleSelectDestination(dest.id)}
                              className={`min-h-[42px] px-4 py-2 font-ui text-xs font-semibold uppercase tracking-[0.1em] border transition-colors cursor-pointer whitespace-nowrap ${
                                selected
                                  ? 'bg-[var(--pm-ink)] text-[var(--pm-ivory)] border-[var(--pm-ink)]'
                                  : 'bg-[var(--pm-paper)] text-[var(--pm-ink)] border-[var(--pm-brown)]/25 hover:bg-[var(--pm-parchment)]'
                              }`}
                            >
                              {dest.city}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <span className="block font-ui text-xs font-semibold uppercase tracking-[0.12em] text-[var(--pm-brown)]">
                        2. Select Print Framing
                      </span>
                      <div className="mt-2 grid grid-cols-3 gap-2.5">
                        {PHOTO_STYLES.map((style) => {
                          const selected = builderState.photoStyleId === style.id;
                          return (
                            <button
                              key={style.id}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => handleSelectPhotoStyle(style.id)}
                              className={`p-2.5 text-left border transition-colors cursor-pointer ${
                                selected
                                  ? 'bg-[var(--pm-ivory)] border-[var(--pm-red)] ring-1 ring-[var(--pm-red)]'
                                  : 'bg-[var(--pm-paper)]/70 border-[var(--pm-brown)]/20 hover:bg-[var(--pm-ivory)]'
                              }`}
                            >
                              <span className="block font-ui text-xs font-semibold text-[var(--pm-ink)] truncate">
                                {style.label}
                              </span>
                              <span className="mt-0.5 block font-ui text-[11px] text-[var(--pm-brown)]/75 line-clamp-1">
                                {style.caption}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-[var(--pm-brown)]/12">
                      <span className="font-ui text-xs text-[var(--pm-brown)]/75">
                        Scroll down or advance to write your note
                      </span>
                      <PaperButton variant="parchment" size="sm" onClick={() => goToStage(1)}>
                        Continue to Step 02 →
                      </PaperButton>
                    </div>
                  </div>
                )}

                {/* STAGE 02 CONTROLS: Editable Postcard Note */}
                {activeStage === 1 && (
                  <div className="mt-5 space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor={noteInputId}
                          className="font-ui text-xs font-semibold uppercase tracking-[0.12em] text-[var(--pm-brown)]"
                        >
                          Handwritten Postcard Note ({currentDest.city})
                        </label>
                        <span className="font-ui text-xs tabular-nums text-[var(--pm-brown)]/75">
                          {remainingChars} / {POSTCARD_NOTE_MAX_LENGTH} left
                        </span>
                      </div>
                      <textarea
                        id={noteInputId}
                        rows={3}
                        maxLength={POSTCARD_NOTE_MAX_LENGTH}
                        value={builderState.note}
                        onChange={(e) => handleNoteChange(e.target.value)}
                        placeholder="Write two or three honest sentences from the journey..."
                        className="mt-2 w-full pm-ruled-paper border border-[var(--pm-brown)]/30 p-3 font-hand text-[23px] leading-[1.32] text-[var(--pm-ink)] focus:border-[var(--pm-red)]"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--pm-brown)]/12">
                      <div className="flex items-center gap-2">
                        <PaperButton variant="parchment" size="sm" onClick={handleCopyNote}>
                          {copiedFeedback ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                          <span>{copiedFeedback ? 'Copied' : 'Copy Note'}</span>
                        </PaperButton>
                        <PaperButton
                          variant="ghost"
                          size="sm"
                          onClick={() => handleNoteChange(currentDest.sampleNote)}
                        >
                          Restore Sample Line
                        </PaperButton>
                      </div>

                      <PaperButton variant="parchment" size="sm" onClick={() => goToStage(2)}>
                        Continue to Step 03 →
                      </PaperButton>
                    </div>
                  </div>
                )}

                {/* STAGE 03 CONTROLS: Stamp Choice + Preview Modal + Reset */}
                {activeStage === 2 && (
                  <div className="mt-5 space-y-5">
                    <div>
                      <span className="block font-ui text-xs font-semibold uppercase tracking-[0.12em] text-[var(--pm-brown)]">
                        Select Authored Postage Stamp
                      </span>
                      <div className="mt-2.5 grid grid-cols-3 gap-3">
                        {(['coastal-crest', 'mountain-air', 'midnight-ferry'] as StampStyleId[]).map(
                          (sId) => {
                            const sDef = STAMP_DEFINITIONS[sId];
                            const selected = builderState.stampStyleId === sId;
                            return (
                              <button
                                key={sId}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => handleSelectStamp(sId)}
                                className={`flex flex-col items-center p-2.5 border transition-colors cursor-pointer ${
                                  selected
                                    ? 'bg-[var(--pm-ivory)] border-[var(--pm-red)] ring-1 ring-[var(--pm-red)]'
                                    : 'bg-[var(--pm-paper)]/75 border-[var(--pm-brown)]/20 hover:bg-[var(--pm-ivory)]'
                                }`}
                              >
                                <SVGStamp stampId={sId} size="sm" />
                                <span className="mt-2 font-ui text-xs font-semibold text-[var(--pm-ink)] whitespace-nowrap">
                                  {sDef.title}
                                </span>
                              </button>
                            );
                          }
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--pm-brown)]/15">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <PaperButton
                          ref={previewTriggerRef}
                          variant="primary"
                          size="md"
                          onClick={() => setPreviewOpen(true)}
                        >
                          <Eye className="h-4 w-4" />
                          <span>Preview Postcard</span>
                        </PaperButton>

                        <PaperButton variant="parchment" size="md" onClick={handleCopyNote}>
                          {copiedFeedback ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          <span>{copiedFeedback ? 'Copied' : 'Copy Note'}</span>
                        </PaperButton>
                      </div>

                      <PaperButton variant="ghost" size="sm" onClick={handleReset}>
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Reset</span>
                      </PaperButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* =====================================================================
           MOBILE / TABLET (<=900px) & REDUCED MOTION: ALL 3 REAL STAGES STACKED
           ===================================================================== */
        <div className="mx-auto max-w-[900px] px-5 py-16 sm:px-8">
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-[var(--pm-red-deep)]">
            02 · Postcard Builder · Interactive Demo — No Account or Memory Saved
          </p>
          <MotionText
            as="h2"
            lines={['A MEMORY, MADE YOURS.']}
            className="mt-2 font-editorial text-[clamp(2.1rem,6vw,3.2rem)] font-semibold leading-[1.06] text-[var(--pm-ink)]"
          />
          <p className="mt-2 font-ui text-base sm:text-lg text-[var(--pm-ink)]/80">
            From a photo to a postcard worth sending yourself.
          </p>

          {/* Scenic Builder Artwork */}
          <div className="mt-8 overflow-hidden rounded-xl border border-[var(--pm-brown)]/20 bg-[var(--pm-ivory)] shadow-[0_16px_38px_rgba(62,41,26,0.12)]">
            <img
              src={POSTMARK_ASSETS.postcardBuilder}
              alt="POSTMARK Postcard Builder mobile app amidst coastal photographs and stamps"
              width={896}
              height={1200}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full max-h-[440px] object-cover object-center"
            />
          </div>

          {/* Stacked Stage 01 */}
          <div className="mt-8 pm-postcard-sheet p-5 sm:p-6">
            <div className="flex items-center justify-between font-ui text-xs font-semibold uppercase tracking-[0.14em] text-[var(--pm-red-deep)]">
              <span>STEP 01 — CHOOSE A MOMENT</span>
              <span className="tabular-nums">1/3</span>
            </div>
            <p className="mt-1 font-editorial text-xl text-[var(--pm-ink)]">
              Start with a photograph that takes you right back.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {DESTINATION_LIST.map((dest, idx) => (
                <button
                  key={dest.id}
                  type="button"
                  data-builder-first-control={idx === 0 ? 'true' : undefined}
                  aria-pressed={builderState.destinationId === dest.id}
                  onClick={() => handleSelectDestination(dest.id)}
                  className={`min-h-[44px] px-4 py-2 font-ui text-xs font-semibold uppercase tracking-[0.1em] border cursor-pointer ${
                    builderState.destinationId === dest.id
                      ? 'bg-[var(--pm-ink)] text-[var(--pm-ivory)] border-[var(--pm-ink)]'
                      : 'bg-[var(--pm-paper)] text-[var(--pm-ink)] border-[var(--pm-brown)]/25'
                  }`}
                >
                  {dest.city}
                </button>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {PHOTO_STYLES.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  aria-pressed={builderState.photoStyleId === style.id}
                  onClick={() => handleSelectPhotoStyle(style.id)}
                  className={`min-h-[48px] p-3 text-left border cursor-pointer ${
                    builderState.photoStyleId === style.id
                      ? 'bg-[var(--pm-ivory)] border-[var(--pm-red)]'
                      : 'bg-[var(--pm-paper)] border-[var(--pm-brown)]/20'
                  }`}
                >
                  <span className="block font-ui text-xs font-semibold text-[var(--pm-ink)]">
                    {style.label}
                  </span>
                  <span className="block font-ui text-[11px] text-[var(--pm-brown)]/75">
                    {style.caption}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Stacked Stage 02 */}
          <div className="mt-6 pm-postcard-sheet p-5 sm:p-6">
            <div className="flex items-center justify-between font-ui text-xs font-semibold uppercase tracking-[0.14em] text-[var(--pm-red-deep)]">
              <span>STEP 02 — WRITE WHAT MATTERED</span>
              <span className="tabular-nums">2/3</span>
            </div>
            <p className="mt-1 font-editorial text-xl text-[var(--pm-ink)]">
              The best travel stories fit in a few honest lines.
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={mobileNoteInputId}
                  className="font-ui text-xs font-semibold uppercase tracking-[0.12em] text-[var(--pm-brown)]"
                >
                  Postcard Note ({currentDest.city})
                </label>
                <span className="font-ui text-xs tabular-nums text-[var(--pm-brown)]/75">
                  {remainingChars} left
                </span>
              </div>
              <textarea
                id={mobileNoteInputId}
                rows={3}
                maxLength={POSTCARD_NOTE_MAX_LENGTH}
                value={builderState.note}
                onChange={(e) => handleNoteChange(e.target.value)}
                className="mt-2 w-full pm-ruled-paper border border-[var(--pm-brown)]/30 p-3 font-hand text-[23px] leading-[1.32] text-[var(--pm-ink)]"
              />
            </div>
          </div>

          {/* Stacked Stage 03 */}
          <div className="mt-6 pm-postcard-sheet p-5 sm:p-6">
            <div className="flex items-center justify-between font-ui text-xs font-semibold uppercase tracking-[0.14em] text-[var(--pm-red-deep)]">
              <span>STEP 03 — STAMP & KEEP</span>
              <span className="tabular-nums">3/3</span>
            </div>
            <p className="mt-1 font-editorial text-xl text-[var(--pm-ink)]">
              Mark the place, save the feeling.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {(['coastal-crest', 'mountain-air', 'midnight-ferry'] as StampStyleId[]).map((sId) => (
                <button
                  key={sId}
                  type="button"
                  aria-pressed={builderState.stampStyleId === sId}
                  onClick={() => handleSelectStamp(sId)}
                  className={`flex flex-col items-center p-2.5 border cursor-pointer ${
                    builderState.stampStyleId === sId
                      ? 'bg-[var(--pm-ivory)] border-[var(--pm-red)]'
                      : 'bg-[var(--pm-paper)] border-[var(--pm-brown)]/20'
                  }`}
                >
                  <SVGStamp stampId={sId} size="sm" />
                  <span className="mt-1.5 font-ui text-[11px] font-semibold text-[var(--pm-ink)] text-center">
                    {STAMP_DEFINITIONS[sId].title}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--pm-brown)]/15">
              <PaperButton
                ref={previewTriggerRef}
                variant="primary"
                size="md"
                onClick={() => setPreviewOpen(true)}
              >
                <Eye className="h-4 w-4" />
                <span>Preview Postcard</span>
              </PaperButton>

              <PaperButton variant="parchment" size="md" onClick={handleCopyNote}>
                {copiedFeedback ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copiedFeedback ? 'Copied' : 'Copy Note'}</span>
              </PaperButton>

              <PaperButton variant="outline" size="md" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </PaperButton>
            </div>
          </div>
        </div>
      )}

      {/* Accessible Native Dialog Preview */}
      <PostcardPreviewDialog
        open={previewOpen}
        onClose={() => {
          setPreviewOpen(false);
          previewTriggerRef.current?.focus();
        }}
        destinationId={builderState.destinationId}
        photoStyleId={builderState.photoStyleId}
        stampStyleId={builderState.stampStyleId}
        note={builderState.note}
        onReset={handleReset}
      />
    </section>
  );
};
