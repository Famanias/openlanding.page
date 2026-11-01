# Avel — design specification

## Requirements
An isolated Next.js 16 / React landing page at `/avel`, with local responsive images, a standalone HTML download, and no WebGL or 3D. The product and all company names are fictional. Install: `npm i next react react-dom`.

## Concept
Avel is a family of AI models for different kinds of thinking. A family of distinct minds works together, so the page lets visitors switch between three model personalities and shows a community moving around a shared center. Mood: calm, warm, clear, thoughtful, capable.

## Palette
Pastel clay `#CDB3A3` is the primary color; ivory `#F8F5EF` is the reading surface; deep pine `#243A32` is the ink and primary action. Supporting white `#FFFFFF`, pale sand `#E8DDD2`, and muted pine `#5A6A60` supply contrast and depth. Derive further tints with color-mix.

## Type
Newsreader is the expressive serif for display, Manrope is the sans-serif for UI and body, and DM Mono provides utility labels. Use distinct Next font variables. Large editorial headings, restrained utility labels, and generous line height keep the page human and readable.

## Layout
Landscape hero with centered headline, CTA, logo belt, and a layered product window; introduction with four benefits; selectable model family; a three-step workflow; counterclockwise company orbit and fictional testimonial; FAQ; signup and footer. Responsive layouts keep content in document flow on narrow screens.

## Mechanic
The model switcher selects a typed allowlisted record and updates its name, prompt and example answer. The company carousel moves continuously counterclockwise around the center, while each logo counter-rotates to remain upright. It pauses offscreen and when motion is reduced; an accessible list preserves the company names.

## Motion
Personality: quiet and assured. Verbs: drift and settle. Tokens: ease-out `cubic-bezier(.22,1,.36,1)`, fast 180ms, base 420ms, slow 850ms, hero 1100ms, stagger 70ms. Signature moment: company marks orbit counterclockwise around the Avel mark.

| Area | Enter | Scroll | Hover / focus | Press / state | Handoff |
|---|---|---|---|---|---|
| Header | settle with hero | progress line | link underline | CTA compresses | stays in hero |
| Hero | image settles, copy rises, interface follows | small image parallax | CTA arrow shifts | CTA anchors to signup | window overlaps landscape |
| Proof belt | short rise | normal flow | labels remain legible | static text | joins introduction |
| Benefits | title mask, staggered cards | observer once | cards lift | no hidden content | rule leads to models |
| Models | label and cards cascade | observer once | model controls lift | selected model changes example | response panel settles |
| Workflow | line draw and steps rise | normal flow | CTA arrow moves | anchor navigation | warm panel gives way to proof |
| Company orbit | orbit settles in | pauses offscreen | pause on hover | decorative motion only | circular motif repeats |
| FAQ | rows rise | normal flow | focus border | native details open | closing invitation |
| Signup | headline and form rise | normal flow | focus outline | local validation and success | footer inherits pine |

Reduced motion shows all content immediately, stops the orbit and belt, and removes parallax. Without JavaScript, content and model examples remain visible; no form data is sent. Touch users do not depend on hover.

## Signature details
Four-petal Avel mark, tiny numbered chapter labels, rounded product windows, and orbiting company marks.

## Do / Don't
Use the specified landscape image and truthful demo labels. Use fictional names rather than real customer endorsements. Keep essential content readable without animation. Do not add 3D, fabricated certifications, or external form requests.

## Files and imagery
`sections/` composes the page, `models/` owns selectable model data, `motion/` owns observer and scroll behavior, `forms/` owns the local demo, and `brand/` owns the logo. The closing and footer share a second coastal photograph, with translucent light and dark treatments to keep the signup and navigation readable. Image prompts and generation details are in `docs/image-prompts/avel.md`; sources live in `assets/incoming/avel/` and processed assets in `public/templates/avel/`.
