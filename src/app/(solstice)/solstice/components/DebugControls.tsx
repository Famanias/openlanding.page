'use client';

import React, { useEffect } from 'react';
import {
  SlidersHorizontal,
  X,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  RefreshCw,
  Eye,
  EyeOff,
} from 'lucide-react';
import type { SceneControlState } from '../utils/sceneLayout';
import { evaluatePaintingReveal } from '../systems/PaintingRevealTimeline';
import { evaluateCinematicScroll } from '../systems/CinematicScrollController';

interface DebugControlsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  controls: SceneControlState;
  liveScrollProgress: number;
  liveRevealProgress: number;
  fps: number;
  onUpdate: (patch: Partial<SceneControlState>) => void;
  onReplayOpening: () => void;
  onSkipOpening: () => void;
  onReset: () => void;
}

export const DebugControls: React.FC<DebugControlsProps> = ({
  open,
  onOpenChange,
  controls,
  liveScrollProgress,
  liveRevealProgress,
  fps,
  onUpdate,
  onReplayOpening,
  onSkipOpening,
  onReset,
}) => {
  // Keyboard shortcut 'D' to toggle developer panel cleanly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === 'd' || e.key === 'D') {
        onOpenChange(!open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  const effectiveScroll = controls.manualScrollOverride
    ? controls.scrollProgress
    : liveScrollProgress;

  const effectiveReveal = controls.revealManualScrub
    ? controls.revealProgress
    : liveRevealProgress;

  const revealInfo = evaluatePaintingReveal(effectiveReveal);
  const scrollInfo = evaluateCinematicScroll(effectiveScroll);

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2.5 font-sans">
      {open ? (
        <aside
          aria-label="Solstice living painting controls"
          className="max-h-[calc(100vh-2rem)] w-[316px] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-xl border border-[#4A2E2B]/16 bg-[#F6EFE2]/96 p-4 text-[#361E1B] shadow-[0_12px_36px_rgba(52,29,25,0.14)]"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-[#4A2E2B]/12 pb-2.5">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold tracking-tight text-[#331D1A]">
                Solstice Controls
              </h2>
              {controls.showFps && (
                <span
                  data-testid="fps-readout"
                  className="font-mono text-xs tabular-nums text-[#7C4634]"
                >
                  · {fps} FPS
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Hide scene controls"
              className="flex h-8 w-8 items-center justify-center rounded-md text-[#5C3A32] transition-colors hover:bg-[#4A2E2B]/10 hover:text-[#2A1714] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A4C38]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Primary Play/Pause + Reset */}
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onUpdate({ ambientPlaying: !controls.ambientPlaying })
              }
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#8A4C38] px-3 py-2 text-xs font-medium whitespace-nowrap text-[#F7F1E4] transition-colors hover:bg-[#733D2C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A4C38]"
            >
              {controls.ambientPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5" />
                  <span>Pause Ambient</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" />
                  <span>Play Ambient</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onReset}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-[#4A2E2B]/18 bg-[#EFE4D3] px-3 py-2 text-xs font-medium whitespace-nowrap text-[#3B231E] transition-colors hover:bg-[#E7D5BE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A4C38]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Opening Creation Sequence Controls */}
          <div className="mt-3.5 space-y-2.5 border-t border-[#4A2E2B]/10 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-wide text-[#6E4438] uppercase">
                Opening Creation
              </span>
              <span
                data-testid="reveal-stage-label"
                className="text-[11px] font-medium text-[#7C4634]"
              >
                {revealInfo.stageLabel}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onReplayOpening}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#4A2E2B]/16 bg-[#EFE4D3] px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-[#3B231E] transition-colors hover:bg-[#E6D4BC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A4C38]"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Replay Opening</span>
              </button>
              <button
                type="button"
                onClick={onSkipOpening}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#4A2E2B]/16 bg-[#EFE4D3] px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-[#3B231E] transition-colors hover:bg-[#E6D4BC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A4C38]"
              >
                <FastForward className="h-3 w-3" />
                <span>Skip to Complete</span>
              </button>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-xs">
                <label
                  htmlFor="slider-reveal"
                  className="font-medium text-[#442823]"
                >
                  Scrub Creation
                </label>
                <span className="font-mono text-xs tabular-nums text-[#6E4438]">
                  {(effectiveReveal * 8).toFixed(1)}s
                </span>
              </div>
              <input
                id="slider-reveal"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={effectiveReveal}
                onChange={(e) =>
                  onUpdate({
                    revealProgress: parseFloat(e.target.value),
                    revealManualScrub: true,
                  })
                }
                className="solstice-slider w-full"
              />
            </div>
          </div>

          {/* Living Animation System Toggles */}
          <div className="mt-3.5 space-y-2 border-t border-[#4A2E2B]/10 pt-3">
            <ToggleRow
              id="toggle-brush"
              label="Brushstroke Animation"
              checked={controls.brushAnimationEnabled}
              onChange={(checked) =>
                onUpdate({ brushAnimationEnabled: checked })
              }
            />
            <ToggleRow
              id="toggle-dust"
              label="Dust & Atmosphere"
              checked={controls.dustEnabled}
              onChange={(checked) => onUpdate({ dustEnabled: checked })}
            />
            <ToggleRow
              id="toggle-traveler"
              label="Traveler Animation"
              checked={controls.travelerEnabled}
              onChange={(checked) => onUpdate({ travelerEnabled: checked })}
            />
            <ToggleRow
              id="toggle-vegetation"
              label="Vegetation Wind"
              checked={controls.vegetationWindEnabled}
              onChange={(checked) =>
                onUpdate({ vegetationWindEnabled: checked })
              }
            />
            <ToggleRow
              id="toggle-shimmer"
              label="Heat Shimmer"
              checked={controls.heatShimmerEnabled}
              onChange={(checked) => onUpdate({ heatShimmerEnabled: checked })}
            />
            <ToggleRow
              id="toggle-pointer"
              label="Pointer Interaction"
              checked={controls.pointerInteractionEnabled}
              onChange={(checked) =>
                onUpdate({ pointerInteractionEnabled: checked })
              }
            />
            <ToggleRow
              id="toggle-textures"
              label="Paper & Textures"
              checked={controls.texturesEnabled}
              onChange={(checked) => onUpdate({ texturesEnabled: checked })}
            />
            <ToggleRow
              id="toggle-fps"
              label="Show FPS"
              checked={controls.showFps}
              onChange={(checked) => onUpdate({ showFps: checked })}
            />
          </div>

          {/* Intensity & Scroll Choreography Sliders */}
          <div className="mt-3.5 space-y-3 border-t border-[#4A2E2B]/10 pt-3">
            <SliderRow
              id="slider-motion-intensity"
              label="Overall Motion Intensity"
              value={controls.motionIntensity}
              min={0}
              max={2}
              step={0.05}
              suffix="×"
              onChange={(val) => onUpdate({ motionIntensity: val })}
            />

            <SliderRow
              id="slider-wind"
              label="Wind Strength"
              value={controls.windStrength}
              min={0}
              max={2}
              step={0.05}
              suffix="×"
              onChange={(val) => onUpdate({ windStrength: val })}
            />

            <SliderRow
              id="slider-brush-activity"
              label="Brushstroke Activity"
              value={controls.brushActivity}
              min={0}
              max={2}
              step={0.05}
              suffix="×"
              disabled={!controls.brushAnimationEnabled}
              onChange={(val) => onUpdate({ brushActivity: val })}
            />

            {/* Scroll Choreography Progress */}
            <div>
              <div className="mb-1 flex items-center justify-between text-xs">
                <label
                  htmlFor="slider-scroll"
                  className="font-medium text-[#442823]"
                >
                  Scroll Progress
                </label>
                <div className="flex items-center gap-2">
                  {controls.manualScrollOverride && (
                    <button
                      type="button"
                      onClick={() =>
                        onUpdate({ manualScrollOverride: false })
                      }
                      className="text-[11px] font-medium text-[#8A4C38] underline decoration-[#8A4C38]/40 underline-offset-2 hover:text-[#633324]"
                    >
                      Sync Page
                    </button>
                  )}
                  <span className="font-mono text-xs tabular-nums text-[#6E4438]">
                    {effectiveScroll.toFixed(2)}
                  </span>
                </div>
              </div>
              <input
                id="slider-scroll"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={effectiveScroll}
                onChange={(e) =>
                  onUpdate({
                    scrollProgress: parseFloat(e.target.value),
                    manualScrollOverride: true,
                  })
                }
                className="solstice-slider w-full"
              />
              <div className="mt-1 flex items-center justify-between text-[11px] text-[#7A5448]">
                <span>{scrollInfo.actLabel}</span>
                <span>Press D to hide</span>
              </div>
            </div>
          </div>
        </aside>
      ) : (
        <button
          type="button"
          onClick={() => onOpenChange(true)}
          aria-label="Open scene controls"
          title="Open Solstice living painting controls (D)"
          className="group flex h-10 items-center gap-2 rounded-lg border border-[#4A2E2B]/16 bg-[#F5EEE0]/88 px-3 text-xs font-medium text-[#4A2E2B]/85 shadow-sm transition-all duration-200 hover:border-[#4A2E2B]/30 hover:bg-[#F5EEE0] hover:text-[#2D1917] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A4C38]"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 shrink-0" />
          <span className="whitespace-nowrap">Controls</span>
        </button>
      )}
    </div>
  );
};

interface ToggleRowProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({
  id,
  label,
  checked,
  onChange,
}) => (
  <div className="flex items-center justify-between gap-3">
    <label
      htmlFor={id}
      className="cursor-pointer text-xs font-medium text-[#442823]"
    >
      {label}
    </label>
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex h-6 items-center gap-1 rounded-md px-2 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A4C38] ${
        checked
          ? 'bg-[#8A4C38]/16 text-[#6D3829]'
          : 'bg-[#4A2E2B]/8 text-[#7E5D53]'
      }`}
    >
      {checked ? (
        <>
          <Eye className="h-3 w-3" />
          <span>On</span>
        </>
      ) : (
        <>
          <EyeOff className="h-3 w-3" />
          <span>Off</span>
        </>
      )}
    </button>
  </div>
);

interface SliderRowProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  disabled?: boolean;
  onChange: (value: number) => void;
}

const SliderRow: React.FC<SliderRowProps> = ({
  id,
  label,
  value,
  min,
  max,
  step,
  suffix,
  disabled = false,
  onChange,
}) => (
  <div className={disabled ? 'opacity-45' : ''}>
    <div className="mb-1 flex items-center justify-between text-xs">
      <label htmlFor={id} className="font-medium text-[#442823]">
        {label}
      </label>
      <span className="font-mono text-xs tabular-nums text-[#6E4438]">
        {value.toFixed(2)}
        {suffix}
      </span>
    </div>
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="solstice-slider w-full disabled:cursor-not-allowed"
    />
  </div>
);
