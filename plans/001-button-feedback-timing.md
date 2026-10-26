# 001 — Tighten button feedback timing

- **Status**: DONE
- **Commit**: 55784e5
- **Severity**: HIGH
- **Category**: Easing & duration
- **Estimated scope**: 1 file, 10 lines

## Problem

Button hover and press feedback share a 500ms transform transition. A press is a high frequency, immediate action, so the button feels delayed and the release carries the same slow timing as the hover lift. The relevant code is in `src/app/(assemblage)/assemblage/assemblage.css:50-52`:

```css
.as-button { display: inline-flex; align-items: center; justify-content: center; gap: 12px; min-height: 48px; padding: 8px 16px; border: 1px solid var(--color-as-ink); border-radius: 999px; font-weight: 700; font-size: 16px; transition: transform 500ms var(--ease-as), background-color 300ms var(--ease-as), color 300ms var(--ease-as); }
.as-button:hover { transform: translateY(-3px); }
.as-button:active { transform: translateY(1px) scale(.98); }
```

The audit budget is under 300ms for UI animations and 100–160ms for button press feedback.

## Target

Add explicit fast and press duration tokens beside `--dur-as` in the same `@theme` block:

```css
--dur-as-fast: 180ms;
--dur-as-press: 140ms;
```

Use the fast duration for the button's transform and the existing 300ms budget for colour changes. Override only the active state with the press duration so the button snaps in and releases responsively:

```css
.as-button {
  transition: transform var(--dur-as-fast) var(--ease-as),
    background-color 300ms var(--ease-as), color 300ms var(--ease-as);
}
.as-button:active {
  transition-duration: var(--dur-as-press);
  transform: translateY(1px) scale(.98);
}
```

Keep the existing `cubic-bezier(0.22, 1, 0.36, 1)` token and the existing hover displacement. Do not add keyframes or animate layout properties.

## Repo conventions to follow

- Motion tokens live in `src/app/(assemblage)/assemblage/assemblage.css:3-15`; extend that `@theme` block instead of adding a second token file.
- The template already uses `--ease-as: cubic-bezier(0.22, 1, 0.36, 1)` for all motion.
- The existing active transform is the correct physical feedback shape; only its timing needs to change.

## Steps

1. Edit `src/app/(assemblage)/assemblage/assemblage.css` and add `--dur-as-fast: 180ms` and `--dur-as-press: 140ms` immediately after `--dur-as: 700ms`.
2. Replace the `.as-button` transition declaration at line 50 with the target declaration above.
3. Add `transition-duration: var(--dur-as-press);` to `.as-button:active` while preserving `translateY(1px) scale(.98)`.

## Boundaries

- Do not change button markup, copy, layout, colours or hover displacement.
- Do not add a motion library or change `--ease-as`.
- Do not touch other transitions in the file.
- If the cited declarations have moved or changed shape, stop and report the drift instead of improvising.

## Verification

- **Mechanical**: run `npx tsc --noEmit`, `npm test`, and `npm run check`.
- **Feel check**: open `/assemblage`, hover the header and hero buttons, then press and release them repeatedly. At 10% playback speed, the press should complete in roughly 140ms and the release should not wait for the 500ms hover timing. Confirm the colour change remains under 300ms.
- Toggle `prefers-reduced-motion: reduce`; the button should retain its pressed and colour states without movement animations.
- **Done when**: no button uses a 500ms transform transition, press feedback completes within 100–160ms, and all existing button states remain intact.
