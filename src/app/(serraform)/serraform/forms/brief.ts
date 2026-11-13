import {
  findColorPresetName,
  FOLD_CONSTANTS,
  PRINT_SPECS,
  VIEW_PRESETS,
  ViewState,
} from '../fold/config';
import { FoldMetrics, formatMeters } from '../fold/geometry';
import { DesignState, normalizeYawDeg, viewPresetFromAngles } from '../fold/state';

export const ROOM_OPTIONS = [
  'Living space',
  'Workspace',
  'Hospitality',
  'Other',
] as const;

export type RoomType = (typeof ROOM_OPTIONS)[number];

export interface BriefFields {
  projectName: string;
  room: string;
  notes: string;
}

export type BriefErrors = Partial<Record<keyof BriefFields, string>>;

export interface BriefDesignSnapshot {
  design: DesignState;
  view: ViewState;
  uploadedImageName?: string | null;
}

export function validateBrief(fields: BriefFields): BriefErrors {
  const errors: BriefErrors = {};
  const trimmedName = fields.projectName.trim();

  if (trimmedName.length < 2 || trimmedName.length > 80) {
    errors.projectName = 'Enter a project name with 2 to 80 characters.';
  }

  if (!ROOM_OPTIONS.includes(fields.room as RoomType)) {
    errors.room = 'Choose a room type.';
  }

  if (fields.notes.length > 500) {
    errors.notes = 'Keep notes to 500 characters.';
  }

  return errors;
}

export function formatColorWithPreset(hex: string): string {
  const upper = hex.toUpperCase();
  const preset = findColorPresetName(upper);
  return preset ? `${upper} (${preset})` : upper;
}

export function formatViewSummary(view: ViewState): string {
  const presetId = viewPresetFromAngles(view);
  const yaw = Math.round(normalizeYawDeg(view.yawDeg));
  const elev = Math.round(view.elevationDeg);
  return presetId
    ? `${VIEW_PRESETS[presetId].label} (${yaw}° · ${elev}° tilt)`
    : `Custom angle (${yaw}° · ${elev}° tilt)`;
}

export function buildBriefText(
  fields: BriefFields,
  snapshot: BriefDesignSnapshot,
  metrics: FoldMetrics,
): string {
  const cleanName = fields.projectName.trim();
  const cleanRoom = ROOM_OPTIONS.includes(fields.room as RoomType)
    ? fields.room
    : 'Other';
  const cleanNotes = fields.notes.trim();

  const { design, view, uploadedImageName } = snapshot;
  const printSpec = PRINT_SPECS[design.print];

  const lines = [
    'SERRAFORM — Room Brief',
    '======================',
    '',
    `Project name: ${cleanName}`,
    `Room: ${cleanRoom}`,
    '',
    'Design & Shape',
    '--------------',
    `Product: Fold ${FOLD_CONSTANTS.panels} (${FOLD_CONSTANTS.panels} connected felt panels)`,
    `Base color: ${formatColorWithPreset(design.baseHex)}`,
    `Print: ${printSpec.name}`,
  ];

  if (printSpec.usesDesignColor) {
    lines.push(`Design color: ${formatColorWithPreset(design.designHex)}`);
  }
  if (printSpec.usesScale) {
    lines.push(`${printSpec.scaleLabel}: ${Math.round(design.motifScale)}%`);
  }
  if (design.print === 'upload' && uploadedImageName) {
    lines.push(`Your image: ${uploadedImageName} (local session only)`);
  }

  lines.push(
    `Opening: ${Math.round(design.opening)}%`,
    `Outer span: ${formatMeters(metrics.outerSpan)}`,
    `Outer depth: ${formatMeters(metrics.outerDepth)}`,
    `Height: ${formatMeters(FOLD_CONSTANTS.height)}`,
    `Support depth: ${formatMeters(FOLD_CONSTANTS.footDepth)}`,
    `Preview view: ${formatViewSummary(view)}`,
    '',
    'Notes',
    '-----',
    cleanNotes.length > 0 ? cleanNotes : '(None)',
    '',
    'Notice',
    '------',
    'SERRAFORM is a fictional design concept. Dimensions describe this concept model and are not a manufacturing or acoustic specification. Prepared locally in your browser; nothing was sent.',
    '',
  );

  return lines.join('\n');
}
