"use client";

import React from 'react';
import { EffectMode } from '../../lib/audio/audioEngine';
import { SampleSlice } from '../../lib/audio/sampleLibrary';

interface WaveformProps {
  amplitudes: number[];
  slices?: SampleSlice[];
  activeSliceIndex?: number | null;
  onSelectSlice?: (sliceIndex: number) => void;
  effectMode?: EffectMode | 'none';
  isPlaying?: boolean;
  accentColor?: 'acid' | 'red' | 'bone';
  heightClass?: string;
  showSliceMarkers?: boolean;
  className?: string;
}

/**
 * Renders an authentic amplitude envelope derived from the Web Audio buffer.
 * Supports slice markers, interactive slice auditioning, and Chapter 05 FX geometric transformations.
 */
export const Waveform: React.FC<WaveformProps> = ({
  amplitudes,
  slices,
  activeSliceIndex = null,
  onSelectSlice,
  effectMode = 'none',
  isPlaying = false,
  accentColor = 'acid',
  heightClass = 'h-28',
  showSliceMarkers = false,
  className = '',
}) => {
  // Transform amplitude array geometrically according to active effectMode so visual state = audio state
  const processedBars = React.useMemo(() => {
    if (effectMode === 'reverse') {
      return [...amplitudes].reverse();
    }
    if (effectMode === 'stutter') {
      // Repeat the transient slice (bars 20..32) in rhythmic blocks
      const grain = amplitudes.slice(20, 32);
      const out: number[] = [];
      for (let i = 0; i < amplitudes.length; i++) {
        const gIdx = i % grain.length;
        // Create hard gate gaps every 12 bars
        const gate = i % 12 >= 10 ? 0.08 : 1.0;
        out.push(Number(((grain[gIdx] || 0.4) * gate).toFixed(3)));
      }
      return out;
    }
    if (effectMode === 'octave') {
      // Octave harmonic density modulation
      return amplitudes.map((val, idx) => {
        const mod = idx % 2 === 0 ? 1.18 : 0.58;
        return Math.min(1, Math.max(0.08, Number((val * mod).toFixed(3))));
      });
    }
    return amplitudes;
  }, [amplitudes, effectMode]);

  const getBarColor = (idx: number, total: number) => {
    const ratio = idx / total;
    if (activeSliceIndex !== null && slices && slices[activeSliceIndex]) {
      const s = slices[activeSliceIndex];
      const inSlice = ratio >= s.startRatio && ratio < s.endRatio;
      if (inSlice) return '#CBFF49';
      return 'rgba(241, 238, 229, 0.24)';
    }

    if (accentColor === 'red') return isPlaying ? '#FF6748' : '#F1EEE5';
    if (accentColor === 'bone') return '#F1EEE5';
    return isPlaying ? '#CBFF49' : 'rgba(241, 238, 229, 0.78)';
  };

  return (
    <div className={`relative select-none ${heightClass} ${className}`}>
      {/* Center zero-crossing reference rule */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-[#F1EEE5]/15" />

      {/* Amplitude bars */}
      <div className="relative z-10 w-full h-full flex items-center justify-between gap-[2px]">
        {processedBars.map((amp, idx) => {
          const pct = Math.max(8, Math.round(amp * 96));
          const barColor = getBarColor(idx, processedBars.length);

          return (
            <div
              key={idx}
              style={{
                height: `${pct}%`,
                backgroundColor: barColor,
                transition: 'height 320ms cubic-bezier(0.16, 1, 0.3, 1), background-color 220ms ease',
              }}
              className="flex-1 min-w-[2px]"
            />
          );
        })}
      </div>

      {/* Interactive Slice Overlay Zones when showSliceMarkers is enabled */}
      {showSliceMarkers && slices && (
        <div className="absolute inset-0 z-20 flex">
          {slices.map((slice) => {
            const widthPct = (slice.endRatio - slice.startRatio) * 100;
            const isSelected = activeSliceIndex === slice.index;

            return (
              <button
                key={slice.code}
                type="button"
                onClick={() => onSelectSlice?.(slice.index)}
                style={{ width: `${widthPct}%` }}
                aria-label={`${slice.code}: ${slice.label}, ${slice.po33Slot}`}
                className={`group relative h-full border-r last:border-r-0 border-dashed border-[#FF6748]/70 text-left transition-colors focus-visible:z-30 ${
                  isSelected
                    ? 'bg-[#CBFF49]/10'
                    : 'hover:bg-[#F1EEE5]/5'
                }`}
              >
                <div
                  className={`inline-block px-1.5 py-0.5 font-mono-meta text-[11px] whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-[#CBFF49] text-[#111313] font-semibold'
                      : 'bg-[#111313]/90 text-[#F1EEE5]/80 group-hover:text-[#CBFF49]'
                  }`}
                >
                  {slice.code}
                </div>
                <div className="absolute bottom-1 left-1.5 font-mono-meta text-[10px] text-[#F1EEE5]/70 bg-[#111313]/85 px-1 whitespace-nowrap">
                  {slice.po33Slot}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
