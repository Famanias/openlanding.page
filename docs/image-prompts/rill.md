# RILL image and video prompts

The user is generating these assets on their preferred platform. Put raw files in `assets/incoming/rill/` and raw clips in `assets/incoming/rill/clips/` using the exact filenames below. The template renders labelled placeholders until the files arrive.

## Style preamble

Documentary field study, contemporary but weathered, shot as if for a 1970s agronomy field notebook with a modern medium-format camera. Dryland farm after rain, contour agriculture, basalt and limestone soil, iron-oxide clay, riverstone blues, lichen greens, muted silt, low side light, soft overcast highlights, visible grain and real soil texture, restrained contrast, tactile paper feeling. No text, no logos, no watermarks, no UI, no fantasy neon, no oversaturated greens, no sci-fi machinery, no posed people's faces. Keep horizons quiet and give the frame room for a small mono caption overlay. Maintain natural proportions and a calm, observational pace.

## Still images

| Filename | Ratio | Used in |
|---|---:|---|
| `hero-ridge.jpg` | 16:9 | Hero storm film poster and Open Graph source |
| `land-aerial.jpg` | 16:9 | Read-the-land stage, ridge phase |
| `swale-close.jpg` | 4:3 | Read-the-land stage, swale phase |
| `root-zone-macro.jpg` | 4:3 | Read-the-land stage, root-zone phase |
| `systems-swale.jpg` | 4:3 | Field systems card: contour swale |
| `systems-shade.jpg` | 4:3 | Field systems card: shade row |
| `systems-drip.jpg` | 4:3 | Field systems card: low-pressure drip |
| `field-note-01.jpg` | 3:2 | Field note: Cienega / 14 ha |
| `field-note-02.jpg` | 3:2 | Field note: Marrow Creek / 28 ha |
| `field-note-03.jpg` | 3:2 | Field note: Las Lomas / 42 ha |
| `season-ledger.jpg` | 16:9 | Seasonal ledger backdrop |
| `ecosystem-footer.jpg` | 3:2 | Optional footer texture behind the ecosystem drawing |

### `hero-ridge.jpg`

Documentary aerial view of a dryland farm after a 42 mm storm, one low ridge descending into a shallow contour swale, wet dark soil cutting through pale limestone, sparse lichen and crop rows, no horizon line, wide negative space on the lower left for RILL copy, 16:9.

### `land-aerial.jpg`

High overhead study of several contour lines moving across a dry field, storm water visible as a thin reflective thread, subtle crop rows and a single farm track, geometry legible enough to carry an SVG overlay, 16:9.

### `swale-close.jpg`

Close three-quarter view of a contour swale holding rain, iron-oxide soil, small stones, green lichen at the edge, one new shoot, low afternoon light, shallow depth but real texture, 4:3.

### `root-zone-macro.jpg`

Macro study beneath a crop row after rain: root hairs, dark damp soil, pale stone, tiny fungal threads, a small pool of water settling into a pore, calm mineral colour, 4:3.

### `systems-swale.jpg`

Editorial field photograph of a finished contour swale on a dryland farm, camera at shoulder height, the earthwork reading as a simple line across the slope, no people, 4:3.

### `systems-shade.jpg`

Editorial field photograph of a shade row beside young crops, cloth or tree shadow crossing the soil, dry grass and lichen, one clear line of irrigation, no people, 4:3.

### `systems-drip.jpg`

Editorial close photograph of a low-pressure drip line laid carefully along a contour, drops collecting at the soil surface, basalt stones and muted green leaves, no product branding, 4:3.

### `field-note-01.jpg`

Small dryland grain farm after first rain, contour rows visible, quiet documentary composition with room for a field-note stamp, 3:2.

### `field-note-02.jpg`

Mixed orchard and cover crop on a shallow slope, late-season light, visible mulch and water-holding soil, documentary field notebook style, 3:2.

### `field-note-03.jpg`

Vegetable field at the end of a wet week, root-zone soil dark and alive, a simple farm lane leading through the frame, no people or logos, 3:2.

### `season-ledger.jpg`

Long lateral view of a farm through changing weather: foreground cover crop, middle-distance orchard, cloud shadow moving across the ridge, enough quiet space for a twelve-month overlay, 16:9.

### `ecosystem-footer.jpg`

Tactile close view of soil layers with roots, mycelium, a small insect trail and a thin water path, abstract enough to sit behind a line-art ecosystem diagram, 3:2.

## Video clips

All clips should be 6–10 seconds, silent, with a locked or very slow camera. The first and last frames should be quiet enough for a crossfade; no clip should contain text or a logo.

| Filename | Ratio | Duration | Used in |
|---|---:|---:|---|
| `clips/storm-threshold.mp4` | 16:9 | 8 s | Hero and the 42 mm signature moment |
| `clips/root-zone-pulse.mp4` | 4:3 | 7 s | Root-zone phase and water-budget handoff |

### `clips/storm-threshold.mp4`

Slow aerial drift toward a contour swale immediately after rain. Begin with a still ridge and faint wet lines, let a thin blue-grey stream appear and cross the contour around the middle, then settle into the swale by the final frame. The final frame should hold for 1 second so the next image can crossfade cleanly. 8 seconds, 24 fps, 16:9, no sound.

### `clips/root-zone-pulse.mp4`

Locked macro shot below a crop row. A small bead of water travels through dark soil toward a root hair, a fungal thread catches the light, and the motion settles before the final frame. Begin and end with nearly still soil texture so the clip can loop softly. 7 seconds, 24 fps, 4:3, no sound.

## Processing

After copying the files, run `npm run images -- rill` for the stills. Encode the clips as `public/templates/rill/clips/storm-threshold.mp4`, `storm-threshold-m.mp4`, `root-zone-pulse.mp4`, and `root-zone-pulse-m.mp4` using the short-GOP commands in `media.md` §5. Then populate `assets.generated.ts`, build a contact sheet, and review the processed media before switching the placeholders off.

