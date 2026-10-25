# 里山日和 — Satoyama Biyori

## Requirements
Original rural-Japan presentation at /satoyama. Six chapters, Japanese fonts, animated code-drawn scenery with a different painting for every slide, and an activity carousel. No generated, stock, image or video media. The user explicitly directs immediate implementation with no interview or approval gates. Install: npm i next react react-dom. No additional runtime dependencies.

## Concept
A quiet day is a picture book, so chapter navigation turns pages through the landscape, daily rituals, small adventures and seasons. Mood: pastoral, tender, unhurried, tactile, curious. This adds a fully procedural animated rural-life presentation to the gallery, distinct from Kazeko's commercial studio scroll page.

## Palette
Three pastel families: cream #F6F3E8, sage #ADC3A1, dusty rose #D7AAA0. Forest ink #2F4438 provides contrast. The anime-painted skies and the autumn maple need three scene-only accents, registered in scripts/templates.config.ts: pastel sky blue #9CC4D6, warm sun #F1D9A2 and ember #C8714F. Everything else derives from these seven via color-mix; scene tokens (`--st-sky-*`, `--st-mtn-*`, `--st-meadow*`, `--st-tree-*`, `--st-cloud*`) are declared on `.st-scene` so each season or time of day overrides the same names on its own svg.

## Type
Shippori Mincho 400: Japanese mark, literary display, chapter titles and Japanese secondary text. DM Sans: English reading and navigation. The CJK font disables preloading; one Japanese family avoids duplicating hundreds of Unicode-range declarations. Distinct next/font variables. All CSS tokens are real scoped custom properties so the copy unit works in both webpack and Turbopack without a Tailwind processing dependency. Desktop display 52–86px; mobile 36–48px. Explicit line breaks preserve the picture-book composition.

## Layout
A cream folio frame surrounds a full-width illustrated stage. Header has left Japanese lockup, central chapter nav, and right reading action. Stage fills available viewport height; footer has chapter dots, page count and next/previous controls. Six chapters are all server-rendered inside a client navigation shell. Desktop navigation uses layered horizontal paper turns. Mobile keeps the chapter model with a horizontally scrollable navigation rail, shorter copy, and large touch targets. Short screens can scroll inside the chapter. No-JS shows all six chapters in document flow.

## Scenery
Style: 2D anime background painting in the spirit of Hayao Miyazaki's hand-painted scenery. Gradient skies, billowing cumulus with lavender undersides and warm lit tops, layered hazy ridges, clumped leaf canopies lit from the upper left, wind-leaning grass strokes, soft gradients instead of outlines, warm glowing windows. Everything is coded SVG; nothing is generated or stock.

| Slide | Scene | Time and weather | Signature elements |
| --- | --- | --- | --- |
| 01 Welcome | MeadowScene | high summer, towering clouds | great tree on a hill, farmhouse and path, wildflowers |
| 02 The landscape | TerraceScene | misty morning | terraced paddies mirroring the sky, cedar ridge, drifting mist |
| 03 A slower rhythm | VillageScene | warm afternoon | stone canal and bridge, laundry line, persimmon tree, kitchen garden |
| 04 Little adventures | ForestScene | morning light | pale bamboo grove, sunbeams, floating motes (fades into the cards) |
| 05 The seasons | SeasonScenes | four separate paintings | spring blossom and flooded paddy; summer rice rows, great clouds, sunflowers; autumn rice racks and red maple with falling leaves; winter snow village with lit window |
| 06 Until next time | DuskScene | sunset | sun sinking behind ridges, golden paddies, lantern posts, fireflies |

Activity postcards share the painted sky, cumulus, ridges and canopy. Seasons crossfade between four stacked layers; inactive layers are hidden and their animation paused. Primitives live in illustrations/Painted.tsx (seeded randomness only, so server and client markup match).

## Mechanic
Book navigation clamps at both ends. Hash links are readable and support back/forward. Arrow keys, Home and End work outside interactive controls; Space and Enter keep their native meaning. Activity carousel wraps over five original scenes, supports touch swipe and explicit previous/next controls, and animates directionally. Seasonal tabs change scene colours and reading copy.

## Motion
Personality: organic, quiet. Verbs: drift and turn. Signature moment: a painted countryside comes to life with drifting clouds, mist, a passing breeze and chimney smoke, then moves like a picture-book page when a chapter is selected, and every page opens onto a different painting.
Tokens: 90ms press, 180ms hover, 420ms content, 800ms page, 1200ms load. Ease-out cubic-bezier(.23,1,.32,1); page ease cubic-bezier(.77,0,.175,1). Ambient periods 9/18/26 seconds. Only transform and opacity run continuously. The pause control stops all ambient loops; hidden tabs and inactive chapters pause. Reduced motion disables all loops and transforms.

| Element | Enter | Scroll | Hover/focus | Press/state | Exit/handoff |
| --- | --- | --- | --- | --- | --- |
| Header/logo | short downward settle | fixed folio | underline and visible ring | logo returns to welcome | remains anchored |
| Chapter nav | staggered settle | native mobile overflow | underline grows | active indicator, aria-current | indicator tracks chapter |
| Hero | landscape settle, text mask, body rise | inner scroll on short screens | leaf button arrow travels | page turn | scenic wipe |
| Landscape | layered reveal | scene remains behind copy | navigation ring | chapter selection | directional translation |
| Daily rhythm | staggered ruled journal entries | inner scroll | chapter controls | native links | paper wipe |
| Activities | postcard cascade | touch horizontal swipe | picture rises | carousel directional turn | cards slide out |
| Seasons | media wipe and copy rise | inner scroll | tabs lift, focus ring | scene palette and caption swap | crossfade |
| Farewell | text mask and scenic settle | inner scroll | restart arrow shifts | returns to first page | book loops by explicit action |
| Footer | rule draw | stays anchored | dot grows and ring | previous/next, disabled at ends | counter announces chapter |
| Ambient control | visible immediately | stays anchored | ring and tooltip | pauses all ambient movement | persists across chapters |

## Signature details
Original mountain-and-paddy mark, rose travel seal, Japanese vertical poem, illustrated field annotation, six chapter dots, bilingual page labels and a small leaf motif.

## Do / Don't
Use real readable content and complete original SVG compositions. Keep Japanese labels translated in adjacent English. Don't copy characters or existing film scenes. Don't use generated assets, autoplay sound, booking forms, commercial promises or generic landing-page sections.

## Files
Layout and page; brand mark/icons; painted scene primitives (Painted.tsx), six chapter scenes plus four season scenes, and the activity postcards; chapter components; deck data, pure navigation logic/tests, navigation shell; ambient motion hook; isolated CSS, favicon and social preview. Six gallery registrations and e2e tests accompany the template.

## Imagery
Every picture is coded inline SVG. No media key detection or generation is needed because the user forbids generated media. Gallery preview is a browser screenshot of the welcome meadow. See docs/image-prompts/satoyama.md for this explicit no-generation policy.
