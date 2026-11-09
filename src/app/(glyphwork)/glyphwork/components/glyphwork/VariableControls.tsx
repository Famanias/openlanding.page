'use client';

import React from 'react';
import {
  VariableAxesState,
  formatSlantDisplay,
  formatTrackingDisplay,
} from '../../utils/typographyLogic';

interface VariableControlsProps {
  axes: VariableAxesState;
  onAxisChange: (axis: keyof VariableAxesState, value: number) => void;
}

const RULER_TICKS = Array.from({ length: 29 });

export const VariableControls: React.FC<VariableControlsProps> = ({
  axes,
  onAxisChange,
}) => {
  return (
    <div
      role="region"
      aria-label="Variable Font Instrument Controls"
      className="w-full border-t border-[#111111] bg-[#F7F7F0] select-none"
    >
      {/* Clean 4-Column Instrument Slider Grid matching header-reference.webp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#111111]">
        {/* CELL 1: WEIGHT */}
        <div className="relative px-5 pt-3 pb-5 flex flex-col justify-between">
          <div className="gw-mono text-[13px] font-medium tracking-[0.03em] text-[#111111] mb-1.5">
            <label htmlFor="gw-axis-weight" className="cursor-pointer">
              WEIGHT [
            </label>
          </div>

          <div className="flex items-center gap-2.5 gw-mono text-[14px] font-medium text-[#111111]">
            <span className="whitespace-nowrap shrink-0">[100</span>
            <div className="relative flex-1 flex items-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 h-[3px] bg-[#F02F83]"
                style={{ width: `${((axes.weight - 100) / 800) * 100}%` }}
              />
              <input
                id="gw-axis-weight"
                type="range"
                min={100}
                max={900}
                step={1}
                value={axes.weight}
                aria-label="Weight Axis"
                aria-valuemin={100}
                aria-valuemax={900}
                aria-valuenow={axes.weight}
                aria-valuetext={`Weight ${axes.weight}`}
                onChange={(e) => onAxisChange('weight', Number(e.target.value))}
                className="gw-slider gw-slider-magenta relative z-10"
              />
            </div>
            <span className="whitespace-nowrap shrink-0">
              900] <strong className="font-bold ml-1">{axes.weight}</strong>
            </span>
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-0 left-5 right-5 h-[9px] flex items-end justify-between pointer-events-none"
          >
            {RULER_TICKS.map((_, i) => (
              <span
                key={i}
                className={`block bg-[#111111] ${
                  i % 4 === 0 ? 'h-[8px] w-[1px]' : 'h-[4px] w-[1px] opacity-65'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CELL 2: WIDTH */}
        <div className="relative px-5 pt-3 pb-5 flex flex-col justify-between">
          <div className="gw-mono text-[13px] font-medium tracking-[0.03em] text-[#111111] mb-1.5">
            <label htmlFor="gw-axis-width" className="cursor-pointer">
              WIDTH [
            </label>
          </div>

          <div className="flex items-center gap-2.5 gw-mono text-[14px] font-medium text-[#111111]">
            <span className="whitespace-nowrap shrink-0">[50</span>
            <div className="relative flex-1 flex items-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 h-[3px] bg-[#6E57D5]"
                style={{ width: `${((axes.width - 50) / 100) * 100}%` }}
              />
              <input
                id="gw-axis-width"
                type="range"
                min={50}
                max={150}
                step={1}
                value={axes.width}
                aria-label="Width Axis"
                aria-valuemin={50}
                aria-valuemax={150}
                aria-valuenow={axes.width}
                aria-valuetext={`Width ${axes.width}%`}
                onChange={(e) => onAxisChange('width', Number(e.target.value))}
                className="gw-slider gw-slider-violet relative z-10"
              />
            </div>
            <span className="whitespace-nowrap shrink-0">
              150] <strong className="font-bold ml-1">{axes.width}</strong>
            </span>
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-0 left-5 right-5 h-[9px] flex items-end justify-between pointer-events-none"
          >
            {RULER_TICKS.map((_, i) => (
              <span
                key={i}
                className={`block bg-[#111111] ${
                  i % 4 === 0 ? 'h-[8px] w-[1px]' : 'h-[4px] w-[1px] opacity-65'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CELL 3: TRACKING */}
        <div className="relative px-5 pt-3 pb-5 flex flex-col justify-between border-t sm:border-t lg:border-t-0 border-[#111111]">
          <div className="gw-mono text-[13px] font-medium tracking-[0.03em] text-[#111111] mb-1.5">
            <label htmlFor="gw-axis-tracking" className="cursor-pointer">
              TRACKING [
            </label>
          </div>

          <div className="flex items-center gap-2.5 gw-mono text-[14px] font-medium text-[#111111]">
            <span className="whitespace-nowrap shrink-0">-100</span>
            <div className="relative flex-1 flex items-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 h-[3px] bg-[#111111]"
                style={{ width: `${((axes.tracking + 100) / 200) * 100}%` }}
              />
              <input
                id="gw-axis-tracking"
                type="range"
                min={-100}
                max={100}
                step={1}
                value={axes.tracking}
                aria-label="Tracking Letterspacing"
                aria-valuemin={-100}
                aria-valuemax={100}
                aria-valuenow={axes.tracking}
                aria-valuetext={`Tracking ${formatTrackingDisplay(axes.tracking)} em`}
                onChange={(e) => onAxisChange('tracking', Number(e.target.value))}
                className="gw-slider gw-slider-ink relative z-10"
              />
            </div>
            <span className="whitespace-nowrap shrink-0">
              100] <strong className="font-bold ml-1">{formatTrackingDisplay(axes.tracking)}</strong>
            </span>
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-0 left-5 right-5 h-[9px] flex items-end justify-between pointer-events-none"
          >
            {RULER_TICKS.map((_, i) => (
              <span
                key={i}
                className={`block ${
                  i % 4 === 0
                    ? 'h-[8px] w-[1px] bg-[#111111]'
                    : 'h-[4px] w-[1px] bg-[#F02F83]/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CELL 4: SLANT */}
        <div className="relative px-5 pt-3 pb-5 flex flex-col justify-between border-t sm:border-t lg:border-t-0 border-[#111111]">
          <div className="gw-mono text-[13px] font-medium tracking-[0.03em] text-[#111111] mb-1.5">
            <label htmlFor="gw-axis-slant" className="cursor-pointer">
              SLANT [
            </label>
          </div>

          <div className="flex items-center gap-2.5 gw-mono text-[14px] font-medium text-[#111111]">
            <span className="whitespace-nowrap shrink-0">0°</span>
            <div className="relative flex-1 flex items-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 h-[3px] bg-[#111111]"
                style={{ width: `${(axes.slant / 15) * 100}%` }}
              />
              <input
                id="gw-axis-slant"
                type="range"
                min={0}
                max={15}
                step={0.5}
                value={axes.slant}
                aria-label="Slant Oblique Angle"
                aria-valuemin={0}
                aria-valuemax={15}
                aria-valuenow={axes.slant}
                aria-valuetext={`Slant ${formatSlantDisplay(axes.slant)}`}
                onChange={(e) => onAxisChange('slant', Number(e.target.value))}
                className="gw-slider gw-slider-yellow relative z-10"
              />
            </div>
            <span className="whitespace-nowrap shrink-0">
              15°] <strong className="font-bold ml-1">{formatSlantDisplay(axes.slant)}</strong>
            </span>
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-0 left-5 right-5 h-[9px] flex items-end justify-between pointer-events-none"
          >
            {RULER_TICKS.map((_, i) => (
              <span
                key={i}
                className={`block bg-[#111111] ${
                  i % 4 === 0 ? 'h-[8px] w-[1px]' : 'h-[4px] w-[1px] opacity-65'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
