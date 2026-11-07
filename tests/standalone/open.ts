import path from "node:path";
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import type { Page } from "@playwright/test";
import { selectSlugs } from "../../scripts/standalone/config";

/** Run the original interaction suites against real file origins, including query/hash state. */
export function openStandalone(page: Page, href: string, options?: Parameters<Page["goto"]>[1]) {
  if (href === "about:blank") return page.goto(href, options);
  const url = new URL(href, "http://localhost:3100");
  const [slug] = selectSlugs([url.pathname.replace(/^\//, "")]);
  const file = pathToFileURL(path.resolve(process.env.STANDALONE_DIRECTORY ?? "public/downloads", `${slug}.html`));
  file.search = url.search;
  file.hash = url.hash;
  return page.goto(file.href, options);
}

/** Offline equivalent of legacy HTTP asset-existence preconditions; no network receipt is simulated. */
export async function localAssetStatus(href: string, root = process.cwd()) {
  if(!href.startsWith("/templates/"))throw new Error("Only local template assets can be checked");
  const directory=path.resolve(root,"public");
  const file=path.resolve(directory,"."+decodeURIComponent(href.split(/[?#]/)[0]));
  const relative=path.relative(directory,file);
  if(relative===".."||relative.startsWith(`..${path.sep}`)||path.isAbsolute(relative))throw new Error("Asset escapes public directory");
  let exists=false;
  if(fs.existsSync(file)){
    const real=path.relative(fs.realpathSync(directory),fs.realpathSync(file));
    if(real===".."||real.startsWith(`..${path.sep}`)||path.isAbsolute(real))throw new Error("Asset symlink escapes public directory");
    exists=fs.statSync(file).isFile();
  }
  return {ok:()=>exists,status:()=>exists?200:404};
}
