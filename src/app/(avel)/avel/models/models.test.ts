import { describe, expect, it } from "vitest";
import { getModel } from "./models";

describe("Avel model selection", () => {
  it("returns the requested model and its corresponding example", () => {
    expect(getModel("spark").name).toBe("Avel Spark");
    expect(getModel("spark").example).toContain("launch");
    expect(getModel("reason").name).toBe("Avel Reason");
  });
  it("falls back to the everyday model for an unknown selection", () => {
    expect(getModel("unknown").id).toBe("core");
  });
});
