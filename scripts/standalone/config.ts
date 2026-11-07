export const DOM_STANDALONE_SLUGS = ["aftercart", "pello", "chinagraph", "penumbra", "zeno", "firstday", "flori", "nulo", "serein", "fixture", "satoyama", "mio", "rill", "kazeko", "nomi", "truecut", "handoff", "openhouse", "verane", "calder"] as const;
export const GRAPHICS_SLUGS = ["vector", "trace", "volume-zero", "lumen", "arcsignal", "savepoint", "lenus", "mercer", "parallel", "morta", "synapxe", "xibalba", "perigee", "loam", "lowtide", "cullet", "amaoto", "bathys", "iridia", "noctiluca", "koji", "orrery"] as const;
export const STANDALONE_SLUGS = [...DOM_STANDALONE_SLUGS, ...GRAPHICS_SLUGS] as const;
export type StandaloneSlug = typeof STANDALONE_SLUGS[number];
export function selectSlugs(args: string[]): StandaloneSlug[] {
  if (!args.length || args.join(" ") === "--all") return [...STANDALONE_SLUGS];
  if (args.join(" ") === "--3d") return [...GRAPHICS_SLUGS];
  return [...new Set(args)].map(slug => {
    if (!STANDALONE_SLUGS.includes(slug as StandaloneSlug)) throw new Error(`Unsupported standalone template: ${slug}`);
    return slug as StandaloneSlug;
  });
}
