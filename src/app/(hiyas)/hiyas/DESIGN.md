# HIYAS — design spec

## Requirements

- Next.js 16.4.2 App Router, React 19.3, TypeScript and Tailwind CSS v4.
- Route isolation under `src/app/(hiyas)/`; no `@/` imports from the template.
- Three UI colours only: black `#05070A`, dark blue `#0B2A4A`, white `#FFFFFF`.
- Sharp zero-radius geometry, image-led media slots, and a technical/cinematic showpiece motion system.
- Complete without generated media, JavaScript, or motion; form is local-only.

## Concept

HIYAS plans and guides high-altitude expeditions for climbers who want to attempt one of the fourteen 8,000 m peaks. It makes route, altitude, timing, Sherpa partnership, and a return plan visible before a consultation.

**The central idea → the signature mechanic:** an expedition is a chain of camps, so the page is a live route planner: choose a peak, tune acclimatization days and support, and lock the route into an inquiry.

The page borrows the supplied Crux reference's split editorial posture and strong condensed type while carrying the expedition depth of the 14 Peaks reference: activities, route catalog, safety/logistics, leadership, field notes, resources, and inquiry.

## Palette

| Token | Hex | Role |
|---|---|---|
| `--color-black` | `#05070A` | deep ground, display type, dark panels |
| `--color-blue` | `#0B2A4A` | route signal, selected states, primary action |
| `--color-white` | `#FFFFFF` | paper, type on dark, ice and data fields |

No other hex colours are used. Alpha surfaces use `color-mix()` from these tokens. Dark blue is never used as a tiny text color on black; it is a signal fill, rule, or large graphic.

## Type

| Role | Face | Use |
|---|---|---|
| Display | Oswald 600/700/800 | wordmark, hero, peak names and route calls |
| Body | Outfit 400/500/600 | explanations, itinerary copy, form labels |
| Utility | Roboto Mono 400/500 | camp codes, altitude, dates, planner values and table heads |

## Layout

- Capped centered container with 12 columns, wide gutters and sharp rules.
- Header is a compact black/navy/white bar with wordmark, route links, and one inquiry action.
- Hero uses a Crux-like split: the title and action on the left, a large documentary mountain plate on the right, with a route line crossing the seam.
- Planner is a dark-blue full-width instrument with a left peak list, a central SVG altitude profile, and a right summary panel.
- The fourteen uses a dense index composition rather than repeated cards. Logistics uses a table. Field notes use a horizontal rail. Footer uses the supplied mountain-image composition: four sparse columns over a full-bleed scene and an oversized HIYAS wordmark at the bottom.
- All controls and panels are square. The only radius is 0px.

## Planner mechanic

`planner/logic.ts` is pure and tested. Peak data includes the fourteen elevations: Everest 8849 m, K2 8611 m, Kangchenjunga 8586 m, Lhotse 8516 m, Makalu 8485 m, Cho Oyu 8188 m, Dhaulagiri 8167 m, Manaslu 8163 m, Nanga Parbat 8126 m, Annapurna I 8091 m, Gasherbrum I 8080 m, Broad Peak 8051 m, Gasherbrum II 8035 m, and Shishapangma 8027 m.

The planner days and support values are visitor-selected planning inputs. Changing a peak redraws the route profile, changing days moves camp markers, and changing support changes the summary language. `lockPlan` stores a local payload used to prefill the inquiry form.

## Motion

**Identity:** technical / cinematic, showpiece. The verbs are **plot** and **lock**. Easing uses `cubic-bezier(0.16, 1, 0.3, 1)` for arrivals, `cubic-bezier(0.65, 0, 0.35, 1)` for route handoffs, and a small linear spring for pressed controls. Durations are 90ms instant, 160ms fast, 420ms base, 820ms slow, and 1200ms hero; stagger is 70ms.

The signature moment is the route line drawing from base camp to summit while camp markers snap into place and the support plan resolves. Motion is implemented with transforms, opacity, clip-path, and SVG stroke offsets; no widths, heights, top, left, or box shadows are animated.

## Signature details

- Fourteen-peak index with real elevation data.
- Route profile and camp markers driven by one planner state.
- Support mode shown beside altitude and days, never as a decorative badge.
- Coordinates and camp codes used as editorial anchors.
- Large photographic footer with the HIYAS wordmark embedded into the scene.

## Do / Don’t

**Do** use dark documentary mountain imagery, sharp data surfaces, calm precise copy, and visible return planning. Make the planner the product story.

**Don’t** use heroic stock climber poses, invented success claims, fake testimonials, neon gradients, rounded dashboard cards, or a generic “features / testimonials / pricing” run.

## Files

`layout.tsx` · fonts, metadata and no-JS rule  
`hiyas/hiyas.css` · Hallmark stamp, tokens, layout and motion  
`brand/Logo.tsx` · HIYAS lockup and mark  
`icon.svg` / `opengraph-image.tsx` · metadata visuals  
`assets.tsx` / `assets.generated.ts` · media slots and placeholders  
`planner/` · peak data, reducer, route maths, SVG profile and tests  
`motion/` · reveal, scroll progress, magnetic and tested maths  
`sections/` · hero, planner, peaks, stages, support, logistics, notes, inquiry and footer  
`forms/` · validation and local success transition  
`tests/e2e/hiyas.spec.ts` · planner, form, mobile, reduced-motion and no-JS checks

## Imagery

Prompts are in `docs/image-prompts/hiyas.md`. User-generated files go in `assets/incoming/hiyas/` and `assets/incoming/hiyas/clips/`. Until those files arrive, each slot is labelled and keeps its final aspect ratio.

