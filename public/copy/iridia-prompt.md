# Prompt: rebuild "IRIDIA" (3D Prismatic Landing Page with Live Moving Gradients)

Paste everything below the line into your AI coding agent.

---

Build a landing page in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4 + WebGL2** for a fictional kinetic light studio and optical architecture foundry called **IRIDIA** (tagline *"Spatial chromatology & kinetic gradient physics"*, motto *"Light held in tension."*). The studio engineers large-scale borosilicate crystal pavilions and kinetic digital light installations across Zurich, Kyoto, and Basel.

**The page must not contain a generic 3D model widget. The landing page itself is a 3D prismatic space.** The entire interface exists within a 3D coordinate system with dynamic depth, camera pitch and yaw, parallax strata, and volumetric interactive gradient fields inspired by fluid optical physics (similar to gradients.sh but built as an original WebGL2 procedural engine).

## Brand Rules

- **Eight colours only:**
  - obsidian `#0A0B10` (ground / ink)
  - prism `#F5F3EF` (paper / primary text)
  - hyperion `#00F0FF` (the primary radiant accent: laser cyan, 480nm)
  - chroma `#FF3366` (secondary accent: spectral magenta, 650nm)
  - starlight `#FFE600` (tertiary accent: sodium amber, 589nm)
  - glass `#141724` (smoked crystal plaque / HUD surface)
  - specular `#8D93A8` (muted steel hairline, coordinates, telemetry)
  - flare `#FF4D00` (high thermal / error / warning)

  All intermediate tints are made with `color-mix()` of these eight hexes. Headings are never italic.
- **Type (via `next/font/google`):**
  - **Space Grotesk** 500/700 for display and headings.
  - **Plus Jakarta Sans** 400/500/600 for body text.
  - **JetBrains Mono** 400/500 for technical coordinates, wavelengths, readouts and code.
- **Mark & Logo:** An equilateral crystal prism viewed at an angle with internal total reflection lines and a 480nm hyperion refraction spark at the apex.

## Architecture: Dual-Renderer Spatial 3D

1. **DOM in CSS 3D:**
   - Perspective container (`perspective: 1200px`) holding the sections as faceted 3D planes at calibrated Z-depths and subtle rotation angles.
   - Mouse movement imparts subtle inertial pitch and yaw to the entire 3D stage.
2. **WebGL2 Live Gradient Canvas:**
   - Fixed background shader calculating Navier-Stokes curl noise fluid advection, Cauchy chromatic dispersion ($n(\lambda) = A + B/\lambda^2$), mouse velocity ripples, and film grain dither.
   - Supports 5 spectral presets: Solar Flare, Deep Borealis, Liquid Mercury, Neochrome Velvet, Supernova.
   - Pauses or settles under `prefers-reduced-motion` with an accessible static fallback.

## Key Sections & Mechanics

1. **Spatial Navigation Bar:** Fixed frosted glass pill with brand mark, coordinates (`47.3769° N · 8.5417° E`), live wavelength ticker, section anchors, and "Synthesize" CTA.
2. **The Prism Pavilion (Hero):**
   - Eyebrow: `OPTICAL FOUNDRY · ZURICH & KYOTO · ARCHITECTURAL SCALE`
   - Monumental h1: `The spatial architecture of kinetic light.`
   - Lead copy, primary "Synthesize Waveform" button and "Explore Chambers" button.
   - Live telemetry bar: Refraction $n_D = 1.618$, Dispersion $V_d = 64.2$, Flux $1,240\text{ lm/m}^2$.
3. **The Spectral Chambers (Zones):**
   - Four distinct architectural zones: Phase 01 Refraction, Phase 02 Dispersion, Phase 03 Interference, Phase 04 Luminescence.
   - Each with optical diagrams, nanometer specifications, and live gradient portal windows.
4. **Exploded 3D Optics Dissection:**
   - Interactive 3D layer separation: Substrate ($+120\text{px}$), Nematic Lattice ($+40\text{px}$), Diffraction Grating ($-40\text{px}$), Quantum Dot Film ($-120\text{px}$).
5. **The Spectral Synthesizer (Signature Mechanic):**
   - Live interactive gradient workbench with sliders for Dispersion, Turbulence, Fluid Speed, and Chromatic Spread.
   - Preset buttons, live SVG spectral distribution curve, and instant CSS/GLSL code generator with copy button.
6. **Architectural Installations:**
   - Basel Spiral Refractor (12m dichroic glass fins), Kyoto Spectral Solarium (reflecting pool + micro-lenses), Reykjavik Chromatic Monolith (subarctic geodesic dome).
7. **Commission Intake Form:**
   - Client-side validated consultation request (name, email, installation scale, architectural space, target wavelength) with accessible error feedback and instant success confirmation without network calls.
8. **Colophon Footer:** Technical coordinates, copyright, legal disclaimer, and legal entity registry.

## Quality Bar

- Only `transform` and `opacity` animate.
- Zero layout shift (CLS = 0). Root `overflow-x: clip`.
- Under `prefers-reduced-motion`: 3D canvas is static or bypassed; DOM transforms are planar; full content is immediately visible.
- Folder isolation: zero external project imports outside `src/app/(iridia)/`.
- Comprehensive unit tests covering optical physics maths, preset calculations, state store, and form validation.
