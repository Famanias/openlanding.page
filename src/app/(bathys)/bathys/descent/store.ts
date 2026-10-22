import { MAX_DEPTH } from "./physics";

export type DescentStore = {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => number;
  setDepth: (depth: number) => void;
};

export function createDescentStore(initialDepth = 0): DescentStore {
  let currentDepth = Math.max(0, Math.min(initialDepth, MAX_DEPTH));
  const listeners = new Set<() => void>();

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot() {
      return currentDepth;
    },
    setDepth(depth: number) {
      const next = Math.max(0, Math.min(depth, MAX_DEPTH));
      if (next !== currentDepth) {
        currentDepth = next;
        listeners.forEach((fn) => fn());
      }
    },
  };
}

// Global default singleton store for client pages
let defaultStore: DescentStore | null = null;

export function getDefaultDescentStore(): DescentStore {
  if (!defaultStore) {
    defaultStore = createDescentStore(0);
  }
  return defaultStore;
}
