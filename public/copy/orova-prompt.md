# Rebuild OROVA — standalone landing page

Recreate the supplied OROVA experience as one complete, self-contained HTML document at /orova. The canonical source is public/downloads/orova.html, imported from OROVA_Editorial_Reimagined.html. Preserve its copy, responsive layouts, embedded media, inline SVG, styles, and JavaScript. Use native HTML, CSS, Canvas/WebGL, and browser APIs without npm dependencies or external asset requests.

## Concept
An independent creative practice exploring identity, objects, imagery, and the spaces in between. We make it matter: a sculptural optical lens and editorial project studies frame an independent creative practice through form, color, space, gesture, identity, and object.

## Page structure
Typographic hero, manifesto, six selected projects, pinned stories, expertise, approach, studio, and contact.

## Visual system
Preserve the original composition and typography: system sans-serif, Georgia serif accents where present, and monospaced technical labels. Use the supplied palette: #f5f0e7, #e7ded1, #d4c2b0, #1b1e1c, #696964, #d4cec4, #3146be, #f0ab92. Preserve the original inline imagery and procedural artwork rather than substituting unrelated media.

## Interactions and motion
Preserve the six project buttons and native project-viewer dialog with previous/next navigation, expertise controls, mobile drawer, and contact action. Keep the contact action as the supplied concept interaction without inventing a backend.

Retain the original optical-lens WebGL shader, pointer response, masked hero typography, project hover effects, staggered reveals, and three-chapter pinned image wipes with progress indicators. Preserve mobile and reduced-motion fallbacks.

## Integration and verification
Serve the same document at /orova and /downloads/orova.html. Keep it isolated from the gallery styles and application runtime. Register searchable gallery metadata, a real screenshot preview, the copyable rebuild prompt, and the downloadable HTML. Verify desktop and phone layouts, reduced motion, no-JavaScript content, navigation and key controls, and that the route and download return identical content. Keep all demo forms local and render user-entered strings with textContent.
