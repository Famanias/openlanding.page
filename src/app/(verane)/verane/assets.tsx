import { ASSETS } from "./assets.generated";

const BASE = "/templates/verane";

/** URL for a processed image, or null when not yet generated. */
export function assetSrc(
  key: string,
  width: 800 | 1600,
  format: "webp" | "avif" = "webp",
): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

export type PictureProps = {
  assetKey: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  aspectRatio?: string;
  dark?: boolean;
};

/**
 * A responsive <picture>, or a styled placeholder block labeled with its assetKey.
 */
export function Picture({
  assetKey,
  alt,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  aspectRatio,
  dark,
}: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div
        className={`vr-placeholder ${dark ? "vr-placeholder--dark" : ""} ${className ?? ""}`}
        style={aspectRatio ? { aspectRatio } : undefined}
        role="img"
        aria-label={alt}
        data-asset={assetKey}
      >
        <span className="vr-mono">{assetKey}</span>
        <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>{alt}</span>
      </div>
    );
  }

  const { w, h } = ASSETS[assetKey];
  const set = (format: "webp" | "avif") =>
    `${assetSrc(assetKey, 800, format)} 800w, ${assetSrc(assetKey, 1600, format)} 1600w`;

  return (
    <picture className={className} style={aspectRatio ? { aspectRatio } : undefined}>
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
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </picture>
  );
}
