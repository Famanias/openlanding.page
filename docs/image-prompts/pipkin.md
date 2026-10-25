# Pipkin: optional image prompts

The Pipkin template ships with **no photographs**: every picture is drawn in SVG. These prompts exist so you can add real photography later if you want it. Nothing on the page depends on them.

Save results to `assets/incoming/pipkin/`, run `npm run images -- pipkin`, then render them with `<Picture assetKey="<filename without extension>" alt="…" />` from `src/app/(pipkin)/pipkin/assets.tsx`.

## Style preamble (paste into every prompt)

Soft daylight from a window on the left, shallow depth of field, clean pastel styling in cream, blush pink, butter yellow, mint, sky blue and lilac, with deep plum accents. Handmade small-batch food photography, tidy and cheerful, matte surfaces, rounded shapes. No text, no logos, no brand names, no people's faces, no hands with visible faces. Slight film softness, 35mm look.

## Images

| Filename | Aspect | Where it would go |
|---|---|---|
| `kitchen-pot.webp` | 3:2 | Cooking stop: a close alternative to the SVG pot |
| `jars-lineup.webp` | 3:2 | Hero art or the shelf header |
| `packing-table.webp` | 3:2 | Packing stop |
| `doorstep-box.webp` | 3:2 | Doorstep stop and the order success ticket |
| `plum-lavender.webp` | 1:1 | Shelf card art, plum and lavender |
| `strawberry-basil.webp` | 1:1 | Shelf card art |
| `peach-chamomile.webp` | 1:1 | Shelf card art |

## Prompts

**kitchen-pot** — *Style preamble.* A wide pastel-lilac enamel stockpot on a cream tiled counter, bubbling bubblegum-pink strawberry jam, a wooden spoon resting across the rim, soft steam, a small shelf of finished jars blurred in the background.

**jars-lineup** — *Style preamble.* Three squat glass jars with butter-yellow lids and cream paper labels (blank, no writing) in a row on a sky-blue paper backdrop: strawberry pink, lilac plum and golden lemon marmalade. Slight overlap, gentle shadows.

**packing-table** — *Style preamble.* A bright mint-green packing table seen from above at an angle: blush tissue paper, a roll of tape, a pencil, sticker sheets, an open recycled-paper box with one jar tucked in. Nothing branded, no readable text.

**doorstep-box** — *Style preamble.* A small kraft-yellow box with its lid lifted beside it on a doorstep mat, a pink jar of jam just visible inside, a green potted plant at the edge of frame, soft morning light, a pastel painted door behind.

**plum-lavender** — *Style preamble.* A single glass jar of dark plum-lavender jam with a butter lid on a lilac backdrop, a few fresh plums and sprigs of lavender beside it.

**strawberry-basil** — *Style preamble.* A single glass jar of strawberry jam with a basil leaf, ripe strawberries around it, on a blush backdrop.

**peach-chamomile** — *Style preamble.* A single glass jar of golden peach jam with chamomile flowers and a halved peach beside it, on a butter-yellow backdrop.

## Video (not used)

The template does not use video. If you add a hero clip later, generate it from `jars-lineup` as a 5-second slow push-in, no cuts, then encode per `docs` conventions (`media:` scripts in `package.json`).
