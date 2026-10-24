import { describe, expect, it } from "vitest";
import { validateBrief } from "./validate";

describe("a commission brief", () => {
  it("asks for the information an artist needs to respond", () => {
    const result = validateBrief({ name: "  ", email: "not-an-email", package: "unknown", story: "Hi" });
    expect(Object.keys(result)).toEqual(["name", "email", "package", "story"]);
  });
  it("accepts a considered idea and a reply address", () => {
    expect(validateBrief({ name: "Rin", email: "rin@example.com", package: "moment", story: "My sister and her cat waiting at our childhood station." })).toEqual({});
  });
});
