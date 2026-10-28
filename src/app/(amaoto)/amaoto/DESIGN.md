# AMAOTO

## Concept

A wagasa leads the visitor from a closed first frame through six making decisions, then settles beside a commission form. The page makes space for the umbrella in every chapter. Copy, palette and type retain the atelier’s original identity.

## Brand

AMAOTO (雨音, “the sound of rain”) is a fictional atelier in Kurokawa, Nagano. Sumi `#1A1613`, washi `#F4ECDD`, sakura `#F2B8C6`, deep sakura `#D9748F`, vermilion `#C8412B`, gold `#B8923A`, indigo `#2B3A55`. Tints derive from these colours. Shippori Mincho, Zen Kaku Gothic New and DM Mono use Next font fallback metrics and explicit swap behaviour.

## Model and material

`model/rig.ts` owns the hub, 40 ribs, fixed-length linkage, runner travel and paper control points. The shared collar uses an analytic linkage solution. During the introductory wave only the flexible rib length beyond its stretcher hinge bends with a delay; this preserves the rigid mechanism. Ribs have eight segments, node bands and tip lashings. Paper is a 40-gore deforming skin with a folded closed silhouette and an attached segmented rim. Diamond lacing and woven collar threads follow the mechanism. Cap, runner and beaded handle use turned profiles.

Repeated parts use persistent instanced geometry; pose updates mutate matrices and vertex buffers. No geometry is recreated during opening. Paper has per-gore painted branches and blossoms, independent fibre bump/roughness textures, front/back lighting response and a 900 ms radial dye shader. Superseded textures and all renderer resources are disposed. The shader simulates thin-paper light response; it is not volumetric transmission. The model is a procedural interpretation of the supplied photos, without calibrated camera matching or a claimed photogrammetric likeness score.

## Choreography

One GSAP ScrollTrigger director reads chapter anchors into a mutable ref. Fine-pointer devices use Lenis; touch retains native scrolling. Hero: closed frame, 650 ms pause after fonts settle, 2.4 s wave bloom. Scrolling interrupts the intro and hands off quickly. Anatomy: assembled left stage with a six-part object inspector, compact part index and stable detail panel. Choosing a part frames its live rig anchor; optional paper cutaway reveals hidden structure. Hover previews do not move the camera. Light: overhead underside stage, real directional sun and backlight. Canopy: right stage, dye configurator on the left, inertial turning. Making: a native sticky scene holds the complete umbrella and all ten listed moments in the viewport while document scroll advances part highlights and disassembly/reassembly. Only after step 10 does the frame release into Commission. Upward scrolling reverses the same sequence. Reduced motion and cramped viewports use the readable unpinned layout. Commission: folded umbrella resting beside the right-hand form, reflected below a puddle plane. Camera and pose interpolate through chapter handoffs.

The mobile composition uses the same model in a shared fixed band that stays at the top through each chapter, visually behaving as one continuous sticky stage. Text starts beneath it and scrolls under its soft lower mask. The model is fully opaque. The canvas remains labelled and touch scrolling stays native.

## Motion and interaction

Verbs: drift and unfurl. Tokens `--am-ease-out`, `--am-ease-in-out` and `--am-dur-1..4` govern the system. Headings unfold from line masks; body text sharpens; numbers roll; list rules draw; swatch rings settle; buttons have magnetic interiors and press ripples; form labels float and the success hanko stamps. The header responds to scroll direction and the stitched progress thread knots each chapter.

Anatomy supports free inspection of ribs, stretchers, runner, lacing, paper and grip through a compact index, projected markers or mesh raycasts. Each part has a distinct camera and action: one/all rib emphasis, one-shot linkage movement, projected-axis runner dragging, connected tie tracing, outside/underneath paper views, and grip-focused whole-object turning. Overview/Escape clears temporary inspection; chapter exit cancels actions and restores the page director. Hover and selection are separate. A partial paper cutaway exposes internals without fading the whole model. The runner has a keyboard/touch range equivalent; its drag cannot add orbit spin. Reduced-motion demonstrations become immediate user-triggered states. Sun angle moves the directional light and changes paper backlight. Rain controls instanced streaks, tip drips, puddle rings and the SVG rain veil. Colourway carries into the local demonstration form.

Rain sound is off by default. A labelled header button starts synthesised filtered noise and sparse drips after a user gesture. Gain follows scene intensity. Preference storage never bypasses the gesture requirement. Audio suspends when the document hides and all nodes close on unmount. Form validation is local; there is no submission endpoint.

## Backgrounds

Code-created SVG layers only: low-contrast washi fibres; distant Nagano ridges, mist and sun; anatomy drafting/asanoha; indigo moon and ink clouds; sakura petals and dye; bamboo grove; dusk and puddle rings. Scene weights follow the same chapter director. No generated or downloaded raster media.

## Accessibility and verification

Server markup is visible before effects initialise. The poster SVG remains available without WebGL or JavaScript; headings, navigation and form fields remain readable. Reduced motion uses a still open pose per chapter, instant dyes, no spin, wave, parallax, animated rain or cursor. Audio remains separately usable. Keyboard access includes part buttons, runner and sun ranges, colourway arrows/Home/End, sound and form. Field errors have descriptive associations.

Unit tests cover linkage length, runner bounds/monotonicity, skin clearance, closed proportions, attachment and wave endpoints. E2E covers both viewport classes across all chapters, stage/content separation, intro, controls and no-JS. Verification uses defined visual states, not Lighthouse or speed benchmarks.

## Files

- `model/`: pure rig, turned profiles, procedural materials, persistent model factory and tests.
- `scene/`: mutable page director, pure `anatomy.ts` reducer/view configuration, projected `AnatomyControls.tsx`, GSAP/Lenis lifecycle, shell and the only renderer client leaf (`WagasaCanvas.tsx`).
- `bg/`: reserved stage anchors, SVG poster and layered scene backgrounds.
- `motion/`: scoped GSAP reveals, pointer feedback and cleanup.
- `audio/`: gesture-created Web Audio synthesis and visible toggle.
- `sections/`, `forms/`, `ui/`, `brand/`, `data/`: chapter markup, local validation and controls.

No source imports another template. No new runtime dependencies, deployment or commit are required.

Anatomy verification covers all six framed views at desktop/mobile sizes, model-changing controls, reset, interruption, chapter handoff, and runner-drag/orbit separation. Source tests also cover projected-axis mapping, stale action completion and reduced-motion equivalents.

Hero, Colourways and Making framing use the complete unfurl envelope and the actual model transform to fit both horizontal and vertical camera frusta. It pulls back only when the current canvas aspect ratio needs more room, including first paint, pointer tilt, colourway rotation and resize; Making includes the union of assembled and separated geometry so its scroll sequence keeps every part in frame; the authored bearing and safe wide compositions are preserved.

`scene/makingSequence.ts` defines the ten reversible scroll beats, the hold distance and the release phase. `ScrollDirector.tsx` measures the inner held frame separately from the outer scroll spacer, preserves the active beat through resize, and honours initial Commission fragments after pin spacing is established. The pinned list and model band fit the viewport without intercepting wheel, touch or keyboard scrolling.


## Responsive staging

Phones through 600px retain the opaque top model band. Portrait tablets from 601–900px use a 50svh stage (42svh for Anatomy with its index; 34svh during pinned Making), wider reading measures, paired colourway choices, side-by-side sun/rain controls, an Anatomy detail/control grid and a two-column commission layout. Compact laptops from 901–1180px retain the side composition with tighter gutters and a comfortable copy measure. Desktop Light now reserves the left stage and places its unchanged copy/controls on the right; its overhead camera pose remains unchanged.

`scene/staging.ts` owns breakpoint selection, stacked-band dimensions and handoff safety. Handoffs fade out in the outgoing reserved slot, change slots while invisible, then fade into the incoming one. They never interpolate a canvas across the copy column. Visible desktop copy/control bounds constrain stage opacity, including the outgoing Anatomy index. Matching slots remain continuous. These choices are scroll-scrubbed and deterministic in reverse. Reduced motion uses the current target slot immediately, without travel or fading.

The stacked layouts align the opaque band's lower fade to the measured stage and reserve text space below it; captions, chapter headings and controls begin in the reading area. The full-object camera fitting remains active in every chapter except intentional selected-part close-ups. No model geometry, copy, part actions or chapter pose keyframes change in this staging pass.
