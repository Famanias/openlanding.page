# openlandingpage: three landing-page templates

Date: 2026-10-20
Status: approved by owner (2026-10-20)

## 1. Intent

openlandingpage will become a public gallery of landing pages, similar to motionsites.ai or Awwwards' site gallery. Visitors use the gallery for design inspiration. Each template will have two buttons:

- **Copy website** hands the visitor's AI agent the template's source.
- **Copy prompt** hands over a written design brief the agent can rebuild from.

**This project:** the first three templates, plus the minimal app they live in. The gallery UI comes later as its own project.

**Owner's goal:** show their skill at designing landing pages. Every template must look hand-crafted and portfolio-grade, never like a component kit.

**Agent-copyability is a design constraint, not a feature.** It shapes the code structure as much as the visuals:

- clear tokens
- readable class names
- self-contained folders
- written design rules

## 2. Goals, non-goals, anti-goals

### Goals

- Three single-page landing sites, each a complete fictional brand: name, logo, icon/favicon, palette, typography, imagery and copy.
- Each template uses one distinct theme:
  - KŌJI: 3D-focused
  - Orrery: presentation-style
  - Cairn: showcase
- Each template ships `DESIGN.md` and `PROMPT.md`, so the future gallery buttons have something real to hand over.
- Deployed publicly on Vercel.

### Non-goals

- The gallery itself: browsing, filtering, the copy buttons, accounts.
- Multi-page sites. Each template is exactly one landing page.
- Working back-ends. Forms show a convincing success state and send nothing.
- A database (no Supabase for now).
- A CMS.

### Anti-goals (failure even if it technically works)

- Templates that look like shadcn/ui, Tailwind UI or another kit.
- Generic "AI aesthetic" in Orrery: purple gradients, glowing brains, robots, neon.
- Templates that import shared code, so copying one folder doesn't work on its own.
- Sluggish or janky motion. These are showcase pieces, so motion quality is part of the product.
- Colours outside a brand's palette sneaking in, especially in Cairn.

## 3. Decisions made by the owner

| Decision | Choice |
|---|---|
| Repo | This repo (`E:\orca\workspaces\webflow-projects`). The earlier `Famanias/openlandingpage` Webflow Cloud starter is abandoned. |
| Framework | **Next.js, latest stable** (confirm the version at build time) |
| Hosting | **Vercel** (changed from Cloudflare) |
| Imagery | **All AI-generated.** The owner generates images in Gemini from Claude's prompts. 3D uses the `scroll-world` and `webgpu-threejs-tsl` skills. |
| Scope per brand | **Single landing page** |
| Brands | Invented by Claude, then reviewed and approved by the owner (below) |
| Restaurant | Japanese-themed, **fully brutalist (1960s–90s)**. **Only the food is 3D**; everything else is flat 2D brutalist graphics. |
| Clothing | Mountaineering. **Black, dark blue and white only.** The hero mountain is **K2**. |
| AI company | Left to Claude (Orrery approved as proposed) |

## 4. Technical approach

These are Claude's calls unless the owner decided them (marked "owner").

- **Next.js, latest stable (owner).** Use the App Router and TypeScript.
- **Vercel hosting (owner).**
  - Plain Next.js with no adapter. The owner switched from Cloudflare after learning that its free plan caps server code at 3 MB.
  - Use a `*.vercel.app` address for now.
  - Do an early real deploy containing the 3D and GSAP dependencies.
- **Tailwind CSS v4.** Each template defines its own tokens (colours, fonts, spacing, motion) in its own CSS file.
- **Motion** (motion.dev) for UI animation.
- **GSAP + ScrollTrigger + Lenis** for scroll choreography, mainly in Orrery and Cairn.
- **KŌJI 3D (owner chose the skills, Claude chose the split):**
  - **Real-time dish:** Three.js `three/webgpu` + TSL in a client component, following the `webgpu-threejs-tsl` skill.
    - Vanilla Three.js rather than React Three Fiber, so the copied code ports to any stack.
    - `WebGPURenderer` falls back to WebGL2 automatically.
  - **Scroll flight:** the framework-agnostic scrub engine from the `scroll-world` skill (`references/scrub-engine.js`), wrapped in a client component.
- **shadcn/ui:** reserved for the future gallery shell. Not used inside templates.
- **Icons:**
  - Each brand's logo and icon are custom SVGs.
  - Use Phosphor or custom SVGs inside templates where a brand needs UI icons.
  - Lucide is for the future gallery only.
- **Fonts:** load through `next/font/google`, scoped to each template.
- **Accessibility and performance:**
  - Respect `prefers-reduced-motion`. Reduced motion drops movement, keeps fades, and shows the 3D dish static.
  - Keyboard access throughout.
  - Lazy-load the 3D canvas, with a static poster image first.
  - Lighthouse performance should not be sacrificed for spectacle on mobile.

### Repo structure (Claude's call)

There is **no shared root layout**. Each template is its own route group with its own root layout (`<html>`, `<body>`, fonts, global CSS, background), using Next.js multiple root layouts. That keeps every template independent of app-level styling.

```
src/app/
  (index)/
    layout.tsx, page.tsx           # minimal index listing the three templates (placeholder for the future gallery)
  (koji)/
    layout.tsx                     # KŌJI's own root layout: fonts, koji.css, metadata, icons
    koji/
      page.tsx
      components/
      koji.css                     # Tailwind v4 import + KŌJI tokens
      DESIGN.md
      PROMPT.md
  (orrery)/ ...
  (cairn)/ ...
public/templates/<slug>/           # optimised images, KŌJI video clips + posters, favicon/icon/OG files
```

- URLs are `/koji`, `/orrery` and `/cairn`.

**What counts as one template (the copy unit)** is two folders, `src/app/(<slug>)/` and `public/templates/<slug>/`.
- The recipient starts from a fresh `create-next-app` (latest, App Router, TypeScript, Tailwind v4).
- They install the npm packages listed in a "Requirements" section at the top of that template's `DESIGN.md`. That section names the packages and the minimum Next.js version.
- Assets come with the copy. `PROMPT.md` references the live hosted asset URLs as reference images and tells the agent to generate its own.

**Self-containment rule:** files in a template's folders import only from npm packages and their own files, never from another template or shared app code.

**Done check:** for each template, copy those two folders into a fresh `create-next-app`, install the listed packages, then run `next build`. It must render the same as the deployed page.

Each template sets its own metadata: title, description, favicon/icon and Open Graph image.

### Copy-ready files per template

- **`DESIGN.md`** holds the design rules:
  - concept
  - palette tokens with roles
  - type scale and fonts
  - spacing and grid
  - motion rules (curves, durations, what animates and why)
  - section-by-section layout
  - imagery direction, including the generation prompts used
  - signature details
  - do's and don'ts
- **`PROMPT.md`** is a single paste-ready prompt. An AI agent should be able to rebuild a faithful version of the template from it alone, in React/Next.js + Tailwind.

## 5. The three brands

### 5.1 KŌJI: Japanese restaurant, 3D-focused, fully brutalist

**Concept**

- A modern Japanese restaurant built around fermentation (kōji, miso, shio).
- It lives in an imagined 1972 Metabolist concrete tower in Ginza: B1–14F, 12 seats, 11 omakase courses, open 18:00–23:00.
- The aesthetic is 1960s–90s Japanese brutalism: raw board-marked concrete, monumental type, rigid grids, one signal colour.

**3D: only the food is 3D.** Everything else is flat 2D brutalism. Two techniques, one per job (Claude's call on the split):

1. **Hero: one real-time 3D dish** (a miso-glazed nigiri or similar), built in code with Three.js WebGPU + TSL.
   - It turns slowly and can be dragged to rotate.
   - The geometry and shader materials (rice grain, glaze, fish marbling, stoneware) are procedural. No model files.
   - Reduced motion and no-WebGPU/WebGL fallback: a static poster image.
2. **Course sequence: a scroll-scrubbed "food flight"** using the `scroll-world` technique.
   - The camera dives into a dish, then flows seamlessly to the next, with scroll driving video time.
   - It covers **5 dish scenes**, each representing a course group from sakizuke through shokuji. The full 11-course menu sits in 2D type alongside.
   - Dishes sit on concrete plinths against flat concrete-grey, in keeping with the brutalist look.
   - That's 5 dive-in clips + 4 connector clips = **9 clips**.

**Clip production (owner): the owner generates all 9 clips in Gemini/Veo from Claude's prompts.** Seams must be frame-identical, so production runs as a relay:

1. The owner generates the 5 scene stills in Gemini (prompts in `docs/image-prompts/koji.md`).
2. Claude writes the dive-in prompts. The owner generates each clip from its scene still as the starting frame.
3. For each connector, Claude extracts the **last frame of dive N** and the **first frame of dive N+1** with ffmpeg. The owner generates the connector with those as its start (and, where available, end) frames, for example Veo's first-and-last-frame mode.
4. The owner saves clips to `assets/incoming/koji/clips/` using the given filenames.
5. Claude checks every seam for a visible jump.

**Seam fallback (Claude's call):** if a connector can't be made frame-identical, mask the join with an on-brand concrete "slab wipe" (a hard flat panel sweeping across), rather than letting it pop.

**Mobile (Claude's call):** desktop 16:9 chain only, to keep the owner's generation work bounded. On phones the same chain is centre-cropped. A native 9:16 chain can be added later.

**2D**

- Everything else is flat graphic brutalism: concrete-grey slabs, huge type, rigid grid and red signage strips.
- The vertical kanji 麹 appears as a graphic element.
- A red hanko seal serves as the icon and stamp.
- A noren-curtain motif runs along the nav.
- The concrete building appears only in generated photos.

**Palette**

| Name | Hex |
|---|---|
| Sumi | `#1A1918` |
| Shadow | `#4A4743` |
| Béton | `#8E8A83` |
| Washi | `#EDEAE4` |
| Shu (the only accent) | `#C8331F` |

**Type**

- Dela Gothic One for display. It includes Japanese glyphs.
- Zen Kaku Gothic New for body text.
- DM Mono for signage, prices and floor numbers.

**Icon:** the red hanko seal bearing 麹.

**Photo direction (generated):**

- 1970s Fujicolor film look: grain, slightly faded.
- Board-marked concrete counters, heavy stoneware, steam in raking light, chefs seen through concrete openings.
- No clean modern food styling.

**Sections (Claude's proposal; builder may refine):**

1. Hero: 3D dish + KŌJI wordmark + signage strip
2. The kitchen / fermentation story
3. Omakase course sequence (3D dish per course)
4. The building (photos)
5. Chef
6. Reservation (demo form)
7. Footer: address, hours

### 5.2 Orrery: AI company, presentation-style

**Concept**

- An AI company whose platform orchestrates teams of specialised AI agents, like planets in a clockwork orrery.
- Calm, editorial, confident.
- Deliberately avoids the generic AI aesthetic.

**Presentation mechanics**

- The page plays as a 10-slide keynote. Each scroll step advances one full-screen slide.
- On screen: slide counter ("03 / 10"), chapter rail, arrow-key and Page Up/Down navigation.
- Diagrams build up piece by piece like keynote builds.
- On mobile, slides may stack as tall sections while keeping build animations, rather than fighting touch scrolling.

**Slides**

1. Title
2. The problem ("one agent isn't a team")
3. The orrery: the orbit diagram builds piece by piece
4. How it works (3 steps)
5. Use cases
6. Results in numbers
7. Customer quotes
8. Pricing
9. Security
10. Closing call to action (demo form)

**Palette**

| Name | Hex | Role |
|---|---|---|
| Ink | `#0E0F13` | |
| Bone | `#F2EFE8` | |
| Ultramarine | `#2F3BFF` | primary accent |
| Amber | `#FFB000` | secondary |

**Type**

- Instrument Serif for display.
- Inter Tight for body text.
- Geist Mono for labels.

**Icon:** a dot inside two orbits with one ultramarine satellite.

**Imagery (generated):** editorial abstract art, such as orbits, textured paper and brass instrument details. No robots, brains or neon.

### 5.3 Cairn: mountaineering apparel, showcase

**Concept**

- Technical mountaineering apparel: shells, down suits, base layers, gloves.
- Named after the stone stacks climbers build to mark a route.
- Tagline: "Alpine equipment · Tested on K2".

**Showcase mechanics: the page is a K2 ascent**

- A K2 silhouette (the classic pyramid as seen from Concordia, above the Baltoro Glacier) stays pinned.
- A dot climbs the dashed Abruzzi Spur route as you scroll.
- An altitude meter fills, and each camp label lights up as its chapter arrives.
- K2's coordinates (35.8825° N, 76.5133° E) appear as a detail.

| Altitude | Stop | Chapter |
|---|---|---|
| 5,000 m | Base Camp | Brand intro + FW26 collection |
| 6,050 m | Camp 1 | Base layers |
| 6,700 m | Camp 2 | Mid layers + layer-system diagram |
| 7,350 m | Camp 3 | Shells: hero product showcase, colourway swap, fabric zoom |
| 7,900 m | Camp 4 | Down: 8000-metre suits and parkas |
| 8,200 m | Bottleneck | Gloves and gaiters, spec sheets |
| 8,611 m | Summit | Horizontal expedition lookbook with photo hotspots + email signup (demo) |

**Palette (strict: black, dark blue and white only)**

| Name | Hex |
|---|---|
| Black | `#0B0C0E` |
| Dark blue | `#0F1E33` |
| White | `#F5F6F7` |

- Only tints and shades of the dark blue are allowed for borders, muted text and mountain layers: `#16294A`, `#2A3D5E`, `#56657F`, `#A5AEBD`, `#DDE1E7`.
- There is no accent hue. Emphasis comes from white-on-navy inversion.

**Type**

- Barlow Condensed (800) for display.
- Barlow for body text.
- IBM Plex Mono for specs, altitude and labels.

**Icon:** three stacked stones, white on navy (black on white for light backgrounds).

**Spec sheets:** styled like gear labels, showing weight in grams, waterproof rating in mm, breathability and fill power.

**Imagery (generated):**

- Subjects: night ascents, blue-hour snow, K2 and the Karakoram, plus product shots of the garments in black, navy or white.
- **Strict palette (Claude's call).** Every photo gets a navy duotone/tritone treatment mapped to black → dark blue → white, so no skin, rock or sky hue breaks the palette.
  - Apply it at asset-processing time, not with a CSS filter, so copied assets already match.
  - Fabric zoom images get the same treatment.

## 6. Asset generation

- **Images (owner): the owner generates every image in Gemini (gemini.google.com) from prompts Claude writes.**
  - Claude delivers one prompt file per template at `docs/image-prompts/<slug>.md`. Each image entry gives:
    - exact filename
    - aspect ratio
    - where the image is used
    - the full prompt, with a shared style preamble repeated in each prompt so the set stays cohesive
  - The owner saves the results into `assets/incoming/<slug>/` using those filenames.
  - The builder then optimises the images (WebP/AVIF, sized variants, plus the Cairn duotone treatment) into `public/templates/<slug>/`.
  - Each image's prompt is recorded in that template's `DESIGN.md`.
  - **The prompt files come first**, before template build work, so generation can run in parallel with scaffolding.
- **3D (KŌJI): see section 5.1.** The real-time hero dish is procedural code. The scroll flight's 9 video clips are generated by the owner in Gemini/Veo, using the frame relay described there.
- **Skills to install for 3D (owner):** `npx skills add oso95/scroll-world` and `npx skills add dgreenheck/webgpu-claude-skill` (Three.js WebGPU + TSL).
- **Logos and icons:** hand-built SVGs, not generated rasters. They need to be crisp, small and editable.

## 7. Build order and review points (Claude's call)

1. Scaffold the app, then do the early Vercel deploy with the 3D and GSAP dependencies installed.
2. **Orrery** end to end. It has the least generation risk and proves the template structure, `DESIGN.md`/`PROMPT.md` and the copy-unit check.
3. **Cairn.**
4. **KŌJI** last, since it carries the 3D generation risk.

For each template, the owner reviews the generated images (and, for KŌJI, the 3D dishes) before they're built into the page.

## 8. Left to the builder

- Exact copy text, within each brand's voice.
- Exact section order and count within the outlines above.
- Motion timings, within the rules: UI under 300 ms, strong ease-out curves, scroll pieces may run longer.
- The minimal index page at `/`.
- Exact mobile adaptations of each theme.
