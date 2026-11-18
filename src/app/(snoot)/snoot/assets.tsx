import { ASSETS } from "./assets.generated";

const BASE = "/templates/snoot";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = {
  assetKey: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** Only an above-the-fold image: loads eagerly with high fetch priority. */
  priority?: boolean;
};

/** Responsive <picture>, or a labelled placeholder if the processed image is missing. */
export function Picture({ assetKey, alt, className, sizes = "(min-width: 900px) 50vw, 100vw", priority }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div className={`sn-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="sn-chart">{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  // the pipeline never enlarges, so the "1600" file of a 1,376 px plate is 1,376 px wide
  const large = Math.min(1600, w);
  const small = Math.min(800, w);
  const set = (format: "webp" | "avif") => `${assetSrc(assetKey, 800, format)} ${small}w, ${assetSrc(assetKey, 1600, format)} ${large}w`;
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
        decoding={priority ? "sync" : "async"}
        draggable={false}
        data-asset={assetKey}
      />
    </picture>
  );
}
