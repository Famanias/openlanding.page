import { ASSETS } from "./assets.generated";

const BASE = "/templates/radius";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = {
  assetKey: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function Picture({ assetKey, alt, className, sizes = "(min-width: 900px) 60vw, 100vw", priority = false }: PictureProps) {
  const src = assetSrc(assetKey, 800);
  if (!src) {
    return <div className={`rd-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>{assetKey}</div>;
  }
  const { w, h } = ASSETS[assetKey];
  const srcSet = (format: "webp" | "avif") => `${assetSrc(assetKey, 800, format)} 800w, ${assetSrc(assetKey, 1600, format)} 1600w`;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <img src={src} srcSet={srcSet("webp")} sizes={sizes} width={w} height={h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" data-asset={assetKey} />
    </picture>
  );
}
