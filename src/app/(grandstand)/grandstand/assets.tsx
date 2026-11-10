import { ASSETS } from "./assets.generated";

type PictureProps = { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean };
export function Picture({ assetKey, alt, className, sizes = "(min-width: 900px) 60vw, 100vw", priority = false }: PictureProps) {
  const asset = ASSETS[assetKey];
  if (!asset) return <div className={`gs-placeholder ${className ?? ""}`} role="img" aria-label={alt}>{assetKey}</div>;
  const base = `/templates/grandstand/${assetKey}`;
  return <picture className={className}><source type="image/avif" srcSet={`${base}-800.avif 800w, ${base}-1600.avif 1600w`} sizes={sizes}/><img src={`${base}-800.webp`} srcSet={`${base}-800.webp 800w, ${base}-1600.webp 1600w`} sizes={sizes} width={asset.w} height={asset.h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" data-asset={assetKey}/></picture>;
}
