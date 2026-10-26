# LUCENTRA landing template design

## Intent

LUCENTRA is a fictional real-time material studio for product designers and frontend teams. The supplied Facet hero already has a pale architectural field, floating glass shards, and a material-research voice. This design expands that hero into a complete landing page whose central interaction is an optical calibration bench.

## Goals

- Preserve the source hero's quiet glass and wireframe language while giving it a full conversion path.
- Make one material specimen the page's narrative spine: sample, tune, split, read, then brief.
- Keep the route self-contained, fast, keyboard accessible, and complete without WebGL or generated media.
- Provide a real local form demo with validation, loading, and success states.

## Non-goals and anti-goals

- No real account system, network submission, analytics, or claims about production browser support.
- No stock photography, copied logos, or hidden content that only appears after JavaScript.
- No generic feature-card page where the sections could belong to any other product.

## Approaches considered

1. **Port the supplied Three.js single-screen scene and add overlays.** This preserves the source most literally, but keeps the page dependent on one canvas and makes the long-form story difficult to navigate and test.
2. **Build a pinned DOM/SVG calibration bench around one specimen.** This keeps the optical metaphor, exposes all values to assistive technology, and lets reduced-motion and phone layouts share the same data model. This is the chosen approach.
3. **Make a slide-deck presentation.** This would be easy to control but would turn the page into a sequence of screens instead of a material instrument and would duplicate existing gallery deck templates.

## Chosen architecture

The route lives under `src/app/(lucentra)/lucentra/` with a local layout, CSS tokens, brand assets, motion primitives, a pure `bench/state.ts` reducer, and focused sections. The bench uses a sticky stage on fine-pointer desktop and readable stacked cards with a native range control on phones or reduced motion. CSS custom properties carry scroll progress and specimen values; React state is reserved for meaningful announcements and form transitions.

## Constraints

- Next.js 16 App Router, React 19, TypeScript and Tailwind CSS v4.
- Palette: graphite `#10141C`, paper `#F5F7FB`, cobalt `#2E63FF`, spectral tint `#C5D4FF`; tints use `color-mix()`.
- Fonts through `next/font/google`: Sora display, Plus Jakarta Sans body, Space Mono utility.
- Motion identity: technical/cinematic; verbs scan and focus-pull; one signature spectral recomposition.
- No generated media is required; use original SVG/CSS specimen art and labelled placeholders only if an asset is later added.
- Gallery registration, prompt bundle, palette guard, unit tests, e2e coverage, and preview image are required.

## Page outline and copy

1. Hero: “Tune the surface.” / “A real-time material studio for teams who need the surface to behave before it ships.” / “Open the bench”.
2. Tagline reveal: “Make light legible. Before the handoff.”
3. Material principles: transmission, roughness, dispersion, index of refraction.
4. Calibration bench: the same prism specimen moves through clear, tuned, spectral, and ready states.
5. Presets: Quartz 01, Studio Milk, Blue Hour, and Edge Study.
6. Workflow: sample, tune, brief.
7. Access: one clear studio plan and a local brief form.
8. Field notes: five short optical terms adapted from the source paper view.
9. Footer: navigation, legal links, and a final live readout.

## Forms and states

The local brief form requires name, work email, and a selected starting surface. Validation returns field-level messages. Submission changes the button to loading, then swaps the form for a stamped success panel; no request is sent.

## Review focus

- The bench clamps progress and values at both ends; unit tests cover out-of-range values and unknown presets.
- Reduced motion shows every section and does not mount the scroll engine.
- Phone layout keeps the specimen, controls, and form usable at 390px without hover.
- Form output is rendered from fixed copy and escaped React values; no HTML is built from user input.
- The gallery preview and registration paths stay valid when the page has no media files.
