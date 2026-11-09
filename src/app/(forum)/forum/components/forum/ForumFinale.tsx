'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { scrollToSectionId } from '../../lib/forum/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const FINALE_LINES = [
  'READY TO TURN',
  'EVERY SIGNAL',
  'INTO MOMENTUM?',
] as const;

export const ForumFinale: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const topBorderRef = useRef<HTMLDivElement | null>(null);
  const apertureRingRef = useRef<SVGGElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (topBorderRef.current) {
          gsap.fromTo(
            topBorderRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (apertureRingRef.current) {
          gsap.fromTo(
            apertureRingRef.current,
            { rotate: -18, scale: 0.92, transformOrigin: '50% 50%' },
            {
              rotate: 12,
              scale: 1,
              transformOrigin: '50% 50%',
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      id="final"
      ref={sectionRef}
      aria-labelledby="finale-heading"
      className="relative scroll-mt-[72px] lg:scroll-mt-[80px] w-full bg-[#0E100C] pt-16 sm:pt-24 lg:pt-28 pb-16 sm:pb-20"
    >
      <div
        ref={topBorderRef}
        aria-hidden="true"
        className="mx-auto max-w-[1920px] h-px bg-[#B9B28A]/38 origin-left mb-10"
      />

      <div className="mx-auto max-w-[1920px] px-5 sm:px-8 lg:px-14">
        {/* Top Registration Row */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <span className="reg-cross text-[#B9B28A]/80" aria-hidden="true" />
          <span className="font-mono-tech text-xs tracking-[0.16em] text-[#B9B28A] uppercase">
            006 / FINAL ORBIT
          </span>
          <span className="reg-cross text-[#B9B28A]/80" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Huge Left-Aligned CTA Block (Cols 1-7) */}
          <div className="lg:col-span-7">
            <h2
              id="finale-heading"
              aria-label="READY TO TURN EVERY SIGNAL INTO MOMENTUM?"
              className="font-doto-hero uppercase text-[#F6F3EA] text-[clamp(2.25rem,5.8vw,5.4rem)] leading-[0.92] tracking-[-0.02em]"
            >
              <span className="sr-only">
                READY TO TURN EVERY SIGNAL INTO MOMENTUM?
              </span>
              {FINALE_LINES.map((line) => (
                <span key={line} aria-hidden="true" className="block">
                  {line}
                </span>
              ))}
            </h2>

            <p className="mt-6 max-w-[580px] font-prose-support text-lg sm:text-2xl text-[#B9B28A] leading-[1.35]">
              Make clearer decisions with a system built around the whole picture.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={() => scrollToSectionId('platform')}
                icon={<span className="text-base leading-none">↗</span>}
              >
                EXPLORE THE SYSTEM
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                size="lg"
                onClick={() => scrollToSectionId('demo', '#demo-board-heading')}
                icon={<span className="text-xs leading-none">▶</span>}
              >
                OPEN LIVE DEMO
              </MagneticButton>
            </div>
          </div>

          {/* Right-Hand Native CSS/SVG Orbital Monolith Aperture (Cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-[540px]">
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#0E100C] dither-grid-dark border border-[#B9B28A]/35 flex items-center justify-center">
                <svg
                  viewBox="0 0 480 330"
                  className="h-full w-full"
                  role="img"
                  aria-label="Architectural orbital monolith aperture schematic"
                >
                  <defs>
                    <radialGradient id="finaleSunburst" cx="54%" cy="38%" r="58%">
                      <stop offset="0%" stopColor="#F6F3EA" stopOpacity="0.95" />
                      <stop offset="28%" stopColor="#D7D1B8" stopOpacity="0.65" />
                      <stop offset="58%" stopColor="#B9B28A" stopOpacity="0.24" />
                      <stop offset="100%" stopColor="#0E100C" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="finaleDomeGrad" x1="35%" y1="15%" x2="70%" y2="95%">
                      <stop offset="0%" stopColor="#F6F3EA" stopOpacity="0.92" />
                      <stop offset="40%" stopColor="#B9B28A" stopOpacity="0.72" />
                      <stop offset="80%" stopColor="#171814" stopOpacity="0.92" />
                      <stop offset="100%" stopColor="#0E100C" stopOpacity="1" />
                    </linearGradient>
                    <pattern
                      id="finaleDitherDots"
                      x="0"
                      y="0"
                      width="4"
                      height="4"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect x="0" y="0" width="1.5" height="1.5" fill="#B9B28A" fillOpacity="0.45" />
                      <rect x="2" y="2" width="1" height="1" fill="#0E100C" fillOpacity="0.75" />
                    </pattern>
                  </defs>

                  {/* Outer Starfield Specks */}
                  <g fill="#D7D1B8" opacity="0.65">
                    <rect x="38" y="44" width="2" height="2" />
                    <rect x="74" y="92" width="1.5" height="1.5" />
                    <rect x="52" y="210" width="2" height="2" />
                    <rect x="96" y="268" width="1.5" height="1.5" />
                    <rect x="392" y="48" width="2" height="2" />
                    <rect x="428" y="108" width="2" height="2" />
                    <rect x="412" y="236" width="1.5" height="1.5" />
                    <rect x="366" y="284" width="2" height="2" />
                  </g>

                  {/* Dramatic Radial Sunburst Beams (Top-Right Corona) */}
                  <g opacity="0.52" stroke="#D7D1B8" strokeWidth="1">
                    <line x1="240" y1="165" x2="20" y2="10" strokeWidth="0.75" />
                    <line x1="240" y1="165" x2="85" y2="0" strokeWidth="1.2" />
                    <line x1="240" y1="165" x2="165" y2="0" strokeWidth="0.75" />
                    <line x1="240" y1="165" x2="315" y2="0" strokeWidth="1.5" />
                    <line x1="240" y1="165" x2="375" y2="0" strokeWidth="2.2" />
                    <line x1="240" y1="165" x2="440" y2="15" strokeWidth="1.8" />
                    <line x1="240" y1="165" x2="480" y2="60" strokeWidth="1.2" />
                    <line x1="240" y1="165" x2="480" y2="115" strokeWidth="0.8" />
                    <line x1="240" y1="165" x2="0" y2="85" strokeWidth="0.8" />
                    <line x1="240" y1="165" x2="460" y2="275" strokeWidth="0.6" />
                    <line x1="240" y1="165" x2="30" y2="280" strokeWidth="0.6" />
                  </g>

                  {/* Luminous Corona Glow */}
                  <circle cx="240" cy="165" r="142" fill="url(#finaleSunburst)" />

                  {/* Outer Orbital Aperture Rings (Scroll-Rotated) */}
                  <g ref={apertureRingRef}>
                    {/* Outer Crescent Shell */}
                    <circle
                      cx="240"
                      cy="172"
                      r="116"
                      fill="#8C876B"
                      fillOpacity="0.42"
                      stroke="#B9B28A"
                      strokeWidth="1"
                    />
                    <circle
                      cx="240"
                      cy="172"
                      r="116"
                      fill="url(#finaleDitherDots)"
                    />
                    {/* Inner Offset Luminous Sphere */}
                    <circle
                      cx="240"
                      cy="184"
                      r="92"
                      fill="url(#finaleDomeGrad)"
                      stroke="#D7D1B8"
                      strokeWidth="0.8"
                      strokeOpacity="0.6"
                    />
                    <circle
                      cx="240"
                      cy="184"
                      r="92"
                      fill="url(#finaleDitherDots)"
                    />
                  </g>

                  {/* Sharp Vertical Isometric Monolith Silhouette (Grounded in Aperture) */}
                  <g>
                    {/* Left Dark Monolith Face */}
                    <polygon
                      points="214,94 244,80 238,266 204,274"
                      fill="#0E100C"
                      stroke="#B9B28A"
                      strokeWidth="1"
                    />
                    {/* Right Illuminated Dithered Monolith Face */}
                    <polygon
                      points="244,80 264,92 262,274 238,266"
                      fill="#B9B28A"
                      stroke="#F6F3EA"
                      strokeWidth="0.9"
                    />
                    <polygon
                      points="244,80 264,92 262,274 238,266"
                      fill="url(#finaleDitherDots)"
                    />
                    {/* Architectural Circuit Etchings on Monolith */}
                    <line x1="218" y1="132" x2="241" y2="123" stroke="#B9B28A" strokeWidth="0.75" strokeOpacity="0.65" />
                    <line x1="214" y1="176" x2="239" y2="168" stroke="#B9B28A" strokeWidth="0.75" strokeOpacity="0.65" />
                    <line x1="210" y1="218" x2="238" y2="210" stroke="#B9B28A" strokeWidth="0.75" strokeOpacity="0.5" />
                    <line x1="244" y1="138" x2="261" y2="147" stroke="#0E100C" strokeWidth="0.9" />
                    <line x1="242" y1="186" x2="260" y2="195" stroke="#0E100C" strokeWidth="0.9" />
                  </g>
                </svg>
              </div>

              <div className="mt-3 flex items-center justify-between font-mono-tech text-[11px] text-[#B9B28A] uppercase tracking-[0.14em]">
                <div>
                  <div>SCHEMATIC // ORBITAL APERTURE</div>
                  <div className="text-[#8C876B]">16:9 VIEWPORT SYNTHESIS</div>
                </div>
                <span className="text-[#F6F3EA]">003 / FINAL ORBIT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
