import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { selectSlugs, GRAPHICS_SLUGS } from "./standalone/config";
import { adaptVerificationSource } from "./standalone/verification-source";

const require = createRequire(import.meta.url);
const root = process.cwd();
const output = path.resolve(process.env.STANDALONE_VERIFICATION_DIRECTORY ?? ".openlanding-page/standalone-exports/verification");
const args = process.argv.slice(2);
const selected = selectSlugs(args.filter(arg => !["--smoke","--graphics-only"].includes(arg)));
fs.mkdirSync(path.join(output, "tests"), { recursive: true });
// Only this run's suites participate; old generated suites are left as QA artifacts.
const names: string[] = [];
const written=new Set<string>();
function writeSuite(file:string){
  const relative=path.relative(path.join(root,"tests/e2e"),file);
  if(written.has(relative))return;
  written.add(relative);
  const source=adaptVerificationSource(fs.readFileSync(file,"utf8"),file);
  const adapted=source.replace(/\b(\w+)\.goto\(/g,"openStandalone($1,")
   .replace("/\\/flori$/","/\\/flori\\.html(?:#top)?$/")
   .replace('if (!req.url().startsWith("http://localhost")) external = true;','if (/^https?:/.test(req.url()) && !req.url().startsWith("http://localhost")) external = true;')
   .replace(/from\s+(["'])(\.[^"']+)\1/g,(match,quote,specifier:string)=>{
    const resolved=path.resolve(path.dirname(file),specifier);
    const helper=[resolved,resolved+".ts",resolved+".tsx",resolved+".js"].find(candidate=>fs.existsSync(candidate)&&fs.statSync(candidate).isFile());
    if(helper&&helper.startsWith(path.join(root,"tests/e2e")+path.sep)&&/\.[jt]sx?$/.test(helper)){writeSuite(helper);return match;}
    return `from ${JSON.stringify(resolved)}`;
   });
  const destination=path.join(output,"tests",relative);
  fs.mkdirSync(path.dirname(destination),{recursive:true});
  fs.writeFileSync(destination,`import {openStandalone} from ${JSON.stringify(path.join(root,"tests/standalone/open"))};\n${adapted}`);
}
if (!args.includes("--smoke") && !args.includes("--graphics-only")) for (const slug of selected) {
  if(!fs.existsSync(path.join(root,"tests/e2e",`${slug}.spec.ts`)))continue;
  const name = `${slug}.spec.ts`;
  writeSuite(path.join(root,"tests/e2e",name));
  names.push(name);
}
const smoke = fs.readFileSync(path.join(root, "tests/standalone/smoke.ts"), "utf8");
if(!args.includes("--graphics-only")){
fs.writeFileSync(path.join(output, "tests/smoke.spec.ts"), smoke.replace('"./open"', JSON.stringify(path.join(root, "tests/standalone/open"))).replace("/* SLUGS */[]", JSON.stringify(selected)).replace("/* GRAPHICS */[]",JSON.stringify(GRAPHICS_SLUGS)));
names.push("smoke.spec.ts");
}
const graphics=selected.filter(slug=>(GRAPHICS_SLUGS as readonly string[]).includes(slug));
if(graphics.length&&!args.includes("--smoke")){
 const source=fs.readFileSync(path.join(root,"tests/standalone/graphics-run.ts"),"utf8").replace('"./open"',JSON.stringify(path.join(root,"tests/standalone/open"))).replace('"./graphics"',JSON.stringify(path.join(root,"tests/standalone/graphics"))).replace("/* SLUGS */[]",JSON.stringify(graphics));
 fs.writeFileSync(path.join(output,"tests/graphics.spec.ts"),source);names.push("graphics.spec.ts");
}
const workers=args.includes("--graphics-only")?1:2;
const timeout=graphics.length?120000:30000;
const expectationTimeout=graphics.length?60000:5000;
const config = `import {defineConfig} from '@playwright/test';export default defineConfig({testDir:'./tests',testMatch:${JSON.stringify(names)},fullyParallel:true,workers:${workers},timeout:${timeout},expect:{timeout:${expectationTimeout}},reporter:[['list'],['json',{outputFile:'${path.join(output, "results.json").replace(/\\/g, "/")}'}]],outputDir:'./results',use:{offline:true,permissions:['clipboard-read','clipboard-write'],viewport:{width:1440,height:900},baseURL:'http://localhost:3100',trace:'retain-on-failure',screenshot:'only-on-failure'}});`;
fs.writeFileSync(path.join(output, "playwright.config.ts"), config);
const result = spawnSync(process.execPath, [require.resolve("@playwright/test/cli"), "test", "--config", path.join(output, "playwright.config.ts")], { cwd: root, env: process.env, stdio: "inherit" });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
