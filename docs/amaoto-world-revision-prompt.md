# Amaoto: World Revision Prompt

---

## 0. Mission

You are a senior creative technologist. You are revising the **Amaoto** template (`/amaoto`) in this Next.js repo: a single-page, three.js story about a hand-made wagasa (Japanese oiled-paper umbrella).

Today Amaoto is a strong **object** in a weak **world**. The umbrella is articulated and beautiful, but the page is one model in one room. Only the pose, the camera and a sun angle change. There is no post-processing, one light rig, no fog or background choreography, no sense of place, and no travel.

Your job is to turn it into a **multi-world cinematic scroll experience**. One continuous camera journey passes through six procedurally built places. Atmosphere, light, sound and UI all change as a pure function of one scroll-progress number. Each place has its own signature visual system with real technical weight (custom GLSL, thousands of instanced elements, procedural textures). The umbrella stays the hero throughout.

The finished result should feel like a hand-crafted, award-style WebGL site, not a product viewer with scroll text. Quality bar:

- The scene is driven by **pure, unit-tested logic**, not ad-hoc animation code.
- Every visual state is **scrubbable and reversible** from scroll progress alone.
- A reader can stop at any chapter rest point and see a deliberately composed frame.
- Hardware GPUs get the full cinematic stack. Weak GPUs and reduced-motion users get a complete, graceful fallback.

---

## 1. Ground rules (read before coding)

1. Read `AGENTS.md`, then the relevant guides in `node_modules/next/dist/docs/`. This Next.js version has breaking changes. Heed deprecation notices.
2. Read `src/app/(amaoto)/amaoto/DESIGN.md`, `PROMPT.md`, `docs/amaoto-seamless-handoffs.md`, and every file in `src/app/(amaoto)/amaoto/scene/`, `model/`, `sections/`, `audio/` and `bg/`. Summarise the current chapter order, director state and scroll model in a few lines before planning.
3. **The working tree has uncommitted changes** in `staging.ts`, `staging.test.ts`, `director.ts`, `ScrollDirector.tsx`, `WagasaCanvas.tsx`, `Canopy.tsx`, `amaoto.css`, `DESIGN.md`, `public/copy/amaoto.md` and `tests/e2e/amaoto.spec.ts`. Build on them. Never revert them.
4. **Keep, do not rewrite:** the umbrella model (`createWagasaModel`, `rig`, `lathe`, `materials`), the Anatomy part data (`anatomy.ts`, `parts.ts`), the Making step data (`makingSequence.ts`, `steps.ts`), the colourway data and the commission form. Extend the world around them.
5. **Decisions already made. Do not re-litigate:**
   - Keep **continuous scroll** with the umbrella on a fixed stage. No full-screen slideshow.
   - Add **chapter rest points** with snapping, plus step and jump controls.
   - Tool chapters (Anatomy, Light, Making) get a **locked-stage** state: scroll pauses while the tool is engaged and resumes on exit.
   - **Mobile uses native scroll.** No wheel or swipe hijacking on touch.
6. **No downloaded 3D models.** Everything is procedural geometry, GLSL, canvas-generated textures and Web Audio synthesis. Small seeded-random generators are fine and must be deterministic.
7. **Palette:** derive everything from the existing Amaoto tokens (paper `#F4ECDD`, ink `#1A1613`, bamboo gold `#B8923A`, sakura `#F2B8C6`, indigo `#2B3A55`, plus whatever `amaoto.css` defines). New colours must be shades of these hues. Run the palette guard. Do not introduce hex values that look like another template's palette.
8. **Do not run Lighthouse, speed or responsive audits** on this template. Verify with unit tests, type check, build and a manual run.
9. **Environment:** Windows, PowerShell. Use `..\node_modules` binaries if this worktree has no `node_modules`. Do not delete a worktree `node_modules`.

---

## 2. Experience design

### 2.1 Arc

Six beats: **threshold, structure, paper, weather, craft, commission**. One camera, one umbrella, six places. Worlds cross-fade through shared fog and horizon colour so there is never a hard cut.

Each chapter's data record must contain:
`index`, `numberLabel`, `title`, `markerLabel`, `headline`, `subline?`, `copy`, `specimenNote`, `startProgress`, `restProgress`, `secondaryRestProgress?`, `endProgress`, `tool: 'anatomy' | 'light' | 'making' | null`, `toolButtonLabel?`.

Adapt names to the real chapter list found in `director.ts`. Keep the arc and keep the three tools where they are.

### 2.2 Chapter table (starting values; tune after viewing)

| # | Title | Progress start / rest / end | World | Camera at rest | Tool |
|---|---|---|---|---|---|
| 01 | Threshold | 0.00 / 0.00 / 0.14 | **Paper-lit threshold**: pale shoji glow, drifting fibre motes, closed umbrella unfolding | Medium shot, slight low angle, umbrella centred, long lens (fov ~34) | none |
| 02 | Structure | 0.14 / 0.18 / 0.33 | **Bamboo workshop**: warm window shafts, bamboo stock, lathe and bench silhouettes, shavings in the air | Orbit to 3/4 view, then close on hub and ribs (fov ~38) | **Anatomy** |
| 03 | Paper | 0.33 / 0.45 / 0.58 | **Into the paper**: macro dive through the canopy into a fibre-level world (kozo fibres, oil soaking in) | Camera passes through the canopy surface to a macro view of fibres, fov widening to ~46 | none |
| 04 | Weather | 0.58 / 0.66 / 0.78 (secondary rest 0.72) | **Dusk street**: lanterns, wet ground, rain, wind gusts. Rest 0.66 is calm dusk; rest 0.72 is the open street view where the **gust** interaction runs | Low and wide, umbrella silhouetted against lanterns | **Light** (time-of-day slider) |
| 05 | Craft | 0.78 / 0.86 / 0.93 | **Workbench**: parts laid out on a bench, assembled in sequence, per-step light accent | Overhead 3/4 dolly along the bench | **Making** (step scrub) |
| 06 | Commission | 0.93 / 1.00 / 1.00 | **Genkan return**: lantern-lit entry hall, umbrella closed and leaning, soft floor reflection, form | Settles to a calm composed frame | none |

Rest points are `[0.00, 0.18, 0.45, 0.66, 0.72, 0.86, 1.00]`. Export them as one sorted array.

### 2.3 Copy and typography

Reuse existing copy from `data/copy.ts` and `public/copy/amaoto.md`. Overlay copy appears with a **masked line rise** (see 9.2). It never covers the umbrella at a rest point.

---

## 3. Architecture

Strict separation: **pure logic** (no three.js, fully unit-tested) versus **scene builders** (three.js, no business logic) versus **React overlay**.

```
src/app/(amaoto)/amaoto/
  logic/
    chapters.ts        pure: chapter data, rest points, chapter state at progress, sub-states, camera keyframes + pose, snap helpers
    atmosphere.ts      pure: atmosphere at (progress, timeOfDay, rain)
    timeOfDay.ts       pure: time-of-day slider -> sun, colour, exposure, CSS vars
    rng.ts             pure: seeded Mulberry32 + shared helpers (clamp01, smoothstep, lerp, lerpVec3)
    generators.ts      pure: seeded fibre layout, rain layout, motes, etc. (positions only)
    inspect.ts         pure: inspect state machine + quaternion trackball + pin facing
    chapters.test.ts, atmosphere.test.ts, timeOfDay.test.ts, generators.test.ts, inspect.test.ts
  scene/
    renderer.ts        renderer + lights + PMREM env + fog + composer + cinematic pass (+ software-GL detection)
    textures.ts        procedural CanvasTexture set
    worlds/
      threshold.ts  workshop.ts  paperDive.ts  duskStreet.ts  workbench.ts  genkan.ts
    rain.ts            GPU-driven rain, drips, ripples, canopy beading, gust pulse
    scroll.ts          Lenis + GSAP master timeline, snapping, stepping, pause/lock
    inspectController.ts   pointer/keyboard wiring for the inspect machine (3D side)
    WagasaCanvas.tsx   composes everything, owns the render loop
  audio/
    soundscape.ts      Web Audio synth (replaces/extends RainSound.ts, same toggle)
  ui/                  overlay components
```

Reuse and extend the existing `staging.ts`, `director.ts`, `ScrollDirector.tsx`, `framing.ts` and `anatomy.ts` where they already cover a concern. Do not build a parallel system next to them. If an existing module is the right home, extend it and keep its tests green.

Every scene builder returns a typed object, for example:

```ts
type BuiltWorld = {
  group: THREE.Group;
  update(p: { progress: number; visibility: number; timeOfDay: number; elapsedSec: number; rain: number; /* ... */ }): void;
  dispose(): void;
};
```

`WagasaCanvas` calls every world's `update` once per frame with values derived from one `ChapterProgressState`. A world sets `group.visible = false` when its visibility is near zero.

---

## 4. Pure logic layer

All of this is plain TypeScript. It is unit-tested and never imports three.js.

### 4.1 Math helpers (`rng.ts`)
`clamp01` (NaN-safe, returns 0), `smoothstep(a, b, x)` (guards `a === b`), `lerp`, `lerpVec3`, and `createSeededRandom(seed)` (Mulberry32). All generators use the seeded RNG so scenes are identical on every load.

### 4.2 Chapter state (`chapters.ts`)
`getChapterStateAtProgress(p)` returns **one object** every system reads:

```ts
{
  progress, activeChapterIndex, activeChapter, chapterOpacities[6],
  subRest: 'calm' | 'street' | null,           // chapter 04's two rest points
  worldVisibility: { threshold, workshop, paper, street, bench, genkan }, // each 0..1, overlapping smoothly
  paperDive: number,        // 0..1 depth of the macro dive
  oilSoak: number,          // 0..1 oil front progress through the fibre layers
  rainIntensity: number,    // 0..1 baseline rain by chapter
  lanternGlow: number,      // 0..1
  benchAssembly: number,    // 0..1 coarse assembly progress (fine scrub comes from the Making tool)
  genkanSettle: number,     // 0..1 umbrella settling into the entry hall
  paperLitMode: number      // 0..1, 1 when the background is light (see 9.4)
}
```

Rules:
- **Fully scrubbable and reversible.** Every field is a function of `progress` through `smoothstep` envelopes. No hidden state.
- Chapter opacities: first chapter fades out over a window, last fades in, middle ones use `min(fadeIn(start..start+0.035), fadeOut(end-0.035..end))`.
- Chapters overlap by a few percent so worlds cross-fade, never cut.
- Comment each envelope with its progress window, as a reading aid.

Also export `getNearestChapterSnapProgress(p)` and `getNextChapterProgress(p, ±1)`. The next-step helper treats a position more than 0.025 past the nearest rest point as "between rest points" and goes to the adjacent one rather than skipping.

### 4.3 Camera (`chapters.ts`)
`CAMERA_KEYFRAMES: { progress, position, target, fov, focusDistance }[]`, one per rest point plus transition waypoints (for example just before and after the paper dive). `computeCameraPoseAtProgress(p)`:

- **Catmull-Rom** over position and target, using the neighbouring keyframes.
- The segment parameter is eased with `smoothstep(0, 1, t)` so the camera eases at rest points.
- `fov` and `focusDistance` interpolate linearly on the eased parameter.
- **Guards:** clamp undershoot on segments with large jumps (clamp each axis to the min/max of the segment endpoints where a spline would swing past). Keep the camera above the ground plane in above-ground segments. Never let the camera intersect the umbrella during the paper dive (pass through the canopy via a dedicated waypoint pair).

The renderer then **damps** toward this pose each frame: `alpha = 1 - exp(-11 * dt)` for position, target and fov. On software GL use `alpha = 1`.

Keep the existing `framing.ts` "fit whole umbrella" logic as a **post-correction** for chapters that must show the full object. Do not apply it in the paper dive or the Anatomy close-ups.

### 4.4 Time of day (`timeOfDay.ts`)
`computeTimeOfDay(t01)` where `0` is deep dusk, `0.75` is the default, `1` is bright day. It returns:

- `sunOffset` (azimuth from about -1.2 to -0.3 rad, elevation from about 0.15 to 1.3 rad, radius ~7)
- `sunColorRgb` through four stops (ember, golden, warm paper-white, cool daylight)
- `sunIntensityMultiplier`, `ambientIntensityMultiplier`, `rimIntensityMultiplier`
- `toneMappingExposure`
- `lanternIntensityMultiplier` (lanterns are strongest at dusk)
- `paperTransmission` (0..1; how much light shows through the canopy)
- `surfaceBgRgb`
- `timeLabel` ('Dusk' | 'Golden hour' | 'Morning' | 'Midday')
- `cssVars` for `--page-bg`, `--sky-ambient`, `--text-contrast`, `--sun-accent`, so the **DOM theme follows the 3D light**.

Unit-test monotonic intensity, clamping, label boundaries and that every colour channel stays in `[0, 1]`.

### 4.5 Atmosphere (`atmosphere.ts`)
One pure function:

```ts
atmosphereAtProgress(state: ChapterProgressState, timeOfDay: TimeOfDay, rain: number): {
  background: RGB; fogColor: RGB; fogDensity: number;
  exposure: number; envIntensity: number;
  key:  { color: RGB; intensity: number; position: Vec3; target: Vec3 };
  rim:  { color: RGB; intensity: number; position: Vec3 };
  hemi: { sky: RGB; ground: RGB; intensity: number };
  accent: { color: RGB; intensity: number; position: Vec3 };   // lantern / window / bench lamp
  bloomStrength: number; vignette: number; grain: number; lensBlur: number;
}
```

Each world supplies its own target atmosphere, and the function **blends them by `worldVisibility`**. Targets to implement:

- **Threshold:** pale cool-warm paper light, very light fog, low contrast, high exposure.
- **Workshop:** warm amber key from a window direction, deep wood-brown ambient, visible dust shafts, moderate fog.
- **Paper dive:** background moves to translucent warm cream, fog density rises with `paperDive` (so fibres fade into depth), key light comes from behind the paper.
- **Dusk street:** indigo-blue ambient, warm lantern accent lights, denser fog, bloom on, rain on.
- **Workbench:** neutral warm lamp from above, per-step accent hue, minimal fog.
- **Genkan:** low warm lantern glow, soft exposure, quiet vignette.

The renderer writes the result to the scene once per frame. Unit-test: all numeric outputs finite, intensities non-negative, fog density within sane bounds, and no discontinuity larger than a small epsilon between adjacent progress samples.

### 4.6 Generators (`generators.ts`)
Pure, seeded, returning typed arrays or plain data:
- **Paper fibres:** at least 1,400 curved fibre strands with layer index, length, thickness, curl, and an `oilArrival` threshold (0..1) saying when the oil front reaches that fibre.
- **Rain:** drop spawn data (x, z, speed, phase, length) for a configurable count.
- **Motes:** dust and fibre motes with drift vectors.
- **Gust field:** helper to compute a gust wave front radius and amplitude from age.

Unit-test determinism (same seed gives identical arrays), counts, value ranges and `oilArrival` ordering by layer.

### 4.7 Inspect state machine (`inspect.ts`)
Keep Anatomy's existing part data and camera targets. Wrap them in a clean, testable machine:

- Phases: `idle`, `engaged`, `returning`.
- While `engaged`: scroll is locked, the world dims (see 5.4), part pins are shown, and the camera moves to the part's inspection pose.
- Pointer drag orbits the umbrella with a **quaternion trackball** (camera-relative axes, no gimbal lock, sensitivity ~0.0075 rad per px). Release adds angular inertia that decays with `exp(-8.5 * dt)`.
- Arrow keys rotate in steps of about 34 px equivalent. `Esc` exits.
- On exit, ease the rotation back by slerp with `alpha = 1 - exp(-9 * dt)` and snap to identity below about 0.01 rad.
- A pin is visible only if its surface normal faces the camera (`dot > -0.05`) and it is inside the frustum.
- If the chapter or sub-rest changes while engaged, exit cleanly.

Pure functions: `onPointerDown/Move/Up`, `toggleKeyboardEngage`, `exit`, `applyKeyboardStep`, `tick(state, dtMs)`, `isPinFacingCamera`, plus quaternion helpers (`normalize`, `fromAxisAngle`, `multiply`, `slerp`, `rotateVec3`). Unit-test every transition, inertia decay, slerp convergence and pin culling.

---

## 5. Renderer, lights and post-processing (`renderer.ts`)

### 5.1 Renderer
- `WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })`, ACES filmic tone mapping, sRGB output.
- **Software-GL detection:** read `WEBGL_debug_renderer_info`; treat `/SwiftShader|llvmpipe|softpipe|Software|Basic Render/i` as software.
- Pixel ratio: `min(devicePixelRatio, 2)` on hardware, `0.85` on software.
- Shadows: PCF, on only for hardware.
- Pre-warm shaders on hardware: `renderer.compile(scene, camera)` after all worlds are built.

### 5.2 Lights
A key `DirectionalLight` with a shadow camera of about ±4.5 (1024 map, small normal bias), a `HemisphereLight`, a rim `DirectionalLight`, and one accent light (a `PointLight` for lantern or window warmth). All colours and intensities come from `atmosphereAtProgress`. The environment map is a small PMREM-filtered room scene (a few emissive panels), with `environmentIntensity` driven by atmosphere.

### 5.3 Fog and background
`FogExp2`. Its colour always equals the scene background colour so distant geometry dissolves into the horizon. This is what hides the world transitions.

### 5.4 Composer (hardware only)
`EffectComposer` with:

1. `RenderPass`.
2. `UnrealBloomPass` with a **high threshold (~0.92)** so only emissive things (lanterns, lit paper, rain highlights, oil sheen peaks) bloom. Strength comes from atmosphere (zero in the threshold and genkan worlds, up at dusk).
3. A custom `ShaderPass` ("cinematic") with uniforms `uTime`, `uInspectStrength`, `uPaperLit`, `uVignette`, `uGrain`, `uLensBlur`. Fragment logic:
   - **Peripheral lens blur:** a 5-tap cross blur whose radius is `smoothstep(0.22, 0.68, dist) * (0.0022 + uInspectStrength * 0.0032)`.
   - **Inspect dimming:** `col *= 1 - smoothstep(0.20, 0.65, dist) * uInspectStrength * mix(0.52, 0.08, uPaperLit)`, so the world falls away around the inspected part but stays airy in light scenes.
   - **Vignette:** darkness reduced by `uPaperLit` so light scenes keep warm corners.
   - **Film grain:** hash noise, amplitude about 0.018, time-varying.
   - **Highlight roll-off:** clamp to about 0.95 so cream paper never clips to harsh white.

On software GL or reduced motion, skip the composer and call `renderer.render` directly.

### 5.5 Render loop
- One `requestAnimationFrame` loop, `THREE.Timer` for `dt` (cap 0.1 s).
- On software GL, throttle to about one render per 110 ms, and skip frames entirely when no state changed.
- Allocate **nothing** per frame (pre-allocated scratch vectors and quaternions).
- Sync React overlay state at most every **28 ms** when interactive or when projected leader lines are visible, and every **60 ms** otherwise.
- Clean `dispose()` of geometries, materials, textures, composer and listeners.

---

## 6. Procedural textures (`textures.ts`)

Generate with `CanvasTexture`, seeded RNG, anisotropy up to 8, correct colour space (sRGB for colour maps, none for bump and data maps). Build all of them once at startup behind the loading state.

| Texture | Technique |
|---|---|
| `washiColor` + `washiBump` (1024²) | Hundreds of long curved translucent fibre strokes at random angles over a warm cream ground, density clusters, a few darker inclusions, subtle laid-line banding |
| `washiTransmission` (512²) | Grayscale thickness map (thin areas transmit more light) used by the canopy shader |
| `bambooColor` + `bambooBump` (512×1024) | Vertical fibrils, node rings every N px, alternating warm gold and green-gold, fine cracks |
| `woodFloorColor` + `woodBump` | Plank grid, grain via stretched noise, worn edges |
| `tatamiColor` + `tatamiBump` | Woven rush pattern, border cloth strip |
| `silkThread` | Fine twist pattern for thread and cord |
| `lacquerRoughness` | Noise-modulated roughness for oiled surfaces |
| `moteSprite` | Soft radial sprite for dust, fibre and bokeh points |
| `rainStreak` | 1×32 gradient for streak sprites |

Spend effort here. Visible procedural texture detail is a large part of what reads as "high craft".

---

## 7. The six worlds

Common rules for every world:
- Built once at startup. Hidden (`group.visible = false`) when `visibility < 0.008`.
- All motion is a function of `elapsedSec` and progress-driven uniforms only.
- Has **foreground parallax layers** (out-of-focus particles, hanging elements) that move faster than the background as the camera travels.
- Has a **contact shadow** under the umbrella (soft radial disc plus real shadow on hardware).
- Seeded RNG for all layout.

### 7.1 Threshold (`threshold.ts`)
- A pale paper room: tall translucent shoji panels (grid frame geometry plus an emissive paper plane with the fibre texture), a soft floor with a faint reflection of the umbrella (low-opacity mirrored clone, opacity ~0.07, as the current build already does).
- 150+ drifting fibre and dust motes (instanced sprites) with slow curl-noise drift, brighter inside a backlight cone.
- The umbrella unfolds through the first 0.10 of progress via the existing rig `open` value.
- Light: strong back and side light so the canopy glows.

### 7.2 Workshop (`workshop.ts`)
- Bamboo stock leaning on a wall (instanced tapered cylinders with the bamboo texture and node rings, 60+), a bench with a vise, a lathe silhouette (lathe-geometry parts), hanging tool silhouettes, a window frame with warm shafts.
- **Light shafts:** 3 to 5 additive-blended tapered shaft meshes with a shader that fades along length and across width, animated by slow noise. Their opacity follows `timeOfDay.sun` so they are alive when the slider moves.
- 300+ wood shavings and dust motes as instanced curled geometry, drifting down slowly.
- The Anatomy tool lives here. While it is engaged the world dims through the cinematic pass and the camera moves to each part.

### 7.3 Into the paper (`paperDive.ts`): signature system 1
A macro world the camera dives into through the canopy.

- **Fibre field:** at least **1,400 fibre strands** from `generators.ts`, drawn as merged tube or ribbon geometry in several depth layers, each with `aLayer`, `aOilArrival`, `aPhase` attributes.
- **Custom GLSL material** with uniforms `uDive`, `uOilSoak`, `uTime`, `uLightDir`, `uTransmission`:
  - Fibres are cream and nearly opaque when dry. As `uOilSoak` passes each fibre's `aOilArrival`, it turns **translucent amber** (`mix(dry, amber, smoothstep(arrival-0.04, arrival+0.04, soak))`) with a travelling bright **wet front** (`exp(-pow((soak - arrival)/0.05, 2))`).
  - Backlit transmission: brightness increases with the angle between view and light, tinted amber when oiled.
  - Fine fibre sway: a small time-varying displacement along the normal.
- **Background plane or volume** behind the fibres with an fbm-noise shader (4-octave value noise with rotation) producing soft thickness variation, so the paper looks like a layered material and not a flat card.
- Foreground: out-of-focus fibres and oil droplets (bokeh sprites) passing the lens faster than the background.
- The camera enters through the canopy surface. Use two waypoints (just outside, just inside) and hide the canopy's outer surface once the camera is behind it (smooth fade, not a pop).
- On exit the camera pulls back through the oiled paper and the canopy returns, now visibly more translucent. This is the payoff that sets up the Light chapter.

### 7.4 Dusk street (`duskStreet.ts`) and rain (`rain.ts`): signature system 2
- **Street:** two rows of lanterns on posts (paper lantern geometry with an emissive shader and a warm point-light proxy, 10+), wet cobbled ground (a large plane with a normal-ish bump and a reflective roughness texture, plus a faint screen-space-free fake reflection using a mirrored copy of lantern glow sprites), low building silhouettes and eaves, and far lantern bokeh in the fog.
- **Rain (hardware: ~6,000 drops; software: ~1,200):** one `InstancedMesh` of thin streaks. Position, fall speed and phase come from instance attributes, **animated in the vertex shader** from `uTime` (no per-frame CPU matrix writes), with streak length stretched by speed. Rain is lit by lantern colour (warm tint near lanterns).
- **Ground ripples:** a ripple pool of 40+ quads using a ring shader (`smoothstep` ring at radius `age * speed`), spawned at deterministic positions with staggered phases.
- **Canopy beading and runoff:** a shader term on the canopy paper that adds bead highlights (high-frequency cellular noise thresholded into small specular dots) scaled by `rainIntensity`, plus **drips** (instanced small spheres) that fall from the 40 rib tips with staggered phases.
- **Gust interaction (the interactive moment):** on pointer press or touch in this chapter's street rest, spawn a gust at the touched ground point. Uniforms `uGustOrigin`, `uGustStart`. The wave front travels outward at about 6 to 7 units per second for about 3.6 seconds. As it passes:
  - rain streaks shear sideways (vertex shader)
  - lanterns sway and their glow flickers
  - the umbrella's canopy flexes slightly (small rig offset) and rain beads shed
  - a soft chime plays (see 11)
  Also brighten rain and lantern glow **near the pointer** (`uPointerWorld` proximity falloff) so hovering feels alive.
- **Light tool:** the time-of-day slider drives `timeOfDay`. Dusk gives strong lantern bloom and a deep indigo ambient. Day gives bright overcast light. Whatever the setting, **paper transmission must visibly change**: the canopy glows from within at dusk (lanterns behind it) and shows the rib shadow pattern through the paper in daylight. This is the umbrella's signature look. Do not ship a version where the slider only moves a shadow.

### 7.5 Workbench (`workbench.ts`)
- A wide bench (wood floor texture on a slab), laid-out parts for the umbrella: shaft, hub, rib bundle, thread, paper roll, brush, oil pot, each procedural.
- The **Making** tool scrubs steps forward and back. For each step the camera dollies along the bench to a framed pose, the relevant part lifts or animates into place, and a **per-step accent light** (hue, position, intensity) lights the work. Steps must be scrubbable in both directions and tied to the same progress value used elsewhere (no separate timer).
- Small environmental life: oil surface shimmer in the pot (simple animated normal shader), a thread end gently swaying, soft dust motes in the lamp cone.

### 7.6 Genkan return (`genkan.ts`)
- An entry hall: a stepped floor (tatami and stone threshold), a sliding door with a paper panel, a hanging lantern with warm glow, an umbrella stand.
- The umbrella closes and settles, leaning at an angle (driven by `genkanSettle`). A soft floor reflection (mirrored clone, low opacity) returns here.
- This is the quietest world: slow motes, low-key bloom, minimal motion. The commission form sits over a calm, readable zone.

### 7.7 Transitions
- A world's `visibility` is a `smoothstep` window over its chapter range with a few percent of overlap into the neighbours.
- Because fog and background are blended from atmosphere targets, overlapping worlds dissolve into each other through the haze.
- Check every seam by scrubbing slowly in both directions. No pop, no flash of black, no object at the wrong scale.

---

## 8. Interaction summary

Keep all existing interactions: drag spin, runner drag, part hover and click, rain toggle, colourway swatches with the dye spread from `dyeOrigin`, sliders. Add or upgrade:

| Interaction | Behaviour |
|---|---|
| **Anatomy engage** | Click a part or its pin. Scroll locks, world dims (cinematic pass `uInspectStrength` damped to 1), camera moves to the part, pins and leader lines show, trackball orbit with inertia, `Esc` and a visible Close button exit. |
| **Time of day** | Slider in the header (plus dusk and day end buttons). Drives light, sky, lantern strength, paper transmission, DOM theme via CSS variables. Fully keyboard accessible with `aria-valuetext` like "Dusk (12%)". |
| **Gust** | Pointer or touch in the street world creates a travelling wave (see 7.4). |
| **Making scrub** | Step buttons and a scrubber. Dragging the scrubber moves the bench animation continuously. |
| **Colourways** | Swatches change the canopy with a dye spreading from the pointer or tap point. Background elements that carry the colourway (hanging silk in the workshop, lantern tint on the street) pick up a hint of the active colour. |
| **Keyboard** | Arrow keys and Space step chapters, `1` to `6` jump, `Esc` exits a tool. Do not hijack keys while focus is in an input, textarea, select or button. |

---

## 9. Scroll, navigation and UI

### 9.1 Scroll controller (`scroll.ts`)
- **Lenis** (`lerp ~0.09`, `smoothWheel`, `wheelMultiplier ~0.9`) driven from the render loop (`lenis.raf(now)`), connected to **GSAP ScrollTrigger**.
- An invisible tall track (about **800vh**, `pointer-events: none`) with one master timeline scrubbed 0 to 1. `onUpdate` writes a single `progress` number.
- **Rest-point snapping:** after **900 ms** of no scrolling, if the nearest rest point is more than **0.008** away and no tool is engaged and no programmatic scroll is running, scroll to it (`duration ~1.05 s`, cubic-out easing).
- `scrollToProgress(p, immediate?)`, `stepChapter(±1)`, `setScrollPaused(bool)`.
- Expose a test hook, `window.__amaotoScrollTo(p)`, that jumps immediately, also updates `window.scrollTo`, and calls `ScrollTrigger.update()` (needed for headless tests).
- **Touch devices:** use native scroll. Do not enable Lenis smooth touch. Snapping still applies on idle but must not fight an active touch scroll.
- Clean up everything on dispose (`ScrollTrigger.getAll().forEach(kill)`, `lenis.destroy()`, listeners).

### 9.2 Overlay (`ui/`)
- A fixed, `pointer-events: none` layer. Only controls are `pointer-events: auto`.
- **Header:** small wordmark (links to top), time-of-day slider, sound toggle (`aria-pressed`, clear label).
- **Chapter marker:** number and title, in an `aria-live="polite"` region, updated when the active chapter changes. Chapter jump list (six dots or a compact menu) and previous and next buttons. On mobile these live in a bottom bar.
- **Masked line rise:** each headline and copy line is wrapped in an `overflow: hidden` mask. Its inner span translates from `105%` to `0` with a cubic-out ease driven by that chapter's `chapterOpacity` and a per-line delay factor.
- **Scrims:** soft radial and linear gradients behind copy for readability, faded out in light scenes.
- **Data attributes** on the overlay root for tests and styling: `data-active-chapter`, `data-sub-rest`, `data-inspect-phase`, `data-paper-lit`.
- **Making steps strip** (chapter 05): a bottom strip with the steps, each revealed in sequence from the bench progress, with small line icons. It doubles as the step control.
- **Anatomy pins:** projected from 3D each frame (the existing marker and leader code is the base). Clamp inside the viewport with margins. On mobile, replace floating pins with a **bottom sheet** listing the parts, with the selected part highlighted in 3D.
- **Light-on-dark switching:** when `paperLitMode > 0.45`, flip overlay text and icon colours to ink on paper. Fade scrims out.

### 9.3 Loading
Show a minimal progress state while textures and worlds build. Do not reveal the canvas until the first frame is rendered. After that, the opening unfold begins.

### 9.4 Static fallback
Keep the existing poster. If WebGL is unavailable, or `prefers-reduced-motion: reduce` is set, render a **complete static page**: the same copy in order, the poster or still imagery per chapter, the time-of-day slider still changing page colours through the CSS variables, the colourway swatches and the commission form. Nothing may be hidden behind WebGL.

---

## 10. Performance and robustness

- Budgets (hardware): about 6,000 rain streaks, 1,400+ paper fibres, 300+ shavings, 150+ motes, 10+ lanterns, 40 ripple quads. Software: reduce to roughly one fifth, drop post-processing, drop shadows.
- Prefer instancing and merged geometry. One draw call per system where possible.
- Animate in **vertex or fragment shaders** from uniforms. Do not rewrite instance matrices on the CPU every frame except for the umbrella rig that already does so.
- Skip updating hidden worlds.
- Reuse scratch objects. No `new Vector3()` in the loop.
- Handle context loss: show the static fallback and do not crash.
- Resize: debounce through `ResizeObserver`; update composer, bloom resolution and camera aspect.

---

## 11. Audio (`soundscape.ts`)

Web Audio only, no files. **Off by default** behind the existing sound toggle, and starts only after a user gesture.

- **Master gain** ramped with `setTargetAtTime` (about 0.06 target when on).
- **Room tone** (low sine and triangle drone on a pentatonic root with a low-pass filter) present everywhere.
- **Workshop layer:** soft filtered-noise "air" plus sparse, randomised short wooden ticks.
- **Paper dive layer:** a muffled, warm texture. Low-pass cutoff falls with `paperDive`.
- **Rain layer:** band-passed noise whose gain follows `rainIntensity`; sparse droplet pings. Tint the filter with time of day (softer at dusk).
- **Gust chime:** on gust, a short sine pair that glides down a fourth over about 0.9 s with an exponential gain tail.
- `updateProgress(state)` crossfades layers by `worldVisibility` using filter frequency and gain automation. No clicks or pops.
- `dispose()` closes the context.

---

## 12. Accessibility

- Every control is reachable by keyboard, with visible focus styles.
- The canvas is `aria-hidden` or has a brief `role="img"` label. All information is available in the DOM text.
- `prefers-reduced-motion`: no camera travel animation between chapters (jump to the rest pose), no particles beyond a few static ones, no grain, no auto-spin. Content stays complete.
- Colour contrast of overlay text over each world's rest frame must meet WCAG AA. Check with the scrims on.
- Announce chapter changes through the live region only, never with focus stealing.

---

## 13. Tests

Use the repo's existing test runner. Update, do not delete, existing tests. If a template-wide count changes, update every file that hard-codes it.

**Unit tests (pure logic):**
- `chapters.test.ts`: start < rest ≤ end for every chapter; rest points sorted and inside their chapter ranges; chapters tile `[0, 1]` with only intended overlaps; `getChapterStateAtProgress` returns finite values in `[0, 1]` for 2,000 sampled progress values; every envelope is reversible (`state(p)` is the same however you arrive); `getNextChapterProgress` steps correctly from on-rest, between-rest and edge positions; camera pose is continuous (max step between adjacent samples below a threshold) and respects guards; camera at each rest point equals its keyframe.
- `timeOfDay.test.ts`: monotonic sun intensity; labels at the boundaries; channel ranges; CSS variable formats.
- `atmosphere.test.ts`: finite and bounded outputs, continuity between samples, each world's target is reached at its own rest point.
- `generators.test.ts`: determinism, counts, ranges, `oilArrival` ordering.
- `inspect.test.ts`: all transitions, inertia decay, slerp convergence, pin culling, exit on chapter change.

**E2E (`tests/e2e/amaoto.spec.ts`):** canvas is ready; `__amaotoScrollTo` to each rest point sets the expected `data-active-chapter`; the time-of-day slider changes the CSS variable and the canvas `data-` attributes; engaging Anatomy sets `data-inspect-phase` and locks scroll, `Esc` restores; keyboard stepping works; the static fallback shows complete content with reduced motion emulated.

Run unit tests, type check and build after each milestone.

---

## 14. Build order (stop at gates)

1. **Read and plan.** Summarise the current structure. Write a short plan covering chapter table with final progress numbers, camera keyframes, atmosphere targets, the file map and any deviations. **Stop for approval.**
2. **Logic layer** (`rng`, `chapters`, `timeOfDay`, `atmosphere`, `generators`, `inspect`) with full unit tests. Gate: all green.
3. **Renderer and post stack**, with atmosphere applied to the existing scene. Gate: the current page looks right with new light, fog and bloom, and software-GL path works.
4. **Textures.**
5. **Worlds one at a time**, in this order: workshop, dusk street + rain, paper dive, workbench, threshold, genkan. After each, scrub its seams in both directions.
6. **Interactions:** gust, Anatomy dimming, Making scrub, colourway echoes.
7. **Scroll controller, navigation, overlay and mobile bottom bar.**
8. **Audio.**
9. **Fallbacks and accessibility pass.**
10. **Docs:** update `DESIGN.md` (worlds, atmosphere model, camera, controls, budgets).

---

## 15. Definition of done

- Scrolling the page is a continuous journey through six distinct places with **no cut, pop or black flash** at any seam, forward or backward.
- Stopping at any rest point shows a composed frame with readable copy that does not cover the umbrella.
- The paper dive is a convincing macro view with an oil front that soaks through the fibres, and the canopy is visibly more translucent afterwards.
- The Light slider changes how light passes **through** the paper, shifts the lanterns, sky, bloom, page colours and soundscape. It is not only a shadow move.
- The gust interaction works with mouse and touch and visibly affects rain, lanterns and canopy.
- Anatomy engage dims the world, locks scroll, supports trackball orbit and keyboard, and exits cleanly. Making steps scrub both ways.
- At least **three custom GLSL materials**, **thousands of instanced or merged elements**, a **bloom + custom cinematic pass** stack, and a **procedural texture set** are present.
- Hardware GPUs run the full stack. Software GL and `prefers-reduced-motion` users get a complete page. WebGL-less users get the static page.
- All unit tests, e2e tests, type check, palette guard and build pass.

---

## 16. Report format

Finish with: what changed and in which files; tests added or changed; how you verified (commands and what you looked at); budgets actually used; anything skipped, simplified or uncertain, with the reason. Report failures and unfinished items plainly. Do not claim completion for anything you did not run.
