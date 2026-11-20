'use client';

import React from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Pause,
  Play,
  Repeat,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { ANIMATION_PHASES, TIMELINE_DURATION_SEC } from '../lib/botanical/timeline';
import type {
  AnimationPhaseInfo,
  DeveloperSettings,
  PlaybackMode,
  PlaybackSpeed,
} from '../lib/botanical/types';

interface DeveloperControlsProps {
  settings: DeveloperSettings;
  timeSec: number;
  fps: number;
  phase: AnimationPhaseInfo;
  reducedMotion: boolean;
  onPlayPause: () => void;
  onRestart: () => void;
  onJumpCompleted: () => void;
  onScrub: (timeSec: number) => void;
  onChangeSpeed: (speed: PlaybackSpeed) => void;
  onChangeMode: (mode: PlaybackMode) => void;
  onToggleSetting: (
    key:
      | 'loop'
      | 'ambientMotion'
      | 'pointerParallax'
      | 'inkDiffusion'
      | 'flowerGrowth'
      | 'paperTexture'
      | 'panelOpen'
      | 'panelHidden'
  ) => void;
}

const SPEEDS: PlaybackSpeed[] = [0.5, 1, 2, 4];

export default function DeveloperControls({
  settings,
  timeSec,
  fps,
  phase,
  reducedMotion,
  onPlayPause,
  onRestart,
  onJumpCompleted,
  onScrub,
  onChangeSpeed,
  onChangeMode,
  onToggleSetting,
}: DeveloperControlsProps) {
  // Completely hidden mode: leaves the full-bleed botanical canvas unobstructed,
  // with a barely-there corner restore button on hover/focus.
  if (settings.panelHidden) {
    return (
      <div className="fixed top-4 left-4 z-40">
        <button
          type="button"
          onClick={() => onToggleSetting('panelHidden')}
          aria-label="Show developer controls"
          title="Show Controls (H)"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-[#1C191A]/15 bg-[#E9E1D3]/65 text-[#1C191A]/50 transition-all duration-200 hover:bg-[#E9E1D3]/95 hover:text-[#1C191A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#722C3B]"
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    );
  }

  const isCompleted = timeSec >= TIMELINE_DURATION_SEC - 0.05 && !settings.isPlaying;
  const playLabel = settings.isPlaying
    ? 'Pause'
    : timeSec > 0.05 && timeSec < TIMELINE_DURATION_SEC - 0.05
      ? 'Resume'
      : 'Play';

  return (
    <aside
      aria-label="Timelapse developer controls"
      className="fixed top-4 left-4 z-40 w-[336px] max-w-[calc(100vw-2rem)] rounded-lg border border-[#1C191A]/18 bg-[#E9E1D3]/95 text-[#1C191A] shadow-[0_8px_28px_rgba(28,25,26,0.12)]"
    >
      {/* Compact Header Row */}
      <div className="flex items-center justify-between gap-2 px-3.5 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 shrink-0 text-[#722C3B]" aria-hidden="true" />
          <span className="truncate font-serif text-sm font-semibold tracking-wide text-[#1C191A]">
            Timeline Controls
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <span
            data-testid="fps-readout"
            className="font-mono text-[11px] tabular-nums text-[#424041]"
          >
            {fps} FPS
          </span>
          <span aria-hidden="true" className="text-[#1C191A]/25">
            ·
          </span>
          <button
            type="button"
            onClick={() => onToggleSetting('panelOpen')}
            aria-expanded={settings.panelOpen}
            aria-label={settings.panelOpen ? 'Collapse controls' : 'Expand controls'}
            className="flex h-7 w-7 items-center justify-center rounded text-[#424041] transition-colors hover:bg-[#1C191A]/8 hover:text-[#1C191A] focus-visible:outline-2 focus-visible:outline-[#722C3B]"
          >
            {settings.panelOpen ? (
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronUp className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={() => onToggleSetting('panelHidden')}
            aria-label="Hide developer controls"
            title="Hide panel (H)"
            className="flex h-7 w-7 items-center justify-center rounded text-[#424041] transition-colors hover:bg-[#1C191A]/8 hover:text-[#1C191A] focus-visible:outline-2 focus-visible:outline-[#722C3B]"
          >
            <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Phase & Scrubber Always Accessible When Not Hidden */}
      <div className="border-t border-[#1C191A]/10 px-3.5 py-2.5">
        <div className="mb-1.5 flex items-baseline justify-between gap-2 text-xs">
          <span
            data-testid="phase-readout"
            className="truncate font-medium text-[#1C191A]"
          >
            {phase.number}. {phase.name}
          </span>
          <span
            data-testid="time-readout"
            className="shrink-0 font-mono text-[11px] tabular-nums text-[#424041]"
          >
            {timeSec.toFixed(1)}s / {TIMELINE_DURATION_SEC.toFixed(0)}s
          </span>
        </div>

        <label htmlFor="timelapse-scrubber" className="sr-only">
          Timelapse progress scrubber
        </label>
        <input
          id="timelapse-scrubber"
          type="range"
          min={0}
          max={TIMELINE_DURATION_SEC}
          step={0.05}
          value={timeSec}
          onChange={(e) => onScrub(parseFloat(e.target.value))}
          className="archival-range w-full"
        />

        {/* Primary Playback Transport Row */}
        <div className="mt-2.5 flex items-center gap-1.5">
          <button
            type="button"
            onClick={onPlayPause}
            aria-label={playLabel}
            className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded bg-[#1C191A] px-2.5 text-xs font-medium text-[#E9E1D3] transition-colors hover:bg-[#722C3B] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#722C3B] whitespace-nowrap"
          >
            {settings.isPlaying ? (
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span>{playLabel}</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            aria-label="Restart timelapse"
            className="flex h-8 items-center justify-center gap-1 rounded border border-[#1C191A]/18 bg-[#E9E1D3]/60 px-2.5 text-xs font-medium text-[#1C191A] transition-colors hover:bg-[#D7CCBB] focus-visible:outline-2 focus-visible:outline-[#722C3B] whitespace-nowrap"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Restart</span>
          </button>

          <button
            type="button"
            onClick={onJumpCompleted}
            aria-label="Reset to completed artwork"
            aria-pressed={isCompleted}
            className={`flex h-8 items-center justify-center gap-1 rounded border px-2.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#722C3B] whitespace-nowrap ${
              isCompleted
                ? 'border-[#722C3B] bg-[#722C3B]/12 text-[#51242D]'
                : 'border-[#1C191A]/18 bg-[#E9E1D3]/60 text-[#1C191A] hover:bg-[#D7CCBB]'
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Complete</span>
          </button>
        </div>
      </div>

      {/* Expandable Detailed Controls */}
      {settings.panelOpen && (
        <div className="space-y-3 border-t border-[#1C191A]/10 px-3.5 py-3 text-xs">
          {reducedMotion && (
            <p className="text-[11px] leading-snug text-[#51242D]">
              Reduced motion preference detected. Showing completed artwork by default; use Play or the scrubber to preview manually.
            </p>
          )}

          {/* Speed & Playback Mode */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium text-[#424041]">Speed</span>
            <div className="flex items-center gap-1" role="group" aria-label="Playback speed">
              {SPEEDS.map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => onChangeSpeed(spd)}
                  aria-pressed={settings.speed === spd}
                  className={`h-7 min-w-[36px] rounded px-2 font-mono text-[11px] tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-[#722C3B] ${
                    settings.speed === spd
                      ? 'bg-[#722C3B] text-[#E9E1D3]'
                      : 'border border-[#1C191A]/15 bg-transparent text-[#1C191A] hover:bg-[#D7CCBB]/70'
                  }`}
                >
                  {spd}×
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium text-[#424041]">Playback</span>
            <div className="flex items-center gap-1" role="group" aria-label="Playback mode">
              <button
                type="button"
                onClick={() => onChangeMode('auto')}
                aria-pressed={settings.mode === 'auto'}
                className={`h-7 rounded px-2.5 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#722C3B] whitespace-nowrap ${
                  settings.mode === 'auto'
                    ? 'bg-[#1C191A] text-[#E9E1D3]'
                    : 'border border-[#1C191A]/15 text-[#1C191A] hover:bg-[#D7CCBB]/70'
                }`}
              >
                Auto
              </button>
              <button
                type="button"
                onClick={() => onChangeMode('scroll')}
                aria-pressed={settings.mode === 'scroll'}
                className={`h-7 rounded px-2.5 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#722C3B] whitespace-nowrap ${
                  settings.mode === 'scroll'
                    ? 'bg-[#1C191A] text-[#E9E1D3]'
                    : 'border border-[#1C191A]/15 text-[#1C191A] hover:bg-[#D7CCBB]/70'
                }`}
              >
                Scroll
              </button>
              <button
                type="button"
                onClick={() => onToggleSetting('loop')}
                aria-pressed={settings.loop}
                aria-label="Toggle looping"
                className={`flex h-7 items-center gap-1 rounded px-2 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#722C3B] whitespace-nowrap ${
                  settings.loop
                    ? 'bg-[#722C3B] text-[#E9E1D3]'
                    : 'border border-[#1C191A]/15 text-[#1C191A] hover:bg-[#D7CCBB]/70'
                }`}
              >
                <Repeat className="h-3 w-3" aria-hidden="true" />
                <span>Loop</span>
              </button>
            </div>
          </div>

          {/* Phase Quick-Jump Strip */}
          <div className="space-y-1">
            <span className="block text-[11px] font-medium text-[#424041]">Jump to Stage</span>
            <div className="grid grid-cols-4 gap-1">
              {ANIMATION_PHASES.map((p) => {
                const active = p.id === phase.id;
                const jumpTime = p.id === 'phase-08' ? TIMELINE_DURATION_SEC : p.startSec + 0.35;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onScrub(jumpTime)}
                    title={`${p.number}. ${p.name}`}
                    className={`h-6 rounded font-mono text-[10px] tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-[#722C3B] ${
                      active
                        ? 'bg-[#51242D] text-[#E9E1D3]'
                        : 'border border-[#1C191A]/12 text-[#424041] hover:bg-[#D7CCBB]/70 hover:text-[#1C191A]'
                    }`}
                  >
                    P{p.number}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Layer & Feature Toggles */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 border-t border-[#1C191A]/10 pt-2.5">
            {(
              [
                ['ambientMotion', 'Ambient Motion'],
                ['pointerParallax', 'Pointer Parallax'],
                ['inkDiffusion', 'Ink Diffusion'],
                ['flowerGrowth', 'Flower Growth'],
                ['paperTexture', 'Paper Texture'],
              ] as const
            ).map(([key, label]) => (
              <label
                key={key}
                className="flex cursor-pointer items-center justify-between gap-2 text-[11px] text-[#1C191A]"
              >
                <span className="truncate">{label}</span>
                <input
                  type="checkbox"
                  checked={settings[key]}
                  onChange={() => onToggleSetting(key)}
                  className="h-3.5 w-3.5 accent-[#722C3B]"
                />
              </label>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
