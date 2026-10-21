"use client";

import { useState, useSyncExternalStore } from "react";
import { spectralStore } from "./spectral-store";
import { PRESET_ORDER, SPECTRAL_PRESETS, type SpectralPresetId } from "./presets";
import { calculateAbbeNumber, calculateFlux, wavelengthToHue } from "./physics";

export function SpectralSynthesizer() {
  const [copied, setCopied] = useState(false);
  const storeState = useSyncExternalStore(
    spectralStore.subscribe,
    spectralStore.getSnapshot,
    spectralStore.getSnapshot
  );

  const activePreset = SPECTRAL_PRESETS[storeState.activePresetId];

  // Derived telemetry
  const nF = storeState.dispersion + 0.008 * storeState.chromaticSpread;
  const nC = storeState.dispersion - 0.008 * storeState.chromaticSpread;
  const abbeNumber = calculateAbbeNumber(storeState.dispersion, nF, nC);
  const fluxLm = calculateFlux(storeState.dispersion, activePreset.wavelengthNm);
  const hue = wavelengthToHue(activePreset.wavelengthNm);

  // Dynamic CSS code block
  const generatedCss = `/* IRIDIA Kinetic Gradient Waveform */
.kinetic-gradient {
  background: ${activePreset.cssGradient};
  filter: contrast(${Math.round(100 + storeState.turbulence * 15)}%) saturate(${Math.round(110 + storeState.chromaticSpread * 40)}%);
  animation: iridiaFlow ${Math.max(4, Math.round(16 / storeState.flowVelocity))}s ease-in-out infinite alternate;
}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCss);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto rounded-lg ir-glass-panel p-6 sm:p-8 lg:p-10 relative overflow-hidden" id="synthesizer">
      {/* Background Ambient Spectral Glow */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[150px] opacity-20 pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, #00F0FF 0%, #FFE600 70%, transparent 80%)",
        }}
        aria-hidden="true"
      />
      {/* Top Bar: Subtitle & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#8D93A8]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#00F0FF]">
              Spectral Gradient Synthesizer · v2.4
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F5F3EF] mt-1">
            Modulate Optical Waveform
          </h2>
        </div>

        {/* Preset Selector Tabs */}
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Spectral Presets">
          {PRESET_ORDER.map((id) => {
            const p = SPECTRAL_PRESETS[id];
            const isActive = storeState.activePresetId === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={isActive}
                aria-controls="synthesizer-panel"
                onClick={() => spectralStore.setPreset(id)}
                className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#00F0FF] text-[#0A0B10] font-semibold shadow-md shadow-[#00F0FF]/20"
                    : "bg-[#141724]/80 text-[#8D93A8] hover:text-[#F5F3EF] hover:border-[#8D93A8]/40 border border-[#8D93A8]/20"
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6" id="synthesizer-panel">
        {/* Left Column: Sliders */}
        <div className="lg:col-span-6 space-y-5">
          {/* Slider 1: Refractive Index */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <label htmlFor="input-dispersion" className="text-[#F5F3EF] flex items-center gap-1.5 font-medium">
                Refractive Index <span className="text-[#8D93A8]">(nD)</span>
              </label>
              <span className="text-[#00F0FF] font-bold">{storeState.dispersion.toFixed(3)}</span>
            </div>
            <input
              id="input-dispersion"
              type="range"
              min="1.30"
              max="1.90"
              step="0.005"
              value={storeState.dispersion}
              onChange={(e) => spectralStore.setParameters({ dispersion: parseFloat(e.target.value) })}
              className="ir-range"
              aria-valuemin={1.3}
              aria-valuemax={1.9}
              aria-valuenow={storeState.dispersion}
              aria-label="Refractive Index"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8D93A8]">
              <span>1.30 (Fused Silica)</span>
              <span>1.90 (Dense Flint)</span>
            </div>
          </div>

          {/* Slider 2: Turbulence */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <label htmlFor="input-turbulence" className="text-[#F5F3EF] flex items-center gap-1.5 font-medium">
                Curl Turbulence <span className="text-[#8D93A8]">(∇×u)</span>
              </label>
              <span className="text-[#00F0FF] font-bold">{storeState.turbulence.toFixed(2)}</span>
            </div>
            <input
              id="input-turbulence"
              type="range"
              min="0.30"
              max="2.50"
              step="0.05"
              value={storeState.turbulence}
              onChange={(e) => spectralStore.setParameters({ turbulence: parseFloat(e.target.value) })}
              className="ir-range"
              aria-valuemin={0.3}
              aria-valuemax={2.5}
              aria-valuenow={storeState.turbulence}
              aria-label="Curl Turbulence"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8D93A8]">
              <span>0.30 (Laminar)</span>
              <span>2.50 (Vortical)</span>
            </div>
          </div>

          {/* Slider 3: Flow Velocity */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <label htmlFor="input-velocity" className="text-[#F5F3EF] flex items-center gap-1.5 font-medium">
                Flow Velocity <span className="text-[#8D93A8]">(v)</span>
              </label>
              <span className="text-[#00F0FF] font-bold">{storeState.flowVelocity.toFixed(2)}×</span>
            </div>
            <input
              id="input-velocity"
              type="range"
              min="0.20"
              max="2.20"
              step="0.05"
              value={storeState.flowVelocity}
              onChange={(e) => spectralStore.setParameters({ flowVelocity: parseFloat(e.target.value) })}
              className="ir-range"
              aria-valuemin={0.2}
              aria-valuemax={2.2}
              aria-valuenow={storeState.flowVelocity}
              aria-label="Flow Velocity"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8D93A8]">
              <span>0.20× (Glacial)</span>
              <span>2.20× (Accelerated)</span>
            </div>
          </div>

          {/* Slider 4: Chromatic Spread */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <label htmlFor="input-spread" className="text-[#F5F3EF] flex items-center gap-1.5 font-medium">
                Chromatic Dispersion <span className="text-[#8D93A8]">(Δλ)</span>
              </label>
              <span className="text-[#FF3366] font-bold">{storeState.chromaticSpread.toFixed(2)}</span>
            </div>
            <input
              id="input-spread"
              type="range"
              min="0.10"
              max="1.00"
              step="0.02"
              value={storeState.chromaticSpread}
              onChange={(e) => spectralStore.setParameters({ chromaticSpread: parseFloat(e.target.value) })}
              className="ir-range"
              aria-valuemin={0.1}
              aria-valuemax={1.0}
              aria-valuenow={storeState.chromaticSpread}
              aria-label="Chromatic Dispersion"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8D93A8]">
              <span>0.10 (Achromatic)</span>
              <span>1.00 (Prismatic Split)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Telemetry & Live Distribution */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          {/* Live SVG Spectral Curve */}
          <div className="bg-[#0A0B10]/90 border border-[#8D93A8]/20 rounded-md p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] font-mono tracking-wider text-[#8D93A8] uppercase">
                Spectral Energy Distribution
              </span>
              <span className="text-[11px] font-mono text-[#00F0FF]">{activePreset.wavelengthNm} nm</span>
            </div>

            <svg viewBox="0 0 320 90" className="w-full h-24 overflow-visible" aria-label="Spectral curve">
              {/* Grid axes */}
              <line x1="10" y1="80" x2="310" y2="80" stroke="#8D93A8" strokeWidth="0.8" strokeOpacity="0.3" />
              <line x1="10" y1="10" x2="10" y2="80" stroke="#8D93A8" strokeWidth="0.8" strokeOpacity="0.3" />
              
              {/* Dynamic Gaussian curve shifted by wavelength & turbulence */}
              {(() => {
                const center = 10 + ((activePreset.wavelengthNm - 380) / 320) * 300;
                const width = 35 + storeState.chromaticSpread * 45;
                const height = 60 * Math.min(1.2, storeState.dispersion / 1.5);
                const points = [];
                for (let x = 10; x <= 310; x += 10) {
                  const dist = (x - center) / width;
                  const y = 80 - Math.exp(-dist * dist) * height;
                  points.push(`${x},${y.toFixed(1)}`);
                }
                const pathD = `M10,80 L${points.join(" L")} L310,80 Z`;
                return (
                  <>
                    <path d={pathD} fill="url(#spectralGradient)" fillOpacity="0.35" />
                    <path d={`M10,80 L${points.join(" L")}`} fill="none" stroke="#00F0FF" strokeWidth="2" />
                  </>
                );
              })()}

              <defs>
                <linearGradient id="spectralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF3366" />
                  <stop offset="50%" stopColor="#00F0FF" />
                  <stop offset="100%" stopColor="#FFE600" />
                </linearGradient>
              </defs>
            </svg>

            {/* Readout tiles */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#8D93A8]/15 text-center font-mono">
              <div>
                <span className="block text-[10px] text-[#8D93A8]">ABBE NUMBER</span>
                <span className="text-xs font-bold text-[#F5F3EF]">{abbeNumber.toFixed(1)} Vd</span>
              </div>
              <div>
                <span className="block text-[10px] text-[#8D93A8]">FLUX DENSITY</span>
                <span className="text-xs font-bold text-[#00F0FF]">{fluxLm} lm/m²</span>
              </div>
              <div>
                <span className="block text-[10px] text-[#8D93A8]">HUE ANGLE</span>
                <span className="text-xs font-bold text-[#FFE600]">{Math.round(hue)}°</span>
              </div>
            </div>
          </div>

          {/* Dynamic Code Generator & Copy CTA */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#8D93A8] uppercase tracking-wider">
                Exported Gradient Specification
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs font-mono font-semibold text-[#00F0FF] hover:text-[#F5F3EF] transition-colors flex items-center gap-1 cursor-pointer bg-[#00F0FF]/10 px-2.5 py-1 rounded border border-[#00F0FF]/30"
              >
                {copied ? "✓ Copied to Clipboard" : "Copy CSS Code"}
              </button>
            </div>
            <pre className="bg-[#0A0B10] p-3 rounded border border-[#8D93A8]/20 text-[11px] font-mono text-[#8D93A8] overflow-x-auto whitespace-pre">
              <code>{generatedCss}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
