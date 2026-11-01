# Rebuild Assemblage

Build the Assemblage landing page in Next.js 16 App Router, React 19 and TypeScript. It is a mixed media material study for independent brands. The primary action is **Request a material study**.

Use Manrope with Geist Mono for utility labels. Preserve the palette: paper `#F6F0E8`, ink `#1E1D1B`, sand `#E2D8C9`, vermilion `#D95F3F`, teal `#1D6C63`, ochre `#E7C65A`, plum `#8F4E70`. Use flat backgrounds, tactile print artwork, registration marks and no stock imagery.

Sections are a floating header, interactive carousel hero, four benefits, word-by-word tagline, three-step method, material workshop, proof cards, native FAQ, local validated request form and footer. Keep all imports inside `src/app/(assemblage)/`.

The signature is a looping Three.js paper carousel: a larger centered sheet and smaller, separated previews beside it. Preserve curled geometry, print textures, light, shadows and translucent acetate. Support direct horizontal dragging, bounded fling momentum, spring snapping, clickable side previews and Left/Right/Home/End keyboard navigation. Remove the bottom toolbar, visible material label, arrows, swatches and drag instruction. Announce the current material and its position through a visually hidden live status. Rotate continuously clockwise on a circular path in depth. Keep a nonzero drift during manual interaction at about one-fifth cruising speed, retain that slower pace for five seconds, then smoothly recover. Even a stationary held pointer must not stop the drift. Synchronize automatic material changes without feeding them back as new snap targets.

Reuse the carousel in the workshop, synchronized with its material tabs, with spacing and lighting sliders. On tall desktops retain the sticky hero departure and the method's three reversible assembly chapters. Preserve native vertical scrolling on touch. Reduced motion disables autonomous drift and uses immediate manual material changes. With JavaScript or WebGL unavailable, show all four authored HTML sheets in a native horizontal scroll-snap carousel.

Render on a viewport-wide transparent canvas with vertical overscan and camera view offsets. Keep sheets full bleed without rectangular clipping or an enclosing background slab. Leave neighboring sheets separated during transitions. Empty canvas space must pass clicks through. Pause rendering only offscreen, in hidden tabs or for reduced motion. Cap render resolution and clean up all resources on unmount. The dependency is `three`.
