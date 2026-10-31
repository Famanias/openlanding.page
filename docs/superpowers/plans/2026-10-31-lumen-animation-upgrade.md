# Lumen Animation Upgrade Implementation Plan

- **Status:** TODO — revised plan; application changes are not implemented.
- **Revision:** 2026-10-31
- **Source baseline:** `c1825ee`. The original plan was untracked at review time.
- **Surface:** `/lumen`, an existing fictional AI Workflow Playbook landing page.
- **Mode:** Persuade, with an interactive product demonstration.

**Goal:** Make visitors remember how one piece of scattered work becomes a clear, review-ready workflow, then let them feel the quality of the playbook through its interactive pages. Preserve the current glass identity, copy, palette, section order, and primary email action.

**Motion thesis:** Light follows the work: it identifies an input, passes through the glass processing stages, and settles on an output awaiting human review. The same material behavior connects the problem demonstration and playbook preview.

**Architecture:** Reuse the existing GSAP and CSS stack. Give each animated transform one owner, use cancelable timelines for demonstrations, and use a small route-scoped controller for progressive enhancement and ambient DOM updates. Native scrolling is the default. Lenis is a deferred experiment, not a prerequisite for the visual upgrade.

**Dependencies already present:** Next.js 16.4.3, React 19.3.0, TypeScript, GSAP 3.15, Three.js, Tailwind CSS v4, Lenis 1.3.27, Vitest, and Playwright. No package installation is required.

This document is the self-contained implementation specification. The previous link to `docs/superpowers/specs/2026-10-31-lumen-animation-upgrade.md` pointed to a file absent from this checkout. Execution does not depend on that file or on unavailable `superpowers:*` sub-skills.

## 1. What changes from the previous plan

The previous plan led with infrastructure and spread similar effects across the page. The revision gives most of the motion budget to two focal experiences: the workflow hero and the playbook folio. The problem section provides a shorter narrative bridge; the remaining sections support reading and conversion.

| Decision | Revision and reason |
| --- | --- |
| Lenis first | Defer until the native-scroll experience passes visual and performance review. Inertia alone does not communicate Lumen's value. |
| Generic hero recession | Prioritize a legible input-to-output demonstration. Any later scroll recession gets a separate wrapper so pointer tilt continues working. |
| Reveal every heading and card | Limit one-time entrances to selected groups. Keep the hero headline, forms, FAQ answers, and credibility copy directly readable. |
| Tilt all benefit cards | Keep informational cards stable. Reserve depth motion for the interactive workspace and playbook. |
| Count up “16”, “85”, “3” | Remove. `CredibilitySection.tsx` has no such metric group; “85” would introduce an unsupported claim. Existing resource counts remain static. |
| Shrink header height and increase blur | Keep its layout and hit targets stable. Use brief color/opacity feedback; compaction is not a focal feature. |
| “Single rAF” / “60–120 FPS” | Specify one owner for DOM scroll writes and measured budgets. The two existing WebGL renderers have separate lifecycles. |
| Commit after every task | Use checkpoints and verification. Commit or publish only if separately requested. |

### Vetted implementation findings

Paths in this table are relative to `src/app/(lumen)/lumen/` unless otherwise stated. Line numbers describe the source baseline; confirm the excerpt before changing it.

| Priority | Location | Evidence and required correction |
| --- | --- | --- |
| P0 | `components/GlassWorkspace.tsx:61`, `:245`; `lumen.css:211` | GSAP entrance tweens and `.panel-depth-*` classes write transforms on the same panels. Separate entrance and inspection layers. |
| P0 | `components/GlassWorkspace.tsx:125`; `lumen.css:205` | The tilt plane reads `--tilt-x` and `--tilt-y`. The old plan's more specific hero-exit rule replaces that transform. Keep scroll and pointer transforms on different elements. |
| P0 | `components/background/PageAtmosphere.tsx:49` | `.page-atmosphere__glass` contains a fixed fullscreen canvas. Transforming this ancestor changes fixed-position containment and moves the tested halo. Animate only isolated SVG artwork wrappers. |
| P0 | `components/GlassWorkspace.tsx:99` | Replay uses four untracked `setTimeout` calls. Replace them with one cancelable timeline; a new scenario or manual selection must cancel stale callbacks. |
| P1 | `components/background/BackgroundMotionController.ts:57`; `components/background/PageAtmosphere.tsx:21` | Scroll calls `setState(nextState)`, but JSX consumes only `scrollProgress` as a data attribute. Parallax/refraction calculations currently have no visible consumer. Remove unnecessary updates without mistaking them for an existing visual effect. |
| P1 | `components/GlassWorkspace.tsx:44`, `:125`; `components/GlassBackground.tsx:482` | Reduced motion is sampled once; manual replay and workspace pointer motion do not share a live preference guard. Correct these existing paths as well as new effects. |
| P1 | `components/GlassBackground.tsx:456`, `:512` | The background observes a fixed viewport mount and keeps scheduling while inactive. Add actual scene activity and document visibility gates; retain the software-WebGL pacing path. |
| P1 | `components/ProblemSection.tsx:72` | ScrollTrigger's `onLeaveBack` resets the organization state. Make the automatic demonstration one-shot and give manual choices precedence. |
| P1 | `components/PlaybookPreviewSection.tsx:176`, `:187` | Stable page keys exist, but full content is rendered only for the front page. Preserve page identity/content during the handoff and keep inactive controls out of focus order. |
| P1 | Previous reveal specification | Hidden-by-default CSS and ancestor-wide `[data-in]` selectors can hide content after initialization failure or reveal nested groups early. Arm effects per target only after setup succeeds. |

**Visual evidence limit:** The saved `public/gallery/lumen.webp` and `public/templates/lumen/preview-1600.webp` depict the closing CTA, not the hero. No site HTTP server was running during review. The motion direction below is proposed from verified source behavior; it still requires the browser feel checks in Task 7.

## 2. Visitor experience and choreography

### A. Hero: watch a request become review-ready work — primary signature

The hero must explain the product with its movement. Assembly alone is insufficient: source information and the resulting fields need a visible relationship.

- Keep the headline, supporting copy, form, scenario selectors, and replay control available from first paint.
- On the workspace's first visible appearance, settle the three glass panels into place, then send one finite light trace through the existing connectors.
- During classify → summarize → route, emphasize the corresponding source item, processing row, and existing output field. Keep the selected scenario's real text visible.
- End on the existing human-review status. A green check confirms that a draft is prepared; it must not imply that AI output has been approved or sent.
- The visitor can interrupt at any point by choosing a scenario or inspecting a stage. That action wins immediately.
- Run the automatic sequence once per App lifetime. Closing Glass Studio must not replay a first-visit introduction. Replay remains explicit.

Timing starts when at least 25% of the workspace is visible; a mobile visitor should not miss a sequence that ran below the fold.

| Time | Visible beat | Motion |
| --- | --- | --- |
| 0–640 ms | Glass panels settle | Each entrance wrapper moves from `translateY(16px) scale(0.98)` to rest over 520 ms; start offsets 0 / 60 / 120 ms. Content never becomes fully transparent. |
| 240–540 ms | Input is identified | One clipped edge highlight crosses the selected input; emphasis uses existing ice/lavender colors. |
| 540–840 ms | Classification becomes clear | First connector trace travels to processing; highlight the existing classification result. |
| 840–1040 ms | Summary is prepared | Move emphasis to summary; use a 160 ms content-emphasis transition. |
| 1040–1240 ms | Destination is proposed | Trace the second connector and emphasize routing. |
| 1240–1600 ms | Review-ready result settles | Output edge briefly brightens; reveal the existing review indicator without removing its warning/status text. |

The traces are finite SVG effects. Use each path's `getTotalLength()` rather than a hard-coded dash length. Small, bounded SVG stroke animation is a deliberate exception to transform/opacity-only animation.

**Pointer response:** On `(hover: hover) and (pointer: fine)` with no reduced-motion preference, add at most ±2° relative to the current resting tilt (2° X, -4° Y). Track only the artwork region, coalesce pointer updates into one frame, and return to rest over 220 ms. The form and controls remain stationary. Touch and keyboard users receive the same content and stage-inspection functionality.

**Scenario changes:** Update the selected control and semantic data immediately. Cancel old playback, then use a 180 ms correspondence emphasis across input, processing, and output. Do not replay the entire 1.6-second introduction on every selection.

### B. Problem: scattered work finds its structure — narrative bridge

Keep the existing five fragment identities and before/after controls. On first entry, the scattered cards align into their existing five-column system on desktop. The cards settle over 520 ms with 40 ms sibling offsets (160 ms maximum delay), followed by one connector trace.

- Remove automatic reversal on scroll back.
- If the visitor has already chosen a mode, do not override it on entry.
- Repeated mode changes retarget from the current transform over 260 ms with no stagger.
- At widths below 1024 px, keep the existing readable grid/list and use a 160 ms emphasis change; do not scatter cards offscreen.
- Reduced motion presents the structured system immediately; the controls still switch views instantly.

Do not pin this section or require a set scroll distance to unlock content.

### C. Playbook: handle a small glass folio — secondary signature

The selected page should feel like an object moving to the front, with its own content attached.

- Retain the existing cover, three preview pages, tabs, previous/next buttons, and outline.
- On first entry, settle the two rear sheets once (12 px travel, 480 ms, 60 ms separation).
- A selection brings the requested sheet forward over 280 ms. The outgoing sheet recedes at the same time; avoid a 180° page flip that exposes mirrored text.
- Retain each page's content through the transition. Do not empty a moving sheet and refill another halfway through. Keep inactive sheet bodies visually hidden behind their decorative sheet faces.
- On a change, fade the outgoing text body over 80 ms, then fade the incoming body from 80–180 ms. Keep both bodies attached to their original sheets. A focus action inside the incoming page settles its text immediately.
- Show the selection immediately; keep the incoming page readable within 180 ms. Controls remain responsive during movement.
- A second selection retargets from the current state. Do not queue flips or disable controls until animation completion.
- Use a restrained edge highlight on the active sheet, not pointer-following glare over text.
- Place all three sheet wrappers in the same CSS grid cell so their content contributes to the tallest intrinsic row. This reserves a stable footprint and adapts to width/font changes without JavaScript height measurement. Put the expandable outline outside that grid.
- Below 1024 px, show one flat page and use at most a 160 ms opacity transition.
- Exactly one tabpanel is active for assistive technology. Inactive sheets are `inert` and `aria-hidden`; use decorative sheet backs on mobile where appropriate.

### D. Supporting rhythm and closing payoff

| Surface | Treatment |
| --- | --- |
| Trusted-by row | Readable without an entrance or marquee. |
| Benefits | One 12 px / 480 ms group entrance; optional 50 ms sibling offsets, capped at 100 ms total. Static card text; finite illustration traces instead of endless pulses. |
| How it works | Keep node identity stable while stages change. A 220 ms selection outline moves to the selected card; diagram emphasis changes in 180 ms. On mobile, use a stationary border/opacity indication. |
| Credibility | Keep copy and resource counts static. Before/after comparison updates immediately, with at most a 160 ms content fade. |
| FAQ | Questions and open answers are always readable. Immediate expanded state, 160 ms chevron feedback, no row-entry cascade. |
| Final CTA | Form stays visible. Let its decorative rear sheets settle once (8 px / 480 ms); the headline and form do not scale. |
| Form success | Present the existing local-demo confirmation immediately with a 160 ms opacity/check emphasis. Preserve email validation, privacy wording, shared hero/final state, and current demo behavior. |
| Footer | Preserve the existing near-viewport glass sculpture, image fallback, live reduced-motion handling, 30 FPS pacing, and tested scroll drift. This is the closing visual signature. |

## 3. Scope and non-negotiable constraints

- **Source isolation:** Runtime source and relative imports stay inside `src/app/(lumen)/`. External npm imports are allowed. Extend `tests/e2e/lumen.spec.ts` for shared browser coverage; it is the explicit test-file exception.
- **Existing identity:** Preserve section order, factual copy, typography, glass assets, Glass Studio controls, forms, IDs, and palette. No new claims, metrics, logos, or imagery.
- **Palette:** Use only the registered Lumen colors in `scripts/templates.config.ts:16`: `#1E2432`, `#252C43`, `#5B8DEF`, `#5BA59A`, `#657187`, `#8E7CE8`, `#C9DAFA`, `#CBD5E1`, `#D8D0F7`, `#DDE3EE`, `#E6ECF8`, `#ECF0F9`, `#EDF1FA`, `#EFF3FA`, `#F0F3FA`, `#F2F5FC`, `#F6DCCA`, `#F8F9FC`, `#F9FAFD`, `#FFFFFF`. Derive new tints with `color-mix()`; do not expand exemptions.
- **Progressive enhancement:** Default HTML/CSS is fully visible. Missing JavaScript, unavailable observers, or failed WebGL must not produce blank headings, invisible controls, or inaccessible primary content.
- **Input and state:** No scroll locks, compulsory horizontal scrolling, custom cursors, typing simulations, or automatic navigation. No `setState`/context updates per scroll or pointer frame. Discrete semantic updates at demonstration milestones, control actions, and preference changes are allowed.
- **Reduced motion:** Live preference changes cancel spatial motion immediately, remove pending callbacks, flatten interactive depth, and settle reveals. Existing meaningful state/color feedback remains legible; do not use near-zero global durations as the only safeguard.
- **Lifecycle:** Handle React Strict Mode, unmount, Studio entry/exit, tab visibility, resize, late fonts, and preference changes. Clean up listeners, observers, timeline callbacks, frames, and inline enhancements.
- **Delivery:** This is an implementation plan, not authorization to commit, deploy, or replace unrelated project context. Do not rewrite the root `PRODUCT.md`, whose current-task text describes another template.

Before writing runtime code, read the installed Next.js guides required by `AGENTS.md`:

1. `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
2. `node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md` if adding a dynamic import.

Browser APIs belong in client lifecycle code, not server render or module initialization.

## 4. Motion contract

### Tokens

Add the following under `.landing-shell` in `lumen.css`; do not introduce new global `:root` motion variables.

| Token | Value | Use |
| --- | --- | --- |
| `--lm-ease-optical` | `cubic-bezier(0.16, 1, 0.3, 1)` | Existing Lumen arrival curve; preserve it for authored entrances. |
| `--lm-ease-feedback` | `cubic-bezier(0.23, 1, 0.32, 1)` | Press and small state feedback. |
| `--lm-ease-travel` | `cubic-bezier(0.77, 0, 0.175, 1)` | Finite movement between established positions. |
| `--lm-duration-press` | `120ms` | Press feedback, scale no smaller than 0.98. |
| `--lm-duration-feedback` | `160ms` | Content emphasis, icons, colors. |
| `--lm-duration-select` | `220ms` | Selection outline and pointer return. |
| `--lm-duration-sheet` | `280ms` | Playbook page movement. |
| `--lm-duration-reveal` | `480ms` | Supporting one-time entrances. |

GSAP sequences retain the existing `power3.out` for arrivals. Playbook sheet travel belongs exclusively to CSS transitions using `--lm-ease-travel`; a separate entrance wrapper may use GSAP for its one-shot settle. Keep JS timing constants in `motion/timings.ts`, using the exact storyboard values; document their CSS token counterparts there. Do not add another animation library or near-duplicate easing variants.

### One transform owner per layer

| Element/layer | Owner | Responsibility |
| --- | --- | --- |
| Hero copy/form | Static layout + control CSS | Always readable and operable. |
| Workspace scroll wrapper, if later added | Route DOM controller | Scroll transform only. |
| `.workspace-tilt-plane` | Workspace pointer handler | Resting perspective + fine-pointer tilt only. |
| New workspace panel entrance wrappers | Workspace GSAP timeline | One-shot settle. |
| Existing `.panel-depth-*` inner panels | Component state + CSS | Inspect/focus depth. |
| Panel content emphasis wrappers | CSS | Scenario/milestone opacity and color. |
| Individual playbook sheet wrappers | CSS transitions + intrinsic grid layout | Page-stack positions; no animated height or per-frame measurement. |
| Background ribbon/sheet artwork wrappers | Route DOM controller | Optional bounded translation. |
| Fixed WebGL mount and its ancestors | Existing renderer/static layout | No scroll transform, filter, or new containing-block behavior. |

Current collision to eliminate:

```tsx
// components/GlassWorkspace.tsx — entrance currently targets an inspection panel
tl.fromTo(
  inputPanelRef.current,
  { opacity: 0, y: 24, scale: 0.96 },
  { opacity: 1, y: 0, scale: 1, duration: 0.65 },
  0.15
)
```

Move that entrance responsibility to a wrapper. Do not clear a transform that another effect is still using. Once an entrance finishes, clear only its own temporary properties and remove its `will-change`.

### Route controller and ambient budget

- A single `LumenMotion` instance mounts inside the landing branch of `App.tsx`, scoped by a root ref. Glass Studio does not receive landing observers or scroll effects.
- Native scroll/resize events schedule at most one pending DOM frame. There is no perpetual scroll-coordinator loop while the page is idle.
- Cache geometry. Invalidate on resize, observed content-size changes, font readiness, and layout-changing interactions. Perform reads before writes; do not query all sections on every scroll.
- Write transforms/opacity directly to the affected decorative elements. Do not publish frame-varying variables on `document.documentElement` or a broad ancestor.
- Keep `data-scroll-progress` on the atmosphere if useful for diagnostics, but update its rounded value only when it changes. It is not React state.
- Preserve the pure `computeScrollAtmosphereState` export and its current test contract. New visible parallax is separately clamped to ±24 px; its old unbounded offset must not be applied blindly to page-spanning artwork.
- If artwork translation is used, wrap ribbon A and sheet B independently. Leave the fixed canvas, halo C, global lines, and atmospheric parent untouched.
- Never animate backdrop blur or large shadows per frame. Use a clipped pseudo-element for the finite edge highlight. Apply `will-change` only while an effect is active.
- While the hero is near the viewport, the existing background renderer can remain live. On the landing page, pause it after the hero is more than 200 px above the viewport; resume on return without resetting the preset. The static global artwork continues down the page.
- Stop background rendering when `document.hidden` or reduced motion is active. Render one settled frame on resize/preset change as necessary. Do not keep requesting idle frames only to skip drawing.
- Retain the existing software-WebGL pacing and disposal logic. Do not attach canvas rendering to the DOM scroll scheduler or rewrite the footer engine.

## 5. Ordered implementation tasks

Execute Tasks 1–7 in order. Every task must leave the page readable and functional. The deferred experiments in section 6 are outside the default completion criteria.

### Task 1 — Establish baseline, tokens, preferences, and exact math contracts

**Files**

- Modify: `src/app/(lumen)/lumen/lumen.css`
- Create: `src/app/(lumen)/lumen/motion/timings.ts`
- Create: `src/app/(lumen)/lumen/motion/useMotionPreferences.ts`
- Create: `src/app/(lumen)/lumen/motion/math.ts`
- Create: `src/app/(lumen)/lumen/motion/math.test.ts`

- [ ] Run `npm test -- lumen` and `npm run check` before changes; record pre-existing failures separately.
- [ ] Capture the existing hero, problem, preview, and final CTA at 1440×900, 1280×720, and 390×844 when a server is available.
- [ ] Add the scoped tokens from section 4. Replace touched `transition-all` rules with explicit properties rather than doing unrelated site-wide cleanup.
- [ ] Implement a live preference hook: reduced motion, fine pointer, and hover capability. Subscribe in an effect with matching cleanup; server and initial client renders use a stable, non-kinetic fallback. Expose `ready: false` until the first real media-query read. Do not start or consume autoplay while preferences are unresolved.
- [ ] Add only `clamp(value, min = 0, max = 1)` and `progress(value, start, end)`. For `end <= start`, define progress as 0 below start and 1 at/above start; otherwise clamp the ratio to 0..1.
- [ ] Unit-test exact boundaries, midpoint, out-of-range values, zero/reversed ranges, and negative scroll inputs. Do not use “between 0 and 1” assertions as the sole proof of a formula.
- [ ] Preserve the existing atmosphere math tests in `glass/glassTypes.test.ts`. Do not introduce a duplicate `computeAtmosphereParallax` helper with a different contract.

**Done when:** No visual change beyond existing equivalent timing tokens; preferences update live; deterministic math tests pass.

### Task 2 — Remove scroll re-renders and make atmosphere activity explicit

**Files**

- Create: `src/app/(lumen)/lumen/motion/LumenMotion.tsx`
- Modify: `src/app/(lumen)/lumen/App.tsx`
- Modify: `src/app/(lumen)/lumen/components/background/BackgroundMotionController.ts`
- Modify: `src/app/(lumen)/lumen/components/background/PageAtmosphere.tsx`
- Modify: `src/app/(lumen)/lumen/components/GlassBackground.tsx`
- Modify: `src/app/(lumen)/lumen/lumen.css`

- [ ] Add a landing root ref and mount `LumenMotion` only while the landing branch is rendered.
- [ ] Replace `useBackgroundMotionController`'s scroll-state subscription with the scoped DOM writer described in section 4. Remove its React-hook consumer from `PageAtmosphere`; retain `computeScrollAtmosphereState` and its exported type.
- [ ] Add optional isolated SVG wrappers only if a subtle ambient displacement is visibly useful. All values are bounded; no transform is applied to `.page-atmosphere__glass`.
- [ ] Use a hero observer to pass landing activity to `GlassBackground` through its existing pause mechanism. Combine that with live reduced-motion and document-visibility conditions.
- [ ] Cancel both rAF and software-render timer work while suspended; restart exactly one pacing chain on resume. Reset the previous-frame timestamp to avoid a time jump.
- [ ] Preserve Studio render modes, preset changes, context restoration, quality selection, and disposal. Do not apply landing-only scene visibility assumptions inside Studio.
- [ ] Confirm the footer can become active while the page-wide live background is paused, avoiding two competing live scenes at the bottom.

**Done when:** React Profiler shows no scroll-driven commits from the atmosphere; the fixed canvas stays viewport-aligned; background drawing stops under the specified conditions.

### Task 3 — Build the signature hero and reliable replay

**Files**

- Modify: `src/app/(lumen)/lumen/App.tsx`
- Modify: `src/app/(lumen)/lumen/components/GlassWorkspace.tsx`
- Modify: `src/app/(lumen)/lumen/lumen.css`
- Modify: `src/app/(lumen)/lumen/motion/timings.ts`
- Create: `src/app/(lumen)/lumen/motion/workspacePlayback.ts`
- Create: `src/app/(lumen)/lumen/motion/workspacePlayback.test.ts`

- [ ] Remove the existing App-level opacity-zero hero intro. Keep copy and form static; let `GlassWorkspace` own the single authored visual introduction.
- [ ] Introduce entrance wrappers outside the existing inspection panels. Keep base depth, pointer tilt, and entrance transforms independent according to section 4.
- [ ] Implement section 2A's 1600 ms choreography with one scoped GSAP context and one active playback timeline ref.
- [ ] Keep an App-owned `introConsumedRef` outside the Studio/landing branch and pass it to the workspace. Consume it only on sequence completion, a real user interruption, explicit Studio entry, or settling for an actual reduced-motion/visibility event after playback begins. Never consume it during effect setup or cleanup. With resolved reduced motion at first load, settle and consume without playing. Strict Mode's setup → cleanup → setup must leave an unstarted introduction eligible; Studio entry must consume before changing branches. Do not use module-global state or session storage.
- [ ] Replace all four manual-playback timeouts. Use one `cancelPlayback(reason)` path for scenario changes, explicit stage inspection, replay restart, unmount, offscreen exit, document hiding, and reduced-motion changes.
- [ ] If a user action cancels playback, show that action's selected state. If passive suspension cancels it, settle the current scenario's review-ready visual state. Never let an old callback overwrite a newer selection.
- [ ] A Replay press can restart from the current visual pose; no disabled control should block a newer request. Keep current scenario data attached to the sequence.
- [ ] Gate pointer handlers with both media capabilities and the actual event's pointer type. Batch writes and cache bounds until layout changes; cancel pending pointer work on exit.
- [ ] Stop decorative connector loops in this workspace. Drive traces only during automatic/manual demonstrations.
- [ ] Keep changes to processing labels as discrete semantic milestones. Do not announce each decorative frame; announce a user-triggered completion once if a live region is used.
- [ ] Add focused fake-timer/driver tests for interruption: start email playback → choose document → advance time → document selection survives; cancel → no further callbacks; repeated start → one active sequence. Cover setup/cleanup/setup without consuming an unstarted intro, plus Studio interruption consuming it. Test the actual playback ownership used by the component, not a parallel test-only model.
- [ ] While touching workspace controls, remove nested `role="button"` stage containers around native scenario/substep buttons. Use a dedicated stage-inspection button and its existing controls as siblings, with visible focus states and unchanged labels.

**Done when:** The source-to-result story is clear in one pass; inputs work throughout; fast interactions and Studio entry never leave stale callbacks or competing inline transforms.

### Task 4 — Connect the problem story and stage diagram

**Files**

- Modify: `src/app/(lumen)/lumen/components/ProblemSection.tsx`
- Modify: `src/app/(lumen)/lumen/components/HowItWorksSection.tsx`
- Modify: `src/app/(lumen)/lumen/lumen.css`

- [ ] Keep the existing Problem ScrollTrigger as the only trigger for that scene; do not layer a generic reveal observer over the same cards.
- [ ] Replace `onLeaveBack` reset with one-shot entry and a manual-interaction flag. Preserve the selected view after a visitor uses either control.
- [ ] Implement section 2B's automatic 520 ms / 40 ms alignment and 260 ms interruptible manual transition. Animate transforms, not grid order or layout coordinates.
- [ ] Keep card text in place throughout. Trace the connector once after alignment; suppress scattered geometry below 1024 px and under reduced motion.
- [ ] In How It Works, keep diagram node wrappers stable by position (0–3) across map/automate/review. Do not remount the entire diagram on every `node.id` change.
- [ ] Draw an outlined selection layer behind the existing three large step cards; measure its destination on selection/resize and move it via transform over 220 ms. Do not introduce a small pill that mismatches the current card layout.
- [ ] Update selected state and node content immediately. Use at most 180 ms emphasis transitions, with a single finite pathway trace for automate/review.
- [ ] Complete tab semantics: stable tab/panel IDs, `aria-controls`, roving tab stop, arrow navigation matching the responsive orientation, Home/End, and visible focus. Keyboard selection updates instantly without staged delays.

**Done when:** The two sections explain organization and review rather than adding ambient movement; rapid toggles retarget cleanly; automatic motion never overrides a manual choice.

### Task 5 — Make preview pages feel attached to physical sheets

**Files**

- Modify: `src/app/(lumen)/lumen/components/PlaybookPreviewSection.tsx`
- Modify: `src/app/(lumen)/lumen/lumen.css`

- [ ] Preserve `getPreviewStackOrder` and its existing tests. Retain stable page keys and use its front/middle/back positions as target states.
- [ ] Refactor the current `isFront ? fullContent : headerOnly` rendering so content stays with its page during movement. Give each sheet a separate content body and decorative face; apply the 80 ms outgoing / 80–180 ms incoming text treatment from section 2C. Do not duplicate IDs or leave inactive CTAs tabbable.
- [ ] Implement the 280 ms handoff and one-time rear-sheet entrance from section 2C. Use transitions for reversible sheet positions; no per-click keyframe restart.
- [ ] Replace absolute/relative position swapping with one overlapping CSS grid cell for the three full-content sheets. Let the intrinsic row size reserve the tallest page at each breakpoint. Rear sheets remain in layout even while their bodies are visually hidden; do not use `display: none` on a sheet needed to size the grid.
- [ ] Keep outline expansion outside the reserved stack. Do not hold the whole section at its tallest expanded outline height.
- [ ] Make tabs fully keyboard-operable. Previous/next may wrap as they do now; repeated input always resolves to the latest requested page.
- [ ] Keep tab focus on the control during navigation. Before making a page inert, move focus to the initiating control if focus would otherwise be stranded inside the old page.
- [ ] Flatten the presentation below 1024 px and for reduced motion; content selection still works without transitions.

**Done when:** Pages move without losing their content, double-exposed text, accidental focus, stale selection, or a jump in the page's scroll position.

### Task 6 — Add restrained supporting entrances and feedback

**Files**

- Modify: `src/app/(lumen)/lumen/motion/LumenMotion.tsx`
- Modify: `src/app/(lumen)/lumen/components/BenefitsSection.tsx`
- Modify: `src/app/(lumen)/lumen/components/CredibilitySection.tsx`
- Modify: `src/app/(lumen)/lumen/components/MinimalHeader.tsx`
- Modify: `src/app/(lumen)/lumen/components/FaqSection.tsx`
- Modify: `src/app/(lumen)/lumen/components/FinalCtaSection.tsx`
- Modify: `src/app/(lumen)/lumen/components/DownloadForm.tsx`
- Modify: `src/app/(lumen)/lumen/lumen.css`

- [ ] Implement only section 2D's effects. Do not create generic `TiltCard` or `CountUp` components.
- [ ] For supporting reveals, observe explicit `[data-lm-reveal]` targets within the landing root using `rootMargin: "0px 0px -8% 0px"`. Observe first, then arm each eligible below-fold target.
- [ ] Default styles are visible. Only an armed target with its own not-yet-revealed state receives an offset/opacity treatment. Already-visible, focused, or hash-targeted elements settle immediately.
- [ ] On intersection, set that target's own revealed attribute and unobserve. Never use an ancestor's revealed state to release nested effects.
- [ ] If setup fails or motion preference changes, remove armed styles and settle all targets. Cleanup must leave the static page intact.
- [ ] Scope finite/pauseable SVG effects to their sections. Remove the use of perpetual `svg-signal-line`/float motion where it would compete with reading.
- [ ] Keep the header height and blur constant. Use the shared press/focus/selection timing only; retain real hash hrefs.
- [ ] Replace App's fixed 300 ms focus delay and unconditional smooth `scrollIntoView` with preference-aware navigation. For the form CTA, focus the input immediately with `preventScroll: true`, then perform one scroll using the current preference. Give anchored sections an offset matching the measured sticky header.
- [ ] Preserve native hash/history behavior and modifier-click semantics. Do not add an `lm:goto` custom-event protocol.
- [ ] Keep validation and success announcements readable. Do not add artificial form waiting, automatically focus success feedback on both forms, or imply server delivery.

**Done when:** Supporting motion helps orientation and feedback without competing with the hero and folio; fast scrolling, focus jumps, and script failures leave readable content.

### Task 7 — Verify behavior, accessibility, performance, and visual impact

**Files**

- Modify: `tests/e2e/lumen.spec.ts`
- Existing regressions to preserve: `src/app/(lumen)/lumen/glass/glassTypes.test.ts`, `src/app/(lumen)/lumen/utils/workflowLogic.test.ts`, `src/app/(lumen)/lumen/components/FooterDroplets.test.ts`

- [ ] Add browser coverage for the behavioral cases below. Assert settled outcomes and accessibility state; do not make tests depend on arbitrary animation sleeps.
- [ ] Run the verification commands once after implementation; rerun the affected checks only after fixes.

```powershell
npm test -- lumen
npm run check
npx tsc --noEmit
npx eslint "src/app/(lumen)" "tests/e2e/lumen.spec.ts"
npm run build
npm run test:e2e -- tests/e2e/lumen.spec.ts
```

The Playwright config starts a production build/server at port 3100 unless a server is already there. For a single production build, run `npm run build`, start `npm run start -- --port 3100` in a separate terminal, then run the browser command against that server. Stop only the server this work started. Do not remove the halo test to make the suite pass.

**Browser matrix**

| Case | Required observable result |
| --- | --- |
| 1440×900 and 1280×720 desktop | Headline and CTA remain visible, panels do not clip, hero completes one finite demonstration. |
| 390×844 touch and 768×1024 tablet | Native scrolling, readable flat layouts, working taps, no sticky hover or horizontal overflow. |
| No JavaScript | Meaningful hero/section copy, form labels, preview content, and real anchor navigation remain visible; no hidden-by-default content. Interactive submission is still the existing client-side demo. |
| Reduced motion at load | No spatial reveal, tilt, parallax, or automated processing walkthrough; settled content and controls remain usable. |
| Reduced motion enabled mid-demo | Current animation cancels immediately, final content is readable, no later callback restarts movement. Disabling it does not replay the intro. |
| Fast input | Replay → change scenario → inspect stage; rapid Next/Previous; reverse before/after mid-transition. Latest selection wins. |
| Keyboard | Complete tabs behavior, stable focus, visible rings, inactive pages excluded from tab order, no focus landing in a hidden reveal. |
| Navigation | Hash loads, form CTA, Back/Forward, Studio open/close, and leaving/re-entering `/lumen` produce no stale listeners or unintended scroll jumps. |
| Visibility / graphics | Hidden tab suspends drawing; resume has no time jump. WebGL failure or context loss preserves readable content and static artwork. |
| Existing footer / extreme zoom | Footer image/live fallback and reduced-motion tests pass; halo overflow remains continuous in the existing 7600 px regression. |

**Performance acceptance**

- Compare the same viewport, scenario, device, and browser against the baseline. Measure a production build, not development timings.
- React Profiler: no commits caused by continuous scroll or pointer frames. Deliberate stage milestones and control selections may render.
- DevTools Performance: no layout reads/writes alternating on every scroll frame; no recurring layout shift from a header resize, reveal, or page-stack swap.
- On the documented 60 Hz reference device, target 95th-percentile frame intervals at or below 20 ms during the hero and folio interactions. Attribute missed frames before changing scope; do not promise 120 FPS.
- Target no new motion-attributable main-thread task longer than 50 ms. If a shader/preset path exceeds the budget, reduce quality or use its still fallback before adding effects.
- Record LCP/CLS before and after with the same conditions. Accept no more than 100 ms median LCP regression across three comparable runs and no added motion-related CLS.
- No perpetual DOM coordinator while idle, no offscreen/hidden decorative loops, and no increasing live canvas/listener count after repeated Studio/route visits.
- Keep new application JavaScript within 10 KB gzip over the baseline, excluding already-imported library code. Do not create another Three.js scene, new asset request, or animation dependency for this work.

**Feel check and review artifacts**

- Confirm first mounting in development Strict Mode starts one visible introduction and that Studio return does not start another. Use the production build for timing/performance evidence.
- Inspect one batched desktop/mobile pass, fix concrete defects together, then do at most one confirmation pass.
- Review the hero at 10% speed: light must follow input → processing → output; no element snaps when ownership changes.
- Compare the playbook at normal speed and slow motion: the page that moves is the page whose content is selected.
- Capture hero states at 0 / 640 / 1240 / 1600 ms from timeline start, plus problem before/after, every preview page, final CTA, and reduced-motion desktop/mobile states.
- Save short recordings of the hero and rapid preview navigation for review. A static screenshot alone cannot establish motion quality.
- Report measured results and any outstanding limitation. Do not describe proposed performance or conversion improvements as observed results.

**Definition of done:** The visitor can understand one request becoming a review-ready result, explore attached preview pages, and reach the form without waiting. Required checks pass; the existing glass world, Studio, footer, and copyable-template behavior remain intact.

## 6. Deferred experiments — only after the core experience passes

These are separate follow-ups, not unchecked requirements of Tasks 1–7.

### Lenis native-versus-smooth comparison

Only retain smoothing if a side-by-side desktop review demonstrates a clear improvement without degrading anchors, focus, browser history, or nested scrolling. Use the already installed package; do not add it merely to match other templates.

- Enable only for `(hover: hover) and (pointer: fine)` plus no reduced-motion preference. Leave touch native.
- If tested, use `autoRaf: false`, `smoothWheel: true`, `syncTouch: false`, `lerp: 0.12`, and working anchors. Feed `lenis.raf(time * 1000)` from one named GSAP ticker callback; remove it and destroy Lenis on cleanup.
- Connect Lenis scroll to `ScrollTrigger.update`. Do not also run a standalone smoothing rAF or apply a second CSS smooth-scroll behavior.
- On preference/capability change or Studio entry, destroy the experiment and restore native scrolling. Guard a late dynamic import from attaching after cleanup.
- Do not change GSAP global ticker defaults or add a custom anchor event bus as an incidental side effect.
- **Copyability gate:** `scripts/generate-copy-bundles.ts:12` currently lists Lumen's dependencies as `three`, `gsap`, `motion`, and `lucide-react`; it omits `lenis`. Shipping the experiment requires the explicit one-line metadata exception to add `lenis`, regenerating the Lumen bundle, and checking its imports/dependency list. Package presence alone does not make the exported template self-contained.

The official [Lenis setup and GSAP integration guide](https://github.com/darkroomengineering/lenis#setup) documents the manual ticker, stylesheet, and ScrollTrigger integration. Check the installed 1.3.27 APIs before implementing; import its recommended stylesheet only with the route-scoped experiment.

### Hero scroll recession

If the hero feels disconnected on exit after the signature sequence works, test at most 16 px upward translation and scale 1 → 0.985 on a dedicated outer artwork wrapper over the first 60% of hero exit. Never fade interactive text or overwrite pointer tilt. Disable for widths below 1024 px and reduced motion. Retain only if the added scroll work and visual review justify it.

## 7. Reference and handoff notes

- Existing GSAP `gsap.context(...)` / `ctx.revert()` cleanup in `App.tsx`, `GlassWorkspace.tsx`, and `ProblemSection.tsx` is the local convention to extend.
- The [GSAP matchMedia guide](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/) documents live media-condition rebuilding and automatic reversion. Use scoped lifecycle cleanup; do not leave one-time preference snapshots in new paths.
- `FooterGlass.tsx` is an existing exemplar for live reduced-motion subscription and near-viewport activation. Its current fallback and pacing are deliberate.
- The default plan introduces no dependency changes, no new media, and no shared-template source imports.
- If the code has drifted since `c1825ee`, reconcile the affected step against current source and update this plan before applying that step. Preserve unrelated work.
