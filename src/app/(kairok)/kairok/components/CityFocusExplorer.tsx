'use client';
import React from 'react';
import {
  CITY_HOTSPOTS,
  CityHotspot,
  FOCUS_EMPHASIS_MODES,
  FocusEmphasisMode,
} from '../lib/assets';

export interface CityFocusExplorerProps {
  opacity: number;
  interactive: boolean;
  selectedHotspotId: CityHotspot['id'];
  onSelectHotspot: (id: CityHotspot['id']) => void;
  focusMode: FocusEmphasisMode;
  onChangeFocusMode: (mode: FocusEmphasisMode) => void;
}

export const CityFocusExplorer: React.FC<CityFocusExplorerProps> = ({
  opacity,
  interactive,
  selectedHotspotId,
  onSelectHotspot,
  focusMode,
  onChangeFocusMode,
}) => {
  const activeHotspot =
    CITY_HOTSPOTS.find((h) => h.id === selectedHotspotId) || CITY_HOTSPOTS[0];
  const activeFocusConfig =
    FOCUS_EMPHASIS_MODES.find((m) => m.id === focusMode) || FOCUS_EMPHASIS_MODES[0];

  if (opacity <= 0.02 && !interactive) {
    return null;
  }

  return (
    <div
      style={{
        opacity,
        pointerEvents: interactive ? 'auto' : 'none',
      }}
      className="absolute inset-0 z-30 flex flex-col justify-between p-4 pt-20 pb-8 md:px-10 md:pt-24 lg:pb-20"
    >
      {/* Cover-matched coordinate stage for desktop/tablet hotspot pins */}
      <div className="kairo-cover-stage">
        {CITY_HOTSPOTS.map((spot) => {
          const isSelected = spot.id === selectedHotspotId;
          return (
            <button
              key={spot.id}
              type="button"
              onClick={() => {
                onSelectHotspot(spot.id);
                onChangeFocusMode(spot.focusZone);
              }}
              aria-label={`Inspect ${spot.label}: ${spot.title}`}
              aria-pressed={isSelected}
              style={{
                left: `${spot.xPercent}%`,
                top: `${spot.yPercent}%`,
                pointerEvents: interactive ? 'auto' : 'none',
              }}
              className={`group absolute -translate-x-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] border text-xs font-mono-kairo transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-[#e68f63] text-[#121315] border-[#e68f63] font-semibold scale-105 shadow-[0_0_24px_rgba(230,143,99,0.45)]'
                  : 'bg-[#121315]/85 text-[#f2efe9] border-[#f2efe9]/30 hover:border-[#e68f63] hover:text-[#e68f63]'
              }`}
            >
              <span className="text-[10px] opacity-80">{spot.code}</span>
              <span>{spot.label}</span>
            </button>
          );
        })}
      </div>

      {/* Top Row: Scene 5 Title & Illustrative Focus Explorer Bar */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="bg-[#121315]/82 backdrop-blur-md px-4 py-2.5 rounded-[2px] border border-[#f2efe9]/15">
          <div className="flex items-center gap-2 font-mono-kairo text-[11px] text-[#e68f63]">
            <span>05 / FIELD NOTES</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#f2efe9]/75">A WORLD WORTH NOTICING</span>
          </div>
          <p className="text-xs text-[#f2efe9]/85 mt-0.5">
            Select a focus marker or shift emphasis across the street scene (visual illustration).
          </p>
        </div>

        {/* Focus Explorer Control */}
        <div
          role="group"
          aria-label="Focus Explorer emphasis selector"
          className="flex flex-wrap items-center gap-1.5 bg-[#121315]/85 backdrop-blur-md p-1.5 rounded-[2px] border border-[#f2efe9]/15"
        >
          <span className="px-2 text-[11px] font-mono-kairo text-[#a8aaa9]">
            FOCUS EXPLORER:
          </span>
          {FOCUS_EMPHASIS_MODES.map((mode) => {
            const active = mode.id === focusMode;
            return (
              <button
                key={mode.id}
                type="button"
                aria-pressed={active}
                onClick={() => onChangeFocusMode(mode.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-[2px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#e68f63] text-[#121315] font-semibold'
                    : 'text-[#f2efe9]/80 hover:text-[#f2efe9] hover:bg-[#f2efe9]/10'
                }`}
              >
                {mode.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Row: Mobile/Keyboard Hotspot Selector + Active Annotation Card */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-col gap-3 md:flex-row md:items-end md:justify-between">
        {/* Stable horizontal hotspot selector bar (always accessible on touch/mobile & keyboard) */}
        <div
          role="tablist"
          aria-label="Scene field note markers"
          className="flex items-center gap-1.5 overflow-x-auto bg-[#121315]/88 backdrop-blur-md p-1.5 rounded-[2px] border border-[#f2efe9]/15"
        >
          {CITY_HOTSPOTS.map((spot) => {
            const active = spot.id === selectedHotspotId;
            return (
              <button
                key={spot.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  onSelectHotspot(spot.id);
                  onChangeFocusMode(spot.focusZone);
                }}
                className={`min-h-[40px] px-3.5 py-2 text-xs font-mono-kairo rounded-[2px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#f2efe9] text-[#121315] font-semibold'
                    : 'text-[#f2efe9]/80 hover:text-[#f2efe9] hover:bg-[#f2efe9]/10'
                }`}
              >
                {spot.code} · {spot.label}
              </button>
            );
          })}
        </div>

        {/* Active Hotspot Detail Panel */}
        <div
          aria-live="polite"
          className="w-full md:max-w-md bg-[#121315]/90 backdrop-blur-md p-4 md:p-5 rounded-[2px] border border-[#f2efe9]/18"
        >
          <div className="flex items-center justify-between gap-2 text-[11px] font-mono-kairo text-[#e68f63] mb-1">
            <span>
              {activeHotspot.code} / {activeHotspot.label}
            </span>
            <span className="text-[#a8aaa9]">{activeFocusConfig.label}</span>
          </div>
          <h2 className="font-display-kairo text-base md:text-lg font-semibold text-[#f2efe9]">
            {activeHotspot.title}
          </h2>
          <p className="mt-1.5 text-xs md:text-sm leading-relaxed text-[#f2efe9]/80">
            {activeHotspot.summary}
          </p>
          <p className="mt-2.5 pt-2 border-t border-[#f2efe9]/10 font-mono-kairo text-[11px] text-[#a8aaa9]">
            {activeHotspot.opticalNote}
          </p>
        </div>
      </div>
    </div>
  );
};
