'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotionSetting } from './MotionProvider';

gsap.registerPlugin(ScrollTrigger);

export const AtelierSection: React.FC = () => {
  const { reducedMotion } = useMotionSetting();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // Restrained parallax <= 8% image movement as specified in master prompt
      gsap.fromTo(
        imageRef.current,
        { yPercent: -3.5, scale: 1.06 },
        {
          yPercent: 3.5,
          scale: 1.06,
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
      id="savoir-faire"
      ref={sectionRef}
      aria-labelledby="atelier-heading"
      className="relative bg-[#0A0B0D] border-t border-[#374047]/45 overflow-hidden"
    >
      {/* Anchor alias for ATELIER nav item */}
      <div id="atelier" className="absolute -top-20" aria-hidden="true" />

      <div className="relative min-h-[72svh] md:min-h-[86svh] w-full flex items-end md:items-center overflow-hidden">
        {/* Full-bleed Atelier Photograph */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#111317]">
          {!imgError ? (
            <img
              ref={imageRef}
              src="/templates/aurel/aurel-atelier.webp"
              alt="Watchmaker hands adjusting a mechanical movement with precision tweezers at an horological workbench"
              width={2752}
              height={1536}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-[72%_center] md:object-center"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-mono-tech text-xs tracking-[0.2em] text-[#9DB8C9]">
                03 / SAVOIR-FAIRE — HOROLOGICAL ATELIER
              </span>
            </div>
          )}

          {/* Measured directional scrim on the left negative space to guarantee 4.5:1 legibility while leaving the craftsperson's hands and calibre clear */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0A0B0D]/95 via-[#0A0B0D]/70 to-transparent"
            aria-hidden="true"
          />
        </div>

        {/* Negative-Space Editorial Content */}
        <div className="relative z-10 aurel-container py-16 md:py-28">
          <div className="max-w-xl space-y-6">
            <p className="font-mono-tech text-xs tracking-[0.24em] text-[#9DB8C9] uppercase">
              03 / SAVOIR-FAIRE
            </p>

            <h2
              id="atelier-heading"
              className="font-display font-normal text-[#F0ECE5] uppercase tracking-[0.02em] leading-[0.94]"
              style={{
                fontSize: 'clamp(3rem, 6vw, 6.4rem)',
                textWrap: 'balance',
              }}
            >
              MADE WITH INTENTION.
            </h2>

            <p className="font-sans-ui text-base md:text-lg text-[#C7CDD2] font-light leading-relaxed max-w-md">
              Form is shaped by decisions too small to notice and too important to
              ignore. Every bevel, jewel setting, and brushed surface is finished
              for permanence rather than display.
            </p>

            <div className="pt-3">
              <a
                href="#manifesto"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#F1EEE9] text-[#0A0B0D] hover:bg-white font-sans-ui text-xs font-medium tracking-[0.18em] uppercase transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9DB8C9]"
              >
                <span>OUR PHILOSOPHY</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
