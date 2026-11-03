# LENUS — Reality is just the start

## Requirements and concept
Build the supplied hero reference as an isolated `/lenus` template. Optical depth is the central idea, so visitors can separate, focus and inspect the completed procedural lens. Its 19 components are authored assets; frontend work preserves their geometry and materials. The plan's count of 16 predates the completed asset.

## Palette
Midnight #08090D, cosmos #10131C, glass #161924, display #F8FAFC, muted #9499A6, lime #D2F802, violet #A855F7, emerald #00E599, button ink #0A0B0E. Model colors are exempt from the interface palette guard.

## Type and layout
Archivo Black for the tall, compressed display; Plus Jakarta Sans for body and navigation; JetBrains Mono for optical measurements. The floating header sits above a 44/56 desktop hero. At widths below 960px, copy and lens stack. Full glass-ring bounds stay inside the stage at every aspect ratio. The HUD belongs below the optical volume: a horizontal strip up to 720px wide and about 108px tall, with part information, assembly actions and sliders in reading order. It stays within its container and stacks on phones. Long part descriptions retain their full accessible text and hover title.

## Mechanic
The route owns its Three.js modules. Compatibility re-exports preserve existing capture tooling. An orthographic camera starts at yaw −0.46 radians and pitch +0.14; half-height is at least 2.75 and expands for portrait stages. Pointer parallax is damped and bounded. The HUD connects to `setExplode`, `setFocusRing` and `pickPart`. Desktop and touch inspection share named components and material telemetry.

## Motion
Personality: technical and cinematic. Verbs: reveal, focus. Easing: cubic-bezier(0.22,1,0.36,1); UI 300ms, entrance 800ms, headline stagger 70ms. Delta-time damping prevents frame-rate-dependent motion.

| Element | Entrance | Scroll / idle | Hover / focus / press | Exit |
|---|---|---|---|---|
| Header | Short downward settle | Fixed floating bar | Underline and visible ring | Mobile disclosure closes on selection |
| Headline | Three masked line rises | Static after reveal | Text selection remains native | Remains visible |
| Copy and CTA | Short staggered rise | Static | Arrow translates; button presses | CTA focuses the stage |
| Optical stage | SVG first, canvas settles over it | Seamless 24-second axial turn, gentle tilt, inner-collar oscillation and counter-orbiting shards | Drag holds the automatic loop; orbit, picking and bounded arrows remain available | Freeze the clock offscreen, behind dialogs or on Pause |
| HUD | Small upward reveal | FPS updates at most once a second | Accessible sliders, reversible explosion | Always usable in fallback mode |
| Dialog | Short rise with opacity | Scrolls within viewport | Native focus trap; validated form | Escape / backdrop / close restore focus |

Signature moment: STEP INSIDE separates the optical assembly and brings its controls into focus. The lens continuously turns around its optical axis over 24 seconds, with bounded harmonic tilt and counter-orbiting glass shards; every channel returns seamlessly to its opening pose. Pointer parallax is composed separately, and dragging holds the loop clock for precise inspection. Desktop starts rendering at idle; coarse-pointer and narrow screens retain SVG until a tap, Enter, or STEP INSIDE activates the scene. The clock and control values survive preference-driven renderer reconstruction. Pause freezes the loop while explicit focus, separation and reset remain usable. No WebGL, parallax, smooth scrolling or ambient motion under reduced motion. The SVG is server-rendered and survives no-JS, blocked WebGL and context loss. Context restoration rebuilds GPU resources before resuming. Slow frames lower drawing-buffer resolution, with device pixel ratio capped at 1.5.

## Signature details
Geometric LENUS lockup; violet START. optical bloom; radial aperture architecture behind transparent glass; selected-part optical telemetry; lime primary actions.

## Files and imagery
`model/` contains the original code-only asset and HDR reflection environment. `scene/` owns rendering and lifecycle. `components/` owns accessible UI. No downloaded geometry, textures or HDR files. Gallery media is a screenshot of the finished route.

## Do / don't
Preserve reference copy, tri-color hierarchy and the completed asset. Keep forms honest: preparing a brief is local and does not claim a message was sent. Do not mount WebGL under reduced motion, announce FPS continuously to screen readers, or steal arrow keys from sliders.

Install dependencies with `npm i three lucide-react` in a Next.js / React / TypeScript / Tailwind project.
