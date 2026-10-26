# Cullet: design spec

A fictional real-time material studio. Cullet Lab makes a browser tool for authoring glass (dispersion, transmission, refraction, roughness, a thin film) and exporting it as plain glTF with the KHR material extensions, USDZ, or a typed three.js module. Sketch is free, Studio is $24 a seat, Foundry is custom. Slogan: **Designed in glass.**

The hero was supplied as a standalone HTML/three.js file ("Cullet — Designed in glass", light mode). This template ports it faithfully and turns it into a full landing page.

## Requirements

```bash
npm i next react react-dom three lenis
```

Next.js 16 App Router, React 19, Tailwind CSS v4 (only `@import "tailwindcss"` and `@theme`; the page is written in prefixed `fc-` classes). Folder isolation: everything lives in `src/app/(cullet)/`. No photography: every visual is WebGL, SVG or CSS. `Picture` swaps in optional material renders once `npm run images -- cullet` has produced them (see Imagery).

## Concept

**Glass is cut, not drawn, so the page is a slab of frosted quartz cleaved along its cut lines.** The hero is the supplied slab: eleven extruded shards (three in the nav, eight in the panel) that tilt toward the pointer, lift and tip under it, drift slowly, and carry the page's text printed on their faces. Scrolling cleaves the slab: the shards fly apart along their own directions and the next chapter's title shows through the gaps. "Read paper" shatters it outright into a technical note; "Back" reassembles it. Further down, one piece of glass becomes a live sampler you tune by hand.

Brand vocabulary: plans are **cuts**, presets are **cuts** in the library (CU-152 …), a signup is a **seat**, the page chapters are numbered like a lab notebook.

## Palette

Eight colours, registered in `scripts/templates.config.ts`. Tints only through `color-mix()`.

| Token | Hex | Role |
|---|---|---|
| ink | `#0F1117` | text, the CTA pill, the Open slab |
| paper | `#F4F5F8` | the page |
| white | `#FFFFFF` | the glass, cards, sheets |
| slate | `#525866` | muted text (6.6:1 on paper) |
| mist | `#9AA1B2` | separators, hairlines, muted text on ink only |
| haze | `#DCE8FF` | the cool fill light, tints, error text on ink |
| cobalt | `#2563EB` | the one accent: links, focus, selection, chapter labels (4.8:1 on paper) |
| emerald | `#10B981` | rare: CTA hover, success, "live" dots |

`sampler/spectrum.ts` is palette-exempt: its six wavelength stops (650–420 nm) are optical content, used only where a ray has split (the dispersion diagram and the sampler's fan). WebGL colours are written as `0x…` numbers, the same values as the palette.

## Type

| Role | Face | Use |
|---|---|---|
| Display | Inter Tight 500/600 (`--font-fc-tight`) | section titles, term names, prices, the footer wordmark; tracking −0.03 to −0.05em |
| Body | Inter 400/500/600 (`--font-fc-inter`) | everything else, and the hero (the slab prints Inter, as the original does) |
| Mono | Geist Mono 400/500 (`--font-fc-mono`, `preload: false`) | chapter labels, codes, readouts, the glTF JSON |

Hero text is sized from the slab with container units (`cqw`/`cqh`), exactly as the original sized its canvas print from the panel: headline `clamp(38px, min(7.8cqw, 20cqh), 220px)`.

## Layout

1. **Hero** `#cullet`: a 230svh section with a sticky 100svh stage. The slab is inset `8.5svh 5.5vw` (16px on phones); nav band `max(48px, 10.8cqh)`, gap `max(8px, 0.81cqw)`, the panel below.
2. **Terms** `#terms` (Chapter 01): held for `5 × 78svh` on ≥960px; a rail of five terms beside a glass figure and its text. Stacked cards elsewhere.
3. **Studio** `#sampler` (Chapter 02): a white sheet with 32px top corners that slides over the held terms (`margin-top: −38svh`); stage 4:3 beside presets, dials and the glTF readout.
4. **Workflow** `#workflow` (03): three steps joined by a drawn line, each with a working surface (layers, renderer tiles, code).
5. **Materials** `#materials` (04): a white sheet whose top edge is a cut line; six swatch cards.
6. **Proof** `#proof` (05): four counted stats, a marquee of renderers that read the export, three studio notes.
7. **Pricing** `#pricing` (06): a monthly/yearly switch and three cuts.
8. **Open** `#open` (07): the ink slab with the seat form.
9. **Footer**: lockup, index, a giant wordmark with a cobalt cut through it.

A glass header arrives once the slab has cleaved.

## The mechanic

All of the geometry is pure and tested (`cut/cut.test.ts`).

- **The cut** (`cut/pattern.ts`): six edge points and six junctions in region units, each drifting `sin(2πt/p + φ) · 0.017`, and pushed away from a pointer within 0.48 by `(1 − d/0.48)² · 0.028`. `cellPolys()` makes the eight shards, which tile the panel exactly at any time and pointer. `navPolys()` cuts the nav into brand | links | sign in with two slanted cuts that sway ±0.007.
- **The glass** (`cut/geometry.ts`): each polygon is inset by half the gap (`7·s`, with `s = slabW / 1730`), its corners rounded with quadratic tangents (radius `20·s`, never more than 42% of an edge), then extruded `14·s` deep with a `3·s` bevel.
- **The print** (`hero/print.ts`): the DOM is the layout and the canvas is the ink. Every `[data-print]` element is drawn at its offset in its own computed font, letter-spacing and `--print` colours (hover and focus change those variables, so the print restyles too). Each shard's cap samples its slice of the print through UVs mapped to the whole region.
- **The DOM on the glass** (`cut/homography.ts`): the four projected corners of the nav and panel planes solve an 8-DOF homography, applied as a `matrix3d()` with `transform-origin: 0 0`. The real text stays transparent on top, so it can be selected and every link focused.
- **Motion** (`hero/engine.ts`): the page group tilts toward the pointer (rotateY `x·3.5° − 1.2°`, rotateX `y·2.75° + 0.8°`, smoothed with τ = 0.3s). The shard under the pointer lifts 50·s (nav 32·s) and tips up to 0.24 rad on a spring (k 170, c 19); its iridescence rises 0.65 → 1 and env intensity 1.15 → 2. A cobalt/rose blush follows the pointer in the fragment shader.
- **Cleave and shatter**: `cleaveFactor(c, i) = easeInCubic(range(c, 0.035i, 0.035i + 0.62))` for the scroll, `shatterFactor()` (ease-in out, back-ease in) for Read paper. `flight()` sends a shard `520·s·f` along its outward direction, `zImpulse·s·f` toward the camera, and (timed only) `640·s·f²` down. The cleave is `range(heroPin, 0.04, 0.82)`.
- **Poster first**: the same geometry is drawn as eleven HTML-positioned SVGs, so the page is complete before WebGL, without JS, under reduced motion, and on phones until "Light the glass" is tapped. The poster cleaves in CSS from the same `--cleave`.
- **The sampler** (`sampler/`): `params.ts` (tested) snaps the five dials, exports glTF (`KHR_materials_ior`, `_dispersion`, `_transmission`, `_volume`, `_iridescence`), converts dispersion to an Abbe number (`20 / d`), and computes the drawn fan (`bend = 34°·(ior − 1)`, `spread = 46°·d·(ior − 1)`). The WebGL gem is a 10-segment lathe in `MeshPhysicalMaterial` with transmission 1 in front of a striped studio card, and it takes the same numbers GLTFLoader would read.

## Motion

**Identity:** precise and physical. The verbs are **cleave** (diagonal clip-path wipes, shards flying apart along cut lines) and **settle** (spring lift-and-land, back-ease returns). **The signature moment** is the scroll-scrubbed cleave of the hero slab into Chapter 01.

**Tokens** (`@theme` in `cullet.css`):
- easings: out `cubic-bezier(0.22, 1, 0.36, 1)`, out-expo `cubic-bezier(0.16, 1, 0.3, 1)`, in-out `cubic-bezier(0.77, 0, 0.175, 1)`, in `cubic-bezier(0.55, 0, 0.9, 0.35)` (the shatter only: gravity), back `cubic-bezier(0.34, 1.45, 0.64, 1)`, spring `linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1)`;
- durations: 90 instant, 180 fast, 300 ui, 420 base, 800 slow, 1200 hero;
- reveal shift 28px; stagger 70ms.

**Motion map**

| Element | Enter | Scroll-linked | Hover / focus | Press / state | Exit / handoff |
|---|---|---|---|---|---|
| Hero slab | backdrop settles 1.08→1; poster settles from blur 8px; nav items drop at 150ms + 50ms each; headline rises through masks at 480/550ms; copy and CTAs from 750ms; the WebGL slab lifts and lands as it takes over | the cleave: shards fly out staggered from the nav down, text fades, the next title rises behind | page tilts to the pointer; shard under it lifts and tips; pointer blush; links print slate→ink, Sign in → cobalt, CTA pill → emerald, Read paper underline draws | CTA press .97; Read paper shatters (ease-in, 30ms stagger), Back reassembles (back-ease) | shards gone at cleave 1; the header arrives |
| Paper | lines rise 60ms apart; Back drops in with back-ease; the quartz sliver grows and wobbles | n/a (scroll locked) | Back → cobalt; sliver tips toward the pointer | Back press .96; Escape closes | reassembly; focus returns to Read paper |
| Header | drops in once the slab has cleaved | progress hairline; tucks away on scroll-down, returns on scroll-up | link → ink; cobalt indicator slides to the current section | CTA fill wipe + label roll; menu toggle bars morph to × | n/a |
| Phone menu | clip-path circle from the toggle (480ms); links stagger 55ms | n/a | n/a | Escape / link closes | focus returns to the toggle |
| Terms (held) | title mask-rise, eyebrow slide | each step: the figure wipes in on a diagonal cut, text lines rise (60ms apart), rays draw in order (`--d`); rail pill springs; meter fills | rail item → ink | rail click travels to the step | stage scales to .95 and dims as the studio sheet slides over |
| Terms (flow) | figure cleave-wipe, rays draw on reveal | n/a | n/a | n/a | n/a |
| Studio | sheet slides over the terms; title masks; frame scales in | sticky stage (≥1000px) | preset chips → haze; dial thumbs grow; copy button lightens | presets press .96; dial thumb press 1.0; JSON line flashes cobalt on change; copy turns emerald "Copied" | n/a |
| Sampler stage | poster → WebGL crossfade (800ms) | the gem turns slowly (ambient) | drag to turn, with inertia | dials bend and fan the drawn rays (600ms out, spring prism) | renders only while on screen |
| Workflow | steps scale-rise in a 70ms cascade; the connector draws (1.1s) | n/a | mock lifts 4px; layer rows slide 4px and tint | n/a | n/a |
| Materials | the sheet's cut edge levels as it enters; cards scale-rise in a cascade | `--enter` drives the cut | card lifts 6px, shadow fades in, pointer spotlight, swatch sheen sweeps, shard grows, siblings dim to .72, arrow slides | Open in studio loads the preset and travels to the sampler | n/a |
| Proof | stats rise, numbers count up, rules draw; notes scale in | marquee drifts (38s loop, pauses on hover, focus and off screen) | note lifts and tilts −0.4° | n/a | n/a |
| Pricing | title masks; cuts scale in | n/a | cut lifts 5px; toggle option → ink | toggle pill slides (300ms back-ease); prices roll in from below | n/a |
| Open (form) | title masks; panel cleave-wipes in | n/a | chips tint; inputs ring cobalt; labels float | invalid fields shake once and messages slide down; submit becomes "Cutting your seat…" with a turning square | the form cleaves away; a glass shard settles and an emerald tick draws; lines rise |
| Footer | the wordmark cleave-wipes in | n/a | links darken with a drawn underline | Back to the slab travels to the top | n/a |

Ambient life is capped at three: the slab's drift (hero only), the sampler gem's turn, and the marquee. Each pauses off screen and in hidden tabs.

**Reduced motion and no JS:** every hidden state is gated by `(prefers-reduced-motion: no-preference) and (scripting: enabled)`. The hero is a 100svh poster with nothing held, the terms are stacked cards with every diagram drawn, and neither WebGL engine mounts (tested). Transitions shrink to 120ms, opacity only. A `<noscript>` style reveals everything, and without JS the header is hidden (the slab's nav covers it) and Read paper is a link to the terms.

## Signature details

1. **Printed glass:** the hero text lives on the shards and is cut by the gaps, yet stays selectable DOM.
2. **The chapter rail:** numbered `01 / 05` terms with a sliding glass pill and a cobalt meter.
3. **Live readouts:** the sampler's frame time (measured from the renderer, or estimated in the poster), the Abbe number, and the glTF line that flashes as you turn a dial.
4. **Catalogue codes:** CU-152, CU-172 … engraved on the swatches.
5. **The cut line:** the slab's l1→J1 cleavage recurs as the materials sheet's top edge and the cobalt cut through the footer wordmark; reveals open on the same diagonal.
6. **`KHR_materials_dispersion`:** the hero's footer, the paper, the code sample and the colophon.

## Do / Don't

- Do keep the slab's geometry in `cut/` pure; both renderers (SVG and WebGL) read it.
- Do style the hero text through `--print`, `--print-bg` and `--print-line`; the print reads them.
- Do keep each printed element on one line (`white-space: nowrap`): the print draws single lines.
- Don't put hover-only information on the glass; touch gets the poster and a "Light the glass" opt-in.
- Don't add colours outside the palette; tints are `color-mix()`.
- Don't animate layout properties; the cleave is transforms and opacity, the wipes are clip-path.

## Files

```
src/app/(cullet)/layout.tsx              fonts, metadata, noscript reveal
src/app/(cullet)/cullet/
  page.tsx  cullet.css  DESIGN.md  PROMPT.md  icon.svg  opengraph-image.tsx  assets.tsx  assets.generated.ts
  brand/Logo.tsx                        Mark + lockup
  cut/geometry.ts  pattern.ts  homography.ts  cut.test.ts
  hero/Hero.tsx  Poster.tsx  HeroGlass.tsx  engine.ts  print.ts  bus.ts
  terms/Terms.tsx  TermRail.tsx  Diagram.tsx
  sampler/Sampler.tsx  SamplerPoster.tsx  engine.ts  params.ts  params.test.ts  spectrum.ts
  sections/Header.tsx  Studio.tsx  Workflow.tsx  Materials.tsx  LoadPreset.tsx  Proof.tsx  Pricing.tsx  Open.tsx  Footer.tsx  BackToTop.tsx
  forms/SeatForm.tsx  request.ts  request.test.ts
  content/copy.ts  materials.ts  content.test.ts
  motion/ScrollDirector.tsx  SmoothScroll.tsx  Reveal.tsx  CountUp.tsx  Magnetic.tsx  Marquee.tsx  Spotlight.tsx  useReducedMotion.ts  math.ts  math.test.ts  progress.ts  progress.test.ts
tests/e2e/cullet.spec.ts
docs/image-prompts/cullet.md
```

## Imagery

None required. Optional photographic material swatches (`material-<id>`, 16:10) can replace the drawn ones; see `docs/image-prompts/cullet.md`. Drop them in `assets/incoming/cullet/` and run `npm run images -- cullet`.
