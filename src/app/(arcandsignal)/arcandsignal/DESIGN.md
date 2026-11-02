# Arc & Signal — design specification

## Requirements
An isolated, responsive Next.js 16 / React landing page for a fictional marketing studio at `/arcandsignal`. The primary action is Contact Us. All companies, quotations, results and projects are illustrative. No WebGL or Three.js. Install with `npm i next react react-dom`.

## Concept
Arc & Signal brings brand thinking and performance together. Campaigns gain momentum as their ideas travel, so the page uses a recurring signal arc and a counterclockwise orbit of client marks. Mood: luminous, assured, editorial, connected, ambitious. The gallery gains a dark, neon-lit marketing agency with a generated signal horizon and serif/sans typography.

## Palette
Midnight ink `#0B0A20`; dark violet `#181339`; luminous violet `#A887FF`; lilac `#D9C8FF`; electric blue `#8DCBFF`; warm white `#F8F6FF`; muted lavender `#B9B2D0`. Use transparent derivatives of these colours for lines and glass.

## Type
DM Serif Display for expressive headlines, DM Sans for reading and navigation, DM Mono for small technical labels. Use self-hosted `next/font` variables and balanced headings.

## Layout
Centered hero with a generated light horizon, layered signal panel and direct CTA; a slim fictional client strip; a statement and four capabilities; two editorial case studies; a three-step process; a counterclockwise company orbit with a fictional testimonial; and a closing contact invitation. Narrow screens stack in reading order.

## Mechanic
Six fictional company marks occupy equal angles on a circle. The orbit rotates counterclockwise while the marks counter-rotate so their names remain upright. A pause button, offscreen pausing, reduced-motion styles and an accessible text list make the motion optional. The angle calculation is a small tested pure function.

## Motion
Personality: cinematic and assured. Verbs: trace and settle. The signature moment is the counterclockwise client constellation. Tokens use a 180ms fast transition, 420ms base, 800ms reveal, 1200ms hero, 70ms stagger, and a strong ease-out. Motion uses transforms and opacity, avoids layout animation, and is optional.

| Element | Enter | Scroll | Hover / focus | Press / state | Handoff |
|---|---|---|---|---|---|
| Header | settles in | remains in hero | link underline | CTA compresses | joins hero |
| Hero | masked headline and panel rise | light field drifts subtly | button arrow moves | CTA anchors to contact | image blends into proof |
| Client strip | short rise | normal flow | text remains legible | static | rule leads to statement |
| Services | title rise and cards cascade | observer once | cards lift | static cards | line leads to work |
| Work | images wipe and labels rise | observer once | arrow and image move | case links anchor to contact | dark background continues |
| Process | staggered steps | observer once | text remains legible | static | line traces toward proof |
| Orbit | scale settle | loop pauses offscreen | pauses on hover; focus ring stays visible | pause / resume button | glow leads to contact |
| Contact / footer | headline rises | normal flow | links underline and button lifts | contact link opens email client | closes the story |

Reduced motion presents content immediately and stops all loops. Without JavaScript all content remains visible and the orbit remains readable. Touch users never depend on hover.

## Signature details
The split arc mark, tiny signal labels, thin connecting rules, translucent indigo panels, and light-trail horizon recur throughout.

## Do / Don't
Keep the agency and proof fictional. Keep real text in HTML. Use the generated artwork as an image rather than a canvas. Do not introduce WebGL, Three.js, third-party tracking, or a live form.

## Files and imagery
`sections/` composes the page, `orbit/` contains the company carousel, `motion/` handles visibility, and `brand/` owns the logo. The original image is in `assets/incoming/arcandsignal/`; processed image variants are in `public/templates/arcandsignal/`. See `docs/image-prompts/arcandsignal.md`.
