# Rebuild VYRA — standalone landing page

Recreate the supplied VYRA experience as one complete, self-contained HTML document at /vyra. The canonical source is public/downloads/vyra.html, imported from VYRA_Standalone_Experience.html. Preserve its copy, responsive layouts, embedded media, inline SVG, styles, and JavaScript. Use native HTML, CSS, Canvas/WebGL, and browser APIs without npm dependencies or external asset requests.

## Concept
A sound-design concept with sculptable frequency fields, interactive presets, and a visual studio for shaping ideas. Sound you can shape: procedural wave fields become a hands-on visual sound studio with adjustable texture, intensity, spread, motion, and character.

## Page structure
Wave-field hero, manifesto, interactive studio, features, frequency chapter, preset library, process, pricing, and waitlist finale.

## Visual system
Preserve the original composition and typography: system sans-serif, Georgia serif accents where present, and monospaced technical labels. Use the supplied palette: #f5f7fb, #edf2f8, #111b32, #101a31, #64718a, #d9e0ec, #39c9dd, #77ebed, #8488f4, #b9f4e7. Preserve the original inline imagery and procedural artwork rather than substituting unrelated media.

## Interactions and motion
Preserve Harmonic Drift, Glass Tide, Pulse Mesh, and Afterimage presets; Flow/Focus/Fray character selection; intensity/spread/motion sliders; field reset; library filters and previous/next controls; monthly/yearly pricing; mobile menu; and locally validated waitlist feedback. No signup data is submitted or saved.

Retain the procedural hero field, animated studio canvas, scroll-linked feature selection, frequency-line transformations, process progress, library movement, and tactile control states. Keep the original background-tab, viewport, and reduced-motion guards.

## Integration and verification
Serve the same document at /vyra and /downloads/vyra.html. Keep it isolated from the gallery styles and application runtime. Register searchable gallery metadata, a real screenshot preview, the copyable rebuild prompt, and the downloadable HTML. Verify desktop and phone layouts, reduced motion, no-JavaScript content, navigation and key controls, and that the route and download return identical content. Keep all demo forms local and render user-entered strings with textContent.
