# LUCENTRA — material calibration studio

## Requirements

LUCENTRA is a fictional real-time material studio for product designers and frontend teams. The route must be complete with JavaScript disabled, reduced motion, touch input, or no WebGL. The primary action is a local brief form; it never submits over the network.

## Concept

Light is a material's proof, so the page is a calibration bench that moves one prism specimen through clear, tuned, spectral and ready states. The hero is adapted from the supplied Facet glass scene, while the long-form page gives the specimen a readable narrative and a measurable handoff.

## Palette

| Token | Hex | Role |
|---|---|---|
| `--color-lc-ink` | `#10141C` | graphite type, dark sections and outlines |
| `--color-lc-paper` | `#F5F7FB` | paper field and light controls |
| `--color-lc-accent` | `#2E63FF` | cobalt signal, active state, focus and CTA |
| `--color-lc-spectral` | `#C5D4FF` | large glass state and spectral tint |

Tints use `color-mix()` from these palette colors. The palette checker covers the route; SVG specimen bands are content colors and stay within the same four colors.

## Type

Sora 500/600/700 is display (`--font-lc-sora`), Plus Jakarta Sans 400/500/600/700 is body (`--font-lc-jakarta`), and Space Mono 400/700 is utility (`--font-lc-space`). Display type is fluid with `clamp()`; utility values are uppercase with measured tracking.

## Layout

The fixed calibration rail sits inside the page gutter and compresses after the first scroll. The hero is a two-column field with a procedural specimen. The principles are a four-up grid. The bench is a 280vh sticky stage on desktop and a readable flow with a native range input below 580px or under reduced motion. Access and notes use dark slabs for contrast. The page gutter is `clamp(18px, 5vw, 76px)` and the maximum content width is 1320px.

## The mechanic

`bench/state.ts` owns `BENCH_STOPS`, `PRESETS`, `sampleAt`, `benchSnapshot`, `benchReducer`, and `clamp01`. Progress is clamped to 0–1, interpolates the four optical values between the named stops, and applies a small preset bias. `CalibrationBench` writes scroll progress from one rAF loop, while the server-rendered flow includes the same copy and specimen fallback.

## Motion

Identity: technical/cinematic. Verbs: **scan** and **focus-pull**. Signature moment: the pinned specimen gains spectral bands at the third stop and locks into a ready readout at the fourth.

Tokens: ease-out `cubic-bezier(.23,1,.32,1)`, expo `cubic-bezier(.16,1,.3,1)`, in-out `cubic-bezier(.77,0,.175,1)`, spring `linear(0,.35 8%,.82 20%,1.06 30%,1.02 42%,.99 58%,1)`; durations 90/180/420/800/1200ms; reveal shift 28px; stagger 70ms.

| Section/component | Enter | Scroll-linked | Hover/focus | Press/state change | Exit/handoff |
|---|---|---|---|---|---|
| Header | mark and links arrive in the hero sequence | sticky rail gains a denser field after 36px | link rule draws from left | menu label toggles | hero hands to tagline |
| Hero | field settles, copy staggers, specimen breathes | tiny specimen drift only | CTA fill wipe and focus ring | button scales .97 | specimen becomes the bench sample |
| Tagline | word-by-word activation | words activate at a trigger line | none; words remain readable | instant under reduced motion | final word resolves into principles |
| Principles | cards rise and scale | none | lift and spectral tint | focus ring and press scale | grid hands cobalt signal to bench |
| Calibration bench | panel clip and specimen settle | sticky progress moves specimen and active step | range focus and preset lift | values and label update | spectral stage becomes ready readout |
| Workflow | three cards cascade | none | card lift and label nudge | press scale | last card hands to access |
| Brief form | fields rise in order | none | focus ring and label shift | invalid message, loading label, success stamp | success panel replaces form |
| Field notes/footer | rules draw and terms rise | none | summary marker rotates, links draw | native details and back-to-top | final rule settles |

Reduced motion removes the sticky engine, ambient specimen loop, smooth scroll and hidden reveal states. Phones use the range control and stacked layout. No-JS sees all content because reveal hiding only applies under `prefers-reduced-motion: no-preference` after hydration.

## Signature details

The bench index (`01 / SAMPLE` through `04 / READ`), live IOR/roughness/dispersion readout, cobalt calibration ticks, the spectral band stamp, and the closing `MAKE LIGHT LEGIBLE` line recur across the page.

## Do / Don't

Do keep the page measured, keep the specimen as the narrative spine, and show the numbers beside the visual result. Do use original SVG geometry and explicit states. Do not copy Facet's name or mark, claim a real integration, hide values behind hover, or add generic testimonials.

## Files

`layout.tsx`, `lucentra.css`, `brand/Logo.tsx`, `icon.svg`, `opengraph-image.tsx`, `assets.tsx`, `motion/`, `bench/`, `forms/`, and `sections/` form the copy unit. Unit tests sit beside the pure bench and validation modules; the browser test is `tests/e2e/lucentra.spec.ts`.

## Imagery

No photos or video are required. The page uses original SVG prism geometry and CSS surfaces. Replacement art prompts are documented in `docs/image-prompts/lucentra.md`; any future raw assets belong in `assets/incoming/lucentra/` and should use the repo image pipeline.
