# CHINAGRAPH — marked for keeps

A landing page for a fictional London label that cuts tailoring and outerwear from deadstock cloth and shoots each collection on one roll of medium-format film, at night, with direct flash. **A campaign is edited on a contact sheet, so the page is a contact sheet you edit as you scroll: a loupe sweeps the roll, a grease-pencil loop closes around six selects, and each select enlarges from its square to full screen in a strobe flash.**

## Requirements

- Next.js 16.4 App Router (route group with its own root layout, `next/font/google`, `next/og`), React 19, TypeScript, Tailwind CSS v4.
- `npm i lenis` (already a repo dependency; dynamically imported on fine pointers only). Nothing else: the mechanic is DOM + CSS transforms in one rAF loop per scene.
- Folder isolation: imports only npm packages and files inside `src/app/(chinagraph)/`.
- **Image-led.** 28 AI-generated stills (`docs/image-prompts/chinagraph.md`), keyed in `content/media.ts`. Every slot renders a labelled film-frame placeholder until its file is processed with `npm run images -- chinagraph`; the page must look intentional either way.
- Complete with JavaScript disabled, with `prefers-reduced-motion: reduce`, on short screens (< 560 px tall) and at 375 px: the sheet shows every select marked and the looks stack as ordinary full-bleed sections.
- Mobile Lighthouse: performance ≥ 90, accessibility ≥ 95, best practices 100, CLS 0.

## Concept

- **Brand:** CHINAGRAPH, London. Tailoring and outerwear from mill ends, surplus and tannery seconds. One collection a season, one roll of 12 frames, six selects, six looks. Named after the grease pencil editors use to mark contact sheets.
- **Collection:** 07, "Concrete Flash", AW26.
- **Slogan:** "Marked for keeps."
- **Voice:** clipped, specific, a little dry. Fabric weights, mills and years instead of adjectives ("Navy melton, 680 g. Huddersfield mill end, 1968.").

## Palette

Three colours. The photographs carry everything else. Tints are `color-mix()` of these.

| Token | Hex | Role |
|---|---|---|
| `--color-film` | `#0C0C0B` | ground, film rebate, text on the flash-white shop |
| `--color-flash` | `#F4F3EF` | text, the contact-sheet paper, the shop section, the strobe |
| `--color-grease` | `#F3C318` | grease-pencil marks only: select loops, the loupe, active indicators, form errors on black |

## Type

- **Display:** Big Shoulders 800/900 (`--font-big-shoulders`), uppercase, line-height 0.82, tracking −0.01em. h1 `clamp(4rem, 13vw, 12.5rem)`.
- **Body:** Public Sans 400/500/600 (`--font-public-sans`), 16–17 px.
- **Utility:** Overpass Mono 400/500 (`--font-overpass-mono`, `preload: false`), 10–11 px uppercase: frame numbers, film-edge print, prices.

## Layout

- Dark page, full-bleed imagery, 12-column grid (max 1440 px, gutter `clamp(16px, 3.5vw, 48px)`). Radius 2 px on buttons and inputs, 4 px on cards and the sheet paper.
- Order: Header → Sheet (`#sheet`, the pinned hero) → Looks (`#looks`, six sticky full-bleed looks) → Cloth (`#cloth`) → Shop (`#shop`, flash-white) → Request (`#request`) → Footer.

## The mechanic

1. **The sheet (`sheet/roll.ts`, pure, tested).** `SWEEP 0.04–0.68` of the pinned scroll moves the loupe across the 12 frames (`loupeAt`, `frameAt`) and draws each select's loop while the loupe is over it (`markAt`). `ENLARGE 0.74–0.96` enlarges frame 02 (`enlargeAt`, cubic in-out) and `flashAt` peaks as it lands. `flipToSquare(cell, stage)` returns the transform that maps a stage-covering square (side = the stage's longer edge) onto the frame's cell; `lerpFlip` animates it to identity, so the enlargement is transform-only. `counterAt` feeds the header's frame counter.
2. **`sheet/SheetController.tsx`** (the one client leaf): measures cell centres and the first select's cell on resize, computes progress with `progressFromOffsets` in one rAF per scroll, and writes `--cg-p`, `--cg-enlarge`, `--cg-flash`, the loupe's `--lx/--ly`, each select's `--mark`, the enlarger's `--fx/--fy/--fs`, and `[data-frame-counter]` text.
3. **The looks (`looks/stack.ts`, pure, tested).** Six sticky 100svh looks in one container; `lookArrivals(scrollY, top, vh, n)` gives each look's arrival (look 1 is already there, because the sheet enlarged into it). `looks/LookStack.tsx` writes `--arrive`, `--leave` (the next look's arrival), `--flash` (`flashCurve(arrive, .82, 1)`) and `--detail` per look, and the counter.
4. **CSS does the drawing.** Marked loops, a hidden enlarger, finished looks and visible info are the defaults. The pinned heights, sticky stages, undrawn loops and arrival-driven states exist only inside `@media (prefers-reduced-motion: no-preference) and (scripting: enabled) and (min-height: 560px)` (the same string is `LIVE_QUERY`).

## Motion

- **Personality:** technical / cinematic. **Verbs:** *focus-pull* (an image settles from `scale(1.1)` and a ≤10 px one-shot blur to sharp) and *flash* (a white strobe that peaks and decays between scenes).
- **Signature moment:** frame 02 enlarging from its 1/12 square to full screen while the strobe peaks, handing off seamlessly to Look 01.
- **Tokens:** `--ease-out cubic-bezier(.22,1,.36,1)`, `--ease-out-expo cubic-bezier(.16,1,.3,1)`, `--ease-in-out cubic-bezier(.65,0,.35,1)`, `--ease-strobe cubic-bezier(.1,.9,.2,1)`, `--ease-spring` (press release only); durations 90/200/500/900/1400 ms; `--reveal-shift: 32px`; `--stagger: 70ms`.
- **Load (CSS keyframes):** 0 ms the strobe fires once over a black screen and decays (300 ms) → 150 ms the wordmark and nav drop → 260 ms the h1 lines mask-rise → 560 ms lead, CTAs and counter rise → 620 ms the sheet paper wipes up and the three film strips slide in from alternating sides → 1100 ms the grain starts drifting.

### Motion map

| Element | Enter | Scroll-linked | Hover / focus | Press / state | Exit / handoff |
|---|---|---|---|---|---|
| Header | drops in at 150 ms | backdrop after 24 px; hides on scroll-down; inverts over the shop (`data-tone="light"`); counter text follows the frame | indicator slides to the hovered link | menu clip-path circle; bag popover scales from the button | hides on scroll-down |
| Frame counter | rises at 560 ms | rewritten by both scene controllers | — | dot blinks on frame change | — |
| Sheet copy | h1 mask-rise, lead/CTAs rise | fades and lifts with `--cg-enlarge` | CTA fill wipes, label rolls, magnetic | press `scale(.97)`, spring release | gone before the flash |
| Contact sheet | paper wipes up, strips slide in alternately | loupe glides between cell centres; the frame under it lifts 6% and brightens; select loops draw with `--mark` | frames lift and show their number (fine pointers) | — | the first select enlarges to full screen; the sheet dims to 0.2 |
| Strobe | load flash | peaks with the enlargement and on each look's arrival | — | — | decays into the next scene |
| Looks | (look 1 inherits the enlargement) | each slides over the last; image focus-pulls from 1.14 and parallaxes; previous look darkens; info rises from `--arrive`; detail card wipes with `--detail`; rail circles the frame | detail card lifts; CTA fill wipe | CTA press | next look covers it |
| Cloth strip | heading mask-rise; cards focus-pull in a cascade; metres count up | — | image scales 1.06, caption slides up | drag with inertia (native scroll-snap), arrow buttons press | the shop wipes up over it |
| Shop | white field wipes up (view timeline, IO fallback); cards rise in a cascade | — | flat lay wipes to the on-model frame; size chips invert | size chips select; Add to bag → "Adding" → "In the bag ✓", bag count pops; sold-out sizes disabled | — |
| Request form | card wipes up; fields rise | — | floating labels, underline draws in grease yellow | invalid fields shake once, message slides; submit "Exposing…" → slip prints, KEEP loop draws | form wipes away |
| Footer | wordmark mask-rises | edge-print marquee drifts (pauses on hover/focus/off-screen) | links underline in and out | — | — |

Ambient (max three in view): film grain drift, counter dot, edge-print marquee. All stop under reduced motion.

## Signature details

1. **Film-edge print:** mono strings along every film strip and the footer ("CHINAGRAPH 120 ▸ 07 ▸ 4A").
2. **Grease-pencil loops** in yellow around selects, on the look rail, the active nav item and the KEEP slip.
3. **The frame counter** ("Frame 04 / 12") in the header, live across the sheet and the looks.
4. **Cloth provenance lines:** mill, year and metres under every fabric and product.

## Do / Don't

- Do let photographs carry colour. The UI stays black, white and one yellow.
- Do keep yellow for marks and the single active state; never for body text on white.
- Don't put pointer tilt on cards that hold buttons (the card moves under the click).
- Don't clip the element an IntersectionObserver watches; clip its child.
- Don't write `#` followed by digits in copy (the palette guard reads it as a colour): "No. 0412".

## Files

```
src/app/(chinagraph)/layout.tsx
src/app/(chinagraph)/chinagraph/
  page.tsx  chinagraph.css  DESIGN.md  PROMPT.md  icon.svg  opengraph-image.tsx  assets.tsx  assets.generated.ts
  brand/Logo.tsx
  motion/      math(.test).ts useReducedMotion useInView Reveal SplitText Magnetic Marquee CountUp SmoothScroll
  sheet/       roll(.test).ts ContactSheet.tsx SheetController.tsx GreaseLoop.tsx
  looks/       stack(.test).ts LookStack.tsx Look.tsx
  content/     looks.ts products.ts cloth.ts media.ts content.test.ts
  shop/        bag(.test).ts store.ts ProductCard.tsx BagButton.tsx
  forms/       validation(.test).ts SheetRequestForm.tsx KeepSlip.tsx
  sections/    Header Sheet Looks Cloth Shop Request Footer
```

## Imagery

28 stills in four sets: `roll-01…12` (1:1), `detail-01…06`, `cloth-01…04`, `flat-01…06` (4:5). One night, one model, one direct flash, brutalist concrete; the garment is the only strong colour. Full prompts, the shared style preamble and the consistency workflow (generate `roll-02` first, use it as the style and character reference) are in `docs/image-prompts/chinagraph.md`.
