import { describe, expect, it } from "vitest";
import { ROOMS } from "./rooms";

describe("room content", () => {
  it("keeps the case-study set measured and complete", () => {
    expect(ROOMS).toHaveLength(3);
    expect(ROOMS.map((room) => room.code)).toEqual(["VZ-01", "VZ-04", "VZ-07"]);
    expect(ROOMS.every((room) => room.seats > 0 && room.decaySeconds > 0)).toBe(true);
  });
});
