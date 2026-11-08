# Rebuild NEMA — standalone landing page

Recreate the supplied NEMA experience as one complete, self-contained HTML document at /nema. The canonical source is public/downloads/nema.html, imported from NEMA_Transparent_Cloud_Footer.html. Preserve its copy, responsive layouts, embedded media, inline SVG, styles, and JavaScript. Use native HTML, CSS, Canvas/WebGL, and browser APIs without npm dependencies or external asset requests.

## Concept
A fictional conversational AI workspace for questions that become ideas, research, and creative projects. Think out loud. Go further: an editorial AI workspace combining a live conversation shell, interactive artifact studio, spatial workbench, structured research dossiers, and curated collections.

## Page structure
Interactive conversation hero, marquee ticker, editorial statement, artifact chapter with step progression, spatial workbench with draggable cards, dark research dossier, travel collection showcase with sidecard, interactive project map, prompt slips, transparent pricing table, FAQ accordion, cloudscape finale, and accessible modal dialog.

## Visual system
Preserve the original composition and typography: Arial/Helvetica sans-serif, Georgia serif italic accents, and Courier New monospace labels. Use the supplied palette: #f8f2ea, #f3ece4, #342d46, #756b7e, #e67c61, #b7cdb7, #e8d9e5, #dcd3d0, #fffdfb. Preserve the original inline WebP imagery, cloudscape backgrounds, and procedural artwork rather than substituting unrelated media.

## Interactions and motion
Preserve the interactive conversation input and prompt chips, draggable workbench cards, research tab switcher, artifact viewer dialog, interactive map stage with connected svg nodes, collection selector, and local newsletter form. All forms must explicitly state that no details are submitted or stored.

Retain smooth in-view entrance reveals, spinning orbit motifs, floating sticker transforms, ticker marquee, hover card tilts, and dialog transitions. Preserve the original reduced-motion and coarse-pointer branches.

## Integration and verification
Serve the same document at /nema and /downloads/nema.html. Keep it isolated from the gallery styles and application runtime. Register searchable gallery metadata, a real screenshot preview, the copyable rebuild prompt, and the downloadable HTML. Verify desktop and phone layouts, reduced motion, no-JavaScript content, navigation and key controls, and that the route and download return identical content. Keep all demo forms local and render user-entered strings with textContent.
