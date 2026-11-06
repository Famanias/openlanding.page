# Riff — Music-First Dating

## Requirements

Riff is an isolated Next.js App Router template located at `/riff` representing an independent 18+ music-first dating app and community zine (*Fall for the sound before the selfie*). The application matches music lovers through shared vinyl crates, zero-skip albums, gig rituals, and nocturnal listening chemistry rather than surface-level selfie swiping.

The page features:
1. A sticky editorial navigation bar with custom drawn SVG waveform logo, section jumps, and concept preview pass trigger.
2. A dual-phone hero showcase displaying interactive listener profiles (Mila & Julian), soundwave animations, flipping vinyl records, and shared track discovery.
3. An editorial manifesto wheat-pasting torn-paper headline strips and 3 expandable product principles.
4. "The First Three Tracks" interactive progress rail simulating tape/needle tracking with perforated paper ticket stubs.
5. A dual-phone "Music Chemistry" comparison unit highlighting shared records, concert energy, and synchronized late-night hours.
6. "The Scene" playlist wall featuring interactive gatefold record sleeves, liner notes, tracklists, and one-click icebreaker copy.
7. Real listener stories, cultural values, and an interactive local backstage pass stamper dialog.

## Concept

A gritty, analog photocopied music zine fused with a high-fidelity dark-mode mobile UI:
- **Canvas:** Matte deep obsidian `#0B0B0B` with subtle analog photographic grain overlay (`noise-tile.png`) and halftone dot screen patterns.
- **Typography:** Bodoni Moda editorial serif for emotive headlines, Barlow Condensed for high-impact gig posters, Plus Jakarta Sans for refined UI legibility, and JetBrains Mono for track numbers, timestamps, and ticket serials.
- **Color Accents:** Screenprint Crimson `#C92533`, Deep Red `#741B24`, and Newsprint Bone `#F4F0E8`.
- **Physical Motifs:** Torn zine paper edges (`clip-path: polygon(...)`), perforated concert ticket stubs, spinning 12-inch vinyl with specular light sheen, and hand-inked star stickers.

## Palette

- **Riff Black:** `#0B0B0B` (primary dark canvas, deep slabs)
- **Riff Ink:** `#141414` (elevated panels, phone casings, card backgrounds)
- **Riff Paper / Bone:** `#F4F0E8` (primary typography, wheat-pasted poster strips)
- **Riff Crimson:** `#C92533` (signature accent, primary actions, active tabs, waveform peaks)
- **Riff Deep Red:** `#741B24` (vinyl label borders, halftone crimson gradients)
- **Riff Muted Grey:** `#AAA8A6` (secondary copy, curator notes, liner details)
- **Riff Dim:** `#777575` (timestamps, subtle rules, track lengths)
- **Riff Hairline Rule:** `rgba(244, 240, 232, 0.22)` (structural separators, card outlines)

## Type

- **Editorial Headings:** `Bodoni Moda` (700, 800, 900 italic) for expressive, romantic, and cultural statements (`--font-bodoni-moda`).
- **Display & Poster Headers:** `Barlow Condensed` (600, 700, 800 italic) for gig flyer text, ticket stubs, and profile badges (`--font-barlow-condensed`).
- **UI & Body:** `Plus Jakarta Sans` (400, 500, 600, 700) for UI copy, dialogs, and navigation (`--font-plus-jakarta`).
- **Liner Notes & Telemetry:** `JetBrains Mono` (400, 500, 600) for track lengths, serial codes, match percentages, and timestamps (`--font-jetbrains-mono`).

## Layout & Structure

1. **Top Navigation Header**: Sticky container with 3-zone layout (Brand waveform, navigation links, and screenprint red "Join Riff" button).
2. **Hero Section (Two Phones, One Chemistry)**: 12-column grid featuring Mila's profile (Phone 1), Julian's profile (Phone 2), interactive vinyl player with side A/B flipping, and shared track selector (`Kyoto`, `Starburster`, `Chaise Longue`).
3. **Manifesto Section**: Wheat-pasted torn paper banners ("THERE'S MORE TO A PERSON THAN A PHOTO"), pull-apart quote accordion, and three product principles ("Taste first", "Connection second", "Meet when ready").
4. **How It Works (Three Tracks)**: Scrubbable audio progress rail with step indicators and an interactive perforated backstage ticket stub.
5. **Music Chemistry Case Study**: Three-tab interactive phone comparator contrasting favorite records, concert energy, and late-night listening habits.
6. **The Scene Playlist Wall**: Filterable 6-sleeve playlist grid with expandable gatefold sleeve viewer, liner notes, track durations, and copyable conversation starters.
7. **Stories & Backstage Pass**: Real connection stories in zine format, and a client-side early-access ticket pass generator.

## The Mechanics

1. **Jaccard Taste Overlap Algorithm (`calculateTasteOverlap`)**:
   - Calculates set intersection over union for genres and listening habits.
   - Computes weighted score: baseline (18-24%) + genre ratio (up to 46%) + habit ratio (up to 27%).
   - Generates contextual conversation starters based on specific shared artists or listening times.
2. **Vinyl Physics & Rotation (`VinylDisc`)**:
   - Specular conic gradient highlights simulated reflection angle.
   - Smooth 24s linear ambient rotation with toggleable 3.2s high-speed spin mode.
   - Interactive side A / side B label flipping.
3. **Local Backstage Pass Stamper**:
   - Validates user handle and anchor record with zero server latency or data leakage.
   - Issues deterministic `#RF-XXXXXX` serial pass rendered inside a perforated ticket frame.
4. **Accessible Motion System**:
   - Global motion toggle button in footer and mobile menu.
   - Automatic adherence to `prefers-reduced-motion: reduce`.
