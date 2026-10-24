# Alpine Reel image prompts

The shipped page uses Unsplash IDs from the supplied brief (table at the bottom) because no image-generation key was available. Everest and K2 are already local, at 1600×1067 (3:2). This file is the spec for replacing all fourteen with generated or supplied stills. Sizes are derived from `alpine-reel.css` and `CinemaReel.tsx`, not guessed.

## 1. Exact sizes

### How an image is framed

`.arl-slide__image` is a wrapper **120vw wide × the full frame height**, with `margin-left: -20vw`, `scale(1.03)` and `object-fit: cover; object-position: center`. The visible slide is **80vw** (86vw at ≤800px). The extra 20vw each side is parallax travel (images move at 1/1.2 of slide speed), so at rest only the **centre two-thirds** of the image is on screen.

Frame height is `100dvh − 2 × --arl-pad-y`: 7.5dvh padding on desktop (**85dvh**), 2dvh on phones (**96dvh**).

| Viewport | Frame (visible slide) | Image wrapper (what `cover` fits) | Wrapper ratio | Visible at rest |
| --- | --- | --- | --- | --- |
| 1440 × 900 (16:10) | 1152 × 765 | 1728 × 765 | 2.26 : 1 | centre 66.7 % of width, 100 % of height |
| 1920 × 1080 (16:9) | 1536 × 918 | 2304 × 918 | 2.51 : 1 | centre 66.7 % of width, 100 % of height |
| 2560 × 1440 (16:9) | 2048 × 1224 | 3072 × 1224 | 2.51 : 1 | centre 66.7 % of width, 100 % of height |
| 3440 × 1440 (21:9) | 2752 × 1224 | 4128 × 1224 | 3.37 : 1 | centre 66.7 % of width, ~74 % of height (top and bottom ~13 % trimmed) |
| 390 × 844 (phone) | 335 × 810 | 468 × 810 | 0.58 : 1 | centre **~17 %** of a 5:2 image (the wrapper alone shows ~23 %) |

### Files to produce, per peak

| Role | Ratio | Master (generate / crop to) | Delivered | Used by |
| --- | --- | --- | --- | --- |
| **Frame image** (required) | **5 : 2** | **3200 × 1280 px**, PNG or max-quality JPEG, sRGB | `{peak}-1600.webp` **1600 × 640**, `{peak}-800.webp` **800 × 320** (+ AVIF of each) | slide frame, and the dossier banner through `object-fit: cover` |
| **Phone frame** (recommended, needs a code change) | **9 : 16** | **1440 × 2560 px** | `{peak}-m-1080.webp` **1080 × 1920**, `{peak}-m-720.webp` **720 × 1280** | slides at ≤800px (not wired yet) |

- 5 : 2 is the one ratio that fills the wrapper on the common 16:9 screens (2.51 : 1) without cropping, and it still covers 16:10 (2.26 : 1) by trimming ~5 % off each side.
- The dossier panel image is **640 × 35dvh** on desktop (about 1.7–2.0 : 1) and **80vw × 35dvh** on phones (about 1.06 : 1). It uses the same frame file, so no extra render is needed.
- File-size budget: 1600 w ≤ 150 KB WebP, 800 w ≤ 60 KB WebP. The page's mobile Lighthouse score depends on this.
- Known limit: the phone frame is 810 CSS px tall. A 1600 × 640 file is only 640 px tall, so phones upscale it at least 1.3× (≈ 3.8× on a 3× screen). That is why the 9 : 16 phone set is recommended. Until it exists, phones show a soft image.

### Composition safe zones (apply to every prompt)

Measured on the 5 : 2 frame image, x from the left edge and y from the top:

| Zone | Rule | Reason |
| --- | --- | --- |
| Summit apex | **x 46–54 %, y 26–34 %** | centre column survives the phone crop (x 38.5–61.5 %) and the parallax crop |
| Main mass of the mountain | inside **x 17–83 %** | the other 17 % each side only appears while dragging |
| Anything essential | inside **y 15–85 %** | 21:9 monitors trim ~13 % top and bottom |
| Top 0–30 % | quiet sky or cloud, no detail | year, eyebrow and badge sit here, under a 70 % abyss gradient |
| Bottom-left 55 % × 35 % | dark, low-detail foreground | the 6–9 rem title and the ascent row sit here |
| Sides (x < 17 %, x > 83 %) | ridgelines, haze, cloud only | parallax edge fill |

On the phone 9 : 16 frame, the summit apex goes at **x 50 %, y 30 %** and the mountain fills the full width.

### Grade (done in CSS, not in the image)

The page applies `grayscale(100%) contrast(1.12) brightness(0.84)`, then a 62 % navy `color` blend. Hue is discarded, so spend the render budget on **luminance structure**: a clean pale summit, mid-grey rock, deep shadow gullies, no clipped whites, no crushed blacks. Keep the render cool and neutral so it grades predictably. Do not tritone or grade the file yourself. `scripts/process-images.ts` only applies a luma ramp for other slugs, not for `alpine-reel`.

## 2. Prompts

Paste **A + B + C** in that order. Replace `{FORMAT}` using the line below for the frame being made.

- Frame image: `ultra-wide 5:2 panorama, 3200 x 1280, landscape orientation`
- Phone frame: `tall 9:16 portrait, 1440 x 2560, vertical orientation, the mountain filling the full width`

### A. Shared prefix

```
Cinematic high-altitude documentary photograph, {FORMAT}. Shot on a 70mm-style large-format camera with a long lens, sharp geological structure, fine snow texture and rock strata, cold overcast blue-hour light, soft atmospheric depth with distinct layers of haze, a restrained blue-grey monochrome tonality with a full tonal range from deep shadow to clean pale snow highlights, a thin wind plume of spindrift off the summit. The summit apex sits at 50% across and 30% down the frame. The upper 30% of the frame is quiet sky or cloud with no detail. The lower-left third is dark, low-detail foreground rock or shadowed glacier. The sides of the frame carry only ridgelines, haze or cloud. Subject:
```

### B. Subject (per peak)

| Filename | Subject text to paste after A |
| --- | --- |
| `mount-everest` | `Mount Everest seen from the southwest: a dark pyramid of banded limestone and snow rising behind the Nuptse–Lhotse wall, a long jet-stream plume of snow streaming east from the summit, the shadowed Khumbu glacier in the lower foreground.` |
| `k2-godwin-austen` | `K2 seen from the Baltoro glacier: a steep, near-symmetrical pyramid of dark granite with hanging ice on every face, the Abruzzi ridge in profile on the left flank, a banner of storm cloud on the summit, moraine and glacial ice in the dark foreground.` |
| `kangchenjunga` | `Kangchenjunga, a vast massif of five snow summits seen from the east at monsoon season, fluted white faces, layers of monsoon haze lying between successive dark forested ridges in the foreground, the highest summit slightly forward of the others.` |
| `lhotse` | `The south face of Lhotse: a colossal vertical wall of blue-grey ice and rock rising above the Nuptse ridge, seen from the Imja valley, the summit a narrow snow crown at the top of the wall, a deep shadowed valley below.` |
| `makalu` | `Makalu, an isolated four-sided pyramid of dark granite with knife-edge snow arêtes running down each corner, seen from the Barun valley, a sharp summit against a pale sky, a dark glacial basin in the foreground.` |
| `cho-oyu` | `Cho Oyu from the Gokyo side at twilight: a broad, gently angled mountain with long flanks of wind-packed snow and a flat summit plateau, the Ngozumpa glacier as a dark band in the foreground, a calm cold blue-hour light.` |
| `dhaulagiri-i` | `Dhaulagiri I rising abruptly above the Kali Gandaki gorge: an enormous white massif with fluted ice faces and a summit pyramid, the deep dark river gorge filling the lower foreground, mountain and gorge in one vertical sweep.` |
| `manaslu` | `Manaslu, a long sweeping ridge with a double-horned rock and snow summit, hanging valley glaciers on its flanks, seen across a dark glacial moraine with fine ice-blue crevasse texture, soft cloud drifting below the ridge.` |
| `nanga-parbat` | `The Rupal Face of Nanga Parbat: an immense 4,600-metre wall of rock, ice and hanging glaciers rising from a dark pine-and-meadow valley floor, the summit pyramid at the top of the wall, the valley floor in deep shadow.` |
| `annapurna-i` | `Annapurna I from inside its sanctuary: an amphitheatre of steep snow ridges and hanging seracs around a high summit, avalanche chutes streaking the faces, a small dark rocky moraine in the foreground.` |
| `gasherbrum-i` | `Gasherbrum I (Hidden Peak) at the head of the Baltoro glacier: a tapering triangular summit of dark rock and snow, partly hidden behind nearer rocky ridges, a calm, remote, wide valley of glacial ice below.` |
| `broad-peak` | `Broad Peak: a long, broad summit crest of snow running horizontally for a kilometre across the frame with a gentle shoulder at one end, seen across the Godwin-Austen glacier, rock-strewn ice in the foreground.` |
| `gasherbrum-ii` | `Gasherbrum II: a delicate, shark-fin ice pyramid with a sharp summit arête, rising above a sea of low cloud and the upper Baltoro glacier, cold clean air, a thin plume of snow from the summit.` |
| `shishapangma` | `Shishapangma seen from the Tibetan plateau: a single broad dome-like snow summit with a fluted southwest face of snow and dark granite, a wide high grassy plain and a dark glacial stream in the foreground, vast open sky.` |

### C. Shared suffix and negatives

```
Natural film grain, no oversaturation, no HDR halos, no people, no animals, no tents, no flags, no ropes or climbing gear, no buildings, no roads, no aircraft, no text, no logos, no watermark, no signature, no warm sunset or orange tones, no purple tones, no lens flare, no rainbow, no fantasy elements, no CGI or painted look.
```

Where the tool has a separate negative-prompt field, put the second line there. Re-roll any image where the summit apex is outside x 46–54 % / y 26–34 %, where the sky has detail behind the top 30 %, or where the foreground is bright behind the title area.

## 3. Cropping a generation that is not 5 : 2

Most generators cannot output 5 : 2. Generate at the widest ratio offered (21 : 9 if possible, otherwise 16 : 9) and crop top and bottom only. Never crop the sides, because the summit must stay at x 50 %.

```js
// 16:9 3840x2160 -> 5:2 3200x1280 with the summit apex landing at 30% down.
// apexY = the apex's y in the source in px; top = clamp(apexY - 0.30 * 1536, 0, 2160 - 1536)
sharp(input).extract({ left: 0, top, width: 3840, height: 1536 }).resize(3200, 1280).png().toFile(output);
```

## 4. Processing and wiring

1. Name the masters exactly as the Filename column and drop them in `assets/incoming/alpine-reel/` (`mount-everest.png`, `k2-godwin-austen.png`, and so on).
2. Run `npm run images -- alpine-reel`. It writes `{name}-800` and `{name}-1600` as WebP and AVIF to `public/templates/alpine-reel/`, and it records the sizes in `assets.generated.ts`. It does no grading.
3. Update `LOCAL_IMAGES` in `sections/CinemaReel.tsx` (it currently maps only Everest and K2 to `everest-*` and `k2-*`) so every `imageId` points at its new file, and update the `width={1600} height={1200}` on the slide `<img>` to `1600` × `640`.
4. Keep K2 and Everest as the only eager images. The rest are switched to eager on window `load`.
5. For the phone set, add the `-m-720` and `-m-1080` candidates to `slideImage()` behind a `(max-width: 800px)` `<picture>` source. This is a code change and is not wired yet.
6. After swapping, re-run mobile Lighthouse. The bar is performance ≥ 90, accessibility ≥ 95, best practices 100.

## 5. Image IDs currently shipping

Used by the page today (hotlinked at `w=1800&h=1200` and `w=800&h=600`, cropped by CSS). Keep them as the fallback until local files exist.

| Filename | Subject | Unsplash id |
| --- | --- | --- |
| `mount-everest` | Mount Everest | `1544735716-392fe2489ffa` (local) |
| `k2-godwin-austen` | K2 | `1464822759023-fed622ff2c3b` (local) |
| `kangchenjunga` | Kangchenjunga | `1519681393784-d120267933ba` |
| `lhotse` | Lhotse | `1454496522488-7a8e488e8606` |
| `makalu` | Makalu | `1486870591958-9b9d0d1dda99` |
| `cho-oyu` | Cho Oyu | `1506744038136-46273834b3fb` |
| `dhaulagiri-i` | Dhaulagiri I | `1483728642387-6c3bdd6c93e5` |
| `manaslu` | Manaslu | `1516655855035-d5215bcb5604` |
| `nanga-parbat` | Nanga Parbat | `1542224566-6e85f2e6772f` |
| `annapurna-i` | Annapurna I | `1534447677768-be436bb09401` |
| `gasherbrum-i` | Gasherbrum I | `1491555103944-7c647fd857e6` |
| `broad-peak` | Broad Peak | `1522163182402-834f871fd851` |
| `gasherbrum-ii` | Gasherbrum II | `1551632811-561732d1e306` |
| `shishapangma` | Shishapangma | `1508739773434-c26b3d09e071` |
