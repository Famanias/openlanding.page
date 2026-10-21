import { ASSETS } from "./assets.generated";

const BASE = "/templates/wowflutter";

/** URL for a processed (ink-on-stock) image, or null when the owner hasn't generated it yet. */
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

/** A responsive <picture>, or a labelled placeholder block until the image exists. */
export function Picture({ assetKey, alt, className, sizes = "(min-width: 1000px) 40vw, 90vw", priority }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div className={`wf-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="wf-label">{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (format: "webp" | "avif") =>
    `${assetSrc(assetKey, 800, format)} 800w, ${assetSrc(assetKey, 1600, format)} 1600w`;
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

/** A picture on a printed plate: the image sits on stock with a pink pass printed a few millimetres off-register. */
export function Plate({ className, ...picture }: PictureProps) {
  return (
    <figure className={`wf-plate ${className ?? ""}`}>
      <Picture {...picture} />
    </figure>
  );
}
