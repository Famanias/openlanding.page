'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, Play, X } from 'lucide-react';
import { CinematicMedia } from './CinematicMedia';
import { GlassButton } from './GlassButton';
import { ORBIT_ASSETS } from '../../lib/orbit-beyond/assets';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

gsap.registerPlugin(ScrollTrigger);

export interface LunarHeroProps {
  onReserveClick: () => void;
  onExploreJourneyClick: () => void;
}

export function LunarHero({ onReserveClick, onExploreJourneyClick }: LunarHeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const contentLayerRef = useRef<HTMLDivElement | null>(null);

  const [teaserModalOpen, setTeaserModalOpen] = useState(false);
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const [modalVideoSrc, setModalVideoSrc] = useState<string>(ORBIT_ASSETS.heroVideo);

  const teaserTriggerRef = useRef<HTMLButtonElement | null>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // Scroll-driven compression of foreground typography behind the lunar horizon
  useLayoutEffect(() => {
    if (prefersReducedMotion || !heroSectionRef.current || !contentLayerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(contentLayerRef.current, {
        yPercent: 18,
        scale: 0.94,
        opacity: 0.12,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroSectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Modal keyboard & focus management
  useEffect(() => {
    if (!teaserModalOpen) return;

    const focusTimer = window.setTimeout(() => {
      modalCloseBtnRef.current?.focus();
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeTeaserModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [teaserModalOpen]);

  const openTeaserModal = () => {
    if (videoUnavailable) {
      onExploreJourneyClick();
      return;
    }
    setTeaserModalOpen(true);
  };

  const closeTeaserModal = () => {
    if (modalVideoRef.current && !modalVideoRef.current.paused) {
      modalVideoRef.current.pause();
    }
    setTeaserModalOpen(false);
    window.setTimeout(() => {
      teaserTriggerRef.current?.focus();
    }, 20);
  };

  const handleModalVideoError = () => {
    if (modalVideoSrc === ORBIT_ASSETS.heroVideo) {
      setModalVideoSrc(ORBIT_ASSETS.heroVideoAltPath);
      return;
    }
    setVideoUnavailable(true);
    setTeaserModalOpen(false);
  };

  return (
    <section
      id="lunar-arrival"
      ref={heroSectionRef}
      aria-label="Lunar Arrival Hero"
      className="relative min-h-[100svh] w-full overflow-clip flex flex-col justify-between pt-24 pb-8 sm:pt-28 sm:pb-10"
    >
      {/* Background Clean Plate + 10-Second Muted Video Loop */}
      <CinematicMedia
        pausedByModal={teaserModalOpen}
        onVideoUnavailable={() => setVideoUnavailable(true)}
      />

      {/* Top Spacer so central cluster sits at ~47-54% viewport height */}
      <div aria-hidden="true" className="h-4 sm:h-8" />

      {/* Centered Foreground UI Layer */}
      <div
        ref={contentLayerRef}
        className="relative z-10 mx-auto flex w-[min(1080px,90vw)] flex-col items-center text-center my-auto py-8"
      >
        {/* Two translucent HUD badges above the center headline */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 sm:mb-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
        >
          <span className="liquid-glass inline-flex items-center rounded-full px-3.5 py-1.5 font-hud-mono text-[11px] font-medium tracking-[0.2em] text-[#EDF6FD] uppercase whitespace-nowrap">
            EST. 2045
          </span>
          <span className="liquid-glass inline-flex items-center rounded-full px-3.5 py-1.5 font-hud-mono text-[11px] font-medium tracking-[0.2em] text-[#8DE9FF] uppercase whitespace-nowrap">
            MISSION PREVIEW / CONCEPT
          </span>
        </motion.div>

        {/* Main Centered Two-Line Uppercase Headline */}
        <h1 className="font-display-sans font-extrabold uppercase tracking-[-0.03em] text-[#EDF6FD] leading-[0.95] text-[clamp(2.5rem,6.4vw,7.4rem)] drop-shadow-[0_10px_32px_rgba(3,8,18,0.75)]">
          <span className="block overflow-hidden pb-1">
            <motion.span
              initial={prefersReducedMotion ? false : { y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.68, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              BOOK YOUR WEEKEND
            </motion.span>
          </span>
          <span className="block overflow-hidden pt-0.5">
            <motion.span
              initial={prefersReducedMotion ? false : { y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.68, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[#EDF6FD]"
            >
              ON THE MOON.
            </motion.span>
          </span>
        </h1>

        {/* Centered CTA Row directly beneath the headline */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          <GlassButton
            type="button"
            variant="primary"
            size="lg"
            onClick={onReserveClick}
          >
            <span>RESERVE YOUR SEAT</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </GlassButton>

          <GlassButton
            ref={teaserTriggerRef}
            type="button"
            variant="glass"
            size="lg"
            onClick={openTeaserModal}
          >
            <Play className="h-3.5 w-3.5 fill-current text-[#8DE9FF]" />
            <span>{videoUnavailable ? 'EXPLORE THE JOURNEY' : 'WATCH TEASER'}</span>
          </GlassButton>
        </motion.div>
      </div>

      {/* Bottom Status & Scroll Cue */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col sm:flex-row items-center justify-between gap-3 px-6 sm:px-12">
        <span className="font-hud-mono text-[11px] tracking-[0.22em] text-[#EDF6FD]/75 uppercase">
          A NEW PERSPECTIVE AWAITS
        </span>

        <button
          type="button"
          onClick={onExploreJourneyClick}
          className="group inline-flex items-center gap-2 rounded-full py-1.5 px-3 font-hud-mono text-[11px] tracking-[0.2em] text-[#EDF6FD]/80 hover:text-[#8DE9FF] uppercase transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF]"
        >
          <span>SCROLL</span>
          <ArrowDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5 text-[#8DE9FF]" />
        </button>
      </div>

      {/* Gently curved lunar-horizon bottom transition gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#030812] via-[#030812]/55 to-transparent"
      />

      {/* Accessible Teaser Video Modal */}
      <AnimatePresence>
        {teaserModalOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="teaser-modal-title"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#030812]/88 p-4 sm:p-6 backdrop-blur-xl"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeTeaserModal();
              }
            }}
          >
            <motion.div
              initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { scale: 1 } : { scale: 0.96, y: 12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass relative w-full max-w-5xl rounded-[28px] sm:rounded-[36px] p-4 sm:p-6 shadow-2xl"
            >
              <div className="mb-4 flex items-center justify-between gap-4 px-2">
                <h2
                  id="teaser-modal-title"
                  className="font-hud-mono text-xs sm:text-sm tracking-[0.2em] text-[#EDF6FD] uppercase"
                >
                  ORBIT &amp; BEYOND · 2045 MISSION TEASER
                </h2>

                <button
                  ref={modalCloseBtnRef}
                  type="button"
                  aria-label="Close teaser video dialog"
                  onClick={closeTeaserModal}
                  className="liquid-glass inline-flex h-10 w-10 items-center justify-center rounded-full text-[#EDF6FD] hover:border-[#8DE9FF]/50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-[20px] sm:rounded-[24px] bg-[#030812] border border-white/10">
                <video
                  ref={modalVideoRef}
                  src={modalVideoSrc}
                  poster={ORBIT_ASSETS.heroPoster}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={handleModalVideoError}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-3 flex items-center justify-end px-2">
                <span className="font-hud-mono text-[11px] text-[#8DE9FF]">
                  CONCEPT DEMO / NO BOOKING CREATED
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
