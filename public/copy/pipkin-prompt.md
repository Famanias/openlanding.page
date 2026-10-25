# Prompt: rebuild "Pipkin" (a pastel jam-shop landing page that follows one jar from order to doorstep)

Paste everything below the line into your AI coding agent.

---

Build a complete, isolated landing template in **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4** for a fictional two-person jam shop called **Pipkin**. It is the kind of small shop that runs on an e-commerce platform: a shelf, a box builder, shipping you can follow. Install one extra package: `npm i lenis`. There are **no photographs**: every picture is hand-drawn SVG in the page's palette.

The page's one idea: **every small shop has a trip between "order placed" and "on the doorstep", so the page follows one jar along that trip.** It must feel alive and premium on every interaction (load, scroll, hover, press, focus, forms), never like a component kit.

## Brand

- **Voice:** warm, specific, a little cheeky. Real numbers: 36 jars a batch, 2 cooks, 72 hours stove to door, 31 countries, $9 a jar, free shipping from 6 jars. Tagline: "Cooked Tuesday. At your door Friday."
- **Palette: eight colours, nothing else.** Pastels with one dark ink. Make tints with `color-mix()` of these only; no gradients, no extra hues, no textures, no halftone, no brutalist or utilitarian styling.
  - cream `#FFF8EC` (paper, jar glass, inputs)
  - plum `#3B2A47` (ink: all text and every outline)
  - blush `#FFD6E2` (tint, shelf ground)
  - bubblegum `#FF9DBB` (the single action colour: primary buttons, the headline highlight pill)
  - butter `#FFEBA6` (lids, box, batch ground)
  - mint `#CBEBDA` (leaf, success, list ground)
  - sky `#CDE5F8` (order scene, box builder ground)
  - lilac `#E3D8F6` (plum jam, notes ground)
- **Type (all `next/font/google`, distinct CSS variable names):** **Bagel Fat One** 400 for display and prices; **Nunito** (variable, weights 600–800) for body at 17px/1.6; **Sometype Mono** 11–13px uppercase with 0.1em tracking for eyebrows, step lines, tags and SVG labels. Sizes with `clamp()`: h1 2.9–6.4rem, h2 2.1–4rem.
- **Shape:** everything is a pill or heavily rounded (999px for controls, 28–56px for cards and slabs). Every shape has a 2.5–3px plum outline.
- **Logo:** a squat jar mark (bubblegum body, butter lid, cream label, plum line) beside the word "Pipkin" in Bagel Fat One. Provide `icon.svg` and a 1200×630 `opengraph-image.tsx` (palette only).
- **Headlines** are split into word masks; one word or phrase per heading sits on a bubblegum highlight pill (an inline-block with a `::before` that wipes in).

## Structure (a folder, not one file)

Everything lives in `src/app/(pipkin)/` and imports only npm packages and its own files (no `@/` aliases). `layout.tsx` (fonts, metadata, `<noscript>` override), `pipkin/page.tsx` (server component inside an `OrderProvider`), `pipkin.css` + `trip.css` + `shop.css`, `brand/` (Logo, Jar, Marks), `data/shop.ts`, `box/` (logic, context), `trip/` (progress, TripStage, Traveler, scenes), `sections/`, `forms/`, `motion/`. Client components are leaves only. Target 40 files, about 3,000 lines.

## The sections

1. **Header:** fixed pill bar; compresses with a blurred background after 80px, hides on scroll-down and returns on scroll-up; a nav indicator that slides between links and follows the active section; a cart pill showing the jar count; a Magnetic "Order" button; below 960px a round toggle that morphs to ✕ and opens a full-screen butter menu with a circle clip-path wipe, staggered links, scroll lock, focus trap and Esc to close.
2. **Hero:** grid with copy left and art right. An "Order #0412 placed · Mon 9:41" pill, the h1 "Cooked [[Tuesday.]] At your door Friday.", a lede, two CTAs ("Build a box", "Follow a jar"), three facts. Art: a sky circle with three jars (lilac "No. 05", bubblegum "No. 01", butter "No. 02"), three chips ("Made Tuesday", "Real fruit, no pectin", "Batch No. 17") and sparkles. Four soft pastel blobs drift behind.
3. **Flavour band:** a rotated bubblegum strip with a looping marquee of six flavour pills.
4. **The Trip (the signature mechanic):** below.
5. **The Shelf:** six flavour cards (Strawberry & Basil, Meyer Lemon Marmalade, Pear & Vanilla Bean, Blueberry & Thyme, Plum & Lavender, Peach & Chamomile) with filter chips (All six / Fruity / Floral / Tangy), $9 each, an "Add to box" button.
6. **Build a Box:** size toggle (3 / 6 / 12 jars), a yellow box of slots that fill with jars, a stepper per flavour, a live total (1 jar $9; $1 off from 3, $4 off from 6, $12 off at 12; shipping $6 under 6 jars, free from 6), "Place order", loading, then a success ticket. The shelf buttons and the header counter share the same box state.
7. **Batch Day:** four count-up stats (36 jars, 2 cooks, 72 h, 1,208 notes) and a Mon–Fri week strip joined by a drawn dashed line.
8. **Doorstep Notes:** two rows of customer-note cards drifting in opposite directions, pausing on hover.
9. **Questions:** five-item accordion (height via `grid-template-rows`), one open at a time.
10. **The Friday List:** a signup form (first name, email, a "which jar do you lean towards?" pill radio group). No network: validate on the client, shake invalid fields, show a loading button, then a circle wipe to a success card.
11. **Footer:** plum slab, link columns, a giant "pipkin" wordmark that rises through a mask.

Sections are rounded slabs (56px top radius) that overlap the one above by 56px, each on its own pastel ground (cream, blush, sky, butter, lilac, cream, mint, then plum). Content scales to 0.96 and fades as the next slab slides over (`animation-timeline: view()` under `@supports`).

## The mechanic: The Trip

A tall section (`520vh`) with a `position: sticky` full-height pin. Inside, a rounded stage shows **five illustrated SVG scenes side by side** (a 500%-wide strip translated by `calc(var(--s) * -20%)`). **One jar rides the route** through them:

1. **Order placed:** a phone on the counter with a notification, a ringing bell, a receipt ticket; the jar is a dashed ghost outline. Sky.
2. **Cooking:** a lilac stockpot of bubbling jam, a stirring spoon, steam, a ladle pouring a stream; the jar fills with jam as you scroll. Butter.
3. **Packed:** tape, tissue, stickers, a pencil and a hanging "Handle with jam" tag; the jar gets its lid and sits in an open box, the box lid beside it. Mint.
4. **Out for delivery:** a pink pickup with a flat bed carrying the closed box, a scrolling road, houses and trees; wheels spin with scroll. Lilac.
5. **Delivered:** a front door, windows, a mat and a plant; the box lid lifts off and lands beside it, the jar pops up and settles, sparkles twinkle, a "Delivered · 11:20" banner appears. Blush.

Logic (pure functions with tests): `sectionProgress(scrollY, top, height, vh)` → 0..1; `dwell(p, stops)` eases each segment with a double smoothstep so the page lingers on each stop; `nearestStop`. **One rAF-throttled scroll listener** writes `--s` (0..4) and `--p` (0..1) on the stage; React state changes only when the stop changes. Each scene gets `--d = s - i` and focus `--f`; three parallax layers shift by `d * -90px`, `d * -36px`, `d * 64px`; jam level is `clamp(0, (s - 0.7) / 0.6, 1)`. The jar/box is an SVG overlay with the same viewBox and crop as the scenes, with a CSS state machine on `data-stop` and spring transitions; a squash-and-settle replays on every stop by alternating two identical keyframe names by stop parity. Add a tracker pill ("Your jar · Cooking"), a route bar with a riding mini jar, a rail of five numbered buttons (jump via a custom event handled by the smooth scroller), an `aria-live` caption, and `#trip-3` deep links.

**Fallback:** with `prefers-reduced-motion: reduce` or no JavaScript the trip renders as five stacked cards, each with its own scene, a static jar and its caption, all visible.

## Motion (organic / analog, expressive)

Verbs: **settle** and **wobble**, with **unfurl** for lids and reveals. Signature moment: the last stop (lid lifts, jar pops and settles, banner, tracker flips).

Tokens in `@theme static`: `--ease-out cubic-bezier(.23,1,.32,1)`, `--ease-out-expo cubic-bezier(.16,1,.3,1)`, `--ease-in-out cubic-bezier(.77,0,.175,1)`, `--ease-spring linear(0,.35 8%,.82 20%,1.06 30%,1.02 42%,.99 58%,1)`; durations 90/180/420/800/1200ms; reveal shift 28px; stagger 70ms. No raw cubic-beziers or ms values in components.

- **Load choreography (CSS keyframes, before hydration):** background settles at 0ms, logo and nav drop at 150ms (items staggered 50ms), headline words rise through masks from 300ms, highlight wipes at ~950ms, lede, CTAs and facts follow, jars drop and settle on springs from 650ms, chips and sparkles pop, ambient loops start after ~1.4s.
- **Reveal vocabulary (at least six, opacity is never alone):** mask-rise words, highlight wipe, slide-in eyebrows, rise, scale-settle, springy pop with a tiny rotation, line draw, clip-path unfurl (ticket), circle wipe (list success, menu), count-up with the final value in a visually hidden span.
- **Scroll:** Lenis smooth scroll (fine pointers only, off under reduced motion), a page progress hairline, the pinned trip, section slab handoffs, one hero parallax via `animation-timeline: view()`.
- **Every interactive element has rest, hover (fine pointers only), focus-visible, pressed (`scale(.96)`, released on a spring), disabled, and loading/success where relevant.** Buttons wipe a fill from the left and nudge their arrow; primary CTAs are Magnetic; cards tilt up to ±6° with a pointer-following glow and dim their neighbours; steppers shrink on press; the size toggle's thumb slides on a spring; inputs have floating labels and an animated ring; invalid fields shake once.
- **Ambient (max three loops in view, paused off-screen):** hero blobs drift, hero jars breathe, the order dot pings; in the trip only the active scene loops and only while visible; marquees pause on hover and focus.
- **Craft rules:** animate only `transform`, `opacity` and `clip-path`; scroll and pointer values go to CSS custom properties from one rAF loop, never React state; hidden pre-reveal states exist only under `prefers-reduced-motion: no-preference`, with a `<noscript>` override; under reduced motion everything is visible and finished-looking with no parallax, loops or smooth scroll; on touch, magnetic and tilt are off and nothing depends on hover.

## Quality bar

One `h1`, logical headings, landmarks, `lang="en"`, real buttons and links with names, visible focus rings, AA contrast (plum on every pastel), `aria-live` only for meaningful changes (the stop caption, the box notice). Images: none. Mobile Lighthouse targets: performance ≥ 90, accessibility ≥ 95, best practices 100; CLS 0; no horizontal overflow at 375px.

Add unit tests for the mechanic (trip progress), the motion maths, the box reducer and totals, the shop data and form validation; add Playwright tests for the trip's stops and deep link, the box builder, the Friday list, keyboard handling, reduced motion and the phone viewport.
