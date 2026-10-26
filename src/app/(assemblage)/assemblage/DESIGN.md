# ASSEMBLAGE

## Requirements

Assemblage is a single action conversion page for independent brands. The action is requesting a two week material study. It is designed for an early stage creative lead or founder who has a strong instinct but needs a direction the whole team can see and use.

## Concept

An idea becomes useful when it has a surface, so the page assembles paper, acetate, ink and found marks into one working collage. The material index is the signature interaction: selecting a layer raises it in the stack and names the job it does.

## Palette and type

Paper `#F6F0E8` is the ground, ink `#1E1D1B` carries type and dark slabs, sand `#E2D8C9` is stock, vermilion `#D95F3F` is the action colour, teal `#1D6C63` is the image field, ochre `#E7C65A` is the signal, and plum `#8F4E70` is reserved for future editorial notes. Manrope is the sole primary typeface. Geist Mono is reserved for utility labels and material indexes.

## Layout

The page uses a floating pill header, a two column collage hero, an offset benefit grid, a full ink tagline reveal, a three step process, an interactive layer index, taped proof cards, a plain question list and a dark local form. The form is repeated only as the final conversion object.

## Motion

The personality is tactile and decisive. Its verbs are **stack** and **settle**. The signature moment is the material index raising one layer while the rest settle underneath it. Reveals use IntersectionObserver and animate opacity, transform and clip path only. The tagline activates word by word. Hover lifts cards and buttons, press scales to 0.98, and reduced motion keeps every layer and message in its finished state.

| Element | Enter | Scroll linked | Hover or focus | Press or state | Handoff |
| --- | --- | --- | --- | --- | --- |
| Header | drops into the paper field | stays fixed | links turn vermilion | button presses inward | hero hands to benefits |
| Hero collage | masked title and staged layers | none | none | CTA presses | collage hands to index |
| Benefits | staggered paper rise | none | none | none | rules continue into tagline |
| Tagline | word activation | each word crosses the trigger | none | none | ink hands back to paper |
| Material index | stack settles | none | active row shifts right | selected layer raises | layer detail changes |
| Proof cards | taped card cascade | none | none | none | cards hand to objections |
| Request form | clip wipe | none | fields tint on focus | success replaces form | footer closes visit |

## Signature details

The recurring details are registration marks, translucent tape strips, small mono material labels and the red stamp dot. The form includes a calm local success state and never sends a request.

## Files

`page.tsx` composes the route. `assemblage.css` contains the isolated palette, layout and motion. `sections/` holds the page argument. `sections/MaterialDeck.tsx` owns the signature interaction. `motion/Reveals.tsx` handles one time IntersectionObserver reveals. `forms/request.ts` is the tested validation module and `forms/RequestForm.tsx` owns the local success state. `brand/Logo.tsx`, `icon.svg` and `opengraph-image.tsx` provide the identity.

## Do and do not

Keep the page flat, tactile and specific. Use real material language and room around the type. Do not add stock photos, background gradients, competing CTAs or a second typeface.
