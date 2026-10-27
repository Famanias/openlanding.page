# Prompt: rebuild "LOWTIDE"

Build a landing page for **LOWTIDE**, a fictional titanium sleep ring whose app has no feed and no notifications ("the anti-doom-scroll ring"). It must not feel like a landing page: it is one full-screen three.js night on a moonlit tidal flat. Sleep is a tide that goes out and comes back about five times a night, so **scrolling is the clock (23:04 → 07:00)** and each low tide uncovers one part of the story.

## Stack

Next.js 16 App Router (own route group + root layout), React 19, TypeScript, Tailwind v4. `npm i three gsap lenis troika-three-text tone`. Use `THREE.WebGLRenderer` (three's `Water`, `GPUComputationRenderer` and troika are WebGL-only).

## Story (one chapter per tide)

1. **23:04, high tide (hook):** "Let the tide go out." — quiet line "A sleep ring for people who can't put the phone down."
2. **00:40 (problem):** "The scroll doesn't end. The night does." Bioluminescent plankton (GPU particles, ~37k) swarm into sourced figures: **1 in 3** US adults sleep under seven hours (CDC MMWR 2016), **7h** minimum (CDC), **95%** use a screen in the hour before bed (National Sleep Foundation 2011).
3. **02:15 (how it works):** "Three pools, read all night." Three rock pools: heart rate (rings at 60 bpm), skin temperature (water warms/cools over 8 s), breathing (a rim swells 12×/min).
4. **03:50 (smart wake):** "We wake you on the outgoing tide." A post-process ink melt bleeds the frame while arriving and resolves at rest.
5. **05:25 (proof):** three testimonials beside footprint trails pressed in wet sand; after the low tide the water returns and washes each trail away.
6. **06:40 (signature):** "The moon, on your hand." The moon's reflection in the last pool ripples, bends into a ring outline, and a procedural titanium ring (lathe of a rounded-rectangle profile, `MeshPhysicalMaterial`, `RoomEnvironment`) rises out of the water. Specs and "$279 · no subscription" etched in the sand.
7. **07:00 dawn (conversion):** "Your night": bedtime + wake time → a glowing tide line over the water (one dip per 90-min cycle, smart-wake marker), drag/arrow keys to walk it, "Keep your night" downloads a PNG; pre-order form (email, ring size 6–13, finish Moonstone / Tidewater / Driftwood) with a tide-wash success "See you at low tide."

Product facts: grade 5 titanium, 7-day battery, smart-wake window 10–30 min, $279, no subscription.

## Interaction vocabulary (no gates)

- **Lantern cursor:** a screen-space warm pool of light; headlines appear only where it shines (faint ghost elsewhere).
- **Stillness:** 1.2 s without pointer/scroll movement → calm rises over 2 s; quiet lines surface from below.
- **Speed-reactive water:** smoothed |scroll velocity| → roughness: distortion, foam, torn text, scattered plankton, harsher sound.
- **Settle:** 600 ms after input stops, ease to the nearest chapter; new input cancels it.
- **Moon dial** (bottom right, `role="slider"`): drag to scrub, notches jump to chapters, arrows/Page keys step; Space/arrows on the page step chapters unless a control has focus.
- **Sound** (off by default): Tone.js — brown-noise surf through a low-pass that follows tide and roughness, grit, a slow swell, a sine pad that slows through the night, a chime when a low tide settles.

## World

Shore 360 units long along x, camera walks it with progress; sand ramps up 0.04/unit toward the camera; water level −2.1 (low) → 0.7 (high) from `tideLevel(p)` (half-cosine between anchors). Wet sand stays dark after the water leaves and mirrors the moon in a glittering streak. Low moon (NASA CGI Moon Kit texture), gradient sky dome with hashed stars, three procedural headland ridgelines. Bloom + grain + vignette.

## Palette & type

night `#0A0D16`, foam `#ECEFF0`, moonlight `#EBD9A6` (only accent), plankton `#8FD3FF`, dusk `#7A8494`, dawn `#F2B28C`. Display Imbue, body Onest, utility Xanh Mono (italic for quiet lines).

## Accessibility & fallback

Render every word server-side as a finished "tide table" page (one h1, an h2 per low tide, stats, pools, quotes, specs, a night calculator and the pre-order form). Reduced motion, no JS, no WebGL2 or context loss → that page, no canvas. In experience mode it is visually hidden (controls inside it `inert`) and an `aria-live` region announces each settled chapter.

## Quality bar

Pure, tested modules for clock, tide, chapter weights, roughness/calm, night plan, validation, dial geometry and glyph sampling; Playwright for the dial, keyboard, reload restore, settle-cancel, finale download and pre-order, and the reduced-motion tide table. No performance or responsiveness budget.
