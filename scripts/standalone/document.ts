import fs from "node:fs";
import path from "node:path";
import { AssetStore } from "./assets";

export function extractDocument(html: string, root: string, assets: AssetStore, fontPreloadHeader = "") {
  // Next emits font hints in prerender metadata/HTTP Link headers, outside the HTML.
  const fontPreloads = [...new Set([...fontPreloadHeader.matchAll(/<([^>]+)>([^,]*)(?:,|$)/g)]
    .filter(([, , attrs]) => /(?:^|;)\s*rel=(?:"preload"|preload)(?:;|$)/.test(attrs) && /(?:^|;)\s*as=(?:"font"|font)(?:;|$)/.test(attrs))
    .map(([, url]) => {
      const embedded = assets.add(url, undefined, false);
      if (!embedded.startsWith("data:font/")) throw new Error(`Invalid font preload: ${url}`);
      const type = embedded.slice(5, embedded.indexOf(";"));
      return `<link rel="preload" as="font" type="${type}" crossorigin="anonymous" href="${embedded}">`;
    }))].join("\n");
  const links = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)];
  const styles = links.filter(([tag]) => /href="\/_next\/static\//.test(tag)).map(([tag]) => {
    const href = tag.match(/href="([^"]+)"/)?.[1];
    if (!href?.startsWith("/_next/static/")) throw new Error("Unexpected production stylesheet");
    const file = path.resolve(root, ".next", href.slice(7));
    if (!file.startsWith(path.resolve(root, ".next") + path.sep)) throw new Error("Invalid stylesheet path");
    return assets.css(fs.readFileSync(file, "utf8"), file);
  });
  if (!styles.length) throw new Error("Missing production styles; build the site first");
  let css = styles.join("\n");
  for (const [tag] of links.filter(([tag]) => !/href="\/_next\/static\//.test(tag))) {
    const href=tag.match(/href="([^"]+)"/)?.[1]?.replace(/&amp;/g,"&");
    if (!href) throw new Error("Unexpected production stylesheet");
    const url=new URL(href);
    const families=url.searchParams.getAll("family").map(family=>family.split(":")[0]);
    // Some templates redundantly link the same Google families already supplied by next/font.
    if (url.hostname!=="fonts.googleapis.com" || !families.length) throw new Error(`Unexpected external stylesheet: ${href}`);
    for (const family of families) {
      if (css.includes(`font-family:${family}`) || css.includes(`font-family:"${family}"`)) continue;
      const faces=new Set<string>();
      for(const entry of fs.readdirSync(path.join(root,".next/static"),{recursive:true,withFileTypes:true}).filter(entry=>entry.isFile()&&entry.name.endsWith(".css"))){
        const file=path.join(entry.parentPath,entry.name);
        for(const [face] of fs.readFileSync(file,"utf8").matchAll(/@font-face\s*\{[^}]*\}/g)){
          const actual=face.match(/font-family:\s*(?:"([^"]+)"|'([^']+)'|([^;]+))/);
          if((actual?.[1]??actual?.[2]??actual?.[3])?.trim()===family)faces.add(assets.css(face,file));
        }
      }
      if(!faces.size)throw new Error(`External font is not available in the local build: ${family}`);
      css+="\n"+[...faces].join("\n");
    }
  }
  if (/<\/style/i.test(css)) throw new Error("Unsafe closing style tag in CSS");
  const initialization = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter(([, attrs, code]) => !/\bsrc=/.test(attrs) && /document\.documentElement/.test(code) && !/__next_f|\/_next\//.test(code))
    .map(([, , code]) => `<script>${code}</script>`).join("\n");
  return {
    fontPreloads,
    htmlAttributes: html.match(/<html\b([^>]*)>/)?.[1] ?? ' lang="en"',
    bodyAttributes: html.match(/<body\b([^>]*)>/)?.[1] ?? "",
    title: html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "Landing page",
    metadata: [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => tag).filter(tag => /name="(?:description|theme-color|color-scheme|viewport)"/.test(tag)).join("\n"),
    css,
    initialization,
    // Form notices are rendered by the page itself; only carry layout fallback styles.
    noscript: [...html.matchAll(/<noscript\b[^>]*>\s*<style\b[^>]*>[\s\S]*?<\/style>\s*<\/noscript>/g)].map(([tag]) => tag).join("\n"),
  };
}
