# XIBALBA — Night of the Jade Cenote

## Requirements

XIBALBA is an isolated Next.js App Router template at `/xibalba` portraying a nocturnal equinox ceremony and subterranean botanical reserve in the Yucatan. Visitors descend vertically through five contiguous geological layers into a collapsed limestone sinkhole. The page includes an interactive codex inspection modal, descent station selector, and local passage reservation form. The form is a local demo and never sends network requests.

## Concept

A deep vertical cross-section through Mayan limestone at midnight. The descent transitions from jungle canopy down to the moonlit subterranean aquifer:
1. `Hero`: Jungle Rim, Eclipsed Pyramid, and Upper Falls.
2. `The Cenote`: Orchid Vault, Obsidian Mirror, and 6 Botanical Cylinders.
3. `The Calendar`: Bounded Left Falls, 20-Spoke Calendar Wheel, and Codex Pedestals.
4. `The Copal Foundry`: Serpent Cauldron and Three Molten Resin Streams.
5. `The Finale`: Cavern Arch, Low Moon Pillar, and Floating Lotus Lanterns.

Four 16:9 limestone and root seam bands join the five scenes with seamless canvas waterfalls and rock bridges.

## Palette

- Night: `#040A0E`
- Obsidian: `#071218`
- Ink: `#EEFAF6`
- Copal Ember: `#FFA33E`
- Jade Cyan: `#5FF2C8`

Text pairings use Ink `#EEFAF6` on Night `#040A0E`, with Copal Ember `#FFA33E` and Jade Cyan `#5FF2C8` used exclusively for bioluminescent accents, molten streams, glowing rim light, and interactive focus states.

## Type

- Oswald (300, 400, 500, 600, 700) is display. Loaded through `next/font/google` as `--font-oswald`.
- Inter (400, 500, 600) is body and utility. Loaded through `next/font/google` as `--font-inter`.

Display typography utilizes tracking and uppercase hierarchy; section titles are masked and reveal on scroll.

## Layout & Seams

- Five full-bleed 16:9 scenes stacked vertically into a continuous cross-section (`height: calc(100vw * 1520 / 2688)`).
- Four 16:9 limestone-and-root seam bands positioned at the junctions (`transform: translateY(-50%)`).
- Each seam band hosts an additive screen-blended canvas waterfall aligned to the artwork's chasm coordinates, creating uninterrupted water flow across scene boundaries.
- A torch lamp (`.lamp`) follows the pointer, casting a warm copal glow (`rgba(255, 170, 80, 0.15)`) onto the cavern rock.

## The Mechanics

1. **Additive Canvas Waterfalls**:
   - `cenoteEngine.ts` drives multi-layered particle waterfalls using additive blend mode (`screen`).
   - Water streaks feature velocity-dependent lengths, alpha falloff, and splash emitters at terminal plunge pools.
2. **Dynamic Black-Key Alpha Transparency**:
   - Seam JPEG textures and sprite sheets are processed on canvas load to convert black background pixels (`#000000`) into transparent alpha channels.
3. **Sprite Physics & Cursor Repulsion**:
   - `cenoteMath.ts` calculates precise sprite sheet offsets from `scene-sprites.png` (normalized to 1024×765).
   - Jade Morpho spirits bob with sinusoidal hover motion and veer away from cursor proximity.
   - Cave bats flap wings across alternating keyframe cycles and cruise cavern corridors.
4. **Interactive Modals**:
   - Accessible dialog modals for Codex Folios, Descent Stations, and Passage Reservations, featuring full keyboard accessibility (Escape to dismiss, trap focus, aria attributes).
5. **Static Semantic Fallback**:
   - `StaticFallbackPage.tsx` provides complete semantic HTML plates, headings, descriptions, and accessible forms. In reduced-motion or SSR environments, the experience remains fully functional and legible.

## Motion

- Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Scroll: Momentum scroller on fine pointer devices, native smooth scroll on touch.
- Header: Translates into view after 500ms delay.
- Modals: Scale and opacity transitions with backdrop blur.

## Reduced Motion & Accessibility

- When `prefers-reduced-motion: reduce` is active:
  - Scroller uses standard document positioning.
  - Interactive canvas RAF loops disable particle drift and maintain calm water opacity.
  - Cursor torch is disabled.
  - All content, plates, and reservation controls are immediately visible and operable.

## Do / Don't

- **Do** isolate all styles within `xibalba.css` and use CSS custom properties.
- **Do** keep all seam bands aligned to 16:9 aspect ratios.
- **Do** clamp sprite crops strictly to normalized coordinate math.
- **Don't** add external libraries (Framer Motion, Lucide, Three.js) — canvas and React primitives deliver all fidelity.
- **Don't** use hex colors outside the 5 palette tokens.
