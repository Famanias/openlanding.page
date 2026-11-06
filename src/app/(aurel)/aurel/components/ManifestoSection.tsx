'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalibrationField } from './CalibrationField';
import { useMotionSetting } from './MotionProvider';

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO_WORDS = ['NOT', 'MORE', 'TIME.', 'BETTER', 'TIME.'];

export const ManifestoSection: React.FC = () => {
  const { reducedMotion } = useMotionSetting();
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.manifesto-word',
        { opacity: 0.18, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.14,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
            end: 'center center',
            scrub: false,
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        ringRef.current,
        { rotate: -14, scale: 0.95 },
        {
          rotate: 14,
          scale: 1.03,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      aria-labelledby="manifesto-heading"
      className="relative py-32 md:py-48 lg:py-56 bg-[#0A0B0D] border-t border-[#374047]/45 overflow-hidden flex items-center justify-center"
    >
      {/* Off-center vertical index rule establishing deliberate tension */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-[22%] lg:left-[28%] w-[1px] bg-[#374047]/35"
        aria-hidden="true"
      />

      {/* Giant fine-line outlined circular instrument behind the statement */}
      <div
        ref={ringRef}
        className="pointer-events-none absolute w-[540px] h-[540px] sm:w-[680px] sm:h-[680px] md:w-[820px] md:h-[820px] flex items-center justify-center"
      >
        <CalibrationField variant="manifesto" className="w-full h-full" />
      </div>

      <div className="relative z-10 aurel-container flex flex-col items-center text-center">
        <p className="font-mono-tech text-xs tracking-[0.26em] text-[#9DB8C9] uppercase mb-6">
          04 / THE MANIFESTO
        </p>

        <h2
          id="manifesto-heading"
          className="font-display font-normal text-[#F0ECE5] uppercase tracking-[0.02em] leading-[0.94] max-w-5xl flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 gap-y-2"
          style={{
            fontSize: 'clamp(3.2rem, 7.5vw, 8.4rem)',
          }}
        >
          {MANIFESTO_WORDS.map((word, idx) => (
            <span
              key={`${word}-${idx}`}
              className={`manifesto-word inline-block ${
                word === 'BETTER' ? 'italic text-[#9DB8C9]' : ''
              }`}
            >
              {word}
            </span>
          ))}
        </h2>

        <p
          className="font-sans-ui text-base sm:text-lg md:text-xl text-[#C7CDD2] font-light leading-relaxed max-w-2xl mt-8 md:mt-10"
          style={{ textWrap: 'balance' }}
        >
          We believe true luxury lies in attention—in the things we choose to make
          and the moments we choose to keep.
        </p>

        <div className="mt-10 flex items-center gap-4 text-[11px] font-mono-tech tracking-[0.22em] text-[#89919A] uppercase">
          <span>HOROLOGICAL CONCEPT 01</span>
          <span aria-hidden="true">·</span>
          <span>MEASURED PERMANENCE</span>
        </div>
      </div>
    </section>
  );
};
