'use client';

import React from 'react';
import {
  SlidersHorizontal,
  Play,
  Pause,
  RotateCcw,
  EyeOff,
  X,
} from 'lucide-react';
import type { ViewportCategory } from '../src/utils/sceneCoordinates';

export interface SceneControlState {
  unfoldProgress: number;
  isPlayingUnfold: boolean;
  ambientMotion: boolean;
  parallaxEnabled: boolean;
  petalsEnabled: boolean;
  shadowsEnabled: boolean;
  textureEnabled: boolean;
  outlinesEnabled: boolean;
  depthVisualization: boolean;
  interactive: boolean;
  windIntensity: number;
  parallaxStrength: number;
  shadowIntensity: number;
}

interface SceneControlsProps {
  state: SceneControlState;
  fps: number;
  cameraCategory: ViewportCategory;
  panelOpen: boolean;
  uiHidden: boolean;
  onTogglePanel: () => void;
  onHideCompletely: () => void;
  onUpdate: <K extends keyof SceneControlState>(key: K, value: SceneControlState[K]) => void;
  onTogglePlayUnfold: () => void;
  onResetScene: () => void;
}

const ToggleRow: React.FC<{
  id: string;
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}> = ({ id, label, checked, onChange }) => (
  <label
    htmlFor={id}
    className="flex cursor-pointer items-center justify-between gap-3 py-1 text-xs text-stone-700 hover:text-stone-950"
  >
    <span>{label}</span>
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="h-4 w-4 accent-[#B5573C] cursor-pointer rounded"
    />
  </label>
);

const SliderRow: React.FC<{
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  displayValue: string;
  onChange: (value: number) => void;
}> = ({ id, label, value, min, max, step, displayValue, onChange }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between text-xs text-stone-700">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <span className="font-mono tabular-nums text-[11px] text-stone-500">
        {displayValue}
      </span>
    </div>
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-stone-300 accent-[#B5573C]"
    />
  </div>
);

export const SceneControls: React.FC<SceneControlsProps> = ({
  state,
  fps,
  cameraCategory,
  panelOpen,
  uiHidden,
  onTogglePanel,
  onHideCompletely,
  onUpdate,
  onTogglePlayUnfold,
  onResetScene,
}) => {
  // When completely hidden, render zero visible chrome over the full-bleed background
  if (uiHidden) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex flex-col items-end gap-2">
      {!panelOpen ? (
        <button
          type="button"
          onClick={onTogglePanel}
          aria-label="Open scene controls"
          aria-expanded={false}
          className="pointer-events-auto flex h-9 items-center gap-1.5 rounded-lg border border-stone-900/10 bg-[#FCF6EC]/75 px-3 text-[11px] font-medium text-stone-800 shadow-sm backdrop-blur-md transition-opacity hover:bg-[#FCF6EC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B5573C] opacity-45 hover:opacity-100"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 shrink-0" />
          <span className="whitespace-nowrap">Controls</span>
        </button>
      ) : (
        <aside
          aria-label="Kirigami developer controls"
          className="pointer-events-auto w-72 max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-xl border border-stone-900/12 bg-[#FCF6EC]/94 p-4 text-stone-900 shadow-lg backdrop-blur-md"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-900/10 pb-2.5">
            <div>
              <h2 className="text-xs font-semibold tracking-tight text-stone-900">
                Scene Controls
              </h2>
              <p className="font-mono text-[11px] tabular-nums text-stone-500">
                {fps} fps · {cameraCategory}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onHideCompletely}
                title="Hide all UI (press H to restore)"
                aria-label="Hide all UI completely"
                className="flex h-8 w-8 items-center justify-center rounded-md text-stone-600 transition-colors hover:bg-stone-900/8 hover:text-stone-950 focus-visible:outline-2 focus-visible:outline-[#B5573C]"
              >
                <EyeOff className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={onTogglePanel}
                aria-label="Collapse scene controls"
                className="flex h-8 w-8 items-center justify-center rounded-md text-stone-600 transition-colors hover:bg-stone-900/8 hover:text-stone-950 focus-visible:outline-2 focus-visible:outline-[#B5573C]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Unfold Timeline Controls */}
          <div className="space-y-3 border-b border-stone-900/10 py-3">
            <SliderRow
              id="ctrl-unfold"
              label="Unfold progress"
              value={state.unfoldProgress}
              min={0}
              max={1}
              step={0.01}
              displayValue={`${Math.round(state.unfoldProgress * 100)}%`}
              onChange={(val) => onUpdate('unfoldProgress', val)}
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onTogglePlayUnfold}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#B5573C] px-3 py-2 text-xs font-medium text-[#FFF9F2] transition-colors hover:bg-[#9E4931] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B5573C] whitespace-nowrap"
              >
                {state.isPlayingUnfold ? (
                  <>
                    <Pause className="h-3.5 w-3.5 shrink-0" />
                    <span>Pause Unfold</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 shrink-0" />
                    <span>Play Unfold</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onResetScene}
                aria-label="Reset scene"
                className="flex items-center justify-center gap-1.5 rounded-lg border border-stone-900/15 bg-white/70 px-3 py-2 text-xs font-medium text-stone-800 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B5573C] whitespace-nowrap"
              >
                <RotateCcw className="h-3.5 w-3.5 shrink-0" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="space-y-0.5 border-b border-stone-900/10 py-3">
            <ToggleRow
              id="ctrl-ambient"
              label="Ambient motion"
              checked={state.ambientMotion}
              onChange={(v) => onUpdate('ambientMotion', v)}
            />
            <ToggleRow
              id="ctrl-parallax"
              label="Pointer parallax"
              checked={state.parallaxEnabled}
              onChange={(v) => onUpdate('parallaxEnabled', v)}
            />
            <ToggleRow
              id="ctrl-petals"
              label="Falling petals"
              checked={state.petalsEnabled}
              onChange={(v) => onUpdate('petalsEnabled', v)}
            />
            <ToggleRow
              id="ctrl-shadows"
              label="Paper shadows"
              checked={state.shadowsEnabled}
              onChange={(v) => onUpdate('shadowsEnabled', v)}
            />
            <ToggleRow
              id="ctrl-texture"
              label="Paper texture"
              checked={state.textureEnabled}
              onChange={(v) => onUpdate('textureEnabled', v)}
            />
            <ToggleRow
              id="ctrl-interactive"
              label="Interactive objects"
              checked={state.interactive}
              onChange={(v) => onUpdate('interactive', v)}
            />
            <ToggleRow
              id="ctrl-outlines"
              label="Layer outlines"
              checked={state.outlinesEnabled}
              onChange={(v) => onUpdate('outlinesEnabled', v)}
            />
            <ToggleRow
              id="ctrl-depth"
              label="Depth visualization"
              checked={state.depthVisualization}
              onChange={(v) => onUpdate('depthVisualization', v)}
            />
          </div>

          {/* Tuning Sliders */}
          <div className="space-y-3 pt-3">
            <SliderRow
              id="ctrl-wind"
              label="Wind intensity"
              value={state.windIntensity}
              min={0}
              max={2.2}
              step={0.05}
              displayValue={`${state.windIntensity.toFixed(2)}×`}
              onChange={(v) => onUpdate('windIntensity', v)}
            />
            <SliderRow
              id="ctrl-parallax-str"
              label="Parallax strength"
              value={state.parallaxStrength}
              min={0}
              max={1.8}
              step={0.05}
              displayValue={`${state.parallaxStrength.toFixed(2)}×`}
              onChange={(v) => onUpdate('parallaxStrength', v)}
            />
            <SliderRow
              id="ctrl-shadow-str"
              label="Shadow intensity"
              value={state.shadowIntensity}
              min={0}
              max={1.8}
              step={0.05}
              displayValue={`${state.shadowIntensity.toFixed(2)}×`}
              onChange={(v) => onUpdate('shadowIntensity', v)}
            />
          </div>

          <p className="mt-3 border-t border-stone-900/10 pt-2 text-[11px] leading-relaxed text-stone-500">
            Scroll wheel scrubs unfold. Click houses to lift folded roofs, hover clouds to part layers. Press H to toggle UI.
          </p>
        </aside>
      )}
    </div>
  );
};
