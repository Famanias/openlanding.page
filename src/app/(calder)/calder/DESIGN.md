# CALDER & ROWE — hard decisions, argued well

A small New York law firm (eleven attorneys, founded 1987). The page is a bound brief that drafts itself as you scroll.

## Requirements

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 (`@import "tailwindcss"` plus `@theme static`).
- `npm i lenis` (dynamic import, desktop fine pointers only). Nothing else: no `gsap`, no `motion`, no 3D.
- Folder isolation: imports only npm packages and files inside `src/app/(calder)/`. No `@/` aliases. `npm run check` guards this and the palette.
- Images are optional: the two partner portraits render as labelled placeholders until generated (`docs/image-prompts/calder.md`).

## Concept

**A law firm's product is a well-reasoned argument, so the page is a brief being drafted and filed.** Scrolling the pinned section *The argument* writes a memorandum word by word beside the firm's four-step method; margin notes arrive in gold; a page counter turns; the firm's seal presses at the end. Contact is "filing a matter": on submit the form dissolves and the seal presses down on a docket number.

Everything is named in the brief's terms: practice areas are **Counts I–IV**, sections are numbered **§ I–VI**, outcomes are **Authorities** written as citations, the contact form **files a matter**, the address is **Chambers**.

## Palette (midnight + gold)

| Role | Hex | Use |
|---|---|---|
| ink | `#070C17` | ground behind everything, text on paper, footer |
| midnight | `#0E1830` | slabs: hero, the argument, authorities, file a matter |
| ivory | `#F5F0E4` | paper: matters, counsel, questions, the sheets, the form card; text on slabs |
| gold | `#C9A55A` | the one accent: hairlines, numerals, italic emphasis on slabs, the seal, the CTA |
| parchment | `#E8DFCB` | paper tint: the back sheet, card ground, placeholder ground |
| slate | `#55607A` | muted text on paper |
| brass | `#7D5F1F` | gold as *text* on paper (5.2:1 on ivory) |
| garnet | `#9C3A2E` | errors only |

Tints are `color-mix()` of these. Gold is never body text on ivory; use brass. Contrast: gold on midnight 7.6:1, ink on ivory 17:1, slate on ivory 5.6:1.

## Type

- **Fraunces** (`--font-fraunces`, weight 300, roman and italic) for display. Tracking −0.02em, word-spacing +0.08em. Italic is gold on slabs and brass on paper, and is the voice of emphasis ("*argued well.*"). Static weight, not the optical-size axis: the axis would add ~110 KB to the first paint (146 KB vs 40 KB) for a finer italic.
- **Instrument Sans** (`--font-instrument`, weight 400) for body and UI.
- **Cutive Mono** (`--font-cutive`) for labels, docket numbers, page counters: a typewriter face that reads like a court filing. Always uppercase with 0.12em tracking.
- Numerals in running display (§ 1, stats) use Fraunces, not the mono, so digits stay unambiguous.
- Sizes are fluid with `clamp()`: h1 3.1–7.4rem, h2 2.4–5.2rem, body 17px.

## Layout

- Container `min(1240px, 100% − 2 × gutter)`, gutter `clamp(20px, 5vw, 72px)`.
- **Slabs lap over each other.** Every section has a rounded top (`--cr-lap-r`, 28–56px) and a negative top margin of `--cr-lap`, so each section slides over the last, with the previous colour showing in the corners. Midnight and ivory alternate: hero (midnight) → matters (ivory) → argument (midnight) → counsel (ivory) → authorities (midnight) → questions (ivory) → file (midnight) → footer (ink).
- Corners are rounded: pills for buttons, inputs, nav and chips; 24–32px for cards, sheets and photos.
- Header is a floating pill, not a bar.
- Breakpoints: 1100 (hero and split heads stack), 980 (nav becomes the menu), 960 and 620 tall (the brief pins), 820 (cards stack), 520 (phone).

## The mechanic: the brief

`sections/Argument.tsx` renders all four clauses as a finished document (server component). `brief/BriefDriver.tsx` (client leaf, no React state) scrubs it from scroll:

```
runwayProgress(scrollY, sectionTop, sectionHeight, viewportHeight)  → p, 0–1 across the runway
clauseProgress(p, i, n)   = progress(p, i·span, i·span + 0.85·span),  span = (1 − SEAL_TAIL) / n,  SEAL_TAIL = 0.12
activeClause(p, n)        = clamp(floor(p / span), 0, n − 1)
isSealed(p)               = p ≥ 1 − 0.7 · SEAL_TAIL
pageLabel(active, n)      = "p. {active + 1} of {n}"
```

- The driver writes `--p` on each `.cr-clause` (inherited only by that clause's words), `transform` directly on the rail, `data-state` (`past | active | next`) on each step, the page counter text, and `data-sealed` on the section.
- Each word is a `.cr-w` with `--w` (its index) inside a clause with `--n` (word count): `opacity: clamp(.14, p·n − w, 1)`, so words resolve one after another like ink. The margin note fades and slides in over p 0.55–0.97 of its clause.
- CSS pins it: at `(min-width: 960px) and (min-height: 620px)` and `html[data-cr-motion="live"]`, the section is `440vh` and its stage is `position: sticky; height: 100svh`. The same media query gates the driver, so there is no hydration jump.
- Elsewhere (phones, short windows, reduced motion, no JS) it is a plain, fully written document: `--p` defaults to 1, the seal is in place, the page counter is hidden.
- Measurements are taken on resize and font load, never inside the scroll handler.
- Tests: `brief/progress.test.ts` (runway, clause order and overlap, active clause, seal threshold, label) and `forms/matter.test.ts` (validation, docket number).

## Motion

**Personality: soft / luxurious. Verbs: *settle* (primary) and *dissolve* (secondary).** Slow, weighted, quiet; long staggers; everything arrives and rests, nothing bounces except the seal's press (the one spring, reserved for the signature moment) and button release.

**Signature moment:** the brief drafting itself in *The argument*, paid off by the seal pressing; echoed once more by the seal pressing onto a docket number when the form succeeds.

**Tokens** (`@theme static` in `calder.css`):

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(.22, 1, .36, 1)` | default entrance, hover release |
| `--ease-out-expo` | `cubic-bezier(.16, 1, .3, 1)` | hero, masks, big reveals |
| `--ease-in-out` | `cubic-bezier(.65, 0, .35, 1)` | wipes, the menu circle |
| `--ease-spring` | `linear(0, .3 7%, .78 17%, 1.05 28%, 1.03 40%, .99 56%, 1)` | button release, the seal |
| `--dur-instant / fast / base / slow / hero / scene` | 110 / 220 / 420 / 1000 / 1300 / 2000 ms | press / hover / UI / reveals / load / hero scenes |
| `--reveal-shift`, `--stagger` | 26px, 70ms | rise distance, per-child delay |

**Reveals (six kinds, never opacity alone):** `mask` (display lines rise through `overflow: clip`), `rise` (body copy), `cascade` (cards: rise + scale .97), `settle` (sheets and the form card: rise + scale), `slide` (eyebrows, with the rule drawing), `wipe` (photos: clip-path on the child, inner scale 1.16 → 1). Hidden states exist only under `html[data-cr-motion="live"]` inside `prefers-reduced-motion: no-preference`; `Reveals.tsx` flips `data-in="true"` once, then `data-done="true"` after 2.4 s so hover transitions lose the stagger delay. A `<noscript>` rule is the fallback. Clip-path is applied to the *child* of a `wipe` host, because Chromium's IntersectionObserver treats an element clipped to nothing as not intersecting.

**Motion map**

| Element | Enter | Scroll-linked | Hover / focus | Press / state | Exit / handoff |
|---|---|---|---|---|---|
| Header pill | drops in at 60 ms, links staggered 60 ms | compresses (scale .975, glass opaque) after 80px; tucks away while reading down, returns going up | one gold underline slides between links and follows the pointer; phone and CTA brighten | CTA scales .96, fill rises from below; toggle scales .92 | – |
| Progress hairline | – | `scaleX(--cr-page)` | – | – | – |
| Menu (< 980px) | circle opens from the toggle (1 s), links stagger up | locks page scroll | – | toggle morphs to ×; Escape closes, focus returns, Tab is trapped | circle closes |
| Hero background | background settles from scale 1.06; the colonnade fades up and rises as one layer | colonnade drifts up to 7% | – | – | hero scales to .95 and dims as ivory slides over |
| Hero headline | lines rise a short way through their masks from the first frame, 130 ms apart (the headline is the LCP element, so it never starts hidden) | – | – | – | – |
| Hero copy, CTAs, strip | rise at 420 / 760 / 900 / 1050 ms | – | primary pill is magnetic (≤ 12px), label rolls, fill rises, arrow disc swaps; link underline draws in and exits right | button scales .97, releases on the spring | – |
| Hero sheets | sheet rises and unrotates at 640 ms, rule draws | – | – | – | ambient: front sheet floats (11 s), seal ring turns (70 s), gold glow drifts (22 s); all pause off-screen |
| Matters head | eyebrow slides + rule draws, h2 masks, lede rises | – | – | – | ivory laps over the hero |
| Count cards | cascade (rise, scale), 90 ms apart | – | tilt ≤ 4°, lifts 8px, gold spotlight follows the pointer, ghost numeral shifts, shadow fades in, neighbours dim to .55 | arrow disc slides and presses; card `:active` lifts 3px | – |
| The argument | h2 masks, sheet settles | pinned 440vh: words resolve, notes slide in, step list advances, rail fills, page counter turns | – | seal presses with a spring once the last clause is written; scrubbing back un-presses it | midnight laps over matters; ivory counsel laps over it |
| Partner cards | cascade, photo wipes down with inner scale settle | – | photo scales 1.045 | – | – |
| Facts | rise, numbers count up (final value in a hidden span) | – | – | – | – |
| Authorities quote | three lines mask-rise, caption rises | – | – | – | – |
| Citation cards | cascade | – | lift 6px, border brightens, siblings dim | – | – |
| Marquee | – | slow translate (70 s), runs only in view | pauses on hover and focus | – | – |
| Questions head | eyebrow, mask, rise | sticky beside the list | – | – | – |
| Accordion | cascade | – | question warms to brass, icon ring tints | opens by animating `grid-template-rows 0fr → 1fr`; plus morphs to minus; press scales icon .9 | one open at a time |
| File: copy | eyebrow, mask, rise | – | contact links draw a gold underline | – | – |
| Form | card settles | – | floating labels rise, a brass ring fades in on focus, border darkens | invalid fields shake once and slide their message down; submit rolls to three bouncing dots; on success the form dissolves (opacity, lift) | the seal presses onto the docket number, then the lines rise |
| Footer | giant outlined wordmark rises | – | links draw underlines | – | – |

## Signature details

1. **The seal**: a gold ring of lettering around the CR mark, turning slowly in the hero, pressed onto the brief and onto the filing confirmation.
2. **Margin notes**: italic gold annotations ("Fixed-fee quote included.") that slide in beside each clause, and a gold chip on the hero sheet.
3. **Section marks and docket numbers**: `§ I … § VI` eyebrows with a drawing rule; citation numbers (`No. 21-0388`); the filing's `CR-26-0000` docket derived from the form.
4. **Colonnade line-art** behind the hero, in gold hairlines, arriving as a single layer on load.
5. **Laps**: every section's rounded top slides over the previous one.

## Motion audit (improve-animations rubric)

- **Never set scroll values as custom properties on a parent.** A variable on `<html>` or the hero is inherited by every descendant and recalculates their styles each scroll frame. `ScrollVars` writes `transform`/`opacity` straight onto the hero grid, the colonnade and the progress hairline; `BriefDriver` writes `transform` onto the rail. The only inherited scroll variable is `--p` on a clause, which its words genuinely use.
- **Reversible motion is a transition.** The brief's seal press is a `transition` on `transform`/`opacity` keyed on `data-sealed` with the spring easing, so scrubbing back and forth reverses it mid-flight instead of restarting a keyframe. Keyframes remain only for one-shots (load sequence, shake, the success seal).
- **Reduced motion is "fewer and gentler", not zero:** animations stop and transform/clip-path/grid transitions become instant, while opacity, colour, background, border and outline still ease over 120 ms.
- Hover transforms are gated behind `(hover: hover) and (pointer: fine)`; touch gets `:active` equivalents. No `transition: all`, no `ease-in`, no `scale(0)` (rules and lines draw with `scaleX(0)`, which is a line, not an object appearing), no `will-change`, blur ≤ 18px, no animated layout properties (the accordion animates `grid-template-rows`, by design). Press is instant (110 ms) and release springs: asymmetric on purpose.
- Raw durations are tokens; the remaining literals are ambient loop lengths (marquee, drift, float, turn), the timeline offsets of the hero choreography, and the bouncing dots' 1 s loop.

## Performance notes

- Mobile Lighthouse is dominated by bytes it assumes load before the first paint. Fonts are the largest share, so the type stack is Fraunces 300 (roman + italic), Instrument Sans 400 and Cutive Mono: about 70 KB in all.
- Animate whole elements, not SVG children. An SVG's children repaint on the main thread every frame, so the seal is two stacked SVGs (the ring turns as a compositor layer; the mark is still) and the colonnade animates as one layer.
- The largest text on the page (the h1) must not start hidden: it begins its mask rise at the first frame and rises 68%, not 114%.
- `text-wrap: pretty` only on the lead and lede paragraphs; `balance` on headings.

## Do / Don't

- Do keep the language of a brief: counts, clauses, authorities, filing, chambers.
- Do use brass, never gold, for text on ivory.
- Do keep one signature moment; the rest of the motion is quieter support.
- Don't use stock-photo imagery, a lawyer-with-scales cliché, or navy-and-white corporate blocks.
- Don't animate `width`, `height`, `top` or `box-shadow`. Transform, opacity, clip-path only. Shadows fade as pseudo-element opacity.
- Don't hide content in CSS outside `html[data-cr-motion="live"]`.
- Don't put a clip-path on an element a `Reveals` observer watches.

## Files

```
layout.tsx                      fonts, metadata, motion-mode script, noscript override
calder/
  page.tsx                      composes the sections (server)
  calder.css                    tokens, every component, all motion
  DESIGN.md  PROMPT.md  icon.svg  opengraph-image.tsx
  assets.tsx  assets.generated.ts   Picture + placeholder, image manifest
  brand/Logo.tsx  Seal.tsx
  content/firm.ts  argument.ts      typed content (+ content.test.ts)
  brief/progress.ts (+test)  BriefDriver.tsx
  forms/matter.ts (+test)  MatterForm.tsx
  motion/  math.ts (+test) mode.ts useReducedMotion.ts useInView.ts Reveals.tsx
           ScrollVars.tsx SmoothScroll.tsx Magnetic.tsx TiltCard.tsx CountUp.tsx Marquee.tsx
  sections/ Header Hero Matters Argument Counsel Authorities Questions Accordion FileMatter Footer parts
```

## Imagery

SVG, CSS and type carry the page; the colonnade, seal, mark and sheets are drawn. Two photographs are optional: the partner portraits `partner-calder` and `partner-rowe` (`public/templates/calder/`, prompts in `docs/image-prompts/calder.md`). Until they exist, `Picture` renders a labelled placeholder that holds the 4:5 box, so there is no layout shift when they arrive.
