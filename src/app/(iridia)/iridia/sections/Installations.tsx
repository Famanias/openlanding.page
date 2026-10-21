import { Picture } from "../assets";

interface Installation {
  id: string;
  name: string;
  location: string;
  year: string;
  assetKey: string;
  dimensions: string;
  tonnage: string;
  illuminance: string;
  wavelength: string;
  summary: string;
}

const INSTALLATIONS: Installation[] = [
  {
    id: "basel",
    name: "The Spiral Refractor",
    location: "Messeplatz · Basel, Switzerland",
    year: "2025",
    assetKey: "installation-basel",
    dimensions: "12.4 m Height · 36 Fin Elements",
    tonnage: "18.5 Metric Tonnes",
    illuminance: "4,200 lux Peak",
    wavelength: "480–650 nm Continuous",
    summary:
      "A monumental outdoor helical light sculpture of stacked dichroic borosilicate glass fins that decomposes low-angle Alpine sunlight into sweeping chromatic ground projections.",
  },
  {
    id: "kyoto",
    name: "The Spectral Solarium",
    location: "Higashiyama Sanctuary · Kyoto, Japan",
    year: "2026",
    assetKey: "installation-kyoto",
    dimensions: "18 m × 24 m Glass Canopy",
    tonnage: "24.0 Metric Tonnes",
    illuminance: "1,850 lux Diffuse",
    wavelength: "589 nm Sodium D-Line",
    summary:
      "An open-air contemplative cedar pavilion featuring an array of 280 precision plano-convex cylindrical lenses casting geometric caustic ribbons across a black basalt reflecting pool.",
  },
  {
    id: "reykjavik",
    name: "The Chromatic Monolith",
    location: "Grandi Coastal Basin · Reykjavik, Iceland",
    year: "2026",
    assetKey: "installation-reykjavik",
    dimensions: "16 m Diameter Geodesic Dome",
    tonnage: "14.2 Metric Tonnes",
    illuminance: "3,100 lux Dynamic",
    wavelength: "532 nm Auroral Viridian",
    summary:
      "A maritime geodesic structure engineered with frosted fused silica skins that react to geomagnetic storm data, projecting live Navier-Stokes green and violet aurora caustics into the polar sky.",
  },
];

export function Installations() {
  return (
    <section
      id="installations"
      className="py-24 px-6 sm:px-10 lg:px-16 xl:px-20 max-w-[1520px] mx-auto space-y-12 relative"
      aria-label="Architectural Installations"
    >
      {/* Background Ambient Warmth Glow */}
      <div
        className="absolute top-1/3 right-10 w-[640px] h-[480px] rounded-full blur-[160px] opacity-15 pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, #FF4D00 0%, #FFE600 50%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#8D93A8]/20 pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#00F0FF]">
            Architectural Editions
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F3EF] mt-2">
            Selected Public Pavilions
          </h2>
        </div>
        <p className="font-body text-sm md:text-base text-[#8D93A8] max-w-lg leading-relaxed">
          Permanent and biennial spatial crystal commissions engineered in collaboration with world museums, civic foundations, and architectural biennales.
        </p>
      </div>

      {/* 3 Installation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {INSTALLATIONS.map((item) => (
          <article
            key={item.id}
            className="ir-glass-panel rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#00F0FF]/40"
          >
            {/* Visual Header / Photo Frame */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0B10]">
              <Picture
                assetKey={item.assetKey}
                alt={`${item.name} in ${item.location}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 font-mono text-[11px] px-2 py-0.5 rounded bg-[#0A0B10]/80 text-[#00F0FF] border border-[#00F0FF]/30">
                {item.year}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#8D93A8]">
                  {item.location}
                </span>
                <h3 className="font-display text-xl font-bold text-[#F5F3EF] mt-1">
                  {item.name}
                </h3>
                <p className="font-body text-sm text-[#8D93A8] mt-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* Technical Spec Matrix */}
              <div className="pt-4 border-t border-[#8D93A8]/15 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#8D93A8]">SCALE</span>
                  <span className="text-[#F5F3EF]">{item.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8D93A8]">MASS</span>
                  <span className="text-[#F5F3EF]">{item.tonnage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8D93A8]">FLUX</span>
                  <span className="text-[#00F0FF]">{item.illuminance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8D93A8]">SPECTRUM</span>
                  <span className="text-[#FFE600]">{item.wavelength}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
