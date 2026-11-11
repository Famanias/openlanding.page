# MESA MARKET — Good things come into season

Build an isolated Next.js 16 / React 19 / TypeScript farm-to-door grocery landing page at `/templates/mesamarket`. MESA MARKET is fictional: every piece of produce, farm origin, price, recipe kit, and order receipt is an illustrative demonstration. No real purchase is completed and no payment data is collected.

## Creative Direction
Modern produce poster meets market signage. Use vibrant tomato `#D94C32`, fresh leaf green `#3F7047`, golden butter `#F2C94D`, warm cream `#FDF5E7`, blueberry `#494D78`, and crisp ink `#24211D`. Use Fraunces for oversized expressive display type, Outfit for friendly editorial body text, and Space Mono for market labels, prices, and receipt line items. Incorporate bold ink borders, solid offset shadows, and sticker badges.

## Page Architecture
1. **Market Signage Header:** Fixed/sticky navigation with brand mark, anchor jumps to all key sections, and a live basket summary button.
2. **Flat-Lay Market Stall Hero:** Floating produce stickers arranged like a curated storefront window, with headline **“Good things come into season.”** wrapping through the negative spaces. Includes a left-hand harvest category rail and primary CTA **“Fill your basket”**.
3. **Interactive Produce Shelf:** Live category filters (All / Vegetables / Fruit / Pantry) that reorder and filter eight produce products (Early Girl tomatoes, Nantes carrots, Meyer lemons, Lacinato kale, Jimmy Nardello peppers, Rosa Bianca eggplant, Sebastopol apples, Red Fife sourdough). Each card features sample price, origin details, seasonal notes, and interactive increment/decrement crate controls.
4. **Seasonal Recipe Crates:** Three seasonal recipe meal kits that add all required ingredients to the crate atomically in a single tap, accompanied by warm editorial kitchen photography.
5. **Producer Story & Delivery Loop:** Comic-style label strips detailing field harvest, packing shed, and electric van routes, paired with a smallholder grower portrait and an illustrated inline SVG delivery map.
6. **Sample Checkout / Grocery Receipt:** An itemized grocery receipt reflecting the live crate items, line totals, illustrative subtotal, and demonstration notice, alongside harvest table photography.
7. **Grocery-Receipt Footer:** Clear disclosure notice, brand credits, and quick jump back to top.
8. **Floating Basket Pill & Drawer:** Persistent bottom-right crate counter opening a full-featured accessible drawer dialog with keyboard navigation (Esc to close), line item quantity adjustments, clear crate action, and direct jump to the receipt review.

## Interactivity & Motion
- Produce discs rotate slightly (-3.5deg) and scale on hover/focus.
- Adding items triggers non-blocking scale feedback and announces updates via an accessible polite live region.
- All interactions work seamlessly across desktop, touch viewports, and under `prefers-reduced-motion: reduce`.
