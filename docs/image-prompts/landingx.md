# Landing X — user-supplied showcase images

The six project previews were supplied from `public/gallery/` and cropped to 16:9 from the top of each image. The source files are saved in `assets/incoming/landingx/` with these names:

| Filename | Project |
|---|---|
| `work-avel.png` | Avel |
| `work-pello.png` | Pello |
| `work-satsuma.png` | Satsuma |
| `work-firstday.png` | Firstday |
| `work-rill.png` | Rill |
| `work-hiyas.png` | Hiyas |

To replace a preview, use PNG, JPEG, or WebP with the same base name. Then run `npm run images -- landingx` to create 800/1600 AVIF and WebP variants and populate the asset manifest. The gallery will use each matching processed image automatically. Do not include a screenshot of this Landing X page in these slots.

## Generated backgrounds

- `hero-background.png`: 16:9 chalk paper and geometric drafting marks with a restrained vermilion accent, created for the hero.
- `footer-background.png`: 16:9 dark layered printmaking paper with a small vermilion mark, created for the footer.

Both original images are in `assets/incoming/landingx/` and processed by the same image command.
