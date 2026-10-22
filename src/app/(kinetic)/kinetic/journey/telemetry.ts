/**
 * Tiny external store the WebGL engine publishes trip telemetry into and
 * the nav HUD reads from. Deliberately not React state: the engine writes
 * every frame and the HUD patches the DOM directly, so scrolling never
 * re-renders the page.
 */

export type Telemetry = {
  live: boolean;
  /** 0..1 progress from the origin gate to the destination dock. */
  progress: number;
  mph: number;
  milesToGo: number;
  stage: string;
  arrived: boolean;
  /** Documents verified at the checkpoint. */
  verified: boolean;
};

type Listener = (t: Telemetry) => void;

const state: Telemetry = {
  live: false,
  progress: 0,
  mph: 0,
  milesToGo: 925,
  stage: "Chicago DC · Gate 2",
  arrived: false,
  verified: false,
};

const listeners = new Set<Listener>();

export function publishTelemetry(next: Partial<Telemetry>): void {
  let changed = false;
  for (const key of Object.keys(next) as (keyof Telemetry)[]) {
    if (state[key] !== next[key]) {
      (state as Record<keyof Telemetry, unknown>)[key] = next[key];
      changed = true;
    }
  }
  if (!changed) return;
  for (const listener of listeners) listener(state);
}

export function subscribeTelemetry(listener: Listener): () => void {
  listeners.add(listener);
  listener(state);
  return () => {
    listeners.delete(listener);
  };
}

/* ------------------------------------------------------------------ */
/* Truck screen position (for DOM callouts anchored to the 3D truck)   */
/* ------------------------------------------------------------------ */

export type TruckScreen = {
  /** Viewport CSS px of a point just above the cab. */
  x: number;
  y: number;
  visible: boolean;
};

type ScreenListener = (p: TruckScreen) => void;
const screen: TruckScreen = { x: 0, y: 0, visible: false };
const screenListeners = new Set<ScreenListener>();

/** Published every rendered frame by the engine; listeners patch the DOM. */
export function publishTruckScreen(x: number, y: number, visible: boolean): void {
  screen.x = x;
  screen.y = y;
  screen.visible = visible;
  for (const listener of screenListeners) listener(screen);
}

export function subscribeTruckScreen(listener: ScreenListener): () => void {
  screenListeners.add(listener);
  listener(screen);
  return () => {
    screenListeners.delete(listener);
  };
}
