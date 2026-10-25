import { describe, expect, it } from "vitest";
import { validateSubscribe } from "./validate-subscribe";

describe("serein dispatch form validation", () => {
  it("requires a name and a valid email", () => {
    expect(validateSubscribe({ name: "", email: "bad" })).toEqual({
      name: "Add your name",
      email: "Enter a valid email",
    });
  });

  it("trims valid values and returns no errors", () => {
    expect(validateSubscribe({ name: "  Ada  ", email: "  ada@example.com " })).toEqual({});
  });
});
