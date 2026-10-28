# LOAM landing template design

## Intent and the why

LOAM is a fictional company that **grows materials from mycelium**: packaging, panels and other goods grown rather than manufactured. The template is the gallery's second "experience-grade" page after LOWTIDE. The user's complexity benchmark is still why.zero.university: a full-screen WebGL world you play rather than read. LOAM must reach that level of animation and interaction **without copying the benchmark's structure, gestures or signature moments**, and without repeating LOWTIDE.

Where LOWTIDE was about a *place* (a shoreline), LOAM is about an *object*. The page opens on one mushroom, and scrolling transforms how you see it.

**The central idea: the mushroom is only the visible tip of something far bigger, so the page starts on one mushroom and scrolling takes you underneath it, revealing the hidden network that LOAM turns into material.** The transformation is a shift in scale: one small object → a whole hidden system → a finished product grown from it.

The user's own requirement, central to the page: **every hero object can be inspected from all sides with press-and-hold, then drag**, not only the opening mushroom.

## Goals

- One full-screen three.js world with a thin DOM overlay. It feels like an experience, not a page of sections and cards.
- Every landing-page job still happens inside the world: hook, insight, how it works, product, conversion.
- Three detailed, inspectable 3D objects (mushroom, mycelium clump, finished material), built from the user's reference images with **img2threejs**.
- Complexity on par with the benchmark: custom shaders, GPU particles, a procedural glowing network, post-processing, a morph from network to product, generative audio.

## Non-goals

- **No performance, Lighthouse, speed or responsiveness testing.** The user waived these for heavy 3D templates (as with LOWTIDE). It must still render and every interaction must work.
- No real backend: the form validates locally and shows success without a network call.
- No rigged/skinned models, no downloaded model packs, no baked camera paths.
- No brand board (the user skipped that gate for LOWTIDE; this document's "Look" section is the brand source of truth).

## Anti-goals (a failure even if it works)

| Don't | Why / instead |
|---|---|
| Press-and-hold **gates** between chapters (benchmark signature) | Hold-to-inspect is optional and never blocks scrolling or progress. The page is fully completable without ever inspecting anything. |
| Draw-a-shape entry gate, top progress ruler, XP counter, pinned "Join Beta" bar, explorable-map finale (benchmark signatures) | None of these. See "Navigation" and "Finale". |
| Look like **Bathys** (vertical dive with depth/pressure telemetry readouts) | The descent is one short chapter. No depth meters, no telemetry numbers. The story is about **scale**, not depth. |
| Look like **LOWTIDE** (dark world, lantern cursor, stillness reveals, plankton numbers, moon dial) | No lantern mask, no stillness mechanic, no particles-to-numbers, no dial. Different palette and fonts. |
| Look like **Noctiluca** (bioluminescence as a pretty room) | The glow here is a functional network you send pulses through, not ambient decoration. |
| Fairy-tale / cottagecore mushrooms (red-and-white fly agaric, gnome-forest whimsy) | Grounded, macro-photography realism. |
| Cheap orbit-controls feel when inspecting (jumpy, gimbal-locked, snaps) | Inspection must feel like turning a real specimen in your fingers: weighted, smooth, eases home. |

## Constraints (decided)

- New gallery template following `skills/create-landing-template/`: folder layout, isolation, the six registration points in `repo-wiring.md`, and the known gotchas (hard-coded template counts in tests, palette-guard hex lookalikes, preview image + gallery clip + copy bundles). Slug/route: `loam` → `/loam` (my call; the name can change).
- Next.js 16.4 App Router, React 19, TypeScript, Tailwind v4. Read `node_modules/next/dist/docs/` before touching Next APIs (AGENTS.md).
- **Models are built with img2threejs** (user decided) from the user's reference images in `D:\downloads\New folder (14)\mushroom\`. Copy them into the scratch folder `.openlanding-page/loam/references/` before starting; don't commit the originals.
- **Hold-to-inspect on every hero object**, including the ones further down (user decided).
- The six-chapter story below (user approved).
- **Environment textures (my call):** img2threejs covers only the three inspectable objects. For the forest floor, moss, leaf litter, soil layers, roots and environment lighting, CC0 textures/HDRIs (e.g. Poly Haven, ambientCG) or AI-generated texture plates are allowed alongside procedural shaders. Credit every source in DESIGN.md and commit the files, downsized, under `public/templates/loam/`. Downloaded *model* packs remain off-limits.
- **Scientific honesty (my call):** the parasol is a decomposer, not a tree partner, and "fungi share resources between trees" is disputed. The network visuals may link the mushroom to roots as artistic licence, but the copy only makes claims about LOAM's own process, not about how forests work. Say so in DESIGN.md.
- **AI Studio starting point (possible):** the user may generate a first pass of the scene in Google AI Studio and hand it over. If they do, port and improve it rather than starting fresh: swap its models for the img2threejs versions, and bring its code into the repo layout and this spec.

## The reference images (provided by the user)

| File | Object | Notes |
|---|---|---|
| `mushroom-front.png` | Parasol mushroom (*Macrolepiota procera*) | Authority for proportions: flat cap with dark central umbo, concentric brown scales on cream, gill edge, double-edged movable ring, snakeskin-banded stem, mossy bulbous base. |
| `mushroom-side.png` | same | Almost identical to the front view. Acceptable because the mushroom is radially symmetric. |
| `mushroom-from-below.png` | same | Gills radiating from the stem, underside of the ring. The cap reads slightly wider here; trust the front view for proportions. |
| `mushroom-from-above.png` | same | Full cap scale pattern (concentric rings of scales, densest near the umbo). |
| `mycelium-clump-front.png`, `mycelium-clump-back.png` | Fist-sized mycelium clump | Thick cream rhizomorph cords over cottony hyphae, wood-chip and soil fragments, loose trailing strands. |
| `material-top.png`, `material-underside-and-cut-edge.png` | Molded mycelium packaging tray | Rounded-rectangle tray with recessed cavity and lip, matte cream, fibre speckles, one broken corner exposing the fibrous interior. |

Expected img2threejs approach (builder confirms per its pipeline): the mushroom is lathe/profile geometry + instanced cap scales + gill fan, with **projection-first texturing** from the reference photos for cap, stem and base. The clump is the most approximate (procedural cords as tubes plus a fuzz shell), so state that in DESIGN.md. The tray is straightforward; **keep the broken corner**, because it rewards inspection.

## Experience

### Form

- Full-viewport fixed `<canvas>` (three.js) with a thin DOM overlay: wordmark (small, corner), chapter marker, sound toggle, inspect hint/labels, and the conversion UI.
- Native scroll over an invisible tall track, smoothed with **Lenis**; **GSAP ScrollTrigger** scrubs one master timeline from progress `p ∈ [0, 1]`. All scene state is a pure function of `p` plus live inputs (pointer, inspect state). Scrolling is never blocked except while an inspection is held.
- Snap to chapter rest points when scrolling stops, so the page never strands mid-transition.

### The story (user approved)

| # | Chapter | Landing-page job | What happens | Inspectable |
|---|---|---|---|---|
| 1 | **The fruit** | Hook | One parasol mushroom on a dark, mossy forest floor in close macro framing (shallow depth of field, drifting spore motes). Brand name and one line. | **Mushroom** |
| 2 | **Under the cap** | Insight | Camera tilts up beneath the gills; spores fall past the lens. Copy: what you see is only the fruit; the organism is underground. | — |
| 3 | **Breaking ground** | Transition | Camera sinks through the layers: leaf litter, moss, roots, dark earth. Short, one chapter only (see anti-goals on Bathys). | — |
| 4 | **The network** (signature moment) | How it works | Mycelium threads ignite and spread outward from the mushroom's base, linking other fruiting bodies and tree roots. The camera pulls back until the first mushroom is a speck: the scale shift. Pointer interaction sends pulses (below). | **Mycelium clump** |
| 5 | **The material** | Product | Threads gather, braid and compress into LOAM's molded tray. Properties appear as labels. | **Tray** |
| 6 | **Return** | Conversion | Camera rises back to the surface; new mushrooms have fruited around the first. Sample-kit request form. | — |

### Hold-to-inspect (the user's requirement)

- **Gesture:** press and hold on the object (~350 ms, a ring fills around the pointer to show the hold registering), then drag to turn it freely: yaw all the way round, and pitch far enough to see the top and the underside (gills, base, tray bottom). Rotation uses quaternions (no gimbal lock) with weight and slight inertia.
- **Release:** the object eases back to its rest pose (spring) and scrolling resumes.
- **While held:** Lenis is stopped (no accidental scroll), the background dims slightly, the depth of field focuses on the object, and **labels pin to parts** and track them as the object turns, hiding when that part faces away. Examples: mushroom: *cap scales*, *umbo*, *gills*, *ring*, *stem*, *base*; clump: *rhizomorph cords*, *hyphae*, *substrate*; tray: *grown surface*, *fibre core* (at the broken corner), *lip*.
- **Hint:** a small "Hold to inspect" cue near each inspectable object when its chapter is at rest. It fades after the first successful inspection.
- **A quick press without holding** does nothing special. A plain swipe or scroll on touch still scrolls the page.
- **Touch:** long-press triggers inspect. Suppress the context menu, text selection and callout on the canvas only during the hold.
- **Keyboard:** each inspectable object has a focusable button in the overlay ("Inspect the mushroom"). Enter toggles inspect mode, arrow keys rotate, Escape exits. The labels are also listed in that button's accessible description.
- Inspecting never gates progress (anti-goal).

### Chapter 4 has two rest points (user approved)

1. **Close: the clump.** The chapter opens close on the fist-sized mycelium clump, which is inspectable here (and only here).
2. **Wide: the network.** Scrolling on, threads ignite and spread out of the clump while the camera pulls back to the wide shot, where the first mushroom is a speck. Pulse-sending works here. Holding on the clump and clicking the network never share a frame, so the two inputs don't compete.

### Chapter 4 network interaction

- The network is a procedurally grown graph (seeded, deterministic, so it can be tested), rendered as glowing tubes/lines with a pulse shader.
- **Pointer near threads** brightens them locally. **Click/tap on the network** sends a light pulse that travels along the graph outward from that point. When pulses reach other mushrooms, those mushrooms glow briefly. This shows that it's one connected organism without a diagram and without making scientific claims.
- The glow spreads with scroll progress through the chapter (growth front driven by `p`).

### Chapter 5 morph

- The network's threads converge into the tray's shape (e.g. sample points on the tray surface as particle/thread targets), then a solid tray resolves out of the threads. Scroll-scrubbed and reversible.
- Labels (fictional product facts, keep consistent everywhere): grown in about **7 days**, **home-compostable**, made from **mycelium + hemp hurd**, **drop-tested** to protect fragile goods, **custom moulds** for any shape. Any real-world claim about mycelium in general (e.g. compost times) must be cited in DESIGN.md or worded as LOAM's own spec.

### Finale and conversion (chapter 6)

- New mushrooms have fruited in a ring around the original: the network made visible above ground.
- **Request a sample kit** form: name, work email, company, what you'd use it for (packaging / panels / something else), optional note. Local validation, loading state, choreographed success (e.g. a small mushroom pushes up through the soil next to the form, with "Something's growing."). No network.

### Navigation

- A small chapter marker in one corner (chapter number and name), never a top progress ruler. Arrow keys / Space / Shift+Space step between chapter rest points, without stealing keys from focused controls.

### Sound (my call)

Off by default; a corner toggle turns it on. Generative with **Tone.js** (already a repo dependency from LOWTIDE): quiet forest-floor ambience above ground, muffled low drones underground, soft tonal blips when pulses reach mushrooms in chapter 4, a dry crunch/settle when the tray forms.

## Look (my calls, builder may refine)

- **Mood:** damp, close, macro, a little reverent; a natural-history specimen under warm light that turns into a living glow underground.
- **Palette direction:** warm loam black (ground), spore cream (text, taken from the mushroom flesh), cap brown (muted), and **foxfire**: the green-gold glow real bioluminescent fungi give off, the single accent for glow, focus rings and buttons. Exact hexes are the builder's, but must pass the palette guard and must not reuse LOWTIDE's plankton `#8FD3FF`, Bathys's `#00E5FF`, or Noctiluca's / Satoyama's tokens. Scene-only colours go in `paletteExempt` as appropriate.
- **Type:** display, body and utility faces not used anywhere else in the gallery. If in-world 3D text is used, it needs TTF/OTF files self-hosted under `public/templates/loam/fonts/` (troika-three-text constraint, as in LOWTIDE).
- **Post:** bloom (network glow), film grain, depth of field (macro feel above ground, focus pull during inspect), subtle vignette.
- Logo (wordmark + mark), OG image and favicon are the builder's, within this direction.

## Accessibility and fallbacks (my calls, from the repo quality bar)

- **Reduced motion / no JS / WebGL failure:** the 3D engine never mounts (prove with a test). Render a finished-looking static "specimen sheet" page instead: the user's reference photos as specimen plates (processed and committed under `public/templates/loam/`), every chapter's copy in order, the product facts, and the form.
- With the experience running: a visually hidden DOM mirror holds all chapter copy, with `aria-live="polite"` announcing the chapter on settle. One `h1`. Sound toggle, inspect buttons and form controls are real buttons/inputs with visible focus.
- No entry gate; the engine boots on load.

## Testing (same scope as LOWTIDE)

- Unit tests (TDD) for pure logic: progress → chapter and rest points; snap target; hold-detection timing state machine (press → holding → inspecting → release, with cancel on early move/scroll); inspect rotation clamping and ease-back; label visibility from part normal vs. camera; seeded network growth (deterministic, connected, reaches the target mushrooms); pulse propagation along the graph; form validation.
- E2E `tests/e2e/loam.spec.ts`: page loads and the canvas mounts; keyboard chapter stepping; keyboard inspect (Enter, arrows, Escape); form validation and success; reduced motion renders the specimen sheet with all copy and no canvas.
- Repo checks: `npm run check`, `npm test`, `npx tsc --noEmit`, Playwright suites (including shared gallery specs after count bumps).
- **Not tested:** Lighthouse, performance, responsiveness (waived).

## Left to the builder

- Exact img2threejs pipeline runs, spec files and accepted fidelity per object (state any approximation in DESIGN.md).
- Renderer choice: WebGL vs `three/webgpu`. LOWTIDE chose WebGL because of GLSL-only helpers; choose whatever the img2threejs output and the effects need, and note the reason.
- Network growth algorithm, pulse shader, particle counts, post stack, camera path, and timeline timings.
- Final copy, within the story and product facts above.
- File decomposition within the repo-wiring layout.
