# AMAOTO — implementation and reconstruction brief

The current implementation contract is the copyable [template brief](../src/app/%28amaoto%29/amaoto/PROMPT.md). The full critique and accepted six-phase scope are in [the execution plan](amaoto-critique-and-plan.md). Preserve the seven-colour palette, Japanese typography, copy and isolated route.

## Reference evidence

Use the existing files under `assets/incoming/amaoto/ref/`:

- `wagasa-open-3q.png`: shallow dome, golden bowed ribs and the relation between canopy and shaft.
- `wagasa-underside.png`: repeated gores, floral branch band, stretchers, diamond thread lattice and tip lashings.
- `wagasa-closed-side.png`: narrow tapered pleated bundle and beaded handle.
- `wagasa-handle-detail.png`: turned runner, grain, collar weave and shaft nodes.

The browser model is a procedural interpretation. Rear surfaces, exact hinge manufacturing, optical translucency and photo-matched camera calibration remain inferred. Do not claim formal image-scoring gates have passed merely because an implementation renders.

## Foundation

`model/rig.ts` shares one hub height across every moving part. Solve runner travel from fixed stretcher length and rib hinge angle. Keep the rigid inner link connected during the hero wave by flexing only the rib length beyond the stretcher attachment. Sample bowed ribs in eight segments, bind paper gores and rim to their endpoints, and mutate persistent instance matrices and vertex buffers. Closed, quarter, half, full and separated views must be inspectable. Use lathe profiles for wood turning, separate fibre maps and a front/back shader for paper; no expensive transmission pass or per-frame geometry replacement.

## Story and controls

One scroll director owns the camera, rig, stage rectangle, highlight and rain. Each chapter measures a reserved stage anchor. Hero loads closed then unfurls after the first painted frame and font readiness; scrolling interrupts it gracefully. Anatomy shifts left into a free six-part inspector, with a compact selector below the model and a stable detail area beside it. Use assembled operation, per-part framing/actions, projected markers and optional bounded paper cutaway. Reset/Escape, interrupted actions and chapter handoff must be explicit. Light raises the canopy overhead. Canopy puts the configurator on the left. Making holds its complete scene while native scrolling advances all ten listed steps and the matching part highlights/separation. Release into Commission only after step 10, reverse the sequence on upward scroll, and keep reduced-motion/short-screen/no-JavaScript layouts readable. Commission closes and rests it beside the form. Mobile keeps a fully visible model band above text.

The sun slider moves a directional light, paper backlight and shadows. Rain drives streaks, tip drips, rings, SVG rain and optional synthesised audio. Part rows and model raycasts highlight each other and draw leaders; click focuses the camera. Model runner dragging has a range-input alternative. Colourway changes use a radial dye shader from the input point. Fine-pointer dragging has delta-time inertia and damped parallax without capturing on hover.

## Painted world and motion

Create only code-made backgrounds: washi fibres, layered ridges/mist/sun, drafting/asanoha, moon and ink cloud night, sakura/dye, bamboo grove, dusk/puddle. Cross-fade through chapter progress. Preserve distinct line-mask, sharpening, digit-roll, line-draw, ring, magnetic, ripple, switch, focus, validation and hanko motions; remove generic fade-up reveals.

## Lifecycle and delivery

Pause rendering and suspend sound when hidden. Audio starts only from a gesture, stays off on first load, ramps conservatively and tolerates blocked storage. Clean up every GPU/audio resource, ticker, observer and event listener. Honour reduced motion and keep no-JS content plus the poster visible. Keep all source inside the AMAOTO route and use existing Three.js, GSAP and Lenis packages. Update the design/brief, gallery preview, copy bundles, rig/e2e tests and evidence report. Do not deploy or commit. Verification uses visual states and correctness tests; no Lighthouse or speed runs.
