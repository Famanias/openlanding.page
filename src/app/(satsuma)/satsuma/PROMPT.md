# Prompt: rebuild "Satsuma" (a short-reel marketplace with a curved video wheel)

Paste everything below the line into your AI coding agent.

---

Build a landing page in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4** for a fictional marketplace called **Satsuma**, where small brands hire handpicked makers for short vertical product reels. Slogan: *"Reels that land, made by hand."* A satsuma peels into snackable segments, which is the same idea as a short clip, so packs are sold "by the segment" and the logo is a satsuma seen from the top.

**The central idea: the reels sit on the inside of a cylinder, so the hero is a curved video wheel.** Ten tall cards drift right to left, you can fling them with the pointer or a finger, and each card's width, edge heights and lean come from where it sits on the curve. The look is soft, airy, handmade, juicy and confident.

**Reference (look and feel only; build your own):** the live template at https://openlandingpage.vercel.app/satsuma.

## Brand rules

- **Six colours only.** Make tints only with `color-mix()` of these:
  - paper `#FFF6EA` (the page)
  - ink `#1F1520` (text)
  - aubergine `#3A1D4A` (the primary action, the dark bands)
  - satsuma `#FF7A2F` (the one accent: fills, rings, strokes; never small text)
  - apricot `#FFD9B0` (tints, card ground)
  - leaf `#2F5D3A` (rare: the logo leaf, scene foliage)
- **Type (via `next/font/google`, distinct variable names):**
  - **Bricolage Grotesque** 600/700/800 for display (`--font-bricolage`), tracking −0.035em.
  - **Inter** 400/500/600 for body and UI (`--font-inter-body`).
- **Corners:** pills for buttons, 28–32px rounding for cards, 16px for inputs. No hard edges.
- **Logo:** a satsuma from the top (an orange circle with six faint segment lines, a centre dot, one leaf) plus the wordmark "satsuma." in Bricolage 700 with the full stop in satsuma. Provide `brand/Logo.tsx` (Mark plus lockup), `icon.svg` and a 1200×630 `opengraph-image.tsx`.
- **Voice:** warm, plain and specific: "6, 12 or 24 reels", "first reels in 5 days", "$70 a reel". Never "game-changing", "supercharge" or exclamation marks. Fruit puns are allowed once per section.

## The hero is one 1440×1080 frame

`--u = min(100vw / 1440, 100svh / 1080)`, and every element is placed in frame units, so the composition scales as one picture. Use `max()` floors on small text so nothing falls under 12–13px.

- **Top bar:** the logo at (37, 36); nav "Makers · How it works · Packs · Brief · Contact" at x = 505 (31u gap, 16.4u); a white "Log in" pill 92×40 at (1211, 29) and an aubergine "Sign up" pill 97×40 at (1304, 29).
- **Headline:** centred at top 176, 88u / 92u, Bricolage 700, tracking −0.035em (−0.022em on line 2): "Reels that land, / made by hand."
- **Subline:** centred at top 394, 20.8u / 32u, muted ink, three lines.
- **Marks (no hand-writing, no arrows):** a round **seal** at (1196, 292), 150u wide: an apricot disc with "HANDPICKED MAKERS · PEELED BY HAND ·" set on a circle (`textPath`, Inter 600, aubergine) that turns once every 30s around a small satsuma mark; a **leaf sprig** at (206, 344), 116u wide: a leaf-green stem that draws itself, three leaves that unfurl in turn, growing out of a satsuma wedge; and a **trust line** centred under the button at top 994: a small satsuma drop and "Free to brief · a maker replies within 24 h".
- **CTA:** an aubergine "Make a Reel" pill 172×58 on a satsuma plate (a pill 190×74 at (626, 901)). The pill sits 7u up and to the left of the plate so the plate peeks out below and to the right, and it springs down onto the plate on hover, focus or press. The pill is magnetic on fine pointers.
- **Wheel:** a full-viewport row behind the copy, cards clipped by the viewport edges.

## The mechanic: the reel wheel (pure maths, unit-tested)

Everything is in `wheel/geometry.ts` (no DOM, no React) and `wheel/momentum.ts`.

- **Profile (desktop):** centre 720, halfW 706, pitch 196, baseW 170, growW 48, baseH 280, growH 92, cy 687, cyLift 12, push 0.083, radius 15.
- **Position:** cards sit on an even 196u pitch. With `t` the unpushed offset from the centre, the centre is `x = 720 + t·(1 + 0.083·(t/706)²)`, which keeps a ~26u gap even at the rim.
- **Width:** `w = 170 + 48·d²`, where `d = |x − 720| / 706`.
- **Edge heights:** each vertical edge is `280 + 92·q^2.6`, where `q` is **that edge's own** normalised distance, so the outer edge is taller than the inner one and the card leans like the inside of a cylinder.
- **Vertical centre:** `687 − 12·d²`.
- **A card is a rounded quad:** four corners, each rounded with a quadratic curve (radius 15u, clamped to half an edge), written as `clip-path: path('…')` every frame. No drop shadow. A small frosted round play icon sits at each card's bottom-left.
- **Looping:** `layoutCards(profile, offset, count, bend)` wraps `t = wrap(i·pitch + offset + period/2, period) − period/2`, so one full period maps every card back onto itself. `cardCount()` returns ten on the 1440 frame and more (always even) on wider screens, so the seam stays off-screen.
- **`bend` (0–1):** 0 is a flat row of identical 170×280 cards; 1 is the full cylinder. On load, `assembleBend(elapsed)` eases it from 0 to 1 over ~1.7s (450ms delay), so the wheel **assembles from a flat row into its arc**. This is the signature moment.
- **Drift:** −50 units per second (right → left).
- **Drag:** the row follows the pointer 1:1. Keep pointer samples for the last ~200ms and compute `flingFrom(samples)` over the last 90ms, clamped to ±4,200 units/s.
- **Coast:** after release, the fling decays so that 5% of its speed remains after one second (`v·0.05^dt`, frame-rate independent, snapping to 0 under 2 units/s), and the drift carries on underneath.
- **Cursor:** `grab` and `grabbing`. `touch-action: pan-y` so vertical page scroll still works on phones. Arrow keys nudge (±520 units/s).
- **One rAF loop** writes every card's `transform`, size and clip-path. It stops completely when the wheel is off-screen. React state holds only the card count.
- **Phones (≤ 820px):** the same wheel on a 640-unit scale in a 250px band with its own profile (centre 320, pitch 172, base 150×290, cy 205).
- **First paint without JS:** server-render the cards at rest in desktop geometry through `calc(N * var(--wu))`, so the page is finished before hydration and for no-JS visitors.

## Card media: ONE video for all ten

- All ten cards read from a single 16:9 **5×2 grid** video (tiles of 384×540, edge to edge), so it downloads once. Tile order, row-major: sneaker, skincare splash, latte pour, headphones, plant shop, florist bouquet, pottery wheel, serum splash, latte top-down, headphones on a stand.
- Inside each clipped card, place a `<video>` (muted, looped, `playsInline`) sized 5 × tile width by 2 × tile height and offset to its tile, where `tileH = max(cardH, cardW / (384/540))` (`tileLayout()` is pure and tested). Resync any video that drifts more than 0.15s from the first, and fade each in when its first frame is ready.
- **Until clips exist** (`REEL_CLIP` in `wheel/reel-media.ts` is `null`), each card plays a looping scene drawn in SVG, one per tile (a bobbing sneaker, a splashing skincare bottle, a latte pour that draws a heart, a pulsing pair of headphones, swaying plants, a bouquet, a pottery wheel, a serum drop, a swirling top-down latte, a glowing headphone stand). Colour comes only from palette classes; every loop is a transform animation, paused off-screen and under reduced motion.
- **Reduced motion:** no entrance, no drift, no coast, no video, no scene loops. The wheel is the finished cylinder and can still be dragged.

## The page after the hero

1. **A band** (aubergine, rounded top) that **slides over the pinned hero**: the hero is `position: sticky` and scales to 0.95 and dims as the band covers it (one rAF writes `--sa-out`). It holds a marquee of product categories (Sneakers · Skincare · Coffee · Houseplants · Headphones · Florals · Ceramics · Serums · Candles · Cookware) that pauses on hover, focus and off-screen.
2. **How it works** (`#how`): headline "Brief it. Match it. Peel off your reels." (the last words highlighted with a satsuma swash). Three apricot cards: 01 Send a brief (60 sec), 02 Meet your maker (24 h), 03 Peel off your reels (5 days). Each figure counts up (final value in a visually hidden span). Hand-drawn connector arrows between the cards draw as they reveal.
3. **Makers** (`#makers`): six tilt cards in a 3-column grid. Each has a looping scene (or a `Picture` once `maker-<id>` images exist), a "from $90 / reel" tag, a name, a craft and a city, a one-line style note, three stats (rating, reels shipped, turnaround) and a "Brief {first name}" link that pre-fills the form. Makers: Imani Okafor (sneakers, Lagos), Tove Lindqvist (skincare, Malmö), Mateo Ruiz (coffee, Valencia), Hana Sato (ceramics, Kyoto), Priya Nair (florals, Pune), Jonas Weber (audio gear, Leipzig).
4. **Packs** (`#packs`): "Buy reels by the segment." Three cards, each with a satsuma cut into as many wedges as it has reels (`segmentWedges()`, pure and tested): Quarter · 6 reels · $480 ($80 a reel, first reels in 5 days); **Half · 12 reels · $840 ($70 a reel, 7 days; the aubergine "Most picked" card)**; Whole · 24 reels · $1,440 ($60 a reel, 12 days). The wedges pop in one by one.
5. **Brief** (`#brief`, aubergine): "Tell us what to peel." with facts (24 h to a match, 9:16 vertical, $0 to brief) beside a paper form card: floating-label Brand name and Work email, a "What do you sell?" select, a radio row of the three packs, and an optional note (280 characters). Rules live in `forms/brief.ts` and are unit-tested: brand ≥ 2 characters, a valid email, a listed category and pack, note ≤ 280. Invalid fields shake once and their messages slide down; focus goes to the first error. Submit morphs to bouncing dots, then the form is replaced by a confirmation whose satsuma fills wedge by wedge, with a stable reference like `SA-H3K9`. **Never send a network request.**
6. **Footer** (ink): the lockup, a line of copy, an email, two link columns and "A fictional brand for a landing-page template".

## Motion

- **Personality:** soft and organic, with the verbs **glide** and **settle**, at expressive intensity. Put the tokens in `@theme`: ease-out `cubic-bezier(.22,1,.36,1)`, expo `cubic-bezier(.16,1,.3,1)`, in-out `cubic-bezier(.65,0,.35,1)`, a spring `linear(0, .4 9%, .86 22%, 1.04 33%, 1.01 46%, .995 62%, 1)`, and durations of 90 / 180 / 420 / 850 / 1100 ms with an 80 ms stagger.
- **Load (CSS keyframes, so it runs before hydration and shifts nothing):** the header items drop in at 150ms (staggered 55ms), each headline line rises out of a blur at 380 and 520ms, the subline follows at 760ms, the wheel rises while it assembles into its arc, the CTA scales in at 1150ms, the sprig stem draws from 1400ms while its leaves unfurl, the seal pops at 1500ms and the trust line fades in at 1600ms.
- **Reveals** (one shared IntersectionObserver flips `data-in`): mask-rise (headlines), rise (leads), cascade (cards and facts), scale (the form card), draw (eyebrow rules, connectors), count-up, and a clip-path wipe with an inner scale settle (maker media). Hidden states exist only under `html[data-sa-motion="live"]`, and there is a `<noscript>` override. Never observe an element that is itself clipped to nothing; key a wipe off a revealed ancestor.
- **Scroll:** Lenis on desktop fine pointers only. The header compacts after 80px (blurred paper strip), hides on scroll-down and returns on scroll-up, and fills a hairline rail with page progress. One indicator glides between nav links. The mobile menu opens through a `clip-path: circle()` from the toggle, with staggered links, scroll lock and a focus trap.
- **States:** buttons fill from the left and their labels roll, press at `scale(.97)` with a spring release, and CTAs are magnetic; maker cards tilt ±6° with a following spotlight, lift 6px and dim their siblings; pack cards lift and dim siblings; links draw their underline; inputs animate their focus ring.
- **Ambient (at most three at once, paused off-screen):** the wheel's drift, the seal's turn, the marquee, and the scene loops.

## Quality bar (must hold)

- Animate only `transform`, `opacity`, `clip-path` and stroke offsets (a short one-shot blur on entrances is fine). CLS 0, and no horizontal overflow at 375px.
- One h1, landmarks, real buttons and links, AA contrast (satsuma is a fill, never small text), visible focus rings and a labelled carousel region.
- Folder isolation: import only npm packages (`lenis`) and files inside `src/app/(satsuma)/`. Register the six-colour palette in `scripts/templates.config.ts`.
- Structure: `brand/`, `content/` (typed data with tests), `wheel/` (geometry, momentum, the wheel, scenes, media), `motion/` (math plus tests, Reveals, ScrollVars, Magnetic, TiltCard, Marquee, CountUp, SmoothScroll), `sections/`, `forms/` (rules with tests, the form) and `assets.tsx` with labelled placeholders.
- Playwright covers the cylinder, the drift, drag and coast, keyboard, the hero coordinates, reveals, hover, form pre-fill, validation and success, hash links, the phone menu and band, reduced motion (no drift, no video, everything visible), and no-JS.
