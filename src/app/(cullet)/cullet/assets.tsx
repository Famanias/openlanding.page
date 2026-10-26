import type { ReactNode } from "react";
import { ASSETS } from "./assets.generated";

const BASE = "/templates/cullet";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean; children?: ReactNode };

/**
 * A responsive picture once `npm run images -- cullet` has produced the file.
 * Cullet ships without photography: until a render exists this shows `children`
 * (the drawn swatch or poster that is part of the template), or a labelled placeholder.
 */
export function Picture({ assetKey, alt, className, sizes = "(min-width: 900px) 33vw, 90vw", priority, children }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    if (children) return <>{children}</>;
    return (
      <div className={`fc-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="fc-mono">{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (f: "webp" | "avif") => `${assetSrc(assetKey, 800, f)} 800w, ${assetSrc(assetKey, 1600, f)} 1600w`;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img src={webp800} srcSet={set("webp")} sizes={sizes} width={w} height={h} alt={alt}
        loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" data-asset={assetKey} />
    </picture>
  );
}
