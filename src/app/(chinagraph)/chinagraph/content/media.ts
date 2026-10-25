/**
 * Every generated still the page uses: drop files with these names (any of png/jpg/webp) into
 * assets/incoming/chinagraph/, run `npm run images -- chinagraph`, and the placeholders turn into photographs.
 * Prompts: docs/image-prompts/chinagraph.md.
 */
export const IMAGE_KEYS = [
  ...Array.from({ length: 12 }, (_, i) => `roll-${String(i + 1).padStart(2, "0")}`), // 1:1, the contact sheet + the six looks
  ...Array.from({ length: 6 }, (_, i) => `detail-${String(i + 1).padStart(2, "0")}`), // 4:5, a close crop per look
  ...Array.from({ length: 4 }, (_, i) => `cloth-${String(i + 1).padStart(2, "0")}`), // 4:5, fabric macros
  ...Array.from({ length: 6 }, (_, i) => `flat-${String(i + 1).padStart(2, "0")}`), // 4:5, flat lays for the shop
];
