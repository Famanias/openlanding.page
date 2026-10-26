import { ASSETS } from "./assets.generated";

const BASE = "/templates/lucentra";
export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp") {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

export function Picture({ assetKey, alt, className = "", priority = false }: { assetKey: string; alt: string; className?: string; priority?: boolean }) {
  const source = assetSrc(assetKey, 800);
  if (!source) return <div className={`lc-placeholder ${className}`} role="img" aria-label={alt} data-asset={assetKey}><span>{assetKey}</span></div>;
  const { w, h } = ASSETS[assetKey];
  return <img className={className} src={source} srcSet={`${assetSrc(assetKey, 800, "webp")} 800w, ${assetSrc(assetKey, 1600, "webp")} 1600w`} width={w} height={h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} />;
}
