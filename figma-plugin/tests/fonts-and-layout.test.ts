import { describe, it, expect, vi } from "vitest";
import {
  cleanFontFamilyName,
  fontKey,
  matchFigmaFont,
  preloadDocumentFonts,
  resolveFontForText,
} from "../src/plugin/fonts";
import {
  computeAutoLayoutConfig,
  hasOverlappingInFlowSiblings,
} from "../src/plugin/layout";
import type { SerializedNode } from "../src/shared/types";

const available: Font[] = [
  { fontName: { family: "Inter", style: "Regular" } },
  { fontName: { family: "Inter", style: "Semi Bold" } },
  { fontName: { family: "Inter", style: "Bold" } },
  { fontName: { family: "Inter", style: "Bold Italic" } },
  { fontName: { family: "Geist", style: "Regular" } },
  { fontName: { family: "Roboto", style: "Regular" } },
];

describe("font resolution", () => {
  it("strips Next.js hashed font names and Next.js 16 Fallback suffixes and matches closest Figma style", () => {
    expect(cleanFontFamilyName('__Plus_Jakarta_Sans_8f2a10, "Plus Jakarta Sans", sans-serif')).toBe(
      "Plus Jakarta Sans"
    );
    expect(cleanFontFamilyName("__Inter_d65c78")).toBe("Inter");
    expect(cleanFontFamilyName("Geist Fallback")).toBe("Geist");

    expect(matchFigmaFont(["Geist Fallback", "sans-serif"], 400, false, available).font).toEqual({
      family: "Geist",
      style: "Regular",
    });
    expect(matchFigmaFont(["__Inter_d65c78", "sans-serif"], 600, false, available).font).toEqual({
      family: "Inter",
      style: "Semi Bold",
    });
    expect(matchFigmaFont(["UnknownDisplayFont"], 700, true, available)).toEqual({
      font: { family: "Inter", style: "Bold Italic" },
      substitutedFrom: "UnknownDisplayFont",
    });
  });

  it("preloads unique fonts across nodes and text ranges with safe fallback on load error", async () => {
    const loadFontAsync = vi.fn(async (fontName: FontName) => {
      if (fontName.family === "Geist") {
        throw new Error("Font failed to load");
      }
    });
    const listAvailableFontsAsync = vi.fn(async () => available);

    const nodes: SerializedNode[] = [
      {
        id: "frame-1",
        type: "FRAME",
        name: "Root",
        x: 0,
        y: 0,
        width: 1200,
        height: 800,
        opacity: 1,
        fills: [],
        strokes: [],
        cornerRadius: [0, 0, 0, 0],
        effects: [],
        clipsContent: false,
        children: [
          {
            id: "text-1",
            type: "TEXT",
            name: "Heading",
            x: 0,
            y: 0,
            width: 400,
            height: 40,
            opacity: 1,
            characters: "Hello world",
            fontFamily: "__Inter_d65c78, sans-serif",
            fontSize: 32,
            fontWeight: 600,
            fontStyle: "normal",
            lineHeightPx: 40,
            letterSpacingPx: 0,
            textAlign: "LEFT",
            fills: [],
            ranges: [
              { start: 0, end: 5 },
              { start: 6, end: 11, fontFamily: "UnknownDisplayFont", fontWeight: 700, fontStyle: "italic" },
            ],
          },
          {
            id: "text-2",
            type: "TEXT",
            name: "Body",
            x: 0,
            y: 50,
            width: 400,
            height: 24,
            opacity: 1,
            characters: "Geist text",
            fontFamily: "Geist Fallback",
            fontSize: 16,
            fontWeight: 400,
            fontStyle: "normal",
            lineHeightPx: 24,
            letterSpacingPx: 0,
            textAlign: "LEFT",
            fills: [],
            ranges: [],
          },
        ],
      },
    ];

    const result = await preloadDocumentFonts(nodes, {
      listAvailableFontsAsync,
      loadFontAsync,
    });

    expect(result.resolved.get(fontKey("Inter", 600, false))).toEqual({
      family: "Inter",
      style: "Semi Bold",
    });
    expect(
      resolveFontForText(result.resolved, "UnknownDisplayFont", 700, "italic")
    ).toEqual({
      family: "Inter",
      style: "Bold Italic",
    });
    expect(resolveFontForText(result.resolved, "Geist Fallback", 400, "normal")).toEqual({
      family: "Inter",
      style: "Regular",
    });
    expect(result.substitutions).toContain("UnknownDisplayFont");
    expect(result.substitutions).toContain("Geist");
  });
});

describe("Auto Layout eligibility", () => {
  it("maps horizontal flex containers with gap and padding", () => {
    const cfg = computeAutoLayoutConfig(
      {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        alignItems: "center",
        rowGap: 0,
        columnGap: 24,
        paddingTop: 16,
        paddingRight: 32,
        paddingBottom: 16,
        paddingLeft: 32,
      },
      [
        { x: 32, y: 16, width: 100, height: 40 },
        { x: 200, y: 16, width: 120, height: 40 },
      ]
    );
    expect(cfg).toMatchObject({
      layoutMode: "HORIZONTAL",
      itemSpacing: 24,
      paddingTop: 16,
      paddingLeft: 32,
      primaryAxisAlignItems: "SPACE_BETWEEN",
      counterAxisAlignItems: "CENTER",
      layoutWrap: "NO_WRAP",
    });
  });

  it("maps vertical wrapping flex containers and ignores absolute/fixed children during overlap checks", () => {
    const children = [
      { x: 0, y: 0, width: 200, height: 40 },
      { x: 0, y: 56, width: 200, height: 40 },
      { x: 0, y: 0, width: 400, height: 200, position: "absolute" },
      { x: 10, y: 10, width: 100, height: 100, position: "fixed" },
    ];
    expect(hasOverlappingInFlowSiblings(children)).toBe(false);

    const cfg = computeAutoLayoutConfig(
      {
        display: "inline-flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        rowGap: 16,
        columnGap: 12,
        paddingTop: 8,
        paddingRight: 8,
        paddingBottom: 8,
        paddingLeft: 8,
      },
      children
    );
    expect(cfg).toEqual({
      layoutMode: "VERTICAL",
      primaryAxisAlignItems: "MAX",
      counterAxisAlignItems: "MIN",
      layoutWrap: "WRAP",
      itemSpacing: 16,
      counterAxisSpacing: 12,
      paddingTop: 8,
      paddingRight: 8,
      paddingBottom: 8,
      paddingLeft: 8,
    });
  });

  it("returns null for display: block or grid containers, zero in-flow children, and when in-flow siblings overlap", () => {
    expect(
      computeAutoLayoutConfig(
        {
          display: "block",
          flexDirection: "column",
          flexWrap: "nowrap",
          justifyContent: "flex-start",
          alignItems: "stretch",
          rowGap: 0,
          columnGap: 0,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
        },
        [
          { x: 300, y: 0, width: 1320, height: 400 },
          { x: 300, y: 500, width: 1320, height: 400 },
        ]
      )
    ).toBeNull();

    expect(
      computeAutoLayoutConfig(
        {
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "flex-start",
          alignItems: "stretch",
          rowGap: 0,
          columnGap: 0,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
        },
        [
          { x: 0, y: 0, width: 100, height: 100 },
          { x: 50, y: 10, width: 100, height: 100 },
        ]
      )
    ).toBeNull();

    expect(
      computeAutoLayoutConfig(
        {
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "flex-start",
          alignItems: "stretch",
          rowGap: 0,
          columnGap: 0,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
        },
        [{ x: 0, y: 0, width: 100, height: 100, position: "absolute" }]
      )
    ).toBeNull();
  });
});
