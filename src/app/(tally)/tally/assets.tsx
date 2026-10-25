import { ASSETS } from "./assets.generated";

const BASE = "/templates/tally";

export function assetSrc(
  key: string,
  width: 800 | 1600,
  format: "webp" | "avif" = "webp"
): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = {
  assetKey: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  children?: React.ReactNode;
};

export function Picture({
  assetKey,
  alt,
  className,
  sizes = "(min-width: 900px) 50vw, 100vw",
  priority,
  children,
}: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div
        className={`tl-placeholder ${className ?? ""}`}
        role="img"
        aria-label={alt}
        data-asset={assetKey}
      >
        {children ?? <span className="tl-mono">{assetKey}</span>}
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (f: "webp" | "avif") =>
    `${assetSrc(assetKey, 800, f)} 800w, ${assetSrc(assetKey, 1600, f)} 1600w`;
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
