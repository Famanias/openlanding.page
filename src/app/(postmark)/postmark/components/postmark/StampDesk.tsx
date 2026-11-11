'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CornerDownRight, RotateCcw, Stamp } from 'lucide-react';
import { POSTMARK_ASSETS } from '../../lib/postmark/assets';
import { isPointInPostageZone } from '../../lib/postmark/logic';
import { STAMP_DEFINITIONS, type StampStyleId } from '../../lib/postmark/sampleMemories';
import {
  ensureGsapRegistered,
  prefersReducedMotionNow,
  usePrefersReducedMotion,
} from '../../lib/postmark/motion';
import { MotionText } from './MotionText';
import { PaperButton } from './PaperButton';
import { SVGStamp } from './SVGStamp';

interface DeskStampOption {
  id: string;
  stampStyle: StampStyleId;
  postmarkCity: string;
  tag: string;
  restingAngle: string;
}

const DESK_STAMPS: DeskStampOption[] = [
  {
    id: 'desk-lisbon',
    stampStyle: 'coastal-crest',
    postmarkCity: 'LISBOA · 14 OCT',
    tag: '24c Coastal Mail',
    restingAngle: '-rotate-3',
  },
  {
    id: 'desk-kyoto',
    stampStyle: 'mountain-air',
    postmarkCity: 'KYOTO · 03 NOV',
    tag: '38c Highland Post',
    restingAngle: 'rotate-2',
  },
  {
    id: 'desk-cph',
    stampStyle: 'midnight-ferry',
    postmarkCity: 'KØBENHAVN · 22 JUN',
    tag: '50c Maritime Transit',
    restingAngle: '-rotate-2',
  },
];

export const StampDesk: React.FC = () => {
  const [selectedStampId, setSelectedStampId] = useState<string>('desk-lisbon');
  const [placedStampId, setPlacedStampId] = useState<string | null>(null);
  const [cornerPeeled, setCornerPeeled] = useState<boolean>(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dropZoneHover, setDropZoneHover] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const deskStageRef = useRef<HTMLDivElement | null>(null);
  const arrowPathRef = useRef<SVGPathElement | null>(null);
  const postageZoneRef = useRef<HTMLButtonElement | null>(null);
  const placedStampWrapRef = useRef<HTMLDivElement | null>(null);
  const cancelRingRef = useRef<SVGCircleElement | null>(null);
  const cancelWavesRef = useRef<SVGPathElement | null>(null);

  const pointerStartRef = useRef<{
    id: string;
    pointerId: number;
    startX: number;
    startY: number;
    hasCrossedThreshold: boolean;
  } | null>(null);

  const reducedMotion = usePrefersReducedMotion();

  const selectedOption =
    DESK_STAMPS.find((s) => s.id === selectedStampId) ?? DESK_STAMPS[0];
  const placedOption =
    DESK_STAMPS.find((s) => s.id === placedStampId) ?? null;

  // Dramatic 3D perspective desk entrance + staggered stamp drops + curved handwritten arrow
  useEffect(() => {
    if (reducedMotion) return;
    ensureGsapRegistered();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (arrowPathRef.current) {
        const len = arrowPathRef.current.getTotalLength();
        gsap.set(arrowPathRef.current, { strokeDasharray: len, strokeDashoffset: len });
      }

      const trayItems = section.querySelectorAll<HTMLElement>('[data-desk-stamp-item]');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: deskStageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        deskStageRef.current,
        {
          rotateX: 8,
          rotateZ: -1.1,
          y: 42,
          transformPerspective: 1300,
        },
        {
          rotateX: 0,
          rotateZ: 0,
          y: 0,
          duration: 0.96,
          ease: 'power3.out',
        },
        0
      )
        .fromTo(
          trayItems,
          { y: -28, scale: 1.08, rotateZ: -6 },
          {
            y: 0,
            scale: 1,
            rotateZ: 0,
            duration: 0.56,
            stagger: 0.1,
            ease: 'back.out(1.7)',
          },
          0.22
        );

      if (arrowPathRef.current) {
        tl.to(
          arrowPathRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.78,
            ease: 'power2.out',
          },
          0.42
        );
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Animate physical stamp impact & circular cancellation mark drawing outward on placement
  useEffect(() => {
    if (!placedStampId || reducedMotion) return;

    const ctx = gsap.context(() => {
      if (placedStampWrapRef.current) {
        gsap.fromTo(
          placedStampWrapRef.current,
          { scale: 1.28, rotateZ: -8 },
          { scale: 1, rotateZ: -2, duration: 0.42, ease: 'back.out(2.2)' }
        );
      }

      if (cancelRingRef.current) {
        const ringLen = 2 * Math.PI * 30;
        gsap.fromTo(
          cancelRingRef.current,
          { strokeDasharray: ringLen, strokeDashoffset: ringLen },
          { strokeDashoffset: 0, duration: 0.48, delay: 0.14, ease: 'power2.out' }
        );
      }

      if (cancelWavesRef.current) {
        const waveLen = cancelWavesRef.current.getTotalLength();
        gsap.fromTo(
          cancelWavesRef.current,
          { strokeDasharray: waveLen, strokeDashoffset: waveLen },
          { strokeDashoffset: 0, duration: 0.46, delay: 0.22, ease: 'power2.out' }
        );
      }
    }, deskStageRef);

    return () => ctx.revert();
  }, [placedStampId, reducedMotion]);

  const placeStamp = (stampItemId: string) => {
    setSelectedStampId(stampItemId);
    setPlacedStampId(stampItemId);
    setDropZoneHover(false);
  };

  const handleResetDesk = () => {
    setPlacedStampId(null);
    setSelectedStampId('desk-lisbon');
    setCornerPeeled(false);
    setDraggingId(null);
    setDragOffset({ x: 0, y: 0 });
    setDropZoneHover(false);
  };

  // Pointer Events Dragging with Pointer Capture & 6px Threshold
  const handleStampPointerDown = (
    e: React.PointerEvent<HTMLButtonElement>,
    stampItemId: string
  ) => {
    if (e.button !== 0) return;
    setSelectedStampId(stampItemId);
    e.currentTarget.setPointerCapture(e.pointerId);
    pointerStartRef.current = {
      id: stampItemId,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      hasCrossedThreshold: false,
    };
  };

  const handleStampPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const state = pointerStartRef.current;
    if (!state || state.pointerId !== e.pointerId) return;

    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;

    if (!state.hasCrossedThreshold && Math.hypot(dx, dy) > 6) {
      state.hasCrossedThreshold = true;
      setDraggingId(state.id);
    }

    if (state.hasCrossedThreshold) {
      setDragOffset({ x: dx, y: dy });
      const zoneEl = postageZoneRef.current;
      if (zoneEl) {
        const rect = zoneEl.getBoundingClientRect();
        setDropZoneHover(
          isPointInPostageZone({ x: e.clientX, y: e.clientY }, rect, 32)
        );
      }
    }
  };

  const handleStampPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const state = pointerStartRef.current;
    if (!state || state.pointerId !== e.pointerId) return;

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    if (state.hasCrossedThreshold) {
      const zoneEl = postageZoneRef.current;
      if (zoneEl) {
        const rect = zoneEl.getBoundingClientRect();
        if (isPointInPostageZone({ x: e.clientX, y: e.clientY }, rect, 32)) {
          placeStamp(state.id);
        }
      }
    }

    pointerStartRef.current = null;
    setDraggingId(null);
    setDragOffset({ x: 0, y: 0 });
    setDropZoneHover(false);
  };

  return (
    <section
      id="stamp-desk"
      ref={sectionRef}
      aria-labelledby="pm-stamp-desk-heading"
      className="relative w-full bg-[var(--pm-paper)] pm-paper-grain py-20 sm:py-28 border-t border-[var(--pm-brown)]/15 overflow-hidden"
    >
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-[680px]">
            <p className="font-ui text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pm-red-deep)]">
              04 · The Stamp Desk · Tactile SVG Workshop (Interactive Demo)
            </p>
            <MotionText
              as="h2"
              id="pm-stamp-desk-heading"
              lines={['GIVE EVERY MEMORY ITS MARK.']}
              mode="paper-slice"
              className="mt-2 font-editorial text-[clamp(2.15rem,4.3vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.022em] text-[var(--pm-ink)]"
            />
            <p className="mt-3 font-ui text-base sm:text-lg text-[var(--pm-ink)]/80">
              Drag any vector stamp into the postage box—or select a stamp and tap the corner—to cancel it in ink.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <PaperButton
              variant="primary"
              size="md"
              onClick={() => placeStamp(selectedStampId)}
            >
              <Stamp className="h-4 w-4" />
              <span>Stamp Selected ({STAMP_DEFINITIONS[selectedOption.stampStyle].denomination}c)</span>
            </PaperButton>

            <PaperButton variant="outline" size="md" onClick={handleResetDesk}>
              <RotateCcw className="h-4 w-4" />
              <span>Reset Desk</span>
            </PaperButton>
          </div>
        </div>

        {/* Top-Down Ruled Paper Workshop Surface */}
        <div
          ref={deskStageRef}
          className="relative mt-11 rounded-xl border border-[var(--pm-brown)]/25 pm-ruled-paper p-5 sm:p-8 lg:p-10 shadow-[0_24px_60px_rgba(62,41,26,0.13)] will-change-transform"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT TRAY: 3 Interactive Draggable & Tappable Coded SVG Stamps + Pinned Ephemera Strip */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center justify-between">
                <span className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-[var(--pm-brown)]">
                  Postage Tray (Drag or Select)
                </span>
                <span className="font-hand text-xl text-[var(--pm-red-deep)]">
                  Pick your mark ↓
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {DESK_STAMPS.map((item) => {
                  const isSelected = selectedStampId === item.id;
                  const isBeingDragged = draggingId === item.id;
                  const def = STAMP_DEFINITIONS[item.stampStyle];

                  return (
                    <div key={item.id} data-desk-stamp-item className="flex flex-col items-center">
                      <button
                        type="button"
                        aria-label={`${def.title} (${item.tag}) — select or drag to postcard`}
                        aria-pressed={isSelected}
                        onPointerDown={(e) => handleStampPointerDown(e, item.id)}
                        onPointerMove={handleStampPointerMove}
                        onPointerUp={handleStampPointerUp}
                        onPointerCancel={handleStampPointerUp}
                        onClick={() => setSelectedStampId(item.id)}
                        style={
                          isBeingDragged
                            ? {
                                transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) scale(1.06) rotate(-4deg)`,
                                zIndex: 50,
                              }
                            : undefined
                        }
                        className={`group relative p-2 rounded-lg border touch-none cursor-grab active:cursor-grabbing transition-transform duration-200 ${
                          !isBeingDragged
                            ? `${item.restingAngle} hover:-translate-y-2 hover:-rotate-3 active:scale-95`
                            : 'shadow-2xl'
                        } ${
                          isSelected
                            ? 'bg-[var(--pm-ivory)] border-[var(--pm-red)] ring-2 ring-[var(--pm-red)]/40'
                            : 'bg-[var(--pm-ivory)]/80 border-[var(--pm-brown)]/20'
                        }`}
                      >
                        <SVGStamp stampId={item.stampStyle} size="sm" />
                      </button>
                      <span className="mt-2 font-ui text-[11px] font-semibold text-[var(--pm-ink)] text-center">
                        {def.title}
                      </span>
                      <span className="font-ui text-[10px] text-[var(--pm-brown)]/70 text-center">
                        {item.tag}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Handwritten curved SVG guide arrow toward center postcard */}
              <div className="hidden lg:flex items-center gap-3 pt-1 text-[var(--pm-red-deep)]" aria-hidden="true">
                <span className="font-hand text-xl">Drop into the postage corner</span>
                <svg viewBox="0 0 120 38" className="h-8 w-28 overflow-visible">
                  <path
                    ref={arrowPathRef}
                    d="M 4 28 Q 56 4 110 18 M 100 10 L 112 18 L 99 25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Pinned Source Ephemera Reference Sheet (05b-ephemera-stamp-sheet.webp) */}
              <div className="relative overflow-hidden border border-[var(--pm-brown)]/20 bg-white p-2.5 shadow-sm">
                <div aria-hidden="true" className="pm-washi-sage absolute -top-2 right-5 h-5 w-16 rotate-3" />
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={POSTMARK_ASSETS.ephemeraStampSheet}
                    alt="Printed collector stamp and cancellation mark reference sheet pinned to desk"
                    width={2752}
                    height={1536}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-1.5 font-ui text-[11px] text-[var(--pm-brown)]/75">
                  Printed cancellation specimen sheet · Archive Reference 05B
                </p>
              </div>
            </div>

            {/* CENTER: Interactive Correspondence Postcard with Postage Drop Zone & Corner Peel */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[470px] pm-postcard-sheet p-5 sm:p-7 overflow-hidden">
                {/* Tape corners */}
                <div aria-hidden="true" className="pm-washi-stripe absolute -top-2.5 left-6 h-5 w-20 -rotate-2" />

                {/* Postcard Header + Interactive Postage Drop Zone */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-editorial text-2xl tracking-[0.04em] text-[var(--pm-brown)]">
                      POST CARD
                    </p>
                    <p className="mt-0.5 font-ui text-[11px] uppercase tracking-[0.14em] text-[var(--pm-ink)]/65">
                      CORRESPONDENCE · VIA AIR MAIL
                    </p>

                    {/* Miniature Boarding Pass Motif */}
                    <div className="mt-3 inline-flex items-center gap-2 border border-[var(--pm-brown)]/25 bg-[var(--pm-paper)] px-2.5 py-1 font-ui text-[11px] font-semibold tracking-[0.08em] text-[var(--pm-ink)]">
                      <span>LIS → KYO</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[var(--pm-red-deep)]">PASS 8F771</span>
                    </div>
                  </div>

                  {/* Defined Postage Drop Target Button */}
                  <button
                    ref={postageZoneRef}
                    type="button"
                    data-testid="stamp-drop-zone"
                    aria-label={
                      placedOption
                        ? `Postage zone stamped with ${STAMP_DEFINITIONS[placedOption.stampStyle].title}. Activate to stamp ${STAMP_DEFINITIONS[selectedOption.stampStyle].title}`
                        : `Empty postage zone. Activate to place ${STAMP_DEFINITIONS[selectedOption.stampStyle].title} stamp`
                    }
                    onClick={() => placeStamp(selectedStampId)}
                    className={`relative flex min-h-[124px] min-w-[104px] items-center justify-center p-2 border-2 transition-colors cursor-pointer ${
                      dropZoneHover
                        ? 'border-[var(--pm-red)] bg-[var(--pm-red)]/10 scale-105'
                        : placedOption
                        ? 'border-[var(--pm-brown)]/25 bg-[var(--pm-paper)]/45'
                        : 'border-dashed border-[var(--pm-brown)]/40 bg-[var(--pm-paper)]/65 hover:border-[var(--pm-red)]'
                    }`}
                  >
                    {placedOption ? (
                      <div ref={placedStampWrapRef} className="relative">
                        <SVGStamp stampId={placedOption.stampStyle} size="sm" />
                        {/* Animated 2D Circular Postal Cancellation Overlay */}
                        <svg
                          viewBox="0 0 130 90"
                          aria-hidden="true"
                          className="pointer-events-none absolute -left-9 -bottom-3 h-20 w-28 overflow-visible"
                        >
                          <circle
                            ref={cancelRingRef}
                            cx="42"
                            cy="45"
                            r="30"
                            fill="none"
                            stroke="#25292C"
                            strokeWidth="2"
                            opacity="0.82"
                          />
                          <circle
                            cx="42"
                            cy="45"
                            r="21"
                            fill="none"
                            stroke="#D85743"
                            strokeWidth="1.2"
                            strokeDasharray="3 2"
                            opacity="0.85"
                          />
                          <text
                            x="42"
                            y="43"
                            textAnchor="middle"
                            fontSize="7"
                            fontWeight="700"
                            letterSpacing="1.1"
                            fill="#25292C"
                          >
                            POSTMARK
                          </text>
                          <text
                            x="42"
                            y="52"
                            textAnchor="middle"
                            fontSize="6"
                            fontWeight="700"
                            fill="#D85743"
                          >
                            {placedOption.postmarkCity.split(' · ')[0]}
                          </text>
                          <path
                            ref={cancelWavesRef}
                            d="M 70 35 Q 84 29 98 35 T 126 35 M 72 45 Q 86 39 100 45 T 128 45 M 70 55 Q 84 49 98 55 T 126 55"
                            fill="none"
                            stroke="#25292C"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            opacity="0.78"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="text-center px-1">
                        <span className="block font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--pm-red-deep)]">
                          Place Stamp
                        </span>
                        <span className="mt-1 block font-ui text-[10px] text-[var(--pm-brown)]/70">
                          Click or Drop Here
                        </span>
                      </div>
                    )}
                  </button>
                </div>

                {/* Handwritten Postcard Body */}
                <div className="mt-5 border-t border-[var(--pm-brown)]/15 pt-4">
                  <p className="font-hand text-[25px] leading-[1.32] text-[var(--pm-ink)]">
                    “Kept the harbor ferry ticket and stamped the date before boarding the night train.”
                  </p>
                  <p className="mt-2 font-ui text-xs text-[var(--pm-brown)]/75">
                    {placedOption
                      ? `Cancelled: ${placedOption.postmarkCity} · ${STAMP_DEFINITIONS[placedOption.stampStyle].title}`
                      : 'Unstamped draft · Choose a stamp to seal this memory'}
                  </p>
                </div>

                {/* Interactive Paper Corner Peel Revealing Hidden Tucked Note */}
                <div className="mt-5 pt-3 border-t border-[var(--pm-brown)]/12 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    aria-expanded={cornerPeeled}
                    onClick={() => setCornerPeeled((prev) => !prev)}
                    className="inline-flex min-h-[40px] items-center gap-1.5 font-ui text-xs font-semibold text-[var(--pm-brown)] hover:text-[var(--pm-red-deep)] cursor-pointer"
                  >
                    <CornerDownRight className="h-3.5 w-3.5" />
                    <span>{cornerPeeled ? 'Fold Corner Flat' : 'Peel Paper Corner'}</span>
                  </button>

                  {cornerPeeled && (
                    <span className="font-hand text-lg text-[var(--pm-red-deep)]">
                      Hidden note: Pier 4 · Sunset table #7
                    </span>
                  )}
                </div>

                {/* Visual folded corner triangle at bottom-right */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute bottom-0 right-0 h-12 w-12 origin-bottom-right border-l border-t border-[var(--pm-brown)]/25 bg-[var(--pm-parchment)] shadow-[-4px_-4px_10px_rgba(62,41,26,0.12)] transition-transform duration-300 ${
                    cornerPeeled ? 'scale-100 -translate-x-1 -translate-y-1 -rotate-6' : 'scale-0'
                  }`}
                />
              </div>
            </div>

            {/* RIGHT TRAY: Bounded Source Ephemera Collage Sheet (05a-ephemera-collage.webp) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="relative overflow-hidden border border-[var(--pm-brown)]/20 bg-[var(--pm-paper)] p-3 shadow-sm rotate-1">
                <div aria-hidden="true" className="pm-washi-stripe absolute -top-2 left-1/2 -translate-x-1/2 h-5 w-16" />
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={POSTMARK_ASSETS.ephemeraCollage}
                    alt="Travel ephemera specimen collage with vintage ticket No. 8F77189, map snippet, and coastal print"
                    width={2752}
                    height={1536}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-2 font-editorial text-sm font-semibold text-[var(--pm-ink)]">
                  Saved Paper Witnesses
                </p>
                <p className="mt-0.5 font-ui text-xs leading-relaxed text-[var(--pm-brown)]/80">
                  Transit stubs, luggage tags, and coastal Polaroids sit alongside your dated cancellation marks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
