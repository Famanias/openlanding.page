// Serves a brand board folder locally, with no dependencies.
//   node .claude/skills/create-landing-template/brand-board/serve.mjs <dir> [port]
// Prints the URL. Run it in the background and stop it when the board is approved.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";

const root = resolve(process.argv[2] ?? ".");
let port = Number(process.argv[3] ?? 4600);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
};

const server = createServer(async (req, res) => {
  try {
    const url = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
    let file = normalize(join(root, url));
    if (file !== root && !file.startsWith(root + sep)) throw new Error("outside root");
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[extname(file).toLowerCase()] ?? "application/octet-stream", "cache-control": "no-store" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
  }
});

// If the port is taken, try the next few.
server.on("error", (e) => {
  if (e.code === "EADDRINUSE" && port < 4620) server.listen(++port, "127.0.0.1");
  else throw e;
});
server.on("listening", () => console.log(`brand board: http://localhost:${port}/  (serving ${root})`));
server.listen(port, "127.0.0.1");
