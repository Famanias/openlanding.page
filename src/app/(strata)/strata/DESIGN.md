# STRATA design specification

## Requirements and concept

STRATA is a study of contemporary ceramic vessels, earth, form, and considered living ("Formed by earth"). The page presents an immersive tactile journey through architectural ceramics, clay extraction, wheel craft, interior scale, and material finishes. The gallery route serves the same self-contained document as the HTML download, keeping the live preview and offline template identical.

## Palette and type

The palette is rooted in elemental earth: dark basalt `#24221F`, charcoal ink `#292620`, warm bone `#E9E1D6`, clay paper `#EFE9DF`, raw stone `#BDA78F`, terracotta clay `#AF765D`, sandstone `#B89C81`, and ceramic blush `#C58E6A`. Display typography is rendered in high-contrast editorial serif (Bodoni MT / Didot / EB Garamond) paired with a clean, understated sans-serif (Inter) for architectural annotations and specifications.

## Layout and interactions

The page unfolds through a sequence of sculptural chapters:
1. Full-bleed arrival hero with floating vessel perspective and breathing ring indicator.
2. Manifesto on material eternity and form.
3. Macro texture immersion with circular clip-path reveal into clay microstructure.
4. Object study and dimensional specifications (clay body, firing temperature, wall thickness, batch yield).
5. Craft sequence detailing kiln firing, slip-casting, and hand-finishing.
6. Interior scale exploration showing vessels in contemporary architectural living spaces.
7. Interactive material collection selector switching between Terracotta, Basalt, and Chalk variants with synchronized background transitions and specimen specifications.
8. Consultation intake dialog modal with accessible focus trapping, keyboard controls, and local submission feedback.
9. Colophon footer with sculptural brand typography and navigation anchors.

## Motion and accessibility

Motion reflects heavy ceramic stillness and precision: slow scale reveals, radial gradient rotation, fluid custom cursor with difference blending, and sticky scroll tracking. Under `prefers-reduced-motion`, animations are neutralized, positions become static, the custom cursor is disabled, and all content remains immediately readable and navigable.

## Files and imagery

`public/downloads/strata.html` is the canonical gallery and download document; `route.ts` serves it at `/strata`. The document embeds all required high-resolution vessel renders and craft photography. `public/gallery/strata.webp` is the gallery capture and `public/templates/strata/preview-1600.webp` is its fallback.
