"use client";
import { createContext, useContext, useMemo, useReducer, type Dispatch, type ReactNode } from "react";
import { INITIAL_STAY, stayReducer, type StayAction, type StayState } from "./quote";

type StayContextValue = { state: StayState; dispatch: Dispatch<StayAction> };

const StayContext = createContext<StayContextValue | null>(null);

/** One stay for the whole page: the month chosen on the season ruler is the month the booking panel quotes. */
export function StayProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(stayReducer, INITIAL_STAY);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <StayContext.Provider value={value}>{children}</StayContext.Provider>;
}

export function useStay(): StayContextValue {
  const value = useContext(StayContext);
  if (!value) throw new Error("useStay must be used inside <StayProvider>");
  return value;
}
