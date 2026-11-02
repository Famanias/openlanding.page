# Stillwater design specification

## Requirements and concept

Stillwater is a fictional hospitality collection. The coast sets the pace: an immersive dusk villa introduces an unhurried journey through the spaces and rituals of a private retreat. The gallery route serves the same self-contained document as the HTML download, so the live preview and offline template stay identical.

## Palette and type

Warm oyster `#EEE9E0`, paper `#F4F0E8`, stone `#DED7CA`, espresso `#34332E`, forest `#253733`, deep forest `#182521`, sage `#AEBDAF`, sandstone `#C8AF98`, and ivory `#FAF8F1`. Cormorant Garamond provides the editorial display voice; Inter handles navigation, forms and utility copy. Both fonts are embedded in the standalone document.

## Layout and interactions

The page contains a full-screen photo hero and booking strip, philosophy, three fictional sanctuary details, selectable villa gallery, experiences, journal, statement, inquiry preview, closing image and footer. The mobile hero uses a dedicated portrait photograph. The booking strip transfers its choices into the inquiry form. Retreat details use a native dialog with Escape and focus restoration. Gallery and journal controls update the image and copy. The inquiry validates required fields and date order and previews locally; it does not send data or check availability.

## Motion and accessibility

The motion identity is calm and measured: settle and reveal. The hero image eases from a slight scale while the headline arrives through line masks. Photo sections settle on entry; links and images have restrained hover feedback. Reduced motion suppresses movement. Without JavaScript the page remains readable, the mobile navigation has a fallback, and the inquiry explains that previewing requires JavaScript. Real labels, visible focus and native controls preserve keyboard use.

## Files and imagery

`public/downloads/stillwater.html` is the canonical gallery and download document; `route.ts` serves it at `/stillwater`. The document embeds six original generated WebP photographs and the two font files. `public/gallery/stillwater.webp` is the gallery capture and `public/templates/stillwater/preview-1600.webp` is its fallback. The image direction is recorded in `docs/image-prompts/stillwater.md`. To update the design, edit the standalone HTML and keep any separate local copy in sync.
