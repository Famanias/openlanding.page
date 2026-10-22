# VOLUME ZERO — design spec

## Requirements

- Next.js 16.4 App Router, React 19, TypeScript and Tailwind CSS v4.
- The route group owns its root layout and imports only npm packages plus files inside `src/app/(volume-zero)/`.
- The only runtime package used by the template is `three`; WebGPU is attempted first and WebGL2 is the fallback. No image or video assets are required.
- The page must remain complete with JavaScript disabled, with `prefers-reduced-motion: reduce`, and when WebGPU is unavailable.
- Only `transform`, `opacity`, `clip-path` and SVG stroke offsets animate. The chamber canvas is the one GPU-driven visual system.

## Concept

VOLUME ZERO is a fictional Rotterdam acoustic-architecture studio for museums, theatres and serious listening rooms. The studio maps a room's source, listener and reflections before construction so sound arrives whole.

**The central idea → the signature mechanic:** sound is a journey through space, so the page is a live acoustic chamber. Scroll moves the camera from source to listener, the listener control changes the point of view, and surface controls rebuild the reflected ray field.

The brand's language is spatial and measured: projects are **rooms**, materials are **surfaces**, the work is a **field**, the listening position is a **coordinate**, and a commission is a **brief**. The gallery gains an acoustic-architecture instrument: a WebGPU object whose meaningful state is a ray field rather than a product carousel.

## Palette

Three colours only. Tints are made with `color-mix()` from these tokens; no extra hex values belong in the route.

| Token | Hex | Role |
|---|---|---|
| `--color-ink` | `#171B20` | Graphite room ground, display type, dark panels and canvas fallback |
| `--color-paper` | `#F1EEE5` | Vellum page field, primary copy and light control surfaces |
| `--color-accent` | `#2B9BAA` | Signal teal: ray lattice, live states, focus rings and primary actions |

Graphite on vellum is 14.1:1. Vellum on graphite is 14.1:1. Signal teal is used as a graphic, fill or large display accent; small text uses graphite or vellum for AA contrast.

## Type

| Role | Face | Use |
|---|---|---|
| Display | **Oxanium** 500/600/700 (`--font-oxanium`) | wordmark, hero, section titles and instrument numbers; squared and calibrated |
| Body | **Manrope** 400/500/600/700 (`--font-manrope`) | readable narrative, buttons, forms and case-study copy |
| Utility | **Azeret Mono** 400/500 (`--font-azeret-mono`) | coordinates, room codes, readouts, labels and the progress rail |

The hero is `clamp(3.6rem, 10.5vw, 10.5rem)` with a fixed two-line break. Section titles use `clamp(2.6rem, 6vw, 6rem)`. Body copy is 17px/1.6. Utility labels are 11–12px, uppercase, with 0.14em tracking.

## Layout

- Page gutter: `clamp(18px, 5vw, 76px)`; content max 1320px.
- Header is fixed and collapses from a full instrument strip to a compact translucent rail after 72px. The hairline progress indicator is driven by one root `--vz-progress` value.
- Sections alternate vellum and graphite. The chamber is a 360svh pinned stage on fine-pointer desktop; the same story is an accessible stacked flow on phones and reduced motion.
- Corners are 4px for panels, controls and cards. The mark's hexagonal enclosure is the only strong geometry.
- The page uses a 12-column desktop grid and a single-column flow below 760px.

## The chamber mechanic (`chamber/`)

`chamber/geometry.ts` contains pure functions used by the canvas and the accessible readout:

- `clamp01(value)` constrains all scroll and control values.
- `chamberProgress(scrollY, top, height, viewport)` maps real section offsets to 0–1 and never reads layout during the scroll loop.
- `cameraAt(progress)` eases the camera from source wall to listener wall with a smoothstep curve; `depth` and `yaw` are deterministic.
- `listenerAt(progress, offset)` returns a 3D point in room units; the UI range control supplies `offset`.
- `reflectionPoints(listener, surface)` returns a stable set of rays. The three surfaces (`felt`, `slat`, `stone`) change absorption and reflection count, never the page layout.

The canvas paints a vellum chamber with graphite edges, a teal source pulse, a listener node and reflection lines. `ChamberCanvas` tries `WebGPURenderer` with a small TSL node material for the pulse, then falls back to `WebGLRenderer`. It starts on idle for desktop and only after the user taps the chamber on touch. Under reduced motion it does not mount; the server-rendered SVG diagram remains.

## Motion

**Identity:** technical/cinematic. The two verbs are **scan** and **focus-pull**. The system uses `--ease-out-expo` for arrivals, `--ease-in-out` for wipes and `--ease-spring` for press release. Durations are 90ms instant, 180ms fast, 420ms base, 800ms slow and 1200ms hero; child stagger is 70ms.

**Signature moment:** halfway through the pinned chamber, the walls clip away into a single moving ray lattice; the selected surface value remains in the HUD while the room rebuilds around it.

### Motion map

| Section/component | Enter | Scroll-linked | Hover/focus | Press/state change | Exit/handoff |
|---|---|---|---|---|---|
| Header | mark drops, nav scans from the left | compacts and progress rail fills | links draw a teal rule | menu button compresses to 0.97 | returns on upward scroll |
| Hero | vellum field settles, split headline rises, CTAs stagger | contour lines drift at two depths | CTA fill wipes from the pointer side | spring press and label nudge | hero scales to .97 as chamber takes focus |
| Chamber stage | canvas and HUD clip in | camera depth, yaw and ray count scrub from progress | surface cards lift and spotlight | listener range updates HUD and rays | walls clip away into the lattice moment |
| Surface library | cards cascade from the active rail | selected surface keeps a slow scan line | card tilts ±2° and raises 6px | selection swaps `data-active` and count-up | selection hands teal state to Rooms |
| Rooms in practice | case rows mask-rise; dividers draw | room index and contour bands parallax | rows reveal a listener dot | row selection updates details | last row wipes into response chart |
| Response curve | path draws with stroke offset | readout follows a fixed progress sample | chart point enlarges on focus | tab switch crossfades data | chart line becomes commission rule |
| Commission form | fields rise in stagger | none; form stays stable | labels and focus rings scan | submit shows loading then success panel | success panel clips to footer mark |
| Footer | wordmark and metadata slide up | quiet marquee moves while visible | links underline from the start | back-to-top button springs | footer settles, no competing loop |

Ambient life is capped at three items: the chamber pulse, the visible utility marquee, and one paused contour drift. They stop off-screen and are removed under reduced motion.

## Signature details

1. Live room coordinate readout (`ROOM 04 / LISTENER 07 / RT60 0.82 S`).
2. Three surface cards with absorption, reflection count and an active teal notch.
3. Room stamps (`VZ-04`, `31 SEATS`, `0.82 S`) repeated across case studies.
4. Hairline progress rail with a movable listener marker.
5. A form success state that changes from `BRIEF RECEIVED` to a stamped `FIELD RESERVED` panel without a network request.

## Do / Don't

- Do use exact measurements, room numbers and spatial verbs.
- Do keep teal for live states, rays and calls to action; it never becomes paragraph text on vellum.
- Do keep surfaces flat and matte, with contour lines and crisp rules.
- Don't add gradients with new hues, glassmorphism, stock photos, people, generic feature cards or audio claims that require a server.
- Don't animate width, height, layout, box-shadow or persistent blur.
- Don't hide copy from reduced-motion or no-JS users.

## Files

```text
src/app/(volume-zero)/
  layout.tsx
  volume-zero/
    page.tsx
    volume-zero.css
    DESIGN.md  PROMPT.md
    icon.svg  opengraph-image.tsx  assets.tsx  assets.generated.ts
    brand/Logo.tsx
    content/rooms.ts  content/rooms.test.ts
    chamber/geometry.ts  chamber/geometry.test.ts  chamber/ChamberCanvas.tsx
    motion/math.ts  motion/math.test.ts  motion/Reveal.tsx  motion/SmoothScroll.tsx  motion/ScrollProgress.tsx
    sections/Header.tsx  Hero.tsx  ChamberSection.tsx  Surfaces.tsx  Rooms.tsx  Response.tsx  Commission.tsx  Footer.tsx
    forms/validate-commission.ts  forms/validate-commission.test.ts  forms/CommissionForm.tsx
tests/e2e/volume-zero.spec.ts
```

## Imagery

The approved direction uses no generated photos or video. `assets.tsx` still provides the repository-standard labelled placeholder and `assets.generated.ts` stays empty. The visual media is the procedural chamber, SVG diagrams and CSS contour texture. If the direction changes later, prompts and filenames live in `docs/image-video-prompts/volume-zero.md` and incoming files belong in `assets/incoming/volume-zero/`.
