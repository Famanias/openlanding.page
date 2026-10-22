import { ASSETS } from "./assets.generated";

const BASE = "/templates/isobar";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp") {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

export function Picture({ assetKey, alt, className = "", sizes = "100vw", priority = false }: { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean }) {
  const src = assetSrc(assetKey, 800);
  if (!src) return <div className={`iso-placeholder ${className}`} role="img" aria-label={alt} data-asset={assetKey}><span className="iso-mono">{assetKey}</span></div>;
  const { w, h } = ASSETS[assetKey];
  return <picture className={className}><source type="image/avif" srcSet={`${assetSrc(assetKey, 800, "avif")} 800w, ${assetSrc(assetKey, 1600, "avif")} 1600w`} sizes={sizes} /><img src={src} srcSet={`${src} 800w, ${assetSrc(assetKey, 1600)} 1600w`} sizes={sizes} width={w} height={h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" /></picture>;
}
