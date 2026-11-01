import { ASSETS } from "./assets.generated";

export function Picture({ assetKey, name, monogram }: { assetKey: string; name: string; monogram: string }) {
  const asset = ASSETS[assetKey];
  if (!asset) return <div className="lx-image-placeholder" role="img" aria-label={`${name} project image placeholder, 16 by 9`} data-asset={assetKey}><span className="lx-placeholder-top"><span>IMAGE SLOT / 16:9</span><span>↗</span></span><span className="lx-placeholder-letter" aria-hidden="true">{monogram}</span><span className="lx-placeholder-bottom"><span>{name.toUpperCase()} / PREVIEW</span><span>IMAGE TO COME</span></span></div>;
  const src = (width: number, format: string) => `/templates/landingx/${assetKey}-${width}.${format}`;
  return <picture className="lx-project-picture"><source type="image/avif" srcSet={`${src(800, "avif")} 800w, ${src(1600, "avif")} 1600w`} sizes="(min-width: 800px) 48vw, 100vw"/><img src={src(800, "webp")} srcSet={`${src(800, "webp")} 800w, ${src(1600, "webp")} 1600w`} sizes="(min-width: 800px) 48vw, 100vw" width={asset.w} height={asset.h} alt={`${name} landing page`} loading="lazy" decoding="async" data-asset={assetKey}/></picture>;
}
