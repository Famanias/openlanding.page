# TOURNE: hand-turned vessels, made to order

Build an isolated Next.js 16 / React 19 / TypeScript / Tailwind v4 landing page at `/tourne` for a fictional pottery studio in Tacoma, Washington. Use `three` (WebGL) and `lenis`. Everything lives in `src/app/(tourne)/` and imports only npm packages or its own files (no `@/` aliases). CSS class prefix `tn-`.

## Central idea
The wheel turns and clay rises under your hands, so the page is a real-time 3D lathe. Scrolling pulls a lump of clay into a vessel, draggable handles reshape its profile, glazes recolour it, and the same state feeds the collection and the order form.

## Palette (only these hex values, tints via `color-mix()`)
bone `#F4EEE3` (page), oat `#E9DFCE` (tint), clay `#A8492D` (the only accent), soot `#1F1A17` (ink and dark slabs), umber `#6B5E54` (muted text), celadon `#8FB5A0` (rare accent on dark slabs and glaze), porcelain `#FFFDF8` (cards). The 3D vessel's glaze and clay colours are content colours and live in `tourne/vessel/`.

## Type
Fraunces (display, `SOFT` 100, opsz 144), DM Sans (body), DM Mono (readouts), through `next/font/google` with distinct CSS variables. Fluid `clamp()` sizes. Geometry is heavily curved: pills and 28 to 48 px radii. Background uses slowly drifting organic blobs.

## Sections
1. Fixed pill header: logo, nav with a sliding active pill, magnetic "Reserve a slot" CTA, mobile full-screen menu opening with a circle clip-path, focus trap, Escape to close. Compresses after 80 px, hides on scroll down.
2. Hero: "Shape it. We throw it." with a CSS keyframe load sequence, count-up stats (11,482 pieces, 1,305 °C), a live "Wheel 62 rpm" readout, an SVG moon jar over drifting blobs.
3. Workshop (signature): sticky stage with a 3D wheel and three steps. Throw: a 230 svh block whose scroll progress pulls the lump into the vessel and speeds the wheel. Shape: SVG profile editor with four width handles (lip, neck, belly, foot) and a height bar, pointer drag plus arrow keys, live spec (height, width, volume). Glaze: six glazes.
4. Studio: glaze marquee, four process steps with drawn rules, two potter portraits (placeholders until generated), facts with count-ups.
5. Forms: five forms (Moon Jar, Tall Ewer, Tea Bowl, Bud Vase, Storage Crock) as tilt cards with pointer spotlight and sibling dimming; "Put it on the wheel" loads the form.
6. Order: sticky summary of the live vessel with a quote, floating-label form (name, email, postcode, note), shake on invalid, loading, then a choreographed success stamp with a hashed reference. No network request.
7. Footer.

## The mechanic
`vessel/profile.ts`: five control radii at height fractions `[0, .38, .68, .87, 1]` joined by Catmull-Rom, sampled to 44 points and passed to `THREE.LatheGeometry` (96 segments). `throwParams(target, t)` blends a `LUMP` profile into the target; `t = easeOutQuint(sectionProgress(...))`. `volumeMl` integrates πr² over the inner wall (5.5 mm wall). `vesselReducer` clamps parameters and handles `set`, `form`, `glaze`, `reset`. Scroll values go to a ref and CSS custom properties from one rAF loop, never React state.

3D rules: dynamic import; start on idle for fine pointers and on tap for touch; never mount under reduced motion; pause off-screen and in hidden tabs; DPR capped at 1.5; dispose everything; context loss falls back to the server-rendered SVG poster.

## Motion
Organic / analog, expressive. Verbs: breathe, unfurl. Tokens in `@theme` (`--ease-out`, `--ease-out-expo`, `--ease-in-out`, `--ease-spring`, `--dur-instant` 90 to `--dur-hero` 1200 ms, `--reveal-shift`, `--stagger`). At least four reveal types (mask-rise words, clip-path wipes, drawn rules, staggered scale cascades, count-ups). Buttons wipe, roll their label and press to `scale(.97)` with a spring release. Hide pre-reveal states only under `prefers-reduced-motion: no-preference` and ship a `<noscript>` override. Reduced motion: everything visible, no ambient loops, no WebGL. At most three ambient loops in view.

## Quality bar
One `h1`, landmarks, labelled sliders and radio group, visible focus, AA contrast. Unit tests for motion math, vessel profile and reducer, order validation and content. Playwright spec for the signature interaction, form, keyboard and reduced motion. Register in the six gallery locations, add `docs/image-prompts/tourne.md` and a DESIGN.md with the motion map.
