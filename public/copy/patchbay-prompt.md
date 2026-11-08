# PATCHBAY — One Developer Portfolio, Four Disciplines

Build an isolated Next.js 16 / React 19 / TypeScript / Tailwind CSS role-switching developer portfolio at `/patchbay`. Use `lenis` for smooth scrolling. All template code and styles must reside strictly within `src/app/(patchbay)/` with zero imports from outside the folder or `@/` aliases. CSS class prefix `pby-`.

## Central Idea & Signature Mechanic
A portfolio for multi-disciplinary developers (Web front-end, Full-stack, AI engineer, UX/UI designer) driven by an interactive hardware patch bay. The user plugs a spring-animated cable into any of the four discipline jacks, or navigates via query parameter `?role=<role>`:
- The hero headline, subcopy, and metrics re-compose.
- Selected work projects re-rank according to role relevance weights.
- The signal flow stack updates inputs, patched tools, and shipped outputs.
- Process steps adapt to the discipline's methodology.
- The case study deep dive swaps to a relevant technical narrative.
- An amber signal pulse sweeps down the page as sections re-rank.

## Palette
Strict 6-color palette (only these hex values, tints generated exclusively with `color-mix()`):
- Graphite `#15161A` (page canvas)
- Panel `#1E2024` (surface cards, chassis, case study background)
- Seam `#34373D` (hairlines, borders, empty jack holes)
- Bone `#ECE8DF` (high-contrast display text, headings)
- Steel `#9A9CA3` (muted text, telemetry labels, mono accents)
- Amber `#F2A93B` (the only signal accent: patch cable, LEDs, active state, focus rings)

## Typography & Geometry
- Display: Familjen Grotesk (weights 500, 600, 700)
- Body: Hanken Grotesk
- Mono: IBM Plex Mono (weights 400, 500)
Load through `next/font/google` with distinct CSS variables. Geometric theme is sharp, technical, and instrument-inspired (0–3px corner radii). Background features a subtle 64px graphite grid with radial vignette.

## Key Sections
1. **Fixed Header:** Brand lockup with SVG jack mark, desktop navigation with animated sliding pill indicator, role switcher chips, and mobile drawer with circular clip-path reveal. Blurs and compresses on scroll down.
2. **Hero:** Mask-revealed headline with height reservation to prevent layout shift during role switches, magnetic CTA buttons, the interactive Patch Bay, live count-up metrics, and an availability marquee.
3. **Selected Work:** Responsive grid of project cards with 3D cursor tilt (±5°), radial spotlight illumination, media scaling, sibling card dimming, technology tags, and animated relevance fit meters.
4. **Signal Flow (Stack):** Three-stage pipeline (Signal In, Patched Through, Signal Out) connected by horizontal signal wires with travelling pulse particles.
5. **Process:** Four-stage execution roadmap with numbered badges and expanding amber rules.
6. **Case Study:** Split technical deep dive displaying project visual, problem statement, architectural approach, and key result counters.
7. **About & Timeline:** Career trajectory and philosophy with year markers and verified external links.
8. **Contact Brief Generator:** Accessible form with floating labels and client-side validation. On submission, generates a formatted local brief file with a deterministic hashed ticket reference (`PB-XXXXXX`) for the visitor to download. No mock backend network calls.
9. **Footer:** Monospaced technical attribution and copyright.

## Motion & Accessibility System
- Motion Personality: Technical / cinematic. Easing curves `--ease-out`, `--ease-out-expo`, `--ease-in-out`, and spring physics.
- Varied Reveals: Masked headline rises, clip-path image wipes, drawn rule lines, staggered scale card cascades, and animated count-ups.
- Interaction States: 3D card tilt, magnetic CTA attraction, button fill wipes, input error shake animations, and SVG check drawing on success.
- Reduced Motion: Full `@media (prefers-reduced-motion: reduce)` support where all content is immediately rendered without animation, physics loops are disabled, and marquee wraps cleanly.
- Progressive Enhancement: `<noscript>` styling override ensures all content is visible with JavaScript disabled.
- Performance: Smooth 60fps target, zero layout shift (CLS 0), Lighthouse performance ≥ 90, accessibility ≥ 95.
