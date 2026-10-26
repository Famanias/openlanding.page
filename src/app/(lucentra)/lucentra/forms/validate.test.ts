import { describe, expect, it } from "vitest";
import { validateBrief, type BriefInput } from "./validate";

const valid: BriefInput = { name: "Mira Chen", email: "mira@example.com", surface: "quartz" };

describe("lucentra brief validation", () => {
  it("accepts a complete brief", () => expect(validateBrief(valid)).toEqual({}));
  it("requires a name and work email", () => {
    expect(validateBrief({ ...valid, name: "", email: "bad" })).toEqual({ name: "Add your name.", email: "Use a work email format." });
  });
  it("rejects unknown surfaces", () => expect(validateBrief({ ...valid, surface: "unknown" })).toEqual({ surface: "Choose a starting surface." }));
});
