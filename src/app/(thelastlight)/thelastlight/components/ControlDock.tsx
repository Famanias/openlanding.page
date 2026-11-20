'use client';

import React, { useState } from 'react';
import {
  Anchor,
  Building2,
  ChevronDown,
  ChevronUp,
  Cloud,
  CloudLightning,
  CloudRain,
  Cloudy,
  Eye,
  EyeOff,
  Film,
  Flame,
  Pause,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Sun,
  Waves,
} from 'lucide-react';
import {
  CameraMode,
  QualityPreset,
  SimControls,
  STORM_DURATION,
  TelemetryStats,
  WeatherId,
} from '../lib/sim/types';
import { WEATHER_PRESETS } from '../lib/sim/weather';

type TabId =
  | 'weather'
  | 'sky'
  | 'ocean'
  | 'boat'
  | 'lighthouse'
  | 'architecture'
  | 'cinematic';

interface ControlDockProps {
  controls: SimControls;
  telemetry: TelemetryStats;
  stormPhase: string;
  dockExpanded: boolean;
  uiHidden: boolean;
  onToggleDock: () => void;
  onToggleHideUi: () => void;
  onUpdateControls: (patch: Partial<SimControls>) => void;
  onResetCamera: () => void;
  onResetBoat: () => void;
  onResetScene: () => void;
  onRepositionBoatQuick: () => void;
}

const WEATHER_OPTIONS: Array<{ id: WeatherId; label: string }> = [
  { id: 'CLEAR', label: 'Clear' },
  { id: 'CLOUDY', label: 'Cloudy' },
  { id: 'RAIN', label: 'Rain' },
  { id: 'THUNDERSTORM', label: 'Thunderstorm' },
];

const CAMERA_OPTIONS: Array<{ id: CameraMode; label: string }> = [
  { id: 'cinematic', label: 'Cinematic' },
  { id: 'orbit', label: 'Orbit' },
  { id: 'ground', label: 'Ground' },
  { id: 'ocean', label: 'Ocean' },
  { id: 'beacon', label: 'Beacon' },
];

const INSPECTION_CAMERA_OPTIONS: Array<{ id: CameraMode; label: string }> = [
  { id: 'front', label: 'Front' },
  { id: 'side', label: 'Side' },
  { id: 'elevated', label: 'Elevated' },
  { id: 'topdown', label: 'Top-Down' },
];

const TIME_PRESETS: Array<{ label: string; hour: number }> = [
  { label: 'Sunrise', hour: 6.4 },
  { label: 'Day', hour: 12.5 },
  { label: 'Sunset', hour: 18.65 },
  { label: 'Night', hour: 22.8 },
];

function formatHour(hour: number): string {
  const h = Math.floor(((hour % 24) + 24) % 24);
  const m = Math.floor((hour - Math.floor(hour)) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export default function ControlDock({
  controls,
  telemetry,
  stormPhase,
  dockExpanded,
  uiHidden,
  onToggleDock,
  onToggleHideUi,
  onUpdateControls,
  onResetCamera,
  onResetBoat,
  onResetScene,
  onRepositionBoatQuick,
}: ControlDockProps) {
  const [activeTab, setActiveTab] = useState<TabId>('weather');

  if (uiHidden) {
    return (
      <div className="fixed bottom-4 right-4 z-20">
        <button
          type="button"
          onClick={onToggleHideUi}
          aria-label="Show developer controls"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0b1118]/85 hover:bg-[#0b1118] text-slate-200 border border-white/15 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span>Show Controls</span>
        </button>
      </div>
    );
  }

  const applyWeatherPreset = (weather: WeatherId) => {
    const p = WEATHER_PRESETS[weather];
    onUpdateControls({
      weather,
      stormActive: false,
      stormPlaying: false,
      windStrength: p.windStrength,
      fogDensity: p.fogDensity,
      rainIntensity: p.rainIntensity,
      cloudDensity: p.cloudCoverage,
      stormIntensity: p.stormIntensity,
      atmosphericHaze: p.atmosphericHaze,
      waveAmplitude: p.waveAmplitude,
      waveFrequency: p.waveFrequency,
      waveSpeed: p.waveSpeed,
      oceanRoughness: p.oceanRoughness,
      foamIntensity: p.foamIntensity,
      sprayIntensity: p.sprayIntensity,
    });
  };

  const toggleStormPlay = () => {
    if (!controls.stormActive) {
      onUpdateControls({
        stormActive: true,
        stormPlaying: true,
        stormTime: controls.stormTime >= STORM_DURATION ? 0 : controls.stormTime,
      });
    } else {
      onUpdateControls({ stormPlaying: !controls.stormPlaying });
    }
  };

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 w-[min(960px,96vw)] pointer-events-none"
      data-testid="control-dock"
    >
      <div className="flex flex-col items-center pointer-events-auto">
        {/* Compact Top Handle Row */}
        <div className="flex items-center gap-2 mb-1.5">
          <button
            type="button"
            onClick={onToggleDock}
            aria-expanded={dockExpanded}
            aria-label={
              dockExpanded ? 'Collapse developer panel' : 'Expand developer panel'
            }
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0b1118]/92 hover:bg-[#111a24] text-slate-100 border border-white/15 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span>Controls</span>
            {dockExpanded ? (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleStormPlay}
            aria-label={
              controls.stormActive && controls.stormPlaying
                ? 'Pause storm sequence'
                : 'Play 30-second storm sequence'
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0b1118]/92 hover:bg-[#111a24] text-slate-100 border border-white/15 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {controls.stormActive && controls.stormPlaying ? (
              <Pause className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Play className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span>
              {controls.stormActive
                ? `${stormPhase} (${controls.stormTime.toFixed(1)}s)`
                : 'Storm Sequence'}
            </span>
          </button>

          <button
            type="button"
            onClick={onToggleHideUi}
            aria-label="Hide all UI controls"
            title="Hide UI (H)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0b1118]/92 hover:bg-[#111a24] text-slate-300 hover:text-white border border-white/15 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Hide</span>
          </button>
        </div>

        {/* Collapsible Tabbed Developer Panel (Solid/RGBA dark surface, zero backdrop-filter over WebGL) */}
        {dockExpanded && (
          <section
            aria-label="Developer Controls"
            className="w-full rounded-xl bg-[#0b1118]/95 border border-white/12 shadow-2xl overflow-hidden"
          >
            {/* Tab Bar */}
            <div
              role="tablist"
              aria-label="Control categories"
              className="flex items-center justify-between gap-1 px-3 py-2 border-b border-white/10 overflow-x-auto"
            >
              <div className="flex items-center gap-1">
                {(
                  [
                    { id: 'weather', label: 'Weather', Icon: CloudRain },
                    { id: 'sky', label: 'Sky', Icon: Cloud },
                    { id: 'ocean', label: 'Ocean', Icon: Waves },
                    { id: 'boat', label: 'Boat', Icon: Anchor },
                    { id: 'lighthouse', label: 'Lighthouse', Icon: Flame },
                    { id: 'architecture', label: 'Arch & Cam', Icon: Building2 },
                    { id: 'cinematic', label: 'Cinematic', Icon: Film },
                  ] as const
                ).map(({ id, label, Icon }) => {
                  const active = activeTab === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveTab(id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-400/35'
                          : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-400 font-mono-tabular shrink-0 pl-2">
                <span>{telemetry.fps} FPS</span>
                <span aria-hidden="true">·</span>
                <span>{formatHour(controls.timeOfDay)}</span>
                <span aria-hidden="true">·</span>
                <span>{telemetry.windSpeedKts} kt</span>
              </div>
            </div>

            {/* Active Tab Body */}
            <div className="p-3.5 max-h-[42vh] overflow-y-auto">
              {/* 1. WEATHER */}
              {activeTab === 'weather' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <div className="md:col-span-5 space-y-2.5">
                    <div className="text-xs font-medium text-slate-300">Weather Preset</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-1.5">
                      {WEATHER_OPTIONS.map((w) => {
                        const isSelected = !controls.stormActive && controls.weather === w.id;
                        return (
                          <button
                            key={w.id}
                            type="button"
                            onClick={() => applyWeatherPreset(w.id)}
                            className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                              isSelected
                                ? 'bg-amber-500/20 text-amber-200 border-amber-400/50'
                                : 'bg-white/[0.03] text-slate-300 border-white/10 hover:bg-white/[0.08]'
                            }`}
                          >
                            {w.id === 'CLEAR' && <Sun className="w-3.5 h-3.5" />}
                            {w.id === 'CLOUDY' && <Cloudy className="w-3.5 h-3.5" />}
                            {w.id === 'RAIN' && <CloudRain className="w-3.5 h-3.5" />}
                            {w.id === 'THUNDERSTORM' && (
                              <CloudLightning className="w-3.5 h-3.5" />
                            )}
                            <span>{w.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-1.5 pt-0.5">
                      {TIME_PRESETS.map((tp) => (
                        <button
                          key={tp.label}
                          type="button"
                          onClick={() =>
                            onUpdateControls({
                              timeOfDay: tp.hour,
                              stormActive: false,
                              stormPlaying: false,
                            })
                          }
                          className="flex-1 px-2 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-[11px] text-slate-200 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          {tp.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5">
                    <SliderField
                      id="time-of-day"
                      label="Time of Day"
                      valueText={formatHour(controls.timeOfDay)}
                      min={0}
                      max={24}
                      step={0.05}
                      value={controls.timeOfDay}
                      onChange={(v) =>
                        onUpdateControls({
                          timeOfDay: v,
                          stormActive: false,
                          stormPlaying: false,
                        })
                      }
                    />
                    <SliderField
                      id="wind-strength"
                      label="Wind Strength"
                      valueText={`${controls.windStrength.toFixed(2)}x`}
                      min={0.1}
                      max={2.0}
                      step={0.05}
                      value={controls.windStrength}
                      onChange={(v) =>
                        onUpdateControls({ windStrength: v, stormActive: false })
                      }
                    />
                    <SliderField
                      id="fog-density"
                      label="Fog Density"
                      valueText={`${Math.round(controls.fogDensity * 100)}%`}
                      min={0}
                      max={1}
                      step={0.02}
                      value={controls.fogDensity}
                      onChange={(v) =>
                        onUpdateControls({ fogDensity: v, stormActive: false })
                      }
                    />
                    <SliderField
                      id="rain-intensity"
                      label="Rain Intensity"
                      valueText={`${Math.round(controls.rainIntensity * 100)}%`}
                      min={0}
                      max={1}
                      step={0.02}
                      value={controls.rainIntensity}
                      onChange={(v) =>
                        onUpdateControls({ rainIntensity: v, stormActive: false })
                      }
                    />
                  </div>
                </div>
              )}

              {/* 2. SKY */}
              {activeTab === 'sky' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-3">
                  <SliderField
                    id="cloud-density"
                    label="Cloud Density"
                    valueText={`${Math.round(controls.cloudDensity * 100)}%`}
                    min={0}
                    max={1}
                    step={0.02}
                    value={controls.cloudDensity}
                    onChange={(v) =>
                      onUpdateControls({ cloudDensity: v, stormActive: false })
                    }
                  />
                  <SliderField
                    id="cloud-speed"
                    label="Cloud Speed"
                    valueText={`${controls.cloudSpeed.toFixed(2)}x`}
                    min={0.2}
                    max={2.5}
                    step={0.05}
                    value={controls.cloudSpeed}
                    onChange={(v) => onUpdateControls({ cloudSpeed: v })}
                  />
                  <SliderField
                    id="storm-intensity"
                    label="Storm Intensity"
                    valueText={`${Math.round(controls.stormIntensity * 100)}%`}
                    min={0}
                    max={1}
                    step={0.02}
                    value={controls.stormIntensity}
                    onChange={(v) =>
                      onUpdateControls({ stormIntensity: v, stormActive: false })
                    }
                  />
                  <SliderField
                    id="atmospheric-haze"
                    label="Atmospheric Haze"
                    valueText={`${Math.round(controls.atmosphericHaze * 100)}%`}
                    min={0}
                    max={1}
                    step={0.02}
                    value={controls.atmosphericHaze}
                    onChange={(v) =>
                      onUpdateControls({ atmosphericHaze: v, stormActive: false })
                    }
                  />
                </div>
              )}

              {/* 3. OCEAN */}
              {activeTab === 'ocean' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-2.5">
                  <SliderField
                    id="wave-amplitude"
                    label="Wave Intensity"
                    valueText={`${controls.waveAmplitude.toFixed(2)}m`}
                    min={0.2}
                    max={2.1}
                    step={0.05}
                    value={controls.waveAmplitude}
                    onChange={(v) =>
                      onUpdateControls({ waveAmplitude: v, stormActive: false })
                    }
                  />
                  <SliderField
                    id="wave-speed"
                    label="Wave Speed"
                    valueText={`${controls.waveSpeed.toFixed(2)}x`}
                    min={0.3}
                    max={2.0}
                    step={0.05}
                    value={controls.waveSpeed}
                    onChange={(v) =>
                      onUpdateControls({ waveSpeed: v, stormActive: false })
                    }
                  />
                  <SliderField
                    id="wave-frequency"
                    label="Wave Frequency"
                    valueText={`${controls.waveFrequency.toFixed(2)}x`}
                    min={0.5}
                    max={1.7}
                    step={0.05}
                    value={controls.waveFrequency}
                    onChange={(v) =>
                      onUpdateControls({ waveFrequency: v, stormActive: false })
                    }
                  />
                  <SliderField
                    id="ocean-roughness"
                    label="Surface Roughness"
                    valueText={`${Math.round(controls.oceanRoughness * 100)}%`}
                    min={0.05}
                    max={0.85}
                    step={0.02}
                    value={controls.oceanRoughness}
                    onChange={(v) =>
                      onUpdateControls({ oceanRoughness: v, stormActive: false })
                    }
                  />
                  <SliderField
                    id="foam-intensity"
                    label="Foam Intensity"
                    valueText={`${Math.round(controls.foamIntensity * 100)}%`}
                    min={0}
                    max={2}
                    step={0.05}
                    value={controls.foamIntensity}
                    onChange={(v) =>
                      onUpdateControls({ foamIntensity: v, stormActive: false })
                    }
                  />
                  <SliderField
                    id="spray-intensity"
                    label="Spray Intensity"
                    valueText={`${Math.round(controls.sprayIntensity * 100)}%`}
                    min={0}
                    max={1.5}
                    step={0.05}
                    value={controls.sprayIntensity}
                    onChange={(v) =>
                      onUpdateControls({ sprayIntensity: v, stormActive: false })
                    }
                  />
                </div>
              )}

              {/* 4. BOAT */}
              {activeTab === 'boat' && (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <ToggleButton
                      label="Buoyancy Physics"
                      active={controls.buoyancyEnabled}
                      onClick={() =>
                        onUpdateControls({
                          buoyancyEnabled: !controls.buoyancyEnabled,
                        })
                      }
                    />
                    <ToggleButton
                      label="Wave Sample Points"
                      active={controls.showBoatSamplePoints}
                      onClick={() =>
                        onUpdateControls({
                          showBoatSamplePoints: !controls.showBoatSamplePoints,
                        })
                      }
                    />
                    <ToggleButton
                      label="Water Normal"
                      active={controls.showWaterNormal}
                      onClick={() =>
                        onUpdateControls({
                          showWaterNormal: !controls.showWaterNormal,
                        })
                      }
                    />
                    <ToggleButton
                      label="Collision Boundary"
                      active={controls.showCollisions}
                      onClick={() =>
                        onUpdateControls({
                          showCollisions: !controls.showCollisions,
                        })
                      }
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-mono-tabular pr-1">
                      Pos ({telemetry.boatX}, {telemetry.boatZ}) · Wave{' '}
                      {telemetry.boatWaveHeight}m
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateControls({
                          repositionBoatMode: !controls.repositionBoatMode,
                        })
                      }
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                        controls.repositionBoatMode
                          ? 'bg-sky-500/20 text-sky-200 border-sky-400/50'
                          : 'bg-white/[0.04] text-slate-200 border-white/10 hover:bg-white/[0.1]'
                      }`}
                    >
                      <Anchor className="w-3.5 h-3.5" />
                      <span>
                        {controls.repositionBoatMode
                          ? 'Click Water to Place'
                          : 'Click-to-Move'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={onRepositionBoatQuick}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] hover:bg-white/[0.1] text-slate-200 border border-white/10 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Cycle Cove Spot
                    </button>
                    <button
                      type="button"
                      onClick={onResetBoat}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] hover:bg-white/[0.1] text-slate-200 border border-white/10 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Boat</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 5. LIGHTHOUSE */}
              {activeTab === 'lighthouse' && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <ToggleButton
                      label="Beacon"
                      active={controls.beaconEnabled}
                      onClick={() =>
                        onUpdateControls({
                          beaconEnabled: !controls.beaconEnabled,
                          stormActive: false,
                        })
                      }
                    />
                    <ToggleButton
                      label="Interior Lights"
                      active={controls.interiorLights}
                      onClick={() =>
                        onUpdateControls({
                          interiorLights: !controls.interiorLights,
                          stormActive: false,
                        })
                      }
                    />
                    <ToggleButton
                      label={controls.doorOpen ? 'Close Door' : 'Open Door'}
                      active={controls.doorOpen}
                      onClick={() =>
                        onUpdateControls({ doorOpen: !controls.doorOpen })
                      }
                    />
                    <ToggleButton
                      label="Cutaway View"
                      active={controls.cutaway}
                      onClick={() =>
                        onUpdateControls({ cutaway: !controls.cutaway })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-2.5">
                    <SliderField
                      id="beam-intensity"
                      label="Beam Intensity"
                      valueText={`${controls.beamIntensity.toFixed(2)}x`}
                      min={0.2}
                      max={2.5}
                      step={0.05}
                      value={controls.beamIntensity}
                      onChange={(v) =>
                        onUpdateControls({ beamIntensity: v, stormActive: false })
                      }
                    />
                    <SliderField
                      id="beam-softness"
                      label="Beam Softness"
                      valueText={`${Math.round(controls.beamSoftness * 100)}%`}
                      min={0.1}
                      max={1.0}
                      step={0.02}
                      value={controls.beamSoftness}
                      onChange={(v) => onUpdateControls({ beamSoftness: v })}
                    />
                    <SliderField
                      id="beam-range"
                      label="Beam Range"
                      valueText={`${Math.round(controls.beamRange)}m`}
                      min={45}
                      max={135}
                      step={2}
                      value={controls.beamRange}
                      onChange={(v) => onUpdateControls({ beamRange: v })}
                    />
                    <SliderField
                      id="beacon-speed"
                      label="Rotation Speed"
                      valueText={`${controls.beaconSpeed.toFixed(2)} rad/s`}
                      min={0.05}
                      max={1.8}
                      step={0.05}
                      value={controls.beaconSpeed}
                      onChange={(v) => onUpdateControls({ beaconSpeed: v })}
                    />
                  </div>
                </div>
              )}

              {/* 6. ARCHITECTURE & CAMERA */}
              {activeTab === 'architecture' && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] text-slate-400 pr-1">Views:</span>
                      {CAMERA_OPTIONS.map((cam) => {
                        const active = controls.cameraMode === cam.id;
                        return (
                          <button
                            key={cam.id}
                            type="button"
                            aria-label={`${cam.label} camera`}
                            onClick={() =>
                              onUpdateControls({ cameraMode: cam.id })
                            }
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                              active
                                ? 'bg-amber-500/20 text-amber-200 border-amber-400/50'
                                : 'bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.1]'
                            }`}
                          >
                            {cam.label}
                          </button>
                        );
                      })}
                      <span className="text-[11px] text-slate-400 pl-2 pr-1">Inspect:</span>
                      {INSPECTION_CAMERA_OPTIONS.map((cam) => {
                        const active = controls.cameraMode === cam.id;
                        return (
                          <button
                            key={cam.id}
                            type="button"
                            aria-label={`${cam.label} inspection camera`}
                            onClick={() =>
                              onUpdateControls({ cameraMode: cam.id })
                            }
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                              active
                                ? 'bg-sky-500/20 text-sky-200 border-sky-400/50'
                                : 'bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.1]'
                            }`}
                          >
                            {cam.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/10">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <ToggleButton
                        label="Building Bounds"
                        active={controls.showBuildingBounds}
                        onClick={() =>
                          onUpdateControls({
                            showBuildingBounds: !controls.showBuildingBounds,
                          })
                        }
                      />
                      <ToggleButton
                        label="Foundations"
                        active={controls.showFoundations}
                        onClick={() =>
                          onUpdateControls({
                            showFoundations: !controls.showFoundations,
                          })
                        }
                      />
                      <ToggleButton
                        label="Walkway Guides"
                        active={controls.showWalkwayGuides}
                        onClick={() =>
                          onUpdateControls({
                            showWalkwayGuides: !controls.showWalkwayGuides,
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <ToggleButton
                        label="Auto Cinematic"
                        active={controls.autoCinematic}
                        onClick={() =>
                          onUpdateControls({
                            autoCinematic: !controls.autoCinematic,
                          })
                        }
                      />
                      <button
                        type="button"
                        onClick={onResetCamera}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/[0.05] hover:bg-white/[0.12] text-slate-200 border border-white/10 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Camera</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 7. CINEMATIC & PERFORMANCE */}
              {activeTab === 'cinematic' && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        onClick={toggleStormPlay}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                      >
                        {controls.stormActive && controls.stormPlaying ? (
                          <Pause className="w-3.5 h-3.5" />
                        ) : (
                          <Play className="w-3.5 h-3.5" />
                        )}
                        <span>
                          {controls.stormActive && controls.stormPlaying
                            ? 'Pause'
                            : 'Play'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onUpdateControls({
                            stormActive: true,
                            stormPlaying: true,
                            stormTime: 0,
                          })
                        }
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] text-slate-200 border border-white/10 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restart</span>
                      </button>

                      <ToggleButton
                        label="Loop"
                        active={controls.stormLoop}
                        onClick={() =>
                          onUpdateControls({ stormLoop: !controls.stormLoop })
                        }
                      />

                      <button
                        type="button"
                        onClick={onResetScene}
                        className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] text-slate-200 border border-white/10 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Reset Scene
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs text-slate-300">
                        Act:{' '}
                        <strong className="text-amber-300 font-medium">
                          {stormPhase}
                        </strong>
                      </span>
                      <div className="flex items-center gap-1">
                        {(['low', 'medium', 'high'] as QualityPreset[]).map((q) => (
                          <button
                            key={q}
                            type="button"
                            onClick={() => onUpdateControls({ quality: q })}
                            className={`px-2 py-1 rounded text-[11px] font-medium capitalize border transition-colors cursor-pointer ${
                              controls.quality === q
                                ? 'bg-amber-500/20 text-amber-200 border-amber-400/45'
                                : 'bg-white/[0.03] text-slate-400 border-white/10 hover:text-slate-200'
                            }`}
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Deterministic Reversible 0-30s Timeline Scrubber */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-9">
                      <SliderField
                        id="storm-timeline"
                        label="Storm Timeline"
                        valueText={`${controls.stormTime.toFixed(1)}s / ${STORM_DURATION}.0s`}
                        min={0}
                        max={STORM_DURATION}
                        step={0.1}
                        value={controls.stormTime}
                        onChange={(v) =>
                          onUpdateControls({
                            stormActive: true,
                            stormTime: v,
                          })
                        }
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono-tabular">
                        <span>0s Golden Hour</span>
                        <span>5s Approaching</span>
                        <span>10s Rain</span>
                        <span>15s Storm</span>
                        <span>25s Subsides</span>
                      </div>
                    </div>
                    <div className="md:col-span-3">
                      <SliderField
                        id="sim-speed"
                        label="Playback Speed"
                        valueText={`${controls.stormSpeed.toFixed(2)}x`}
                        min={0.25}
                        max={2.0}
                        step={0.25}
                        value={controls.stormSpeed}
                        onChange={(v) => onUpdateControls({ stormSpeed: v })}
                      />
                    </div>
                  </div>

                  {/* Performance Telemetry & Expensive Effects Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
                    <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono-tabular text-slate-300">
                      <span>
                        <span className="text-slate-500">FPS </span>
                        {telemetry.fps}
                      </span>
                      <span>
                        <span className="text-slate-500">Draws </span>
                        {telemetry.drawCalls}
                      </span>
                      <span>
                        <span className="text-slate-500">Geos </span>
                        {telemetry.geometries}
                      </span>
                      <span>
                        <span className="text-slate-500">Tris </span>
                        {telemetry.triangles.toLocaleString()}
                      </span>
                      <span>
                        <span className="text-slate-500">GL </span>
                        {telemetry.isSoftwareGl ? 'Software' : 'GPU'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <ToggleButton
                        label="Full FX"
                        active={controls.expensiveEffects}
                        onClick={() =>
                          onUpdateControls({
                            expensiveEffects: !controls.expensiveEffects,
                          })
                        }
                      />
                      <ToggleButton
                        label="Particles"
                        active={controls.showParticles}
                        onClick={() =>
                          onUpdateControls({
                            showParticles: !controls.showParticles,
                          })
                        }
                      />
                      <ToggleButton
                        label="Wireframe"
                        active={controls.wireframe}
                        onClick={() =>
                          onUpdateControls({ wireframe: !controls.wireframe })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function SliderField({
  id,
  label,
  valueText,
  min,
  max,
  step,
  value,
  onChange,
}: {
  id: string;
  label: string;
  valueText: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <label htmlFor={id} className="text-slate-300 font-medium">
          {label}
        </label>
        <span className="text-slate-400 font-mono-tabular text-[11px]">
          {valueText}
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
        className="studio-slider w-full"
      />
    </div>
  );
}

function ToggleButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
        active
          ? 'bg-amber-500/20 text-amber-200 border-amber-400/50'
          : 'bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.1]'
      }`}
    >
      {label}
    </button>
  );
}
