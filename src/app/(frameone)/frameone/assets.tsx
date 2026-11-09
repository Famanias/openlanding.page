import { ASSETS } from "./assets.generated";

type PictureProps = { assetKey: string; alt: string; className?: string; priority?: boolean; sizes?: string };

export function Picture({ assetKey, alt, className = "", priority = false, sizes = "(min-width: 900px) 50vw, 100vw" }: PictureProps) {
  const asset = ASSETS[assetKey];
  if (!asset) return <span className={`fo-picture fo-placeholder ${className}`} data-asset={assetKey} data-art={assetKey.slice(1, 2)} role={alt ? "img" : undefined} aria-label={alt ? `${alt}. Image awaiting delivery.` : undefined} aria-hidden={alt ? undefined : true}>
    <span className="fo-placeholder__shape" aria-hidden="true" />
    <span className="fo-placeholder__label">IMAGE PENDING / {assetKey}</span>
  </span>;
  const base = `/templates/frameone/${assetKey}`;
  return <picture className={`fo-picture ${className}`} data-asset={assetKey}>
    <source type="image/avif" srcSet={`${base}-800.avif 800w, ${base}-1600.avif 1600w`} sizes={sizes} />
    {/* Processed responsive assets are local, dimensioned, and shared with copy bundles. */}
    <img src={`${base}-800.webp`} srcSet={`${base}-800.webp 800w, ${base}-1600.webp 1600w`} sizes={sizes} width={asset.w} height={asset.h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" />
  </picture>;
}

export function Grain() {
  const key = "12-grain-overlay";
  if (!ASSETS[key]) return null;
  return <span className="fo-grain" aria-hidden="true" style={{ backgroundImage: `url(/templates/frameone/${key}-800.webp)` }} />;
}
