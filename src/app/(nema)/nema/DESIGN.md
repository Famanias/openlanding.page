# NEMA — imported design

## Requirements
Import the supplied standalone page as an official gallery template while preserving the original design and behavior. Canonical document: public/downloads/nema.html. Source: NEMA_Transparent_Cloud_Footer.html. The original authoring model was not specified; the gallery labels it Imported HTML.

## Concept
Think out loud. Go further. A fictional conversational AI workspace for thinking, researching, writing, and creating. An editorial AI workspace combining a live conversation shell, interactive artifact studio, spatial workbench, structured research dossiers, and curated collections.

## Palette and type
#f8f2ea, #f3ece4, #342d46, #756b7e, #e67c61, #b7cdb7, #e8d9e5, #dcd3d0, #fffdfb. Retain all authored CSS tokens, derived colors, Arial/Helvetica sans-serif typography, Georgia serif italic accents, and Courier New monospace labels from the source.

## Layout
Interactive conversation hero, marquee ticker, editorial statement, artifact chapter with step progression, spatial workbench with draggable cards, dark research dossier, travel collection showcase with sidecard, interactive project map, prompt slips, transparent pricing table, FAQ accordion, cloudscape finale, and accessible modal dialog. Preserve authored responsive breakpoints and touch layouts.

## Mechanic and controls
Preserve the interactive conversation input and prompt chips, draggable workbench cards, research tab switcher, artifact viewer dialog, interactive map stage with connected svg nodes, collection selector, and local newsletter form. All forms must explicitly state that no details are submitted or stored.

## Motion
Retain smooth in-view entrance reveals, spinning orbit motifs, floating sticker transforms, ticker marquee, hover card tilts, and dialog transitions. Preserve the original reduced-motion and coarse-pointer branches.

## Files and imagery
- route.ts returns the canonical HTML as text/html with UTF-8 encoding.
- PROMPT.md supplies the gallery rebuild brief.
- public/downloads/nema.html contains the complete original page, including embedded cloud textures and art-directed photography.
- public/templates/nema/preview-1600.webp and public/gallery/nema.webp are actual browser captures.
- public/copy/nema.md includes the route and standalone document; public/copy/nema-prompt.md contains this template's rebuild prompt.

## Do / Don't
Keep the supplied HTML byte-for-byte intact, including its inline scripts and media. Do not introduce shared runtime imports, replace the design, add external dependencies, or claim that local demo interactions send messages or save signups.
