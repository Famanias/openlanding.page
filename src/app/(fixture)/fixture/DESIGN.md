# FIXTURE — your shop, fitted out properly

A landing page for a fictional five-person Shopify studio in Rotterdam that fits out stores for small, independent merchants at flat prices. **A physical shop is fitted out before it opens, so the page builds a working storefront as you scroll: shell, fixtures, wiring, signage, then the sign flips to OPEN and the first orders tick in.**

## Requirements

- Next.js 16.4 App Router (route group with its own root layout, `next/font/google`, `next/og`), React 19, TypeScript, Tailwind CSS v4.
- `npm i lenis` (already a repo dependency; dynamically imported on fine pointers only). No other runtime package: the storefront is DOM + CSS + inline SVG, the scene is one rAF loop.
- Folder isolation: imports only npm packages and files inside `src/app/(fixture)/`. No `@/` aliases.
- No photography or video. Every visual (the storefront, the stoneware, the logo, the OG image) is drawn in code.
- Complete and finished-looking with JavaScript disabled, with `prefers-reduced-motion: reduce`, and at 375 px.
- Mobile Lighthouse: performance ≥ 90, accessibility ≥ 95, best practices 100.
- Mentions Shopify only as the platform the studio works on. No Shopify logo, green or trade dress; the footer says the studio is not affiliated with Shopify Inc.

## Concept

- **Brand:** FIXTURE is a shopfitter for the internet. Five people, a studio in Rotterdam, stores across the EU and the UK. They don't sell hours, they sell fitted stages at a fixed price.
- **Slogan:** "Your shop, fitted out properly."
- **Central idea:** a shopfitter turns an empty unit into an open shop in a fixed order, so the page's hero storefront is an empty shell that assembles itself, stage by stage, as you scroll, and the price list, schedule and plans are all written in fit-out terms (stages, shelf tags, fit-out sheet, the sign).
- **Demo merchant inside the storefront:** Fennel & Clay, a stoneware studio in Utrecht.
- **Voice:** short, exact, a little dry. Numbers instead of adjectives ("5 days", "€1,800 flat", "4.1 s → 1.2 s"). Never "solutions", never "elevate".

## Palette

Seven colours, registered in `scripts/templates.config.ts`. Tints are `color-mix()` of these.

| Token | Hex | Role |
|---|---|---|
| `--color-ink` | `#121316` | text, dark slabs (Work, featured plan, footer band) |
| `--color-paper` | `#F3F2EE` | page background |
| `--color-white` | `#FFFFFF` | the storefront canvas, cards, form |
| `--color-crimson` | `#CF1F35` | the one accent: primary buttons, active indicators, SKU marks (4.8:1 on paper) |
| `--color-graphite` | `#5E6168` | muted text (5.5:1 on paper) |
| `--color-hairline` | `#D9D7D0` | rules, the Swiss grid, wireframe slots |
| `--color-till` | `#1E7A4C` | the OPEN sign and order notifications only |

## Type

- **Display:** Familjen Grotesk 500/600/700 (`--font-familjen`). Tight tracking (−0.04em), line-height 0.92, `text-wrap: balance`. h1 `clamp(2.6rem, 7vw, 7rem)`.
- **Body:** Rethink Sans 400/500/600 (`--font-rethink`), 17 px / 1.55.
- **Utility:** Martian Mono 400/500 (`--font-martian`, `preload: false`), 10.5–11 px uppercase, +0.08em. SKUs, stage numbers, readouts.

## Layout

- A 12-column Swiss grid, max width 1360 px, gutter `clamp(16px, 4vw, 56px)`. The grid's column lines are drawn as hairlines on the page background (signature detail).
- Corners: 4 px on buttons, inputs and chips; 8 px on cards and the storefront window. Nothing is pill-shaped except the status dot.
- Section order: Header → Scene (hero + fit-out, `#fit-out`) → Price list (`#prices`) → Work (`#work`, ink slab) → Schedule (`#schedule`) → Care plans (`#plans`) → FAQ (`#faq`) → Book (`#book`) → Footer.

## The mechanic: the fit-out scene

- `fitout/scene.ts` (pure, tested) holds the five `STAGES` and the scene maths: `INTRO = 0.1` of the scroll is the hero's empty plot, then each stage holds `STAGE_SPAN = 0.16`; stage 5 ends at 0.9 and the last 0.1 is the handoff while the Price list slides over.
  - `stageIndexAt(p)` → 0 (empty plot) … 5 (open). `stageLocal(p, i)` → 0–1 inside stage `i`.
  - `readoutAt(p)` → `{ loadSeconds, conversion, orders, checks }`: load time falls 4.1 s → 1.2 s across fixtures → signage, conversion rises 0.9% → 2.8% and orders 0 → 38 once open.
  - `scrollTargetFor(i, top, height, vh)` → the scroll position that shows stage `i` (used by the fit-out sheet's rows).
- `fitout/SceneController.tsx` is the one client leaf: it measures the section, computes `p` with `progressFromOffsets` in a single rAF loop, and writes `--fx-p`, `--fx-local`, `--fx-exit`, `data-stage` and `data-reached="1 2 3"` onto the section, and the readout numbers straight into text nodes. React state changes only when the stage index changes (for the `aria-live` announcement).
- **CSS does the rest.** Fitted parts are the default styles. The unfitted (wireframe) states and the sticky, 600 vh layout exist only inside `@media (prefers-reduced-motion: no-preference) and (scripting: enabled) and (min-height: 560px)` (the same string is `LIVE_QUERY` in `SceneController`), keyed on `:not([data-reached~="n"])`. With no JS, reduced motion or a viewport under 560 px tall, the page shows the finished, open shop and a fully expanded fit-out sheet.
- Below 1024 px in portrait the copy stacks above the storefront, which is anchored to the bottom of the stage and sized by the remaining height (so font swaps in the copy never move it: CLS 0); the sheet compacts to one line per row. Landscape keeps two columns.
- What each stage fits:
  1. **Shell:** the URL changes from `untitled-store-8842.myshopify.com` to `fennelandclay.com`, the lock and the "Payments live" chip snap in.
  2. **Fixtures:** the nav, the banner and the product grid snap from dashed slots into the theme, tile by tile.
  3. **Wiring:** four app chips (Reviews, Subscribe & save, Bookings, Email flows) lock onto the window; their connector lines draw; star ratings and a subscription tag appear on the tiles.
  4. **Signage:** the shipping bar wipes down, the banner headline rolls from "Welcome to our store" to the real line, the speed bar shortens.
  5. **Open:** the hanging sign flips CLOSED → OPEN, the cart count ticks, order slips snap in and cycle.

## Motion

- **Personality:** precise / clockwork. **Verbs:** *snap* (parts arrive fast and stop dead, no overshoot) and *lock* (a part settles, then a hairline or check confirms it). Wipes are the supporting move.
- **Signature moment:** stage 5. The sign flips on its hinge (rotateX 180°, `--ease-out-expo`, 600 ms), the till-green OPEN faces out, and the first order slip snaps into the window while the conversion readout counts up.
- **Tokens** (`fixture.css` `@theme`):
  - `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`, `--ease-snap: cubic-bezier(0.5, 0, 0, 1)`, `--ease-spring: linear(0, 0.35 8%, 0.82 20%, 1.04 30%, 1.01 42%, 1)` (press release only).
  - `--dur-instant: 90ms`, `--dur-fast: 180ms`, `--dur-base: 380ms`, `--dur-slow: 600ms`, `--dur-hero: 1000ms`, `--reveal-shift: 24px`, `--stagger: 60ms`.
- **Reveal vocabulary:** mask-rise headlines (`SplitText`), short rise for body, `hang` for shelf tags (drop from −24 px with −3° and lock), `draw` for shelf rails, schedule bars and rules, `wipe` (clip-path) for the Work slab and the confirmation slip, count-ups for every metric.
- **Load (CSS keyframes, no hydration wait):** 0 ms grid lines draw → 120 ms logo and nav drop (50 ms stagger) → 220 ms h1 lines mask-rise → 520 ms lead, CTAs, facts rise → 640 ms storefront window wipes open and its dashed slots draw → 900 ms status dot starts breathing.

### Motion map

| Element | Enter (load or scroll) | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
|---|---|---|---|---|---|
| Header | drops in at 120 ms, links staggered 50 ms | gains backdrop + border after 24 px; hides on scroll-down, returns on up; progress hairline `scaleX(--fx-progress)` | link colour + the crimson indicator slides to the hovered link | CTA press `scale(.97)`; menu icon morphs to ×, panel opens with a clip-path circle from the toggle | hides on scroll-down |
| Status chip | fades + slides in at 300 ms | — | — | label swaps when the hour changes | — |
| Hero copy | eyebrow slides in, h1 mask-rise by line, lead and CTAs rise | lifts −32 px and fades as stage 1 begins | CTA fill wipes from the entry side, arrow slides; magnetic on fine pointers | press `scale(.97)` with spring release | gives way to the fit-out sheet in the same column |
| Storefront window | wipes open (clip-path) at 640 ms, slots draw | the whole fit-out (above); app chips parallax at three depths | — | each stage snaps parts in; sign flips on stage 5 | scales to .95 and dims as the Price list slides over |
| Fit-out sheet | rows slide in from the left, 60 ms stagger, when stage 1 begins | active row expands (grid rows 0fr→1fr), its bar fills with `--fx-local`; completed rows lock with a drawn check | row background tint, number turns crimson | click scrolls (Lenis) to that stage | — |
| Stage numeral (ghost) | — | swaps by mask-rise per stage | — | — | — |
| Readout | count-up in place | numbers driven by `readoutAt(p)`, load bar `scaleX` | — | — | — |
| Price list tags | `hang` cascade by reading order; shelf rails draw | — | lift + swing −1.2° from the hole, spotlight follows the pointer, siblings dim (no pointer tilt: the card must not move under its button) | "Add to brief" toggles to "Added ✓" (`aria-pressed`) and sends the need to the form | — |
| Work slab | clip-path inset wipe from 4% → 0 tied to its entry (`view()` timeline, IO fallback) | — | tabs: text colour, indicator previews | tab change slides the panel from the delta's direction; Before/After thumb slides, metrics count between values, bars rescale | — |
| Schedule | stage rows rise; bars draw left → right staggered | a crimson "today" marker sweeps the weeks with the section's pass progress | row highlights, bar lifts | — | — |
| Care plans | cards rise + scale cascade | — | lift, spotlight, featured card's border glows | cycle toggle thumb slides; prices roll (old up, new in) | — |
| FAQ | questions rise staggered | — | question underline draws, plus icon nudges | plus rotates to ×, answer opens with grid rows | — |
| Book form | card wipes up; fields rise | — | input border darkens; floating label | focus: label rises, border draws crimson; invalid fields shake once and the message slides down; submit → "Checking the shelves" loading → success | the form wipes away and the fit-out slip prints line by line, BOOKED stamp snaps in |
| Footer | wordmark mask-rises; columns rise | ticker drifts against scroll direction (CSS marquee, pauses on hover/focus) | links underline draws in and exits right | — | — |

Ambient (max three in view): status dot breathing, order slips cycling (stage 5 only, paused off-screen), footer ticker. All stop under reduced motion.

## Signature details

1. **The Swiss grid**: the 12 column lines drawn as hairlines on the page, visible behind every section.
2. **SKU marks**: every service, stage and plan has a mono code (`FX-02`, `Stage 03`) set in crimson.
3. **The fit-out sheet**: a checklist that locks each stage with a drawn check; the same sheet becomes the booking confirmation slip.
4. **The sign**: CLOSED/OPEN hangs on the storefront and returns, live, as the studio-hours chip in the header (Mon–Fri 09:00–18:00 Rotterdam time, computed by `studio/hours.ts`).
5. **Order slips**: `No. 1042 · Tide mug ×2 · €68.00` notifications in till green.

## Do / Don't

- Do keep every motion fast and stopped-dead; no bounce on entrances (spring only on press release).
- Do keep crimson to one job per view: the primary action and the active marker.
- Don't use green anywhere but the OPEN sign and order slips.
- Don't write `#` followed by digits in copy (the palette guard reads it as a colour): use "No. 1042".
- Don't add photography; the storefront is the image.

## Files

```
src/app/(fixture)/layout.tsx              fonts, metadata, noscript reveal override
src/app/(fixture)/fixture/
  page.tsx  fixture.css  DESIGN.md  PROMPT.md  icon.svg  opengraph-image.tsx
  assets.tsx  assets.generated.ts          Picture placeholder (unused by default)
  brand/Logo.tsx                           mark + lockup
  motion/                                  math(.test).ts, useReducedMotion, useInView, Reveal, SplitText,
                                           Magnetic, TiltCard, Marquee, CountUp, SmoothScroll, useScrollVar
  fitout/scene(.test).ts                   stages + scene maths
  fitout/SceneController.tsx               the rAF loop → CSS variables / data attributes
  fitout/Storefront.tsx  FitSheet.tsx  Readout.tsx  Stoneware.tsx  OrderSlips.tsx
  content/services.ts plans.ts work.ts faq.ts content.test.ts
  studio/hours(.test).ts  StudioStatus.tsx
  forms/validation(.test).ts  WalkthroughForm.tsx  FitSlip.tsx  AddToBrief.tsx
  sections/Header Scene PriceList Work Schedule CarePlans Faq Book Footer
```

## Imagery

None. The storefront, the stoneware in it and every mark are coded SVG/CSS. `assets.tsx` and `docs/image-prompts/fixture.md` exist so a fork can add case-study photography later.
