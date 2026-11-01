# ASSEMBLAGE

## Requirements

Assemblage is a single action conversion page for independent brands. The action is requesting a two week material study. It is designed for an early stage creative lead or founder who has a strong instinct but needs a direction the whole team can see and use.

## Concept

An idea becomes useful when it has a surface, so the page assembles paper, acetate, ink and found marks into one working collage. The material carousel is the signature interaction: selecting a material centers its sheet and names the job it does.

## Palette and type

Paper `#F6F0E8` is the ground, ink `#1E1D1B` carries type and dark slabs, sand `#E2D8C9` is stock, vermilion `#D95F3F` is the action colour, teal `#1D6C63` is the image field, ochre `#E7C65A` is the signal, and plum `#8F4E70` is reserved for future editorial notes. Manrope is the sole primary typeface. Geist Mono is reserved for utility labels and material indexes.

## Layout

The page uses a floating pill header, a two column material-carousel hero, an offset benefit grid, a full ink tagline reveal, a three step process, an interactive layer index, taped proof cards, a plain question list and a dark local form. The form is repeated only as the final conversion object.

## Motion

The signature is a continuously rotating, clockwise, full-bleed material carousel. One larger sheet is centered; smaller, faded neighbors sit apart on either side. Four authored print textures retain the paper, image, ink and translucent signal artwork, with curled Three.js geometry, directional light and cast shadows.

Sheets follow a circular path in depth, traveling rightward across the front and returning invisibly around the back. The default speed is 0.34 materials per second, or about 12 seconds per four-material circuit. Drag horizontally to move the carousel. Release projects a bounded fling and springs toward a material while the underlying rotation continues. Clicking a visible neighboring sheet brings it to the center; the carousel has no bottom toolbar, arrows, swatches or drag instruction. Left/Right keys navigate; Home/End select the first/last material. A visually hidden live status announces manual selections; autonomous material changes update the counter and workshop tabs without repeated screen-reader announcements. The workshop uses the same carousel, synchronized with its accessible material tabs, plus spacing and lighting controls.

A single continuous track position owns every sheet's pose. Opposite sheets wrap while transparent, avoiding visible jumps. Visible neighbors remain separated throughout each transition. The layout compresses their projected edge-to-edge gaps to 50% of the original spacing while preserving artwork size and the visual center. React updates only on discrete selection changes. The clockwise drift never settles while visible. During pointer interaction, including a stationary held pointer, it eases to 0.072 materials per second. That lower speed persists for five seconds after manual navigation before blending back to cruising speed. Rendering pauses offscreen or in a hidden tab without accumulating a catch-up jump. Pixel ratio is capped at 1.5 and all geometry, textures, listeners and rendering resources are disposed on unmount.

The canvas spans the viewport with vertical overscan and camera view offsets, preserving full bleed without rectangular scene clipping. Empty canvas space passes clicks through to the page. Native vertical touch scrolling remains available, and horizontal gestures drive the carousel. Reduced motion disables autonomous rotation and applies manual navigation immediately. With JavaScript or WebGL unavailable, authored HTML slides remain in a native horizontal scroll-snap carousel.

Tall desktop layouts retain the sticky hero departure and the method's reversible Collect/Assemble/Resolve scroll sequence. Small and short viewports retain ordinary page flow. Magnetic buttons and gentle paper-card tilt respond only to fine pointers. The existing finite section entrances, word activation, native FAQ and local form transitions remain.

## Signature details

The recurring details are registration marks, translucent tape strips, small mono material labels and the red stamp dot. The form includes a calm local success state and never sends a request.

## Files

`studio/MaterialStudio.tsx` owns navigation, announcements and the native fallback. `studio/engine.ts` owns the Three.js carousel, hit testing and pointer gestures. `studio/physics.ts` contains tested wrapping, nearest-slide selection, fling projection, separated carousel poses and spring integration. `studio/textures.ts` draws print artwork; `studio/studio.css` defines scene and scroll layouts. The existing motion controllers coordinate page progress, tagline words, hero departure, method assembly, entrances and pointer feedback. `sections/MaterialDeck.tsx` synchronizes accessible tabs with workshop selection.

## Do and do not

Keep the editorial page flat and the interactive paper physically tactile. Use real material language and room around the type. Do not add stock photos, background gradients, competing CTAs or another typeface. Do not introduce scroll hijacking or per-frame React state updates.
