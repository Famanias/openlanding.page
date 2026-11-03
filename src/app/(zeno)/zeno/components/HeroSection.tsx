'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/siteConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenStudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenStudio }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const collageWrapRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const exitPathRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Intro timeline: clipped vertical line masks + collage settle
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-eyebrow',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        0.05
      )
        .fromTo(
          '.hero-line-inner',
          { yPercent: 105 },
          {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          },
          0.1
        )
        .fromTo(
          '.hero-expected-word',
          { x: -18 },
          { x: 0, duration: 0.85, ease: 'power3.out' },
          0.26
        )
        .fromTo(
          '.hero-copy-block',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.1 },
          0.42
        )
        .fromTo(
          '.hero-collage-group',
          { y: 28, x: 18, scale: 0.97, opacity: 0 },
          { y: 0, x: 0, scale: 1, opacity: 1, duration: 1.05 },
          0.18
        )
        .fromTo(
          '.hero-svg-mark',
          { scale: 0.82, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, stagger: 0.08 },
          0.45
        );

      // Scroll-out differential parallax on hero collage
      gsap.to('.hero-collage-group', {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    }, sectionRef);

    // Subtle pointer parallax on fine-pointer desktop screens
    const isFinePointer = window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
    let handlePointerMove: ((e: MouseEvent) => void) | null = null;

    if (isFinePointer && collageWrapRef.current) {
      const xTo = gsap.quickTo(collageWrapRef.current, 'x', { duration: 0.6, ease: 'power2.out' });
      const yTo = gsap.quickTo(collageWrapRef.current, 'y', { duration: 0.6, ease: 'power2.out' });
      const rotTo = gsap.quickTo(collageWrapRef.current, 'rotation', { duration: 0.7, ease: 'power2.out' });

      handlePointerMove = (e: MouseEvent) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        xTo(nx * 11);
        yTo(ny * 9);
        rotTo(nx * 0.9);
      };

      window.addEventListener('mousemove', handlePointerMove, { passive: true });
    }

    return () => {
      ctx.revert();
      if (handlePointerMove) {
        window.removeEventListener('mousemove', handlePointerMove);
      }
    };
  }, [reducedMotion]);

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative w-full min-h-[min(calc(100vh-88px),980px)] lg:aspect-[1920/980] flex flex-col justify-between pt-8 sm:pt-12 lg:pt-14 pb-8 sm:pb-10 overflow-hidden"
    >
      {/* Continuous SVG signal line descending on right and curving to x=978 at bottom edge to meet Expertise */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 w-full h-full z-0"
      >
        <path
          ref={exitPathRef}
          d="M 1856 640 L 1856 905 Q 1856 940 1820 940 L 1014 940 Q 978 940 978 976 L 978 1080"
          fill="none"
          stroke="#A58AFF"
          strokeWidth="2.2"
          strokeOpacity="0.85"
        />
      </svg>

      {/* Main Two-Column Hero Grid */}
      <div className="relative z-10 w-full px-[clamp(22px,3.125%,60px)] my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column (~54% -> 7 of 12 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center pt-2 lg:pt-4">
          <p className="hero-eyebrow text-[12px] sm:text-[14px] md:text-[15.5px] font-grotesk font-normal tracking-[0.07em] uppercase text-[#A58AFF] mb-5 sm:mb-7">
            {siteConfig.hero.eyebrow}
          </p>

          <h1
            id="hero-heading"
            ref={headlineRef}
            className="zeno-display-hero uppercase text-[#F2F0EB] select-none mb-7 sm:mb-9"
          >
            <span className="block overflow-hidden pb-1">
              <span className="hero-line-inner block">WE MAKE</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-line-inner block">
                THE{' '}
                <em className="hero-expected-word zeno-accent-italic inline-block not-italic font-editorial italic pr-2">
                  EXPECTED
                </em>
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-line-inner block">
                IRRELEVANT
                <span className="text-[#A58AFF] inline-block ml-0.5">.</span>
              </span>
            </span>
          </h1>

          <p className="hero-copy-block text-[17px] sm:text-[19px] md:text-[22px] leading-[1.44] font-grotesk font-normal text-[#A89FE0] max-w-[540px] xl:max-w-[620px] mb-9 sm:mb-12">
            {siteConfig.hero.body}
          </p>

          {/* CTAs matching reference 01 */}
          <div className="hero-copy-block flex flex-wrap items-center gap-7 sm:gap-10">
            <a
              href={siteConfig.hero.primaryCta.href}
              className="zeno-focus group inline-flex items-center gap-2.5 text-[13px] sm:text-[15px] font-grotesk font-semibold tracking-[0.08em] uppercase text-[#F2F0EB] border-b-[2px] border-[#F2F0EB] pb-1.5 hover:text-[#A58AFF] hover:border-[#A58AFF] transition-colors whitespace-nowrap shrink-0"
            >
              <span>{siteConfig.hero.primaryCta.label}</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>

            <button
              type="button"
              onClick={onOpenStudio}
              className="zeno-focus text-[13px] sm:text-[15px] font-grotesk font-medium tracking-[0.08em] uppercase text-[#8E8B99] hover:text-[#F2F0EB] transition-colors py-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {siteConfig.hero.secondaryCta.label}
            </button>
          </div>
        </div>

        {/* Right Column (~46% -> 5 of 12 cols): Layered Hero Collage Artwork + Live SVG Marks */}
        <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
          <div
            ref={collageWrapRef}
            className="hero-collage-group relative w-full max-w-[580px] lg:max-w-[740px] aspect-[1000/1030]"
          >
            {/* Primary Art-Directed Collage Crop */}
            <img
              src="/templates/zeno/hero-collage.webp"
              alt="ZENO Studio System 04 layered editorial collage with monochrome architecture, cobalt arc, folded silver ribbon, and oversized serif Z"
              width={1000}
              height={1030}
              fetchPriority="high"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain crop-blend-hero select-none pointer-events-none drop-shadow-[0_24px_48px_rgba(0,0,0,0.65)]"
            />

            {/* Live SVG editorial registration marks & crosshair overlays */}
            <svg
              aria-hidden="true"
              viewBox="0 0 600 620"
              className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
            >
              {/* Top-left subtle crosshair */}
              <g className="hero-svg-mark" opacity="0.45">
                <circle cx="24" cy="36" r="6" stroke="#F2F0EB" strokeWidth="1" fill="none" />
                <line x1="14" y1="36" x2="34" y2="36" stroke="#F2F0EB" strokeWidth="1" />
                <line x1="24" y1="26" x2="24" y2="46" stroke="#F2F0EB" strokeWidth="1" />
              </g>
              {/* Bottom-right registration target near Z */}
              <g className="hero-svg-mark" opacity="0.55">
                <line x1="568" y1="585" x2="588" y2="585" stroke="#A58AFF" strokeWidth="1.2" />
                <line x1="578" y1="575" x2="578" y2="595" stroke="#A58AFF" strokeWidth="1.2" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Footer-Level Hero Metadata Row */}
      <div className="relative z-10 w-full px-[clamp(22px,3.125%,60px)] pt-8 sm:pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-[11px] sm:text-[13px] font-grotesk tracking-[0.08em] uppercase text-[#7E7B8A]">
          {siteConfig.hero.microtypeLeft}
        </p>

        <a
          href="#expertise"
          className="zeno-focus group inline-flex items-center gap-2 text-[11px] sm:text-[13px] font-grotesk tracking-[0.09em] uppercase text-[#A58AFF] hover:text-[#F2F0EB] transition-colors whitespace-nowrap shrink-0"
        >
          <span>{siteConfig.hero.microtypeRight}</span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-y-1"
          >
            ↓
          </span>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
