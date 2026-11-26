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
const AUTO_LAYOUT_POSITION_TOLERANCE_PX = 3.5;

export interface LayoutParentBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

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

function autoLayoutMatchesCapturedBoxes(
  cfg: AutoLayoutConfig,
  inFlow: LayoutChildBox[],
  parentBox: LayoutParentBox
): boolean {
  const isHoriz = cfg.layoutMode === "HORIZONTAL";
  const padMainStart = isHoriz ? cfg.paddingLeft : cfg.paddingTop;
  const padMainEnd = isHoriz ? cfg.paddingRight : cfg.paddingBottom;
  const padCrossStart = isHoriz ? cfg.paddingTop : cfg.paddingLeft;
  const padCrossEnd = isHoriz ? cfg.paddingBottom : cfg.paddingRight;
  const parentMain = isHoriz ? parentBox.width : parentBox.height;
  const parentCross = isHoriz ? parentBox.height : parentBox.width;
  const innerMain = Math.max(0, parentMain - padMainStart - padMainEnd);
  const innerCross = Math.max(0, parentCross - padCrossStart - padCrossEnd);

  const mainOf = (c: LayoutChildBox) => (isHoriz ? c.x - parentBox.x : c.y - parentBox.y);
  const crossOf = (c: LayoutChildBox) => (isHoriz ? c.y - parentBox.y : c.x - parentBox.x);
  const mainSizeOf = (c: LayoutChildBox) => (isHoriz ? c.width : c.height);
  const crossSizeOf = (c: LayoutChildBox) => (isHoriz ? c.height : c.width);

  // Split into lines (1 line for NO_WRAP, wrapped lines for WRAP).
  const lines: LayoutChildBox[][] = [];
  if (cfg.layoutWrap === "WRAP") {
    let currentLine: LayoutChildBox[] = [];
    let lineMain = 0;
    for (const child of inFlow) {
      const sz = mainSizeOf(child);
      if (currentLine.length > 0 && lineMain + cfg.itemSpacing + sz > innerMain + 1) {
        lines.push(currentLine);
        currentLine = [child];
        lineMain = sz;
      } else {
        if (currentLine.length > 0) lineMain += cfg.itemSpacing;
        currentLine.push(child);
        lineMain += sz;
      }
    }
    if (currentLine.length > 0) lines.push(currentLine);
  } else {
    lines.push(inFlow);
  }

  const crossGap = cfg.counterAxisSpacing ?? 0;
  let crossCursor = padCrossStart;

  for (const line of lines) {
    const sumMain = line.reduce((s, c) => s + mainSizeOf(c), 0);
    const lineCrossMax = line.reduce((m, c) => Math.max(m, crossSizeOf(c)), 0);
    const crossSpan = lines.length === 1 ? innerCross : lineCrossMax;

    const gap =
      cfg.primaryAxisAlignItems === "SPACE_BETWEEN" && line.length > 1
        ? (innerMain - sumMain) / (line.length - 1)
        : cfg.itemSpacing;
    const totalMain = sumMain + gap * Math.max(0, line.length - 1);

    let mainCursor = padMainStart;
    if (cfg.primaryAxisAlignItems === "CENTER") {
      mainCursor = padMainStart + (innerMain - totalMain) / 2;
    } else if (cfg.primaryAxisAlignItems === "MAX") {
      mainCursor = parentMain - padMainEnd - totalMain;
    }

    for (const child of line) {
      const actualMain = mainOf(child);
      const actualCross = crossOf(child);
      const childCross = crossSizeOf(child);

      let predCross = crossCursor;
      if (cfg.counterAxisAlignItems === "CENTER") {
        predCross = crossCursor + (crossSpan - childCross) / 2;
      } else if (cfg.counterAxisAlignItems === "MAX") {
        predCross = crossCursor + (crossSpan - childCross);
      }

      if (Math.abs(actualMain - mainCursor) > AUTO_LAYOUT_POSITION_TOLERANCE_PX) {
        return false;
      }
      // BASELINE alignment depends on font ascent rather than box top; allow slight cross slack only for BASELINE.
      const crossTolerance =
        cfg.counterAxisAlignItems === "BASELINE"
          ? Math.max(AUTO_LAYOUT_POSITION_TOLERANCE_PX, lineCrossMax * 0.35)
          : AUTO_LAYOUT_POSITION_TOLERANCE_PX;
      if (Math.abs(actualCross - predCross) > crossTolerance) {
        return false;
      }

      mainCursor += mainSizeOf(child) + gap;
    }

    crossCursor += lineCrossMax + crossGap;
  }

  return true;
}

export function computeAutoLayoutConfig(
  meta: SerializedLayoutMeta,
  children: LayoutChildBox[],
  parentBox?: LayoutParentBox
): AutoLayoutConfig | null {
  // Only flex containers convert cleanly; block/grid keep exact captured (x, y) coordinates.
  if (meta.display !== "flex" && meta.display !== "inline-flex") {
    return null;
  }

  const justify = (meta.justifyContent || "").trim().toLowerCase();
  if (justify === "space-around" || justify === "space-evenly") {
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

  const cfg: AutoLayoutConfig = {
    layoutMode,
    primaryAxisAlignItems: mapPrimaryAlign(justify),
    counterAxisAlignItems: mapCounterAlign(meta.alignItems),
    layoutWrap,
    itemSpacing: Math.max(0, primaryGap || 0),
    ...(layoutWrap === "WRAP" ? { counterAxisSpacing: Math.max(0, crossGap || 0) } : {}),
    paddingTop: Math.max(0, meta.paddingTop || 0),
    paddingRight: Math.max(0, meta.paddingRight || 0),
    paddingBottom: Math.max(0, meta.paddingBottom || 0),
    paddingLeft: Math.max(0, meta.paddingLeft || 0),
  };

  // Reject Auto Layout whenever Figma's layout engine would displace any in-flow child
  // (e.g. CSS margin: auto, per-child margins, align-self, flex-grow, order, or transforms).
  if (parentBox && !autoLayoutMatchesCapturedBoxes(cfg, inFlow, parentBox)) {
    return null;
  }

  return cfg;
}
