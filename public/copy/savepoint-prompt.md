# Rebuild SAVEPOINT. — Every cartridge holds a world.

Build a complete, isolated fictional game archive at `/savepoint` in Next.js App Router, React, TypeScript and Tailwind v4. Use imperative Three.js, GSAP with ScrollTrigger and Zustand. Read the installed Next.js documentation before using its APIs. Do not use React Three Fiber or Drei. All source belongs in `src/app/(savepoint)/`; imports must be installed packages or relative imports contained in that route group. Every interactive component, SavepointApp.tsx and page.tsx starts with `'use client';`. Keep the layout a server component for fonts and metadata.

This is an imaginary collection, not a store, emulator or playable game service. Use no checkout, trailer, download or licensing claims. Build all five sections and the reversible physical game-detail interaction. Every control must work and every game record must be complete.

## Assets

Reuse the supplied assets, unchanged, from `/templates/savepoint/`. The six hardware references are `deck-01-three-quarter.png`, `deck-01-front.png`, `deck-01-slot-detail.png`, `cartridge-shell-front.png`, `cartridge-shell-three-quarter.png` and `cartridge-shell-rear.png`. For every game ID in the complete catalog below, the label is `label-<id>.png` and the matching world plate is `world-<id>.webp`. All 26 originals are required. Preserve label aspect ratios; never substitute generic artwork or remote photos. Put the icon, generated textures and previews in the same public directory, with the gallery preview at `/gallery/savepoint.webp`.

## Visual direction

Dark, tactile, editorial and spacious. Use charcoal #121419, deep #0B0D12, surfaces #1B1F28 and #252934, warm white #F2F0E8, muted #A9ADB7, thin warm-white rules at 15% opacity, and functional acid lime #CDF266. Violet #7971B7 and coral #F47D62 are secondary accents. The ten approved worlds supply the color. Load Space Grotesk for display, IBM Plex Mono for utility and Plus Jakarta Sans for body through next/font/google, with system fallbacks. No generic SaaS feature grids, neon backgrounds, fake CRT noise or split headline/illustration hero.

## Section 01 — The archive

Header: SAVEPOINT. wordmark; working ARCHIVE, THE DECK, MANIFEST and INDEX anchors; status `10 WORLDS / 01 CONSOLE`. Center the heading `EVERY CARTRIDGE / HOLDS A WORLD.` above `Ten strange little universes. One console. Pick a cartridge and press start.`

Render a real infinite rail of thirty physical cartridges using one reusable shell factory. Show the active cover raised and turned outward at center, with neighboring spines spreading apart. Give each game its real artwork, crisp title band, accent and readable spine. Render realistic matte polymer, soft lighting and contact shadows. A floating index damps toward an integer target, wraps without gaps and drives spread, opening and caption direction. Provide previous/next buttons, keyboard arrows, raycast selection, horizontal drag/swipe with a six-pixel click threshold, and horizontal wheel browsing. Vertical scrolling must stay native. Clicking an inactive spine selects; clicking the active cover boots. Drag release only snaps. Keep React updates out of the frame loop.

Below: index, title, year, genre, `BOOT THIS GAME ↗`, `CHOOSE A WORLD. INSERT TO BEGIN.`, navigation instructions and `SCROLL TO DISCOVER ↓`. Keep the whole hero centered and usable in one viewport, including a 390×844 phone.

## Procedural hardware and physical boot

Use the img2threejs workflow against all six reference renders to construct `createDeck01Model.ts` and `createCartridgeModel.ts`; preserve staged geometry and reference comparisons, semantic parts, materials, anchors and assembly controls. DECK/01 is the approved low charcoal wedge with an inclined wide landscape screen, real recessed rear/top slot, four front controls, vent ribs, seam and lime LED. Never replace it with an upright monitor. The universal shell has a recessed front label, grip marks, rear screws, seam and connector tongue.

Console dimensions: width 2.4, depth 2.745, front height about .30, rear 1.08. Slot local width .99, depth .18, entrance y=1.075 and z=-1.05, floor y=.76, dock y=.84, alignment y=1.55. Expose Object3D slotEntrance, slotAlignment, slotFullyInserted and screenPlane anchors. Transform anchors to world space before interpolating cartridge position and quaternion. These coordinates must agree with actual modeled geometry.

One main scene owns the rail, active cartridge, console and camera. Choreograph archive → extracting → console-entering → aligning → inserting → booting → screen-expanding → game-detail. Retreat neighboring objects and pull the camera back during extraction so the moving cartridge stays framed. Align directly above the aperture, seat the connector down its vertical axis, and clip only the active shell below the cavity rim. Wake the physical screen with READING ROM and WORLD FOUND telemetry plus the correct world art. Project all four screen-plane corners into viewport coordinates; expand the semantic HTML takeover from that actual quadrilateral. Never open detail by a fake unrelated image swap.

Support SKIP INTRO, early Escape cancellation, reverse physical ejection, repeated boot/return cycles, focus restoration, reduced motion, `?game=<id>` deep links and browser Back/Forward. The dialog uses the matching world plate, large title, metadata, tagline, full description, WORLD NOTES and ARCHIVE DATA, with working previous/next world and BACK TO ARCHIVE actions. Trap focus, make background sections inert and lock body scrolling while busy. Dispose timelines, listeners, observers, frame loops, geometries, materials and textures on unmount. WebGL failure must preserve an accessible image archive and boot/back controls.

## Section 02 — Hardware interlude

Heading `ONE CONSOLE. INFINITE DETOURS.` Use a lightweight imperative secondary canvas with the same DECK/01 factory. Provide four real camera/callout presets: `01 / INCLINED WIDE APERTURE`, `02 / TOP-LOADING SLOT CAVITY`, `03 / TACTILE DECK CONTROLS`, `04 / VENTED POLYMER CHASSIS`. Show a downward alignment guide in the slot view and a working diagnostic wireframe toggle. Pair this studio with all three approved deck references and cartridge front/rear studies. Pause rendering with IntersectionObserver offscreen; render only on invalidation or camera motion. Own and dispose its resources independently of the primary scene. Supply a reference-image fallback if unavailable.

## Section 03 — Manifesto

Heading `THE BEST WORLDS DON'T ASK YOU TO HURRY.` Write a short, thoughtful essay about curiosity, self-contained worlds, physical-media rituals and memory slots. Layer cropped Mossheart and Deep Current world plates next to the text with small archive annotations. Scope restrained GSAP ScrollTrigger clipped-line reveals and subtle image parallax to this section; reduced motion shows everything immediately. Keep the continuous charcoal background and generous editorial rhythm.

## Section 04 — Complete catalog

Heading `FIND YOUR NEXT DETOUR.` List all ten games as open artwork/editorial rows, with actual world art, a smaller matching label, SVP-01 through SVP-10, year, genres and hook. Stack rows on mobile. Filters: ALL (ten); EXPLORATION (Lost Signal, Mossheart, Deep Current); MYSTERY & HORROR (Dead Channel, Ghost Frequency); ACTION & ARCADE (Turbo Saints, Neon Ruins, Sunken Arcade); STRATEGY & FANTASY (Mossheart, Moon Relay, Paper Kingdom). Expose selection using aria-pressed and announce the result count.

Every row has working SELECT ON SHELF and INSERT & BOOT actions. Select the correct shortest wrapped target and scroll/focus the archive. For boot, wait for scrolling to reach the stage and for the physical rail to settle, then run the full insertion sequence. Do not use arbitrary timeouts or directly jump to detail. A new browse gesture cancels a pending request.

## Section 05 — Footer and cursor

Heading `YOUR NEXT WORLD IS WAITING.` Provide `RETURN TO THE CARTRIDGES ↑`, which scrolls to the hero and focuses its boot control. Footer contains SAVEPOINT., `10 ARCHIVED WORLDS / REVISION 01`, `AN IMAGINARY COLLECTION, BUILT TO BE EXPLORED`, the four working anchors and a clearly fictional copyright note. Add a fine-pointer-only cursor enhancement: understated outline ring, smaller over spines and acid-lime BOOT pill over the active cover. Keep native cursor and visible semantic actions; never show it on touch or make it necessary.

## Release requirements

Use relative route-local imports and public template asset URLs. Include DESIGN.md, this complete rebuild prompt, icon and gallery previews. Register the template in the gallery and copy-bundle metadata with all runtime dependencies. Run `npm run check`, copy-bundle generation, TypeScript, `npm run test` and `npx playwright test tests/e2e/savepoint.spec.ts`. Verify 1920×1080, 1366×768, 1024×768, 768×1024 and 390×844, keyboard-only use, touch, reduced motion, filters, all anchors, history, context recovery and repeated physical boot/eject. Require zero page errors, hydration warnings, missing media or horizontal overflow. Record real results and model evidence in VERIFICATION.md and MILESTONE_STATUS.json.

## Complete game catalog

Use the following records verbatim as the runtime content source. Artwork URLs point to the approved local files.


```json
[
  {
    "id": "lost-signal",
    "title": "Lost Signal",
    "year": 1998,
    "genre": [
      "Sci-fi",
      "Exploration",
      "Puzzle"
    ],
    "accent": "#8BAAF7",
    "hook": "A distant transmission draws a lone explorer into a forgotten planetary observatory.",
    "tagline": "Some messages were never meant to be answered.",
    "description": "Beyond the mapped edge of the system, an abandoned observatory has begun transmitting again. Cross silent canyons, restore forgotten relays, and uncover who \u2014 or what \u2014 is still listening.",
    "worldNotes": [
      "The observatory was built to record the sky. Its final log contains a voice from beneath the planet.",
      "Every relay restores a fragment of a conversation that began before the station existed."
    ],
    "indexNumber": "01",
    "archiveSpecs": {
      "catalogCode": "SVP-01 / 98",
      "romCapacity": "64 MEGABIT MASK ROM",
      "saveBattery": "SRAM + LITHIUM CELL (3 SLOTS)",
      "perspective": "ISOMETRIC / FIXED TELEMETRY"
    },
    "labelUrl": "/templates/savepoint/label-lost-signal.png",
    "worldUrl": "/templates/savepoint/world-lost-signal.webp"
  },
  {
    "id": "mossheart",
    "title": "Mossheart",
    "year": 1996,
    "genre": [
      "Fantasy",
      "Adventure"
    ],
    "accent": "#9EBC7B",
    "hook": "Ancient machinery sleeps beneath a forest that remembers everything.",
    "tagline": "The roots remember your name.",
    "description": "Follow a wandering seedkeeper into the green machinery beneath an ancient woodland. Mend forgotten engines without breaking the living roots that have made them home.",
    "worldNotes": [
      "Trees archive their memories in rings of copper and sap. Read the oldest trunks to find paths that have vanished.",
      "Repair changes the forest rather than resetting it; each awakened machine earns its place in the canopy."
    ],
    "indexNumber": "02",
    "archiveSpecs": {
      "catalogCode": "SVP-02 / 96",
      "romCapacity": "32 MEGABIT MASK ROM",
      "saveBattery": "EEPROM (2 GARDENS)",
      "perspective": "TOP-DOWN / HAND-PAINTED"
    },
    "labelUrl": "/templates/savepoint/label-mossheart.png",
    "worldUrl": "/templates/savepoint/world-mossheart.webp"
  },
  {
    "id": "turbo-saints",
    "title": "Turbo Saints",
    "year": 1999,
    "genre": [
      "Arcade",
      "Racing"
    ],
    "accent": "#F58A5C",
    "hook": "Chase sunset, speed and the final finish line across impossible highways.",
    "tagline": "One last lap before the sun goes out.",
    "description": "Race a crew of roadside legends across highways suspended over a burning sea. Trade clean corners for dangerous shortcuts as the sunset clock counts down the final championship.",
    "worldNotes": [
      "Each driver carries a cassette recorded for someone waiting at the finish. The radio reveals their stories between races.",
      "Roads fold through abandoned toll booths, coastal flyovers and the ruins of a city built around speed."
    ],
    "indexNumber": "03",
    "archiveSpecs": {
      "catalogCode": "SVP-03 / 99",
      "romCapacity": "96 MEGABIT MASK ROM",
      "saveBattery": "EEPROM / LAP RECORDS",
      "perspective": "CHASE CAMERA / ARCADE"
    },
    "labelUrl": "/templates/savepoint/label-turbo-saints.png",
    "worldUrl": "/templates/savepoint/world-turbo-saints.webp"
  },
  {
    "id": "dead-channel",
    "title": "Dead Channel",
    "year": 2001,
    "genre": [
      "Horror",
      "Mystery"
    ],
    "accent": "#D45E66",
    "hook": "A broadcast from a town erased from every map refuses to go silent.",
    "tagline": "Stay tuned. Stay inside.",
    "description": "A late-night television repair leads you to a town absent from every map. Follow its emergency broadcasts through empty rooms and discover why every screen is showing tomorrow.",
    "worldNotes": [
      "The broadcast schedule is the only reliable clock in town. Missing a program changes what waits outside.",
      "Domestic spaces repeat with subtle errors: an extra door, a photograph turned around, a voice one room ahead."
    ],
    "indexNumber": "04",
    "archiveSpecs": {
      "catalogCode": "SVP-04 / 01",
      "romCapacity": "128 MEGABIT MASK ROM",
      "saveBattery": "SRAM (1 TRANSMISSION)",
      "perspective": "FIXED CAMERA / ANALOGUE"
    },
    "labelUrl": "/templates/savepoint/label-dead-channel.png",
    "worldUrl": "/templates/savepoint/world-dead-channel.webp"
  },
  {
    "id": "moon-relay",
    "title": "Moon Relay",
    "year": 1997,
    "genre": [
      "Puzzle",
      "Strategy"
    ],
    "accent": "#D9C68E",
    "hook": "Reconnect a silent lunar network one brilliant circuit at a time.",
    "tagline": "A small light. A very long way home.",
    "description": "Route power across a stranded lunar communications network. Balance fragile circuits, moving shadows and limited reserves to carry one final message back to Earth.",
    "worldNotes": [
      "Sunlight travels slowly across the crater floor, turning safe routes into frozen gaps.",
      "Every station holds a handwritten message from its former operator; reconnecting them assembles a shared farewell."
    ],
    "indexNumber": "05",
    "archiveSpecs": {
      "catalogCode": "SVP-05 / 97",
      "romCapacity": "24 MEGABIT MASK ROM",
      "saveBattery": "EEPROM / 12 CIRCUITS",
      "perspective": "ORTHOGRAPHIC / GRID"
    },
    "labelUrl": "/templates/savepoint/label-moon-relay.png",
    "worldUrl": "/templates/savepoint/world-moon-relay.webp"
  },
  {
    "id": "neon-ruins",
    "title": "Neon Ruins",
    "year": 2002,
    "genre": [
      "Action",
      "Platformer"
    ],
    "accent": "#B58AF5",
    "hook": "Carry a forbidden signal across the rooftops of a collapsing neon city.",
    "tagline": "Keep the signal moving.",
    "description": "Leap between unstable towers in a city dismantling itself at dawn. A stolen transmitter is your only weapon, opening routes through the electric ghosts of its infrastructure.",
    "worldNotes": [
      "The skyline is a circuit diagram. Redirecting current can save a platform and darken an entire neighborhood.",
      "Billboards preserve fragments of a language the city has ordered its residents to forget."
    ],
    "indexNumber": "06",
    "archiveSpecs": {
      "catalogCode": "SVP-06 / 02",
      "romCapacity": "128 MEGABIT MASK ROM",
      "saveBattery": "FLASH / CHECKPOINTS",
      "perspective": "SIDE-SCROLLING / PARALLAX"
    },
    "labelUrl": "/templates/savepoint/label-neon-ruins.png",
    "worldUrl": "/templates/savepoint/world-neon-ruins.webp"
  },
  {
    "id": "paper-kingdom",
    "title": "Paper Kingdom",
    "year": 1995,
    "genre": [
      "Tactical",
      "Fantasy"
    ],
    "accent": "#D99B79",
    "hook": "Rewrite the fate of a kingdom folded from maps, letters and memories.",
    "tagline": "Every fold changes the story.",
    "description": "Command a tiny court across maps that fold into mountains and letters that become bridges. Rewrite a disputed inheritance with careful tactics and the memories hidden in the margins.",
    "worldNotes": [
      "Units carry histories on their reverse sides. Turning a soldier over can reveal a diplomat.",
      "Rain is the kingdom\u2019s oldest enemy; protecting an archive may matter more than holding a fortress."
    ],
    "indexNumber": "07",
    "archiveSpecs": {
      "catalogCode": "SVP-07 / 95",
      "romCapacity": "16 MEGABIT MASK ROM",
      "saveBattery": "SRAM / 3 CHRONICLES",
      "perspective": "ISOMETRIC / TURN-BASED"
    },
    "labelUrl": "/templates/savepoint/label-paper-kingdom.png",
    "worldUrl": "/templates/savepoint/world-paper-kingdom.webp"
  },
  {
    "id": "deep-current",
    "title": "Deep Current",
    "year": 2000,
    "genre": [
      "Underwater",
      "Exploration"
    ],
    "accent": "#64C1C2",
    "hook": "Descend beyond the last charted depth in a fragile research vessel.",
    "tagline": "There is still light below.",
    "description": "Pilot a fragile survey vessel past the last marked contour on the ocean floor. Listen to the hull, ration your power and follow an impossible light into the deep.",
    "worldNotes": [
      "Sonar reveals architecture where geology should be. No two survey passes return the same shape.",
      "The cabin is a small refuge: a thermos, a notebook and a window that becomes a mirror as you descend."
    ],
    "indexNumber": "08",
    "archiveSpecs": {
      "catalogCode": "SVP-08 / 00",
      "romCapacity": "96 MEGABIT MASK ROM",
      "saveBattery": "SRAM / DIVE LOG",
      "perspective": "FIRST-PERSON / SONAR"
    },
    "labelUrl": "/templates/savepoint/label-deep-current.png",
    "worldUrl": "/templates/savepoint/world-deep-current.webp"
  },
  {
    "id": "ghost-frequency",
    "title": "Ghost Frequency",
    "year": 2003,
    "genre": [
      "Rhythm",
      "Mystery"
    ],
    "accent": "#B4A2F3",
    "hook": "Decode the city hidden between music, static and midnight transmissions.",
    "tagline": "Somewhere between stations, a city listens.",
    "description": "Tune a pirate receiver to rhythms that reveal a second city after midnight. Follow missing musicians through its stations and reconstruct the song that keeps its streets from disappearing.",
    "worldNotes": [
      "Each district occupies a different band of the spectrum. Their melodies overlap at places the map cannot show.",
      "Silence is a deliberate note; listening without playing can reveal an entirely different route."
    ],
    "indexNumber": "09",
    "archiveSpecs": {
      "catalogCode": "SVP-09 / 03",
      "romCapacity": "128 MEGABIT MASK ROM",
      "saveBattery": "FLASH / MIX TAPES",
      "perspective": "SIDE VIEW / RHYTHMIC"
    },
    "labelUrl": "/templates/savepoint/label-ghost-frequency.png",
    "worldUrl": "/templates/savepoint/world-ghost-frequency.webp"
  },
  {
    "id": "sunken-arcade",
    "title": "Sunken Arcade",
    "year": 1994,
    "genre": [
      "Surreal",
      "Platformer"
    ],
    "accent": "#F2A57C",
    "hook": "Beneath the waves, every arcade cabinet opens another dream.",
    "tagline": "One more coin. One more dream.",
    "description": "Explore a drowned amusement hall where each glowing cabinet opens a pocket universe. Collect forgotten tokens and follow the tide toward the machine still waiting for its first player.",
    "worldNotes": [
      "The water never reaches the screens. Their glow draws tiny schools of fish through the abandoned aisles.",
      "Dreams borrow pieces from neighboring games, turning familiar platforms into shifting conversations."
    ],
    "indexNumber": "10",
    "archiveSpecs": {
      "catalogCode": "SVP-10 / 94",
      "romCapacity": "16 MEGABIT MASK ROM",
      "saveBattery": "PASSWORD / TOKEN LEDGER",
      "perspective": "SIDE-SCROLLING / DREAM LOGIC"
    },
    "labelUrl": "/templates/savepoint/label-sunken-arcade.png",
    "worldUrl": "/templates/savepoint/world-sunken-arcade.webp"
  }
]
```
