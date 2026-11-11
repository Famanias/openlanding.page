# ROOTED — imported design

## Requirements
Import the supplied standalone page as an official gallery template while preserving the original design and behavior, enhanced with the upscaled hero visual. Canonical document: public/downloads/rooted.html. Source: ROOTED_standalone.html. Authoring model: Gemini 3.8 Flash High.

## Concept
A little greener, every day: a thoughtful plant care companion and botanical routine organizer. Keep track of watering schedules, light requirements, growth milestones, and care notes for houseplants. The experience features an upscaled tactile hero handset composition nestled in live greenery, botanical care guides, interactive care lab simulator, growth journals, and downloadable local inquiry.

## Palette and type
Palette: #F0EEDF (warm cream paper foundation), #203725 (deep botanical ink), #436948 (foliage green accent), #7B9C71 (soft sage highlight), #B97857 (terracotta clay warm accent), #F8F6EC (card tint), #183221 (dark forest shade), #CCD2BF (muted hairline borders). Retain all authored CSS custom properties, delicate botanical borders, and typography. Typography: Georgia serif accents paired with clean contemporary sans-serif for UI clarity.

## Layout
Sequential chapters:
1. Hero: Upscaled hero visual featuring the ROOTED mobile companion app framed by potted monstera and natural light shadows, headline "A little greener, every day", and quick action buttons.
2. Introduction: Editorial manifesto on unhurried plant care and home botanical rituals.
3. Story: Pinned routine walkthrough with plant care cards and schedule reminders.
4. Care Lab: Interactive plant care simulator with soil moisture, lighting, and misting indicators.
5. Guides: Three illustrated plant care guides with watering, repotting, and lighting rules.
6. Botanical Breathing / Interlude: Full-width atmospheric botanical visual.
7. FAQ: Expandable accordion addressing common plant care questions.
8. Final CTA & Footer: App download callout, routine preview, and local contact form.

## Mechanic and controls
- High-resolution hero composition with clean responsive scaling.
- Interactive Care Lab simulator with adjustable sunlight, moisture, and temperature controls.
- Mobile drawer navigation with Escape key dismissal and focus restoration.
- Expandable botanical guide cards with interactive drawer / modal views.
- Local contact and download action demonstration with inline feedback.

## Motion
- Natural gentle reveals and subtle parallax on botanical imagery.
- Smooth accordions for plant care questions.
- Responsive button press feedback and magnetic hover effects.
- Full reduced-motion and no-JavaScript fallbacks preserving all text and botanical imagery.

## Files and imagery
- route.ts returns the canonical HTML as text/html with UTF-8 encoding.
- PROMPT.md supplies the gallery rebuild brief.
- public/downloads/rooted.html contains the complete standalone document with the upscaled hero image.
- public/templates/rooted/preview-1600.webp and public/gallery/rooted.webp provide browser screenshot previews.
- public/copy/rooted.md includes the route and standalone document in the copy bundle.

## Do / Don't
Keep the supplied HTML byte-for-byte intact with the upscaled hero visual. Do not introduce cross-template dependencies, alter botanical care formulas, add external CDN dependencies, or claim local demo interactions send data to external servers.
