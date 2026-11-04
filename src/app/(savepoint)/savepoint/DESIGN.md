# SAVEPOINT. design and hardware system

SAVEPOINT is an imaginary collection of ten original games. This surface is an experience: the physical cartridge and the world inside it lead; the interface stays quiet. Preserve the approved game artwork, the low wedge console and the shared cartridge shell. No commercial, licensing or playable-game claims belong here.

## Visual system

The background is charcoal `#121419`, with deep `#0B0D12` inspection and footer surfaces. Raised surfaces use `#1B1F28` and `#252934`. Text is warm white `#F2F0E8`, secondary text `#A9ADB7`, and rules warm white at 15% opacity. Acid lime `#CDF266` identifies actions, power, selection and alignment. Violet `#7971B7` and coral `#F47D62` are secondary accents. Each game's existing accent belongs to its own catalog metadata and world detail.

Space Grotesk carries uppercase editorial headings and the wordmark. Plus Jakarta Sans carries paragraphs. IBM Plex Mono carries catalog identifiers, years, measurements and operational controls. Load all three through the isolated server layout with next/font. Display headings have tight, balanced lines; body copy uses generous leading and a restrained measure.

The hero is centered: headline, thirty-object physical rail, selected-game caption, boot action. Lower sections use thin horizontal rules and generous spacing. The hardware studio pairs a large inspection surface with four typographic selectors. The manifesto layers two cropped world plates alongside an essay. Catalog entries are open horizontal artwork/editorial rows, stacking on phones. Avoid repeated boxed feature grids, unrelated full-width background changes and neon decoration.

## Hardware authority

Six approved PNGs define the hardware: deck-01-three-quarter, deck-01-front, deck-01-slot-detail, cartridge-shell-front, cartridge-shell-three-quarter and cartridge-shell-rear. The two factories and their sculpt specifications completed the img2threejs pipeline; preserve the committed verification evidence when extending the page.

DECK/01 is a charcoal wedge, 2.4 units wide and 2.745 deep, rising from approximately .30 at the front to 1.08 at the rear. It has an inclined landscape screen, four front-lip controls, recessed vents, a base seam and one lime LED. The real top aperture measures .99 by .18 units at local y=1.075, z=-1.05. Its floor is y=.76, the dock anchor y=.84 and the alignment anchor y=1.55. All insertion motion uses these actual Object3D anchors transformed into world space.

Every game uses identical cartridge geometry. Individual artwork and spine textures supply identity. Label art retains its aspect ratio and sits above a sharp lower title band. Shared shell geometry/materials are cached; insertion clipping affects only the active cartridge's cloned materials. The slot cavity occludes the seated shell.

The hardware inspector instantiates the same deck factory. Its four camera presets show the inclined display, rear slot, front controls and vented side. The slot preset shows a downward alignment guide. Wireframe is a real material toggle. Its own cloned polymer maps, environment, renderer, geometries and materials are disposed independently. IntersectionObserver pauses offscreen rendering; the view renders only while moving or invalidated.

## Interaction and motion

The main imperative Three.js scene owns all thirty cartridges, the selected object, console, camera and boot display. React owns semantic controls and the projected detail dialog. The rail wraps, damps fractional movement, opens the active cover and separates neighbors. Horizontal drag or wheel browses; vertical wheel scrolls the document normally. Arrow keys operate while the archive stage is on screen. Drag release snaps without accidental boot.

The boot sequence extracts the cartridge, reveals the console, aligns above its rear slot, inserts vertically, reads the ROM and expands semantic content from the screen's actual projected quadrilateral. Ejection reverses the physical journey. Skip, Escape, browser history and deep links remain functional. Catalog boot first scrolls to the archive, then waits for rail convergence before beginning that sequence. A new browse gesture cancels a pending catalog boot.

The manifesto uses scoped GSAP ScrollTrigger line clipping and subtle world-plate parallax. Reduced motion makes text immediately visible and completes scene transitions directly. Cursor enhancement uses a thin outline on fine pointers, a smaller spine ring and a BOOT pill over the active cartridge. Native cursors and visible controls remain available; touch has no custom cursor.

## Content and accessibility

The ten complete records in data/games.ts are the single runtime source for titles, years, genres, hooks, descriptions, world notes, artwork and archive telemetry. The five catalog filters use curated, overlapping genre clusters; Mossheart belongs to exploration and fantasy. Every entry has select and physical boot controls.

Header and footer anchors lead to archive, the-deck, manifest and index. The final return action scrolls and focuses the archive boot control. During a cinematic transition, background sections are inert and body scrolling is locked. The world dialog traps focus, scrolls independently and restores the boot control on return. Focus rings are lime. Controls meet a 44px minimum target. All supplied artwork has contextual alternative text. No WebGL canvas traps keyboard focus. Context loss preserves a semantic image archive.

## Responsive and release criteria

Verify 1920×1080, 1366×768, 1024×768, 768×1024 and 390×844. The hero occupies one viewport with usable controls; mobile navigation occupies its own header row. Inspection, essay and catalog columns stack below 768px. There must be no horizontal document overflow.

Run the isolation, palette and media checks, copy-bundle generation, TypeScript, Vitest and SAVEPOINT Playwright suite. Inspect the real WebGL render and all lower sections at desktop and mobile sizes. Record results in VERIFICATION.md and MILESTONE_STATUS.json. All runtime imports stay within this route group or installed npm dependencies; all media lives under public/templates/savepoint.
