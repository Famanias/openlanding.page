import { describe, expect, it } from "vitest";
import { CLAUSES } from "./argument";
import { AUTHORITIES, FACTS, FAQS, MATTERS, PARTNERS } from "./firm";

describe("content", () => {
  it("has four counts and four clauses, so the brief and the matters line up", () => {
    expect(MATTERS).toHaveLength(4);
    expect(CLAUSES).toHaveLength(4);
  });

  it("gives every record a unique id", () => {
    for (const list of [MATTERS, CLAUSES, PARTNERS]) {
      const ids = list.map((x) => x.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("writes every clause long enough to scrub word by word", () => {
    for (const c of CLAUSES) expect(c.body.split(/\s+/).length).toBeGreaterThan(15);
  });

  it("has complete matters, partners, facts, authorities and questions", () => {
    for (const m of MATTERS) {
      expect(m.typical.length).toBeGreaterThanOrEqual(3);
      expect(m.summary.length).toBeGreaterThan(40);
    }
    for (const p of PARTNERS) expect(p.credentials.length).toBeGreaterThanOrEqual(3);
    for (const f of FACTS) expect(f.value).toBeGreaterThan(0);
    expect(new Set(AUTHORITIES.map((a) => a.cite)).size).toBe(AUTHORITIES.length);
    expect(FAQS.length).toBeGreaterThanOrEqual(4);
  });
});
