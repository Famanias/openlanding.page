# Ines Vale: design system

Ines Vale is an editorial and fine-art photography monograph portfolio for independent photographer Ines Vale. The route presents personal series, monographs, archival collections, and darkroom field notes.

## Requirements

- Next.js 16 App Router, React 19, TypeScript and Tailwind CSS v4.
- Route isolation in `src/app/(inesvale)/`; no shared imports and no external media.
- Semantic headings, single accessible `h1`, full keyboard accessibility, visible focus rings, and no horizontal overflow at 390px.
- Commission and print inquiry validation runs locally with client draft preparation.
- Full support for `prefers-reduced-motion: reduce`.

## Concept

Photographs of fleeting places, quiet emotions, and everything we almost miss. **The portfolio uses a tactile darkroom and editorial monograph language: viewfinder calibration rules, directional shutter curtain wipes, contact-sheet indexing, and pinned chapter observation.**

## Palette

| Token | Hex | Role |
| --- | --- | --- |
| ivory | `#F2ECE0` | Page ground and primary paper tone |
| ivory-soft | `#F7F4ED` | Card containers and elevated paper sheets |
| ink | `#201C19` | High-contrast typography, borders, and darkroom accents |
| rust | `#A65D46` | Editorial highlight, brush stroke, and active signals |
| slate | `#6D8795` | Secondary atmospheric accent and ocean littoral tones |
| muted | `#79756F` | Secondary metadata, captions, and camera notes |
| rule | `#BFB7AC` | Hairline borders and viewfinder calibration marks |

## Typography

- **Display / Editorial Serif:** Cormorant Garamond (400, 500, 600, italic) for titles, section headings, and quotes.
- **Body & Metadata Sans:** Plus Jakarta Sans (300, 400, 500) for narrative copy, archive labels, technical EXIF data, and form fields.

## Layout & Structure

1. **Header:** Minimal 3-zone bar featuring the uppercase wordmark, section navigation links, and an inquiry CTA with animated arrow. Accompanied by a drawing viewfinder calibration rule.
2. **01 / Hero (The Beauty Between Moments):** Primary aperture-wipe carousel with directional transitions, contact sheet thumbnail index, EXIF metadata tags, and smooth parallax.
3. **02 / Selected Stories:** Horizontal editorial scroll strips showing curated photo essays with monograph drawer readers.
4. **03 / Archive:** Filterable archival grid (All, Portraits, Places, Architecture, Details) with plate numbering and fullscreen archival lightbox.
5. **04 / A Closer Look:** Pinned 3-chapter observation sequence (Observe, Wait, Remember) walking through the photographer's methodology.
6. **05 / Artist:** Monograph introduction to Ines Vale, darkroom philosophy, and artist portrait.
7. **06 / Notes:** Editorial field journal entries with expanded reading modal.
8. **07 / Inquire:** Direct project commission and print acquisition form with interactive field validation and client-side mailto draft.

## Motion System

- **Identity:** Calm, analog, tactile, and cinematic.
- **Verbs:** Focus and Reveal.
- **Tokens:**
  - `--ease-editorial: cubic-bezier(0.22, 1, 0.36, 1)`
  - `--ease-shutter: cubic-bezier(0.65, 0, 0.35, 1)`
- **Keyframe Sequences:**
  - `drawRuleLTR`: Viewfinder hairline expansion.
  - `lineRevealUp`: Staggered headline masks.
  - `shutterWipeNext` / `shutterWipePrev`: Directional curtain wipes.
  - `shutterOpenVertical`: Aperture expansion on load.
  - `filmBreathe`: Subtle ambient analog breathing.
