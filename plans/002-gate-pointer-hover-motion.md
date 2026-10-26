# 002 — Gate pointer hover motion

- **Status**: DONE
- **Commit**: 55784e5
- **Severity**: MEDIUM
- **Category**: Accessibility / Purpose & frequency
- **Estimated scope**: 1 file, 20 lines

## Problem

Pointer-only transforms are declared as unconditional `:hover` rules. On touch browsers, a tap can leave a hover state behind, moving the CTA or the material tab after the user has already acted. The same selectors also mix colour and movement, so the page has no clear distinction between pointer affordance and keyboard or touch feedback. Current code in `src/app/(assemblage)/assemblage/assemblage.css:48-55` and `:96` includes:

```css
.as-nav a:hover, .as-text-link:hover, .as-footer-links a:hover { color: var(--color-as-vermilion); }
.as-button:hover { transform: translateY(-3px); }
.as-button--primary:hover { background: var(--color-as-vermilion); border-color: var(--color-as-vermilion); }
.as-materials-list button:hover, .as-materials-list button.is-active { color: var(--color-as-vermilion); transform: translateX(8px); }
```

The audit requires pointer hover effects to be gated by `@media (hover: hover) and (pointer: fine)`. The active tab state must remain available to touch and keyboard users.

## Target

Move only pointer hover selectors into one guarded block:

```css
@media (hover: hover) and (pointer: fine) {
  .as-nav a:hover,
  .as-text-link:hover,
  .as-footer-links a:hover { color: var(--color-as-vermilion); }
  .as-button:hover { transform: translateY(-3px); }
  .as-button--primary:hover { background: var(--color-as-vermilion); border-color: var(--color-as-vermilion); }
  .as-materials-list button:hover { color: var(--color-as-vermilion); transform: translateX(8px); }
}
```

Keep `.as-materials-list button.is-active` outside the media query with its colour and transform so the selected tab remains visible for all input types. Keep `:active` and `:focus-visible` feedback outside the query. Do not add hover-only behaviour to the FAQ or form.

## Repo conventions to follow

- The template uses state classes such as `.is-active` for persistent interaction state in `src/app/(assemblage)/assemblage/sections/MaterialDeck.tsx:27`.
- Focus treatment is global at `assemblage.css:26`; preserve it rather than replacing it with hover styling.
- The existing responsive CSS is grouped in media queries at the bottom of the file; add the pointer guard before the responsive blocks.

## Steps

1. In `src/app/(assemblage)/assemblage/assemblage.css`, remove the unconditional nav, text link and footer `:hover` colour rule and recreate it inside the pointer media query.
2. Move `.as-button:hover` and `.as-button--primary:hover` into the same pointer media query.
3. Split `.as-materials-list button:hover, .as-materials-list button.is-active` into a guarded hover rule and an unconditional `.is-active` rule, preserving the same colour and transform values.
4. Leave `.as-button:active`, `.as-materials-list button:focus-visible`, and all focus ring rules outside the pointer query.

## Boundaries

- Do not change active, focus, press or selected-tab behaviour.
- Do not change copy, component structure or breakpoints.
- Do not add JavaScript pointer detection.
- If the selectors no longer match the cited code, stop and report the drift.

## Verification

- **Mechanical**: run `npx tsc --noEmit`, `npm test`, and `npm run check`.
- **Feel check**: test at 390px with touch emulation. Tapping the CTA and material tabs must not leave a hover lift or horizontal shift. Test with keyboard Tab and confirm focus remains visible and the active material row stays shifted.
- Test with a fine pointer and confirm the desktop hover lift and colour changes still work.
- Toggle reduced motion and confirm no pointer transform is applied after a touch tap.
- **Done when**: hover transforms execute only for fine pointers, while active and focus states remain available to touch and keyboard users.
