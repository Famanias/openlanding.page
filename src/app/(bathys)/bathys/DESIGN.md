# BATHYS — Design Spec & Blueprint

A landing page and telemetry experience for a fictional deep-ocean autonomous exploration robotics foundry called **BATHYS** (*Autonomous Hadal Exploration Vehicles · Calibrated to 11,000 Metres*). The central idea: **The ocean is vertically stratified into bathymetric depth zones where light extinguishes and hydrostatic pressure reaches 1,100 bar, so the page is an instrumented vertical dive to 10,928 metres.** Pinned stage telemetry tracks depth, water-column absorption, hydrostatic pressure equation $P = \rho g h$, and live acoustic sonar returns.

---

## 1. Requirements

- **Framework & Engine:** Next.js 16 (App Router with route group `(bathys)`), React 19, TypeScript 5, Tailwind CSS v4.
- **Runtime Isolation:** The template imports strictly npm dependencies (`gsap`, `lenis`, `motion`, `@phosphor-icons/react`) and files within `src/app/(bathys)/`. Zero root `@/` aliases.
- **Zero-External-Asset Visuals:** All bathymetric charts, vehicle schematics, polar radar grids, and depth meters are rendered with pure responsive SVG, HTML5 Canvas, and modern CSS gradients.
- **Performance Budget:** Mobile Lighthouse Performance ≥ 90, Accessibility ≥ 95, Best Practices 100.
- **Accessibility & Fallback:** Fully operational under `prefers-reduced-motion: reduce` and non-JS clients. No essential telemetry or content is hidden behind unfinished animations.

---

## 2. Concept

- **The Metaphor → Signature Mechanic:**  
  *A descent into the hadal trenches is a voyage through five distinct bathymetric layers:*
  1. **Epipelagic (0–200 m):** Sunlight zone, 1–20 bar, clear sea surface, GPS satellite telemetry.
  2. **Mesopelagic / Twilight (200–1,000 m):** Rapid solar absorption, thermocline plunge (28°C to 4°C), 20–100 bar.
  3. **Bathypelagic / Midnight (1,000–4,000 m):** 100% solar extinction, pitch oceanic darkness, 100–400 bar, active multibeam acoustic pinging.
  4. **Abyssopelagic (4,000–6,000 m):** Abyssal plains, ambient temperature near 1°C, 400–600 bar hydrostatic load.
  5. **Hadopelagic (6,000–10,928 m):** The Challenger Deep breach, extreme tectonic trenches, 600–1,114 bar, benthic lock.

  As the visitor scrolls (or adjusts the telemetry scrubber), the pinned hydrostatic stage simulates the dive in real time: the canvas absorption gradient deepens, the pressure counter runs pure physics calculations, and the active sonar array sweeps the seafloor.

---

## 3. Palette

Eight colors registered in `scripts/templates.config.ts`, enforced by `npm run check`.

| Token | Hex | Role | Contrast vs Ink | Contrast vs Paper |
|---|---|---|---|---|
| **trench** | `#03070D` | Ink: Canvas ground, deepest hadal darkness | — | 18.6:1 (AAA) |
| **navy** | `#0A1526` | Dark slab: Section cards, telemetry pods | 1.8:1 | 14.2:1 (AAA) |
| **titanium** | `#EDF5FA` | Paper: Primary typography, crisp vector lines | 18.6:1 (AAA) | — |
| **cyan** | `#00E5FF` | Primary Accent: Siphonophore bioluminescence, active sonar beam | 13.4:1 (AAA) | 1.4:1 |
| **amber** | `#FF9E1B` | Secondary Accent: Sonar warning threshold, acoustic ping alerts | 9.2:1 (AAA) | 2.0:1 |
| **glass** | `#122338` | Tint: Instrument bezels, gauge backdrops, card borders | 2.5:1 | 11.2:1 (AAA) |
| **slate** | `#546E8A` | Hairlines: Bathymetric contour rules, isobath grid ticks | 4.8:1 (AA) | 3.8:1 |
| **mist** | `#8DA8C2` | Muted: Secondary labels, specifications, descriptive body | 8.4:1 (AAA) | 2.2:1 |

- **Cyan Rule:** Used for active instruments, focus rings, and glowing telemetry on ink/dark backgrounds. Never used as small text on paper.
- **Amber Rule:** Reserved for alerts, critical depth thresholds (>6,000 m), and target locks.
- **Tints:** Constructed strictly via `color-mix()` of the eight tokens.

---

## 4. Typography

Loaded via `next/font/google` in `src/app/(bathys)/layout.tsx` with distinct CSS variables:

- **Display: Chakra Petch (Weights 600, 700)** (`--font-chakra`)  
  *Why:* Precision chamfered technical letterforms that mirror marine engineering instrument panels and subsea HUDs.
- **Body: Sora (Weights 300, 400, 600)** (`--font-sora`)  
  *Why:* Exceptional legibility at dense data layouts, high x-height, and crisp geometry on deep abyssal backgrounds.
- **Mono / Utility: Share Tech Mono (Weight 400)** (`--font-share-mono`)  
  *Why:* Authentic naval instrumentation, telemetry coordinates, and scientific readouts.

---

## 5. Layout & Geometry

- **Gutter:** `clamp(18px, 4.5vw, 64px)`, maximum content wrap `1280px`.
- **Corner Geometry:** Modern industrial — subtle 6–8px precision rounded corners with 1px hairlines (`#122338` and `#546E8A`).
- **Section Blueprint:**
  1. `HeaderHUD.tsx`: Fixed 64px telemetry bar with depth readout, bar pressure, coordinates, and section links.
  2. `Hero.tsx`: Deep water-column opening, monumental display typography, live coordinates, and primary dive CTA.
  3. `DescentSection.tsx`: Pinned 360vh hydrostatic dive stage (0 to 10,928 m) with dual-column telemetry and bathymetric rail.
  4. `ArchitectureSection.tsx`: Exploded titanium Grade-5 pressure sphere and syntactic foam buoyancy core.
  5. `SensorSuiteSection.tsx`: Multibeam synthetic aperture sonar, CTD environmental probes, and Raman spectrometer.
  6. `TrenchDossiersSection.tsx`: Challenger Deep, Puerto Rico Trench, and Kermadec Trench mission logs.
  7. `CharterFormSection.tsx`: Client-validated scientific charter & payload integration intake form.
  8. `Footer.tsx`: Naval registry, Brest & Monterey foundry coordinates, legal colophon.

---

## 6. The Signature Mechanic (`descent/` & `sonar/`)

### Hydrostatic Physics Formulation
Pure functions located in `src/app/(bathys)/bathys/descent/physics.ts` tested by `physics.test.ts`:
- **Maximum Depth:** $D_{\max} = 10,928\text{ metres}$.
- **Hydrostatic Pressure ($P$):**
  $$P(\text{bar}) = 1.01325 + \frac{\rho \cdot g \cdot d}{10^5}$$
  where $\rho = 1028\text{ kg/m}^3$ (seawater density at depth), $g = 9.81\text{ m/s}^2$, and $d$ is depth in metres.  
  At 10,928 m: $P \approx 1,114.2\text{ bar}$ ($111.4\text{ MPa}$).
- **Light Absorption ($L$):**
  $$L(d) = e^{-k \cdot d}$$
  where $k = 0.004\text{ m}^{-1}$. Sunlight decreases to $<1\%$ by 1,000 m (Bathypelagic onset).
- **Water Temperature ($T$):**
  Piecewise decay from surface warm ocean ($26^\circ\text{C}$) to thermocline ($4^\circ\text{C}$ at 1,000 m) to abyssal water ($1.8^\circ\text{C}$ at 10,928 m).

### State Management
- `createDescentStore(initialDepth)`: Observable pub/sub store synchronized across the sticky header HUD, vertical depth rail, stage readouts, and range scrubber.
- Consumed cleanly in React leaves using `useSyncExternalStore`.
- Accessible range slider allows manual scrubbing with mouse, touch, and arrow keys (`ArrowUp`/`ArrowDown`/`PageUp`/`PageDown`).

---

## 7. Motion System

### Motion Identity
- **Personality:** Technical / cinematic *(showpiece intensity)*
- **Primary Verbs:** *Submerge, ping*
- **Signature Moment:** *The Hadal Breach at 6,000 metres* — daylight completely dissolves into trench obsidian, hull pressure gauge scales past 600 bar with hydrostatic spring dampening, and the active multibeam acoustic sonar fires a high-frequency cyan sweep revealing the Challenger Deep trench floor.

### Motion Tokens
```css
@theme {
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-spring: linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1);

  --dur-instant: 90ms;
  --dur-fast: 160ms;
  --dur-base: 380ms;
  --dur-slow: 750ms;
  --dur-hero: 1200ms;

  --reveal-shift: 24px;
  --stagger: 65ms;
}
```

### Complete Motion Map (No Empty Cells)

| Element / Component | Enter (Load / Scroll) | Scroll-Linked Behavior | Hover / Focus (Fine Pointer) | Press / State Change | Exit / Handoff |
|---|---|---|---|---|---|
| **Header HUD** | Drops in at 150 ms (`translateY(-100%)` → `0`) | Compresses to 56px with frosted glass backdrop blur after 60px | Links draw cyan underline; telemetry glows cyan on focus | Mobile toggle morphs into crosshair; buttons scale(0.97) | Dims to opacity 0.7 during rapid descent scroll |
| **Hero Section** | Choreographed sequence: canvas settling (0ms) → logo (150ms) → mask-rise h1 (280ms) → CTAs (600ms) | Parallax vertical drift of bathymetric coordinate lines (±6%) | Primary CTA fill wipes cyan; Secondary CTA outline glow | Buttons press scale(0.97) with spring release | Fades and scales down (scale 0.96) as Descent Section pins |
| **Depth Stage (Pinned)** | Hydrostatic stage pins at 64px; depth meter slides in from right edge | Depth scrubs 0–10,928m; canvas absorption gradient deepens; pressure counts up | Interactive slider thumb scales 1.25x with cyan halo | Dragging thumb scrubs depth in real time; arrow keys step 250m | Section unpins cleanly into Vehicle Architecture |
| **Sonar Polar Radar** | Canvas fades in at 300ms; polar concentric range rings draw with dashoffset | Sweep arm rotation velocity links to descent rate (0.5 to 2.0 rad/s) | Crosshairs lock onto mouse coordinate; range markers highlight | Clicking ping button triggers momentary high-intensity cyan acoustic bloom | Pauses render loop when scrolled off-screen via IntersectionObserver |
| **Vehicle Architecture** | Staggered mask-rise cards (70ms stagger); vector hull schematic draws from center | Exploded 3D layer separation: Foam fairing (+40px), Titanium sphere (0px), Battery tray (-40px) | Specification cards tilt ±5° with pointer spotlight radial gradient | Feature tab buttons switch technical sub-assembly view | Crossfades smoothly into Sensor Suite Section |
| **Sensor Suite Cards** | Staggered card cascade (`translateY(24px) scale(0.96)`) | Subtle vertical parallax between sensor columns | Card lifts -6px; border-color transitions to cyan; sibling cards dim to 0.65 | Tapping sensor card opens detailed acoustic/optical telemetry modal | Leaves viewport with smooth opacity decay |
| **Trench Dossiers** | Horizontal dossier track reveals with clip-path wipe | Scroll progress translates active expedition card into focal viewport | Dossier card border brightens; coordinate stamp rotates 1.5° | Prev/Next buttons slide track with spring physics | Handoff to Charter Intake section |
| **Charter Intake Form** | Form card rises 28px with `--dur-base`; input borders draw left-to-right | Background coordinate grid drifts subtly with document scroll | Floating labels rise on focus; input focus ring animates 2px cyan | Invalid fields shake ±6px; Submit button morphs into telemetry verification loader | Form card transitions into green/cyan confirmed status card |
| **Footer** | Draws top border rule (`scaleX(0)` → `1`); registry columns stagger in | Footprint coordinates align with scroll bottom | Navigation links highlight cyan; return-to-surface arrow bobs | "Return to Surface" smoothly scrolls to 0m via Lenis | Static resting state |

---

## 8. Signature Details

1. **Bathymetric Water Column Rail:** A fixed indicator on the right viewport edge showing the current depth station within the five oceanic zones.
2. **Real Hydrostatic Readout:** Live computation of $P = \rho g h$ displaying pressure in both Bar and Megapascals alongside depth in metres.
3. **Active Sonar Polar Radar:** A procedural HTML5 Canvas radar drawing rotating sweep line, fading persistence trail, and acoustic target pings.
4. **Machined Titanium Hull Mark:** Crisp SVG lockup and mark with equatorial flange notches and directional acoustic transducer beam.
5. **Naval Coordinate HUD:** Live telemetry coordinates (`11°22.4' N · 142°35.5' E`) tracking the dive location.

---

## 9. Do / Don't

- **DO** keep every telemetry number, coordinate, and physical equation scientifically accurate.
- **DO** validate all charter form fields client-side with descriptive error messages.
- **DO** verify that under `prefers-reduced-motion: reduce`, all content is immediately legible with zero pinning and static gauges.
- **DON'T** introduce generic sci-fi tropes, cartoonish sea creatures, neon pinks, or generic purple glows.
- **DON'T** animate layout properties (`width`, `height`, `top`); use `transform`, `opacity`, and `clip-path` exclusively.
- **DON'T** emit network requests from form submissions or interactive controls.

---

## 10. File Structure

```
src/app/(bathys)/
  layout.tsx                       // Google Fonts (Chakra Petch, Sora, Share Tech Mono), metadata
  bathys/
    page.tsx                       // Server component orchestrating sections
    bathys.css                     // @theme tokens + prefixed classes (bat-*)
    DESIGN.md                      // This specification
    PROMPT.md                      // AI agent rebuild prompt
    icon.svg                       // Favicon (Grade 5 titanium mark)
    opengraph-image.tsx            // 1200x630 Next.js OG image
    assets.tsx                     // Picture + assetSrc placeholders
    assets.generated.ts            // Asset manifest
    brand/
      Logo.tsx                     // Full Lockup + Mark components
    descent/
      physics.ts                   // Hydrostatic math (P = \rho g h, absorption, temperature)
      physics.test.ts              // Unit tests for physics equations
      store.ts                     // Observable depth state store
      store.test.ts                // Unit tests for store subscriptions
      DescentSection.tsx           // Pinned interactive descent stage
      DepthRail.tsx                // Vertical ocean zone indicator
      GaugeHUD.tsx                 // Pressure, depth, temperature readouts
    scene/
      SubmersibleScene.tsx         // Fixed WebGL layer: the H-11 follows the scroll (hero hero → gutter companion), callouts, depth lighting
      buildSubmersible.ts          // Procedural Three.js model (Ti sphere, foam fairing, pods, floodlight cones, arm, skids)
      pose.ts                      // Pure scroll → screen-pose mapping
      pose.test.ts                 // Unit tests for the pose mapping
    sonar/
      SonarRadar.tsx               // Procedural HTML5 Canvas polar sweep radar
    sections/
      HeaderHUD.tsx                // Fixed telemetry navigation bar
      Hero.tsx                     // Atmospheric opening & coordinates
      HeroScene.tsx                // Hero backdrop: surface, light shafts, descending submersible, sonar ping
      OceanAmbient.tsx             // Fixed page-wide water column: depth gradient, marine snow, sounding ruler, trench floor
      ArchitectureSection.tsx      // Titanium sphere exploded view
      SensorSuiteSection.tsx       // Multibeam sonar & CTD probes
      TrenchDossiersSection.tsx    // Mariana, Puerto Rico, Kermadec logs
      Footer.tsx                   // Naval registry & coordinates
    forms/
      CharterForm.tsx              // Expedition booking intake
      validate.ts                  // Pure validation rules
      validate.test.ts             // Unit tests for validation
    motion/
      math.ts                      // lerp, clamp, progress functions
      math.test.ts                 // Unit tests for motion math
      Reveal.tsx                   // Mask, wipe, rise primitives
      useInView.ts                 // IntersectionObserver leaf
      useReducedMotion.ts          // Prefers-reduced-motion hook
      TiltCard.tsx                 // 3D perspective spotlight card
```
