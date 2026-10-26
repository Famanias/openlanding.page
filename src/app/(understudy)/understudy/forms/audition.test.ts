import { describe, expect, it } from "vitest";
import { callSheetRef, firstCallTime, isValid, validateAudition } from "./audition";

const ok = { name: "Maya Ortiz", email: "maya@example.com", part: "product-analyst" };

describe("validateAudition", () => {
  it("accepts a complete entry", () => {
    expect(isValid(validateAudition(ok))).toBe(true);
  });

  it("asks for every missing field", () => {
    const errors = validateAudition({ name: "  ", email: "", part: "" });
    expect(Object.keys(errors).sort()).toEqual(["email", "name", "part"]);
  });

  it("rejects malformed emails and unknown parts", () => {
    expect(validateAudition({ ...ok, email: "maya@" }).email).toMatch(/email/);
    expect(validateAudition({ ...ok, email: "maya@site.c" }).email).toBeDefined();
    expect(validateAudition({ ...ok, part: "stagehand" }).part).toBeDefined();
  });

  it("caps the name", () => {
    expect(validateAudition({ ...ok, name: "x".repeat(61) }).name).toMatch(/60/);
  });
});

describe("callSheetRef", () => {
  it("is stable, formatted and ignores case and padding", () => {
    const ref = callSheetRef(ok);
    expect(ref).toMatch(/^US-[A-HJ-NP-Z2-9]{4}$/);
    expect(callSheetRef({ ...ok, name: "  maya ortiz ", email: "MAYA@example.com" })).toBe(ref);
  });

  it("changes with the part", () => {
    expect(callSheetRef({ ...ok, part: "ai-engineer" })).not.toBe(callSheetRef(ok));
  });
});

describe("firstCallTime", () => {
  it("is the next weekday at nine", () => {
    // Wednesday 21 Oct 2026, 15:00 → Thursday
    const thu = firstCallTime(new Date(2026, 9, 21, 15));
    expect(thu.day).toBe("Thursday");
    expect(thu.date.getHours()).toBe(9);
  });

  it("skips the weekend", () => {
    // Friday 23 Oct 2026 → Monday 26 Oct
    const mon = firstCallTime(new Date(2026, 9, 23, 10));
    expect(mon.day).toBe("Monday");
    expect(mon.date.getDate()).toBe(26);
  });
});
