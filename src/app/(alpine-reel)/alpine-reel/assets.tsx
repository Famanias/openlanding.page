import { ASSETS } from "./assets.generated";

const BASE = "/templates/alpine-reel";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

export function Picture({ assetKey, alt, className = "", priority = false }: { assetKey: string; alt: string; className?: string; priority?: boolean }) {
  const source = assetSrc(assetKey, 800);
  if (!source) return <div className={`arl-placeholder ${className}`} role="img" aria-label={alt} data-asset={assetKey}><span>{assetKey}</span></div>;
  const asset = ASSETS[assetKey];
  return <img className={className} src={source} srcSet={`${source} 800w, ${assetSrc(assetKey, 1600)} 1600w`} width={asset.w} height={asset.h} alt={alt} loading={priority ? "eager" : "lazy"} />;
}
