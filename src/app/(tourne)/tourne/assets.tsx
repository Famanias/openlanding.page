import { ASSETS } from "./assets.generated";

const BASE = "/templates/tourne";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean };

/** Responsive <picture>, or a labelled placeholder until the generated image exists. */
export function Picture({ assetKey, alt, className, sizes = "(min-width: 900px) 40vw, 100vw", priority }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div className={`tn-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="tn-mono">{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (format: "webp" | "avif") => `${assetSrc(assetKey, 800, format)} 800w, ${assetSrc(assetKey, 1600, format)} 1600w`;
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
