import fs from "node:fs";
import path from "node:path";
import { AssetStore } from "./assets";

export function extractDocument(html: string, root: string, assets: AssetStore) {
  const styles = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)].map(([tag]) => {
    const href = tag.match(/href="([^"]+)"/)?.[1];
    if (!href?.startsWith("/_next/static/")) throw new Error("Unexpected production stylesheet");
    const file = path.resolve(root, ".next", href.slice(7));
    if (!file.startsWith(path.resolve(root, ".next") + path.sep)) throw new Error("Invalid stylesheet path");
    return assets.css(fs.readFileSync(file, "utf8"), file);
  });
  if (!styles.length) throw new Error("Missing production styles; build the site first");
  const css = styles.join("\n");
  if (/<\/style/i.test(css)) throw new Error("Unsafe closing style tag in CSS");
  const initialization = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter(([, attrs, code]) => !/\bsrc=/.test(attrs) && /document\.documentElement/.test(code) && !/__next_f|\/_next\//.test(code))
    .map(([, , code]) => `<script>${code}</script>`).join("\n");
  return {
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
