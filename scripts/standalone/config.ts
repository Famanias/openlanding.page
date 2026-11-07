export const STANDALONE_SLUGS = ["aftercart", "pello", "chinagraph", "penumbra", "zeno", "firstday", "flori", "nulo", "serein", "fixture", "satoyama", "mio", "rill", "kazeko", "nomi", "truecut", "handoff", "openhouse", "verane", "calder"] as const;
export type StandaloneSlug = typeof STANDALONE_SLUGS[number];
export function selectSlugs(args: string[]): StandaloneSlug[] {
  if (!args.length || args.join(" ") === "--all") return [...STANDALONE_SLUGS];
  return [...new Set(args)].map(slug => {
    if (!STANDALONE_SLUGS.includes(slug as StandaloneSlug)) throw new Error(`Unsupported standalone template: ${slug}`);
    return slug as StandaloneSlug;
  });
}
