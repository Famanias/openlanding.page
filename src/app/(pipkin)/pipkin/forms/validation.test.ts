import { describe, it, expect } from "vitest";
import { validateList, isValid } from "./validation";

describe("pipkin list validation", () => {
  it("accepts a complete entry", () => {
    expect(isValid(validateList({ name: "Ada", email: "ada@example.com", leaning: "plum-lavender" }))).toBe(true);
  });

  it("reports every problem at once", () => {
    const errors = validateList({ name: "A", email: "nope", leaning: "" });
    expect(Object.keys(errors).sort()).toEqual(["email", "leaning", "name"]);
  });

  it("trims before checking", () => {
    expect(validateList({ name: "  Bo  ", email: " bo@x.io ", leaning: "x" })).toEqual({});
    expect(validateList({ name: "   ", email: "bo@x.io", leaning: "x" }).name).toBeTruthy();
  });
});
