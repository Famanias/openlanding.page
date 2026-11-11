# Rebuild ROOTED — standalone landing page

Recreate the supplied ROOTED experience as one complete, self-contained HTML document at /rooted. The canonical source is public/downloads/rooted.html, imported from ROOTED_standalone.html. Preserve its copy, responsive layouts, embedded media, inline SVG, styles, and JavaScript. Use native HTML, CSS, Canvas 2D, and browser APIs without external asset requests.

## Concept
A plant care companion and home botanical organizer: "A little greener, every day." ROOTED helps plant lovers track watering routines, sunlight exposure, growth milestones, and care notes. The experience features an upscaled hero visual of the companion handset framed by potted houseplants and botanical shadow play, an interactive Care Lab, plant profile guides, and local demonstration actions.

## Page structure
Sequential chapters:
1. Hero: Upscaled hero visual featuring the ROOTED phone screen in a terracotta pot with monstera foliage, headline "A little greener, every day", and quick action buttons.
2. Introduction: Editorial manifesto on mindful plant care and home botanical rituals.
3. Story: Pinned routine walkthrough with plant care cards and schedule reminders.
4. Care Lab: Interactive plant care simulator with moisture, light, and humidity adjustments.
5. Guides: Plant care cards covering watering, lighting, repotting, and soil mixes.
6. Botanical Interlude: Full-width atmospheric greenery photography and serene reflection.
7. FAQ: Expandable accordion addressing plant care inquiries.
8. Final CTA & Footer: App preview, download triggers, and local contact demonstration.

## Visual system
Botanical foundation: #F0EEDF warm paper background, #203725 deep botanical ink, #436948 foliage green accent, #7B9C71 soft sage highlight, #B97857 terracotta clay warm accent, #F8F6EC card background tint, #183221 deep forest shade, and #CCD2BF hairline dividers. Typography combines classic serif display headers with contemporary sans-serif interface elements.

## Interactions and motion
- High-resolution hero image scaling responsively across desktop, tablet, and mobile.
- Interactive Care Lab with responsive slider and button feedback.
- Mobile drawer navigation with Escape key dismissal and focus restoration.
- Expandable botanical guide cards and accordion items.
- Local contact form and app download triggers with instant feedback.
- Full reduced-motion and no-JavaScript fallbacks preserving all text and botanical imagery.

## Integration and verification
Serve the same document at /rooted and /downloads/rooted.html. Keep it isolated from the gallery styles and application runtime. Register searchable gallery metadata, a real screenshot preview, the copyable rebuild prompt, and the downloadable HTML. Verify desktop and phone layouts, reduced motion, no-JavaScript content, navigation and key controls, and that the route and download return identical content. Keep all demo forms local and render user-entered strings with textContent.
