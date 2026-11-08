"use client";
import { createContext, useContext, useMemo, useReducer, useRef, type Dispatch, type MutableRefObject, type ReactNode } from "react";
import { INITIAL_STATE, vesselReducer, type VesselAction, type VesselState } from "./state";

type VesselContextValue = {
  state: VesselState;
  dispatch: Dispatch<VesselAction>;
  /** Scroll-driven throw progress (0 lump → 1 finished). A ref, so scrolling never re-renders React. */
  throwRef: MutableRefObject<number>;
};

const VesselContext = createContext<VesselContextValue | null>(null);

export function VesselProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(vesselReducer, INITIAL_STATE);
  const throwRef = useRef(1);
  const value = useMemo(() => ({ state, dispatch, throwRef }), [state]);
  return <VesselContext.Provider value={value}>{children}</VesselContext.Provider>;
}

export function useVessel(): VesselContextValue {
  const context = useContext(VesselContext);
  if (!context) throw new Error("useVessel must be used inside <VesselProvider>");
  return context;
}
