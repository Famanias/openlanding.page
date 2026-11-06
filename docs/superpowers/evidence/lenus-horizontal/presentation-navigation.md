# Presentation-style chapter navigation

Follow-up request: one scroll gesture should slide to the next chapter, with arrow-key navigation. This intentionally replaces the master prompt's original continuously scrubbed desktop wheel behavior; the existing model, renderer and chapter choreography remain unchanged.

`story/chapterNavigation.ts` groups wheel/trackpad events into strokes using a 240ms quiet interval and a 24px accumulated threshold. Once consumed, an entire stroke, including a long momentum tail, cannot advance again. Wheel line/page deltas are normalized before classification. Separate inputs during a slide cannot queue several forward transitions; a deliberate reverse input can return smoothly to the source chapter.

`useHorizontalStory.ts` moves the real document scroll position with a 1.15-second `power3.inOut` GSAP tween. The horizontal track directly follows that coordinate, avoiding an additional smoothing tail. Actual measured offsets still handle the wider Work chapter. Pointer/touch interaction interrupts a navigation slide. Listeners, gestures and tweens are scoped to the route and cleaned up on unmount.

- Scroll down/right: next chapter; up/left: previous chapter.
- Left/Right keys: chapter navigation. Up/Down also navigate inside the desktop horizontal story.
- Lens keyboard orbit, sliders, gallery buttons, editable fields and dialogs retain their input ownership. Key repeats do not skip chapters.
- Contact advances into the native footer. The footer scrolls freely; Left returns to Contact.
- Nested scrolling remains available. Modified wheel gestures retain browser zoom behavior.
- Smaller layouts retain native vertical wheel/touch scrolling. Reduced-motion chapter navigation is immediate.

The chapter index includes a small desktop navigation hint. No dependencies or 3D resources were added.

Validation is covered by three gesture/destination unit tests and three additional native Chromium interaction tests, alongside the existing LENUS regression suite. The long-tail browser test uses a real initial wheel event and a timed in-browser momentum replay so automation transport latency cannot split the stroke into separate gestures. Reverse/footer checks use native wheel and keyboard input.

## Verification

- Full unit suite: **245 files, 1,301 tests passed**.
- Production build and its TypeScript check: passed.
- LENUS and changed-test ESLint: passed.
- Repository isolation, palette and media checks: passed.
- Native Chromium production suite: **29 passed**; one automatic-loop test lost its browser/context unexpectedly before an assertion. That test **passed on an immediate isolated rerun without source changes**, completing all 30 unique browser checks. The three new wheel/keyboard/footer tests passed in the full run.

Raw logs: [unit tests](presentation-unit-tests.txt), [production browser run](presentation-browser-tests.txt), [isolated browser rerun](presentation-browser-retry.txt).

Current production captures: [hero with navigation hint](presentation-hero.webp), [chapter slide in progress](presentation-midpoint.webp). The original composition captures and native scene-budget measurements in the parent report still apply; the optical scene and factory were not changed by this interaction update.

[Native motion samples](presentation-motion-samples.json) confirm that the header stays at 16px and the pinned stage at 0px while scroll/chapter progress advances. The midpoint still uses pointer interruption to freeze navigation for an accurate capture rather than taking a screenshot across moving document coordinates.
