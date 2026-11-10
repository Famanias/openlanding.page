'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FORUM_ASSETS } from '../../lib/forum/assets';
import { scrollToSectionId, motionTokens } from '../../lib/forum/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MagneticButton } from './MagneticButton';
import { ResilientImage } from './ResilientImage';

gsap.registerPlugin(ScrollTrigger);

const HERO_LINES = ['TURN EVERY', 'SIGNAL INTO', 'MOMENTUM.'] as const;

export const ForumHero: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageShellRef = useRef<HTMLDivElement | null>(null);
  const contentShellRef = useRef<HTMLDivElement | null>(null);
  const bottomRuleRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        if (imageShellRef.current) {
          tl.fromTo(
            imageShellRef.current,
            { scale: 1, yPercent: 0 },
            { scale: 1.055, yPercent: 4, ease: 'none' },
            0
          );
        }

        if (contentShellRef.current) {
          tl.fromTo(
            contentShellRef.current,
            { yPercent: 0, opacity: 1 },
            { yPercent: -10, opacity: 0.25, ease: 'none' },
            0
          );
        }

        if (bottomRuleRef.current) {
          tl.fromTo(
            bottomRuleRef.current,
            { scaleX: 1 },
            { scaleX: 0.35, ease: 'none' },
            0
          );
        }
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="Hero — The Signal"
      className="relative min-h-[calc(100svh-72px)] lg:min-h-[calc(100svh-80px)] w-full overflow-hidden bg-[#0E100C] border-b border-[#B9B28A]/38 flex flex-col justify-between"
    >
      {/* Full-bleed Production Hero Artwork (02-hero-monolith-clean.webp) */}
      <div
        ref={imageShellRef}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden origin-center"
      >
        <ResilientImage
          asset={FORUM_ASSETS.heroMonolithClean}
          priority
          className="h-full w-full object-[68%_42%] md:object-[72%_50%] lg:object-[76%_50%]"
        />
        {/* Measured contrast scrim on the left for crisp Doto legibility while keeping monolith & eclipse luminous on right */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0E100C]/95 via-[#0E100C]/80 to-[#0E100C]/45 md:via-[#0E100C]/60 md:to-transparent lg:via-[#0E100C]/35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0E100C]/92 via-transparent to-[#0E100C]/45 md:from-[#0E100C]/65"
        />
      </div>

      {/* Top Architectural Registration Row */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1920px] items-center justify-between px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6">
        <span className="reg-cross text-[#B9B28A]/75" aria-hidden="true" />
        <motion.div
          initial={reducedMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mx-4 hidden sm:block h-px flex-1 bg-[#B9B28A]/20 origin-left"
          aria-hidden="true"
        />
        <span className="reg-cross text-[#B9B28A]/75" aria-hidden="true" />
      </div>

      {/* Main Left Editorial Column */}
      <div
        ref={contentShellRef}
        className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-1 items-center px-5 sm:px-8 lg:px-14 py-10 sm:py-14 lg:py-16"
      >
        <div className="w-full max-w-[820px] lg:max-w-[860px]">
          {/* Screen-reader accessible single H1 + split-line animated visual wrappers */}
          <h1
            aria-label="TURN EVERY SIGNAL INTO MOMENTUM."
            className="font-doto-hero uppercase text-[#F6F3EA] text-[clamp(2.5rem,7.2vw,6.5rem)] leading-[0.9] tracking-[-0.02em] select-text"
          >
            <span className="sr-only">TURN EVERY SIGNAL INTO MOMENTUM.</span>
            {HERO_LINES.map((line, index) => (
              <span
                key={line}
                aria-hidden="true"
                className="block overflow-hidden py-[0.03em]"
              >
                <motion.span
                  initial={
                    reducedMotion
                      ? false
                      : { y: '105%', opacity: 0, letterSpacing: '0.04em' }
                  }
                  animate={{ y: '0%', opacity: 1, letterSpacing: '-0.02em' }}
                  transition={{
                    duration: 0.72,
                    delay: 0.32 + index * motionTokens.textLineStaggerSeconds,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="block whitespace-nowrap"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Supporting Subheading */}
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 max-w-[600px] font-prose-support text-lg sm:text-2xl lg:text-[26px] font-normal leading-[1.32] text-[#B9B28A]"
          >
            One intelligent system for your contacts, conversations, pipeline, and next move.
          </motion.p>

          {/* Primary & Secondary CTA Rail */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.84, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={() => scrollToSectionId('platform')}
              icon={<span className="text-base leading-none">↗</span>}
            >
              EXPLORE FORUM
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              size="lg"
              onClick={() => scrollToSectionId('demo', '#demo-board-heading')}
              icon={<span className="text-xs leading-none">▶</span>}
            >
              SEE THE SYSTEM
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Bottom Metadata & Scroll Cue Strip */}
      <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 pb-5 sm:pb-6">
        <div
          ref={bottomRuleRef}
          aria-hidden="true"
          className="mb-4 h-px w-full bg-[#B9B28A]/25 origin-left"
        />
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="reg-cross text-[#B9B28A]/80" aria-hidden="true" />
            <div className="font-mono-tech text-[11px] sm:text-xs leading-[1.45] tracking-[0.14em] uppercase">
              <div className="text-[#D7D1B8]">001 / SIGNAL SYSTEM</div>
              <div className="text-[#F6F3EA]">A CLEARER VIEW OF WHAT&apos;S NEXT</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollToSectionId('about')}
            aria-label="Scroll to Chapter 02 — Editorial Manifesto"
            className="group self-center inline-flex flex-col items-center gap-1 px-3 py-1 text-[#B9B28A] hover:text-[#F6F3EA] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F6F3EA] cursor-pointer"
          >
            <span className="font-mono-tech text-[10px] tracking-[0.2em] uppercase opacity-75 group-hover:opacity-100">
              SCROLL
            </span>
            <ChevronDown
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </button>

          <div className="hidden sm:flex items-center gap-3 text-right">
            <div className="font-mono-tech text-[11px] leading-[1.45] tracking-[0.14em] text-[#B9B28A]/85 uppercase">
              <div>OPENLANDING CONCEPT STUDY</div>
              <div>16:9 ARCHITECTURAL PLATE</div>
            </div>
            <span className="reg-cross text-[#B9B28A]/80" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};
