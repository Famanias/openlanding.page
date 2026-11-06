# STRATA design specification

## Requirements and concept

STRATA is a study of contemporary ceramic vessels, earth, form, and considered living ("Formed by earth"). The page presents an immersive tactile journey through architectural ceramics, clay extraction, wheel craft, interior scale, and material finishes. The gallery route serves the same self-contained document as the HTML download, keeping the live preview and offline template identical.

## Palette and type

The palette is rooted in elemental earth: dark basalt `#24221F`, charcoal ink `#292620`, warm bone `#E9E1D6`, clay paper `#EFE9DF`, raw stone `#BDA78F`, terracotta clay `#AF765D`, sandstone `#B89C81`, and ceramic blush `#C58E6A`. Display typography is rendered in high-contrast architectural serif (EB Garamond / Bodoni MT / Didot) paired with a clean geometric sans-serif (Inter) for architectural annotations and specifications.

## Layout and interactions

The page unfolds through a sequence of sculptural chapters:
1. **Hero (Centered Gallery Composition):** Distinct vertical hierarchy featuring collection identifier `CONTEMPORARY CERAMICS / COLLECTION 001`, prominent uninhibited headline `FORMED BY EARTH.`, centered ceramic vessel with warm spotlight bloom and atmospheric concentric rings, and lower italic subtitle *Defined by time.* Bottom metadata and breathing ring indicator.
2. **Manifesto:** Editorial statement on architectural permanence and considered living.
3. **Macro Immersion:** Scroll-driven circular zoom into raw clay mineral grain and surface texture.
4. **Object Anatomy:** Dimensional specifications, batch numbers, firing temperatures, and silhouette study.
5. **Craft Sequence:** Step-by-step kiln, wheel, and hand-finishing processes with atmospheric background imagery.
6. **Interior Scale:** Architectural placement and interior scale exploration.
7. **Interactive Material Collection:** Interactive finish selector (Limestone, Volcanic, Terracotta) switching vessel imagery, background tint, ghost typography, and technical notes in real time.
8. **Numbered Edition Strip:** Release documentation of the 48-piece studio run.
9. **Closing Still-Life & Acquisition:** Direct inquiry trigger with €1,850 acquisition details.
10. **Consultation Dialog:** Accessible modal dialog with focus trapping, Escape key closing, and local submission feedback.
11. **Colophon Footer:** Massive sculptural wordmark, studio directory links, and legal colophon.

## Motion and accessibility

Motion reflects heavy ceramic stillness and precision: slow scale reveals, radial gradient rotation, fluid custom cursor with difference blending, and sticky scroll tracking. Under `prefers-reduced-motion`, animations are neutralized, positions become static, the custom cursor is disabled, and all content remains immediately readable and navigable.

## Files and imagery

`public/downloads/strata.html` is the canonical gallery and download document; `route.ts` serves it at `/strata`. The document embeds all required high-resolution vessel renders and craft photography. `public/gallery/strata.webp` is the gallery capture and `public/templates/strata/preview-1600.webp` is its fallback.

