export type TileShapeId =
  | 'fluted-ridge'
  | 'beveled-prism'
  | 'parabolic-dish'
  | 'slotted-louver';

export type MaterialFinishId =
  | 'raw-limestone'
  | 'charcoal-felt'
  | 'smoked-walnut'
  | 'anodized-bronze'
  | 'nordic-sage';

export type ArrangementPatternId =
  | 'harmonic-wave'
  | 'herringbone'
  | 'radial-aperture'
  | 'acoustic-gradient';

export type HeroCompositionId = 'wave' | 'vault' | 'aperture' | 'tectonic';

export type TileRotation = 0 | 90 | 180 | 270;

export interface TileShapeSpec {
  id: TileShapeId;
  name: string;
  subtitle: string;
  depthMm: number;
  baseNrc: number;
  diffusionIndex: number;
  frequencyCurve: [number, number, number, number, number, number]; // 125, 250, 500, 1000, 2000, 4000 Hz
  description: string;
}

export interface MaterialFinishSpec {
  id: MaterialFinishId;
  name: string;
  origin: string;
  primaryHex: string;
  highlightHex: string;
  shadowHex: string;
  accentHex: string;
  nrcModifier: number;
  massPerTileKg: number;
  roughness: number;
  metalness: number;
  description: string;
}

export interface ArrangementPatternSpec {
  id: ArrangementPatternId;
  name: string;
  architecturalIntent: string;
  scatterBonus: number;
}

export interface HeroCompositionSpec {
  id: HeroCompositionId;
  label: string;
  summary: string;
  nrcRating: string;
}

export interface ConfiguratorState {
  shape: TileShapeId;
  material: MaterialFinishId;
  pattern: ArrangementPatternId;
  columns: number;
  rows: number;
  lightAngleDeg: number;
  customRotations: Record<string, TileRotation>;
}

export interface TessellatedTile {
  key: string;
  col: number;
  row: number;
  rotation: TileRotation;
  reliefDepth: number; // 0.25 .. 1.0
  secondaryTone: boolean;
}

export interface AcousticMetrics {
  tileCount: number;
  wallWidthMeters: number;
  wallHeightMeters: number;
  wallAreaSqM: number;
  nrc: number;
  sabinsMetric: number;
  rt60UntreatedSec: number;
  rt60TreatedSec: number;
  rt60ReductionPercent: number;
  totalMassKg: number;
  cleatCount: number;
  frequencyAbsorption: {
    hz: number;
    alpha: number;
  }[];
}

export interface InquiryFormInput {
  architectName: string;
  firmOrStudio: string;
  workEmail: string;
  projectTypology: string;
  targetAreaSqM: string;
  notes: string;
}

export interface InquiryValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof InquiryFormInput, string>>;
}

export const FREQUENCY_BANDS_HZ = [125, 250, 500, 1000, 2000, 4000] as const;

export const TILE_SHAPES: TileShapeSpec[] = [
  {
    id: 'fluted-ridge',
    name: 'Fluted Ridge',
    subtitle: 'Linear Helmholtz Micro-Channels',
    depthMm: 58,
    baseNrc: 0.92,
    diffusionIndex: 0.84,
    frequencyCurve: [0.48, 0.78, 0.94, 0.98, 0.95, 0.89],
    description:
      'Seven precision-milled parallel ridges channel mid-to-high vocal frequencies into a damped recycled-PET backing plenum.',
  },
  {
    id: 'beveled-prism',
    name: 'Beveled Prism',
    subtitle: 'Asymmetric Tri-Facet Diffuser',
    depthMm: 74,
    baseNrc: 0.89,
    diffusionIndex: 0.96,
    frequencyCurve: [0.54, 0.76, 0.88, 0.93, 0.94, 0.91],
    description:
      'Oblique 22-degree planes fracture standing flutter echoes across parallel concrete and glazed atrium walls.',
  },
  {
    id: 'parabolic-dish',
    name: 'Parabolic Dish',
    subtitle: 'Concave Acoustic Phase Trap',
    depthMm: 64,
    baseNrc: 0.95,
    diffusionIndex: 0.88,
    frequencyCurve: [0.62, 0.85, 0.96, 0.99, 0.94, 0.88],
    description:
      'A carved spherical aperture paired with a perimeter shadow reveal captures low-mid resonance in recital rooms.',
  },
  {
    id: 'slotted-louver',
    name: 'Slotted Louver',
    subtitle: 'Deep Baffle Resonator Array',
    depthMm: 82,
    baseNrc: 0.94,
    diffusionIndex: 0.91,
    frequencyCurve: [0.66, 0.84, 0.95, 0.96, 0.93, 0.87],
    description:
      'Angled architectural blades expose deep mineral-wool cavities for broadband attenuation in high-ceiling transit and gallery halls.',
  },
];

export const MATERIAL_FINISHES: MaterialFinishSpec[] = [
  {
    id: 'raw-limestone',
    name: 'Raw Limestone',
    origin: 'Sintered Jura Mineral Composite',
    primaryHex: '#C9C4BA',
    highlightHex: '#E5E1D8',
    shadowHex: '#7A756C',
    accentHex: '#C89D66',
    nrcModifier: -0.02,
    massPerTileKg: 3.4,
    roughness: 0.82,
    metalness: 0.05,
    description:
      'Open-pore sintered mineral aggregate offering monolithic stone permanence with engineered micro-porosity.',
  },
  {
    id: 'charcoal-felt',
    name: 'Charcoal Felt',
    origin: 'Compressed Nordic Merino & Recycled PET',
    primaryHex: '#2A2F37',
    highlightHex: '#464E5B',
    shadowHex: '#14171C',
    accentHex: '#C89D66',
    nrcModifier: 0.03,
    massPerTileKg: 1.8,
    roughness: 0.92,
    metalness: 0.02,
    description:
      'Dense 9mm thermo-formed wool-blend felt delivering maximum vocal band absorption and velvety shadow transitions.',
  },
  {
    id: 'smoked-walnut',
    name: 'Smoked Walnut',
    origin: 'FSC-Certified Kiln-Fumed Timber Veneer',
    primaryHex: '#6E4E3A',
    highlightHex: '#966E54',
    shadowHex: '#3B281D',
    accentHex: '#D4AA72',
    nrcModifier: 0.0,
    massPerTileKg: 2.5,
    roughness: 0.58,
    metalness: 0.08,
    description:
      'Micro-perforated quarter-sawn European walnut over an acoustic fleece membrane for warm chamber timbre.',
  },
  {
    id: 'anodized-bronze',
    name: 'Anodized Bronze',
    origin: 'Micro-Perforated Architectural Aluminum',
    primaryHex: '#9A7853',
    highlightHex: '#C8A378',
    shadowHex: '#4F3C28',
    accentHex: '#E5C396',
    nrcModifier: -0.03,
    massPerTileKg: 2.9,
    roughness: 0.34,
    metalness: 0.76,
    description:
      '0.4mm laser-perforated brushed bronze skin backed by high-density acoustic mineral wool for luminous raking highlights.',
  },
  {
    id: 'nordic-sage',
    name: 'Nordic Sage',
    origin: 'Botanical-Dyed Acoustic Wool Felt',
    primaryHex: '#687A71',
    highlightHex: '#8BA095',
    shadowHex: '#39453F',
    accentHex: '#C89D66',
    nrcModifier: 0.02,
    massPerTileKg: 1.9,
    roughness: 0.88,
    metalness: 0.03,
    description:
      'Muted celadon-mineral wool felt calibrated for biophilic libraries, boardrooms, and Nordic daylight interiors.',
  },
];

export const ARRANGEMENT_PATTERNS: ArrangementPatternSpec[] = [
  {
    id: 'harmonic-wave',
    name: 'Harmonic Wave',
    architecturalIntent: 'Continuous sinusoidal phase progression across wide elevations',
    scatterBonus: 0.02,
  },
  {
    id: 'herringbone',
    name: 'Herringbone',
    architecturalIntent: 'Alternating orthogonal 90° weave fracturing lateral reflections',
    scatterBonus: 0.03,
  },
  {
    id: 'radial-aperture',
    name: 'Radial Aperture',
    architecturalIntent: 'Concentric focal relief centered on speaking or performance zones',
    scatterBonus: 0.025,
  },
  {
    id: 'acoustic-gradient',
    name: 'Acoustic Gradient',
    architecturalIntent: 'Progressive bottom-to-top density transition for tall atriums',
    scatterBonus: 0.015,
  },
];

export const HERO_COMPOSITIONS: HeroCompositionSpec[] = [
  {
    id: 'wave',
    label: 'Harmonic Wave',
    summary: 'Sinusoidal phase array tuned for 500–2000 Hz speech clarity.',
    nrcRating: '0.95 NRC',
  },
  {
    id: 'vault',
    label: 'Cathedral Vault',
    summary: 'Parabolic canted relief directing ceiling reflections inward.',
    nrcRating: '0.92 NRC',
  },
  {
    id: 'aperture',
    label: 'Radial Aperture',
    summary: 'Concentric acoustic lens dispersing axial room modes.',
    nrcRating: '0.96 NRC',
  },
  {
    id: 'tectonic',
    label: 'Tectonic Grid',
    summary: 'Alternating orthogonal facets for omnidirectional scattering.',
    nrcRating: '0.94 NRC',
  },
];

export const DEFAULT_CONFIGURATOR_STATE: ConfiguratorState = {
  shape: 'beveled-prism',
  material: 'raw-limestone',
  pattern: 'harmonic-wave',
  columns: 7,
  rows: 4,
  lightAngleDeg: 42,
  customRotations: {},
};

export function getShapeSpec(id: TileShapeId): TileShapeSpec {
  return TILE_SHAPES.find((s) => s.id === id) ?? TILE_SHAPES[0];
}

export function getMaterialSpec(id: MaterialFinishId): MaterialFinishSpec {
  return MATERIAL_FINISHES.find((m) => m.id === id) ?? MATERIAL_FINISHES[0];
}

export function getPatternSpec(id: ArrangementPatternId): ArrangementPatternSpec {
  return ARRANGEMENT_PATTERNS.find((p) => p.id === id) ?? ARRANGEMENT_PATTERNS[0];
}

export interface HeroTileTransform {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scaleZ: number;
  toneMix: number;
}

/**
 * Pure mathematical layout solver for the procedural 3D hero tile matrix.
 */
export function computeHeroTileTransform(
  col: number,
  row: number,
  cols: number,
  rows: number,
  composition: HeroCompositionId,
  pointerX: number, // -1 .. 1
  pointerY: number, // -1 .. 1
  scrollProgress: number, // 0 .. 1
  elapsedSec: number,
): HeroTileTransform {
  const spacing = 1.06;
  const centerX = (cols - 1) / 2;
  const centerY = (rows - 1) / 2;
  const nx = (col - centerX) / Math.max(1, centerX); // -1 .. 1
  const ny = (row - centerY) / Math.max(1, centerY); // -1 .. 1
  const radialDist = Math.hypot(nx, ny);

  const baseX = (col - centerX) * spacing;
  const baseY = (row - centerY) * spacing;

  let z = 0;
  let rotX = 0;
  let rotY = 0;
  let rotZ = 0;
  let scaleZ = 1;
  let toneMix = 0;

  const breath = Math.sin(elapsedSec * 0.85 + col * 0.45 + row * 0.35) * 0.035;

  switch (composition) {
    case 'wave': {
      const phase = col * 0.62 - row * 0.44 + elapsedSec * 0.55;
      z = Math.sin(phase) * 0.32 + breath;
      rotY = Math.cos(phase) * 0.28;
      rotX = Math.sin(row * 0.7 + elapsedSec * 0.4) * 0.14;
      rotZ = ((col + row) % 2 === 0 ? 0 : Math.PI * 0.5);
      scaleZ = 0.85 + (Math.sin(phase) + 1) * 0.28;
      toneMix = (Math.sin(col * 0.7 + row * 0.4) + 1) * 0.5;
      break;
    }
    case 'vault': {
      const arch = 1 - Math.min(1, nx * nx * 0.95);
      z = arch * 0.56 - Math.abs(ny) * 0.14 + breath;
      rotY = -nx * 0.48;
      rotX = ny * 0.22;
      rotZ = col % 2 === 0 ? 0 : Math.PI;
      scaleZ = 0.75 + arch * 0.55;
      toneMix = arch;
      break;
    }
    case 'aperture': {
      const ring = Math.cos(radialDist * Math.PI * 1.35 - elapsedSec * 0.5);
      z = ring * 0.36 + (1 - Math.min(1.2, radialDist)) * 0.22;
      rotX = -ny * 0.38 * ring;
      rotY = nx * 0.38 * ring;
      const angleSteps = Math.round(((Math.atan2(ny, nx) + Math.PI) / (Math.PI * 2)) * 4) % 4;
      rotZ = angleSteps * (Math.PI * 0.5);
      scaleZ = 0.8 + Math.max(0, 1 - radialDist * 0.65) * 0.6;
      toneMix = Math.max(0, Math.min(1, 1 - radialDist * 0.75));
      break;
    }
    case 'tectonic': {
      const checker = (col + row) % 2 === 0 ? 1 : -1;
      const band = ((col * 3 + row * 2) % 4) / 3;
      z = checker * 0.18 + band * 0.22 + breath * 0.5;
      rotX = checker * 0.18;
      rotY = -checker * 0.22;
      rotZ = ((col * 2 + row) % 4) * (Math.PI * 0.5);
      scaleZ = 0.8 + band * 0.55;
      toneMix = band;
      break;
    }
  }

  // Subtle pointer proximity influence
  const dx = nx - pointerX;
  const dy = ny - pointerY;
  const pointerDist = Math.hypot(dx, dy);
  const influence = Math.max(0, 1 - pointerDist / 0.85);
  z += influence * 0.26;
  rotY += dx * influence * 0.24;
  rotX -= dy * influence * 0.24;

  // Scroll-driven sculptural expansion (gentle architectural separation)
  const clampedScroll = Math.max(0, Math.min(1, scrollProgress));
  const spread = 1 + clampedScroll * 0.22;
  const scrollLift = clampedScroll * (0.45 * (1 - radialDist * 0.6));

  return {
    x: baseX * spread,
    y: baseY * spread,
    z: z + scrollLift,
    rotX: rotX + clampedScroll * ny * 0.35,
    rotY: rotY + clampedScroll * nx * 0.42,
    rotZ,
    scaleZ,
    toneMix,
  };
}

/**
 * Generates deterministic 2D/relief tessellation for the Product Configurator wall.
 */
export function generateWallTessellation(config: ConfiguratorState): TessellatedTile[] {
  const cols = Math.max(4, Math.min(10, Math.round(config.columns)));
  const rows = Math.max(3, Math.min(6, Math.round(config.rows)));
  const centerX = (cols - 1) / 2;
  const centerY = (rows - 1) / 2;
  const tiles: TessellatedTile[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const key = `${col}-${row}`;
      const nx = cols > 1 ? (col - centerX) / centerX : 0;
      const ny = rows > 1 ? (row - centerY) / centerY : 0;
      const dist = Math.hypot(nx, ny);

      let defaultRotation: TileRotation = 0;
      let reliefDepth = 0.65;
      let secondaryTone = false;

      switch (config.pattern) {
        case 'harmonic-wave': {
          const wave = Math.sin(col * 0.85 + row * 0.55);
          const step = ((col + row) % 4) as 0 | 1 | 2 | 3;
          defaultRotation = (step * 90) as TileRotation;
          reliefDepth = Number((0.45 + (wave + 1) * 0.26).toFixed(3));
          secondaryTone = wave > 0.15;
          break;
        }
        case 'herringbone': {
          defaultRotation = ((col + row) % 2 === 0 ? 0 : 90) as TileRotation;
          reliefDepth = Number((0.55 + ((col * 3 + row) % 3) * 0.18).toFixed(3));
          secondaryTone = (col + row) % 2 === 0;
          break;
        }
        case 'radial-aperture': {
          const quadrant =
            ny <= 0
              ? nx < 0
                ? 0
                : 90
              : nx >= 0
                ? 180
                : 270;
          defaultRotation = quadrant as TileRotation;
          reliefDepth = Number(Math.max(0.3, Math.min(1, 1 - dist * 0.48)).toFixed(3));
          secondaryTone = dist < 0.72;
          break;
        }
        case 'acoustic-gradient': {
          const verticalRatio = rows > 1 ? 1 - row / (rows - 1) : 0.5; // denser at bottom/eye-level
          defaultRotation = (row % 2 === 0 ? 0 : 180) as TileRotation;
          reliefDepth = Number((0.35 + verticalRatio * 0.62).toFixed(3));
          secondaryTone = row >= Math.floor(rows / 2);
          break;
        }
      }

      const rotation = config.customRotations[key] ?? defaultRotation;
      tiles.push({
        key,
        col,
        row,
        rotation,
        reliefDepth,
        secondaryTone,
      });
    }
  }

  return tiles;
}

export function rotateTileOrientation(current: TileRotation): TileRotation {
  return (((current + 90) % 360) as TileRotation);
}

/**
 * Computes physical acoustic performance metrics using Sabine's reverberation model
 * for a reference architectural chamber scaled to the installation wall area.
 */
export function calculateAcousticMetrics(config: ConfiguratorState): AcousticMetrics {
  const cols = Math.max(4, Math.min(10, Math.round(config.columns)));
  const rows = Math.max(3, Math.min(6, Math.round(config.rows)));
  const tileCount = cols * rows;

  // Each modular Tessera unit is 600mm x 600mm (0.6m x 0.6m = 0.36 sq m)
  const moduleSizeM = 0.6;
  const wallWidthMeters = Number((cols * moduleSizeM).toFixed(1));
  const wallHeightMeters = Number((rows * moduleSizeM).toFixed(1));
  const wallAreaSqM = Number((tileCount * moduleSizeM * moduleSizeM).toFixed(2));

  const shapeSpec = getShapeSpec(config.shape);
  const materialSpec = getMaterialSpec(config.material);
  const patternSpec = getPatternSpec(config.pattern);

  const rawNrc = shapeSpec.baseNrc + materialSpec.nrcModifier + patternSpec.scatterBonus;
  const clampedNrc = Number(Math.max(0.7, Math.min(0.99, Math.round(rawNrc * 200) / 200)).toFixed(2));

  const sabinsMetric = Number((wallAreaSqM * clampedNrc).toFixed(2));

  // Reference architectural room volume proportional to target wall (depth 5.5m)
  const roomVolumeM3 = wallAreaSqM * 5.5;
  // Baseline untreated concrete/gypsum room absorption (~0.05 average alpha across ~4.6x wall surface)
  const totalSurfaceArea = wallAreaSqM * 4.6;
  const baselineSabins = totalSurfaceArea * 0.052;
  const treatedSabins = baselineSabins + sabinsMetric - wallAreaSqM * 0.052;

  const rt60UntreatedSec = Number(((0.161 * roomVolumeM3) / baselineSabins).toFixed(2));
  const rt60TreatedSec = Number(((0.161 * roomVolumeM3) / treatedSabins).toFixed(2));
  const rt60ReductionPercent = Math.round(
    ((rt60UntreatedSec - rt60TreatedSec) / rt60UntreatedSec) * 100,
  );

  const totalMassKg = Number((tileCount * materialSpec.massPerTileKg).toFixed(1));
  const cleatCount = tileCount * 2;

  const frequencyAbsorption = FREQUENCY_BANDS_HZ.map((hz, idx) => {
    const baseBand = shapeSpec.frequencyCurve[idx];
    const adjusted = Math.max(
      0.35,
      Math.min(0.99, Number((baseBand + materialSpec.nrcModifier + patternSpec.scatterBonus * 0.5).toFixed(2))),
    );
    return { hz, alpha: adjusted };
  });

  return {
    tileCount,
    wallWidthMeters,
    wallHeightMeters,
    wallAreaSqM,
    nrc: clampedNrc,
    sabinsMetric,
    rt60UntreatedSec,
    rt60TreatedSec,
    rt60ReductionPercent,
    totalMassKg,
    cleatCount,
    frequencyAbsorption,
  };
}

export function formatSpecificationSummary(
  config: ConfiguratorState,
  metrics: AcousticMetrics,
): string {
  const shape = getShapeSpec(config.shape);
  const material = getMaterialSpec(config.material);
  const pattern = getPatternSpec(config.pattern);
  const customCount = Object.keys(config.customRotations).length;

  return [
    'TESSERA ARCHITECTURAL ACOUSTIC SPECIFICATION (CSI 09 84 33)',
    `Module Geometry: ${shape.name} (${shape.depthMm}mm relief)`,
    `Surface Finish: ${material.name} — ${material.origin}`,
    `Tessellation Pattern: ${pattern.name}${customCount > 0 ? ` (+${customCount} custom-rotated modules)` : ''}`,
    `Elevation Matrix: ${config.columns} cols × ${config.rows} rows (${metrics.tileCount} units · 600×600mm)`,
    `Dimensions & Coverage: ${metrics.wallWidthMeters}m W × ${metrics.wallHeightMeters}m H (${metrics.wallAreaSqM} m²)`,
    `Acoustic Performance: NRC ${metrics.nrc.toFixed(2)} · ${metrics.sabinsMetric} Metric Sabins · Est. RT60 ${metrics.rt60UntreatedSec}s → ${metrics.rt60TreatedSec}s (-${metrics.rt60ReductionPercent}%)`,
    `Hardware & Load: ${metrics.cleatCount} Anodized Quick-Lock Magnetic Cleats · ${metrics.totalMassKg} kg total mass`,
  ].join('\n');
}

export function validateInquiryForm(input: InquiryFormInput): InquiryValidationResult {
  const errors: Partial<Record<keyof InquiryFormInput, string>> = {};

  if (!input.architectName || input.architectName.trim().length < 2) {
    errors.architectName = 'Please enter your full name.';
  }

  if (!input.firmOrStudio || input.firmOrStudio.trim().length < 2) {
    errors.firmOrStudio = 'Please enter your practice or organization.';
  }

  const emailTrimmed = (input.workEmail ?? '').trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
    errors.workEmail = 'Please enter a valid work email address.';
  }

  if (!input.projectTypology || input.projectTypology.trim().length === 0) {
    errors.projectTypology = 'Please select a project typology.';
  }

  const parsedArea = Number(input.targetAreaSqM);
  if (!input.targetAreaSqM || Number.isNaN(parsedArea) || parsedArea <= 0 || parsedArea > 50000) {
    errors.targetAreaSqM = 'Enter an estimated wall area between 1 and 50,000 m².';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
