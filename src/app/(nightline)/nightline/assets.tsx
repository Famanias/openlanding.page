import type { ReactNode } from "react";
import { ASSETS } from "./assets.generated";

const BASE = "/templates/nightline";

export function hasAsset(key: string): boolean {
  return key in ASSETS;
}

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

export type PictureProps = {
  assetKey?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  children?: ReactNode;
};

export function Picture({
  assetKey,
  alt,
  className,
  sizes = "(min-width: 900px) 40vw, 100vw",
  priority = false,
  children,
}: PictureProps) {
  const webp800 = assetKey ? assetSrc(assetKey, 800) : null;
  if (!webp800 || !assetKey) {
    if (children !== undefined) return <>{children}</>;
    return (
      <div className={`nli-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span>{assetKey ?? "placeholder"}</span>
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
