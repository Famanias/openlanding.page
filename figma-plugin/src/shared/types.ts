export const DEFAULT_VIEWPORT_WIDTH = 1920;

export interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface SerializedEffect {
  type: "DROP_SHADOW" | "INNER_SHADOW" | "LAYER_BLUR" | "BACKGROUND_BLUR";
  offsetX?: number;
  offsetY?: number;
  radius: number;
  spread?: number;
  color?: RgbaColor;
}

export interface SerializedSolidPaint {
  type: "SOLID";
  color: RgbaColor;
}

export interface SerializedGradientStop {
  position: number;
  color: RgbaColor;
}

export interface SerializedGradientPaint {
  type: "GRADIENT_LINEAR" | "GRADIENT_RADIAL";
  gradientTransform: [[number, number, number], [number, number, number]];
  stops: SerializedGradientStop[];
  opacity?: number;
}

export interface SerializedImagePaint {
  type: "IMAGE";
  assetId: string;
  scaleMode: "FILL" | "FIT" | "CROP" | "TILE";
  opacity?: number;
}

export type SerializedPaint =
  | SerializedSolidPaint
  | SerializedGradientPaint
  | SerializedImagePaint;

export interface SerializedTextRange {
  start: number;
  end: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  fontStyle?: "normal" | "italic";
  fills?: SerializedPaint[];
  textDecoration?: "NONE" | "UNDERLINE" | "STRIKETHROUGH";
  textCase?: "ORIGINAL" | "UPPER" | "LOWER" | "TITLE";
  letterSpacingPx?: number;
  lineHeightPx?: number;
  href?: string;
}

export interface SerializedLayoutMeta {
  display: string;
  flexDirection: string;
  flexWrap: string;
  justifyContent: string;
  alignItems: string;
  rowGap: number;
  columnGap: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
}

export interface SerializedFrameNode {
  id: string;
  type: "FRAME";
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  fills: SerializedPaint[];
  strokes: SerializedPaint[];
  strokeWeight?: number;
  strokeWeights?: [number, number, number, number];
  cornerRadius: [number, number, number, number];
  effects: SerializedEffect[];
  clipsContent: boolean;
  layout?: SerializedLayoutMeta;
  position?: string;
  rotation?: number;
  children: SerializedNode[];
}

export interface SerializedTextNode {
  id: string;
  type: "TEXT";
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  characters: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  fontStyle: "normal" | "italic";
  lineHeightPx: number;
  letterSpacingPx: number;
  textAlign: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED";
  textDecoration?: "NONE" | "UNDERLINE" | "STRIKETHROUGH";
  textCase?: "ORIGINAL" | "UPPER" | "LOWER" | "TITLE";
  fills: SerializedPaint[];
  ranges: SerializedTextRange[];
  href?: string;
  position?: string;
}

export interface SerializedSvgNode {
  id: string;
  type: "SVG";
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  svg: string;
  position?: string;
}

export type SerializedNode =
  | SerializedFrameNode
  | SerializedTextNode
  | SerializedSvgNode;

export interface SerializedImageAsset {
  mime: string;
  bytes: Uint8Array;
}

export interface FontFaceHint {
  family: string;
  weight?: string;
  style?: string;
  src?: string;
}

export interface SerializedDocument {
  runId: string;
  title: string;
  viewportWidth: number;
  assets: Record<string, SerializedImageAsset>;
  root: SerializedFrameNode;
  fontFaces?: FontFaceHint[];
}

export interface ImportSettings {
  widths: number[];
  useAutoLayout: boolean;
  createStyles: boolean;
}

export interface ImportSummary {
  nodeCount: number;
  imageCount: number;
  styleCount?: number;
  substitutedFonts: string[];
  warnings: string[];
}

export type UiToPluginMessage =
  | { type: "import-documents"; documents: SerializedDocument[]; settings: ImportSettings }
  | { type: "cancel" };

export type PluginToUiMessage =
  | { type: "import-progress"; label: string; current: number; total: number }
  | { type: "import-complete"; summary: ImportSummary }
  | { type: "import-error"; message: string };
