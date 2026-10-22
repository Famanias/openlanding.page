# Prompt: rebuild "LOOPHOUSE" (community tool library & pegboard workshop)

Paste everything below the line into your AI coding agent.

---

Build a landing page in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4** for a fictional community tool library and shared workshop called **LOOPHOUSE** (tagline *"Tools in circulation, work in common."*, motto *"Borrowed. Built. Returned."*). It circulates 420+ calibrated trade-grade tools, heavy equipment kits, and shared workbench bays across neighborhood blocks.

**The central metaphor: A tool library's heart is its physical pegboard wall where every tool has a measured shadow and a calibrated slot, so the page is an interactive modular Pegboard Tool Wall & Workbench Station.** Visitors can filter trade disciplines, unlatch tools from magnetic docks, inspect live calibration specs & tolerances, and assemble a project checkout tray in real time.

It must feel utilitarian, tactile, precision-machined, industrial, and communal—evoking the functional honesty of Dieter Rams, McMaster-Carr, and a dedicated neighborhood craft guild. No generic SaaS cards, no glassy gradients, and no external stock photos—all visuals are custom SVG technical drawings, dot-matrix pegboards, and cutting-mat grids.

## Brand rules

- **Five colours only:**
  - Cast-Iron `#111618` (ink: text, dark slabs, tool chassis)
  - Birch Paper `#F4EFE6` (paper: page ground, light cards)
  - Safety Cobalt `#1E51EB` (the single accent: active docks, action buttons, inspection badges)
  - Galvanized Steel `#7E8A90` (steel: hairlines, caliper rules, pegboard dots)
  - Workshop Pine `#DED7C5` (pine: card backing, drawer panels, dock shadows)

  All tints must be made with `color-mix()` of these five hex tokens. Never introduce additional hex colors, gradients between hues, or purples.
- **Type (via `next/font/google`, with distinct variable names):**
  - **Chivo** 700 / 900 for display and titles. Hero headline at `clamp(44px, 8vw, 108px)`.
  - **Plus Jakarta Sans** 400 / 500 / 600 for body copy.
  - **Chivo Mono** 400 / 600 (`preload: false`) for caliper readouts, serial numbers, telemetry, and specs: uppercase, 0.1em tracking.
- **Corner geometry:** Machined 3–6px radius throughout. Stamped steel feel, never sharp 0px or bulbous pills.
- **Background treatments (CSS only):**
  - Perforated pegboard grid: `radial-gradient(#7E8A90 1.5px, transparent 1.5px)` with 24px spacing.
  - Cutting mat grid: `linear-gradient` millimeter hairlines on Cast-Iron.
- **Logo & Mark:**
  - Mark: A stamped rectangular plate with corner mounts, an inner caliper circle, and a cobalt center anchor point.
  - Lockup: The mark paired with "LOOPHOUSE" in Chivo 900 with tracked mono subtitle "TOOL CIRCULATION · WORKSHOP".

## The Pegboard Station (The Signature Mechanic)

- **Interactive Tool Wall:**
  - 12 real trade tools categorized into Woodworking, Metal & Mechanical, Masonry & Rigging, and Field Cordless.
  - Each tool rests on a pegboard dock over a dashed pine shadow silhouette (`border: 2px dashed #DED7C5`).
  - Clicking any tool triggers a magnetic spring unlatch (`unlatchTool`), lifting it out of its shadow with a tactile release, illuminating its cobalt status badge, and opening its technical caliper spec drawer.
  - Spec drawer features live mechanical dimensions (collet size, weight, torque/RPM, runout tolerance, battery tier), condition verification, and a "Stage in Tray" CTA.
  - Requisition Tray dock: Floating / sticky drawer holding staged tools, displaying live item count, return period, and instant member checkout total ($0 for members).
- **Reduced motion & phones:**
  - Fully responsive 2-column or 1-column layout without sticky pinning; tool drawers expand smoothly in flow with instant fallbacks.

## Sections

1. **Machined Top Bar:** Floating bar with brand lockup, live inventory telemetry (`428 tools in circulation · 98.4% return rate`), anchor navigation, and "Reserve a Kit" CTA.
2. **Hero:** Perforated pegboard ground, split-line mask headline *"The neighborhood workshop on your block."*, lead copy, live status badge, and dual actions.
3. **The Pegboard Station (Mechanic):** Modular tool wall with category tabs, magnetic tool unlatching, caliper spec inspection, and active requisition tray.
4. **Circulation Route:** Four-station workflow with drawn connector hairlines and stamped brass numbers (01 Requisition & Hold, 02 Locker or Bench Pickup, 03 Make & Maintain, 04 Calibrated Restock).
5. **Curated Project Kits:** 4 heavy-duty packages (Cabinetmaker Joinery Pack, Timber Framing Rig, Electrician Diagnostics Caddy, Landscape Restoration Kit) with exploded tool manifests and loan duration pills.
6. **Workshop Ledger & Shelf Hosts:** Operational metrics, host depot locations, member testimonials with badge numbers, and maintenance records.
7. **Requisition Intake & Bench Reservation Form:** Client-side validated form (trade category, member email, loan days slider, workshop safety check) with instantaneous confirmation panel. Never send a network request.
8. **Colophon & Footer:** Stamped iron mark, library regulations, copyright.

## Quality bar

- Only `transform`, `opacity`, and `clip-path` animate. UI transitions stay under 250ms with custom tokens.
- Client-side validation for the requisition form without network calls.
- Pure logic (workbench catalog, tray maths, motion calculations, validation) in isolated `.ts` modules with unit tests.
- Zero external image dependencies—all schematics are custom SVG and CSS grids.
- 100% accessible: keyboard navigation across tool docks, visible 2px cobalt focus outlines, screen-reader friendly state announcements.
