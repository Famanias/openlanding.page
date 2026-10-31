"use client";

import React from 'react';
import { ArrowDownRight, Volume2 } from 'lucide-react';
import { SPECIMEN_MAP, SpecimenId } from '../../lib/audio/sampleLibrary';
import { PO33HardwareIllustration } from '../interactive/PO33HardwareIllustration';
import { Waveform } from '../interactive/Waveform';

interface TheSignalProps {
  activeSpecimen: SpecimenId;
  amplitudes: number[];
  isPlayingAudio: boolean;
  onAuditionHeroSample: () => void;
  onTriggerHardwarePad: (padNumber: number) => void;
  onNavigate: (sectionId: string) => void;
}

export const TheSignal: React.FC<TheSignalProps> = ({
  activeSpecimen,
  amplitudes,
  isPlayingAudio,
  onAuditionHeroSample,
  onTriggerHardwarePad,
  onNavigate,
}) => {
  const spec = SPECIMEN_MAP[activeSpecimen];

  return (
    <section
      id="the-signal"
      aria-labelledby="hero-heading"
      className="relative min-h-[92vh] pt-6 pb-20 sm:pt-10 sm:pb-28 px-4 sm:px-8 border-b border-[#F1EEE5]/15"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Top Archival Issue Strip — Clean unboxed metadata with typographic separators */}
        <div
          data-anim="hero-meta"
          className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#F1EEE5]/20 font-mono-meta text-xs text-[#F1EEE5]/75"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#CBFF49] font-semibold">NOISE CLUB / NC—001</span>
            <span aria-hidden="true">·</span>
            <span>FIELD NOTE / 033</span>
            <span aria-hidden="true">·</span>
            <span>SOUND CULTURE DEPARTMENT</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#FF6748] font-semibold">REC 00:04</span>
            <span aria-hidden="true">·</span>
            <span>FEATURED INSTRUMENT: TEENAGE ENGINEERING PO-33 K.O!</span>
          </div>
        </div>

        {/* Main Editorial Poster Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left 7 Columns: Oversized Typographic Poster & Narrative Fingerprint */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div>
              <div
                data-anim="hero-kicker"
                className="font-mono-meta text-xs uppercase tracking-widest text-[#CBFF49] mb-4"
              >
                00 / THE SIGNAL · ORDINARY NOISES ARE UNFINISHED MUSIC
              </div>

              <h1
                id="hero-heading"
                data-anim="hero-headline"
                className="font-display text-[clamp(3.4rem,8.4vw,7.5rem)] leading-[0.9] tracking-tight text-[#F1EEE5] uppercase"
                style={{ textWrap: 'balance' }}
              >
                <span className="inline-block overflow-hidden mr-3">
                  <span data-anim="hero-word" className="inline-block">THE</span>
                </span>
                <span className="inline-block overflow-hidden mr-3">
                  <span data-anim="hero-word" className="inline-block">WORLD</span>
                </span>
                <span className="inline-block overflow-hidden mr-3">
                  <span data-anim="hero-word" className="inline-block">IS</span>
                </span>
                <span className="inline-block overflow-hidden mr-3">
                  <span data-anim="hero-word" className="inline-block">YOUR</span>
                </span>
                <span className="inline-block overflow-hidden mr-3 text-[#CBFF49]">
                  <span data-anim="hero-word" className="inline-block">SAMPLE</span>
                </span>
                <span className="inline-block overflow-hidden text-[#CBFF49]">
                  <span data-anim="hero-word" className="inline-block">PACK.</span>
                </span>
              </h1>
            </div>

            {/* Editorial Lead & Primary Actions */}
            <div data-anim="hero-copy" className="max-w-xl space-y-6">
              <p className="font-sans-body text-base sm:text-lg text-[#F1EEE5]/85 leading-relaxed">
                A subway door pneumatic release. A spoon striking thick cafe porcelain. Rain hitting a corrugated zinc roof. With 40 seconds of 8-bit sample memory and a built-in microphone in your pocket, every street corner is a recording studio.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('hear-everything')}
                  className="group nc-btn-interactive inline-flex items-center gap-3 px-6 py-3.5 bg-[#CBFF49] text-[#111313] hover:bg-[#F1EEE5] font-sans-body text-sm font-bold tracking-wide whitespace-nowrap shrink-0"
                >
                  <span>EXPLORE THE NOISE</span>
                  <ArrowDownRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('take-the-noise')}
                  className="nc-btn-interactive inline-flex items-center gap-2 px-5 py-3.5 border border-[#F1EEE5]/35 text-[#F1EEE5] hover:border-[#CBFF49] hover:text-[#CBFF49] font-sans-body text-sm font-semibold whitespace-nowrap shrink-0"
                >
                  <span>VIEW THE PO-33</span>
                </button>
              </div>
            </div>

            {/* Original Sound Fingerprint Graphic Narrative Cue */}
            <div
              data-anim="hero-fingerprint"
              className="pt-6 border-t border-[#F1EEE5]/20 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono-meta text-xs">
                <div className="flex items-center gap-2 text-[#F1EEE5]/80">
                  <span className="text-[#CBFF49] font-semibold">SIGNAL FINGERPRINT</span>
                  <span aria-hidden="true">·</span>
                  <span>{spec.catalogId}</span>
                  <span aria-hidden="true">·</span>
                  <span>{spec.title.toUpperCase()}</span>
                </div>
                <button
                  type="button"
                  onClick={onAuditionHeroSample}
                  className="nc-btn-interactive inline-flex items-center gap-1.5 px-3 py-1 bg-[#1A1D1D] border border-[#F1EEE5]/25 text-[#F1EEE5] hover:border-[#CBFF49] hover:text-[#CBFF49] font-mono-meta text-xs whitespace-nowrap shrink-0"
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#CBFF49]" />
                  <span>{isPlayingAudio ? 'PLAYING SIGNAL...' : `AUDITION RAW SIGNAL (${spec.durationLabel})`}</span>
                </button>
              </div>

              <div className="p-4 bg-[#161919] border border-[#F1EEE5]/15">
                <Waveform
                  amplitudes={amplitudes}
                  isPlaying={isPlayingAudio}
                  accentColor="acid"
                  heightClass="h-20 sm:h-24"
                />
                <div className="mt-2 flex items-center justify-between font-mono-meta text-[11px] text-[#F1EEE5]/55">
                  <span>00:00.00</span>
                  <span>{spec.sampleRateLabel} · {spec.po33Bank}</span>
                  <span>{spec.durationLabel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Accurate PO-33 K.O! Physical Anchor Intersecting Poster */}
          <div
            data-anim="hero-product"
            className="lg:col-span-5 relative flex flex-col items-center"
          >
            <div className="w-full relative p-4 sm:p-6 bg-[#151818] border border-[#F1EEE5]/20 nc-cut-corner">
              <div className="flex items-center justify-between mb-3 font-mono-meta text-xs text-[#F1EEE5]/70">
                <span>HARDWARE SPECIMEN · PO-33 K.O!</span>
                <span className="text-[#CBFF49]">TAP ANY PAD 01–16 TO AUDITION</span>
              </div>

              <PO33HardwareIllustration
                mode="hero"
                activeSpecimen={activeSpecimen}
                isPlaying={isPlayingAudio}
                onTriggerPad={onTriggerHardwarePad}
              />

              {/* Grounded Editorial Stamp Footer */}
              <div className="mt-4 pt-3 border-t border-[#F1EEE5]/15 flex flex-wrap items-center justify-between gap-2 font-mono-meta text-[11px] text-[#F1EEE5]/65">
                <span>BUILT-IN MIC · 40S SAMPLE MEMORY</span>
                <span>8 MELODIC · 8 DRUM · 16 FX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
