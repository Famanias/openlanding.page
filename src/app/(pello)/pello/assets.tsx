import { ASSETS } from "./assets.generated";
type Props = { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean };
export function Picture({ assetKey, alt, className = "", sizes = "(min-width: 900px) 50vw, 100vw", priority = false }: Props) {
  const asset = ASSETS[assetKey];
  if (!asset) return <div className={"pel-placeholder " + className} role="img" aria-label={alt}><span>{assetKey}</span></div>;
  const src = (w: number, format = "webp") => "/templates/pello/" + assetKey + "-" + w + "." + format;
  return <picture className={className}><source type="image/avif" srcSet={src(800, "avif") + " 800w, " + src(1600, "avif") + " 1600w"} sizes={sizes}/><img src={src(800)} srcSet={src(800) + " 800w, " + src(1600) + " 1600w"} sizes={sizes} width={asset.w} height={asset.h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" data-asset={assetKey}/></picture>;
}
