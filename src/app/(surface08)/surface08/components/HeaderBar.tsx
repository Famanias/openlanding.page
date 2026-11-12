'use client';

import React from 'react';
import Image from 'next/image';
import type { BackgroundEffect, TelemetryStats } from '../engine/effectTypes';

export interface HeaderBarProps {
  activeEffect: BackgroundEffect;
  telemetry: TelemetryStats;
  inspectOpen: boolean;
  tuneOpen: boolean;
  onToggleInspect: () => void;
  onToggleTune: () => void;
  onOpenExport: () => void;
  introReady: boolean;
}

export function HeaderBar({
  activeEffect,
  telemetry,
  inspectOpen,
  tuneOpen,
  onToggleInspect,
  onToggleTune,
  onOpenExport,
  introReady,
}: HeaderBarProps) {
  return (
    <header
      className={`relative z-20 flex items-center justify-between gap-4 sm:gap-8 px-5 sm:px-8 py-4 border-b border-white/10 bg-[#08090d]/70 transition-transform duration-500 ${
        introReady ? 'translate-y-0' : '-translate-y-2'
      }`}
      data-ui-interactive="true"
    >
      {/* Zone 1: Single brand lockup */}
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
        }}
        className="flex items-center gap-2.5 text-sm sm:text-base font-bold tracking-wider text-[#f4f1ea] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6b4a]"
      >
        <Image
          src="/templates/surface08/surface08-mark.svg"
          alt="SURFACE/08 Optical Prism Mark"
          width={20}
          height={20}
          className="h-5 w-5 shrink-0"
          referrerPolicy="no-referrer"
        />
        <span className="font-display-face tracking-[0.14em]">SURFACE/08</span>
      </a>

      {/* Zone 2: Clean single-line navigation & telemetry links */}
      <nav
        aria-label="Laboratory Navigation"
        className="hidden md:flex items-center gap-6 text-xs font-medium text-white/70"
      >
        <span className="font-tech-mono text-white/55 whitespace-nowrap shrink-0">
          INTERACTIVE FIELD NOTES · {activeEffect.indexNumber} {activeEffect.label}
        </span>
        <span aria-hidden="true" className="text-white/25">
          /
        </span>
        <span
          className="font-tech-mono text-white/80 whitespace-nowrap shrink-0"
          data-testid="live-fps-readout"
        >
          {telemetry.fps} FPS · {telemetry.effectiveQuality.toUpperCase()}
        </span>
        <button
          type="button"
          onClick={onToggleInspect}
          aria-pressed={inspectOpen}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer underline-offset-4 ${
            inspectOpen ? 'text-[#ff8a65] underline' : 'text-white/75'
          }`}
        >
          Inspect Telemetry
        </button>
        <button
          type="button"
          onClick={onToggleTune}
          aria-pressed={tuneOpen}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer underline-offset-4 ${
            tuneOpen ? 'text-[#ff8a65] underline' : 'text-white/75'
          }`}
        >
          Tune Parameters
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onOpenExport}
          className="px-3.5 py-2 text-xs font-medium text-[#08090d] bg-[#f4f1ea] hover:bg-white rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Export Source
        </button>
      </div>
    </header>
  );
}
