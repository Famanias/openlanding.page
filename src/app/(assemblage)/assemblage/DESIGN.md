# ASSEMBLAGE

## Requirements

Assemblage is a single action conversion page for independent brands. The action is requesting a two week material study. It is designed for an early stage creative lead or founder who has a strong instinct but needs a direction the whole team can see and use.

## Concept

An idea becomes useful when it has a surface, so the page assembles paper, acetate, ink and found marks into one working collage. The material index is the signature interaction: selecting a layer raises it in the stack and names the job it does.

## Palette and type

Paper `#F6F0E8` is the ground, ink `#1E1D1B` carries type and dark slabs, sand `#E2D8C9` is stock, vermilion `#D95F3F` is the action colour, teal `#1D6C63` is the image field, ochre `#E7C65A` is the signal, and plum `#8F4E70` is reserved for future editorial notes. Manrope is the sole primary typeface. Geist Mono is reserved for utility labels and material indexes.

## Layout

The page uses a floating pill header, a two column collage hero, an offset benefit grid, a full ink tagline reveal, a three step process, an interactive layer index, taped proof cards, a plain question list and a dark local form. The form is repeated only as the final conversion object.

## Motion

The personality is tactile and decisive. Its verbs are **pick up**, **unpack** and **assemble**. The hero is a real Three.js paper simulation: four subdivided, curled sheets, authored canvas print textures, a translucent acetate sheet and directional cast shadows. Sheets enter from separate positions, settle into a collage and respond to raycast picking. Dragging changes a sheet's position and bends its edge; release transfers momentum to its spring. Dragging empty space rotates the assembly. Assemble and Unpack change the spatial arrangement, the swatches lift a selected material, and Recompose makes a new arrangement. Focusing the surface and using arrow keys moves the selected sheet. The material workshop reuses this engine and adds spread and light controls, synchronized with its accessible layer tabs.

On tall desktop viewports the hero holds while its paper layers separate in depth and the copy recedes. The next section covers the stage. The method section has a sticky work surface: scrolling through Collect, Assemble and Resolve moves its paper pieces from loose scraps to a finished direction. This is reversible and preserves native scrolling and anchors. Small and short viewports keep the ordinary page flow. Magnetic buttons and spring-driven paper-card tilt respond only to fine pointers.

The WebGL renderer draws on demand while a spring, pointer, control or scroll value changes; it stops when settled, offscreen or in a hidden tab. Device pixel ratio is capped at 1.5. Geometry, textures, shadows, listeners, observers and rendering contexts are disposed on unmount. The Three.js module loads asynchronously; authored HTML artwork remains visible until the first rendered frame and returns on context loss. With JavaScript or WebGL unavailable the page stays readable. A live reduced-motion change removes pinning and automatic motion, finishes entrances, and applies material control changes immediately. Touch uses `pan-y` and a horizontal drag threshold to retain native vertical scrolling.

The paper is full bleed: each transparent canvas spans the viewport and extends vertically beyond its nominal scene. A camera view offset preserves the composition's scale and origin while exposing sheets and shadows outside the scene div. The workshop has no enclosing background slab. Document-level raycasting keeps overflowed sheets draggable; the canvas itself has no pointer events, so surrounding links and controls remain usable.

| Element | Enter | Scroll linked | Hover or focus | Press or state | Handoff |
| --- | --- | --- | --- | --- | --- |
| Header | drops into the paper field | stays fixed | links turn vermilion | button presses inward | hero hands to benefits |
| Hero collage | sheets fly in and settle | sticky departure; sheets separate in depth | raycast sheet lift and orbit | drag, fling, unpack, recompose, select and keyboard nudge | paper section covers stage |
| Benefits | staggered paper rise | none | spring-driven paper tilt | none | rules continue into tagline |
| Tagline | readable muted words | words brighten in reading order | none | none | ink hands back to paper |
| Method | introduction enters | sticky scraps become an assembled direction across three chapters | chapter links have keyboard focus | native links navigate chapters | completed composition hands to workshop |
| Material index | paper simulation assembles on entry | renderer pauses offscreen | active row shifts right; sheet responds to pointer | drag, arrow keys, spread, lighting, recompose and material selection | descriptions crossfade in a stable grid |
| Proof cards | taped card cascade | none | spring-driven paper tilt | none | cards hand to objections |
| FAQ | native details with answer fade | none | summary focus ring | plus rotates on toggle | answers keep native keyboard behavior |
| Request form | paper rise | none | fields tint on focus | success crossfades; old fields become inert | footer closes visit |

## Signature details

The recurring details are registration marks, translucent tape strips, small mono material labels and the red stamp dot. The form includes a calm local success state and never sends a request.

## Files

`studio/MaterialStudio.tsx` owns the hero/workshop controls and fallback artwork. `studio/engine.ts` owns the Three.js renderer and pointer interaction; `studio/physics.ts` contains tested spring integration and bounded composition poses; `studio/textures.ts` draws the print artwork. `studio/studio.css` defines scene layout and cinematic scroll layouts. `motion/ScrollMotion.tsx` coordinates page progress, tagline words, hero departure, method assembly and initial deep-link correction. `motion/PointerMotion.tsx` owns magnetic buttons and card tilt. `motion/Reveals.tsx` handles finite entrances. `sections/MaterialDeck.tsx` owns the accessible tabs. The existing local form, identity and metadata remain isolated to this route.

## Do and do not

Keep the editorial page flat and the interactive paper physically tactile. Use real material language and room around the type. Do not add stock photos, background gradients, competing CTAs or another typeface. Do not introduce scroll hijacking or per-frame React state updates.
