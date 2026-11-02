# STAR RIOT — Neon Disco & After-Dark Club

## Requirements

STAR RIOT is an isolated Next.js App Router landing page template at `/starriot` representing a fictional neon disco, after-dark dance club, and weekend sound residency. Built as a high-voltage nightlife showcase, it translates 70s/80s disco fever into retro-pop futurism. It features interactive DJ lineup and live deck controls, frequency filterable event poster cards with 3D tilt, a scroll-driven 3-stage sound track progression (WARM UP → TURN UP → ALL OUT), an immersive 4-zone architectural tour with real-time floor matrix lighting switcher, a community sticker photo-wall carousel with flip notes, an accessible FAQ accordion, and an interactive client-validated guestlist demo pass generator.

## Concept

- **Brand:** STAR RIOT
- **Category:** Fictional neon disco club, dance floor, DJ nights, community, after-dark culture
- **One-line story:** "Disco fever. Future sounds. Zero ordinary nights. Step into the place where the dance floor becomes the whole universe."
- **Central Idea & Signature Mechanic:** A night at Star Riot is an accelerating cosmic orbit—as visitors explore and scroll through the page, the music accelerates and visual intensity builds from warm analog synth washes into an all-out supernova explosion.
- **Mood:** Unapologetic, expressive, cheeky, kinetic, colorful, inclusive, crafted.

## Palette

Color-matched to high-contrast neon night tokens:

| Design Token | Hex | Role |
|---|---|---|
| `--night-0` | `#12041B` | Dominant nearly-black plum canvas |
| `--night-1` | `#1E092B` | Subtle violet depth |
| `--night-2` | `#2C103B` | Layered UI panels, cards, and stub surfaces |
| `--electric-mint` | `#30F0CC` | Primary neon accent, buttons, links, reticles |
| `--hot-pink` | `#FC3CCC` | Secondary neon accent, stars, chips, highlights |
| `--acid-lime` | `#FCF03C` | Graphic pops, starburst tips, high-contrast badges |
| `--electric-purple` | `#9451FF` | Gradient bridge, deep glows, energy waves |
| `--warm-coral` | `#FF9BB0` | Tertiary warm details, sticker accents |
| `--paper-white` | `#FFFDF8` | Crisp display headlines, high-contrast copy |
| `--muted-lilac` | `#CAB9D4` | Supporting descriptions, captions, microcopy |

## Type

- **Display Face:** Anton / Impact / Heavy Condensed Sans (`--font-anton`, `--font-display`) for high-impact uppercase headlines, tightly set with compact leading.
- **UI & Body:** Public Sans / System Sans (`--font-public-sans`, `--font-sans`) for legible copy, navigation, buttons, and badges.
- **Telemetry & Codes:** JetBrains Mono (`--font-jetbrains-mono`, `--font-mono`) for pass codes, BPM readouts, and event timing.

## The Mechanics

1. **Interactive DJ Lineup Deck & Equalizer**:
   - `HeroSection.tsx` features 4 resident DJs with individual BPM ratings (118–126 BPM) and playback speeds.
   - Selecting a DJ dynamically updates the `--bpm-duration` CSS variable, recalculates scrubber width, and drives the pulse rate of the animated equalizer bars.
   - Includes transport controls (Prev DJ, Play/Pause toggle, Next DJ) and set time slot selectors.
2. **Frequency Filter & 3D Poster Tilt**:
   - `NightsSection.tsx` categorizes events by sonic frequency (`All`, `House & Edits`, `Classic Disco`, `Soul & Boogie`).
   - Cards calculate pointer coordinate offsets relative to center and apply real-time 3D rotation (`--tilt-x`, `--tilt-y`).
3. **Scroll-Driven 3-Stage Sound Track**:
   - `SoundStageSection.tsx` evaluates scroll progress via `computeScrollStage` pure logic.
   - Transitions smoothly across three phases:
     - `01. WARM UP` (116 BPM) — Sparse mirror facets and warm analog synth washes.
     - `02. TURN UP` (122 BPM) — Expanding concentric sub-bass waves and sliding dancer silhouettes.
     - `03. ALL OUT` (128 BPM) — Supernova star eruption and peak-hour disco edits.
4. **Sunken Sprung Floor Color Matrix**:
   - `SpaceSection.tsx` lets users test the under-floor lighting matrix, switching dynamic border and glow colors between Electric Mint, Hot Pink, and Acid Lime.
5. **Sticker Wall Carousel & Peel Note Flip**:
   - `MovementSection.tsx` features horizontal snap carousel controls and dual-sided sticker cards with interactive peel note reveals.
6. **Validated Guestlist Pass Generator**:
   - `GuestlistSection.tsx` runs instant client-side validation via `validateGuestlistSubmission`.
   - Generates deterministic simulated digital club pass codes (`SR-XXXX-YYY`) and updates the live floor counter.

## Motion

- **Personality:** Kinetic, rhythmic, springy, vibrant.
- **Choreography:** Radial spotlight ignition mask on load, line-by-line masked headline reveals, spinning vinyl records, pulsing equalizer bars, and smooth scroll interpolation.
- **Reduced Motion:** Gracefully disables ambient spin loops, pinned transitions, and marquee animations under `prefers-reduced-motion: reduce`.

## Signature Details

- Split-color Star Riot brand mark (half Mint, half Hot Pink with central white sparkle).
- Supernova wordmark cutout effect with glowing neon drop shadow.
- Perforated club pass ticket stub with barcode.
- 100% scoped CSS with `sr-` class prefix.
- Zero external image dependencies; rich vector illustration in pure SVG.

## Do / Don't

- **Do:** Maintain at least 70% dark plum/eggplant canvas area so neon pops with cinematic brilliance.
- **Do:** Ensure all buttons, controls, and dialogs have full keyboard and screen-reader accessibility.
- **Don't:** Introduce generic corporate SaaS styling, bland stock photography, or boring grey cards.
- **Don't:** Autoplay audio or use strobe lighting effects that could trigger photosensitivity.
