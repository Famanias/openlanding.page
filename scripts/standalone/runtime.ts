export type ExportConfig = { slug: string; assets: Record<string, string>; aliases?: Record<string, string> };

export function createAssetRegistry(input:{slug:string;values:string[];paths:[string,number][];aliases:Record<string,string>}){
  let enabled=false;
  const urls=new Map<number,string>();
  const value=(index:number)=>{
    const uri=input.values[index];
    if(!enabled)return uri;
    const cached=urls.get(index);if(cached)return cached;
    const comma=uri.indexOf(","),binary=atob(uri.slice(comma+1));
    const bytes=new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
    const url=URL.createObjectURL(new Blob([bytes],{type:uri.slice(5,uri.indexOf(";"))}));
    urls.set(index,url);return url;
  };
  const config:ExportConfig={slug:input.slug,assets:{},aliases:input.aliases};
  for(const [key,index] of input.paths)Object.defineProperty(config.assets,key,{enumerable:true,get:()=>value(index)});
  return {config,resolveAsset:<T>(asset:T)=>resolveEmbeddedAsset(asset,config),enableRuntimeAssets:()=>{enabled=true;}};
}

export function resolveEmbeddedAsset<T>(value: T, config: ExportConfig): T | string {
  if (typeof value !== "string" || (!value.startsWith("/templates/") && !value.startsWith("/assets/"))) return value;
  const key = value.split(/[?#]/)[0];
  const result = config.assets[config.aliases?.[key] ?? key];
  if (!result) throw new Error(`Unregistered or missing standalone asset: ${value}`);
  return result;
}

export function normalizeNavigation<T extends string | URL | null | undefined>(url: T, slug: string): T | string {
  if (typeof url === "string" && (url === `/${slug}` || url.startsWith(`/${slug}?`) || url.startsWith(`/${slug}#`))) return url.slice(slug.length + 1) || "#top";
  return url;
}

export function installNavigation(slug: string) {
  for (const method of ["pushState", "replaceState"] as const) {
    const original = window.history[method].bind(window.history);
    window.history[method] = (data, unused, url) => original(data, unused, normalizeNavigation(url, slug));
  }
}

/** Shared by the server renderer and browser bundle so hydration sees identical URLs. */
export function adaptProps(type: unknown, props: Record<string, unknown> | null, config: ExportConfig): Record<string, unknown> | null {
  if (typeof type !== "string" || !props) return props;
  const resolve = (value: string): string => {
    return resolveEmbeddedAsset(value, config);
  };
  const output = { ...props };
  if(typeof props.src==="string"&&/^\/(?:templates|assets)\//.test(props.src))output["data-standalone-src"]=props.src;
  if(props.style&&typeof props.style==="object"&&"backgroundImage" in props.style&&typeof props.style.backgroundImage==="string"&&props.style.backgroundImage.includes("/templates/"))output["data-standalone-background"]=props.style.backgroundImage;
  for (const key of ["src", "poster", "href", "xlinkHref"]) {
    const value = output[key];
    if (typeof value !== "string") continue;
    if (type === "a" && key === "href" && (value === `/${config.slug}` || value.startsWith(`/${config.slug}?`) || value.startsWith(`/${config.slug}#`))) {
      output[key] = normalizeNavigation(value, config.slug);
    } else output[key] = resolve(value);
  }
  if (typeof output.srcSet === "string" && !output.srcSet.startsWith("data:")) {
    output.srcSet = output.srcSet.split(",").map(candidate => {
      const [url, ...descriptor] = candidate.trim().split(/\s+/);
      return [resolve(url), ...descriptor].join(" ");
    }).join(", ");
  }
  if (output.style && typeof output.style === "object") {
    output.style = Object.fromEntries(Object.entries(output.style).map(([key, value]) => [key, typeof value === "string" ? value.replace(/url\(["']?([^"')]+)["']?\)/g, (_, url: string) => `url("${resolve(url)}")`) : value]));
  }
  return output;
}
