import type { ClearanceViolation, LensLayout, OpticalLensSpec } from "./lensTypes";

export const OPTICAL_ORDER = ["front-meniscus", "front-biconvex", "front-compensator", "front-lens", "rear-relay", "rear-plano", "rear-lens"] as const;
export const INTERIOR_IDS = ["front-meniscus-cell", "front-meniscus", "front-biconvex-cell", "front-biconvex", "front-compensator-cell", "front-compensator", "rear-relay-cell", "rear-relay", "rear-plano-cell", "rear-plano", "internal-barrel", "core-carrier", "spacer-stack", "rear-baffles", "carrier-fasteners", "core-retaining-beads", "housing-panel-0", "housing-panel-1", "housing-panel-2", "housing-panel-3", "guide-rails", "panel-linkages"] as const;
const kinds = new Set(["fluted-torus", "annulus", "lens", "radial-boxes", "bolts", "contacts", "beads", "prisms", "optical-element", "cell", "open-frame", "spacers", "baffles", "panel", "rails", "linkages"]);

/** Pure rest-layout resolver; parent offsets are applied once through the graph. */
export function deriveInteriorLayout(spec: OpticalLensSpec): LensLayout {
  const transforms: LensLayout["transforms"] = Object.create(null);
  for (const c of spec.components) {
    if (transforms[c.id]) throw new Error(`Duplicate lens component: ${c.id}`);
    if (!kinds.has(c.geometry.kind)) throw new Error(`Unknown lens geometry: ${c.geometry.kind}`);
    if (c.position.length !== 3 || !c.position.every(Number.isFinite)) throw new Error(`Invalid position: ${c.id}`);
    transforms[c.id] = { parent: c.parent, position: [...c.position] };
  }
  function worldZ(id: string, ancestors = new Set<string>()): number {
    if (id === "root") return 0;
    if (ancestors.has(id)) throw new Error(`Cyclic lens parent: ${id}`);
    const t = transforms[id];
    if (!t) throw new Error(`Unresolved lens parent: ${id}`);
    return t.position[2] + worldZ(t.parent, new Set([...ancestors, id]));
  }
  for (const c of spec.components) worldZ(c.id);
  const optics = OPTICAL_ORDER.map(id => {
    const c = spec.components.find(c => c.id === id);
    if (!c) throw new Error(`Missing optical group: ${id}`);
    const g = c.geometry;
    const thickness = g.kind === "lens" ? g.depth! + 2 * g.sag! : g.edgeThickness! + g.frontSag! - g.backSag!;
    const z = worldZ(id);
    return { id, radius: g.radius!, minZ: z - thickness / 2, maxZ: z + thickness / 2 };
  });
  return { transforms, optics, assemblies: OPTICAL_ORDER.map(id => id === "front-lens" ? ["core-carrier", id, "core-retaining-beads", "carrier-fasteners"] : [id, `${id}-cell`].filter(cid => transforms[cid])) };
}

export function validateInteriorClearances(layout: LensLayout): { passed: boolean; violations: ClearanceViolation[] } {
  const violations: ClearanceViolation[] = [];
  for (let i = 1; i < layout.optics.length; i++) {
    const front = layout.optics[i-1], rear = layout.optics[i];
    const gap = front.minZ - rear.maxZ;
    if (!Number.isFinite(gap) || gap < .03 - 1e-6) violations.push({ front: front.id, rear: rear.id, gap });
  }
  return { passed: violations.length === 0, violations };
}
