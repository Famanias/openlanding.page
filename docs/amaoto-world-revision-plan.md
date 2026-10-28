# Amaoto world revision — implementation plan

Status: approved by the user's instruction to proceed with implementation. The implementation is complete; final verification is recorded in `amaoto-world-execution.md`. The sections below preserve the approved planning baseline and decisions.

## Current structure

The six existing sections are `top → structure → light → canopy → making → commission`: Hero, Anatomy, Light, Colourways, Making and Commission. `ScrollDirector.tsx` measures their DOM positions, uses one ScrollTrigger and optional fine-pointer Lenis, and writes a mutable `DirectorState`. That state contains global/local progress, the chapter, model pose/opening/separation, camera/target, rain and a reserved stage rectangle. Making adds a native sticky hold and ten reversible steps.

`WagasaCanvas.tsx` owns one transparent renderer, camera, light rig, PMREM room, umbrella, simple rain and reflection. The canvas moves/resizes between layout slots through the new continuous `staging.ts` paths. Background worlds are currently SVG/CSS. The renderer also owns inspection, raycasting, camera fitting, projected pins and the animation loop. Anatomy has an existing tested reducer and six part actions. Audio is an opt-in rain synth.

The articulated model, its material painter, six Anatomy part definitions, ten Making steps, four colourways and local commission form are the preserved foundation. The current uncommitted seamless-handoff work remains in place; the pushed checkpoint is `ba46004`.

## 1. Final chapter mapping

Keep all six existing fragment IDs. The new names describe the journey; the established headlines and paragraphs remain the content.

| # / title | Existing ID | Start / rest / end | World and existing headline | Tool / controls |
| --- | --- | --- | --- | --- |
| 01 Threshold | `top` | 0 / 0 / .14 | Shoji threshold; “The sound of rain, kept dry.” | Opening unfolds over progress 0–.10 |
| 02 Structure | `structure` | .14 / .18 / .33 | Bamboo workshop; “Forty ribs, one breath.” | Anatomy: “Inspect the structure” |
| 03 Paper | `light` | .33 / .45 / .58 | Macro paper interior; “Paper that listens to light.” | Oil-soak story; no locking tool |
| 04 Weather | `canopy` | .58 / .66 and .72 / .78 | Dusk street; “Choose your canopy.” | Light: “Explore light”; rain, colourways; gust at .72 |
| 05 Craft | `making` | .78 / .86 / .93 | Workbench; “Eighty-one quiet steps.” | Making: “Follow the making”; ten buttons and scrubber |
| 06 Commission | `commission` | .93 / 1 / 1 | Genkan; “Made for the weather ahead.” | Existing form and selected colourway |

Export exactly `[0, .18, .45, .66, .72, .86, 1]` as the sorted rest list. Chapter jump buttons use the primary rests; previous/next also visit Weather’s street rest. Each record includes every requested data field, with `copy` and `specimenNote` drawn from the existing sections, `COPY`, `PARTS` and captions. No new factual atelier claims are needed.

Resolve the brief’s naming ambiguity by following its six-world table: Paper occupies the old Light section; the Light tool belongs to Weather alongside the existing colourways. The header light control remains available throughout the journey.

## 2. One progress source, one renderer

- Extend `director.ts` into the runtime bridge for `ChapterProgressState`, tool ownership and the existing compatibility fields. Put the new pure narrative calculations in `logic/`; do not maintain a second chapter table in `FRAMES`.
- Refactor `ScrollDirector.tsx` into the lifecycle wrapper around `scene/scroll.ts`. Replace the enhanced page’s section-height timing and separate Making spacer with one approximately 800vh track. The existing semantic sections remain the static reading layout.
- Keep the canvas fixed and full-viewport so environments fill the screen. Retain `staging.ts` as the source of virtual umbrella slots, safe copy columns and handoff geometry. Adapt camera projection/composition to those slots, instead of physically cropping the environment into the current moving canvas rectangle. This is an explicit renderer milestone check before building worlds.
- `WagasaCanvas` remains the sole RAF owner. Its loop advances Lenis, consumes cached narrative/atmosphere state, updates visible worlds and renders. Remove the competing GSAP-ticker Lenis clock. React receives discrete changes or throttled snapshots, not a state update per particle/frame.
- Preserve `fitUmbrellaCamera` as a correction to the desired and damped camera for whole-object views. Exempt the intentional paper passage and selected Anatomy close-ups. Project pins and hit tests against the final full-viewport camera; use the virtual slot for the part index and copy clearance.

World visibility uses overlapping, normalized windows around the nominal chapter boundaries, so the sum never becomes zero. Copy can briefly clear during a seam, but the world background cannot disappear. Fog colour and scene background share the same blended value.

## 3. Camera route

Use one continuous umbrella/root path between these initial world anchors, in local metres: threshold `(0,0,0)`, workshop `(14,0,-10)`, street `(30,0,-22)`, bench `(44,0,-30)`, genkan `(58,0,-40)`. The paper interior is attached to a canopy patch at the workshop anchor. These coordinates are authored starting values; composition is tuned at the renderer/world gates.

The following are camera offsets from the interpolated umbrella anchor, before whole-object fitting. Targets are local to that anchor. Position/target use guarded Catmull-Rom with smoothstep segment timing; fov/focus use the same eased parameter.

| Progress | Position offset | Target offset | Fov | Focus distance | Composition |
| --- | --- | --- | ---: | ---: | --- |
| 0 | `(4,2.2,10)` | `(0,.25,0)` | 34 | 11 | Closed umbrella and shoji backlight |
| .10 | `(3.5,3,9.5)` | `(0,.3,0)` | 34 | 10.5 | Full opening, moving toward workshop |
| .18 | `(4,1.8,8.5)` | `(0,.4,0)` | 38 | 9.5 | Workshop three-quarter overview |
| .31 | `(2.8,2.2,8)` | `(0,1,0)` | 38 | 8.5 | Safe full-object approach to paper |
| .36 / .40 | `P + .65N` / `P - .2N` | `P - .85N` | 42 / 46 | 1.5 / .65 | Dedicated canopy passage |
| .45 | `P - .5N + .2T` | `P - 1.1N` | 46 | .65 | Oil front and fibre depth |
| .54 / .57 | `P - .2N` / `P + .65N` | `P - .85N` | 46 / 40 | .65 / 1.5 | Pull back through soaked paper |
| .66 | `(4,.1,10.5)` | `(0,.2,0)` | 40 | 11.2 | Calm dusk, low lantern silhouette |
| .72 | `(6,.4,13)` | `(0,.2,0)` | 44 | 14.3 | Wider street and visible gust ground |
| .86 | `(4.5,7,7)` | `(0,-.3,0)` | 36 | 11 | Overhead three-quarter workbench |
| 1 | `(4,2,10)` | `(0,-.3,0)` | 34 | 11 | Quiet leaning umbrella beside form |

For the paper passage, `P = paperPoint(1, 4, .68, .5)`, `N` is the sampled outward surface normal and `T` is a unit tangent across the gore. Transform this patch frame with the umbrella root; the fibre field travels with it. The waypoint pair passes between ribs. The outer paper coverage recedes before the camera reaches it and returns on exit. This is a localized paper-surface transition; the whole umbrella never fades between chapters.

Clamp spline overshoot per segment, guard above-ground camera height against the existing ground at y=-2.5, and use a smaller near plane for the macro passage. Damp the final hardware camera with `1-exp(-11*dt)`; software GL applies the sampled pose immediately. Pin/runner projection and fitting tests must use the resulting projection, not an outdated slot-sized camera.

## 4. Atmosphere and procedural systems

Initial targets below are calibrated at the default light value .75, then modulated by `computeTimeOfDay` and rain. All RGB values derive from the existing paper, ink, gold, sakura, indigo and vermilion tokens; interpolate lighting colours in linear space. Numerical targets remain tuneable at visual gates.

| World | Background/fog family | Fog density | Exposure | Environment | Key / accent intensity | Bloom |
| --- | --- | ---: | ---: | ---: | --- | ---: |
| Threshold | Paper with a small indigo tint | .012 | 1.08 | .45 | 3.0 / 0 | 0 |
| Workshop | Ink/gold wood, warm paper window | .030 | .94 | .25 | 2.8 / 1.8 | .12 |
| Paper | Backlit paper/gold | .055–.12 | 1.02 | .20 | 3.2 / .2 | .08 |
| Street | Indigo/ink, gold lantern warmth | .055 | .86 | .16 | .55 / 3.0 | .55 |
| Bench | Paper/ink neutral warmth | .018 | 1.00 | .32 | 2.5 / 2.0 | .08 |
| Genkan | Quiet ink/gold | .025 | .88 | .18 | .8 / 1.5 | 0 |

Hardware stack: RenderPass → high-threshold UnrealBloomPass → cinematic ShaderPass → OutputPass for final colour conversion. The cinematic pass supplies the requested peripheral blur, inspection dimming, paper-aware vignette, grain and highlight control. Software GL omits post-processing and shadows, uses pixel ratio .85 and renders changed states at the requested approximately 110ms cadence. Hardware DPR caps at 2. Context loss or initialization failure restores the complete static reading page.

Build the specified texture set once, with seeded canvas drawing and correct colour/data colour spaces. Preserve the existing floral/wave dye painter. New world textures serve architecture and props; a `canopyEffects.ts` adapter chains the existing material hook to add thickness-driven transmission, oil state, beading, a small gust flex and paper-dive coverage. Keep the existing dye, inspection cutaway and material disposal ownership working.

| System | Hardware target | Software target |
| --- | ---: | ---: |
| Rain streaks | 6,000 | 1,200 |
| Layered paper fibres | 1,500 | 300 |
| Workshop shavings | 320 | 64 |
| Motes per active world | 180 | 36 |
| Bamboo stock | 64 | 16 |
| Street lanterns | 12 | 12, simpler shading |
| Ripple quads | 48 | 12 |
| Rib-tip drips | 40 | 12 sampled tips |

Use separate GLSL systems for light shafts, fibre wet-front/transmission, paper thickness, rain/gust shear, ripple rings, lantern glow and oil shimmer. Rain, shavings, motes and drip fall are shader-driven; update tip source data only when the umbrella pose changes. World builders own resources and expose typed `update`/`dispose` methods, with no chapter decisions inside them. Shared resources have one owner. Invisible worlds stop updating.

## 5. Tools, navigation and fallback

- Keep `anatomy.ts` as the part/action reducer. `logic/inspect.ts` adds only engagement/return lifecycle, quaternion trackball, inertia and pin-facing math; it does not duplicate the existing part state. Runner dragging retains its separate projected-axis behavior.
- Explicit tool entry holds the stage and pauses document scrolling. Close and Escape restore scrolling and focus. A chapter/sub-rest change exits cleanly. On touch, the ordinary page still uses native scrolling; an explicitly opened tool uses a native-scrolling bottom sheet and a temporary document lock, with no global wheel/swipe interception.
- The header time-of-day slider and Dusk/Day buttons update one value, default .75, shared by lights, transmission, lanterns, CSS theme and audio. Entering Weather’s Light tool locks that scene; merely using the global header control does not silently open a tool.
- Making fine scrub maps into progress `.80–.91` within Craft. Tool-driven progress updates are allowed while user scrolling is paused, so camera, assembly, accent, UI and audio consume the same progress rather than an independent timer. On exit, document scroll is synchronized to that progress. Extend the existing step mapping; remove the extra enhanced-mode sticky distance rather than running two Making controllers.
- Snap after 900ms idle only when no touch/pointer interaction, tool, focused form control or programmatic movement is active. Use all seven rest points. Directional stepping must return to the adjacent rest from between-rest positions; test `.49 → previous .45` and `.63 → next .66`, plus boundaries and exact rests.
- Keep six fragment aliases and expose `__amaotoScrollTo(p)` for deterministic tests. Own and clean up only Amaoto’s ScrollTriggers/listeners. Keyboard arrows/Space/1–6 do not consume events from inputs, textareas, selects, buttons or editable content; inspect rotation gets a focusable stage and explicit instructions.
- Reuse one semantic content tree, including one commission form. Only enhance it into fixed chapter overlays after the first successful frame. Inactive enhanced panels are inert and hidden from assistive navigation. Long tools/forms use native DOM scrolling. Before initialization, without JavaScript/WebGL, after context loss, or with reduced motion, the same content remains in normal reading order with poster/SVG imagery and usable DOM controls.
- Extend the opt-in `SoundToggle` and replace the rain-only implementation with the requested synthesized room/workshop/paper/rain layers and gust chime. Audio starts only from a user gesture, suspends while hidden and closes on disposal.

## 6. File map and reconciliations

New pure files: `logic/{rng,chapters,timeOfDay,atmosphere,generators,inspect}.ts` with adjacent tests. New scene files: `renderer.ts`, `textures.ts`, `rain.ts`, `canopyEffects.ts`, `scroll.ts`, `inspectController.ts`, shared world types/resources, and the six `scene/worlds/` builders. New audio: `soundscape.ts`. Add compact chapter navigation, light controls and tool-shell components under `ui/` as needed.

Extend existing `director.ts`, `ScrollDirector.tsx`, `WagasaCanvas.tsx`, `AmaotoShell.tsx`, `staging.ts`, `framing.ts`, `AnatomyControls.tsx` and `makingSequence.ts`. Adapt existing sections/CSS and `Motion.tsx` so chapter line reveals use master progress rather than independent one-shot ScrollTriggers. Keep `SectionBackdrop` and the poster for fallback. Update DESIGN/PROMPT and regenerate `public/copy/amaoto.md` at completion.

Resolve these internal brief conflicts explicitly:

1. **Opening:** follow §7.1’s progress-driven unfurl over 0–.10, replacing the current timed 650ms/2.4s intro. The first rendered frame reveals the closed umbrella; scrolling unfolds it reversibly.
2. **Reversibility:** narrative composition, worlds, oil soaking, opening and assembly are pure functions of progress. Ambient drift, user-driven dye/actions, inspection inertia and a triggered gust retain the explicitly requested elapsed-time behavior; they never advance narrative progress.
3. **Visibility:** chapter ranges tile the story; expanded world-blend windows overlap and normalize. Do not use six fade-to-zero windows that leave black gaps at boundaries. Threshold is the intentional `start === rest` exception to the proposed strict inequality test.
4. **Fallback:** follow §9.4’s complete static page for reduced motion, rather than retaining the current reduced-motion WebGL inspector. Software GL gets the lighter 3D path; failure gets the static page.
5. **Model preservation:** add world effects through an adapter and keep the articulated geometry and current material painter. Reuse scratch data in the new render layer; do not rewrite the existing rig to satisfy a blanket zero-allocation claim.

## 7. Milestones and acceptance gates

1. Approve this plan. Then implement and test the pure logic, including 2,000 progress samples, rest-point camera equality, finite/continuous atmosphere, deterministic generators and inspect transitions.
2. Extract renderer/clock and prove full-viewport environment plus virtual umbrella framing, hardware composer, software mode, resize and context-loss fallback against the existing model.
3. Build the texture set, then worlds in the requested order: workshop → street/rain → paper dive → workbench → threshold → genkan. At each world gate, manually inspect its rest frame and both adjacent seams in both directions.
4. Integrate gust, transmission, tool ownership/trackball and Making fine scrub. Then connect the master track, snapping, navigation and overlay. Finish soundscape and fallback/accessibility.
5. Update all existing Amaoto e2e files to the new behavioral contracts without dropping rig, control, framing or fallback coverage. Add rest-hook, snapping, scroll-lock/Escape, keyboard, light/CSS, gust and software/context-loss cases. Legacy tests that require WebGL in reduced motion or the superseded Making spacer must assert the new contract instead.

After each implementation milestone, run Amaoto Vitest suites, `tsc --noEmit` and the production build; run relevant e2e at integration gates and all Amaoto specs at completion. Also run targeted ESLint and palette/isolation/media guards. The installed Three.js addons supply the post stack; no additional runtime package is planned. Use local binaries or the existing parent binaries on Windows. The prior full-site build had a memory failure, so a successful build is a real gate to verify, not a result assumed from type checking.

Verification is functional and visual: composed rest frames, paired dusk/day transmission views, slow forward/reverse seam scrubbing, tools and static reading. Per the brief, no Lighthouse, speed or responsive audits. Report exact commands, actual resource counts, inspected states and any failure or omission. No runtime tests or build were run during this planning-only stage.
