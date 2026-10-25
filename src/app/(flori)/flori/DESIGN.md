# Flori — a little flower club

## Requirements
An isolated, complete fictional flower subscription template at `/flori`. Take Satsuma's playful craft and spatial composition as a quality reference. User explicitly requested immediate implementation without questions or approval gates. Pastels only; no brutalism, utilitarian styling, halftones, grain, or dotted patterns. No paid media. Install: `npm i next react react-dom lenis`.

## Concept
Flowers gather stem by stem, so the page lets you compose a bouquet that follows you into signup. A flower club for ordinary days, with editorial botanical art and an interactive arrangement rather than a generic product grid. Every offer and claim is fictional sample content.

## Palette
Cream #FFF9F0 page; fern #344C40 all text/actions; blush #F1C6CF cosmos; lilac #D8D1EC iris and panels; pistachio #D9E6C8 section; butter #F5DF9B flower centres; apricot #EDB997 poppies; sage #91AAA0 foliage. Derive tints with color-mix. No black or arbitrary white. Fern text throughout, pale controls have fern labels.

## Type
Lora 500 roman/italic display, Outfit 400/500/600 body/UI, Caveat 500 handwritten marginal notes; all next/font/google with unique variables. Display 48–100px, section display 38–64px, body 16–18px, labels 13px. Explicit hero breaks and reserved art dimensions prevent layout shift.

## Layout
Cream canvas, generous gutters, quiet navigation, a centered two-line hero above five fanned botanical postcards. Follow with a scalloped pistachio promise band, weekly collection, a lilac bouquet composer, an asymmetric club story, three subscription options, a spacious signup, and a large wordmark footer. Soft round shapes without heavy borders or nested panels. Desktop max width 1240px; mobile 20px gutters and a three-card hero crop.

The hero postcards form a continuously moving carousel. Each slot follows the arc rather than translating a rigid fan: `x` wraps through ten slots, height is `abs(x / pitch) * 23`, and rotation is `x / pitch * 7` degrees, capped at 24 degrees. Automatic travel is 24px/s. Recycled slots wrap outside the viewport; the second set reuses the original SVG groups through `<use>` and stays out of the accessibility tree and tab order. Hover, keyboard focus, local pause, global pause, hidden tabs, and leaving the viewport stop autoplay. Arrows, keyboard controls, and pointer dragging provide manual navigation. Reduced motion disables autoplay and momentum; manual arrows update immediately. Without JavaScript the original five-card fan remains visible.

## The mechanic
`bouquet/model.ts` owns allowlisted palettes, size selection, prices, and shareable signup URLs. `bouquet/BouquetComposer.tsx` displays a live SVG arrangement with native radio controls. Seven stem transforms gather from their scattered offsets as the composer scrolls into view. Changing palette updates petal colours and the arrangement using interruptible transforms. The signup URL contains the selected feeling and size; signup reads and validates them. Native controls provide keyboard and touch alternatives. No scroll hijacking. The animation properties are registered with inheritance disabled; scroll progress is written to the rail and individual stems, avoiding style recalculation across the entire SVG tree.

## Motion
Personality: soft, organic. Verbs: gather and unfurl. Signature moment: individual stems draw into a single bouquet. Tokens: ease-out cubic-bezier(.22,1,.36,1), expo-out cubic-bezier(.16,1,.3,1), in-out cubic-bezier(.65,0,.35,1), spring linear(0,.5 15%,1.03 50%,1); duration 90/180/420/850/1200ms; stagger 75ms; reveal shift 26px. Four reveals: masked headline, postcard cascade, media wipe, drawn rule; additional scale and rise. Smooth scrolling is dynamically imported only for fine pointers without reduced motion. One rAF scroll writer measures on resize, pauses hidden-tab work, and updates CSS variables without React state.

| Element | Enter | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
|---|---|---|---|---|---|
| Header | logo and links settle in sequence | compact after 70px; progress fills | shared indicator slides; links underline | touch menu unfurls, Escape closes, focus returns | remains available as compact strip |
| Hero | two headline masks then fan of postcards | carousel drifts around the arc and pauses offscreen; slight exit parallax | hover and focus pause the carousel; postcards lift | drag with momentum, previous/next arrows, pause/play; cards select composer palette by query | next scalloped field overlaps the base |
| Promise band | text rises, flower divider turns in | passes over hero | links underline | anchor press | scallop opens cream collection |
| Collection | title mask and 3 card cascade | artwork enters via wipe | art scales and label arrow slides | selected feeling deep-links composer | cream flows into lilac composer |
| Composer | rule draws and controls cascade | stems gather in sticky art stage | swatches lift and focus rings | palette and size regroup bouquet; price updates; selection in CTA | finished bouquet remains visible |
| Club story | asymmetric art wipe and text mask | art shifts by a small bounded amount | link underline draws | link press | cream gives way to pistachio plans |
| Plans | staggered scale-rise | view-triggered only | cards lift, CTA arrow advances | plan deep-link prefills signup | scalloped edge leads to form |
| Form | scale settle | view-triggered only | labels rise; input focus ring | validation shake, preparing state, bouquet confirmation unfolds | reset returns focus to first field |
| Footer | drawn rule and wordmark rise | progress reaches full | underlines draw | links press | final static flower mark |
| Buttons | part of parent's choreography | follow parent | fill wipe and arrow slide | scale .97; disabled muted; spring release | interruptible reversal |
| Botanical art | petals unfurl | composer stems only; no competing system | card artwork scales | new arrangement settles | ambient leaf sway pauses offscreen |

Ambient: one hero flower sway and one small note flower turn, both paused outside viewport and hidden tabs. Pause control stops decorative motion. No autoplay video, canvas, 3D, or heavy runtime. Reduced motion disables spatial animation and smooth scrolling. No-JS defaults to fully visible finished art and direct email contact; enhanced controls are replaced by explanatory fallback links.

## Signature details
Six-petal mark; handwritten botanical notes; scalloped seams; sculptural vase silhouettes; little petal navigation indicator; bouquet gathering; softly fanned art postcards.

## Do / Don't
Do keep all text fern on pastel fields, original vector artwork, responsive shapes, genuine buttons, native radios and local-only form submission. Do retain graceful static states. Don't add textures, dots, harsh borders, mono labels, fake checkout, external media, or motion-dependent meaning.

## Files
Root layout; server page; flori.css; brand/Logo; brand/Flower; bouquet/BotanicalArt, BouquetComposer, model and tests; content/flowers and plans; motion/Reveal, PageMotion, SmoothScroll, math and tests; sections/Header, Hero, Promise, Collection, Composer, Story, Plans, Join, Footer; forms/JoinForm, validation and tests; assets helper, SVG favicon and OG image. Registration in all six repository points. Brand board: `.openlanding-page/flori/board/index.html`.

## Imagery
All production artwork is original inline SVG, complete at delivery. There are no waiting media files. Optional photographic replacement directions live in `docs/image-prompts/flori.md`; raw imports go to assets/incoming/flori and through `npm run images -- flori`. Preview captured from the actual page.
