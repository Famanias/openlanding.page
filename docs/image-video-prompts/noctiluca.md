# Image and video prompts — Noctiluca

Noctiluca is a fictional "house of moving light" in a 1912 pumping station in Lisbon. **The page itself is the 3D space**: every room's light is a live WebGL shader, so no photograph is needed to make the page work. The photographs below are **field notes**: small documentary images on the museum wall labels (and one of the building), showing the real phenomenon each room is tuned to.

Generate them on any platform you like (Gemini, Midjourney, Flux, Imagen, Veo, Runway, Kling …). Use one chat or session for the whole set so the style stays consistent.

## Where the files go

| Kind | Folder | Then run |
|---|---|---|
| Images | `assets/incoming/noctiluca/` | `npm run images -- noctiluca` (writes 800w / 1600w AVIF + WebP and `assets.generated.ts`) |
| Video clips | `assets/incoming/noctiluca/clips/` | the two `ffmpeg` lines at the bottom, then set the clip's key to `true` in `CLIPS` in `src/app/(noctiluca)/noctiluca/assets.tsx` |

Until a file exists, the page shows a labelled, room-tinted placeholder, so nothing is blocked.

## Style preamble (already included in every prompt below)

> Documentary night photography of a natural light phenomenon, shot on a full-frame camera with a 35mm lens, long exposure on a tripod, true-to-life colour, deep clean shadows, fine natural grain, no lens flare, no HDR look, no oversaturation. Calm, quiet, contemplative, like a plate in a natural-history museum. Landscape 3:2 framing with the subject low or centred and generous dark space. No people, no faces, no text, no logos, no watermarks, no borders.

## Images

| # | Filename | Aspect | Used on the page |
|---|---|---|---|
| 1 | `blue-hour-tagus.png` | 3:2 | Room I wall label (Blue Hour) |
| 2 | `aurora-tromso.png` | 3:2 | Room II wall label (Aurora) |
| 3 | `noctiluca-shore.png` | 3:2 | Room III wall label (Noctiluca); also the poster for clip A |
| 4 | `alpenglow-peaks.png` | 3:2 | Room IV wall label (Alpenglow) |
| 5 | `building-exterior.png` | 3:2 | Room VI wall label (the building); also the poster for clip B |

Labels render about 300 px wide on desktop, so keep each subject bold and simple: one clear shape and one dominant colour.

### 1. `blue-hour-tagus.png` (3:2)

Documentary night photography of a natural light phenomenon, shot on a full-frame camera with a 35mm lens, long exposure on a tripod, true-to-life colour, deep clean shadows, fine natural grain, no lens flare, no HDR look, no oversaturation. Calm, quiet, contemplative, like a plate in a natural-history museum. Landscape 3:2 framing with the subject low or centred and generous dark space. No people, no faces, no text, no logos, no watermarks, no borders.

Blue hour over a wide river estuary seen from a low stone quay: the sky a deep even cobalt fading to a thin band of warm apricot right at the horizon, the far shore a low dark line dotted with small sodium-orange city lights, the water glassy and reflecting the cobalt and the lights as soft vertical streaks. The lower third is calm water; the top two thirds are sky.

### 2. `aurora-tromso.png` (3:2)

Documentary night photography of a natural light phenomenon, shot on a full-frame camera with a 35mm lens, long exposure on a tripod, true-to-life colour, deep clean shadows, fine natural grain, no lens flare, no HDR look, no oversaturation. Calm, quiet, contemplative, like a plate in a natural-history museum. Landscape 3:2 framing with the subject low or centred and generous dark space. No people, no faces, no text, no logos, no watermarks, no borders.

Aurora borealis over a dark Arctic fjord: tall folded curtains of green light with a faint violet-magenta upper fringe, hanging in vertical rays, a few stars between them, the black silhouette of low snowy mountains along the bottom edge and their faint green reflection in still water. The curtains fill the upper two thirds.

### 3. `noctiluca-shore.png` (3:2)

Documentary night photography of a natural light phenomenon, shot on a full-frame camera with a 35mm lens, long exposure on a tripod, true-to-life colour, deep clean shadows, fine natural grain, no lens flare, no HDR look, no oversaturation. Calm, quiet, contemplative, like a plate in a natural-history museum. Landscape 3:2 framing with the subject low or centred and generous dark space. No people, no faces, no text, no logos, no watermarks, no borders.

Bioluminescent plankton (Noctiluca scintillans) lighting a small breaking wave on a dark sand beach at night: the wave's lip and foam glow an electric cyan-blue, scattered blue sparks in the wet sand where the water retreats, the sea behind almost black, a faint starry sky at the very top. The glowing wave runs across the lower middle of the frame.

### 4. `alpenglow-peaks.png` (3:2)

Documentary night photography of a natural light phenomenon, shot on a full-frame camera with a 35mm lens, long exposure on a tripod, true-to-life colour, deep clean shadows, fine natural grain, no lens flare, no HDR look, no oversaturation. Calm, quiet, contemplative, like a plate in a natural-history museum. Landscape 3:2 framing with the subject low or centred and generous dark space. No people, no faces, no text, no logos, no watermarks, no borders.

Alpenglow just after sunset: a ridge of high snow peaks lit a soft rose-gold and coral along their upper faces, while the valley and the lower slopes below are already in cool blue-violet shadow; a clear sky shading from pale peach above the peaks to dusky mauve. The lit summits sit in the upper third, the shadowed valley fills the bottom.

### 5. `building-exterior.png` (3:2)

Documentary architectural photography at dusk, shot on a full-frame camera with a 35mm lens on a tripod, true-to-life colour, deep clean shadows, fine natural grain, no lens flare, no HDR look. Calm and quiet. Landscape 3:2 framing. No people, no faces, no text, no signage, no logos, no watermarks, no borders.

An early-20th-century red-brick industrial pumping station on a riverside in Lisbon, seen straight-on from across a cobbled quay: tall round-arched windows in a long symmetrical facade, a slim brick chimney at one end, the windows glowing from inside with soft lilac and violet light, the sky a deep blue-hour cobalt, wet cobblestones reflecting the violet windows. No signage or lettering anywhere on the building.

## Video clips (optional loops on the wall labels)

Both clips are **seamless loops** that play muted on the wall labels, with the matching still as their poster. **Generate the still first, then animate from it** (image-to-video), so clip and poster match.

| Key | Source still | Aspect / size | Duration | Camera | Used on |
|---|---|---|---|---|---|
| A · `noctiluca-shore-loop.mp4` | `noctiluca-shore.png` | 3:2 · 1620×1080 (or 1440×960) | 6 s | locked-off tripod, no movement | Room III wall label |
| B · `exterior-dusk-loop.mp4` | `building-exterior.png` | 3:2 · 1620×1080 (or 1440×960) | 6 s | locked-off tripod, no movement | Room VI wall label |

**Aspect:** 3:2, matching the source stills and the label box (`aspect-ratio: 3 / 2`). If your tool only outputs 16:9, that works too. The video is `object-fit: cover`, so about 8% is trimmed off each side; keep the subject centred.

**Loop rule for both:** the last frame must match the first frame (same framing and the same light), so the loop has no visible jump. If your tool supports first- and last-frame conditioning, use the source still as both.

### Clip A · `noctiluca-shore-loop.mp4`

Animate this photograph as a 6-second seamless loop, locked-off camera, no camera movement. A small wave rolls in and breaks along the lower middle of the frame; its lip and foam flash electric cyan-blue where the water is disturbed, then the glow fades as the foam spreads and sinks into the dark sand, leaving a scatter of blue sparks that wink out. The sea behind stays almost black, with faint stars above. Natural real-time speed, no slow motion. The final frame returns to the calm water of the first frame. No people, no text.

### Clip B · `exterior-dusk-loop.mp4`

Animate this photograph as a 6-second seamless loop, locked-off camera, no camera movement. Inside the tall arched windows of the brick building, the violet light shifts very slowly, as if soft coloured light were flowing across the interior walls: one window warms toward rose while its neighbour cools toward blue, then they return. Small ripples move in the reflections on the wet cobblestones. The sky stays a constant blue-hour cobalt. The final frame matches the first frame. No people, no cars, no text.

### Encode (after the clips are in `assets/incoming/noctiluca/clips/`)

```bash
for k in noctiluca-shore-loop exterior-dusk-loop; do
  ffmpeg -i assets/incoming/noctiluca/clips/$k.mp4 -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -g 8 -keyint_min 8 -sc_threshold 0 -an -movflags +faststart public/templates/noctiluca/clips/$k.mp4
  ffmpeg -i assets/incoming/noctiluca/clips/$k.mp4 -vf scale=-2:720 -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -g 4 -keyint_min 4 -sc_threshold 0 -an -movflags +faststart public/templates/noctiluca/clips/$k-m.mp4
done
```

Then flip the key to `true` in `CLIPS` (`src/app/(noctiluca)/noctiluca/assets.tsx`).

## Gallery preview clip (optional)

For the gallery card, a 6–8 second screen recording of the live page walking from the foyer into Room II is the most honest preview. Record it at 1600×1000 (16:10) in the browser and save it as `public/templates/noctiluca/clips/preview.mp4`, encoded with the first `ffmpeg` line above.

## Re-roll if

- the colour drifts from the room (blue hour turns teal, the aurora turns rainbow, alpenglow turns orange-red sunset);
- any text, signage, watermark or logo appears, or the building gets lettering;
- people, silhouettes or boats show up;
- it looks like digital art, HDR or a fantasy painting rather than a documentary photograph.
