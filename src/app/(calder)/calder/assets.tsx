import { ASSETS } from "./assets.generated";

const BASE = "/templates/calder";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean };

/** A responsive <picture> once the image has been processed; until then a labelled placeholder that holds the box. */
export function Picture({ assetKey, alt, className, sizes = "(min-width: 900px) 40vw, 100vw", priority }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div className={`cr-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <svg className="cr-placeholder__art" viewBox="0 0 120 150" fill="none" aria-hidden="true">
          <circle cx="60" cy="52" r="20" />
          <path d="M20 150c0-30 17-52 40-52s40 22 40 52" />
        </svg>
        <span className="cr-mono">{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (f: "webp" | "avif") => `${assetSrc(assetKey, 800, f)} 800w, ${assetSrc(assetKey, 1600, f)} 1600w`;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img
        src={webp800}
        srcSet={set("webp")}
        sizes={sizes}
        width={w}
        height={h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        data-asset={assetKey}
      />
    </picture>
  );
}
