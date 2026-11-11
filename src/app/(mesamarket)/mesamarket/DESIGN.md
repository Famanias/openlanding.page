# MESA MARKET — design

## Requirements
An isolated Next.js 16 / React 19 farm-to-door grocery landing page. All produce pricing, origins, crate totals, and receipts are illustrative demonstrations. No real order is placed and no payment details are collected.

## Concept
Modern produce poster meets vibrant market signage. Rather than a generic e-commerce grid, the entire hero is a flat-lay market stall with fresh produce cutouts wrapping the headline: **“Good things come into season.”** Visitors filter the interactive shelf, add individual produce or full seasonal recipe crates, and review their live crate on a printed grocery receipt.

## Palette
Tomato `#D94C32` (brand primary & key CTA), leaf green `#3F7047` (freshness & basket counter), butter `#F2C94D` (price stickers & highlight panels), cream `#FDF5E7` (warm paper background), blueberry `#494D78` (route & diagram accent), ink `#24211D` (heavy borders, shadows & text).

## Type
Fraunces for oversized poster display headlines, Outfit for clean warm body text, and Space Mono for market labels, prices, crate counts, and receipt data.

## Layout
1. Sticky market signage header with anchor navigation and live crate total.
2. Flat-lay market stall hero with a compact 3-column category rail and a 9-column window display with 8 framed harvest stickers wrapping the headline.
3. Interactive harvest shelf with 4 category filter tabs (All, Vegetables, Fruit, Pantry), sample prices, origin tags, and quantity controls.
4. Seasonal recipe crate explorer with editorial kitchen photography and 1-tap multi-item ingredient bundle adding.
5. Grower story comic strip (06:30 Field Harvest, 14:00 Packing Shed, 09:30 Electric Van) with grower portrait and inline SVG delivery loop diagram.
6. Sample order review featuring a printed grocery receipt card and market table photography.
7. Grocery-receipt footer.
8. Persistent bottom-right floating basket pill and full-featured accessible slide-over basket drawer.

## Shelf & Basket Mechanics
- Pure functional reducer managing produce items: `ADD`, `DECREMENT`, `REMOVE`, `CLEAR`, `ADD_KIT`.
- Maximum quantity caps per item with disabled button states.
- Atomic additions for 3 seasonal recipe crates.
- Live accessible status announcements (`aria-live="polite"`).
- Keyboard-accessible drawer with Escape key listener, focus trapping, and focus restoration to the basket pill.

## Motion
Tactile, organic, and playful. Produce stickers settle and tilt gently (-3.5deg) on pointer hover and focus. Button clicks trigger responsive scale feedback. All continuous motion respects `prefers-reduced-motion`.

## Signature details
Circular produce discs with ink borders and offset retro drop shadows, dashed receipt rules, comic-book timing strips, and illustrated SVG delivery map.

## Do / Don't
- DO treat the produce as graphic elements integrated into the poster layout.
- DO clearly disclose all prices, crates, and orders as illustrative demonstrations.
- DON'T create generic SaaS bento grids or e-commerce white cards.
- DON'T simulate fake credit card checkout or false delivery guarantees.

## Files
- `layout.tsx`: Root layout with Fraunces, Outfit, Space Mono fonts.
- `page.tsx`: Server page rendering MesaMarketApp.
- `MesaMarketApp.tsx`: Client coordinator with basket reducer state.
- `mesamarket.css`: Theme tokens, scoped typography, and interactive utilities.
- `basket/model.ts` & `basket/model.test.ts`: Pure basket domain logic and comprehensive Vitest suite.
- `sections/*`: Modular sections (Header, HeroStall, ProduceShelf, MealKits, ProducerRoute, ReceiptSection, Footer, BasketPill, BasketDrawer, SafeImage).
- `brand/Logo.tsx`, `icon.svg`, `opengraph-image.tsx`: Brand identity assets.
