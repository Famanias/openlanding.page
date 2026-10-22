# ISOBAR image + video prompts

These prompts are references for optional supporting media. The landing page's primary visual is the procedural Three.js pressure membrane; do not replace it with a basic 3D model. Do not copy code, assets, or markup from gradients.sh.

## Style preamble

Contemporary atmospheric systems photography, mineral paper and dark plum, coral signal red, acid mint, ultraviolet violet, and a single warm sun marker; soft studio light passing through translucent resin, precise topographic contours, subtle film grain, high negative space, tactile material detail, editorial art direction, 50mm lens, crisp focus with gentle depth falloff. No text, no logos, no UI, no people's faces, no hands, no readable symbols, no stock-photo look.

## Still images

| Filename | Ratio | Use |
| --- | --- | --- |
| `isobar-poster-1600.webp` | 16:9 | optional hero / gallery preview replacement |
| `isobar-transect-1600.webp` | 4:3 | optional transect fallback panel |
| `isobar-field-note-01-1600.webp` | 3:2 | field note study |
| `isobar-field-note-02-1600.webp` | 3:2 | material study detail |
| `isobar-field-note-03-1600.webp` | 3:2 | instrument detail |
| `isobar-og-1600.webp` | 16:9 | social preview alternative |

Save stills in `assets/incoming/isobar/`. Process with `npm run images -- isobar` to create WebP and AVIF variants in `public/templates/isobar/`.

### `isobar-poster-1600.webp`

{{STYLE PREAMBLE}} A translucent topographic membrane suspended in a warm mineral studio, three dimensional contour ribbons folding through a soft coral-to-mint pressure gradient, violet depth pockets, one tiny sun-yellow signal point, oblique camera, generous negative space on the left for copy, no objects that read as a product.

### `isobar-transect-1600.webp`

{{STYLE PREAMBLE}} Close view beneath a translucent pressure surface, layered contour strata separating in depth, coral shear line crossing a violet and mint volume, camera looking diagonally through the slice, no horizon, no text.

### `isobar-field-note-01-1600.webp`

{{STYLE PREAMBLE}} Macro still life of a thin resin sheet with raised isobar contours, warm paper ground, side-lit coral edge and soft mint reflection, quiet scientific archive feeling, no instruments or labels.

### `isobar-field-note-02-1600.webp`

{{STYLE PREAMBLE}} Folded translucent material study, violet interior and mint surface tension, a small sun-yellow point caught between layers, abstract architectural composition, high negative space.

### `isobar-field-note-03-1600.webp`

{{STYLE PREAMBLE}} Dark plum instrument slab with a sculptural pressure pin and curved contour shadows, coral indicator light, mineral dust, precise and tactile, no readable UI.

### `isobar-og-1600.webp`

{{STYLE PREAMBLE}} Wide editorial composition of a single volumetric pressure membrane floating in a light mineral room, coral and violet contour folds, mint edge glow, large quiet paper area, no text.

## Video prompt

### `isobar-transect-08s.mp4`

{{STYLE PREAMBLE}} 8-second silent macro camera move through one translucent pressure membrane. Start above the surface with coral contours lying flat, drift forward and dip beneath the first layer at 3 seconds, reveal separated mint and violet strata at 5 seconds, then let the layers re-form into a calm single sheet for the final frame. Locked 50mm camera, very slow scan, no cuts, no text, no logos. First frame: intact membrane viewed from above. Last frame: same membrane re-formed from a slightly lower angle. Save to `assets/incoming/isobar/clips/` and encode a desktop and `-m` phone version with the repo's ffmpeg recipe.
