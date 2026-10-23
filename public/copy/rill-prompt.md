# Prompt: rebuild "RILL" (image-led watershed landing page)

Build a landing page in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4** for a fictional field-hydrology studio called **RILL**. RILL helps dryland farms hold water in the soil through contour planning, low-pressure irrigation, and living-soil practices.

The central metaphor is **a farm is a watershed, so the page follows one drop from ridge to root zone**. Use generated documentary stills and short clips as the main visual attention. On desktop, the `Read the land` chapter is a `360svh` section with a `100svh` sticky stage. Scroll moves through ridge, swale, storage and root-zone media plates. A real 0–80 mm range input changes the shared rain value, the water-budget readout, the chapter rail and the animated contour drop. At 42 mm the runoff line breaks over the ridge footage, crosses the contour and settles into the root zone.

## Brand

- Slogan: **Make every drop take the long way.**
- Positioning: **Field hydrology for farms that keep water in the ground.**
- Voice: measured, observant, grounded, specific, hopeful. Avoid greenwashed, extractive, hyped, frictionless or disposable language.
- Palette: basalt `#14231E`, limestone `#F0E9DB`, iron oxide `#B85C43`, riverstone `#5B8174`, lichen `#87956C`, silt `#C9B79E`. Use `color-mix()` for tints; do not add hex colours.
- Type through `next/font/google`: Cormorant Garamond 500/600 normal and italic for display, Fira Sans 400/500/600 for body, Fira Mono 400/500 for coordinates and readouts.
- Logo: three contour lines make a rivulet and a small oxide drop; provide `brand/Logo.tsx`, `icon.svg`, and a 1200×630 `opengraph-image.tsx`.
- Corners: 6px media frames, 8px cards and full pill buttons. Vary alignment across sections: centred hero/budget moments, left field records, right-anchored ecosystem detail.

## Sections

1. Fixed header with RILL mark, chapter links, live rainfall and a sliding active indicator.
2. Hero storm film with a full-bleed generated ridge image/clip, headline “Read the land. Keep the rain.” and `Book a field walk` CTA.
3. Read the land sticky watershed stage with generated ridge, swale, storage and root-zone plates, contour SVG, drop marker and range input.
4. Water budget with live runoff, storage and root-zone values. Status is `dry` below 18 mm, `holding` from 18–41 mm, and `ready` at 42 mm or above.
5. Field systems cards for contour swale, shade row and low-pressure drip; cards lift, tilt and spotlight on fine pointers.
6. Field notes rail with three specific records: Cienega Fields 14 acres / 42 mm / 31 days, Marrow Creek 28 acres / 36 mm / 24 days, Las Lomas 42 acres / 51 mm / 38 days.
7. Seasonal ledger with twelve month buttons and directional detail changes.
8. Field-walk form with name, farm, email, acreage and goal. Validate locally, show field errors, morph through loading, then replace the form with a success panel. Never send a network request.
9. Ecosystem footer diagram with soil, roots, mycelium, crop and a water line, field coordinates and the line “Keep water in the ground.”

## Pure logic

Create and test `motion/math.ts`, `watershed/water.ts`, `watershed/store.ts`, and `forms/validation.ts` before their UI components.

- `progressFromOffsets(rectTop, rectHeight, viewportHeight)` clamps a sticky section to 0–1.
- `rainfallAt(progress)` maps 0–1 to 0–80 mm; `progressAtRainfall(mm)` is its inverse.
- `waterBudget(mm)` uses `runoff = clamp(0, 100, max(0, mm - 26) * 1.2)`, `storage = clamp(0, 100, mm * .92 - runoff * .24)`, `rootZone = clamp(0, 100, storage * .74)`.
- `watershedPhase(progress)` returns ridge / swale / storage / root-zone at 0.2, 0.5 and 0.78.
- `contourPoint(progress)` returns a deterministic SVG point.
- The external store exposes `getSnapshot`, `subscribe` and `setRain` and de-duplicates unchanged values.

## Motion and accessibility

Motion identity is organic / analog with the verbs **trace** and **settle**. Use easing `cubic-bezier(0.22, 1, 0.36, 1)` for arrivals, `cubic-bezier(0.65, 0, 0.35, 1)` for handoffs, and the spring `linear(0, 0.16 12%, 0.76 28%, 1.06 50%, 0.98 74%, 1)`. Durations are 90ms, 180ms, 480ms, 920ms and 1200ms; stagger is 80ms. Use mask-rise text, clip-path media wipes, drawn rules, staggered cards, count-up values and a single bounded scroll progress loop. Animate only transform, opacity, clip-path and SVG stroke offsets.

Provide one `h1`, logical headings, landmarks, named controls, visible focus rings, `aria-live` only for phase changes, and final values that remain in text. Under reduced motion, disable pinning, smooth scrolling, video playback and ambient loops while keeping every image, value and form state visible. With JavaScript disabled, show the same story in normal flow. On touch, do not rely on hover.

## Media

Use the platform-neutral prompts in `docs/image-prompts/rill.md`. Raw files go in `assets/incoming/rill/` and `assets/incoming/rill/clips/`. Required still keys are `hero-ridge`, `land-aerial`, `swale-close`, `root-zone-macro`, `systems-swale`, `systems-shade`, `systems-drip`, `field-note-01`, `field-note-02`, `field-note-03`, `season-ledger`, and `ecosystem-footer`. Required clips are `storm-threshold` and `root-zone-pulse`. Until files arrive, render labelled placeholders with fixed aspect ratios.

## Verification

Add unit tests for all pure maths, the external store and validation. Add `tests/e2e/rill.spec.ts` for the route, scroll phase, 42 mm threshold, range keyboard behavior, form errors/success, placeholders, ecosystem footer, phone flow and reduced motion. Register `rill` in all six gallery registration points, run `npm run check`, `npm test`, `npx tsc --noEmit`, and `npx playwright test`.

