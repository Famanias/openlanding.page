'use client';
import React, { useState } from 'react';
import {
  CAMERA_FINISHES,
  CameraFinishId,
  KAIRO_ASSETS,
} from '../lib/assets';

export interface CollectionExplorerProps {
  selectedFinish: CameraFinishId;
  onSelectFinish: (finish: CameraFinishId) => void;
  onOpenWaitlist: (finish: CameraFinishId) => void;
}

export const CollectionExplorer: React.FC<CollectionExplorerProps> = ({
  selectedFinish,
  onSelectFinish,
  onOpenWaitlist,
}) => {
  const [framingMode, setFramingMode] = useState<'focus' | 'lineup'>('focus');

  const activeFinish =
    CAMERA_FINISHES.find((f) => f.id === selectedFinish) || CAMERA_FINISHES[0];

  return (
    <section
      id="collection"
      aria-labelledby="collection-heading"
      className="kairo-porcelain-chapter py-20 md:py-32 px-5 md:px-10 border-t border-[#121315]/12"
    >
      <div className="mx-auto max-w-[1360px]">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#121315]/12">
          <div className="lg:col-span-4 flex items-baseline gap-4">
            <span className="font-display-kairo text-6xl md:text-8xl font-semibold tracking-tighter text-[#121315]/15 select-none">
              04
            </span>
            <div>
              <p className="font-mono-kairo text-xs tracking-[0.18em] text-[#b8785d]">
                THE K-01 COLLECTION
              </p>
              <p className="text-xs text-[#121315]/65 mt-1">
                Three Material Studies · One Copper Signature
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2
                id="collection-heading"
                style={{ textWrap: 'balance' }}
                className="font-display-kairo text-[clamp(2.25rem,4.3vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-[#121315]"
              >
                Three finishes milled from solid alloy.
              </h2>
              <p className="mt-3 max-w-xl text-base text-[#121315]/75">
                Choose a material study below to pan across the K-01 collection
                table and inspect each chassis treatment.
              </p>
            </div>

            {/* Framing Mode Toggle: Isolate Selected Finish vs Full Lineup Trio */}
            <div
              role="group"
              aria-label="Collection framing mode"
              className="inline-flex items-center gap-1 bg-[#d2cec7] p-1 rounded-[2px] self-start md:self-auto"
            >
              <button
                type="button"
                aria-pressed={framingMode === 'focus'}
                onClick={() => setFramingMode('focus')}
                className={`px-3 py-1.5 text-xs font-mono-kairo rounded-[2px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  framingMode === 'focus'
                    ? 'bg-[#121315] text-[#f2efe9] font-semibold'
                    : 'text-[#121315]/75 hover:text-[#121315]'
                }`}
              >
                Focus Selected
              </button>
              <button
                type="button"
                aria-pressed={framingMode === 'lineup'}
                onClick={() => setFramingMode('lineup')}
                className={`px-3 py-1.5 text-xs font-mono-kairo rounded-[2px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  framingMode === 'lineup'
                    ? 'bg-[#121315] text-[#f2efe9] font-semibold'
                    : 'text-[#121315]/75 hover:text-[#121315]'
                }`}
              >
                Full Trio Table
              </button>
            </div>
          </div>
        </div>

        {/* Oversized Gallery Table Artwork (`kairo-07-camera-collection.webp`) */}
        <div className="mt-10 relative overflow-hidden rounded-[2px] bg-[#121315] border border-[#121315]/20 h-[320px] sm:h-[440px] md:h-[540px]">
          <img
            src={KAIRO_ASSETS.lineup}
            alt="Three KAIRO K-01 concept cameras arranged on a dark mineral studio table in Carbon, Silver, and Titanium finishes"
            loading="lazy"
            referrerPolicy="no-referrer"
            style={{
              objectPosition: '50% 54%',
              transform:
                framingMode === 'focus'
                  ? 'scale(2.15)'
                  : 'scale(1.0)',
              transformOrigin: `${activeFinish.cropOriginXPercent}% 55%`,
            }}
            className="kairo-pan-surface w-full h-full object-cover select-none"
          />

          {/* Subtle Framing Reticle Overlay */}
          <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-4 md:p-6 bg-gradient-to-t from-[#121315]/80 via-transparent to-transparent">
            <div className="font-mono-kairo text-xs text-[#f2efe9]">
              <span className="text-[#e68f63]">ACTIVE FINISH:</span>{' '}
              <span>{activeFinish.fullName}</span>
            </div>
            <div className="hidden sm:block font-mono-kairo text-xs text-[#a8aaa9]">
              {activeFinish.characterNote}
            </div>
          </div>
        </div>

        {/* Horizontal Swatch / Index Rail + Active Finish Details */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 3 Finish Swatch Cards */}
          <div
            role="radiogroup"
            aria-label="KAIRO K-01 camera finish selection"
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {CAMERA_FINISHES.map((finish, idx) => {
              const isSelected = finish.id === selectedFinish;
              return (
                <button
                  key={finish.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => {
                    onSelectFinish(finish.id);
                    setFramingMode('focus');
                  }}
                  className={`text-left p-5 rounded-[2px] border transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#121315] text-[#f2efe9] border-[#121315] shadow-lg'
                      : 'bg-[#e6e1d8] text-[#121315] border-[#121315]/15 hover:border-[#121315]/45'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono-kairo text-xs opacity-70">
                        0{idx + 1} / FINISH
                      </span>
                      <span
                        aria-hidden="true"
                        style={{ backgroundColor: finish.swatchHex }}
                        className="w-5 h-5 rounded-full border border-[#e68f63]"
                      />
                    </div>
                    <h3 className="font-display-kairo mt-4 text-xl font-semibold">
                      {finish.name}
                    </h3>
                  </div>

                  <p
                    className={`mt-4 text-xs leading-relaxed ${
                      isSelected ? 'text-[#f2efe9]/75' : 'text-[#121315]/70'
                    }`}
                  >
                    {finish.surfaceNote}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Finish Detail & Conversion Card */}
          <div
            aria-live="polite"
            className="lg:col-span-5 bg-[#e6e1d8] p-6 md:p-8 rounded-[2px] border border-[#121315]/15 flex flex-col justify-between"
          >
            <div>
              <p className="font-mono-kairo text-xs text-[#b8785d]">
                SELECTED STUDY · {activeFinish.name.toUpperCase()}
              </p>
              <h3 className="font-display-kairo mt-2 text-2xl font-semibold text-[#121315]">
                {activeFinish.fullName}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#121315]/80">
                {activeFinish.description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#121315]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-mono-kairo text-[11px] text-[#121315]/65">
                  CONCEPT EDITION INTEREST
                </p>
                <p className="text-xs font-medium text-[#121315]">
                  Register interest in the {activeFinish.name} finish
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenWaitlist(activeFinish.id)}
                className="px-5 py-3 text-xs font-semibold tracking-wide bg-[#121315] text-[#f2efe9] hover:bg-[#e68f63] hover:text-[#121315] rounded-[2px] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Join the KAIRO list
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
