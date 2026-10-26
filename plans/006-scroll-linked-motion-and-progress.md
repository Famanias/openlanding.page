# 006 — Add scroll linked collage movement and progress

- **Status**: DONE
- **Commit**: 55784e5
- **Severity**: MEDIUM
- **Category**: Missed opportunity / Performance
- **Estimated scope**: 3 files, 90 lines

## Problem

The page currently has one time reveal observer but no scroll linked motion. `src/app/(assemblage)/assemblage/motion/Reveals.tsx:14-22` only flips `data-in`, and the hero collage in `assemblage.css:65-85` stays fixed while the visitor scrolls past it. There is also no progress indicator in the header. The result is a page whose sections appear, then stop moving during the most important interaction: scrolling through the material story.

## Target

Add a small client component `src/app/(assemblage)/assemblage/motion/ScrollMotion.tsx` that owns one passive scroll listener and one `requestAnimationFrame` loop. The loop should:

1. Read `window.scrollY` and `document.documentElement.scrollHeight - window.innerHeight`.
2. Compute a clamped page progress from `0` to `1`.
3. Set `transform` directly on the progress element and four hero layer elements, never on a parent CSS variable:

```ts
progress.style.transform = `scaleX(${pageProgress})`;
back.style.transform = `translate3d(0, ${pageProgress * -28}px, 0) rotate(-8deg)`;
photo.style.transform = `translate3d(0, ${pageProgress * 18}px, 0) rotate(8deg)`;
front.style.transform = `translate3d(0, ${pageProgress * -12}px, 0) rotate(4deg)`;
acetate.style.transform = `translate3d(0, ${pageProgress * 26}px, 0) rotate(-10deg)`;
```

Use `requestAnimationFrame` coalescing so rapid scroll events schedule at most one update. Stop the loop when no frame is pending, and restart it only from a scroll event. Remove the listener on unmount. Do not use React state for per-frame values.

Add a progress element to `src/app/(assemblage)/assemblage/sections/Header.tsx`:

```tsx
<span className="as-progress" aria-hidden="true"><span className="as-progress-bar" /></span>
```

Add `data-as-scroll-layer` attributes to the four hero layers so the component can query them without coupling to visual class names. Mount `<ScrollMotion />` once in `page.tsx` beside `<Reveals />`.

Style the bar with `transform-origin: left center`, `transform: scaleX(0)`, and a 2px height. Set `will-change: transform` only on the five directly animated elements. Under reduced motion, set the progress bar to a static 0 width and skip mounting the scroll loop.

## Repo conventions to follow

- The existing reveal system uses a client component mounted once in `page.tsx`; follow that pattern.
- Audit guidance requires CSS or direct transforms over layout properties, and one rAF loop rather than an unthrottled scroll handler.
- The base curve is `--ease-as`; the scroll linked transforms themselves must not use CSS transitions because they are continuous.

## Steps

1. Create `motion/ScrollMotion.tsx` with the rAF coalescing loop, cleanup, reduced motion branch and direct transform writes above.
2. Add `data-as-scroll-layer` attributes to the four hero art elements in `sections/Hero.tsx`.
3. Add the progress markup to `sections/Header.tsx` and mount `ScrollMotion` from `page.tsx`.
4. Add the progress bar styles and `will-change` declarations to `assemblage.css`; keep the existing hover transitions separate.
5. Add a reduced motion rule that prevents transforms and hides the progress fill without changing document flow.

## Boundaries

- Do not use an unthrottled `window.addEventListener('scroll', ...)` callback.
- Do not write per-frame values to React state or to a parent custom property that drives all children.
- Do not animate width, height, top, left, padding or margin.
- Do not add smooth scrolling, a new dependency or a second scroll owner.

## Verification

- **Mechanical**: run `npx tsc --noEmit`, `npm test`, and `npm run check`.
- **Feel check**: scroll from the hero to the tagline at slow and fast speeds. The four collage layers should drift by different amounts and remain aligned with their original rotations. The progress bar should track the page without lag or visible layout shift.
- Record a Performance trace on a throttled CPU and confirm the loop performs only direct transforms and stops when idle.
- Toggle reduced motion and confirm the collage is static, the progress bar is not moving, and all content remains visible.
- **Done when**: scroll has a quiet material drift and progress cue, with no dropped frames or reduced motion regressions.
