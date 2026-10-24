# Studio Kazeko — a little wonder

## Requirements
An isolated Japanese-inspired independent 2D-animation studio landing template at `/kazeko`. Next.js 16 App Router, React 19, TypeScript and Tailwind v4. Install with `npm i next react react-dom lenis`. User explicitly waived the brand-board gate. The approved direction is dreamlike countryside, soft colours and drifting motion. No deployment or commit.

## Concept
Every film begins with a pencil mark, so scrolling turns an original countryside sketch into a coloured, moving scene. The commercial story is discovering the studio's films, understanding its process and preparing a project brief.

## Palette
Eight colours: paper #F8F5E9, ink #243C35, meadow #64856A, light leaf #C7D6A7, sky #D6E7EB, butter #EED998, terracotta #B96C51, muted ink #596C63. Ink on paper is the default text pair. Terracotta is illustration content and occasional large decoration, never small body text. All other tints use color-mix of these tokens.

## Type
Shippori Mincho 400 for Japanese-influenced literary display, DM Sans 400/500 for body, IBM Plex Mono 400 for frame labels. Distinct font variables, CJK preload disabled. Display 44–88px, section display 36–62px, body 16–18px, labels 10–12px. Explicit hero lines and reserved landscape boxes keep layout stable.

## Layout
Full-width sky opening with centred type above a panoramic meadow, generous paper gutters, an asymmetric three-film editorial grid, a sticky drawing stage, a two-column studio essay and a dark-green final invitation. Desktop max-width 1280px; gutters clamp(22px,5vw,80px). Phones use a natural stacked layout. Small corner radii 6px, rounded action pills, no nested card panels.

## Mechanic: pencil to picture
The process chapter has one sticky stage for 190vh on desktop. Progress is clamp((scrollY - start)/(height - viewport),0,1). A coloured copy of the original SVG overlays its line-art copy and its clip-path is inset(0 (1-progress)*100% 0 0). Stages are Pencil (<.34), Colour (<.75), Life. A real labelled range input and stage buttons provide keyboard and touch alternatives. Explicit control changes take precedence over scroll; the Resume scroll control restores it. On phones and reduced motion the stage is unpinned and manually controllable. No canvas, video or heavy rendering engine is needed.

## Motion
Identity: organic / analog. Verbs: **drift** and **unfurl**. Signature moment: the meadow moves from pencil line to living colour as a paper bird lifts into the sky.

Tokens: ease-out cubic-bezier(.23,1,.32,1); expo cubic-bezier(.16,1,.3,1); handoff cubic-bezier(.77,0,.175,1); spring linear(0,.35 8%,.82 20%,1.06 30%,1.02 42%,.99 58%,1). Durations 90/180/420/800/1200ms. Reveal shift 24px; stagger 70ms. Ambient periods 8/12/16s, maximum three groups in view.

| Element | Enter | Scroll-linked | Hover / focus | Press / state | Exit / handoff |
|---|---|---|---|---|---|
| Header / Logo | 150ms drop | compress after 60px; active nav follows chapters | drawn underline; visible ring | links scale .97 | paper backdrop settles |
| Mobile menu | inset reveal | native dialog overlay; page locked | links underline | modal dialog, Escape and focus restoration | reverse clip |
| Hero | sky settle, nav, line masks, CTA, caption | landscape drifts <=24px; progress hairline | CTA arrow slides, magnetic fine pointer | .97 press | paper edge overlaps landscape |
| Landscape / Paper bird | scene reveals with sky | hero parallax or process colour wipe | decorative, no focus target | pause button stops ambient | groups pause offscreen and hidden tab |
| Film cards / Picture | staggered rise + scale, image wipe | one-time reveal | lift, image zoom, arrow slide | details dialog; touch equivalent | modal panel enters from bottom |
| Film details | dialog inset / lift | modal scroll only | close ring and button wipe | Escape/close restore focus | exit handled by native dialog |
| Process chapter / ScenePlayer | line draw + caption rise | sticky sketch-to-colour wipe | range focus and stage button underline | range/phase controls with aria-pressed | paper chapter slides over sticky stage |
| Studio | portrait wipe, type mask, ruled labels draw | in-view only | text-link underline | anchor press | paper-to-ink border curve |
| Contact / ProjectForm | copy mask, form stagger | in-view only | floating labels, ring, wipe submit | invalid shake; loading then local success bird | success replaces form and receives focus |
| Footer | rule draw | final progress | underline, pause focus | pause/resume | finished static end state |
| Reveal / SplitText | mask, rise, wipe, scale, draw | shared observer | inherits target semantics | no independent controls | reveal once |
| Magnetic / SmoothScroll | no hidden state | Lenis on fine desktop only | <=8px pull | spring release | clean up listeners/RAF |

Motion is progressive enhancement. Without JavaScript, SSR content and linework stay visible; plain text explains the process and the form fallback states that scripting is required. Reduced motion shows fully coloured illustrations, static section handoffs, no ambient animation or smooth scrolling. Ambient pause control is always available and retained across the page.

## Signature details
Original folded-bird / breeze logo; scene/frame numbering; handwritten-style winding breeze paths; botanical field labels; deckled silhouette section edges; small Japanese labels with English meaning supplied by adjacent copy.

## Do / Don't
Do use wide scenic composition, a restrained palette, sincere specific copy, generous sky and tactile linework. Do label fictional sample films and local-only form submission honestly. Don't copy a real studio, imply awards or real clients, embed fake film players, use autoplay audio or hide information behind hover.

## Files
Root layout, page composition, brand logo/icon/OG, typed film data, section components, illustration primitives, motion primitives/math tests, process state/math tests, validation tests and client form. Gallery registration, source bundles, image processor allowlist and e2e coverage are updated together. Scratch output stays under `.openlanding-page/kazeko/`.

## Imagery
Original inline SVG landscape, three film-specific illustrated compositions and a studio illustration are finished placeholders. Picture uses processed generated assets when available and keeps labelled illustrations otherwise. Platform-neutral prompts live in `docs/image-prompts/kazeko.md`. User supplies raw files to `assets/incoming/kazeko/`; run `npm run images -- kazeko` to produce responsive AVIF/WebP and manifest. No generation costs incurred.
