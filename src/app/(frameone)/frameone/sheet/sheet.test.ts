import { describe, expect, it } from "vitest";
import { frameTransform, nextProject } from "./sheet";

describe("film viewer navigation", () => {
  it("wraps in both directions without losing a project", () => {
    expect(nextProject(0, -1, 4)).toBe(3);
    expect(nextProject(3, 1, 4)).toBe(0);
    expect(nextProject(1, 1, 4)).toBe(2);
    expect(nextProject(0, 1, 0)).toBe(0);
  });

  it("maps the viewport back to the originating frame", () => {
    expect(frameTransform({ left: 120, top: 75, width: 240, height: 135 }, 1200, 900)).toEqual({
      x: 120, y: 75, scaleX: 0.2, scaleY: 0.15,
    });
  });

  it("avoids invalid transforms when the viewport has no size", () => {
    expect(frameTransform({ left: 10, top: 20, width: 0, height: 0 }, 0, 0)).toEqual({
      x: 10, y: 20, scaleX: 1, scaleY: 1,
    });
  });
});
