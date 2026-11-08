# Rebuild VELORA — standalone landing page

Recreate the supplied VELORA experience as one complete, self-contained HTML document at /velora. The canonical source is public/downloads/velora.html, imported from VELORA_Standalone_Experience.html. Preserve its copy, responsive layouts, embedded media, inline SVG, styles, and JavaScript. Use native HTML, CSS, Canvas/WebGL, and browser APIs without npm dependencies or external asset requests.

## Concept
A fictional instant global money transfer app. Money moves. You don't wait: centered copy framing a sticky interactive globe, live currency converter, seamless transfer flow breakdown, and corridor coverage map.

## Page structure
Sticky globe hero runway, live exchange rates and transfer calculator, interactive 4-step transfer flow, human story showcase, app features split, corridor coverage map, security FAQ accordion, fee transparency overview, final CTA scene, footer, and sign-up dialog modal.

## Visual system
Preserve the original composition and typography: Trebuchet MS and Avenir Next type stacks, and SFMono monospace labels. Use the supplied palette: #06131c, #081925, #0d2631, #8bf4bc, #7ce9e7, #ccff9b, #f4fbf8, #a4bbc5. Preserve the original inline WebP imagery and procedural artwork rather than substituting unrelated media.

## Interactions and motion
Preserve the live exchange calculator with dynamic currency conversion and currency swap, flow stage step switcher, corridor selector with speed estimates, security FAQ accordion, and native HTML dialog signup modal with local success message. The signup modal must explicitly state that no information is sent or saved.

Retain the sticky scroll-linked globe shell with orbit canvas, scroll progress indicator, pulse indicators, hover card elevations, tab transitions, and smooth modal entrances. Preserve the original reduced-motion and coarse-pointer branches.

## Integration and verification
Serve the same document at /velora and /downloads/velora.html. Keep it isolated from the gallery styles and application runtime. Register searchable gallery metadata, a real screenshot preview, the copyable rebuild prompt, and the downloadable HTML. Verify desktop and phone layouts, reduced motion, no-JavaScript content, navigation and key controls, and that the route and download return identical content. Keep all demo forms local and render user-entered strings with textContent.
