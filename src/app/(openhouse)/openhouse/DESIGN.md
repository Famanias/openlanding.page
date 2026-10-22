# OPENHOUSE design

<!-- Hallmark · shape: Workbench · genre: modern-minimal · theme: Coral (deal 1/3, seed ac6d2332) · job: book · idea: "A small-business landing page is a lit front door, so the threshold opens the right invitation and the form settles into a clear handoff." · vibe: "warm, tactile, assured, quietly optimistic" · imagery: built stationery, no photographs · signature: the door sign settles open
 * axes: light/grotesk-sans/warm · contrast: pass · fold: pass · v2.0.0 -->

## Requirements

- One measurable action: book a 20-minute growth call.
- No navigation menu, testimonial, logo wall, invented metric, quote, or business proof.
- The form validates locally and states that it is not connected yet.
- The page is useful as a reusable small-business conversion template.

## Concept

OPENHOUSE is a fictional conversion studio for owner-led businesses. The page feels like a front desk: a visitor chooses the work the page should do, supplies only a name and email, and sees the threshold settle open when the form is complete.

## Palette and type

The palette uses warm paper (`#F7F2E9`), ink (`#171414`), cotton (`#FFF9F0`), desk (`#EDE5DA`), board green (`#344A3E`), terracotta (`#D86B4A`), deep terracotta (`#A9472E`), muted type (`#6B6359`), and brass-like rules (`#C7B9A8`). All values live in `tokens.css`.

DM Sans is used for display and body text; Geist Mono is reserved for the small utility role. Labels stay sentence case and untracked.

## Layout

The Workbench shape opens with a two-column banner: a direct promise on the left and a compact booking surface on the right. Outcomes use a ruled list, fit uses a dark board with three service types, process uses a three-column desk strip, and the close returns to the same form with a sticky booking bar.

## Signature details

1. The threshold light grows from the bottom edge when the form is focused or a goal is chosen.
2. The “Ready when you are” sign changes its dot from rule grey to terracotta.
3. The close uses the same booking surface, so the page keeps one conversion object rather than inventing a second CTA system.

## Motion

Personality: organic and analog. Verbs: **unfurl** and **settle**. The hero rises in a short sequence; sections use mask-rise, clip-safe rise, drawn rules, and paper-settle reveals. The page progress line is updated from one requestAnimationFrame loop. The signature moment is the threshold light and status dot settling open after a valid form submission. Under reduced motion, all content is visible and finished, the progress line is static, and no reveal or ambient motion runs.

| Element | Enter | Scroll-linked | Hover / focus | Press / state | Exit / handoff |
|---|---|---|---|---|---|
| Header | drops into place with the hero | stays pinned and translucent | logo keeps a clear focus ring | none | paper hands to desk |
| Hero promise | staggered rise | none | none | none | desk continues below |
| Threshold form | paper settle | light tracks focus and chosen goal | fields change paper step | button presses and success disables | close returns to the form |
| Outcome list | rule draw and row rise | none | arrow lifts | none | paper hands to board |
| Fit board | mask-rise head, card settles | none | no pointer effect on non-interactive items | none | board hands to desk |
| Process strip | row draw | progress line advances | none | none | desk hands to ink |
| Close form | paper settle | sticky action remains at the bottom of the close | button fill changes | success text replaces idle copy | footer closes the visit |

## Files

- `layout.tsx` — route shell, metadata, fonts, no-JS fallback.
- `openhouse.css`, `tokens.css`, `base.css` — Hallmark stamp, palette, responsive layout, motion and states.
- `brand/Logo.tsx`, `icon.svg`, `opengraph-image.tsx` — identity assets.
- `forms/booking.ts`, `forms/BookingForm.tsx` — validation and local conversion state.
- `motion/Reveals.tsx`, `motion/ScrollVars.tsx` — seek-safe reveals and one scroll rAF loop.
- `sections/` — hero, outcomes, fit, process, and closing form.

## Material

No real business material was provided. The page uses built stationery and truthful placeholder-free copy. A real business can replace the offer sentence, goal labels, and form endpoint without changing the system.
