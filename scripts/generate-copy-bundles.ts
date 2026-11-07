import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import fg from "fast-glob";
import { readTemplateFiles } from "./template-files";
import { TEMPLATES, type TemplateSlug } from "./templates.config";

const COPY_METADATA: Record<
  TemplateSlug,
  { name: string; dependencies: string[]; includeDownload?: boolean }
> = {
  cirro: { name: "CIRRO", dependencies: [], includeDownload: true },
  orova: { name: "OROVA", dependencies: [], includeDownload: true },
  vyra: { name: "VYRA", dependencies: [], includeDownload: true },
  aurel: { name: "AUREL", dependencies: ["lucide-react", "motion"] },
  waypoint: { name: "Waypoint", dependencies: ["gsap", "@gsap/react", "@phosphor-icons/react"], includeDownload: true },
  lenus: { includeDownload: true, name: "LENUS", dependencies: ["three", "lucide-react"] },
  arcsignal: { includeDownload: true, name: "Arc & Signal", dependencies: ["lucide-react", "motion"] },
  khora: { name: "KHORA", dependencies: [], includeDownload: true },
  pitchlane: { name: "Pitchlane", dependencies: [], includeDownload: true },
  strata: { name: "STRATA", dependencies: [], includeDownload: true },
  savepoint: { includeDownload: true, name: "SAVEPOINT.", dependencies: ["three", "@types/three", "gsap", "zustand"] },
  penumbra: { includeDownload: true, name: "PENUMBRA", dependencies: ["lucide-react", "motion"] },
  zeno: { includeDownload: true, name: "ZENO.", dependencies: ["lucide-react", "motion"] },
  halodesk: { name: "Halo Desk", dependencies: ["lucide-react", "motion"] },
  riff: { name: "Riff", dependencies: ["lucide-react", "motion"] },
  inesvale: { name: "Ines Vale", dependencies: ["lucide-react", "motion"] },
  nicopark: { name: "Nico Park", dependencies: ["lucide-react", "motion"] },
  poppypatch: { name: "Poppy Patch", dependencies: ["lucide-react", "motion"] },
  razorline: { name: "RAZORLINE", dependencies: ["lucide-react", "motion"] },
  nexus: { name: "nexus", dependencies: ["lucide-react", "motion"] },
  starriot: { name: "STAR RIOT", dependencies: ["lucide-react", "motion"] },

  stillwater: { name: "Stillwater", dependencies: [], includeDownload: true },
  mercer: { includeDownload: true, name: "Jules Mercer", dependencies: ["three", "lucide-react"] },
  landingx: { name: "Landing X", dependencies: [] },
  avel: { name: "Avel", dependencies: [] },
  pello: { includeDownload: true, name: "Pello", dependencies: ["@phosphor-icons/react"] },
  noiseclub: { name: "NOISE CLUB", dependencies: ["gsap", "lenis", "lucide-react"] },
  warpwander: { name: "WARP & WANDER", dependencies: ["gsap"] },
  ctrlroom: { name: "CTRL/ROOM", dependencies: ["lucide-react", "motion"] },
  parallel: { includeDownload: true, name: "PARALLEL", dependencies: ["three", "zustand", "gsap", "lenis"] },
  lumen: { includeDownload: true, name: "LUMEN", dependencies: ["three", "gsap", "motion", "lucide-react", "lenis"] },
  morta: { includeDownload: true, name: "MORTA", dependencies: ["three"] },
  synapxe: { includeDownload: true, name: "Synapxe", dependencies: ["three"] },
  perigee: { includeDownload: true, name: "PERIGEE", dependencies: ["three", "gsap", "lenis"] },
  xibalba: { includeDownload: true, name: "XIBALBA", dependencies: [] },
  loam: { includeDownload: true, name: "LOAM", dependencies: ["three", "gsap", "lenis"] },
  lowtide: { includeDownload: true, name: "LOWTIDE", dependencies: ["three", "gsap", "lenis", "troika-three-text", "tone"] },
  nightline: { name: "NIGHTLINE", dependencies: [] },
  cullet: { includeDownload: true, name: "Cullet", dependencies: ["three", "lenis"] },
  amaoto: { includeDownload: true, name: "AMAOTO", dependencies: ["three", "gsap", "lenis"] },
  understudy: { name: "Understudy", dependencies: ["lenis"] },
  firstday: { includeDownload: true, name: "FIRSTDAY", dependencies: ["lenis"] },
  flori: { includeDownload: true, name: "Flori", dependencies: ["lenis"] },
  pipkin: { name: "Pipkin", dependencies: ["lenis"] },
  satoyama: { includeDownload: true, name: "Satoyama Biyori", dependencies: [] },
  fixture: { includeDownload: true, name: "FIXTURE", dependencies: ["lenis"] },
  chinagraph: { includeDownload: true, name: "CHINAGRAPH", dependencies: ["lenis"] },
  kazeko: {
    includeDownload: true,
    name: "Studio Kazeko",
    dependencies: ["lenis"],
  },
  orrery: {
    includeDownload: true,
    name: "Orrery",
    dependencies: ["gsap", "motion", "@phosphor-icons/react"],
  },
  keytu: {
    name: "KEYTU",
    dependencies: ["gsap", "lenis", "motion", "@phosphor-icons/react"],
  },
  koji: {
    includeDownload: true,
    name: "KŌJI",
    dependencies: ["three"],
  },
  trace: {
    includeDownload: true,
    name: "TRACE",
    dependencies: ["three"],
  },
  calder: {
    includeDownload: true,
    name: "CALDER & ROWE",
    dependencies: ["lenis"],
  },
  vector: {
    includeDownload: true,
    name: "VECTOR/90",
    dependencies: ["three"],
  },
  loophouse: {
    name: "LOOPHOUSE",
    dependencies: [],
  },
  wowflutter: {
    name: "WOWFLUTTER",
    dependencies: [],
  },
  verane: {
    includeDownload: true,
    name: "Maison Vérane",
    dependencies: [],
  },
  noctiluca: {
    includeDownload: true,
    name: "Noctiluca",
    dependencies: [],
  },
  iridia: {
    includeDownload: true,
    name: "IRIDIA",
    dependencies: [],
  },
  bathys: {
    includeDownload: true,
    name: "BATHYS",
    dependencies: [],
  },
  aubade: {
    name: "AUBADE",
    dependencies: ["lenis"],
  },
  satsuma: {
    name: "Satsuma",
    dependencies: ["lenis"],
  },
  kinetic: {
    name: "KINETIC",
    dependencies: ["three", "lenis"],
  },
  "volume-zero": {
    includeDownload: true,
    name: "VOLUME ZERO",
    dependencies: ["three"],
  },
  openhouse: {
    includeDownload: true,
    name: "OPENHOUSE",
    dependencies: [],
  },
  handoff: {
    includeDownload: true,
    name: "HANDOFF",
    dependencies: [],
  },
  truecut: {
    includeDownload: true,
    name: "TRUECUT Works",
    dependencies: [],
  },
  nomi: {
    includeDownload: true,
    name: "NOMI",
    dependencies: [],
  },
  "alpine-reel": {
    name: "Alpine Reel",
    dependencies: [],
  },
  rill: {
    includeDownload: true,
    name: "RILL",
    dependencies: [],
  },
  mio: { includeDownload: true, name: "Mio Hazuki", dependencies: ["lenis"] },
  hiyas: {
    name: "HIYAS",
    dependencies: [],
  },
tally: {
    name: "TALLY",
    dependencies: ["lenis"],
  },
  aftercart: {
    includeDownload: true,
    name: "AFTERCART",
    dependencies: [],
  },
  valence: {
    name: "VALENCE",
    dependencies: ["three", "lenis"],
  },
  serein: {
    includeDownload: true,
    name: "SEREIN Bureau",
    dependencies: [],
  },
  nulo: {
    includeDownload: true,
    name: "NULO",
    dependencies: ["lenis"],
  },
  assemblage: {
    name: "Assemblage",
    dependencies: ["three"],
  },
};

export const TEMPLATE_METADATA = Object.fromEntries(Object.entries(COPY_METADATA).map(([slug, meta]) => [slug, {
  ...meta,
  createdAt: TEMPLATES[slug as TemplateSlug]?.createdAt ?? "",
  downloadPath: TEMPLATES[slug as TemplateSlug]?.hasDownload ? `/downloads/${slug}.html` : null,
}])) as Record<TemplateSlug, { name: string; dependencies: string[]; createdAt: string; downloadPath: string | null; includeDownload?: boolean }>;

export function getPackageDependencies(packageJsonPath?: string): Record<string, string> {
  try {
    const targetPath = packageJsonPath ?? path.resolve(process.cwd(), "package.json");
    if (fs.existsSync(targetPath)) {
      const raw = fs.readFileSync(targetPath, "utf8");
      const parsed = JSON.parse(raw);
      return { ...(parsed.dependencies || {}), ...(parsed.devDependencies || {}) };
    }
  } catch {
    // fallback
  }
  return {};
}

export function resolveDependencyVersions(
  dependencies: string[] | Record<string, string>,
  packageJsonPath?: string
): Record<string, string> {
  if (!Array.isArray(dependencies)) {
    return dependencies;
  }
  const pkgDeps = getPackageDependencies(packageJsonPath);
  const resolved: Record<string, string> = {};
  for (const dep of dependencies) {
    resolved[dep] = pkgDeps[dep] ?? "*";
  }
  return resolved;
}

export function formatRepomixBundle(
  slug: string,
  name: string,
  files: Array<{ path: string; source: string }>,
  dependencies: string[] | Record<string, string>
): string {
  const resolvedDeps = resolveDependencyVersions(dependencies);
  const depsJson = JSON.stringify({ dependencies: resolvedDeps }, null, 2);
  const indentedDeps = depsJson
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n");

  const filesXml = files
    .map((file) => {
      const posixPath = file.path.replace(/\\/g, "/");
      const escaped = file.source.replace(/\]\]>/g, "]]]]><![CDATA[>");
      return `    <file path="${posixPath}">\n<![CDATA[${escaped}]]>\n    </file>`;
    })
    .join("\n");

  return `<template slug="${slug}" name="${name}">
  <dependencies>
${indentedDeps}
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
${filesXml}
  </files>
</template>
`;
}

export function readTemplatePrompt(slug: string): string {
  const directPath = path.join(process.cwd(), "src", "app", `(${slug})`, slug, "PROMPT.md");
  if (fs.existsSync(directPath)) {
    return fs.readFileSync(directPath, "utf8");
  }
  const matches = fg.sync(`src/app/\\(${slug}\\)/**/PROMPT.md`, { dot: false });
  if (matches.length > 0) {
    return fs.readFileSync(matches[0], "utf8");
  }
  return "";
}

export function generateCopyBundles(outputDir = path.resolve(process.cwd(), "public/copy")): void {
  fs.mkdirSync(outputDir, { recursive: true });

  const slugs = Object.keys(TEMPLATES) as TemplateSlug[];
  for (const slug of slugs) {
    const meta = TEMPLATE_METADATA[slug] ?? {
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      dependencies: [],
      downloadPath: null,
      includeDownload: false,
    };
    const files = readTemplateFiles(slug, true);
    if (meta.includeDownload && meta.downloadPath) {
      const downloadPath = path.join("public", "downloads", `${slug}.html`);
      if (fs.existsSync(downloadPath)) {
        files.push({ path: downloadPath, source: fs.readFileSync(downloadPath, "utf8") });
      }
    }
    const bundleXml = formatRepomixBundle(slug, meta.name, files, meta.dependencies);

    const bundlePath = path.join(outputDir, `${slug}.md`);
    fs.writeFileSync(bundlePath, bundleXml, "utf8");

    const promptContent = readTemplatePrompt(slug);
    const promptPath = path.join(outputDir, `${slug}-prompt.md`);
    fs.writeFileSync(promptPath, promptContent, "utf8");
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  generateCopyBundles();
  console.log("copy bundles: generated");
}
