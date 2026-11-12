'use client';

import React from 'react';
import { SlidersHorizontal, Copy, Check, Compass, RotateCcw } from 'lucide-react';
import type {
  BackgroundEffect,
  EffectControls,
  Palette,
} from '../engine/effectTypes';

export interface HeroOverlayProps {
  activeEffect: BackgroundEffect;
  activePalette: Palette;
  controls: EffectControls;
  hasInteracted: boolean;
  copiedSnippet: boolean;
  tuneOpen: boolean;
  onExploreMaterials: () => void;
  onCopyBackground: () => void;
  onToggleTune: () => void;
  onSelectPalette: (index: number) => void;
  onResetSurface: () => void;
}

export function HeroOverlay({
  activeEffect,
  activePalette,
  controls,
  hasInteracted,
  copiedSnippet,
  tuneOpen,
  onExploreMaterials,
  onCopyBackground,
  onToggleTune,
  onSelectPalette,
  onResetSurface,
}: HeroOverlayProps) {
  return (
    <div className="relative z-10 flex-1 flex flex-col justify-between px-5 sm:px-8 lg:px-12 pt-5 sm:pt-8 pb-4 pointer-events-none">
      {/* Upper-left / left third editorial focal anchor; right 55-65% stays an open reactive canvas */}
      <div className="max-w-xl lg:max-w-2xl">
        {/* Eyebrow metadata — clean unboxed text with typographic separators */}
        <div
          className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-tech-mono tracking-[0.16em] text-white/75 animate-mask-right"
          style={{ animationDelay: '0.1s' }}
        >
          <span>AN INTERACTIVE MATERIAL STUDY</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#ff9b7a]" data-testid="active-surface-badge">
            {activeEffect.indexNumber} {activeEffect.label}
          </span>
          <span aria-hidden="true">·</span>
          <span>PALETTE: {activePalette.name}</span>
        </div>

        {/* Architectural horizontal rule sweep */}
        <div className="mt-3 mb-4 h-px w-full max-w-md bg-white/20 animate-frame-sweep" />

        {/* Editorial Headline */}
        <div className="overflow-hidden">
          <h1
            className="font-display-face text-[clamp(2.35rem,5.2vw,4.35rem)] font-bold leading-[0.98] tracking-[-0.03em] text-[#f8f6f0] animate-mask-up"
            style={{ textWrap: 'balance', animationDelay: '0.2s' }}
          >
            THE BACKGROUND IS ALIVE.
          </h1>
        </div>

        {/* Dynamic Material Accent Sub-Headline in Editorial Serif Italic */}
        <div className="mt-2 overflow-hidden">
          <p
            key={activeEffect.id}
            className="font-editorial-serif italic text-2xl sm:text-3xl lg:text-4xl font-medium tracking-wide text-[#ffd2be] animate-mask-right"
            data-testid="active-headline-accent"
          >
            {activeEffect.headlineAccent}
          </p>
        </div>

        {/* Supporting Editorial Copy */}
        <p
          className="mt-3.5 max-w-lg text-sm sm:text-base leading-relaxed text-white/85 animate-mask-up"
          style={{ animationDelay: '0.35s' }}
        >
          Eight experimental surfaces. Move through color, light, glass and motion.{' '}
          <span className="text-white/65">{activeEffect.shortDescription}</span>
        </p>

        {/* Contextual Real Interaction Hint */}
        <div
          key={`hint-${activeEffect.id}`}
          className="mt-3 text-[11px] sm:text-xs font-tech-mono tracking-[0.1em] text-white/70 animate-mask-right"
          data-testid="active-interaction-hint"
        >
          {activeEffect.helpText}
        </div>

        {/* Action Controls Row */}
        <div
          className="mt-5 flex flex-wrap items-center gap-3 pointer-events-auto animate-mask-up"
          style={{ animationDelay: '0.45s' }}
          data-ui-interactive="true"
        >
          <button
            type="button"
            onClick={onExploreMaterials}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-[#08090d] bg-[#f4f1ea] hover:bg-white rounded-md transition-transform active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Compass className="h-4 w-4 shrink-0" />
            <span>EXPLORE MATERIALS</span>
          </button>

          <button
            type="button"
            onClick={onCopyBackground}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#12151f]/90 hover:bg-[#1a1f2e] border border-white/20 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {copiedSnippet ? (
              <>
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-300">COPIED {activeEffect.label} SNIPPET</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-white/75 shrink-0" />
                <span>COPY THIS BACKGROUND</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onToggleTune}
            aria-expanded={tuneOpen}
            className={`inline-flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              tuneOpen
                ? 'bg-[#ff6b4a] text-[#08090d] border-[#ff6b4a] font-semibold'
                : 'bg-[#12151f]/85 text-white/85 border-white/15 hover:border-white/35 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4 shrink-0" />
            <span>TUNE</span>
          </button>

          <button
            type="button"
            onClick={onResetSurface}
            title="Reset active material simulation and controls"
            aria-label="Reset Surface"
            className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium text-white/75 hover:text-white bg-[#12151f]/80 border border-white/15 hover:border-white/30 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">RESET</span>
          </button>
        </div>

        {/* Quick Palette Selector Strip for Active Surface */}
        <div
          className="mt-4 flex flex-wrap items-center gap-2 pointer-events-auto"
          data-ui-interactive="true"
        >
          <span className="text-[11px] font-tech-mono text-white/55 mr-1">PALETTE</span>
          {activeEffect.palettes.map((pal, idx) => {
            const isSelected = controls.paletteIndex % activeEffect.palettes.length === idx;
            return (
              <button
                key={pal.id}
                type="button"
                onClick={() => onSelectPalette(idx)}
                aria-pressed={isSelected}
                className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded text-xs font-tech-mono transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                  isSelected
                    ? 'bg-white/15 text-white border-white/45'
                    : 'bg-[#0e1017]/80 text-white/65 border-white/10 hover:border-white/25 hover:text-white/90'
                }`}
              >
                <span className="flex items-center -space-x-1" aria-hidden="true">
                  {pal.swatches.slice(0, 3).map((hex, sIdx) => (
                    <span
                      key={sIdx}
                      className="h-2.5 w-2.5 rounded-full border border-black/40"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </span>
                <span>{pal.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Instructional Cursor Cue — disappears with a directional line-clipped wipe after first real interaction */}
      <div className="mt-4 flex items-center justify-between">
        <div
          className={`overflow-hidden transition-all duration-500 ease-out ${
            hasInteracted
              ? 'max-w-0 opacity-0 -translate-x-4'
              : 'max-w-xs opacity-100 translate-x-0'
          }`}
          aria-live="polite"
        >
          <div className="inline-flex items-center gap-2.5 text-[11px] font-tech-mono tracking-[0.14em] text-white/75 whitespace-nowrap">
            <span className="h-px w-6 bg-[#ff6b4a]" />
            <span className="hidden sm:inline">TRY MOVING OR DRAGGING YOUR CURSOR</span>
            <span className="sm:hidden">DRAG THE SURFACE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
