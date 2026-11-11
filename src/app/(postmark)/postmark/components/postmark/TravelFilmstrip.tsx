'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { FILMSTRIP_VIGNETTES } from '../../lib/postmark/sampleMemories';
import {
  ensureGsapRegistered,
  prefersReducedMotionNow,
  usePrefersReducedMotion,
} from '../../lib/postmark/motion';
import { MotionText } from './MotionText';
import { PostalCancellationSeal, SVGStamp } from './SVGStamp';

export const TravelFilmstrip: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();
  const [isDesktopViewport, setIsDesktopViewport] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 960px)').matches : true
  );

  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [spotlight, setSpotlight] = useState<{ id: string; x: number; y: number } | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);
  const trackViewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const baselineRouteRef = useRef<SVGPathElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const isPinnedHorizontal = isDesktopViewport && !reducedMotion;

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(min-width: 960px)');
    const onChange = () => setIsDesktopViewport(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Desktop short pinned horizontal gallery matched to exact track overflow + full final-card dwell
  useEffect(() => {
    if (!isPinnedHorizontal) {
      scrollTriggerRef.current = null;
      return;
    }

    ensureGsapRegistered();
    const pinEl = pinWrapRef.current;
    const viewportEl = trackViewportRef.current;
    const trackEl = trackRef.current;
    if (!pinEl || !viewportEl || !trackEl) return;

    const ctx = gsap.context(() => {
      const getMaxShift = () => Math.max(0, trackEl.scrollWidth - viewportEl.clientWidth);

      if (baselineRouteRef.current) {
        const len = baselineRouteRef.current.getTotalLength();
        gsap.set(baselineRouteRef.current, { strokeDasharray: len, strokeDashoffset: len * 0.75 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: 'top top',
          end: () => `+=${Math.max(900, getMaxShift() + 420)}`,
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const idx = Math.min(
              FILMSTRIP_VIGNETTES.length - 1,
              Math.floor(p * FILMSTRIP_VIGNETTES.length * 0.999)
            );
            setActiveIndex((prev) => (prev === idx ? prev : idx));

            if (baselineRouteRef.current) {
              const len = baselineRouteRef.current.getTotalLength();
              gsap.set(baselineRouteRef.current, {
                strokeDashoffset: len * (1 - Math.max(0.2, p)),
              });
            }
          },
        },
      });

      // Brief entrance hold -> full horizontal sweep -> sustained final-item dwell before release
      tl.to(trackEl, { x: 0, duration: 0.08, ease: 'none' })
        .to(trackEl, {
          x: () => -getMaxShift(),
          duration: 0.74,
          ease: 'none',
        })
        .to(trackEl, {
          x: () => -getMaxShift(),
          duration: 0.18,
          ease: 'none',
        });

      scrollTriggerRef.current = tl.scrollTrigger ?? null;
    }, sectionRef);

    return () => {
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, [isPinnedHorizontal]);

  const toggleFlip = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const navigateToCard = (targetIdx: number) => {
    const clamped = Math.max(0, Math.min(FILMSTRIP_VIGNETTES.length - 1, targetIdx));
    setActiveIndex(clamped);

    if (isPinnedHorizontal && scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      const ratio =
        FILMSTRIP_VIGNETTES.length > 1
          ? 0.08 + (clamped / (FILMSTRIP_VIGNETTES.length - 1)) * 0.76
          : 0;
      const targetY = st.start + (st.end - st.start) * ratio;
      window.scrollTo({
        top: targetY,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
      return;
    }

    const viewportEl = trackViewportRef.current;
    const cardEls = viewportEl?.querySelectorAll<HTMLElement>('[data-filmstrip-card]');
    const card = cardEls?.[clamped];
    if (card && viewportEl) {
      viewportEl.scrollTo({
        left: card.offsetLeft - 20,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <section
      id="journal"
      ref={sectionRef}
      aria-labelledby="pm-filmstrip-heading"
      className="relative w-full bg-[var(--pm-ivory)] pm-paper-grain border-t border-[var(--pm-brown)]/15 overflow-hidden"
    >
      <div
        ref={pinWrapRef}
        className={`mx-auto flex w-full max-w-[1440px] flex-col justify-center ${
          isPinnedHorizontal ? 'min-h-screen py-8' : 'py-20 sm:py-24'
        }`}
      >
        {/* Header + Controls */}
        <div className="px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-ui text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pm-red-deep)]">
              05 · Archival Travel Filmstrip · A Collection of Somewhere
            </p>
            <MotionText
              as="h2"
              id="pm-filmstrip-heading"
              lines={['Every postcard is a way back.']}
              mode="mask-up"
              className="mt-2 font-editorial text-[clamp(2.15rem,4.2vw,3.65rem)] font-semibold leading-[1.06] tracking-[-0.022em] text-[var(--pm-ink)]"
            />
            <p className="mt-2 font-ui text-base sm:text-lg text-[var(--pm-ink)]/80">
              Build a collection worth opening years from now. Turn any print over to read the back.
            </p>
          </div>

          {/* Explicit Card Index & Arrow Navigation */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 mr-2" role="group" aria-label="Jump to archival postcard">
              {FILMSTRIP_VIGNETTES.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`View postcard ${idx + 1}: ${item.title}`}
                  aria-pressed={activeIndex === idx}
                  onClick={() => navigateToCard(idx)}
                  className={`min-h-[38px] min-w-[38px] px-2.5 font-ui text-xs font-semibold tabular-nums border transition-colors cursor-pointer ${
                    activeIndex === idx
                      ? 'bg-[var(--pm-ink)] text-[var(--pm-ivory)] border-[var(--pm-ink)]'
                      : 'bg-[var(--pm-paper)] text-[var(--pm-brown)] border-[var(--pm-brown)]/20 hover:bg-[var(--pm-parchment)]'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            <button
              type="button"
              aria-label="Previous archival postcard"
              disabled={activeIndex === 0}
              onClick={() => navigateToCard(activeIndex - 1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--pm-brown)]/25 bg-[var(--pm-paper)] text-[var(--pm-ink)] hover:bg-[var(--pm-parchment)] disabled:opacity-40 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next archival postcard"
              disabled={activeIndex === FILMSTRIP_VIGNETTES.length - 1}
              onClick={() => navigateToCard(activeIndex + 1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--pm-brown)]/25 bg-[var(--pm-paper)] text-[var(--pm-ink)] hover:bg-[var(--pm-parchment)] disabled:opacity-40 cursor-pointer"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Filmstrip Track */}
        <div
          ref={trackViewportRef}
          className={`mt-9 px-5 sm:px-8 lg:px-12 ${
            isPinnedHorizontal
              ? 'overflow-visible'
              : 'flex overflow-x-auto snap-x snap-mandatory pb-6 gap-6'
          }`}
        >
          <div
            ref={trackRef}
            className={`flex gap-6 sm:gap-8 items-stretch will-change-transform ${
              isPinnedHorizontal ? 'w-max pr-16' : 'w-max'
            }`}
          >
            {FILMSTRIP_VIGNETTES.map((vignette) => {
              const isFlipped = Boolean(flippedIds[vignette.id]);
              const isSpotlit = spotlight?.id === vignette.id;

              return (
                <article
                  key={vignette.id}
                  data-filmstrip-card={vignette.id}
                  onPointerMove={(e) => {
                    if (e.pointerType === 'touch' || prefersReducedMotionNow()) return;
                    const r = e.currentTarget.getBoundingClientRect();
                    setSpotlight({
                      id: vignette.id,
                      x: e.clientX - r.left,
                      y: e.clientY - r.top,
                    });
                  }}
                  onPointerLeave={() => setSpotlight(null)}
                  className={`snap-center shrink-0 w-[85vw] sm:w-[430px] lg:w-[460px] pm-flip-scene ${vignette.tiltClass}`}
                >
                  <div
                    className={`pm-flip-inner min-h-[450px] sm:min-h-[470px] ${
                      isFlipped ? 'is-flipped' : ''
                    }`}
                  >
                    {/* ================= FRONT OF POSTCARD PRINT ================= */}
                    <div className="pm-flip-face absolute inset-0 pm-photo-print p-4 sm:p-5 flex flex-col justify-between overflow-hidden">
                      {/* Optional subtle warm pointer light on active card */}
                      {isSpotlit && spotlight && (
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 z-10 opacity-35"
                          style={{
                            background: `radial-gradient(260px circle at ${spotlight.x}px ${spotlight.y}px, rgba(244, 224, 122, 0.35), transparent 70%)`,
                          }}
                        />
                      )}

                      <div>
                        <div className="flex items-center justify-between gap-2 font-ui text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--pm-red-deep)]">
                          <span>{vignette.indexLabel}</span>
                          <span className="text-[var(--pm-brown)]/70">{vignette.postmarkNumber}</span>
                        </div>

                        {/* Cropped Portion of Supplied Production Imagery */}
                        <div className="relative mt-3 aspect-[16/10] w-full overflow-hidden border border-[var(--pm-brown)]/20 bg-[var(--pm-parchment)]">
                          <img
                            src={vignette.assetUrl}
                            alt={`${vignette.indexLabel} — ${vignette.placeLabel}`}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className={`h-full w-full ${vignette.cropClass}`}
                          />
                        </div>

                        <h3 className="mt-4 font-editorial text-[22px] sm:text-2xl font-semibold leading-[1.2] text-[var(--pm-ink)]">
                          {vignette.title}
                        </h3>

                        <p className="mt-2 font-ui text-sm leading-[1.6] text-[var(--pm-ink)]/80">
                          {vignette.frontCaption}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[var(--pm-brown)]/15 flex items-center justify-between gap-3 relative z-20">
                        <span className="font-ui text-xs text-[var(--pm-brown)]/80 truncate">
                          {vignette.placeLabel}
                        </span>

                        <button
                          type="button"
                          aria-pressed={isFlipped}
                          onClick={() => toggleFlip(vignette.id)}
                          className="inline-flex min-h-[40px] items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--pm-brown)]/30 bg-[var(--pm-paper)] hover:bg-[var(--pm-parchment)] font-ui text-xs font-semibold uppercase tracking-[0.08em] text-[var(--pm-ink)] whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <RefreshCw className="h-3.5 w-3.5 text-[var(--pm-red)]" />
                          <span>Turn Over</span>
                        </button>
                      </div>
                    </div>

                    {/* ================= WRITABLE BACKSIDE OF POSTCARD ================= */}
                    <div className="pm-flip-back absolute inset-0 pm-postcard-sheet p-5 sm:p-6 flex flex-col justify-between">
                      <div className="pm-airmail-band absolute inset-x-0 top-0 h-1.5" aria-hidden="true" />

                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-editorial text-lg font-semibold text-[var(--pm-brown)]">
                              CORRESPONDENCE SIDE
                            </p>
                            <p className="font-ui text-[11px] uppercase tracking-[0.14em] text-[var(--pm-ink)]/65">
                              {vignette.dateLabel}
                            </p>
                          </div>

                          <div className="flex items-center shrink-0">
                            <PostalCancellationSeal
                              topText="POSTMARK"
                              bottomText="ARCHIVED"
                              centerText=""
                              className="h-12 w-12 text-[var(--pm-brown)]/70 -mr-2.5 z-10"
                            />
                            <SVGStamp stampId={vignette.stampId} size="sm" />
                          </div>
                        </div>

                        <div className="mt-4 pm-ruled-paper border border-[var(--pm-brown)]/15 p-4">
                          <p className="font-hand text-[24px] leading-[1.3] text-[var(--pm-ink)]">
                            “{vignette.backHandwriting}”
                          </p>
                        </div>

                        <p className="mt-4 font-ui text-sm leading-[1.6] text-[var(--pm-ink)]/80">
                          {vignette.backStory}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[var(--pm-brown)]/15 flex items-center justify-between gap-3">
                        <span className="font-ui text-xs text-[var(--pm-brown)]/75">
                          {vignette.postmarkNumber}
                        </span>

                        <button
                          type="button"
                          aria-pressed={isFlipped}
                          onClick={() => toggleFlip(vignette.id)}
                          className="inline-flex min-h-[40px] items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--pm-ink)] bg-[var(--pm-ink)] text-[var(--pm-ivory)] font-ui text-xs font-semibold uppercase tracking-[0.08em] whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                          <span>Turn Back</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Continuous Baseline SVG Postal Route & Active Stamp Index */}
        <div className="mt-6 px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-4">
            <span className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-[var(--pm-brown)] whitespace-nowrap tabular-nums">
              Print 0{activeIndex + 1} / 0{FILMSTRIP_VIGNETTES.length}
            </span>
            <svg viewBox="0 0 900 18" className="h-4 w-full overflow-visible" aria-hidden="true">
              <line
                x1="0"
                y1="9"
                x2="900"
                y2="9"
                stroke="rgba(90, 53, 40, 0.16)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
              <path
                ref={baselineRouteRef}
                d="M 0 9 L 900 9"
                fill="none"
                stroke="#D85743"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
