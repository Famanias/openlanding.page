<template slug="noiseclub" name="NOISE CLUB">
  <dependencies>
    {
      "dependencies": {
        "gsap": "^3.15.0",
        "lenis": "^1.3.27",
        "lucide-react": "0.475.0"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(noiseclub)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import { Anton, IBM_Plex_Mono, Public_Sans } from "next/font/google";
import "./noiseclub/noiseclub.css";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const body = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-public-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "NOISE CLUB® — NC-001 / The World Is Your Sample Pack",
  description:
    "Ordinary noises are unfinished music. An interactive sound-culture publication featuring the Teenage Engineering PO-33 K.O! micro-sampler.",
  icons: { icon: "/templates/noiseclub/icon.svg" },
};

export default function NoiseClubLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark scroll-smooth ${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="nc-body bg-[#111313] text-[#F1EEE5] antialiased selection:bg-[#CBFF49] selection:text-[#111313] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(noiseclub)/noiseclub/App.tsx">
<![CDATA["use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useCallback } from 'react';
import { audioEngine, EffectMode } from './lib/audio/audioEngine';
import { SPECIMEN_MAP, SpecimenId } from './lib/audio/sampleLibrary';
import { Header } from './components/layout/Header';
import { SiteFooter } from './components/layout/SiteFooter';
import { TheSignal } from './components/chapters/TheSignal';
import { HearEverything } from './components/chapters/HearEverything';
import { CaptureIt } from './components/chapters/CaptureIt';
import { ChopItUp } from './components/chapters/ChopItUp';
import { BuildABeat } from './components/chapters/BuildABeat';
import { BreakTheRules } from './components/chapters/BreakTheRules';
import { TakeTheNoise } from './components/chapters/TakeTheNoise';
import { ScrollOrchestrator } from './components/motion/ScrollOrchestrator';

export default function App() {
  const [activeSpecimen, setActiveSpecimen] = useState<SpecimenId>('subway');
  const [playingSpecimenId, setPlayingSpecimenId] = useState<SpecimenId | null>(null);
  const [isUsingCustomMic, setIsUsingCustomMic] = useState<boolean>(false);
  const [customWaveform, setCustomWaveform] = useState<number[] | null>(null);

  // Sequencer state synchronized with audioEngine
  const [pattern, setPattern] = useState<boolean[][]>(() =>
    audioEngine.getSequencerPattern()
  );
  const [isPlayingSequencer, setIsPlayingSequencer] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [bpm, setBpm] = useState<number>(116);

  useEffect(() => {
    const unsubscribe = audioEngine.subscribeSequencer((step, playing) => {
      setCurrentStep(step);
      setIsPlayingSequencer(playing);
    });
    return () => {
      unsubscribe();
      audioEngine.stopSequencer();
      audioEngine.stopAllActiveSounds();
    };
  }, []);

  const getSpecimenWaveform = useCallback(
    (id: SpecimenId): number[] => {
      if (isUsingCustomMic && customWaveform && id === activeSpecimen) {
        return customWaveform;
      }
      return audioEngine.getWaveform(id);
    },
    [isUsingCustomMic, customWaveform, activeSpecimen]
  );

  const activeAmplitudes = getSpecimenWaveform(activeSpecimen);

  const handleNavigate = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Audition full specimen
  const handlePlaySpecimen = (id: SpecimenId) => {
    setPlayingSpecimenId(id);
    audioEngine.playSpecimen(id, {
      useCustomIfActive: id === activeSpecimen && isUsingCustomMic,
      onEnded: () => {
        setPlayingSpecimenId((prev) => (prev === id ? null : prev));
      },
    });
  };

  // Select specimen in Chapter 01 (and optionally audition it)
  const handleSelectSpecimen = (id: SpecimenId, playAudio: boolean) => {
    setActiveSpecimen(id);
    audioEngine.setSequencerSpecimen(id);
    if (playAudio) {
      handlePlaySpecimen(id);
    }
  };

  // Switch specimen in Chapter 04 Sequencer (preserves existing step pattern!)
  const handleSwitchSequencerSpecimen = (id: SpecimenId) => {
    setActiveSpecimen(id);
    audioEngine.setSequencerSpecimen(id);
  };

  // Audition individual slice (0..3)
  const handleAuditionSlice = (sliceIndex: number) => {
    setPlayingSpecimenId(activeSpecimen);
    audioEngine.playSpecimen(activeSpecimen, {
      sliceIndex,
      useCustomIfActive: isUsingCustomMic,
      onEnded: () => {
        setPlayingSpecimenId(null);
      },
    });
  };

  // Trigger pad 1..16 on PO-33 Hardware Illustration
  const handleTriggerHardwarePad = (padNumber: number) => {
    const sliceIndex = (padNumber - 1) % 4;
    const pitchShift = padNumber <= 8 ? 0.85 + padNumber * 0.06 : 1.0;
    setPlayingSpecimenId(activeSpecimen);
    audioEngine.playSpecimen(activeSpecimen, {
      sliceIndex,
      playbackRate: pitchShift,
      useCustomIfActive: isUsingCustomMic,
      onEnded: () => {
        setPlayingSpecimenId(null);
      },
    });
  };

  // Optional user-initiated microphone capture in Chapter 02
  const handleCaptureFromMic = async () => {
    const env = await audioEngine.recordFromMicrophone(1800);
    setCustomWaveform(env);
    setIsUsingCustomMic(true);
    audioEngine.playSpecimen(activeSpecimen, { useCustomIfActive: true });
  };

  const handleRevertToFieldSpecimen = () => {
    audioEngine.setUseCustomMic(false);
    setIsUsingCustomMic(false);
  };

  // Chapter 04 Sequencer controls
  const handleToggleSequencerPlay = () => {
    if (audioEngine.isSequencerPlaying()) {
      audioEngine.stopSequencer();
      setIsPlayingSequencer(false);
    } else {
      audioEngine.startSequencer();
      setIsPlayingSequencer(true);
    }
  };

  const handleToggleStep = (trackIndex: number, stepIndex: number) => {
    const updated = audioEngine.toggleStep(trackIndex, stepIndex);
    setPattern(updated);
  };

  const handleClearPattern = () => {
    const cleared = audioEngine.clearPattern();
    setPattern(cleared);
  };

  const handleResetDefaultPattern = () => {
    const reset = audioEngine.resetDefaultPattern(activeSpecimen);
    setPattern(reset);
  };

  const handleChangeBpm = (newBpm: number) => {
    setBpm(newBpm);
    audioEngine.setBpm(newBpm);
  };

  // Chapter 05 FX Playground controls
  const handleTriggerEffect = (effect: EffectMode) => {
    setPlayingSpecimenId(activeSpecimen);
    audioEngine.playEffectDemo(activeSpecimen, effect, () => {
      setPlayingSpecimenId(null);
    });
  };

  return (
    <ScrollOrchestrator>
      {/* Single Continuous Ink Black (#111313) Foundation with restrained print grain */}
      <div className="min-h-screen bg-[#111313] text-[#F1EEE5] nc-print-grain relative selection:bg-[#CBFF49] selection:text-[#111313]">
        <Header onNavigate={handleNavigate} />

        <main>
          {/* 00 / THE SIGNAL — Opening Campaign Poster */}
          <TheSignal
            activeSpecimen={activeSpecimen}
            amplitudes={activeAmplitudes}
            isPlayingAudio={playingSpecimenId === activeSpecimen || isPlayingSequencer}
            onAuditionHeroSample={() => handlePlaySpecimen(activeSpecimen)}
            onTriggerHardwarePad={handleTriggerHardwarePad}
            onNavigate={handleNavigate}
          />

          {/* 01 / HEAR EVERYTHING — Found Sounds */}
          <HearEverything
            activeSpecimen={activeSpecimen}
            playingSpecimenId={playingSpecimenId}
            getWaveform={getSpecimenWaveform}
            onSelectSpecimen={handleSelectSpecimen}
          />

          {/* 02 / CAPTURE IT — Recording Story */}
          <CaptureIt
            activeSpecimen={activeSpecimen}
            amplitudes={activeAmplitudes}
            isUsingCustomMic={isUsingCustomMic}
            onHearSource={() => handlePlaySpecimen(activeSpecimen)}
            onCaptureFromMic={handleCaptureFromMic}
            onRevertToFieldSpecimen={handleRevertToFieldSpecimen}
          />

          {/* 03 / CHOP IT UP — Sample Slicing */}
          <ChopItUp
            activeSpecimen={activeSpecimen}
            amplitudes={activeAmplitudes}
            onAuditionSlice={handleAuditionSlice}
            onNavigateToSequencer={() => handleNavigate('build-a-beat')}
          />

          {/* 04 / BUILD A BEAT — Signature Interactive 16-Step Sequencer */}
          <BuildABeat
            activeSpecimen={activeSpecimen}
            pattern={pattern}
            isPlayingSequencer={isPlayingSequencer}
            currentStep={currentStep}
            bpm={bpm}
            onTogglePlay={handleToggleSequencerPlay}
            onToggleStep={handleToggleStep}
            onSwitchSpecimen={handleSwitchSequencerSpecimen}
            onClearPattern={handleClearPattern}
            onResetDefaultPattern={handleResetDefaultPattern}
            onChangeBpm={handleChangeBpm}
            onAuditionTrackSlice={handleAuditionSlice}
          />

          {/* 05 / BREAK THE RULES — Effects Playground */}
          <BreakTheRules
            activeSpecimen={activeSpecimen}
            amplitudes={activeAmplitudes}
            onTriggerEffect={handleTriggerEffect}
            onPlayDry={() => handlePlaySpecimen(activeSpecimen)}
          />

          {/* 06 / TAKE THE NOISE — Final Product Moment */}
          <TakeTheNoise
            activeSpecimen={activeSpecimen}
            onTriggerHardwarePad={handleTriggerHardwarePad}
          />
        </main>

        <SiteFooter onNavigate={handleNavigate} />
      </div>
    </ScrollOrchestrator>
  );
}
]]>
    </file>
    <file path="src/app/(noiseclub)/noiseclub/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="10" fill="#111313"/>
  <rect x="8" y="8" width="48" height="48" rx="6" fill="#111313" stroke="#F1EEE5" stroke-opacity="0.2" stroke-width="1.5"/>
  <rect x="14" y="32" width="6" height="18" rx="2" fill="#CBFF49"/>
  <rect x="24" y="20" width="6" height="30" rx="2" fill="#CBFF49"/>
  <rect x="34" y="26" width="6" height="24" rx="2" fill="#CBFF49"/>
  <rect x="44" y="36" width="6" height="14" rx="2" fill="#CBFF49"/>
  <circle cx="47" cy="17" r="3.5" fill="#FF6748"/>
</svg>
]]>
    </file>
    <file path="src/app/(noiseclub)/noiseclub/noiseclub.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-nc-ink: #111313;
  --color-nc-paper: #F1EEE5;
  --color-nc-acid: #CBFF49;
  --color-nc-red: #FF6748;

  --ease-nc-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-nc-travel: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-nc-feedback: cubic-bezier(0.23, 1, 0.32, 1);

  --dur-nc-press: 120ms;
  --dur-nc-hover: 260ms;
  --dur-nc-state: 420ms;
  --dur-nc-reveal: 850ms;
  --dur-nc-scene: 1100ms;

  --font-display: var(--font-anton), Impact, 'Arial Narrow', sans-serif;
  --font-sans: var(--font-public-sans), -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: var(--font-ibm-plex-mono), ui-monospace, SFMono-Regular, monospace;
}

:root {
  --nc-ink-black: #111313;
  --nc-paper-bone: #F1EEE5;
  --nc-signal-acid: #CBFF49;
  --nc-record-red: #FF6748;

  --nc-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --nc-ease-travel: cubic-bezier(0.77, 0, 0.175, 1);
  --nc-ease-feedback: cubic-bezier(0.23, 1, 0.32, 1);

  --nc-duration-press: 120ms;
  --nc-duration-hover: 260ms;
  --nc-duration-state: 420ms;
  --nc-duration-reveal: 850ms;
  --nc-duration-scene: 1100ms;

  --font-display: var(--font-anton), Impact, 'Arial Narrow', sans-serif;
  --font-sans: var(--font-public-sans), -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: var(--font-ibm-plex-mono), ui-monospace, SFMono-Regular, monospace;
}

.nc-body {
  background-color: #111313;
  color: #F1EEE5;
  font-family: var(--font-sans);
  letter-spacing: 0.01em;
  margin: 0;
  overflow-x: hidden;
}

.font-display {
  font-family: var(--font-display);
  letter-spacing: -0.01em;
  line-height: 0.94;
  text-transform: uppercase;
}

.font-sans-body {
  font-family: var(--font-sans);
}

.font-mono-meta {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}

/* Tactile print grain & subtle halftone surface without repaint jank */
.nc-print-grain {
  background-image: radial-gradient(rgba(241, 238, 229, 0.055) 1px, transparent 0);
  background-size: 24px 24px;
}

.nc-halftone-strip {
  background-image: radial-gradient(rgba(203, 255, 73, 0.18) 1px, transparent 0);
  background-size: 6px 6px;
}

.nc-paper-halftone {
  background-image: radial-gradient(rgba(17, 19, 19, 0.12) 1px, transparent 0);
  background-size: 8px 8px;
}

/* Editorial irregular cut mask */
.nc-cut-corner {
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
}

/* Button tactile feedback */
.nc-btn-interactive {
  transition: transform var(--nc-duration-press) var(--nc-ease-feedback),
              background-color var(--nc-duration-hover) var(--nc-ease-out),
              color var(--nc-duration-hover) var(--nc-ease-out),
              border-color var(--nc-duration-hover) var(--nc-ease-out);
}

.nc-btn-interactive:active {
  transform: scale(0.97);
}

/* Accessible focus ring matching NOISE CLUB Signal Acid */
:focus-visible {
  outline: 2px solid #CBFF49;
  outline-offset: 3px;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
]]>
    </file>
    <file path="src/app/(noiseclub)/noiseclub/page.tsx">
<![CDATA[import App from "./App";

export default function NoiseClubPage() {
  return <App />;
}
]]>
    </file>
    <file path="src/app/(noiseclub)/noiseclub/components/chapters/BreakTheRules.tsx">
<![CDATA["use client";

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
]]>
    </file>
    <file path="src/app/(noiseclub)/noiseclub/components/chapters/BuildABeat.tsx">
<![CDATA["use client";

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
]]>
    </file>
    <file path="src/app/(noiseclub)/noiseclub/components/chapters/CaptureIt.tsx">
<![CDATA["use client";

import React, { useState } from 'react';
import { Mic, RotateCcw, Volume2, Radio } from 'lucide-react';
import { SPECIMEN_MAP, SpecimenId } from '../../lib/audio/sampleLibrary';
import { PO33HardwareIllustration } from '../interactive/PO33HardwareIllustration';
import { Waveform } from '../interactive/Waveform';

interface CaptureItProps {
  activeSpecimen: SpecimenId;
  amplitudes: number[];
  isUsingCustomMic: boolean;
  onHearSource: () => void;
  onCaptureFromMic: () => Promise<void>;
  onRevertToFieldSpecimen: () => void;
}

export const CaptureIt: React.FC<CaptureItProps> = ({
  activeSpecimen,
  amplitudes,
  isUsingCustomMic,
  onHearSource,
  onCaptureFromMic,
  onRevertToFieldSpecimen,
}) => {
  const spec = SPECIMEN_MAP[activeSpecimen];
  const [captureStage, setCaptureStage] = useState<'idle' | 'capturing' | 'captured'>('captured');
  const [micStatus, setMicStatus] = useState<'idle' | 'recording' | 'done' | 'error'>('idle');
  const [micErrorMsg, setMicErrorMsg] = useState<string | null>(null);

  const handleReplayCaptureNarrative = () => {
    setCaptureStage('capturing');
    window.setTimeout(() => {
      setCaptureStage('captured');
    }, 950);
  };

  const handleOptInMicRecord = async () => {
    setMicErrorMsg(null);
    setMicStatus('recording');
    setCaptureStage('capturing');
    try {
      await onCaptureFromMic();
      setMicStatus('done');
      setCaptureStage('captured');
    } catch {
      setMicStatus('error');
      setCaptureStage('captured');
      setMicErrorMsg(
        'Microphone permission was declined or unavailable. Using archival field specimen instead.'
      );
    }
  };

  // Compress waveform visually when captured into 8-bit slot memory
  const compressedAmplitudes = React.useMemo(() => {
    return amplitudes.filter((_, i) => i % 2 === 0);
  }, [amplitudes]);

  return (
    <section
      id="capture-it"
      aria-labelledby="chapter-02-heading"
      className="relative py-20 sm:py-28 px-4 sm:px-8 border-b border-[#F1EEE5]/15"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Chapter Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#F1EEE5]/20">
          <div className="lg:col-span-7">
            <div className="font-mono-meta text-xs text-[#FF6748] uppercase tracking-widest mb-3">
              02 / CAPTURE IT · MICROPHONE & LINE-IN SAMPLING
            </div>
            <h2
              id="chapter-02-heading"
              className="font-display text-[clamp(2.5rem,5.5vw,5rem)] text-[#F1EEE5] uppercase leading-[0.92]"
              style={{ textWrap: 'balance' }}
            >
              STEAL A MOMENT. BUILD A BEAT.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-sans-body text-sm sm:text-base text-[#F1EEE5]/80 leading-relaxed">
              Hold <strong className="text-[#FF6748] font-mono-meta">REC</strong> plus any sample slot <strong className="text-[#CBFF49] font-mono-meta">01–16</strong>. The PO-33 captures acoustic air pressure through its top-mounted electret condenser microphone—or stereo audio via the 3.5mm Line-In jack—straight into 40 seconds of crunchy sample memory.
            </p>
          </div>
        </div>

        {/* Main Recording Story Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 6 Columns: Environmental Source → Compressed 8-Bit Slot Visualization */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-[#151818] border border-[#F1EEE5]/20 p-6 sm:p-8 space-y-8">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F1EEE5]/15 pb-4 font-mono-meta text-xs">
                <span className="text-[#CBFF49] font-semibold">
                  STAGE A · ENVIRONMENTAL ACOUSTIC INPUT
                </span>
                <span className="text-[#F1EEE5]/70">
                  {isUsingCustomMic ? 'CUSTOM LOCAL MIC BUFFER' : spec.captureMethod}
                </span>
              </div>

              {/* Raw Wide Waveform */}
              <div
                className={`p-4 bg-[#0E1010] border transition-all duration-500 ${
                  captureStage === 'capturing'
                    ? 'border-[#FF6748] scale-[0.98]'
                    : 'border-[#F1EEE5]/15 scale-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2 font-mono-meta text-xs text-[#F1EEE5]/70">
                  <span>
                    SOURCE: {isUsingCustomMic ? 'USER MICROPHONE CAPTURE' : spec.title.toUpperCase()}
                  </span>
                  <span>{spec.durationLabel}</span>
                </div>
                <Waveform
                  amplitudes={amplitudes}
                  isPlaying={captureStage === 'capturing'}
                  accentColor={captureStage === 'capturing' ? 'red' : 'bone'}
                  heightClass="h-20"
                />
              </div>

              {/* Signal Transfer Arrow / A-D Converter Bus */}
              <div className="py-2 flex items-center justify-between font-mono-meta text-xs text-[#F1EEE5]/65 border-y border-dashed border-[#F1EEE5]/20">
                <span>↓ A/D CONVERSION · 24.0 kHz / 8-BIT COMPANDING</span>
                <span className={captureStage === 'capturing' ? 'text-[#FF6748] font-bold' : 'text-[#CBFF49]'}>
                  {captureStage === 'capturing' ? '● QUANTIZING INTO RAM...' : '✓ LOCKED IN SLOT MEMORY'}
                </span>
              </div>

              {/* Stage B: Compact Captured Sample Slot */}
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono-meta text-xs">
                  <span className="text-[#FF6748] font-semibold">
                    STAGE B · CAPTURED PO-33 MEMORY SLOT [{String(spec.po33SlotNumber).padStart(2, '0')}]
                  </span>
                  <span className="text-[#F1EEE5]/70">{spec.po33Bank}</span>
                </div>

                <div
                  className={`p-4 bg-[#0E1010] border-2 transition-all duration-500 ${
                    captureStage === 'capturing'
                      ? 'border-[#FF6748] opacity-60'
                      : 'border-[#CBFF49] opacity-100'
                  }`}
                >
                  <Waveform
                    amplitudes={compressedAmplitudes}
                    isPlaying={captureStage === 'captured'}
                    accentColor="acid"
                    heightClass="h-16"
                  />
                  <div className="mt-2 flex items-center justify-between font-mono-meta text-[11px] text-[#F1EEE5]/70">
                    <span>AUTO-TRIMMED TRANSIENT START</span>
                    <span>MEMORY USED: {spec.durationSec.toFixed(1)}S / 40.0S TOTAL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar: Hear Source + Replay Narrative + Opt-in Local Mic */}
            <div className="space-y-4 pt-4 border-t border-[#F1EEE5]/15">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onHearSource}
                  className="nc-btn-interactive inline-flex items-center gap-2 px-5 py-3 bg-[#CBFF49] text-[#111313] hover:bg-[#F1EEE5] font-mono-meta text-xs font-bold whitespace-nowrap shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>HEAR THE SOURCE</span>
                </button>

                <button
                  type="button"
                  onClick={handleReplayCaptureNarrative}
                  className="nc-btn-interactive inline-flex items-center gap-2 px-4 py-3 bg-[#1C2020] border border-[#F1EEE5]/25 text-[#F1EEE5] hover:border-[#CBFF49] font-mono-meta text-xs font-semibold whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>REPLAY CAPTURE SIGNAL</span>
                </button>
              </div>

              {/* Strictly Optional User-Initiated Microphone Box */}
              <div className="p-4 bg-[#111313] border border-[#F1EEE5]/15 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-mono-meta text-xs text-[#F1EEE5]/85 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-[#FF6748]" />
                    <span>OPTIONAL LIVE MIC EXPERIMENT (1.8S LOCAL RAM)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleOptInMicRecord}
                      disabled={micStatus === 'recording'}
                      className="nc-btn-interactive inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6748] text-[#111313] hover:bg-[#F1EEE5] font-mono-meta text-xs font-bold whitespace-nowrap shrink-0 disabled:opacity-50"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>
                        {micStatus === 'recording' ? 'RECORDING 1.8S...' : 'RECORD 1.8S VIA BROWSER MIC'}
                      </span>
                    </button>
                    {isUsingCustomMic && (
                      <button
                        type="button"
                        onClick={onRevertToFieldSpecimen}
                        className="nc-btn-interactive px-2.5 py-1.5 border border-[#F1EEE5]/25 font-mono-meta text-xs text-[#F1EEE5]/80 hover:text-[#CBFF49] whitespace-nowrap shrink-0"
                      >
                        USE ARCHIVE SAMPLE
                      </button>
                    )}
                  </div>
                </div>
                <p className="font-sans-body text-xs text-[#F1EEE5]/60 leading-relaxed">
                  Requires explicit click. Audio is decoded solely inside your browser’s local Web Audio RAM for the slices and sequencer below and is never uploaded or stored.
                </p>
                {micErrorMsg && (
                  <p className="font-mono-meta text-xs text-[#FF6748]">{micErrorMsg}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right 6 Columns: PO-33 Microphone & Input Macro Hardware View + Verified Specs */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <PO33HardwareIllustration
              mode="macro-mic"
              activeSpecimen={activeSpecimen}
              isRecording={captureStage === 'capturing' || micStatus === 'recording'}
            />

            {/* Verified Hardware Sampling Spec Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#151818] border border-[#F1EEE5]/15">
                <div className="font-mono-meta text-xs text-[#CBFF49] mb-1">01 · BUILT-IN MIC</div>
                <div className="font-sans-body font-semibold text-sm text-[#F1EEE5] mb-1">
                  Knowles Electret Capsule
                </div>
                <p className="font-sans-body text-xs text-[#F1EEE5]/70">
                  Instant acoustic field recording without external cables or preamps.
                </p>
              </div>

              <div className="p-4 bg-[#151818] border border-[#F1EEE5]/15">
                <div className="font-mono-meta text-xs text-[#CBFF49] mb-1">02 · 3.5MM LINE-IN</div>
                <div className="font-sans-body font-semibold text-sm text-[#F1EEE5] mb-1">
                  Stereo Line Input Jack
                </div>
                <p className="font-sans-body text-xs text-[#F1EEE5]/70">
                  Sample directly from phones, radios, turntables, or contact microphones.
                </p>
              </div>

              <div className="p-4 bg-[#151818] border border-[#F1EEE5]/15">
                <div className="font-mono-meta text-xs text-[#CBFF49] mb-1">03 · 40S MEMORY</div>
                <div className="font-sans-body font-semibold text-sm text-[#F1EEE5] mb-1">
                  8 Melodic + 8 Drum Slots
                </div>
                <p className="font-sans-body text-xs text-[#F1EEE5]/70">
                  40 seconds of total sample memory dynamically shared across 16 slots.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(noiseclub)/noiseclub/components/chapters/ChopItUp.tsx">
<![CDATA["use client";

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
]]>
    </file>
    <file path="src/app/(noiseclub)/noiseclub/components/chapters/HearEverything.tsx">
<![CDATA["use client";

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
]]>
    </file>
    <file path="src/app/(noiseclub)/noiseclub/components/chapters/TakeTheNoise.tsx">
<![CDATA["use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SpecimenId } from '../../lib/audio/sampleLibrary';
import { PO33HardwareIllustration } from '../interactive/PO33HardwareIllustration';

interface TakeTheNoiseProps {
  activeSpecimen: SpecimenId;
  onTriggerHardwarePad: (padNumber: number) => void;
}

const VERIFIED_SPECS = [
  {
    code: 'SPEC 01',
    label: 'Built-in Microphone',
    value: 'Knowles electret condenser mic for instant acoustic sampling',
  },
  {
    code: 'SPEC 02',
    label: 'Sample Memory',
    value: '40 seconds total recording memory across 16 sample slots',
  },
  {
    code: 'SPEC 03',
    label: 'Melodic & Drum Banks',
    value: '8 melodic chromatic sample slots + 8 auto-sliced drum kit slots',
  },
  {
    code: 'SPEC 04',
    label: 'Sequencer & Effects',
    value: '16-step sequencer, 16 patterns, and 16 punch-in performance effects',
  },
  {
    code: 'SPEC 05',
    label: 'Audio I/O & Sync',
    value: 'Dual 3.5mm stereo mini-jacks (Line-In, Line-Out, and Jam Sync)',
  },
  {
    code: 'SPEC 06',
    label: 'Portable Power',
    value: 'Powered by 2× AAA batteries with integrated folding wire stand',
  },
];

export const TakeTheNoise: React.FC<TakeTheNoiseProps> = ({
  activeSpecimen,
  onTriggerHardwarePad,
}) => {
  return (
    <section
      id="take-the-noise"
      aria-labelledby="chapter-06-heading"
      className="relative py-24 sm:py-32 px-4 sm:px-8"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left 7 Columns: Restrained Final Resolution Copy, Verified Feature Summary, Official CTA */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="font-mono-meta text-xs text-[#CBFF49] uppercase tracking-widest mb-3">
                06 / TAKE THE NOISE · POCKET OPERATOR PO-33 K.O!
              </div>
              <h2
                id="chapter-06-heading"
                className="font-display text-[clamp(3rem,6.5vw,6.2rem)] text-[#F1EEE5] uppercase leading-[0.9]"
                style={{ textWrap: 'balance' }}
              >
                YOUR NEXT BEAT IS OUT THERE.
              </h2>
            </div>

            <p className="font-sans-body text-base sm:text-lg text-[#F1EEE5]/85 max-w-xl leading-relaxed">
              Everything has a rhythm—you just have to find it. Carry a real micro-sampler in your coat pocket, steal four seconds of city air, and turn ordinary noise into finished music.
            </p>

            {/* Concise Verified Feature Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#F1EEE5]/20">
              {VERIFIED_SPECS.map((item) => (
                <div key={item.code} className="p-4 bg-[#151818] border border-[#F1EEE5]/15">
                  <div className="font-mono-meta text-[11px] text-[#CBFF49] mb-1">
                    {item.code} · {item.label.toUpperCase()}
                  </div>
                  <div className="font-sans-body text-xs sm:text-sm text-[#F1EEE5]/85 leading-relaxed">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Official Manufacturer CTA & Unambiguous Attribution */}
            <div className="pt-4 space-y-5">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://teenage.engineering/store/po-33"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group nc-btn-interactive inline-flex items-center gap-3 px-7 py-4 bg-[#CBFF49] text-[#111313] hover:bg-[#F1EEE5] font-sans-body text-sm font-bold tracking-wide whitespace-nowrap shrink-0"
                >
                  <span>DISCOVER THE PO-33</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <span className="font-mono-meta text-xs text-[#F1EEE5]/65">
                  OFFICIAL DESTINATION: TEENAGE.ENGINEERING/STORE/PO-33
                </span>
              </div>

              <p className="font-mono-meta text-xs text-[#F1EEE5]/65 border-t border-[#F1EEE5]/15 pt-4 max-w-xl leading-relaxed">
                An independent fictional creative concept featuring the PO-33 K.O! by Teenage Engineering. Not affiliated with or endorsed by Teenage Engineering.
              </p>
            </div>
          </div>

          {/* Right 5 Columns: Accurate Front Monolith PO-33 Inspection View */}
          <div className="lg:col-span-5">
            <div className="p-6 bg-[#151818] border border-[#F1EEE5]/20">
              <div className="flex items-center justify-between mb-4 font-mono-meta text-xs text-[#F1EEE5]/70">
                <span>TEENAGE ENGINEERING · PO-33 K.O!</span>
                <span className="text-[#CBFF49]">INTERACTIVE SPEC MONOLITH</span>
              </div>
              <PO33HardwareIllustration
                mode="front-monolith"
                activeSpecimen={activeSpecimen}
                onTriggerPad={onTriggerHardwarePad}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(noiseclub)/noiseclub/components/chapters/TheSignal.tsx">
<![CDATA["use client";

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
]]>
    </file>
    <file path="src/app/(noiseclub)/noiseclub/components/interactive/PO33HardwareIllustration.tsx">
<![CDATA["use client";

import React, { useState } from 'react';
import { SPECIMEN_MAP, SpecimenId } from '../../lib/audio/sampleLibrary';

export type PO33ViewMode = 'hero' | 'macro-mic' | 'front-monolith';

interface PO33HardwareProps {
  mode: PO33ViewMode;
  activeSpecimen: SpecimenId;
  isPlaying?: boolean;
  isRecording?: boolean;
  activeStep?: number;
  onTriggerPad?: (padNumber: number) => void;
  className?: string;
}

interface HotspotInfo {
  id: string;
  label: string;
  title: string;
  detail: string;
  x: string;
  y: string;
}

const HOTSPOTS: HotspotInfo[] = [
  {
    id: 'mic',
    label: '01 · MIC',
    title: 'Built-in Electret Microphone',
    detail: 'Top-mounted condenser capsule samples acoustic sources directly into 40-second memory.',
    x: '76%',
    y: '8%',
  },
  {
    id: 'io',
    label: '02 · 3.5MM I/O',
    title: 'Stereo Line-In & Pocket Operator Sync',
    detail: 'Left 3.5mm jack records line-level audio; right 3.5mm jack outputs audio + click-track sync.',
    x: '16%',
    y: '11%',
  },
  {
    id: 'melodic',
    label: '03 · SLOTS 1–8',
    title: '8 Melodic Sample Slots',
    detail: 'Chromatically pitches any recorded sound across the 16-button keyboard grid.',
    x: '32%',
    y: '62%',
  },
  {
    id: 'drum',
    label: '04 · SLOTS 9–16',
    title: '8 Drum & Slice Kit Slots',
    detail: 'Auto-slices a recording across 16 pads for instant chopping and finger drumming.',
    x: '32%',
    y: '83%',
  },
  {
    id: 'fx',
    label: '05 · 16 PUNCH-IN FX',
    title: 'Real-Time Performance Effects',
    detail: 'Hold FX + 1–16 during playback for stutter, reverse, loop, octave, filter, and bitcrush.',
    x: '86%',
    y: '68%',
  },
];

export const PO33HardwareIllustration: React.FC<PO33HardwareProps> = ({
  mode,
  activeSpecimen,
  isPlaying = false,
  isRecording = false,
  activeStep = 0,
  onTriggerPad,
  className = '',
}) => {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(
    mode === 'front-monolith' ? 'mic' : null
  );
  const [pressedPad, setPressedPad] = useState<number | null>(null);
  const spec = SPECIMEN_MAP[activeSpecimen];

  const handlePadClick = (padNum: number) => {
    setPressedPad(padNum);
    window.setTimeout(() => setPressedPad(null), 160);
    onTriggerPad?.(padNum);
  };

  if (mode === 'macro-mic') {
    return (
      <div className={`relative select-none ${className}`}>
        <div className="relative bg-[#0B0C0C] border border-[#F1EEE5]/20 p-4 sm:p-6 overflow-hidden">
          {/* Top metadata header inside macro frame */}
          <div className="flex items-center justify-between border-b border-[#F1EEE5]/15 pb-3 mb-4 font-mono-meta text-xs text-[#F1EEE5]/70">
            <span>MACRO INSPECTION · TOP PCB BUS</span>
            <span>SCALE 2.4:1 · PO-33 REV C</span>
          </div>

          <svg
            viewBox="0 0 680 380"
            className="w-full h-auto block"
            role="img"
            aria-label="Close-up technical macro view of the Teenage Engineering PO-33 K.O! microphone capsule, line-in jack, and top PCB traces"
          >
            <defs>
              <linearGradient id="pcbMacroSurface" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1B1E1E" />
                <stop offset="55%" stopColor="#121414" />
                <stop offset="100%" stopColor="#0A0B0B" />
              </linearGradient>
              <linearGradient id="goldPad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E6C365" />
                <stop offset="50%" stopColor="#C49A38" />
                <stop offset="100%" stopColor="#8F6B1A" />
              </linearGradient>
              <radialGradient id="micCapsuleGrad" cx="45%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#525757" />
                <stop offset="65%" stopColor="#262929" />
                <stop offset="100%" stopColor="#0E1010" />
              </radialGradient>
            </defs>

            {/* Background dark studio surface */}
            <rect width="680" height="380" fill="#090A0A" />

            {/* Subtle technical coordinate grid */}
            <g stroke="#F1EEE5" strokeOpacity="0.06" strokeWidth="1">
              <line x1="0" y1="76" x2="680" y2="76" />
              <line x1="0" y1="152" x2="680" y2="152" />
              <line x1="0" y1="228" x2="680" y2="228" />
              <line x1="0" y1="304" x2="680" y2="304" />
              <line x1="136" y1="0" x2="136" y2="380" />
              <line x1="272" y1="0" x2="272" y2="380" />
              <line x1="408" y1="0" x2="408" y2="380" />
              <line x1="544" y1="0" x2="544" y2="380" />
            </g>

            {/* PO-33 Upper FR-4 Matte Black PCB Body */}
            <path
              d="M 50 380 L 50 90 Q 50 68 72 68 L 210 68 L 210 28 Q 210 16 222 16 L 458 16 Q 470 16 470 28 L 470 68 L 608 68 Q 630 68 630 90 L 630 380 Z"
              fill="url(#pcbMacroSurface)"
              stroke="#F1EEE5"
              strokeOpacity="0.28"
              strokeWidth="2"
            />

            {/* Top Hanger Cutout & Gold Edge Plating */}
            <rect
              x="248"
              y="30"
              width="184"
              height="32"
              rx="16"
              fill="#090A0A"
              stroke="url(#goldPad)"
              strokeWidth="3"
            />

            {/* Copper / Gold PCB Traces */}
            <g stroke="url(#goldPad)" strokeWidth="1.5" fill="none" opacity="0.55">
              <path d="M 122 165 L 122 230 L 215 265" />
              <path d="M 528 145 L 528 215 L 445 255" />
              <path d="M 498 145 L 498 195 L 425 235" />
              <circle cx="215" cy="265" r="3" fill="url(#goldPad)" />
              <circle cx="445" cy="255" r="3" fill="url(#goldPad)" />
              <circle cx="425" cy="235" r="3" fill="url(#goldPad)" />
            </g>

            {/* Left 3.5mm Stereo Line-In Jack */}
            <g transform="translate(88, 102)">
              <rect x="0" y="0" width="68" height="58" rx="4" fill="#1E2121" stroke="#F1EEE5" strokeOpacity="0.3" />
              <circle cx="34" cy="29" r="19" fill="#0B0C0C" stroke="url(#goldPad)" strokeWidth="4" />
              <circle cx="34" cy="29" r="11" fill="#050505" />
              <text x="34" y="76" textAnchor="middle" fill="#F1EEE5" fontSize="10" fontFamily="IBM Plex Mono">
                LINE IN (3.5MM)
              </text>
            </g>

            {/* Center Top Silkscreen Branding */}
            <text
              x="340"
              y="98"
              textAnchor="middle"
              fill="#FF6748"
              fontSize="18"
              fontWeight="700"
              fontFamily="IBM Plex Mono"
              letterSpacing="2"
            >
              PO-33 K.O!
            </text>
            <text
              x="340"
              y="116"
              textAnchor="middle"
              fill="#F1EEE5"
              fillOpacity="0.65"
              fontSize="10"
              fontFamily="IBM Plex Mono"
              letterSpacing="1.5"
            >
              MICRO SAMPLER · 40S MEMORY
            </text>

            {/* Right Built-In Electret Condenser Microphone Capsule (Focal Point) */}
            <g transform="translate(476, 84)">
              {/* Acoustic capture pulse rings when recording or active */}
              <circle
                cx="42"
                cy="42"
                r={isRecording ? '58' : '46'}
                fill="none"
                stroke={isRecording ? '#FF6748' : '#CBFF49'}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.85"
              />
              <circle
                cx="42"
                cy="42"
                r="34"
                fill="url(#micCapsuleGrad)"
                stroke="url(#goldPad)"
                strokeWidth="3"
              />
              {/* Electret acoustic mesh holes */}
              <circle cx="42" cy="42" r="5" fill="#090A0A" />
              <circle cx="42" cy="27" r="4" fill="#090A0A" />
              <circle cx="42" cy="57" r="4" fill="#090A0A" />
              <circle cx="27" cy="42" r="4" fill="#090A0A" />
              <circle cx="57" cy="42" r="4" fill="#090A0A" />
              <circle cx="31" cy="31" r="3.5" fill="#090A0A" />
              <circle cx="53" cy="31" r="3.5" fill="#090A0A" />
              <circle cx="31" cy="53" r="3.5" fill="#090A0A" />
              <circle cx="53" cy="53" r="3.5" fill="#090A0A" />

              <text x="42" y="96" textAnchor="middle" fill="#CBFF49" fontSize="11" fontFamily="IBM Plex Mono" fontWeight="600">
                ELECTRET MIC
              </text>
            </g>

            {/* Upper portion of Custom LCD Window showing REC & Sample Memory */}
            <g transform="translate(185, 148)">
              <rect
                x="0"
                y="0"
                width="260"
                height="136"
                rx="4"
                fill="#C8C6BC"
                stroke="#2D3131"
                strokeWidth="4"
              />
              {/* LCD inner segments */}
              <text x="16" y="28" fill="#111313" fontSize="14" fontWeight="700" fontFamily="IBM Plex Mono">
                {isRecording ? '● REC IN PROGRESS' : `SLOT ${String(spec.po33SlotNumber).padStart(2, '0')} READY`}
              </text>
              <text x="244" y="28" textAnchor="end" fill="#111313" fontSize="12" fontFamily="IBM Plex Mono">
                {spec.durationLabel}
              </text>
              <line x1="16" y1="38" x2="244" y2="38" stroke="#111313" strokeWidth="1.5" />

              {/* Simulated segmented LCD level meter */}
              <g transform="translate(16, 52)">
                {Array.from({ length: 16 }).map((_, idx) => {
                  const active = idx < (isRecording ? 14 : 11);
                  return (
                    <rect
                      key={idx}
                      x={idx * 14}
                      y={0}
                      width={10}
                      height={26}
                      fill={active ? '#111313' : '#B4B2A8'}
                    />
                  );
                })}
              </g>

              <text x="16" y="102" fill="#111313" fontSize="11" fontFamily="IBM Plex Mono" fontWeight="600">
                BANK: {spec.po33Bank}
              </text>
              <text x="16" y="120" fill="#111313" fontSize="11" fontFamily="IBM Plex Mono">
                MEM REMAINING: 38.4 SEC
              </text>
            </g>

            {/* REC Hardware Button on right */}
            <g transform="translate(495, 220)">
              <rect
                x="0"
                y="0"
                width="74"
                height="58"
                rx="4"
                fill="#1D2020"
                stroke={isRecording ? '#FF6748' : '#F1EEE5'}
                strokeOpacity={isRecording ? '1' : '0.35'}
                strokeWidth="2"
              />
              <circle
                cx="37"
                cy="29"
                r="14"
                fill={isRecording ? '#FF6748' : '#2C3030'}
                stroke="#FF6748"
                strokeWidth="2"
              />
              <text x="37" y="76" textAnchor="middle" fill="#FF6748" fontSize="11" fontFamily="IBM Plex Mono" fontWeight="600">
                HOLD REC + SLOT
              </text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative select-none ${className}`}>
      <div
        className={`relative mx-auto transition-transform duration-700 ${
          mode === 'hero'
            ? 'max-w-[430px] lg:max-w-[460px]'
            : 'max-w-[420px]'
        }`}
      >
        {/* Architectural studio shadow & crisp hardware SVG */}
        <svg
          viewBox="0 0 440 740"
          className="w-full h-auto block drop-shadow-[0_28px_45px_rgba(0,0,0,0.85)]"
          role="img"
          aria-label="Teenage Engineering PO-33 K.O! Pocket Operator micro-sampler hardware"
        >
          <defs>
            <linearGradient id="po33Body" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#202424" />
              <stop offset="45%" stopColor="#141717" />
              <stop offset="100%" stopColor="#0B0D0D" />
            </linearGradient>
            <linearGradient id="po33Gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F0CE73" />
              <stop offset="50%" stopColor="#C79B3B" />
              <stop offset="100%" stopColor="#8A6619" />
            </linearGradient>
            <linearGradient id="lcdScreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D6D3C9" />
              <stop offset="100%" stopColor="#BDBAAD" />
            </linearGradient>
          </defs>

          {/* Main FR-4 Matte Black PCB Silhouette with authentic top hanger tab */}
          <path
            d="M 42 86
               Q 42 66 62 66
               L 132 66
               L 132 24
               Q 132 10 146 10
               L 294 10
               Q 308 10 308 24
               L 308 66
               L 378 66
               Q 398 66 398 86
               L 398 706
               Q 398 726 378 726
               L 62 726
               Q 42 726 42 706
               Z"
            fill="url(#po33Body)"
            stroke="#F1EEE5"
            strokeOpacity="0.26"
            strokeWidth="2"
          />

          {/* Top Hanger Slot */}
          <rect
            x="160"
            y="24"
            width="120"
            height="24"
            rx="12"
            fill="#111313"
            stroke="url(#po33Gold)"
            strokeWidth="2.5"
          />

          {/* Corner Gold-Plated Mounting Holes */}
          {[
            { cx: 66, cy: 90 },
            { cx: 374, cy: 90 },
            { cx: 66, cy: 702 },
            { cx: 374, cy: 702 },
          ].map((hole, i) => (
            <g key={i}>
              <circle
                cx={hole.cx}
                cy={hole.cy}
                r="9"
                fill="#111313"
                stroke="url(#po33Gold)"
                strokeWidth="3"
              />
            </g>
          ))}

          {/* Top Left & Right 3.5mm Stereo Audio / Sync Jacks */}
          <g transform="translate(88, 72)">
            <rect x="0" y="0" width="38" height="34" rx="3" fill="#232727" stroke="#F1EEE5" strokeOpacity="0.25" />
            <circle cx="19" cy="17" r="10" fill="#090A0A" stroke="url(#po33Gold)" strokeWidth="2.5" />
            <text x="19" y="46" textAnchor="middle" fill="#F1EEE5" fillOpacity="0.6" fontSize="8" fontFamily="IBM Plex Mono">
              IN
            </text>
          </g>

          <g transform="translate(314, 72)">
            <rect x="0" y="0" width="38" height="34" rx="3" fill="#232727" stroke="#F1EEE5" strokeOpacity="0.25" />
            <circle cx="19" cy="17" r="10" fill="#090A0A" stroke="url(#po33Gold)" strokeWidth="2.5" />
            <text x="19" y="46" textAnchor="middle" fill="#F1EEE5" fillOpacity="0.6" fontSize="8" fontFamily="IBM Plex Mono">
              OUT
            </text>
          </g>

          {/* Built-in Electret Microphone Capsule (Top Right PCB area) */}
          <g transform="translate(336, 36)">
            <circle cx="16" cy="16" r="14" fill="#262A2A" stroke="url(#po33Gold)" strokeWidth="2" />
            <circle cx="16" cy="16" r="3" fill="#0B0C0C" />
            <circle cx="16" cy="9" r="2.2" fill="#0B0C0C" />
            <circle cx="16" cy="23" r="2.2" fill="#0B0C0C" />
            <circle cx="9" cy="16" r="2.2" fill="#0B0C0C" />
            <circle cx="23" cy="16" r="2.2" fill="#0B0C0C" />
            <text x="-8" y="20" textAnchor="end" fill="#CBFF49" fontSize="8" fontFamily="IBM Plex Mono" fontWeight="600">
              MIC
            </text>
          </g>

          {/* Silkscreen Top Header */}
          <text
            x="220"
            y="84"
            textAnchor="middle"
            fill="#F1EEE5"
            fillOpacity="0.85"
            fontSize="10"
            fontFamily="IBM Plex Mono"
            letterSpacing="1.2"
          >
            teenage engineering
          </text>
          <text
            x="220"
            y="106"
            textAnchor="middle"
            fill="#FF6748"
            fontSize="20"
            fontWeight="700"
            fontFamily="Anton"
            letterSpacing="2"
          >
            PO-33 K.O!
          </text>

          {/* Custom Segmented Monochrome LCD Screen */}
          <g transform="translate(84, 124)">
            <rect
              x="0"
              y="0"
              width="272"
              height="146"
              rx="4"
              fill="url(#lcdScreen)"
              stroke="#2C3030"
              strokeWidth="4"
            />
            {/* Top Status Bar inside LCD */}
            <text x="14" y="24" fill="#111313" fontSize="11" fontWeight="700" fontFamily="IBM Plex Mono">
              {isPlaying ? '▶ PLAY' : '■ READY'} · {spec.po33Bank.split(' ')[0]}
            </text>
            <text x="258" y="24" textAnchor="end" fill="#111313" fontSize="12" fontWeight="700" fontFamily="IBM Plex Mono">
              BPM 116
            </text>
            <line x1="12" y1="32" x2="260" y2="32" stroke="#111313" strokeWidth="1.2" strokeOpacity="0.5" />

            {/* Arcade K.O! Boxer / Sampler Visual LCD Segments */}
            <g transform="translate(18, 44)" fill="#111313">
              {/* Left Arcade Fighter Frame */}
              <rect x="0" y="14" width="18" height="18" />
              <rect x="4" y="34" width="22" height="28" />
              <rect x="26" y="36" width="16" height="8" />
              <rect x="4" y="64" width="8" height="16" />
              <rect x="18" y="64" width="8" height="16" />

              {/* Center K.O! Sampler Meter Bars */}
              {Array.from({ length: 12 }).map((_, idx) => {
                const barH = 14 + ((idx * 17 + (isPlaying ? activeStep * 9 : 5)) % 46);
                return (
                  <rect
                    key={idx}
                    x={56 + idx * 11}
                    y={76 - barH}
                    width="7"
                    height={barH}
                    opacity={idx % 2 === 0 ? 0.9 : 0.65}
                  />
                );
              })}

              {/* Right Slot & Memory readout */}
              <rect x="196" y="8" width="44" height="28" fill="none" stroke="#111313" strokeWidth="2" />
              <text x="218" y="27" textAnchor="middle" fill="#111313" fontSize="15" fontWeight="700" fontFamily="IBM Plex Mono">
                S{String(spec.po33SlotNumber).padStart(2, '0')}
              </text>
              <text x="218" y="54" textAnchor="middle" fill="#111313" fontSize="9" fontFamily="IBM Plex Mono" fontWeight="600">
                40S MEM
              </text>
              <text x="218" y="70" textAnchor="middle" fill="#111313" fontSize="9" fontFamily="IBM Plex Mono">
                STEP {String(activeStep + 1).padStart(2, '0')}
              </text>
            </g>

            {/* Bottom LCD Specimen Ribbon */}
            <rect x="12" y="124" width="248" height="15" fill="#111313" />
            <text x="20" y="135" fill="#D6D3C9" fontSize="9.5" fontFamily="IBM Plex Mono" fontWeight="600">
              {spec.catalogId} · {spec.title.toUpperCase()}
            </text>
          </g>

          {/* Top Utility Buttons + A / B Parameter Knobs Row */}
          <g transform="translate(64, 290)">
            {/* sound, pattern, bpm buttons */}
            {['SOUND', 'PATTERN', 'BPM'].map((label, idx) => (
              <g key={label} transform={`translate(${idx * 58}, 8)`}>
                <rect
                  x="0"
                  y="0"
                  width="46"
                  height="32"
                  rx="3"
                  fill="#1E2222"
                  stroke="#F1EEE5"
                  strokeOpacity="0.28"
                  strokeWidth="1.5"
                />
                <circle cx="23" cy="16" r="7" fill="#323737" stroke="#F1EEE5" strokeOpacity="0.4" />
                <text
                  x="23"
                  y="45"
                  textAnchor="middle"
                  fill="#F1EEE5"
                  fillOpacity="0.8"
                  fontSize="8.5"
                  fontFamily="IBM Plex Mono"
                  fontWeight="600"
                >
                  {label}
                </text>
              </g>
            ))}

            {/* Knob A (Orange/Red Pitch/Trim) & Knob B (Light Bone Filter/Tone) */}
            <g transform="translate(198, 22)">
              <circle cx="20" cy="4" r="20" fill="#181B1B" stroke="#F1EEE5" strokeOpacity="0.3" strokeWidth="1.5" />
              <circle cx="20" cy="4" r="13" fill="#FF6748" />
              <line x1="20" y1="4" x2="12" y2="-5" stroke="#111313" strokeWidth="2.5" strokeLinecap="round" />
              <text x="20" y="37" textAnchor="middle" fill="#FF6748" fontSize="9" fontFamily="IBM Plex Mono" fontWeight="700">
                KNOB A
              </text>
            </g>

            <g transform="translate(260, 22)">
              <circle cx="20" cy="4" r="20" fill="#181B1B" stroke="#F1EEE5" strokeOpacity="0.3" strokeWidth="1.5" />
              <circle cx="20" cy="4" r="13" fill="#F1EEE5" />
              <line x1="20" y1="4" x2="29" y2="-4" stroke="#111313" strokeWidth="2.5" strokeLinecap="round" />
              <text x="20" y="37" textAnchor="middle" fill="#F1EEE5" fontSize="9" fontFamily="IBM Plex Mono" fontWeight="700">
                KNOB B
              </text>
            </g>
          </g>

          {/* Bank Section Dividers */}
          <g transform="translate(64, 356)">
            <text x="0" y="0" fill="#CBFF49" fontSize="8.5" fontFamily="IBM Plex Mono" fontWeight="600" letterSpacing="1">
              MELODIC SLOTS [01–08]
            </text>
            <line x1="118" y1="-3" x2="232" y2="-3" stroke="#CBFF49" strokeOpacity="0.35" strokeWidth="1" />
          </g>

          <g transform="translate(64, 526)">
            <text x="0" y="0" fill="#FF6748" fontSize="8.5" fontFamily="IBM Plex Mono" fontWeight="600" letterSpacing="1">
              DRUM / SLICE SLOTS [09–16]
            </text>
            <line x1="145" y1="-3" x2="232" y2="-3" stroke="#FF6748" strokeOpacity="0.35" strokeWidth="1" />
          </g>

          {/* 4x4 Interactive Button Matrix (Pads 1–16) + Right Column Function Keys */}
          <g transform="translate(64, 368)">
            {Array.from({ length: 16 }).map((_, idx) => {
              const padNum = idx + 1;
              const col = idx % 4;
              const row = Math.floor(idx / 4);
              const x = col * 60;
              const y = row * 78 + (row >= 2 ? 18 : 0);
              const isMelodic = padNum <= 8;
              const isSpecSlot = spec.po33SlotNumber === padNum;
              const isStepActive = isPlaying && activeStep === idx;
              const isPressed = pressedPad === padNum;

              return (
                <g
                  key={padNum}
                  transform={`translate(${x}, ${y})`}
                  onClick={() => handlePadClick(padNum)}
                  className="cursor-pointer"
                >
                  <rect
                    x="0"
                    y="0"
                    width="48"
                    height="52"
                    rx="4"
                    fill={
                      isPressed || isStepActive
                        ? '#CBFF49'
                        : isSpecSlot
                        ? '#282E22'
                        : '#1A1E1E'
                    }
                    stroke={
                      isSpecSlot || isStepActive
                        ? '#CBFF49'
                        : isMelodic
                        ? '#F1EEE5'
                        : '#FF6748'
                    }
                    strokeOpacity={isSpecSlot || isStepActive ? '1' : '0.35'}
                    strokeWidth={isSpecSlot || isStepActive ? '2' : '1.2'}
                  />
                  {/* Tactile silver dome switch */}
                  <circle
                    cx="24"
                    cy="24"
                    r="10"
                    fill={isPressed || isStepActive ? '#111313' : '#2E3434'}
                    stroke="url(#po33Gold)"
                    strokeWidth="1.5"
                  />
                  {/* Pad number badge */}
                  <text
                    x="8"
                    y="13"
                    fill={isPressed || isStepActive ? '#111313' : '#F1EEE5'}
                    fontSize="9.5"
                    fontWeight="700"
                    fontFamily="IBM Plex Mono"
                  >
                    {String(padNum).padStart(2, '0')}
                  </text>
                  {/* LED indicator dot */}
                  <circle
                    cx="39"
                    cy="10"
                    r="2.5"
                    fill={isSpecSlot || isStepActive ? '#FF6748' : '#3A4040'}
                  />
                  {/* Bottom silkscreen sub-label */}
                  <text
                    x="24"
                    y="65"
                    textAnchor="middle"
                    fill="#F1EEE5"
                    fillOpacity="0.6"
                    fontSize="7.5"
                    fontFamily="IBM Plex Mono"
                  >
                    {isMelodic ? `MEL ${padNum}` : `DRM ${padNum}`}
                  </text>
                </g>
              );
            })}

            {/* Right-hand 4 Function Buttons Column: RECORD, FX, PLAY, WRITE */}
            {[
              { code: 'REC', accent: '#FF6748', row: 0 },
              { code: 'FX', accent: '#CBFF49', row: 1 },
              { code: 'PLAY', accent: '#F1EEE5', row: 2 },
              { code: 'WRITE', accent: '#FF6748', row: 3 },
            ].map((fn) => {
              const y = fn.row * 78 + (fn.row >= 2 ? 18 : 0);
              return (
                <g
                  key={fn.code}
                  transform={`translate(256, ${y})`}
                  onClick={() => handlePadClick(fn.row + 1)}
                  className="cursor-pointer"
                >
                  <rect
                    x="0"
                    y="0"
                    width="54"
                    height="52"
                    rx="4"
                    fill="#181C1C"
                    stroke={fn.accent}
                    strokeOpacity="0.55"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="27"
                    cy="24"
                    r="10"
                    fill={fn.code === 'REC' ? '#FF6748' : '#2E3434'}
                    stroke="url(#po33Gold)"
                    strokeWidth="1.5"
                  />
                  <text
                    x="27"
                    y="65"
                    textAnchor="middle"
                    fill={fn.accent}
                    fontSize="8.5"
                    fontWeight="700"
                    fontFamily="IBM Plex Mono"
                  >
                    {fn.code}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Interactive Hardware Inspection Hotspots (shown on Front Monolith or Hero) */}
        {mode === 'front-monolith' && (
          <div className="mt-4 border-t border-[#F1EEE5]/15 pt-4">
            <div className="flex flex-wrap gap-1.5 mb-3" role="tablist" aria-label="Hardware inspection points">
              {HOTSPOTS.map((spot) => {
                const active = selectedHotspot === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedHotspot(spot.id)}
                    className={`nc-btn-interactive px-2.5 py-1.5 font-mono-meta text-xs border whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#CBFF49] text-[#111313] border-[#CBFF49] font-semibold'
                        : 'bg-[#171A1A] text-[#F1EEE5]/80 border-[#F1EEE5]/20 hover:border-[#F1EEE5]/50'
                    }`}
                  >
                    {spot.label}
                  </button>
                );
              })}
            </div>
            {selectedHotspot && (
              <div className="bg-[#171A1A] border border-[#F1EEE5]/20 p-3.5">
                {HOTSPOTS.filter((h) => h.id === selectedHotspot).map((spot) => (
                  <div key={spot.id}>
                    <div className="font-mono-meta text-xs text-[#CBFF49] mb-1">
                      HARDWARE SPECIFICATION · {spot.label}
                    </div>
                    <div className="font-sans-body font-semibold text-sm text-[#F1EEE5] mb-1">
                      {spot.title}
                    </div>
                    <p className="font-sans-body text-xs text-[#F1EEE5]/75 leading-relaxed">
                      {spot.detail}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(noiseclub)/noiseclub/components/interactive/SpecimenVisual.tsx">
<![CDATA["use client";

import React, { useState } from 'react';
import { SpecimenId } from '../../lib/audio/sampleLibrary';

interface SpecimenVisualProps {
  id: SpecimenId;
  isSelected: boolean;
  isPlaying: boolean;
  className?: string;
}

/**
 * High-contrast archival field photography plate for each sound specimen.
 * Implements controlled 4-8px crop parallax on fine pointer hover per Section 7 of the brief.
 */
export const SpecimenVisual: React.FC<SpecimenVisualProps> = ({
  id,
  isSelected,
  isPlaying,
  className = '',
}) => {
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    // Controlled 4-8px crop parallax
    setOffset({
      x: Number((normX * 10).toFixed(1)),
      y: Number((normY * 10).toFixed(1)),
    });
  };

  const handlePointerLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden bg-[#0B0D0D] select-none ${className}`}
    >
      <div
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(1.04)`,
          transition: 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="w-full h-full"
      >
        {id === 'subway' && (
          <svg
            viewBox="0 0 480 320"
            className="w-full h-full object-cover block"
            role="img"
            aria-label="Archival macro photograph of subway carriage pneumatic sliding doors and steel latch"
          >
            <rect width="480" height="320" fill="#0D0F0F" />
            {/* High-contrast steel door panels */}
            <rect x="20" y="10" width="208" height="300" fill="#1A1D1D" stroke="#F1EEE5" strokeOpacity="0.25" />
            <rect x="252" y="10" width="208" height="300" fill="#161919" stroke="#F1EEE5" strokeOpacity="0.25" />
            {/* Center rubber pneumatic gap */}
            <rect x="228" y="0" width="24" height="320" fill="#070808" />
            <line x1="240" y1="0" x2="240" y2="320" stroke={isSelected ? '#CBFF49' : '#F1EEE5'} strokeWidth="1.5" strokeDasharray="6 4" />
            {/* Subway window frames */}
            <rect x="64" y="46" width="126" height="145" rx="8" fill="#090B0B" stroke="#F1EEE5" strokeOpacity="0.4" strokeWidth="3" />
            <rect x="290" y="46" width="126" height="145" rx="8" fill="#090B0B" stroke="#F1EEE5" strokeOpacity="0.4" strokeWidth="3" />
            {/* Pneumatic piston actuator */}
            <rect x="140" y="16" width="200" height="18" fill="#2A2E2E" stroke="#F1EEE5" strokeOpacity="0.5" />
            <circle cx="240" cy="25" r="14" fill="none" stroke={isPlaying ? '#FF6748' : '#CBFF49'} strokeWidth="2" />
            {/* Acoustic shockwave rings */}
            <circle cx="240" cy="160" r="45" fill="none" stroke="#F1EEE5" strokeOpacity="0.22" strokeWidth="1.5" />
            <circle cx="240" cy="160" r="85" fill="none" stroke="#CBFF49" strokeOpacity={isSelected ? '0.45' : '0.15'} strokeWidth="1" strokeDasharray="3 5" />
          </svg>
        )}

        {id === 'espresso' && (
          <svg
            viewBox="0 0 480 320"
            className="w-full h-full object-cover block"
            role="img"
            aria-label="Archival macro photograph of thick ceramic espresso cup and stainless steel spoon on zinc counter"
          >
            <rect width="480" height="320" fill="#0E1010" />
            {/* Zinc bar counter horizon */}
            <rect x="0" y="210" width="480" height="110" fill="#181B1B" />
            <line x1="0" y1="210" x2="480" y2="210" stroke="#F1EEE5" strokeOpacity="0.3" strokeWidth="1.5" />
            {/* Saucer */}
            <ellipse cx="240" cy="228" rx="125" ry="24" fill="#262A2A" stroke="#F1EEE5" strokeOpacity="0.5" strokeWidth="2" />
            {/* Heavy porcelain cup body */}
            <path d="M 165 110 L 315 110 L 296 218 Q 240 232 184 218 Z" fill="#2E3333" stroke="#F1EEE5" strokeOpacity="0.65" strokeWidth="2.5" />
            <ellipse cx="240" cy="110" rx="75" ry="18" fill="#121414" stroke="#F1EEE5" strokeOpacity="0.8" strokeWidth="2.5" />
            {/* Cup handle */}
            <path d="M 312 132 C 355 132, 355 194, 300 194" fill="none" stroke="#F1EEE5" strokeOpacity="0.65" strokeWidth="10" />
            {/* Stainless spoon striking rim */}
            <line x1="110" y1="42" x2="295" y2="114" stroke={isSelected ? '#CBFF49' : '#F1EEE5'} strokeWidth="5" strokeLinecap="round" />
            {/* Impact transient rays */}
            <circle cx="295" cy="114" r="24" fill="none" stroke={isPlaying ? '#FF6748' : '#CBFF49'} strokeWidth="2" />
            <circle cx="295" cy="114" r="52" fill="none" stroke="#F1EEE5" strokeOpacity="0.25" strokeDasharray="4 4" />
          </svg>
        )}

        {id === 'rain' && (
          <svg
            viewBox="0 0 480 320"
            className="w-full h-full object-cover block"
            role="img"
            aria-label="Archival macro photograph of storm rain droplets hitting corrugated zinc metal roof"
          >
            <rect width="480" height="320" fill="#0C0E0E" />
            {/* Corrugated zinc ridges */}
            {Array.from({ length: 8 }).map((_, idx) => (
              <path
                key={idx}
                d={`M 0 ${175 + idx * 20} Q 60 ${158 + idx * 20}, 120 ${175 + idx * 20} T 240 ${175 + idx * 20} T 360 ${175 + idx * 20} T 480 ${175 + idx * 20}`}
                fill="none"
                stroke="#F1EEE5"
                strokeOpacity={0.18 + idx * 0.05}
                strokeWidth="3"
              />
            ))}
            {/* Diagonal rain streaks */}
            <g stroke="#F1EEE5" strokeOpacity="0.4" strokeWidth="1.5">
              <line x1="120" y1="10" x2="95" y2="145" />
              <line x1="210" y1="20" x2="180" y2="170" />
              <line x1="310" y1="5" x2="282" y2="155" />
              <line x1="390" y1="30" x2="365" y2="165" />
            </g>
            {/* Splash ripples on zinc crest */}
            <ellipse cx="180" cy="172" rx="34" ry="11" fill="none" stroke={isSelected ? '#CBFF49' : '#F1EEE5'} strokeWidth="2" />
            <ellipse cx="180" cy="172" rx="64" ry="20" fill="none" stroke="#CBFF49" strokeOpacity="0.35" strokeDasharray="3 3" />
            <ellipse cx="282" cy="156" rx="28" ry="9" fill="none" stroke={isPlaying ? '#FF6748' : '#F1EEE5'} strokeWidth="1.8" />
          </svg>
        )}

        {id === 'footsteps' && (
          <svg
            viewBox="0 0 480 320"
            className="w-full h-full object-cover block"
            role="img"
            aria-label="Archival macro photograph of heavy rubber boot heel striking brutalist concrete stairwell step"
          >
            <rect width="480" height="320" fill="#0B0D0D" />
            {/* Brutalist concrete step geometry */}
            <polygon points="0,230 340,230 410,320 0,320" fill="#1C2020" stroke="#F1EEE5" strokeOpacity="0.4" strokeWidth="2" />
            <polygon points="140,150 480,150 480,230 140,230" fill="#141717" stroke="#F1EEE5" strokeOpacity="0.2" strokeWidth="1.5" />
            {/* Heavy lugged boot heel silhouette */}
            <path d="M 110 20 L 245 20 L 265 188 L 95 212 Z" fill="#252A2A" stroke="#F1EEE5" strokeOpacity="0.65" strokeWidth="2.5" />
            {/* Boot tread lugs */}
            <rect x="96" y="206" width="168" height="14" transform="rotate(-8 96 206)" fill={isSelected ? '#CBFF49' : '#F1EEE5'} />
            {/* Acoustic impact wave on concrete slab */}
            <ellipse cx="195" cy="228" rx="75" ry="14" fill="none" stroke={isPlaying ? '#FF6748' : '#CBFF49'} strokeWidth="2" />
            <ellipse cx="195" cy="228" rx="125" ry="24" fill="none" stroke="#F1EEE5" strokeOpacity="0.25" strokeDasharray="5 5" />
          </svg>
        )}

        {id === 'coin' && (
          <svg
            viewBox="0 0 480 320"
            className="w-full h-full object-cover block"
            role="img"
            aria-label="Archival macro photograph of spinning brass coin oscillating on brushed steel ticket plate"
          >
            <rect width="480" height="320" fill="#0D0F0F" />
            {/* Brushed steel surface lines */}
            <rect x="0" y="205" width="480" height="115" fill="#171A1A" />
            <line x1="0" y1="205" x2="480" y2="205" stroke="#F1EEE5" strokeOpacity="0.35" strokeWidth="1.5" />
            {/* Motion blur Euler spin ellipses */}
            <ellipse cx="240" cy="155" rx="68" ry="68" fill="none" stroke="#F1EEE5" strokeOpacity="0.18" strokeWidth="2" strokeDasharray="6 4" />
            <ellipse cx="240" cy="155" rx="46" ry="68" fill="none" stroke="#CBFF49" strokeOpacity="0.35" strokeWidth="2" />
            <ellipse
              cx="240"
              cy="155"
              rx="22"
              ry="68"
              fill="#2B3024"
              stroke={isSelected ? '#CBFF49' : '#F1EEE5'}
              strokeWidth="3"
            />
            {/* Contact point spark */}
            <circle cx="240" cy="223" r="8" fill={isPlaying ? '#FF6748' : '#CBFF49'} />
            <ellipse cx="240" cy="223" rx="90" ry="18" fill="none" stroke="#F1EEE5" strokeOpacity="0.3" />
          </svg>
        )}
      </div>

      {/* Halftone print overlay & archival corner crop marks */}
      <div className="pointer-events-none absolute inset-0 nc-print-grain opacity-70" />
      <div className="pointer-events-none absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#F1EEE5]/50" />
      <div className="pointer-events-none absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#F1EEE5]/50" />
      <div className="pointer-events-none absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#F1EEE5]/50" />
      <div className="pointer-events-none absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#F1EEE5]/50" />
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(noiseclub)/noiseclub/components/interactive/Waveform.tsx">
<![CDATA["use client";

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
]]>
    </file>
    <file path="src/app/(noiseclub)/noiseclub/components/layout/Header.tsx">
<![CDATA["use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'hear-everything', label: '01. Found Sounds' },
  { id: 'capture-it', label: '02. Capture' },
  { id: 'chop-it-up', label: '03. Chop' },
  { id: 'build-a-beat', label: '04. Rhythm Lab' },
  { id: 'break-the-rules', label: '05. FX Rules' },
];

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#111313]/95 border-b border-[#F1EEE5]/15">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-8 px-4 sm:px-8 h-14">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#the-signal"
          onClick={(e) => handleLinkClick(e, 'the-signal')}
          className="font-display text-2xl tracking-tight text-[#F1EEE5] hover:text-[#CBFF49] transition-colors whitespace-nowrap shrink-0"
        >
          NOISE CLUB®
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav aria-label="Chapter navigation" className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleLinkClick(e, item.id)}
              className="group relative py-1 font-sans-body text-sm font-medium text-[#F1EEE5]/80 hover:text-[#F1EEE5] transition-colors whitespace-nowrap shrink-0"
            >
              {item.label}
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[#CBFF49] scale-x-0 origin-left transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action (+ mobile menu trigger on small screens) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#take-the-noise"
            onClick={(e) => handleLinkClick(e, 'take-the-noise')}
            className="nc-btn-interactive px-4 py-2 bg-[#F1EEE5] text-[#111313] hover:bg-[#CBFF49] font-sans-body text-xs font-semibold tracking-wide whitespace-nowrap shrink-0"
          >
            View the PO-33
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden p-2 text-[#F1EEE5] hover:text-[#CBFF49] border border-[#F1EEE5]/20"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Editorial Shutter Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111313] border-b border-[#F1EEE5]/25 px-4 py-5">
          <nav aria-label="Mobile chapter navigation" className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className="py-2 border-b border-[#F1EEE5]/10 font-display text-2xl text-[#F1EEE5] hover:text-[#CBFF49] tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
]]>
    </file>
    <file path="src/app/(noiseclub)/noiseclub/components/layout/SiteFooter.tsx">
<![CDATA["use client";

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface SiteFooterProps {
  onNavigate: (sectionId: string) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  const [showColophon, setShowColophon] = useState(false);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <footer className="border-t border-[#F1EEE5]/20 bg-[#111313] text-[#F1EEE5] pt-14 pb-16 px-4 sm:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F1EEE5]/15">
          {/* Brand & Independent Attribution */}
          <div className="md:col-span-6 space-y-4">
            <div className="font-display text-3xl tracking-tight text-[#F1EEE5]">
              NOISE CLUB® · NC—001
            </div>
            <p className="font-sans-body text-sm text-[#F1EEE5]/80 max-w-xl leading-relaxed">
              An independent fictional creative concept featuring the PO-33 K.O! by Teenage Engineering.
              Not affiliated with or endorsed by Teenage Engineering.
            </p>
            <div className="font-mono-meta text-xs text-[#F1EEE5]/60">
              SOUND CULTURE DEPARTMENT · ISSUE 001 · ORDINARY NOISES ARE UNFINISHED MUSIC
            </div>
          </div>

          {/* Chapter Index */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="font-mono-meta text-xs text-[#CBFF49] uppercase tracking-wider">
              PUBLICATION INDEX
            </div>
            <ul className="space-y-1.5 font-sans-body text-sm text-[#F1EEE5]/80">
              <li>
                <a href="#the-signal" onClick={(e) => handleNav(e, 'the-signal')} className="hover:text-[#CBFF49] transition-colors">
                  00. The Signal
                </a>
              </li>
              <li>
                <a href="#hear-everything" onClick={(e) => handleNav(e, 'hear-everything')} className="hover:text-[#CBFF49] transition-colors">
                  01. Hear Everything
                </a>
              </li>
              <li>
                <a href="#capture-it" onClick={(e) => handleNav(e, 'capture-it')} className="hover:text-[#CBFF49] transition-colors">
                  02. Capture It
                </a>
              </li>
              <li>
                <a href="#chop-it-up" onClick={(e) => handleNav(e, 'chop-it-up')} className="hover:text-[#CBFF49] transition-colors">
                  03. Chop It Up
                </a>
              </li>
              <li>
                <a href="#build-a-beat" onClick={(e) => handleNav(e, 'build-a-beat')} className="hover:text-[#CBFF49] transition-colors">
                  04. Build a Beat
                </a>
              </li>
              <li>
                <a href="#break-the-rules" onClick={(e) => handleNav(e, 'break-the-rules')} className="hover:text-[#CBFF49] transition-colors">
                  05. Break the Rules
                </a>
              </li>
              <li>
                <a href="#take-the-noise" onClick={(e) => handleNav(e, 'take-the-noise')} className="hover:text-[#CBFF49] transition-colors">
                  06. Take the Noise
                </a>
              </li>
            </ul>
          </div>

          {/* Official Destination & Colophon Toggle */}
          <div className="md:col-span-3 space-y-4">
            <div className="font-mono-meta text-xs text-[#CBFF49] uppercase tracking-wider">
              OFFICIAL HARDWARE SOURCE
            </div>
            <p className="font-sans-body text-xs text-[#F1EEE5]/70 leading-relaxed">
              Verify current technical documentation, regional pricing, and hardware stock directly with the manufacturer.
            </p>
            <a
              href="https://teenage.engineering/store/po-33"
              target="_blank"
              rel="noopener noreferrer"
              className="nc-btn-interactive inline-flex items-center gap-2 px-4 py-2.5 bg-[#F1EEE5] text-[#111313] hover:bg-[#CBFF49] font-sans-body text-xs font-semibold whitespace-nowrap"
            >
              <span>teenage.engineering/store/po-33</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowColophon((prev) => !prev)}
                className="font-mono-meta text-xs text-[#F1EEE5]/70 hover:text-[#CBFF49] underline underline-offset-4"
              >
                {showColophon ? 'Hide Technical Colophon' : 'Read Technical Colophon & Provenance'}
              </button>
            </div>
          </div>
        </div>

        {/* Optional expandable Technical Colophon & Asset Provenance */}
        {showColophon && (
          <div className="mt-8 p-6 bg-[#171A1A] border border-[#F1EEE5]/20 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans-body text-xs text-[#F1EEE5]/80">
            <div>
              <div className="font-mono-meta text-[#CBFF49] mb-1.5">01 · AUDIO & WAVEFORM PROVENANCE</div>
              <p className="leading-relaxed">
                All five field specimens are synthesized in real time via Web Audio API physical modeling buffers (24 kHz 8-bit character). Every waveform silhouette is computed directly from the PCM channel data of the active AudioBuffer. Silent by default; zero copyrighted samples used.
              </p>
            </div>
            <div>
              <div className="font-mono-meta text-[#CBFF49] mb-1.5">02 · HARDWARE SPECIFICATION TRUTH</div>
              <p className="leading-relaxed">
                Represents verified Teenage Engineering PO-33 K.O! specifications: built-in Knowels electret microphone, 3.5mm stereo audio I/O, 40-second sample memory, 8 melodic sample slots, 8 drum slots, 16-step sequencer, and 16 punch-in effects.
              </p>
            </div>
            <div>
              <div className="font-mono-meta text-[#CBFF49] mb-1.5">03 · ACCESSIBILITY & REDUCED MOTION</div>
              <p className="leading-relaxed">
                Full keyboard navigation, screen-reader step status labels, non-audio visual state feedback, and automatic compliance with prefers-reduced-motion.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono-meta text-xs text-[#F1EEE5]/55">
          <div>NOISE CLUB® EDITORIAL ARCHIVE · NC—001 / FIELD NOTE 033</div>
          <div>SILENT BY DEFAULT · WEB AUDIO SYNTHESIS ENGINE · NO COOKIES OR TRACKERS</div>
        </div>
      </div>
    </footer>
  );
};
]]>
    </file>
    <file path="src/app/(noiseclub)/noiseclub/components/motion/ScrollOrchestrator.tsx">
<![CDATA["use client";

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

interface ScrollOrchestratorProps {
  children: React.ReactNode;
}

export const ScrollOrchestrator: React.FC<ScrollOrchestratorProps> = ({ children }) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    if (hasFinePointer) {
      lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };
      rafId = window.requestAnimationFrame(raf);
    }

    const ctx = gsap.context(() => {
      // Scene 00A — Automatic Intro (~1.8s, non-blocking, compositor transforms only)
      const introTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      introTl
        .fromTo(
          '[data-anim="hero-meta"]',
          { x: -16, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.45 },
          0.12
        )
        .fromTo(
          '[data-anim="hero-kicker"]',
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          0.2
        )
        .fromTo(
          '[data-anim="hero-word"]',
          { yPercent: 105 },
          { yPercent: 0, duration: 0.65, stagger: 0.055 },
          0.25
        )
        .fromTo(
          '[data-anim="hero-fingerprint"]',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          0.62
        )
        .fromTo(
          '[data-anim="hero-product"]',
          { y: 24, scale: 0.97, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.75 },
          0.78
        )
        .fromTo(
          '[data-anim="hero-copy"]',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          1.05
        );

      // Scene 01 — Specimen plates staggered entrance
      const specimenPlates = gsap.utils.toArray<HTMLElement>('[data-anim="specimen-plate"]');
      if (specimenPlates.length > 0) {
        gsap.fromTo(
          specimenPlates,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#hear-everything',
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Subtle chapter section reveals for Chapters 02–06
      ['#capture-it', '#chop-it-up', '#build-a-beat', '#break-the-rules', '#take-the-noise'].forEach(
        (selector) => {
          const el = document.querySelector(selector);
          if (!el) return;
          gsap.fromTo(
            el,
            { y: 24, opacity: 0.92 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 86%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      );
    });

    return () => {
      ctx.revert();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
};
]]>
    </file>
    <file path="src/app/(noiseclub)/noiseclub/lib/audio/audioEngine.ts">
<![CDATA[import { SOUND_SPECIMENS, SPECIMEN_MAP, SpecimenId } from './sampleLibrary';

export type EffectMode = 'stutter' | 'reverse' | 'octave';

class NoiseClubAudioEngine {
  private ctx: AudioContext | null = null;
  private buffers: Map<string, AudioBuffer> = new Map();
  private reversedBuffers: Map<string, AudioBuffer> = new Map();
  private waveforms: Map<string, number[]> = new Map();
  private activeSources: Set<AudioBufferSourceNode> = new Set();

  // Sequencer state
  private isPlayingSequencer = false;
  private bpm = 116;
  private currentStep = 0;
  private nextNoteTime = 0;
  private timerID: number | null = null;
  private activeSpecimenId: SpecimenId = 'subway';
  private useCustomMicBuffer = false;
  private pattern: boolean[][] = SOUND_SPECIMENS[0].defaultPattern.map((row) => [...row]);
  private stepListeners: Set<(step: number, playing: boolean) => void> = new Set();

  constructor() {
    // Precalculate deterministic authentic amplitude envelopes from the exact synthesis equations
    // so SVG/Canvas waveforms render immediately on SSR/initial paint without requiring AudioContext permission.
    SOUND_SPECIMENS.forEach((spec) => {
      const data = this.synthesizeRawChannelData(spec.id, 24000, spec.durationSec);
      this.waveforms.set(spec.id, this.computeEnvelope(data, 96));
    });
  }

  /**
   * Generates raw PCM float32 sample data for each field specimen using physical modeling synthesis.
   * Ensures both the visual amplitude fingerprint and the Web Audio buffer are 100% identical.
   */
  private synthesizeRawChannelData(id: SpecimenId, sampleRate: number, durationSec: number): Float32Array {
    const length = Math.floor(sampleRate * durationSec);
    const data = new Float32Array(length);

    // Deterministic PRNG for repeatable field texture
    let seed = id.split('').reduce((a, c) => a + c.charCodeAt(0) * 31, 1337);
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1073741824) / 1073741824;
    };

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const norm = i / length;
      let sample = 0;

      if (id === 'subway') {
        // Slice 1 (0..0.24): Low rubber seal thud
        if (norm < 0.24) {
          const lt = t;
          const env = Math.exp(-lt * 18);
          const pitch = 95 * Math.exp(-lt * 12) + 46;
          sample += Math.sin(2 * Math.PI * pitch * lt) * env * 0.92;
          sample += rand() * Math.exp(-lt * 35) * 0.35;
        }
        // Slice 2 (0.24..0.48): Solenoid latch metallic snap
        else if (norm < 0.48) {
          const lt = (norm - 0.24) * durationSec;
          const env = Math.exp(-lt * 28);
          sample += (
            Math.sin(2 * Math.PI * 420 * lt) * 0.45 +
            Math.sin(2 * Math.PI * 1180 * lt) * 0.35 +
            Math.sin(2 * Math.PI * 2640 * lt) * 0.25 +
            rand() * 0.55
          ) * env;
        }
        // Slice 3 (0.48..0.76): Pneumatic pressurized air hiss
        else if (norm < 0.76) {
          const lt = (norm - 0.48) * durationSec;
          const attack = Math.min(1, lt * 45);
          const decay = Math.exp(-lt * 6.5);
          const mod = 0.75 + 0.25 * Math.sin(2 * Math.PI * 38 * lt);
          sample += rand() * attack * decay * mod * 0.78;
          sample += Math.sin(2 * Math.PI * 620 * lt) * attack * decay * 0.18;
        }
        // Slice 4 (0.76..1.0): Steel frame resonant ring
        else {
          const lt = (norm - 0.76) * durationSec;
          const env = Math.exp(-lt * 9.5);
          sample += (
            Math.sin(2 * Math.PI * 220 * lt) * 0.5 +
            Math.sin(2 * Math.PI * 442 * lt) * 0.3 +
            Math.sin(2 * Math.PI * 885 * lt) * 0.2
          ) * env * 0.8;
        }
      } else if (id === 'espresso') {
        // Slice 1: Saucer base woody thump
        if (norm < 0.22) {
          const lt = t;
          const env = Math.exp(-lt * 22);
          sample += Math.sin(2 * Math.PI * (120 * Math.exp(-lt * 10) + 58) * lt) * env * 0.9;
          sample += rand() * Math.exp(-lt * 50) * 0.3;
        }
        // Slice 2: Stainless spoon rim clink
        else if (norm < 0.46) {
          const lt = (norm - 0.22) * durationSec;
          const env = Math.exp(-lt * 20);
          sample += (
            Math.sin(2 * Math.PI * 1480 * lt) * 0.5 +
            Math.sin(2 * Math.PI * 2910 * lt) * 0.35 +
            Math.sin(2 * Math.PI * 4320 * lt) * 0.2
          ) * env * 0.88;
        }
        // Slice 3: Steam wand rhythmic burst
        else if (norm < 0.74) {
          const lt = (norm - 0.46) * durationSec;
          const pulse = 0.6 + 0.4 * Math.sin(2 * Math.PI * 24 * lt);
          const env = Math.exp(-lt * 7);
          sample += (rand() * 0.65 + Math.sin(2 * Math.PI * 523.25 * lt) * 0.3) * pulse * env;
        }
        // Slice 4: Porcelain bell harmonic decay
        else {
          const lt = (norm - 0.74) * durationSec;
          const env = Math.exp(-lt * 8.5);
          sample += (
            Math.sin(2 * Math.PI * 659.25 * lt) * 0.55 +
            Math.sin(2 * Math.PI * 1318.5 * lt) * 0.3 +
            Math.sin(2 * Math.PI * 1975 * lt) * 0.15
          ) * env * 0.85;
        }
      } else if (id === 'rain') {
        // Slice 1: Gutter downspout hollow boom
        if (norm < 0.25) {
          const lt = t;
          const env = Math.exp(-lt * 16);
          sample += Math.sin(2 * Math.PI * (110 * Math.exp(-lt * 14) + 52) * lt) * env * 0.94;
          sample += Math.sin(2 * Math.PI * 185 * lt) * Math.exp(-lt * 24) * 0.35;
        }
        // Slice 2: Direct zinc drop ping
        else if (norm < 0.50) {
          const lt = (norm - 0.25) * durationSec;
          const env = Math.exp(-lt * 26);
          sample += (
            Math.sin(2 * Math.PI * 780 * lt + Math.sin(lt * 900) * 1.4) * 0.6 +
            rand() * 0.4
          ) * env * 0.85;
        }
        // Slice 3: Sheet wash shimmer (clustered drops)
        else if (norm < 0.78) {
          const lt = (norm - 0.50) * durationSec;
          const dropBurst = Math.pow(Math.sin(2 * Math.PI * 14 * lt), 2);
          const env = Math.exp(-lt * 4.5);
          sample += rand() * (0.4 + 0.6 * dropBurst) * env * 0.8;
        }
        // Slice 4: Hollow awning metallic resonance
        else {
          const lt = (norm - 0.78) * durationSec;
          const env = Math.exp(-lt * 9);
          sample += (
            Math.sin(2 * Math.PI * 310 * lt) * 0.5 +
            Math.sin(2 * Math.PI * 622 * lt) * 0.35 +
            Math.sin(2 * Math.PI * 934 * lt) * 0.2
          ) * env * 0.8;
        }
      } else if (id === 'footsteps') {
        // Slice 1: Sub-concrete heel stomp
        if (norm < 0.26) {
          const lt = t;
          const env = Math.exp(-lt * 15);
          const freq = 130 * Math.exp(-lt * 18) + 42;
          sample += Math.tanh(Math.sin(2 * Math.PI * freq * lt) * 1.8) * env * 0.92;
        }
        // Slice 2: Gravel sole crunch
        else if (norm < 0.52) {
          const lt = (norm - 0.26) * durationSec;
          const env = Math.exp(-lt * 21);
          sample += (rand() * 0.75 + Math.sin(2 * Math.PI * 290 * lt) * 0.45) * env * 0.9;
        }
        // Slice 3: Grit sole drag
        else if (norm < 0.77) {
          const lt = (norm - 0.52) * durationSec;
          const grain = Math.sin(2 * Math.PI * 28 * lt) > 0 ? 1 : 0.35;
          const env = Math.exp(-lt * 8);
          sample += rand() * grain * env * 0.78;
        }
        // Slice 4: Shaft slapback echo
        else {
          const lt = (norm - 0.77) * durationSec;
          const env = Math.exp(-lt * 11);
          sample += (
            Math.sin(2 * Math.PI * 165 * lt) * 0.5 +
            Math.sin(2 * Math.PI * 330 * lt) * 0.25 +
            rand() * 0.3
          ) * env * 0.75;
        }
      } else {
        // 'coin' — Dropped Brass Coin Spin
        // Slice 1: Steel ticket tray impact thud
        if (norm < 0.23) {
          const lt = t;
          const env = Math.exp(-lt * 19);
          sample += Math.sin(2 * Math.PI * (140 * Math.exp(-lt * 15) + 55) * lt) * env * 0.9;
        }
        // Slice 2: Brass edge strike
        else if (norm < 0.47) {
          const lt = (norm - 0.23) * durationSec;
          const env = Math.exp(-lt * 24);
          sample += (
            Math.sin(2 * Math.PI * 1760 * lt) * 0.5 +
            Math.sin(2 * Math.PI * 3520 * lt) * 0.35 +
            Math.sin(2 * Math.PI * 5280 * lt) * 0.2
          ) * env * 0.9;
        }
        // Slice 3: Accelerating Euler spin wobble
        else if (norm < 0.76) {
          const lt = (norm - 0.47) * durationSec;
          const wobbleRate = 12 + lt * 48;
          const am = 0.5 + 0.5 * Math.sin(2 * Math.PI * wobbleRate * lt);
          const env = Math.exp(-lt * 4.5);
          sample += (
            Math.sin(2 * Math.PI * 880 * lt) * 0.55 +
            Math.sin(2 * Math.PI * 1320 * lt) * 0.35 +
            rand() * 0.25
          ) * am * env * 0.88;
        }
        // Slice 4: High-frequency brass shudder
        else {
          const lt = (norm - 0.76) * durationSec;
          const env = Math.exp(-lt * 10);
          sample += (
            Math.sin(2 * Math.PI * 1046.5 * lt) * 0.5 +
            Math.sin(2 * Math.PI * 2093 * lt) * 0.35
          ) * env * 0.82;
        }
      }

      // Subtle 8-bit PO-33 converter character (quantization + warm saturation)
      const quantized = Math.round(sample * 64) / 64;
      data[i] = Math.max(-0.98, Math.min(0.98, quantized));
    }

    return data;
  }

  private computeEnvelope(data: Float32Array, buckets = 96): number[] {
    const step = Math.floor(data.length / buckets) || 1;
    const result: number[] = [];
    for (let b = 0; b < buckets; b++) {
      let sumSq = 0;
      let peak = 0;
      const start = b * step;
      const end = Math.min(data.length, start + step);
      for (let i = start; i < end; i++) {
        const abs = Math.abs(data[i]);
        sumSq += abs * abs;
        if (abs > peak) peak = abs;
      }
      const rms = Math.sqrt(sumSq / Math.max(1, end - start));
      const val = Math.min(1, Math.max(0.06, rms * 1.45 + peak * 0.35));
      result.push(Number(val.toFixed(3)));
    }
    return result;
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    // Hydrate AudioBuffers once context exists
    if (this.buffers.size === 0 && this.ctx) {
      SOUND_SPECIMENS.forEach((spec) => {
        const raw = this.synthesizeRawChannelData(spec.id, this.ctx!.sampleRate, spec.durationSec);
        const buf = this.ctx!.createBuffer(1, raw.length, this.ctx!.sampleRate);
        buf.getChannelData(0).set(raw);
        this.buffers.set(spec.id, buf);

        // Also create reversed buffer for authentic Reverse FX
        const revBuf = this.ctx!.createBuffer(1, raw.length, this.ctx!.sampleRate);
        const revData = new Float32Array(raw.length);
        for (let i = 0; i < raw.length; i++) {
          revData[i] = raw[raw.length - 1 - i];
        }
        revBuf.getChannelData(0).set(revData);
        this.reversedBuffers.set(spec.id, revBuf);
      });
    }
    return this.ctx;
  }

  public getWaveform(id: SpecimenId | 'custom-mic'): number[] {
    if (id === 'custom-mic' && this.waveforms.has('custom-mic')) {
      return this.waveforms.get('custom-mic')!;
    }
    return this.waveforms.get(id) || this.waveforms.get('subway')!;
  }

  public hasCustomMicSample(): boolean {
    return this.buffers.has('custom-mic');
  }

  public setUseCustomMic(useMic: boolean): void {
    if (useMic && this.buffers.has('custom-mic')) {
      this.useCustomMicBuffer = true;
    } else {
      this.useCustomMicBuffer = false;
    }
  }

  public isUsingCustomMic(): boolean {
    return this.useCustomMicBuffer && this.buffers.has('custom-mic');
  }

  public stopAllActiveSounds(): void {
    this.activeSources.forEach((src) => {
      try {
        src.stop();
      } catch {
        // Ignore already stopped source
      }
    });
    this.activeSources.clear();
  }

  /**
   * Plays a full field recording specimen or a specific slice (0..3).
   */
  public playSpecimen(
    id: SpecimenId,
    options?: {
      sliceIndex?: number;
      playbackRate?: number;
      useCustomIfActive?: boolean;
      onEnded?: () => void;
    }
  ): void {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const key = options?.useCustomIfActive && this.isUsingCustomMic() ? 'custom-mic' : id;
    const buffer = this.buffers.get(key) || this.buffers.get(id);
    if (!buffer) return;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = options?.playbackRate ?? 1.0;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.85, ctx.currentTime);

    source.connect(gain);
    gain.connect(ctx.destination);

    let offset = 0;
    let duration = buffer.duration;

    if (typeof options?.sliceIndex === 'number') {
      const spec = SPECIMEN_MAP[id];
      const slice = spec.slices[options.sliceIndex];
      if (slice) {
        offset = slice.startRatio * buffer.duration;
        duration = (slice.endRatio - slice.startRatio) * buffer.duration;
        // Micro fade-out to avoid click at slice boundary
        gain.gain.setValueAtTime(0.9, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + Math.max(0.05, duration / source.playbackRate.value));
      }
    }

    this.activeSources.add(source);
    source.onended = () => {
      this.activeSources.delete(source);
      options?.onEnded?.();
    };

    source.start(ctx.currentTime, offset, duration);
  }

  /**
   * Plays the active specimen transformed by one of the three Chapter 05 FX modes:
   * - 'stutter': Rapid 1/16th grain repeat of the transient slice
   * - 'reverse': Full reversed buffer playback
   * - 'octave': Simultaneous 0.5x sub-octave + 2.0x high-octave harmonic transformation
   */
  public playEffectDemo(id: SpecimenId, effect: EffectMode, onComplete?: () => void): void {
    const ctx = this.ensureContext();
    if (!ctx) return;
    this.stopAllActiveSounds();

    const key = this.isUsingCustomMic() ? 'custom-mic' : id;
    const buffer = this.buffers.get(key) || this.buffers.get(id);
    if (!buffer) return;

    const now = ctx.currentTime;

    if (effect === 'stutter') {
      // Schedule 8 rapid 110ms stutter repeats across Slice 1 & Slice 2
      const repeatCount = 8;
      const grainDuration = 0.115;
      const sliceOffset = buffer.duration * 0.24;

      for (let i = 0; i < repeatCount; i++) {
        const src = ctx.createBufferSource();
        src.buffer = buffer;
        src.playbackRate.value = 1 + (i % 2) * 0.08;

        const gain = ctx.createGain();
        const startTime = now + i * grainDuration;
        gain.gain.setValueAtTime(0.88, startTime);
        gain.gain.exponentialRampToValueAtTime(0.05, startTime + grainDuration * 0.92);

        src.connect(gain);
        gain.connect(ctx.destination);
        this.activeSources.add(src);
        src.onended = () => {
          this.activeSources.delete(src);
          if (i === repeatCount - 1) onComplete?.();
        };
        src.start(startTime, sliceOffset, grainDuration);
      }
    } else if (effect === 'reverse') {
      const revBuffer = this.reversedBuffers.get(key) || this.reversedBuffers.get(id);
      if (!revBuffer) return;

      const src = ctx.createBufferSource();
      src.buffer = revBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(2800, now + revBuffer.duration * 0.9);
      filter.Q.value = 1.2;

      const dryGain = ctx.createGain();
      dryGain.gain.value = 0.75;
      const wetGain = ctx.createGain();
      wetGain.gain.value = 0.45;

      src.connect(dryGain);
      dryGain.connect(ctx.destination);
      src.connect(filter);
      filter.connect(wetGain);
      wetGain.connect(ctx.destination);

      this.activeSources.add(src);
      src.onended = () => {
        this.activeSources.delete(src);
        onComplete?.();
      };
      src.start(now);
    } else if (effect === 'octave') {
      // Sub-octave (0.5x) + Upper Octave (2.0x) pitched layer
      const subSrc = ctx.createBufferSource();
      subSrc.buffer = buffer;
      subSrc.playbackRate.value = 0.55;

      const hiSrc = ctx.createBufferSource();
      hiSrc.buffer = buffer;
      hiSrc.playbackRate.value = 1.85;

      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.75, now);
      subGain.gain.exponentialRampToValueAtTime(0.02, now + 1.5);

      const hiGain = ctx.createGain();
      hiGain.gain.setValueAtTime(0.55, now);
      hiGain.gain.exponentialRampToValueAtTime(0.02, now + 1.1);

      subSrc.connect(subGain);
      subGain.connect(ctx.destination);

      hiSrc.connect(hiGain);
      hiGain.connect(ctx.destination);

      this.activeSources.add(subSrc);
      this.activeSources.add(hiSrc);

      subSrc.onended = () => {
        this.activeSources.delete(subSrc);
        onComplete?.();
      };
      hiSrc.onended = () => {
        this.activeSources.delete(hiSrc);
      };

      subSrc.start(now, 0, Math.min(buffer.duration, 0.9));
      hiSrc.start(now, 0, buffer.duration);
    }
  }

  /**
   * Optional user-initiated 2.0-second microphone field recording (stays 100% in local RAM).
   */
  public async recordFromMicrophone(durationMs = 1800): Promise<number[]> {
    if (typeof window === 'undefined' || typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      return [];
    }
    const ctx = this.ensureContext();
    if (!ctx) return [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks: BlobPart[] = [];

    return new Promise((resolve, reject) => {
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      mediaRecorder.onerror = (err) => {
        stream.getTracks().forEach((t) => t.stop());
        reject(err);
      };
      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        try {
          const blob = new Blob(chunks, { type: mediaRecorder.mimeType || 'audio/webm' });
          const arrayBuffer = await blob.arrayBuffer();
          const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
          this.buffers.set('custom-mic', audioBuffer);

          // Also build reversed buffer
          const raw = audioBuffer.getChannelData(0);
          const revBuf = ctx.createBuffer(1, raw.length, audioBuffer.sampleRate);
          const revData = new Float32Array(raw.length);
          for (let i = 0; i < raw.length; i++) {
            revData[i] = raw[raw.length - 1 - i];
          }
          revBuf.getChannelData(0).set(revData);
          this.reversedBuffers.set('custom-mic', revBuf);

          const env = this.computeEnvelope(raw, 96);
          this.waveforms.set('custom-mic', env);
          this.useCustomMicBuffer = true;
          resolve(env);
        } catch (decodeErr) {
          reject(decodeErr);
        }
      };

      mediaRecorder.start();
      window.setTimeout(() => {
        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
      }, durationMs);
    });
  }

  // --- 16-STEP LOOKAHEAD SEQUENCER ---

  public setSequencerSpecimen(id: SpecimenId): void {
    this.activeSpecimenId = id;
  }

  public getSequencerPattern(): boolean[][] {
    return this.pattern;
  }

  public setSequencerPattern(newPattern: boolean[][]): void {
    this.pattern = newPattern.map((row) => [...row]);
  }

  public toggleStep(trackIndex: number, stepIndex: number): boolean[][] {
    if (this.pattern[trackIndex] && typeof this.pattern[trackIndex][stepIndex] === 'boolean') {
      this.pattern[trackIndex][stepIndex] = !this.pattern[trackIndex][stepIndex];
    }
    return this.pattern.map((row) => [...row]);
  }

  public clearPattern(): boolean[][] {
    this.pattern = this.pattern.map((row) => row.map(() => false));
    return this.pattern.map((row) => [...row]);
  }

  public resetDefaultPattern(id: SpecimenId): boolean[][] {
    const spec = SPECIMEN_MAP[id];
    this.pattern = spec.defaultPattern.map((row) => [...row]);
    return this.pattern.map((row) => [...row]);
  }

  public setBpm(bpm: number): void {
    this.bpm = Math.max(70, Math.min(160, bpm));
  }

  public getBpm(): number {
    return this.bpm;
  }

  public subscribeSequencer(cb: (step: number, playing: boolean) => void): () => void {
    this.stepListeners.add(cb);
    return () => {
      this.stepListeners.delete(cb);
    };
  }

  private notifySequencerListeners(step: number, playing: boolean): void {
    this.stepListeners.forEach((cb) => cb(step, playing));
  }

  public startSequencer(): void {
    const ctx = this.ensureContext();
    if (!ctx || this.isPlayingSequencer) return;

    this.isPlayingSequencer = true;
    this.currentStep = 0;
    this.nextNoteTime = ctx.currentTime + 0.04;
    this.scheduler();
  }

  public stopSequencer(): void {
    this.isPlayingSequencer = false;
    if (this.timerID !== null && typeof window !== 'undefined') {
      window.clearTimeout(this.timerID);
      this.timerID = null;
    }
    this.notifySequencerListeners(this.currentStep, false);
  }

  public isSequencerPlaying(): boolean {
    return this.isPlayingSequencer;
  }

  private scheduler = (): void => {
    if (!this.isPlayingSequencer || !this.ctx) return;

    const scheduleAheadTime = 0.1; // 100ms lookahead window
    while (this.nextNoteTime < this.ctx.currentTime + scheduleAheadTime) {
      this.scheduleStep(this.currentStep, this.nextNoteTime);
      this.advanceStep();
    }

    if (typeof window !== 'undefined') {
      this.timerID = window.setTimeout(this.scheduler, 25);
    }
  };

  private advanceStep(): void {
    const secondsPerBeat = 60.0 / this.bpm;
    const sixteenthNoteTime = 0.25 * secondsPerBeat;
    this.nextNoteTime += sixteenthNoteTime;
    this.currentStep = (this.currentStep + 1) % 16;
  }

  private scheduleStep(stepIndex: number, time: number): void {
    if (!this.ctx) return;

    // Schedule visual UI update synchronized to audio clock
    if (typeof window !== 'undefined') {
      const delayMs = Math.max(0, (time - this.ctx.currentTime) * 1000);
      window.setTimeout(() => {
        if (this.isPlayingSequencer) {
          this.notifySequencerListeners(stepIndex, true);
        }
      }, delayMs);
    }

    const key = this.isUsingCustomMic() ? 'custom-mic' : this.activeSpecimenId;
    const buffer = this.buffers.get(key) || this.buffers.get(this.activeSpecimenId);
    if (!buffer) return;

    const spec = SPECIMEN_MAP[this.activeSpecimenId];

    for (let track = 0; track < 4; track++) {
      if (this.pattern[track]?.[stepIndex]) {
        const slice = spec.slices[track];
        if (!slice) continue;

        const src = this.ctx.createBufferSource();
        src.buffer = buffer;

        // Subtle musical pitch shaping per track role
        const rates = [0.95, 1.05, 1.15, stepIndex % 4 === 0 ? 1.0 : 1.12];
        src.playbackRate.setValueAtTime(rates[track] || 1.0, time);

        const gain = this.ctx.createGain();
        const offset = slice.startRatio * buffer.duration;
        const sliceDur = Math.min(0.28, (slice.endRatio - slice.startRatio) * buffer.duration);

        const trackVolumes = [0.92, 0.82, 0.65, 0.72];
        gain.gain.setValueAtTime(trackVolumes[track] ?? 0.8, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + sliceDur);

        src.connect(gain);
        gain.connect(this.ctx.destination);
        src.start(time, offset, sliceDur);
      }
    }
  }
}

export const audioEngine = new NoiseClubAudioEngine();
]]>
    </file>
    <file path="src/app/(noiseclub)/noiseclub/lib/audio/sampleLibrary.ts">
<![CDATA[export type SpecimenId = 'subway' | 'espresso' | 'rain' | 'footsteps' | 'coin';

export interface SampleSlice {
  index: number;
  code: string;
  label: string;
  role: 'LOW IMPACT' | 'TRANSIENT SNAP' | 'TEXTURE PULSE' | 'TONAL TAIL';
  startRatio: number;
  endRatio: number;
  po33Slot: string;
}

export interface SoundSpecimenData {
  id: SpecimenId;
  catalogId: string;
  fieldNote: string;
  title: string;
  subtitle: string;
  location: string;
  durationSec: number;
  durationLabel: string;
  sampleRateLabel: string;
  po33Bank: 'MELODIC [01-08]' | 'DRUM KIT [09-16]';
  po33SlotNumber: number;
  peakDb: string;
  description: string;
  captureMethod: string;
  slices: [SampleSlice, SampleSlice, SampleSlice, SampleSlice];
  defaultPattern: boolean[][]; // 4 tracks x 16 steps
}

export const SOUND_SPECIMENS: SoundSpecimenData[] = [
  {
    id: 'subway',
    catalogId: 'NC—001 / SPECIMEN 01',
    fieldNote: 'FIELD NOTE / 033-A',
    title: 'Subway Door Pneumatic',
    subtitle: 'Compressed air release & steel latch impact',
    location: 'Line U8 Platform, Alexanderplatz · 02:14',
    durationSec: 1.6,
    durationLabel: '00:01.60',
    sampleRateLabel: '24.0 kHz / 8-BIT',
    po33Bank: 'DRUM KIT [09-16]',
    po33SlotNumber: 9,
    peakDb: '-1.4 dBFS',
    description:
      'A dual-stage mechanical transient: a sharp solenoid latch click followed by a dense pressurized air burst and rubber seal thud.',
    captureMethod: 'PO-33 Built-in Knowels Electret Mic · 18cm distance',
    slices: [
      {
        index: 0,
        code: 'SLICE 01',
        label: 'Rubber Seal Thud',
        role: 'LOW IMPACT',
        startRatio: 0.0,
        endRatio: 0.24,
        po33Slot: 'SLOT 09 · PAD 01',
      },
      {
        index: 1,
        code: 'SLICE 02',
        label: 'Solenoid Latch Snap',
        role: 'TRANSIENT SNAP',
        startRatio: 0.24,
        endRatio: 0.48,
        po33Slot: 'SLOT 09 · PAD 05',
      },
      {
        index: 2,
        code: 'SLICE 03',
        label: 'Pneumatic Air Hiss',
        role: 'TEXTURE PULSE',
        startRatio: 0.48,
        endRatio: 0.76,
        po33Slot: 'SLOT 09 · PAD 09',
      },
      {
        index: 3,
        code: 'SLICE 04',
        label: 'Steel Frame Ring',
        role: 'TONAL TAIL',
        startRatio: 0.76,
        endRatio: 1.0,
        po33Slot: 'SLOT 09 · PAD 13',
      },
    ],
    defaultPattern: [
      [true, false, false, false, true, false, false, false, true, false, false, true, false, false, true, false],
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, true],
      [false, false, true, false, false, false, true, true, false, false, true, false, false, false, true, false],
      [true, false, false, false, false, false, true, false, false, true, false, false, false, false, false, true],
    ],
  },
  {
    id: 'espresso',
    catalogId: 'NC—001 / SPECIMEN 02',
    fieldNote: 'FIELD NOTE / 033-B',
    title: 'Ceramic Cup & Spoon',
    subtitle: 'Thick porcelain rim strike & harmonic ring',
    location: 'Kottbusser Tor Corner Bar · 09:42',
    durationSec: 1.4,
    durationLabel: '00:01.40',
    sampleRateLabel: '24.0 kHz / 8-BIT',
    po33Bank: 'MELODIC [01-08]',
    po33SlotNumber: 2,
    peakDb: '-2.1 dBFS',
    description:
      'High-pitched porcelain resonance with a woody zinc countertop knock underneath. Chromatically playable across 16 keys in Melodic Bank.',
    captureMethod: 'PO-33 Built-in Mic · Countertop contact proximity',
    slices: [
      {
        index: 0,
        code: 'SLICE 01',
        label: 'Saucer Base Thump',
        role: 'LOW IMPACT',
        startRatio: 0.0,
        endRatio: 0.22,
        po33Slot: 'SLOT 02 · KEY C3',
      },
      {
        index: 1,
        code: 'SLICE 02',
        label: 'Stainless Rim Clink',
        role: 'TRANSIENT SNAP',
        startRatio: 0.22,
        endRatio: 0.46,
        po33Slot: 'SLOT 02 · KEY E3',
      },
      {
        index: 2,
        code: 'SLICE 03',
        label: 'Steam Wand Burst',
        role: 'TEXTURE PULSE',
        startRatio: 0.46,
        endRatio: 0.74,
        po33Slot: 'SLOT 02 · KEY G3',
      },
      {
        index: 3,
        code: 'SLICE 04',
        label: 'Porcelain Bell Decay',
        role: 'TONAL TAIL',
        startRatio: 0.74,
        endRatio: 1.0,
        po33Slot: 'SLOT 02 · KEY B3',
      },
    ],
    defaultPattern: [
      [true, false, false, true, false, false, true, false, true, false, false, false, true, false, false, false],
      [false, false, true, false, true, false, false, false, false, false, true, false, true, false, true, false],
      [true, true, false, true, true, false, true, true, true, true, false, true, true, false, true, false],
      [false, false, false, true, false, false, false, true, false, false, true, false, false, false, false, true],
    ],
  },
  {
    id: 'rain',
    catalogId: 'NC—001 / SPECIMEN 03',
    fieldNote: 'FIELD NOTE / 033-C',
    title: 'Rain on Corrugated Zinc',
    subtitle: 'Heavy storm droplets striking hollow metal awning',
    location: 'Freight Courtyard, Kanalstraße · 19:08',
    durationSec: 1.8,
    durationLabel: '00:01.80',
    sampleRateLabel: '24.0 kHz / 8-BIT',
    po33Bank: 'DRUM KIT [09-16]',
    po33SlotNumber: 12,
    peakDb: '-1.8 dBFS',
    description:
      'Dense natural vinyl-crackle substitute combined with hollow metallic pings that slice cleanly into micro-percussion hats and shakers.',
    captureMethod: 'PO-33 3.5mm Line-In via Contact Piezo Disc',
    slices: [
      {
        index: 0,
        code: 'SLICE 01',
        label: 'Gutter Downspout Boom',
        role: 'LOW IMPACT',
        startRatio: 0.0,
        endRatio: 0.25,
        po33Slot: 'SLOT 12 · PAD 02',
      },
      {
        index: 1,
        code: 'SLICE 02',
        label: 'Direct Zinc Drop Ping',
        role: 'TRANSIENT SNAP',
        startRatio: 0.25,
        endRatio: 0.50,
        po33Slot: 'SLOT 12 · PAD 06',
      },
      {
        index: 2,
        code: 'SLICE 03',
        label: 'Sheet Wash Shimmer',
        role: 'TEXTURE PULSE',
        startRatio: 0.50,
        endRatio: 0.78,
        po33Slot: 'SLOT 12 · PAD 10',
      },
      {
        index: 3,
        code: 'SLICE 04',
        label: 'Hollow Awning Resonance',
        role: 'TONAL TAIL',
        startRatio: 0.78,
        endRatio: 1.0,
        po33Slot: 'SLOT 12 · PAD 14',
      },
    ],
    defaultPattern: [
      [true, false, false, false, false, false, true, false, true, false, false, false, false, true, false, false],
      [false, false, false, false, true, false, false, true, false, false, false, false, true, false, false, false],
      [true, false, true, true, false, true, true, false, true, false, true, true, false, true, true, true],
      [false, true, false, false, false, false, false, true, false, false, true, false, false, false, true, false],
    ],
  },
  {
    id: 'footsteps',
    catalogId: 'NC—001 / SPECIMEN 04',
    fieldNote: 'FIELD NOTE / 033-D',
    title: 'Concrete Stairwell Step',
    subtitle: 'Heavy rubber heel impact & grit scrape in Brutalist shaft',
    location: 'Parking Structure B, Level -3 · 23:51',
    durationSec: 1.5,
    durationLabel: '00:01.50',
    sampleRateLabel: '24.0 kHz / 8-BIT',
    po33Bank: 'DRUM KIT [09-16]',
    po33SlotNumber: 14,
    peakDb: '-0.9 dBFS',
    description:
      'Natural concrete chamber compression turns an ordinary boot stomp into a cavernous 90s boom-bap kick and gritty snare tail.',
    captureMethod: 'PO-33 Built-in Mic · Stairwell landing floor placement',
    slices: [
      {
        index: 0,
        code: 'SLICE 01',
        label: 'Sub-Concrete Heel Stomp',
        role: 'LOW IMPACT',
        startRatio: 0.0,
        endRatio: 0.26,
        po33Slot: 'SLOT 14 · PAD 01',
      },
      {
        index: 1,
        code: 'SLICE 02',
        label: 'Gravel Sole Crunch',
        role: 'TRANSIENT SNAP',
        startRatio: 0.26,
        endRatio: 0.52,
        po33Slot: 'SLOT 14 · PAD 04',
      },
      {
        index: 2,
        code: 'SLICE 03',
        label: 'Grit Sole Drag',
        role: 'TEXTURE PULSE',
        startRatio: 0.52,
        endRatio: 0.77,
        po33Slot: 'SLOT 14 · PAD 08',
      },
      {
        index: 3,
        code: 'SLICE 04',
        label: 'Shaft Slapback Echo',
        role: 'TONAL TAIL',
        startRatio: 0.77,
        endRatio: 1.0,
        po33Slot: 'SLOT 14 · PAD 16',
      },
    ],
    defaultPattern: [
      [true, false, false, false, false, false, false, true, true, false, true, false, false, false, false, false],
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
      [false, true, true, false, false, true, false, false, false, true, true, false, false, true, true, false],
      [false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true],
    ],
  },
  {
    id: 'coin',
    catalogId: 'NC—001 / SPECIMEN 05',
    fieldNote: 'FIELD NOTE / 033-E',
    title: 'Dropped Brass Coin Spin',
    subtitle: 'Accelerating Euler’s disk oscillation on steel plate',
    location: 'Automat Ticket Kiosk, Warschauer Str. · 01:19',
    durationSec: 1.7,
    durationLabel: '00:01.70',
    sampleRateLabel: '24.0 kHz / 8-BIT',
    po33Bank: 'MELODIC [01-08]',
    po33SlotNumber: 5,
    peakDb: '-1.6 dBFS',
    description:
      'Starts with a sharp brass edge strike and accelerates into a pitched metallic trill before settling flat.',
    captureMethod: 'PO-33 Built-in Mic · 10cm above steel ticket tray',
    slices: [
      {
        index: 0,
        code: 'SLICE 01',
        label: 'Tray Impact Thud',
        role: 'LOW IMPACT',
        startRatio: 0.0,
        endRatio: 0.23,
        po33Slot: 'SLOT 05 · KEY C3',
      },
      {
        index: 1,
        code: 'SLICE 02',
        label: 'Brass Edge Strike',
        role: 'TRANSIENT SNAP',
        startRatio: 0.23,
        endRatio: 0.47,
        po33Slot: 'SLOT 05 · KEY F3',
      },
      {
        index: 2,
        code: 'SLICE 03',
        label: 'Accelerating Spin Wobble',
        role: 'TEXTURE PULSE',
        startRatio: 0.47,
        endRatio: 0.76,
        po33Slot: 'SLOT 05 · KEY G#3',
      },
      {
        index: 3,
        code: 'SLICE 04',
        label: 'High-Frequency Shudder',
        role: 'TONAL TAIL',
        startRatio: 0.76,
        endRatio: 1.0,
        po33Slot: 'SLOT 05 · KEY C4',
      },
    ],
    defaultPattern: [
      [true, false, false, false, true, false, false, false, true, false, false, false, true, false, true, false],
      [false, false, true, false, false, false, true, false, false, false, true, false, false, true, false, true],
      [false, true, false, true, false, true, false, true, false, true, false, true, false, false, true, false],
      [true, false, false, false, false, false, false, true, false, false, false, true, false, false, false, false],
    ],
  },
];

export const SPECIMEN_MAP: Record<SpecimenId, SoundSpecimenData> = SOUND_SPECIMENS.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<SpecimenId, SoundSpecimenData>
);
]]>
    </file>
  </files>
</template>
