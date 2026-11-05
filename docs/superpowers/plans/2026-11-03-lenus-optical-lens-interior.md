# Lenus Optical Lens Interior Implementation Plan

**User clarification - 2026-11-06:** The closed pose must conceal the interior before revealing it and closing again. This supersedes the earlier closed-core-visibility requirement. [Correction and verification](../evidence/lenus-closed-loop/README.md).

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans for native execution, or superpowers:subagent-driven-development if that execution method is selected. Implement task by task, with the img2threejs state and sculpt-pass gates remaining authoritative. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a readable, procedural internal optical train to the existing Lenus lens and a seamless **24-second automatic mechanical transformation**: assembled lens → unlock → housing deployment and optical separation → interior reveal → staged reassembly → assembled lens. Use the six approved generated references and original cutaway, preserve the recognizable hero asset, and retain manual inspection and current controls.

**Architecture:** Extend the current model through a separate interior construction module, closed optical/sector geometry helpers, and a deterministic transformation pose sampler. Preserve the original 19 semantic part IDs; add optical cells, four articulated housing panels, guide rails and linkages. The automatic hero and manual interior inspection use the **same components and rig**. Reuse the existing runtime, materials, lighting, inspector and lifecycle controller.

**Tech Stack:** Three.js 0.186.1, TypeScript, Next.js 16.4.3, React 19.3.0, existing Vitest and Playwright. No new runtime dependencies, downloaded models, image-to-mesh services, or raster textures.

**Spec:** The [reference reconstruction brief](#reference-reconstruction-brief), [approved reference set](#approved-reference-set-and-priority), [transformation contract](#automatic-transformation-choreography), [original cutaway](../references/lenus-interior-cutaway-reference.png), current `src/app/(lenus)/lenus/DESIGN.md`, and current runtime `model/lens-spec.json` and factory.

**Execution baseline:** Commit `b04e8c7` (`Add seamless 24-second motion loop and compact HUD to Lenus`). The working tree was clean when inspected. `.img2threejs/state.json` reports **complete**, with its existing review history intact. This document is the planning deliverable; implementation and a new reconstruction run start after plan review.

**Revision — 2026-11-05:** The user approved the six-image assessment and the reference priorities below. This revision supersedes the earlier manual-cutaway-only scope. The original baseline above is historical; recheck HEAD and local changes before execution. This revision changes documentation and archives references only; it does not start a reconstruction run or implement production code.

---

**Execution completed - 2026-11-05:** All eight tasks were implemented natively and the fresh final review fixes verified. Final checks: 1,286 unit tests, 18 production browser tests, build, TypeScript, lint and project checks pass. [Evidence and limitations](../evidence/lenus-interior/README.md).

## Global Constraints

- Canonical source remains under `src/app/(lenus)/lenus/`; preserve route isolation and the compatibility exports in `src/components/optical-lens/`.
- Keep the existing front fluted torus radius **2.26**, tube radius **0.23**, **assembled** maximum outer radius **2.49**, emerald element radius **0.59**, and green color **#00E599**. Deployed panels may extend outside the assembled radius; their full swept bounds must fit the stage.
- Keep the existing glass recipe: `transmission: 0.98`, `roughness: 0.03`, `ior: 1.52`, `dispersion: 0.08`. New optical elements may use thickness-specific clones; do not change the established outer-glass material to compensate for new geometry.
- Keep titanium `metalness: 0.85`, `roughness: 0.25`, the existing procedural surface maps, and lime **#D2F802** / purple **#A855F7** illumination with procedural HDR reflections.
- Keep all original 19 part IDs, their picking behavior, and rear hardware relationships. New containers/cut-surface meshes must not inflate the semantic part count.
- Preserve the **720 × 108px** desktop HUD and its phone layout. Add the cutaway action to the existing icon row, not another tall control card.
- Preserve the **24-second duration and seamless continuity**, pause/resume, drag inspection, focus/explode controls, context recovery, and adaptive resolution. Replace the old full axial turn with the coordinated transformation below; continuous spinning must not rotate the interior out of view. Reduced motion must still mount **no WebGL**.
- Keep current hero camera defaults: yaw **−0.46 rad**, elevation **+0.14 rad**, radius **12**. Inspection gets its own camera preset and conservative bounds fit.
- Existing geometry budget: **200,000 triangles**, **110 draw calls**, **1024px maps**, DPR cap **1.5**, adaptive buffer floor **75%**. Record rendered transmission work separately from model triangle count.
- Preserve the original completed `.img2threejs/state.json` and original sculpt spec. New work uses `.img2threejs/interior/` and a fresh state file; do not erase or relabel previous reviews.
- Reuse the user's approved separate-material validation approach in `.img2threejs/material-validation-override.json` where applicable. Do not reintroduce the known whole-frame color-cluster test for hidden parts, and do not weaken geometry gates.
- No geometry implementation before the interior spec passes `validate_sculpt_spec.py --strict-quality`. No later build pass before the current pass is reviewed and unlocked.

## Review Focus

1. **Actual space inside the old lens:** the existing emerald optic occupies about 0.46 units of axial depth. New glass must not intersect it, the opaque `front-shell`, or the rear assembly. Task 2 tests the expanded layout and Task 4 verifies the real surface envelopes.
2. **Details must be visible:** the automatic loop must reveal the interior without a click. Task 5 tests panel deployment and optical separation; Task 7 checks that selecting an internal part opens manual inspection.
3. **Transparent layers must keep the core readable:** additional transmissive surfaces can darken or obscure the emerald element. Task 6 requires neutral, grazing and reference-match renders, with material-footprint comparisons and a separate green-core visibility check.
4. **Transformation must be coherent and reversible:** one fixed part inventory must unlock, deploy, hold, close and return to the exact opening pose. Test rail/linkage attachments and clearances throughout travel, loop-boundary continuity, and inspection entry/exit at every phase, including pause, drag and context/preference reconstruction.
5. **The new body must fit and stay fast:** increasing depth changes off-axis bounds and overdraw. Task 8 tests representative loop phases, exploded/cutaway views, desktop/laptop/phone sizes and measured rendering budgets.

---

## Reference Reconstruction Brief

### Approved reference set and priority

The six user-generated image files were supplied from `D:/downloads/lenus/interior/` and copied unchanged to `docs/superpowers/references/lenus-interior-transformation/`. All six are **2752 × 1536 JPEG images stored with `.png` filenames**; retain the supplied names and bytes, and use content-aware image decoding for intake. Treat them as **art direction and key-pose evidence**, not six mechanically consistent photographs. Inspect all six before spec authoring. Use repository-relative paths during execution; the Downloads folder is provenance only.

| Reference | Role | Authority and adaptation |
|---|---|---|
| [1.png](../references/lenus-interior-transformation/1.png) | Assembled appearance and finish | Primary new assembled target; retain the existing asset's front-ring dimensions, rear identity and shards rather than copying the longer barrel literally. |
| [2.png](../references/lenus-interior-transformation/2.png) | Initial unlocking | Narrow panel gaps and front assembly separation; infer precise travel and locking rotation. |
| [3.png](../references/lenus-interior-transformation/3.png) | Mechanism and opening | Primary reference for articulated supports, rails, retained panels and attached optical cells. |
| [4.png](../references/lenus-interior-transformation/4.png) | Fully revealed interior | Primary optical-stack and open-pose target: readable curved glass, metal cells, axial gaps and recessed emerald core. |
| [5.png](../references/lenus-interior-transformation/5.png) | Staggered reassembly | Secondary timing/pose inspiration only; do not adopt its extra panel divisions. |
| [6.png](../references/lenus-interior-transformation/6.png) | Near-closed pose | Secondary closing inspiration; recover image 1's emerald visibility and closed silhouette. |
| [Original cutaway](../references/lenus-interior-cutaway-reference.png) | Optical and sectional construction | Supporting evidence for glass curvature, stepped seats, supports and finish; its missing sectors are not a moving-panel rig. |

**Conflict resolution:** image **4** governs the interior, image **3** governs mechanism appearance, and image **1** governs the assembled appearance. The existing accepted asset governs preserved dimensions and semantic IDs. Resolve all poses into one buildable hierarchy before geometry begins:

- Use **four quarter-cylinder housing panels**, each a single rigid part, through the entire loop. Images 5–6 appear to add axial panel divisions; do not copy that changing topology. Far-side hardware is inferred and must be reviewed off-axis.
- Fix **seven optical groups**: three new clear front elements, existing emerald core, two new clear rear elements, existing dark rear objective. The prominent front glass surface in image 4 must map to an existing named element, not appear midway through the loop. Keep the original exterior glass rings intact.
- Preserve the same shapes, scales, panel seams, fasteners and attachment points in every phase. Motion uses rigid transforms; visibility toggles, clipping and shape changes cannot substitute for physical opening.
- Keep the core readable in both closed and open poses; image 6's weak green appearance is not a target. Simplify incidental wiring or ambiguous hardware; select the rails and compact linkages visible in image 3 as the mechanism vocabulary.
- Compress the barrel and deployment spread to fit the existing hero. Reference-camera matches are separate review views; the production camera must also work in the real page layout.

**Archived SHA-256 values** (source basenames preserved):

| File | SHA-256 |
|---|---|
| `1.png` | `6ff20499121a0030fe99c9fc46355fffe68d20a57958d4c59b70ed51a1735645` |
| `2.png` | `f2d786ab6ad88746a82f3f645ec80e8c71de9bd97a980910efbfd6d794338de8` |
| `3.png` | `dfe17ddcbcc62113b5519e67f2495124b66eaf59d9de6e313b4b3e5c3a162a52` |
| `4.png` | `fea205628027200800f1f58d1c5c1f4c9fee23b04b94a235e3d69304fa67ace2` |
| `5.png` | `e8f8a64445c69ec5995ddf64defcd4a258df3db867f6ea803cd93a82f9456ae4` |
| `6.png` | `6b09f2de790441bf03961a2330d8779f806e668b1db8510f1a49db382ffa37df` |

**Suitability:** sufficient for a reference-inspired procedural interior and authored transformation. Further images are optional. Exact hidden construction, hinge dimensions, optical prescription and motion timing remain inferred. The reference set has been visually assessed; formal pipeline admission remains Task 1.

### What the original cutaway establishes

The 1376 × 768 PNG is a three-quarter sectional illustration of a coaxial optical assembly. Its large front glass rim is toward the viewer; a longer housing and rear mount extend behind it. Portions of the outer housing are removed to expose internal curved glass surfaces and stepped metal supports.

| System | Directly observable evidence | Proposed interpretation | Confidence |
|---|---|---|---|
| Front optics | Several clear, curved profiles at different depths | Meniscus, biconvex and thinner compensating elements | High for layered curved glass; medium for exact optical classification/count |
| Central core | Bright convex green element inside concentric clear/green boundaries | Preserve the existing emerald core and recess it into a carrier | High for appearance; medium for internal construction |
| Rear optics | Smaller curved clear surfaces behind the green group | A relay element and a smaller plano-convex element | Medium |
| Mechanical support | Dark annular bands, stepped shoulders and visible glass/metal interfaces | Lens cells, spacers, core carrier and inner barrel | High |
| Sectioned housing | Flat cut faces and matching missing sectors through several layers | Static sectional-construction evidence; moving housing uses the new panel rig | High for the illustrated section; no kinematic evidence |
| Surface detail | Fine directional lines, narrow edge highlights and a few fastener crowns | Brushed metal, shallow ribs, bevels and repeated hardware | Medium; exact counts are inferred |

**Original-reference limitation:** the cutaway establishes appearance and axial relationships, but not a transformation mechanism. Reflections can resemble additional interfaces. The seven-group inventory is an authored design choice supported by the new references, not an exact optical prescription recovered from a picture.

**Reference provenance:** `docs/superpowers/references/lenus-interior-cutaway-reference.png`, copied unchanged from the supplied attachment. SHA-256: `503e0716a39ce84463249b1fd7e55560a9c9c17981b7031259a7fdc979d7ab35`.

### Scope and presentation decision

Build a **reference-inspired internal cartridge with an articulated housing**. The original rings, recognizable front silhouette, green color, rear hardware and shard identity remain. The default hero automatically opens and reassembles. A manual interior mode holds the same rig in a deployed pose from a deliberate side-biased camera. The existing `cutaway` naming may remain in runtime/HUD interfaces, but it now means inspection of the physically opened lens, without removing housing sectors.

The reference is much longer than the existing prop. A literal length match would substantially redesign the hero. Instead, start with a compressed but physically separated stack approximately **2.1 units deep**, measured across the optical body and excluding the detached shards. This requires moving the existing green element and rear assembly rearward. The exact depth is locked only after the blockout/structure review confirms clearance and framing.

The current solid optical body spans approximately `z = −0.63 … +0.285`; the green optic itself spans approximately `−0.21 … +0.25`. Inserting multiple discs into the current space without repacking would cause intersections. The layout task must address this explicitly.

### Proposed optical train

Object coordinates remain **+Y up, +Z front**, with the optical axis along Z. The following are initial modeling dimensions, not measurements recovered from the image. Do not mark them final until clearance and visual review pass.

| Part ID | Status | Shape | Radius | Center Z | Approx. center thickness |
|---|---|---|---:|---:|---:|
| `front-meniscus` | New | One convex and one concave curved surface | 1.05 | +0.16 | 0.105 |
| `front-biconvex` | New | Two convex surfaces | 0.98 | −0.25 | 0.20 |
| `front-compensator` | New | Thinner, lower-sag element | 0.84 | −0.44 | 0.12 |
| `front-lens` | Existing ID preserved | Existing convex emerald optic | 0.59 | −0.78 | 0.46, existing shape |
| `rear-relay` | New | Small biconvex relay element | 0.74 | −1.14 | 0.14 |
| `rear-plano` | New | One plane face and one convex face | 0.54 | −1.32 | 0.10 |
| `rear-lens` | Existing ID preserved | Existing dark rear optic | 0.35 | −1.65 | 0.26, existing shape |

**Task 4 form refinement:** the table reflects stronger optical curvature against image 4, replacing the initial shallow .10/.08 estimates. The primary biconvex depth/diameter ratio increased from .051 to .102; the meniscus carrier moved forward .04 and the next cells moved back .01/.04. The seven optical envelopes still fit the approximately 2.1-unit body, with minimum .03 air gaps. Meniscus center thickness differs from its recentered axial envelope. Lens-cell contact is intentional; glass-to-glass intersections are not. Validate sampled profiles, not just center thicknesses.

Existing layout changes:

- Move `front-lens` from `z = +0.02` to `−0.78` through the new core-carrier hierarchy.
- Translate the existing rear root components (`rear-frame`, `rear-hub`, `rear-seat`, `rear-lens`) by **−1.15 Z**, with their children following exactly once.
- Split the two small radii (`0.615`, `0.66`) out of the current `retaining-beads` mesh set into a new core-retaining group. They must follow the recessed green optic rather than remain inside a new front glass element. Keep the original `retaining-beads` ID for the remaining exterior beads.
- Keep the front outer/inner glass rings in their original **assembled** positions on an axial front carriage. Task 5 repacks the metal retainers to clear real travel: `front-shell` is a wide-bore support (1.38–1.60 radius, .20 depth, z=−.03); `collar-middle` follows the front meniscus cell at local z=−.10 (assembled world z remains +.06); `collar-inner` follows the core carrier at local z=+.17 (world z=−.61), with a .715 bore. Original IDs, glass dimensions and rear-hardware relationships remain. A separate collar-unlock pivot keeps its short rotation independent from user focus. These adaptations supersede the initial fixed-collar assumption and are recorded in the execution ledger.

```mermaid
flowchart LR
  A[Existing front glass rim] --> B[New front meniscus]
  B --> C[New biconvex element]
  C --> D[New compensator]
  D --> E[Existing emerald core in new carrier]
  E --> F[New rear relay]
  F --> G[New plano-convex element]
  G --> H[Existing rear objective and mount]
```

### Mechanical additions

- `internal-barrel`: stepped stationary support frame joining the front structure to the rear module. Start mounting radii near **1.42–1.50**, then solve actual profiles during structure review. Use annular end supports and rails; a continuous opaque inner tube would hide the reveal and is not acceptable.
- `housing-panel-0` through `housing-panel-3`: four closed quarter-cylinder shells on radial slide/pivot hierarchies, with real edge thickness and mounting brackets. Task 5 uses inner/outer radii **2.17/2.23**, depth **1.56**, rear hinge z=**−1.83**, and .24 radial travel before a .58-radian pivot. This clears the preserved 2.12-radius rear flange while retaining the assembled 2.49-radius envelope. Preserve four panels even where the references suggest extra subdivisions.
- `guide-rails`: shared axial rails and carriage sockets for translating the front assembly and optical groups. Cell contacts remain valid throughout separation.
- `panel-linkages`: eight repeated two-arm supports inspired by image 3, each arm .32 units long. Rear anchor posts at radius 2.10 extend .355 units behind the frame; roots use frame-local z=−.465. Solve linked endpoints at each pose rather than independently rotating disconnected bars. The posts and inboard folds keep the supports clear of the rear flange.
- Five named optical cells: `front-meniscus-cell`, `front-biconvex-cell`, `front-compensator-cell`, `rear-relay-cell`, `rear-plano-cell`. The material visibility refinement uses four permanent capped 15-degree retaining clips per cell, linked to four support arms/bearings. This follows the open-sided supports in images 3–4 and clears the reference sightline. Each lens and its cell form one coherent explosion assembly; no geometry disappears during the loop.
- `core-carrier`: stepped support around the preserved emerald optic; the optical path stays clear.
- `spacer-stack`: annular spacers between cells, with real ledges and stable parent relationships.
- `rear-baffles`: thin annular stops near the rear optics, with a visible inner edge and no blockage of the objective.
- `carrier-fasteners`: reuse the existing procedural instanced hardware style. A six-position radial pattern is an inference; the image resolves only part of the hardware.
- `core-retaining-beads`: the relocated small trim rings described above.

The interior-only design proposed **16 new semantic parts**. Four panels plus `guide-rails` and `panel-linkages` bring the initial estimate to **22 new / 41 total**. Lock the registry during structure review; support pivots, repeated hardware instances and edge caps do not inflate the semantic count. Derive the displayed count from the final registry.

### Detail inventory to carry into the sculpt spec

At least these 24 distinct observed/inferred features must have real `localFeatures` or `localOverrides` mappings:

1. Front meniscus curvature and thin perimeter → `front-meniscus` geometry.
2. Biconvex front/back surfaces → `front-biconvex` geometry.
3. Compensator's lower sag → `front-compensator` geometry.
4. Recessed green-core placement → `front-lens` layout/attachment.
5. Rear relay curvature → `rear-relay` geometry.
6. Plano/convex rear profile → `rear-plano` geometry.
7. Positive edge thickness on every new optical element → optical profile descriptors.
8. Small glass edge chamfers → all five optical elements.
9. Axial air gaps → measured layout constraints.
10. Stepped retaining shoulders → optical-cell profiles.
11. Cell-to-barrel contacts → named sockets and contact records.
12. Core-carrier shoulder → `core-carrier` profile.
13. Annular spacer lips → `spacer-stack` geometry.
14. Rear baffle aperture edges → `rear-baffles` geometry.
15. Directional barrel lining → `internal-barrel` normal/roughness locality.
16. Circumferential metal brushing → existing titanium channel recipe.
17. Radially repeated fastener crowns → `carrier-fasteners` instancing.
18. Finished panel boundary faces → closed sector geometry for the four housing panels.
19. Intact exterior glass-ring profiles → axial front-carriage assembly.
20. Relocated polished retaining edges → `core-retaining-beads` geometry.
21. Axial guide rails and moving cell sockets → `guide-rails` and carriage hierarchy, image 3.
22. Panel support arms and pivot crowns → `panel-linkages`, image 3.
23. Consistent closed panel seams and docking shoulders → `housing-panel-*`, images 1–2.
24. Positive optical air gaps in the reveal → shared transformation descriptors, image 4.

Record each feature's reference filename, image region and confidence. Distinguish visible linkage appearance from inferred kinematics. Incidental wiring in generated references is excluded from the agreed mechanism; concentrate on rails, cells and compact linkages.

### Geometry, material and animation contracts

- Optical elements are **closed curved volumes**, made from sampled revolved cross-sections. A scaled flat disc, torus, or photographic projection is not an acceptable substitute.
- Define sag signs explicitly: for a first paraboloid approximation, `q(r) = 1 − (r / radius)²`, `frontZ(r) = edgeThickness / 2 + frontSag × q(r)`, and `backZ(r) = −edgeThickness / 2 + backSag × q(r)`. Biconvex uses positive front / negative back sag; a meniscus uses same-sign sags with positive thickness throughout; plano-convex sets one sag to zero. Center the completed profile's axial envelope before applying its layout position. These are modeling approximations, not an optical prescription.
- Mechanical cells/barrels use closed revolved profiles with actual shoulders. Surface maps may supply microscopic brushing; visible ledges and bevels require geometry.
- The automatic reveal and manual interior view use physical panel deployment and axial separation. All glass remains intact. Address opaque existing collars through carriage travel and actual apertures; do not swap in clipped or hidden housing geometry during the loop.
- A partial lathe without end caps fails. Each panel is a closed shell with finished boundary faces and consistent normals; caps belong to the panel's semantic ID. Original glass-ring geometry stays continuous.
- New optical glass reuses the established clear-glass scalars with thickness-specific material variants derived from the accepted profiles. The initial .10/.08 estimates are superseded by Task 4's stronger curvature. Reuse procedural maps and HDR data; do not project the picture's highlights onto glass.
- Nested real-time transmission is approximate. If the core disappears behind new panes, stop material acceptance and test compositing/visibility strategies. A small procedural opaque emissive backing inside the core is an optional rendering technique, not an observed mechanical component; only add it if the look-dev evidence justifies it.
- In hero mode the 24-second loop continues. In cutaway mode, hold the automatic clock, disable pointer parallax and use a canonical inspection orientation. Manual focus, separation, camera orbit and picking remain available.
- Exiting cutaway restores the saved hero clock/view. Reset returns to the normal hero view. Manual Pause, hidden-tab/offscreen suspension and reduced motion retain priority over automatic movement.

### Automatic transformation choreography

**The loop must expose the interior automatically.** These timings are proposed authored timings, not measurements from the static images. Refine within the 24-second period after pose and clearance review.

| Time | Phase | Required behavior | Reference |
|---|---|---|---|
| 0–3 s | Assembled hold | Recognizable closed silhouette, emerald visible, subtle bounded ambient motion. | 1 |
| 3–6 s | Unlock | Short collar rotation, front carriage starts translating, narrow radial panel gaps; clear seating interfaces before pivoting. | 2 |
| 6–10 s | Deploy | Four panels slide out and pivot on retained linkages; front carriage advances; optical cell groups separate with a deliberate stagger. | 3 |
| 10–15 s | Interior hold | Clearly readable seven-group optical stack, visible core, panels outside primary sightlines; hold mechanical channels still. | 4 |
| 15–20 s | Reassemble | Cells return along their rails; panels close in a stagger after clearance is available. Use one hierarchy and the same travel paths. | 5, secondary |
| 20–22 s | Dock and lock | Seat panels, return front carriage, finish the collar locking rotation. | 6, secondary; finish at 1 |
| 22–24 s | Assembled hold | Exact opening mechanical pose and camera; settle before the loop boundary. | 1 |

- Use a pure `getLensTransformationPose(elapsedSeconds)` sampler driven by the existing single 24-second clock. Define named normalized channels for collar unlocking, front translation, per-panel slide/pivot, and per-cell axial separation. Sample from rest transforms; do not accumulate transforms frame by frame.
- Use smooth monotonic ease-in-out curves with zero endpoint velocity for travel, plus a small bounded stagger. The mechanical character comes from coordinated rigid rotations/slides and deliberate stops. Do not use elastic overshoot that breaches clearances. Closing may have different timing, but must follow the same collision-safe geometric path.
- Preserve the hero camera defaults for closed holds. Ease toward a side-biased reference-inspired view during deployment, hold the view through the interior hold, and restore it during reassembly. Start look development near **+60° yaw / +8° elevation**; lock the final preset through overlay and production-layout review. Keep camera transitions bounded and continuous; fit full-cycle bounds on mode/viewport changes, not per frame.
- Replace the previous continuous 360° spin with bounded motion that keeps the reveal facing the viewer. Coordinate shard/collar ambient channels with the same period and suppress distracting motion during the interior hold. Every animated channel, including camera and shards, must match position/orientation and velocity across 24 → 0 seconds.
- One transform owner composes rest layout, sampled transformation, inspection separation, user focus, and pointer parallax through explicit pivots. `setExplode`, `setFocusRing` and loop application must not overwrite the same transform independently.
- Manual separation enters interior inspection and applies its slider as additional bounded separation on the deployed pose. Retain slider values for inspection; they do not override automatic assembly in hero mode. User focus remains available through its own pivot. Dragging in hero holds the current clock/pose and allows orbit; release resumes from that phase without a jump.
- Interior inspection saves the hero clock, camera and ambient pose, holds the rig fully deployed, and suppresses automatic camera/parallax. Exiting restores the saved phase/view, respecting Pause. Rapid toggles settle to the latest requested mode. Reset sets phase **0**, assembled layout, canonical hero view and default sliders while preserving the user's Pause preference.
- A static reference cannot establish motion quality. Review an actual rendered complete cycle, boundary frames and intermediate sampled matrices before accepting the interaction pass.

---

## File Map

### Runtime source

| File | Responsibility |
|---|---|
| Modify `model/lens-spec.json` | Combined registry, optical descriptors, panel/rail/linkage descriptors and layout/attachment metadata |
| Create `model/lensTypes.ts` | Explicit geometry/layout/rig/pose contracts; avoid an increasingly fragile inferred JSON union |
| Create `model/interiorLayout.ts` + test | Axial packing, rear-module/core offsets, rest poses, carriage sockets and clearance checks |
| Create `model/lensTransformation.ts` + test | Pure 24-second pose sampler, stagger/easing, panel linkage solution and travel descriptors |
| Create `model/opticalLensGeometry.ts` + test | Meniscus, biconvex and plano-convex closed volumes |
| Create `model/opticalProfile.ts` | Renderer-independent profile validation, sampling and recentered envelope metrics shared with layout |
| Create `model/sectionGeometry.ts` + test | Closed revolved panel sectors with real boundary faces and shell thickness |
| Create `model/createLensInterior.ts` + test | Optical train, panel/rail/linkage rig using shared materials and resource owner |
| Modify `model/createOpticalLensModel.ts` + test | Additive dispatch, shared transform ownership, deterministic pose application, picking and disposal |
| Modify `model/lensMaterials.ts` | Thin optical-glass variants and reuse of existing metal channels |
| Modify `model/createOpticalLensScene.ts` | Deterministic phase/inspection setters and reference cameras for capture tooling |
| Modify `scene/lensMotion.ts` + test | Coordinate existing ambient channels with transformation and remove continuous reveal-obscuring spin |
| Modify `scene/LenusSceneController.ts` + test | Single clock, sampled pose/camera, interruption/resume, inspection entry/exit and full-cycle framing |
| Modify `scene/telemetry.ts` | New inspectable parts and derived semantic part count |
| Modify `components/LenusHudControls.tsx` + test | One accessible cutaway icon in the existing controls row |
| Modify `components/LenusOpticalLensCanvas.tsx` + test | Mode state, C shortcut, selection-driven interior reveal and lifecycle persistence |
| Modify `components/LenusLensFallback.tsx` + test | Static assembled and physically opened internal-layer diagrams without a WebGL dependency |
| Modify `DESIGN.md`, `PROMPT.md` | Final architecture, part registry and inspection/motion contract |
| Modify `tests/e2e/lenus.spec.ts` | Real geometry, cutaway interaction, lifecycle and responsive regressions |

All runtime paths above are relative to `src/app/(lenus)/lenus/`. Preserve compatibility exports; only add exports there when a supported external consumer needs a new helper.

### Reconstruction evidence

Use `.img2threejs/interior/` for `state.json`, intake/admission reports, `assessment.json`, detail inventory, `interior-sculpt-spec.json`, generated pass artifacts, material reports, measured kinematics, phase captures, a full-cycle recording and reviews. Include a reference manifest linking all seven images to their roles/hashes and each authored component. Extend the existing capture adapters rather than depending on the skill documentation's missing `runtime/scripts/export_mesh_geometry.mjs` file. The current workspace capture script already emits meshes, part manifests and measured node positions. The archived images are offline reference evidence, not runtime textures or frames to crossfade.

---

## Task 1: Admit the Reference Set and Author the Interior/Rig Sculpt Spec

**Files:** new interior evidence directory, reference manifest and scoped sculpt spec; archived references above.

- [x] Read the complete skill router and the intake contracts named by the next state step. Verify current HEAD/model hashes against the historical baseline and preserve unrelated changes. Copy the six archived keyframes to `$runRoot/references/lenus-interior-transformation/` with their numeric basenames, and the original cutaway to `$runRoot/references/lenus-interior-cutaway-reference.png`. Verify SHA-256 values against this plan.
- [x] Initialize a **new generic-object run**; this is a mechanical prop with rigid transforms, not a character/skeleton workflow.

```powershell
$forgeRoot = 'C:/Users/PC/.img2threejs/releases/a669e9a97cea4452b1c2310c5cca6aa0f6657c1f/img2threejs'
$runRoot = 'E:/orca/workspaces/webflow-projects/codex-session-112-619/.img2threejs/interior'
python "$forgeRoot/forge/state.py" init --state "$runRoot/state.json" --reference "$runRoot/references/lenus-interior-transformation/4.png" --profile generic --spec "$runRoot/interior-sculpt-spec.json"
python "$forgeRoot/forge/next.py" --state "$runRoot/state.json" "$runRoot/interior-sculpt-spec.json"
```

- [x] Run the image probe and reference-admission check for each input. Record observed versus inferred structure, generated-image inconsistencies, and reference-camera limitations. Use image 4 as the primary interior input and manifest entries for the supporting views; admission of one image does not admit the entire set.
- [x] Run `new_pre_spec_assessment.py` with the initial estimate `--complexity complex` and observed search terms: `optical lens meniscus biconvex plano-convex revolved profile retaining cell stepped barrel glass transmission articulated panel linkage radial slide axial carriage`. Raise the tier if the completed assessment warrants it. Use the `core_3d` evidence collection; inspect the returned sources.
- [x] Fill the assessment, quality contract and at least 24 mapped details. Author the **combined** sculpt spec, explicitly marking new/affected component IDs as this run's augmentation scope. Existing accepted components retain their baseline evidence. Include the fixed seven optical groups, four panel IDs, front carriage, rail sockets, link lengths/pivots and phase travel bounds.
- [x] Reconcile all six keyframes using the reference-priority rules. Record an explicit component correspondence table and rejected inconsistencies; every visible front optical surface must map to one fixed part ID. Define rest, unlocking, partial, deployed and closing poses with no changes in topology.
- [x] Define the five critical review systems: optical-stack curvature/order; green-core visibility in closed/open states; rail/cell/linkage attachment across travel; closed panel surfaces and collision-free deployment; preserved exterior and seamless automatic transformation.
- [x] Strict-validate before geometry code. Expected: normal validation and `--strict-quality` both pass. Preserve any `BLOCKED` report and refine the spec instead of generating generic substitutes.
- [x] Record the correction budget before building. Defaults are 3 corrections per pass / 6 total; do not silently raise it or reset history to avoid a stop.

**Deliverable:** an implementation-ready interior/rig spec, reference correspondence and evidence-backed quality contract. This task produces no new production mesh.

## Task 2: Blockout and the Deeper Axial Layout

**Files:** `model/lensTypes.ts`, `model/interiorLayout.ts`, `model/interiorLayout.test.ts`, `model/lens-spec.json`, factory integration.

**Interfaces:** `deriveInteriorLayout(spec): LensLayout`; `validateInteriorClearances(layout): { passed: boolean; violations: ClearanceViolation[] }`. `LensLayout` contains rest transforms, parent/socket IDs, optical Z intervals, carriage/panel/linkage descriptors and assembly/order records. It is plain data and creates no renderer objects. Record full-cycle travel envelopes in addition to assembled dimensions.

- [x] Write failing tests for the proposed optical order, minimum **0.03** optical air-gap target, rear descendants receiving the rear offset once, and the two small retaining beads following the green carrier.
- [x] Run the tests and confirm failures are missing layout behavior, not missing test dependencies.
- [x] Generate only the currently unlocked blockout scaffold. Implement coarse volumes for **all** planned optics, four panels, rail/frame systems and the layout changes in the table. Review rest and statically posed deployed envelopes in clay/map-free mode; preserve accepted exterior detail.
- [x] Reject unknown geometry kinds and unresolved parents instead of creating empty/orphaned pivots through the factory's current fallback paths.
- [x] Capture front, right, rear, left and reference-camera views of closed and coarse deployed poses. Compare assembled shape with image 1 and reveal spacing with image 4. Fit the expanded bounds inside desktop/laptop/phone stages before locking body length and deployment travel.
- [x] Record the blockout decision and sync state. Expected: the optical train occupies real axial space; assembled outer radius remains 2.49; the green element is recessed; rear mount and deployed panel envelopes remain coherent. Record the accepted adaptation from the references' longer proportions.
- [x] Commit the accepted blockout/layout changes.

## Task 3: Structure, Cells and Action-Ready Hierarchy

**Files:** `model/createLensInterior.ts`, its tests, factory/runtime integration and registry.

**Interfaces:** `createLensInterior(context, spec): void`, where `context` supplies the existing root, runtime maps, shared materials, quality tier and geometry/resource registration functions. It must not allocate a second renderer, HDR environment or duplicate full material system.

- [x] Write failing tests that every new semantic ID has built geometry, a stable pivot/socket, material binding, collider metadata and a valid picking route.
- [x] Unlock the structure pass. Build cells, stationary open support frame, carrier, spacers/baffles, four panel pivots, rail carriages, compact linkages and instanced fasteners. Make parent ordering and moving/stationary attachment relationships explicit; a continuous hidden inner barrel must not block the reveal.
- [x] Replace the old explosion inference based only on `sign(base.z)` and component index with assembly-aware axial spacing. Lens + cell + integral trim travel together; existing rear subassemblies remain rigid.
- [x] Test world positions and increasing inter-cell gaps. The old assertion that the emerald node's *local* Z must increase is no longer a valid test once it belongs to a recessed carrier. Verify world-space poses against the current transformation plus inspection offset.
- [x] Create one pose-application path and independent pivots for focus, collar unlocking and front translation. Define `setExplode(0)` as a zero inspection-separation offset; with a zero transformation pose it restores assembly, and with the deployed pose it preserves the deployed rig. Update tests to assert those compositions explicitly.
- [x] Check mechanically linked supports at closed, partial and deployed static poses. Rail sockets must retain each cell; front carriage travel must preserve the glass rings; panels remain attached and retain the same four semantic IDs. Reject independent arm motion that disconnects linkage endpoints.
- [x] Validate new contact surfaces and measured sockets. A generic anchor report with zero applicable worn/held attachments is not proof that lens cells contact the barrel.
- [x] Capture/review the structure pass and run the state gate before proceeding. Commit only after structure is accepted.

## Task 4: Curved Glass and Mechanical Form Refinement

**Files:** `model/opticalLensGeometry.ts`, `model/sectionGeometry.ts`, their tests, refined interior and panel descriptors.

**Interfaces:**

```ts
type OpticalElementProfile = {
  shape: "meniscus" | "biconvex" | "plano-convex";
  radius: number;
  edgeThickness: number;
  frontSag: number;
  backSag: number;
};
type RevolvedProfile = ReadonlyArray<readonly [radius: number, z: number]>;
function buildOpticalElementGeometry(profile: OpticalElementProfile, segments: number): THREE.BufferGeometry;
function buildClosedRevolvedSection(profile: RevolvedProfile, options: {
  segments: number; startRadians: number; sweepRadians: number;
}): THREE.BufferGeometry;
```

- [x] Write failing tests for positive edge/center thickness, correct convex/concave profiles, finite vertices, more than ten distinct axial samples on curved optics, welded seams and closed boundaries.
- [x] Unlock form refinement. Replace the new blockout proxies with sampled curved volumes, real seat shoulders, chamfers and visible baffle edges. Use geometric profile clearance checks at overlapping radii to catch glass/holder intersections that center-Z intervals miss.
- [x] Give planar shoulders/cut faces appropriate normals and curved walls analytic circumferential tangents. Do not reintroduce the previous radial reflection-sector artifact.
- [x] Test legitimate contact tolerances separately from accidental solid interpenetration. Do not insert dark discs to imitate concave volumes or hidden sockets.
- [x] Run geometry integrity/self-intersection checks on actual built geometry, stating sampling coverage and undecided cases. Review front, side and three-quarter cross-sections; material cannot repair an incorrect lens profile.
- [x] Keep the form pass open for Task 5. Commit the geometry checkpoint after its unit checks, but do not record `continue` or unlock materials before closed panel geometry and deployment form review are complete.

## Task 5: Closed Articulated Panels and Deterministic Deployment Poses

**Files:** section geometry helpers/tests, `model/lensTransformation.ts` and tests, factory rig and deterministic scene wrapper.

**Interfaces:** add `getLensTransformationPose(elapsedSeconds): LensTransformationPose` and `LensRuntime.setTransformationPose(pose): void`. Add `setCutaway(enabled: boolean): void` as a compatibility/inspection wrapper for the same physical rig, with state restoration managed by the controller. Preserve maps and `setExplode`, `setFocusRing`, `pickPart`, `dispose` signatures. Add deterministic phase sampling to the capture scene; it must use the real production sampler/application path.

- [x] Write failing tests for closed panel boundaries, unchanged geometry/semantic IDs across poses, intact glass, valid linkage endpoints, and restoration of exact rest transforms at phase 0/24. Repeated sampling and backward time sampling must not accumulate drift.
- [x] Build four finished quarter-cylinder shells, real seams, brackets and docking shoulders. Each shell uses the closed-sector helper; verify boundary edges, winding, thickness and cap normals. Fit seams and intentional mounting contact separately from solid intersections.
- [x] Implement named rig channels and linked travel paths for statically sampled choreography poses, using the single pose-application path. Panels slide clear before pivoting; cells and front carriage move along rails with their trim; no clipping planes, disappearing panels, newly materialized glass or changing part scales.
- [x] Validate sampled intermediate travel, including both directions, phase boundaries, stagger extrema and the most constrained panel/collar crossings. Measure optical air gaps, carriage/rail engagement and linkage endpoint residuals. Record tolerances and sampling coverage; endpoint-only tests are insufficient.
- [x] Capture closed, unlock, partial-open, full-open, staggered-close and near-closed poses with reference cameras. Produce comparisons against images 1–4; use images 5–6 only for closing arrangement and preserve the fixed topology. Check that original opaque collars no longer block the opening.
- [x] Ensure exports/picking report the same semantic parts in closed and open poses, including panel boundary faces. Resource ownership must release panel/linkage geometry and shared materials once without leaks or double-disposal.
- [x] Add deterministic phase and interior-preset capture controls to `createOpticalLensScene.ts`. Review the complete form pass covering Task 4 optical profiles and Task 5 panel/rig geometry. Record the decision, sync state and commit accepted form before unlocking materials. Interactive scheduling and motion-quality acceptance remain Task 7.

## Task 6: Materials, Internal Visibility and Lighting

**Files:** `model/lensMaterials.ts`, scoped material evidence and controlled captures.

- [x] Add material tests for preserved outer-glass/titanium scalars, thin-glass thickness variants, independent maps and shared resource ownership.
- [x] Work the material, surface and lighting passes **one at a time**. Start only the currently unlocked pass. Verify new reference crops visually before finish/PBR extraction; treat bright stripes as lighting evidence, not albedo or surface grooves.
- [x] Reuse existing material families; author only the thin-glass variants and locality the new pieces require. Do not label inferred material evidence as recovered physical truth.
- [x] Capture neutral, grazing and reference-match views of the closed and deployed stack. Compare closed finish/core with image 1 and deployed glass/cells with image 4; use the original cutaway as supporting finish evidence. Require the emerald core to remain distinguishable through the front optics at both ends and during the reveal. Do not reproduce image 6's diminished core visibility.
- [x] Use the approved per-material visible-footprint route, including component-hidden captures. Preserve failed reports; no color/geometry gate is marked passing merely because the whole-image score is acceptable.
- [x] If nested transmission obscures the core, choose one bounded rendering correction, recapture, and record its limitation. Do not change the exterior material scalars or add a painted highlight texture as a shortcut.
- [x] Review/record the material pass before starting surface refinement. Review/record the surface pass before starting lighting. Reuse the procedural HDR environment and two neon rims; adjust scene presentation only when evidence shows the interior is unreadable. Review/record lighting before Task 7 can begin, and commit accepted look-dev.

## Task 7: Automatic Transformation, Interior Inspection and Fallback

**Files:** transformation sampler/tests, existing motion sampler/tests, scene controller/tests, telemetry, canvas/HUD/fallback components and tests.

**Interfaces:** `type LensInspectionMode = "hero" | "cutaway"`; controller method `setInspectionMode(mode: LensInspectionMode): void`. Preserve existing clock/resolution getters and lifecycle methods.

Add HUD props `cutaway: boolean` and `onToggleCutaway: () => void`. Keep the existing four-field `LenusPartInfo` display contract; add pure registry helpers `getSemanticPartCount(): number` and `isInteriorPart(componentId: string): boolean`. Hero visibility is phase-dependent: picking uses the actual posed scene; explicit interior selection enters inspection. Do not encode a single always-visible hero flag or import the renderer into fallback/telemetry UI.

- [x] Test the pure sampler at all phase boundaries, intermediate times and negative/wrapped times. Verify every mechanical, camera and ambient channel matches across 24 → 0, with matching boundary velocity, finite transforms and no accumulated drift. Replace old full-turn assertions with transformation continuity and reveal-hold assertions.
- [x] Integrate the choreography with the existing single animation clock. Automatic opening/reassembly must run without user input; remove the continuous axial spin, coordinate bounded ambient motion, and hold the side-biased camera throughout the interior reveal. Validate scene matrices, not only returned scalar values.
- [x] Test entry/exit to inspection during each phase while running, paused, dragged, separated and focused. On entry save the hero clock/view/ambient pose; hold the fully deployed rig, suppress parallax, and use the canonical reference-inspired inspection view. Repeated toggles must settle to the latest mode without competing transform writers.
- [x] Route manual separation into inspection and apply its retained slider value as additional bounded separation. Focus uses an independent pivot. Keep rendering for manual orbit/focus/separation while the ambient clock is held; explicit actions while paused render immediately. Drag in hero freezes its current phase and permits orbit; release resumes that phase. Test every precedence combination from the choreography contract.
- [x] On exit restore the saved hero phase and view, without counting inspection time; respect manual Pause. Reset sets phase 0, assembled pose, canonical hero camera and default sliders while preserving Pause preference. Context/preference reconstruction preserves mode, phase, adaptive quality, slider values and the saved pre-inspection snapshot.
- [x] Add an accessible icon next to reset/play, with `aria-pressed` and labels `Inspect lens interior` / `Return to automatic hero view`. The interior toggle stays pressed only for manual inspection, independent of automatic open phases. Add **C** only on the focused stage; never steal keys from inputs or sliders.
- [x] Explicit interior selection opens inspection and reveals the selected geometry. Hover only updates readout; it must not switch mode/camera. Verify picking on moving optical cells, panels and linkages; derive the semantic count and test parity between modeled and inspectable IDs.
- [x] Update the SVG fallback with static assembled and opened internal-layer views. The interior toggle remains usable for reduced-motion/blocked-graphics states independently of disabled 3D sliders, and must not activate WebGL or animate. Preserve the server-rendered assembled no-JS preview.
- [x] Record and inspect a complete 24-second cycle, including opening/closing rhythm, stable reveal hold, camera return and wraparound. Pair it with phase comparison sheets. Actual motion review, measured clearances and interrupt/resume checks must pass before accepting the interaction pass.
- [x] Verify 720 × 108px desktop HUD fit, phone wrapping, native keyboard focus and long part labels. Commit the accepted interaction pass.

## Task 8: Optimization, Evidence Gates and Delivery

**Files:** `.img2threejs/interior/` evidence/capture adapter updates, `tests/e2e/lenus.spec.ts`, design/prompt/gallery artifacts.

- [x] Add production browser regressions for automatic unlock/reveal/reassembly without a click, exact loop return, fixed geometry/part inventory, inspection/picking, reversible separation, focus, drag/pause/resume/reset, context loss, reduced motion, phone activation, no-JS and blocked WebGL.
- [x] Measure model triangles including instance multiplicity; target no more than **200k total** and roughly **60k additional** triangles. Record closed, intermediate, deployed and inspection draw calls against **110**. Report transmission-pass triangles/overdraw separately; profile representative phases rather than inferring FPS from triangle count.
- [x] Share materials/maps, instance repeated hardware, and release panel/rail/linkage resources correctly. Optimize without removing identity-defining curved glass, finished panel edges or mechanism attachments.
- [x] Capture a deterministic frozen review set for assembled and fully deployed modes: **0°, 90°, 180°, 270°**, plus matched reference views and grazing detail. Add phase captures at **0, 3, 6, 8, 10, 12, 15, 18, 20, 22, 23.99, 24 seconds** and more samples at clearance extrema. Existing front/rear images remain exterior evidence; the original file named side-profile is not true 90° ground truth.
- [x] Before visual `continue`, read `gates_reference.md` and `self_correction.md` completely; run Tier 1 geometry diagnostics, multi-angle diagnostics, the turntable gate, self-intersection, measured attachments and banded interior difference. Produce one reference/render comparison sheet per reviewed system/view set.

```powershell
python "$forgeRoot/forge/stage4_review/turntable_gate.py" --capture "0=$runRoot/captures/final/0.png" --capture "90=$runRoot/captures/final/90.png" --capture "180=$runRoot/captures/final/180.png" --capture "270=$runRoot/captures/final/270.png" --allow-holes --json
python "$forgeRoot/forge/stage4_review/self_intersection.py" "$runRoot/captures/final/meshes.json" --json
python "$forgeRoot/forge/stage4_review/attachment_anchor.py" "$runRoot/interior-sculpt-spec.json" --measured "$runRoot/captures/final/measured.json" --json
python "$forgeRoot/forge/stage4_review/check_part_coverage.py" --spec "$runRoot/interior-sculpt-spec.json" --manifest "$runRoot/captures/final/parts.json"
```

`--allow-holes` applies to legitimate annular apertures and spaces between deployed components. It does not excuse missing panel boundary faces, absent glass or a self-intersecting shell. Run relevant geometry/attachment checks on closed, intermediate and deployed captures, using directories per pose rather than overwriting evidence. Inspect `sampledVertexCount`, `unmeasuredAttachments`, `missingAzimuths` and fallback mask warnings before accepting results.

- [x] Review critical features independently: curved element order; closed/open core visibility; rail/cell/linkage attachment; closed panel surfaces and collision-free travel; recognizable assembled exterior and seamless automatic loop. Comparison sheets must identify the governing reference and explicitly list the resolved AI-image inconsistencies. Record a truthful decision and scores in review history, sync, and run `next.py` before another pass/correction.
- [x] Run the final project checks:

```powershell
npm test -- --maxWorkers=2
npm run build
node node_modules/typescript/bin/tsc --noEmit
node node_modules/eslint/bin/eslint.js 'src/app/(lenus)' tests/e2e/lenus.spec.ts
npm run check
node node_modules/@playwright/test/cli.js test tests/e2e/lenus.spec.ts --workers=1
```

- [x] Inspect 1440 × 900, 900 × 700 and 390 × 844 captures at closed, maximum deployment, camera-transition and closing phases. Fit full-cycle conservative bounds on resize/mode/separation changes; prevent panel clipping and HUD overlap without zooming every frame. Verify the same 24-second sequence after phone activation and static views under reduced motion.
- [x] Refresh the two gallery images, inline rebuild prompt and copy bundle. Confirm every imported JSON/helper is included and test dependencies remain excluded.
- [x] Record final accepted/approximate features, geometric statistics, runtime limitations and all gate reports. Mark part coverage/action readiness only with actual evidence, complete the scoped state, and commit the verified augmentation.

---

## Completion Criteria

The implementation is complete only when five additional curved optical elements and supporting cells are built and individually inspectable, and the **automatic 24-second loop physically unlocks, opens four attached panels, separates the fixed seven-group optical train, holds a readable interior view, reassembles and returns seamlessly to its opening pose without user input**. The existing exterior identity remains recognizable; the green core is readable in closed/open poses; glass stays intact; panel boundary faces are closed; linkage/cell attachments and travel clearances are measured across the cycle. Manual inspection, focus/separation, drag, pause/reset, context/preference recovery, responsive framing, fallback behavior and rendering budgets must pass their checks. A full-cycle recording and reference/phase comparisons are required evidence; a static cutaway alone does not meet completion.

The finished result is described as a **reference-inspired procedural interior and authored mechanical transformation**, not an exact optical prescription or manufacturing reconstruction. Hidden construction, exact kinematics and the generated references' full barrel length remain inferred or deliberately adapted.

## Planning Self-Review (before native execution)

- [x] Inspected the original cutaway and all six new reference images; reviewed the existing canonical model, controls and motion source.
- [x] Preserved the historical completed reconstruction baseline; verified that the original state still reports complete. New admission/spec/build gates remain unexecuted.
- [x] Archived the six new images unchanged, verified source/archive SHA-256 matches, and decoded their true JPEG format and 2752 × 1536 dimensions; retained the original cutaway and its recorded provenance.
- [x] Distinguished observed structure from inferred counts, dimensions and hidden hardware.
- [x] Recorded image 4 / image 3 / image 1 priorities, fixed four-panel/seven-optical-group topology and explicit resolutions for generated-image inconsistencies.
- [x] Addressed the existing shallow body, opaque front-shell clearance and retaining-bead relocation.
- [x] Replaced the manual-cutaway-only scope with a proposed automatic transformation while retaining inspection as a separate held mode.
- [x] Kept pass order, shared transform ownership, resource lifecycle and user-approved material checks consistent.
- [x] Included phase/clearance/attachment/loop-boundary verification and responsive/lifecycle tests for the five Review Focus conditions.
- [x] Limited this change set to the plan and reference archive; production geometry has not been implemented.

**Recommended execution:** native task-by-task implementation in the current workspace, with strict img2threejs pass reviews and a fresh final code/motion review. Review this plan before starting the new reconstruction run.
