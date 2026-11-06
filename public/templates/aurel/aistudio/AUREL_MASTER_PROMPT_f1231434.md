# AUREL — Complete Landing Page Implementation Master Prompt

> **Purpose:** A single, production-minded creative and technical brief for Google AI Studio (or another coding agent) to build a complete, distinctive landing-page template from the approved AUREL hero reference. Includes the page architecture, cinematic interactions, responsive implementation requirements, and ready-to-use prompts for generating consistent visual assets.
>
> **Project type:** Fictional independent horology brand / luxury mechanical watch. This is a **website template**, not a verified real manufacturer or functioning e-commerce store.

---

## 0. START HERE — NON-NEGOTIABLE INSTRUCTIONS

Build the **entire AUREL landing page**, not just a hero section. The attached AUREL screenshot is the **approved visual source of truth for the hero**, color grading, typography, watch design, spatial composition, and calibration-ring motif. Expand its visual language naturally into an original, coherent long-form page.

**Do not use the supplied full screenshot as the actual website background.** The page must consist of real, responsive HTML, CSS, SVG, and JavaScript elements, with independently positioned photographic assets.

**Project rules:**

1. Place the exact directive `'use client';` at **line 1**, before imports or comments, of `src/App.tsx` and **every `.tsx` or `.jsx` component file inside `src/components/`**. Retain it even though Vite does not require the directive; it is a project convention.
2. Store **all images, SVG files, videos, models, textures, posters, and other static visual assets** inside `public/templates/aurel/`. Reference assets exclusively as `/templates/aurel/<filename>` (or `/templates/aurel/<subfolder>/<filename>` if organized into subfolders), not imports from `src/`, `./assets`, or remote hotlinks.
3. Keep navigation, wordmarks when possible, text, buttons, technical labels, progress indicators, diagrams, and interaction controls **live and accessible**.
4. Don't invent a functional checkout, live inventory, manufacturing provenance, real customers, or third-party testimonials. Treat specifications copied from the reference as *fictional product concept details*.
5. If an asset isn't supplied, use a clearly labeled local placeholder or create it through an available image-generation capability. **Do not claim to have generated an asset that does not exist.** Preserve coherent composition rather than substituting unrelated stock watches.
6. Complete all sections, interactive states, and responsive behavior. Fix build/runtime errors. Do not stop after creating a plan or implementing only the hero.

### Source-of-truth hierarchy

1. **Approved hero screenshot supplied by the user** — hero composition and aesthetics.
2. **Approved transparent hero-watch cutout**, when supplied — product appearance and geometry.
3. **Additional approved asset references**, generated using the prompts in Appendix A — same exact watch across photography.
4. This document — structural, editorial, interaction, and engineering requirements.

If generative imagery disagrees with the approved watch's case shape, dial, hands, strap, or material, favor the **approved hero product**. Do not casually change its identity.

---

## 1. CREATIVE THESIS

### Brand

- **Name:** AUREL
- **Category:** Independent luxury horology / concept collection.
- **Collection:** THE ORIGIN COLLECTION — Collection 01.
- **Positioning:** Contemporary mechanical watchmaking that turns the passage of time into a tangible sculptural object.
- **Primary statement:** **TIME, REIMAGINED.**
- **Tone:** Quiet, exacting, confident, elevated, almost museum-like.
- **Avoid:** Generic lifestyle luxury, cyberpunk, neon technology, loud sales funnels, basic product grids, aggressive ecommerce merchandising.

### Experience principle

The entire website should feel like **entering a precision instrument**: measured movement, etched details, brushed metal, controlled reflections, and typography set with discipline. Motion is meaningful, slow, reversible, and tied to timekeeping, engineering, material, and craft.

The watch—not decorative UI—is the hero. The visual hierarchy must remain beautifully restrained.

### Hero reference interpretation

The supplied reference shows:

- A near-black full-viewport background with concentric calibration rings, subtle etched construction lines, and an almost invisible technical grid.
- A centered, large, refined serif headline near the top: **TIME, REIMAGINED.**
- Eyebrow: `INDEPENDENT HOROLOGY / COLLECTION 01`.
- Subtitle: `An exploration of precision, permanence, and the art of making time.`
- An exquisite **silver brushed-titanium skeleton-dial mechanical watch with a black leather strap** floating in the central field, tilted in three-quarter view.
- Elegant small navigation (`COLLECTIONS`, `SAVOIR-FAIRE`, `MANIFESTO`, `ATELIER`) and a `MENU` control.
- Thin metrology-style circles, radial ticks, crosshairs, and guide lines in cool steel-blue gray.
- A low centered collection CTA and technical footer metadata.

This is the **design language**, not an instruction to repeat the same hero composition in every section.

---

## 2. TECHNOLOGY & FILE STRUCTURE

Use:

- **React 18 + TypeScript + Vite**.
- **Tailwind CSS** for layout and component styling; CSS for complex editorial typography, overlays, and masking.
- **GSAP + ScrollTrigger** for controlled scroll choreography, pinning, timeline reversibility, and state transitions.
- **lucide-react** for tiny functional icons when appropriate (avoid visually dominant stock icons).
- **SVG** for real technical calibration arcs, index marks, connector lines, responsive measurement graphics, and scalable labels.
- **CSS transforms / transforms driven by GSAP** for layered 2.5D motion and depth.
- **Three.js is OPTIONAL**, **not required**. Do not recreate a photorealistic watch from primitive toruses, cubes, or cylinders. Only use real Three.js product rotation if a faithful, optimized watch GLB/GLTF is supplied; otherwise the approved transparent photograph and carefully layered movement will look better.

Suggested structure:

```text
src/
  App.tsx                         # line 1: 'use client';
  index.css
  components/
    Header.tsx                    # line 1: 'use client';
    Hero.tsx
    CalibrationField.tsx
    WatchStage.tsx
    CollectionIntroduction.tsx
    AnatomySection.tsx
    GallerySection.tsx
    AtelierSection.tsx
    ManifestoSection.tsx
    PrivateViewing.tsx
    Footer.tsx
    MotionProvider.tsx
  hooks/
    useReducedMotion.ts
  data/
    collection.ts
public/
  assets/
    aurel-hero-reference.png
    aurel-hero-watch.png
    aurel-dial-macro.webp
    aurel-case-side.webp
    aurel-caseback.webp
    aurel-movement-exploded.webp
    aurel-atelier.webp
    aurel-still-life.webp                # optional
```

All `src/components/` files must begin with `'use client';`. Keep components idiomatic React, avoiding unnecessary abstraction. If the project has an established structure, adapt without breaking it, but preserve the path/directive rules.

Use a **single consistent width system**: `--gutter: clamp(20px, 4.6vw, 84px)` and `--max-content: 1600px` (adjust as needed for hero fidelity). Hero may exceed that width for dramatic product scale.

---

## 3. DESIGN TOKENS

### Colors

| Role | Token | Hex |
|---|---|---|
| Main near-black | `--bg` | `#0A0B0D` |
| Secondary near-black | `--bg-soft` | `#111317` |
| Surface dark metal | `--metal-dark` | `#23272B` |
| Warm headline ivory | `--ivory` | `#F0ECE5` |
| Cool silver typography | `--silver` | `#C7CDD2` |
| Muted captions | `--muted` | `#89919A` |
| Steel/ice blue | `--ice` | `#9DB8C9` |
| Technical rules | `--rule` | `#374047` |
| Light CTA | `--button-light` | `#F1EEE9` |

Resist the temptation to introduce gold everywhere. Silver and icy blue calibration marks should dominate; any warmer highlight should come naturally from the leather/metal photography or atelier lighting.

### Typography

- Display: **Cormorant Garamond** (or comparable elegant high-contrast serif) for cinematic headings; test optical size and avoid fussy thin strokes on mobile.
- UI/body: **Manrope** or **Inter** for clean, restrained text.
- Technical metadata: **IBM Plex Mono**, uppercase, with controlled tracking.
- Wordmark: `A U R E L`, spacious uppercase serif lettering, SVG only if an exact approved logo exists; otherwise render as text.
- Responsive headline size: `clamp(3.6rem, 7.5vw, 8.8rem)` for secondary monumental statements, with a smaller hero size as needed to preserve the watch stage.

Use genuine typographic hierarchy, **not huge blocks of centered body text**. The hero has centered top typography, while later sections should employ asymmetrical editorial alignment to create rhythm. Do not revert to a repetitive left-text/right-image pattern.

### Graphic system

- Thin concentric circles and incomplete arcs.
- Precision indices: 10°, 15°, or 30° radial tick groups, subtle and consistently spaced.
- Crosshairs, aperture circles, small numeric identifiers, minute-track details, and etched angular marks.
- Full-width delicate hairlines rather than boxed cards.
- Large cinematic product photography with natural shadow and carefully managed edge falloff.
- No glowing neon tubes, fake futuristic HUD floods, random floating glass panels, or busy sci-fi instrumentation.

### Background continuity

Use one **site-wide black base** and a persistent or coordinated **calibration-field motif**. Section lighting and content may change, but avoid abrupt horizontal background bands. Keep the field exceptionally subtle; it must not overwhelm photos or text.

---

## 4. COMPLETE PAGE ARCHITECTURE

Build these sections **in order**. They are all required.

### 00 — Header & navigation

Fixed or intelligently sticky transparent header, gaining a subtle dark veil and thin bottom border on scroll. Desktop: wordmark left, centered `COLLECTIONS`, `SAVOIR-FAIRE`, `MANIFESTO`, `ATELIER`, menu indicator on right. Mobile: wordmark + clear accessible menu trigger; full-height or drawer-like navigation with working anchors. Links must scroll to real sections.

Do not add a giant generic CTA to the header. Luxury restraint takes priority.

### 01 — HERO: TIME, REIMAGINED.

**Primary visual source:** approved hero screenshot + `aurel-hero-watch.png` cutout.

**Spatial composition:** top-center editorial statement, centered watch, lower-center collection CTA. The image should remain the main attraction. Reproduce the screenshot's balance, typography, radial diagrams, and background fidelity without flattening it into an image.

Copy:

- Eyebrow: `INDEPENDENT HOROLOGY / COLLECTION 01`
- Heading: **TIME, REIMAGINED.**
- Supporting line: `An exploration of precision, permanence, and the art of making time.`
- Near-watch label: `THE ORIGIN COLLECTION`
- CTA: `EXPLORE THE COLLECTION ↗` — anchors into Section 02.
- Lower-left technical caption: `CALIBRE AU-01 / 42MM BRUSHED TITANIUM / 50-HOUR RESERVE`
- Lower-right concept caption: `LIMITED EDITION / COLLECTION 01 / NO. 01–50`

> Note: the above calibre, dimensions, reserve, and edition size are *fictional design-concept specifications* drawn from the reference. They are not verified claims about a manufactured product. Do not add a genuine “Swiss Made” certification claim or actual purchasing availability.

**Hero intro choreography (roughly 1.8–2.5 seconds):**

1. Background emerges from near-black with an almost imperceptible light sweep.
2. Technical radial rings trace into view at low opacity; do not spin rapidly.
3. The watch enters from a subtle scale/depth offset and settles into sharp focus. No exaggerated bounce.
4. Eyebrow, title, and subtitle reveal through carefully staged line masks.
5. Lower captions and the CTA appear last.
6. Idle: subtle watch float (`±4–7px`, slow), slight angular response to pointer (maximum ~3°), minute-track micro-rotation; movement must feel almost still.

**Scroll handoff:** As the visitor begins scrolling, the watch increases in scale and shifts toward the next section while the headline departs with a masked upward reveal. One radial ring expands into the collection section. The transition must be reversible.

### 02 — COLLECTION 01: THE ORIGIN

**Narrative purpose:** Introduce the product and convert curiosity into visual understanding, not a commerce grid.

**Layout:** Cinematic stage with one oversized photo of the watch and large serif title that partially overlaps the image's negative space. Use a distinct composition from the hero: watch near center or lower-middle, a narrow metadata rail, and sparse captions arranged around it.

Text:

- Eyebrow: `01 / THE COLLECTION`
- Title: **THE ORIGIN.**
- Copy: `A mechanical study in considered form. Nothing added without purpose. Nothing left unfinished.`
- Micro lines: `AU-01 / BRUSHED TITANIUM / BLACK LEATHER`
- CTA: `EXPLORE THE DETAILS ↓`

**Animation:** An expanding circular crop reveals a closer view; the technical ring system becomes the product detail framework. Use pinned movement only if the composition has a meaningful transformation; do not pin simply for spectacle.

**Function:** `EXPLORE THE DETAILS` scrolls to Section 03.

### 03 — THE ANATOMY OF TIME (interactive engineering detail)

**Narrative purpose:** Make the watch's inner construction tangible.

**Main asset:** `aurel-movement-exploded.webp` (approved same-watch exploded movement illustration). Place its visual near the center against deep charcoal, with three to four sparse annotation lines around it. The composition should feel like a museum exhibit or technical illustration, not a dashboard.

Text:

- Eyebrow: `02 / INSIDE THE CALIBRE`
- Title: **PRECISION, EXPOSED.**
- Supporting: `An arrangement of components, each with a reason to exist.`

Interactive hotspots (use *fictional concept labels*, not technical claims beyond the depiction):

- `01 / THE ESCAPEMENT` — regulating motion.
- `02 / THE BALANCE` — a study in rhythm.
- `03 / THE GEAR TRAIN` — movement transmitted through form.
- `04 / THE BRIDGES` — structure, symmetry, and stability.

**Interaction:** Hover/focus/tap a hotspot to light a thin connector line and update a concise detail panel with title, diagrammatic highlight, and one sentence. All interactions must work by keyboard, too.

**Scroll:** Introduce the parts with slight dimensional separation, constrained to the provided artwork's anatomy; avoid pretending that a single raster photo can separate into true 3D objects. If only one flat exploded image exists, animate it as a cohesive illustration with SVG annotations moving independently.

### 04 — PRODUCT DETAIL GALLERY: OBJECT / MATERIAL / MOVEMENT

**Assets:** `aurel-dial-macro.webp`, `aurel-case-side.webp`, `aurel-caseback.webp`.

Create a premium gallery with 3 real interactive tabs (or a horizontal gallery rail):

- **01 / DIAL** — skeletonized architecture and cool blue time indices.
- **02 / CASE** — brushed titanium, profile, and careful material transitions.
- **03 / MOVEMENT** — caseback or inner movement study.

**Layout:** One large image region and a deliberate typographic rail. The selected visual occupies most of the available space; use directional crop transitions and slight perceived depth. Include tabs, progress, previous/next navigation, and a small image caption.

**Interaction:** Tabs, arrow buttons, swipe on touch, ArrowLeft/ArrowRight when the gallery has focus. Maintain real selected state and visual feedback. Don't display dummy carousels with non-working arrows. Use a consistent aspect-ratio container to avoid layout jumps.

**Motion:** Image crop masks and controlled opposing movement (e.g., outgoing image shifts 3% one way as incoming image enters from the other). Respect reduced motion.

### 05 — SAVOIR-FAIRE: THE HUMAN HAND

**Asset:** `aurel-atelier.webp`.

**Purpose:** Contrast the mechanical with the human. A cinematic, mostly full-bleed atelier photograph featuring precision watchmaking tools and a craftsperson at work—hands and materials, not an unverified founder portrait.

**Composition:** Large editorial image across the viewport; a dark gradient is permitted only as necessary for legible copy. Text should be restrained and placed in an actual negative-space area of the supplied image.

Copy:

- Eyebrow: `03 / SAVOIR-FAIRE`
- Headline: **MADE WITH INTENTION.**
- Paragraph: `Form is shaped by decisions too small to notice and too important to ignore.`
- CTA: `OUR PHILOSOPHY ↗` — scrolls to manifesto.

**Motion:** Soft masked photograph reveal, focus shift from broad scene to craft detail, slow parallax ≤ 8% image movement. No flashy wipes inconsistent with the brand.

### 06 — MANIFESTO: TIME IS WHAT WE MAKE OF IT

**Purpose:** A text-forward breathing moment, no generic quote cards.

**Composition:** Centered monumental serif statement in spacious black void with a giant fine-line outlined circular instrument behind it. A thin off-center vertical index rule can establish deliberate tension.

Copy:

- Eyebrow: `04 / THE MANIFESTO`
- Main statement: **NOT MORE TIME. BETTER TIME.**
- Supporting: `We believe true luxury lies in attention—in the things we choose to make and the moments we choose to keep.`

**Motion:** Controlled word-by-word reveal as the large outline moves across the typography. Use a lightweight SVG or CSS ring, not a heavy WebGL scene. This should be contemplative, not a kinetic typography demo.

### 07 — PRIVATE VIEWING / FINAL CTA

**Purpose:** Finish with a meaningful invitation and visual closure.

**Composition:** Return to the product in an editorial still life or softly lit close-up, with the watch centered against an inky background; one dramatic incomplete calibration ring encloses the composition. This must feel like the hero's final chapter, not a duplicate screenshot.

Copy:

- Eyebrow: `05 / PRIVATE ENQUIRIES`
- Headline: **SOME THINGS DESERVE TIME.**
- Supporting: `A closer look at the Origin Collection begins with a conversation.`
- Primary CTA: `REQUEST A PRIVATE VIEWING ↗`
- Secondary CTA: `RETURN TO THE ORIGIN ↑`

**Functional CTA behavior:** Open an accessible inquiry modal or an inline inquiry form with name, email, and message. This is a fictional demo template, so submission must either:

- open a correctly configured email draft **only if a real destination email is configured**, or
- clearly state it is a **demo form** and locally validate inputs without claiming a message was delivered.

Do **not** simulate an actual backend success, a purchase, a booking, or available inventory.

Optional `aurel-still-life.webp` can enhance this stage; otherwise reuse a carefully framed approved watch photo with different cropping, lighting overlays, and coded rings.

### 08 — FOOTER

Near-black refined footer with large AUREL wordmark (text, not screenshot), thin rule, anchor navigation, collection note, concept disclosure, and `BACK TO TOP ↑`. No fabricated real address, social pages, or store links. Link only to actual page anchors or configured real destinations.

---

## 5. SIGNATURE INTERACTION SYSTEM — THE CALIBRATION MOTIF

All motion should derive from **one recurring timekeeping motif**, not unrelated effects.

### Global motif

- A circle or partial dial appears in the hero, resolves into a framing ring for the Origin, becomes measured annotations in Anatomy, guides the Detail Gallery, retreats in the Atelier, and returns in the CTA.
- The motif can be implemented through section-specific SVGs sharing consistent visual tokens. A single page-level SVG is optional, but only use it if its anchors actually align and it performs well; avoid forced continuity with badly connected lines.
- Index ticks, thin arcs, and coordinate marks should feel mechanically precise and mostly subdued.
- **No loud purple sci-fi signal lines**; this is a watchmaking brand, not an AI infrastructure product.

### Motion tempo

Use elegant GSAP timing with a cohesive vocabulary:

- Entry: ~0.8–1.2 s with restrained cubic easing.
- Hover: ~0.25–0.45 s.
- Scroll-linked transformations: reversible, non-jarring, driven by actual scroll progress.
- Idle watch drift: low-amplitude, slow, and paused offscreen.
- Calibration rings: rotate so slowly that the user almost questions whether they're moving.
- Stop extra activity while the user is navigating interactive controls or when motion reduction is requested.

### No animation crutches

Don't build the entire site from identical fade-up animations. Every important transition should express something: **alignment, revealing a hidden detail, material discovery, a measured rotation, or opening an instrument**. Don't animate for animation's sake.

---

## 6. REAL INTERACTIVE BEHAVIOR

1. **Navigation:** click/keyboard accessible; real section anchor targets; mobile menu opens/closes and traps focus appropriately.
2. **Collection CTA:** smooth-scrolls to Origin.
3. **Anatomy hotspots:** activate a description, connector highlight, and accessible selected state.
4. **Detail Gallery:** clickable tabs, arrows, touch swipe (without stealing the whole page scroll), readable captions, and correct tab state.
5. **Private viewing:** accessible form, validation, explicit demo disclosure, no fake network success.
6. **Back to top:** returns to hero and clears open overlays.
7. **Pointer effect:** minimal 2.5D tilt on the hero watch only if it enhances rather than distorts the product photograph.
8. **Reduced motion:** meaningful content and controls must remain visible and functional.

---

## 7. IMAGE HANDLING & VISUAL FIDELITY

### Approved screenshot versus live assets

The screenshot is a composition guide only. Rebuild:

- navigation as HTML,
- all text as selectable live typography,
- concentric precision graphics as SVG,
- buttons as native accessible controls,
- the watch itself as a photo/cutout,
- all additional sections as independent responsive compositions.

For the **hero watch**, a genuinely transparent PNG with natural anti-aliased edges is preferred. DO NOT leave white, checkerboard, or chroma-key halos. Shadows should be kept faint and photographic. If the original shot is being extracted, preserve the dial, hand arrangement, lugs, crown, and strap rather than hallucinating a new watch.

Use `object-fit: contain` on cutouts; avoid stretching, face-cropping, or clipping straps on desktop. For mobile, scale down and reflow the metadata and headline instead of aggressively cropping the watch.

### Image registration and consistency

All product close-ups must depict the **same fictional watch**. Ask the image generator to reference the supplied hero crop or approved cutout. Don't independently generate seven different watches and pretend they're identical.

### Optimization

- Transparent hero PNG when fidelity matters; optionally export WebP with alpha if supported.
- Photographic detail assets as AVIF or WebP with deliberate quality settings.
- Natural-image `loading="lazy"` below the hero; prioritize the hero cutout.
- CSS `aspect-ratio` and width/height to prevent layout shift.
- Descriptive alt text for informative photos; `alt=""` for purely decorative rings.
- Provide fallback if any optional image is missing; do not render broken URLs.

---

## 8. RESPONSIVE ART DIRECTION

**Desktop ≥ 1200px:** Full cinematic balance close to the reference. Centered title and watch, large radial field, peripheral metadata. Sections can become asymmetric but must avoid generic 50/50 cards.

**Tablet 768–1199px:** Reduced watch size and calibration scale. Keep headline centered on hero, simplify hotspots, retain gallery tabs and CTA hierarchy.

**Mobile < 768px:**

- Hero uses `min-height: 100svh` or `100dvh` with safe area padding, with scroll allowed when content exceeds height.
- Headline remains **top-centered**; watch remains **visually centered**; CTA sits below watch without colliding with strap.
- Metadata collapses to a readable, scrollable or stacked line beneath the product; avoid microscopic type.
- Calibration rings become subtle cropped arcs, not dozens of overlapping ticks.
- Detail Gallery becomes a touch-friendly swipe gallery with controls.
- Anatomy hotspots may become an accessible stacked list of selections tied to the image rather than tiny untappable dots.
- Atelier uses a genuine mobile crop; don't obscure the subject under copy.
- All tap targets meet approximately 44×44 CSS pixels; contrast remains legible.

Test at 390×844, 768×1024, 1366×768, 1440×900, and 1920×1080. Also check a very short landscape viewport.

---

## 9. ACCESSIBILITY, PERFORMANCE & RELIABILITY

- Semantic `header`, `main`, `section`, `nav`, `footer` landmarks and exactly one primary `h1`.
- Correct focus order and visible focus rings.
- Modal has accessible name, focus trap, escape close, click-outside close where appropriate, and focus return.
- Buttons must actually act; no `href="#"` placeholders, inert controls, or fake download links.
- `prefers-reduced-motion` disables non-essential motion, preserving layout and function.
- GSAP timelines and ScrollTriggers are cleaned up on unmount; call `ScrollTrigger.refresh()` after images/fonts load when needed.
- Use `ResizeObserver` or section measuring only where layout geometry requires it.
- Avoid enormous videos, bloated particle effects, permanent GPU layers, and needlessly running animation loops.
- Confirm no console errors, broken images, overlapping text, scroll-jank, horizontal overflow, or stuck pinned sections.
- Support keyboard navigation throughout, including hotspot and gallery controls.
- Handle loading failures gracefully.

---

## 10. IMPLEMENTATION PLAN — EXECUTE, DON'T JUST DESCRIBE

**Phase 1 — Audit**: inspect actual project, confirm framework/dependencies, inventory `public/assets`, locate the approved hero reference. Never assume asset paths without checking.

**Phase 2 — Foundation**: set brand tokens, font system, App structure, sticky header, section ids, global calibration motifs, mobile navigation, and clean base backgrounds.

**Phase 3 — Hero**: reconstruct the reference precisely using live HTML/SVG/photo; optimize intro animation and watch placement.

**Phase 4 — Editorial sequence**: build Sections 02–08 with deliberate visual differences and real content.

**Phase 5 — Interactivity**: hotspots, gallery, inquiry modal, scroll anchors, keyboard and touch interactions.

**Phase 6 — Motion**: add controlled GSAP transitions, responsive recalculation, reduced-motion fallback, and remove redundant animations.

**Phase 7 — Verification**: build/typecheck, test all anchor links and controls, check five viewport sizes, confirm image loading, verify no overflows or blank pinned sections, correct any issues found.

Return a brief final summary of actual implementation and any missing assets or intentionally demo-only functions. Do not claim tests were run unless they were.

---

## 11. ACCEPTANCE CRITERIA

A completed implementation must meet **all** of these:

- [ ] The hero is recognizably faithful to the supplied AUREL screenshot, not just inspired by the name.
- [ ] Watch remains the visual center of the hero; heading is top-center, CTA lower-center.
- [ ] Text, nav, buttons, controls, specs, and diagrams are built in live code.
- [ ] At least the full Origin, Anatomy, Gallery, Atelier, Manifesto, Private Viewing, and Footer sections exist.
- [ ] Calibration circles and radial markers are coherent, precise, and restrained.
- [ ] All provided product photographs depict the same watch; no visual identity drift.
- [ ] Interactions and scroll transitions work in both directions where appropriate.
- [ ] No broken `public/assets` paths or external hotlink dependencies.
- [ ] `src/App.tsx` and `src/components/*.{tsx,jsx}` all begin with `'use client';`.
- [ ] AUREL brand feels like luxury horology, not sci-fi or an ordinary shop template.
- [ ] Mobile and reduced-motion experiences remain complete.
- [ ] Real-world manufacturing claims, purchases, and inquiries are not misrepresented as verified or operational.

---

**End of master prompt.**
