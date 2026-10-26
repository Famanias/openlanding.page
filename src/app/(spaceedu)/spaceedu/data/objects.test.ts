import { describe, expect, it } from "vitest";
import { OBJECTS, OBJECT_ORDER } from "./objects";

describe("SpaceEdu object data", () => {
  it("keeps the three lesson objects complete", () => {
    expect(OBJECT_ORDER).toHaveLength(3);
    for (const key of OBJECT_ORDER) {
      expect(OBJECTS[key].mass).toBeGreaterThan(0);
      expect(OBJECTS[key].distanceLy).toBeGreaterThan(0);
      expect(OBJECTS[key].palette).toHaveLength(2);
    }
  });
});
