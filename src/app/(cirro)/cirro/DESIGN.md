# CIRRO — imported design

## Requirements
Import the supplied standalone page as an official gallery template while preserving the original design and behavior. Canonical document: public/downloads/cirro.html. Source: CIRRO_Standalone_Experience.html. The original authoring model was not specified; the gallery labels it Imported HTML.

## Concept
Growth is engineered: service selectors, case-study dialogs, a six-step method, and a configurable growth lab turn the studio story into an experiment.

## Palette and type
#0a1b14, #10291d, #173b2b, #d3ff61, #f4f5ef, #e7ede4, #0c1b14, #9fb4a7, #a5c3fc. Retain all authored CSS tokens, derived colors, system font stacks, serif accents, and technical labels from the source.

## Layout
Photographic hero, manifesto, services, featured work, project gallery, method, growth lab, about, and contact. Preserve authored responsive breakpoints and touch layouts.

## Mechanic and controls
Preserve the service selector, FUSE/NORTH/HUSH project dialogs, budget slider, creative and channel selectors, signal recalculation, mobile menu, and local inquiry preview. The inquiry must explicitly say that no message was sent.

## Motion
Retain the hero and footer WebGL light fields, masked heading entrances, staggered reveals, sticky method progression, hover states, and pointer response. Preserve the original reduced-motion and coarse-pointer branches.

## Files and imagery
- route.ts returns the canonical HTML as text/html with UTF-8 encoding.
- PROMPT.md supplies the gallery rebuild brief.
- public/downloads/cirro.html contains the complete original page, including embedded assets.
- public/templates/cirro/preview-1600.webp and public/gallery/cirro.webp are actual browser captures.
- public/copy/cirro.md includes the route and standalone document; public/copy/cirro-prompt.md contains this template's rebuild prompt.

## Do / Don't
Keep the supplied HTML byte-for-byte intact, including its inline scripts and media. Do not introduce shared runtime imports, replace the design, add external dependencies, or claim that local demo interactions send messages or save signups.
