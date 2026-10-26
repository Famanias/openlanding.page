import { describe, expect, it } from "vitest";
import { firstError, ROLES, seatNumber, starterFor, TEAMS, validate } from "./request";

const ok = { email: "ines@kettleandray.studio", role: ROLES[0], team: TEAMS[1] };

describe("seat request", () => {
  it("accepts a complete request", () => {
    expect(validate(ok)).toEqual({});
    expect(firstError(validate(ok))).toBeNull();
  });

  it("asks for an email, then a complete one", () => {
    expect(validate({ ...ok, email: "  " }).email).toMatch(/Add/);
    expect(validate({ ...ok, email: "ines@kettle" }).email).toMatch(/complete/);
    expect(validate({ ...ok, email: "ines kettle@ray.co" }).email).toBeDefined();
  });

  it("only takes listed roles and team sizes", () => {
    expect(validate({ ...ok, role: "" }).role).toBeDefined();
    expect(validate({ ...ok, team: "9000" }).team).toBeDefined();
  });

  it("points focus at the first broken field in form order", () => {
    expect(firstError(validate({ email: "", role: "", team: "" }))).toBe("email");
    expect(firstError(validate({ ...ok, role: "", team: "" }))).toBe("role");
  });

  it("gives a stable four-digit seat number", () => {
    const n = seatNumber(ok.email);
    expect(n).toMatch(/^\d{4}$/);
    expect(seatNumber(` ${ok.email.toUpperCase()} `)).toBe(n);
    expect(seatNumber("someone@else.com")).not.toBe(n);
  });

  it("hands each role a starter material", () => {
    expect(starterFor("3D & motion")).toBe("Dense flint");
    expect(starterFor("anything")).toBe("Crown silica");
  });
});
