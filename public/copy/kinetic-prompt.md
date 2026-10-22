# Prompt: rebuild "KINETIC" (autonomous 3D delivery journey megamarket)

Paste everything below the line into your AI coding agent.

---

Build a landing page in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4 + Three.js** for a fictional autonomous e-commerce marketplace called **KINETIC** (tagline: *"Megamarket drops, packed by robots, delivered by hand."*).

The page features an interactive **3D Delivery Journey** inspired by HighwayTMS and a smooth, tactile aesthetic inspired by Satsuma and Fallow: a real-time procedural 3D electric delivery truck (**Unit 104**) travels a 1,400-meter paved highway route from the origin distribution yard in Chicago to a Dallas doorstep delivery. Five pinned presentation chapters synchronize narrative copy, catalog deals, and order telemetry with the moving 3D vehicle, accompanied by a projected 3D pill HUD tag and dynamic SVG bezier connector curve.

**Reference:** The live template at `https://openlandingpage.vercel.app/kinetic`.

## Brand rules

- **Seven colours only.** Make tints only with `color-mix()` of these:
  - cream paper `#FAF7F2` (the page ground, white cards)
  - velvet ink `#1B1522` (display headlines, body text, dark chapter bands)
  - satsuma orange `#FF6B2B` (the signature accent: pills, beacons, checkout CTAs)
  - soft apricot `#FFE6D2` (pill backgrounds, card tints, warm highlights)
  - mint glow `#00D4B2` (telemetry lasers, active vehicle tag, live sensors)
  - plum carbon `#2A1E30` (nocturnal 3D sky, contrast chapter bands)
  - muted slate `#8E8294` (delicate 1px hairlines, secondary specs)
- **Type (via `next/font/google`, distinct variable names):**
  - **Bricolage Grotesque** 600/700/800 for display (`--font-bricolage`), tracking −0.035em.
  - **Inter** 400/500/600 for body and UI (`--font-inter`).
  - **JetBrains Mono** 500/700 for telemetry, SKU tags, and timestamps (`--font-jetbrains`).
- **Corners:** pills (`rounded-full`) for buttons and badges, 24–32px squircle rounding for cards, 16px for form inputs. Smooth sheet overlays with `rounded-t-[36px]`.
- **Logo:** a rounded squircle parcel that folds into a forward-leaning "K" chevron with a mint telemetry dot, plus the wordmark "kinetic." with a satsuma dot and pill badge. Provide `brand/Logo.tsx`, `icon.svg` and a 1200×630 `opengraph-image.tsx`.

## The 3D Delivery Journey Engine (`journey/`)

- Decoupled Three.js WebGL world behind the page content with a zero-CLS painted sky fallback.
- **Road layout (`story.ts`):** 1,400 meters of paved spline ribbon road from `s = -80m` to `s = 1380m`. Landmarks: Origin Yard (`s = 20m`), Sort Gate (`s = 180m`), Bridge Crossing (`s = 650m`), City Corridor (`s = 980m`), and Arrival Dock (`s = 1300m`).
- **Vehicle rig (`truck.ts`):** Procedural electric delivery truck mesh with aerodynamic cab, high-voltage battery chassis, dual-axle suspension, spinning wheels, steering pivots, illuminated LED headlights, amber warning beacons, and ground shadow.
- **Story mapping (`storyScroll.ts`):** Maps page scroll progress to discrete chapter beats (`stops`), interpolating camera shots, road elevation, and vehicle velocity.
- **Live HUD Telemetry Tag (`ParcelTag.tsx`):** Projects the 3D truck position onto screen coordinates every frame and draws an SVG bezier connector line linking highlighted product cards to the vehicle.
- **Fallback:** Under `prefers-reduced-motion` or when WebGL2 is unsupported, heavy 3D does not mount; chapters flow as crisp stacked stages with static cinematic fallback frames.

## The 5 Pinned Presentation Chapters (`chapters/`)

1. **01 Ingestion (Hero):** Origin DC yard. Headline *"From One Click to Your Hands in 24 Minutes."*, live market ticker, and primary pill CTA *"DISPATCH ORDER #KX-9042"*.
2. **02 Sortation:** Optical induction scanning archway. Interactive item routing demo and live weight verification.
3. **03 Transit:** Arterial highway bridge at twilight. Live speedometer, battery level, route elevation grade, and countdown telemetry.
4. **04 Megamarket Deals:** Metropolitan distribution corridor. Flash-drop marketplace cards (Audio, Apparel, Battery) with live SVG connector curves linking items directly to the traveling truck.
5. **05 Doorstep Arrival:** Destination dock bay. Interactive tamper-seal unboxing demo verifying delivery handoff, plus client-side VIP Express instant dispatch form.

## Quality bar

- Only `transform`, `opacity`, and `clip-path` animate. UI transitions stay under 300ms with custom easing tokens.
- Fully accessible: semantic headings, real `<button>` controls, visible focus rings, and strict AA/AAA contrast.
- Zero layout shift (CLS 0) on first paint. Fluid responsiveness from 375px mobile to 1440px desktop.
