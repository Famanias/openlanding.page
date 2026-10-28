# AMAOTO

## Concept and brand

A hand-made wagasa leads a continuous journey through six procedural places: a paper-lit threshold, bamboo workshop, the interior of washi, a dusk street, a workbench and a genkan. The same articulated umbrella stays on one fixed WebGL stage. It unfolds through scroll progress, can be examined at the workshop, weathers a gust, reassembles at the bench and closes beside the commission form.

The atelier is fictional: AMAOTO (雨音, “the sound of rain”), Kurokawa, Nagano. Retain sumi `#1A1613`, washi `#F4ECDD`, sakura `#F2B8C6`, deep sakura `#D9748F`, vermilion `#C8412B`, bamboo gold `#B8923A` and indigo `#2B3A55`. New atmosphere colours are linear-space blends or shades of these hues. Shippori Mincho, Zen Kaku Gothic New and DM Mono retain the original type identity and swap/fallback behavior. Headlines, part descriptions, making steps, colourways and commission facts are preserved.

## Model and material ownership

`model/rig.ts` remains the pure mechanism: 40 bowed ribs, fixed-length stretchers, shared runner, paper/rim points and flexible outer-rib opening wave. The factory keeps persistent instanced members, the folded 40-gore skin, turned cap/collar/grip, tip ties and diamond lacing. `lathe.ts` and the material painter remain the model's sources. It is a procedural interpretation of the supplied reference photographs, not photogrammetry or a calibrated likeness claim.

The existing painter retains its floral/wave/plain motifs, fibre maps, 900ms dye spread and bounded inspection cutaway. `scene/canopyEffects.ts` chains its shader hook with world thickness/transmission, warm lantern transmission and rib shading, oil sheen, rain beading, slight gust flex and coverage during the intentional macro passage. This remains a shader approximation of thin-paper optics, not volumetric refraction. The complete umbrella does not fade between worlds. Only the outer paper surface recedes locally while the camera enters its fibre field.

## Story and camera

| Chapter | Stable fragment | Start / rest / end | Place |
| --- | --- | --- | --- |
| 01 Threshold | `#top` | 0 / 0 / .14 | Pale shoji room; opening over 0–.10 |
| 02 Structure | `#structure` | .14 / .18 / .33 | Warm workshop, bamboo stock, lathe and dust shafts |
| 03 Paper | `#light` | .33 / .45 / .58 | Layered kozo fibres and a reversible travelling oil front |
| 04 Weather | `#canopy` | .58 / .66, .72 / .78 | Lantern street, wet cobbles and rain; .72 is the gust rest |
| 05 Craft | `#making` | .78 / .86 / .93 | Bench with loose parts, brush, paper roll, oil and thread |
| 06 Commission | `#commission` | .93 / 1 / 1 | Lantern-lit entry hall, tatami step and umbrella stand |

The seven rests are `[0, .18, .45, .66, .72, .86, 1]`. One progress value supplies `ChapterProgressState`, camera keyframes, world weights, opening, oil soaking, assembly, atmosphere and overlay masks. World visibility windows overlap and normalize; fog always shares the blended background colour. Nominal chapter ranges tile the track, while neighbouring worlds dissolve through the seam.

World anchors hold through the rests and travel only through seams. The paper field attaches to a sampled gore patch and follows the umbrella root. Camera position/target use guarded Catmull-Rom, with eased segment timing and interpolated fov/focus distance. Dedicated outside/inside waypoints pass between ribs; floor and overshoot guards remain active. Hardware cameras damp with `1-exp(-11*dt)`; software uses the sampled pose directly.

`ScrollDirector.tsx` bridges pure state into the existing mutable director. `scene/scroll.ts` owns one GSAP master timeline and its ScrollTrigger over an approximately 800-viewport-height scroll interval. Lenis is used only for fine pointers and is advanced by the renderer's RAF. Touch uses native document scrolling. Idle snapping waits 900ms and respects active touches, tools, programmatic navigation and focused controls. Previous/next visit all seven rests; six jump buttons and keys 1–6 use chapter primary rests. Inputs, buttons and editable content retain their own key behavior.

## Full world, reserved object space

The canvas fills the viewport so architecture and atmosphere are never cropped into a product-viewer rectangle. `staging.ts` retains the previous continuous handoff helpers and supplies virtual object slots for the cinematic route. Camera view offsets place the umbrella inside those slots while rendering the world across the full canvas. Whole-object fitting corrects both desired and damped cameras. It covers the full opening envelope and the assembled/separated union during Craft; intentional Paper and selected Anatomy close-ups are exempt.

Copy clears during the narrow composition transfer at a seam. It returns in a reserved column at every rest. On phones the object occupies an upper composition band and copy uses the space beneath it; tablets retain larger virtual stages. Commission reserves additional DOM space for its form. Long copy, forms and tool sheets use native scrolling. The old Making scroll spacer is replaced in cinematic mode by one shared story track and an explicitly engaged tool.

## Worlds and renderer

- **Threshold:** five tall shoji panels with frame geometry and fibre-textured paper, pale floor, motes, contact shadow and a faint shared umbrella reflection.
- **Workshop:** instanced leaning bamboo, a bench/lathe and hanging tools, window grid, four shader light shafts, curled shavings and dust.
- **Paper:** merged layered fibre ribbons with oil-arrival attributes, translucent amber wet fronts, backlit response and sway. A four-octave fbm thickness field and soft foreground sprites add depth.
- **Street:** twelve ribbed paper lanterns on posts, building/eave silhouettes, procedurally textured wet cobbles, glow reflections, distant bokeh and GPU-driven rain. A radial gust shears streaks, sways lanterns and flexes the canopy; pointer proximity brightens the weather.
- **Bench:** a timber work surface with loose bamboo, turned parts, paper roll, brush, thread coil and oil pot. Parts lift along the assembly progress; the main rig separates/rebuilds. The camera dollies across the bench and the accent follows the active work. Oil and thread have restrained shader motion.
- **Genkan:** stone approach, raised tatami floor, sliding paper door, hanging lantern and a hollow umbrella stand. The closed umbrella leans into the stand with a faint floor reflection.

World builders own geometry/material disposal and consume a typed frame. Hidden worlds skip updates. Shared procedural textures have one owner and are built once: washi colour/bump/transmission, bamboo colour/bump, wood, tatami, thread, lacquer roughness, motes, rain streak and cobble maps. Colour textures use sRGB; bump/thickness/data maps use no colour-space transform. Layout generators use seeded Mulberry32.

Hardware uses ACES/sRGB, PCF shadows, a PMREM room and FogExp2. The pass chain is RenderPass → high-threshold UnrealBloomPass → cinematic ShaderPass → OutputPass. The cinematic pass supplies peripheral blur, inspection dimming, paper-aware vignette, grain and highlight roll-off. Its focus follows the virtual object slot.

Renderer-string detection selects the software tier for SwiftShader, llvmpipe, softpipe, Software and Basic Render. It omits composer/shadows, uses DPR .85, applies camera poses immediately and caps rendering near one frame per 110ms. Settled scenes skip unchanged frames. Hardware DPR is capped at 2. Context loss returns to the static reading page. Resize updates renderer/composer and virtual projection. Resources, listeners, clocks, scroll controller and audio are disposed on unmount.

## Initial resource budgets

| System | Hardware | Software |
| --- | ---: | ---: |
| Street rain | 6,000 | 1,200 |
| Paper strands | 1,500, merged | 300, merged |
| Workshop shavings | 320 | 64 |
| Workshop bamboo | 64 | 16 |
| Street lanterns | 12 | 12 |
| Street ripple quads | 48 | 12 |
| Rib-tip drips | 40 | 12 sampled tips |
| Threshold / workshop / bench motes | 180 each | 36 each |
| Street / genkan motes | 120 / 150 | 24 / 20 |
| Paper foreground sprites | 36 | 12 |

Counts are construction budgets, not performance scores. Rain, motes, shavings and drip fall run in shaders; the drip-tip source buffer changes with the umbrella pose. The original rig still owns its geometry/matrix updates. New render helpers reuse scratch vectors; preserving the original mechanism was prioritized over rewriting its pure point functions to make a blanket zero-allocation claim.

## Tools and audio

Anatomy retains all six part views and actions: one/all ribs, linkage cycle, projected-axis runner drag, tie tracing, outside/underneath paper and grip turning. The existing reducer owns part/action state. A separate pure inspection machine owns engagement, camera-relative quaternion trackball, exponential release inertia and slerp return. Keyboard turns are discrete. Pins are culled by surface facing and the frustum; on touch the part index appears in a bottom sheet. Pin/runner projection uses the final camera.

Explicit tool engagement pauses document scrolling. Return to story and Escape release it and restore focus. Chapter/sub-rest changes cancel ownership cleanly. Touch scrolling outside a tool remains native; only an explicitly engaged object turn consumes its touch drag. Making's strip and fine scrub map to the same story progress, with no separate assembly timer. Light's dusk/day controls change sun, sky, exposure, lanterns, transmission, DOM theme and sound filtering. Overlay contrast also follows the user's daylight setting.

Sound is off initially even when a preference was saved. A button gesture creates `Soundscape`: filtered room drones, workshop air/ticks, muffled paper texture, rain and sparse droplets. World weights crossfade layers; the gust triggers a short descending sine pair. Master gain ramps, the context suspends when hidden and all sources/timers close on disposal. No audio files or downloaded 3D models are used.

## Static reading and verification

The semantic story is present before enhancement, including the poster, all part descriptions, ten making steps, colourways and the original local commission form. Reduced motion mounts no WebGL scene; unavailable/lost WebGL also restores the complete static layout. The header light control changes both static section backgrounds and their text theme; colourways/form retain DOM behavior. Paper-lit cinematic copy uses a paper scrim so Day-mode architecture cannot reduce contrast. Inactive cinematic panels are inert and absent from assistive navigation; chapter announcements use a polite live region.

Pure tests cover progress envelopes, camera keys/continuity, atmosphere, time of day, seeded layouts, inspection math, inverse Making progress and virtual/full-viewport framing. Browser tests cover rest hooks, controls, tool locks and exit, keyboard navigation, snapping, gusts, full-object framing, software GL, context loss, reduced motion and no-JavaScript reading. Visual gates inspect rest compositions and seams in both directions. No Lighthouse, speed or responsive audits are part of this revision.
