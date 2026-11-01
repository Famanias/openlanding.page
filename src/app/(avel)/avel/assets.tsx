import { ASSETS } from "./assets.generated";
type Props = { assetKey: string; alt: string; className?: string; priority?: boolean };
export function Picture({ assetKey, alt, className = "", priority = false }: Props) {
  const asset = ASSETS[assetKey];
  if (!asset) return <div className={`avl-placeholder ${className}`} role="img" aria-label={alt} />;
  const src = (w: number, f: string) => `/templates/avel/${assetKey}-${w}.${f}`;
  return <picture className={className}><source type="image/avif" srcSet={`${src(800, "avif")} 800w, ${src(1600, "avif")} 1600w`} sizes="100vw"/><img src={src(1600, "webp")} srcSet={`${src(800, "webp")} 800w, ${src(1600, "webp")} 1600w`} sizes="100vw" width={asset.w} height={asset.h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" data-asset={assetKey}/></picture>;
}
