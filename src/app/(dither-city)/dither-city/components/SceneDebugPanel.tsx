'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { DitherCitySettings, QualityPreset, RenderStats } from '../lib/cityConfig';

interface SceneDebugPanelProps {
  open: boolean;
  onToggleOpen: () => void;
  settings: DitherCitySettings;
  onUpdateSettings: (patch: Partial<DitherCitySettings>) => void;
  heroVisible: boolean;
  onToggleHeroVisible: () => void;
  onResetCamera: () => void;
  stats: RenderStats;
}

interface ToggleItemProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function ToggleButton({ label, active, onClick }: ToggleItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center justify-between gap-2 px-2.5 py-2 text-[11px] font-mono border transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#A8F23A] ${
        active
          ? 'bg-[#A8F23A]/15 border-[#A8F23A] text-[#EEEBD8]'
          : 'bg-[#141612] border-[#50524A]/60 text-[#D3D0BA]/75 hover:border-[#D3D0BA]/60'
      }`}
    >
      <span>{label}</span>
      <span className={active ? 'text-[#A8F23A] font-semibold' : 'text-[#50524A]'}>
        {active ? 'ON' : 'OFF'}
      </span>
    </button>
  );
}

interface SliderControlProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  displayValue: string;
  onChange: (value: number) => void;
}

function SliderControl({
  id,
  label,
  value,
  min,
  max,
  step,
  displayValue,
  onChange,
}: SliderControlProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-[11px] font-mono">
        <label htmlFor={id} className="text-[#D3D0BA]">
          {label}
        </label>
        <span className="tabular-nums text-[#EEEBD8]">{displayValue}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="dither-slider w-full cursor-pointer"
      />
    </div>
  );
}

export default function SceneDebugPanel({
  open,
  onToggleOpen,
  settings,
  onUpdateSettings,
  heroVisible,
  onToggleHeroVisible,
  onResetCamera,
  stats,
}: SceneDebugPanelProps) {
  const qualityOptions: QualityPreset[] = ['auto', 'high', 'medium', 'low'];

  return (
    <aside
      aria-label="Scene inspection controls"
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-10 z-30 flex flex-col items-end pointer-events-none"
    >
      {/* Expanded Collapsible Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto mb-2 w-full sm:w-[680px] max-w-[calc(100vw-2rem)] max-h-[68vh] overflow-y-auto bg-[#0A0B09]/95 border border-[#50524A] p-4 sm:p-5 text-[#EEEBD8]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-[#50524A]/50">
              <div className="flex items-center gap-4 text-[11px] font-mono tabular-nums text-[#D3D0BA]">
                <span>
                  FPS <strong className="text-[#A8F23A]">{stats.fps}</strong>
                </span>
                <span aria-hidden="true" className="text-[#50524A]">
                  /
                </span>
                <span>
                  Draw Calls <strong className="text-[#EEEBD8]">{stats.drawCalls}</strong>
                </span>
                <span aria-hidden="true" className="text-[#50524A]">
                  /
                </span>
                <span>
                  Triangles{' '}
                  <strong className="text-[#EEEBD8]">
                    {stats.triangles.toLocaleString()}
                  </strong>
                </span>
              </div>

              <button
                type="button"
                onClick={onResetCamera}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-mono text-[#EEEBD8] bg-[#181A16] border border-[#50524A] hover:border-[#A8F23A] hover:text-[#A8F23A] transition-colors cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-3 h-3" aria-hidden="true" />
                <span>Reset Camera</span>
              </button>
            </div>

            {/* Feature Toggles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              <ToggleButton
                label="Ambient Motion"
                active={settings.motionEnabled}
                onClick={() => onUpdateSettings({ motionEnabled: !settings.motionEnabled })}
              />
              <ToggleButton
                label="Mouse Parallax"
                active={settings.parallaxEnabled}
                onClick={() =>
                  onUpdateSettings({ parallaxEnabled: !settings.parallaxEnabled })
                }
              />
              <ToggleButton
                label="Dither Shader"
                active={settings.ditherEnabled}
                onClick={() => onUpdateSettings({ ditherEnabled: !settings.ditherEnabled })}
              />
              <ToggleButton
                label="Halftone Screen"
                active={settings.halftoneEnabled}
                onClick={() =>
                  onUpdateSettings({ halftoneEnabled: !settings.halftoneEnabled })
                }
              />
              <ToggleButton
                label="Wireframe"
                active={settings.wireframe}
                onClick={() => onUpdateSettings({ wireframe: !settings.wireframe })}
              />
              <ToggleButton
                label="Hero Overlay"
                active={heroVisible}
                onClick={onToggleHeroVisible}
              />
            </div>

            {/* Shader & Atmospheric Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 mb-4">
              <SliderControl
                id="slider-accent"
                label="Green Accent Intensity"
                value={settings.accentIntensity}
                min={0}
                max={2}
                step={0.05}
                displayValue={settings.accentIntensity.toFixed(2)}
                onChange={(v) => onUpdateSettings({ accentIntensity: v })}
              />
              <SliderControl
                id="slider-dither-res"
                label="Dither Resolution"
                value={settings.ditherResolution}
                min={0.7}
                max={2.4}
                step={0.05}
                displayValue={`${settings.ditherResolution.toFixed(2)}x`}
                onChange={(v) => onUpdateSettings({ ditherResolution: v })}
              />
              <SliderControl
                id="slider-dither-strength"
                label="Dither Strength"
                value={settings.ditherIntensity}
                min={0}
                max={1}
                step={0.02}
                displayValue={`${Math.round(settings.ditherIntensity * 100)}%`}
                onChange={(v) => onUpdateSettings({ ditherIntensity: v })}
              />
              <SliderControl
                id="slider-halftone-scale"
                label="Halftone Dot Scale"
                value={settings.halftoneScale}
                min={0.6}
                max={2.0}
                step={0.05}
                displayValue={settings.halftoneScale.toFixed(2)}
                onChange={(v) => onUpdateSettings({ halftoneScale: v })}
              />
              <SliderControl
                id="slider-contrast"
                label="Contrast"
                value={settings.contrast}
                min={0.8}
                max={1.7}
                step={0.02}
                displayValue={settings.contrast.toFixed(2)}
                onChange={(v) => onUpdateSettings({ contrast: v })}
              />
              <SliderControl
                id="slider-grain"
                label="Paper Grain"
                value={settings.grainIntensity}
                min={0}
                max={0.45}
                step={0.01}
                displayValue={`${Math.round(settings.grainIntensity * 100)}%`}
                onChange={(v) => onUpdateSettings({ grainIntensity: v })}
              />
              <SliderControl
                id="slider-fog"
                label="Fog Density"
                value={settings.fogDensity}
                min={0.002}
                max={0.038}
                step={0.001}
                displayValue={settings.fogDensity.toFixed(3)}
                onChange={(v) => onUpdateSettings({ fogDensity: v })}
              />
              <SliderControl
                id="slider-scroll"
                label="Scroll Camera Preview"
                value={settings.scrollProgress}
                min={0}
                max={1}
                step={0.01}
                displayValue={`${Math.round(settings.scrollProgress * 100)}%`}
                onChange={(v) => onUpdateSettings({ scrollProgress: v })}
              />
            </div>

            {/* Quality Tier Selector */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#50524A]/50">
              <span className="text-[11px] font-mono text-[#D3D0BA]">Render Quality</span>
              <div className="flex items-center gap-1">
                {qualityOptions.map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => onUpdateSettings({ quality: tier })}
                    aria-pressed={settings.quality === tier}
                    className={`px-2.5 py-1 text-[11px] font-mono uppercase border transition-colors cursor-pointer whitespace-nowrap ${
                      settings.quality === tier
                        ? 'bg-[#A8F23A] text-[#0A0B09] border-[#A8F23A] font-semibold'
                        : 'bg-[#141612] text-[#D3D0BA] border-[#50524A]/60 hover:border-[#D3D0BA]'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Collapsible Trigger Bar */}
      <button
        type="button"
        onClick={onToggleOpen}
        aria-expanded={open}
        aria-label={open ? 'Collapse scene inspector' : 'Expand scene inspector'}
        className="pointer-events-auto inline-flex items-center gap-3 px-3.5 py-2 text-xs font-mono text-[#EEEBD8] bg-[#0A0B09]/92 border border-[#50524A] hover:border-[#A8F23A] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8F23A]"
      >
        <SlidersHorizontal className="w-3.5 h-3.5 text-[#A8F23A]" aria-hidden="true" />
        <span>Inspector</span>
        <span aria-hidden="true" className="text-[#50524A]">
          /
        </span>
        <span className="tabular-nums text-[#D3D0BA]">{stats.fps} fps</span>
        <span aria-hidden="true" className="hidden sm:inline text-[#50524A]">
          ·
        </span>
        <span className="hidden sm:inline tabular-nums text-[#D3D0BA]">
          {stats.drawCalls} calls
        </span>
        {open ? (
          <ChevronDown className="w-3.5 h-3.5 text-[#D3D0BA]" aria-hidden="true" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-[#D3D0BA]" aria-hidden="true" />
        )}
      </button>
    </aside>
  );
}
