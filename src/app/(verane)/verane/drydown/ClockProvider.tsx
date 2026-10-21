"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createClockStore, type ClockStore, type ClockState } from "./clock-store";
import { FRAGRANCES, getFragranceBySlug, type Fragrance } from "../content/fragrances";

interface ClockContextValue {
  hour: number;
  fragranceSlug: string;
  activeFragrance: Fragrance;
  setHour: (hour: number) => void;
  setFragranceSlug: (slug: string) => void;
  store: ClockStore;
}

const ClockContext = createContext<ClockStore | null>(null);

export function ClockProvider({
  children,
  initialHour = 0,
  initialFragrance = "iris-calcaire",
}: {
  children: ReactNode;
  initialHour?: number;
  initialFragrance?: string;
}) {
  const store = useMemo(
    () =>
      createClockStore({
        hour: initialHour,
        fragranceSlug: initialFragrance,
      }),
    [initialHour, initialFragrance],
  );

  return <ClockContext.Provider value={store}>{children}</ClockContext.Provider>;
}

export function useClock(): ClockContextValue {
  const store = useContext(ClockContext);
  if (!store) {
    throw new Error("useClock must be used within a ClockProvider");
  }

  const state = useSyncExternalStore<ClockState>(
    store.subscribe,
    store.getState,
    store.getState,
  );

  const activeFragrance = useMemo(
    () => getFragranceBySlug(state.fragranceSlug),
    [state.fragranceSlug],
  );

  return {
    hour: state.hour,
    fragranceSlug: state.fragranceSlug,
    activeFragrance,
    setHour: store.setHour,
    setFragranceSlug: store.setFragranceSlug,
    store,
  };
}
