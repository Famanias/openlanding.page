# LOWTIDE landing template design

## Intent and the why

LOWTIDE is a fictional sleep ring with a companion app that has **no feed and no notifications**: the anti-doom-scroll ring. The template exists to raise the gallery's ceiling. The user's benchmark is why.zero.university, a site that does not feel like a landing page at all: a full-screen WebGL "short film" you play rather than read. LOWTIDE must reach the same level of animation and interaction complexity **without copying any of that site's structure, gestures or signature moments** (see "Anti-goals").

The central idea: **sleep is a tide that goes out and comes back in, about five times a night, so the page is one night on a moonlit tidal flat, and scrolling is the clock.** Each sleep cycle is a tide; each low tide uncovers part of the story in the wet sand and rock pools.

Reverse-engineering notes on the benchmark (for calibrating complexity only, not for borrowing): one three.js canvas, GSAP master timeline, Howler audio, 9 GLB models, 2 baked Blender camera paths, ~10 KTX2 atlases, ~10 custom post passes (frost, ripple, god rays, lens blur, melt, pixelate, whiteout, glow, grain), per-stage ambient audio. Screenshots: the session scratchpad `shots/` folder (not committed).

## Goals

- Feels like an experience, not a page: one full-screen three.js world, no visible nav, sections, cards or page scroll.
- Every landing-page job still happens, inside the world: hook, problem, how it works, standout feature, proof, product reveal, conversion.
- Complexity on par with the benchmark: custom shaders, GPU particles that morph into numbers, reflection/refraction, post-processing, generative audio, a personalised interactive finale.
- A distinct interaction vocabulary (lantern cursor, stillness, speed-reactive water) that doesn't exist elsewhere in the gallery.

## Non-goals

- **No performance, Lighthouse, speed or responsiveness testing.** The user waived these explicitly for this heavy 3D template. The repo quality bar's §6 budgets do not apply. It must still render and its interactions must work.
- No real backend: forms validate locally and show success without a network call.
- No recorded audio files, no rigged/skinned 3D models, no baked camera paths.

## Anti-goals (a failure even if it works)

Do **not** reproduce any of the benchmark's signatures:

| Benchmark signature | Forbidden in LOWTIDE |
|---|---|
| Draw-a-shape gesture to enter | No entry gate of any kind |
| Press-and-hold gates between acts | Scrolling is never blocked |
| Top progress ruler, XP counter | Use the moon dial (below) only |
| Pinned "Join Beta" bar | No persistent CTA bar |
| Stats printed on glass shards | Stats are plankton formations |
| Wordmark revealed in chrome | Ring is born from the moon's reflection |
| Explorable map + joystick finale | "Your night" tide-chart generator |
| Serif headline over a 3D hand | No hands, no Michelangelo imagery |

Also anti-goals: looking like Bathys (a vertical dive with telemetry readouts) or Noctiluca (a corridor of rooms). LOWTIDE is a **sideways shoreline**, camera travelling along the beach, not down.

## Constraints (decided)

- **New gallery template**, slug `lowtide`, route `/lowtide`, following `skills/create-landing-template/` (folder layout, isolation, six registration points in `repo-wiring.md`) and the gotchas in that skill's ecosystem (hard-coded template counts in tests, palette guard hex-lookalikes, preview image + gallery clip + copy bundles).
- Next.js 16.4 App Router, React 19, TypeScript, Tailwind v4 (read `node_modules/next/dist/docs/` per AGENTS.md before touching Next APIs).
- Assets: use open-source code, generated images, or code, whichever gives the best output (user delegated). See "Sources".
- Scrolling behaviour as specified below (user approved, including speed-reactive water).
- Story beats as specified below (user approved).
- **No brand board.** The user skipped the create-landing-template brand-board gate; the "Look" section below is the brand source of truth.

## Experience

### Form

- Full-viewport fixed `<canvas>` (three.js `WebGLRenderer`) with a thin DOM overlay for: the moon dial, a sound toggle, the wordmark (tiny, top-left), and the finale UI. Nothing else is persistent.
- Native scroll over an invisible tall scroll track, smoothed with **Lenis**; **GSAP ScrollTrigger** scrubs one master timeline from scroll progress `p ∈ [0, 1]`. Native scroll is chosen so trackpads, touch, keyboard and browser back all work.
- Timeline labels at each low tide; all scene state is a pure function of `p` plus three live inputs (lantern position, scroll velocity, stillness).

### The night clock

`p` maps to clock time 23:04 → 07:00. Five sleep cycles of ~95 min; low tides (troughs) are the chapter rest points.

| # | Clock | Tide | Landing-page job | What happens |
|---|---|---|---|---|
| 0 | 23:04 | high | Hook | Dark sea, moon low. Lantern finds *"Let the tide go out."* Stillness raises: *"A sleep ring for people who can't put the phone down."* |
| 1 | ~00:40 | low 1 (light sleep) | Problem | Plankton swarms into sleep-debt figures, e.g. *"1 in 3 adults don't get enough sleep"* (CDC). Lantern pass scatters them; they reform. **Every figure must be real and its source cited in DESIGN.md; drop any that can't be verified.** |
| 2 | ~02:15 | low 2 (deep sleep) | How it works | Three rock pools uncovered, one per sensor: *heart rate* (pulse ripples in the pool), *skin temperature* (pool colour warms/cools), *breathing* (pool surface rises/falls). Lantern over a pool reads its label. |
| 3 | ~03:50 | low 3 (REM) | Standout feature | Headlines melt like ink in water: **smart wake** — *"We wake you on the outgoing tide."* The ring pulses you awake at the lightest point of your last cycle within a 30-min window. |
| 4 | ~05:25 | low 4 | Proof | Testimonials written as footprint trails in the sand; the returning tide washes each away as you scroll on. 3 short fictional quotes with first name + city. |
| 5 | ~06:40 | low 5 | Product reveal (signature moment) | The moon's reflection in the last pool ripples, bends and lifts out of the water as the LOWTIDE ring. Specs and price etched into wet sand. |
| 6 | 07:00 | dawn | Conversion | Sky warms to sunrise, scroll ends. "Your night" generator, then the pre-order form. |

Product facts (fictional, use consistently): titanium ring, sizes 6–13, three finishes (*Moonstone*, *Tidewater*, *Driftwood*), 7-day battery, sensors as above, haptic smart-wake window 10–30 min (user-set), app with no feed and no notifications, **$279, no subscription**.

### Scrolling behaviour (approved)

- **Scroll = time.** Never blocked. Scrolling up rewinds the night; the tide reverses with it.
- **Speed shapes the water (signature input).** Smoothed |velocity| from Lenis drives a `roughness ∈ [0, 1]`: slow → glassy sea, crisp text, soft low audio; fast → waves rise, plankton numbers scatter, in-world text tears in the ripples, audio gets harsher. Roughness decays back toward 0 over ~1.5 s.
- **The tide settles.** When scrolling stops, the timeline eases to the nearest low tide (ScrollTrigger snap to labels, ~0.6 s delay). Never stranded mid-transition.
- **Camera travels along the shore.** Progress dollies the camera sideways along the beach; each cycle is a new stretch of shoreline (different rock/pool arrangement), not the same spot changing.
- **Moon dial = navigation.** A small moon-phase-and-clock dial (corner of the screen) shows the time. Drag it to scrub the night; click its notches to jump to a low tide. Arrow keys / Space / Shift+Space step between low tides (never stealing keys from focused controls).
- **Finale:** at dawn scrolling ends; in "Your night" you drag sideways to explore your generated shoreline.

### Interaction vocabulary

- **Lantern cursor.** The scene is dark; a soft pool of light follows the pointer and reveals what's under it (a screen-space reveal mask feeding the water/sand/text shaders). Touch: the lantern follows the last touch point. No pointer / keyboard: the lantern rests at screen centre with a wider radius.
- **Stillness.** Pointer and scroll both still for ~1.2 s → `calm` ramps 0 → 1 over ~2 s: the water flattens, and each chapter's secondary "quiet line" rises to the surface. Any movement sinks it again. (Stillness is simply roughness at zero plus pointer idle.)
- **Plankton formations.** A GPU particle field (tens of thousands of points) whose targets morph between ambient drift and glyph shapes for each figure; the lantern and roughness push particles away, then they reform.
- Content split: **headlines are lantern-revealed** (spatial), **quiet lines are stillness-revealed** (temporal). Every line also exists in an accessible DOM mirror (below).

### "Your night" finale

- Inputs: bedtime and wake time (time inputs, defaults 23:30 / 07:00). Pure function → number of cycles (duration ÷ ~90 min, rounded), cycle lengths, smart-wake moment.
- Output: a generated shoreline strip in the same renderer: wave crests = cycles, the smart-wake moment marked as a glowing point on the last outgoing tide. Drag (or arrow keys) to pan along it.
- "Keep your night": downloads a PNG of the strip with the times written in.
- Then the pre-order form: email, ring size (6–13), finish (3). Local validation, loading state, choreographed success (the tide washes the form away and leaves *"See you at low tide."* in the sand). No network.

### Sound

Off by default (browsers require a gesture); a sound toggle in the corner turns it on. Generated live with **Tone.js**: filtered noise surf whose filter follows tide level and roughness; a slow low pad whose tempo/density decreases through the night; a soft chime when a low tide settles. Roughness adds grit; stillness thins it out.

### Look (my calls, builder may refine)

- **Palette (UI tokens, registered in `scripts/templates.config.ts`):** night `#0A0D16` (ground), foam `#ECEFF0` (text), moonlight `#EBD9A6` (the one accent: dial, focus rings, buttons), plankton `#8FD3FF` (live/glow readouts), dusk `#7A8494` (muted text), dawn `#F2B28C` (dawn moments and form errors). Scene/sky/water colours are content colours → `paletteExempt` as appropriate. Must not reuse Bathys's `#00E5FF` cyan or Starlight's `#7DF2D1` / `#FF9275`.
- **Type:** display **Imbue** (tall, condensed, tidal), body **Onest**, utility **Xanh Mono** (dial, readouts). None are used elsewhere in the gallery. In-world text is rendered with troika-three-text using the same font files.
- CSS class prefix `lt-` (unused).
- Mood: calm, slow, a little uncanny; a sense of place, not a pitch.

## Sources (my calls)

| Piece | Source |
|---|---|
| Water surface, reflections | three.js `examples/jsm/objects/Water.js` (or `Water2`) as a base, extended with our own tide/ripple/roughness/lantern uniforms. The npm package doesn't ship the examples' `waternormals.jpg`, so the tileable normal map is generated in code at boot. |
| Sky, moon light | three.js `Sky.js` adapted for night → dawn |
| Wet sand, tide lines, rock pools, footprints | custom shaders (wetness follows the tide line; footprints as a decal/height mask) |
| Moon | NASA SVS "CGI Moon Kit" colour map (public domain), downsized |
| Distant headland / sky backdrop | Procedural layered silhouettes in code at first. **No image-API keys exist in the repo**, so also write prompts in `docs/image-video-prompts/lowtide.md` for optional painted parallax layers the user can generate later. |
| Plankton | `GPUComputationRenderer` (three.js examples) |
| In-world text | `troika-three-text` (new dependency). It needs real font files (ttf/otf/woff, not woff2), so Imbue and Xanh Mono TTFs (OFL) are self-hosted under `public/templates/lowtide/fonts/`. |
| Ring | Procedural torus/profile geometry, `MeshPhysicalMaterial`, `RoomEnvironment` |
| Post | three.js `EffectComposer` + bloom + custom grain/ink-melt passes |
| Audio | `tone` (new dependency) |

Renderer: **WebGLRenderer, not `three/webgpu`.** The skill's default is WebGPU/TSL, but the reused open-source pieces (Water, GPUComputationRenderer, troika) are GLSL/WebGL-only. Deliberate deviation; note it in DESIGN.md.

## Accessibility and fallbacks (my calls, from the repo quality bar)

- **Reduced motion / no JS / WebGL failure:** the 3D engine never mounts (prove with a test). Instead render a finished-looking static "tide table" page: a poster of the shoreline, every chapter's copy in order, the product specs, the "Your night" calculator as plain DOM, and the pre-order form.
- With the experience running, an accessible DOM mirror holds all chapter copy (visually hidden), with `aria-live="polite"` announcing the chapter name when a low tide settles. One `h1`. Dial, sound toggle and form controls are real buttons/inputs with names and visible focus.
- Touch: the engine boots on the first touch/scroll rather than behind a "tap to start" screen (no entry gate).

## Testing (scope agreed)

- Unit tests (TDD) for pure logic: progress → clock time; progress → tide level and low-tide label points; snap target; velocity → roughness smoothing; stillness/calm ramp; "Your night" cycle maths; form validation; motion math helpers.
- E2E `tests/e2e/lowtide.spec.ts`: page loads and the canvas mounts; dial keyboard stepping moves between chapters; form validation and success; reduced-motion renders the static tide table with all copy and no canvas.
- Repo checks: `npm run check`, `npm test`, `npx tsc --noEmit`, Playwright suites (including shared gallery specs after count bumps).
- **Not tested:** Lighthouse, performance, responsiveness (waived by user).

## Left to the builder

- Exact shader implementations, particle counts, post-pass stack, camera path along the shore, tide curve shape (must be pure, tested, troughs exactly at chapter labels).
- Final copy for quiet lines and testimonials, within the story and product facts above.
- Logo (wordmark + mark) design, OG image, favicon, within the palette.
- File decomposition within the repo-wiring layout (expect 25–40+ files).
- Whether to use Water vs Water2 as the base.
