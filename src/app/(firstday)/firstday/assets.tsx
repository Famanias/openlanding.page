import { ASSETS } from "./assets.generated";
export function assetSrc(
  key: string,
  width: 800 | 1600,
  format: "webp" | "avif" = "webp",
) {
  return key in ASSETS ? `/templates/firstday/${key}-${width}.${format}` : null;
}
export function Picture({
  assetKey,
  alt,
  className = "",
  priority = false,
  sizes = "100vw",
}: {
  assetKey: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const asset = ASSETS[assetKey];
  if (!asset)
    return (
      <div
        className={`fd-placeholder ${className}`}
        role="img"
        aria-label={alt}
      >
        <span>{assetKey}</span>
      </div>
    );
  return (
    <picture className={className}>
      <source
        type="image/avif"
        srcSet={`${assetSrc(assetKey, 800, "avif")} 800w, ${assetSrc(assetKey, 1600, "avif")} 1600w`}
        sizes={sizes}
      />
      <img
        src={assetSrc(assetKey, 1600)!}
        srcSet={`${assetSrc(assetKey, 800)} 800w, ${assetSrc(assetKey, 1600)} 1600w`}
        sizes={sizes}
        width={asset.w}
        height={asset.h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </picture>
  );
}
