import { describe, expect, it } from "vitest";
import { KINDS, KIND_IDS, allServiceNames, kindById, nextTab, pad2, panelState, serviceCount } from "./services";

describe("tolvar services", () => {
  it("sorts the work into four moves, in order", () => {
    expect(KIND_IDS).toEqual(["cut", "fill", "pipe", "haul"]);
  });

  it("lists exactly twenty services, none twice", () => {
    const names = allServiceNames();
    expect(serviceCount()).toBe(20);
    expect(new Set(names).size).toBe(20);
  });

  it("keeps every service the business actually offers", () => {
    expect([...allServiceNames()].sort()).toEqual(
      [
        "Basements", "Building Pads", "Clearing", "Concrete", "Demolition", "Dirt Work", "Drainage Improvements",
        "Excavating & Grading", "Footers", "Hauling", "Piers", "Ponds & Waterfalls", "Rock Walls", "Storm Drains",
        "Terraces", "Top Soil", "Trucking Services", "Underground Utilities", "Water Lines", "Yard Grades",
      ].sort(),
    );
  });

  it("gives every kind a photo, alt text and copy", () => {
    for (const kind of KINDS) {
      expect(kind.assetKey).toMatch(/^[a-z0-9-]+$/);
      expect(kind.alt.length).toBeGreaterThan(20);
      expect(kind.blurb.length).toBeGreaterThan(40);
      for (const service of kind.services) expect(service.line.length).toBeGreaterThan(10);
    }
  });

  it("finds a kind by id and rejects an unknown one", () => {
    expect(kindById("pipe").label).toBe("Pipe");
    expect(() => kindById("moat" as never)).toThrow();
  });

  it("pads row numbers to two digits", () => {
    expect(pad2(3)).toBe("03");
    expect(pad2(20)).toBe("20");
  });
});

describe("tolvar tab keys", () => {
  it("moves forward and back, wrapping at the ends", () => {
    expect(nextTab(0, "ArrowRight", 4)).toBe(1);
    expect(nextTab(3, "ArrowDown", 4)).toBe(0);
    expect(nextTab(0, "ArrowLeft", 4)).toBe(3);
    expect(nextTab(2, "ArrowUp", 4)).toBe(1);
  });

  it("jumps to the ends on Home and End", () => {
    expect(nextTab(2, "Home", 4)).toBe(0);
    expect(nextTab(1, "End", 4)).toBe(3);
  });

  it("leaves other keys alone, so Space and Enter still press the button", () => {
    expect(nextTab(1, " ", 4)).toBeNull();
    expect(nextTab(1, "Enter", 4)).toBeNull();
    expect(nextTab(1, "Tab", 4)).toBeNull();
    expect(nextTab(0, "ArrowRight", 0)).toBeNull();
  });

  it("places panels before or after the open one", () => {
    expect(panelState(1, 1)).toBe("active");
    expect(panelState(0, 1)).toBe("before");
    expect(panelState(3, 1)).toBe("after");
  });
});
