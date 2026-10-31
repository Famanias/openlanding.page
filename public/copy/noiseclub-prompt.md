# NOISE CLUB® — Complete Creative & Technical Implementation Brief

**Project:** NOISE CLUB / NC—001  
**Campaign:** *The World Is Your Sample Pack*  
**Featured real product:** Teenage Engineering PO-33 K.O! micro-sampler  
**Output:** An original, responsive, cinematic, interaction-rich landing page  
**Reference restriction:** LUMEN may be consulted **only for motion behavior**—never for visual design, composition, styling, copy, or identifiable UI patterns.  
**Document status:** Agent-ready implementation directive / design source of truth

---

## 0. Read This First — Non-Negotiable Instructions

You are the design and engineering agent responsible for creating NOISE CLUB, a fictional independent sound-culture collective and concept store presenting the **real Teenage Engineering PO-33 K.O!**. Build a production-quality, distinctive landing page, not a generic template or reskinned reference.

**The project must be visually independent of LUMEN.** Use LUMEN only to understand motion parameters and interaction principles: easing, velocity, staggering, scroll scrubbing, entrance sequencing, pointer response, and transition quality. **Do not copy any recognizable design characteristics.**

Your task is to:

1. Establish and document the original NOISE CLUB design system.
2. Plan desktop and mobile artboards for all seven narrative chapters.
3. Produce or integrate the necessary original/appropriately licensed assets.
4. Build the landing page using Next.js, React, responsive CSS, GSAP/ScrollTrigger, Lenis where suitable, and Web Audio where relevant.
5. Implement meaningful interactions, not decorative mock controls.
6. Validate accessibility, performance, responsiveness, product accuracy, and visual originality.

**Execution priority:** visual identity → static composition → asset accuracy → motion integration → audio interactions → responsive/accessibility QA. Avoid letting the reference dictate layout decisions. Do not stall on optional assets: if a trustworthy 3D model is unavailable, use accurate 2D product photography; if original recordings are not yet available, implement a clear and easily replaceable audio sample interface rather than faking product capabilities or silently inserting copyrighted audio.

### Absolute exclusions

Do **not** use or adapt any of LUMEN's:

- Page grids, hero layout, component compositions, section choreography **as a spatial arrangement**, or section order.
- Fonts, color palette, pastel atmospheres, material settings, shadows, borders, glassmorphism, or glass sculptures.
- Floating workflow panels, orbital rings, document stacks, preview sheets, UI illustrations, app mockups, or card treatment.
- Header/nav appearance, icons or decorative motifs, copywriting, branding, or visual hierarchy.
- JSX/CSS component structures as visual building blocks; do not rename or recolor them and call them new.

**Allowed extraction:** motion physics and behavioral patterns, reimplemented in original NOISE CLUB components. Similar interaction *quality* is desirable; recognizable similarity in *appearance* is unacceptable.

**Independence test:** disable animation and compare screenshots against LUMEN. No static composition should resemble the reference. If a comparison reveals an obvious visual analogue, redesign the NOISE CLUB component.

---

## 1. Project Thesis

**Brand:** NOISE CLUB®  
**Category:** Fictional independent music-culture collective / editorial concept store  
**Relationship to product:** Independent fictional creative campaign *featuring* the PO-33 by Teenage Engineering; not an official brand, partnership, manufacturer, or collaboration.

### Big idea

> **Ordinary noises are unfinished music.**

The landing page invites visitors to hear music in normal life: a train door, coffee cup, footsteps, rain on metal, a dropped coin. A real portable sampler becomes the instrument through which found sounds can turn into beats.

### Primary campaign line

> **THE WORLD IS YOUR SAMPLE PACK.**

### Supporting campaign language

- **MAKE NOISE. MAKE MUSIC.**
- **NOTHING IS JUST NOISE.**
- **STEAL A MOMENT. BUILD A BEAT.**
- **SMALL MACHINE. BIG IDEAS.**
- **EVERYTHING HAS A RHYTHM. YOU JUST HAVE TO FIND IT.**
- **YOUR NEXT BEAT IS OUT THERE.**

Write additional microcopy sparingly and in the same spirit: concise, energetic, punchy, resourceful; avoid corporate AI/SaaS language and excessive sales jargon.

### Product truth / attribution

The featured product is the **Teenage Engineering PO-33 K.O!**, a real portable micro-sampler. Relevant actual capabilities to represent accurately include a built-in microphone, line input, approximately 40 seconds of sample memory, eight melodic sample slots, eight drum slots, 16 effects, and a 16-step sequencer. Verify any specifications, product imagery and details against the current official manufacturer documentation before publishing. Do not invent specifications, misleading endorsements, prices, availability, or hardware functions.

**Official destination:** https://teenage.engineering/store/po-33

Suggested visible attribution:  
*“An independent fictional creative concept featuring the PO-33 K.O! by Teenage Engineering. Not affiliated with or endorsed by Teenage Engineering.”*

This disclaimer should remain legible in the footer or final purchase section. Trademark and product photography rights must be respected. Never frame NOISE CLUB as the manufacturer or an authorized reseller unless that is actually true.

---

## 2. Brand Identity

### Positioning

An underground recording collective that treats the whole city as a music studio. NOISE CLUB is about discovery and participation, not a formal electronics catalog.

### Personality

| Dimension | Target |
|---|---|
| Temperament | Rebellious, inventive, playful, resourceful |
| Cultural roots | Field recording, beatmaking, zines, experimental art, underground music |
| Brand voice | Short, provocative, confident; never pretentious |
| Audience | Curious beginners, makers, beatmakers, design lovers, portable-music fans |
| Message | Everyday sound is creative material |
| Visual character | Raw editorial print design meets precise industrial/signal graphics |

### Original wordmark concept

- Primary name: **NOISE CLUB** (uppercase).
- Supporting inventory IDs: `NC—001`, `FIELD NOTE / 033`, `SOUND CULTURE DEPARTMENT`, `REC 00:04`.
- Create a **new** typographic wordmark and distinct signal/recording symbol if warranted. It should feel cut, printed, encoded, or stamped—not soft, glassy, glossy, or futuristic.
- Sample brand signature: `NC—001 / SOUND CULTURE`.

### Palette

| Token | Hex | Role |
|---|---|---|
| Ink Black | `#111313` | Main continuous page background, dominant surface |
| Paper Bone | `#F1EEE5` | Main typography, light editorial moments |
| Signal Acid | `#CBFF49` | Main highlight, UI focus, sound/playback states |
| Record Red | `#FF6748` | Selective recording/warning accent, not an all-purpose CTA color |

Preserve strong contrast. Ink Black must be the continuous visual foundation. Avoid needless extra hues, neon gradients, pastel atmospheres, translucent glass panels, and unrelated color changes by section.

### Typography direction

| Role | Suggested typeface | Treatment |
|---|---|---|
| Display | Anton | Massive, condensed uppercase; tight tracking; bold editorial cropping |
| Body / interface | Public Sans | Restrained and very legible |
| Metadata | IBM Plex Mono | Sample IDs, timing, recording labels, sequence numbers |

Fonts are direction rather than an excuse to emulate a known design. Use font loading and sensible fallbacks; ensure display text remains legible on narrow devices.

### Visual motifs

- **Signal stamps:** custom inventory IDs and recording state labels.
- **Audio fingerprints:** waveform silhouettes generated from real sample amplitude data where practical.
- **Sound specimens:** tactile photography of everyday sound sources with compact archival annotations.
- **Sequencing marks:** time divisions, moving playheads, rhythmic repetitions linked to real interaction.
- **Physical print treatments:** subtle halftone, photocopy, misregistration, scuffed paper and hard-edged ink masks used sparingly.

These motifs must appear as parts of a coherent editorial language, **not** as repeated floating cards. Create an original silhouette grammar, typographic composition, navigation, and photography placement.

### Art direction

Aim for **Underground Sound Archive**:

- An independent experimental-music zine brought to life in the browser.
- Dramatic hard-side-lit product photography, authentic material detail, dark concrete/metal/paper surfaces.
- Environmental macro photography depicting objects that could genuinely be sampled.
- High-contrast, tactile, grounded, imperfect-but-controlled visual styling.
- Precise timing and crisp interaction beneath the raw surface character.

Avoid generic glowing cyberpunk tunnels, arbitrary particles, random sine waves, fake machine dashboards, excessive glitch filters, or fake 3D objects unrelated to music or the real product.

---

## 3. Experience Principles

1. **Make the physical object matter.** The actual PO-33 must be recognizable and technically accurate.
2. **Motion expresses sound editing.** Capture → isolate → repeat → transform → release.
3. **Every scene has a narrative purpose.** No motion exclusively to show off an animation library.
4. **One continuous publication.** The page should feel like exploring a single long experimental music zine, not seven unrelated backgrounds.
5. **Silent by default.** Never autoplay audible sound or automatically request microphone access.
6. **Interactions are real.** Tabs, effects, buttons, playback, and sequence edits must affect actual state.
7. **Desktop can be cinematic; mobile must remain usable.** Maintain story coherence with reduced complexity.
8. **Accessible without motion.** Information and actions remain available with reduced motion, keyboard input, touch, and without audio.

---

## 4. Single Continuous Background Architecture

Avoid independent full-bleed background layers for each chapter. The page should have one unbroken Ink Black (`#111313`) foundation with an optional restrained, page-level texture treatment.

**Implementation:**

- Own background and texture at the root page/layout level.
- Render chapters transparent over the root surface unless an intentionally localized physical image or typographic ink block occupies an area.
- Use individual masks, editorial shapes, typography, and photographs for transitions rather than resetting the entire background.
- Allow graphics such as waveform paths and inventory lines to conceptually continue across chapter boundaries when useful.
- Do not create section separators through hard background swaps, horizontal seams, giant rounded sheets, or repeated color gradient bands.
- Do not let the background become an expensive full-screen blur effect.
- If a `fixed` background texture is used, ensure it behaves correctly on mobile and cannot introduce repaint jank.

**Target effect:** a single enormous illustrated sound-publication that can be scrolled seamlessly, not several visually separate websites stacked together.

---

## 5. Landing Page Information Architecture — Seven Chapters

Use these **original** chapters in order. Do not add generic logo-cloud, testimonial, pricing-table, SaaS-feature-grid, or product-dashboard sections. Each chapter should have its own strong original static composition before animation is added.

### 00 / THE SIGNAL — Opening Campaign Poster

**Purpose:** Hook the visitor and introduce the product.

**Primary hero copy:** `THE WORLD IS YOUR SAMPLE PACK.`

- Oversized typographic poster composition dominating the upper viewport.
- Large, accurate photographic PO-33 physically intersects or anchors the lower typographic composition.
- Compact `NOISE CLUB / NC—001` identity and editorial metadata.
- Original sound fingerprint used as a graphic narrative cue.
- **Primary CTA:** `EXPLORE THE NOISE` → smooth-scroll into the story.
- Optional clear secondary action: `VIEW THE PO-33` → official product page or final product section.
- No floating software panels, rounded glass widgets, UI mockups, or LUMEN-like hero layout.

**Behavioral design intent:** appears like a music poster that becomes an interactive scene.

### 01 / HEAR EVERYTHING — Found Sounds

**Purpose:** Demonstrate that any ordinary sound can become raw material.

- Feature dramatic editorial photos of real sound sources (e.g., metal, footsteps, rain, cup, door).
- Each selected specimen has a distinct recording label and representative waveform.
- Hover or focus should preview selection visually; **click/tap/keyboard** activates the selection.
- Play a short authentic sample only when user-initiated.
- Make one sound visually transition into the next chapter's sample input.

**Copy theme:** `NOTHING IS JUST NOISE.`

### 02 / CAPTURE IT — Recording Story

**Purpose:** Explain microphone-based sampling.

- Use a truthful close-up of the PO-33's microphone area.
- Animate a selected environmental waveform being captured into a more compact recorded-sample visualization.
- Feature compact, verified information about built-in microphone, line input, and sample memory.
- Provide `HEAR THE SOURCE` and a replay control for the visual narrative.
- A browser microphone option is strictly optional; if included, it must require an explicit user action, explain permission and processing, avoid upload by default, and offer a non-microphone alternative.

**Copy theme:** `STEAL A MOMENT. BUILD A BEAT.`

### 03 / CHOP IT UP — Sample Slicing

**Purpose:** Show one sound becoming multiple rhythmic components.

- Visualize a single large waveform like a strip of magnetic recording tape.
- Introduce edit markers, slicing, and rearrangement of fragments.
- Explain melodic and drum sample slots accurately.
- Let visitors choose fragments and, when audio is enabled, audition them.
- The fragment arrangement progresses into the next chapter's original rhythm interface.

**Critical:** do not recreate LUMEN's floating panel stacks or the physical PO-33 keypad as a UI clone.

### 04 / BUILD A BEAT — Signature Interactive Section

**Purpose:** The site's centerpiece: visitors make a simple beat.

- Design a **custom 16-step browser sequencer**, original in appearance, distinct from the PO-33's hardware screen/key layout.
- Use a desktop horizontal rhythm timeline; mobile may have a two-row pattern layout.
- Allow step toggling, source/sample selection, play/pause or stop, and clear/reset.
- Show playhead movement aligned with real playback tempo.
- Preserve the current step pattern when switching sounds unless explicitly reset.
- Provide an accessible keyboard and touch experience, including visible on/off states and labels such as `Step 01, active`.
- Use original/cleared sample audio or fully licensed sources; don't silently copy manufacturer demos or protected music.
- Label this as a **simplified interactive demonstration**, not an emulation of the product firmware.

**Suggested UI label:** `NC / RHYTHM LAB`.

**Playback design:** Web Audio API, short scheduling lookahead based on `AudioContext.currentTime`, sensible audio resume on user interaction, clean stop, and state synchronization.

### 05 / BREAK THE RULES — Effects Playground

**Purpose:** Show sonic transformations in a tactile, understandable way.

- Create a large original waveform interaction, not a real PO-33 hardware display copy.
- Expose three user-selectable demonstrations: **Stutter**, **Reverse**, **Octave**.
- Apply real audible processing or prepared *clearly indicated* effect-variant audio when the user has enabled playback.
- Make visual responses meaningfully correspond to the selected effect (repeat blocks / reverse direction / changed spacing or frequency representation).
- Acknowledge the real product's broader effects capability only when verified.
- Ensure button states are mutually coherent and accessible.

**Copy theme:** `BREAK THE RULES.`

### 06 / TAKE THE NOISE — Final Product Moment

**Purpose:** Resolve the narrative and introduce the real product purchase destination.

- Return to an accurate, sharply lit PO-33 product image on the same page-level dark foundation.
- Reduce on-screen complexity compared with the middle chapters.
- Show a concise, verified feature summary.
- **Headline:** `YOUR NEXT BEAT IS OUT THERE.`
- **Primary CTA:** `DISCOVER THE PO-33` → https://teenage.engineering/store/po-33
- Display honest Teenage Engineering attribution and independent-concept disclaimer.
- No fake checkout and no invented stock/discount information.

---

## 6. Detailed Motion Storyboard

### Shared motion grammar

- **Capture:** directional movement toward a defined target.
- **Isolate:** supporting material recedes in contrast, not necessarily opacity-to-zero.
- **Repeat:** rhythmic but measured sequencing.
- **Transform:** sample geometry changes with meaningful continuity.
- **Release:** fast event followed by smooth deceleration.

Use transforms and opacity by default. Avoid animation-driven reflow. For effects requiring masking, test `clip-path` cost on representative devices.

### Scene 00A — Automatic Intro (plays once, approximately 1.8 seconds)

| Time from start | Beat |
|---|---|
| `0.00s` | Ink-black page and usable content foundation appear immediately; no fake loading gate. |
| `0.12s` | Brand signature and archival metadata enter with subtle horizontal shift. |
| `0.25s` | First display words rise from a clipped mask. |
| `0.40s+` | Additional words enter in reading order with 45–65ms stagger. |
| `0.62s` | Original sound fingerprint draws into view. |
| `0.78s` | Accurate product photography appears through a controlled, irregular editorial mask. |
| `1.05s` | Product transform settles with gentle deceleration. |
| `1.25s` | Supporting copy and CTA reveal. |
| `1.55–1.80s` | Opening composition fully settles into interactive state. |

Do not block user input during the animation. Skip/shorten automatically if reduced motion is preferred. Never autoplay audible music.

### Scene 00B — Hero Scroll Departure (scrubbed; roughly first 85vh desktop scroll)

| Normalized progress | State |
|---|---|
| `0–20%` | Headline holds visual dominance; metadata and signal marks begin subtle drift. |
| `20–45%` | Typography opens spatially; product moves to foreground emphasis. |
| `45–70%` | Product becomes focal; source waveform expands through composition. |
| `70–90%` | Next chapter's photographic material enters; hero recedes without hard cut. |
| `90–100%` | Opening gracefully releases into Chapter 01; no visible background seam. |

Pin/stick only where appropriate for the original composition. Avoid scroll-jacking. Compensate for header, viewport height, short displays, and anchor navigation.

### Scene 01 — Hear Everything (about 100–120vh storytelling range)

| Progress | State |
|---|---|
| `0–25%` | First environmental photo enters through a horizontal editorial mask. |
| `25–45%` | Its actual or representative fingerprint draws along the composition. |
| `45–70%` | Additional sound sources enter with separate spatial offsets and readable stagger. |
| `70–85%` | Selected source comes into focus; others recede in contrast. |
| `85–100%` | Source waveform visually carries into the recording scene. |

**Hover:** image parallax only ~4–8px; metadata marker follows gently. **Audio:** never trigger on hover; explicit action only.

### Scene 02 — Capture It (about 120–150vh)

| Progress | State |
|---|---|
| `0–30%` | Selected waveform moves toward accurate microphone product macro. |
| `30–55%` | Macro enlarges; concise recording labels reveal. |
| `55–75%` | The signal contracts into a captured-sample visualization. |
| `75–100%` | Capture resolves; recorded sample becomes the source for chopping. |

Keep visual content meaningful without audio. Replay animation should be manually available.

### Scene 03 — Chop It Up (about 100vh)

| Progress | State |
|---|---|
| `0–20%` | Whole waveform appears. |
| `20–40%` | Edit markers draw in. |
| `40–65%` | Waveform divides into discrete visual slices. |
| `65–85%` | Fragments shift and settle into a timing grid. |
| `85–100%` | Visual pattern converts to the original 16-step interface. |

No animated floating panel stacks. The main visual element is the **sound itself**.

### Scene 04 — Build a Beat

Scroll entrance, followed by **user-controlled** editing. Do not scrub user-selected sequencer state against scroll after activation.

- Grid reveal: left-to-right sweep with short rhythmic stagger.
- Step press: roughly 120ms compression and 220ms recovery.
- Play: time-aligned playhead and step emphasis; no visual desync from audio.
- Switch sample: 350–500ms waveform/info crossfade, keeping existing steps.
- Stop: halt scheduling promptly and leave current pattern editable.
- Clear: immediately update all step states and accessible labels.

Use a visible sample playback status; ensure mobile touch targets are large enough.

### Scene 05 — Break the Rules (about 100vh)

- Active effect selection transitions in approximately 350–550ms.
- **Stutter:** visually subdivided and repeated sample blocks.
- **Reverse:** sample fingerprint direction reverses (do not merely flip a decorative icon).
- **Octave:** waveform density / scale change conveys pitch transformation.
- Implement true audio processing or clearly labeled pre-rendered examples. Effects are demonstrated honestly.
- Disable overlapping audio effect routines cleanly when switching selection.

### Scene 06 — Take the Noise (about 110vh)

- Visual energy winds down rather than grows.
- Signal resolves to a restrained graphic mark.
- Product photograph settles as the primary image.
- Product details and action enter with simple, deliberate motion.
- The official manufacturer link is clear; footer attribution is unambiguous.

### Reusability and transition rules

- Keep a single narrative thread across scenes where possible: the selected waveform / sample is the continuity object.
- Handoffs must remain understandable even when a visitor scrolls backward or quickly.
- Define timelines from normalized progress, not rigid assumptions about exact pixel heights.
- Never cause content layout jumping during pin/unpin.
- Use breakpoints and reduced-motion alternatives rather than applying the desktop timeline unchanged on mobile.

---

## 7. Hover, Interaction & UI Feedback Spec

| Event | Response | Starting duration |
|---|---|---|
| Main CTA hover | Directional opaque ink/accent fill and independent arrow motion | `320–420ms` |
| Button press | Scale to ~`0.97`; tactile release | `120–180ms` |
| Sound image hover | 4–8px controlled crop parallax | `200–300ms` |
| Sound selection | Neighbors reduce contrast; selected sample becomes focal | `250–350ms` |
| Product hotspot | Compact annotation appears with directional transition | `250–400ms` |
| Sample switch | Morph or crossfade fingerprint/info | `350–500ms` |
| Nav hover/focus | Typographic offset or moving rule | `200–300ms` |
| Mobile navigation | Original editorial shutter reveal and staggered items | `450–650ms` |

Additional principles:

- Magnetic movement and 3D pointer response can be used on **one or two special targets**, not all buttons/cards.
- Hover is an enhancement, never the only way to activate or learn information.
- The pointer must not distort readable text excessively.
- `pointer: coarse` receives touch-appropriate behavior; no fake hover state dependence.
- Keyboard `:focus-visible` must be clearly discernible and match the design identity.
- Interactive navigation and buttons must actually work.

### Starting motion tokens

```css
:root {
  --nc-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --nc-ease-travel: cubic-bezier(0.77, 0, 0.175, 1);
  --nc-ease-feedback: cubic-bezier(0.23, 1, 0.32, 1);

  --nc-duration-press: 120ms;
  --nc-duration-hover: 260ms;
  --nc-duration-state: 420ms;
  --nc-duration-reveal: 850ms;
  --nc-duration-scene: 1100ms;
}
```

Treat as calibration starting points, not universal values. Tune on devices and through observation.

---

## 8. Asset Production Plan

**Asset fidelity is mandatory.** Do not use fabricated or inaccurate PO-33 device renderings in the final shipped product experience. For any AI-assisted candidate, inspect hardware markings, button geometry, display, size relationships, and logo accuracy against official references.

| Asset | Production direction | Format |
|---|---|---|
| Hero PO-33 | Authentic, accurate three-quarter product photograph, isolated on suitable background | WebP/AVIF + source |
| PO-33 front | Correct undistorted front product view | WebP/AVIF |
| Microphone macro | Correct real microphone-region close-up | WebP/AVIF |
| Found-sound photographs | 3–5 original or licensed tactile environmental sound sources | WebP/AVIF |
| Surface textures | Concrete, rain, scratched metal, paper, physical print wear | Optimized images |
| Field recordings | Short original / appropriately licensed recordings | WAV/OGG (and compatible fallback) |
| Audio fingerprints | Waveform amplitude data calculated from each actual audio sample | JSON or generated SVG/canvas |
| Brand marks | New NOISE CLUB wordmark, stamps, sequencing symbols | SVG |
| Optional product 3D model | Faithful geometry/texturing only if accurate asset is available | GLB |

**Image direction:** dramatic directional lighting, material detail, editorial asymmetry, dark grounded surfaces, authentic object silhouettes. Avoid stock-feeling scenes, excess lens blur, fake text, inconsistent hardware details, and brand confusion.

**2D before 3D:** prioritize excellent photography and motion choreography. WebGL/Three.js should only be introduced if an accurate product model materially improves a specific interaction. The entire experience must work without WebGL.

**Sound:** source from self-recorded/environmental recordings or legally cleared assets. Never invent an artist endorsement, replay protected music, or use a manufacturer's demo recording without permission. Build audio paths/assets so they can be replaced without rewriting the UI.

---

## 9. Technical Architecture

### Recommended stack

- **Next.js App Router** + React + TypeScript.
- **GSAP + ScrollTrigger** for chapter-level timeline orchestration and scroll scrubbing.
- **Lenis** for optional desktop fine-pointer smooth scrolling. Keep native mobile touch scrolling.
- **CSS transitions** for most microfeedback, focus, and ordinary state changes.
- **IntersectionObserver** for lightweight one-time reveals and offscreen pausing.
- **Web Audio API** for browser sample playback/sequencing/effects.
- **SVG or Canvas** for lightweight waveforms (use actual sound-data-derived amplitude envelopes where possible).
- **Three.js / React Three Fiber only if justified** by accurate asset requirements and performance.

Do not require GSAP, CSS, Lenis, and React state to independently write conflicting transforms or scroll positions to the same elements.

### Suggested project tree (adapt to existing project structure)

```text
src/
├── app/
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── SiteFooter.tsx
│   ├── chapters/
│   │   ├── TheSignal.tsx
│   │   ├── HearEverything.tsx
│   │   ├── CaptureIt.tsx
│   │   ├── ChopItUp.tsx
│   │   ├── BuildABeat.tsx
│   │   ├── BreakTheRules.tsx
│   │   └── TakeTheNoise.tsx
│   ├── interactive/
│   │   ├── SoundSpecimen.tsx
│   │   ├── Waveform.tsx
│   │   ├── StepSequencer.tsx
│   │   └── EffectSelector.tsx
│   └── motion/
│       ├── MotionProvider.tsx
│       ├── ScrollOrchestrator.tsx
│       ├── MagneticInteraction.tsx
│       └── RevealText.tsx
├── lib/
│   ├── audio/
│   │   ├── audioEngine.ts
│   │   ├── sequencer.ts
│   │   └── sampleLibrary.ts
│   └── motion/
│       ├── tokens.ts
│       └── timelines.ts
└── public/
    ├── images/
    ├── audio/
    └── textures/
```

This is a conceptual organization. Keep components modular and motion-independent so UI can be inspected with all animations disabled.

### Scroll / motion implementation notes

- Use a single scroll orchestration authority and cleanly integrate Lenis with ScrollTrigger updates.
- Desktop Lenis smoothing may start near `lerp: 0.09`, but only activate on devices with hover, a fine pointer, and no reduced-motion preference.
- Prefer native touch behavior and do not smooth touch input by overriding it.
- Use one shared `requestAnimationFrame` scheduling strategy for continuous pointer/scroll-related DOM updates.
- Use `ResizeObserver` or ScrollTrigger refresh to remeasure after fonts/assets/layout changes.
- Defer heavy effects until needed; avoid new React renders every scroll tick.
- Clean up observers, listeners, animation contexts, RAF requests, audio nodes, and WebGL resources.
- Use global section navigation with correct anchor offsets, semantic sections, and logical history behavior.
- Ensure browser back/forward and deep links work.

### Web Audio considerations

- Start/resume audio context only following an explicit user gesture.
- For sequencer precision, schedule ahead against `AudioContext.currentTime`; don't rely solely on `setInterval` firing for audible timing.
- Keep visual playback synchronized to the audio clock as closely as possible.
- Define clear behavior for stop, reset, samples still loading, playback error, hidden tabs, and route change.
- No microphone access is required for the core experience.
- If microphone access is introduced, make it opt-in, clarify data use, and offer a preloaded alternative.

---

## 10. Responsive & Accessibility Requirements

| Wide desktop | Mobile / narrow viewport |
|---|---|
| Large editorial compositions and selective sticky scenes | Natural vertical reading, very limited pinning |
| Large typography with carefully controlled overlaps | Reflow typography, no clipping of essential content |
| Pointer-reactive photo composition | Tap-to-select interactive images |
| Custom horizontal 16-step sequencer | Accessible compact two-row sequencer |
| Stronger camera/product transforms | Lightweight transitions and static alternatives |
| Optional accurate 3D product inspection | Accurate static or simplified alternate representation |

### Minimum checks

- Respect `prefers-reduced-motion: reduce`, preserving all content and functionality without scrubbed or pinned animations.
- Prevent scroll trap, horizontal page overflow, accidental large blank gaps, and z-index/stacking issues.
- Ensure WCAG-appropriate contrast, readable small metadata, visible keyboard focus, semantic headings, labeled form controls, and meaningful button names.
- Avoid flashing or abrupt high-contrast flicker. No unnecessary audio autoplay.
- Make touch controls comfortably sized and accessible through keyboard navigation.
- Provide non-audio representations of all demo concepts.
- Avoid pausing or hiding content in a way that blocks assistive technologies.
- Validate common desktop, tablet and mobile widths; test short laptop viewports as well as large screens.
- Test when fonts load late, network is slow, media is unavailable, and JS hydration is in progress.

---

## 11. Required Build Order and Deliverables

**Do not begin by imitating the reference page.** Follow this original-design-first sequence:

### Phase A — Design foundation

Produce a concrete NOISE CLUB visual specification: wordmark direction, typographic scale, colors, label and stamp grammar, imagery direction, page-level background rules, and desktop/mobile layouts for all seven chapters.

**Gate:** all artboards must feel distinctly like industrial sound editorial design, not glassmorphic product marketing. Do not add GSAP before this foundation is sound.

### Phase B — Static page implementation

Build the responsive, fully readable static website with original compositions, accurate product imagery, section anchors, and functioning manufacturer CTA. Validate screenshots with animations disabled.

### Phase C — Assets and audio content

Integrate authentic product imagery, original sound photographs, samples, and derived waveform data. Optimize images and audio loading. Do not claim a missing visual/audio asset exists; use clearly identified replacement slots in development.

### Phase D — Motion prototypes

Prototype in isolation:

1. The intro's clipped word reveal and product entrance.
2. One seamless scroll handoff between hero and first chapter.
3. One hover / focus interaction with controlled pointer response.
4. The waveform slice-to-sequencer transition.

Tune timing and confirm no visual resemblance to LUMEN before expanding across the page.

### Phase E — Full chapter choreography

Implement the scene progress maps in Section 6 with GSAP and a clean scroll lifecycle. Test scroll backward, rapid scroll, resize, and navigation-to-anchor behavior.

### Phase F — Interactivity and audio

Create the usable 16-step sequencer, sample selection, effect demos, play/stop/clear behavior, meaningful visual feedback, and honest audio states.

### Phase G — Final QA and originality audit

Check product accuracy, source attribution, responsive layouts, accessibility, FPS and scroll smoothness, animation cleanup, mobile audio behavior, and actual CTA destination. Compare static screenshots against LUMEN to ensure complete visual differentiation.

### Expected final project deliverables

- Working Next.js landing page, not merely a mood board.
- Reusable, documented design tokens and motion tokens.
- All seven original chapters implemented.
- Functional, accessible sound interactions or clearly called-out implementation blockers if audio assets are unavailable.
- Correct manufacturer linking and independent-concept credit.
- Responsive and reduced-motion variants.
- Short implementation notes covering asset provenance, known limitations, and testing.

---

## 12. Acceptance Criteria

The project is complete only when all the following are true:

- [ ] A visitor cannot mistake NOISE CLUB for LUMEN from its static visual design.
- [ ] The brand feels like an original underground sound-publication, not a generic tech/SaaS landing page.
- [ ] The actual PO-33 is represented accurately and manufacturer credit is present.
- [ ] The page background feels continuous; there are no accidental section-wide background seams.
- [ ] The seven-chapter narrative progresses coherently from found sound to beatmaking to product CTA.
- [ ] Hero entrance and scroll handoffs feel smooth and intentional, including backward scrolling.
- [ ] Hover, focus, press, and state transitions are responsive without excessive movement.
- [ ] Sound specimens, play controls, sequencer toggles, and effects reflect actual application state.
- [ ] The browser never autoplays audible media or requests microphone access without the user's action.
- [ ] The manufacturer CTA works and does not imply an official collaboration.
- [ ] Narrow-screen, touch, keyboard, and reduced-motion experiences remain fully usable.
- [ ] Animations do not cause significant layout shifts, visual overflow, or persistent performance jank.
- [ ] No assets or specifications are fabricated or portrayed as verified without confirmation.
- [ ] All animations can be disabled without losing the page's information, identity, or function.

---

## 13. Overall Creative North Star

> **NOISE CLUB is not a product website with animations added. It is a sound culture experience that happens to feature a real product.**
>
> **The world is your sample pack.**
>
> **Borrow motion physics from the supplied LUMEN source, never its appearance.**

Start with an original static editorial concept. Make the found sounds, accurate product photography, typography, and rhythm interactions the protagonists. Then use refined motion to connect each moment into one seamless, purposeful story.
