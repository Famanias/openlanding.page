# Landing X — user-supplied showcase images

The six images are intentionally left as placeholders until the user supplies them. Each should be a 16:9 screenshot of the named landing-page template, ideally at least 1600 × 900 pixels. Save PNG, JPEG, or WebP files in `assets/incoming/landingx/` with these exact base names:

| Filename | Project |
|---|---|
| `work-avel.png` | Avel |
| `work-pello.png` | Pello |
| `work-satsuma.png` | Satsuma |
| `work-firstday.png` | Firstday |
| `work-rill.png` | Rill |
| `work-hiyas.png` | Hiyas |

The extension may be `.jpg` or `.webp` instead. Then run `npm run images -- landingx` to create 800/1600 AVIF and WebP variants and populate the asset manifest. The gallery will replace each matching placeholder automatically. Do not include a screenshot of this Landing X page in these slots.
