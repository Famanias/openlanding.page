export const SCENE_WIDTH = 1600;
export const SCENE_HEIGHT = 900;

export type DepthLayerId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface DepthLayerSpec {
  id: DepthLayerId;
  name: string;
  parallaxX: number; // Max pixel shift at full pointer deflection
  parallaxY: number;
  baseShadowScale: number;
}

/**
 * 8-layer 2.5D depth hierarchy matching the Kirigami pop-up book architecture.
 * Values are calibrated so layers stay well inside the overscanned viewport
 * and never expose blank margins during pointer parallax.
 */
export const DEPTH_LAYERS: Record<DepthLayerId, DepthLayerSpec> = {
  0: { id: 0, name: 'Background Paper', parallaxX: 2, parallaxY: 1, baseShadowScale: 0.2 },
  1: { id: 1, name: 'Celestial & Far Clouds', parallaxX: 6, parallaxY: 4, baseShadowScale: 0.5 },
  2: { id: 2, name: 'Distant Mountains', parallaxX: 11, parallaxY: 6, baseShadowScale: 0.7 },
  3: { id: 3, name: 'Mid Mountains & Valley', parallaxX: 17, parallaxY: 9, baseShadowScale: 0.85 },
  4: { id: 4, name: 'River, Village & Terraces', parallaxX: 23, parallaxY: 12, baseShadowScale: 1.0 },
  5: { id: 5, name: 'Nearby Vegetation', parallaxX: 30, parallaxY: 15, baseShadowScale: 1.1 },
  6: { id: 6, name: 'Foreground Cliffs & Flora', parallaxX: 40, parallaxY: 19, baseShadowScale: 1.25 },
  7: { id: 7, name: 'Cherry Blossoms & Framing', parallaxX: 52, parallaxY: 24, baseShadowScale: 1.35 },
};

export interface BlossomAnchor {
  x: number;
  y: number;
  cluster: 'upper-right' | 'mid-left' | 'lower-right';
  scale: number;
}

/**
 * Coordinates of real sakura flower clusters in the 1600x900 reference system.
 * Falling petals spawn exclusively from these anchor coordinates.
 */
export const BLOSSOM_SPAWN_ANCHORS: BlossomAnchor[] = [
  // Upper-right sweeping bough
  { x: 1260, y: 120, cluster: 'upper-right', scale: 0.9 },
  { x: 1350, y: 170, cluster: 'upper-right', scale: 1.0 },
  { x: 1435, y: 115, cluster: 'upper-right', scale: 1.05 },
  { x: 1490, y: 205, cluster: 'upper-right', scale: 1.1 },
  { x: 1320, y: 275, cluster: 'upper-right', scale: 0.95 },
  { x: 1245, y: 235, cluster: 'upper-right', scale: 0.85 },
  { x: 1535, y: 145, cluster: 'upper-right', scale: 1.0 },
  // Mid-left arching bough
  { x: 115, y: 265, cluster: 'mid-left', scale: 0.95 },
  { x: 185, y: 295, cluster: 'mid-left', scale: 1.0 },
  { x: 260, y: 278, cluster: 'mid-left', scale: 0.85 },
  { x: 320, y: 295, cluster: 'mid-left', scale: 0.8 },
  { x: 240, y: 345, cluster: 'mid-left', scale: 0.9 },
  // Lower-right foreground bough
  { x: 1350, y: 715, cluster: 'lower-right', scale: 1.1 },
  { x: 1430, y: 675, cluster: 'lower-right', scale: 1.15 },
  { x: 1505, y: 735, cluster: 'lower-right', scale: 1.05 },
];

export type ViewportCategory = 'desktop' | 'tablet' | 'mobile';

export interface CameraFrame {
  category: ViewportCategory;
  viewBox: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Computes a responsive SVG viewBox framing strategy:
 * - Desktop (aspect >= 1.35): Full 16:9 composition (0 0 1600 900)
 * - Tablet (0.85 <= aspect < 1.35): Moderate balanced crop keeping sun, river, village & trees
 * - Mobile (aspect < 0.85): Focused vertical window centered around x=865 to showcase
 *   the sun, mountain peaks, winding turquoise river, torii, village houses, and foreground rocks/blossoms.
 */
export function computeResponsiveViewBox(
  viewportWidth: number,
  viewportHeight: number
): CameraFrame {
  const safeW = Math.max(1, viewportWidth);
  const safeH = Math.max(1, viewportHeight);
  const aspect = safeW / safeH;

  if (aspect >= 1.35) {
    return {
      category: 'desktop',
      x: 0,
      y: 0,
      width: SCENE_WIDTH,
      height: SCENE_HEIGHT,
      viewBox: `0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`,
    };
  }

  if (aspect >= 0.85) {
    // Tablet: keep full height, crop edges slightly biased toward the village/river
    const width = Math.min(SCENE_WIDTH, Math.round(SCENE_HEIGHT * Math.max(aspect, 1.05)));
    const focusCenterX = 835;
    const x = Math.max(0, Math.min(SCENE_WIDTH - width, Math.round(focusCenterX - width / 2)));
    return {
      category: 'tablet',
      x,
      y: 0,
      width,
      height: SCENE_HEIGHT,
      viewBox: `${x} 0 ${width} ${SCENE_HEIGHT}`,
    };
  }

  // Mobile portrait: dedicated framing centered on river + sun + village + foreground flora
  const targetHeight = SCENE_HEIGHT;
  const clampedAspect = Math.max(0.46, Math.min(aspect, 0.84));
  const width = Math.round(targetHeight * clampedAspect);
  // Shift focus slightly right (x=885) so the sun, river S-curve, torii, main houses, and blossoms all sit harmoniously
  const focusCenterX = 885;
  const x = Math.max(0, Math.min(SCENE_WIDTH - width, Math.round(focusCenterX - width / 2)));
  return {
    category: 'mobile',
    x,
    y: 0,
    width,
    height: targetHeight,
    viewBox: `${x} 0 ${width} ${targetHeight}`,
  };
}

/**
 * Clamps normalized pointer offsets to [-1, 1] and computes layer translation
 * ensuring no viewport gaps appear even at maximum strength.
 */
export function computeLayerParallaxOffset(
  layerId: DepthLayerId,
  normX: number,
  normY: number,
  strength: number
): { tx: number; ty: number } {
  const spec = DEPTH_LAYERS[layerId];
  const cx = Math.max(-1, Math.min(1, normX));
  const cy = Math.max(-1, Math.min(1, normY));
  const clampedStrength = Math.max(0, Math.min(2, strength));

  // Subtle horizontal & vertical shift capped safely within the 4% stage overscan
  const tx = Number((cx * spec.parallaxX * clampedStrength).toFixed(2));
  const ty = Number((cy * spec.parallaxY * clampedStrength).toFixed(2));
  return { tx, ty };
}
