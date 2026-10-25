import React from "react";
import { ASSETS } from "./assets.generated";

const BASE = "/templates/valence";

export function assetSrc(
  key: string,
  width: 800 | 1600,
  format: "webp" | "avif" = "webp",
): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = {
  assetKey: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function Picture({
  assetKey,
  alt,
  className,
  sizes = "(min-width: 900px) 50vw, 100vw",
  priority,
}: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div
        className={`vl-placeholder ${className ?? ""}`}
        role="img"
        aria-label={alt}
        data-asset={assetKey}
      >
        <svg
          viewBox="0 0 320 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          aria-hidden="true"
        >
          <rect width="320" height="200" rx="24" fill="#E8E0F8" />
          <circle cx="96" cy="100" r="46" fill="#D9F2E6" stroke="#1E1B2E" strokeWidth="2" />
          <circle cx="160" cy="100" r="46" fill="#FCE2D5" stroke="#1E1B2E" strokeWidth="2" />
          <circle cx="224" cy="100" r="30" fill="#5B46E8" />
        </svg>
        <span className="vl-mono text-xs">{assetKey}</span>
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
