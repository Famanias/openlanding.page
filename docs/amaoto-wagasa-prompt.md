# AMAOTO: wagasa hero template (built with img2threejs)

Prerequisites:
- img2threejs is installed (`npx --yes img2threejs@latest doctor` shows your agent as "managed"), and you restarted the agent so it loads the skill.
- Python 3.10+ is on PATH. On this machine `python` and `py -3` work, but `python3` does not (it hits the Microsoft Store alias).

---

````text
Build a new landing-page template called AMAOTO (雨音, "the sound of rain"), a fictional wagasa (oil-paper umbrella) atelier. The hero 3D model must be reconstructed from reference images with the `img2threejs` skill, then used as the centrepiece of a scroll-driven, interactive Next.js page.

This is a one-shot run. Do not ask me questions. Where a skill or file says to ask or wait for approval, decide yourself and record "your call" in the run log.

═══════════════════════════════════════════════════════════════
0. GROUND RULES
═══════════════════════════════════════════════════════════════
- Use the `img2threejs` skill for the model. Read its SKILL.md first, then read each file it names at the stage that needs it (not all up front). Obey `python forge/next.py` hard stops. Never reconstruct progress from memory.
- The skill's scripts are Python 3.10+. If `python3` is not available use `python` or `py -3`. Run them from the skill root (`~/.codex/skills/img2threejs`, or whichever host path you were given). Keep the reconstruction state in `.img2threejs/state.json` inside the project, and all scratch files in `.openlanding-page/amaoto/` (never in `scripts/`, the repo root, or the template folder).
- For repo wiring, the quality bar and the motion rules, read `skills/create-landing-template/` in this repo (`repo-wiring.md`, `quality-bar.md`, `motion-system.md`, `media.md`). Follow them, EXCEPT skip every "ask the user" step and the brand-board approval gate. This prompt replaces those steps.
- This repo uses a Next.js version with breaking changes. Read the relevant guides in `node_modules/next/dist/docs/` before writing Next code (see AGENTS.md).
- Template location: `src/app/(amaoto)/amaoto/`, slug `amaoto`, CSS prefix `am`. Register it in all the places `repo-wiring.md` lists, and run the tests afterwards, because hard-coded counts in the tests will fail until updated. Do not touch any other template.
- Three.js with `WebGLRenderer` only. `three` and `three/addons` are already installed. Do not add React Three Fiber. `lenis` and `gsap` are installed and may be used.
- Folder isolation: the template imports only npm packages and files inside its own folder. No `@/` aliases. The generated model factory lives inside the template folder and imports only `three`.
- No TODO, no placeholders, no "rest is similar". If the skill reports "cannot reach the requested fidelity from this image", say so and continue with the best honest result. Do not fake a pass.
- Do not commit or deploy.

═══════════════════════════════════════════════════════════════
1. INPUTS (already prepared)
═══════════════════════════════════════════════════════════════
Reference images are in `assets/incoming/amaoto/ref/`:
- `wagasa-open-3q.png`: PRIMARY reference. Pass this to `forge/state.py init --reference`.
- `wagasa-underside.png`: rib, stretcher and runner structure. Use it as supporting evidence for the structural pass and for crops in material analysis.
- `wagasa-closed-side.png`: the closed state. Use it to verify the folded pose.
- `wagasa-handle-detail.png`: macro crop for the handle, runner ring and knots.

If any file is missing, stop and report which ones. Do not substitute a stock image or download art.

Intended use (give this to the skill as the stated purpose): "hero render and interactive real-time browser prop with a mechanical open/close articulation (not a character rig), exploded view and clickable parts, no more than about 60,000 triangles". Use profile `generic`.

═══════════════════════════════════════════════════════════════
2. THE MODEL (img2threejs)
═══════════════════════════════════════════════════════════════
Run the skill's workflow in order. The points below are the decisions it will ask you for. Record them in the spec.

Complexity: `complex`. Identity-defining features (each must map to a `localFeatures` or `material.localOverrides` entry, not to prose):
1. Radial bamboo ribs, about 36 to 40 of them, evenly spaced, slightly bowed, with visible nodes.
2. Washi paper canopy: a shallow dome with a scalloped-free rounded rim, paper stretched taut between ribs (each gore is a slightly concave panel, so the ribs read as ridges).
3. Thread lacing: dark thread weaving between ribs in rings near the rim and mid-canopy, visible on the outer face at the rim and on the underside.
4. Inner stretchers: one per rib, hinged at the rib and at the runner ring.
5. Runner ring (the sliding wooden hub on the shaft) that moves along the shaft as the umbrella opens and closes, and a latch that holds it open.
6. Turned bamboo handle and shaft with node rings, and a small wooden top cap.
7. Painted motif: a ring of small cherry-blossom marks near the rim (texture or vertex-painted regions per the skill's rules, not floating geometry).

Articulation (this is the signature mechanic). Build the hierarchy with real pivots so a single parameter `open` from 0 to 1 drives everything:
- Each rib pivots at the top cap. Each stretcher pivots at the rib and at the runner ring.
- The runner ring translates along the shaft from the closed to the open position.
- The paper canopy deforms with the ribs. When closed it forms neat pleats wrapped around the bundled ribs. When open it is a taut dome. Implement this with a vertex displacement in the model's material or geometry (a `morph`/`displace` driven by `open`), not by swapping meshes.
- Expose it as `model.userData.sculptRuntime.setOpen(t: number)` (or the skill's equivalent), plus `setExplode(t: number)` for the exploded view. Both must be pure functions of their argument, with no hidden time dependence.
- Verify `open = 0`, `0.5` and `1` against reference images 3 and 1 with screenshots. The intermediate pose must look physically plausible (ribs, stretchers and runner ring consistent with each other).

Materials (PBR terms, no textures downloaded):
- Washi paper: warm off-white, rough, thin, translucent. Implement the backlit glow as follows: a `MeshPhysicalMaterial` with high roughness, low `transmission` plus a `thickness`, or an `onBeforeCompile` that adds a light-through-paper term based on the angle between the surface normal and a light direction uniform (`uBackLight`), so the canopy glows when a light sits behind or above it. Generate the paper fibre detail as a small canvas texture (deterministic seed).
- Bamboo: golden-green to amber, low gloss, visible nodes, subtle longitudinal grain.
- Runner ring and latch: darker polished wood.
- Thread: near-black matte.
- Follow the skill's material evidence steps with crops from the reference images. Confidence under 0.7 is a refine signal, not a pass.

Gates you must actually run and read (do not skip any):
- the strict spec validation (`--strict-quality`) before generating code
- the locked build passes, reviewed one at a time
- the render, the comparison sheet, and the review record for each pass
- the turntable gate with four views (0, 90, 180, 270 degrees), the self-intersection gate and the attachment-anchor gate
- `check_part_coverage.py`: every part must be both explodable and clickable
- the correction budget (3 per pass, 6 total). If you hit a hard stop, report it and finish with what exists.

State clearly in the final report which parts are accurate, which are approximate, and which are guesses (the single views cannot show everything).

Output files:
- `src/app/(amaoto)/amaoto/model/createWagasaModel.ts` (the factory), plus the spec JSON and the part manifest next to it.
- The factory returns a `THREE.Group`. Keep reconstruction data separate from renderer objects. All procedural noise uses fixed seeds.
- Merge or instance repeated geometry (ribs, stretchers, thread segments) so the whole model is under about 60 draw calls.

═══════════════════════════════════════════════════════════════
3. THE PAGE
═══════════════════════════════════════════════════════════════
Concept: "X, so the page does Y". A wagasa opens like a flower as you scroll, and each section lets you see one thing about how it is made.

Brand: AMAOTO, a small atelier that makes wagasa to commission. Invent specifics (an invented workshop town, number of making steps, rib counts, lead times). Never copy a real brand's name or trade dress. Use concrete numbers in the copy.

Palette (register in `scripts/templates.config.ts`; make tints with `color-mix()`, not new hex values):
- sumi ink `#1A1613` (text, dark slabs)
- washi cream `#F4ECDD` (paper background)
- sakura `#F2B8C6` (restrained, accents and petals)
- deep sakura `#D9748F` (rare emphasis)
- vermilion `#C8412B` (the hanko seal and the primary button only)
- gold `#B8923A` (hairlines, small details)
- indigo `#2B3A55` (the dusk section and the second canopy colourway)

Type via `next/font/google`, distinct variable names, `preload: false` for the Japanese families: display `Shippori_Mincho`, body `Zen_Kaku_Gothic_New`, labels `DM_Mono`. Large fluid sizes with `clamp()`. Use a vertical line of Japanese text (`writing-mode: vertical-rl`) in the hero.

Signature details (at least three, recurring): a red hanko seal mark, hairline gold rules with small tick marks, a live "ribs open" counter, and an indigo thread-line that draws between sections.

Sections and scroll map. The 3D canvas is one fixed layer behind the content; scrolling drives `open`, `explode`, the camera and the light.

| # | Section | What scroll does | Interaction |
|---|---|---|---|
| 0 | Hero: 「雨音」, "The sound of rain, kept dry." Eyebrow "Wagasa atelier". CTA "Reserve a commission" | The umbrella starts CLOSED and slowly turning. Over the first 25 percent of scroll it opens (`open` 0 to 1) while the camera dollies back and the petals gather around it | Drag to spin. Pointer acts as wind on the petals. Click the runner ring to toggle open and close |
| 1 | "Forty ribs, one breath": the structure | The umbrella lifts apart (`explode` 0 to 1): paper, ribs, stretchers, runner ring, handle separate along the axis, with callout labels drawn by hairlines | Click any part for a name and a one-line description (bamboo ribs, stretchers, runner ring, thread, paper, handle) |
| 2 | "Paper that listens to light": translucency | The camera moves underneath and looks up into the canopy | A sun-angle slider (real `<input type="range">`) moves a light behind the canopy and the paper glows. A "rain" toggle adds rain, ripples and a soft patter |
| 3 | "Choose your canopy": configurator | The umbrella settles at a three-quarter view | Pick a colourway (cream with sakura, indigo, vermilion, undyed) and a motif (sakura ring, wave, plain). The material updates live. Selection persists into the form |
| 4 | "Eighty-one steps": the making | A horizontal timeline of the steps scrubs with scroll while the umbrella slowly closes and opens | Hover or tab a step to focus it |
| 5 | "Commission": form with name, email, canopy choice, occasion | Camera pulls back to a dusk composition (indigo background, lantern-warm light) | Validates on the client. Success: the umbrella closes, a flurry of petals leaves, and the form is replaced by a confirmation with the chosen canopy |

Petals (a distinct system, build it well):
- GPU-instanced curved petal quads (a gently bent shape, not flat squares), 600 to 1200 on desktop, 250 on phones.
- Motion from a curl-noise wind field plus gravity and tumbling (each petal has its own flutter frequency and rotation axis). The cursor adds a local gust.
- Petals are translucent and light up when backlit.
- Depth of field is faked in the petal shader: petals far from the focal plane get larger, softer and more transparent.
- Tier 2 (build it if the budget allows): petals that reach the canopy surface (use an analytic cap shape for the test) slow down, slide along the surface and fall off the rim.
- The petal simulation (wind, spawn, recycle) is pure functions with unit tests.

Light and look:
- No external HDRI files. Use `RoomEnvironment` or a procedural gradient through `PMREMGenerator` for image-based light. Soft overcast key light, warm rim, and a point light inside the canopy for the glow.
- Post: gentle bloom, ACES or AgX tone mapping, subtle grain. No heavy effects.
- Background: a soft washi-cream to dusk gradient with 3 to 4 layers of ink-wash branch silhouettes (SVG) at different parallax speeds, with a few in front of the canvas. All branches are drawn in code (no downloaded images).

Scroll and motion (follow `motion-system.md`; the personality is "soft / luxurious", with the verbs "drift" and "unfurl"):
- Smooth scroll with Lenis, disabled under reduced motion. All scroll and pointer values go through one rAF loop into CSS custom properties and the engine, never through React state.
- Hero load choreography: the canvas fades up, the vertical Japanese line draws in, the headline mask-rises, the seal stamps, the CTA wipes in, and the petals start last. No flash of hidden content and CLS 0.
- At least four distinct reveal types. Every interactive element has hover, focus-visible, pressed and disabled states. A reactive header, and a progress element drawn as the thread-line.
- Pre-reveal hidden states apply only under `prefers-reduced-motion: no-preference`, with a `<noscript>` override.

Fallbacks and accessibility:
- Reduced motion: render ONE still frame (umbrella open at about 0.85, a few static petals), no loop, no Lenis, no parallax. All content visible. The sliders and the configurator still update the scene on input.
- No WebGL, or while loading: a poster. Capture a frame of the finished scene into `public/templates/amaoto/` (run `npm run images -- amaoto` if the repo's flow needs it) and use it as the LCP-safe fallback. The LCP element is text or the poster, never the canvas.
- The canvas is `aria-hidden`. Every part click, slider and toggle has a text equivalent. One `h1`, logical headings, landmarks, `lang` on `<html>`, AA contrast, visible focus. The part callouts are real buttons.
- Touch: `touch-action: pan-y` on the canvas so vertical scroll still works. No hover-only interactions.
- Performance: DPR capped at 1.5, adaptive petal count, pause when hidden, dispose everything on unmount, safe under React Strict Mode.

═══════════════════════════════════════════════════════════════
4. FILE STRUCTURE (target 30 to 45 files)
═══════════════════════════════════════════════════════════════
```
src/app/(amaoto)/amaoto/
  page.tsx  amaoto.css  DESIGN.md  PROMPT.md  icon.svg  opengraph-image.tsx
  brand/        Logo.tsx, Hanko.tsx
  data/         steps.ts, parts.ts, colourways.ts, copy.ts (typed, tested)
  model/        createWagasaModel.ts, spec.json, parts.json  (img2threejs output)
  scene/        engine.ts, camera-director.ts, lighting.ts, post.ts, materials-live.ts
  petals/       wind.ts (+ test), spawn.ts (+ test), petals.ts, shaders/*.glsl.ts
  director/     keyframes.ts, scroll.ts (+ test)
  motion/       Reveal, SplitText, Magnetic, math.ts (+ test)
  sections/     Hero, Structure, Light, Canopy, Making, Commission
  ui/           Header, PartCallout, Slider, ThreadLine, Poster
  forms/        validation.ts (+ test), CommissionForm
```
Pure logic lives in `.ts` files with tests beside them. Only one client component touches Three.

═══════════════════════════════════════════════════════════════
5. TESTS (all must pass)
═══════════════════════════════════════════════════════════════
Unit (Vitest): `open` and `explode` are pure and monotonic, and `setOpen(0)` and `setOpen(1)` are reproducible; the parts manifest covers every mesh; the petal wind field is deterministic for a given seed and never produces NaN; `data/*`; `forms/validation`; `scroll`; `motion/math`.

End to end (Playwright, `tests/e2e/amaoto.spec.ts`):
- The canvas is not blank (screenshot luminance has real variance).
- Scrolling changes the canvas pixels between 0 and 25 percent.
- Clicking a part shows its callout. The sun-angle slider and the configurator change the canvas pixels.
- The form validates and shows the success state.
- Reduced motion: every reveal element is visible and no animation loop mounts.
- Navigating away and back leaves at most one WebGL context.
- 375 px viewport: no horizontal overflow, nothing depends on hover.
- Add `/amaoto` to `TEMPLATE_PATHS` in `tests/e2e/templates.ts`.
- Headless Chromium needs software GL (SwiftShader or ANGLE flags). Render at low scale in tests.

Run and read the output of `npm run check`, `npm test`, `npx tsc --noEmit`, `npx playwright test`, and mobile Lighthouse (performance at least 90, accessibility at least 95, best practices 100). Report each result honestly. Say "not run" for anything you did not run.

═══════════════════════════════════════════════════════════════
6. VISUAL VERIFICATION (before you say you are done)
═══════════════════════════════════════════════════════════════
Run the page and look at it. Capture screenshots at 1440 by 900 and 390 by 844 at scroll 0, 12, 25, 45, 65, 85 and 100 percent. Check:
- the umbrella reads as a wagasa: radial ribs, taut paper, visible thread, runner ring in a plausible place
- the closed pose has real pleats, and the open pose does not show ribs poking through the paper
- the paper glows when backlit (compare the sun-angle slider at both ends)
- petals have depth: near ones blurred and larger, far ones small and faint
- the exploded view separates parts cleanly with no parts floating off-axis
- no banding in the gradient, no shimmering on a still camera, no z-fighting between paper and ribs
If any of these fail, fix the model or shader before building more UI. A beautiful page around a bad model is a failed task.

═══════════════════════════════════════════════════════════════
7. WORK ORDER AND REPORTING
═══════════════════════════════════════════════════════════════
1. Read the skill and run its state init and `next.py`. Analyse the images. Write the assessment, the detail inventory and the spec. Validate in strict mode.
2. Build the model pass by pass with the review loop. Get `setOpen` and `setExplode` working and verified before any page work.
3. Scene engine: lighting, post, camera director, live materials.
4. Petals.
5. Scroll director and the CSS-variable bridge.
6. Sections in order 0 to 5, each with its interaction.
7. Fallbacks, reduced motion, accessibility, poster, DESIGN.md, PROMPT.md, OG image, icon, registration.
8. Tests, then the full verification run.

Keep a running log at `.openlanding-page/amaoto/RUN-LOG.md`: files read, steps finished, decisions ("your call"), anything you could not do, and every img2threejs gate result.

FINAL REPORT (only this): the last step completed; the `next.py` status and the correction count used; `ls -R` of the template folder with a `wc -l` total; the triangle count and draw-call count of the model; the result of each command in section 5; the screenshots you reviewed and what you saw; each section 6 check marked pass or fail; which model parts are accurate, approximate or guessed; and a "Not done" list with reasons.
````

---

## Notes

- **Cost.** img2threejs is a long, gated process (state file, per-pass renders, comparison sheets, a correction budget). Expect a long run. If you want a cheaper test, ask the agent to stop after step 2 (the model and `setOpen`) and judge the umbrella before building the page.
- **The model is the risk.** The skill is strongest on hard-surface parts, and the ribs, stretchers, runner ring and handle fit that. The paper canopy (the pleats, the stretch, the glow) is the part most likely to come out approximate. The prompt makes the agent report accuracy honestly instead of claiming a pass.
- **Wagasa terms.** The part names (runner ring, stretchers, top cap) are plain-English labels. If you want the Japanese terms in the copy, check them with a native speaker or a wagasa maker's site before shipping.
- **Invented facts.** "Eighty-one steps", "forty ribs" and the workshop town are placeholders to give the copy concrete numbers. Change them as you like.
- **First run.** Do Part A before anything else. A weak reference image (heavy pattern, cropped, odd perspective) is the most common reason the skill stops or scores low.
