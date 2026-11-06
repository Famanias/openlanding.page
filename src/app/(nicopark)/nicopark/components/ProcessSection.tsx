"use client";

import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { PROCESS_STEPS, ProcessStep } from '../data/portfolioData';

export const ProcessSection: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<ProcessStep['id']>('notice');
  const activeStep = PROCESS_STEPS.find((s) => s.id === activeStepId) || PROCESS_STEPS[0];

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="scroll-mt-20 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-t-2 border-[#191919]"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <p className="font-condensed font-bold text-[15px] sm:text-[17px] tracking-[0.05em] uppercase text-[#515151] mb-2">
            CHAPTER 05 · STUDIO METHODOLOGY (01 — 04)
          </p>
          <h2
            id="process-heading"
            className="font-display uppercase text-[48px] sm:text-[66px] lg:text-[78px] leading-[0.9] text-[#191919]"
          >
            FROM WEIRD IDEA TO <span className="text-[#3049F0]">USEFUL THING.</span>
          </h2>
        </div>

        <p className="text-base sm:text-lg text-[#515151] max-w-md font-medium">
          A four-stage industrial and digital loop where physical ergonomics and browser-native code are prototyped side by side.
        </p>
      </div>

      {/* Zig-Zag Modular System Diagram with Connected SVG Vectors */}
      <div className="relative mb-10">
        {/* Desktop SVG Connector Rail */}
        <svg
          viewBox="0 0 1200 160"
          className="hidden lg:block w-full h-16 mb-2 overflow-visible"
          aria-hidden="true"
        >
          <path
            d="M 150 80 L 450 40 L 750 110 L 1050 60"
            fill="none"
            stroke="#191919"
            strokeWidth="2.5"
            strokeDasharray="8 6"
          />
          {PROCESS_STEPS.map((step, i) => {
            const cx = 150 + i * 300;
            const cy = i === 0 ? 80 : i === 1 ? 40 : i === 2 ? 110 : 60;
            const isSelected = step.id === activeStepId;
            return (
              <g key={step.id}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 16 : 10}
                  fill={isSelected ? '#3049F0' : step.color}
                  stroke="#191919"
                  strokeWidth="2.5"
                />
                <text
                  x={cx}
                  y={cy - 24}
                  textAnchor="middle"
                  className="font-mono-tech text-[11px] font-bold fill-[#191919]"
                >
                  PHASE {step.index} · {step.phase}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Editorial Zig-Zag Step Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((step, idx) => {
            const isSelected = step.id === activeStepId;
            const zigZagOffset = idx % 2 === 1 ? 'lg:translate-y-5' : 'lg:translate-y-0';
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStepId(step.id)}
                aria-pressed={isSelected}
                style={{
                  backgroundColor: isSelected ? step.color : '#FFFFFF'
                }}
                className={`text-left border-2 border-[#191919] rounded-[24px] p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer ${zigZagOffset} ${
                  isSelected ? 'ring-3 ring-[#3049F0] -translate-y-1' : 'hover:bg-[#F8F7F2]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`font-display text-[40px] leading-none ${
                        isSelected && step.id === 'refine' ? 'text-white' : 'text-[#191919]'
                      }`}
                    >
                      {step.index}
                    </span>
                    <span
                      className={`font-condensed font-bold text-sm uppercase tracking-wider px-2.5 py-0.5 rounded border border-[#191919] ${
                        isSelected ? 'bg-[#191919] text-white' : 'bg-[#F8F7F2] text-[#191919]'
                      }`}
                    >
                      {step.phase}
                    </span>
                  </div>

                  <h3
                    className={`font-condensed font-extrabold text-[24px] uppercase leading-tight mb-2 ${
                      isSelected && step.id === 'refine' ? 'text-white' : 'text-[#191919]'
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`text-xs leading-relaxed ${
                      isSelected && step.id === 'refine' ? 'text-white/90' : 'text-[#515151]'
                    }`}
                  >
                    {step.subtitle}
                  </p>
                </div>

                <div
                  className={`mt-5 pt-3 border-t border-[#191919]/20 flex items-center justify-between font-condensed font-bold text-xs uppercase ${
                    isSelected && step.id === 'refine' ? 'text-[#F7E36B]' : 'text-[#3049F0]'
                  }`}
                >
                  <span>{isSelected ? 'INSPECTING STAGE' : 'INSPECT STAGE'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded Phase Detail & Sketch Workbench */}
      <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch bg-white border-2 border-[#191919] rounded-[24px] p-6 sm:p-8">
        {/* Left 6 Cols: Orthographic Sketch & CAD Annotation */}
        <div className="lg:col-span-6 bg-[#F8F7F2] border-2 border-[#191919] rounded-[20px] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between font-mono-tech text-xs font-bold text-[#191919] mb-3">
            <span>{activeStep.annotation}</span>
            <span className="text-[#3049F0]">STAGE {activeStep.index} / 04</span>
          </div>

          <div className="my-auto flex items-center justify-center py-2">
            <img
              src={activeStep.sketchAsset}
              alt={`${activeStep.phase} — ${activeStep.title} schematic drawing`}
              width={600}
              height={420}
              referrerPolicy="no-referrer"
              className="max-h-[260px] w-auto object-contain rounded-xl"
            />
          </div>

          <div className="pt-3 border-t border-[#191919]/15 flex items-center justify-between text-xs font-mono-tech text-[#515151]">
            <span>SCALE: 1:1 MILLIMETER GRID</span>
            <span>NICO PARK STUDIO ARCHIVE</span>
          </div>
        </div>

        {/* Right 6 Cols: Phase Narrative & Artifacts */}
        <div className="lg:col-span-6 flex flex-col justify-between py-2">
          <div>
            <div className="inline-flex items-center gap-2 font-condensed font-bold text-sm uppercase tracking-wider text-[#3049F0] mb-2">
              <span>PHASE {activeStep.index}</span>
              <span>·</span>
              <span>{activeStep.phase}</span>
            </div>

            <h3 className="font-display uppercase text-[36px] sm:text-[46px] leading-[0.95] text-[#191919] mb-4">
              {activeStep.title}
            </h3>

            <p className="text-base sm:text-[17px] leading-[1.65] text-[#191919] mb-6">
              {activeStep.description}
            </p>

            <div className="bg-[#F8F7F2] border-2 border-[#191919] rounded-2xl p-5">
              <div className="font-condensed font-bold text-sm uppercase tracking-wider text-[#191919] mb-3">
                PHYSICAL &amp; DIGITAL ARTIFACTS PRODUCED IN THIS PHASE
              </div>
              <ul className="space-y-2 text-sm font-medium text-[#191919]">
                {activeStep.artifacts.map((art) => (
                  <li key={art} className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#F7E36B] border border-[#191919] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#191919]" />
                    </span>
                    <span>{art}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step Quick Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6 mt-6 border-t border-[#191919]/15">
            <span className="font-mono-tech text-xs text-[#515151]">
              CLICK ANY PHASE BLOCK ABOVE OR STEP THROUGH:
            </span>
            <div className="flex items-center gap-2">
              {PROCESS_STEPS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveStepId(s.id)}
                  className={`px-3.5 py-1.5 rounded-full border-2 border-[#191919] font-condensed font-bold text-xs uppercase cursor-pointer ${
                    s.id === activeStepId
                      ? 'bg-[#191919] text-white'
                      : 'bg-white text-[#191919] hover:bg-[#F7E36B]'
                  }`}
                >
                  {s.index} {s.phase}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
