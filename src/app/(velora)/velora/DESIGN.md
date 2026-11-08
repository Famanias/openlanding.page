# VELORA — imported design

## Requirements
Import the supplied standalone page as an official gallery template while preserving the original design and behavior. Canonical document: public/downloads/velora.html. Source: VELORA_Standalone_Experience.html. The original authoring model was not specified; the gallery labels it Imported HTML.

## Concept
Money moves. You don't wait. A fictional instant global money transfer app concept. Centered copy framing a sticky interactive globe, live currency converter, seamless transfer flow breakdown, and corridor coverage map.

## Palette and type
#06131c, #081925, #0d2631, #8bf4bc, #7ce9e7, #ccff9b, #f4fbf8, #a4bbc5. Retain all authored CSS tokens, derived colors, Trebuchet MS and Avenir Next type stacks, and SFMono monospace labels from the source.

## Layout
Sticky globe hero runway, live exchange rates and transfer calculator, interactive 4-step transfer flow, human story showcase, app features split, corridor coverage map, security FAQ accordion, fee transparency overview, final CTA scene, footer, and sign-up dialog modal. Preserve authored responsive breakpoints and touch layouts.

## Mechanic and controls
Preserve the live exchange calculator with dynamic currency conversion and currency swap, flow stage step switcher, corridor selector with speed estimates, security FAQ accordion, and native HTML dialog signup modal with local success message. The signup modal must explicitly state that no information is sent or saved.

## Motion
Retain the sticky scroll-linked globe shell with orbit canvas, scroll progress indicator, pulse indicators, hover card elevations, tab transitions, and smooth modal entrances. Preserve the original reduced-motion and coarse-pointer branches.

## Files and imagery
- route.ts returns the canonical HTML as text/html with UTF-8 encoding.
- PROMPT.md supplies the gallery rebuild brief.
- public/downloads/velora.html contains the complete original page, including embedded assets.
- public/templates/velora/preview-1600.webp and public/gallery/velora.webp are actual browser captures.
- public/copy/velora.md includes the route and standalone document; public/copy/velora-prompt.md contains this template's rebuild prompt.

## Do / Don't
Keep the supplied HTML byte-for-byte intact, including its inline scripts and media. Do not introduce shared runtime imports, replace the design, add external dependencies, or claim that local demo interactions send messages or save signups.
