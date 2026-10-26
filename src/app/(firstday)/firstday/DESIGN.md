# FIRSTDAY design specification

## Requirements

An isolated, fictional learning-by-doing brand at `/firstday`. Next.js 16.4, React 19, TypeScript, Tailwind v4 and Lenis. No purchase, enrollment, network form submission, or external media generation. The user explicitly requested autonomous research and implementation without questions or approval gates. The brand board is retained in `.openlanding-page/firstday/board/`.

## Concept

Experience opens doors, so a miniature campus leads into your first project as you scroll. FIRSTDAY helps early-career people try practical projects with a mentor and a small team. All sample people, projects, outcomes and partner names are fictional.

## Palette

Paper #F5F6F2; graphite #242B29; sage #D3E6D5; moss #778F80; chalk #FFFFFF; stone #E9E9E3; periwinkle #CAD4F1; apricot #F1C7A8. Tints use color-mix. Graphite is the text colour on all light fields. Moss only appears in decorative artwork.

## Type

Manrope display 400–700, DM Sans body 400–600, IBM Plex Mono utility 400–500, via next/font/google with distinct variables. Display 56–106px, section titles 42–76px, body 16–19px, utility 10–12px. Hero has two explicit masked lines with reserved dimensions.

## Layout

A generous pale canvas, restrained top nav, centered two-line headline, and a wide original architectural campus. Floating mission pins create a sense of place. The sections are: hero; fictional network wordmarks; role explorer; sticky project story; learner stories; questions; signup; oversized wordmark footer. At 390px, navigation condenses and the city crops intentionally inside its own container; cards and the story become a natural single column.

## Mechanic

The campus uses original isometric vector geometry, rasterized locally into responsive AVIF/WebP. Hero progress comes from the real section offset and its height and drives only the campus transform and pin transforms. A separate sticky story has three project stages; normalized progress selects the stage, while buttons allow explicit access. Reduced motion and no-JavaScript retain every stage in normal flow. Role filters use allowlisted categories. A native dialog shows the selected project with a brief and a signup deep link. URL selection is validated against the role catalog.

## Motion

Personality: tactile, optimistic. Verbs: gather, arrive. Signature: the miniature campus approaches the visitor before a first-project brief gathers into a sticky workspace. Easing tokens: out cubic-bezier(.22,1,.36,1); expo cubic-bezier(.16,1,.3,1); in-out cubic-bezier(.65,0,.35,1); spring linear(0,.5 15%,1.03 50%,1). Duration tokens 90/180/420/850/1200ms, stagger 70ms. Ambient cycle 8s. One rAF coordinator handles scroll and pointer changes; no React state per scroll frame. Optional Lenis runs only on fine pointers without reduced motion. Ambient effects pause offscreen, in hidden tabs, and through the visible pause control.

| Element | Enter                                    | Scroll                             | Hover/focus                        | Press/state                                                                  | Exit/handoff                             |
| ------- | ---------------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------- |
| Header  | staggered settle                         | compress and progress              | sliding indicator, focus outline   | native anchors, compact menu                                                 | compact fixed header                     |
| Hero    | two masks, campus scale settle, pin rise | bounded campus dolly and pin drift | pins lift, CTA arrow travels       | CTA presses, pause toggles                                                   | city passes beneath network strip        |
| Network | drawn divider                            | native page flow                   | no interactive content             | no stateful control                                                          | white field opens role section           |
| Roles   | masks and cascading cards                | observer entrances                 | card lift, art scale, arrow reveal | category filters; project dialog                                             | field rounds into sage story             |
| Story   | media wipe and drawn stage line          | sticky three-stage reveal          | step button lift                   | stage buttons, explicit selection overrides scroll until next stage boundary | completed receipt settles before stories |
| Stories | staggered quote cards                    | native flow                        | card lift                          | next/previous native carousel buttons                                        | pale field leads to FAQ                  |
| FAQ     | drawn rules                              | observer entrances                 | plus turns and focus ring          | native details unfolds grid                                                  | continuous paper into signup             |
| Signup  | title mask and form settle               | native flow                        | input focus and CTA arrow          | validation, preparing, local success arrival                                 | finished first-day receipt               |
| Footer  | rule draw and wordmark mask              | page progress completes            | underlines draw                    | back-to-top anchor                                                           | final door mark                          |

## Signature details

Doorway/sun logo; map-pin pill labels; mono project codes; numbered project chapters; soft architectural model; local completion receipt. Four reveal styles: mask, rise/scale cascade, clip wipe, line draw.

## Do / Don't

Do keep large quiet type, airy spacing, miniature architecture, restrained sage action fills, and accessible native interactions. Do not copy Zero branding, assets, proprietary fonts, company claims, videos, or scripts. No scroll hijacking, fake enrollment, third-party tracking, or hover-only information.

## Files

Root layout; server page; brand/; sections/; campus/; journey/; motion/; forms/; projects/; assets helpers; icon and social image. Pure progress, role filtering, and validation seams have behavioral tests. The completed rebuild brief lives beside this file.

## Imagery

The campus is original locally authored isometric SVG, kept at `public/templates/firstday/campus.svg`. Processed raster variants come from `assets/incoming/firstday/campus.png` through the repo pipeline. Project artwork is original code-native SVG. No missing media or user-generated assets are required.
