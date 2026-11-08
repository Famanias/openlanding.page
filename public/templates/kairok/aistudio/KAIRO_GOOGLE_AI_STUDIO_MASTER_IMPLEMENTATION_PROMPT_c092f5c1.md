# KAIRO — Google AI Studio Master Landing Page Implementation Prompt

> **COPY THIS ENTIRE FILE INTO GOOGLE AI STUDIO ALONG WITH `kairo-assets.zip`.**
>
> **Deliverable:** Build the working React + TypeScript landing page and all required project files. Do not answer with a plan, incomplete mockup, or pseudocode. Implement and test the actual interactive experience.

---

## 0. Role, goal, and non-negotiable rules

Act as a senior creative developer, interaction designer, motion engineer, and frontend architect. Build a production-quality, visually original, cinematic product landing page for **KAIRO**, a **fictional premium imaging/camera brand**. The product is a concept mirrorless camera, **KAIRO K-01**.

The headline concept is **“See beyond the expected.”** The website should feel like an atmospheric camera commercial you can navigate by scrolling, followed by a genuinely usable interactive product experience.

### Absolutely mandatory project directives

1. The **literal first line** of `src/App.tsx` MUST be:
   ```tsx
   'use client';
   ```
   Place **no blank line, comment, or import before it**.
2. The **literal first line** of **every** React component file under `src/components/` (including nested subdirectories) MUST also be:
   ```tsx
   'use client';
   ```
   Put imports on subsequent lines. Verify this in the finished source.
3. **All images, SVGs, video, icon files, textures, generated posters, and other visual assets must live under `public/templates/kairok/`** and must be referenced in browser code as `/templates/kairok/<filename>` (or `/templates/kairok/subfolder/<filename>`). No references to `src/assets`, hard-coded computer paths, Google Drive links, CDN image proxies, or external stock images.
4. Unpack the supplied `kairo-assets.zip` into `public/templates/kairok/` **without changing the supplied filenames**. If you generate derivatives (e.g., cleaned cutout, exact video start/end frames, optimized media), put those derivatives in `public/templates/kairok/` too.
5. Use **React + TypeScript**, componentized code, and actual CSS/JS motion. Do not create the whole website as a single raster image, screenshot, video, or static mockup. User-facing controls must perform the actions they advertise.
6. **DO NOT recreate Mossline.** Mossline is a reference for its **motion system only**. Do not copy its product, wording, island, floating rocks, sensor mast, lime palette, Inter Tight typography, solution cards, environmental metrics, exact section geometry, or literal 640vh/animation timings just because the original used them. Design KAIRO's visual identity, layout, copy, and interactions for a camera product.
7. Do not invent actual independent reviews, shipped hardware features, certifications, awards, prices, shipping dates, camera test results, sensor specifications, or real customer testimonials. KAIRO is fictional: where needed, mark settings/copy as **illustrative concept/demo content**.
8. Prioritize a polished, seamless experience at 1440px desktop, but ensure 1920px, 768px tablet, 390px mobile, and 320px small mobile all work. There must be **no accidental horizontal scrolling**.
9. Support **`prefers-reduced-motion`**. Preserve all information and interactions even when pinned video scrubbing and cinematic animations are disabled.
10. All **navigation links, CTAs, interactive hotspots, tabs, finish selectors, dialogs, and buttons must work**. Never leave fake interactive styling on a nonfunctional element.

**Output:** Create/modify the actual project source files. At the end, explain what was implemented, which assets were used, how to run it, and any real limitations. Do not stop after generating the hero.

---

## 1. The two references: preserve behavior, invent design

### Mossline motion behaviors to adapt

The Mossline reference is a pinned, multi-beat scroll experience featuring: a bold foreground hero object; a video-driven fly-in; frame-synchronized scene changes; multiple depth layers; foreground objects with parallax; scroll-timed title/text/annotation reveals; interactive hotspots; a restrained HUD; and a smooth transition into product information.

Translate those ideas into **KAIRO's photographic narrative**:

| Mossline principle | KAIRO implementation |
|---|---|
| Monumental floating island | Monumental premium titanium camera suspended in an atmospheric black studio |
| Camera pushes toward an island | Virtual camera flies **into KAIRO's physical camera lens** |
| Landscape landing | Camera exits the aperture into a **rain-wet cinematic city street** |
| Floating rocks close to camera | Optical reflections, aperture arcs, thin lens-glass reflections, and selective foreground bokeh |
| Fog masking for legible copy | Localized optical haze / exposure veil, used only when necessary for text contrast |
| Landscape hotspots | Focus targets, exposure points, reflection details, image-composition annotations |
| Sensor station card | Image-making UI: aperture/focus/exposure demonstration, with explicitly illustrative values |
| Solution cards | An original **optical lab + product collection** experience, not three generic hover cards |

Use the supplied actual fly-through video as the center of the experience. **Do not fabricate a camera fly-through entirely with CSS transforms of still images.**

### Different layout from earlier landing pages

Do **not** build a familiar stack of full-bleed hero → three-column features → horizontal case studies → pricing cards → oversized footer. KAIRO's distinguishing architecture is **object → optical tunnel → cinematic world → interactive image-making station → precision-engineering editorial → camera collection → quiet invitation**. The narrative and spatial design should feel specific to a camera.

---

## 2. Asset manifest — actual contents of supplied ZIP

I inspected the provided ZIP. It contains **exactly nine supplied assets**:

| Filename in `public/templates/kairok/` | Actual media | Role |
|---|---|---|
| `kairo-01-hero-camera.webp` | 2752 × 1536 WebP | High-resolution starting hero camera against a dark studio |
| `kairo-02-camera-cutout.png` | 2752 × 1536 PNG **without alpha** | Camera on a **bright green matte**; must be keyed before using as a true foreground cutout |
| `kairo-03-lens-macro.webp` | 2752 × 1536 WebP | Extreme closeup of the copper-ringed camera lens |
| `kairo-04-city-environment.webp` | 2752 × 1536 WebP | Nighttime wet city street; city-scene still |
| `kairo-05-sensor-detail.webp` | 2752 × 1536 WebP | Detailed closeup of camera sensor / mount |
| `kairo-06-exploded-camera.webp` | 2752 × 1536 WebP | Disassembled camera / optical elements on dark background |
| `kairo-07-camera-collection.webp` | 2752 × 1536 WebP | Three consistent camera finishes / product lineup |
| `kairo-08-sample-photo.webp` | 2752 × 1536 WebP | Moody cinematic street photograph |
| `kairo-09-lens-to-city-flythrough.mp4` | **1920 × 1080 H.264, 24 fps, ~7.93 s, 190 frames**, no need for audio | Primary scroll-scrub camera-to-city fly-through |

**Critical asset caveat: the supposed cutout is not actually transparent.** `kairo-02-camera-cutout.png` is RGB with a green backdrop, not RGBA. **Never show the raw green-matte image on the live site.** At build time, create a cleaned RGBA derivative such as `public/templates/kairok/kairo-02-camera-cutout-alpha.png`, using a chroma-key operation (threshold green dominance, soften/antialias edge alpha, suppress green spill), and visually inspect the edges against both black and warm-gray backgrounds. A Node image-processing utility such as `sharp` is fine if available; generate the derived asset **in `public/templates/kairok/`**. If the key is not clean enough, do not force an ugly cutout: use the still/video and a properly aligned CSS layering alternative. It is better to omit foreground overlap than to ship visible green halos.

**Video matching:** The fly-through begins with a front-facing camera, pushes into the lens and its aperture, then emerges into the wet city. The supplied hero/city stills resemble these scenes, but do **not assume they are pixel-identical** to the video's boundary frames. The seamless solution is to **extract the actual first and near-final frames from the MP4**, save them under `public/templates/kairok/` (for example `kairo-video-first.webp` and `kairo-video-last.webp`), and use those as the exact handoff/poster surfaces. Use `kairo-01` and `kairo-04` as high-quality adjacent editorial visuals when their framing is consistent. Never let a mismatched still cause a noticeable jump.

**Media loading:** Do not fetch every image at first paint. Hero poster and scrub video are high priority; `kairo-05` through `kairo-08` should lazy-load when practical. The video is about 5.2 MiB and the high-res images are several MiB each, so use responsibly sized media and an explicit fallback.

**Required URL convention:**

```tsx
const KAIRO_ASSETS = {
  hero: '/templates/kairok/kairo-01-hero-camera.webp',
  cameraCutout: '/templates/kairok/kairo-02-camera-cutout-alpha.png', // create during preprocessing
  lens: '/templates/kairok/kairo-03-lens-macro.webp',
  city: '/templates/kairok/kairo-04-city-environment.webp',
  sensor: '/templates/kairok/kairo-05-sensor-detail.webp',
  exploded: '/templates/kairok/kairo-06-exploded-camera.webp',
  lineup: '/templates/kairok/kairo-07-camera-collection.webp',
  sample: '/templates/kairok/kairo-08-sample-photo.webp',
  flythrough: '/templates/kairok/kairo-09-lens-to-city-flythrough.mp4',
};
```

Do not assume the derived `cameraCutout` exists until the preprocessing step produces it; otherwise use a controlled fallback.

---

## 3. Brand foundation

**Brand:** KAIRO

**Product:** KAIRO K-01 (fictional mirrorless camera concept)

**Category:** Design-led imaging technology

**Core proposition:** **See beyond the expected.**

**Supporting message:** A camera that invites you to find more in the ordinary—light, atmosphere, texture, and moments that vanish when you blink.

**Personality:** Precise, quiet, tactile, premium, curious, cinematic, sophisticated; less aggressive than a gaming tech site; not kitschy retro photography.

**Palette** (inspired by actual assets but original to KAIRO):

```css
:root {
  --black-carbon: #121315;
  --graphite: #1d2024;
  --titanium: #7f858d;
  --porcelain: #f2efe9;
  --copper: #e68f63;
  --copper-soft: #b8785d;
  --stone: #d2cec7;
  --body-muted: #a8aaa9;
  --panel-line: rgba(242,239,233,.15);
}
```

Use carbon/graphite for the cinematic story; use porcelain/stone for the editorial product chapters. Copper should be an intentional accent tracing the camera's lens ring and focus indicators, **not** a full-page neon glow.

**Typography:** A bold, contemporary grotesk/sans for expressive hero headlines (for example a locally available or properly loaded variable sans with sculptural letterforms); clean technical sans for product descriptions; small restrained mono for viewfinder readouts. **Do not reuse Mossline's Inter Tight + JetBrains Mono pairing verbatim**, and do not simply imitate our previous KAIRO concept mockup as a generic SaaS template. Ensure font fallback is attractive, legible, and layout-stable. If adding self-hosted font files, place them in `public/templates/kairok/fonts/` and reference them with `/templates/kairok/fonts/...`; no hidden font assets elsewhere.

**Copy principles:** Be evocative in film scenes, concrete in UI, sparse everywhere. No fake comparison statistics or invented optical performance claims. Example headline/copy vocabulary: **“See beyond the expected.”**, **“Look closer.”**, **“Follow the light.”**, **“Made for the moment you almost missed.”**, **“Form meets focus.”**

**Primary CTA:** `Explore KAIRO` in the initial hero (scrolls into the experience), and `Join the KAIRO list` or `Get updates` for conversion at the end. If a form exists, it may be an accessible demo form using local validation and a truthful demo-success message; do not imply a server submission unless you actually implement one.

---

## 4. Page information architecture (distinct, cinematic, intentional)

### A. One continuous pinned film sequence (primary attraction)

A single immersive, cinematic stage (roughly 520–680vh desktop **as a starting point, not a copied requirement**) whose viewport-sized content remains sticky while the video and composition respond to scroll.

#### Scene 1 — THE OBJECT / hero reveal

- The screen is an atmospheric charcoal studio, with no visible photo rectangle or obvious hero dashboard.
- Oversized KAIRO K-01 camera floats at the center, facing forward; the lens is the visual anchor.
- A large headline **“See beyond the expected.”** sits across the upper or middle composition. If the cleaned camera cutout works, the camera/lens passes **in front of part of the headline**; text depth is deliberately layered. Do not obscure so much text that it becomes unreadable.
- A tiny editorial eyebrow `KAIRO / K-01` and a secondary descriptor are visible; compact initial nav.
- Two intentional actions: `Explore KAIRO` (scrolls to the fly-in experience) and `View the camera` (scrolls to product section).
- Small side annotations identify `01 / THE OBJECT` and `SCROLL TO ENTER`; use a progress marker. Keep negative space generous.
- On initial load, camera enters gently (subtle scale/tilt/parallax), headline reveals line by line with a proper mask, and the copper lens edge catches a passing glint. No generic bouncing, no autoplay takeover, and no first-paint flash.

#### Scene 2 — THE APPROACH / push toward the lens

- Scrolling moves continuously from the hero camera toward the lens, synchronized with the supplied actual MP4.
- Camera magnifies, revealing rings and reflections. The headline lifts, dissolves, and becomes temporarily absent before the lens dominates the view.
- Use a cinematic optical-haze layer to blend the hero still into the clip **only when the frames align**; this can be a short matched-frame crossfade.
- Preserve the real perspective; do not fake the motion with a CSS scale of `kairo-01` once the video is available.

#### Scene 3 — THE APERTURE / transition threshold

- At approximately the middle of the supplied clip (adapt to actual footage), the optical elements occupy the whole viewport.
- Animate ultra-subtle rings, aperture coordinates, and a narrow viewfinder reticle. These must look like camera optics, not cyberpunk UI.
- Text appears transiently: **“Every detail changes the story.”** Keep it very short, legible and non-interactive so the fly-in remains uninterrupted.
- A short dark-frame and warm copper flash can conceal transitions, but don't introduce a hard white-out.

#### Scene 4 — THROUGH THE FRAME / city arrival

- The aperture opens to a rainy city street, consistent with the MP4.
- Video finishes; transition to the exact near-final video frame or matched city still without any compositional jump.
- The city becomes a full-viewport photographic stage. Tiny rain reflections and practical lights can move subtly (if implemented efficiently).
- New caption: **“A world worth noticing.”** or **“Make the ordinary impossible to overlook.”**
- Do not overlay a fake HDR photo filter that destroys detail. Preserve genuine blacks, warm street reflections, and atmospheric depth.

#### Scene 5 — FIELD NOTES / discover the image

- While the city remains visible, introduce 3–4 purposeful focus points, anchored to actual image regions: for example `LIGHT`, `DEPTH`, `MOTION`, `DETAIL`.
- They appear in deliberate sequence; on click/keyboard focus, each marker opens a small, readable annotation panel with short explanation and focus styling.
- All markers must be positioned using percentages of the actual image frame **and recalculate correctly for cover-cropping**, especially on mobile. Use an overlay wrapper with the same `object-fit` geometry as the city image; don't position percentages relative to a different box.
- Add an optional **Focus Explorer** control: shift focus emphasis between an illuminated shopfront and distant street lights with a restrained vignette/blur demonstration. Mark this as a visual illustration, not a live camera sensor simulation.
- The interactive focus points must not get disabled just because the scroll controller runs; make them clickable/tappable while this story phase is on screen.

#### Scene 6 — THE HANDOFF / optical world to product

- The city settles; title/annotations depart; a warm stone/porcelain editorial panel enters with a **deliberate optical iris shape or diagonal viewfinder mask**, not Mossline's rounded white solution panel copied exactly.
- The first technical chapter appears beneath, with the lens-macro image framing the handoff.
- Preserve scroll continuity and avoid abrupt dark-to-white flicker.

### B. Light and lens / editorial feature section

**Layout:** Asymmetric composition with massive typographic numbering and one large image field, not a generic two-column SaaS feature card.

- Use `kairo-03-lens-macro.webp`.
- Header: **“Light changes everything.”**
- Have a minimal interactive aperture selector with three states `Open`, `Balanced`, `Narrow` (illustrative only). On each selection, animate a CSS/Canvas iris overlay and corresponding sample vignette/blur preview; keep transitions snappy and reversible.
- The control should modify a real visual property. Display accessible selected state (`aria-pressed` or tabs).
- Use clean, technical information design, not fake measurements.

### C. Precision / exploded engineering studio

**Layout:** A wide immersive dark horizontal editorial band anchored by `kairo-06-exploded-camera.webp` and `kairo-05-sensor-detail.webp`, with vertical scroll controlling selective product framing.

- Display the exploded-camera image as a dominant composition with annotations connected to actual lens/sensor regions.
- Use small callouts like `OPTICAL ASSEMBLY`, `IMAGE SENSOR`, `BODY & CONTROL`.
- Clicking a callout smoothly shifts the image focus and reveals a short note. Use correct accessible buttons, not inert hover-only labels.
- Include a secondary detail panel showing `kairo-05` with a slow image clip or mask reveal.
- Avoid representing the supplied static image as a real 3D model or claiming the user can freely rotate it. No faked 360° interaction.

### D. The image / photographic field notes

**Layout:** Immersive editorial photo viewing area with generous margins and a black-to-porcelain background change. Use `kairo-08-sample-photo.webp` prominently and optionally `kairo-04-city-environment.webp` as a second composition.

- Header: **“Made for the moment you almost missed.”**
- Let the viewer choose `City / After dark` and `Field notes` to change image display and annotation overlays.
- Include an optional draggable before/after exposure curtain, but ONLY if it transforms the image meaningfully with CSS filter or two derived exposures. Label the demo `Illustrative exposure preview` to avoid pretending it is a sensor performance test.
- Focus on photography, not a wall of small cards.

### E. Product collection / finish exploration

**Layout:** Oversized gallery table on a warm mineral background, using `kairo-07-camera-collection.webp` as the main artwork. A horizontal swatch/index rail sits beside or below it.

- The supplied image contains three cameras. A selector can change which camera is framed/emphasized (e.g. by cropping/panning to a different third of the same image). Do not pretend the supplied single 2D lineup is a fully rotatable, physically accurate 3D configurator.
- Provide three finish labels suitable for the actual visible cameras (e.g., `Carbon`, `Silver`, `Titanium`; adjust names to the actual colors). Changing selection must animate a visible image focus/crop and update descriptive text.
- Add concise product navigation and a prominent `Join the KAIRO list` CTA.

### F. Closing / quiet invitation and footer

- End in an original, restrained, almost gallery-like composition with the KAIRO wordmark and one beautiful camera product image. It should feel like the final frame of a film, not a generic SaaS conversion banner.
- CTA copy: **“Your next frame starts here.”** Button: `Join the KAIRO list`.
- A simple email form/dialog can validate input, show a transparent local demo state, and close with Escape. Do not claim a successful external registration.
- Footer: minimal brand, fictional product disclaimer, working navigation anchors, social links only if they point to actual safe destinations; no dead `#` placeholders presented as useful links.

---

## 5. Explicit pinned scroll / timing contract

Use **one scroll-progress controller** for the cinematic story. The behavior must be deterministic, reversible, resize-safe, and calibrated to the actual media.

Suggested normalized progress map for a ~600vh pinned story:

| Overall scroll progress | Beat | Primary change |
|---|---|---|
| `0.00–0.12` | Hero | Camera and title visible; subtle drift; intro HUD |
| `0.12–0.29` | Approach | Headline moves out; camera video advances toward the lens |
| `0.29–0.48` | Aperture | Close optical pass, iris detail, one transient line of copy |
| `0.48–0.66` | Arrival | Footage emerges into city; city still/poster handoff |
| `0.66–0.86` | Field notes | Hotspots and focus explorer; controlled stable city hold |
| `0.86–1.00` | Handoff | Cinematic scene settles; optical editorial transition begins |

These intervals are **starting guides**. **Inspect the real video and adjust the frame mapping to the physical moment in the clip**. Do not make the video reach its final city frame at a scroll position where the viewer is still inside the camera lens.

### Scroll math

- Story has a sticky stage with `height: 100svh` or an equivalent robust viewport measure.
- Progress = `clamp(-storyRect.top / (story.offsetHeight - viewportHeight), 0, 1)`.
- Use one `requestAnimationFrame` loop with time-corrected smoothing. On major input/resize changes, ensure state stays synchronized; don't drive the same property from conflicting CSS animations and JavaScript.
- Define reusable helpers `clamp01`, `segment(p,start,end)`, `smoothstep`, and an interpolation function.
- Pin only the story stage. **Release scroll normally after it.** No scroll-jacking or artificial global wheel hijacking.
- Scroll states must work in **both directions**, including reverse scrubbing and back navigation.

### Video scrubbing — actual supplied footage

- Use `/templates/kairok/kairo-09-lens-to-city-flythrough.mp4`.
- Actual duration is approximately **7.93 seconds, 190 frames, 24 fps**; do not copy Mossline's 121-frame assumptions.
- The video should be muted, `playsInline`, and preloaded intelligently.
- **Preferred quality path:** if the build environment has FFmpeg available, extract a manageable optimized sequence or matched boundary poster frames under `public/templates/kairok/sequence/` and use a cached image-sequence canvas for smooth deterministic scrubbing. Do not generate 190 full-resolution uncompressed frames or allocate hundreds of megabytes in mobile RAM. Consider ~96–144 suitably sized WebP/JPEG frames for desktop, and a reduced mobile sequence where warranted; calibrate to test results. Preserve image aspect ratio with `object-fit: cover` equivalents.
- **Reliable fallback path:** when sequence extraction is unavailable, implement an `<video>` seek-based scrub controller: wait for metadata; map active scroll phase to time; avoid queueing hundreds of overlapping `currentTime` writes; coalesce updates and update after `seeked`/decoded-frame callbacks; keep the last good frame visible during seek; use the exact video posters for no-jump endpoints. This must not produce blank black frames.
- In all cases, **load the hero still or exact video frame 0 immediately** so the first paint looks complete even while the MP4 buffers.
- On slow connections/mobile, allow the user to scroll past the sequence with a graceful still-based progress fallback. Never trap them behind loading or a long blocking animation.
- Preserve frame visibility and continuity between hero still → video start and video end → city held image. Use controlled crossfades **only when actual framing aligns**.
- Don't access `video.duration` until metadata exists. Avoid calling `play()` without handling rejection. Clean up event listeners, animation frames, observers, and generated media resources on unmount.

### Layering requirements

A practical layering model for the sticky scene:

1. Studio/city camera plate or decoded frame canvas.
2. Very subtle atmospheric lighting, not an opaque extra rectangle.
3. Floating camera alpha cutout only when clean and aligned with layer 1.
4. Non-blocking optical/bokeh foreground elements.
5. Heading copy and transient motion text.
6. Interactive focus annotations and short UI panels.
7. Scene labels and progress indicator.
8. Navigation above the stage.

Prevent backgrounds from showing hard rectangular edges; maintain common crop/cover geometry across video, stills, and overlays. Keep `pointer-events:none` on purely decorative layers, and restore pointer interaction on actual controls.

### Initial animation integrity

Avoid the notorious **appear → disappear → appear** flash:

- Declare CSS starting states **before first paint** for targets that animate in.
- Use a tiny early `js-ready` class where appropriate, but never hide essential content permanently if JavaScript fails.
- Do not simultaneously animate the same element with CSS `animation`, transitions, GSAP, and rAF.
- Reduce motion => show all essential content immediately, without relying on observers to reveal it.

---

## 6. Motion design language — make interaction meaningful

Motion should derive from **camera mechanics, focus, exposure, glass, and image-making**, not generic card bounces.

### Opening

- Headline uses masked vertical reveal with subtle optical blur resolving into sharp text.
- Camera has small controlled pointer-parallax movement, damped and limited; does not wobble or tilt like a toy.
- Copper lens ring gets a single soft specular highlight pass.

### Buttons and links

- Every button hover has an intentional response: copper line travels around the edge, arrow shifts/rotates slightly, background/gloss gently transitions. No aggressive pulse.
- Keyboard focus gets equally polished visible feedback.
- Navigation links get a lens-like underline or crosshair indicator that tracks the active section.
- Click actions smoothly scroll, change a meaningful selection, or open a functional dialog; never produce empty actions.

### Images, selectors, and hotspots

- Product image hover creates subtle controlled parallax or localized magnification, not extreme 3D tilt.
- Technical hotspots expand focus rays/labels and smoothly shift the display crop.
- Finish selection updates active indicator, camera framing, and descriptive copy, with a short crossfade.
- Focus/exposure controls animate the actual image treatment and display selected values; avoid disconnected numeric animations.

### Section handoffs

- Use one or two elegant distinctive transitions (aperture iris, lens-surface reflection, controlled exposure veil). Do **not** overuse diagonal wipes, clip paths, or reveal masks everywhere.
- At rest, the website should still have a clear, beautiful composition.

### Hover/touch parity

- Every hover affordance must have a tappable, keyboard-operable equivalent where needed.
- On touch devices, never require hover to discover content.

---

## 7. Suggested React / TypeScript architecture

Adapt to the project's scaffold, but keep components separated and clearly owned. **Every component `.tsx` under `src/components/` begins with `'use client';` on line one.**

```text
public/
  assets/
    kairo-01-hero-camera.webp
    kairo-02-camera-cutout.png
    kairo-02-camera-cutout-alpha.png     # build-generated, only if successfully keyed
    kairo-03-lens-macro.webp
    kairo-04-city-environment.webp
    kairo-05-sensor-detail.webp
    kairo-06-exploded-camera.webp
    kairo-07-camera-collection.webp
    kairo-08-sample-photo.webp
    kairo-09-lens-to-city-flythrough.mp4
    kairo-video-first.webp             # generated video poster if extracted
    kairo-video-last.webp              # generated video endpoint if extracted
    sequence/                           # optional optimized sequence
    icons/                              # SVGs here, referenced via /templates/kairok/icons/...
    fonts/                              # optional local fonts
src/
  App.tsx                              # FIRST LINE: 'use client';
  components/
    SiteHeader.tsx                     # FIRST LINE: 'use client';
    CinematicStory.tsx                 # FIRST LINE: 'use client';
    CameraHero.tsx                     # FIRST LINE: 'use client';
    LensTunnel.tsx                     # FIRST LINE: 'use client';
    CityFocusExplorer.tsx              # FIRST LINE: 'use client';
    OpticalLab.tsx                     # FIRST LINE: 'use client';
    SensorDetail.tsx                   # FIRST LINE: 'use client';
    PhotoFieldNotes.tsx                # FIRST LINE: 'use client';
    CollectionExplorer.tsx             # FIRST LINE: 'use client';
    WaitlistDialog.tsx                 # FIRST LINE: 'use client';
    SiteFooter.tsx                     # FIRST LINE: 'use client';
  hooks/
    useScrollProgress.ts
    useReducedMotion.ts
    useFrameScrubber.ts
  lib/
    assets.ts
    motion.ts
  styles/
    globals.css
    cinematic-story.css
    product-sections.css
```

If you create further component files, they inherit the same first-line directive requirement. Hook/util files outside `src/components/` do not need it unless your framework requires it.

**Avoid external assets.** SVG artwork/icons are generated as files under `public/templates/kairok/`; refer to them with `<img src="/templates/kairok/icons/name.svg" ...>` or CSS `url('/templates/kairok/icons/name.svg')`. It's fine to draw functional visualization shapes with CSS or Canvas, but static authored visual asset files should live in `public/templates/kairok/`.

**Recommended technology:** React, TypeScript, semantic HTML, scoped/regular CSS, `requestAnimationFrame` for the pinned animation, and `IntersectionObserver` for chapter activation. Add a dependable local package dependency only if it clearly improves stability and you wire it correctly. Do not rely on external CDN scripts, inaccessible paid services, or server APIs for the demo.

---

## 8. Important UI details

### Header

- Compact, near-transparent navigation over cinematic dark stage; becomes subtle opaque carbon on scroll.
- KAIRO logo left, active `Experience / Technology / Gallery / K-01` links right or in a balanced asymmetrical layout, plus a distinctive `Join the list` action.
- Mobile menu opens a real accessible panel; closes on link selection, Escape, or outside interaction. Manage body scroll lock and focus where appropriate.

### Hero information

- Super-large yet readable headline. Typography should lock to the camera's lens visual, not float randomly.
- CTA visible immediately and not hidden behind a long intro animation.
- Small progress indicator can show `01 / 05` and fill smoothly while pinned.

### Product interfaces

- Keep values and labels coherent. Do not include lorem ipsum, fake user testimonials, placeholder stock logos, invented specs, `Button 1`, `Coming soon` on controls that do nothing, or unimplemented chart interactions.
- The waitlist is an honest **demo** without backend unless one is explicitly set up. If using local storage to remember a demo selection, don't imply a remote account was created.
- For image interactions, do not downsample a high-res image so aggressively that it looks blurry on desktop retina.

### Footer and end of page

- Page ends exactly after the footer. No extra scrollable gap, negative-margin overflow, wide pseudo-element, or hidden hero media continuing past the body edge.
- Clean transition from cinematic section to product content and finally closing CTA.

---

## 9. Responsiveness and performance requirements

### Desktop (1440–1920px)

- Cinematic stage should fill the viewport, with text, camera image, video and overlays deliberately positioned using a consistent coordinate system.
- Large typography should not obscure more than its intended share of the camera.
- Handoffs between images and video must remain seamless at ultrawide desktop crops.

### Tablet (~768px)

- Recompose headline/camera proportion, avoid overlapping controls; shorten decorative annotations; continue coherent pinned or reduced pinned story.
- Engineering/product sections may simplify into stacked editorial compositions while preserving interaction.

### Mobile (320–430px)

- Prefer a shorter story or simplified frame mapping; no 600vh trap without visible progression.
- Present the camera and city subject within a safe crop; ensure camera and city key visual features remain identifiable.
- Interactive hotspots should become a stable horizontal list or bottom panel rather than tiny targets floating over a severely cropped image.
- Minimum comfortable hit areas ~44×44px; no tooltip-only information.
- Use `100svh`/`100dvh` thoughtfully to handle browser address bars.
- No horizontal overflow; account for side nav, images, sticky stage, and huge type.

### Reduced-motion / accessibility

- Respect `(prefers-reduced-motion: reduce)` by disabling video scrub/parallax/cinematic transitions and using a static hero and city still with ordinary scroll sections.
- All important text and interactions remain visible and usable; do not freeze the page or leave a black canvas.
- Semantic landmarks, one `<h1>`, meaningful heading hierarchy, descriptive image alt text, decorative alt="", `aria-live` only for genuinely useful updates, visible keyboard focus, sufficient contrast, and tab-operable controls.
- Avoid flashing, strobes, autoplay audio, surprise camera permissions, and blocking loaders.

### Robustness

- Lazy-load below-the-fold images, preload the first hero poster.
- Do not eagerly decode the entire full-resolution video to RAM on small devices.
- If video unavailable, show a visually composed still and keep the narrative navigable.
- Avoid GPU-heavy blur filters on huge moving full-screen elements; don't use dozens of continuous animations simultaneously.
- Pause expensive background effects when out of view or document is hidden.
- Do not introduce a visible rectangular backdrop around foreground camera/image layers.
- Cleanup listeners, observers, rAF handles, timers, and object URLs.

---

## 10. Validation and acceptance criteria (do not skip)

Before saying the page is complete, check the working local app against these requirements:

### Project / assets

- [ ] `src/App.tsx` **starts on line 1** with `'use client';`.
- [ ] **Every** component `.tsx` in `src/components/**` **starts on line 1** with `'use client';`.
- [ ] All supplied ZIP assets are installed at their exact paths under `public/templates/kairok/`.
- [ ] All visual asset file references use `/templates/kairok/...`; no missing/broken media requests.
- [ ] The RGB greenscreen `kairo-02-camera-cutout.png` is **never rendered raw**; either derived clean alpha cutout or graceful alternative.
- [ ] Fly-through clip loads and has a reliable first/last frame fallback.

### Visual / story

- [ ] Film opens with large floating KAIRO camera and readable, prominent headline.
- [ ] Scroll actually advances **the supplied real 7.93-second camera-to-city footage**.
- [ ] Hero still → video and video → city handoffs do not make the camera/city suddenly jump position or crop.
- [ ] Video reverse scroll behaves predictably; nothing goes blank or sticks at an unrelated frame.
- [ ] City hotspots are visible, correctly positioned, clickable/tappable, and keyboard navigable.
- [ ] Technical/product sections use the actual lens, sensor, exploded-camera, lineup, and sample photography assets.
- [ ] Final landing page structure is unmistakably different from Mossline and previous agency/SaaS templates.

### Interactivity

- [ ] Header links scroll to the correct sections.
- [ ] Primary hero CTA goes to a meaningful destination.
- [ ] Technical hotspots, focus/exposure demonstration, and finish selector make **visible functional changes**.
- [ ] Waitlist action opens a functional accessible form/modal with truthful demo feedback, or real backend only if configured.
- [ ] Escape closes dialogs and menus; reduced-motion works.
- [ ] Hover/focus interactions feel refined; touch actions don't depend on hover.

### Responsive / quality

- [ ] No horizontal overflow or footer gap at **320px, 390px, 768px, 1440px, and 1920px**.
- [ ] No text unreadable due to image overlap or motion.
- [ ] No first-paint entrance flicker (content visible → disappears → visible again).
- [ ] No runaway animation, console errors, uncaught media promises, or missing import errors.
- [ ] Usable loading/fallback state when MP4 is slow or unsupported.

If browser automation or media tooling is unavailable, explicitly identify what you could not verify; do not claim a test passed without running it. Do not claim actual KAIRO photographic quality from illustrative images or fictional hardware specifications.

---

## 11. Finish the implementation, not a proposal

Build the full KAIRO website in the project files. Prioritize:

1. Correct asset installation and clean camera cutout.
2. Truly smooth, real-media **hero-camera → lens → city scroll sequence**.
3. Strong cinematic-to-editorial visual handoff.
4. Fully interactive photography/optical/product sections.
5. A memorable final invitation, accessibility, responsive polish, and performance.

**Do not stop after writing a design plan, a single section, or a static screenshot.** When complete, provide a concise implementation summary listing actual modified files, functional interactions, any asset derivatives created, and known limitations.

**Final reminder:**

The **literal first line** of `src/App.tsx` and every component under `src/components/` is:

```tsx
'use client';
```

There must be **no comment, whitespace line, or import before that directive**.

**Every image, SVG, video, font file, and other visual asset goes in `public/templates/kairok/` and is referenced at runtime through `/templates/kairok/<filename>`.**
