# SERRAFORM — 3D Landing Template Implementation Plan

> **For the implementing agent:** Build from this document without reopening creative decisions or requesting a brand-board approval. The user delegated those decisions and requested this single Markdown handoff. Use the `create-landing-template`, `webgpu-threejs-tsl`, and applicable implementation/verification skills. Execute the tasks in section 14 in order. Do not commit or deploy unless separately instructed.

**Goal:** Create a premium, tactile landing page for a fictional studio making pleated felt room dividers, with connected folding geometry as its central interaction.

**Architecture:** Server-rendered editorial sections surround one progressively enhanced folding experience. A pure TypeScript geometry model drives both an always-available SVG representation and a deferred Three.js renderer. Configuration and a local project brief work without a graphics context.

**Tech stack:** Existing Next.js 16.4.3, React 19.3.0, TypeScript, Tailwind v4, Three.js 0.186.1, CSS motion, and optional deferred Lenis already installed in this repository. Use direct Three.js, not React Three Fiber. No new runtime dependency is needed.

**Spec:** This document contains the complete creative brief, textual brand board, copy, 3D contract, motion map, asset direction, repository wiring, and implementation tasks. No companion file is needed to understand it.

**Status:** Proposal and implementation instructions only. No landing-page source, images, models, brand-board HTML, tests, or exports were created for this handoff. Future paths below describe the implementation deliverables, not files already produced.

## 1. Global constraints and repository findings

- Public URL: `/templates/serraform`. Source route group: `src/app/(serraform)/`. CSS prefix: `srf-`; local custom properties use `--srf-` where they are not Tailwind theme tokens.
- The user explicitly requested no questions, no approval pauses, and exactly one Markdown file in this planning task. The textual brand board below replaces this task's usual HTML board. All creative decisions are planner decisions, not a claim that the user reviewed a visual board.
- Preserve existing work. At inspection, `scripts/templates.config.ts` was modified and `docs/image-prompts/` and `src/app/(datum)/` were untracked. DATUM is partially wired; do not repair, delete, overwrite, or count it incidentally.
- Keep all template imports relative and inside `src/app/(serraform)/`, or from npm packages. No `@/`, `~/`, shared `src/lib` imports, or imports from another template. Shared repository registration files are the intentional integration points.
- Read the installed Next.js guides before implementation: `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`, `13-fonts.md`, `14-metadata-and-og-images.md`, `01-app/02-guides/lazy-loading.md`, and `01-app/03-api-reference/03-file-conventions/route-groups.md`.
- Keep `page.tsx` and editorial sections as Server Components. Use small client leaves for controls, preference detection, navigation, motion, and rendering. `ssr: false` belongs in a Client Component; do not place it in a Server Component. Metadata stays server-side.
- No paid generation, remote model/HDR downloads, tracking, backend, checkout, email transmission, or customer database. The inspected media-key detector reported no configured image/video generation keys. This concept requires none.
- The page represents a fictional product. Dimensions are design parameters, not manufacturing certification. Do not invent acoustic test scores, sustainability certificates, customer logos, awards, testimonials, sales numbers, or shipping guarantees.
- This specific brand system takes priority over generic landing-page defaults: three font roles, solid oxblood headings, a flat rose ground, and a full-width editorial header. Do not substitute a floating glass pill, gradient headline, neon technical dashboard, or generic feature-card grid.

### Review focus

1. Preference changes during an asynchronous renderer import/init must leave no live context or hidden content; test in Task 3.
2. Fast backward scroll after manual configuration must not overwrite the visitor's chosen finish or opening; test in Tasks 2 and 4.
3. Extreme fold values must retain connected edges and finite-thickness clearance; test in Task 2.
4. No-JS, failed graphics, and touch users must get a composed page with usable information and truthful controls; test in Tasks 1, 3, and 6.
5. Gallery screenshots, copy bundles, canonical routes, and standalone export must agree; test in Tasks 5 and 6.

## 2. Brand concept and gallery differentiation

**Brand:** SERRAFORM. **Product:** Fold 16, a freestanding pleated felt divider. **Tagline:** “A little fold. A different room.”

**One-line story:** SERRAFORM makes soft architectural objects that give open rooms a sense of place.

**Central idea → signature mechanic:** A room changes when a continuous surface folds, so the page opens one connected pleated screen as the visitor scrolls, then hands its geometry to the visitor.

**Audience:** Interior designers, small studio owners, and design-conscious people dividing a shared living or working room. Traffic is assumed to arrive through the template gallery or a shared product link.

**Primary conversion:** “Build your room brief” — an anchor to a local brief form. Completion creates a readable configuration receipt and downloadable text file. It does not send a request or reserve a product.

**Three objections answered by the page:** Will it fit? Can I understand its material and construction? What exactly happens when I use the CTA?

**Mood in five words:** Tactile, architectural, quiet, warm, precise.

**Motion identity:** Deliberate material movement. Primary verb **unfold**; secondary verb **settle**. The signature moment is a narrow pleated silhouette broadening into a readable room boundary while its span dimension follows the actual geometry. The surrounding UI moves quietly.

**Difference from the inspected gallery:** TESSERA has acoustic wall installations; HOLLOWAY has modular furniture; AMAOTO uses a radial umbrella rig; ASSEMBLAGE curls separate sheets; DATUM explodes render-pass slabs. SERRAFORM instead uses a linear connected accordion with constant panel lengths, a rose/oxblood art direction, and measurable spatial opening. Do not drift into an acoustic simulator, exploded assembly, material shader playground, or room flythrough.

## 3. Textual brand board

### Logo and recurring details

- Create an original inline SVG mark on a `32 × 32` viewBox: a continuous angular path through `(3,25) (9,7) (15,25) (21,7) (29,25)`, with a 2.5-unit stroke and softly rounded joins. It is a small elevation of a folded sheet, not a stock mountain icon. No enclosing badge.
- Wordmark: `SERRAFORM` in Anybody 500, slightly tightened tracking, with the mark 12px to its left. Lockup width approximately 184px at a 24px mark height. Give the lockup an accessible name; hide decorative mark paths from assistive technology.
- Light lockup: oxblood on rose. Dark lockup: porcelain on oxblood. Favicon: the mark alone, optically thickened to remain legible at 16px and 32px.
- Recurring detail 1: a small zigzag crease marker before section numbers `01` through `06`.
- Recurring detail 2: dimension brackets with short perpendicular end ticks; these belong to the product and specification rows, not every UI container.
- Recurring detail 3: a folded corner on the brief receipt, echoed by a triangular clipping detail on the primary button's trailing icon area.
- Recurring detail 4: captions such as `Fold 16 / Clay / 1.73 m span` in utility type. Readouts display derived values, never fake live telemetry.

### Palette

Use exactly these seven colors in the registered palette. Derive tints with `color-mix()` and use transparency for shadow surfaces. No broad `paletteExempt` or `mediaExempt` is needed.

| Role | Hex | Application |
|---|---|---|
| Rose | `#F3E8E4` | Dominant page ground, at least 65% of the page |
| Oxblood | `#4B202A` | Main type, rules, construction section, logo |
| Clay | `#9A463D` | Primary action, default felt finish, errors with explicit text |
| Mauve | `#735B60` | Secondary text on rose and porcelain |
| Flax | `#D8C4A7` | Second felt finish and restrained material inset |
| Sage | `#A6B3A0` | Third felt finish and receipt confirmation surface |
| Porcelain | `#FFFCF8` | Text on dark/action surfaces, occasional sheet surface |

Computed solid-color contrast ratios: oxblood/rose **11.35:1**, mauve/rose **5.15:1**, porcelain/clay **6.19:1**, oxblood/sage **6.22:1**, porcelain/oxblood **13.34:1**, clay/rose **5.27:1**. These cover the actual text combinations. Flax and sage are material swatches, not low-contrast text. Use a 2px contrasting focus outline with 4px offset, changing to porcelain on oxblood sections.

### Typography

The display/body pair was not present in inspected route layouts or design docs. Use these exact roles through `next/font/google`, Latin subset, normal style only:

| Role | Family / weight | Variable | Sizes |
|---|---|---|---|
| Display | Anybody 500, 600 | `--font-srf-anybody` | H1 `clamp(48px, 5.6vw, 80px)`; H2 `clamp(36px, 4vw, 60px)` |
| Body | Commissioner 400, 500, 600 | `--font-srf-commissioner` | Body 18px/28px desktop, 16px/24px mobile; UI 16px/24px |
| Utility | Victor Mono 400, 500 | `--font-srf-victor` | 12px/18px captions; 14px/20px dimensions; `preload: false` |

Assign `--font-display`, `--font-body`, and `--font-mono` to the distinct font variables; never make self-referencing variables. H1 line-height 1.02, tracking -0.035em. H2 line-height 1.08. Sentence case except the wordmark and product code. Keep body paragraphs within 60 characters per line. No italic display treatment, giant all-caps manifesto, or random character scrambling.

### Layout system

- Desktop content width `min(100% - 96px, 1344px)`; 12 columns, 24px gutters. Tablet horizontal gutters 32px; phone gutters 20px. At 1440px, the content aligns at x=48 and x=1392.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96px. Standard section padding is 96px desktop / 64px mobile. Let the signature scene's scroll range define its extra length.
- Buttons: minimum 48px height, 16px horizontal padding, 8px radius. Cards and figure panels: 8px radius maximum. Inputs: 4px. Only material swatches are circles.
- Hairlines use oxblood mixed with rose. Use solid section grounds; scene lighting may produce natural shading. No glassmorphism, ornamental gradients, glowing edges, arbitrary floating spheres, or persistent grain overlays.
- One wide hero illustration, one large signature stage, one asymmetric room-study spread, one dark construction strip, one quiet FAQ, one brief. Avoid repeating the same two-column layout for the whole page.

## 4. Page structure and final copy

Use a long-form product story. The primary CTA wording is identical in the header, hero, and closing section. Navigation links are “The fold”, “Make it yours”, “In a room”, “Questions”, with a primary “Build your room brief” action.

### 4.1 Header and hero — `#top`

Header height 80px desktop, 64px mobile. Full-width editorial bar, solid rose, thin bottom rule when scrolled. Logo left, section links center, CTA right. Collapse to a menu button below 900px. Keep the CTA accessible in the mobile panel.

Hero copy:

- Eyebrow: `SERRAFORM / Fold 16`
- H1, intentional two-line break: **“Make room” / “for a softer edge.”**
- Lead: “A sculptural felt divider that opens with your day. Shape a reading corner, a shared studio, or a little space of your own.”
- Primary CTA: **“Build your room brief”** → `#brief`
- Secondary action: a quiet text link **“See the fold”** → `#fold`
- Factual product line: `16 connected panels · 3 finishes · Adjustable span`
- Small label beside the object: `Fold 16 in Clay`

At 1440×900, place the headline at approximately y=130, the lead/CTA immediately beneath it, and a wide object composition from roughly y=380 to y=800. The full screen silhouette and ground contact must be visible. Align the headline left; place a small product caption at the right edge of the image area. Do not place text over the felt. At 1280×720, reduce illustration height so headline, lead, CTA and most of the object remain visible.

The hero uses the real model's default-pose still or matching SVG, not a second live canvas. On a phone, use a centered object crop with all sixteen folds visible and height 260–300px after the copy. Maintain the natural page flow; do not force a phone hero into exactly 100vh.

### 4.2 Folding story — `#fold`

Heading: **“One surface. More possibilities.”**

Three narrative chapters beside one sticky stage:

1. **“Gather it close.”** “Keep a compact boundary beside a desk or chair. The pleats stay connected as the footprint changes.”
2. **“Give it room.”** “Open the same sixteen panels into a wider screen. Its span changes; its material length stays the same.”
3. **“Find your balance.”** “Choose the opening that suits the space, then make the finish your own.”

Desktop: a 7-column stage on the left, 1-column gap, 4-column narrative/control rail on the right. Each chapter has a minimum block height of 70svh. The subsequent configuration panel is at least 85svh. The sticky stage remains in this wrapper only, at top 96px, height `calc(100svh - 128px)`, minimum usable height 420px. It releases before the room studies.

The stage contains a floor, one divider, a span bracket, a finish label, a quiet `01 / 03` chapter marker, and the “Use still view” control. No HUD, grid of telemetry, decorative orbiting icons, or glowing floor.

### 4.3 Make it yours — `#configure`, final panel of the same experience

Heading: **“A shape that fits your day.”**

Copy: “Open the pleats. Choose a finish. Keep the proportions that feel right.”

Controls, in order:

1. `Opening` native range, 0–100, step 1, default 50. Visible value is percent plus outer span in meters. Endpoint captions: `Gathered` and `Open`.
2. `Finish` native radio group: `Clay`, `Flax`, `Sage`; default Clay. Each has a circular swatch, name, and explicit selected check.
3. `View` buttons: `Front`, `Three quarter` (default), `Side`. These set camera poses; no free orbit controls, wheel zoom, or drag requirement.
4. `Reset shape` restores opening 50, Clay, Three quarter. `Follow the story` restores scroll ownership without erasing the selected finish.
5. Summary: `Fold 16`, `1.60 m high`, derived outer span, `16 panels`, and chosen finish.
6. CTA: **“Use this shape in my brief”** → `#brief`, preserves configuration and focuses the brief heading.

Below the readout: “Dimensions describe this concept model. This is not a manufacturing or acoustic specification.” No price or simulated stock scarcity.

Desktop configuration shares the exact canvas from the story; do not mount another renderer. Recommended DOM order is story rail, stage, controls. CSS grid places the stage in column 1 spanning the story and controls rows, with the two text blocks in column 2. The enhanced story requires a fine pointer, width at least 900px, height at least 700px, and no reduced-motion preference. In every other case, switch to normal block flow in DOM order: short story with three SVG poses, then the stage, then controls. Remove all tall scroll spacers and sticky positioning. This avoids a tiny pinned phone canvas and keeps configuration beside its stage. In flow layout, the “Make it yours” navigation handler scrolls to the stage immediately before the controls; no-JS anchor navigation may go directly to the controls heading.

### 4.4 Room studies — `#rooms`

Large two-line benefit statement, separate from the hero: **“Keep the room open.” / “Give each moment a place.”**

Three visibly labeled **concept room studies**, not customer projects:

| Study | Copy | Composition |
|---|---|---|
| Reading corner | “A soft edge between the armchair and everything else.” | Wide 8-column still; Flax at 35% opening beside a simple chair and low book plinth |
| Shared studio | “A little separation where two working days overlap.” | 4-column portrait crop; Clay at 75% opening between two bare desks |
| Slow morning | “A boundary you can change when the day changes.” | Full-width shallow crop; Sage at 60% opening in an empty sunlit room |

Use the same procedural product model and simplified architectural primitives in these stills. No invented people, brand logos, lush stock-photo interiors, or separate AI reinterpretations of the product. Captions remain visible. These are figures, not clickable cards: no false pointer cursor or fake hover affordance.

### 4.5 Construction — `#construction`

One oxblood section with porcelain type and three illustrated, numbered rows. Heading: **“The detail is in the fold.”**

1. **“A continuous profile.”** “Sixteen connected panels make one changing silhouette.” Show the top-down zigzag diagram.
2. **“A tactile surface.”** “A matte felt finish keeps the object quiet in the room.” Show the model's close material crop; do not claim absorption coefficients.
3. **“A grounded stance.”** “Slim floor supports sit beneath the first and last folds.” Show the support geometry with a section illustration.

Spec strip: `Height 1,600 mm` / `Panel pitch 180 mm` / `Developed length 2,880 mm` / `Model thickness 12 mm`. Explain that span is calculated from opening. These are concept parameters.

### 4.6 Questions — `#questions`

Use six native `<details>` items, each with a visible focusable `<summary>`. Answers are rendered in HTML and remain accessible without JavaScript.

1. **How wide is Fold 16?** “In this concept model, the outer span runs from approximately 0.71 m to 2.74 m. The opening control shows the current span.”
2. **Does opening it stretch the panels?** “No. Each of the sixteen panels keeps the same length. The connected folds change angle.”
3. **Can I choose another finish?** “The demo offers Clay, Flax, and Sage. Your selected finish is included in the room brief.”
4. **Is this an acoustic performance claim?** “No. This is a design concept for a felt divider. No acoustic rating or laboratory result is represented.”
5. **Do I need a powerful device to explore it?** “No. The still view shows the same shape and dimensions. Interactive 3D is optional.”
6. **What happens when I build a brief?** “A configuration summary is prepared in this browser. You can download it as a text file. Nothing is sent and no order is placed.”

### 4.7 Brief and footer — `#brief`

Heading: **“Start with the room you have.”**

Lead: “Keep your chosen shape and a few notes together in a simple room brief.”

Form fields: `Project name` (required, trimmed length 2–80); `Room` (required select: Living space, Workspace, Hospitality, Other); `Notes` (optional, max 500 characters). No email, address, phone, consent checkbox, or mailing-list claim. Keep labels above fields.

Show the current configuration summary alongside the form. Button: **“Build your room brief”**. Persistent helper: “Prepared locally. Nothing is sent.”

Success heading: **“Your room brief is ready.”** Text: “Your shape and notes are gathered below. Download a copy to keep them.” Actions: `Download brief` and `Edit brief`. Render a human-readable receipt with product, finish, opening, outer span/depth, height, project name, room, and notes. Success remains on-page, with focus moved to its heading and one polite announcement.

Footer: original mark, “A little fold. A different room.”, section links, `About this demo` → the disclosure, and `Back to top`. Disclosure: “SERRAFORM is a fictional design concept. This demo prepares a local brief and does not collect or send your entries.” Do not add dead privacy, social, contact, or shopping links. No cookie banner is needed for this nontracking demo.

## 5. Procedural 3D model: exact geometry contract

Use meters, right-handed coordinates: X across the screen, Y upward, Z front/back. The floor is Y=0. Model the product as one finite-thickness accordion ribbon, not sixteen disconnected boxes and not an X-scaled mesh.

### Dimensions and mapping

`N = 16` panels, panel length `b = 0.18`, height `H = 1.60`, thickness `t = 0.012`, developed centerline length `L = N*b = 2.88`.

Let `u = clamp(openingPercent / 100, 0, 1)` and use radians internally:

```text
c = cos(76 degrees) + (cos(18 degrees) - cos(76 degrees)) * u
theta = acos(c)
s = sin(theta)
P[j].x = (j - N/2) * b * c                       for j = 0..N
P[j].z = ((j mod 2) - 0.5) * b * s
centerlineSpan = L * c
centerlineDepth = b * s
outerSpan = centerlineSpan + t * s
outerDepth = centerlineDepth + t / c
```

This mapping makes centerline span linear in opening while preserving every panel length. Do not call `theta` the opening percentage. Show outer dimensions in the UI, rounded to two decimals in meters; use unrounded numbers in geometry and calculations.

### Connected thickness

For segment `j`, its unit direction in XZ is `(c, (-1)^j*s)` and normal is `(-(-1)^j*s, c)`. At each interior hinge, offset front/back edges from `P[j]` by `±(0, t/(2*c))`. At each endpoint, use `±(t/2)*normalOfAdjacentSegment`. This mitered cross-section keeps the ribbon connected. Extrude it from Y=0 to H; construct front/back side faces, top/bottom caps, and endpoint caps in a reusable `BufferGeometry` with fixed topology. Duplicate vertices for face normals only; coordinates at shared hinges must agree. Recompute positions/normals only when opening changes, never allocate geometry per animation frame.

At the most closed pose, `t*tan(theta) < b` (approximately 0.04813 < 0.18); the chosen range avoids miter collapse. Use tests to validate the polygon has no nonadjacent edge intersections. Do not extend the 76° limit for a more dramatic screenshot. The model is a kinematic illustration, not cloth or structural simulation.

Two simple oxblood steel feet: each 0.10m wide, 0.38m deep, 0.012m high, centered beneath the first and last panel midpoints. Place their top at Y=0; the floor is at Y=-0.012 for this support detail. Round their edges subtly. Feet translate with the relevant panel midpoints and stay level. Do not attach immobile feet while the sheet slides through them. Product depth readout describes the felt body; add a separate `Support depth 0.38 m` line to the detailed brief.

### Numeric reference tests

| Opening | Fold angle | Centerline span | Outer span | Outer depth |
|---|---:|---:|---:|---:|
| 0% | 76° | 0.6967350593m | 0.7083786080m | 0.2242560170m |
| 50% | 53.38113282° | 1.7178889131m | 1.7275203660m | 0.1645895130m |
| 100% | 18° | 2.7390427669m | 2.7427509710m | 0.0682406060m |

Assert these within `1e-6`; all adjacent centerline hinge distances equal 0.18 within `1e-9`. All 17 hinge X positions increase; total material centerline length is 2.88. At opening 50 the displayed span is `1.73 m`. Negative/overrange finite inputs clamp; nonfinite input becomes the default 50%. Geometry remains centered, finite, and connected at every integer opening.

### Materials, light, and camera

- Felt: `MeshStandardNodeMaterial`, metalness 0, roughness 0.92. TSL samples a small deterministically generated local grain texture using developed-sheet UVs (`u=j/16`, `v=y/H`), so fibers stay attached while the sheet folds. Variation amplitude at most 4%; no animated shader time, no displacement that changes the dimension calculation, no screen-space noise that swims when the camera moves. Generate the texture in memory; use mipmaps to prevent shimmer.
- Use palette colors as source material colors. The same geometry, finishes, and light rig serve posters and the live stage. Avoid photorealism claims; achieve quality through silhouette, face shading, edge fidelity, and grounded contact.
- Feet: roughness 0.42, metalness 0.65, oxblood base. Floor: rose, roughness 1. Lighting: broad porcelain key from upper left, low rose fill, faint opposing rim. Use a directional light plus ambient/hemisphere fill and one 1024px `PCFShadowMap` on desktop; no environment downloads, transmission, bloom, SSAO, particles, physics, or post-processing stack. Do not use `PCFSoftShadowMap`: the installed WebGPURenderer removes it and substitutes PCF with a warning.
- Perspective camera, 34° vertical FOV, near 0.05, far 30. Target `(0,0.80,0)`. Starting three-quarter direction approximately `(3.4,2.2,5.0)` normalized from target; front direction `(0,0.1,1)`; side `(1,0.15,0.1)`. Compute distance to fit the maximum-open bounding box plus feet at the current aspect ratio with 12% padding. Never let manual opening crop the screen.
- Keep camera framing fixed across opening changes; fit to the maximum dimensions so the genuine width change remains legible. Only view buttons change the orbit, with a 700ms tokenized settle. No automatic rotation or hover parallax on the product.
- Render full model plus supports within 25,000 triangles and 30 draw calls. A simple ribbon should be far below this ceiling. Use `renderer.info` for measurement, not an invented on-page FPS counter.

## 6. Interaction and scroll ownership

Pure interfaces live under `fold/`; no imports from Three.js in geometry, state, or validation modules:

```ts
type FinishId = 'clay' | 'flax' | 'sage';
type ViewId = 'front' | 'quarter' | 'side';
type FoldConfig = { opening: number; finish: FinishId; view: ViewId };
type FoldMetrics = { centerlineSpan: number; outerSpan: number; outerDepth: number; angleRadians: number };
type PointXZ = { x: number; z: number };
type FoldPose = { hinges: PointXZ[]; front: PointXZ[]; back: PointXZ[]; metrics: FoldMetrics };

normalizeOpening(value: number): number;
deriveFold(opening: number): FoldPose;
storyProgress(scrollY: number, start: number, end: number): number;
storyOpening(progress: number): number;
storyChapter(progress: number): 0 | 1 | 2;
```

`storyProgress` clamps to 0–1, returns 0 for nonfinite values or `end <= start`. Measure start from the first narrative chapter's document top minus sticky top offset; end is the configuration panel's top minus that same offset. Cache measurements and refresh on resize/font readiness, not every scroll event.

Timeline: p=0–0.12 hold opening 0; p=0.12–0.62 interpolate 0→100 with `smoothstep`; p=0.62–0.82 hold 100; p=0.82–1 interpolate 100→50. Chapters are `[0,.34)`, `[.34,.72)`, `[.72,1]`. Reverse scroll reverses the same deterministic pose. Keep camera at three-quarter throughout: the fold is the signature, not a simultaneous orbit.

Use a reducer with modes `story` and `manual`, config `{opening:50, finish:'clay', view:'quarter'}`, and actions `SET_OPENING`, `SET_FINISH`, `SET_VIEW`, `RESET`, `FOLLOW_STORY`. Opening, finish, or view input enters manual mode. Any subsequent scroll may update chapter progress, but must not alter manual geometry or selection. `RESET` returns the default config in manual mode; `FOLLOW_STORY` changes to story mode and quarter view, retains finish, and resumes the current scroll-derived opening. Transition from the current pose without a jump.

Initial SSR configuration is the default 50/Clay/quarter. After eligibility is known, an untouched enhanced desktop story enters story mode; flow layouts remain manual at 50. If the layout changes from story to flow, freeze its current effective opening into manual config. Returning to desktop does not erase a manual choice; the visitor may use `Follow the story`. Hide that control in flow layouts. When a finish or view action changes story mode to manual, carry the current effective opening in the action payload instead of jumping to a stale stored default. The displayed slider, dimensions, summary, and brief snapshot all use the same effective configuration: story-derived opening in story mode, stored opening in manual mode, plus the selected finish and view. A brief submission captures that effective configuration once.

Store high-frequency progress and rendered pose in refs. Update React only for user events, mode, finish, view, and discrete chapter changes. A dimension DOM ref can update when the displayed rounded value changes. Do not rerender the React tree every scroll frame. Use one coordinator rAF for scroll reads, CSS custom-property writes, smoothing, and dirty render requests. If using Lenis, feed it from that same loop; never combine its auto-rAF with another loop for the same work.

DOM controls are the primary input interface. Canvas is `aria-hidden="true"`, unfocusable, and never steals wheel/arrow keys. Screen-reader users get the figure description and native slider/radio/button controls. Native slider arrows must not be intercepted. Announce configuration changes on committed input, not each animation frame. Hash links work with browser back/forward; do not continuously replace the URL or document title during scrolling.

## 7. Renderer lifecycle, fallbacks, and performance

`FoldStage.tsx` initially renders a composed `FoldPoster` SVG and reserves its exact box. `FoldPoster` consumes the same pure geometry, finish, and `ViewId` data; use depth-sorted filled faces, a simple ground shadow, and dimension bracket. Implement a pure `projectFold(pose, view, aspect)` in `fold/projection.ts`: project vertices using the corresponding camera direction, 34° perspective FOV, stable camera basis, and fit to the maximum-open model plus feet from section 5, then return face polygons and depth keys. Share the pure camera-fit calculation with the live scene so switching from SVG to canvas does not change the silhouette's framing. Front, quarter, and side buttons must change this projection even when graphics are unavailable or reduced motion is active. Fit each view independently to avoid an empty-looking side elevation; use the same declared fit behavior in the live camera. The dimension readout always reports real span regardless of projected width; omit the width bracket in side view and retain the HTML value. Test finite coordinates and viewport containment in each view at 0%, 50%, and 100% opening. It is a finished visual, not an empty “3D loading” rectangle. Prefer baked images for editorial stills after they exist, but retain SVG fallback.

Eligibility must be determined before calling `import('./FoldScene')`, since that module imports Three.js:

- SSR/first render: poster, reduced-motion-safe default. No graphics import or renderer creation.
- Fine pointer, width at least 900px, height at least 700px, no reduced motion, no Save-Data: initialize after the stage is within one viewport and the browser is idle. A user pressing `Explore in 3D` may start it immediately.
- Coarse pointer, width below 900px, height below 700px, or Save-Data: require `Explore in 3D` activation. Coarse/narrow/short layouts use static story poses and manual configuration with SVG. Save-Data alone preserves the desktop story layout while preventing automatic graphics loading.
- Reduced motion: never import/init the engine, even after pressing controls. Use immediate SVG pose updates on user actions, no scroll scrub, and helper text “Still view is active for reduced motion.”
- No JavaScript: all product information, three static story poses, room studies, FAQ, and default configuration remain visible. Hide inactive JavaScript-dependent controls and form actions; show “Interactive configuration and local brief creation require JavaScript.” Do not pretend a no-JS form submits.

Use `WebGPURenderer` from `three/webgpu`, `await renderer.init()`, and TSL from `three/tsl`. The renderer can select WebGL2 when WebGPU is unavailable; `forceWebGL: true` is supported for a controlled fallback/test. Do not route node materials through the legacy `WebGLRenderer`. See the official [WebGPURenderer documentation](https://threejs.org/docs/pages/WebGPURenderer.html) and [TSL reference](https://threejs.org/docs/pages/TSL.html); match the installed package source/types before choosing methods.

If initialization fails, retire that attempt and its canvas. Allow at most one additional forced-WebGL2 retry for that activation, then keep the poster with “3D is unavailable here. You can still change the shape.” A visible `Try 3D again` control permits a later explicit retry. No error alert modal or infinite automatic retry loop. Installed-source caveat: do not call `renderer.dispose()` or `setAnimationLoop(null)` blindly on an instance whose `init()` rejected; these paths can attempt initialization again. Track successful initialization explicitly, and use caught, best-effort backend cleanup for rejected attempts without reusing their renderer/canvas.

Use renderer `onDeviceLost` for WebGPU and WebGL context loss, plus safe asynchronous cleanup. Wrap and call its original callback with the renderer as receiver so its internal lost-device protection remains intact. Immediately stop drawing and show the current SVG; require the visible retry control for recovery after a live context loss. Set a shutdown flag before intentional disposal so it cannot trigger recovery. In the inspected Three.js release `init()`, `setAnimationLoop()`, and `dispose()` are asynchronous: read the installed signatures and await/catch lifecycle work in an internal async function, never return an async function from a React effect cleanup. Increment a generation token on unmount/preferences change; check it after every awaited import/init. A late successful initialization must stop its loop and dispose itself without attaching a canvas; a rejected initialization follows the separate failed-attempt cleanup above.

On live reduced-motion enablement: invalidate pending work, stop rendering, dispose resources, show the current pose in SVG. Returning to no-preference keeps the static view until explicit reactivation, avoiding surprising motion. `Use still view` behaves the same way without changing the operating-system preference. Graphics loss and retries retain finish, opening, and view.

Resource rules:

- One renderer/canvas for the experience; hero and room studies use static media. Keep poster mounted underneath until the first successful rendered frame, then crossfade for 180ms with unchanged dimensions.
- Cap DPR at 1.5 desktop and 1.25 touch. Size from `ResizeObserver`; skip zero-size or detached stages. Make the CSS background independent of canvas readiness.
- Render on demand while a control/scroll transition is active, and stop once values settle. Pause completely offscreen and when `document.hidden`. On return, render the latest pose and reset time delta; do not replay missed frames.
- No ambient product rotation. Continuous visible animations are limited to zero by default; a short sheen/settle is an entrance, not a loop.
- Dispose geometry, materials, textures, shadow resources, renderer, observers, listeners, idle callbacks, and rAF work. Serialize disposal/reinitialization so React Strict Mode cannot leave duplicate contexts.
- Initial non-graphics route JavaScript target: at most 100KB gzip beyond the framework baseline. No Three.js chunk before eligibility. Editorial poster target at most 180KB AVIF at desktop size and 90KB at mobile size. Font target at most 140KB combined; preload only the necessary display/body faces.
- Mobile production Lighthouse targets: performance ≥90, accessibility ≥95, best practices 100. CLS target 0; no animation-attributable long tasks over 50ms in a throttled trace. Measure activated 3D separately from the intentionally lightweight default mobile route.

## 8. Motion system and complete map

Define easing, duration, distance, and stagger tokens in `serraform.css` `@theme`. Components reference tokens, not scattered raw durations.

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22,1,0.36,1)` | Quiet settle and release |
| `--ease-out-expo` | `cubic-bezier(0.16,1,0.3,1)` | Headline masks and major entrance |
| `--ease-in-out` | `cubic-bezier(0.65,0,0.35,1)` | Wipes and mode transitions |
| `--dur-instant` / `--dur-fast` | `90ms` / `180ms` | Press and hover |
| `--dur-base` / `--dur-slow` / `--dur-hero` | `420ms` / `700ms` / `1000ms` | State, material settle, hero |
| `--stagger` / `--reveal-shift` | `60ms` / `24px` | Children and reveal offset |

Hero sequence: ground/poster available at first paint; 100ms logo settles 8px; 180ms nav items enter at 40ms intervals; 240ms first headline line mask-rises, second follows after 100ms; 500ms lead rises 12px; 620ms CTA and spec line; 760ms dimension bracket draws. Total entrance ends by 1.4s. Avoid delaying the LCP image or hiding the whole hero. Motion never gates text, scrolling, or links.

| Element | Enter | Scroll-linked | Hover / focus | Press / state | Exit / handoff |
|---|---|---|---|---|---|
| Header/logo | Short 8px settle | Solid ground and rule after 64px; height unchanged | Nav underline draws; focus ring | Menu icon rotates its strokes | Remains available, never slides away from focused content |
| Primary CTA | 12px rise after lead | No movement; stable action target | Clay fill wipe; trailing arrow slides 4px; fine-pointer magnet ≤4px | Scale .98 for 90ms; disabled state clearly labeled | Anchor to visible destination, focus heading |
| Secondary links | Underline draw | No positional movement | Underline extends; visible focus | Native link activation | Preserve hash history |
| Hero heading | Two line mask-rise | No parallax on text | Noninteractive | Noninteractive | Product bracket aligns visually with next stage's bracket |
| Hero still | Immediately visible, optional 1.02→1 settle | No independent parallax system | Noninteractive | Noninteractive | Stage repeats the exact finish and silhouette language |
| Story stage | SVG visible; first-frame live crossfade | One connected fold timeline from section 6 | Controls only; no canvas hover effect | Manual controls take ownership | At config row, settles to 50%; releases naturally at wrapper end |
| Story chapters | Label slides 12px; rule draws; body rises | Active chapter indicator translates between three fixed positions | No fake card hover | Chapter rail links navigate; do not trap keys | Text remains readable after the stage advances |
| Opening range | Visible with config | No scroll effect in manual mode | Thumb focus outline; stable track | Native input, damped geometry only in no-preference mode | Latest opening survives navigation to brief |
| Finish radios | Staggered swatch scale .96→1 | None; controls remain stable | Ring draws, swatch lifts 2px | Check appears; material interpolates over base duration | Selected finish is carried into receipt |
| View/reset/follow buttons | 12px rise | None | Arrow/underline response and focus ring | Press .98; camera settle or mode change | Interrupted changes start from current pose |
| Graphics activation/fallback | Poster always visible | Eligible stage proximity only | Standard button state | Text switches to “Opening 3D…”; disabled during activation | First successful frame crossfades, failure retains poster |
| Room statement | Line mask-rise | Word emphasis overlay advances once | Noninteractive | Noninteractive | Words stay at full contrast after activation |
| Room figures | Three distinct clip-wipes with 1.04→1 settle | No moving body copy | Noninteractive figures; captions permanent | No action | Bottom rule draws into construction section |
| Construction rows | Diagram paths draw, copy rises in order | No second scrubbed scene | Noninteractive | Noninteractive | Porcelain closing rule meets rose FAQ ground via a 48px folded edge |
| FAQ | Summary rules draw in sequence | None | Icon rotates on focus/hover; focus outline | Native open state; answer inner content rises 8px; no height animation | Native collapse; never hold hidden focus |
| Brief fields | Labels and fields rise together | None | Focus outline and input border tint | Errors appear inline; one optional 4px nudge | Valid form transitions to receipt in the same reserved region |
| Form action/receipt | Existing summary always visible | None | Standard button state | Brief “Preparing…” state, then SVG corner/check draw | Success heading receives focus; Edit restores inputs |
| Mobile menu | Inset clip from top; links stagger | Body scroll locked only while open | Native focusable links | Accessible dialog, Escape close, toggle morph | Reverse transition, focus returns to trigger |
| Footer | Wordmark settles; rule draws | None | Underline links | Native anchors | Back-to-top honors motion preference |

Four reveal types are required: masked text, clipped figures, drawn diagrams/rules, and short grouped rises. Noninteractive content remains intentionally noninteractive; “no motion” in a map cell is a design decision rather than an omitted state.

For the room-statement word emphasis, keep a full-contrast base text layer, then reveal a clay-colored duplicate word overlay. This preserves text contrast rather than fading unread words to 25% opacity. Hide duplicate text from assistive technology.

Only animate transforms, opacity, and clip-path. Do not animate layout height, width, top, or box-shadow. Apply reveal preparation only after an observer is installed and only under `prefers-reduced-motion: no-preference`; default SSR CSS is visible. Include a scoped `<noscript>` override. If an observer fails, content stays visible. Reduced motion removes sticky story spacing, masks, scrubbing, smooth scrolling, magnetic effects, and animated camera changes; state updates become immediate or ≤120ms opacity changes.

Use native scrolling by default on touch. Desktop Lenis is optional if verified smooth and anchor/focus behavior remains correct; otherwise native scroll plus smooth anchor behavior satisfies the design. No wheel interception, scroll snapping, scrolljacking, cursor replacement, or compulsory drag interaction.

## 9. Responsive and accessibility contract

| Mode | Composition | Graphics and motion |
|---|---|---|
| ≥1200px | Full editorial hero; sticky stage and narrative rail | Idle/proximity activation if eligible; one scrubbed stage |
| 900–1199px, height ≥700px | Narrower two-column stage; 48px H1 floor | Same experience with conservative canvas sizing |
| <900px or height <700px | Flow layout; static story poses then stage/controls | No pinned story; tap to launch 3D; manual configuration only |
| Coarse pointer, any size | Same flow layout, even on a wide tablet | Explicit activation; no pointer magnetism or pinned story |
| Reduced motion, any size | Complete flow layout and all content visible | SVG only; never initialize graphics or Lenis |
| No JavaScript | Product, story poses, room studies, specs, native FAQ, disclosure | Default static pose; clear notice instead of unusable form actions |

One H1, semantic landmarks, ordered H2/H3 hierarchy, skip-to-content link, meaningful alt text, and visible keyboard focus. Minimum hit target 44px. At 375px and 390px there must be no document horizontal overflow; reduce headline size and allow controls to wrap. At 200% zoom retain all controls and avoid clipped dialog content.

Native radio group semantics; native range with explicit label and `aria-valuetext`; textual finish names; no color-only selection. Mobile menu must trap focus when open, close with Escape, restore focus, and unlock scroll on route/anchor navigation or unmount. Keep closed menu contents out of the tab order. A native `<dialog>` is acceptable with tested browser fallback.

The stage's textual description: “A freestanding screen of sixteen connected felt panels, folded into an accordion profile.” Dimensions and selection remain in HTML. Do not expose renderer internals or shader terms as customer-facing feature copy.

## 10. Local form behavior and data handling

Pure interfaces in `forms/brief.ts`:

```ts
type BriefFields = { projectName: string; room: string; notes: string };
type BriefErrors = Partial<Record<keyof BriefFields, string>>;
validateBrief(fields: BriefFields): BriefErrors;
buildBriefText(fields: BriefFields, config: FoldConfig, metrics: FoldMetrics): string;
```

Validation messages: “Enter a project name with 2 to 80 characters.” / “Choose a room type.” / “Keep notes to 500 characters.” Reject unrecognized room enum values even if a custom event injects them. Trim outer whitespace, preserve meaningful note line breaks, render all strings as text, never `dangerouslySetInnerHTML`.

On invalid submission, set `aria-invalid`, connect error descriptions, focus the first invalid control, and preserve inputs/config. On valid submission, capture an immutable configuration snapshot, show a short local preparing state (minimum 180ms, maximum 420ms; immediate under reduced motion), then the receipt. Prevent duplicate submissions during preparation. The UI must never say “sent”, “booked”, or “request received”.

Download a UTF-8 plain-text Blob named `serraform-room-brief.txt`; use a fixed filename, revoke the object URL after download or unmount. Include the concept-model disclaimer and support depth. `Edit brief` retains values and returns focus to Project name. No persistence, fetch, server action, analytics event, hidden input collection, or user-controlled filesystem path is required. The standalone export must retain this behavior.

## 11. Imagery and media production brief

**Chosen production method:** Code-generated geometry and local scene captures. No external generation service, stock purchase, photogrammetry model, audio, or video. A coherent static presentation is mandatory even when the live engine is never activated.

During implementation, use a labeled `Picture` fallback for unprocessed editorial stills; the stage uses its composed SVG. Before final delivery, generate the stills from the model and remove all temporary placeholder labels. Use a development-only local capture harness under `.openlanding-page/serraform/media/`; do not add public debug routes or production query flags for captures.

| Raw file | Aspect | Exact direction / independent render prompt |
|---|---|---|
| `fold-hero.png` | 16:9 | SERRAFORM Fold 16, sixteen continuous Clay felt panels at opening 50, three-quarter camera, matte pale-rose studio floor, broad soft key from upper left, full object and oxblood feet visible, generous horizontal negative space, no text or logos. Use the prescribed geometry, not a newly interpreted model. |
| `fold-detail.png` | 4:3 | SERRAFORM Fold 16 close study of three connected Clay pleats at opening 50, tactile matte surface with restrained fiber variation, side light revealing twelve-millimeter thickness and joined crease, pale-rose ground, no text or logos. |
| `room-reading.png` | 4:3 | Concept reading corner, the exact Fold 16 model in Flax at opening 35 beside a simple rounded chair and low book plinth, pale-rose architectural room, warm diffuse daylight, empty space, no people, no text, no logos. Build the furniture as low-detail local primitives. |
| `room-studio.png` | 3:4 | Concept shared studio, the exact Fold 16 model in Clay at opening 75 between two simple desks, porcelain desk planes and oxblood legs, rose architectural ground, oblique view, no screens, people, text, or logos. |
| `room-morning.png` | 16:9 | Concept morning room, the exact Fold 16 model in Sage at opening 60, uncluttered pale-rose floor and wall planes, one broad angled daylight patch, wide quiet composition, no people, text, or logos. |

Store raw stills in `assets/incoming/serraform/`. Run `npm run images -- serraform` after registration; the pipeline generates 800w/1600w AVIF/WebP in `public/templates/serraform/` and `assets.generated.ts`. Use registered keys `fold-hero`, `fold-detail`, `room-reading`, `room-studio`, `room-morning`. Specify dimensions, correct `sizes`, and descriptive alt text. Only `fold-hero` is eager/high-priority; the rest are lazy.

Gallery screenshot is separate: `public/gallery/serraform.webp`, 880×495, captured from the actual production hero with reduced motion. Use it for `previewImage`. Never use a marketing mockup, board, or blank loading state as the gallery image.

## 12. Future implementation file map

Paths are relative to the repository root. Create these during the later implementation, not during this single-file planning task. Group small primitives sensibly; do not pad the file count with unused abstractions.

```text
src/app/(serraform)/
  layout.tsx                         fonts, metadata, scoped no-JS rules
  serraform/
    page.tsx                         server composition
    serraform.css                    all brand/motion/responsive tokens and classes
    DESIGN.md                        implementation-aligned design record derived from this document
    PROMPT.md                        compact self-contained rebuild brief written after implementation
    icon.svg                         original fold mark
    opengraph-image.tsx               1200×630 palette-only ImageResponse
    assets.tsx                       Picture + assetSrc, labeled authoring fallbacks
    assets.generated.ts              processing output
    brand/Logo.tsx                   mark + lockup
    sections/Header.tsx              client menu, active-link behavior
    sections/Hero.tsx                server hero
    sections/FoldingExperience.tsx   server layout for story, stage, and configuration leaves
    sections/RoomStudies.tsx         server statement and figures
    sections/Construction.tsx        server diagrams and specifications
    sections/Questions.tsx           native details markup
    sections/BriefSection.tsx        server brief composition
    sections/Footer.tsx              disclosure and working links
    fold/config.ts                   constants, finishes, view presets, typed copy
    fold/geometry.ts                  pure connected model and metrics
    fold/geometry.test.ts             numeric/topology invariants
    fold/projection.ts                pure SVG face projection and depth ordering
    fold/projection.test.ts           front/quarter/side bounds and finite coordinates
    fold/state.ts                     ownership reducer
    fold/state.test.ts                manual/story behavior
    fold/story.ts                     pure progress and opening mapping
    fold/story.test.ts                boundaries and reverse-scroll mapping
    fold/FoldProvider.tsx             shared user state and frame refs
    fold/FoldPoster.tsx               SVG using pure geometry, SSR-safe
    fold/FoldStage.tsx                eligibility, dynamic scene loading, fallback UI
    fold/FoldScene.ts                 async renderer controller, resize/render/dispose
    fold/materials.ts                node materials and local lighting setup
    fold/Configurator.tsx             range, radio group, view/mode controls
    motion/math.ts                    clamp, smoothstep, damp, bounded progress
    motion/math.test.ts               mathematical boundaries
    motion/useReducedMotion.ts       safe initial preference + change subscription
    motion/Reveal.tsx                shared observer + role-based reveal
    motion/ScrollCoordinator.tsx      measurements, frame scheduling, optional Lenis
    forms/brief.ts                    validation and deterministic text receipt
    forms/brief.test.ts               validation and receipt contract
    forms/BriefForm.tsx               local-only form and success transition
tests/e2e/serraform.spec.ts            canonical route, motion, graphics, fallback, form
docs/image-prompts/serraform.md        copy of final render directions if implementation requires it
public/templates/serraform/           processed local stills
public/gallery/serraform.webp         reduced-motion hero capture
public/downloads/serraform.html       verified standalone export
.openlanding-page/serraform/          capture harness, shots, traces, Lighthouse only
```

`FoldProvider` may wrap server-rendered children passed through its props; do not import whole server sections into a client module merely to share configuration. Expose a small controller API from `FoldScene`: async `create`, `setPose`, `setView`, `resize`, `setActive`, `renderOnce`, async `dispose`. Keep browser/Three.js imports out of files used by server SVG rendering and unit tests.

## 13. Actual repository registration and packaging

The skill's general wiring guide is stale in several places. Follow the inspected repository interfaces below and recheck them if other work changes the branch.

1. **`scripts/templates.config.ts`:** Add `serraform` to its `TemplateSlug` union and add the seven-color entry to `PALETTES`. Exported `TEMPLATES` is derived from gallery `RAW_TEMPLATES`; do not add a second manual record there.
2. **`scripts/process-images.ts`:** Its allowed slugs already derive from `Object.keys(TEMPLATES)`. Verify that `serraform` is accepted after gallery/config registration; do not introduce an unnecessary hard-coded allowlist.
3. **`scripts/generate-copy-bundles.ts`:** Add `COPY_METADATA.serraform = { name: 'SERRAFORM', dependencies: ['three'], includeDownload: true }`. Add `lenis` only if actually imported. Existing `@types/three` is already available; document it in a standalone TypeScript rebuild instruction if needed. Do not modify derived `TEMPLATE_METADATA` directly.
4. **`src/app/(index)/data/templates.ts`:** Add its separate `TemplateSlug` member, a `SERRAFORM_PROMPT` constant matching final route `PROMPT.md`, and an appended `RAW_TEMPLATES` entry before `registeredTemplates` is calculated. Use title `SERRAFORM`, description `A sculptural felt divider explored through connected, interactive 3D folds.`, category `3d`, categories `['3d','commerce','showcase']`, industry `Interior objects`, stack `Next.js 16 · React 19 · Three.js · TSL`, badges `['Connected folds','Material selection','Local room brief']`, previewImage `/gallery/serraform.webp`, `hasDownload: true`, actual implementation date, and the implementing agent's actual model tag. Do not invent a model identifier or add unsupported `videoClip` fields.
5. **`src/app/(index)/data/templates.test.ts`:** Update the explicit active count/order and model assertion based on the branch at implementation time. Inspection found 100 active templates; the expected increment is one, not a reason to overwrite concurrent registrations. Add prompt parity and required asset assertions. Both `previewImage` and `public/gallery/serraform.webp` must exist; `hasDownload: true` requires the export file.
6. **`tests/e2e/templates.ts`:** Append `/templates/serraform` to `TEMPLATE_PATHS` for common overflow/reduced-motion coverage.

Also add `serraform` to the appropriate implemented technology lists in `src/app/(index)/data/technology-tags.ts`: `threejs`, `scroll-animation`, and `shaders` because the final material uses TSL. Add no GSAP/Motion tag unless the template actually imports that package.

`next.config.ts` already derives routing from `RAW_TEMPLATES`: `/serraform` redirects to `/templates/serraform`; the canonical path rewrites to the source page while real asset files resolve first. No manual route rewrite or new global root layout is needed. For navigation and metadata use canonical `/templates/serraform` URLs, including the actual canonical OG image route. Do not hard-code an invented production domain.

Metadata title: **“SERRAFORM — A softer edge for your room”**. Description: **“Explore Fold 16, a sculptural felt divider. Adjust its opening, choose a finish, and prepare a room brief in your browser.”** Treat this fictional sales demo as `noindex, follow`; do not emit Product/Review structured data or invented commercial claims. Build the OG image from the mark, title, and a simple folded silhouette using palette colors only.

Build using the repository's normal Turbopack command. Do **not** use `next build --webpack`: Tailwind is wired through `turbopack.rules`. Source must render server-side for the export pipeline. Component-backed standalone templates are discovered automatically; there is no separate export allowlist.

The gallery preview CLI captures all templates and has no per-slug flag. For this addition, use a targeted local capture script under `.openlanding-page/serraform/` instead of regenerating unrelated gallery images. After a fresh production build, `npm run export:templates -- serraform` creates the standalone HTML; then regenerate copy bundles. Run `npm run verify:exports -- serraform` and inspect the result offline. No external model, font, image, or `_next` request should be required by the delivered standalone page.

## 14. Ordered implementation tasks

### Task 1 — Establish the brand and complete static page

**Files:** route layout/page/CSS, brand, assets wrapper, server sections, `fold/config.ts`, SVG fallback, config/gallery union and metadata entries.

**Consumes:** Sections 1–4, 9, 11–13. **Produces:** A server-rendered page at the canonical URL with all copy, default product illustration, native FAQ, working anchors, fonts, favicon, metadata, and no-JS presentation.

- [ ] Recheck the working tree and current Next docs. Keep all unrelated changes intact. Read the skill's `quality-bar.md` and `motion-system.md` before translating this design.
- [ ] Register palette and coherent temporary gallery metadata; leave no final claim of completion while image/export artifacts are pending.
- [ ] Build the base tokens and original logo, then all static sections. Follow the specified copy and layout, with no placeholder Latin or fake external links.
- [ ] Implement the visible SVG fallback and authoring Picture placeholders before any canvas work. Create the scoped no-JS notice/controls rules.
- [ ] Check 1440×900, 1280×720, and 390×844 static rendering, document overflow, and header/CTA visibility. With JavaScript disabled, all six FAQ answers are reachable and the default product is visible.

### Task 2 — Test and implement the folding model and interaction state

**Files:** `fold/geometry.ts`, `geometry.test.ts`, `state.ts`, `state.test.ts`, `story.ts`, `story.test.ts`, `motion/math.ts`, `math.test.ts`, provider/configurator.

**Consumes:** Section 5 dimensions and section 6 interfaces. **Produces:** A tested, graphics-independent fold model, ownership reducer, and fully usable SVG configurator.

- [ ] Write failing tests for the three numeric reference poses, 17 hinges, every adjacent length 0.18, developed length 2.88, increasing X, valid miter clearance, nonintersecting polygon, and finite values across 0–100.
- [ ] Add boundary tests: opening -10→0, 140→100, NaN/Infinity→50; nonpositive story range→0; exact chapter boundaries .34 and .72; timeline holds and reversal return the same pose.
- [ ] Add reducer tests: changing any control enters manual mode; scrolling cannot replace manual opening; changing finish persists through Follow story; Reset restores 50/Clay/quarter in manual mode.
- [ ] Run the targeted Vitest files to confirm meaningful failures, implement pure functions, and rerun to green. Use numeric tolerances from section 5, not snapshots of implementation output.
- [ ] Test and implement `projectFold` for all three views at extreme/default openings. Connect native controls to SVG and textual readouts. Verify keyboard range/radio input, visible camera-view changes, and default `1.73 m` span without a renderer.

### Task 3 — Add the progressively enhanced live scene

**Files:** `FoldStage.tsx`, `FoldScene.ts`, `materials.ts`, preference hook, lifecycle-focused tests and e2e cases.

**Consumes:** Tested `FoldPose`, `FoldConfig`, camera/material contract. **Produces:** The same shape rendered live with WebGPU/WebGL2 fallback and disciplined resource ownership.

- [ ] Test an injectable renderer factory/loader: no import on reduced motion; no import on untouched coarse pointer; late import/init after cancellation is disposed; errors retain poster; at most one automatic WebGL2 retry.
- [ ] Implement fixed-topology buffer updates, material fibers, lights, feet, conservative framing, and dirty-only rendering. Check every defined pose against SVG geometry.
- [ ] Implement generation-token lifecycle, `onDeviceLost`, first-frame crossfade, visibility pause, resize, still-view switch, and retry. Verify listeners/resources return to one or zero under Strict Mode remounts.
- [ ] Exercise real WebGL2 fallback via a non-public injected test factory. Simulate GPU loss through the supported lifecycle callback; do not assume `device.destroy()` fires the same loss path, because the inspected backend suppresses reason `destroyed`.
- [ ] Confirm graphics init failure, live reduced-motion toggling, and offscreen resume preserve selections and never leave a blank stage. Capture a real activated renderer frame as evidence; a unit mock alone does not prove the scene renders.

### Task 4 — Integrate motion, mobile flow, and the local brief

**Files:** motion primitives/coordinator, section CSS, header/menu, `forms/brief.ts`, `brief.test.ts`, `BriefForm.tsx`.

**Consumes:** Complete motion map, geometry/state, final copy. **Produces:** Responsive story/manual handoff and a truthful downloadable local receipt.

- [ ] Build motion foundations before adding reveals to sections. Install observers before enabling hidden states. Implement all motion-map rows and the exact hero sequence.
- [ ] Add the one desktop sticky scrub and its mobile/reduced-motion flow equivalent. Verify reverse scroll and manual ownership. No second scroll system may compete in the same viewport.
- [ ] Write failing form tests for required/trimmed name, length limits, valid room enum, notes boundary 500/501, text escaping, and deterministic receipt content including outer dimensions and disclaimer.
- [ ] Implement local form preparation/success/edit/download states. Check duplicate submission protection and object-URL cleanup. Assert there is no network submission and success text does not imply delivery.
- [ ] Exercise every hover/focus/press/menu/detail/form state with mouse, keyboard, and touch. No hover-only information; no canvas gestures needed.

### Task 5 — Render media and finish gallery/export integration

**Files:** local capture harness, raw/processed stills, generated manifest, future DESIGN/PROMPT records, gallery and export artifacts, six registration points plus technology tags.

**Consumes:** Finished model, static composition, registration contract. **Produces:** Complete local media, coherent metadata, copyable template, and standalone HTML.

- [ ] Render the five stills locally from the actual model. Review all together for matching folds, materials, supports, lighting, and palette. Run `npm run images -- serraform` and use every registered asset.
- [ ] Write the implementation-aligned DESIGN and PROMPT records from this handoff; keep the gallery prompt identical to final PROMPT. Do not describe unimplemented features.
- [ ] Capture only the SERRAFORM gallery hero in production/reduced motion. Check that the tiny preview still shows the distinctive accordion silhouette and readable headline.
- [ ] Finish registration, actual model/date provenance, ordered gallery tests, and canonical-path tests. Keep the local incomplete DATUM work untouched.
- [ ] Build, export only SERRAFORM, regenerate copy bundles, and verify offline export. Keep `hasDownload`, `includeDownload`, and actual download existence consistent. Rebuild if any source changes after export.

### Task 6 — Verify the finished experience

**Files:** `tests/e2e/serraform.spec.ts`, relevant unit tests; QA evidence only under `.openlanding-page/serraform/`.

- [ ] E2E canonical route returns 200, `/serraform` redirects, no broken image/OG/favicon URLs, exactly one H1, anchors land below header, back/forward works.
- [ ] Desktop: scroll at 0%, 25%, 50%, 75%, 100% of the story and verify distinct connected poses with expected metrics. Rapid reverse scroll returns the correct pose; manual slider remains stable while scrolling.
- [ ] Touch 390×844 and 375px: no horizontal overflow, no canvas/import before activation, static story readable, tapped 3D stays within its box, range and finish selectors work without hover.
- [ ] Reduced motion: all `[data-reveal]` visible; no Three.js import, renderer constructor, canvas, Lenis, hidden offscreen text, or oversized empty sticky spacer. Also toggle the preference during pending initialization and during live rendering.
- [ ] No JavaScript: complete composition, working anchors/native FAQ, honest disabled-interaction notice. Simulated graphics failure and lost context: visible poster plus functional SVG configuration and brief.
- [ ] Keyboard: skip link, menu focus trap/return, native range arrows/radios, FAQ, invalid form focus, success focus, edit focus. At 200% zoom, no controls or receipt content disappear.
- [ ] Form: invalid and valid cases, repeated clicks, long notes, literal `<script>`-like text rendered safely, current config snapshot, downloaded text contents, no fetch/XHR submission.
- [ ] Run `npm run check`, `npm test`, `npx tsc --noEmit`, `npm run lint`, `npm run build`, and `npx playwright test`. Read outputs; identify preexisting unrelated failures separately without weakening checks.
- [ ] From the fresh build, run `npm run export:templates -- serraform`, `npm run prebuild`, `npm run check`, and `npm run verify:exports -- serraform`. Confirm copied source and export reflect final code, not a stale earlier build.
- [ ] Use the Orca CLI browser workflow when inspecting this Orca workspace. Run the motion audit from `improve-animations`; implement relevant fixes and repeat only affected checks.
- [ ] Save desktop and phone screenshots plus story mid-scroll frames to `.openlanding-page/serraform/shots/`. Record a throttled CPU trace with active folding, compare against the textual brand board, and check actual canvas render statistics.
- [ ] Run mobile Lighthouse against a production server, save report under `.openlanding-page/serraform/lighthouse/`, and achieve performance ≥90, accessibility ≥95, best practices 100. Confirm zero layout shift caused by font/media/canvas transitions. Use native PowerShell environment assignment if setting a Chrome path; do not paste Bash assignment syntax into this Windows shell.

## 15. Acceptance and final handoff

The implementation is ready only when the recognizable sixteen-fold object drives the design, its real connected geometry responds to both story and controls, the rose/oxblood brand is coherent, and the full page remains useful without live graphics. All copy, fallbacks, forms, media, gallery preview, metadata, copied source, and standalone download must be complete.

Reject these shortcuts: a rotating generic 3D object; separated rectangles masquerading as joined folds; independent camera spectacle obscuring the width change; a static hero with no working signature interaction; invented acoustic claims; empty material placeholders; canvas-only labels; a success message implying a network request; duplicate renderer loops; hidden reduced-motion content; or a full-page client monolith.

The implementing agent's final report should link the canonical preview and changed design records, state the implemented folding behavior, list completed verification with actual results, confirm all media came from the local model, and name any remaining limitation. Do not claim this planning document itself has been implemented or performance-tested. Do not deploy or commit without a later instruction.
