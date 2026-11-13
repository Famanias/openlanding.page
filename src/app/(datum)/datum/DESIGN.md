# DATUM: design spec

`npm i three lenis` (both already repo dependencies). Route: `/templates/datum` (`/datum` redirects permanently). CSS prefix: `dt-`.

## Requirements

- Fictional browser-native 3D scene-graph debugger and GPU frame profiler (`DATUM`) built for graphics engineers, creative coders, and real-time WebGL/WebGPU teams.
- Swiss drafting geometry (4px–6px crisp technical radii, 1px hairline grid rules, coordinate crosshairs), zero photographs (inline SVG, CSS, and procedural Three.js 3D only).
- Strict folder isolation inside `src/app/(datum)/`, palette enforcement via `scripts/templates.config.ts`, unit tests beside logic, reduced-motion and no-JS complete static rendering, mobile touch parity at 390px and 375px.

## Concept

A real-time 3D frame is built from invisible stacked render passes, so as you scroll (or scrub), a 3D Five-Pass Render Pipeline explodes along its Z-axis into inspectable spatial slabs (`01 Geometry -> 02 Normals -> 03 Shadows -> 04 Bloom/FX -> 05 Composite`), where clicking, keying, or scrolling onto any pass isolates its shader telemetry, wireframe bounds, and GPU millisecond budget.

## Palette

| Role | Token | Hex | Usage |
|---|---|---|---|
| Paper (Alabaster Lab) | `--color-paper` | `#F3F4F0` | Primary page canvas, subtle drafting coordinate grid |
| Ceramic (Pure Ceramic) | `--color-ceramic` | `#FFFFFF` | Elevated HUD panels, stage enclosure, cards, form container |
| Ink (Graphite Ink) | `--color-ink` | `#111418` | Primary headings, copy, borders, dark Architecture slab, Footer |
| Slate (Anodized Slate) | `--color-slate` | `#4A525C` | Secondary prose, metadata labels, specification readouts |
| Rule (Drafting Rule) | `--color-rule` | `#D3D7CF` | 1px grid rules, table dividers, structural seams |
| Emerald (Laser Emerald) | `--color-emerald` | `#007A4D` | Primary action buttons, AA light-mode text accents, focus rings |
| Phosphor (Phosphor Signal) | `--color-phosphor` | `#10D98E` | Signal highlights, active pass readouts on dark `#111418` slabs, 3D wireframe glow |
| Amber (Telemetry Amber) | `--color-amber` | `#B35000` | Frame-budget overload warnings (`> 16.6 ms` or `> 8.3 ms` target) |

Tints and translucent washes are generated exclusively via `color-mix()` from these 8 tokens.

## Type

Three Google Fonts loaded via `next/font/google` in `src/app/(datum)/layout.tsx`:

- **Display:** `Syne` (`weight: ["600", "700", "800"]`, variable `--font-syne`) — crisp geometric architectural headlines sized fluidly with `clamp()`.
- **Body:** `Instrument_Sans` (`weight: ["400", "500", "600"]`, variable `--font-instrument-sans`) — legible, tight humanist sans for technical exposition and UI controls.
- **Mono:** `Space_Mono` (`weight: ["400", "700"]`, variable `--font-space-mono`, `preload: false`) — tabular millisecond telemetry, pass IDs, GLSL snippets, and coordinate stamps.

## Layout

1. **Header (`Header.tsx`):** Fixed top hairline glass bar with DATUM stacked-slab mark, sliding active indicator pill across section links (`Dissection`, `Budget Lab`, `Architecture`, `Access`), live frame readout (`11.1 ms` default), and `SDK Access` CTA. Collapses smoothly on scroll-down, expands on scroll-up, and opens a full-screen clip-path drawer on viewports `<= 860px`.
2. **Hero (`#top`):** Alabaster Lab drafting-grid canvas with 2-column split: left editorial stack (eyebrow badge, split-line display `<h1>` *"Every frame, dissected."*, concise value proposition, dual actions with magnetic CTA, and 3 live numeric telemetry counters); right isometric 5-pass optical stack (`PipelineSvg` in compact blueprint mode with crosshair reticles and instant pass preview).
3. **02 // Pipeline Dissection (`#dissection`, The Signature Moment):** Tall `220svh` asymmetric split section with a sticky 3D stage (`PipelineCanvas` + `PipelineSvg` poster fallback) on the left and 5 inspectable render-pass narrative cards on the right. Scrolling through `#dissection` drives `explodeProgress` (`0 -> 1`), physically separating the 5 Three.js render-pass slabs along the Z-axis and advancing the active pass highlight. Interactive HUD buttons inside the stage toggle `Explode Z-Stack`, `Wireframe`, `Pause Loop`, and `Reset View`, plus keyboard arrows / `E` / `W` / `R` controls.
4. **03 // Frame Budget & Bottleneck Lab (`#budget`):** Interactive GPU simulation bench where toggling any of the 5 passes (`01 Geometry`..`05 Composite`), scrubbing `Resolution Scale` (`0.50x` to `2.00x`), or switching target refresh (`60 Hz / 16.6 ms` vs `120 Hz / 8.3 ms`) recalculates draw calls, VRAM footprint, total frame time, bottleneck pass, and shader disassembly in real time.
5. **04 // Architecture & SDK (`#architecture`):** Dark Graphite Ink (`#111418`) overlapping architectural slab with `Phosphor Signal` (`#10D98E`) highlights. Features a dual-track engineering telemetry marquee, 4 workflow stages with drawn hairline rules, 3 interactive `TiltCard` engineering pillars (`Zero-Overhead Hook`, `Deterministic Snapshots`, `WebGL2 & WebGPU`), and `CountUp` telemetry metrics.
6. **05 // Early Access & Local Brief (`#access`):** Split layout pairing the live pinned pipeline configuration summary (selected pass, active passes, scale factor, computed frame time) with an accessible client-validated `AccessForm` supporting floating labels, inline error shaking/unfolding, loading state morph, and a choreographed SVG stamp-draw success receipt with downloadable `.txt` brief (explicitly stating it is prepared locally and not transmitted).
7. **06 // Footer:** Reprised Graphite Ink slab with build provenance, section navigation, DATUM logo mark, and full-width architectural display lockup.

## The mechanic

`src/app/(datum)/datum/pipeline/passes.ts` and `state.ts` serve as the deterministic single source of truth shared between the Three.js WebGL2 engine (`PipelineScene.ts`), the always-rendered SSR isometric SVG (`PipelineSvg.tsx`), the pinned dissection scroll cards (`Dissection.tsx`), and the budget lab (`BudgetLab.tsx`).

- **Passes (`RENDER_PASSES`):** 5 ordered stages (`geometry`, `normals`, `shadows`, `bloom`, `composite`), each carrying exact base GPU ms cost (`2.1`, `1.4`, `3.8`, `2.6`, `1.2`), draw calls, VRAM allocation (MB), shader entry point, and Z-index fraction.
- **Z-Axis Explosion (`computeExplosionOffsets(progress, activeIndex)`):** Pure function mapping `scrollProgress` (`0..1`) via `easeOutExpo` into per-pass `zOffset` coordinates (`[-2.4, -1.2, 0, 1.2, 2.4]` at full separation, collapsing to compact stacked planes `0.06` apart at rest) plus lateral/vertical emphasis (`+0.35` lift) on the isolated pass.
- **Budget Math (`computePassBudget(enabledIds, resolutionScale, targetFps)`):** Scales fragment-bound passes (`normals`, `shadows`, `bloom`, `composite`) quadratically/linearly with pixel load while keeping vertex-bound `geometry` scaled gently, returning total milliseconds, headroom percentage, `overBudget` flag (`Amber` alert vs `Emerald` pass), draw calls, and VRAM MB.
- **Scroll Linking:** `PipelineProvider.tsx` computes `sectionProgress(scrollY, top, height, vh)` inside a single rAF listener and writes `--explode` directly to the dissection root and a `scrollProgressRef` read by Three.js — zero React state updates on scroll.
- **Engine Lifecycle:** On desktop (`pointer: fine`), Three.js `PipelineScene` initializes dynamically via `requestIdleCallback` (or immediately on interaction with `#dissection`). On touch screens (`pointer: coarse`), it stays as the crisp `PipelineSvg` poster until the user taps **Launch 3D Stack**. Under `prefers-reduced-motion: reduce`, WebGL never mounts (`PipelineCanvas` enforces `useReducedMotion()`). DPR is capped at `1.5`, rendering pauses when offscreen (`IntersectionObserver`) or tab-hidden, and `webglcontextlost` cleanly restores the SVG fallback and recovers on `webglcontextrestored`.

## Motion

- **Personality:** **Precise / clockwork** (`expo-out`, 350–600 ms, crisp snaps, zero sloppy overshoot) — **Expressive** intensity.
- **Two verbs:** **Snap** and **Separate**.
- **Signature moment:** The Z-axis pipeline explosion in `#dissection`: five translucent render-pass planes cleanly separate along the optical axis as the visitor scrolls or toggles `Explode Stack`, snapping leader lines and frame telemetry into exact alignment.
- **Tokens (`@theme` in `datum.css`):**
  - `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`
  - `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`
  - `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`
  - `--ease-spring: linear(0, 0.35 8%, 0.82 20%, 1.04 32%, 1.01 48%, 1)`
  - `--dur-instant: 90ms`, `--dur-fast: 180ms`, `--dur-base: 400ms`, `--dur-slow: 720ms`, `--dur-hero: 1100ms`
  - `--reveal-shift: 24px`, `--stagger: 65ms`

### Motion map

| Element | Enter (load or scroll) | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
|---|---|---|---|---|---|
| Header | Drops in at 120 ms, nav links staggered 40 ms | Compresses + blurs backdrop after 80 px; active pill slides with `--ease-spring` | Link underline draws from left; CTA fill wipes & arrow slides | Mobile menu bars morph (`X`); drawer opens via circle `clip-path` from toggle | Slides upward (`translateY(-140%)`) on fast scroll-down; returns on scroll-up |
| Hero (`#top`) | CSS keyframe sequence: grid settles `0 ms`, visual `20 ms` (`dt-plate-in`), eyebrow `30 ms`, masked headline words `40 ms+`, lede `40 ms` (`dt-glide-in`), CTAs `100 ms`, stats `130 ms`, isometric SVG layers draw & stagger | Hero inner block subtly compresses (`scale(0.96)`, `opacity 0.55`) via `--hero-p`; parallax coordinate crosshair drifts ±14 px | Primary CTA magnetic pull (`Magnetic`) + directional fill wipe; pass preview rows illuminate | CTA press `scale(0.97)` in `--dur-instant` with `--ease-spring` release; clicking a hero pass jumps to `#dissection` and selects it | Dissection stage overlaps hero cleanly with crisp architectural top seam & coordinate rule |
| Pipeline Stage (`PipelineCanvas` / `PipelineSvg`) | Clip-path wipe `inset(0 0 100% 0)` -> `inset(0)` + inner scale settle | Pinned sticky stage: `--explode` drives Z-axis separation of the 5 Three.js slabs (and SVG isometric layers) across `220svh` | Fine-pointer drag-orbit rotates stack ±28° yaw / ±18° pitch; raycast highlights hovered slab border | Clicking slab or rail button snaps `activePass` with laser reticle highlight; `Explode Z-Stack` / `Wireframe` / `Pause Loop` smoothly damp camera & layer Z | Stage stays locked until final `05 Composite` card clears, then hands off to `#budget` with scale-down settle |
| Dissection Pass Cards (`#dissection`) | Staggered rise (`translateY(24px)`) + hairline top rule draw (`scaleX(0 -> 1)`) | Active step indicator tracks viewport threshold (`01..05`) in step rail | Card shifts crisp border to Emerald + subtle background tint | Selecting card pins its pass in 3D/SVG with immediate telemetry highlight | Yields to `#budget` section handoff |
| Budget Lab (`#budget`) | Panel clip-path wipe + scale settle; pass meter bars draw left-to-right | Subtle coordinate badge progression on entry | Pass toggle switches elevate hairline; slider thumb enlarges cleanly | Toggling pass smoothly updates GPU bar widths (`transform: scaleX(...)`) and swaps `Emerald` / `Amber` alert badge | Hands off into overlapping dark `#111418` Architecture slab (`border-radius: 24px 24px 0 0`) |
| Architecture Marquee (`#architecture`) | Smooth horizontal track reveal | Velocity readout subtly nudges marquee phase | Pauses cleanly on hover and `focus-within` | Focus stays visible on interactive links | Track pauses when off-screen |
| Workflow Steps & Architecture Cards (`#architecture`) | Workflow rules draw (`scaleX`); `TiltCard` pillars cascade (`scale` + `translateY(28px)`) with `--stagger` | Progressively settles into reading zone | `TiltCard` ±5° perspective tilt + pointer radial spotlight (`--mx`/`--my`); neighboring cards dim to `opacity: 0.65` | Active focus ring switches cleanly to `Phosphor Signal` (`#10D98E`) | Light `#access` section overlaps dark slab cleanly |
| Access Summary & Form (`#access`) | Summary card slides from left; form rises cleanly | Summary stays sticky beside form on desktop | Floating labels rise on focus; Emerald border draws from left (`scaleX`) | Invalid input shakes once (±6 px, 280 ms) & error unfolds via `grid-template-rows: 0fr -> 1fr`; submit morphs to spinner then draws SVG stamp check | Form fades/lifts out while dark ceramic receipt panel locks into place |
| Footer (`#dt-footer`) | Oversized wordmark mask-rise + telemetry strip fade-slide | Final scroll clamp locks `--page-progress` bar to `1.0` | Footer links draw crisp underline | Anchor links smooth-scroll via Lenis/native | Anchors bottom of page cleanly |

## Signature details

1. **Live Frame-Budget Readout (`11.1 ms / 16.6 ms`):** Header and Hero display a crisp tabular-nums budget pill that updates dynamically whenever the visitor toggles passes or scales resolution in the Budget Lab.
2. **Coordinate Crosshair & Pass Rail (`01..05`):** Drafting crosshairs frame the sticky 3D stage alongside a 5-button pass rail that snaps in sync with scroll progress and keyboard arrow navigation (`ArrowUp`/`ArrowDown` or `1`–`5`).
3. **Deterministic Brief Stamp (`DT-XXXXXX`):** Submitting the Early Access form computes a deterministic hex-safe ticket reference from the visitor's active pipeline configuration and draws a circular SVG inspection stamp.

## Do / Don't

- **Do** keep `#007A4D` (`Emerald`) and `#B35000` (`Amber`) as the sole light-mode text accents, and reserve `#10D98E` (`Phosphor`) strictly for dark `#111418` surfaces and 3D emissive/wireframe highlights.
- **Do** hide `[data-reveal]` pre-entrance states only inside `@media (prefers-reduced-motion: no-preference)` and include the `<noscript>` style override in `layout.tsx`.
- **Do** keep all scroll- and pointer-driven updates in CSS variables (`--page-progress`, `--hero-p`, `--explode`, `--rx`, `--ry`, `--mx`, `--my`) written from rAF loops — never React state.
- **Don't** animate `width`, `height`, `top`, `left`, or `box-shadow`. Use `transform`, `opacity`, and `clip-path`.
- **Don't** mount WebGL under `prefers-reduced-motion: reduce`, and always dispose Three.js geometries, materials, renderer, listeners, and observers on unmount.

## Files

- `src/app/(datum)/layout.tsx`
- `src/app/(datum)/datum/PROMPT.md`
- `src/app/(datum)/datum/page.tsx`
- `src/app/(datum)/datum/datum.css`
- `src/app/(datum)/datum/icon.svg`
- `src/app/(datum)/datum/opengraph-image.tsx`
- `src/app/(datum)/datum/assets.tsx`, `assets.generated.ts`
- `src/app/(datum)/datum/brand/Logo.tsx`
- `src/app/(datum)/datum/motion/` (`math.ts`, `math.test.ts`, `useReducedMotion.ts`, `useInView.ts`, `Reveal.tsx`, `SplitText.tsx`, `Magnetic.tsx`, `TiltCard.tsx`, `Marquee.tsx`, `CountUp.tsx`, `ScrollEngine.tsx`, `SmoothScroll.tsx`)
- `src/app/(datum)/datum/pipeline/` (`passes.ts`, `passes.test.ts`, `state.ts`, `PipelineProvider.tsx`, `PipelineSvg.tsx`, `PipelineScene.ts`, `PipelineCanvas.tsx`)
- `src/app/(datum)/datum/forms/` (`access.ts`, `access.test.ts`, `AccessForm.tsx`)
- `src/app/(datum)/datum/sections/` (`nav.ts`, `Header.tsx`, `Hero.tsx`, `Dissection.tsx`, `BudgetLab.tsx`, `Architecture.tsx`, `Access.tsx`, `Footer.tsx`)

## Imagery

Zero photographic assets: all visuals are authored via inline architectural SVG diagrams, procedural CSS drafting grids, and real-time Three.js 3D render-pipeline slabs.
