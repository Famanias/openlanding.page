# Prompt: rebuild "Noctiluca" (a landing page that is a 3D space)

Paste everything below the line into your AI coding agent.

---

Build a landing page in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4**, with **no other runtime dependencies**, for a fictional "house of moving light" called **Noctiluca**: six rooms in a 1912 pumping station on the Tagus in Lisbon, each tuned to a light the sky only makes for minutes.

**The page must not contain a 3D model. The page itself is the 3D space.** The visitor walks down the house's corridor: scrolling moves a camera through rooms, doorways and wall labels, and every wall is a live, moving gradient (think animated mesh gradients with grain).

**Reference** (look and feel only): the live template at https://openlandingpage.vercel.app/noctiluca.

## Brand

- **UI palette, six colours only:**
  - ink `#07060B` (page ground, door walls)
  - lumen `#F3F0EA` (text, wall-label card stock)
  - glow `#C9B8FF` (the one accent: solid buttons, focus rings, readouts)
  - dusk `#8E889B` (muted text)
  - glass `#16131F` (plaque glass at 88–95 %)
  - ember `#FFA38F` (form errors only)

  Make tints with `color-mix()`. The rooms' light colours are content, kept in one data file.
- **Type (via `next/font/google`):**
  - **Syne** 600/700 for display.
  - **Schibsted Grotesk** for body.
  - **Fragment Mono** (not preloaded) for eyebrows, labels and readouts.

  Headings are never italic.
- **Logo:** an arch-topped doorway outline in lumen, with a lilac pool of light on its floor and one lilac spark inside, plus "NOCTILUCA" in Syne 700 uppercase. **Favicon:** the same doorway on an ink rounded square.

## Architecture: one camera, two renderers

- **DOM in CSS 3D:**
  - A tall scroll track (`7 × 160vh + 100vh`) holds a `position: sticky; height: 100vh; overflow: clip; perspective: P` stage.
  - Inside it sits a 0×0 `preserve-3d` world at the stage centre, holding eight `section`s.
  - JS writes only the world's transform: `translateZ(P) rotateX(pitch) rotateY(yaw) translate3d(0, 0, −cameraZ)`.
- **WebGL2 behind it:** one full-screen fragment shader ray-casts the *same* corridor from the *same* camera, in the same units (CSS px, y down, z toward the viewer):
  - `dir = normalize(screenXY, −P)`, rotated by `Ry(−yaw)·Rx(−pitch)`;
  - intersect a box tunnel (walls at ±half-width, ceiling, floor);
  - pick the room from the hit depth;
  - shade it.
- **Geometry** (in a tested `geometry.ts`, mirrored as CSS custom properties):
  - fov 55° → P = 96.05 vh;
  - rooms 2.6 P apart;
  - each plaque P in front of its station, so it reads at exactly 1:1;
  - each wall label 1.38 P in, on the opposite wall, turned ±24°;
  - each doorway 1.7 P in;
  - tunnel half-width `min(36vw, 66vh)`, ceiling −40 vh, floor +33 vh.

  Name the depth variable `--nl-depth`, because `--nl-a…d` are the light stops.
- **Doorways** are DOM, so they need no shader logic:
  - a solid ink wall across the tunnel with an opening 0.92 × the half-width wide and 70 % tall;
  - three 9 vh reveals (left, right and soffit, via `rotateY(±90deg)` and `rotateX(−90deg)`) lit by the next room's colour;
  - the next room's numeral and name on the lintel.

  An end wall closes the corridor 2.4 P behind the Exit plaque.

## The walk (pure, unit-tested functions)

- **`cameraAt(scroll)`:** per station stride (1.6 × viewport height), the first 30 % is a dwell, and the rest walks to the next station with smootherstep. The render eases toward it with `1 − e^(−9·dt)`. Pointer yaw/pitch is ±0.05 / ±0.035 rad on fine pointers.
- **`planeOpacity(distance in P)`:** solid from 0.8 to 2.6 P; dissolving between 0.8 and 0.35 P as you walk through; a 0.28 "ghost" from 3.4 to 4.6 P (the next room, seen through the door); gone by 6 P.
- **`revealAfter`:** in the wide rooms the label waits until its plaque has dissolved.
- **Accessibility:** fade far planes with opacity plus `pointer-events: none`, **never `visibility: hidden`**, so tabbing still reaches them. `focusin` inside a room scrolls to that station. `#nl-*` links, `hashchange` and deep links on load map to station offsets.
- **Room store:** a tiny external store emits only when the nearest room changes. React reads it with `useSyncExternalStore`; nothing re-renders per frame.

## The light (shader)

- **The core:** a domain-warped fbm "mesh gradient" through four stops per room, which flows like poured silk.
- **Shaped per room:**
  - **Blue Hour:** a sky ramp plus a warm horizon band low on the wall.
  - **Aurora:** hanging curtains, green low and violet at the top edge, with vertical rays.
  - **Noctiluca:** dark water, a swell line, and sparks whose brightness follows pointer speed and distance.
  - **Alpenglow:** light held at the top of the wall.
  - **Score:** the visitor's palette.
  - **Visit:** a dim cone.
- **Floor and ceiling:**
  - the floor is dark and reflects the walls toward its edges;
  - the ceiling is dark, with one cove light down the centre the whole length of the house.
- **Finish:** exponential fog to ink (it keeps the centre dark, so text always sits on dark), a vignette, and ±0.5/255 dither. Render at half resolution and add an SVG feTurbulence grain overlay in CSS.
- **Start policy (tested):**
  - never under reduced motion or without WebGL2;
  - on `requestIdleCallback` on desktop;
  - on touch or narrow screens only after a **"Turn the lights on"** pill (`aria-pressed`).

  A CSS "poster" (radial and linear gradients from the room's four stops, crossfaded per room) shows before and without WebGL. In flow mode the shader draws a flat field of the room in view.

## Modes

- **Corridor:** `(min-width: 900px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)`. Set `data-nl-mode` on `<html>` from an inline script before first paint, with `suppressHydrationWarning`.
- **Flow:** everything else. The same DOM stacked: an arched portal per room painted with its light, a glass plaque and the wall label. Plaques swing in on `animation-timeline: view()` (transform only). Under reduced motion it's fully static.

## The eight stations

1. **Foyer** (`#nl-foyer`):
   - mono kicker "Estação Elevatória nº 4 · Lisboa";
   - h1 "A house made of **moving light.**" (the last two words gradient-clipped);
   - lead "Six rooms in a 1912 pumping station on the Tagus, each tuned to a light the sky only makes for minutes…";
   - buttons "Book a timed entry" (solid) and "Walk in →";
   - facts 6 rooms · 43 m of corridor · ≈ 40 min · Tue–Sun 10:00–20:00;
   - a "Scroll to walk in" hint.
2. **I · Blue Hour:** "The twenty minutes after the sun." Label: Civil twilight, sun 0° to −6°, ≈ 460 nm, Lisbon June 21:05–21:38.
3. **II · Aurora:** "Curtains that answer the solar wind." Label: green line 557.7 nm, red line 630.0 nm, trace Tromsø 10 May 2024.
4. **III · Noctiluca:** "The sea, lit from inside." The only room that reacts to the pointer. Label: Noctiluca scintillans, ≈ 474 nm, 0.1 s flashes.
5. **IV · Alpenglow:** "The mountain keeps the sun after you lose it." Label: ≈ 610 nm, ≈ 400 km of atmosphere.
6. **V · The Score Room:** "Compose the next room."
   - Presets Orchid / Glacier / Moss / Ember (`aria-pressed`).
   - Range dials Hue 0–359, Drift 0–100, Bloom 0–100.
   - A four-stop strip and a readout "528 nm · drift 0.30 · bloom 46%". Build the stops in OKLCH (L 0.14 / 0.34 / 0.64 / 0.90, hue +0/+18/+38/+70), gamut-clamped. Dominant wavelength comes from hue anchors 30→620, 65→595, 100→575, 145→530, 195→490, 265→465, 300→420; anything outside is "purple line".
   - The dials drive the shader uniforms live.
7. **VI · Visit:** "Come in from the street."
   - Hours: Tue–Thu and Sat–Sun 10:00–20:00 (last entry 19:20), Friday to 23:00 (last entry 22:20), closed Monday.
   - A timed-entry form:
     - day (not in the past, not Monday);
     - 20-minute slot radios (late Friday slots from 19:40 are dashed);
     - a guests stepper 1–8;
     - email.
   - €18 a guest, €22 late Fridays; the live total reads "3 × €18 = €54, paid at the door".
   - Errors: "Pick a day to visit." / "That day has already gone." / "The house is closed on Mondays." / "Choose an entry time." / "Book for 1–8 guests." / "Enter an email for your tickets."
   - Success, as a focused `role="status"`: "Held: 3 guests on Tue 27 Oct at 12:00, €54 at the door. Tickets go to …". **No network request.**
   - A building label on the far wall.
8. **Exit:** logo with tagline, "The light keeps moving after you leave.", footer nav, address, ©.

Plaque sides alternate: left, right, left, right, then the wide rooms on the left.

## Chrome

- **Top bar:** a floating glass pill with the logo, numbered room links (`aria-current="location"`) and a "Book entry" button.
- **Depth rail (right, ≥ 900px):** ticks F · I–VI · E, a glowing marker that moves every frame, and a readout "III · Noctiluca / 21.6 m" (7.2 m per room). A separate polite live region announces the room on arrival.

## Images

Five documentary 3:2 field-note photos on the labels: `blue-hour-tagus`, `aurora-tromso`, `noctiluca-shore`, `alpenglow-peaks`, `building-exterior`. Two optional muted 6 s loops use them as posters. Until they exist, render room-tinted labelled placeholders.

## Quality bar

- Only `transform` and `opacity` animate in the DOM. UI transitions run 120–200 ms on `cubic-bezier(0.23, 1, 0.32, 1)`. Presses scale to 0.97; hover only on fine pointers.
- One h1. Every control is labelled. Focus rings are 2px glow. AA contrast throughout.
- No horizontal overflow at 375px. Use `overflow-x: clip`, never `hidden`, on html and body.
- Unit tests cover the geometry, opacity curves, room-at-depth, start policy, score maths, slots and validation. E2e tests cover the walk, deep links, focus walking the camera, the mixer, the form, the phone tap-to-light and reduced motion (no canvas, no corridor).
