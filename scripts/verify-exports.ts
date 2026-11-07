import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { selectSlugs } from "./standalone/config";

const require = createRequire(import.meta.url);
const root = process.cwd();
const output = path.resolve(".openlanding-page/standalone-exports/verification");
const args = process.argv.slice(2);
const selected = selectSlugs(args.filter(arg => arg !== "--smoke"));
fs.mkdirSync(path.join(output, "tests"), { recursive: true });
// Only this run's suites participate; old generated suites are left as QA artifacts.
const names: string[] = [];
if (!args.includes("--smoke")) for (const slug of selected) {
  const source = fs.readFileSync(path.join(root, "tests/e2e", `${slug}.spec.ts`), "utf8");
  const adapted = source.replace(/\b(\w+)\.goto\(/g, "openStandalone($1,")
    .replace("/\\/flori$/", "/\\/flori\\.html(?:#top)?$/")
    .replace('if (!req.url().startsWith("http://localhost")) external = true;', 'if (/^https?:/.test(req.url()) && !req.url().startsWith("http://localhost")) external = true;');
  const name = `${slug}.spec.ts`;
  fs.writeFileSync(path.join(output, "tests", name), `import {openStandalone} from ${JSON.stringify(path.join(root, "tests/standalone/open"))};\n${adapted}`);
  names.push(name);
}
const smoke = fs.readFileSync(path.join(root, "tests/standalone/smoke.ts"), "utf8");
fs.writeFileSync(path.join(output, "tests/smoke.spec.ts"), smoke.replace('"./open"', JSON.stringify(path.join(root, "tests/standalone/open"))).replace("/* SLUGS */[]", JSON.stringify(selected)));
names.push("smoke.spec.ts");
const config = `import {defineConfig} from '@playwright/test';export default defineConfig({testDir:'./tests',testMatch:${JSON.stringify(names)},fullyParallel:true,workers:2,timeout:30000,reporter:[['list'],['json',{outputFile:'${path.join(output, "results.json").replace(/\\/g, "/")}'}]],outputDir:'./results',use:{offline:true,permissions:['clipboard-read','clipboard-write'],viewport:{width:1440,height:900},baseURL:'http://localhost:3100',trace:'retain-on-failure',screenshot:'only-on-failure'}});`;
fs.writeFileSync(path.join(output, "playwright.config.ts"), config);
const result = spawnSync(process.execPath, [require.resolve("@playwright/test/cli"), "test", "--config", path.join(output, "playwright.config.ts")], { cwd: root, env: process.env, stdio: "inherit" });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
