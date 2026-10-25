# NULO media plan

NULO intentionally ships without photos or video. The approved direction is a clinical-future optical lab made from inline SVG, CSS layers, and a procedural lens stack. This keeps the template self-contained and makes the interaction legible on first load.

## Style preamble for optional future stills

Clinical future, tactile optical-bench surfaces, frosted paper, soft daylight through translucent acrylic, pastel lilac / peach / mint accents, graphite ink, measured instrument marks, restrained grain, no text, no logos, no people's faces, no hands, no glossy stock-photo lighting.

## Optional image table

| Filename | Aspect ratio | Use |
| --- | --- | --- |
| `lens-bench.jpg` | 4:3 | Optional hero background texture behind the CSS instrument |
| `frame-arc-01.jpg` | 3:2 | Optional Arc 01 detail in the frame index |
| `frame-fold-02.jpg` | 3:2 | Optional Fold 02 detail in the frame index |
| `frame-halo-03.jpg` | 3:2 | Optional Halo 03 detail in the frame index |

## Optional prompts

1. **`lens-bench.jpg`** — Clinical future, tactile optical-bench surfaces, frosted paper and translucent acrylic lens discs arranged on a pale graphite calibration table, soft daylight, pastel lilac / peach / mint accents, shallow depth, no text, no logos, no people's faces, no hands, 4:3 horizontal still.
2. **`frame-arc-01.jpg`** — Clinical future, a single modular acetate frame on a clear calibration plate, lilac lens tint, gentle side light, graphite shadows, measured instrument marks outside the subject, no text, no logos, no people's faces, 3:2 horizontal still.
3. **`frame-fold-02.jpg`** — Clinical future, a folded hinge frame in peach translucent acrylic on a ruled paper field, soft daylight, tactile edges, no text, no logos, no people's faces, 3:2 horizontal still.
4. **`frame-halo-03.jpg`** — Clinical future, a rounded halo frame with a mint lens reflection, set on frosted paper with tiny lab ticks, soft daylight, no text, no logos, no people's faces, 3:2 horizontal still.

If supplied later, place source files under `assets/incoming/nulo/` and process with `npm run images -- nulo`. The current template never depends on these files.
