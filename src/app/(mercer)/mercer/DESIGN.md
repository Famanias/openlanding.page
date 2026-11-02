# Jules Mercer

## Requirements and scope

Implement the supplied hero specification as an isolated `/mercer` Next.js route. The reference pack in `D:/downloads/imggg` is the visual authority. This is a procedural interpretation: no external 3D files, texture projections, downloaded art, or generated bitmap stand-ins. The deliverable is the hero, its HUD and working portfolio controls; gallery publication and a full portfolio are outside this plan.

## Concept and quality contract

Code becomes a spatial material, so a continuous (2,3) ribbon responds to the visitor's pointer. Critical features: a readable central aperture, three interwoven lobes, cyan/lime triangulated filaments, a translucent inner membrane, and a sparse undulating particle envelope. Front, side and radial references guide topology; the supplied hero guides composition. The initial view stays near frontal and preserves the aperture. Pointer orbit is bounded. The knot must remain undistorted on narrow and wide viewports.

## Palette and type

Blueprint slate `#0A0D10`; off-white `#E8ECEF`; electric cyan `#00E5FF`; secondary blue `#1E88E5`; chartreuse `#CCFF00` and `#D2FF00`. Geist is the display and body face, Geist Mono is reserved for terminal and telemetry. The supplied oversized three-line headline and all-caps copy override generic landing-page defaults.

## Layout and signature details

A compact full-width header, left-aligned headline and CTAs, a large right-hand 3D stage, and three project previews across the bottom. Blueprint coordinate rules, edge rulers, crosshairs, telemetry and an acrylic code terminal recur throughout. At mobile widths the copy precedes the stage and the project strip scrolls horizontally. Native dialogs provide project, about and experiment details; the contact link uses email.

The terminal is a full-card button with a lime “OPEN NOTES” cue, a small hover lift and a visible keyboard focus ring. It opens the shared native dialog as an experiment study: a wide two-column composition with an enlarged procedural knot, measured labels, a short description and a readable applet sketch. The dialog inherits Geist, Geist Mono, slate, cyan and lime. Mobile stacks the study and code, with a sticky close control and scrolling inside the panel. Escape, backdrop, close and return actions restore focus to the terminal. The hero renderer pauses while the notes are open.

## Procedural model

The centerline uses `r = R(1 + .18 cos(3t))`, `x = r cos(2t)`, `y = r sin(2t)`, `z = -.8 sin(3t)`. The shallow radial modulation preserves a rounded aperture while depth retains the three crossings. Closed transported frames extrude an elliptical ribbon with welded shading seams. A 200 × 24 membrane and a coarser barycentric triangle lattice share that centerline. Shader derivatives give antialiased glowing edges; no reliance on unsupported WebGL line widths. The 1,200-point budget is split between a deterministic 1,080-point undulating shell and 120 luminous lattice junctions. Geometry budgets are enforced before allocation.

## Motion

Personality: technical and restrained. Verbs: reveal, orbit. One signature moment: cyan and lime filaments weave through one another as the knot settles toward the pointer. Shared ease `cubic-bezier(.22,1,.36,1)`; fast 300 ms, base 500 ms, entrance 800 ms. Animation changes transforms and opacity. Delta-time damping keeps pointer behavior consistent across frame rates.

| Element | Entrance | Pointer / focus | State / exit |
| --- | --- | --- | --- |
| Header | Short downward settle | Underline and visible focus ring | Mobile menu uses native details |
| Headline | Three staggered masked lines | Static readable text | Always visible without JavaScript |
| CTAs | Short staggered rise | Arrow translation and physical press | Open accessible native dialogs |
| Knot | Opacity settle | Damped bounded parallax | Pause offscreen, hidden tab and modal; dispose on unmount |
| HUD | Staggered telemetry reveal | Terminal lifts; terminal and playback buttons have visible focus | Terminal opens experiment notes; native dialog suspends rendering and restores focus |
| Projects | Quiet upward settle | Preview scale and arrow translation | Project dialog, Escape to close, restore focus |

Reduced motion uses a static procedural SVG instead of mounting WebGL. The same fallback remains visible before hydration, when JavaScript is disabled and when a context cannot be created. Touch scrolling remains native. A user can pause animation independently.

Additive double-sided surfaces render in a single pass. Device pixel ratio is capped at 1.5. After two consecutive seconds below 55 FPS, raster resolution steps down by 15%, to a minimum 75% scale; it remains stable for the session rather than oscillating. Geometry, camera fit, pointer bounds and the measured FPS readout are unchanged by this adjustment.

## Files and verification

`model/` holds pure geometry and tests. `scene/` owns shaders, GPU resources and lifecycle tests. `components/` owns the UI and SSR tests. `MercerApp.tsx` composes the experience. The route group's root layout owns fonts and scoped CSS. Browser tests verify shader compilation, resize, touch layout, context loss/restore, pointer bounds, dialogs and static fallbacks.
