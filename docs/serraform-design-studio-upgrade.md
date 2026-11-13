# SERRAFORM — Divider Design Studio upgrade brief

> **For the implementing agent:** Upgrade the existing SERRAFORM project at [serraform-fold-16.ai.studio](https://serraform-fold-16.ai.studio/). Work from the existing source and preserve the working site; this is an upgrade, not a request to generate a separate app. Make the decisions below and proceed without asking for approval. Deliver a complete, working implementation, not just a mockup or another plan.

**The requested outcome:** Turn Fold 16 from a three-swatch product demo into a beautiful, hands-on divider design studio. Visitors can drag the actual 3D divider around, choose virtually any color with a real color wheel, and apply distinctive patterns such as flowers, stripes and a landscape. Every change must appear on the divider itself and travel through to the existing room brief.

**Design direction:** A contemporary textile atelier: warm, tactile, expressive and editorial. Keep SERRAFORM's name, rose/oxblood identity, sixteen connected folds and room-brief concept, but make the product and the visitor's design the visual stars. The experience should feel like designing an object, not filling in a generic configurator.

**Planning status:** This document is the upgrade instruction only. The changes described here have not yet been applied or tested in the SERRAFORM project.

---

## 1. What needs to change in the current site

The live page was inspected on desktop and at a 390 × 844 mobile viewport. The following are observations of that deployed version, not assumptions about the current source tree:

- The hero has a large text block followed by a wide frame with a **very small** divider in its center. On mobile the divider is also small and looks like a distant illustration. It does not communicate the quality or possibility of the product.
- The actual 3D stage is farther down the page. Dragging across it did not rotate the divider in the inspected desktop browser. The only offered camera controls are `Front`, `Three quarter` and `Side`.
- `Make it yours` currently contains an `Opening` range and only three finish choices: `Clay`, `Flax` and `Sage`. There is no free color choice or print design.
- On mobile, the 3D/still preview is above the configurator. Once the user reaches the opening slider and finish swatches, the preview is offscreen. The stage footer was also visibly clipped in the inspected mobile view.
- The page already has useful pieces worth keeping: real connected folding geometry, an opening-derived span, preset views, a still-view option, in-room concept studies, construction/FAQ content, and a local-only room brief.
- The inspected live canvas reported `three.js r187`; its deployed scene bundle uses a Three.js WebGL renderer and exposes scene operations equivalent to `setPose`, `setFinish`, `setView`, `resize`, `setActive` and `dispose`. It already builds a UV-mapped folded surface. **Inspect the actual project source before choosing filenames or changing its renderer.** Do not assume the older design brief's proposed files, exact Three.js version, or WebGPU stack were implemented. Extend the working scene and UVs instead of replacing the application or changing renderers for its own sake.
- Several current SVG poster instances expose the same gradient ID, and a still-poster image description could remain at the old opening while the live stage readout had changed. New preview/fallback work must use instance-unique SVG IDs and one accurate accessible description of the effective configuration.

The main fix is not a new line of copy. The divider must become large, rotatable, visibly customizable, and consistently reflected across the page.

## 2. The experience to build

### First impression and page flow

Replace the tiny static hero presentation with an impressive **large live divider**. At desktop sizes, use a two-column composition: concise brand copy on the left, the 3D divider and a quiet studio backdrop on the right. The product should fill approximately **70–80% of the stage height** at the default opening without clipping; preserve real proportions. Give it a soft contact shadow, subtle felt texture, convincing folds, and a carefully chosen three-quarter view. A small `Drag to rotate` hint and a rotate icon sit at the edge of the stage rather than covering the artwork.

Use a default design that makes the new feature immediately obvious: a warm flax ground with an original, graceful oxblood floral print. It must read as a designed textile, not a scattered emoji pattern. Keep the original solid Clay, Flax and Sage colors available as starting swatches.

Suggested hero copy:

- Eyebrow: `SERRAFORM / FOLD 16`
- H1: **“Make room for your imagination.”**
- Lead: “Shape the fold, choose your colors, and make a divider that feels at home in your space.”
- Primary action: **`Design your divider`** → the existing `#configure` anchor.
- Secondary action: **`See how it folds`** → `#fold`.
- Quiet proof line: `16 connected panels · Custom colors · Original prints`.

The header's primary action should also say `Design your divider`. The hero product is interactive on capable desktop browsers; on mobile it shows a clear `Explore in 3D` activation when 3D has not started. Do not silently imply a static poster is rotatable.

Bring the configurator within easy reach of the hero. Retain the editorial story and the `#fold` anchor, but remove any long, empty scroll track or oversized spacer that delays access to customization. Reuse the existing `#configure`, `#rooms`, `#questions` and `#brief` anchors so navigation and old links still work.

### The studio layout

The `#configure` section is the primary workspace:

- **Desktop, 1024px and wider:** a generous stage on the left taking about 60% of the available width and a compact control rail on the right. Keep the product visible while the visitor works through controls. The stage contains the divider, a quiet ground plane and a minimal caption—not a stack of nested cards, fake software telemetry or giant decorative buttons.
- **Tablet:** stage above controls when the side rail would make either too narrow. Preserve 44px touch targets.
- **Mobile:** a 200–240px-high preview sticks just below the 64px header **only while the studio is in view**, with the controls scrolling beneath it. Keep at least 380px of the viewport available for controls at 390 × 844. On short landscape viewports, disable the sticky treatment and use normal flow. The preview must not clip the product, controls or caption, and must not cover the footer or trap scrolling.
- At **1440 × 900**, the hero must show the headline, action and a large recognizable divider together. At **390 × 844**, show the beginning of the product in the first viewport and keep the preview visible when the user changes color or design.

Arrange the control rail in this order:

1. `Shape` — the existing opening slider with the live percent and physical span.
2. `Color` — base/ink color selection and the wheel described below.
3. `Design` — a visual gallery of real print choices, followed by motif size when applicable.
4. `View` — rotation hint, accessible rotate controls and a reset-view action.
5. A concise live summary and **`Use this design in my brief`** → `#brief`.

Use labeled collapsible groups or tabs only if they genuinely improve mobile space; at least the current color, print name and opening must remain apparent when groups are closed. Do not put the color wheel, pattern choices and product on separate pages or in a modal that obscures the model.

---

## 3. Drag to rotate the actual divider

### Direct manipulation

- Drag horizontally on the live product stage to orbit through a full **360°** around the upright divider. The view must change continuously with the pointer or touch; it cannot be a discrete preset swap or a CSS transform on a screenshot.
- On a fine pointer, vertical drag changes camera elevation within **5°–30° above the floor**. The product and its feet stay upright and grounded. Horizontal dragging is the primary gesture; do not allow flips, a view from beneath the floor, or camera jumps across the poles.
- On touch, a deliberate **horizontal** drag rotates. Normal vertical page scrolling and pinch zoom remain available. Use `touch-action: pan-y pinch-zoom` on the interaction surface, handle `pointercancel`, and do not attach a page-wide wheel/touch handler. Do not require a two-finger gesture, hover, long press, or custom cursor to discover the feature.
- Use pointer events and pointer capture only for the active pointer. Ignore right-clicks and additional touches. Apply a small drag threshold so an ordinary click does not suddenly rotate. Release/cancel capture on `pointerup`, `pointercancel`, lost capture, renderer loss, preference change and unmount. See [MDN's pointer capture reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture) and [touch-action behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action).
- When WebGL is unavailable or reduced motion is enabled, the interactive still renderer must also respond to the same direct drag by immediately drawing the newly requested angle. This is an explicit user-controlled change, with no auto-rotation, inertia or transition; the buttons remain an equivalent non-drag input.
- Use a fixed camera target near the divider's vertical center. Fit the **maximum-open, full-rotation bounds** on resize, not a new zoom on every pointer move or slider change. The divider should stay completely inside the frame at every opening and angle. Adjust stage size/field of view rather than distorting model proportions.
- Rotation is direct and interruptible. Avoid continuous auto-spin. If adding slight inertia on release, cap it below 250ms, stop immediately on new input, and disable inertia for reduced motion. A user can stop precisely at a desired angle.

### Non-drag alternatives

Keep visible, real buttons **`Rotate left`** and **`Rotate right`**, stepping 15° each time, plus **`Reset view`** returning to the default three-quarter angle and elevation. Keep compact `Front`, `Three quarter`, `Side` and **`Back`** view presets if they fit. All of these operate the same camera state as dragging; `aria-pressed` on a preset applies only when the current angle actually matches it. When a free drag ends between presets, no preset falsely remains selected.

Keyboard and screen-reader users must be able to reach the controls and operate them without using the canvas. The canvas can remain `aria-hidden` and unfocusable if the adjacent description and controls expose the same capability. Labels should say `Rotate divider left`, not just an unlabeled arrow. A textual `View: 45°` readout can be updated on interaction end; do not announce every pointer frame. For a still fallback, the same buttons change the projected view immediately.

### Respect the fold

Keep the opening control and its existing real geometry: 16 connected panels, unchanged developed length and height, with the displayed span derived from opening. Rotating the view must **not** change opening, physical dimensions, pattern, color, or the room brief. Changing opening must not reset view or print placement.

The current page has story-driven folding. Once the visitor touches any shape, color, print or view control—or drags the hero—their current design becomes manual and later page scrolling must not override it. If the original scroll story remains, it may animate the fold only before the visitor takes control or after an explicit `Follow the story` action. It must never erase colors, print selection or uploaded art.

---

## 4. A real color wheel

### Controls and behavior

Provide two clearly labeled editable colors:

1. **`Base color`** — the felt background.
2. **`Design color`** — the ink for built-in patterns. Disable this control for `Solid` and for an uploaded full-color image, with visible helper text explaining why. Preserve the last chosen design color when it is disabled.

Clicking either color chip selects the target and opens the same **visible hue wheel with an inner saturation/brightness square**; do not replace the requested wheel with three swatches, a hidden native color dialog, or a single hue range. Show the current color value in a six-digit hex field, and show the result on the model while the user drags. The wheel should be large enough to control accurately: roughly 192–220px diameter on desktop and no wider than the mobile rail. Provide 8–12 curated chips including the original three; they are shortcuts, not a limit on the color space.

For keyboard and assistive technology, provide labeled **Hue**, **Saturation**, and **Brightness** range inputs and the text hex input. A two-dimensional square alone is not an accessible control. Give each control its current numeric value, a visible focus state and a usable hit area. Do not use color alone to identify the selected base or design target.

### Color math and input rules

- Use HSV for the wheel: hue `0–359°`, saturation and value `0–100%`. Zero degrees is red at the top of the ring, increasing clockwise. The inner square goes from low to high saturation left-to-right and high to low value top-to-bottom. Use the same conversion for pointer, sliders, hex input, swatches and texture creation.
- Keep a draft string while the visitor types. Accept `#RGB`, `RGB`, `#RRGGBB` or `RRGGBB`; on valid commit, expand and normalize to uppercase `#RRGGBB`. An incomplete/invalid value must not crash, reset the design, overwrite the last valid color, or paint black. Show `Enter a hex color such as #9A463D.` on blur or submit. Keep hue when saturation is zero so returning from gray is predictable.
- `Clay #9A463D`, `Flax #D8C4A7` and `Sage #A6B3A0` remain recognizable shortcuts. Choosing a chip updates the wheel, hex field and current target together.
- Change the **product fabric**, not the page's brand colors. Keep the interface high-contrast even when the chosen colors are white, black, very bright, or nearly identical. Use theme-colored focus/selection rings, not the selected custom color alone.
- Store colors in normalized sRGB hex. Apply them once to the texture/material; do not accidentally multiply the custom base color by the previous Clay/Flax/Sage material tint. The chosen hex must be shown exactly in the summary. Lighting may create natural highlights and shadows, but the material must still look recognizably like the selected color.

---

## 5. Print and artwork library

Create **real, visible designs**. Selecting a tile must change the material on the actual folded divider immediately. Show thumbnail previews of each print with the current base/design colors and a named selected state. These are original assets or original procedural drawings, not emoji, random stamps, copyrighted artwork, broken external images, or a CSS overlay floating over the canvas.

| Design | What the visitor sees | Rendering rule |
|---|---|---|
| **Solid** | Beautifully textured felt in the chosen base color. | No motif; design color and motif size are disabled but retained. |
| **Bloom** | A refined botanical composition of varied stems, leaves and open flowers. Some large stems cross adjacent pleats; leave breathing room. | A repeatable, deterministic original vector/canvas motif in the chosen design color. Default selected design. |
| **Stripes** | Confident, even vertical textile stripes, with alternating wider and finer lines. | Repeat across the full developed fabric width; no stripe restarts at each fold. |
| **Landscape** | One panoramic scene: a quiet sun, layered rolling hills and a foreground line of trees or reeds. It should read as one artwork across the entire divider. | A single original full-width composition; never repeat it independently on each panel. Use the chosen design color and lighter mixtures of it over the chosen base. |
| **Waves** | Broad, flowing contour lines inspired by water and woven lines, with deliberately varied spacing. | Repeat continuously across the whole sheet. |
| **Your image** | The visitor's own artwork, such as a floral image or a scene. | Local upload, preview and crop-to-fill; no upload to a server. |

The first five choices must work without an image generator, internet connection or paid service. Produce the artwork in local SVG/canvas code or ship original local files within the existing project. The final designs should have enough detail to look intentional when the divider is large. Keep the familiar SERRAFORM felt texture and subtle fold shading visible beneath/through the print.

Provide a **`Motif size`** range from **50% to 200%**, default 100%, step 5%, for Bloom, Stripes and Waves. It changes the actual repeat scale, not just the thumbnail. For Landscape use a clearly labeled `Artwork zoom` range over the same values: 100% fits the full composition, larger values center-crop it, and smaller values show more of the base around it. For an uploaded image, 100% means centered `cover`; smaller values may reveal the base and larger values crop more. Disable the range for Solid and explain the state. Never stretch a landscape or uploaded photo disproportionately.

### Local artwork upload

The `Your image` tile opens a file chooser accepting PNG, JPEG and WebP. Selecting a file makes it the active design **only after it decodes successfully**. Display a thumbnail, a safe plain-text filename, `Replace image` and `Remove image`. Canceling or rejecting a selection leaves the previous design untouched. Removing an active image returns to Solid without changing opening, color or view.

- Process the file **in the browser only**. Do not send it anywhere, fetch arbitrary URLs, write it to storage, or embed it in the local text brief. Show `Your image stays in this browser session.`
- Limit the compressed file to **8 MiB**, accept decoded images up to **4096px on either axis and 16,000,000 total pixels**, and downsample to the working texture size. Validate MIME/content, handle decode failures, and reject SVG/HTML/GIF. Read dimensions from supported image headers before bitmap decoding and reject invalid, unknowable or excessive dimensions before allocating a large bitmap. Do not inject filename or SVG markup as HTML.
- Show specific errors: `Choose a PNG, JPEG or WebP image.`, `Choose an image of 8 MiB or less.`, `Choose an image at most 4096 pixels on each side and 16 megapixels in total.`, and `This image could not be opened.` Keep the current design after any error.
- Revoke object URLs, close discarded `ImageBitmap`s where supported, and guard asynchronous decoding with a generation token so a slow earlier upload cannot replace a newer choice or update an unmounted component. An image exists only for the current page session; on reload default to the built-in design instead of showing a broken or falsely restored upload.

---

## 6. How the design follows the 3D folds

This is the critical visual requirement. Do not apply a separate centered image to each panel, paint an overlay on the canvas, or use independent meshes with disconnected print placement.

The visible deployment already constructs a single folded surface with UV coordinates tied to panel index. Inspect and preserve its true geometry and opening math. Make the print use **developed fabric coordinates**:

- At hinge `j` of 16, use horizontal `u = j / 16`; vertical `v = y / height`. Both vertices at a shared hinge must have the same developed coordinate. The print therefore travels continuously from the first to the last panel as the model opens and closes.
- The same design is present on both sides. Make a landscape read left-to-right from either side: reverse horizontal UVs on the back face (`uBack = 1 - uFront`). Each side must remain continuous across all folds. The exposed narrow top, bottom and end edges stay the base felt color; they are not stretched landscape slivers.
- For a panorama, one whole image spans the developed width; changing opening **does not** change its crop, repeat count or position. A flower/stripe/wave may repeat according to `Motif size`, but not restart at every hinge.
- Composite base color plus the selected pattern into one reusable offscreen 2D canvas, then use it as a Three.js `CanvasTexture` on the existing fabric material. Keep the current bump/roughness detail. Color textures use `THREE.SRGBColorSpace`; bump/normal data stays non-color. Set the fabric material's color to neutral white when using a fully colored texture, so the previous finish tint cannot multiply the user's color. See [Three.js CanvasTexture](https://threejs.org/docs/pages/CanvasTexture.html) and [Texture color-space and disposal behavior](https://threejs.org/docs/pages/Texture.html).
- Use a fixed texture size with a roughly **2.88:1.60** aspect ratio, e.g. 1536 × 853 on desktop and 1024 × 569 on mobile. Keep it fixed during a texture's life, reuse the canvas/texture, redraw only when design inputs change, and set `needsUpdate` after drawing. Coalesce rapid wheel movement to at most one update per animation frame; a final pointer release must render the exact final value. Dispose any replaced textures when the scene is retired. Avoid one texture per fold and avoid allocating canvases or materials in every frame.
- The visual thumbnails and still preview must come from the **same design data and artwork rules**. No mismatch where the tile says “Landscape” but the divider stays plain.

### Still and reduced-motion view

Keep a useful fallback for reduced motion, slow devices, WebGL failure, context loss and initial loading. It must show the **current opening, base color, selected print and view**, including uploaded artwork when available. Do not fall back to the old three solid-color posters or imply a change happened when it is not visible.

Use the existing SVG projection if it can accurately map a full print across its projected panels. Otherwise render the same textured surface with a lightweight Canvas 2D fallback: project the front/back folded faces and draw each face as clipped triangles using the same developed UVs. This is a still 2D render, not a second WebGL context. `Front`, `Three quarter`, `Side`, `Back` and rotate buttons update it immediately. When JS is disabled, the original server/static poster and descriptive content remain visible; interactive inputs must not pretend to work.

Keep a single accessible description next to the active representation, such as `Fold 16, 50 percent open, Bloom print, base #D8C4A7, design #4B202A`. Hide the inactive poster from assistive technology while a live canvas is present. Give every SVG gradient, clip-path and pattern a stable **instance-unique** ID, so hero, studio and room-study previews cannot reference one another's definitions.

---

## 7. State, reset behavior and the existing brief

Use one source of truth for the current design; use the project's existing state architecture where possible. The following names describe the contract, not required filenames:

```ts
type PrintId = 'solid' | 'bloom' | 'stripes' | 'landscape' | 'waves' | 'upload';
type DesignState = {
  opening: number;           // 0–100
  baseHex: string;           // normalized #RRGGBB
  designHex: string;         // normalized #RRGGBB
  print: PrintId;
  motifScale: number;        // 50–200, default 100
};
type ViewState = { yawDeg: number; elevationDeg: number };
```

Keep an uploaded decoded image in a separate transient resource, not in a JSON-serialized state string. Make state updates functional/atomic: a rapid color change followed by a print change must not restore an older value. The hero, studio preview, shape readout, selected tiles and brief read from this same effective design. Changing view, opening or viewport must not reset customization. A scene reinitialization after context loss must apply the latest state, not its initial defaults.

The deployed scene's existing `setFinish` takes one of the old named finishes; it cannot safely receive a hex string or print ID as though those were old palette keys. Replace or adapt that boundary to a validated `setDesign` operation, and update every consumer of the old finish enum—including the SVG fallback, material code and brief—together. Keep Clay, Flax and Sage as color presets mapped to hex values; never make them the only valid state values.

Initial state: opening `50`, base `#D8C4A7`, design color `#4B202A`, print `bloom`, motif scale `100`, default three-quarter view. The default must visibly show flowers in both the hero and studio.

Use explicit, unsurprising resets:

- **`Reset view`** changes the camera only.
- **`Reset shape`** returns opening to 50% only.
- **`Reset design`** restores the default base color, design color, Bloom and 100% motif size; it does not change opening or camera. If an uploaded image exists, clear its resource safely.

If a reset action replaces the current `Reset shape` behavior, update its label and tests accordingly; never silently wipe the visitor's print when they only wanted a different viewing angle.

The existing **`Use this design in my brief`** link carries the effective configuration to the current local-only brief. The live summary, success receipt and downloaded text include:

- opening percent and derived outer span/depth;
- base hex;
- print name;
- design hex and motif size when they apply;
- `Your image: <filename> (local session only)` for a successfully decoded upload, with no filesystem path or image bytes.

Capture a consistent snapshot at submit. If the user navigates back to edit their design, the form reflects the new values before the next submit. The brief remains local: no pretend order, no email, no network submission. Never claim a printed object has been purchased or manufactured.

Update the old copy `3 finishes`, the finish FAQ, the hero caption, screen-reader descriptions and brief labels so they reflect the new range of customization. Existing unrelated content and links remain functional.

---

## 8. Make the page feel designed, not merely functional

- **Product scale:** The divider must be prominent and legible on first load and in the workspace. At default opening it should occupy most of the stage height, not the small central fraction visible in the current hero. Keep all 16 connected panels and both feet in frame.
- **Art direction:** Retain the warm rose background and oxblood typography; add visual richness through the actual textile prints, material detail and believable lighting. Use substantial negative space around the object, not an empty oversized box around a tiny model. No neon SaaS gradients or garish dashboard chrome.
- **Material:** Matte fabric with a subtle tactile grain; visible edges, continuous pleats, soft light and grounded feet. Do not bury the design under a dark shadow, overly shiny plastic finish or extreme perspective.
- **Design gallery:** Make pattern choices feel like a small collection of textile samples: rectangular swatches, accurate miniature artwork, clear names, one decisive selected outline. The control is not a row of identical generic cards.
- **In-room studies:** Existing scenes can remain concept illustrations, but at least one should reflect the current chosen design instead of staying permanently Clay/Flax/Sage. Reuse the same 2D projected artwork; if a live update is not feasible in every room, label the others as fixed examples. Do not present fake customer projects or real manufacturing claims.
- **Motion:** The signature is the user's own drag plus the fold opening. Use quiet transitions for panels, tabs and selected states; never auto-spin the model or animate every section equally. A change should feel immediate, with a short 150–250ms material/selection settle only when motion is allowed.
- **Mobile:** Avoid burying controls below a stationary poster. Keep the preview present in the studio, provide clear touch feedback, and make sure dragging horizontally does not prevent normal vertical page movement.

---

## 9. Technical implementation sequence

Work in the **actual Google AI Studio project source**. Suggested names below describe responsibilities; adapt them to existing files after reading the source. Do not create a new Next.js route or alter unrelated gallery templates merely to implement this upgrade.

### Task 1 — Turn the existing stage into a proper product viewer

1. Find the component that creates the existing fold scene and the controller behind `setPose`, `setFinish` and `setView`. Keep the existing opening geometry and readout.
2. Add an orbit controller around the current product target: full yaw, clamped elevation, pointer capture/cancel, precise keyboard-accessible buttons and reset view. All paths update the same view state.
3. Enlarge and reframe the hero product; retain a visible 2D poster until the first live frame. Present the interactive viewer in the hero and studio.
4. If the hero and studio remain separate hosts, **at most one WebGL renderer may be active at a time**. Share design and view state; when the active host changes, show a correctly configured fallback until the new renderer's first frame. Do not reparent a canvas behind React's back, leak contexts, or reset the design on handoff. Lazy-load the second host and prioritize the currently interacted-with host.
5. Add a mobile studio layout where the preview stays visible alongside its controls and vertical scrolling remains natural.

### Task 2 — Add design state, the color wheel and previews

1. Centralize `DesignState`, `ViewState` and validated color conversion. Preserve initial state and the reset semantics in section 7.
2. Build the visible hue ring, saturation/value control, labeled keyboard sliders, hex draft/error handling, base/design target chips and original quick swatches. The wheel must update the model, not only a label.
3. Add the selected design summary and make it reflect the same state in hero, studio and brief. Limit high-frequency DOM/GPU updates to a single scheduled frame and commit the latest value on release.

### Task 3 — Build real print designs and safe upload

1. Draw the five built-in designs and their thumbnails with shared artwork logic. Bloom and Landscape require designed compositions, not a few random shapes.
2. Compose a single fabric texture from base, print, accent and size. Map it consistently across all folds and both sides, preserving the material texture and correct sRGB treatment.
3. Implement local image selection, size/type validation, safe decode, thumbnail, replacement/removal and cleanup. No server interaction. Do not let an old decode win a race with a new selection.
4. Make the still/reduced-motion representation consume the same design data. Verify image, color and pattern updates after a renderer failure, orientation change and resize.

### Task 4 — Integrate and polish the existing site

1. Update the CTA, `3 finishes` copy, FAQ, summary, in-room examples and room brief to match the new capability. Preserve existing anchors and local-only behavior.
2. Remove clipped stage content, excessive empty space and visual inconsistencies exposed by the larger viewer. Keep the original brand character while upgrading composition and product photography quality.
3. Verify real behavior in the AI Studio preview; do not report success solely because the code builds. Export the existing Vite project with all necessary source and local assets when complete.

### Google AI Studio export and later import

The user intends to import the finished AI Studio project into this repository with `bun run import-template`. Keep the working Vite/React source layout: `src/App.tsx`, `src/index.css`, relative imports within `src/`, and any required external artwork in `public/assets/`, referenced by literal `/assets/...` paths. Keep `'use client';` as the first line of `App.tsx` and component TSX files. Make the root declaration `export default function App() { ... }`: the current importer renames that declaration, and a separate `export default App` can otherwise leave a stale identifier. Do not rely on AI Studio's temporary media paths, Vite-only runtime environment variables or files outside the exported project.

The live page reported Three.js r187, while the destination repo currently has Three.js 0.186.x. Do not downgrade or replace the working renderer blindly. Use APIs compatible with both versions where possible, and verify the actual exported source against the destination's installed version after import. The importer rewrites `/assets/` paths but does not install the source project's dependencies; its automatically generated palette, copy metadata, model tag, preview and smoke test require a real post-import audit. For a local export, use `bun run import-template <exported-folder> --slug serraform --category 3d --dry-run` before import and inspect the resulting route at `/templates/serraform`; a dry run only analyzes metadata and does not validate the build. Do not overwrite an existing `serraform` route with `--force` without reconciling it first.

---

## 10. Required verification and acceptance

Add focused unit tests for color normalization/conversion, state transitions, UV continuity and upload validation. Add browser tests where the current project supports them. At minimum, prove these scenarios:

1. **Rotation:** Dragging horizontally changes yaw by a measurable amount; a full drag sequence can reach the back; vertical camera movement remains within limits; object, feet and shadow remain grounded and uncropped. A mouse release outside the stage and a `pointercancel` both end the gesture. Keyboard rotate buttons and all presets work without a pointer.
2. **Touch:** At 390 × 844 a horizontal gesture rotates after 3D activation, while a vertical gesture scrolls the page and pinch zoom is not suppressed. The preview remains visible while changing the controls, without covering them. Check at 375px too.
3. **Wheel:** Change base color to `#32AA77` by hex and by wheel/sliders; the chip, field, summary and real divider agree. Verify black, white, grayscale, invalid partial text and hue wraparound. A pattern's ink can be changed independently.
4. **Prints:** Select Bloom, Stripes, Landscape and Waves one after another. Each visibly changes the 3D surface, each thumbnail matches, and scale changes the right design. At opening 0%, 50% and 100%, no motif jumps or restarts at fold seams. Rotate to the back: it shows a coherent correctly oriented design. Landscape is one continuous scene rather than 16 repeated mini-scenes.
5. **Upload:** A valid PNG/JPEG/WebP appears on the divider; cancel, invalid type, oversized file, decode error and rapid replacement preserve the last valid state. Removing it returns to Solid. Inspect network activity: the file is never sent. No object URL or bitmap survives cleanup unnecessarily.
6. **State and brief:** Set opening 75%, base `#32AA77`, design `#4B202A`, Landscape at 125%, then rotate. Navigate away/back and prepare the room brief. The same values and correct calculated dimensions appear in the UI, receipt and downloaded text. `Reset view` and `Reset shape` do not erase the print; `Reset design` does not move the camera or change opening.
7. **Fallback:** With reduced motion, with WebGL blocked, and after a simulated context loss, the current design remains visible in the still view; color/print controls and accessible rotation alternatives still work. A delayed initialization or decode cannot remount after cleanup. No duplicate SVG IDs and no stale accessible poster description.
8. **Layout and quality:** Capture the top hero and studio at 1440 × 900, 390 × 844 and 375px width. The object is prominent, the full model stays in frame, controls are readable with visible focus, and there is no horizontal overflow or clipped footer/caption. Compare Bloom and Landscape as actual full-size product renders, not just thumbnails.
9. **Performance:** No more than one active 3D renderer/animation loop, no texture/material allocation per frame, cleanup on route exit, no uncaught errors, and responsive wheel/drag interaction on a throttled mid-range device. Pause offscreen. Check the project's actual build/test commands and report the results and any environment limits honestly.

**Final handoff from the implementing agent:** Report what actually changed, which verification ran, and any remaining limitation. Do not say the upgrade is complete if the wheel only updates a swatch, the prints are painted over the canvas, rotation is a preset-only switch, mobile controls lose the preview, or the room brief forgets the chosen design.
