# Poppy Patch — design specification

## Requirements
An isolated, responsive Next.js 16 / React landing page for Poppy Patch at `/poppypatch`. Poppy Patch is an at-home mushroom growing kit brand focused on approachable, tactile kits for curious cooks and families. The primary action is Get Growing / Add to Bag with a fully interactive shopping bag drawer, interactive kit modal, countertop grow condition calculator, journal reader modal, and newsletter signup.

## Concept
Growing mushrooms at home feels like kitchen alchemy, but traditional kits look sterile or clinical. Poppy Patch reimagines mushroom growing through warm, organic clay shapes, tactile postage-stamp badges, paper grain textures, and playful botanical illustrations. Mood: playful, warm, tactile, earthy, inviting.

## Palette
Primary canvas: Warm Vanilla `#F7ECD6`; soft vanilla `#FAF3E3`; card cream `#FBF6EA`.
Accents: Terracotta Coral `#E58267`; deep coral `#D96E52`; coral tint `#F7D4C8`.
Secondary accents: Pistachio Green `#A8B96C`; pistachio tint `#E2EAC7`; Lilac `#E3B6E0`; lilac tint `#F3E2F2`.
Text & ink: Cocoa Ink `#4A2E25`; muted cocoa `#735449`; warm shadow `#C3A58E`.

## Type
Fraunces (serif display with soft organic terminals) for main titles and headlines.
Plus Jakarta Sans for readable, modern body copy and navigation.
Caveat for charming hand-drawn notes, annotations, and callouts.

## Layout
- Sticky header with brand wordmark, mushroom mark, single-line links, cart bag counter trigger, and Get Growing CTA.
- Hero section with headline rise, tactile CTA buttons, kit photography cutout, sprout animations, and trust stamps.
- Purpose strip highlighting 10-day guarantee, organic substrate, and beginner-friendly care.
- Kits catalog with interactive detail modals and instant Add to Bag triggers.
- How It Grows 4-stage countertop guide with interactive room temperature & misting condition estimator.
- Why Different section highlighting organic spore quality, compostable packaging, and beginner support.
- The Journal with searchable recipe/guide filter and article reader modal.
- Community harvest gallery and testimonials.
- FAQ accordion with accessible expandable sections.
- Final CTA with clay button and email newsletter validation.
- Warm footer with story and links.

## Mechanic
1. Interactive Shopping Bag Drawer: Add kits, increment/decrement quantities, compute subtotal and free shipping thresholds ($55), and clear cart.
2. Countertop Grow Estimator: Sliders for ambient temperature (60–80°F) and mist frequency (1–3x daily) calculate harvest speed and personalized tips.
3. Accessible Modals: Kit Detail dialog and Journal Article Reader with Escape key closing, backdrop click-to-dismiss, and body scroll lock.

## Motion
Tactile and bouncy. Entrances rise and settle with organic overshoot curves. Buttons exhibit clay-like depression (`scale(0.985)`, `translateY(3px)`). Hand-drawn underlines draw in via SVG stroke animation. Modals and drawers animate in and out with smooth transitions.

| Element | Enter | Scroll | Hover / focus | Press / state | Handoff |
|---|---|---|---|---|---|
| Navbar | sticky top | persists | link underline reveal | bag drawer trigger | stays anchored |
| Hero | headlines rise & sprout grows | natural flow | clay button lift | button press settle | leads to purpose |
| Kits | cards settle in | observer once | card subtle tilt & lift | Add to Bag updates bag | leads to guide |
| How It Grows | chapters connect via vine | interactive scrubber | tab indicator | active stage shifts | leads to why different |
| Journal | article cards cascade | observer once | card lift | open reader modal | leads to community |
| Bag Drawer | slide-in from right | fixed overlay | button hover | qty increment/decrement | closes on backdrop |

Reduced motion respects `@media (prefers-reduced-motion: reduce)` by neutralizing animation durations and disabling infinite rocking.

## Signature details
Hand-drawn botanical sprigs, dashed postage-stamp borders, tactile clay button bevels, paper grain radial overlays, and hand-sculpted card radii (`28px 34px 26px 32px / 26px 30px 28px 32px`).

## Do / Don't
- Keep all colors warm, earthy, and food-friendly.
- Do not use harsh neon colors or technical clinical grids.
- Ensure all interactive modals and drawers are fully accessible with keyboard navigation (Escape key).

## Files and imagery
`components/` holds the sections, doodles, and overlays. `data/poppyPatchData.ts` holds all kit specs, stages, articles, and reviews. `utils/storeLogic.ts` contains pure functions for cart calculations, filtering, and grow estimates.
Images are stored in `public/templates/poppypatch/`.
