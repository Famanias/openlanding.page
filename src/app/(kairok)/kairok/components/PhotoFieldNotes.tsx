'use client';
import React, { useState } from 'react';
import { KAIRO_ASSETS } from '../lib/assets';

type GalleryViewMode = 'after-dark' | 'field-notes';

export const PhotoFieldNotes: React.FC = () => {
  const [viewMode, setViewMode] = useState<GalleryViewMode>('after-dark');
  const [exposureCurtain, setExposureCurtain] = useState<number>(54);

  const activeImage =
    viewMode === 'after-dark' ? KAIRO_ASSETS.sample : KAIRO_ASSETS.city;
  const activeImageAlt =
    viewMode === 'after-dark'
      ? 'Moody street photograph of a figure with an umbrella passing an illuminated corner cafe in the rain'
      : 'Wide night street perspective in the rain with warm storefront lights and wet crosswalk reflections';

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-gradient-to-b from-[#121315] via-[#18191c] to-[#f2efe9] pt-20 pb-24 md:pt-32 md:pb-36 px-5 md:px-10 border-t border-[#f2efe9]/12"
    >
      <div className="mx-auto max-w-[1360px]">
        {/* Header & Mode Switcher (`City / After dark` vs `Field notes`) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#f2efe9]/15">
          <div>
            <div className="flex items-center gap-3 font-mono-kairo text-xs tracking-[0.18em] text-[#e68f63]">
              <span>03 / PHOTOGRAPHIC FIELD NOTES</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#a8aaa9]">ILLUSTRATIVE STUDY</span>
            </div>
            <h2
              id="gallery-heading"
              style={{ textWrap: 'balance' }}
              className="font-display-kairo mt-3 max-w-[18ch] text-[clamp(2.25rem,4.5vw,4rem)] font-semibold leading-[1.04] tracking-tight text-[#f2efe9]"
            >
              Made for the moment you almost missed.
            </h2>
          </div>

          {/* View Mode Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="font-mono-kairo text-xs text-[#a8aaa9]">
              COMPOSITION MODE:
            </span>
            <div
              role="tablist"
              aria-label="Photographic study selector"
              className="inline-flex items-center gap-1.5 bg-[#1d2024] p-1.5 rounded-[2px] border border-[#f2efe9]/18"
            >
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'after-dark'}
                onClick={() => setViewMode('after-dark')}
                className={`px-4 py-2 text-xs font-mono-kairo rounded-[2px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'after-dark'
                    ? 'bg-[#e68f63] text-[#121315] font-semibold'
                    : 'text-[#f2efe9]/80 hover:text-[#f2efe9]'
                }`}
              >
                City / After dark
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'field-notes'}
                onClick={() => setViewMode('field-notes')}
                className={`px-4 py-2 text-xs font-mono-kairo rounded-[2px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'field-notes'
                    ? 'bg-[#e68f63] text-[#121315] font-semibold'
                    : 'text-[#f2efe9]/80 hover:text-[#f2efe9]'
                }`}
              >
                Field notes
              </button>
            </div>
          </div>
        </div>

        {/* Main Photographic Stage with Illustrative Exposure Curtain */}
        <div className="mt-10 rounded-[2px] overflow-hidden bg-[#121315] border border-[#f2efe9]/20 shadow-2xl">
          <div className="relative h-[380px] sm:h-[500px] md:h-[640px] w-full overflow-hidden select-none">
            {/* Base Layer: Natural Low-Key Night Render */}
            <img
              src={activeImage}
              alt={activeImageAlt}
              loading="lazy"
              referrerPolicy="no-referrer"
              style={{
                filter: 'brightness(0.88) contrast(1.06)',
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Top Clipped Layer: Shadow-Recovered Warm Exposure Latitude Preview */}
            <img
              src={activeImage}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
              style={{
                clipPath: `inset(0 ${100 - exposureCurtain}% 0 0)`,
                filter: 'brightness(1.18) contrast(0.98) saturate(1.12)',
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Vertical Curtain Divider Line */}
            <div
              aria-hidden="true"
              style={{ left: `${exposureCurtain}%` }}
              className="pointer-events-none absolute inset-y-0 w-[1.5px] bg-[#e68f63] shadow-[0_0_12px_rgba(230,143,99,0.8)]"
            >
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-[2px] bg-[#e68f63] text-[#121315] font-mono-kairo text-[10px] font-semibold whitespace-nowrap">
                LATITUDE SPLIT
              </div>
            </div>

            {/* Field Notes Compositional Grid & Annotations when `field-notes` mode is active */}
            {viewMode === 'field-notes' && (
              <div className="pointer-events-none absolute inset-0 z-10">
                {/* Rule-of-thirds hairline compositional grid */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                  <div className="border-r border-b border-[#f2efe9]/15" />
                  <div className="border-r border-b border-[#f2efe9]/15" />
                  <div className="border-b border-[#f2efe9]/15" />
                  <div className="border-r border-b border-[#f2efe9]/15" />
                  <div className="border-r border-b border-[#f2efe9]/15" />
                  <div className="border-b border-[#f2efe9]/15" />
                  <div className="border-r border-[#f2efe9]/15" />
                  <div className="border-r border-[#f2efe9]/15" />
                  <div />
                </div>

                <div className="absolute top-6 left-6 bg-[#121315]/88 backdrop-blur-md p-4 rounded-[2px] border border-[#e68f63]/50 max-w-xs">
                  <p className="font-mono-kairo text-[11px] text-[#e68f63]">
                    ANNOTATION A · TUNGSTEN GLOW
                  </p>
                  <p className="mt-1 text-xs text-[#f2efe9]/90">
                    Warm interior café light holds natural amber saturation against
                    cool slate rain mist.
                  </p>
                </div>

                <div className="absolute bottom-16 right-6 bg-[#121315]/88 backdrop-blur-md p-4 rounded-[2px] border border-[#e68f63]/50 max-w-xs">
                  <p className="font-mono-kairo text-[11px] text-[#e68f63]">
                    ANNOTATION B · SPECULAR PAVEMENT
                  </p>
                  <p className="mt-1 text-xs text-[#f2efe9]/90">
                    Wet asphalt mirrors overhead lamps without crushing deep shadow
                    graduation in the crosswalk.
                  </p>
                </div>
              </div>
            )}

            {/* Corner Exposure Labels */}
            <div className="pointer-events-none absolute top-4 left-4 bg-[#121315]/80 backdrop-blur-md px-3 py-1.5 rounded-[2px] border border-[#f2efe9]/15 font-mono-kairo text-[11px] text-[#f2efe9]">
              SHADOW RECOVERY PREVIEW (+1.2 EV ILLUSTRATIVE)
            </div>
            <div className="pointer-events-none absolute top-4 right-4 bg-[#121315]/80 backdrop-blur-md px-3 py-1.5 rounded-[2px] border border-[#f2efe9]/15 font-mono-kairo text-[11px] text-[#a8aaa9]">
              NATURAL LOW-KEY BASELINE
            </div>
          </div>

          {/* Interactive Curtain Slider Bar */}
          <div className="bg-[#181a1e] px-5 py-4 md:px-8 md:py-5 border-t border-[#f2efe9]/12 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <label
                htmlFor="kairo-exposure-slider"
                className="block font-mono-kairo text-xs text-[#e68f63]"
              >
                ILLUSTRATIVE EXPOSURE PREVIEW · {exposureCurtain}% SPLIT
              </label>
              <p className="text-xs text-[#a8aaa9] mt-0.5">
                Drag the curtain to compare shadow-lifted tonal grading with the
                low-key night atmosphere (illustrative visual demonstration).
              </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-80">
              <span className="font-mono-kairo text-[11px] text-[#a8aaa9]">0%</span>
              <input
                id="kairo-exposure-slider"
                type="range"
                min={5}
                max={95}
                value={exposureCurtain}
                onChange={(e) => setExposureCurtain(Number(e.target.value))}
                className="w-full accent-[#e68f63] cursor-pointer"
              />
              <span className="font-mono-kairo text-[11px] text-[#a8aaa9]">100%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
