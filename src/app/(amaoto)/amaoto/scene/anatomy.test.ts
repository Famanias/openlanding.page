import { describe, it, expect } from "vitest";
import {
  anatomyReducer,
  createAnatomy,
  projectedRunnerOpen,
  sampleDemonstration,
  inspectionDistance,
} from "./anatomy";
describe("Anatomy inspector", () => {
  it("selects any part and restores a complete overview", () => {
    let state = createAnatomy();
    state = anatomyReducer(state, { type: "open", value: 0.1 });
    state = anatomyReducer(state, { type: "select", part: "thread" });
    expect(state.open).toBe(0.85);
    state = anatomyReducer(state, { type: "reveal" });
    state = anatomyReducer(state, { type: "overview" });
    expect(state).toMatchObject({
      part: null,
      open: 1,
      reveal: false,
      action: null,
      turn: 0,
    });
  });
  it("manual manipulation and selection cancel demonstrations; stale completion cannot clear a new action", () => {
    let state = anatomyReducer(createAnatomy(), {
      type: "play",
      kind: "linkage",
      reduced: false,
    });
    const id = state.action!.id;
    state = anatomyReducer(state, { type: "select", part: "handle" });
    expect(state.action).toBeNull();
    state = anatomyReducer(state, {
      type: "play",
      kind: "turn",
      reduced: false,
    });
    expect(anatomyReducer(state, { type: "finish", id }).action).toEqual(
      state.action,
    );
    expect(
      anatomyReducer(state, { type: "open", value: 0.4 }).action,
    ).toBeNull();
  });
  it("keeps reduced-motion actions immediate and independently usable", () => {
    let state = anatomyReducer(createAnatomy(), {
      type: "play",
      kind: "turn",
      reduced: true,
    });
    expect(state.turn).toBeCloseTo(Math.PI / 2);
    expect(state.action).toBeNull();
    state = anatomyReducer(state, {
      type: "play",
      kind: "trace",
      reduced: true,
    });
    expect(state.staticTie).toBe(true);
  });
  it("maps projected shaft motion on vertical, horizontal and oblique axes", () => {
    expect(
      projectedRunnerOpen({ x: 90, y: 50 }, { x: 0, y: 0 }, { x: 0, y: 100 }),
    ).toBe(0.5);
    expect(
      projectedRunnerOpen({ x: 25, y: 99 }, { x: 0, y: 0 }, { x: 100, y: 0 }),
    ).toBe(0.25);
    expect(
      projectedRunnerOpen({ x: 50, y: 50 }, { x: 0, y: 0 }, { x: 100, y: 100 }),
    ).toBe(0.5);
    expect(
      projectedRunnerOpen(
        { x: 400, y: 400 },
        { x: 0, y: 0 },
        { x: 100, y: 100 },
      ),
    ).toBe(1);
  });
  it("returns to the saved opening and frames narrower canvases safely", () => {
    expect(sampleDemonstration("linkage", 0, 0.7).open).toBe(0.7);
    expect(sampleDemonstration("linkage", 3.2, 0.7)).toMatchObject({
      open: 0.7,
      running: false,
    });
    expect(sampleDemonstration("trace", 3, 1).trace).toBe(-1);
    expect(inspectionDistance(1, 0.6)).toBeGreaterThan(
      inspectionDistance(1, 1.5),
    );
  });
});
