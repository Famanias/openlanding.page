import { ASSETS } from "./assets.generated";

const BASE = "/templates/volume-zero";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

export function Picture({ assetKey, alt, className }: { assetKey: string; alt: string; className?: string }) {
  const src = assetSrc(assetKey, 800);
  if (!src) {
    return <div className={`vz-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}><span>{assetKey}</span></div>;
  }
  const { w, h } = ASSETS[assetKey];
  // The asset pipeline owns these dimensions and emits responsive variants.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={src} width={w} height={h} alt={alt} loading="lazy" decoding="async" />;
}
