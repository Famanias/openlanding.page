# MASTER BUILD PROMPT — STAR RIOT
## One-shot, motion-rich disco / nightlife landing page

> **For the implementation agent:** The attached screenshot is the mandatory PRIMARY ART-DIRECTION REFERENCE. Build a brand-new, complete, polished, working landing page for **STAR RIOT**, a fictional disco and after-dark dance club. Translate the screenshot's visual DNA into nightlife rather than copying its marketing copy, characters, or exact layout. Your deliverable is **ONE self-contained `index.html`** containing the HTML, CSS, JavaScript, vector art, and embedded/generated images. Do not stop at a design plan, do not ask clarification questions, and do not hand off an unfinished scaffold.

---

## 01 — North-star creative direction

**Brand:** STAR RIOT  
**Category:** Fictional neon disco club, dance floor, DJ nights, community, after-dark culture  
**Personality:** Unapologetic, expressive, cheeky, kinetic, colorful, inclusive, a little surreal, designed with craft  
**Positioning:** A neon-charged space where glitter, loud bass, good friends, and improbable nights collide  
**Primary headline:** `TONIGHT, WE GO SUPERNOVA.`  
**Primary CTA:** `GET ON THE LIST ↗`  
**Secondary CTA:** `EXPLORE THE NIGHTS`  
**Supporting copy:** `Disco fever. Future sounds. Zero ordinary nights. Step into the place where the dance floor becomes the whole universe.`

Think **retro pop-art disco meets contemporary bold creative studio**. The screenshot is not a template to clone pixel-for-pixel: it is a design language to recreate faithfully. The screenshot includes a nearly black plum background, large tightly-set heavy white display type, huge electric starburst shapes, saturated mint-to-lime gradients, bubblegum pink accents, playful vector figures, angular motion motifs, small floating UI-window cards, sparkles, and a clear cinematic contrast. Keep those defining qualities.

**Do not** convert this into a generic nightclub template with photographs, black-and-gold VIP styling, purple cyberpunk grids, corporate charts, bland glassmorphism, default Tailwind cards, or boring symmetric layout. Do not recycle the previous marketing-company concept or copy. It must feel like a fully realized *club*, not an agency with the words changed.

Use an **original horizontal composition for desktop** with editorial text and layered illustration; do not simply enlarge the narrow/mobile reference screenshot. Make the desktop layout compelling at 1440 × 900 and 1920 × 1080. Mobile must be actively redesigned rather than squashed.

---

## 02 — Fixed color palette (HIGH PRIORITY)

Color-matched to the supplied image's visible neon accents, with supporting dark and neutral tones:

| Design token | Hex | Role |
|---|---|---|
| `--night-0` | `#12041B` | Dominant nearly black plum canvas |
| `--night-1` | `#1E092B` | Subtle violet depth |
| `--night-2` | `#2C103B` | UI and layered panel surfaces |
| `--electric-mint` | `#30F0CC` | Primary neon accent, links, buttons, strokes |
| `--hot-pink` | `#FC3CCC` | Secondary neon accent, stars, chips, lights |
| `--acid-lime` | `#FCF03C` | Graphic pops, star tips, highlighted labels |
| `--electric-purple` | `#9451FF` | Minor glow / gradient bridge |
| `--warm-coral` | `#FF9BB0` | Small tertiary details, optional |
| `--paper-white` | `#FFFDF8` | Headlines, high-contrast body text |
| `--muted-lilac` | `#CAB9D4` | Supporting description text |

**Rules:**
- At least **70% of screen area** should remain dark-plum/dark-eggplant. The neon colors act as carefully placed intense light sources; they are not a full-screen gradient wash.
- Preserve the signature **mint → electric lime** gradients and **pink → purple** transitions from the reference.
- Purple alone must **not** dominate this site. Mint, neon pink, and lime should be immediately recognizable.
- Contrast must remain excellent. White headings must be legible; do not put body copy on busy high-saturation backgrounds.
- The **entire site should feel continuous**. Use one main dark foundation with carefully placed gradients and glowing forms that flow between sections. No hard horizontal background seams, abrupt full-width color switches, or unrelated section backdrops.
- Avoid arbitrary extra brand colors. Do not introduce blue-dominant SaaS hues, beige, or metallic gold.

---

## 03 — Typography and editorial system

The reference uses **bold condensed sans-serif display type**, not serif. For this new brand, follow that direction; **do not inherit any serif-only rule from other projects**.

- Headlines: oversized, aggressively bold, compact/condensed, usually UPPERCASE; tight leading (~0.83–0.96), deliberate line breaks, immaculate kerning. Suitable available display stacks: `Impact`, `Haettenschweiler`, `Arial Narrow Bold`, `Franklin Gothic Heavy`, `Arial Black`, sans-serif. A better properly licensed condensed display face may be embedded in HTML if available, but the site must work fully without a network font request.
- Navigation and body: precise and modern sans-serif, bold for UI labels, readable for descriptions.
- Microcopy: uppercase labels with generous tracking and playful separators such as `✦`, `↗`, `//`, `001`, or tiny star glyphs.
- Hero should be typographic first; art should interlock with typography rather than obscure it.
- Use highlighted color typography only where it has intentional impact. Possible accent: `SUPERNOVA.` has a neon outlined or multicolor cutout treatment with sufficient contrast.
- Use responsive `clamp()` and intentional art-directed mobile line breaks. No horizontal overflow, no cut-off glyphs.

---

## 04 — Illustration and art asset direction

The reference is vivid **flat / paper-cut / pop-art vector illustration**, with occasional softly dimensional gradient art and deliberately exaggerated forms. Re-create that kind of asset language in an original disco context.

**Generate original assets if an image-generation tool is available; ideally PNG/WebP with transparent alpha.** If image generation is unavailable, create polished **inline SVG illustrations** using layered paths, gradients, masks, and organic contours. **Never** use broken URLs, stock-photo placeholders, emoji standing in for illustrations, random icon packs, or leave empty art containers. Never use the screenshot itself as a rendered background: the resulting site must have real editable interface elements.

### Essential asset roster

1. **Hero disco superstar / star portal:** An enormous asymmetrical five-point star / stepped neon starburst / playful cosmic portal, lime at the glowing center blending to turquoise on several tips, with hot-pink perimeter accents. Strong shape, memorable silhouette, transparent background. Avoid a plain yellow emoji star. It may be more effective built as an animated SVG.
2. **Dancing character A:** Original expressive disco dancer in chunky bright clothes, exaggerated stance, friendly vector styling, dynamic pose, black/purple line art, transparent background; e.g. mint jacket, pink trousers, white shoes.
3. **Dancing character B:** Second distinct dancing figure with contrasting silhouette, playful outfit, confident motion, colorful apparel in approved palette, transparent background. Make the figures diverse in styling and physical presentation without stereotype.
4. **Mirror-ball / cosmic vinyl hybrid:** A whimsical disco ball with stylized reflective facets and neon star reflections, transparent background, used in the story or the lineup section.
5. **Small floating club UI panels:** Design as **real HTML/CSS/SVG**, not baked into illustration: e.g. currently-playing waveform, light control panel, upcoming DJ card, equalizer bars, abstract music visualizer. In the screenshot, floating mini dashboards enliven the illustration; here replace analytics with **nightlife interfaces**.
6. **Decorative system:** Starlets, crescent arcs, miniature sparkles, squiggles, jagged bursts, vinyl rings, lightning-like arrows, confetti shards and hand-drawn motion strokes. Make these as compact inline SVG/CSS primitives so they can animate independently.
7. **Three event graphics:** Unique visually coordinated abstract poster illustrations for three fictional party nights, using only approved colors. These can be generated individually with transparent backgrounds or designed as original vector/poster art.

### If generating with an image model, use prompts like

**Hero artwork prompt:**
`Original retro-futurist disco pop-art illustration for the fictional nightclub STAR RIOT; colossal angular five-point neon star with acid-lime to electric-mint gradient body and hot-magenta offset outline; dynamic layered paper-cut geometry; energetic imperfect editorial vector aesthetic; clean precise edges, light grain only where intentional, dramatic asymmetrical silhouette, no letters, no text, no logo, isolated subject, fully transparent alpha background, high-resolution landscape composition with generous clear space around object, no stock photography, no mockup.`

**Character prompt:**
`Original full-body playful dancer character for a retro-pop disco club website, expressive motion pose, exaggerated fashion proportions, turquoise mint jacket, hot-pink bell-bottom trousers, cream shoes, warm friendly hand-drawn black linework, bold flat color shapes with subtle illustrated shading, boutique editorial vector / cutout artwork, not photorealistic, no typography, no border, isolated single person, transparent alpha PNG, all limbs completely in frame.`

**Mirror ball prompt:**
`Stylized disco mirror ball redesigned as a playful cosmic object, faceted geometric reflective shapes glowing in electric mint, fuchsia, acid lime and purple, dynamic perspective, hand-crafted editorial pop-art, slight tactile gradient texture, bright sparkling light rays as separate shapes, isolated object, no background, no text, transparent alpha PNG.`

**Technical constraints:**
- Request alpha transparency explicitly; verify backgrounds are actually transparent before embedding.
- Prefer 1400–2000px source resolution for hero subject and ~900–1400px for secondary art. Compress thoughtfully to WebP or optimized PNG.
- Embed final raster assets as `data:image/webp;base64,...` or `data:image/png;base64,...` so the final deliverable truly is one HTML file. Use SVG inline where that produces smaller, cleaner, more controllable results.
- Use `loading="lazy"` for below-the-fold non-critical images, explicit width/height or aspect ratio, and accessible alt text for meaningful imagery. Decorative art must be hidden from assistive technology.
- Do NOT claim to have generated an asset if no image-generation capability exists; use original SVG fallback and implement the site anyway.

---

## 05 — Site architecture: design and build ALL sections

Implement a **full landing page**, not just the hero. Aim for ~6–8 lovingly art-directed sections with purposeful layout variety. The page should feel like one visual journey through the night.

### SECTION 1 — The ignition (hero)

**Goal:** Immediately communicate disco club energy and give a clear way to explore events / get on the list.

**Layout:** Desktop split, approximately 45% typography / 55% illustration, with overlapping visual elements pushing the column boundary. Sticky/top navigation overlays the continuous dark scene. Top bar includes a custom STAR RIOT glyph/wordmark, links `NIGHTS`, `THE SPACE`, `THE SOUND`, `FAQ`, and one energetic `JOIN THE LIST ↗` CTA. Mobile navigation must be usable and fully implemented.

Content direction:
- Tiny badge: `THE CITY'S NEW AFTER-DARK OBSESSION ✦` (fictional copy)
- Giant display headline across 3 or 4 lines: `TONIGHT,` / `WE GO` / `SUPERNOVA.`
- Supporting text as above.
- Filled CTA: `GET ON THE LIST ↗` (mint or mint-to-lime); outline CTA: `EXPLORE THE NIGHTS`.
- Tiny bottom line: `DISCO • HOUSE • ELECTRIC JOY • LATE HOURS`.
- Massive independent layered neon starburst art behind/around a floating club playlist widget and dancing silhouettes; little sparks, angular arrows, a mini equalizer with animated bars; small magenta blob/arc framing the right side.
- Distinct teaser at bottom edge to invite scroll, not a plain downward arrow.

### SECTION 2 — Welcome to the riot (intro manifesto)

Editorial break with large rhythmic type: `ORDINARY NIGHTS? NOT HERE.` and a short 2–3 sentence brand manifesto. Use dynamic oversized star-letter counterform, diagonal cutout shape or illustrated vinyl that overlaps the margins. A horizontally marching ticker says something like `DANCE / SWEAT / SHINE / REPEAT ✦` without overpowering assistive tech.

### SECTION 3 — Pick your frequency (upcoming nights)

Three distinctive event/poster cards, **not three identical SaaS statistic cards**. Sample event labels (fictional):
- `FRIDAY FREQUENCY` — house, disco edits, loud colors
- `SATURDAY STARBURST` — disco classics recharged
- `SUNDAY SLOWBURN` — groove, soul, and the afterglow

Each card: original poster art, date/time as an editable illustrative demo value or `EVERY FRIDAY`, `EVERY SATURDAY`, `SELECT SUNDAYS` rather than inventing imminent dates, a DJ/genre subtitle, and a live `SEE DETAILS ↗` interaction. Support an accessible event-detail modal or expanding panel containing lineup info and a `GET ON THE LIST` path. Avoid pretending ticket purchases occurred.

Cards should have different accents (mint dominant, pink dominant, lime dominant) while all remaining inside the same design system. Use large typography and cropped illustrated shapes; hover reveals a distinct transformed poster scene rather than a basic elevation shadow.

### SECTION 4 — The sound takes over (scroll-controlled feature)

A **pinned or sticky, scroll-driven editorial scene** whose visual meaning changes through 3 stages. This is the showpiece after the hero.

- Phase 1 (`WARM UP`): single vinyl/disco sphere, minimal light trails, sparse composition.
- Phase 2 (`TURN UP`): expanding concentric rings, incoming speaker waves, dancers slide toward the floor, equalizer grows.
- Phase 3 (`ALL OUT`): angular neon star erupts or rotates, more saturated light strokes, typography shifts to `LOSE YOURSELF. FIND YOUR PEOPLE.`.

Animate with scrubbed scroll progress (from `getBoundingClientRect` + requestAnimationFrame, or a proven scroll animation library only if fully embedded into HTML and necessary). Keep sticky durations controlled: ideally ~2–2.6 viewport heights, with easy exit and no scroll trapping. Provide a no-JS and reduced-motion-safe static state. On mobile use a lighter non-sticky progression if necessary for usability.

### SECTION 5 — The space (immersive visual tour)

Introduce club features using an **asymmetric visual collage**, not a boring icon grid: `THE FLOOR`, `THE LIGHTS`, `THE BOOTH`, `THE CREW`. Layer rich SVG/raster art with overlapping handwritten-looking display labels, edge trims, circular window masks, and glowing panels. Use controlled parallax and interesting hover reveals.

### SECTION 6 — Meet the movement (community / photo-wall)

A playful gallery of illustration-led snapshots or symbolic nightlife posters, staggered like pasted stickers and print pieces. Display rotating quotes such as `COME FOR ONE SONG. STAY FOR THE WHOLE NIGHT.` Use draggable horizontal snap or accessible next/previous controls. Hover can rotate, peel, reveal a back-side caption, or animate a small stamp.

### SECTION 7 — Your next night starts here (conversion)

Distinct CTA finale: huge neon kinetic type `SAVE YOUR SPOT ON THE FLOOR.` with an orbiting vinyl / disco-ball illustration and an accessible sign-up form. Fields: name and email (and an optional preference selector) with helpful labels, input focus states, valid client-side validation, and a **clearly demo-only** success state. The static one-file prototype has no backend; don't promise that anyone actually joined a mailing list or booked a ticket. Show a `DEMO — connect your mailing-list service to enable subscriptions` note when submitting, or implement an explicitly labeled safe mailto handoff.

### SECTION 8 — Footer

Branded wordmark, relevant nav, social link placeholders only if clearly identified as demos (or omit), back-to-top control, copyright with fictional brand. Do not invent a real venue address, actual operating permits, partners, ticket availability, or verified customer metrics. Contact info should be clearly demonstrative.

---

## 06 — Master motion language: make the WHOLE page feel alive

This brief is motion-critical. A default staggered `opacity:0 → 1; transform:translateY(20px)` on every element does **not** qualify. For every prominent button, card, icon, text group, line, decoration, and illustrated element, design an **appropriate purpose-driven interaction**. Avoid making every element move all the time. Motion should be distinctive, legible, and optimized, like a perfectly art-directed live music visual identity.

### A. Page-load hero choreography (first ~1.8 sec, skippable by interaction)

1. Night canvas turns on using a *radial spotlight / expanding mask*, not a whole-page fade.
2. Wordmark snaps together from 2 angular pieces with a subtle elastic settle.
3. Hero headline reveals by clipped line-wipes, one line from different angles, with brief squash/overshoot in scale; not just fade/slide.
4. The signature star shape *unfolds from a compressed polygon* and rotates into place using a spring-like curve; inner color sweep races from mint to lime.
5. Dancer illustrations enter with offset pivot rotation (as if stepping into the frame), secondary doodles stroke-draw, and small confetti accents spring outward.
6. Floating vinyl/playlist UI assembles from staggered tiles; equalizer bars pulse in an irregular sequence.
7. CTA border draws around its perimeter, then settles into a glowing resting state. Never delay interaction behind a long loader.

### B. Button hover / click systems

- Primary buttons: moving gradient *light band* tracks across button, arrow shoots diagonally and springs home, background shape subtly stretches to pointer direction.
- Outline buttons: an animated **border trace / corner sweep** plus internal highlight reveal.
- On click: tiny compression + overshoot (respect reduced motion). Use actual semantics and functional actions, not dead links.
- Focus-visible: unmistakable visible focus ring and equivalent information to hover.
- Touch: intentional press feedback without hover assumptions.

### C. Text and navigation behavior

- Headline words use clip-mask or CSS `clip-path: inset(...)` reveals and subtle skew-reset.
- Decorative outlined words can fill with color as they scroll into view (mask wipe), then hold.
- Navigation links underline with a *drawn hand-drawn-like stroke or diagonal traveling marker*. No generic opacity flicker.
- Text should be accessible as intact DOM text; animation wrappers must not cause screen readers to read letters individually. Prefer line spans or `aria-label` with decorative glyphs hidden.
- Microtext labels can use mechanical rolling number/counter transitions where semantically appropriate.

### D. Scroll-driven scene transitions

- Animate colored beam paths along SVG geometry using stroke-dashoffset or `offset-path` where appropriate.
- Large graphics may parallax at different depths; use `transform: translate3d(...)` only (avoid scrolling layout props).
- Giant starburst can rotate or morph very slightly across scroll range; don't make it spin continuously fast.
- Section handoff uses **continuing shapes**, e.g. a lime trail that starts in section 2 and visibly carries into section 3. Avoid disconnected background blocks.
- For large scroll-stage transforms, interpolate from measured progress with `requestAnimationFrame` and use a small number of transforms/opacity values (no heavy DOM writes).

### E. Cards / posters / stickers

- Cards gently tilt to pointer with CSS custom properties, while their artwork exhibits independent parallax.
- Hovering a party poster should trigger a *spot-color ink reveal, sticker peel, or layered art swap* and animate the title/CTA along a deliberate path.
- Cards can expand a corner burst or move a star-shaped die-cut behind the label.
- Entering viewport: don't simply fade in; use **masked crop expansion, rotation settle, or horizontal scale reveal** with independent art movement.
- Card activation should support click/tap and keyboard. Do not make the only information available by hovering.

### F. Ambient continuous motion (tasteful)

- Low-amplitude visualizer/equalizer, occasional drifting stars, a vinyl revolving slowly, soft passing lighting sweeps, subtle music-inspired pulse (not strobe).
- Avoid rapid blinking, seizure-risk flashing, endless 3D rotations, or multiple unrelated timers.
- The page should feel alive when idle, but **the user should always be able to read the content without being distracted**.

### G. Mobile motion rules

- Rework choreography for small screens: no clipped massive star, no overlapping button collisions, no sticky scroll trap.
- Simplify depth and particle counts, reduce parallax range, remove costly pointer interactions.
- `prefers-reduced-motion: reduce`: disable all ambient loops, pinned motion choreography, marquees, long transition delays, parallax; render every section legibly without needing to scroll to activate hidden content.

---

## 07 — Suggested technical implementation

**Non-negotiable final output:** `index.html` only. Entire app should work by double-clicking the HTML offline in a modern browser (except explicitly optional external integration features, which must be omitted or degraded gracefully). Do not deliver a directory of CSS, JS and assets unless technically unavoidable; the requested result is one file.

- Use semantic HTML5 with internal `<style>` and `<script type="module">` or `<script>` at the end of the document.
- Prefer plain HTML/CSS/vanilla JS. Avoid React/Vite/npm and CDN-dependent animation libraries. Animations should be implemented with Web Animations API, CSS keyframes/transitions, IntersectionObserver, requestAnimationFrame, and native SVG.
- Use progressive enhancement: content remains available and laid out with JavaScript disabled.
- JS should not start everything hidden and rely on fragile intersection callbacks to display it.
- No CSS-only fake controls: implement working accessible mobile nav, event details modal, gallery controls, FAQ items, signup/demo response, and back-to-top.
- Group animation state; use data attributes and CSS variables to avoid layout thrashing.
- Optimize for 60 FPS on reasonable desktops, without unnecessary third-party packages. Prefer transforms and opacity for motion. Don't animate box-shadow and blur across hundreds of elements. Limit heavy glowing effects and cap particles.
- Manage pointer listeners efficiently, with `pointer: fine` checks. Remove event listeners appropriately if needed.
- Use `IntersectionObserver` for section-entry triggers and scrubbed scroll transforms only for major scenes.
- Smooth-scroll anchors, with reduced-motion fallback; use `scroll-margin-top` for sticky navigation.
- TypeScript/build step is unnecessary. If images must be embedded as base64, do it at implementation time; optimize them first.
- Keep asset provenance and code clear through comments so a developer can later swap generated art or real event content.

### Responsive breakpoints and tests

Implement at least:
- 1920×1080 large desktop
- 1440×900 desktop
- 1280×800 laptop
- 768×1024 tablet
- 430×932 phone
- 390×844 phone
- 320×568 small phone

Verify no horizontal scrolling or clipped headlines, button overlap, broken mobile nav, disappearing text, carousel offscreen focus, illegible cards, or pinned scenes that trap the scroll. Test wheel scroll, trackpad-like scrolling, scroll-up reversibility, tapping cards, keyboard navigation, and reduced motion. If a browser automation/screenshot tool is available, actually inspect rendered results, make fixes, and do not stop at source-code-only QA.

---

## 08 — Layout system and visual detail requirements

- Treat the website as a **designed artwork with strong UX**, not a component library demo.
- Use a desktop max-width around 1360–1520px with giant type deliberately breaking the normal content grid in hero/showcase sections.
- Layout should mix tight and spacious moments; vary composition per section, but preserve shared shape language.
- Signature motif: angular 5-point stars, diagonal arrows, squiggly outlines, small sparkles, vinyl grooves, and sharp organic sticker cutouts. Repeat with restraint so brand identity is recognizable.
- Borders can be pale lilac or mint at low opacity; do not outline every component uniformly.
- Distinguish foreground graphics with layered color/scale, not enormous soft shadow everywhere.
- Include custom SVG divider/star stickers, proper type hierarchy, purposeful little footnotes, micro-interaction details, and polished spacing.
- All SVGs and visual effects must look handcrafted and intentional; no random generated blob collections.
- Colorful visual layers should be **independent elements** where possible so they respond to scroll/hover; do not flatten everything into one background picture.
- Maintain continuous visual world from hero to footer. No visibly disconnected section backgrounds.

---

## 09 — Interaction and accessibility contract

- Every navigation item points to a real section, modal, or purposeful action.
- `GET ON THE LIST` scrolls to the real signup section or opens the actual embedded form.
- `EXPLORE THE NIGHTS` scrolls to event cards.
- Event `SEE DETAILS` controls reveal details in accessible dialogs or expandable regions.
- If `GET TICKETS` is shown, it must clearly indicate the site is a fictional demo and no transaction will occur. Prefer `DETAILS` or `JOIN THE LIST` over a dead purchase button.
- Accessible names for all icons and controls, semantic heading order, keyboard-operable dialog and carousel, focus management for modal, Escape to close, high-contrast focus states.
- Use meaningful alt text for illustrations; decorative sparkles `aria-hidden="true"`.
- Do not autoplay sound or embed copyrighted music. The music visualizer is purely visual/simulated unless original audio is explicitly provided later.
- No rapid flashing or extreme photosensitive effects. Support reduced motion thoroughly.
- All company stats, event schedules, and venue attributes are fictional; do not invent third-party endorsements or real-world addresses.

---

## 10 — One-shot acceptance criteria / self-review

Before delivering, verify ALL:

1. Screenshot DNA is obvious within 1 second: near-black plum, neon mint, hot pink, acid lime, punchy condensed white type, giant starburst, illustrated dancers, playful floating UI, high contrast.
2. It clearly advertises a disco/nightclub, **not** digital marketing services.
3. The hero is visually striking at both desktop and mobile sizes; the visual illustration is bespoke, not a stock-photo substitute.
4. There are 6–8 **completed** sections including nights/events, scroll narrative, club experience, conversion, footer.
5. Each main UI family has a distinct nontrivial motion behavior; merely fading every section in is unacceptable.
6. The scroll-showcase meaningfully changes from WARM UP → TURN UP → ALL OUT, and can be scrolled backward.
7. Buttons, mobile menu, modal/expanding event details, gallery controls, FAQs (if present), and signup demo behavior all work.
8. The typography stays legible; no eye-straining, chaotic, nonstop movement.
9. Color and visual style remain coherent across the whole page; no hard breaks between backgrounds.
10. Reduced-motion mode works; no accidental content invisibility with JS disabled.
11. Image backgrounds are transparent where requested; generated images are real visual assets or excellent SVG substitutes, not empty placeholders.
12. Final delivery is a **single fully self-contained `index.html`** and it opens locally without a build step or online dependency.

**Build now. Do not write a plan and stop. Make creative decisions independently. Prioritize art-direction fidelity, a surprising scroll experience, smooth motion, responsive polish, and working interactions. Deliver the finished result and a short implementation summary only after actual implementation and QA.**
