import type { DesignState } from './state';

export type PrintId = 'solid' | 'bloom' | 'stripes' | 'landscape' | 'waves' | 'upload';
export type ViewId = 'front' | 'quarter' | 'side' | 'back';

export interface ColorPreset {
  id: string;
  name: string;
  hex: string;
  description: string;
}

export interface PrintSpec {
  id: PrintId;
  name: string;
  subtitle: string;
  scaleLabel: string;
  usesDesignColor: boolean;
  usesScale: boolean;
}

export interface ViewState {
  yawDeg: number;
  elevationDeg: number;
}

export interface ViewSpec {
  id: ViewId;
  label: string;
  yawDeg: number;
  elevationDeg: number;
}

export const PALETTE = {
  rose: '#F3E8E4',
  oxblood: '#4B202A',
  clay: '#9A463D',
  mauve: '#735B60',
  flax: '#D8C4A7',
  sage: '#A6B3A0',
  porcelain: '#FFFCF8',
} as const;

export const FOLD_CONSTANTS = {
  panels: 16,
  panelPitch: 0.18,
  height: 1.6,
  thickness: 0.012,
  developedLength: 16 * 0.18,
  closedAngleDeg: 76,
  openAngleDeg: 18,
  defaultOpening: 50,
  footWidth: 0.1,
  footDepth: 0.38,
  footHeight: 0.012,
  cameraFovDeg: 31,
  cameraNear: 0.08,
  cameraFar: 140,
  cameraFitPadding: 1.04,
  minElevationDeg: 5,
  maxElevationDeg: 30,
  rotateStepDeg: 15,
} as const;

/**
 * Curated architectural textile felt swatches (8-12 chips, always including Clay, Flax, Sage).
 */
export const COLOR_PRESETS: readonly ColorPreset[] = [
  { id: 'clay', name: 'Clay', hex: '#9A463D', description: 'Warm iron-earth wool felt' },
  { id: 'flax', name: 'Flax', hex: '#D8C4A7', description: 'Unbleached natural oat felt' },
  { id: 'sage', name: 'Sage', hex: '#A6B3A0', description: 'Muted mineral green felt' },
  { id: 'oxblood', name: 'Oxblood', hex: '#4B202A', description: 'Deep plum-oxblood ink' },
  { id: 'porcelain', name: 'Porcelain', hex: '#FFFCF8', description: 'Warm chalk ivory felt' },
  { id: 'rose', name: 'Rose', hex: '#F3E8E4', description: 'Blush plaster felt' },
  { id: 'ochre', name: 'Ochre', hex: '#C68D47', description: 'Raw sienna wool felt' },
  { id: 'slate', name: 'Slate', hex: '#4D657A', description: 'Soft indigo mineral felt' },
  { id: 'pine', name: 'Pine', hex: '#2E5240', description: 'Deep botanical green felt' },
  { id: 'charcoal', name: 'Charcoal', hex: '#2B2426', description: 'Warm smoked umber felt' },
] as const;

export const PRINT_SPECS: Record<PrintId, PrintSpec> = {
  bloom: {
    id: 'bloom',
    name: 'Bloom',
    subtitle: 'Botanical stems across pleats',
    scaleLabel: 'Motif size',
    usesDesignColor: true,
    usesScale: true,
  },
  stripes: {
    id: 'stripes',
    name: 'Stripes',
    subtitle: 'Alternating woven lines',
    scaleLabel: 'Motif size',
    usesDesignColor: true,
    usesScale: true,
  },
  landscape: {
    id: 'landscape',
    name: 'Landscape',
    subtitle: 'Full-width hills & horizon sun',
    scaleLabel: 'Artwork zoom',
    usesDesignColor: true,
    usesScale: true,
  },
  waves: {
    id: 'waves',
    name: 'Waves',
    subtitle: 'Flowing contour ribbons',
    scaleLabel: 'Motif size',
    usesDesignColor: true,
    usesScale: true,
  },
  solid: {
    id: 'solid',
    name: 'Solid',
    subtitle: 'Pure textured wool felt',
    scaleLabel: 'Motif size',
    usesDesignColor: false,
    usesScale: false,
  },
  upload: {
    id: 'upload',
    name: 'Your image',
    subtitle: 'Browser-only artwork',
    scaleLabel: 'Artwork zoom',
    usesDesignColor: false,
    usesScale: true,
  },
};

export const BUILTIN_PRINT_ORDER: PrintId[] = [
  'bloom',
  'stripes',
  'landscape',
  'waves',
  'solid',
];

export const DEFAULT_DESIGN: DesignState = {
  opening: FOLD_CONSTANTS.defaultOpening,
  baseHex: '#D8C4A7',
  designHex: '#4B202A',
  print: 'bloom',
  motifScale: 100,
  tintUpload: false,
};

export const DEFAULT_VIEW: ViewState = {
  yawDeg: 34,
  elevationDeg: 20,
};

export const VIEW_PRESETS: Record<ViewId, ViewSpec> = {
  front: {
    id: 'front',
    label: 'Front',
    yawDeg: 0,
    elevationDeg: 6,
  },
  quarter: {
    id: 'quarter',
    label: 'Three quarter',
    yawDeg: 34,
    elevationDeg: 20,
  },
  side: {
    id: 'side',
    label: 'Side',
    yawDeg: 84,
    elevationDeg: 9,
  },
  back: {
    id: 'back',
    label: 'Back',
    yawDeg: 180,
    elevationDeg: 14,
  },
};

export const VIEW_ORDER: ViewId[] = ['front', 'quarter', 'side', 'back'];

export const NAV_ITEMS = [
  { href: '#fold', label: 'The fold' },
  { href: '#questions', label: 'Questions' },
] as const;

export const STORY_CHAPTERS = [
  {
    index: '01',
    title: 'Gather it close.',
    body: 'Keep a compact boundary beside a desk or chair. The pleats stay connected as the footprint changes.',
    sampleOpening: 0,
  },
  {
    index: '02',
    title: 'Give it room.',
    body: 'Open the same sixteen panels into a wider screen. Its span changes; its material length stays the same.',
    sampleOpening: 100,
  },
  {
    index: '03',
    title: 'Make it yours.',
    body: 'Choose your base felt color, layer a printed pattern or artwork, and orbit around the result.',
    sampleOpening: 50,
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'How wide is Fold 16?',
    answer:
      'In this concept model, the outer span runs from approximately 0.71 m to 2.74 m. The opening control shows the current span.',
  },
  {
    question: 'Does opening it stretch the panels?',
    answer:
      'No. Each of the sixteen panels keeps the same length. Custom prints and artwork map across the continuous developed surface and travel cleanly with the folds.',
  },
  {
    question: 'Can I choose my own colors and print?',
    answer:
      'Yes. Pick any base felt and print hex color using the hue wheel, sliders, hex field, native picker, or curated swatches, then choose from Bloom, Stripes, Landscape, Waves, Solid, or your own browser-session image.',
  },
  {
    question: 'Is this an acoustic performance claim?',
    answer:
      'No. This is a design concept for a felt divider. No acoustic rating or laboratory result is represented.',
  },
  {
    question: 'Do I need a powerful device to explore it?',
    answer:
      'No. Both the interactive 3D view and the still canvas view render your exact colors, print, opening, and rotation angle.',
  },
  {
    question: 'What happens when I build a brief?',
    answer:
      'A configuration summary — including opening, span, colors, print, and any local session image filename — is prepared in this browser for download as a text file. Nothing is sent and no order is placed.',
  },
] as const;

export function findColorPresetName(hex: string): string | null {
  const upper = hex.toUpperCase();
  const match = COLOR_PRESETS.find((c) => c.hex.toUpperCase() === upper);
  return match ? match.name : null;
}
