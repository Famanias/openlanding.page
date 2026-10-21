# SUNDIAL Coffee Roasters — design spec

A landing page for a fictional specialty coffee roastery. **The label prints every roast curve on the bag, so the page is a roast curve you scrub.** Scroll (or drag the pill slider, or use arrow keys) and one 12 kg batch climbs from charge at 205 °C to the drop at 208 °C — the curve draws itself, the bean darkens from green to espresso, and the development % counts up. Mood: sunny, bold, modern, friendly, appetizing. Everything is heavily rounded.

## Requirements

- **Next.js ≥ 16.4** (App Router, a route group with its own root layout, `next/font/google`, `next/og`), React 19, TypeScript, Tailwind CSS v4. No other runtime dependencies — the mechanic is `useSyncExternalStore` + rAF scroll, no animation library.
- Mobile Lighthouse: performance ≥ 90, accessibility ≥ 95, best practices 100.
- The template imports only npm packages and files inside `src/app/(sundial)/`.

## Concept

- **The idea → the mechanic:** a roast is a curve of time and heat, so the page is that curve. The Roast chapter pins on desktop and scroll progress becomes elapsed roast time; the same clock is drivable with a real `<input type="range">`, so it works with mouse, touch and keyboard. Every section speaks the brand's language: products are *lots*, brewing is the *bench*, pricing is *subscriptions*, B2B is *wholesale*.

## Palette

Six colours, registered in `scripts/templates.config.ts`; `npm run check` enforces them.

| Token | Hex | Role |
|---|---|---|
| espresso | `#241611` | ink: text, dark slabs (Roast stage, Wholesale) |
| crema | `#F7F1E6` | paper: page ground |
| tangerine | `#FF6B1A` | the single accent: pills, live curve, readout digits, traveling dot |
| roast green | `#0F5C3F` | rare secondary: first-crack marker, errors, Brew bench ground, perk bullets |
| oat | `#EADBC4` | tint: cards, panels, chart grid |
| husk | `#6F6152` | muted text, captions, eyebrows |

- **Tangerine is a fill, never small text on paper** (2.5:1). On tangerine, espresso text (6.1:1), never crema.
- The bean-colour ramp (green `#8FA07A` → hay → brown → espresso) is **content colour**, exempted for `roast/roast.ts` in the palette config.
- All tints are `color-mix()` of the six; no other hex appears anywhere.

## Type

- **Display: Archivo 800** (`--font-archivo`) — retail signage weight; hero at `clamp(46px, 9vw, 124px)`.
- **Body: Figtree 400–600** (`--font-figtree`) — friendly, modern, high x-height; 17px / 1.6.
- **Utility: Space Mono 400/700** (`--font-space-mono`, `preload: false`) — 0.1em tracking, uppercase: eyebrows, readouts, chips, stamps, buttons, ticks.
- Fonts load in the route group's `layout.tsx` with distinct variable names. Fluid sizes via `clamp()`.

## Layout

- Gutter `clamp(18px, 4.5vw, 72px)`, wrap max 1240px.
- **Geometry: heavy rounding everywhere.** Cards 24–32px radius, buttons/chips/tabs/inputs 9999px pills, stage panels 28px. No sharp corners anywhere on the page.
- Sections: floating pill top bar → hero (sunburst) → The Roast (dark, pinned) → Lots (chart grid) → Brew bench (green) → Subscribe (chart grid) → Wholesale (dark) → footer (crema).
- Custom graphic grounds are CSS only: `repeating-conic-gradient` sunburst under a radial fade, tiled `radial-gradient` bean macro, `repeating-linear-gradient` chart grid.

## The mechanic (mechanic/ folder)

Pure logic in `roast.ts`, tested in `roast.test.ts`:

- `TOTAL_SECONDS = 690` (11:30), `CRACK_AT = 522` (8:42), charge 205 °C, drop 208 °C.
- `beanTempAt(t)`: piecewise-linear through control points `[0,205] [80,92] [180,146] [300,166] [420,184] [522,196] [600,203] [690,208]` — a real logged shape: plunge to the turning point, then a flattening climb.
- `developmentPct(t) = (t − 522) / 690 × 100`, zero at or before the crack.
- Six stages by elapsed: charge `[0,80)`, drying `[80,240)`, maillard `[240,522)`, firstcrack `[522,600)`, development `[600,690)`, drop `[690]`.
- `beanColorAt(t)`: linear RGB interpolation over content-colour stops (green → hay → brown → espresso).
- `progressToElapsed` / `calculateScrollProgress`: scroll → elapsed, computed from the section's real offsets, clamped both ends.
- State: a tiny external store (`roast-store.ts`) read with `useSyncExternalStore` — the scroll listener, the range input and the keyboard all write the same `elapsed`.
- Rendering: `RoastCurve.tsx` samples the temp function into an SVG path; the drawn portion is `stroke-dashoffset` on `pathLength=100` (transition ≤ 80 ms, so scrubbing feels live but never lags); a roast-green dashed marker fades in at the crack; a tangerine dot rides the curve.
- `RoastSection.tsx` pins via CSS `position: sticky` inside a 380vh outer only when `useStageMode()` says desktop + motion allowed. Otherwise it renders the interactive panel in flow plus a static six-row stage log.
- `aria-live="polite"` announces stage changes only — never frames.

## Motion

- Only `transform`/`opacity` animate for UI (the curve's dashoffset is the single exception and is state-keyed, not fire-and-forget).
- Buttons scale to 0.97 on `:active`; tabs and chips transition colour/border at 150–190 ms with the `--ease-sd-out` token.
- Lot/plan cards reveal with IntersectionObserver (`opacity` + `translateY 18px`, 420 ms), keyed on `data-shown`.
- Under `prefers-reduced-motion`: no pinning, no reveals, no transitions — everything visible and static (proved by the shared reduced-motion e2e checks).

## Signature details

1. **Mono live readout** — bean temp / elapsed / development %, tabular numerals, tangerine digits.
2. **First-crack marker** — roast-green dashed line + label that fades in at 8:42 and never loops.
3. **Bean swatch** — a pill-radius circle with a rotated crease that darkens with the scrub.
4. **Stamped batch code** — dashed, rotated −2°/2°, on the stage and the footer.
5. **Pill everything** — nav, buttons, chips, tabs, inputs, slider thumb.

## Do / Don't

- Do keep every number real and specific: 12 kg, 8:42, 24 %, 87.5, $22, 41 Mill Street.
- Do keep tangerine as a fill; do use roast green sparingly.
- Don't add sharp corners, glassy gradients, purple, or lorem ipsum.
- Don't animate width/height/filter; don't pin on phones or under reduced motion; don't hide content behind animation.
- Don't let the scrubber steal Space/Enter from focused controls — it's a real range input, keys are handled, form buttons unaffected.

## Files

```
src/app/(sundial)/
  layout.tsx                     fonts (Archivo/Figtree/Space Mono), metadata
  sundial/page.tsx               section order
  sundial/sundial.css            @theme tokens + all sd-* classes
  sundial/brand/Logo.tsx         Mark + Lockup (currentColor, inline SVG)
  sundial/icon.svg  opengraph-image.tsx
  sundial/assets.tsx  assets.generated.ts
  sundial/sections/              Header, Hero, Lots, BrewBenchSection, Subscribe, Wholesale, Footer, Eyebrow, useReveal
  sundial/roast/                 roast.ts (+test), roast-store.ts (+test), progress.ts (+test), useStageMode.ts, RoastCurve.tsx, Scrubber.tsx, RoastPanel.tsx, RoastSection.tsx
  sundial/brew/                  brew.ts (+test), BrewBench.tsx
  sundial/forms/                 validate-wholesale.ts (+test), WholesaleForm.tsx
  sundial/content/               lots.ts, plans.ts (+content.test.ts)
tests/e2e/sundial.spec.ts
```

## Imagery

Photo prompts live in `docs/image-prompts/sundial.md` (you generate them; the page uses labelled placeholders until then). Four photo frames are wired: hero (`hero-bag`, 4:3), Lots chapter head (`lot-kraft-bag`, 1:1), Brew bench head (`pour-over`, 3:2), Wholesale (`counter-scene`, 3:2). Each frame is a rounded `figure.sd-photo` with a fixed aspect ratio, so the layout holds its shape before the image arrives. The page itself needs no photos to work: its grounds are custom graphic assets (sunburst, bean macro, chart grid), and the mechanic is SVG. Process with `npm run images -- sundial` once they arrive in `assets/incoming/sundial/`.
