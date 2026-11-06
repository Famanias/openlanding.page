import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';
await build({entryPoints:['.img2threejs/interior/preview.ts'],bundle:true,format:'esm',outfile:'.img2threejs/interior/preview.js'});
createServer(async(req,res)=>{
 const pathname=new URL(req.url,'http://127.0.0.1').pathname;
 if(pathname==='/'){res.setHeader('Content-Type','text/html');res.end('<!doctype html><html><style>body{margin:0;background:#202125}canvas{display:block}</style><canvas></canvas><script type="module" src="/preview.js"></script></html>');return;}
 if(pathname!=='/preview.js'){res.writeHead(404).end();return;}
 try{res.setHeader('Content-Type','text/javascript');res.end(await readFile(new URL('preview.js',import.meta.url)));}catch{res.writeHead(500).end('Preview unavailable');}
}).listen(4321,'127.0.0.1',()=>process.stdout.write('Interior review preview: http://127.0.0.1:4321\n'));
