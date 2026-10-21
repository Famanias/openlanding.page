export interface ClockState {
  hour: number;
  fragranceSlug: string;
}

export interface ClockStore {
  getState: () => ClockState;
  setHour: (hour: number) => void;
  setFragranceSlug: (slug: string) => void;
  subscribe: (listener: () => void) => () => void;
}

const DEFAULT_STATE: ClockState = {
  hour: 0,
  fragranceSlug: "iris-calcaire",
};

/** Creates an observable clock store compatible with React's useSyncExternalStore. */
export function createClockStore(initial?: Partial<ClockState>): ClockStore {
  let state: ClockState = {
    hour: initial?.hour ?? DEFAULT_STATE.hour,
    fragranceSlug: initial?.fragranceSlug ?? DEFAULT_STATE.fragranceSlug,
  };

  const listeners = new Set<() => void>();

  function notify() {
    for (const listener of listeners) {
      listener();
    }
  }

  return {
    getState: () => state,
    setHour: (nextHour: number) => {
      const clamped = Math.max(0, Math.min(12, Math.round(nextHour * 100) / 100));
      if (clamped === state.hour) return;
      state = { ...state, hour: clamped };
      notify();
    },
    setFragranceSlug: (nextSlug: string) => {
      if (nextSlug === state.fragranceSlug) return;
      state = { ...state, fragranceSlug: nextSlug };
      notify();
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
