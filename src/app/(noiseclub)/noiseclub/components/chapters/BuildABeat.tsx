"use client";

import React from 'react';
import { Play, Square, RotateCcw, Trash2, Volume2 } from 'lucide-react';
import { SOUND_SPECIMENS, SPECIMEN_MAP, SpecimenId } from '../../lib/audio/sampleLibrary';

interface BuildABeatProps {
  activeSpecimen: SpecimenId;
  pattern: boolean[][];
  isPlayingSequencer: boolean;
  currentStep: number;
  bpm: number;
  onTogglePlay: () => void;
  onToggleStep: (trackIndex: number, stepIndex: number) => void;
  onSwitchSpecimen: (id: SpecimenId) => void;
  onClearPattern: () => void;
  onResetDefaultPattern: () => void;
  onChangeBpm: (newBpm: number) => void;
  onAuditionTrackSlice: (sliceIndex: number) => void;
}

export const BuildABeat: React.FC<BuildABeatProps> = ({
  activeSpecimen,
  pattern,
  isPlayingSequencer,
  currentStep,
  bpm,
  onTogglePlay,
  onToggleStep,
  onSwitchSpecimen,
  onClearPattern,
  onResetDefaultPattern,
  onChangeBpm,
  onAuditionTrackSlice,
}) => {
  const spec = SPECIMEN_MAP[activeSpecimen];

  // Count active steps for live status readout
  const activeStepsCount = React.useMemo(() => {
    return pattern.reduce((sum, row) => sum + row.filter(Boolean).length, 0);
  }, [pattern]);

  return (
    <section
      id="build-a-beat"
      aria-labelledby="chapter-04-heading"
      className="relative py-20 sm:py-28 px-4 sm:px-8 border-b border-[#F1EEE5]/15"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Chapter Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-[#F1EEE5]/20">
          <div className="lg:col-span-7">
            <div className="font-mono-meta text-xs text-[#CBFF49] uppercase tracking-widest mb-3">
              04 / BUILD A BEAT · NC / RHYTHM LAB
            </div>
            <h2
              id="chapter-04-heading"
              className="font-display text-[clamp(2.5rem,5.5vw,5rem)] text-[#F1EEE5] uppercase leading-[0.92]"
              style={{ textWrap: 'balance' }}
            >
              SMALL MACHINE. BIG IDEAS.
            </h2>
          </div>
          <div className="lg:col-span-5 space-y-2">
            <p className="font-sans-body text-sm sm:text-base text-[#F1EEE5]/80 leading-relaxed">
              Sequence the four chopped slices of your selected field recording across a 16-step pattern. Switch between any of the five found-sound sources while your rhythm pattern stays locked in place.
            </p>
            <div className="font-mono-meta text-[11px] text-[#F1EEE5]/55">
              SIMPLIFIED INTERACTIVE DEMONSTRATION · NOT HARDWARE FIRMWARE EMULATION
            </div>
          </div>
        </div>

        {/* NC / RHYTHM LAB Console */}
        <div className="mt-10 bg-[#151818] border border-[#F1EEE5]/25 p-4 sm:p-8 space-y-6">
          {/* Top Transport & Specimen Switcher Bar */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 pb-6 border-b border-[#F1EEE5]/15">
            {/* Transport Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onTogglePlay}
                className={`nc-btn-interactive inline-flex items-center gap-2.5 px-6 py-3 font-mono-meta text-xs font-bold whitespace-nowrap shrink-0 ${
                  isPlayingSequencer
                    ? 'bg-[#FF6748] text-[#111313]'
                    : 'bg-[#CBFF49] text-[#111313] hover:bg-[#F1EEE5]'
                }`}
              >
                {isPlayingSequencer ? (
                  <>
                    <Square className="w-4 h-4 fill-current" />
                    <span>STOP SEQUENCER</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>PLAY 16-STEP LOOP</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onResetDefaultPattern}
                className="nc-btn-interactive inline-flex items-center gap-1.5 px-4 py-3 bg-[#1D2121] border border-[#F1EEE5]/25 text-[#F1EEE5] hover:border-[#CBFF49] font-mono-meta text-xs font-semibold whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>LOAD SPECIMEN GROOVE</span>
              </button>

              <button
                type="button"
                onClick={onClearPattern}
                className="nc-btn-interactive inline-flex items-center gap-1.5 px-4 py-3 bg-[#111313] border border-[#F1EEE5]/20 text-[#F1EEE5]/80 hover:border-[#FF6748] hover:text-[#FF6748] font-mono-meta text-xs whitespace-nowrap shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>CLEAR GRID</span>
              </button>

              {/* Tempo BPM Control */}
              <div className="flex items-center gap-2.5 px-3.5 py-2 bg-[#111313] border border-[#F1EEE5]/20">
                <label htmlFor="nc-bpm-slider" className="font-mono-meta text-xs text-[#F1EEE5]/80 whitespace-nowrap">
                  BPM <strong className="text-[#CBFF49]">{bpm}</strong>
                </label>
                <input
                  id="nc-bpm-slider"
                  type="range"
                  min={80}
                  max={150}
                  value={bpm}
                  onChange={(e) => onChangeBpm(Number(e.target.value))}
                  className="w-24 accent-[#CBFF49] cursor-pointer"
                />
              </div>
            </div>

            {/* Live Sequencer Telemetry Readout */}
            <div className="flex flex-wrap items-center gap-3 font-mono-meta text-xs text-[#F1EEE5]/75">
              <span>
                STATUS:{' '}
                <strong className={isPlayingSequencer ? 'text-[#CBFF49]' : 'text-[#F1EEE5]'}>
                  {isPlayingSequencer ? `RUNNING · STEP ${String(currentStep + 1).padStart(2, '0')}/16` : 'STANDBY'}
                </strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>ACTIVE TRIGGERS: {activeStepsCount}</span>
            </div>
          </div>

          {/* Sample Source Selector Bar (Preserves Current Pattern!) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F1EEE5]/15">
            <div className="font-mono-meta text-xs text-[#F1EEE5]/75">
              ACTIVE SAMPLE KIT (SWITCHING PRESERVES PATTERN):
            </div>
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Select sample source kit">
              {SOUND_SPECIMENS.map((item) => {
                const active = item.id === activeSpecimen;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSwitchSpecimen(item.id)}
                    className={`nc-btn-interactive px-3 py-1.5 font-mono-meta text-xs border whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#CBFF49] text-[#111313] border-[#CBFF49] font-bold'
                        : 'bg-[#111313] text-[#F1EEE5]/80 border-[#F1EEE5]/20 hover:border-[#F1EEE5]/50'
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 16-Step Playhead Ruler (Desktop 16-column alignment) */}
          <div className="hidden xl:grid xl:grid-cols-12 gap-4 items-center pt-1">
            <div className="xl:col-span-3 font-mono-meta text-[11px] text-[#F1EEE5]/55">
              SLICE CHANNEL / ROLE
            </div>
            <div className="xl:col-span-9 grid grid-cols-16 gap-1.5">
              {Array.from({ length: 16 }).map((_, stepIdx) => {
                const isPlayhead = isPlayingSequencer && currentStep === stepIdx;
                const isDownbeat = stepIdx % 4 === 0;
                return (
                  <div
                    key={stepIdx}
                    className={`text-center py-1 font-mono-meta text-[11px] border-b-2 transition-colors ${
                      isPlayhead
                        ? 'text-[#111313] bg-[#CBFF49] border-[#CBFF49] font-bold'
                        : isDownbeat
                        ? 'text-[#F1EEE5] border-[#F1EEE5]/40 font-semibold'
                        : 'text-[#F1EEE5]/50 border-[#F1EEE5]/10'
                    }`}
                  >
                    {String(stepIdx + 1).padStart(2, '0')}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4 Slice Tracks x 16 Steps Matrix */}
          <div className="space-y-4">
            {spec.slices.map((slice, trackIdx) => {
              const rowSteps = pattern[trackIdx] || Array(16).fill(false);

              return (
                <div
                  key={slice.code}
                  className="grid grid-cols-1 xl:grid-cols-12 gap-3 xl:gap-4 items-center p-3 sm:p-4 bg-[#111313] border border-[#F1EEE5]/15"
                >
                  {/* Track Header & Audition Button */}
                  <div className="xl:col-span-3 flex items-center justify-between gap-2">
                    <div>
                      <div className="font-mono-meta text-[11px] text-[#CBFF49]">
                        {slice.code} · {slice.role}
                      </div>
                      <div className="font-sans-body font-semibold text-sm text-[#F1EEE5]">
                        {slice.label}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onAuditionTrackSlice(trackIdx)}
                      aria-label={`Audition ${slice.label}`}
                      className="nc-btn-interactive p-2 bg-[#1A1E1E] border border-[#F1EEE5]/20 text-[#F1EEE5] hover:border-[#CBFF49] hover:text-[#CBFF49] shrink-0"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 16 Step Buttons: 8x2 two-row pattern layout on mobile/tablet, 16-col horizontal timeline on desktop */}
                  <div className="xl:col-span-9 grid grid-cols-8 xl:grid-cols-16 gap-1.5">
                    {rowSteps.map((isActive, stepIdx) => {
                      const isCurrentStep = isPlayingSequencer && currentStep === stepIdx;
                      const isBeatMarker = stepIdx % 4 === 0;

                      return (
                        <button
                          key={stepIdx}
                          type="button"
                          onClick={() => onToggleStep(trackIdx, stepIdx)}
                          aria-pressed={isActive}
                          aria-label={`${slice.label}, Step ${String(stepIdx + 1).padStart(2, '0')}, ${
                            isActive ? 'active' : 'inactive'
                          }`}
                          className={`nc-btn-interactive relative h-11 sm:h-12 flex flex-col items-center justify-between p-1.5 border font-mono-meta text-[10px] transition-all ${
                            isActive
                              ? isCurrentStep
                                ? 'bg-[#F1EEE5] text-[#111313] border-[#F1EEE5] font-bold'
                                : 'bg-[#CBFF49] text-[#111313] border-[#CBFF49] font-bold'
                              : isCurrentStep
                              ? 'bg-[#262B2B] text-[#CBFF49] border-[#CBFF49]'
                              : isBeatMarker
                              ? 'bg-[#191D1D] text-[#F1EEE5]/70 border-[#F1EEE5]/25 hover:border-[#F1EEE5]/60'
                              : 'bg-[#141717] text-[#F1EEE5]/45 border-[#F1EEE5]/12 hover:border-[#F1EEE5]/45'
                          }`}
                        >
                          <span>{String(stepIdx + 1).padStart(2, '0')}</span>
                          <span
                            className={`w-full h-1.5 ${
                              isActive
                                ? 'bg-[#111313]'
                                : isCurrentStep
                                ? 'bg-[#CBFF49]'
                                : 'bg-[#F1EEE5]/15'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
