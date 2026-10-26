# Understudy: design spec

A fictional rehearsal studio for first jobs. You play a real role (a *part*) at one of eighteen simulated companies, with a *cast* (team), a *director* (manager) and real briefs, and leave with a *reel* (portfolio) that the 3,400 companies *casting* from the studio can open. Free for the first week ("opening night"), then $89 a month.

## Architectural Direction & Hallmark Redesign

Originally inspired by theatrical mechanics, Understudy has been redesigned with **Hallmark (Split Studio & Narrative Workflow)** to establish an independent, authoritative structural identity that breaks completely from the template replication of learnwithzero.com.

Key structural differences:
1. **Studio Masthead Navigation:** Replaces the bottom-dock-only model with an authoritative top masthead featuring direct section navigation (Repertoire, Method, Casting, Tuition), live rehearsal telemetry, and primary audition triggers.
2. **Editorial Production Masthead (Hero):** Incorporates tangible studio parameters (10h/week, 18 active simulated companies, 62% direct callback rate) and dual calls-to-action ("Book call time" and "Explore Repertoire") alongside the theatrical proscenium entry.
3. **The Four-Act Production Method:** Organizes rehearsal as a clear four-act diptych (Act I: The Lot, Act II: The Cast, Act III: The Notes, Act IV: The Reel) pairing director notes in Literata italic with authentic interactive simulated workspaces.
4. **Casting Desk & Callback Ledger:** Structures the direct placement network with clear credibility metrics, turnaround times, and verified outcomes.
5. **Authentic Studio Agreement Card:** Encloses tuition terms in a physical term card format with straightforward monthly pricing and clear parameters.
6. **Curtain Call Colophon:** Features a complete studio directory and index replacing minimal footer text.

## Requirements

```bash
npm i next react react-dom lenis
```

Next.js 16 App Router, React 19, Tailwind CSS v4 (only `@import "tailwindcss"` and `@theme`; the page is written in prefixed `us-` classes). Folder isolation: everything lives in `src/app/(understudy)/`. No images are required; every picture on the page is drawn in SVG and CSS. `Picture` swaps in photography when `npm run images -- understudy` has produced it (see Imagery).

## Concept

**A stage you push into, so the page scrolls you through a proscenium into the dark house and then runs like a show.** The logo mark is a proscenium arch, and the same arch is the clip-path of the dark house in the hero: scrolling opens the mark until its black is the whole screen. From there the page is a production in five scenes: the parts you can play, rehearsal, casting, the contract, and the house lights coming up on the studio floor.

Brand vocabulary, used everywhere: roles are **parts**, the team is the **cast**, the manager is the **director**, feedback is **notes**, the portfolio is the **reel**, matches are **callbacks**, the free week is **opening night**, a schedule is a **call time**, the signup confirmation is a **call sheet**.

## Palette

Eight colours, registered in `scripts/templates.config.ts`. Tints come from `color-mix()` only.

| Token | Hex | Role |
|---|---|---|
| house | `#F4F4F1` | the page, light grounds |
| white | `#FFFFFF` | windows, glass, sheets |
| ink | `#0D0D10` | text, the dark house, the arch |
| night | `#1A1A1F` | raised dark surfaces: cards, curtains |
| graphite | `#66666E` | muted text (5.2:1 on house) |
| cue | `#5B3CF0` | the one accent on light: the wave, numbers, focus, errors (5.8:1 on house) |
| cue light | `#AE9CFF` | the accent on the dark house (7.9:1 on ink) |
| tape | `#FFC547` | rare: spike tape, the ghost light, the highlighter. Never text |

## Type

All through `next/font/google`, with distinct variables.

- **Google Sans Flex** (`--font-us-flex`, variable, with the `ROND` axis at 70): display and body. Display is light (340–400) with tight tracking (−0.04 to −0.05em); body is 400–560.
- **Google Sans Code** (`--font-us-code`, `preload: false`): mono labels, eyebrows, tags, call-sheet references. 11–12px, uppercase, +0.06em.
- **Literata italic** (`--font-us-literata`, `preload: false`): the director's handwriting-like notes, the word "Offer" on the contract, serif company wordmarks.

Scale: hero `clamp(3rem, 1.3rem + 5.4vw, 6.6rem)`, held lines `clamp(2.1rem, 1.1rem + 3.4vw, 4.6rem)`, contract `clamp(2.5rem, 1.1rem + 4.8vw, 6rem)`, h2 `clamp(2rem, 1.15rem + 2.7vw, 3.75rem)`, h3 `clamp(1.6rem, 1.1rem + 1.5vw, 2.5rem)`.

## Layout

1. **Top bar** (fixed): lockup left, live readout "Rehearsing now 1,284" right. Ink flips to house on dark scenes.
2. **Hero** (`#top`, held for 340svh): the pale studio floor plan under a mist, eyebrow, the two-line headline "Your first job, / rehearsed." with a cue dot, and the arch under it. The dark house is inside the same stage.
3. **Parts** (`#parts`, dark, one screen): title, field chips, then an endless ring of ten tall cards that drifts right to left in a gentle arc, with previous / pause / next controls under it.
4. **Rehearsal** (`#rehearsal`): a dark bowl that flattens, the held line "Learn the part by playing it.", then four scenes on a drawn thread, each a title beside a window.
5. **Casting** (`#casting`, held for 280svh): "You rehearse. We cast.", the reel in the middle, ten callbacks, the odometer.
6. **Contract** (`#pricing`, held for 250svh): "Built to get you [contract] cast.", the price, the CTA, three facts.
7. **Finale** (footer, held for 200svh): the studio floor again, the lights coming up, the Start ring, legal links.
8. **Dock** (fixed, bottom centre): Start, menu, Ask. The only navigation.

Gutter `clamp(16px, 0.2rem + 3.4vw, 56px)`, max width 1240px. At ≤ 860px the scenes stack (title above window), casting puts the callbacks in a two-column grid under the reel, and the contract's facts tighten into three narrow columns.

## The mechanic: the push-in and the scene clock

All maths is pure and tested in `stage/` and `motion/`:

- `pinProgress(scrollY, top, height, vh)`: 0..1 through a held (sticky) scene, `(scrollY − top) / (height − vh)` clamped.
- `flowProgress(scrollY, top, height, vh, line)`: 0..1 as a normal section passes a reading line.
- `toneAt(boxes, scrollY, vh, probe)`: the light or dark tone under a probe line (dock at 0.92, top bar at 0.04). The hero turns dark at `data-dark-from=0.42`.
- `archInset(t, vw, vh, rest)`: the proscenium. At `t = 0` the inset leaves exactly the mark under the headline (width `--aw = clamp(76px, 7.2vw, 112px)`, height `1.1667 × aw`, centred at `--ay = 50% + clamp(84px, 12svh, 130px)`, top radius `aw / 2`). At `t = 1` it is the whole screen. The insets ease in with `t³`, so the camera accelerates into the opening. `t = range(p, 0.04, 0.52)`.
- `lensPlace(x, half, bend)`: the company rows on the dark house are seen through a wide lens: `y = −46·d²·bend`, `rotate = −9°·d·bend`, `scale = 1 − 0.16·d²·bend`, with `d = x / half` clamped to ±1.4. Rows drift at 26 px/s in opposite directions (plus 0.18 × scroll), laid out by `rowLayout(count, slot, offset)` which wraps every `count × slot` px.
- `callbacksAt(p, n)` and `digitsOf(n, width)`: callbacks arrive one per tenth of the casting slice, and the odometer columns roll to each digit.

**The parts ring** (`parts/carousel.ts`, tested; run by `parts/useRing.ts`):

- `loopX(i, count, slot, offset) = wrap(i·slot + offset + slot, count·slot) − slot`: every card lives in `[−slot, period − slot)`, so a card that leaves off the left edge re-enters off the right with no seam. Slots are positioned from `left: 0` and the ring starts at `offset = gutter`, so the wrap always happens fully off screen.
- `repsFor(count, slot, viewport) = ceil((viewport + 2·slot) / (count·slot))`: a short filtered set (Design has two parts) is repeated until the ring covers the screen plus a card each side. Repeats are `aria-hidden` with `tabindex="-1"`, but still clickable.
- `arcPlace(x, half)`: `y = 34·d²`, `rotate = 5°·d`, `scale = 1 − 0.05·d²` (`d = x / half`, clamped to ±1.3; `half` never under 560px, so phones get a gentle curve): the cards lift and turn as they come round the edges, like a ring seen from the front.
- Speed: drifts at −36 px/s; the page scroll pulls it 0.32 px per px; a drag follows the pointer 1:1 and `flingVelocity` (last 90 ms, ±3000 px/s) sets the release speed, which `coast(v, target, dt, keep)` eases back (frame-rate independent: `target + (v − target)·keep^dt`). Hover glides to a stop (`keep` 0.02); pause, keyboard focus or an open card brake hard (0.002); otherwise it eases back up to the drift (0.06). `glideStep` moves one card for previous / next / arrow keys, and brings a focused card fully into view.
- One rAF loop writes each slot's `transform` (translate, arc, scale); it sleeps when the ring is still and while it's off screen or the tab is hidden. A drag never turns into a click on a card. Before the script runs, CSS places the slots at `i·slot + gutter`, the same place the ring starts.

`stage/ScrollDirector.tsx` is the one client leaf that owns scroll. On resize it measures every `[data-scene]` (top, height, tone), the arch's rest box (from `.us-hero__slot`) and the thread's lead-in path. On scroll, in one rAF, it writes `--p` on each scene and only then the few things CSS can't compute: the arch's `clip-path`, the lens transforms (in their own rAF loop, which only runs while the house is open and on screen), and the callbacks' `data-on` and digits. Everything else (the curtains, the digits rising, the wave, the drawn lines, the contract, the lights) is CSS reading `--p` through `clamp()`.

**The wave** (held lines): each letter has `--i` and the line has `--n`. With `w = wp·(n + 10) − 5`, a letter's distance is `d = w − i`; it is cue-coloured by `hot = clamp(0, 1 − |d| / 3.5, 1)` (with `|d|` written `max(d, −d)`) and ink by `lit = clamp(0, d / 2.5, 1)`, mixed with `color-mix(in oklab, …)`. The held line can't be measured once stuck, so a measuring strip (`data-feeds`) passes its progress to it as `--fed`.

## Motion

**Personality: technical / cinematic.** Two verbs: **push in** (the camera dollies into the stage, into a window, into a card) and **cue** (things light up one after another, like a lighting board running cues: letters, nodes, callbacks, the house lights). Intensity: one big push in the hero, quieter cues everywhere else.

**The signature moment:** the push through the proscenium. The mark you read as the logo opens to fill the screen, its curtains part, the purple light behind the curtain spills out, and 3,400+ rises digit by digit over two rows of companies bent through a wide lens.

### Tokens (`@theme`)

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.2, 0.715, 0.205, 0.99)` | hover, reveals, sheets |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | load, masks, big entrances |
| `--ease-in-out` | `cubic-bezier(0.625, 0.05, 0, 1)` | wipes, the card flip |
| `--ease-spring` | `linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1)` | press release, odometer |
| `--ease-pop` | `cubic-bezier(0.3, 1.45, 0.45, 1)` | callbacks, stamps, nodes |
| durations | 90 / 180 / 420 / 800 / 1200 ms | instant / fast / base / slow / hero |
| `--reveal-shift`, `--stagger` | 28px, 70ms | rises, cascades |

### Load (CSS keyframes, before hydration)

0 ms floor settles (scale 1.06 → 1) · 150 ms logo drops · 200 ms eyebrow slides, readout drops · 260 / 380 ms headline lines rise through masks · 420 ms dock rises · 640 ms the arch rises · 1000 ms the cue dot pops · 1.1 s rings leave the arch · 1.6 s curtain starts breathing · 1.9 s "Scroll to enter" nudge.

### Motion map

| Element | Enter | Scroll-linked | Hover / focus | Press / state | Exit / handoff |
|---|---|---|---|---|---|
| Top bar | logo drops 150 ms, readout 220 ms | ink flips to house over dark scenes | logo focus ring | logo press dims | stays; readout ticks every 2.6 s |
| Dock | rises from below 420 ms | progress hairline fills; glass turns dark on dark scenes, Start turns cue | Start sheen sweeps, label rolls; round keys lift 2px | all keys scale .94 and spring back; menu bars morph to ×; open key fills ink | halo pulse every 4.2 s, off while its sheet is open |
| Sheets | clip-path opens from the dock, scale .97 → 1, 520 ms | page held (Lenis stopped, overflow hidden) | close key turns 90° | Escape / scrim close; focus trapped and returned | reverse clip to the dock |
| Hero copy | eyebrow slides, lines mask-rise, cue dot pops | lifts 12svh and fades over p 0–0.2 | – | – | gone before the arch opens |
| Arch / dark house | rises 640 ms; curtain breathes ±5px; three rings leave its foot | clip-path opens (t³) over p 0.04–0.52; curtains part over p 0.08–0.4; light slit fades | – | – | the black stays as the parts scene arrives |
| Studio floor | settles from 1.06 | pushes in to 1.5× around the arch | – | – | covered by the house |
| House figure | – | digits rise through masks p 0.48–0.66, words p 0.64–0.8 | – | – | scrolls away with the stage |
| Company rows | – | fade in and bend p 0.56–0.82; drift opposite ways | – | – | rAF stops off screen |
| Parts title / chips | lines mask-rise; chips slide in | – | chip text brightens | pill glides (clip-path) to the chosen chip; ←/→ move | row re-deals: cards cascade in (translate, scale, rotate) |
| Parts ring | props draw (stroke) in sequence | drifts right to left in an endless arced loop; the page scroll pulls it along | hover glides it to a stop; card lifts 8px, spotlight follows the pointer, prop tilts, siblings dim | drag 1:1 with fling; previous / next glide one card; pause holds it; press .98 and flip 900 ms to the brief (inert faces), which holds the ring | dark bowl flattens into the rehearsal |
| Ring controls | rise with the section | – | lift 2px, brighten | press .92 with a spring; pause shows pressed (house fill) | – |
| Bowl | – | scaleY 1 → 0.1 as the rehearsal arrives | – | – | becomes a hairline |
| Held line | – | a cue runs through it letter by letter; cue dot pops with overshoot | – | – | stays held over the scenes behind a fade |
| Thread | – | lead-in draws from the title to the rail; rail fills with progress | – | – | ends at the last scene |
| Scene titles | node pops, label slides, title mask-rises, body rises | – | – | – | – |
| Windows | clip-path wipe with inner scale 1.08 → 1 | – | lift 6px, cue outline glows | – | each window then plays its own scene |
| Lot window | buildings pop in sequence | – | – | – | the brief card slides in at 700 ms; the pin pulses |
| Cast window | messages arrive one by one (650 ms apart) | – | – | – | checklist ticks draw; typing dots loop |
| Notes window | highlighter wipes across two findings | – | – | – | three notes slide in; "Approved" stamps |
| Reel window | work rows rise | – | – | – | stats count up (tabular, final value hidden for readers) |
| Casting | title mask-rises, lead rises | each line draws from the reel, then its company pops (spring); odometer rolls 00 → 10; halo when full | chips are static labels | – | stage lets go after the tenth callback |
| Contract | – | the cue runs through the line; the contract scales out of the gap; signature draws; seal stamps with overshoot; price, CTA and facts rise in turn | CTA fill wipes, label rolls, arrow slides, magnetic pull | CTA press .97, spring back | – |
| Finale | – | house lights spread from the ghost light (clip-path circle 0 → 95%); the line brightens; the ring rises | ring scales 1.05, core turns cue | ring press .95 | footer links draw their underline |
| Forms | floating labels rise; focus ring tightens (outline-offset 6 → 1px) | – | – | invalid: shake once, message slides down, focus first error; submit: label rolls out, dots bounce; success: form clips away, call sheet slides up, "Cast" stamp lands | "Book another part" resets |
| Ask | bubbles rise in | – | chips tint cue | send turns; typing dots for 750 ms | answer bubble rises, log scrolls |

**Reduced motion:** no pins, no clip-path push, no smooth scroll, no ambient loops. The hero is the headline over the floor with the mark beneath, the dark house is a normal section with the figure and straight rows, the parts are a still row that scrolls natively with snap (previous / next still step it, no pause control), every line is lit, the contract is signed and sealed, the finale is lit. **No JS:** the same finished layout (`@media (scripting: enabled)` gates every held state) plus a `<noscript>` reveal override; Start links fall back to email.

## Signature details

1. **The arch mark is the door.** It's the logo, the favicon and the hero's clip-path.
2. **The light behind the curtain:** a purple slit at the foot of the arch where the curtains part (the notch in the logo).
3. **Spike tape:** the X, T and L floor marks actors stand on, pale in the hero, bright in the finale.
4. **The ghost light:** the bulb left burning on an empty stage, at the centre of the floor plan; the finale's lights spread from it.
5. **Cue dots:** a small face in a cue ring pops at the end of each held line.
6. **Live readout:** "Rehearsing now 1,284", ticking.
7. **Call sheet:** the signup confirmation, with a stable reference (US-XXXX), the part, the company, the first call time and a "Cast" stamp.

## Do / Don't

- Do keep every surface house, white, ink or night; cue is the only accent and appears where something is *cued*.
- Do write in the theatre vocabulary, plainly. Specific numbers: 10 hours a week, 5–8 weeks, 62% callbacks, $89.
- Don't add a real company's name or logo to the rows; they are invented wordmarks (`content/companies.ts`).
- Don't animate layout. The chip pill is a clip-path, the bowl a scaleY, the house a clip-path, the row a translate.
- Don't let tape carry text, or put cue (not cue light) on the dark house.

## Files

```
layout.tsx                    fonts, metadata, noscript override
understudy/page.tsx           composes the sections and the client leaves
understudy/understudy.css     tokens, static layout, held states (gated), phones
brand/        Logo (mark + lockup), StageFloor, CompanyMark, Props (props, tags, faces, cue dot)
content/      companies, parts, faq (+ tests)
stage/        progress, arch, lens, odometer (+ tests), ScrollDirector
motion/       math (+ tests), Reveal / MaskLine, WaveLine, SmoothScroll, Magnetic, CountUp, LiveCount
parts/        carousel (+ tests), useRing, PartsBoard, PartCard
rehearsal/    scenes, Windows (lot, cast, notes, reel)
sections/     TopBar, Hero, Parts, Rehearsal, Casting, Contract, Finale
dock/         Dock, MenuSheet, useSheet
forms/        audition (+ tests), AuditionSheet
ask/          answer (+ tests), AskSheet
assets.tsx, assets.generated.ts, icon.svg, opengraph-image.tsx, DESIGN.md, PROMPT.md
```

## Imagery

Nothing is required: the stage floor, props, faces and windows are code. Optional photography (prompts in `docs/image-prompts/understudy.md`) can replace each part card's drawn scene: `part-<id>` keys, 4:5, rendered by `Picture` with the drawn scene as the fallback child.
