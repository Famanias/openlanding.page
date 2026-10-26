# 003 — Stagger tagline word activation

- **Status**: DONE
- **Commit**: 55784e5
- **Severity**: MEDIUM
- **Category**: Cohesion & tokens / Missed opportunity
- **Estimated scope**: 2 files, 20 lines

## Problem

The tagline is designed to activate one word at a time, but all three word spans are observed together and receive `data-in` in the same IntersectionObserver callback. The current markup in `src/app/(assemblage)/assemblage/page.tsx:24-28` is:

```tsx
<h2>
  <span data-as-word>Good ideas</span> <span data-as-word>need a surface</span>
  <br />
  <span data-as-word>before they need a budget.</span>
</h2>
```

The current observer in `src/app/(assemblage)/assemblage/motion/Reveals.tsx:14-17` observes every word but has no per-word delay:

```tsx
const observer = new IntersectionObserver((entries, current) => entries.forEach((entry) => {
  if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.in = "true"; current.unobserve(entry.target); }
}), { threshold: 0.16, rootMargin: "0px 0px -8%" });
[...revealNodes, ...wordNodes].forEach((node) => observer.observe(node));
```

The CSS in `src/app/(assemblage)/assemblage/assemblage.css:93` transitions every word for the same 700ms with no stagger. This makes the signature reveal read as one colour change instead of a measured reading order.

## Target

Give each word a stable index and use the repo's existing 70ms stagger convention from the design direction. Add `data-as-word-index="0"`, `"1"`, and `"2"` to the three spans. In the CSS, add:

```css
.as-tagline [data-as-word] {
  transition: color 700ms var(--ease-as);
  transition-delay: calc(attr(data-as-word-index type(<number>)) * 70ms);
}
```

If browser support for typed `attr()` is not acceptable in the target matrix, set an inline custom property from JSX instead:

```tsx
style={{ "--as-word-index": 0 } as React.CSSProperties}
```

and use:

```css
.as-tagline [data-as-word] { transition-delay: calc(var(--as-word-index) * 70ms); }
```

The observer should continue to flip `data-in` per word. Do not add a scroll listener or a second observer. Under reduced motion, keep the existing immediate finished state.

## Repo conventions to follow

- IntersectionObserver is the established reveal mechanism in `src/app/(assemblage)/assemblage/motion/Reveals.tsx`.
- `--ease-as` is the shared curve and `700ms` is the existing explanatory colour transition in `assemblage.css:93`.
- The page already documents a 70ms stagger in `src/app/(assemblage)/assemblage/DESIGN.md`; use that value exactly.

## Steps

1. Edit `src/app/(assemblage)/assemblage/page.tsx` and add an index to each `data-as-word` span in reading order.
2. Edit `src/app/(assemblage)/assemblage/assemblage.css` and add the indexed delay declaration to the existing tagline word rule.
3. Keep the current muted base colour, `data-in` full colour, 700ms duration, and reduced motion override unchanged.
4. Confirm the initial viewport helper in `Reveals.tsx:19-22` still marks only currently visible words as in; do not make below-fold words visible early.

## Boundaries

- Do not change tagline copy, font size, section spacing or observer thresholds.
- Do not use an unthrottled scroll handler or timers tied to scroll.
- Do not stagger the entire section or delay the hero CTA.
- If the word count or current observer structure differs, stop and report the drift.

## Verification

- **Mechanical**: run `npx tsc --noEmit`, `npm test`, and `npm run check`.
- **Feel check**: scroll the dark tagline into view slowly and confirm “Good ideas”, then “need a surface”, then “before they need a budget.” activates in order with approximately 70ms between starts. Reverse scroll and confirm the words do not replay because the observer unobserves them.
- Set animation playback to 10% and verify no word jumps to full colour before its predecessor.
- Toggle reduced motion and confirm all words are full colour immediately with no visible delay.
- **Done when**: the signature tagline reads as a three step activation while preserving one time reveal and reduced motion completion.
