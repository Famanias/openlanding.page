# The quality bar

A template meets the bar only when every section below holds.

## 1. One central idea drives the page

- **Pick a metaphor from the brand's world, then make it the page's interaction.** Some patterns:
  - An outdoor brand's climb → a pinned mountain silhouette, an altitude meter, and camps reached chapter by chapter.
  - A company built on orchestration → a keynote deck whose diagram builds piece by piece, slide by slide.
  - A restaurant's craft → one dish rendered in real-time 3D, then a scroll-scrubbed journey through the courses.
- **Every section serves the idea.** If a section could sit on any other site (generic "Features", "Testimonials"), rewrite it in the brand's terms: products become *layers*, chapters become *camps*, pricing becomes *seatings*.
- **Name it in DESIGN.md's Concept section** in one sentence: "X, so the page does Y."

## 2. A complete, fictional brand system

- **Name, story and voice are invented.** Never copy a real brand's name, logo or trade dress. Copy uses specific numbers and facts ("36 seats", "1,200 m of vertical", "3× faster") and never lorem ipsum.
- **Logo:** a `brand/Logo.tsx` SVG component (lockup and mark), plus `icon.svg` (the favicon via the file convention) and `opengraph-image.tsx` (1200×630, using `next/og`, brand palette only).
- **Palette:** 3–8 colours, each with a role (ink, paper, accent, rare secondary, tints), written into `scripts/templates.config.ts`. `npm run check` then fails any colour outside it. Make tints with `color-mix()` of the palette colours, not with new hex values. Exempt only content colours, such as food in 3D, in `paletteExempt`.
- **Type:** three roles (display, body, mono or utility), all through `next/font/google` in the template's `layout.tsx`.
  - Give the CSS variables distinct names (`--font-fraunces`, not `--font-display`) so they can't reference themselves.
  - For CJK or other large families, set `preload: false`.
  - Size type fluidly with `clamp()`; on a deck, make it height-aware with `min(vw, vh)`.
- **Signature details:** at least 3 small, recurring touches, recorded in DESIGN.md. Examples: a slide counter and chapter rail, a live readout, a stamp or seal mark, a signage strip, spec sheets.

## 3. Structure, not a monolith

- The page is composed from folders: `brand/`, `sections/` (or `slides/`, `chapters/`), the mechanic's own folder (`deck/`, `ascent/`, `dish/` …), `forms/`, and `assets.tsx`.
- **Typical size is 25–40 files and about 2,000–3,000 lines.** A 7-file template is a sign the concept wasn't built out.
- Data that drives the page (products, menus, camps, slides) is typed, lives in a `.ts` file, and is tested.

## 4. Motion with meaning

- **Animate only `transform` and `opacity`** (and `clip-path` for wipes). Never animate `width`, `height`, `top` or `filter: blur` on things that move often.
- **Every motion is interruptible:** CSS transitions keyed on `data-state` beat fire-and-forget timelines.
- **Use easing tokens in `@theme`;** don't scatter cubic-beziers. Entrances use ease-out, at 150–400 ms for UI.
- **Under `prefers-reduced-motion`, everything is visible and static,** with no content hidden behind an animation. Heavy engines (3D, scroll video) must never mount; prove it with a test.
- **Keyboard:** decks respond to arrow keys but never steal Space or Enter from focused buttons, links or form fields.

## 5. Accessible

- One `h1`, a logical heading order, landmarks, and a `lang` on `<html>`.
- Every interactive element is a real `<button>`, `<a>` or form control with a name (icon buttons get an `aria-label`).
- AA contrast for text. Visible focus rings.
- Use `aria-live` only for meaningful changes: announce the new chapter's name, not every scroll frame of a counter.
- Animated numbers keep their final value in a visually hidden span.

## 6. Fast (mobile Lighthouse: performance ≥ 90)

- **Images:** go through `npm run images -- <slug>` (800w and 1600w, AVIF and WebP, width and height set). Only the LCP image is `priority` (eager, with `fetchPriority="high"`).
- **Heavy features start late:**
  - 3D starts when the browser is idle on desktop, and only on tap on phones or touch screens, with a poster image until then.
  - Scroll engines mount only when they're a viewport away.
  - Video gets a 720p, GOP-4 phone variant (`media.md` §5).
- **Don't preload large font families.** Keep CLS at 0 by fixing headline line breaks and reserving image boxes.
- **Forms validate on the client and show success without a network request** (it's a template).

## 7. Copyable

- **Folder isolation:** a template imports only npm packages and files inside its own `src/app/(<slug>)/` folder. It uses no `@/` aliases and nothing shared, so `npm run check` passes.
- **DESIGN.md** tells someone how to rebuild it: the `npm i …` line, the concept, the tokens, the mechanic's maths, and the files.
- **PROMPT.md** is a self-contained brief an AI agent can rebuild from, including the palette hex values, fonts, sections, the mechanic, and the quality bar.

## 8. Tested

- **Unit tests** cover the mechanic's logic (deck state, progress-from-offsets, validation, config mapping).
- **`tests/e2e/<slug>.spec.ts`** covers the signature interaction, forms, deep links or hash navigation, keyboard handling, and phone behaviour.
- **Add the template's path to `TEMPLATE_PATHS` in `tests/e2e/templates.ts`.** That gives it the shared overflow (375px) and reduced-motion checks for free.

## Anti-patterns

- A single `page.tsx` holding all the markup, with one preview image and no tests.
- No `opengraph-image.tsx`, no Logo component, and a generic hero with a feature grid.
- A palette written in the CSS but not added to `templates.config.ts`, so the guard can't protect it.
- A mood described in DESIGN.md but missing from the page: no signature details, no mechanic.
