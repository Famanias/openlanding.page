# Final independent review

A fresh read-only reviewer examined the complete implementation range `b04e8c7..bbe7d7f` against the plan, sculpt spec, runtime code, tests and evidence. The review found no Critical issues, three Important issues and no Minor issues. Nothing was declined as outside the specification.

All three Important findings were corrected in one fix pass:

1. **Deployed linkage picking used assembled instance bounds.** The moving arms and crowns now refresh their bounding spheres after matrix updates. A full-model raycast at the reviewer's exact deployed ray failed before the fix and resolves `panel-linkages` afterward.
2. **C toggles lost an active drag.** Inspection no longer clears the controller's drag state while OrbitControls still owns the pointer. The physical mouse/keyboard regression keeps the pointer held through two C toggles, proves automatic time remains held, then verifies orbit still responds.
3. **Renderer reconstruction lost the current hero view.** Snapshots now preserve pointer/parallax and derive the current orbit from the camera, including a drag that has not ended. Browser regressions cover both paused parallax and a physically active drag across reduced-motion reconstruction. The initialized native recovery probe also compares actual camera matrices and model rotation within `1e-10` before and after rebuilding.

The linkage raycast and all three new browser cases were observed failing before the source fix. The final full suite passes **241 files / 1,286 tests**; the expanded production native-GPU suite passes **18/18**. Build, TypeScript, ESLint and isolation/palette/media checks pass.

The browser reconstruction cases use the existing cross-context mean raster tolerance of 3/255. Their pre-fix differences were approximately 12/255 and 31/255; exact initialized matrix checks supplement the screenshot comparisons. The held-drag test advances one virtual second, avoiding an intentional slow-frame resolution fallback that would change raster quality even with a correctly frozen pose.

These fixes change picking bounds and interaction state ownership. They do not alter the accepted optical surfaces, materials, kinematic paths, part inventory or render budget. No second review was dispatched; the required fix pass is verified by the reproducing regressions and full checks.

Deferred minors: **None**.
