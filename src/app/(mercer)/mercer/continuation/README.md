# Authored portfolio continuation

Copied from the supplied `jules-mercer-portfolio-continuation.html`, beginning at **02 / SELECTED WORK**, through the contact section and footer. The earlier About section is intentionally excluded. `page.tsx` appends this component after the existing `MercerApp`; no hero components, styles, fonts, layout or click handlers were edited.

- `continuationMarkup.ts` contains the reviewed static markup. It accepts no runtime HTML input and includes no scripts.
- `continuation.css` retains the authored CSS values. Class names use `jmc-` so they cannot collide with hero classes. Document-global rules are omitted, and standalone element defaults are restored only inside `#jm-continuation` to avoid Tailwind reset differences.
- `continuationRuntime.js` retains the original Canvas 2D artwork and interaction timings, wrapped in `mountContinuation` with listener, observer, timer and animation-frame cleanup.
- Footer links to the omitted About section return to the existing hero; “Top of continuation” returns to Selected Work. Existing hero links and dialogs remain unchanged.
- The supplied illustrative email address, copy, fonts and colors are preserved.

Verification includes expansion, canvas rendering and pause/resume, project navigation, clipboard copying, mobile overflow, no-JavaScript text visibility, and the existing hero tests. The static Canvas bitmaps match the original HTML at 1440 × 900 and 390 × 844. Local comparison evidence is in `.openlanding-page/mercer/continuation/`.
