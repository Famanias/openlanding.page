# ECHOLOG phone and living sound fields

Status: revised standalone implemented and verified; official gallery integration remains a subsequent step. This is an adaptation of the supplied ECHOLOG design, not a new brand concept.

## Intent and scope

Preserve the supplied page's coral light, warm dark atmosphere, typography, copy, section order and working demos. Replace every baked phone presentation with the same procedural Three.js handset. Reconstruct the hero and section 005 sound fields as animated 2D graphics. Make the handset credible at front, grazing and footer angles before replacing the existing artwork.

Original: `D:/downloads/helpx/ECHOLOG_threejs_standalone.html`. Keep it intact. First produce a revised standalone review copy under `.openlanding-page/echolog/`; official gallery registration follows successful visual review. The user authorized the next step after an audit, and has supplied the existing artwork as reference; no additional image generation is needed.

## Reference evidence

The original contains five unique embedded raster assets. Extracted originals, lossless PNG conversions, source hashes, admission result, grid zones and visual observations are in `.openlanding-page/echolog/references/`. The main phone reference is `phone-library.png`; `phone-record.png` and `phone-footer.png` supply oblique and bottom hardware cues. `soundscape.png` supplies the waveform, particle and halo direction shared by the current hero and section 005.

The main reference passed technical and deterministic admission checks. Admission proves decodability and usable image structure; it does not isolate the handset from the luminous scene or establish exact dimensions. This is a fictional handset inferred from illustration, not a reproduction of a catalogued commercial phone. Rear geometry is unobserved; use a quiet neutral rear panel and avoid inventing a branded camera system.

## Handset silhouette and geometry

All dimensions below are relative design targets. They are not manufacturing measurements. Coordinate frame: Y up, front +Z, origin at handset center. The casing remains a shallow hard-surface object.

| Layer | Width | Height | Corner radius | Role |
| --- | ---: | ---: | ---: | --- |
| Outer frame | 1.870 | 3.880 | 0.260 | Main silhouette; total depth 0.220 |
| Bezel and cover glass | 1.810 | 3.820 | 0.230 | 0.030 inset per edge |
| Active display | 1.714 | 3.724 | 0.182 | 0.078 inset from frame per edge |

These outlines share corner centers: `(width/2 - radius, height/2 - radius)` is identical for each. The glass and display must therefore fit the casing without square corners or an uneven curved bezel.

Build the frame from a rounded 2D profile with a separate extrusion and edge bevel. Front silhouette radius must never be clamped by thickness. An initial 0.018 edge bevel with four depth segments and 24 curve segments is appropriate for the first form review; measure actual triangle count before optimization. Normalize display UVs from its planar bounds. The active display is a rounded shape mesh, not an unmasked plane.

The frame is the factory's root transform and parent of the rear and front assemblies. Components: frame, rear panel, bezel, display, front glass, sensor island, sensor lens, action control, volume up, volume down, power control, bottom hardware. Capture their neutral transforms before applying explosion offsets.

The sensor island is a 0.480 × 0.135 capsule at approximately Y 1.64. Place its lens within its right end. Use asymmetric side controls: action and two volume controls on the left rail, one power control on the right. Model antenna seams, connector recess and speaker openings where they affect close-up appearance. Speaker count and exact spacing are inferred design choices. Port openings must be actual geometry with visible cavity depth, not dark patches over a solid bottom rail.

The pipeline's generic descriptors do not yet prove custom rounded-profile or cutout emission. Confirm that support, then carry every custom refinement back into the machine-readable spec. Do not assume validation means the generator understands an arbitrary extra JSON property.

## Surface and lighting

Frame: warm neutral satin metal, initial albedo `#A79A92`, metalness 1.0 and roughness 0.28. Bezel/island: `#080707`, metalness 0.0 and roughness 0.30. Rear panel: `#262124`, roughness 0.38; inferred. Glass: dielectric IOR 1.5, roughness 0.08, restrained grazing highlights. Display: sRGB canvas texture with tone mapping disabled so ivory text and coral controls remain legible.

These values are starting look-development targets, not recovered physical measurements. Coral and cream streaks belong in the environment and lighting. Never bake them into the metal's base color. Independent roughness variation may represent fine brushing only where supported by close-up evidence; do not add arbitrary wear or noise to clean glass and screen content to satisfy a generic checker.

Validate neutral, grazing and warm reference lighting. Use a broad soft key, weaker neutral fill and coral rim; start at ACES filmic exposure 1.05. Create procedural studio reflections, with no external HDR dependency. Keep front glass reflections narrow enough to leave screen labels readable. Floating poses have no ground contact shadow; the record presentation may use a procedural plinth and soft contact shadow.

Uniform-finish applicability is recorded in `references/material-applicability.json`; the source cannot establish exact reflectance and no extracted PBR maps are claimed. The existing strict validator's evidence-bearing textureless contract applies to these clean substrates. A task-local adapter makes the pass checker honor the same rule; the installed skill and all screenshot/geometry thresholds remain unchanged.

## Screen system

One drawing system provides three states: `record`, `library`, `playback`. Use Manrope for headings/body and JetBrains Mono for timing and small instrument labels, consistent with the supplied page. Wait for fonts before the first final texture upload.

- Record: ECHOLOG wordmark, status bar, waveform, time ruler, recording control and two recent-memory rows.
- Library: Memories title, search affordance, category pills and three coherent memory cards.
- Playback: selected title, waveform, transport control, elapsed time and progress.

Preserve intentional memory names such as Late night rain, Misty morning and Sunday cafe chatter; correct garbled generated lettering. Draw UI directly in screen coordinates. A phone photograph projected onto the display would double its perspective and preserve the old hardware, and is therefore unsuitable.

Update texture only when state, progress or visible waveform changes. Keep UI clear of the island, rounded corners and home indicator. Use a 768 × 1536 texture initially, with a lower-resolution mobile tier if needed. Screen content can be visual-only where existing HTML controls provide the accessible interaction.

## Placement map

| Placement | Screen | Presentation |
| --- | --- | --- |
| Hero | Record | Upright slight oblique pose; restrained pointer response |
| Record | Record | Oblique close-up with procedural halo/plinth |
| Journey Capture | Record | Compact pose matching the active capture panel |
| Journey Relive | Playback | More upright pose, selected memory visible |
| Memory Library | Library | Upright readable view within existing media frame |
| Download | Playback | Reclined oblique view with bottom rail visible |

All six placements use the same geometry and material definitions. They may use independent screen textures. Use one renderer with visible-view viewport/scissor rendering, or a bounded visible-instance pool; never mount six unconditional full-page render loops. Stop inactive journey panels and offscreen views. Resource sharing must include reference-counted disposal so unmounting one view cannot dispose another's geometry.

Fallbacks may use posters rendered from the completed model. They must not use the old baked phone art. With JavaScript disabled, reduced motion enabled or WebGL unavailable, the page remains complete and accessible. Reduced motion presents a still model-derived poster and starts no heavy animation engine. This is the intentional still alternative to the live phone.

## Living 2D sound field

Use one deterministic Canvas 2D drawing module with two compositions, not a displaced static image. Draw the luminous artwork itself: waveform bundles, elliptical instrument rings, short radial marks, restrained particles and broad pre-rendered glow sprites. Cache expensive glow elements and avoid repeated full-frame blur/shadow work.

Palette remains `#0E0C0C`, `#100D0E`, `#2D1518`, `#DB705D`, `#E9715E`, `#F2C5AE`, `#F5ECE5`, `#B99F97`. Existing screen thumbnails can have content colors. Keep the top headline area quiet. Pixel ratio cap: 1.5 for the 2D background; lower quality tiers reduce particles and curve samples without changing composition.

| Mode | Wave motion | Particle behavior | Tempo |
| --- | --- | --- | --- |
| Hero | Broad continuous low-amplitude strands; slow instrument drift | Sparse drifting embers | Quiet, 24-second base period |
| Rain | Fine irregular pulses over a stable envelope | Many small short-lived transients | Dense, restrained |
| City | Wide low-frequency swells with secondary interference | Fewer heavier pulses | Slow, weighty |
| Morning | Sparse upper-frequency ripples over a low envelope | Delicate upward points | Spacious, light |

Section 005 buttons must drive these parameters, caption, technical label and pressed state together. Interpolate parameters over 600 ms, with interrupted transitions resuming from the current state. These are visual studies, not measured spectra or automatic microphone-driven output. Do not add audio playback, network calls or permission prompts to background interaction.

The existing floating SVG ribbon should be absorbed into the field so the foreground curves and luminous background form one composition. Pointer displacement is optional, small and limited to fine pointers. Touch gets ambient life without hover dependence. Reduced motion renders a complete still field and changes modes immediately.

## Hero choreography

Preserve headline readability throughout the sticky sequence. Use one pure progress calculation based on the actual hero bounds and one coordinated timeline for copy and phone. On a normalized 0–1 scroll interval: copy holds from 0–0.15, fades/translates from 0.15–0.42, and reaches opacity zero by 0.42. Phone movement holds until 0.42 and rises from 0.42–0.82, then holds for the handoff. Reverse scrolling must restore the same poses. Do not leave partially faded copy over the handset.

Phone and field motion share visibility and page-lifecycle scheduling. Active screen regions must never cover a visible CTA. Small screens need their own framing target so the settled handset is contained within its stage. Initial partial entry may remain intentional, but both CTA buttons stay visible and operable before the scene starts. No repeated relayout or changing hero height after initialization.

## Model quality contract

- Moderate-complexity fictional hard-surface prop with 12 named components and at least nine evidence-mapped small features; the draft inventory contains 12.
- One reusable factory, deterministic geometry/noise, separately named clickable parts, reversible explosion in the review viewer only.
- Initial performance targets: at most 24,000 triangles and 45 draw calls per handset; target 60 fps on a representative desktop. These are budgets, not benchmark results.
- Review front, front oblique, right, rear, left and bottom oblique; include top/bottom corner and connector close-ups. Rear views test plausibility and assembly only; they cannot be scored against an unseen reference.
- No square display corners, floating controls, open seams, self-intersections, reversed normals, visible texture stretching, unreadable labels or baked handset photography.
- Reference admission and schema validity are not visual acceptance. Each build pass needs screenshots, the required deterministic gates, a comparison sheet and recorded visual judgment before the next pass unlocks. Never report an unmeasured pass as accepted.

## Staged delivery

1. Complete material evidence and factory-compatible spec descriptors. Strict-validate before code emission.
2. Build and compare blockout, structure and rounded form in an isolated review viewer. Review corners before adding surface polish.
3. Finish screen states, materials and lighting; validate six views, attachment geometry, clickable part coverage and explosion reset.
4. Implement the two 2D field compositions and mode transitions.
5. Create the revised standalone review copy, replace all six phone placements, coordinate hero movement and test fallbacks.
6. Integrate the reviewed result as `/templates/echolog` using the gallery's current registration/export conventions. Registration, export, thumbnails and publication are subsequent delivery work, not completed by this specification.

## Current artifacts and limits

`.openlanding-page/echolog/ECHOLOG_revised.html` is the review copy. The source modules, references, assessment, sculpt spec and local state preserve the reconstruction decisions. Eight ordered model passes have screenshot and diagnostic evidence; strict specification validation, isolated TypeScript checks, six logic tests and three checker-adapter tests pass. Browser checks cover the six placements, live study modes, existing controls, mobile layout, no-JavaScript/reduced-motion/WebGL fallbacks, delayed fonts, context loss/restoration and idle rendering. Framing was also inspected visually at desktop and mobile sizes.

Measured model budget: 11,180 triangles and 18 draw calls, with 12 named parts and five integral seam/earpiece meshes. This is a real-time approximation of the supplied illustration; the rear remains inferred and thumbnail art is procedural. The final edge roll is 0.012 after form refinement; the main 0.260 corner radius remains independent of 0.220 frame depth. The original HTML and all gallery source remain unchanged.
