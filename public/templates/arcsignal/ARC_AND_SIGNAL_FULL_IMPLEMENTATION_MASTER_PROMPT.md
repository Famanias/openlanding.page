# ARC & SIGNAL — COMPLETE ONE-SHOT WEBSITE IMPLEMENTATION
## Four-section AI orchestration landing-page template + procedural Three.js 2.5D hero + one continuous scroll-driven signal

> **PRIMARY INSTRUCTION TO GOOGLE AI STUDIO / CODING AGENT**  
> Build a **finished, working, responsive landing page** from the four attached reference images and this specification. Do not stop after a plan, produce static screenshots, ask questions already answered, or implement only the first section. Inspect the project and assets, create the code, run available checks, fix obvious failures, and report what is working. Treat the four pictures as **approved visual direction**, not as web backgrounds or clickable images.
>
> **MOST IMPORTANT DELIVERABLE:** On the hero's right, reconstruct the AI orchestration core as **actual procedural 2.5D geometry rendered with Three.js**. Across the entire landing page, create **one geometrically continuous purple signal route** that enters and exits that core and flows through the next three sections. A static screenshot, spinning donut, orbiting dots, or four unrelated neon ribbons are not acceptable substitutes.

---

## 0 — PRODUCT, BRAND, AND SUCCESS DEFINITION

**Brand:** Arc & Signal / `arc&signal` (use lowercase lockup consistently in header; `ARC & SIGNAL` in formal footer is acceptable)  
**Category:** Fictional enterprise AI orchestration platform  
**Descriptor:** THE INTELLIGENCE ORCHESTRATION LAYER  
**Positioning:** Connect models, AI agents, tools, and data into one visible, controllable workflow system.  
**Core line:** INTELLIGENCE, IN SYNC.  
**Tone:** precise, premium, technical, confident, understated, polished.  
**Visual world:** dark obsidian, deep indigo panels, electric violet + cobalt illuminated routes, delicate system grids, realistic orchestration interfaces, refined geometric typography. **More credible infrastructure product, less generic sci-fi.**

The four approved image references are included in the provided asset pack:

```text
references/
  arc-signal-01-hero.jpg
  arc-signal-02-capabilities.jpg
  arc-signal-03-platform.jpg
  arc-signal-04-cta-footer.jpg
```

Every source image is an approximately 16:9, 2048×1143 composition. They correspond to **four continuous sections, in that order**. The section references were independently generated, so **their baked-in purple lines do NOT actually meet at section boundaries**. **This is an identified reference defect, not an effect to preserve.** Reconstruct the paths as live geometry rather than repeating their errors.

**Definition of done:**

1. Four recognizably faithful, coherent sections with responsive typography, real layout, SVG details, semantic UI and genuine buttons.
2. A detailed, interactive, layered **2.5D Three.js orchestration core** on the hero's right; no large screenshot texture and no generic torus knot.
3. **ONE continuous route** across the document, correctly joining hero, capabilities, workflow demo, and CTA. Geometry crosses boundaries with no jump/seam/doubled neon line.
4. Working capabilities selector, route demonstrations, product tabs, workflow node inspector, execution controls, contact/demo interactions, navigation, and mobile menu.
5. Scroll/pointer animations with reversible progress, good performance, reduced-motion support, and a graceful WebGL fallback.
6. Accurate desktop composition, carefully redesigned small-screen composition, no horizontal overflow, no dead CTAs, no fabricated customer metrics or endorsements.

### Visual source-of-truth hierarchy

1. **Reference images** govern overall composition, copy hierarchy, visual proportions, lighting, main shapes, and color density.
2. **This prompt** governs corrections to screenshot imperfections, connectivity, behavior, accessibility, responsiveness, and real interaction.
3. If faithfully reproducing an image conflicts with functional DOM or the continuous route, **functional reconstruction and uninterrupted signal continuity win**.

**The following artifacts visible in the generated images are NOT requirements to copy:** misspelled/malformed technical microcopy, duplicate service labels, strange floating letters near the hero headline, accidental glow artifacts, misaligned route endpoints, pseudo-metrics with no meaning, unreadable decorative text, and the product section's incorrectly repeated “Explore Capabilities” CTA.

---

## 1 — STACK AND PROJECT ARCHITECTURE

Inspect the current project first. Preserve an existing compatible stack. For a new build, use:

- **React + TypeScript + Vite**.
- **Three.js with `@react-three/fiber`**, optionally `@react-three/drei` for camera/control helpers. Bare Three.js is acceptable if it integrates more reliably.
- **GSAP + ScrollTrigger** for intentional scroll timing and choreography. Register the plugin properly and clean up contexts/triggers on unmount.
- **SVG** for global long-distance routing, capability diagrams, workflow connectors, and the CTA convergence form.
- Modern CSS, CSS variables, scoped components; CSS modules or ordinary structured CSS. No heavyweight UI kit that replaces the reference aesthetic.
- Semantic HTML and native controls where possible.
- Optional restrained icon set such as Lucide; icons can also be custom SVG.
- No backend dependency is required: the product interactions can be a believable **client-side interactive demo** with deterministic example data.

Suggested structure (adapt to the actual project as needed):

```text
src/
  app/App.tsx
  app/siteConfig.ts
  styles/tokens.css
  styles/global.css
  components/Header.tsx
  components/MobileMenu.tsx
  components/GlobalSignalSystem.tsx
  components/SignalAnchor.tsx
  components/SectionHeading.tsx
  sections/Hero.tsx
  sections/Capabilities.tsx
  sections/PlatformWalkthrough.tsx
  sections/FinalCTA.tsx
  three/HeroCoreScene.tsx
  three/CoreAssembly.tsx
  three/SegmentedArc.tsx
  three/CoreTunnel.tsx
  three/CoreMaterials.ts
  three/LocalSignal.tsx
  three/useProjectedSignalAnchors.ts
  platform/WorkflowCanvas.tsx
  platform/NodeInspector.tsx
  platform/ExecutionTrace.tsx
  platform/ModelRouting.tsx
  platform/mockWorkflows.ts
  contact/DemoRequestDialog.tsx
  hooks/useReducedMotion.ts
  hooks/useSignalGeometry.ts
  hooks/useSectionProgress.ts
  utils/geometry.ts
  utils/a11y.ts
public/references/[the four supplied JPGs]
```

**Architecture principle:** Live HTML/React controls above or beside SVG and WebGL artwork. Do not render navigational text, capability descriptions, buttons, workflow data, or UI labels into the Three.js canvas. Do not use a single full-section screenshot as the visible website. Use reference images as development references only. The right-hand hero core is procedural geometry; the diagrams are reconstructed DOM/SVG; the footer is HTML/CSS.

**Build in one uninterrupted pass**, using logical internal milestones. If time or generation budget is constrained, implement all four sections and the hero-core/global-route fundamentals before adding optional micro-polish. Never substitute decorative static screenshots for skipped implementation.

---

## 2 — DESIGN TOKENS AND TYPOGRAPHY

### Palette

```css
:root {
  --bg: #0C0F1B;
  --panel: #11172A;
  --panel-raised: #171D32;
  --white: #F3F4FA;
  --steel: #9DA7C7;
  --muted: #9299B4;
  --violet: #A58AFF;
  --cobalt: #5367F9;
  --line: rgba(157, 167, 199, 0.18);
  --signal-core: #D4C9FF;
  --signal-mid: #977FFF;
  --signal-edge: #5367F9;
}
```

Deep obsidian covers nearly the entire canvas. Violet/cobalt are meaningful **active-system indicators**, not blanket glows over every element. Do not introduce random pink, teal, orange, or warm cream motifs.

### Typography

- High-quality geometric/neo-grotesque **display sans**: uppercase, narrow/precise, medium-bold, strongly sized; a publicly available substitute is acceptable.
- Humanist/neo-grotesque body sans with comfortable line height; maintain elegant proportions.
- Restrained monospaced metadata for section numerals, routing status, technical readouts.
- Avoid editorial serif headlines; this is deliberately distinct from the earlier ZENO agency aesthetic.
- Prefer `clamp()` for fluid sizes; don't shrink desktop 100px headings to illegible mobile text through global transforms.

### Page geometry and texture

- Desktop max content width approximately 1440–1640px inside spacious responsive gutters; screenshots are composition references, not rigid 2048px layouts.
- Sections share **one uninterrupted site background**. Implement at `body`/page level; do not stack four separate background images with seams.
- Delicate fixed/absolute grid and subtle static radial illumination are acceptable if restrained. Use an overall page-level lighting treatment; section-local glows can blend into it instead of hard-edged panels.
- 1px borders, sparse star/grid markers, fine technical rules, strategic curvature.
- Desktop hero and capabilities should feel spacious rather than jammed with tiny unreadable UI.

---

## 3 — SECTION 01: HERO (MATCH REFERENCE 01)

**Anchor ID:** `#top` or `#hero`; header should be transparent/near-black and integrated with hero.

### Header (real HTML)

Left: small custom arc/signal symbol + `arc&signal` wordmark.  
Links: Platform / Solutions / Architecture / Resources.  
Right: `BOOK A DEMO ↗` outlined pill.  
Header may be sticky with a refined backdrop when scrolled; maintain unobtrusive height, accessible keyboard focus, and a functional mobile menu.

Link behavior: Platform → `#platform`; Solutions → `#capabilities`; Architecture → meaningful anchor within Platform or the governance capability; Resources → a real page-local explainer/resource dialog rather than a `#` dead link; Book a Demo → accessible demo request dialog/contact area. Add active/hover states without excessive motion.

### Hero copy (real HTML)

Eyebrow: `THE INTELLIGENCE ORCHESTRATION LAYER`

Headline:

```text
INTELLIGENCE,
IN SYNC.
```

Accent `SYNC.` with a crisp violet→cobalt treatment. **Do not reproduce the isolated “go”/stray letter artifact** in the reference image.

Supporting paragraph:

`Connect models, agents, tools, and data in one orchestration layer built for clarity, control, and scale.`

Primary CTA: `EXPLORE PLATFORM ↗` → platform section.  
Secondary CTA: `BOOK A DEMO` → demo dialog.  
Microline: `ONE CONTROL PLANE. EVERY INTELLIGENT WORKFLOW.`

### Layout

Desktop text uses roughly **43–48% width**, visual core **52–57%**. The core is large, visually dominant, weighted center-right, and may extend beyond the right edge inside a clipped hero visual region. Background remains cohesive. Small floating **HTML** labels around it:

- MODELS
- AGENTS
- TOOLS
- DATA

Optional live status tiles:

- `ROUTING STATUS / ACTIVE` and a small route selector status.
- `WORKFLOW EXECUTION / 5 STEPS CONNECTED` only if this relates to local demo state; otherwise use `EXAMPLE WORKFLOW / 6 STAGES` to match the walkthrough.

These labels are connected to the projected 3D visual with short SVG leader lines, not baked into a texture. Labels may be clicked/hovered to highlight corresponding branches and update explanatory text. On mobile, reduce to two or four compact chips beneath the core.

### Hero motion

1. Header and type reveal through clean vertical/directional clipping masks; avoid generic repeated fade-ups.
2. Core assembly starts in an exploded but controlled layered state, then settles into connected rings.
3. Local incoming luminous paths activate sequentially, cueing the global route.
4. Slow idle motion after assembly; pointer-driven parallax limited to a few degrees.
5. Scrolling begins the handoff: scene tilts/recedes subtly while the global route continues toward capabilities. All transitions reverse correctly on upward scroll.

---

## 4 — THREE.JS 2.5D HERO ORCHESTRATION CORE — NON-NEGOTIABLE

### Objective

Reconstruct the **circular mechanical intelligence core in reference 01** as real-time geometry with credible depth and restrained cinematic lighting. It is **not** a simple 2D SVG ring, a photograph pasted onto a plane, a torus knot, or an infinite spinning neon circle. The overall appearance should remain recognizable: **many segmented concentric arcs, recessed central well, translucent lilac shells, metallic ridges, micro-markings, and luminous incoming/outgoing routes**.

### 2.5D camera and scene

- Transparent WebGL canvas composited onto the page-level dark background (`alpha: true`).
- Perspective camera at an approximately near-frontal three-quarter view, e.g. `fov: 30–38`, aimed at the core; nominal camera at `(0, 0, 8–11)` with a slight X/Y offset if needed.
- The object is predominantly XY-oriented with **real Z offsets** between layer groups, not freely rotating 3D sculpture.
- Resting tilt 6–12° at most, additional pointer tilt limited to about ±3–5°. Do not permit orbit controls that turn the model around or drag it off-brand.
- Use lighting that reveals layered metal edges: restrained ambient, 1–2 soft directional/point lights, cool-white highlights, violet emissive accents. Avoid flat glowing plastic.

### Geometry recipe (construct real meshes)

**A. Deep inner well**

- Recessed dark central cavity using a stack of cylinders/rings with progressively smaller radii and negative Z depth.
- Dark graphite surfaces, subtle specular rings, decreasing brightness toward center. Add a few quiet radial ribs/ticks for mechanical plausibility.
- The center must visually look like a tunnel/recess rather than a filled flat disc.

**B. Nested segmented ring assembly**

- Create approximately 7–12 concentric ring layers with intentionally varied radii, arc lengths, Z offsets, thickness, and material families. A practical normalized radius envelope: `0.5–2.4` scene units.
- Use partial `TorusGeometry` (`arc` angle) and/or custom `ExtrudeGeometry`/`BufferGeometry` to form segmented arc strips with believable thickness and beveled edges.
- Make arc gaps intentional and staggered. Do not distribute identical arcs uniformly like a stock loading spinner.
- Include thin unlit technical tracks behind primary segments and a few asymmetrical wedge plates.
- Animate only selected nested groups; some should remain static so the structure retains weight.

**C. Translucent illuminated glass/acetate shells**

- Several violet/pale-lilac curved panels sit above mechanical rings at slightly different depths.
- Combine transparent `MeshPhysicalMaterial` or carefully tuned `MeshStandardMaterial`/`ShaderMaterial`, with subtle emissive edges; use `transparent` and depth settings deliberately to avoid sorting artifacts.
- No opaque purple tire. The metal, translucency, and dark recess must remain distinguishable.

**D. Micro-detail rings and optics**

- Fine concentric tracks, short radial ticks, precise engraved arc marks, sparse dots, tiny junction indicators.
- Use batched geometry/instancing or grouped buffers when possible to reduce draw calls.
- Micro-details should enrich the hero at desktop sizes but never create aliasing-heavy noise.

**E. Local signal filaments**

- Draw a handful (about 3–5) of elegant curved incoming/outgoing lines immediately adjacent to and through the core using `CatmullRomCurve3`/custom Bezier curves + narrow tubes or shader line geometry.
- Animate a traveling energy window along each line using shader uniforms or moving highlight segments; **do not move the entire curve** and do not use uncontrolled particles.
- Multi-stroke luminous look: fine white/lilac central filament, wider semi-transparent violet core, restrained bloom/halo. Limit local glow so the crisp line stays visible.
- These are **short core-local filaments** only. The long inter-section signal belongs to the document-level SVG system described below. Do not independently generate a second long line beyond the canvas.

**F. Functional hotspots**

- Expose stable scene anchors for `MODELS`, `AGENTS`, `TOOLS`, `DATA`, and one **exit junction**. Their positions should correspond to real ring/branch points.
- Labels remain HTML; on click, update a selected category and light the corresponding local filament/ring sector.
- Hover state should be predictable and accessible; never make essential behavior pointer-only.

### Motion specification

**Boot / assemble, ~1.6–2.8s, no abrupt cut:**

1. Dark inner well fades into relief and emerges from slight Z compression.
2. Outer ring arcs rotate a few degrees into their final alignment (staggered, weighted easing).
3. Transparent plates align; small highlight strokes sweep along bevels.
4. The intelligent routing core activates with one restrained luminous pulse.
5. Local routes light up sequentially, then settle into low-energy idle.

**Idle:** slow differential ring motion (subtle; visual movement is perceivable over several seconds, not carnival spinning); 1–2 occasional route pulses; pointer tilt easing via damping. Keep the mechanical core readable.

**Scroll:** draw/activate outgoing line, tilt or shift the entire model slightly backward and to the right while the global SVG takes visual precedence; no object exploding on scroll. Reverse naturally as the user scrolls upward.

**Capability hover / label interactions:** selected route brightens, related rings respond with a short sector alignment/pulse; reduce brightness of nonselected routes. Tooltip content is DOM and explains the selected category.

### Three.js → DOM/SVG coordinate bridge

The core must connect **exactly** to the page's signal line:

1. Define a known `Object3D`/`Vector3` **hero exit anchor** attached to the core/local filament junction.
2. After camera transforms, project that world coordinate via `vector.project(camera)` into normalized device coordinates.
3. Convert projected NDC to **canvas-local CSS pixels**, and then to **document-space coordinates** using the WebGL canvas bounding rectangle and current scroll offset.
4. Send/update the projected anchor to the shared route system. Recompute for resize/breakpoint, font/layout changes, and while scroll/pointer transforms materially alter its position. Throttle to one animation frame per render frame; do not force synchronous layout in every component independently.
5. Build the continuous SVG path from this projected anchor through the next section anchors. Match outgoing tangent and path color/width with the local filament.
6. Ideally use an **overlap handoff window** of 20–50 CSS pixels where the Three.js local filament fades as the SVG filament becomes dominant; no visible seam and **no doubled bright paths**.
7. Use one shared route progress value for local signal timing and the global SVG reveal.

**Important:** If precise 3D-to-SVG projection is unstable due to camera motion, place a DOM-based hero handoff anchor over the projected exit and constrain the local filament endpoint to that fixed handoff zone. Prefer a stable connected result over a sophisticated but visibly broken one.

### Materials and performance

- Reuse geometries/materials; dispose them on teardown.
- Clamp pixel ratio around `min(devicePixelRatio, 1.5)` on desktop and lower on weaker mobile devices.
- Prefer 30–60fps depending on device capability; avoid stacked expensive transparent passes and massive postprocess bloom kernels.
- Postprocessing bloom, if included, must be selective and mild. It is optional; **clear segmented geometry is mandatory**.
- Stop or reduce animation when offscreen using visibility/intersection cues; do not leave an unseen canvas burning CPU.
- Handle `webglcontextlost` gracefully. Provide a genuine **static responsive SVG illustration** fallback of nested segmented rings and local line geometry when WebGL is unavailable. Do not show the entire screenshot as a fallback.
- `prefers-reduced-motion`: assembly disabled, no autonomous rotation/particles, stable core, clear static line; product interaction still usable.
- Do not use external HDRI or huge remote 3D files that may fail. Procedural geometry is preferred.

### Core acceptance test

A viewer must recognize: layered concentric **segmented mechanical ring structure**, a **recessed center**, different material depths, **translucent violet segments**, controlled glowing signal paths **connected to the rest of the site**, subtle perspective responsiveness, and precise label interactions. A 3D donut or blurred spiral alone fails.

---

## 5 — ONE CONTINUOUS DOCUMENT-LEVEL SIGNAL SYSTEM

### The known problem

The reference JPGs contain four separately generated glowing line illustrations. Their routes start/end at inconsistent X positions, change width or direction, and do not physically join. **Do not reuse them verbatim as four separate section backgrounds.** The live site must introduce ONE mathematically continuous master path and subordinate branches.

### Required SVG architecture

- Render an absolute, page-spanning SVG within the main page container, **not four separate per-section path components**. It covers the complete scrollable content height, with `pointer-events: none`.
- Keep the master signal behind headings and clickable controls, yet visible above the site-level atmospheric background. Give each section local z-index control for foreground/background artwork.
- Include a faint persistent underlying route + an actively drawn luminous route + optional traveling highlight. Use 2–4 coordinated strokes, not a dozen blurred duplicates.
- Compute its `viewBox` in the page-container coordinate space; recalculate geometry when content height/width or anchor locations change.
- Use HTML elements with `data-signal-anchor` or `ref` as ground truth for join positions. Section geometry should determine the path, never arbitrary screenshot pixel offsets.
- At least these anchors must be connected **in order**: projected hero exit junction → capabilities entry/junction → selected capability route node → capabilities exit → workflow demo entry → selected/executing workflow node → workflow exit → CTA convergence junction. Optional side branches may attach to this master route but not replace it.
- Convert viewport boxes to local page coordinates: box positions relative to the shared page container; account for scrolling, CSS transforms and nested stacking context carefully.
- Use smooth cubic Bézier segments and ensure **C0 and C1 continuity** at joins: endpoint positions and tangent directions align, with no visible kinks at section boundaries.
- Route can weave horizontally/vertically based on layout; keep visible tangents similar to the references: hero sweeps to the lower left, capabilities curves upward through routing grid, platform passes through execution stages, CTA converges to one bright junction.
- On mobile, rebuild a simpler low-detail path along the left or right content rail. Never squash desktop SVG coordinates to narrow width.
- Avoid placing a bright route directly behind small body copy; strategically curve behind the product canvas and around content.

### Suggested geometric method

1. Collect one sorted array of **document-space anchors**, with optional preferred incoming/outgoing tangent directions.
2. Construct a single `d` command (`M ... C ... C ...`) through all anchors using stable interpolation and capped control-handle distances.
3. For very long gaps, add a carefully placed virtual routing waypoint rather than letting auto-interpolation cause awkward loops.
4. Measure the rendered path length and map page scroll progress to `stroke-dasharray`/`stroke-dashoffset` or GSAP DrawSVG equivalent. Avoid plugin licensing requirements; basic SVG + GSAP is sufficient.
5. For meaningful activation timing, calculate per-anchor path offsets (approximate by sampling `getPointAtLength` when needed) and align section animations with those offsets.
6. Use `ResizeObserver`, `document.fonts.ready`, and `ScrollTrigger.refresh()` at the right times; respect browser resize and mobile orientation changes.
7. On transforms/animations that alter anchor positions, update once per `requestAnimationFrame` only as needed. Smooth new geometry or lock moving anchors to stable handoff proxies to prevent jitter.

### Signal appearance

- Outer halo: broad but very low-opacity violet blur.
- Mid stroke: violet/cobalt luminous ribbon of moderate width.
- Hairline: crisp nearly-white/violet highlight.
- Optional 1–3 small highlights traveling along **the actual route**, not floating random particles.
- At active junctions: soft node glow + tiny sharply defined core.
- Signal should look like **engineered routed light**, not a cloudy neon brush.

### Scroll choreography and section behavior

- Initial page: hero core routes activate locally; distant main route is barely visible.
- Hero → Capabilities: the active stroke flows out of the core and physically enters the service grid, where Route receives an activation pulse.
- Capabilities → Platform: the same line moves from selected routing module to the workflow canvas. The highlighted capability hands off to the selected workflow node.
- Platform → CTA: the main route exits the workflow demo; secondary thinner branches appear and join at the final convergence junction.
- The final CTA lets the path settle into a complete, luminous joined form; all upstream connections are still faintly traceable.
- **Upward scroll reverses** drawing and choreography. Do not reset or jump on reversal.

### Prevent duplicate/glitched signals

- Do not display the four complete JPGs as layers containing their old routes.
- Build all lines in live SVG/Three.js. Reconstruct surrounding UI as DOM/CSS/SVG.
- Only keep original JPGs as design references in the repository or use deliberately cropped **line-free decorative fragments**, if any.
- A visible line twice as bright at the hero handoff is a bug, not a desired glow effect.
- Test document-wide scroll at 25%, 50%, 75%, and exactly at each boundary; there must not be a disconnected endpoint.

---

## 6 — SECTION 02: CORE CAPABILITIES (MATCH REFERENCE 02)

**Anchor:** `#capabilities`

### Copy/layout

Left 35–40%:

Eyebrow: `01 / THE CONTROL PLANE`

Headline:

```text
ONE SYSTEM.
EVERY
POSSIBILITY.
```

`EVERY` uses violet→cobalt accent.

Copy: `From the first request to the final result, coordinate every decision across your AI stack.`

CTA: `EXPLORE CAPABILITIES ↗` should **activate/scroll/focus** the actual capability diagram, not be a dead label.

Right 60–65%: a connected **2×2 capability topology**, open enough to read, matching the reference's four quadrants, small status readouts, luminous central route and thin borders.

### Four functional capability cells

**01 / ORCHESTRATE** — `Build coordinated multi-agent workflows.`  
Diagram: trigger fans out to agents and recombines.  
Behavior: selecting highlights branch paths and reveals the agent fan-out summary.

**02 / ROUTE** — `Send every task to the right intelligence.`  
Diagram: three model choices with one clearly selected route.  
Behavior: model options can be clicked; active route changes, descriptive panel reflects selection, line illumination re-routes. Avoid pretending a real model API is running.

**03 / OBSERVE** — `Understand every decision and outcome.`  
Diagram: a short execution trace with event markers and a tiny latency visual, labeled as **sample events**.  
Behavior: selecting event marker updates its description/selected timestamp.

**04 / GOVERN** — `Stay in control of critical actions.`  
Diagram: permission matrix + human review checkpoint.  
Behavior: clicking Review toggles a local sample approval state; show accurate state text.

Use a single selected capability in state (default ROUTE), accessible `button`/tab controls, pointer and keyboard selection, accessible names, visible focus. Selected state changes routed SVG branches and an informative detail region. Hover can preview emphasis but must not permanently overwrite selection.

### Section-specific motion

The global line enters the topology and activates nodes in a timed sequence. Selecting a capability animates **only** its branch and relevant diagram; other branches dim, not vanish. Avoid four separate slide-up cards. On leaving, retain state so scrolling backward returns to a consistent selection.

---

## 7 — SECTION 03: INTERACTIVE PRODUCT WALKTHROUGH (MATCH REFERENCE 03)

**Anchor:** `#platform`

### Copy/layout

Eyebrow: `02 / INSIDE THE PLATFORM`

Headline:

```text
FROM INPUT
TO INTELLIGENCE.
```

Subcopy: `Design workflows, coordinate specialized agents, and see every decision as it happens.`

Three actual accessible tabs:

- `WORKFLOW BUILDER` (default)
- `EXECUTION TRACE`
- `MODEL ROUTING`

Use tab semantics: `role="tablist"`, `role="tab"`, `aria-selected`, tab panels, arrow-key navigation. Visually align them with reference 03. The active tab must display distinct content, not just change the underline.

### Main interface

Create an interactive, polished in-browser **simulation** resembling the reference: tall workspace left rail, central node canvas, right inspector panel, bottom execution trace.

Workspace navigation (local UI): Workspace / Workflows / Agents / Models / Observability / Settings. Each visible click should do something intentional: switch panel or show a relevant informational subview within the demo. No inaccessible dead sidebar items.

Workflow name: `Customer Resolution Pipeline`.

Stages in order:

1. `TRIGGER` — New support request
2. `CONTEXT` — Retrieve account knowledge
3. `PLAN` — Reasoning agent
4. `EXECUTE` — CRM + support tools
5. `REVIEW` — Human approval
6. `RESULT` — Resolution prepared

Represent these as live DOM/SVG nodes on a grid. Use readable labels, distinct shapes/semantic icons, thin connectors and controlled illumination. Select PLAN initially. When clicking any node, show its actual sample properties in the inspector. Provide a small pan/zoom control if feasible, but don't sacrifice primary behavior for a complicated canvas editor.

### Real client-side functionality

**Workflow Builder tab:**

- Six selectable stages; selected node shows details in the inspector.
- `Run Demo`, `Pause`, `Reset` controls operate a deterministic local simulation. The active stage advances through the six stages at a reasonable readable pace; progress ring/trace and active connector animate in sync.
- At REVIEW, pause and request user action: `Approve` or `Reject`. Approve continues to RESULT. Reject ends in clearly labeled `Stopped / Rejected`, never falsely shows a completed result.
- Optional: a simple draggable/reorderable layout is a bonus. **Do not** promise a full production workflow editor when the demo is only local. A reliable interactive walkthrough is the required baseline.

**Execution Trace tab:**

- Timeline/table of sample stages with status and timestamps/durations labeled `Demo trace`.
- Select an event to inspect inputs, outputs, and routing rationale with fabricated-but-plausible **illustrative** values. State clearly it is example data.
- Execution controls should update the trace state.

**Model Routing tab:**

- Present 3 simulated model endpoints: `Model A — Fast`, `Model B — Balanced`, `Model C — Reasoning`.
- Choose preference: `Latency`, `Balance`, `Reasoning quality`.
- Selection changes the highlighted route, badge and small explanation. No real API calls or fabricated performance claims.
- Keep this related to selected ROUTE capability if practical.

**Inspector pane:**

- Node name, type, state, selected configuration.
- Expandable `Inputs`, `Tools`, `Policies`, `Execution trace` sections with real content based on selection.
- Badges: Active / Pending / Awaiting approval / Completed / Rejected—reflect actual local demo state.

**Execution strip:**

- 01–06 progress markers beneath workflow. Animated route lines follow actual stage state.
- Clicking a marker in idle mode selects that stage for inspection; while running, preserve the running demo state and avoid confusing manual jumps unless explicitly supported.

### Scroll/visual animation

The global route enters the product UI at its defined connection anchor and becomes a shorter local execution connector through the sample workflow. Coordinate global progress with workflow activation. But **do not auto-run or mutate the user's demo just because they scroll**: scroll can preview a visual progression, while actual execution requires clicking Run Demo. Keep these as clearly separate states to avoid state conflicts.

### Honest product-demo policy

This is a **fictional concept product**. Never imply real agent calls, access to real enterprise systems, SOC2 certification, supported integrations, guaranteed uptime, or actual throughput. UI should look credible but identify simulations as `Interactive demo` / `Illustrative data` in small clear text. Do not call nonexistent APIs.

---

## 8 — SECTION 04: CTA + FOOTER (MATCH REFERENCE 04)

**Anchor:** `#contact`

### Copy

Eyebrow: `03 / WHAT'S NEXT`

Headline:

```text
MAKE EVERY
MODEL MOVE
AS ONE.
```

Use controlled violet/cobalt glow on `AS ONE.` while preserving text sharpness and readability.

Paragraph: `Bring your AI systems together. Build with more clarity, run with more control, and move from experimentation to execution.`

Primary CTA: `BOOK A DEMO ↗` → accessible demo dialog.  
Secondary CTA: `EXPLORE THE PLATFORM` → `#platform`.

Small line: `YOUR INTELLIGENCE. ONE CONNECTED SYSTEM.`

### Convergence graphic

Right half: one large technical circular junction, fine concentric tracks and several slender incoming routes. **These are branches off the same global page-level line**, not disconnected cloned streaks. Use real SVG geometry so branches merge at a precise coordinate with visually matched tangents and lighting. As the CTA enters view, the routes converge and a short node activation pulse fires once. Reversing scroll reverses the converging reveal.

### Footer

- Custom ARC & SIGNAL mark and `THE INTELLIGENCE ORCHESTRATION LAYER`.
- PLATFORM: Overview / Capabilities / Architecture.
- EXPLORE: Solutions / Resources / Documentation.
- COMPANY: About / Contact / Privacy.
- Contact: `LET'S CONNECT` + `hello@arcandsignal.example` (clearly example-domain placeholder; keep configurable).
- Links: LinkedIn / GitHub. These are **fictional placeholders**: do not link to unrelated real companies; show a tasteful `Concept template` info message or configure real links later.
- Bottom `© 2026 ARC & SIGNAL. CONCEPT PLATFORM.` + `BACK TO TOP ↑`.

### Contact and demo behavior

No real backend or booking provider has been supplied, so **never falsely claim a demo was scheduled or an email was sent**.

Implement `Book a Demo` as an accessible dialog with a compact demo-request form (name, work email, team/company, what you'd like to build). Validate on the client. If an actual configured endpoint exists in the project, integrate it. Otherwise show a clearly identified **Demo mode** with a functional `Copy request` button or a `Create email draft` action using a configurable email recipient and a `mailto:` draft. Do not report submission success for an unconnected form. All controls must still do something meaningful.

For `Resources`, `Documentation`, `About`, and `Privacy`, if no real pages exist, implement modest accessible informational dialogs/panels describing the *fictional template*, or use purposeful on-page anchors; do not leave literal `href="#"` dead links.

---

## 9 — GLOBAL MOTION SYSTEM AND SCROLL STORYBOARD

Treat motion as **system behavior** rather than generic entrance decoration. Animations should have clear relationships and compositional purpose.

### Scene A: initial load

- Site typography and navigation appear through short clean mask reveals.
- Hero core assembles with staggered partial rotations/depth alignment.
- Local core lines activate, then connect to global route.
- Two status elements dock softly; no bouncing.

### Scene B: hero to capabilities

- Scroll drives a subtle hero-core recede/tilt and a continuous line reveal.
- Master signal physically travels into the capabilities system.
- `ROUTE` node receives activation before other capability junctions faintly illuminate.
- Main heading has a directional mask entrance; avoid generic opacity-only animations.

### Scene C: capabilities interactions

- Switching capabilities reroutes illumination along connected branches.
- The active module gets a short line-draw and details update; inactive modules remain visible.
- Hover previews state without destroying persistent click selection.

### Scene D: into the product

- The same signal enters the workflow canvas at a real anchor.
- Product interface panels assemble with controlled spatial docking (sidebar → canvas → inspector → trace), slightly staggered.
- Workflow demo Run/Pause/Reset operates independently from scroll progress.

### Scene E: product to CTA

- The active signal emerges from the platform viewport.
- Supplementary branches appear and converge into one elegant CTA junction.
- Headline reveal and final pulse align with completion of route.
- Footer is a calm ending, not an unrelated brightly animated section.

### Motion bounds and accessibility

- Entry/mask animations ~0.4–1.1 seconds; core assembly ~1.6–2.8 seconds; pointer damping smooth and subtle.
- All scroll-linked motion should scrub and reverse smoothly. Use `gsap.context` cleanup or equivalent.
- Don't aggressively pin every section for multiple screen heights. Use pinning sparingly only if it improves story; preserve natural scrolling and mobile usability.
- Reduce scroll-path density and 3D effects on mobile; disable all nonessential motion when reduced-motion is requested.
- Interactions must work without animation and without a mouse.

---

## 10 — RESPONSIVE DESIGN SPECIFICATION

Target at minimum: **1920, 1440, 1280, 1024, 768, 430, 390, 360, 320 CSS pixels**.

### Desktop 1280+

- Header full navigation.
- Hero text/core split, core overflows thoughtfully within the right visual field.
- Capabilities left editorial copy + right 2×2 connected topology.
- Product section has large live UI with left sidebar, node canvas, right inspector, bottom trace.
- CTA large headline left + convergence ring right; footer multicolumn.

### Tablet 768–1279

- Hero visual scales and repositions below/right of text as appropriate; no collision.
- Capabilities reduce detail but maintain 2×2 topology until space becomes insufficient.
- Product inspector can collapse into a slide-in panel; workflow stage labels remain readable.
- Route anchors recalculate at this breakpoint, with smooth lines adapted to actual positions.

### Mobile 320–767

- Working accessible hamburger menu, body scroll locked only while open, Escape closes, keyboard focus managed.
- Hero stack: eyebrow → headline → copy/CTAs → smaller 2.5D core. Avoid clipping the core offscreen; no tiny text embedded in canvas.
- Capabilities show vertically stacked selectable modules. A simplified continuous route follows the stack; no 2×2 desktop diagram squeezed onto a phone.
- Product demo uses horizontally scrollable or vertically stacked node visualization with clear active state; sidebar becomes compact, inspector is a tab/drawer. Do **not** force all six workflow nodes into unreadable 30px-wide boxes.
- CTA graphic can sit behind/below headline and use a smaller simplified convergence path.
- Footer becomes structured stacked columns.
- Controls minimum comfortable touch target size, text contrast preserved, page no sideways scrolling.
- WebGL quality degrades gracefully; cap DPR, rings/material layers can simplify on weaker devices.

### Scaling rule

The site should **reflow**, not scale a 2048×1143 screenshot proportionally until tiny. Treat images as art direction reference, not pixel-perfect mandatory placement on every screen.

---

## 11 — PERFORMANCE, ACCESSIBILITY, AND ROBUSTNESS

**Performance:**

- No giant fullscreen image overlays to mimic screenshots.
- Avoid 4K textures, oversized HDRIs, unbounded particle counts, excessive transparent materials.
- Limit and batch Three.js draw calls where practical; use one canvas for core only.
- Pause/reduce offscreen 3D rendering; cancel RAF and event listeners, kill GSAP triggers on teardown.
- Avoid forced layout thrash during scroll; cache anchor positions and refresh on resize/layout changes.
- Ensure CSS effects do not cause main-thread jank. Prefer transforms/opacity and SVG stroke properties with efficient updates.
- Handle slow network and fonts without flash/jump; fonts can fall back gracefully.

**Accessibility:**

- Semantic landmarks, single `h1`, hierarchical headings, visible focus, skip-to-content.
- Buttons are buttons, navigation anchors are anchors, tooltips have labels, dialogs trap focus and close via Escape.
- Tab panels keyboard usable with `aria-selected` and correct associated IDs.
- Three.js canvas decorative to screen readers with accessible descriptive text outside canvas.
- Do not convey workflow states by color alone.
- `prefers-reduced-motion` yields a clear, fully usable nonanimated composition.
- Distinguish local demonstration from real external operation.

**SEO & metadata:**

- Title `Arc & Signal — Intelligence, in Sync.`
- Description about orchestration of models, agents, tools and data.
- Proper Open Graph defaults if locally available; avoid unsupported fabricated claims.
- Favicon can be the custom signal mark.

**Quality bars:**

- No console errors, broken imports or impossible APIs.
- No broken font loading, obvious rasterized text from full screenshot backgrounds, or unreadable small text.
- No fake scheduled demo submissions, no invented customer logos/testimonials or numerical promises.
- No disconnected lines, clipped focus rings, offscreen dialog controls, runaway scroll animations, or stacked neon overdraw.

---

## 12 — IMPLEMENTATION ORDER: EXECUTE, DON'T JUST PLAN

Work through these milestones **without asking for approval between them**:

**P0 — Foundation**

1. Inspect source/project dependencies and verify reference image availability.
2. Create/reuse React app structure, token system, site background, sections and semantic copy.
3. Reconstruct responsive section layouts and real buttons/links **without displaying complete JPG screenshots**.
4. Build capabilities modules and platform demo state/UI.

**P0 — The hero 2.5D system**

5. Implement procedural Three.js rings, recessed core, translucent segments, local signals, HTML hotspots, and graceful fallback.
6. Implement assembly, idle, hover, pointer tilt and scroll response; keep materials controlled and geometry recognizable.

**P0 — Continuous master route**

7. Implement page-level SVG, anchor measurement, Three.js projection handoff, cubic-curve joins, and one scroll-progress animation.
8. Attach capability, workflow and CTA sections to the **same path**. Fix doubled line overlap and endpoint breaks.

**P1 — Interaction and polish**

9. Wire all capabilities, tabs, stage inspector, execution run/pause/reset, approval gate, routing preference, dialog, menu and footer controls.
10. Polish scroll choreography, responsive variations, keyboard behavior, reduced-motion mode, and performance degradation.

**P1 — Test and deliver**

11. Run available build/typecheck/lint/test commands; fix errors.
12. Inspect desktop/mobile previews where tooling permits. Validate route continuity at section boundaries. Test actual keyboard and click behavior.
13. Give a concise final implementation report stating what is implemented, which interactions run as local demos, what was checked, and which integrations remain placeholders.

Do not claim tests were run if they were not run. Do not claim a real 3D model if the hero is only a 2D ring. Be transparent about any limitation.

---

## 13 — ACCEPTANCE CHECKLIST / MANUAL QA

### Visual

- [ ] Header, hero type and right-hand core resemble reference 01.
- [ ] A layered, mechanical segmented core with a dark recessed well genuinely renders in Three.js.
- [ ] Core has controlled glass/metal depth and subtle animation, not one spinning hoop.
- [ ] Capabilities resembles reference 02's four-module connected layout.
- [ ] Platform resembles reference 03's actual node-canvas + sidebar + inspector structure.
- [ ] CTA resembles reference 04's converging visual + structured footer.
- [ ] Entire page shares one dark background; no horizontal seams.
- [ ] All important headings/buttons are real DOM text, not baked screenshot pixels.

### Signal continuity

- [ ] The route leaves the hero at a visible 3D/SVG handoff.
- [ ] One continuous master SVG `path` traverses all four sections.
- [ ] No disconnect or sudden angle at Hero→Capabilities.
- [ ] No disconnect at Capabilities→Platform.
- [ ] No disconnect at Platform→CTA.
- [ ] Route keeps consistent core/halo/glow appearance.
- [ ] No duplicate old JPG lines or doubled bridge at handoff.
- [ ] Scroll reversal is smooth.
- [ ] Resize/rotation/mobile recalculates path correctly.

### Interaction

- [ ] All header navigation and CTAs work.
- [ ] Core labels select/highlight routes.
- [ ] Four capability modules select and update diagram/details.
- [ ] Product tabs show different real panels.
- [ ] Workflow node selection opens accurate inspector content.
- [ ] Run/Pause/Reset demo controls work; Review requires approval/rejection.
- [ ] Model routing preference changes a sample route.
- [ ] Book Demo opens a working modal; no false form submission.
- [ ] Mobile navigation and footer controls work.

### Accessibility / runtime

- [ ] Mobile 320–430px has no horizontal overflow.
- [ ] Keyboard focus and tab behavior work.
- [ ] Reduced motion yields a usable static version.
- [ ] WebGL fallback remains visually coherent.
- [ ] No console/build/runtime errors.
- [ ] No bogus real-world metrics/certifications/integration claims.

---

## 14 — FINAL GUIDANCE: DESIGN QUALITY PRIORITIES

In case of competing implementation priorities, use this order:

1. **Recognizable, premium visual fidelity to all four references.**
2. **Procedural Three.js 2.5D hero** with genuinely layered geometry.
3. **Perfectly connected and meaningful signal path**, not disconnected local effects.
4. Real, accessible interactive controls and believable sample workflow behavior.
5. Responsive composition and performance.
6. Refined motion polish that supports the story.

**Design injunctions:** No generic gradient blobs, robotic heads, brain holograms, off-the-shelf SaaS cards, random floating particles, fake customer proofs, giant blurry rings, or photorealistic screenshots masquerading as functional interface. The product's visual identity is **controlled routed intelligence**: the 2.5D orchestration engine, the single continuous purple signal, precise modular diagrams, and a credible living workflow UI.

**Deliver the working website now. Do not stop at planning.**
