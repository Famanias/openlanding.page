"use client";

import { useSyncExternalStore } from "react";
import { Logo } from "../brand/Logo";
import { spectralStore } from "../spectrum/spectral-store";
import { SPECTRAL_PRESETS } from "../spectrum/presets";

export function Nav() {
  const storeState = useSyncExternalStore(
    spectralStore.subscribe,
    spectralStore.getSnapshot,
    spectralStore.getSnapshot
  );

  const activePreset = SPECTRAL_PRESETS[storeState.activePresetId];

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-8 max-w-[1520px] mx-auto pointer-events-none">
      <nav
        className="ir-glass-panel rounded px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 pointer-events-auto"
        aria-label="Primary Navigation"
      >
        {/* Brand Lockup */}
        <a href="#hero" className="flex items-center gap-2 group text-decoration-none shrink-0">
          <Logo size={28} />
        </a>

        {/* Center: Coordinates & Live Wavelength Ticker */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-[#8D93A8]">
          <span>47.3769° N · 8.5417° E</span>
          <span className="text-[#8D93A8]/40">/</span>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0A0B10]/80 border border-[#8D93A8]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="text-[#00F0FF] font-semibold">{activePreset.name}</span>
            <span className="text-[#8D93A8]">({activePreset.wavelengthNm}nm)</span>
          </div>
        </div>

        {/* Navigation Anchors & CTA */}
        <div className="flex items-center gap-3 sm:gap-6 text-xs font-mono shrink-0">
          <a
            href="#chambers"
            className="text-[#8D93A8] hover:text-[#F5F3EF] transition-colors hidden sm:inline"
          >
            01 CHAMBERS
          </a>
          <a
            href="#dissection"
            className="text-[#8D93A8] hover:text-[#F5F3EF] transition-colors hidden md:inline"
          >
            02 OPTICS
          </a>
          <a
            href="#synthesizer"
            className="text-[#8D93A8] hover:text-[#F5F3EF] transition-colors hidden sm:inline"
          >
            03 SYNTHESIZER
          </a>
          <a
            href="#installations"
            className="text-[#8D93A8] hover:text-[#F5F3EF] transition-colors hidden xl:inline"
          >
            04 EDITIONS
          </a>
          <a
            href="#commission"
            className="ir-btn-primary rounded py-1.5 px-4 text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 leading-none transition-transform active:scale-95"
          >
            <span>Commission</span>
            <span aria-hidden="true" className="text-sm">→</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
