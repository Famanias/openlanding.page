# GRANDSTAND — Tonight begins here

Build a self-contained Next.js 16 / React 19 / TypeScript repertory-theatre landing page at `/templates/grandstand`. GRANDSTAND is fictional: every production, venue, date, seat, price and receipt is illustrative. No seat is reserved, no money is taken and no personal data is sent.

An evening begins with a place in the house, so a perforated ticket and a proscenium lead to an interactive theatre seating plan. Use burgundy `#511C2F`, parchment `#F4E7D1`, vermilion `#E45D3D`, teal `#102F38` and lime `#E7F584`. Use Anton for condensed display, DM Sans for body and IBM Plex Mono for utility labels. Repeat ticket perforations, rules, cue numbers and playbill typography throughout.

Build a masthead with a schedule strip and mobile drawer; a left-hand ticket hero with “Tonight begins here” and a large stage photograph; a scroll-driven curtain and lighting cue; a season with three selectable abstract playbills; the seating plan; an ensemble editorial spread; access information and an illustrated venue map; and a ticket-shaped closing invitation and footer. The primary action is “Choose your seat.”

The SVG plan contains three named sections, six rows and eight seats in each row. Show distinct available, selected and unavailable states. Allow up to six seats; selecting or removing a seat updates an illustrative total using integer cents. Provide buttons to zoom to a section and a native section/row/seat alternative. The selected production carries into the summary. A native, keyboard-accessible dialog presents a clearly labeled demonstration receipt. Escape closes the dialog and returns focus; reset clears the selection.

Motion is cinematic and precise: cue and reveal. Slide the hero title into place, open the curtain with scroll, wipe between posters and light the chosen seat. Keep all content visible with reduced motion and without JavaScript. Make every interaction work with touch and keyboard, with visible focus and no horizontal overflow down to 320px.

Use the six supplied images documented in `docs/image-prompts/grandstand.md`; process responsive WebP/AVIF variants without upscaling. Draw the seat and venue maps in SVG/CSS and render all program text in HTML. Register the template with the gallery and its palette and media checks. Test seat selection, limits, totals, selected production, keyboard, mobile, reduced motion and the no-JavaScript fallback.
