'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalibrationField } from './CalibrationField';
import { ORIGIN_SPECS } from '../data/collection';
import { useMotionSetting } from './MotionProvider';

gsap.registerPlugin(ScrollTrigger);

export const CollectionIntroduction: React.FC = () => {
  const { reducedMotion } = useMotionSetting();
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageWrapRef.current,
        { clipPath: 'circle(42% at 50% 50%)', scale: 0.96, opacity: 0.75 },
        {
          clipPath: 'circle(75% at 50% 50%)',
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            end: 'center center',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        textBlockRef.current,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="collections"
      ref={sectionRef}
      aria-labelledby="origin-heading"
      className="relative py-24 md:py-36 lg:py-44 bg-[#0A0B0D] border-t border-[#374047]/40 overflow-hidden"
    >
      {/* Coordinated Calibration Motif */}
      <CalibrationField
        variant="origin"
        className="absolute inset-0 opacity-65"
      />

      <div className="relative z-10 aurel-container">
        {/* Top Micro Rail */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-8 border-b border-[#374047]/50">
          <span className="font-mono-tech text-xs tracking-[0.24em] text-[#9DB8C9] uppercase">
            01 / THE COLLECTION
          </span>
          <span className="font-mono-tech text-xs tracking-[0.22em] text-[#89919A] uppercase">
            AU-01 / BRUSHED TITANIUM / BLACK LEATHER
          </span>
        </div>

        {/* Asymmetric Editorial Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-12 md:pt-16">
          {/* Left Editorial Statement overlapping negative space on desktop */}
          <div
            ref={textBlockRef}
            className="lg:col-span-5 z-20 space-y-6 lg:pr-4"
          >
            <h2
              id="origin-heading"
              className="font-display font-normal text-[#F0ECE5] uppercase tracking-[0.02em] leading-[0.94]"
              style={{
                fontSize: 'clamp(3.4rem, 6.8vw, 7.2rem)',
                textWrap: 'balance',
              }}
            >
              THE ORIGIN.
            </h2>

            <p className="font-sans-ui text-base md:text-lg text-[#C7CDD2] font-light leading-relaxed max-w-md">
              A mechanical study in considered form. Nothing added without purpose.
              Nothing left unfinished.
            </p>

            <div className="pt-2">
              <a
                href="#anatomy"
                className="group inline-flex items-center gap-3 py-3 px-6 rounded-full border border-[#374047] hover:border-[#9DB8C9] bg-[#111317]/90 text-[#F0ECE5] font-sans-ui text-xs tracking-[0.2em] uppercase transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
              >
                <span>EXPLORE THE DETAILS</span>
                <span
                  aria-hidden="true"
                  className="text-[#9DB8C9] group-hover:translate-y-0.5 transition-transform"
                >
                  ↓
                </span>
              </a>
            </div>

            {/* Concept Specification Rail */}
            <dl className="pt-8 border-t border-[#374047]/55 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {ORIGIN_SPECS.map((spec) => (
                <div key={spec.label} className="space-y-1">
                  <dt className="font-mono-tech text-[10px] tracking-[0.22em] text-[#89919A] uppercase">
                    {spec.label}
                  </dt>
                  <dd className="font-sans-ui text-xs md:text-sm text-[#F0ECE5] font-normal">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right Oversized Sculptural Still-Life Stage */}
          <div className="lg:col-span-7 relative">
            <div
              ref={imageWrapRef}
              className="relative aspect-[16/10] w-full overflow-hidden bg-[#111317] border border-[#374047]/45"
            >
              {!imgError ? (
                <img
                  src="/templates/aurel/aurel-still-life.webp"
                  alt="AUREL Origin watch resting on a dark brushed monolith in three-quarter studio lighting"
                  width={2752}
                  height={1536}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8 text-center">
                  <span className="font-mono-tech text-xs tracking-[0.2em] text-[#9DB8C9]">
                    AUREL ORIGIN COLLECTION — ARCHITECTURAL STUDY
                  </span>
                </div>
              )}

              {/* Subtle edge falloff scrim */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0A0B0D]/60 via-transparent to-[#0A0B0D]/30"
                aria-hidden="true"
              />

              {/* Corner coordinate reticle */}
              <div
                className="pointer-events-none absolute bottom-4 right-5 font-mono-tech text-[10px] tracking-[0.22em] text-[#C7CDD2]/80 uppercase"
                aria-hidden="true"
              >
                FIG. 00 / SCULPTURAL STILL LIFE · REF. AU-01
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
