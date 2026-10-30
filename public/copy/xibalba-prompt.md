# Master Prompt: XIBALBA, "Night of the Jade Cenote" — Vertical Descent Scroll

Copy and paste everything below into your AI coding agent. Every coordinate in this specification has been pixel-calibrated directly to your 10 generated artwork files (`scene1.png`–`scene5.png`, `seam1.jpg`–`seam4.jpg`, and `scene-sprites.png`), and includes the complete JavaScript engines at the bottom so the agent does not have to write the canvas renderers or `.jpg` alpha keyer from scratch.

---

## PROMPT FOR AI AGENT

Build a single-page site for a fictional nocturnal equinox ceremony and subterranean botanical reserve called **Xibalba**. Use plain HTML, CSS, and vanilla JavaScript in one single file (`index.html`), with no external libraries.

### 1. What It Is & Structure

- **The structure:** One continuous illustrated vertical descent into a collapsed Yucatan limestone sinkhole (cenote) at midnight: five full-bleed 16:9 flat-vector scenes stacked vertically into a single tall cross-section, joined across every boundary by four 16:9 illustrated limestone-and-root seam bands (`transform: translateY(-50%)`).
- **The art:** Shard-cut geometric shapes, grainy lithograph texture, glowing rim light, deep obsidian-teal (`#040A0E`), bioluminescent jade-cyan (`#5FF2C8`) waterfalls, and warm marigold-copal (`#FFA33E`) firelight.
- **The motion is all code:**
  - The cenote waterfalls flow continuously as additive `mix-blend-mode: screen` canvas streaks.
  - Three streams of molten amber copal resin pour from the serpent spouts in Scene 4.
  - Cenote mist breathes and copal braziers, torches, and lotus lanterns flicker.
  - Bioluminescent spores, cavern motes, wheel spray, resin bubbles, and moonlight water-shimmer drift on percentage-boxed canvases.
  - Glowing jade Morpho-spirit sprites bob and shy away from the cursor, and cave bats flap across the cavern skies.
  - Automatic `.jpg` black-key alpha transparency pre-processes `seam1.jpg`–`seam4.jpg` and `scene-sprites.png` on load so black outer backgrounds become 100% transparent alpha.
  - The page scrolls with eased exponential momentum (`translate3d`).
  - The hero title rises letter by letter on load and spreads apart with parallax on scroll; section copy rises line by line out of overflow masks.
  - A warm "copal torch" glow (`.lamp`) follows the cursor.

---

### 2. Media Assets & Calibrated Sprite Sheet Crops

Place the 10 image files in the same directory (or configure via CSS variables):

| Asset | File Path | Native Aspect / Resolution |
|---|---|---|
| Scene 1, hero (Jungle Rim, Eclipsed Pyramid, Upper & Lower Falls) | `scene1.png` | `2688 × 1520` (`16:9`) |
| Scene 2, orchid vault (Central Falls, Obsidian Mirror, 6 Orchid Cylinders) | `scene2.png` | `2688 × 1520` (`16:9`) |
| Scene 3, calendar wheel (Left Falls, Mayan Wheel, 2 Codex Pedestals) | `scene3.png` | `2688 × 1520` (`16:9`) |
| Scene 4, copal foundry (Right Falls, Serpent Cauldron, 3 Lava Streams) | `scene4.png` | `2688 × 1520` (`16:9`) |
| Scene 5, finale (Cavern Arch, Low Moon & Pillar, 15 Floating Lanterns) | `scene5.png` | `2688 × 1520` (`16:9`) |
| Seam 1 (`Hero → Story`: Jungle boulders & stelae over cavern roots, center falls) | `seam1.jpg` | `16:9` (auto-keyed transparent) |
| Seam 2 (`Story → Rites`: Temple flagstones over timber arches, left falls) | `seam2.jpg` | `16:9` (auto-keyed transparent) |
| Seam 3 (`Rites → Night`: Drainage grates over bronze cogs & serpent pipe collar) | `seam3.jpg` | `16:9` (auto-keyed transparent) |
| Seam 4 (`Night → Finale`: Molten resin cracks & stone lantern over teal stalactites) | `seam4.jpg` | `16:9` (auto-keyed transparent) |
| Sprite sheet (4 Jade Morpho Spirits on top row, 2 Cave Bats on bottom row) | `scene-sprites.png` | `2400 × 1792` (normalized to `1024 × 765`) |

#### Using the Sprite Sheet (`scene-sprites.png`)
With the sheet normalized to `1024 × 765` and a crop of `[x, y, w, h]`:
- `background-size: calc(1024 / w * 100%) calc(765 / h * 100%)`
- `background-position: calc(x / (1024 - w) * 100%) calc(y / (765 - h) * 100%)`
- `aspect-ratio: w / h`

| Sprite | Crop `[x, y, w, h]` (at `1024 × 765`) |
|---|---|
| `spirit1`: drifting morpho with long left ribbon tail | `15, 42, 310, 260` |
| `spirit2`: symmetrical spread-wing jade moth | `358, 55, 235, 225` |
| `spirit3`: morpho with curled spiral tail | `624, 48, 178, 292` |
| `spirit4`: tall vertical ascending spirit | `832, 24, 145, 520` |
| `bat`, wings up | `45, 405, 280, 285` |
| `bat`, wings down | `358, 485, 435, 185` |

Spirits carry `filter: drop-shadow(0 0 10px rgba(95, 242, 200, .48))`.

---

### 3. Fonts & Design Tokens

Load `Oswald` (weights 300–700) and `Inter` (weights 400, 500, 600) from Google Fonts.

| Token | Value |
|---|---|
| `--night` (page and theme colour) | `#040A0E` |
| `--ink` | `#EEFAF6` |
| `--soft` (body copy) | `rgba(218, 242, 234, .78)` |
| `--ember` (button hover) | `#FFA33E` |
| `--ease` | `cubic-bezier(.2,.8,.2,1)` |
| `--artH` (scene height) | `calc(100vw * 1520 / 2688)` |

---

### 4. Page Structure & Navigation

- **`<header class="nav">`:** fixed, `z-index: 50`, height `64px`, padding `0 2.2vw`, grid `1fr auto 1fr`, top-down scrim `linear-gradient(rgba(4,10,14,.62), transparent)`.
  - **Left** (`5.6vw` apart): `"The Cenote"` (`#story`), `"The Calendar"` (`#rites`), `"Pilgrims"` (`#night`).
  - **Centre (Logo):** `26 × 24` SVG. Solid white triangle (`13,1 → 25,23 → 1,23`) with an eclipse crescent notch: a `3.4px` `--night` circle at `(13, 15.2)` overlapped by a `3px` white circle at `(14.4, 14.4)`.
  - **Right:** `"Sanctuary"` and `"Codex"` (both link to `#finale`), then a `"Passages"` bordered CTA box (`1px solid rgba(238,250,246,.6)`, padding `9px 14px`, `2px` radius, filling white with `--night` text on hover).
  - **On load:** slides down from `translateY(-100%)` over `900ms` with a `500ms` delay.
- **`#scroller`:** `position: fixed; top: 0; left: 0; width: 100%; will-change: transform`. Holds the 5 `<section class="scene">` elements with a `<div class="seam">` between each pair.
- **`.lamp`:** Fixed `520px` cursor light circle (`radial-gradient(closest-side, rgba(255,170,80,.15), rgba(95,242,200,.05) 55%, transparent)`, `mix-blend-mode: screen`, `pointer-events: none`, `z-index: 40`).

---

### 5. The Seams (`aspect-ratio: 16 / 9`)

- **`.seam`:** `position: relative; height: 0; z-index: 10; pointer-events: none`.
- **`.band`:** `position: absolute; left: 0; top: 0; width: 100vw; aspect-ratio: 16 / 9; transform: translateY(-50%)`.
- Inside `.band`, the keyed `<img class="seam-img">` sits at `z-index: 1`, and the `canvas.fall` sits at **`z-index: 2` (`mix-blend-mode: screen`)** directly over the painted waterfall in the rock gap so animated streaks flow seamlessly across the join:

| Seam | Between | `--focus` | Falls Canvas (`left / top / width / height` % of `.band`) | Extra Seam Glow |
|---|---|---|---|---|
| **1** | Hero → The Cenote | `50` | `48.8 / 50 / 6.0 / 50`, speed `1` | Warm pots at `12.8/31.5 (3.2)` & `88.2/31.5 (3.2)` |
| **2** | The Cenote → The Calendar | `30` | `25.5 / 27 / 9.2 / 73`, speed `1` | Warm brazier at `83.8/19.5 (4.5)`, candles at `19.8/21 (3)` & `45.2/20.5 (3.5)` |
| **3** | The Calendar → Plan Your Descent | `75` | `72.8 / 36 / 6.2 / 64`, speed `1` | Cold puddles at `29.5/22.5 (10)` & `90.5/22.5 (7)` |
| **4** | Plan Your Descent → Finale | `50` | `none` | Warm stone lantern at `67.2/19.0 (6.5)`, resin cracks at `45.5/30.5 (8)` |

---

### 6. The Five Scenes & Calibrated Overlay Coordinates

All positions (`left / top`) and dimensions (`width / height`) are in `%` of `.art`. Every `.glow`, `.mist`, and `.moonglow` is centred on its coordinate via `transform: translate(-50%, -50%)`.

#### Scene 1 — Hero: `"XIBALBA"` (`#top`, `--focus: 50`)
- **`.moonglow`:** `50.0 / 18.2`, width `14%`. Ring halo (`transparent 58%`, `rgba(255,230,165,.36) 68%`, `rgba(95,242,200,.14) 85%`), breathes over `6s`.
- **Upper falls canvas** (`ghost`, speed `1`): `47.5 / 55.5`, `4.8 × 26`.
- **Mist:** `50.0 / 80.5`, `20 × 8`.
- **Lower cascade canvas** (`ghost`, speed `1.15`): `39.5 / 82.0`, `21.0 × 20`.
- **12 Warm copal-brazier `.glow`s:**
  - Left cliff: `8.1/38.2 (4.5)`, `15.5/45.8 (4.0)`, `23.5/49.3 (3.6)`, `28.3/57.5 (3.2)`, `23.8/67.2 (4.2)`, `32.5/69.2 (3.4)`.
  - Right cliff: `90.8/37.5 (4.5)`, `83.8/45.8 (4.0)`, `76.5/49.3 (3.6)`, `71.4/57.5 (3.2)`, `75.2/67.2 (4.2)`, `67.2/69.2 (3.4)`.
- **Wisp canvas:** `70` rising jade spores (`data-kind="wisp"`).
- **Sprites:** `spirit1` at `21/28 (4.2%)`, `spirit2` at `78/22 (3.4%)`, `spirit4` at `64/42 (2.8%)`, `spirit3` at `36/44 (2.4%)`, and `4` bats crossing `y: 8–32%`.
- **Hero Copy:** Centred at `top: calc(var(--artH) * .055)`, `z-index: 6`:
  - `h1`: `"XIBALBA"`, split into `<span>` per letter, Oswald 500, `clamp(46px, 6.4vw, 124px)`, letter-spacing `calc(var(--ls, .42em) + var(--lsx, 0em))`, `text-shadow: 0 0 40px rgba(70,225,190,.45)`.
  - `.sub`: `"NIGHT OF THE JADE CENOTE"`, Oswald 500, `clamp(12px, 1.18vw, 22px)`, letter-spacing `.62em`, placed at `top: calc(var(--artH) * .335)` on the dark pyramid slope below the eclipse.

#### Scene 2 — `"The Cenote"` (`#story`, `--focus: 52`)
- **Falls canvas** (`ghost`, speed `.95`): `47.0 / 10.0`, `12.5 × 82`.
- **Mist:** `53.0 / 88.5`, `30 × 12`.
- **Cold `.glow.cold`s (jade-cyan):**
  - Obsidian altar mirror: `26.5 / 64.5` (width `6.5%`).
  - 6 Ghost-orchid cylinders in the right pillar: `73.2/29.0 (4.8)`, `86.0/34.8 (4.8)`, `75.2/50.0 (4.2)`, `79.5/49.2 (4.8)`, `71.8/58.8 (4.8)`, `86.0/61.2 (4.8)`.
- **Warm `.glow`s:** `7.8/77.5 (3.8)`, `17.0/81.0 (3.8)`, `92.5/81.5 (5.5)`.
- **Mote canvas:** `50` particles (`data-kind="mote"`).
- **Sprite:** `spirit4` at `38/24 (2.6%)`.
- **Copy** at `left: 6.5%; top: 22%; width: 34%`:
  - `h2`: `"The Cenote"`
  - `.rule`
  - Paragraph 1: `"Every autumn equinox the subterranean springs of Xibalba run luminous jade. For one night the canyon rim lights its copal braziers, the root-carved steps open, and the forest spirits descend to the water."`
  - Paragraph 2: `"We have kept the descent for three hundred years: a walk through the orchid vaults, the water-calendar, and the resin kilns, ending where the underground river meets the moon."`
  - Button: `"Read the codex"`

#### Scene 3 — `"The Calendar"` (`#rites`, `--focus: 30`)
- **Upper falls canvas** (`ghost`, speed `1.05`): `23.5 / 3.0`, `8.0 × 30` (above the wheel).
- **Wheel cascade canvas** (`ghost`, speed `1.1`): `18.5 / 33.0`, `6.0 × 62` (shearing down the left face of the stone wheel).
- **Mist:** `27.5 / 32.0`, `18 × 9`.
- **5 Warm wheel-brazier `.glow`s** (`width: 4.4%`): `13.8/36.2`, `43.8/36.5`, `50.0/55.4`, `8.2/69.2`, `48.2/79.8`.
- **2 Cold jade-codex `.glow.cold`s** (`width: 8.5%`): `64.2/61.5` and `89.0/61.5`.
- **3 Warm floor-candle `.glow`s** (`width: 2.6%`): `58.4/81.8`, `76.8/81.2`, `95.4/82.2`.
- **Spray canvas:** `60` particles (`data-kind="spray"`, box `data-x="18" data-w="22" data-y="22" data-h="20"`).
- **Copy** at `left: 54%; top: 18%; width: 40%`:
  - `h2`: `"The Calendar"`
  - `.rule`
  - `h3`: `"The Canopy Walk."`
  - Paragraph 1: `"At dusk the procession leaves the pyramid steps and follows the jade cascade down into the limestone chasm. Bring a clay copal censer, or borrow one of ours at the rim."`
  - Paragraph 2: `"Initiates lead, the elders walk last, and nobody looks back until the water-drums stop."`
  - `h3`: `"The Turning Stone."`
  - Paragraph 3: `"Below the upper falls the carved Mayan wheel turns all night. Press a wish onto a beaten bark strip, wedge it into a stone tooth, and let the current carry it round to midnight."`

#### Scene 4 — `"Plan Your Descent"` (`#night`, `--focus: 75`)
- **Falls canvas** (`ghost`, speed `1`): `68.0 / 0.0`, `14.5 × 36` (pouring into the carved cauldron).
- **Three molten copal resin canvases** (`lava`, speeds `.55 / .6 / .5`):
  - Left serpent spout: `64.0 / 59.5`, `1.8 × 32`.
  - Centre serpent spout: `75.0 / 59.5`, `1.8 × 32`.
  - Right serpent spout: `85.8 / 59.5`, `1.8 × 32`.
- **Warm `.glow`s:** Floor pool at `74.5/91.5 (26)`, left resin vat at `25.2/72.5 (14)`, floor braziers at `14.5/83.2 (5.0)` and `40.2/77.2 (5.0)`.
- **Cold `.glow.cold`:** `75.0 / 35.5 (18)` where the jade falls meet the cauldron rim.
- **Bubble canvas:** `22` particles (`data-kind="bubble"`, box `data-x="60" data-w="29" data-y="76" data-h="19"`).
- **Copy** at `left: 6.5%; top: 20%; width: 38%`:
  - `h2`: `"Plan Your Descent"`
  - `.rule`
  - `h3`: `"Rim Gates at Six."`
  - Paragraph 1: `"The stone gates open at 18:00 on the Equinox. The walk takes ninety minutes down the steps, and the foundry halls stay open until three, serving spiced cacao, honey balché, and roasted squash."`
  - `h3`: `"Midnight at the Cauldron."`
  - Paragraph 2: `"At the twelfth conch blast the three serpent conduits are unsealed and every lotus lantern is carried down to the subterranean river. Stay for it."`

#### Scene 5 — Finale (`#finale`, `--focus: 35`)
- **`.moonglow`:** `29.0 / 56.8`, width `14%`.
- **Shimmer canvas:** `90` glints (`data-kind="shimmer"`, box `data-x="25" data-w="8" data-y="66" data-h="26"`).
- **15 Warm floating lotus-lantern `.glow`s:** `34.0/84.8 (2.8)`, `37.6/90.2 (3.6)`, `38.0/78.5 (2.0)`, `41.8/81.5 (2.4)`, `43.6/78.5 (2.0)`, `44.0/85.8 (3.0)`, `46.4/80.2 (2.2)`, `47.8/84.2 (2.8)`, `51.8/88.5 (3.4)`, `52.0/81.2 (2.4)`, `55.6/84.5 (2.8)`, `59.2/81.2 (2.4)`, `61.2/91.5 (3.8)`, `62.6/84.5 (2.8)`, `68.8/85.8 (3.0)`.
- **2 Large cliff-brazier `.glow`s:** `12.2/56.5 (9.0)` and `91.2/73.5 (11.0)`.
- **Sprites:** `spirit2` at `66/26 (3%)`, `spirit1` at `22/36 (2.6%)`, and `3` bats in `y: 20–38%`.
- **Copy** centred (`left: 50%; transform: translateX(-50%); top: 24%; width: 60%; text-align: center`):
  - `h2`: `"Meet us where the river opens."`, `clamp(34px, 4.4vw, 78px)`.
  - `.rule` (centred).
  - Buttons: `"Reserve passage"` (solid white) and `"View descent map"` (ghost button).

---

## STARTER CODE FOR THE AI AGENT (DO NOT START FROM SCRATCH)

Use the following battle-tested JavaScript engines directly inside your single-file `index.html` implementation.

### 1. Automatic `.jpg` / `.png` Black-Background Alpha Keyer
Because `seam1.jpg`–`seam4.jpg` and `scene-sprites.png` have solid black (`#000000`) outer backgrounds instead of alpha channels, run this canvas pre-processor on load so the seams and sprites composite with true alpha transparency:

```javascript
/**
 * Converts solid black outer backgrounds on seam JPEGs and sprite sheets into true alpha transparency.
 * For seams ('seam'), flood-fills/keys from the top and bottom edges so interior dark rock shadows stay intact.
 * For sprites ('sprite'), keys out near-black pixels smoothly using luminance ramp.
 */
function keyBlackBackgroundToAlpha(imgUrl, mode = 'seam') {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const c = document.createElement('canvas');
      const w = (c.width = img.naturalWidth);
      const h = (c.height = img.naturalHeight);
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, w, h);
      const d = imgData.data;

      if (mode === 'seam') {
        // Scan from top down and bottom up in each column until hitting non-black rock border
        const threshold = 18;
        for (let x = 0; x < w; x++) {
          // Top-down clear
          for (let y = 0; y < h * 0.45; y++) {
            const idx = (y * w + x) * 4;
            const lum = d[idx] + d[idx + 1] + d[idx + 2];
            if (lum < threshold) {
              d[idx + 3] = 0;
            } else {
              // Feather 2px edge
              d[idx + 3] = Math.min(255, (lum - threshold) * 8);
              break;
            }
          }
          // Bottom-up clear
          for (let y = h - 1; y > h * 0.5; y--) {
            const idx = (y * w + x) * 4;
            const lum = d[idx] + d[idx + 1] + d[idx + 2];
            if (lum < threshold) {
              d[idx + 3] = 0;
            } else {
              d[idx + 3] = Math.min(255, (lum - threshold) * 8);
              break;
            }
          }
        }
      } else {
        // Sprite sheet keyer: smooth luminance alpha ramp for glowing spirits & rim-lit bats
        for (let i = 0; i < d.length; i += 4) {
          const maxCh = Math.max(d[i], d[i + 1], d[i + 2]);
          if (maxCh < 12) {
            d[i + 3] = 0;
          } else if (maxCh < 36) {
            d[i + 3] = Math.round(((maxCh - 12) / 24) * 255);
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      resolve(c.toDataURL('image/png'));
    };
    img.onerror = () => resolve(imgUrl);
    img.src = imgUrl;
  });
}
```

### 2. The Waterfall & Molten Copal Streak Renderer (`canvas.fall`)

```javascript
function makeStreakSprite(stops) {
  const c = document.createElement('canvas');
  c.width = 8;
  c.height = 160;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 0, 160);
  stops.forEach(([pos, col]) => grad.addColorStop(pos, col));
  g.fillStyle = grad;
  g.fillRect(0, 0, 8, 160);
  return c;
}

const FALL_SPRITES = {
  ghost: [
    makeStreakSprite([
      [0, 'rgba(140,255,225,0)'],
      [0.35, 'rgba(185,255,240,.95)'],
      [1, 'rgba(70,210,190,0)'],
    ]),
    makeStreakSprite([
      [0, 'rgba(80,220,200,0)'],
      [0.5, 'rgba(120,245,225,.8)'],
      [1, 'rgba(50,175,165,0)'],
    ]),
  ],
  lava: [
    makeStreakSprite([
      [0, 'rgba(255,190,80,0)'],
      [0.4, 'rgba(255,238,155,1)'],
      [1, 'rgba(255,120,30,0)'],
    ]),
    makeStreakSprite([
      [0, 'rgba(255,120,30,0)'],
      [0.5, 'rgba(255,155,50,.9)'],
      [1, 'rgba(255,80,20,0)'],
    ]),
  ],
};

function initFallsCanvases() {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  const instances = [];

  document.querySelectorAll('canvas.fall').forEach((canvas) => {
    const kind = canvas.dataset.kind || 'ghost';
    const speedMult = parseFloat(canvas.dataset.speed || '1');
    const isSeam = canvas.classList.contains('seam-fall');
    const ctx = canvas.getContext('2d');
    let w = 0,
      h = 0,
      streaks = [];

    const resize = () => {
      w = canvas.offsetWidth || 100;
      h = canvas.offsetHeight || 200;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = kind === 'ghost' ? Math.round(w / 2.2) * 2 : Math.round(w / 3) * 3;
      streaks = Array.from({ length: count }, () => {
        const xNorm = kind === 'ghost' ? Math.random() : 0.25 + Math.random() * 0.5;
        return {
          x: xNorm * w,
          xNorm,
          sw: kind === 'ghost' ? 0.8 + Math.random() * 3.2 : 1 + Math.random() * 2.2,
          len: kind === 'ghost' ? 60 + Math.random() * 220 : 30 + Math.random() * 70,
          v: (kind === 'ghost' ? 420 + Math.random() * 340 : 195 + Math.random() * 155) * speedMult,
          alpha: 0.18 + Math.random() * 0.55,
          phase: Math.random() * 1000,
          sprite: FALL_SPRITES[kind][Math.random() < 0.45 ? 0 : 1],
        };
      });
    };

    resize();
    instances.push({ canvas, ctx, kind, isSeam, resize, getState: () => ({ w, h, streaks }) });
  });

  window.addEventListener('resize', () => instances.forEach((i) => i.resize()));

  return function renderFalls(t) {
    const vh = window.innerHeight;
    instances.forEach(({ canvas, ctx, kind, getState }) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom < -50 || rect.top > vh + 50) return;

      const { w, h, streaks } = getState();
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i];
        const span = h + s.len;
        const y = ((t * s.v + s.phase) % span) - s.len;
        const edgeDim = kind === 'ghost' ? 1 - Math.pow(Math.abs(s.xNorm - 0.5) * 2, 2) * 0.6 : 1;
        ctx.globalAlpha = s.alpha * edgeDim;
        ctx.drawImage(s.sprite, s.x - s.sw * 0.5, y, s.sw, s.len);
        if (y + span < h) {
          ctx.drawImage(s.sprite, s.x - s.sw * 0.5, y + span, s.sw, s.len);
        }
      }
    });
  };
}
```

### 3. Spirit Repulsion & Bat Flapping Engine

```javascript
function initSprites() {
  const spirits = Array.from(document.querySelectorAll('.sprite.spirit')).map((el) => ({
    el,
    phase: Math.random() * Math.PI * 2,
    ox: 0,
    oy: 0,
  }));

  const bats = Array.from(document.querySelectorAll('.sprite.bat')).map((el) => ({
    el,
    y0: parseFloat(el.dataset.y || '20'),
    dur: 9 + Math.random() * 7,
    offset: Math.random() * 10,
    amp: 1 + Math.random() * 3,
    flapRate: 8 + Math.random() * 4,
  }));

  let mouseX = -9999,
    mouseY = -9999;
  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  return function updateSprites(t, dt) {
    const damp = 1 - Math.exp(-3 * dt);

    spirits.forEach((s) => {
      const rect = s.el.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.5 - s.ox;
      const cy = rect.top + rect.height * 0.5 - s.oy;
      const dx = cx - mouseX;
      const dy = cy - mouseY;
      const dist = Math.hypot(dx, dy);

      let tx = 0,
        ty = 0;
      if (dist < 260 && dist > 0.1) {
        const push = Math.pow(1 - dist / 260, 1.5) * 90;
        tx = (dx / dist) * push;
        ty = (dy / dist) * push;
      }

      s.ox += (tx - s.ox) * damp;
      s.oy += (ty - s.oy) * damp;

      const artW = s.el.parentElement.offsetWidth || window.innerWidth;
      const artH = s.el.parentElement.offsetHeight || window.innerHeight;
      const wx = Math.sin(0.35 * t + s.phase) * 0.012 * artW;
      const wy = Math.sin(0.9 * t + s.phase) * 0.014 * artH;
      const rot = Math.sin(0.7 * t + s.phase) * 6 + s.ox * 0.05;

      s.el.style.transform = `translate3d(calc(-50% + ${wx + s.ox}px), calc(-50% + ${wy + s.oy}px), 0) rotate(${rot.toFixed(2)}deg)`;
    });

    bats.forEach((b) => {
      const p = ((t / b.dur) + b.offset) % 1;
      const xPct = -8 + p * 116;
      const yPct = b.y0 + Math.sin(p * 9 + b.offset * 6) * b.amp;
      b.el.style.left = `${xPct.toFixed(2)}%`;
      b.el.style.top = `${yPct.toFixed(2)}%`;
      const isDown = Math.floor(t * b.flapRate) % 2 === 1;
      b.el.classList.toggle('down', isDown);
    });
  };
}
```