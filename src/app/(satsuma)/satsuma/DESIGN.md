# Satsuma — design spec

## Requirements

- **Next.js ≥ 16.4** (App Router, a route group with its own root layout, `next/font/google`, `next/og`), React 19, TypeScript, Tailwind CSS v4.
- `npm i lenis` (already a repo dependency). It's the only runtime package the template imports. Everything else is CSS and two rAF loops (the wheel and the header).
- Folder isolation: imports only npm packages and files inside `src/app/(satsuma)/`.

## Concept

- **The brand:** Satsuma is a fictional marketplace where small brands hire handpicked makers for short vertical product reels: packs of 6, 12 or 24, first reels in 5–12 days. A satsuma peels into segments, which is the same idea as a short clip.
- **Slogan:** "Reels that land, made by hand."
- **The idea → the mechanic:** the reels sit on the inside of a cylinder, so the hero is a curved video wheel. Ten tall cards drift right to left, can be flung with a pointer or a finger, and each card's width, edge heights and lean come from its x position on the curve.
- **The brand's language:** packs are sold *by the segment*, makers are *handpicked hands*, a brief is "what to peel", reels are *wedges*.
- **Mood:** soft, airy, handmade, juicy, confident.

## Palette

Six colours. Tints come only from `color-mix()` of these six.

| Token | Hex | Role |
|---|---|---|
| `--color-paper` | `#FFF6EA` | the page, text on dark |
| `--color-ink` | `#1F1520` | text, the footer |
| `--color-aubergine` | `#3A1D4A` | the primary action, the dark bands, the seal text |
| `--color-satsuma` | `#FF7A2F` | the one accent: fills, rings, strokes, highlights. Never small text on paper |
| `--color-apricot` | `#FFD9B0` | card ground, tints |
| `--color-leaf` | `#2F5D3A` | rare: the logo leaf, scene foliage |

Contrast: ink on paper 16.5:1, aubergine on paper 13.5:1, paper on aubergine 13.5:1, ink on satsuma 6.8:1, aubergine on apricot 10.9:1, apricot on aubergine 10.9:1, leaf on paper 7.1:1. Satsuma on paper is 2.4:1, so it only ever fills or strokes (satsuma on aubergine is 5.6:1). Emphasis in headlines is a satsuma swash behind ink or paper text, not orange text.

## Type

| Role | Font | Use |
|---|---|---|
| Display | **Bricolage Grotesque** 600/700/800 (`--font-bricolage`) | headline, section titles, prices, wordmark |
| Body | **Inter** 400/500/600 (`--font-inter-body`) | copy, nav, buttons, labels |

The hero headline is 88u / 92u (−0.035em, −0.022em on line 2), where `u` is one frame unit. Section titles are `clamp(2.4rem, 5.2vw, 4.6rem)` / 1. Small text has `max()` floors (12–13px).

## Layout

- **Hero:** a 1440×1080 frame, `--u = min(100vw/1440, 100svh/1080)`, every element placed in frame units (see PROMPT.md for the coordinates). The wheel spans the full viewport width behind the copy.
- **After the hero:** a wrap of 1240px with a `clamp(20px, 5vw, 72px)` gutter. The `.sa-sheet` slides over the pinned hero; its top corners are rounded `clamp(24px, 3.2vw, 48px)`.
- Section grounds, top to bottom: aubergine band → paper (How) → apricot tint (Makers) → paper (Packs) → aubergine (Brief) → ink (footer).
- **Corners:** pills for buttons, 28–32px for cards, 16px for inputs.
- **Phones (≤ 820px):** `--u` becomes `100vw/640`. The hero restacks (headline, subline, wheel, CTA, trust line), the wheel is a 250px band with its own profile, the seal and the sprig are hidden, and the nav collapses into a clip-path menu.

## The mechanic: the reel wheel (`wheel/`)

### Geometry (`geometry.ts`, pure and tested)
- **Profile:** `{ centre, halfW, pitch, baseW, growW, baseH, growH, cy, cyLift, push, radius }`. `DESKTOP` is 720 / 706 / 196 / 170 / 48 / 280 / 92 / 687 / 12 / 0.083 / 15; `PHONE` is 320 / 330 / 172 / 150 / 40 / 290 / 84 / 205 / 8 / 0.083 / 18.
- `pushedX(profile, t)` = `centre + t·(1 + push·(t/halfW)²)`, which keeps a ~26u gap between growing cards.
- `cardAt(profile, t, bend)` → width `baseW + growW·d²` with `d = |x − centre| / halfW`; each vertical edge `baseH + growH·q^2.6` with `q` that edge's own normalised distance; vertical centre `cy − cyLift·d²`. `bend` (0–1) scales every growth term, so 0 is a flat row of identical cards.
- `layoutCards(profile, offset, count, bend)` wraps `t = wrap(i·pitch + offset + period/2, period) − period/2`, so one period later every card is back where it started. `cardCount(profile, visibleHalf)` returns ten on the 1440 frame and more (always even) on wider screens, so the seam stays off-screen.
- `quadPoints` + `roundedQuadPath(points, radius)` build the card's shape as an SVG path (quadratic corners, radius clamped to half an edge); the wheel writes it as `clip-path: path('…')` in px every frame.
- `tileLayout(tile, cardW, cardH)` sizes and offsets the shared 5×2 video sheet inside a card: `tileH = max(cardH, cardW / (384/540))`, sheet `5·tileW × 2·tileH`, centred on the card then shifted to its cell.

### Momentum (`momentum.ts`, pure and tested)
- `DRIFT = −50` units/s. `RETAINED_PER_SECOND = 0.05`: a fling keeps 5% of its speed after one second (`v·0.05^dt`, frame-rate independent, snapping to 0 under 2 units/s). `flingFrom(samples)` reads the last 90ms of pointer samples, clamped to ±4,200 units/s. `assembleBend(elapsed)` eases the cylinder from flat to curved over ~1.7s after a 450ms delay.

### Rendering (`ReelWheel.tsx`)
- One rAF loop: advance offset (`advance(offset, fling, dt, drift)`), decay the fling, `layoutCards`, then write each card's `transform`, `width`, `height`, `clip-path`, play icon and (when a clip exists) video offset. It stops when the wheel is off-screen. Nothing writes React state per frame; state is only the card count.
- Unit conversion: a hidden probe `calc(1000 * var(--wu))` wide is measured, so JS and CSS agree on one frame unit. A `ResizeObserver` and the 820px media query re-measure.
- Pointer events with capture: drag follows 1:1, release computes the fling, `touch-action: pan-y`. Arrow keys nudge.
- **First paint:** the cards are server-rendered at rest in desktop geometry through `calc(N * var(--wu))`. Under live motion the wheel stays hidden until it mounts (`data-ready`), then rises while it assembles; with no JS or reduced motion it's simply the finished arc.

### Media (`reel-media.ts`, `scenes/Scene.tsx`)
- `REEL_CLIP` is `null` until real clips exist. Then every card mounts a `<video>` on the same `src` (downloaded once), sized and offset by `tileLayout`, resynced to the first video when it drifts more than 0.15s, fading in on `loadeddata`. Phones may use `srcMobile`. It never mounts under reduced motion.
- Until then each card plays a drawn SVG scene (sneaker, skincare, latte pour, headphones, plant shop, bouquet, pottery wheel, serum drop, top-down latte, headphone stand). Colour comes only from `.sa-f-*` / `.sa-s-*` classes; loops are transform-only.

## Motion

- **Personality:** soft and organic. **Verbs: glide, settle.** Intensity: expressive.
- **Tokens (in `@theme`):** `--ease-out cubic-bezier(.22,1,.36,1)`, `--ease-out-expo cubic-bezier(.16,1,.3,1)`, `--ease-in-out cubic-bezier(.65,0,.35,1)`, `--ease-spring linear(0, .4 9%, .86 22%, 1.04 33%, 1.01 46%, .995 62%, 1)`; durations `--dur-instant 90ms`, `--dur-fast 180ms`, `--dur-base 420ms`, `--dur-slow 850ms`, `--dur-hero 1100ms`; `--reveal-shift 28px`, `--stagger 80ms`.
- **Signature moment:** the wheel assembles from a flat row into its cylinder on load, then glides on your fling and coasts to the drift.
- **Reveal vocabulary:** mask-rise (headlines), rise (leads), cascade (cards, facts, footer), scale (form card), draw (eyebrow rules, connectors, the sprig stem), count-up (steps), clip-path wipe with an inner scale settle (maker media), pop (CTA), wedge cascade (pack rings).
- **Ambient (≤ 3 at once, paused off-screen):** the wheel's drift, the seal's turn, the marquee, and the scene loops (paused off-screen).
- **Reduced motion / no JS:** hidden pre-reveal states exist only under `html[data-sa-motion="live"]`; CSS keyframes and scene loops live inside `prefers-reduced-motion: no-preference`. The wheel is the finished cylinder (still draggable, no coast), every stroke is drawn, nothing moves.
- **Touch:** hover effects have no information of their own; magnetic, tilt and the spotlight run on fine pointers only.

### Motion map

| Element | Enter (load or scroll) | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
|---|---|---|---|---|---|
| Header | logo, nav items (55ms stagger) and pills drop in from 150ms | compacts after 80px (blurred paper strip), hides on scroll-down, returns on scroll-up; rail fills with page progress | one satsuma indicator glides between links; link focus moves it | menu toggle morphs to ×; menu opens through `clip-path: circle()`, links stagger, scroll locks, focus trapped | hides while reading |
| Hero copy | headline lines rise out of a blur (380/520ms), subline (760ms) | frame scales to .95 and dims as the band covers it | — | — | pinned (`sticky`) while the band slides over |
| Reel wheel | rises and assembles from a flat row into the arc (450ms → 2.1s) | off-screen: loop stops | cards: play icon grows and turns satsuma, scene scales 1.06; cursor grab | drag 1:1, fling coasts (5% left after 1s), arrows nudge | the drift carries on under everything |
| Seal, sprig, trust line | sprig stem draws from 1400ms and its leaves unfurl in turn; seal pops at 1500ms; trust line fades in at 1600ms | — | — | — | the seal keeps turning (30s a turn, paused off-screen) |
| CTA (Make a Reel) | scales in with a spring (1150ms) | — | magnetic pull, fill wipes in from the left, label rolls; the pill settles down onto its satsuma plate | press scale .97 with spring release | — |
| Category band | slides over the hero | marquee drifts against the scroll | marquee pauses on hover and focus | — | hands off to How it works |
| How it works | eyebrow rule draws, headline mask-rises, cards cascade, figures count up, connectors draw | — | — | — | — |
| Makers | cards cascade; media wipes in with an inner scale settle | — | tilt ±6° with a following spotlight, lift 6px, siblings dim, media scales 1.06, link underline draws and arrow slides | press lifts less | — |
| Packs | cards cascade; wedges pop one by one | — | lift 6px, siblings dim, button fill wipes and label rolls (magnetic) | press scale .97 | — |
| Brief form | card scales in; facts cascade | — | floating labels rise, focus ring draws in, pack options highlight | invalid fields shake once and messages slide down; submit morphs to bouncing dots; the form lifts away and the confirmation wipes in as its wedges fill | "Send another brief" resets |
| Footer | columns cascade | — | link underlines draw | — | — |

## Signature details

1. **Peeled-segment motif:** the logo, the pack rings (one wedge per reel) and the confirmation ring that fills wedge by wedge.
2. **A turning "handpicked" seal** (text on a circle around a satsuma) and a **leaf sprig that grows from a wedge**, instead of hand-written notes and arrows.
3. **A satsuma plate under the CTA**: the aubergine pill sits up and to the left of it and settles down onto it on hover, focus or press.
4. **Frosted play icon** at each card's bottom-left.
5. **Swash highlights** under the last words of each headline instead of coloured text.

## Do / Don't

- **Do** keep `cardAt` and `layoutCards` the only source of card geometry; the CSS-only first paint must match them.
- **Do** key clip-path reveals off a visible ancestor. An observer treats an element clipped to nothing as off-screen.
- **Do** keep satsuma to fills, strokes and swashes.
- **Don't** hotlink third-party video or image hosts. Clips come from `public/templates/satsuma/clips/`.
- **Don't** add a drop shadow to the cards; the shape does the work.
- **Don't** put React state on the pointer or scroll path.

## Files

```
(satsuma)/layout.tsx                  fonts, metadata, MOTION_SCRIPT, noscript override
satsuma/page.tsx                      composes the sections
satsuma/satsuma.css                   tokens, base, hero frame, wheel, sections, keyframes, motion
satsuma/brand/Logo.tsx  icon.svg  opengraph-image.tsx
satsuma/assets.tsx  assets.generated.ts   Picture + labelled placeholder
satsuma/wheel/                        geometry.ts, momentum.ts (+ tests), ReelWheel.tsx, reel-media.ts, scenes/Scene.tsx
satsuma/content/                      reels.ts, makers.ts, packs.ts, steps.ts, segments.ts (+ content.test.ts)
satsuma/motion/                       math.ts (+ test), mode.ts, Reveals, ScrollVars, Magnetic, TiltCard, Marquee, CountUp, SmoothScroll, useInView, useReducedMotion
satsuma/sections/                     Header, Hero, Decor, Categories, HowItWorks, Makers, Packs, Brief, Footer, Eyebrow, SegmentRing
satsuma/forms/                        brief.ts (+ test), BriefForm.tsx
tests/e2e/satsuma.spec.ts
```

## Imagery

No photographs are required: every card and maker media is a drawn scene. To use real footage, follow `docs/image-prompts/satsuma.md`: one 5×2 grid clip (or ten clips composed into one sheet) goes to `assets/incoming/satsuma/clips/`, is encoded into `public/templates/satsuma/clips/`, and `REEL_CLIP` is pointed at it. Optional maker portraits (`maker-<id>.jpg`) go through `npm run images -- satsuma` and replace the scenes in the Makers grid.
