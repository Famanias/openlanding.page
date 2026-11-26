import { describe, it, expect } from "vitest";
import { collapseRedundantWrappers, deriveNodeName, isClippingOverflow } from "../src/ui/bridge-script";
import type { SerializedFrameNode } from "../src/shared/types";

describe("DOM serializer pure transforms", () => {
  it("derives readable semantic names instead of raw div", () => {
    expect(deriveNodeName({ tag: "header", classList: ["site-header"] })).toBe("Header");
    expect(deriveNodeName({ tag: "button", classList: ["cta-btn"], textPreview: "Get Started" })).toBe(
      "Button · Get Started"
    );
    expect(deriveNodeName({ tag: "div", id: "hero-section", classList: [] })).toBe("hero-section");
    expect(deriveNodeName({ tag: "nav", classList: [] })).toBe("Nav");
    expect(deriveNodeName({ tag: "div", classList: ["flex", "ar-card"] })).toBe("ar-card");
  });

  it("detects overflow: clip and per-axis overflow-x: clip as clipping boundaries", () => {
    expect(isClippingOverflow("clip", "visible")).toEqual({ clipsX: true, clipsY: false, clipsContent: true });
    expect(isClippingOverflow("visible", "visible")).toEqual({ clipsX: false, clipsY: false, clipsContent: false });
    expect(isClippingOverflow("hidden", "auto")).toEqual({ clipsX: true, clipsY: true, clipsContent: true });
    expect(isClippingOverflow("visible", "scroll")).toEqual({ clipsX: false, clipsY: true, clipsContent: true });
  });

  it("collapses unstyled single-child pass-through wrapper frames", () => {
    const innerText = {
      id: "t1",
      type: "TEXT" as const,
      name: "Title",
      x: 20,
      y: 40,
      width: 200,
      height: 32,
      opacity: 1,
      characters: "Hello",
      fontFamily: "Inter",
      fontSize: 24,
      fontWeight: 700,
      fontStyle: "normal" as const,
      lineHeightPx: 30,
      letterSpacingPx: 0,
      textAlign: "LEFT" as const,
      fills: [{ type: "SOLID" as const, color: { r: 0, g: 0, b: 0, a: 1 } }],
      ranges: [],
    };
    const wrapper: SerializedFrameNode = {
      id: "f1",
      type: "FRAME",
      name: "div",
      x: 20,
      y: 40,
      width: 200,
      height: 32,
      opacity: 1,
      fills: [],
      strokes: [],
      cornerRadius: [0, 0, 0, 0],
      effects: [],
      clipsContent: false,
      children: [innerText],
    };
    expect(collapseRedundantWrappers(wrapper)).toEqual(innerText);

    const paddedFlexWrapper: SerializedFrameNode = {
      ...wrapper,
      layout: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
        alignItems: "center",
        rowGap: 0,
        columnGap: 0,
        paddingTop: 16,
        paddingRight: 16,
        paddingBottom: 16,
        paddingLeft: 16,
      },
    };
    expect(collapseRedundantWrappers(paddedFlexWrapper)).toEqual(paddedFlexWrapper);

    const offsetContainerWrapper: SerializedFrameNode = {
      ...wrapper,
      x: 0,
      y: 40,
      width: 1600,
      height: 200,
      children: [innerText],
    };
    expect(collapseRedundantWrappers(offsetContainerWrapper)).toEqual(offsetContainerWrapper);
  });
});
