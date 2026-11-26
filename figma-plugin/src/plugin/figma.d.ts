declare const __html__: string;
declare const figma: PluginAPI;

interface RGB {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

interface RGBA {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;
}

interface Vector {
  readonly x: number;
  readonly y: number;
}

type Transform = [[number, number, number], [number, number, number]];

interface ColorStop {
  readonly position: number;
  readonly color: RGBA;
}

interface SolidPaint {
  readonly type: "SOLID";
  readonly color: RGB;
  readonly opacity?: number;
  readonly visible?: boolean;
}

interface GradientPaint {
  readonly type:
    | "GRADIENT_LINEAR"
    | "GRADIENT_RADIAL"
    | "GRADIENT_ANGULAR"
    | "GRADIENT_DIAMOND";
  readonly gradientTransform: Transform;
  readonly gradientStops: ReadonlyArray<ColorStop>;
  readonly opacity?: number;
  readonly visible?: boolean;
}

interface ImagePaint {
  readonly type: "IMAGE";
  readonly scaleMode: "FILL" | "FIT" | "CROP" | "TILE";
  readonly imageHash: string | null;
  readonly opacity?: number;
  readonly visible?: boolean;
}

type Paint = SolidPaint | GradientPaint | ImagePaint;

interface DropShadowEffect {
  readonly type: "DROP_SHADOW";
  readonly color: RGBA;
  readonly offset: Vector;
  readonly radius: number;
  readonly spread?: number;
  readonly visible: boolean;
  readonly blendMode: string;
}

interface InnerShadowEffect {
  readonly type: "INNER_SHADOW";
  readonly color: RGBA;
  readonly offset: Vector;
  readonly radius: number;
  readonly spread?: number;
  readonly visible: boolean;
  readonly blendMode: string;
}

interface BlurEffect {
  readonly type: "LAYER_BLUR" | "BACKGROUND_BLUR";
  readonly radius: number;
  readonly visible: boolean;
}

type Effect = DropShadowEffect | InnerShadowEffect | BlurEffect;

interface FontName {
  readonly family: string;
  readonly style: string;
}

interface Font {
  readonly fontName: FontName;
}

type LetterSpacing =
  | { readonly value: number; readonly unit: "PIXELS" }
  | { readonly value: number; readonly unit: "PERCENT" };

type LineHeight =
  | { readonly value: number; readonly unit: "PIXELS" }
  | { readonly value: number; readonly unit: "PERCENT" }
  | { readonly unit: "AUTO" };

type TextDecoration = "NONE" | "UNDERLINE" | "STRIKETHROUGH";
type TextCase = "ORIGINAL" | "UPPER" | "LOWER" | "TITLE";

interface HyperlinkTarget {
  type: "URL" | "NODE";
  value: string;
}

interface FigmaImage {
  readonly hash: string;
  getBytesAsync(): Promise<Uint8Array>;
}

interface BaseStyle {
  readonly id: string;
  name: string;
  remove(): void;
}

interface PaintStyle extends BaseStyle {
  readonly type: "PAINT";
  paints: ReadonlyArray<Paint>;
}

interface TextStyle extends BaseStyle {
  readonly type: "TEXT";
  fontName: FontName;
  fontSize: number;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
  textCase: TextCase;
  textDecoration: TextDecoration;
}

interface SceneNode {
  readonly id: string;
  readonly type: string;
  name: string;
  x: number;
  y: number;
  readonly width: number;
  readonly height: number;
  opacity: number;
  visible: boolean;
  rotation?: number;
  layoutPositioning?: "AUTO" | "ABSOLUTE";
  layoutGrow?: number;
  layoutAlign?: "MIN" | "CENTER" | "MAX" | "STRETCH" | "INHERIT";
  resize(width: number, height: number): void;
  remove(): void;
}

interface FrameNode extends SceneNode {
  readonly type: "FRAME";
  children: ReadonlyArray<SceneNode>;
  fills: ReadonlyArray<Paint>;
  strokes: ReadonlyArray<Paint>;
  strokeWeight: number;
  strokeTopWeight?: number;
  strokeRightWeight?: number;
  strokeBottomWeight?: number;
  strokeLeftWeight?: number;
  topLeftRadius: number;
  topRightRadius: number;
  bottomRightRadius: number;
  bottomLeftRadius: number;
  effects: ReadonlyArray<Effect>;
  clipsContent: boolean;
  layoutMode: "NONE" | "HORIZONTAL" | "VERTICAL";
  layoutWrap: "NO_WRAP" | "WRAP";
  primaryAxisSizingMode: "FIXED" | "AUTO";
  counterAxisSizingMode: "FIXED" | "AUTO";
  primaryAxisAlignItems: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN";
  counterAxisAlignItems: "MIN" | "CENTER" | "MAX" | "BASELINE";
  itemSpacing: number;
  counterAxisSpacing: number | null;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  appendChild(child: SceneNode): void;
  setFillStyleIdAsync(styleId: string): Promise<void>;
}

interface TextNode extends SceneNode {
  readonly type: "TEXT";
  characters: string;
  fontName: FontName;
  fontSize: number;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
  textAlignHorizontal: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED";
  textAutoResize: "NONE" | "WIDTH_AND_HEIGHT" | "HEIGHT" | "TRUNCATE";
  textDecoration: TextDecoration;
  textCase: TextCase;
  fills: ReadonlyArray<Paint>;
  strokes?: ReadonlyArray<Paint>;
  strokeWeight?: number;
  hyperlink: HyperlinkTarget | null;
  setRangeFontName(start: number, end: number, value: FontName): void;
  setRangeFontSize(start: number, end: number, value: number): void;
  setRangeFills(start: number, end: number, value: Paint[]): void;
  setRangeTextDecoration(start: number, end: number, value: TextDecoration): void;
  setRangeTextCase(start: number, end: number, value: TextCase): void;
  setRangeLetterSpacing(start: number, end: number, value: LetterSpacing): void;
  setRangeLineHeight(start: number, end: number, value: LineHeight): void;
  setRangeHyperlink(start: number, end: number, value: HyperlinkTarget | null): void;
  setFillStyleIdAsync(styleId: string): Promise<void>;
  setTextStyleIdAsync(styleId: string): Promise<void>;
}

interface PageNode {
  readonly id: string;
  name: string;
  children: ReadonlyArray<SceneNode>;
  selection: ReadonlyArray<SceneNode>;
  appendChild(child: SceneNode): void;
}

interface UIAPI {
  postMessage(pluginMessage: unknown): void;
  onmessage: ((pluginMessage: unknown) => void) | undefined;
}

interface ViewportAPI {
  scrollAndZoomIntoView(nodes: ReadonlyArray<SceneNode>): void;
}

interface PluginAPI {
  readonly currentPage: PageNode;
  readonly ui: UIAPI;
  readonly viewport: ViewportAPI;
  showUI(
    html: string,
    options?: { width?: number; height?: number; title?: string; themeColors?: boolean }
  ): void;
  closePlugin(message?: string): void;
  notify(message: string, options?: { timeout?: number; error?: boolean }): void;
  createFrame(): FrameNode;
  createText(): TextNode;
  createNodeFromSvg(svg: string): FrameNode;
  createImage(data: Uint8Array): FigmaImage;
  createPaintStyle(): PaintStyle;
  createTextStyle(): TextStyle;
  getLocalPaintStylesAsync(): Promise<PaintStyle[]>;
  getLocalTextStylesAsync(): Promise<TextStyle[]>;
  loadFontAsync(fontName: FontName): Promise<void>;
  listAvailableFontsAsync(): Promise<Font[]>;
}
