import { describe, expect, test } from "vitest";
import { pickRenderMode } from "./capabilities";

describe("pickRenderMode", () => {
  test("reduced motion always gets the poster", () => {
    expect(pickRenderMode({ reducedMotion: true, webgpu: true, webgl2: true })).toBe("poster");
  });

  test("prefers WebGPU, falls back to WebGL2", () => {
    expect(pickRenderMode({ reducedMotion: false, webgpu: true, webgl2: true })).toBe("webgpu");
    expect(pickRenderMode({ reducedMotion: false, webgpu: false, webgl2: true })).toBe("webgl2");
  });

  test("no GPU path gets the poster", () => {
    expect(pickRenderMode({ reducedMotion: false, webgpu: false, webgl2: false })).toBe("poster");
  });
});
