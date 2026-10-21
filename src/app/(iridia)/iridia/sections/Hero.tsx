import { PrismDispersionModel } from "../spatial/PrismDispersionModel";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-8 w-full flex flex-col justify-between overflow-x-clip"
      aria-label="Hero: The Spatial Architecture of Kinetic Light"
    >
      {/* 3D Prism Light Dispersion Canvas: Spanning Full Hero Stage (Borderless, Uncontained) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <PrismDispersionModel className="pointer-events-auto" />
      </div>

      {/* 3D Perspective Receding Floor Grid */}
      <div
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none z-[1] overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="w-full h-full"
          style={{
            perspective: "700px",
            perspectiveOrigin: "50% 100%",
          }}
        >
          <div
            className="w-full h-[220%] origin-bottom"
            style={{
              transform: "rotateX(72deg) translateY(-8%)",
              backgroundImage:
                "linear-gradient(#8D93A815 1px, transparent 1px), linear-gradient(90deg, #8D93A815 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "linear-gradient(to top, #0A0B10 20%, transparent 90%)",
              WebkitMaskImage: "linear-gradient(to top, #0A0B10 20%, transparent 90%)",
            }}
          />
        </div>
        {/* Horizon Optical Beam */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />
      </div>

      {/* Top Tagline & Telemetry Eyebrow (Constrained to Widescreen Container) */}
      <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10 pointer-events-none">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#8D93A8]/20 pb-3 pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="font-mono text-xs tracking-widest text-[#00F0FF] uppercase">
              Optical Foundry · Zurich &amp; Kyoto · Architectural Scale
            </span>
          </div>
          <div className="font-mono text-xs text-[#8D93A8] hidden sm:block">
            STATUS: <span className="text-[#F5F3EF]">LAMINAR ADVECTION</span> · Vd=64.2
          </div>
        </div>
      </div>

      {/* Center of Focus: Headline, 3D Prism Centerpiece Stage Clearance, and Actions */}
      <div className="my-auto py-2 w-full flex flex-col items-center relative z-10 pointer-events-none">
        {/* Main Headline */}
        <div className="w-full max-w-4xl mx-auto px-6 text-center space-y-3 pointer-events-auto">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight text-[#F5F3EF] leading-[1.02]">
            The spatial architecture of kinetic light.
          </h1>

          <p className="font-body text-sm sm:text-base md:text-lg text-[#8D93A8] font-normal max-w-2xl mx-auto leading-relaxed">
            We engineer monumental borosilicate crystal pavilions that bend ambient daylight into real-time
            Navier-Stokes chromatic fluid fields, calibrated down to the nanometer.
          </p>
        </div>

        {/* 3D Prism Centerpiece Optical Clearance Window */}
        <div className="w-full h-[220px] sm:h-[260px] md:h-[290px] pointer-events-none" aria-hidden="true" />

        {/* Action Buttons Centered Below Model */}
        <div className="w-full max-w-[1520px] mx-auto px-6 flex flex-wrap items-center justify-center gap-4 pt-1 pointer-events-auto">
          <a href="#synthesizer" className="ir-btn-primary rounded">
            <span>Synthesize Waveform</span>
            <span aria-hidden="true">→</span>
          </a>
          <a href="#chambers" className="ir-btn-secondary rounded">
            Explore Chambers (01–04)
          </a>
        </div>
      </div>

      {/* Bottom Telemetry HUD Matrix (Constrained to Widescreen Container) */}
      <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10 pointer-events-none">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 pt-4 border-t border-[#8D93A8]/20 font-mono pointer-events-auto">
          <div className="p-3.5 rounded bg-[#141724]/60 border border-[#8D93A8]/20 backdrop-blur-sm">
            <span className="block text-[10px] text-[#8D93A8] uppercase tracking-wider">Refractive Index</span>
            <span className="text-base font-bold text-[#F5F3EF]">nD = 1.61803</span>
          </div>
          <div className="p-3.5 rounded bg-[#141724]/60 border border-[#8D93A8]/20 backdrop-blur-sm">
            <span className="block text-[10px] text-[#8D93A8] uppercase tracking-wider">Abbe Dispersion</span>
            <span className="text-base font-bold text-[#00F0FF]">Vd = 64.17</span>
          </div>
          <div className="p-3.5 rounded bg-[#141724]/60 border border-[#8D93A8]/20 backdrop-blur-sm">
            <span className="block text-[10px] text-[#8D93A8] uppercase tracking-wider">Radiative Flux</span>
            <span className="text-base font-bold text-[#FFE600]">1,240 lm/m²</span>
          </div>
          <div className="p-3.5 rounded bg-[#141724]/60 border border-[#8D93A8]/20 backdrop-blur-sm">
            <span className="block text-[10px] text-[#8D93A8] uppercase tracking-wider">Coherence Octave</span>
            <span className="text-base font-bold text-[#FF3366]">λ = 480–650nm</span>
          </div>
        </div>
      </div>
    </section>
  );
}
