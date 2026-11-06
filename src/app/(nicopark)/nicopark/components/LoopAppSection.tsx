"use client";

import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Sun,
  Moon,
  Repeat,
  Sliders
} from 'lucide-react';
import {
  LOOP_TRACKS,
  cycleLoopTrack,
  formatTrackTime
} from '../data/portfolioData';

export const LoopAppSection: React.FC = () => {
  const [currentTrackId, setCurrentTrackId] = useState<string>(LOOP_TRACKS[0].id);
  const [isPlayingDemo, setIsPlayingDemo] = useState<boolean>(true);
  const [elapsedSec, setElapsedSec] = useState<number>(42);
  const [volume, setVolume] = useState<number>(78);
  const [highContrastMode, setHighContrastMode] = useState<boolean>(false);
  const [loopRegionActive, setLoopRegionActive] = useState<boolean>(true);
  const [tactileDetentMode, setTactileDetentMode] = useState<boolean>(true);
  const [dialAngle, setDialAngle] = useState<number>(45);

  const currentTrack = LOOP_TRACKS.find((t) => t.id === currentTrackId) || LOOP_TRACKS[0];

  // Progress timer when demo is in active playing state
  useEffect(() => {
    if (!isPlayingDemo) return;
    const interval = window.setInterval(() => {
      setElapsedSec((prev) => {
        if (prev + 1 >= currentTrack.durationSec) {
          return 0;
        }
        return prev + 1;
      });
      setDialAngle((prev) => (prev + 6) % 360);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isPlayingDemo, currentTrack.durationSec]);

  const handleTrackSwitch = (dir: 1 | -1) => {
    const next = cycleLoopTrack(currentTrack.id, dir);
    setCurrentTrackId(next.id);
    setElapsedSec(18);
    setDialAngle((prev) => (prev + dir * 30 + 360) % 360);
  };

  const progressPercent = Math.min(
    100,
    Math.round((elapsedSec / currentTrack.durationSec) * 100)
  );

  return (
    <section
      id="loop-app"
      aria-labelledby="loop-app-heading"
      className="scroll-mt-20 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-t-2 border-[#191919]"
    >
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <p className="font-condensed font-bold text-[15px] sm:text-[17px] tracking-[0.05em] uppercase text-[#515151] mb-2">
            CHAPTER 04 · APPARATUS UI & COMPANION INTERFACE
          </p>
          <h2
            id="loop-app-heading"
            className="font-display uppercase text-[50px] sm:text-[68px] lg:text-[80px] leading-[0.9] text-[#191919]"
          >
            LOOP <span className="text-[#3049F0]">APP PREVIEW.</span>
          </h2>
        </div>

        {/* Explicit Honest Demo State Notice */}
        <div className="bg-[#F7E36B] border-2 border-[#191919] rounded-2xl px-4 py-3 max-w-md">
          <div className="font-mono-tech text-xs font-bold uppercase text-[#191919]">
            INTERACTIVE UI PREVIEW · SILENT DEMO MODE
          </div>
          <p className="text-xs text-[#191919]/85 mt-0.5">
            Live HTML/SVG state machine simulating LOOP’s companion screen and rotary stem looper (no audio output).
          </p>
        </div>
      </div>

      {/* Main Split: Left Interactive Apparatus Device Stage / Right Track & Parameter Lab */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
        {/* Left 7 Cols: Butter-Yellow Apparatus Stage */}
        <div className="lg:col-span-7 bg-[#F7E36B] border-2 border-[#191919] rounded-[24px] p-6 sm:p-9 flex flex-col items-center justify-between">
          <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-6">
            <span className="font-condensed font-bold text-sm uppercase tracking-wider text-[#191919]">
              02 · LOOP APPARATUS OS v2.4 (SIMULATED)
            </span>
            <button
              type="button"
              onClick={() => setHighContrastMode((prev) => !prev)}
              aria-pressed={highContrastMode}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#191919] text-[#F8F7F2] font-condensed font-bold text-xs uppercase tracking-wider hover:bg-[#3049F0] transition-colors cursor-pointer"
            >
              {highContrastMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#F7E36B]" />
                  <span>SWITCH TO DAYLIGHT BUTTER</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#F7E36B]" />
                  <span>SWITCH TO OLED HIGH-CONTRAST</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Handheld LOOP App Screen */}
          <div
            className={`w-full max-w-[440px] border-[3px] border-[#191919] rounded-[28px] p-5 sm:p-6 transition-colors duration-300 shadow-lg ${
              highContrastMode ? 'bg-[#191919] text-[#F8F7F2]' : 'bg-[#F4DC58] text-[#191919]'
            }`}
          >
            {/* Device Status Header */}
            <div className="flex items-center justify-between font-mono-tech text-xs font-bold pb-3 border-b border-current/20">
              <span>BPM {currentTrack.bpm}</span>
              <span className="tracking-[0.2em]">LOOP // OS</span>
              <span>VOL {volume}%</span>
            </div>

            {/* Active Track Readout */}
            <div className="my-4 text-center">
              <div className="font-mono-tech text-xs opacity-75">
                TRACK {currentTrack.number} · {currentTrack.keySignature}
              </div>
              <h3 className="font-condensed font-extrabold text-[26px] sm:text-[30px] tracking-tight uppercase mt-0.5">
                {currentTrack.title}
              </h3>
              <div className="text-xs font-medium opacity-80">{currentTrack.artist}</div>
            </div>

            {/* Primary Transport & Jog Row (matching screenshot's yellow tile layout) */}
            <div className="flex items-center justify-between gap-3 my-4 px-2">
              <button
                type="button"
                onClick={() => handleTrackSwitch(-1)}
                aria-label="Previous demo track"
                className={`w-11 h-11 rounded-full border-2 border-current flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
                  highContrastMode ? 'hover:bg-[#3049F0]' : 'hover:bg-white'
                }`}
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <span className="font-mono-tech text-xs">••||•</span>

              <button
                type="button"
                onClick={() => setIsPlayingDemo((p) => !p)}
                aria-label={isPlayingDemo ? 'Pause demo state' : 'Play demo state'}
                className={`w-14 h-14 rounded-full border-2 border-[#191919] flex items-center justify-center transition-transform active:scale-95 cursor-pointer ${
                  highContrastMode
                    ? 'bg-[#FF735D] text-[#191919]'
                    : 'bg-[#191919] text-[#F7E36B]'
                }`}
              >
                {isPlayingDemo ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>

              <span className="font-mono-tech text-xs">•||••</span>

              <button
                type="button"
                onClick={() => handleTrackSwitch(1)}
                aria-label="Next demo track"
                className={`w-11 h-11 rounded-full border-2 border-current flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
                  highContrastMode ? 'hover:bg-[#3049F0]' : 'hover:bg-white'
                }`}
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Rotary Platter & Hardware Mode Toggles */}
            <div className="grid grid-cols-2 gap-4 items-center my-5 py-3 px-3 rounded-2xl border border-current/25">
              {/* Interactive Rotary Jog Platter */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDialAngle((a) => (a + 45) % 360);
                    setElapsedSec((s) => (s + 15) % currentTrack.durationSec);
                  }}
                  aria-label="Rotate virtual vernier jog dial +15 seconds"
                  className="w-16 h-16 rounded-full border-2 border-current border-dashed flex items-center justify-center relative cursor-pointer hover:scale-105 transition-transform"
                >
                  <span
                    style={{ transform: `rotate(${dialAngle}deg)` }}
                    className="w-6 h-0.5 bg-current block origin-center transition-transform duration-300"
                  />
                  <span className="sr-only">Step jog wheel</span>
                </button>
                <div className="text-left">
                  <div className="font-mono-tech text-[11px] font-bold uppercase">PLATTER</div>
                  <div className="font-mono-tech text-xs opacity-80">{dialAngle}° STEP</div>
                </div>
              </div>

              {/* Two Tactile Pill Toggles */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-condensed font-bold text-xs uppercase">LOOP A–B</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={loopRegionActive}
                    aria-label="Toggle Loop A to B region"
                    onClick={() => setLoopRegionActive((p) => !p)}
                    className={`w-12 h-6 rounded-full border-2 border-current p-0.5 flex items-center transition-colors cursor-pointer ${
                      loopRegionActive ? 'bg-[#3049F0] justify-end' : 'bg-transparent justify-start'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-white border border-[#191919]" />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="font-condensed font-bold text-xs uppercase">DETENT</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={tactileDetentMode}
                    aria-label="Toggle tactile 36-step detent quantization"
                    onClick={() => setTactileDetentMode((p) => !p)}
                    className={`w-12 h-6 rounded-full border-2 border-current p-0.5 flex items-center transition-colors cursor-pointer ${
                      tactileDetentMode ? 'bg-[#FF735D] justify-end' : 'bg-transparent justify-start'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-white border border-[#191919]" />
                  </button>
                </div>
              </div>
            </div>

            {/* 20-Bar Live Equalizer Waveform */}
            <div
              aria-label="Visual waveform equalizer"
              className="h-14 flex items-center justify-between gap-1 px-2 my-3"
            >
              {currentTrack.waveform.map((peak, idx) => {
                const isLoopWindow = loopRegionActive && idx >= 5 && idx <= 14;
                const activeHeight = isPlayingDemo
                  ? Math.max(18, ((peak + ((elapsedSec * 13 + idx * 7) % 30)) % 100))
                  : Math.round(peak * 0.45);
                return (
                  <span
                    key={idx}
                    style={{ height: `${activeHeight}%` }}
                    className={`flex-1 rounded-full transition-all duration-300 ${
                      isLoopWindow
                        ? 'bg-[#3049F0]'
                        : highContrastMode
                        ? 'bg-[#F7E36B]'
                        : 'bg-[#191919]'
                    }`}
                  />
                );
              })}
            </div>

            {/* Scrubbable Progress Slider */}
            <div className="mt-3">
              <div className="flex items-center justify-between font-mono-tech text-xs mb-1">
                <span>{formatTrackTime(elapsedSec)}</span>
                <span>
                  {isPlayingDemo ? 'DEMO RUNNING (NO AUDIO)' : 'DEMO PAUSED'} · {progressPercent}%
                </span>
                <span>{formatTrackTime(currentTrack.durationSec)}</span>
              </div>
              <input
                type="range"
                aria-label="Scrub demo track timeline"
                min={0}
                max={currentTrack.durationSec}
                value={elapsedSec}
                onChange={(e) => setElapsedSec(Number(e.target.value))}
                className="w-full accent-[#3049F0] cursor-pointer"
              />
            </div>

            {/* Bottom Scene Pill Bar */}
            <div className="mt-4 pt-3 border-t border-current/20 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#191919] text-[#F7E36B] font-mono-tech text-xs font-bold">
                SCENE {currentTrack.number}
              </span>
              <span className="font-mono-tech text-xs">
                {tactileDetentMode ? 'QUANTIZED 1/16' : 'FREE SCRUB'}
              </span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between text-xs font-mono-tech text-[#191919] mt-5">
            <span>DISPLAY: 2.1&quot; TRANSFLECTIVE MEMORY LCD</span>
            <span>REFRESH: 60HZ LOW-POWER</span>
          </div>
        </div>

        {/* Right 5 Cols: Track Stems Selector & Volume / Parameter Controls */}
        <div className="lg:col-span-5 bg-white border-2 border-[#191919] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 font-condensed font-bold text-sm uppercase tracking-wider text-[#3049F0] mb-2">
              <Sliders className="w-4 h-4" />
              <span>SELECT ORIGINAL STUDIO STEM (01 — 04)</span>
            </div>
            <h3 className="font-display uppercase text-[34px] sm:text-[42px] leading-[0.95] text-[#191919] mb-4">
              TACTILE LIBRARY &amp; LOOP CONTROLS
            </h3>

            {/* Track List Buttons */}
            <div className="space-y-2.5 mb-7">
              {LOOP_TRACKS.map((trk) => {
                const isSelected = trk.id === currentTrack.id;
                return (
                  <button
                    key={trk.id}
                    type="button"
                    onClick={() => {
                      setCurrentTrackId(trk.id);
                      setElapsedSec(12);
                    }}
                    className={`w-full p-4 rounded-2xl border-2 border-[#191919] text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#D5C8FC] text-[#191919] -translate-y-0.5'
                        : 'bg-[#F8F7F2] text-[#191919] hover:bg-[#F7E36B]'
                    }`}
                  >
                    <div>
                      <div className="font-mono-tech text-xs text-[#515151]">
                        STEM {trk.number} · {trk.bpm} BPM
                      </div>
                      <div className="font-bold text-[15px] text-[#191919]">{trk.title}</div>
                      <div className="text-xs text-[#515151]">{trk.artist}</div>
                    </div>
                    <div className="font-mono-tech text-xs font-bold text-[#191919] shrink-0">
                      {formatTrackTime(trk.durationSec)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hardware Gain & Loop Slicer Controls */}
          <div className="bg-[#F8F7F2] border-2 border-[#191919] rounded-[20px] p-5 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-mono-tech font-bold text-[#191919] mb-1.5">
                <span className="inline-flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-[#3049F0]" />
                  <span>ROTARY GAIN ATTENUATOR</span>
                </span>
                <span>{volume} dB%</span>
              </div>
              <input
                type="range"
                aria-label="Rotary Gain Attenuator Volume"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-[#FF735D] cursor-pointer"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#191919]/15">
              <button
                type="button"
                onClick={() => setLoopRegionActive((p) => !p)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-[#191919] font-condensed font-bold text-xs uppercase cursor-pointer ${
                  loopRegionActive ? 'bg-[#3049F0] text-white' : 'bg-white text-[#191919]'
                }`}
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>{loopRegionActive ? 'A–B LOOP LOCKED' : 'ENABLE A–B LOOP'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPlayingDemo((p) => !p)}
                className="px-4 py-2 rounded-full bg-[#FF735D] text-white border-2 border-[#191919] font-condensed font-bold text-xs uppercase cursor-pointer"
              >
                {isPlayingDemo ? 'PAUSE DEMO UI' : 'RESUME DEMO UI'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
