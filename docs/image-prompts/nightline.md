# NIGHTLINE — Image Prompts

> **Template Concept:** NIGHTLINE is a cinematic European sleeper-train booking experience ("The long way through"). A sleeper train is a moving room: the entire interface acts as a rain-streaked carriage window at night, with native scroll pacing the journey from Paris to Vienna.
>
> **Default Architecture:** The template ships with a live full-screen WebGL2 fragment shader (`RainWindow.tsx`) and stylized CSS placeholders. When external photographic stills are generated, save them to `assets/incoming/nightline/` and run the image pipeline.

---

## 1. How to Deliver

1. **Generation:**
   - Generate each of the **6 images below** on any modern image platform (Midjourney v6.1, FLUX.1 [dev/pro], Ideogram v2, or Imagen 3).
   - Use the highest resolution available (at least 1600 px on the long edge; **2048 px to 2560 px recommended**).
2. **File Placement:**
   - Save each file with its **exact lowercase filename** (`.png`, `.jpg`, or `.webp`) into:
     ```
     assets/incoming/nightline/
     ```
3. **Process Images:**
   - Run the optimization script:
     ```bash
     npm run images -- nightline
     ```
   - The script creates responsive **800w** and **1600w** `.avif` (q=55) and `.webp` (q=82) files in `public/templates/nightline/`.
   - The script automatically writes dimensions `{ w, h }` into `src/app/(nightline)/nightline/assets.generated.ts`.
   - The `<Picture assetKey="..." />` component in `assets.tsx` automatically picks up the generated images by key.

---

## 2. Style Preamble

Paste this preamble at the start of every prompt:

> Quiet European night sleeper train travel photograph. Shot on 35mm CineStill 800T or Kodak Vision3 500T film, tactile organic film grain, rich indigo shadows, deep blue window glass (#081423, #0D2238). Sharp water droplets and condensation beads on glass in immediate foreground, contrasted with soft out-of-focus amber sodium lights (#F4B65E) and cool misty atmospheric bokeh (#A7B4C7) in the distance. Low-key interior practical lighting, warm incandescent glow, brass hardware, textured wool, quiet poetic stillness. No people, no human faces, no legible signage lettering, no brand logos, no text, no digital devices, no oversaturated neon, no 3D render look.

### Color Palette Tokens
- **`#081423` (ink):** Night exterior darkness, deep window reflections, shadow falloff.
- **`#0D2238` (deep):** Midnight carriage steel, shadowed wool upholstery.
- **`#F4E8C1` (paper):** Warm linen sheets, timetable paper, cabin reading lamps.
- **`#F4B65E` (amber):** Sodium station signals, incandescent reading light bulbs, brass hardware.
- **`#A7B4C7` (mist):** Condensation droplets, pre-dawn fog, wet steel rails.
- **`#C97972` (rose):** Distant dawn horizon blush, train tail markers, vintage velvet trim.

---

## 3. Image Table

The original image assets required by the template:

| Asset Key | Filename | Aspect Ratio | Dimensions (Target) | Where Used |
|---|---|---|---|---|
| `window-hero` | `window-hero.png` | **16:9** | 2560 × 1440 | Hero background still fallback / WebGL canvas backdrop (`Hero.tsx`) |
| `cabin-couchette` | `cabin-couchette.png` | **4:3** | 1600 × 1200 | Cabin card C-04 ("The couchette", Window 01) in `Cabins.tsx` |
| `cabin-berth` | `cabin-berth.png` | **4:3** | 1600 × 1200 | Cabin card B-12 ("The berth", Window 02) in `Cabins.tsx` |
| `cabin-sleeper` | `cabin-sleeper.png` | **4:3** | 1600 × 1200 | Cabin card S-01 ("The sleeper", Window 03) in `Cabins.tsx` |
| `station-lights` | `station-lights.png` | **3:2** | 1800 × 1200 | Journey section / timetable atmospheric image in `Journey.tsx` |
| `midnight-service` | `midnight-service.png` | **16:9** | 2048 × 1152 | Midnight Service dining car image in `Midnight.tsx` |
| `dawn-platform` | `dawn-platform.png` | **16:9** | 2560 × 1440 | Arrival section image in `Dawn.tsx` |
| `footer-night` | `footer-night.png` | **16:9** | 2048 × 1152 | The Night Desk / Booking section media in `Booking.tsx` |
| `og-base` | `og-base.png` | **16:9** | 1200 × 630 | Open Graph / Twitter share card backdrop (`opengraph-image.tsx`) |

---

## 4. Detailed Prompts

### 1. `window-hero` (16:9)
- **Role:** Hero section background still fallback / WebGL canvas backdrop (`Hero.tsx`).
- **Aspect Ratio:** `16:9` (2560 × 1440 px).
- **Subject:** Full train carriage window viewed from inside at night during heavy rain. Sharp, crystalline water droplets, rivulets, and condensation beads run down the glass in the foreground. In the soft out-of-focus background through the dark glass, a distant railway platform glows with warm sodium-amber canopy lamps and signal lights, melting into deep ink-blue darkness.
- **Composition:** Wide panoramic view. The left two-thirds and lower region remain dark and quiet (shadowed window frame and dark rain field), providing generous negative space for the headline "Take the long way" and departure badge. The right third carries the soft glowing amber bokeh and platform light falloff.
- **Camera & Optics:** 50mm f/1.4 lens focused on the glass surface, razor-thin depth of field, subtle CineStill 800T red/amber halation around the light points.

**Midjourney v6.1 Prompt:**
```
Quiet European night sleeper train travel photograph. Shot on 35mm CineStill 800T film, tactile organic film grain, rich indigo shadows, deep blue window glass (#081423, #0D2238). Sharp water droplets and condensation beads on glass in immediate foreground, contrasted with soft out-of-focus amber sodium lights (#F4B65E) and cool misty atmospheric bokeh (#A7B4C7) in the distance. Low-key interior practical lighting, warm incandescent glow, brass hardware, textured wool, quiet poetic stillness. No people, no human faces, no legible signage lettering, no brand logos, no text, no digital devices, no oversaturated neon, no 3D render look. Viewed from inside a darkened passenger carriage looking through a large rectangular panoramic train window during a night rainstorm. Immediate foreground is in crisp optical focus on intricate water beads, running rivulets, and condensation clinging to dark blue glass. In the distant background through the wet glass, a remote railway platform glows with soft out-of-focus amber sodium lamps and signal lanterns melting into deep indigo night bokeh. Generous dark negative space on the left and lower third. --ar 16:9 --style raw --v 6.1 --c 5
```

---

### 2. `cabin-berth` (4:3)
- **Role:** Cabin card B-12 ("The berth", 2 berths · a reading lamp) in `Cabins.tsx`.
- **Aspect Ratio:** `4:3` (1600 × 1200 px).
- **Subject:** Intimate interior still-life of a two-berth sleeper train compartment at night. A heavy, dense dark blue wool blanket with neat whipstitched edges is folded at the foot of the bed over crisp, warm cream linen sheets. An articulated brass gooseneck reading lamp glows with a warm, low-wattage incandescent filament, casting an intimate pool of amber light across the textured bedding and dark wood sill. Beyond the bed, the train window's deep blue glass reflects the warm interior lamp while framing the dark night outside.
- **Composition:** 4:3 standard framing. Diagonal three-quarter perspective looking down towards the berth corner and window sill. The reading lamp sits upper-right, throwing soft directional light across the diagonal fold of the navy wool blanket. Left side holds the quiet blue glass reflection.
- **Camera & Optics:** 50mm f/2.0 prime, shallow depth of field focused on the texture of the wool weave and brass lamp knuckle.

**Midjourney v6.1 Prompt:**
```
Quiet European night sleeper train travel photograph. Shot on 35mm CineStill 800T or Kodak Vision3 500T film, tactile organic film grain, rich indigo shadows, deep blue window glass (#081423, #0D2238). Sharp water droplets and condensation beads on glass in immediate foreground, contrasted with soft out-of-focus amber sodium lights (#F4B65E) and cool misty atmospheric bokeh (#A7B4C7) in the distance. Low-key interior practical lighting, warm incandescent glow, brass hardware, textured wool, quiet poetic stillness. No people, no human faces, no legible signage lettering, no brand logos, no text, no digital devices, no oversaturated neon, no 3D render look. Detailed interior still-life photograph of a two-berth European sleeper train compartment at night. A heavy midnight-navy wool blanket with clean edges folded neatly over crisp warm cream linen sheets (#F4E8C1). An articulated brass gooseneck reading lamp illuminated with a warm incandescent amber glow (#F4B65E), casting soft directional light across the bed and dark walnut sill. In the background, the dark blue carriage window glass (#081423, #0D2238) catches a faint reflection of the lamp against the deep night outside. Tactile fabric weave, brass patina, intimate and serene, 50mm lens, f/2.0. --ar 4:3 --style raw --v 6.1
```

---

### 3. `cabin-sleeper` (4:3)
- **Role:** Cabin card S-01 ("The sleeper", private cabin · breakfast) in `Cabins.tsx`.
- **Aspect Ratio:** `4:3` (1600 × 1200 px).
- **Subject:** Private first-class sleeper compartment detail. On a fold-out dark walnut and brass table sits a small brushed brass sliding door latch with visible machined screws, an unreadable vintage perforated paper ticket stub on thick cream stock with fine printed grid lines, and a small dark ceramic espresso cup. Soft muted rose/burgundy velvet trim and dark wood paneling frame the scene. Rain streaks down the dark windowpane just behind the sill.
- **Composition:** 4:3 close-up tabletop perspective. The brass latch and paper ticket rest in the central focal plane, with the dark rain-streaked window and rose velvet seating softly blurred in the background.
- **Camera & Optics:** 85mm macro f/2.8 lens, exquisite tactile detail on the paper fibers, brushed brass surface, and glass rain droplets.

**Midjourney v6.1 Prompt:**
```
Quiet European night sleeper train travel photograph. Shot on 35mm CineStill 800T or Kodak Vision3 500T film, tactile organic film grain, rich indigo shadows, deep blue window glass (#081423, #0D2238). Sharp water droplets and condensation beads on glass in immediate foreground, contrasted with soft out-of-focus amber sodium lights (#F4B65E) and cool misty atmospheric bokeh (#A7B4C7) in the distance. Low-key interior practical lighting, warm incandescent glow, brass hardware, textured wool, quiet poetic stillness. No people, no human faces, no legible signage lettering, no brand logos, no text, no digital devices, no oversaturated neon, no 3D render look. Macro architectural still-life photograph inside a private European sleeper train compartment. On a dark walnut sill table sits a vintage heavy brushed-brass door latch, a thick textured cream paper train ticket stub (#F4E8C1) with fine embossed grid lines and perforated edge, and a small dark ceramic espresso cup. In the soft-focus background, dark muted rose velvet upholstery (#C97972) and a dark window with rain streaks lit by warm interior light. Rich tactile surfaces, brass screws, paper fiber texture, 85mm macro lens, f/2.8, shallow depth of field, warm amber practical light (#F4B65E), quiet luxury. --ar 4:3 --style raw --v 6.1
```

---

### 4. `station-lights` (3:2)
- **Role:** Journey section / timetable atmospheric image in `Journey.tsx`.
- **Aspect Ratio:** `3:2` (1800 × 1200 px).
- **Subject:** Kinetic motion photograph shot through a vibrating carriage window as the sleeper train speeds past an empty way-station at night. Amber sodium platform lamps, overhead catenary wire sparks, and trackside signal lanterns drag horizontally across the wet glass in glowing, luminous ribbon streaks and soft circular bokeh. Sharp individual rain droplets clinging to the outer glass pane refract and mirror the smeared amber streaks.
- **Composition:** 3:2 classic horizontal film framing. Sweeping horizontal motion vectors rushing from right to left. The foreground remains anchored by sharp, stationary water droplets on the glass, while the midground and background stretch into glowing abstract light trails.
- **Camera & Optics:** 50mm f/1.4, slow dragging shutter speed (1/4s) creating smooth optical light streaks, CineStill 800T halation along the edges of the amber ribbons.

**Midjourney v6.1 Prompt:**
```
Quiet European night sleeper train travel photograph. Shot on 35mm CineStill 800T film, tactile organic film grain, rich indigo shadows, deep blue window glass (#081423, #0D2238). Sharp water droplets and condensation beads on glass in immediate foreground, contrasted with soft out-of-focus amber sodium lights (#F4B65E) and cool misty atmospheric bokeh (#A7B4C7) in the distance. Low-key interior practical lighting, warm incandescent glow, brass hardware, textured wool, quiet poetic stillness. No people, no human faces, no legible signage lettering, no brand logos, no text, no digital devices, no oversaturated neon, no 3D render look. Kinetic motion-blur photograph captured from a speeding train window at night, passing through an unlit rural European station. Exterior amber sodium platform lamps and signal lanterns smear into luminous horizontal light trails and soft bokeh ribbons across dark wet window glass. Sharp, crisp rain droplets and condensation beads on the foreground glass surface refract the golden light. Deep ink-blue and indigo night background (#081423), radiant warm amber streaks (#F4B65E), silver water droplets (#A7B4C7). Authentic analog dragging-shutter exposure, CineStill 800T halation, tactile film grain, abstract and poetic. --ar 3:2 --style raw --v 6.1
```

---

### 5. `dawn-platform` (16:9)
- **Role:** Arrival section image in `Dawn.tsx`.
- **Aspect Ratio:** `16:9` (2560 × 1440 px).
- **Subject:** Tranquil arrival platform at Vienna central station in the pale blue hour just before sunrise. The dark sleeper train rests quietly alongside an empty, polished wet stone platform that reflects the cool morning sky. Soft morning mist and steam hang beneath the soaring glass and steel arched station canopy. Far along the platform, a single warm amber glow from an early station cafe window pierces the cool blue air. The first hint of soft rose-tinted dawn light touches the horizon beyond the station arch. Completely empty of passengers; peaceful and still.
- **Composition:** Expansive 16:9 landscape framing. One-point linear perspective running down the wet platform between the train cars on the left and the architectural pillars on the right. Generous breathing space across the upper canopy and lower reflective platform tiles.
- **Camera & Optics:** 35mm f/2.8 lens, balanced wide-angle architectural framing, soft diffused morning light, medium format 6×7 camera aesthetic.

**Midjourney v6.1 Prompt:**
```
Quiet European night sleeper train travel photograph. Shot on 35mm film or medium format 6x7, tactile organic film grain, rich indigo shadows, deep blue tones (#081423, #0D2238). Low-key lighting, cool misty atmospheric bokeh (#A7B4C7), quiet poetic stillness. No people, no human faces, no legible signage lettering, no brand logos, no text, no digital devices, no oversaturated neon, no 3D render look. Wide architectural documentary photograph of an arrival platform at Vienna central station at dawn before sunrise. A dark blue European sleeper train sits quietly on the tracks beside an empty, damp polished stone platform that mirrors the pale morning sky. Delicate morning mist drifting under an expansive arched iron-and-glass canopy. Distant warm amber light glowing from a solitary station window (#F4B65E). Subtle blush of rose dawn (#C97972) emerging along the cold blue-grey horizon (#A7B4C7). Peaceful, unhurried, calm morning arrival, fine grain, wide dynamic range. --ar 16:9 --style raw --v 6.1
```

---

### 6. `og-base` (16:9)
- **Role:** Open Graph / Twitter share card backdrop (`opengraph-image.tsx`).
- **Aspect Ratio:** `16:9` (1200 × 630 px).
- **Subject:** Minimalist and cinematic Open Graph social card background. A dark, rain-speckled train window at night. Across the dark glass pane, a single luminous amber rail signal light reflects as a clean, glowing horizontal streak across the lower right quadrant. The entire left half and upper portion of the frame is a rich, clean field of deep indigo and ink-blue darkness with fine, tactile film grain—engineered deliberately as a high-contrast negative space safe zone for large social typography overlays ("NIGHTLINE / Take the long way").
- **Composition:** 16:9 horizontal layout (1200 × 630 px). Asymmetric visual weight: 75% dark negative space on the left and center; 25% atmospheric glowing rain and amber light reflection in the lower right.
- **Camera & Optics:** 50mm lens at f/2.0, focused on the glass pane, high contrast, clean velvety shadow falloff without digital banding.

**Midjourney v6.1 Prompt:**
```
Quiet European night sleeper train travel photograph. Shot on 35mm CineStill 800T film, tactile organic film grain, rich indigo shadows, deep blue window glass (#081423, #0D2238). Sharp water droplets and condensation beads on glass in immediate foreground, contrasted with soft out-of-focus amber sodium lights (#F4B65E) and cool misty atmospheric bokeh (#A7B4C7) in the distance. Low-key interior practical lighting, warm incandescent glow, quiet poetic stillness. No people, no human faces, no legible signage lettering, no brand logos, no text, no digital devices, no oversaturated neon, no 3D render look. Minimalist cinematic 16:9 banner photograph of a dark European sleeper train window at night. An abstract, solitary glowing amber railway signal line (#F4B65E) streaks across the lower right corner, reflecting across wet, dark blue window glass with delicate rain beads. The entire left half and upper area of the frame is deep, smooth ink-blue negative space (#081423, #0D2238) with rich velvety shadow falloff and tactile film grain, designed for text overlay. Clean, graphic, high contrast, CineStill 800T aesthetic. --ar 16:9 --style raw --v 6.1
```

---

## 5. Verification Checklist

Before processing images through `npm run images -- nightline`:
- [ ] **Exact 6 Filenames:** Only `window-hero`, `cabin-berth`, `cabin-sleeper`, `station-lights`, `dawn-platform`, and `og-base` are placed in `assets/incoming/nightline/`.
- [ ] **Palette Harmony:** Images adhere strictly to ink `#081423`, deep `#0D2238`, paper `#F4E8C1`, amber `#F4B65E`, mist `#A7B4C7`, and rose `#C97972`.
- [ ] **No Faces & No Text:** Zero readable signage, zero fake train brand marks, zero human faces.
- [ ] **Resolution:** Minimum 1600 px on the long edge (2048 px to 2560 px recommended).
- [ ] **Post-Build Manifest:** `npm run images -- nightline` completes and registers the 6 assets in `assets.generated.ts`.
