import { describe, expect, it } from "vitest";
import { PHENOMENA, hexToRgb } from "../light/phenomena";
import { ROOMS, ROOM_COUNT, anchorId, roomIndex, stationForHash } from "./rooms";

describe("rooms", () => {
  it("walks foyer → six rooms → exit", () => {
    expect(ROOM_COUNT).toBe(8);
    expect(ROOMS[0].id).toBe("foyer");
    expect(ROOMS.at(-1)!.id).toBe("exit");
    expect(ROOMS.filter((r) => r.numeral).map((r) => r.numeral)).toEqual(["I", "II", "III", "IV", "V", "VI"]);
  });

  it("has unique ids and anchors", () => {
    const ids = new Set(ROOMS.map((r) => anchorId(r.id)));
    expect(ids.size).toBe(ROOMS.length);
  });

  it("gives every room its light", () => {
    for (const room of ROOMS) {
      const light = PHENOMENA[room.id];
      expect(light.stops).toHaveLength(4);
      for (const hex of light.stops) expect(hex).toMatch(/^#[0-9A-F]{6}$/);
    }
  });

  it("labels the four natural phenomena", () => {
    const labelled = ROOMS.filter((r) => r.label).map((r) => r.id);
    expect(labelled).toEqual(["blue-hour", "aurora", "noctiluca", "alpenglow"]);
  });

  it("keeps hero copy short enough for the display size", () => {
    expect(ROOMS[0].title.length).toBeLessThanOrEqual(50);
  });

  it("maps hashes to stations", () => {
    expect(stationForHash("#nl-aurora")).toBe(roomIndex("aurora"));
    expect(stationForHash("#nl-visit")).toBe(6);
    expect(stationForHash("#nope")).toBeNull();
    expect(stationForHash("")).toBeNull();
  });

  it("decodes hex stops", () => {
    expect(hexToRgb("#FF8000")).toEqual([1, 128 / 255, 0]);
  });
});
