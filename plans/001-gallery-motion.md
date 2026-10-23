# Gallery interaction motion

Status: implemented. Baseline: `8c8d3df`. Scope: OpenLandingPage homepage `/` only.

The user requested both an animation audit and implementation using Hallmark's existing design direction. The audit was read-only; implementation followed the user's authorization. No template route, template asset, or preview playback sequence is part of this plan.

## Confirmed findings

| Priority | Evidence at baseline | Finding | Resolution |
| --- | --- | --- | --- |
| Medium | `src/app/(index)/components/FilterBar.tsx:43` | Category background switches immediately while the model underline travels. | Shared category selection surface; same 420 stiffness / 35 damping spring as model selection. |
| Medium | `src/app/(index)/components/TemplateCard.tsx:133` | Copy status swaps icons abruptly; pending state only dims its button. | Two decorative icons transition with state; pending spinner; success resets when another copy starts. |
| Medium | `src/app/(index)/components/FilterBar.tsx:24` | Keyboard changes inherit spring layout and smooth scrolling. | Track keyboard/pointer input across the homepage; disable spatial grid/selection motion for keyboard and search; instant keyboard tab scrolling. |
| Low | `src/app/(index)/index.css:65` | Hover/press feedback differs between buttons and links; some transforms are not gated for touch. | Route-local interaction rules and timing tokens; fine-pointer hover gate and reduced-motion handling. |

Missed opportunities addressed: rolling CTA labels, native scroll progress, contribution entry linked to scroll, a new-result settle, consistent search and navigation affordances. Existing screenshot pan behavior was deliberately retained.

## Target behavior and exact values

- Retain the existing palette, typography, copy, grid, URLs, and clipboard behavior.
- Extend `src/app/(index)/tokens.css`: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, press 120ms, state 180ms, travel 260ms, marketing entrance 650ms. Preserve preview's existing ease-in-out token.
- Press scale is `.97`. Hover card travel is `-4px`, new-card settle is `16px`, contribution entry is `28px`. Motion uses transform/translate and opacity, never animated layout dimensions.
- Category and model shared-layout springs use `{ type: "spring", stiffness: 420, damping: 35 }`. Card reordering retains `{ type: "spring", stiffness: 350, damping: 32 }`.
- Copy icons move 6px with a small rotation/scale over 220ms. Pending spinner rotates linearly over 800ms only while busy. Reduced motion uses 150ms opacity feedback with no spatial transitions.
- Existing exemplar: `FilterBar.tsx` model marker uses Motion `layoutId`; use that same pattern for category selection. Existing tokens remain the single source of color/font values.

## Implementation sequence

1. Add route-local `motion.css`, imported from `(index)/index.css`. Use `.site-shell` specificity to extend the existing stylesheet without changing template styles.
2. Add `ActionLabel.tsx`: one accessible label and one aria-hidden duplicate inside a clipped line. Apply to the hero and contribution CTAs. Hover translates the track by `-100%`; focus outline remains instantaneous.
3. Add an aria-hidden scroll-progress element to `Header.tsx`. Use CSS `scroll(root)` under feature detection and no-preference; unsupported browsers retain a static header.
4. Extend `FilterBar.tsx` with the shared category surface and an `instantMotion` prop. Put both filter markers and cards in the existing GalleryShell LayoutGroup.
5. Track document keyboard/pointer input in `GalleryShell.tsx`, cleaning up listeners on unmount. Pass immediate-motion state to filters/cards. Search clears must preserve keyboard modality.
6. Retain both copy icons in `TemplateCard.tsx`, inside an aria-hidden stack; drive visibility from existing `data-copied` and `aria-busy`. Clear copied state before a new website copy. Keep accessible labels and error messages.
7. Gate hover motion to fine pointers. Reduced motion must remove movement while retaining static selection, focus, success, and failure states. Keep all initial content visible without JavaScript.

## Boundaries

- No files in other `src/app/(...)` groups, template data, generated bundles, media assets, or template animation implementations.
- No dependencies, scroll hijacking, delayed keyboard response, or permanent hidden content.
- Do not rewrite preview pan/video behavior as part of this work.

## Verification

- `npm test -- 'src/app/(index)'`: all 55 homepage tests pass.
- `npx tsc --noEmit`; targeted ESLint on changed components and `tests/e2e/gallery-motion.spec.ts`.
- `npm run check`: template isolation and palette checks pass.
- Playwright: `gallery-discovery.spec.ts` and `gallery-motion.spec.ts`, with a local server and clipboard permissions. Cover filtering, rapid selection, keyboard navigation/search clear, copied feedback, delayed/failed copy, touch, and reduced motion.
- Hallmark: render the homepage at 375/1280/1440/1920 widths and check the changed CSS/components with `sloplint.mjs --scope app --genre modern-minimal --render --url http://localhost:3000`.
- Feel check: reverse hover mid-transition; rapidly select several categories; confirm the final marker tracks the selected category. At 10% playback, labels should roll within a fixed line and icon states should trade places without moving the button. Scroll normally to the contribution section; confirm no forced scrolling. Repeat with reduced motion and touch emulation.
- Done when: functional checks pass, focus is immediate, duplicate labels remain decorative, unsupported scroll-timeline browsers keep visible content, and the diff has no template files.
