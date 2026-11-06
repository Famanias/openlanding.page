# Prompt: rebuild "Khora" (subterranean thermal baths & biospheric architecture carved from volcanic basalt)

Paste everything below the line into your AI coding agent.

---

Build a landing page in **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4** at `/khora` for a fictional architectural sanctuary and geothermal bath complex called **KHORA**: subterranean thermal pools, mineral steam chambers, and biospheric retreats carved directly into volcanic basalt in the Reykjanes rift valley of Iceland. Slogan: *"Sanctuary carved from the earth's heat."* / *"The architecture of deep time."* Install `npm i next react react-dom lenis three @types/three`. Read the installed Next docs before using any API. Keep the whole copy unit inside `src/app/(khora)/`, importing only npm packages and files from that folder.

**Reference (look, pacing, and motion vocabulary; build your own brand):** clearwater.london and learnwithzero.com: one held hero that pushes through a geometric geological aperture into subterranean basalt darkness, kinetic 3D typography that un-skews and de-blurs as fonts settle, an endless drifting horizontal ring of monolithic chamber cards with inertia compression, a pinned 280svh multi-step thermal descent with exploding isometric basalt geometry, an interactive 3D WebGL thermal mist canvas with 3D-to-2D projected raycast hot-spots, and a floating glass dock navigation bar. Every name, dimension, mineral profile, architectural blueprint, and copy line here is original.

**The central idea: a vertical geological descent.** As the visitor scrolls, they descend through the volcanic strata: from the cold mossy surface (0m) through the porous basalt mist chambers (−14m), the mineral silica baths (−38m), down to the magma bedrock vaults (−84m). The page header and dock track real-time depth, water temperature, and mineral salinity.

Mood: monolithic, volcanic, serene, tactile, elemental, quiet luxury. Use geological and architectural vocabulary plainly: basalt, caldera, silica, geothermal baseline, bedrock, thermal strata, mist veil, aperture, monolith, fissure. Specific numbers only: 38.4°C baseline, −42m subterranean depth, pH 7.8 mineral spring, 450-year geothermal cycle, 14 suites, 840 hPa chamber pressure.

---

## Brand & Visual System

- **Palette (eight colours; tints only via `color-mix()`, registered in `scripts/templates.config.ts`):** 
  - `moss` `#E8EAE3` (surface sky, pale lichen page background)
  - `paper` `#F7F8F5` (cards, floating tags, glass highlights)
  - `basalt` `#0F1012` (subterranean darkness, carved rock, primary ink)
  - `obsidian` `#17181C` (monolith cards, deep pool containers)
  - `ash` `#63666E` (technical readouts, secondary annotations)
  - `magma` `#E25822` (geothermal heat indicator, active temperature accents, cursor fire)
  - `silica` `#7FA4A6` (mineral water wash, cold plunge highlight, pool waterline)
  - `steam` `#D2D9D9` (atmospheric mist, raycast button text, borders).
- **Typography (`next/font/google`, distinct CSS variables):** 
  - Editorial Serif (`--font-kh-serif`, Cormorant Garamond or Ryhmes Display equivalent, weight 300/400) for contemplative headlines, Latin mineral names, and philosophical statements;
  - Monolithic Sans (`--font-kh-sans`, Neue Montreal or Inter, weight 400/500, letter-spacing −0.035em) for titles, chamber names, and navigation;
  - Technical Mono (`--font-kh-mono`, JetBrains Mono or Google Sans Code, 11–12px uppercase) for depth odometers, Celsius readouts, chamber coordinates, and architectural elevations.
- **Logo:** A monolithic basalt prism cleaved by a diagonal geothermal fissure, SVG in a 48 viewBox (`M12 4L36 4L42 22L24 44L6 22Z` with an intersecting fissure path `M24 4L22 24L26 44`), accompanied by the tracked uppercase wordmark "KHORA" (weight 450, tracking 0.24em). Ship `brand/Logo.tsx`, `icon.svg`, and `opengraph-image.tsx`.
- **Signature Details:** 
  - Dynamic Subterranean Depth Odometer (measures scroll progress mapped to `0m` down to `−84m`);
  - Geothermal Status readout (`Reykjanes Rift · 63°52′N 22°26′W · 38.4°C`);
  - Volcanic steam particulate canvas with cursor-reactive raymarching;
  - Pinned isometric basalt blocks that deconstruct and scatter on scroll exit;
  - Magnetic pill buttons with tactile label drag;
  - Custom fluid cursor with scroll orientation arrow.

---

## Page Architecture & Sections

### 1. Top Bar (Fixed)
- Brand mark & lockup on left; live geothermal readout right: `DEPTH: -00M` · `38.4°C` · `CALDERA QUIET`.
- Seamless color inversion: flips from `basalt` ink to `paper` when the subterranean stratum opens.
- Right CTA: Magnetic button "Request Bathing Sanctuary" with arrow icon.

### 2. Hero (`#surface`, held for 320svh, sticky surface floor)
- Background: Pale moss-tinted atmosphere with faint volcanic dust noise (`canvas.gl`).
- Eyebrow: `[ REYKJANES VOLCANIC RIFT · ICELAND ]` in mono tracking 0.2em.
- Headline: 4 asymmetric rows staggered horizontally:
  - Line 1: `Carved from`
  - Line 2: `the earth's heat`
  - Line 3: `into stone`
  - Line 4: `and silence`
- Headline reveal: Words enter with 3D perspective kinetic tilt:
  `transformOrigin: "50% 50%", yPercent: 100 -> 0, skewY: -5deg -> 0deg, rotateY: 10deg -> 0deg, scale: 1.15 -> 1.0, filter: blur(8px) -> blur(0px), opacity: 0 -> 1` over 1.89s with `Expo.easeInOut`.
- Subtitle: Lines split and revealed from bottom masks (`translateY(115%) -> 0%`).
- Center Fissure Aperture: A geometric basalt crevasse in the center of the hero stage. As the user scrubs through 100svh to 240svh, the dark subterranean house clips outward via `clip-path: polygon(...)` from a narrow 2rem slit to cover 100% of the viewport, plunging the page from surface pale to basalt black.

### 3. The Thermal Chambers (`#chambers`, basalt black, 100svh)
- Header: *"Five thermal sanctuaries carved along the geothermal fissure."*
- Filter chips: `All Chambers`, `Porous Basalt`, `Silica Lagoon`, `Magma Vault`, `Cold Rift`. Active pill glides underneath with a smooth elastic spring.
- **Endless Monolithic Drifting Ring:**
  - 8 tall architectural monolith cards drifting continuously right to left (−32 px/s).
  - Mathematical loop: `loopX(i, n, slot, offset) = wrap(i * slot + offset + slot, n * slot) - slot`.
  - Perspective arc: each card lifts and turns toward the user: `y = 32 * d^2`, `rotateY = 6deg * d`, `scale = 1 - 0.04 * d^2`.
  - Native scroll pulling: page scroll scrubs the ring forward (+0.35px per scroll px).
  - Physics: 1:1 mouse drag with inertia fling and momentum card squashing (`scaleY: 0.95`, image counter-scale `scale: 1.05`).
  - Hovering a card glides ring to a soft halt and sets its opacity to `1.0` while dimming sibling cards to `0.25`.
  - Cards:
    1. *The Obsidian Basin* (−18m · 39.2°C · Raw Black Glass)
    2. *Silica Steam Cavern* (−26m · 41.5°C · High Mineral Density)
    3. *The Basalt Labyrinth* (−34m · 37.8°C · Acoustic Isolation)
    4. *Magma Rift Bath* (−52m · 43.0°C · Geothermal Bedrock)
    5. *Glacial Plunge Vault* (−12m · 9.4°C · Ice Fissure Runoff)
  - Card 3D tilt: cursor movement on each card calculates `rotateX`, `rotateY` with lerp smoothing factor `0.12`.

### 4. The Descent: Three Depths of Heat (`#strata`, pinned for 280svh)
- Pinned stage: `#strataSticky` pins to top of screen for 280svh.
- Character-by-character scroll progress text reveal: *"Human bodies immersed in mineral waters filtered through four hundred years of volcanic rock."* Characters fade from muted slate (`#63666E`) to bright steam white (`#FFFFFF`) driven directly by normalized scroll progress.
- Three synchronized depth layers:
  - **Phase 1 (0%–33%):** Porous Basalt Layer (−14m). Card 1 and depth readout fade in; thermal mist shader intensifies.
  - **Phase 2 (33%–66%):** Mineral Silica Springs (−38m). Card 2 fades in; Card 1 dims to 0.2; water tone shifts to mineral cyan.
  - **Phase 3 (66%–100%):** Magma Bedrock Vault (−84m). Card 3 fades in; Card 2 dims to 0.2; magma glow accents emerge.
- **Deconstruction Exit:** As `#architecture` approaches, the pinned chamber container clips with `clip-path: inset(0% 6rem 50rem round 0 0 2rem 2rem)`, and 8 floating isometric basalt cubes (`.cube._1` through `.cube._8`) explode outward to calculated margin offsets.

### 5. Architectural 3D Projection Canvas (`#architecture`, 120svh)
- Dedicated Three.js WebGL canvas synchronized with page scroll and camera projection.
- **Geothermal Mist Shader:** Raymarched signed distance field (SDF) procedural fog with mouse boolean blending (cursor pushes mist away).
- **Subterranean Model:** Three.js GLTF architectural massing of the subterranean chambers.
- **3D-to-2D Projected Hotspots:**
  - 4 invisible 3D locator boxes in the scene (`chambers A, B, C, D`) projected via `loc.getWorldPosition(v).project(camera)` to set exact CSS translations `style="transform: translateX(...) translateY(...)"` on HTML magnetic buttons.
  - Three.js Raycaster detects mouse hovering over 3D hot-spots and highlights the matching DOM button with `.gl-raycast-active`.

### 6. Geothermal Timeline (`#chronology`, 100svh)
- Draggable timeline: *450-Year Rainwater Filtration Cycle*.
- GSAP `Draggable` with inertia physics.
- Custom Drag Cursor: circular `#dragCursor` follows mouse with smooth lerp (`0.17` ease), scales to `0.8` on mousedown, and reveals an SVG drag arrow with an inner label.
- Scale inertia: cards compress horizontally in real time based on fling velocity.

### 7. Private Bathing Residency & Inquiry (`#inquiry`, 120svh)
- Background shifts to deep volcanic night (`#0F1012`).
- Kinetic headline: *"Enter the deep earth."*
- Interactive Inquiry Call Sheet:
  - Sanctuary suite selection (Obsidian Suite, Caldera Residence, Magma Vault).
  - Real-time in-memory validation (full name, email, guest count 1–4, target lunar season).
  - Shakes once on error; on valid submit, rolls into bouncing dots for 800ms, then slides up a signed architectural voucher with a unique reservation hash (`KH-XXXX-IS`) and a stamped wax seal. Zero network calls.

### 8. Floating Glass Dock (Fixed, Bottom Center)
- Minimalist glass pill with blurred backdrop (`backdrop-blur-md`).
- Contains:
  - Live Depth indicator (`-42m`);
  - Chamber quick-jump drawer toggle;
  - Private Inquiry button.
- A 1px hairline across the top of the dock fills horizontally from 0% to 100% in exact synchronization with page scroll progress.

---

## Technical Motion & Physics Contract

- **Scroll Engine:**
  ```typescript
  // Lenis instance bound to GSAP ticker — zero frame desync
  const lenis = new Lenis({
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    syncTouch: true,
    autoRaf: false
  });
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  ```
- **Motion Easings (`CustomEase`):**
  - `khoraSmooth`: `"0.33, 0, 0, 1"` (standard editorial deceleration)
  - `khoraBounce`: `"0.10, 0.69, 0.39, 1.03"` (elastic navigation indicator pill)
  - `khoraAperture`: `"0.65, 0, 0, 1"` (deep subterranean crevasse zoom)
- **Magnetic Buttons:**
  - Every `[data-magnetic]` element calculates distance vector `(dx, dy)` to cursor.
  - Clamps displacement to a 12px radius; button moves to `(h, c)` while inner label dampens at `0.4 * h, 0.4 * c` with `scale: 0.96`.
- **GPU Rules:**
  - Animate strictly `transform`, `opacity`, `clip-path`, and SVG stroke offsets. Zero layout thrashing (`top`, `left`, `margin` inside scroll loops are strictly prohibited).
  - Target 60fps on desktop, Cumulative Layout Shift (CLS) 0.
- **Accessibility & Reduced Motion:**
  - `@media (prefers-reduced-motion: reduce)` disables all WebGL mouse tracking, smooth scrolling, and aperture wipes. The page renders as an elegant, clean editorial layout with native scrolling and instant card visibility.
  - Full keyboard accessibility: Esc dismisses modals, visible high-contrast focus rings, and full screen-reader label compliance.

---

## Deliverables & Directory Structure

Place all code cleanly inside `src/app/(khora)/khora/`:
- `page.tsx`: The primary route and composition.
- `layout.tsx`: Isolated layout with metadata and fonts.
- `brand/`: `Logo.tsx`, `BasaltFloor.tsx`, `Symbols.tsx`.
- `stage/`: `ScrollController.tsx`, `DepthOdometer.tsx`, `ApertureZoom.tsx`.
- `chambers/`: `ChambersRing.tsx`, `ChamberCard.tsx`, `CardTilt.ts`.
- `strata/`: `StrataSticky.tsx`, `FadeinText.tsx`, `IsometricCubes.tsx`.
- `canvas/`: `ThreeScene.tsx`, `MistShader.ts`, `RaycastHotspots.ts`.
- `dock/`: `GlassDock.tsx`, `InquiryDrawer.tsx`, `MenuDrawer.tsx`.
- `forms/`: `InquiryForm.tsx`, `voucher.ts` (tested validation rules).
- `PROMPT.md`: This exact specification.
