# CHINAGRAPH — image prompts (Collection 07, "Concrete Flash", AW26)

28 stills. The page is built on these: until a file exists, its slot shows a labelled film-frame placeholder.

## How to deliver

1. Generate each image below on any platform (Midjourney, Flux, Ideogram, Imagen, Firefly, etc.). Use the **highest resolution** it offers (2048 px on the long edge is ideal; 1600 px minimum).
2. Save each file with the **exact filename** in the table (`.png`, `.jpg` or `.webp`) into `assets/incoming/chinagraph/`.
3. Run `npm run images -- chinagraph`. It writes 800w/1600w AVIF + WebP to `public/templates/chinagraph/` and fills `src/app/(chinagraph)/chinagraph/assets.generated.ts`. Nothing else changes: the page picks them up by name.

**Consistency matters more than any single frame.** The 12 roll frames are one night, one model, one flash.
- Generate `roll-02` first. When it looks right, use it as the **style and character reference** for every other people frame (Midjourney `--sref` + `--cref`, Flux/Imagen image reference, or your tool's "reference image").
- Keep the same aspect ratio, the same seed/style settings and the same model description across the set.
- Re-roll anything with text, logos, extra fingers, plastic skin, studio lighting or a warm "golden hour" look.

## Style preamble (paste at the start of every prompt)

> Fashion campaign photograph, 2020s raw editorial. Shot at night on medium-format film (6×6, Hasselblad-style), harsh on-camera direct flash, deep black falloff behind the subject, hard crisp shadow cast onto the wall or ground, visible film grain, slightly lifted blacks, true-to-life skin texture, no retouching gloss. Urban brutalist concrete locations: underpasses, multi-storey car parks, stairwells, forecourts, wet tarmac. Colour palette restrained: concrete greys, wet black, sodium-orange ambient light in the far background only; the garment is the only strong colour. No text, no signage lettering, no logos, no brand marks, no watermarks.

**The model (paste into every frame with a person):**

> The same model throughout: androgynous, late twenties, very short cropped dark hair, pale olive skin, strong brows, unsmiling, calm and slightly defiant, slim build, 185 cm. Minimal jewellery: one plain silver ring.

## Files

| Filename | Aspect | Used for |
|---|---|---|
| `roll-01` … `roll-12` | **1:1** | The contact sheet (12 frames). Six of them (02, 04, 05, 07, 10, 12) also become the full-screen looks, so they must hold up enlarged to full screen with the subject roughly centred. |
| `detail-01` … `detail-06` | **4:5** | One close crop per look, shown as an inset card on each look |
| `cloth-01` … `cloth-04` | **4:5** | Fabric macros in the Cloth strip |
| `flat-01` … `flat-06` | **4:5** | Flat lays on concrete for the shop cards (they swap to the roll frame on hover) |

---

## The roll (1:1)

Keep the subject in the **central two thirds** of the square: the looks crop the square to a wide or tall screen from its centre.

### roll-01.jpg — out-take
> [Style preamble] [Model] Walking fast towards camera through a long concrete underpass, oversized dark wool overcoat flapping, slight motion blur on the legs, fluorescent tubes far behind, flash freezing the face and torso. Square frame.

### roll-02.jpg — SELECT, Look 01 (Box Coat)
> [Style preamble] [Model] Standing square to camera against a rough board-marked brutalist concrete wall, wearing a boxy navy melton wool coat with a dropped shoulder, worn open over a black T-shirt, hands at sides. Direct flash throws a sharp black shadow of the figure onto the wall behind. Full-length from mid-thigh up, centred. Square frame.

### roll-03.jpg — out-take
> [Style preamble] [Model] Sitting on the concrete steps of a multi-storey car-park stairwell, knees up, forearms resting on knees, navy coat draped around shoulders, painted yellow edge line on each step, flash bouncing off the walls. Square frame.

### roll-04.jpg — SELECT, Look 02 (Work Jacket)
> [Style preamble] [Model] On an empty petrol-station forecourt at night, standing beside a pump island with no visible branding, wearing a cropped black waxed-cotton work jacket with four patch pockets, zipped half way, charcoal trousers. Sodium-orange canopy light high above, direct flash on the figure, wet concrete reflecting. Three-quarter length, centred. Square frame.

### roll-05.jpg — SELECT, Look 03 (Pleat Trouser)
> [Style preamble] [Model] Mid-stride across a wet zebra crossing at night, caught by flash, wearing wide charcoal flannel pleated trousers with a single break, black rollneck, black leather shoes; the white crossing stripes and puddle reflections around the feet. Full length, figure centred, slight low angle. Square frame.

### roll-06.jpg — out-take
> [Style preamble] [Model] Close, blurred frame: the model laughing with eyes closed, head turned, camera slightly shaken, flash smeared, a genuine unguarded moment. Square frame.

### roll-07.jpg — SELECT, Look 04 (Rollneck)
> [Style preamble] [Model] Leaning one shoulder against a dented corrugated metal shop shutter, wearing a thick bone-white boiled-wool rollneck, dense and slightly stiff, tucked into charcoal trousers, arms folded. Flash makes the shutter's ridges cast stripes of shadow. Waist up, centred. Square frame.

### roll-08.jpg — out-take
> [Style preamble] [Model] Walking away down a tiled pedestrian tunnel, back to camera, coat collar up, the tunnel vanishing into darkness, flash lighting the wet floor tiles. Square frame.

### roll-09.jpg — out-take
> [Style preamble] Close detail of the model's hands pushed into the pockets of a grey gabardine coat on a rooftop car-park ramp, painted parking-bay lines on the concrete, flash. Square frame.

### roll-10.jpg — SELECT, Look 05 (DB Suit)
> [Style preamble] [Model] Standing on the top level of a rooftop car park at night, a hazy city skyline of distant lights behind (no legible signs), wearing a rain-grey gabardine double-breasted suit, six buttons, soft shoulder, wide trousers sitting on black shoes, no tie, white shirt open at the neck. Flash on the figure, background soft. Full length, centred. Square frame.

### roll-11.jpg — out-take
> [Style preamble] Overexposed frame: the flash flaring off a concrete pillar and burning out half the image, the model's silhouette barely visible at the edge, light leak at one side. Square frame.

### roll-12.jpg — SELECT, Look 06 (Car Coat)
> [Style preamble] [Model] In an empty multi-storey car park, leaning back against the bonnet of a dark unbadged 1980s saloon car, wearing a knee-length oxblood leather car coat pieced from visible panels, collar up, black trousers. Flash glints on the car's paint and the leather seams; fluorescent tubes in the low ceiling. Three-quarter length, centred. Square frame.

---

## Details (4:5)

### detail-01.jpg — Box Coat
> [Style preamble] Extreme close crop of a navy melton wool lapel and a single dark horn button, dense felted surface, flash raking across the fibres, black background. Vertical 4:5.

### detail-02.jpg — Work Jacket
> [Style preamble] Extreme close crop of black waxed cotton creasing around a chest patch pocket, the wax catching the flash in pale cracked highlights, brass-free black press stud. Vertical 4:5.

### detail-03.jpg — Pleat Trouser
> [Style preamble] Close crop of charcoal flannel trouser pleats swinging mid-step, the hem breaking over a black leather shoe, wet tarmac and a white crossing stripe below. Vertical 4:5.

### detail-04.jpg — Rollneck
> [Style preamble] Extreme close crop of the folded neck of a bone boiled-wool rollneck against corrugated metal, the knit felted and dense, hard flash shadow. Vertical 4:5.

### detail-05.jpg — DB Suit
> [Style preamble] Close crop of a rain-grey gabardine double-breasted jacket front: two columns of dark buttons and a peak lapel, the twill visible, flash. Vertical 4:5.

### detail-06.jpg — Car Coat
> [Style preamble] Extreme close crop of oxblood leather panels meeting at a topstitched seam, glossy under hard flash, the grain visible. Vertical 4:5.

---

## Cloth macros (4:5, no people)

### cloth-01.jpg — Melton
> [Style preamble] Macro photograph of dense navy melton wool cloth, felted fibres filling the frame, raking flash from one side, sharp focus, shallow depth falling off at the top edge. Vertical 4:5.

### cloth-02.jpg — Waxed cotton
> [Style preamble] Macro photograph of black waxed cotton canvas folded once, the wax cracked into fine pale highlights along the fold, hard flash. Vertical 4:5.

### cloth-03.jpg — Flannel
> [Style preamble] Macro photograph of charcoal wool flannel, soft brushed surface with a faint herringbone, a cut raw edge crossing the frame diagonally. Vertical 4:5.

### cloth-04.jpg — Gabardine
> [Style preamble] Macro photograph of rain-grey gabardine, the steep diagonal twill lines crisp and tight, a single chalk tailoring mark on the cloth. Vertical 4:5.

---

## Flat lays (4:5, no people)

Shoot all six identically: **top-down, the garment laid flat and neatly arranged on bare grey concrete, harsh direct flash from slightly off-axis so the garment casts a short hard shadow, the concrete texture visible to the frame edges, garment filling about 70 % of the frame, centred.**

### flat-01.jpg
> [Style preamble] [Flat-lay rule] A boxy navy melton wool coat, unbuttoned, sleeves laid straight.

### flat-02.jpg
> [Style preamble] [Flat-lay rule] A cropped black waxed-cotton work jacket with four patch pockets, zipped.

### flat-03.jpg
> [Style preamble] [Flat-lay rule] Wide charcoal flannel pleated trousers, folded once at the knee to show the pleats.

### flat-04.jpg
> [Style preamble] [Flat-lay rule] A thick bone-white boiled-wool rollneck, folded square with the neck on top.

### flat-05.jpg
> [Style preamble] [Flat-lay rule] A rain-grey gabardine double-breasted suit jacket laid flat with its matching trousers folded beside it.

### flat-06.jpg
> [Style preamble] [Flat-lay rule] A knee-length oxblood leather car coat pieced from visible panels, collar up, laid flat.

---

## Optional video (not required)

The page needs no video. If you want one, a 6 s loop `clips/roll-02-loop.mp4` (1:1, the Look 01 frame with the coat hem moving in wind and the flash firing once at 0 s) can replace the first look's still later; see `media.md` §5 for encoding.
