import { describe, expect, it } from "vitest";
import { validateFieldWalk, type FieldWalkInput } from "./validation";

const valid: FieldWalkInput = {
  name: "Mara Chen",
  farm: "Cienega Fields",
  email: "mara@example.com",
  acres: "14",
  goal: "Hold the next storm in the root zone.",
};

describe("RILL field-walk validation", () => {
  it("rejects missing required fields and malformed email", () => {
    const result = validateFieldWalk({ ...valid, name: " ", email: "mara@" });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors).toMatchObject({ name: "Add your name.", email: "Enter a valid email." });
  });

  it("rejects non-positive or non-numeric acreage", () => {
    expect(validateFieldWalk({ ...valid, acres: "0" })).toMatchObject({ ok: false });
    expect(validateFieldWalk({ ...valid, acres: "many" })).toMatchObject({ ok: false });
  });

  it("caps the field goal at 600 characters", () => {
    const result = validateFieldWalk({ ...valid, goal: "x".repeat(601) });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors.goal).toBe("Keep the note under 600 characters.");
  });

  it("returns normalized data for a valid field walk request", () => {
    const result = validateFieldWalk({ ...valid, name: "  Mara Chen  ", acres: "14.5" });
    expect(result).toEqual({
      ok: true,
      data: { ...valid, name: "Mara Chen", acres: "14.5" },
    });
  });
});

