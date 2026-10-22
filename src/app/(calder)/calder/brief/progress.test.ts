import { describe, expect, it } from "vitest";
import { CLAUSES } from "../content/argument";
import { activeClause, clauseProgress, isSealed, pageLabel, runwayProgress, SEAL_TAIL } from "./progress";

const N = CLAUSES.length;

describe("runwayProgress", () => {
  it("is 0 before the section and 1 after the runway", () => {
    // section 3000 tall at y=1000, viewport 800 → runway 2200
    expect(runwayProgress(0, 1000, 3000, 800)).toBe(0);
    expect(runwayProgress(1000, 1000, 3000, 800)).toBe(0);
    expect(runwayProgress(2100, 1000, 3000, 800)).toBe(0.5);
    expect(runwayProgress(3200, 1000, 3000, 800)).toBe(1);
    expect(runwayProgress(9999, 1000, 3000, 800)).toBe(1);
  });

  it("survives a section no taller than the viewport", () => {
    expect(runwayProgress(500, 500, 800, 800)).toBe(0);
    expect(runwayProgress(900, 500, 800, 800)).toBe(1);
  });
});

describe("clauseProgress", () => {
  it("writes the clauses in order", () => {
    expect(clauseProgress(0, 0, N)).toBe(0);
    for (let i = 0; i < N; i++) {
      const done = (i + 0.9) * ((1 - SEAL_TAIL) / N);
      expect(clauseProgress(done, i, N)).toBe(1);
      if (i > 0) expect(clauseProgress(done - 0.0001, i - 1, N)).toBe(1);
    }
  });

  it("leaves later clauses unwritten while an earlier one is in progress", () => {
    const mid = 0.5 * ((1 - SEAL_TAIL) / N);
    expect(clauseProgress(mid, 0, N)).toBeGreaterThan(0);
    expect(clauseProgress(mid, 0, N)).toBeLessThan(1);
    expect(clauseProgress(mid, 1, N)).toBe(0);
    expect(clauseProgress(mid, 3, N)).toBe(0);
  });

  it("has every clause finished before the seal tail", () => {
    for (let i = 0; i < N; i++) expect(clauseProgress(1 - SEAL_TAIL, i, N)).toBe(1);
  });
});

describe("activeClause", () => {
  it("steps through the clauses and holds on the last", () => {
    expect(activeClause(0, N)).toBe(0);
    expect(activeClause(0.3, N)).toBe(1);
    expect(activeClause(0.6, N)).toBe(2);
    expect(activeClause(0.85, N)).toBe(3);
    expect(activeClause(1, N)).toBe(N - 1);
  });
});

describe("seal and page label", () => {
  it("presses only near the end", () => {
    expect(isSealed(0.5)).toBe(false);
    expect(isSealed(0.99)).toBe(true);
    expect(isSealed(1)).toBe(true);
  });

  it("reads like a page counter", () => {
    expect(pageLabel(0, N)).toBe("p. 1 of 4");
    expect(pageLabel(3, N)).toBe("p. 4 of 4");
    expect(pageLabel(9, N)).toBe("p. 4 of 4");
  });
});
