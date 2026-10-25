import { describe, expect, it } from "vitest";
import { getHealthSnapshot, INITIAL_HEALTH, selectTrack, type TrackId } from "./health";

describe("AFTERCART health console", () => {
  it("selects a care track and returns its target health snapshot", () => {
    const next = selectTrack(INITIAL_HEALTH, "speed");

    expect(next.active).toBe("speed");
    expect(getHealthSnapshot(next)).toMatchObject({
      score: 86,
      label: "Ready to tune",
      progress: 0.86,
      ticket: "Trim the path from first tap to paid order.",
    });
  });

  it("leaves state unchanged for an unknown track id", () => {
    const next = selectTrack(INITIAL_HEALTH, "unknown" as TrackId);
    expect(next).toEqual(INITIAL_HEALTH);
  });

  it("reselecting the active track is stable", () => {
    const next = selectTrack(selectTrack(INITIAL_HEALTH, "conversion"), "conversion");
    expect(next).toEqual(selectTrack(INITIAL_HEALTH, "conversion"));
  });
});
