# TRUECUT Works design

TRUECUT Works is a fictional field engineering and commissioning crew. The page is a single-action conversion template for small, hands-on service businesses that need visitors to see credible work before booking a conversation.

## Requirements

- One measurable action: book a site visit.
- Keep the header quiet: wordmark, operating signal, and one repeated booking CTA; no multi-level navigation.
- Lead with proof: one full-bleed hero reel, two short process clips, nine documentary stills, capability cards, project proof, and a final credential strip.
- Use labelled media placeholders until files arrive. Every media frame keeps its aspect ratio and carries a useful alt label.
- The booking form is local only. It validates name, work email, and service, then replaces itself with a stamped site-visit ticket. No network request is made.
- Content stays visible with JavaScript disabled and with `prefers-reduced-motion: reduce`.
- Desktop uses a pinned survey-line rail and a changing field log. Phones use a compact progress rail and poster frames until a video is tapped.

## Concept

Field engineering starts with a site walk, so the page advances a survey line through image and video chapters, pins a capability to the field log, and turns the final request into a stamped site visit.

The visitor sees the work in sequence: arrive at the site, inspect the system, show the proof, explain the handoff, and book the next step. The media is persuasive because each frame answers a practical question rather than acting as decoration.

## Palette

| Token | Hex | Role |
| --- | --- | --- |
| asphalt | `#172026` | Primary ink, dark media captions, footer field |
| chalk | `#F5F0E5` | Page field, light cards, text on dark media |
| signal lime | `#E8F146` | Primary action, survey marker, success stamp |
| galvanized | `#B4C3C1` | Quiet surfaces, lines, disabled states |
| oxide teal | `#4B6A72` | Secondary utility text, metadata, tags |
| rust | `#C96B45` | Rare warning and repair-note accent |

No gradients are used for brand colour. Text uses asphalt or chalk for AA contrast. Tints come from `color-mix()` and are never new hex values.

## Type

- **Display:** Archivo Black 400 via `next/font/google`, used for short, uppercase commands and the hero headline.
- **Body:** Manrope 400 / 500 / 600 / 700 via `next/font/google`, used for readable service descriptions and form labels.
- **Utility:** IBM Plex Mono 400 / 500 via `next/font/google`, used for project IDs, status lines, measurement marks, and media captions.

The headline is capped at two lines on wide screens and three on phones. Body text stays between 16px and 20px. Utility labels use 11–12px with 0.08em tracking.

## Layout

The page uses a single-column narrative with a 12-column grid above 900px and a 16px gutter on phones. The sticky header is 72px on desktop and 64px on phones. A fixed 2px signal line runs across the top and follows `--tc-progress`.

1. **Hero / site walk:** dark full-bleed video poster or loop, direct headline, one booking CTA, live status line, and a small “scroll the field log” prompt.
2. **Capabilities:** four proof cards with 4:3 images, service labels, short scope copy, and a survey-line marker that locks to the active card.
3. **Field reel:** a pinned media stage with two short process clips and a side log that updates from real section offsets.
4. **Projects:** three project frames with project ID, scope, and handoff note. Cards use a mild pointer spotlight only on fine pointers.
5. **Why the handoff holds:** safety and working-method content in a dark section, with a 4:5 crew-detail still and a drawn three-step line.
6. **Book a site visit:** compact form with name, work email, and service. The success state prints `SITE VISIT REQUESTED` and a stable ticket code.

The header has no menu. Every booking link points to `#book`. A footer repeats the form status and media note without introducing another goal.

## Mechanic: the field log

`mechanic/fieldLog.ts` converts measured section offsets into a 0–1 progress value. The active line is `scrollY + viewportHeight * 0.32`, so the marker responds to what the visitor is actually reading. Each section contributes `(index + local progress) / (section count - 1)`, clamped to the endpoints.

`motion/ScrollFieldLog.tsx` collects `getBoundingClientRect()` values in one `requestAnimationFrame` loop and writes `--tc-progress` and `data-tc-chapter` to the page root. It does not put scroll frames into React state. The DOM exposes a live chapter label when the active section changes.

On phones the same value drives a horizontal rail. Under reduced motion the rail is static and all media clips render their poster or labelled placeholder without auto-play.

## Motion

**Personality:** technical / cinematic. **Verbs:** scan and lock. The hero has a poster-scale settle, status-line lock, masked headline rise, CTA arrival, and a delayed media start. Section reveals vary by role: mask-rise headings, clip-path image wipes, drawn survey rules, staggered capability cards, and count-like ticket codes. The signature moment is the field reel handing off into the selected capability frame, followed by the booking form stamping `SITE VISIT REQUESTED`.

Tokens live in `truecut.css`:

- `--ease-out`: `cubic-bezier(0.23, 1, 0.32, 1)`
- `--ease-out-expo`: `cubic-bezier(0.16, 1, 0.3, 1)`
- `--ease-in-out`: `cubic-bezier(0.77, 0, 0.175, 1)`
- `--ease-spring`: `linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1)`
- durations: 90ms press, 180ms hover, 420ms base, 800ms section, 1200ms hero
- `--reveal-shift`: 28px; `--stagger`: 70ms

| Element | Enter | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
| --- | --- | --- | --- | --- | --- |
| Header | mark and status lock into the hero load | compresses after the first section mark | booking underline draws in; focus ring is visible | CTA scales to `.97` | chalk header hands to dark hero field |
| Hero media | poster settles from `scale(1.04)`; clip wipe reveals video | survey marker starts at the hero code | media caption brightens; CTA fill wipes | booking CTA presses and releases with spring | hero media crops down into the first capability frame |
| Hero copy | line-masked headline, then lead and CTA stagger | no text parallax | CTA arrow slides; focus ring draws | button label switches to loading when form submits | lead fades under the media handoff |
| Capability cards | ordered rise + tiny rotate/scale | active card receives the survey marker | lift, pointer spotlight, image scale | selected card pins its service and changes the status dot | cards dim as the reel pins |
| Field reel | clip-path wipe for each poster | pinned stage scrubs the active chapter | play control shows a focus halo | tap toggles play; disabled poster keeps state clear | clip hands off through an ink wipe |
| Project cards | staggered image wipe + metadata rise | project rail follows `--tc-progress` | lift, gloss spotlight, tag slides | card focus freezes its hover state | outgoing card scales to `.98` under the next frame |
| Working method | drawn three-step line + mask-rise labels | line marker advances between steps | links draw an underline | no destructive state; focus keeps line visible | dark section hands to chalk booking field |
| Appointment form | paper card settles into place | sticky booking bar appears only after first field focus | floating labels rise; invalid message slides down | submit morphs idle → loading → stamped success | form is replaced by a stamped ticket |
| Footer | status line enters after the form | stays quiet | link underline draws | no state change | closes on a final chalk rule |

## Signature details

1. The survey line and section code are always visible near the current media chapter.
2. Project IDs use corner cuts that echo the TRUECUT mark.
3. Signal lime appears only on actions, status dots, selected media tags, and the completed stamp.
4. The form success state is a physical ticket replacement, not a toast.

## Do / Don't

**Do:** show the actual work area, instruments, panels, hands, and handoff details; keep captions specific; use one CTA; reserve lime for decisions; use poster frames for every clip; keep the survey line tied to real offsets.

**Don't:** use generic smiling stock teams, fake client logos, invented metrics, a navigation maze, multiple competing CTAs, autoplay audio, or a static wall of cards with identical fades.

## Files

- `layout.tsx` — route shell, fonts, metadata, and no-JS reveal override.
- `truecut.css` — Tailwind import, palette, type, layout, motion tokens, responsive states, and prefix-scoped rules.
- `brand/Logo.tsx`, `icon.svg`, `opengraph-image.tsx` — identity assets.
- `assets.tsx`, `assets.generated.ts` — responsive picture/video wrappers and placeholder fallbacks.
- `motion/math.ts`, `motion/Reveals.tsx`, `motion/ScrollFieldLog.tsx` — pure math, in-view reveals, and the one rAF scroll loop.
- `mechanic/fieldLog.ts`, `mechanic/FieldLog.tsx` — section measurements, marker state, and field-log rail.
- `forms/appointment.ts`, `forms/AppointmentForm.tsx` — local validation and stamped success state.
- `sections/` — hero, capabilities, field reel, projects, working method, booking, and footer.

## Imagery

Prompts live in `docs/image-prompts/truecut.md`. The expected incoming files are stored under `assets/incoming/truecut/` and processed into `public/templates/truecut/` when supplied. The template can ship with placeholders; adding the files later does not change section markup or interaction logic.
