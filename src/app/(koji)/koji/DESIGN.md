# KŌJI 麹: design system

A landing page for a fictional fermentation-focused Japanese restaurant inside an imagined 1972 Metabolist concrete tower in Ginza. **Everything is flat 1960s–90s Japanese brutalism, except the food, which is 3D:**

- a real-time, procedural nigiri in the hero;
- a scroll-scrubbed video "food flight" through the omakase courses.

## Requirements

Copy two folders into a fresh Next.js app (`npx create-next-app@latest --ts --tailwind --app --src-dir`), delete the scaffold's `src/app/layout.tsx`, `page.tsx` and `globals.css`, then install:

```bash
npm i three @types/three
```

- **Next.js ≥ 16.4** (App Router, route groups with their own root layout, `next/font/google`, `next/og`)
- **React ≥ 19**, **Tailwind CSS v4** (from `create-next-app`), **Three.js ≥ 0.186** (`three/webgpu`, `three/tsl`)
- Folders: `src/app/(koji)/` (code) and `public/templates/koji/` (images, plus the video clips once generated)
- `*.test.ts` files are optional and need `vitest`
- `flight/scrub-engine.js` is vendored from [oso95/scroll-world](https://github.com/oso95/scroll-world) (MIT), with three marked patches

## Concept

- **The restaurant:** twelve seats at one board-marked concrete counter on the 14th floor (B1–14F), eleven courses built on kōji, miso and shio, open 18:00–23:00.
- **The look:** raw concrete slabs, monumental type, rigid grids, thick rules, one vermilion signal colour. The architecture appears only in photographs. The page itself is flat and graphic.
- **The food is the only thing with depth.**

## Palette: concrete, plus one signal

| Token | Hex | Role |
|---|---|---|
| `--color-sumi` | `#1A1918` | Ink black: the hero, omakase, chef and footer slabs, text on concrete |
| `--color-shadow` | `#4A4743` | Concrete in shade: noren panels, menu rules, placeholders, the slab wipe |
| `--color-beton` | `#8E8A83` | Béton brut: the kitchen and reservation slabs, muted text on dark |
| `--color-washi` | `#EDEAE4` | Paper: text on dark, the building slab, the reservation card |
| `--color-shu` | `#C8331F` | Vermilion seal red, **the only accent**: hanko, signage strip, the Ō in the wordmark, course numbers, primary buttons, focus rings |

**Board-marked concrete** is pure CSS: horizontal formwork lines every 60px (sumi at 14%) plus faint vertical grain (washi at 5%), laid over `--color-beton` or `--color-shadow`.

**Exempt from the palette:** the 3D food colours (`dish/`), which are content like a photo, and the vendored engine's default theme, which is overridden by `--sw-*` tokens.

## Type

| Role | Font | Size | Notes |
|---|---|---|---|
| Wordmark (h1) | Dela Gothic One | phones `clamp(6rem, 21vw, 22rem)`, desktop `clamp(6rem, 13.5vw, 14rem)` | "K**Ō**JI", with the Ō in shu |
| Section titles (h2) | Dela Gothic One | `clamp(2.5rem, 6vw, 6rem)` | line-height 0.95, each ends with a full stop |
| Kanji (麹 味噌 塩, noren) | Dela Gothic One | — | It includes Japanese glyphs |
| Body | Zen Kaku Gothic New 400/500/700 | 17px / 1.6 | |
| Signage, labels, menu | DM Mono 400/500 | 12–13px | uppercase, tracking 0.12em |

## Layout

- **Top bar** (sticky, 72px, sumi): the hanko plus "KŌJI 麹" on the left, and the **noren curtain** on the right. That's five hanging panels split by 4px slits, each a nav link: kanji, with the English label from 900px up, and a 4px shu hem. On hover a panel turns shu and drops 4px.
- **Hero** (sumi):
  - The mono kicker, the giant wordmark, a lead paragraph and a shu "Reserve a seat" button.
  - The dish (square, up to 560px).
  - A **vertical 麹** column at washi 14% on desktop, or a faint background glyph on phones.
  - Underneath, the full-width **shu signage strip**: `OPEN 18:00–23:00 · 11 COURSES · 12 SEATS · B1–14F · TOWER 1972 · GINZA`.
- **Slabs:** each section is a full-width slab with a 3px rule on top, alternating béton (kitchen, reserve), sumi (omakase, chef) and washi (building). Gutter `clamp(16px, 4vw, 64px)`. Corners are square. The only shadow is the reservation card's hard `10px 10px 0` sumi offset.

| id | Slab | Content |
|---|---|---|
| `kitchen` | béton | "Fermentation is the kitchen." Three pillars, 麹 Kōji, 味噌 Miso and 塩 Shio, each with giant kanji. Photos `counter` (16:9) and `fermentation` (4:5) |
| `omakase` | sumi | "Eleven courses. One counter." The **food flight**, then the menu card: hanko, "Autumn menu · ¥38,000", and the 11 courses in five groups in DM Mono |
| `building` | washi | `building-exterior` (3:4), "A tower built to be rebuilt.", the Metabolist story, a facts list, the `stoneware` detail |
| `chef` | sumi | "Ren Ishikawa." A pull quote with a 6px shu rule, bio, `chef` photo (4:5) |
| `reserve` | béton | "Twelve seats. Two seatings." The reservation card (below) |

## 3D: the hero dish (`dish/`)

- `three/webgpu` `WebGPURenderer`, with `forceWebGL` when there's no WebGPU adapter. Alpha canvas over sumi, ACES tone mapping at exposure 0.9, PCF soft shadows.
- **Procedural, no model files:**
  - **Rice:** an ellipsoid bed (1.05 × 0.42 × 0.52) with lumpy TSL noise, plus **680 instanced capsule grains** laid tangent to the surface (seeded RNG, so it's identical on every load).
  - **Fish:** a box slab (2.36 × 0.13 × 1.12, 64×3×28 segments) draped as `0.34 − 0.4u⁴ − 0.1u²` along its length, with a slight sag across.
  - **Fish material** (`MeshPhysicalNodeMaterial`):
    - flesh mixing `#8a2a1c` → `#b44a2e`, broken by noise;
    - fat marbling from `sin(x·7.5 + z·5 + noise)`, smoothstepped 0.8–0.95 to `#e9b896`;
    - an amber glaze `#8f4513` over the top;
    - caramelised ends `#3e1d0e` from fractal noise plus distance to the end;
    - clearcoat 1, clearcoat roughness 0.08 on top.
  - **Plate:** an extruded rounded-rectangle stoneware board, near-black ash glaze with pale iron speckles, roughness 0.86.
- **Light:** a low warm key from the left `(−3.6, 3.2, 2.6)` at 4.2, a cool rim from behind at 1.6, a dim hemisphere, and a `RoomEnvironment` PMREM at 0.45.
- **Behaviour:**
  - turns at 0.15 rad/s;
  - pointer-drag rotates it, with inertia (×0.92 per frame) and a ±0.28 rad tilt;
  - pauses off-screen or when the tab is hidden;
  - lazy-loads within 200px of the viewport;
  - the poster `hero-dish-poster` shows first and the canvas fades in over 400ms.
- **Fallbacks:** reduced motion, no WebGPU/WebGL2, or device loss keep the static poster.

## 3D: the food flight (`flight/`)

The `scroll-world` technique: pre-rendered camera clips, with scroll driving `currentTime`.

- **5 dives** (wide → close on one dish) and **4 connectors** (close on dish N → wide on dish N+1), so 9 clips. They're generated in Veo from the five `flight-*` stills as a **frame relay**: each connector's first and last frames are the neighbouring dives' *actual* frames, extracted by `scripts/seam-frames.sh` and scored by `scripts/seam-check.sh` (≥ 30 dB PSNR). The full method and prompts are in `docs/image-prompts/koji-clips.md`.
- **Scroll geometry:**
  - 1.3 viewport heights per dive and 0.9 per connector, plus 1.
  - The engine mounts inside a `position: sticky; transform: translateZ(0)` box under the top bar, so its `position: fixed` layers pin to the flight.
  - `config.scrollY()` / `config.originY()` measure from the flight's own top.
- **Copy layer:** each course group shows "先付 · Courses 01, 02", the course names and the details. Route dots on the right jump between groups.
- **Seams:** a connector that can't pass the seam check is set to `"slabWipe"` in `flight.config.ts`, or is missing from the clip manifest. That join becomes a cut, covered by a **concrete slab wipe**: a board-marked shadow panel sweeping across in 450ms with `cubic-bezier(0.77, 0, 0.175, 1)`.
- **Before clips exist, or under reduced motion:** a static sequence of the five scene stills, each with its course copy.
- Clips are encoded by `scripts/encode-clips.sh` (H.264, crf 20, GOP 8, faststart, no audio), which also writes `flight/clips.generated.ts`.

## Reservation

- **Fields:** date, seating (`18:00`, `18:30`, `20:45`, `21:15`), guests 1–4, name, email.
- **Errors:**
  - "Choose a date from today"
  - "Choose one of the four seatings"
  - "Parties of 1–4 only"
  - "Add your name"
  - "Enter a valid email"
- **Success:** "Your seats are held. A confirmation will follow by email." **Nothing is sent.**
- **Styling:** a washi card with a 3px sumi border, a hard offset shadow and square 52px inputs.

## Motion

| What | How |
|---|---|
| Buttons | Colour 160ms, press `scale(0.97)`. Hover only on fine pointers |
| Noren | Background and a 4px drop in 200–260ms with `cubic-bezier(0.23, 1, 0.32, 1)` |
| Hero dish | See above. Static under reduced motion |
| Food flight | Scroll-scrubbed video. Static stills under reduced motion |
| Slab wipe | 450ms ease-in-out. Hidden under reduced motion |

Everything else is still. Brutalism doesn't wiggle.

## Signature details

- **The hanko seal** (麹, white on shu with an inner border) is the favicon, the brand mark, the menu stamp and the footer mark.
- **The noren curtain** is the navigation.
- **The shu Ō** in the wordmark.
- **Giant kanji** as structure, not decoration: 麹 in the hero, and 麹 味噌 塩 as the kitchen's three pillars.
- **Placeholders** are board-marked concrete panels labelled with their asset key.

## Do / Don't

- **Do** keep every UI colour in the five tokens. Use shu at most a few times per screen.
- **Do** keep everything flat except the food.
- **Don't** round corners, add soft shadows or gradients, or animate decoration.
- **Don't** use clean modern food styling in the photos. They're 1970s Fujicolor film: grain, faded, raking light.

## Files

```
src/app/(koji)/
  layout.tsx                 root layout: fonts, metadata, imports koji.css
  koji/
    page.tsx                 top bar + noren, hero (HeroDish), kitchen, omakase (FoodFlight), building, chef, reservation, footer
    koji.css                 tokens (@theme), board-mark texture and all styles
    menu.ts                  the 11 courses in 5 groups (shared by the menu card and the flight)
    brand/                   Hanko, Noren, Wordmark
    sections/                Hero, Kitchen, Omakase, Building, Chef, Reservation, Footer
    forms/                   reservation.ts (validateReservation) + ReservationForm
    dish/                    capabilities, materials (TSL), nigiri (geometry), createDishScene, HeroDish
    flight/                  flight.config, FoodFlight, SlabWipe, clips.generated.ts, scrub-engine.js (vendored)
    assets.tsx               assetSrc() + <Picture> (placeholder until images exist)
    assets.generated.ts      image dimensions, written by the image pipeline
    icon.svg, opengraph-image.tsx
public/templates/koji/       <key>-800|1600.webp|avif, clips/*.mp4
```

## Imagery

All images are generated. Generate them in Gemini with the prompts below and save them as `<key>.png`. The template expects `public/templates/koji/<key>-800.webp`, `-1600.webp` and `.avif` versions. The video relay and its prompts are in `docs/image-prompts/koji-clips.md`.

### Style preamble

This is already included at the start of every prompt below. It's shown here for reference.

> Photograph in the style of 1970s Japanese colour film (Fujicolor), visible film grain, slightly faded and muted colours, warm-neutral tones. Japanese brutalist architecture: raw board-marked concrete with visible formwork wood-grain lines, heavy monolithic forms, deep shadows, low raking light. Heavy hand-made stoneware. Quiet, monumental, documentary. Not modern food styling, no shallow-depth-of-field bokeh glamour, no text, no signage, no logos.

Flight stills also get this locked-camera clause:

> Locked camera, identical in every image of this series: 16:9 frame, camera at 30 degrees above the dish, 35mm lens, the dish centred on a waist-high square plinth of raw board-marked concrete, a flat matte concrete-grey wall behind with nothing on it, a single soft light from the upper left, no props, no people.

### Images

| # | Filename | Aspect | Where it's used |
|---|---|---|---|
| 1 | `hero-dish-poster.png` | 1:1 | Hero: static poster shown before and instead of the real-time 3D dish |
| 2 | `flight-sakizuke.png` | 16:9 | Food flight scene 1: sakizuke (first bites). Video start frame |
| 3 | `flight-mukozuke.png` | 16:9 | Food flight scene 2: mukōzuke (sashimi). Video start frame |
| 4 | `flight-yakimono.png` | 16:9 | Food flight scene 3: yakimono (grilled). Video start frame |
| 5 | `flight-nimono.png` | 16:9 | Food flight scene 4: nimono (simmered). Video start frame |
| 6 | `flight-shokuji.png` | 16:9 | Food flight scene 5: shokuji (rice course). Video start frame |
| 7 | `building-exterior.png` | 3:4 | The building section: the 1972 tower at dusk |
| 8 | `counter.png` | 16:9 | Kitchen section: the counter |
| 9 | `chef.png` | 4:5 | Chef section |
| 10 | `fermentation.png` | 4:5 | Kitchen section: the fermentation room |
| 11 | `stoneware.png` | 1:1 | Detail image between sections |

#### 1. `hero-dish-poster.png` (1:1)

_Hero: static poster shown before and instead of the real-time 3D dish_

```text
Photograph in the style of 1970s Japanese colour film (Fujicolor), visible film grain, slightly faded and muted colours, warm-neutral tones. Japanese brutalist architecture: raw board-marked concrete with visible formwork wood-grain lines, heavy monolithic forms, deep shadows, low raking light. Heavy hand-made stoneware. Quiet, monumental, documentary. Not modern food styling, no shallow-depth-of-field bokeh glamour, no text, no signage, no logos. A single piece of miso-glazed nigiri, glossy amber-brown glaze over a slab of marbled fatty fish draped on hand-pressed rice, resting on a small dark speckled stoneware plate, three-quarter view, a dark sumi-black background, low raking light from the left catching the glaze. Aspect ratio 1:1.
```

#### 2. `flight-sakizuke.png` (16:9)

_Food flight scene 1: sakizuke (first bites). Video start frame_

```text
Photograph in the style of 1970s Japanese colour film (Fujicolor), visible film grain, slightly faded and muted colours, warm-neutral tones. Japanese brutalist architecture: raw board-marked concrete with visible formwork wood-grain lines, heavy monolithic forms, deep shadows, low raking light. Heavy hand-made stoneware. Quiet, monumental, documentary. Not modern food styling, no shallow-depth-of-field bokeh glamour, no text, no signage, no logos. Locked camera, identical in every image of this series: 16:9 frame, camera at 30 degrees above the dish, 35mm lens, the dish centred on a waist-high square plinth of raw board-marked concrete, a flat matte concrete-grey wall behind with nothing on it, a single soft light from the upper left, no props, no people. A small dark stoneware dish holding three seasonal first bites: a cube of sesame tofu, a curl of pickled lotus root and a single shiso-wrapped morsel, arranged precisely. Aspect ratio 16:9.
```

#### 3. `flight-mukozuke.png` (16:9)

_Food flight scene 2: mukōzuke (sashimi). Video start frame_

```text
Photograph in the style of 1970s Japanese colour film (Fujicolor), visible film grain, slightly faded and muted colours, warm-neutral tones. Japanese brutalist architecture: raw board-marked concrete with visible formwork wood-grain lines, heavy monolithic forms, deep shadows, low raking light. Heavy hand-made stoneware. Quiet, monumental, documentary. Not modern food styling, no shallow-depth-of-field bokeh glamour, no text, no signage, no logos. Locked camera, identical in every image of this series: 16:9 frame, camera at 30 degrees above the dish, 35mm lens, the dish centred on a waist-high square plinth of raw board-marked concrete, a flat matte concrete-grey wall behind with nothing on it, a single soft light from the upper left, no props, no people. A rough-glazed grey stoneware plate holding a few slices of glistening sashimi fanned in a line, a mound of grated daikon and a single leaf beside them. Aspect ratio 16:9.
```

#### 4. `flight-yakimono.png` (16:9)

_Food flight scene 3: yakimono (grilled). Video start frame_

```text
Photograph in the style of 1970s Japanese colour film (Fujicolor), visible film grain, slightly faded and muted colours, warm-neutral tones. Japanese brutalist architecture: raw board-marked concrete with visible formwork wood-grain lines, heavy monolithic forms, deep shadows, low raking light. Heavy hand-made stoneware. Quiet, monumental, documentary. Not modern food styling, no shallow-depth-of-field bokeh glamour, no text, no signage, no logos. Locked camera, identical in every image of this series: 16:9 frame, camera at 30 degrees above the dish, 35mm lens, the dish centred on a waist-high square plinth of raw board-marked concrete, a flat matte concrete-grey wall behind with nothing on it, a single soft light from the upper left, no props, no people. A long rectangular black stoneware plate holding a fillet of miso-marinated black cod, its surface lacquered and charred at the edges, a small pickled ginger shoot laid beside it. Aspect ratio 16:9.
```

#### 5. `flight-nimono.png` (16:9)

_Food flight scene 4: nimono (simmered). Video start frame_

```text
Photograph in the style of 1970s Japanese colour film (Fujicolor), visible film grain, slightly faded and muted colours, warm-neutral tones. Japanese brutalist architecture: raw board-marked concrete with visible formwork wood-grain lines, heavy monolithic forms, deep shadows, low raking light. Heavy hand-made stoneware. Quiet, monumental, documentary. Not modern food styling, no shallow-depth-of-field bokeh glamour, no text, no signage, no logos. Locked camera, identical in every image of this series: 16:9 frame, camera at 30 degrees above the dish, 35mm lens, the dish centred on a waist-high square plinth of raw board-marked concrete, a flat matte concrete-grey wall behind with nothing on it, a single soft light from the upper left, no props, no people. A deep lidded stoneware bowl with the lid resting beside it, inside a thick round of daikon simmered in clear golden dashi, a wisp of steam rising. Aspect ratio 16:9.
```

#### 6. `flight-shokuji.png` (16:9)

_Food flight scene 5: shokuji (rice course). Video start frame_

```text
Photograph in the style of 1970s Japanese colour film (Fujicolor), visible film grain, slightly faded and muted colours, warm-neutral tones. Japanese brutalist architecture: raw board-marked concrete with visible formwork wood-grain lines, heavy monolithic forms, deep shadows, low raking light. Heavy hand-made stoneware. Quiet, monumental, documentary. Not modern food styling, no shallow-depth-of-field bokeh glamour, no text, no signage, no logos. Locked camera, identical in every image of this series: 16:9 frame, camera at 30 degrees above the dish, 35mm lens, the dish centred on a waist-high square plinth of raw board-marked concrete, a flat matte concrete-grey wall behind with nothing on it, a single soft light from the upper left, no props, no people. A small black clay donabe pot of freshly cooked koji rice with the lid off, a bowl of miso soup and a dish of three pickles arranged beside it. Aspect ratio 16:9.
```

#### 7. `building-exterior.png` (3:4)

_The building section: the 1972 tower at dusk_

```text
Photograph in the style of 1970s Japanese colour film (Fujicolor), visible film grain, slightly faded and muted colours, warm-neutral tones. Japanese brutalist architecture: raw board-marked concrete with visible formwork wood-grain lines, heavy monolithic forms, deep shadows, low raking light. Heavy hand-made stoneware. Quiet, monumental, documentary. Not modern food styling, no shallow-depth-of-field bokeh glamour, no text, no signage, no logos. A Metabolist concrete tower in Ginza at dusk, 1972: a tall central concrete core with dozens of stacked box-like capsules plugged into it, each with a single round porthole window, a few windows glowing warm, seen from street level looking up. Aspect ratio 3:4.
```

#### 8. `counter.png` (16:9)

_Kitchen section: the counter_

```text
Photograph in the style of 1970s Japanese colour film (Fujicolor), visible film grain, slightly faded and muted colours, warm-neutral tones. Japanese brutalist architecture: raw board-marked concrete with visible formwork wood-grain lines, heavy monolithic forms, deep shadows, low raking light. Heavy hand-made stoneware. Quiet, monumental, documentary. Not modern food styling, no shallow-depth-of-field bokeh glamour, no text, no signage, no logos. Interior of a twelve-seat restaurant counter made from one continuous slab of board-marked concrete, low stools, steam rising from a pot behind the counter caught in a shaft of raking light, the room otherwise dark. Aspect ratio 16:9.
```

#### 9. `chef.png` (4:5)

_Chef section_

```text
Photograph in the style of 1970s Japanese colour film (Fujicolor), visible film grain, slightly faded and muted colours, warm-neutral tones. Japanese brutalist architecture: raw board-marked concrete with visible formwork wood-grain lines, heavy monolithic forms, deep shadows, low raking light. Heavy hand-made stoneware. Quiet, monumental, documentary. Not modern food styling, no shallow-depth-of-field bokeh glamour, no text, no signage, no logos. A chef in a plain dark work jacket seen through a rectangular opening in a thick concrete wall, head bowed, focused on slicing fish at a wooden board, the concrete frame dominating the foreground, face partly in shadow. Aspect ratio 4:5.
```

#### 10. `fermentation.png` (4:5)

_Kitchen section: the fermentation room_

```text
Photograph in the style of 1970s Japanese colour film (Fujicolor), visible film grain, slightly faded and muted colours, warm-neutral tones. Japanese brutalist architecture: raw board-marked concrete with visible formwork wood-grain lines, heavy monolithic forms, deep shadows, low raking light. Heavy hand-made stoneware. Quiet, monumental, documentary. Not modern food styling, no shallow-depth-of-field bokeh glamour, no text, no signage, no logos. Rows of large ceramic and cedar fermentation crocks of miso and koji lined up along a raw concrete cellar wall, cotton cloths tied over their tops, a single bare bulb casting hard shadows. Aspect ratio 4:5.
```

#### 11. `stoneware.png` (1:1)

_Detail image between sections_

```text
Photograph in the style of 1970s Japanese colour film (Fujicolor), visible film grain, slightly faded and muted colours, warm-neutral tones. Japanese brutalist architecture: raw board-marked concrete with visible formwork wood-grain lines, heavy monolithic forms, deep shadows, low raking light. Heavy hand-made stoneware. Quiet, monumental, documentary. Not modern food styling, no shallow-depth-of-field bokeh glamour, no text, no signage, no logos. Close-up still life of a stack of heavy hand-thrown stoneware bowls on a concrete ledge, ash glazes in grey and near-black, one bowl tipped to show its unglazed foot ring, raking light. Aspect ratio 1:1.
```
