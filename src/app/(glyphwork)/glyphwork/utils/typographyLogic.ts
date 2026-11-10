export type SpecimenMode = 'display' | 'headline' | 'paragraph';
export type CaseMode = 'preserve' | 'upper' | 'lower';

export interface VariableAxesState {
  weight: number;      // 100 - 900 (default 720)
  width: number;       // 50 - 150 (default 135)
  tracking: number;    // -100 - 100 (default -4 -> -0.04em)
  slant: number;       // 0 - 15 degrees (default 3.5)
  opticalSize: number; // 8 - 144 pt (default 144)
  fontSize: number;    // 32 - 220 px (default 160)
}

export interface LabSnapshot {
  text: string;
  headlineText: string;
  paragraphText: string;
  mode: SpecimenMode;
  caseMode: CaseMode;
  axes: VariableAxesState;
  selectedGlyph: string;
}

export interface NodeCoordinate {
  id: string;
  x: number; // percentage 0-100 across glyph box
  y: number; // percentage 0-100 down glyph box
  label: string;
  type: 'on-curve' | 'off-curve' | 'extremum';
}

export interface GlyphAnatomy {
  char: string;
  unicode: string;
  name: string;
  category: string;
  baseAdvanceWidth: number; // out of 1000 EM
  leftSidebearing: number;
  rightSidebearing: number;
  bezierNodes: number;
  extremumPoints: number;
  counterAperture: string;
  constructionNote: string;
  nodeCoordinates: NodeCoordinate[];
}

export interface ComputedGlyphMetrics extends GlyphAnatomy {
  effectiveAdvanceEm: number;
  effectiveLsb: number;
  effectiveRsb: number;
  stemWeightUnits: number;
  slantOffsetPx: number;
}

export const DEFAULT_AXES: VariableAxesState = {
  weight: 720,
  width: 135,
  tracking: -4,
  slant: 3.5,
  opticalSize: 144,
  fontSize: 160,
};

export const DEFAULT_SNAPSHOT: LabSnapshot = {
  text: 'GLYPHWORK',
  headlineText: 'PRECISION SWISS GROTESQUE ENGINEERED FOR CONTINUOUS PARAMETRIC INTERPOLATION.',
  paragraphText:
    'GLYPHWORK Sans Variable is constructed on a 1000-unit em-square with continuous parametric control over weight, width, optical size, and oblique slant. Designed in Zurich and Geneva for editorial environments, kinetic architectures, and high-density technical instrumentation.',
  mode: 'display',
  caseMode: 'preserve',
  axes: { ...DEFAULT_AXES },
  selectedGlyph: 'G',
};

export const SPECIMEN_PRESETS: Array<{
  id: string;
  label: string;
  mode: SpecimenMode;
  word: string;
  headline: string;
  paragraph: string;
  axesPartial?: Partial<VariableAxesState>;
}> = [
  {
    id: 'foundry-default',
    label: '01 / GLYPHWORK STANDARD',
    mode: 'display',
    word: 'GLYPHWORK',
    headline: 'PRECISION SWISS GROTESQUE ENGINEERED FOR CONTINUOUS PARAMETRIC INTERPOLATION.',
    paragraph:
      'GLYPHWORK Sans Variable is constructed on a 1000-unit em-square with continuous parametric control over weight, width, optical size, and oblique slant. Designed in Zurich and Geneva for editorial environments, kinetic architectures, and high-density technical instrumentation.',
    axesPartial: { weight: 720, width: 135, tracking: -4, slant: 3.5, opticalSize: 144 },
  },
  {
    id: 'kinetic-condensed',
    label: '02 / ULTRA CONDENSED',
    mode: 'display',
    word: 'METRICFIELD',
    headline: 'COMPRESSED VERTICAL PROPORTIONS FOR ARCHITECTURAL SIGNAGE & NARROW COLUMNS.',
    paragraph:
      'At Width 62 and Weight 840, interior counters tighten into vertical slots while maintaining uniform stem density across uppercase and lowercase ascenders. Ideal for brutalist posters and tabular schedules.',
    axesPartial: { weight: 840, width: 62, tracking: -2, slant: 0, opticalSize: 144 },
  },
  {
    id: 'editorial-wide',
    label: '03 / EXTENDED MONOGRAPH',
    mode: 'headline',
    word: 'SYNTHESIS',
    headline: 'WIDE APERTURE GEOMETRY WITH CALIBRATED OPTICAL COMPENSATION AT 150% EXPANSION.',
    paragraph:
      'Horizontal expansion redistributes curvature tension along the bowls of O, G, C, and R without over-thickening horizontal crossbars. Tuned specifically for exhibition titles and terminal headers.',
    axesPartial: { weight: 540, width: 148, tracking: -18, slant: 6.5, opticalSize: 96 },
  },
  {
    id: 'micro-text',
    label: '04 / TECHNICAL BODY',
    mode: 'paragraph',
    word: 'INSTRUMENT',
    headline: 'HIGH-X-HEIGHT TEXT CUT FOR LONG-FORM CATALOGS, SPEC SHEETS & FOOTNOTES.',
    paragraph:
      'In small optical sizes (8pt–16pt), ink traps open subtly at acute junctions in W, M, K, and N while x-height proportion holds steady at 520 units, preserving clarity on uncoated archival paper and high-DPI displays.',
    axesPartial: { weight: 420, width: 105, tracking: 8, slant: 0, opticalSize: 16 },
  },
];

export function clampAxis(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function formatTrackingDisplay(tracking: number): string {
  const emVal = tracking / 100;
  const formatted = emVal.toFixed(2);
  if (emVal > 0) return `+${formatted}`;
  if (Object.is(emVal, -0) || formatted === '-0.00') return '0.00';
  return formatted;
}

export function formatTrackingCss(tracking: number): string {
  const emVal = tracking / 1000;
  return `${emVal.toFixed(3)}em`;
}

export function formatSlantDisplay(slant: number): string {
  return `${Number(slant).toFixed(1)}°`;
}

export function buildFontVariationSettings(axes: VariableAxesState): string {
  const wght = Math.round(clampAxis(axes.weight, 100, 900));
  const wdth = Math.round(clampAxis(axes.width, 50, 150));
  // Roboto Flex 'slnt' axis ranges from -10 to 0
  const slnt = -Number(clampAxis((axes.slant / 15) * 10, 0, 10).toFixed(2));
  const opsz = Math.round(clampAxis(axes.opticalSize, 8, 144));
  return `'wght' ${wght}, 'wdth' ${wdth}, 'slnt' ${slnt}, 'opsz' ${opsz}`;
}

export function computeGuideMetrics(axes: VariableAxesState, charCount = 9) {
  const capHeightPt = Math.round(840 + (axes.weight - 720) * 0.05);
  const xHeightPt = Math.round(520 + (axes.opticalSize - 144) * -0.12 + (axes.weight - 720) * 0.04);
  const estimatedWidthPx = Math.round(
    charCount * 102 * (axes.width / 100) * (1 + axes.tracking / 1000)
  );
  const trackingRatio = Number((axes.tracking / 200).toFixed(2));
  return {
    capHeightLabel: `CAP-HEIGHT // ${capHeightPt}pt`,
    xHeightLabel: `X-HEIGHT // ${xHeightPt}pt`,
    baselineLabel: `BASELINE // 0.00px`,
    coordinateReadout: `w: ${estimatedWidthPx} t: ${trackingRatio >= 0 ? `+${trackingRatio.toFixed(2)}` : trackingRatio.toFixed(2)}`,
    capHeightRatio: Number((capHeightPt / 1000).toFixed(3)),
    xHeightRatio: Number((xHeightPt / 1000).toFixed(3)),
  };
}

export function applyCaseTransform(text: string, caseMode: CaseMode): string {
  if (caseMode === 'upper') return text.toUpperCase();
  if (caseMode === 'lower') return text.toLowerCase();
  return text;
}

export function isSameAxes(a: VariableAxesState, b: VariableAxesState): boolean {
  return (
    a.weight === b.weight &&
    a.width === b.width &&
    a.tracking === b.tracking &&
    a.slant === b.slant &&
    a.opticalSize === b.opticalSize &&
    a.fontSize === b.fontSize
  );
}

export function isSameSnapshot(a: LabSnapshot, b: LabSnapshot): boolean {
  return (
    a.text === b.text &&
    a.headlineText === b.headlineText &&
    a.paragraphText === b.paragraphText &&
    a.mode === b.mode &&
    a.caseMode === b.caseMode &&
    a.selectedGlyph === b.selectedGlyph &&
    isSameAxes(a.axes, b.axes)
  );
}

export function pushHistory(
  history: LabSnapshot[],
  snapshot: LabSnapshot,
  maxLen = 25
): LabSnapshot[] {
  const last = history[history.length - 1];
  if (last && isSameSnapshot(last, snapshot)) {
    return history;
  }
  const cloned: LabSnapshot = {
    ...snapshot,
    axes: { ...snapshot.axes },
  };
  const next = [...history, cloned];
  if (next.length > maxLen) {
    return next.slice(next.length - maxLen);
  }
  return next;
}

export function popHistory(
  history: LabSnapshot[],
  current: LabSnapshot
): { restored: LabSnapshot; nextHistory: LabSnapshot[] } {
  if (history.length === 0) {
    return { restored: current, nextHistory: [] };
  }
  const last = history[history.length - 1];
  const remaining = history.slice(0, -1);
  return {
    restored: {
      ...last,
      axes: { ...last.axes },
    },
    nextHistory: remaining,
  };
}

const GLYPH_CATALOG: Record<string, GlyphAnatomy> = {
  G: {
    char: 'G',
    unicode: 'U+0047',
    name: 'LATIN CAPITAL LETTER G',
    category: 'Uppercase / Grotesque Spur & Crossbar',
    baseAdvanceWidth: 712,
    leftSidebearing: 54,
    rightSidebearing: 48,
    bezierNodes: 28,
    extremumPoints: 10,
    counterAperture: '310 EM Open Throat',
    constructionNote:
      'Constructed with a deep horizontal spur bar aligned strictly to the 520pt x-height axis, balancing super-elliptical outer bowl tension against a vertical right terminal.',
    nodeCoordinates: [
      { id: 'n1', x: 48, y: 12, label: '01 / TOP EXTREMUM (840)', type: 'extremum' },
      { id: 'n2', x: 78, y: 27, label: '02 / UPPER APERTURE TERMINAL', type: 'on-curve' },
      { id: 'n3', x: 72, y: 50, label: '03 / CROSSBAR JUNCTION (520)', type: 'on-curve' },
      { id: 'n4', x: 16, y: 56, label: '04 / LEFT SPINE EXTREMUM', type: 'extremum' },
      { id: 'n5', x: 32, y: 90, label: '05 / BASELINE OVERSHOOT (-14)', type: 'extremum' },
      { id: 'n6', x: 80, y: 78, label: '06 / SPUR TERMINAL', type: 'on-curve' },
    ],
  },
  L: {
    char: 'L',
    unicode: 'U+004C',
    name: 'LATIN CAPITAL LETTER L',
    category: 'Uppercase / Orthogonal Rectilinear',
    baseAdvanceWidth: 590,
    leftSidebearing: 68,
    rightSidebearing: 32,
    bezierNodes: 8,
    extremumPoints: 4,
    counterAperture: '480 EM Open Quadrant',
    constructionNote:
      'Pure orthogonal stem-to-arm construction with 4-unit interior optical tapering at the baseline corner to counteract dark ink pooling at heavy display weights.',
    nodeCoordinates: [
      { id: 'n1', x: 26, y: 15, label: '01 / ASCENDER CAP HEAD', type: 'on-curve' },
      { id: 'n2', x: 44, y: 15, label: '02 / INNER STEM VERTEX', type: 'on-curve' },
      { id: 'n3', x: 44, y: 74, label: '03 / CORNER OPTICAL TRAP', type: 'on-curve' },
      { id: 'n4', x: 80, y: 85, label: '04 / BASELINE ARM TERMINAL', type: 'extremum' },
    ],
  },
  Y: {
    char: 'Y',
    unicode: 'U+0059',
    name: 'LATIN CAPITAL LETTER Y',
    category: 'Uppercase / Symmetrical Diagonal Fork',
    baseAdvanceWidth: 660,
    leftSidebearing: 28,
    rightSidebearing: 28,
    bezierNodes: 14,
    extremumPoints: 6,
    counterAperture: '54° Vertex Crotch',
    constructionNote:
      'Diagonal arms converge precisely at 46% cap-height with micro-excavated crotch geometry that preserves negative counter space across wide and bold interpolations.',
    nodeCoordinates: [
      { id: 'n1', x: 18, y: 15, label: '01 / LEFT DIAGONAL APEX', type: 'extremum' },
      { id: 'n2', x: 50, y: 49, label: '02 / CROTCH INK-TRAP VERTEX', type: 'on-curve' },
      { id: 'n3', x: 82, y: 15, label: '03 / RIGHT DIAGONAL APEX', type: 'extremum' },
      { id: 'n4', x: 50, y: 85, label: '04 / CENTRAL STEM FOOT', type: 'extremum' },
    ],
  },
  P: {
    char: 'P',
    unicode: 'U+0050',
    name: 'LATIN CAPITAL LETTER P',
    category: 'Uppercase / Closed Asymmetric Bowl',
    baseAdvanceWidth: 654,
    leftSidebearing: 66,
    rightSidebearing: 44,
    bezierNodes: 18,
    extremumPoints: 7,
    counterAperture: '240 EM Enclosed Bowl',
    constructionNote:
      'Lower bowl sweep locks below the 520pt x-height line at 445 units, creating a generous upper counter that stays crisp down to 8pt micro optical sizes.',
    nodeCoordinates: [
      { id: 'n1', x: 24, y: 15, label: '01 / VERTICAL STEM HEAD', type: 'on-curve' },
      { id: 'n2', x: 80, y: 36, label: '02 / BOWL OUTER EXTREMUM', type: 'extremum' },
      { id: 'n3', x: 42, y: 56, label: '03 / BOWL-TO-STEM JOIN', type: 'on-curve' },
      { id: 'n4', x: 24, y: 85, label: '04 / STEM BASELINE TERMINAL', type: 'extremum' },
    ],
  },
  H: {
    char: 'H',
    unicode: 'U+0048',
    name: 'LATIN CAPITAL LETTER H',
    category: 'Uppercase / Bilateral Pillar Standard',
    baseAdvanceWidth: 728,
    leftSidebearing: 68,
    rightSidebearing: 68,
    bezierNodes: 12,
    extremumPoints: 4,
    counterAperture: 'Dual Symmetric Bays',
    constructionNote:
      'The primary metric calibration glyph for uppercase spacing. Crossbar top edge aligns mathematically with the 520pt x-height reference rail.',
    nodeCoordinates: [
      { id: 'n1', x: 22, y: 15, label: '01 / LEFT PILLAR CAP', type: 'extremum' },
      { id: 'n2', x: 50, y: 48, label: '02 / CROSSBAR X-HEIGHT LOCK', type: 'on-curve' },
      { id: 'n3', x: 78, y: 15, label: '03 / RIGHT PILLAR CAP', type: 'extremum' },
      { id: 'n4', x: 78, y: 85, label: '04 / RIGHT PILLAR BASE', type: 'extremum' },
    ],
  },
  W: {
    char: 'W',
    unicode: 'U+0057',
    name: 'LATIN CAPITAL LETTER W',
    category: 'Uppercase / Quadruple Diagonal Truss',
    baseAdvanceWidth: 948,
    leftSidebearing: 24,
    rightSidebearing: 24,
    bezierNodes: 22,
    extremumPoints: 9,
    counterAperture: 'Triple Acute Triangles',
    constructionNote:
      'Engineered with progressive diagonal stroke thinning on interior strokes (88% of outer stroke weight) and deep vertical ink traps to prevent dark spot clumping.',
    nodeCoordinates: [
      { id: 'n1', x: 14, y: 15, label: '01 / OUTER LEFT SHOULDER', type: 'extremum' },
      { id: 'n2', x: 50, y: 24, label: '02 / CENTRAL APEX VERTEX', type: 'extremum' },
      { id: 'n3', x: 33, y: 85, label: '03 / PRIMARY NADIR TRAP', type: 'extremum' },
      { id: 'n4', x: 67, y: 85, label: '04 / SECONDARY NADIR TRAP', type: 'extremum' },
      { id: 'n5', x: 86, y: 15, label: '05 / OUTER RIGHT SHOULDER', type: 'extremum' },
    ],
  },
  O: {
    char: 'O',
    unicode: 'U+004F',
    name: 'LATIN CAPITAL LETTER O',
    category: 'Uppercase / Super-Elliptical Annulus',
    baseAdvanceWidth: 740,
    leftSidebearing: 46,
    rightSidebearing: 46,
    bezierNodes: 24,
    extremumPoints: 8,
    counterAperture: '420 EM Rectangular Ovoid',
    constructionNote:
      'Constructed with flattened vertical flanks and 14-unit top/bottom optical overshoots beyond Cap-Height (840pt) and Baseline (0pt) for visual equilibrium.',
    nodeCoordinates: [
      { id: 'n1', x: 50, y: 13, label: '01 / ZENITH OVERSHOOT (+14)', type: 'extremum' },
      { id: 'n2', x: 17, y: 50, label: '02 / WEST FLANK EXTREMUM', type: 'extremum' },
      { id: 'n3', x: 83, y: 50, label: '03 / EAST FLANK EXTREMUM', type: 'extremum' },
      { id: 'n4', x: 50, y: 87, label: '04 / NADIR OVERSHOOT (-14)', type: 'extremum' },
      { id: 'n5', x: 26, y: 26, label: '05 / SUPER-ELLIPSE HANDLE A', type: 'off-curve' },
      { id: 'n6', x: 74, y: 74, label: '06 / SUPER-ELLIPSE HANDLE B', type: 'off-curve' },
    ],
  },
  R: {
    char: 'R',
    unicode: 'U+0052',
    name: 'LATIN CAPITAL LETTER R',
    category: 'Uppercase / Bowl & Diagonal Leg',
    baseAdvanceWidth: 692,
    leftSidebearing: 66,
    rightSidebearing: 36,
    bezierNodes: 23,
    extremumPoints: 8,
    counterAperture: '230 EM Bowl + Open Leg',
    constructionNote:
      'Features a taut diagonal leg emerging from the bowl underside rather than the stem junction, imparting unmistakable neo-grotesque Swiss authority.',
    nodeCoordinates: [
      { id: 'n1', x: 23, y: 15, label: '01 / STEM CAP VERTEX', type: 'on-curve' },
      { id: 'n2', x: 78, y: 34, label: '02 / UPPER BOWL EXTREMUM', type: 'extremum' },
      { id: 'n3', x: 56, y: 54, label: '03 / LEG TAKEOFF CANTILEVER', type: 'on-curve' },
      { id: 'n4', x: 82, y: 85, label: '04 / DIAGONAL FOOT TERMINAL', type: 'extremum' },
    ],
  },
  K: {
    char: 'K',
    unicode: 'U+004B',
    name: 'LATIN CAPITAL LETTER K',
    category: 'Uppercase / Braced Diagonal Kicker',
    baseAdvanceWidth: 688,
    leftSidebearing: 66,
    rightSidebearing: 28,
    bezierNodes: 17,
    extremumPoints: 6,
    counterAperture: 'Dual Asymmetric Wedges',
    constructionNote:
      'A double-jointed structure where the lower leg braces directly into the upper arm at the x-height line (520pt), echoing Swiss railway specimen lettering.',
    nodeCoordinates: [
      { id: 'n1', x: 23, y: 15, label: '01 / VERTICAL SPINE HEAD', type: 'on-curve' },
      { id: 'n2', x: 79, y: 15, label: '02 / UPPER ARM TERMINAL', type: 'extremum' },
      { id: 'n3', x: 46, y: 49, label: '03 / DOUBLE-JOINT INTERSECTION', type: 'on-curve' },
      { id: 'n4', x: 83, y: 85, label: '04 / KICKER BASE TERMINAL', type: 'extremum' },
    ],
  },
  F: {
    char: 'F',
    unicode: 'U+0046',
    name: 'LATIN CAPITAL LETTER F',
    category: 'Uppercase / Cantilevered Twin Bar',
    baseAdvanceWidth: 598,
    leftSidebearing: 66,
    rightSidebearing: 40,
    bezierNodes: 10,
    extremumPoints: 5,
    counterAperture: 'Open Lower Bay',
    constructionNote:
      'Lower crossbar sits at 520pt x-height and terminates 36 units recessed from the upper arm to maintain crisp silhouette differentiation from E.',
    nodeCoordinates: [
      { id: 'n1', x: 24, y: 15, label: '01 / CAP HEAD CORNER', type: 'on-curve' },
      { id: 'n2', x: 78, y: 15, label: '02 / TOP CANTILEVER TERMINAL', type: 'extremum' },
      { id: 'n3', x: 70, y: 48, label: '03 / MEDIAN BAR TERMINAL', type: 'on-curve' },
      { id: 'n4', x: 24, y: 85, label: '04 / STEM FOOT', type: 'extremum' },
    ],
  },
  A: {
    char: 'A',
    unicode: 'U+0041',
    name: 'LATIN CAPITAL LETTER A',
    category: 'Uppercase / Triangular Apex Arch',
    baseAdvanceWidth: 684,
    leftSidebearing: 22,
    rightSidebearing: 22,
    bezierNodes: 16,
    extremumPoints: 6,
    counterAperture: 'Enclosed Delta Counter',
    constructionNote:
      'Flat-topped apex spans 112 units at default width with an interior ink-trap notch that prevents counter collapse at Weight 900.',
    nodeCoordinates: [
      { id: 'n1', x: 50, y: 15, label: '01 / APEX PLATEAU', type: 'extremum' },
      { id: 'n2', x: 50, y: 31, label: '02 / COUNTER NOTCH TRAP', type: 'on-curve' },
      { id: 'n3', x: 34, y: 62, label: '03 / CROSSBAR LEFT TIE', type: 'on-curve' },
      { id: 'n4', x: 84, y: 85, label: '04 / RIGHT LEG BASE', type: 'extremum' },
    ],
  },
  B: {
    char: 'B',
    unicode: 'U+0042',
    name: 'LATIN CAPITAL LETTER B',
    category: 'Uppercase / Stacked Double Bowl',
    baseAdvanceWidth: 678,
    leftSidebearing: 66,
    rightSidebearing: 42,
    bezierNodes: 26,
    extremumPoints: 9,
    counterAperture: 'Upper 46% / Lower 54% Ratio',
    constructionNote:
      'Upper bowl is optically narrower by 24 EM units than the lower bowl, anchoring gravitational center below the 520pt x-height line.',
    nodeCoordinates: [
      { id: 'n1', x: 24, y: 15, label: '01 / SPINE TOP VERTEX', type: 'on-curve' },
      { id: 'n2', x: 76, y: 31, label: '02 / UPPER BOWL EXTREMUM', type: 'extremum' },
      { id: 'n3', x: 56, y: 48, label: '03 / WAIST INDENT JUNCTION', type: 'on-curve' },
      { id: 'n4', x: 81, y: 68, label: '04 / LOWER BOWL EXTREMUM', type: 'extremum' },
    ],
  },
  r: {
    char: 'r',
    unicode: 'U+0072',
    name: 'LATIN SMALL LETTER R',
    category: 'Lowercase / Single-Shoulder Terminal',
    baseAdvanceWidth: 412,
    leftSidebearing: 58,
    rightSidebearing: 26,
    bezierNodes: 13,
    extremumPoints: 5,
    counterAperture: 'Open Right Shoulder',
    constructionNote:
      'Features a deep V-shaped junction between vertical stem and arched shoulder, maintaining rhythmic spacing in dense lowercase text blocks.',
    nodeCoordinates: [
      { id: 'n1', x: 30, y: 38, label: '01 / X-HEIGHT STEM TOP', type: 'on-curve' },
      { id: 'n2', x: 46, y: 45, label: '02 / SHOULDER INK TRAP', type: 'on-curve' },
      { id: 'n3', x: 76, y: 39, label: '03 / ARCH TERMINAL', type: 'extremum' },
      { id: 'n4', x: 30, y: 85, label: '04 / BASELINE STEM FOOT', type: 'extremum' },
    ],
  },
};

export function getGlyphAnatomy(rawChar: string): GlyphAnatomy {
  const cleanChar = (rawChar || 'G').trim().charAt(0) || 'G';
  if (GLYPH_CATALOG[cleanChar]) {
    return GLYPH_CATALOG[cleanChar];
  }
  const upperFallback = cleanChar.toUpperCase();
  if (GLYPH_CATALOG[upperFallback]) {
    const base = GLYPH_CATALOG[upperFallback];
    const code = cleanChar.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
    return {
      ...base,
      char: cleanChar,
      unicode: `U+${code}`,
      name:
        cleanChar === cleanChar.toLowerCase()
          ? base.name.replace('CAPITAL', 'SMALL')
          : base.name,
    };
  }
  const codePoint = cleanChar.charCodeAt(0);
  const hex = codePoint.toString(16).toUpperCase().padStart(4, '0');
  return {
    char: cleanChar,
    unicode: `U+${hex}`,
    name: `GLYPH SPECIMEN CHARACTER '${cleanChar}'`,
    category: codePoint >= 48 && codePoint <= 57 ? 'Tabular Numeral / 1000 EM' : 'Parametric Latin Glyph',
    baseAdvanceWidth: 640,
    leftSidebearing: 50,
    rightSidebearing: 50,
    bezierNodes: 20,
    extremumPoints: 8,
    counterAperture: 'Calibrated Parametric Counter',
    constructionNote:
      'Constructed on the 1000-unit master grid with synchronized horizontal and vertical stem interpolation across all four variable axes.',
    nodeCoordinates: [
      { id: 'n1', x: 50, y: 15, label: '01 / NORTH EXTREMUM', type: 'extremum' },
      { id: 'n2', x: 22, y: 50, label: '02 / WEST CONTOUR NODE', type: 'on-curve' },
      { id: 'n3', x: 78, y: 50, label: '03 / EAST CONTOUR NODE', type: 'on-curve' },
      { id: 'n4', x: 50, y: 85, label: '04 / BASELINE ANCHOR', type: 'extremum' },
    ],
  };
}

export function computeLiveGlyphMetrics(
  rawChar: string,
  axes: VariableAxesState
): ComputedGlyphMetrics {
  const base = getGlyphAnatomy(rawChar);
  const widthFactor = axes.width / 100;
  const weightDelta = (axes.weight - 400) * 0.08;
  const effectiveAdvanceEm = Math.round(
    base.baseAdvanceWidth * widthFactor + weightDelta + axes.tracking
  );
  const effectiveLsb = Math.round(base.leftSidebearing * (0.85 + widthFactor * 0.15) + axes.tracking * 0.5);
  const effectiveRsb = Math.round(
    base.rightSidebearing * (0.85 + widthFactor * 0.15) + axes.tracking * 0.5
  );
  const stemWeightUnits = Math.round(38 + ((axes.weight - 100) / 800) * 142);
  const slantOffsetPx = Number((Math.tan((axes.slant * Math.PI) / 180) * 840).toFixed(1));

  return {
    ...base,
    effectiveAdvanceEm,
    effectiveLsb,
    effectiveRsb,
    stemWeightUnits,
    slantOffsetPx,
  };
}

export type LicenseTierId = 'desktop-web' | 'editorial-studio' | 'broadcast-kinetic' | 'enterprise-oem';

export interface LicenseTierSpec {
  id: LicenseTierId;
  code: string;
  name: string;
  subtitle: string;
  basePrice: number;
  formats: string[];
  includedAxes: string;
  rights: string[];
}

export const LICENSE_TIERS: LicenseTierSpec[] = [
  {
    id: 'desktop-web',
    code: 'LIC-01 // INDIE',
    name: 'Desktop & Web Starter',
    subtitle: 'For independent designers, small studios, and personal specimen publications.',
    basePrice: 49,
    formats: ['.WOFF2 Variable', '.OTF Static (18 Cuts)', '.TTF Variable'],
    includedAxes: 'wght (100–900) · wdth (50–150) · slnt (0–15°) · opsz (8–144)',
    rights: ['Up to 5 workstations', '100k monthly web pageviews', 'Unlimited print runs', 'Commercial client work'],
  },
  {
    id: 'editorial-studio',
    code: 'LIC-02 // STUDIO',
    name: 'Multi-Seat Editorial & Brand',
    subtitle: 'Full variable suite for agencies, architectural practices, and cultural institutions.',
    basePrice: 140,
    formats: ['.WOFF2 Variable', '.OTF Static (18 Cuts)', '.TTF Variable', 'Figma / Variable CSS Kit'],
    includedAxes: 'All 4 Primary Axes + Parametric Grade (GRAD)',
    rights: ['Up to 25 workstations', '1M monthly web pageviews', 'Packaging & environmental signage', 'App & EPUB embedding'],
  },
  {
    id: 'broadcast-kinetic',
    code: 'LIC-03 // KINETIC',
    name: 'Broadcast, Motion & Exhibition',
    subtitle: 'For title sequences, kinetic installations, museum projections, and generative software.',
    basePrice: 290,
    formats: ['.WOFF2', '.OTF', '.TTF', 'After Effects / Cavalry Rig', 'Raw SVG Contour Spec'],
    includedAxes: 'Full 12-Axis Parametric Master Access',
    rights: ['Unlimited motion seats', 'Worldwide broadcast & cinema', 'Hardware display & kiosk embedding', 'Priority foundry engineering support'],
  },
];

export function calculateLicenseQuote(
  tierId: LicenseTierId,
  seatMultiplierIndex: number, // 0 = 1x (1-5), 1 = 2x (6-25), 2 = 4x (26-100)
  includeAcademicDiscount: boolean
): {
  tier: LicenseTierSpec;
  subtotal: number;
  discountAmount: number;
  total: number;
  formattedTotal: string;
  seatLabel: string;
} {
  const tier = LICENSE_TIERS.find((t) => t.id === tierId) || LICENSE_TIERS[0];
  const multipliers = [1, 1.8, 3.2];
  const seatLabels = ['1–5 Seats / 100k Views', '6–25 Seats / 1M Views', '26–100 Seats / Unlimited'];
  const idx = clampAxis(seatMultiplierIndex, 0, 2);
  const subtotal = Math.round(tier.basePrice * multipliers[idx]);
  const discountAmount = includeAcademicDiscount ? Math.round(subtotal * 0.4) : 0;
  const total = Math.max(29, subtotal - discountAmount);

  return {
    tier,
    subtotal,
    discountAmount,
    total,
    formattedTotal: `$${total}`,
    seatLabel: seatLabels[idx],
  };
}

export function validateSpecimenEmail(rawEmail: string): {
  valid: boolean;
  error?: string;
  dispatchCode?: string;
} {
  const trimmed = rawEmail.trim();
  if (!trimmed) {
    return { valid: false, error: 'ENTER VALID EMAIL ADDRESS FOR SPECIMEN DISPATCH' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'INVALID ADDRESS SYNTAX — FORMAT: USER@DOMAIN.TLD' };
  }
  const hash = trimmed
    .split('')
    .reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) % 9000 + 1000, 1014);
  return {
    valid: true,
    dispatchCode: `SPEC-090-${hash}`,
  };
}
