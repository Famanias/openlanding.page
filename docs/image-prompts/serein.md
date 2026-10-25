# SEREIN Bureau media direction

SEREIN is intentionally media-free. Do not generate or download photographs, textures, logos or video clips for the template. Every visual is coded as original SVG or CSS so the vertical landing page remains crisp and fast on a phone.

## Style preamble

Observational meteorological modernism, quiet 1970s field-office print, warm paper `#F6F0E5`, deep slate ink `#24343A`, seafoam `#A8D6CC`, lavender `#C7BCE6`, thin technical rules, imperfect registration dots, generous negative space, no text inside artwork, no logos, no people, no raster photography, no gradients with a glossy or glass effect.

## Coded visual inventory

| Filename / component | Aspect | Use |
| --- | --- | --- |
| `sr-mark.svg` | 1:1 | Inline logo mark and favicon |
| `pressure-line.svg` | 3:1 | Shared signature trace across the accordion |
| `cloud-glyphs.svg` | 4:3 | Procedural hero and forecast clouds |
| `wind-rose.svg` | 1:1 | Instruments panel |
| `isobar-field.svg` | 16:9 | Bureau panel background grid |
| `preview.svg` | 16:9 | Gallery preview, generated from the hero SVG |
| `og-image` | 1200:630 | `opengraph-image.tsx`, palette-only JSX |

## Processing

No image-processing command is required. If a future owner supplies raster artwork, place originals in `assets/incoming/serein/`, add the slug to the image allowlist, run `npm run images -- serein`, and replace the labelled placeholders without changing the panel geometry.
