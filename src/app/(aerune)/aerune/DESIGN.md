# AERUNE — the air has a story

## Requirements

- Create `/templates/aerune` as a self-contained Next.js 16 / React 19 / TypeScript template; route-group imports are local or from npm packages.
- The user approved the concept and explicitly waived the brand board. Their references inform the atmospheric dark hero, rounded product panels, and warm editorial page; logos and copy are original.
- Show representative, explicitly simulated indoor-air readings. The inquiry is a local preview only; it does not send or store data.
- Use responsive SVG/CSS graphics and labeled media placeholders. The user will generate media from `docs/image-prompts/aerune.md`.
- Run `npm i lenis` when copying into a fresh Next.js app; the project already includes it.

## Concept

Air changes throughout a building's day, so the visitor moves a three-stop timeline and sees the air current, room readings, and suggested response change together. AERUNE helps workplace teams understand what happens between sensor readings and practical decisions. The product is fictional.

## Palette

| Role | Color | Use |
| --- | --- | --- |
| Night | `#101A1D` | hero, text, dark panels |
| Paper | `#F3EFE5` | page canvas |
| Porcelain | `#FCFAF4` | dashboard and light panels |
| Mist | `#C6D8CF` | airflow, secondary diagrams |
| Slate | `#A6B3AC` | secondary dark-surface text |
| Ember | `#ED7546` | primary controls, indicators |
| Forest | `#203631` | illustration and depth |

## Type

Geist is the display and body family. Geist Mono is reserved for measurements, times, and small technical labels. Both load through `next/font/google`; the display scale is fluid with deliberate line breaks.

## Layout

A centered hero in an expansive rounded dark stage holds the value proposition, main action, atmospheric linework, and an original dashboard preview. A cream page follows with a building-day timeline, four capabilities, a three-step process, a use case, frequently asked questions, and a local inquiry. Desktop uses asymmetrical columns and a sticky demo visual; mobile stacks all content in reading order.

## Mechanic

The timeline has three exact, simulated states: arrival at 08:30 (620 ppm, 38 people, 61% airflow), meeting peak at 13:15 (980 ppm, 86 people, 89% airflow), and evening at 18:40 (530 ppm, 12 people, 34% airflow). A native range and labeled buttons address the same selected state. Clamping and data lookup are pure and tested. The active state changes the flow path, chart, reading, occupancy, and recommended next action. It does not imply a real measurement.

## Motion

Personality: technical and cinematic. Verbs: **scan** and **focus**. Signature moment: a selected time sends a focused airflow trace through the building while the dashboard changes to that moment.

Tokens: `--ar-ease-out: cubic-bezier(.22,1,.36,1)`, `--ar-ease-in-out: cubic-bezier(.76,0,.24,1)`, durations 120 ms / 240 ms / 480 ms / 800 ms / 1200 ms, stagger 70 ms, reveal shift 28 px. Scroll writes a single progress custom property in an animation frame; transitions use transform, opacity, and clip-path. Reduced motion removes movement; the no-JS document stays visible.

| Element | Enter | Scroll-linked | Hover / focus | Press / state | Exit / handoff |
| --- | --- | --- | --- | --- | --- |
| Header | staggered drop | compacts after scroll | link underline and visible ring | menu opens and closes | stays available over the page |
| Hero | headline mask rise, dashboard settles | backdrop shifts subtly | CTA fills, arrow moves | CTA compresses | rounded stage overlaps light canvas |
| Overview strip | labels slide, rule draws | progress rail advances | links retain clear focus | anchors navigate | rule draws toward demo |
| Timeline | heading rises, diagram wipes | sticky stage follows the story on desktop | time control lifts and is outlined | trace and readings change together | stage releases into capability cards |
| Capabilities | staggered rise and scale | cards enter individually | card lifts, arrow moves | links compress | light background continues into process |
| Process | section headline masks in | progress line draws | step labels highlight | anchors navigate | dark process panel yields to light story |
| Use case | media wipes and copy rises | illustration drifts subtly | action arrow slides | anchor compresses | light panel hands off to FAQ |
| FAQ | rows rise in sequence | each row enters once | row and focus ring respond | native disclosure opens and closes | rule leads into inquiry |
| Inquiry | fields rise in order | panel remains in normal flow | labels and buttons respond to focus | validation, preparing, then local confirmation | confirmation replaces the form |
| Footer | mark and labels rise | progress completes | link underlines draw | links compress | page ends on dark canvas |

## Signature details

Airflow contour lines; timestamps and location-style coordinates; the open circular AERUNE mark; rounded instrument panels; ember signals used sparingly.

## Do / Don't

- Do keep data clearly labeled as a demonstration, use plain language, and make controls accessible by keyboard and touch.
- Do preserve every section with reduced motion and without JavaScript.
- Don't copy names, logos, charts, or text from the reference images; don't fabricate real client endorsements; don't transmit the inquiry.

## Files

`layout.tsx`, `aerune.css`, `page.tsx`, `brand/`, `sections/`, `timeline/`, `motion/`, `forms/`, `assets.tsx`, `assets.generated.ts`, `icon.svg`, and `opengraph-image.tsx`. The gallery registration, e2e spec, and image prompts live in their repository-standard locations.

## Imagery

The user will generate the art-directed stills listed in `docs/image-prompts/aerune.md`. Until processed, `Picture` presents labeled placeholders and original SVG graphics keep the page legible and visually complete.
