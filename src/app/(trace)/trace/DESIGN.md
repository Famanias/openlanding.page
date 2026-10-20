# TRACE — spatial intelligence

## Concept

TRACE is a dark observatory for teams shaping cities. The page treats a spatial model as a living field: scroll changes the lens, type moves at different depths, and a procedural Three.js orb keeps the signal visible behind the story.

## Palette and type

- Ink `#081115`: background and primary text on the paper panel
- Paper `#E7ECE7`: the Shape chapter and high-contrast type
- Acid signal `#C9F458`: the only accent, used for signal, active rules and calls to action
- Muted steel `#849694`: coordinates, quiet metadata and secondary text
- Space Grotesk: display and body
- DM Mono: coordinates, chapter markers, readouts and the footer

## Motion

- The Three.js scene is persistent and fixed behind the page. Its orb, rings, satellites and point field respond to eased scroll progress and pointer position.
- Oversized coordinate text and contour labels use different scroll depths, implemented through `--trace-parallax`.
- Copy enters once it crosses an IntersectionObserver threshold. Only opacity and transform are animated.
- `prefers-reduced-motion` keeps the scene legible and removes reveal and scroll easing.

## Sections

1. Hero: “Read what the city is becoming.” with the signal orb, coordinates and an Enter the field CTA.
2. Signal: a 4.8m readout and three field metrics.
3. Shape: three methods, presented as numbered rows on a paper field.
4. System: Observe, Simulate and Align as one living model.
5. Contact: a direct mail CTA and a small fieldwork footer.

## Signature details

- A three-line orbital mark beside the TRACE wordmark.
- A fixed chapter rail that turns from quiet steel to signal green on hover.
- The orb is entirely procedural: no model files, textures or external assets.
- The route is self-contained under `src/app/(trace)/` and can be copied as one template.
