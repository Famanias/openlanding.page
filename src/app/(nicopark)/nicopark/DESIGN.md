# Nico Park — Product Design Portfolio

## Requirements

Nico Park is an independent industrial and digital product designer based in Seoul and Berlin. The landing page serves as an immersive, tactile portfolio showcasing flagship hardware and software projects (LOOP personal audio hardware, FORMA workspace, and KINDRED brand system), interactive engineering experiments, design process notes, and a direct inquiry channel for collaborations.

## Concept

"Design Should Feel Good." High-end consumer hardware meets playful, tactile micro-interactions. The page treats digital components like machined physical objects: chamfered 2px outlines, tactile spring physics, modular card panels, snap toggles, interactive exploded hardware schematics, and an 8-spoke asterisk burst signature mark.

## Palette

- Canvas Ground: `#F8F7F2` (Warm porcelain paper)
- Ink Black: `#191919` (High-contrast typography and structural borders)
- Cobalt Blue: `#3049F0` (Signature accent, primary CTAs, active indicators)
- Signal Coral: `#FF735D` (Attention tags, playhead markers, alerts)
- Butter Yellow: `#F7E36B` (Secondary highlights, active navigation chips)
- Lavender Mist: `#D5C8FC` (Tertiary category panels, hardware chassis)
- Muted Slate: `#515151` (Secondary metadata, captions, specs)
- Outline Border: `#222222` (Machined tactile panel borders)

## Type

- Display: Anton and Barlow Condensed (`font-display`, line-height 0.91, -0.015em tracking)
- Condensed Header: Barlow Condensed (`font-condensed`, 500/600/700/800, uppercase technical headers)
- Technical Mono: JetBrains Mono (`font-mono-tech`, tabular nums, code snippets, hardware tolerances)
- Body: Plus Jakarta Sans (400/500/600/700, clean editorial clarity)
Loaded via `next/font/google` in `src/app/(nicopark)/layout.tsx`.

## Layout

1. **Sticky Header**: Wordmark with spinning 8-spoke burst mark on hover, primary section navigation (`Work`, `Playground`, `About`, `Notes`), magnetic "LET'S CONNECT" action button, and mobile hamburger drawer.
2. **Hero Section**: Bold headline ("DESIGN SHOULD FEEL GOOD"), interactive 3D pointer-tilt stage, floating status pill, mini music player widget, modular tactile toggles, and direct inspection anchors.
3. **Selected Work (01–03)**:
   - `01 LOOP`: Modular handheld audio sampler & tactile playback device.
   - `02 FORMA`: Minimal desktop workspace hub & ergonomic aluminum stand.
   - `03 KINDRED`: Spatial communication device and sensory ambient audio interface.
   - Full slide-over case study modal with deliverable lists, technical metrics, and design problem/solution breakdown.
4. **LOOP Anatomy (Inside the Object)**:
   - Interactive exploded assembly stage with custom slider control (0% assembled to 100% exploded).
   - Layer selection (`Cover`, `Dial`, `PCB`, `Buttons`, `USB-C`) with real-time positional coordinate transforms and material specifications.
5. **LOOP App (Software Demo)**:
   - Interactive software companion preview featuring working waveform canvas, play/pause controls, BPM scrubber, filter cutoff dial, and track selector.
6. **Process (Tactile Methodology)**:
   - 4-phase design philosophy: `01 Notice`, `02 Sketch`, `03 Prototype`, `04 Refine`, accompanied by original engineering sketches and artifact manifests.
7. **Playground (Asterisk Lab)**:
   - Interactive parametric asterisk generator (spoke count, radius, line weight, live SVG export preview) and tactile dial playground.
8. **About & Notes**:
   - Bio, studio workspace illustration, and editorial journal notes on tactile interfaces and hardware design.
9. **Contact & Footer**:
   - Project scope selector, inquiry form with field validation, mailto generator, and quick-scroll to top.

## The mechanic

- `portfolioData.ts` houses pure, tested logic:
  - `getAnatomyPartTransform(part, isExploded, factor)` calculates deterministic x/y translations, rotation angles, and scale factors.
  - `cycleAnatomyPart` and `cycleLoopTrack` handle cyclical navigation with wrap-around boundaries.
  - `calculateAsteriskSpokes(count, innerRadius, outerRadius)` generates parametric starburst coordinate geometry.
  - `validateContactForm(values)` performs client validation for name, email, scope, and message.
  - `buildMailtoHref(values)` constructs URI-encoded mailto links.

## Motion

- Motion Identity: Tactile, mechanical, responsive physical springs.
- Verbs: **snap** and **explode**.
- Signature Moment: Toggling the exploded view slider in the LOOP Anatomy section, watching precision-machined layers cleanly separate with physical spring timing.
- Easing tokens:
  - Spring Ease: `cubic-bezier(0.16, 1, 0.3, 1)`
  - Overshoot Ease: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- Keyframe animations:
  - `specularSweep`: Glass highlight shine on circular dials.
  - `gentleFloat`: Floating UI stickers and product badges.
  - `slowSpin`: Continuous rotational background glyphs.
- Reduced Motion:
  - Full `@media (prefers-reduced-motion: reduce)` overrides setting transition and animation durations to 0.01ms, disabling continuous floating and spins.

## Signature details

- 8-spoke burst asterisk mark (`*`) applied to brand wordmarks, button hover states, and the interactive lab.
- Tactile panels with 2px borders, 24px corner radius (`tactile-panel`), and tactile button states with subtle pointer offset physics.
- High-contrast industrial design color blocking pairing warm porcelain canvas with vivid cobalt and butter yellow.

## Do / Don't

- **DO** keep controls physical, responsive, and tactile.
- **DO** preserve strict relative module isolation within `src/app/(nicopark)/`.
- **DO** validate all form inputs before triggering client actions.
- **DON'T** introduce heavy external canvas runtimes when CSS 3D transforms and SVG geometry provide superior 60fps performance.
- **DON'T** use generic corporate sans-serif typography; maintain the bold Anton / Barlow Condensed industrial voice.

## Files

- `src/app/(nicopark)/layout.tsx`: Root HTML layout with Google Fonts and SEO metadata.
- `src/app/(nicopark)/nicopark/page.tsx`: Next.js client component entry.
- `src/app/(nicopark)/nicopark/App.tsx`: Portfolio application shell and state orchestrator.
- `src/app/(nicopark)/nicopark/nicopark.css`: Scoped Tailwind v4 tokens and animation keyframes.
- `src/app/(nicopark)/nicopark/components/`: Modular section components (Hero, Work, Anatomy, App, Process, Playground, About, Contact, Navbar).
- `src/app/(nicopark)/nicopark/data/`: `portfolioData.ts` and `portfolioData.test.ts`.
- `src/app/(nicopark)/nicopark/assets.tsx` & `assets.generated.ts`: Asset helper interfaces.
- `src/app/(nicopark)/nicopark/icon.svg` & `opengraph-image.tsx`: Social card and brand icon.

## Imagery

Hardware renders and schematics are served from `public/templates/nicopark/`:
- `loop-hero.webp`
- `loop-cover.png`
- `loop-dial.png`
- `loop-shell.png`
- `loop-buttons.png`
- `loop-detail-01.webp`
- `loop-detail-02.webp`
- `forma-ui.svg`
- `kindred-brand.svg`
- `process-sketch-01.svg`
- `process-sketch-02.svg`
- `process-sketch-03.svg`
- `studio-workspace.svg`
- `preview-1600.webp`
