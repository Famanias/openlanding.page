# Prompt: rebuild "ELSEWHERE" (a cabin landing page where scrolling is the walk in)

Paste everything below the line into your AI coding agent.

---

Build an isolated Next.js 16 (App Router) / React 19 / TypeScript / Tailwind v4 landing page at `/elsewhere` for **ELSEWHERE**, a fictional one-room cabin at the end of a 1,900-metre footpath. The only extra package is `lenis`. Everything lives in `src/app/(elsewhere)/` and imports only npm packages or its own files (no `@/` aliases). CSS class prefix `ew-`. The cabin, its stays, dates and rates are illustrative, and the page says so.

## Central idea

Elsewhere is measured in distance from everything else, **so the page is the walk in**. Scrolling walks the trail from the road's end to the door: a readout in the header counts down the metres left while a signal meter loses a bar at a time, and at the door the camera pushes through the glass into the room. Slogan: "Past the last bar of signal." Mood: misty, routed-wood, quiet, cold outside, warm inside.

## Photographs (eight, all used, served locally)

`overlook` (16:9 misty valley, cabin small at the right), `cabin-green`, `cabin-amber`, `cabin-white` (the cabin exterior from one fixed camera position in spring, autumn and snow, its lit glass door at x 62.5–75.7%, y 45.8–71.2% of the frame), `interior` (shot from the doorway: pine room, sofa, stove, one square window), `room-detail` (3:4: wool blanket and stoneware mug), `trail` (3:4: mossy stone steps up to the cabin), and `boughs` (fir boughs from the left edge on a transparent ground) plus `boughs-soft`, the same cutout with a 5 px blur baked in. Process to 800w and 1600w AVIF and WebP and render through a `Picture` helper with width, height and `alt`. Only the hero plate is `priority`.

## Palette (only these hex values; tints via `color-mix()`)

mist `#E4E7E1` (page), fog `#F4F5F1` (sign boards, cards), char `#191B18` (ink, darkest slab), fir `#1F2D27` (forest sections), stone `#525C54` (muted text on light grounds), glow `#F0A64A` (the lit window and the painted trail blaze: the only accent, a fill under char text, never text on a light ground), pine `#E9D6B4` (the warm ground once inside). The page runs from cool fog, to fir in the forest, to pine through the door.

## Type

National Park (variable; headlines, labels, buttons, numbers: it is drawn from routed trail signs), Spectral 400 and italic (body, logbook), Reddit Mono (distances and the small uppercase "posts" above each section), all through `next/font/google` with distinct CSS variables. Headlines are sentence case, weight 500, tracking −0.02em, line-height about 0.96, sized with `clamp()`, with authored line breaks. Geometry is a sign board: 4 px radii, 1 px rules, flat fields, no gradients except photo scrims.

## Signature details

1. The blaze: an amber rectangle that is the logo's door, every bullet, the waypoint markers, the ruler thumb and the stamp.
2. The header readout: four signal bars and "1,900 m to the door", down to no bars and "Inside".
3. Posts: every section opens with a monospace line (blaze, place, distance).
4. Fog sign boards carry the header (with two screw heads), the cabin tag and every caption.

## Sections

1. **Header:** fixed fog plank: gable-and-lit-door mark with the wordmark, four links (The walk in, The room, Three seasons, Stay) with one amber indicator that slides and scales between them, the signal readout, "Hold the cabin", and a 2 px page-progress line on its bottom edge. It lifts and gains a shadow after 80 px, stays up for the whole walk, and hides on scroll-down only once past the door. Below 960 px the links become a full-screen fir menu that opens as a clip-path circle from the toggle, with staggered links, a focus trap and Escape to close.
2. **Overlook (hero):** `overlook` full-bleed in a CSS cover box (`width: max(100%, heroHeight × 1.7917)`), so a tag ("The cabin · 1,900 m", a leader line, a pinging dot) sits on the door in plate percentages. `boughs-soft` is the layer nearest the lens. Headline "Past the last bar / of signal.", a lede ending "Scroll to walk in.", a magnetic amber "Start walking" button and a "Hold the cabin" link, and three facts (1,900 m on foot, 35 min, 0 bars at the door). The hero is sticky, so the next section slides over it. On portrait screens the copy moves up under the header and the tag's label is dropped.
3. **The walk in** (fir): headline "It takes thirty-five minutes to stop checking." A pinned `trail` photograph (a sticky band at the top on phones) zooms toward the door, a dotted amber line reveals up the steps and a "Walked 880 m" readout counts. Beside it, five posts on a rail whose amber fill grows: Road's end 0 m, The cedar gate 420 m, The plank bridge 880 m, The stone steps 1,340 m, The door 1,900 m, each with elevation, minutes in, the signal at that point, a note and a detail. Posts ahead are unlit until reached.
4. **Threshold** (the signature moment): a section 400svh tall with a sticky 100svh stage. `cabin-green` dollies into its own door while `interior` fades in and grows inside the doorway, clipped to it, until it fills the stage; `boughs` scales up and slides off to the left in front. Three caption planks cross-fade: "The light is already on." (h2), "Leave the day outside.", "Now sit down."
5. **The room** (pine): `room-detail` pinned beside "One of everything." and a numbered inventory of eight things (stove, window, sofa, stool, blanket, two mugs, forty logs, a logbook); four count-up figures (23 m², 1 window, 40 logs, 2 people); "Not in the room" (a router, a television, a clock, a doorbell, a mirror bigger than your face), each struck through by a drawn line; and a drifting band: No road, No router, No clock, One window, One stove, One trail in.
6. **Three seasons** (fir): "The valley keeps three seasons." One frame stacks the three exterior plates. A panel has three season radio buttons (Green April to August, Amber September to November, White December to March), a 12-month range input styled as a ruler with a blaze thumb, and for the chosen month: daylight, low and high, time on the trail, wood per day, nightly rate, what the valley is doing and what to bring. Crossing a season boundary wipes the next plate over the last, from the right going forward in the year and from the left going back.
7. **The logbook** (mist): "Write the weather down." Three dated, signed entries as slightly tilted pages that straighten, lift and catch pointer-following lamplight on hover. Labelled as illustrative.
8. **Stay** (fog): "Hold the cabin." A pine panel (month select tied to the ruler, a nights stepper from 2 to 7, a one or two guests control, quote lines and a total that ticks) beside a floating-label form (name, email, optional note up to 280 characters). A bad submit shakes the fields once and focuses the first invalid one; a good one shows a 900 ms loading bar, then the form lifts away and a key tag drops in with a hashed reference like `EW-7K2M9Q` and a "Held" stamp. No request is made, and the tag says nothing was sent, stored or charged.
9. **Footer** (char): the mark, "The light is on.", links, three practical notes, a giant SVG wordmark and the fiction disclaimer.

## The mechanic (pure, tested modules)

- `walk/trail.ts`: the waypoints; `metresAt(scrollY, anchors)`, piecewise-linear between anchors `{ y: postTop − 0.55 × viewportHeight, metres }` measured from the real posts and flat outside them; `metresToDoor` rounded to tens; `readoutLabel`; `signalBars` (4 from 0 m, 3 from 190, 2 from 420, 1 from 650, 0 from 880).
- `walk/WalkEngine.tsx`: the only scroll listener. One rAF per scrolled frame writes the readout text, `data-bars`, each post's `data-reached`, the header's `data-state`, the active nav link, and the custom properties `--ew-page`, `--ew-hero`, `--ew-trail` and the threshold frame. It skips unchanged values, re-measures on resize, font load and body resize, and never touches React state. A second eased loop leans the hero layers toward a fine pointer.
- `threshold/geometry.ts`: `coverBox` (object-fit: cover), `doorRect`, `doorFocal` (centred crop on landscape, door re-centred on portrait) and `thresholdFrame(p, stage, door)`. World scale `s = sEnd ^ easeInOutCubic(progress(p, 0.08, 0.84))` about the door's centre with a translation carrying the door to the stage centre, where `sEnd = 1.06 / min(door.w/W, door.h/H)`. The interior rides at `s / sLock` with `sLock = 1 / max(door.w/W, door.h/H)`, then holds at 1 and eases 4% further in; its `clip-path: inset()` tracks the door's on-stage rectangle; it fades in from `s = 1.1`. The boughs scale to 1.9× and travel `0.6 × W × scale` left, gone by `p = 0.4`. Beats change at 0.3 and 0.7. Test that the interior always covers the visible doorway on five stage sizes.
- `seasons/seasons.ts`: `seasonForMonth`, `midMonth`, and `daylightHours(month, 48.6°) = 24/π × acos(−tan φ × tan δ)`, `δ = 23.44° × sin(2π(284 + N)/365)`.
- `stay/quote.ts`: a reducer (month, season, nights, step-nights, guests) in a context shared by the season frame and the stay panel, and `quote = rate × nights + 45` with rates 240, 265, 285.
- `forms/validation.ts`: `validateHold`, `firstInvalid`, and an FNV-based `holdReference`.

## Motion

Cinematic and quiet. Verbs: **approach** and **settle**. Tokens in `@theme`: `--ease-out` `cubic-bezier(0.22, 1, 0.36, 1)`, `--ease-out-expo`, `--ease-in-out` `cubic-bezier(0.65, 0, 0.35, 1)`, `--ease-spring` (press release only), durations 90 / 200 / 480 / 900 / 1400 ms, `--reveal-shift` 26 px, `--stagger` 80 ms. The hero plays from CSS keyframes before hydration: plate 1.09 → 1, plank drops, headline lines rise through masks, the lede lifts into place without fading (it is the largest text on a phone, so it must paint on the first frame), actions and facts settle, then the tag draws. Scroll reveals use `data-reveal` with six variants: `lines` (masked line rise), `wipe` (clip-path on the child, never on the observed element, with a picture settle), `approach`, `settle`, `slide`, `draw`. Buttons wipe a fill from the left, roll their label (a text-shadow copy waiting below the edge) and press to 0.97 with a spring release. Ambient motion is limited to drifting hero mist, the door's ping, the threshold hint and the band, never more than two in view. Animate only transform, opacity and clip-path.

Put hidden pre-reveal states and the pinned layouts behind `@media (prefers-reduced-motion: no-preference) and (scripting: enabled)` and add a `<noscript>` override. Under reduced motion nothing is hidden, pinned or looping: the hero is not sticky, the threshold is two captioned photographs, Lenis never loads, and the engine still updates the readout and posts but writes no scrubbed property.

## Quality bar

One `h1`, landmarks, a skip link, real buttons, radios, a range input and a select, labelled and keyboard-operable, AA contrast, a focus ring that shows on every ground (a char line inside an amber ring). No horizontal overflow from 320 px. Unit tests for motion maths, trail, threshold geometry, seasons, quote, validation and content. A Playwright spec for the walk readout, the threshold, seasons, the ruler from the keyboard, the stepper, the form, reveals, the nav, hash links, the phone menu, reduced motion and no JavaScript. Add `icon.svg`, a 1200×630 `opengraph-image.tsx` in palette colours, `DESIGN.md` with the full motion map, and register the template in the gallery. Mobile Lighthouse: performance ≥ 90, accessibility ≥ 95, best practices 100.
