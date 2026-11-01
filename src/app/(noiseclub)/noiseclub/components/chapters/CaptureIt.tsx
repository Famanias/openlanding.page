"use client";

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
