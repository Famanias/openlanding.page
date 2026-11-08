import { describe, expect, it } from "vitest";
import { PROJECTS } from "../content/projects";
import { ROLE_IDS, ROLES } from "../content/roles";
import { cablePath, isRoleId, jackCenterX, parseRole, rankForRole, roleHref, stepRole } from "./routing";

describe("role parsing", () => {
  it("accepts every known role", () => {
    for (const id of ROLE_IDS) expect(parseRole(id)).toBe(id);
  });

  it("falls back to the default on bad input", () => {
    expect(parseRole("hacker")).toBe("fullstack");
    expect(parseRole(null)).toBe("fullstack");
    expect(parseRole(undefined)).toBe("fullstack");
    expect(isRoleId("__proto__")).toBe(false);
  });
});

describe("stepRole", () => {
  it("wraps in both directions", () => {
    expect(stepRole("design", 1)).toBe("web");
    expect(stepRole("web", -1)).toBe("design");
    expect(stepRole("web", 1)).toBe("fullstack");
  });
});

describe("rankForRole", () => {
  it("orders by weight and hides zero-weight projects", () => {
    const ai = rankForRole(PROJECTS, "ai");
    expect(ai[0].id).toBe("marginalia");
    expect(ai.every((p) => p.weights.ai > 0)).toBe(true);
    expect(ai.find((p) => p.id === "fieldnote")).toBeUndefined();
  });

  it("is stable on ties and does not mutate the input", () => {
    const items = [
      { id: "a", weights: { web: 1, fullstack: 1, ai: 1, design: 1 } },
      { id: "b", weights: { web: 1, fullstack: 1, ai: 1, design: 1 } },
    ];
    expect(rankForRole(items, "web").map((i) => i.id)).toEqual(["a", "b"]);
    expect(items.map((i) => i.id)).toEqual(["a", "b"]);
  });
});

describe("cable geometry", () => {
  it("builds a path that starts and ends at the given points", () => {
    expect(cablePath({ x: 0, y: 0 }, { x: 100, y: 50 }, 40)).toBe("M0 0 C0 40 100 90 100 50");
  });

  it("centres jacks in equal columns", () => {
    expect(jackCenterX(0, 4, 400)).toBe(50);
    expect(jackCenterX(3, 4, 400)).toBe(350);
  });
});

describe("roleHref", () => {
  it("omits the param for the default role and preserves others", () => {
    expect(roleHref("fullstack", "?role=ai")).toBe("");
    expect(roleHref("ai", "")).toBe("?role=ai");
    expect(roleHref("web", "?utm=x")).toBe("?utm=x&role=web");
  });
});

describe("content integrity", () => {
  it("gives every role a case study that points at a real project visible to that role", () => {
    for (const id of ROLE_IDS) {
      const project = PROJECTS.find((p) => p.id === ROLES[id].caseStudy.projectId);
      expect(project, id).toBeDefined();
      expect(project!.weights[id], id).toBeGreaterThan(0);
    }
  });

  it("gives every role at least three visible projects and four process steps", () => {
    for (const id of ROLE_IDS) {
      expect(rankForRole(PROJECTS, id).length).toBeGreaterThanOrEqual(3);
      expect(ROLES[id].process).toHaveLength(4);
    }
  });
});
