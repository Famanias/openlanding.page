# LOAM — design spec

A landing page for **LOAM**, a fictional material biotechnology studio that **grows rigid protective packaging from living mycelium networks** and agricultural hemp hurd ("grown, not made"). It is a full-screen interactive 3D macro experience: **the mushroom is only the visible fruiting tip of a vast subterranean organism, so scrolling descends beneath the forest floor, revealing the glowing mycelium network that LOAM cultivates into custom molded packaging.**

Benchmark for complexity: why.zero.university. LOAM avoids copying its signatures: no entry gates, no progress rulers, no pinned join bars. Progress is smooth, continuous and completions happen naturally.

## Requirements

- Next.js 16.4 App Router (route group `(loam)` with its own root layout), React 19, TypeScript, Tailwind v4.
- Zero added dependencies: reuses existing repo packages `three`, `gsap`, `lenis`. Uses Web Audio natively for generative sound.
- **Renderer choice: `THREE.WebGLRenderer` (WebGL2).** Chosen because of custom GLSL post-processing passes (high-threshold bloom, organic film grain, dynamic lens blur, peripheral vignette) and standard shadow map support across all devices without requiring WebGPU device bindings.
- **Procedural Models:** The three hero objects (parasol mushroom, mycelium clump, molded packaging tray) are procedural interpretations of the 8 reference specimen photographs in `public/templates/loam/references/`. The clump is an artistic procedural approximation combining core substrate, fuzzy hyphae and wrapped rhizomorph cords. The tray faithfully reproduces the broken corner revealing the fibrous interior.
- **Scientific Honesty:** Parasol mushrooms (*Macrolepiota procera*) are saprotrophic decomposers, not mycorrhizal tree partners. The subterranean visuals link the mushroom to roots as artistic licence for scale, but LOAM copy strictly makes claims about LOAM's own commercial cultivation process (grown in ~7 days, home-compostable, mycelium + hemp hurd), never unverified claims about general forest ecology.
- **Accessibility & Fallback:** Server-rendered static "specimen sheet" (`StaticFallbackPage`) visible before JavaScript runs. With `prefers-reduced-motion: reduce`, disabled JavaScript, or WebGL initialization failure, the 3D engine never mounts and the specimen sheet is the complete page.

## Concept

| # | Chapter | Landing-page job | In the world | Inspectable |
|---|---|---|---|---|
| 01 | **The fruit** | Hook | One parasol mushroom on dark damp forest humus with drifting spore motes. "What you see is the smallest part." | **Parasol Mushroom** |
| 02 | **Under the cap** | Insight | Camera tilts beneath the gills; spores drift past lens. "A mushroom is only the fruit. The organism lives underground." | — |
| 03 | **Breaking ground** | Transition | Ant-farm soil cross-section descent: leaf litter, moss, root hairs, dark crumbly earth, pebbles and red clay. | — |
| 04 | **The network** | How it works | **4a:** Fist-sized mycelium clump close-up. **4b:** Scale shift pull-back; glowing foxfire filaments ignite and spread. Click to pulse. | **Mycelium Clump** (4a only) |
| 05 | **The material** | Product | Threads converge and resolve into molded packaging tray. Studio lighting lifts; supporting product family and 3-step lifecycle. | **Packaging Tray** |
| 06 | **Return** | Conversion | Camera ascends to forest floor; fairy ring of mushrooms has fruited. Sample-kit request form. | — |

## Palette

| Token | Hex | Role |
|---|---|---|
| loam | `#080604` | ground, dark soil background |
| spore | `#F0E8D8` | primary typography, mushroom flesh |
| cap | `#7A5C43` | umber scales, dried leaf litter |
| foxfire | `#C8E64C` | bioluminescent network accent, focus rings, buttons |
| sun-dusk | `#FF8A3D` | dusk sun ember |
| sun-morning | `#F7E7CE` | warm morning sunlight |
| sun-midday | `#F4F8FB` | bright midday sun |
| studio-paper | `#E6DCCB` | Chapter 05 cyclorama studio sweep |

Scene colours in `src/app/(loam)/loam/scene/` are exempt as content colours.

## Type

- Display: **EB Garamond** (Google Fonts variable `--font-serif`).
- Body: **Host Grotesk** (Google Fonts variable `--font-sans`).
- Monospace / utility: **Sono** (Google Fonts variable `--font-mono`).

## The mechanic (pure, tested mathematics in `logic/`)

- `progress p ∈ [0, 1]` driven by Lenis smooth-scroll over a 750vh track scrubbed by GSAP ScrollTrigger.
- Chapter 04 has two distinct rest points: `REST_POINT_4A = 0.52` (close on clump) and `REST_POINT_4B = 0.66` (wide network).
- Hold-to-Inspect: ~350ms pointer hold engages smooth quaternion rotation with inertia; releasing springs smoothly back to rest pose.
- Keyboard inspect: Dedicated accessible button in overlay UI; Enter enters inspect mode, arrow keys rotate specimen, Escape exits.
- Time-of-day slider: Synchronizes sun elevation angle, color temperature, tone mapping exposure, and CSS custom properties across 0.0 (dusk) to 1.0 (midday).

## Motion

- **Personality:** organic, subterranean, reverent, grounded.
- **Verbs:** descend, ignite.
- **Signature moment:** Chapter 04 scale shift where glowing mycelium filaments ignite across the subterranean dark and click interactions send light pulses to distant mushrooms.
- Tokens in `loam.css` (`--ease-out`, `@keyframes sproutPush`, `@keyframes capOpen`).
