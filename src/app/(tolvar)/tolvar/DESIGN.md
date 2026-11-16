# TOLVAR EARTHWORKS: design

A landing page for a fictional family excavating company in Aitkin, Minnesota. It is a redesign of a real
small-contractor site, rebuilt as a template: the company, owner, address, phones and email are invented, and the
jobsite photographs are real phone photos with the original lettering painted out.

```
npm i lenis
```

Everything else is Next.js 16, React 19, TypeScript and Tailwind v4 (tokens only).

## Requirements

- One page, eight sections, for a local trades business whose customers mostly arrive on a phone wanting a number to call.
- Every one of the business's 20 services appears as real text.
- The phone number is reachable from every screen: header, hero, estimate section, footer, phone menu.
- A free-estimate request form that validates locally and makes no network call.
- All content visible with JavaScript off and with `prefers-reduced-motion: reduce`.
- Mobile Lighthouse: performance 90 or more, accessibility 95 or more, best practices 100.

## Concept

**Every job is dirt going somewhere, so the page sorts everything by the four ways dirt moves: cut, fill, pipe and haul.**

The services are four tabs (Cut / Fill / Pipe / Haul), the job log filters by the same four, and the estimate form
asks which of the four your job is. Picking "Get pipe work quoted" in the tabs pre-selects Pipe in the form.

Slogan: **Dig it right. Move it once.**

## Palette

| Name | Hex | Role |
|---|---|---|
| Diesel | `#1B1A17` | Ink, type, the hero and crew slabs |
| Limestone | `#ECE7DC` | The page |
| Chalk | `#F8F5EE` | Cards, the form, marking-paint dashes |
| Blade | `#F2B31B` | The only accent. Always a fill behind diesel type, or type on a dark slab. Never text on limestone |
| Topsoil | `#2F261E` | Dark slabs: job log, footer |
| Clay | `#9A4A2B` | Form errors only |
| Gravel | `#6A645A` | Muted text, hairlines |
| Locate blue | `#1F5FA8` | Locate flags on pipe work and the 811 note. Nowhere else |

Tints are `color-mix()` of these. The list is registered in `scripts/templates.config.ts`, so `npm run check` fails any other colour.

## Type

| Role | Family | Use |
|---|---|---|
| Plate (display) | Sofia Sans Extra Condensed 800/900, uppercase | Headlines, buttons, tab names, service names, numbers |
| Work (body) | Work Sans 400/500/600 | Paragraphs, form fields |
| Gauge (mono) | B612 Mono 400/700, uppercase, tracked | Eyebrows, tickets, readouts, phone chip, captions |

All three load through `next/font/google` in `layout.tsx` as `--font-sofia-condensed`, `--font-work-sans` and
`--font-b612-mono`. Sizes are fluid `clamp()` values; display line-height sits at 0.84 to 0.88.

## Layout

- Gutter `clamp(18px, 4.6vw, 72px)`, content max 1,360 px. Corners are sharp: 2 px everywhere except the level bubble.
- Background is flat colour. No gradients, no blobs. Sections alternate limestone, topsoil and diesel.
- Section order: Header, Hero, Ticker, The work, Job log, The yard, About, Crew, Estimate, Footer.
- Two-column sections collapse to one below 1,000 px. The job log is a CSS multi-column flow (2, 3, then 4 columns) so
  portrait and landscape photos keep their real proportions.

## The mechanic: Cut / Fill / Pipe / Haul

- `work/services.ts` holds the four kinds and their 20 services, `nextTab()` (arrow, Home and End keys; anything else
  returns `null` so Space and Enter still press the button) and `panelState()` (`active`, `before`, `after`).
- All four panels stay in the DOM in one grid cell. `data-state` moves them: the open panel is in place, earlier ones sit
  7% to the left, later ones 7% to the right, both hidden. Because it is a CSS transition keyed on state, a change can
  reverse mid-flight.
- A single yellow marker slides under the tabs: `translateX(calc(var(--tv-tab) * 100%))`.
- `work/JobKindProvider.tsx` is a small context. The panel's quote button sets the kind; `forms/EstimateForm.tsx` reads it.
- `joblog/jobs.ts` holds 22 jobs, `filterJobs()`, `stepIndex()` (wraps both ways) and the label helpers. The viewer is a
  native `<dialog>`, so focus trapping and Escape come from the browser.

## Motion

**Personality: kinetic and weighted, like iron. Two verbs: push and drop.**

- **Push:** things arrive sideways like a blade pass. Photo wipes, button fills, tab panels, the phone menu, the form leaving.
- **Drop:** things land from above and settle a hair past level. Cards, tickets, job tiles, the sent ticket.
- Nothing floats, drifts or fades on its own.
- **Signature moment:** changing a work tab. The yellow marker slides, the old panel is pushed out, the new photo wipes
  in from the left and its service rows rise in sequence.

### Tokens (`@theme` in `tolvar.css`)

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.2, 0.9, 0.25, 1)` | Default entrance, hover release |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Headline line rises |
| `--ease-in-out` | `cubic-bezier(0.7, 0, 0.2, 1)` | Wipes, fills, panel changes |
| `--ease-settle` | `linear(0, 0.5 10%, 0.92 22%, 1.05 32%, 1.01 46%, 0.995 60%, 1)` | Drops and press release |
| `--dur-instant / fast / base / slow / hero` | 90 / 160 / 380 / 700 / 1100 ms | Press / hover / UI / reveals / load |
| `--reveal-shift`, `--stagger` | 22 px, 60 ms | Rise distance, per-child delay |

### Reveal vocabulary (`motion/Reveal.tsx`)

`lines` (masked line rise, headlines), `push` (clip-path wipe of the children with the photo settling from 1.14 scale),
`drop` (from 34 px above with the settle curve), `rise` (22 px, body copy and rows), `slide` (22 px from the left,
eyebrows), `draw` (scaleX from the left, hatch dividers and the grade line), plus `CountUp` for the stats.

The wipe clips the element's children, never the observed element itself: a fully clipped target does not intersect,
so it would never reveal.

### Motion map

| Element | Enter | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
|---|---|---|---|---|---|
| Level bar | Present from first paint | Bubble position is page progress | None (decorative) | None | Stays while the bar hides |
| Header bar | Items drop in from 150 ms, 50 ms apart | Hides going down past 480 px, returns going up; logo scales to 0.9 off the top | Nav marker slides to the section being read; phone chip lifts | Phone chip and menu toggle press down; toggle bars morph to a cross | Slides up under the level bar |
| Phone menu | Wipes in from the right; links slide in staggered | Page scroll locked | Focus ring | Link closes it | Wipes back out |
| Hero | Photo wipe, eyebrow slide, two headline lines rise, copy and buttons rise, tickets and job tag drop, grade line draws | Photo drifts 5% with `--tv-hero` | Primary button is magnetic; fill pushes across | Buttons drop 3 px and spring back | Grade line closes the section into the ticker |
| Ticker | Running when in view | Paused off screen | Pauses on hover | None | Hard yellow band between hero and work |
| Section heads | Eyebrow slides, headline lines rise, lede rises | None | None | None | Hatch divider draws at the section foot |
| Work tabs | Block rises | None | Idle tab names lift 3 px | Marker slides; panel pushed out and in; photo wipes; rows rise staggered; tab presses down | Earth hatch draws |
| Job log | Block rises | None | Tile lifts 6 px, photo scales 1.06, other tiles dim to 0.5 | Filter re-drops the matching tiles staggered; tile presses down | Gravel hatch draws |
| Photo viewer | Card drops in, photo wipes | Page scroll locked | Keys invert | Each step re-wipes the photo; keys press down | Native dialog close |
| Yard | Three photos wipe in sequence; table rows rise staggered | None | Photos scale 1.05; row tints yellow | None | Rock hatch draws |
| About | Photo wipes; tickets drop; stat cards drop staggered and count up | None | Stat lifts 6 px with a pointer-following glow | None | Dark crew slab follows |
| Crew | Lines rise; list rises; button drops; hiring dot pulses | None | Title slides 10 px; icon edge turns yellow | Row opens through `grid-template-rows`; icon bar rotates and fills | None |
| Estimate form | Card drops | None | Kind chips tint; link underlines draw in from the left and leave to the right | Invalid fields shake once and show the message; submit bar fills; form wipes out and the ticket drops in line by line | "Send another" restores the form |
| Footer | Static slab | None | Link underlines draw | None | End of page |

### Reduced motion, no JavaScript, touch

- Every hidden pre-reveal state lives under `prefers-reduced-motion: no-preference`. With motion reduced, transitions are
  1 ms, animations are off, the photo does not drift, Lenis never loads and the magnet is off.
- A `<noscript>` style in the layout shows every reveal, lays all four work panels out in full and opens every position.
- Hover effects are gated behind `(hover: hover) and (pointer: fine)`. Every hover has a press or in-view equivalent.

## Signature details

1. **Spirit-level progress.** The bar across the top of the page is a level vial; the bubble's position is how far you have scrolled.
2. **Section hatches.** Earth, gravel and rock hatches from civil drawings divide the sections.
3. **Load tickets.** Dashed mono tags with a check: "Free estimates", "Licensed & insured", the sent estimate ticket.
4. **Marking paint.** A white dashed outline sits around the hero photo like a proposed excavation.
5. **Locate flags.** A blue flag marks pipe work and the 811 note, the way a locator flags a water line.

## Do / Don't

- Do put diesel type on yellow. Don't put yellow type on limestone.
- Do keep corners at 2 px. Don't round cards or buttons.
- Do write in numbers and short sentences. Don't write "solutions".
- Do keep one accent. Locate blue is for pipe only.
- Don't add stock photography. The photos are the point.

## Files

```
layout.tsx                  fonts, metadata, noscript overrides
tolvar/page.tsx             composes the sections
tolvar/tolvar.css           tokens, components, motion
tolvar/assets.tsx           Picture + assetSrc; assets.generated.ts is written by npm run images
tolvar/icon.svg, opengraph-image.tsx
tolvar/brand/               Logo.tsx (mark, lockup), Marks.tsx (Hatch, Ticket, Flag)
tolvar/motion/              math, scroll (tested), Reveal, CountUp, Marquee, Magnetic, Spotlight,
                            ScrollChrome (one rAF scroll loop), SmoothScroll (Lenis), useInView, useReducedMotion
tolvar/work/                services.ts (tested), WorkTabs.tsx, JobKindProvider.tsx
tolvar/joblog/              jobs.ts (tested), JobLog.tsx
tolvar/forms/               validation.ts (tested), EstimateForm.tsx
tolvar/sections/            content.ts (tested), Header, Hero, Ticker, Work, JobLogSection, Yard, About,
                            Crew, Positions, Estimate, Footer
```

## Imagery

31 photographs, listed in `docs/image-prompts/tolvar.md`. They are real jobsite phone photos, most 1,280 px wide or
smaller, so layouts keep them at or below their native width: the hero photo sits in half the screen, not full bleed.
Lettering that named the original business was painted out with a median filter before processing
(`.openlanding-page/tolvar/media/prepare-photos.cjs`). Equipment makers' own badges are left as shot.
