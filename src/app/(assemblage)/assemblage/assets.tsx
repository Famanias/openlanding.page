import { ASSETS } from "./assets.generated";

const BASE = "/templates/assemblage";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp") {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

export function Picture({ assetKey, alt, className }: { assetKey: string; alt: string; className?: string }) {
  const source = assetSrc(assetKey, 800);
  if (!source) return <div className={`as-placeholder ${className ?? ""}`} role="img" aria-label={alt}>{assetKey}</div>;
  return <img src={source} alt={alt} className={className} width={ASSETS[assetKey].w} height={ASSETS[assetKey].h} loading="lazy" />;
}
