"use client";

import React from 'react';
import { ChevronLeft, ChevronRight, Layers, Maximize2, Minimize2 } from 'lucide-react';
import {
  ANATOMY_PARTS,
  AnatomyPart,
  getAnatomyPartTransform,
  cycleAnatomyPart
} from '../data/portfolioData';

interface LoopAnatomySectionProps {
  isExploded: boolean;
  explodeFactor: number;
  selectedPartId: AnatomyPart['id'];
  onToggleExplode: () => void;
  onChangeExplodeFactor: (val: number) => void;
  onSelectPart: (partId: AnatomyPart['id']) => void;
}

export const LoopAnatomySection: React.FC<LoopAnatomySectionProps> = ({
  isExploded,
  explodeFactor,
  selectedPartId,
  onToggleExplode,
  onChangeExplodeFactor,
  onSelectPart
}) => {
  const activePart = ANATOMY_PARTS.find((p) => p.id === selectedPartId) || ANATOMY_PARTS[0];

  const coverTransform = getAnatomyPartTransform(ANATOMY_PARTS[0], isExploded, explodeFactor);
  const dialTransform = getAnatomyPartTransform(ANATOMY_PARTS[1], isExploded, explodeFactor);
  const buttonsTransform = getAnatomyPartTransform(ANATOMY_PARTS[3], isExploded, explodeFactor);

  return (
    <section
      id="anatomy"
      aria-labelledby="loop-anatomy-heading"
      data-exploded={isExploded ? 'true' : 'false'}
      className="scroll-mt-20 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-t-2 border-[#191919]"
    >
      {/* Top Heading & Assemble / Explode Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <p className="font-condensed font-bold text-[15px] sm:text-[17px] tracking-[0.05em] uppercase text-[#515151] mb-2">
            CHAPTER 03 · LOOP HARDWARE ANATOMY & SUB-ASSEMBLIES
          </p>
          <h2
            id="loop-anatomy-heading"
            className="font-display uppercase text-[50px] sm:text-[68px] lg:text-[80px] leading-[0.9] text-[#191919]"
          >
            INSIDE THE <span className="text-[#FF735D]">OBJECT.</span>
          </h2>
        </div>

        {/* Assemble / Explode Primary Control Cluster */}
        <div className="flex flex-wrap items-center gap-4 bg-white border-2 border-[#191919] rounded-[20px] p-3">
          <button
            type="button"
            onClick={onToggleExplode}
            aria-pressed={isExploded}
            className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full border-2 border-[#191919] font-condensed font-bold text-[17px] tracking-[0.04em] uppercase transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
              isExploded
                ? 'bg-[#3049F0] text-white'
                : 'bg-[#F7E36B] text-[#191919] hover:bg-[#FF735D] hover:text-white'
            }`}
          >
            {isExploded ? (
              <>
                <Minimize2 className="w-4 h-4" />
                <span>ASSEMBLE VIEW</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4" />
                <span>EXPLODE VIEW</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-3 px-2">
            <label
              htmlFor="explode-factor-slider"
              className="font-mono-tech text-xs font-semibold uppercase text-[#191919] whitespace-nowrap"
            >
              SEPARATION: {Math.round((isExploded ? explodeFactor : 0) * 100)}%
            </label>
            <input
              id="explode-factor-slider"
              type="range"
              min={0}
              max={100}
              value={Math.round((isExploded ? explodeFactor : 0) * 100)}
              onChange={(e) => {
                const v = Number(e.target.value) / 100;
                onChangeExplodeFactor(v);
              }}
              className="w-28 sm:w-36 accent-[#3049F0] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Main 12-Column Interactive Anatomy Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
        {/* Left 7 Columns: 2.5D Layered Hardware Explosion Stage */}
        <div className="lg:col-span-7 bg-[#D4C7FB] border-2 border-[#191919] rounded-[24px] p-5 sm:p-7 relative min-h-[460px] sm:min-h-[560px] flex flex-col justify-between overflow-hidden">
          {/* Base Layer: Full-bleed Coral Shell & Internal PCB */}
          <img
            src="/templates/nicopark/loop-hero.webp"
            alt="LOOP base coral polycarbonate enclosure and internal matte-black DSP board"
            width={808}
            height={1088}
            referrerPolicy="no-referrer"
            className={`pointer-events-none absolute inset-0 w-full h-full object-cover select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              selectedPartId === 'pcb' ? 'scale-[1.03]' : 'scale-100'
            }`}
          />

          {/* Stage Top Bar */}
          <div className="relative flex items-center justify-between gap-2 z-20">
            <span className="font-mono-tech text-xs font-semibold uppercase text-[#191919]">
              CAD VIEWPORT · {isExploded ? 'EXPLODED SUB-ASSEMBLY STATE' : 'ASSEMBLED PRODUCTION STATE'}
            </span>
            <span className="font-mono-tech text-xs font-semibold text-[#3049F0]">
              ACTIVE: {activePart.code}
            </span>
          </div>

          {/* 2.5D Multi-Layer LOOP Render Stage */}
          <div className="relative my-auto w-full h-[360px] sm:h-[430px] flex items-center justify-center">

            {/* Explodable Layer 1: Circular Frosted Acrylic Platter */}
            <img
              src="/templates/nicopark/loop-cover.png"
              alt="Exploded layer: Frosted optical acrylic front platter"
              width={800}
              height={960}
              referrerPolicy="no-referrer"
              style={{
                transform: `translate3d(${coverTransform.x}px, ${coverTransform.y}px, 0) rotate(${coverTransform.rotate}deg) scale(${
                  selectedPartId === 'cover' ? coverTransform.scale * 1.05 : coverTransform.scale
                })`,
                opacity: isExploded ? 0.98 : 0
              }}
              className="pointer-events-none absolute inset-0 m-auto w-[78%] h-[78%] object-contain transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-xl"
            />

            {/* Explodable Layer 2: CNC Knurled Lilac Rotary Dial */}
            <img
              src="/templates/nicopark/loop-dial.png"
              alt="Exploded layer: CNC knurled lilac aluminum rotary encoder"
              width={800}
              height={960}
              referrerPolicy="no-referrer"
              style={{
                transform: `translate3d(${dialTransform.x}px, ${dialTransform.y}px, 0) rotate(${dialTransform.rotate}deg) scale(${
                  selectedPartId === 'dial' ? dialTransform.scale * 1.06 : dialTransform.scale
                })`,
                opacity: isExploded ? 0.98 : 0
              }}
              className="pointer-events-none absolute inset-0 m-auto w-[78%] h-[78%] object-contain transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-lg"
            />

            {/* Explodable Layer 3: Side Sub-Assembly & Bottom Port Module */}
            <img
              src="/templates/nicopark/loop-buttons.png"
              alt="Exploded layer: Modular side sub-assembly and USB-C I/O carrier"
              width={800}
              height={960}
              referrerPolicy="no-referrer"
              style={{
                transform: `translate3d(${buttonsTransform.x}px, ${buttonsTransform.y}px, 0) rotate(${buttonsTransform.rotate}deg) scale(${
                  selectedPartId === 'buttons' || selectedPartId === 'usb'
                    ? buttonsTransform.scale * 1.05
                    : buttonsTransform.scale
                })`,
                opacity: isExploded ? 0.98 : 0
              }}
              className="pointer-events-none absolute inset-0 m-auto w-[78%] h-[78%] object-contain transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-lg"
            />

            {/* Dynamic SVG Guide Lines & Callout Anchors */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 w-full h-full z-20"
              aria-hidden="true"
            >
              {ANATOMY_PARTS.map((part) => {
                const isSelected = part.id === selectedPartId;
                const offsetX = isExploded ? (part.explodeDx / 8) * explodeFactor : 0;
                const offsetY = isExploded ? (part.explodeDy / 8) * explodeFactor : 0;
                const ax = part.anchorX + offsetX;
                const ay = part.anchorY + offsetY;
                return (
                  <g key={part.id}>
                    <line
                      x1={ax}
                      y1={ay}
                      x2={part.labelX}
                      y2={part.labelY}
                      stroke={isSelected ? '#3049F0' : '#191919'}
                      strokeWidth={isSelected ? '0.65' : '0.35'}
                      strokeDasharray={isExploded ? '1.5 1' : 'none'}
                    />
                    <circle
                      cx={ax}
                      cy={ay}
                      r={isSelected ? '1.6' : '1.0'}
                      fill={isSelected ? '#FF735D' : '#191919'}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Interactive Callout Hotspots on the Stage */}
            {ANATOMY_PARTS.map((part) => {
              const isSelected = part.id === selectedPartId;
              return (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => onSelectPart(part.id)}
                  style={{
                    left: `${part.labelX}%`,
                    top: `${part.labelY}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className={`absolute z-30 px-2.5 py-1 rounded-md border-[1.5px] border-[#191919] font-condensed font-bold text-[11px] sm:text-[12px] tracking-[0.04em] uppercase whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#3049F0] text-white scale-105 shadow-sm'
                      : 'bg-[#F8F7F2]/95 text-[#191919] hover:bg-[#F7E36B]'
                  }`}
                >
                  {part.shortLabel}
                </button>
              );
            })}
          </div>

          {/* Bottom Stage Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#191919]/20 z-20 text-xs font-mono-tech text-[#191919]">
            <span>TOLERANCE: {activePart.tolerance}</span>
            <span>CLICK ANY CALLOUT OR USE PART SELECTOR →</span>
          </div>
        </div>

        {/* Right 5 Columns: Sub-Assembly Selector & Engineering Specification Card */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-5">
          {/* Part Selector Tabs */}
          <div className="bg-white border-2 border-[#191919] rounded-[24px] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="inline-flex items-center gap-2 font-condensed font-bold text-sm uppercase tracking-wider text-[#191919]">
                <Layers className="w-4 h-4 text-[#3049F0]" />
                <span>SELECT SUB-ASSEMBLY (01 — 05)</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onSelectPart(cycleAnatomyPart(selectedPartId, -1).id)}
                  aria-label="Previous hardware sub-assembly"
                  className="w-9 h-9 rounded-full border-2 border-[#191919] bg-[#F8F7F2] hover:bg-[#F7E36B] flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onSelectPart(cycleAnatomyPart(selectedPartId, 1).id)}
                  aria-label="Next hardware sub-assembly"
                  className="w-9 h-9 rounded-full border-2 border-[#191919] bg-[#F8F7F2] hover:bg-[#F7E36B] flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {ANATOMY_PARTS.map((part) => {
                const isSelected = part.id === selectedPartId;
                return (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => onSelectPart(part.id)}
                    className={`w-full px-4 py-3 rounded-xl border-2 border-[#191919] text-left flex items-center justify-between gap-3 transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-[#F7E36B] text-[#191919] translate-x-1'
                        : 'bg-[#F8F7F2] text-[#191919] hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-mono-tech text-[11px] text-[#515151]">{part.code}</div>
                      <div className="font-bold text-sm sm:text-[15px]">{part.name}</div>
                    </div>
                    <span className="font-condensed font-bold text-xs uppercase text-[#3049F0] shrink-0">
                      {part.shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Sub-Assembly Deep Detail Card */}
          <div className="flex-1 bg-[#F8F7F2] border-2 border-[#191919] rounded-[24px] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono-tech text-xs font-semibold text-[#3049F0]">
                  {activePart.code}
                </span>
                <span className="font-mono-tech text-xs text-[#515151]">{activePart.tolerance}</span>
              </div>

              <h3 className="font-display uppercase text-[32px] sm:text-[38px] leading-[0.95] text-[#191919] mb-3">
                {activePart.name}
              </h3>

              <p className="text-[15px] leading-[1.6] text-[#191919] mb-5">
                {activePart.description}
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-[#191919]/15 text-xs">
              <div>
                <span className="font-mono-tech uppercase text-[#515151] block">MATERIAL SPEC</span>
                <span className="font-semibold text-sm text-[#191919]">{activePart.material}</span>
              </div>
              <div>
                <span className="font-mono-tech uppercase text-[#515151] block">SURFACE FINISH</span>
                <span className="font-semibold text-sm text-[#191919]">{activePart.finish}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
