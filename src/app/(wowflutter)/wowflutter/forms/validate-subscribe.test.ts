import { describe, expect, test } from "vitest";
import { validateSubscribe } from "./validate-subscribe";

describe("validateSubscribe", () => {
  test("accepts a plausible address with a chosen side", () => {
    expect(validateSubscribe({ email: "reader@example.com", side: "a" })).toEqual({});
    expect(validateSubscribe({ email: "  reader@example.com  ", side: "b" })).toEqual({});
  });

  test("rejects a missing or malformed email", () => {
    expect(validateSubscribe({ email: "", side: "a" }).email).toBe("Enter a valid email");
    expect(validateSubscribe({ email: "reader@", side: "a" }).email).toBe("Enter a valid email");
    expect(validateSubscribe({ email: "no spaces@example.com", side: "a" }).email).toBe("Enter a valid email");
  });

  test("rejects an unknown side", () => {
    expect(validateSubscribe({ email: "reader@example.com", side: "" }).side).toBe("Pick Side A or Side B");
    expect(validateSubscribe({ email: "reader@example.com", side: "c" }).side).toBe("Pick Side A or Side B");
  });

  test("reports every problem at once", () => {
    expect(Object.keys(validateSubscribe({ email: "x", side: "z" })).sort()).toEqual(["email", "side"]);
  });
});
