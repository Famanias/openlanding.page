import { describe, expect, it } from "vitest";
import { validatePreorder } from "./preorder";

describe("validatePreorder", () => {
  it("accepts a complete order", () => {
    expect(validatePreorder({ email: "a@b.co", size: "9", finish: "tidewater" })).toEqual({
      ok: true,
      value: { email: "a@b.co", size: 9, finish: "tidewater" },
    });
  });

  it("trims the email", () => {
    const r = validatePreorder({ email: "  a@b.co ", size: "6", finish: "moonstone" });
    expect(r.ok && r.value.email).toBe("a@b.co");
  });

  it("reports every bad field with its message", () => {
    const r = validatePreorder({ email: "nope", size: "14", finish: "" });
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.errors).toEqual({
      email: "Add an email so we can write when your ring ships.",
      size: "Pick a ring size from 6 to 13.",
      finish: "Choose a finish.",
    });
  });

  it("takes whole sizes only", () => {
    expect(validatePreorder({ email: "a@b.co", size: "6.5", finish: "moonstone" }).ok).toBe(false);
    expect(validatePreorder({ email: "a@b.co", size: "", finish: "moonstone" }).ok).toBe(false);
  });

  it("rejects an unknown finish", () => {
    expect(validatePreorder({ email: "a@b.co", size: "8", finish: "gold" }).ok).toBe(false);
  });
});
