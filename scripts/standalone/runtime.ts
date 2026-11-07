export type ExportConfig = { slug: string; assets: Record<string, string>; aliases?: Record<string, string> };

export function normalizeNavigation<T extends string | URL | null | undefined>(url: T, slug: string): T | string {
  if (typeof url === "string" && (url === `/${slug}` || url.startsWith(`/${slug}?`) || url.startsWith(`/${slug}#`))) return url.slice(slug.length + 1) || "#top";
  return url;
}

export function installNavigation(slug: string) {
  for (const method of ["pushState", "replaceState"] as const) {
    const original = window.history[method].bind(window.history);
    window.history[method] = (data, unused, url) => original(data, unused, normalizeNavigation(url, slug));
  }
}

/** Shared by the server renderer and browser bundle so hydration sees identical URLs. */
export function adaptProps(type: unknown, props: Record<string, unknown> | null, config: ExportConfig): Record<string, unknown> | null {
  if (typeof type !== "string" || !props) return props;
  const resolve = (value: string): string => {
    if (!value.startsWith("/templates/")) return value;
    const result = config.assets[config.aliases?.[value] ?? value];
    if (!result) throw new Error(`Unregistered or missing standalone asset: ${value}`);
    return result;
  };
  const output = { ...props };
  for (const key of ["src", "poster", "href", "xlinkHref"]) {
    const value = output[key];
    if (typeof value !== "string") continue;
    if (type === "a" && key === "href" && (value === `/${config.slug}` || value.startsWith(`/${config.slug}?`) || value.startsWith(`/${config.slug}#`))) {
      output[key] = normalizeNavigation(value, config.slug);
    } else output[key] = resolve(value);
  }
  if (typeof output.srcSet === "string" && !output.srcSet.startsWith("data:")) {
    output.srcSet = output.srcSet.split(",").map(candidate => {
      const [url, ...descriptor] = candidate.trim().split(/\s+/);
      return [resolve(url), ...descriptor].join(" ");
    }).join(", ");
  }
  if (output.style && typeof output.style === "object") {
    output.style = Object.fromEntries(Object.entries(output.style).map(([key, value]) => [key, typeof value === "string" ? value.replace(/url\(["']?([^"')]+)["']?\)/g, (_, url: string) => `url("${resolve(url)}")`) : value]));
  }
  return output;
}
