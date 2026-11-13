import { normalizeHex } from './color';
import {
  DEFAULT_DESIGN,
  DEFAULT_VIEW,
  FOLD_CONSTANTS,
  PrintId,
  VIEW_ORDER,
  VIEW_PRESETS,
  ViewId,
  ViewState,
} from './config';
import { normalizeOpening } from './geometry';

export type OwnershipMode = 'story' | 'manual';

export interface DesignState {
  opening: number; // 0..100
  baseHex: string; // normalized #RRGGBB
  designHex: string; // normalized #RRGGBB
  print: PrintId;
  motifScale: number; // 50..200, default 100
  tintUpload?: boolean; // opt-in print-color tinting for uploaded images
}

export interface FoldStudioState {
  mode: OwnershipMode;
  design: DesignState;
  view: ViewState;
}

export type FoldAction =
  | { type: 'SET_OPENING'; opening: number }
  | { type: 'SET_BASE_HEX'; hex: string; currentOpening?: number }
  | { type: 'SET_DESIGN_HEX'; hex: string; currentOpening?: number }
  | { type: 'SET_PRINT'; print: PrintId; currentOpening?: number }
  | { type: 'SET_MOTIF_SCALE'; motifScale: number; currentOpening?: number }
  | { type: 'SET_TINT_UPLOAD'; tintUpload: boolean; currentOpening?: number }
  | { type: 'SET_VIEW_PRESET'; viewId: ViewId; currentOpening?: number }
  | {
      type: 'SET_VIEW_ANGLES';
      yawDeg: number;
      elevationDeg: number;
      currentOpening?: number;
    }
  | { type: 'ROTATE_VIEW_STEP'; deltaYawDeg: number; currentOpening?: number }
  | { type: 'RESET_VIEW'; currentOpening?: number }
  | { type: 'RESET_SHAPE' }
  | { type: 'RESET_DESIGN'; currentOpening?: number }
  | { type: 'FOLLOW_STORY' }
  | { type: 'SYNC_LAYOUT'; enhanced: boolean; currentOpening?: number };

export function normalizeYawDeg(yawDeg: number): number {
  if (!Number.isFinite(yawDeg)) return DEFAULT_VIEW.yawDeg;
  const mod = ((yawDeg % 360) + 360) % 360;
  return mod;
}

export function normalizeElevationDeg(elevationDeg: number): number {
  if (!Number.isFinite(elevationDeg)) return DEFAULT_VIEW.elevationDeg;
  return Math.max(
    FOLD_CONSTANTS.minElevationDeg,
    Math.min(FOLD_CONSTANTS.maxElevationDeg, elevationDeg),
  );
}

export function normalizeMotifScale(scale: number): number {
  if (!Number.isFinite(scale)) return DEFAULT_DESIGN.motifScale;
  return Math.max(50, Math.min(200, Math.round(scale)));
}

export function shortestAngleDiffDeg(a: number, b: number): number {
  const diff = (((a - b) % 360) + 540) % 360 - 180;
  return Math.abs(diff);
}

export function viewPresetFromAngles(view: ViewState): ViewId | null {
  for (const id of VIEW_ORDER) {
    const preset = VIEW_PRESETS[id];
    if (
      shortestAngleDiffDeg(view.yawDeg, preset.yawDeg) <= 0.75 &&
      Math.abs(view.elevationDeg - preset.elevationDeg) <= 0.75
    ) {
      return id;
    }
  }
  return null;
}

export function viewDirectionFromAngles(view: ViewState): [number, number, number] {
  const yawRad = (normalizeYawDeg(view.yawDeg) * Math.PI) / 180;
  const elevRad = (normalizeElevationDeg(view.elevationDeg) * Math.PI) / 180;
  const cosElev = Math.cos(elevRad);
  return [
    Math.sin(yawRad) * cosElev,
    Math.sin(elevRad),
    Math.cos(yawRad) * cosElev,
  ];
}

export function usesActivePrintColor(
  design: Pick<DesignState, 'print' | 'tintUpload'>,
): boolean {
  if (design.print === 'solid') return false;
  if (design.print === 'upload') return Boolean(design.tintUpload);
  return true;
}

export function createInitialFoldState(enhanced = true): FoldStudioState {
  return {
    mode: enhanced ? 'story' : 'manual',
    design: { ...DEFAULT_DESIGN },
    view: { ...DEFAULT_VIEW },
  };
}

function resolveOpeningEnteringManual(
  state: FoldStudioState,
  currentOpening?: number,
): number {
  if (state.mode === 'story' && typeof currentOpening === 'number') {
    return normalizeOpening(currentOpening);
  }
  return state.design.opening;
}

export function foldReducer(
  state: FoldStudioState,
  action: FoldAction,
): FoldStudioState {
  switch (action.type) {
    case 'SET_OPENING': {
      return {
        ...state,
        mode: 'manual',
        design: {
          ...state.design,
          opening: normalizeOpening(action.opening),
        },
      };
    }
    case 'SET_BASE_HEX': {
      const hex = normalizeHex(action.hex);
      if (!hex) return state;
      if (state.mode === 'manual' && state.design.baseHex === hex) {
        return state;
      }
      return {
        ...state,
        mode: 'manual',
        design: {
          ...state.design,
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
          baseHex: hex,
        },
      };
    }
    case 'SET_DESIGN_HEX': {
      const hex = normalizeHex(action.hex);
      if (!hex) return state;
      if (state.mode === 'manual' && state.design.designHex === hex) {
        return state;
      }
      return {
        ...state,
        mode: 'manual',
        design: {
          ...state.design,
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
          designHex: hex,
        },
      };
    }
    case 'SET_PRINT': {
      return {
        ...state,
        mode: 'manual',
        design: {
          ...state.design,
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
          print: action.print,
        },
      };
    }
    case 'SET_MOTIF_SCALE': {
      return {
        ...state,
        mode: 'manual',
        design: {
          ...state.design,
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
          motifScale: normalizeMotifScale(action.motifScale),
        },
      };
    }
    case 'SET_TINT_UPLOAD': {
      return {
        ...state,
        mode: 'manual',
        design: {
          ...state.design,
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
          tintUpload: Boolean(action.tintUpload),
        },
      };
    }
    case 'SET_VIEW_PRESET': {
      const preset = VIEW_PRESETS[action.viewId];
      return {
        mode: 'manual',
        design: {
          ...state.design,
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
        },
        view: {
          yawDeg: preset.yawDeg,
          elevationDeg: preset.elevationDeg,
        },
      };
    }
    case 'SET_VIEW_ANGLES': {
      return {
        mode: 'manual',
        design: {
          ...state.design,
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
        },
        view: {
          yawDeg: normalizeYawDeg(action.yawDeg),
          elevationDeg: normalizeElevationDeg(action.elevationDeg),
        },
      };
    }
    case 'ROTATE_VIEW_STEP': {
      return {
        mode: 'manual',
        design: {
          ...state.design,
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
        },
        view: {
          ...state.view,
          yawDeg: normalizeYawDeg(state.view.yawDeg + action.deltaYawDeg),
        },
      };
    }
    case 'RESET_VIEW': {
      return {
        ...state,
        mode: 'manual',
        design: {
          ...state.design,
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
        },
        view: { ...DEFAULT_VIEW },
      };
    }
    case 'RESET_SHAPE': {
      return {
        ...state,
        mode: 'manual',
        design: {
          ...state.design,
          opening: FOLD_CONSTANTS.defaultOpening,
        },
      };
    }
    case 'RESET_DESIGN': {
      return {
        ...state,
        mode: 'manual',
        design: {
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
          baseHex: DEFAULT_DESIGN.baseHex,
          designHex: DEFAULT_DESIGN.designHex,
          print: DEFAULT_DESIGN.print,
          motifScale: DEFAULT_DESIGN.motifScale,
          tintUpload: Boolean(DEFAULT_DESIGN.tintUpload),
        },
      };
    }
    case 'FOLLOW_STORY': {
      return {
        ...state,
        mode: 'story',
      };
    }
    case 'SYNC_LAYOUT': {
      if (!action.enhanced && state.mode === 'story') {
        return {
          ...state,
          mode: 'manual',
          design: {
            ...state.design,
            opening:
              typeof action.currentOpening === 'number'
                ? normalizeOpening(action.currentOpening)
                : state.design.opening,
          },
        };
      }
      return state;
    }
    default:
      return state;
  }
}

export function getEffectiveOpening(
  state: FoldStudioState,
  storyDerivedOpening: number,
): number {
  return state.mode === 'story'
    ? normalizeOpening(storyDerivedOpening)
    : state.design.opening;
}
