# MASTER BUILD PROMPT: KINETIX // ARCHIVE — Cyberpunk Techwear Storefront

## 1. Role & Architecture Objective
Act as a Principal Creative Technologist and Senior Frontend Architect. Build a complete, production-grade, single-page interactive Cyberpunk Technical Apparel Shopify Storefront named **KINETIX // ARCHIVE** (Sub-brand: *Engineered Urban Shell Systems & Modular Techwear*).

**Core Architectural Philosophy:**
- **The Hero Section** is a high-impact visual centerpiece combining \`hero.png\` with real-time HTML5 Canvas rain/hydrophobic particle physics, interactive SVG reticle hotspots, and live CSS/SVG optical shader modes.
- **The Scroll-to-Footer Experience** runs on 100% brutalist, ultra-tactile code: exposed 1px structural hairlines, woven Tyvek care-label dividers, interactive SVG exploded fabric schematics, a character-inventory-style bundle configurator, a biometric sizing calculator, and a fully functional slide-out cart drawer.

---

## 2. Design System, Color Tokens & Typography

### Color Palette (Neon-Noir Cyan, Magenta & Sodium Amber)
\`\`\`css
:root {
  --bg-obsidian: #090B0E;
  --bg-slate: #11161D;
  --bg-panel: rgba(17, 22, 29, 0.82);
  --tyvek-white: #F1F5F9;
  --text-primary: #F8FAFC;
  --text-muted: #94A3B8;
  --border-hairline: rgba(226, 232, 240, 0.14);
  
  /* Cyberpunk Lighting & UI Accents */
  --neon-cyan: #00F0FF;
  --neon-magenta: #FF007F;
  --hazard-amber: #FF7A00;
  --acid-volt: #D4FF00;
}
\`\`\`

### Typography (Load via Google Fonts)
- **Display / Headings:** 'Oswald' or 'Syne', uppercase, tight tracking (\`letter-spacing: 0.08em\`), bold weights (600–700).
- **UI Body:** 'Inter' or 'Manrope' for clean readability.
- **Technical / Telemetry / Pricing / Serial Codes:** 'JetBrains Mono' or 'Roboto Mono' for GSM fabric weights, coordinates, sizing matrices, and stock tickers.

### Brutalist UI Primitives
- Exposed \`1px solid var(--border-hairline)\` structural grid borders across sections.
- Chamfered corners on primary buttons and cards using \`clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))\`.
- Corner crosshair registration marks (\`+\`) at grid intersections.

---

## 3. Section-by-Section Functional Specifications

### SECTION 1: Top System Telemetry Header (Sticky)
- **Left:** Brand wordmark \`KINETIX // ARCHIVE™\` + live system clock (UTC/JST) and simulated coordinates \`35.6762° N, 139.6503° E // SECTOR 09\`.
- **Center:** Navigation anchor links (\`[01 // SHELLS]\`, \`[02 // FABRIC LAB]\`, \`[03 // LOADOUT BUILDER]\`, \`[04 // BIOMETRIC FIT]\`).
- **Right:** Currency selector (\`USD $\` / \`JPY ¥\` / \`EUR €\` — dynamically converts all prices on page) and Cart Trigger button \`[LOADOUT BAG (n)]\` with live item counter and total weight readout.

---

### SECTION 2: The Flagship Hero (\`hero.png\` + Live Code Overlays)
- **Layout:** Full-viewport (\`min-height: 92vh\`), \`16:9\` container using \`hero.png\` as the base layer (\`object-fit: cover\`).
- **Subject Calibration:** The masked figure stands on the right side (\`x: 55%\` to \`88%\`), leaving the left side (\`x: 0%\` to \`48%\`) open for typography and HUD controls.
- **Left-Side Hero Typography & CTAs:**
  - Serial badge: \`DROP 04 // FW-26 ARCHIVE COLLECTION\`
  - Headline: \`ENGINEERED FOR HOSTILE ATMOSPHERES.\`
  - Subhead: \`3-Layer ePTFE Storm Shells, Ballistic Cordura® Exoskeletons, and Modular Fidlock® Carry Systems.\`
  - Primary CTA: \`[EXPLORE ARCHIVE ↓]\` + Secondary CTA: \`[CONFIGURE FULL LOADOUT — 15% OFF]\`
- **Interactive Overlay 1 — Canvas Diagonal Rain & DWR Hydrophobic Physics:**
  - Full-bleed \`<canvas>\` overlay dropping angled rain streaks (\`15deg\` slant) tinted subtly in cyan/magenta.
  - Define an invisible collision bounding box over the figure's shoulders and visor (\`x: 58%\` to \`84%\`, \`y: 18%\` to \`48%\`). When rain particles hit this zone or the user's cursor, shatter them into 3–5 micro-droplets with upward bounce physics to simulate DWR hydrophobic coating.
- **Interactive Overlay 2 — 4 Pinned Garment Reticle Hotspots (Right Side):**
  Render pulsing HUD reticles at these exact percentage coordinates over the figure:
  1. \`(x: 68%, y: 22%)\` — **01 // BALLISTIC RESPIRATOR & HUD VISOR** (\`ACC-10B\` — $195)
  2. \`(x: 64%, y: 40%)\` — **02 // 3L GORE-TEX® PRO STORM SHELL** (\`JKT-01A\` — $680)
  3. \`(x: 72%, y: 52%)\` — **03 // FIDLOCK® V-BUCKLE CHEST RIG** (\`VST-03C\` — $460)
  4. \`(x: 78%, y: 65%)\` — **04 // REFLECTIVE SEAM & AQUAGUARD® ZIPS** (Spec readout)
  - *Interaction:* Clicking or hovering a reticle draws an animated SVG leader line to a floating HUD card displaying waterproof/breathability specs and a 1-click \`+ ADD TO LOADOUT\` button.
- **Interactive Overlay 3 — Optical Shader Pill Switch:**
  - Bottom-left control toggle: \`[OPTICAL // THERMAL // UV-LUMEN]\`.
  - Switching modes applies distinct CSS/SVG filter matrices over the hero container (\`OPTICAL\`: default neon cyan/magenta/amber; \`THERMAL\`: high-contrast infrared heatmap; \`UV-LUMEN\`: dark high-contrast glowing cyan/magenta edge enhancement).

---

### SECTION 3: Tyvek Care-Label Seam Divider & Sticky Filter Bar
- **Tyvek Divider:** A full-width raw bone-white (\`#F1F5F9\`) high-contrast horizontal strip styled like a sewn industrial garment tag with black monospace text, ISO laundry care SVG icons, batch barcode, and \`BATCH_ID: KNX-2026-09 // DO NOT IRON MEMBRANE\`.
- **Sticky Filter & Drop Bar:**
  - Live countdown timer (\`DROP 04 CLOSES IN: 04D : 18H : 42M : 19S\`).
  - Category filter tabs with item counts: \`[ALL ARCHIVE (10)]\`, \`[OUTER SHELLS (03)]\`, \`[PANTS & BOTTOMS (03)]\`, \`[BAGS & FOOTWEAR (04)]\`.
  - Sorting dropdown (\`PRICE: LOW-HIGH\`, \`WEIGHT: LIGHTEST\`, \`WATERPROOF RATING\`).

---

### SECTION 4: The "Modular Loadout" Product Grid (10 Items)
Render a responsive brutalist grid (3–4 columns on desktop, 1px exposed borders) using the exact 10 \`4:5\` portrait studio assets below:

| ID | Image Asset | Code | Title | Category | Price (USD) | Specs (\`Waterproof\` / \`Breathability\` / \`Weight\`) |
|---|---|---|---|---|---|---|
| 1 | \`prod-01.png\` | \`JKT-01A\` | Stealth 3L Gore-Tex Storm Shell | \`shells\` | $680 | \`28,000mm\` / \`RET < 4.5\` / \`640g\` |
| 2 | \`prod-02.png\` | \`JKT-02B\` | Oxide Slate Modular Field Parka | \`shells\` | $740 | \`28,000mm\` / \`RET < 5.0\` / \`820g\` |
| 3 | \`prod-03.png\` | \`VST-03C\` | Ballistic Utility Harness & Liner Vest | \`shells\` | $460 | \`15,000mm\` / \`RET < 6.0\` / \`590g\` |
| 4 | \`prod-04.png\` | \`PNT-04A\` | Articulated Drop-Crotch Cargo Pant | \`bottoms\` | $420 | \`18,000mm\` / \`RET < 5.5\` / \`510g\` |
| 5 | \`prod-05.png\` | \`PNT-05B\` | Cryo-Slate Weatherproof Shell Trouser | \`bottoms\` | $450 | \`28,000mm\` / \`RET < 4.8\` / \`480g\` |
| 6 | \`prod-06.png\` | \`PNT-06C\` | Modular Kilt-Overlay Tactical Pant | \`bottoms\` | $490 | \`20,000mm\` / \`RET < 6.2\` / \`670g\` |
| 7 | \`prod-07.png\` | \`BAG-07A\` | 3A-X-Pac® Messenger Stabilizer Sling | \`gear\` | $290 | \`100% WP\` / \`14L CAP\` / \`430g\` |
| 8 | \`prod-08.png\` | \`BAG-08B\` | Hardshell Exo-Spine 24L Daypack | \`gear\` | $380 | \`100% WP\` / \`24L CAP\` / \`1120g\` |
| 9 | \`prod-09.png\` | \`FTW-09A\` | High-Top Boa® Vibram Exo-Boot | \`gear\` | $520 | \`GORE-TEX\` / \`BOA® LACE\` / \`940g\` |
| 10 | \`prod-10.png\` | \`ACC-10B\` | Acoustic Storm Gaiter & Glove Kit | \`gear\` | $195 | \`WINDSTOP\` / \`CONDUCTIVE\` / \`210g\` |

**Interactive Features Required on Every Card:**
1. **Quick-Size Matrix:** Selectable \`[S] [M] [L] [XL]\` buttons directly on the card. Clicking a size updates a live stock badge (e.g., \`STATUS: 2 UNITS LEFT IN SECTOR\`) and enables the \`+ ADD TO LOADOUT\` button.
2. **Colorway Swatch Pill:** Toggle between \`STEALTH BLACK\`, \`OXIDE SLATE\`, and \`NEON NOIR\` (applies a subtle CSS hue/contrast shift to the product image and updates the variant SKU).
3. **Spec Telemetry Bars:** 3 mini progress bars at the bottom of each card visualizing Waterproof rating, Breathability, and Weight.

---

### SECTION 5: Interactive 3-Layer Fabric Lab (Three.js 3D Exploded-View)
- **Interactive Range Slider (\`[EXPLODE MEMBRANE LAYERS: 0% — 100%]\`):**
  - Scrubbing the slider dynamically separates 3 isometric vector fabric planes in real time:
    1. **Layer 01 (Outer):** \`200D Ballistic Cordura® + DWR Fluorocarbon-Free Coating\` (Deflects external rain/wind).
    2. **Layer 02 (Core):** \`Microporous Black ePTFE Hydrophobic Membrane\` (9 billion pores per sq inch).
    3. **Layer 03 (Inner):** \`Tricot Micro-Grid Thermal & Moisture Wicking Backing\`.
- **Live Particle Simulation:** Animated cyan rain droplets fall from above and bounce off Layer 01, while warm amber internal body-vapor particles rise from below and pass cleanly through all 3 layers.

---

### SECTION 6: The "Loadout Builder" (Character Inventory Bundle Configurator)
- **Layout:** 2-column Cyberpunk RPG Inventory Screen.
- **Left Column (Tactical Silhouette 3D Hologram Rig):** Volumetric Three.js hologram rig with clickable armor zones (\`UPPER SHELL\`, \`LOWER RIG\`, \`CARRY / FOOTWEAR\`).
- **Right Column (3-Slot Selector):**
  - **Slot 01 // Outer Shell:** Choose from \`JKT-01A\`, \`JKT-02B\`, or \`VST-03C\`.
  - **Slot 02 // Lower System:** Choose from \`PNT-04A\`, \`PNT-05B\`, or \`PNT-06C\`.
  - **Slot 03 // Carry & Aux:** Choose from \`BAG-07A\`, \`BAG-08B\`, \`FTW-09A\`, or \`ACC-10B\`.
- **Live Bundle Telemetry:**
  - Calculates combined system weight (e.g., \`TOTAL MASS: 1.58 KG\`), combined waterproof rating, and automatically applies a **15% FULL-SYSTEM BUNDLE DISCOUNT** (\`SAVE $210.00\`).
  - Clicking \`[DEPLOY FULL LOADOUT TO CART]\` adds all 3 selected items (with bundle discount applied) directly into the Cart Drawer and opens it.

---

### SECTION 7: Biometric Fit Calculator
- **Interactive Sliders:**
  - \`HEIGHT (155cm – 205cm)\`
  - \`MASS (45kg – 120kg)\`
  - \`CHEST EXPANSION (85cm – 125cm)\`
  - \`FIT PREFERENCE: [ARTICULATED TACTICAL]\` vs. \`[OVERSIZED SHELL]\`
- **Real-Time Output:** Computes recommended size (\`RECOMMENDED SPEC: SIZE L // CHEST 114CM // SLEEVE 89CM\`) with a button to \`[APPLY SIZE L TO ALL STORE CARDS]\`, which automatically selects that size across the entire product grid.

---

### SECTION 8: Slide-Out Hardware Cart Drawer
- Triggered from the header, hero hotspots, product cards, or Loadout Builder.
- **Features:**
  - Free Orbital Express Shipping progress bar (unlocks at \`$800 USD\`).
  - Item list with thumbnail, selected size, colorway, quantity \`[-]\` \`[+]\` controls, and individual item weight.
  - Promo code terminal input: entering \`CYBER26\` or \`ARCHIVE10\` applies an extra 10% discount with a terminal confirmation message.
  - \`[INITIATE ENCRYPTED CHECKOUT]\` button that triggers a simulated cryptographic order confirmation modal with a generated tracking hash.

---

### SECTION 9: The Woven Tyvek Care-Tag Footer
- Styled like an oversized industrial garment specification label sewn into the bottom of the viewport (\`1px\` dashed stitch border at the top).
- **Interactive NFC Garment Authenticity Verifier:** An input box where users can type any product code (e.g., \`JKT-01A\` or \`KNX-8849\`) and click \`[VERIFY CHIP]\` to run a 1.5s cryptographic scan animation returning \`AUTHENTICATED // GENUINE KINETIX ARCHIVE UNIT — BATCH FW26\`.
- Includes ISO care symbols, encrypted dispatch newsletter signup, collapsible FAQ/Shipping accordions, and monochrome vector payment badges.
