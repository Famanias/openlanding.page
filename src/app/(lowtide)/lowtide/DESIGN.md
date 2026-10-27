# LOWTIDE — design spec

A landing page for a fictional sleep ring whose app has **no feed and no notifications**. It doesn't look like a landing page: it is one full-screen three.js night on a moonlit tidal flat. **Sleep is a tide that goes out and comes back about five times a night, so the page is one night on the shore and scrolling is the clock.** Each low tide uncovers one part of the story.

Benchmark for complexity (not form): why.zero.university. LOWTIDE deliberately shares none of its mechanics: no entry or hold gates, no progress ruler or XP, no pinned CTA bar, no hands, no map finale.

## Requirements

- Next.js 16.4 App Router (route group `(lowtide)` with its own root layout), React 19, TypeScript, Tailwind v4.
- `npm i three gsap lenis troika-three-text tone`
- **Renderer: `THREE.WebGLRenderer`, not `three/webgpu`.** The reused open-source pieces (three's `Water`, `GPUComputationRenderer`, troika-three-text) are GLSL/WebGL only.
- Imports only npm packages and files inside `src/app/(lowtide)/`.
- **No performance, Lighthouse or responsiveness budget** — waived for this heavy 3D experience. It must render and its interactions must work.
- Reduced motion, no JavaScript, no WebGL2 or a lost context → the 3D never mounts; the tide table (below) is the page.

## Concept

| # | Clock | Tide | Job | In the world |
|---|---|---|---|---|
| 0 | 23:04 | high | hook | "Let the tide go out." floats over high water, lantern-revealed |
| 1 | 00:40 | low | problem | plankton swarms into sourced figures: 1 in 3 · 7h · 95% |
| 2 | 02:15 | low | how it works | three rock pools: a heartbeat, a slow warmth, a breath |
| 3 | 03:50 | low | smart wake | the headline bleeds like ink as you arrive, resolves when you stop |
| 4 | 05:25 | low | proof | testimonial trails of footprints; the returning tide washes them away |
| 5 | 06:40 | low | the ring | the moon's reflection in the last pool bends into the ring, which rises |
| 6 | 07:00 | dawn | conversion | "Your night" tide line + download, pre-order form |

Statistics and sources: CDC MMWR 65(6) 2016 (1 in 3 under seven hours); CDC Adult Sleep Facts (7 h minimum); National Sleep Foundation Sleep in America 2011 via Harvard Health (95% screen use before bed).

## Palette

| Token | Hex | Role |
|---|---|---|
| night | `#0A0D16` | ground, the tide table |
| foam | `#ECEFF0` | text |
| moonlight | `#EBD9A6` | the one accent: dial, focus, buttons |
| plankton | `#8FD3FF` | live glow, readouts |
| dusk | `#7A8494` | muted text |
| dawn | `#F2B28C` | dawn moments, form errors |

Scene colours (sky, water, sand, moon) are content: `src/app/(lowtide)/lowtide/engine/` is palette-exempt.

## Type

Display **Imbue** (variable, opsz 100) · body **Onest** · utility **Xanh Mono** (+ italic for quiet lines). In-world text uses troika with the self-hosted TTFs in `public/templates/lowtide/fonts/`.

## Layout

- `page.tsx` renders `<TideTable />` (server: every word, one `h1`, six `h2`s) and `<Experience />` (client).
- Experience boots on idle (fine pointers) or first touch/scroll (touch). On success `html[data-lt-mode="experience"]`: the table becomes visually hidden (its `.lt-dawn` and `.lt-foot` go `inert`), a fixed canvas, a 700vh scroll track, and a HUD (logo, Sound, moon dial).

## The mechanic (maths, all pure and tested in `night/`)

- `progress p ∈ [0,1]` = Lenis scroll / limit. `progressToClock(p) = 1384 + p·476` minutes (23:04 → 07:00).
- `tideLevel(p)`: half-cosine between anchors (0,1), each low-tide chapter at 0, a full high halfway between lows, (1, 0.5).
- `chapterWeights(p)`: per chapter `1 − smoothstep(0, win, |p − point|)`, `win = min(0.06, half the gap to the neighbour on that side)`.
- Scroll speed → `stepRoughness` (|v|/4000 px·s⁻¹, attack λ12, release λ2). Stillness → `stepCalm` (after 1.2 s, rises over 2 s).
- Settle: 600 ms after the last input the night eases to the nearest chapter; any new input cancels it from the current position.
- `planNight(bed, wake, window)`: cycles every 90 min; smart wake = last boundary within the window, else the alarm.
- World layout (`engine/shore.ts`): shore 360 units long, sand slope 0.04, water −2.1 (low) → 0.7 (high).

## Motion

- **Personality:** slow, tidal, a little uncanny. **Verbs:** recede, surface.
- **Signature moment:** the moon's reflection in the fifth pool ripples, bends into a ring outline, and the titanium ring lifts out of the water.
- Tokens in `lowtide.css` (`--ease-lt-out`, `--ease-lt-tide`, `--ease-lt-spring`, `--dur-lt-*`).

| Element | Enter | Scroll-linked | Hover / focus | Press / state | Exit |
|---|---|---|---|---|---|
| Canvas | fades in over the tide table | everything (tide, camera, chapters) | lantern follows the pointer | — | context loss → tide table |
| Headlines (3D) | chapter weight | torn by roughness | revealed by the lantern | — | weight → 0 |
| Quiet lines (3D) | rise from below when still | sink with movement | — | — | weight → 0 |
| Plankton | ambient drift | swarm into figures at low tide 1 | parted by the lantern | scattered by fast scroll | drift home |
| Sensor pools | revealed as water drops | — | names lantern-revealed | — | covered by the tide |
| Footprints | uncovered | washed away after 05:25 | — | — | wash |
| Ring | from the reflection | rises over the approach | — | — | stays risen |
| Moon dial | with the HUD | moon rides the arc, label/time | notch grows | drag scrubs, arrows step | — |
| Sound toggle | with the HUD | — | moonlight border | bars animate when on | fades out |
| Finale panels | GSAP rise + stagger | — | inputs/buttons states | wash sweep on pre-order success | unmount before dawn |
| Tide table | static | — | links, inputs, chips | submitting breath, success | — |

## Signature details

The moon dial (clock + chapter + notches); wet sand that stays dark after the water leaves; the moon's glitter streak on wet sand; stats made of plankton; footprints the tide erases; the specs etched in sand.

## Do / Don't

- Do keep every word in the tide table; the 3D never carries copy alone.
- Do keep scroll unblocked; settle, never gate.
- Don't add a progress bar, XP, a persistent CTA bar, or an entry gesture.
- Don't animate DOM layout from the rAF loop; the loop writes uniforms and one CSS variable.

## Files

`layout.tsx` · `lowtide/page.tsx` · `lowtide.css` · `brand/Logo.tsx` · `icon.svg` · `opengraph-image.tsx` · `assets.tsx` · `content/story.ts` · `night/{clock,tide,beats,sea-state,your-night}.ts` · `forms/{preorder.ts,PreorderForm.tsx}` · `tidetable/{TideTable,NightCalculator,ShorePoster}.tsx` · `experience/{Experience,MoonDial,SoundToggle,Finale}.tsx` + `{gate,inputs,nightScroll,dialGeometry}.ts` · `engine/` (`createWorld`, `camera`, `sky`, `headland`, `water`, `sand`, `pools`, `poolSurface`, `words`, `worldText`, `plankton`, `glyphPoints`, `sensorPools`, `footprints`, `ring`, `finaleStrip`, `post`, `normalMap`, `shore`, `glsl`) · `sound/{mapping,soundscape}.ts`.

## Imagery & sources

- Moon: NASA SVS CGI Moon Kit colour map (public domain), `public/templates/lowtide/moon-2048.jpg`.
- Water: three.js `examples/jsm/objects/Water.js` (MIT) with a generated normal map; sky, sand, headland, pools and post are custom GLSL.
- Fonts: Imbue, Xanh Mono (SIL OFL).
- Optional painted parallax layers: prompts in `docs/image-video-prompts/lowtide.md` (not required).
