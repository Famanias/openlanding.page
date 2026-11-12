import { HeroCompositionId, MaterialFinishId, TileRotation } from './tesseraSystem';

export type ModuleFamilyId =
  | 's-ribbon'
  | 'convex'
  | 'concave'
  | 'fluted-v'
  | 'fluted-h'
  | 'folded'
  | 'crescent'
  | 'recess'
  | 'slit';

export type HeroMaterialModeId = 'ivory-plaster' | 'charcoal-felt' | 'pale-oak';

export type TileQuarterTurns = 0 | 1 | 2 | 3;

export type TileSurfaceRole = 'primary' | 'felt-accent' | 'oak-accent' | 'warm-stone';

export interface HeroMaterialModeSpec {
  id: HeroMaterialModeId;
  code: string;
  label: string;
  shortLabel: string;
  linkedConfiguratorMaterial: MaterialFinishId;
  description: string;
}

export interface ResonanceTileSpec {
  id: string; // e.g. "r02-c05"
  displayCode: string; // e.g. "03·06" (1-based row·col)
  row: number;
  col: number;
  family: ModuleFamilyId;
  familyLabel: string;
  surfaceRole: TileSurfaceRole;
  hasBrassPin: boolean;
  sCurveProximity: number; // 0..1 (1 = directly on the primary S-curve)
  entranceDelayOrder: number; // 0..1 travel order along the resonance path
}

export type PresetRotationMap = Record<HeroCompositionId, Record<string, TileQuarterTurns>>;

export const RESONANCE_COLS = 11;
export const RESONANCE_ROWS = 6;
export const RESONANCE_TILE_PITCH = 0.92;
export const RESONANCE_TILE_SIZE = 0.908; // Crisp 12mm hairline architectural shadow joint

export const HERO_MATERIAL_MODES: HeroMaterialModeSpec[] = [
  {
    id: 'ivory-plaster',
    code: '01',
    label: '01 IVORY PLASTER',
    shortLabel: 'Ivory Plaster',
    linkedConfiguratorMaterial: 'raw-limestone',
    description: 'Hand-cast sintered mineral plaster with charcoal felt and pale oak acoustic reveals.',
  },
  {
    id: 'charcoal-felt',
    code: '02',
    label: '02 CHARCOAL FELT',
    shortLabel: 'Charcoal Felt',
    linkedConfiguratorMaterial: 'charcoal-felt',
    description: 'Deep graphite merino-PET acoustic felt array with mineral and timber counterpoints.',
  },
  {
    id: 'pale-oak',
    code: '03',
    label: '03 PALE OAK',
    shortLabel: 'Pale Oak',
    linkedConfiguratorMaterial: 'smoked-walnut',
    description: 'Quarter-sawn longitudinal European pale oak ribs paired with dark felt absorption chambers.',
  },
];

export const FAMILY_LABELS: Record<ModuleFamilyId, string> = {
  's-ribbon': 'Harmonic S-Curve Ribbon',
  convex: 'Convex Acoustic Cushion',
  concave: 'Concave Phase Bowl',
  'fluted-v': 'Vertical Fluted Resonator',
  'fluted-h': 'Horizontal Fluted Baffle',
  folded: 'Folded Crease Diffuser',
  crescent: 'Crescent Arc Relief',
  recess: 'Stepped Felt Cavity',
  slit: 'Layered Oak & Felt Aperture',
};

export function createInitialPresetRotationMap(): PresetRotationMap {
  return {
    wave: {},
    vault: {},
    aperture: {},
    tectonic: {},
  };
}

export function formatTileId(row: number, col: number): string {
  return `r${String(row).padStart(2, '0')}-c${String(col).padStart(2, '0')}`;
}

export function formatTileDisplayCode(row: number, col: number): string {
  return `${String(row + 1).padStart(2, '0')}·${String(col + 1).padStart(2, '0')}`;
}

/**
 * Evaluates the master S-curve centerline y(x) and slope dy/dx in normalized wall space:
 * u in [-1, 1] (left to right), v in [-1, 1] (bottom to top).
 * Matches 01_APPROVED_RESONANCE_WALL_HERO.png:
 * Enters at mid-left (u=-1, v=-0.02), sweeps down to a deep trough at lower-center (u=-0.08, v=-0.56),
 * and rises in a bold sweeping arc to upper-right (u=+0.85, v=+0.78).
 */
export function evaluateSCurveCenterline(u: number): { v: number; dvdu: number } {
  const dip = -0.58 * Math.exp(-Math.pow((u + 0.12) / 0.38, 2));
  const rise = 0.86 / (1 + Math.exp(-4.8 * (u - 0.22))) - 0.18;
  const leftArch = 0.18 * Math.exp(-Math.pow((u + 0.72) / 0.32, 2));
  const v = dip + rise + leftArch;

  const eps = 0.002;
  const u1 = u + eps;
  const dip1 = -0.58 * Math.exp(-Math.pow((u1 + 0.12) / 0.38, 2));
  const rise1 = 0.86 / (1 + Math.exp(-4.8 * (u1 - 0.22))) - 0.18;
  const leftArch1 = 0.18 * Math.exp(-Math.pow((u1 + 0.72) / 0.32, 2));
  const dvdu = (dip1 + rise1 + leftArch1 - v) / eps;

  return { v, dvdu };
}

/**
 * Computes global S-curve signed perpendicular distance and multi-ridge displacement
 * at any normalized wall coordinate (u, v) in [-1, 1] x [-1, 1].
 * Adjacent tiles at 0° align seamlessly across panel seams to form one continuous sculptural S-ribbon.
 */
export function sampleGlobalSCurveRelief(
  u: number,
  v: number,
  phaseShift = 0,
): {
  perpDist: number;
  proximity: number;
  displacement: number;
  grooves: number;
} {
  const { v: curveV, dvdu } = evaluateSCurveCenterline(u);
  const deltaV = v - curveV;
  const normFactor = 1 / Math.hypot(1, dvdu * 0.56);
  const perpDist = deltaV * normFactor;

  const ribbonHalfWidth = 0.34;
  const absDist = Math.abs(perpDist);
  if (absDist >= ribbonHalfWidth) {
    return { perpDist, proximity: 0, displacement: 0, grooves: 0 };
  }

  const normalized = absDist / ribbonHalfWidth; // 0..1
  const envelope = Math.pow(Math.cos(normalized * Math.PI * 0.5), 1.45);
  // 4 crisp terraced architectural ribs along the S-curve ribbon
  const fluteWave = Math.cos(perpDist * 54 + phaseShift);
  const sharpenedWave = Math.sign(fluteWave) * Math.pow(Math.abs(fluteWave), 0.58);
  const primarySwell = envelope * 0.15;
  const carvedChannels = envelope * sharpenedWave * 0.095;

  return {
    perpDist,
    proximity: envelope,
    displacement: primarySwell + carvedChannels,
    grooves: (sharpenedWave * 0.5 + 0.5) * envelope,
  };
}

/**
 * Deterministically assigns each tile in the 11x6 wall to one of the 8+ sculptural families
 * and surface roles, closely matching the curated rhythm of 01_APPROVED_RESONANCE_WALL_HERO.png.
 */
export function buildResonanceWallCatalog(
  cols = RESONANCE_COLS,
  rows = RESONANCE_ROWS,
): ResonanceTileSpec[] {
  const specs: ResonanceTileSpec[] = [];

  // Curated dark charcoal felt accent positions (row, col) where row 0 is bottom, row 5 is top
  const feltPositions = new Set([
    '0-2', '0-6', '0-9',
    '1-1', '1-8',
    '2-3', '2-7', '2-9',
    '3-1', '3-3', '3-8',
    '4-2', '4-6', '4-9',
    '5-2', '5-6',
  ]);

  // Curated pale oak accent positions
  const oakPositions = new Set([
    '0-7', '1-7', '1-10',
    '2-8', '2-10',
    '4-4', '4-10',
    '5-4',
  ]);

  const warmStonePositions = new Set([
    '0-3', '0-8', '1-0', '2-1', '3-0', '4-1', '5-3', '5-7', '5-8',
  ]);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const id = formatTileId(row, col);
      const displayCode = formatTileDisplayCode(row, col);
      const u = cols > 1 ? (col / (cols - 1)) * 2 - 1 : 0;
      const v = rows > 1 ? (row / (rows - 1)) * 2 - 1 : 0;

      const sCurve = sampleGlobalSCurveRelief(u, v);
      const key = `${row}-${col}`;

      let surfaceRole: TileSurfaceRole = 'primary';
      let family: ModuleFamilyId;

      if (sCurve.proximity > 0.14) {
        // Tiles along the primary S-curve stay Ivory Mineral Plaster so the multi-panel S-ribbon is continuous
        surfaceRole = 'primary';
        family = 's-ribbon';
      } else if (feltPositions.has(key)) {
        surfaceRole = 'felt-accent';
        const mod = (row + col) % 3;
        family = mod === 0 ? 'concave' : mod === 1 ? 'convex' : 'recess';
      } else if (oakPositions.has(key)) {
        surfaceRole = 'oak-accent';
        family = (row + col) % 2 === 0 ? 'slit' : 'crescent';
      } else {
        if (warmStonePositions.has(key)) {
          surfaceRole = 'warm-stone';
        }
        const patternSelect = (col * 3 + row * 5) % 6;
        if (patternSelect === 0) family = 'fluted-v';
        else if (patternSelect === 1) family = 'fluted-h';
        else if (patternSelect === 2) family = 'convex';
        else if (patternSelect === 3) family = 'concave';
        else if (patternSelect === 4) family = 'folded';
        else family = 'crescent';
      }

      const hasBrassPin =
        sCurve.proximity > 0.36 ||
        surfaceRole === 'felt-accent' ||
        (row + col) % 5 === 0;

      // Wave travel order along the S-curve path from lower-left to upper-right
      const pathProgress = (u + 1) * 0.35 + (v + 1) * 0.15 + (1 - sCurve.proximity) * 0.25;
      const entranceDelayOrder = Number(Math.max(0, Math.min(1, pathProgress)).toFixed(3));

      specs.push({
        id,
        displayCode,
        row,
        col,
        family,
        familyLabel: FAMILY_LABELS[family],
        surfaceRole,
        hasBrassPin,
        sCurveProximity: Number(sCurve.proximity.toFixed(3)),
        entranceDelayOrder,
      });
    }
  }

  return specs;
}

/**
 * Pure helper to rotate a tile's quarter-turn state clockwise (+1) or counter-clockwise (-1).
 */
export function rotateTileQuarterTurns(
  current: TileQuarterTurns,
  deltaQuarterTurns: 1 | -1 = 1,
): TileQuarterTurns {
  const next = (((current + deltaQuarterTurns) % 4) + 4) % 4;
  return next as TileQuarterTurns;
}

export function quarterTurnsToDegrees(turns: TileQuarterTurns): TileRotation {
  return ((turns * 90) % 360) as TileRotation;
}

/**
 * Snaps an arbitrary drag angle in radians to the nearest 90° quarter-turn state (0, 1, 2, 3).
 * Note: Clockwise rotation viewed from front corresponds to negative Z angle in right-handed Three.js space,
 * so we pass clockwise-positive radians into this helper.
 */
export function snapClockwiseAngleToQuarterTurns(clockwiseRadians: number): TileQuarterTurns {
  const quarterStep = Math.PI * 0.5;
  const rawSteps = Math.round(clockwiseRadians / quarterStep);
  const mod = ((rawSteps % 4) + 4) % 4;
  return mod as TileQuarterTurns;
}

export function getTileQuarterTurns(
  store: PresetRotationMap,
  preset: HeroCompositionId,
  tileId: string,
): TileQuarterTurns {
  return store[preset]?.[tileId] ?? 0;
}

export function setTileQuarterTurnsInPreset(
  store: PresetRotationMap,
  preset: HeroCompositionId,
  tileId: string,
  turns: TileQuarterTurns,
): PresetRotationMap {
  const currentPresetMap = { ...(store[preset] ?? {}) };
  if (turns === 0) {
    delete currentPresetMap[tileId];
  } else {
    currentPresetMap[tileId] = turns;
  }
  return {
    ...store,
    [preset]: currentPresetMap,
  };
}

export function resetPresetRotations(
  store: PresetRotationMap,
  preset: HeroCompositionId,
): PresetRotationMap {
  return {
    ...store,
    [preset]: {},
  };
}

export interface PresetBaseTransform {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  presetRotZ: number;
  scaleZ: number;
}

/**
 * Computes the base structural transform for a tile in a given preset, scroll progress,
 * entrance wave progress, and subtle pointer pressure field.
 * User tile rotation is intentionally kept separate so it never gets overwritten.
 */
export function computeResonanceTileBaseTransform(
  spec: ResonanceTileSpec,
  cols: number,
  rows: number,
  preset: HeroCompositionId,
  pointerWallX: number, // normalized -1..1
  pointerWallY: number, // normalized -1..1
  pointerActive: boolean,
  scrollProgress: number, // 0..1
  entranceProgress: number, // 0..1 (1 = settled)
  elapsedSec: number,
): PresetBaseTransform {
  const centerX = (cols - 1) / 2;
  const centerY = (rows - 1) / 2;
  const nx = cols > 1 ? (spec.col - centerX) / centerX : 0; // -1..1
  const ny = rows > 1 ? (spec.row - centerY) / centerY : 0; // -1..1
  const radialDist = Math.hypot(nx, ny);

  const baseX = (spec.col - centerX) * RESONANCE_TILE_PITCH;
  const baseY = (spec.row - centerY) * RESONANCE_TILE_PITCH;

  let z = 0;
  let rotX = 0;
  let rotY = 0;
  let presetRotZ = 0;
  let scaleZ = 1;

  // Extremely subtle architectural breathing (sub-millimeter feel)
  const idleBreath = Math.sin(elapsedSec * 0.7 + spec.col * 0.4 + spec.row * 0.35) * 0.008;

  switch (preset) {
    case 'wave': {
      // Approved Resonance Wall S-curve relief: tiles stay orthogonal in grid so global S-curve connects seamlessly
      const sCurveOffset = spec.sCurveProximity * 0.085;
      const recessOffset =
        spec.surfaceRole === 'felt-accent'
          ? -0.055
          : spec.surfaceRole === 'oak-accent'
            ? -0.025
            : 0.015;
      z = sCurveOffset + recessOffset + idleBreath;
      rotX = 0;
      rotY = 0;
      presetRotZ = 0;
      scaleZ = 1 + spec.sCurveProximity * 0.18;
      break;
    }
    case 'vault': {
      // Parabolic architectural vault canting inward toward central axis
      const arch = 1 - Math.min(1, nx * nx * 0.92);
      z = arch * 0.34 - Math.abs(ny) * 0.09 + idleBreath;
      rotY = -nx * 0.28;
      rotX = ny * 0.14;
      presetRotZ = spec.col % 2 === 0 ? 0 : Math.PI;
      scaleZ = 0.92 + arch * 0.35;
      break;
    }
    case 'aperture': {
      // Radial acoustic lens around the central chamber focus
      const ring = Math.cos(radialDist * Math.PI * 1.25);
      z = ring * 0.22 + (1 - Math.min(1.2, radialDist)) * 0.18 + idleBreath;
      rotX = -ny * 0.22 * ring;
      rotY = nx * 0.22 * ring;
      const steps = Math.round(((Math.atan2(ny, nx) + Math.PI) / (Math.PI * 2)) * 4) % 4;
      presetRotZ = steps * (Math.PI * 0.5);
      scaleZ = 0.9 + Math.max(0, 1 - radialDist * 0.5) * 0.38;
      break;
    }
    case 'tectonic': {
      // Stepped orthogonal acoustic checker relief
      const checker = (spec.col + spec.row) % 2 === 0 ? 1 : -1;
      const band = ((spec.col * 3 + spec.row * 2) % 4) / 3;
      z = checker * 0.09 + band * 0.14 + idleBreath;
      rotX = checker * 0.08;
      rotY = -checker * 0.1;
      presetRotZ = ((spec.col + spec.row) % 4) * (Math.PI * 0.5);
      scaleZ = 0.88 + band * 0.35;
      break;
    }
  }

  // Entrance wave choreography along the global resonance path
  if (entranceProgress < 1) {
    const localStart = spec.entranceDelayOrder * 0.45;
    const localProgress = Math.max(
      0,
      Math.min(1, (entranceProgress - localStart) / Math.max(0.2, 1 - localStart)),
    );
    // Smooth cubic ease-out with subtle traveling wave crest
    const ease = 1 - Math.pow(1 - localProgress, 3);
    const waveCrest = Math.sin(localProgress * Math.PI) * 0.12 * (1 - localProgress);
    z = (z - 0.08 * (1 - ease)) + waveCrest;
    rotX += (1 - ease) * 0.12;
    rotY -= (1 - ease) * 0.1;
  }

  // Subtle low-frequency elastic pressure field under pointer (does not spin tiles or break picking)
  if (pointerActive) {
    const dx = nx - pointerWallX;
    const dy = ny - pointerWallY;
    const dist = Math.hypot(dx, dy);
    const falloff = Math.max(0, 1 - dist / 0.55);
    const smoothFalloff = falloff * falloff * (3 - 2 * falloff);
    z += smoothFalloff * 0.045;
    rotY += dx * smoothFalloff * 0.06;
    rotX -= dy * smoothFalloff * 0.06;
  }

  // Scroll-driven harmonic phase progression (0.00-0.15 hold, 0.15-0.42 thickness, 0.42-0.72 harmonic wave, 0.72-0.90 resolution, 0.90-1.00 hold)
  const s = Math.max(0, Math.min(1, scrollProgress));
  if (s > 0.15) {
    const activeScroll = Math.min(1, (s - 0.15) / 0.75); // 0..1 across [0.15..0.90], holds 0.90..1.00
    const harmonicPhase = Math.sin(nx * Math.PI * 1.4 - ny * Math.PI * 0.9 + activeScroll * Math.PI);
    z += activeScroll * 0.09 * harmonicPhase + activeScroll * spec.sCurveProximity * 0.06;
    scaleZ += activeScroll * 0.14 * spec.sCurveProximity;
  }

  return {
    x: baseX,
    y: baseY,
    z,
    rotX,
    rotY,
    presetRotZ,
    scaleZ,
  };
}
