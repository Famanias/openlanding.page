# Rebuild ECHOLOG — standalone landing page

Recreate the supplied ECHOLOG experience as one complete, self-contained HTML document at /echolog. The canonical source is public/downloads/echolog.html, imported from ECHOLOG_threejs_revised.html. Preserve its copy, responsive layouts, embedded media, inline SVG, styles, and JavaScript. Use native HTML, CSS, Three.js, Canvas 2D, and browser APIs without external asset requests.

## Concept
A personal sonic archive application and sound journal: "Keep the moments you can hear." ECHOLOG records voice memories, ambient sounds, and fleeting thoughts in an organized personal audio library. The experience combines an authored procedural 3D Three.js handset with concentric rounded layers, live Canvas 2D sound-field visualizers with interactive mode switching, a working local audio recorder simulator, an interactive sound archive browser, and a local concept newsletter preview.

## Page structure
Sequential chapters:
1. Hero (#hero): Sequential entrance with masked headline typography, live sound field background canvas, 3D handset stage, and bottom metadata.
2. Memories (#memories): Sound memory vignette cards with waveform previews and duration counters.
3. Studio / Recorder (#record): Working interactive voice recorder simulator with peak meter, simulated recording, audio state transitions, and seed samples.
4. Journey (#journey): 3-step spatial capture walkthrough with sticky handset perspectives.
5. Audio Journal (#journal): Interactive sonic archive entry browser with category filters, audio waveform playback triggers, and memory cards.
6. Soundscape (#soundscape): Ambient sound field explorer with live Canvas 2D sound synthesis and Rain / City / Morning mode buttons.
7. Download (#download): Closing call-to-action with concept reservation form, platform badges, and local confirmation feedback.

## Visual system
Continuous dark canvas: #0E0C0C background, #100D0E ink black, #2D1518 oxblood panel shadows, #DB705D coral accent, #E9715E ember glow, #F2C5AE peach highlights, #F5ECE5 ivory typography, and #B99F97 muted technical labels. Typography uses Manrope for display headlines and interface body copy paired with JetBrains Mono for timestamps, readouts, and tabular audio meters.

## Interactions and motion
- Six procedural 3D handset host stages with concentric rounded profiles, real bottom connector cutouts, and dynamic screen textures (record, playback, library).
- Live Canvas 2D sound fields with seeded noise waveforms, glowing particle rings, and smooth 600ms mode blending across Rain, City, and Morning presets.
- Interactive voice recorder simulator with timer counter, simulated peak animation, and local library save/delete state handling.
- Mobile drawer navigation with Escape key dismissal and focus restoration.
- Local concept newsletter form with inline validation feedback and no network requests.
- Full reduced-motion and no-JavaScript fallbacks using model-derived WebP posters and complete semantic text visibility.

## Integration and verification
Serve the same document at /echolog and /downloads/echolog.html. Keep it isolated from the gallery styles and application runtime. Register searchable gallery metadata, a real screenshot preview, the copyable rebuild prompt, and the downloadable HTML. Verify desktop and phone layouts, reduced motion, no-JavaScript content, navigation and key controls, and that the route and download return identical content. Keep all demo forms local and render user-entered strings with textContent.
