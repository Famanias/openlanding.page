import type { BuyerRoleId, CaptureTierId, CompanySizeBand } from "../content/funnelData";
import type { UnlockedTiersState } from "./logic";

export interface ValenceState {
  activeTier: CaptureTierId;
  selectedCohortId: string;
  unlocked: UnlockedTiersState;
  companySize: CompanySizeBand;
  role: BuyerRoleId;
  activeChapterId: string;
  squeezeEmail: string;
  squeezePassCode: string | null;
  dossierKey: string | null;
  ambientPaused: boolean;
}

export interface ValenceStore {
  getSnapshot: () => ValenceState;
  subscribe: (listener: () => void) => () => void;
  setActiveTier: (tier: CaptureTierId) => void;
  setSelectedCohortId: (cohortId: string) => void;
  unlockTier: (tier: CaptureTierId) => void;
  setPreviewFilter: (patch: { companySize?: CompanySizeBand; role?: BuyerRoleId }) => void;
  setActiveChapterId: (chapterId: string) => void;
  recordSqueezeSuccess: (email: string, passCode: string) => void;
  recordLeadCaptureSuccess: (email: string, companySize: CompanySizeBand, role: BuyerRoleId, dossierKey: string) => void;
  toggleAmbientPaused: () => void;
}

export function createValenceStore(initial?: Partial<ValenceState>): ValenceStore {
  let state: ValenceState = {
    activeTier: "splash",
    selectedCohortId: "na-enterprise",
    unlocked: {
      splash: false,
      squeeze: false,
      "lead-gen": false,
    },
    companySize: "201-1000",
    role: "vp-growth",
    activeChapterId: "ch-01",
    squeezeEmail: "",
    squeezePassCode: null,
    dossierKey: null,
    ambientPaused: false,
    ...initial,
  };

  const listeners = new Set<() => void>();
  const emit = () => {
    for (const listener of listeners) listener();
  };

  return {
    getSnapshot: () => state,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    setActiveTier: (tier) => {
      if (state.activeTier === tier) return;
      state = { ...state, activeTier: tier };
      emit();
    },
    setSelectedCohortId: (cohortId) => {
      if (state.selectedCohortId === cohortId) return;
      state = { ...state, selectedCohortId: cohortId };
      emit();
    },
    unlockTier: (tier) => {
      if (state.unlocked[tier]) return;
      state = {
        ...state,
        unlocked: {
          ...state.unlocked,
          [tier]: true,
        },
      };
      emit();
    },
    setPreviewFilter: (patch) => {
      const nextSize = patch.companySize ?? state.companySize;
      const nextRole = patch.role ?? state.role;
      if (nextSize === state.companySize && nextRole === state.role) return;
      state = {
        ...state,
        companySize: nextSize,
        role: nextRole,
      };
      emit();
    },
    setActiveChapterId: (chapterId) => {
      if (state.activeChapterId === chapterId) return;
      state = { ...state, activeChapterId: chapterId };
      emit();
    },
    recordSqueezeSuccess: (email, passCode) => {
      state = {
        ...state,
        activeTier: "squeeze",
        squeezeEmail: email.trim(),
        squeezePassCode: passCode,
        unlocked: {
          ...state.unlocked,
          splash: true,
          squeeze: true,
        },
      };
      emit();
    },
    recordLeadCaptureSuccess: (email, companySize, role, dossierKey) => {
      state = {
        ...state,
        activeTier: "lead-gen",
        squeezeEmail: email.trim(),
        companySize,
        role,
        dossierKey,
        unlocked: {
          splash: true,
          squeeze: true,
          "lead-gen": true,
        },
      };
      emit();
    },
    toggleAmbientPaused: () => {
      state = { ...state, ambientPaused: !state.ambientPaused };
      emit();
    },
  };
}

export const valenceStore = createValenceStore();
