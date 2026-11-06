# LENUS â€” Reality is just the start

## Requirements and concept
Build the supplied hero reference as an isolated /lenus template. Optical depth is the central idea. The original19 named parts are augmented with23 interior/rig parts, five new curved optics and four articulated housing shells. References1-6 guide the procedural interior; image4 governs optics, image3 mechanisms and image1 the assembled identity. The compact body, seven-group inventory and authored kinematics resolve inconsistencies between the generated images.

## Palette
Midnight #08090D, cosmos #10131C, glass #161924, display #F8FAFC, muted #9499A6, lime #D2F802, violet #A855F7, emerald #00E599, button ink #0A0B0E. Model colors are exempt from the interface palette guard.

## Type and layout
Archivo Black for the tall, compressed display; Plus Jakarta Sans for body and navigation; JetBrains Mono for optical measurements. The floating header sits above a 44/56 desktop hero. Below 1024px, the native vertical story keeps a compact persistent lens above the copy. Full glass-ring bounds stay inside the stage at every aspect ratio. The HUD belongs below the optical volume: a horizontal strip up to 720px wide and about 108px tall, with part information, assembly actions and sliders in reading order. It stays within its container and stacks on phones. Long part descriptions retain their full accessible text and hover title.

## Mechanic
The route owns its Three.js modules. Compatibility re-exports preserve capture tooling. Orthographic hero camera: yaw-.46, elevation+.14, radius12, half-height max(3.7,3.7/aspect), fixed across the full cycle. Manual inspection uses a50-degree side view with independent orbit, focus and bounded extra separation.42 parts share one picking/telemetry registry. Opaque hardware batches only within a rigid semantic part; independently moving optics, shells and shards remain separate.

## Motion
Personality: technical and cinematic. Verbs: reveal, focus. Easing: cubic-bezier(0.22,1,0.36,1); UI 300ms, entrance 800ms, headline stagger 70ms. Delta-time damping prevents frame-rate-dependent motion.

| Element | Entrance | Scroll / idle | Hover / focus / press | Exit |
|---|---|---|---|---|
| Header | Short downward settle | Fixed floating bar | Underline and visible ring | Mobile disclosure closes on selection |
| Headline | Three masked line rises | Static after reveal | Text selection remains native | Remains visible |
| Copy and CTA | Short staggered rise | Static | Arrow translates; button presses | CTA focuses the stage |
| Optical stage | SVG first, canvas settles over it |24-second unlock, attached-panel deployment, optical separation, stable reveal and staggered reassembly | Drag holds the clock; C opens interior inspection | Freeze clock offscreen, behind dialogs or on Pause |
| HUD | Small upward reveal | FPS updates at most once a second | Accessible sliders, reversible explosion | Always usable in fallback mode |
| Dialog | Short rise with opacity | Scrolls within viewport | Native focus trap; validated form | Escape / backdrop / close restore focus |

Signature moment: an automatic24-second transformation unlocks the collars, lifts the front carriage, slides and pivots four attached shells, separates curved optics along their guides, holds the side view, and reassembles without topology changes. One absolute sampler owns the rig. No continuous axial spin. STEP INSIDE enters Manifesto. The interior icon, C or explicit internal-part selection enters a held deployed inspection state. Exit restores the saved hero clock/view without counting inspection time. Reset returns phase0 and default controls while preserving Pause. Focus and separation render immediately while paused; hover changes readout only. Runtime preference/context recovery preserves mode, hero snapshot, controls and adaptive quality. Initial reduced motion never imports WebGL; its static SVG interior toggle remains usable. Runtime reduced motion retains and suspends an existing renderer. Phones keep the live engine with a controls drawer. Desktop DPR is capped at1.5, compact at1 and slow frames reduce buffer scale to a75-percent floor.

## Signature details
Geometric LENUS lockup; violet START. optical bloom; radial aperture architecture behind transparent glass; selected-part optical telemetry; lime primary actions.

## Files and imagery
`model/` contains the original code-only asset and HDR reflection environment. `scene/` owns rendering and lifecycle. `components/` owns accessible UI. No downloaded geometry, textures or HDR files. Gallery media is a screenshot of the finished route.

## Do / don't
Preserve reference copy, tri-color hierarchy and the completed asset. Keep forms honest: preparing a brief is local and does not claim a message was sent. Do not mount WebGL under reduced motion, announce FPS continuously to screen readers, or steal arrow keys from sliders.

Install dependencies with `npm i three lucide-react` in a Next.js / React / TypeScript / Tailwind project.

## Closed-to-open correction
The default hero is sealed by four solid titanium shutter petals. They physically hide the optical train during the assembled hold, fold outward during unlock/deployment, and reclose after reassembly. The same geometry stays present and unscaled throughout. Exterior glass fragments move clear of the petal sweep. The existing24-second clock and inspection controls remain; reduced-motion/no-JS defaults also show the closed cover. Current inventory42 parts,186992 triangles and109 total PBR calls.

## Closed-to-open correction
The default hero is sealed by four solid titanium shutter petals. They physically hide the optical train during the assembled hold, fold outward during unlock/deployment, and reclose after reassembly. The same geometry stays present and unscaled throughout. Exterior glass fragments move clear of the petal sweep. The existing24-second clock and inspection controls remain; reduced-motion/no-JS defaults also show the closed cover. Current inventory42 parts,186992 triangles and109 total PBR calls.

Manual inspection uses a conservative4.3-unit frustum extent (expanded for portrait aspect) to contain the opened petals and fully separated floating glass through orbit. Automatic hero framing remains3.7; framing changes only on mode/viewport changes. Four fixed mounting posts are baked into the front-shell submission, so the supported cover still costs one additional instanced draw.

## Transformation slider
The primary0-100 slider controls the entire deployment:0 is sealed and100 is fully transformed. Input takes manual control and holds its target; Play resumes from the current position/direction. The same canonical mechanical path is used forwards and backwards, with bounded eased progress and exact endpoints. Manual settling continues while autoplay is paused, stops offscreen/behind dialogs, and survives reconstruction. The HUD keeps its720x108 desktop layout: full-width transformation slider above separation/focus.

The HUD has no parts dropdown. Its compact readout is plain text; transformation, separation, focus and playback controls remain.


## Continuous horizontal experience (current implementation)

The primary specification is docs/superpowers/plans/LENUS_HORIZONTAL_EXPERIENCE_MASTER_PROMPT.md. The original optical factory, procedural geometry and material recipes are preserved. One LenusSceneController, scene, camera, renderer, canvas and assembly serve all seven chapters. The canvas is a sibling of the translated DOM track.

The chapter sequence is Reality, Manifesto, Selected Work, Expertise, Technology, Studio and Contact. Desktop widths >=1024px use one measured GSAP ScrollTrigger pin and a reversible horizontal track. Per the later presentation-style navigation request, each distinct wheel/trackpad gesture now starts one 1.15-second chapter slide; its momentum tail cannot skip chapters. The native document scroll position still coordinates the track and existing engine, with a single easing curve and no second scrub delay. Left/Right keys navigate chapters; Up/Down do the same inside the desktop story. Focused lens, gallery, form and control elements retain their keys. Work measures 140vw and its three concept studies remain locally navigable. Smaller screens keep native vertical touch/wheel scrolling and a compact controls drawer. Initial reduced motion uses the existing SVG without loading WebGL and chapter jumps are instant; changing the preference later suspends and retains the existing renderer. The footer scrolls normally outside the presentation.

story/chapterPoseMap.ts holds absolute camera, placement, separation, deployment, component and light states. story/storyMath.ts interpolates measured unequal chapter widths and shortest camera angles. LenusSceneController applies the authored pose in its existing render loop. Scroll never reconstructs geometry or swaps materials. Projected capability labels and lab hotspots are derived from actual semantic part/socket world matrices and the active camera. Hover/focus selects the actual part with one optional outline draw call.

The hero retains its original loop, fonts, controls and copy. STEP INSIDE now navigates into Manifesto. Header links, chapter index, hashes/history, skip and footer links navigate real sections. Gallery arrows and captured local drag own their gesture. A held model/control gesture wins over scroll; releasing outside the laboratory blends back over roughly .7 seconds, and moving away from a laboratory override blends spatially into the next authored state. The transformation slider still ranges from fully closed 0 to fully transformed 100 and uses the same reversible rig sampler. There is no parts dropdown.

Contact exits into a compact footer sized by its content. The bottom metadata follows the navigation with a 48px gap instead of being pushed to the bottom of a full viewport. Footer navigation clamps to the real page end. Both contact actions reuse the existing local project-brief form in a focus-trapped native dialog; validation and download work, and no message is claimed sent. Study dialogs identify concept work honestly. Keyboard/Escape, blocked-WebGL and no-JavaScript content remain available. Rendering pauses offscreen, in hidden tabs and behind dialogs/menu. Desktop DPR is capped at 1.5, compact at 1, with the existing adaptive floor. Model budget: 186,992 triangles, 109 PBR render calls including transmission; part outline increases this to 110.

Validation: storyMath.test.ts, the existing LENUS unit tests, tests/e2e/lenus.spec.ts and tests/e2e/lenus-horizontal.spec.ts. Proof and limitations are recorded in docs/superpowers/evidence/lenus-horizontal/README.md. The user-requested footer artwork is the only generated raster asset added to this experience: `/templates/lenus/footer-optical-v1.webp`, an 84KB glass-and-titanium macro with lime, violet and emerald reflections. It fades into the footer background, leaves live copy clear and is quieter on mobile. The original procedural optical engine remains interactive throughout all seven chapters; its sticky layers are clipped to the story boundary.
