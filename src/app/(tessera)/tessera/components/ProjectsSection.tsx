'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import {
  ArrangementPatternId,
  MaterialFinishId,
  TileShapeId,
} from '../domain/tesseraSystem';
import {
  MagneticButton,
  ResilientImage,
  TiltSurface,
  usePrefersReducedMotion,
} from './InteractivePrimitives';

gsap.registerPlugin(ScrollTrigger);

const OSLO_IMG = '/templates/tessera/oslo_chamber_project_1794380181917.jpg';
const ZURICH_IMG = '/templates/tessera/zurich_kunsthalle_project_1794380183581.jpg';

interface CasePreset {
  shape: TileShapeId;
  material: MaterialFinishId;
  pattern: ArrangementPatternId;
}

interface ProjectsSectionProps {
  onLoadProjectPreset: (preset: CasePreset) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onLoadProjectPreset,
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const spreads = gsap.utils.toArray<HTMLElement>('.project-editorial-spread');
      spreads.forEach((spread) => {
        gsap.fromTo(
          spread,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: spread,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const applyAndScroll = (preset: CasePreset) => {
    onLoadProjectPreset(preset);
    document
      .getElementById('configurator')
      ?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#0B0D10] border-t border-slate-200/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200/10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#94A3B8]">
              <span>05. Built Commissions &amp; Acoustic Verification</span>
              <span aria-hidden="true">·</span>
              <span>Field-Measured ISO 3382</span>
            </div>
            <h2 className="font-display text-[clamp(2.1rem,3.5vw,3.25rem)] leading-[1.1] font-normal text-[#F8FAFC]">
              Proven in Europe’s most demanding reverberant volumes.
            </h2>
          </div>
          <div className="text-xs font-mono-tabular text-[#94A3B8]">
            280+ Cultural &amp; Civic Installations Since 2022
          </div>
        </div>

        {/* Commission 01: Panoramic 16:9 Oslo Recital Hall */}
        <article className="project-editorial-spread grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-7">
            <TiltSurface maxTiltDeg={3.5} cursorLabel="OSLO HALL" className="h-full">
              <div className="h-full rounded-xl overflow-hidden border border-slate-200/15 bg-[#111419]">
                <ResilientImage
                  src={OSLO_IMG}
                  alt="Oslo Fjord Chamber Recital Hall featuring floor-to-ceiling Tessera smoked walnut and Nordic sage modular wall relief"
                  className="w-full h-full object-cover min-h-[280px] lg:h-full"
                  fallbackTitle="Oslo Fjord Chamber Hall"
                />
              </div>
            </TiltSurface>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between bg-[#111419] border border-slate-200/10 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-[#94A3B8]">
                <span>Oslo, Norway</span>
                <span aria-hidden="true">·</span>
                <span>1,420 m³ Volume</span>
                <span aria-hidden="true">·</span>
                <span>Completed 2025</span>
              </div>

              <h3 className="font-display text-3xl text-[#F8FAFC] leading-tight">
                Oslo Fjord Chamber Recital Hall
              </h3>

              <p className="text-sm leading-[1.7] text-[#94A3B8]">
                Tasked with preserving early lateral warmth for solo strings while
                eliminating harsh rear-wall slapback opposite triple-glazed fjord
                windows, 310 Tessera modules were arrayed in an alternating walnut and
                botanical wool elevation.
              </p>

              {/* Quantified Outcome Strip */}
              <dl className="grid grid-cols-2 gap-4 py-4 border-y border-slate-200/10">
                <div>
                  <dt className="text-[11px] text-[#64748B]">Mid-Band Decay Shift</dt>
                  <dd className="font-mono-tabular text-lg font-medium text-[#E2C399] mt-0.5">
                    1.32s → 0.41s RT60
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] text-[#64748B]">Clarity Gain (C80)</dt>
                  <dd className="font-mono-tabular text-lg font-medium text-[#F1F5F9] mt-0.5">
                    +6.4 dB Verified
                  </dd>
                </div>
              </dl>

              <blockquote className="text-sm italic text-[#CBD5E1] leading-relaxed">
                “Before Tessera, our glazed west gallery blurred rapid cello passages.
                Installing the beveled walnut and sage array cut mid-frequency overhang
                by 68% while giving the hall its defining architectural sculpture.”
                <footer className="not-italic text-xs text-[#94A3B8] mt-2">
                  — Henrik Solberg, Principal Acoustic Architect, Solberg &amp; Viken Oslo
                </footer>
              </blockquote>
            </div>

            <div>
              <MagneticButton
                variant="secondary"
                onClick={() =>
                  applyAndScroll({
                    shape: 'beveled-prism',
                    material: 'nordic-sage',
                    pattern: 'harmonic-wave',
                  })
                }
                className="w-full sm:w-auto"
              >
                Load Oslo Palette in Configurator
                <ArrowUpRight className="w-4 h-4 text-[#C89D66]" />
              </MagneticButton>
            </div>
          </div>
        </article>

        {/* Commission 02: Reversed Asymmetric Zurich Kunsthalle Spread */}
        <article className="project-editorial-spread grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-between bg-[#111419] border border-slate-200/10 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-[#94A3B8]">
                <span>Zürich, Switzerland</span>
                <span aria-hidden="true">·</span>
                <span>2,850 m³ Concrete Atrium</span>
                <span aria-hidden="true">·</span>
                <span>Completed 2026</span>
              </div>

              <h3 className="font-display text-3xl text-[#F8FAFC] leading-tight">
                Kunsthalle Zürich Reception Foyer
              </h3>

              <p className="text-sm leading-[1.7] text-[#94A3B8]">
                Board-formed concrete columns and polished terrazzo floors generated a
                2.4-second reverberation tail during exhibition openings. A two-story
                radial tessellation of Charcoal Felt and Anodized Bronze restored calm
                conversational intimacy at the reception desk.
              </p>

              <dl className="grid grid-cols-2 gap-4 py-4 border-y border-slate-200/10">
                <div>
                  <dt className="text-[11px] text-[#64748B]">Speech Transmission (STI)</dt>
                  <dd className="font-mono-tabular text-lg font-medium text-[#E2C399] mt-0.5">
                    0.48 → 0.76 STI
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] text-[#64748B]">Ambient Crowd Drop</dt>
                  <dd className="font-mono-tabular text-lg font-medium text-[#F1F5F9] mt-0.5">
                    -9.2 dBA Peak
                  </dd>
                </div>
              </dl>

              <blockquote className="text-sm italic text-[#CBD5E1] leading-relaxed">
                “Visitors used to raise their voices just to purchase tickets in our
                concrete lobby. Tessera raised speech intelligibility by 58% within a
                single weekend installation—with zero wet trades.”
                <footer className="not-italic text-xs text-[#94A3B8] mt-2">
                  — Dr. Clara Meier, Head of Spatial Design, Kunsthalle Zürich
                </footer>
              </blockquote>
            </div>

            <div>
              <MagneticButton
                variant="secondary"
                onClick={() =>
                  applyAndScroll({
                    shape: 'parabolic-dish',
                    material: 'charcoal-felt',
                    pattern: 'radial-aperture',
                  })
                }
                className="w-full sm:w-auto"
              >
                Load Zürich Palette in Configurator
                <ArrowUpRight className="w-4 h-4 text-[#C89D66]" />
              </MagneticButton>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <TiltSurface maxTiltDeg={3.5} cursorLabel="ZÜRICH FOYER" className="h-full">
              <div className="h-full rounded-xl overflow-hidden border border-slate-200/15 bg-[#111419]">
                <ResilientImage
                  src={ZURICH_IMG}
                  alt="Kunsthalle Zürich concrete reception atrium featuring a monumental charcoal felt and brushed bronze Tessera geometric wall installation"
                  className="w-full h-full object-cover min-h-[280px] lg:h-full"
                  fallbackTitle="Kunsthalle Zürich Reception Wall"
                />
              </div>
            </TiltSurface>
          </div>
        </article>
      </div>
    </section>
  );
};
