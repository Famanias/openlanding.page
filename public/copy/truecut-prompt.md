# Prompt: rebuild TRUECUT Works (image-led field engineering conversion page)

Build a landing page in **Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS v4** for a fictional small field-engineering and commissioning crew called **TRUECUT Works**.

The page has one measurable action: **Book a site visit**. It is a modern, image-and-video-led conversion page for blue-collar service businesses. Keep the header quiet: wordmark, operating signal, and one booking button. Do not add a full navigation menu or competing goals.

## Brand

- Asphalt ink `#172026`
- Chalk paper `#F5F0E5`
- Signal lime `#E8F146` for actions, markers, and success
- Galvanized steel `#B4C3C1` for surfaces and rules
- Oxide teal `#4B6A72` for utility copy and metadata
- Rare rust `#C96B45` for warnings only
- Archivo Black for short display commands, Manrope for body copy, IBM Plex Mono for project IDs and status labels.
- Logo: a survey line with measured ticks and a locked corner, paired with the word TRUECUT / WORKS.
- Voice: field-ready, specific, calm, safe, proven. Avoid buzzwords, fake client logos, invented metrics, and stock-photo claims.

## Central idea and mechanic

Field engineering starts with a site walk, so the page advances a survey line through image and video chapters, pins a capability to a field log, and turns the final request into a stamped site visit.

Use one `requestAnimationFrame` scroll loop. Measure every `[data-field-section]` offset and write `--tc-progress`, `--tc-progress-pct`, and `data-tc-chapter` to the page root. The fixed survey rail and top signal line read those values. On phones the rail becomes compact; under reduced motion it is static.

## Sections

1. **Hero / site walk:** full-bleed `hero-site-reel.mp4` with `hero-site-walk` poster, headline “See the work. Book the next step.”, one primary CTA, one proof link, and three numbered field-log cues.
2. **Capabilities:** four image cards (`capability-testing`, `capability-controls`, `capability-retrofit`, `capability-design`). Selecting a card marks the scope and syncs the booking form’s service radio.
3. **Field reel:** pinned stage with `process-proof.mp4`, three measured notes (site, proof, handoff), and a survey marker that updates as notes enter the viewport.
4. **Projects:** three full-bleed proof cards (`project-switchyard`, `project-control-room`, `project-panel-detail`) with project IDs and handoff notes.
5. **Working method:** dark section with `safety-hands` and `handoff-drawing`, plus three steps: read the site, make the proof, leave the handoff.
6. **Booking:** `credential-grid` and panel detail images beside a local form for name, work email, and service. Submit transitions idle → loading → success and replaces the form with a ticket containing `SITE VISIT REQUESTED` and a stable code.

## Media

Use labelled placeholders when files are missing. Still files belong in `assets/incoming/truecut/`; clips belong in `assets/incoming/truecut/clips/`. Process stills with `npm run images -- truecut`. Encode clips as desktop and 720p mobile short-GOP MP4s in `public/templates/truecut/clips/`. The full prompt pack is `docs/image-prompts/truecut.md`.

## Motion and quality

Technical/cinematic motion uses **scan** and **lock**. Include a staged hero load, mask-rise headlines, clip-path media wipes, drawn survey rules, staggered cards, pinned media handoffs, hover lift and pointer spotlight on project cards, button fill wipes, press scale `.97`, floating labels, invalid shake, loading state, and stamped success replacement. Animate transform, opacity, and clip-path. Gate hover effects behind fine-pointer media queries.

All content must be visible with JavaScript disabled and `prefers-reduced-motion: reduce`. Do not autoplay audio. Add unit tests for survey-line progress, motion math, and appointment validation. Add a Playwright spec for the media placeholders, service selection, form success, reduced motion, and 390px overflow.
