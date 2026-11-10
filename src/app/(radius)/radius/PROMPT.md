# RADIUS — Every street is yours

Build an isolated Next.js 16 / React 19 / TypeScript landing-page template for RADIUS, an electric urban bicycle. The public gallery path is `/templates/radius`; keep template code within `src/app/(radius)/`, use relative imports, and prefix CSS classes `rd-`. The primary action is **Build your ride**. This is a product concept: do not invent range, speed, weight, price, stock, availability, service guarantees, or a real transaction.

## Central idea

A bike is built for the way its rider moves, so a diagonal urban billboard unfolds into a technical build sheet with a consistent bicycle side profile. Industrial product-document details meet street typography. Mood: kinetic, precise, urban, tactile, optimistic.

## Visual system

- Chalk `#F3F0E8`: main paper and light text.
- Gunmetal `#272B32`: text, hairlines, dark fields.
- Tangerine `#F26836`: primary action and directional accents, with gunmetal text.
- Technical blue `#244BA8`: billboard, blueprint field and route study, with chalk text.
- Ice mint `#B8E9DD`: occasional contrast, route pin and feedback.
- Exo 2 italic 600/800/900 for large display type, Space Grotesk for body and interface, IBM Plex Mono for engineering labels. Load through `next/font/google` with distinct variables.
- Draw the original mark as an outlined wheel with one diagonal radius. Use sharp edges, clipped diagonal planes, technical rule lines and restrained graphic overlays.

## Sections

1. Sticky header with a wordmark, in-page navigation, build CTA, accessible mobile menu and scroll progress rail.
2. A full-height diagonal billboard: “Every street is yours.”, the complete bicycle, oversized fragmented background type, a circular wheel-height selector, and links to the builder and model breakdown. On mobile, keep the whole bike visible.
3. Model breakdown: technical profile on a blueprint grid, compact detail strips and the supplied angled product photograph.
4. Build Your Ride: a matched-angle transparent bicycle in graphite, tangerine or cream; city or gravel tires; independent rear rack, basket and lights; reset and live text summary. Represent tires and accessories with aligned SVG overlays. The supplied accessory images are standalone objects and are not pre-aligned. Maintain the same canvas and mounting geometry for every finish. Keep the previous finish visible beneath an interruptible incoming wipe.
5. A street-plan surface study with a native keyboard-operable range slider, city/mixed/rough presets, an illustrated route and tire diagram. Clearly label it as illustrative rather than a performance test.
6. Rider photograph and close details of the frame and tire.
7. Fit and care guidance in accessible native accordions, with general suggestions only.
8. Illustrated interest form with name/email validation and a clearly labeled local preview. On success state explicitly that nothing was sent or saved; do not perform network requests or save personal data.
9. A parts-outline footer with navigation and back-to-top link.

## Motion and accessibility

Motion is precise and kinetic; the verbs are **wipe** and **lock**. The signature moment is the diagonal hero field flattening into the model sheet as the visitor scrolls. Use an interruptible CSS entrance, individual headline masks, image wipes, drawn rules and modest rises. State and hover feedback should be quick and deliberate; avoid perpetual wheel rotation. Use a single passive, requestAnimationFrame-throttled scroll scheduler; update only the affected elements and stop changing the hero once its scroll progress is complete.

The form may remount after the success state, so newly inserted reveal elements must also be observed. Under reduced motion, show all content immediately and remove positional movement. Without JavaScript, show the finished page and static bicycle/route, disable controls that require a script, and explain why. Use real semantic buttons, radios, checkboxes, slider, labels and focus indicators. All controls work by keyboard and touch; prevent horizontal overflow at 320px.

## Assets and verification

Use the ten supplied source images documented in `docs/image-prompts/radius.md`. Process them via `npm run images -- radius` to responsive local WebP/AVIF variants, preserving alpha and product geometry. User-supplied provenance and unspecified licensing must remain documented. Render the side finishes at their shared 3:2 aspect ratio. Do not imply the illustrative SVG accessory layers are photographs.

Register the route, palette, media, copy bundle, gallery item, expected gallery tests and shared e2e path. Capture the actual hero for the gallery preview. Unit-test configurator state, terrain mapping, form validation and scroll math; browser-test the builder, form retry, keyboard slider, mobile menu, overflow, scroll handoff, reduced motion and no-JavaScript states. Run the repository's isolation, palette and media checks, tests, TypeScript and Playwright.
