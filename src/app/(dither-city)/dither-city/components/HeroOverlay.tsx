'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Eye, EyeOff } from 'lucide-react';

interface HeroOverlayProps {
  visible: boolean;
  onToggleVisible: () => void;
  onPrimaryAction: () => void;
}

export default function HeroOverlay({
  visible,
  onToggleVisible,
  onPrimaryAction,
}: HeroOverlayProps) {
  return (
    <>
      {/* Minimal Top-Left Navigation Label & Scenery Inspect Toggle */}
      <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between gap-4 px-5 py-4 sm:px-10 sm:py-6 bg-gradient-to-b from-[#0A0B09]/85 via-[#0A0B09]/35 to-transparent pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2.5 text-[11px] sm:text-xs tracking-[0.2em] text-[#D3D0BA] uppercase font-mono whitespace-nowrap shrink-0">
          <span>OpenLanding</span>
          <span aria-hidden="true" className="text-[#50524A]">
            /
          </span>
          <span className="text-[#EEEBD8]">Sector 09</span>
        </div>

        <button
          type="button"
          onClick={onToggleVisible}
          aria-pressed={!visible}
          aria-label={visible ? 'Hide hero overlay to inspect scenery' : 'Show hero overlay'}
          className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-mono tracking-wider text-[#EEEBD8] bg-[#0A0B09]/90 border border-[#D3D0BA]/30 hover:border-[#A8F23A] hover:text-[#A8F23A] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8F23A]"
        >
          {visible ? (
            <>
              <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Hide Overlay</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Show Overlay</span>
            </>
          )}
        </button>
      </header>

      {/* Left 35-40% Text-Safe Hero Preview */}
      <AnimatePresence>
        {visible && (
          <motion.main
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 left-0 z-10 flex flex-col justify-center w-full max-w-[38rem] px-6 sm:px-10 md:px-14 pointer-events-none"
          >
            {/* Subtle dark scrim strictly on narrow viewports so mobile text stays high-contrast */}
            <div className="pointer-events-auto max-w-md sm:max-w-lg rounded-none bg-[#0A0B09]/55 sm:bg-transparent p-5 sm:p-0 border border-[#D3D0BA]/15 sm:border-0">
              <p className="font-mono text-xs tracking-[0.2em] text-[#D3D0BA]/80 mb-4">
                Procedural WebGL Megastructure Canvas
              </p>

              <h1
                className="font-display font-black tracking-tight text-[#EEEBD8] leading-[0.94] text-[clamp(2.75rem,6.2vw,5.25rem)]"
                style={{ fontFamily: 'var(--font-doto), monospace' }}
              >
                DITHER
                <span className="text-[#A8F23A]">{'//'}</span>
                CITY
              </h1>

              <p className="mt-5 font-mono text-sm sm:text-[15px] leading-relaxed text-[#D3D0BA] max-w-[38ch]">
                Monolithic brutalist towers, orbital ring horizons, and real-time Bayer
                screen-tone shading built for atmospheric web surfaces.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onPrimaryAction}
                  className="inline-flex items-center gap-2.5 px-5 py-3 text-xs sm:text-sm font-mono font-semibold tracking-wider text-[#0A0B09] bg-[#A8F23A] hover:bg-[#EEEBD8] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EEEBD8]"
                >
                  <span>Inspect Shader Controls</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
