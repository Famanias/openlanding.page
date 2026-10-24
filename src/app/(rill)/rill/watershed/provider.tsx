"use client";

import { createContext, useContext, useRef, useSyncExternalStore, type ReactNode } from "react";
import { createWatershedStore, type WatershedStore } from "./store";

const WatershedContext = createContext<WatershedStore | null>(null);

export function WatershedProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<WatershedStore | null>(null);
  if (!storeRef.current) storeRef.current = createWatershedStore(0);
  return <WatershedContext.Provider value={storeRef.current}>{children}</WatershedContext.Provider>;
}

export function useWatershed() {
  const store = useContext(WatershedContext);
  if (!store) throw new Error("useWatershed must be used inside WatershedProvider");
  const rain = useSyncExternalStore(store.subscribe, store.getSnapshot, () => 0);
  return { store, rain };
}

