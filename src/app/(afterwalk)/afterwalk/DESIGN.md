# AFTERWALK — a little more outside

## Requirements and concept

AFTERWALK is a fictional neighborhood walking club. A good route is a line between small discoveries, so the page uses route marks and a filterable collection of illustrated walk maps. The local walk card is a preview, not a booking or message. The page uses no 3D.

## Palette and type

Ink `#1E3529`, paper `#F7F5EB`, white `#FBFAF3`, lime `#DAE870`, sage `#ABC6A2`, peach `#E9BA9F`, butter `#F3E7B6`, muted green `#607168`. Fraunces is the editorial display face, DM Sans is the reading face, and IBM Plex Mono is the field-note face. Tints are derived with `color-mix`.

## Layout and interaction

The header leads to a split hero with original editorial photography, then a dark typographic band, an open introduction, three illustrated route cards, a second photographic story, a local walk-card form, FAQ and a full-size closing invitation. At phone widths, the layout stacks and the navigation becomes a compact menu. Filters switch between all, an hour or less, and evening walks. Selecting a card carries the route to the form; valid input creates a clearly labeled local preview.

## Motion

The identity is unhurried and optimistic: **trace** and **settle**. Hero copy rises as the photograph opens; section copy rises, the second photograph wipes, and route cards lift gently on hover. The signature detail is the dashed route on each map. All content remains visible without JavaScript or under reduced motion. Buttons and links have focus and press states; no information depends on hover.

## Files and assets

`layout.tsx`, `page.tsx`, `afterwalk.css`, `brand/`, `sections/`, `walks/`, `motion/`, `assets.tsx`, `assets.generated.ts`, `icon.svg`, `opengraph-image.tsx`, and `PROMPT.md` are isolated inside the route group. The two original photographs were generated for this template and processed into responsive AVIF/WebP files. No external image or new runtime dependency is required. Run the repository's check, tests, type check and Playwright spec before delivery.
