'use client';
import React, { useState } from 'react';
import {
  APERTURE_PRESETS,
  ApertureStateId,
  KAIRO_ASSETS,
} from '../lib/assets';

export const OpticalLab: React.FC = () => {
  const [selectedAperture, setSelectedAperture] = useState<ApertureStateId>('open');

  const activePreset =
    APERTURE_PRESETS.find((preset) => preset.id === selectedAperture) ||
    APERTURE_PRESETS[0];

  // Calculate SVG iris opening radius (in viewBox 0..200)
  const irisOpeningRadius = (activePreset.irisRadiusPercent / 100) * 68;

  return (
    <section
      id="optics"
      aria-labelledby="optics-heading"
      className="kairo-porcelain-chapter relative py-20 md:py-32 px-5 md:px-10 border-t border-[#121315]/10"
    >
      <div className="mx-auto max-w-[1360px]">
        {/* Asymmetric Editorial Header with Massive Numbering */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 md:pb-16 border-b border-[#121315]/12">
          <div className="lg:col-span-4 flex items-baseline gap-4">
            <span className="font-display-kairo text-6xl md:text-8xl font-semibold tracking-tighter text-[#121315]/15 select-none">
              01
            </span>
            <div>
              <p className="font-mono-kairo text-xs tracking-[0.18em] text-[#b8785d]">
                OPTICAL ARCHITECTURE
              </p>
              <p className="text-xs text-[#121315]/65 mt-1">
                Copper-Ringed Prime Assembly · Illustrative Study
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <h2
              id="optics-heading"
              style={{ textWrap: 'balance' }}
              className="font-display-kairo text-[clamp(2.25rem,4.5vw,4rem)] font-semibold leading-[1.04] tracking-tight text-[#121315]"
            >
              Light changes everything.
            </h2>
            <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-[#121315]/75">
              Before a photograph reaches a screen, it is shaped by glass and air.
              KAIRO K-01 centers the entire body around a single oversized optical
              throat—inviting you to shape depth, atmosphere, and peripheral falloff
              by feel.
            </p>
          </div>
        </div>

        {/* Asymmetric Main Stage: 7-col Lens Macro + Iris Visualizer / 5-col Interactive Aperture Control */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left: Large Lens Macro Field with Real Animated Iris Overlay */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-[2px] bg-[#121315] border border-[#121315]/15 min-h-[380px] md:min-h-[520px] flex items-center justify-center">
            <img
              src={KAIRO_ASSETS.lens}
              alt="Extreme macro view of the KAIRO K-01 copper-ringed camera lens and multi-coated glass elements"
              loading="lazy"
              referrerPolicy="no-referrer"
              style={{
                transform: `scale(${selectedAperture === 'open' ? 1.04 : selectedAperture === 'balanced' ? 1.01 : 0.99})`,
              }}
              className="w-full h-full object-cover transition-transform duration-500"
            />

            {/* Dynamic 9-Blade Optical Iris SVG Overlay */}
            <svg
              viewBox="0 0 200 200"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 m-auto w-[72%] max-w-[380px] aspect-square"
            >
              <defs>
                <radialGradient id="kairoIrisMask" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(230,143,99,0.08)" />
                  <stop offset="70%" stopColor="rgba(18,19,21,0.55)" />
                  <stop offset="100%" stopColor="rgba(18,19,21,0.88)" />
                </radialGradient>
              </defs>

              {/* Outer copper coordinate ring */}
              <circle
                cx="100"
                cy="100"
                r="86"
                fill="none"
                stroke="rgba(230, 143, 99, 0.45)"
                strokeWidth="0.75"
                strokeDasharray="3 3"
              />

              {/* Rotating blade geometry */}
              <g
                style={{
                  transform: `rotate(${activePreset.bladeRotationDeg}deg)`,
                  transformOrigin: '100px 100px',
                  transition: 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {Array.from({ length: 9 }).map((_, idx) => {
                  const angle = idx * 40;
                  return (
                    <line
                      key={idx}
                      x1={100 + irisOpeningRadius * Math.cos((angle * Math.PI) / 180)}
                      y1={100 + irisOpeningRadius * Math.sin((angle * Math.PI) / 180)}
                      x2={100 + 82 * Math.cos(((angle + 55) * Math.PI) / 180)}
                      y2={100 + 82 * Math.sin(((angle + 55) * Math.PI) / 180)}
                      stroke="rgba(242, 239, 233, 0.48)"
                      strokeWidth="1.25"
                    />
                  );
                })}
              </g>

              {/* Dynamic iris opening circle */}
              <circle
                cx="100"
                cy="100"
                r={irisOpeningRadius}
                fill="url(#kairoIrisMask)"
                stroke="#e68f63"
                strokeWidth="1.5"
                style={{
                  transition: 'r 420ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </svg>

            {/* Bottom status readout */}
            <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-2 bg-[#121315]/85 backdrop-blur-md px-4 py-2.5 rounded-[2px] border border-[#f2efe9]/15 text-xs font-mono-kairo text-[#f2efe9]">
              <span>IRIS STATE: {activePreset.label.toUpperCase()}</span>
              <span className="text-[#e68f63]">{activePreset.displayStop}</span>
            </div>
          </div>

          {/* Right: Interactive Aperture Control & Live Sample Depth Preview */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#e8e3db] p-6 md:p-8 rounded-[2px] border border-[#121315]/12">
            <div>
              <div className="flex items-center justify-between gap-2 font-mono-kairo text-xs text-[#121315]/65">
                <span>INTERACTIVE IRIS STUDY</span>
                <span>ILLUSTRATIVE DEMO</span>
              </div>

              <h3 className="font-display-kairo mt-3 text-2xl font-semibold text-[#121315]">
                Select an aperture character
              </h3>
              <p className="mt-1.5 text-sm text-[#121315]/75">
                Switch between three illustrative diaphragm positions to inspect how
                the iris geometry and atmospheric field respond.
              </p>

              {/* 3-State Accessible Selector (`Open`, `Balanced`, `Narrow`) */}
              <div
                role="group"
                aria-label="Illustrative aperture selector"
                className="mt-6 grid grid-cols-3 gap-2 bg-[#d2cec7]/70 p-1.5 rounded-[2px]"
              >
                {APERTURE_PRESETS.map((preset) => {
                  const isSelected = preset.id === selectedAperture;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedAperture(preset.id)}
                      className={`py-2.5 px-3 text-xs font-mono-kairo rounded-[2px] transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-[#121315] text-[#f2efe9] font-semibold shadow-sm'
                          : 'text-[#121315]/75 hover:text-[#121315] hover:bg-[#f2efe9]/50'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

              {/* Active Preset Explanation */}
              <div aria-live="polite" className="mt-6 pt-6 border-t border-[#121315]/12">
                <div className="flex items-center justify-between text-xs font-mono-kairo text-[#b8785d]">
                  <span>{activePreset.displayStop}</span>
                  <span>{activePreset.lightTransmissionLabel}</span>
                </div>
                <h4 className="font-display-kairo mt-2 text-lg font-semibold text-[#121315]">
                  {activePreset.characterTitle}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#121315]/80">
                  {activePreset.description}
                </p>
              </div>
            </div>

            {/* Corresponding Sample Vignette / Blur Preview */}
            <div className="mt-8 pt-6 border-t border-[#121315]/12">
              <div className="flex items-center justify-between text-xs font-mono-kairo text-[#121315]/65 mb-2.5">
                <span>FIELD & VIGNETTE RESPONSE</span>
                <span>PREVIEW</span>
              </div>
              <div className="relative h-40 overflow-hidden rounded-[2px] bg-[#121315] border border-[#121315]/20">
                {/* Background layer blurred according to aperture preset */}
                <img
                  src={KAIRO_ASSETS.sample}
                  alt="Illustrative street depth preview"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  style={{
                    filter: `blur(${activePreset.sampleBlurPx}px)`,
                    transform: 'scale(1.06)',
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
                />
                {/* Sharp central subject window when open/balanced */}
                <img
                  src={KAIRO_ASSETS.sample}
                  alt=""
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  style={{
                    clipPath: 'circle(28% at 48% 56%)',
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Vignette overlay */}
                <div
                  aria-hidden="true"
                  style={{
                    opacity: activePreset.vignetteStrength,
                  }}
                  className="absolute inset-0 bg-[radial-gradient(circle_at_48%_56%,transparent_25%,#121315_100%)] transition-opacity duration-300"
                />
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono-kairo text-[#f2efe9]/90">
                  <span>BACKGROUND BLUR: {activePreset.sampleBlurPx}PX</span>
                  <span>IRIS OPENING: {activePreset.irisRadiusPercent}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
