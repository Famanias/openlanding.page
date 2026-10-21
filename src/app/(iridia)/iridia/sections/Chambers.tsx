export function Chambers() {
  const chambers = [
    {
      id: "refraction",
      phase: "PHASE 01",
      title: "Snell-Descartes Collimation",
      wavelength: "589 nm · Solar",
      color: "#00F0FF",
      summary:
        "Incident ambient daylight strikes 90mm thick monolithic quartz crystal slabs, bending into a parallel planar wavefront with zero spherical aberration.",
      metrics: [
        { label: "Critical Angle", value: "θc = 43.3°" },
        { label: "Facet Flatness", value: "λ / 10" },
      ],
      svgDiagram: (
        <svg viewBox="0 0 240 120" className="w-full h-24" fill="none" aria-label="Refraction Ray Diagram">
          <rect width="240" height="120" fill="#0A0B10" />
          <polygon points="60,20 180,20 150,100 90,100" stroke="#00F0FF" strokeWidth="1.5" fill="#141724" fillOpacity="0.6" />
          <line x1="20" y1="50" x2="105" y2="40" stroke="#F5F3EF" strokeWidth="2" />
          <line x1="105" y1="40" x2="135" y2="70" stroke="#00F0FF" strokeWidth="2" />
          <line x1="135" y1="70" x2="220" y2="85" stroke="#00F0FF" strokeWidth="2" strokeDasharray="3 2" />
          <circle cx="105" cy="40" r="3" fill="#00F0FF" />
          <circle cx="135" cy="70" r="3" fill="#00F0FF" />
        </svg>
      ),
    },
    {
      id: "dispersion",
      phase: "PHASE 02",
      title: "Cauchy Wavelength Separation",
      wavelength: "480–650 nm · Spectrum",
      color: "#FF3366",
      summary:
        "Wavelength-dependent phase velocity forces polychromatic light to fan out into distinct chromatic angles, projecting continuous fluid gradients across physical architecture.",
      metrics: [
        { label: "Angular Spread", value: "Δθ = 4.82°" },
        { label: "Dispersive Power", value: "ω = 0.0156" },
      ],
      svgDiagram: (
        <svg viewBox="0 0 240 120" className="w-full h-24" fill="none" aria-label="Dispersion Ray Diagram">
          <rect width="240" height="120" fill="#0A0B10" />
          <polygon points="120,20 180,95 60,95" stroke="#FF3366" strokeWidth="1.5" fill="#141724" fillOpacity="0.6" />
          <line x1="20" y1="65" x2="95" y2="65" stroke="#F5F3EF" strokeWidth="2" />
          <path d="M95,65 L145,55 L220,40" stroke="#00F0FF" strokeWidth="1.5" />
          <path d="M95,65 L148,65 L220,65" stroke="#FFE600" strokeWidth="1.5" />
          <path d="M95,65 L150,75 L220,90" stroke="#FF3366" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: "interference",
      phase: "PHASE 03",
      title: "Thin-Film Nanostructure",
      wavelength: "532 nm · Iridescent",
      color: "#FFE600",
      summary:
        "Sub-micron alternating dielectric layers induce constructive interference, creating shifting iridescent sheens that transform dynamically with observer angle.",
      metrics: [
        { label: "Layer Pitch", value: "d = 138 nm" },
        { label: "Reflectance", value: "R > 98.5%" },
      ],
      svgDiagram: (
        <svg viewBox="0 0 240 120" className="w-full h-24" fill="none" aria-label="Interference Diagram">
          <rect width="240" height="120" fill="#0A0B10" />
          <line x1="30" y1="35" x2="210" y2="35" stroke="#8D93A8" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="30" y1="55" x2="210" y2="55" stroke="#FFE600" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="30" y1="75" x2="210" y2="75" stroke="#8D93A8" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="30" y1="95" x2="210" y2="95" stroke="#00F0FF" strokeWidth="1.5" strokeOpacity="0.7" />
          <path d="M40,20 L100,55 L160,20" stroke="#FFE600" strokeWidth="1.8" />
          <path d="M70,20 L130,75 L190,20" stroke="#00F0FF" strokeWidth="1.8" strokeDasharray="3 2" />
        </svg>
      ),
    },
    {
      id: "luminescence",
      phase: "PHASE 04",
      title: "Quantum Dot Matrix",
      wavelength: "410–650 nm · Resonant",
      color: "#00F0FF",
      summary:
        "Colloidal semiconductor crystals embedded in optical resin convert ambient ultraviolet radiation into ultra-pure narrow-band spectral emission lines.",
      metrics: [
        { label: "Quantum Yield", value: "Φ = 94.2%" },
        { label: "FWHM Bandwidth", value: "< 22 nm" },
      ],
      svgDiagram: (
        <svg viewBox="0 0 240 120" className="w-full h-24" fill="none" aria-label="Quantum Matrix Diagram">
          <rect width="240" height="120" fill="#0A0B10" />
          <g stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.3">
            <circle cx="60" cy="40" r="14" />
            <circle cx="120" cy="40" r="18" stroke="#FF3366" />
            <circle cx="180" cy="40" r="22" stroke="#FFE600" />
            <circle cx="90" cy="80" r="20" stroke="#FFE600" />
            <circle cx="150" cy="80" r="16" />
          </g>
          <circle cx="60" cy="40" r="4" fill="#00F0FF" />
          <circle cx="120" cy="40" r="5" fill="#FF3366" />
          <circle cx="180" cy="40" r="6" fill="#FFE600" />
          <circle cx="90" cy="80" r="5" fill="#FFE600" />
          <circle cx="150" cy="80" r="4" fill="#00F0FF" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="chambers"
      className="py-24 px-6 sm:px-10 lg:px-16 xl:px-20 max-w-[1520px] mx-auto space-y-12 relative"
      aria-label="Spectral Chambers"
    >
      {/* Background Ambient Caustic Flare */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] rounded-full blur-[160px] opacity-15 pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, #00F0FF 0%, #FF3366 50%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#8D93A8]/20 pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#00F0FF]">
            Chamber Architecture
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F3EF] mt-2">
            The Four Spectral Chambers
          </h2>
        </div>
        <p className="font-body text-sm md:text-base text-[#8D93A8] max-w-lg leading-relaxed">
          Each chamber inside the pavilion modulates a distinct physical regime of optical wave mechanics, converting ambient photon flux into fluid spatial spectra.
        </p>
      </div>

      {/* 2x2 Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {chambers.map((chamber) => (
          <div
            key={chamber.id}
            className="ir-glass-panel rounded-lg p-6 sm:p-8 space-y-5 transition-all duration-300 hover:border-[#00F0FF]/50 hover:shadow-2xl hover:shadow-[#00F0FF]/5 relative overflow-hidden group"
          >
            {/* Corner Precision Optical Ticks */}
            <div className="absolute top-3 right-3 font-mono text-[9px] text-[#8D93A8]/40 tracking-widest pointer-events-none">
              REF://OPT-0{chamber.phase.slice(-1)}
            </div>

            {/* Header: Phase & Wavelength badge */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold tracking-widest text-[#8D93A8]">
                {chamber.phase}
              </span>
              <span
                className="font-mono text-[11px] px-2.5 py-0.5 rounded border"
                style={{
                  color: chamber.color,
                  borderColor: `${chamber.color}44`,
                  backgroundColor: `${chamber.color}11`,
                }}
              >
                {chamber.wavelength}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F5F3EF]">
              {chamber.title}
            </h3>

            {/* SVG Optical Diagram */}
            <div className="rounded border border-[#8D93A8]/20 overflow-hidden bg-[#0A0B10]">
              {chamber.svgDiagram}
            </div>

            {/* Summary */}
            <p className="font-body text-sm text-[#8D93A8] leading-relaxed">
              {chamber.summary}
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#8D93A8]/15 text-xs font-mono">
              {chamber.metrics.map((m) => (
                <div key={m.label} className="p-2 rounded bg-[#0A0B10]/40 border border-[#8D93A8]/10">
                  <span className="block text-[#8D93A8] text-[10px] uppercase">{m.label}</span>
                  <span className="font-bold text-[#F5F3EF]">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
