import { describe, expect, it } from "vitest";
import { validateBrief } from "./validation";

describe("project brief", () => {
  it("explains missing or malformed fields before preparing a brief", () => {
    expect(validateBrief({ name: " ", email: "nope", story: "" })).toEqual({
      name: "What should we call you?", email: "Add a valid email address.", story: "Tell us a little about your idea (at least 15 characters).",
    });
    expect(validateBrief({ name: "Aki", email: "aki@example.com", story: "A short film about a wandering cloud." })).toEqual({});
    expect(validateBrief({ name: "a".repeat(101), email: "aki@example.com", story: "A short film about spring." }).name).toBeDefined();
  });
});
