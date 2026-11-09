# KINFIELD — movement in your own rhythm

## Requirements
Build the supplied fictional movement studio brief as a complete, isolated gallery template. Every class and reservation is illustrative. Keep supplied imagery and preserve the existing Next.js routes.

## Concept
A contemporary dance program becomes an interactive movement study: portrait frames open into a shared practice stage, a human figure anchors an atlas, and a printed timetable leads to a reservation preview. Mood: tactile, intimate, measured, warm, expressive.

## Palette
Bone #F4EEE6 is the paper, olive #777F5E indicates movement, aubergine #554352 grounds large surfaces, melon #EFAE97 draws attention, and cocoa #352C2C sets type and rules.

## Type
Local system condensed sans for display, system grotesk for text and a system monospace for technical annotations. No network fonts are required.

## Layout
Desktop begins with an asymmetric 23/58/19 triptych and side dock; mobile recomposes around a single portrait. The remaining scenes are a shared principles image, movement atlas, printed class ledger, two asymmetric instructor portraits, reservation sheet and closing invitation.

## Mechanic
An authored SVG figure and shared pivot arc respond to shoulder, hip and spine selections. Each of three levels changes all three steps and the duration. Ledger selection flows into a locally validated preview; no data is transmitted or reservation made.

## Motion
Personality: measured and human. Verbs: trace and unfurl. Signature: the portrait expands beyond the triptych while three movement photographs move in sequence as the visitor scrolls. Tokens: 180ms interaction, 420ms selection, 800ms section, 1.1s entrance; easing cubic-bezier(.22,1,.36,1). 

| Scene | Entrance | Scroll | Interaction | Reduced motion |
| --- | --- | --- | --- | --- |
| Hero | slices, headline and ledger stagger | pinned portrait crossfades and expands | pose selector and CTA feedback | first still, no pin |
| Principles | photo mask | stage arrives from hero | annotation arc pivots with tabs | immediate |
| Atlas | rounded sheet reveal | contained illustration | halo travels and arc pivots, content updates | immediate |
| Ledger | page rises, rules draw | paper handoff | selected row hinges and updates booking | static |
| Teachers | opposing portrait wipes | line traces through spread | photo crop responds | static |
| Session | folded sheet | sheet settles | live summary and stamped preview | immediate |
| Closing | panel unfurls | arc settles | directional arrow | static |

## Signature details
Technical timecodes, hairline annotations, rounded die-cut frames and deliberate white space. All interactive controls expose focus states and touch equivalents.

## Do / Don't
Do retain the supplied portraits and their human focal points. Do provide keyboard, no-JS and reduced-motion fallbacks. Do not make medical claims or imply real availability.

## Files
Isolated under src/app/(kinfield); supplied originals under public/assets/kinfield; gallery registration and tests follow repository conventions.

## Imagery
Six user-supplied WebP files and one MP4. The second instructor is actually named 04-instructor-b.webp. No image generation or external photos.
