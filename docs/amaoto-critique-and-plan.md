# AMAOTO — Critique and Implementation Plan (agent handoff)

Template: `src/app/(amaoto)/amaoto/` (route `/amaoto`). Reviewed from source, the four reference photos in `assets/incoming/amaoto/ref/`, and three user screenshots (hero, 02 translucency, 05 your umbrella). The review was static: no browser run, no detector run. Nothing has been implemented yet. Every finding cites a file and line so it can be verified before it is fixed.

---

## 0. Handoff brief (read first)

### 0.1 Goal

Turn AMAOTO from "a prop parked behind a page" into a page the umbrella leads from header to footer: a convincing procedural wagasa that opens like a real one, travels through every section with the sections laid out around it, over layered painted backgrounds, with real motion for every interaction (not fade in/out).

### 0.2 Decisions already made by the user (do not re-ask)

1. **Hero starts with a closed umbrella** that unfurls (see §6.2).
2. **Optional rain sound toggle**, off by default (see §6.6).
3. **Mobile: sticky model band** above the text, not a faded ghost and not removed (see §6.2, step 5).
4. **Full plan**, all phases below, in order.

### 0.3 Repo and environment constraints

- `AGENTS.md` at the repo root says this Next.js (16.4.2) has breaking changes: **read the relevant guide in `node_modules/next/dist/docs/` before writing any Next code**. Heed deprecation notices.
- Windows machine. Run node tooling in PowerShell, not Bash. Quote comma-separated arguments. A worktree may have no `node_modules` of its own: **never delete a worktree's `node_modules`**; run tools via the parent install.
- Dependencies already present and used by sibling templates: `three@^0.186`, `gsap@^3.15`, `lenis@^1.3`. Do not add new runtime dependencies without a strong reason. Copy the `SmoothScroll.tsx` pattern from a sibling (for example `src/app/(chinagraph)/chinagraph/motion/SmoothScroll.tsx`).
- The template is copyable and isolated: keep source inside `src/app/(amaoto)/amaoto/`. The only Three.js client leaf stays in `scene/`.
- Brand palette is fixed (from `DESIGN.md`): sumi `#1A1613`, washi `#F4ECDD`, sakura `#F2B8C6`, deep sakura `#D9748F`, vermilion `#C8412B`, gold `#B8923A`, indigo `#2B3A55`. Type: Shippori Mincho, Zen Kaku Gothic New, DM Mono. The repo's palette guard flags hex look-alikes: new SVG and shader colours must be these exact values or derived with `color-mix()`. Do not change brand, fonts or copy except where a phase says so.
- Reduced motion must keep every section readable and the scene still; no-JS must keep content visible (existing `<noscript>` rule).
- **Do not** run Lighthouse, speed or responsive-performance checks on this template (user preference for three.js/GSAP experience templates). Verification is visual (screenshots at defined states), unit tests for the rig, and the existing e2e spec.
- Do not commit or deploy unless asked.

### 0.4 Definition of done

- Hero frame 0 is a believable closed wagasa; it unfurls on a staggered wave; every later state (half-open, open, exploded, underside, closed-at-rest) matches the reference photos in silhouette and detail.
- No floating hoop, rings or knots in any state. Rim, knots and lacing move with the ribs by construction.
- The umbrella changes pose, camera and screen position per chapter and never sits behind interactive content (desktop or mobile).
- Sun angle, rain, parts list and colourway visibly change the 3D scene. No control is decorative.
- Every interactive element and every reveal in §6.5 has its own motion; the only generic fade-up is gone.
- Reduced motion and no-JS behave as described in §6.5.
- Rig unit tests pass; `tests/e2e/amaoto.spec.ts` updated and passing; gallery/registration tests still pass; docs and copy bundles regenerated.

---

## 1. Verdict

The idea is good ("the umbrella opens like a flower as you scroll, each chapter reveals one making decision"); the palette, type and copy are coherent. The execution does not deliver it, and all three user observations (plain background, no real motion, poor/static umbrella) share one root cause: **the umbrella was built as a background decoration, not as the protagonist the page is choreographed around.**

- The model is a blockout prop: `model/spec.json` still has `currentPass: "blockout"`, `completedPasses: []`, every component `fidelityTier: "blockout"`.
- Its parts are not geometrically tied together.
- It is parked in a fixed corner while the page scrolls past it.
- Backgrounds are flat fills.
- The only motion is a 24px fade-up.

## 2. What to keep

- Brand system (palette, type pairing) and the copy voice ("Forty ribs, one breath." etc.).
- The `setOpen(0..1)` / `setExplode(0..1)` abstraction as the public pose API.
- `model/runtime.ts` + its test as a pattern (small, pure, tested).
- Pure local form validation, `<noscript>` fallback, labelled canvas, focus-visible styles.

---

## 3. Critique: the 3D umbrella

### 3.1 What the three screenshots show, and why

| Screenshot | What the user sees | Root cause (file:line in `model/createWagasaModel.ts` unless noted) |
|---|---|---|
| **Hero** (closed, `open = 0`) | A pole with a huge cream hoop floating around its top, a black circle inside it, and a ring of small gold loops. The "umbrella" is a coin-sized disc at the hub. | Closed pose is not a closed umbrella. The **rim torus** (`:201-205`, radius 2.05, y 2.47), **thread ring** (`:287-290`, radius 1.15) and **rib node loops** (`:263-266`, radius 1.18) are placed once and **never touched by `update()`** (`:296-323`). Only canopy, ribs and stretchers collapse. Ribs shrink to radius 0.32 but stay **horizontal** (`:302`); the reference closed state (`wagasa-closed-side.png`) is a tapered pleated cylinder with ribs hanging down the shaft. |
| **02 Translucency** (the best-looking) | Cream dome with the pink motif, ringed by a detached hoop, black dots outside the paper edge, and a black circle drawn across the paper. | Paper edge at full open is y ≈ 1.91 (`updateCanopy`, `:162-168`: `2.48 - 0.52 - 0.05`). Rim torus is hard-coded at **y 2.47**, rim knots (`:283-285`) at 2.47, thread ring at 2.5: all about 0.55 units above the paper. It looks best only because the paper is the biggest, most legible shape. |
| **05 Your umbrella** | Ribs fan out like wheel spokes on top of the paper, loops hover on them, a red lump shows under the dome, hoop floats, form card overlaps the canopy. | Ribs are straight tubes at y ≈ 2.40 (`:302`) while paper sags to 1.91 at the edge: **ribs protrude through the paper**, a failure mode `spec.json` itself lists. Ribs have no bow (another listed failure: "straight spokes without bow"). The red lump is the dark-wood runner seen through thin paper. Overlap with the form is a layout problem (§4.3). |

### 3.2 Structural problems, ranked

1. **No shared kinematic model.** Ribs, stretchers, canopy, rim, thread, nodes and runner each compute positions from different hard-coded numbers (hub is 2.44 / 2.48 / 2.50 / 2.52 depending on the part). No hinge exists, so nothing stays attached while it moves.
2. **Opening is a scale, not a mechanism.** `lerp(0.32, 2.05, open)` on rib radius. A wagasa opens by ribs **rotating about the hub** from hanging (θ ≈ 0°) to a shallow dome (θ ≈ 70–78°) while the runner **slides up the shaft** pushing the stretchers. Here the runner moves 0.62 units and ribs never rotate: it inflates like a disc instead of unfurling.
3. **Closed pose missing.** `spec.json` `overall-silhouette`: "closed state reads as a tapered pleated cylinder". Not implemented, and the hero is the closed pose, so the first and most important frame is the worst.
4. **Paper is a separate disc, not a skin over the ribs.** One radial grid (`makeCanopyGeometry`, 12 rings × 40 radial) with radius lerp and a sine pleat hack. No stretch between ribs, no scalloped edge between tips, no concave gores, no seams, no folding on close.
5. **Detail far below the reference photos.** Photos show lathe-turned cap and handle beads, woven hub collar, diamond thread lacing under the canopy, black lashing knots at every rib tip, bamboo node bands on each rib, sakura **branches with blossoms** in every gore. The model has cylinders, tori and 36 identical five-ellipse "flowers" on a ring (`makeCanvasTexture`, `:44-65`).
6. **Flat lighting, no environment.** One directional + hemisphere + point light, no env map. `renderer.shadowMap.enabled = true` (`scene/WagasaCanvas.tsx:26`) but **no mesh sets `castShadow`/`receiveShadow`**, so shadows do nothing. No ground or contact shadow. Paper uses `transmission: 0.08` plus a small shader tweak; the warm backlit look of `wagasa-underside.png` is not achieved.
7. **Per-frame waste that blocks smooth motion.** `tick()` (`WagasaCanvas.tsx:51-60`) calls `setOpen`/`setExplode` every frame regardless of change, and `update()` **disposes and recreates 80 CylinderGeometries** each call (`createWagasaModel.ts:300-315`). `setCanopy` (`:330-336`) builds a new 1024² texture and material per colourway click without disposing the old ones.
8. **Dead controls.** `AmaotoShell.tsx` passes `angle` only to `Light`; no 3D code reads it, so the "Sun angle" slider does nothing. "Rain on the roof" only toggles a CSS stripe overlay (`amaoto.css:21`). `selected` part in `Structure` is never consumed by the canvas (it has no `selected` prop); canvas clicks set `selected` but nothing highlights. Copy says "Pull the runner…" and there is nothing to pull. These are false affordances.
9. **Reduced-motion contradiction.** `DESIGN.md` says reduced motion "keeps the scene still", but `WagasaCanvas.tsx:57` spins the model unconditionally (`rotation.y += 0.0018` per frame, so also frame-rate dependent) and scroll still drives open/explode.

### 3.3 Why it feels static even when it moves

- One pose forever: fixed camera `(4.8, 3.1, 9.4)`, fixed root tilt `rotation.x = 0.55` (`createWagasaModel.ts:178`), fixed screen rect (`.am-canvas { inset: 8vh 4vw 0 34vw }`, `amaoto.css:19`).
- Scroll maps only `open` (0–18%, hold to 72%, ease to 0.78) and `explode` (20–52%) (`AmaotoShell.tsx:22-23`). After 52% the umbrella only spins. Sections 03, 04, 05 have no relationship to it.
- Colourway change swaps the material instantly, at the one moment the user directly manipulates the object.

---

## 4. Critique: layout, background, motion

### 4.1 Background is plain

- `.am-page` is one radial gradient; each `.am-section::before` is a **single flat fill** (`--am-section-background`). Sections are hard-edged rectangles: cream, pale pink, indigo, pale pink, cream, indigo.
- The brand world is unused: washi fibre, sumi wash, Nagano ridgelines (Kurokawa is mountain country), rain, bamboo, sakura, seigaiha / asanoha patterns, hanko marks, vertical brush kanji. Only one vertical line of kanji and a 52px hanko appear, in the hero.
- Stage `wash` is an 8% indigo gradient; "rain" is a repeating-linear-gradient at 25% opacity that reads as a test pattern.

### 4.2 Motion is one effect

| Thing | What it does today |
|---|---|
| Every direct child of every section (`amaoto.css:87`) | `am-rise`: opacity 0→1 and translateY(24px) on a `view()` timeline |
| `.am-button` | `translateY(-3px)` hover, `scale(.97)` active |
| Header nav links | 1px underline slide |
| Active swatch | `translateX(10px)` |
| Thread line | width follows scroll |
| Header counter | text swaps, no easing |

Missing: text reveal choreography, number motion, hover states on rows and cards, press feedback, form micro-interactions, section transitions, header behaviour, cursor feedback, any link between DOM and the 3D object. `html { scroll-behavior: smooth }` only affects anchor jumps. `gsap` and `lenis` are dependencies and used by about 15 sibling templates; AMAOTO uses neither.

### 4.3 Layout collides with the object

- The canvas is fixed in the right two thirds and **every section's second column is also on the right** (Light controls, Canopy swatches, Making list, Commission form), so the umbrella always sits behind interactive content. Screenshot 05 shows form labels crossing ribs and the CTA across the canopy; screenshot 02 shows the control panel over the handle.
- On mobile (`amaoto.css:88`) the canvas is `opacity: .46; scale(.82)` behind text: the hero object becomes a ghost.
- Each section is a generic two-column grid, so the model cannot be part of the layout.

### 4.4 Smaller items

- Structure copy promises an interaction that does not exist ("Pull the runner").
- Three fonts have `preload: false` (`layout.tsx`) with an `h1` up to 10rem: expect a font-swap shift. Check and mitigate with `size-adjust`/fallback metrics or `display` choice.
- The header counter ("00 / 40 ribs open") is the only live status and reads as decoration. Keep it but make it real (driven by the rig).

---

## 5. Design direction

**One scroll timeline owns everything**: umbrella pose (position, rotation, scale, open, explode), camera, lights, background scene, rain level. Each section is a scene the umbrella acts in; DOM content is laid out around where the umbrella is, not on top of it.

### 5.1 Signature moments

1. **Hero unfurl.** Frame 0 is the closed, hanging wagasa under light rain. It unfurls on a **staggered wave** (rib 0 leads, each next rib follows by a few ms) so the paper blooms around the circumference rather than inflating.
2. **Anatomy.** Umbrella explodes, camera swings under it, leader lines draw from list rows to the 3D parts.
3. **Light.** Umbrella lifted overhead, camera looks up through the paper; the sun slider moves a real light, backlights the paper and throws rib shadows onto the washi.
4. **Canopy.** Umbrella spins on its shaft; changing colourway is a radial dye bleed across the paper from the click point.
5. **Making.** It disassembles into bamboo parts as the steps scroll, and is rebuilt by the end.
6. **Commission.** It closes, tilts and rests at the left edge; the form never overlaps it. Footer: a drip, a ripple, a hanko stamp.

### 5.2 Choreography table (starting values; tune in build)

| Chapter | Umbrella pose | Camera | Layout | Background scene | Rain |
|---|---|---|---|---|---|
| Hero | closed → staggered unfurl, tilted 3/4, large | slow push-in | model right, copy left | misty Nagano ridge layers, low sun disc behind canopy, vertical brush kanji | light |
| 01 Anatomy | open then explode, slow turn | orbit to underside | model left, parts list right | washi + drafting lines, asanoha pattern, hairline annotations | off |
| 02 Light | raised overhead, canopy facing camera | low angle looking up | model centre-top, controls bottom | indigo night, moon, ink clouds | on, driven by toggle |
| 03 Canopy | rotates on shaft, tilt follows hover | medium, orbiting | model right, swatches left | pale sakura wash, drifting petals, dye blots | off, petals |
| 04 Making | disassembles; step N highlights its part | slow dolly along shaft | model sticky left, steps right | bamboo grove silhouettes, paper fibres, ink marks | off |
| 05 Commission | closes, rests tilted at left edge | settles | model left, form right (no overlap) | deep indigo dusk, puddle reflection | fades to drip |
| Footer | closed, hanging, one drip | static | centre | ink black, ripple | single drops |

---

## 6. Implementation plan

Do the phases in order. Phases 4 (backgrounds) and 6 (docs) can run in parallel with Phases 2–3 once the director exposes a progress value.

### 6.1 Phase 1 — Rebuild the model (foundation)

New or changed files: `model/rig.ts` (new, pure), `model/createWagasaModel.ts` (rewrite), `model/lathe.ts` (new), `model/materials.ts` (new), `model/runtime.ts`, `model/runtime.test.ts` (extend or replace with `rig.test.ts`).

- [ ] **1. `rig.ts` kinematic solver (pure, unit-tested).** One `HUB_Y` constant used by every part. Input `open`, `explode`; output rib angle `θ(open)` (≈ 0° closed to ≈ 72–78° open), per-rib frame, stretcher endpoints, runner height, rim and knot positions, paper control points. Linkage rule: stretcher length `L` fixed and attached at distance `a` along each rib; runner on the shaft axis satisfies `L² = (a·sinθ)² + (P.y − y)²` with `P.y = hubY − a·cosθ`, so runner travel is physically consistent with rib rotation (runner rises as the umbrella opens, matching the reference photos: collar low when closed, near the hub when open). Add a per-rib `delay` input so the hero can animate a wave: `openᵢ = clamp01((open − delayᵢ) / (1 − spread))`.
- [ ] **2. Ribs.** 40 bowed ribs (sample a quadratic/Catmull-Rom curve in 6–8 segments) rotating about the hub; `InstancedMesh` for ribs, stretchers, node bands and tip knots, with matrices mutated in place. Never recreate geometry per update.
- [ ] **3. Paper skin from ribs.** Each gore stretches between neighbouring rib curves; slight concavity; scalloped edge between tips; **rim loop = closed spline through rib tips** (removes the floating hoop by construction). Closed pose folds gores into the tapered pleated cylinder from `wagasa-closed-side.png`. Mutate vertex buffers in place. Offset the skin outward by a small constant so ribs sit under it (avoid z-fighting and the "ribs poke through" failure).
- [ ] **4. Turned parts.** `LatheGeometry` profiles for top cap, handle (stepped beads, rounded end cap) and runner collar with woven hub ring; shaft with node bands. Overlap adjacent parts by ≥ 0.02 world units at seams (spec rule).
- [ ] **5. Underside lacing.** Diamond thread lattice (two instanced ring families) visible from below, per `wagasa-underside.png`; black lashing knots at every rib tip.
- [ ] **6. Materials.** Paper: motif painted **per gore** (branch + blossoms, not a ring of identical stamps), fibre noise as separate roughness and bump maps (do not reuse albedo), translucent shader with an explicit backlight uniform and different front/back response. Prefer the custom backlight shader plus alpha over true `transmission` (extra render pass). Bamboo: grain and node darkening via canvas textures + bump. On colourway change, dispose old material and texture.
- [ ] **7. Stage.** Procedural PMREM environment (no downloads), key + rim + fill, contact-shadow plane or blob, real `castShadow`/`receiveShadow`, delete the point light.
- [ ] **8. Pose API.** Keep `setOpen`, `setExplode`, `setCanopy`; add `setPose({position, rotation, scale})`, `setHighlight(partId | null)`, `setSun(angle)`, `setSpread(openWaveSpread)`. Keep `userData.sculptRuntime` or replace it with a typed handle returned by the factory (update `WagasaCanvas.tsx` accordingly).
- [ ] **9. Update `spec.json`** honestly (`completedPasses`, `fidelityTier`) as passes are reviewed.

Acceptance:
- At a camera matched to each reference photo (open 3/4, underside, closed side, handle detail), the model reads as the photo in silhouette and detail.
- None of `spec.json`'s listed failure modes remain (ribs protrude through paper, straight spokes, generic cone, flat opaque canopy, floating blossom geometry).
- Rig tests: rim distance to every rib tip is 0 for `open ∈ [0,1]`; runner within shaft range and monotonic in `open`; stretcher length constant within tolerance; no rib above the paper surface; closed pose radius ≤ closed-side photo proportions.
- Screenshot check at `open = 0, 0.25, 0.6, 1` and exploded, top and underside views.

### 6.2 Phase 2 — Scroll director (the umbrella follows the page)

New or changed files: `scene/ScrollDirector.tsx` (new), `scene/director.ts` (keyframes), `scene/AmaotoShell.tsx`, `scene/WagasaCanvas.tsx`, `amaoto.css`, each section component (add `data-stage-anchor`).

- [ ] **1. One scroll source.** GSAP ScrollTrigger + Lenis, using the sibling `SmoothScroll.tsx` pattern. Remove the `requestAnimationFrame` loop in `AmaotoShell.tsx:21` that calls `setProgress` every frame; the canvas must read from a mutable ref, not React state. Keep React state only for things that change DOM (active chapter, selected part, colourway, rain, sound).
- [ ] **2. Keyframes (`director.ts`).** Per chapter: `pose`, `open`, `explode`, `camera`, `light`, `rainIntensity`, `bgScene`, `highlight`. Tween between chapter anchors with scrub; table in §5.2 is the starting point.
- [ ] **3. Stage anchors.** Each section exposes a `[data-stage-anchor]` element; the director measures it and projects the model into that rect (desktop: alternate sides per chapter; model never behind interactive content). Re-measure on resize.
- [ ] **4. Hero intro (user decision #1).** On load the canvas shows the closed, hanging umbrella and light rain. After first render and fonts ready (~500–800 ms), play a time-based unfurl of ~2.4 s with the per-rib wave from the rig. The page is scrollable during the intro; if the user scrolls before it ends, finish the unfurl quickly and hand off to scroll scrubbing. First paint must never show a broken or empty frame. No-JS and reduced motion: see §6.5.
- [ ] **5. Mobile (user decision #3).** At `max-width: 900px` the canvas becomes a sticky band at the top, about 40svh, per chapter; text scrolls beneath it with a soft top fade mask. Pose, camera and open state still change per chapter within the band. Remove the `opacity: .46; scale(.82)` ghosting. Touch must still scroll the page (`touch-action: pan-y`; only the hover/drag-to-spin interactions are desktop-first).
- [ ] **6. Time-based damping.** Replace `+= 0.0018` per frame with delta-time-based idle spin; only render when something changed or the idle spin is active; pause the loop when the tab is hidden.
- [ ] **7. Header counter** ("NN / 40 ribs open") reads from the rig and rolls digits.

Acceptance: at each chapter the umbrella is in its table pose within a tolerance, does not overlap text or controls on desktop or mobile, and the camera and pose move continuously between chapters (no jumps) when scrolling up or down quickly.

### 6.3 Phase 3 — Make every control real

- [ ] **Sun angle** drives the directional light, the paper backlight uniform and rib shadows on the washi; the slider gives live feedback. Remove the dead state path in `AmaotoShell.tsx`.
- [ ] **Rain** becomes instanced streaks, rim drips and ripple rings on a puddle plane; toggle eases the intensity in and out. The same intensity value feeds the SVG rain layer (Phase 4) and the audio (§6.6).
- [ ] **Parts list ↔ canvas, both ways.** Row hover or focus highlights the part (emissive or outline) and draws a leader line to it; click focuses the camera on it; canvas hover or click highlights the matching row. `selected` flows in both directions. Add the `selected`/`highlight` prop to `WagasaCanvas`.
- [ ] **"Pull the runner".** Make the copy true: in 01 the runner is draggable or scroll-bound, and the umbrella opens/closes with it.
- [ ] **Colourway change.** Radial dye bleed from the click point over about 900 ms via a shader uniform on the paper, not a material swap.
- [ ] **Drag-to-spin with inertia** and damped pointer-parallax tilt when idle (desktop). Keep the click-to-select raycast working (the old tilt-eats-clicks pitfall applies: do not capture the pointer on mere hover).

### 6.4 Phase 4 — Backgrounds (code-made 2D, brand palette only)

New files under `bg/` (for example `bg/WashiBase.tsx`, `bg/Ridges.tsx`, `bg/Rain.tsx`, `bg/Bamboo.tsx`, `bg/Petals.tsx`, `bg/Puddle.tsx`, `bg/SectionBackdrop.tsx`). Inline SVG + CSS, no raster assets, no image generation.

- [ ] **Washi base**: `feTurbulence` fibre texture on cream, very low contrast, fixed beneath everything.
- [ ] **Hero**: 3–4 sumi-e ridgeline layers with scroll parallax, drifting mist bands, a vermilion/gold sun disc behind the canopy, vertical brush kanji (`雨の音を、紙に。`) drawing in via `stroke-dashoffset` or mask.
- [ ] **01 Anatomy**: asanoha / hairline drafting grid, a rib-count tick ring around the model, thin annotation rules.
- [ ] **02 Light**: indigo night, moon, ink clouds, a rain layer bound to the shared rain intensity.
- [ ] **03 Canopy**: drifting sakura petals, soft dye blots matching the selected colourway.
- [ ] **04 Making**: bamboo grove silhouettes with parallax, paper fibre close-ups, ink brush marks per step.
- [ ] **05 / footer**: indigo-to-ink dusk, puddle reflection of the umbrella, ripple on each drip.
- [ ] **Section edges**: replace hard rectangles with ink-wash or torn-washi edges and cross-faded scenes bound to scroll progress.
- Keep to the seven palette colours and about three layers per scene. Pitfalls: do not put `clip-path` on elements watched by an IntersectionObserver (animate a wrapper or mask a child); keep reveal states server-visible so no-JS stays readable; avoid animating SVG children in ways that force layout (animate wrappers with `transform`/`opacity`).

### 6.5 Phase 5 — Motion system (replaces `am-rise`)

Verbs stay "drift and unfurl". One token set (`--am-ease-out`, `--am-ease-in-out`, `--am-dur-1..4`) in `amaoto.css`, shared by CSS and GSAP. New `motion/` folder (for example `motion/reveal.ts`, `motion/magnetic.ts`, `motion/ripple.tsx`).

| Surface | Interaction |
|---|---|
| Headings | Line-by-line mask rise (not fade); the italic `em` line follows about 80 ms later; kanji draws as a brush stroke |
| Body text / kicker | Short blur-to-sharp; the kicker rule draws left to right |
| Numbers (40, 81, header counter) | Rolling digits tied to scroll or reveal |
| Part rows | Hover: gold rule extends, label tracks right, leader line draws to the 3D part; selected row expands its description with an animated height |
| Swatches | Hover: ring draws; select: ring completes, dye bleed on canopy, label springs |
| Buttons | Magnetic pull toward the cursor (desktop), vermilion fill sweeps from the pointer side, arrow exits and re-enters, press produces a raindrop ripple ring |
| Sun slider | Thumb scales on grab, track fills with sakura, value rolls |
| Rain switch | Custom switch that "pours"; rain starts at the toggle |
| Form | Underline draws on focus, label floats, error nudges once (no looping shake), success: hanko stamp lands and the umbrella closes |
| Header | Hides on scroll down, returns on scroll up; active chapter marker |
| Thread line | Becomes a stitched thread with a knot at each chapter; a small needle mark leads the progress |
| Cursor (desktop, fine pointer only) | Small ripple that expands over interactive elements |
| Section handoff | Scene cross-fade + model repose; never a plain fade of text alone |

Rules:
- Animate `transform` and `opacity` only (plus CSS variables consumed by those); no layout-animating properties in scroll scrubs. Do not tilt or transform elements in ways that intercept clicks (the tilt-eats-clicks pitfall); keep hit targets stable while moving.
- Reveals must not hide content on the server: default state visible, JS adds the pre-reveal state after hydration (the server-first hidden-state pitfall).
- **Reduced motion**: static pose per chapter (open umbrella, no unfurl, no spin, no parallax, no rain animation, no cursor effects, instant colourway change); every section visible; sound toggle still works. This also resolves the existing contradiction with `DESIGN.md`.
- **No JS**: copy, nav and form remain visible; canvas area is empty or shows a static SVG umbrella poster (author one in `bg/` if time allows).

### 6.6 Phase 5b — Optional rain sound (user decision #2)

New file `audio/RainSound.ts` plus a small `SoundToggle` in the header.

- Off by default, no autoplay. Audio starts only after the user clicks the toggle (browser gesture rule). Visible control with `aria-pressed`, a text label ("Rain sound: off/on"), and a keyboard focus ring.
- Synthesised with the Web Audio API (no downloaded asset): filtered noise for the bed, plus sparse randomised short drips for the 02 and 05/footer scenes. Gain ramps (about 600 ms) on toggle and on changes of the shared rain intensity. Cap loudness conservatively.
- Pause or suspend the `AudioContext` when the tab is hidden and on unmount; clean up all nodes.
- Persist the preference in `localStorage` inside `try/catch`; even if "on" was stored, still wait for a user gesture before sound plays.
- Must work with reduced motion enabled (sound is not motion).

### 6.7 Phase 6 — Housekeeping (this is a copyable template)

- [ ] Update `DESIGN.md` (concept, motion section, files list), `PROMPT.md`, `docs/amaoto-wagasa-prompt.md`, `docs/image-video-prompts/amaoto.md`.
- [ ] Refresh `public/templates/amaoto/preview.svg` to match the new hero.
- [ ] Regenerate copy bundles with `scripts/generate-copy-bundles.ts` (`public/copy/amaoto.md`, `public/copy/amaoto-prompt.md`).
- [ ] Update `tests/e2e/amaoto.spec.ts` and the rig unit tests. Check the gallery tests that hard-code template counts (`src/app/(index)/data/templates.test.ts`, `GalleryShell.test.tsx`) and the palette guard; do not change counts, only confirm nothing regressed.
- [ ] Final screenshot pass at defined states (hero 0 / mid-unfurl / full; each chapter; mobile band) and a reduced-motion pass.

---

## 7. Order and size

| # | Work | Size | Notes |
|---|---|---|---|
| 1 | Phase 1 model rebuild | Large | Everything else depends on its pose API |
| 2 | Phase 2 director + stage anchors + hero intro + mobile band | Medium | Delivers "umbrella throughout the page" |
| 3 | Phase 3 real controls | Medium | Mostly wiring once 1 and 2 exist |
| 4 | Phase 4 backgrounds | Medium | Can start once the director exposes progress and rain intensity |
| 5 | Phase 5 motion system | Medium | Wire after layout is final so reveals match the final DOM |
| 6 | Phase 5b rain sound | Small | Depends on the shared rain intensity from Phase 3 |
| 7 | Phase 6 housekeeping | Small | Last |

Suggested checkpoints for review with the user: after Phase 1 (model stills), after Phase 2 (full scroll path, desktop + mobile), then after Phase 5.

---

## 8. Risks

- **Fidelity vs weight.** Keep all repeated detail instanced and mutated in place; do not go back to rebuilding geometry per update.
- **Paper over ribs** can z-fight where skin meets rib; use a small outward offset on the skin and let ribs sit in the underside.
- **Transmission cost.** Use the backlight shader plus alpha instead of true `transmission`.
- **Pinned scenes on mobile.** Handle `svh` and browser chrome resize carefully; provide a non-pinned fallback.
- **Font swap.** Three Google fonts with `preload: false` and a very large `h1`: verify no visible layout jump on first paint.
- **Autoplay policy.** Audio must never start without a gesture.
- **Scope creep in backgrounds.** Hold to the seven palette colours and about three layers per scene.
