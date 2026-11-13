# DATUM — Spatial GPU Frame & Scene-Graph Debugger

Build an isolated Next.js 16 / React 19 / TypeScript landing page for **DATUM** at `/templates/datum` (with a permanent redirect from `/datum`). DATUM is a fictional browser-native 3D scene-graph debugger and GPU render-pass profiler engineered for WebGL2 and WebGPU graphics teams.

## Creative Direction & Media Policy
- **Swiss Drafting Instrument Aesthetic:** Precision crosshair reticles, 1px hairline drafting rules, crisp 4px-6px technical radii, and tabular millisecond readouts over an Alabaster drafting-grid canvas paired with a dark Graphite Ink architectural slab.
- **No Photographs:** Zero raster photographs (`mediaExempt: true`). Every visual is constructed from crisp inline vector schematics, custom CSS drafting surfaces, and an interactive procedural Three.js WebGL2 3D stack.
- **Folder Isolation & Prefix:** Prefix all component styles with `dt-`. Keep all template code self-contained inside `src/app/(datum)/` using only relative internal imports and npm dependencies (`three`, `lenis`).

## Palette & Typography
- **Paper (Alabaster Lab):** `#F3F4F0` — primary page canvas and hairline drafting-grid ground
- **Ceramic (Pure Ceramic):** `#FFFFFF` — stage enclosure, floating pass cards, simulator panel, form container
- **Ink (Graphite Ink):** `#111418` — primary display type, copy, hairline frames, overlapping Architecture slab, and Footer
- **Slate (Anodized Slate):** `#4A525C` — secondary copy, specification tables, metadata labels
- **Rule (Drafting Rule):** `#D3D7CF` — 1px structural rules and table seams
- **Emerald (Laser Emerald):** `#007A4D` — primary light-mode CTAs, accessible accents, focus rings
- **Phosphor (Phosphor Signal):** `#10D98E` — high-contrast signal accents, active pass telemetry on `#111418` dark surfaces, and 3D emissive edge highlights
- **Amber (Telemetry Amber):** `#B35000` — frame-budget overload indicator when estimated GPU time exceeds the refresh target
- **Typography (`next/font/google`):**
  - Display: `Syne` (`600`, `700`, `800`, `--font-syne`) for geometric architectural headlines sized with `clamp()`
  - Body: `Instrument Sans` (`400`, `500`, `600`, `--font-instrument-sans`) for crisp technical exposition and UI controls
  - Mono: `Space Mono` (`400`, `700`, `--font-space-mono`) with `tabular-nums` for millisecond telemetry, pass IDs, draw-call counts, and GLSL shader snippets

## Page Architecture
1. **Fixed Instrument Header (`#dt-header`):** Hairline glass bar with the DATUM stacked-slab vector mark, sliding spring-animated active section pill (`Dissection`, `Budget Lab`, `Architecture`, `Access`), live GPU frame-budget badge updating dynamically from the shared state, magnetic `SDK Access` CTA, and an accessible full-screen clip-path drawer on viewports `<= 860px` (`Open menu` / `Close menu`, `Esc` and focus-trap support).
2. **Drafting-Grid Hero (`#top`):** Split composition featuring the eyebrow (`SPATIAL GPU PROFILER · WEBGL2 / WEBGPU`), word-masked `<h1>` (*"Every frame, dissected."*), concise lede, dual CTAs (`Dissect 3D Stack`, `Open Budget Lab`), and three `CountUp` telemetry stats (`5` Z-Separated Passes, `444` Draw Batches, `16.6 ms` Frame Lock Target). The right column renders a compact isometric SVG blueprint preview of the five render passes with live budget indicator and clickable pass selector pills.
3. **02 // Z-Axis Pipeline Dissection (`#dissection`, Signature Mechanic):** Tall `220svh` asymmetric split layout pairing a sticky 3D stage (`PipelineCanvas` + always-SSR `PipelineSvg` vector fallback) and 5-step vertical rail (`01 Geometry`, `02 Normals`, `03 Shadows`, `04 Bloom/FX`, `05 Composite`) with five inspectable pass cards (`#dt-pass-geometry` through `#dt-pass-composite`). Scrolling through `#dissection` drives CSS variable `--explode` and a shared ref that separates the five 3D render-pass slabs along the Z-axis in real time. Includes interactive HUD toolbar buttons (`Explode Z-Stack` / `Collapse Z-Stack`, `Wireframe`, `Pause Loop` / `Resume Loop`, `Reset View`), drag-to-orbit camera damped with `easeOutExpo`, slab raycast clicking, and keyboard navigation (`ArrowLeft`/`ArrowRight`/`ArrowUp`/`ArrowDown`, `e`, `w`, `r`, `Home`).
4. **03 // Frame Budget & Bottleneck Lab (`#budget`):** Interactive GPU simulation workbench synchronized with global pipeline state. Features individual `role="switch"` toggles for all five passes, a `Resolution scale` slider (`0.50x` to `2.00x`), target refresh buttons (`60 Hz (16.6 ms)` vs `120 Hz (8.3 ms)`), animated meter bar scaling with Emerald/Amber budget-status pill (`WITHIN ...` vs `OVER BUDGET ...`), draw-call and VRAM totals, detected bottleneck pass, and a 5-tab GLSL shader kernel disassembly inspector (`01`..`05`).
5. **04 // Architecture & SDK (`#architecture`):** Overlapping `#111418` Graphite Ink architectural slab with `Phosphor Signal` accents. Contains a dual-track engineering telemetry marquee (pausing cleanly on hover/focus-within), four capture workflow stages with hairline draw rules, three pointer-reactive `TiltCard` pillars (`Zero-Overhead Hook`, `Deterministic Snapshots`, `WebGL2 & WebGPU`) with neighbor dimming on hover, and live `CountUp` runtime metrics.
6. **05 // Early Access & Local Brief (`#access`):** Split layout pairing the live Pinned Pipeline Snapshot summary card with an accessible client-validated `AccessForm` (`WebGL2` / `WebGPU` / `Both` API selector, floating-label fields for `Engineer name`, `Work email`, `Target scene or bottleneck`, invalid shake + inline `grid-template-rows` error expansion). Submitting transitions through a loading morph to a local SVG stamp-drawn receipt (`DT-XXXXXX`) with explicit browser-local disclosure (*"it has not been sent"*) and a working `Download Brief (.txt)` generator.
7. **06 // Architectural Footer:** Dark Graphite Ink closing band with local telemetry disclaimer, section links, DATUM mark, and full-width architectural wordmark lockup.

## Motion & Technical Standards
- **Clockwork Motion Identity:** Fast `expo-out` settles (`cubic-bezier(0.16, 1, 0.3, 1)`), tight spring pills, crisp **Snap** and **Separate** verbs, and strictly GPU-composited animations (`transform`, `opacity`, `clip-path`). Zero layout-property animations (`width`, `height`, `top`, `left`).
- **Continuous Scroll Coupling:** Smooth wheel scrolling via `Lenis` on fine-pointer non-reduced viewports alongside a single passive rAF scroll engine writing `--page-progress`, `--hero-p`, and `--explode` without per-scroll React re-renders.
- **Performance & Graceful Fallback:** Always server-render the `PipelineSvg` vector stack for immediate First Contentful Paint and zero-JS completeness. Load Three.js dynamically on desktop idle (or on first pointer entry into the stage), show an explicit `Launch 3D Stack` button on coarse touch viewports (`pointer: coarse`) before initializing WebGL2, cap DPR at `1.5`, pause WebGL when offscreen or hidden, handle `webglcontextlost`/`webglcontextrestored`, and never mount WebGL when `prefers-reduced-motion: reduce` is active.
