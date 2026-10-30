import React, { useState } from 'react';
import {
  FabricFocusLayer,
  FabricWeatherMode,
  getFabricCameraPose,
  getFabricSlabGap,
} from '../utils/storeLogic';
import { FabricLab3D } from './FabricLab3D';

export const FabricLabSection: React.FC = () => {
  const [explodePct, setExplodePct] = useState<number>(65);
  const [weatherMode, setWeatherMode] = useState<FabricWeatherMode>('TYPHOON');
  const [lockedLayer, setLockedLayer] = useState<FabricFocusLayer>(null);
  const [hoveredLayer, setHoveredLayer] = useState<FabricFocusLayer>(null);

  const effectiveFocus: FabricFocusLayer = hoveredLayer ?? lockedLayer;
  const cameraPose = getFabricCameraPose(effectiveFocus, explodePct);
  const currentSlabGap = getFabricSlabGap(explodePct);

  const weatherModes: {
    id: FabricWeatherMode;
    label: string;
    accent: string;
    telemetry: string;
  }[] = [
    {
      id: 'TYPHOON',
      label: '[MODE 01 // TYPHOON DOWNPOUR — 28,000MM]',
      accent: '#00F0FF',
      telemetry: 'HYDROSTATIC IMPACT RIPPLES // ZERO PENETRATION PAST L01',
    },
    {
      id: 'GALE',
      label: '[MODE 02 // SUB-ZERO GALE — -20°C]',
      accent: '#D4FF00',
      telemetry: 'AERODYNAMIC WIND DEFLECTION // 37.0°C THERMAL CORE RETAINED',
    },
    {
      id: 'VAPOR',
      label: '[MODE 03 // HIGH-EXERTION VAPOR PURGE]',
      accent: '#FF7A00',
      telemetry: 'OUTWARD SWEAT-VAPOR FLUX // RET < 4.5 PERMEABILITY',
    },
  ];

  const layers = [
    {
      index: 1 as const,
      code: 'LAYER 01 // OUTER SHIELD',
      title: '200D Ballistic Cordura® + DWR Fluorocarbon-Free Coating',
      desc: 'Deflects external torrential rain, sleet, and high-velocity wind shear while resisting abrasion.',
      accent: '#00F0FF',
      metric: 'HYDROSTATIC BARRIER: 28,000MM',
      microSpec: '128×128 RIPSTOP BASKET-WEAVE // SHOCKWAVE DEFLECTION',
    },
    {
      index: 2 as const,
      code: 'LAYER 02 // CORE MEMBRANE',
      title: 'Microporous Black ePTFE Hydrophobic Membrane',
      desc: '9 billion microscopic pores per square inch: 20,000x smaller than a water drop, 700x larger than a sweat vapor molecule.',
      accent: '#FF007F',
      metric: 'PORE DENSITY: 9.0 × 10⁹ / IN²',
      microSpec: 'STRETCHED VORONOI CELLULAR LATTICE // 5000X MACRO VIEW',
    },
    {
      index: 3 as const,
      code: 'LAYER 03 // INNER MATRIX',
      title: 'Tricot Micro-Grid Thermal & Moisture Wicking Backing',
      desc: 'Channels internal body heat and perspiration vapor outward through the ePTFE core without conductive heat loss.',
      accent: '#FF7A00',
      metric: 'VAPOR RESISTANCE: RET < 4.5',
      microSpec: '3D HEXAGONAL THERMAL FLEECE BAFFLES // WICKING CHANNELS',
    },
  ];

  const activeWeatherObj =
    weatherModes.find((m) => m.id === weatherMode) ?? weatherModes[0];

  return (
    <section
      id="fabric-lab"
      aria-label="Interactive 3-Layer Fabric Lab"
      className="w-full bg-[#090B0E] border-b border-[rgba(226,232,240,0.14)] py-16 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        {/* Section Header + Explode Slider */}
        <div data-sx-reveal="heading" className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[rgba(226,232,240,0.14)]">
          <div className="space-y-2">
            <div className="font-mono-tech text-xs text-[#00F0FF] tracking-widest">
              SECTION 02 // MATERIAL SCIENCE & HYDROPHOBIC TELEMETRY
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-wider">
              INTERACTIVE 3-LAYER FABRIC LAB
            </h2>
          </div>

          {/* Interactive Range Slider */}
          <div className="w-full lg:w-[460px] bg-[#11161D] border border-[rgba(226,232,240,0.14)] p-4">
            <div className="flex items-center justify-between font-mono-tech text-xs mb-2">
              <label htmlFor="explode-membrane-slider" className="text-[#F8FAFC] font-bold">
                [EXPLODE MEMBRANE LAYERS: 0% — 100%]
              </label>
              <span className="text-[#00F0FF] font-bold">
                {explodePct}% ({currentSlabGap.toFixed(2)}U GAP)
              </span>
            </div>
            <input
              id="explode-membrane-slider"
              type="range"
              min={0}
              max={100}
              value={explodePct}
              onChange={(e) => setExplodePct(Number(e.target.value))}
              className="w-full synapxe-slider"
            />
            <div className="flex justify-between font-mono-tech text-[10px] text-[#94A3B8] mt-1.5">
              <span>0% LAMINATED SEAL</span>
              <span>65% NOMINAL (0.60U)</span>
              <span>100% FULL EXPLODED CAD</span>
            </div>
          </div>
        </div>

        {/* Environmental Stress-Test Control Bar */}
        <div
          data-testid="fabric-weather-control-bar"
          data-sx-reveal="panel"
          className="bg-[#11161D] border-x border-b border-[rgba(226,232,240,0.14)] p-3 sm:px-5 sm:py-3.5 space-y-2.5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[11px]">
            <span className="text-[#94A3B8] uppercase tracking-wider">
              ENVIRONMENTAL STRESS-TEST CHAMBER // SELECT SIMULATION MODE
            </span>
            <div className="flex items-center gap-3">
              <span
                data-testid="fabric-weather-telemetry"
                className="text-[#F8FAFC] truncate"
              >
                {activeWeatherObj.telemetry}
              </span>
              {effectiveFocus !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setLockedLayer(null);
                    setHoveredLayer(null);
                  }}
                  className="px-2.5 py-1 bg-[#00F0FF] text-[#090B0E] font-bold cursor-pointer whitespace-nowrap"
                >
                  [RESET FULL STACK]
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {weatherModes.map((mode) => {
              const active = weatherMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setWeatherMode(mode.id)}
                  className={`font-mono-tech text-[11px] px-3 py-2.5 border text-left transition-colors cursor-pointer truncate ${
                    active
                      ? 'bg-[#090B0E] text-[#F8FAFC] font-bold'
                      : 'bg-[#090B0E]/60 text-[#94A3B8] border-[rgba(226,232,240,0.14)] hover:text-[#F8FAFC]'
                  }`}
                  style={
                    active
                      ? {
                          borderColor: mode.accent,
                          color: mode.accent,
                        }
                      : undefined
                  }
                >
                  {mode.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column 3D Microscopic Cross-Section + Synchronized Layer Spec Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-x border-b border-[rgba(226,232,240,0.14)]">
          {/* Left: Three.js WebGL 3D Microscopic Fabric Cross-Section & Weather Chamber */}
          <div data-sx-reveal="panel" className="lg:col-span-7 relative bg-[#090B0E] border-b lg:border-b-0 lg:border-r border-[rgba(226,232,240,0.14)]">
            {/* Top HUD Readout Overlay (Solid Dark Background, No Backdrop-Filter) */}
            <div className="absolute top-3 left-3 right-3 z-20 pointer-events-none flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10px]">
              <div className="bg-[#090B0E]/92 border border-[#00F0FF]/40 px-2.5 py-1.5 text-[#00F0FF]">
                <span data-testid="fabric-camera-readout">{cameraPose.readout}</span>
              </div>
              <div className="bg-[#090B0E]/92 border border-[rgba(226,232,240,0.18)] px-2.5 py-1.5 text-[#94A3B8]">
                {effectiveFocus === null
                  ? 'OPACITY: L01 100% · L02 100% · L03 100%'
                  : `ISOLATED L0${effectiveFocus}: NON-ACTIVE LAYERS DIMMED TO 15%`}
              </div>
            </div>

            <FabricLab3D
              explodePct={explodePct}
              weatherMode={weatherMode}
              focusedLayer={effectiveFocus}
              onSelectLayer={(layer) => setLockedLayer(layer)}
            />

            {/* Bottom Legend Bar inside 3D Chamber (Solid Dark Background, No Backdrop-Filter) */}
            <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10px] bg-[#090B0E]/92 border border-[rgba(226,232,240,0.14)] px-3 py-1.5">
              <div className="flex items-center gap-2 text-[#00F0FF]">
                <span className="w-2 h-2 bg-[#00F0FF]" />
                <span>CYAN: EXTERNAL RAIN / GALE SHEAR (BLOCKED AT L01)</span>
              </div>
              <div className="flex items-center gap-2 text-[#FF7A00]">
                <span className="w-2 h-2 bg-[#FF7A00]" />
                <span>AMBER: INTERNAL SWEAT VAPOR (VENTED L03 → L01)</span>
              </div>
            </div>
          </div>

          {/* Right: 3 Synchronized Layer Specification Cards (Hover & Click Camera Sync) */}
          <div
            data-sx-reveal="panel"
            onMouseLeave={() => setHoveredLayer(null)}
            className="lg:col-span-5 divide-y divide-[rgba(226,232,240,0.14)] flex flex-col justify-between"
          >
            {layers.map((layer) => {
              const isFocused = effectiveFocus === layer.index;
              const isDimmed = effectiveFocus !== null && effectiveFocus !== layer.index;
              return (
                <button
                  key={layer.index}
                  type="button"
                  data-testid={`fabric-card-${layer.index}`}
                  onMouseEnter={() => setHoveredLayer(layer.index)}
                  onClick={() =>
                    setLockedLayer((prev) =>
                      prev === layer.index ? null : layer.index
                    )
                  }
                  className={`w-full text-left p-6 transition-all cursor-pointer border-l-4 ${
                    isFocused
                      ? 'bg-[#11161D]'
                      : 'bg-[#090B0E] hover:bg-[#11161D]/70'
                  } ${isDimmed ? 'opacity-55' : 'opacity-100'}`}
                  style={{
                    borderLeftColor: isFocused ? layer.accent : 'transparent',
                  }}
                >
                  <div className="flex items-center justify-between gap-2 font-mono-tech text-xs mb-2">
                    <span style={{ color: layer.accent }} className="font-bold">
                      {layer.code}
                    </span>
                    <span className="text-[#94A3B8]">{layer.metric}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#F8FAFC] tracking-wide mb-1.5">
                    {layer.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-3">
                    {layer.desc}
                  </p>
                  <div className="flex items-center justify-between font-mono-tech text-[10px] pt-2 border-t border-[rgba(226,232,240,0.1)]">
                    <span style={{ color: layer.accent }}>{layer.microSpec}</span>
                    <span className="text-[#F8FAFC]">
                      {isFocused ? '[3D MACRO LOCK ACTIVE]' : '[HOVER / CLICK TO ZOOM]'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
