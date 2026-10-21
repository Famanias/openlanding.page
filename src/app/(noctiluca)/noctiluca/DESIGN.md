# NOCTILUCA — design spec

A landing page for a fictional "house of moving light": six rooms in a 1912 pumping station on the Tagus, each tuned to a light the sky only makes for minutes (blue hour, aurora, bioluminescence, alpenglow), a room where visitors compose the light themselves, and timed entry. **The page doesn't contain a 3D model. The page is the 3D space:** you walk down the corridor of the house, through its doorways, past its wall labels, and every wall is a live, moving gradient.

## Requirements

- **Next.js ≥ 16.4** (App Router, a route group with its own root layout, `next/font/google`, `next/og`), React 19, TypeScript, Tailwind CSS v4.
- **No runtime dependencies.** The light is raw WebGL2 (one full-screen fragment shader); the 3D world is CSS 3D transforms; state is `useSyncExternalStore` plus one rAF loop.
- Mobile Lighthouse: performance ≥ 90, accessibility ≥ 95, best practices 100.
- The template imports only npm packages and files inside `src/app/(noctiluca)/`.

## Concept

- **The idea → the mechanic:** a house of light is a sequence of rooms you walk through, so the page is a corridor and scrolling is walking. Scroll offset becomes camera depth. The camera stops at each room's plaque, then walks on through the doorway into the next room's light.
- **One camera, two renderers.** The DOM (plaques, wall labels, doorways, the end wall) lives in a CSS 3D world (`perspective` on a sticky stage, `preserve-3d` world). The WebGL canvas behind it ray-casts the same corridor (walls, floor, ceiling) from the *same* camera, in the same units (CSS px, y down). So text stays real, selectable, accessible DOM, and it sits in the same space as the light.
- **Every section is a room.** The hero is the Foyer. "Features" are Rooms I–IV, each a natural phenomenon with a museum wall label. The interactive demo is Room V, the Score Room. Pricing and booking are Room VI, Visit. The footer is the Exit, a wall that closes the corridor.

## Palette

Six UI colours, registered in `scripts/templates.config.ts`; `npm run check` enforces them.

| Token | Hex | Role |
|---|---|---|
| ink | `#07060B` | the house after dark: page ground, door walls, the end of the corridor |
| lumen | `#F3F0EA` | text; the card stock of the wall labels |
| glow | `#C9B8FF` | the one UI accent: solid buttons, focus rings, the mark's light, live readouts |
| dusk | `#8E889B` | muted text, eyebrows, rail ticks (5.8:1 on ink) |
| glass | `#16131F` | plaque glass (88–95 % over the light) |
| ember | `#FFA38F` | form errors only |

- **The room light is content colour**, like a photograph of the sky: four stops per room in `light/phenomena.ts`, exempted in the palette config. The Score Room's stops are computed at runtime from the visitor's hue (OKLCH → sRGB in `score/score.ts`).
- All UI tints are `color-mix()` of the six.

## Type

| Role | Face | Use |
|---|---|---|
| Display | **Syne** 600/700 (`--font-syne`) | hero, room titles, door numerals, wall-label titles |
| Body | **Schibsted Grotesk** (`--font-schibsted`) | copy, buttons, nav |
| Utility | **Fragment Mono** (`--font-fragment`, not preloaded) | eyebrows, wall-label rows, readouts, slots |

- Corridor type is height-aware so plaques fit at 1:1: hero `min(6.4vw, 10.4vh, 6.6rem)`, room titles `min(3.2vw, 5.4vh, 3.3rem)`.
- Headings are always upright. Emphasis is the hero's gradient-clipped "moving light."

## Layout: the corridor

All geometry is in `house/geometry.ts`, mirrored by CSS custom properties on `html[data-nl-mode="corridor"]`:

| Quantity | Value | CSS |
|---|---|---|
| Field of view | 55° vertical | |
| Perspective P | `0.5 / tan(27.5°)` = 96.05 vh | `--nl-p` |
| Room depth | 2.6 P | `--nl-depth` |
| Plaque | P in front of its station (renders at exactly 1:1) | |
| Wall label | 1.38 P, on the opposite wall, turned ±24° | |
| Doorway | 1.7 P (opening 0.92 × half-width, 70 % tall, 9 vh reveals) | |
| End wall | 2.4 P past the Exit station | |
| Tunnel | half-width `min(36vw, 66vh)`, ceiling −40 vh, floor +33 vh | `--nl-hw`, `--nl-ceil`, `--nl-floor` |
| Scroll per station | 1.6 vh × 100 (30 % dwell, 70 % walk) | track `7 × 160vh + 100vh` |

- **Corridor mode** needs `(min-width: 900px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)`. An inline script sets `data-nl-mode` before first paint, so desktops never flash the stacked layout.
- **Flow mode** (phones, short windows, reduced motion) is the same DOM stacked: an arched "portal" per room painted with that room's light, a glass plaque, and the wall label below. On wide flow screens it's a portal | plaque | label grid.

## The mechanic

1. `cameraAt(scroll)`: scroll offset from the track top ÷ stride → station index + local fraction. The first 30 % of each stride is a dwell (camera still). The rest walks to the next station with smootherstep, so it settles on every plaque. Rendering eases toward it with `1 − e^(−9·dt)`.
2. The world transform is the inverse camera: `translateZ(P) rotateX(pitch) rotateY(yaw) translate3d(0, 0, −z)`. Yaw and pitch follow the pointer (±0.05 / ±0.035 rad, fine pointers only).
3. Per plane, `distance = (cameraZ − planeZ) / P` gives the opacity via `planeOpacity` (solid 0.8–2.6 P, dissolving as you walk through it, a 0.28 ghost when glimpsed through the next door). In the wide rooms (Score, Visit) the wall label uses `revealAfter`: it appears only once its plaque has dissolved.
4. The shader casts `normalize(screen.xy, −P)` rotated by `Ry(−yaw)·Rx(−pitch)` from the camera and intersects the box. `roomAt(depth)` picks the room, which changes exactly at each doorway. It shades walls with that room's field, and the floor and ceiling with dark reflections plus one cove light. Fog to ink keeps the centre dark, so text always sits on dark.
5. **Room fields:** a domain-warped fbm "mesh gradient" through four stops, shaped per room: horizon band (Blue Hour), hanging curtains with rays (Aurora), dark swell with pointer-reactive sparks (Noctiluca), light held at the top of the wall (Alpenglow), the visitor's own score (Score), a dim cone (Visit).
6. **Keyboard and links:** the rooms share one sticky stage, so `#nl-*` links, `hashchange`, deep links on load and `focusin` all map to the station's scroll offset. Tabbing into a far room walks the camera there. Far planes are faded with opacity, never `visibility: hidden`, so they stay in the tab order.

## Motion

- Easing tokens: `--ease-nl-out` (UI, 120–200 ms), `--ease-nl-in-out` (the hint line).
- Only `transform` and `opacity` animate in the DOM. The light is shader time.
- Phones: plaques swing into place on a CSS scroll timeline (`animation-timeline: view()`, transform only).
- **Reduced motion:** flow mode, no scroll timeline, and the WebGL engine never mounts (`startPolicy` → `never`, covered by a unit test and an e2e test). Rooms show their still CSS light.

## The light's start policy

`light/start-policy.ts`: never under reduced motion or without WebGL2. On idle on desktop. On touch screens and narrow windows, only after **"Turn the lights on"**. In flow mode the shader renders a flat field of the room in view, crossfading between rooms. It renders at half resolution (the field is soft), with dither in the shader and an SVG grain overlay in CSS.

## Signature details

1. **The depth rail:** room ticks F · I–VI · E, a glowing marker that moves continuously with the camera, and a live readout ("III · Noctiluca / 21.6 m", 7.2 m per room). The room name is announced politely on arrival, never per frame.
2. **Doorway lintels:** the next room's numeral and name cut into the lintel, with jamb edges and reveals lit by the next room's light.
3. **Museum wall labels:** lumen card stock, a field-note photo, mono data rows (wavelength, sun angle, duration) and the room's four stops as a spectrum strip.
4. **The ceiling cove light** runs the whole length of the house, so you always have a vanishing line.
5. **The doorway glimpse:** the next room's light and its ghosted plaque are visible through every door.

## Do / Don't

- **Do** keep every plaque inside the tunnel cross-section at 1:1, and keep text on glass or on the fogged centre.
- **Do** add rooms by adding a `ROOMS` entry plus a `PHENOMENA` entry. The track height, rail, nav and shader array (`ROOMS` in `shader.ts`) must agree.
- **Don't** put `overflow: hidden` on any ancestor of `.nl-world` other than the stage (it flattens `preserve-3d`), or `overflow-x: hidden` on html/body (it breaks sticky). Use `clip`.
- **Don't** reuse the `--nl-a…d` names: they are the light stops.
- **Don't** add per-frame React state. The camera writes the DOM directly; React only hears about room changes.

## Files

```
layout.tsx                 fonts, metadata, the pre-paint mode script
noctiluca/page.tsx         composition
noctiluca/noctiluca.css    tokens, flow layout, corridor geometry
house/geometry.ts (+test)  camera, opacity curves, rooms along z, flow-mode room
house/House.tsx            track, sticky stage, 3D world, rAF loop, links/focus/hash
house/frame.ts             per-frame state shared with the light and the rail
house/room-store.ts (+test)
house/mode.ts              corridor media query + inline script
light/shader.ts            the corridor fragment shader
light/light-engine.ts      WebGL2 setup and per-frame uniforms
light/Light.tsx            mount policy, the touch switch
light/Poster.tsx stops.ts  the still CSS light
light/phenomena.ts         each room's light (content colour, exempt)
light/start-policy.ts (+test)
rooms/rooms.ts (+test)     the eight stations: copy, labels, sides
rooms/RoomShell.tsx Doorway.tsx WallLabel.tsx Foyer.tsx PhenomenonRoom.tsx ExitRoom.tsx
score/score.ts (+test)     OKLCH palettes, wavelength, readout, shader uniforms
score/Mixer.tsx ScoreRoom.tsx
visit/visit.ts (+test)     slots, late Fridays, pricing, validation
visit/EntryForm.tsx VisitRoom.tsx
chrome/TopBar.tsx DepthRail.tsx
brand/Logo.tsx icon.svg opengraph-image.tsx
assets.tsx assets.generated.ts
```

## Imagery

Five documentary field-note photos (3:2) on the wall labels, plus two optional 6-second loops. The prompts are in `docs/image-video-prompts/noctiluca.md`. Until the files exist, labels show room-tinted labelled placeholders; the page needs no imagery to work, because the light is the content.
