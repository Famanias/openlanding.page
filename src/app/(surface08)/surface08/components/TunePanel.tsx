'use client';

import React from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Copy,
  Download,
  Activity,
} from 'lucide-react';
import type {
  BackgroundEffect,
  EffectControls,
  QualityPreset,
} from '../engine/effectTypes';

export interface TunePanelProps {
  open: boolean;
  activeEffect: BackgroundEffect;
  controls: EffectControls;
  inspectOpen: boolean;
  fullscreenSupported: boolean;
  onClose: () => void;
  onChangeInteraction: (value: number) => void;
  onChangeSpeed: (value: number) => void;
  onSelectPalette: (index: number) => void;
  onChangeQuality: (quality: QualityPreset) => void;
  onTogglePause: () => void;
  onReset: () => void;
  onToggleInspect: () => void;
  onToggleFullscreen: () => void;
  onCopySnippet: () => void;
  onDownloadBundle: () => void;
}

const QUALITY_OPTIONS: { id: QualityPreset; label: string }[] = [
  { id: 'auto', label: 'Auto' },
  { id: 'high', label: 'High' },
  { id: 'balanced', label: 'Balanced' },
  { id: 'low', label: 'Low' },
];

export function TunePanel({
  open,
  activeEffect,
  controls,
  inspectOpen,
  fullscreenSupported,
  onClose,
  onChangeInteraction,
  onChangeSpeed,
  onSelectPalette,
  onChangeQuality,
  onTogglePause,
  onReset,
  onToggleInspect,
  onToggleFullscreen,
  onCopySnippet,
  onDownloadBundle,
}: TunePanelProps) {
  if (!open) return null;

  return (
    <aside
      aria-label="Surface Tuning Controls"
      className="fixed bottom-24 left-4 sm:left-8 z-30 w-[calc(100vw-2rem)] max-w-md rounded-xl border border-white/15 bg-[#0b0d14]/96 p-5 shadow-2xl text-white"
      data-ui-interactive="true"
    >
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white">
            Tune Surface · {activeEffect.indexNumber} {activeEffect.label}
          </h2>
          <p className="text-[11px] font-tech-mono text-white/55 mt-0.5">
            REAL-TIME GPU UNIFORMS & SIMULATION FORCES
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Tune Panel"
          className="p-1.5 text-white/65 hover:text-white rounded-md hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {/* Interaction Strength Slider */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <label htmlFor="slider-interaction" className="font-medium text-white/85">
              Interaction Strength
            </label>
            <span className="font-tech-mono text-white/80" data-testid="interaction-value">
              {controls.interaction}%
            </span>
          </div>
          <input
            id="slider-interaction"
            type="range"
            min={0}
            max={100}
            step={1}
            value={controls.interaction}
            onChange={(e) => onChangeInteraction(Number(e.target.value))}
            className="w-full accent-[#ff6b4a] cursor-pointer"
          />
        </div>

        {/* Motion Speed Slider */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <label htmlFor="slider-speed" className="font-medium text-white/85">
              Ambient Motion Speed
            </label>
            <span className="font-tech-mono text-white/80" data-testid="speed-value">
              {controls.speed}%
            </span>
          </div>
          <input
            id="slider-speed"
            type="range"
            min={0}
            max={100}
            step={1}
            value={controls.speed}
            onChange={(e) => onChangeSpeed(Number(e.target.value))}
            className="w-full accent-[#ff6b4a] cursor-pointer"
          />
        </div>

        {/* Authored Palettes */}
        <div>
          <span className="block text-xs font-medium text-white/85 mb-2">
            Material Palette Presets
          </span>
          <div className="grid grid-cols-3 gap-2">
            {activeEffect.palettes.map((pal, idx) => {
              const isSelected = controls.paletteIndex % activeEffect.palettes.length === idx;
              return (
                <button
                  key={pal.id}
                  type="button"
                  onClick={() => onSelectPalette(idx)}
                  aria-pressed={isSelected}
                  className={`flex flex-col items-start gap-1.5 p-2 rounded-lg border text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-white/15 border-white/55 text-white'
                      : 'bg-[#121622] border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {pal.swatches.map((hex, sIdx) => (
                      <span
                        key={sIdx}
                        className="h-3 w-3 rounded-full border border-black/30"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-tech-mono truncate w-full">{pal.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quality Preset */}
        <div>
          <span className="block text-xs font-medium text-white/85 mb-2">
            Render Quality & DPR Target
          </span>
          <div className="grid grid-cols-4 gap-1.5 p-1 rounded-lg bg-[#121622] border border-white/10">
            {QUALITY_OPTIONS.map((opt) => {
              const active = controls.quality === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChangeQuality(opt.id)}
                  aria-pressed={active}
                  className={`py-1.5 px-2 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#f4f1ea] text-[#08090d] font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Simulation State Actions: Pause, Reset, Inspect, Fullscreen */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <button
            type="button"
            onClick={onTogglePause}
            aria-pressed={controls.paused}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-medium bg-[#151926] hover:bg-[#1d2233] border border-white/15 transition-colors cursor-pointer whitespace-nowrap"
          >
            {controls.paused ? (
              <>
                <Play className="h-3.5 w-3.5 text-emerald-400" />
                <span>Resume</span>
              </>
            ) : (
              <>
                <Pause className="h-3.5 w-3.5 text-amber-300" />
                <span>Pause</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-medium bg-[#151926] hover:bg-[#1d2233] border border-white/15 transition-colors cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={onToggleInspect}
            aria-pressed={inspectOpen}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
              inspectOpen
                ? 'bg-[#ff6b4a]/20 border-[#ff6b4a] text-[#ff9b7a]'
                : 'bg-[#151926] hover:bg-[#1d2233] border-white/15 text-white'
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            <span>Inspect</span>
          </button>

          {fullscreenSupported && (
            <button
              type="button"
              onClick={onToggleFullscreen}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-medium bg-[#151926] hover:bg-[#1d2233] border border-white/15 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Fullscreen</span>
            </button>
          )}
        </div>

        {/* Reusable Export Actions */}
        <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onCopySnippet}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-xs font-medium bg-[#161b29] hover:bg-[#1e2538] border border-white/20 text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>Copy Snippet</span>
          </button>

          <button
            type="button"
            onClick={onDownloadBundle}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-xs font-semibold bg-[#f4f1ea] hover:bg-white text-[#08090d] transition-colors cursor-pointer whitespace-nowrap"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download .ZIP</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
