# FIXTURE — image prompts

FIXTURE ships **without photography**: the storefront, the stoneware, the logo and the OG image are all coded (SVG, DOM and CSS). Nothing on the page waits for these images.

The prompts below are optional, for a fork that wants real case-study photography in the Work section. Use `Picture` from `src/app/(fixture)/fixture/assets.tsx` with the keys below; it renders a labelled placeholder until the files exist.

## Style preamble (paste into every prompt)

> Clean Swiss commercial product photography, 2020s. Soft north-window daylight, white seamless or warm off-white (#F3F2EE) paper backdrop, a single hard shadow, 50 mm lens, f/5.6, everything in focus. Palette limited to near-black ink, warm off-white, graphite grey and one small crimson accent. Calm, exact, generous negative space on the left third. No text, no logos, no packaging labels, no people's faces, no hands in frame unless stated.

## Images

| Filename | Aspect | Used in |
|---|---|---|
| `case-fennel.jpg` | 4:3 | Work → Fennel & Clay panel |
| `case-ritual.jpg` | 4:3 | Work → Ritual Roast panel |
| `case-spokesmith.jpg` | 4:3 | Work → Spokesmith panel |

Save to `assets/incoming/fixture/`, then run `npm run images -- fixture`.

### case-fennel.jpg

> [Style preamble] Three hand-thrown stoneware pieces on a plain off-white plinth: a near-black mug with a crimson glaze drip on the rim, a low graphite bowl, a tall matte white vase. Arranged in a line along the right two thirds of the frame, each with a crisp shadow falling left.

### case-ritual.jpg

> [Style preamble] A small stack of plain unlabelled coffee bags in kraft and graphite, one open with whole dark roasted beans spilling onto the paper backdrop, a near-black ceramic cup beside it. Top-down three-quarter view, objects in the right two thirds.

### case-spokesmith.jpg

> [Style preamble] A clean bicycle workshop bench: a single road bike wheel leaning against a pale wall, a neat row of graphite tools on a pegboard, one crimson tyre lever. Even daylight, no people, no brand marks on parts.
