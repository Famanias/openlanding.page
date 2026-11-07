# OROVA — imported design

## Requirements
Import the supplied standalone page as an official gallery template while preserving the original design and behavior. Canonical document: public/downloads/orova.html. Source: OROVA_Editorial_Reimagined.html. The original authoring model was not specified; the gallery labels it Imported HTML.

## Concept
We make it matter: a sculptural optical lens and editorial project studies frame an independent creative practice through form, color, space, gesture, identity, and object.

## Palette and type
#f5f0e7, #e7ded1, #d4c2b0, #1b1e1c, #696964, #d4cec4, #3146be, #f0ab92. Retain all authored CSS tokens, derived colors, system font stacks, serif accents, and technical labels from the source.

## Layout
Typographic hero, manifesto, six selected projects, pinned stories, expertise, approach, studio, and contact. Preserve authored responsive breakpoints and touch layouts.

## Mechanic and controls
Preserve the six project buttons and native project-viewer dialog with previous/next navigation, expertise controls, mobile drawer, and contact action. Keep the contact action as the supplied concept interaction without inventing a backend.

## Motion
Retain the original optical-lens WebGL shader, pointer response, masked hero typography, project hover effects, staggered reveals, and three-chapter pinned image wipes with progress indicators. Preserve mobile and reduced-motion fallbacks.

## Files and imagery
- route.ts returns the canonical HTML as text/html with UTF-8 encoding.
- PROMPT.md supplies the gallery rebuild brief.
- public/downloads/orova.html contains the complete original page, including embedded assets.
- public/templates/orova/preview-1600.webp and public/gallery/orova.webp are actual browser captures.
- public/copy/orova.md includes the route and standalone document; public/copy/orova-prompt.md contains this template's rebuild prompt.

## Do / Don't
Keep the supplied HTML byte-for-byte intact, including its inline scripts and media. Do not introduce shared runtime imports, replace the design, add external dependencies, or claim that local demo interactions send messages or save signups.
