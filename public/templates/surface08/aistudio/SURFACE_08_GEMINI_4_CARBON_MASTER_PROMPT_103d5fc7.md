# SURFACE/08 — GEMINI 4 CARBON MASTER IMPLEMENTATION PROMPT

**Project:** SURFACE/08 — Interactive WebGL Background Laboratory  
**Deliverable:** One fully implemented, polished, hero-only React + TypeScript + Three.js application containing eight genuinely distinct interactive WebGL backgrounds.  
**Creative benchmark:** Can an AI independently design, build, optimize, and verify an aesthetic, reusable library of living materials?

---

## 0. THE MISSION — READ BEFORE CODING

You are acting simultaneously as an award-winning creative technologist, shader engineer, frontend engineer, motion designer, and meticulous QA engineer.

Build a visually striking **interactive hero-background laboratory** inspired by the overall qualities of the attached reference screenshots: saturated chromatic light, atmospheric diffusion, soft yet bold editorial typography, refractive ribbed glass, layered translucency, and precise composition.

**Do not clone any reference site, brand, typography arrangement, or image.** The reference screenshots indicate a standard of visual craft, not assets to be embedded or layouts to be copied.

This project does **not** need a full landing page. The entire deliverable is a single exceptional **full-viewport hero experience with a background switcher and meaningful controls**. Each of its eight effects must work in real time, respond to the user, and remain usable as an independent component in another landing page.

### Non-negotiable constraints

1. **Build the complete running app, not a plan or mockup.** Implement all eight effects; none may be placeholders or palette swaps of one shader.
2. **Three.js must render the actual backgrounds.** Use custom GLSL shaders, multi-pass render targets, or geometry as appropriate. CSS gradients may appear in HTML controls and no-WebGL fallbacks, but may not substitute for primary effects.
3. **The cursor has physical influence.** Use normalized pointer coordinates, velocity, easing, local impulses, decay, and effect-specific response. A radial glow following the mouse is not sufficient.
4. **No static image backgrounds, stock videos, screenshot textures, premade shader GIFs, or ready-made visual effect packages.** Generate the visual content procedurally in code. Avoid overusing external postprocessing presets as a substitute for shader work.
5. **Real HTML text, buttons, inputs, labels, and navigation.** Do not bake hero text into textures or screenshots.
6. **Distinct visual languages.** Even without input, all eight backgrounds must be recognizably different from one another in composition, material behavior, and palette.
7. **Fully functional controls and exports.** Copy, pause, reset, palette, interaction strength, quality, fullscreen, and background switching must actually work. If a feature cannot be honestly implemented, do not present a fake button.
8. **No generic fade-in/fade-out reveals as the main motion motif.** Use masking, displacement, directional clipping, surface waves, refracted sweeps, optical transitions, momentum, and spring-like recovery. Opacity may support these effects, but never be the whole animation.
9. **Quality and accessibility are required.** Responsive down to 320px; touch gestures; keyboard navigation; reduced-motion mode; WebGL-unavailable fallback; no mobile overflow.
10. **Do not stop after completing the flagship backgrounds.** All eight must receive their own working implementation, controls, proper lifecycle, and verification.

---

## 1. BRAND, ART DIRECTION AND HERO COMPOSITION

### Identity

Brand: **SURFACE/08**  
Micro-tag: **AN INTERACTIVE MATERIAL STUDY**  
Primary headline: **THE BACKGROUND IS ALIVE.**  
Supporting copy: *Eight experimental surfaces. Move through color, light, glass and motion.*  
Primary CTA: **EXPLORE MATERIALS** — focuses or opens the background selector; it must perform a real action.  
Secondary action: **COPY THIS BACKGROUND** — copies a useful integration snippet for the currently active effect, with honest instructions about its dependencies.

### Visual composition (desktop)

- Full-bleed WebGL field behind everything, edge-to-edge with no artificial card frame around the hero.
- Small refined header: left `SURFACE/08` wordmark and tiny animated mark; center or right `INTERACTIVE FIELD NOTES`; top-right optional live `FPS`, quality, and `SOUND OFF` omitted unless actual sound exists.
- Hero copy placed to the **left or upper-left third**, never centered by default; the right 55–65% remains a visually rich, reactive canvas. Background art must still fill the entire viewport.
- Headline large, editorial, with carefully chosen letter spacing and possibly a restrained serif/italic accent. Avoid copycat maximalist typography. Build a real visual hierarchy: eyebrow → headline → explanation → controls.
- Bottom control dock: eight numbered effect selectors `01–08` with concise labels and tiny custom visual glyphs, plus an active marker that moves with directional motion. Desktop uses an orderly two-row or compact segmented gallery that remains clear without overwhelming the artwork.
- A small expandable `TUNE` panel with real controls: interaction strength, animation speed, palettes, quality, pause, reset, inspect, and download / copy.
- The active effect's short editorial descriptor and **real interaction hint** should appear, e.g. “MOVE TO BEND LIGHT / DRAG TO ROTATE RIBS”.
- Subtle grain and fine optical detail are acceptable, but avoid blanket noise and excessive bloom. The look should feel premium, not like a generic neon-tech template.

### Typography

Use a high-quality font pairing or a coherent single-family system; e.g. a bold contemporary sans with a restrained italic serif accent. Choose intentionally, and use `font-display: swap` and fallbacks. Decorative numbers and technical controls may use a monospace font.

### Color discipline

Each effect gets its own authored palette. Avoid using the exact same magenta/cyan gradient everywhere. Colors should be rich but controlled, with dark and light areas reserved for text contrast. Hero text must stay readable as the field changes. Use a localized optical veil or luminance-aware scrim **only where needed**, not a giant opaque rectangle.

### Mobile composition

- Prefer a large atmospheric upper scene and content below/over a calmer part of the field; headline roughly `clamp(2.6rem, 9vw, 4.25rem)`.
- Controls become a horizontally scrollable, accessible selector row or compact sheet; no hover-only functions.
- Preserve the identity of the effect while reducing GPU cost. Do not merely crop a desktop screenshot.
- `100svh` / `100dvh` where supported; safe areas; no clipped buttons; body may scroll naturally on small/short screens.

---

## 2. TECHNICAL STACK AND ARCHITECTURE

Use **React + TypeScript + Vite + Three.js**. Use GSAP for complex DOM entrance and switch transitions only if it improves orchestration. Use normal CSS for layout and buttons. Prefer a **single imperative Three.js `WebGLRenderer`** managed by a React mounting component, rather than creating eight independent canvases. Keep the renderer, camera, scene, input, animation loop, and effect lifecycle understandable.

Use compatible stable package versions; avoid depending on unstable alpha APIs without a compelling reason. The WebGL target is **WebGL2** with a graceful static fallback when unavailable. If you elect to use React Three Fiber, use a stable version compatible with the chosen React major, and maintain the same single-active-background architecture.

### Required architecture

```
src/
  app/
    App.tsx
    HeroShell.tsx
    BackgroundSwitcher.tsx
    TunePanel.tsx
    ExportPanel.tsx
  engine/
    RendererHost.ts
    InputField.ts
    FrameClock.ts
    QualityManager.ts
    EffectController.ts
    effectTypes.ts
    passes/
      FullscreenPass.ts
      PingPongTargets.ts
      TransitionPass.ts
  effects/
    chroma-fluid/
    fluted-light/
    silk-atmosphere/
    glass-lens/
    aurora-field/
    chromatic-ribbons/
    bokeh-reactor/
    refraction-field/
  styles/
    tokens.css
    app.css
  export/
    componentSourceRegistry.ts
    exportBundle.ts
  main.tsx
public/
  [only lightweight fallback assets if necessary]
README.md
```

The exact file tree may change to suit the implementation, but all eight effect modules must be independently understandable. **One huge `App.tsx` with 2,000 lines of interconnected shader strings is not acceptable.**

### Common contract

Implement a genuinely typed effect contract conceptually equivalent to:

```ts
export interface BackgroundEffect {
  readonly id: string;
  readonly label: string;
  readonly helpText: string;
  readonly palettes: Palette[];
  init(context: EffectContext): Promise<void> | void;
  resize(width: number, height: number, pixelRatio: number): void;
  update(dt: number, elapsed: number, input: InputState, controls: EffectControls): void;
  render(renderer: THREE.WebGLRenderer, output?: THREE.WebGLRenderTarget | null): void;
  reset(): void;
  dispose(): void;
}
```

You can refine the shape, but effect switching must not require conditional code scattered throughout the UI. A controller should own initialization, active effect, transition state, and resource disposal.

### Shared pointer field

Maintain input as CSS pixel coordinates + normalized UVs, normalized velocity (`delta per second`), smoothed velocity, pointer-active state, drag state, contact pressure when available, pointer-down / pointer-up impulses, and a decaying history of recent splats.

- Convert pointer coordinates using **the canvas's actual bounding rectangle**, not `window.innerWidth` blindly.
- Correctly handle Y-axis orientation and devicePixelRatio.
- Use frame-rate-independent damping: `alpha = 1 - exp(-lambda * dt)` or equivalent.
- Pointer tracking must still work when the WebGL canvas visually sits underneath text. Put passive document-level pointer listeners on the hero region or capture interactions on the correct target; keep real buttons clickable.
- Do not allow velocity to explode on first pointer entry, tab restore, or resize; clamp impulses.
- Support touch drag and tap. Make scroll/touch action behavior explicit so it does not trap normal page interaction.

### Renderer and quality

- Use one WebGL context and one animation loop. **Only active and in-transition effects may render.**
- Provide Auto / High / Balanced / Low presets; cap device pixel ratio, e.g. approximately 1.5–2 High, 1.25–1.5 Balanced, 1 Low, adjusted from measured performance.
- Use `ResizeObserver` and visibility handling; pause updates in hidden tabs or when the canvas is offscreen.
- Clamp delta time on tab resume. Avoid perpetual React state changes at 60fps.
- All geometries, materials, render targets, textures, event listeners, and loops require disposal.
- FPS display must show **measured** rolling frame rate, not a decorative fixed “60”. Optionally report draw calls and texture size from the renderer when available.
- Explain color-space handling and use consistent tone mapping; avoid unexpected blown-out whites or muddy, over-saturated shaders.
- The project should run with `npm install` and `npm run dev`; `npm run build` must succeed.

---

## 3. THE EIGHT EFFECTS — UNIQUE VISUAL AND TECHNICAL REQUIREMENTS

### 01 — CHROMA FLUID / flagship

**Headline accent:** LIQUID COLOR  
**Visual identity:** Saturated moving masses of hot coral, deep violet, electric indigo, acid lime, and electric pink, suspended in a black-to-oxblood field. Large shapes, soft intermixing boundaries, occasional sharp folds of light. Inspired by premium experimental gradient art, not a generic gradient canvas.

**Idle:** Slowly evolving dye currents and large flow structures. Distinct, beautiful even after the user stops moving.

**Pointer movement:** Velocity injects force **and** localized chromatic material. Quick strokes curl into turbulence; slower movements gently advect the neighboring field. Dye continues moving after the cursor stops, then dissipates naturally.

**Click/tap:** Expanding circular impulse with colored pigment, affecting the existing flow rather than overlaying a CSS ripple.

**Implementation:** Use a **GPU multi-pass feedback system** using `WebGLRenderTarget` ping-pong textures. At minimum, maintain a persistent flow/velocity field and color/dye field, advect color along velocity, inject pointer splats, and apply controllable decay/dissipation. Ideally include divergence/pressure projection or a carefully justified stable approximation. The resulting visual must visibly retain and transport interaction history. An ordinary `sin(uTime)` warp plus radial pointer highlight **does not pass**.

**Tuning:** Flow speed, viscosity/dissipation feel, impulse strength, palettes (`VOLT`, `SPECTRAL`, `EMBER`). Lower-quality mode reduces simulation resolution while preserving actual feedback behavior.

**Acceptance test:** Swipe rapidly from left to right, release pointer, then wait. A displaced chromatic stream must persist, curl, and relax. It must not snap to a static image or follow the cursor as a single circular glow.

### 02 — FLUTED LIGHT / flagship

**Headline accent:** GLASS IN MOTION  
**Visual identity:** Floor-to-ceiling ribbed glass that refracts luminous gradients behind it. Warm persimmon and peach meet smoky oxblood, teal shadow, and occasional cold lavender. Vertical glass grooves have authentic curvature and glancing highlights. This is the closest reference to the reed/fluted images supplied by the user, but create an original composition.

**Idle:** Gentle light source drift behind nearly stationary architectural ribs. Controlled highlight sweeps move as a result of lighting, not a fake opacity overlay.

**Pointer movement:** Pointer behaves as a local moving area light. Nearby grooves brighten and bend their highlight position. A subtle wave travels outward along the rib field at different speeds.

**Drag:** Dragging across the hero warps the glass field and shifts groove pitch/angle by a limited amount; on release the grooves spring back with damping and overshoot. Keep the field visually architectural, not rubbery.

**Implementation:** Custom GLSL refraction/displacement shader applied to a plane with computed rib normals, or actual shallow/extruded rib geometry combined with a background gradient render pass. Use periodic rib shape derivatives for normals, UV offset refraction, angular Fresnel glints, depth/edge variation, and **subtle** RGB spectral separation. Include a distinct background light-field render, sampled through the refractive layer. Ensure the glass visually changes what is seen behind it; a transparent striped SVG is not acceptable.

**Tuning:** Rib count/pitch, glass strength, warm/cool light, interaction intensity. Palette variations `AFTERGLOW`, `GLACIER`, `VIOLET HOUR`.

**Acceptance test:** Move the pointer from dark to bright areas, and drag diagonally. The appearance of grooves and refraction must change, highlights should follow surface curvature, and geometry/field should relax naturally after release.

### 03 — GLASS LENS / flagship

**Headline accent:** SHIFT PERSPECTIVE  
**Visual identity:** Large, movable thick-glass optical lens—slightly organic, with refined elliptical curvature—hovering over a soft, complex chromatic field. It magnifies, bends, and spectrally separates the underlying gradients. Maintain strong composition: the lens occupies a substantial portion of the right side by default, not a tiny circle stuck to the cursor.

**Idle:** The glass lens gently breathes and settles in place, with elegant edge highlights and a very slow ambient drift. The underlying visual field moves independently.

**Pointer movement:** Lens tracks the pointer with springy inertia **within a safe area**, while preserving visual hierarchy. A soft near-field influence may deform it subtly.

**Drag:** Users can grab its visible rim or a dedicated drag handle and stretch it into a slightly asymmetric shape. On release it returns using spring physics, with overshoot and damped recovery. Tap toggles between two optical focal lengths.

**Implementation:** Render the **source field separately** into a texture, then sample it with nonlinear lens UV displacement using a normal or signed-distance field and position-dependent magnification. Apply physically suggestive Fresnel edge, subtle IOR-dependent per-channel offsets, gentle caustic-like focal highlights. Make the effect truly refract the underlying field. Avoid pretending that `backdrop-filter: blur(...)` alone is a refraction system.

**Tuning:** Lens scale, focal power, dispersion, interaction strength. Palette variations `LAGOON`, `ROSE QUARTZ`, `DUSK`.

**Acceptance test:** Place lens over a multicolor boundary and drag it. Underlying boundaries must visibly curve and magnify through the moving lens; release motion must settle with believable inertia. Buttons must not be blocked by the lens.

### 04 — SILK ATMOSPHERE

**Visual identity:** Soft cinematic folds like translucent silk or atmospheric cloud fabric, lit by an oblique warm beam, with off-white parchment, dusty teal, midnight petroleum, and restrained gold highlights. Broad forms; few high-frequency details.

**Geometry/Shader:** Use a **deformable tessellated surface** or heightfield with depth and computed normals; combine layered low-frequency noise, analytic folds, and moving directional illumination. Convey actual fabric-like curvature, not a flat rectangle with scrolling Perlin noise.

**Interaction:** The pointer creates a pressure depression with neighboring fold rebound; pressure propagates as a decaying wave in local space. On drag, folds stretch in the direction of motion. On release, the fabric returns calmly.

**Idle:** Slow undulations, dramatic grazing light, no repetitive obvious looping.

**Test:** Hover and move diagonally; local wrinkles respond with a visible change in surface shape and lighting, while distant fabric moves more subtly.

### 05 — AURORA FIELD

**Visual identity:** Three to five wide luminous curtains suspended in a navy-black void: cyan, ultramarine, amethyst, magenta, muted green. Elegant broad ribbons and bands with restrained atmospheric glow; not a particle-star background.

**Geometry/Shader:** Curved strip geometry or layered shader ribbons with differentiated simulated depths. Animate band displacement using smooth correlated spatial functions and variable group delay. Soft internal luminance gradients and an edge falloff should produce curtain-like depth.

**Interaction:** Pointer attracts nearby curtains magnetically. Close layers bend strongly and quickly; distant layers respond slowly with less amplitude. Click sends a traveling wave along one ribbon. Ensure continuous shape and no tearing.

**Test:** Sweep rapidly across the screen: near/far curtains must separate in their motion speed and magnitude. Their silhouettes must retain smooth continuity.

### 06 — CHROMATIC RIBBONS

**Visual identity:** Thick shallow 2.5D ribbons of tinted glass and satin metal cross the viewport diagonally, with elegant negative space and soft contact shadows. Visually closer to a sculptural editorial fashion set than a flat wavy wallpaper.

**Geometry/Shader:** Build several curved ribbon meshes from procedurally sampled Bézier/Catmull-Rom paths with actual width, twisted normals, shallow depth separation, material differences, and proper occlusion/shadows or convincing projected soft shadows.

**Interaction:** Pointer tilts near ribbons with depth-dependent parallax; click briefly tightens one ribbon's curvature; wheel or touch vertical movement subtly changes the composition without trapping scrolling. Include one short physically choreographed transition from parallel bands to interlaced bands and back.

**Test:** During pointer input the foreground and background ribbons move at different amplitudes and show believable overlaps; they must not just translate as one PNG layer.

### 07 — BOKEH REACTOR

**Visual identity:** Dark bluish glass atmosphere with luminous blurred volumes, warm peach or ice-blue centers, large soft overlapping fields, and crisp limited optical accents. Evoke a sophisticated camera-lens experiment—not confetti or generic floating dots.

**Geometry/Shader:** Layered emissive fields / instanced translucent lens discs or signed-distance light lobes with variable depth and scattering-like attenuation. Prefer a few large, carefully composed volumes and limited small points. Use a bloom strategy only when materially useful; keep costs under control.

**Interaction:** Pointer pushes neighboring light volumes aside, creating a temporary shadowed cavity. Click emits an outward propagating light pulse through the field, with near/far volumes responding at different times.

**Test:** Move pointer into a bright cluster; light volumes should separate around the influence and move back with temporal lag. The scene must preserve contrast and legible hero text.

### 08 — REFRACTION FIELD

**Visual identity:** A tessellation of large translucent faceted glass polygons, gradually shifting from copper/coral to cool slate and teal. Art-directed asymmetrical facets with edge highlights, caustic-like seams and deep overlaps. Avoid perfectly uniform triangular mesh patterns.

**Geometry/Shader:** Procedurally generated facet mesh or fragment-space Voronoi/irregular polygon field with per-facet normals, thickness cues, background UV refraction, and chromatic variation. Add true depth offsets for selected layers if useful.

**Interaction:** The pointer exerts radial pressure on nearby facets: pieces hinge, change normals, shift refraction, and rebound through damped springs. Click produces a coherent wave that travels across neighboring facets rather than triggering every facet simultaneously.

**Test:** Hover around an intersection and click; boundaries stay connected where appropriate, highlights change with facet orientation, and the pressure wave travels spatially.

---

## 4. CHOREOGRAPHED INTRO — NOT A FADE-IN

Create a memorable 2.2–3.5-second first-load entrance. It must wait until the chosen effect is render-ready to prevent flashes and blank screens. On a fresh load:

1. **0.00–0.30 — FRAME IN.** A thin architectural line sweeps across the viewport edge, and the wordmark is revealed through a horizontal clip. Background is already softly alive, but not yet at full interaction strength.
2. **0.25–0.95 — MATERIAL IGNITION.** Active shader enters via a specific material motion: CHROMA FLUID injects sweeping dye currents; FLUTED LIGHT travels through a refractive wipe from the center; GLASS LENS grows from a curved seam with lens geometry settling. Avoid starting from a black screen that simply fades to content.
3. **0.70–1.75 — TYPOGRAPHY CONSTRUCTION.** Headline line fragments reveal through masked directional wipes with slightly staggered letters. Subheadline resolves from compressed tracking or clipped baseline movement; never just `opacity: 0 -> 1`.
4. **1.45–2.45 — UI ASSEMBLY.** Effect chips slide into alignment along a curved or directional path; active underline sweeps into place; small glyphs draw as SVG paths.
5. **2.30–3.30 — SETTLE.** The motion becomes interactive without a sudden jump. The visible field and normal pointer dynamics are continuous.

Reduced motion: show the full final layout immediately or use a very short nonvestibular dissolve; still keep all content accessible.

## 5. BACKGROUND-TO-BACKGROUND TRANSITIONS

Every switch must feel like a carefully composed material change, not a frame cut or an opacity crossfade.

Implement a reusable **GPU transition pass**. Render outgoing and incoming backgrounds to two sources during the short transition, then combine them with a shape-based mask and/or optical displacement. Examples:

- Fluid → Glass: an expanding viscous field resolves into vertical ribs.
- Glass → Silk: refractive columns shear into broad folded diagonals.
- Lens → Aurora: lens curvature stretches and becomes luminous curtains.
- Refraction → Fluid: facets melt into advecting pigment streams.

You may use a **small set of transition families** selected by source/target types rather than manually coding 56 pairs, but every change should feel continuous and intentional. Recommended 650–1100ms with eased progress and strong visual completion. Transitions must be interruptible without leaving blank frames. Do not leak render targets on repeated switching. Respect reduced motion.

Text labels and descriptions should switch with masked replacement and directional movement, synchronized with the GPU visual change. Do not fade every element separately.

---

## 6. POINTER, DRAG, CLICK, TOUCH — A COMMON INTERACTION LANGUAGE

- **Move:** pointer force based on **velocity** and influence radius, varying by effect. A static cursor near a glass rib may light it, but the main motion must come from real deformation/refraction.
- **Hover:** effect-specific response should be subtle and localized; do not shift the whole background uniformly.
- **Drag:** distinct, meaningful behavior in at least FLUTED LIGHT and GLASS LENS, and visually demonstrable drag effects in the remaining effects when possible.
- **Click/tap:** create an actual shader/geometry impulse or change a meaningful physical parameter; never only trigger a pseudo-element circle.
- **Leave:** effects continue their natural relaxation. Pointer data must not jump to `(0,0)`.
- **Touch:** support `pointerdown` / `pointermove` / `pointerup` with correct gesture handling; make sure sliders and selector chips remain functional. If swiping the visual field captures interaction, don't block ordinary controls or essential page scrolling.
- **Keyboard:** all buttons reachable by Tab, Enter/Space activation; numeric effect shortcuts `1`–`8` as an enhancement only, not a requirement for basic use.

Add a subtle “TRY MOVING YOUR CURSOR” instructional cue that disappears after a real interaction; on touch devices say “DRAG THE SURFACE”. The cue itself can be removed via a line-clipped move, not a default fade.

---

## 7. THE INTERACTIVE LAB CONTROLS

### Effect selection

Visible, reliably clickable labels:

`01 CHROMA FLUID` · `02 FLUTED LIGHT` · `03 SILK ATMOSPHERE` · `04 GLASS LENS` · `05 AURORA FIELD` · `06 CHROMATIC RIBBONS` · `07 BOKEH REACTOR` · `08 REFRACTION FIELD`

Each selection updates the active background, microcopy, active state, available palettes, and contextual helper hints. Make FLUTED LIGHT the default first impression if it gives the strongest reference-aligned static screenshot; CHROMA FLUID is an equally good first-load alternative if its quality is clearly superior.

### Tune panel

- `Interaction` (0–100; default 70): maps to actual shader or physics influence, not a CSS filter.
- `Motion speed` (0–100; default 45): governs ambient evolution, while leaving input responsive.
- `Palette` (at least 3 distinctive presets for the three flagship effects; 2 for others).
- `Quality`: Auto / High / Balanced / Low; updates simulation resolution, DPR, and expensive passes.
- `Pause / Resume`: stops ambient simulation without blanking the image; optionally keeps or disables pointer interaction consistently and statefully.
- `Reset`: restores the active material and default interaction state, not just the input values.
- `Inspect`: toggles a readable overlay of real FPS, active effect ID, render dimensions, DPR, and estimated GPU work where measurable; label estimates explicitly.
- `Fullscreen` (optional): real Fullscreen API when available; if unavailable, hide or disable honestly.
- `Copy integration snippet` + `Download component bundle`: functional as defined below.

Persisting current settings in URL query parameters is a useful enhancement but not essential; do not let it delay effect implementation.

### Reusable export requirement — IMPORTANT

This is meant to become a reusable source library for future landing pages, not just a demo. Provide two honest export mechanisms:

**Copy integration snippet** should copy a minimal valid React usage example, e.g. `<FlutedLightBackground intensity={0.7} palette="afterglow" />`, plus a visible note that it imports a real module and requires `three`.

**Download effect bundle** should download a `.zip` containing the selected effect's actual `.ts`/`.tsx` shader sources, the shared runtime dependencies it imports, a short README with install instructions, and a minimal example usage file. It must not generate a fake component snippet that references nonexistent code. To generate a real ZIP in Vite, you may use `jszip` and source-as-text imports (`?raw`) or an explicitly maintained source registry containing the real implementation code. Do not rely on `fetch('/src/...')` on a production build; it will not work there. If exact code bundling cannot be done reliably, keep the `Copy snippet` functional and show a clearly labeled `Export source` view from actual modules instead of claiming to download a valid bundle. Prefer working exports.

Verify that the exported Fluted Light and Chroma Fluid bundles are usable in a fresh minimal app. Do not say they are portable if you have not checked the imports.

---

## 8. RESPONSIVE, ACCESSIBLE, ROBUST

- Visual checkpoints: **320×640**, **390×844**, **768×1024**, **1024×768**, **1440×900**, and an ultrawide desktop.
- No horizontal document scrolling, clipped text, inaccessible selector, hidden controls, or body-level pointer event interception.
- Ensure consistent optical composition on differing aspect ratios: use a responsive UV mapping/aspect correction rather than stretching circles into ellipses unintentionally.
- Prevent broken aspect ratios and unsafe shader divisions at extremely small dimensions.
- Respect `prefers-reduced-motion`; stop autonomous kinetic motion, avoid entrance choreography, disable strong drag inertia, and retain a static beautiful material look that still supports basic interaction if appropriate.
- Detect no-WebGL2 and context loss. Show an attractive **CSS-only static fallback** with a clear explanation, preserving headline, selectors (disabled with honest messaging), CTAs and navigation. Reinitialize safely after context restoration if feasible.
- ARIA labels / pressed states for selectors and controls; touch target sizes generally >=44px; focus visible; contrast evaluated for all eight palettes.
- Page must never get stuck behind an intro overlay. On shader compilation failure, recover to a different functional effect or the honest fallback and display an actionable error in development mode.
- Avoid unnecessary network requests, external textures, custom asset pipelines, and large libraries unrelated to the main experience.

---

## 9. QUALITY BAR: WHAT COUNTS AS SUCCESS

**Visual excellence**

- Each background has composition: large shapes, medium transitions, restrained micro-detail, light direction, negative space, believable material logic.
- Every surface has a distinct idle look AND distinct interaction signature.
- The typography, controls, and field look like one coherent art-directed product.
- Screenshots at 1440×900 should feel publishable as hero examples without hovering.

**Technical excellence**

- No runtime console errors or shader warnings in normal usage.
- No blank frames on effect switching or tab resume.
- Rapid switching `1→8→1` does not produce leaks or stale materials.
- Input changes simulation; it is not merely an HTML layer placed above an animated video.
- At reasonable desktop hardware, target fluid interaction (ideally around 60fps); provide quality downgrades to preserve responsiveness. Do not claim universal performance.

**Robustness**

- If a complex effect becomes unstable, simplify the algorithm while preserving its *essential identity*: Chroma Fluid must have persistent advected state; Fluted Light must refract; Glass Lens must distort a separate source.
- Never silently replace an effect with the same animated gradient as another effect.
- Never remove one of the eight backgrounds to rush delivery.

---

## 10. EXECUTION ORDER — KEEP WORKING THROUGH COMPLETION

Build and test in this sequence, but produce the complete deliverable in this task:

1. Scaffold Vite/React/TS, responsive hero shell, WebGL2 capability detection, renderer host, input tracking, effect interface, and one real background.
2. Implement **FLUTED LIGHT** to a polished state with refraction and drag deformation.
3. Implement **CHROMA FLUID** with live persistent simulation textures and pointer advection.
4. Implement **GLASS LENS** with separate source pass and real lens sampling/drag elasticity.
5. Implement **SILK ATMOSPHERE**, **AURORA FIELD**, **CHROMATIC RIBBONS**, **BOKEH REACTOR**, **REFRACTION FIELD** using each distinctive technique above.
6. Wire complete switcher, transition renderer, responsive typography, entry choreography, keyboard/touch behavior, and Tune panel.
7. Implement real source-copy/export behavior and reuse documentation.
8. Build, test, inspect, fix, and make a final visual polish pass.

Do not spend all your available time only perfecting the first effect. Time-box sophistication if necessary but leave every effect genuinely implemented and differentiated. Fidelity of the first three effects has priority **within** the requirement that all eight work.

---

## 11. EXPLICIT TEST PLAN (PERFORM, DON'T JUST CLAIM)

### Functional checks

- [ ] `npm install` and `npm run build` succeed with no TypeScript errors.
- [ ] All eight selectors render visibly different real WebGL backgrounds.
- [ ] Each effect animates autonomously when idle, except with Pause/reduced motion.
- [ ] Each effect responds to pointer motion with a local, nontrivial deformation.
- [ ] Click produces an observable effect in each background.
- [ ] Touch controls work; sliders and normal buttons do not lose events.
- [ ] Interaction-strength slider from 0 to 100 changes actual simulation/forces.
- [ ] Motion-speed slider changes real ambient evolution speed.
- [ ] Pause freezes ambient motion; Resume continues without sudden time jump.
- [ ] Reset restores defaults and simulation state.
- [ ] Switching effects repeatedly leaves no missing materials or blank canvases.
- [ ] Copy snippet returns text that references actual source modules.
- [ ] ZIP contains real effect files and the required shared runtime, or any export limitation is prominently documented.

### Specific visual tests

- [ ] CHROMA FLUID: fast pointer stroke visibly advects colored flow that persists after release.
- [ ] FLUTED LIGHT: glass ribs genuinely refract the gradient and react to pointer lighting/dragging.
- [ ] GLASS LENS: source colors bend/magnify inside the lens; stretching and spring release work.
- [ ] SILK ATMOSPHERE: pointer changes fold geometry and light.
- [ ] AURORA FIELD: at least three layers move with different depth/lag.
- [ ] CHROMATIC RIBBONS: distinct 2.5D ribbon layers occlude and move at different depths.
- [ ] BOKEH REACTOR: glowing volumes physically move apart and settle.
- [ ] REFRACTION FIELD: facet normals/offsets respond and a click wave travels across neighbors.

### Device/layout checks

- [ ] Desktop 1440×900, laptop 1024×768, tablet 768×1024, mobile 390×844 and 320×640.
- [ ] No horizontal overflow. Hero headline never collides with dock or tuning controls.
- [ ] Keyboard Tab, Enter, Escape, reduced motion, touch drag, hidden-tab restore.
- [ ] Quality Low and Auto materially reduce GPU workload; no dead feature toggles.
- [ ] WebGL unavailable/error fallback preserves a beautiful, readable page.

### Verification reporting

If your environment has a browser/preview, inspect screenshots of at least the three flagship effects in idle and after pointer interaction at desktop and mobile widths. Fix observed problems. If browser automation is unavailable, do not claim to have visually verified the render; instead report exactly which builds/checks were run and what remains unverified.

---

## 12. SCORING RUBRIC — 100 POINTS

| Category | Weight | Pass criteria |
| --- | ---: | --- |
| Art direction and visual distinctiveness | 20 | Looks premium and non-generic; 8 separate identities |
| Real shader engineering | 25 | Fluid feedback, rib refraction, lens multi-pass, 5 other distinct effects |
| Cursor physics and interaction feel | 20 | Real forces, inertia, pointer velocity, touch, deliberate responses |
| Interface and motion choreography | 10 | Polished intro, elegant switching, typography, working controls |
| Code quality and portability | 10 | Modular engine, lifecycle, build, integration snippets/bundles |
| Performance and responsiveness | 10 | Tunable GPU load, useful mobile rendering, reduced motion |
| Testing and debugging integrity | 5 | Actual checks, honest failures, fixes, clear README |
| **TOTAL** | **100** | |

Severe failures: only one shader with eight palettes; cursor-following radial gradients; placeholders; all motion being opacity animation; dead export buttons; broken mobile interface; unsupported claims of working bundles; a full website built instead of the requested hero lab.

---

## 13. WHAT TO DELIVER

1. A complete, buildable, working React/TypeScript source project with **all eight Three.js effects**.
2. A single beautifully designed hero laboratory application with real controls and contextual descriptions.
3. A README explaining how to run, interact with, configure, and reuse each effect.
4. Working source-export or honest, clearly labeled integration mechanism.
5. A concise QA report: tests actually run, visual screenshots if truly available, known constraints, and performance decisions.

**Build the product now. Do not respond with a plan, a pseudocode sketch, a design-only screenshot, or a partial implementation.**

**North star:** *Eight living materials. One exceptional hero. Every pixel responds with intention.*
