export type WatershedListener = () => void;

export type WatershedStore = {
  getSnapshot: () => number;
  subscribe: (listener: WatershedListener) => () => void;
  setRain: (millimeters: number) => void;
};

const clampRain = (value: number) => Math.min(80, Math.max(0, Number.isFinite(value) ? value : 0));

export function createWatershedStore(initialRain = 0): WatershedStore {
  let rain = clampRain(initialRain);
  const listeners = new Set<WatershedListener>();

  return {
    getSnapshot: () => rain,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    setRain(next) {
      const value = clampRain(next);
      if (Object.is(value, rain)) return;
      rain = value;
      listeners.forEach((listener) => listener());
    },
  };
}

