# ZENO. — ONE-SHOT CREATIVE AGENCY LANDING PAGE
## Complete implementation master prompt for Google AI Studio / coding agent

> **INSTRUCTION TO THE CODING AGENT:** Build the finished website in this turn. Do not only describe a plan, create a wireframe, reproduce the four pictures as a flat image stack, or ask for clarification. Inspect the project and available assets, implement everything that is feasible, run available checks, and finish with a concise report of what is functional and what still needs external configuration.

---

# 0. PROJECT BRIEF

Create **ZENO.**, a premium, fictional, independent creative agency landing page/template. This is a brand-new build, **not** a revision of Arc & Signal or any previous website. ZENO makes identities, campaigns, and digital experiences for brands ready to challenge convention.

The four supplied images are the **approved visual references** for the exact brand direction:

1. `assets/reference/zeno-hero-reference.jpg` — hero + header
2. `assets/reference/zeno-expertise-reference.jpg` — services / expertise
3. `assets/reference/zeno-work-reference.jpg` — selected work
4. `assets/reference/zeno-contact-reference.jpg` — final CTA + footer

**The reference images are compositions, not the finished website.** Recreate their layout, typography, colors, proportions, textures, and visual hierarchy with real HTML/CSS and SVG. All headings, nav links, body copy, buttons, service selectors, project links, and footer elements must be actual accessible DOM elements. The supplied artwork crops may be used as visual components, not as substitutes for functional page UI.

The art direction is **experimental Swiss editorial creative studio**, **not an AI startup**. Think contemporary typography, art-directed printed matter, brand identity archives, unusual visual tension, grayscale photography, paper artifacts, deep charcoal and ivory, violet accents, sculptural cobalt ribbons, curved geometric registration lines, and deliberate motion.

## Definition of success

- Desktop matches the four provided compositions recognizably in spirit, hierarchy, palette, copy, and layout.
- The four sections feel like **one continuous designed world**, not four disconnected 16:9 JPGs.
- Motion is distinctive and meaningful: typography masks, connected paths, composition choreography, interactive service nodes, and animated case-study details—not repetitive fade-up effects.
- Page works on wide desktop, laptop, tablet, and small mobile screens.
- All meaningful controls are functional and keyboard-accessible; there are no decorative dead buttons.
- Fast loading, reduced-motion support, no layout jumping, no obvious overflow, and no fabricated achievements or testimonials.

---

# 1. ASSET INVENTORY AND USAGE CONTRACT

Use attached source/reference images to understand the art direction. If the ZIP package accompanies this prompt, it contains these files:

```text
assets/
  reference/
    zeno-hero-reference.jpg
    zeno-expertise-reference.jpg
    zeno-work-reference.jpg
    zeno-contact-reference.jpg
  crops/
    hero-collage.webp
    strategy-print.webp
    identity-print.webp
    campaign-print.webp
    digital-print.webp
    auren-world.webp
    morrow-world.webp
```

The reference files are 2048×1143 screenshot-style images. The `crops/` files are already extracted from the **user-supplied generated images**; they retain the collage's original printed typography and textures, and some include charcoal-colored surrounding pixels. They are approximate editable placement assets, not perfect alpha cutouts.

**Critical asset strategy:**

1. **Never** use `zeno-*-reference.jpg` as a full-page section background containing the screenshot's readable headlines, buttons, service names, nav, or footer. That would turn the website into four unresponsive, noninteractive pictures with duplicate/unclickable text.
2. Use `hero-collage.webp` as the main art-directed visual on the hero's right half. You can place it in a carefully sized/cropped visual container. Its internal printed words and large `Z` are part of the artwork and may remain raster.
3. Use the four expertise crops as the four **artwork** illustrations inside a live CSS/SVG-connected service system. Service headings, descriptions, active states, and navigation are DOM.
4. Use `auren-world.webp` and `morrow-world.webp` as hero artworks inside two oversized project showcases. Project title, categories, and project CTA are DOM. Respect the distinct internal color worlds.
5. Build the violet connector line, cobalt ribbon/arc, gray registration grids, intersection points, and dotted markers as CSS/SVG wherever practical so they can animate and adapt to viewport size. Do not screenshot a connector diagram and pretend it is interactive.
6. The contact/CTA section can be reconstructed entirely from DOM, CSS, and SVG. Use the full reference for composition only; **draw the giant interrupted cobalt ring as live SVG**.
7. If crops are not directly available in the project environment, extract equivalent **artwork-only** regions from the provided originals or reproduce those arrangements using available assets. Do not silently replace artwork with unrelated stock images or generic AI/SaaS decorations. If cropping is not possible, place the original composite as a carefully cropped art-only region, avoiding baked navigation and body-copy overlap.
8. Some artworks have dark rectangular edges. Blend those edges into the charcoal background using matching section colors, controlled cropping and subtle CSS masks if required; do not create obvious framed screenshots within the page.
9. Optimize images for the web (`webp/avif` where practical), preserve high-resolution details, correct aspect ratios, eager-load the hero art, lazy-load below-the-fold artwork, and prevent CLS.

### Art direction do's and don'ts

**Do:** editorial print graphics, crop marks, subtle lines, offset layered papers, asymmetric page composition, precise grid, large serif typography, dark physical textures, controlled cobalt ribbon paths, restrained violet highlights.

**Don't:** blobs, galaxy gradients, floating glass cards, AI brain networks, dashboard charts, generic feature icons, purple neon edge glow, unrelated images, fake brand endorsements, or randomly flying objects.

---

# 2. TECHNICAL IMPLEMENTATION

First inspect the current project and honor its existing stack and file conventions. If a fresh scaffold is required, use **React + TypeScript + Vite**, semantic HTML5 and well-structured CSS. Componentize sections and shared UI. A convenient component architecture:

```text
src/
  App.tsx
  components/
    SiteHeader.tsx
    Wordmark.tsx
    ParadoxMark.tsx
    GlobalPath.tsx
    HeroSection.tsx
    ExpertiseSection.tsx
    WorkSection.tsx
    ContactSection.tsx
    ProjectDetailDialog.tsx
    StudioDialog.tsx
    MobileMenu.tsx
  data/
    services.ts
    projects.ts
    siteConfig.ts
  styles/
    tokens.css
    global.css
    sections.css
  hooks/
    useReducedMotion.ts
    useSectionMotion.ts
  assets/ ...
```

You may simplify the structure if needed, but keep code reusable and understandable. Do not over-engineer.

Preferred motion system: **GSAP + ScrollTrigger** if dependencies can be installed; register plugins once, use `gsap.context()` and clean up animations/ScrollTriggers on unmount. Use matchMedia for desktop vs. mobile. Do not rely on paid GSAP plugins. Do not make whole-page behavior depend on a mouse wheel interception hack or mandatory smooth-scrolling library. Keep native scrolling and keyboard interactions reliable.

For path drawing use SVG `strokeDasharray`/`strokeDashoffset` controlled by timeline progress or the Web Animations API. Use CSS transforms (`translate3d`, `rotate`, `scale`) and opacity efficiently; avoid animating layout properties on every scroll frame.

### Implementation priorities, in order

1. Correct layout and actual DOM content.
2. Working navigation, services, project interactions, menu, footer.
3. Artwork placement and typography matching.
4. Unified background/line system.
5. Scroll animations and polish.
6. Mobile, reduced motion, accessibility, performance, testing.

If something becomes technically difficult, preserve correctness and usability rather than dropping a whole section or shipping fake controls.

---

# 3. DESIGN TOKENS AND TYPOGRAPHY

Implement CSS custom properties:

```css
:root {
  --bg: #111117;
  --bg-soft: #17171e;
  --ivory: #F2F0EB;
  --violet: #A58AFF;
  --cobalt: #5367F9;
  --lilac: #D8CFF2;
  --muted: #96939F;
  --line: rgba(242,240,235,.20);
  --line-strong: rgba(242,240,235,.38);
  --section-pad-x: clamp(22px, 3vw, 58px);
  --header-h: clamp(68px, 7vw, 112px);
  --ease-editorial: cubic-bezier(.22, 1, .36, 1);
}
```

Use a sophisticated high-contrast serif for oversized statements: prefer **Bodoni Moda** (including italic) or an equivalent legitimately loadable font. If the reference's character proportions are better reproduced with another available premium-looking serif, choose carefully. Use **DM Sans** or a comparable crisp grotesk for nav, labels, buttons, metadata, and body. Avoid over-reliance on system Times New Roman or generic sans font for the entire page. Web fonts should have robust fallback stacks and sensible `font-display` loading.

Typography must be responsive and art-directed:

- Major desktop display: around `clamp(4.5rem, 6.9vw, 8.7rem)` depending on line, with carefully controlled line-height around `0.86–0.99`.
- Use split intentional lines instead of letting all giant headlines auto-wrap unpredictably.
- The accent word should be in **violet italic serif**, not plain violet sans-serif; maintain visual contrast and typographic drama.
- Eyebrows: small tracked uppercase violet labels.
- Supporting copy: pale lilac / muted ivory, readable at normal monitor scale.
- Metadata: small muted uppercase grotesk.
- Wordmark: custom heavy uppercase sans **ZENO.** with a violet dot, paired with a separate interrupted-circle slash mark. Both should remain real SVG/text rather than screenshot artifacts.
- Maintain strong proportions/negative space. Do not scale screenshot text to 1:1 pixel widths at every viewport.

Backdrop: charcoal across **all four sections**. Use a very faint film/print texture and a subtle dark vignette, but **no hard horizontal color band** where one section meets another. Keep decorative grid lines and path strokes understated, behind content.

Overall page max content width may be ~1800px with full-bleed decorative SVGs, while text and media use consistent horizontal alignment. Content must never be clipped on common devices.

---

# 4. EXACT PAGE STRUCTURE AND COPY

Build precisely four primary immersive sections, in this order:

```text
<header sticky>
<main>
  <section id="home"> HERO </section>
  <section id="expertise"> EXPERTISE </section>
  <section id="work"> SELECTED WORK </section>
  <section id="contact"> FINAL CTA + FOOTER </section>
</main>
```

The screenshots are 16:9 design frames. Do **not** simply force each section to `height:100vh` on every device; allow content height and section rhythm to grow naturally. Desktop can use viewport-based compositions and scroll staging; mobile must stack vertically.

## 4A. GLOBAL HEADER (hero reference)

The navbar appears on top of the hero and becomes sticky/compact after the first scroll threshold.

- Left: bold `ZENO.` wordmark with violet period, and a thin gray interrupted-circle-with-diagonal symbol.
- Center/right: `Work`, `Expertise`, `Studio`, `Contact`, separated with subtle dot markers where appropriate.
- Far right: outlined pill/button **START A PROJECT ↗**.
- Thin bottom keyline, no bulky filled nav background. On scroll, use a subtle near-black backdrop and a slightly denser divider.
- Work -> `#work`; Expertise -> `#expertise`; Contact + Start a Project -> `#contact`.
- `Studio` must do something meaningful: open an accessible small editorial Studio dialog/panel with the manifesto and four disciplines, not a `#` dead anchor. The dialog should have a close button, Escape support and sensible focus management.
- On mobile: small wordmark, menu button, slide-in accessible navigation, close on selection/Escape. The menu shouldn't block scroll after closing.

## 4B. SECTION 01 — HERO / `#home`

**Section label:** `INDEPENDENT CREATIVE PRACTICE / 2026`

**Massive display headline with intentional line structure:**

```text
WE MAKE
THE EXPECTED
IRRELEVANT.
```

Set `EXPECTED` in violet expressive italic serif, while all other main words are warm ivory. The final full stop should be violet. Preserve the unexpectedly bold typography seen in the hero reference.

**Body copy:**

> We build identities, campaigns, and digital experiences for brands ready to challenge convention.

**CTAs:** `EXPLORE OUR WORK ↗` and `GET TO KNOW US`.

- Primary anchor scrolls to `#work`.
- Secondary opens Studio dialog or scrolls to `#expertise` (choose one and implement fully).
- Bottom left microtype: `STRATEGY / IDENTITY / CAMPAIGNS / DIGITAL`.
- Bottom right: `SCROLL TO EXPLORE ↓` (clickable to `#expertise`).

**Composition:**

- Two columns at desktop widths: text occupies ~53–56%, graphic occupies ~44–47%.
- The collage, from `assets/crops/hero-collage.webp`, should occupy the right as an intricate layered *artwork*: large Z, cobalt arc, violet paper, monochrome architectural material, silver folded physical object, off-white printed poster, offset registration marks.
- Artwork should feel large and intentionally overlapping, not centered in a generic image card.
- Add custom SVG interrupted circle / crosshair details around it, careful not to duplicate oversized artwork content.
- Text is real DOM sitting outside the screenshot crop. No double rendered screenshot headline or duplicated nav.
- Footer-level metadata aligns near the bottom, making it feel like a finished designed hero.

**Hero motion storyboard:**

1. On initial load, navbar keyline extends sideways from center or left; wordmark/dot enter with short precise travel.
2. Headline lines reveal with **clipped vertical masks** in staggered 100–160ms intervals; do not only fade them in.
3. The violet `EXPECTED` resolves from slight horizontal offset; use subtle italic shape/outline layering, not a dramatic unreadable distortion.
4. Right collage layers travel independently by 12–42px on intro; if using one raster crop, move its containing artwork as one main group and layer separate live SVG/crosshairs on top. Do not hallucinate independent editable layers that don't exist.
5. On pointer movement on large screens, subtle 3D parallax (`±6px`–`±18px`, `±2°` max), throttled/smoothed; no excessive rotations.
6. On scroll out, typography moves at a slightly different rate than artwork, and an SVG violet path exits toward expertise. Reverse correctly when scrolling up.

## 4C. SECTION 02 — EXPERTISE / `#expertise`

**Label:** `01 / WHAT WE DO`

**Hero-sized headline:**

```text
GOOD IDEAS
AREN'T
ACCIDENTS.
```

`IDEAS` violet italic. The period after `ACCIDENTS.` violet.

**Body copy:**

> We connect thinking, making, and moving to create work that stays with people.

**Text CTA:** `OUR APPROACH ↗`.

### Services system

Create a responsive **four-discipline interactive editorial map** to the right of the text, not four disconnected generic cards. Four regions around a living thick cobalt ribbon/loop, thin registration diagram and violet node system:

1. `01 — STRATEGY` — `Positioning, research, direction.` — `strategy-print.webp`
2. `02 — IDENTITY` — `Visual systems, typography, expression.` — `identity-print.webp`
3. `03 — CAMPAIGNS` — `Art direction, storytelling, activation.` — `campaign-print.webp`
4. `04 — DIGITAL` — `Websites, experiences, interactions.` — `digital-print.webp`

At wide desktop, use a 2×2 connected arrangement within ~58–62% width with the top pair above and lower pair below the connecting cobalt ribbon. Place live labels close to the artwork like the reference. A delicate gray coordinate grid is behind the imagery, interrupted by rings and arc trajectories. Keep the graphic sophisticated, not overly symmetric.

### Functional interaction

- Four service artworks or labels must be selectable by click and keyboard.
- Hover/focus or selection highlights the node, adjusts connected path brightness/stroke, shifts the artwork ~8–16px with spring-like movement, and reveals an extra brief text line or capability list.
- Use real `button`/accessible tab-like controls with `aria-pressed` or proper tab semantics, good focus indication and an active state that isn't dependent on color alone.
- Do not remove the default labels in favor of hidden hover-only copy: information must remain understandable without hover.
- `OUR APPROACH ↗` opens a clean accessible approach drawer/modal showing `Discover → Define → Design → Deliver`, each with short explanation. No fifth full-screen section required.

**Motion storyboard:**

1. The violet line enters from the top at approximately **69% page width**.
2. The line draws downward through registration nodes, transforming into a thick cobalt looping ribbon behind the four art fragments.
3. Art regions enter from four distinct directional vectors with controlled clipping/translation—not four identical fade-ups.
4. The path animates smoothly with scroll progress, activating the nodes in a meaningful order: Strategy → Identity → Campaigns → Digital.
5. On pointer hover or selection, the corresponding node/ribbon segment becomes more prominent; the other visual modules gently recede without disappearing.
6. As the section exits, the line continues into the Selected Work composition. Reverse on upward scroll.

## 4D. SECTION 03 — SELECTED WORK / `#work`

**Label:** `02 / SELECTED WORK`

**Display headline:**

```text
WORK THAT
CHANGES PERSPECTIVE.
```

`PERSPECTIVE.` in violet italic serif.

**Subtitle:** `Different challenges. Distinctive worlds. Ideas made tangible.`

### Project 01 — AUREN HOUSE

- Title: `01 — AUREN HOUSE`
- Disciplines: `HOSPITALITY / BRAND IDENTITY / DIGITAL`
- Description: `An identity and digital world built around quiet ritual, considered materials, and modern hospitality.`
- Artwork: `auren-world.webp`
- Internal project palette: limestone, cream, warm brown, minimal architectural lifestyle.
- Link CTA: `EXPLORE PROJECT ↗`

### Project 02 — MORROW FIELD

- Title: `02 — MORROW FIELD`
- Disciplines: `FASHION / CAMPAIGN / CREATIVE DIRECTION`
- Description: `A sharp, culture-led campaign system combining editorial fashion, expressive type, and bold visual rhythm.`
- Artwork: `morrow-world.webp`
- Internal project palette: black/white/cobalt and fashion-editorial photography.
- Link CTA: `EXPLORE PROJECT ↗`

**Composition:**

- Desktop: two **asymmetric world-building case study compositions**, not two equal-sized cards. Auren extends from the left-center and is wider/low, Morrow takes the right and rises higher with tall posters. Maintain generous overlap of paper and editorial fragments.
- A faint studio archive grid and a wide cobalt/violet twisting ribbon connect their composition behind the artifacts. Build ribbon as live SVG if possible.
- Fine small `STUDIO ARCHIVE / 2026` captions/markers near both compositions.
- Live project titles and categories appear below the visual worlds like the reference.
- Desktop artwork blocks should be much more visually compelling than a conventional content grid; some parts may bleed beyond their column as long as no accidental horizontal scrollbar occurs.

**Functional project interaction:**

- Each `EXPLORE PROJECT ↗`, artwork focus region, and/or title opens a meaningful **project detail overlay** or dedicated internal case-study view. The overlay is built from real DOM, using the same project artwork and additional short authored sections: `The Brief`, `Creative Direction`, `Deliverables`.
- Deliverables Auren: `Brand positioning`, `Identity system`, `Art direction`, `Digital experience`.
- Deliverables Morrow: `Campaign concept`, `Photography direction`, `Editorial system`, `Launch materials`.
- Include back/close button, Escape, focus trapping or sensible focus return, and scroll-lock cleanup; no broken links to missing pages.
- Do not fabricate numeric KPIs, real client endorsements, or testimonials. Both clients are fictional concept projects.

**Motion storyboard:**

1. On entry, the section label and large headline reveal through opposing horizontal masks.
2. Auren's artifact world enters from the lower-left with layered crop-window expansion; Morrow enters from above-right with a different curve/small rotate settle.
3. The large connecting cobalt path crosses behind the artwork as the visitor scrolls.
4. Small registration marks and archive annotations appear at the correct narrative beats, visually snapped into place.
5. Hover/focus Auren: composition shifts subtly + warmer accent border/keyline, supporting copy expands. Hover/focus Morrow: cobalt accents become more prominent, tall crop lifts slightly. Do not use random zoom transitions.
6. Clicking a project should produce a smooth **project expansion** into its dialog, not navigate to a placeholder; animate in a way that preserves readable content and respects reduced motion.
7. Scrolling upward reverses any scroll-driven animation cleanly.

## 4E. SECTION 04 — FINAL CTA / FOOTER / `#contact`

**Label:** `03 / THE NEXT CHAPTER`

**Massive headline:**

```text
LET'S MAKE
SOMETHING
MATTER.
```

`SOMETHING` in violet italic serif; rest warm ivory.

**Supporting line:**

> Have a good idea? Let's give it a direction no one saw coming.

**CTA primary:** `START A CONVERSATION ↗`

**CTA secondary:** `EXPLORE OUR WORK` (anchor back to `#work`).

### Key visual: giant incomplete cobalt circular arc

- Recreate the **large right-side cobalt ring** from the reference as live, scalable SVG with multiple faint concentric hairlines / fine registration ticks.
- The ring is intentionally interrupted and occupies much of the upper/right area. It should be cropped dramatically by the viewport edges; its visual form must be crisp, not a blurry glow.
- A thin violet path enters from the upper boundary, curves into the circular system, terminates with a small violet marker/star and continues delicately toward the footer.
- Ensure the ring stays **behind** the headline/CTAs, never makes text unreadable.

### Footer

A thin full-width rule separates the upper CTA and lower footer. Build these as real DOM:

- Large `ZENO.` wordmark (violet period) and diagonal-slashed-circle mark.
- Caption: `INDEPENDENT CREATIVE PRACTICE`.
- Footer nav: `WORK`, `EXPERTISE`, `STUDIO`, `CONTACT`.
- Contact descriptor: `LET'S MAKE CONTACT`.
- Display email: `hello@zeno.studio` **as editable fictional template copy**. Do not claim the address is verified or owned. Put it in siteConfig so it can be changed before deployment; avoid silently sending submissions to it.
- Social labels: `INSTAGRAM / BEHANCE / LINKEDIN`. Because no genuine accounts were provided, either keep them intentionally plain typographic labels or mark them as disabled sample links until configured. Do not ship `href="#"` fake links.
- Copyright: `© 2026 ZENO. ALL IDEAS IN MOTION.`
- Back-to-top control: `BACK TO TOP ↑` (actually scrolls to `#home`).

### CTA functionality

For `START A CONVERSATION ↗`, open a minimal, visually integrated **contact dialog** or reveal an inline form with Name, Email, Project type, Message, and Submit. Include accessible labels, field validation, and clear error states. Because no backend or real inbox is supplied:

- Do **not** pretend an email was sent.
- If a backend/email service is already connected, wire it correctly.
- Otherwise, choose an honest useful fallback: prepare an email via `mailto:` *only after a real destination is configured*; or provide a copy-to-clipboard project brief and explain that the template requires inbox configuration. You may keep the form in demo mode with an explicit `Preview only — connect a form endpoint before publishing` note, rather than fake success.
- Make every contact control purposeful and testable.

**Motion storyboard:**

1. The violet line from the previous section enters and becomes part of a large SVG arc system.
2. The large cobalt ring is drawn with progressive SVG stroke as the CTA enters view; faint circular registration lines follow slightly later.
3. The headline reveals through large clean line masks; `SOMETHING` resolves with a restrained italic flourish.
4. CTA button has a subtle magnetic hover (desktop pointer only), tactile focus/click response, and a directional arrow motion.
5. Footer rule draws from left to right. Wordmark and nav appear through tasteful clipping, not generic fade-only effects.
6. Back-to-top smoothly returns to the hero while respecting reduced motion.

---

# 5. ONE CONTINUOUS VISUAL WORLD

This is non-negotiable. Don't make it appear that four different graphic designers built four backgrounds.

- Continuous background variable (`--bg`) across the entire scroll.
- Same typography system, header sizing, violet dot, grid/hairline weight, print texture intensity, and spacing logic.
- A **coordinated violet signal path** should visually link sections: its stroke and several nodes recur at approximately the same desktop x-coordinate (roughly 68–70% of viewport on expertise/work/contact). For the hero transition, curve the path from the collage toward this alignment. Ensure no obvious line discontinuity at the section edges.
- Use section-local SVG path segments with matching top/bottom endpoints, or a single measured page overlay that updates on resize; choose the more reliable method for this codebase. DO NOT use a random unrelated squiggle in each section.
- The cobalt graphic changes meaning across the experience: **hero arc → expertise network → work ribbon → CTA interrupted circle**.
- Micro-labels and registration marks should reuse the same system, not be scattered decorations.
- Do not add heavy borders or gradient panels between sections. Transitions should be achieved through content and geometry, not background color cuts.
- Keep offscreen paths from becoming interactive obstacles (`pointer-events: none`, suitable z-index).

---

# 6. MOTION SYSTEM — AGENCYLEVEL, NOT GENERIC

Define a coherent motion grammar:

| Element | Motion behavior | Duration / feel |
|---|---|---|
| Headline | clip/mask reveal + tiny directional travel | ~0.8–1.2s, editorial ease |
| Eyebrows / annotations | directional wipe / type tracking settle | ~0.45–0.65s |
| Collage artwork | staggered translational composition | ~0.8–1.5s |
| Violet path | scroll-progress SVG stroke reveal | reversible and synced |
| Cobalt ribbon/ring | scroll-progress path growth + small scale | smooth, no wobble |
| Service node | focus/hover connected response | ~0.25–0.45s |
| Project focus | masked crop + perspective shift | ~0.5–0.8s |
| Dialog | clean editorial expansion | ~0.35–0.6s |
| CTA arrow | small translated arrow | ~0.18–0.28s |

Motion rules:

- Build **one composed animation timeline per section**, not dozens of disconnected `whileInView` fading elements.
- Scroll-based animations must respond to both forward and reverse scrolling.
- Keep every headline readable throughout or near-completion of entrance, and never leave crucial text permanently hidden if JS fails.
- `prefers-reduced-motion: reduce`: disable scrubbed/pinned cinematic effects, return objects to their final visible state, keep click/navigation behavior intact, avoid transform-heavy page shifts.
- For touch screens, replace hover-only experiences with tap-to-select interactions.
- Prefer real scrolling over very long pinned timelines. Maximum one optional purposeful pinned sequence in the entire page, and only on desktop if it meaningfully enhances storytelling; **do not hijack scroll**.
- Avoid Lenis/ScrollSmoother unless already correctly integrated. Native scroll should remain functional even without GSAP.
- Optional subtle cursor follower only for coarse-free fine-pointer devices, but do not introduce a giant blob cursor.
- Under no condition should the site render a blank page until an animation completes.

---

# 7. RESPONSIVE CONTRACT

Desktop design references are **art direction**, not 16:9 wallpapers. Implement true responsive composition:

### Large desktop ≥ 1440px

- Closest visual resemblance to supplied references.
- Hero and expertise split ~40–56 / ~44–60 proportions as appropriate.
- Art crops layered and paths behind content.
- Work both project worlds visible in one designed composition.
- Typographic hierarchy dominates while media reads clearly.

### Laptop ~1024–1439px

- Slightly reduce type size with `clamp()`.
- Resize collage without cropping critical pieces.
- Allow selected work to grow vertically rather than shrinking project assets to illegible thumbnails.
- Avoid positioning important labels at the extreme edges.

### Tablet ~768–1023px

- Use 1-column or balanced compact 2-column where possible.
- Services diagram may switch to a 2×2 responsive map with live accessible labels.
- Case studies become substantial stacked artworks.
- Reposition paths and rings to avoid masking content.

### Mobile ≤ 767px

- Header with mobile menu and compact mark.
- Hero stacked: headline first, supporting copy + CTAs, visual artwork below or partially behind with controlled layering. Do **not** shrink the entire desktop screenshot into a tiny phone-width graphic.
- Display typography around `clamp(3.2rem, 12vw, 5.6rem)`; manually tune line breaks per breakpoint; never clip `EXPECTED`, `IRRELEVANT`, `PERSPECTIVE`, or `SOMETHING` horizontally.
- Services become accessible stacked/2-column selector items with images and a compact line diagram; preserve interaction, reduce paths.
- Selected Work becomes Auren then Morrow as two large vertically stacked creative showcases with clear project action.
- CTA headline and ring remain expressive but must not obstruct copy or footer. Footer nav wraps to logical columns.
- Use no hover-only requirements, no giant fixed background that impacts touch scroll, and no horizontal overflow.

Test at widths **375, 390, 768, 1024, 1440, 1920px**. Check both portrait and landscape where possible. Content must remain legible and interactive with browser zoom.

---

# 8. ACCESSIBILITY, INTERACTIONS, AND HONEST CONTENT

- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.
- One meaningful `<h1>` in hero; subsequent section headings are properly nested.
- Interactive elements are links/buttons, not click handlers on inaccessible `div`s.
- Visible focus states and usable tab order.
- Adequate contrast on muted labels and violet text, including on mobile.
- SVG purely decorative elements `aria-hidden="true"`.
- Modal labels, Escape handling, focus return, and body scroll-lock restoration.
- Menu supports keyboard/touch.
- `loading="lazy"` for nonhero imagery, alt text for meaningful project art, `alt=""` for purely ornamental art if described elsewhere.
- Ensure scroll effects never make text disappear when JavaScript is off or reduced motion is enabled.
- Avoid fake statistics, invented team biographies, real-client claims, unverified partner logos, or fictional case-study performance results. Auren House and Morrow Field are concept projects, not proven work from a real agency.
- Preserve complete functionality of all visible calls to action. No `href="#"` dead interactions.
- The `Studio` and `Our Approach` interactions should be real dialogs/drawers; project links real overlays/routes; contact CTA should not lie about submission.

---

# 9. PERFORMANCE AND ENGINEERING QUALITY

- Use the supplied optimized artwork webps; provide sensible image dimensions/aspect ratios. Keep 2K reference screenshots **out of the normal rendered DOM** except optional dev/debug mode.
- Font loading: minimize families/weights, display swap, fallback stacks.
- Use GSAP transforms/SVG path strokes instead of repeated forced layout reads.
- Restrict pointer parallax to one `requestAnimationFrame` loop at most, use `gsap.quickTo()` or equivalent.
- Avoid excessive backdrop-filter, global high-cost blur filters, large continuous box shadows, and hundreds of CSS decorative nodes.
- No console errors, hydration mismatches, missing image imports, inaccessible empty buttons, or runaway ScrollTriggers.
- Cleanup of animation event listeners, intersection observers, media watchers, dialog keyboard listeners.
- All links and forms have a defined outcome.
- Code should be modular, typed, and easy to change as a reusable template.
- Centralize textual content, asset URLs, and external contact/social configuration in data/config when reasonable.
- Set descriptive document title and meta description, theme color, favicon based on the interrupted-circle symbol (SVG if possible).

---

# 10. IMPLEMENTATION ORDER — EXECUTE WITHOUT STOPPING AT PLANNING

1. Inspect the uploaded/reference assets and any existing source tree.
2. Set up theme tokens and font imports.
3. Implement the semantic four-section page, real copy, layout, nav, and footer.
4. Add artwork crops in their proper sections; tune positions against the four references.
5. Build the custom ZENO wordmark and interrupted-circle SVG identity.
6. Implement the global continuous grid/line language and section-specific live cobalt/violet SVG paths.
7. Implement working menus, services selection, project case-study dialog, Studio and Approach panels, and honest contact action.
8. Implement page-intro and scroll choreography with desktop/mobile motion strategies.
9. Add responsive layouts, keyboard support, reduced motion, optimized image loading.
10. Run any available build/typecheck/lint. Review DOM for broken asset paths and dead links. Test key viewport widths as available. Fix issues before responding.

**Important:** No intermediary request for user approval. The images and requirements are already approved. Make reasonable implementation decisions and finish the site.

---

# 11. ACCEPTANCE CHECKLIST (MUST PASS)

- [ ] ZENO hero appears unmistakably related to reference 01 (same content, giant serif, violet accent, collage, dark editorial tone).
- [ ] Header logo, nav, CTA, and mobile navigation work.
- [ ] Expertise visually matches reference 02's connected 2×2 graphic system, rather than basic icon cards.
- [ ] Four service areas are genuinely interactive and accessible.
- [ ] Work visually matches reference 03 with two distinct art-directed project worlds and a live connecting arc.
- [ ] Each project opens real, readable details and can be closed.
- [ ] Contact visually matches reference 04 with giant interrupted cobalt circle, oversized serif type, live footer.
- [ ] All CTA behavior is real; no fake successful message delivery.
- [ ] Violet path/cobalt imagery create continuity across sections; no visible hard background seams.
- [ ] Typography remains readable at mobile and desktop sizes.
- [ ] The site has meaningful animations beyond fades, with smooth reversible scroll transitions where appropriate.
- [ ] All motion reduces properly under `prefers-reduced-motion`.
- [ ] No full reference screenshot is being used as an entire section image.
- [ ] No horizontal scrollbar, broken assets, JS crashes, or blocked scroll.
- [ ] All four sections are implemented, not merely the hero.
- [ ] A build/test command is run and resulting issues are addressed as far as the environment permits.

---

# 12. REQUIRED FINAL RESPONSE FROM AGENT

After implementation, give me:

1. A concise summary of the completed page and interactions.
2. The files/components created or modified.
3. Which assets were used and where.
4. Verification results (build, responsive checks, accessibility, reduced motion, link/interaction checks).
5. Any genuinely unfinished external setup, especially contact email delivery and social accounts.

Do **not** respond only with a plan, mockup, or explanation. **Create and implement the actual website now.**
