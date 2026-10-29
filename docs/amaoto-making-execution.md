# AMAOTO Making — pinned sequence

Implemented in `E:/orca/workspaces/webflow-projects/codex-session-1028-418` on 28 October 2026.

The Making section now holds one complete viewport composition while native document scrolling advances its ten listed moments. The title, complete step list and model stage remain in place. Each beat updates the active row, accessible current-step state, counter and matching model-part highlight. The umbrella separates and rebuilds within that held stage.

After step 10 has had its own scroll interval, the scene releases over the following viewport and transitions into Commission. Scrolling upward reverses the same mapping. There is no wheel interception or custom scroll trap.

`Making.tsx` separates the native scroll spacer from the sticky inner scene. `makingSequence.ts` defines reversible progress, step and release values. `ScrollDirector.tsx` measures the inner frame, holds its pose/camera/background until release, preserves progress through resize and realigns initial Commission links after client-side pin spacing is established.

Reduced motion, JavaScript-free reading and cramped viewports retain the normal readable layout. Pinning requires at least 640px viewport height on desktop and 740px on the mobile layout so all ten rows and the model remain readable. The mobile pinned model band is shortened to make room for the full list.

Verification:

- 61 rig/controller/framing/sequence/gallery/copy/guard unit tests passed.
- 15 story, framing and Making browser tests passed together.
- Browser checks cover every step on 1440×1000 and 390×844 viewports, fixed frame/list/model bounds, reverse scrolling, release/re-entry, resize, reduced-motion/short-screen fallbacks, direct Commission fragments and no-JavaScript reading.
- Screenshots at steps 01, 05 and 10 were inspected for both viewport classes and saved in `.openlanding-page/amaoto-making-pin-review/`.
- TypeScript, targeted ESLint, palette, isolation and media checks passed. The mechanical style detector returned no findings.
- DESIGN/PROMPT and copy bundles were refreshed. No performance benchmarks, commit or deployment were made.
