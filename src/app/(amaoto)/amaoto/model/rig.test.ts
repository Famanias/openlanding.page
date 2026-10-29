import { describe, expect, it } from "vitest";
import {
  ATTACH,
  LINK_LENGTH,
  RIB_LENGTH,
  paperPoint,
  ribPoint,
  solveRig,
  waveOpen,
} from "./rig";
import { canopyRadius } from "./runtime";
describe("wagasa linkage", () => {
  it("keeps fixed length stretchers and the collar monotonic within the shaft", () => {
    let previous = -Infinity;
    for (let step = 0; step <= 100; step++) {
      const rig = solveRig(step / 100);
      expect(rig.runner.y).toBeGreaterThanOrEqual(previous);
      expect(rig.runner.y).toBeGreaterThan(-1);
      expect(rig.runner.y).toBeLessThan(1.7);
      previous = rig.runner.y;
      for (const rib of rig.ribs)
        expect(
          Math.hypot(rib.attach.x, rib.attach.y - rig.runner.y, rib.attach.z),
        ).toBeCloseTo(LINK_LENGTH, 9);
    }
  });
  it("keeps skin above ribs and rim attached through opening and separation", () => {
    for (const open of [0, 0.25, 0.6, 1])
      for (const explode of [0, 1])
        for (let rib = 0; rib < 40; rib++) {
          const rig = solveRig(open, explode);
          const { rim, tip } = rig.ribs[rib];
          expect(
            Math.hypot(rim.x - tip.x, rim.y - tip.y, rim.z - tip.z),
          ).toBeCloseTo(0, 12);
          for (let j = 0; j <= 12; j++)
            expect(paperPoint(open, rib, j / 12, 0, explode).y).toBeGreaterThan(
              ribPoint(open, rib, j / 12, explode).y,
            );
        }
    expect(canopyRadius(0) / RIB_LENGTH).toBeLessThan(0.07);
  });
  it("waves the flexible outer rib without moving its stretcher hinge", () => {
    expect(waveOpen(0.4, 0, 1)).toBeGreaterThan(waveOpen(0.4, 39, 1));
    expect(waveOpen(0, 20, 1)).toBe(0);
    expect(waveOpen(1, 39, 1)).toBe(1);
    expect(ribPoint(0.5, 20, ATTACH / RIB_LENGTH, 0, 1)).toEqual(
      ribPoint(0.5, 20, ATTACH / RIB_LENGTH),
    );
  });
});
