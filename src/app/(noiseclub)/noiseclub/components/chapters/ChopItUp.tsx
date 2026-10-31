"use client";

import React, { useState } from 'react';
import { Scissors, Volume2, ArrowRight } from 'lucide-react';
import { SPECIMEN_MAP, SpecimenId } from '../../lib/audio/sampleLibrary';
import { Waveform } from '../interactive/Waveform';

interface ChopItUpProps {
  activeSpecimen: SpecimenId;
  amplitudes: number[];
  onAuditionSlice: (sliceIndex: number) => void;
  onNavigateToSequencer: () => void;
}

export const ChopItUp: React.FC<ChopItUpProps> = ({
  activeSpecimen,
  amplitudes,
  onAuditionSlice,
  onNavigateToSequencer,
}) => {
  const spec = SPECIMEN_MAP[activeSpecimen];
  const [selectedSlice, setSelectedSlice] = useState<number>(0);
  const [bankExplanationMode, setBankExplanationMode] = useState<'drum' | 'melodic'>('drum');

  const handleSliceTrigger = (idx: number) => {
    setSelectedSlice(idx);
    onAuditionSlice(idx);
  };

  return (
    <section
      id="chop-it-up"
      aria-labelledby="chapter-03-heading"
      className="relative py-20 sm:py-28 px-4 sm:px-8 border-b border-[#F1EEE5]/15"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Chapter Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#F1EEE5]/20">
          <div className="lg:col-span-7">
            <div className="font-mono-meta text-xs text-[#CBFF49] uppercase tracking-widest mb-3">
              03 / CHOP IT UP · MAGNETIC TAPE SLICING & SLOT ASSIGNMENT
            </div>
            <h2
              id="chapter-03-heading"
              className="font-display text-[clamp(2.5rem,5.5vw,5rem)] text-[#F1EEE5] uppercase leading-[0.92]"
              style={{ textWrap: 'balance' }}
            >
              ONE SOUND. FOUR RHYTHMIC WEAPONS.
            </h2>
          </div>
          <div className="lg:col-span-5 space-y-2">
            <p className="font-sans-body text-sm sm:text-base text-[#F1EEE5]/80 leading-relaxed">
              A single 1.6-second field recording contains an entire percussion kit. By setting start and end trim points with Knobs A and B, one raw recording splits into a low kick transient, a metallic snare snap, a textured hat pulse, and a tonal tail.
            </p>
          </div>
        </div>

        {/* Magnetic Tape Strip Waveform Slicer */}
        <div className="mt-12 bg-[#151818] border border-[#F1EEE5]/20 p-5 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F1EEE5]/15 pb-4">
            <div className="flex flex-wrap items-center gap-2 font-mono-meta text-xs">
              <span className="text-[#CBFF49] font-semibold">MAGNETIC TAPE STRIP</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#F1EEE5]">{spec.catalogId}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#F1EEE5]/70">{spec.title.toUpperCase()}</span>
            </div>
            <div className="font-mono-meta text-xs text-[#FF6748] flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5" />
              <span>CLICK ANY SLICE MARKER [01–04] TO ISOLATE & AUDITION</span>
            </div>
          </div>

          {/* Interactive Tape Strip with Slice Regions */}
          <div className="p-4 sm:p-6 bg-[#0B0D0D] border border-[#F1EEE5]/20">
            <Waveform
              amplitudes={amplitudes}
              slices={spec.slices}
              activeSliceIndex={selectedSlice}
              onSelectSlice={handleSliceTrigger}
              showSliceMarkers={true}
              heightClass="h-36 sm:h-44"
            />
            {/* Timecode ruler underneath tape strip */}
            <div className="mt-3 pt-2 border-t border-[#F1EEE5]/15 flex items-center justify-between font-mono-meta text-[11px] text-[#F1EEE5]/55">
              <span>0.00s (START)</span>
              <span>{(spec.durationSec * 0.25).toFixed(2)}s</span>
              <span>{(spec.durationSec * 0.5).toFixed(2)}s</span>
              <span>{(spec.durationSec * 0.75).toFixed(2)}s</span>
              <span>{spec.durationSec.toFixed(2)}s (END)</span>
            </div>
          </div>

          {/* 4 Discreet Chopped Slice Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {spec.slices.map((slice) => {
              const isSelected = selectedSlice === slice.index;
              const startBar = Math.floor(slice.startRatio * amplitudes.length);
              const endBar = Math.max(startBar + 4, Math.floor(slice.endRatio * amplitudes.length));
              const sliceBars = amplitudes.slice(startBar, endBar);

              return (
                <div
                  key={slice.code}
                  className={`flex flex-col justify-between p-4 border transition-all ${
                    isSelected
                      ? 'bg-[#1B2018] border-[#CBFF49]'
                      : 'bg-[#111313] border-[#F1EEE5]/15 hover:border-[#F1EEE5]/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 font-mono-meta text-xs mb-2">
                      <span className={isSelected ? 'text-[#CBFF49] font-bold' : 'text-[#F1EEE5]/80'}>
                        {slice.code} · {slice.role}
                      </span>
                      <span className="text-[#F1EEE5]/55">{slice.po33Slot}</span>
                    </div>

                    <div className="font-sans-body font-semibold text-base text-[#F1EEE5] mb-3">
                      {slice.label}
                    </div>

                    <div className="p-2.5 bg-[#0B0C0C] border border-[#F1EEE5]/10 mb-4">
                      <Waveform
                        amplitudes={sliceBars}
                        isPlaying={isSelected}
                        accentColor={isSelected ? 'acid' : 'bone'}
                        heightClass="h-12"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSliceTrigger(slice.index)}
                    className={`nc-btn-interactive w-full inline-flex items-center justify-center gap-2 px-3 py-2 font-mono-meta text-xs font-semibold whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#CBFF49] text-[#111313]'
                        : 'bg-[#1A1E1E] text-[#F1EEE5] border border-[#F1EEE5]/20 hover:border-[#CBFF49]'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>AUDITION {slice.code}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verified PO-33 Slot Architecture Comparison: Melodic 01-08 vs Drum 09-16 */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#141717] border border-[#F1EEE5]/15 p-6">
          <div className="lg:col-span-5 space-y-2">
            <div className="font-mono-meta text-xs text-[#CBFF49]">
              HARDWARE ARCHITECTURE TRUTH · 16 SAMPLE SLOTS
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-[#F1EEE5] uppercase">
              MELODIC SLOTS [01–08] VS. DRUM SLOTS [09–16]
            </h3>
            <p className="font-sans-body text-xs sm:text-sm text-[#F1EEE5]/75 leading-relaxed">
              The PO-33 divides its 16 sample slots into two distinct behaviors. Toggle between modes to inspect how the hardware maps your recorded sound across the 16 pads.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="PO-33 Slot Bank Architecture">
              <button
                type="button"
                role="tab"
                aria-selected={bankExplanationMode === 'drum'}
                onClick={() => setBankExplanationMode('drum')}
                className={`nc-btn-interactive px-4 py-2 font-mono-meta text-xs font-semibold border whitespace-nowrap shrink-0 ${
                  bankExplanationMode === 'drum'
                    ? 'bg-[#CBFF49] text-[#111313] border-[#CBFF49]'
                    : 'bg-[#111313] text-[#F1EEE5]/80 border-[#F1EEE5]/25'
                }`}
              >
                DRUM SLOTS [09–16] · AUTO-SLICED KIT
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={bankExplanationMode === 'melodic'}
                onClick={() => setBankExplanationMode('melodic')}
                className={`nc-btn-interactive px-4 py-2 font-mono-meta text-xs font-semibold border whitespace-nowrap shrink-0 ${
                  bankExplanationMode === 'melodic'
                    ? 'bg-[#CBFF49] text-[#111313] border-[#CBFF49]'
                    : 'bg-[#111313] text-[#F1EEE5]/80 border-[#F1EEE5]/25'
                }`}
              >
                MELODIC SLOTS [01–08] · CHROMATIC SCALE
              </button>
            </div>

            {bankExplanationMode === 'drum' ? (
              <div className="p-4 bg-[#111313] border border-[#F1EEE5]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-mono-meta text-xs text-[#FF6748] font-semibold">
                    SLOTS 09–16: 16-SLICE DRUM RACK
                  </div>
                  <p className="font-sans-body text-xs text-[#F1EEE5]/80 max-w-xl leading-relaxed">
                    Recording into slots 9–16 automatically chops your sample across buttons 1–16, letting you fine-tune individual slice start points and lengths for instant finger-drumming.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onNavigateToSequencer}
                  className="nc-btn-interactive inline-flex items-center gap-2 px-4 py-2.5 bg-[#F1EEE5] text-[#111313] hover:bg-[#CBFF49] font-mono-meta text-xs font-bold whitespace-nowrap shrink-0"
                >
                  <span>SEQUENCE THESE SLICES</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="p-4 bg-[#111313] border border-[#F1EEE5]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-mono-meta text-xs text-[#CBFF49] font-semibold">
                    SLOTS 01–08: CHROMATIC MELODIC KEYBOARD
                  </div>
                  <p className="font-sans-body text-xs text-[#F1EEE5]/80 max-w-xl leading-relaxed">
                    Recording a resonant sound (like our Ceramic Cup or Brass Coin) into slots 1–8 pitches the sample across a two-octave musical scale on buttons 1–16 so you can play basslines and chords.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onNavigateToSequencer}
                  className="nc-btn-interactive inline-flex items-center gap-2 px-4 py-2.5 bg-[#F1EEE5] text-[#111313] hover:bg-[#CBFF49] font-mono-meta text-xs font-bold whitespace-nowrap shrink-0"
                >
                  <span>LOAD INTO RHYTHM LAB</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
