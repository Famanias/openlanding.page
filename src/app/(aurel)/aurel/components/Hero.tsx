'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalibrationField } from './CalibrationField';
import { WatchStage } from './WatchStage';
import { HERO_METADATA } from '../data/collection';
import { useMotionSetting } from './MotionProvider';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const { reducedMotion } = useMotionSetting();
  const sectionRef = useRef<HTMLElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const headlineGroupRef = useRef<HTMLDivElement>(null);
  const watchWrapRef = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Measured Hero Entry Choreography
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        ringsRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 1.35 },
        0
      )
        .fromTo(
          watchWrapRef.current,
          { opacity: 0, scale: 0.94, y: 18 },
          { opacity: 1, scale: 1, y: 0, duration: 1.25 },
          0.18
        )
        .fromTo(
          '.hero-line-reveal',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.95, stagger: 0.12 },
          0.32
        )
        .fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.85 },
          0.65
        );

      // 2. Reversible Scroll Handoff toward Section 02
      gsap.to(headlineGroupRef.current, {
        yPercent: -24,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(watchWrapRef.current, {
        scale: 1.07,
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(ringsRef.current, {
        scale: 1.09,
        opacity: 0.45,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="AUREL Origin Collection Hero"
      className="relative min-h-[100svh] w-full hero-radial-stage flex flex-col justify-between overflow-hidden pt-[88px] md:pt-[102px] pb-5 md:pb-7"
    >
      {/* Precision SVG Calibration Rings & Metrology Axes */}
      <div ref={ringsRef} className="absolute inset-0 z-0">
        <CalibrationField variant="hero" className="w-full h-full" />
      </div>

      {/* Top-Center Editorial Statement */}
      <div
        ref={headlineGroupRef}
        className="relative z-20 aurel-container flex flex-col items-center text-center mt-1 md:mt-2"
      >
        <p className="hero-line-reveal font-sans-ui text-[11px] sm:text-xs md:text-[13px] tracking-[0.26em] text-[#9DB8C9] uppercase mb-2">
          {HERO_METADATA.eyebrow}
        </p>

        <h1
          className="hero-line-reveal font-display font-normal text-[#F0ECE5] tracking-[0.02em] leading-[0.94] uppercase"
          style={{
            fontSize: 'clamp(2.5rem, 6.2vw, 6.1rem)',
            textWrap: 'balance',
          }}
        >
          {HERO_METADATA.heading}
        </h1>

        <p
          className="hero-line-reveal font-display text-base sm:text-lg md:text-[1.35rem] text-[#C7CDD2] font-normal tracking-[0.01em] mt-2 md:mt-2.5 max-w-2xl"
          style={{ textWrap: 'balance' }}
        >
          {HERO_METADATA.subtitle}
        </p>
      </div>

      {/* Central Watch Stage — Visual Center of the Hero with clear breathing room below subtitle */}
      <div
        ref={watchWrapRef}
        className="relative z-10 w-full flex-1 flex items-center justify-center mt-4 md:mt-6 mb-1 px-4"
      >
        <WatchStage className="w-[280px] sm:w-[390px] md:w-[490px] lg:w-[560px] xl:w-[610px] max-h-[41svh] md:max-h-[46svh] lg:max-h-[48svh]" />
      </div>

      {/* Lower-Center CTA & Technical Metadata Rail */}
      <div ref={ctaGroupRef} className="relative z-20 w-full mt-auto">
        <div className="aurel-container flex flex-col items-center">
          <span className="font-sans-ui text-[10px] md:text-[11px] tracking-[0.24em] text-[#89919A] uppercase mb-2.5">
            {HERO_METADATA.nearWatchLabel}
          </span>

          {/* Horizontal hairline passing behind the centered CTA button, exactly as in the reference screenshot */}
          <div className="relative w-full flex items-center justify-center">
            <div
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#374047]/65"
              aria-hidden="true"
            />
            <a
              href="#collections"
              className="relative z-10 inline-flex items-center justify-center gap-2.5 px-7 md:px-8 py-3 md:py-3.5 rounded-full bg-[#F1EEE9] text-[#0A0B0D] hover:bg-white transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.6)] font-sans-ui text-[11px] md:text-xs font-medium tracking-[0.18em] uppercase whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9DB8C9]"
            >
              <span>{HERO_METADATA.ctaLabel}</span>
              <span aria-hidden="true" className="text-xs leading-none">
                ↗
              </span>
            </a>
          </div>

          {/* Lower Left & Lower Right Technical Captions */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 pt-3 text-[10px] md:text-[11px] font-mono-tech tracking-[0.13em] sm:tracking-[0.18em] text-[#89919A] uppercase">
            <div className="text-center sm:text-left">
              <span className="whitespace-nowrap">CALIBRE AU-01</span>
              <span className="mx-1.5 text-[#374047]">/</span>
              <span className="whitespace-nowrap">42MM BRUSHED TITANIUM</span>
              <span className="mx-1.5 text-[#374047]">/</span>
              <span className="whitespace-nowrap">50-HOUR RESERVE</span>
            </div>
            <div className="text-center sm:text-right">
              <span className="whitespace-nowrap">LIMITED EDITION</span>
              <span className="mx-1.5 text-[#374047]">/</span>
              <span className="whitespace-nowrap">COLLECTION 01</span>
              <span className="mx-1.5 text-[#374047]">/</span>
              <span className="whitespace-nowrap">NO. 01–50</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
