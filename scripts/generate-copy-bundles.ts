import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import fg from "fast-glob";
import { readTemplateFiles } from "./template-files";
import { TEMPLATES, type TemplateSlug } from "./templates.config";

const COPY_METADATA: Record<
  TemplateSlug,
  { name: string; dependencies: string[] }
> = {
  lowtide: { name: "LOWTIDE", dependencies: ["three", "gsap", "lenis", "troika-three-text", "tone"] },
  nightline: { name: "NIGHTLINE", dependencies: [] },
  cullet: { name: "Cullet", dependencies: ["three", "lenis"] },
  amaoto: { name: "AMAOTO", dependencies: ["three"] },
  understudy: { name: "Understudy", dependencies: ["lenis"] },
  starlight: { name: "Starlight Lab", dependencies: ["three", "@phosphor-icons/react"] },
  firstday: { name: "FIRSTDAY", dependencies: ["lenis"] },
  flori: { name: "Flori", dependencies: ["lenis"] },
  pipkin: { name: "Pipkin", dependencies: ["lenis"] },
  satoyama: { name: "Satoyama Biyori", dependencies: [] },
  fixture: { name: "FIXTURE", dependencies: ["lenis"] },
  chinagraph: { name: "CHINAGRAPH", dependencies: ["lenis"] },
  kazeko: {
    name: "Studio Kazeko",
    dependencies: ["lenis"],
  },
  orrery: {
    name: "Orrery",
    dependencies: ["gsap", "motion", "@phosphor-icons/react"],
  },
  keytu: {
    name: "KEYTU",
    dependencies: ["gsap", "lenis", "motion", "@phosphor-icons/react"],
  },
  koji: {
    name: "KŌJI",
    dependencies: ["three"],
  },
  trace: {
    name: "TRACE",
    dependencies: ["three"],
  },
  calder: {
    name: "CALDER & ROWE",
    dependencies: ["lenis"],
  },
  vector: {
    name: "VECTOR/90",
    dependencies: ["three"],
  },
  morrow: {
    name: "MORROW",
    dependencies: [],
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
    name: "Maison Vérane",
    dependencies: [],
  },
  sundial: {
    name: "SUNDIAL Coffee Roasters",
    dependencies: [],
  },
  noctiluca: {
    name: "Noctiluca",
    dependencies: [],
  },
  iridia: {
    name: "IRIDIA",
    dependencies: [],
  },
  bathys: {
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
  isobar: {
    name: "ISOBAR",
    dependencies: ["three"],
  },
  "volume-zero": {
    name: "VOLUME ZERO",
    dependencies: ["three"],
  },
  openhouse: {
    name: "OPENHOUSE",
    dependencies: [],
  },
  handoff: {
    name: "HANDOFF",
    dependencies: [],
  },
  truecut: {
    name: "TRUECUT Works",
    dependencies: [],
  },
  nomi: {
    name: "NOMI",
    dependencies: [],
  },
  "alpine-reel": {
    name: "Alpine Reel",
    dependencies: [],
  },
  spaceedu: {
    name: "SpaceEdu",
    dependencies: [],
  },
  rill: {
    name: "RILL",
    dependencies: [],
  },
  mio: { name: "Mio Hazuki", dependencies: ["lenis"] },
  hiyas: {
    name: "HIYAS",
    dependencies: [],
  },
tally: {
    name: "TALLY",
    dependencies: ["lenis"],
  },
  aftercart: {
    name: "AFTERCART",
    dependencies: [],
  },
  valence: {
    name: "VALENCE",
    dependencies: ["three", "lenis"],
  },
  serein: {
    name: "SEREIN Bureau",
    dependencies: [],
  },
  nulo: {
    name: "NULO",
    dependencies: ["lenis"],
  },
  lucentra: {
    name: "LUCENTRA",
    dependencies: [],
  },
  assemblage: {
    name: "Assemblage",
    dependencies: [],
  },
};

export const TEMPLATE_METADATA = Object.fromEntries(Object.entries(COPY_METADATA).map(([slug, meta]) => [slug, {
  ...meta,
  createdAt: TEMPLATES[slug as TemplateSlug].createdAt,
  downloadPath: TEMPLATES[slug as TemplateSlug].hasDownload ? `/downloads/${slug}.html` : null,
}])) as Record<TemplateSlug, { name: string; dependencies: string[]; createdAt: string; downloadPath: string | null }>;

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
    };
    const files = readTemplateFiles(slug);
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
