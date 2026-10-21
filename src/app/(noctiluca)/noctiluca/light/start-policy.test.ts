import { describe, expect, it } from "vitest";
import { renderScale, startPolicy } from "./start-policy";

const desktop = { reducedMotion: false, coarsePointer: false, width: 1440, webgl2: true };

describe("startPolicy", () => {
  it("never mounts the light under reduced motion", () => {
    expect(startPolicy({ ...desktop, reducedMotion: true })).toBe("never");
    expect(startPolicy({ ...desktop, coarsePointer: true, reducedMotion: true })).toBe("never");
  });

  it("never mounts without WebGL2", () => {
    expect(startPolicy({ ...desktop, webgl2: false })).toBe("never");
  });

  it("starts on idle on desktop", () => {
    expect(startPolicy(desktop)).toBe("idle");
  });

  it("waits for a tap on touch and narrow screens", () => {
    expect(startPolicy({ ...desktop, coarsePointer: true })).toBe("tap");
    expect(startPolicy({ ...desktop, width: 390 })).toBe("tap");
  });
});

describe("renderScale", () => {
  it("renders the soft field at half resolution", () => {
    expect(renderScale(1, 1440)).toBe(0.5);
    expect(renderScale(2, 1440)).toBe(1);
    expect(renderScale(3, 1440)).toBe(1);
    expect(renderScale(1, 2560)).toBe(0.4);
  });
});
