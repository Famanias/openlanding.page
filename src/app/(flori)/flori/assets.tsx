import { ASSETS } from "./assets.generated";
export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp") {
  return key in ASSETS ? `/templates/flori/${key}-${width}.${format}` : null;
}
export function Picture({ assetKey, alt, className, priority = false }: { assetKey: string; alt: string; className?: string; priority?: boolean }) {
  const src = assetSrc(assetKey, 800);
  if (!src) return <div className={`fl-placeholder ${className ?? ""}`} role="img" aria-label={alt}><span>{assetKey}</span></div>;
  const { w, h } = ASSETS[assetKey];
  return <picture className={className}><source type="image/avif" srcSet={`${assetSrc(assetKey, 800, "avif")} 800w, ${assetSrc(assetKey, 1600, "avif")} 1600w`} sizes="(min-width:900px) 33vw,100vw" /><img src={src} width={w} height={h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" /></picture>;
}
