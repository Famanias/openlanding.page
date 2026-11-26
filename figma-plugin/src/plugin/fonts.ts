import type { SerializedNode } from "../shared/types";

const GENERIC_FAMILIES = new Set([
  "sans-serif",
  "serif",
  "monospace",
  "system-ui",
  "ui-sans-serif",
  "ui-serif",
  "ui-monospace",
  "ui-rounded",
  "cursive",
  "fantasy",
  "emoji",
  "math",
  "fangsong",
  "-apple-system",
  "blinkmacsystemfont",
  "inherit",
  "initial",
  "unset",
]);

const WEIGHT_TOKENS: Array<[RegExp, number]> = [
  [/extra\s*-?\s*light|ultra\s*-?\s*light/, 200],
  [/semi\s*-?\s*bold|demi\s*-?\s*bold/, 600],
  [/extra\s*-?\s*bold|ultra\s*-?\s*bold/, 800],
  [/thin|hairline/, 100],
  [/light/, 300],
  [/medium/, 500],
  [/bold/, 700],
  [/black|heavy/, 900],
  [/regular|normal|book|roman/, 400],
];

const FALLBACK_FAMILIES = ["Inter", "Roboto"];
const SERIF_FALLBACK_FAMILIES = [
  "Georgia",
  "Lora",
  "Merriweather",
  "Playfair Display",
  "Times New Roman",
  ...FALLBACK_FAMILIES,
];
const MONO_FALLBACK_FAMILIES = [
  "IBM Plex Mono",
  "Roboto Mono",
  "JetBrains Mono",
  "Source Code Pro",
  "Courier New",
  ...FALLBACK_FAMILIES,
];

export function cleanFontFamilyName(raw: string): string {
  const first = raw.split(",")[0]?.trim().replace(/^["']|["']$/g, "") ?? "";
  if (!first) return "";

  const nextMatch = first.match(/^__(.+?)_[0-9a-f]{4,}$/i);
  const unhashed = nextMatch ? nextMatch[1].replace(/_/g, " ") : first;
  return unhashed.replace(/\s+Fallback$/i, "").trim();
}

export function fontKey(family: string, weight: number, italic: boolean): string {
  return `${cleanFontFamilyName(family).toLowerCase()}::${weight}::${italic ? "italic" : "normal"}`;
}

export function resolveFontForText(
  resolved: Map<string, FontName>,
  rawFamily: string,
  weight: number,
  fontStyle: "normal" | "italic" = "normal"
): FontName {
  return (
    resolved.get(fontKey(rawFamily, weight, fontStyle === "italic")) ?? {
      family: "Inter",
      style: "Regular",
    }
  );
}

function parseFigmaStyle(style: string): { weight: number; italic: boolean } {
  const lower = style.toLowerCase();
  const italic = /italic|oblique/.test(lower);
  const weightPart = lower.replace(/italic|oblique/g, "").trim();
  if (!weightPart) return { weight: 400, italic };

  for (const [pattern, weight] of WEIGHT_TOKENS) {
    if (pattern.test(weightPart)) return { weight, italic };
  }
  return { weight: 400, italic };
}

function pickBestStyle(familyFonts: Font[], targetWeight: number, targetItalic: boolean): FontName {
  let best = familyFonts[0].fontName;
  let bestScore = Infinity;

  for (const entry of familyFonts) {
    const parsed = parseFigmaStyle(entry.fontName.style);
    const italicPenalty = parsed.italic === targetItalic ? 0 : 10000;
    const score = italicPenalty + Math.abs(parsed.weight - targetWeight);
    if (score < bestScore) {
      bestScore = score;
      best = entry.fontName;
    }
  }
  return best;
}

function expandCandidates(candidates: string[]): string[] {
  const result: string[] = [];
  for (const entry of candidates) {
    for (const part of entry.split(",")) {
      const cleaned = cleanFontFamilyName(part);
      if (cleaned) result.push(cleaned);
    }
  }
  return result;
}

export function matchFigmaFont(
  candidates: string[],
  weight: number,
  italic: boolean,
  available: Font[]
): { font: FontName; substitutedFrom?: string } {
  const expanded = expandCandidates(candidates);
  const lowerExpanded = expanded.map((n) => n.toLowerCase());
  const nonGeneric = expanded.filter((name) => !GENERIC_FAMILIES.has(name.toLowerCase()));

  for (const candidate of nonGeneric) {
    const lower = candidate.toLowerCase();
    // Arial Black is exposed as its own family in Figma rather than Arial weight 900.
    if (lower === "arial" && weight >= 800) {
      const blackMatches = available.filter((f) => f.fontName.family.toLowerCase() === "arial black");
      if (blackMatches.length > 0) {
        return { font: pickBestStyle(blackMatches, weight, italic) };
      }
    }
    const matches = available.filter((f) => f.fontName.family.toLowerCase() === lower);
    if (matches.length > 0) {
      return { font: pickBestStyle(matches, weight, italic) };
    }
  }

  const substitutedFrom = nonGeneric[0];
  const prefersMono = lowerExpanded.some((n) => n === "monospace" || n === "ui-monospace");
  const prefersSerif = lowerExpanded.some((n) => n === "serif" || n === "ui-serif");
  const fallbackOrder = prefersMono
    ? MONO_FALLBACK_FAMILIES
    : prefersSerif
      ? SERIF_FALLBACK_FAMILIES
      : FALLBACK_FAMILIES;

  for (const fallbackFamily of fallbackOrder) {
    const matches = available.filter(
      (f) => f.fontName.family.toLowerCase() === fallbackFamily.toLowerCase()
    );
    if (matches.length > 0) {
      return {
        font: pickBestStyle(matches, weight, italic),
        ...(substitutedFrom ? { substitutedFrom } : {}),
      };
    }
  }

  const fallbackFont =
    available.length > 0
      ? pickBestStyle(available, weight, italic)
      : { family: "Inter", style: "Regular" };
  return {
    font: fallbackFont,
    ...(substitutedFrom ? { substitutedFrom } : {}),
  };
}

interface FontSpec {
  key: string;
  rawFamily: string;
  weight: number;
  italic: boolean;
}

function collectFontSpecs(nodes: SerializedNode[], specs: Map<string, FontSpec>): void {
  for (const node of nodes) {
    if (node.type === "TEXT") {
      const baseItalic = node.fontStyle === "italic";
      const baseKey = fontKey(node.fontFamily, node.fontWeight, baseItalic);
      if (!specs.has(baseKey)) {
        specs.set(baseKey, {
          key: baseKey,
          rawFamily: node.fontFamily,
          weight: node.fontWeight,
          italic: baseItalic,
        });
      }
      for (const range of node.ranges) {
        const rawFamily = range.fontFamily ?? node.fontFamily;
        const weight = range.fontWeight ?? node.fontWeight;
        const italic = (range.fontStyle ?? node.fontStyle) === "italic";
        const key = fontKey(rawFamily, weight, italic);
        if (!specs.has(key)) {
          specs.set(key, { key, rawFamily, weight, italic });
        }
      }
    } else if (node.type === "FRAME") {
      collectFontSpecs(node.children, specs);
    }
  }
}

async function loadWithFallback(
  font: FontName,
  figmaApi: Pick<PluginAPI, "loadFontAsync">
): Promise<{ loaded: FontName; failedOriginal: boolean }> {
  try {
    await figmaApi.loadFontAsync(font);
    return { loaded: font, failedOriginal: false };
  } catch {
    for (const family of FALLBACK_FAMILIES) {
      const fallback: FontName = { family, style: "Regular" };
      if (fallback.family === font.family && fallback.style === font.style) continue;
      try {
        await figmaApi.loadFontAsync(fallback);
        return { loaded: fallback, failedOriginal: true };
      } catch {
        // Try next safe fallback font
      }
    }
    throw new Error(`Failed to load font ${font.family} ${font.style} and all fallbacks`);
  }
}

export async function preloadDocumentFonts(
  nodes: SerializedNode[],
  figmaApi: Pick<PluginAPI, "listAvailableFontsAsync" | "loadFontAsync">
): Promise<{ resolved: Map<string, FontName>; substitutions: string[] }> {
  const specs = new Map<string, FontSpec>();
  collectFontSpecs(nodes, specs);

  const resolved = new Map<string, FontName>();
  if (specs.size === 0) {
    return { resolved, substitutions: [] };
  }

  const available = await figmaApi.listAvailableFontsAsync();
  const loadCache = new Map<string, Promise<{ loaded: FontName; failedOriginal: boolean }>>();
  const substitutionSet = new Set<string>();

  for (const spec of specs.values()) {
    const match = matchFigmaFont(spec.rawFamily.split(","), spec.weight, spec.italic, available);
    const cacheKey = `${match.font.family}::${match.font.style}`;
    let loadPromise = loadCache.get(cacheKey);
    if (!loadPromise) {
      loadPromise = loadWithFallback(match.font, figmaApi);
      loadCache.set(cacheKey, loadPromise);
    }

    const { loaded, failedOriginal } = await loadPromise;
    resolved.set(spec.key, loaded);

    if (match.substitutedFrom) {
      substitutionSet.add(match.substitutedFrom);
    } else if (failedOriginal) {
      const cleaned = cleanFontFamilyName(spec.rawFamily);
      if (cleaned) substitutionSet.add(cleaned);
    }
  }

  return { resolved, substitutions: Array.from(substitutionSet) };
}
