# Orrery: design system

A landing page for a fictional AI company, built as a **10-slide keynote**. Each scroll step advances one full-screen slide. The tone is calm and editorial, and the page deliberately avoids the generic "AI aesthetic".

## Requirements

Copy two folders into a fresh Next.js app (`npx create-next-app@latest --ts --tailwind --app --src-dir`), delete the scaffold's `src/app/layout.tsx`, `page.tsx` and `globals.css`, then install:

```bash
npm i gsap motion @phosphor-icons/react
```

- **Next.js ≥ 16.4** (App Router, route groups with their own root layout, `next/font/google`, `next/og`)
- **React ≥ 19**, **Tailwind CSS v4** (from `create-next-app`)
- Folders: `src/app/(orrery)/` (code) and `public/templates/orrery/` (images)
- `*.test.ts` files are optional and need `vitest`

## Concept

Orrery orchestrates teams of specialised AI agents, the way a clockwork orrery moves its planets: each agent on its own orbit, all of them in time.

- **The page is a keynote.** One idea per full-screen slide, a slide counter ("03 / 10"), a chapter rail, arrow-key navigation, and diagrams that build up piece by piece.
- **Editorial, not technical.** A serif display face, warm bone paper, brass-and-ink imagery. There are no screens, robots, brains, neon or purple gradients.

## Palette

Four colours only. Tints are made with `color-mix()` of these tokens, never with new hexes.

| Token | Hex | Role |
|---|---|---|
| `--color-ink` | `#0E0F13` | Text on bone, background of "ink" slides (03, 09), featured pricing tier |
| `--color-bone` | `#F2EFE8` | Page background, text on ink |
| `--color-ultramarine` | `#2F3BFF` | The one accent: primary buttons, the logo's full stop, step numbers, the accent agent, links on focus |
| `--color-amber` | `#FFB000` | Secondary, used sparingly: the travelling task pulse, "Most teams" badge, check marks on the featured tier |

Derived: `--ink-muted` = ink 62% over bone (secondary text). `--ink-line` = ink 16% (hairlines). `--bone-muted` and `--bone-line` are the inverse on ink slides.

## Type

| Role | Font | Size | Notes |
|---|---|---|---|
| Display (h1, CTA) | Instrument Serif 400 | `clamp(4rem, 11vw, 11.5rem)` | line-height 0.88, tracking −0.025em; the second line is set in *italic* |
| Slide title (h2) | Instrument Serif 400 | `clamp(2.75rem, 6.2vw, 6.75rem)` | line-height 0.95, `text-wrap: balance`; the closing phrase is *italic* |
| h3 | Instrument Serif 400 | `clamp(1.6rem, 2.2vw, 2.25rem)` | |
| Body | Inter Tight 400 | 17px / 1.55 | lead paragraphs `clamp(1.125rem, 1.35vw, 1.375rem)`, max 34ch |
| Labels | Geist Mono 400 | 12px | uppercase, tracking 0.08em: eyebrows, counter, rail, buttons |

Pattern used on every slide title: plain words, then an *italic turn*. For example "One agent *isn't* a team." or "Measured in work *that ships.*"

## Spacing and grid

- Gutter `clamp(20px, 5vw, 80px)`. Top bar 76px. Slides pad `topbar + 24px` on top and 88px at the bottom.
- 12-column grid with a 24px column gap. On desktop, slides reserve 150px on the right for the chapter rail.
- Every slide starts with a mono eyebrow: a 28px rule, then "05 — Use cases".
- Hairlines are 1px. Card corners are 4px. Buttons are pills, 44px tall.

## Motion

Curves: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` for UI, `--ease-deck: cubic-bezier(0.77, 0, 0.175, 1)` for slide changes.

| What | How | Why |
|---|---|---|
| Slide change (desktop) | The incoming slide wipes up via `clip-path: inset(100% 0 0 0) → inset(0)`. The outgoing slide drifts up `translateY(-7vh)`. 700 ms `--ease-deck`. CSS transitions on `data-state="past/active/future"`, so they're interruptible | Feels like a keynote build, not a scroll |
| Input | Wheel and touch via GSAP `Observer` (one step per gesture, 650 ms lock). Keys: ↓ → PageDown Space for next, ↑ ← PageUp for previous, Home/End. Keys typed in form fields are ignored | |
| Slide content | `.orr-reveal` children fade and rise 18px, staggered `--i × 80ms + 280ms` after the wipe | Content builds after the slide lands |
| Orbit diagram (03) | Builds every 450 ms: core → inner orbit + 2 agents → outer orbit + 3 agents → links → amber task pulse (SVG `animateMotion`). The legend lights up in step | Explains the product in five beats |
| Results (06) | Figures count up from 0 over 1.2 s with ease-out-quart when the slide becomes active | |
| Buttons | Colour 200 ms, press `scale(0.97)` 160 ms. Hover effects only on `(hover: hover) and (pointer: fine)` | |

**Phones (< 900px) and `prefers-reduced-motion`:** the deck becomes ordinary stacked sections with normal scrolling. Nothing is hidden waiting for an animation, the orbit diagram renders fully built, and figures show their final values.

**Deep links:** each slide has an id (`#title … #cta`). The hash updates as you move and is read on load. Transitions are disabled until that first jump has happened.

## Slides

| # | id | Tone | Layout |
|---|---|---|---|
| 01 | `title` | bone | Left 7 cols: kicker, display "Many agents, *one clockwork.*", lead, two buttons. Right 5 cols: `title-orbits` art |
| 02 | `problem` | bone | Left 4 cols: `problem-single` art. Right: h2 + three numbered failures with hairlines |
| 03 | `orrery` | **ink** | Left 5 cols: h2 + legend. Right: the orbit diagram (SVG, 600×600 viewBox) |
| 04 | `how` | bone | h2, then three columns: big ultramarine numerals, h3, text |
| 05 | `use-cases` | bone | h2, then three cards: `usecase-1..3` (4:3), h3, text |
| 06 | `results` | bone | h2, then three huge figures with ultramarine units, then a footnote |
| 07 | `quotes` | bone | A large italic pull quote over a faint `quote-texture`, plus two smaller quotes |
| 08 | `pricing` | bone | Three tiers. The middle one is ink-filled with an amber "Most teams" badge |
| 09 | `security` | **ink** | h2, a 2×3 claims grid, `security-texture` column on the right |
| 10 | `cta` | bone | Display "Put your agents *in orbit.*", lead, demo form card (name, work email, company), footer |

The top bar (wordmark plus "Book a demo") and the counter and rail switch colours with each slide's tone.

## Signature details

- The **ultramarine full stop** in "Orrery." It's the logo, the favicon's satellite and the accent agent in the diagram.
- **Italic turns** in every headline.
- The **amber pulse** is the only moving thing once a slide has settled.
- The **chapter rail**: mono labels that reveal on hover, with the active chapter shown as a longer rule.
- **Image placeholders** are hatched boxes labelled with their asset key, so the layout holds before images exist.

## Do / Don't

- **Do** keep each slide to one idea, and leave space around it.
- **Do** use ultramarine once or twice per slide, and amber at most once.
- **Don't** add gradients, glows, glassmorphism, robots, brains, circuit patterns or purple.
- **Don't** animate on hover anything that moves layout. Don't animate on touch devices.
- **Don't** let the form react to deck keys. Arrow keys belong to the input while it's focused.

## Files

```
src/app/(orrery)/
  layout.tsx                 root layout: fonts, metadata, imports orrery.css
  orrery/
    page.tsx                 renders <OrreryDeck />
    OrreryDeck.tsx           top bar + the 10 slides
    orrery.css               tokens (@theme) and all styles
    deck/                    Deck engine, deck-state reducer, SlideCounter, ChapterRail
    slides/                  one component per slide + OrbitDiagram
    forms/                   validateDemo + DemoForm
    brand/Logo.tsx           wordmark and mark
    assets.tsx               assetSrc() + <Picture> (placeholder until images exist)
    assets.generated.ts      image dimensions, written by the image pipeline
    icon.svg, opengraph-image.tsx
public/templates/orrery/     <key>-800|1600.webp|avif
```

## Imagery

All images are generated. Generate them in Gemini using the prompts below, and save them as `<key>.png`. The template expects `public/templates/orrery/<key>-800.webp`, `-1600.webp` and matching `.avif` files. Any image that's missing renders as a labelled placeholder.

### Style preamble

This is already included at the start of every prompt below. It's shown here for reference.

> Editorial still-life photograph with the quality of a fine-art print. Warm bone-white paper background (#F2EFE8), deep near-black ink (#0E0F13), with small, precise accents of ultramarine blue (#2F3BFF) and amber (#FFB000) only. Calm, minimal composition with generous negative space, soft directional daylight, subtle paper texture, shallow depth of field. Brass, paper, ink and glass materials. No robots, no screens, no circuit boards, no brains, no neon, no glow, no purple, no gradients, no people, no text, no logos.

### Images

| # | Filename | Aspect | Where it's used |
|---|---|---|---|
| 1 | `title-orbits.png` | 16:9 | Slide 1, title. Large art beside the 'Orrery.' wordmark |
| 2 | `problem-single.png` | 4:5 | Slide 2, 'One agent isn't a team.' |
| 3 | `usecase-1.png` | 4:3 | Slide 5, use case 1: customer operations |
| 4 | `usecase-2.png` | 4:3 | Slide 5, use case 2: research and analysis |
| 5 | `usecase-3.png` | 4:3 | Slide 5, use case 3: software engineering |
| 6 | `quote-texture.png` | 1:1 | Slide 7, background texture behind customer quotes |
| 7 | `security-texture.png` | 16:9 | Slide 9, security. Background texture |
| 8 | `og-base.png` | 16:9 | Open Graph / social preview background |

#### 1. `title-orbits.png` (16:9)

_Slide 1, title. Large art beside the 'Orrery.' wordmark_

```text
Editorial still-life photograph with the quality of a fine-art print. Warm bone-white paper background (#F2EFE8), deep near-black ink (#0E0F13), with small, precise accents of ultramarine blue (#2F3BFF) and amber (#FFB000) only. Calm, minimal composition with generous negative space, soft directional daylight, subtle paper texture, shallow depth of field. Brass, paper, ink and glass materials. No robots, no screens, no circuit boards, no brains, no neon, no glow, no purple, no gradients, no people, no text, no logos. A vintage brass orrery photographed from slightly above, its curved arms and small planets arranged across the right two-thirds of the frame, one planet painted ultramarine and one tiny amber sphere, long soft shadows falling across the bone paper. Aspect ratio 16:9.
```

#### 2. `problem-single.png` (4:5)

_Slide 2, 'One agent isn't a team.'_

```text
Editorial still-life photograph with the quality of a fine-art print. Warm bone-white paper background (#F2EFE8), deep near-black ink (#0E0F13), with small, precise accents of ultramarine blue (#2F3BFF) and amber (#FFB000) only. Calm, minimal composition with generous negative space, soft directional daylight, subtle paper texture, shallow depth of field. Brass, paper, ink and glass materials. No robots, no screens, no circuit boards, no brains, no neon, no glow, no purple, no gradients, no people, no text, no logos. A single small brass sphere on a thin brass rod standing alone in the centre of a vast empty bone-paper surface, its shadow stretching to the left, a feeling of isolation and quiet. Aspect ratio 4:5.
```

#### 3. `usecase-1.png` (4:3)

_Slide 5, use case 1: customer operations_

```text
Editorial still-life photograph with the quality of a fine-art print. Warm bone-white paper background (#F2EFE8), deep near-black ink (#0E0F13), with small, precise accents of ultramarine blue (#2F3BFF) and amber (#FFB000) only. Calm, minimal composition with generous negative space, soft directional daylight, subtle paper texture, shallow depth of field. Brass, paper, ink and glass materials. No robots, no screens, no circuit boards, no brains, no neon, no glow, no purple, no gradients, no people, no text, no logos. Neat stacks of cream index cards fanned on bone paper, a few cards marked with hand-ruled ultramarine ink lines connecting small circles, a brass paperclip, top-down view. Aspect ratio 4:3.
```

#### 4. `usecase-2.png` (4:3)

_Slide 5, use case 2: research and analysis_

```text
Editorial still-life photograph with the quality of a fine-art print. Warm bone-white paper background (#F2EFE8), deep near-black ink (#0E0F13), with small, precise accents of ultramarine blue (#2F3BFF) and amber (#FFB000) only. Calm, minimal composition with generous negative space, soft directional daylight, subtle paper texture, shallow depth of field. Brass, paper, ink and glass materials. No robots, no screens, no circuit boards, no brains, no neon, no glow, no purple, no gradients, no people, no text, no logos. A brass-rimmed magnifying lens resting on a printed celestial chart with fine ink orbit lines, one orbit traced in ultramarine, a single amber dot under the lens, top-down view. Aspect ratio 4:3.
```

#### 5. `usecase-3.png` (4:3)

_Slide 5, use case 3: software engineering_

```text
Editorial still-life photograph with the quality of a fine-art print. Warm bone-white paper background (#F2EFE8), deep near-black ink (#0E0F13), with small, precise accents of ultramarine blue (#2F3BFF) and amber (#FFB000) only. Calm, minimal composition with generous negative space, soft directional daylight, subtle paper texture, shallow depth of field. Brass, paper, ink and glass materials. No robots, no screens, no circuit boards, no brains, no neon, no glow, no purple, no gradients, no people, no text, no logos. Interlocking brass clock gears laid on gridded drafting paper beside a fine ink technical drawing of concentric circles, one gear tooth highlighted with ultramarine enamel, top-down view. Aspect ratio 4:3.
```

#### 6. `quote-texture.png` (1:1)

_Slide 7, background texture behind customer quotes_

```text
Editorial still-life photograph with the quality of a fine-art print. Warm bone-white paper background (#F2EFE8), deep near-black ink (#0E0F13), with small, precise accents of ultramarine blue (#2F3BFF) and amber (#FFB000) only. Calm, minimal composition with generous negative space, soft directional daylight, subtle paper texture, shallow depth of field. Brass, paper, ink and glass materials. No robots, no screens, no circuit boards, no brains, no neon, no glow, no purple, no gradients, no people, no text, no logos. A single large ink-wash circle in deep near-black on bone paper, its edge feathered by the paper grain, a thin ultramarine ring offset around it, abstract and meditative. Aspect ratio 1:1.
```

#### 7. `security-texture.png` (16:9)

_Slide 9, security. Background texture_

```text
Editorial still-life photograph with the quality of a fine-art print. Warm bone-white paper background (#F2EFE8), deep near-black ink (#0E0F13), with small, precise accents of ultramarine blue (#2F3BFF) and amber (#FFB000) only. Calm, minimal composition with generous negative space, soft directional daylight, subtle paper texture, shallow depth of field. Brass, paper, ink and glass materials. No robots, no screens, no circuit boards, no brains, no neon, no glow, no purple, no gradients, no people, no text, no logos. A close-up of an engraved guilloché security pattern, like the fine line-work on a banknote, printed in ultramarine ink on bone paper, the lines interlacing in concentric rosettes, crisp and precise. Aspect ratio 16:9.
```

#### 8. `og-base.png` (16:9)

_Open Graph / social preview background_

```text
Editorial still-life photograph with the quality of a fine-art print. Warm bone-white paper background (#F2EFE8), deep near-black ink (#0E0F13), with small, precise accents of ultramarine blue (#2F3BFF) and amber (#FFB000) only. Calm, minimal composition with generous negative space, soft directional daylight, subtle paper texture, shallow depth of field. Brass, paper, ink and glass materials. No robots, no screens, no circuit boards, no brains, no neon, no glow, no purple, no gradients, no people, no text, no logos. A top-down technical print of an orrery: concentric fine ink orbit circles on bone paper, a near-black central sun, two planets on the inner orbit and three on the outer, one ultramarine satellite and one tiny amber dot, like an engraved plate. Aspect ratio 16:9.
```
