# AUBADE — design spec

## Requirements

- **Next.js ≥ 16.4** (App Router, a route group with its own root layout, `next/font/google`, `next/og`), React 19, TypeScript, Tailwind CSS v4.
- `npm i lenis` (already a repo dependency). It's the only runtime package the template imports. Everything else is CSS and a few rAF loops.
- Folder isolation: imports only npm packages and files inside `src/app/(aubade)/`.

## Concept

- **The brand:** AUBADE is a fictional overnight sleeper from Paris-Gare de Lyon (19:12) to Venezia Santa Lucia (09:48): 9 carriages, 38 cabins, 1,128 km, Thursdays and Sundays. *Aubade* is a dawn song, the poem sung when night ends.
- **Slogan:** "Leave at dusk. Wake somewhere else."
- **The idea → the mechanic:** a night train is seen through its window, so the page *is* the window. In **The Line**, vertical scroll becomes lateral travel: four landscape layers drawn as flat colour fields slide past at different rates. Five legs of the night take over the glass in turn, from claret dusk over Burgundy to apricot dawn on the lagoon, while a timetable rail, a clock and a kilometre readout follow the train.
- **The brand's language:** cabins are *berths*, products are *voitures*, the schedule is *departures*, booking is *reserving a berth*, sections are *legs*.
- **Mood:** hushed, nocturnal, saturated, unhurried, tailored.

## Palette

Six colours used as large flat fields, never as gradients between fields. Tints come only from `color-mix()` of these six.

| Token | Hex | Role |
|---|---|---|
| `--color-nuit` | `#161233` | ink, page ground, the night field |
| `--color-linen` | `#F3ECDF` | paper, text on dark, cabin stock, plaques |
| `--color-claret` | `#8E1F3A` | the single action colour (CTAs), the dusk field, velvet |
| `--color-dawn` | `#F2B37A` | the dawn field; highlights and small accents on nuit (eyebrows, statuses, tunnel lamps) |
| `--color-sapin` | `#1F4A3F` | the Jura forest field, the dining-car section |
| `--color-lac` | `#3E6FA8` | the lake and lagoon field; large type only on linen |

Contrast: linen on nuit 15.3:1, linen on claret 7.4:1, linen on sapin 8.5:1, nuit on dawn 9.9:1, dawn on claret 4.8:1, dawn on sapin 5.5:1. Linen on lac is 4.4:1, so on lac use large type only. Dawn is never text on linen.

## Type

| Role | Font | Use |
|---|---|---|
| Display | **Gloock** 400 (`--font-gloock`) | hero, section titles, plaque names, prices |
| Body | **Albert Sans** 400/500/600 (`--font-albert-sans`) | copy, buttons, nav |
| Utility | **Red Hat Mono** variable (`--font-red-hat-mono`, not preloaded; no weight list, which Turbopack rejects for this family) | eyebrows, times, km, voiture numbers, the departure board, plaques |

The hero is set at `clamp(52px, 8.4vw, 132px)` / 0.92, section titles at `clamp(40px, 5.6vw, 84px)`, and body text at 17px / 1.6. The utility font is 12px, uppercase, with 0.12em tracking. The hero headline's line breaks are fixed (`Leave at dusk.` / `Wake somewhere else.`) so masks never re-flow.

## Layout

- Wrap max is 1320px with a `clamp(16px, 4.5vw, 72px)` gutter. On desktop, sections run 12 columns.
- **Corners:** windows, photos and cards are rounded like carriage windows (`--radius-window: clamp(22px, 3vw, 44px)`, cards 18px). Buttons, inputs, plaques and chrome are near-square (2–3px).
- Sections alternate full-bleed colour fields: nuit (hero, The Line) → linen (Berths) → sapin (Dining car) → claret / nuit / dawn (The Night stack) → nuit (Departures) → linen (Reserve) → claret (footer).

## The mechanic: The Line (`line/`)

### Data (`content/line.ts`, tested)
- **Stations** with progress position, time and km: Paris-Gare de Lyon 0 · 19:12 · 0, Dijon-Ville .20 · 20:51 · 315, Vallorbe .33 · 23:04 · 505, Brig .42 · 01:28 · 715, Domodossola .56 · 01:58 · 757, Stresa .64 · 03:15 · 797, Verona Porta Nuova .78 · 06:22 · 1,003, Venezia Santa Lucia 1 · 09:48 · 1,128.
- **Legs** (`[start, end)` in progress): Dusk over Burgundy [0, .20), The Jura asleep [.20, .42), The Simplon [.42, .56), Lago Maggiore by moon [.56, .78), Dawn on the lagoon [.78, 1].

### Maths (`line/journey.ts`, pure and tested)
- `progressFromOffsets({ scrollY, top, height, viewport })` = `clamp((scrollY − top) / (height − viewport), 0, 1)`. The offsets are cached on resize, never read in the scroll handler.
- `legAt(p)` → the leg index; `legProgress(p)` → 0–1 inside that leg (drives the sun and moon heights).
- `clockAt(p)` interpolates minutes between adjacent stations, crossing midnight, and formats `HH:MM`. `kmAt(p)` interpolates km.
- `layerShift(p, rate)` = `(p × rate × TRAVEL) mod 50` (percent of a 200%-wide layer whose artwork repeats every 50%), so every layer loops seamlessly.
- `tunnelMouth(p)` → `{ enter, exit }` from 0 to 1. Across the 4% before Brig the dark portal wipes in from the right (`clip-path: inset(0 0 0 (1−enter)×100%)`); across the 4% after Domodossola it leaves to the left.
- `stepTarget(p, dir)` → the next or previous leg start (keyboard steps).

### Rendering (`line/`)
- `LineSection` (server) renders a 520vh track with a `position: sticky` 100svh stage, plus a static stacked list of the five legs for reduced motion and no-JS (`html[data-au-motion="live"]` decides which is shown; an inline script in the layout sets it before first paint).
- `Landscape` (server) draws the five scenes as SVG. Each scene has four layers (sky with sun or moon, far, mid, near), and each layer is a 200%-wide SVG whose artwork repeats at 50%. All five scenes are stacked; `data-leg` on the stage cross-fades the active one with opacity only.
- `LineStage` (client leaf) runs one rAF loop on scroll that writes `--au-p`, `--au-leg-t`, `--au-s1…--au-s4`, `--au-enter` and `--au-exit` to the stage, sets `data-leg`, and writes the clock and km with `textContent`. React state changes only when the leg changes, for the `aria-live` plaque.
- The **range input** ("Travel the line") scrolls the page to the matching offset, so scroll stays the single source of truth. ←/→ step legs, Home/End go to Paris/Venezia. Space and Enter are never stolen.
- On phones the stage still pins, with 3 layers (the near layer is hidden) and native scroll. Under reduced motion it never mounts its loop; the static list shows five finished windows.

## Motion

### Identity
- **Personality:** soft / luxurious, with one cinematic set piece.
- **Verbs:** **glide** (lateral, steady, rail-smooth: landscapes, marquees, the nav indicator, button fills) and **settle** (things arrive with weight and come to rest: plaques, headlines, cards, the ticket stamp).
- **Signature moment:** **the Simplon tunnel.** At Brig the dark tunnel mouth wipes across the glass from the right, amber tunnel lamps stream past faster than the landscape ever did, and the glass turns to a mirror (a faint reflection of the cabin's reading lamp blooms). At Domodossola the dark leaves to the left, the train comes out on Lago Maggiore under the moon, and the "Stresa · 03:15" plaque settles.

### Tokens (`aubade.css` `@theme`)
```
--ease-out:      cubic-bezier(0.22, 1, 0.36, 1)      settle (default entrances)
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)       hero, plaques
--ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1)      glide (wipes, blinds, scene swaps)
--ease-spring:   linear(0, 0.4 9%, 0.86 22%, 1.04 33%, 1.01 46%, 0.995 62%, 1)   press release, stamp
--dur-instant 90ms · --dur-fast 200ms · --dur-base 520ms · --dur-slow 950ms · --dur-hero 1400ms
--reveal-shift 32px · --stagger 90ms
```

### Reveal vocabulary (6 types)
1. **mask** — headlines rise line by line through `overflow: clip` masks.
2. **blind** — photos and colour fields wipe down like a window blind (`clip-path: inset(0 0 100% 0)` → `inset(0)`), with an inner scale settle from 1.12.
3. **rise** — body copy, a short 14px rise, staggered.
4. **cascade** — cards rise with `translateY(36px) scale(.96)`, staggered by `--i`.
5. **draw** — rails and rules draw with `scaleX(0 → 1)` from the left; the dining timeline draws vertically.
6. **count** — the dining stats and the berth count on the board count up (final value in a hidden span).
Plus **flap** on the departure board: characters settle through `rotateX(-90deg → 0)` in a stagger when a month tab changes.

### Motion map

| Element | Enter (load or scroll) | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
|---|---|---|---|---|---|
| Header | drops in at 150 ms; links stagger 50 ms | compact after 80 px (backdrop + height); hides on scroll-down, returns on scroll-up; the hairline rail fills with page progress and a claret train dot rides it | link underline draws L→R; the active indicator glides between links | the menu toggle morphs ☰→×; the panel opens with a clip-path circle from the toggle; links settle in a stagger | the panel closes with the reverse circle |
| Hero | linen blind lifts off the window (0 ms), fields settle from 1.06, logo/nav (150 ms), headline masks (300 ms), lead + CTAs + "Next departure" plaque (700 ms) | window layers drift at 3 rates; the headline lifts and dims as you leave | CTA: magnetic pull, claret fill glides in, label rolls | press scale .97 + spring | the window scales to .94 and dims as The Line rises over it |
| The Line (mechanic) | the stage's plaque and rail draw in when it reaches the viewport | 4-layer lateral parallax, leg cross-fades, clock/km, rail train dot, tunnel mouth wipe, lamps, reflection | the range thumb grows; step buttons lift | leg change: the plaque leaves up and the new one settles (`aria-live`) | the window blind draws down at the end of the track, handing off to Berths |
| Berths | header masks; cards cascade | photos inside cards drift ±4% (parallax) | tilt ±6° + lamplight spotlight follows the pointer; photo scales 1.06; siblings dim to .6; arrow slides | press .98; "Choose" pre-selects the berth in the form and glides to #reserve | — (the sapin field blinds in over the linen) |
| Dining car | sapin field blinds down; title masks; photo blind-wipes; stats count up | photo parallax ±6% | menu row: time slides 6px, rule brightens to dawn | — | The Night's first card slides over it |
| The Night | each ritual card rises as a full colour field | sticky stack: each card pins and the next slides over it; the covered card scales to .94 and dims (scroll-driven `view()` timeline) | the photo inside lifts 4px | — | the last card (dawn) hands off to the nuit board |
| Departures | board rule draws; rows cascade; characters flap in | — | row: background tint glides in, "Reserve →" slides in | tab change: the indicator glides; rows leave and enter in the direction of the index delta; characters flap | — |
| Reserve form | title masks; fields rise in a stagger; the ticket preview settles | — | inputs: the floating label rises, the underline draws claret; berth radio cards lift | invalid: shake once ±6px + message slides down; valid: check draws; submit: button → "Coupling…" with a travelling dot → success: the form slides away, the ticket settles in, two punch holes appear in sequence, the "VALIDÉ" stamp settles at −6° with the spring | the success panel offers "Reserve another" (the reverse transition) |
| Footer | the station marquee glides in; the giant slogan masks | the marquee glides against the scroll direction (velocity adds a little) | links: underline draws; marquee pauses on hover/focus | — | — |
| Buttons (all) | — | — | fill glides from the entry side, label rolls, arrow slides | `scale(.97)` in 90 ms, spring release; disabled at .45 opacity, no hover | loading and success states on submit |

Ambient life (at most 3 in view, all paused off-screen and stopped under reduced motion): the hero window's slow glide (layers loop over 60–140 s), the footer station marquee, and the sun slowly sinking in the hero (14 s, alternate).

### Reduced motion and no JS
- `html[data-au-motion="live"]` is set by an inline script only when JS runs and `prefers-reduced-motion: no-preference`. Every hidden pre-reveal state lives under that selector, so no-JS and reduced-motion visitors see everything, finished.
- The Line renders its static list of five finished windows; the rAF loop never mounts (tested in e2e). Lenis never starts. The marquee and hero glide stop. State changes are instant.
- Touch: magnetic and tilt are off (fine pointers only); every hover reveal has a press or in-view equivalent; Lenis is off.

## Signature details
1. **The timetable rail:** in the header (page progress, with a claret train dot) and in The Line (stations, the clock, km).
2. **Enamel station plaques:** linen plates in Gloock + Red Hat Mono, settling in for each leg, the next departure and the ticket.
3. **Voiture · Cabine numbering** on berth cards, the form and the ticket (`Voiture 7 · Cabine 12`).
4. **The punched and stamped ticket** on reservation success.
5. **Window-blind handoffs:** colour fields and photos wipe down like a blind.
6. **The station marquee** in the footer: Paris · Dijon · Vallorbe · Brig · Domodossola · Stresa · Verona · Venezia.

## Do / Don't
- **Do** keep fields flat and hard-edged; drama comes from adjacency of saturated fields.
- **Do** write times as `19:12`, km as `1,128 km`, prices as `€1,180`.
- **Don't** use gradients between palette colours, glassmorphism, emoji or exclamation marks.
- **Don't** put photographs outside the carriage: the outside world is always flat SVG.
- **Don't** animate layout properties; the mechanic uses transforms, opacity and clip-path only.

## Files
```
src/app/(aubade)/layout.tsx           fonts, metadata, motion-mode script, noscript override
aubade/page.tsx                       composes sections (server)
aubade/aubade.css                     tokens, base, sections, motion
aubade/icon.svg  opengraph-image.tsx  assets.tsx  assets.generated.ts
aubade/brand/Logo.tsx                 Logo (lockup) + Mark
aubade/content/                       line.ts, berths.ts, dining.ts, night.ts, departures.ts (+ tests)
aubade/line/                          journey.ts (+ test), Landscape.tsx, LineSection.tsx, LineStage.tsx
aubade/motion/                        math.ts (+ test), mode.ts (the pre-paint motion script), useReducedMotion,
                                      useInView, Reveals (one shared observer + ambient pause), Magnetic, TiltCard,
                                      Marquee, CountUp, SmoothScroll (Lenis + scrollToY)
aubade/sections/                      Header (scroll chrome, nav indicator, menu), Hero, Berths, DiningCar, TheNight,
                                      NightStack (--cover), Departures (tabs + flap), Reserve, Footer, Eyebrow
aubade/forms/                         booking.ts (+ test), BookingForm.tsx, Ticket.tsx
tests/e2e/aubade.spec.ts
docs/image-prompts/aubade.md
```

## Imagery
Seven photographs, all inside the carriage (see `docs/image-prompts/aubade.md`): `berth-couchette`, `berth-cabine`, `berth-grandlit` (4:3), `dining-car` (3:2), `night-turndown`, `night-quiet`, `night-bell` (4:5). Until they exist, `Picture` renders labelled placeholders in a nuit/claret field. Landscapes are never photos.
