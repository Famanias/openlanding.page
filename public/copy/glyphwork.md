<template slug="glyphwork" name="GLYPHWORK">
  <dependencies>
    {
      "dependencies": {
        "lucide-react": "0.475.0",
        "motion": "^14.4.0"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(glyphwork)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import "./glyphwork/glyphwork.css";

export const metadata: Metadata = {
  title: "GLYPHWORK — Independent Type Foundry",
  description: "Experimental Swiss-modernist independent type foundry and live variable typography laboratory.",
  openGraph: {
    title: "GLYPHWORK — Independent Type Foundry",
    description: "Experimental Swiss-modernist independent type foundry and live variable typography laboratory.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F7F0",
};

export default function GlyphworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth`}>
      <body className="bg-[#0b0b0b] text-[#f4f0e8] antialiased">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(glyphwork)/glyphwork/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(glyphwork)/glyphwork/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/glyphwork";

export function assetSrc(
  key: string,
  width: 800 | 1600,
  format: "webp" | "avif" = "webp"
): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = {
  assetKey: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function Picture({ assetKey, alt, className }: PictureProps) {
  const source = assetSrc(assetKey, 800);
  if (!source) {
    return (
      <div
        className={`glyphwork-placeholder ${className ?? ""}`}
        role="img"
        aria-label={alt}
        data-asset={assetKey}
      >
        <span>{assetKey}</span>
      </div>
    );
  }
  return (
    <img
      src={source}
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
      fetchPriority="high"
    />
  );
}
]]>
    </file>
    <file path="src/app/(glyphwork)/glyphwork/glyphwork.css">
<![CDATA[@import "tailwindcss";

@font-face {
  font-family: 'GlyphworkVariable';
  src: url('/templates/glyphwork/glyphwork/01-specimen-variable.woff2') format('woff2-variations'),
       url('/templates/glyphwork/glyphwork/01-specimen-variable.woff2') format('woff2');
  font-weight: 100 1000;
  font-stretch: 25% 151%;
  font-style: oblique -10deg 0deg;
  font-display: swap;
}

:root {
  --gw-milk: #F7F7F0;
  --gw-ink: #111111;
  --gw-magenta: #F02F83;
  --gw-yellow: #E5F56B;
  --gw-violet: #6E57D5;
  --gw-font-specimen: 'GlyphworkVariable', 'Arial Narrow', 'Helvetica Neue', Arial, sans-serif;
  --gw-font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  --gw-wght: 720;
  --gw-wdth: 135;
  --gw-slnt: -2.33;
  --gw-opsz: 144;
  --gw-tracking: -0.004em;
}

* {
  box-sizing: border-box;
}

html {
  background-color: var(--gw-milk);
  color: var(--gw-ink);
  font-family: var(--gw-font-specimen);
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  background-color: var(--gw-milk);
  color: var(--gw-ink);
  overflow-x: hidden;
  selection-background-color: var(--gw-yellow);
  selection-color: var(--gw-ink);
}

::selection {
  background-color: var(--gw-yellow);
  color: var(--gw-ink);
}

.gw-specimen-live {
  font-family: var(--gw-font-specimen);
  font-variation-settings:
    'wght' var(--gw-wght),
    'wdth' var(--gw-wdth),
    'slnt' var(--gw-slnt),
    'opsz' var(--gw-opsz);
  letter-spacing: var(--gw-tracking);
  font-synthesis: none;
}

.gw-mono {
  font-family: var(--gw-font-mono);
  font-variant-numeric: tabular-nums;
}

/* Custom Instrument Range Sliders */
.gw-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 20px;
  background: transparent;
  cursor: ew-resize;
  margin: 0;
}

.gw-slider:focus-visible {
  outline: 2px solid var(--gw-ink);
  outline-offset: 2px;
}

.gw-slider::-webkit-slider-runnable-track {
  height: 2px;
  background: var(--gw-ink);
  border: none;
}

.gw-slider::-moz-range-track {
  height: 2px;
  background: var(--gw-ink);
  border: none;
}

.gw-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  border: 1.5px solid var(--gw-ink);
  margin-top: -7px;
  transition: transform 120ms cubic-bezier(0.16, 1, 0.3, 1);
}

.gw-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  border: 1.5px solid var(--gw-ink);
  transition: transform 120ms cubic-bezier(0.16, 1, 0.3, 1);
}

.gw-slider:hover::-webkit-slider-thumb,
.gw-slider:active::-webkit-slider-thumb {
  transform: scale(1.18);
}

.gw-slider-magenta::-webkit-slider-thumb {
  background-color: var(--gw-magenta);
}
.gw-slider-magenta::-moz-range-thumb {
  background-color: var(--gw-magenta);
}

.gw-slider-violet::-webkit-slider-thumb {
  background-color: var(--gw-violet);
}
.gw-slider-violet::-moz-range-thumb {
  background-color: var(--gw-violet);
}

.gw-slider-ink::-webkit-slider-thumb {
  background-color: var(--gw-ink);
}
.gw-slider-ink::-moz-range-thumb {
  background-color: var(--gw-ink);
}

.gw-slider-yellow::-webkit-slider-thumb {
  background-color: var(--gw-yellow);
}
.gw-slider-yellow::-moz-range-thumb {
  background-color: var(--gw-yellow);
}

/* Vertical text utility for Right Rail */
.gw-vertical-rl {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

/* Hero Specimen Entrance Animation */
@keyframes gwHeroExpand {
  0% {
    opacity: 0;
    transform: scaleY(0.72) scaleX(0.86);
    transform-origin: center 78%;
  }
  100% {
    opacity: 1;
    transform: scaleY(1) scaleX(1);
    transform-origin: center 78%;
  }
}

@keyframes gwGuideSweep {
  0% {
    opacity: 0;
    transform: scaleX(0.2);
    transform-origin: left center;
  }
  100% {
    opacity: 1;
    transform: scaleX(1);
    transform-origin: left center;
  }
}

.gw-animate-hero {
  animation: gwHeroExpand 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.gw-animate-guide {
  animation: gwGuideSweep 750ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .gw-animate-hero,
  .gw-animate-guide {
    animation: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
]]>
    </file>
    <file path="src/app/(glyphwork)/glyphwork/GlyphworkApp.tsx">
<![CDATA['use client';

import { GlyphworkPage } from './components/glyphwork/GlyphworkPage';

export default function GlyphworkApp() {
  return <GlyphworkPage />;
}
]]>
    </file>
    <file path="src/app/(glyphwork)/glyphwork/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#F7F7F0" />
  <text x="32" y="42" font-family="system-ui, sans-serif" font-size="30" font-weight="bold" fill="#F02F83" text-anchor="middle">G</text>
</svg>
]]>
    </file>
    <file path="src/app/(glyphwork)/glyphwork/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "GLYPHWORK — Independent Type Foundry";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#F7F7F0",
          color: "#F02F83",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.08em" }}>
          <span>GLYPHWORK</span>
          <span style={{ color: "#E5F56B" }}>/</span>
          <span style={{ fontSize: 18, opacity: 0.8 }}>LANDING TEMPLATE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: "bold", lineHeight: 1.1, maxWidth: 950 }}>
            GLYPHWORK — Independent Type Foundry
          </div>
          <div style={{ display: "flex", fontSize: 22, opacity: 0.75, maxWidth: 850 }}>
            Experimental Swiss-modernist independent type foundry and live variable typography laboratory.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.7 }}>
          <span>openlanding.page</span>
          <span style={{ color: "#E5F56B" }}>Next.js 16 · React 19 · Tailwind v4</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
]]>
    </file>
    <file path="src/app/(glyphwork)/glyphwork/page.tsx">
<![CDATA["use client";

import GlyphworkApp from "./GlyphworkApp";

export default function GlyphworkPage() {
  return <GlyphworkApp />;
}
]]>
    </file>
    <file path="src/app/(glyphwork)/glyphwork/utils/typographyLogic.ts">
<![CDATA[export type SpecimenMode = 'display' | 'headline' | 'paragraph';
export type CaseMode = 'preserve' | 'upper' | 'lower';

export interface VariableAxesState {
  weight: number;      // 100 - 900 (default 720)
  width: number;       // 50 - 150 (default 135)
  tracking: number;    // -100 - 100 (default -4 -> -0.04em)
  slant: number;       // 0 - 15 degrees (default 3.5)
  opticalSize: number; // 8 - 144 pt (default 144)
  fontSize: number;    // 32 - 220 px (default 160)
}

export interface LabSnapshot {
  text: string;
  headlineText: string;
  paragraphText: string;
  mode: SpecimenMode;
  caseMode: CaseMode;
  axes: VariableAxesState;
  selectedGlyph: string;
}

export interface NodeCoordinate {
  id: string;
  x: number; // percentage 0-100 across glyph box
  y: number; // percentage 0-100 down glyph box
  label: string;
  type: 'on-curve' | 'off-curve' | 'extremum';
}

export interface GlyphAnatomy {
  char: string;
  unicode: string;
  name: string;
  category: string;
  baseAdvanceWidth: number; // out of 1000 EM
  leftSidebearing: number;
  rightSidebearing: number;
  bezierNodes: number;
  extremumPoints: number;
  counterAperture: string;
  constructionNote: string;
  nodeCoordinates: NodeCoordinate[];
}

export interface ComputedGlyphMetrics extends GlyphAnatomy {
  effectiveAdvanceEm: number;
  effectiveLsb: number;
  effectiveRsb: number;
  stemWeightUnits: number;
  slantOffsetPx: number;
}

export const DEFAULT_AXES: VariableAxesState = {
  weight: 720,
  width: 135,
  tracking: -4,
  slant: 3.5,
  opticalSize: 144,
  fontSize: 160,
};

export const DEFAULT_SNAPSHOT: LabSnapshot = {
  text: 'GLYPHWORK',
  headlineText: 'PRECISION SWISS GROTESQUE ENGINEERED FOR CONTINUOUS PARAMETRIC INTERPOLATION.',
  paragraphText:
    'GLYPHWORK Sans Variable is constructed on a 1000-unit em-square with continuous parametric control over weight, width, optical size, and oblique slant. Designed in Zurich and Geneva for editorial environments, kinetic architectures, and high-density technical instrumentation.',
  mode: 'display',
  caseMode: 'preserve',
  axes: { ...DEFAULT_AXES },
  selectedGlyph: 'G',
};

export const SPECIMEN_PRESETS: Array<{
  id: string;
  label: string;
  mode: SpecimenMode;
  word: string;
  headline: string;
  paragraph: string;
  axesPartial?: Partial<VariableAxesState>;
}> = [
  {
    id: 'foundry-default',
    label: '01 / GLYPHWORK STANDARD',
    mode: 'display',
    word: 'GLYPHWORK',
    headline: 'PRECISION SWISS GROTESQUE ENGINEERED FOR CONTINUOUS PARAMETRIC INTERPOLATION.',
    paragraph:
      'GLYPHWORK Sans Variable is constructed on a 1000-unit em-square with continuous parametric control over weight, width, optical size, and oblique slant. Designed in Zurich and Geneva for editorial environments, kinetic architectures, and high-density technical instrumentation.',
    axesPartial: { weight: 720, width: 135, tracking: -4, slant: 3.5, opticalSize: 144 },
  },
  {
    id: 'kinetic-condensed',
    label: '02 / ULTRA CONDENSED',
    mode: 'display',
    word: 'METRICFIELD',
    headline: 'COMPRESSED VERTICAL PROPORTIONS FOR ARCHITECTURAL SIGNAGE & NARROW COLUMNS.',
    paragraph:
      'At Width 62 and Weight 840, interior counters tighten into vertical slots while maintaining uniform stem density across uppercase and lowercase ascenders. Ideal for brutalist posters and tabular schedules.',
    axesPartial: { weight: 840, width: 62, tracking: -2, slant: 0, opticalSize: 144 },
  },
  {
    id: 'editorial-wide',
    label: '03 / EXTENDED MONOGRAPH',
    mode: 'headline',
    word: 'SYNTHESIS',
    headline: 'WIDE APERTURE GEOMETRY WITH CALIBRATED OPTICAL COMPENSATION AT 150% EXPANSION.',
    paragraph:
      'Horizontal expansion redistributes curvature tension along the bowls of O, G, C, and R without over-thickening horizontal crossbars. Tuned specifically for exhibition titles and terminal headers.',
    axesPartial: { weight: 540, width: 148, tracking: -18, slant: 6.5, opticalSize: 96 },
  },
  {
    id: 'micro-text',
    label: '04 / TECHNICAL BODY',
    mode: 'paragraph',
    word: 'INSTRUMENT',
    headline: 'HIGH-X-HEIGHT TEXT CUT FOR LONG-FORM CATALOGS, SPEC SHEETS & FOOTNOTES.',
    paragraph:
      'In small optical sizes (8pt–16pt), ink traps open subtly at acute junctions in W, M, K, and N while x-height proportion holds steady at 520 units, preserving clarity on uncoated archival paper and high-DPI displays.',
    axesPartial: { weight: 420, width: 105, tracking: 8, slant: 0, opticalSize: 16 },
  },
];

export function clampAxis(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function formatTrackingDisplay(tracking: number): string {
  const emVal = tracking / 100;
  const formatted = emVal.toFixed(2);
  if (emVal > 0) return `+${formatted}`;
  if (Object.is(emVal, -0) || formatted === '-0.00') return '0.00';
  return formatted;
}

export function formatTrackingCss(tracking: number): string {
  const emVal = tracking / 1000;
  return `${emVal.toFixed(3)}em`;
}

export function formatSlantDisplay(slant: number): string {
  return `${Number(slant).toFixed(1)}°`;
}

export function buildFontVariationSettings(axes: VariableAxesState): string {
  const wght = Math.round(clampAxis(axes.weight, 100, 900));
  const wdth = Math.round(clampAxis(axes.width, 50, 150));
  // Roboto Flex 'slnt' axis ranges from -10 to 0
  const slnt = -Number(clampAxis((axes.slant / 15) * 10, 0, 10).toFixed(2));
  const opsz = Math.round(clampAxis(axes.opticalSize, 8, 144));
  return `'wght' ${wght}, 'wdth' ${wdth}, 'slnt' ${slnt}, 'opsz' ${opsz}`;
}

export function computeGuideMetrics(axes: VariableAxesState, charCount = 9) {
  const capHeightPt = Math.round(840 + (axes.weight - 720) * 0.05);
  const xHeightPt = Math.round(520 + (axes.opticalSize - 144) * -0.12 + (axes.weight - 720) * 0.04);
  const estimatedWidthPx = Math.round(
    charCount * 102 * (axes.width / 100) * (1 + axes.tracking / 1000)
  );
  const trackingRatio = Number((axes.tracking / 200).toFixed(2));
  return {
    capHeightLabel: `CAP-HEIGHT // ${capHeightPt}pt`,
    xHeightLabel: `X-HEIGHT // ${xHeightPt}pt`,
    baselineLabel: `BASELINE // 0.00px`,
    coordinateReadout: `w: ${estimatedWidthPx} t: ${trackingRatio >= 0 ? `+${trackingRatio.toFixed(2)}` : trackingRatio.toFixed(2)}`,
    capHeightRatio: Number((capHeightPt / 1000).toFixed(3)),
    xHeightRatio: Number((xHeightPt / 1000).toFixed(3)),
  };
}

export function applyCaseTransform(text: string, caseMode: CaseMode): string {
  if (caseMode === 'upper') return text.toUpperCase();
  if (caseMode === 'lower') return text.toLowerCase();
  return text;
}

export function isSameAxes(a: VariableAxesState, b: VariableAxesState): boolean {
  return (
    a.weight === b.weight &&
    a.width === b.width &&
    a.tracking === b.tracking &&
    a.slant === b.slant &&
    a.opticalSize === b.opticalSize &&
    a.fontSize === b.fontSize
  );
}

export function isSameSnapshot(a: LabSnapshot, b: LabSnapshot): boolean {
  return (
    a.text === b.text &&
    a.headlineText === b.headlineText &&
    a.paragraphText === b.paragraphText &&
    a.mode === b.mode &&
    a.caseMode === b.caseMode &&
    a.selectedGlyph === b.selectedGlyph &&
    isSameAxes(a.axes, b.axes)
  );
}

export function pushHistory(
  history: LabSnapshot[],
  snapshot: LabSnapshot,
  maxLen = 25
): LabSnapshot[] {
  const last = history[history.length - 1];
  if (last && isSameSnapshot(last, snapshot)) {
    return history;
  }
  const cloned: LabSnapshot = {
    ...snapshot,
    axes: { ...snapshot.axes },
  };
  const next = [...history, cloned];
  if (next.length > maxLen) {
    return next.slice(next.length - maxLen);
  }
  return next;
}

export function popHistory(
  history: LabSnapshot[],
  current: LabSnapshot
): { restored: LabSnapshot; nextHistory: LabSnapshot[] } {
  if (history.length === 0) {
    return { restored: current, nextHistory: [] };
  }
  const last = history[history.length - 1];
  const remaining = history.slice(0, -1);
  return {
    restored: {
      ...last,
      axes: { ...last.axes },
    },
    nextHistory: remaining,
  };
}

const GLYPH_CATALOG: Record<string, GlyphAnatomy> = {
  G: {
    char: 'G',
    unicode: 'U+0047',
    name: 'LATIN CAPITAL LETTER G',
    category: 'Uppercase / Grotesque Spur & Crossbar',
    baseAdvanceWidth: 712,
    leftSidebearing: 54,
    rightSidebearing: 48,
    bezierNodes: 28,
    extremumPoints: 10,
    counterAperture: '310 EM Open Throat',
    constructionNote:
      'Constructed with a deep horizontal spur bar aligned strictly to the 520pt x-height axis, balancing super-elliptical outer bowl tension against a vertical right terminal.',
    nodeCoordinates: [
      { id: 'n1', x: 48, y: 12, label: '01 / TOP EXTREMUM (840)', type: 'extremum' },
      { id: 'n2', x: 78, y: 27, label: '02 / UPPER APERTURE TERMINAL', type: 'on-curve' },
      { id: 'n3', x: 72, y: 50, label: '03 / CROSSBAR JUNCTION (520)', type: 'on-curve' },
      { id: 'n4', x: 16, y: 56, label: '04 / LEFT SPINE EXTREMUM', type: 'extremum' },
      { id: 'n5', x: 32, y: 90, label: '05 / BASELINE OVERSHOOT (-14)', type: 'extremum' },
      { id: 'n6', x: 80, y: 78, label: '06 / SPUR TERMINAL', type: 'on-curve' },
    ],
  },
  L: {
    char: 'L',
    unicode: 'U+004C',
    name: 'LATIN CAPITAL LETTER L',
    category: 'Uppercase / Orthogonal Rectilinear',
    baseAdvanceWidth: 590,
    leftSidebearing: 68,
    rightSidebearing: 32,
    bezierNodes: 8,
    extremumPoints: 4,
    counterAperture: '480 EM Open Quadrant',
    constructionNote:
      'Pure orthogonal stem-to-arm construction with 4-unit interior optical tapering at the baseline corner to counteract dark ink pooling at heavy display weights.',
    nodeCoordinates: [
      { id: 'n1', x: 26, y: 15, label: '01 / ASCENDER CAP HEAD', type: 'on-curve' },
      { id: 'n2', x: 44, y: 15, label: '02 / INNER STEM VERTEX', type: 'on-curve' },
      { id: 'n3', x: 44, y: 74, label: '03 / CORNER OPTICAL TRAP', type: 'on-curve' },
      { id: 'n4', x: 80, y: 85, label: '04 / BASELINE ARM TERMINAL', type: 'extremum' },
    ],
  },
  Y: {
    char: 'Y',
    unicode: 'U+0059',
    name: 'LATIN CAPITAL LETTER Y',
    category: 'Uppercase / Symmetrical Diagonal Fork',
    baseAdvanceWidth: 660,
    leftSidebearing: 28,
    rightSidebearing: 28,
    bezierNodes: 14,
    extremumPoints: 6,
    counterAperture: '54° Vertex Crotch',
    constructionNote:
      'Diagonal arms converge precisely at 46% cap-height with micro-excavated crotch geometry that preserves negative counter space across wide and bold interpolations.',
    nodeCoordinates: [
      { id: 'n1', x: 18, y: 15, label: '01 / LEFT DIAGONAL APEX', type: 'extremum' },
      { id: 'n2', x: 50, y: 49, label: '02 / CROTCH INK-TRAP VERTEX', type: 'on-curve' },
      { id: 'n3', x: 82, y: 15, label: '03 / RIGHT DIAGONAL APEX', type: 'extremum' },
      { id: 'n4', x: 50, y: 85, label: '04 / CENTRAL STEM FOOT', type: 'extremum' },
    ],
  },
  P: {
    char: 'P',
    unicode: 'U+0050',
    name: 'LATIN CAPITAL LETTER P',
    category: 'Uppercase / Closed Asymmetric Bowl',
    baseAdvanceWidth: 654,
    leftSidebearing: 66,
    rightSidebearing: 44,
    bezierNodes: 18,
    extremumPoints: 7,
    counterAperture: '240 EM Enclosed Bowl',
    constructionNote:
      'Lower bowl sweep locks below the 520pt x-height line at 445 units, creating a generous upper counter that stays crisp down to 8pt micro optical sizes.',
    nodeCoordinates: [
      { id: 'n1', x: 24, y: 15, label: '01 / VERTICAL STEM HEAD', type: 'on-curve' },
      { id: 'n2', x: 80, y: 36, label: '02 / BOWL OUTER EXTREMUM', type: 'extremum' },
      { id: 'n3', x: 42, y: 56, label: '03 / BOWL-TO-STEM JOIN', type: 'on-curve' },
      { id: 'n4', x: 24, y: 85, label: '04 / STEM BASELINE TERMINAL', type: 'extremum' },
    ],
  },
  H: {
    char: 'H',
    unicode: 'U+0048',
    name: 'LATIN CAPITAL LETTER H',
    category: 'Uppercase / Bilateral Pillar Standard',
    baseAdvanceWidth: 728,
    leftSidebearing: 68,
    rightSidebearing: 68,
    bezierNodes: 12,
    extremumPoints: 4,
    counterAperture: 'Dual Symmetric Bays',
    constructionNote:
      'The primary metric calibration glyph for uppercase spacing. Crossbar top edge aligns mathematically with the 520pt x-height reference rail.',
    nodeCoordinates: [
      { id: 'n1', x: 22, y: 15, label: '01 / LEFT PILLAR CAP', type: 'extremum' },
      { id: 'n2', x: 50, y: 48, label: '02 / CROSSBAR X-HEIGHT LOCK', type: 'on-curve' },
      { id: 'n3', x: 78, y: 15, label: '03 / RIGHT PILLAR CAP', type: 'extremum' },
      { id: 'n4', x: 78, y: 85, label: '04 / RIGHT PILLAR BASE', type: 'extremum' },
    ],
  },
  W: {
    char: 'W',
    unicode: 'U+0057',
    name: 'LATIN CAPITAL LETTER W',
    category: 'Uppercase / Quadruple Diagonal Truss',
    baseAdvanceWidth: 948,
    leftSidebearing: 24,
    rightSidebearing: 24,
    bezierNodes: 22,
    extremumPoints: 9,
    counterAperture: 'Triple Acute Triangles',
    constructionNote:
      'Engineered with progressive diagonal stroke thinning on interior strokes (88% of outer stroke weight) and deep vertical ink traps to prevent dark spot clumping.',
    nodeCoordinates: [
      { id: 'n1', x: 14, y: 15, label: '01 / OUTER LEFT SHOULDER', type: 'extremum' },
      { id: 'n2', x: 50, y: 24, label: '02 / CENTRAL APEX VERTEX', type: 'extremum' },
      { id: 'n3', x: 33, y: 85, label: '03 / PRIMARY NADIR TRAP', type: 'extremum' },
      { id: 'n4', x: 67, y: 85, label: '04 / SECONDARY NADIR TRAP', type: 'extremum' },
      { id: 'n5', x: 86, y: 15, label: '05 / OUTER RIGHT SHOULDER', type: 'extremum' },
    ],
  },
  O: {
    char: 'O',
    unicode: 'U+004F',
    name: 'LATIN CAPITAL LETTER O',
    category: 'Uppercase / Super-Elliptical Annulus',
    baseAdvanceWidth: 740,
    leftSidebearing: 46,
    rightSidebearing: 46,
    bezierNodes: 24,
    extremumPoints: 8,
    counterAperture: '420 EM Rectangular Ovoid',
    constructionNote:
      'Constructed with flattened vertical flanks and 14-unit top/bottom optical overshoots beyond Cap-Height (840pt) and Baseline (0pt) for visual equilibrium.',
    nodeCoordinates: [
      { id: 'n1', x: 50, y: 13, label: '01 / ZENITH OVERSHOOT (+14)', type: 'extremum' },
      { id: 'n2', x: 17, y: 50, label: '02 / WEST FLANK EXTREMUM', type: 'extremum' },
      { id: 'n3', x: 83, y: 50, label: '03 / EAST FLANK EXTREMUM', type: 'extremum' },
      { id: 'n4', x: 50, y: 87, label: '04 / NADIR OVERSHOOT (-14)', type: 'extremum' },
      { id: 'n5', x: 26, y: 26, label: '05 / SUPER-ELLIPSE HANDLE A', type: 'off-curve' },
      { id: 'n6', x: 74, y: 74, label: '06 / SUPER-ELLIPSE HANDLE B', type: 'off-curve' },
    ],
  },
  R: {
    char: 'R',
    unicode: 'U+0052',
    name: 'LATIN CAPITAL LETTER R',
    category: 'Uppercase / Bowl & Diagonal Leg',
    baseAdvanceWidth: 692,
    leftSidebearing: 66,
    rightSidebearing: 36,
    bezierNodes: 23,
    extremumPoints: 8,
    counterAperture: '230 EM Bowl + Open Leg',
    constructionNote:
      'Features a taut diagonal leg emerging from the bowl underside rather than the stem junction, imparting unmistakable neo-grotesque Swiss authority.',
    nodeCoordinates: [
      { id: 'n1', x: 23, y: 15, label: '01 / STEM CAP VERTEX', type: 'on-curve' },
      { id: 'n2', x: 78, y: 34, label: '02 / UPPER BOWL EXTREMUM', type: 'extremum' },
      { id: 'n3', x: 56, y: 54, label: '03 / LEG TAKEOFF CANTILEVER', type: 'on-curve' },
      { id: 'n4', x: 82, y: 85, label: '04 / DIAGONAL FOOT TERMINAL', type: 'extremum' },
    ],
  },
  K: {
    char: 'K',
    unicode: 'U+004B',
    name: 'LATIN CAPITAL LETTER K',
    category: 'Uppercase / Braced Diagonal Kicker',
    baseAdvanceWidth: 688,
    leftSidebearing: 66,
    rightSidebearing: 28,
    bezierNodes: 17,
    extremumPoints: 6,
    counterAperture: 'Dual Asymmetric Wedges',
    constructionNote:
      'A double-jointed structure where the lower leg braces directly into the upper arm at the x-height line (520pt), echoing Swiss railway specimen lettering.',
    nodeCoordinates: [
      { id: 'n1', x: 23, y: 15, label: '01 / VERTICAL SPINE HEAD', type: 'on-curve' },
      { id: 'n2', x: 79, y: 15, label: '02 / UPPER ARM TERMINAL', type: 'extremum' },
      { id: 'n3', x: 46, y: 49, label: '03 / DOUBLE-JOINT INTERSECTION', type: 'on-curve' },
      { id: 'n4', x: 83, y: 85, label: '04 / KICKER BASE TERMINAL', type: 'extremum' },
    ],
  },
  F: {
    char: 'F',
    unicode: 'U+0046',
    name: 'LATIN CAPITAL LETTER F',
    category: 'Uppercase / Cantilevered Twin Bar',
    baseAdvanceWidth: 598,
    leftSidebearing: 66,
    rightSidebearing: 40,
    bezierNodes: 10,
    extremumPoints: 5,
    counterAperture: 'Open Lower Bay',
    constructionNote:
      'Lower crossbar sits at 520pt x-height and terminates 36 units recessed from the upper arm to maintain crisp silhouette differentiation from E.',
    nodeCoordinates: [
      { id: 'n1', x: 24, y: 15, label: '01 / CAP HEAD CORNER', type: 'on-curve' },
      { id: 'n2', x: 78, y: 15, label: '02 / TOP CANTILEVER TERMINAL', type: 'extremum' },
      { id: 'n3', x: 70, y: 48, label: '03 / MEDIAN BAR TERMINAL', type: 'on-curve' },
      { id: 'n4', x: 24, y: 85, label: '04 / STEM FOOT', type: 'extremum' },
    ],
  },
  A: {
    char: 'A',
    unicode: 'U+0041',
    name: 'LATIN CAPITAL LETTER A',
    category: 'Uppercase / Triangular Apex Arch',
    baseAdvanceWidth: 684,
    leftSidebearing: 22,
    rightSidebearing: 22,
    bezierNodes: 16,
    extremumPoints: 6,
    counterAperture: 'Enclosed Delta Counter',
    constructionNote:
      'Flat-topped apex spans 112 units at default width with an interior ink-trap notch that prevents counter collapse at Weight 900.',
    nodeCoordinates: [
      { id: 'n1', x: 50, y: 15, label: '01 / APEX PLATEAU', type: 'extremum' },
      { id: 'n2', x: 50, y: 31, label: '02 / COUNTER NOTCH TRAP', type: 'on-curve' },
      { id: 'n3', x: 34, y: 62, label: '03 / CROSSBAR LEFT TIE', type: 'on-curve' },
      { id: 'n4', x: 84, y: 85, label: '04 / RIGHT LEG BASE', type: 'extremum' },
    ],
  },
  B: {
    char: 'B',
    unicode: 'U+0042',
    name: 'LATIN CAPITAL LETTER B',
    category: 'Uppercase / Stacked Double Bowl',
    baseAdvanceWidth: 678,
    leftSidebearing: 66,
    rightSidebearing: 42,
    bezierNodes: 26,
    extremumPoints: 9,
    counterAperture: 'Upper 46% / Lower 54% Ratio',
    constructionNote:
      'Upper bowl is optically narrower by 24 EM units than the lower bowl, anchoring gravitational center below the 520pt x-height line.',
    nodeCoordinates: [
      { id: 'n1', x: 24, y: 15, label: '01 / SPINE TOP VERTEX', type: 'on-curve' },
      { id: 'n2', x: 76, y: 31, label: '02 / UPPER BOWL EXTREMUM', type: 'extremum' },
      { id: 'n3', x: 56, y: 48, label: '03 / WAIST INDENT JUNCTION', type: 'on-curve' },
      { id: 'n4', x: 81, y: 68, label: '04 / LOWER BOWL EXTREMUM', type: 'extremum' },
    ],
  },
  r: {
    char: 'r',
    unicode: 'U+0072',
    name: 'LATIN SMALL LETTER R',
    category: 'Lowercase / Single-Shoulder Terminal',
    baseAdvanceWidth: 412,
    leftSidebearing: 58,
    rightSidebearing: 26,
    bezierNodes: 13,
    extremumPoints: 5,
    counterAperture: 'Open Right Shoulder',
    constructionNote:
      'Features a deep V-shaped junction between vertical stem and arched shoulder, maintaining rhythmic spacing in dense lowercase text blocks.',
    nodeCoordinates: [
      { id: 'n1', x: 30, y: 38, label: '01 / X-HEIGHT STEM TOP', type: 'on-curve' },
      { id: 'n2', x: 46, y: 45, label: '02 / SHOULDER INK TRAP', type: 'on-curve' },
      { id: 'n3', x: 76, y: 39, label: '03 / ARCH TERMINAL', type: 'extremum' },
      { id: 'n4', x: 30, y: 85, label: '04 / BASELINE STEM FOOT', type: 'extremum' },
    ],
  },
};

export function getGlyphAnatomy(rawChar: string): GlyphAnatomy {
  const cleanChar = (rawChar || 'G').trim().charAt(0) || 'G';
  if (GLYPH_CATALOG[cleanChar]) {
    return GLYPH_CATALOG[cleanChar];
  }
  const upperFallback = cleanChar.toUpperCase();
  if (GLYPH_CATALOG[upperFallback]) {
    const base = GLYPH_CATALOG[upperFallback];
    const code = cleanChar.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
    return {
      ...base,
      char: cleanChar,
      unicode: `U+${code}`,
      name:
        cleanChar === cleanChar.toLowerCase()
          ? base.name.replace('CAPITAL', 'SMALL')
          : base.name,
    };
  }
  const codePoint = cleanChar.charCodeAt(0);
  const hex = codePoint.toString(16).toUpperCase().padStart(4, '0');
  return {
    char: cleanChar,
    unicode: `U+${hex}`,
    name: `GLYPH SPECIMEN CHARACTER '${cleanChar}'`,
    category: codePoint >= 48 && codePoint <= 57 ? 'Tabular Numeral / 1000 EM' : 'Parametric Latin Glyph',
    baseAdvanceWidth: 640,
    leftSidebearing: 50,
    rightSidebearing: 50,
    bezierNodes: 20,
    extremumPoints: 8,
    counterAperture: 'Calibrated Parametric Counter',
    constructionNote:
      'Constructed on the 1000-unit master grid with synchronized horizontal and vertical stem interpolation across all four variable axes.',
    nodeCoordinates: [
      { id: 'n1', x: 50, y: 15, label: '01 / NORTH EXTREMUM', type: 'extremum' },
      { id: 'n2', x: 22, y: 50, label: '02 / WEST CONTOUR NODE', type: 'on-curve' },
      { id: 'n3', x: 78, y: 50, label: '03 / EAST CONTOUR NODE', type: 'on-curve' },
      { id: 'n4', x: 50, y: 85, label: '04 / BASELINE ANCHOR', type: 'extremum' },
    ],
  };
}

export function computeLiveGlyphMetrics(
  rawChar: string,
  axes: VariableAxesState
): ComputedGlyphMetrics {
  const base = getGlyphAnatomy(rawChar);
  const widthFactor = axes.width / 100;
  const weightDelta = (axes.weight - 400) * 0.08;
  const effectiveAdvanceEm = Math.round(
    base.baseAdvanceWidth * widthFactor + weightDelta + axes.tracking
  );
  const effectiveLsb = Math.round(base.leftSidebearing * (0.85 + widthFactor * 0.15) + axes.tracking * 0.5);
  const effectiveRsb = Math.round(
    base.rightSidebearing * (0.85 + widthFactor * 0.15) + axes.tracking * 0.5
  );
  const stemWeightUnits = Math.round(38 + ((axes.weight - 100) / 800) * 142);
  const slantOffsetPx = Number((Math.tan((axes.slant * Math.PI) / 180) * 840).toFixed(1));

  return {
    ...base,
    effectiveAdvanceEm,
    effectiveLsb,
    effectiveRsb,
    stemWeightUnits,
    slantOffsetPx,
  };
}

export type LicenseTierId = 'desktop-web' | 'editorial-studio' | 'broadcast-kinetic' | 'enterprise-oem';

export interface LicenseTierSpec {
  id: LicenseTierId;
  code: string;
  name: string;
  subtitle: string;
  basePrice: number;
  formats: string[];
  includedAxes: string;
  rights: string[];
}

export const LICENSE_TIERS: LicenseTierSpec[] = [
  {
    id: 'desktop-web',
    code: 'LIC-01 // INDIE',
    name: 'Desktop & Web Starter',
    subtitle: 'For independent designers, small studios, and personal specimen publications.',
    basePrice: 49,
    formats: ['.WOFF2 Variable', '.OTF Static (18 Cuts)', '.TTF Variable'],
    includedAxes: 'wght (100–900) · wdth (50–150) · slnt (0–15°) · opsz (8–144)',
    rights: ['Up to 5 workstations', '100k monthly web pageviews', 'Unlimited print runs', 'Commercial client work'],
  },
  {
    id: 'editorial-studio',
    code: 'LIC-02 // STUDIO',
    name: 'Multi-Seat Editorial & Brand',
    subtitle: 'Full variable suite for agencies, architectural practices, and cultural institutions.',
    basePrice: 140,
    formats: ['.WOFF2 Variable', '.OTF Static (18 Cuts)', '.TTF Variable', 'Figma / Variable CSS Kit'],
    includedAxes: 'All 4 Primary Axes + Parametric Grade (GRAD)',
    rights: ['Up to 25 workstations', '1M monthly web pageviews', 'Packaging & environmental signage', 'App & EPUB embedding'],
  },
  {
    id: 'broadcast-kinetic',
    code: 'LIC-03 // KINETIC',
    name: 'Broadcast, Motion & Exhibition',
    subtitle: 'For title sequences, kinetic installations, museum projections, and generative software.',
    basePrice: 290,
    formats: ['.WOFF2', '.OTF', '.TTF', 'After Effects / Cavalry Rig', 'Raw SVG Contour Spec'],
    includedAxes: 'Full 12-Axis Parametric Master Access',
    rights: ['Unlimited motion seats', 'Worldwide broadcast & cinema', 'Hardware display & kiosk embedding', 'Priority foundry engineering support'],
  },
];

export function calculateLicenseQuote(
  tierId: LicenseTierId,
  seatMultiplierIndex: number, // 0 = 1x (1-5), 1 = 2x (6-25), 2 = 4x (26-100)
  includeAcademicDiscount: boolean
): {
  tier: LicenseTierSpec;
  subtotal: number;
  discountAmount: number;
  total: number;
  formattedTotal: string;
  seatLabel: string;
} {
  const tier = LICENSE_TIERS.find((t) => t.id === tierId) || LICENSE_TIERS[0];
  const multipliers = [1, 1.8, 3.2];
  const seatLabels = ['1–5 Seats / 100k Views', '6–25 Seats / 1M Views', '26–100 Seats / Unlimited'];
  const idx = clampAxis(seatMultiplierIndex, 0, 2);
  const subtotal = Math.round(tier.basePrice * multipliers[idx]);
  const discountAmount = includeAcademicDiscount ? Math.round(subtotal * 0.4) : 0;
  const total = Math.max(29, subtotal - discountAmount);

  return {
    tier,
    subtotal,
    discountAmount,
    total,
    formattedTotal: `$${total}`,
    seatLabel: seatLabels[idx],
  };
}

export function validateSpecimenEmail(rawEmail: string): {
  valid: boolean;
  error?: string;
  dispatchCode?: string;
} {
  const trimmed = rawEmail.trim();
  if (!trimmed) {
    return { valid: false, error: 'ENTER VALID EMAIL ADDRESS FOR SPECIMEN DISPATCH' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'INVALID ADDRESS SYNTAX — FORMAT: USER@DOMAIN.TLD' };
  }
  const hash = trimmed
    .split('')
    .reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) % 9000 + 1000, 1014);
  return {
    valid: true,
    dispatchCode: `SPEC-090-${hash}`,
  };
}
]]>
    </file>
    <file path="src/app/(glyphwork)/glyphwork/components/glyphwork/ApplicationsShowcase.tsx">
<![CDATA['use client';

import React from 'react';
import {
  VariableAxesState,
  buildFontVariationSettings,
  formatTrackingCss,
} from '../../utils/typographyLogic';

interface ApplicationsShowcaseProps {
  specimenText: string;
  axes: VariableAxesState;
  onApplyApplicationAxes: (axesPartial: Partial<VariableAxesState>, sampleWord?: string) => void;
}

export const ApplicationsShowcase: React.FC<ApplicationsShowcaseProps> = ({
  specimenText,
  axes,
  onApplyApplicationAxes,
}) => {
  const variationSettings = buildFontVariationSettings(axes);
  const trackingCss = formatTrackingCss(axes.tracking);

  return (
    <section
      id="applications"
      aria-label="Physical Typeface Applications Poster and Packaging"
      className="w-full lg:pr-[52px] bg-[#F7F7F0] text-[#111111] border-b border-[#111111]"
    >
      {/* Minimal Section Header */}
      <div className="px-5 sm:px-8 py-3.5 border-b border-[#111111] flex items-center justify-between gap-4 gw-mono text-[11px]">
        <span className="font-bold tracking-[0.04em]">04 // APPLICATIONS</span>
        <span className="text-[#111111]/65">PRINT &amp; ARCHIVAL EDITIONS</span>
      </div>

      {/* Asymmetric Two-Piece Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#111111]">
        {/* Left Composition (7 cols): Exhibition Poster */}
        <article className="lg:col-span-7 p-5 sm:p-8 lg:p-10 flex flex-col justify-between gap-5">
          <div className="relative w-full overflow-hidden border border-[#111111] bg-[#1C1B1A]">
            <img
              src="/templates/glyphwork/glyphwork/02-application-poster.webp"
              alt="A0 silkscreen poster mounted with steel clips on architectural concrete wall"
              referrerPolicy="no-referrer"
              className="w-full h-[480px] sm:h-[600px] object-cover object-center block"
            />

            {/* Minimal Live Variable Type Badge at Bottom-Left */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#F7F7F0]/95 border border-[#111111] px-4 py-2.5 pointer-events-none">
              <div
                className="text-[24px] sm:text-[32px] leading-none text-[#111111] uppercase truncate"
                style={{
                  fontFamily: 'var(--gw-font-specimen)',
                  fontVariationSettings: variationSettings,
                  letterSpacing: trackingCss,
                }}
              >
                {specimenText || 'GLYPHWORK'}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 gw-mono text-[11px]">
            <span>01. A0 Silkscreen Exhibition Poster</span>
            <button
              type="button"
              onClick={() =>
                onApplyApplicationAxes(
                  { weight: 860, width: 142, tracking: -12, slant: 5 },
                  'KUNSTHALLE'
                )
              }
              className="underline decoration-1 underline-offset-4 hover:text-[#F02F83] cursor-pointer whitespace-nowrap"
            >
              Apply Poster Axes ↗
            </button>
          </div>
        </article>

        {/* Right Composition (5 cols): Archival Packaging */}
        <article className="lg:col-span-5 p-5 sm:p-8 lg:p-10 flex flex-col justify-between gap-5">
          <div className="relative w-full overflow-hidden border border-[#111111] bg-[#E5E4DE]">
            <img
              src="/templates/glyphwork/glyphwork/03-application-packaging.webp"
              alt="Archival collector clamshell box and magenta-edged specimen sheets"
              referrerPolicy="no-referrer"
              className="w-full h-[480px] sm:h-[600px] object-cover object-center block"
            />

            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#F7F7F0]/95 border border-[#111111] px-4 py-2.5 pointer-events-none">
              <div
                className="text-[20px] sm:text-[26px] leading-none text-[#111111] truncate"
                style={{
                  fontFamily: 'var(--gw-font-specimen)',
                  fontVariationSettings: variationSettings,
                  letterSpacing: trackingCss,
                }}
              >
                {specimenText || 'GLYPHWORK'} — 090
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 gw-mono text-[11px]">
            <span>02. Archival Specimen Box Set</span>
            <button
              type="button"
              onClick={() =>
                onApplyApplicationAxes(
                  { weight: 520, width: 82, tracking: 14, slant: 0 },
                  'MONOGRAPH'
                )
              }
              className="underline decoration-1 underline-offset-4 hover:text-[#6E57D5] cursor-pointer whitespace-nowrap"
            >
              Apply Box Axes ↗
            </button>
          </div>
        </article>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(glyphwork)/glyphwork/components/glyphwork/FoundryInfo.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import {
  LICENSE_TIERS,
  LicenseTierId,
  VariableAxesState,
  buildFontVariationSettings,
  calculateLicenseQuote,
} from '../../utils/typographyLogic';

interface FoundryInfoProps {
  axes: VariableAxesState;
  onJumpToHeroLab: () => void;
}

export const FoundryInfo: React.FC<FoundryInfoProps> = ({
  axes,
  onJumpToHeroLab,
}) => {
  const [selectedTier, setSelectedTier] = useState<LicenseTierId>('desktop-web');
  const [seatIdx, setSeatIdx] = useState<number>(0);
  const [commissionedNote, setCommissionedNote] = useState<string | null>(null);

  const quote = calculateLicenseQuote(selectedTier, seatIdx, false);
  const variationSettings = buildFontVariationSettings(axes);

  return (
    <section
      id="foundry-licensing"
      aria-label="Foundry Manifesto and Licensing Specification"
      className="w-full lg:pr-[52px] bg-[#F7F7F0] text-[#111111] border-b border-[#111111]"
    >
      {/* Clean Section Header */}
      <div className="px-5 sm:px-8 py-3.5 border-b border-[#111111] flex items-center justify-between gap-4 gw-mono text-[11px]">
        <span className="font-bold tracking-[0.04em]">05 // FOUNDRY &amp; LICENSING</span>
        <span className="text-[#111111]/65">PERPETUAL LICENSE</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#111111]">
        {/* Left Column (5 cols): Concise Studio Statement */}
        <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between gap-8">
          <div className="space-y-4">
            <h2
              className="text-[32px] sm:text-[42px] leading-[0.98] text-[#111111]"
              style={{
                fontFamily: 'var(--gw-font-specimen)',
                fontVariationSettings: variationSettings,
              }}
            >
              Swiss precision engineered for live variable environments.
            </h2>
            <p className="gw-mono text-[12px] leading-relaxed text-[#111111]/75">
              Designed in Zürich on a 1000-unit master grid. Delivered in variable WOFF2, TTF, and 18 static OTF cuts.
            </p>
          </div>

          <div className="pt-4 border-t border-[#111111]/30 flex items-center justify-between gw-mono text-[11px]">
            <span>ZÜRICH · GENEVA</span>
            <button
              type="button"
              onClick={onJumpToHeroLab}
              className="underline decoration-1 underline-offset-4 hover:text-[#F02F83] cursor-pointer"
            >
              Back to Type Lab ↑
            </button>
          </div>
        </div>

        {/* Right Column (7 cols): Streamlined 3-Row Licensing Picker */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between gap-6">
          <div
            role="radiogroup"
            aria-label="License Tier Selection"
            className="border-t border-[#111111] divide-y divide-[#111111]"
          >
            {LICENSE_TIERS.map((tier) => {
              const isSelected = selectedTier === tier.id;
              return (
                <div
                  key={tier.id}
                  onClick={() => {
                    setSelectedTier(tier.id);
                    setCommissionedNote(null);
                  }}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedTier(tier.id);
                      setCommissionedNote(null);
                    }
                  }}
                  className={`py-4 px-4 transition-colors cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#E5F56B] text-[#111111]'
                      : 'bg-[#F7F7F0] text-[#111111] hover:bg-[#111111]/5'
                  }`}
                >
                  <div>
                    <div
                      className="text-[20px] sm:text-[22px] leading-tight font-semibold"
                      style={{
                        fontFamily: 'var(--gw-font-specimen)',
                        fontVariationSettings: "'wght' 700, 'wdth' 110, 'slnt' 0, 'opsz' 48",
                      }}
                    >
                      {tier.name}
                    </div>
                    <div className="gw-mono text-[11px] text-[#111111]/70 mt-0.5">
                      {tier.rights[0]} · {tier.rights[1]}
                    </div>
                  </div>

                  <div className="gw-mono text-[22px] font-bold shrink-0">
                    ${tier.basePrice}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Compact Seat Selector + Checkout Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div
              role="group"
              aria-label="Workstation Seat Tier"
              className="flex border border-[#111111] divide-x divide-[#111111] gw-mono text-[11px]"
            >
              {[
                { idx: 0, label: '1–5 Seats' },
                { idx: 1, label: '6–25 Seats' },
                { idx: 2, label: '26–100 Seats' },
              ].map((s) => (
                <button
                  key={s.idx}
                  type="button"
                  onClick={() => {
                    setSeatIdx(s.idx);
                    setCommissionedNote(null);
                  }}
                  aria-pressed={seatIdx === s.idx}
                  className={`py-2 px-3 cursor-pointer transition-colors whitespace-nowrap ${
                    seatIdx === s.idx
                      ? 'bg-[#111111] text-[#E5F56B] font-bold'
                      : 'bg-[#F7F7F0] text-[#111111] hover:bg-[#111111]/10'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="gw-mono text-[26px] font-bold">
                {quote.formattedTotal}
              </span>
              <button
                type="button"
                onClick={() =>
                  setCommissionedNote(
                    `License selected: ${quote.tier.name} (${quote.formattedTotal}) — Ready for download.`
                  )
                }
                className="px-5 py-2.5 bg-[#111111] text-[#F7F7F0] hover:bg-[#F02F83] gw-mono text-[12px] font-bold tracking-[0.04em] transition-colors cursor-pointer whitespace-nowrap"
              >
                Acquire License ↗
              </button>
            </div>
          </div>

          {commissionedNote && (
            <div
              role="status"
              className="p-3 border border-[#111111] bg-[#E5F56B] text-[#111111] gw-mono text-[11px]"
            >
              {commissionedNote}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(glyphwork)/glyphwork/components/glyphwork/GlyphInspector.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import {
  VariableAxesState,
  buildFontVariationSettings,
  computeLiveGlyphMetrics,
} from '../../utils/typographyLogic';

interface GlyphInspectorProps {
  selectedGlyph: string;
  axes: VariableAxesState;
  onSelectGlyph: (glyph: string) => void;
  onAxisChange: (axis: keyof VariableAxesState, value: number) => void;
}

const INSPECTOR_CHAR_SET = [
  'G', 'L', 'Y', 'P', 'H', 'W', 'O', 'R', 'K',
  'A', 'B', 'F', 'r', 'g', 'a', 'e', '0', '1',
];

export const GlyphInspector: React.FC<GlyphInspectorProps> = ({
  selectedGlyph,
  axes,
  onSelectGlyph,
}) => {
  const [showGuides, setShowGuides] = useState(true);

  const metrics = computeLiveGlyphMetrics(selectedGlyph, axes);
  const variationSettings = buildFontVariationSettings(axes);

  return (
    <section
      id="glyph-inspector"
      aria-label="Glyph Construction Microscope and Inspector"
      className="w-full lg:pr-[52px] bg-[#F7F7F0] text-[#111111] border-b border-[#111111]"
    >
      {/* Clean Section Header */}
      <div className="px-5 sm:px-8 py-3.5 border-b border-[#111111] flex items-center justify-between gap-4 gw-mono text-[11px]">
        <span className="font-bold tracking-[0.04em]">03 // GLYPH INSPECTOR</span>
        <button
          type="button"
          onClick={() => setShowGuides((v) => !v)}
          aria-pressed={showGuides}
          className={`px-2.5 py-0.5 border text-[11px] cursor-pointer transition-colors ${
            showGuides
              ? 'bg-[#111111] text-[#E5F56B] border-[#111111]'
              : 'bg-transparent text-[#111111] border-[#111111]/40'
          }`}
        >
          {showGuides ? '[×] Guides' : '[ ] Guides'}
        </button>
      </div>

      {/* Main 12-Column Microscope Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#111111]">
        {/* Left Column (7 cols): Giant Glyph Viewport */}
        <div className="lg:col-span-7 relative min-h-[420px] sm:min-h-[480px] flex items-center justify-center overflow-hidden p-6 bg-[#F7F7F0]">
          {showGuides && (
            <img
              src="/templates/glyphwork/glyphwork/glyph-specimen.svg"
              alt="Glyphwork technical specimen measurement grid overlay"
              referrerPolicy="no-referrer"
              className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover opacity-90"
            />
          )}

          {/* Giant Live HTML Variable Glyph with Clean Minimal Node Points */}
          <div className="relative z-10 flex items-center justify-center">
            <span
              data-testid="inspector-giant-glyph"
              className="select-none leading-none text-[#111111] block"
              style={{
                fontFamily: 'var(--gw-font-specimen)',
                fontVariationSettings: variationSettings,
                fontSize: 'clamp(15rem, 25vw, 23rem)',
                transform:
                  axes.slant > 10
                    ? `skewX(${-(axes.slant - 10).toFixed(1)}deg)`
                    : undefined,
              }}
            >
              {metrics.char}
            </span>

            {showGuides &&
              metrics.nodeCoordinates.map((node) => (
                <div
                  key={node.id}
                  aria-hidden="true"
                  className="pointer-events-none absolute z-20"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <span
                    className={`w-3 h-3 block border border-[#111111] ${
                      node.type === 'extremum'
                        ? 'bg-[#E5F56B]'
                        : node.type === 'off-curve'
                        ? 'bg-[#F02F83] rounded-full'
                        : 'bg-[#6E57D5] rounded-full'
                    }`}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Right Column (5 cols): Clean Character Selector + Concise Specs */}
        <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-[#111111]">
          {/* 18-Glyph Selector Grid */}
          <div className="p-6 sm:p-8">
            <div className="gw-mono text-[11px] text-[#111111]/60 mb-3">
              SELECT GLYPH
            </div>

            <div
              role="group"
              aria-label="Glyph Inspector Character Matrix"
              className="grid grid-cols-6 border-t border-l border-[#111111]"
            >
              {INSPECTOR_CHAR_SET.map((ch) => {
                const isSelected = metrics.char === ch;
                return (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => onSelectGlyph(ch)}
                    aria-label={`Inspect glyph ${ch}`}
                    aria-pressed={isSelected}
                    className={`h-12 border-r border-b border-[#111111] flex items-center justify-center text-[20px] transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#E5F56B] text-[#111111] font-bold'
                        : 'bg-[#F7F7F0] text-[#111111] hover:bg-[#111111] hover:text-[#F7F7F0]'
                    }`}
                    style={{
                      fontFamily: 'var(--gw-font-specimen)',
                      fontVariationSettings: variationSettings,
                    }}
                  >
                    {ch}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Concise Glyph Specs */}
          <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="gw-mono text-[11px] text-[#F02F83] font-semibold">
                {metrics.unicode}
              </div>
              <h3
                className="text-[28px] sm:text-[34px] leading-tight text-[#111111] mt-1"
                style={{
                  fontFamily: 'var(--gw-font-specimen)',
                  fontVariationSettings: "'wght' 740, 'wdth' 115, 'slnt' 0, 'opsz' 72",
                }}
              >
                {metrics.name}
              </h3>
            </div>

            <dl className="grid grid-cols-3 border-t border-[#111111] pt-4 gw-mono text-[11px] gap-4">
              <div>
                <dt className="text-[#111111]/55">ADVANCE</dt>
                <dd className="text-[16px] font-bold mt-0.5">{metrics.effectiveAdvanceEm} EM</dd>
              </div>
              <div>
                <dt className="text-[#111111]/55">BEARINGS</dt>
                <dd className="text-[16px] font-bold mt-0.5">
                  {metrics.effectiveLsb} / {metrics.effectiveRsb}
                </dd>
              </div>
              <div>
                <dt className="text-[#111111]/55">NODES</dt>
                <dd className="text-[16px] font-bold mt-0.5">{metrics.bezierNodes}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(glyphwork)/glyphwork/components/glyphwork/GlyphworkPage.tsx">
<![CDATA['use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  CaseMode,
  DEFAULT_SNAPSHOT,
  LabSnapshot,
  SPECIMEN_PRESETS,
  SpecimenMode,
  VariableAxesState,
  formatTrackingCss,
  popHistory,
  pushHistory,
} from '../../utils/typographyLogic';
import { ApplicationsShowcase } from './ApplicationsShowcase';
import { FoundryInfo } from './FoundryInfo';
import { GlyphInspector } from './GlyphInspector';
import { HeroTypeLab } from './HeroTypeLab';
import { NavSectionId, RightRailNav } from './RightRailNav';
import { SpecimenModes } from './SpecimenModes';
import { TerminalFooter } from './TerminalFooter';

export const GlyphworkPage: React.FC = () => {
  const [snapshot, setSnapshot] = useState<LabSnapshot>(() => ({
    ...DEFAULT_SNAPSHOT,
    axes: { ...DEFAULT_SNAPSHOT.axes },
  }));
  const [history, setHistory] = useState<LabSnapshot[]>([]);
  const [activeSection, setActiveSection] = useState<NavSectionId>('hero-lab');
  const [fontLoaded, setFontLoaded] = useState<boolean>(true);

  // Sync CSS custom properties on root element
  useEffect(() => {
    const root = document.documentElement;
    const { weight, width, slant, opticalSize, tracking } = snapshot.axes;
    const slntMapped = -Number(Math.min(10, Math.max(0, (slant / 15) * 10)).toFixed(2));
    root.style.setProperty('--gw-wght', String(Math.round(weight)));
    root.style.setProperty('--gw-wdth', String(Math.round(width)));
    root.style.setProperty('--gw-slnt', String(slntMapped));
    root.style.setProperty('--gw-opsz', String(Math.round(opticalSize)));
    root.style.setProperty('--gw-tracking', formatTrackingCss(tracking));
  }, [snapshot.axes]);

  // Verify variable font loading with graceful fallback
  useEffect(() => {
    let mounted = true;
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts
        .load("720 16px 'GlyphworkVariable'")
        .then((loadedFaces) => {
          if (mounted) {
            setFontLoaded(loadedFaces.length > 0 || document.fonts.check("16px 'GlyphworkVariable'"));
          }
        })
        .catch(() => {
          if (mounted) setFontLoaded(false);
        });
    }
    return () => {
      mounted = false;
    };
  }, []);

  // Track active section in RightRailNav via IntersectionObserver
  useEffect(() => {
    const sectionIds: NavSectionId[] = [
      'hero-lab',
      'specimen-modes',
      'glyph-inspector',
      'applications',
      'foundry-licensing',
      'terminal-footer',
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as NavSectionId);
          }
        });
      },
      { threshold: 0.28 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const updateWithHistory = useCallback(
    (updater: (prev: LabSnapshot) => LabSnapshot) => {
      setSnapshot((prev) => {
        const next = updater(prev);
        setHistory((h) => pushHistory(h, prev));
        return next;
      });
    },
    []
  );

  const handleUndo = useCallback(() => {
    setHistory((prevHistory) => {
      if (prevHistory.length === 0) return prevHistory;
      const { restored, nextHistory } = popHistory(prevHistory, snapshot);
      setSnapshot(restored);
      return nextHistory;
    });
  }, [snapshot]);

  const handleReset = useCallback(() => {
    updateWithHistory(() => ({
      ...DEFAULT_SNAPSHOT,
      axes: { ...DEFAULT_SNAPSHOT.axes },
    }));
  }, [updateWithHistory]);

  // Keyboard shortcuts for Undo (Ctrl/Cmd+Z) and Reset (Alt+R)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        const tag = (e.target as HTMLElement | null)?.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
          e.preventDefault();
          handleUndo();
        }
      } else if (e.altKey && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        handleReset();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleUndo, handleReset]);

  const handleAxisChange = useCallback(
    (axis: keyof VariableAxesState, value: number) => {
      updateWithHistory((prev) => ({
        ...prev,
        axes: {
          ...prev.axes,
          [axis]: value,
        },
      }));
    },
    [updateWithHistory]
  );

  const handleModeChange = useCallback(
    (mode: SpecimenMode) => {
      updateWithHistory((prev) => ({
        ...prev,
        mode,
      }));
    },
    [updateWithHistory]
  );

  const handleCaseModeChange = useCallback(
    (caseMode: CaseMode) => {
      updateWithHistory((prev) => ({
        ...prev,
        caseMode,
      }));
    },
    [updateWithHistory]
  );

  const handleTextChange = useCallback(
    (newText: string) => {
      updateWithHistory((prev) => ({
        ...prev,
        text: newText,
      }));
    },
    [updateWithHistory]
  );

  const handleHeadlineChange = useCallback(
    (newHeadline: string) => {
      updateWithHistory((prev) => ({
        ...prev,
        headlineText: newHeadline,
      }));
    },
    [updateWithHistory]
  );

  const handleParagraphChange = useCallback(
    (newParagraph: string) => {
      updateWithHistory((prev) => ({
        ...prev,
        paragraphText: newParagraph,
      }));
    },
    [updateWithHistory]
  );

  const scrollToSection = useCallback((sectionId: NavSectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSelectGlyph = useCallback(
    (glyph: string, scrollToInspector = false) => {
      updateWithHistory((prev) => ({
        ...prev,
        selectedGlyph: glyph,
      }));
      if (scrollToInspector) {
        scrollToSection('glyph-inspector');
      }
    },
    [updateWithHistory, scrollToSection]
  );

  const handleApplyPreset = useCallback(
    (presetId: string) => {
      const preset = SPECIMEN_PRESETS.find((p) => p.id === presetId);
      if (!preset) return;
      updateWithHistory((prev) => ({
        ...prev,
        mode: preset.mode,
        text: preset.word,
        headlineText: preset.headline,
        paragraphText: preset.paragraph,
        axes: {
          ...prev.axes,
          ...preset.axesPartial,
        },
      }));
    },
    [updateWithHistory]
  );

  const handleApplyApplicationAxes = useCallback(
    (axesPartial: Partial<VariableAxesState>, sampleWord?: string) => {
      updateWithHistory((prev) => ({
        ...prev,
        text: sampleWord || prev.text,
        axes: {
          ...prev.axes,
          ...axesPartial,
        },
      }));
      scrollToSection('hero-lab');
    },
    [updateWithHistory, scrollToSection]
  );

  return (
    <div className="min-h-screen w-full bg-[#F7F7F0] text-[#111111] relative">
      {/* Right Fixed Vertical Instrument Rail */}
      <RightRailNav
        activeSection={activeSection}
        selectedGlyph={snapshot.selectedGlyph}
        onSelectSection={scrollToSection}
        onSelectGlyphChip={(glyph) => handleSelectGlyph(glyph, true)}
      />

      {/* Main Sequential Typographic Instrument Canvas */}
      <main>
        {/* SECTION 1 — HERO / LIVE SPECIMEN LAB */}
        <HeroTypeLab
          text={snapshot.text}
          headlineText={snapshot.headlineText}
          paragraphText={snapshot.paragraphText}
          mode={snapshot.mode}
          caseMode={snapshot.caseMode}
          axes={snapshot.axes}
          selectedGlyph={snapshot.selectedGlyph}
          canUndo={history.length > 0}
          fontLoaded={fontLoaded}
          onTextChange={handleTextChange}
          onHeadlineChange={handleHeadlineChange}
          onParagraphChange={handleParagraphChange}
          onAxisChange={handleAxisChange}
          onModeChange={handleModeChange}
          onSelectGlyph={handleSelectGlyph}
          onUndo={handleUndo}
          onReset={handleReset}
          onNavigateLicensing={() => scrollToSection('foundry-licensing')}
        />

        {/* SECTION 2 — SPECIMEN MODES / TYPE TEST AREA */}
        <SpecimenModes
          text={snapshot.text}
          headlineText={snapshot.headlineText}
          paragraphText={snapshot.paragraphText}
          mode={snapshot.mode}
          caseMode={snapshot.caseMode}
          axes={snapshot.axes}
          onModeChange={handleModeChange}
          onCaseModeChange={handleCaseModeChange}
          onTextChange={handleTextChange}
          onHeadlineChange={handleHeadlineChange}
          onParagraphChange={handleParagraphChange}
          onAxisChange={handleAxisChange}
          onApplyPreset={handleApplyPreset}
          onSelectGlyph={handleSelectGlyph}
        />

        {/* SECTION 3 — GLYPH INSPECTOR */}
        <GlyphInspector
          selectedGlyph={snapshot.selectedGlyph}
          axes={snapshot.axes}
          onSelectGlyph={(glyph) => handleSelectGlyph(glyph, false)}
          onAxisChange={handleAxisChange}
        />

        {/* SECTION 4 — APPLICATIONS / POSTER + PACKAGING */}
        <ApplicationsShowcase
          specimenText={snapshot.text}
          axes={snapshot.axes}
          onApplyApplicationAxes={handleApplyApplicationAxes}
        />

        {/* SECTION 5 — FOUNDRY / LICENSING / ABOUT */}
        <FoundryInfo
          axes={snapshot.axes}
          onJumpToHeroLab={() => scrollToSection('hero-lab')}
        />
      </main>

      {/* SECTION 6 — FOOTER / TERMINAL SPECIMEN */}
      <TerminalFooter
        axes={snapshot.axes}
        onJumpToHeroLab={() => scrollToSection('hero-lab')}
        onSelectGlyph={handleSelectGlyph}
      />
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(glyphwork)/glyphwork/components/glyphwork/HeroTypeLab.tsx">
<![CDATA['use client';

import React, { useRef } from 'react';
import {
  CaseMode,
  SpecimenMode,
  VariableAxesState,
  applyCaseTransform,
  buildFontVariationSettings,
  computeGuideMetrics,
  formatTrackingCss,
} from '../../utils/typographyLogic';
import { VariableControls } from './VariableControls';

interface HeroTypeLabProps {
  text: string;
  headlineText: string;
  paragraphText: string;
  mode: SpecimenMode;
  caseMode: CaseMode;
  axes: VariableAxesState;
  selectedGlyph: string;
  canUndo: boolean;
  fontLoaded: boolean;
  onTextChange: (newText: string) => void;
  onHeadlineChange: (newHeadline: string) => void;
  onParagraphChange: (newParagraph: string) => void;
  onAxisChange: (axis: keyof VariableAxesState, value: number) => void;
  onModeChange: (mode: SpecimenMode) => void;
  onSelectGlyph: (glyph: string, scrollToInspector?: boolean) => void;
  onUndo: () => void;
  onReset: () => void;
  onNavigateLicensing: () => void;
}

const CrosshairMark: React.FC<{ filled?: boolean; className?: string }> = ({
  filled = false,
  className = '',
}) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    aria-hidden="true"
    className={`pointer-events-none select-none ${className}`}
  >
    <circle cx="11" cy="11" r="7" stroke="#111111" strokeWidth="1.2" />
    {filled && <circle cx="11" cy="11" r="3.5" fill="#111111" />}
    <line x1="11" y1="0" x2="11" y2="22" stroke="#111111" strokeWidth="1" />
    <line x1="0" y1="11" x2="22" y2="11" stroke="#111111" strokeWidth="1" />
  </svg>
);

export const HeroTypeLab: React.FC<HeroTypeLabProps> = ({
  text,
  headlineText,
  paragraphText,
  mode,
  caseMode,
  axes,
  canUndo,
  onTextChange,
  onHeadlineChange,
  onParagraphChange,
  onAxisChange,
  onModeChange,
  onUndo,
  onReset,
  onNavigateLicensing,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const displayString = applyCaseTransform(text || 'GLYPHWORK', caseMode);
  const guideMetrics = computeGuideMetrics(axes, displayString.length);
  const variationSettings = buildFontVariationSettings(axes);
  const trackingCss = formatTrackingCss(axes.tracking);

  const charCount = Math.max(4, displayString.length);
  const dynamicVw = Math.min(
    13.2,
    (116 / charCount) * (112 / Math.max(70, axes.width))
  );

  const handleFocusSpecimen = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  };

  return (
    <section
      id="hero-lab"
      aria-label="Hero Live Specimen Laboratory"
      className="relative min-h-screen w-full lg:pr-[52px] flex flex-col justify-between bg-[#F7F7F0] text-[#111111] border-b border-[#111111] overflow-hidden"
    >
      {/* Top Row: Upper-left GLYPHWORK Foundry Stamp */}
      <div className="w-full px-5 sm:px-8 pt-5 sm:pt-6 flex items-start justify-between gap-4 z-20">
        <div className="flex items-center gap-3.5 flex-wrap">
          <div className="relative border border-[#111111] px-2.5 py-1 bg-[#F7F7F0]">
            <span
              aria-hidden="true"
              className="absolute -top-[3px] -left-[3px] w-[5px] h-[5px] bg-[#111111]"
            />
            <span
              aria-hidden="true"
              className="absolute -top-[3px] -right-[3px] w-[5px] h-[5px] bg-[#111111]"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-[3px] -left-[3px] w-[5px] h-[5px] bg-[#111111]"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-[3px] -right-[3px] w-[5px] h-[5px] bg-[#111111]"
            />
            <span
              className="block text-[24px] sm:text-[28px] leading-none tracking-[-0.02em] text-[#111111] select-none"
              style={{
                fontFamily: 'var(--gw-font-specimen)',
                fontVariationSettings: "'wght' 760, 'wdth' 62, 'slnt' 0, 'opsz' 144",
              }}
            >
              GLYPHWORK
            </span>
          </div>

          <div className="gw-mono text-[11px] sm:text-[12px] leading-[1.35] tracking-[0.03em] text-[#111111]">
            <div>INDIE TYPE FOUNDRY [EST 2024]</div>
            <div>OPENLANDING COLLECTION 090</div>
          </div>
        </div>
      </div>

      {/* Center Stage: Full-Viewport Giant Editable Variable Specimen + Guide Rails */}
      <div className="relative flex-1 flex flex-col justify-center my-2 sm:my-4 py-4 sm:py-6">
        <div className="relative w-full pt-12 pb-8 sm:pt-16 sm:pb-10">
          {/* CAP-HEIGHT GUIDE LINE (#F02F83) */}
          <div
            aria-hidden="true"
            className="gw-animate-guide pointer-events-none absolute left-0 right-0 h-[1.5px] bg-[#F02F83] z-20 transition-all duration-150 flex items-center justify-between px-5 sm:px-8"
            style={{ top: '18%' }}
          >
            <span className="gw-mono text-[11px] sm:text-[12px] text-[#F02F83] font-medium bg-[#F7F7F0]/90 pr-2 -translate-y-3.5">
              {guideMetrics.capHeightLabel}
            </span>
            <span className="hidden sm:inline gw-mono text-[11px] text-[#111111]/80 bg-[#F7F7F0]/90 px-2 -translate-y-3.5">
              {guideMetrics.coordinateReadout}
            </span>
            <div className="flex items-center gap-2 bg-[#F7F7F0]/90 pl-2 -translate-y-4 pointer-events-auto">
              <button
                type="button"
                onClick={handleFocusSpecimen}
                className="gw-mono text-[11px] text-[#111111] hover:text-[#F02F83] transition-colors cursor-pointer"
              >
                [EDITABLE TEST STRING]
              </button>
              <CrosshairMark filled />
            </div>
          </div>

          {/* X-HEIGHT GUIDE LINE (#6E57D5) */}
          <div
            aria-hidden="true"
            className="gw-animate-guide pointer-events-none absolute left-0 right-0 h-[1.5px] bg-[#6E57D5] z-20 transition-all duration-150"
            style={{ top: '40%' }}
          >
            <span className="gw-mono text-[11px] sm:text-[12px] text-[#6E57D5] bg-[#F7F7F0]/90 px-1.5 ml-5 sm:ml-8 -translate-y-4 inline-block">
              {guideMetrics.xHeightLabel}
            </span>
          </div>

          {/* BASELINE GUIDE LINE (#6E57D5) */}
          <div
            aria-hidden="true"
            className="gw-animate-guide pointer-events-none absolute left-0 right-0 h-[1.5px] bg-[#6E57D5] z-20 transition-all duration-150"
            style={{ top: '74%' }}
          >
            <span className="gw-mono text-[11px] sm:text-[12px] text-[#6E57D5] bg-[#F7F7F0]/90 px-1.5 ml-5 sm:ml-8 -translate-y-4 inline-block">
              {guideMetrics.baselineLabel}
            </span>
          </div>

          {/* Left & Right Vertical Bounding Dotted Lines */}
          <div
            aria-hidden="true"
            className="pointer-events-none hidden sm:block absolute top-[12%] bottom-[16%] left-[8.5%] border-l border-dashed border-[#111111]/45 z-10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none hidden sm:block absolute top-[12%] bottom-[16%] right-[5.5%] border-r border-dashed border-[#111111]/45 z-10"
          />

          {/* Subtle Node Callouts & Crosshairs matching header-reference.webp */}
          <div
            aria-hidden="true"
            className="pointer-events-none hidden lg:flex items-center gap-1 absolute left-[17%] top-[45%] z-20 gw-mono text-[10px] text-[#111111]"
          >
            <span>nodes</span>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none hidden lg:flex items-center gap-1 absolute left-[38%] top-[57%] z-20 gw-mono text-[10px] text-[#111111]"
          >
            <span>nodes</span>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none hidden lg:flex items-center gap-1 absolute left-[68.5%] bottom-[21%] z-20 gw-mono text-[10px] text-[#111111]"
          >
            <span>nodes</span>
          </div>

          <CrosshairMark className="hidden md:block absolute left-[6.2%] top-[47%]" />
          <CrosshairMark className="hidden md:block absolute right-[3.2%] top-[47%]" />

          {/* LIVE EDITABLE SPECIMEN STAGE */}
          <div className="gw-animate-hero relative z-10 w-full px-4 sm:px-10 flex items-center justify-center">
            {mode === 'display' && (
              <div className="w-full flex items-center justify-center py-6 sm:py-10">
                <label htmlFor="gw-hero-specimen-input" className="sr-only">
                  Editable Display Specimen String
                </label>
                <input
                  ref={inputRef}
                  id="gw-hero-specimen-input"
                  type="text"
                  value={displayString}
                  aria-label="Editable Display Specimen String"
                  spellCheck={false}
                  autoComplete="off"
                  onChange={(e) => onTextChange(e.target.value)}
                  className="w-full text-center bg-transparent border-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F02F83]/60 text-[#111111] p-0 m-0 leading-[0.82] selection:bg-[#E5F56B] selection:text-[#111111]"
                  style={{
                    fontFamily: 'var(--gw-font-specimen)',
                    fontVariationSettings: variationSettings,
                    letterSpacing: trackingCss,
                    fontSize: `clamp(2.35rem, ${dynamicVw.toFixed(2)}vw, 12.6rem)`,
                    transform: `scaleY(1.64)${
                      axes.slant > 10
                        ? ` skewX(${-(axes.slant - 10).toFixed(1)}deg)`
                        : ''
                    }`,
                    transformOrigin: 'center center',
                  }}
                />
              </div>
            )}

            {mode === 'headline' && (
              <div className="w-full max-w-[1240px] mx-auto py-6">
                <label htmlFor="gw-hero-headline-input" className="sr-only">
                  Editable Headline Specimen Text
                </label>
                <textarea
                  id="gw-hero-headline-input"
                  rows={2}
                  value={applyCaseTransform(headlineText, caseMode)}
                  aria-label="Editable Headline Specimen Text"
                  spellCheck={false}
                  onChange={(e) => onHeadlineChange(e.target.value)}
                  className="w-full bg-transparent border-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F02F83]/60 text-[#111111] resize-none leading-[1.02] text-left"
                  style={{
                    fontFamily: 'var(--gw-font-specimen)',
                    fontVariationSettings: variationSettings,
                    letterSpacing: trackingCss,
                    fontSize: 'clamp(2.25rem, 4.8vw, 4.75rem)',
                  }}
                />
              </div>
            )}

            {mode === 'paragraph' && (
              <div className="w-full max-w-[1040px] mx-auto py-6">
                <label htmlFor="gw-hero-paragraph-input" className="sr-only">
                  Editable Paragraph Specimen Text
                </label>
                <textarea
                  id="gw-hero-paragraph-input"
                  rows={3}
                  value={applyCaseTransform(paragraphText, caseMode)}
                  aria-label="Editable Paragraph Specimen Text"
                  spellCheck={false}
                  onChange={(e) => onParagraphChange(e.target.value)}
                  className="w-full bg-transparent border-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F02F83]/60 text-[#111111] resize-none leading-[1.45]"
                  style={{
                    fontFamily: 'var(--gw-font-specimen)',
                    fontVariationSettings: variationSettings,
                    letterSpacing: trackingCss,
                    fontSize: 'clamp(1.25rem, 2.2vw, 2rem)',
                  }}
                />
              </div>
            )}
          </div>

          {/* Minimal Coordinate Marks below Baseline matching header-reference.webp */}
          <div className="w-full px-5 sm:px-8 mt-3 flex items-center justify-between gw-mono text-[11px]">
            <CrosshairMark filled />
            <CrosshairMark className="hidden sm:block" />
            <div className="flex items-center gap-3">
              <span className="text-[#111111]/85">{guideMetrics.coordinateReadout}</span>
              <CrosshairMark filled />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Row + Compact Mode/Undo/Reset + 4-Cell Instrument Strip */}
      <div className="w-full z-20">
        <div className="px-5 sm:px-8 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 gw-mono">
            <div>
              <button
                type="button"
                onClick={handleFocusSpecimen}
                className="text-[13px] sm:text-[15px] font-medium tracking-[0.04em] text-[#111111] hover:text-[#F02F83] transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap"
              >
                <span>TRY THE TYPEFACE</span>
                <span aria-hidden="true">———</span>
                <span className="underline decoration-1 underline-offset-4">
                  [ CLICK TO TEST RUN ] ↗
                </span>
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={onNavigateLicensing}
                className="text-[13px] sm:text-[15px] font-medium tracking-[0.04em] text-[#111111] hover:text-[#6E57D5] transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>LICENSING FROM $49</span>
                <span aria-hidden="true">↘</span>
              </button>
            </div>
          </div>

          {/* Quiet Inline Mode + Undo/Reset Controls */}
          <div className="flex items-center gap-2 flex-wrap gw-mono text-[11px]">
            {(
              [
                { id: 'display', label: 'Display' },
                { id: 'headline', label: 'Headline' },
                { id: 'paragraph', label: 'Paragraph' },
              ] as Array<{ id: SpecimenMode; label: string }>
            ).map((item) => {
              const active = mode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onModeChange(item.id)}
                  aria-pressed={active}
                  className={`px-2.5 py-1 border transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#111111] text-[#E5F56B] border-[#111111] font-semibold'
                      : 'bg-transparent text-[#111111] border-[#111111]/30 hover:border-[#111111]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <span aria-hidden="true" className="text-[#111111]/30 mx-0.5">
              ·
            </span>

            <button
              type="button"
              onClick={onUndo}
              disabled={!canUndo}
              aria-label="Undo last specimen or axis change"
              className={`px-2.5 py-1 border transition-colors whitespace-nowrap ${
                canUndo
                  ? 'border-[#111111] text-[#111111] hover:bg-[#E5F56B] cursor-pointer'
                  : 'border-[#111111]/20 text-[#111111]/35 cursor-not-allowed'
              }`}
            >
              Undo
            </button>
            <button
              type="button"
              onClick={onReset}
              aria-label="Reset all variable font axes and specimen string"
              className="px-2.5 py-1 border border-[#111111] text-[#111111] hover:bg-[#F02F83] hover:text-[#F7F7F0] hover:border-[#F02F83] transition-colors cursor-pointer whitespace-nowrap"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Full-Width Bottom 4-Slider Instrument Strip */}
        <VariableControls axes={axes} onAxisChange={onAxisChange} />
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(glyphwork)/glyphwork/components/glyphwork/RightRailNav.tsx">
<![CDATA['use client';

import React from 'react';

export type NavSectionId =
  | 'hero-lab'
  | 'specimen-modes'
  | 'glyph-inspector'
  | 'applications'
  | 'foundry-licensing'
  | 'terminal-footer';

interface RightRailNavProps {
  activeSection: NavSectionId;
  selectedGlyph: string;
  onSelectSection: (sectionId: NavSectionId) => void;
  onSelectGlyphChip: (glyph: string) => void;
}

const RAIL_GLYPH_CHIPS = ['F', 'r', 'A', 'B', 'K'];

export const RightRailNav: React.FC<RightRailNavProps> = ({
  activeSection,
  selectedGlyph,
  onSelectSection,
  onSelectGlyphChip,
}) => {
  return (
    <>
      {/* Desktop Fixed Right Vertical Instrument Rail */}
      <aside
        aria-label="Typographic Instrument Rail Navigation"
        className="hidden lg:flex fixed top-0 right-0 bottom-0 w-[52px] bg-[#F7F7F0] border-l border-[#111111] z-40 select-none flex-row"
      >
        {/* Left Track: Vertical Section Labels & Glyph Chips */}
        <nav
          aria-label="Primary Sections and Specimen Chips"
          className="w-[34px] h-full flex flex-col justify-between border-r border-[#111111]/40 text-[#111111]"
        >
          {/* 01/SPECIMENS */}
          <button
            type="button"
            onClick={() => onSelectSection('hero-lab')}
            aria-label="Navigate to 01 Specimens Hero Lab"
            aria-current={activeSection === 'hero-lab' ? 'location' : undefined}
            className={`w-full flex-1 flex items-center justify-center border-b border-[#111111]/40 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F02F83] ${
              activeSection === 'hero-lab'
                ? 'bg-[#E5F56B] text-[#111111] font-semibold'
                : 'hover:bg-[#111111]/5'
            }`}
          >
            <span className="gw-mono gw-vertical-rl text-[11px] tracking-[0.08em] whitespace-nowrap">
              01/SPECIMENS
            </span>
          </button>

          {/* 02/VARIABLE */}
          <button
            type="button"
            onClick={() => onSelectSection('specimen-modes')}
            aria-label="Navigate to 02 Variable Modes"
            aria-current={
              activeSection === 'specimen-modes' || activeSection === 'glyph-inspector'
                ? 'location'
                : undefined
            }
            className={`w-full flex-1 flex items-center justify-center border-b border-[#111111]/40 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F02F83] ${
              activeSection === 'specimen-modes' || activeSection === 'glyph-inspector'
                ? 'bg-[#F02F83] text-[#F7F7F0] font-semibold'
                : 'hover:bg-[#111111]/5'
            }`}
          >
            <span className="gw-mono gw-vertical-rl text-[11px] tracking-[0.08em] whitespace-nowrap">
              02/VARIABLE
            </span>
          </button>

          {/* Single Glyph Chip F */}
          <button
            type="button"
            onClick={() => onSelectGlyphChip('F')}
            aria-label="Inspect glyph F in Glyph Microscope"
            className={`w-full h-[38px] flex items-center justify-center border-b border-[#111111]/40 text-[16px] font-bold transition-colors cursor-pointer ${
              selectedGlyph === 'F'
                ? 'bg-[#E5F56B] text-[#111111]'
                : 'bg-[#F7F7F0] text-[#111111] hover:bg-[#E5F56B]/60'
            }`}
          >
            F
          </button>

          {/* 03/FOUNDRY */}
          <button
            type="button"
            onClick={() => onSelectSection('applications')}
            aria-label="Navigate to 03 Foundry Applications"
            aria-current={activeSection === 'applications' ? 'location' : undefined}
            className={`w-full flex-1 flex items-center justify-center border-b border-[#111111]/40 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F02F83] ${
              activeSection === 'applications'
                ? 'bg-[#6E57D5] text-[#F7F7F0] font-semibold'
                : 'hover:bg-[#111111]/5'
            }`}
          >
            <span className="gw-mono gw-vertical-rl text-[11px] tracking-[0.08em] whitespace-nowrap">
              03/FOUNDRY
            </span>
          </button>

          {/* Glyph Specimen Chips r, A, B, K */}
          <div className="flex flex-col border-b border-[#111111]/40">
            {RAIL_GLYPH_CHIPS.slice(1).map((chip) => {
              const isSelected = selectedGlyph === chip;
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => onSelectGlyphChip(chip)}
                  aria-label={`Inspect glyph ${chip} in Glyph Microscope`}
                  className={`w-full h-[34px] flex items-center justify-center border-b last:border-b-0 border-[#111111]/30 text-[15px] font-bold transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#E5F56B] text-[#111111]'
                      : chip === 'r'
                      ? 'bg-[#111111]/10 text-[#111111] hover:bg-[#E5F56B]/70'
                      : 'bg-[#F7F7F0] text-[#111111] hover:bg-[#E5F56B]/70'
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>

          {/* 04/LICENSING */}
          <button
            type="button"
            onClick={() => onSelectSection('foundry-licensing')}
            aria-label="Navigate to 04 Licensing and Terminal"
            aria-current={
              activeSection === 'foundry-licensing' || activeSection === 'terminal-footer'
                ? 'location'
                : undefined
            }
            className={`w-full flex-1 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F02F83] ${
              activeSection === 'foundry-licensing' || activeSection === 'terminal-footer'
                ? 'bg-[#E5F56B] text-[#111111] font-semibold'
                : 'hover:bg-[#111111]/5'
            }`}
          >
            <span className="gw-mono gw-vertical-rl text-[11px] tracking-[0.08em] whitespace-nowrap">
              04/LICENSING
            </span>
          </button>
        </nav>

        {/* Right Track: Continuous Precision Millimeter Ruler Ticks */}
        <div
          aria-hidden="true"
          className="w-[18px] h-full flex flex-col justify-between py-1 bg-[#F7F7F0] overflow-hidden"
        >
          {Array.from({ length: 96 }).map((_, idx) => {
            const isMajor = idx % 5 === 0;
            return (
              <div key={idx} className="w-full flex justify-end items-center pr-0.5">
                <span
                  className={`block bg-[#111111] ${
                    isMajor ? 'w-[11px] h-[1.5px]' : 'w-[6px] h-[1px] opacity-75'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </aside>

      {/* Mobile / Tablet Compact Instrument Strip (<= 44px height, respecting 15% sticky cap) */}
      <header
        aria-label="Mobile Instrument Section Bar"
        className="lg:hidden sticky top-0 left-0 right-0 h-10 bg-[#F7F7F0]/95 backdrop-blur-xs border-b border-[#111111] z-40 flex items-center justify-between px-3"
      >
        <button
          type="button"
          onClick={() => onSelectSection('hero-lab')}
          className="gw-mono text-[11px] font-bold tracking-tight border border-[#111111] px-1.5 py-0.5 bg-[#F7F7F0] text-[#111111] whitespace-nowrap shrink-0"
        >
          GLYPHWORK
        </button>

        <nav
          aria-label="Mobile Section Links"
          className="flex items-center gap-1 overflow-x-auto no-scrollbar"
        >
          {[
            { id: 'hero-lab' as NavSectionId, label: '01/LAB' },
            { id: 'specimen-modes' as NavSectionId, label: '02/MODES' },
            { id: 'glyph-inspector' as NavSectionId, label: '03/GLYPH' },
            { id: 'foundry-licensing' as NavSectionId, label: '04/LICENSE' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectSection(item.id)}
              className={`gw-mono text-[10px] px-2 py-1 whitespace-nowrap shrink-0 transition-colors ${
                activeSection === item.id
                  ? 'bg-[#111111] text-[#E5F56B] font-semibold'
                  : 'text-[#111111] hover:bg-[#111111]/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>
    </>
  );
};
]]>
    </file>
    <file path="src/app/(glyphwork)/glyphwork/components/glyphwork/SpecimenModes.tsx">
<![CDATA['use client';

import React from 'react';
import {
  CaseMode,
  SPECIMEN_PRESETS,
  SpecimenMode,
  VariableAxesState,
  applyCaseTransform,
  buildFontVariationSettings,
  formatTrackingCss,
} from '../../utils/typographyLogic';

interface SpecimenModesProps {
  text: string;
  headlineText: string;
  paragraphText: string;
  mode: SpecimenMode;
  caseMode: CaseMode;
  axes: VariableAxesState;
  onModeChange: (mode: SpecimenMode) => void;
  onCaseModeChange: (caseMode: CaseMode) => void;
  onTextChange: (newText: string) => void;
  onHeadlineChange: (newHeadline: string) => void;
  onParagraphChange: (newParagraph: string) => void;
  onAxisChange: (axis: keyof VariableAxesState, value: number) => void;
  onApplyPreset: (presetId: string) => void;
  onSelectGlyph: (glyph: string, scrollToInspector?: boolean) => void;
}

const WATERFALL_CUTS = [
  { label: '150 · Condensed', wght: 150, wdth: 65, slnt: 0, sample: 'Archival Typometry 1968–2026' },
  { label: '500 · Extended', wght: 500, wdth: 132, slnt: 4, sample: 'Swiss Grid & Parametric Interpolation' },
  { label: '900 · Ultra Display', wght: 900, wdth: 148, slnt: 0, sample: 'GLYPHWORK SPECIMEN 090' },
];

export const SpecimenModes: React.FC<SpecimenModesProps> = ({
  text,
  headlineText,
  paragraphText,
  mode,
  caseMode,
  axes,
  onModeChange,
  onCaseModeChange,
  onTextChange,
  onHeadlineChange,
  onParagraphChange,
  onAxisChange,
  onApplyPreset,
}) => {
  const variationSettings = buildFontVariationSettings(axes);
  const trackingCss = formatTrackingCss(axes.tracking);

  return (
    <section
      id="specimen-modes"
      aria-label="Specimen Modes and Type Testing Environment"
      className="w-full lg:pr-[52px] bg-[#F7F7F0] text-[#111111] border-b border-[#111111]"
    >
      {/* Single Clean Control Bar */}
      <div className="px-5 sm:px-8 py-3.5 border-b border-[#111111] flex flex-wrap items-center justify-between gap-4 gw-mono text-[11px]">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-bold tracking-[0.04em]">02 // TYPE TESTER</span>

          <div
            role="group"
            aria-label="Specimen Mode Selector"
            className="flex border border-[#111111] divide-x divide-[#111111]"
          >
            {(
              [
                { id: 'display', label: 'Display' },
                { id: 'headline', label: 'Headline' },
                { id: 'paragraph', label: 'Paragraph' },
              ] as Array<{ id: SpecimenMode; label: string }>
            ).map((item) => {
              const active = mode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onModeChange(item.id)}
                  aria-pressed={active}
                  className={`py-1 px-3 transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#F02F83] text-[#F7F7F0] font-semibold'
                      : 'bg-[#F7F7F0] text-[#111111] hover:bg-[#111111]/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div
            role="group"
            aria-label="Case Mode Selector"
            className="flex border border-[#111111] divide-x divide-[#111111]"
          >
            {(
              [
                { id: 'preserve', label: 'Aa' },
                { id: 'upper', label: 'AA' },
                { id: 'lower', label: 'aa' },
              ] as Array<{ id: CaseMode; label: string }>
            ).map((c) => {
              const active = caseMode === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onCaseModeChange(c.id)}
                  aria-pressed={active}
                  aria-label={`Set case mode to ${c.id}`}
                  className={`px-2.5 py-1 cursor-pointer transition-colors ${
                    active
                      ? 'bg-[#E5F56B] text-[#111111] font-bold'
                      : 'bg-[#F7F7F0] text-[#111111] hover:bg-[#111111]/5'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {SPECIMEN_PRESETS.map((preset, idx) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset.id)}
              className="px-2.5 py-1 border border-[#111111]/35 hover:border-[#111111] hover:bg-[#E5F56B] transition-colors cursor-pointer whitespace-nowrap"
            >
              Preset 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Generous Open Editable Specimen Stage */}
      <div className="px-5 sm:px-8 lg:px-12 py-12 sm:py-16 border-b border-[#111111]">
        {mode === 'display' && (
          <div className="w-full">
            <label htmlFor="gw-section2-display-input" className="sr-only">
              Section 2 Editable Display String
            </label>
            <input
              id="gw-section2-display-input"
              type="text"
              value={applyCaseTransform(text, caseMode)}
              aria-label="Section 2 Editable Display String"
              spellCheck={false}
              onChange={(e) => onTextChange(e.target.value)}
              className="w-full bg-transparent border-0 focus:outline-none text-[#111111] leading-[0.9]"
              style={{
                fontFamily: 'var(--gw-font-specimen)',
                fontVariationSettings: variationSettings,
                letterSpacing: trackingCss,
                fontSize: 'clamp(3.5rem, 11vw, 10rem)',
              }}
            />
          </div>
        )}

        {mode === 'headline' && (
          <div className="w-full">
            <label htmlFor="gw-section2-headline-input" className="sr-only">
              Section 2 Editable Headline Specimen
            </label>
            <textarea
              id="gw-section2-headline-input"
              rows={2}
              value={applyCaseTransform(headlineText, caseMode)}
              aria-label="Section 2 Editable Headline Specimen"
              spellCheck={false}
              onChange={(e) => onHeadlineChange(e.target.value)}
              className="w-full bg-transparent border-0 focus:outline-none text-[#111111] resize-none leading-[1.04]"
              style={{
                fontFamily: 'var(--gw-font-specimen)',
                fontVariationSettings: variationSettings,
                letterSpacing: trackingCss,
                fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
              }}
            />
          </div>
        )}

        {mode === 'paragraph' && (
          <div className="max-w-4xl">
            <label htmlFor="gw-section2-paragraph-input" className="sr-only">
              Section 2 Editable Paragraph Specimen
            </label>
            <textarea
              id="gw-section2-paragraph-input"
              rows={4}
              value={applyCaseTransform(paragraphText, caseMode)}
              aria-label="Section 2 Editable Paragraph Specimen"
              spellCheck={false}
              onChange={(e) => onParagraphChange(e.target.value)}
              className="w-full bg-transparent border-0 focus:outline-none text-[#111111] resize-none leading-[1.5]"
              style={{
                fontFamily: 'var(--gw-font-specimen)',
                fontVariationSettings: variationSettings,
                letterSpacing: trackingCss,
                fontSize: 'clamp(1.2rem, 2.2vw, 2rem)',
              }}
            />
          </div>
        )}
      </div>

      {/* Minimal 3-Row Visual Waterfall */}
      <div className="divide-y divide-[#111111]">
        {WATERFALL_CUTS.map((cut) => (
          <div
            key={cut.label}
            onClick={() => {
              onAxisChange('weight', cut.wght);
              onAxisChange('width', cut.wdth);
              onAxisChange('slant', cut.slnt);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onAxisChange('weight', cut.wght);
                onAxisChange('width', cut.wdth);
                onAxisChange('slant', cut.slnt);
              }
            }}
            aria-label={`Apply waterfall preset ${cut.label}`}
            className="px-5 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 hover:bg-[#E5F56B]/45 transition-colors cursor-pointer"
          >
            <span className="gw-mono text-[11px] text-[#111111]/60 shrink-0 sm:w-44">
              {cut.label}
            </span>
            <span
              className="text-[24px] sm:text-[36px] leading-tight text-[#111111] truncate flex-1"
              style={{
                fontFamily: 'var(--gw-font-specimen)',
                fontVariationSettings: `'wght' ${cut.wght}, 'wdth' ${cut.wdth}, 'slnt' ${-cut.slnt}, 'opsz' 96`,
              }}
            >
              {applyCaseTransform(cut.sample, caseMode)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(glyphwork)/glyphwork/components/glyphwork/TerminalFooter.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import {
  VariableAxesState,
  buildFontVariationSettings,
  validateSpecimenEmail,
} from '../../utils/typographyLogic';

interface TerminalFooterProps {
  axes: VariableAxesState;
  onJumpToHeroLab: () => void;
  onSelectGlyph: (glyph: string, scrollToInspector?: boolean) => void;
}

const FOOTER_COLUMNS = [
  {
    heading: '01 // FONTS',
    links: [
      { label: 'All Specimens', href: '#hero-lab' },
      { label: 'Retail', href: '#specimen-modes' },
      { label: 'Custom Type', href: '#applications' },
      { label: 'Licensing & EULA', href: '#foundry-licensing' },
      { label: 'Desktop & Web', href: '#foundry-licensing' },
    ],
  },
  {
    heading: '02 // ACADEMICS',
    links: [
      { label: 'The Journal', href: '#specimen-modes' },
      { label: 'Specimen Booklets', href: '#applications' },
      { label: 'Type Workshops', href: '#glyph-inspector' },
      { label: 'Archives', href: '#glyph-inspector' },
    ],
  },
  {
    heading: '03 // STUDIO',
    links: [
      { label: 'About', href: '#foundry-licensing' },
      { label: 'Contact', href: '#terminal-footer' },
      { label: 'Custom Commissions', href: '#foundry-licensing' },
      { label: 'Media Kit', href: '#applications' },
    ],
  },
  {
    heading: '04 // SOCIALS',
    links: [
      { label: 'Instagram ↗', href: '#terminal-footer' },
      { label: 'Are.na ↗', href: '#terminal-footer' },
      { label: 'Discord ↗', href: '#terminal-footer' },
      { label: 'GitHub ↗', href: '#terminal-footer' },
    ],
  },
];

const PlusTick: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    aria-hidden="true"
    className={`pointer-events-none select-none ${className}`}
  >
    <line x1="9" y1="0" x2="9" y2="18" stroke="#111111" strokeWidth="1.2" />
    <line x1="0" y1="9" x2="18" y2="9" stroke="#111111" strokeWidth="1.2" />
  </svg>
);

export const TerminalFooter: React.FC<TerminalFooterProps> = ({
  axes,
  onJumpToHeroLab,
  onSelectGlyph,
}) => {
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<{
    valid?: boolean;
    message?: string;
  } | null>(null);

  const variationSettings = buildFontVariationSettings({
    ...axes,
    weight: Math.max(700, axes.weight),
    width: Math.max(120, axes.width),
  });

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateSpecimenEmail(email);
    if (!res.valid) {
      setEmailStatus({ valid: false, message: res.error });
    } else {
      setEmailStatus({
        valid: true,
        message: `DISPATCH CONFIRMED [${res.dispatchCode}] — PDF SPECIMEN & TRIAL .WOFF2 SENT TO ${email.trim().toUpperCase()}`,
      });
      setEmail('');
    }
  };

  const footerLetters = [
    { char: 'G', color: '#F02F83' }, // Spectral Magenta matching footer-reference.webp
    { char: 'L', color: '#111111' },
    { char: 'Y', color: '#111111' },
    { char: 'P', color: '#111111' },
    { char: 'H', color: '#111111' },
    { char: 'W', color: '#6E57D5' }, // Electric Violet matching footer-reference.webp
    { char: 'O', color: '#111111' },
    { char: 'R', color: '#111111' },
    { char: 'K', color: '#111111' },
  ];

  return (
    <footer
      id="terminal-footer"
      aria-label="Terminal Specimen Footer"
      className="w-full lg:pr-[52px] bg-[#F7F7F0] text-[#111111] select-none"
    >
      {/* 1. Top Utility Strip Line matching footer-reference.webp */}
      <div className="px-5 sm:px-8 py-3 border-b border-[#111111] flex flex-wrap items-center justify-between gap-4 gw-mono text-[12px] sm:text-[13px] font-medium tracking-[0.04em]">
        <span>SECT. 05 // TERMINAL FOOTER</span>
        <span>GLYPHWORK ©</span>
        <span>OPENLANDING TEMPLATE COLLECTION No. 090</span>
      </div>

      {/* 2. Type Testing Area Callout + Specimen Newsletter Dispatch Line */}
      <div className="px-5 sm:px-8 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-3 lg:border-r border-[#111111] pr-4">
          <button
            type="button"
            onClick={onJumpToHeroLab}
            className="text-left gw-mono text-[18px] sm:text-[22px] leading-[1.18] tracking-[0.02em] text-[#111111] hover:text-[#F02F83] transition-colors cursor-pointer"
          >
            <span className="block">TYPE TESTING AREA</span>
            <span className="block">TRY THE SYSTEM</span>
          </button>
        </div>

        <div className="lg:col-span-9 pl-0 lg:pl-4">
          <form
            onSubmit={handleEmailSubmit}
            noValidate
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-4">
              <label
                htmlFor="gw-footer-email"
                className="gw-mono text-[20px] sm:text-[26px] lg:text-[28px] tracking-[0.01em] text-[#111111] whitespace-nowrap shrink-0"
              >
                ENTER EMAIL FOR SPECIMENS
              </label>

              <div className="relative flex-1 flex items-center border-b-2 border-dashed border-[#111111] pb-1">
                <input
                  id="gw-footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailStatus) setEmailStatus(null);
                  }}
                  placeholder="studio@domain.ch"
                  aria-label="Enter email for specimens"
                  className="w-full bg-transparent border-0 focus:outline-none gw-mono text-[16px] sm:text-[20px] text-[#111111] placeholder:text-[#111111]/35 pr-10"
                />
                <button
                  type="submit"
                  aria-label="Submit email for specimen dispatch"
                  className="p-1 text-[#F02F83] hover:scale-110 transition-transform cursor-pointer shrink-0"
                >
                  {/* Magenta Cursor Arrow Icon matching footer-reference.webp */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#F02F83"
                    aria-hidden="true"
                  >
                    <path d="M4 2L20 13L12 15L9 22L4 2Z" />
                  </svg>
                </button>
              </div>
            </div>

            {emailStatus && (
              <div
                role="status"
                className={`gw-mono text-[11px] font-semibold ${
                  emailStatus.valid ? 'text-[#6E57D5]' : 'text-[#F02F83]'
                }`}
              >
                {emailStatus.message}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* 3. Giant Concluding Specimen Word with Cap-Height, X-Height & Baseline Overlays */}
      <div className="relative w-full py-4 sm:py-6 overflow-hidden">
        {/* Top Coordinate Notations (+ 0.24, Crosshairs) */}
        <div className="px-5 sm:px-8 mb-1 flex items-center justify-between gw-mono text-[12px] font-medium text-[#111111]">
          <div className="flex items-center gap-16 sm:gap-28">
            <span>+ 0.24</span>
            <PlusTick />
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="6.5" stroke="#111111" strokeWidth="1.2" />
            <line x1="11" y1="0" x2="11" y2="22" stroke="#111111" strokeWidth="1" />
            <line x1="0" y1="11" x2="22" y2="11" stroke="#111111" strokeWidth="1" />
          </svg>
          <div className="flex items-center gap-16 sm:gap-28">
            <PlusTick />
            <span>+ 0.24</span>
          </div>
        </div>

        {/* Giant Specimen Container */}
        <div className="relative w-full py-1">
          {/* Upper Cap-Height Guide (#F02F83) + Secondary Cap line (#6E57D5) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[8%] h-[1.5px] bg-[#F02F83] z-20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[15%] h-[1.5px] bg-[#6E57D5] z-20"
          >
            <span className="gw-mono text-[11px] sm:text-[13px] text-[#6E57D5] bg-[#F7F7F0]/90 px-1 ml-5 sm:ml-8 -translate-y-5 inline-block">
              Cap-height
            </span>
          </div>

          {/* Middle X-Height Guide (#6E57D5) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[41%] h-[1.5px] bg-[#6E57D5] z-20 flex justify-between"
          >
            <span className="gw-mono text-[11px] sm:text-[13px] text-[#6E57D5] bg-[#F7F7F0]/90 px-1 ml-5 sm:ml-8 -translate-y-5 inline-block">
              X-height
            </span>
            <span className="gw-mono text-[11px] sm:text-[13px] text-[#6E57D5] bg-[#F7F7F0]/90 px-1 mr-5 sm:mr-8 -translate-y-5 inline-block">
              x-height
            </span>
          </div>

          {/* Bottom Baseline Guide (#F02F83) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 bottom-[10%] h-[1.5px] bg-[#F02F83] z-20"
          >
            <span className="gw-mono text-[11px] sm:text-[13px] text-[#F02F83] bg-[#F7F7F0]/90 px-1 ml-5 sm:ml-8 -translate-y-5 inline-block">
              Baseline
            </span>
          </div>

          {/* Giant GLYPHWORK Specimen Word with Magenta G and Electric Violet W */}
          <div
            className="w-full px-4 sm:px-8 py-2 flex items-baseline justify-between leading-[0.84] tracking-[-0.03em] relative z-10"
            style={{
              fontFamily: 'var(--gw-font-specimen)',
              fontVariationSettings: `'wght' ${Math.round(Math.max(700, axes.weight))}, 'wdth' 102, 'slnt' 0, 'opsz' 144`,
              fontSize: 'clamp(2.35rem, 11.4vw, 11.8rem)',
              transform: 'scaleY(1.36)',
              transformOrigin: 'center center',
            }}
          >
            {footerLetters.map((item, idx) => (
              <button
                key={`${item.char}-${idx}`}
                type="button"
                onClick={() => onSelectGlyph(item.char, true)}
                aria-label={`Inspect footer specimen glyph ${item.char}`}
                className="bg-transparent border-0 p-0 m-0 leading-[0.84] cursor-pointer hover:opacity-85 transition-opacity focus-visible:outline-2 focus-visible:outline-[#F02F83]"
                style={{ color: item.color }}
              >
                {item.char}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Coordinate Notations (+ 0.24, 1000 EM, + 0.24) */}
        <div className="px-5 sm:px-8 mt-1 flex items-center justify-between gw-mono text-[12px] font-medium text-[#111111]">
          <div className="flex flex-col items-start gap-1">
            <span>+ 0.24</span>
            <PlusTick />
          </div>
          <span className="text-[13px] tracking-[0.05em]">1000 EM</span>
          <div className="flex flex-col items-end gap-1">
            <span>+ 0.24</span>
            <PlusTick />
          </div>
        </div>
      </div>

      {/* 4. Four Editorial Link Columns + STAY INDEPENDENT Acid Yellow Stamp */}
      <div className="px-5 sm:px-8 py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
        {FOOTER_COLUMNS.map((col, idx) => (
          <div
            key={col.heading}
            className={`relative flex flex-col justify-between ${
              idx > 0 ? 'lg:border-l lg:border-[#111111] lg:pl-8' : 'lg:pr-6'
            }`}
          >
            <div>
              <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-[-0.01em] text-[#111111] mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-1.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[20px] sm:text-[24px] leading-[1.28] text-[#111111] hover:text-[#F02F83] transition-colors inline-block"
                      style={{
                        fontFamily: 'var(--gw-font-specimen)',
                        fontVariationSettings: "'wght' 500, 'wdth' 105, 'slnt' 0, 'opsz' 48",
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tilted Acid-Yellow STAY INDEPENDENT Stamp in Column 04 */}
            {idx === 3 && (
              <div className="mt-6 lg:mt-4 self-start sm:self-end">
                <span className="inline-block bg-[#E5F56B] text-[#111111] border border-[#111111]/20 px-4 py-1.5 text-[16px] sm:text-[18px] font-semibold tracking-[0.02em] -rotate-3 shadow-xs">
                  STAY INDEPENDENT
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 5. Bottom Calibration Bar with Coordinates, Millimeter Grid & 4 Color Swatches */}
      <div className="px-5 sm:px-8 py-3 border-t border-[#111111] flex flex-wrap items-center justify-between gap-4 gw-mono text-[10px] sm:text-[11px] text-[#111111]">
        <div className="leading-tight">
          <div>Fine specimen specs</div>
          <div>Coordinates: 10px + 100 EM</div>
        </div>

        <div className="hidden sm:block tracking-[0.25em] font-medium">
          01 02 03 04 05 06 07
        </div>

        {/* Fine Millimeter Grid Ruler Strip */}
        <div
          aria-hidden="true"
          className="hidden md:flex items-center gap-4 text-[#111111]/70"
        >
          <div className="flex items-center">
            <span className="mr-1">⌖</span>
            <div className="flex border-y border-[#111111]/40 h-3.5 divide-x divide-[#111111]/40">
              {Array.from({ length: 22 }).map((_, i) => (
                <span key={i} className="w-1.5 h-full block" />
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-1">#</span>
            <div className="flex border-y border-[#111111]/40 h-3.5 divide-x divide-[#111111]/40">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="w-1.5 h-full block" />
              ))}
            </div>
          </div>
        </div>

        {/* Locked 4-Color Foundry Calibration Swatches */}
        <div
          aria-label="Foundry Color Calibration Swatches"
          className="flex items-center gap-1.5"
        >
          <span
            title="Spectral Magenta #F02F83"
            className="w-6 h-6 bg-[#F02F83] block border border-[#111111]/20"
          />
          <span
            title="Electric Violet #6E57D5"
            className="w-6 h-6 bg-[#6E57D5] block border border-[#111111]/20"
          />
          <span
            title="Acid Yellow #E5F56B"
            className="w-6 h-6 bg-[#E5F56B] block border border-[#111111]/20"
          />
          <span
            title="Ink Black #111111"
            className="w-6 h-6 bg-[#111111] block border border-[#111111]/20"
          />
        </div>
      </div>
    </footer>
  );
};
]]>
    </file>
    <file path="src/app/(glyphwork)/glyphwork/components/glyphwork/VariableControls.tsx">
<![CDATA['use client';

import React from 'react';
import {
  VariableAxesState,
  formatSlantDisplay,
  formatTrackingDisplay,
} from '../../utils/typographyLogic';

interface VariableControlsProps {
  axes: VariableAxesState;
  onAxisChange: (axis: keyof VariableAxesState, value: number) => void;
}

const RULER_TICKS = Array.from({ length: 29 });

export const VariableControls: React.FC<VariableControlsProps> = ({
  axes,
  onAxisChange,
}) => {
  return (
    <div
      role="region"
      aria-label="Variable Font Instrument Controls"
      className="w-full border-t border-[#111111] bg-[#F7F7F0] select-none"
    >
      {/* Clean 4-Column Instrument Slider Grid matching header-reference.webp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#111111]">
        {/* CELL 1: WEIGHT */}
        <div className="relative px-5 pt-3 pb-5 flex flex-col justify-between">
          <div className="gw-mono text-[13px] font-medium tracking-[0.03em] text-[#111111] mb-1.5">
            <label htmlFor="gw-axis-weight" className="cursor-pointer">
              WEIGHT [
            </label>
          </div>

          <div className="flex items-center gap-2.5 gw-mono text-[14px] font-medium text-[#111111]">
            <span className="whitespace-nowrap shrink-0">[100</span>
            <div className="relative flex-1 flex items-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 h-[3px] bg-[#F02F83]"
                style={{ width: `${((axes.weight - 100) / 800) * 100}%` }}
              />
              <input
                id="gw-axis-weight"
                type="range"
                min={100}
                max={900}
                step={1}
                value={axes.weight}
                aria-label="Weight Axis"
                aria-valuemin={100}
                aria-valuemax={900}
                aria-valuenow={axes.weight}
                aria-valuetext={`Weight ${axes.weight}`}
                onChange={(e) => onAxisChange('weight', Number(e.target.value))}
                className="gw-slider gw-slider-magenta relative z-10"
              />
            </div>
            <span className="whitespace-nowrap shrink-0">
              900] <strong className="font-bold ml-1">{axes.weight}</strong>
            </span>
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-0 left-5 right-5 h-[9px] flex items-end justify-between pointer-events-none"
          >
            {RULER_TICKS.map((_, i) => (
              <span
                key={i}
                className={`block bg-[#111111] ${
                  i % 4 === 0 ? 'h-[8px] w-[1px]' : 'h-[4px] w-[1px] opacity-65'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CELL 2: WIDTH */}
        <div className="relative px-5 pt-3 pb-5 flex flex-col justify-between">
          <div className="gw-mono text-[13px] font-medium tracking-[0.03em] text-[#111111] mb-1.5">
            <label htmlFor="gw-axis-width" className="cursor-pointer">
              WIDTH [
            </label>
          </div>

          <div className="flex items-center gap-2.5 gw-mono text-[14px] font-medium text-[#111111]">
            <span className="whitespace-nowrap shrink-0">[50</span>
            <div className="relative flex-1 flex items-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 h-[3px] bg-[#6E57D5]"
                style={{ width: `${((axes.width - 50) / 100) * 100}%` }}
              />
              <input
                id="gw-axis-width"
                type="range"
                min={50}
                max={150}
                step={1}
                value={axes.width}
                aria-label="Width Axis"
                aria-valuemin={50}
                aria-valuemax={150}
                aria-valuenow={axes.width}
                aria-valuetext={`Width ${axes.width}%`}
                onChange={(e) => onAxisChange('width', Number(e.target.value))}
                className="gw-slider gw-slider-violet relative z-10"
              />
            </div>
            <span className="whitespace-nowrap shrink-0">
              150] <strong className="font-bold ml-1">{axes.width}</strong>
            </span>
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-0 left-5 right-5 h-[9px] flex items-end justify-between pointer-events-none"
          >
            {RULER_TICKS.map((_, i) => (
              <span
                key={i}
                className={`block bg-[#111111] ${
                  i % 4 === 0 ? 'h-[8px] w-[1px]' : 'h-[4px] w-[1px] opacity-65'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CELL 3: TRACKING */}
        <div className="relative px-5 pt-3 pb-5 flex flex-col justify-between border-t sm:border-t lg:border-t-0 border-[#111111]">
          <div className="gw-mono text-[13px] font-medium tracking-[0.03em] text-[#111111] mb-1.5">
            <label htmlFor="gw-axis-tracking" className="cursor-pointer">
              TRACKING [
            </label>
          </div>

          <div className="flex items-center gap-2.5 gw-mono text-[14px] font-medium text-[#111111]">
            <span className="whitespace-nowrap shrink-0">-100</span>
            <div className="relative flex-1 flex items-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 h-[3px] bg-[#111111]"
                style={{ width: `${((axes.tracking + 100) / 200) * 100}%` }}
              />
              <input
                id="gw-axis-tracking"
                type="range"
                min={-100}
                max={100}
                step={1}
                value={axes.tracking}
                aria-label="Tracking Letterspacing"
                aria-valuemin={-100}
                aria-valuemax={100}
                aria-valuenow={axes.tracking}
                aria-valuetext={`Tracking ${formatTrackingDisplay(axes.tracking)} em`}
                onChange={(e) => onAxisChange('tracking', Number(e.target.value))}
                className="gw-slider gw-slider-ink relative z-10"
              />
            </div>
            <span className="whitespace-nowrap shrink-0">
              100] <strong className="font-bold ml-1">{formatTrackingDisplay(axes.tracking)}</strong>
            </span>
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-0 left-5 right-5 h-[9px] flex items-end justify-between pointer-events-none"
          >
            {RULER_TICKS.map((_, i) => (
              <span
                key={i}
                className={`block ${
                  i % 4 === 0
                    ? 'h-[8px] w-[1px] bg-[#111111]'
                    : 'h-[4px] w-[1px] bg-[#F02F83]/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CELL 4: SLANT */}
        <div className="relative px-5 pt-3 pb-5 flex flex-col justify-between border-t sm:border-t lg:border-t-0 border-[#111111]">
          <div className="gw-mono text-[13px] font-medium tracking-[0.03em] text-[#111111] mb-1.5">
            <label htmlFor="gw-axis-slant" className="cursor-pointer">
              SLANT [
            </label>
          </div>

          <div className="flex items-center gap-2.5 gw-mono text-[14px] font-medium text-[#111111]">
            <span className="whitespace-nowrap shrink-0">0°</span>
            <div className="relative flex-1 flex items-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 h-[3px] bg-[#111111]"
                style={{ width: `${(axes.slant / 15) * 100}%` }}
              />
              <input
                id="gw-axis-slant"
                type="range"
                min={0}
                max={15}
                step={0.5}
                value={axes.slant}
                aria-label="Slant Oblique Angle"
                aria-valuemin={0}
                aria-valuemax={15}
                aria-valuenow={axes.slant}
                aria-valuetext={`Slant ${formatSlantDisplay(axes.slant)}`}
                onChange={(e) => onAxisChange('slant', Number(e.target.value))}
                className="gw-slider gw-slider-yellow relative z-10"
              />
            </div>
            <span className="whitespace-nowrap shrink-0">
              15°] <strong className="font-bold ml-1">{formatSlantDisplay(axes.slant)}</strong>
            </span>
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-0 left-5 right-5 h-[9px] flex items-end justify-between pointer-events-none"
          >
            {RULER_TICKS.map((_, i) => (
              <span
                key={i}
                className={`block bg-[#111111] ${
                  i % 4 === 0 ? 'h-[8px] w-[1px]' : 'h-[4px] w-[1px] opacity-65'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
]]>
    </file>
  </files>
</template>
