import { describe, expect, it } from "vitest";
import { EMAIL_MESSAGE, validateWalkthrough } from "./validate";

const base = { name: "Alex Morgan", students: "1–25" };

describe("validateWalkthrough", () => {
  it("accepts a studio email", () => {
    expect(validateWalkthrough({ ...base, email: "alex@studio.com" })).toEqual({ ok: true });
    expect(validateWalkthrough({ ...base, email: "  alex@studio.com " })).toEqual({ ok: true });
  });

  it("rejects a missing, bare or half-written address with the on-page message", () => {
    for (const email of ["", "alex", "@studio.com", "alex@"]) {
      expect(validateWalkthrough({ ...base, email })).toEqual({ ok: false, field: "email", message: EMAIL_MESSAGE });
    }
  });
});
