'use client';

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { BackgroundEffect, EffectId } from '../engine/effectTypes';

export interface BackgroundSwitcherProps {
  effects: BackgroundEffect[];
  activeEffectId: EffectId;
  dockCollapsed: boolean;
  dockHighlightPulse: boolean;
  onSelectEffect: (id: EffectId) => void;
  onToggleDockCollapse: () => void;
}

function EffectGlyph({ id, active }: { id: EffectId; active: boolean }) {
  const strokeColor = active ? '#08090d' : 'currentColor';
  switch (id) {
    case 'chroma-fluid':
      return (
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 10C4.5 6 7 12 9.5 7.5C11.5 4 13 8 14 5"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="5" cy="5" r="1.5" fill={strokeColor} />
        </svg>
      );
    case 'fluted-light':
      return (
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 2.5V13.5M6.3 2.5V13.5M9.6 2.5V13.5M13 2.5V13.5"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'silk-atmosphere':
      return (
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 6C5 3 11 9 14 6M2 10.5C5 7.5 11 13.5 14 10.5"
            stroke={strokeColor}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'glass-lens':
      return (
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
          <ellipse cx="8" cy="8" rx="5.5" ry="4.5" stroke={strokeColor} strokeWidth="1.5" />
          <path d="M5.5 6.5C6.5 5.3 8.5 5.3 9.5 6.5" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case 'aurora-field':
      return (
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 12C5 9 7 11 14 7M3 8.5C6 5.5 9 7.5 13 4"
            stroke={strokeColor}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'chromatic-ribbons':
      return (
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
          <path
            d="M2.5 13L13.5 3M2.5 9L9 2.5M7 13.5L13.5 7"
            stroke={strokeColor}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'bokeh-reactor':
      return (
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
          <circle cx="6.5" cy="8.5" r="3.5" stroke={strokeColor} strokeWidth="1.4" />
          <circle cx="10.5" cy="6.5" r="2.5" stroke={strokeColor} strokeWidth="1.2" />
        </svg>
      );
    case 'refraction-field':
      return (
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
          <polygon points="8,2 14,6 11.5,13.5 4.5,13.5 2,6" stroke={strokeColor} strokeWidth="1.3" />
          <path d="M8 2L8 13.5M2 6L14 6" stroke={strokeColor} strokeWidth="1.1" />
        </svg>
      );
  }
}

export function BackgroundSwitcher({
  effects,
  activeEffectId,
  dockCollapsed,
  dockHighlightPulse,
  onSelectEffect,
  onToggleDockCollapse,
}: BackgroundSwitcherProps) {
  return (
    <section
      aria-label="Material Surface Selector Dock"
      className="relative z-20 mx-auto w-full max-w-[1380px] px-4 sm:px-8 pb-4 sm:pb-6 pointer-events-auto"
      data-ui-interactive="true"
    >
      {/* Top tab to collapse/expand bottom dock for unobstructed Zen inspection */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="text-[11px] font-tech-mono tracking-[0.12em] text-white/60">
          MATERIAL GALLERY · KEYS 1–8 TO SWITCH
        </div>
        <button
          type="button"
          onClick={onToggleDockCollapse}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-tech-mono text-white/75 hover:text-white bg-[#0d1018]/90 border border-white/15 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          {dockCollapsed ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" />
              <span>Show Dock</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" />
              <span>Hide Dock</span>
            </>
          )}
        </button>
      </div>

      {!dockCollapsed && (
        <div
          className={`rounded-xl border transition-all duration-300 bg-[#0a0c12]/92 p-2 sm:p-2.5 shadow-2xl ${
            dockHighlightPulse ? 'border-[#ff6b4a]' : 'border-white/15'
          }`}
        >
          {/* Responsive selector gallery: horizontal scroll on small screens, 4x2 architectural gallery on tablet/desktop */}
          <div
            role="tablist"
            aria-label="Eight Interactive WebGL Surfaces"
            className="flex md:grid md:grid-cols-4 gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar"
          >
            {effects.map((eff) => {
              const isActive = eff.id === activeEffectId;
              return (
                <button
                  key={eff.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectEffect(eff.id)}
                  className={`group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-left transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6b4a] ${
                    isActive
                      ? 'bg-[#f4f1ea] text-[#08090d] font-semibold shadow-sm'
                      : 'bg-[#121520]/85 text-white/80 hover:bg-[#191d2b] hover:text-white border border-white/10'
                  }`}
                >
                  <EffectGlyph id={eff.id} active={isActive} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs font-tech-mono leading-tight">
                      <span className={isActive ? 'text-[#08090d]/70 font-bold' : 'text-[#ff9b7a]'}>
                        {eff.indexNumber}
                      </span>
                      <span className="tracking-wider">{eff.label}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
