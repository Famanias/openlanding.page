import { ASSETS } from "./assets.generated";

const BASE = "/templates/tolvar";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = {
  assetKey: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** Only the hero photo: loads eagerly with high fetch priority. */
  priority?: boolean;
};

/** Responsive <picture>, or a labelled placeholder if the processed photo is missing. */
export function Picture({ assetKey, alt, className, sizes = "(min-width: 900px) 50vw, 100vw", priority }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div className={`tv-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="tv-gauge">{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  // the pipeline never enlarges: these are phone photos, most 1,280 px wide or less
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
