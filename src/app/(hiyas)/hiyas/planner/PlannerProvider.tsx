"use client";
import { createContext, useContext, useReducer, type ReactNode } from "react";
import { INITIAL_PLANNER_STATE, plannerReducer, plannerSummary, type PlannerAction, type PlannerState } from "./logic";

const Context = createContext<{ state: PlannerState; dispatch: (action: PlannerAction) => void; summary: ReturnType<typeof plannerSummary> } | null>(null);
export function PlannerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(plannerReducer, INITIAL_PLANNER_STATE);
  return <Context.Provider value={{ state, dispatch, summary: plannerSummary(state) }}>{children}</Context.Provider>;
}
export function usePlanner() { const value = useContext(Context); if (!value) throw new Error("usePlanner must be used within PlannerProvider"); return value; }

