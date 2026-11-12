# Import Mesa Hero into Mesa Market Template Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Import the standalone `Famanias/mesa-hero` repository 1:1 into the `mesamarket` template as its new top Hero section (featuring the interactive 2.5D Three.js harvest crate, flying produce GSAP trajectories, top navigation, and modal dialogues), moving the existing `HeroStall` section directly down without removal or replacement.

**Architecture:** Port the components and libraries from `mesa-hero` into an isolated `hero/` directory inside `src/app/(mesamarket)/mesamarket/`, rewriting `@/src/...` path imports to relative imports adhering to template isolation boundaries. Integrate `HarvestCrateHero` at the top of `MesaMarketApp.tsx` followed by `Header` and the existing `HeroStall` section. Mirror assets into `public/templates/mesamarket/aistudio/` and update test assertions and copy bundle metadata.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Three.js (r186/r187), GSAP 3, Lucide React, Tailwind CSS v4, Vitest, Playwright.

**Spec:** Direct user prompt: "check my repository called: mesa-hero, and I want you to import that into the current mesa market template, that will be the hero section of the template, then the current or existing hero section will just be moved down, not replaced or removed. i have an import-template script than you could use. Make sure everything is 1:1 copy".

## Global Constraints

- Preserve 1:1 visual fidelity, state behavior, interactions, 3D graphics, and responsive layouts from `mesa-hero`.
- Adhere to `scripts/check-isolation.ts`: no `@/` or root imports; use strict relative paths within `src/app/(mesamarket)/`.
- Retain existing `HeroStall` and all other sections (`ProduceShelf`, `MealKits`, `ProducerRoute`, `ReceiptSection`, `Footer`, `BasketPill`, `BasketDrawer`) without removal.
- Ensure all test suites pass (`vitest` on `src/app/(mesamarket)`, `npm run check`, `generate-copy-bundles`).

## Review Focus

1. **Isolation boundary violations:** imported files from `mesa-hero` originally used `@/src/...` which breaks `scripts/check-isolation.ts`; all must be converted to `./` relative imports.
2. **Multiple H1 tag conflict:** `mesa-hero` and `HeroStall` both originally carried an `<h1>Good things come into season.</h1>`; `HeroStall` must be downgraded to `<h2>` while retaining its text and appearance so page semantics and Playwright strict mode remain valid.
3. **Canvas 2D texture generation in Three.js:** `artworkTextures.ts` executes in client environments; ensure SSR safety by gating window/document calls appropriately in React components.
4. **Three.js add-on imports:** `RoomEnvironment` must resolve via `three/addons/environments/RoomEnvironment.js` with TypeScript types matching `three`.
5. **Asset resolution:** static media files from `mesa-hero` (`public/assets/aistudio/*`) must be available under `public/templates/mesamarket/aistudio/` and `public/assets/mesa-market/aistudio/`.

---

### Task 1: Port Hero Data Model and Unit Tests

**Files:**
- Create: `src/app/(mesamarket)/mesamarket/hero/basketState.ts`
- Create: `src/app/(mesamarket)/mesamarket/hero/basketState.test.ts`

**Interfaces:**
- Produces: `BasketState`, `BasketItemInstance`, `ProduceId`, `PRODUCE_CATALOG`, `SOURCE_ANCHORS`, `CRATE_SPEC`, `localCrateToWorld`, `addProduceInstance`, `removeProduceInstance`, `clearBasketState`, `createInitialBasketState`, `evaluateFlightArc`, `getCuratedAdditions`

- [ ] **Step 1: Write `basketState.ts`**
Copy `basketState.ts` from `.openlanding-page/.temp-imports/mesa-hero/src/lib/basketState.ts` into `src/app/(mesamarket)/mesamarket/hero/basketState.ts`. Ensure all types, catalog items, slot computation, flight arc equations, and state transitions are exact 1:1.

- [ ] **Step 2: Write `basketState.test.ts` with Vitest assertions**
Port `.openlanding-page/.temp-imports/mesa-hero/src/lib/basketState.test.ts` into `src/app/(mesamarket)/mesamarket/hero/basketState.test.ts`, changing `import test from 'node:test'` to `import { test } from 'vitest'`.

- [ ] **Step 3: Run Vitest to verify tests pass**
Run: `npx vitest run src/app/\(mesamarket\)/mesamarket/hero/basketState.test.ts`
Expected: PASS (all 5 tests passing).

- [ ] **Step 4: Commit**
```bash
git add src/app/(mesamarket)/mesamarket/hero/basketState.ts src/app/(mesamarket)/mesamarket/hero/basketState.test.ts
git commit -m "feat(mesamarket): add hero basket state model and tests"
```

---

### Task 2: Port Three.js Artwork Textures and Scene Builders

**Files:**
- Create: `src/app/(mesamarket)/mesamarket/hero/artworkTextures.ts`
- Create: `src/app/(mesamarket)/mesamarket/hero/sceneBuilders.ts`
- Create: `src/app/(mesamarket)/mesamarket/hero/fonts.ts`

**Interfaces:**
- Consumes: `ProduceId`, `SourceAnchorSpec`, `BasketItemInstance` from `./basketState`
- Produces:
  - `buildAllProduceTextures`, `buildAnnotationTextures`, `sampleAlphaMask`, `createWoodPlankTexture` from `./artworkTextures`
  - `buildWoodenCrateGroup`, `buildProduceGroup`, `buildAnnotationsGroup` from `./sceneBuilders`
  - `fraunces`, `plusJakarta`, `ibmPlexMono` from `./fonts`

- [ ] **Step 1: Write `fonts.ts`**
Create `src/app/(mesamarket)/mesamarket/hero/fonts.ts` matching `mesa-hero/src/lib/fonts.ts`:
```ts
export const fraunces = {
  className: 'font-serif',
} as const;

export const plusJakarta = {
  className: 'font-sans',
} as const;

export const ibmPlexMono = {
  className: 'font-mono',
} as const;
```

- [ ] **Step 2: Write `artworkTextures.ts`**
Copy from `.openlanding-page/.temp-imports/mesa-hero/src/lib/artworkTextures.ts`, replacing `@/src/lib/basketState` with `./basketState`.

- [ ] **Step 3: Write `sceneBuilders.ts`**
Copy from `.openlanding-page/.temp-imports/mesa-hero/src/lib/sceneBuilders.ts`, replacing `@/src/lib/artworkTextures` and `@/src/lib/basketState` with `./artworkTextures` and `./basketState`.

- [ ] **Step 4: Verify typecheck and isolation on ported libs**
Run: `npx tsc --noEmit` and `npx tsx scripts/check-isolation.ts`
Expected: isolation: ok, no TypeScript errors in `hero/`.

- [ ] **Step 5: Commit**
```bash
git add src/app/(mesamarket)/mesamarket/hero/artworkTextures.ts src/app/(mesamarket)/mesamarket/hero/sceneBuilders.ts src/app/(mesamarket)/mesamarket/hero/fonts.ts
git commit -m "feat(mesamarket): add Three.js procedural textures and scene builders"
```

---

### Task 3: Port Hero UI Components and 3D Canvas

**Files:**
- Create: `src/app/(mesamarket)/mesamarket/hero/HarvestSceneCanvas.tsx`
- Create: `src/app/(mesamarket)/mesamarket/hero/TopNav.tsx`
- Create: `src/app/(mesamarket)/mesamarket/hero/HeroOverlayModals.tsx`
- Create: `src/app/(mesamarket)/mesamarket/hero/HarvestCrateHero.tsx`

**Interfaces:**
- Consumes: `./basketState`, `./artworkTextures`, `./sceneBuilders`, `./fonts`
- Produces: `HarvestCrateHero` default export and named export

- [ ] **Step 1: Write `TopNav.tsx`**
Copy `.openlanding-page/.temp-imports/mesa-hero/src/components/TopNav.tsx` to `src/app/(mesamarket)/mesamarket/hero/TopNav.tsx`, updating font import from `@/src/lib/fonts` to `./fonts`.

- [ ] **Step 2: Write `HeroOverlayModals.tsx`**
Copy `.openlanding-page/.temp-imports/mesa-hero/src/components/HeroOverlayModals.tsx` to `src/app/(mesamarket)/mesamarket/hero/HeroOverlayModals.tsx`, updating font and basketState imports to `./fonts`, `./basketState`, and `./TopNav`.

- [ ] **Step 3: Write `HarvestSceneCanvas.tsx`**
Copy `.openlanding-page/.temp-imports/mesa-hero/src/components/HarvestSceneCanvas.tsx` to `src/app/(mesamarket)/mesamarket/hero/HarvestSceneCanvas.tsx`, updating imports to `./basketState`, `./artworkTextures`, `./sceneBuilders`.

- [ ] **Step 4: Write `HarvestCrateHero.tsx`**
Port `.openlanding-page/.temp-imports/mesa-hero/src/App.tsx` into `src/app/(mesamarket)/mesamarket/hero/HarvestCrateHero.tsx`. Replace all `@/src/...` imports with `./TopNav`, `./HarvestSceneCanvas`, `./HeroOverlayModals`, `./fonts`, `./basketState`. Export `HarvestCrateHero` both as default and named export.

- [ ] **Step 5: Verify typecheck and isolation**
Run: `npx tsc --noEmit` and `npx tsx scripts/check-isolation.ts`
Expected: isolation: ok, no TypeScript errors.

- [ ] **Step 6: Commit**
```bash
git add src/app/(mesamarket)/mesamarket/hero/TopNav.tsx src/app/(mesamarket)/mesamarket/hero/HeroOverlayModals.tsx src/app/(mesamarket)/mesamarket/hero/HarvestSceneCanvas.tsx src/app/(mesamarket)/mesamarket/hero/HarvestCrateHero.tsx
git commit -m "feat(mesamarket): add hero interactive canvas, topnav, and modal components"
```

---

### Task 4: Copy Static Assets and Configure Styles & Dependencies

**Files:**
- Create: `public/templates/mesamarket/aistudio/empty-basket_203c86a9.jpg`
- Create: `public/templates/mesamarket/aistudio/full-basket_652003f9.jpg`
- Create: `public/templates/mesamarket/aistudio/Mesa_Market_interactive_website___d7f72adb_b9737de3.mp4`
- Modify: `src/app/(mesamarket)/mesamarket/mesamarket.css`
- Modify: `scripts/generate-copy-bundles.ts`

**Interfaces:**
- Produces: static assets under `/templates/mesamarket/aistudio/`, serif/mono/sans theme font tokens in `mesamarket.css`, and `"three"`/`"gsap"` in copy bundle metadata.

- [ ] **Step 1: Copy aistudio assets from mesa-hero**
Copy `.openlanding-page/.temp-imports/mesa-hero/public/assets/aistudio/*` to `public/templates/mesamarket/aistudio/` and `public/assets/mesa-market/aistudio/`.

- [ ] **Step 2: Update `mesamarket.css`**
Ensure `--font-serif: var(--font-fraunces), Georgia, serif;` is defined in `@theme` in `src/app/(mesamarket)/mesamarket/mesamarket.css` so `font-serif` maps cleanly to Fraunces.

- [ ] **Step 3: Update `scripts/generate-copy-bundles.ts`**
Add `"three"`, `"gsap"` to `mesamarket`'s dependencies in `scripts/generate-copy-bundles.ts`:
```ts
mesamarket: { name: "MESA MARKET", dependencies: ["lucide-react", "motion", "three", "gsap"], includeDownload: true, downloadPath: "/downloads/mesamarket.html" },
```

- [ ] **Step 4: Run generate-copy-bundles script**
Run: `npx tsx scripts/generate-copy-bundles.ts`
Expected: `copy bundles: generated`.

- [ ] **Step 5: Commit**
```bash
git add public/templates/mesamarket/aistudio/ public/assets/mesa-market/aistudio/ src/app/(mesamarket)/mesamarket/mesamarket.css scripts/generate-copy-bundles.ts
git commit -m "feat(mesamarket): copy static assets and update css font theme"
```

---

### Task 5: Integrate HarvestCrateHero into MesaMarketApp and Move HeroStall Down

**Files:**
- Modify: `src/app/(mesamarket)/mesamarket/MesaMarketApp.tsx`
- Modify: `src/app/(mesamarket)/mesamarket/sections/HeroStall.tsx`

**Interfaces:**
- Consumes: `HarvestCrateHero` from `./hero/HarvestCrateHero`
- Produces: Integrated template with 3D Harvest Crate Hero at the top, followed by `Header` and the moved-down `HeroStall` section.

- [ ] **Step 1: Downgrade `HeroStall.tsx` heading to `<h2>`**
In `src/app/(mesamarket)/mesamarket/sections/HeroStall.tsx`, change the `<h1>` around line 114 to `<h2>` (preserving `mm-display font-extrabold text-[#24211D] leading-[0.98]` and text "Good things come into season.") so that the top `HarvestCrateHero` serves as the sole `<h1>` landmark.

- [ ] **Step 2: Integrate `HarvestCrateHero` in `MesaMarketApp.tsx`**
Import `HarvestCrateHero` from `./hero/HarvestCrateHero`.
Render `HarvestCrateHero` above `Header` and `HeroStall`. Keep `Header`, `HeroStall`, `ProduceShelf`, `MealKits`, `ProducerRoute`, `ReceiptSection`, `Footer`, `BasketPill`, and `BasketDrawer` intact.

- [ ] **Step 3: Run Vitest on mesamarket**
Run: `npx vitest run src/app/\(mesamarket\)`
Expected: PASS (both `model.test.ts` and `basketState.test.ts` pass).

- [ ] **Step 4: Run repo check script**
Run: `npm run check`
Expected:
```
isolation: ok
palette: ok
media: ok
```

- [ ] **Step 5: Commit**
```bash
git add src/app/(mesamarket)/mesamarket/MesaMarketApp.tsx src/app/(mesamarket)/mesamarket/sections/HeroStall.tsx
git commit -m "feat(mesamarket): place HarvestCrateHero at top and move HeroStall down"
```

---

### Task 6: End-to-End Verification and Copy Bundle Regeneration

**Files:**
- Modify (if needed): `tests/e2e/mesamarket.spec.ts`

- [ ] **Step 1: Run end-to-end spec or test suite**
Run: `npx vitest run src/app/\(mesamarket\)`
Run: `npm run check`
Run: `npx tsx scripts/generate-copy-bundles.ts`
Expected: all checks pass cleanly.

- [ ] **Step 2: Commit any final verification changes**
```bash
git add .
git commit -m "test(mesamarket): verify 1:1 hero import and moved-down stall section"
```
