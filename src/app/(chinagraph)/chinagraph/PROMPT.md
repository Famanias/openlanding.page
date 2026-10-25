# Prompt: rebuild "CHINAGRAPH" (an image-led fashion label edited on a contact sheet)

Paste everything below the line into your AI coding agent.

---

Build a landing page in **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4** for a fictional London fashion label called **CHINAGRAPH**: tailoring and outerwear cut from deadstock cloth, shot each season on one roll of medium-format film, at night, with direct flash. Current release: **Collection 07, "Concrete Flash", AW26**. Slogan: **"Marked for keeps."** The label is named after the grease pencil editors use to mark selects on a contact sheet.

The page is **image-led**: 28 AI-generated stills carry it. Build on labelled placeholders first; the images drop in by filename later.

## The central idea

A campaign is edited on a contact sheet, **so the page is a contact sheet you edit as you scroll**. A loupe sweeps one roll of 12 square frames, a hand-drawn grease-pencil loop closes around each of six selects, and frame 02 enlarges from its square to full screen in a white strobe flash, handing off seamlessly to the first of six full-screen looks.

## Brand

- **Palette (three colours; tints via `color-mix()`):** film black `#0C0C0B` (ground), flash white `#F4F3EF` (text, the sheet paper, the shop section, the strobe), chinagraph yellow `#F3C318` (grease-pencil marks, the loupe, the active indicator, form errors only). Photographs carry all other colour.
- **Type (`next/font/google`, distinct variable names):** Big Shoulders 800/900 uppercase for display (line-height 0.84), Public Sans 400/500/600 for body, Overpass Mono 400/500 (`preload: false`) for frame numbers, prices and film-edge print.
- **Geometry:** 2 px radius on buttons/inputs, 4 px on cards and the sheet. A fixed, stepped film-grain layer over everything (an SVG `feTurbulence` tile, opacity 0.06).
- **Logo:** a square film frame with a yellow grease-pencil loop drawn round it + "CHINAGRAPH" in Big Shoulders 800. Also `icon.svg` and a 1200×630 `opengraph-image.tsx` (black, the wordmark, a 3×4 sheet with yellow loops on the selects).

## Images (`docs/image-prompts/<slug>.md`, `content/media.ts`)

- `roll-01…roll-12` (1:1): the roll. Selects are frames **2, 4, 5, 7, 10, 12**; they become the looks, so subjects sit in the centre two thirds.
- `detail-01…06` (4:5) close crops, `cloth-01…04` (4:5) fabric macros, `flat-01…06` (4:5) flat lays on concrete.
- One shared style preamble (night, 6×6 film, harsh direct flash, hard shadow, brutalist concrete, grain, no text/logos) and one model description in every people prompt; generate `roll-02` first and use it as the style + character reference.
- A `Picture` component fills its positioned parent (`object-fit: cover`) and, until a still is processed, renders a flash-lit film-frame placeholder (an elliptical radial "flash" positioned per key, a soft silhouette, and a mono label "roll-02 · awaiting print"). Empty `alt` = decorative duplicate → `aria-hidden` placeholder.

## Sections

1. **Header:** logo, a live **frame counter** ("Frame 04 / 12"), nav (Sheet, Looks, Cloth, Shop, Request) with one yellow indicator that slides, and a **Bag** button with a count that pops and a popover (lines, remove, subtotal, "checkout off in this template"). Hides on scroll-down, inverts to light over the shop, yellow progress hairline. Below 1080 px a full-screen menu opening with a clip-path circle.
2. **Sheet (`#sheet`, the hero):** left: eyebrow, h1 "Marked / for keeps.", lead, CTAs (See the six looks, Shop the collection), counter cue. Right: the contact sheet: flash-white paper, a header row ("Chinagraph 120 · Roll 07 · 12 exp · pushed +1"), three black film strips of four square frames with mono edge print above and below, frame numbers, and a yellow `GreaseLoop` SVG (pathLength 1, tilted per frame) round each select. A loupe ring with crosshair ticks.
3. **Looks (`#looks`):** six full-bleed looks (Box Coat £640 navy melton, Work Jacket £420 black waxed cotton, Pleat Trouser £290 charcoal flannel, Rollneck £260 bone boiled wool, DB Suit £980 rain-grey gabardine, Car Coat £1,120 oxblood leather offcuts), each with a mini 12-square rail circling its frame, "Look 02 · Frame 04 / 12", a giant name, cloth / origin / price, a note, a "Shop the …" button and a close-crop detail card.
4. **Cloth (`#cloth`):** "Cut from what was left.", a counter to **1,140 m** of deadstock, a horizontal snap strip of four macros (Melton, Huddersfield 1968, 420 m; Waxed cotton, Dundee 1994, 260 m; Flannel, Biella 2011, 300 m; Gabardine, Lancashire 1979, 160 m) with drag on fine pointers and arrow buttons.
5. **Shop (`#shop`, flash-white):** six product cards: flat lay that wipes to the on-model roll frame (hover on fine pointers, or an "On model" toggle everywhere), native radio size chips with sold-out sizes disabled and struck, an add button that goes "Pick a size" → "Add to bag · £640" → "Adding" → "In the bag ✓". One in-memory bag store (`useSyncExternalStore` + a tested reducer).
6. **Request (`#request`):** "Get the sheet in the post." A form (name, email, street, city, country select, "who is it for" chips) with local validation, a one-shot shake and focus on the first error; submit → "Exposing" → a print slip ("It's on the drying line.", run number `No. 0412` from a stable hash, rows printing in, a yellow loop drawn round KEEP). No network request.
7. **Footer:** a film-edge marquee, stockists (London studio, Antwerp, Copenhagen, Tokyo), links, small print ("fictional label, AI-generated photographs"), a giant wordmark.

## The mechanic

- `sheet/roll.ts` (pure, tested): `SWEEP 0.04–0.68` → `frameAt`, continuous `loupeAt`, `markAt(p, n)` (a select's loop draws while the loupe is over it); `ENLARGE 0.74–0.96` → `enlargeAt` (cubic in-out); `flashAt` peaks at 0.96 and is **0 at p = 1** (pinned progress clamps there); `counterAt`; `flipToSquare(cell, stage)` maps a stage-covering square (side = longer stage edge, centred) onto the frame's cell, and `lerpFlip` animates it to identity, so the enlargement is transform-only.
- `SheetController` (client leaf) measures cell centres and the first select's cell (again after the load animation settles), runs one rAF per scroll, and writes `--cg-enlarge`, `--cg-flash`, `--lx/--ly`, per-loop `--mark`, `--ex/--ey/--es`, `data-under` on the frame under the loupe and the `[data-frame-counter]` text.
- `looks/stack.ts` (pure, tested): `lookArrivals(scrollY, top, vh, n, lead)` and `lookFlash(arrive)` (0 at arrival 1). The looks container has `margin-top: -100svh` and sits **under** the sheet (z-index), so when the sheet's pinned stage releases, Look 01, the same square crop of `roll-02` at identity, is already behind it; Look 01 holds for one viewport (`lead = 1`, `margin-bottom: 100svh`), then each sticky look slides over the last. `LookStack` writes `--arrive`, `--leave`, `--flash`, `--detail` per look.
- **Finished is the default CSS.** Marked loops, a hidden enlarger and fully arrived looks need no JS. The 440svh sheet, sticky stages, undrawn loops, the loupe and the enlarger exist only inside `@media (prefers-reduced-motion: no-preference) and (scripting: enabled) and (min-height: 560px)` (same string as `LIVE_QUERY`). Below 1024 px portrait the copy stacks above a bottom-anchored sheet sized by the remaining height.

## Motion

- **Personality:** technical / cinematic. Verbs: **focus-pull** (scale 1.1 + ≤10 px one-shot blur → sharp) and **flash** (a white strobe that peaks and decays).
- **Tokens:** `--ease-out cubic-bezier(.22,1,.36,1)`, `--ease-out-expo cubic-bezier(.16,1,.3,1)`, `--ease-in-out cubic-bezier(.65,0,.35,1)`, `--ease-strobe cubic-bezier(.1,.9,.2,1)`, `--ease-spring` (press release); durations 90/200/500/900/1400 ms; `--reveal-shift: 32px`; `--stagger: 70ms`.
- **Load:** a strobe fires and decays, header items drop, h1 lines mask-rise, lead/CTAs rise, the sheet paper wipes up and the strips slide in from alternating sides, the grain starts.
- **Signature moment:** frame 02 enlarging to full screen as the strobe peaks.
- **Reveals:** mask-rise headings, rise, slide, scale cascades, focus-pull (on the child), wipe (on the child: never clip the element an IntersectionObserver watches). The shop opens from a framed print to full bleed with `animation-timeline: view()`.
- **States:** buttons wipe a fill up and roll their label, press 0.97; frames lift; detail cards lift; cloth images scale; product cards wipe to on-model; chips invert; the bag pops; invalid fields shake; the slip develops and KEEP is looped. No pointer tilt on cards with buttons. Hover only on fine pointers.
- **Ambient (≤ 3):** grain drift, the counter dot, the edge-print marquee (pauses on hover/focus/off-screen). Reduced motion: none of it, everything finished.

## Quality bar

Folder isolation (only npm packages + files inside `src/app/(chinagraph)/`), `lenis` dynamically imported on fine pointers. Unit tests for the roll, the stack, the bag, validation, content/media keys and motion maths; Playwright for the sweep and loops, the enlargement and stacking, the bag, reveals, the request flow, reduced motion, no-JS and a 390 px phone. Mobile Lighthouse ≥ 90 / 95 / 100, CLS 0, no horizontal overflow. Never write `#` followed by digits in copy.
