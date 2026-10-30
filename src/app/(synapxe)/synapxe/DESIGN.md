# Synapxe — Cyberpunk Techwear Storefront

## Requirements

Synapxe (KINETIX // ARCHIVE) is an isolated Next.js App Router template at `/synapxe` representing an advanced technical apparel storefront and equipment configurator (sub-brand: *Engineered Urban Shell Systems & Modular Techwear*). It includes real-time Three.js 3D exploded fabric physics, a volumetric hologram character loadout builder, a biometric sizing calculator, dynamic currency conversion (USD/JPY/EUR), and a functional slide-out cart drawer with bundle discounts and promotional terminal codes.

## Concept

A high-density brutalist cyberpunk aesthetic fusing industrial specification labels, exposed structural hairlines, and neon optical shaders:
1. `Header`: Sticky system telemetry bar with real-time UTC/JST clocks, coordinate telemetry, currency switch, and live loadout weight counter.
2. `Hero`: Flagship storm figure with real-time canvas DWR hydrophobic rain physics, 4 pinned HUD reticle hotspots, and optical shader matrix filters (Optical, Thermal, UV-Lumen).
3. `Tyvek Seam & Filter Bar`: High-contrast Tyvek care tag with ISO care symbols, batch barcode, drop countdown, category filters, and sorting controls.
4. `Modular Loadout Grid`: 10-item brutalist product grid with quick-size selection matrix, tri-tone colorway swatches, and spec telemetry bars.
5. `3D Fabric Lab`: Interactive Three.js exploded-view membrane simulator demonstrating 3 distinct textile planes, DWR water deflection, and moisture vapor flux.
6. `Loadout Builder`: 2-column RPG inventory configurator pairing a 3D hologram wireframe with a 3-slot loadout builder calculating bundle mass and a 15% discount.
7. `Biometric Fit`: Real-time anatomical sizing calculator determining recommended garment specifications and syncing across store cards.
8. `Hardware Cart`: Slide-out panel featuring free shipping thresholds, promo code verification, and simulated cryptographic checkout confirmation.
9. `Tyvek Footer`: Industrial care label with an interactive NFC authenticity verifier and dispatch subscription.

## Palette

- Obsidian: `#090B0E` (page canvas, dark panels)
- Slate: `#11161D` (elevated panels, secondary cards)
- Tyvek White: `#F1F5F9` (care-tag strips, high-contrast labels)
- Primary Text: `#F8FAFC` (headings, body content)
- Muted Slate: `#94A3B8` (telemetry, coordinates, secondary labels)
- Hairline Border: `#E2E8F0` / `rgba(226, 232, 240, 0.14)`
- Neon Cyan: `#00F0FF` (primary accent, active states, reticles)
- Neon Magenta: `#FF007F` (secondary accent, synergy badges, alert indicators)
- Hazard Amber: `#FF7A00` (vapor mode, thermal telemetry)
- Acid Volt: `#D4FF00` (bundle rate badges, confirmation readouts)
- Charcoal Blue: `#18222F` (border hover & deep gradients)
- Slate Muted: `#475569` (swatch accents)

## Type

- Oswald (400, 500, 600, 700) for headings and display labels (`--font-oswald`).
- Manrope (400, 500, 600, 700) for UI body copy (`--font-manrope`).
- JetBrains Mono (400, 500, 700) for technical specs, telemetry, coordinates, and prices (`--font-jetbrains`).

## The Mechanics

1. **Three.js 3D Exploded Fabric Lab**:
   - `FabricLab3D.tsx` computes parametric layer elevations based on the slider value `0% - 100%`.
   - Real-time shaders simulate ballistic Cordura basket-weave deformation, microporous ePTFE lattice structure, and tricot wicking channels.
2. **Volumetric Hologram Rig**:
   - `HologramRig3D.tsx` projects equipped garments in a 3D scan viewport with dynamic scanlines, edge illumination, and camera position locks for Upper Shell, Lower Rig, and Full Rig.
3. **Canvas DWR Hydrophobic Rain Physics**:
   - Rain streaks slant at 15 degrees and collide against the hero figure's shoulders and visor, shattering into upward-bouncing micro-droplets.
4. **Biometric Fit Calculations**:
   - Calculates recommended alpha sizing (S through XL) and dimensional chest, sleeve, and inseam clearances based on user height, mass, and chest expansion.
5. **Interactive NFC Verifier**:
   - Validates garment unit codes and cryptographic hashes with simulated terminal scan delays.
