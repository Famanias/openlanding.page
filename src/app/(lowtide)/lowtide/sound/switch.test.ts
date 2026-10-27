import { describe, expect, it, vi } from "vitest";
import { createSoundSwitch } from "./switch";

function fakeScape() {
  return { setOn: vi.fn(), dispose: vi.fn() };
}

function deferred<T>() {
  let resolve!: (v: T) => void;
  const promise = new Promise<T>((r) => (resolve = r));
  return { promise, resolve };
}

describe("sound switch", () => {
  it("creates the soundscape once however fast the toggle is pressed", async () => {
    const d = deferred<ReturnType<typeof fakeScape>>();
    const create = vi.fn(() => d.promise);
    const sw = createSoundSwitch(create);
    sw.toggle(); // on
    sw.toggle(); // off
    sw.toggle(); // on
    const scape = fakeScape();
    d.resolve(scape);
    await sw.settled();
    expect(create).toHaveBeenCalledTimes(1);
    expect(sw.isOn()).toBe(true);
    expect(scape.setOn).toHaveBeenLastCalledWith(true);
  });

  it("ends silent when the last press was off", async () => {
    const d = deferred<ReturnType<typeof fakeScape>>();
    const sw = createSoundSwitch(() => d.promise);
    sw.toggle();
    sw.toggle();
    const scape = fakeScape();
    d.resolve(scape);
    await sw.settled();
    expect(sw.isOn()).toBe(false);
    expect(scape.setOn).toHaveBeenLastCalledWith(false);
  });

  it("disposes a soundscape that arrives after the switch was disposed", async () => {
    const d = deferred<ReturnType<typeof fakeScape>>();
    const sw = createSoundSwitch(() => d.promise);
    sw.toggle();
    sw.dispose();
    const scape = fakeScape();
    d.resolve(scape);
    await sw.settled();
    expect(scape.dispose).toHaveBeenCalledTimes(1);
    expect(scape.setOn).not.toHaveBeenCalledWith(true);
  });

  it("reports off and can retry when creation fails", async () => {
    let fail = true;
    const scape = fakeScape();
    const sw = createSoundSwitch(() => (fail ? Promise.reject(new Error("no audio")) : Promise.resolve(scape)));
    sw.toggle();
    await sw.settled();
    expect(sw.isOn()).toBe(false);
    fail = false;
    sw.toggle();
    await sw.settled();
    expect(sw.isOn()).toBe(true);
    expect(scape.setOn).toHaveBeenLastCalledWith(true);
  });
});
