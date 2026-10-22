import { describe, expect, it } from "vitest";
import { cameraAt, listenerAt, reflectionPoints, surfaceAt, type SurfaceId } from "./geometry";

describe("VOLUME ZERO chamber geometry", () => {
  it("eases the camera from the source wall to the listener wall", () => {
    expect(cameraAt(0)).toEqual({ depth: 0, yaw: -0.18 });
    expect(cameraAt(1)).toEqual({ depth: 1, yaw: 0.18 });
    expect(cameraAt(0.5).depth).toBeCloseTo(0.5, 5);
  });

  it("keeps the listener inside the chamber as the control moves", () => {
    const start = listenerAt(0, 0);
    const end = listenerAt(1, 1);
    expect(start.x).toBeGreaterThanOrEqual(-1);
    expect(start.x).toBeLessThanOrEqual(1);
    expect(end.z).toBeGreaterThan(start.z);
  });

  it("changes the stable reflection count by surface", () => {
    const listener = listenerAt(0.45, 0.2);
    const counts = (Object.keys({ felt: 0, slat: 0, stone: 0 }) as SurfaceId[]).map((surface) => reflectionPoints(listener, surface).length);
    expect(counts).toEqual([3, 5, 7]);
    expect(surfaceAt("stone").label).toBe("Honed stone");
  });
});
