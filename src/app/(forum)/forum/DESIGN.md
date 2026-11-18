# FORUM Design Specifications

One intelligent system for your contacts, conversations, pipeline, and next move. An OpenLanding interactive product concept.

## Palette
- `#171814`
- `#0E100C`
- `#B9B28A`
- `#8C876B`
- `#F6F3EA`
- `#D7D1B8`

## Hero: real-time 2.5D monolith

The hero plate (`02-hero-monolith-clean.webp`) is rebuilt as a live three.js scene layered over it
(`components/forum/HeroMonolith.tsx`, `lib/forum/monolithScene.ts`, maths in `lib/forum/monolithMath.ts` with tests).

- **Layers at real depths:** stars (z −18 to −24), the eclipse (z −8: an opaque black disc plus an additive corona
  shader with a hot rim, an inner glow and two families of hashed angular streamers), and the slab (a 1 : 1.15 : 4.6
  `BoxGeometry` with seeded canvas-texture circuit engraving as bump and emissive maps). The camera sits below the slab
  (worm's-eye) and drifts with the pointer, so near and far layers parallax for real. The eclipse is re-parked every
  frame on the camera ray through the slab (`coronaAnchor`), so it always stays behind it.
- **Halftone:** the scene renders to a half-float target, then an 8×8 Bayer ordered-dither pass quantises perceptual
  brightness to five palette tones (`#0E100C`, an ink/khaki mix, `#8C876B`, `#B9B28A`, `#F6F3EA`) on a 2 px cell grid.
- **Loading:** fine-pointer desktops (≥ 768 px) only, started on browser idle, and the canvas fades in after its first
  frame. The plate stays the LCP image and is the reduced-motion, touch and no-WebGL state. The loop pauses off-screen
  and in hidden tabs.
- **Idle life:** a slow yaw breath (±0.07 rad, 48 s period), a 5 cm float, and slowly drifting streamers.
