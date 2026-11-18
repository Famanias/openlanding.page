# Snoot: design spec

A fictional neighbourhood vet clinic in a playful, bold, rounded style. **Every check-up, nose to tail.**

```bash
npm i next react react-dom three lenis
```

## Requirements

- Next.js 16 App Router, React 19, Tailwind v4 (tokens only, prefixed `sn-` classes), Lenis, three.js (`three/webgpu` + TSL).
- Folder-isolated: imports only npm packages and files inside `src/app/(snoot)/`.
- Palette guarded by `scripts/templates.config.ts`; only the eight colours below appear as hex values.
- Works with no JavaScript and with `prefers-reduced-motion: reduce`: the check-up becomes a static full-length Frank with numbered markers and a card grid, every reveal is visible, the 3D ball is never mounted.

## Concept

**A vet's exam goes nose to tail, so the page is one very long dachshund: scrolling walks a stethoscope along Frank from his nose to his tail, and each body part becomes a chapter of care.** Frank reacts as the chest-piece reaches him (nose twitch, ear flop, heartbeat, belly breath, paw lift, tail wag), an ECG trace draws beneath him, and at the tail an "All clear" stamp lands.

Supporting ideas in the same world: you can **boop** Frank's nose in the hero; plans are **collar tags**; booking is **"Fetch an appointment"** and a real-time tennis ball gets thrown when it succeeds.

## Palette

| token | hex | role |
|---|---|---|
| `--color-ink` | `#1F1B3A` | indigo ink: text, every outline, dark slabs (after hours, footer) |
| `--color-paper` | `#FFF4E4` | biscuit: the page |
| `--color-milk` | `#FFFCF6` | cards, fields, chips |
| `--color-pink` | `#FF6B8B` | boop pink: the nose, primary CTAs, plans slab. Always with ink text (6.3:1), never as text on paper |
| `--color-blue` | `#3550F0` | collar blue: check-up and booking slabs, focus rings. Milk text on it is 5.9:1 |
| `--color-yolk` | `#FFC23D` | tags, pills, active states, ticker, visit slab |
| `--color-mint` | `#6FD3B0` | all clear, open now, booked |
| `--color-frank` | `#C9773F` | Frank's coat (illustration only) |

Tints are `color-mix()` of these: `--frank-light`, `--frank-dark`, `--ink-soft`. On pink and yolk slabs `--ink-soft` is reset to full ink for contrast.

## Type

| role | family | variable | use |
|---|---|---|---|
| display | Lilita One 400 | `--font-lilita` | headlines, tag names, prices, the wordmark |
| body | Figtree (variable) | `--font-figtree` | copy, buttons, labels |
| chart | Ubuntu Sans Mono (variable, not preloaded) | `--font-ubuntu-sans-mono` | patient chart, readouts, eyebrows, stamps |

Sizes are fluid `clamp()`: h1 `2.7rem → 6.2rem`, h2 `2.3rem → 4.6rem`, h3 `1.4rem → 1.9rem`. Hero headline lines are authored and `nowrap`, so the font swap never reflows them.

## Layout

- Floating pill header (milk, ink border, 5 px ink "sticker" shadow), a pink leash progress bar with a paw at its tip.
- Slabs stack with 44 px rounded tops and −40 px overlaps: paper hero → tilted yolk ticker → blue check-up (620 vh pinned stage) → paper patients → pink plans → paper team → yolk visit → ink after hours → blue booking → ink footer.
- Corners: everything rounded (14 / 26 / 44 px, pills at 999 px). Borders are 3–4 px ink; raised things sit on a solid ink block offset 5–8 px below.
- Gutter `clamp(16px, 4.6vw, 72px)`, max width 1280 px.

## The mechanic

`checkup/checkup.ts` (tested in `checkup.test.ts`):

- Frank is drawn in a 2600 × 640 viewBox; six chapters each have a resting point `(x, y)`.
- `stageProgress(scrollY, top, height, vh)` = progress through the section's real offsets: `(scrollY − top) / (height − vh)`, clamped.
- `bodyXAt(p) = lerp(40, 2420, p)`: the body point under the chest-piece.
- `trackOffset(bx, trackWidth, anchor) = anchor − bx / 2600 · trackWidth`: the track's translateX, so the examined point sits under a fixed anchor (42 % of the stage, 50 % on phones).
- `pieceYAt(bx)`: piecewise-linear between chapter heights, so the chest-piece rests on each part and glides between them.
- `chapterIndexAt(bx)`: boundaries halfway between chapters. `progressForChapter(i)` inverts it for the rail's jump links.
- `ecgPath(width, baseline, spikes)`: one P-QRS-T blip per chapter; drawn up to the piece with `clip-path: inset(0 calc((1 − var(--fx)) · 100%) 0 0)`.
- `isAllClear(p)`: `p ≥ 0.96` lands the stamp.

`CheckupStage.tsx` runs one passive scroll listener → one rAF → writes transforms straight onto the track, the chest-piece and the ECG clip (no custom properties on the stage, which would restyle the whole Frank SVG every frame), and only on chapter change updates `data-chapter`, card `data-state`, the rail's `aria-current`, the counter and a polite live region with the reading. React never re-renders during scroll. The scrub layout exists only under `@media (prefers-reduced-motion: no-preference) and (scripting: enabled)`.

Other logic modules, all pure and tested: `boop/boopState.ts` (counter, reactions, sneeze every 5th), `plans/plans.ts` (15 % off each extra pet, yearly = 10 months), `hours/hours.ts` (live open/closed sign), `forms/validation.ts` (fields, email-or-phone, next five days without Sundays, tag summary), `ball/fetch.ts` (throw arc and idle bob), `motion/math.ts`.

## Motion

**Personality:** organic and expressive. **Verbs:** *wag* (overshoot both ways and settle: `--ease-wag`, springs) and *breathe* (slow swells: blobs, belly, the open dot, the ball's bob).

**Tokens** (`snoot.css` `@theme static`):

| token | value |
|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--ease-spring` | `linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1)` |
| `--ease-wag` | `linear(0, 0.48 7%, 1.16 18%, 0.93 30%, 1.05 42%, 0.98 56%, 1.01 70%, 1)` |
| `--dur-instant / fast / base / slow / hero` | 90 / 180 / 420 / 760 / 1200 ms |
| `--reveal-shift` | 30 px |
| `--stagger` | 70 ms (plus a deterministic 0–50 ms organic `jitter(i)`) |

**Signature moment:** the chest-piece walks from nose to tail while the ECG draws; at the tail the trace has its last spike, the tail wags double-time, the tongue comes out and the mint "All clear" stamp slams in on the wag curve.

**Reveal vocabulary** (`motion/Reveal.tsx`, CSS under `no-preference` only, `<noscript>` override in the layout): `lines` (mask-rise per authored line), `rise`, `pop` (rise + scale + tilt on `--ease-wag`), `grow` (unfurls from its base), `wipe` (clip-path with inner scale settle), `slide`, `draw`; plus count-ups (`CountUp`) and keyframed chip cascades.

### Motion map

| Element | Enter (load or scroll) | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
|---|---|---|---|---|---|
| Leash (progress) | present from first paint | one rAF scales the line and moves the paw (direct transforms) | n/a (decorative) | n/a | follows to 100 % at the footer |
| Header | bar drops at 150 ms on `--ease-wag` | pads tighter after 80 px; hides on scroll-down past 400 px, returns on scroll-up | nav hover tint; sliding yolk pill (clip-path) on the active section; logo mark tilts | links scale .95; toggle lines morph to an X | menu: clip-path circle from the toggle, links mask-rise staggered |
| Hero copy | eyebrow, two masked headline lines (250 ms + 120 ms), squiggle wipes under "nose", sub, CTAs, stats in sequence | whole block scales to .94 and dims as it exits (`view()` timeline) | primary CTA magnetic pull + yolk fill wipe + label roll + arrow swap | face presses onto its ink block, springs back | slides under the tilted ticker |
| Hero Frank + props | blob springs in, Frank pops up with a wag at 650 ms, props pop in and drift | n/a | "boop me" hint bobs | boop: nose squish, eyes squeeze, ear flop, speech bubble, count rolls; every 5th: sneeze jolt + sparks | scales with the hero block |
| Ticker | rises with the hero's handoff | marquee drifts (paused off-screen) | marquee pauses on hover | n/a | the blue check-up slab overlaps its bottom edge |
| Check-up stage | heading block and first card are present when the stage pins | track slides, chest-piece rests and glides, ECG draws, chapter cards swap, rail pill slides, readout updates | rail links tint yolk | rail link jumps to its chapter (Lenis scroll) | stamp lands at the tail; next slab rounds over the unpinned stage |
| Frank (stage) | n/a | per-chapter reactions: sniff, flop, beat, breathe, paw lift, wag | n/a | n/a | tail wags double-time when done |
| Chapter cards | `pop` into place on chapter change; service chips cascade | driven by chapter | n/a | n/a | previous card tilts out left, next waits tilted below |
| Section headings | eyebrow `slide`, h2 `lines`, lede `rise` | n/a | n/a | n/a | n/a |
| Species tabs | whole switcher `pop`s in | n/a | 2.5D: blob, pet and polaroid shift by depth toward the pointer | tab pill slides; panels slide in the direction of travel; chips cascade; the pet pops and sways/blinks; count-up | old panel tilts out the other way |
| Plans controls | rise with the section | n/a | switch/stepper buttons tint | knob slides; stepper presses; prices roll in | n/a |
| Collar tags | drop from their rings on the wag curve (`view()` timeline, staggered) | entry-range drop | tag swings from its ring | "What's in it" flips the tag in 3D; button presses | n/a |
| Team cards | staggered `pop` cascade | section scales down as it exits | tilt + yolk spotlight under the pointer, lift, photo scales, sticker wags, siblings dim | card presses down | handoff into the yolk visit slab |
| Visit steps | photos `wipe` up with inner scale settle; copy `pop` | paw trail draws across (`view()` timeline) | n/a | n/a | the ink after-hours slab overlaps |
| Promises chips | `rise` | n/a | n/a | n/a | n/a |
| After hours | heading `rise`, door sign `rise`, call card `pop` | n/a | phone card lifts and tilts; number rolls | presses onto its milk block | blue booking slab overlaps |
| Open-now sign | rises | n/a | n/a | re-checks the clock every minute | dot breathes while open |
| Booking form | card `pop`s in; ball `grow`s | n/a | chips lift; inputs' focus ring grows its offset; labels float | chip checks with a tilt; invalid fields shake and the message slides open; drawn check on filled fields; submit presses, shows bouncing dots | form folds down and away |
| Booking success | n/a | n/a | n/a | mint dog tag drops on the wag curve, "Booked" stamp slams at 1 s, focus moves to the tag | "Book another pet" resets |
| 3D ball | poster bobs; real ball fades in when loaded (idle on desktop, tap on touch) | pauses off-screen | drag to spin with inertia | thrown away and bounced back on booking success (poster has a CSS version) | n/a |
| Footer | slab overlaps the booking section | n/a | links' underline draws in from the left and leaves to the right | n/a | paw prints walk across the bottom edge on a loop |

**Ambient budget:** at most three loops in view (hero: blob breathe, props drift, Frank blink/tag sway). Loops stop under reduced motion; the marquee pauses off-screen; the 3D loop pauses off-screen and in hidden tabs.

## Signature details

1. **The heart-shaped nose**: the logo mark, every list bullet, Frank's nose, the collar tag and the centre of each stamp.
2. **The patient chart**: mono readouts (`CHART No. 0412 · Frank · 7 y`, `Heart · 92 bpm · steady`, `03/06`).
3. **Collar tags**: plans, the booking confirmation and Frank's own tag share one tag shape with a punched hole.
4. **The sticker build**: thick ink outlines with a solid ink block under raised things; buttons press down onto it.
5. **The leash**: a pink progress line with a paw at its tip.

## Do / Don't

- Do keep Frank's outline language (9 unit ink strokes, outline layer under fills) for any new illustration.
- Do put ink text on pink and yolk; milk text only on blue and ink.
- Don't use pink as text on paper (2.4:1).
- Don't animate layout properties; every moving part is transform, opacity or clip-path.
- Don't add a second scroll-scrubbed system next to the check-up.

## Files

```
src/app/(snoot)/layout.tsx              fonts, metadata, noscript reveal override
src/app/(snoot)/snoot/
  page.tsx  snoot.css  snoot-sections.css  icon.svg  opengraph-image.tsx  assets.tsx  assets.generated.ts
  brand/       Logo.tsx (Mark, Logo, NoseBullet), Stamp.tsx
  motion/      math.ts(+test) useReducedMotion useInView Reveal Lines Magnetic TiltCard Marquee CountUp ScrollProgress SmoothScroll Button
  checkup/     checkup.ts(+test) Frank.tsx CheckupStage.tsx
  boop/        boopState.ts(+test) Boop.tsx
  species/     species.ts Pets.tsx SpeciesSwitcher.tsx
  plans/       plans.ts(+test) PlanTags.tsx
  hours/       hours.ts(+test) OpenNow.tsx
  forms/       validation.ts(+test) BookingForm.tsx
  ball/        fetch.ts(+test) ballScene.ts BallStage.tsx
  sections/    content.ts(+test) Header Hero Ticker Heading Patients Plans Team Visit AfterHours Book Footer
```

## Imagery

Twelve candid daylight photographs (four vets with their own pets, four visit steps, four patient polaroids). Prompts and filenames are in `docs/image-prompts/snoot.md`. Everything else is code: Frank, the cat, rabbit and tortoise, the props, the stamps and the 3D ball (procedural TSL seam on a sheen felt material).
