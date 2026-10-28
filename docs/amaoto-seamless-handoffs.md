# Continuous Amaoto handoffs

Implemented in `E:/orca/workspaces/webflow-projects/codex-session-1028-418` on 28 October 2026.

Before changing the motion, all existing work was committed as `ba46004` (`Build Amaoto interactive wagasa story and responsive staging`) and pushed to `origin/Famanias/codex-session-1028-418`, as requested. The continuous-motion revision is available locally for review.

The umbrella remains fully opaque throughout the story. There is no chapter opacity controller or invisible slot switch. For desktop side changes, document-space copy bounds define a clear corridor: the object eases smaller in its outgoing column, glides across the gap, then grows into its incoming column. The three crossings are Hero → Anatomy, Light → Colourways and Colourways → Making. Same-side slots interpolate directly, adjusting width smoothly before approaching text reaches their vertical span. Phone and tablet band dimensions interpolate continuously.

The movement depends only on scroll position, so reversing scroll retraces it. Reduced motion immediately chooses a clear still slot, with no animated travel or fading. Whole-umbrella camera fitting and the original model, chapter poses, controls and native Making sequence are preserved. The colourway turning caption now sits below the swatches inside the measured copy column so the moving umbrella cannot cross it. No copy was changed.

## Verification

- 38 Amaoto unit tests passed across six suites. The staging suite covers all three crossing routes at one-pixel scroll intervals, text clearance, viewport containment, continuous rectangle movement, reverse sampling, same-side resizing, shared bands and reduced-motion still slots.
- All 14 Amaoto browser tests passed: four separate viewport cases test fully opaque forward/reverse handoffs at 1024×768, 1024×700, 1280×800 and 1440×900; the other ten cover chapter visibility, controls, intro, keyboard access, raycasting and no-JavaScript reading. The original combined handoff matrix exceeded its time budget, so each viewport now has its own bounded case and reads geometry in one browser evaluation.
- TypeScript, targeted ESLint, isolation, palette and media checks passed. The style detector reported no findings.
- The supplied screenshot script captured 25 whole-scroll frames at each of 390×844, 600×960, 768×1024, 820×1180, 1024×768, 1024×700, 1280×800 and 1440×900. All eight contact sheets and selected full-resolution crossing frames were visually reviewed. Horizontal overflow was zero at every size.
- The supplied edge detector sampled 25 positions at each of those eight sizes (200 samples). Eight raw flags were reviewed: seven were Commission rain rings, and one showed the same rings during Making's release. No umbrella cut-offs were observed. These are the known decorative rings, not an empty raw report.
- A focused final confirmation repeats Colourways → Making at five scroll positions at all eight sizes after moving its caption. It checks opacity, overflow and desktop copy/caption clearance and saves 40 review images.

The whole-scroll captures and edge report are retained at `E:/orca/workspaces/webflow-projects/.openlanding-page/amaoto-shots/seamless-1028/` and `E:/orca/workspaces/webflow-projects/.openlanding-page/amaoto-shots/edges-seamless-1028/`. The final confirmation is in this worktree's `.openlanding-page/amaoto-seamless-confirm/`.

No dependencies were added. The local preview remains at `http://127.0.0.1:3100/amaoto`.
