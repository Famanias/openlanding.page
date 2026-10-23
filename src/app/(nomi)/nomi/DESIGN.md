# NOMI design

## Requirements
A conversion landing page for independent tutoring studios. The one action is requesting a private walkthrough. Light mode only. No external media, no extra dependency beyond Next, React and Tailwind.

## Concept
A studio's week is four small moments, so the page is one pinned phone that unlocks them one at a time: pick a moment and a line draws from it to the phone, whose plastic shell takes that moment's tint.

Built on Hallmark's Dose theme (warm paper, tinted translucent plastic, one green) and shaped as a Map / Diagram: the rail of moments, the drawn connectors and the phone are the map.

## Palette
OKLCH, all declared on `:root` in `tokens.css`. Hex only in `icon.svg` (see `scripts/templates.config.ts`).

| Role | Token | Value |
| --- | --- | --- |
| Paper | `--color-paper` | `oklch(97.6% 0.011 88)` |
| Band paper | `--color-paper-2`, `--color-paper-3` | `oklch(96.5% 0.02 160)`, `oklch(93% 0.036 160)` |
| Ink | `--color-ink`, `--color-ink-2`, `--color-muted` | `oklch(21% 0.025 170)`, `oklch(31% 0.02 170)`, `oklch(49% 0.024 165)` |
| Signal | `--color-accent`, `-deep`, `-soft`, `-ink` | `oklch(50% 0.13 160)`, `oklch(42% 0.11 162)`, `oklch(88% 0.08 160)`, `oklch(99% 0.006 160)` |
| Plastic tints | `--tint-inbox`, `-schedule`, `-progress`, `-payments` | `oklch(87% 0.048 210)`, `oklch(91.5% 0.064 98)`, `oklch(86.5% 0.075 160)`, `oklch(84% 0.048 322)` |
| Glass | `--light`, `--glint` | `oklch(99.4% 0.016 84)`, `oklch(100% 0 0)` |

Posture: committed. The green-tinted paper family carries the surface; the accent stays on controls, focus, the drawn lines, the progress fills and one stamp. A tint is never a signal.

## Type
Schibsted Grotesk 700 for display (tracking -0.03em, line-height about 1.05). Instrument Sans 400 and 500 for text. DM Mono 400 for times and figures only. Sizes come from `tokens.css` (`--text-display` 84px at 1440, `--text-section` 52px, `--text-title`, `--text-lead`). Labels are the body face, sentence case, untracked.

## Layout
One container, 1440px capped, 12 columns, 32px gaps. Hero (Stage): copy on 5 columns, the card stack on 7. Launch: a pinned 100dvh stage, rail on 4 columns, a 96px wire gap, the band on 8. Studios: rows on twelve columns (title 1 to 5, line 6 to 9, sample panel 10 to 12). Plans: copy 6, offer 5. Demo: copy 5, a one-column gutter, tray 6. Footer: a mast.

Section papers alternate (paper, band, paper, band, paper, band) so each seam is a visible hand-off. Under 60rem everything stacks and the stage unpins.

## Mechanic
`launch/LaunchPhone.tsx` is the stage. `launch/progress.ts` holds the pure maths (`stageProgress`, `sceneAt`, `sceneOffset`, tested in `progress.test.ts`): scroll position inside the tall section becomes a progress, progress becomes a scene index. A passive, rAF-throttled scroll listener sets the index only when it changes and writes `--nm-p` on the section. Clicking a rail button sets the scene and scrolls to the middle of its slice; a lock stops the scroll listener fighting the click until it lands. The stage unpins under 60rem and under `prefers-reduced-motion`, where the rail simply switches scenes.

The stage's tint is a registered `@property --nm-t <color>` on `.nm-stage`, so the band, the phone shell, the rail pill and the bottom sheet all fade between moments from one value.

## Motion
**Identity: soft and precise.** Verbs: *settle* and *draw*. Easings and durations are tokens in `tokens.css` (`--ease-out`, `--ease-in-out`, `--dur-micro` 120ms, `--dur-short` 220ms, `--dur-long` 420ms, `--dur-slow` 640ms, `--dur-hero` 900ms, `--stagger` 70ms, `--reveal-shift` 24px). Only `transform`, `opacity`, `clip-path` and SVG stroke offsets move. No loops, no parallax on pointer.

**Signature moment:** choosing a moment: the pill slides, the line draws to the band, the band and shell change tint, the screen swaps with a directional slide and its contents fill (ring, bars).

| Element | Enter | Scroll-linked | Hover / focus | Press / state change | Exit / hand-off |
| --- | --- | --- | --- | --- | --- |
| Header | drops in at load | hides on scroll-down, returns on scroll-up; hairline progress rule (`animation-timeline: scroll()`) | link underline draws; active underline slides between sections | action sinks 3px | slides up out of the way of the pinned stage |
| Hero copy | headline words rise through masks (70ms apart), sentence and actions rise | lifts away and dims as it leaves (`animation-timeline: view()`) | primary: fill wipes in | buttons sink 3px | hands off to the launch band |
| Hero cards | rise into place in turn, ring draws, stamp lands | lift away with the copy | the card lifts 8px (they are links) | focus ring, instant | |
| Launch stage | heading words rise, sentence rises | pinned; progress picks the scene | rail row colour step; focus ring | pill slides, line draws, tint fades, screen swaps, ring and bars fill, bottom sheet rises | unpins after the last scene |
| Rows | rise in a stagger, hairlines draw, sample bar fills | | | | |
| Offer | wipes in from the top, checks draw one by one | | primary: fill wipes in | button sinks | |
| Demo copy | heading words rise, sentence rises, facts stagger | | | | |
| Tray and tag | tray wipes in, tag drops in after it | | input focus ring is an outline | invalid: field shakes, message slides down; success: fields fade, drawn check and heading arrive | |
| Footer | none | | link underline | | |

Reduced motion: everything is visible and in its end state, the stage is unpinned, no animation runs. No script: reveals are never hidden (they hide only under `.js`).

## Signature details
- The slab header with a sliding underline and a hairline progress rule.
- The plastic recipe: pale tint, glint along the top edge, deeper shade at the foot, tinted shadow below.
- The rail's drawn connectors that end in a port dot on the band.
- The tear-off offer: a perforated stub and two notches.
- The tilted paper tag that fills in as the visitor types.
- The giant wordmark mast.

## Do / Don't
Do keep surfaces pale and daylit, one green for every signal, times and figures in mono, three weights only. Don't use dark panels, glass blur, gradient text, tracked small-caps labels, eyebrows, arrows glued to link text, or a second accent. Never red for a problem state beyond the form's one error message.

## Files
Everything is in `src/app/(nomi)/`. `layout.tsx` loads the fonts and adds the `js` class from an inline script. In `nomi/`: `tokens.css` and `base.css` (Hallmark scaffold), `nomi.css` (the page), `page.tsx`, `sections/` (Hero, Studios, Plans, Demo, Footer), `launch/` (`LaunchPhone.tsx`, `scenes.ts`, `progress.ts`, its test), `forms/` (`NomiForm.tsx`, `validate.ts`, its test), `motion/` (`Reveals`, `SiteChrome`, `Words`), `brand/` (`Logo`, `Icons`).

Rebuild: `npm i next react react-dom tailwindcss`.

## Imagery
No external media. The phone, the cards and the panels are DOM. Each is a sample of the product that does not exist yet; replace the hero stack (it sits in a `data-slot`) with a real screenshot when there is one.
