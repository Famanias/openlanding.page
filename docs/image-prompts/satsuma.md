# Satsuma — video and image prompts

The page works without any of this: every card and maker tile is a drawn SVG scene. These prompts are for swapping in real footage later.

**Video comes first.** The hero wheel reads all ten cards from ONE 16:9 clip laid out as a **5×2 grid** of ten portrait tiles (each tile 384×540, edge to edge, no gaps or borders). The clip downloads once; each card shows its own tile.

Save raw files to `assets/incoming/satsuma/clips/`, then encode (below) into `public/templates/satsuma/clips/` and set `REEL_CLIP` in `src/app/(satsuma)/satsuma/wheel/reel-media.ts`.

## Style preamble (paste at the start of every prompt)

> Bright, airy product-film look, soft window daylight, warm cream backgrounds, colour held to apricot, satsuma orange, deep aubergine, leaf green and cream, clean tabletop compositions with lots of negative space, gentle motion, shallow depth of field, crisp and tactile. No people's faces (hands only), no text, no logos, no brand marks, no on-screen UI.

## The grid clip

| Filename | Aspect | Length | Used in |
|---|---|---|---|
| `reels.mp4` | 16:9, 1280×720 | 5 s, seamless loop | Hero wheel: all ten cards |
| `reels-poster.jpg` | 16:9, 1280×720 | still | Poster shown until the first frame is ready |

### reels.mp4 (16:9, 5 s loop)
[Style preamble] A single 16:9 frame divided into a **5-column × 2-row grid of ten equal portrait panels (each 384×540 px, no gaps, no borders)**, every panel its own self-contained, looping product shot with a locked-off camera and a seamless 5-second loop. Row 1, left to right: (1) an orange sneaker on a cream plinth, slowly turning with a soft shadow; (2) a deep-aubergine skincare bottle on pale sage as droplets splash around it; (3) milk being poured into a latte in a cream cup on apricot; (4) black over-ear headphones on a satsuma-orange ground with soft pulsing rings; (5) three potted plants on a shelf, leaves swaying in a breeze. Row 2, left to right: (6) a hand-tied florist bouquet of orange, peach and plum blooms in cream paper; (7) a potter's wheel spinning an orange vase, a hand shaping it; (8) a single serum drop falling from a dropper into a dark pool with expanding ripples; (9) a top-down latte with art slowly swirling on an apricot saucer; (10) headphones hung on a stand with a soft orange glow behind. Each panel's subject is centred with generous margins so it survives being cropped to a tall card.

### reels-poster.jpg (16:9)
[Style preamble] A still of the exact same 16:9 frame as `reels.mp4`: the same **5-column × 2-row grid of ten equal portrait panels (each 384×540 px, no gaps, no borders)** with the same ten subjects in the same positions (row 1: sneaker, skincare bottle, latte pour, headphones, plant shelf; row 2: bouquet, pottery wheel, serum drop, top-down latte, headphone stand), frozen at the clip's most legible moment, with nothing mid-blur. It is shown on each card until the video's first frame is ready, so it must line up panel for panel with the clip. Easiest route: export frame 1 of the finished `reels.mp4` instead of generating a new image.

## Encoding

```bash
ffmpeg -i reels.mp4 -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p -g 8 -keyint_min 8 -sc_threshold 0 -an -movflags +faststart public/templates/satsuma/clips/reels.mp4
ffmpeg -i reels.mp4 -vf scale=-2:720 -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -g 4 -keyint_min 4 -sc_threshold 0 -an -movflags +faststart public/templates/satsuma/clips/reels-m.mp4
```

Then set `REEL_CLIP = { src: "/templates/satsuma/clips/reels.mp4", srcMobile: "/templates/satsuma/clips/reels-m.mp4", poster: "/templates/satsuma/clips/reels-poster.jpg" }`.

## Optional maker portraits

Save as `assets/incoming/satsuma/` then `npm run images -- satsuma`. Each replaces that maker's drawn scene in the Makers grid.

| Filename | Aspect | Used in |
|---|---|---|
| `maker-imani.jpg` | 4:3 | Makers, Imani Okafor (sneakers) |
| `maker-tove.jpg` | 4:3 | Makers, Tove Lindqvist (skincare) |
| `maker-mateo.jpg` | 4:3 | Makers, Mateo Ruiz (coffee) |
| `maker-hana.jpg` | 4:3 | Makers, Hana Sato (ceramics) |
| `maker-priya.jpg` | 4:3 | Makers, Priya Nair (florals) |
| `maker-jonas.jpg` | 4:3 | Makers, Jonas Weber (audio gear) |

### maker-imani.jpg (4:3)
[Style preamble] A maker's tabletop set for sneaker films: a pair of orange sneakers on a cream paper sweep, a small softbox, a clip light and a camera slider in soft focus, a pair of hands adjusting a lace. No face.

### maker-tove.jpg (4:3)
[Style preamble] A skincare filming setup: a deep-aubergine bottle on a wet pale-sage acrylic block, a glass dropper, a macro lens on a tripod, droplets caught mid-air. Hands only.

### maker-mateo.jpg (4:3)
[Style preamble] A café filming setup: a cream cup of latte with art on an apricot saucer, a steaming milk jug being poured by a hand, a small reflector, morning window light.

### maker-hana.jpg (4:3)
[Style preamble] A ceramics studio: an orange vase mid-throw on a wheel, wet clay hands shaping it, a phone on a clamp arm filming from above, cream plaster wall.

### maker-priya.jpg (4:3)
[Style preamble] A florist's bench: a hand-tied bouquet of orange, peach and plum flowers half wrapped in cream paper, shears, ribbon and a phone on a small tripod in window light.

### maker-jonas.jpg (4:3)
[Style preamble] An audio-gear film set: black over-ear headphones on a stand against a deep-aubergine backdrop with a soft orange rim light, a boom arm and a microphone out of focus.
