# DESIGN.md — IRIDIA

<!-- Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 -->

## Requirements

- **Brand:** IRIDIA (Kinetic Gradient Studio & Prismatic Pavilion)
- **Positioning:** Spatial chromatology and kinetic gradient physics for monumental architectural installations.
- **Tagline:** *Light held in tension.*
- **Slogan:** *The chromatic physics of real space.*
- **Target Audience:** Curators, architects, design directors, and creative technologists commissioning spatial light installations and kinetic digital pavilions.
- **Core Experience:** The landing page is not a flat canvas with a 3D model widget — **the landing page itself is a 3D prismatic space**. Scrolling and scrubbing the spatial orbit dial drives a continuous 3D camera trajectory through faceted architectural glass planes, with an interactive WebGL2 live Navier-Stokes fluid gradient engine, real-time Cauchy chromatic dispersion, and an interactive Spectral Synthesizer workbench.

---

## Concept

**The metaphor: A Monumental Prismatic Pavilion & Optical Foundry.**  
Just as a heavy crystal prism splits monochromatic ambient light into its constituent wavelengths through physical dispersion, the IRIDIA interface unfolds along a spatial 3D coordinate system where every surface, card, and backdrop refracts live, moving fluid gradients.

**Central Idea → Signature Mechanic:**  
*Light is bent through crystal facets, so the page is an orbital 3D chromatic pavilion whose live shader gradients react to scroll depth, pointer turbulence, and user-tuned optical dispersion.*

---

## Palette

Locked eight-colour system registered in `scripts/templates.config.ts`:

| Token | Hex | Role | Contrast vs Obsidian | Contrast vs Prism |
|---|---|---|---|---|
| `--color-obsidian` | `#0A0B10` | Ink / Deep Space Ground | — | 16.8:1 (AAA) |
| `--color-prism` | `#F5F3EF` | Paper / Primary Typography | 16.8:1 (AAA) | — |
| `--color-hyperion` | `#00F0FF` | Primary Accent / Laser Cyan (480nm) | 11.2:1 (AAA) | 1.5:1 (UI only) |
| `--color-chroma` | `#FF3366` | Rare Secondary / Spectral Magenta (650nm) | 5.8:1 (AA) | 2.9:1 (Large/graphic) |
| `--color-starlight` | `#FFE600` | Rare Tertiary / Sodium Amber (589nm) | 12.9:1 (AAA) | 1.3:1 (Dark only) |
| `--color-glass` | `#141724` | Smoked Crystal Plaque / HUD Surface | 1.4:1 | 12.0:1 (AAA) |
| `--color-specular` | `#8D93A8` | Hairlines, Grid, Coordinates, Eyebrows | 5.2:1 (AA) | 3.2:1 |
| `--color-flare` | `#FF4D00` | Thermal Warning / Validation Error | 4.8:1 (AA) | 3.5:1 |

> [!NOTE]
> All intermediate shades and alpha surfaces are composed using CSS `color-mix()` of these eight tokens. Spectral wavelength presets (internal shader content) are isolated in `src/app/(iridia)/iridia/spectrum/presets.ts` and exempt in `scripts/templates.config.ts`.

---

## Typography

Three Google Fonts loaded via `next/font/google` in `layout.tsx` with distinct variable names:

1. **Display:** `Space_Grotesk` (weights 500, 700)
   - Variable: `--font-space-grotesk`
   - Role: Hero headlines, chamber numerals, architectural markers, section titles.
   - Character: Optical geometric grotesque with crisp technical angles. **Never italic.**
2. **Body:** `Plus_Jakarta_Sans` (weights 400, 500, 600)
   - Variable: `--font-plus-jakarta`
   - Role: Longform narrative, technical specs, form inputs, button text.
   - Character: Geometric yet highly legible contemporary grotesque.
3. **Mono / Utility:** `JetBrains_Mono` (weights 400, 500, `preload: false`)
   - Variable: `--font-jetbrains-mono`
   - Role: Coordinates, nanometer labels, telemetry HUD, mathematical parameters, code snippets.
   - Character: Crisp monospace with clean punctuation.

---

## Layout & Spatial 3D Architecture

The page employs a **dual-renderer coordinate architecture**:

1. **DOM in CSS 3D (`SpatialViewport`):**
   - Perspective container: `perspective: 1200px; perspective-origin: 50% 50%`.
   - The stage sits at `transform-style: preserve-3d`.
   - Sections exist at calibrated spatial offsets:
     - Section 01 (Hero): $Z = 0\text{px}$, Pitch $= 0^\circ$
     - Section 02 (Chambers): $Z = -200\text{px}$, Yaw $= -4^\circ$
     - Section 03 (3D Dissection): Exploded layers separating from $Z = -120\text{px}$ to $+120\text{px}$
     - Section 04 (Synthesizer): $Z = 0\text{px}$, HUD depth
     - Section 05 (Installations): Alternating spatial planes $Z = \pm 60\text{px}$
     - Section 06 (Intake): Grounded at $Z = 0\text{px}$
   - Pointer movement imparts subtle inertial pitch ($\pm 3^\circ$) and yaw ($\pm 4.5^\circ$) for rich physical parallax.

2. **Full-Viewport WebGL2 Live Gradient Canvas:**
   - Positioned fixed behind the 3D DOM stage.
   - Vertex shader passes clip-space coordinates with perspective warp.
   - Fragment shader calculates:
     - **Navier-Stokes Curl Noise Advection:** Simulates turbulent viscous fluid light flowing continuously like `gradients.sh`.
     - **Cauchy Chromatic Dispersion:** Simulates wavelength divergence ($n(\lambda) = A + B/\lambda^2$), bending red and blue light at differing angles.
     - **Interactive Pointer Injection:** Mouse drags introduce velocity vectors and ripple waves that wash across the gradient field.
     - **Film Grain & Dither:** Subtle high-frequency SVG/shader micro-dither eliminating color banding.
   - Dynamic resolution scaling (0.75× on high-DPI / mobile) maintaining 60fps.

---

## The Signature Mechanic: Spectral Synthesizer

An interactive live gradient lab allowing visitors to compose custom chromatic waves:
- **Parameters:**
  - Dispersion ($n_D$, 1.30 to 1.85) — controls RGB chromatic separation.
  - Turbulence / Frequency (0.2 to 3.0) — controls curl noise vortices.
  - Flow Velocity (0.1 to 2.5) — controls fluid advection speed.
  - Chromatic Spread (0.0 to 1.0) — controls spectral fringe width.
- **5 Curated Presets:**
  - *Solar Flare:* Amber (589nm) / Crimson (650nm) / Laser Cyan (480nm).
  - *Deep Borealis:* Viridian (530nm) / Arctic Cyan / Midnight Cobalt.
  - *Liquid Mercury:* Iridescent Platinum / Pearl Violet / Smoky Quartz.
  - *Neochrome Velvet:* Vivid Magenta / Chromatic Indigo / Twilight Peach.
  - *Supernova:* Hyper-dense Plasma / Electric Azure / Solar White.
- **Telemetry Readout:**
  - Real-time Abbe Number $V_d$, Refractive Index $n$, Dominant Wavelength $\lambda$, and Energy Flux.
- **Instant Code Generation:**
  - Dynamically builds standard CSS mesh gradient and WebGL uniform declaration, copyable to clipboard with one click.

---

## Motion & Accessibility Guardrails

1. **Transform and Opacity Only:** UI transitions use CSS transitions keyed on state, with `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`.
2. **`prefers-reduced-motion`:**
   - WebGL2 canvas pauses or renders a serene static color field.
   - CSS 3D transforms flatten to standard 2D layout (`transform: none`).
   - All interactive controls (tabs, sliders, form) remain fully functional without animations.
3. **WCAG AA:**
   - All text achieves $\ge 4.5:1$ contrast against dark glass or obsidian ground.
   - Visible focus rings: 2px solid `#00F0FF` with 2px offset.
   - Semantic headings (one `h1`, proper nesting), accessible form labels and error descriptions.
4. **Mobile (320px–414px):**
   - Root `overflow-x: clip` prevents horizontal spill.
   - Grid tracks use `minmax(0, 1fr)`.
   - Sliders and buttons meet $\ge 44\text{px}$ touch target standards.

---

## Do / Don't

- **DO** use physical optical terminology: nanometers, refractive index, Cauchy dispersion, Fraunhofer diffraction, Abbe number.
- **DO** keep headings roman (`font-style: normal`) with optical tracking.
- **DO** use `color-mix()` for glass plaques and hairline borders.
- **DON'T** use generic purple-to-pink linear gradient backgrounds.
- **DON'T** use `background-clip: text` gradient headlines.
- **DON'T** invent fake statistics or fabricated SaaS testimonials.
- **DON'T** create fake browser chrome or mock device frames.
