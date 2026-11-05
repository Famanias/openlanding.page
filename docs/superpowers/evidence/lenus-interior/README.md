# Lenus interior implementation evidence

Implemented the approved plan natively in the existing isolated workspace. The automatic24-second loop unlocks the lens, opens four attached housing panels, separates a fixed seven-group optical train, holds a side view, and reassembles.41 parts are individually inspectable. Manual inspection, Pause, focus/separation, reset, drag and lifecycle recovery use one pose owner.

Production inspection uses50 degrees to expose the recessed green core; independent reference captures retain60 degrees. The original19 parts, exterior radii and approved material scalars remain. Five new curved optical volumes use open fitted retaining clips and measured guide engagement. The internal fluorescent backing is contained inside the original emerald ellipsoid. This is a reference-inspired procedural interior and authored transformation: barrel length, hidden construction and kinematics are adapted, not a manufacturing reconstruction.

## Verification

- Full unit suite:241 files /1285 tests passed with the existing5-second timeout and maxWorkers2. Earlier concurrent build/software-rendering runs timed out; the isolated final run passed without changing those timeouts.
- Production native-GPU browser suite:15/15 passed. Includes automatic opening/return, manual inspection, keyboard controls, Pause/reset, context loss, preference reconstruction, no-JS, blocked graphics and phone activation.
- Production build, TypeScript, Lenus/e2e ESLint, isolation, palette and media checks passed. Build warnings concern fallback metrics for unrelated fonts.
- Measured model185808 triangles;107 total PBR draw calls, down from153 without deleting geometry.295024 rendered triangles include109216 repeated transmission-pass triangles. Inspection at maximum extra separation also107 calls.
- Native900x700 controller recording: RTX2060 /ANGLE D3D11,92-181 sampled FPS. This is a local headless measurement, not a device-independent guarantee. SwiftShader software rendering measured1-2 FPS.
- Actual production-camera bounds at12 phases and1440x900,900x700,390x844: maximum projected extent.85182; full model stays within the stage. Desktop HUD720x108; phone342x245 with no overlap/overflow.
- Optical gaps at least.03; maximum linkage endpoint residual about6e-8; bearing/track radial clearance.001; measured axial bearing engagement at least.02, including extra separation.193 automatic phase samples plus browser captures cover intermediate travel.
-41 specified/41 built semantic parts;0 coverage errors/warnings. Closed/deployed turntables and original Tier1 geometry gate pass. Closed self-intersection review samples28361 vertices across293 actual solids/instances,0 inside/61 undecided retained points. This is sampled evidence, not exhaustive pairwise collision proof.
- Material family comparisons pass: glass.8845, titanium.9639, emerald.8949, prism.7764. Actual core-green footprints6468 closed,7344 opening,3787 production deployed and1414 reference deployed exceed unchanged projected-area thresholds.
- Native MSAA readback can vary by a single color byte without a new draw. The Pause probe found0 WebGL draws and only2 changed color bytes, maximum1/255. Screenshot freeze tests allow a mean difference below.001; exact pose/matrix loop tests remain exact.

## Evidence

- [Native cycle and inspection recording](automatic-cycle.webm), [motion sheet](motion-sheet.png), [reference4 comparison](reference-comparison.png).
- [Native controller clock/framing/profile](native-controller.json), [inspection budget and contacts](inspection-budget.json), [render budget](render-budget.json).
- [Core visibility](core-visibility.json), [material gate](material-gate.json), [geometry diagnostics](tier1.json), [phase contacts](phase-measurements.json).
- [Closed self-intersection](self-intersection-closed.json), [deployed self-intersection](self-intersection-deployed.json), [closed turntable](turntable-closed.json), [deployed turntable](turntable-deployed.json).
- [Scoped completed reconstruction state](reconstruction-state.json), [implementation decisions and costs](decisions.md). The original reconstruction state/spec are preserved.

The generic plugin runner assumes workspace/.img2threejs/state.json. A faithful snapshot of the scoped completed action-ready state was supplied in an isolated gate workspace; no original state was overwritten. No domain plugin contributed steps, so the unmodified runner returned an empty successful result. Native factory emission remains the existing route-local factory, with no external target/plugin selected.

The gallery images, rebuild prompt and generated copy bundle are refreshed. The bundle includes every runtime helper/JSON and excludes tests. Nothing was published.
