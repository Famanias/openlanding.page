# LOWTIDE — optional image prompts

LOWTIDE ships with no generated imagery: the night is procedural and the moon is NASA's public-domain CGI Moon Kit. These prompts are for **optional** painted parallax layers that could replace the procedural headland ridgelines in `engine/headland.ts`. No image API key was available when the template was built.

Style for all: painterly, quiet, night-time, no people, no text, no logos; deep blue-black values (#0A0D16 range) with faint moonlight (#EBD9A6) on edges; transparent sky (PNG with alpha) so the shader sky shows through.

1. `headland-far` — 4096×512, alpha. "A long, low silhouette of distant hills across a bay at night, flat painted shapes, slightly hazed into a dark navy sky, faint moonlit rim along the ridge, no detail below the ridge, transparent above."
2. `headland-mid` — 4096×512, alpha. "A nearer rocky headland at night, two gentle peaks and a long shoulder sloping to the water, deep blue-black, soft painted texture, thin cool moonlight on the seaward edges, transparent sky."
3. `headland-near` — 4096×384, alpha. "A low dark spit of land with a few boulders at the waterline at night, nearly black, painterly edges catching a little moonlight, transparent sky."

Processing: place in `assets/incoming/lowtide/` and run `npm run images -- lowtide`, then sample them in `engine/headland.ts` instead of the procedural ridge.
