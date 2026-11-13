import { clamp } from "../motion/math";
import {
  MAX_RESOLUTION_SCALE,
  MIN_RESOLUTION_SCALE,
  RENDER_PASSES,
  type PassId,
  type TargetFps,
} from "./passes";

export type PipelineState = {
  activePassId: PassId;
  enabledPassIds: PassId[];
  resolutionScale: number;
  targetFps: TargetFps;
  exploded: boolean;
  wireframe: boolean;
  paused: boolean;
  resetTick: number;
};

export const ALL_PASS_IDS: PassId[] = RENDER_PASSES.map((p) => p.id);

export const INITIAL_PIPELINE_STATE: PipelineState = {
  activePassId: "geometry",
  enabledPassIds: [...ALL_PASS_IDS],
  resolutionScale: 1.0,
  targetFps: 60,
  exploded: false,
  wireframe: false,
  paused: false,
  resetTick: 0,
};

export type PipelineAction =
  | { type: "selectPass"; passId: PassId }
  | { type: "stepPass"; delta: -1 | 1 }
  | { type: "togglePassEnabled"; passId: PassId }
  | { type: "setResolutionScale"; scale: number }
  | { type: "setTargetFps"; fps: TargetFps }
  | { type: "toggleExploded" }
  | { type: "setExploded"; exploded: boolean }
  | { type: "toggleWireframe" }
  | { type: "togglePaused" }
  | { type: "reset" };

const VALID_IDS = new Set<string>(ALL_PASS_IDS);

export function pipelineReducer(state: PipelineState, action: PipelineAction): PipelineState {
  switch (action.type) {
    case "selectPass":
      if (!VALID_IDS.has(action.passId)) return state;
      return { ...state, activePassId: action.passId };
    case "stepPass": {
      const idx = ALL_PASS_IDS.indexOf(state.activePassId);
      const next = (idx + action.delta + ALL_PASS_IDS.length) % ALL_PASS_IDS.length;
      return { ...state, activePassId: ALL_PASS_IDS[next] };
    }
    case "togglePassEnabled": {
      if (!VALID_IDS.has(action.passId)) return state;
      const exists = state.enabledPassIds.includes(action.passId);
      const nextIds = exists
        ? state.enabledPassIds.filter((id) => id !== action.passId)
        : ALL_PASS_IDS.filter((id) => id === action.passId || state.enabledPassIds.includes(id));
      return { ...state, enabledPassIds: nextIds };
    }
    case "setResolutionScale": {
      const clamped = Number(clamp(action.scale, MIN_RESOLUTION_SCALE, MAX_RESOLUTION_SCALE).toFixed(2));
      return { ...state, resolutionScale: clamped };
    }
    case "setTargetFps":
      return { ...state, targetFps: action.fps };
    case "toggleExploded":
      return { ...state, exploded: !state.exploded };
    case "setExploded":
      return { ...state, exploded: action.exploded };
    case "toggleWireframe":
      return { ...state, wireframe: !state.wireframe };
    case "togglePaused":
      return { ...state, paused: !state.paused };
    case "reset":
      return { ...INITIAL_PIPELINE_STATE, resetTick: state.resetTick + 1 };
  }
}
