# LENUS â€” Reality is just the start

## Requirements and concept
Build the supplied hero reference as an isolated /lenus template. Optical depth is the central idea. The original19 named parts are augmented with23 interior/rig parts, five new curved optics and four articulated housing shells. References1-6 guide the procedural interior; image4 governs optics, image3 mechanisms and image1 the assembled identity. The compact body, seven-group inventory and authored kinematics resolve inconsistencies between the generated images.

## Palette
Midnight #08090D, cosmos #10131C, glass #161924, display #F8FAFC, muted #9499A6, lime #D2F802, violet #A855F7, emerald #00E599, button ink #0A0B0E. Model colors are exempt from the interface palette guard.

## Type and layout
Archivo Black for the tall, compressed display; Plus Jakarta Sans for body and navigation; JetBrains Mono for optical measurements. The floating header sits above a 44/56 desktop hero. At widths below 960px, copy and lens stack. Full glass-ring bounds stay inside the stage at every aspect ratio. The HUD belongs below the optical volume: a horizontal strip up to 720px wide and about 108px tall, with part information, assembly actions and sliders in reading order. It stays within its container and stacks on phones. Long part descriptions retain their full accessible text and hover title.

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

Signature moment: an automatic24-second transformation unlocks the collars, lifts the front carriage, slides and pivots four attached shells, separates curved optics along their guides, holds the side view, and reassembles without topology changes. One absolute sampler owns the rig. No continuous axial spin. STEP INSIDE, the interior icon, C or explicit internal-part selection enters a held deployed inspection state. Exit restores the saved hero clock/view without counting inspection time. Reset returns phase0 and default controls while preserving Pause. Focus and separation render immediately while paused; hover changes readout only. Runtime preference/context recovery preserves mode, hero snapshot, controls and adaptive quality. Reduced motion never imports WebGL; its static SVG interior toggle remains usable. Phones activate live rendering on explicit interaction. DPR is capped at1.5 and slow frames reduce buffer scale to a75-percent floor.

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
