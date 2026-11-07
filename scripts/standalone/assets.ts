import fs from "node:fs";
import path from "node:path";
export { adaptProps } from "./runtime";

const MIME: Record<string, string> = { ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".ico": "image/x-icon" };
function inside(file: string, directory: string) {
  const relative = path.relative(directory, file);
  return relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

export class AssetStore {
  readonly entries: Record<string, string> = {};
  readonly aliases: Record<string, string> = {};
  constructor(readonly root: string) {}

  add(url: string, fromFile?: string): string {
    if (url.startsWith("data:") || url.startsWith("#")) return url;
    if (/^(?:[a-z]+:|\/\/)/i.test(url)) throw new Error(`External asset is not local: ${url}`);
    if (!fromFile && !url.startsWith("/templates/") && !url.startsWith("/_next/")) throw new Error(`Invalid local asset: ${url}`);
    if (this.entries[url]) return this.entries[url];
    const publicRoot = path.resolve(this.root, "public"), nextRoot = path.resolve(this.root, ".next");
    const clean = decodeURIComponent(url.split(/[?#]/)[0]);
    const file = clean.startsWith("/_next/") ? path.resolve(nextRoot, clean.slice(7)) : clean.startsWith("/") ? path.resolve(publicRoot, `.${clean}`) : path.resolve(path.dirname(fromFile!), clean);
    if (!inside(file, publicRoot) && !inside(file, nextRoot)) throw new Error(`Asset escapes allowed roots: ${url}`);
    if (!fs.existsSync(file)) throw new Error(`Missing standalone asset: ${url}`);
    const real = fs.realpathSync(file);
    if (![publicRoot, nextRoot].some(directory => fs.existsSync(directory) && inside(real, fs.realpathSync(directory)))) throw new Error(`Asset symlink escapes allowed roots: ${url}`);
    const mime = MIME[path.extname(file).toLowerCase()];
    if (!mime) throw new Error(`Unsupported standalone asset: ${url}`);
    const result = `data:${mime};base64,${fs.readFileSync(file).toString("base64")}`;
    // Relative CSS URLs are resolved per stylesheet, never reused across directories.
    if (url.startsWith("/")) this.entries[url] = result;
    return result;
  }

  css(source: string, fromFile: string): string {
    return source.replace(/url\(\s*(?:"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'|([^'"\s)][^)]*))\s*\)/g, (match, double: string | undefined, single: string | undefined, unquoted: string | undefined) => {
      const url = (double ?? single ?? unquoted ?? "").trim();
      if (url.startsWith("data:") || url.startsWith("#")) return match;
      return `url("${this.add(url, fromFile)}")`;
    });
  }
}
