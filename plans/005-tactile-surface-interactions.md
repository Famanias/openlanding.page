# 005 — Add tactile surface interactions

- **Status**: DONE
- **Commit**: 55784e5
- **Severity**: MEDIUM
- **Category**: Missed opportunity / Cohesion
- **Estimated scope**: 1 file, 45 lines

## Problem

Assemblage promises a physical collage, but most visible surfaces only have a static transform. The hero collage, benefit cells, process cells, quote cards and note card do not respond to pointer proximity or focus. Current examples in `src/app/(assemblage)/assemblage/assemblage.css:68-83`, `:90-92`, `:94`, and `:97-99` define transforms without transitions or interaction states:

```css
.as-art-paper--back { ... transform: rotate(-8deg); }
.as-art-photo { ... transform: rotate(8deg); }
.as-art-paper--front { ... transform: rotate(4deg); }
.as-art-acetate { ... transform: rotate(-10deg); }
.as-benefit { min-height: 250px; ... }
.as-step { min-height: 330px; ... }
.as-quote { ... transform: rotate(-2deg); }
.as-note-card { ... transform: rotate(-2deg); }
```

The page has a tactile visual language, but the interaction language stops at buttons and material tabs. This is a missed opportunity for rare, low frequency surfaces where a restrained lift and shadow shift can explain that the pieces are objects.

## Target

Add a pointer guard and use transform and box shadow only. Preserve each current rotation by moving it into a custom property, then add a shared hover lift:

```css
@media (hover: hover) and (pointer: fine) {
  .as-art-paper,
  .as-art-photo,
  .as-art-acetate,
  .as-benefit,
  .as-step,
  .as-quote,
  .as-note-card {
    transition: transform 500ms var(--ease-as), box-shadow 300ms var(--ease-as);
  }
  .as-art-paper:hover,
  .as-art-photo:hover,
  .as-art-acetate:hover,
  .as-benefit:hover,
  .as-step:hover,
  .as-quote:hover,
  .as-note-card:hover {
    transform: translateY(-8px) rotate(var(--as-rotation, 0deg));
    box-shadow: 16px 22px 0 rgba(30,29,27,.14);
  }
}
```

Assign `--as-rotation` to each existing rotated surface so the hover rule does not erase its collage angle. For the benefit and step cells, set `--as-rotation: 0deg` and preserve their existing nth child offsets in a separate `--as-offset` variable. For quote cards, preserve `rotate(-2deg)` and `rotate(3deg) translateY(42px)` through explicit per-card transform rules.

Keyboard focus on a focusable card or link inside a card must receive the same lift through `:focus-within`; do not add a `tabindex` to decorative divs. Keep touch surfaces static except for their existing active state.

## Repo conventions to follow

- Use `--ease-as` and the existing 500ms explanatory transform budget. Do not add keyframes.
- Existing pointer gating is planned in [002](002-gate-pointer-hover-motion.md); apply that plan first so hover rules do not leak to touch.
- Reduced motion is handled by the final media query in `assemblage.css:104`; keep the hover states available as instant feedback without animated transforms.

## Steps

1. Convert the current hard-coded rotations in the hero art, quote cards and note card into `--as-rotation` plus a transform that reads the variable.
2. Convert benefit and step offset transforms into `--as-offset` variables so their layout stagger remains unchanged.
3. Add the pointer guarded transition and hover/focus-within rules above.
4. Add `:focus-within` only to surfaces that contain a real interactive descendant; leave decorative collage pieces pointer-only.
5. Extend the reduced motion block so hover and focus states set the final transform immediately with no transition.

## Boundaries

- Do not add tilt, cursor tracking, blur or continuously running animation.
- Do not change the collage geometry, section spacing or copy.
- Do not create click handlers for decorative surfaces.
- If the existing rotation or offset values differ, stop and report the drift.

## Verification

- **Mechanical**: run `npx tsc --noEmit`, `npm test`, and `npm run check`.
- **Feel check**: with a fine pointer, move across the hero collage, benefits, process cells and quotes. Each should lift once, preserve its collage angle and settle in under 500ms. Tab through any links inside cards and confirm `:focus-within` provides the same spatial cue.
- At 390px touch emulation, tapping must not leave a hover lift behind.
- At 10% playback, confirm no card jumps because the base rotation was overwritten.
- **Done when**: all major tactile surfaces have a restrained hover or focus response, with no new touch hover bugs or layout movement.
