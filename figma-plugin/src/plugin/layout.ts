import type { SerializedLayoutMeta } from "../shared/types";

export interface AutoLayoutConfig {
  layoutMode: "HORIZONTAL" | "VERTICAL";
  primaryAxisAlignItems: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN";
  counterAxisAlignItems: "MIN" | "CENTER" | "MAX" | "BASELINE";
  layoutWrap: "NO_WRAP" | "WRAP";
  itemSpacing: number;
  counterAxisSpacing?: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
}

export interface LayoutChildBox {
  x: number;
  y: number;
  width: number;
  height: number;
  position?: string;
}

const OVERLAP_EPSILON_PX = 0.5;

function isInFlow(child: LayoutChildBox): boolean {
  return child.position !== "absolute" && child.position !== "fixed";
}

export function hasOverlappingInFlowSiblings(children: LayoutChildBox[]): boolean {
  const inFlow = children.filter(isInFlow);
  for (let i = 0; i < inFlow.length; i++) {
    const a = inFlow[i];
    if (a.width <= 0 || a.height <= 0) continue;
    for (let j = i + 1; j < inFlow.length; j++) {
      const b = inFlow[j];
      if (b.width <= 0 || b.height <= 0) continue;
      const overlapsX =
        a.x < b.x + b.width - OVERLAP_EPSILON_PX && a.x + a.width > b.x + OVERLAP_EPSILON_PX;
      const overlapsY =
        a.y < b.y + b.height - OVERLAP_EPSILON_PX && a.y + a.height > b.y + OVERLAP_EPSILON_PX;
      if (overlapsX && overlapsY) return true;
    }
  }
  return false;
}

function mapPrimaryAlign(
  justifyContent: string
): AutoLayoutConfig["primaryAxisAlignItems"] {
  switch (justifyContent) {
    case "center":
      return "CENTER";
    case "flex-end":
    case "end":
    case "right":
      return "MAX";
    case "space-between":
      return "SPACE_BETWEEN";
    default:
      return "MIN";
  }
}

function mapCounterAlign(
  alignItems: string
): AutoLayoutConfig["counterAxisAlignItems"] {
  switch (alignItems) {
    case "center":
      return "CENTER";
    case "flex-end":
    case "end":
      return "MAX";
    case "baseline":
      return "BASELINE";
    default:
      return "MIN";
  }
}

export function computeAutoLayoutConfig(
  meta: SerializedLayoutMeta,
  children: LayoutChildBox[]
): AutoLayoutConfig | null {
  // Only flex containers convert cleanly; block/grid keep exact captured (x, y) coordinates.
  if (meta.display !== "flex" && meta.display !== "inline-flex") {
    return null;
  }

  const layoutMode =
    meta.flexDirection === "column"
      ? "VERTICAL"
      : meta.flexDirection === "row"
        ? "HORIZONTAL"
        : null;
  if (!layoutMode || meta.flexWrap === "wrap-reverse") {
    return null;
  }

  const inFlow = children.filter(isInFlow);
  if (inFlow.length === 0 || hasOverlappingInFlowSiblings(inFlow)) {
    return null;
  }

  const layoutWrap: AutoLayoutConfig["layoutWrap"] =
    meta.flexWrap === "wrap" ? "WRAP" : "NO_WRAP";
  const primaryGap = layoutMode === "HORIZONTAL" ? meta.columnGap : meta.rowGap;
  const crossGap = layoutMode === "HORIZONTAL" ? meta.rowGap : meta.columnGap;

  return {
    layoutMode,
    primaryAxisAlignItems: mapPrimaryAlign(meta.justifyContent),
    counterAxisAlignItems: mapCounterAlign(meta.alignItems),
    layoutWrap,
    itemSpacing: Math.max(0, primaryGap || 0),
    ...(layoutWrap === "WRAP" ? { counterAxisSpacing: Math.max(0, crossGap || 0) } : {}),
    paddingTop: Math.max(0, meta.paddingTop || 0),
    paddingRight: Math.max(0, meta.paddingRight || 0),
    paddingBottom: Math.max(0, meta.paddingBottom || 0),
    paddingLeft: Math.max(0, meta.paddingLeft || 0),
  };
}
