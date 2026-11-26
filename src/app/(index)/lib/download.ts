import type {TemplateSlug} from "../data/templates";

// shortcut: client-side beacon only counts clicks from gallery/detail pages; direct URL fetches to /downloads/<slug>.html aren't counted unless routed through a redirect endpoint.
export function trackDownload(slug:TemplateSlug):void{
  const url=`/api/downloads/${slug}`;
  try{
    if(typeof navigator!=="undefined"&&typeof navigator.sendBeacon==="function"&&navigator.sendBeacon(url))return;
    void fetch(url,{method:"POST",keepalive:true}).catch(()=>{});
  }catch{
    // Tracking must never block or fail a file download.
  }
}

/** Let the browser stream large media exports to disk instead of buffering them in the app. */
export async function downloadStandalone(slug:TemplateSlug):Promise<void>{
  const url=`/downloads/${slug}.html`;
  const response=await fetch(url,{method:"HEAD"});
  if(!response.ok)throw new Error("HTML unavailable");
  const anchor=document.createElement("a");
  anchor.href=url;
  anchor.download=`${slug}.html`;
  document.body.appendChild(anchor);
  try{anchor.click();}finally{anchor.remove();}
  trackDownload(slug);
}
