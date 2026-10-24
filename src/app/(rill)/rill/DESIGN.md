# RILL — design spec

## Requirements

- Next.js 16.4.2 App Router, React 19.3, TypeScript and Tailwind CSS v4.
- Route-local imports only inside `src/app/(rill)/`; no `@/` aliases.
- No runtime package beyond the repository's existing Next/React dependencies; native browser scroll and SVG are enough for the mechanic.
- Complete without JavaScript, with `prefers-reduced-motion: reduce`, without generated media, and on a 390 px touch viewport.
- Palette guard registration uses six colours: `#14231E`, `#F0E9DB`, `#B85C43`, `#5B8174`, `#87956C`, `#C9B79E`.
- User-generated assets are optional. `Picture` and `VideoPlate` render labelled placeholders until `assets.generated.ts` has entries.

## Concept

RILL is a field-hydrology studio for dryland farms. It reads terrain, slows runoff, and keeps water in the ground.

**The central idea → the signature mechanic:** a farm is a watershed, so the page follows one drop from ridge to root zone; scroll, the rain gauge, and the water budget stay in sync.

The page is image-led: generated aerial landscapes, soil macros, and short after-rain clips are the main attention. Over them, contour strokes, field coordinates, and a 0–80 mm rain gauge make the work legible. The footer returns to the same drop as a small ecosystem of soil, roots, mycelium, crop and water.

## Palette

| Token | Hex | Role |
|---|---|---|
| `--color-basalt` | `#14231E` | ink, dark stages, type and field ground |
| `--color-limestone` | `#F0E9DB` | paper ground and light type |
| `--color-oxide` | `#B85C43` | one action accent, storm threshold and focus ring |
| `--color-riverstone` | `#5B8174` | water line, live state and contour overlay |
| `--color-lichen` | `#87956C` | rare ecology cue and system status |
| `--color-silt` | `#C9B79E` | cards, rules and paper tint via `color-mix()` |

All intermediate surfaces use `color-mix()` from these tokens. Iron oxide is a fill or large signal on limestone; basalt and limestone carry small text for AA contrast. Generated photos are content and are processed without introducing UI colours.

## Type

| Role | Face | Use |
|---|---|---|
| Display | Cormorant Garamond 500/600, normal and italic | RILL wordmark, hero, chapter titles and selected field-note turns |
| Body | Fira Sans 400/500/600 | reading copy, controls and form labels at 17px / 1.6 |
| Utility | Fira Mono 400/500 | coordinates, rain readout, eyebrow labels, buttons and chapter rail |

Fonts are loaded through `next/font/google` with distinct CSS variables (`--font-cormorant`, `--font-fira-sans`, `--font-fira-mono`). Display sizes use `clamp()` and the hero keeps a fixed two-line break on wide screens to avoid CLS.

## Layout

- Gutter: `clamp(20px, 5vw, 80px)`; content max width 1320px; 12-column grid above 960px.
- Header is a fixed 64px limestone rail that compresses after 72px, shows the live rainfall value, and uses a sliding active indicator.
- Hero is a `min(92svh, 860px)` image plate with copy centered on desktop and left-aligned on narrow screens; media is allowed to cover the full viewport.
- `Read the land` is `min-height: 360svh` with a `100svh` sticky stage on fine-pointer desktop. It becomes normal flow on touch, short viewports, reduced motion, or missing JavaScript.
- Water budget alternates dark and light panels. Field systems use three image cards; field notes use a wide record rail; the seasonal ledger uses a responsive month grid.
- Corners are 6px on media frames and 8px on cards. Buttons are 9999px pills; field labels and data plates remain squared to echo instruments.
- Alignment deliberately varies: hero and one water-budget readout center; field records stay left; the third field-system card and ecosystem footer use a right-hand anchor.

## Watershed mechanic

`watershed/water.ts` is pure and tested. Rainfall maps linearly from 0 to 80 mm, then the budget derives three field-capacity values:

```
runoff  = clamp(0, 100, max(0, mm - 26) * 1.2)
storage = clamp(0, 100, mm * 0.92 - runoff * 0.24)
rootZone = clamp(0, 100, storage * 0.74)
status  = mm < 18 ? "dry" : mm < 42 ? "holding" : "ready"
```

The signature threshold is 42 mm. `watershedPhase` changes at progress 0.2, 0.5 and 0.78; the current phase is announced once through `aria-live`. `contourPoint` returns a deterministic cubic route for the SVG drop. The range input is real HTML, supports arrow keys/Home/End, and writes the store. On desktop while the stage is active, dragging also scrolls the stage to the inverse progress; on phones the input updates the store without moving the document.

## Motion

**Identity:** organic / analog. The two verbs are **trace** and **settle**. Arrivals use `cubic-bezier(0.22, 1, 0.36, 1)`, handoffs use `cubic-bezier(0.65, 0, 0.35, 1)`, and press release uses `linear(0, 0.16 12%, 0.76 28%, 1.06 50%, 0.98 74%, 1)`. Durations are 90ms instant, 180ms fast, 480ms base, 920ms slow, and 1200ms hero; child stagger is 80ms.

**Signature moment:** at 42 mm, the runoff line draws over the generated ridge footage, crosses the contour swale, and settles into the root-zone macro. The value, line, and copy change together.

### Motion map

| Section/component | Enter | Scroll-linked | Hover/focus | Press/state change | Exit/handoff |
|---|---|---|---|---|---|
| Header / chapter rail | mark traces in, links stagger | compresses, live rail fills from `--rl-progress` | indicator slides, links draw underline | menu icon springs to open state | returns on upward scroll |
| Hero storm film | image settles from scale 1.06, headline mask-rises, CTA staggers | two contour layers drift a few percent | CTA fill wipes from pointer entry; field coordinate glints | press scales .97 and springs back | media scales .97 as land stage enters |
| Read-the-land stage | plate clip-wipes, HUD rises, contour rule draws | sticky camera phase, rain value, line and media crossfade | gauge focus ring traces; phase chips lift | range input spring updates stage and store | outgoing plate dims and next plate wipes in |
| Water budget | numbers count up, rules draw | readout tracks shared rain store | stat cards lift/spotlight | threshold changes `data-status` and icon | dark panel hands river line to systems |
| Field systems | three cards cascade with tiny rotation | image crop drifts against scroll | card lifts 6px, media scales 1.04, spotlight follows pointer | card press snaps and reveals detail | last card line draws into field notes |
| Field notes | record rows mask-rise; stamps draw | rail drifts horizontally with scroll | active record tilts 2° and neighboring records dim | selection swaps directional detail | last record clips into ledger |
| Seasonal ledger | month chips stagger; year line draws | month rail parallax is small and bounded | month chip underline draws | selection slides old detail out/new detail in | year line becomes form rule |
| Field-walk form | labels and fields rise in stagger | none; form remains stable | floating labels and focus rings trace | invalid shake, submit morphs loading → success panel | success panel clips to ecosystem footer |
| Ecosystem footer | diagram paths draw and copy settles | one root CSS variable controls quiet drift | links underline from left | back-to-top springs | breathing pauses off-screen |

Ambient life is capped at three visible loops: the active storm line, one film grain/plate drift, and the ecosystem footer breathe. All pause off-screen and disappear under reduced motion.

## Signature details

- Live `42 mm` storm threshold and `0–80 mm` rain gauge.
- Field-coordinate eyebrow labels and a chapter rail with one sliding indicator.
- Generated media placeholders that keep their final aspect ratios and expose the asset key.
- Specific record cards with hectares, millimetres, and days of available moisture.
- Ecosystem footer diagram that resolves the page's drop into soil, root, mycelium, crop and water.

## Do / Don’t

**Do** use documentary aerials, wet soil grain, contour overlays, field numbers, varied alignment, and calm organic motion. Keep the paper/ink contrast high and let the image do the emotional work.

**Don’t** use generic green gradients, robot/farm stock clichés, stock people, a dashboard full of cards, hover-only affordances, or a static page where the watershed value is decorative.

## Files

`layout.tsx` · route metadata and fonts  
`rill/page.tsx` · server composition and no-JS structure  
`rill/rill.css` · palette, layout, motion tokens and prefixed rules  
`rill/brand/Logo.tsx` · lockup and mark  
`rill/assets.tsx` / `assets.generated.ts` · media placeholders and processed assets  
`rill/motion/` · reveal primitives and tested math  
`rill/watershed/` · store, stage and tested water maths  
`rill/sections/` · hero, stage, budget, systems, notes, ledger and footer  
`rill/forms/` · tested validation and field-walk form  
`rill/icon.svg` · favicon  
`rill/opengraph-image.tsx` · 1200×630 social card  
`docs/image-prompts/rill.md` · user-generated still and clip prompts  
`tests/e2e/rill.spec.ts` · mechanic, form, keyboard, phone and reduced-motion coverage

## Imagery

The prompt sheet is `docs/image-prompts/rill.md`. Raw user-generated files go in `assets/incoming/rill/` and `assets/incoming/rill/clips/`; the processing script creates responsive AVIF/WebP files in `public/templates/rill/`. Until then, every image and clip is a labelled placeholder with the final box size reserved.

