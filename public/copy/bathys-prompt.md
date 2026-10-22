# Prompt: rebuild "BATHYS" (Autonomous Hadal Submersible Showcase with Live Hydrostatic Telemetry)

Paste everything below the line into your AI coding agent.

---

Build a landing page and oceanographic telemetry showcase in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4** for a fictional autonomous deep-ocean robotics foundry called **BATHYS** (tagline *"Autonomous Hadal Exploration Vehicles · Calibrated to 11,000 Metres"*, slogan *"Calibrated for the crushing dark."*). The foundry manufactures Grade-5 titanium uncrewed submersibles in Brest and Monterey that explore the Mariana, Puerto Rico, and Kermadec trenches.

**The central metaphor: The ocean is stratified into vertical bathymetric depth zones where light vanishes and hydrostatic pressure reaches 1,100 bar, so the page is an instrumented vertical dive to 10,928 metres.** A pinned hydrostatic telemetry stage scrubs depth, pressure in bar ($P = \rho g h$), solar irradiance extinction, and live procedural active sonar returns as the visitor dives through the Epipelagic, Mesopelagic, Bathypelagic, Abyssopelagic, and Hadopelagic zones.

**Reference:** The live template at https://openlandingpage.vercel.app/bathys and the brand board palette below.

## Brand Rules

- **Eight colours only:**
  - trench obsidian `#03070D` (ink: canvas ground, deepest hadal darkness)
  - bathypelagic navy `#0A1526` (dark slab: section cards, telemetry panels)
  - hull titanium `#EDF5FA` (paper: primary typography, crisp vector lines)
  - siphonophore cyan `#00E5FF` (primary accent: bioluminescence, active acoustic beam)
  - acoustic amber `#FF9E1B` (secondary accent: sonar alerts, critical hadal threshold)
  - pressure glass `#122338` (tint: instrument bezels, card borders)
  - hydrographic slate `#546E8A` (hairlines: bathymetric contour rules, grid ticks)
  - subsea mist `#8DA8C2` (muted: secondary descriptions, specifications)

  All intermediate tints are made with `color-mix()` of these eight hexes. Headings are never italic.
- **Type (via `next/font/google`):**
  - **Chakra Petch** 600/700 for display and technical headings.
  - **Sora** 300/400/600 for high-density readable body copy.
  - **Share Tech Mono** 400 for telemetry readouts, coordinates, and naval metadata.
- **Mark & Logo:** An equatorial titanium pressure hull sphere with flange notches and a directional acoustic bathymetric transducer beam sending out a 45-degree sound pulse.

## Key Sections & Mechanics

1. **Fixed Telemetry Header HUD:** Brand mark lockup, live depth and bar pressure readout pills, coordinate status, navigation anchors, and "Commission Payload" CTA.
2. **Hero Section:**
   - Coordinates: `11°22.4' N · 142°35.5' E · MARIANA TRENCH`.
   - Monumental display headline: `Engineered for the 11,000-metre breach.`
   - Key specifications strip: 11,000 M depth certified, 1,114 BAR load, Ti-6Al-4V Gr.5 hull, 72h endurance.
3. **The Hadal Descent Stage (Signature Mechanic):**
   - Pinned 320vh stage (0 to 10,928 m) with dual-column telemetry and right-hand bathymetric rail.
   - Dual-unit pressure gauge: Bar and Megapascals computed from real seawater compressibility physics.
   - Preset buttons to jump immediately to 0m (Surface), 1,000m (Twilight), 4,000m (Midnight), 6,000m (Abyssal), 10,928m (Challenger Deep).
   - Dynamic water-column absorption backdrop transitioning to trench obsidian.
   - Interactive `<input type="range">` scrubber with accessible labels and keyboard stepping.
4. **Procedural Sonar Radar:**
   - Real-time HTML5 Canvas polar sweep radar with concentric range circles (2km, 5km, 10km) and rotating sector beam.
   - At Hadal depths (>6,000m), trench wall reflections and acoustic benthic targets blip on the radar.
   - Interactive "Transmit Ping" button that pulses a radial cyan acoustic shockwave.
5. **Vehicle Architecture:**
   - Exploded vector blueprint schematic highlighting the Titanium Pressure Sphere, Syntactic Foam Buoyancy Core, Magnetic Thruster Pods, and Dielectric Lithium-Sulfur Battery Tray.
   - Interactive sub-assembly selector with detailed material properties.
6. **Sensor Suite:**
   - 3D perspective cards with hover tilt and pointer spotlights featuring Synthetic Aperture Sonar, Ultra-Deep CTD Probe, Laser Raman Spectrometer, and Isobaric Benthic Corer.
7. **Field Operations Dossiers:**
   - Operational mission logs from the Challenger Deep (10,928m), Puerto Rico Trench (8,376m), and Kermadec Trench (10,047m).
8. **Charter & Payload Intake Form:**
   - Client-side validated form (principal investigator name, institutional email, agency, target trench, payload mass kg, requirements) with zero network calls and accessible status feedback.
9. **Colophon & Hydrographic Registry Footer:**
   - Brest and Monterey foundry coordinates, IMO Subsea Category H-11 certification, and smooth "Return to Surface" scroll action.

## Quality Bar & Fallbacks

- Only `transform`, `opacity`, and `clip-path` animate.
- Zero layout shift (CLS = 0). Root `overflow-x: clip`.
- Under `prefers-reduced-motion: reduce`: No sticky pinning; the descent stage renders in ordinary vertical flow with fully functional range controls; canvas radar is static; all telemetry is visible immediately.
- Folder isolation: Zero external project imports outside `src/app/(bathys)/`.
- Comprehensive unit tests covering physics equations, depth state store, form validation, and motion mathematics.
