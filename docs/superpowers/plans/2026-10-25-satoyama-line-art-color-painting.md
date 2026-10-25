# Satoyama Line-Art Sketch & Colour Painting Animation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the scenery of every slide and season in `/satoyama` into an animated hand-drawn sequence where ink/pencil line-art outlines draw on first across the canvas, followed by soft watercolor washes filling in the colors, replaying on every slide visit and season tab switch.

**Architecture:** Split each scene's SVG into a line-art sketch layer (`.st-sketch-lines`) and a watercolor paint wash layer (`.st-paint-wash`). Animate sketch lines using SVG path length stroke-drawing keyframes (0s - 1.5s), followed by watercolor wash reveals (1.0s - 2.8s), with slide copy entering once the scenery is mostly drawn (~2.4s) and ambient movement starting when painting finishes (~3.2s). Support instant display under `prefers-reduced-motion` and no-JS.

**Tech Stack:** Next.js 16 (App Router), React 19, SVG, CSS keyframe animations, Vitest, Playwright.

**Spec:** Option 2 from agent conversation: "Line-art sketch first, then colour: outlines draw on, then the colour fills in. It looks more like hand-drawn animation, but it needs an outline pass added to every scene... replaying every time you return to a slide and when switching season tabs."

---

## Global Constraints

- Artwork MUST remain fully coded SVG with no external images, video, or canvas dependencies.
- Palette colors must use scoped custom properties (`--st-ink`, `--st-paper`, `--st-sage`, etc.) and `color-mix`.
- Full instant display under `prefers-reduced-motion: reduce` and when JavaScript is disabled.
- Ambient loops (`.st-clouds`, `.st-smoke`, `.st-mist`, `.st-fall`, `.st-firefly`) must pause/delay until painting completes.
- Replay on every return to a slide and on every season tab change in Chapter 5.
- Zero runtime dependencies added to `package.json`.

---

## Review Focus

1. **Replay reliability:** Returning to previously visited slides must restart the sketch-then-color animation cleanly from frame 0 rather than staying in the finished state.
2. **Season tab switches:** Switching between Spring, Summer, Autumn, and Winter tabs in `#the-seasons` must trigger the sketch-then-color painting sequence for the newly selected season.
3. **Reduced motion accessibility:** `prefers-reduced-motion: reduce` must disable all drawing delays and display complete line art and color immediately without flickering.
4. **Text readability during sketch:** Chapter headings and copy must not clash or render prematurely before the landscape has enough visual foundation; text entrance must be smoothly choreographed.
5. **DOM & SVG performance:** Stroke dash animations on 1600x900 SVGs must be GPU-friendly without causing frame drops or layout thrashing.

---

### Task 1: CSS Animation Tokens & Layer Choreography

**Files:**
- Modify: `src/app/(satoyama)/satoyama/satoyama.css`
- Test: `tests/e2e/satoyama.spec.ts`

**Interfaces:**
- Produces: CSS animation classes `.st-sketch-lines`, `.st-sketch-path`, `.st-paint-wash`, animation keyframes `@keyframes st-sketch-draw`, `@keyframes st-wash-in`, `@keyframes st-text-rise`, and ambient delay rules.

- [ ] **Step 1: Define CSS keyframes and layer rules in `satoyama.css`**
  Add `@keyframes st-sketch-draw` (stroke-dashoffset from 100 to 0) and `@keyframes st-wash-in` (opacity from 0 to 1 with subtle watercolor bloom filter/scale).
  Configure `.st-chapter[data-state="active"] .st-sketch-path` to animate over 1.4s with staggered delay tokens.
  Configure `.st-chapter[data-state="active"] .st-paint-wash` to wash in at 1.0s over 1.6s.
  Configure `.st-chapter[data-state="active"]` text copy (`.st-hero-copy`, `.st-essay`, `.st-journal`, `.st-adventure-heading`, `.st-season-copy`, `.st-farewell-copy`, `.st-vertical-poem`, `.st-field-note`) to rise and fade in starting at ~2.2s.
  Set animation-delay of 3.2s on ambient elements (`.st-clouds`, `.st-smoke`, `.st-mist`, `.st-fall`, `.st-firefly`, `.st-beams`, `.st-bamboo-sway`, `.st-motes`, `.st-birds`).

- [ ] **Step 2: Add inactive reset rules**
  In `.st-chapter:not([data-state="active"])`, reset `.st-sketch-path`, `.st-paint-wash`, and text animations to `animation: none !important;` so returning to a slide resets and restarts animations.
  In `.st-season-layer:not([data-on="true"])`, reset sketch and wash animations.

- [ ] **Step 3: Add `prefers-reduced-motion: reduce` overrides**
  Ensure `@media (prefers-reduced-motion: reduce)` sets stroke-dashoffset to 0, opacity to 1, and animation to none so content is instantly complete.

- [ ] **Step 4: Verify syntax and build**
  Run: `npm run check`
  Expected: PASS

---

### Task 2: Reusable Sketch Primitives in `Painted.tsx`

**Files:**
- Modify: `src/app/(satoyama)/satoyama/illustrations/Painted.tsx`
- Modify: `src/app/(satoyama)/satoyama/deck/logic.ts`
- Test: `src/app/(satoyama)/satoyama/deck/logic.test.ts`

**Interfaces:**
- Produces:
  - `extractContour(d: string): string`: Extracts the top crest line from a filled ridge path (`M...V900...Z`).
  - `SketchPath`: SVG path with `pathLength="100"`, `stroke="var(--st-ink)"`, `strokeLinecap="round"`, `fill="none"`, and customizable delay/width.
  - `CumulusOutline`: Contour sketch of cumulus billows.
  - `TreeSketch`: Trunk and branch line sketch.
  - `FarmhouseSketch`: Outline sketch of farmhouse roof, timber framing, and windows.

- [ ] **Step 1: Write unit test for `extractContour` in `logic.test.ts`**
  Assert that `extractContour("M0 540C110 490 290 476 1600 506V900H0Z")` returns `"M0 540C110 490 290 476 1600 506"`.

- [ ] **Step 2: Implement `extractContour` in `logic.ts` and export it**

- [ ] **Step 3: Implement `SketchPath`, `CumulusOutline`, `TreeSketch`, and `FarmhouseSketch` in `Painted.tsx`**
  Create clean SVG line-art components that render delicate ink strokes with `pathLength={100}` and class `.st-sketch-path`.

- [ ] **Step 4: Run unit tests**
  Run: `npm test`
  Expected: PASS

---

### Task 3: Line-Art Passes for Slides 1 to 4 (`MeadowScene`, `TerraceScene`, `VillageScene`, `ForestScene`)

**Files:**
- Modify: `src/app/(satoyama)/satoyama/illustrations/MeadowScene.tsx`
- Modify: `src/app/(satoyama)/satoyama/illustrations/TerraceScene.tsx`
- Modify: `src/app/(satoyama)/satoyama/illustrations/VillageScene.tsx`
- Modify: `src/app/(satoyama)/satoyama/illustrations/ForestScene.tsx`

**Interfaces:**
- Consumes: `SketchPath`, `extractContour`, `CumulusOutline`, `TreeSketch`, `FarmhouseSketch` from `Painted.tsx`.
- Produces: Updated scene SVGs containing `<g className="st-paint-wash">` for colors and `<g className="st-sketch-lines">` for pencil/ink outlines.

- [ ] **Step 1: Update `MeadowScene.tsx` (Slide 1: Welcome)**
  Wrap color fills in `<g className="st-paint-wash">`.
  Add `<g className="st-sketch-lines">` with sketch paths for far ridges, mid ridges, foreground hill, great tree trunk/branches, farmhouse frame, and winding path.

- [ ] **Step 2: Update `TerraceScene.tsx` (Slide 2: The Landscape)**
  Wrap color fills in `<g className="st-paint-wash">`.
  Add `<g className="st-sketch-lines">` with sketch paths for cedar ridges, stepped terrace paddy banks, farmhouses, and foreground tree.

- [ ] **Step 3: Update `VillageScene.tsx` (Slide 3: A Slower Rhythm)**
  Wrap color fills in `<g className="st-paint-wash">`.
  Add `<g className="st-sketch-lines">` with sketch paths for mountain ridges, tiled farmhouses, stone canal walls, arched stone bridge, drying laundry lines, and vegetable rows.

- [ ] **Step 4: Update `ForestScene.tsx` (Slide 4: Little Adventures)**
  Wrap color fills in `<g className="st-paint-wash">`.
  Add `<g className="st-sketch-lines">` with sketch paths for morning ridge silhouette, bamboo stalks and joints, mossy stone path, and foreground bamboo grove.

- [ ] **Step 5: Run unit tests and type check**
  Run: `npm test && npx tsc --noEmit`
  Expected: PASS

---

### Task 4: Line-Art Passes for Slide 5 (`SeasonScenes`) and Slide 6 (`DuskScene`)

**Files:**
- Modify: `src/app/(satoyama)/satoyama/illustrations/SeasonScenes.tsx`
- Modify: `src/app/(satoyama)/satoyama/illustrations/DuskScene.tsx`

**Interfaces:**
- Produces: Updated `SpringScene`, `SummerScene`, `AutumnScene`, `WinterScene`, and `DuskScene` with layered sketch and color washes.

- [ ] **Step 1: Update `SpringScene` in `SeasonScenes.tsx`**
  Add outline sketch pass for cherry tree, flooded paddy bank contours, distant ridges, and farmhouse.

- [ ] **Step 2: Update `SummerScene` in `SeasonScenes.tsx`**
  Add outline sketch pass for vanishing perspective rice rows, cumulus thunderheads, mountains, sunflowers, and farmhouse.

- [ ] **Step 3: Update `AutumnScene` in `SeasonScenes.tsx`**
  Add outline sketch pass for copper ridges, wooden rice drying racks (haza), flaming maple silhouette, and farmhouse.

- [ ] **Step 4: Update `WinterScene` in `SeasonScenes.tsx`**
  Add outline sketch pass for snowbound ridges, snowy cedars, bare tree branches, farmhouse roofline, and window glow frame.

- [ ] **Step 5: Update `DuskScene.tsx` (Slide 6: Until Next Time)**
  Add outline sketch pass for rose ridges, setting sun circle, tiered paddy waterlines, lantern posts, and dark trees.

- [ ] **Step 6: Run unit tests and type check**
  Run: `npm test && npx tsc --noEmit`
  Expected: PASS

---

### Task 5: Replay & Season Tab State Orchestration

**Files:**
- Modify: `src/app/(satoyama)/satoyama/deck/PictureBook.tsx`
- Modify: `src/app/(satoyama)/satoyama/deck/Seasons.tsx`

**Interfaces:**
- Produces: Slide visit counter / animation restart keys to ensure deterministic replay in all browsers upon slide entry and season tab change.

- [ ] **Step 1: Add replay key in `PictureBook.tsx`**
  Track visit count per slide so when navigating to a slide, its paint animation triggers freshly.
  Ensure inactive slides remove active animation classes.

- [ ] **Step 2: Add replay key in `Seasons.tsx`**
  Ensure switching between season tabs (Spring, Summer, Autumn, Winter) triggers the sketch-and-wash painting sequence for the newly active season.

- [ ] **Step 3: Update copy bundles**
  Run: `npx tsx scripts/generate-copy-bundles.ts`
  Expected: `copy bundles: generated`

---

### Task 6: E2E Tests & Comprehensive Verification

**Files:**
- Modify: `tests/e2e/satoyama.spec.ts`

**Interfaces:**
- Produces: Automated E2E test verifying:
  - Line-art sketch layer (`.st-sketch-lines`) and paint wash layer (`.st-paint-wash`) exist across scenes.
  - Replay works when returning to earlier slides.
  - Season tab switching triggers painting animation.
  - Reduced motion immediately renders full color with no delays.

- [ ] **Step 1: Add E2E tests in `tests/e2e/satoyama.spec.ts`**
  Add test asserting presence of `.st-sketch-lines` and `.st-paint-wash` in all chapter scenes.
  Add test verifying season tabs switch and repaint.
  Add test verifying reduced motion disables delays.

- [ ] **Step 2: Run all unit tests**
  Run: `npm test`
  Expected: All 102+ test files pass.

- [ ] **Step 3: Run TypeScript compiler check**
  Run: `npx tsc --noEmit`
  Expected: 0 errors.

- [ ] **Step 4: Run repository checks**
  Run: `npm run check`
  Expected: `isolation: ok`, `palette: ok`.
