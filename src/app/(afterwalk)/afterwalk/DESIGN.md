# AFTERWALK — a little more outside

## Requirements and concept

AFTERWALK is a fictional neighborhood walking club. A good route is a line between small discoveries, so the page uses route marks and a filterable collection of illustrated walk maps. The local walk card is a preview, not a booking or message. The page uses no 3D.

## Palette and type

Ink `#1E3529`, paper `#F7F5EB`, white `#FBFAF3`, lime `#DAE870`, sage `#ABC6A2`, peach `#E9BA9F`, butter `#F3E7B6`, muted green `#607168`. Fraunces is the editorial display face, DM Sans is the reading face, and IBM Plex Mono is the field-note face. Tints are derived with `color-mix`.

## Layout and interaction

The header leads to a split hero with original editorial photography and an overlapping postcard, followed by a plain green band, a five-photo draggable reel, an open introduction, three photographic route cards with map details, a second photographic story, a local walk-card form, FAQ and a full-size closing invitation. At phone widths, the layout stacks and the navigation becomes a compact menu. Filters switch between all, an hour or less, and evening walks. Selecting a card carries the route to the form; valid input creates a clearly labeled local preview.

## Motion

The identity is unhurried and optimistic: **wander** and **settle**. Motion for React drives a desktop sticky hero that gently recedes while the next sheet passes over it, a page progress line, a continuously looping 2D photo reel with drag momentum and accessible previous/next/pause controls, a subtle scroll-linked photograph and layout-aware filter/receipt transitions. The plain green band retains its role in the hero handoff. Hero text reveals through a mask rather than opacity alone; photo crops settle and route cards lift on interaction. The hero returns to normal flow on phones, short screens and reduced motion. The reel stops offscreen, in hidden tabs, on pointer hover or keyboard focus, or when explicitly paused; reduced motion and no JavaScript get a usable native horizontal strip. All text remains visible without JavaScript or under reduced motion. The existing dashed route marks remain as map details on the photographs.

## Files and assets

`layout.tsx`, `page.tsx`, `afterwalk.css`, `brand/`, `sections/`, `walks/`, `motion/`, `assets.tsx`, `assets.generated.ts`, `icon.svg`, `opengraph-image.tsx`, and `PROMPT.md` are isolated inside the route group. Five original photographs were generated for this template and processed into responsive AVIF/WebP files. The `motion` package is already a repository dependency and must be installed when copying the template elsewhere. No external image is required. Run the repository's check, tests, type check and Playwright spec before delivery.
