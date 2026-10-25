# SEREIN Bureau: design system

SEREIN Bureau publishes small, precise weather reports for ordinary places. The route is a continuous editorial landing page: outlook, bureau note, instruments, forecast windows, field notes, dispatches, signup and footer.

## Requirements

- Next.js 16 App Router, React 19, TypeScript and Tailwind CSS v4.
- Route isolation in `src/app/(serein)/`; no shared imports and no external media.
- One accessible `h1`, semantic headings, visible focus rings and no horizontal overflow at 390px.
- The subscribe form is a local demo. It validates in the browser and never sends a request.
- The page remains a standard header-to-footer document at every viewport and motion preference.

## Concept

SEREIN Bureau turns weather into close observation. **The page is a field report laid out from header to footer, so one pressure line connects the hero, the instruments, the field notes and the dispatch signup.** The copy treats weather as a daily ritual rather than a forecast product.

## Palette

| Token | Hex | Role |
| --- | --- | --- |
| ink | `#24343A` | text, rules, dark panels, marks |
| paper | `#F6F0E5` | page ground and paper panels |
| seafoam | `#A8D6CC` | primary signal and pressure trace |
| lavender | `#C7BCE6` | secondary signal, cloud glyphs, data highlights |

Tints come from `color-mix()` of these tokens. Small text stays ink on paper or paper on ink for AA contrast.

## Type

- **Display:** Lora 400/500 for the title, section headings and pull quotes.
- **Body:** Public Sans 400/600 for notes, labels and form copy.
- **Mono:** IBM Plex Mono 400/600 for station codes, readings and navigation.

## Layout

The header is a 76px sticky paper strip with the mark, section links and a dispatch CTA. The hero is a split stage: the report sits beside a coded pressure instrument reading 1016 hPa. Below it, each section takes a different editorial shape: a ruled bureau spread, open instrument plates, a working forecast strip, field-note cards, an issue index and a dark dispatch close.

Sections use real `id` anchors so the page works with JavaScript disabled. At 899px and below the same sections stack into one column, with touch-sized controls and no horizontal overflow.

Scroll behavior stays document-native: anchor links use smooth scrolling, a throttled progress line tracks the page in the header, and the nav marks the panel currently in view. IntersectionObserver reveals use a short rise, scale or mask; with JavaScript off or reduced motion, every section remains at its final state.

## Mechanic: forecast windows

The forecast section contains three windows: first light, high front and last light. Tabs swap the copy, readings and SVG trace in place. The trace maps the day's rise from 1008 to 1024 hPa. The interaction is local to that section; it never replaces the page scroll. Reduced motion makes the tab swap instant and leaves every section visible.

## Motion

**Identity:** organic/analog. The verbs are **settle** for the hero and **unfurl** for section arrivals. Scroll state is restrained to the header progress line and active panel link; it never turns the page into a deck.

Tokens: `--ease-out`, `--ease-in-out`, `--dur-micro`, `--dur-short` and `--dur-long`.

| Element | Enter | Scroll-linked | Hover / focus | Press / state | Exit / handoff |
| --- | --- | --- | --- | --- | --- |
| Header | Settles as the document loads | None | Link rule draws from the left | CTA drops 1px | Remains available through the page |
| Hero | Copy and pressure instrument settle once | None | Button colour and link rule change | Button drops 1px | Hero hands off through a paper rule |
| Bureau note | Masked/rise reveal in view | Header progress and active link | None | Anchor press responds | Text hands into instruments |
| Instruments | Staggered scale reveal in view | Header progress and active link | None | Link press responds | Plates hand into forecast |
| Forecast windows | Header and trace unfurl in view | Header progress and active link | Selected tab gains a field and rule | Tab switch slides and redraws the trace | Section hands into field notes |
| Field notes | Staggered rise reveal in view | Header progress and active link | None | Link press responds | Notes hand into dispatch |
| Dispatch | Rows remain readable; active link tracks | Header progress and active link | Row field and arrow move | Row press opens signup | Index hands into dark CTA |
| Subscribe | Header and form unfurl in view | Header progress and active link | Fields gain a focus ring | Loading spinner and success reveal | Success closes the story |
| Footer | Visible at rest | None | Links draw underlines | CTA press responds | Paper texture continues to the page edge |

Reduced motion removes parallax and ambient loops. Content remains visible and the page stays a complete vertical landing page.

## Signature details

1. The `SR-07` station mark: a half-disc sun crossing a thin isobar line.
2. The hero pressure instrument keeps `1016 hPa / SW 12 kt` in view.
3. Forecast windows move from `1008` to `1024 hPa` across the page.
4. Folios and weather codes keep the editorial desk language consistent.
5. Form success is a stamped `Dispatched / SR-07` seal.

## Do / Don't

- Do keep the page paper-like, spacious and diagram-led.
- Do keep the full landing page readable when motion is reduced or JavaScript is unavailable.
- Do use one pressure line as the visual through-line.
- Don't use stock photography, glossy gradients, glass panels, pill navigation or extra accent colours.
- Don't turn the page into a slide deck or hide content behind an entrance animation.
- Don't animate width, height, top/left or box-shadow; use transform and opacity for the single hero settle.

## Files

```
src/app/(serein)/
  layout.tsx
  serein/
    page.tsx
    serein.css
    tokens.css
    base.css
    DESIGN.md
    PROMPT.md
    icon.svg
    opengraph-image.tsx
    assets.tsx
    assets.generated.ts
    brand/Logo.tsx
    sections/Panels.tsx + LandingSections.tsx + ForecastStrip.tsx
    accordion/accordion.ts + tests
    forms/validate-subscribe.ts + test + Subscribe.tsx
    motion/math.ts + test + useInView.ts + Reveal.tsx
```

## Imagery

There are no raster images or generated clips. All visual media is original inline SVG and CSS: isobar lines, pressure charts, cloud glyphs, wind roses, registration dots and paper texture.
