# ARC & SIGNAL — LIVING INTELLIGENCE SYSTEM
## Full Revision Master Prompt for Google AI Studio

> **Task type:** Upgrade the **existing, working Arc & Signal landing page** in the current project. This is a focused visual, animation, and interaction overhaul—not a new website and not a request to generate static images.
>
> **Success condition:** The website must feel like one responsive, living AI orchestration system. The hero's core must have convincing 2.5D depth and processing behavior; optical signals must visibly flow and travel through connected routes; the final CTA must feature a sophisticated convergence mechanism; and section interactions must be coordinated through a shared state model.

---

## 0. Operating instructions — read first

Inspect the existing project, component tree, styles, animation implementation, Three.js scene, scroll logic, state management, and available dependencies **before** changing code. Inspect the provided screenshots as evidence of the current visual problems. Preserve the layout and branding rather than replacing the entire design.

**Do not stop after planning. Implement, run, test, debug, and refine all four priorities in this request in one pass.** Make pragmatic decisions consistent with the current architecture. If the project is React, retain React; use React Three Fiber only if it is already installed or genuinely useful. If Three.js is already implemented directly, improving it in place is acceptable. Use GSAP/ScrollTrigger if available and appropriate; do not add unnecessary dependency stacks.

### Preserve from the current site
- Arc & Signal wordmark, brand identity, color palette, overall content and four-section order.
- Header/navigation and anchored scrolling: Platform, Solutions, Architecture, Resources.
- Hero headline and CTA hierarchy.
- Four capability panels: Orchestrate, Route, Observe, Govern, including their existing selectable states and content.
- Product walkthrough and working six-stage Customer Resolution Pipeline simulation; tabs, Run/Pause/Reset controls, inspector, logs, and stages.
- Final conversion CTA, footer, responsive layouts, accessibility, and existing functional behaviors.

### Correct the current implementation's visible flaws
1. **Hero:** The large pale circular asset looks like several flat, uniformly lit rings. The center lacks mechanical depth; incoming lines visually cut across the core rather than being routed through it.
2. **Signal paths:** Mostly static, simple violet strokes with weak/absent visible flow. The signal should transport packets, react to nodes, split/merge, and exhibit intentional rhythmic activity.
3. **Final CTA:** The convergence graphic is only a group of curved lines meeting at a dot; it has too little depth, detail, and event choreography.
4. **Cross-section motion:** Each area feels independently animated. The page should behave as one orchestrated system where scroll and user actions change the same visual language and execution state.

### Non-negotiable constraints
- Do **not** use entire reference screenshots as HTML backgrounds or baked UI images.
- Do **not** generate new AI images; these improvements should be implemented in code using Three.js, SVG, CSS, and real UI components.
- Do **not** replace working buttons, tabs, model selection, capability controls, or workflow logic with decorative visuals.
- Do **not** add fake live integrations, unverified uptime/latency claims, or misleading real customer metrics. Preserve the simulation/demo character of the product experience.
- Do **not** replace meaningful interaction with constant random flashing, fast spinning, excessive particle spam, or heavy blur.
- Do **not** add more landing-page sections just to show new visuals.

---

## 1. Creative direction and visual targets

Arc & Signal is a premium AI orchestration platform. The look must remain technical, precise, architectural, and quietly cinematic—not a fantasy spacecraft, ordinary dashboard theme, or flashy cyberpunk game.

**Core tokens (adapt to existing theme variables):**
- `--bg: #0C0F1B` — dark obsidian
- `--panel: #11172A` — dark indigo
- `--text: #F3F4FA` — cool off-white
- `--violet: #A58AFF` — intelligent routing highlights
- `--blue: #5367F9` — structural accent
- `--steel: #9DA7C7` — technical secondary detail
- Optical highlight: restrained almost-white lavender, not uniformly white surfaces

**Layering principle:** Most of the site should remain dark and quiet. Activity appears as **localized bursts of concentrated light** with a believable source, path, destination, and consequence. Bright optical highlights should occupy a small minority of the visible screen. Use high contrast in the mechanism instead of turning every concentric ring pale lavender.

**The three visual archetypes:**
- Hero = **Engine:** depth, aperture, mechanical rings, routing ports, internal processing.
- Capabilities + Product = **Network:** selected paths, branched execution, telemetry, node-to-node causality.
- CTA = **Convergence Reactor:** distinct from hero, but clearly part of the same technology; separate streams fuse into a coherent output.

---

## 2. PRIORITY ONE — Rebuild the hero into a convincing 2.5D intelligence engine

### 2.1 Rework existing geometry, don't just add more rings

Preserve the core's right-side placement and near-frontal viewpoint, but replace/augment its flat rings with a truly layered composition:

1. **Outer structural assembly** — several partial torus/cylindrical arc bands with beveled edges, subtle gunmetal materials, visible dark sides, and structural gaps. Vary thickness and angular coverage.
2. **Optical routing ring** — segmented glass-like violet arcs located in front of or between metallic parts. Modest transparency and emission; avoid flat white blocks.
3. **Calibration and instrumentation tracks** — fine radial ticks, fine broken circular rules, etched guide marks, micro LEDs, and a few anchored markers. These are secondary, not noise.
4. **Mid-depth mechanical aperture** — nested blades, irregular offsets, spaced structural ribs, occlusion layers, and shadows. Each layer should have a distinct Z-depth and role.
5. **Recessed central chamber** — a deep, dark tunnel made of nested rings reducing in diameter. A small restrained internal illumination should create visible depth through parallax and occlusion.
6. **Signal intake/output ports** — physically plausible attachment points on the core's perimeter or internal routing manifold. Incoming streams should terminate at intake connectors, illuminate a routing segment, and reemerge from exit ports rather than passing straight over the engine art.

Target around **8–12 meaningful depth layers**, not 12 copies of the same ring. Model each layer for purpose; make an asymmetric, carefully composed visual silhouette faithful to the approved hero layout.

### 2.2 Materials and lighting

- Use a dark graphite/titanium metal base with physically plausible highlights and shadows (e.g. `MeshStandardMaterial` / `MeshPhysicalMaterial` where appropriate).
- Metallic edges should show gentle reflections, while interior surfaces remain dark.
- Optical pieces should be tinted lavender/cobalt, translucent where useful, with restrained emissive strips along selected edges.
- Apply bloom **selectively** to active emitters and signal packets; avoid a large uniform glow around the complete circle.
- Where actual refraction is too expensive or visually unstable, use layered transparent meshes and rim highlights instead of heavy physically accurate transmission.
- Add a subtle, localized cool rim light and a dim warm-neutral key to reveal material differences.
- Ensure the silhouette remains readable if bloom/postprocessing is disabled.

### 2.3 Engine behavior — intelligence rather than rotation

Implement a coherent motion cycle with meaningful sub-events:

**A. Boot sequence (first visit, roughly 1.4–2.2 seconds):** segmented arcs align from slightly offset angles; a few internal rings initialize; calibration points illuminate in a radial sequence; the center becomes active; the first packet arrives. The entrance should not delay the page becoming interactive.

**B. Idle processing:** outer structures rotate *very slowly* in alternating directions; internal scanner highlights sweep along parts of rings; occasional small energy markers travel around a calibration ring. Animation must feel purposeful and subtle, not a continuously spinning loading indicator.

**C. Route event:** when a selected model/tool changes, intake port brightens, one optical packet enters, the associated internal segment activates, then an output port pulses. Keep incoming/outgoing packet timing causally coordinated.

**D. Synchronization event:** at a restrained interval (e.g. every 9–14 seconds, configurable), select segments briefly slow/align, a short luminous sweep travels around the aperture, then the system returns to its steady state. This should *not* flash the entire hero or interfere with user input.

**E. Pointer interaction:** subtle camera or group tilt, around 2–5 degrees maximum; interpolated, damped response. No free orbit controller, no uncontrolled user rotation, and no accidental clipping of the hero copy.

**F. Scroll handoff:** as the hero transitions away, the core gently recedes/shifts and releases a signal pulse at an actual outgoing port aligned with the page's shared route anchor. Scroll reversal must work.

### 2.4 Hero HTML overlays

`MODELS`, `AGENTS`, `TOOLS`, `DATA`, routing status, and workflow-execution panels must remain crisp **live DOM UI**, not textures or 3D text. Place/accessibly align labels near real engine ports. Hover/focus a label to activate an associated route or visually emphasize the relevant ring. All labels must remain keyboard accessible if interactive.

### 2.5 Responsive quality

On small screens, reduce arc count, particles, and postprocessing. Maintain the engine's depth, silhouette, and route-event readability. Shift position or stack as needed. Never let the canvas cover hero CTA controls or clip the entire mechanism.

---

## 3. PRIORITY TWO — Replace the simple violet paths with living optical signal streams

The signal route is the site's **signature brand behavior**. It cannot look like an ordinary glowing SVG line.

### 3.1 One continuous page route

Implement a **single logical routing system** across Hero → Capabilities → Product → CTA. Multiple branches are allowed, but they belong to the same shared graph.

Create a route registry with section-aware anchors; examples:
- `hero.coreOutput`
- `capabilities.entry`, `capabilities.orchestrate`, `capabilities.route`, `capabilities.observe`, `capabilities.govern`, `capabilities.exit`
- `product.entry`, `product.stage[0..5]`, `product.exit`
- `cta.streamInputs[0..N]`, `cta.junction`, `cta.output`

Compute connector geometry from real DOM element bounds and, for the hero, project the Three.js world-space output-port coordinate into screen space when appropriate. Resolve to one consistent page/document coordinate system. Build smooth cubic Bézier paths with matched tangents at handoff points. ResizeObserver, orientation changes, layout changes, image/font load, and breakpoint changes must trigger geometry refresh, throttled sensibly.

**At every section boundary:** position, tangent, brightness, packet direction, and packet arrival timing must match. Do not hide disconnects using opacity alone. Add an optional developer diagnostic overlay that shows anchors, segment IDs, and joint alignment.

### 3.2 Optical stream visual construction

Use **3–5 carefully balanced filaments**, not one uniformly thick stroke:
- Wide blurred base halo, very low opacity.
- Several narrow cobalt-violet strands offset slightly around a central route.
- Bright crisp central filament with variable intensity.
- Small packet highlights that move along the actual route.
- Short trailing glow behind each packet (shader, SVG gradient, or position-based repeated strokes).

Aim for a fiber-optic cable carrying information. The underlying spline remains visually stable; the *energy inside it* moves. Avoid wiggling the entire route so drastically that it no longer connects to modules.

### 3.3 Traveling packets and meaningful blinking

Implement packets with position along cumulative path length, not approximated straight-line motion. Use `getTotalLength()/getPointAtLength()` for SVG segments or curve arc-length parameterization for Three.js curves. Packet velocities can vary modestly by semantic role.

A packet's behavior:
1. Spawn at a meaningful source or intake after an event or according to a low-frequency idle scheduler.
2. Travel visibly along the selected branch, with a concentrated light head and short falloff trail.
3. Intensify slightly near active junctions.
4. Arrive at its actual destination.
5. Trigger a brief node illumination / tiny diagnostic blink / downstream effect.
6. Decay naturally; no abrupt pop or arbitrary teleport.

Use **brief diagnostic blinking**, not strobing: tiny LEDs, data ticks, and local junction halos may blink on packet arrival. Avoid whole-path flashing. Idle activity should remain visible but not distracting.

### 3.4 Branching, splitting, and merging

Capabilities: the active selected module receives dominant signal flow. Keep alternative routes faint. When the selection changes, shift activity toward the new path with a coherent travel animation, then update panel details. Avoid instantly making one segment bright and another dark without a handoff.

Product: active execution progresses through the six actual workflow stages. Stage changes correspond to packet arrivals and timeline/log updates. A gate requiring approval should visibly hold a packet rather than silently passing through.

CTA: multiple input streams should be intentionally staggered, merge at the convergence chamber, and exit as a single coherent output. Make the output distinguishable from each input.

### 3.5 Animation implementation guidance

- SVG/CSS or canvas for page-scale network; Three.js local curve meshes/shaders only inside the hero or CTA scene as appropriate.
- For SVG, use path-positioned lightweight particle elements, `stroke-dasharray`/offset, layered paths, masks, and optional filter glow. Do not animate thousands of DOM elements.
- For Three.js, animate light bands via shader uniforms/UV coordinates on tubes or curves rather than rebuilding meshes every frame.
- Keep the same visual tokens and route timing across renderers, and coordinate the hero Three.js/DOM SVG seam explicitly.
- Render route effects **behind headline text, buttons, and live UI**, with controlled stacking context. Do not obscure text or block clicks (`pointer-events: none` on decorative layers).

---

## 4. PRIORITY THREE — Replace the underwhelming footer graphic with a Convergence Reactor

The final CTA's right-hand art currently resembles a few curves meeting at a single bright dot. Replace this with a deliberate, high-fidelity **optical convergence instrument**. Its design should connect visually to the hero engine without being an identical miniature of it.

### 4.1 Convergence Reactor structure

1. **Optical intake channels:** 4–5 routed streams arriving from distinct directions, with small entry-port details and guide rails.
2. **Outer reference geometry:** one incomplete large calibration ring, thin concentric rings, orbit reference marks, and a few accurate node positions.
3. **Central lens chamber:** a layered aperture or translucent optical prism assembly with 3D or convincing 2.5D depth, rim lighting, and occlusion. Should occupy enough visual area to balance the left CTA typography.
4. **Internal fusion mechanism:** concentric or petal-like elements that briefly align during an active convergence cycle; avoid a constant simplistic spinning circle.
5. **Unified output port:** one exiting stream, slightly more coherent/brighter than the inputs, accompanied by a restrained expanding ring pulse.
6. **Selective secondary data details:** tiny route readouts, a small `STREAMS SYNCHRONIZED` state, or a compact indicator integrated into the art; do not clutter the design.

Use **Three.js if it materially improves quality**, ideally reuse shared shaders, glows, materials, and renderer resource utilities from the hero. Otherwise a meticulously layered SVG/CSS optical instrument is acceptable. The goal is visual quality and controlled performance, not the number of WebGL canvases.

### 4.2 Convergence event choreography

On reaching the CTA's prominent scroll range:
- Entry streams become active in a staggered sequence.
- Packets visibly travel along their input routes into dedicated ports.
- Upon arrival, a thin internal lens/ring illuminates once per stream.
- The center accumulates localized light, with subtle depth reaction.
- A short coordinated alignment/brightening event occurs.
- A single stronger output packet departs through the correct exit route.
- A very thin expanding wave/ring echoes the fusion moment and settles.

Repeat occasionally while the CTA remains onscreen, at a calm interval; don't fire the full event continually or create flashing. When scrolling backward out of the CTA, return gracefully to the previous visual state.

### 4.3 Preserve page content

Maintain `MAKE EVERY MODEL MOVE AS ONE.`, both CTA buttons, and the footer as live HTML. The reactor must not overlap body copy, footer links, or buttons at desktop/tablet/mobile sizes. The footer should feel like the resolving endpoint of the page-wide signal system, not a disconnected graphic.

---

## 5. PRIORITY FOUR — Synchronize all four sections with one visual state machine

### 5.1 Shared state model

Use an explicit, small shared controller/store appropriate to the existing framework. Example conceptual state:

```ts
type ExperienceMode = 'booting' | 'idle' | 'routing' | 'executing' | 'converging';

type ExperienceState = {
  mode: ExperienceMode;
  visibleSection: 'hero' | 'capabilities' | 'product' | 'cta';
  activeCapability: 'orchestrate' | 'route' | 'observe' | 'govern';
  selectedModel: 0 | 1 | 2;
  demoStatus: 'idle' | 'running' | 'paused' | 'awaiting-approval' | 'complete';
  activeStage: number; // 0–5
  reducedMotion: boolean;
};
```

This is a model, not a requirement to replace existing code with an identical implementation. Adapt and reuse existing state where possible. Avoid redundant competing states, multiple conflicting intervals, or duplicated animation authorities.

### 5.2 Events and their physical effects

| Event | Shared state effect | Visual consequence |
|---|---|---|
| Initial hero load | `booting → idle` | Core assembles; first intake signal becomes active |
| Focus/hover model label | Temporary route preview | Relevant ring/port illuminated and a short preview pulse follows the route |
| Select model | `routing`, update `selectedModel` | Route path redirects; packet arrives; UI status reflects selection |
| Select capability | update `activeCapability` | Module path activates, other branches dim, details update |
| Start product demo | `executing`, `running` | Packet enters workflow stage 01, then stage progression begins |
| Pause demo | `paused` | Packet freezes in place, timeline/logs stop progressing |
| Human approval stage | `awaiting-approval` where supported | Packet pauses at approval gate; user may approve to continue |
| Reset demo | `idle` | Reset stage, inspector, timeline, node visuals, and running packets coherently |
| Enter CTA | `converging` (for ambient visuals) | Convergence input routing plays without overriding an actively running product demo |
| Scroll backward | derive correct visible section | Handoff visuals and scroll timeline reverse without snapping |

**Priority rules:** user-driven product demo execution takes precedence over ambient autoplay. Scroll-derived *presentation mode* must not wipe real demo state or model choices. Ambient effects cannot mutate workflow logic. Hover preview is temporary and restores the user's selected route on blur/exit.

### 5.3 Three distinct clocks

Do not confuse three time sources:
- **Scroll clock:** controls section handoffs, enter/leave transitions, hero recession, and major CTA arrival; reversible.
- **Experience clock:** controls low-frequency idle processing and periodic sync events; pauses offscreen where possible.
- **Demo clock:** controls the interactive six-stage simulation; must obey Run, Pause, Reset, and approval transitions exactly.

All three can drive a shared visual renderer but should not overwrite each other's state.

### 5.4 Section storyboard

**Hero:** Mechanism assembles; models/tools/data lines become active; hover/focus reveals local pathways; one pulse exits at the page-wide handoff anchor.

**Capabilities:** Signal enters from above; branches through four selectable modules; node lighting and UI details respond to active module, with a visible route-selection event.

**Product:** Signal enters pipeline stage 01. Run Demo transports a packet through stages; selected node and trace update at arrival, not before; Pause truly freezes simulated motion; Reset reliably restores original state.

**CTA:** Signal paths physically converge in the reactor, the central lens synchronizes, and a single coherent output departs. CTA text and actions remain the primary conversion focus.

---

## 6. Architecture, performance, and cleanup

### Suggested module organization (adapt, do not force a rewrite)

```text
src/
  experience/
    experienceState.ts
    useExperienceController.ts
    signalGraph.ts
    signalGeometry.ts
    signalTokens.ts
  components/
    hero/OrchestrationCore3D.tsx
    signal/GlobalSignalLayer.tsx
    capabilities/CapabilityNetwork.tsx
    product/WorkflowSimulation.tsx
    cta/ConvergenceReactor.tsx
```

Keep the implementation modular and maintainable. Shared route state and geometry should not be reimplemented independently in four components.

### Performance rules
- Aim for smoothly rendered animation on typical desktop and respectable degraded performance on mobile; profile instead of claiming an FPS figure without measurement.
- Reuse/cached Three.js geometry and materials; use efficient instancing for repeated details if useful.
- Cap device pixel ratio (e.g. ~1.5 desktop, lower mobile based on profiling) and adjust postprocessing quality to device capability.
- Keep bloom local; use selective emitters rather than full-screen high-intensity bloom.
- Avoid expensive fragment shaders covering the entire viewport and excessive SVG blur filters.
- Minimize per-frame React state updates: drive render-loop values via refs/uniforms; commit application state only on meaningful events.
- Pause/simplify offscreen engine/reaction loops via visibility or intersection observers; stop when tab hidden where appropriate.
- Clean up RAF subscriptions, observers, GSAP contexts, event listeners, Three.js geometries/materials/render targets on unmount.
- Use a deterministic seeded visual sequence when possible to make debugging easier; avoid uncontrolled random flashing.
- If WebGL/context fails, show a legible CSS/SVG static mechanism and preserve all page interactions.

### Accessibility rules
- Respect `prefers-reduced-motion`: static connected paths, no traveling packets, no routine blinking, restrained or disabled Three.js movement, but retain usable state indicators and workflows.
- Avoid intense high-frequency flashing. Prefer local low-frequency highlights and smooth decays.
- Decorative visuals must not capture mouse or keyboard interactions intended for the UI.
- Preserve contrast, headings, focus outlines, semantic buttons, keyboard navigation, and screen-reader status for simulated workflow stages.
- Keep the page readable with WebGL disabled and on slow network/device conditions.

---

## 7. QA and acceptance criteria — must actually verify

Before finishing, run the site and inspect it at minimum at a large desktop viewport, a laptop viewport, a tablet width, and a narrow mobile width. Review the existing four screenshots for layout fidelity and compare the revised live UI against them. The goal is a *more sophisticated living version* of the same design.

### Hero tests
- The center reads as a recessed aperture with visibly different depth planes, materials, and shadowing.
- Rings do not look like uniformly bright flat lavender bands.
- Intake/output streams visually connect to actual ports and do not pass inexplicably through solid geometry.
- Labels/panels stay legible and do not collide with the core.
- Pointer response is subtle and stable; first-load motion finishes without layout shift.

### Signal tests
- At least two distinct packets can be seen moving along **actual** route curves during normal desktop use.
- Multiple filaments, their halos, and their localized packet trails are visually distinguishable.
- The signal is visible as living activity even when the user is not scrolling, but it is not intrusive.
- Capabilities selection redirects packet flow coherently.
- Packets activate a destination node only **on arrival**, not at unrelated random times.
- Adjacent section route joints line up with no positional/tangent jumps or phantom disconnected lines.
- There are no doubled baked-in routes and no decorative path drawn across text or buttons.

### Workflow tests
- Run triggers a synchronized visible packet that advances from the first stage.
- Active stage, inspector, trace log, and progress strip match the same stage.
- Pause actually stops simulation progress and traveling packet position.
- Reset clears all corresponding visual state.
- Tab switching and model/routing controls do not break the simulation.
- If manual approval is supported, it blocks progression until approval; if not, preserve existing demo logic and do not fake a working approval flow.

### CTA tests
- Final reactor is larger/more detailed than a single glowing dot with curved lines.
- Multiple route inputs visibly deliver packets and cause a meaningful convergence event.
- One distinct output leaves the reactor.
- CTA links and footer are unobstructed and work.

### Accessibility/performance tests
- Reduced-motion mode has a stable, visually coherent fallback.
- No GPU/context error spam, runaway render loops, unremoved listeners, console errors, or broken responsive layouts.
- Test navigating from header directly to any section: signals should be in the right position, not depend on watching every prior scroll animation.
- Test hard reload mid-page, scroll back upward, resize, and tab visibility change.

### Temporary developer diagnostics

During development, support a debug toggle such as `?debugSignal=1` showing named route anchors, joint endpoints, current route selection, current animation mode, and optional FPS measurements. The overlay must be disabled by default and never shipped as prominent public UI.

---

## 8. Delivery requirements

When complete:
1. **Implement the code directly** in the current project; do not provide only pseudocode.
2. Confirm which existing components were upgraded and what files were added/modified.
3. Describe how the hero's new 2.5D depth is produced and how its ports connect to the global route.
4. Explain how traveling packets, branch switching, stage-synchronized pulses, and CTA convergence are coordinated.
5. Summarize actual testing performed, the viewports checked, and remaining limitations; do not claim tests you didn't run.
6. Keep the project runnable and all original interaction functionality intact.

## Final creative bar

The upgrade should have the perceived quality of an art-directed, high-end AI infrastructure product with a **living optical network**. The central asset must be architecturally convincing, the signals must look like information traveling through a real system, the final convergence must feel earned, and every section must respond to the same shared logic.

**Do not stop after making the lines brighter or adding a few particles. Deliver the full four-priority transformation.**
