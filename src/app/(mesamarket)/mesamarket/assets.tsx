import { ASSETS } from "./assets.generated";

const BASE = "/templates/mesamarket";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean };

export function Picture({ assetKey, alt, className, sizes = "(min-width: 900px) 50vw, 100vw", priority = false }: PictureProps) {
  const asset = ASSETS[assetKey];
  if (!asset) {
    return (
      <div className={`mm-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="mm-mono">{assetKey}</span>
      </div>
    );
  }
  const set = (f: "webp" | "avif") => `${assetSrc(assetKey, 800, f)} 800w, ${assetSrc(assetKey, 1600, f)} 1600w`;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img
        src={`${BASE}/${assetKey}-800.webp`}
        srcSet={set("webp")}
        sizes={sizes}
        width={asset.w}
        height={asset.h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        data-asset={assetKey}
      />
    </picture>
  );
}
