import { ASSETS } from "./assets.generated";

type PictureProps = { assetKey: string; alt: string; className?: string; priority?: boolean; sizes?: string };

export function Picture({ assetKey, alt, className = "", priority = false, sizes = "(min-width: 900px) 50vw, 100vw" }: PictureProps) {
  const asset = ASSETS[assetKey];
  if (!asset) {
    return <div className={`ar-placeholder ${className}`} role="img" aria-label={`${alt}. Image awaiting generation.`} data-asset={assetKey}><span>IMAGE STUDY / {assetKey.replaceAll("-", " ")}</span></div>;
  }
  const base = `/templates/aerune/${assetKey}`;
  return <picture className={className} data-asset={assetKey}>
    <source type="image/avif" srcSet={`${base}-800.avif 800w, ${base}-1600.avif 1600w`} sizes={sizes} />
    <img src={`${base}-800.webp`} srcSet={`${base}-800.webp 800w, ${base}-1600.webp 1600w`} sizes={sizes} width={asset.w} height={asset.h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" />
  </picture>;
}
