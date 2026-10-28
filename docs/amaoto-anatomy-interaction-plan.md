# AMAOTO Anatomy — interaction plan

Status: implemented. See `amaoto-anatomy-execution.md` for the delivered behaviour and verification.
Worktree: `E:/orca/workspaces/webflow-projects/codex-session-1028-418`.
Target: `/amaoto#structure` and its shared model/director integration.

## Decisions from the user

- Free exploration of every part.
- One focused stage with optional exploration, without extending the page into a compulsory scroll sequence.
- Preserve AMAOTO's brand, palette, typography, model protagonist and mobile model band.

## Experience thesis

Make Anatomy an explorable object inspector. A visitor can choose any of the six part families, see it clearly, understand what it does, and try a relevant action. No required order, completion gate, modal, quiz or scroll lock.

The first successful interaction should be choosing a part and seeing an unmistakable change in the actual object. Exploration can last ten seconds or several minutes within the same stage.

## What currently holds it back

- `Structure.tsx` gives the runner a range input and then presents six vertically stacked rows. The parts and their controls are separated from the mobile model by a large introduction.
- `PartCallout.tsx` uses the same “View detail” affordance for every part. Hover and committed selection share the expanded state, so browsing can change the description and row height.
- `director.ts` defaults Anatomy to `explode: .85`. Operating the runner therefore operates an already separated object, which weakens the explanation of the assembled mechanism.
- `WagasaCanvas.tsx` uses one generic camera adjustment for all selections, caches a single focus point, and has no explicit return-to-overview control. Moving a runner drag sideways also adds orbit spin.
- Touch currently has no canvas drag interaction. The range input is the reliable mobile alternative and must remain available.

## Proposed visitor flow

1. **Overview.** Arrive at a large, assembled, open umbrella in an underside three-quarter pose. It should read as one connected mechanism. Six restrained part markers and the part selector make exploration discoverable. A short instruction explains “Choose a part to look closer.”
2. **Choose freely.** Click a marker, a visible mesh, or a part button. All three select the same part. Hover/focus previews a highlight only; selection commits the close-up and details.
3. **Inspect.** The camera settles into a view authored for that part. Its label and leader remain attached to a live model anchor. A stable detail area shows its name, material, one concise functional explanation and its relevant action. Context remains visible enough to understand how it attaches.
4. **Try it.** The action changes the actual model. Opening controls remain available when they help explain the selected part. Demonstrations are user-triggered and play once.
5. **Return or continue.** “Back to overview” restores the assembled overview. Selecting another part interrupts and replaces the current transition smoothly. Scrolling onward always works and returns scene ownership to the page director.

The exploratory loop is: overview → any part → inspect/try → another part or overview. It does not have a mandatory finish.

## Each part earns a distinct interaction

| Part | Inspection view | Useful action and resulting behaviour |
|---|---|---|
| Bamboo ribs | Oblique close-up of one representative bowed rib, with its neighbours retained as context | “One rib / all 40” switches emphasis between an individual rib and the repeated family. Move the opening control to see their shared movement. |
| Stretchers | Underside view with the runner and rib hinge visible in the same frame | “Move the linkage” plays one short open/close demonstration. Runner, link and rib highlights follow the sequence of motion. No invented force measurements. |
| Runner ring | Close-up aligned with the shaft and showing travel space | Drag a visible desktop handle or use the accessible range input. Movement follows the projected shaft direction. Runner manipulation cannot also rotate the umbrella. |
| Thread lacing | Macro underside view of a real diamond tie and its attachment points | “Trace a tie” highlights a connected thread path once, then returns to the resting selection. Do not add detached decorative thread geometry. |
| Washi paper | Top view that makes a gore, seam and painted motif readable | “Outside / underneath” changes the inspection view. A structure reveal can expose the ribs beneath the paper while preserving its original colourway. Keep the sun/rain demonstrations in the Light chapter. |
| Turned handle | Close-up of the grip, beads, end and shaft joint | “Turn the view” rotates the complete object around the grip-focused camera target. Do not make the bonded grip appear to unscrew independently. |

“All parts” initially means these six existing part families. The representative-rib feature can use the raycast instance index without turning forty nearly identical ribs into forty menu entries.

## Layout and visual language

**Desktop:** make the model the largest element of one flat inspection stage. Put the compact detail area beside it and the six-part selector along the stage edge. Keep the title and introduction concise. Replace the tall list of repeated “View detail” rows. Keep the existing statistics as secondary context, outside the main manipulation area.

**Mobile:** retain the opaque model band. Put a compact six-part selector immediately beneath it, with large touch targets and a predictable detail area below. Fit the camera to the chosen part, so lacing and the runner are readable at phone size. Show the selected marker/leader rather than crowding the small stage with six overlapping labels. The range input supplies runner manipulation on touch; ordinary canvas touches keep vertical scrolling.

Use the established washi surface, drafting marks, thin gold leaders and restrained vermilion emphasis. Selected parts become clearer through framing and contrast. Avoid adding a second visual theme, nested cards or a toolbox full of tiny controls.

## Core interaction rules

- Separate `hoveredPart` from `selectedPart`; a preview never moves the camera or expands the detail area.
- Each part defines its own camera/target, framing bounds, anchor, minimum useful opening, visibility treatment and available action. Framing follows the current rig rather than a one-time point snapshot.
- Maintain a stable detail area through selection changes; labels and buttons must not jump away from the pointer.
- Add explicit `overview` and `inspect` states. “Back to overview” and Escape have the same clear result.
- Keep the object assembled while demonstrating its mechanism. Expose a separate “Reveal structure” control when inspection needs it, rather than combining runner movement with forced explosion.
- Reveal hidden internals intentionally: first use an underside pose; add a bounded paper cutaway only where the paper still obstructs the selected part. Restore the complete surface on overview/exit. Do not fade the entire model into a ghost.
- Give gestures one owner: part selection, runner drag or orbit drag. Hover never captures a pointer; runner dragging never adds orbit velocity; dragging never fires a click selection at release.
- During Anatomy exploration, the anatomy controller owns the inspection camera and local open/reveal values. The page director retains chapter placement and entry/exit transitions. Scroll updates cannot overwrite a live manipulation.
- Cancel stale camera tweens and demonstrations when selecting another part, resetting or leaving the chapter. Release pointer capture and hand back to the global director without a jump.
- Re-entering Anatomy starts in overview. Preserve the global colourway, but do not resume an old close-up or half-finished demonstration unexpectedly.
- Reduced motion uses immediate framing/highlight changes and direct range control, with no automatic camera travel or tracing. Keyboard and touch must reach every part and action. No-JS retains the readable parts descriptions and poster.

## Implementation sequence

### 1. Make selection and inspection dependable

Introduce the anatomy state/controller and per-part inspection configuration. Separate hover from selection. Add explicit overview/reset. Correct gesture ownership and live anchor tracking. Establish one clear ownership rule between the chapter director and the anatomy controller before adding more motion.

### 2. Build the focused inspector

Replace the long row list with the compact selector and stable detail area. Add accessible projected markers for desktop, part-specific camera framing, object-fit bounds and the mobile layout. Keep existing mesh raycasts as an equal selection route.

### 3. Give every part its useful action

Implement the six behaviours in the table. Start with the existing rig's runner/linkage behaviours, then representative-rib highlighting, tracing, surface reveal and handle-focused orbit. Add the paper cutaway only if the chosen inspection camera cannot expose the relevant structures.

### 4. Finish and verify

Tune entry, interruption and exit transitions; update copy, DESIGN/PROMPT and generated bundles. Verify desktop/mobile, keyboard, reduced motion and no-JS. Use correctness tests and defined screenshots, with no Lighthouse or speed benchmarks.

## Likely code boundaries

- `sections/Structure.tsx`: stage hierarchy, shared controls, detail area and introduction.
- `ui/PartCallout.tsx`: replace/rework as the compact part selector; hover and selection remain separate.
- `data/parts.ts`: verified labels/descriptions; new inspection configuration can live beside it.
- `scene/anatomy.ts` (new): pure state transitions, per-part view/action configuration and ownership rules.
- `scene/AnatomyControls.tsx` (new): accessible projected controls and inspection UI where needed.
- `scene/AmaotoShell.tsx`: anatomy state and event wiring.
- `scene/WagasaCanvas.tsx`: live framing, projection, gesture routing and interruption-safe interpolation.
- `scene/director.ts` / `ScrollDirector.tsx`: assembled overview and explicit handoff to/from inspection.
- `model/createWagasaModel.ts` / `materials.ts`: selected instance emphasis, live anchors and bounded inspection reveal/tracing; retain persistent geometry and disposal.
- `amaoto.css`: focused stage layout, stable detail area, mobile controls and interaction feedback.

Do not add runtime dependencies or a second renderer.

## Acceptance criteria

- Every part is reachable in any order through labelled HTML controls and through its visible model/marker where appropriate.
- Selecting each of the six parts produces a visibly different, useful framing and a clear matching description/action.
- One rib versus all ribs changes actual instance emphasis; thread tracing follows an existing connected tie.
- The runner can move the assembled mechanism through its full range without spinning the model, fighting scroll updates or breaking attachments.
- A selected anchor and its leader remain attached while opening, rotating and resizing.
- Returning to overview restores the complete object and clears temporary reveals/highlights.
- Clicking another part mid-transition or scrolling away during a demonstration leaves no stuck camera, captured pointer or stale animation.
- On mobile, the selected detail remains readable in the band, every action has a touch equivalent and ordinary vertical scrolling stays available.
- Reduced motion, keyboard and no-JS behaviour remain meaningful. No new claims about dimensions, force or manufacturing are invented.
- Screenshot set: overview; all six selected views; assembled runner at closed/half/open; structure reveal; mobile overview/detail; reduced-motion selection.
- Extend e2e coverage for selection from both routes, overview reset, gesture separation, interrupted transitions and chapter exit/re-entry. Unit-test state transitions and projected drag mapping. Existing rig/gallery/guard checks remain green.

## Scope priority

The core release includes all six inspection views, accessible selection, stable controls, explicit reset, live anchors and runner interaction. Part-specific demonstrations complete the experience. A paper cutaway is conditional on visibility; a forced guided tour, scoring, completion badges and additional audio are outside this plan.
