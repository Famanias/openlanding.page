# AMAOTO Anatomy inspector — execution record

Date: 28 October 2026.
Worktree: `E:/orca/workspaces/webflow-projects/codex-session-1028-418`.
Route: `/amaoto#structure`.

## Delivered

The Anatomy chapter is now an assembled object inspector with free selection of the six existing part families. Desktop has projected numbered markers, a compact part index beneath the model and a stable detail column. Mobile retains the opaque model band, with the part index directly beneath it and selected-part framing.

Selection from a marker, mesh or index uses the same controller. Hover/focus previews a highlight without selecting or moving the camera. Each part has its own live anchor, camera direction, fit radius, material label, explanation and action:

- Ribs: emphasise a representative rib or restore all 40. Mesh instance selection supplies the rib index.
- Stretchers: a one-shot linkage cycle follows runner → links → ribs, then restores the saved opening.
- Runner: direct desktop dragging follows the shaft's screen projection, with a keyboard/touch range equivalent. Runner dragging cannot add orbit velocity.
- Thread: trace a connected four-segment path through the existing diamond lacing. Reduced motion gives a static highlighted tie.
- Paper: outside/underneath views and an optional bounded cutaway, preserving the configured colourway.
- Handle: turn the complete object within a grip-focused view. Reduced motion gives an immediate quarter turn.

“Back to overview” and Escape restore the complete open object and clear temporary inspection. Selection/reset changes cancel gestures and stale demonstrations. Chapter exit releases pointer capture, restores paper/rib colours and hands the scene back to the scroll director; re-entry starts in overview. Camera targets and marker leaders use current rig coordinates as the mechanism moves.

The pure state/view configuration is in `scene/anatomy.ts`. `AnatomyControls.tsx` provides the selector, markers and actions. The existing single renderer and persistent instanced geometry remain in use. The model adds inspection colours, paper visibility and live runner/part anchors; no new runtime dependency or renderer was added.

## Verification

- TypeScript and targeted ESLint pass.
- 48 unit tests across rig, anatomy controller/drag mapping, gallery registration/shell, copy bundles and guards pass.
- All 12 combined story/Anatomy browser tests pass. The five Anatomy cases cover: all six views at 1440px and 390px; real model changes and keyboard/reduced-motion controls; interrupted demonstrations and chapter handoff; real projected runner dragging without orbit.
- Palette, isolation and media guards pass. The mechanical style detector reports no findings.
- Visual inspection covered desktop/mobile overview and all six close-ups. Captures are under `.openlanding-page/amaoto-anatomy-review/`. The first pass corrected small mobile selector labels; the final captures preserve useful detail and separation from controls.
- DESIGN/PROMPT, the reconstruction brief and generated copy bundles were refreshed. Without JavaScript, the static six-part descriptions replace the live inspector controls.

No Lighthouse or speed benchmarks were run. No commit or deployment was made. The existing procedural model's photographic/manufacturing approximation limits still apply.
