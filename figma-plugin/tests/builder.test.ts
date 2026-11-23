import { describe, it, expect, vi } from "vitest";
import { buildFigmaPage } from "../src/plugin/builder";
import { handleUiMessage } from "../src/plugin/code";
import type { SerializedDocument, SerializedFrameNode } from "../src/shared/types";

function createMockFigma(overrides?: {
  availableFonts?: Array<{ fontName: { family: string; style: string } }>;
  existingPaintStyles?: Array<Record<string, unknown>>;
  existingTextStyles?: Array<Record<string, unknown>>;
  pageChildren?: Array<{ x: number; width: number }>;
  createImageError?: boolean;
}) {
  const createdImages: Uint8Array[] = [];
  const createdPaintStyles: Array<Record<string, unknown>> = [];
  const createdTextStyles: Array<Record<string, unknown>> = [];
  const setFillStyleCalls: string[] = [];
  const setTextStyleCalls: string[] = [];
  const postedMessages: unknown[] = [];
  const scrollIntoViewCalls: unknown[][] = [];
  const closePluginCalls: Array<string | undefined> = [];

  let frameSeq = 0;
  let paintStyleSeq = 0;
  let textStyleSeq = 0;

  const makeMockFrame = () => {
    const frame: Record<string, unknown> = {
      id: `frame-${++frameSeq}`,
      type: "FRAME",
      name: "",
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      resize(w: number, h: number) {
        this.width = w;
        this.height = h;
      },
      fills: [] as unknown[],
      strokes: [] as unknown[],
      strokeWeight: 0,
      topLeftRadius: 0,
      topRightRadius: 0,
      bottomRightRadius: 0,
      bottomLeftRadius: 0,
      effects: [] as unknown[],
      opacity: 1,
      clipsContent: false,
      rotation: 0,
      layoutMode: "NONE" as "NONE" | "HORIZONTAL" | "VERTICAL",
      primaryAxisSizingMode: "AUTO" as "AUTO" | "FIXED",
      counterAxisSizingMode: "AUTO" as "AUTO" | "FIXED",
      primaryAxisAlignItems: "MIN",
      counterAxisAlignItems: "MIN",
      layoutWrap: "NO_WRAP",
      itemSpacing: 0,
      counterAxisSpacing: null as number | null,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      _layoutPositioning: "AUTO" as "AUTO" | "ABSOLUTE",
      parent: null as { layoutMode?: string } | null,
      get layoutPositioning(): "AUTO" | "ABSOLUTE" {
        return this._layoutPositioning as "AUTO" | "ABSOLUTE";
      },
      set layoutPositioning(val: "AUTO" | "ABSOLUTE") {
        const parent = this.parent as { layoutMode?: string } | null;
        if (val === "ABSOLUTE" && (!parent || parent.layoutMode === "NONE")) {
          throw new Error("layoutPositioning ABSOLUTE requires an Auto Layout parent");
        }
        this._layoutPositioning = val;
      },
      setFillStyleIdAsync: vi.fn(async (id: string) => {
        setFillStyleCalls.push(id);
      }),
      children: [] as Array<Record<string, unknown>>,
      appendChild(c: Record<string, unknown>) {
        c.parent = this;
        (this.children as Array<Record<string, unknown>>).push(c);
      },
    };
    return frame;
  };

  const pageChildren: Array<Record<string, unknown>> = [
    ...(overrides?.pageChildren ?? []),
  ];

  const mockFigma = {
    currentPage: {
      children: pageChildren,
      appendChild: vi.fn((node: Record<string, unknown>) => {
        pageChildren.push(node);
      }),
    },
    ui: {
      postMessage: vi.fn((msg: unknown) => {
        postedMessages.push(msg);
      }),
      onmessage: undefined,
    },
    viewport: {
      scrollAndZoomIntoView: vi.fn((nodes: unknown[]) => {
        scrollIntoViewCalls.push(nodes);
      }),
    },
    closePlugin: vi.fn((msg?: string) => {
      closePluginCalls.push(msg);
    }),
    listAvailableFontsAsync: async () =>
      overrides?.availableFonts ?? [{ fontName: { family: "Inter", style: "Regular" } }],
    loadFontAsync: vi.fn(async () => {}),
    createFrame: () => makeMockFrame(),
    createText: () => ({
      ...makeMockFrame(),
      type: "TEXT",
      characters: "",
      fontName: null as { family: string; style: string } | null,
      fontSize: 16,
      lineHeight: { unit: "AUTO" },
      letterSpacing: { value: 0, unit: "PIXELS" },
      textAlignHorizontal: "LEFT",
      textAutoResize: "NONE",
      textDecoration: "NONE",
      textCase: "ORIGINAL",
      hyperlink: null,
      setTextStyleIdAsync: vi.fn(async (id: string) => {
        setTextStyleCalls.push(id);
      }),
      setRangeFontName: vi.fn(),
      setRangeFontSize: vi.fn(),
      setRangeFills: vi.fn(),
      setRangeTextDecoration: vi.fn(),
      setRangeTextCase: vi.fn(),
      setRangeLetterSpacing: vi.fn(),
      setRangeLineHeight: vi.fn(),
      setRangeHyperlink: vi.fn(),
    }),
    createImage: (bytes: Uint8Array) => {
      if (overrides?.createImageError) {
        throw new Error("Unsupported image");
      }
      createdImages.push(bytes);
      return { hash: `img-${createdImages.length}` };
    },
    createNodeFromSvg: (svg: string) => {
      if (svg.includes("BAD")) throw new Error("bad svg");
      return makeMockFrame();
    },
    getLocalPaintStylesAsync: async () => overrides?.existingPaintStyles ?? [],
    getLocalTextStylesAsync: async () => overrides?.existingTextStyles ?? [],
    createPaintStyle: () => {
      const style = { name: "", paints: [], id: `ps-${++paintStyleSeq}` };
      createdPaintStyles.push(style);
      return style;
    },
    createTextStyle: () => {
      const style = {
        name: "",
        fontName: null,
        fontSize: 16,
        lineHeight: { unit: "AUTO" },
        letterSpacing: { value: 0, unit: "PIXELS" },
        textCase: "ORIGINAL",
        textDecoration: "NONE",
        id: `ts-${++textStyleSeq}`,
      };
      createdTextStyles.push(style);
      return style;
    },
  } as unknown as PluginAPI;

  return {
    mockFigma,
    createdImages,
    createdPaintStyles,
    createdTextStyles,
    setFillStyleCalls,
    setTextStyleCalls,
    postedMessages,
    scrollIntoViewCalls,
    closePluginCalls,
  };
}

describe("buildFigmaPage", () => {
  it("converts page-space to parent-relative coordinates, deduplicates images, sets ABSOLUTE only inside Auto Layout parents, binds styles via async APIs, and skips bad SVGs", async () => {
    const { mockFigma, createdImages, setFillStyleCalls } = createMockFigma();

    const doc: SerializedDocument = {
      runId: "r1",
      title: "Test Page",
      viewportWidth: 1920,
      assets: { a1: { mime: "image/png", bytes: new Uint8Array([1, 2, 3]) } },
      root: {
        id: "root",
        type: "FRAME",
        name: "Page",
        x: 0,
        y: 0,
        width: 1920,
        height: 1080,
        opacity: 1,
        fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1, a: 1 } }],
        strokes: [],
        cornerRadius: [0, 0, 0, 0],
        effects: [],
        clipsContent: true,
        children: [
          {
            id: "nav",
            type: "FRAME",
            name: "Header",
            x: 100,
            y: 40,
            width: 1720,
            height: 80,
            opacity: 1,
            fills: [],
            strokes: [],
            cornerRadius: [0, 0, 0, 0],
            effects: [],
            clipsContent: false,
            layout: {
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              justifyContent: "space-between",
              alignItems: "center",
              rowGap: 0,
              columnGap: 24,
              paddingTop: 0,
              paddingRight: 0,
              paddingBottom: 0,
              paddingLeft: 0,
            },
            children: [
              {
                id: "i1",
                type: "FRAME",
                name: "Logo",
                x: 100,
                y: 50,
                width: 120,
                height: 60,
                opacity: 1,
                fills: [{ type: "IMAGE", assetId: "a1", scaleMode: "FILL" }],
                strokes: [],
                cornerRadius: [0, 0, 0, 0],
                effects: [],
                clipsContent: false,
                children: [],
              },
              {
                id: "i2",
                type: "FRAME",
                name: "Badge",
                x: 1700,
                y: 45,
                width: 80,
                height: 30,
                opacity: 1,
                fills: [{ type: "IMAGE", assetId: "a1", scaleMode: "FILL" }],
                strokes: [],
                cornerRadius: [0, 0, 0, 0],
                effects: [],
                clipsContent: false,
                position: "absolute",
                children: [],
              },
            ],
          },
          {
            id: "s1",
            type: "SVG",
            name: "BrokenIcon",
            x: 50,
            y: 200,
            width: 24,
            height: 24,
            opacity: 1,
            svg: "BAD",
          },
        ],
      },
    };

    const summary = await buildFigmaPage(
      doc,
      { widths: [1920], useAutoLayout: true, createStyles: true },
      0,
      mockFigma
    );

    expect(createdImages).toHaveLength(1);
    expect(setFillStyleCalls).toContain("ps-1");
    expect(summary.nodeCount).toBeGreaterThanOrEqual(3);
    expect(summary.warnings).toHaveLength(1);

    const root = mockFigma.currentPage.children[0] as unknown as {
      x: number;
      y: number;
      children: Array<Record<string, unknown>>;
    };
    expect(root.x).toBe(0);
    expect(root.y).toBe(0);

    const nav = root.children[0] as {
      x: number;
      y: number;
      layoutMode: string;
      children: Array<Record<string, unknown>>;
    };
    expect(nav.x).toBe(100);
    expect(nav.y).toBe(40);
    expect(nav.layoutMode).toBe("HORIZONTAL");

    const logo = nav.children[0];
    const badge = nav.children[1];
    expect(logo.x).toBe(0);
    expect(logo.y).toBe(10);
    expect(logo.layoutPositioning).toBe("AUTO");
    expect(badge.x).toBe(1600);
    expect(badge.y).toBe(5);
    expect(badge.layoutPositioning).toBe("ABSOLUTE");
  });

  it("does not set layoutPositioning=ABSOLUTE when parent has layoutMode NONE and converts root offset", async () => {
    const { mockFigma } = createMockFigma();

    const doc: SerializedDocument = {
      runId: "r2",
      title: "Block Page",
      viewportWidth: 1440,
      assets: {},
      root: {
        id: "root",
        type: "FRAME",
        name: "Page",
        x: 10,
        y: 20,
        width: 1440,
        height: 900,
        opacity: 1,
        fills: [],
        strokes: [],
        cornerRadius: [0, 0, 0, 0],
        effects: [],
        clipsContent: false,
        children: [
          {
            id: "abs-child",
            type: "FRAME",
            name: "Floating",
            x: 110,
            y: 70,
            width: 200,
            height: 100,
            opacity: 1,
            fills: [],
            strokes: [],
            cornerRadius: [0, 0, 0, 0],
            effects: [],
            clipsContent: false,
            position: "fixed",
            children: [],
          },
          {
            id: "good-svg",
            type: "SVG",
            name: "Icon",
            x: 30,
            y: 50,
            width: 32,
            height: 32,
            opacity: 0.8,
            svg: "<svg viewBox='0 0 24 24'></svg>",
          },
        ],
      },
    };

    const summary = await buildFigmaPage(
      doc,
      { widths: [1440], useAutoLayout: false, createStyles: false },
      2040,
      mockFigma
    );

    expect(summary.nodeCount).toBe(3);
    const root = mockFigma.currentPage.children[0] as unknown as {
      x: number;
      y: number;
      layoutMode: string;
      children: Array<Record<string, unknown>>;
    };
    expect(root.x).toBe(2040);
    expect(root.y).toBe(0);
    expect(root.layoutMode).toBe("NONE");
    expect(root.children[0].x).toBe(100);
    expect(root.children[0].y).toBe(50);
    expect(root.children[0].layoutPositioning).toBe("AUTO");
    expect(root.children[1].x).toBe(20);
    expect(root.children[1].y).toBe(30);
    expect(root.children[1].width).toBe(32);
    expect(root.children[1].height).toBe(32);
  });

  it("renders TEXT nodes with ranges, hyperlinks, font substitutions, paints, effects, and reuses local styles", async () => {
    const {
      mockFigma,
      createdImages,
      createdPaintStyles,
      createdTextStyles,
      setFillStyleCalls,
      setTextStyleCalls,
    } = createMockFigma({
      availableFonts: [
        { fontName: { family: "Inter", style: "Regular" } },
        { fontName: { family: "Inter", style: "Bold" } },
      ],
    });

    const sharedBytes = new Uint8Array([9, 8, 7]);
    const doc: SerializedDocument = {
      runId: "r3",
      title: "Rich Text",
      viewportWidth: 1200,
      assets: {
        imgA: { mime: "image/png", bytes: sharedBytes },
        imgB: { mime: "image/png", bytes: new Uint8Array([9, 8, 7]) },
      },
      root: {
        id: "root",
        type: "FRAME",
        name: "Page",
        x: 0,
        y: 0,
        width: 1200,
        height: 800,
        opacity: 1,
        fills: [
          { type: "SOLID", color: { r: 0.1, g: 0.2, b: 0.3, a: 0.5 } },
          {
            type: "GRADIENT_LINEAR",
            gradientTransform: [
              [1, 0, 0],
              [0, 1, 0],
            ],
            stops: [
              { position: 0, color: { r: 0, g: 0, b: 0, a: 1 } },
              { position: 1, color: { r: 1, g: 1, b: 1, a: 1 } },
            ],
          },
          {
            type: "GRADIENT_RADIAL",
            gradientTransform: [
              [1, 0, 0],
              [0, 1, 0],
            ],
            stops: [
              { position: 0, color: { r: 1, g: 0, b: 0, a: 1 } },
              { position: 1, color: { r: 0, g: 0, b: 1, a: 1 } },
            ],
          },
          { type: "IMAGE", assetId: "imgA", scaleMode: "FILL" },
          { type: "IMAGE", assetId: "imgB", scaleMode: "FIT" },
        ],
        strokes: [{ type: "SOLID", color: { r: 0, g: 0, b: 0, a: 1 } }],
        strokeWeight: 2,
        cornerRadius: [4, 8, 12, 16],
        effects: [
          {
            type: "DROP_SHADOW",
            offsetX: 0,
            offsetY: 4,
            radius: 12,
            spread: 2,
            color: { r: 0, g: 0, b: 0, a: 0.25 },
          },
          {
            type: "INNER_SHADOW",
            offsetX: 1,
            offsetY: 2,
            radius: 4,
            color: { r: 0, g: 0, b: 0, a: 0.2 },
          },
          { type: "LAYER_BLUR", radius: 6 },
          { type: "BACKGROUND_BLUR", radius: 10 },
        ],
        clipsContent: true,
        children: [
          {
            id: "t1",
            type: "TEXT",
            name: "Hero",
            x: 40,
            y: 60,
            width: 400,
            height: 48,
            opacity: 1,
            characters: "Hello World",
            fontFamily: "MissingDisplayFont, sans-serif",
            fontSize: 24,
            fontWeight: 400,
            fontStyle: "normal",
            lineHeightPx: 32,
            letterSpacingPx: -0.5,
            textAlign: "CENTER",
            textDecoration: "NONE",
            textCase: "ORIGINAL",
            fills: [{ type: "SOLID", color: { r: 0, g: 0, b: 0, a: 1 } }],
            href: "https://example.com",
            ranges: [
              {
                start: 6,
                end: 11,
                fontWeight: 700,
                fontSize: 28,
                fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0, a: 1 } }],
                textDecoration: "UNDERLINE",
                textCase: "UPPER",
                letterSpacingPx: 1.5,
                lineHeightPx: 40,
                href: "https://example.com/world",
              },
            ],
          },
          {
            id: "t2",
            type: "TEXT",
            name: "Sub",
            x: 40,
            y: 120,
            width: 400,
            height: 32,
            opacity: 1,
            characters: "Second line",
            fontFamily: "MissingDisplayFont, sans-serif",
            fontSize: 24,
            fontWeight: 400,
            fontStyle: "normal",
            lineHeightPx: 32,
            letterSpacingPx: -0.5,
            textAlign: "LEFT",
            fills: [{ type: "SOLID", color: { r: 0, g: 0, b: 0, a: 1 } }],
            ranges: [],
          },
        ],
      },
    };

    const summary = await buildFigmaPage(
      doc,
      { widths: [1200], useAutoLayout: false, createStyles: true },
      0,
      mockFigma
    );

    expect(createdImages).toHaveLength(1);
    expect(summary.imageCount).toBe(1);
    expect(summary.substitutedFonts).toEqual(["MissingDisplayFont"]);
    expect(createdPaintStyles).toHaveLength(1);
    expect(createdTextStyles).toHaveLength(1);
    expect(setFillStyleCalls).toEqual(["ps-1", "ps-1"]);
    expect(setTextStyleCalls).toEqual(["ts-1", "ts-1"]);
    expect(summary.styleCount).toBe(2);

    const root = mockFigma.currentPage.children[0] as unknown as {
      fills: Array<Record<string, unknown>>;
      effects: Array<Record<string, unknown>>;
      children: Array<Record<string, unknown>>;
    };
    expect(root.fills[0]).toEqual({ type: "SOLID", color: { r: 0.1, g: 0.2, b: 0.3 }, opacity: 0.5 });
    expect(root.fills[1]).toMatchObject({ type: "GRADIENT_LINEAR" });
    expect(Array.isArray(root.fills[1].gradientStops)).toBe(true);
    expect(root.fills[2]).toMatchObject({ type: "GRADIENT_RADIAL" });
    expect(root.fills[3]).toEqual({ type: "IMAGE", imageHash: "img-1", scaleMode: "FILL" });
    expect(root.fills[4]).toEqual({ type: "IMAGE", imageHash: "img-1", scaleMode: "FIT" });
    expect(root.effects[0]).toMatchObject({
      type: "DROP_SHADOW",
      offset: { x: 0, y: 4 },
      radius: 12,
      spread: 2,
      visible: true,
      blendMode: "NORMAL",
    });
    expect(root.effects[1]).toMatchObject({ type: "INNER_SHADOW" });
    expect(root.effects[3]).toEqual({ type: "BACKGROUND_BLUR", radius: 10, visible: true });

    const t1 = root.children[0] as Record<string, unknown> & {
      setRangeFontName: ReturnType<typeof vi.fn>;
      setRangeFontSize: ReturnType<typeof vi.fn>;
      setRangeFills: ReturnType<typeof vi.fn>;
      setRangeTextDecoration: ReturnType<typeof vi.fn>;
      setRangeTextCase: ReturnType<typeof vi.fn>;
      setRangeLetterSpacing: ReturnType<typeof vi.fn>;
      setRangeLineHeight: ReturnType<typeof vi.fn>;
      setRangeHyperlink: ReturnType<typeof vi.fn>;
    };
    expect(t1.textAutoResize).toBe("NONE");
    expect(t1.hyperlink).toEqual({ type: "URL", value: "https://example.com" });
    expect(t1.setRangeFontName).toHaveBeenCalledWith(6, 11, { family: "Inter", style: "Bold" });
    expect(t1.setRangeFontSize).toHaveBeenCalledWith(6, 11, 28);
    expect(t1.setRangeFills).toHaveBeenCalledWith(6, 11, [
      { type: "SOLID", color: { r: 1, g: 0, b: 0 }, opacity: 1 },
    ]);
    expect(t1.setRangeTextDecoration).toHaveBeenCalledWith(6, 11, "UNDERLINE");
    expect(t1.setRangeTextCase).toHaveBeenCalledWith(6, 11, "UPPER");
    expect(t1.setRangeLetterSpacing).toHaveBeenCalledWith(6, 11, { value: 1.5, unit: "PIXELS" });
    expect(t1.setRangeLineHeight).toHaveBeenCalledWith(6, 11, { value: 40, unit: "PIXELS" });
    expect(t1.setRangeHyperlink).toHaveBeenCalledWith(6, 11, {
      type: "URL",
      value: "https://example.com/world",
    });
  });

  it("reuses existing local styles and records warnings when createImage throws", async () => {
    const {
      mockFigma,
      createdPaintStyles,
      createdTextStyles,
      setFillStyleCalls,
      setTextStyleCalls,
    } = createMockFigma({
      createImageError: true,
      existingPaintStyles: [
        {
          id: "existing-ps",
          name: "Colors/#000000",
          type: "PAINT",
          paints: [{ type: "SOLID", color: { r: 0, g: 0, b: 0 }, opacity: 1 }],
        },
      ],
      existingTextStyles: [
        {
          id: "existing-ts",
          name: "Inter/Regular 16px",
          type: "TEXT",
          fontName: { family: "Inter", style: "Regular" },
          fontSize: 16,
          lineHeight: { unit: "AUTO" },
          letterSpacing: { value: 0, unit: "PIXELS" },
          textCase: "ORIGINAL",
          textDecoration: "NONE",
        },
      ],
    });

    const doc: SerializedDocument = {
      runId: "r-reuse",
      title: "Reuse",
      viewportWidth: 800,
      assets: { badImg: { mime: "image/png", bytes: new Uint8Array([1, 2]) } },
      root: {
        id: "root",
        type: "FRAME",
        name: "Page",
        x: 0,
        y: 0,
        width: 800,
        height: 600,
        opacity: 1,
        fills: [{ type: "IMAGE", assetId: "badImg", scaleMode: "FILL" }],
        strokes: [],
        cornerRadius: [0, 0, 0, 0],
        effects: [],
        clipsContent: false,
        children: [
          {
            id: "txt",
            type: "TEXT",
            name: "Body",
            x: 0,
            y: 0,
            width: 200,
            height: 24,
            opacity: 1,
            characters: "Body",
            fontFamily: "Inter",
            fontSize: 16,
            fontWeight: 400,
            fontStyle: "normal",
            lineHeightPx: 0,
            letterSpacingPx: 0,
            textAlign: "LEFT",
            fills: [{ type: "SOLID", color: { r: 0, g: 0, b: 0, a: 1 } }],
            ranges: [],
          },
        ],
      },
    };

    const summary = await buildFigmaPage(
      doc,
      { widths: [800], useAutoLayout: false, createStyles: true },
      0,
      mockFigma
    );

    expect(createdPaintStyles).toHaveLength(0);
    expect(createdTextStyles).toHaveLength(0);
    expect(setFillStyleCalls).toEqual(["existing-ps"]);
    expect(setTextStyleCalls).toEqual(["existing-ts"]);
    expect(summary.styleCount).toBe(0);
    expect(summary.warnings).toHaveLength(1);
  });

  it("yields and reports progress across batches of >40 nodes", async () => {
    const { mockFigma } = createMockFigma();
    const children: SerializedFrameNode[] = Array.from({ length: 45 }, (_, i) => ({
      id: `c-${i}`,
      type: "FRAME",
      name: `Card ${i}`,
      x: 0,
      y: i * 10,
      width: 100,
      height: 10,
      opacity: 1,
      fills: [],
      strokes: [],
      cornerRadius: [0, 0, 0, 0],
      effects: [],
      clipsContent: false,
      children: [],
    }));
    const doc: SerializedDocument = {
      runId: "r4",
      title: "Many Nodes",
      viewportWidth: 1000,
      assets: {},
      root: {
        id: "root",
        type: "FRAME",
        name: "Page",
        x: 0,
        y: 0,
        width: 1000,
        height: 1000,
        opacity: 1,
        fills: [],
        strokes: [],
        cornerRadius: [0, 0, 0, 0],
        effects: [],
        clipsContent: false,
        children,
      },
    };
    const progressEvents: Array<[number, number]> = [];
    const summary = await buildFigmaPage(
      doc,
      { widths: [1000], useAutoLayout: false, createStyles: false },
      0,
      mockFigma,
      { onProgress: (current, total) => progressEvents.push([current, total]) }
    );

    expect(summary.nodeCount).toBe(46);
    expect(progressEvents.length).toBeGreaterThanOrEqual(1);
    expect(progressEvents[0]).toEqual([40, 46]);
  });

  it("applies per-side strokeWeights, guards invalid relative/#anchor hyperlinks with warnings, and keeps valid https hyperlinks", async () => {
    const { mockFigma } = createMockFigma();

    const doc: SerializedDocument = {
      runId: "r-strokes-links",
      title: "Strokes & Links",
      viewportWidth: 1000,
      assets: {},
      root: {
        id: "root",
        type: "FRAME",
        name: "Page",
        x: 0,
        y: 0,
        width: 1000,
        height: 400,
        opacity: 1,
        fills: [],
        strokes: [{ type: "SOLID", color: { r: 0, g: 0, b: 0, a: 1 } }],
        strokeWeight: 2,
        strokeWeights: [0, 0, 2, 0],
        cornerRadius: [0, 0, 0, 0],
        effects: [],
        clipsContent: false,
        children: [
          {
            id: "t-invalid",
            type: "TEXT",
            name: "AnchorLink",
            x: 10,
            y: 10,
            width: 200,
            height: 24,
            opacity: 1,
            characters: "Jump to features",
            fontFamily: "Inter",
            fontSize: 16,
            fontWeight: 400,
            fontStyle: "normal",
            lineHeightPx: 24,
            letterSpacingPx: 0,
            textAlign: "LEFT",
            fills: [{ type: "SOLID", color: { r: 0, g: 0, b: 0, a: 1 } }],
            href: "#features",
            ranges: [{ start: 0, end: 4, href: "/relative" }],
          },
          {
            id: "t-valid",
            type: "TEXT",
            name: "ExternalLink",
            x: 10,
            y: 50,
            width: 200,
            height: 24,
            opacity: 1,
            characters: "Docs",
            fontFamily: "Inter",
            fontSize: 16,
            fontWeight: 400,
            fontStyle: "normal",
            lineHeightPx: 24,
            letterSpacingPx: 0,
            textAlign: "LEFT",
            fills: [{ type: "SOLID", color: { r: 0, g: 0, b: 0, a: 1 } }],
            href: "https://example.com/docs",
            ranges: [],
          },
        ],
      },
    };

    const summary = await buildFigmaPage(
      doc,
      { widths: [1000], useAutoLayout: false, createStyles: false },
      0,
      mockFigma
    );

    const root = mockFigma.currentPage.children[0] as unknown as {
      strokeWeight: number;
      strokeTopWeight?: number;
      strokeRightWeight?: number;
      strokeBottomWeight?: number;
      strokeLeftWeight?: number;
      children: Array<{
        hyperlink: unknown;
        setRangeHyperlink: ReturnType<typeof vi.fn>;
      }>;
    };
    expect(root.strokeWeight).toBe(2);
    expect(root.strokeTopWeight).toBe(0);
    expect(root.strokeRightWeight).toBe(0);
    expect(root.strokeBottomWeight).toBe(2);
    expect(root.strokeLeftWeight).toBe(0);

    expect(root.children[0].hyperlink).toBeNull();
    expect(root.children[0].setRangeHyperlink).not.toHaveBeenCalled();
    expect(root.children[1].hyperlink).toEqual({
      type: "URL",
      value: "https://example.com/docs",
    });
    expect(summary.warnings.length).toBeGreaterThanOrEqual(2);
  });
});

describe("code.ts message handler", () => {
  it("ignores malformed messages, handles cancel, and lays out multiple viewports cleanly", async () => {
    const { mockFigma, postedMessages, scrollIntoViewCalls, closePluginCalls } = createMockFigma({
      pageChildren: [{ x: 100, width: 500 }],
    });

    await handleUiMessage(null, mockFigma);
    await handleUiMessage("not-an-object", mockFigma);
    await handleUiMessage({ type: 123 }, mockFigma);
    expect(postedMessages).toHaveLength(0);

    await handleUiMessage({ type: "cancel" }, mockFigma);
    expect(closePluginCalls).toHaveLength(1);

    const makeDoc = (width: number): SerializedDocument => ({
      runId: `run-${width}`,
      title: `Page ${width}`,
      viewportWidth: width,
      assets: {},
      root: {
        id: "root",
        type: "FRAME",
        name: `Page ${width}`,
        x: 0,
        y: 0,
        width,
        height: 800,
        opacity: 1,
        fills: [],
        strokes: [],
        cornerRadius: [0, 0, 0, 0],
        effects: [],
        clipsContent: false,
        children: [],
      },
    });

    await handleUiMessage(
      {
        type: "import-documents",
        documents: [makeDoc(1920), makeDoc(390)],
        settings: { widths: [1920, 390], useAutoLayout: false, createStyles: false },
      },
      mockFigma
    );

    const roots = mockFigma.currentPage.children.slice(1) as unknown as Array<{ x: number }>;
    expect(roots).toHaveLength(2);
    expect(roots[0].x).toBe(720); // 100 + 500 + 120
    expect(roots[1].x).toBe(2760); // 720 + 1920 + 120
    expect(scrollIntoViewCalls).toHaveLength(1);
    expect(scrollIntoViewCalls[0]).toHaveLength(2);
    expect(postedMessages.some((m) => (m as { type: string }).type === "import-progress")).toBe(true);
    expect(postedMessages[postedMessages.length - 1]).toMatchObject({
      type: "import-complete",
      summary: { nodeCount: 2, imageCount: 0, warnings: [] },
    });

    await handleUiMessage(
      {
        type: "import-documents",
        documents: [],
        settings: { widths: [1920], useAutoLayout: false, createStyles: false },
      },
      mockFigma
    );
    expect(postedMessages[postedMessages.length - 1]).toEqual({
      type: "import-error",
      message: "No documents to import.",
    });
  });
});
