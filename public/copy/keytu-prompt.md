# Prompt: rebuild "KEYTU" (showcase landing page)

Paste everything below the line into your AI coding agent.

---

Build a landing page in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4** for a fictional technical mountaineering apparel brand called **KEYTU** (tagline "Alpine equipment · Tested on K2").

The page is a **showcase told as an ascent of K2**. A pinned mountain silhouette and an altitude meter climb with the visitor from base camp to the summit, and each camp is a product chapter. It must feel serious, precise and hand-crafted, never like a template store.

**Reference** (look and feel only; generate your own images): the live template at https://templateflow-blond.vercel.app/keytu, and images such as https://templateflow-blond.vercel.app/templates/keytu/hero-k2-1600.webp.

## Brand rules

- **Black, dark blue and white only:**
  - black `#0B0C0E`
  - dark blue `#0F1E33`
  - white `#F5F6F7`
  - plus navy tints for lines and muted text: `#16294A` `#2A3D5E` `#56657F` `#A5AEBD` `#DDE1E7`

  **No accent colour.** Emphasis comes only from inversion (white on navy, or black on white). Square corners, 1px hairlines, no glassy blur.
- **All photos are tritone-mapped:** per pixel, Rec.709 luma goes to black → `#0F1E33` → white. Do this at build or processing time, not with CSS filters.
- **Type (via `next/font/google`):**
  - **Barlow Condensed** 800 uppercase for display and chapter titles (each title ends in a full stop), 600 for product names.
  - **Barlow** for body text.
  - **IBM Plex Mono** 12px uppercase with 0.1em tracking for labels, specs and altitudes.
- **Logo:** three stacked stone ellipses plus "KEYTU". **Icon:** white stones on a `#0F1E33` rounded square.

## Structure

1. **Top bar** (fixed, 68px, solid black): logo, section links, outline "Expedition list" button.
2. **Hero** (100svh): K2 photo under a black gradient. Bottom-left: mono kicker, display h1 "Built above the treeline.", lead paragraph, buttons "Begin the ascent" (solid white) and "Expedition lookbook" (outline).
3. **The ascent:**
   - **Desktop:** two columns. The left is a `position: sticky` stage (100svh under the bar). The right holds 7 chapters, each at least 100svh.
   - **Phones:** the stage is a sticky 36svh strip under the bar, with chapters below.
4. **Footer.**

## The stage

- An SVG of **K2 from Concordia** in a 1000×1000 viewBox with `xMidYMax meet`. Ridges and glacier run past the viewBox with `overflow: visible`. It shows the classic pyramid: a shadowed SW face `#16294A`, a lit E face `#2A3D5E`, a white summit cap and a pale snow shoulder, above a black glacier with faint moraine lines.
- **The Abruzzi Spur route:** a curve from base camp (lower right) up the SE ridge to the summit. Draw it dashed in `#A5AEBD`, with the climbed part solid white via `stroke-dashoffset`. A white climber dot sits at `getPointAtLength(progress × length)` with a soft pulsing halo. Camp markers fill white when reached.
- **Desktop altitude meter:** a vertical track whose white fill scales with `(altitude − 5000) / 3611`. Camp labels are positioned by real altitude, and the active one is white.
- **A big readout** "7,350 M" with the camp name, plus coordinates `35.8825° N · 76.5133° E · Karakoram`.

**Progress logic (important):**
- Camps: Base Camp 5,000 · Camp 1 6,050 · Camp 2 6,700 · Camp 3 7,350 · Camp 4 7,900 · Bottleneck 8,200 · Summit 8,611.
- Camp *i* is reached exactly when chapter *i*'s top reaches the arrival line. The line sits just under the top bar, plus the sticky strip on phones.
- `progress = (i + fraction to the next chapter) / 6`. Altitude interpolates linearly between camps.
- Set `scroll-padding-top` to the same line, so `#c3` lands on exactly "7,350 M".
- Recompute on mount (covers reload mid-page), on scroll and on resize, and refresh after fonts load.
- Use GSAP ScrollTrigger for updates, and Lenis smooth scroll synced to it. Turn Lenis off under reduced motion.

## Chapters (id → content)

- `base` **5,000 m:** "The FW26 collection." Intro, a base-camp night photo, and a 6-product grid (cards with 1px gap lines, 4:5 image, category, name, weight · colours).
- `c1` **6,050 m:** "Start with what touches skin." Merino 200 Half-Zip feature panel with a spec list.
- `c2` **6,700 m:** "Three layers. One job each." A diagram of three bars (01 Base · 02 Mid · 03 Shell) that translate apart as the chapter scrolls. The active bar inverts to white. Plus the Grid Fleece Hoody.
- `c3` **7,350 m:** "The outer wall." Summit Shell 3L:
  - **Colourway swap** (black, navy, white) using native radio swatches inside a `role="radiogroup"`, so arrow keys work. The image crossfades in 200ms with a 2px blur during the overlap.
  - A **gear-label spec sheet**: a white card with a dashed inner stitch outline, code `FW26-SH-01`, and mono rows Weight 412 g / Waterproof 28,000 mm / Breathability 25,000 g/m² / Fabric 3-layer, 40D face.
  - A **fabric zoom**: a 180px 2.5× loupe for mouse users, tap-to-zoom on touch.
- `c4` **7,900 m:** "Nights on the Shoulder." 8000 Down Suit (850 FP, −40 °C, 1,980 g) with a spec sheet and fabric zoom.
- `bottleneck` **8,200 m:** "Through the Bottleneck." Summit Mitt and Alpine Gaiter spec sheets side by side.
- `summit` **8,611 m:** "8,611 metres. Nothing above but sky."
  - A **horizontal lookbook**: scroll-snap, mouse drag, prev/next buttons, 3:2 frames. 44px hotspot buttons labelled "Show {product}" open a small white card with the name, weight and colours.
  - An **expedition-list signup**: email plus "Join the expedition list". Error "Enter a valid email". On success, "You're on the list." **Never send a network request.**

## Images (generate, then tritone)

Cool, high-contrast expedition photography in the Karakoram: night and blue hour, clean silhouettes, no logos or text. Keys:

- `hero-k2`, `basecamp`
- `product-shell-black|navy|white`
- `product-down`, `product-base`, `product-mid`, `product-hands`
- `fabric-shell`, `fabric-down`
- `lookbook-1..4`

Until an image exists, render a hatched navy placeholder labelled with its key.

## Quality bar

- Only transform, opacity and SVG attributes animate. UI transitions stay under 300ms with `cubic-bezier(0.23, 1, 0.32, 1)`. Hover only on fine pointers. Presses scale to 0.97.
- With `prefers-reduced-motion`: no smooth scroll, no halo or beacon pulses, the layer diagram fully spread, instant swaps.
- No horizontal page overflow at 375px (the lookbook scrolls inside its own track). Keyboard focus is a 2px white outline.
