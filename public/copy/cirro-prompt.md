# Rebuild CIRRO — standalone landing page

Recreate the supplied CIRRO experience as one complete, self-contained HTML document at /cirro. The canonical source is public/downloads/cirro.html, imported from CIRRO_Standalone_Experience.html. Preserve its copy, responsive layouts, embedded media, inline SVG, styles, and JavaScript. Use native HTML, CSS, Canvas/WebGL, and browser APIs without npm dependencies or external asset requests.

## Concept
An independent creative growth studio combining strategy, inventive creative, and a culture of experimentation. Growth is engineered: service selectors, case-study dialogs, a six-step method, and a configurable growth lab turn the studio story into an experiment.

## Page structure
Photographic hero, manifesto, services, featured work, project gallery, method, growth lab, about, and contact.

## Visual system
Preserve the original composition and typography: system sans-serif, Georgia serif accents where present, and monospaced technical labels. Use the supplied palette: #0a1b14, #10291d, #173b2b, #d3ff61, #f4f5ef, #e7ede4, #0c1b14, #9fb4a7, #a5c3fc. Preserve the original inline imagery and procedural artwork rather than substituting unrelated media.

## Interactions and motion
Preserve the service selector, FUSE/NORTH/HUSH project dialogs, budget slider, creative and channel selectors, signal recalculation, mobile menu, and local inquiry preview. The inquiry must explicitly say that no message was sent.

Retain the hero and footer WebGL light fields, masked heading entrances, staggered reveals, sticky method progression, hover states, and pointer response. Preserve the original reduced-motion and coarse-pointer branches.

## Integration and verification
Serve the same document at /cirro and /downloads/cirro.html. Keep it isolated from the gallery styles and application runtime. Register searchable gallery metadata, a real screenshot preview, the copyable rebuild prompt, and the downloadable HTML. Verify desktop and phone layouts, reduced motion, no-JavaScript content, navigation and key controls, and that the route and download return identical content. Keep all demo forms local and render user-entered strings with textContent.
