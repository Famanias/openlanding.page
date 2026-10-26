import { ASSETS } from "./assets.generated";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp") {
  return key in ASSETS ? `/templates/starlight/${key}-${width}.${format}` : null;
}

export function Picture({ assetKey, alt, className = "" }: { assetKey: string; alt: string; className?: string }) {
  const src = assetSrc(assetKey, 800);
  if (!src) {
    return <div className={`stl-placeholder ${className}`} role="img" aria-label={alt}><span>{assetKey}</span></div>;
  }
  const { w, h } = ASSETS[assetKey];
  return <img className={className} src={src} width={w} height={h} alt={alt} loading="lazy" decoding="async" />;
}
