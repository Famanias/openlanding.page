'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FORUM_ASSETS } from '../../lib/forum/assets';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ResilientImage } from './ResilientImage';

gsap.registerPlugin(ScrollTrigger);

export const WideFieldInterlude: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageLayerRef = useRef<HTMLDivElement | null>(null);
  const titleWrapRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        if (imageLayerRef.current) {
          tl.fromTo(
            imageLayerRef.current,
            { xPercent: -2, scale: 1.035 },
            { xPercent: 2, scale: 1, ease: 'none' },
            0
          );
        }

        if (titleWrapRef.current) {
          tl.fromTo(
            titleWrapRef.current,
            { y: 28, opacity: 0.35 },
            { y: 0, opacity: 1, ease: 'power2.out' },
            0.1
          );
        }
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      id="vision"
      ref={sectionRef}
      aria-labelledby="vision-heading"
      className="relative scroll-mt-[72px] lg:scroll-mt-[80px] min-h-[78svh] lg:min-h-[92svh] w-full overflow-hidden bg-[#0E100C] border-b border-[#B9B28A]/38 flex flex-col justify-between"
    >
      {/* Full-bleed Panoramic Production Plate (08-divider-wide.webp) */}
      <div
        ref={imageLayerRef}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <ResilientImage
          asset={FORUM_ASSETS.dividerWide}
          className="h-full w-full object-[46%_52%] sm:object-[50%_52%]"
        />
        {/* Subtle vignette on top-left and bottom so typography reads effortlessly without obscuring the eclipse or pillars */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0E100C]/80 via-transparent to-[#0E100C]/90"
        />
      </div>

      {/* Top Architectural Margin Index */}
      <div className="relative z-10 mx-auto w-full max-w-[1920px] px-5 sm:px-8 lg:px-14 pt-8 sm:pt-12">
        <div className="flex items-center justify-between border-b border-[#B9B28A]/35 pb-4">
          <div className="flex items-center gap-3">
            <span className="reg-cross text-[#B9B28A]" aria-hidden="true" />
            <span className="font-mono-tech text-xs tracking-[0.16em] text-[#B9B28A] uppercase">
              005 / THE WIDE FIELD
            </span>
          </div>
          <span className="font-mono-tech text-xs tracking-[0.14em] text-[#D7D1B8]/80 uppercase">
            HORIZON ALIGNMENT // PANORAMIC PLATE
          </span>
        </div>
      </div>

      {/* Bottom Architectural Editorial Statement */}
      <div
        ref={titleWrapRef}
        className="relative z-10 mx-auto w-full max-w-[1920px] px-5 sm:px-8 lg:px-14 pb-12 sm:pb-16 lg:pb-20 pt-32"
      >
        <div className="max-w-[920px]">
          <h2
            id="vision-heading"
            className="font-doto-display uppercase text-[#F6F3EA] text-[clamp(2.2rem,5.4vw,5.2rem)] leading-[0.92] tracking-[-0.02em] text-balance"
          >
            <span className="block">THE BIGGER PICTURE</span>
            <span className="block">WAS ALWAYS THERE.</span>
          </h2>
          <p className="mt-4 sm:mt-6 font-prose-support text-xl sm:text-2xl text-[#B9B28A] leading-relaxed">
            The difference is knowing where to look.
          </p>
        </div>
      </div>
    </section>
  );
};
