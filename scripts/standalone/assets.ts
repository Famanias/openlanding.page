import fs from "node:fs";
import path from "node:path";
export { adaptProps } from "./runtime";

const MIME: Record<string, string> = { ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".ico": "image/x-icon", ".glb": "model/gltf-binary", ".mp4": "video/mp4" };
function inside(file: string, directory: string) {
  const relative = path.relative(directory, file);
  return relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

export class AssetStore {
  readonly entries: Record<string, string> = {};
  readonly aliases: Record<string, string> = {};
  constructor(readonly root: string) {}

  add(url: string, fromFile?: string, register = true): string {
    if (url.startsWith("data:") || url.startsWith("#")) return url;
    if (/^(?:[a-z]+:|\/\/)/i.test(url)) throw new Error(`External asset is not local: ${url}`);
    if (!fromFile && !url.startsWith("/templates/") && !url.startsWith("/assets/") && !url.startsWith("/_next/")) throw new Error(`Invalid local asset: ${url}`);
    if (this.entries[url]) return this.entries[url];
    const publicRoot = path.resolve(this.root, "public"), nextRoot = path.resolve(this.root, ".next");
    const clean = decodeURIComponent(url.split(/[?#]/)[0]);
    const file = clean.startsWith("/_next/") ? path.resolve(nextRoot, clean.slice(7)) : clean.startsWith("/") ? path.resolve(publicRoot, `.${clean}`) : path.resolve(path.dirname(fromFile!), clean);
    if (!inside(file, publicRoot) && !inside(file, nextRoot)) throw new Error(`Asset escapes allowed roots: ${url}`);
    if (!fs.existsSync(file)) throw new Error(`Missing standalone asset: ${url}`);
    const real = fs.realpathSync(file);
    if (![publicRoot, nextRoot].some(directory => fs.existsSync(directory) && inside(real, fs.realpathSync(directory)))) throw new Error(`Asset symlink escapes allowed roots: ${url}`);
    const bytes = fs.readFileSync(file);
    // Several supplied artwork files have a PNG/WebP suffix but contain JPEG bytes.
    const mime = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff ? "image/jpeg" : bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) ? "image/png" : bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP" ? "image/webp" : MIME[path.extname(file).toLowerCase()];
    if (!mime) throw new Error(`Unsupported standalone asset: ${url}`);
    const result = `data:${mime};base64,${bytes.toString("base64")}`;
    // Relative CSS URLs are resolved per stylesheet, never reused across directories.
    if (register && url.startsWith("/")) this.entries[url] = result;
    return result;
  }

  async prepare(url: string, optimizeLargeArtwork = false): Promise<string> {
    const original = this.add(url);
    if (optimizeLargeArtwork && original.startsWith("data:image/jpeg;") && original.length > 700_000) {
      const { default: sharp } = await import("sharp");
      const image = await sharp(Buffer.from(original.slice(original.indexOf(",") + 1), "base64")).webp({quality:92, alphaQuality:100, effort:5}).toBuffer();
      this.entries[url] = `data:image/webp;base64,${image.toString("base64")}`;
    }
    return this.entries[url] ?? original;
  }

  css(source: string, fromFile: string): string {
    return source.replace(/url\(\s*(?:"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'|([^'"\s)][^)]*))\s*\)/g, (match, double: string | undefined, single: string | undefined, unquoted: string | undefined) => {
      const url = (double ?? single ?? unquoted ?? "").trim();
      if (url.startsWith("data:") || url.startsWith("#")) return match;
      return `url("${this.add(url, fromFile)}")`;
    });
  }
}
