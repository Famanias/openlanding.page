# TOLVAR EARTHWORKS: images

The 31 photographs are real jobsite phone photos supplied with the brief. Nothing was generated. Before processing,
lettering that named the original business was painted out (median filter over each patch) by
`.openlanding-page/tolvar/media/prepare-photos.cjs`, which writes the cleaned files to `assets/incoming/tolvar/`.
Equipment makers' own badges are left as shot.

This file records what each photo is and where it goes, plus a prompt that would produce a replacement in the same
style, so the set can be swapped for a different contractor.

Save originals to `assets/incoming/tolvar/` under the asset key, then run `npm run images -- tolvar`.

## Style preamble

Paste this before any prompt:

> Amateur phone photograph taken by a construction worker on a rural Midwestern jobsite, eye level, daylight, slightly soft, no filters, no depth-of-field effects. Red-brown clay, dark topsoil, pale stone, mown grass, bare or leafy hardwood trees. Machines are well-used yellow earthmoving equipment with dust and scuffed paint. Honest and unposed, like a photo texted to the office. No readable text, no company names, no logos, no faces.

## Assets

| Asset key | Aspect | Where used |
|---|---|---|
| `hero-loader` | 16:9 (2000 × 1116) | Full-bleed hero background |
| `cut-excavator` | 4:3 (1280 × 960) | The work: Cut panel |
| `fill-dozer` | 4:3 (1280 × 960) | The work: Fill panel |
| `pipe-chambers-1` | 3:4 (480 × 640) | The work: Pipe panel |
| `haul-dump` | 4:3 (1280 × 960) | The work: Haul panel |
| `yard-iron` | 4:3 (1280 × 960) | The yard, large photo |
| `haul-lowboy` | 4:3 (1280 × 960) | The yard, small photo |
| `cut-loading` | 8:7 (1165 × 1029) | The yard, small photo |
| `about-blade` | 16:9 (1280 × 720) | About |
| `log-pond-1` | 4:3 (1280 × 960) | Job log 0212 |
| `pipe-chambers-2` | 3:4 (480 × 640) | Job log 0209 |
| `log-ledge-wall` | 9:16 (1280 × 2270) | Job log 0204 |
| `pipe-headwall` | 4:3 (1024 × 768) | Job log 0201 |
| `log-waterfall` | 4:3 (1024 × 768) | Job log 0198 |
| `log-pavilion` | 9:16 (1280 × 2270) | Job log 0195 |
| `cut-pond` | 4:3 (1280 × 960) | Job log 0191 |
| `log-stairs` | 3:2 (1280 × 853) | Job log 0188 |
| `log-firepit` | 9:16 (1280 × 2270) | Job log 0184 |
| `pipe-chambers-3` | 3:4 (480 × 640) | Job log 0181 |
| `fill-shaping` | 4:3 (640 × 480) | Job log 0177 |
| `fill-wall` | 2:3 (1280 × 1920) | Job log 0173 |
| `log-deck-2` | 4:3 (640 × 480) | Job log 0169 |
| `fill-drive` | 4:3 (640 × 480) | Job log 0166 |
| `log-riprap` | 4:3 (640 × 480) | Job log 0162 |
| `log-pond-2` | 4:3 (1280 × 960) | Job log 0158 |
| `pipe-culvert` | 9:16 (1280 × 2270) | Job log 0155 |
| `log-bridge` | 3:4 (480 × 640) | Job log 0151 |
| `log-pond-3` | 4:3 (640 × 480) | Job log 0147 |
| `log-framing` | 3:2 (1280 × 853) | Job log 0143 |
| `log-deck-1` | 4:3 (640 × 480) | Job log 0139 |
| `log-pond-4` | 4:3 (640 × 480) | Job log 0134 |
| `footer-yard` | 16:9 (2000 × 1116) | Full-bleed footer background |

## Rules the set has to keep

- Jobsite phone photos (`cut-*`, `fill-*`, `pipe-*`, `haul-*`, `yard-*`, `about-*`, `log-*`) are small (`<= 1,280 px`); keep them at or below their native width rather than full-bleed on desktop.
- No readable company name, phone number or licence plate in any frame.
- `hero-loader` is 16:9 (`2000 × 1116`) for the full-bleed hero background, with the machine on the right and darker sky/cut-bank space on the left for left-aligned copy.

## Prompts

Each prompt is the preamble plus one line.

- `hero-loader`: Wide 16:9 horizontal jobsite photograph on a rural northern Minnesota construction site, overcast daylight, weathered yellow track loader on the right pushing a bucket of dark topsoil and red clay across a muddy cut pad, darker shadowed earth and pine treeline under a moody slate-grey sky on the left.
- `cut-excavator`: A yellow excavator small on the horizon above a wide foreground of freshly cut red clay, overcast sky, a row of young pines.
- `fill-dozer`: A yellow dozer with its blade down in the middle of a huge flat stubble field, grey winter sky.
- `pipe-chambers-1`, `pipe-chambers-2`, `pipe-chambers-3`: Orange arched plastic storm-water chambers in rows on crushed rock inside a fabric-lined excavation, black corrugated pipe and a round concrete structure, shot from the trench edge.
- `haul-dump`: A silver tandem dump truck with its bed fully raised, tipping red fill beside a gravel road, green pasture behind.
- `yard-iron`: A dozer, a track loader and an excavator parked nose to tail beside a gravel yard road, a white metal shop behind, clear winter sky.
- `haul-lowboy`: A yellow track loader chained down on an orange lowboy trailer in a gravel yard.
- `cut-loading`: An excavator on a cut bank loading a grey tandem dump truck, bare trees, blue sky.
- `about-blade`: Close on the front corner of a yellow track loader pushing a pile of dark clods.
- `log-pond-1`, `log-pond-2`, `log-pond-3`, `log-pond-4`, `cut-pond`, `fill-shaping`: Farm ponds at different stages: a raw clay bowl with a dozer in it, a half-filled pond with a bare bank, a finished pond with mown banks and a dock.
- `log-waterfall`: A small stacked-fieldstone waterfall spilling into a new pond in a shaded yard.
- `pipe-headwall`, `pipe-culvert`: A dry-stacked stone headwall around a steel culvert pipe under a rural road, in woods.
- `log-ledge-wall`, `fill-wall`: A retaining wall of large quarried blocks holding a bank above freshly graded dirt.
- `fill-drive`: A new pale gravel driveway forking through green woods.
- `log-riprap`: A pile of large white riprap stone beside a cracked rural road, an orange cone.
- `log-stairs`, `log-deck-1`, `log-deck-2`, `log-framing`, `log-pavilion`, `log-firepit`, `log-bridge`: Finish work on graded ground: a raised cedar deck and stair on a wooded slope, braced posts in a rocky cut, an open timber pavilion on a gravel pad, a gravel path to a stone fire ring, a steel truss trail bridge.
- `footer-yard`: Wide 16:9 horizontal photograph of a quiet rural northern Minnesota excavating yard at dusk after rain, dark wet gravel and topsoil, dark pine treeline against a slate-charcoal evening sky, silhouettes of a parked yellow excavator and dump truck on the right.
