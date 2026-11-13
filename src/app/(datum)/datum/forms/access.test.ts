import { describe, expect, it } from "vitest";
import { formatLocalBrief, ticketReference, validateAccess } from "./access";

describe("datum access form validation and brief", () => {
  it("flags invalid fields with actionable messages", () => {
    const errors = validateAccess({
      name: "  ",
      email: "not-an-email",
      runtime: "WebGPU",
      notes: "short",
    });
    expect(errors.name).toBe("Enter your name.");
    expect(errors.email).toBe("Enter a valid work email.");
    expect(errors.notes).toContain("at least 8 characters");
  });

  it("passes validation when all required inputs are valid", () => {
    const errors = validateAccess({
      name: "Elena Rostova",
      email: "elena@renderlab.dev",
      runtime: "Both",
      notes: "Cascaded shadow atlas stalls at 2x DPI on mobile Safari.",
    });
    expect(errors).toEqual({});
  });

  it("generates deterministic DT-XXXXXX ticket references", () => {
    const a = ticketReference(["shadows", 1.25, 60]);
    const b = ticketReference(["shadows", 1.25, 60]);
    const c = ticketReference(["bloom", 1.0, 120]);
    expect(a).toMatch(/^DT-[0-9A-Z]{6}$/);
    expect(a).toBe(b);
    expect(a).not.toBe(c);
  });

  it("explicitly marks generated local briefs as untransmitted", () => {
    const brief = formatLocalBrief(
      {
        name: "Elena",
        email: "elena@renderlab.dev",
        runtime: "WebGPU",
        notes: "Inspecting multi-pass G-buffer bandwidth on integrated GPUs.",
      },
      {
        reference: "DT-123ABC",
        activePass: "Cascaded Shadows",
        enabledCount: 5,
        resolutionScale: 1.0,
        targetFps: 60,
        totalMs: 11.1,
      },
    );
    expect(brief).toContain("DT-123ABC");
    expect(brief).toContain("has NOT been transmitted");
    expect(brief).toContain("11.1 ms");
  });
});
