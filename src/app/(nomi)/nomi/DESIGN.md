# NOMI design

## Requirements
A conversion landing page for independent tutoring studios. The primary action is requesting a private product walkthrough.

## Concept
A calm app reveals one capability at a time, so the page is a scroll-driven phone launch that unlocks Inbox, Schedule, Progress and Payments.

## Palette
Graphite navy `#0B1020`, midnight blue `#121A31`, ink `#F4F7FF`, muted slate `#AAB5CF`, line `#2A3758`, electric periwinkle `#6F8CFF`, signal cyan `#8FE3FF`.

## Type
DM Serif Display for editorial display; Geist for body; Geist Mono for system labels.

## Layout
Full-bleed layered glass environment, sticky pill navigation, oversized hero type, centered phone stage, rounded glass cards and a dark conversion form.

## Mechanic
`launch/LaunchPhone.tsx` tracks scroll progress through the launch section and exposes tabs for the four app capabilities. The phone surface changes state without external media.

## Motion
Technical/cinematic: focus-pull and unlock. The phone tilts into place, app cards bloom, the rail fills, controls press and glass surfaces lift. Reduced motion disables all loops and transforms.

## Signature details
- Frosted pill header and translucent cards.
- Phone status bar and home indicator.
- `01 / NOMI WORKSPACE` system labels.
- Cyan unlock accent and soft radial light fields.

## Do / Don't
Do use layered translucency, depth, soft borders and high contrast. Don't copy Apple logos, product names, screenshots or trade dress.

## Files
The route is isolated in `src/app/(nomi)/`. The form is local-only and the phone is CSS/DOM.

## Imagery
No external media. The phone and glass environment are CSS/SVG.
