# SpaceEdu redesign prompt (Three.js version)

Paste everything inside the block below into the agent. It is self-contained and does not depend on any skill. Run it from the worktree that holds the current `spaceedu` template (`codex-session-1026-318`).

This revision drops the "raw WebGL2 only" rule. It uses Three.js, which is already in `package.json` (`three` 0.186), plus the `three/addons` post-processing that other templates in the repo already use. It does not add React Three Fiber, because a single full-screen shader scene gains nothing from it and it is not installed.

````text
You are redesigning an existing Next.js landing-page template called SpaceEdu. The current version is a 2D fake: its fragment shader draws Gaussian bands and a hash-grid of stars, with no gravitational lensing, no 3D disk and no Doppler beaming. Replace it with a physically motivated real-time black hole rendered with Three.js, and make the whole page an interactive, scroll-driven lesson around it.

The goal is the best-looking, most realistic result achievable in a browser on a mid-range laptop. Realism comes from real physics, not from decoration. Use whatever libraries help, but the physics in section 2 is not negotiable.

═══════════════════════════════════════════════════════════════
0. GROUND RULES
═══════════════════════════════════════════════════════════════
- This repo uses a Next.js version with breaking changes. Read the relevant guides in `node_modules/next/dist/docs/` before writing Next code (see AGENTS.md).
- Work in place in `src/app/(spaceedu)/spaceedu/` (route group `(spaceedu)`, slug `spaceedu`). The template is already registered in `scripts/templates.config.ts`, `src/app/(index)/data/templates.ts` and the copy bundles. Keep the slug. Do not touch any other template.
- Stack: Three.js with `THREE.WebGLRenderer` (NOT WebGPU, for browser compatibility), driven imperatively from one client component. Post-processing from `three/addons/postprocessing/` (`EffectComposer`, `RenderPass` or `ShaderPass`, `UnrealBloomPass`, `OutputPass`). Look at how `(isobar)`, `(koji)`, `(trace)` and `(vector)` already import Three in this repo and match their conventions. Do not add React Three Fiber.
- `three` is 0.186. Read the installed package's types and check for deprecated APIs before using one from memory.
- Already-installed libraries you may use: `lenis` (smooth scroll), `gsap` with ScrollTrigger (chapter choreography), `motion`. Prefer CSS for simple transitions. Disable Lenis and all scroll-linked motion under `prefers-reduced-motion`.
- If your harness has skills for Three.js, shaders or GLSL, you may use them for API details. Where they conflict with section 2, section 2 wins.
- Folder isolation: the template imports only npm packages and files inside its own folder. No `@/` aliases.
- Remove the blanket `paletteExempt` for `SpaceEduExperience.tsx` in `scripts/templates.config.ts`. Register the real palette (3 to 8 colours, each with a role). Shaders use float `vec3` values and do not need exemption. Make tints with `color-mix()`, not new hex values.
- Fonts through `next/font/google` in `layout.tsx` with distinct variable names. Keep Prata (display), Hanken Grotesk (body) and Poppins (logo) unless you have a better reason.
- No `dangerouslySetInnerHTML`. No `document.querySelector` mutation of React-owned DOM. No `<br>` inside strings.
- Dispose of everything on unmount (geometries, materials, render targets, composer, event listeners). It must survive React Strict Mode double-mounting and route changes without leaking a WebGL context.
- No TODO, no placeholder sections, no "rest is similar". Do not stop until every requirement below is built or you have listed it under "Not done" with the reason.
- Do not commit or deploy.

═══════════════════════════════════════════════════════════════
1. CONCEPT
═══════════════════════════════════════════════════════════════
SpaceEdu is a course platform for astrophysics. "X, so the page does Y": the black hole is the page's backdrop for the whole scroll, and each section teaches one physical effect by letting the visitor see it, change it, and switch it off.

One fixed canvas sits behind the entire page. Scrolling flies the observer toward the hole. Every chapter changes the camera, the physics shown, and an interactive control.

Three objects, with real data. Fact-check against NASA, ESO and EHT sources before shipping, and keep the numbers in one typed table (`data/objects.ts`, with a test):

| | GAIA BH1 | CYGNUS X-1 | SGR A* |
|---|---|---|---|
| Mass | about 9.6 solar masses | about 21 solar masses | about 4.3 million solar masses |
| Schwarzschild radius | about 28 km | about 63 km | about 12.7 million km |
| Distance | about 1,560 light-years | about 7,200 light-years | about 26,700 light-years |
| Companion | Sun-like star, 186-day orbit | blue supergiant (HDE 226868), 5.6-day orbit | none |
| State | dormant, no bright disk | feeding, hot X-ray disk | low-luminosity flow, EHT-style ring |
| Palette | pale cyan, cold | electric blue-white | amber to crimson |

Realism note: Gaia BH1 is dormant. It does not have a bright accretion disk. Its default view is a black shadow, a lensed Milky Way band forming an Einstein ring, and the lensed double image of the companion star. The lab (chapter 5) has a "Feed it" control that adds a hypothetical disk, labelled as hypothetical.

═══════════════════════════════════════════════════════════════
2. THE RENDERER (Three.js, and the most important part)
═══════════════════════════════════════════════════════════════
2.1 Scene setup
- One `THREE.WebGLRenderer` on one fixed, full-viewport canvas (`position: fixed; inset: 0; z-index: 0`). The page content scrolls above it. `antialias: false` (the shader handles its own edges), `powerPreference: "high-performance"`, DPR capped at 1.5.
- The scene is a single full-screen triangle (`BufferGeometry` with 3 vertices, `frustumCulled = false`) with a `THREE.ShaderMaterial` (`glslVersion: THREE.GLSL3`, `depthTest: false`, `depthWrite: false`). The camera is not used for projection. The shader builds each pixel's ray from uniforms (`u_camPos`, `u_camBasis`, `u_fov`, `u_resolution`) that the CPU camera director writes.
- The two side black holes in the hero are NOT separate canvases. Each is a "view": a DOM placeholder whose `getBoundingClientRect()` is read each frame, and the renderer draws into that rectangle using `renderer.setScissorTest(true)`, `renderer.setViewport(...)` and `renderer.setScissor(...)`. Side views draw straight to the screen (after the composer), with fewer steps and a built-in tone-map, not through the full bloom chain. The DOM `<button>` sits over each for focus, hover and click.
- Handle `webglcontextlost` and `webglcontextrestored`. Pause the loop when the tab is hidden.

2.2 Ray tracing in curved spacetime (units: Schwarzschild radius Rs = 1)
- Trace one backward ray per pixel from the observer through Schwarzschild spacetime. Do not fake it with screen-space distortion.
- Use the conserved-angular-momentum form of the null geodesic in Cartesian coordinates: `h2 = dot(cross(pos, vel), cross(pos, vel))` is computed once per ray, and the acceleration is `a = -1.5 * h2 * pos / pow(r, 5.0)`. Renormalise `vel` each step.
- The physical landmarks must come out right and are testable:
  - event horizon at r = 1
  - photon sphere at r = 1.5
  - shadow radius (critical impact parameter) b = 1.5 * sqrt(3) = 2.598 Rs
  - weak-field deflection angle about 2 Rs / b for large b
  - the ISCO at r = 3

GLSL skeleton (adapt it; do not copy blindly, tune constants by eye):

```glsl
const float R_IN = 3.0;      // ISCO for Schwarzschild, in Rs
const float R_OUT = 14.0;

vec4 march(vec3 pos, vec3 vel, out vec3 escapeDir) {
  float h2 = dot(cross(pos, vel), cross(pos, vel));
  vec3 light = vec3(0.0);
  float trans = 1.0;
  escapeDir = vel;
  for (int i = 0; i < MAX_STEPS; i++) {
    float r2 = dot(pos, pos);
    float r = sqrt(r2);
    if (r < 1.0) { trans = 0.0; break; }                 // captured: pure black
    if (r > R_ESCAPE && dot(pos, vel) > 0.0) { escapeDir = vel; break; }
    float dt = clamp(STEP_K * (r - 0.9), DT_MIN, DT_MAX);  // small near the hole
    vec3 a = -1.5 * h2 * pos / (r2 * r2 * r);
    vel = normalize(vel + a * dt);
    vec3 prev = pos;
    pos += vel * dt;
    if (prev.y * pos.y < 0.0) {                           // crossed the disk plane (y = 0)
      float t = prev.y / (prev.y - pos.y);
      vec3 p = mix(prev, pos, t);
      float rr = length(p.xz);
      if (rr > R_IN && rr < R_OUT) {
        vec4 d = diskSample(p, vel);                       // rgb emission, a opacity
        light += trans * d.rgb;
        trans *= 1.0 - d.a;
      }
    }
  }
  return vec4(light, trans);
}
```

Because the ray can cross the disk plane more than once, the secondary image (the disk seen "over the top and under the bottom" of the shadow) and the thin higher-order rings appear without any special case. This is what makes it look real. Keep it.

2.3 The accretion disk (`diskSample`)
- Temperature profile: `T = T_IN * pow(r / R_IN, -0.75) * pow(max(1.0 - sqrt(R_IN / r), 0.0), 0.25)`.
- Orbital velocity seen by a static observer: `v = sqrt(0.5 / max(r - 1.0, 0.05))`, direction tangential and prograde.
- Doppler factor: `delta = 1.0 / (gamma * (1.0 - dot(beta, n)))`, where `beta = v * tangent`, `gamma = inversesqrt(1.0 - v*v)`, and `n = -vel` (the photon's travel direction toward the observer).
- Gravitational redshift: `grav = sqrt(max(1.0 - 1.0 / r, 0.0))`.
- Total shift `g = delta * grav`. Observed temperature is `T * g`; observed intensity scales as `g^3` to `g^4`. The approaching side must be visibly brighter AND bluer, the receding side dimmer AND redder. This is the signature asymmetry; verify it by eye and in a screenshot test.
- Colour from a blackbody lookup (a 256 by 1 `THREE.DataTexture`, `HalfFloatType` or `RGBA8`) generated once on the CPU (Planck curve through an approximate CIE-to-sRGB conversion). Do not hand-pick two palette colours and mix them. Keep the shader's working space linear and let `OutputPass` do the sRGB conversion.
- Turbulence: differential rotation. Sample 3D noise at `(cos(phi'), sin(phi'), log(r))` with `phi' = phi - omega(r) * time` and `omega(r) = k * pow(r, -1.5)`. Inner material then shears past outer material the way a Keplerian disk does. Use 3 to 4 octaves, with fine detail damped by distance to avoid shimmer.
- Disk thickness: tier A is a thin disk with a soft vertical falloff. Tier B (when the frame budget allows) steps through a thin volume (`|y| < 3 H(r)`) with density `exp(-y*y / (2*H*H)) * noise`.
- Soft inner edge at the ISCO. Slight brightening of the photon ring from the beaming of the lensed images.

2.4 Background sky
- Build a procedural star and Milky Way cubemap ONCE at load into a `THREE.WebGLCubeRenderTarget` (1024 px per face, `HalfFloatType`, mipmaps on, `LinearMipmapLinearFilter`), by rendering a sky shader with a `THREE.CubeCamera`. Content: star magnitudes from a power-law distribution, spectral colours (blue-white to orange), a galactic band from fbm noise along a tilted plane, and faint dust lanes. Pass `renderTarget.texture` to the main shader as a `samplerCube`.
- Sample it with the final escaped ray direction, using `textureLod(u_sky, dir, lod)` with a LOD derived from how much the lensing compresses neighbouring rays (finite difference of the escape direction between neighbouring pixels via `dFdx`/`dFdy`, or a cheap analytic estimate). This is what stops lensed stars from aliasing into noise.
- Never use screen-space hash stars. Stars must bend, stretch into arcs and form the Einstein ring.
- Gaia BH1 and Cygnus X-1: add the companion star as a bright sphere on a slow orbit (scale-compressed, labelled in the UI as such), so its lensed double image is visible.

2.5 Post-processing (HDR pipeline, using Three's addons)
- `EffectComposer` with a `HalfFloatType` render target. Passes: the scene pass, `UnrealBloomPass` (tune strength, radius and threshold so the photon ring and the beamed disk edge glow softly without washing out), then `OutputPass` with ACES filmic or AgX tone mapping (`renderer.toneMapping`, `toneMappingExposure` driven by the scroll director).
- A final small custom `ShaderPass` for: dithering (to remove banding in the dark gradients), subtle radial chromatic aberration near the screen edges, film grain tied to exposure, and a vignette. No lens-flare spam.
- Optional if the budget allows: temporal accumulation when the camera is still, to clean up noise.

2.6 Performance contract
- Target 60 fps at 1440 by 900 on integrated graphics. Adaptive scale from a rolling frame-time average, changed in steps (0.5, 0.65, 0.8, 1.0) with hysteresis, never every frame. Step budget: main view 96 steps, side views 48 steps, phones 48 steps at 0.5 scale.
- Side views on touch devices refresh at 15 fps.
- A `quality.ts` module owns the tier decision. It is pure and tested.
- LCP must be text, not the canvas. Start building the cubemap and compiling shaders when the browser is idle (use `renderer.compileAsync` where available). Show a CSS-only fallback (below) until the first frame is drawn, then cross-fade.
- Do not import Three in a server component. Load the engine with a dynamic import after hydration.

═══════════════════════════════════════════════════════════════
3. THE SCROLL STORY (observer flight)
═══════════════════════════════════════════════════════════════
Lenis provides the smooth scroll. A single `progress` value 0 to 1 (from ScrollTrigger or Lenis) drives a camera spline defined in `director/keyframes.ts` (distance in Rs, inclination, azimuth, exposure, time scale). Use a critically damped spring so the camera never snaps. Write scroll and pointer values to CSS custom properties and to the engine from one rAF loop, never to React state.

| Chapter | Content | Camera | Physics shown | Interaction |
|---|---|---|---|---|
| 0. Hero | Eyebrow "SINGULARITY", object name, lede, "Get started", two side holes | 40 Rs, inclination 80 degrees (near edge-on), slow idle drift | the full lensed disk or Einstein ring | pointer parallax, drag-to-orbit, click a side hole to swap |
| 1. Light takes the long way | 3-line explanation | 25 Rs, raises to 60 degrees | lensing | ray-path overlay: an SVG diagram of rays computed on the CPU by the same integrator (TypeScript port), the cursor sets the impact parameter, and the path bends live. Readout of b / Rs and the 2.598 limit |
| 2. The ring that isn't a ring | Doppler and beaming | 14 Rs, 70 degrees | beaming and redshift | draggable compare divider: left of it `u_gr = 0` (flat space, unbent), right of it full GR. Second toggle: "Doppler beaming on/off" |
| 3. Time runs slow | Time dilation | descends from 14 Rs to 3 Rs | gravitational redshift | two clocks, "far" and "near", tick at `sqrt(1 - 1/r)` of each other. The scene time-scale, the text letter-spacing and a colour shift follow the same value. Live observer HUD |
| 4. Pick your object | Three comparison cards | pulls back to 30 Rs | object swap | scrubbable size comparison of Rs against a city, Earth and the Solar System. Cards count up their data when revealed |
| 5. The lab | Sliders | free camera | everything | sliders (real `<input type="range">`): mass scale, inclination, disk temperature, observer distance. Toggles: lensing, beaming, redshift, "Feed it" (Gaia BH1 only) |
| 6. Syllabus | Course modules | 50 Rs, slow | calm | accordion with animated height via `grid-template-rows` |
| 7. Enroll | Email form | 40 Rs | a ring pulse | success state fires an expanding ring pulse through the scene (a shader uniform) and swaps the form for a confirmation |

3.1 Swapping the featured object (hero, and the cards)
- The three objects are a typed parameter set (mass scale, disk inner temperature, disk presence, disk thickness, jet strength, palette temperature bias, companion, default inclination). Switching tweens EVERY parameter with per-parameter springs on the CPU and passes the current values as uniforms. Never blend by an object index.
- Sequence (about 800 ms, fully interruptible): the outgoing disk dims, the camera dollies in 6 percent while a short radial lens-warp pulse plays, the parameters spring to the new object, the camera settles. The headline uses a mask-rise swap. The side holes re-fill with the other two, each a cross-fade, not a cut.
- The three choices are a `role="radiogroup"` with arrow-key support.

═══════════════════════════════════════════════════════════════
4. DOM, MOTION AND INTERACTION
═══════════════════════════════════════════════════════════════
Motion identity: technical / cinematic. Verbs: scan, focus-pull. Easing from tokens in `@theme`, never inline `cubic-bezier()` or raw millisecond values in components. Animate `transform`, `opacity` and `clip-path` only. Reversible motion is interruptible (CSS transitions keyed on `data-state`).

- Hero load choreography (about 1.4 s): canvas fades up from black while exposure rises, nav items slide in staggered, the eyebrow, title and lede mask-rise, the rule draws, the CTA wipes in, the side holes fade in last. No flash of hidden content and CLS 0.
- At least four distinct reveal types across the page: mask-rise text, clip-path wipe, drawn line, staggered cascade, count-up. Opacity alone never counts.
- Reactive header: hides on scroll down, returns on scroll up, gains a backdrop at depth.
- A scroll progress rail on the right edge, drawn as a vertical trajectory labelled with the current distance in Rs. Chapter ticks are clickable and scroll there.
- Every interactive element has hover, focus-visible, pressed and disabled states. Buttons respond to the press (scale 0.98). Cards lift and their border light follows the pointer. The side holes grow 4.5 percent on hover and brighten their lensing.
- Drag to orbit on the hero and lab (pointer events, inertia, clamp the inclination), with `touch-action: pan-y` so vertical page scrolling still works on phones. Wheel and trackpad scrolling are never hijacked.
- Ambient life, at most three continuous animations in view: the disk rotation, a slow camera drift and the live HUD readout.
- One signature moment: the chapter 3 descent, where the page's own time slows with the scene.
- Pre-reveal hidden states apply only under `prefers-reduced-motion: no-preference`, with a `<noscript>` override, so no-JS and reduced-motion users see a finished page.
- Hover and pointer effects live in `@media (hover: hover) and (pointer: fine)`. On touch, give them in-view equivalents.

═══════════════════════════════════════════════════════════════
5. FALLBACKS, REDUCED MOTION, ACCESSIBILITY
═══════════════════════════════════════════════════════════════
- `prefers-reduced-motion: reduce`: render ONE still frame at the default camera (no loop, no Lenis, no parallax, no ambient motion). All content is visible. Lab sliders still re-render on input because that is user-initiated. The animated path is never mounted, and a test proves it.
- No WebGL2: a CSS-only fallback (conic and radial gradients forming a lensed ring and a tilted disk with a dark core) in the same palette. The page stays fully readable.
- The canvas is `aria-hidden`. Each chapter has a plain-text description of what the visual shows. One `h1`, logical headings, landmarks, `lang` on `<html>`, AA contrast, visible focus rings.
- The observer HUD updates visually only. Announce chapter changes through a single `aria-live="polite"` region (chapter name only, not per-frame values).
- Animated numbers keep their final value in a visually hidden span.
- Space and Enter are never stolen from buttons, links or form fields.

═══════════════════════════════════════════════════════════════
6. FILE STRUCTURE (target 30 to 45 files)
═══════════════════════════════════════════════════════════════
```
src/app/(spaceedu)/spaceedu/
  page.tsx                 server component, composes chapters
  spaceedu.css             @import "tailwindcss"; @theme tokens, then prefixed classes
  DESIGN.md                concept, palette, type, physics notes, motion map, files
  PROMPT.md                a rebuild brief written AFTER the build (not a copy of this prompt)
  opengraph-image.tsx      1200x630, brand palette only
  icon.svg
  brand/                   Logo.tsx
  data/                    objects.ts (+ test), chapters.ts, syllabus.ts
  render/                  engine.ts (renderer, loop, views, dispose), post.ts (composer + final pass),
                           sky-cubemap.ts, blackbody.ts (+ test), quality.ts (+ test),
                           shaders/{vertex,scene,sky,post}.glsl.ts
  physics/                 geodesic.ts (CPU reference integrator, + test), kinematics.ts (+ test)
  director/                keyframes.ts, camera.ts (spring, + test), scroll.ts (+ test)
  motion/                  Reveal, SplitText, CountUp, Magnetic, math.ts (+ test)
  chapters/                Hero, Lensing, Beaming, TimeDilation, Objects, Lab, Syllabus, Enroll
  ui/                      Header, ProgressRail, Hud, Compare, Accordion, Fallback, SceneCanvas
  forms/                   validation.ts (+ test), EnrollForm
```
Pure logic is in plain `.ts` files with tests beside them. The shader strings are TypeScript template literals in `.glsl.ts` files, so they are importable, greppable and testable. `SceneCanvas` is the only client component that touches Three.

═══════════════════════════════════════════════════════════════
7. TESTS (all must pass)
═══════════════════════════════════════════════════════════════
Unit (Vitest):
- `geodesic.ts`: the critical impact parameter is within 1 percent of 2.598 Rs; rays with b below it are captured and rays above it escape; weak-field deflection is within 5 percent of `2 / b` at b = 30.
- `kinematics.ts`: the redshift factor is 0 at the horizon and tends to 1 far away; the Doppler factor is above 1 on the approaching side and below 1 on the receding side; the tick-rate ratio is `sqrt(1 - 1/r)`.
- `blackbody.ts`: colour temperature is monotonic from red through white to blue; no NaNs.
- `camera.ts`, `scroll.ts`, `quality.ts`, `motion/math.ts`, `data/objects.ts`, `forms/validation.ts`.
- Do not import Three in unit tests of pure modules.

End to end (Playwright, `tests/e2e/spaceedu.spec.ts`):
- The hero renders and the canvas is not blank (screenshot luminance has real variance, not flat black).
- Swapping the featured object changes the headline and the canvas pixels, and is interruptible.
- The lab sliders and the beaming toggle change the canvas pixels.
- The compare divider moves with keyboard and pointer.
- The enroll form validates and shows the success state.
- Reduced motion: every reveal element is visible and no animation loop mounts.
- Navigating away and back does not leave more than one WebGL context.
- 375 px viewport: no horizontal overflow, nothing depends on hover.
- Add `/spaceedu` to `TEMPLATE_PATHS` in `tests/e2e/templates.ts` if it is not there already.
- Headless Chromium needs software GL (SwiftShader or ANGLE flags) for WebGL. Render at a low scale in tests.

Run and read the output of: `npm run check`, `npm test`, `npx tsc --noEmit`, `npx playwright test`. Report each result honestly, and say "not run" for anything you did not run.

═══════════════════════════════════════════════════════════════
8. VISUAL VERIFICATION (do this before saying you are done)
═══════════════════════════════════════════════════════════════
Run the page and look at it. Capture screenshots at 1440 by 900 and 390 by 844, at scroll 0, 15, 35, 50, 70 and 100 percent, for each of the three objects at the hero, and one with lensing switched off. Check:
- the Einstein ring is visible and the stars near it are arcs, not points
- the secondary image of the disk is visible over and under the shadow
- the approaching side of the disk is brighter and bluer than the receding side
- the shadow edge is crisp and the photon ring is thin and bright
- bloom is soft, and the dark areas are clean with no banding
- no shimmering or crawling noise on a still camera
- no stretched pixels or seams on the sky cubemap
If any of these is wrong, fix the shader before building more UI. A beautiful page around a fake black hole is a failed task.

═══════════════════════════════════════════════════════════════
9. WORK ORDER AND REPORTING
═══════════════════════════════════════════════════════════════
Build in this order and verify after each step (a screenshot for 1 to 4, tests for the rest):
1. `physics/` and its tests, then `render/engine.ts` with the single-view black hole and sky cubemap.
2. Disk shading, blackbody lookup, Doppler and redshift.
3. Composer: bloom, tone mapping, the final grain and dither pass, adaptive quality.
4. The scroll director, camera spring, Lenis and the CSS-variable bridge.
5. Hero, object swap, and the side views.
6. Chapters 1 to 7 with their interactions.
7. Fallbacks, reduced motion, accessibility, DESIGN.md, PROMPT.md, OG image and icon.
8. Tests, then the full verification run.

Keep a running log at `.openlanding-page/spaceedu/RUN-LOG.md` (outside the template): files read, steps finished, decisions, anything you could not do.

FINAL REPORT (only this): the last step completed; `ls -R` of the template folder with a `wc -l` total; the result of each command in section 7; a list of screenshots you reviewed and what you saw in them; each section 8 check marked pass or fail; and a "Not done" list with reasons.
````

## What changed from the raw-WebGL version

| Area | Before | Now |
|---|---|---|
| Renderer | Hand-written WebGL2 context, programs and framebuffers | `THREE.WebGLRenderer` and a full-screen `ShaderMaterial` |
| Post-processing | Hand-built bloom chain and tone mapping | `EffectComposer`, `UnrealBloomPass`, `OutputPass`, plus one small custom grain/dither pass |
| Sky cubemap | Raw cubemap framebuffer code | `WebGLCubeRenderTarget` and `CubeCamera` |
| Side black holes | Scissored views via raw `gl` calls | Scissored views via `renderer.setScissor` and `setViewport` |
| Smooth scroll and choreography | Hand-written | `lenis` and `gsap` ScrollTrigger, which are already in `package.json` |
| Unchanged | | All physics (geodesics, disk shading, Doppler, redshift), the 8 chapters, the tests with numeric targets, and the screenshot checks |

## Notes

- Three.js removes most of the plumbing, but the black hole itself is still a custom shader. Three has no built-in black hole, so the physics section is as important as before.
- I did not add React Three Fiber. It is not installed in this repo, and the scene is one full-screen shader quad.
- The physics numbers (mass, distance, orbit period) come from my recollection of published values. The prompt tells the agent to fact-check them, and you should spot-check the final copy.
- The geodesic form is a standard non-spinning (Schwarzschild) approximation. It does not model black-hole spin.
- Tier B (volumetric disk) and temporal accumulation are optional and are the first things to cut.
