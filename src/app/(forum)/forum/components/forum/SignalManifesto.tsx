'use client';
import React, { useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { generateManifestoDots } from '../../lib/forum/demoData';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export const SignalManifesto: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const reducedMotion = useReducedMotion();

  const [manualStructured, setManualStructured] = useState<boolean>(false);
  const [scrollStructured, setScrollStructured] = useState<boolean>(false);

  const dots = useMemo(() => generateManifestoDots(72), []);
  const isStructured = reducedMotion || manualStructured || scrollStructured;

  // Apply dot positions whenever manualStructured changes or reducedMotion is active
  useGSAP(
    () => {
      if (!svgRef.current) return;
      const circleNodes = svgRef.current.querySelectorAll<SVGCircleElement>('.manifesto-node');
      const gridLines = svgRef.current.querySelectorAll<SVGElement>('.manifesto-grid-line');

      if (reducedMotion || manualStructured) {
        circleNodes.forEach((circle, idx) => {
          const d = dots[idx];
          if (!d) return;
          gsap.to(circle, {
            attr: { cx: d.gridX, cy: d.gridY },
            duration: reducedMotion ? 0 : 0.65,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        });
        gsap.to(gridLines, {
          opacity: 0.35,
          duration: reducedMotion ? 0 : 0.5,
          overwrite: 'auto',
        });
        return;
      }

      // When not manually locked, ScrollTrigger drives progress 0 -> 1 smoothly
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'bottom 55%',
            scrub: 0.5,
            onUpdate: (self) => {
              setScrollStructured(self.progress > 0.52);
            },
          },
        });

        circleNodes.forEach((circle, idx) => {
          const d = dots[idx];
          if (!d) return;
          tl.fromTo(
            circle,
            { attr: { cx: d.noiseX, cy: d.noiseY } },
            { attr: { cx: d.gridX, cy: d.gridY }, ease: 'power2.inOut' },
            0
          );
        });

        tl.fromTo(
          gridLines,
          { opacity: 0 },
          { opacity: 0.32, ease: 'power1.inOut' },
          0.35
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [dots, manualStructured, reducedMotion] }
  );

  const handleTogglePattern = () => {
    setManualStructured((prev) => {
      const next = !prev;
      if (!next && svgRef.current && !reducedMotion) {
        // Return nodes to dispersed state immediately when user toggles back off
        const circleNodes =
          svgRef.current.querySelectorAll<SVGCircleElement>('.manifesto-node');
        const gridLines =
          svgRef.current.querySelectorAll<SVGElement>('.manifesto-grid-line');
        circleNodes.forEach((circle, idx) => {
          const d = dots[idx];
          if (!d) return;
          gsap.to(circle, {
            attr: { cx: d.noiseX, cy: d.noiseY },
            duration: 0.55,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });
        gsap.to(gridLines, { opacity: 0, duration: 0.35, overwrite: 'auto' });
        setScrollStructured(false);
      }
      return next;
    });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="manifesto-heading"
      className="relative scroll-mt-[72px] lg:scroll-mt-[80px] w-full bg-[#F6F3EA] text-[#171814] border-b border-[#171814]/25 py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1920px] px-5 sm:px-8 lg:px-14">
        {/* Top Editorial Index Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#171814]/20 pb-5 mb-12 lg:mb-16">
          <div className="flex items-center gap-3">
            <span className="reg-cross text-[#171814]" aria-hidden="true" />
            <span className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[#171814]">
              001.5 / EDITORIAL MANIFESTO
            </span>
          </div>
          <div className="font-mono-tech text-xs tracking-[0.14em] uppercase text-[#171814]/75">
            ABSTRACT VISUAL METAPHOR · SIGNAL ALIGNMENT STUDY
          </div>
        </div>

        {/* Two-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Sparse Index Gutter */}
          <div className="lg:col-span-4 flex flex-col justify-between border-l border-[#171814]/25 pl-5 py-1 space-y-6">
            <div>
              <div className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[#171814]/65 mb-2">
                THESIS // OBSERVATION
              </div>
              <p className="font-prose-support text-base sm:text-lg leading-relaxed text-[#171814]/90">
                Conversations, relationships, and opportunities leave traces. FORUM brings those signals into one clear field of view.
              </p>
            </div>

            <div className="border-t border-[#171814]/20 pt-5 space-y-4">
              <div className="flex items-center justify-between font-mono-tech text-xs uppercase tracking-[0.14em]">
                <span className="text-[#171814]/70">SCHEMATIC STATE:</span>
                <span
                  data-testid="manifesto-state-label"
                  className="font-bold text-[#171814] bg-[#D7D1B8] px-2.5 py-1 border border-[#171814]/30"
                >
                  {isStructured ? 'STRUCTURED / 01' : 'UNSORTED / 00'}
                </span>
              </div>

              <MagneticButton
                variant="ivory-dark"
                size="md"
                ariaPressed={manualStructured}
                onClick={handleTogglePattern}
                dataTestId="view-pattern-btn"
                className="w-full sm:w-auto"
              >
                {manualStructured ? 'RESET TO NOISE' : 'VIEW PATTERN'}
              </MagneticButton>
            </div>
          </div>

          {/* Right Monumental Headline + Live Vector Schematic */}
          <div className="lg:col-span-8">
            <h2
              id="manifesto-heading"
              className="font-doto-display uppercase text-[#171814] text-[clamp(2rem,4.8vw,4.5rem)] leading-[0.94] tracking-[-0.02em] text-balance"
            >
              <span className="block">THE NOISE IS NOT THE PROBLEM.</span>
              <span className="block mt-1 text-[#8C876B]">THE PATTERN IS.</span>
            </h2>

            {/* Deterministic 72-Dot Scientific Print Schematic */}
            <div className="mt-10 sm:mt-12 border border-[#171814]/30 bg-[#F6F3EA] dither-grid-ivory p-4 sm:p-6 relative">
              <div className="flex items-center justify-between border-b border-[#171814]/15 pb-3 mb-4 font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#171814]/75">
                <span>FIG 01 — 72-NODE FIELD TRANSFORMATION</span>
                <span>{isStructured ? 'COHERENT CONSTELLATION GRID' : 'DISPERSED SIGNAL TRACES'}</span>
              </div>

              <svg
                ref={svgRef}
                viewBox="0 0 720 320"
                className="w-full h-auto max-h-[340px] overflow-visible"
                role="img"
                aria-label="Abstract visual metaphor showing 72 dispersed signal nodes aligning into an ordered geometric grid"
              >
                {/* Horizontal & Vertical Reference Grid Lines (visible when structured) */}
                {[58, 98, 138, 178, 218, 258].map((y) => (
                  <line
                    key={`row-${y}`}
                    x1={70}
                    y1={y}
                    x2={642}
                    y2={y}
                    stroke="#171814"
                    strokeWidth="0.75"
                    strokeDasharray="3 3"
                    opacity={reducedMotion ? 0.32 : 0}
                    className="manifesto-grid-line"
                  />
                ))}
                {[70, 174, 278, 382, 486, 590, 642].map((x) => (
                  <line
                    key={`col-${x}`}
                    x1={x}
                    y1={58}
                    x2={x}
                    y2={258}
                    stroke="#171814"
                    strokeWidth="0.75"
                    opacity={reducedMotion ? 0.25 : 0}
                    className="manifesto-grid-line"
                  />
                ))}

                {/* 72 Deterministic Nodes */}
                {dots.map((dot) => (
                  <circle
                    key={dot.id}
                    cx={reducedMotion || manualStructured ? dot.gridX : dot.noiseX}
                    cy={reducedMotion || manualStructured ? dot.gridY : dot.noiseY}
                    r={dot.size}
                    fill={dot.isPrimary ? '#171814' : '#8C876B'}
                    className="manifesto-node"
                  />
                ))}
              </svg>

              <div className="mt-3 flex items-center justify-between border-t border-[#171814]/15 pt-3 font-mono-tech text-[11px] text-[#171814]/70 uppercase tracking-[0.12em]">
                <span>72 SAMPLE NODES · ZERO LIVE TELEMETRY</span>
                <span>SCROLL OR CLICK &quot;VIEW PATTERN&quot; TO ALIGN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
