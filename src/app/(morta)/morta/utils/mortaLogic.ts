export interface AssetDefinition {
  stem: string;
  filename: string;
  primarySrc: string;
  fallbackSrc: string;
  width: number;
  height: number;
  alt: string;
}

export interface CollectionItem {
  id: string;
  number: string;
  name: string;
  category: string;
  subtitle: string;
  material: string;
  weight: string;
  dimensions: string;
  editionNote: string;
  description: string;
  architecturalNote: string;
  craftDetail: string;
  asset: AssetDefinition;
}

export interface ContourTransform {
  id: string;
  label: string;
  translateX: number;
  translateY: number;
  rotate: number;
  scale: number;
  opacity: number;
  strokeDashoffset: number;
}

export interface Part3DTransform {
  id: string;
  label: string;
  position: [number, number, number];
  rotation: [number, number, number];
  clearanceMm: number;
}

export interface Assembly3DState {
  clampedProgress: number;
  lockProgress: number;
  isLocked: boolean;
  stageIndex: number;
  stageCode: string;
  stageTitle: string;
  stageDescription: string;
  cameraOrbitOffset: {
    azimuth: number;
    elevation: number;
    distance: number;
  };
  parts: {
    outerBezel: Part3DTransform;
    recessedChamber: Part3DTransform;
    leftShoulder: Part3DTransform;
    rightShoulder: Part3DTransform;
    lowerShank: Part3DTransform;
  };
}

export interface AssemblyState {
  clampedProgress: number;
  lockProgress: number;
  isLocked: boolean;
  stageIndex: number;
  stageCode: string;
  stageTitle: string;
  stageDescription: string;
  contours: {
    outerArch: ContourTransform;
    innerVoid: ContourTransform;
    leftShoulder: ContourTransform;
    rightShoulder: ContourTransform;
    lowerShank: ContourTransform;
    engravedHatching: ContourTransform;
    pointedSeal: ContourTransform;
  };
  assembly3D: Assembly3DState;
}

export interface CommissionFormInput {
  name: string;
  email: string;
  pieceReference: string;
  description: string;
}

export interface CommissionValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    email?: string;
    pieceReference?: string;
    description?: string;
  };
}

export interface HouseRingStudyPose {
  azimuth: number;
  elevation: number;
  distance: number;
  settleOffsetY: number;
  isSettled: boolean;
}

export const MORTA_ASSETS: Record<string, AssetDefinition> = {
  hero: {
    stem: 'morta-hero',
    filename: 'morta-hero.png',
    primarySrc: '/templates/morta/morta-hero.webp',
    fallbackSrc: '/templates/morta/morta-hero.webp',
    width: 2400,
    height: 1792,
    alt: 'Sculptural sterling-silver pointed-arch signet ring resting in deep shadow with engraved gothic tracery on its shoulders.',
  },
  reliquaryRing: {
    stem: 'morta-reliquary-ring',
    filename: 'morta-reliquary-ring.png',
    primarySrc: '/templates/morta/morta-reliquary-ring.webp',
    fallbackSrc: '/templates/morta/morta-reliquary-ring.webp',
    width: 1792,
    height: 2400,
    alt: 'Reliquary signet ring in oxidized and brushed 925 sterling silver with a recessed pointed-arch bezel on dark slate.',
  },
  thornPendant: {
    stem: 'morta-thorn-pendant',
    filename: 'morta-thorn-pendant.png',
    primarySrc: '/templates/morta/morta-thorn-pendant.webp',
    fallbackSrc: '/templates/morta/morta-thorn-pendant.webp',
    width: 1792,
    height: 2400,
    alt: 'Thorn pendant in sterling silver featuring pierced lancet tracery tapering to a sharp vertical point on a fine chain.',
  },
  vigilEarrings: {
    stem: 'morta-vigil-earrings',
    filename: 'morta-vigil-earrings.png',
    primarySrc: '/templates/morta/morta-vigil-earrings.webp',
    fallbackSrc: '/templates/morta/morta-vigil-earrings.webp',
    width: 1792,
    height: 2400,
    alt: 'Pair of Vigil drop earrings in sterling silver with open pointed-arch upper frames suspending articulated tapered pendulums.',
  },
  craft: {
    stem: 'morta-craft',
    filename: 'morta-craft.png',
    primarySrc: '/templates/morta/morta-craft.webp',
    fallbackSrc: '/templates/morta/morta-craft.webp',
    width: 2400,
    height: 1792,
    alt: 'Silversmith hands at a wooden bench pin engraving a sterling-silver band with a wooden-handled steel graver.',
  },
  bespoke: {
    stem: 'morta-bespoke',
    filename: 'morta-bespoke.png',
    primarySrc: '/templates/morta/morta-bespoke.webp',
    fallbackSrc: '/templates/morta/morta-bespoke.webp',
    width: 1792,
    height: 2400,
    alt: 'Graphite study sketches of sculptural rings beside a jeweller’s needle file and a finished satin-brushed silver ring.',
  },
};

export const COLLECTION_ITEMS: CollectionItem[] = [
  {
    id: 'reliquary',
    number: '01',
    name: 'Reliquary',
    category: 'Signet ring',
    subtitle: 'Recessed Lancet Bezel',
    material: '925 Sterling Silver',
    weight: '24.6 g',
    dimensions: '21 mm face · 5.5 mm tapered shank',
    editionNote: 'Numbered edition',
    description:
      'An architectural signet cast around a sunken pointed-arch chamber. Instead of a set stone, the recessed face holds shadow and hand-burnished contact marks.',
    architecturalNote:
      'Constructed with a stepped two-tier ogival bezel and trefoil-engraved shoulders that distribute weight evenly across the finger.',
    craftDetail:
      'Lost-wax cast in heavy gauge sterling, darkened in liver of sulphur, and relieved by hand on slate and boxwood laps.',
    asset: MORTA_ASSETS.reliquaryRing,
  },
  {
    id: 'thorn',
    number: '02',
    name: 'Thorn',
    category: 'Pendant',
    subtitle: 'Pierced Tracery Spire',
    material: '925 Sterling Silver',
    weight: '16.2 g',
    dimensions: '54 mm drop · 14 mm span · 55 cm chain',
    editionNote: 'Small batch',
    description:
      'Intersecting ribs of silver enclose a central quatrefoil void before converging into a single plumb point that rests against the sternum.',
    architecturalNote:
      'Symmetrical rib vaulting allows light and dark fabric beneath to become the core of the piece, framing negative space in crisp relief.',
    craftDetail:
      'Hand-pierced internal apertures finished with silk-threaded abrasive cord before final hard-buffing along the outer spines.',
    asset: MORTA_ASSETS.thornPendant,
  },
  {
    id: 'vigil',
    number: '03',
    name: 'Vigil',
    category: 'Drop earrings',
    subtitle: 'Articulated Arch & Pendulum',
    material: '925 Sterling Silver',
    weight: '11.8 g (pair)',
    dimensions: '62 mm total drop · 13 mm arch width',
    editionNote: 'Made to order',
    description:
      'A pair of open lancet arches suspending faceted silver plummets. The hinged junction permits quiet, measured movement below a stationary frame.',
    architecturalNote:
      'Balanced so the upper gothic arch remains vertical while the lower four-sided needle responds to the wearer’s turn of the head.',
    craftDetail:
      'Forged ear wires soldered to cast tracery heads, linked via hand-turned jump rings to cold-hammered and faceted drops.',
    asset: MORTA_ASSETS.vigilEarrings,
  },
];

function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function easeOutCubic(t: number): number {
  const c = clamp01(t);
  return 1 - Math.pow(1 - c, 3);
}

function lerp(start: number, end: number, t: number): number {
  return Number((start + (end - start) * t).toFixed(3));
}

/**
 * Computes the 3D Reliquary signet ring assembly state across the 4 stages:
 * 1. Dispersed (0.0): Separated into 5 sculptural sterling components around a shared centre.
 * 2. Converging (0.35): Components draw toward one another with controlled movement.
 * 3. Aligning (0.65): Components rotate into exact axial alignment showing how the stepped lancet face, chamber, shoulders, and shank meet.
 * 4. Locked ring (1.0): Joined into the complete Reliquary signet ring in a three-quarter reference view.
 */
export function compute3DReliquaryAssembly(
  rawProgress: number,
  reducedMotion = false,
  hasExplicitStageSelection = false
): Assembly3DState {
  const effectiveRaw =
    reducedMotion && !hasExplicitStageSelection ? 1 : clamp01(rawProgress);
  const normalizedLock = clamp01(effectiveRaw / 0.92);
  // Balanced smoothstep curve so Stage 2 (0.35 -> ~42%) and Stage 3 (0.65 -> ~78%) are visually distinct
  const posT = Number(
    (
      normalizedLock *
      normalizedLock *
      (3 - 2 * normalizedLock)
    ).toFixed(3)
  );
  // Rotations align by Stage 3 (Aligning at 0.65) so Stage 3 clearly shows true axial alignment before final seat
  const rotNorm = clamp01(effectiveRaw / 0.64);
  const rotT = Number((rotNorm * rotNorm * (3 - 2 * rotNorm)).toFixed(3));
  const isLocked = normalizedLock >= 0.98;

  let stageIndex = 0;
  let stageCode = 'STAGE I · 01 / 04';
  let stageTitle = 'Dispersed Components';
  let stageDescription =
    'The Reliquary signet is separated into its five structural elements: the stepped lancet bezel, sunken oxidized chamber, left and right engraved trefoil shoulders, and tapered sterling shank.';

  if (effectiveRaw >= 0.85 || isLocked) {
    stageIndex = 3;
    stageCode = 'STAGE IV · 04 / 04';
    stageTitle = 'Locked Ring Silhouette';
    stageDescription =
      'Bezel, sunken chamber, engraved spandrel shoulders, and tapered band lock into the complete Reliquary signet. Drag or use the arrow keys to inspect the ring in three dimensions.';
  } else if (effectiveRaw >= 0.52) {
    stageIndex = 2;
    stageCode = 'STAGE III · 03 / 04';
    stageTitle = 'Axial Alignment';
    stageDescription =
      'Each silver component rotates into true axial alignment, revealing how the stepped ogival bezel seats over the oxidized chamber and meets the engraved shoulders.';
  } else if (effectiveRaw >= 0.22) {
    stageIndex = 1;
    stageCode = 'STAGE II · 02 / 04';
    stageTitle = 'Converging Around the Void';
    stageDescription =
      'The outer lancet frame and carved shoulders draw inward toward the central aperture, narrowing the clearance around the unset chamber.';
  }

  const invPos = 1 - posT;
  const invRot = 1 - rotT;

  return {
    clampedProgress: effectiveRaw,
    lockProgress: posT,
    isLocked,
    stageIndex,
    stageCode,
    stageTitle,
    stageDescription,
    cameraOrbitOffset: {
      // Positive azimuth places camera to front-right looking toward front-left,
      // matching morta-reliquary-ring.png (lancet face on left, engraved shoulder & hoop extending right)
      azimuth: lerp(0.56, 0.72, posT),
      elevation: lerp(0.44, 0.42, posT),
      distance: lerp(7.4, 5.85, posT),
    },
    parts: {
      outerBezel: {
        id: 'outer-bezel',
        label: 'Stepped Lancet Bezel',
        position: [
          lerp(-0.15, 0, posT),
          lerp(0.46, 0, posT),
          lerp(1.38, 0, posT),
        ],
        rotation: [
          lerp(-0.24, 0, rotT),
          lerp(-0.18, 0, rotT),
          lerp(0.08, 0, rotT),
        ],
        clearanceMm: Number((invPos * 14.0).toFixed(1)),
      },
      recessedChamber: {
        id: 'recessed-chamber',
        label: 'Oxidized Reliquary Chamber',
        position: [
          lerp(-0.05, 0, posT),
          lerp(0.16, 0, posT),
          lerp(0.64, 0, posT),
        ],
        rotation: [
          lerp(0.14, 0, rotT),
          lerp(0.12, 0, rotT),
          lerp(-0.06, 0, rotT),
        ],
        clearanceMm: Number((invPos * 6.4).toFixed(1)),
      },
      leftShoulder: {
        id: 'left-shoulder',
        label: 'West Trefoil Shoulder',
        position: [
          lerp(-1.18, 0, posT),
          lerp(0.06, 0, posT),
          lerp(-0.08, 0, posT),
        ],
        rotation: [
          lerp(0.08, 0, rotT),
          lerp(0.32, 0, rotT),
          lerp(0.12, 0, rotT),
        ],
        clearanceMm: Number((invPos * 11.8).toFixed(1)),
      },
      rightShoulder: {
        id: 'right-shoulder',
        label: 'East Trefoil Shoulder',
        position: [
          lerp(1.18, 0, posT),
          lerp(-0.06, 0, posT),
          lerp(-0.08, 0, posT),
        ],
        rotation: [
          lerp(-0.08, 0, rotT),
          lerp(-0.32, 0, rotT),
          lerp(-0.12, 0, rotT),
        ],
        clearanceMm: Number((invPos * 11.8).toFixed(1)),
      },
      lowerShank: {
        id: 'lower-shank',
        label: 'Tapered Sterling Shank',
        position: [
          lerp(0.08, 0, posT),
          lerp(-0.42, 0, posT),
          lerp(-1.24, 0, posT),
        ],
        rotation: [
          lerp(0.26 * invRot, 0, 1),
          lerp(-0.14 * invRot, 0, 1),
          0,
        ],
        clearanceMm: Number((invPos * 12.4).toFixed(1)),
      },
    },
  };
}

/**
 * Computes the scroll-linked ring assembly state (both 2D metrics and 3D Reliquary assembly).
 */
export function computeAssemblyState(
  rawProgress: number,
  reducedMotion = false,
  hasExplicitStageSelection = false
): AssemblyState {
  const effectiveRaw =
    reducedMotion && !hasExplicitStageSelection ? 1 : clamp01(rawProgress);
  const normalizedLock = clamp01(effectiveRaw / 0.88);
  const t = easeOutCubic(normalizedLock);
  const assembly3D = compute3DReliquaryAssembly(
    rawProgress,
    reducedMotion,
    hasExplicitStageSelection
  );

  return {
    clampedProgress: assembly3D.clampedProgress,
    lockProgress: assembly3D.lockProgress,
    isLocked: assembly3D.isLocked,
    stageIndex: assembly3D.stageIndex,
    stageCode: assembly3D.stageCode,
    stageTitle: assembly3D.stageTitle,
    stageDescription: assembly3D.stageDescription,
    assembly3D,
    contours: {
      outerArch: {
        id: 'outer-arch',
        label: 'Outer Lancet Bezel',
        translateX: lerp(0, 0, t),
        translateY: lerp(-96, 0, t),
        rotate: lerp(-8, 0, t),
        scale: lerp(1.18, 1, t),
        opacity: lerp(0.38, 1, t),
        strokeDashoffset: lerp(180, 0, t),
      },
      innerVoid: {
        id: 'inner-void',
        label: 'Recessed Void Aperture',
        translateX: lerp(0, 0, t),
        translateY: lerp(-42, 0, t),
        rotate: lerp(6, 0, t),
        scale: lerp(0.76, 1, t),
        opacity: lerp(0.45, 1, t),
        strokeDashoffset: lerp(120, 0, t),
      },
      leftShoulder: {
        id: 'left-shoulder',
        label: 'West Tracery Shoulder',
        translateX: lerp(-112, 0, t),
        translateY: lerp(18, 0, t),
        rotate: lerp(-18, 0, t),
        scale: lerp(1.08, 1, t),
        opacity: lerp(0.32, 1, t),
        strokeDashoffset: lerp(140, 0, t),
      },
      rightShoulder: {
        id: 'right-shoulder',
        label: 'East Tracery Shoulder',
        translateX: lerp(112, 0, t),
        translateY: lerp(18, 0, t),
        rotate: lerp(18, 0, t),
        scale: lerp(1.08, 1, t),
        opacity: lerp(0.32, 1, t),
        strokeDashoffset: lerp(140, 0, t),
      },
      lowerShank: {
        id: 'lower-shank',
        label: 'Tapered Sterling Shank',
        translateX: lerp(0, 0, t),
        translateY: lerp(104, 0, t),
        rotate: lerp(0, 0, t),
        scale: lerp(1.15, 1, t),
        opacity: lerp(0.35, 1, t),
        strokeDashoffset: lerp(160, 0, t),
      },
      engravedHatching: {
        id: 'engraved-hatching',
        label: 'Graver Hatching Lines',
        translateX: lerp(0, 0, t),
        translateY: lerp(28, 0, t),
        rotate: lerp(0, 0, t),
        scale: lerp(1.24, 1, t),
        opacity: lerp(0.15, 0.9, t),
        strokeDashoffset: lerp(90, 0, t),
      },
      pointedSeal: {
        id: 'pointed-seal',
        label: 'Central Pointed Seal',
        translateX: lerp(0, 0, t),
        translateY: lerp(-64, 0, t),
        rotate: lerp(45, 0, t),
        scale: lerp(0.65, 1, t),
        opacity: lerp(0.2, 1, t),
        strokeDashoffset: lerp(60, 0, t),
      },
    },
  };
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validates the bespoke commission enquiry form without substituting fallback values.
 */
export function validateCommissionForm(
  input: CommissionFormInput
): CommissionValidationResult {
  const errors: CommissionValidationResult['errors'] = {};

  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedPiece = input.pieceReference.trim();
  const trimmedDescription = input.description.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your name so we may address our reply.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!trimmedEmail) {
    errors.email = 'Please provide an email address for commission correspondence.';
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (for example, name@domain.com).';
  }

  if (!trimmedPiece) {
    errors.pieceReference = 'Please select a starting form or commission study.';
  }

  if (!trimmedDescription) {
    errors.description =
      'Please include a brief description of the piece, proportions, or inscription you have in mind.';
  } else if (trimmedDescription.length < 15) {
    errors.description =
      'Please share at least 15 characters describing your intended form, scale, or wear.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Computes the 3D camera & entrance settle pose for the "Objects of devotion" (House) 3D ring study.
 * Respects prefers-reduced-motion by returning a finished static three-quarter view with zero automatic motion.
 */
export function computeHouseRingStudyPose(
  elapsedSec: number,
  userAzimuthOffset = 0,
  userElevationOffset = 0,
  reducedMotion = false,
  userHasInteracted = false
): HouseRingStudyPose {
  const baseAzimuth = 0.70; // ~40 deg three-quarter view showing lancet face, recessed chamber, and engraved shoulder
  const baseElevation = 0.40; // ~23 deg elevation showing depth of circular band
  const baseDistance = 6.35;

  const clampedUserAz = Math.max(
    -Math.PI * 1.25,
    Math.min(Math.PI * 1.25, userAzimuthOffset)
  );
  const clampedUserEl = Math.max(
    -0.68,
    Math.min(0.78, userElevationOffset)
  );

  if (reducedMotion) {
    return {
      azimuth: Number((baseAzimuth + clampedUserAz).toFixed(4)),
      elevation: Number((baseElevation + clampedUserEl).toFixed(4)),
      distance: baseDistance,
      settleOffsetY: 0,
      isSettled: true,
    };
  }

  const safeElapsed = Math.max(0, elapsedSec);
  const settleT = easeOutCubic(clamp01(safeElapsed / 1.4));
  const settleOffsetY = lerp(-0.14, 0, settleT);
  const distance = lerp(6.65, baseDistance, settleT);

  // Subtle, slow rotation revealing the depth of the piece when idle
  const swayEnvelope = userHasInteracted ? 0 : settleT;
  const autoAzimuth = Math.sin(safeElapsed * 0.55) * 0.11 * swayEnvelope;
  const autoElevation = Math.cos(safeElapsed * 0.42) * 0.025 * swayEnvelope;

  return {
    azimuth: Number((baseAzimuth + autoAzimuth + clampedUserAz).toFixed(4)),
    elevation: Number(
      (baseElevation + autoElevation + clampedUserEl).toFixed(4)
    ),
    distance,
    settleOffsetY,
    isSettled: settleT >= 0.99,
  };
}

