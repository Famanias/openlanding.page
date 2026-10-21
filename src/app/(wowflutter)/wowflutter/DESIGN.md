# WOWFLUTTER: design system

A landing page for a fictional independent record label. **The label ships every record with a zine, so the page is a magazine you turn by hand.** Issue 07 sits open as a two-page spread. You drag a page corner (or flick, or press an arrow key) and the leaf lifts on a hinge, with a shadow that follows your pointer.

## Requirements

Copy two folders into a fresh Next.js app (`npx create-next-app@latest --ts --tailwind --app --src-dir`), delete the scaffold's `src/app/layout.tsx`, `page.tsx` and `globals.css`. There is nothing to install: the template imports no npm packages beyond Next and React.

- **Next.js ≥ 16.4** (App Router, route groups with their own root layout, `next/font/google`, `next/og`)
- **React ≥ 19**, **Tailwind CSS v4** (from `create-next-app`)
- A browser with CSS `sin()`, `container-type`, `cqi` units and `color-mix()` (all evergreen browsers since 2023)
- Folders: `src/app/(wowflutter)/` (code) and `public/templates/wowflutter/` (images)
- `*.test.ts` files are optional and need `vitest`

## Concept

WOWFLUTTER Editions is a four-person label in a former print shop in Leeds. Every record ships with a 32-page saddle-stitched zine, in editions of 500. The name is the tape-speed wobble analog recordings have: **wow** is the slow drift, **flutter** the fast one.

- **The idea → the mechanic:** records ship as printed matter, so the page is a physical magazine you turn by hand. Progress through the book is the pointer's travel, and a turn can be grabbed, reversed or redirected at any frame.
- **Warm, grainy, tactile, loud-quiet, handmade.** Two inks (tape black and riso pink) on uncoated stock. No gradients, no glass, no soft rounded UI.
- **Issue 07, "The Sound of Rooms"** is the whole site: 14 of the zine's 32 pages are on screen, and the colophon says so.

## Palette: tape black and one loud pink, on warm stock

| Token | Hex | Role |
|---|---|---|
| `--color-tape` | `#14110F` | Ink: text, the black feature page, the desk the book sits on |
| `--color-stock` | `#EFE6D4` | Paper: the default page ground, text on black |
| `--color-riso` | `#FF3D8B` | **The one loud colour:** fills, overprints, the pink pages, the tape counter digits |
| `--color-worn` | `#DCCFB8` | Back pages (versos), muted fills, the dog-ear |
| `--color-faded` | `#5E564D` | Muted text, captions, rules |

**Rule:** pink is a fill or an overprint, never small text on paper (it is 2.7:1 on stock). It carries ink text (5.6:1) or large type on black. Tints come from `color-mix()` of these tokens, never from new hexes. All photography is mapped to the ink-to-stock ramp when it's processed, so no photo hue survives; the pink pass behind each image is CSS.

## Type

| Role | Font | Size | Notes |
|---|---|---|---|
| Display | Young Serif 400 | h2 `9.5u`, feature title `11.5u`, back-cover motto `13u`, cover number `32u` | tight leading, balanced wrapping |
| Body | Newsreader 400, italic 400 | `max(14.5px, 3.6u)` / 1.38 | liner notes, interviews; italics for questions and titles |
| Mono | Courier Prime 400/700 | `max(11px, 2.3u)` | uppercase, tracking 0.08em: catalogue numbers, folios, labels, buttons |

`u` is one printed unit, **1% of a page's width** (`1cqi`, because every page is an inline-size container). Everything on a page is sized in units, so a page looks the same at any size. On phones the unit is floored at `4.4px` so text stays readable.

## Layout

One DOM serves two layouts, chosen by a media query (`min-width: 1000px`, `min-height: 640px`, `scripting: enabled`); `book/queries.ts` repeats the same query for JS.

- **Book (desktop):** the page doesn't scroll. A 64px top bar, the book (two pages, 1 : 1.4 each, as tall as the space allows up to 860px), and a 72px bar with Prev, the tape counter, the folio and Next.
- **Flow (phones, short windows, no JS):** the 14 pages are single full-width cards (max 560px) in a normal vertical scroll, with a sticky top bar. Nothing is hidden behind an animation.
- Gutter `clamp(16px, 4vw, 56px)`. Pages are square-cornered, with grain from an inline SVG noise filter.

## The magazine (the mechanic)

Pages are numbered 1..14. **Leaf k** carries page `2k+1` on its front and `2k+2` on its back. **Spread s** shows the back of leaf `s-1` on the left and the front of leaf `s` on the right, so spread 0 is the cover alone and spread 7 the back cover alone.

```
spreadPages(s) = { left: s === 0 ? null : 2s, right: s === 7 ? null : 2s + 1 }
pageToSpread(p) = odd ? (p-1)/2 : p/2          #p14 → spread 7
leafState(k, s) = k < s ? "turned" : "flat"
```

**Turn maths (`book/turn.ts`):**

```
progress   = clamp01(base + travel / (pageWidth × 1.1))     travel = startX − x (forward) or x − startX (back)
release    : velocity ≥ 0.6 px/ms → finish; ≤ −0.6 → cancel; else finish if progress ≥ 0.4
settle     : p += (target − p) × (1 − e^(−dt/100ms)), snap within 0.002, ×2.4 speed for multi-leaf jumps
leaf angle : rotateY(−180° × turn),  turn = dir > 0 ? progress : 1 − progress
shadow     : opacity = sin(turn × 180°) × 0.28 on the leaf, and a cast shadow on the page beneath
book shift : translateX(−25%) at the front cover → 0 once open → +25% at the back cover   (centres a single page)
tape count : round(position / 7 × 999),  position = spread + dir × progress
```

`book/engine.ts` is the state machine (grab → drag → release → settle, plus a queue for keys and contents links). It talks to the DOM only through hooks, so it's tested with a fake clock. **Progress is the single source of truth:** a leaf in the air can be grabbed where it is, a key press in the opposite direction sends it back, and a long jump turns leaf after leaf quickly.

**Rendering:** each leaf is a `slot` (holds `--turn`, z-index and its own `perspective`) containing a rotating `leaf` (`transform-origin: 0 50%`, `preserve-3d`) with a front and a back face (`backface-visibility: hidden`, the back pre-rotated 180°). Resting leaves get `--turn` from `data-state`; while one is moving, the engine writes `--turn` inline to that slot only. Once React has rendered the new spread, a layout effect removes the overrides.

**Input:**

- Drag a corner (a 10% hot zone with a dog-ear that curls on hover/focus) or either page. Press a corner without moving to turn the whole leaf.
- Keys: `→ PageDown` next, `← PageUp` previous, `Home` / `End` the covers. **Space and Enter are never claimed**, and arrows are left alone inside inputs and the radio group.
- Contents rows, the top bar and "On WF-007 →" links are `href="#pN"` anchors; in book layout they turn the book instead of scrolling. `#pN` also opens the book at that page, and the address follows the visible page without adding history entries.
- `inert` is set on pages that aren't on the current spread, so Tab only visits visible links; the folio and an `aria-live="polite"` line announce each spread.

## Pages

| # | Page | Content |
|---|---|---|
| 1 | Cover (pink "07" over ink, `cover-portrait` plate, the only `h1`) | Issue 07 · Autumn 2026 · WF-007 |
| 2 | Editor's letter (worn) | "A note on rooms", a masthead |
| 3 | Contents (stock) | 5 rows, each a link: page number on a pink square, title, note |
| 4 | Feature opener (**black page**) | `feature-stairwell` plate, "The stairwell sessions" |
| 5 | Liner notes, part one | drop-cap text, `feature-baths` plate |
| 6 | Liner notes, part two (**pink page**) | a pull quote and the room's numbers (RT60 2.8 s…) |
| 7–9 | Roster | Marl Quartet, Ines Haverford, Dunmore & Ash: portrait, one answer, link to the record |
| 10–11 | Catalogue, Side A and Side B | WF-001…WF-008 with year, edition and status; `sleeve-stack` band |
| 12 | The pressing plant (worn) | `press-room` plate, colophon rows |
| 13 | Get the next issue | email + Side A (zine by post) / Side B (email only); validated, **never sends a request** |
| 14 | Back cover (**pink page**) | "Slightly off-centre, on purpose.", mark, barcode, link back to the cover |

## Motion

Curve: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` for UI. The leaf's motion is JS-driven (above); everything else is CSS.

| What | How |
|---|---|
| Leaf, shift, shadow | `transform` and `opacity` only, set per frame by the engine; no CSS transition fights it |
| Dog-ear | `transform: scale()` 180ms on hover (fine pointers) and focus |
| Buttons | colour 180ms, press `scale(0.97)`, hover only on `(hover: hover) and (pointer: fine)` |
| Contents row | nudges 1u on hover (fine pointers) |
| **Reduced motion** | turns are instant (`jumpTo`), the leaf cannot be dragged, transitions are off; every page is still readable and every link works |
| **Phones** | the flow layout; the engine never mounts (no key, click or hash listeners are attached) |

## Signature details

- **The off-centre record mark:** the spindle hole is deliberately off-centre (the physical cause of "wow"), with a pink label. Favicon `icon.svg` is the same mark.
- **The wobbling wordmark:** per-letter baseline offsets (slow swings on "wow", quick small ones on "flutter") over an off-register pink pass.
- **Off-register pink plates:** every image sits on stock with a pink block printed 3.2% out of register.
- **Tape-counter folio:** a three-digit counter that runs 000 → 999 as you move through the book, next to `P. 04–05 / 14`.
- **Catalogue numbers** (`WF-007`), a zero-padded folio on every page, and saddle-stitch gutter shading.

## Do / Don't

- **Do** keep every colour inside the five tokens. Run every photo through the ink-to-stock ramp.
- **Do** make emphasis with the pink fill or an off-register overprint, with ink text on it.
- **Don't** set small text in pink on paper, add a second accent, use gradients beyond page shading, round corners or use glass.
- **Don't** claim Space or Enter, or hide content behind the turn. The flow layout and reduced motion must show everything.
- **Don't** animate anything but `transform`, `opacity` and the shade; never `width`, `height`, `top` or `filter`.

## Files

```
src/app/(wowflutter)/
  layout.tsx                  root layout: fonts, metadata, imports wowflutter.css
  wowflutter/
    page.tsx                  top bar + <BookReader pages={14 server-rendered pages}/>
    wowflutter.css            tokens (@theme), both layouts, the leaf geometry, every page's styles
    assets.tsx                assetSrc(), <Picture>, <Plate> (placeholder until images exist)
    assets.generated.ts       image dimensions, written by the image pipeline
    icon.svg, opengraph-image.tsx
    brand/Logo.tsx            Mark (off-centre record), Wordmark, Logo
    book/                     spreads.ts, turn.ts, keys.ts, engine.ts (+ tests), queries.ts, BookReader.tsx
    content/                  contents.ts (PAGES, CONTENTS, NAV), catalogue.ts, roster.ts (+ tests)
    pages/                    Cover, EditorsLetter, ContentsPage, FeaturePages, RosterPage, CataloguePage,
                              PressingPlant, SubscribePage, BackCover, PageFoot
    forms/                    validate-subscribe.ts (+ test), Subscribe.tsx
public/templates/wowflutter/  <key>-800|1600.webp|avif (already ink-on-stock)
```

## Imagery

Eight images, all generated; see `docs/image-prompts/wowflutter.md` for the prompts and filenames. Process them with `npm run images -- wowflutter`, which maps each pixel's Rec.709 luma onto a ramp from `#14110F` to `#EFE6D4`. Any image that's missing renders as a labelled placeholder, so the layout holds before images exist.
