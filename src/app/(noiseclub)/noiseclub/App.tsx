"use client";

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
