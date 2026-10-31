"use client";

import React from 'react';
import { Volume2, Check } from 'lucide-react';
import { SOUND_SPECIMENS, SpecimenId } from '../../lib/audio/sampleLibrary';
import { SpecimenVisual } from '../interactive/SpecimenVisual';
import { Waveform } from '../interactive/Waveform';

interface HearEverythingProps {
  activeSpecimen: SpecimenId;
  playingSpecimenId: SpecimenId | null;
  getWaveform: (id: SpecimenId) => number[];
  onSelectSpecimen: (id: SpecimenId, playAudio: boolean) => void;
}

export const HearEverything: React.FC<HearEverythingProps> = ({
  activeSpecimen,
  playingSpecimenId,
  getWaveform,
  onSelectSpecimen,
}) => {
  return (
    <section
      id="hear-everything"
      aria-labelledby="chapter-01-heading"
      className="relative py-20 sm:py-28 px-4 sm:px-8 border-b border-[#F1EEE5]/15"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Chapter Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#F1EEE5]/20">
          <div className="lg:col-span-7">
            <div className="font-mono-meta text-xs text-[#CBFF49] uppercase tracking-widest mb-3">
              01 / HEAR EVERYTHING · FIELD RECORDING SPECIMENS
            </div>
            <h2
              id="chapter-01-heading"
              className="font-display text-[clamp(2.5rem,5.5vw,5rem)] text-[#F1EEE5] uppercase leading-[0.92]"
              style={{ textWrap: 'balance' }}
            >
              NOTHING IS JUST NOISE.
            </h2>
          </div>
          <div className="lg:col-span-5 space-y-2">
            <p className="font-sans-body text-sm sm:text-base text-[#F1EEE5]/80 leading-relaxed">
              Every metallic clank, ceramic ring, or boot stomp carries a transient attack and a resonant body. Select any field specimen below to inspect its acoustic fingerprint and route it into the PO-33 signal chain.
            </p>
            <div className="font-mono-meta text-xs text-[#F1EEE5]/60">
              SELECT A SPECIMEN TO AUDITION AUDIO & ROUTE TO CHAPTER 02
            </div>
          </div>
        </div>

        {/* Asymmetric Editorial Contact Sheet of 5 Found-Sound Specimens */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {SOUND_SPECIMENS.map((spec, idx) => {
            const isSelected = activeSpecimen === spec.id;
            const isPlaying = playingSpecimenId === spec.id;
            const colSpan =
              idx === 0
                ? 'lg:col-span-6'
                : idx === 1
                ? 'lg:col-span-6'
                : 'lg:col-span-4';

            return (
              <article
                key={spec.id}
                data-anim="specimen-plate"
                className={`${colSpan} flex flex-col justify-between border transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#171B1A] border-[#CBFF49] opacity-100'
                    : 'bg-[#131616] border-[#F1EEE5]/15 opacity-75 hover:opacity-100 hover:border-[#F1EEE5]/40'
                }`}
              >
                <div>
                  {/* Top Archival Specimen Metadata Bar */}
                  <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-[#F1EEE5]/15 font-mono-meta text-xs">
                    <div className="flex items-center gap-2 text-[#F1EEE5]/80">
                      <span className={isSelected ? 'text-[#CBFF49] font-semibold' : ''}>
                        {spec.catalogId}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{spec.durationLabel}</span>
                    </div>
                    <span className="text-[#F1EEE5]/60">{spec.po33Bank}</span>
                  </div>

                  {/* Interactive Contact-Sheet Image Plate */}
                  <div
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    aria-label={`Select and audition ${spec.title}`}
                    onClick={() => onSelectSpecimen(spec.id, true)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectSpecimen(spec.id, true);
                      }
                    }}
                    className="cursor-pointer group relative"
                  >
                    <SpecimenVisual
                      id={spec.id}
                      isSelected={isSelected}
                      isPlaying={isPlaying}
                      className="h-52 sm:h-60 w-full border-b border-[#F1EEE5]/15"
                    />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2 py-1 bg-[#111313]/90 font-mono-meta text-[11px] text-[#F1EEE5]/85">
                        {spec.location}
                      </span>
                      {isSelected && (
                        <span className="px-2 py-1 bg-[#CBFF49] text-[#111313] font-mono-meta text-[11px] font-bold">
                          ACTIVE SOURCE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Specimen Title & Description */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display text-2xl sm:text-3xl text-[#F1EEE5] tracking-wide uppercase">
                        {spec.title}
                      </h3>
                      <span className="font-mono-meta text-xs text-[#F1EEE5]/60 shrink-0">
                        PEAK {spec.peakDb}
                      </span>
                    </div>
                    <p className="font-sans-body text-xs sm:text-sm text-[#F1EEE5]/75 leading-relaxed">
                      {spec.description}
                    </p>
                  </div>
                </div>

                {/* Representative Waveform & Explicit User-Initiated Audition Control */}
                <div className="px-5 pb-5 pt-2 space-y-4">
                  <div className="p-3 bg-[#0E1010] border border-[#F1EEE5]/10">
                    <Waveform
                      amplitudes={getWaveform(spec.id)}
                      isPlaying={isPlaying}
                      accentColor={isSelected ? 'acid' : 'bone'}
                      heightClass="h-14"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectSpecimen(spec.id, true)}
                      className={`nc-btn-interactive flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 font-mono-meta text-xs font-semibold whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#CBFF49] text-[#111313]'
                          : 'bg-[#1D2121] text-[#F1EEE5] border border-[#F1EEE5]/25 hover:border-[#CBFF49]'
                      }`}
                    >
                      <Volume2 className="w-4 h-4 shrink-0" />
                      <span>
                        {isPlaying
                          ? 'PLAYING SAMPLE...'
                          : isSelected
                          ? 'AUDITION SELECTED SOURCE'
                          : 'SELECT & AUDITION'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectSpecimen(spec.id, false)}
                      aria-label={`Route ${spec.title} silently without playing audio`}
                      className="nc-btn-interactive px-3 py-2.5 bg-[#141717] border border-[#F1EEE5]/20 text-[#F1EEE5]/75 hover:text-[#F1EEE5] font-mono-meta text-xs whitespace-nowrap shrink-0"
                    >
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 text-[#CBFF49]">
                          <Check className="w-3.5 h-3.5" /> ROUTED
                        </span>
                      ) : (
                        'ROUTE SILENT'
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Continuity Signal Thread Handoff to Chapter 02 */}
        <div className="mt-12 pt-8 border-t border-[#F1EEE5]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono-meta text-xs text-[#F1EEE5]/75">
          <div className="flex items-center gap-3">
            <span className="text-[#CBFF49] font-semibold">SIGNAL CONTINUITY BUS →</span>
            <span>
              ROUTING [{SOUND_SPECIMENS.find((s) => s.id === activeSpecimen)?.catalogId}] INTO PO-33 ELECTRET MIC INPUT
            </span>
          </div>
          <span className="text-[#F1EEE5]/55">CHAPTER 02 / CAPTURE IT ↓</span>
        </div>
      </div>
    </section>
  );
};
