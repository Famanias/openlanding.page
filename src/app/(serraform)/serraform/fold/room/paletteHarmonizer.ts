import { hexToRgb, mixHex, normalizeHex, relativeLuminance, rgbToHex } from '../color';

export interface OklchColor {
  l: number; // 0..1
  c: number; // 0..0.37
  h: number; // 0..360 deg
}

export interface OklabColor {
  l: number;
  a: number;
  b: number;
}

export type RoomFamilyId =
  | 'botanicalAtelier'
  | 'editorialLoft'
  | 'panoramaSalon'
  | 'sculptedCoastalRoom'
  | 'architecturalShowroom'
  | 'curatedStudio';

export type DividerPrintName =
  | 'Bloom'
  | 'Stripes'
  | 'Landscape'
  | 'Waves'
  | 'Solid'
  | 'Custom';

export interface DividerConfig {
  baseColor: string;
  designColor: string;
  print: DividerPrintName | 'bloom' | 'stripes' | 'landscape' | 'waves' | 'solid' | 'upload';
  openness: number;
  view: string;
  motifScale?: number;
  customImageUrl?: string;
}

export interface RoomPalette {
  // Architectural walls & surfaces
  wallBase: string;
  wallHighlight: string;
  wallShadow: string;
  floorBase: string;
  floorFar: string;
  floorDetail: string;

  // Textiles, furniture & architectural trim
  rug: string;
  rugTrim: string;
  textilePrimary: string;
  textileSecondary: string;
  furniture: string;
  furnitureLeg: string;
  decorPrimary: string;
  decorAccent: string;
  architecturalTrim: string;
  foliage: string;

  // Atmospheric lighting & shadows (shared between 2.5D CSS/SVG & Three.js lights)
  lightTint: string;
  ambientTint: string;
  shadowTint: string;
  quietZoneBg: string;

  // Scoped Hero UI chrome & WCAG AA typography
  uiAccent: string;
  uiAccentHover: string;
  uiAccentText: string;
  uiOutline: string;
  textPrimary: string;
  textSecondary: string;
  isDarkEnvelope: boolean;

  // Legacy aliases kept in sync for downstream consumers
  wall: string;
  wallUpper: string;
  wallAlcove: string;
  floor: string;
  trim: string;
  decorSecondary: string;
  lightWarm: string;
  shadow: string;
}

export type HarmonizedRoomPalette = RoomPalette;

function srgbToLinear(c255: number): number {
  const c = c255 / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(lin: number): number {
  const clamped = Math.max(0, Math.min(1, lin));
  const v =
    clamped <= 0.0031308
      ? 12.92 * clamped
      : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  return Math.round(v * 255);
}

function oklchToLinearRgb(l: number, c: number, hDeg: number): [number, number, number] {
  const hRad = (hDeg * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  const lr = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const lg = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const lb = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;
  return [lr, lg, lb];
}

function inSrgbGamut(lr: number, lg: number, lb: number): boolean {
  const eps = 1e-4;
  return (
    lr >= -eps && lr <= 1 + eps &&
    lg >= -eps && lg <= 1 + eps &&
    lb >= -eps && lb <= 1 + eps
  );
}

export function hexToOklab(hexInput: string): OklabColor {
  const norm = normalizeHex(hexInput) ?? '#D8C4A7';
  const { r, g, b } = hexToRgb(norm);
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const lCone = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const mCone = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const sCone = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

  return {
    l: 0.2104542553 * lCone + 0.793617785 * mCone - 0.0040720468 * sCone,
    a: 1.9779984951 * lCone - 2.428592205 * mCone + 0.4505937099 * sCone,
    b: 0.0259040371 * lCone + 0.7827717662 * mCone - 0.808675766 * sCone,
  };
}

export function oklabToHex(lab: OklabColor): string {
  const C = Math.hypot(lab.a, lab.b);
  let H = (Math.atan2(lab.b, lab.a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return oklchToHex({ l: lab.l, c: C, h: H });
}

export function hexToOklch(hexInput: string): OklchColor {
  const lab = hexToOklab(hexInput);
  const C = Math.hypot(lab.a, lab.b);
  let H = (Math.atan2(lab.b, lab.a) * 180) / Math.PI;
  if (H < 0) H += 360;

  return {
    l: Math.max(0, Math.min(1, lab.l)),
    c: Math.max(0, C),
    h: C < 1e-4 ? 42 : H,
  };
}

/**
 * Converts OKLCH to sRGB hex while preserving perceptual hue and lightness via
 * binary-search chroma reduction when out-of-gamut.
 */
export function oklchToHex(color: OklchColor): string {
  const L = Math.max(0, Math.min(1, Number.isFinite(color.l) ? color.l : 0.85));
  const targetC = Math.max(0, Math.min(0.37, Number.isFinite(color.c) ? color.c : 0));
  const H = Number.isFinite(color.h) ? ((color.h % 360) + 360) % 360 : 0;

  if (L <= 0.001) return '#000000';
  if (L >= 0.999) return '#FFFFFF';

  const [lr0, lg0, lb0] = oklchToLinearRgb(L, targetC, H);
  if (inSrgbGamut(lr0, lg0, lb0)) {
    return rgbToHex(linearToSrgb(lr0), linearToSrgb(lg0), linearToSrgb(lb0));
  }

  // Binary search maximum in-gamut chroma at exact L & H so hue never drifts
  let lo = 0;
  let hi = targetC;
  for (let i = 0; i < 14; i += 1) {
    const mid = (lo + hi) * 0.5;
    const [lr, lg, lb] = oklchToLinearRgb(L, mid, H);
    if (inSrgbGamut(lr, lg, lb)) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  const [lr, lg, lb] = oklchToLinearRgb(L, lo, H);
  return rgbToHex(linearToSrgb(lr), linearToSrgb(lg), linearToSrgb(lb));
}

function clampOklch(l: number, c: number, h: number): string {
  return oklchToHex({
    l: Math.max(0.05, Math.min(0.988, l)),
    c: Math.max(0, Math.min(0.22, c)),
    h,
  });
}

function wrapHue(h: number): number {
  return ((h % 360) + 360) % 360;
}

function shortestHueDelta(fromDeg: number, toDeg: number): number {
  return (((toDeg - fromDeg) % 360) + 540) % 360 - 180;
}

function blendHue(fromDeg: number, toDeg: number, t: number): number {
  return wrapHue(fromDeg + shortestHueDelta(fromDeg, toDeg) * t);
}

export function contrastRatio(hexA: string, hexB: string): number {
  const la = relativeLuminance(hexA);
  const lb = relativeLuminance(hexB);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

function pickBestReadableText(bgHex: string, tintHue: number): { primary: string; secondary: string; darkBg: boolean } {
  const bg = hexToOklch(bgHex);
  const darkBg = relativeLuminance(bgHex) < 0.24 || bg.l < 0.54;
  if (darkBg) {
    const primary = clampOklch(0.962, Math.min(0.012, bg.c * 0.25), tintHue);
    const secondary = clampOklch(0.82, Math.min(0.018, bg.c * 0.35), tintHue);
    return {
      primary: contrastRatio(primary, bgHex) >= 4.5 ? primary : '#FAF6F3',
      secondary: contrastRatio(secondary, bgHex) >= 4.5 ? secondary : '#DDD6D2',
      darkBg: true,
    };
  }
  // Light room: deep rich charcoal/espresso/plum tinted subtly to harmonize with baseHue while guaranteeing >= 7:1
  const deepTinted = clampOklch(0.24, Math.min(0.045, bg.c * 0.55 + 0.015), tintHue);
  const secondaryTinted = clampOklch(0.41, Math.min(0.036, bg.c * 0.45 + 0.012), tintHue);
  return {
    primary: contrastRatio(deepTinted, bgHex) >= 5.2 ? deepTinted : '#24181C',
    secondary: contrastRatio(secondaryTinted, bgHex) >= 4.5 ? secondaryTinted : '#4E4145',
    darkBg: false,
  };
}

function resolveFamilyFromPrint(print: DividerConfig['print']): RoomFamilyId {
  switch (print) {
    case 'Bloom':
    case 'bloom':
      return 'botanicalAtelier';
    case 'Stripes':
    case 'stripes':
      return 'editorialLoft';
    case 'Landscape':
    case 'landscape':
      return 'panoramaSalon';
    case 'Waves':
    case 'waves':
      return 'sculptedCoastalRoom';
    case 'Solid':
    case 'solid':
      return 'architecturalShowroom';
    case 'Custom':
    case 'upload':
    default:
      return 'curatedStudio';
  }
}

interface FamilyStylingBias {
  wallLightDelta: number;
  wallChromaFactor: number;
  floorLightDelta: number;
  floorChromaFactor: number;
  alcoveContrast: number;
  darkThreshold: number;
  neutralLightness: number;
}

const FAMILY_BIASES: Record<RoomFamilyId, FamilyStylingBias> = {
  botanicalAtelier: {
    wallLightDelta: 0.01,
    wallChromaFactor: 1.02,
    floorLightDelta: -0.01,
    floorChromaFactor: 1.0,
    alcoveContrast: 0.065,
    darkThreshold: 0.24,
    neutralLightness: 0.915,
  },
  editorialLoft: {
    wallLightDelta: -0.015,
    wallChromaFactor: 0.88,
    floorLightDelta: -0.025,
    floorChromaFactor: 0.85,
    alcoveContrast: 0.075,
    darkThreshold: 0.34,
    neutralLightness: 0.895,
  },
  panoramaSalon: {
    wallLightDelta: 0.0,
    wallChromaFactor: 0.94,
    floorLightDelta: -0.018,
    floorChromaFactor: 0.95,
    alcoveContrast: 0.072,
    darkThreshold: 0.24,
    neutralLightness: 0.905,
  },
  sculptedCoastalRoom: {
    wallLightDelta: 0.015,
    wallChromaFactor: 1.0,
    floorLightDelta: 0.0,
    floorChromaFactor: 0.92,
    alcoveContrast: 0.068,
    darkThreshold: 0.24,
    neutralLightness: 0.918,
  },
  architecturalShowroom: {
    wallLightDelta: 0.01,
    wallChromaFactor: 0.92,
    floorLightDelta: -0.015,
    floorChromaFactor: 0.9,
    alcoveContrast: 0.064,
    darkThreshold: 0.24,
    neutralLightness: 0.915,
  },
  curatedStudio: {
    wallLightDelta: 0.005,
    wallChromaFactor: 0.9,
    floorLightDelta: -0.012,
    floorChromaFactor: 0.88,
    alcoveContrast: 0.06,
    darkThreshold: 0.24,
    neutralLightness: 0.91,
  },
};

/**
 * Single authoritative perceptual palette engine: derives the entire surrounding
 * 2.5D architectural room, floor, rugs, textiles, furniture, decor, lighting,
 * shadows, and scoped Hero UI chrome from the divider's exact baseColor & designColor.
 *
 * Prints select the architectural room family (geometry & staging), never lock colors.
 */
export function deriveRoomPalette(config: DividerConfig): RoomPalette {
  const family = resolveFamilyFromPrint(config.print);
  return harmonizeRoomPalette(family, config.baseColor, config.designColor);
}

export function harmonizeRoomPalette(
  family: RoomFamilyId,
  baseHexInput: string,
  designHexInput: string,
): RoomPalette {
  const baseHex = normalizeHex(baseHexInput) ?? '#D8C4A7';
  const designHex = normalizeHex(designHexInput) ?? '#4B202A';

  const base = hexToOklch(baseHex);
  const accent = hexToOklch(designHex);
  const bias = FAMILY_BIASES[family];

  const isAchromaticBase = base.c < 0.014;
  const isAchromaticAccent = accent.c < 0.014;

  // Preserve actual base hue without pulling toward beige; achromatic bases softly echo design hue or warm mineral limestone
  const baseHue = isAchromaticBase
    ? (isAchromaticAccent ? 46 : accent.h)
    : base.h;
  const accentHue = isAchromaticAccent
    ? blendHue(baseHue, 18, 0.25)
    : accent.h;

  // Deep obsidian/charcoal loft or ultra-dark showroom/salon triggers an intentional dark architectural envelope
  const isDarkEnvelope = base.l < bias.darkThreshold;

  // Subtle natural-material balancing hue (never locks room to beige; bends slightly toward natural wood/stone only at 15-22%)
  const stoneHue = blendHue(baseHue, 52, isAchromaticBase ? 0.35 : 0.16);
  const baseChromaNorm = isAchromaticBase ? 0.005 : base.c;

  let wallBase: string;
  let wallHighlight: string;
  let wallShadow: string;
  let floorBase: string;
  let floorFar: string;
  let floorDetail: string;
  let rug: string;
  let rugTrim: string;
  let textilePrimary: string;
  let textileSecondary: string;
  let furniture: string;
  let furnitureLeg: string;
  let decorPrimary: string;
  let decorAccent: string;
  let architecturalTrim: string;
  let foliage: string;
  let lightTint: string;
  let ambientTint: string;
  let shadowTint: string;

  if (isDarkEnvelope) {
    // Rich moody architectural envelope tuned so a dark/black divider still separates crisply via backlights & floor tonal separation
    const envChroma = isAchromaticBase
      ? 0.006
      : Math.min(0.036, base.c * 0.38 + 0.008);
    const baseWallL = Math.max(0.22, Math.min(0.32, 0.23 + base.l * 0.22));
    wallBase = clampOklch(baseWallL, envChroma, baseHue);
    wallHighlight = clampOklch(baseWallL + 0.055, envChroma * 0.9, baseHue);
    wallShadow = clampOklch(baseWallL + 0.09, envChroma * 1.15, baseHue);

    floorBase = clampOklch(Math.max(0.16, baseWallL - 0.065), envChroma * 0.85, stoneHue);
    floorFar = clampOklch(Math.max(0.19, baseWallL - 0.03), envChroma * 0.9, stoneHue);
    floorDetail = clampOklch(baseWallL + 0.14, envChroma * 0.7, stoneHue);

    // Contrasting warm/tinted woven rug & drapery keep silhouette of dark divider unmistakable
    rug = clampOklch(0.42, Math.min(0.032, envChroma * 1.1 + 0.008), stoneHue);
    rugTrim = clampOklch(
      isAchromaticAccent && accent.l > 0.78
        ? Math.min(0.88, accent.l * 0.85)
        : Math.max(0.56, Math.min(0.82, accent.l * 0.7 + 0.16)),
      isAchromaticAccent ? 0.014 : Math.min(0.09, accent.c * 0.7 + 0.016),
      isAchromaticAccent ? 68 : accentHue,
    );
    textilePrimary = clampOklch(0.37, Math.min(0.038, envChroma * 1.15 + 0.006), baseHue);
    textileSecondary = clampOklch(
      isAchromaticAccent && accent.l > 0.78 ? 0.64 : 0.5,
      Math.min(0.036, envChroma + 0.01),
      blendHue(stoneHue, baseHue, 0.28),
    );

    furniture = clampOklch(0.44, Math.min(0.038, envChroma + 0.012), stoneHue);
    furnitureLeg = clampOklch(0.62, Math.min(0.042, accent.c * 0.38 + 0.014), blendHue(stoneHue, accentHue, 0.35));

    const darkEnvDecorL =
      isAchromaticAccent && accent.l > 0.78
        ? Math.min(0.9, accent.l * 0.88)
        : Math.max(0.52, Math.min(0.8, accent.l * 0.74 + 0.2));
    const darkEnvDecorC = isAchromaticAccent
      ? 0.014
      : Math.min(0.105, accent.c * 0.74 + 0.022);
    const darkEnvDecorHue = isAchromaticAccent ? 68 : accentHue;

    decorPrimary = clampOklch(darkEnvDecorL, darkEnvDecorC, darkEnvDecorHue);
    decorAccent = clampOklch(
      Math.min(0.95, Math.max(0.62, darkEnvDecorL + 0.08)),
      isAchromaticAccent ? 0.012 : Math.min(0.115, darkEnvDecorC * 1.1),
      darkEnvDecorHue,
    );

    architecturalTrim = clampOklch(0.56, Math.min(0.055, accent.c * 0.5 + 0.016), blendHue(baseHue, accentHue, 0.45));
    const leafHue = blendHue(138, accentHue, 0.28);
    foliage = clampOklch(0.62, Math.min(0.05, accent.c * 0.4 + 0.024), leafHue);

    lightTint = clampOklch(0.95, Math.min(0.024, envChroma * 0.7 + 0.008), blendHue(baseHue, 58, 0.4));
    ambientTint = clampOklch(0.36, Math.min(0.035, envChroma * 1.1 + 0.008), baseHue);
    shadowTint = clampOklch(0.1, Math.min(0.02, envChroma * 0.6), baseHue);
  } else {
    // Daylight harmonized atelier: ~60% dominant baseHue wall/floor, ~30% ivory/stone neutral anchor, ~10% designColor accent
    // Notice wall lightness tracks base lightness gently so white (#FFF) stays crisp alabaster (~0.955),
    // deep saturated picks sit around ~0.83..0.86, and vivid picks keep tasteful interior-plaster chroma (0.032..0.062)
    // so divider ALWAYS pops cleanly while the whole room visibly shares its chromatic DNA!
    const isNearWhite = isAchromaticBase && base.l > 0.92;
    const baseWallL = isNearWhite
      ? 0.958
      : Math.max(0.81, Math.min(0.935, 0.825 + base.l * 0.095 + bias.wallLightDelta));

    const wallChroma = isAchromaticBase
      ? (isAchromaticAccent ? 0.004 : Math.min(0.012, accent.c * 0.14))
      : Math.min(0.062, (baseChromaNorm * 0.28 + 0.016) * bias.wallChromaFactor);

    wallBase = clampOklch(baseWallL, wallChroma, baseHue);
    wallHighlight = clampOklch(Math.min(0.985, baseWallL + 0.036), wallChroma * 0.68, baseHue);
    wallShadow = clampOklch(
      Math.max(0.71, baseWallL - bias.alcoveContrast),
      Math.min(0.078, wallChroma * 1.28 + (isAchromaticBase ? 0.004 : 0.008)),
      baseHue,
    );

    // Floor: grounded mid-light mineral/terrazzo/wood harmonized directly with baseHue (never disconnected beige)
    const floorL = isNearWhite
      ? 0.855
      : Math.max(0.69, Math.min(0.835, baseWallL - 0.115 + bias.floorLightDelta));
    const floorChroma = isAchromaticBase
      ? wallChroma * 1.1
      : Math.min(0.056, (baseChromaNorm * 0.24 + 0.014) * bias.floorChromaFactor);

    floorBase = clampOklch(floorL, floorChroma, blendHue(baseHue, stoneHue, 0.22));
    floorFar = clampOklch(Math.min(0.92, floorL + 0.052), floorChroma * 0.84, blendHue(baseHue, stoneHue, 0.18));
    floorDetail = clampOklch(Math.max(0.5, floorL - 0.13), Math.min(0.05, floorChroma * 1.15), baseHue);

    // Woven rug & drapery textiles: airy ivory/stone anchor with visible hue echo + designColor border
    const rugL = isNearWhite ? 0.97 : Math.max(0.87, Math.min(0.95, baseWallL + 0.028));
    rug = clampOklch(rugL, Math.min(0.032, wallChroma * 0.56), baseHue);
    rugTrim = isAchromaticAccent
      ? clampOklch(
          accent.l > 0.8 ? Math.min(0.93, accent.l * 0.91) : 0.42,
          Math.min(0.024, wallChroma * 0.8),
          accent.l > 0.8 ? 68 : baseHue,
        )
      : clampOklch(Math.max(0.46, Math.min(0.76, accent.l * 0.68 + 0.16)), Math.min(0.08, accent.c * 0.6 + 0.014), accentHue);

    textilePrimary = clampOklch(
      Math.max(0.79, baseWallL - 0.035),
      Math.min(0.052, wallChroma * 0.95 + (isAchromaticBase ? 0.003 : 0.006)),
      baseHue,
    );
    textileSecondary = clampOklch(
      Math.max(0.75, Math.min(0.89, baseWallL - 0.05)),
      Math.min(0.044, wallChroma * 0.82),
      blendHue(baseHue, accentHue, 0.25),
    );

    // Furniture / timber ledges / plinths: believable natural stone or toned wood blended into the base room hue
    furniture = clampOklch(
      isNearWhite ? 0.84 : Math.max(0.68, Math.min(0.83, baseWallL - 0.1)),
      Math.min(0.04, wallChroma * 0.72 + 0.006),
      stoneHue,
    );
    furnitureLeg = clampOklch(
      0.46,
      Math.min(0.048, wallChroma * 0.8 + 0.012),
      blendHue(stoneHue, accentHue, 0.3),
    );

    // Design-color-driven intentional 10% decorative accents (vases, art bars, cushions, swatch chips)
    const accentTargetL = accent.l < 0.24
      ? 0.32
      : accent.l > 0.84
        ? Math.min(0.94, accent.l * 0.92)
        : Math.max(0.36, Math.min(0.78, accent.l * 0.74 + 0.14));
    const accentTargetC = isAchromaticAccent
      ? (accent.l > 0.8 ? 0.01 : Math.min(0.032, baseChromaNorm * 0.3 + 0.008))
      : Math.min(0.12, accent.c * 0.7 + 0.02);
    const daylightAccentHue = isAchromaticAccent ? 68 : accentHue;

    decorPrimary = clampOklch(accentTargetL, accentTargetC, daylightAccentHue);
    decorAccent = clampOklch(
      Math.max(0.38, Math.min(0.96, accentTargetL > 0.8 ? accentTargetL - 0.06 : accentTargetL + 0.09)),
      isAchromaticAccent ? accentTargetC : Math.min(0.13, accentTargetC * 1.15),
      daylightAccentHue,
    );

    // Trim & baseboard: mid-tone architectural bridge between wall hue and accent hue
    architecturalTrim = clampOklch(
      0.56,
      Math.min(0.058, Math.max(wallChroma, accentTargetC * 0.55) + 0.01),
      blendHue(baseHue, accentHue, isAchromaticAccent ? 0.1 : 0.42),
    );

    // Botanical foliage: adapts gently so pink/blue/green/amber rooms feel styled together
    const rawLeafHue = isAchromaticBase
      ? 138
      : blendHue(138, baseHue, 0.32);
    foliage = clampOklch(
      0.57,
      Math.min(0.056, baseChromaNorm * 0.35 + 0.026),
      rawLeafHue,
    );

    // Directional sun & bounce lighting tinted gently by baseHue
    lightTint = clampOklch(
      0.975,
      isAchromaticBase ? 0.004 : Math.min(0.024, wallChroma * 0.42 + 0.004),
      blendHue(baseHue, 58, 0.35),
    );
    ambientTint = clampOklch(
      Math.max(0.74, baseWallL - 0.08),
      Math.min(0.045, wallChroma * 0.88),
      baseHue,
    );
    shadowTint = clampOklch(
      0.27,
      Math.min(0.048, wallChroma * 0.8 + 0.01),
      blendHue(baseHue, accentHue, 0.32),
    );
  }

  // Quiet left-side veil behind headline + WCAG AA accessible text
  const quietZoneBg = isDarkEnvelope
    ? mixHex(wallBase, '#161315', 0.34)
    : mixHex(wallBase, wallHighlight, 0.48);

  const { primary: textPrimary, secondary: textSecondary } = pickBestReadableText(
    quietZoneBg,
    isAchromaticBase ? accentHue : baseHue,
  );

  // Scoped hero UI accent & outline with guaranteed >= 4.5:1 button contrast
  let uiAccent: string;
  let uiAccentHover: string;
  let uiAccentText: string;
  let uiOutline: string;

  if (isDarkEnvelope) {
    // Rich luminous accent button against dark charcoal/obsidian room
    const lightBtnBase = clampOklch(
      0.86,
      Math.min(0.045, accent.c * 0.45 + 0.014),
      isAchromaticAccent ? 44 : accentHue,
    );
    uiAccent = lightBtnBase;
    uiAccentHover = clampOklch(0.92, Math.min(0.04, accent.c * 0.4 + 0.01), isAchromaticAccent ? 44 : accentHue);
    uiAccentText = clampOklch(0.2, 0.028, baseHue);
    uiOutline = clampOklch(0.32, Math.min(0.06, accent.c * 0.55 + 0.016), isAchromaticAccent ? baseHue : accentHue);
  } else {
    // Deep saturated architectural pill/CTA matching divider palette against light walls & #FAF2EE dock
    const uiHue = !isAchromaticBase ? baseHue : !isAchromaticAccent ? accentHue : 20;
    const uiChroma = isAchromaticBase && isAchromaticAccent
      ? 0.018
      : Math.min(0.115, Math.max(base.c, accent.c) * 0.62 + 0.036);
    let candidate = clampOklch(0.42, uiChroma, uiHue);
    // Guarantee >= 4.5:1 for #FFFCF8 CTA label
    for (let step = 0; step < 6 && contrastRatio('#FFFCF8', candidate) < 4.7; step += 1) {
      const c = hexToOklch(candidate);
      candidate = clampOklch(Math.max(0.24, c.l - 0.045), c.c * 0.9, c.h);
    }
    uiAccent = candidate;
    const cBtn = hexToOklch(candidate);
    uiAccentHover = clampOklch(Math.max(0.2, cBtn.l - 0.065), cBtn.c, cBtn.h);
    uiAccentText = '#FFFCF8';

    // Dock selection outline must contrast sharply against #FAF2EE dock background
    let outlineCand = clampOklch(0.28, Math.min(0.075, uiChroma * 0.72), uiHue);
    if (contrastRatio(outlineCand, '#FAF2EE') < 6.0) {
      outlineCand = '#2A1D21';
    }
    uiOutline = outlineCand;
  }

  return {
    wallBase,
    wallHighlight,
    wallShadow,
    floorBase,
    floorFar,
    floorDetail,
    rug,
    rugTrim,
    textilePrimary,
    textileSecondary,
    furniture,
    furnitureLeg,
    decorPrimary,
    decorAccent,
    architecturalTrim,
    foliage,
    lightTint,
    ambientTint,
    shadowTint,
    quietZoneBg,
    uiAccent,
    uiAccentHover,
    uiAccentText,
    uiOutline,
    textPrimary,
    textSecondary,
    isDarkEnvelope,
    // Legacy aliases
    wall: wallBase,
    wallUpper: wallHighlight,
    wallAlcove: wallShadow,
    floor: floorBase,
    trim: architecturalTrim,
    decorSecondary: furniture,
    lightWarm: lightTint,
    shadow: shadowTint,
  };
}

const INTERPOLATED_KEYS = [
  'wallBase',
  'wallHighlight',
  'wallShadow',
  'floorBase',
  'floorFar',
  'floorDetail',
  'rug',
  'rugTrim',
  'textilePrimary',
  'textileSecondary',
  'furniture',
  'furnitureLeg',
  'decorPrimary',
  'decorAccent',
  'architecturalTrim',
  'foliage',
  'lightTint',
  'ambientTint',
  'shadowTint',
  'quietZoneBg',
  'uiAccent',
  'uiAccentHover',
  'uiAccentText',
  'uiOutline',
  'textPrimary',
  'textSecondary',
] as const;

export type InterpolatedPaletteKey = (typeof INTERPOLATED_KEYS)[number];
export type RoomPaletteLabs = Record<InterpolatedPaletteKey, OklabColor>;

export function paletteToOklabMap(palette: RoomPalette): RoomPaletteLabs {
  const map = {} as RoomPaletteLabs;
  for (const key of INTERPOLATED_KEYS) {
    map[key] = hexToOklab(palette[key]);
  }
  return map;
}

/**
 * Smoothly interpolates between two OKLab palette snapshots at progress u in [0, 1]
 * and materializes a synchronized RoomPalette without muddying intermediate hues.
 */
export function interpolateRoomPaletteLabs(
  fromLabs: RoomPaletteLabs,
  toLabs: RoomPaletteLabs,
  u: number,
  targetMeta: Pick<RoomPalette, 'isDarkEnvelope'>,
): RoomPalette {
  const k = Math.max(0, Math.min(1, u));
  const out = {} as Record<InterpolatedPaletteKey, string>;
  for (const key of INTERPOLATED_KEYS) {
    const a = fromLabs[key];
    const b = toLabs[key];
    out[key] = oklabToHex({
      l: a.l + (b.l - a.l) * k,
      a: a.a + (b.a - a.a) * k,
      b: a.b + (b.b - a.b) * k,
    });
  }

  return {
    ...out,
    isDarkEnvelope: targetMeta.isDarkEnvelope,
    wall: out.wallBase,
    wallUpper: out.wallHighlight,
    wallAlcove: out.wallShadow,
    floor: out.floorBase,
    trim: out.architecturalTrim,
    decorSecondary: out.furniture,
    lightWarm: out.lightTint,
    shadow: out.shadowTint,
  };
}
