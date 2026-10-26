# Starlight Lab

## Requirements

Three.js WebGL model study page with one conversion: launch the demo or unlock the starter scene. The renderer uses physically based materials and procedural geometry while keeping the chapter choreography dependency local to this route.

## Concept

Space is a test range, so the page opens with a live planet and instrument rendered in a real Three.js WebGL scene. Every section translates one part of that render path into a practical engineering benefit.

## Palette

Void `#090B12`, panel `#111522`, paper `#F7F8FC`, muted `#9EA7BC`, line `#2A3245`, mint `#7DF2D1`, coral `#FF9275`.

## Type

Manrope is the single primary typeface. Geist Mono is reserved for readouts, metadata and code labels.

## Layout

Classic hero plus sections. The hero pairs an outcome led headline with the live WebGL2 planet. Benefits, process, proof stats, FAQ and a final local only starter form follow in a calm dark editorial rhythm.

## Mechanic

`space/JourneyCanvas.tsx` creates a WebGL2 context directly, compiles a vertex shader and fragment shader, uploads a full screen triangle and renders one persistent scene in a requestAnimationFrame loop. Real section offsets become a journey value from 0 to 3. The fragment shader blends four model states: eclipse, aperture, passage and alignment. Pointer movement updates a camera offset uniform, and the alignment slider updates the final moon offset uniform. The footer and chapter rail navigate the same scene through real anchors.

## Motion

Identity: precise and orbiting. Verbs: drift and resolve. The signature moment is the model changing form as the visitor scrolls: a shadowed sphere separates into an aperture, becomes a passage of rings, then resolves into a sun and moon alignment. Section reveals use IntersectionObserver, while the renderer reads a ref updated by one requestAnimationFrame scroll coordinator. Reduced motion freezes time based effects while keeping the complete scene and chapter navigation visible.

## Signature details

The scene readout, orbit labels and mono code strips repeat the laboratory language. Cards lift on hover and the mint action colour marks only the path to the demo.

## Do / Don't

Do keep geometry, material and shader decisions legible. Do preserve the flat dark surfaces and mint signal. Do not add generic starfield images or competing calls to action.

## Files

`page.tsx` composes the page. `space/JourneyCanvas.tsx` is the pure WebGL mechanic, `space/AlignmentControl.tsx` updates its final uniform, and `space/SpaceCanvas.tsx` provides the initial preview. `motion/Reveal.tsx` owns reveals. `forms/DemoForm.tsx` provides a local validation and success state. `brand/Logo.tsx` and `icon.svg` hold the identity.
