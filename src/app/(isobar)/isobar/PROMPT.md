# Prompt: rebuild "ISOBAR" (3D pressure membrane landing page)

Build a landing page in Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS v4 + Three.js for a fictional atmospheric systems studio called **ISOBAR**.

## Concept

Weather is pressure in motion, so the page is one continuous procedural 3D membrane. The user scrolls through four transects of that same field: Surface, Shear, Cross-section, and Calm. A pressure pin reseeds the membrane. The page should feel like a scientific instrument and a living landscape at once.

## Brand

- Paper `#F7F2E9`, ink `#12101A`, coral `#FF5B47`, mint `#2DE2A6`, violet `#8A6CFF`, sun `#FFD447`, plum `#272234`, muted `#A59DB6`.
- Anybody for display, DM Sans for body, IBM Plex Mono for utility.
- Logo: concentric isobar mark with a coral signal point and the word `ISOBAR.`.
- Tone: atmospheric, technical, quiet, tactile. Headings remain roman.

## 3D page mechanic

- Mount a transparent Three.js WebGL2 canvas behind the document.
- Build a shader membrane from a subdivided plane with domain-like wave displacement and a live color interpolation between coral and violet.
- Add 4 TubeGeometry contour ribbons at different depths, plus a sparse mint particle volume. This is a spatial field, not a basic model or GLTF asset.
- Drive camera position, membrane rotation, shader progress and contours from one scroll progress value in a requestAnimationFrame loop.
- Pointer position offsets the camera. A click or drag on the pressure pin changes the seed. Instrument sliders change density, drift and contour uniforms. The visible transect volume is directly draggable: top-to-bottom movement selects Surface → Shear → Cross-section → Calm, horizontal position changes density, and the gesture reseeds the field.
- Start on idle for fine pointers, offer a tap-to-start button on coarse pointers, and never mount the heavy engine under `prefers-reduced-motion`.
- Keep a complete CSS fallback visible when WebGL is not available.

## Sections

1. Hero: “Shape the atmosphere.”, live pressure readout, enter/reseed actions.
2. Reading: gradient as weather system, three observations.
3. Transects: sticky 3D diagram and four active chamber labels.
4. Material studies: five pressure recipes that reseed the same field.
5. Instrument: density, drift, contour controls and draggable pressure pin.
6. Invitation: client-side commission form with loading and success replacement.
7. Statement footer.

## Quality bar

- Use only transform, opacity and clip-path for motion. Vary reveal roles: mask, wipe, scale and rise.
- Include a choreographed hero load, active header state, focus rings, hover lift, pressed states, validation errors, loading state and success state.
- Support no-JS and reduced motion with all content visible.
- Use real buttons, links, labels, and a logical heading hierarchy.
- Keep `html` and `body` at `overflow-x: clip`; verify 320, 375, 414 and 768px widths.
- Do not copy gradients.sh code or assets; it is a visual reference only.
