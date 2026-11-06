import type originalSpec from "./lens-spec.json";

export type LensGeometryKind = "fluted-torus" | "annulus" | "lens" | "radial-boxes" | "bolts" | "contacts" | "beads" | "prisms" | "optical-element" | "cell" | "open-frame" | "spacers" | "baffles" | "panel" | "rails" | "linkages" | "front-shutter";
export type OpticalElementProfile = {
  shape: "meniscus" | "biconvex" | "plano-convex";
  radius: number;
  edgeThickness: number;
  frontSag: number;
  backSag: number;
  chamfer?: number;
};
export type LensGeometry = {
  kind: LensGeometryKind;
  radius?: number; tube?: number; depth?: number; flutes?: number; amplitude?: number; twist?: number;
  inner?: number; outer?: number; bevel?: number; sag?: number; count?: number; width?: number; height?: number; phase?: number; size?: number;
  radii?: number[]; points?: number[][]; seed?: number;
  shape?: OpticalElementProfile["shape"]; edgeThickness?: number; frontSag?: number; backSag?: number; chamfer?: number;
  innerRadius?: number; outerRadius?: number; seatLip?: number; startRadians?: number; sweepRadians?: number;
  hingeZ?: number; radialSlide?: number; pivotRadians?: number; rodRadius?: number; armRadius?: number; linkLength?: number; endpointTolerance?: number;
};
export type LensComponent = {
  id: string; parent: string; level: "macro" | "meso" | "micro";
  position: number[]; material: string; geometry: LensGeometry;
  features?: { id: string; description: string }[];
};
export type OpticalLensSpec = { components: LensComponent[]; materials: typeof originalSpec.materials };
export type LensLayout = {
  transforms: Record<string, { parent: string; position: number[] }>;
  optics: { id: string; radius: number; minZ: number; maxZ: number }[];
  assemblies: string[][];
};
export type ClearanceViolation = { front: string; rear: string; gap: number };
