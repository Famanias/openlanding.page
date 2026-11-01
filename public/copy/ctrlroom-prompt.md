# CTRL/ROOM — Agent Implementation Prompt

> **Implemented motion update (2026-11-01):** Preserve this template's existing visual identity. Its current motion runtime uses route-scoped CSS and an event-driven `CtrlRoomMotion` controller, Motion for window presence, and native animated dialogs. The boot finishes in 840 ms and hands off to masked text and a key-glyph assembly. Scroll gently settles the hardware and reveals sections once. Fine-pointer magnetic feedback, profile key stagger, active navigation/progress, mobile navigation, modal focus restoration, reduced motion and no-JavaScript content are implemented. See `docs/ctrlroom-motion.md` for the inspected local Lumen behaviors and their mapping. These implementation details supersede suggested animation tooling elsewhere in this brief.

> **Motion audit fixes:** Keyboard anchors transfer focus and focused reveals settle immediately. Modal entrance/exit reverses from the displayed state. Rapid profile changes restart their scans; hardware inspection does not replay boot glyphs. Pointer transforms target their own elements and control transitions enumerate properties. Window maximize/restore uses an interruptible FLIP surface with live reduced-motion handling. Saving shows stable success feedback only after a successful browser-storage write, with inline failure feedback otherwise. Hero control hit areas remain stationary during startup.

> **Project:** Original 2D pixel-desktop / interactive retro operating system landing page  
> **Fictional brand:** CTRL/ROOM (an independent creative concept)  
> **Real featured product:** [Elgato Stream Deck MK.2](https://www.elgato.com/us/en/p/stream-deck), by Elgato  
> **Experience model:** A browsable, draggable, keyboard-accessible fictional pixel OS, with a functional on-page 15-key macro-deck simulator  
> **Deliverable:** A complete responsive Next.js marketing landing page, with genuine interactions and a clear purchase pathway—not a static OS mockup.

## 0. Your mission

Create a fictional desktop environment called **CTRL/ROOM OS** that introduces the real Elgato Stream Deck MK.2 through playful productivity experiments. Visitors land on a pixelated custom operating-system desktop, open purposeful mini-apps, configure a 15-key virtual control surface, and trigger simulated workflows. The UI behaves like a coherent software system while remaining a readable, accessible marketing website.

This concept is about **control, customization, and delight**, not nostalgic video games. It should feel like a design studio's custom pixel computer: graphic, deliberate, witty, and richly interactive.

### Non-negotiable independence and product honesty

- CTRL/ROOM is a **fictional independent brand**, not Elgato, a stream-control utility, or an endorsed partnership.
- The physical device is Elgato's Stream Deck MK.2; attribute Elgato visibly and link to the real official product information.
- The 15-key simulator is a **website demo**. It does not control the visitor's Stream Deck, apps, broadcasts, microphone, or operating system. It must not imply hardware pairing or actual remote-control permissions.
- Do not copy historical Windows, Mac OS, Amiga, BeOS, Linux desktop themes, Windows 95 icons, system sounds, logos, dialog templates, or protected pixel icon sets. Invent a distinct operating-system design grammar.
- If the previous LUMEN project exists, study only general motion behaviors: easing, responsive scroll, pointer tracking, and transitions. **Never** import its glass aesthetics, visual composition, typography, floating cards, or UI structure.
- Absolutely no visual identity overlap with WARP & WANDER: no fantasy forest, platformer scene, caped protagonist, collectible items, parallax wilderness, or side-scrolling adventure.

## 1. Real product foundation

Present verified MK.2 facts in useful context:

- Stream Deck MK.2 is a 15-key programmable controller, arranged as **5 columns × 3 rows**.
- Its keys are customizable LCD keys used for launching actions, shortcuts, and workflows.
- The MK.2 has interchangeable faceplates, a detachable USB-C cable, and a stand.
- The device works with Elgato's Stream Deck software and compatible integrations as documented by Elgato.
- Do **not** claim built-in rotary dials, a touch strip, an onboard touchscreen panel, or actual product features from different Stream Deck models.
- Do not publish unverified live prices, stock status, compatibility, bundle contents, partner integrations, or outcome guarantees.

Official product page: https://www.elgato.com/us/en/p/stream-deck  
Official comparison: https://www.elgato.com/ww/en/explorer/products/stream-deck/stream-deck-device-comparison/  
Device family reference: https://docs.elgato.com/streamdeck/hid/stream-deck-classic/

## 2. Fictional brand identity

**Brand:** `CTRL/ROOM`  
**Desktop identity:** `C/R OS — Build 01.15` (purely fictional software brand)  
**Campaign:** `MAKE ONE BUTTON DO MORE.`  
**Alternate line:** `LESS CLICKING. MORE MAKING.`  
**Hero hook:** `WELCOME TO YOUR CONTROL ROOM.`

The personality is curious, eccentric, clever, design-forward, and helpful. It feels like a tiny digital workshop made by creative technologists, never a generic enterprise dashboard or a joke website.

**Audience:** Streamers, content creators, production hobbyists, editors, designers, creators with repetitive actions, and people who enjoy customizing technology.

**Tone:** Concise microcopy that rewards interaction (`DROP ACTION HERE`, `TEST RUN`, `SAVE PRESET`, `OPEN THE REAL THING`). Avoid cryptic fake system errors and aggressive fake security warnings.

## 3. Visual design — electric studio desktop

Unlike WARP & WANDER's illustrated fantasy palette, CTRL/ROOM uses **hard-edged interface color, high-contrast UI states, pixel iconography, and extremely flat shapes**.

### Exclusive palette

| Token | Hex | Role |
|---|---|---|
| Kernel Navy | `#111A31` | Desktop depth and high-contrast surfaces |
| Hyper Cobalt | `#2858FF` | Primary desktop, active window, buttons |
| Monitor Frost | `#E8F0FF` | Readable panels and text |
| Voltage Yellow | `#E4FF58` | Active actions, status indicators, CTA |
| Bubble Magenta | `#FC5FA9` | Secondary accents, playful system cues |
| Registry Slate | `#61728F` | Metadata, thin separators, inactive text |
| Screen Ice | `#B6D7F7` | Secondary interface panel surfaces |

Do not use the warm golden/fern/coral/twilight palette assigned to WARP & WANDER. This must feel like another art director designed the site.

### Type and shape

- Main headlines: oversized squared-off display type with crisp forms; use a custom treatment or suitably licensed font, not a copied Macintosh/Windows font treatment.
- Interface labels: compact monospaced type with careful alignment.
- Longer reading content: neutral, clear sans serif with comfortable line height.
- Strong square edges, clipped corners, 1–3px borders, dithered patterns, simple offset shadows, and original 12×12 / 16×16 icon logic.
- Corners may have a **custom keyed-notch motif** specific to CTRL/ROOM, rather than default rounded panels.
- Don't rely on heavy CRT scanlines, fake scratches, glitch filters, skeuomorphic bevels, or unreadable low-resolution text.

### Unique visual motifs

- **Control glyphs:** angular square motifs inspired by programmable actions, not the official Elgato Stream Deck icon.
- **Patch cables:** tiny geometric connector lines that animate between chosen action tiles and the on-page deck simulator.
- **Modular tiles:** clearly distinguish draggable assignment tiles from decorative components.
- **Status pips:** small screen-space indicators for active workflows and simulation feedback.
- **Pixel cursor companion:** an optional original geometric pointer animation for decoration only; do not replace the actual browser cursor globally or break text selection.

### Desktop scene composition

A self-contained, original full-bleed blue digital desktop with subtle dither texture; a small proprietary side rail, asymmetrical window silhouettes, a desktop field, and a bottom-right mini-status strip. **No reproduction** of a classic Start menu, Apple menu, Windows taskbar, iconic trash can, Finder, or famous desktop wallpaper.

Product photos of the Stream Deck MK.2 are **not pixelated**. Their clarity underscores the real, physical product in contrast to the fictional OS interface.

## 4. Website structure and flow

Use a **working desktop metaphor**, but retain normal page scroll so visitors can read features and reach the product CTA without learning how to operate a fake computer.

### SCREEN 00 — BOOT / WELCOME

**Headline:** `WELCOME TO YOUR CONTROL ROOM.`  
**Support:** `A tiny desktop for big shortcuts. Explore what 15 programmable keys can make possible.`  
**Primary button:** `OPEN CTRL/ROOM OS`  
**Secondary link:** `SKIP TO PRODUCT`.

Visual: a proprietary blue desktop gradually boots. An original square-grid logo resolves at top-left. A simplified, accurate real product photograph anchors the hero, not a generic generated keypad. Three purposeful app-launcher icons appear with labels.

Intro sequence:

| Time | Motion |
|---|---|
| 0.00–0.12s | Main heading, quick product reference, and CTA render immediately. |
| 0.12–0.40s | Boot motif fills in 3–4 deterministic pixel strips. |
| 0.35–0.70s | Desktop background is revealed via an original raster scan / shutter effect. |
| 0.60–0.95s | App launchers arrive in a compact stagger. |
| 0.85–1.25s | Product photograph moves into frame; the OS settles as interactive. |

No artificial loading delay. The reveal should be skipped on repeat visits during the same session if preferred, and should never block navigation.

### SCREEN 01 — YOUR DESKTOP

Inside the page, provide a fully interactive **CTRL/ROOM OS** desktop stage with these original applications:

1. `DECK LAB` — Configure the simulated 15-key grid.
2. `ACTION LIBRARY` — Browse example shortcut/action tiles.
3. `RUN LOG` — Observe a selected action's mock execution.
4. `PROFILE SWITCHER` — Swap between sample editing, livestream, and everyday-productivity demo profiles.
5. `DEVICE INFO` — Read actual MK.2 facts, view authentic photo, access official CTA.
6. `ABOUT THIS CONCEPT` — Explain fictional status and the scope of the browser demo.

Each launcher is a real button with keyboard focus, accessible label, open state, and working activation. Pre-open `DECK LAB` and `DEVICE INFO` on first render so the key product message is never hidden behind icon exploration.

### SCREEN 02 — DECK LAB (signature interaction)

This is the signature experience. Show a **5×3 virtual control grid**, drawn with unique pixel UI tiles. Nearby, show a separate, crisp photo of the real Stream Deck MK.2 to establish the correct product connection.

The user can:

- Select one of 15 slots.
- Assign an action from the Action Library using **click-to-select and click-to-assign**; optional pointer drag-and-drop is enhancement only.
- Rename a slot and choose from a small set of original custom icon styles.
- Activate a slot and see what a simulated action would do in the on-page Run Log.
- Reset the layout or switch between a few curated demo profiles.
- Save the configuration locally to browser storage only with a clear `SAVE THIS DEMO` action; never claim it is saved to the hardware or cloud.

Example simulated actions:

| Action tile | Simulated behavior inside the website |
|---|---|
| START RECORD | Toggle a fake recording status chip, show log event. |
| MUTE MIC | Toggle a **demo-only** microphone indicator; do not access the real device microphone. |
| OPEN NOTES | Open an internal, fictional NOTES window. |
| NEXT SCENE | Change an on-page broadcast scene preview, without controlling OBS. |
| COLOR GRADE | Toggle two illustrative color treatment presets in a mock video preview. |
| FOCUS MODE | Simplify the internal demo workspace; do not change user's OS or browser settings. |
| LAUNCH TIMER | Start an internal timer that can be paused and reset. |

Clearly label the module `INTERACTIVE BROWSER SIMULATION — NO DEVICE CONNECTION`.

For keyboard users: all fifteen slots are reachable; assignment works without drag; use roving focus or simple Tab order, announce successful changes via a polite live region. Prevent pointer drag interactions from blocking text input or window controls.

### SCREEN 03 — ACTION LIBRARY

**Editorial copy:** `YOUR WORKFLOW, ONE PRESS AWAY.`

Library categories: CREATE, STREAM, ORGANIZE, EXPLORE. Use original tile icons, short labels, and brief nontechnical explanations. Clicking a tile selects it for assignment; hovering animates a small geometric connector pulse. Do not invent claims that each web demo action is a native bundled Elgato integration.

A short tooltip explains how the demo maps to real programmable keys without pretending the exact browser simulator is Elgato's official configurator.

### SCREEN 04 — PROFILE SWITCHER

**Headline:** `ONE DEVICE. MANY WAYS TO WORK.`

Create **three fictional profiles**:

- `STUDIO` — music/video creator quick actions;
- `LIVE` — streaming controls and scene organization;
- `EVERYDAY` — focus timer, notes, common tasks.

On change:

1. Animate a short grid-scan over the virtual key matrix.
2. Transition icons in a controlled stagger across 5 columns × 3 rows.
3. Update readable profile name, action descriptions, and Run Log status.
4. Preserve user-edited profiles or warn before replacing them.

This is an on-site demonstration; do not claim hardware profiles were exported or synced.

### SCREEN 05 — PRODUCT / DEVICE INFO

**Headline:** `MEET THE BUTTONS BEHIND THE MAGIC.`  
**Support:** `15 customizable LCD keys. A hardware control surface ready to become part of your workflow.`

Show a sharp real Stream Deck MK.2 photograph, an accurate 5×3 key matrix reference, and concise product facts. The user may zoom into a larger product photo or open a labeled information window. No imprecise AI-redrawn hardware image as a final product photo.

Include a high-contrast CTA: `EXPLORE STREAM DECK MK.2` → https://www.elgato.com/us/en/p/stream-deck

Add an always-readable attribution: `CTRL/ROOM is an independent fictional creative concept featuring Stream Deck MK.2 by Elgato. Not affiliated with or endorsed by Elgato.`

### SCREEN 06 — FINAL DESKTOP SIGN-OFF

A clean, less cluttered desktop composition closes the page. The window surfaces shrink and arrange into a custom geometric control motif; the product becomes visually dominant.

**Final headline:** `MAKE ONE BUTTON DO MORE.`  
**CTA:** `MEET THE REAL STREAM DECK` (official manufacturer)  
**Secondary:** `RESTART DEMO` (reset only site demo state after user action; never clear unrelated browser data).

## 5. Window manager UX — must genuinely work

Build a constrained yet real window system, not fake overlapping screenshots.

### Desktop rules

- Windows may be dragged by their **custom title handles** and brought forward by activation.
- Titlebar controls support `MINIMIZE`, `EXPAND/RESTORE`, and `CLOSE`; all perform the named action.
- Maintain correct z-index stacking and focus indication.
- Constrain window positions to usable viewport bounds; no windows stranded offscreen.
- Double-clicking a launcher opens or focuses the relevant window; single click/tap must also provide an obvious way to open it.
- Optional snap zones can be implemented, but only after stable normal dragging.
- Focus management must support keyboard-only users, including explicit `MOVE WINDOW` keyboard controls or an accessible positional menu.
- Avoid modal traps for ordinary modeless windows. A true modal is allowed only for a user-requested confirmation and must follow dialog semantics.
- Avoid infinite window spawning; one instance per built-in application is sufficient.
- Opening a different application should not silently erase virtual key assignments.

### Mobile and narrow screens

- Replace draggable freeform windows with a **stacked app-switcher / full-screen panel system**.
- App navigation is by obvious tabs or a launcher list, not tiny desktop icons.
- No window can overlap or hide the whole page in a way that traps scrolling.
- Keep the 5×3 keys at usable touch size or provide a responsive column-based selection view.
- Preserve all same features through touch and keyboard, including slot assignment and reset.

### Page scrolling

- Desktop OS stage can be sticky for a limited, narrative scroll interval, but the site must still be a normal document with product details outside the stage.
- On scroll, reveal different applications or explain features using intentional window rearrangement. Do not require dragging a window to discover the product CTA.
- Avoid hijacking wheel input for fake cursor movement or making scroll advance a simulated desktop when users expect normal page navigation.

## 6. Motion and interaction system

The motion concept is **interface orchestration**, not world travel.

| Interaction | Direction | Target timing |
|---|---|---:|
| Boot scan | Deterministic coarse pixel strips | 400–800ms |
| Launcher hover | Icon pops 2–4px, shows label feedback | 140–220ms |
| Window opening | Sharp pixel-mask scale + short opacity settle | 250–400ms |
| Window close | Tiny geometric collapse into launcher | 180–280ms |
| Focus swap | Border + shadow state shift, no big animation | 120–180ms |
| Window dragging | Direct pointer tracking, no sluggish delayed dragging | immediate |
| Drop action | Tile snaps into slot + confirmation flash | 180–300ms |
| Key press | Tactile 2px depression and immediate log event | 100–160ms |
| Profile switch | 5×3 grid icon stagger | 400–700ms |
| Product photo reveal | Clean editorial reveal, no pixel degradation | 650–900ms |
| Final outro | Windows condense into brand motif | 600–1000ms |

### Motion constraints

- Use stepped easings only for pixel-cadence effects, and smoother motion for draggable physical interface elements.
- A dragged window must track the pointer immediately; do not apply magnetic hover offsets to draggable windows.
- Don't animate every square forever. Ambient motion should be near-zero when idle.
- Don't auto-play sounds or intrusive faux OS alerts. If adding UI audio, require opt-in, offer mute, and use original audio.
- Honor `prefers-reduced-motion`: replace shutter, boot, and scan animations with instant stable states; keep fully usable windows and keyboard interaction.
- Pause nonessential offscreen effects and consider system performance on slower hardware.

## 7. Information hierarchy

A pixel OS should still be a persuasive product site:

1. Above the fold: fictional brand, real product identification, hero claim, understandable CTA.
2. Within first interaction: working 15-key preview and a clear note it's a demo.
3. Early in experience: explain common practical uses, with example preset selection.
4. In device window: manufacturer facts and product photograph.
5. Always accessible: direct `SEE REAL PRODUCT` link; don't bury it behind window juggling.
6. Final section: strongest campaign statement and manufacturer CTA.

Do not insert generic testimonials, fabricated user counts, fake partner logos, unsupported endorsements, or invented reviews.

## 8. Technology and implementation

Stack: Next.js App Router, React, TypeScript, CSS modules/Tailwind as fits the existing codebase.

Recommended implementation choices:

- Semantic React DOM for the window interface, toolbar, keys, texts, and buttons; keep it accessible, not painted into a single canvas.
- React state or Zustand for `openWindows`, `windowPositions`, `zOrder`, `activeApp`, `activeProfile`, `assignedActions`, `simulatorLog`, and demo toggles.
- Pointer Events for window drag and action tile drag; maintain click/tap fallback.
- `requestAnimationFrame` batching for active drag movement, not re-rendering the whole desktop at every pointer pixel.
- GSAP for boot, app launch, profile changes, and page-to-page storytelling transitions.
- Optional Lenis for desktop scrolling, coordinated with scroll effects, disabled for touch/reduced motion.
- Focus-visible outlines, ARIA status updates, semantic buttons, and dialog handling only when appropriate.
- Use CSS `image-rendering: pixelated` for icon sprites; never apply to hardware photos or readable HTML text.

Suggested module map:

```text
src/
  app/page.tsx
  app/globals.css
  components/layout/BrandHeader.tsx
  components/os/DesktopSurface.tsx
  components/os/DesktopLauncher.tsx
  components/os/WindowManager.tsx
  components/os/OSWindow.tsx
  components/os/StatusRail.tsx
  components/apps/DeckLab.tsx
  components/apps/ActionLibrary.tsx
  components/apps/RunLog.tsx
  components/apps/ProfileSwitcher.tsx
  components/apps/DeviceInfo.tsx
  components/apps/AboutConcept.tsx
  components/deck/VirtualDeck.tsx
  components/deck/ActionTile.tsx
  components/deck/KeyAssignmentDialog.tsx
  components/motion/BootSequence.tsx
  components/motion/DesktopTransitions.tsx
  lib/os/windowReducer.ts
  lib/os/presets.ts
  lib/os/actions.ts
  lib/os/storage.ts
  lib/motion/tokens.ts
public/assets/pixel-icons/
public/assets/product/
```

### State and simulation contract

- Keep action handlers in a small registry with deterministic, local effects.
- A key press should visibly update state and add a time-stamped *demo* log entry.
- Make reset semantics explicit: `RESET ACTIVE PROFILE` vs `RESET ALL DEMO DATA`.
- If state persists locally, provide an obvious clear/reset control; no telemetry or storage beyond the demo unless clearly disclosed.
- Do not invoke real system shortcuts, clipboard writes, downloads, camera/microphone requests, browser permission prompts, or third-party integrations unless specifically requested and meaningfully explained.
- Keep fake timers accurate enough for the demo and stop them when no longer in use.

## 9. Asset requirements

1. CTRL/ROOM wordmark and proprietary square-glyph symbol, vector export.
2. Custom icon suite: LAB, ACTIONS, LOG, PROFILES, INFO, ABOUT, NOTES; consistent logical 12px / 16px pixel grid, transparent sprite atlas.
3. Original system wallpaper: abstract cobalt and navy patchwork with controlled dithering, *not* a copied OS background.
4. Decorative pixel cursor or pointer trail (optional; no broken pointer behavior).
5. Original action icons for 15-key layouts, at least 20 unique symbols.
6. Four decorative app-preview thumbnails to demonstrate different simulated actions.
7. Verified, permission-cleared product photographs of Stream Deck MK.2: frontal, angle, and detail shots.
8. Tiny optional original UI sounds, disabled by default.

### Art-generation prompts (for original fictional-brand assets only)

- **Wallpaper:** `Original graphical retro-futurist 2D pixel desktop wallpaper for fictional creative software, saturated cobalt blue, deep navy structural geometry, ice-blue dither fields, lime yellow accents, asymmetrical composition, absolutely no Windows or Mac motifs, no logos, no application windows, no text, seamless visual logic.`
- **Icon atlas:** `Original flat pixel-art icon sprite sheet for fictional control-room operating system, custom geometric symbols for actions, macros, profiles, logs, notes, device, timer, color, and scene transition, strict 16x16 pixel logical grid, cobalt navy white lime magenta palette, clean silhouettes, no existing operating system icon references, transparent background.`
- **Marketing background accents:** `Original pixelated hard-edged modular interface shapes, bright cobalt and monitor white with lime activity markers, minimal graphic design, 2D, strong negative space, not a computer screenshot, no typography.`
- **App preview tiles:** `Original 2D pixelated creative studio preview thumbnails, abstract editing timeline, miniature broadcast scene, stylized productivity notes and colorful control signals, graphic shapes only, fictional non-branded UI, no Windows/Mac aesthetics.`

**Never generate a fake physical Stream Deck as if it were a verified official product photo.** Source authentic product photographs from approved manufacturer assets or appropriately licensed sources.

## 10. Build phases

**Phase A — Visual independence:** Establish custom OS design tokens, application chrome, grid logic, icon library, and full desktop/mobile static compositions. Confirm no resemblance to legacy operating systems or WARP & WANDER.

**Phase B — Core stateful desktop:** Implement launcher, window manager, focus and z-order, close/minimize/restore, keyboard support, mobile app switcher.

**Phase C — Interactive product demonstration:** Implement 5×3 Virtual Deck, action selection/assignment, curated demo profiles, Run Log, local state, honest demo labels.

**Phase D — Scroll narrative and hero:** Add short boot sequence, editor window transitions, product information narrative, real hardware photography, prominent manufacturer CTA.

**Phase E — Accessibility and performance:** Test desktop dragging, touch, keyboard-only, screen reader labels, responsive geometry, reduced motion, fast repeat loads, tab navigation, and product-link functionality.

## 11. Acceptance checklist

- [ ] Fictional CTRL/ROOM identity is clear, independent, and distinct from WARP & WANDER.
- [ ] Palette is cobalt/navy/frost/voltage-yellow/magenta, with no warm fantasy-brand overlap.
- [ ] No recognizable copied Windows/Mac OS UI, sounds, wallpaper, icons, or naming.
- [ ] Marketing hero and product CTA are immediately understandable without needing to operate the fake desktop.
- [ ] At least six functional launcher/app destinations.
- [ ] Functional drag, z-order, close, minimize, restore, and focus behavior on desktop.
- [ ] Fully usable mobile alternative without dragging.
- [ ] A real interactive 15-slot 5×3 configuration simulator, including keyboard assignment fallback.
- [ ] Multiple working demo presets and an accurate local Run Log.
- [ ] Demo actions do not pretend to control real hardware, broadcasts, apps, or the user's computer.
- [ ] Correct Elgato MK.2 product photographs, attribution, factual copy, and official outbound CTA.
- [ ] Clear reduced-motion and accessibility support.
- [ ] Robust behavior on resize, orientation change, browser back/forward, and duplicate launcher activations.
- [ ] No copied LUMEN designs, glass dashboards, or WARP & WANDER fantasy motifs.

### Final instruction to agent

**Build a quirky, fully functional pixel-desktop marketing environment whose interactions demonstrate the joy of programmable shortcuts.** Make the Stream Deck MK.2 the physical hero, keep every demo truthful, and finish the site with a visually original interface and accessible purchase path. Do not ship a generic brochure site with fake draggable window decorations.
