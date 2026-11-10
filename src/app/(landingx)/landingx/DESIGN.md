# Landing X — design specification

## Requirements
An isolated Next.js 16 / React / TypeScript landing-page template at `/landingx`, advertising the create-landing-template agent skill under the name Landing X. The six project screenshots use the supplied gallery previews, cropped to 16:9 and processed into route-local assets. The reference at impeccable.style informs visual restraint and motion only; its layout and copy are not replicated.

## Concept
Each landing page starts as a brief and becomes an individual piece of work, so Landing X presents the output as a working index of projects. Visitors can filter that index, follow a project to its actual local template, and copy a starter brief. Mood: editorial, precise, considered, open, kinetic.

## Palette
Chalk `#F1F0E8` is the main canvas, warm white `#FAF9F3` carries the project index, and ink `#222622` anchors typography and the approach section. Vermilion `#B53E2B` signals actions and emphasis; fog `#E4E6DD` and sage `#899385` support project placeholders. Tints derive from these colors.

## Type
Barlow Condensed supplies the tall, light display voice; Manrope supplies readable body text; IBM Plex Mono carries labels, indexes, and the brief. Fonts are isolated through `next/font/google`. Headlines are large but bounded, with intentional line breaks and generous margins.

## Layout
Full-width typographic masthead with a small strip of three project previews, an immediate work index, a two-column gallery of 16:9 project slots, an open explanation of the craft, a three-step brief-to-build sequence, a copyable starter brief, and a compact footer. No side-by-side hero demo or copied reference composition. On phones the preview strip scrolls horizontally and project cards become a single column.

## Mechanic
The project index can filter all six projects by Product, Culture, or Place. A single source of typed project data drives the filter, counts, titles, 16:9 slots, and links to actual routes. The page remains complete without JavaScript: all projects are visible and the copyable brief remains selectable.

## Motion
Personality: composed and precise. Verbs: shift and settle. Tokens: out `cubic-bezier(.22,1,.36,1)`, in/out `cubic-bezier(.65,0,.35,1)`, fast 180ms, base 360ms, slow 800ms, hero 1100ms, stagger 70ms. Signature moment: the project index changes as a measured sheet cascade, with the active category and count updating together.

| Area | Enter | Scroll | Hover/focus | Press/state | Handoff |
|---|---|---|---|---|---|
| Header | logo and actions settle | progress line | link underline | anchor navigation | stays in document flow |
| Masthead | split line rises, label and CTA follow | small decorative X shift | arrow nudges | CTA presses | rule meets work index |
| Project index | rule draws, caption rises | native document flow | filter outline and focus | active category and count change | list reflows into gallery |
| Gallery | image wipes and card cascade | observer reveals each card | card media lifts, arrow moves | real project links | last card leads to craft |
| Craft | heading wipe and rule draw | small field mark shift | text links underline | anchor action | brown returns to paper |
| Steps | staggered rules and figures | native flow | control focus | links to starter | final rule meets brief |
| Starter brief | panel rises | native flow | focus-visible | copy confirmation or selectable fallback | dark band meets footer |
| Footer | content settles | native flow | link underline | anchor navigation | ends with brand mark |

Reduced motion renders all content immediately, removes scroll-linked motion, and disables decorative movement. No JavaScript keeps the full project list and brief visible. All essential actions use links or buttons, and no essential content relies on hover.

## Signature details
The crossed X mark, specimen-style project numbers, 16:9 framed placeholders with crop marks, small mono production notes, and strong horizontal rules.

## Do / Don't
Keep the ink, chalk and vermilion palette consistent, label missing images honestly, and link only to real local examples. Do not copy the reference's layout, words, visual assets, or before/after component. Do not claim the display name is an installed command. Do not generate or source the user's screenshots.

## Files and imagery
`showcase/` contains project data and filter logic, `sections/` contains the page, `motion/` contains the small observer runtime, and `brand/` contains the logo. To replace the supplied 16:9 previews, put images in `assets/incoming/landingx/` using the filenames in `docs/image-prompts/landingx.md`, then run `npm run images -- landingx`.
