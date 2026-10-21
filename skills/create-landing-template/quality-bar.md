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

- The page is composed from folders: `brand/`, `sections/` (or `slides/`, `chapters/`), the mechanic's own folder (`deck/`, `ascent/`, `dish/` …), `motion/` (reveal, split-text, magnetic, tilt, scroll-progress primitives), `forms/`, and `assets.tsx`.
- **Typical size is 25–40 files and about 2,000–3,000 lines.** A 7-file template is a sign the concept wasn't built out.
- Data that drives the page (products, menus, camps, slides) is typed, lives in a `.ts` file, and is tested.

## 4. Motion: premium, alive, and meaningful

The full playbook is in `motion-system.md`. The page must never feel static, and a plain fade-in does not count as animation.

**Coverage: nothing ships static.**
- **A written motion identity:** a personality, two verbs, easing and duration tokens, and one signature moment, all in DESIGN.md's Motion section.
- **A motion map** in DESIGN.md with every section and component filled in: enter, scroll-linked, hover/focus, press/state change, exit/handoff. An empty cell means it ships static.
- **A choreographed hero load** (staggered logo, nav, masked headline, CTAs, signature detail), not one fade.
- **Varied reveals:** at least four distinct types across the page (mask-rise text, clip-path image wipes, drawn lines, staggered card cascades, count-ups…). Opacity alone is never a reveal.
- **Scroll behaviour:** smooth scroll, a progress indicator, at least one parallax or pinned/scrubbed scene, and visible handoffs between adjacent sections. A reactive header.
- **Every interactive element has all its states:** rest, hover, focus-visible, pressed, disabled, plus loading and success for forms. Cards lift, glow or tilt; buttons respond to the press; the nav indicator slides; menus, tabs and accordions animate; the form's success is a choreographed transition.
- **Ambient life:** restrained idle motion (marquee, drift, breathing, live readout), at most three continuous animations in view, paused off-screen.
- **One signature moment** the user will remember, tied to the central idea. The rest of the motion supports it.

**Craft rules.**
- **Animate `transform`, `opacity` and `clip-path`.** A short one-shot `filter: blur` on an entrance is allowed (≤ 12 px, removed afterwards). Never animate `width`, `height`, `top`, `box-shadow`, or blur on things that move often.
- **Every reversible motion is interruptible:** CSS transitions keyed on `data-state` beat fire-and-forget timelines.
- **Use easing, duration and stagger tokens in `@theme`;** don't scatter cubic-beziers or raw millisecond values in components.
- **Scroll- and pointer-driven values are written to CSS custom properties from one rAF loop,** never to React state.
- **Under `prefers-reduced-motion`, everything is visible and finished-looking,** with no content hidden behind an animation, no parallax, no smooth scroll, no ambient loops. Heavy engines (3D, scroll video) must never mount; prove it with a test. Hidden pre-reveal states are applied only under `no-preference`, so no-JS users also see everything.
- **Touch:** hover-only effects have a press or in-view equivalent; magnetic, tilt and cursor effects are off.
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

- **Unit tests** cover the mechanic's logic (deck state, progress-from-offsets, validation, config mapping) and the motion maths (`motion/math.test.ts`: clamp, lerp, progress, stagger).
- **`tests/e2e/<slug>.spec.ts`** covers the signature interaction, forms, deep links or hash navigation, keyboard handling, and phone behaviour. It also covers motion: reveals flip to `data-in="true"` on scroll, hover and press change state, the form success transition runs, and under `reducedMotion: "reduce"` every `[data-reveal]` element is visible.
- **Add the template's path to `TEMPLATE_PATHS` in `tests/e2e/templates.ts`.** That gives it the shared overflow (375px) and reduced-motion checks for free.

## Anti-patterns

- A single `page.tsx` holding all the markup, with one preview image and no tests.
- No `opengraph-image.tsx`, no Logo component, and a generic hero with a feature grid.
- A palette written in the CSS but not added to `templates.config.ts`, so the guard can't protect it.
- A mood described in DESIGN.md but missing from the page: no signature details, no mechanic.
- **A static-feeling page:** every section a plain fade-in on scroll, hover effects limited to colour changes, hard cuts between sections, no scroll behaviour, no load sequence, no pressed or success states.
- One reveal style copy-pasted everywhere, or motion that has nothing to do with the brand's idea.
- Hiding content in CSS regardless of `prefers-reduced-motion`, or animating layout properties and causing jank or CLS.
