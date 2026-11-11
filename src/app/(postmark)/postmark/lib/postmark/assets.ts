export const POSTMARK_ASSETS = {
  /** Production clean hero composition: phone + paper collage over warm negative space */
  heroClean: '/templates/postmark/postmark/02-hero-postmark-clean.webp',
  /** Production 4:5 postcard builder interface phone amidst photo/postcard collage */
  postcardBuilder: '/templates/postmark/postmark/03-feature-postcard-builder.webp',
  /** Production 4:5 memory map/journal phone with layered travel memories */
  memoryMap: '/templates/postmark/postmark/04-feature-memory-map.webp',
  /** Opaque flat ephemera sheet: tickets, maps, postcard, photoprint snippets */
  ephemeraCollage: '/templates/postmark/postmark/05a-ephemera-collage.webp',
  /** Opaque flat ephemera sheet: stamps, labels, tickets, postal marks */
  ephemeraStampSheet: '/templates/postmark/postmark/05b-ephemera-stamp-sheet.webp',
} as const;

export type PostmarkAssetKey = keyof typeof POSTMARK_ASSETS;
