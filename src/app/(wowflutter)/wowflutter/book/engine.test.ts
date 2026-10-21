import { describe, expect, test, vi } from "vitest";
import { TurnEngine, type EngineHooks, type EngineView } from "./engine";
import { FLICK_SPEED } from "./turn";

function setup() {
  let clock = 0;
  let nextId = 0;
  const queue = new Map<number, (now: number) => void>();
  const views: EngineView[] = [];
  const hooks: EngineHooks = {
    render: (v) => views.push(v),
    commit: vi.fn(),
    request: (cb) => {
      queue.set(++nextId, cb);
      return nextId;
    },
    cancel: (id) => void queue.delete(id),
    now: () => clock,
  };
  const engine = new TurnEngine(hooks);
  const frame = (ms = 16) => {
    clock += ms;
    const pending = [...queue.values()];
    queue.clear();
    pending.forEach((cb) => cb(clock));
  };
  const settle = (max = 400) => {
    for (let i = 0; i < max && queue.size > 0; i++) frame();
  };
  return { engine, hooks, views, frame, settle, pending: () => queue.size };
}

describe("TurnEngine: animated turns", () => {
  test("goTo animates a single leaf and commits once", () => {
    const { engine, hooks, views, settle } = setup();
    engine.goTo(1);
    settle();
    expect(engine.spread).toBe(1);
    expect(hooks.commit).toHaveBeenCalledTimes(1);
    expect(hooks.commit).toHaveBeenLastCalledWith(1);
    // It really animated: some frame showed the leaf part-way.
    expect(views.some((v) => v.turning && v.turning.progress > 0.2 && v.turning.progress < 0.8)).toBe(true);
    expect(views.at(-1)?.turning).toBeNull();
  });

  test("repeated steps queue leaf after leaf", () => {
    const { engine, hooks, settle } = setup();
    engine.step(1);
    engine.step(1);
    engine.step(1);
    settle();
    expect(engine.spread).toBe(3);
    expect((hooks.commit as ReturnType<typeof vi.fn>).mock.calls.map((c) => c[0])).toEqual([1, 2, 3]);
  });

  test("steps never leave the book", () => {
    const { engine, settle } = setup();
    engine.step(-1);
    settle();
    expect(engine.spread).toBe(0);
    engine.goTo(99);
    settle();
    expect(engine.spread).toBe(7);
    engine.step(1);
    settle();
    expect(engine.spread).toBe(7);
  });

  test("asking for the opposite page mid-turn sends the leaf back", () => {
    const { engine, frame, settle } = setup();
    engine.step(1);
    frame();
    frame();
    engine.step(-1);
    settle();
    expect(engine.spread).toBe(0);
  });
});

describe("TurnEngine: dragging", () => {
  test("a drag released past the threshold finishes the turn", () => {
    const { engine, hooks, settle } = setup();
    expect(engine.grab(1)).toEqual({ dir: 1, progress: 0 });
    engine.drag(0.7);
    engine.release(0);
    settle();
    expect(engine.spread).toBe(1);
    expect(hooks.commit).toHaveBeenLastCalledWith(1);
  });

  test("a short drag settles back and the spread is unchanged", () => {
    const { engine, hooks, settle } = setup();
    engine.grab(1);
    engine.drag(0.2);
    engine.release(0);
    settle();
    expect(engine.spread).toBe(0);
    expect(hooks.commit).toHaveBeenLastCalledWith(0);
  });

  test("a flick finishes a barely-started turn", () => {
    const { engine, settle } = setup();
    engine.grab(1);
    engine.drag(0.1);
    engine.release(FLICK_SPEED + 0.2);
    settle();
    expect(engine.spread).toBe(1);
  });

  test("the pointer owns the leaf while it is held: no animation runs", () => {
    const { engine, pending } = setup();
    engine.grab(1);
    engine.drag(0.5);
    expect(pending()).toBe(0);
  });

  test("a backward drag turns the previous leaf", () => {
    const { engine, views, settle } = setup();
    engine.jumpTo(3);
    engine.grab(-1);
    engine.drag(0.6);
    expect(views.at(-1)?.turning).toMatchObject({ leaf: 2, dir: -1 });
    engine.release(0);
    settle();
    expect(engine.spread).toBe(2);
  });

  test("grabbing a leaf already in flight continues from where it is", () => {
    const { engine, frame, settle } = setup();
    engine.step(1);
    frame();
    frame();
    frame();
    const grabbed = engine.grab(-1);
    expect(grabbed?.dir).toBe(1);
    expect(grabbed?.progress).toBeGreaterThan(0);
    engine.drag(0.1);
    engine.release(0);
    settle();
    expect(engine.spread).toBe(0);
  });

  test("there is nothing to grab past either cover", () => {
    const { engine } = setup();
    expect(engine.grab(-1)).toBeNull();
    engine.jumpTo(7);
    expect(engine.grab(1)).toBeNull();
  });
});

describe("TurnEngine: jumps and reduced motion", () => {
  test("jumpTo is instant and commits", () => {
    const { engine, hooks, pending } = setup();
    engine.jumpTo(5);
    expect(engine.spread).toBe(5);
    expect(hooks.commit).toHaveBeenCalledWith(5);
    expect(pending()).toBe(0);
  });

  test("under reduced motion turns are instant and the leaf cannot be dragged", () => {
    const { engine, hooks, views, pending } = setup();
    engine.setReduced(true);
    engine.step(1);
    expect(engine.spread).toBe(1);
    expect(pending()).toBe(0);
    expect(views.every((v) => v.turning === null)).toBe(true);
    expect(engine.grab(1)).toBeNull();
    expect(hooks.commit).toHaveBeenLastCalledWith(1);
  });
});

describe("TurnEngine: position", () => {
  test("reports a continuous position through the book", () => {
    const { engine, views } = setup();
    engine.jumpTo(2);
    engine.grab(1);
    engine.drag(0.5);
    expect(views.at(-1)?.position).toBe(2.5);
    engine.release(0);
    engine.dispose();
  });
});
