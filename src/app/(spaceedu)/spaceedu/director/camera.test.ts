import { describe, expect, it } from "vitest";
import { cameraAt, springStep } from "./camera";

describe("camera director", () => {
  it("interpolates the flight", () => expect(cameraAt(.5).distance).toBeLessThan(40));
  it("moves a spring toward its target", () => expect(springStep(0, 1, 0, 1 / 60).value).toBeGreaterThan(0));
});
