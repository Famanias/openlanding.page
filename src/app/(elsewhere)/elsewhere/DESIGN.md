# ELSEWHERE: design

One cabin at the end of a 1,900-metre footpath. The page is the walk in.

```
npm i lenis
```

Next.js 16 (App Router), React 19, TypeScript, Tailwind v4 (tokens only; the classes are hand-written and prefixed `ew-`). No other runtime dependency. Everything lives in `src/app/(elsewhere)/` and imports only npm packages or its own files.

## Requirements

- A landing page for a fictional boutique cabin, built around eight supplied photographs. All eight are used.
- Every control does real work in local state. Nothing is sent, stored or charged, and the page says so.
- Complete with JavaScript off and under `prefers-reduced-motion: reduce`.
- Mobile Lighthouse: performance ≥ 90, accessibility ≥ 95, best practices 100.

## Concept

**Elsewhere is measured in distance from everything else, so the page is the walk in.** Scrolling walks the trail from the road's end to the door. A readout in the header counts down the metres left while a signal meter loses a bar at a time, and at the door the camera pushes through the glass into the room.

- **Brand:** ELSEWHERE, one 23 m² cabin above the Hollin Fork, 1,900 m and 212 m of climb from the nearest road. No drive-up, no network, one lit window.
- **Slogan:** "Past the last bar of signal."
- **The brand's language:** the route is *the walk in*, its stops are *posts*, the hero is *the overlook*, booking is *holding the cabin* and *requesting the key*, the confirmation is a *key tag*, guest quotes are *the logbook*, and the year has *three seasons*: green, amber, white.
- **Mood:** misty, routed-wood, quiet, cold outside, warm inside.
- **Arc of colour:** the page starts in cool fog, darkens into fir as you enter the forest, and turns to pine once you are through the door.
- **Voice:** short, dry, specific. Numbers over adjectives ("Sixty-four slabs laid by hand in 2019").

## Palette

Seven colours. Tints and shadows come from `color-mix()` of these; `npm run check` rejects any other hex.

| Token | Hex | Role |
|---|---|---|
| mist | `#E4E7E1` | the page outside: cool fog paper |
| fog | `#F4F5F1` | the lightest surface: sign boards, caption planks, cards |
| char | `#191B18` | ink, and the darkest slab (threshold ground, footer) |
| fir | `#1F2D27` | the forest sections: the walk in, three seasons, the menu |
| stone | `#525C54` | muted text on light grounds (5.2:1 on mist, 4.6:1 on pine) |
| glow | `#F0A64A` | the lit window and the painted trail blaze. The only accent. Used as a fill under char text, never as text on a light ground |
| pine | `#E9D6B4` | the warm ground once you are inside: the room, the stay panel, the key tag |

## Type

| Role | Font | Use |
|---|---|---|
| Sign | **National Park** (variable, `--font-national-park`) | headlines, labels, buttons, numbers. It is drawn from routed wooden trail signs |
| Book | **Spectral** 400 and italic (`--font-spectral`) | body copy, logbook entries |
| Post | **Reddit Mono** (variable, `--font-reddit-mono`) | distances, readouts, the small uppercase posts above each section |

Headlines are sentence case, weight 500, tracking −0.02em, line-height 0.94 to 0.98, sized with `clamp()`. Line breaks are authored (`motion/Lines.tsx`), so a late font can't re-wrap a headline.

## Layout

Geometry is a routed sign board: 4 px radii, 1 px rules, flat fields, photographs full-bleed or in plain frames. No blobs, no gradients except photo scrims.

1. **Header:** a fog plank fixed above the page with two screw heads, the logo, four section links, the signal readout and "Hold the cabin". A 2 px amber line along its bottom edge shows page progress.
2. **Overlook (hero):** the panorama full-bleed, the blurred bough cutout nearest the lens, headline bottom-left, a tag pinned to the cabin door, three facts along the bottom. On portrait screens the copy moves up under the header so the cabin stays clear.
3. **The walk in:** fir. A pinned portrait of the stone steps on the left, five waypoint posts on a rail on the right.
4. **Threshold:** a pinned stage, 400svh long. Exterior → doorway → interior.
5. **The room:** pine. The detail photograph, a numbered inventory of eight things, four figures, the list of what was left out, and a drifting band.
6. **Three seasons:** fir. One frame holding the three exterior plates, and a panel with season buttons, a 12-month ruler and the facts for that month.
7. **The logbook:** mist. Three pages from the windowsill logbook.
8. **Stay:** fog. The stay panel (month, nights, guests, quote) beside the hold form.
9. **Footer:** char, with a giant SVG wordmark.

Breakpoints: one column below 960 px (the trail photograph becomes a sticky band at the top of the screen), three logbook columns from 860 px.

## The mechanic

### 1. The walk (`walk/trail.ts`, `walk/WalkEngine.tsx`)

- `WAYPOINTS`: road's end 0 m, the cedar gate 420 m, the plank bridge 880 m, the stone steps 1,340 m, the door 1,900 m.
- On load and on resize the engine measures each post's page offset and builds **anchors**: `{ y: postTop − 0.55 × viewportHeight, metres }`.
- `metresAt(scrollY, anchors)` is piecewise-linear between anchors and flat outside them, so the readout shows exactly a post's distance when that post crosses 55% of the viewport, whatever the spacing between posts.
- `metresToDoor` rounds to tens so the readout ticks; `readoutLabel` prints "1,240 m to the door", then "At the door"; the engine prints "Inside" once the threshold is 70% through.
- `signalBars(metres)`: 4 bars from 0 m, 3 from 190, 2 from 420, 1 from 650, none from 880.
- The engine is the page's only scroll listener. One `requestAnimationFrame` per scrolled frame writes text, `data-*` attributes and CSS custom properties straight to the DOM, and skips any value that hasn't changed. No React state.

### 2. The threshold (`threshold/geometry.ts`)

Inputs: stage size, scroll progress `p` (0..1 across the pinned section), and the door's rectangle as fractions of the 1376 × 768 plate (`x 0.625–0.757, y 0.458–0.712`).

- `coverBox` reproduces `object-fit: cover`; `doorRect` maps the door into stage pixels. `doorFocal` keeps a centred crop on landscape screens and re-centres the door on portrait ones.
- **World (exterior):** `scale(s)` about the door's centre plus a translation that carries the door to the stage centre. `s = sEnd ^ easeInOutCubic(progress(p, 0.08, 0.84))`: an exponential zoom, so equal scroll feels like equal steps forward. `sEnd = 1.06 / min(door.w/stage.w, door.h/stage.h)`, the scale at which the frame has left on every side.
- **Interior:** rides inside the doorway at `s / sLock`, where `sLock = 1 / max(door.w/stage.w, door.h/stage.h)` is the scale at which it reaches stage size. From there it holds at 1 and eases 4% further in. It is clipped with `clip-path: inset()` to the door's on-stage rectangle, and fades in between `s = 1.1` and 60% of the way to `sLock`.
- **Boughs:** the cutout scales to 1.9× and travels `0.6 × stageWidth × scale` to the left, gone by `p = 0.4`.
- **Captions:** three beats at `p < 0.3`, `< 0.7`, and after.

Tests assert the interior always covers the visible doorway, is opaque before it locks, and that the boughs have cleared before the interior takes over, on five stage sizes.

### 3. Three seasons and the stay (`seasons/seasons.ts`, `stay/quote.ts`)

- One month (1..12) lives in `StayProvider` and drives both the season frame and the booking panel.
- `seasonForMonth`: green April to August, amber September to November, white December to March.
- `daylightHours(month, 48.6°)`: `24/π × acos(−tan φ × tan δ)` with `δ = 23.44° × sin(2π(284 + N)/365)` at mid-month.
- `quote`: `rate × nights + 45` (wood and linen), nights clamped to 2..7, guests 1..2, no per-guest charge. Rates: 240, 265, 285.

## Motion

**Identity:** cinematic and quiet. The camera moves; the page does not bounce. Primary verb **approach** (things push toward you: plates scale in, cards rise and grow, the dolly), secondary verb **settle** (long quint-out landings, no overshoot). The only spring is a press release.

**Signature moment:** through the glass. Everything else is support.

**Tokens** (`@theme` in `elsewhere.css`):

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | the default settle |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | headline lines, the header's drop, number ticks |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | wipes, the menu, strike-throughs |
| `--ease-spring` | `linear(…)` | press release, the blaze pop, the key tag |
| `--dur-instant / fast / base / slow / hero` | 90 / 200 / 480 / 900 / 1400 ms | press / hover / UI / reveals / load |
| `--reveal-shift`, `--stagger` | 26 px, 80 ms | approach distance, per-child delay |

**Reveal vocabulary** (`motion/Reveal.tsx`, `data-reveal`): `lines` (masked line rise), `wipe` (clip-path wipe of the child with a 1.12 → 1 settle on the picture), `approach` (rise + scale from 0.96), `settle` (14 px rise), `slide` (in from the left), `draw` (scaleX). Plus count-ups, the strike-through draw and number ticks.

**Motion map**

| Element | Enter (load or scroll) | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
|---|---|---|---|---|---|
| Header plank | drops from above at 150 ms | progress hairline scales with the page; plank lifts 6 px and gains a shadow after 80 px | logo mark tips; nav links dim; menu icon bars slide apart | nav blaze slides and scales to the active section; menu icon morphs to a cross | stays up for the whole walk, hides on scroll-down once inside, returns on scroll-up |
| Signal readout | arrives with the plank | bars drop 4 → 0 and the text counts down in tens, then "At the door", then "Inside" | title shows the bar count | bars fade with a spring | holds "Inside" for the rest of the page |
| Hero plate | scale 1.09 → 1 over 2.4 s | scale 1.04 → 1.12 and a 3.5% drift with hero progress | leans up to 16 px away from a fine pointer | none | dims under a fir overlay as the forest rises over it |
| Hero boughs | slide in from the left at 200 ms | move out left 14%, up 5%, scale 1.22 | lean 30 px with the pointer (opposite the plate) | none | leave the frame as the hero recedes |
| Hero copy | post slides in (240 ms), headline lines rise (320 ms, +120 ms each), the lede lifts 22 px without fading (it is the phone's largest text, so it paints on the first frame), actions and facts settle (820 and 960 ms) | lifts 80 px and fades by 60% scroll | CTA: magnetic pull, fill wipes from the left, label rolls, arrow advances | CTA scales to 0.97, spring release | covered by the walk section |
| Cabin tag | label settles (1.2 s), line draws down (1.3 s), blaze pops (1.9 s) | rides with the plate | none (decorative) | door pings every 3.6 s | rides off with the plate |
| Hero mist (ambient) | starts with the page | none | none | none | removed under reduced motion |
| Hero facts | settle at 960 ms (plain numbers: count-ups are kept below the fold) | fade by 45% scroll | none | none | covered by the walk section |
| Walk head | post slides, headline lines rise, lede settles | none | none | none | scrolls away |
| Trail photograph | clip-path wipe upward, picture settles 1.12 → 1 | pinned; zooms 1.02 → 1.18 toward the door; the dotted amber line reveals from the bottom; "Walked" counts up | none | none | releases with the section |
| Trail rail | rail present from the start | amber fill scales down the rail with metres walked | none | none | full at the door |
| Waypoint posts | head slides in, name rises through its mask, note settles, rule draws, detail settles | blaze lights and name brightens when the post is reached; reverses on the way back | none | blaze scales 0.72 → 1 with a spring | the last post hands to the threshold |
| Threshold stage | pins at the top | exterior dollies into the door, interior fades and grows inside the doorway, boughs part to the left | none | captions cross-fade and rise at beats 0, 1, 2; "Keep walking" hint pulses, then fades at beat 2 | interior holds, then the pine room slides up over it |
| Room photograph | clip-path wipe, picture settle | drifts ±4% with the view timeline where supported | none | none | sticky until the inventory ends |
| Inventory rows | settle, four-step stagger | none | blaze rises at the left, name shifts 6 px, the other rows' notes mute | blaze shows on touch press | none |
| Room figures | approach, staggered, then count up | none | none | none | none |
| Not in the room | items settle, then a strike line draws across each, 140 ms apart | none | none | none | none |
| Band (ambient) | runs while on screen | none | pauses on hover | none | pauses off screen |
| Season head | post slides, headline rises, lede settles | none | none | none | none |
| Season frame | approach with the panel | sticky beside the panel on desktop | none | new plate wipes over the last, from the right going forward in the year and from the left going back, with a 1.09 → 1 settle; caption text re-settles | none |
| Season buttons | with the panel | none | amber rises 12% from the bottom | fill rises to full; press scales to 0.97 | none |
| Month ruler | with the panel | none | focus ring | thumb stretches while held; the current tick grows and turns amber; month name and figures tick up through a mask | none |
| Logbook pages | approach, staggered | none | page straightens, lifts 6 px, shadow and amber lamplight follow the pointer; the others mute | straighten and press on touch | none |
| Stay panel | approach | none | controls fill amber | stepper buttons press to 0.92; night count and total tick through a mask; segmented control inverts | none |
| Hold form | approach | none | field rule draws in amber; label rises | invalid submit shakes the fields once, rules turn char, messages slide down; submit shows a loading bar | form lifts and fades out |
| Key tag | drops in with a spring and 7° of swing | none | link underline redraws | "Held" stamp lands 0.9 s in; title and copy settle after | "Hold different dates" restores the form |
| Mobile menu | none | none | none | opens as a circle from the toggle; links rise in sequence; Escape and link taps close it | closes back into the toggle |
| Footer | sign settles | none | link underlines redraw | links press 1 px | none |

**Ambient budget:** the mist and the door ping in the hero, the hint in the threshold, the band in the room. Never more than two in view, all stopped under reduced motion; the band pauses off screen.

**Reduced motion:** nothing is hidden, nothing pins and nothing loops. The hero is not sticky; the threshold is two captioned photographs; the engine still updates the readout, the signal and the posts (they are information), but writes no scrubbed custom property. State changes become 120 ms fades. Lenis never loads.

**No JavaScript:** hidden pre-reveal states and the pinned layouts sit behind `(prefers-reduced-motion: no-preference) and (scripting: enabled)`, so the server-rendered page is already the finished one. The layout also carries a `<noscript>` override.

## Signature details

1. **The blaze.** An amber rectangle, the shape of a painted trail blaze and of the lit door. It is the logo's door, every bullet, the waypoint markers, the ruler's thumb, the stamp and the error marker.
2. **The losing-signal sign.** The header readout: four bars and "1,900 m to the door", down to no bars and "Inside".
3. **Posts.** Every section opens with a small monospace post: a blaze, a place and a distance or measure.
4. **Sign boards.** Fog planks with 4 px corners carry the header, the cabin tag, the trail caption, the threshold captions and the season caption; the header has two screw heads.

## Do / Don't

- Do keep amber for the blaze and filled controls. Don't set amber text on fog, mist or pine.
- Do let photographs carry colour. Don't add gradients, glows or illustrations.
- Do write distances and counts. Don't write adjectives the photographs already show.
- Do keep the header visible during the walk. Don't hide the readout while it is changing.
- Don't add a second scroll listener, a second scrubbed system in the same viewport, or React state on scroll.
- Don't animate layout properties. Transforms, opacity and clip-path only.

## Files

```
(elsewhere)/layout.tsx                 fonts, metadata, noscript override
elsewhere/page.tsx                     composition (server)
elsewhere/elsewhere.css                tokens, every class, all motion
elsewhere/assets.tsx, assets.generated.ts
elsewhere/icon.svg, opengraph-image.tsx
brand/Logo.tsx, Signal.tsx             mark and lockup; signal bars and blaze
motion/math.ts (+test)                 clamp, lerp, progress, easings, stagger, damp
motion/Reveal, Lines, CountUp, Magnetic, Marquee, Spotlight, SmoothScroll, useInView, useReducedMotion
walk/trail.ts (+test)                  waypoints, anchors → metres, signal, readout
walk/WalkEngine.tsx                    the one scroll engine
threshold/geometry.ts (+test)          cover box, door rectangle, the push-in frame
seasons/seasons.ts (+test)             seasons, months, daylight
seasons/SeasonFrame.tsx                plates, buttons, ruler, facts
stay/quote.ts (+test)                  stay reducer and quote
stay/StayProvider.tsx, StayPanel.tsx
forms/validation.ts (+test), HoldForm.tsx
sections/Header, Hero, WalkIn, Threshold, Room, Seasons, Logbook, Stay, Footer
sections/content.ts (+test)            nav, inventory, logbook, facts
```

## Imagery

Eight supplied photographs, all used, processed by `npm run images -- elsewhere` into 800w and 1600w AVIF and WebP. Notes and prompts are in `docs/image-prompts/elsewhere.md`.

| Key | Where |
|---|---|
| `overlook` | hero plate (the only `priority` image) |
| `boughs-soft` | hero foreground: the bough cutout with the depth-of-field blur baked in |
| `trail` | the walk in, pinned |
| `cabin-green` | threshold exterior, and the green season plate |
| `boughs` | threshold foreground, sharp |
| `interior` | threshold interior |
| `room-detail` | the room |
| `cabin-amber`, `cabin-white` | the amber and white season plates |

The supplied bough file had a checkerboard baked in instead of transparency. `.openlanding-page/elsewhere/media/prepare-assets.mjs` mattes it against the known checker pattern, un-mixes the backdrop from edge pixels and writes a real alpha channel.
