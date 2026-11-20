export type PlaybackSpeed = 0.5 | 1 | 2 | 4;

export type PlaybackMode = 'auto' | 'scroll';

export type InkType = 'burgundy' | 'roseWash' | 'charcoal' | 'archivalGray';

export type FlowerPaletteId =
  | 'charcoalRose'
  | 'dustyPeony'
  | 'burgundyRose'
  | 'sepiaRose'
  | 'cuppedDustyRose'
  | 'obsidianRose'
  | 'wildBurgundy'
  | 'driedAnemone'
  | 'darkSilhouetteFlower'
  | 'sepiaTinyBlossom';

export type AnimationPhaseId =
  | 'phase-01'
  | 'phase-02'
  | 'phase-03'
  | 'phase-04'
  | 'phase-05'
  | 'phase-06'
  | 'phase-07'
  | 'phase-08';

export interface AnimationPhaseInfo {
  id: AnimationPhaseId;
  number: string;
  name: string;
  startSec: number;
  endSec: number;
  description: string;
}

export interface Point2D {
  x: number;
  y: number;
}

export interface CubicBezierSegment {
  p0: Point2D;
  p1: Point2D;
  p2: Point2D;
  p3: Point2D;
}

export interface StemSpec {
  id: string;
  parentId?: string;
  /** Progress along parent stem (0..1) where this branch originates */
  attachT?: number;
  points: Point2D[]; // 4 points for cubic bezier or polyline of 2-5 control points
  widthStart: number;
  widthEnd: number;
  color: string;
  highlightColor?: string;
  startSec: number;
  durationSec: number;
  layer: 'back' | 'mid' | 'front';
  kind: 'stem' | 'woodyBranch' | 'root' | 'twig' | 'umbelRay';
  depthParallax: number;
  seed: number;
}

export interface UmbelSpec {
  id: string;
  anchor: Point2D;
  radius: number;
  rayCount: number;
  startSec: number;
  durationSec: number;
  tiltAngle: number;
  seed: number;
  layer: 'back' | 'mid';
  depthParallax: number;
}

export interface LeafSpec {
  id: string;
  anchor: Point2D;
  angle: number;
  length: number;
  width: number;
  color: string;
  veinColor: string;
  edgeColor: string;
  startSec: number;
  durationSec: number;
  layer: 'back' | 'mid' | 'front';
  style: 'sage' | 'charcoal' | 'dried' | 'serrated';
  depthParallax: number;
  seed: number;
}

export interface FlowerSpec {
  id: string;
  name: string;
  /** Exact stem tip coordinates in 1920x1080 space; flower stays anchored here */
  anchor: Point2D;
  /** Stem incoming angle in radians (points from stem toward bloom) */
  stemAngle: number;
  palette: FlowerPaletteId;
  /** Visual style / petal arrangement */
  species:
    | 'ruffledPeony'
    | 'openRose'
    | 'spiralRose'
    | 'cuppedRose'
    | 'wildThistle'
    | 'wildAnemone'
    | 'tinyWildflower';
  /** Base scale radius in virtual 1920x1080 pixels */
  radius: number;
  /** Growth start time for bud formation (seconds) */
  budStartSec: number;
  /** Duration of bud expansion before main bloom opens */
  budDurationSec: number;
  /** Start time of petal unfolding sequence (seconds) */
  bloomStartSec: number;
  /** Duration of full petal unfolding (seconds) */
  bloomDurationSec: number;
  /** Final openness 0.55..1.05 */
  maxOpenness: number;
  /** Stagger factor across outer -> inner tiers */
  petalStagger: number;
  /** Resting orientation angle in radians */
  bloomRotation: number;
  /** Subtle perspective tilt for 2.5D depth (0 = flat top-down, 0.55 = side-cupped) */
  tilt: number;
  /** Deterministic organic irregularity 0..1 */
  irregularity: number;
  layer: 'back' | 'mid' | 'front';
  depthParallax: number;
  seed: number;
  /** Ambient sway phase offset */
  swayPhase: number;
  /** Whether this flower receives subtle hover interaction */
  interactive?: boolean;
}

export interface InkStainSpec {
  id: string;
  origin: Point2D;
  radiusX: number;
  radiusY: number;
  rotation: number;
  inkType: InkType;
  startSec: number;
  durationSec: number;
  opacity: number;
  seed: number;
  /** Higher values concentrate pigment strongly along caustic rim */
  rimStrength: number;
  /** Layer ordering: back stains bleed beneath collage, mid/front layer over edges */
  layer: 'paper' | 'back' | 'front';
  /** Number of elongated tendrils / organic lobes */
  lobes: number;
}

export interface BrushstrokeSpec {
  id: string;
  start: Point2D;
  control: Point2D;
  end: Point2D;
  width: number;
  bristles: number;
  color: string;
  opacity: number;
  startSec: number;
  durationSec: number;
  seed: number;
  layer: 'back' | 'front';
}

export interface SplatterClusterSpec {
  id: string;
  origin: Point2D;
  spreadRadius: number;
  dropletCount: number;
  color: string;
  opacity: number;
  startSec: number;
  durationSec: number;
  biasAngle: number;
  biasStrength: number;
  seed: number;
  layer: 'back' | 'front';
}

export interface PaperScrapSpec {
  id: string;
  center: Point2D;
  width: number;
  height: number;
  rotation: number;
  startSec: number;
  durationSec: number;
  slideOffset: Point2D;
  motif: 'foliageEngraving' | 'herbSprig' | 'blankAged' | 'peonyBacking';
  layer: 'back' | 'mid';
  depthParallax: number;
  seed: number;
}

export interface EngravedFlowerSpec {
  id: string;
  center: Point2D;
  radius: number;
  rotation: number;
  startSec: number;
  durationSec: number;
  depthParallax: number;
  seed: number;
}

export interface DeveloperSettings {
  isPlaying: boolean;
  loop: boolean;
  speed: PlaybackSpeed;
  mode: PlaybackMode;
  ambientMotion: boolean;
  pointerParallax: boolean;
  inkDiffusion: boolean;
  flowerGrowth: boolean;
  paperTexture: boolean;
  panelOpen: boolean;
  panelHidden: boolean;
}

export interface ViewportTransform {
  scale: number;
  offsetX: number;
  offsetY: number;
  isMobile: boolean;
  virtualWidth: number;
  virtualHeight: number;
}

export interface PointerState {
  /** Normalized -1..1 relative to viewport center */
  nx: number;
  ny: number;
  /** Current position in virtual 1920x1080 art coordinates */
  artX: number;
  artY: number;
  active: boolean;
}

export interface TimelineSnapshot {
  /** Current timestamp in seconds [0, 18] */
  timeSec: number;
  /** Normalized progress [0, 1] */
  progress: number;
  /** Current active phase metadata */
  phase: AnimationPhaseInfo;
  /** 0..1 reveal for Phase 01 paper aging stains & creases */
  paperAging: number;
  /** 0..1 settling factor at 17..18s */
  settleFactor: number;
  /** 0..1 ambient motion blend (fades in smoothly after 16.8s) */
  ambientWeight: number;
  /** Loop dissolve factor: 1 = fully visible, 0 = dissolved back to blank paper */
  visibilityEnvelope: number;
  /** Continuous elapsed time in seconds for gentle ambient oscillation */
  ambientClockSec: number;
}
