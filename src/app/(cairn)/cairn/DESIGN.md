# Cairn: design system

A showcase landing page for a fictional mountaineering apparel brand. **The page is an ascent of K2.** A pinned silhouette of the mountain and an altitude meter climb with you, from base camp to the summit, and each camp is a product chapter.

## Requirements

Copy two folders into a fresh Next.js app (`npx create-next-app@latest --ts --tailwind --app --src-dir`), delete the scaffold's `src/app/layout.tsx`, `page.tsx` and `globals.css`, then install:

```bash
npm i gsap lenis motion @phosphor-icons/react
```

- **Next.js ≥ 16.4** (App Router, route groups with their own root layout, `next/font/google`, `next/og`)
- **React ≥ 19**, **Tailwind CSS v4** (from `create-next-app`)
- Folders: `src/app/(cairn)/` (code) and `public/templates/cairn/` (images)
- `*.test.ts` files are optional and need `vitest`

## Concept

Cairn makes technical mountaineering apparel: shells, down suits, base and mid layers, gloves. It's named after the stone stacks climbers build to mark the route. The tagline is **"Alpine equipment · Tested on K2"**.

- **Showcase through a story:** scrolling follows the real Abruzzi Spur route. Products appear at the altitude where they earn their place.
- **Serious, precise, quiet.** It reads like an expedition log and a gear label, not a sale.

## Palette: black, dark blue and white only

| Token | Hex | Role |
|---|---|---|
| `--color-black` | `#0B0C0E` | Page background, glacier, card backgrounds |
| `--color-navy` | `#0F1E33` | Feature panels, signup panel, hover states, sky gradient |
| `--color-white` | `#F5F6F7` | Text, buttons, active states, snow, gear labels |
| `--color-navy-1` | `#16294A` | Hairlines, shadowed mountain face, placeholder fill |
| `--color-navy-2` | `#2A3D5E` | Lit mountain face, borders, moraine stripes |
| `--color-navy-3` | `#56657F` | Inactive meter labels, input borders |
| `--color-navy-4` | `#A5AEBD` | Muted text, eyebrows, dashed route |
| `--color-navy-5` | `#DDE1E7` | Lead paragraphs, snow on the shoulder |

**There is no accent hue.** Emphasis comes only from inversion (white on navy, or black on white): buttons, the active layer, the active camp, swatch rings. **All photography is tritone-mapped** to black → `#0F1E33` → white at processing time, so no skin, rock or sky colour survives.

## Type

| Role | Font | Size | Notes |
|---|---|---|---|
| Display (h1) | Barlow Condensed 800 | `clamp(3.75rem, 10vw, 10.5rem)` | uppercase, line-height 0.86 |
| Chapter title (h2) | Barlow Condensed 800 | `clamp(2.75rem, 5.4vw, 5.5rem)` | uppercase, a full stop at the end |
| h3 / product names | Barlow Condensed 600 | `clamp(1.5rem, 2vw, 2rem)` | uppercase |
| Altitude readout | Barlow Condensed 800 | `clamp(2.5rem, 6vw, 5.75rem)` | tabular numbers, "8,611 M" |
| Body | Barlow 400 | 17px / 1.55 | leads in `--color-navy-5`, max 46ch |
| Labels, specs | IBM Plex Mono 400/500 | 12px | uppercase, tracking 0.1em |

## Layout

- Fixed 68px solid black top bar: the stones mark plus "CAIRN", section links (≥ 1100px), and an outline "Expedition list" button.
- **Hero:** full-height `hero-k2` image under a black gradient, with the display headline "Built above the treeline." anchored bottom-left.
- **Ascent:**
  - **Desktop:** two columns. The left column (about 51%) is a `position: sticky` stage, 100svh tall below the bar. The right column holds seven chapters, each at least 100svh.
  - **Phones:** the stage becomes a sticky 36svh strip under the bar, and chapters scroll below it.
- Gutter `clamp(20px, 4vw, 64px)`. Hairlines are 1px `--color-navy-1`. Corners are square throughout.

## The stage

- **K2 silhouette:** a hand-drawn SVG in a 1000×1000 viewBox, `preserveAspectRatio="xMidYMax meet"`. The ridges and glacier extend past the viewBox with `overflow: visible`, so the frame edge never shows. It shows the classic south-face pyramid from Concordia: a shadowed SW face (`navy-1`), a lit E face (`navy-2`), a white summit cap and a snow shoulder.
- **Route:** the Abruzzi Spur is drawn as a dashed `navy-4` line. The climbed portion is solid white, using `stroke-dashoffset = length × (1 − progress)`.
- **Climber:** a white dot at `getPointAtLength(progress × length)`, with a pulsing halo (2.4s; off under reduced motion). Camp markers fill white once reached.
- **Altitude meter (desktop):** a vertical track whose white fill scales to `(altitude − 5000) / 3611`. Camp ticks are positioned by real altitude, and the active label turns white.
- **Readout:** large altitude numbers plus the camp name in mono, and the coordinates `35.8825° N · 76.5133° E · Karakoram` top-left.

## How progress works

```
camp i is reached when chapter i's top reaches the "arrival line"
arrival line = scrollY + top bar height (+ the sticky strip height on phones)
progress     = (i + fraction between chapter i and i+1) / 6        → 0..1
altitude     = linear between camps, camps at equal progress spacing
```

This lets chapters have any height while a camp link (`#c3`) still lands exactly on "7,350 M". It's recomputed on mount, which also covers a reload mid-page, on scroll and on resize, and after fonts load via `ScrollTrigger.refresh()`. `scroll-padding-top` matches the arrival line, so anchor links land under the bar or strip.

| Altitude | id | Chapter |
|---|---|---|
| 5,000 m | `base` | "The FW26 collection." Intro, `basecamp` image, a 6-product grid (1px gap lines) |
| 6,050 m | `c1` | "Start with what touches skin." Merino 200 Half-Zip feature with a spec list |
| 6,700 m | `c2` | "Three layers. One job each." A layer diagram of three bars that pull apart as you scroll, plus the Grid Fleece Hoody |
| 7,350 m | `c3` | "The outer wall." Summit Shell 3L: colourway swap, gear-label spec sheet, fabric zoom |
| 7,900 m | `c4` | "Nights on the Shoulder." 8000 Down Suit: spec sheet, fabric zoom |
| 8,200 m | `bottleneck` | "Through the Bottleneck." Summit Mitt and Alpine Gaiter spec sheets side by side |
| 8,611 m | `summit` | "8,611 metres. Nothing above but sky." Horizontal lookbook with hotspots, then the expedition-list signup |

## Motion

Curves: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` for UI, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`.

| What | How |
|---|---|
| Smooth scroll | Lenis (`lerp 0.12`) driven by `gsap.ticker`, with `lenis.on('scroll', ScrollTrigger.update)`. Off under reduced motion |
| Stage | Scroll position → progress (see above). Only SVG attributes and `transform: scaleY` change |
| Layer diagram | Bars translate apart, `translateY(i × 40px × spread)`. The active layer inverts to white. Fully spread under reduced motion |
| Colourway swap | Native radio swatches (arrow keys work). The image crossfades in 200ms with a 2px blur during the overlap (`motion/react` `AnimatePresence`). Instant under reduced motion |
| Fabric zoom | With a mouse, a 180px loupe at 2.5×. On touch, tap to toggle a 2.5× zoom centred on the tap |
| Lookbook | `overflow-x: auto` + `scroll-snap`, mouse drag-to-scroll, prev/next buttons. Hotspots pulse gently; their cards pop in over 180ms |
| Buttons | Colour 200ms, press `scale(0.97)`. Hover only on `(hover: hover) and (pointer: fine)` |

## Signature details

- The **stacked-stones mark**: three ellipses, white on navy (black on white on light backgrounds).
- **Gear-label spec sheets**: a white card with a dashed inner "stitch" outline, the code `FW26-SH-01`, mono rows, and "Tested on K2 · Abruzzi Spur · 2026".
- **Altitude in every eyebrow**: "7,350 m · Camp 3".
- **Placeholders** are hatched navy boxes labelled with their asset key, so the layout holds before images exist.

## Do / Don't

- **Do** keep every colour inside the eight tokens. Run every photo through the tritone.
- **Do** make emphasis by inverting, never by adding a colour.
- **Don't** add an accent colour, gradients beyond sky and black fades, rounded corners, or glassy blur.
- **Don't** let the meter disagree with the chapter on screen. Camps are tied to chapter positions, not to raw scroll percentage.

## Files

```
src/app/(cairn)/
  layout.tsx                  root layout: fonts, metadata, imports cairn.css
  cairn/
    page.tsx                  top bar, hero, <AscentStage> with the seven chapters, footer
    cairn.css                 tokens (@theme) and all styles
    SmoothScroll.tsx          Lenis + ScrollTrigger
    products.ts               the six products, specs and colourway images
    ascent/                   camps.ts (CAMPS, altitudeAt, activeCamp, progressFromOffsets), AscentStage, K2Silhouette, AltitudeMeter
    chapters/                 Chapter wrapper + one component per camp, ProductCard, SpecList, LayerDiagram
    showcase/                 ColourwaySwap, FabricZoom, SpecSheet, Lookbook
    forms/                    validate-email.ts + Signup
    brand/Logo.tsx            CairnMark + wordmark
    assets.tsx                assetSrc() + <Picture> (placeholder until images exist)
    assets.generated.ts       image dimensions, written by the image pipeline
    icon.svg, opengraph-image.tsx
public/templates/cairn/       <key>-800|1600.webp|avif (already tritone-mapped)
```

## Imagery

All images are generated. Generate them in Gemini with the prompts below and save them as `<key>.png`, then map them to the tritone: per pixel, Rec.709 luma goes to black `#0B0C0E` → `#0F1E33` → white `#F5F6F7`, linear between stops. The template expects `public/templates/cairn/<key>-800.webp`, `-1600.webp` and `.avif` versions. Any image that's missing renders as a labelled placeholder.

### Style preamble

This is already included at the start of every prompt below. It's shown here for reference.

> Cinematic expedition photograph, Karakoram range, Pakistan. Cool blue-hour or night light, high tonal contrast, deep shadows and bright snow highlights, crisp detail, photographed on a full-frame camera. Clothing is technical mountaineering apparel in solid black, dark navy or white only, with no logos, no bright colours and no text anywhere. Serious, precise, quiet. No people facing the camera.

### Images

| # | Filename | Aspect | Where it's used |
|---|---|---|---|
| 1 | `hero-k2.png` | 16:9 | Hero / pinned ascent stage reference: K2 at blue hour |
| 2 | `basecamp.png` | 16:9 | Base Camp chapter: brand intro |
| 3 | `product-shell-black.png` | 4:5 | Camp 3, hero product: Summit Shell 3L, black colourway |
| 4 | `product-shell-navy.png` | 4:5 | Camp 3, hero product: Summit Shell 3L, navy colourway |
| 5 | `product-shell-white.png` | 4:5 | Camp 3, hero product: Summit Shell 3L, white colourway |
| 6 | `product-down.png` | 4:5 | Camp 4 chapter: 8000-metre down suit |
| 7 | `product-base.png` | 4:5 | Camp 1 chapter: merino base layer |
| 8 | `product-mid.png` | 4:5 | Camp 2 chapter: grid-fleece mid layer |
| 9 | `product-hands.png` | 4:5 | Bottleneck chapter: summit mitts and gaiters |
| 10 | `fabric-shell.png` | 1:1 | Camp 3: fabric zoom for the shell |
| 11 | `fabric-down.png` | 1:1 | Camp 4: fabric zoom for the down suit |
| 12 | `lookbook-1.png` | 3:2 | Summit lookbook frame 1 |
| 13 | `lookbook-2.png` | 3:2 | Summit lookbook frame 2 |
| 14 | `lookbook-3.png` | 3:2 | Summit lookbook frame 3 |
| 15 | `lookbook-4.png` | 3:2 | Summit lookbook frame 4 |

#### 1. `hero-k2.png` (16:9)

_Hero / pinned ascent stage reference: K2 at blue hour_

```text
Cinematic expedition photograph, Karakoram range, Pakistan. Cool blue-hour or night light, high tonal contrast, deep shadows and bright snow highlights, crisp detail, photographed on a full-frame camera. Clothing is technical mountaineering apparel in solid black, dark navy or white only, with no logos, no bright colours and no text anywhere. Serious, precise, quiet. No people facing the camera. K2, the second-highest mountain in the world, seen from Concordia: its classic steep symmetrical pyramid rising above the Baltoro Glacier at blue hour, a faint plume of snow blowing off the summit, the glacier's dark moraine stripes leading toward the peak. Aspect ratio 16:9.
```

#### 2. `basecamp.png` (16:9)

_Base Camp chapter: brand intro_

```text
Cinematic expedition photograph, Karakoram range, Pakistan. Cool blue-hour or night light, high tonal contrast, deep shadows and bright snow highlights, crisp detail, photographed on a full-frame camera. Clothing is technical mountaineering apparel in solid black, dark navy or white only, with no logos, no bright colours and no text anywhere. Serious, precise, quiet. No people facing the camera. K2 Base Camp at night on the rocky Godwin-Austen Glacier: a cluster of small domed tents glowing faintly from inside, headlamp dots moving between them, the dark mass of K2 behind under a sky full of stars. Aspect ratio 16:9.
```

#### 3. `product-shell-black.png` (4:5)

_Camp 3, hero product: Summit Shell 3L, black colourway_

```text
Cinematic expedition photograph, Karakoram range, Pakistan. Cool blue-hour or night light, high tonal contrast, deep shadows and bright snow highlights, crisp detail, photographed on a full-frame camera. Clothing is technical mountaineering apparel in solid black, dark navy or white only, with no logos, no bright colours and no text anywhere. Serious, precise, quiet. No people facing the camera. Studio product photograph of a technical three-layer hardshell mountaineering jacket in solid black, hood up and shaped, front zip closed, displayed on an invisible mannequin against a seamless dark charcoal backdrop, hard rim light tracing the silhouette, fabric slightly textured. Aspect ratio 4:5.
```

#### 4. `product-shell-navy.png` (4:5)

_Camp 3, hero product: Summit Shell 3L, navy colourway_

```text
Cinematic expedition photograph, Karakoram range, Pakistan. Cool blue-hour or night light, high tonal contrast, deep shadows and bright snow highlights, crisp detail, photographed on a full-frame camera. Clothing is technical mountaineering apparel in solid black, dark navy or white only, with no logos, no bright colours and no text anywhere. Serious, precise, quiet. No people facing the camera. Studio product photograph of the same technical three-layer hardshell mountaineering jacket in solid dark navy, hood up and shaped, front zip closed, displayed on an invisible mannequin against a seamless dark charcoal backdrop, hard rim light tracing the silhouette, identical pose and framing. Aspect ratio 4:5.
```

#### 5. `product-shell-white.png` (4:5)

_Camp 3, hero product: Summit Shell 3L, white colourway_

```text
Cinematic expedition photograph, Karakoram range, Pakistan. Cool blue-hour or night light, high tonal contrast, deep shadows and bright snow highlights, crisp detail, photographed on a full-frame camera. Clothing is technical mountaineering apparel in solid black, dark navy or white only, with no logos, no bright colours and no text anywhere. Serious, precise, quiet. No people facing the camera. Studio product photograph of the same technical three-layer hardshell mountaineering jacket in solid white, hood up and shaped, front zip closed, displayed on an invisible mannequin against a seamless dark charcoal backdrop, hard rim light tracing the silhouette, identical pose and framing. Aspect ratio 4:5.
```

#### 6. `product-down.png` (4:5)

_Camp 4 chapter: 8000-metre down suit_

```text
Cinematic expedition photograph, Karakoram range, Pakistan. Cool blue-hour or night light, high tonal contrast, deep shadows and bright snow highlights, crisp detail, photographed on a full-frame camera. Clothing is technical mountaineering apparel in solid black, dark navy or white only, with no logos, no bright colours and no text anywhere. Serious, precise, quiet. No people facing the camera. Studio product photograph of a one-piece 8000-metre expedition down suit in solid black with deep horizontal baffles, hood with a fur-free tunnel, displayed upright on an invisible mannequin against a seamless dark charcoal backdrop, dramatic side light revealing the loft of each baffle. Aspect ratio 4:5.
```

#### 7. `product-base.png` (4:5)

_Camp 1 chapter: merino base layer_

```text
Cinematic expedition photograph, Karakoram range, Pakistan. Cool blue-hour or night light, high tonal contrast, deep shadows and bright snow highlights, crisp detail, photographed on a full-frame camera. Clothing is technical mountaineering apparel in solid black, dark navy or white only, with no logos, no bright colours and no text anywhere. Serious, precise, quiet. No people facing the camera. Studio product photograph of a fitted long-sleeve merino wool base layer top with a half-zip, in solid dark navy, laid flat and neatly styled on a seamless dark charcoal surface, top-down, soft directional light showing the fine knit. Aspect ratio 4:5.
```

#### 8. `product-mid.png` (4:5)

_Camp 2 chapter: grid-fleece mid layer_

```text
Cinematic expedition photograph, Karakoram range, Pakistan. Cool blue-hour or night light, high tonal contrast, deep shadows and bright snow highlights, crisp detail, photographed on a full-frame camera. Clothing is technical mountaineering apparel in solid black, dark navy or white only, with no logos, no bright colours and no text anywhere. Serious, precise, quiet. No people facing the camera. Studio product photograph of a technical grid-fleece hooded mid-layer jacket in solid white, displayed on an invisible mannequin against a seamless dark charcoal backdrop, side light revealing the square grid texture of the fleece. Aspect ratio 4:5.
```

#### 9. `product-hands.png` (4:5)

_Bottleneck chapter: summit mitts and gaiters_

```text
Cinematic expedition photograph, Karakoram range, Pakistan. Cool blue-hour or night light, high tonal contrast, deep shadows and bright snow highlights, crisp detail, photographed on a full-frame camera. Clothing is technical mountaineering apparel in solid black, dark navy or white only, with no logos, no bright colours and no text anywhere. Serious, precise, quiet. No people facing the camera. Studio product photograph of a pair of insulated expedition summit mitts in solid black next to a pair of black mountaineering gaiters, arranged on a seamless dark charcoal surface, top-down, hard light emphasising the textures. Aspect ratio 4:5.
```

#### 10. `fabric-shell.png` (1:1)

_Camp 3: fabric zoom for the shell_

```text
Cinematic expedition photograph, Karakoram range, Pakistan. Cool blue-hour or night light, high tonal contrast, deep shadows and bright snow highlights, crisp detail, photographed on a full-frame camera. Clothing is technical mountaineering apparel in solid black, dark navy or white only, with no logos, no bright colours and no text anywhere. Serious, precise, quiet. No people facing the camera. Extreme macro photograph of black three-layer waterproof hardshell fabric with tiny water droplets beading on the surface, a taped seam crossing the frame diagonally, raking light. Aspect ratio 1:1.
```

#### 11. `fabric-down.png` (1:1)

_Camp 4: fabric zoom for the down suit_

```text
Cinematic expedition photograph, Karakoram range, Pakistan. Cool blue-hour or night light, high tonal contrast, deep shadows and bright snow highlights, crisp detail, photographed on a full-frame camera. Clothing is technical mountaineering apparel in solid black, dark navy or white only, with no logos, no bright colours and no text anywhere. Serious, precise, quiet. No people facing the camera. Extreme macro photograph of black ripstop nylon over plump goose-down baffles, the stitch line between two baffles running across the frame, frost crystals on the fabric, raking light. Aspect ratio 1:1.
```

#### 12. `lookbook-1.png` (3:2)

_Summit lookbook frame 1_

```text
Cinematic expedition photograph, Karakoram range, Pakistan. Cool blue-hour or night light, high tonal contrast, deep shadows and bright snow highlights, crisp detail, photographed on a full-frame camera. Clothing is technical mountaineering apparel in solid black, dark navy or white only, with no logos, no bright colours and no text anywhere. Serious, precise, quiet. No people facing the camera. Two climbers in black down suits moving up a steep fixed rope on a snow ridge at night, lit only by their headlamps, the beam cutting through blowing snow, K2's shoulder dropping away below. Aspect ratio 3:2.
```

#### 13. `lookbook-2.png` (3:2)

_Summit lookbook frame 2_

```text
Cinematic expedition photograph, Karakoram range, Pakistan. Cool blue-hour or night light, high tonal contrast, deep shadows and bright snow highlights, crisp detail, photographed on a full-frame camera. Clothing is technical mountaineering apparel in solid black, dark navy or white only, with no logos, no bright colours and no text anywhere. Serious, precise, quiet. No people facing the camera. A lone climber in a white hardshell resting on a narrow snow ledge at dawn, seen from behind, looking across an endless sea of Karakoram peaks below a pale sky. Aspect ratio 3:2.
```

#### 14. `lookbook-3.png` (3:2)

_Summit lookbook frame 3_

```text
Cinematic expedition photograph, Karakoram range, Pakistan. Cool blue-hour or night light, high tonal contrast, deep shadows and bright snow highlights, crisp detail, photographed on a full-frame camera. Clothing is technical mountaineering apparel in solid black, dark navy or white only, with no logos, no bright colours and no text anywhere. Serious, precise, quiet. No people facing the camera. Close detail of a climber's black summit mitt gripping a frosted ascender on a fixed rope, ice crystals on the fabric, a steep snow slope falling away out of focus. Aspect ratio 3:2.
```

#### 15. `lookbook-4.png` (3:2)

_Summit lookbook frame 4_

```text
Cinematic expedition photograph, Karakoram range, Pakistan. Cool blue-hour or night light, high tonal contrast, deep shadows and bright snow highlights, crisp detail, photographed on a full-frame camera. Clothing is technical mountaineering apparel in solid black, dark navy or white only, with no logos, no bright colours and no text anywhere. Serious, precise, quiet. No people facing the camera. A climber in a dark navy hardshell crossing a crevassed section of the Godwin-Austen Glacier at blue hour, small against towering seracs, K2 rising in the background. Aspect ratio 3:2.
```
