import type {TemplateSlug} from "../data/templates";

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
}
