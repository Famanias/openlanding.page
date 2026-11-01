# Pello — money for the life you want

## Requirements
An isolated Next.js 16 App Router / React / TypeScript gallery template at /pello. Original imagery via the built-in image generator. The approved brand board lives in .openlanding-page/pello/board/index.html. Install: npm i next react react-dom @phosphor-icons/react.
The user explicitly requires an original layout: references inform only photography quality, spaciousness and polish. Never reuse the supplied left-copy/right-phone hero, trust logo strip, two-card feature grid, side accordion/phone section, portrait/quote split, or rounded download banner.

## Concept
Money becomes meaningful when it has somewhere to go, so visitors allocate a sample balance among everyday spending, a rainy day and a weekend away. The total is conserved in integer cents. Every primary action leads to the planner or carries the selected plan into the local signup.

## Palette
Ivory #FFF9F1 is the page; blush #F2E7E4 is the quiet panel; plum ink #321C2D is text; aubergine #653453 is the action color; guava #EF9A9A is the goal marker; matcha #DCE5BA is the planner field; leaf #45624A signals confirmation; mauve #70616F is secondary text. Derive all tints with color-mix(). Mauve on blush is 4.78:1; ivory on aubergine is 9.25:1. Pastels always use plum text.

## Type
Manrope 400/500/600/700 for display, body and interface, Geist Mono 400 for monetary values only; both via next/font/google with distinct --font-pel-manrope / --font-pel-mono variables. Display 48–104px, section titles 36–72px, body 16–18px, small labels 12px. Fixed line breaks and reserved image dimensions prevent layout shift.

## Layout
1. Quiet navigation with original P mark, in-page links, plan action and a native mobile dialog.
2. Centered, two-line oversized statement and concise lead, followed by an edge-to-edge panoramic train photograph with one attached balance receipt.
3. Full-width matcha allocation studio, with an open introduction above the plan controls and a wide account panel whose three destinations are visible together.
4. An editorial three-image journal: everyday, rainy day and weekend, with staggered image heights and open captions.
5. A full-width dark plum product theater: centered heading, one large generated phone, a diagonal goal receipt and three plain product facts. No card grid or accordion beside the phone.
6. One large centered customer quote; compact text-only selectors change the quote, not a large portrait.
7. FAQ accordion with an understated introductory line.
8. Integrated closing invitation, local signup, oversized wordmark and functional legal dialogs. No separate download banner.

## Balance mechanic
allocator/model.ts owns a $2,400.00 balance (240000 cents), allowlisted plan IDs, preset rainy-day percentages, bounded goal contributions, exact conservation and query-safe signup links. The default balanced plan is $1,200 everyday / $720 rainy day / $480 weekend. A native range changes the weekend contribution, leaving the rainy-day allocation fixed; everyday receives the exact remainder. Presets are a native radio group. Plain output values remain accessible. The selected plan and goal are carried in the signup URL. Unknown query values fall back to the balanced plan.

## Motion
Identity: soft, confident. Verbs: flow and settle.
Tokens: ease-out cubic-bezier(.22,1,.36,1); ease-in-out cubic-bezier(.65,0,.35,1); spring linear(0,.5 15%,1.03 50%,1); press 100ms, feedback 200ms, state 280ms, reveal 800ms, hero 1100ms; stagger 65ms; reveal shift 24px.
Signature moment: choosing a plan sends the guava transfer dot from the balance into the goal track as the three monetary values settle together.
Native scroll with CSS smooth anchors; one rAF-throttled controller measures cached section offsets and writes scroll variables only to the actual affected nodes. No continuous React scroll updates. No new animation dependency.

| Element | Enter | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
|---|---|---|---|---|---|
| Header / menu | logo settles, links stagger | compact data-scrolled after 48px; progress rail | sliding active link indicator, visible focus | menu icon morph; native dialog focus containment and Escape | anchored navigation closes dialog |
| Hero | two line masks, lead and CTA stagger, image wipe | image shifts at most 28px; receipt settles | CTA fill wipe, arrow moves | scale .97 | panorama hands off to matcha field |
| Reveal | rise, mask, wipe, scale or rule draw | observer marks in once | child owns focus | no input blocking | unobserve after entry |
| Buttons | follow parent hierarchy | native anchors | fill wipe and restrained magnetic pull on fine pointers | .97 press, reversible release | retain actual anchor action |
| Allocation intro | mask and label slide | normal flow; account connector draws with scroll | in-page focus | demo controls always available | next section overlaps stage edge |
| Plan controls | small scale cascade | stage path draws with section progress | native focus and selected indicator | direct radio/range updates with bounded values | selection persists to signup |
| Balance outputs | draw tracks, values settle | path progress controlled by section | accessible text equivalent | animated output and transfer dot; interruption retargets | goal receipt becomes journal cue |
| Journal | alternating image wipes and caption rises | image parallax capped at 18px on desktop | images scale slightly; links underline | choose story updates planner query | open spacing yields to plum theater |
| Product theater | phone clip wipe and facts cascade | small phone rise in one shared scroll controller | CTA arrow and receipt lift | direct jump to signup | flat dark field carries into quote |
| Customer stories | large quote mask and rule draw | normal flow, no pinning | selector underline and focus | interruptible short crossfade and meaningful live region | stable reserved quote height |
| FAQ | rule draw and grouped rise | normal document flow | focused summary indicator | details expansion; plus rotates | keeps question focus and anchor access |
| Signup | centered copy mask and form rise | normal flow | floating label / focus border | validation shake, preparing state, confirmation receipt | reset restores email focus |
| Footer / legal | wordmark rise and rule draw | normal flow | drawn links | native dialog with close / Escape | restored trigger focus |

Reduced motion: all final content visible, immediate planner values, no parallax, no magnetic pull, no decorative loops. No JavaScript: full content and balanced example visible; signup has a clear local-demo note, menu and legal links retain accessible fallbacks. Hover never carries essential information. Ambient receipt float is paused by visibility observer, hidden document and a user pause toggle.

## Signature details
The guava goal dot, receipt notches, generous number spacing, small section indexes, and softly arched photographic crops recur without copying any reference composition.

## Do / Don't
Use original photography and truthful demo labels. Keep the original section ordering. Do not claim real customers, banking licenses, returns, app-store availability, or actual payment processing. All forms are local demonstrations and send no requests. Do not add stock company logos or nonfunctional app-store badges.

## Files
brand/Logo.tsx, sections/*, allocator/model.ts and tests, allocator/BalanceStudio.tsx, motion/math.ts and tests, motion/Runtime.tsx, motion/Reveal.tsx, motion/Button.tsx, forms/validation.ts and tests, forms/Signup.tsx, content/data.ts, assets.tsx and generated manifest, layout.tsx, pello.css, icon.svg, opengraph-image.tsx, DESIGN.md and PROMPT.md.

## Imagery
Five original production images: life-panorama, hero-phone-plum, everyday-market, rainy-morning, weekend-cove. Prompts and usage are documented in docs/image-prompts/pello.md. Raw files in assets/incoming/pello; responsive 800/1600 AVIF and WebP in public/templates/pello. Only the panorama is eager / high priority.


## Verification and motion audit
The focused improve-animations audit found two runtime defects: SSR-safe reduced motion initialization prematurely completed reveals, and a CSS duration serialized as seconds was interpreted as milliseconds. Both were fixed with regressions. Transfers now belong to committed plan changes, retarget when interrupted and cancel on unmount or reduced motion. Range changes use CSS track transitions and currency-aware aria-valuetext rather than multiple live-region announcements. Navigation uses one sliding indicator; pointer writes use requestAnimationFrame.
