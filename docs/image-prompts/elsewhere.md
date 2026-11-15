# ELSEWHERE: images

The eight photographs were supplied with the brief and are all used. Nothing was generated. This file records what each one is, where it goes, and the prompt that would reproduce it, so the set can be extended or re-shot in the same style.

Save originals to `assets/incoming/elsewhere/` under the asset key, then run `npm run images -- elsewhere`.

## Style preamble

Paste this before any prompt:

> Photograph, 35 mm lens, overcast Pacific Northwest daylight, soft and shadowless. Temperate rainforest: Douglas fir and western hemlock, sword ferns, moss on wet rock, low mist in the valley. Muted natural colour, deep evergreen and grey-white fog, with one warm note: pale pine and amber lamplight inside a small cabin. The cabin is a single-room gable of dark vertical timber boards with a black metal roof, a black stovepipe and one sliding glass door. Quiet, documentary, slightly desaturated, fine film grain. No people, no text, no logos, no vehicles.

## Assets

| Asset key | Supplied file | Aspect | Where used |
|---|---|---|---|
| `overlook` | 01-landscape-panorama.webp | 16:9 (1376 × 768) | Hero plate |
| `cabin-green` | 02-cabin-exterior.webp | 16:9 (1376 × 768) | Threshold exterior; green season plate |
| `interior` | 03-cabin-interior-match.webp | 16:9 (1376 × 768) | Threshold interior |
| `room-detail` | 04-room-detail.webp | 3:4 (896 × 1200) | The room |
| `trail` | 05-forest-trail.webp | 3:4 (896 × 1200) | The walk in |
| `cabin-amber` | 06-season-autumn.webp | 16:9 (1376 × 768) | Amber season plate |
| `cabin-white` | 07-season-winter.webp | 16:9 (1376 × 768) | White season plate |
| `boughs` | 08-foreground-branches-alpha.webp | 16:9 (1376 × 768), alpha | Threshold foreground |
| `boughs-soft` | derived from `boughs` | 16:9 (1376 × 768), alpha | Hero foreground |

## Rules the set has to keep

- `cabin-green`, `cabin-amber` and `cabin-white` share one camera position, exactly. The season wipe and the door rectangle (`x 62.5–75.7%, y 45.8–71.2%` of the frame) depend on it.
- `interior` is shot from the doorway looking in, with the door jambs at the frame edges, so it reads as the view through the door of `cabin-green`.
- In `overlook` the cabin sits at the right, with its door near 81% across and 67% down. The hero tag is placed there.
- `boughs` must have real transparency. The supplied file was a JPEG with a checkerboard baked in; `.openlanding-page/elsewhere/media/prepare-assets.mjs` cuts the alpha channel and writes `boughs.png` and the pre-blurred `boughs-soft.png`.

## Prompts

### `overlook`

> [preamble] A wide view across a misty evergreen valley from a mossy rock shelf. Layered forested ridges fade into low cloud. At the right of the frame, small in the landscape, the cabin stands on the shelf with its glass door lit warm. Wet rock and sword ferns in the foreground. 16:9.

### `cabin-green`

> [preamble] The cabin from about eight metres, three-quarter view, its lit glass door facing the camera right of centre. Through the glass: pale pine boards, a linen sofa, a black wood stove. Wet ferns and mossy boulders in front, a rough rock path leading in from the lower left, mist in the valley behind, out-of-focus fir boughs entering at the left edge. Late spring. 16:9.

### `interior`

> [preamble] Inside the cabin, shot from the open doorway with the dark door jambs at the left and right edges of the frame. Pale pine boards on walls, floor and ceiling. A linen sofa at the left with a folded blanket, a woven jute rug, a three-legged wooden stool, a black wood stove on a slate hearth with split logs at the right. Centred, one large square window full of misty forest. 16:9.

### `room-detail`

> [preamble] Close detail inside the cabin: a folded undyed wool blanket with a coarse weave and a speckled stoneware mug on a pine cabinet. Behind them, out of focus, the black wood stove and a window white with mist. Shallow depth of field. 3:4 portrait.

### `trail`

> [preamble] Looking up a path of mossy stone slabs between tall conifer trunks. Fallen leaves and ferns at the path's edges. At the top of the path, centred, the cabin with its doorway lit, mist behind it. 3:4 portrait.

### `cabin-amber`

> [preamble] Exactly the same camera position and framing as `cabin-green`, in autumn: the ferns and maples have turned amber and gold, fallen leaves cover the wet rock path, mist lies lower in the valley. 16:9.

### `cabin-white`

> [preamble] Exactly the same camera position and framing as `cabin-green`, in winter: snow on the gable roof, the boughs, the ferns and the path. Overcast, flat light, the glass door glowing warm. 16:9.

### `boughs`

> [preamble] Douglas fir boughs entering the frame from the left edge, one reaching in from the top left and one from the bottom left, sharp needles, on a transparent background. Nothing else in the frame. 16:9, PNG with alpha.

### `boughs-soft`

Not generated. A copy of `boughs` with a 5 px premultiplied blur, written by the preparation script, so the hero's nearest layer has depth of field without a runtime filter.
