/**
 * The shared clip sheet. Every card reads its own tile of ONE 16:9 video laid out as a 5×2 grid (see
 * docs/image-prompts/satsuma.md), so it downloads once. Drop the encoded file into
 * public/templates/satsuma/clips/ and point REEL_CLIP at it; until then each card plays its drawn scene.
 */
export type ReelClip = {
  /** Desktop/tablet clip, e.g. "/templates/satsuma/clips/reels.mp4". */
  src: string;
  /** 720p variant for phones. Falls back to `src`. */
  srcMobile?: string;
  /** Still of the sheet, shown until the first frame is ready. */
  poster?: string;
};

export const REEL_CLIP: ReelClip | null = null;
