# KINETIC — Design Specification

## Requirements

- **Next.js ≥ 16.4** (App Router, route group `(kinetic)` with isolated root layout, `next/font/google`, `next/og`), React 19, TypeScript, Tailwind CSS v4.
- `three` and `lenis` as runtime dependencies. Everything else is pure CSS and requestAnimationFrame loops.
- **Folder isolation:** imports only npm packages and files inside `src/app/(kinetic)/`. Zero imports from `@/` or other templates.

---

## Concept

- **The Brand:** KINETIC is a fictional autonomous mega-marketplace combining instant consumer flash drops (electronics, apparel, home essentials) with a continuous 3D delivery fleet. Orders trigger immediate physical movement from high-bay distribution centers to doorstep delivery in 24 minutes flat.
- **Slogan:** "Megamarket drops, packed by robots, delivered by hand."
- **The Central Idea → The Signature Mechanic:**
  *Every click sets an autonomous vehicle in motion on a physical road, so the landing page pins a real-time 3D fulfillment journey following Unit 104 and Package #KX-9042 from the Chicago origin yard along a 1,400-meter paved highway to a Dallas doorstep unboxing, complete with live telemetry HUD tags and dynamic SVG connector curves.*
- **The Brand's Language:** orders are *dispatched*, transit is *the arterial glide*, flash items are *drops*, units are *fleet pods*, verification is *the doorstep seal*.
- **Mood:** Airy, tactile, organic, confident, juicy (fusing the smooth craft of /satsuma and Fallow with HighwayTMS's spatial delivery engine).

---

## Palette

Seven structural colours. Tints are derived strictly with `color-mix()` of these seven.

| Token | Hex | Role | Contrast vs Paper | Contrast vs Ink |
|---|---|---|---|---|
| `--color-paper` | `#FAF7F2` | Page canvas, white cards, label ground | 1.0:1 | 15.8:1 (AAA) |
| `--color-ink` | `#1B1522` | Display text, headlines, dark band ground | 15.8:1 (AAA) | 1.0:1 |
| `--color-accent` | `#FF6B2B` | Satsuma orange: pills, beacons, primary CTA | 2.5:1 (strokes/fills) | 6.3:1 (AA) |
| `--color-apricot` | `#FFE6D2` | Soft peach tint: badge grounds, card accents | 1.2:1 (tint only) | 13.2:1 (AAA) |
| `--color-mint` | `#00D4B2` | Mint glow: telemetry tag, live sensor beacon | 1.5:1 (graphic only) | 10.4:1 (AAA) |
| `--color-carbon` | `#2A1E30` | Nocturnal 3D sky, contrast chapter bands | 11.8:1 (AAA) | 1.3:1 (band) |
| `--color-steel` | `#8E8294` | Muted slate: 1px hairlines, secondary specs | 3.6:1 (large text) | 4.4:1 (AA large) |

*Rule:* `--color-accent` (#FF6B2B) on paper serves only as pill backgrounds with white text, badge borders, and icon fills—never small body text directly on paper.

---

## Typography

Three distinct roles via `next/font/google`:

| Role | Font | Weights | Variable | Usage |
|---|---|---|---|---|
| **Display** | **Bricolage Grotesque** | 600, 700, 800 | `--font-bricolage` | Headlines, section titles, logo wordmark, price tags |
| **Body** | **Inter** | 400, 500, 600 | `--font-inter` | Body paragraphs, product descriptions, nav links, buttons |
| **Mono** | **JetBrains Mono** | 500, 700 | `--font-jetbrains` | Telemetry readouts, SKU tags, timestamps, coordinates, barcodes |

Typography scales fluidly with `clamp()`. Hero headline sits at `clamp(2.8rem, 6vw, 5.4rem)` with `-0.035em` letter spacing.

---

## Layout

- **Viewport & Stages:** Pinned presentation stages reserve vertical scroll length (`--len: 1.2` to `1.5`) so the reader enjoys steady, composed cards while the background 3D vehicle drives between story stops.
- **Max Width & Gutter:** Main wrap `1240px` with fluid gutter `clamp(18px, 4vw, 56px)`.
- **Corner Geometry:**
  - Pills (`rounded-full` / `9999px`) for buttons, status badges, chapter rail chips, and telemetry HUD tags.
  - Squircles (`24px`–`32px`) for product cards, demo stages, and form containers.
  - Smooth rounded-top sheets (`rounded-t-[36px]`) for overlay transitions.
- **Mobile Adaptation (≤ 860px):**
  - Sticky stages adapt to compact top banners, allowing chapters to flow comfortably without layout crowding.
  - 3D engine pauses offscreen or disables automatically under low GPU/memory profiles.
  - Telemetry HUD tag shifts to a compact floating bottom pill.

---

## The Mechanic: 3D Delivery Journey Engine (`journey/`)

Directly derived from HighwayTMS's award-winning spatial architecture:

### 1. Delivery Journey Data (`story.ts`, DOM-free & tested)
- **Road bounds:** Paved spline road from `s = -80m` to `s = 1380m`.
- **Landmarks:**
  - `originYard`: `s = 20m` (Unit 104 idles at pickup gate)
  - `sortGate`: `s = 180m` (Optical induction scanner & weighing station)
  - `bridge`: `s = 650m` (Mississippi river crossing & arterial overpass)
  - `city`: `s = 980m` (Metropolitan logistics hub & catalog billboards)
  - `arrivalDock`: `s = 1300m` (Destination delivery bay & doorstep locker)
- **Curvature & Elevation:** Curvature blend arcs and smooth elevation steps (`smoothstep`) calculate road heading, grade, pitch, and roll without kinks.
- **Camera Placements:** Distinct shots for each story stop (forward offset, elevation, right offset, look-at vector, and FOV) smoothly interpolated by story index.

### 2. Vehicle Rig (`engine/truck.ts`)
- Procedural Three.js electric delivery truck modeled in model space:
  - Aerodynamic cab with panoramic windshield.
  - High-voltage battery chassis, dual-axle assemblies with rim details.
  - KINETIC cargo box with high-visibility satsuma livery and Package #KX-9042 container bay.
  - Wheels spin (`rotation.z`) proportional to ground distance; front wheels steer (`rotation.y`).
  - Suspension physics: pitch, roll, and subtle road bounce.
  - Dynamic headlights, amber warning strobes, and ground shadow plane.

### 3. Road & World System (`engine/road.ts`, `sky.ts`, `terrain.ts`, `city.ts`)
- Continuous ribbon mesh road with asphalt texture, center dashed line, and curb rails.
- Dynamic sky dome blending warm dawn into golden highway hour into dusk city twilight.
- Low-poly terrain meshes, river plane with subtle specular shimmer, and instanced architectural silhouettes.

### 4. Telemetry & Projection (`telemetry.ts`, `ParcelTag.tsx`)
- Calculates truck screen position `(x, y)` every frame via camera projection matrix.
- Projects screen-space coordinates to the DOM `ParcelTag` component.
- Renders an SVG cubic bezier connector curve linking highlighted on-screen product cards directly to the moving truck tag.

---

## Motion

- **Personality:** Soft, organic, tactile.
- **Two Primary Verbs:** ***glide* and *settle***.
- **Tokens (in `@theme` in `kinetic.css`):**
  - `--ease-out`: `cubic-bezier(0.22, 1, 0.36, 1)`
  - `--ease-out-expo`: `cubic-bezier(0.16, 1, 0.3, 1)`
  - `--ease-in-out`: `cubic-bezier(0.65, 0, 0.35, 1)`
  - `--ease-spring`: `linear(0, 0.4 9%, 0.86 22%, 1.04 33%, 1.01 46%, 0.995 62%, 1)`
  - `--dur-instant`: `90ms`
  - `--dur-fast`: `180ms`
  - `--dur-base`: `420ms`
  - `--dur-slow`: `850ms`
  - `--dur-hero`: `1200ms`
  - `--reveal-shift`: `28px`
  - `--stagger`: `75ms`
- **Signature Moment:** The **"Sortation Ejection to Highway Launch"** — scrolling across Chapter 02 to 03 triggers an optical laser sweep across Unit 104 as it bursts through the outbound gate onto the open expressway; the camera swoops into an aerodynamic chase shot while the live HUD tag locks telemetry and draws an SVG bezier curve into the reader's order console.

### The Motion Map

| Element | Enter (load or scroll) | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
|---|---|---|---|---|---|
| **Header** | Drops in at 150ms, pills stagger | Compacts to frosted pill strip after 60px | Nav indicator glides between links; links lighten | Menu toggle morphs on mobile | Hides gracefully on fast scroll down |
| **Hero Stage** | 3D canvas settles scale 1.04 &rarr; 1.0; title mask-rises | Truck idles; camera tracks pointer tilt | CTA pill magnetic pull + wipe fill | Press scales to 0.96 with spring | Pinned while Chapter 02 slides over |
| **Chapter Rail** | Fades in at right at 500ms | Active pill indicator glides to current stop | Tooltip pill pops with chapter name | Clicks smoothly trigger Lenis scroll to stop | Stays persistent on desktop |
| **Parcel HUD Tag** | Pops into view once 3D engine is live | Tracks 3D truck projected screen (x, y) | Tag highlights with mint glow pulse | Clicks expand quick telemetrics | Fades out when truck goes off-camera |
| **SVG Connector** | Draws path with stroke-dashoffset | Recalculates end point to moving truck tag | Brightens to 100% opacity | Pulses on product selection | Dissolves when card leaves viewport |
| **Sortation Demo** | Card rises 24px + scale settle | Conveyor belt ticks; scanner sweeps | Card lifts 6px with peach spotlight | Step buttons swap scanning feed | Hands off to Highway transit |
| **Catalog Cards** | Staggered 75ms cascade rise | Subtle 12px parallax drift | Tilt &plusmn;6&deg;, spotlight glow, lift 8px | Press scales 0.97; adds to live truck cart | Smoothly scrolls into Arrival |
| **Arrival Demo** | Unboxing card scales in with spring | Tamper seal animates on chapter reach | Verification pill highlights with mint | Slide-to-unlock unboxes container | Retains confirmed delivery status |
| **VIP Form** | Card rises 28px with soft shadow | Form card holds sticky focus | Inputs gain satsuma pill focus rings | Submit morphs into loading &rarr; checkmark | Success state displays tracking code |
| **Cursor Light** | Spawns canvas stamps on mousemove | Stamps shrink and fade over 1200ms | Stamps brighten slightly over buttons | Disables on touch / reduced-motion | Seamless click-through |

---

## Signature Details

1. **Projected 3D Pill HUD Tag (`ParcelTag.tsx`):** Screen-space pill tracking Unit 104 with dynamic status ("Loaded", "Dispatched", "Highway Glide", "Docked").
2. **Interactive SVG Bezier Connector Curve:** Connects DOM product cards to the physical 3D vehicle in real time.
3. **Canvas Light Brush Cursor (`CursorScanner.tsx`):** A soft, tactile orange/mint light trail dissolving gently behind the pointer.
4. **Pinned 5-Chapter Rail (`ChapterRail.tsx`):** Direct-jump navigation rail tracking journey progress.
5. **Flash Drop Unboxing Card:** Interactive tamper-seal slider verifying package arrival.

---

## Do / Don't

- **DO** keep all 3D engine operations purely procedural Three.js without external 50MB model assets.
- **DO** use the exact palette tokens and fluid clamping.
- **DO** support zero-JS and reduced-motion states with rich cinematic painted fallback frames.
- **DON'T** animate width, height, or top/left; stick strictly to `transform`, `opacity`, and `clip-path`.
- **DON'T** import from `@/` or outside `src/app/(kinetic)/`.
- **DON'T** use harsh square corners or generic corporate cards; preserve Satsuma's soft pill and squircle aesthetic.

---

## Files

```
src/app/(kinetic)/
  layout.tsx                          Root layout: fonts, metadata, import kinetic.css
  kinetic/
    page.tsx                          Page composition; server component
    kinetic.css                       Tailwind v4 tokens, theme, prefixed classes (kn-*)
    DESIGN.md                         This specification
    PROMPT.md                         Self-contained rebuild prompt
    icon.svg                          Favicon mark (squircle K in palette)
    opengraph-image.tsx               Next.js dynamic OG card (1200x630)
    assets.tsx                        Responsive Picture + placeholder helper
    assets.generated.ts               Asset registry
    brand/
      Logo.tsx                        SVG lockup and squircle mark
    chapters/
      Chapter.tsx                     Pinned section wrapper with --len CSS property
      ChapterRail.tsx                 Fixed right chapter navigation rail
      chapters.tsx                    The 5 presentation chapters (Ingestion, Sort, Transit, Deals, Arrival)
      SceneScrim.tsx                  Vignette scrim and background overlay
      ParcelTag.tsx                   Projected 3D HUD tag with SVG connector curve
      CursorScanner.tsx               Tactile canvas cursor light trail
      ZoomLock.tsx                    Mobile scale lock
    demos/
      LoadRecordDemo.tsx              Ingestion manifest card demo
      SortationDemo.tsx               Optical barcode scanning chute demo
      TransitTelemetryDemo.tsx        Speedometer, battery, and route grade demo
      CatalogDealsDemo.tsx            Flash-drop marketplace cards with live cart sync
      UnboxingDemo.tsx                Interactive tamper-seal unboxing verification
    forms/
      OrderExpressForm.tsx            Client-side validated instant dispatch form
      validation.ts                   Pure validation logic (tested)
      validation.test.ts              Unit tests for form validation
    journey/
      JourneyExperience.tsx           Decoupled Three.js WebGL world root with fallback
      journey.module.css              Stage and canvas styling
      runtime.ts                      Environment and device capability guards
      story.ts                        DOM-free journey table (spline road, shots, stops)
      story.test.ts                   Unit tests for journey distance, curvature, and interpolation
      storyScroll.ts                  Window scroll to story position observer
      telemetry.ts                    Truck screen projection and telemetry pub/sub
      engine/
        index.ts                      Main Three.js render loop & scene orchestration
        truck.ts                      Procedural electric delivery truck mesh rig
        road.ts                       Spline road ribbon mesh generator
        route.ts                      Coordinate math and frame transform
        sky.ts                        Atmospheric procedural sky dome
        terrain.ts                    Rolling terrain, river, and landscape
        scenery/
          depots.ts                   Origin distribution yard & destination dock
          city.ts                     Urban skyscraper silhouettes & streetlights
    motion/
      math.ts                         Pure math: clamp, lerp, smoothstep, damp
      math.test.ts                    Unit tests for math helpers
      useInView.ts                    IntersectionObserver hook
      useReducedMotion.ts             Reduced motion media query hook
      Reveal.tsx                      Declarative mask-rise, wipe, draw, scale component
```
