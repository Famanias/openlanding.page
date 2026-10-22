# ISOBAR — Design system

## Requirements

- Next.js 16 App Router, React 19, TypeScript, Tailwind v4, and Three.js.
- The route is isolated at `/isobar`; all imports stay inside `src/app/(isobar)/isobar` or use npm packages.
- The page must remain readable and complete when WebGL is unavailable, JavaScript is disabled, or reduced motion is requested.
- Never copy gradients.sh code, assets, or markup. The reference is only for the feeling of live color movement.

## Concept

Weather is pressure in motion, so ISOBAR is one continuous 3D pressure membrane. Scrolling scrubs four transects through the same field; the pressure pin reseeds the membrane and makes the page feel like an instrument rather than a stack of sections.

## Palette

| Token | Value | Role |
| --- | --- | --- |
| `--color-paper` | `#F7F2E9` | warm mineral ground |
| `--color-ink` | `#12101A` | type, contours, chrome |
| `--color-coral` | `#FF5B47` | primary signal and action |
| `--color-mint` | `#2DE2A6` | live / active state |
| `--color-violet` | `#8A6CFF` | deep field volume |
| `--color-sun` | `#FFD447` | rare heat marker |
| `--color-plum` | `#272234` | dark instrument slab |
| `--color-muted` | `#A59DB6` | quiet metadata |

## Type

- Display: Anybody 600 (`--font-anybody`), wide and slightly eccentric, always roman.
- Body: DM Sans (`--font-dm-sans`), calm and readable at 1.05rem / 1.6.
- Utility: IBM Plex Mono (`--font-ibm-mono`), uppercase field labels and telemetry.
- Display sizes use `clamp()` and are capped on small screens; no display italic.

## Layout

Map / Diagram macrostructure. A fixed WebGL field provides the spatial canvas while the document is a measured series of transects and field notes. The nav is an edge-aligned pill with a live status dot. The footer is a compact statement footer. The page uses a single sticky stage in the transect section, then returns to a two-column instrument rhythm.

## Mechanic

`PressureField` builds a three-layer shader membrane, contour tubes, and a particle volume with Three.js. Scroll progress (0–1) changes camera depth, layer separation, field rotation, displacement amplitude, and contour positions. Pointer movement offsets the camera and world. The pressure pin and recipe controls change the seed; density, drift, and contour sliders update shader uniforms and expose derived frequency/depth/amplitude values. The four chamber rows are keyboard-accessible buttons that jump to each transect. The field mounts during idle on fine pointers and has a tap-to-start path on touch; it never mounts under reduced motion.

## Motion

Identity: technical / cinematic. Verbs: **scan** and **shear**. Curves are `--ease-out` for labels and buttons, `--ease-in-out` for field handoffs, and `--ease-spring` for presses. The signature moment is the camera dipping through a contour layer as the transect changes from Shear to Cross-section.

| Element | Enter | Scroll-linked | Hover / focus | Press / state | Exit / handoff |
| --- | --- | --- | --- | --- | --- |
| Nav | drops from depth on load | changes glass density after 60px | underline draws | status dot stays live | stays pinned |
| Hero | kicker → title → copy → readout stagger | camera parallax and pressure readout | CTA fill wipe | scale to `.97` | title yields to reading |
| Field canvas | idle mount, then fades in | camera / membrane / contour scrub | pointer shifts field | pressure pin reseeds | renderer disposes cleanly |
| Reading notes | mask / rise cascade | quiet | row shifts and border warms | — | list hands to transect |
| Transect stage | scale reveal | sticky graphic and active chamber | chamber row shifts | — | ring geometry hands to recipes |
| Material studies | staggered scale | — | tile lifts, gradient volume pivots | tile reseeds field | tiles settle into instrument |
| Instrument | panel rises | controls alter live uniforms | slider focus ring | pin drag/click changes seed | panel dark slab yields to form |
| Form | labels reveal | — | field border lifts | invalid shake, loading label, success replacement | success replaces form |
| Footer | statement rises | — | links draw | — | final rule |

Under `prefers-reduced-motion`, the field engine does not mount, content is visible, transitions are immediate, and the CSS membrane remains as the complete fallback.

## Signature details

1. “Live pressure” readout with a moving latitude and seed identifier.
2. Four chamber labels that track the scroll transect.
3. Material studies with tiny field pins and reseeding behavior.
4. A pressure pin control that can be clicked or dragged.
5. Mono instrument metadata and the coral live-state dot.

## Do / Don’t

- Do keep the field continuous and let the copy attach to it.
- Do keep the UI sparse enough that the canvas reads as architecture.
- Do preserve the paper / mineral contrast and use color as signal.
- Don’t add stock photography, a GLTF mascot, fake browser chrome, gradient text, or a copyable gradient-code tool.
- Don’t use unscoped colors or fonts; all visible values reference the token block.

## Files

- `field/PressureField.tsx` — WebGL2 canvas, contour tubes, particle field, idle / touch mount.
- `field/progress.ts` — pure transect math with tests.
- `motion/` — reduced-motion hook, in-view reveal, and math helpers.
- `sections/IsobarExperience.tsx` — page composition and form state.
- `forms/validate-brief.ts` — client validation with tests.
- `brand/Logo.tsx`, `icon.svg`, `opengraph-image.tsx` — brand surfaces.
- `assets.tsx`, `assets.generated.ts` — future media placeholders.

## Imagery

The core page is procedural 3D and ships without required photos. Art prompts for a poster, field studies, and a short motion reference live in `docs/image-video-prompts/isobar.md`; placeholders stay safe until the user supplies processed assets.
