# RAZORLINE — RL-01 Performance Footwear

## Requirements

RAZORLINE is an isolated Next.js App Router template located at `/razorline` representing a performance running shoe flagship launch site (sub-brand: *RL-01 Performance Series*). It features direct-to-consumer DTC product showcases, interactive colorway model switching, technical exploded architectural breakdowns (hollow-core aerodynamic sole, matrix monofilament mesh, cantilevered Achilles cradle), dynamic shoe inspection modals, interactive lookbook galleries with telemetry overlays, and a responsive slide-out cart drawer with live subtotal computations.

## Concept

A high-velocity, dark-mode architectural athletics brand identity. Raw carbon structural backgrounds fuse with searing electric Voltage Lime and track Cobalt highlights, paired with italicized, slanted geometric typography that evokes forward motion and explosive kinetic release:
1. `Navbar`: Sticky header with angular geometric RAZORLINE badge, instant scroll anchors, and cart drawer trigger with real-time item counter.
2. `Hero`: Slanted italic display typography ("BREAK THE LIMIT"), interactive 3D-feeling model switcher (`RL-01 VOLTAGE`, `RL-01 COBALT`, `RL-01 SHADOW`), architectural telemetry HUD (coordinates, acceleration, strike angle), and quick inspect modal trigger.
3. `Marquee Strip`: Dynamic scrolling ticker displaying cadence metrics, technical specifications, and brand mottos.
4. `Collection Section`: Product grid featuring colorway selection, interactive size picker (US 7.5 – 13.0), instant add-to-bag, and quick-view drawer.
5. `Breakaway Section`: Exploded technical breakdown showcasing the 3-chamber hollow cavity sole, carbon monofilament matrix mesh, and cantilevered Achilles cradle.
6. `Technology Section`: Interactive technical deep-dive tabs with coordinate overlays, millimeter metrics, and interactive inspection hotspots.
7. `Athletes Section`: Fictional test runner telemetry and field testing quotes (Kai Vance, Sora Takahashi, Marcus Vey) across Berlin, Tokyo, and Zurich.
8. `Lookbook Section`: Studio and track photography viewer with carousel navigation and technical aspect callouts.
9. `Launch CTA & Footer`: Slanted parallelogram drop reservation form with validation, technical architecture notes, and legal/navigation links.
10. `Cart Drawer`: Slide-out panel featuring complimentary express shipping, quantity controls, and simulated checkout flow.
11. `Quick View Modal`: Modal with shoe detail inspection, size selector, and add to bag.

## Palette

- Carbon Black: `#0B0B0A` (canvas, panels, background ground)
- Chalk Bone: `#F1F0E9` (typography, hairlines, primary text)
- Voltage Lime: `#D3FF35` (primary electric accent, CTAs, sole highlights)
- Cobalt Blue: `#375CFF` (secondary electric accent, saddle straps, track details)
- Raw Steel / Graphite: `#777A7A` (telemetry, technical specs, borders)
- Elevated Carbon: `#141413` / `#1C1C1A` (card panels, elevated surfaces)
- Subtle Border Hairline: `rgba(241, 240, 233, 0.1)`

## Type

- Barlow Condensed (600, 700, 800, 900 italic) for display headlines and high-energy wordmarks (`--font-display`).
- Plus Jakarta Sans (400, 500, 600, 700) for reading text, descriptions, and UI controls (`--font-sans`).
- JetBrains Mono (400, 500, 600) for technical specs, telemetry, coordinates, and prices (`--font-mono`).

## The Mechanics

1. **Interactive Model Switcher**:
   - Switching between `RL-01 VOLTAGE`, `RL-01 COBALT`, and `RL-01 SHADOW` updates the hero presentation, technical specs, colorway badges, and quick inspect modal.
2. **Deterministic Cart & Inventory Logic**:
   - `storeLogic.ts` manages items with composite keys (`modelId::size`), quantity bounds (1–10), and automatic subtotal calculation.
3. **Slanted Angular Geometry & Blueprint Grids**:
   - Custom utility classes (`.hero-headline-word`, `.clip-slant-cta`, `.clip-slant-card`, `.bg-blueprint-grid`) enforce high-precision athletic speed aesthetic.
4. **Motion System & Choreographed Load**:
   - Slanted mask slides reveal headline text in staggered sequence (80ms, 230ms, 380ms), followed by shoe settle animation with subtle idle floating.
5. **Validation & Interaction Feedback**:
   - Email signup validates RFC email format with actionable feedback.

## Motion Identity

- **Personality**: Aggressive, precise, kinetic, architectural.
- **Key Verbs**: Slashing, snapping, accelerating.
- **Signature Moment**: Staggered mask-slide reveal of the slanted hero typography paired with the dynamic settling of the RL-01 shoe silhouette.

## Do / Don't

- **Do** maintain strict relative imports within `src/app/(razorline)/`.
- **Do** preserve the high-contrast athletic dark palette (`#0B0B0A`, `#F1F0E9`, `#D3FF35`).
- **Don't** introduce generic sans fonts for headlines; always use slanted Barlow Condensed.
- **Don't** break reduced-motion accessibility; ensure instant settle under `prefers-reduced-motion: reduce`.
