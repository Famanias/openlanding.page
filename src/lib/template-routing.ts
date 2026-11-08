type TemplateRedirect = { source: string; destination: string; permanent: true };
type TemplateRewrite = { source: string; destination: string };

/** Public page URL; template source directories and media paths are independent. */
export function templatePath(slug: string): string {
  return `/templates/${slug}`;
}

/** Explicit mounts keep unrelated routes outside the migration. */
export function createTemplateRouting(slugs: readonly string[]): {
  redirects: TemplateRedirect[];
  rewrites: TemplateRewrite[];
} {
  const uniqueSlugs = [...new Set(slugs)];
  const redirects: TemplateRedirect[] = uniqueSlugs.map(slug => ({
    source: `/${slug}/:path*`, destination: `${templatePath(slug)}/:path*`, permanent: true,
  }));
  for (const [alias, slug] of [["kinetix", "synapxe"], ["cyberpunk", "synapxe"], ["cairn", "keytu"]]) {
    for (const prefix of ["", "/templates"]) {
      redirects.push({ source: `${prefix}/${alias}/:path*`, destination: `${templatePath(slug)}/:path*`, permanent: true });
    }
  }
  return {
    redirects,
    rewrites: uniqueSlugs.map(slug => ({ source: `${templatePath(slug)}/:path*`, destination: `/${slug}/:path*` })),
  };
}
