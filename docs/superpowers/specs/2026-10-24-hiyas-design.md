# HIYAS landing template design

## Intent

HIYAS is a fictional high-altitude expedition company for climbers planning one of the fourteen 8,000 m peaks. The page should carry the expedition depth of a serious operator—routes, timing, logistics, support, preparation, field notes, and inquiry—inside a spare, dark-blue / black / white system inspired by the split composition and typographic confidence of the supplied Crux reference.

## Goals

- Give visitors a practical first action: compare a peak, a planning rhythm, and a support mode before requesting a route consultation.
- Make one central interaction memorable: the route profile redraws as the visitor chooses a peak and changes acclimatization days.
- Preserve the human center of the company: Sherpa partnership, decision-making, and a planned return are visible beside the technical data.
- Keep generated expedition imagery primary while the route planner remains useful with placeholders.
- Support phones, reduced motion, no JavaScript, keyboard input, and a local-only inquiry form.

## Non-goals and anti-goals

- No claims of guaranteed summits, invented testimonials, real staff identities, or real-time weather guarantees.
- No imitation of the reference site's logo, copy, or exact trade dress.
- No gradients that introduce colors beyond black, dark blue, and white; tints use opacity and `color-mix()` from the three tokens.
- No WebGL requirement; the planner is an SVG/DOM instrument with optional still/video plates.

## Reference synthesis

The expedition reference establishes the information architecture: activities, routes, trip details, safety and logistics, leadership, field notes, resources, and inquiry. The Crux reference establishes the visual direction: split hero, condensed display type, sharp rules, dark editorial surfaces, a strong single signal color, and a moving utility band. HIYAS keeps the information depth while translating the signal into dark blue and treating the footer as a large photographic scene with sparse columns and an oversized wordmark.

## Brand

- **Name:** HIYAS.
- **Positioning:** Guided eight-thousand-metre expeditions, planned with precision.
- **Slogan:** Plan the line. Earn the summit.
- **Voice:** clear, quiet, serious, human, prepared.
- **Never:** reckless, heroic, guaranteed, tourist, loud.
- **Palette:** black `#05070A`, dark blue `#0B2A4A`, white `#FFFFFF`.
- **Type:** Oswald 600/700/800 for display; Outfit 400/500/600 for body; Roboto Mono 400/500 for route data.
- **Geometry:** sharp zero-radius panels and controls; no decorative rounding.

## Experience structure

1. **Hero / route room:** split text and image field, route line, primary “Plan an expedition” action, coordinates, and the first planner cue.
2. **Expedition planner:** a dark-blue instrument with a 14-peak selector, route profile, acclimatization-day range, support mode, and a locked plan summary. It is the signature mechanic.
3. **The fourteen:** a dense index of all fourteen peaks with elevation, region, and a short route character. Selecting a row hands its state to the planner.
4. **Expedition architecture:** five stages—prepare, approach, acclimatize, summit window, return—shown as a route line with directional handoffs.
5. **Sherpa partnership:** role-based field responsibilities, decision rules, and a large documentary image slot. No invented names or praise quotes.
6. **Logistics board:** a full-width table of permits, weather, comms, oxygen, camp systems, and contingency notes; it reads like an expedition room document.
7. **Field notes:** three route reports with place, season, conditions, and editorial copy; placeholders until user media arrives.
8. **Inquiry:** local form that carries the selected peak, planning days, and support level into a consultation request; validation and success remain local.
9. **Footer scene:** generated mountain image slot with four sparse link columns and a giant HIYAS wordmark over the lower edge.

## Planner contract

`planner/logic.ts` owns pure functions:

- `clampPlannerDays(days, min, max)` constrains the range input.
- `routeProgress(progress)` clamps 0–1 and returns the current segment.
- `altitudeAt(progress, peakElevation)` returns a normalized route altitude for the SVG profile; it is a visual planning model, not a forecast.
- `campStops(peakElevation, days, support)` returns deterministic camp markers with labels and normalized positions.
- `plannerSummary(peak, days, support)` returns the selected title, elevation, days, support label, and a safe inquiry payload.
- `plannerReducer(state, action)` handles `selectPeak`, `setDays`, `setSupport`, and `lockPlan` with clamping and a single state source.

The default selected peak is Everest, the default planning band is 21 days, and the default support mode is `guided`. Those are UI defaults, not claims about a real itinerary. The fourteen peak elevations are sourced from the supplied expedition reference and displayed as factual mountain data.

## Accessibility and security

- One `h1`, ordered headings, named controls, keyboard-operable peak selector and range input, visible instant focus rings, and a live region that announces only planner selection changes.
- The route SVG is labelled, decorative lines use `aria-hidden`, and every media placeholder has an accessible label.
- Form input is trimmed and validated at the boundary; no network request is made, no user input is inserted as HTML, and the success state says the template is not connected.
- Reduced motion removes route scrubs, parallax, hover tilt, and ambient loops while preserving the planner, final values, and all content. No-JS renders the peak list and a complete inquiry form.

## Motion identity

**Technical / cinematic, showpiece.** The verbs are **plot** and **lock**. The signature moment is a dark-blue route line drawing from base camp to summit while camp markers snap into place and the planner readout resolves the support plan.

### Motion map

| Element | Enter | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
|---|---|---|---|---|---|
| Header | wordmark and links trace in at 150 ms | compresses and fills route progress | active link rule slides | menu morphs and panel clips in | hides on downward scroll, returns upward |
| Hero | split media settles, title rises by line, action arrives last | route line advances toward planner | CTA fill wipes, image coordinate spotlights | press scales and springs back | hero dims as planner takes the stage |
| Planner | panel clips in, route profile draws | selected route line and camp markers scrub with progress | controls gain focus ring and selected row lifts | peak/days/support changes slide readout directionally | locked plan hands data to inquiry |
| The fourteen | rows stagger in from the route edge | selected row keeps a small altitude trace | row rule draws and image slot nudges | row selection updates planner | index line becomes architecture line |
| Expedition architecture | stage labels draw | route line progress and stage emphasis | stage card lifts on fine pointer | stage selection changes detail panel | final stage wipes to logistics |
| Sherpa partnership | role rows rise, image wipes | one bounded image drift | role cards spotlight | role selection updates detail | image line hands to logistics |
| Logistics board | table rows draw in | no continuous scroll system | row rule and focus state | filter tabs slide directional | last row becomes field-note rule |
| Field notes | cards cascade with small rotation | rail drifts once against scroll | lift, spotlight, neighbouring dim | card selection changes detail | final card clips toward inquiry |
| Inquiry | fields rise in stagger | stable form | floating label/focus ring | invalid shake, loading, success replacement | success panel clips into footer scene |
| Footer scene | image settles and columns trace | giant wordmark moves a bounded amount | links draw underline | back-to-top springs | route line quiets and stops off-screen |

Ambient motion is capped at three visible loops: route line, one photograph grain drift, and footer scene movement. They pause off-screen and disappear under reduced motion.

