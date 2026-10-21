"use client";

import { useState } from "react";

interface LayerData {
  id: string;
  name: string;
  index: string;
  thickness: string;
  role: string;
  accent: string;
  desc: string;
}

const LAYERS: LayerData[] = [
  {
    id: "substrate",
    name: "01 · Fused Silica Substrate",
    index: "n = 1.4584",
    thickness: "8.0 mm",
    role: "Structural Carrier & Planar Waveguide",
    accent: "#00F0FF",
    desc: "Ultra-pure synthetic SiO₂ glass with zero bubble inclusion. Acts as the optical foundation with 99.9% transmission across the visible spectrum.",
  },
  {
    id: "nematic",
    name: "02 · Nematic Liquid Gradient Lattice",
    index: "Δn = 0.220",
    thickness: "120 µm",
    role: "Electro-optic Birefringent Phase Shifter",
    accent: "#FF3366",
    desc: "Self-assembling liquid crystal molecules in continuous laminar flow. Dynamically rotates polarization angles to induce moving color gradients.",
  },
  {
    id: "grating",
    name: "03 · Nano-Imprinted Diffraction Grating",
    index: "1200 lines/mm",
    thickness: "450 nm",
    role: "Fraunhofer Spatial Chromatic Separator",
    accent: "#FFE600",
    desc: "Sub-wavelength etched relief grooves splitting transmitted light into sharp spectral angular distributions following the grating equation.",
  },
  {
    id: "quantum",
    name: "04 · Quantum Dot Photoluminescent Film",
    index: "QY = 94.2%",
    thickness: "25 µm",
    role: "Resonant Narrow-Band Luminescence",
    accent: "#00F0FF",
    desc: "Colloidal semiconductor nanocrystals tuned to exact emission wavelengths (480nm cyan, 532nm viridian, 650nm ruby) with zero thermal loss.",
  },
];

export function PrismDissection() {
  const [spread, setSpread] = useState<number>(75);
  const [activeLayer, setActiveLayer] = useState<string>("nematic");

  const selected = LAYERS.find((l) => l.id === activeLayer) || LAYERS[1];

  return (
    <div className="w-full max-w-[1400px] mx-auto rounded-lg ir-glass-panel p-6 sm:p-8 lg:p-10 relative overflow-hidden">
      {/* Background Ambient Caustic Spot */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[140px] opacity-20 pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, #00F0FF 0%, #FF3366 60%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#8D93A8]/20">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#00F0FF]">
            Architecture of the Crystal Facet
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F3EF] mt-1">
            3D Exploded Layer Dissection
          </h2>
        </div>

        {/* Spread Slider */}
        <div className="w-full md:w-72 space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <label htmlFor="spread-slider" className="text-[#8D93A8]">Z-Axis Separation</label>
            <span className="text-[#00F0FF] font-bold">{spread}%</span>
          </div>
          <input
            id="spread-slider"
            type="range"
            min="0"
            max="100"
            value={spread}
            onChange={(e) => setSpread(parseInt(e.target.value, 10))}
            className="ir-range"
            aria-label="Layer Separation Distance"
          />
        </div>
      </div>

      {/* Layer Tabs */}
      <div className="flex flex-wrap gap-2 pt-6" role="tablist" aria-label="Optical Layers">
        {LAYERS.map((layer) => {
          const isCurrent = activeLayer === layer.id;
          return (
            <button
              key={layer.id}
              role="tab"
              aria-selected={isCurrent}
              onClick={() => setActiveLayer(layer.id)}
              className={`px-3.5 py-2 rounded text-xs font-mono transition-all cursor-pointer ${
                isCurrent
                  ? "bg-[#00F0FF] text-[#0A0B10] font-semibold"
                  : "bg-[#141724]/80 text-[#8D93A8] hover:text-[#F5F3EF] border border-[#8D93A8]/20"
              }`}
            >
              {layer.name}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
        {/* Left: 3D Stage with Floating Exploded Slabs */}
        <div className="lg:col-span-7 h-[400px] sm:h-[440px] flex items-center justify-center relative perspective-[1000px] overflow-hidden rounded bg-[#0A0B10]/80 border border-[#8D93A8]/20">
          {/* Internal Optical Bench Grid */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(#8D93A833 1px, transparent 1px), linear-gradient(90deg, #8D93A833 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          {/* Focused Beam Spotlight */}
          <div
            className="absolute w-72 h-72 rounded-full blur-[90px] opacity-30 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #00F0FF 0%, transparent 70%)",
            }}
          />

          <div
            className="w-72 sm:w-80 h-44 sm:h-48 relative transform-style-3d transition-transform duration-200"
            style={{
              transform: "rotateX(62deg) rotateZ(-34deg)",
            }}
          >
            {LAYERS.map((layer, index) => {
              const layerSpread = (index - 1.5) * (spread * 1.4);
              const isCurrent = activeLayer === layer.id;

              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`ir-layer-plate absolute inset-0 rounded-md border cursor-pointer transition-all ${
                    isCurrent
                      ? "border-[#00F0FF] shadow-[0_0_24px_rgba(0,240,255,0.4)]"
                      : "border-[#8D93A8]/30 hover:border-[#F5F3EF]/60"
                  }`}
                  style={{
                    transform: `translateZ(${layerSpread}px)`,
                    backgroundColor: isCurrent ? "rgba(20, 23, 36, 0.9)" : "rgba(10, 11, 16, 0.75)",
                    backdropFilter: "blur(6px)",
                    zIndex: isCurrent ? 10 : index + 1,
                  }}
                >
                  <div className="p-3 flex justify-between items-start text-xs font-mono">
                    <span className="font-bold text-[#F5F3EF]">{layer.name.split("·")[0]}</span>
                    <span style={{ color: layer.accent }}>{layer.index}</span>
                  </div>
                  <div className="absolute inset-x-2 bottom-2 h-0.5 bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent" />
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-3 left-4 text-[11px] font-mono text-[#8D93A8] pointer-events-none">
            PERSPECTIVE: 1000PX · ROTATE: (62°, -34°)
          </div>
        </div>

        {/* Right: Layer Dossier Card */}
        <div className="lg:col-span-5 bg-[#141724]/60 border border-[#8D93A8]/20 rounded-md p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span
              className="px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider font-semibold"
              style={{
                backgroundColor: `${selected.accent}22`,
                color: selected.accent,
                border: `1px solid ${selected.accent}55`,
              }}
            >
              {selected.index}
            </span>
            <span className="text-xs font-mono text-[#8D93A8]">{selected.thickness}</span>
          </div>

          <h3 className="font-display text-xl font-bold text-[#F5F3EF]">
            {selected.name}
          </h3>

          <div className="text-xs font-mono text-[#00F0FF]">
            FUNCTION: {selected.role}
          </div>

          <p className="text-sm text-[#8D93A8] leading-relaxed">
            {selected.desc}
          </p>

          <div className="pt-2 border-t border-[#8D93A8]/15 flex items-center justify-between text-xs font-mono">
            <span className="text-[#8D93A8]">TRANSMITTANCE</span>
            <span className="text-[#F5F3EF] font-bold">99.4% @ 589nm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
