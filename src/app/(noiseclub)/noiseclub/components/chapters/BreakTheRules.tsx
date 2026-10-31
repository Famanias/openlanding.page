"use client";

import React, { useState } from 'react';
import { Volume2, Repeat, Rewind, Sliders } from 'lucide-react';
import { EffectMode } from '../../lib/audio/audioEngine';
import { SPECIMEN_MAP, SpecimenId } from '../../lib/audio/sampleLibrary';
import { Waveform } from '../interactive/Waveform';

interface BreakTheRulesProps {
  activeSpecimen: SpecimenId;
  amplitudes: number[];
  onTriggerEffect: (effect: EffectMode) => void;
  onPlayDry: () => void;
}

interface EffectSpec {
  id: EffectMode;
  po33Code: string;
  title: string;
  subtitle: string;
  description: string;
  visualTransformationNote: string;
}

const EFFECTS: EffectSpec[] = [
  {
    id: 'stutter',
    po33Code: 'FX 09 / 10 · STUTTER',
    title: 'Stutter Repeat',
    subtitle: 'Rapid 1/16th grain loop re-triggering',
    description:
      'Slices the transient attack and repeats it in tight machine-gun subdivisions synced to the master tempo clock.',
    visualTransformationNote: 'GEOMETRY: SUBDIVIDED GATED SAMPLE BLOCKS (8X REPEAT)',
  },
  {
    id: 'reverse',
    po33Code: 'FX 11 · REVERSE',
    title: 'Reverse Envelope',
    subtitle: 'Inverted buffer playback direction',
    description:
      'Flips the recorded sample buffer end-to-start so decaying harmonic tails swell upward into a sharp transient cutoff.',
    visualTransformationNote: 'GEOMETRY: TIME-INVERTED AMPLITUDE FINGERPRINT',
  },
  {
    id: 'octave',
    po33Code: 'FX 05 / 06 · OCTAVE',
    title: 'Octave Pitch Shift',
    subtitle: 'Sub-bass 0.5x & harmonic 2.0x resynthesis',
    description:
      'Drops an ordinary knock down an octave into sub-bass weight or doubles its playback rate into crisp harmonic percussion.',
    visualTransformationNote: 'GEOMETRY: DUAL-DENSITY HARMONIC INTERLEAVING',
  },
];

export const BreakTheRules: React.FC<BreakTheRulesProps> = ({
  activeSpecimen,
  amplitudes,
  onTriggerEffect,
  onPlayDry,
}) => {
  const spec = SPECIMEN_MAP[activeSpecimen];
  const [selectedEffect, setSelectedEffect] = useState<EffectMode>('stutter');
  const [isAuditioningFx, setIsAuditioningFx] = useState(false);

  const activeFxSpec = EFFECTS.find((e) => e.id === selectedEffect) || EFFECTS[0];

  const handleSelectAndPlayFx = (effect: EffectMode) => {
    setSelectedEffect(effect);
    setIsAuditioningFx(true);
    onTriggerEffect(effect);
    window.setTimeout(() => setIsAuditioningFx(false), 1100);
  };

  return (
    <section
      id="break-the-rules"
      aria-labelledby="chapter-05-heading"
      className="relative py-20 sm:py-28 px-4 sm:px-8 border-b border-[#F1EEE5]/15"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Chapter Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#F1EEE5]/20">
          <div className="lg:col-span-7">
            <div className="font-mono-meta text-xs text-[#CBFF49] uppercase tracking-widest mb-3">
              05 / BREAK THE RULES · PUNCH-IN PERFORMANCE EFFECTS
            </div>
            <h2
              id="chapter-05-heading"
              className="font-display text-[clamp(2.5rem,5.5vw,5rem)] text-[#F1EEE5] uppercase leading-[0.92]"
              style={{ textWrap: 'balance' }}
            >
              BREAK THE RULES.
            </h2>
          </div>
          <div className="lg:col-span-5 space-y-2">
            <p className="font-sans-body text-sm sm:text-base text-[#F1EEE5]/80 leading-relaxed">
              The PO-33 includes 16 punch-in performance effects that mutate your pattern on the fly. Select any of the three live DSP processors below to hear and see how your captured sound transforms.
            </p>
          </div>
        </div>

        {/* Interactive FX Playground */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 5 Columns: 3 Mutually Coherent Effect Selectors */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3" role="radiogroup" aria-label="Select punch-in audio effect">
              {EFFECTS.map((fx) => {
                const isSelected = selectedEffect === fx.id;
                const Icon =
                  fx.id === 'stutter' ? Repeat : fx.id === 'reverse' ? Rewind : Sliders;

                return (
                  <button
                    key={fx.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelectAndPlayFx(fx.id)}
                    className={`nc-btn-interactive w-full text-left p-5 border transition-all ${
                      isSelected
                        ? 'bg-[#191E16] border-[#CBFF49]'
                        : 'bg-[#141717] border-[#F1EEE5]/15 hover:border-[#F1EEE5]/45'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 font-mono-meta text-xs mb-2">
                      <span className={isSelected ? 'text-[#CBFF49] font-bold' : 'text-[#F1EEE5]/70'}>
                        {fx.po33Code}
                      </span>
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-[#CBFF49]' : 'text-[#F1EEE5]/50'}`} />
                    </div>
                    <div className="font-display text-2xl sm:text-3xl text-[#F1EEE5] uppercase mb-1">
                      {fx.title}
                    </div>
                    <p className="font-sans-body text-xs sm:text-sm text-[#F1EEE5]/75 leading-relaxed">
                      {fx.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="p-4 bg-[#141717] border border-[#F1EEE5]/15 font-mono-meta text-xs text-[#F1EEE5]/70">
              VERIFIED HARDWARE NOTE: THE REAL PO-33 K.O! FEATURES 16 PUNCH-IN EFFECTS INCLUDING LOOP, STUTTER, OCTAVE UP/DOWN, REVERSE, SCRATCH, RETRIGGER, AND FILTER SWEEPS.
            </div>
          </div>

          {/* Right 7 Columns: Large Live Waveform Transformation Stage */}
          <div className="lg:col-span-7 bg-[#151818] border border-[#F1EEE5]/20 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F1EEE5]/15 pb-4 font-mono-meta text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#CBFF49] font-semibold">ACTIVE DSP STAGE:</span>
                <span className="text-[#F1EEE5]">{activeFxSpec.title.toUpperCase()}</span>
              </div>
              <span className="text-[#F1EEE5]/65">{activeFxSpec.visualTransformationNote}</span>
            </div>

            {/* Transformed Waveform Display */}
            <div className="p-6 bg-[#0B0D0D] border border-[#F1EEE5]/20 space-y-4">
              <div className="flex items-center justify-between font-mono-meta text-xs text-[#F1EEE5]/65">
                <span>INPUT: {spec.title.toUpperCase()}</span>
                <span className="text-[#CBFF49]">MODE: {selectedEffect.toUpperCase()}</span>
              </div>

              <Waveform
                amplitudes={amplitudes}
                effectMode={selectedEffect}
                isPlaying={isAuditioningFx}
                accentColor="acid"
                heightClass="h-44 sm:h-52"
              />

              <div className="pt-3 border-t border-[#F1EEE5]/15 flex flex-wrap items-center justify-between gap-2 font-mono-meta text-[11px] text-[#F1EEE5]/60">
                <span>
                  {selectedEffect === 'reverse'
                    ? '1.00 (END) ← INVERTED PLAYHEAD ← 0.00 (START)'
                    : selectedEffect === 'stutter'
                    ? 'GRAIN 01 · GRAIN 02 · GRAIN 03 · GRAIN 04 · GRAIN 05 · GRAIN 06 · GRAIN 07 · GRAIN 08'
                    : '0.5X SUB-OCTAVE FUNDAMENTAL + 1.85X UPPER HARMONIC LAYER'}
                </span>
                <span>WEB AUDIO API DSP</span>
              </div>
            </div>

            {/* Explicit Audition Buttons (Transformed vs Dry Original) */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectAndPlayFx(selectedEffect)}
                  className="nc-btn-interactive inline-flex items-center gap-2 px-6 py-3.5 bg-[#CBFF49] text-[#111313] hover:bg-[#F1EEE5] font-mono-meta text-xs font-bold whitespace-nowrap shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>AUDITION {selectedEffect.toUpperCase()} EFFECT</span>
                </button>

                <button
                  type="button"
                  onClick={onPlayDry}
                  className="nc-btn-interactive inline-flex items-center gap-2 px-5 py-3.5 bg-[#111313] border border-[#F1EEE5]/25 text-[#F1EEE5] hover:border-[#CBFF49] font-mono-meta text-xs font-semibold whitespace-nowrap shrink-0"
                >
                  <span>COMPARE DRY ORIGINAL</span>
                </button>
              </div>

              <div className="font-mono-meta text-xs text-[#F1EEE5]/60">
                HOLD [FX] + [PAD 01–16] ON PO-33
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
