# Prompt: rebuild "VOLUME ZERO" (acoustic architecture chamber)

Build a premium landing page in **Next.js 16.4 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Three.js** for a fictional Rotterdam acoustic-architecture studio called **VOLUME ZERO**. The studio maps rooms for museums, theatres and serious listening spaces so sound arrives whole.

The page's central metaphor is an acoustic journey: **sound travels through space, so the page becomes a live chamber.** Scrolling moves the camera from source to listener; a real range input moves the listener position; surface controls rebuild the reflected ray field.

## Brand

Use exactly these three colours. Derive tints only with `color-mix()`:

- graphite `#171B20`: page ground, display type and dark panels
- vellum `#F1EEE5`: page field, primary copy and light controls
- signal teal `#2B9BAA`: ray lattice, live state, focus ring and primary action

Typography uses `next/font/google` with distinct variables:

- **Oxanium** 500/600/700 (`--font-oxanium`) for display, wordmark and room numbers
- **Manrope** 400/500/600/700 (`--font-manrope`) for body copy and UI
- **Azeret Mono** 400/500 (`--font-azeret-mono`, `preload: false`) for telemetry and labels

Keep corners at 4px. The logo is a hexagonal room plan with three reflection paths and a teal listener point. The slogan is **“Tune the silence between sounds.”**

## Sections

1. Fixed reactive header with progress rail and mobile menu.
2. Hero: “Rooms that let sound arrive whole.” with a contour field, room stamp and two CTAs.
3. Pinned Chamber: source, listener, reflection rays and live telemetry.
4. Surface Library: wool felt, oak slat and honed stone cards.
5. Rooms in Practice: three case rows (`VZ-01`, `VZ-04`, `VZ-07`) with seats and RT60 values.
6. Response Curve: SVG decay plot with calibrated readout.
7. Commission a Room: local validation form with loading and success state.
8. Footer field archive.

## Chamber mechanic

Create `chamber/geometry.ts` pure functions and tests:

- `cameraAt(progress)` returns a smoothstep depth and yaw from `-0.18` to `0.18`.
- `listenerAt(progress, offset)` returns a bounded `{x,y,z}` point.
- `reflectionPoints(listener, surface)` returns 3, 5 or 7 stable points for felt, slat and stone.
- `progressFromOffsets` maps the chamber's real section offsets to 0–1.

`ChamberCanvas.tsx` is a client leaf. It tries `WebGPURenderer` from `three/webgpu` and a small TSL `MeshBasicNodeMaterial` pulse, then falls back to `WebGLRenderer`. Start the heavy canvas on idle for fine pointers and on tap for touch. It must never mount under `prefers-reduced-motion: reduce`. Always render the SVG chamber diagram and telemetry copy so no-JS, reduced-motion and no-WebGPU paths are complete.

## Motion identity

Technical/cinematic; use **scan** and **focus-pull** as the two verbs. Tokens:

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-spring: linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1);
--dur-fast: 180ms;
--dur-base: 420ms;
--dur-slow: 800ms;
--dur-hero: 1200ms;
--stagger: 70ms;
```

Choreograph the hero load: vellum field settles, mark/nav scan in, split headline rises, CTAs and room readout arrive, then the chamber pulse begins. Use at least four reveal types: mask-rise text, clip-path or scale media reveal, drawn SVG rules, and staggered card cascades. Add a pinned scroll scene, a root progress rail, header compact/hide behavior, focus rings, button fill wipes, press scale, card lift/tilt and form success transition. The signature moment is halfway through the chamber, when walls clip away into one ray lattice before rebuilding around the selected surface.

Only transform, opacity, clip-path and SVG stroke offsets may animate. Under reduced motion, show all content, stop ambient loops and use the static SVG chamber. On touch, hover effects have an in-view or press equivalent.

## Structure and testing

Keep all code isolated inside `src/app/(volume-zero)/`. Include `brand/`, `content/`, `chamber/`, `motion/`, `sections/`, `forms/`, `assets.tsx`, `assets.generated.ts`, `icon.svg` and `opengraph-image.tsx`. No image or video files are required; leave the labelled placeholder helper in place.

Add unit tests for motion maths, chamber geometry, room content and commission validation. Add `tests/e2e/volume-zero.spec.ts` covering the route, the listener range, surface selection, form validation/success, anchor navigation, mobile menu, reduced motion and overflow. Register the palette and template at all six gallery registration points.
