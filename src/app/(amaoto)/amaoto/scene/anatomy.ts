import { PARTS } from "../data/parts";
import { clamp01 } from "../model/rig";
export type PartId = (typeof PARTS)[number]["id"];
export const isPart = (id: unknown): id is PartId =>
  PARTS.some((part) => part.id === id);
export type Demonstration = "linkage" | "trace" | "turn";
export type AnatomyState = {
  part: PartId | null;
  open: number;
  reveal: boolean;
  oneRib: boolean;
  ribIndex: number;
  underneath: boolean;
  turn: number;
  staticTie: boolean;
  viewId: number;
  sequence: number;
  action: { kind: Demonstration; id: number } | null;
};
export const createAnatomy = (): AnatomyState => ({
  part: null,
  open: 1,
  reveal: false,
  oneRib: false,
  ribIndex: 4,
  underneath: false,
  turn: 0,
  staticTie: false,
  viewId: 0,
  sequence: 0,
  action: null,
});
export type AnatomyEvent =
  | { type: "select"; part: PartId; ribIndex?: number }
  | { type: "overview" }
  | { type: "open"; value: number }
  | { type: "reveal" }
  | { type: "ribs" }
  | { type: "side" }
  | { type: "play"; kind: Demonstration; reduced: boolean }
  | { type: "finish"; id: number };
export const INSPECTION: Record<
  PartId,
  {
    material: string;
    instruction: string;
    eye: [number, number, number];
    radius: number;
    minimum: number;
    reveal: boolean;
  }
> = {
  ribs: {
    material: "Bamboo / repeated 40 times",
    instruction:
      "Follow one bowed rib, then see the whole circumference move together.",
    eye: [2.8, -1.4, 4],
    radius: 0.95,
    minimum: 0.6,
    reveal: true,
  },
  stretchers: {
    material: "Bamboo / hinged links",
    instruction:
      "The runner rises. The links spread. The ribs lift the paper into a roof.",
    eye: [2, -2.6, 4],
    radius: 1.05,
    minimum: 0.55,
    reveal: true,
  },
  runner: {
    material: "Turned wood / sliding collar",
    instruction:
      "Move the collar along the shaft. Every link answers the same movement.",
    eye: [2, 0.25, 4],
    radius: 0.63,
    minimum: 0,
    reveal: false,
  },
  thread: {
    material: "Thread / diamond lacing",
    instruction:
      "A crossing tie joins neighbouring ribs. Trace its path under the paper.",
    eye: [1.5, -3, 3.6],
    radius: 0.54,
    minimum: 0.85,
    reveal: false,
  },
  canopy: {
    material: "Washi / painted paper gores",
    instruction:
      "Look across the painted paper, then turn underneath to see what holds it.",
    eye: [2, 4, 3],
    radius: 1.1,
    minimum: 1,
    reveal: false,
  },
  handle: {
    material: "Turned bamboo / beaded grip",
    instruction:
      "Turn the view to follow the beads, rounded end and the joint to the shaft.",
    eye: [2, 0.25, 4],
    radius: 0.68,
    minimum: 0,
    reveal: false,
  },
};
export function anatomyReducer(
  state: AnatomyState,
  event: AnatomyEvent,
): AnatomyState {
  switch (event.type) {
    case "overview":
      return {
        ...createAnatomy(),
        viewId: state.sequence + 1,
        sequence: state.sequence + 1,
      };
    case "select":
      return {
        ...state,
        part: event.part,
        open: Math.max(state.open, INSPECTION[event.part].minimum),
        reveal: INSPECTION[event.part].reveal,
        oneRib: false,
        underneath: false,
        turn: 0,
        staticTie: false,
        ribIndex:
          event.ribIndex === undefined
            ? 4
            : Math.max(0, Math.min(39, Math.floor(event.ribIndex))),
        action: null,
        viewId: state.sequence + 1,
        sequence: state.sequence + 1,
      };
    case "open":
      return {
        ...state,
        open: clamp01(event.value),
        action: null,
        sequence: state.sequence + 1,
      };
    case "reveal":
      return { ...state, reveal: !state.reveal };
    case "ribs":
      return { ...state, oneRib: !state.oneRib };
    case "side":
      return {
        ...state,
        underneath: !state.underneath,
        action: null,
        sequence: state.sequence + 1,
      };
    case "play": {
      if (event.reduced)
        return {
          ...state,
          action: null,
          sequence: state.sequence + 1,
          ...(event.kind === "turn"
            ? { turn: state.turn + Math.PI / 2 }
            : event.kind === "trace"
              ? { staticTie: !state.staticTie }
              : { open: state.open > 0.5 ? 0.25 : 1 }),
        };
      return {
        ...state,
        staticTie: false,
        sequence: state.sequence + 1,
        action: { kind: event.kind, id: state.sequence + 1 },
      };
    }
    case "finish":
      return state.action?.id === event.id ? { ...state, action: null } : state;
  }
}
const ease = (t: number) => {
  const n = clamp01(t);
  return n * n * (3 - 2 * n);
};
export function sampleDemonstration(
  kind: Demonstration | null,
  elapsed: number,
  open: number,
) {
  const duration = kind === "linkage" ? 3.2 : kind === "trace" ? 2.4 : 3;
  const t = clamp01(elapsed / duration),
    running = Boolean(kind) && elapsed < duration;
  let value = open;
  if (kind === "linkage") {
    const stops = [open, 0.25, 1, open],
      section = Math.min(2, Math.floor(t * 3)),
      f = ease(t * 3 - section);
    value = stops[section] + (stops[section + 1] - stops[section]) * f;
  }
  return {
    open: value,
    trace: kind === "trace" && running ? t : -1,
    turn: kind === "turn" ? Math.PI * 2 * ease(t) : 0,
    running,
    highlight:
      kind === "linkage" && running
        ? ((t < 0.32 ? "runner" : t < 0.65 ? "stretchers" : "ribs") as PartId)
        : null,
  };
}
/** Project a pointer onto a screen-space shaft, not the screen's arbitrary vertical axis. */
export function projectedRunnerOpen(
  pointer: { x: number; y: number },
  closed: { x: number; y: number },
  opened: { x: number; y: number },
) {
  const x = opened.x - closed.x,
    y = opened.y - closed.y,
    length = x * x + y * y;
  return length < 1
    ? 0
    : clamp01(
        ((pointer.x - closed.x) * x + (pointer.y - closed.y) * y) / length,
      );
}
export function inspectionDistance(radius: number, aspect: number, fov = 34) {
  return (
    (radius /
      Math.sin(
        Math.atan(
          Math.tan((fov * Math.PI) / 360) * Math.min(1, Math.max(0.2, aspect)),
        ),
      )) *
    1.12
  );
}
