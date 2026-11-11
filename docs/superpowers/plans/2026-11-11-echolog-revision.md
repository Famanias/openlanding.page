# ECHOLOG Revision Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task in this existing isolated worktree. Do not create another worktree. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Replace the supplied ECHOLOG page's phone artwork with one validated procedural handset and its two static sound fields with live 2D graphics.

**Architecture:** Build the reusable handset and its review viewer first, then the shared Canvas 2D field and a revised standalone HTML copy. Keep data/spec separate from runtime objects, give views explicit cleanup and retain the original until the reviewed copy is ready. Official Next.js gallery registration is a subsequent integration task.

**Tech Stack:** TypeScript, plain Three.js, Canvas 2D, existing GSAP where needed, esbuild for standalone bundling, Node test runner and Playwright for review capture.

**Spec:** `docs/superpowers/specs/2026-11-11-echolog-revision-design.md`

## Global Constraints

- Preserve `D:/downloads/helpx/ECHOLOG_threejs_standalone.html`; revised output goes to `.openlanding-page/echolog/ECHOLOG_revised.html`.
- Frame 1.870 × 3.880 × 0.220, corner radius 0.260; bezel/glass 1.810 × 3.820, radius 0.230; display 1.714 × 3.724, radius 0.182.
- Relative dimensions are design targets; hidden rear details remain inferred.
- Retain ECHOLOG's existing visual identity, section structure and working controls.
- No whole-phone photo projected onto the display, no external model or HDR downloads, no background microphone permission requests.
- Strict img2threejs validation and pass gates precede factory generation and acceptance. Never bypass failed gates.
- Budget at most 24,000 triangles and 45 draw calls per handset; 2D field DPR cap 1.5.
- Stop animation offscreen, in hidden tabs and under reduced motion. Still fallbacks use the new model's own posters.
- Do not commit, deploy or register the gallery template during the standalone model review phase.

## Review Focus

1. Front layers remain concentric and clipped at corner close-up and oblique angles; geometry tests and capture in Task 1.
2. The lower connector is a real opening and controls have attached roots; sectioned geometry evidence in Task 1 and attachment/turntable checks in Task 2.
3. A second view survives another view's disposal; lifecycle test and viewer remount check in Task 2.
4. Rapid mode switches and zero-sized/resized canvases remain deterministic and finite; parameter and lifecycle tests in Task 3.
5. The 390 px hero and reversed scroll never leave visible CTA copy over the raised phone; placement assertions and captures in Task 4.

## Task 1: Complete material evidence and the rounded model spec

**Files:** `.openlanding-page/echolog/assessment.json`, `phone-sculpt-spec.json`, `references/materials/`, `model/rounded-profile.ts`, `model/rounded-profile.test.ts`, generated `model/createEchologPhoneModel.ts`.

**Interfaces:** `roundedProfile(width: number, height: number, radius: number): THREE.Shape`; `createEchologPhoneModel()` returns a named hierarchy and part manifest. The skill's actual emission API governs the generated factory signature; record it before Task 2 consumes it.

- [x] Run the skill's `forge/next.py` against `.openlanding-page/echolog/.img2threejs/state.json`; follow its exact next step.
- [x] Inspect material crops before extraction. Run material scalar/finish analysis and evidence extraction with a 0.7 confidence threshold. Record source limitations for uniform and self-lit materials using the skill's documented applicability route. Do not invent material maps or fill missing evidence with arbitrary noise.
- [x] Replace draft custom profile and bottom-opening descriptions with factory-supported descriptors. Ensure no duplicate opaque root solid is emitted.
- [x] Run normal and strict `validate_sculpt_spec.py`; save both reports. No factory generation until strict validation passes.
- [x] Before hand-coded profile implementation, add geometry tests that assert each outline's corner center is `[0.675, 1.680]`, the active display never exceeds the glass, and the body depth remains 0.220 independently of corner radius. Run and observe failure before implementation.
- [x] Implement profile geometry only in the currently unlocked pass; preserve valid refinements in the spec. Use the skill's blockout → structure → form sequence, with screenshot/gate/review evidence for each pass before continuing.
- [x] Test finite vertex/normal/UV buffers, correct winding, seam closure and actual connector/speaker openings from sectioned views. Then run `npx tsx --test .openlanding-page/echolog/model/rounded-profile.test.ts`.

## Task 2: Materials, screen states and model review viewer

**Files:** `.openlanding-page/echolog/model/screen.ts`, `model/resources.ts`, `model/resources.test.ts`, `viewer/index.html`, `viewer/main.ts`, `shots/`, `model/parts.json`.

**Interfaces:** `drawScreen(context, state: 'record' | 'library' | 'playback', progress: number): void`; `sharedResource(create, destroy)` supplies reference-counted resources; `instantiatePhone()` returns `{ root, setScreen, refreshScreen, dispose }`; `mountPhones(document)` manages the bounded visible pool and returns `{ render, activeCount, dispose }`.

- [x] Add the resource lifecycle test first: acquire two views, release one, verify resources remain usable until the second release, then verify one final disposal. Observe failure, implement and rerun.
- [x] Build corrected screen layouts from the spec; confirm loaded fonts before texture generation. Mark updates dirty only on changes and maintain consistent safe areas and color space.
- [x] Finish materials and procedural studio reflections through the unlocked material/surface/lighting passes. Read the skill's complete gates and correction contracts before reviewing.
- [x] Build a review viewer with front, oblique, rear, side and bottom views, plus record/library/playback, neutral/grazing/reference lighting and reversible explosion. Keep inspection controls out of the eventual marketing page.
- [x] Capture the required turntable and compare valid reference views. Run deterministic render, multi-angle, self-intersection, attachment and part-coverage gates before AI visual review. Record unseen rear geometry as inference, never reference fidelity.
- [x] Record the actual triangle/draw-call count and screenshot comparisons. Typecheck the isolated model with a scratch tsconfig using the repo's installed TypeScript/Three.js types. Model acceptance requires all applicable gates, not just a successful build.

## Task 3: Live 2D fields

**Files:** `.openlanding-page/echolog/field/parameters.ts`, `field/parameters.test.ts`, `field/draw.ts`, `field/controller.ts`, `viewer/field.html`.

**Interfaces:** `fieldParameters(mode: 'hero' | 'rain' | 'city' | 'morning')`; `blendParameters(from, to, progress)`; `mountSoundField(canvas, { mode, reducedMotion })` returns `{ setMode, resize, dispose }`.

- [x] Add tests for deterministic output, bounded amplitude, finite results at width/height zero, immediate reduced-motion changes and interrupted 600 ms mode interpolation. Observe failure before implementation.
- [x] Implement seeded noise, waveform bundles, elliptical instrument marks, cached glow sprites and particles; use a DPR cap of 1.5 and bounded mobile sampling.
- [x] Drive all mode parameters from one state transition; pause when offscreen/hidden. ResizeObserver updates must not allocate when the size is unchanged. Dispose observers, listeners, cached resources and pending rAF.
- [x] Review hero and three study modes at 1440 × 900 and 390 × 844. Capture successive frames to prove the artwork itself moves and a reduced-motion frame to prove a complete still alternative.
- [x] Run `npx tsx --test .openlanding-page/echolog/field/parameters.test.ts` and record results.

## Task 4: Revised standalone integration

**Files:** `.openlanding-page/echolog/ECHOLOG_revised.html`, `integration/hero-progress.ts`, `integration/hero-progress.test.ts`, `integration/main.ts`, `scratch/build-standalone.mjs`, `shots/`.

**Interfaces:** `heroPose(progress: number)` returns copy opacity/offset and phone phase, following the spec's 0.15/0.42/0.82 timing. `integration/main.ts` automatically installs the field and phone view managers; `window.__ECHOLOG.dispose()` releases them.

- [x] Add progress tests first: copy visible at 0, copy zero at 0.42, phone rise zero before 0.42, rise complete at 0.82; reverse traversal returns identical results. Observe failure, implement and rerun.
- [x] Copy the original and replace all six baked phone placements with the shared model manager. Consolidate the superseded hero/image CSS overrides rather than appending another conflicting layer.
- [x] Replace hero and soundscape background plates with the live field, connect Rain/City/Morning to field state and remove the disconnected ribbon. Retain readable HTML content and accessible buttons.
- [x] Bundle a review HTML with embedded runtime. Generate fallback posters from the completed phone and remove obsolete baked-phone data URLs; no-JS, blocked-WebGL and reduced-motion cases use those new posters.
- [x] Verify all six placements, journey transitions, library filters, existing recorder behavior, keyboard focus, viewport resize, rapid mode switching and lifecycle cleanup using Playwright. Use a localhost preview for recorder checks; do not rely on file-origin permission behavior.
- [x] Capture top/mid/end hero, each phone placement and all study modes. At 390 px confirm `scrollWidth <= innerWidth` and no visible copy/phone intersection. Verify no continuous render loop in hidden/offscreen/reduced-motion states.
- [x] Save the before/after evidence and exact check results. Deliver the revised standalone for review before implementing the separate official-gallery registration/export task.

## Verification status at plan creation (historical)

Reference extraction and admission passed. The authored design JSON passes structural validation with outstanding strict look-development requirements. No model, live background, revised HTML, runtime test or visual acceptance result exists yet. This plan does not imply those stages are complete.

## Execution result

Standalone delivery complete. See `.openlanding-page/echolog/README.md`, `scratch/progress.md` and `shots/verification.json`. Typecheck, six logic tests, three adapter tests, twelve browser checks and three reviewer regression checks pass. Model uses 11,180 triangles and 18 draw calls. Original HTML preserved. Gallery registration remains outside this review-copy delivery.
