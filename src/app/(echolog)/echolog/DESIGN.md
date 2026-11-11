# ECHOLOG — imported design

## Requirements
Import the supplied standalone page as an official gallery template while preserving the original design and behavior. Canonical document: public/downloads/echolog.html. Source: ECHOLOG_threejs_revised.html. Authoring model: Gemini 3.8 Flash High.

## Concept
Keep the moments you can hear: a personal sonic archive app and sound journal that captures voice memories, ambient sounds, and fleeting thoughts in one organized, atmospheric experience. The landing page features a procedural 3D Three.js handset with concentric rounded profiles and cutouts, six active phone screen states, live Canvas 2D sound-field visualizers with interactive mode switching, audio recorder simulation, sound journal entry manager, and local inquiry demonstration.

## Palette and type
Palette: #0E0C0C (continuous dark canvas), #100D0E (ink black), #2D1518 (oxblood shadow), #DB705D (coral accent), #E9715E (ember glow), #F2C5AE (peach highlight), #F5ECE5 (ivory reading typography), #B99F97 (muted technical typography). Retain all authored CSS custom properties, panel transparencies, and hairline lines. Typography: Manrope (Display and UI body) and JetBrains Mono (monospaced timestamps, readouts, and tabular meters).

## Layout
Sequential chapters:
1. Hero (#hero): Headline entrance with masked lines, live sound field canvas (#hero .ec-sound-field), 3D procedural handset stage, and bottom metadata.
2. Memories (#memories): Three sound memory vignette cards with audio waveforms and timestamps.
3. Studio / Recorder (#record): Working interactive voice recorder simulator with recording timer, peak meter, state transitions (record/simulated/saved), and seed samples.
4. Journey (#journey): 3-stage spatial capture walkthrough with sticky scroll positioning and procedural handset views.
5. Audio Journal (#journal): Interactive sonic archive entry browser with filter tabs, tags, waveform visualization, and playback triggers.
6. Soundscape (#soundscape): Ambient sound field explorer with live Canvas 2D synthesis and Rain / City / Morning mode buttons.
7. Download (#download): Closing call-to-action with concept reservation form, platform badges, and keyboard-accessible local feedback.

## Mechanic and controls
- Six procedural 3D handset host stages ([data-ec-phone] and [data-ec-screen]) rendered with bounded draw calls and shared lifecycle management.
- Live Canvas 2D sound fields ([data-ec-field="hero"] and [data-ec-field="rain"]) with interactive soundscape mode buttons ([data-soundscape-mode="rain|city|morning"]).
- Interactive voice recorder simulator (#record-sim-btn, #save-to-library-btn, #delete-recording-btn, #seed-voice-sample-btn) with simulated audio waves and timer.
- Mobile navigation drawer (#mobile-menu-toggle, #mobile-drawer) with Escape key dismiss and focus return.
- Local concept newsletter / waitlist form (#footer-concept-form) displaying instant inline feedback (#footer-form-feedback) without network requests.

## Motion
- Hero sequential entrance with masked headline lines and smooth 3D handset elevation.
- Live sound field animation driven by seeded noise and smooth mode blending, capped at 1.5 DPR, automatically paused when offscreen or in background tabs.
- Full reduced-motion and no-JavaScript fallbacks using model-derived WebP posters and complete semantic text visibility.
- Touch viewports down to 320px maintain complete responsiveness with zero horizontal overflow.

## Files and imagery
- route.ts returns the canonical HTML as text/html with UTF-8 encoding.
- PROMPT.md supplies the gallery rebuild brief.
- public/downloads/echolog.html contains the complete standalone document with embedded Three.js model and live sound fields.
- public/templates/echolog/preview-1600.webp and public/gallery/echolog.webp provide browser screenshot previews.
- public/copy/echolog.md includes the route and standalone document in the copy bundle.

## Do / Don't
Keep the supplied HTML byte-for-byte intact, including its procedural geometry, runtime bundles, and inline scripts. Do not introduce cross-template imports, alter the sound field math, add external CDN dependencies, or claim that demo interactions submit private audio or telemetry.
