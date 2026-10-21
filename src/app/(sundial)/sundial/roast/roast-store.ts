import { useSyncExternalStore } from "react";
import { clampElapsed, stageFromElapsed, type RoastStage } from "./roast";

export interface RoastState {
  elapsed: number;
}

const DEFAULT_STATE: RoastState = { elapsed: 0 };

const listeners = new Set<() => void>();
let state: RoastState = DEFAULT_STATE;

function notify() {
  for (const listener of listeners) listener();
}

/** Observable store for the roast clock, driven by scroll, slider or keys. */
export const roastStore = {
  getState: (): RoastState => state,
  setElapsed: (next: number) => {
    const clamped = Math.round(clampElapsed(next) * 10) / 10;
    if (clamped === state.elapsed) return;
    state = { elapsed: clamped };
    notify();
  },
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  /** Test helper: reset between cases. */
  reset: () => {
    state = DEFAULT_STATE;
    notify();
  },
};

const getServerSnapshot = (): RoastState => DEFAULT_STATE;

export function useRoastElapsed(): number {
  return useSyncExternalStore(
    roastStore.subscribe,
    roastStore.getState,
    getServerSnapshot,
  ).elapsed;
}

export function useRoastStage(): RoastStage {
  const elapsed = useRoastElapsed();
  return stageFromElapsed(elapsed);
}
