# Prompt: rebuild "HIYAS" (high-altitude expedition route planner)

Build a landing page in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4** for a fictional mountaineering company called **HIYAS**. It plans and guides expeditions for climbers attempting one of the fourteen 8,000 m peaks, with route intelligence, Sherpa partnership, and a clear return plan.

The central metaphor is **an expedition is a chain of camps, so the page is a live route planner**. Choose a peak, change acclimatization days, choose a support mode, and redraw the route profile. Camp markers settle into the line and the locked plan carries into the local inquiry form.

## Brand

- Slogan: **Plan the line. Earn the summit.**
- Positioning: **Guided eight-thousand-metre expeditions, planned with precision.**
- Voice: clear, quiet, serious, human, prepared. Avoid reckless, heroic, guaranteed, tourist, or loud language.
- Palette: black `#05070A`, dark blue `#0B2A4A`, white `#FFFFFF`. Do not add other hex colours; compose opacity and tints with `color-mix()`.
- Type through `next/font/google`: Oswald 500/600/700 for display, Outfit 400/500/600 for body, Roboto Mono 400/500 for route data.
- Geometry: sharp zero-radius panels, rules and controls. No rounded dashboard cards.
- Footer: full-bleed mountain scene, sparse link columns and a giant HIYAS wordmark anchored into the image.

## Sections

1. Header: HIYAS mark, Plan, The fourteen, Support, Inquiry, selected route readout and one action.
2. Hero: split editorial field with documentary expedition image, “Plan the line. Earn the summit.” and the first route line.
3. Planner: peak selector for all fourteen mountains, SVG route profile, camp markers, 14–70 day range input, support mode select, and lock-plan action.
4. The fourteen: dense index with real peak elevations, regions, route character and links back to the planner.
5. Expedition architecture: Prepare, Approach, Acclimatize, Summit window, Return.
6. Sherpa partnership: local leadership, route discipline and planned return, with image-led media slot.
7. Logistics board: permits, weather, communications, oxygen, base systems and contingency.
8. Field notes: route reports with documentary image placeholders.
9. Inquiry: name, email, peak, days, support and note. Validate locally; success explicitly says no network request was sent.
10. Footer: mountain image slot, columns, giant wordmark, coordinates and return-plan line.

## Planner logic

Write tests first for `planner/logic.ts` and `forms/validation.ts`.

- Peaks: Everest 8849 m, K2 8611 m, Kangchenjunga 8586 m, Lhotse 8516 m, Makalu 8485 m, Cho Oyu 8188 m, Dhaulagiri 8167 m, Manaslu 8163 m, Nanga Parbat 8126 m, Annapurna I 8091 m, Gasherbrum I 8080 m, Broad Peak 8051 m, Gasherbrum II 8035 m, Shishapangma 8027 m.
- Days are visitor-selected planning inputs clamped to 14–70; the default is 21.
- Support modes are Route only, Sherpa guided, and Private expedition.
- Route segments are approach, acclimatize, summit, return.
- Camp stops are Base camp, Camp 1, Camp 2, and Summit; the SVG profile is deterministic and capped at the selected elevation.

## Motion and accessibility

Motion identity is **technical / cinematic, showpiece**, with the verbs **plot** and **lock**. The signature moment is the route line drawing from base camp to summit while camp markers snap into place and the support plan resolves.

Use Oswald display masks, SVG route stroke offsets, directional readout transitions, sharp rule draws, and one bounded page progress loop. Animate only transform, opacity, clip-path and SVG stroke offsets. Under reduced motion, remove route scrubs, parallax, tilt and ambient loops while keeping all content and final values visible. With JavaScript disabled, show the peak index and complete inquiry form in normal flow. Every control must have visible focus, pressed, disabled, loading and success states.

## Media

Use `docs/image-prompts/hiyas.md`. User-generated stills and clips go in `assets/incoming/hiyas/` and `assets/incoming/hiyas/clips/`. Required still keys are `hero-route`, `planner-profile`, `peak-everest`, `peak-k2`, `support-rope`, `camp-night`, `field-note-01`, `field-note-02`, `field-note-03`, and `footer-mountain`. Required clips are `route-dawn` and `camp-wind`. Until assets arrive, render labelled placeholders with fixed aspect ratios.

## Verification

Add unit tests for planner logic, motion maths and inquiry validation. Add `tests/e2e/hiyas.spec.ts` covering planner selection, day range, support mode, locking, inquiry validation/success, footer scene, phone layout, reduced motion and no-JS. Register `hiyas` at all six gallery registration points, run `npm run check`, `npm test`, `npx tsc --noEmit`, and `npx playwright test`.

