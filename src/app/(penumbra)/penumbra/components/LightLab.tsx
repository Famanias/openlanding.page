'use client';

import React from 'react';
import { RotateCcw, Sliders, Compass, Thermometer } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import {
  LightLabState,
  ColorTemperature,
  DEFAULT_LIGHT_LAB_STATE,
  computeLightLabVisuals,
  HERO_BASE,
  HERO_REVEAL,
} from '../lib/motion';

interface LightLabProps {
  state: LightLabState;
  onChange: (next: LightLabState) => void;
  onReset: () => void;
}

export const LightLab: React.FC<LightLabProps> = ({ state, onChange, onReset }) => {
  const visuals = computeLightLabVisuals(state);

  const handleIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...state,
      intensity: Number(e.target.value),
    });
  };

  const handleTemperatureChange = (temperature: ColorTemperature) => {
    onChange({
      ...state,
      temperature,
    });
  };

  const handleDirectionChange = (direction: number) => {
    onChange({
      ...state,
      direction: Math.max(-60, Math.min(60, direction)),
    });
  };

  const isDefault =
    state.intensity === DEFAULT_LIGHT_LAB_STATE.intensity &&
    state.temperature === DEFAULT_LIGHT_LAB_STATE.temperature &&
    state.direction === DEFAULT_LIGHT_LAB_STATE.direction;

  return (
    <section
      id="light-lab"
      aria-labelledby="light-lab-heading"
      className="relative py-20 md:py-28 bg-[#111318] border-t border-[#F2EBE2]/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div id="light-lab-heading">
          <SectionHeading
            label="03 / Light lab"
            headline="See what light can do"
            intro="An interactive study of intensity, warmth, and direction."
          />
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left/Top: Architectural Stage */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-[#111318] border border-[#F2EBE2]/10 overflow-hidden">
            {/* Top Telemetry Bar */}
            <div className="px-5 py-3 border-b border-[#F2EBE2]/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech">
              <div className="flex items-center gap-3">
                <span className="text-[#D7A779] uppercase tracking-wider">Calibration stage</span>
                <span aria-hidden="true" className="text-[#A6A29F]">
                  ·
                </span>
                <span className="text-[#F2EBE2]">{visuals.kelvinLabel}</span>
              </div>
              <div className="flex items-center gap-4 text-[#A6A29F] tabular-nums">
                <span>Output: {state.intensity}%</span>
                <span>Vector: {state.direction > 0 ? `+${state.direction}°` : `${state.direction}°`}</span>
              </div>
            </div>

            {/* Registered 16:9 Architectural Preview Stage */}
            <div
              className="relative w-full aspect-video overflow-hidden bg-[#111318]"
              data-testid="light-lab-stage"
            >
              <img
                src={HERO_BASE}
                alt="Unlit architectural base"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              <div
                aria-hidden="true"
                style={{
                  opacity: visuals.revealOpacity,
                  filter: visuals.filterCss,
                  maskImage: visuals.directionalMaskCss,
                  WebkitMaskImage: visuals.directionalMaskCss,
                }}
                className="absolute inset-0 w-full h-full transition-opacity duration-150"
              >
                <img
                  src={HERO_REVEAL}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div
                aria-hidden="true"
                style={{
                  backgroundColor: visuals.tintOverlayColor,
                  opacity: visuals.revealOpacity * 0.75,
                }}
                className="pointer-events-none absolute inset-0 mix-blend-color transition-colors duration-200"
              />

              <div
                aria-hidden="true"
                style={{ left: `${visuals.beamSweepXPercent}%` }}
                className="pointer-events-none absolute top-0 bottom-0 w-px bg-gradient-to-b from-[#E9BB86]/70 via-[#D7A779]/20 to-transparent transition-all duration-150"
              >
                <span className="absolute top-3 -translate-x-1/2 px-2 py-0.5 bg-[#111318]/90 border border-[#E9BB86]/40 font-mono-tech text-xs text-[#E9BB86] tabular-nums whitespace-nowrap">
                  {state.direction}°
                </span>
              </div>
            </div>

            {/* Bottom Readout */}
            <div className="px-5 py-2.5 border-t border-[#F2EBE2]/10 bg-[#111318] flex items-center justify-between text-xs text-[#A6A29F]">
              <span className="font-mono-tech">Interactive photometric study</span>
              <span className="font-mono-tech text-[#E9BB86] tabular-nums">
                Est. {visuals.footcandleEstimate}
              </span>
            </div>
          </div>

          {/* Right: Tactile Control Console */}
          <div className="lg:col-span-4 bg-[#1c2027] border border-[#F2EBE2]/10 p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Control 1: Intensity Slider */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label
                    htmlFor="light-lab-intensity"
                    className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-[#F2EBE2]"
                  >
                    <Sliders className="w-3.5 h-3.5 text-[#D7A779]" strokeWidth={1.5} aria-hidden="true" />
                    <span>Intensity</span>
                  </label>
                  <span className="font-mono-tech text-sm text-[#E9BB86] tabular-nums">
                    {state.intensity}%
                  </span>
                </div>
                <input
                  id="light-lab-intensity"
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={state.intensity}
                  onChange={handleIntensityChange}
                  className="w-full penumbra-slider"
                />
              </div>

              {/* Control 2: Color Temperature */}
              <div className="pt-4 border-t border-[#F2EBE2]/10">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-[#F2EBE2]">
                    <Thermometer className="w-3.5 h-3.5 text-[#D7A779]" strokeWidth={1.5} aria-hidden="true" />
                    <span>Temperature</span>
                  </span>
                  <span className="font-mono-tech text-xs text-[#A6A29F] tabular-nums">
                    {visuals.cctValue}K
                  </span>
                </div>

                <div
                  role="group"
                  aria-label="Color Temperature"
                  className="grid grid-cols-3 gap-2 p-1 bg-[#111318] border border-[#F2EBE2]/10"
                >
                  {(
                    [
                      { id: 'cool', label: 'Cool', kelvin: '4200K' },
                      { id: 'neutral', label: 'Neutral', kelvin: '3200K' },
                      { id: 'warm', label: 'Warm', kelvin: '2700K' },
                    ] as const
                  ).map((option) => {
                    const active = state.temperature === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleTemperatureChange(option.id)}
                        aria-pressed={active}
                        className={`py-1.5 px-2 text-center transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] ${
                          active
                            ? 'bg-[#D7A779] text-[#111318] font-medium'
                            : 'text-[#A6A29F] hover:text-[#F2EBE2] hover:bg-[#1c2027]'
                        }`}
                      >
                        <span className="block text-xs tracking-wider uppercase">
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Control 3: Direction */}
              <div className="pt-4 border-t border-[#F2EBE2]/10">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label
                    htmlFor="light-lab-direction"
                    className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-[#F2EBE2]"
                  >
                    <Compass className="w-3.5 h-3.5 text-[#D7A779]" strokeWidth={1.5} aria-hidden="true" />
                    <span>Direction</span>
                  </label>
                  <span className="font-mono-tech text-xs text-[#E9BB86] tabular-nums">
                    {state.direction > 0 ? `+${state.direction}°` : `${state.direction}°`}
                  </span>
                </div>

                <input
                  id="light-lab-direction"
                  type="range"
                  min={-60}
                  max={60}
                  step={1}
                  value={state.direction}
                  onChange={(e) => handleDirectionChange(Number(e.target.value))}
                  className="w-full penumbra-slider"
                />

                <div className="mt-2.5 grid grid-cols-3 gap-2">
                  {[
                    { label: '-42°', angle: -42 },
                    { label: '0°', angle: 0 },
                    { label: '+42°', angle: 42 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleDirectionChange(preset.angle)}
                      className={`py-1.5 px-1 font-mono-tech text-xs border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] ${
                        state.direction === preset.angle
                          ? 'border-[#D7A779] text-[#E9BB86] bg-[#111318]'
                          : 'border-[#F2EBE2]/12 text-[#A6A29F] hover:text-[#F2EBE2] hover:bg-[#111318]/50'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="pt-4 border-t border-[#F2EBE2]/10">
              <button
                type="button"
                onClick={onReset}
                disabled={isDefault}
                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono-tech uppercase tracking-wider border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] ${
                  isDefault
                    ? 'border-[#F2EBE2]/10 text-[#A6A29F]/40 cursor-not-allowed'
                    : 'border-[#F2EBE2]/20 text-[#F2EBE2] hover:border-[#D7A779] hover:text-[#E9BB86] bg-[#111318]/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" />
                <span>Reset scene</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
