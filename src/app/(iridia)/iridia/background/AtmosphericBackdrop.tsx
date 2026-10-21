"use client";

/**
 * AtmosphericBackdrop:
 * Provides calm, elegant, eye-pleasing spatial depth:
 * 1. Precision SVG architectural coordinate grid with delicate 0.12 opacity lines and subtle crosshair ticks.
 * 2. Soft center reading shield for effortless typography contrast.
 * 3. Deep peripheral vignette to frame the kinetic pavilion.
 */

export function AtmosphericBackdrop() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Layer 1: Ambient Subtle Caustic Glows (Gentle, low-saturation atmospheric warmth) */}
      <div className="absolute inset-0">
        {/* Incident Daylight Beam Atmospheric Streak */}
        <div
          className="absolute top-[8%] -left-[10%] w-[680px] h-[2px] opacity-15 rotate-[22deg] origin-left pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #F5F3EF 40%, #00F0FF 80%, transparent 100%)",
            filter: "blur(3px)",
          }}
        />

        {/* Full-Page Dispersion Fan Atmospheric Caustic Wash */}
        <div
          className="absolute top-[20%] left-[40%] w-[900px] h-[750px] rounded-full blur-[220px] opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 25% 25%, #00F0FF 0%, #FFE600 35%, #FF4D00 65%, #FF3366 85%, transparent 100%)",
          }}
        />

        {/* Top-Right: Gentle Cyan Glow */}
        <div
          className="absolute -top-[10%] right-[15%] w-[520px] h-[520px] rounded-full blur-[160px] opacity-10"
          style={{
            background: "radial-gradient(circle, #00F0FF 0%, transparent 70%)",
          }}
        />

        {/* Mid-Left: Soft Ruby Laser Ambient Pool */}
        <div
          className="absolute top-[40%] -left-[10%] w-[560px] h-[560px] rounded-full blur-[180px] opacity-8"
          style={{
            background: "radial-gradient(circle, #FF3366 0%, transparent 70%)",
          }}
        />

        {/* Bottom-Center: Subtle Starlight Warmth */}
        <div
          className="absolute bottom-[10%] left-[25%] w-[600px] h-[450px] rounded-full blur-[180px] opacity-8"
          style={{
            background: "radial-gradient(circle, #FFE600 0%, #FF4D00 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Layer 2: Delicate Architectural Coordinate Grid with Crosshairs */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          maskImage: "radial-gradient(ellipse 85% 75% at 50% 50%, #0A0B10 40%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 50% 50%, #0A0B10 40%, transparent 95%)",
        }}
      >
        <defs>
          {/* Small 32px Grid */}
          <pattern id="ir-grid-small" width="32" height="32" patternUnits="userSpaceOnUse">
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="#8D93A8"
              strokeWidth="0.5"
              strokeOpacity="0.12"
            />
          </pattern>
          {/* Large 128px Grid with Corner Marks */}
          <pattern id="ir-grid-large" width="128" height="128" patternUnits="userSpaceOnUse">
            <rect width="128" height="128" fill="url(#ir-grid-small)" />
            <path
              d="M 128 0 L 0 0 0 128"
              fill="none"
              stroke="#8D93A8"
              strokeWidth="0.8"
              strokeOpacity="0.2"
            />
            {/* Precision Crosshair (+) at each 128px intersection */}
            <path
              d="M 0 -4 L 0 4 M -4 0 L 4 0"
              stroke="#00F0FF"
              strokeWidth="1"
              strokeOpacity="0.35"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ir-grid-large)" />
      </svg>

      {/* Layer 3: Reading Contrast Shield (Gentle central darkening for crisp, effortless text readability) */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 75% 65% at 50% 35%, rgba(10, 11, 16, 0.45) 0%, rgba(10, 11, 16, 0.15) 60%, transparent 100%)",
        }}
      />

      {/* Layer 4: Deep Peripheral Vignette */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: "inset 0 0 140px 60px #0A0B10",
        }}
      />
    </div>
  );
}
