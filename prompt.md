# UNIVERSAL MOTION-ONLY REFERENCE EXTRACTION

## Reference-Agnostic Landing Page Motion System

### 1. Primary Objective

Analyze the supplied landing page template, website, source code, or visual reference and extract its **motion language, interaction physics, animation timing, scroll behavior, transition choreography, and responsiveness**.

Apply the extracted behaviors to the target landing page while preserving or creating a completely independent visual identity.

**This is NOT a redesign, reskin, clone, or derivative implementation of the reference.**

The reference is a source of behavioral inspiration, not a design blueprint.

The fundamental objective is to transfer the *quality, responsiveness, and physical characteristics* of the experience without transferring its appearance.

### 2. Reference and Target Definitions

**Reference Source**

The template or website provided for motion analysis.

It may consist of:

- A live website or URL.
- A downloaded HTML/CSS/JavaScript template.
- A React, Next.js, Vue, Svelte, or other framework project.
- A video demonstrating animations and interactions.
- Screenshots showing different interaction states.
- An existing project containing animation implementations.

**Target Project**

The landing page that will receive the extracted motion behaviors.

The target may already have its own branding, visual design, components, and content, or it may be developed independently as part of the assignment.

If a target project already exists, preserve its established design direction.

If a target project does not exist, establish an original visual identity independently of the reference before integrating motion behaviors.

**Important:** Never assume the target and reference must share the same framework, component hierarchy, design system, or animation libraries.

---

### 3. Absolute Visual Independence

Do not copy, trace, adapt, or reproduce the reference's:

- Page layouts, section compositions, or grid arrangements.
- Typography, font combinations, or text treatments.
- Color palettes, gradients, materials, or textures.
- Illustrations, photography, 3D models, or artwork.
- Background compositions or decorative graphics.
- Buttons, cards, navigation, or distinctive component styling.
- Hero compositions, section ordering, or visual storytelling.
- Copywriting, branding, iconography, or product presentation.
- CSS styling or component markup as a foundation for the target design.

Do not reconstruct the reference's interface and then change its colors, fonts, or imagery.

**Visual independence must be structural, not merely cosmetic.**

The target landing page should remain visually unrelated to the reference when both are viewed as static screenshots.

Animation implementation may be studied and re-created technically, but the resulting animated elements must belong naturally to the target's original design.

Do not introduce decorative elements, new cards, floating objects, or additional sections merely to imitate a reference animation.

---

### 4. Mandatory Reference Inspection

Before implementing anything, inspect the supplied reference to determine what animation and interaction behaviors actually exist.

Do not assume that every reference uses the same techniques.

#### A. Initial Page Load

Analyze:

- Loading sequences and preloader behavior.
- Initial element visibility.
- Headline and text entrances.
- Image, illustration, or media entrances.
- Staggered animation sequences.
- Delayed reveals.
- Element overlap and timing relationships.
- Transition from loading to the interactive page.

Determine which elements animate, their approximate sequence, and the perceived movement characteristics.

#### B. Scroll Behavior

Analyze:

- Native versus custom smooth scrolling.
- Scroll acceleration, deceleration, and interpolation.
- Scroll-triggered element entrances.
- Scroll-scrubbed transformations.
- Sticky or pinned sections.
- Parallax movement and relative element speeds.
- Horizontal scrolling, if present.
- Background transformations.
- Section-to-section continuity.
- Animation direction and reversibility.
- Scroll-trigger thresholds and completion conditions.

Pay particular attention to how animations connect the page together rather than treating every section as an isolated animation.

#### C. Hover and Pointer Interactions

Inspect:

- Hover elevation and translation.
- Scale or rotation responses.
- Pointer-following effects.
- Magnetic attraction.
- Cursor transformations.
- Animated borders or highlights.
- Image or content swapping.
- Neighboring-element reactions.
- Hover entrance and exit timing.
- Spring-like settling and overshoot.
- Pointer movement sensitivity.

Only extract behaviors demonstrated by the reference.

#### D. Interactive Components

Inspect any meaningful interactive systems, such as:

- Navigation menus.
- Tabs and segmented controls.
- Accordions and collapsible content.
- Modals and overlays.
- Carousels and galleries.
- Pricing selectors.
- Buttons and call-to-action interactions.
- Dragging or gesture-based interactions.
- Interactive illustrations or media.

Observe how states enter, exit, reverse, and respond to repeated input.

#### E. Advanced Motion Techniques

If present, inspect:

- WebGL, Three.js, or shader-driven animations.
- Canvas-based visuals.
- SVG path animation and morphing.
- Text splitting, masking, or scrambling.
- Clip-path and shape transitions.
- Motion driven by pointer velocity.
- Physics-based transitions.
- 3D camera or object movement.
- Interactive backgrounds.
- Scroll-controlled video or frame sequences.

Do not introduce these technologies solely because they are visually impressive.

Use them only when an observed behavior and the target design justify the complexity.

---

### 5. Motion Inventory and Behavioral Extraction

Create an internal motion inventory before implementation.

For each meaningful animation, identify:

| Property | What to extract |
|---|---|
| Trigger | Load, viewport entry, scroll, hover, click, drag, or state change |
| Target | What type of element is animated |
| Properties | Translation, scale, rotation, opacity, clipping, etc. |
| Duration | Approximate time to completion |
| Easing | Acceleration and deceleration characteristics |
| Stagger | Delay between participating elements |
| Progress | Time-based or interaction-driven |
| Reversibility | Whether the animation can reverse |
| Dependencies | Whether animations occur sequentially or simultaneously |
| Responsive behavior | How motion changes across devices |
| Perceived physics | Inertia, elasticity, damping, weight, or momentum |

Separate observed facts from estimates.

If the reference provides source code, inspect relevant implementation details to determine exact animation parameters where possible.

If only a video or interactive preview is available, infer approximate timing and easing from visible behavior.

Do not invent precise source measurements and present them as verified facts.

The goal is to understand the reference's **motion principles**, not necessarily reproduce its exact numerical parameters.

---

### 6. Motion Adaptation Rules

After extracting the reference's motion system, adapt the behaviors to the target project.

**Apply behavior based on functional equivalence, not visual similarity.**

For example:

- A reference card reveal may inform the entrance of an original product feature.
- A scroll-driven hero transformation may inform an entirely different hero composition.
- A magnetic button response may be adapted to the target's own call-to-action design.
- A staggered text animation may be applied to original headings without reproducing the reference's typography or line breaks.
- A reference image transition may inspire motion between the target's existing media elements.

Do not force a behavior onto an unrelated component.

If a reference animation requires recreating a recognizable visual composition, reinterpret the underlying motion principle or omit it.

Prioritize the target's usability, visual hierarchy, and original design over exact replication.

### 7. Adaptive Motion System

Develop reusable motion rules based on the behaviors actually observed.

The following are categories to evaluate, **not mandatory effects to implement**.

#### A. Entrance Choreography

Where applicable:

- Use staggered entrances for related elements.
- Coordinate primary and secondary content.
- Apply appropriate clipping, translation, opacity, or scaling.
- Preserve the reading order and natural visual hierarchy.
- Prevent unintended repeated entrances.

Calibrate timing and easing to the reference's observed rhythm.

#### B. Scroll-Driven Motion

Where applicable:

- Link animation progress smoothly to scroll progress.
- Use pinning or sticky positioning only when structurally appropriate.
- Coordinate section transitions without layout jumps.
- Preserve consistent motion across scroll directions.
- Prevent animation discontinuities during rapid scrolling.
- Simplify complex sequences for small viewports.

#### C. Hover Physics

Where applicable:

- Reproduce the perceived responsiveness of hover interactions.
- Calibrate pointer sensitivity and movement ranges.
- Preserve smooth transitions between active and resting states.
- Avoid excessive movement that harms usability.
- Support keyboard focus and touch-friendly alternatives.

#### D. Component State Transitions

Where applicable:

- Animate state changes without unnecessarily remounting content.
- Coordinate outgoing and incoming elements.
- Preserve layout stability.
- Allow interactions to reverse or interrupt gracefully.
- Prevent overlapping or conflicting timelines.

#### E. Navigation and Interaction Feedback

Where applicable:

- Coordinate navigation and scroll position.
- Provide appropriate feedback for clicks and taps.
- Animate menu opening and closing.
- Maintain accurate active states.
- Ensure navigation remains functional without animation.

#### F. Continuous and Ambient Motion

If the reference uses ambient motion:

- Identify its purpose and movement pattern.
- Adapt it to existing target assets.
- Avoid distracting from essential content.
- Pause or reduce unnecessary offscreen animation.
- Respect reduced-motion preferences.
- Avoid continuous rendering when the effect is not visible.

**Do not add animations simply to maximize animation density.**

---

### 8. Timing, Easing, and Physics

Build an internally consistent motion system informed by the reference.

Extract and calibrate:

- Fast interaction feedback.
- Standard component transitions.
- Major entrance sequences.
- Large-scale scroll choreography.
- Easing curves.
- Spring stiffness and damping.
- Pointer-response sensitivity.
- Stagger spacing.
- Momentum and inertial behavior.

Preserve meaningful differences between interaction types.

Not every animation should have the same duration or easing curve.

Use source-derived values when reliable; otherwise, tune values experimentally to achieve comparable perceptual behavior.

Establish reusable motion tokens instead of scattering unrelated animation values throughout the project.

---

### 9. Technical Implementation

Inspect the target project's existing technology stack before selecting an implementation approach.

**Do not assume Next.js, React, GSAP, Lenis, or any other library is mandatory.**

Prefer compatibility with the existing codebase.

Possible implementation tools include:

- CSS transitions and keyframes for simple animations.
- Web Animations API for native browser animation control.
- GSAP for complex animation timelines.
- ScrollTrigger for sophisticated scroll choreography.
- Lenis for custom smooth scrolling when justified.
- Motion or framework-specific animation libraries.
- IntersectionObserver for viewport-based reveals.
- RequestAnimationFrame for coordinated frame updates.
- Three.js or WebGL for genuinely necessary graphics behavior.

Use the smallest appropriate combination of technologies.

Avoid introducing multiple libraries that solve the same problem without a clear reason.

If Lenis and GSAP ScrollTrigger are used together, synchronize their updates correctly and refresh scroll measurements when the layout changes.

Preserve native touch scrolling unless a custom approach is clearly necessary.

#### Architecture

Separate motion logic from visual presentation.

Use reusable utilities, hooks, composables, or modules depending on the framework.

Possible responsibilities:

- Motion configuration and tokens.
- Reduced-motion detection.
- Scroll progress tracking.
- Viewport reveal management.
- Pointer-responsive interaction.
- Timeline orchestration.
- Component state transitions.
- Animation initialization and cleanup.

These are conceptual responsibilities, not a mandatory directory structure.

Do not copy the reference's code architecture unnecessarily.

---

### 10. Performance Requirements

All implemented motion must remain fluid and responsive.

Prioritize:

- Transform and opacity-based animations.
- Efficient scroll and pointer event handling.
- Minimal forced layout recalculation.
- Proper cleanup of listeners, observers, and animation instances.
- Avoidance of unnecessary React or framework state updates every frame.
- GPU-friendly rendering where appropriate.
- Reasonable memory and rendering budgets.
- Lazy initialization of expensive effects.
- Pausing invisible animations.
- Responsive behavior on lower-powered devices.

Avoid large animated blur surfaces, expensive filters, or unnecessary WebGL scenes solely to resemble the reference's visual effects.

Use animation libraries deliberately rather than by default.

---

### 11. Accessibility and Responsive Adaptation

All motion must support:

- `prefers-reduced-motion`.
- Keyboard navigation.
- Visible focus indicators.
- Touchscreen interactions.
- Responsive viewport sizes.
- Dynamic content and layout changes.
- Functional interaction without JavaScript-driven animation wherever reasonably possible.

Reduced-motion mode should remove or simplify nonessential movement without hiding required content or functionality.

Complex desktop animation sequences must not automatically be forced onto mobile devices.

Adjust or remove behaviors when they interfere with readability, scrolling, touch interactions, or performance.

Ensure interaction state is never communicated through motion alone.

---

### 12. Mandatory Implementation Workflow

#### Phase A — Reference Analysis

1. Inspect the available reference materials.
2. Identify actual animation and interaction behaviors.
3. Document timing, easing, triggers, and dependencies.
4. Distinguish verified measurements from estimates.
5. Identify techniques that can be transferred without reproducing visual design.

Do not begin implementing animations based on assumptions about the reference.

#### Phase B — Target Design Assessment

1. Inspect the target project's existing design and components.
2. Preserve its branding, layout, typography, colors, and artwork.
3. Determine which existing elements can naturally receive motion behavior.
4. Identify behaviors that require adaptation.
5. Reject effects that would compromise design independence or usability.

If the target is being built from scratch, finalize its independently developed design direction before motion integration.

#### Phase C — Motion Mapping

Map source behaviors to suitable target components.

For each mapped behavior, establish:

- Source interaction principle.
- Target element or interaction.
- Adapted trigger and animation behavior.
- Expected visual and functional result.
- Responsive and accessibility fallback.

Prioritize the most meaningful interactions rather than implementing every observable effect.

#### Phase D — Implementation

1. Establish reusable motion tokens and utilities.
2. Implement the primary motion sequences.
3. Integrate scroll behaviors.
4. Add relevant hover and pointer interactions.
5. Integrate component state transitions.
6. Synchronize dependent animation timelines.
7. Implement reduced-motion and mobile adaptations.
8. Remove redundant or conflicting animation code.

Keep all functional controls operational.

#### Phase E — Quality Assurance

Test the completed experience across:

- Desktop, tablet, and mobile.
- Mouse, touch, and keyboard input.
- Slow and rapid scrolling.
- Forward and reverse scrolling.
- Repeated user interactions.
- Browser resizing and content reflow.
- Direct navigation to page anchors.
- Reduced-motion preferences.
- Lower-performance devices where practical.

Check for layout shifts, stuck pinned sections, clipped content, scroll jumps, overlapping animations, and interaction delays.

#### Phase F — Visual Independence Verification

Compare representative static frames of the target and the reference.

The target should not reproduce the reference's recognizable visual structure.

Check for similarities in:

- Layout composition.
- Hero organization.
- Typography treatment.
- Decorative asset arrangement.
- Component shapes.
- Background composition.
- Section structure.
- Overall visual hierarchy.

If distinctive visual similarities remain, redesign the affected target components instead of concealing the resemblance with superficial styling changes.

Verify that the motion has been adapted to the target's own design rather than forcing the target to resemble the reference.

---

### 13. Expected Deliverables

Provide the following as part of the implementation:

**1. Motion Analysis Summary**

A concise overview of the behaviors actually observed in the reference, including any uncertainty caused by incomplete reference materials.

**2. Motion Mapping Summary**

Explain which extracted behaviors were applied to which target components and why.

**3. Implementation**

Deliver the functioning motion system integrated into the existing target project.

Avoid stopping at documentation, pseudocode, or a high-level plan when working source code can be implemented.

**4. Technical Notes**

Identify the animation tools used, important configuration decisions, and any significant performance considerations.

**5. Verification Summary**

Report what was tested, any limitations, and whether visual independence and responsive behavior were successfully maintained.

---

### 14. Acceptance Criteria

The final implementation must satisfy all of the following:

1. **Visual originality:** The target has an independent visual identity.
2. **Motion fidelity:** The reference's observable interaction characteristics have been thoughtfully transferred.
3. **Behavioral accuracy:** Animations reflect behaviors actually demonstrated by the reference.
4. **Contextual adaptation:** Motion is integrated into the target's original components.
5. **Functional integrity:** Navigation, buttons, controls, and interactive content work correctly.
6. **Performance:** Motion remains fluid without unnecessary rendering overhead.
7. **Responsiveness:** Animations adapt appropriately to device capabilities and viewport sizes.
8. **Accessibility:** Reduced-motion, keyboard, and touch experiences remain usable.
9. **Maintainability:** Motion logic is reusable, organized, and appropriate to the existing technology stack.
10. **No visual dependency:** The target does not rely on reference-derived layouts, artwork, or distinctive styling.

---

### 15. Final Execution Principles

**Analyze before implementing.**

Do not apply a generic animation preset to every reference.

**Extract behavior, not appearance.**

Study how elements move, respond, transition, and coordinate—not how they are visually designed.

**Adapt rather than reproduce.**

Translate interaction principles into the target's own component system.

**Preserve motion quality without forcing exact choreography.**

Match the reference's perceived fluidity, responsiveness, timing, and intentionality while allowing the target to remain structurally original.

**Never sacrifice performance, accessibility, or functionality for animation.**

The goal is a polished, coherent experience, not the largest possible collection of visual effects.

### Core Principle

**Transfer the physics, rhythm, responsiveness, and interaction intelligence of the reference—never its visual identity.**