# 007 — Animate tab, FAQ and error states

- **Status**: DONE
- **Commit**: 55784e5
- **Severity**: LOW
- **Category**: Missed opportunity / Interruptibility
- **Estimated scope**: 3 files, 55 lines

## Problem

The material tab interaction changes the detail copy immediately, and FAQ `<details>` content appears without a spatial handoff. The only animated part of an FAQ row is the plus rotation in `assemblage.css:98`:

```css
.as-faq summary span { color: var(--color-as-vermilion); font-size: 28px; font-weight: 400; transition: transform 300ms var(--ease-as); }
.as-faq details[open] summary span { transform: rotate(45deg); }
```

The material panel in `sections/MaterialDeck.tsx:27-28` changes `layer` and replaces the paragraph in the same render. Validation errors in `forms/RequestForm.tsx:15-17` also appear immediately with no small transition. These are reversible state changes and should retarget from the current state instead of teleporting.

## Target

For the material detail, keep a stable panel and add `data-state={active}`. Use a 220ms opacity and 12px transform transition on the detail copy; when the tab changes, update the state and let the copy crossfade. The new copy must be announced through a polite `aria-live` wrapper only when the active tab changes, not on every scroll frame.

For FAQ answers, wrap the answer in an inner element and animate a grid row from `0fr` to `1fr`, with opacity:

```css
.as-faq-answer { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 250ms var(--ease-as), opacity 180ms var(--ease-as); }
.as-faq-answer > div { overflow: hidden; }
.as-faq details[open] .as-faq-answer { grid-template-rows: 1fr; opacity: 1; }
```

Keep the summary plus rotation at 250ms and preserve native details keyboard and Escape behaviour. For validation messages, add a 180ms opacity and `translateY(-4px → 0)` transition on `.as-error`; use `@starting-style` where supported and a mounted class fallback if needed.

Under reduced motion, set all three state changes to `transition-duration: 1ms` and remove transforms while preserving opacity or the final grid row.

## Repo conventions to follow

- The material control is a native button with `role="tab"` in `sections/MaterialDeck.tsx`; do not replace it with a custom pointer target.
- FAQ uses native `<details>` in `sections/FAQ.tsx`; preserve that semantic behavior.
- Existing motion uses `--ease-as` and 300ms or less for UI transitions.

## Steps

1. Add a stable detail wrapper and active state marker in `MaterialDeck.tsx`; keep the current layer data and button semantics.
2. Update `FAQ.tsx` so each answer is wrapped in `.as-faq-answer > div` without changing question or answer copy.
3. Add `.as-material-detail` crossfade, `.as-faq-answer` grid row transition and `.as-error` entrance transition to `assemblage.css`.
4. Add the reduced motion override for all three selectors.
5. Test rapid tab changes and opening then closing FAQ rows to confirm transitions retarget cleanly without stale copy or clipped content.

## Boundaries

- Do not add a third party animation library.
- Do not animate `height`, `width`, margins or padding directly.
- Do not replace native details, buttons or form validation.
- Do not change the existing success handoff from [004](004-form-success-transition.md); this plan covers pre-submit errors and informational state changes only.

## Verification

- **Mechanical**: run `npx tsc --noEmit`, `npm test`, and `npm run check`.
- **Feel check**: click material tabs rapidly and confirm the detail copy crossfades from its current position without restarting from the first frame. Open and close FAQ rows repeatedly and confirm the answer row expands and collapses smoothly.
- Submit an empty form and confirm each error slides in by 4px and settles within 180ms. Correct a field and confirm its error disappears without moving the whole form.
- Toggle reduced motion and confirm the final states are immediate and readable.
- **Done when**: all reversible content states have interruptible transitions and native keyboard semantics remain intact.
