"use client";

import React, { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductModel } from '../data/catalog';

interface HeroSectionProps {
  models: ProductModel[];
  activeHeroModel: ProductModel;
  onSelectHeroModel: (model: ProductModel) => void;
  onExploreCollection: () => void;
  onDiscoverTech: () => void;
  onQuickInspect: (model: ProductModel) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  models,
  activeHeroModel,
  onSelectHeroModel,
  onExploreCollection,
  onDiscoverTech,
  onQuickInspect
}) => {
  const [pointerOffset, setPointerOffset] = useState<{ x: number; y: number; rot: number }>({
    x: 0,
    y: 0,
    rot: 0
  });
  const rafRef = useRef<number | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setPointerOffset({
        x: Math.max(-9, Math.min(9, relX * 16)),
        y: Math.max(-8, Math.min(8, relY * 14)),
        rot: Math.max(-2.5, Math.min(2.5, relX * 4.5))
      });
    });
  };

  const handlePointerLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setPointerOffset({ x: 0, y: 0, rot: 0 });
  };

  return (
    <section
      id="top"
      aria-label="RL-01 Performance Launch Hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full min-h-[calc(100vh-86px)] bg-[#0B0B0A] overflow-hidden flex items-center border-b border-[#F1F0E9]/10"
    >
      {/* Subtle architectural left-edge blueprint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-24 lg:w-36 bg-blueprint-grid opacity-65 border-r border-[#F1F0E9]/5"
      />

      {/* Main 1440px container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* LEFT 45% COLUMN: Massive Slanted Condensed Typography + Copy + CTAs */}
          <div className="lg:col-span-5 xl:col-span-5 relative z-20 flex flex-col items-start">
            {/* Halftone dot matrix positioned right beside 'THE' like the reference */}
            <div
              aria-hidden="true"
              className="hidden sm:block pointer-events-none absolute right-0 lg:-right-6 top-[32%] w-36 sm:w-44 h-24 bg-halftone-dots opacity-85"
            />

            {/* Massive 3-level stacked slanted headline: BREAK / THE / LIMIT. */}
            <h1
              aria-label="BREAK THE LIMIT."
              className="flex flex-col select-none mb-5 sm:mb-6 pl-1"
            >
              <span className="overflow-hidden py-0.5 pr-4">
                <span className="hero-headline-word animate-mask-word-1 text-[#F1F0E9] text-[clamp(4.6rem,11vw,9.2rem)]">
                  BREAK
                </span>
              </span>
              <span className="overflow-hidden py-0.5 pr-4 -mt-1 sm:-mt-2">
                <span className="hero-headline-word animate-mask-word-2 text-[#375CFF] text-[clamp(4.6rem,11vw,9.2rem)]">
                  THE
                </span>
              </span>
              <span className="overflow-hidden py-0.5 pr-4 -mt-1 sm:-mt-2">
                <span className="hero-headline-word animate-mask-word-3 text-[#D3FF35] text-[clamp(4.6rem,11vw,9.2rem)]">
                  LIMIT.
                </span>
              </span>
            </h1>

            {/* Lime subheading */}
            <p className="font-display font-bold text-[19px] sm:text-[23px] lg:text-[25px] tracking-[0.04em] text-[#D3FF35] uppercase leading-tight mb-3">
              ENGINEERED TO OUTRUN EXPECTATIONS.
            </p>

            {/* Body copy */}
            <p className="text-[#F1F0E9]/85 text-[15px] sm:text-[17px] leading-[1.55] max-w-[430px] mb-7 sm:mb-8 font-normal">
              Precision-built performance footwear for athletes who refuse to stand still.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-7 w-full sm:w-auto">
              <button
                type="button"
                onClick={onExploreCollection}
                className="group relative clip-slant-cta bg-[#F1F0E9] text-[#0B0B0A] px-7 sm:px-8 py-3.5 sm:py-4 font-display italic font-black text-[17px] sm:text-[19px] tracking-[0.05em] uppercase overflow-hidden transition-transform duration-150 active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D3FF35]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#D3FF35] translate-x-[-102%] group-hover:translate-x-0 transition-transform duration-200 ease-out"
                />
                <span className="relative z-10">EXPLORE THE COLLECTION</span>
              </button>

              <button
                type="button"
                onClick={onDiscoverTech}
                className="group inline-flex items-center gap-2.5 font-display font-semibold text-[15px] sm:text-[16px] tracking-[0.08em] text-[#F1F0E9] hover:text-[#D3FF35] uppercase py-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D3FF35]"
              >
                <span>DISCOVER THE TECHNOLOGY</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
              </button>
            </div>
          </div>

          {/* RIGHT 55% COLUMN: Blueprint Coordinate Grid + Outlined RL-01 + Orbital SVG + Floating Shoe + Vertical Spec Rail */}
          <div className="lg:col-span-7 xl:col-span-7 relative min-h-[390px] sm:min-h-[480px] lg:min-h-[590px] flex items-center justify-center">
            {/* Architectural Blueprint Axes, Outlined RL-01 Stencil, Orbital Ellipses, and Velocity Slashes */}
            <svg
              viewBox="0 0 800 620"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 w-full h-full object-contain select-none"
            >
              {/* Outlined blueprint stencil behind the shoe */}
              <g opacity="0.16">
                <text
                  x="75"
                  y="290"
                  fill="none"
                  stroke="#F1F0E9"
                  strokeWidth="1.5"
                  fontFamily="Barlow Condensed, sans-serif"
                  fontWeight="900"
                  fontStyle="italic"
                  fontSize="250"
                  letterSpacing="-4"
                >
                  RL
                </text>
                <text
                  x="415"
                  y="280"
                  fill="#F1F0E9"
                  fillOpacity="0.45"
                  fontFamily="Barlow Condensed, sans-serif"
                  fontWeight="900"
                  fontStyle="italic"
                  fontSize="265"
                  letterSpacing="-6"
                >
                  01
                </text>
              </g>

              {/* Vertical Ruler Axis & Tick Marks */}
              <line x1="395" y1="15" x2="395" y2="605" stroke="#F1F0E9" strokeOpacity="0.18" strokeWidth="1" />
              {Array.from({ length: 28 }).map((_, idx) => (
                <line
                  key={`vt-${idx}`}
                  x1={idx % 5 === 0 ? 383 : 389}
                  y1={30 + idx * 20}
                  x2="395"
                  y2={30 + idx * 20}
                  stroke="#F1F0E9"
                  strokeOpacity={idx % 5 === 0 ? '0.32' : '0.16'}
                  strokeWidth="1"
                />
              ))}

              {/* Horizontal Ruler Axis & Tick Marks */}
              <line x1="25" y1="335" x2="740" y2="335" stroke="#F1F0E9" strokeOpacity="0.18" strokeWidth="1" />
              {Array.from({ length: 34 }).map((_, idx) => (
                <line
                  key={`ht-${idx}`}
                  x1={45 + idx * 20}
                  y1="335"
                  x2={45 + idx * 20}
                  y2={idx % 5 === 0 ? 347 : 341}
                  stroke="#F1F0E9"
                  strokeOpacity={idx % 5 === 0 ? '0.32' : '0.16'}
                  strokeWidth="1"
                />
              ))}

              {/* Left bracket ruler leading to RL-01 / PERFORMANCE SERIES */}
              <polyline
                points="68,335 68,480 120,480"
                fill="none"
                stroke="#F1F0E9"
                strokeOpacity="0.24"
                strokeWidth="1"
              />

              {/* Diagonal Voltage Lime Motion Slashes (behind shoe) */}
              <g className="animate-slash-shoot">
                {/* Upper-left heel velocity spikes */}
                <polygon points="35,112 152,188 144,197 35,112" fill="#F1F0E9" />
                <polygon points="18,136 168,232 154,245 18,136" fill="#D3FF35" />
                <polygon points="72,188 152,248 142,258 72,188" fill="#F1F0E9" />

                {/* Upper-right forefoot velocity spikes */}
                <polygon points="502,265 628,142 612,185 502,265" fill="#F1F0E9" />
                <polygon points="588,208 776,38 665,168 588,208" fill="#D3FF35" />
                <polygon points="668,182 758,104 736,136 668,182" fill="#D3FF35" />

                {/* Lower-left midfoot velocity slash */}
                <polygon points="52,588 308,365 288,415 52,588" fill="#D3FF35" />
                <polygon points="210,432 292,368 306,382 210,432" fill="#D3FF35" />
              </g>

              {/* Orbital Trajectory Ellipses around the shoe */}
              <ellipse
                cx="445"
                cy="395"
                rx="295"
                ry="82"
                transform="rotate(-31 445 395)"
                stroke="#F1F0E9"
                strokeOpacity="0.7"
                strokeWidth="1.35"
                className="animate-orbit-trace"
              />
              <ellipse
                cx="458"
                cy="406"
                rx="285"
                ry="72"
                transform="rotate(-31 458 406)"
                stroke="#D3FF35"
                strokeOpacity="0.78"
                strokeWidth="1.35"
                strokeDasharray="420 180"
                className="animate-orbit-trace"
              />

              {/* Lower-right orbital arc accent */}
              <path
                d="M 555 495 A 115 56 18 0 1 705 555"
                stroke="#D3FF35"
                strokeWidth="1.6"
                fill="none"
                className="animate-orbit-trace"
              />
              <path
                d="M 525 512 A 125 60 18 0 0 698 565"
                stroke="#F1F0E9"
                strokeOpacity="0.45"
                strokeWidth="1"
                fill="none"
              />
            </svg>

            {/* Technical Coordinate Annotations (Design Fiction Telemetry) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-4 left-6 sm:left-12 font-display text-[13px] tracking-[0.08em] text-[#777A7A] uppercase"
            >
              ACCEL // 9.8m/s²
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-4 left-[50%] font-display text-[13px] tracking-[0.08em] text-[#777A7A] uppercase"
            >
              LAT. 45.10
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[28%] right-10 sm:right-14 font-display text-[13px] tracking-[0.08em] text-[#777A7A] uppercase"
            >
              LAT. 45.10
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 left-[62%] hidden sm:block font-display text-[13px] tracking-[0.08em] text-[#777A7A] uppercase"
            >
              LAT. 45.10
            </div>

            {/* Centerpiece Isolated RL-01 Sneaker Image */}
            <div
              style={{
                transform: `translate3d(${pointerOffset.x}px, ${pointerOffset.y}px, 0) rotate(${pointerOffset.rot}deg)`
              }}
              className="relative z-10 w-[92%] sm:w-[84%] lg:w-[88%] max-w-[650px] transition-transform duration-200 ease-out select-none"
            >
              <div className="animate-shoe-enter">
                <img
                  src={activeHeroModel.heroImage}
                  alt={activeHeroModel.altText}
                  width={640}
                  height={500}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.85)] animate-shoe-idle"
                />
              </div>
            </div>

            {/* Bottom-Left Shoe Label Callout matching reference */}
            <div className="absolute bottom-14 sm:bottom-16 left-6 sm:left-14 z-20 flex items-start gap-2.5 bg-[#0B0B0A]/80 backdrop-blur-xs px-2.5 py-1.5">
              <span
                aria-hidden="true"
                className="w-2 h-2 mt-1.5 bg-[#D3FF35] shrink-0"
              />
              <div>
                <div className="font-display font-semibold text-[15px] sm:text-[16px] tracking-[0.06em] text-[#F1F0E9] leading-tight uppercase">
                  {activeHeroModel.code.split(' ')[0]} /
                </div>
                <div className="font-display font-semibold text-[15px] sm:text-[16px] tracking-[0.06em] text-[#F1F0E9] leading-tight uppercase">
                  PERFORMANCE SERIES
                </div>
              </div>
            </div>

            {/* Interactive Finish Switcher + Quick Inspect Trigger */}
            <div
              role="group"
              aria-label="Preview RL-01 Colorway Finish"
              className="absolute bottom-2 left-6 sm:left-14 z-20 flex items-center gap-2"
            >
              {models.map((m) => {
                const isSelected = m.id === activeHeroModel.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onSelectHeroModel(m)}
                    aria-pressed={isSelected}
                    className={`px-2.5 py-1 font-mono-tech text-[11px] uppercase tracking-wider border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'border-[#D3FF35] bg-[#D3FF35]/15 text-[#D3FF35] font-semibold'
                        : 'border-[#F1F0E9]/20 bg-[#0B0B0A]/80 text-[#777A7A] hover:text-[#F1F0E9] hover:border-[#F1F0E9]/45'
                    }`}
                  >
                    {m.name.replace('RL-01 ', '')}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => onQuickInspect(activeHeroModel)}
                className="px-2.5 py-1 font-mono-tech text-[11px] uppercase tracking-wider border border-[#F1F0E9]/20 bg-[#0B0B0A]/80 text-[#F1F0E9]/80 hover:border-[#D3FF35] hover:text-[#D3FF35] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                SPEC SHEET +
              </button>
            </div>

            {/* Far-Right Vertical Technical Specification Rail matching reference */}
            <aside
              aria-label="RL-01 Concept Specifications"
              className="hidden sm:flex flex-col items-end justify-between gap-3 absolute right-0 top-6 bottom-6 z-20"
            >
              <div className="border border-[#F1F0E9]/15 bg-[#0B0B0A]/80 px-1.5 py-3">
                <span className="block font-mono-tech text-[10px] tracking-[0.16em] text-[#777A7A] uppercase [writing-mode:vertical-rl] rotate-180">
                  WEIGHT: {activeHeroModel.weightGrams}G
                </span>
              </div>
              <div className="border border-[#F1F0E9]/15 bg-[#0B0B0A]/80 px-1.5 py-3">
                <span className="block font-mono-tech text-[10px] tracking-[0.16em] text-[#777A7A] uppercase [writing-mode:vertical-rl] rotate-180">
                  DROP: {activeHeroModel.dropMm}MM
                </span>
              </div>
              <div className="flex items-end gap-1.5">
                <div className="border border-[#F1F0E9]/15 bg-[#0B0B0A]/80 px-1.5 py-3">
                  <span className="block font-mono-tech text-[10px] tracking-[0.16em] text-[#777A7A] uppercase [writing-mode:vertical-rl] rotate-180">
                    STACK: 38/32MM
                  </span>
                </div>
                <div className="border border-[#F1F0E9]/15 bg-[#0B0B0A]/80 px-1.5 py-3.5">
                  <span className="block font-mono-tech text-[10px] tracking-[0.16em] text-[#F1F0E9]/70 uppercase [writing-mode:vertical-rl] rotate-180">
                    UPPER: MATRIX MESH
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};
