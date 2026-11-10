# RADIUS — Design specification

## Requirements

Create an isolated, responsive OpenLanding gallery template for an electric urban bicycle. Its primary action is **Build your ride**. The route is `/templates/radius`; all copy must avoid unsupported performance, price, availability or purchase claims. The order-interest interaction is a local demo and says explicitly that nothing is sent or saved.

## Concept

A bike is built for the way its rider moves, so the diagonal street billboard unfolds into a technical build sheet with a consistent side-profile bicycle. The visual system combines industrial product documents with energetic street typography. Mood: kinetic, precise, urban, tactile, optimistic.

## Palette

- Chalk `#F3F0E8`: primary background and light text on dark.
- Gunmetal `#272B32`: text, bicycle labels and dark fields.
- Tangerine `#F26836`: action, frame accents and graphic direction. Pair with gunmetal text.
- Technical blue `#244BA8`: diagonal fields and engineering highlights. Pair with chalk text.
- Ice mint `#B8E9DD`: sparing highlights and control feedback.

## Type

Exo 2 italic 600/800/900 for wide display headlines; Space Grotesk 400–700 for body and UI; IBM Plex Mono 400/500/600 for technical labels. The user approved these calls in the board. Use distinct `next/font/google` CSS variables.

## Layout

1. Diagonal bike billboard with edge coordinates, fragmented display typography and wheel-height component selector.
2. Side-profile model breakdown in technical strips.
3. Build Your Ride: finish, tires, rack, basket, lights, reset and text summary.
4. Street-plan terrain simulation with an accessible slider.
5. Rider story photography and frame detail.
6. Fit and service guidance, without invented guarantees.
7. Illustrated order-interest panel with a local-only form.
8. Spare-part outline footer.

At phone widths, show the entire bicycle with controls below, retain the diagonal language without horizontal overflow and replace pointer-only interactions with touch and keyboard controls.

## Mechanic

The three supplied side renders share a canvas and bicycle geometry. Finish changes preserve the viewpoint. Tire and accessory choices update a spatially aligned SVG layer system over the same bike; the supplied rack and light images are standalone objects rather than fitted layers, so they cannot be placed at native scale. Describe selections in text and provide reset. No numeric price, range or weight is invented.

## Motion

Personality: precise and kinetic, expressive. Verbs: **wipe** and **lock**. Signature moment: the diagonal billboard opens into the flat model sheet as the rider scrolls. Default easing is `cubic-bezier(.16,1,.3,1)`; state swaps use `cubic-bezier(.77,0,.175,1)`; presses settle with a short spring. Duration scale: 90 ms press, 180 ms hover, 420 ms state, 800 ms reveal, 1200 ms hero; stagger 70 ms.

| Element | Enter | Scroll | Hover / focus | Press / state | Exit / handoff |
| --- | --- | --- | --- | --- | --- |
| Navigation | Mark and links lock in | Header reacts; progress rail updates | Notch and underline move | Menu opens accessibly | Compresses into next chapter |
| Hero | Diagonal wipe, masked type, bike settles | Billboard flattens into model strip | Selector and CTA shift | CTA moves to builder | Diagonal edge meets breakdown |
| Model breakdown | Lines draw, labels slide | Profile eases into view | Hotspot / link highlights | Builder link navigates | Rule extends into builder |
| Builder | Controls stagger and image wipes | Brief parallax limited to stage | Swatch ring and controls lift | Finish floods; accessories snap; summary updates | Blue field meets street plan |
| Terrain | Street lines draw | Road pattern changes with slider | Thumb and labels gain contrast | Native range input updates route | Road exits into photography |
| Story | Photo clip wipes, copy rises | Modest image shift | Image and link respond | Story anchor navigates | Image edge hands to fit |
| Fit / service | Rules draw, text rises | Section labels progress | Accordion focus and indicator | Accordion expands / closes | Rule draws toward form |
| Interest form | Illustration stamps in | Quiet heading shift | Inputs and button show focus | Validation and honest local success | Confirmation replaces form |
| Footer | Parts outline draws | None needed | Links underline | Links navigate | Final dark field |

All content remains visible with JavaScript disabled and in reduced motion. Motion is transform / opacity / clip-path based; no continuous wheel rotation. Essential controls are native and keyboard operable.

## Signature details

Diagonal cuts; a wheel-height circular selector; engineering stamps; a mechanical navigation notch; thin outlined component diagrams.

## Do / Don't

Do preserve the approved five-colour system, product geometry, legible type and honest demo states. Do use the supplied photographs. Don't infer range, speed, weight, price, service commitments, availability, or real transaction behavior. Don't create a 360° or globe experience.

## Files

`layout.tsx`, `radius-styles.css`, `page.tsx`, `brand/`, `motion/`, `configurator/`, `sections/`, `experience/`, `assets.tsx`, generated `assets.generated.ts`, favicon and OG image are isolated within the route group. The copyable `PROMPT.md` is written after the build. Registration, processed media and browser tests live in their repository-standard locations.

## Imagery

The ten images are supplied by the user. Product photography is used as photography; labels and controls stay in real UI. Preserve source dimensions, transparency and geometry; process 800/1600 WebP and AVIF variants through the repository pipeline. Source provenance is user supplied; licensing is not stated.
