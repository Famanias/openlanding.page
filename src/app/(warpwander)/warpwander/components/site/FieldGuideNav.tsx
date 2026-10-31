'use client';
import React from 'react';
import { ACTS, ActDefinition } from '../../lib/world/worldMap';
import { PixelCompassIcon } from '../sprites/PixelArtSprites';

interface FieldGuideNavProps {
  activeAct: ActDefinition;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenTrailMap: () => void;
  onJumpToSection: (actId: string) => void;
  discoveredArtifactsCount: number;
  collectedShardsCount: number;
}

/**
 * Compact Field-Guide Header and Compass-Trail Progress Navigator.
 * - Strictly adheres to the 3-zone Top Bar Contract in <header>.
 * - No rounded floating glass pill navbar.
 * - Provides accessible polite live region for active act announcements.
 */
export const FieldGuideNav: React.FC<FieldGuideNavProps> = ({
  activeAct,
  soundEnabled,
  onToggleSound,
  onOpenTrailMap,
  onJumpToSection,
  discoveredArtifactsCount,
  collectedShardsCount,
}) => {
  return (
    <>
      {/* Top Bar Contract: 3 zones separated by gap-8, solid storybook field-guide bar */}
      <header className="sticky top-0 z-40 w-full bg-[#23244F] border-b-2 border-[#FFD06A] px-4 sm:px-8 py-3 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#act-0"
          onClick={(e) => {
            e.preventDefault();
            onJumpToSection('act-0');
          }}
          className="ww-font-pixel font-pixel text-lg sm:text-xl font-bold tracking-wider text-[#FFF1D3] hover:text-[#FFD06A] transition-colors whitespace-nowrap shrink-0"
        >
          WARP &amp; WANDER
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Chapter Trail Navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#FFF1D3]/90"
        >
          <a
            href="#act-1"
            onClick={(e) => {
              e.preventDefault();
              onJumpToSection('act-1');
            }}
            className={`hover:text-[#FFD06A] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 ${
              activeAct.id === 'act-1' ? 'text-[#FFD06A] underline font-semibold' : ''
            }`}
          >
            01. Cartridge Forest
          </a>
          <a
            href="#act-2"
            onClick={(e) => {
              e.preventDefault();
              onJumpToSection('act-2');
            }}
            className={`hover:text-[#FFD06A] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 ${
              activeAct.id === 'act-2' ? 'text-[#FFD06A] underline font-semibold' : ''
            }`}
          >
            02. Crystal Lake
          </a>
          <a
            href="#act-3"
            onClick={(e) => {
              e.preventDefault();
              onJumpToSection('act-3');
            }}
            className={`hover:text-[#FFD06A] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 ${
              activeAct.id === 'act-3' ? 'text-[#FFD06A] underline font-semibold' : ''
            }`}
          >
            03. Clockwork Ridge
          </a>
          <a
            href="#act-4"
            onClick={(e) => {
              e.preventDefault();
              onJumpToSection('act-4');
            }}
            className={`hover:text-[#FFD06A] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 ${
              activeAct.id === 'act-4' ? 'text-[#FFD06A] underline font-semibold' : ''
            }`}
          >
            04. Cloud City
          </a>
          <a
            href="#act-5"
            onClick={(e) => {
              e.preventDefault();
              onJumpToSection('act-5');
            }}
            className={`hover:text-[#FFD06A] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 ${
              activeAct.id === 'act-5' ? 'text-[#FFD06A] underline font-semibold' : ''
            }`}
          >
            05. The Last Gate
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <a
            href="#act-5"
            onClick={(e) => {
              e.preventDefault();
              onJumpToSection('act-5');
            }}
            className="ww-btn-tactile btn-tactile px-4 py-2 bg-[#FFD06A] text-[#23244F] ww-font-pixel font-pixel text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap shrink-0 cursor-pointer"
          >
            MEET ANALOGUE POCKET
          </a>
        </div>
      </header>

      {/* Secondary Field-Guide Compass Strip (Anchored on desktop right edge / compact bar) */}
      <aside
        aria-label="Compass Trail Progress & Field Controls"
        className="fixed bottom-4 right-4 z-30 flex items-center gap-2 bg-[#23244F]/95 border-2 border-[#FFD06A] px-3 py-2 shadow-[0_6px_0_0_#151633]"
      >
        {/* Polite screen-reader announcement of current chapter */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Current milestone: {activeAct.code} — {activeAct.shortTitle}
        </div>

        <PixelCompassIcon size={20} />

        {/* 6 Act Compass Trail Step Markers */}
        <div className="hidden sm:flex items-center gap-1.5" role="group" aria-label="Jump to Act">
          {ACTS.map((act) => {
            const isCurrent = act.id === activeAct.id;
            return (
              <button
                key={act.id}
                type="button"
                onClick={() => onJumpToSection(act.id)}
                title={`${act.code}: ${act.shortTitle}`}
                aria-label={`Jump to ${act.code}: ${act.shortTitle}`}
                aria-current={isCurrent ? 'step' : undefined}
                className={`w-7 h-7 ww-font-hud font-hud text-xs font-bold flex items-center justify-center transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isCurrent
                    ? 'bg-[#FFD06A] text-[#23244F] border border-[#23244F]'
                    : 'bg-[#23244F] text-[#FFF1D3]/80 border border-[#604A79] hover:border-[#FFD06A] hover:text-[#FFF1D3]'
                }`}
              >
                0{act.actNumber}
              </button>
            );
          })}
        </div>

        <span className="hidden sm:inline text-[#604A79]" aria-hidden="true">
          |
        </span>

        {/* Trail Map Field Log Button */}
        <button
          type="button"
          onClick={onOpenTrailMap}
          className="px-2.5 py-1 bg-[#2F644F] text-[#FFF1D3] hover:bg-[#FFD06A] hover:text-[#23244F] ww-font-hud font-hud text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          Trail Map ({discoveredArtifactsCount + collectedShardsCount}/6)
        </button>

        {/* Opt-in Ambient Sound Toggle (Off by default) */}
        <button
          type="button"
          onClick={onToggleSound}
          aria-pressed={soundEnabled}
          aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          className={`px-2.5 py-1 ww-font-hud font-hud text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            soundEnabled
              ? 'bg-[#6DDCC5] text-[#23244F] border-[#23244F]'
              : 'bg-[#23244F] text-[#FFF1D3] border-[#604A79] hover:border-[#FFD06A]'
          }`}
        >
          Sound: {soundEnabled ? 'On' : 'Off'}
        </button>
      </aside>
    </>
  );
};
