# AFTERCART Landing Template Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build and register a complete AFTERCART Shopify care landing template with a tested living store-health console and local booking form.

**Architecture:** Use an isolated Next.js route group at `src/app/(aftercart)/` with server-rendered sections and small client leaves for the console, form, reveals, and scroll variables. Keep console state, validation, and motion math in pure TypeScript modules with adjacent Vitest tests.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, CSS transitions, inline SVG, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-25-aftercart-design.md`

## Global Constraints

- Slug is lowercase `aftercart`; class prefix is `ac`.
- Palette is limited to the seven colors in the design spec.
- No photo/video dependency; no network request from the form.
- Content remains visible without JavaScript and under reduced motion.
- Template imports only npm packages and files inside its own route group.
- Register at all six gallery points and add `/aftercart` to shared e2e paths.

## Review Focus

- Unknown console track ids must leave state unchanged; test in `console/health.test.ts`.
- Re-selecting the active track must be stable; test in `console/health.test.ts`.
- Empty, malformed, and valid form values must return precise errors; test in `forms/booking.test.ts`.
- Reduced-motion and no-JS states must not hide content; test in `tests/e2e/aftercart.spec.ts`.
- Mobile console controls must remain keyboard and touch usable; test in `tests/e2e/aftercart.spec.ts`.

### Task 1: Console data and validation

**Files:**
- Create: `src/app/(aftercart)/aftercart/console/health.test.ts`
- Create: `src/app/(aftercart)/aftercart/console/health.ts`
- Create: `src/app/(aftercart)/aftercart/forms/booking.test.ts`
- Create: `src/app/(aftercart)/aftercart/forms/booking.ts`

- [ ] Write failing tests for track selection/snapshot and form validation.
- [ ] Run the focused Vitest files and verify they fail because the modules do not exist.
- [ ] Implement the smallest typed state and validation modules.
- [ ] Run the focused tests and the full unit suite.

### Task 2: Route shell, brand, assets, and motion foundation

**Files:**
- Create: `src/app/(aftercart)/layout.tsx`
- Create: `src/app/(aftercart)/aftercart/aftercart.css`
- Create: `src/app/(aftercart)/aftercart/brand/Logo.tsx`
- Create: `src/app/(aftercart)/aftercart/icon.svg`
- Create: `src/app/(aftercart)/aftercart/opengraph-image.tsx`
- Create: `src/app/(aftercart)/aftercart/assets.tsx`
- Create: `src/app/(aftercart)/aftercart/assets.generated.ts`
- Create: `src/app/(aftercart)/aftercart/motion/Reveals.tsx`
- Create: `src/app/(aftercart)/aftercart/motion/ScrollVars.tsx`
- Create: `src/app/(aftercart)/aftercart/motion/math.ts`
- Create: `src/app/(aftercart)/aftercart/motion/math.test.ts`

- [ ] Add the palette and type variables, page reset, no-JS override, motion tokens, responsive layout primitives, and four reveal vocabularies.
- [ ] Add the inline logo, favicon, OG image, placeholder asset contract, and tested clamp/lerp/progress helpers.
- [ ] Run motion math tests and `npm run check` after registering the palette.

### Task 3: Sections and client leaves

**Files:**
- Create: `src/app/(aftercart)/aftercart/console/HealthConsole.tsx`
- Create: `src/app/(aftercart)/aftercart/forms/BookingForm.tsx`
- Create: `src/app/(aftercart)/aftercart/sections/Header.tsx`
- Create: `src/app/(aftercart)/aftercart/sections/Hero.tsx`
- Create: `src/app/(aftercart)/aftercart/sections/CareTracks.tsx`
- Create: `src/app/(aftercart)/aftercart/sections/WorkLog.tsx`
- Create: `src/app/(aftercart)/aftercart/sections/Rhythm.tsx`
- Create: `src/app/(aftercart)/aftercart/sections/Booking.tsx`
- Create: `src/app/(aftercart)/aftercart/sections/FAQ.tsx`
- Create: `src/app/(aftercart)/aftercart/page.tsx`

- [ ] Build the server-rendered page structure with one h1, semantic sections, skip link, anchors, console fallback copy, and FAQ disclosures.
- [ ] Add console selection state, aria-live status updates, focus-visible states, local form loading/success, and responsive touch behavior.
- [ ] Run focused tests after each client leaf and inspect the running page.

### Task 4: Documentation, registration, and preview

**Files:**
- Create: `src/app/(aftercart)/aftercart/DESIGN.md`
- Create: `src/app/(aftercart)/aftercart/PROMPT.md`
- Create: `docs/image-video-prompts/aftercart.md`
- Create: `public/templates/aftercart/preview.svg`
- Modify: `scripts/templates.config.ts`
- Modify: `scripts/process-images.ts`
- Modify: `scripts/generate-copy-bundles.ts`
- Modify: `src/app/(index)/data/templates.ts`
- Modify: `src/app/(index)/data/templates.test.ts`
- Modify: `tests/e2e/templates.ts`

- [ ] Add the slug, palette, metadata, prompt, category entry, model tag, image allowlist, expected count, and e2e path.
- [ ] Add the route DESIGN/PROMPT docs and prompt file describing the no-photo policy.
- [ ] Use the SVG preview until a browser screenshot is available.

### Task 5: Verification

- [ ] Run `npm run check`.
- [ ] Run `npm test`.
- [ ] Run `npx tsc --noEmit`.
- [ ] Run `npx playwright test tests/e2e/aftercart.spec.ts` and the shared template suite.
- [ ] Run the full `npx playwright test` if the environment can build and serve the gallery.
- [ ] Check desktop and 390px layouts, reduced motion, keyboard focus, selection states, form success, and no-JS visibility.
