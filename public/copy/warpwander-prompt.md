# WARP & WANDER — Agent Implementation Prompt

> **Project:** Original 2D pixel-art, side-scrolling product landing page  
> **Fictional brand:** WARP & WANDER (an independent creative concept)  
> **Real featured product:** [Analogue Pocket](https://www.analogue.co/pocket), by Analogue  
> **Experience model:** Scroll-driven, explorable side-scrolling adventure  
> **Deliverable:** A complete, responsive, visually polished Next.js landing page with working interactions, not just a mockup.

## 0. Your mission

Create an extraordinary product landing page that feels like walking into an **original 16-bit-inspired adventure game**. The page promotes the real Analogue Pocket through a fictional creative campaign named WARP & WANDER. The visitor's scroll moves a camera across an interconnected pixel landscape; small opt-in playable interactions reward exploration; the product is presented accurately and prominently.

The website must be delightful even when the user does not play. **This is a marketing landing page, not a game that prevents people from reading product information.** Every feature and CTA must be reachable using normal scrolling, keyboard focus, and a simplified mobile path.

### Mandatory distinction

- WARP & WANDER is **not** Analogue, a reseller, or an officially licensed collaboration. Label it clearly as a fictional independent concept featuring Analogue Pocket.
- Showcase the real hardware accurately. Use original or permission-cleared imagery; do not synthesize distorted hardware ports, buttons, labels, or specifications.
- The interactive world, character, UI, landscapes, music, and story are **original creations**. Do not reproduce Nintendo, Pokémon, Zelda, Mario, Sonic, Metroid, Undertale, Celeste, or other protected game assets, map compositions, music, characters, UI, or trademarked motifs.
- If the earlier LUMEN template is available, it is **motion-behavior reference only**. Learn from its smooth scrolling, easing, entrance cadence, and tactile input feedback. Do not reuse its visual design, layout, components, artwork, copy, floating panels, or glassmorphic surfaces.
- This project must also look nothing like the separate CTRL/ROOM desktop-OS concept. No desktop windows, taskbars, pop-up application panels, or draggable OS UI.

## 1. The product truth

Use only these verified product concepts unless you verify new statements on the manufacturer's site:

- Analogue Pocket is a portable multi-system handheld designed for physical classic game cartridges.
- Out of the box, it supports Game Boy, Game Boy Color, and Game Boy Advance cartridges; optional adapters support certain other cartridge families.
- Its LCD is 3.5 inches with 1600 × 1440 resolution.
- It uses FPGA-based hardware and has other capabilities documented on the official product page.
- Do **not** imply games or cartridges are included, that the fictional game shown on our website ships with Pocket, or that our browser mini-game runs on the physical device.
- Do not invent prices, live stock, promotions, shipping promises, partnerships, or unsupported technical claims.

Official reference: https://www.analogue.co/pocket

## 2. Brand strategy

**Brand name:** WARP & WANDER  
**Campaign identifier:** `WW-01 / THE LOST LEVELS OF PLAY`  
**Tagline:** **EVERY WORLD BEGINS WITH PLAY.**  
**Secondary line:** *Pocket-sized portal. Endless possibility.*

### Brand character

An imaginative exploration club for people who love handheld adventures, playful discovery, and the feeling of finding a secret path. Friendly, curious, cinematic, whimsical, slightly mysterious; never corporate or edgy.

**Audience:** Retro handheld enthusiasts, collectors, design-minded gamers, newcomers interested in tactile play.

**Voice:** Energetic, simple, evocative. Speak like a narrator introducing an adventure rather than a tech-spec reviewer. Keep calls to action direct: `ENTER THE WORLD`, `EXPLORE POCKET`, `SEE THE REAL DEVICE`.

## 3. Visual identity — sunlit pixel fantasy

The site should feel like an original pixel-painted illustrated storybook, not a fake console emulator or clone of an existing commercial video game.

### Exclusive color palette

| Token | Hex | Role |
|---|---|---|
| Twilight Indigo | `#23244F` | Deep horizon / night silhouettes |
| Fern Forest | `#2F644F` | Foliage and foreground ground planes |
| Golden Nectar | `#FFD06A` | Warm light, important highlights, CTA accents |
| Coral Bloom | `#FF907A` | Character accents, collectible effects |
| Daylight Cream | `#FFF1D3` | Text fields, page readability, warm sky |
| Lagoon Mist | `#6DDCC5` | Rivers, magic particles, cool secondary accents |
| Mulberry Shadow | `#604A79` | Distant mountains, detail contrast |

**Do not introduce** the deep charcoal / electric-blue desktop palette designated for CTRL/ROOM. The palettes must remain unmistakably different.

### Type system

- Large headings: a distinctive blocky, **original pixel-inspired display** with legible glyphs. A properly licensed font such as Pixelify Sans can be considered, but avoid making all body copy pixelated.
- Body: readable clean sans serif (e.g. DM Sans or similar).
- Game HUD / metadata: smaller monospaced pixel-font treatment with accessible contrast.
- Avoid 1px text, aggressive text shadows, or reduced readability to preserve authenticity.

### Image grammar

- Build environments on a consistent logical sprite/tile grid (e.g. 16 or 32 logical pixels, chosen once).
- Use nearest-neighbor scaling for scene art; avoid blurred pixel edges.
- Distinct planes: distant sky, mountain silhouettes, midground ruins, walkable ground, foreground foliage.
- Original protagonist: **Pip**, a small caped mapmaker carrying a lantern-shaped compass. Four-direction idle/walk/jump/celebrate poses; neither costume nor silhouette should recall a known character.
- Decorative creatures, cloud shapes, signposts, old bridges, river banks, and secret passages should be consistent with the original world.
- Product photos must remain crisp photographs, **not** passed through a pixel filter. Contrast between pixel world and physically real Pocket is intentional.
- Keep the composition spacious and cinematic; no glass cards, glossy floating dashboards, or trendy gradient blobs.

## 4. Information architecture

The journey is one **continuous connected world**, with narrative milestones serving as clear sections. A small accessible chapter navigator may show progress, but never cover or obstruct the scene.

### ACT 0 — THE PORTAL / HERO

**Primary headline:** `EVERY WORLD BEGINS WITH PLAY.`  
**Support:** `Meet the handheld that brings the classics along for the ride.`  
**CTAs:** `ENTER THE WORLD` (scroll to chapter 1), `MEET ANALOGUE POCKET` (jump to real product chapter).

Composition: enormous pixelated sunrise landscape with layered islands, vines, an ancient stone archway, and Pip waiting at a trail marker. A large, authentic Analogue Pocket photograph appears in a cut-out illustrated portal shape on the opposite side of the scene. It must not resemble the product's real screen content; no unlicensed game screenshot.

Initial load storyboard:

| Time | Motion |
|---|---|
| 0.00–0.20s | Sky and distant mountains establish immediately; text is already readable if motion is disabled. |
| 0.20–0.55s | Original clouds move gently; title assembles in small intentional tile groups. |
| 0.45–0.90s | Pip steps into the scene in a short sprite animation. |
| 0.70–1.20s | Product photo appears through a custom pixel-portal opening, not a fade from a floating card. |
| 1.00–1.45s | CTA and trail marker settle; subtle idle animation begins. |

Hero scroll: for roughly the first 70–100vh of desktop traversal, camera pans horizontally and the forest path moves toward the visitor. This is a natural 2D scene translation with a deliberate exit, not a LUMEN-style pinned collage.

### ACT 1 — THE FOREST OF CARTRIDGES

**Headline:** `OLD ADVENTURES. NEW JOURNEYS.`  
**Product point:** Game Boy, Game Boy Color, and Game Boy Advance cartridge compatibility.

A foreground path leads through trees bearing abstract, original cartridge-shaped artifacts. Collectible artifacts are invented symbols; do not show actual game packaging, logos, or copyrighted characters.

Scroll choreography:

- 0–25%: Camera enters tree canopy; layers separate with mild parallax.
- 25–55%: An artifact is found; a label appears with verified compatibility information.
- 55–80%: Pip crosses a bridge; a second verified piece of information appears.
- 80–100%: Scene leads to the crystalline lake, while landscape palette evolves continuously without section-background seams.

Hover/tap: discovery items animate in 4–6 frame sprites and expose a small semantic tooltip; no gameplay content may exist **only** in hover.

### ACT 2 — THE CRYSTAL LAKE / DISPLAY

**Headline:** `A WINDOW INTO EVERY DETAIL.`  
**Product point:** 3.5-inch, 1600 × 1440 LCD.

An illuminated lake reflects abstract pixel mosaics. The camera pulls toward a real photo of the Pocket's display, where legally cleared imagery or original abstract pixel visuals demonstrate display clarity (never imply original website art is bundled software).

Scroll choreography:

- 0–20%: Lake reflections shimmer using small looping sprite frames.
- 20–50%: View narrows to a geometric reflection, then transitions to real product imagery.
- 50–75%: Verified display specification rises near the device with crisp large type.
- 75–100%: View returns to the world's path, bridging into next act.

Interactive: a labeled `PIXEL VIEW` / `DEVICE VIEW` toggle changes the display illustration and physical product photograph while maintaining accessible copy.

### ACT 3 — THE CLOCKWORK RIDGE / PRECISION

**Headline:** `BUILT FOR THE WAY PLAY FEELS.`  
**Product point:** Physical buttons, hand-held form, FPGA-focused design.

Pip climbs a mechanical ridge with original moving gears and lifts. A device close-up shows the **real** buttons and build from licensed photography. No fictional additional controls.

Scroll choreography: gears turn only while in view; a mechanical elevator climbs as the timeline advances; text enters with a measured 120–180ms cascade. Avoid a giant technical specs table.

Interactive: choose a product feature marker to show a concise description and corresponding actual hardware photograph. The UI can feel tactile but **not** like a faux operating system.

### ACT 4 — THE CLOUD CITY / PLAYFUL INTERLUDE

**Headline:** `FOLLOW THE NEXT LITTLE ADVENTURE.`

This is a **short, optional original browser mini-game**, not a claim about the physical product. Pip can jump between a few floating platforms and collect three compass shards. The challenge must be accessible, easy, and skippable.

- Desktop: arrow keys / A-D to move; Space / W / Up to jump.
- Mobile: large visible left/right/jump touch controls only while mini-game is active.
- Provide `SKIP GAME` and `CONTINUE JOURNEY` controls at all times.
- No forced account, high score backend, save requirement, or deceptive game download.
- Completion triggers a short sprite celebration and a nonessential narrative collectible; visitors can continue even without playing.
- When keyboard game mode is active, keyboard handling must be scoped to the game and never globally hijack normal text input or accessibility shortcuts.

### ACT 5 — THE LAST GATE / PRODUCT REVEAL

**Headline:** `THE ADVENTURE FITS IN YOUR HANDS.`  
**Support:** `A tribute to portable play, made for real cartridges and real moments.`

The fantasy environment opens into a softly illuminated chamber. Pixel scenery recedes into a framing border while the physical Analogue Pocket occupies the central composition with accurate, high-resolution photography.

Feature summary: compatibility, screen, tactile handheld form. Keep facts verified and concise.

**Primary CTA:** `DISCOVER ANALOGUE POCKET` → https://www.analogue.co/pocket  
**Secondary CTA:** `REPLAY THE JOURNEY` → scroll to hero and reset only nonpersistent visual scene progression.

Visible footer disclaimer: `WARP & WANDER is an independent fictional design concept. Analogue Pocket is a product of Analogue. No affiliation or endorsement is implied.`

## 5. Motion grammar

The motion concept is **travel**, not UI transitions.

- World scrolling: long, smooth camera translation on the X-axis, correlated with vertical document scroll. Users still scroll vertically with normal browser input.
- Continuous atmosphere: all world sections share the same connected scene/sky logic; there must be no horizontal bands or mismatched section backgrounds.
- Parallax ratios (starting targets): far sky `0.15`, mountains `0.30`, midground `0.58`, foreground `1.0`. Tune visually; avoid causing motion sickness.
- Sprite motion: discrete frame-based steps appropriate to game animation, independent of page frame rate.
- Typography: deliberately stepped tile reveals, distinct from LUMEN masked word rises.
- Environment scene changes: portal openings, walk-behind foreground elements, background palette shift, and illustrated wipes.
- Pointer feedback: collectible object emits a 3-frame pulse and 2–4px lift; keyboard focus shows an equally clear state.
- Micro-interactions: buttons depress 2px, ground shadows compress, particles appear sparingly.
- Product photography: smoothly animate transform and opacity, but keep photographs sharp rather than pixelating the device.
- Scroll cues must be explicit and accessible. Optional ambient sound is **off by default**.

Suggested baseline timings:

| Motion | Duration | Easing |
|---|---:|---|
| Button press | 100–160ms | steps for sprite/pixel graphics |
| Tooltip arrival | 180–260ms | ease-out |
| Tile/text reveal | 500–850ms | stepped / grouped |
| Product photo reveal | 700–1100ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Camera travel | Scroll-scrubbed | no secondary smoothing beyond scroll driver |
| Sprite idle | 4–8 frames cyclic | discrete frame timing |

## 6. UX details

### Header

An original compact field-guide bar: `WARP & WANDER` wordmark, trail map button, jump-to-product link, and optional sound toggle. No rounded floating glass pill navbar. On desktop it can be anchored near the illustrated scene edge; on mobile use a simple sticky text header.

### Progress

A tiny compass-trail indicator marks the current act; each marker jumps to a semantic section heading. Announce changes politely, not continuously.

### Reading experience

Every act has a DOM-backed section with semantic heading, copy, and real CTA. Do not bake important copy inside a game canvas or bitmap. A visually delightful canvas may sit behind or beside accessible HTML content.

### Responsive design

- `>= 1024px`: full horizontal camera journey driven by vertical scrolling, with pinned scenes only where beneficial.
- `768–1023px`: reduced travel distance and parallax; readable shorter compositions.
- `< 768px`: primarily vertical illustrated scenes with small horizontal movements; no scroll hijacking or tiny mini-game controls.
- `prefers-reduced-motion`: still illustrations, simple cuts, static product imagery, all chapters available without pinning.
- Device memory/performance concerns: reduce particles, frame rate, and atlas sizes; preserve user control.

## 7. Technical architecture

Use Next.js App Router + TypeScript. Suggested libraries:

- React components for semantic content, buttons, and product information.
- GSAP + ScrollTrigger for desktop scene scrub and deliberate transitions.
- Native Canvas 2D or PixiJS for original sprite environments; choose **one** scene renderer, not multiple competing render pipelines.
- Optional Lenis smoothing on desktop only; synchronize with ScrollTrigger and disable for touch/reduced-motion.
- Lightweight React state or Zustand for scene/game flags. Avoid React re-renders for every animation frame.
- `image-rendering: pixelated` for nearest-neighbor rendered sprite assets; standard high-quality rendering for product photographs.

Suggested structure:

```text
src/
  app/page.tsx
  app/globals.css
  components/site/FieldGuideNav.tsx
  components/site/ChapterContent.tsx
  components/site/ProductCTA.tsx
  components/world/WorldCanvas.tsx
  components/world/WorldCamera.tsx
  components/world/ParallaxLayers.tsx
  components/world/SpritePlayer.tsx
  components/world/ArtifactHotspot.tsx
  components/game/CloudCityMiniGame.tsx
  components/motion/ScrollJourney.tsx
  lib/world/worldMap.ts
  lib/world/sceneTimelines.ts
  lib/world/spriteAnimations.ts
  lib/game/gameState.ts
  lib/motion/preferences.ts
public/assets/pixel-world/
public/assets/product/
```

Rules:

1. Use a single scroll driver; avoid double RAF/smoothing loops.
2. Use `gsap.context`/proper cleanup; kill animations and remove observers/listeners on unmount.
3. Use `ResizeObserver` and recalculate scene dimensions after orientation/layout changes.
4. Keep main headings, product claims, attribution, and CTA in accessible HTML.
5. The optional mini-game may use canvas, but expose all menu/control states in accessible HTML.
6. Keep scene memory manageable through atlases, compressed image assets, and lazy-loaded later acts.
7. Do not fabricate a 3D model or use WebGL just to make the site feel “premium.” The product should remain a 2D pixel-world experience.

## 8. Asset-generation checklist

Create **original** assets. If assets are unavailable, make elegant purpose-built vector/canvas placeholders that fit the art direction; do not use copyrighted random sprite sheets or unrelated stock photos.

1. Original Pip character sprite sheet: idle, walk, jump, discovery, celebrate; a consistent sprite grid, transparent PNG/WebP.
2. Seamless scene background atlas: daybreak valley, forest, crystal lake, gear ridge, cloud city, final gate.
3. Near/far environment layers with seamless join geometry and appropriately matched horizon lines.
4. Original collectible/compass artifacts and 4–6-frame interactive sprite effects.
5. Fully custom WARP & WANDER pixel-wordmark and compass symbol.
6. One authentic Pocket hero photograph; one front view; one screen close-up; one tactile detail photo, with permission/licensing handled.
7. Device-frame-aware original illustration for screen demos (not fake claimed gameplay from the product).
8. Optional original, short ambient/success sound cues; no copyrighted game music, all opt-in.

### Production asset prompts for image-generation assistance

- **Sunrise landscape:** `Original 2D pixel art side-scrolling panorama, golden dawn over layered fern valleys, tiny invented ruins, small bridges, atmospheric perspective, consistent 16-bit-inspired tile scale, nearest-neighbor hard pixel edges, no existing game references, no text, separate parallax-ready depth composition.`
- **Forest:** `Original 2D pixel art enchanted forest level, oversized round leaves, teal streams, warm sunlight patches, navigable winding trail, warm whimsical atmosphere, coherent pixel grid, hard pixel edges, no recognizable franchise characters, landscape panoramic composition.`
- **Crystal lake:** `Original pixel art lake with abstract luminous geometric reflections, lavender mountains, soft cyan water, sparkling pixel clusters, whimsical adventure environment, panoramic, consistent sprite scale, no UI overlays.`
- **Clockwork ridge:** `Original 2D pixel art mechanical cliff landscape, handmade gears and lifts, warm brass and moss, friendly adventure tone, panoramic layered scene, no existing game asset motifs.`
- **Cloud city:** `Original charming pixel art floating cloud village, gentle wind currents, simple stepping platforms, warm afternoon sun, abundant open negative space for gameplay, original character-free environment.`
- **Final gate:** `Original pixel art luminous ancient gate chamber, golden light opening, fern motifs and soft stone geometry, strong central void reserved for a separate real product photograph, no device invented in artwork.`

Do not try to generate an “Analogue Pocket” photograph from memory if product precision cannot be guaranteed; source approved real product photography instead.

## 9. Build order

**Phase A — Original art direction:** Set tokens, typescale, Pip design, tile scale, chapter artboards, mobile layout, and content hierarchy. Review static screenshots with all animation off.

**Phase B — World assembly:** Build reusable scene renderer, parallax layers, world map, and scroll-to-camera coordination. Confirm continuous joins, normal scrolling, and no black gaps.

**Phase C — Hero and product storytelling:** Implement hero animation, forest, lake, ridge, final gate, clear product credit, and genuine manufacturer CTA.

**Phase D — Interaction:** Implement collectibles, tooltips, optional mini-game, compass navigation, sound controls, and scene replay.

**Phase E — Hardening:** Test responsive layouts, keyboard, touch, reduced motion, low-powered devices, browser back navigation, and CTA analytics hooks if present.

## 10. Acceptance criteria

- [ ] A distinctive WARP & WANDER fictional brand, clearly separate from Analogue.
- [ ] The real Analogue Pocket is identifiable, accurate, properly credited, and linked to its official product page.
- [ ] Original illustrated pixel-world landscapes; **no** borrowed game sprites, protected characters, or copied level design.
- [ ] A seamless scroll-driven world with at least five meaningful scenes and no visible background seams.
- [ ] Functional discoverable product information and obvious CTA without requiring gameplay.
- [ ] At least three meaningful interactive scene objects, visible keyboard focus, and touch support.
- [ ] A functioning, optional, accessible mini-game with skip path.
- [ ] Mobile responsive and reduced-motion alternatives that retain the entire sales story.
- [ ] Smooth transitions, no scroll trapping, no layout jumping, and no perpetual offscreen animation.
- [ ] All product claims verified against official sources; no invented sale/inventory claims.
- [ ] Visually independent of LUMEN and of CTRL/ROOM.

### Final instruction to agent

**Build a world that sells the feeling of discovering play, then reveals a real product as the way to carry that feeling.** Do not collapse this specification into a generic hero + three cards + FAQ landing page. Deliver a working, responsive experience with original assets, strong semantic HTML, and finished interaction behavior.
