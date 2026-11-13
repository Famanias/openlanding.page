# MIZUNOWA — Google AI Studio landing-page implementation brief

> **For Google AI Studio:** Build the complete, runnable project described in sections 1–9. Make the decisions in this brief; do not ask for approval. Section 10 is the local import handoff for the person integrating the exported project into `openlanding.page`. The present document is a design and implementation brief, not a claim that the page or its assets have already been built.

**Project:** MIZUNOWA, an imagined Japanese garden presented as an interactive field guide.

**Central idea:** A small disturbance travels across water, so a visitor can make a ripple on a living 3D koi pond and then follow that visual line into a calm walk through the garden.

**Build target:** A Vite + React + TypeScript project that previews in Google AI Studio and can be exported with its source and imported using this repository's `bun run import-template` command. Use Three.js for the hero. Do not generate a Next.js project in AI Studio.

**One primary action:** `Explore the garden`, a real in-page link to `#garden`. There is no checkout, real reservation, account, newsletter, or backend. This is a fictional place and a self-contained visual experience.

**Art direction in five words:** Serene, tactile, verdant, luminous, deliberate.

**Motion identity:** The pond is patient and alive. The verbs are **drift** and **radiate**. The one signature moment is a visitor-created ripple traveling across the pond while four individual koi continue their slow paths. The ripple's circular line reappears as a graphic handoff to the garden's first chapter.

---

## 1. Build and import contract — read before writing code

Build the source layout below. The importer reads `src/App.tsx`, `src/index.css`, all subdirectories under `src/`, metadata from the root `index.html` and optional `metadata.json`, and files inside `public/assets/`. It generates the Next.js route itself.

```text
index.html
metadata.json
package.json
src/
  main.tsx
  App.tsx
  index.css
  components/
    Header.tsx
    Hero.tsx
    PondStage.tsx
    GardenIntro.tsx
    KoiGallery.tsx
    GardenWalk.tsx
    Seasons.tsx
    PlanYourWalk.tsx
    Questions.tsx
    Footer.tsx
    Reveal.tsx
  pond/
    model.ts
    model.test.ts
    scene.ts
    fish.ts
    water.ts
    garden.ts
    materials.ts
  data/
    garden.ts
  hooks/
    useMotionPreference.ts
    useInView.ts
public/
  assets/
    pond-poster.svg
    hero-pond.webp
    garden-map.svg
```

This is a responsibility map, not a demand to split a tiny helper into its own file. Keep the 3D scene, pure motion math, data, and page sections separate so the result is maintainable. You may add other files **inside** these copied directories. Do not put required runtime source only in the project root, `.aistudio/`, `dist/`, or a Vite plugin.

### Non-negotiable source rules

1. The **first line** of `src/App.tsx` and every `.tsx` component file must be exactly `'use client';`. This is harmless in Vite and compatible with the imported Next.js route. Put comments and imports after it.
2. Declare the root component as **`export default function App() { ... }`**. The current importer renames the `function App` declaration while copying it. Do not declare `const App = ...; export default App;` or use a wrapper export that leaves a stale `App` identifier after the rename.
3. Keep app imports relative, such as `./components/Hero` and `../pond/model`. Do not use `@/`, `~/`, Next-only modules, absolute source imports, or import files outside `src/`. Do not rely on TypeScript path aliases or a Vite plugin to resolve runtime imports.
4. Put all artwork and downloadable assets in `public/assets/` and reference them with literal root-relative strings such as `"/assets/pond-poster.svg"`. The importer copies that folder and rewrites these strings to `/templates/mizunowa/...`. Do not construct asset paths by concatenating `"/" + "assets"`, use a Vite-only `import.meta.glob`, or reference generated `.aistudio` temp paths.
5. Use **`three` version `0.186.1`** and `@types/three` **`0.186.0`** in the Vite project, matching the installed destination versions. React, React DOM, Vite, TypeScript and Vitest are normal project dependencies/dev dependencies. Use direct Three.js; do not introduce React Three Fiber, a physics engine, a server, remote models, or other runtime packages. The destination repository already has `three` and `@types/three`; the importer does not install packages from the source project.
6. Keep the working CSS in `src/index.css`. Write normal CSS; the Vite preview need not depend on Tailwind. The importer adds its own Tailwind v4 import when needed. Do not place essential styles or scripts solely in `index.html`, because the importer does not copy that document into the route. Local images may be ordinary `<img>` elements with their intrinsic size; do not import `next/image`.
7. Do not read `window`, `document`, `navigator`, browser storage, WebGPU, canvas, `ResizeObserver`, or media queries at module scope or during React render. Initialize browser work only inside an effect or an event handler. Next.js can server-render a client component's initial HTML, so the initial render must be deterministic and hydration-safe.
8. No `process.env`, `import.meta.env`, API keys, paid service, remote texture/model/CDN, analytics, live booking, personal-data collection, or runtime fetch is required. Build the environment procedurally. A Google Fonts stylesheet is permitted for the Vite preview; the importer converts the three known fonts below to `next/font/google`.
9. Images must actually be present in `public/assets/`; a string pointing to a missing file, an image in AI Studio's temporary media storage, a PNG renamed `.webp`, or a blank SVG is not an asset. The small, complete SVG poster is mandatory even if the GPU scene fails. See section 8 for the WebP fallback if AI Studio cannot export binary files.
10. Keep all important copy in the React-rendered page, not painted into the canvas. No-JS and reduced-motion behavior is specified in section 7. Do not hide page content while the 3D engine loads.

### Metadata and fonts that the importer can read

Use these exact root entries. `metadata.json`:

```json
{
  "name": "MIZUNOWA — An imagined garden in motion",
  "description": "Explore an imagined Japanese garden through a living koi pond, a sakura grove, and a quiet shrine courtyard."
}
```

In `index.html`, set the same title and meta description, set `<html lang="en">`, and use `<body class="mnw-body">` so the importer does not substitute its unrelated default body colors. Include a **single** Google Fonts stylesheet link containing all three `family` parameters:

```html
<link href="https://fonts.googleapis.com/css2?family=Newsreader:wght@400;600&amp;family=Manrope:wght@400;500;600&amp;family=IBM+Plex+Mono:wght@400;500&amp;display=swap" rel="stylesheet">
```

Add preconnects if useful. In `src/index.css`, quote the font names in `font-family` declarations, for example `font-family: 'Newsreader', Georgia, serif;`, so the current importer recognizes and maps them to its generated Next font variables. Give Japanese text an explicit local system fallback such as `"Yu Mincho", "Hiragino Mincho ProN", serif`; do not require a large CJK webfont to render the rest of the page. The page must remain legible if Google Fonts is unavailable in the Vite preview.

`src/main.tsx` mounts `App` into `#root` in the usual Vite way and imports `./index.css`. Do not add another CSS import in `App.tsx`; the importer owns the Next route's stylesheet. Provide a concise but substantive `<noscript>` fallback in `index.html` for the Vite-only preview: brand, hero headline, pond poster, the three garden stops, and the fiction disclosure. That fallback is not copied by the importer; the imported React page must also server-render its essential content and poster without JavaScript.

---

## 2. Brand, tone, and art direction

### Identity

- Name: **MIZUNOWA**. The companion text **水の輪** reads “mizu no wa,” a ring of water. Display it as a small Japanese companion to the English wordmark, not as an oversized decorative glyph behind body copy.
- Tagline: **“A quieter world, just beneath the surface.”**
- Voice: observant, warm, specific, and unhurried. Short English sentences; no mystical promises, invented Japanese proverbs, faux calligraphy, or wellness clichés.
- Logo: design an original inline SVG from two incomplete concentric circles and a single small leaf-shaped gap at the upper right. Use a 32×32 viewBox, approximately 1.6px strokes, no stock icon. Pair it with `MIZUNOWA` in spaced Manrope 600. Reuse the mark in the header and footer.
- Recurring details: (1) a thin ripple circle intersecting section rules, (2) chapter markers `01 / 03`, `02 / 03`, `03 / 03`, and (3) short field-note labels with a Japanese term paired with its English meaning. These are quiet guides, not a gaming HUD.

### Cultural and fictional framing

This is a **fictional garden inspired by Japanese pond gardens and a Shinto shrine precinct**. No real shrine, address, deity, patronage, sacred ceremony, or historical claim is invented. A small shrine-inspired worship hall and its torii belong in the garden composition, as requested; the torii stands on an approach to the building, rather than appearing as a random floating ornament. Refer to it as a **shrine**, not a Buddhist temple. Do not turn prayer, purification, fortune slips, religious objects, or imaginary offerings into buttons, gamified rituals, or claims of spiritual benefit.

Use architecture as a coherent place: dark timber uprights, a raised floor and simple gabled roof with generous eaves, a sheltered approach, and a separate vermilion torii on land. Do not copy a recognizable existing shrine or its crest. Model the building exterior only. For design context, consult the Japan National Tourism Organization's [guide to shrine and temple traditions](https://www.japan.travel/en/guide/shrine-and-temple-traditions/) and [explanation of shrine features](https://www.japan.travel/en/uk/inspiration/two-bows-and-two-claps-the-ins-and-outs-of-shinto-shrines/). The Japanese government's [nishikigoi overview](https://www.gov-online.go.jp/eng/publicity/book/hlj/html/202004/202004_06_en.html) describes ornamental carp and their varied patterns. Use these for respectful visual grounding, not claims that the fictional garden exists.

### Palette

Place these **ten six-digit hex colors first** in `src/index.css`, grouped in `:root`, in this order. The importer samples at most the first ten unique CSS hex colors to infer the palette. Create additional opacity/tints with `color-mix()` or alpha, not new CSS hex values.

| Token | Hex | Job |
|---|---|---|
| Pond | `#112C2A` | Hero ground, deepest water, footer |
| Paper | `#F4EFE2` | Main reading background, light text on pond |
| Moss | `#203D33` | Grove sections, dark overlays, planted land |
| Vermilion | `#9E3F32` | Primary buttons, torii, small navigational accents |
| Sakura | `#C7A6A2` | Blossom clusters and a restrained highlight |
| Stone | `#D6C7A9` | Rock edges, map paths, quiet rules |
| Leaf | `#526E58` | Moss and secondary text on paper |
| Ink | `#1E2320` | Dark koi markings, body text |
| Porcelain | `#FDFBF5` | Koi bodies, off-white surfaces, text on vermilion |
| Gold | `#CB9462` | One koi pattern and small warmed-wood details |

Verified solid text combinations: paper/pond **12.90:1**, paper/moss **10.30:1**, paper/vermilion **5.70:1**, paper/leaf **4.90:1**, porcelain/vermilion **6.32:1**, sakura/pond **6.63:1**. Body text and controls use these high-contrast pairings. Sakura, stone and gold are not body text on paper. Provide a 2px visible focus ring with 3px offset, using paper on dark grounds and pond on light grounds.

### Type and structure

| Role | Face | Size and treatment |
|---|---|---|
| Display | Newsreader 400/600, roman | Hero `clamp(46px, 5.3vw, 76px)`, line height 1.02; section headings `clamp(36px, 4vw, 56px)`. Sentence case, balanced breaks. |
| Reading/UI | Manrope 400/500/600 | 18px/28px desktop, 16px/25px mobile; navigation and buttons 14–16px. |
| Field notes | IBM Plex Mono 400/500 | 12px/18px, restrained letter spacing; chapter numbers and captions only. |

Desktop content max width 1320px, outer margins 64px at 1440px; 12-column layout with 24px gutters. Tablet margins 32px; mobile 20px. Use generous 80–112px desktop section padding and 56–72px mobile padding. Corners are mostly square or 8px; reserve a pill shape for the primary button only. No generic glass dashboard, purple gradients, neon outlines, stock torii clip art, or repetitive three-card feature grids.

---

## 3. Page content and layout

Build a conventional scrolling page with one real H1 and these anchors, in this order. All copy below is final sample copy for the fictional template; do not substitute lorem ipsum.

### Header

- Left: ripple mark, `MIZUNOWA`, small `水の輪` beneath or beside it.
- Center links: `The garden` → `#garden`, `Koi` → `#koi`, `The walk` → `#walk`, `Seasons` → `#seasons`.
- Right: `Explore the garden` → `#garden`.
- Desktop: 76px high, transparent over the pond-colored hero, then solid pond-color background and fine separator after scrolling. On mobile, 64px high with an accessible menu button and a full-height menu panel. Provide Escape, focus containment, focus restoration, and scroll unlocking on close. Without JavaScript, show the section links as a wrapping or horizontally scrollable native navigation row; do not leave them behind an inoperable menu button.

### Hero — `#top`

The **3D koi pond is the main asset**. It must be the largest visual element on the page and remain unmistakably a pond with recognizable fish, not a decorative blob, tiny thumbnail, carousel, or flat looping video.

Copy:

- Eyebrow: `AN IMAGINED JAPANESE GARDEN`
- H1, two intentional lines: **“A quieter world,” / “just beneath the surface.”**
- Lead: “Follow four koi through a sunlit pond, then wander past sakura and a shrine courtyard in this imagined Japanese garden.”
- Primary: **`Explore the garden`** → `#garden`.
- Secondary text link: **`Meet the koi`** → `#koi`.
- Small caption: `Four koi · Three garden stops · One unhurried walk`.
- Stage caption: `水の庭 / Water garden`.

At 1440×900: header at top, left copy column approximately x=64–475 and beginning around y=190; the pond stage occupies most of the right side, roughly x=500–1380, y=130–760. The water and fish are visible without scrolling, with a full sakura tree at the far left of the pond and the shrine courtyard behind the far bank. Avoid copy over the fish. Use the dark pond ground across the whole hero, not a rounded card floating inside another rounded card.

At 390×844: header, eyebrow, H1, lead and CTA stack first; then a 350px-wide pond stage, approximately 300–340px high. The beginning of the pond should be visible in the initial viewport. Keep four distinguishable koi and the building/tree silhouette in the stage; do not make the visitor scroll through a giant blank frame. Aim for at least 55px apparent fish length on a desktop hero and 20px on the phone, while preserving the world dimensions. Use an art-directed mobile camera crop if needed, but never reduce the pond to a tiny background decoration.

In the stage, show the **real controls** `Pause pond` (when live), `Resume pond` (when paused), and `Make a ripple`. On a phone before activation, show `Explore the 3D pond` and retain the still-poster ripple control. When reduced motion is set, show `Still pond view`; no button may imply that 3D is running.

### Garden introduction — `#garden`

Transition from the pond ground into paper via a thin circular ripple line that meets a horizontal rule. Use a narrow numbered intro column and a wider copy column, not a centered card.

- Label: `01 / THE GARDEN`
- H2: **“Take the long way around.”**
- Text: “The pond is the beginning of this imagined walk. A path follows the water, passes beneath the blossoms, and arrives at a quiet shrine courtyard.”
- Three short inline notes: `WATER / the koi pond`, `BLOSSOM / the sakura grove`, `THRESHOLD / the shrine approach`.
- A simple line-drawn top-down route leads to `#walk`. The route should visually correspond to the same pond, tree, approach and hall seen in the hero.

### Koi field notes — `#koi`

- Label: `02 / 錦鯉 / NISHIKIGOI`
- H2: **“Each one leaves a different line.”**
- Text: “Look closely and each fish has its own pattern. Their paths cross the same water at their own pace.”
- Show four **non-interactive specimen illustrations** in a continuous horizontal ruled strip on desktop, a two-by-two layout on phones. These fish correspond exactly to the four live models. No fake hover cursor or hidden copy.

| No. | Label | Visible pattern | Caption |
|---|---|---|---|
| `01` | `Red and white` | Porcelain body, vermilion islands | “Warm patches on a pale body.” |
| `02` | `Gold` | Gold body with a porcelain underside | “A warm glint beneath the water.” |
| `03` | `Ink and white` | Porcelain with irregular charcoal patches | “Dark markings, softly defined.” |
| `04` | `Three colours` | Porcelain, vermilion and charcoal | “A pattern made of light and shadow.” |

Use original inline SVG silhouettes derived from the same proportions and colors as the 3D koi. Do not mislabel invented pattern names as certified varieties.

### The garden walk — `#walk`

- Label: `03 / THE WALK`
- H2: **“Three places, one slow path.”**
- Desktop layout: a full-bleed 7-column illustrated map on the left, three numbered editorial rows on the right. Mobile: map first, then the rows. Map uses SVG, not a second WebGL scene. Clearly mark water, sakura, the path, torii and hall. Include a text alternative with their reading order.

1. **`Pond edge`** — “Begin where the koi move through the clear green water.”
2. **`Sakura grove`** — “Follow the path beneath a canopy of pale spring blossoms.”
3. **`Shrine courtyard`** — “Pass the torii and arrive at a small timber hall set back among the trees.”

Map labels correspond to these rows. As each row enters, draw its segment of the route once; do not pin a second canvas or hijack scrolling. With motion disabled the complete map and all labels are immediately visible.

### Seasonal notes — `#seasons`

Begin with a large two-line statement, separate from the hero: **“The garden keeps its shape. / The light keeps changing.”** Keep a full-contrast text layer; animate a subtle colored duplicate across words in reading order without making the base text unreadable.

Use a full-width dark moss section: one wide paper-cut-style SVG of the same garden on the left and four native `<details>` rows on the right. Each `<summary>` contains the season and an English descriptor. Spring is initially open; visitors can open any season with mouse, touch, or keyboard. JavaScript may update the adjacent illustration colors when a row opens, but every answer remains readable through native disclosure without JavaScript. If several rows are open, the illustration follows the last opened one; if none are open, show spring. The hero stays a spring scene throughout and never pretends to be showing real-time weather.

| Season | Summary copy | Illustration change |
|---|---|---|
| Spring | “Soft blossoms gather over the water.” | Sakura and fresh leaf accents |
| Summer | “Deep green leaves make a little shade.” | More leaf, fewer petals |
| Autumn | “The path takes on warmer colors.” | Stone and gold foliage |
| Winter | “Bare branches let the shape of the garden show.” | Branch silhouettes and paper-colored highlights |

### A simple route — `#plan`

Use a clean paper background and an asymmetrical layout, with the route as three visible numbered steps rather than a pretend booking form.

- H2: **“Make a little room for the journey.”**
- Text: “Start at the pond, walk beneath the sakura, and finish at the shrine courtyard. This is an imagined route, ready to explore on this page.”
- Steps: `01 Watch the water` / `02 Follow the blossoms` / `03 Find the courtyard`.
- Primary CTA repeats **`Explore the garden`** → `#garden`. A small `Back to the pond` text link points to `#top`.
- Small disclosure: “MIZUNOWA is a fictional garden created for this template.” Do not advertise tickets, operating hours, transport, accessibility of a real location, or reservations.

### Questions — `#questions`

Use six native `<details>` disclosures with visible focus. Keep them in the HTML, never exclusively in a modal.

1. **Is MIZUNOWA a real place?** “No. This is an imagined garden created as a digital landing-page template.”
2. **Can I interact with the pond?** “Yes. Select ‘Make a ripple’ or touch the water when the scene is available. The koi continue along their own paths.”
3. **What if my device cannot run the 3D scene?** “A composed still view remains visible, and you can continue through the full garden guide.”
4. **Can I pause the movement?** “Yes. The live pond has a pause control. Your device’s reduced-motion setting also keeps the pond still.”
5. **Are the koi real fish?** “No. They are original computer-generated characters with four distinct color patterns.”
6. **Can I book a visit?** “No. The garden is fictional, and this template does not make bookings or collect personal information.”

### Footer

Ripple mark, `MIZUNOWA`, `水の輪`, text “An imagined garden in motion.” Repeat the four section links, a `Back to top` link, and the fiction disclosure. All links lead to existing anchors. No fabricated contact details, social links, policy pages, map location, or dead `#` buttons.

---

## 4. The 3D hero — composition and geometry

### Scene composition

Use a single real-time scene in `src/pond/` with a `WebGPURenderer` imported from `three/webgpu`. It selects WebGPU where available and can fall back to WebGL2. Use Three's TSL (`three/tsl`) for subtle fish/water material detail; no downloaded 3D models, HDR environment, video, or external textures.

Art direction is an original, refined **architectural garden model viewed from above at an oblique angle**, with realistic proportions and gently simplified materials. It should feel like a physical miniature in warm daylight rather than a low-poly game, photorealistic tourism photograph, shiny aquarium, or cel-shaded toy. Avoid plastic bubbles, fake lens flare, heavy fog, reflective chrome, intense bloom, and carpet-like repeating textures.

World coordinates: X horizontal, Y up, Z toward the viewer. The pond lies at Y=0 and is an ellipse with radii `rx=4.2`, `rz=3.0`. The camera looks toward approximately `(0,0,-0.9)` from `(0,10.5,8.6)`, an elevated three-quarter view. Use an `OrthographicCamera` and fit the complete pond, tree, gate, and hall against viewport aspect with 8–12% padding. Keep the camera stationary while fish swim, and recompute the frustum on resize. On narrow screens use a slightly higher crop/angle to preserve fish visibility, but show a recognizable tree and shrine. Do not implement automatic orbit or drag-to-rotate.

Build these spatial parts:

1. **Water and bed:** An irregular but calm oval pond, deep jade with a softly visible bed and five to seven varied smooth stones, framed by a low organic bank. The water surface has a slight local light shift and a few quiet ripple lines; it is not an opaque plane concealing the fish.
2. **Four koi:** Four visibly separate, properly proportioned fish under the water, not decals or tiny dots. Their body, nose, tail, eyes, dorsal fin, paired pectoral fins, and forked caudal fin must be recognizable from the camera. Give each the matching field-note color pattern. Their tails move gently and follow their own heading.
3. **Sakura:** One full tree at the upper-left bank with a dark tapering trunk, an asymmetric branching structure, and many small, varied blossom clusters. Leave negative space between branches. A few petals can sit on the pond; no blizzard of particles.
4. **Shrine courtyard:** Set the path and torii on the far bank at the upper-right, followed by a small gabled timber worship hall at a greater Z depth. The path, gate and hall must line up visually. Keep the building and tree subordinate in scale to the pond and visible in the static poster.
5. **Grounding:** Irregular stepping stones, low moss, and two or three small plant groupings on the bank. A soft contact shadow grounds the scene. Do not sprinkle the scene with unconnected decorative props.

Depth order matters. Put fish centers around Y=-0.13, the pond floor below them, and water at Y=0. Keep the fish's upper bodies below the surface. Use a transparent water material with `depthWrite=false`, controlled render order, and approximately 0.12–0.22 opacity so the fish remain clearly visible. Render ripple lines just above water. Verify the actual output on both WebGPU and WebGL2: a fully opaque pond plane or a depth buffer ordering mistake must never hide the fish.

### Fish geometry and movement

Use smooth procedural geometry. A good deterministic construction uses a 24–32 segment lengthwise body, 12–16 radial segments, a rounded head, gently tapering rear body, and separate thin fin meshes. Model local **+X as the head direction**. Koi bodies should read as fish from above rather than ellipsoids with triangle tails; eyes sit near the head on both sides. Four pattern variants may share geometry and material logic but must have independent color uniforms and animation phases.

Define longitudinal coordinate `u` from 0 at the tail root to 1 at the nose. A useful body radius envelope is `R * sin(πu)^0.7 * (0.72 + 0.28u)`, with `R≈0.13`, vertical radius about 0.70 of the horizontal radius, and a body length around `0.68` world units plus a `0.12` tail. Preserve a smooth closed head and tail root. Use deterministic UV-space irregular patches for patterns, not random per-frame noise. If TSL applies body undulation, use object-local position/UV and a time uniform; do not add displacement in world space that detaches the fish from its path. A suitable lateral offset is:

```text
tailWeight = (1 - u)^1.7
lateralOffset = 0.035 * tailWeight * sin(8 * (1-u) - 3.2 * elapsed + fishPhase)
```

Animate the attached tail fin with the same phase and a small angle. Pectoral fins may oscillate by at most 0.12 radians. No breathing scale pulse, rapid spinning, chasing, collision response, or unpredictable random wandering is needed.

Place the fish on two well-separated elliptical routes, two fish per route. For fish `i`, use `theta = speed * elapsed + phase`, then:

```text
x = a * cos(theta)
z = b * sin(theta)
vx = -a * speed * sin(theta)
vz =  b * speed * cos(theta)
yaw = atan2(-vz, vx)    // Three.js Y rotation for a +X-facing fish
```

| Fish | a | b | speed (radians/sec) | initial phase |
|---|---:|---:|---:|---:|
| Red and white | 3.05 | 2.00 | +0.18 | 0 |
| Gold | 3.05 | 2.00 | +0.18 | π |
| Ink and white | 1.70 | 1.00 | −0.24 | π/2 |
| Three colours | 1.70 | 1.00 | −0.24 | 3π/2 |

The centerline routes stay within the pond and the fish do not chase the pointer. At `elapsed=0`, the first fish is at `(3.05, 0)` in XZ, travels toward +Z, and has yaw `−π/2`. Its partner is at `(-3.05, 0)`. Fish on the same route stay opposite. With the stated maximum overall fish length around 0.80, the two routes leave useful clearance; test the actual geometry and fin extents, not only centers. No fish, tail, eye, or fin may cross the bank.

### Water interaction: the signature

- A pointer/touch on the visible pond surface creates an outward traveling circular ring at the actual hit point. Use a Three.js `Raycaster` against the water plane, then accept only `(x/rx)^2 + (z/rz)^2 <= 1`. Ignore clicks on the bank, building, tree, or controls. Do not capture the pointer, cancel touch scrolling, or make pointer movement steer the fish.
- Keep up to three ripples. Each lasts 1.8 seconds and expands from radius 0.04 to an allowed radius over time, fading out; recycle the oldest on a fourth input. For an accepted center, let `rho = sqrt((x/rx)^2 + (z/rz)^2)` and `maxRadius = min(0.8, 0.9 * min(rx,rz) * (1-rho))`; this conservative bound prevents rings escaping the ellipse. Render rings as reusable thin horizontal geometry or a compatible TSL material. No frame-by-frame React state updates.
- `Make a ripple` is the keyboard-accessible equivalent; it uses a deterministic point near the pond center, e.g. `(0.35,-0.25)`. Announce “Ripple added” once, not every frame. The same button works in still/reduced-motion mode by showing a **non-animated** SVG ring in the poster. A direct touch on the still pond may show the same static ring if the hit area is known.
- When the live scene is paused, `Make a ripple` shows a static ring and does not resume the koi. Resume continues from the frozen simulation time. This keeps the pause control honest.

### Lighting and performance budget

Soft warm directional key from upper left, low hemisphere fill, and restrained ambient light. Materials are matte stone and wood, soft translucent blossom clusters, and satin koi. Use only palette colors and physically plausible shading. For example, use `MeshStandardNodeMaterial` with moderate roughness; koi markings can be a TSL mix of UV-space smooth masks, and water a low-amplitude static/slowly changing node pattern. No physically inaccurate fake reflections are required.

Use instancing or shared geometries/materials for stones, petals and flowers. Target at most **40,000 triangles and 80 draw calls** for the complete scene on desktop, below 25,000 triangles and 60 calls on mobile. Cap DPR at 1.5 desktop and 1.25 mobile. Do not allocate new geometry, textures, or materials per frame. Use one animation scheduler and one canvas; no full-screen post-processing, extra render targets, or physics.

---

## 5. Scene lifecycle, accessibility, and fallbacks

`PondStage.tsx` always starts with the **complete SVG poster** in a fixed-aspect stage. It must not import `three` or `scene.ts` at module scope. After effects determine that it is eligible, dynamically `import('../pond/scene')`, initialize, render a first frame, then crossfade the canvas over the poster without changing layout.

| Environment | Initial behavior | User control |
|---|---|---|
| Desktop, fine pointer, no reduced motion / Save-Data | Near viewport and browser idle, start the scene once | Pause/resume, tap or button ripple |
| Touch, narrow screen, or Save-Data | Keep poster; do not load Three.js automatically | `Explore the 3D pond` opts in; then pause/resume |
| Reduced motion | Complete poster and static ripple; never import or initialize Three.js | `Make a ripple` adds a still ring; no autoplay |
| Graphics initialization fails or device is lost | Keep/restore poster and all HTML | `Try 3D again` permits explicit retry; static ripple still works |
| JavaScript disabled | Essential text and poster in page markup | Hide controls that need JavaScript; native links/details work after import |

The initial React render is always the same server-safe poster with controls in their non-running state. Use a JS-enhanced class set in an effect for optional controls/reveals; the absence of JS never leaves a hidden stage. In the Vite-only preview, use the `index.html` `<noscript>` content from section 1; the post-import Next route pre-renders the React content and poster.

The scene is decorative and the canvas is `aria-hidden="true"`; keep its description in adjacent HTML: **“Four patterned koi swim through an imagined pond beneath a sakura tree, near a shrine courtyard.”** Mouse interaction is always supplemented by the real `Make a ripple` button. Accessible buttons need visible names, 44×44px targets, focus rings, and keyboard support. `Pause pond` must stop all koi, shader time and ripple motion; it remains visibly paused until the visitor resumes. The site must never play audio.

Use `await renderer.init()`; Three.js 0.186.1 can choose its WebGL2 backend automatically. On an init rejection, permit at most one attempt using a fresh `WebGPURenderer({ forceWebGL: true })`, then keep the poster. Do not route TSL materials through the separate legacy `WebGLRenderer`. On a device-loss callback, preserve and call the original `renderer.onDeviceLost` with the renderer as its receiver, stop the loop, show the poster, and require an explicit retry. Keep selected season, pause state, and UI navigation independent of the renderer.

Cancel animation frames and idle work; disconnect observers/listeners and dispose scene-owned geometry, materials, textures and renderer on unmount, visibility change, loss, or reduced-motion changes. Use a synchronous generation token before awaiting imports/init so a late renderer cannot append a canvas after cleanup. In the installed Three.js release, init/loop/disposal methods can be asynchronous: await/catch lifecycle work in an internal async function, never return a Promise from React effect cleanup. A renderer whose `init()` rejected must not be blindly disposed or passed to `setAnimationLoop(null)`, because the installed implementation can try to initialize it again; retire its canvas and perform only guarded best-effort backend cleanup. Do not allow unhandled promise rejections.

When the scene is outside the viewport or the tab is hidden, pause the render loop without changing the explicit pause setting. Resume from the preserved elapsed time rather than jumping ahead. If the OS preference changes to reduced motion while initializing or running, invalidate pending work, dispose successful graphics, and show the poster. If the OS preference later permits motion, wait for a new explicit activation; do not surprise the visitor with autoplay.

---

## 6. Motion map and responsive behavior

Use CSS variables for the complete timing system:

```css
:root {
  --mnw-ease-out: cubic-bezier(.22, 1, .36, 1);
  --mnw-ease-tide: cubic-bezier(.45, 0, .2, 1);
  --mnw-fast: 180ms;
  --mnw-base: 420ms;
  --mnw-slow: 800ms;
  --mnw-hero: 1100ms;
  --mnw-stagger: 70ms;
}
```

The hero poster is visible from the first paint. When motion is allowed, logo/nav settle over 400ms; the two H1 lines mask-rise in sequence; lead and CTA lift 12px; the caption appears last; canvas crossfade waits for its first successful frame. The page never waits behind a preloader.

| Element | Entrance | Scroll / connection | Hover or focus | Press / state | Handoff |
|---|---|---|---|---|---|
| Header and menu | Logo settles; links enter in order | Header gains a solid ground and rule | Underline draws; clear focus ring | Menu opens/closes with reversible inset clip; Escape works | Focus returns to menu trigger on close |
| Hero text and CTA | Two masked title lines, then lead/CTA | Text stays still and legible | CTA fill and arrow shift; secondary underline draws | CTA presses at scale .98 and navigates | Anchor lands beneath header |
| Pond | Poster immediate; live frame crossfades | No forced camera movement or scroll capture | Subtle water cursor only on fine pointer, native cursor retained | Button/touch ripple; pause/resume and clear fallback state | One outgoing circular line meets the next section rule |
| Garden intro | Label slides; heading rises; rule draws | A route segment draws once in view | Links underline and focus ring | Anchor navigation only | Line continues into field-note strip |
| Koi field notes | Four specimen silhouettes reveal in reading order | Tiny rule draws, no scroll-driven movement of labels | Non-interactive specimens have no false hover state | No action | Ruled strip hands into garden map |
| Walk map and rows | Map clip-wipe; captions rise | Each corresponding route segment draws once | Row links/focus if used; map labels remain visible | No map interaction required | Path exits toward seasonal section |
| Seasonal statement | Full-contrast base appears immediately; accent words reveal | One accent word at a time | Non-interactive | No action | Statement leads to the seasonal notes |
| Seasonal disclosures | Four rules draw in order | No pinned scroll | Summary indicator/focus ring | Native open/close, illustration changes when opened | Closing last row restores spring illustration |
| Route CTA | Short rise and line draw | No parallax | Button and link have visible hover/focus | Press .98; anchor navigates | Returning to `#garden` preserves current pond state |
| FAQ | Rows enter with short stagger | None | Summary ring/indicator | Native disclosure, optional transform/opacity on inner copy | No keyboard focus is hidden |
| Footer | Logo/line settle | None | Link underline/focus | Native anchor | Back-to-top respects reduced motion |

At least four entrance types are present: masked title, short copy rise, illustration clip-wipe, and drawn line/route. Animate transforms, opacity, and clip-path; do not animate layout dimensions, box-shadow, or blur continuously. Use one `requestAnimationFrame` per running scene and a shared IntersectionObserver for reveals. Under `prefers-reduced-motion: reduce`, disable hidden reveal states, canvas, smooth scrolling, scrolling progress animation, ripples in motion, and ambient movement; retain all text, still scene, controls and native interaction. The default CSS state is visible before JS installs observers. Use a no-JS CSS override where appropriate.

At 375px and 390px: no document horizontal overflow, all text remains readable, no hover-only content, no clipped gate or required fish, and controls are 44px or larger. Keep the header and hero usable at 200% zoom and on a short landscape viewport. Minimize CJK text so system fallback remains dependable.

---

## 7. Functional and visual tests to implement

Keep testable scene math independent of React and Three.js. In `src/pond/model.ts` provide functions with stable, typed inputs and outputs for:

```ts
type PointXZ = { x: number; z: number };
type FishPath = { a: number; b: number; speed: number; phase: number };
type FishPose = PointXZ & { yaw: number };

fishPose(path: FishPath, elapsed: number): FishPose;
isInsidePond(point: PointXZ, rx: number, rz: number): boolean;
maxRippleRadius(point: PointXZ, rx: number, rz: number): number;
```

Treat nonfinite elapsed as zero; invalid/nonpositive ellipse radii and nonfinite points return `false` / radius `0`; reject out-of-pond ripple points. For valid points, implement the equations in section 4. Use Vitest for meaningful pure behavior:

1. Red/white pose at time 0 is `(3.05,0)`, yaw `−π/2` within `1e-8`; its partner starts opposite.
2. Its pose after `2π/0.18` seconds equals its time-0 position within `1e-8`; different fish phases remain independent.
3. Sample all four paths across a full common cycle of `100π` seconds (the periods have a 4:3 ratio). At each sample, all positions, headings, and polygonal fish extents are finite and lie inside the pond. Test minimum fish center separation of at least 0.80 world units over sufficiently dense samples; adjust visual fin geometry or paths if actual silhouettes still overlap.
4. Pond center is accepted, `(rx+0.01,0)` is rejected, invalid inputs are safe, and `maxRippleRadius` is nonnegative and satisfies `rho + r/min(rx,rz) <= 1` for sampled valid points.
5. Animation clock pauses without advancing, resumes from the same elapsed time, and visibility pauses do not override an explicit user pause.

In the AI Studio preview, verify the visual at 1440×900 and 390×844: the pond is the strongest image, four fish can be identified, water does not obscure them, and the tree, torii, and hall form one legible landscape. Check the poster on reduced motion, touch opt-in, a forced renderer failure, ordinary keyboard navigation, the full mobile menu, seasonal disclosures, FAQs, and no horizontal overflow. If the environment lacks a real GPU or full test runner, say which checks could not be performed rather than claiming they passed. Include a tiny test seam around the renderer factory so initialization failure, late completion after unmount, and the no-import reduced-motion path can be tested without needing a physical GPU.

After import, expand the generated Playwright smoke test to cover all of the above, including canonical routes and actual pointer-created ripples. Verify one real rendered frame in an environment with graphics support; a mock test alone does not prove the scene renders.

---

## 8. Asset delivery and visual production

The source can be entirely self-contained; no paid generation, stock imagery, or external 3D models are needed. Create these assets as real files:

| File | Format / ratio | What it must show |
|---|---|---|
| `public/assets/pond-poster.svg` | SVG, viewBox `0 0 1600 1200` | A complete, detailed static rendering of the hero scene: dark jade oval pond, **four individually patterned koi with fins**, soft concentric rings, stone bank, one full sakura tree, a land-based torii and small timber hall. Match the live scene's camera and palette. The illustration is a finished fallback, not a wireframe or placeholder. Include no text. |
| `public/assets/garden-map.svg` | SVG, viewBox `0 0 1200 900` | The same pond and garden simplified into an editorial route map; show water, sakura, path, torii and hall. Keep labels in HTML for accessibility and translation. |
| `public/assets/hero-pond.webp` | **Actual WebP**, 1600×900 | A 16:9 crop of the completed scene or poster, suitable as the importer's temporary gallery candidate. No text baked into it. |

Use the SVG poster at `/assets/pond-poster.svg` as the first-paint hero and stage fallback; use the map at `/assets/garden-map.svg`. Give them intrinsic dimensions and meaningful alternative text. Render the koi field-note illustrations inline from reusable SVG components. Draw seasonal diagrams as inline SVG using the same local model/palette.

If AI Studio cannot create a binary WebP, it must still deliver the complete SVG poster and explicitly report that the WebP must be generated locally before import. Section 10 provides a local conversion using the destination repo's installed `sharp` package. Do not silently leave the WebP missing: the current importer may otherwise copy an unrelated existing gallery image, and it may copy PNG/JPEG bytes to a `.webp` filename without conversion.

No media has been generated in the planning session. These filenames are instructions for the future AI Studio project and subsequent import, not assets that already exist here.

---

## 9. Implementation sequence for AI Studio

1. **Scaffold the Vite project** and the exact source contract in section 1. Put all ten palette hex values at the beginning of `src/index.css`. Add the metadata, preview fonts, the root component, and complete no-JS preview fallback.
2. **Create the finished static poster and map**, then the semantic page and exact copy. Verify that the hero is visually compelling before any canvas mounts; an empty waiting box is not acceptable.
3. **Implement and test pure pond math** and a freeze/resume clock. Make the four fish routes and ripple bounds deterministic.
4. **Build the shared Three.js scene**: terrain and banks, fish geometry/patterns, water layers, sakura and shrine composition, then add subtle motion. Use the scene lifecycle and budgets in sections 4–5.
5. **Add the accessible controls**, touch ripple, reduced-motion still interaction, mobile opt-in, error/loss fallback, seasonal disclosures, navigation and motion map.
6. **Verify the source project** in the available preview. Report actual visual/test results and unresolved environment limitations. Export the project folder including `src/`, `public/assets/`, `index.html`, `metadata.json`, and `package.json`.

Do not simplify the final into a static screenshot, a single fish icon with CSS animation, a full-page canvas, or a 3D asset that only appears after the user scrolls. A simple but complete 3D garden is more valuable than a partially implemented ambitious scene. Keep every user-visible promise truthful.

---

## 10. Local import handoff for openlanding.page

The following steps are for the person or local coding agent working **after** AI Studio has produced a project. They are not instructions for AI Studio to generate a Next.js project, and they have not been executed during this planning task.

### 10.1 Check the exported source and prepare the raster candidate

From the `openlanding.page` repo root in PowerShell, set a task-specific variable to the actual exported source folder. Replace the example path; do not paste the placeholder unchanged.

```powershell
$MizunowaSource = 'C:\path\to\exported-mizunowa-project'
if (-not (Test-Path -LiteralPath (Join-Path $MizunowaSource 'src\App.tsx'))) { throw 'Choose the exported Vite project folder containing src\App.tsx.' }
if (-not (Test-Path -LiteralPath (Join-Path $MizunowaSource 'public\assets\pond-poster.svg'))) { throw 'The complete pond poster SVG is missing.' }
```

If AI Studio did not export a genuine `public/assets/hero-pond.webp`, generate it from the completed SVG using the `sharp` installed in this repository. Run the command from this repo root so Node can resolve that package:

```powershell
$MizunowaWebp = Join-Path $MizunowaSource 'public\assets\hero-pond.webp'
if (-not (Test-Path -LiteralPath $MizunowaWebp)) {
  node -e 'const p=require(\"node:path\"),sharp=require(\"sharp\"),d=process.argv[1]; sharp(p.join(d,\"public\",\"assets\",\"pond-poster.svg\")).resize(1600,900,{fit:\"cover\",position:\"centre\"}).webp({quality:82}).toFile(p.join(d,\"public\",\"assets\",\"hero-pond.webp\")).then(()=>console.log(\"Created hero-pond.webp\")).catch(e=>{console.error(e);process.exit(1)})' $MizunowaSource
  if ($LASTEXITCODE -ne 0) { throw 'Poster conversion failed.' }
}
```

Check that the result actually decodes as WebP and that the 16:9 crop keeps fish and garden features visible. If an existing file named `.webp` is actually PNG/JPEG, convert it; simply renaming it is not sufficient. Keep this local asset-generation work in the exported AI Studio project, not in unrelated gallery folders.

### 10.2 Run the importer

Use the real existing category ID **`3d`**. The older import guide lists names such as `3d-webgpu`, but the current gallery's `CategoryId` uses `3d`; the importer casts its input without validating that older label.

```powershell
bun run import-template $MizunowaSource --slug mizunowa --category 3d --dry-run
bun run import-template $MizunowaSource --slug mizunowa --category 3d
```

Read the dry-run output first and check the slug/title/palette. Its current implementation stops after metadata analysis: it does **not** prove the source compiles, copied assets exist, or gallery registration will pass. For a local folder it does not write the import; remote repository resolution may clone or pull even for a dry run. Do not use `--force` on an existing destination without separately reconciling its contents. A normal successful import creates source under `src/app/(mizunowa)/mizunowa/`, assets under `public/templates/mizunowa/`, a route at **`/templates/mizunowa`**, and an initial gallery entry. The legacy `/mizunowa` route redirects to the canonical route.

### 10.3 Audit importer output and complete integration

The current importer is a helpful starting point, not a complete quality gate. Inspect these outputs and fix only MIZUNOWA-related entries while preserving existing work:

1. `src/app/(mizunowa)/mizunowa/MizunowaApp.tsx`: confirm `export default function MizunowaApp()` exists and all copied relative imports resolve. Confirm the source's literal `/assets/...` paths were rewritten to `/templates/mizunowa/...`, including CSS and SVG references.
2. `src/app/(mizunowa)/layout.tsx`: confirm Newsreader, Manrope, IBM Plex Mono, title, description, background and `lang` survived. The importer adds `scroll-smooth`; override it for reduced motion. Review font preload behavior and turn off utility-font preload if needed. The importer generates its own generic `icon.svg`, Open Graph graphic, shallow `DESIGN.md` and `PROMPT.md`; replace those with the original ripple mark and implementation-accurate design/rebuild documentation.
3. `scripts/templates.config.ts`: confirm the palette is complete and the slug is present. The current importer adds a **route-wide `paletteExempt` and `mediaExempt: true`**. Remove broad exemptions where practical, replacing them only with narrow, justified content-color exceptions. Do not claim the palette guard is checking exempt files. The importer-created `assets.generated.ts` starts empty; direct copied poster/map assets work without it. If later running the image processor, register and render its generated assets consistently rather than keeping a blanket media exemption.
4. `scripts/generate-copy-bundles.ts`: the current importer hard-codes `['lucide-react','motion']`, regardless of what the project imports. Set MIZUNOWA's `COPY_METADATA.dependencies` to the actual runtime packages: at minimum `['three']`, adding others only if truly used. `three` and `@types/three` already exist in the destination; the importer itself does not install source dependencies.
5. `src/app/(index)/data/templates.ts`: check `RAW_TEMPLATES`, the slug union, `category: '3d'`, useful category tags, description, badges, image path, and the actual model used. The importer fills a generic prompt, industry, stack, and a hard-coded model tag (`Gemini 4 Argon High` at inspection); do not claim that model unless it really built the page. Replace the generic prompt with a self-contained accurate rebuild brief. Keep `hasDownload: false` unless a separately generated and verified standalone download is intentionally added.
6. `src/app/(index)/data/templates.test.ts` and `tests/e2e/templates.ts`: check actual slug ordering/count after any concurrent work, model expectations, and canonical `/templates/mizunowa` path. The autogenerated Playwright test is only a smoke test; expand it to cover the interaction, renderer failure, keyboard, touch, and reduced-motion cases in section 7.
7. `src/app/(index)/data/technology-tags.ts`: add `mizunowa` to `threejs`, `interactive-backgrounds`, and `shaders` **only if the implemented page actually has those features**. Add a scroll-animation tag if the route/reveal motion is implemented. Do not claim libraries that are merely installed.
8. `public/templates/mizunowa/preview-1600.webp` and `public/gallery/mizunowa.webp`: inspect both files. The importer copies an image candidate; it does not make an accurate page screenshot or guarantee the filename matches the image's encoding. Once the page is built, capture a real 880×495 production screenshot of the finished hero with reduced motion for the gallery. Generate only this template's screenshot; `npm run preview` currently captures **all** active templates. Avoid overwriting other gallery images.
9. Review all imported runtime files for Vite-only assumptions, `window` at module scope, nonliteral asset URLs, missing images, duplicate CSS imports, and errors after the automatic `App` rename. Build with this repo's normal Turbopack configuration, not a Webpack-only workaround.

### 10.4 Verification after import

Before claiming the template works, run the repository checks against the imported result and read their output:

```powershell
bun run check
bun run test
bunx tsc --noEmit
bun run lint
bun run build
bunx playwright test tests/e2e/mizunowa.spec.ts
```

Then run the broader Playwright suite as appropriate for the repository, manually inspect 1440×900 and 390×844, and capture the finished hero and a lower-page frame. Test no JavaScript after import, reduced motion, mobile activation, keyboard, loss/fallback, actual ripple placement, and pause/resume. Target mobile Lighthouse performance **≥90**, accessibility **≥95**, best practices **100**, with no layout shift from the poster-to-canvas transition. Record any preexisting unrelated failures separately; do not weaken checks to make an import look successful.

If a standalone download is later wanted, build fresh first, use the repo's targeted standalone exporter for `mizunowa`, verify it offline, and only then align `hasDownload` and copy metadata with the real file. It is not required merely to import the template.

---

## Acceptance criteria

The finished page opens on a large, recognizable, real-time **four-koi 3D pond** with a sakura tree and a coherent torii-to-shrine approach. A pointer or accessible button creates a bounded ripple; the pond can be paused; the page remains complete when the renderer is unavailable. The entire experience has a distinct Japanese garden identity, accurate fictional framing, responsive content, and an importable Vite source structure. The imported page, gallery preview and rebuild prompt describe what actually exists.

Reject these shortcuts: koi as circles or featureless torpedoes; an opaque water surface hiding the fish; a static image passed off as interactive 3D; a sakura tree reduced to one pink sphere; a shrine replaced by a generic pagoda; a floating torii with no approach; copied or invented religious symbolism; broken `/assets/` links; a second unrelated gallery image; motion that cannot pause; or a fake booking success state.
