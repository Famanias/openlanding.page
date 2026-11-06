# LENUS — Horizontal Experience & Persistent 3D Motion System

**MASTER IMPLEMENTATION PROMPT · Existing website enhancement · Do not redesign from scratch**

> **Instruction to coding agent:** Read this entire document, inspect the existing LENUS codebase and working 3D hero, then **implement** the complete experience in the project. Treat this as an engineering and creative direction specification, not a request for a static mockup, new image generation, a standalone concept demo, or a plan-only response. Make the changes, run the site, and test the result. Where existing framework or component names differ from examples here, adapt to the actual code rather than forcing a rewrite.

---

## 0. The assignment in one sentence

**Turn the existing LENUS hero into an entire cinematic horizontal-scroll creative-studio website in which its real, already-working 3D optical engine remains continuously visible and evolves across every chapter.**

The user already has a designed and functioning hero with a real interactive optical-engine model. **Reuse that exact model, its geometry, materials, lighting, renderer, and functional inspection controls.** Do not recreate it from screenshots or replace it with images, video, decorative SVG approximations, or a newly generated 3D object.

We are upgrading an existing page, not making an unrelated template.

### Definition of success

A visitor enters the familiar LENUS hero. Scrolling down smoothly transports them horizontally into the next cinematic chapter while the *same* 3D optical engine remains in view. The model changes position, camera framing, rotation, component separation, and lighting in a deliberate sequence. Its different configurations reinforce the copy and interaction of each chapter. After the final chapter, scrolling exits the horizontal experience into a genuine contact/footer section. Scrolling backward reconstructs the journey precisely. The whole site feels like **one continuous interactive exhibition**, not independent screens stitched together.

**Non-negotiable:** This must be visibly more sophisticated than fade-in reveals, generic parallax, or a normal carousel.

---

## 1. Existing visual authority — preserve it

Use the user's existing LENUS hero implementation as the source of truth for visual identity.

### Preserve

- The LENUS logotype and established navigation: **Work / Expertise / Technology / About / Get in Touch**.
- The hero's headline: **“REALITY IS JUST THE START.”**
- The supporting positioning: **“We build experiences that move brands beyond the expected.”**
- The **STEP INSIDE** CTA and any functional existing hero interactions.
- Existing optical-engine 3D model, chrome-like reflective materials, distinct exposed mechanical parts, interactive orbit / drag controls, exploded assembly and focus controls, model inspection UI, and real rendering quality.
- Near-black / charcoal / midnight ground, electric purple ambient light, acid-lime callouts and buttons, clean white typography, fine orbital / engineering linework, restrained technical microcopy.
- The wide, polished desktop composition and its overall recognizable personality.

### Working design tokens (match exact existing values when available)

```css
:root {
  --lenus-void: #090A10;
  --lenus-panel: #11131C;
  --lenus-ink: #F4F4F6;
  --lenus-muted: #A5A8B6;
  --lenus-lime: #C9FF00;
  --lenus-violet: #AD51EB;
  --lenus-line: rgba(225, 230, 255, .12);
}
```

These are directional fallbacks, not permission to overwrite a more refined existing palette. Use the existing fonts and type scale where available.

### Do not

- Do **not** replace the brand, change typography wholesale, or redesign the hero into a different layout.
- Do **not** make six independently designed full-screen screenshots with new copies of the model.
- Do **not** generate additional model art to substitute for the live WebGL scene.
- Do **not** create fabricated client logos, invented awards, false studio accomplishments, or fictional case studies represented as actual client work.
- Do **not** use a one-size-fits-all headline-left/model-right split in every chapter.
- Do **not** rely on fade-up cards and opacity transitions as the dominant motion language.

---

## 2. Core creative idea — ONE OBJECT, MULTIPLE STATES

The optical engine is not an accessory; it is the **main character and continuous spatial reference** for the entire site.

**Motion thesis: “From possibility to realization.”**

The optical engine changes function across the story:

1. **Reveal** — a complete, enigmatic object.
2. **Disrupt** — an emerging exploded configuration responds to the studio manifesto.
3. **Translate** — it becomes a portal / framing system for selected work.
4. **Deconstruct** — it exposes expertise as interconnected physical systems.
5. **Control** — it becomes the visitor's hands-on laboratory.
6. **Reflect** — it settles into a contemplative, atmospheric studio scene.
7. **Resolve** — it reassembles into a final energized object and invites contact.

The states must feel like different chapters of the **same physical object**, not seven separate assets.

### Primary motion principles

- **Spatial continuity:** a component exiting one composition stays physically coherent as the next chapter begins.
- **Scroll as direction:** the website moves laterally when the visitor scrolls vertically; the model responds to the same progress value.
- **Reversible choreography:** moving backward restores prior states without glitches, double-animations, or cumulative drift.
- **Intentional contrast:** alternate cinematic high-energy transformations with quieter editorial holds.
- **Real interactivity:** preserve and enhance actual dragging, sliders, component inspection, and navigational controls.
- **Depth over decoration:** camera moves, perspective changes, part separations, interface projection, and lighting changes carry the experience.

---

## 3. Page architecture — one continuous horizontal narrative

The horizontal scene should begin with the **existing hero as Chapter 00**, then proceed into six more chapters. A genuine footer follows outside the pinned experience.

```text
APP / PAGE
├── Persistent 3D Experience Root  ← mounts ONCE
│   ├── Existing Three.js canvas / renderer / camera / scene
│   ├── Existing optical engine model and meshes
│   ├── Scroll-driven model state controller
│   ├── Interaction arbitration (drag / inspect / slide)
│   └── WebGL context-loss and performance management
│
├── Shared background / technical atmosphere  ← one continuous system
│
├── Fixed navigation and chapter progress
│
├── Horizontal Story Stage   ← pinned while vertical scroll drives X
│   └── Horizontal Track
│       ├── 00 / Hero — Reality Is Just The Start
│       ├── 01 / Manifesto — Break The Expected
│       ├── 02 / Selected Work — Experiences Beyond Expected
│       ├── 03 / Expertise — What We Make Possible
│       ├── 04 / Technology — Inside The Engine
│       ├── 05 / Studio — Independent Minds
│       └── 06 / Contact — Let's Make What's Next
│
└── Native vertical footer / contact postscript  ← exits pin cleanly
```

### Important structural rule

**Only the DOM chapter track translates horizontally. The shared Three.js canvas must not be a child of that translated track.** Keep the WebGL scene mounted in a separate fixed/pinned visual layer with its own controlled state; its camera and object transform respond to global story progress. Otherwise the canvas will shift with the DOM *and* the model camera, causing doubled motion, clipping, input alignment errors, and stale positions.

If a common layout wrapper already owns the hero canvas, refactor ownership with minimum disruption. Do not create a second WebGL renderer to show the model in later chapters.

### Initial behavior

- On page load, show the current approved hero **immediately** (optionally with a short purposeful entrance animation).
- The user can freely interact with the model before scrolling.
- The **STEP INSIDE** button scrolls smoothly to the first narrative handoff / Manifesto chapter.
- Normal vertical scrolling enters the pinned horizontal track. The track begins to move left, revealing the next chapter from the right.
- After Chapter 06 finishes, the pinned track releases into the conventional vertically scrolling footer.
- Going up from the footer reverses the horizontal sequence.

### Panel widths and layout

Each desktop chapter is a minimum of `100vw` wide and fits within a usable `100dvh` stage, respecting safe areas below the header. The model may overlap multiple visual compositions as part of the choreography. Allow variable inner content widths inside a chapter but keep scrolling-distance calculations based on the track's *actual measured width*, not a hard-coded percentage.

---

## 4. Chapter-by-chapter storyboard

The following descriptions are **implementation requirements**, not illustrative mood notes. Build the transitions deliberately and connect their endpoints.

### CHAPTER 00 — HERO / “REALITY IS JUST THE START.”

**Visual:** Preserve the existing approved hero: huge white / lime / violet headline on the left, chrome optical engine on the right, dark technical background, original controls and chrome details.

**Entrance choreography:**

1. Header and system labels settle first using restrained masks / geometric translation.
2. Headline words resolve through perspective, staggered vertical masks, and slight skew; no generic uniform fade-up.
3. A localized illumination sweep reveals the reflective engine surfaces.
4. Orbiting fragments and the ring's idle movement settle into an intentionally composed pose.
5. The model remains interactive. Existing rotation and separation controls continue to work.

**On the first scroll:**

- Keep the hero briefly held while the engine advances toward the viewer by a restrained amount.
- The lines of “REALITY IS JUST THE START.” separate along staggered horizontal trajectories, clearing the center of the frame.
- The engine subtly rotates to reveal its interior. Housing components begin moving outward, but not yet to the full exploded state.
- Orbital guidelines and thin marks expand outward in perspective.
- The next chapter enters from the right as the hero slides away.

**Model target at chapter end:** slightly exploded (around 15–25% of the model's *existing* maximum separation), slightly larger, physically coherent. No jump in scale or camera orientation at the boundary.

### CHAPTER 01 — MANIFESTO / “WE DON'T FOLLOW REALITY.”

**Copy direction:**

> WE DON'T FOLLOW REALITY.\
> WE REDEFINE IT.

A supporting statement explains the studio's belief in taking unexpected creative ideas into working experiences. Keep it compact and credible.

**Composition:** monumental typography can cross the center or occupy alternating left/right bands. The actual engine remains visible behind and between typographic regions. Avoid permanently obstructing the object.

**Scroll choreography:**

- The engine's outer housing pieces begin to separate on individual, non-identical trajectories: some translate on their local normal, others rotate a few degrees.
- Typography interacts with empty spaces created by the opening object, revealed through masks that feel spatial rather than flat.
- One or two chrome fragments move slightly closer to the camera and cast / reflect environmental light.
- Purple atmospheric lighting intensifies in the newly exposed interior; lime is reserved for selective active details.
- On exit, pieces travel laterally with the chapter's motion, visually creating the frame lines that introduce Selected Work.

**Do not:** make components fly randomly or exceed plausible mechanical separation bounds. The deconstruction should read as art-directed engineering.

### CHAPTER 02 — SELECTED WORK / “EXPERIENCES BEYOND EXPECTED.”

**Content:** a curated portfolio-style exhibition. If the project has genuine work assets, use those. If not, present **clearly labeled conceptual studies** (e.g. Spatial Experiences, Living Identities, Interactive Worlds) built with code-driven compositions and existing media. Do not invent client engagements as facts.

**Composition:** a lateral succession of 3 strong project stages, not a generic three-card grid. Let one stage become dominant at a time; others are partially visible in depth. The engine remains visible throughout as a **visual portal / lens** that frames, refracts, or sits alongside the featured study.

**Interaction:**

- As the horizontal story crosses this chapter, featured studies translate at different depth speeds.
- Active work enlarges or opens in a masked window; neighboring studies compress and recede.
- The engine shifts to a secondary position (e.g. center-right / lower-right), stays live and legible, and changes its angle toward the active artwork.
- Hover / drag on the local work gallery provides an intentional interactive state. Navigation arrows work with mouse and keyboard.
- A short, fluid chapter-within-chapter progress indicator marks the active work item.
- Optional project detail panels can open without routing away; if a detail layer opens, the narrative progression must not override it.

**Avoid:** flattening the portfolio into screenshots of imagined websites; favor actual DOM compositions or existing project visuals.

### CHAPTER 03 — EXPERTISE / “WHAT WE MAKE POSSIBLE.”

**Capabilities:**

- Creative Direction
- Immersive Experiences
- Real-Time 3D
- Interactive Systems

**Composition:** the engine is now prominent again, enlarged and more exploded than before. Surround it with clean, technical labels and connective lines. Allow some annotations to appear left or right as their associated parts face the camera. Keep the existing model's actual part identifiers when available.

**Scroll choreography:**

1. Camera moves into a three-quarter inspection angle.
2. Housing / optics / mechanical components separate to their approved inspection offsets.
3. Four capability callouts dock around the components one at a time, linked by projected line connectors.
4. As each chapter phase activates, the related group moves a few pixels in depth and emits a restrained highlight.
5. A late transition removes the callout scaffolding and makes room for the Laboratory controls.

**Real implementation:** Project relevant world-space anchor points to screen-space to position DOM annotations accurately. Do not hand-place labels in CSS and hope they follow moving parts. If existing meshes lack useful semantic names, map stable aliases in one data structure rather than scattering magic indices throughout components.

**Interaction:** hovering or focusing a capability highlights its associated component group; selecting it reveals an accessible description. Support keyboard navigation.

### CHAPTER 04 — TECHNOLOGY / “INSIDE THE ENGINE.”

This is the site's most interactive chapter and should feel like a real creative tool, not a motion poster.

**Preserve and promote the existing working controls** from the hero: explode assembly, rotation/drag, component focus/selection, and any material or transform controls already implemented.

**Composition:** a full interactive optical laboratory. The model becomes the focus, with well-structured HUD panels that do **not** cover critical engine geometry. Information panels may dock near the sides and bottom; on mobile, they should collapse to a drawer.

**Experience:**

- The scroll transition moves the engine to a precise, inspection-friendly camera pose.
- Part separation ramps toward a useful exploded-view default; do not instantly set to full separation.
- Component hotspots and genuine controls activate.
- The visitor can rotate, inspect, alter separation, and select fragments.
- Sliders must affect the real model, not dummy numbers or a visual proxy.
- When exiting the chapter, changes blend back smoothly into the authored narrative timeline without snapping.

**Critical input priority:** while the user is dragging or actively operating a slider, the scroll timeline must not continuously overwrite their intentional model transforms. Define an interaction override model (see Section 7).

**Exit:** the technical UI components reduce / retract while model fragments drift into a more thoughtful, near-assembled configuration for Studio.

### CHAPTER 05 — STUDIO / “INDEPENDENT MINDS. SHARED POSSIBILITIES.”

**Composition:** an editorial pause after the technical intensity. Less HUD, more breathing room, monumental typography, subtle reflective engine silhouette, and optionally existing real studio imagery. No extra generated visual assets are required.

**Scroll choreography:**

- The optics gently reapproach one another (roughly 10–20% exploded).
- Camera draws back; model moves to an atmospheric but still recognizable position, never disappearing.
- A thin light sweep crosses an edge of the assembled housing.
- An oversized statement crosses the composition with a layered mask; as the next phrase enters, the previous words shift aside in perspective.
- Background geometry softens and the neon accents become less intense.

**Content:** short authentic-feeling studio positioning copy. Never present made-up employee counts, office locations, awards, or testimonials as facts.

### CHAPTER 06 — CONTACT / “LET'S MAKE WHAT'S NEXT.”

**Composition:** the model returns to a strong central or center-right hero pose. Huge typographic CTA, with a real **Get in Touch** interaction.

**Scroll choreography:**

1. Scattered housing parts converge along deliberate paths.
2. Components lock into an elegant complete assembly with subtle stagger and spring-like settling.
3. A lime illumination pulse travels along select component edges, then settles.
4. The camera eases outward; the complete engine remains in view as the closing statement appears.
5. A thin line / geometry motif from the engine visually leads into the footer divider.
6. The horizontal pin releases into the final footer without an abrupt background color or visual jump.

**CTA:** connect to existing contact behavior, `mailto:` link, or working existing form. If no backend exists, do not claim to have sent a message.

### FINAL NATIVE FOOTER — after horizontal exit

This section scrolls **vertically** again. Contain LENUS branding, Work / Expertise / Technology / About navigation, contact information only if provided by the project, social links only if real, and a Back to Beginning control. A minimal model presence can remain as a subtle fixed accent until the stage cleanly completes, but the footer must never be trapped behind a permanent pin.

---

## 5. Horizontal scrolling mechanics — required behavior

Use **native vertical wheel / touchpad / touch scrolling** to drive the **horizontal chapter track**. Do not hijack the wheel with `preventDefault()` just to simulate horizontal movement.

### Recommended engine

- **GSAP + ScrollTrigger** for pinning, scrubbing, timelines, and controlled transitions.
- **Lenis** only if useful or already in the project; if used, coordinate its ticker with GSAP. Avoid competing smooth scroll engines.
- **Three.js** using the project's existing scene and renderer.
- For component transitions between layouts, use GSAP Flip or equivalent only where actual DOM reparenting/measurement is necessary.

### Structural example (adapt identifiers to real project)

```html
<section class="lenus-horizontal-stage" aria-label="LENUS experience">
  <div class="lenus-scene-layer" aria-hidden="true">
    <!-- Existing Three.js canvas is owned here or via a portal; mount once -->
  </div>
  <div class="lenus-horizontal-viewport">
    <div class="lenus-horizontal-track">
      <section class="lenus-chapter" data-chapter="hero">...</section>
      <section class="lenus-chapter" data-chapter="manifesto">...</section>
      <section class="lenus-chapter" data-chapter="work">...</section>
      <section class="lenus-chapter" data-chapter="expertise">...</section>
      <section class="lenus-chapter" data-chapter="technology">...</section>
      <section class="lenus-chapter" data-chapter="studio">...</section>
      <section class="lenus-chapter" data-chapter="contact">...</section>
    </div>
  </div>
</section>
<footer class="lenus-footer">...</footer>
```

This is a reference structure; preserve semantic markup and existing React component boundaries.

### GSAP baseline (implementation sketch, not drop-in code)

```js
const track = document.querySelector('.lenus-horizontal-track');
const stage = document.querySelector('.lenus-horizontal-stage');

const getTravel = () => Math.max(0, track.scrollWidth - window.innerWidth);

const horizontalTween = gsap.to(track, {
  x: () => -getTravel(),
  ease: 'none',
  scrollTrigger: {
    trigger: stage,
    start: 'top top',
    end: () => `+=${Math.max(getTravel(), window.innerWidth * 2)}`,
    pin: true,
    scrub: 1,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      experienceState.scrollProgress = self.progress;
      // the existing single render loop consumes this value
    }
  }
});
```

**Do not simply paste this without auditing the existing DOM/React lifecycle.** For ResizeObserver, window resize, font loads, conditional UI, or breakpoint changes, call `ScrollTrigger.refresh()` after re-measurement. Kill ScrollTriggers, tweens, event listeners, and observers when the component unmounts. Do not create duplicate pinned stages on hot reload.

### Horizontal stage rules

- Do not hard-code `xPercent: -600` unless every panel is truly the same width and stays that way at every breakpoint. Prefer measured distance.
- Do not animate the track with conflicting CSS transitions.
- Do not forcibly snap the track at every chapter; prioritize smooth, continuous scrolling. Optional gentle snap only when it improves usability and never interferes with gallery dragging or inspecting the model.
- Do not nest fragile ScrollTrigger pins in the translated track. Use one reliable outer pin and drive intra-chapter sequences from normalized progress.
- Let `containerAnimation` be used for **DOM-only local triggers** when appropriate; keep the shared WebGL scene bound to global story progress.
- Preserve native browser back/forward and anchor navigation. Use stable chapter IDs and a controlled `scrollToChapter()` helper.
- Prevent accidental horizontal overflow outside the pinned stage.
- Don't let the nav or model inspection controls become obscured behind clipped or transformed ancestors.
- Once the horizontal story reaches its end, release the pin and restore ordinary vertical scrolling.

### Optional Lenis synchronization

If Lenis is used, disable its automatic RAF and drive it from **one** master ticker:

```js
const lenis = new Lenis({ autoRaf: false, smoothWheel: true });
const tick = (time) => lenis.raf(time * 1000);
gsap.ticker.add(tick);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.lagSmoothing(0);

// cleanup: gsap.ticker.remove(tick); lenis.destroy();
```

Use the versions already supported by the project and match their actual initialization APIs. Do not add Lenis solely for a dependency checklist; native scrolling with GSAP can still produce excellent results.

---

## 6. One persistent 3D scene — the most important architecture rule

### Do this before adding chapter animations

Audit the existing model viewer and identify:

- Canvas and renderer ownership.
- Camera and orbit/drag controller.
- Model root `THREE.Group` and major subassemblies.
- Existing exploded-assembly implementation and maximum separation values.
- Part selection / raycasting / highlight logic.
- Material references, environmental lighting, bloom, render target, animation loop.
- Current control HUD state and keyboard/pointer handlers.

Reuse this implementation in place. If the canvas must move to a shared component, **move its ownership**, not its data source, and mount it exactly once.

### Single scene-controller contract

Expose one controller/facade for the rest of the page:

```ts
interface EnginePose {
  rotation: { x: number; y: number; z: number };
  camera: { distance: number; lookAt: [number, number, number] };
  explode: number;        // normalized 0–1 using EXISTING separation logic
  lighting: { violet: number; lime: number; exposure: number };
  screenAnchor: { x: number; y: number }; // normalized viewport position
}

interface EngineExperienceController {
  setNarrativeProgress(progress: number): void;
  setManualRotationDelta(deltaX: number, deltaY: number): void;
  setManualExplosion(value: number): void;
  focusPart(partId: string | null): void;
  setInteractionMode(mode: 'narrative' | 'drag' | 'inspect' | 'slider'): void;
  releaseInteraction(): void;
  renderFrame(dt: number): void;
}
```

This describes responsibility, not a demand to refactor every existing component into a new API. Use the smallest clear integration surface supported by the codebase.

### Capture original transforms

At initialization, store immutable baseline transforms for every part that will move:

```ts
baseTransforms.set(mesh.uuid, {
  position: mesh.position.clone(),
  quaternion: mesh.quaternion.clone(),
  scale: mesh.scale.clone()
});
```

Every narrative frame computes **absolute targets relative to those original transforms**. Never repeatedly add offsets to the current positions; doing so causes cumulative drift and prevents exact reverse scrolling.

For physically plausible explosion, use existing subassembly separation vectors if available. Otherwise define curated vectors per semantic group and keep them consistent in parent/local coordinates.

### Normalized authored states

Create a chapter pose map like this, then tune against the real model:

| Chapter | Explosion | Camera / focus | Model emphasis |
|---|---:|---|---|
| Hero | 0.05–0.20 | Signature three-quarter | Large, iconic |
| Manifesto | 0.25–0.50 | Nearer, more dramatic | Opening / rupture |
| Selected Work | 0.20–0.35 | Offset, slightly smaller | Portal / framing |
| Expertise | 0.70–0.95 | Exploded technical study | Part groups / labels |
| Technology | 0.45–0.80 | Inspection-friendly | User-controlled |
| Studio | 0.08–0.20 | Further, calmer | Atmospheric sculpture |
| Contact | 0.00 | Beautiful complete form | Reassembly / resolution |

These are **normalized artistic targets**. They are not world-unit coordinates, and the object must not be forced into physically impossible poses merely to match them.

Interpolate between chapter poses using smooth, authored curves. Camera, model, lighting, and atmospheric systems must share the same normalized story timeline. Avoid abruptly setting a new model state when the active chapter index changes.

### RAF architecture

- Maintain one render loop for the existing renderer.
- Store only small normalized scroll / pointer / control values from input events.
- Compute eased targets and update model transforms in the render loop.
- Avoid expensive React state updates on every RAF tick; use refs or an external mutable controller for time-critical state.
- Avoid new geometry allocations and texture loads per frame.
- Pause or lower rendering cadence when the tab is hidden or the WebGL scene cannot be seen.

---

## 7. Interaction arbitration — scroll must not fight the user

This is a strict requirement. The user's current 3D viewer is interactive; it must **stay interactive**.

### Input priority

1. Open modal / focus trap / menu, if applicable.
2. Active model pointer drag, slider gesture, or component inspection.
3. Chapter-local gallery drag or click interaction.
4. Scroll-driven narrative pose.
5. Passive idle animation.

### Expected behavior

- **Idle:** model tracks the authored scroll pose, with restrained autonomous motion.
- **User begins rotating the object:** freeze or temporarily decouple the affected rotation channels from scroll; preserve the current narrative base pose.
- **While dragging:** apply user delta over the narrative pose; do not reapply a conflicting authored rotation each frame.
- **On release:** ease the manual delta back toward zero or retain it while inside the Technology inspector, per the existing viewer's UX.
- **When the visitor scrolls away from Technology:** blend back to the authored pose over a short spatial transition; never snap.
- **When an object part is selected:** keep its highlight and corresponding label coherent as the camera moves; deselect gracefully when the inspection UI closes.
- **While dragging a portfolio gallery:** do not also rotate the 3D object or shift the global scroll track in response to that same gesture.

### State formula

A useful pattern is:

```text
finalPose = interpolate(narrativePose(progress), manualOverride, interactionWeight)
```

Use channel-specific interpolation where appropriate (rotation may be user-owned while camera distance stays narrative-owned). Do not linearly interpolate Euler angles across wrap boundaries; prefer shortest-path angle handling or quaternions.

### Input testing

Prove that these sequences work:

- Drag the model in Hero, then scroll into Manifesto.
- Scrub scroll backward midway through a large explosion.
- Adjust the explosion slider in Technology, then scroll into Studio.
- Open a component detail, press Escape, then continue.
- Drag Selected Work without unintentionally dragging the optical engine.
- Operate everything with keyboard focus and touch where practical.

---

## 8. Shared background / visual continuity

Use **one persistent atmospheric system** behind the horizontal journey.

### Base language

- Deep midnight field, subtle technical radial linework, fine dark grid rather than a bright checked pattern.
- Very restrained purple environmental glow following the model's active energy state.
- Occasional lime glints at decision / activation moments.
- Tiny dust or particulate accents that drift at low speed, never distracting from typography.
- No hard background seams at panel boundaries.

### Progress-driven cues

- Hero: dark precision lab, soft violet halo.
- Manifesto: geometric lines fan outward; interior energy becomes more visible.
- Work: atmosphere darkens behind image stages for contrast.
- Expertise: thin connector and annotation guides become more pronounced.
- Technology: sharper technical grid and calibration markers.
- Studio: background softens, graphical density reduces.
- Contact: visual energy converges toward the engine and quiets.

Use CSS, SVG, and existing WebGL lights where possible. Avoid loading unique full-screen image backgrounds just to simulate every scene.

---

## 9. Motion detail — make this feel authored, not templated

### Kinetic typography

- Large headlines should enter and exit via masked line movement, perspective, carefully timed character/group shifts, or spatial reflow.
- Use different type behavior according to meaning: split / fracture for Manifesto; structured labels for Expertise; calibration typography for Technology; calm broad word spacing for Studio; convergence for Contact.
- Avoid the same `opacity: 0 → 1, y: 40px → 0` on every section.
- Ensure every animation can play in reverse as scrolling reverses.

### 3D object motion

- Use camera moves, stage anchoring, part transforms, controlled parallax, and lighting response.
- Give major model transformations temporal weight; use easing curves and short settling motion, not chaotic random spins.
- Maintain readable silhouettes and consistent physical scale.

### Chapter transitions

- Don't flash to black between chapters.
- Don't immediately hide previous content before the new scene has visually taken over.
- Carry at least one visual feature across each boundary (the optical engine itself is the primary bridge).
- Keep one or two quiet beats with minimal visual activity to prevent motion fatigue.

### Microinteractions

- Nav indicator glides or stretches to hovered item.
- Get in Touch pill can have restrained magnetic motion on fine pointers.
- Custom cursor may change to **DRAG**, **INSPECT**, or **VIEW**, but native cursor / accessible equivalents must remain for touch and reduced motion.
- Relevant controls react immediately and meaningfully; they should not be decorative toggles.

---

## 10. Navigation, progress, and user control

### Header

Preserve the current LENUS identity and navigation. Links should scroll to the corresponding chapter, even though the chapters occupy a pinned horizontal track. Update active-nav styling based on the dominant chapter, not raw vertical DOM intersections.

### Chapter index

Provide a subtle indicator such as:

```text
01 / 07  —  MANIFESTO
[●—●—●—●—●—●—●]
```

It should reflect actual story progress and, if clickable, take visitors to chapter boundaries reliably.

### Skip / jump behavior

- The user can jump directly to Work, Expertise, Technology, About, or Contact.
- The model smoothly catches up to the target narrative pose; it shouldn't teleport or glitch.
- A **Skip Experience** or alternative navigation route is appropriate for accessibility and impatient visitors.
- The **STEP INSIDE** CTA advances into the first chapter, while Back to Top restores the Hero.
- Scrolling normally from the end reaches the footer; no trapped scroll regions.

---

## 11. Desktop, tablet, mobile, and reduced motion

### Desktop ≥ 1024px

Use the full cinematic pinned horizontal experience. The optical engine persists in a fixed visual layer and varies size/position across chapters. Keep interface and copy readable at 1366×768, 1440×900, and 1920×1080.

### Tablet 768–1023px

Retain horizontal storytelling if stable, but shorten distances and reduce dense annotation overlays. Give model and text separate safe zones. Controls should be touch-sized and repositionable.

### Mobile ≤ 767px

**Do not force the desktop horizontal choreography into a narrow viewport if it creates unreadable text or difficult scrolling.** A tailored experience is preferable:

- Either a compact horizontal-snap narrative with deliberate gestures and a smaller anchored model, or
- A vertically stacked editorial version with the optical engine remaining visible as a persistent/sticky smaller visual across chapter transitions.

Use the same model and same chapter identity; simplify detailed exploded interactions. Touch controls must not block native page scrolling. Provide an obvious way to access each chapter and the real contact CTA.

### Reduced motion

For `prefers-reduced-motion: reduce`:

- Remove prolonged pinned scrolling and smooth forced motion.
- Render a readable vertically navigable document.
- Keep the optical engine in a stable static pose or a very restrained manual-interaction state.
- Show all content without animation being required to access it.
- Disable background particle drift and nonessential continuous motion.

### WebGL fallback

If WebGL is unavailable or the context is lost, show a graceful static fallback using an existing approved frame / poster of the model **only in that fallback**. Do not replace the default interactive renderer.

---

## 12. Performance requirements

Aim for smooth high-end desktop operation without monopolizing CPU/GPU.

- Do not instantiate more than **one** renderer, WebGL context, camera owner, or optical engine scene for the narrative.
- Reuse GPU resources and materials; dispose only when genuinely unmounting.
- Cap device pixel ratio appropriately for mobile / high-density screens.
- Avoid heavy real-time shadows or extra postprocessing passes unless their benefit is visible.
- Animate transforms and shader uniforms; avoid layout-triggering writes in high-frequency loops.
- Cache measurements and use `ResizeObserver` for structural changes.
- Avoid frequent `getBoundingClientRect()` calls in the render loop; measure when layout changes, project 3D anchors from the camera in the same render tick.
- Lazy-load nonessential portfolio imagery and editor-like details.
- Suspend expensive animation when the tab is hidden.
- Use one scroll/GSAP/render synchronization strategy; no multiple competing tickers.
- Keep text readable at every intended animation point; avoid clipping, z-fighting, or accidental overlay occlusion.
- Respect `prefers-reduced-motion` and low-power devices.

**Do not fake good performance by replacing all interactive content with static imagery.** Optimize the real experience.

---

## 13. Project code organization (adapt to actual framework)

Start by inspecting the existing project. **Keep its framework and file organization unless there is a concrete technical reason to change them.** Do not migrate frameworks as part of the animation upgrade.

Suggested responsibility-based structure:

```text
src/
  components/
    LenusHeader.*
    HorizontalStory.*
    StoryChapter.*
    ChapterProgress.*
    OpticalEngineCanvas.*   // reuse current actual scene/viewer
    EngineInspector.*       // reuse existing working controls
    WorkGallery.*
    ContactSection.*
  motion/
    createStoryTimeline.*
    chapterPoseMap.*
    scrollProgress.*
    interactionArbiter.*
  graphics/
    engineController.*
    projectedAnnotations.*
    sharedAtmosphere.*
  styles/
    lenus-story.*
```

These are suggested boundaries, **not instructions to delete or rename existing components**. Extend what already works.

### Existing project conventions

- Preserve any required client-component directives. If this project uses `src/App.tsx` and files inside `src/components/` under the established project convention, place `'use client';` at the first line of the applicable files. In Next.js, apply client boundaries appropriately and avoid importing browser-only code from server components.
- Place **new** static images, SVGs, model files, textures, and other visual assets under `public/assets/`, referenced as `/assets/<filename>` (or a relative subfolder path under that root). Do not relocate already-working assets unnecessarily unless required by the existing project.
- Do not hard-code credentials, invent external API integrations, or add network dependencies just to make animations look functional.

---

## 14. Implementation sequence — complete all phases

### Phase A — Audit and protect the existing experience

1. Run the current website and capture the existing hero's appearance and controls.
2. Locate the real model, renderer, meshes, current explode logic, pointer handlers, UI controls, and existing state ownership.
3. Make a brief inventory of what is already working.
4. Identify possible scroll / render ownership conflicts before changing anything.

**Exit condition:** Existing hero still renders and all current manual interactions still work.

### Phase B — Build the shared narrative infrastructure

1. Establish a persistent canvas outside the translated track.
2. Build the horizontal chapters with placeholder live DOM content.
3. Connect vertical scroll to track X translation with a single scrubbed pinned timeline.
4. Verify correct exit into footer, back-scroll, anchor links, refresh, and resize.
5. Establish a single chapter-progress value and model controller interface.

**Exit condition:** No duplicate 3D renderer; moving across every chapter and back works.

### Phase C — Choreograph the optical engine

1. Capture original model transforms.
2. Define chapter state targets based on the real subassemblies.
3. Implement continuous camera, separation, lighting, and screen-anchor interpolation.
4. Verify forward and reverse movement, including rapid scroll changes.
5. Protect manual interactions with the arbitration system.

**Exit condition:** The model remains genuinely present and physically coherent in every chapter, with no snapping or drift.

### Phase D — Complete the authored chapters

1. Implement Manifesto kinetic composition and model fracture.
2. Implement Selected Work exhibition (real assets or clearly marked concept studies).
3. Implement Expertise projections and interactive callouts.
4. Integrate the original optical engine inspector into Technology.
5. Implement Studio editorial pause.
6. Implement final reassembly and Contact transition.
7. Integrate the shared background and footer resolution.

**Exit condition:** Each chapter has a distinct visual purpose and at least one meaningful, non-generic motion sequence.

### Phase E — Refine, optimize, and validate

1. Adjust pacing at real viewport sizes.
2. Tune camera poses, explosion bounds, line-of-sight, text clearance, and readability.
3. Test interactions and focus behavior.
4. Implement mobile and reduced-motion alternatives.
5. Run build/type checks and browser tests; fix errors.
6. Remove unused placeholder assets, legacy dummy handlers, and duplicate loops.

**Exit condition:** Finished, functioning website—not a prototype or motion-demo stub.

---

## 15. Acceptance tests — must pass before delivery

### Critical functional tests

- [ ] Current hero branding, design, model, and controls remain intact.
- [ ] The **same live Three.js optical engine** persists across all seven chapters.
- [ ] There is only one active renderer/canvas owner for the experience.
- [ ] Vertical wheel/touchpad scrolling drives a smooth, pinned horizontal movement.
- [ ] The model changes camera, separation, lighting, and placement continuously in sync with chapter progress.
- [ ] Reverse scrolling restores earlier states exactly, with no cumulative transform drift.
- [ ] Scroll handoffs across chapter boundaries show no jumps.
- [ ] Hero **STEP INSIDE** navigates into the experience.
- [ ] Work gallery controls function and do not conflict with global scrolling or model dragging.
- [ ] Expertise part labels stay attached to moving 3D elements.
- [ ] Technology model controls function and do not fight the scroll timeline.
- [ ] Contact CTA has a real existing destination or clearly identified frontend-only behavior.
- [ ] The horizontal story releases into a real, normally scrolling footer.
- [ ] Header links and chapter progress navigation go to the correct locations.
- [ ] The experience is readable and usable on desktop, tablet, and mobile.
- [ ] Keyboard navigation, focus visibility, escape dismissal, and reduced motion work.
- [ ] No clipping, frozen canvas, duplicate scene, memory leak, horizontal document overflow, or scroll lock occurs.
- [ ] No missing assets or console errors. Build passes.

### Specific regression tests

1. Load Hero → drag engine → release → scroll halfway into Manifesto → reverse into Hero.
2. Scrub quickly from Work to Technology → reverse → verify model remains consistent.
3. Open part inspection in Technology → adjust explosion → scroll away → ensure smooth narrative recovery.
4. Drag Work gallery while model is visible → verify correct input ownership.
5. Resize the viewport while inside the horizontal pin → verify layout and model alignment recover.
6. Jump directly to About or Contact from header → verify progress/model state is correct.
7. Continue scrolling beyond Contact → verify the ordinary footer is reachable.
8. Activate reduced motion → verify all content remains accessible without animation.
9. Test touch scrolling and interactive regions on a phone viewport.

### Screenshots / proof

Capture at least:

- Hero initial state.
- Midway through hero → manifesto transition.
- Manifesto exploded object.
- Selected Work active study.
- Expertise annotations connected to components.
- Technology inspector active.
- Studio quieter composition.
- Final fully reassembled CTA.
- Footer after unpin.
- Mobile page and reduced-motion view.

If browser automation is unavailable, test manually as far as possible and report the unverified items plainly.

---

## 16. Delivery contract

**Actually implement this in the existing project. Do not stop after presenting a plan.**

At completion, provide:

1. A short summary of what changed.
2. The key files edited or created.
3. A description of the shared scroll/3D state architecture.
4. Any real limitations and unfinished items.
5. How to run and test the result.

Do not claim that screenshots, browser tests, FPS measurements, or interactions passed unless they were genuinely checked.

### Final quality bar

If the output looks like an ordinary sequence of static sections with a moving image, **the task is not done**. If it looks like seven separate 3D viewers showing the same model, **the task is not done**. If it replaces the existing functioning 3D model with pre-rendered frames, **the task is not done**.

The target is **a coherent, original, technically polished horizontal digital exhibition in which LENUS's actual optical engine stays alive from the first headline to the final reassembly.**
