# Prompt: rebuild "KŌJI 麹" (3D-focused landing page)

Paste everything below the line into your AI coding agent.

---

Build a landing page in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4 + Three.js (`three/webgpu` + TSL)** for a fictional Japanese restaurant called **KŌJI 麹**. It's a fermentation kitchen with twelve seats at one concrete counter, on the 14th floor of an imagined 1972 Metabolist concrete tower in Ginza. Eleven courses, open 18:00–23:00.

**Everything is flat 1960s–90s Japanese brutalism. Only the food is 3D.** It must feel monumental and hand-made, never like a restaurant template.

**Reference** (look and feel only; generate your own images): the live template at https://openlandingpage.vercel.app/koji.

## Brand rules

- **Five colours only:**
  - sumi `#1A1918`
  - shadow `#4A4743`
  - béton `#8E8A83`
  - washi `#EDEAE4`
  - shu `#C8331F` (the single accent: seal red)

  Square corners, 3px rules, no gradients and no soft shadows. The one shadow is a hard `10px 10px 0` offset on the reservation card.
- **Board-marked concrete** in CSS: `repeating-linear-gradient` horizontal formwork lines every 60px plus faint vertical grain, over béton or shadow.
- **Type (via `next/font/google`):**
  - **Dela Gothic One** for the wordmark, titles and kanji.
  - **Zen Kaku Gothic New** for body text.
  - **DM Mono** uppercase with 0.12em tracking for signage, labels and the menu.
- **Wordmark:** "KŌJI" with the Ō in shu.
- **Icon and mark:** a **hanko seal**, a shu rounded square with an inner washi border and the kanji 麹 in washi.

## Page

1. **Sticky 72px top bar** (sumi): the hanko plus "KŌJI 麹", and on the right a **noren curtain** nav. That's five hanging shadow-grey panels split by slits, each with kanji (厨房 献立 塔 板前 予約), an English label from 900px up, and a 4px shu hem. On hover a panel turns shu and drops 4px.
2. **Hero** (sumi):
   - A mono kicker, the giant wordmark (h1), a one-sentence lead and a shu "Reserve a seat" button.
   - The **3D dish** in a square.
   - A **vertical 麹** column (washi at ~14%) on desktop.
   - A full-width **shu signage strip** below: `OPEN 18:00–23:00 · 11 COURSES · 12 SEATS · B1–14F · TOWER 1972 · GINZA`.
3. **Kitchen** (béton slab): "Fermentation is the kitchen." Three pillars, each with giant kanji: 麹 Kōji, 味噌 Miso, 塩 Shio. Two photos.
4. **Omakase** (sumi): "Eleven courses. One counter." The **food flight** (below), then a menu card with the hanko, "Autumn menu · ¥38,000", and 11 courses in 5 groups in mono:
   - Sakizuke 先付: 01–02
   - Mukōzuke 向付: 03–04
   - Yakimono 焼物: 05–06
   - Nimono 煮物: 07–09
   - Shokuji 食事: 10–11
5. **Building** (washi): a tower photo, "A tower built to be rebuilt.", the Metabolist idea (a core with plug-in capsules), a facts list.
6. **Chef** (sumi): "Ren Ishikawa.", a pull quote with a 6px shu left rule, photo.
7. **Reserve** (béton): "Twelve seats. Two seatings." A washi form card with these fields:
   - date (not in the past)
   - seating `18:00 / 18:30 / 20:45 / 21:15`
   - guests 1–4, error "Parties of 1–4 only"
   - name
   - email

   On success, show "Your seats are held. A confirmation will follow by email." **Never send a network request.**
8. **Footer** (sumi, shu top rule): the hanko plus wordmark, address, hours, contact.

## 3D dish (hero): procedural, no model files

- `WebGPURenderer` (with `forceWebGL` when `navigator.gpu.requestAdapter()` fails), an alpha canvas, ACES tone mapping at exposure 0.9, soft shadows.
- **Rice:** an ellipsoid bed with noise lumps, plus ~680 **instanced capsule grains** laid tangent to its surface.
- **Fish:** a segmented box slab draped over the rice (`y += 0.34 − 0.4u⁴ − 0.1u²` along its length). Its `MeshPhysicalNodeMaterial` in TSL has:
  - deep red-orange flesh broken by noise;
  - creamy diagonal **fat marbling** from `sin(x·7.5 + z·5 + noise)`;
  - an **amber miso glaze** with a **clearcoat**;
  - caramelised ends.
- **Plate:** a dark speckled stoneware board.
- **Light:** a low warm key from the left, a cool rim, a dim hemisphere, and a faint RoomEnvironment for gloss.
- **Behaviour:**
  - turns slowly (0.15 rad/s);
  - **drag to rotate**, with inertia;
  - pauses off-screen;
  - lazy-loads near the viewport;
  - a static poster image shows first, then the canvas fades in.
- **Fallbacks:** under reduced motion, with no GPU, or after device loss, keep the poster.

## 3D food flight (omakase): scroll-scrubbed video

- Use the [scroll-world](https://github.com/oso95/scroll-world) technique. 9 pre-rendered clips: 5 "dives" that push in on each dish on a concrete plinth, and 4 "connectors" that pull back and glide to the next plinth. Scroll drives `currentTime`.
- **Make the clips seamless:** each connector's first frame is the previous dive's actual last frame, and its last frame is the next dive's actual first frame. Use a first-and-last-frame video model (e.g. Veo in Google Flow), extract frames with ffmpeg, and accept a join at PSNR ≥ 30 dB.
- **Mount the engine mid-page:** put it inside a `position: sticky; top: 72px; height: calc(100vh − 72px); transform: translateZ(0)` box within a track of `(5×1.3 + 4×0.9 + 1) × 100vh`. Feed it a `scrollY` measured from the track's top.
- **Remove any global** `html, body { overflow-x: hidden }`. It breaks `position: sticky`.
- **Copy layer:** per course group, show "先付 · Courses 01, 02", the course names and the details.
- **Seams:** a join that can't be made seamless becomes a cut covered by a **concrete slab wipe**, a board-marked panel sweeping across in 450ms.
- **Until clips exist, or under reduced motion:** show the 5 dish stills as a static sequence with the same copy.

## Images (generate)

The look is 1970s Fujicolor film: grain, slightly faded, raking light, board-marked concrete, heavy stoneware. No modern food styling, no text. Keys:

- `hero-dish-poster`
- `flight-sakizuke`, `flight-mukozuke`, `flight-yakimono`, `flight-nimono`, `flight-shokuji`. These are 16:9 with **identical framing**: the dish centred on a concrete plinth against a flat concrete-grey wall.
- `building-exterior`, `counter`, `chef`, `fermentation`, `stoneware`

Until an image exists, render a labelled board-marked concrete placeholder.

## Quality bar

- Only the food moves. UI motion is limited to colour and press feedback (`scale(0.97)`) at ≤ 260ms with `cubic-bezier(0.23, 1, 0.32, 1)`.
- Hover only on fine pointers. Focus rings are 3px shu.
- No horizontal overflow at 375px. The noren still fits on phones (kanji only).
