import { ASSETS } from "./assets.generated";

const BASE = "/templates/nulo";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

export function Picture({ assetKey, alt, className }: { assetKey: string; alt: string; className?: string }) {
  const source = assetSrc(assetKey, 800);
  if (!source) {
    return <div className={`nu-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}><span className="nu-mono">{assetKey}</span></div>;
  }
  const { w, h } = ASSETS[assetKey];
  return <img className={className} src={source} srcSet={`${source} 800w, ${assetSrc(assetKey, 1600)} 1600w`} sizes="(min-width: 900px) 50vw, 100vw" width={w} height={h} alt={alt} loading="lazy" decoding="async" />;
}
