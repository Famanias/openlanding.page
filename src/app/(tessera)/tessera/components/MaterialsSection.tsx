'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Volume2, ArrowUpRight } from 'lucide-react';
import {
  FREQUENCY_BANDS_HZ,
  MATERIAL_FINISHES,
  MaterialFinishId,
} from '../domain/tesseraSystem';
import {
  MagneticButton,
  ResilientImage,
  TiltSurface,
  usePrefersReducedMotion,
} from './InteractivePrimitives';
import { playAcousticComparison, playTactileClick } from '../utils/acousticAudio';

gsap.registerPlugin(ScrollTrigger);

const MATERIAL_ATELIER_IMG =
  '/templates/tessera/material_atelier_craft_1794380184347.jpg';

interface MaterialsSectionProps {
  onSelectMaterialForConfigurator: (materialId: MaterialFinishId) => void;
}

export const MaterialsSection: React.FC<MaterialsSectionProps> = ({
  onSelectMaterialForConfigurator,
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const [selectedId, setSelectedId] = useState<MaterialFinishId>('charcoal-felt');
  const [auditionState, setAuditionState] = useState<'idle' | 'untreated' | 'tessera'>('idle');
  const sectionRef = useRef<HTMLElement>(null);

  const selectedSpec =
    MATERIAL_FINISHES.find((m) => m.id === selectedId) ?? MATERIAL_FINISHES[0];

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.material-row-item',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Compute SVG absorption curve coordinates for selected finish
  const baseProfile = [0.54, 0.81, 0.93, 0.96, 0.94, 0.89];
  const points = baseProfile.map((val, idx) => {
    const alpha = Math.max(0.35, Math.min(0.99, val + selectedSpec.nrcModifier));
    const x = 36 + idx * 84;
    const y = 118 - alpha * 92;
    return { x, y, alpha, hz: FREQUENCY_BANDS_HZ[idx] };
  });
  const polylinePath = points
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y.toFixed(1)}`)
    .join(' ');

  const triggerAudition = (mode: 'untreated' | 'tessera') => {
    setAuditionState(mode);
    playAcousticComparison(mode, 0.92 + selectedSpec.nrcModifier);
    window.setTimeout(() => {
      setAuditionState((prev) => (prev === mode ? 'idle' : prev));
    }, 1500);
  };

  return (
    <section
      id="materials"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#111419] border-t border-slate-200/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 mb-14 border-b border-slate-200/10 items-end">
          <div className="lg:col-span-7 space-y-3">
            <h2 className="font-display text-[clamp(2.1rem,3.5vw,3.25rem)] leading-[1.1] font-normal text-[#F8FAFC]">
              Find your finish.
            </h2>
          </div>
          <p className="lg:col-span-5 text-[15px] leading-[1.68] text-[#94A3B8]">
            Five finishes. Choose the texture and tone for your space.
          </p>
        </div>

        {/* Asymmetric Two-Column Atelier Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Sticky Specimen Plate + Interactive Acoustic Audition */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <TiltSurface maxTiltDeg={5} cursorLabel="SPECIMEN">
              <div className="rounded-xl overflow-hidden border border-slate-200/15 bg-[#0B0D10]">
                <div className="aspect-[4/3] w-full">
                  <ResilientImage
                    src={MATERIAL_ATELIER_IMG}
                    alt="Macro studio specimens of compressed charcoal felt, fluted smoked walnut, porous limestone, and anodized bronze cleats on a slate drafting table"
                    className="w-full h-full object-cover"
                    fallbackTitle="Tessera Material Specimen Plate"
                  />
                </div>
              </div>
            </TiltSurface>

            {/* Acoustic Chamber Tone Comparison Box */}
            <div className="bg-[#0B0D10] border border-slate-200/12 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tabular text-[#94A3B8]">
                  CHAMBER IMPULSE AUDITION
                </span>
                <span className="text-xs font-mono-tabular text-[#E2C399]">
                  {selectedSpec.name}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-[#94A3B8]">
                Compare synthesized room decay between an untreated concrete chamber and a
                wall finished in {selectedSpec.name}.
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => triggerAudition('untreated')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66] ${
                    auditionState === 'untreated'
                      ? 'bg-[#1E2430] border-[#C89D66] text-[#F8FAFC]'
                      : 'bg-[#161A21] border-slate-200/15 text-[#CBD5E1] hover:border-slate-200/35'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span>Hear untreated</span>
                </button>
                <button
                  type="button"
                  onClick={() => triggerAudition('tessera')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66] ${
                    auditionState === 'tessera'
                      ? 'bg-[#C89D66] border-[#C89D66] text-[#0B0D10] font-semibold'
                      : 'bg-[#161A21] border-[#C89D66]/45 text-[#F1F5F9] hover:border-[#C89D66]'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5 text-current" />
                  <span>Hear with Tessera</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Interactive Material Index + Live SVG Absorption Curve */}
          <div className="lg:col-span-7 space-y-8">
            <div
              role="group"
              aria-label="Architectural Material Finishes"
              className="divide-y divide-slate-200/10 border-y border-slate-200/10"
            >
              {MATERIAL_FINISHES.map((mat) => {
                const isSelected = mat.id === selectedId;
                const effectiveNrc = (0.92 + mat.nrcModifier).toFixed(2);
                return (
                  <div
                    key={mat.id}
                    className={`material-row-item transition-colors ${
                      isSelected ? 'bg-[#161A21]' : 'hover:bg-[#161A21]/50'
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isSelected}
                      onClick={() => {
                        playTactileClick(250);
                        setSelectedId(mat.id);
                      }}
                      className="w-full text-left py-5 px-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66]"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <span
                            aria-hidden="true"
                            style={{
                              background: `radial-gradient(circle at 32% 30%, ${mat.highlightHex}, ${mat.primaryHex} 62%, ${mat.shadowHex})`,
                            }}
                            className={`w-9 h-9 rounded-full shrink-0 border ${
                              isSelected ? 'border-[#C89D66] scale-105' : 'border-slate-200/20'
                            } transition-transform`}
                          />
                          <div>
                            <div className="font-display text-2xl text-[#F8FAFC] leading-tight">
                              {mat.name}
                            </div>
                            <div className="text-xs text-[#94A3B8] mt-0.5">
                              {mat.origin}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-mono-tabular text-[#94A3B8]">
                          <span>NRC {effectiveNrc}</span>
                          <span aria-hidden="true">·</span>
                          <span>{mat.massPerTileKg.toFixed(1)} kg / tile</span>
                        </div>
                      </div>
                    </button>

                    {isSelected && (
                      <div className="px-4 pb-5 pl-17 space-y-4">
                        <p className="text-sm leading-relaxed text-[#CBD5E1] max-w-[58ch]">
                          {mat.description}
                        </p>
                        <div>
                          <MagneticButton
                            variant="secondary"
                            onClick={() => {
                              onSelectMaterialForConfigurator(mat.id);
                              document
                                .getElementById('configurator')
                                ?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
                            }}
                            className="py-1.5 px-3.5 text-xs"
                          >
                            Use this finish
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#C89D66]" />
                          </MagneticButton>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Smooth SVG Line-Drawn Absorption Curve for Selected Finish */}
            <div className="bg-[#0B0D10] border border-slate-200/12 rounded-xl p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono-tabular text-[#94A3B8]">
                  MEASURED ABSORPTION PROFILE — {selectedSpec.name.toUpperCase()}
                </span>
                <span className="text-xs font-mono-tabular text-[#E2C399]">
                  Mass: {selectedSpec.massPerTileKg.toFixed(1)} kg/unit · Roughness {selectedSpec.roughness.toFixed(2)}
                </span>
              </div>

              <svg
                viewBox="0 0 500 145"
                className="w-full h-auto"
                role="img"
                aria-label={`Sound absorption coefficient curve across 125 Hz to 4000 Hz for ${selectedSpec.name}`}
              >
                {[0.25, 0.5, 0.75, 1.0].map((gridVal) => {
                  const gy = 118 - gridVal * 92;
                  return (
                    <g key={gridVal}>
                      <line
                        x1="28"
                        y1={gy}
                        x2="472"
                        y2={gy}
                        stroke="rgba(226,232,240,0.08)"
                      />
                      <text
                        x="4"
                        y={gy + 3}
                        fill="#64748B"
                        fontSize="9.5"
                        fontFamily="IBM Plex Mono, monospace"
                      >
                        {gridVal.toFixed(2)}
                      </text>
                    </g>
                  );
                })}

                <path
                  d={polylinePath}
                  fill="none"
                  stroke="#C89D66"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300"
                />

                {points.map((pt) => (
                  <g key={pt.hz}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="4"
                      fill="#0B0D10"
                      stroke="#E2C399"
                      strokeWidth="2"
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 9}
                      textAnchor="middle"
                      fill="#F1F5F9"
                      fontSize="9.5"
                      fontFamily="IBM Plex Mono, monospace"
                    >
                      {pt.alpha.toFixed(2)}
                    </text>
                    <text
                      x={pt.x}
                      y="138"
                      textAnchor="middle"
                      fill="#94A3B8"
                      fontSize="10"
                      fontFamily="IBM Plex Mono, monospace"
                    >
                      {pt.hz >= 1000 ? `${pt.hz / 1000}k` : pt.hz} Hz
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
