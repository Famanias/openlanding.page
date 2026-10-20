export type TemplateSlug = "orrery" | "keytu" | "koji" | "trace" | "calder" | "vector" | "morrow" | "loophouse";

export type CategoryId = "all" | "keynote-deck" | "scroll-showcase" | "3d-webgpu";

export type TemplateCategory = Exclude<CategoryId, "all">;

export interface Category {
  id: CategoryId;
  label: string;
}

export interface TemplateItem {
  slug: TemplateSlug;
  title: string;
  description: string;
  category: TemplateCategory;
  industry: string;
  stack: string;
  badges: string[];
  previewImage: string;
  videoClip?: string;
  promptMarkdown: string;
  model: string;
}

export const CATEGORIES: Category[] = [
  { id: "all", label: "All" },
  { id: "keynote-deck", label: "Keynote & Deck" },
  { id: "scroll-showcase", label: "Scroll Showcase" },
  { id: "3d-webgpu", label: "3D & WebGPU" },
];

export const ORRERY_PROMPT = "# Prompt: rebuild \"Orrery\" (presentation-style landing page)\n\nPaste everything below the line into your AI coding agent.\n\n---\n\nBuild a landing page in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4** for a fictional AI company called **Orrery**. It's \"the orchestration layer for teams of AI agents\": it coordinates specialised agents the way a clockwork orrery moves its planets.\n\nThe page must work as a **10-slide keynote**, and look editorial and hand-crafted, never like a component kit or a generic AI site.\n\n**Reference images** (look and feel only; generate your own): https://templateflow-blond.vercel.app/templates/orrery/title-orbits-1600.webp, …/problem-single-1600.webp, …/usecase-1-1600.webp, …/security-texture-1600.webp. The live template is at https://templateflow-blond.vercel.app/orrery.\n\n## Brand\n\n- **Palette, four colours only:**\n  - ink `#0E0F13`\n  - bone `#F2EFE8` (the page background)\n  - ultramarine `#2F3BFF` (the single accent)\n  - amber `#FFB000` (rare secondary)\n\n  Make tints with `color-mix()` of these. Never introduce other hues, gradients, glows, purple, robots, brains or circuit imagery.\n- **Type (via `next/font/google`):**\n  - **Instrument Serif** 400 for display and headings. Every headline ends in an *italic turn*, for example \"Many agents, *one clockwork.*\"\n  - **Inter Tight** for body text, 17px / 1.55.\n  - **Geist Mono** 12px uppercase with 0.08em tracking for labels, the counter, buttons and eyebrows.\n- **Logo:** the word \"Orrery.\" in Instrument Serif with the full stop in ultramarine.\n- **Icon:** a dot inside two concentric orbit rings, with one ultramarine satellite at the top right, on a bone rounded square.\n- **Layout:**\n  - Gutter `clamp(20px, 5vw, 80px)`, 12-column grid with 24px gaps.\n  - Each slide opens with a mono eyebrow: a 28px rule, then \"03 — The orrery\".\n  - Buttons are 44px pills: outline, or solid ultramarine.\n\n## Keynote mechanics (desktop ≥ 900px without reduced motion)\n\n- The page doesn't scroll. All slides are absolutely stacked at full viewport size.\n- Each slide gets `data-state` = `past` / `active` / `future`:\n  - **future:** `clip-path: inset(100% 0 0 0)`, on top.\n  - **active:** `inset(0)`.\n  - **past:** `inset(0)` plus `translateY(-7vh)`, underneath.\n  - Transition clip-path and transform over 700ms `cubic-bezier(0.77, 0, 0.175, 1)`, so the next slide wipes up over the previous one.\n- **Input:**\n  - Wheel and touch go through GSAP `Observer` with `wheelSpeed: -1`, `onUp` → next, `onDown` → previous, and a 650ms lock per step.\n  - Keys: ↓ → PageDown Space go forward, ↑ ← PageUp go back, Home/End jump to the ends. **Ignore keys whose target is an input, textarea, select or contenteditable.**\n- **Chrome:**\n  - A fixed slide counter \"03 / 10\" at bottom left (mono pill).\n  - A chapter rail at right: one button per slide, shown as a short rule. The active one has a long rule, and labels reveal on hover.\n  - A fixed top bar with the logo and a \"Book a demo\" button that links to `#cta`.\n  - The bar, counter and rail switch colours with the active slide's tone.\n- **Deep links:** each slide has an id. The hash updates on change and is read on load. Disable transitions until after that first jump.\n- **Mode detection:** start in an \"unknown\" mode, then use `matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)')`. Only attach keynote listeners or flow-mode observers once the mode is known.\n- **Content build:** inside the active slide, children fade and rise 18px, staggered `index × 80ms + 280ms`.\n\n**On phones and with reduced motion:** render the slides as normal stacked full-height sections with ordinary scrolling. The counter follows an IntersectionObserver. Nothing waits on an animation to become visible.\n\n## The 10 slides (bone background unless marked ink)\n\n1. **Title:**\n   - Mono kicker \"The orchestration layer for AI agents\" in ultramarine.\n   - Display h1 \"Many agents, / *one clockwork.*\"\n   - One-sentence lead, buttons \"Book a demo\" (solid) and \"How it works →\".\n   - A brass-orrery photo on the right 5 columns.\n   - Hint text \"Scroll, or press →\".\n2. **Problem:** a portrait photo of a lone brass sphere at left, then the h2 \"One agent *isn't* a team.\" and three numbered failures: \"It loses the thread.\" / \"It does everything at one depth.\" / \"Nobody checks its work.\"\n3. **The orrery (ink):**\n   - h2 \"Specialists on their own orbits, *kept in time.*\" with a 5-row legend: The conductor, Researchers, Builders, Shared memory, The hand-off (in amber).\n   - An SVG diagram in a 600×600 viewBox that builds every 450ms while active:\n     - core\n     - inner orbit with 2 bone agents\n     - outer dashed orbit with 3 agents, one large and ultramarine\n     - thin links from the core to every agent\n     - an amber dot travelling core → inner agent → ultramarine agent (`animateMotion`)\n   - Each legend row lights up as its step appears. Under reduced motion it's fully built.\n4. **How it works:** h2 \"Three steps from brief *to finished work.*\" Then three columns, each with a big ultramarine serif numeral, an h3 and a line of text: Describe the work / Orrery assembles the team / Review, approve, ship.\n5. **Use cases:** h2 \"Where teams put *it to work.*\" Three cards (a 4:3 image, an h3, text): Customer operations / Research and analysis / Software engineering.\n6. **Results:** h2 \"Measured in work *that ships.*\" Three huge serif figures with ultramarine units that count up when the slide is active: 4.2×, 63%, 99.6%. Short labels and a mono footnote.\n7. **Customers:** a large italic serif pull quote over a faint ink-wash circle texture, plus two smaller quotes with names and roles.\n8. **Pricing:** h2 \"Priced by the team, *not the token.*\" Three tiers: Starter $49, Team $390 (ink-filled, amber \"Most teams\" badge) and Enterprise Custom. Each has check-mark features.\n9. **Security (ink):** h2 \"Built for teams that *answer to auditors.*\" A 2×3 grid of claims (SOC 2 Type II, data residency, every hand-off logged, approval gates, no training on your work, SSO and SCIM) and a guilloché-texture image column.\n10. **Book a demo:**\n    - Display \"Put your agents *in orbit.*\" and a lead paragraph.\n    - A form card with Name, Work email and Company. Validate client-side with these errors: \"Add your name\" / \"Enter a work email\" / \"Add your company\".\n    - On success, show \"Thanks — we'll be in touch within one working day.\" **Never send a network request.**\n    - Footer row with the mark, \"© 2026 Orrery Labs\" and links.\n\n## Images\n\nGenerate 8 editorial still-life images. The style: warm bone paper, near-black ink, small ultramarine and amber accents, brass, glass and paper, soft daylight, lots of negative space. No people, screens, robots or text.\n\nKeys: `title-orbits` (16:9), `problem-single` (4:5), `usecase-1..3` (4:3), `quote-texture` (1:1), `security-texture` (16:9), `og-base` (16:9).\n\nUntil an image exists, render a hatched placeholder box labelled with its key, so the layout never breaks.\n\n## Quality bar\n\n- Motion: only `transform`, `opacity` and `clip-path` animate. UI transitions stay under 300ms with `cubic-bezier(0.23, 1, 0.32, 1)`. Hover effects only apply on `(hover: hover) and (pointer: fine)`. Buttons press to `scale(0.97)`.\n- Accessibility: slides have `aria-roledescription=\"slide\"` and labels. Inactive slides are `inert` in keynote mode. The counter is `aria-live`. Focus outlines are ultramarine.\n- No horizontal overflow at 375px. No layout shift from the deck on first paint.\n";

export const KEYTU_PROMPT = "# Prompt: rebuild \"KEYTU\" (showcase landing page)\n\nPaste everything below the line into your AI coding agent.\n\n---\n\nBuild a landing page in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4** for a fictional technical mountaineering apparel brand called **KEYTU** (tagline \"Alpine equipment · Tested on K2\").\n\nThe page is a **showcase told as an ascent of K2**. A pinned mountain silhouette and an altitude meter climb with the visitor from base camp to the summit, and each camp is a product chapter. It must feel serious, precise and hand-crafted, never like a template store.\n\n**Reference** (look and feel only; generate your own images): the live template at https://templateflow-blond.vercel.app/keytu, and images such as https://templateflow-blond.vercel.app/templates/keytu/hero-k2-1600.webp.\n\n## Brand rules\n\n- **Black, dark blue and white only:**\n  - black `#0B0C0E`\n  - dark blue `#0F1E33`\n  - white `#F5F6F7`\n  - plus navy tints for lines and muted text: `#16294A` `#2A3D5E` `#56657F` `#A5AEBD` `#DDE1E7`\n\n  **No accent colour.** Emphasis comes only from inversion (white on navy, or black on white). Square corners, 1px hairlines, no glassy blur.\n- **All photos are tritone-mapped:** per pixel, Rec.709 luma goes to black → `#0F1E33` → white. Do this at build or processing time, not with CSS filters.\n- **Type (via `next/font/google`):**\n  - **Barlow Condensed** 800 uppercase for display and chapter titles (each title ends in a full stop), 600 for product names.\n  - **Barlow** for body text.\n  - **IBM Plex Mono** 12px uppercase with 0.1em tracking for labels, specs and altitudes.\n- **Logo:** three stacked stone ellipses plus \"KEYTU\". **Icon:** white stones on a `#0F1E33` rounded square.\n\n## Structure\n\n1. **Top bar** (fixed, 68px, solid black): logo, section links, outline \"Expedition list\" button.\n2. **Hero** (100svh): K2 photo under a black gradient. Bottom-left: mono kicker, display h1 \"Built above the treeline.\", lead paragraph, buttons \"Begin the ascent\" (solid white) and \"Expedition lookbook\" (outline).\n3. **The ascent:**\n   - **Desktop:** two columns. The left is a `position: sticky` stage (100svh under the bar). The right holds 7 chapters, each at least 100svh.\n   - **Phones:** the stage is a sticky 36svh strip under the bar, with chapters below.\n4. **Footer.**\n\n## The stage\n\n- An SVG of **K2 from Concordia** in a 1000×1000 viewBox with `xMidYMax meet`. Ridges and glacier run past the viewBox with `overflow: visible`. It shows the classic pyramid: a shadowed SW face `#16294A`, a lit E face `#2A3D5E`, a white summit cap and a pale snow shoulder, above a black glacier with faint moraine lines.\n- **The Abruzzi Spur route:** a curve from base camp (lower right) up the SE ridge to the summit. Draw it dashed in `#A5AEBD`, with the climbed part solid white via `stroke-dashoffset`. A white climber dot sits at `getPointAtLength(progress × length)` with a soft pulsing halo. Camp markers fill white when reached.\n- **Desktop altitude meter:** a vertical track whose white fill scales with `(altitude − 5000) / 3611`. Camp labels are positioned by real altitude, and the active one is white.\n- **A big readout** \"7,350 M\" with the camp name, plus coordinates `35.8825° N · 76.5133° E · Karakoram`.\n\n**Progress logic (important):**\n- Camps: Base Camp 5,000 · Camp 1 6,050 · Camp 2 6,700 · Camp 3 7,350 · Camp 4 7,900 · Bottleneck 8,200 · Summit 8,611.\n- Camp *i* is reached exactly when chapter *i*'s top reaches the arrival line. The line sits just under the top bar, plus the sticky strip on phones.\n- `progress = (i + fraction to the next chapter) / 6`. Altitude interpolates linearly between camps.\n- Set `scroll-padding-top` to the same line, so `#c3` lands on exactly \"7,350 M\".\n- Recompute on mount (covers reload mid-page), on scroll and on resize, and refresh after fonts load.\n- Use GSAP ScrollTrigger for updates, and Lenis smooth scroll synced to it. Turn Lenis off under reduced motion.\n\n## Chapters (id → content)\n\n- `base` **5,000 m:** \"The FW26 collection.\" Intro, a base-camp night photo, and a 6-product grid (cards with 1px gap lines, 4:5 image, category, name, weight · colours).\n- `c1` **6,050 m:** \"Start with what touches skin.\" Merino 200 Half-Zip feature panel with a spec list.\n- `c2` **6,700 m:** \"Three layers. One job each.\" A diagram of three bars (01 Base · 02 Mid · 03 Shell) that translate apart as the chapter scrolls. The active bar inverts to white. Plus the Grid Fleece Hoody.\n- `c3` **7,350 m:** \"The outer wall.\" Summit Shell 3L:\n  - **Colourway swap** (black, navy, white) using native radio swatches inside a `role=\"radiogroup\"`, so arrow keys work. The image crossfades in 200ms with a 2px blur during the overlap.\n  - A **gear-label spec sheet**: a white card with a dashed inner stitch outline, code `FW26-SH-01`, and mono rows Weight 412 g / Waterproof 28,000 mm / Breathability 25,000 g/m² / Fabric 3-layer, 40D face.\n  - A **fabric zoom**: a 180px 2.5× loupe for mouse users, tap-to-zoom on touch.\n- `c4` **7,900 m:** \"Nights on the Shoulder.\" 8000 Down Suit (850 FP, −40 °C, 1,980 g) with a spec sheet and fabric zoom.\n- `bottleneck` **8,200 m:** \"Through the Bottleneck.\" Summit Mitt and Alpine Gaiter spec sheets side by side.\n- `summit` **8,611 m:** \"8,611 metres. Nothing above but sky.\"\n  - A **horizontal lookbook**: scroll-snap, mouse drag, prev/next buttons, 3:2 frames. 44px hotspot buttons labelled \"Show {product}\" open a small white card with the name, weight and colours.\n  - An **expedition-list signup**: email plus \"Join the expedition list\". Error \"Enter a valid email\". On success, \"You're on the list.\" **Never send a network request.**\n\n## Images (generate, then tritone)\n\nCool, high-contrast expedition photography in the Karakoram: night and blue hour, clean silhouettes, no logos or text. Keys:\n\n- `hero-k2`, `basecamp`\n- `product-shell-black|navy|white`\n- `product-down`, `product-base`, `product-mid`, `product-hands`\n- `fabric-shell`, `fabric-down`\n- `lookbook-1..4`\n\nUntil an image exists, render a hatched navy placeholder labelled with its key.\n\n## Quality bar\n\n- Only transform, opacity and SVG attributes animate. UI transitions stay under 300ms with `cubic-bezier(0.23, 1, 0.32, 1)`. Hover only on fine pointers. Presses scale to 0.97.\n- With `prefers-reduced-motion`: no smooth scroll, no halo or beacon pulses, the layer diagram fully spread, instant swaps.\n- No horizontal page overflow at 375px (the lookbook scrolls inside its own track). Keyboard focus is a 2px white outline.\n";

export const CAIRN_PROMPT = KEYTU_PROMPT;

export const KOJI_PROMPT = "# Prompt: rebuild \"KŌJI 麹\" (3D-focused landing page)\n\nPaste everything below the line into your AI coding agent.\n\n---\n\nBuild a landing page in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4 + Three.js (`three/webgpu` + TSL)** for a fictional Japanese restaurant called **KŌJI 麹**. It's a fermentation kitchen with twelve seats at one concrete counter, on the 14th floor of an imagined 1972 Metabolist concrete tower in Ginza. Eleven courses, open 18:00–23:00.\n\n**Everything is flat 1960s–90s Japanese brutalism. Only the food is 3D.** It must feel monumental and hand-made, never like a restaurant template.\n\n**Reference** (look and feel only; generate your own images): the live template at https://templateflow-blond.vercel.app/koji.\n\n## Brand rules\n\n- **Five colours only:**\n  - sumi `#1A1918`\n  - shadow `#4A4743`\n  - béton `#8E8A83`\n  - washi `#EDEAE4`\n  - shu `#C8331F` (the single accent: seal red)\n\n  Square corners, 3px rules, no gradients and no soft shadows. The one shadow is a hard `10px 10px 0` offset on the reservation card.\n- **Board-marked concrete** in CSS: `repeating-linear-gradient` horizontal formwork lines every 60px plus faint vertical grain, over béton or shadow.\n- **Type (via `next/font/google`):**\n  - **Dela Gothic One** for the wordmark, titles and kanji.\n  - **Zen Kaku Gothic New** for body text.\n  - **DM Mono** uppercase with 0.12em tracking for signage, labels and the menu.\n- **Wordmark:** \"KŌJI\" with the Ō in shu.\n- **Icon and mark:** a **hanko seal**, a shu rounded square with an inner washi border and the kanji 麹 in washi.\n\n## Page\n\n1. **Sticky 72px top bar** (sumi): the hanko plus \"KŌJI 麹\", and on the right a **noren curtain** nav. That's five hanging shadow-grey panels split by slits, each with kanji (厨房 献立 塔 板前 予約), an English label from 900px up, and a 4px shu hem. On hover a panel turns shu and drops 4px.\n2. **Hero** (sumi):\n   - A mono kicker, the giant wordmark (h1), a one-sentence lead and a shu \"Reserve a seat\" button.\n   - The **3D dish** in a square.\n   - A **vertical 麹** column (washi at ~14%) on desktop.\n   - A full-width **shu signage strip** below: `OPEN 18:00–23:00 · 11 COURSES · 12 SEATS · B1–14F · TOWER 1972 · GINZA`.\n3. **Kitchen** (béton slab): \"Fermentation is the kitchen.\" Three pillars, each with giant kanji: 麹 Kōji, 味噌 Miso, 塩 Shio. Two photos.\n4. **Omakase** (sumi): \"Eleven courses. One counter.\" The **food flight** (below), then a menu card with the hanko, \"Autumn menu · ¥38,000\", and 11 courses in 5 groups in mono:\n   - Sakizuke 先付: 01–02\n   - Mukōzuke 向付: 03–04\n   - Yakimono 焼物: 05–06\n   - Nimono 煮物: 07–09\n   - Shokuji 食事: 10–11\n5. **Building** (washi): a tower photo, \"A tower built to be rebuilt.\", the Metabolist idea (a core with plug-in capsules), a facts list.\n6. **Chef** (sumi): \"Ren Ishikawa.\", a pull quote with a 6px shu left rule, photo.\n7. **Reserve** (béton): \"Twelve seats. Two seatings.\" A washi form card with these fields:\n   - date (not in the past)\n   - seating `18:00 / 18:30 / 20:45 / 21:15`\n   - guests 1–4, error \"Parties of 1–4 only\"\n   - name\n   - email\n\n   On success, show \"Your seats are held. A confirmation will follow by email.\" **Never send a network request.**\n8. **Footer** (sumi, shu top rule): the hanko plus wordmark, address, hours, contact.\n\n## 3D dish (hero): procedural, no model files\n\n- `WebGPURenderer` (with `forceWebGL` when `navigator.gpu.requestAdapter()` fails), an alpha canvas, ACES tone mapping at exposure 0.9, soft shadows.\n- **Rice:** an ellipsoid bed with noise lumps, plus ~680 **instanced capsule grains** laid tangent to its surface.\n- **Fish:** a segmented box slab draped over the rice (`y += 0.34 − 0.4u⁴ − 0.1u²` along its length). Its `MeshPhysicalNodeMaterial` in TSL has:\n  - deep red-orange flesh broken by noise;\n  - creamy diagonal **fat marbling** from `sin(x·7.5 + z·5 + noise)`;\n  - an **amber miso glaze** with a **clearcoat**;\n  - caramelised ends.\n- **Plate:** a dark speckled stoneware board.\n- **Light:** a low warm key from the left, a cool rim, a dim hemisphere, and a faint RoomEnvironment for gloss.\n- **Behaviour:**\n  - turns slowly (0.15 rad/s);\n  - **drag to rotate**, with inertia;\n  - pauses off-screen;\n  - lazy-loads near the viewport;\n  - a static poster image shows first, then the canvas fades in.\n- **Fallbacks:** under reduced motion, with no GPU, or after device loss, keep the poster.\n\n## 3D food flight (omakase): scroll-scrubbed video\n\n- Use the [scroll-world](https://github.com/oso95/scroll-world) technique. 9 pre-rendered clips: 5 \"dives\" that push in on each dish on a concrete plinth, and 4 \"connectors\" that pull back and glide to the next plinth. Scroll drives `currentTime`.\n- **Make the clips seamless:** each connector's first frame is the previous dive's actual last frame, and its last frame is the next dive's actual first frame. Use a first-and-last-frame video model (e.g. Veo in Google Flow), extract frames with ffmpeg, and accept a join at PSNR ≥ 30 dB.\n- **Mount the engine mid-page:** put it inside a `position: sticky; top: 72px; height: calc(100vh − 72px); transform: translateZ(0)` box within a track of `(5×1.3 + 4×0.9 + 1) × 100vh`. Feed it a `scrollY` measured from the track's top.\n- **Remove any global** `html, body { overflow-x: hidden }`. It breaks `position: sticky`.\n- **Copy layer:** per course group, show \"先付 · Courses 01, 02\", the course names and the details.\n- **Seams:** a join that can't be made seamless becomes a cut covered by a **concrete slab wipe**, a board-marked panel sweeping across in 450ms.\n- **Until clips exist, or under reduced motion:** show the 5 dish stills as a static sequence with the same copy.\n\n## Images (generate)\n\nThe look is 1970s Fujicolor film: grain, slightly faded, raking light, board-marked concrete, heavy stoneware. No modern food styling, no text. Keys:\n\n- `hero-dish-poster`\n- `flight-sakizuke`, `flight-mukozuke`, `flight-yakimono`, `flight-nimono`, `flight-shokuji`. These are 16:9 with **identical framing**: the dish centred on a concrete plinth against a flat concrete-grey wall.\n- `building-exterior`, `counter`, `chef`, `fermentation`, `stoneware`\n\nUntil an image exists, render a labelled board-marked concrete placeholder.\n\n## Quality bar\n\n- Only the food moves. UI motion is limited to colour and press feedback (`scale(0.97)`) at ≤ 260ms with `cubic-bezier(0.23, 1, 0.32, 1)`.\n- Hover only on fine pointers. Focus rings are 3px shu.\n- No horizontal overflow at 375px. The noren still fits on phones (kanji only).\n";

export const TRACE_PROMPT = `# Prompt: rebuild "TRACE" (spatial-intelligence landing page)

Build a one-page landing site in Next.js App Router + React + TypeScript + Tailwind CSS v4 for TRACE, a spatial-intelligence studio that helps teams read what a city is becoming.

## Brand

- Palette: ink '#081115', paper '#E7ECE7', acid signal '#C9F458', muted steel '#849694'.
- Space Grotesk for display and DM Mono for labels, coordinates and interface metadata.
- The visual language is a dark observatory: precise hairlines, large coordinates, paper panels and one signal-green accent. Avoid gradients, glass cards and generic SaaS patterns.

## Scroll narrative

The hero opens with “Read what the city is becoming.” A fixed Three.js scene sits behind the page: a wireframe icosahedral signal orb, nested torus rings, three satellites and a sparse particle field. Scroll progress smoothly rotates the orb, shifts it vertically and changes the ring rotation. Pointer position gives the scene a small camera bias. Pause expensive motion when reduced motion is enabled.

Sections use ordinary document scrolling and anchor navigation:

1. Signal — “The invisible becomes legible.” Show a large '4.8m' readout and compact observed/resolved/latency metrics.
2. Shape — “A map is a choice about attention.” Show three numbered methods: Find the pulse, Model the friction, Make the next move.
3. System — “The future is a field.” Show Observe, Simulate and Align rows.
4. Contact — “Make the next move visible.” Use a mailto CTA and a small footer.

Oversized type, contour labels, coordinate marks and section copy move at different parallax depths via requestAnimationFrame and CSS custom properties. Reveal copy with IntersectionObserver. Keep keyboard focus visible, keep anchor links semantic and respect prefers-reduced-motion.
`;

export const CALDER_PROMPT = `# Prompt: rebuild "CALDER & ROWE" (editorial law-firm landing page)

Build a one-page landing site in Next.js App Router + React + TypeScript + Tailwind CSS v4 for CALDER & ROWE, an independent law firm for leaders navigating decisions with no easy precedent.

Use ink '#0D1117', paper '#EEEDE7', redline '#B84A3A' and muted steel '#7D827E'. Use Bodoni Moda for the display voice, Manrope for body copy and DM Mono for case labels, chapter navigation, coordinates and footer metadata. Keep the tone composed and exacting. Avoid generic corporate stock photos, gradients, glass cards and dense UI.

Create a fixed topbar with a circular CR mark, the wordmark, three chapter links and a Request counsel CTA. Add a fixed right chapter rail. The opening statement is a paper-colored hero with “For the moments that change the record.” and a redline circular seal used as a decorative parallax layer.

Use ordinary document scrolling with five sections:

1. Approach — “Good counsel creates room.” with three numbered principles.
2. Practice — “The matters that move an organisation.” with three dossier panels: bet-the-company disputes, board and governance, and strategic transactions.
3. People — a founding-partner quote and a senior-attention statement.
4. Contact — “Bring us the hard one.” with a mailto CTA.

Reveal content with IntersectionObserver. Animate only opacity and translateY for normal-flow content. Apply scroll parallax only to decorative seals, stamps and oversized rule textures so the layout never overlaps. Respect prefers-reduced-motion and keep focus states visible.
`;

export const VECTOR_PROMPT = `# Prompt: rebuild "VECTOR/90" (retro 90s runtime-tool landing page)

Build a one-page landing site in Next.js App Router + React + TypeScript + Tailwind CSS v4 for VECTOR/90, a developer tool that maps live runtime systems.

Use a black and deep-green base with cyan wireframe lines and signal-green active states. The visual language should evoke early SGI workstations, Tron and 90s CAD: raw polygonal wireframes, flat Gouraud-like shading, terminal readouts, scanlines and a grid floor receding toward a dark horizon. Avoid glass cards, gradients, modern SaaS blobs and soft rounded UI.

Create a procedural Three.js canvas behind the page containing a grid floor, horizon rays, a flat-shaded icosahedron with cyan wireframe overlay, two torus rings, a small satellite and a sparse particle field. Scroll should move the camera and rotate the object; reduced motion should keep the scene still.

Sections: Hero — “Make the invisible stack visible.” with runtime readouts; System — terminal trace; Runtime — Map, Replay, Resolve; Signal — operational metrics; Access — private beta CTA. Use monospace labels, uppercase technical metadata, visible focus states, semantic anchor navigation, scanline texture and restrained opacity/translateY reveals.
`;

export const MORROW_PROMPT = `# Prompt: rebuild "MORROW" (neighborhood repair landing page)

Build a one-page Next.js App Router + React + TypeScript + Tailwind CSS v4 landing page for MORROW, a neighborhood repair network that matches people with nearby makers.

Use a warm paper background '#F5EBDD', deep ink '#1C2A26', brick red '#B65344', and ochre '#DFA75B'. Use DM Serif Display for display headings, Work Sans for body copy, and IBM Plex Mono for labels. The tone should feel local, useful, and hand-made.

The page should tell one service story in order: hero promise, four-step repair route, two service options, an interactive distance-and-price calculator, local maker profiles, a people/metrics section, FAQs, and a final repair intake CTA. Use CSS illustration for the route map and a warm editorial layout with ruled rows, no generic SaaS cards, and no glassmorphism.

Use IntersectionObserver for restrained reveals, keep controls keyboard accessible, and respect prefers-reduced-motion. The calculator is client-only and must never send a network request.
`;

export const LOOPHOUSE_PROMPT = `# Prompt: rebuild "LOOPHOUSE" (community tool-library landing page)

Build a one-page Next.js App Router + React + TypeScript + Tailwind CSS v4 landing page for LOOPHOUSE, a neighborhood tool library that helps people borrow useful equipment from nearby shelves.

Use paper #EFF3E4, ink #17272A, teal #2F6F67, ochre #E3A52A, muted green #60716B, and ruled line #CBD7C4. Use DM Serif Display for display headings, Work Sans for body copy, and IBM Plex Mono for labels. Keep the tone local, useful, and hand-made.

The page should tell one service story: hero promise, four-step borrowing route, two access options, an interactive borrowing-time price calculator, local shelf hosts, a community metrics section, FAQs, and a final reservation CTA. Use a CSS illustrated neighborhood map and a warm editorial layout with ruled rows. Keep controls keyboard accessible, use restrained IntersectionObserver reveals, and respect prefers-reduced-motion.
`;

export const TEMPLATES: TemplateItem[] = [
  {
    slug: "orrery",
    title: "Orrery",
    description:
      "The orchestration layer for teams of AI agents. A 10-slide keynote experience with clockwork motion.",
    category: "keynote-deck",
    industry: "AI & DevTools",
    stack: "Next.js 16 · Tailwind v4 · GSAP Observer · Motion",
    badges: ["Keynote Deck", "GSAP", "Keyboard Nav"],
    previewImage: "/templates/orrery/title-orbits-1600.webp",
    promptMarkdown: ORRERY_PROMPT,
    model: "Claude Opus 5.5 High",
  },
  {
    slug: "keytu",
    title: "KEYTU",
    description:
      "Technical mountaineering apparel told as an ascent of K2. Pinned altitude meter and tritone photography.",
    category: "scroll-showcase",
    industry: "Apparel & Goods",
    stack: "Next.js 16 · Tailwind v4 · GSAP ScrollTrigger · Lenis",
    badges: ["Scroll Journey", "Altitude Meter", "Tritone Photos"],
    previewImage: "/templates/keytu/hero-k2-1600.webp",
    promptMarkdown: KEYTU_PROMPT,
    model: "Claude Opus 5.5 High",
  },
  {
    slug: "koji",
    title: "KŌJI",
    description:
      "Fermentation kitchen in Tokyo with 3D WebGPU dish showcase, brutalist aesthetics, and scroll-scrubbed video.",
    category: "3d-webgpu",
    industry: "Hospitality & Dining",
    stack: "Next.js 16 · Three.js (WebGPU/TSL) · Scroll-World",
    badges: ["WebGPU 3D", "Scroll Video", "TSL Shaders"],
    previewImage: "/templates/koji/hero-dish-poster-1600.webp",
    videoClip: "/templates/koji/clips/dive-2-m.mp4",
    promptMarkdown: KOJI_PROMPT,
    model: "Claude Opus 5.5 High",
  },
  {
    slug: "trace",
    title: "TRACE",
    description:
      "Spatial intelligence for the moving city. A parallax field guide with a scroll-reactive Three.js signal orb.",
    category: "3d-webgpu",
    industry: "Urban Systems",
    stack: "Next.js 16 · Three.js · Scroll Parallax · IntersectionObserver",
    badges: ["Scroll Field", "Three.js 3D", "Parallax Type"],
    previewImage: "/templates/trace/trace-preview.svg",
    promptMarkdown: TRACE_PROMPT,
    model: "GPT-6 Astra Max",
  },
  {
    slug: "calder",
    title: "CALDER & ROWE",
    description:
      "Independent counsel for consequential decisions. An editorial law-firm landing page built around case files, redlines and clear positions.",
    category: "scroll-showcase",
    industry: "Law & Advisory",
    stack: "Next.js 16 · CSS Scroll Reveal · IntersectionObserver · Responsive Type",
    badges: ["Editorial Scroll", "Case Files", "Senior Counsel"],
    previewImage: "/templates/calder/calder-preview.svg",
    promptMarkdown: CALDER_PROMPT,
    model: "GPT-6 Astra Max",
  },
  {
    slug: "vector",
    title: "VECTOR/90",
    description:
      "Runtime maps for systems in motion. A retro 90s wireframe developer-tool landing page powered by procedural Three.js geometry.",
    category: "3d-webgpu",
    industry: "Developer Tools",
    stack: "Next.js 16 · Three.js · WebGL Wireframe · Scroll Motion",
    badges: ["Retro CGI", "Runtime Maps", "Three.js Scene"],
    previewImage: "/templates/vector/vector-preview.svg",
    promptMarkdown: VECTOR_PROMPT,
    model: "GPT-6 Astra Max",
  },
  {
    slug: "morrow",
    title: "MORROW",
    description:
      "Repair, kept local. A warm neighborhood-service landing page with a route narrative, price calculator, and maker network.",
    category: "scroll-showcase",
    industry: "Local Services",
    stack: "Next.js 16 · CSS Illustration · Client Calculator · IntersectionObserver",
    badges: ["Local Network", "Price Calculator", "Editorial Flow"],
    previewImage: "/templates/morrow/morrow-preview.svg",
    promptMarkdown: MORROW_PROMPT,
    model: "GPT-6 Astra Max",
  },
  {
    slug: "loophouse",
    title: "LOOPHOUSE",
    description:
      "Tools, kept in reach. A community-library landing page with a neighborhood route narrative, shelf hosts, and borrowing calculator.",
    category: "scroll-showcase",
    industry: "Community Services",
    stack: "Next.js 16 · CSS Illustration · Client Calculator · Editorial Scroll",
    badges: ["Tool Library", "Community Flow", "Price Calculator"],
    previewImage: "/templates/loophouse/loophouse-preview.svg",
    promptMarkdown: LOOPHOUSE_PROMPT,
    model: "GPT-6 Astra Max",
  },
];
