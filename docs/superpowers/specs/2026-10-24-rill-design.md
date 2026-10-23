# RILL landing template design

## Intent

RILL is a fictional field-hydrology studio for dryland farms. It helps growers keep water in the soil longer through contour planning, low-pressure irrigation, and living-soil practices. The template should make the gallery feel like a place a visitor can read rather than a stack of marketing sections: a generated landscape film carries the page, while a single watershed instrument explains how RILL works.

## Goals

- Make the generated landscape stills and short clips the primary visual attention.
- Give the page one memorable interaction: a rain gauge and contour route that follow a drop from ridge to root zone.
- Keep the same rainfall value visible in the pinned stage, the water-budget section, the chapter rail, and the field-walk handoff.
- Show a complete fictional brand with specific field data, a varied editorial alignment rhythm, and an ecosystem footer.
- Remain useful on phones, with reduced motion, and with JavaScript disabled.

## Non-goals and anti-goals

- No WebGL or 3D model; the landscape media should remain the focus.
- No network submission, account creation, or real agronomic advice.
- No generic feature-card treatment, stock photography, gradients outside the locked palette, or greenwashing language.
- No hover-only information; touch and keyboard controls must have equivalent behavior.

## Constraints

- Next.js 16.4.2, React 19.3, TypeScript, Tailwind CSS v4 and the existing repository scripts.
- Route isolation under `src/app/(rill)/`; no `@/` imports from the template.
- Palette is limited to basalt `#14231E`, limestone `#F0E9DB`, iron oxide `#B85C43`, riverstone `#5B8174`, lichen `#87956C`, and silt `#C9B79E`.
- Fonts are Cormorant Garamond, Fira Sans and Fira Mono through `next/font/google`.
- Images and clips are user-generated from `docs/image-prompts/rill.md`; until they arrive, labelled placeholders render in the same boxes.
- Animations use transforms, opacity, clip-path, and SVG stroke offsets. Heavy media is lazy and never required for reduced-motion or no-JS content.

## Approaches considered

1. **Image-led sticky watershed stage (chosen).** Generated stills and short loops fill the viewport while a tested scroll progress value drives the contour overlay, the rainfall gauge, and section handoffs. This keeps media primary and leaves a real, accessible instrument in the story.
2. **Full-screen film scrub.** One long clip carries most of the page with small overlays. It would be quick to understand but would make the water budget and form feel bolted on and would be less resilient while media is missing.
3. **Procedural 2D map.** An SVG/canvas map would make the route deeply interactive but would make the generated landscape secondary and add a larger rendering surface than the concept needs.

The chosen approach balances the user's image-led direction with a mechanic that can be tested without media and can fall back to a normal document flow.

## Brand and copy

- **Name:** RILL.
- **Positioning:** Field hydrology for farms that keep water in the ground.
- **Slogan:** Make every drop take the long way.
- **Voice:** measured, observant, grounded, specific, hopeful.
- **Never:** greenwashed, extractive, hyped, frictionless, disposable.
- **Motion identity:** organic / analog; the verbs are trace and settle.
- **Signature moment:** at 42 mm, the blue runoff line breaks over the ridge footage, follows the contour, and settles into the root zone.

## Experience structure

1. **Hero / Storm film:** image-led landscape plate, RILL lockup, headline, field coordinate, and `Book a field walk` CTA. A short generated clip may replace the still when available.
2. **Read the land:** a `360svh` desktop section with a `100svh` sticky stage. Scroll moves the camera from ridge to root zone; the same stage has a real 0–80 mm range input.
3. **Water budget:** a dark field panel with the live rainfall number, runoff, storage, and root-zone values. The threshold at 42 mm changes the copy and contour state.
4. **Field systems:** three image-led interventions—contour swale, shade row, and low-pressure drip—with lift/spotlight card states.
5. **Field notes:** three farm records with specific hectares, storm totals, and days of available moisture. Cards use a quiet horizontal drift against scroll.
6. **Seasonal ledger:** a twelve-month row that marks first rain, planting, cover crop, and harvest; selecting a month changes the detail panel directionally.
7. **Book a field walk:** client-side form for name, farm, email, acreage, and goal. Validation is local; submit morphs through loading to a success panel.
8. **Ecosystem footer:** a small contour/root/mycelium/water diagram, coordinates, RILL mark, links, and the line “Keep water in the ground.” Its breathing motion pauses when off-screen and under reduced motion.

## Mechanic and data contracts

`src/app/(rill)/rill/watershed/water.ts` owns pure functions:

- `clamp01(value: number): number` limits progress.
- `rainfallAt(progress: number): number` maps 0–1 to an integer 0–80 mm.
- `progressAtRainfall(mm: number): number` is the inverse used by the range input.
- `waterBudget(mm: number): { runoff: number; storage: number; rootZone: number; status: "dry" | "holding" | "ready" }` returns deterministic values; values are percentages of a 100-unit field capacity.
- `watershedPhase(progress: number): "ridge" | "swale" | "storage" | "root-zone"` controls image plate and copy handoffs.
- `contourPoint(progress: number): { x: number; y: number }` keeps the animated drop on a stable SVG route.

The scroll stage uses `progressFromOffsets(rectTop, rectHeight, viewportHeight)` from `motion/math.ts`. The stage reads the real section rectangle and writes one root CSS variable per animation frame; React state changes only when the active phase or live readout changes. `watershed/store.ts` exposes `getSnapshot`, `subscribe`, and `setRain` so the stage, header rail, and water-budget section share one value. The input uses `progressAtRainfall` to scroll the stage when it is active; phones and reduced motion keep the input as the source without pinning.

## Accessibility and fallbacks

- One `h1`, ordered headings, landmarks, named controls, visible focus rings, and `aria-live="polite"` for phase changes only.
- The range input has a visible label, keyboard step of 1 mm, Home/End, and a final value that remains in text.
- `prefers-reduced-motion: reduce` disables smooth scrolling, pinning, parallax, ambient loops, and video playback; every image, contour, value, and form state remains visible.
- A `<noscript>` style rule keeps `[data-reveal]` content visible.
- On 390 px screens the stage becomes normal flow, hover effects become press/in-view feedback, and no content depends on a pointer.

## Open decisions settled by this design

- **Media:** the user generates all stills and clips. The repository carries prompt-driven placeholders until files are copied into `assets/incoming/rill/`.
- **Alignment:** hero and selected detail moments may center or right-align; field records and utility copy stay left. The page deliberately avoids one repeated left column.
- **Image loading:** only `hero-ridge` is eager; all other media is lazy, with fixed aspect-ratio boxes and a phone clip variant.

