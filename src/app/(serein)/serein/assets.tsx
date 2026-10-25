import { ASSETS } from "./assets.generated";

const BASE = "/templates/serein";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

export function Picture({ assetKey, alt, className }: { assetKey: string; alt: string; className?: string }) {
  const source = assetSrc(assetKey, 800);
  if (!source) {
    return (
      <div className={`sr-picture-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span>{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  return <img src={source} width={w} height={h} alt={alt} className={className} loading="eager" decoding="async" fetchPriority="high" />;
}
