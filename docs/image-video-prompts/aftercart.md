# AFTERCART media prompts

AFTERCART ships without photo or video dependencies. Its default hero and console are original DOM/SVG interface art so the template remains fast and fully editable.

If a future variant adds still-life imagery, use this preamble in every prompt:

> Soft editorial still life for a small Shopify merchant care studio; warm paper, pastel lilac, mint, peach, butter and sky accents with deep plum ink; tactile packaging labels, maintenance cards, receipt edges, gentle daylight, high negative space, calm and precise; no text, no logos, no real brand marks, no people's faces, no screens with readable UI.

| Filename | Ratio | Use |
|---|---:|---|
| `aftercart-workbench` | 4:3 | Optional work-log replacement art |
| `aftercart-care-card` | 1:1 | Optional care-track card art |
| `aftercart-og` | 1200:630 | Optional social image replacement |

Save optional originals in `assets/incoming/aftercart/`. Process them with `npm run images -- aftercart`; the current implementation deliberately leaves `assets.generated.ts` empty and uses the coded interface art instead.
