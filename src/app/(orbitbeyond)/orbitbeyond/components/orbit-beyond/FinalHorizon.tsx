'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { ORBIT_ASSETS } from '../../lib/orbit-beyond/assets';
import { GlassButton } from './GlassButton';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

gsap.registerPlugin(ScrollTrigger);

export interface FinalHorizonProps {
  onNavigate: (sectionId: string) => void;
}

export function FinalHorizon({ onNavigate }: FinalHorizonProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineMaskRef = useRef<HTMLDivElement | null>(null);
  const horizonMediaRef = useRef<HTMLDivElement | null>(null);

  const [imageSrc, setImageSrc] = useState<string>(ORBIT_ASSETS.finalEarthrise);
  const [imageFailed, setImageFailed] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !headlineMaskRef.current || !horizonMediaRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        horizonMediaRef.current,
        { scale: 1.07, yPercent: 6 },
        {
          scale: 1,
          yPercent: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        headlineMaskRef.current,
        { y: 36, opacity: 0.25 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 25%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleImageError = () => {
    if (imageSrc === ORBIT_ASSETS.finalEarthrise) {
      setImageSrc(ORBIT_ASSETS.finalEarthriseAltPath);
      return;
    }
    setImageFailed(true);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <footer
      id="final-horizon"
      ref={sectionRef}
      aria-labelledby="final-horizon-heading"
      className="relative isolate w-full bg-[#030812] pt-20 overflow-clip border-t border-white/8"
    >
      {/* Full-Width Final Earthrise Scene */}
      <div className="relative min-h-[82svh] w-full flex flex-col justify-between overflow-hidden">
        {/* Background Media Plate: 06-final-earthrise.webp */}
        <div
          ref={horizonMediaRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          {!imageFailed ? (
            <img
              src={imageSrc}
              alt=""
              loading="lazy"
              decoding="async"
              onError={handleImageError}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            /* Polished dark SVG Earthrise + ridge composition fallback */
            <svg viewBox="0 0 1440 800" className="h-full w-full bg-[#030812]">
              <circle cx="235" cy="390" r="46" fill="#178CFA" opacity="0.65" />
              <path
                d="M 0 450 Q 420 390, 920 430 T 1440 410 L 1440 800 L 0 800 Z"
                fill="#091525"
              />
            </svg>
          )}

          {/* Top & Bottom Atmospheric Scrims */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(3,8,18,0.92) 0%, rgba(3,8,18,0.32) 42%, rgba(3,8,18,0.22) 65%, rgba(3,8,18,0.96) 100%)',
            }}
          />

          {/* Subtle Orbital Horizon Linework */}
          <svg
            viewBox="0 0 1440 500"
            className="absolute inset-x-0 top-12 w-full h-auto opacity-35"
          >
            <path
              d="M 120 380 Q 720 120, 1320 380"
              fill="none"
              stroke="#8DE9FF"
              strokeWidth="1"
              strokeDasharray="6 8"
            />
          </svg>
        </div>

        {/* Center-Top Editorial Statement in the Open Sky */}
        <div
          ref={headlineMaskRef}
          className="relative z-10 mx-auto flex w-[min(1120px,90vw)] flex-col items-center text-center pt-12 sm:pt-20 pb-16"
        >
          <span className="font-hud-mono text-xs tracking-[0.24em] text-[#8DE9FF] uppercase mb-5">
            06 · THE FINAL HORIZON
          </span>

          <h2
            id="final-horizon-heading"
            className="font-display-sans font-extrabold uppercase tracking-[-0.03em] text-[#EDF6FD] leading-[0.96] text-[clamp(2.5rem,6vw,6.75rem)] drop-shadow-[0_8px_28px_rgba(3,8,18,0.85)]"
          >
            <span className="block">SEE YOU</span>
            <span className="block mt-1">
              ON THE{' '}
              <span className="font-editorial-serif italic font-normal lowercase tracking-normal text-[#8DE9FF]">
                other side.
              </span>
            </span>
          </h2>

          <p className="mt-6 font-hud-mono text-xs sm:text-sm tracking-[0.22em] text-[#EDF6FD]/85 uppercase">
            THE NEXT GREAT GETAWAY IS OUT THERE.
          </p>

          <div className="mt-8">
            <GlassButton
              type="button"
              variant="primary"
              size="lg"
              onClick={() => onNavigate('mission-configurator')}
            >
              <span>PREVIEW YOUR MISSION</span>
              <ArrowUpRight className="h-4 w-4" />
            </GlassButton>
          </div>
        </div>

        {/* Secondary Quiet Footer Grid */}
        <div className="relative z-10 border-t border-white/10 bg-[#030812]/85 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Brand Lockup Left */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <a
                href="#lunar-arrival"
                onClick={(e) => handleNavClick(e, 'lunar-arrival')}
                className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.22em] text-[#EDF6FD] uppercase whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] rounded"
              >
                <span className="inline-block h-2.5 w-2.5 rounded-full border border-[#8DE9FF]" />
                <span>ORBIT &amp; BEYOND</span>
              </a>
              <span className="text-xs text-[#AAB7C4]">
                Speculative 2045 Lunar Weekend Concept
              </span>
            </div>

            {/* Section Anchors Center */}
            <nav
              aria-label="Footer Section Navigation"
              className="flex flex-wrap items-center gap-6"
            >
              <a
                href="#the-journey"
                onClick={(e) => handleNavClick(e, 'the-journey')}
                className="font-hud-mono text-[11px] tracking-[0.18em] text-[#AAB7C4] hover:text-[#EDF6FD] uppercase whitespace-nowrap transition-colors"
              >
                THE JOURNEY
              </a>
              <a
                href="#the-habitat"
                onClick={(e) => handleNavClick(e, 'the-habitat')}
                className="font-hud-mono text-[11px] tracking-[0.18em] text-[#AAB7C4] hover:text-[#EDF6FD] uppercase whitespace-nowrap transition-colors"
              >
                THE HABITAT
              </a>
              <a
                href="#lunar-experiences"
                onClick={(e) => handleNavClick(e, 'lunar-experiences')}
                className="font-hud-mono text-[11px] tracking-[0.18em] text-[#AAB7C4] hover:text-[#EDF6FD] uppercase whitespace-nowrap transition-colors"
              >
                EXPERIENCES
              </a>
              <a
                href="#mission-configurator"
                onClick={(e) => handleNavClick(e, 'mission-configurator')}
                className="font-hud-mono text-[11px] tracking-[0.18em] text-[#8DE9FF] hover:text-[#EDF6FD] uppercase whitespace-nowrap transition-colors"
              >
                MISSION PREVIEW
              </a>
            </nav>

            {/* Fictional Concept Disclaimer Right */}
            <div className="font-hud-mono text-[11px] tracking-[0.16em] text-[#AAB7C4] uppercase">
              FICTIONAL CONCEPT — OPENLANDING · NO REAL FLIGHTS
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
