# GRANDSTAND — design

## Requirements
An isolated Next.js 16 / React 19 theatre landing page. All performances, dates, prices and seat availability are fictional examples. No ticket is booked and no personal data is sent.

## Concept
An evening begins with a place in the house, so a perforated ticket and a stage lead to a real, explorable seating plan. GRANDSTAND is a fictional repertory company with a contemporary playbill voice: direct, warm, a little dramatic.

## Palette
Burgundy #511C2F (theatre ink), parchment #F4E7D1 (paper), vermilion #E45D3D (production cue), teal #102F38 (dark stage), lime #E7F584 (selection and spotlight). Derived tints use color-mix.

## Type
Anton for condensed playbill display, DM Sans for body, IBM Plex Mono for schedules and ticket details. The headline is stacked and sized fluidly; labels are kept short and legible.

## Layout
Masthead and schedule strip; split ticket and proscenium hero; curtain reveal; season calendar with three playbills; 144-seat plan; cast and program; visit and illustrated map; ticket finale and footer. At phone widths the stage follows the ticket, the menu becomes a drawer and the ticket summary stays within reach.

## Seat picker
Three sections, six rows and eight seats per section. Data and selection rules live in seats/model.ts. A maximum of six available seats can be selected. Prices are integers in cents. Buttons select a section and zoom the SVG viewBox. Native section/row/seat controls provide an alternative to the map. A native dialog displays an illustrative receipt without payment or a network request.

## Motion
Cinematic and precise. Verbs: cue and reveal. Signature moment: a curtain opens and stage light rises with scroll to introduce the lead production. Shared easing: cubic-bezier(.22,1,.36,1), 180ms feedback, 420ms state, 800ms reveal, 1200ms hero. Reduced motion shows the finished image, with no scroll-linked movement.

| Element | Enter | Scroll | Hover / focus | Press / state | Handoff |
| --- | --- | --- | --- | --- | --- |
| Masthead | mark and strip settle | progress line tracks page | links underline | drawer opens | anchors lead to sections |
| Ticket hero | heading slides by line | stage light rises | buttons wipe | buttons compress | stage image leads into curtain |
| Curtain | clipped panels | curtain lifts to show performance | production link underlines | anchor leads to season | title joins season strip |
| Season | poster wipes and rule draws | normal flow | posters lift | show tabs swap art | playbill colours lead into seating |
| Seats | diagram and ticket rise | normal flow | seat brightens with outline | select/deselect and zoom | ticket summary opens local receipt |
| Cast and visit | image wipe, text rise | subtle image drift | links underline | map and directions are descriptive | paper gives way to final ticket |
| Footer | type and rules settle | normal flow | links underline | anchors remain usable | back to top |

## Signature details
Perforation, numbered cues, stage-shaped frames, ruled schedules, and oversized condensed production titles.

## Do / Don't
Use the supplied artwork and real HTML text. Do not claim live inventory, sell tickets, or simulate an actual transaction. Keep keyboard and touch access equal to pointer use.

## Files
Brand, sections, seat model and component, motion controller, local assets, responsive CSS, metadata, and browser tests are contained in this route group.

## Imagery
Six user-supplied images, documented in docs/image-prompts/grandstand.md. Source dimensions are smaller than the design targets; processing preserves native detail without enlargement.
