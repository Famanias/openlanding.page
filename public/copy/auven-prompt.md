# Rebuild AUVEN — standalone landing page

Recreate the supplied AUVEN experience as one complete, self-contained HTML document at /auven. The canonical source is public/downloads/auven.html, imported from AUVEN_Standalone_Experience.html. Preserve its copy, responsive layouts, embedded media, inline SVG, styles, and JavaScript. Use native HTML, CSS, Canvas/WebGL, and browser APIs without npm dependencies or external asset requests.

## Concept
A premium outsourcing partner combining elite global talent with seamless operational integration. The people behind what's next: a silk-inspired fullscreen depth-map hero, interactive capability explorer, team culture showcase, engagement model selector, and operational process framework.

## Page structure
Silk depth-map hero, marquee ticker, editorial introduction, interactive capabilities explorer, people and culture gallery, engagement model selector, five-stage operational framework, business impact metrics, trust indicators, and contact connection form.

## Visual system
Preserve the original composition and typography: system sans-serif, Georgia serif accents, and monospaced technical labels. Use the supplied palette: #0a151e, #111f2a, #060e14, #a2aeb6, #d7b698, #f0d7bd, #f0eee9, #e2dfd8. Preserve the original inline WebP imagery and procedural artwork rather than substituting unrelated media.

## Interactions and motion
Preserve the capability tab switcher with animated stats and images, interactive model selector cards, mobile drawer menu, and locally handled inquiry submission. The connection form must explicitly confirm that no message was sent without a backend.

Retain the fullscreen depth-map WebGL silk canvas with pointer response, masked headline rises, staggered section reveals, ticker marquee, hover image zoom, and subtle smooth transitions. Preserve the original reduced-motion and coarse-pointer fallbacks.

## Integration and verification
Serve the same document at /auven and /downloads/auven.html. Keep it isolated from the gallery styles and application runtime. Register searchable gallery metadata, a real screenshot preview, the copyable rebuild prompt, and the downloadable HTML. Verify desktop and phone layouts, reduced motion, no-JavaScript content, navigation and key controls, and that the route and download return identical content. Keep all demo forms local and render user-entered strings with textContent.
