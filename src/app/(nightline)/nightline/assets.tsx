import { ASSETS } from "./assets.generated";
const BASE = "/templates/nightline";
export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp") { return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null; }
export function Picture({ assetKey, alt, className = "", priority = false }: { assetKey: string; alt: string; className?: string; priority?: boolean }) { const src = assetSrc(assetKey, 800); if (!src) return <div className={`nli-placeholder ${className}`} role="img" aria-label={alt} data-asset={assetKey}><span>{assetKey}</span></div>; const { w, h } = ASSETS[assetKey]; return <img className={className} src={src} width={w} height={h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} />; }
