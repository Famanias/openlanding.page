# Pipkin: design spec

A pastel landing page for a fictional two-person jam shop. One order is followed from checkout to doorstep.

## Requirements

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 (`@import "tailwindcss"` plus `@theme static` tokens).
- `npm i lenis` (the only extra dependency). Everything else is CSS and SVG; there are no photographs and no image files.
- Folder-isolated: imports only npm packages and files inside `src/app/(pipkin)/`. No `@/` aliases.
- Fonts through `next/font/google`: Bagel Fat One (display), Nunito (body), Sometype Mono (labels).
- Palette is guarded by `scripts/templates.config.ts`; `npm run check` fails any hex outside it.

## Concept

**Every small shop has a trip between "order placed" and "on the doorstep", so the page follows one jar along that trip.**
A sticky stage slides five illustrated scenes sideways while a single jar (later a box) rides the route:
order pings the kitchen phone, the pot goes on, the box is packed, the courier collects, the box lands on a doorstep.
Around it the page behaves like a real small shop: a shelf of six flavours, a box builder with a live total, and a Friday email list.

## Palette

Eight colours, all pastels except the ink. Tints come from `color-mix()` of these only.

| Token | Hex | Role |
|---|---|---|
| `--color-cream` | `#FFF8EC` | paper, jar glass, inputs |
| `--color-plum` | `#3B2A47` | ink: all text and every outline (AA on every pastel) |
| `--color-blush` | `#FFD6E2` | tint, shelf ground, rare highlight |
| `--color-bubblegum` | `#FF9DBB` | the one action colour: primary buttons, the highlight pill |
| `--color-butter` | `#FFEBA6` | lids, box, batch-day ground |
| `--color-mint` | `#CBEBDA` | leaf, success, list ground |
| `--color-sky` | `#CDE5F8` | order scene, box-builder ground |
| `--color-lilac` | `#E3D8F6` | plum jam, notes ground |

Muted text is `color-mix(in srgb, plum 76%, cream)`.

## Type

| Role | Font | Use |
|---|---|---|
| Display | Bagel Fat One 400 | h1/h2/h3, prices, wordmark. `clamp()` sizes: h1 2.9–6.4rem, h2 2.1–4rem |
| Body | Nunito (variable) | copy 17px/1.6, weight 600–800 |
| Utility | Sometype Mono | eyebrows, step lines, tags, tracker, SVG labels (11–13px, uppercase, tracking .1em) |

Headlines are split into word masks (`SplitText`). Words in `[[double brackets]]` get the bubblegum highlight pill.

## Layout

- `.pk-wrap` 1180px max, 16px gutter (32px from 720px). Sections are rounded slabs (56px top radius) that overlap the previous section by 56px, each on its own pastel ground.
- Order: header, hero, flavour band, **the trip** (pinned, 520vh), shelf (blush), box (sky), batch day (butter), notes (lilac), questions (cream), Friday list (mint), footer (plum).
- Everything is pill-shaped or heavily rounded: 999px for controls, 28–56px for cards and slabs.

## The mechanic: the trip

`trip/progress.ts` (pure, tested in `progress.test.ts`):

- `sectionProgress(scrollY, top, height, vh)` is 0 when the section's top reaches the viewport top and 1 when its bottom reaches the viewport bottom.
- `dwell(p, stops)` maps that to `s` in `0..4` and eases each segment with a double smoothstep, so the page lingers on every stop.
- `nearestStop(s)` gives the discrete stop used for captions, `aria-live`, the tracker and the traveller's state.

`TripStage.tsx` writes `--s` and `--p` onto `.pk-stage` from **one rAF-throttled scroll listener** (no React state per frame). `setStop` fires only when the stop changes.

CSS does the rest (`trip.css`):

- `.pk-strip` is 500% wide and `translateX(calc(var(--s) * -20%))`.
- Each scene gets `--d = s - i` and focus `--f = max(0, min(1 + d, 1 - d))`. Near props shift `d * -90px`, mid `d * -36px`, far `d * 64px` (parallax). Notification, ladle, stream, steam, banner, confetti, road and wheels are all functions of `--d`/`--f`.
- The jam level is `--lvl = clamp(0, (s - 0.7) / 0.6, 1)`.
- The traveller (jar and box) is an SVG overlay with the same viewBox and crop as the scenes. Which pieces show is a CSS state machine on `data-stop` (ghost → filling → lidded in open box → closed box on the van bed → box open, jar popped). Every change is a plain transition, so it can reverse mid-scroll. A settle (squash and stretch) replays on each stop by alternating two identical keyframe names (`pk-settle-a`/`-b`) by stop parity.

Fallbacks: `data-mode="flow"` (reduced motion, or no JavaScript) stacks the five scenes as cards with captions, all visible, each with its own static traveller. `#trip-3` deep-links to stop 3. The rail jumps to a stop via the `pk:scrollto` event handled by `SmoothScroll`.

Other tested logic: `box/logic.ts` (box reducer: add, remove, grow to the next size, trim on shrink; totals: $9 a jar, $1/$4/$12 off at 3/6/12 jars, free shipping from 6) and `forms/validation.ts`.

## Motion

**Personality: organic / analog, expressive.** Primary verb *settle*, secondary *wobble* (with *unfurl* for lids and reveals). Things drop in with a squash and settle on a spring, idle objects sway and breathe at long, out-of-phase periods, and nothing is mechanical.

**Signature moment:** the last stop. The closed box arrives on the doorstep, the lid lifts off and lands beside it with a spring, the jar pops up and settles, sparkles twinkle in, the banner reads "Delivered", and the tracker flips.

### Tokens (`pipkin.css`, `@theme static`)

- Easings: `--ease-out` `cubic-bezier(.23,1,.32,1)`, `--ease-out-expo` `cubic-bezier(.16,1,.3,1)`, `--ease-in-out` `cubic-bezier(.77,0,.175,1)`, `--ease-spring` `linear(0, .35 8%, .82 20%, 1.06 30%, 1.02 42%, .99 58%, 1)`.
- Durations: instant 90, fast 180, base 420, slow 800, hero 1200 ms. Reveal shift 28px, stagger 70ms (mask words 45ms).

### Reveal vocabulary

Mask-rise words (headlines), wipe-in highlight pills, slide-in eyebrows, rise (ledes, FAQ), scale-settle (box), pop with a tiny rotation on a spring (stats, week), line draw (week line), clip-path unfurl (ticket), circle wipe (list success, mobile menu), count-ups (stats). Hidden pre-reveal states exist only under `prefers-reduced-motion: no-preference`; a `<noscript>` override and the reduced-motion block make everything visible and finished.

### Motion map

| Element | Enter (load or scroll) | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
|---|---|---|---|---|---|
| Header | drops in at 150ms, nav items staggered 50ms | compresses (blur, border) after 80px; hides on scroll-down, returns on scroll-up | sliding blush indicator follows hover/focus and the active section; Magnetic Order button | cart count bumps on a spring; menu toggle morphs to ✕ | n/a (fixed) |
| Mobile menu | circle clip-path opens from the toggle, links stagger in | n/a | focus ring on links | closes on Esc or link tap; focus trapped and returned | circle wipe closes |
| Progress bar | n/a | `scaleX(var(--page-p))` | n/a | n/a | n/a |
| Hero | background settles (scale 1.06→1), order pill rises, headline masks rise word by word, highlight pill wipes in, copy, CTAs, facts, jars drop and settle on springs, chips and sparkles pop | art and copy drift up and copy fades (`view()` timeline) | CTAs magnetic with a left-to-right fill wipe and arrow nudge | CTA press squash (`scale .96`) then spring release | copy and art lift away as the band and trip slide over |
| Order dot, blobs, jars (ambient) | start after 900ms | n/a | n/a | n/a | three loops only (blobs drift, jars breathe, order dot pings); paused off-screen by `PauseOffscreen`, off under reduced motion |
| Flavour band | slides in from the right on view | marquee drifts only while on screen | pauses on hover/focus | n/a | rotated band overlaps hero bottom and trip top |
| Trip head and rail | pinned with the stage (no reveal: it is already on screen when the section pins) | pinned | rail buttons lift on hover; the active stop is bubblegum | rail button press squash; jump scrolls smoothly (Lenis) | n/a |
| Trip stage | scenes slide in sideways | `--s`/`--p`: strip translate, 3-layer parallax, jam level, notification, ladle, stream, wheels, road, confetti | n/a | stop change replays settle squash and toggles the traveller state | scenes hand off by sliding with their ground colours; stage unpins into the shelf |
| Tracker pill, route bar | text re-enters on each stop | route fill `scaleX(var(--p))`, rider moves with it | n/a | route dots turn butter and pop when reached | n/a |
| Caption | title, line and body rise on each stop | n/a | n/a | `aria-live` announces the new stop | n/a |
| Trip flow mode (reduced motion / no JS) | all five cards visible | none | none | none | none |
| Section heads | eyebrow slides left, title masks rise word by word, highlight wipes, lede rises | n/a | n/a | n/a | content scales to .96 and fades as the next slab overlaps |
| Shelf filters | rise in | n/a | fill and 2px lift | press squash; `aria-pressed` fills bubblegum | n/a |
| Flavour cards | staggered pop-in on filter change | n/a | tilt ±6° with spotlight glow; art scales 1.1 and tilts; neighbours dim to .62 | Add button wipes, press squash, "×n" badge bumps | n/a |
| Box illustration | scale-settle on view | n/a | n/a | filled slots drop in with squash; size change regrids; notice text slides down | n/a |
| Box size toggle | with the panel | n/a | focus ring | thumb slides between sizes on a spring | n/a |
| Flavour rows, steppers | with the panel | n/a | row tints; stepper fills butter | − / + press shrink; count bumps; row highlights when it has jars | n/a |
| Total | with the panel | n/a | n/a | total bumps whenever it changes; discount row fades in | n/a |
| Place order button | with the panel | n/a | magnetic, fill wipe | loading: spinner and label swap; disabled until a jar is in | panel fades up, ticket unfurls downward (clip-path) |
| Order ticket | clip-path unfurl, check pops and draws, lines rise in sequence | n/a | buttons as above | "Start another" resets with the reverse transition | n/a |
| Batch stats | pop with rotation on a spring, staggered; numbers count up | n/a | n/a | n/a | n/a |
| Week strip | line draws left to right, day pills pop in sequence | n/a | pill lifts and tilts | n/a | n/a |
| Notes rows | start drifting once in view | two rows drift in opposite directions | pause on hover or focus; card lifts and tilts | n/a | n/a |
| FAQ | items rise in sequence | n/a | plus icon fills butter | grid-rows height animation, plus rotates, answer fades; one open at a time | n/a |
| Friday list form | fields rise with the card | n/a | focus ring in bubblegum, floating label rises | invalid fields shake once and show a sliding message; pill radios scale; submit morphs to a spinner | form fades, circle wipe reveals the success card, check draws |
| Footer | wordmark rises through a mask | n/a | links draw an underline | n/a | slab overlaps the list section |

## Signature details

1. **Order tracker pill** on the stage that reads "Your jar · Cooking" and flips at each stop, with a route bar and a little jar riding along it.
2. **The highlight pill** behind one headline word in every section, wiped in after the words rise.
3. **Lid numbers** ("No. 01") pencilled on every jar and shown on shelf cards and box slots.
4. **Ticket stub** success states for the box order and the Friday list, in the shop's own voice.
5. **The week strip** (Mon–Fri) that mirrors the trip's calendar.

## Do / Don't

Do: keep every outline plum and every fill a palette pastel; keep shapes pill-round; draw all art in SVG; use springs for press and settle; write copy with real numbers (36 jars, 72 hours, 31 countries).
Don't: add textures, halftone, photo collages or brutalist/utilitarian styling; add new hues or gradients; hide content in CSS outside `no-preference`; animate layout properties; use hover as the only way to reach information.

## Files

```
src/app/(pipkin)/layout.tsx           fonts, metadata, noscript override
src/app/(pipkin)/pipkin/
  page.tsx                            server composition inside <OrderProvider>
  pipkin.css  trip.css  shop.css      tokens + base + hero/header; the trip; shop sections
  brand/        Logo, Jar (JarArt + Jar), Marks
  data/         shop.ts (+ test): flavours, stops, stats, week, notes, FAQ
  box/          logic.ts (+ test), OrderContext.tsx
  trip/         progress.ts (+ test), TripStage, Traveler, scenes (5 SVG scenes)
  sections/     Header, Hero, FlavorBand, Shelf, BoxBuilder, BatchDay, Notes, Faq, Footer, SectionHead
  forms/        validation.ts (+ test), ListForm.tsx
  motion/       math.ts (+ test), useReducedMotion, useInView, Reveal, SplitText, Magnetic, TiltCard, Marquee, CountUp, ScrollProgress, SmoothScroll, PauseOffscreen
  assets.tsx, assets.generated.ts     optional photo helper (unused: the page has no photos)
  icon.svg, opengraph-image.tsx
tests/e2e/pipkin.spec.ts
docs/image-prompts/pipkin.md
```

## Imagery

There are no photographs. Every picture is SVG: five scenes, the jar, the box, sparkles, hearts, clouds, leaves. `docs/image-prompts/pipkin.md` holds optional photo prompts; drop results in `assets/incoming/pipkin/` and run `npm run images -- pipkin` to use them with `<Picture assetKey="…" />`.
