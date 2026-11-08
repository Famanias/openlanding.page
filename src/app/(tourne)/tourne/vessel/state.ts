import { clampParam, type ParamKey, type VesselParams } from "./profile";
import { FORMS, formById } from "./forms";
import { GLAZES } from "./glazes";

export type VesselState = {
  params: VesselParams;
  glazeId: string;
  /** null once the visitor edits the shape by hand */
  formId: string | null;
};

export type VesselAction =
  | { type: "set"; key: ParamKey; value: number }
  | { type: "form"; id: string }
  | { type: "glaze"; id: string }
  | { type: "reset" };

export const INITIAL_STATE: VesselState = {
  params: FORMS[0].params,
  glazeId: FORMS[0].defaultGlaze,
  formId: FORMS[0].id,
};

export function vesselReducer(state: VesselState, action: VesselAction): VesselState {
  switch (action.type) {
    case "set": {
      if (!Number.isFinite(action.value)) return state;
      return { ...state, formId: null, params: { ...state.params, [action.key]: clampParam(action.key, action.value) } };
    }
    case "form": {
      const form = formById(action.id);
      if (!form) return state;
      return { params: form.params, glazeId: form.defaultGlaze, formId: form.id };
    }
    case "glaze": {
      if (!GLAZES.some((glaze) => glaze.id === action.id)) return state;
      return { ...state, glazeId: action.id };
    }
    case "reset":
      return INITIAL_STATE;
  }
}
