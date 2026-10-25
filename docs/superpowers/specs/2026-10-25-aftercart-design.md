# AFTERCART Shopify care landing template design

## Intent

AFTERCART is a fictional Shopify care partner for small, owner-led shops. The page sells an ongoing care relationship: store improvements, fixes, and growth support. The primary action is booking a care call through a local-only demo form.

The template fills a gallery gap between generic small-business conversion pages and product showcases. It makes service operations tangible through a living store-health console built from original SVG and CSS interface illustration.

## Goals

- Give a small Shopify merchant a clear reason to book a care call.
- Make ongoing service feel concrete through a service console that changes as care tracks are selected.
- Keep the full page useful with JavaScript disabled and with reduced motion enabled.
- Ship a complete isolated template with a typed mechanic, validation tests, accessible controls, responsive layout, and gallery registration.

## Non-goals and anti-goals

- No real Shopify API, analytics, checkout, network request, or stored lead.
- No invented client logos, testimonials, awards, or business claims.
- No stock or generated photography; all visual material is original DOM/SVG interface art.
- No generic SaaS dashboard treatment, dark neon palette, or hover-only information.

## Approaches

1. **Living store health console (chosen):** a set of care tracks drives a pure status model and updates the console readout. It directly connects the page mechanic to ongoing Shopify care and is distinctive in the gallery.
2. **Store-floor walk:** a pinned route through store operations. It supports a strong story but overlaps with existing route and journey templates.
3. **Audit workbench:** a problem selector assembles a repair plan. It is practical but close to existing fit-brief and conversion mechanics.

## Concept

A shop is a living system, so the page becomes a pastel store health console whose signals rebalance as a visitor explores the care tracks. AFTERCART's voice is attentive, specific, calm, and operational: “Keep the shop ready for the next customer.”

Sections are the status header, hero, living health console, four care tracks, a sample work log, care rhythm, booking form, FAQ, and footer. The console offers four selectable tracks: Conversion, Merchandising, Speed, and Retention. Each track has a starting status, a target status, a short service description, and a work-log line. Selecting a track changes the active signal, progress ring, readout, and work-log emphasis.

## Palette

- Ink `#4C4668`: text, dark console surface, rules.
- Paper `#FFF7F3`: page background and light surfaces.
- Lilac `#DCCFF4`: primary pastel signal and selected state.
- Mint `#BFE7D3`: healthy state and secondary signal.
- Peach `#FFCCB8`: attention state and warm highlight.
- Butter `#F5E8A7`: notice state and rare emphasis.
- Sky `#BFD8F0`: quiet system tint.

Pastels are used for surfaces and signals; readable text remains ink on paper or paper on ink. Tints come from `color-mix()` of these colors. No new literal colors are introduced in the route.

## Type

- Display: Manrope 700/800, `--font-aftercart-display`, fluid `clamp()` sizing.
- Body: Inter Tight 400/500/600, `--font-aftercart-body`.
- Utility: JetBrains Mono 400/500, `--font-aftercart-mono`, uppercase labels and readouts.

## Layout

The page uses a warm paper canvas with a restrained dot-grid and receipt-like rule field. A sticky header compresses as the visitor scrolls. The hero pairs an editorial promise with a compact console preview. The health console is a two-column stage on wide screens and a stacked interactive panel on phones. Care tracks use rounded cards with clear active state. The booking section returns to the console language with a compact form and honest local-demo status.

## Mechanic: the store health console

`console/health.ts` owns the typed care-track data and pure state transitions. `selectTrack(state, id)` changes the active track, derives the displayed score and status, and preserves the selected set. `getHealthSnapshot(state)` returns the current score, label, progress, and signal labels. Unknown track ids leave the state unchanged. `console/HealthConsole.tsx` owns buttons, the ring, signal bars, status copy, and work-log readout.

The static server render includes every track and its copy. The client enhancement adds state changes and a progress CSS variable. Under reduced motion, the same state changes are immediate and no ambient loops run.

## Motion

### Identity

Technical/cinematic, expressive. The verbs are **scan** and **reveal**. The signature moment is the console rebalancing: the active status ring draws, the four signal bars settle into a new profile, and the work-log ticket slides into focus when a care track is selected.

### Tokens

Use the standard motion tokens in `aftercart.css`: ease-out `cubic-bezier(.23,1,.32,1)`, expo `cubic-bezier(.16,1,.3,1)`, in-out `cubic-bezier(.77,0,.175,1)`, spring linear easing, and 90/180/420/800/1200ms durations. Reveal shift is 28px and stagger is 70ms.

### Motion map

| Element | Enter | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
|---|---|---|---|---|---|
| Header | Drops in after the hero background settles; nav staggers | Compresses and gains paper blur after 80px | Underline draws; logo mark nudges | Menu toggle morphs on phones | Hero paper hands to console tint |
| Hero | Mask-rise headline, label slide, console scale settle | Readout and background grid drift by small CSS variables | Console preview lifts; CTA fill wipes | CTA scales `.97`; focus ring remains | Scales down as console section overlaps |
| Health console | Panel wipe and signal bars draw | Stage progress line follows section progress | Track cards lift and indicator slides | Selection rebalances ring, bars, ticket and `aria-live` copy | Dark panel hands to paper work log |
| Care tracks | Staggered card rise and icon draw | Cards keep a small y-depth offset | Active card lifts and pastel surface shifts | Button selection uses spring settle | Last card hands to rhythm strip |
| Work log | Rule draws, rows rise | Readout counter advances once in view | Ticket border brightens; arrow nudges | Filter buttons press and update selected row | Paper hands to dark booking panel |
| Care rhythm | Three steps reveal left-to-right | Progress line marks current step | Step card lifts | Step state snaps to selected marker | Strip dissolves into booking form |
| Booking form | Field group and button rise | Sticky CTA bar compresses | Inputs shift 4px and button wipes | Error nudge, loading label, success stamp | Success panel replaces form with a soft scan |
| FAQ/footer | Disclosure rules draw | None | Summary arrow rotates; links underline | Native disclosure opens with spring | Footer closes with a final rule draw |

## Signature details

1. `STORE HEALTH / 04` console label and a live status ring.
2. Pastel signal bars named `conversion`, `merch`, `speed`, and `retention`.
3. A work-log ticket that mirrors the active care track.
4. Tiny packaging-label metadata such as `CASE 026`, `NEXT CHECK`, and `CARE WINDOW`.

## Do / Don't

Do use specific service language, readable state labels, original SVG interface shapes, rounded 6–10px geometry, and one clear call CTA. Keep status changes understandable without motion.

Don't imply real integrations, fabricate merchant results, use Shopify's logo, hide copy behind hover, or add a second competing conversion goal.

## Files

`layout.tsx` loads fonts and metadata. `aftercart/aftercart.css` holds tokens, layout, motion, and responsive states. `brand/Logo.tsx`, `icon.svg`, and `opengraph-image.tsx` define the identity. `console/health.ts` and `console/HealthConsole.tsx` implement the mechanic. `forms/booking.ts` and `forms/BookingForm.tsx` implement local validation and success. `motion/` contains in-view and scroll-variable primitives. `sections/` holds the page sections. `assets.tsx` and `assets.generated.ts` keep the standard placeholder contract even though this version uses no photo assets.

## Imagery

No photos or video are required. The optional prompt document records directions for replacing the coded console art with merchant-tool still life illustrations later. The default page uses only CSS, inline SVG, and DOM UI illustration.
