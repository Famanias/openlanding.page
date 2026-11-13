'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ResilientImage, TiltSurface, usePrefersReducedMotion } from './InteractivePrimitives';

gsap.registerPlugin(ScrollTrigger);

const ATRIUM_PLATE = '/templates/tessera/atrium_installation_hero_1794380180899.jpg';

function buildWaveformPath(dampingProgress: number): string {
  // dampingProgress: 0 = chaotic high-amplitude standing reflections, 1 = calm damped harmonic wave
  const points = 64;
  const width = 560;
  const midY = 54;
  const amp = 38 * (1 - dampingProgress * 0.82);
  const harmonicNoise = 1 - dampingProgress;

  let d = `M 0 ${midY.toFixed(1)}`;
  for (let i = 1; i <= points; i++) {
    const t = i / points;
    const x = t * width;
    const envelope = Math.sin(t * Math.PI);
    const primary = Math.sin(t * Math.PI * 5.5) * amp * envelope;
    const flutter =
      (Math.sin(t * Math.PI * 19) * 14 + Math.cos(t * Math.PI * 31) * 8) *
      harmonicNoise *
      envelope;
    const y = midY + primary + flutter;
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

export const ManifestoSection: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const clipFrameRef = useRef<HTMLDivElement>(null);
  const innerImgWrapRef = useRef<HTMLDivElement>(null);
  const [waveDamping, setWaveDamping] = useState<number>(reducedMotion ? 0.85 : 0.1);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) {
      setWaveDamping(0.85);
      return;
    }

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>('.manifesto-line-inner');
      gsap.fromTo(
        lines,
        { yPercent: 108, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      if (clipFrameRef.current && innerImgWrapRef.current) {
        gsap.fromTo(
          clipFrameRef.current,
          { clipPath: 'inset(18% 12% 18% 12% round 8px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 8px)',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'center 45%',
              scrub: 0.6,
            },
          },
        );

        gsap.fromTo(
          innerImgWrapRef.current,
          { scale: 1.14 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 30%',
              scrub: 0.6,
            },
          },
        );
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 40%',
        scrub: 0.4,
        onUpdate: (self) => {
          setWaveDamping(Number(self.progress.toFixed(3)));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const liveRt60 = (2.1 - waveDamping * 1.72).toFixed(2);
  const wavePath = buildWaveformPath(waveDamping);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-36 bg-[#0B0D10] border-t border-slate-200/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Editorial Statement + Scroll-Morphing Acoustic Waveform */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-display text-[clamp(2rem,3.6vw,3.35rem)] leading-[1.12] font-normal text-[#F8FAFC]">
              <span className="line-mask">
                <span className="manifesto-line-inner block">
                  Less echo.
                </span>
              </span>
              <span className="line-mask">
                <span className="manifesto-line-inner block text-[#E2C399]">
                  More room to listen.
                </span>
              </span>
            </h2>

            <p className="text-[15px] leading-[1.7] text-[#94A3B8] max-w-[46ch]">
              Modular relief panels soften reverberation without hiding the architecture.
            </p>

            {/* Scroll-Morphing SVG Reverberation Attenuation Trace */}
            <div className="pt-6 border-t border-slate-200/10">
              <div className="flex items-center justify-between text-xs font-mono-tabular mb-3">
                <span className="text-[#94A3B8]">
                  Reverberation demo
                </span>
                <span className="text-[#E2C399] font-medium">
                  RT60: {liveRt60}s
                </span>
              </div>
              <div className="bg-[#111419] border border-slate-200/10 rounded-lg p-4">
                <svg
                  viewBox="0 0 560 108"
                  className="w-full h-20 overflow-visible"
                  role="img"
                  aria-label={`Acoustic impulse decay waveform showing reverberation damped to ${liveRt60} seconds`}
                >
                  <line
                    x1="0"
                    y1="54"
                    x2="560"
                    y2="54"
                    stroke="rgba(226,232,240,0.1)"
                    strokeDasharray="3 4"
                  />
                  <path
                    d={wavePath}
                    fill="none"
                    stroke="#C89D66"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[#64748B] mt-2">
                  <span>Untreated</span>
                  <span>With Tessera</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Clip-Masked Museum Atrium Plate */}
          <div className="lg:col-span-5">
            <TiltSurface maxTiltDeg={4} cursorLabel="ATRIUM">
              <div
                ref={clipFrameRef}
                className="overflow-hidden rounded-lg border border-slate-200/15 bg-[#111419]"
              >
                <div ref={innerImgWrapRef} className="aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] w-full">
                  <ResilientImage
                    src={ATRIUM_PLATE}
                    alt="Daylit architectural museum atrium featuring a two-story Tessera limestone and walnut relief wall"
                    className="w-full h-full object-cover"
                    fallbackTitle="Kunsthalle Atrium Elevation"
                  />
                </div>
              </div>
            </TiltSurface>
            <div className="mt-3 flex items-center justify-between text-xs font-mono-tabular text-[#94A3B8]">
              <span>Atrium concept</span>
              <span>Limestone and walnut</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
