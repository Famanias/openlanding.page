# Pitchlane design specification

## Requirements and concept

Pitchlane is a product concept for AI-powered presentation design ("Make ideas land. From the first idea to the final slide."). The page delivers a richly interactive experience highlighting slide narrative generation, kinetic layout tools, and modern presentation workflows. The gallery route serves the same self-contained document as the HTML download, keeping the live preview and offline template identical.

## Palette and type

The palette pairs ink indigo `#17182B` and canvas frost `#F7F8FF` with brand purple `#7654DF`, soft lilac `#E6DFFB`, accent violet `#7A66E9`, coral coral `#FF716C`, and sky blue `#61BBFA`. PitchInter (Inter) provides clean typography across display headers, body narrative, and UI controls. Fonts and assets are embedded as base64 in the standalone document.

## Layout and interactions

The page structure features an impactful hero with dynamic slide previews, narrative chapter highlights, an interactive presentation deck showcase with smooth slide switching, feature deep-dives, workflow benefits, customer testimonials, and an accessible call to action. Interactive slide cards and tabs update live without external server requests.

## Motion and accessibility

Motion is snappy and focused: slide deck transitions, smooth drawer menu animation, and responsive button feedback. The experience honors `prefers-reduced-motion` by simplifying transitions and eliminating ambient motion. All links and controls remain fully keyboard operable with visible focus indicators.

## Files and imagery

`public/downloads/pitchlane.html` is the canonical gallery and download document; `route.ts` serves it at `/pitchlane`. The document embeds all required cover cards, architectural photographs, and font files. `public/gallery/pitchlane.webp` is the gallery capture and `public/templates/pitchlane/preview-1600.webp` is its fallback.
