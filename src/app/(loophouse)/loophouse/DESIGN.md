# LOOPHOUSE — design spec

A landing page for a fictional community tool library and shared workshop. **A tool library's heart is its physical pegboard wall where every tool has a measured shadow and a calibrated slot, so the page features an interactive modular Pegboard Tool Wall & Workbench Station.** Visitors can filter trade disciplines, unlatch tools from magnetic docks, inspect live calibration specs & tolerances, and assemble a project checkout tray in real time. Mood: utilitarian, tactile, precision-machined, industrial, communal. Everything is honest, structural, and built from trade-grade precision.

## Requirements

- **Next.js ≥ 16.4** (App Router, a route group with its own root layout, `next/font/google`, `next/og`), React 19, TypeScript, Tailwind CSS v4. No external media dependencies—all schematics are custom SVG and CSS grids.
- Mobile Lighthouse: performance ≥ 90, accessibility ≥ 95, best practices 100.
- Folder isolation: the template imports only npm packages and files inside `src/app/(loophouse)/`.
- WCAG AA contrast throughout with visible focus states.

## Concept

- **The idea → the mechanic:** A tool library's heart is its physical pegboard wall where every tool has a measured shadow and a calibrated slot, so the page features an interactive modular **Pegboard Tool Wall & Workbench Station** where visitors can filter trade disciplines, unlatch tools from magnetic docks, inspect live calibration specs & tolerances, and assemble a project checkout tray in real time. Every section speaks the workshop idiom: equipment is organized by *trade bays*, borrowing is *circulation*, kits are *field packs*, and facilities are *bench stations*.

## Palette

Five colours, registered in `scripts/templates.config.ts`; `npm run check` enforces them.

| Token | Hex | Role | Contrast vs Ink | Contrast vs Paper |
|---|---|---|---|---|
| Cast-Iron | `#111618` | ink: text, dark slabs, chassis | — | 16.5:1 (AAA) |
| Birch Paper | `#F4EFE6` | paper: page ground, cards | 16.5:1 (AAA) | — |
| Safety Cobalt | `#1E51EB` | accent: active docks, inspection badges, buttons | 4.8:1 (AA) | 5.4:1 (AA) |
| Galvanized Steel | `#7E8A90` | steel: hairlines, caliper rules, pegboard dots | 4.6:1 (AA) | 3.6:1 (AA large) |
| Workshop Pine | `#DED7C5` | pine: card backing, drawer panels, dock shadows | 13.8:1 (AAA) | 1.2:1 (structural tint) |

- All tints are generated with `color-mix()` of these five hexes; no other hex appears anywhere in the template.

## Type

- **Display: Chivo 700 / 900** (`--font-chivo`) — High-impact, precision-machined industrial rhythm. Hero at `clamp(44px, 8vw, 108px)`.
- **Body: Plus Jakarta Sans 400 / 500 / 600** (`--font-jakarta`) — Crisp geometric clarity, human ergonomics, effortless reading at 16–18px.
- **Utility: Chivo Mono 400 / 600** (`--font-chivo-mono`, `preload: false`) — Caliper measurements, tool serials, battery specs, telemetry tags: 0.1em tracking, uppercase.
- Distinct CSS variable names loaded in `layout.tsx`. Fluid typography using `clamp()`.

## Layout

- Gutter `clamp(16px, 4vw, 56px)`, wrapper max 1280px.
- **Geometry: 3–6px machined radius.** Stamped steel chassis feel, machined aluminum edges, routed birch plywood plates. Never generic bloated pills or flimsy glass cards.
- **Canvas grounds:** Perforated pegboard grid (CSS 24px dot matrix in `--color-steel`), cutting mat millimeter hairline grid on dark slabs, and caliper measurement rules.
- Sections:
  1. Fixed machined top bar with live tool circulation telemetry.
  2. Hero with split-line mask headline and dual actions.
  3. The Pegboard Station (Signature Mechanic: interactive tool wall & tray).
  4. Circulation Route (4-station horizontal step line with stamped brass numerals).
  5. Curated Project Kits (4 trade packs with exploded tool manifests).
  6. Workbench Ledger (shelf hosts, capacity metrics, member logs).
  7. Requisition Intake & Bench Reservation Form (client-side validated).
  8. Colophon & Footer (stamped iron mark, library regulations, copyright).

## The Mechanic (`workbench/` folder)

Pure logic in `workbench-data.ts`, tested in `workbench.test.ts`:
- Tool catalog data: 12 trade tools across 4 categories (`woodworking`, `metal`, `masonry`, `cordless`).
- Each tool contains: `id`, `name`, `model`, `category`, `serial`, `specs` (power/RPM, weight, tolerance, battery/cord), `condition` (Tier A / B), `inCirculation`, `dailyFee` ($0 for members).
- `unlatchTool(id)` and `dockTool(id)`: pure state transitions with magnetic spring release.
- `addToTray(tool)` and `removeFromTray(id)`: loan tray manifest state.
- `calculateLoanTotal(tools, days, isMember)`: pure financial & duration calculation ($0 for members, nominal fee for non-members).
- Accessible keyboard navigation: Arrow keys to navigate tool docks, Space/Enter to unlatch/inspect, Esc to return to dock.
- Under `prefers-reduced-motion` and on narrow touch screens: rendered as a responsive, fully accessible tool inspection grid with instant expand drawers.

## Motion

### Motion Identity
- **Personality:** Precise / clockwork
- **Two verbs:** *unlatch* and *lock* (supported by *snap* and *slide*)
- **Tokens:**
  - `--ease-out`: `cubic-bezier(0.23, 1, 0.32, 1)`
  - `--ease-out-expo`: `cubic-bezier(0.16, 1, 0.3, 1)`
  - `--ease-in-out`: `cubic-bezier(0.77, 0, 0.175, 1)`
  - `--ease-spring`: `linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1)`
  - `--dur-instant`: `90ms`
  - `--dur-fast`: `180ms`
  - `--dur-base`: `420ms`
  - `--dur-slow`: `800ms`
  - `--dur-hero`: `1200ms`
  - `--stagger`: `70ms`
  - `--reveal-shift`: `28px`
- **Signature moment:** *The Pegboard Tool Unlatch* — clicking an instrument lifts it from its pegboard shadow dock with a tactile spring release, sliding open a technical caliper spec panel and snapping the tool into the active loan tray.

### Completed Motion Map

| Element | Enter (load or scroll) | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
|---|---|---|---|---|---|
| Top Bar | Drops from `-100%` at 150ms | Background shifts to solid ink with 1px steel border past 60px | Links slide indicator; CTA wipes fill | CTA scales to 0.97 | Stays fixed as HUD |
| Hero Headline | Mask-rise by line from `110%` at 250ms | Subtle parallax shift against background canvas | Selection highlights with cobalt glow | N/A | Dims and lifts as pegboard approaches |
| Hero Telemetry | Staggered badge rise at 600ms | N/A | Card elevates `2px` with hairline brighten | Active telemetry pulse | Hand-off to pegboard station |
| Pegboard Wall | Clip-path wipe down at 400ms | Pegboard dot matrix translates at `0.05` parallax | Hover docks brighten outline to cobalt | Unlatch triggers spring release out of shadow | Smooth transition into spec drawer |
| Tool Docks | Staggered cascade by grid index | Dot grid aligns with active dock | Tool lifts `-4px` with shadow expansion | Snaps into Requisition Tray with spring ease | Collapses back to shadow on deselect |
| Requisition Tray | Slide-up drawer from bottom | Sticky docking when scrolling through tools | Item row reveals remove cross | Count & price tween live with tabular numerals | Clear tray flushes items with stagger |
| Route Step Line | Path drawn via `stroke-dashoffset` | Number badges fill as scroll enters | Step card elevates `-6px` | Number badge inverts to solid cobalt | Rule extends into next card |
| Project Kit Cards | Cascade rise `32px` + scale `0.96` | N/A | Card tilts `4deg`, sibling cards dim to `0.6` | "Inspect Kit" expands component drawer | Closes on sibling click |
| Ledger Numbers | Count-up with tabular nums | Meters update based on scroll trigger | Stat block glows with steel border | Tab toggle flips host branch data | Fades out on exit |
| Requisition Form | Card wipe reveal from left | N/A | Input focus ring draws 2px cobalt | Submit button transitions to progress → confirmation card | Form replaces with checked confirmation panel |

## Signature Details

1. **Pegboard shadow docks** — every tool has a dashed silhouette in `--color-pine` that remains visible when the tool is unlatched.
2. **Caliper dimensional rules** — real mechanical measurement markings with tick marks and millimeter labels on tool spec inspection panels.
3. **Live inventory status pill** — live readout with blinking green status dot (`428 tools in circulation · 98.4% return rate`).
4. **Stamped brass host tags** — numbered depot tags (`HOST DEPOT #04`) with industrial machine serials.
5. **Magnetic snap feedback** — tactile spring easing when tools dock or unlatch.

## Do / Don't

- **Do** use authentic trade terminology (plunge routers, sliding compound mitre saws, SDS rotary hammers, torque clutches, runout tolerances).
- **Do** keep every number specific and realistic (428 tools, 85 Nm torque, 1,400W, 1/2" collet, 6-minute walk).
- **Do** ensure 100% keyboard accessibility: all tool cards, tabs, and trays are navigable via Tab, Arrows, Space, and Enter.
- **Don't** use generic lorem ipsum or vague SaaS copy ("empowering circular innovation").
- **Don't** use stock photos, glassy blurs, neons, or gradients between mismatched hues.
- **Don't** animate `width`, `height`, or layout properties—use `transform`, `opacity`, and `clip-path`.
- **Don't** hide content from reduced-motion or no-JS visitors.

## Files

```
src/app/(loophouse)/
  layout.tsx                                Root layout, fonts (Chivo, Plus Jakarta Sans, Chivo Mono), metadata
  loophouse/
    page.tsx                                Server component assembling all sections
    loophouse.css                           Tailwind tokens, @theme, motion tokens, prefixed .lh-* classes
    DESIGN.md                               This design specification
    PROMPT.md                               Rebuild brief for AI agents
    icon.svg                                Favicon (caliper mark)
    opengraph-image.tsx                     Social preview card (1200x630) in brand palette
    assets.tsx                              Placeholder / SVG asset renderer
    assets.generated.ts                     Generated asset manifest
    brand/
      Logo.tsx                              Inline SVG Lockup and Mark components
    motion/
      useReducedMotion.ts                   Reduced motion detector
      useInView.ts                          IntersectionObserver hook
      Reveal.tsx                            Role-based reveal wrapper
      CountUp.tsx                           Accessible animated numeral counter
      math.ts                               Pure interpolation, clamp, stagger maths
      math.test.ts                          Unit tests for motion math
    workbench/
      workbench-data.ts                     Typed tool catalog, specs, project kits, ledger metrics
      workbench-store.ts                    Unlatch and requisition tray state store
      workbench.test.ts                     Unit tests for catalog filtering and tray calculations
      PegboardStation.tsx                   Interactive tool wall and inspection drawer
      ToolDock.tsx                          Individual magnetic tool dock component
      RequisitionTray.tsx                   Active loan tray drawer
    sections/
      Header.tsx                            Machined top bar with live telemetry ticker
      Hero.tsx                              Opening statement, status pill, dual CTAs
      CirculationRoute.tsx                  4-step borrowing workflow with drawn connector
      ProjectKitsSection.tsx                4 heavy-duty curated trade packages
      WorkshopLedgerSection.tsx             Capacity metrics, host depots, and member logs
      RequisitionSection.tsx                Client-side validated intake & reservation form
      Footer.tsx                            Stamped iron mark, safety rules, copyright
    forms/
      validate-requisition.ts               Pure validation rules
      validate-requisition.test.ts          Unit tests for form validation
      RequisitionForm.tsx                   Interactive form with loading & success states
```
