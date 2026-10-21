// Lists which image/video generation providers have an API key available. Prints NAMES only — never values.
//   node .claude/skills/create-landing-template/media/detect-keys.mjs                 scan for known providers
//   node .claude/skills/create-landing-template/media/detect-keys.mjs MY_KEY_NAME     check one variable the user named
// Looks in the repo's .env files and in the current process environment.
import { existsSync, readFileSync } from "node:fs";

const PROVIDERS = [
  { name: "OpenAI (images, video)", keys: ["OPENAI_API_KEY"] },
  { name: "Google (Imagen, Veo)", keys: ["GEMINI_API_KEY", "GOOGLE_API_KEY", "GOOGLE_GENERATIVE_AI_API_KEY"] },
  { name: "Vercel AI Gateway (images)", keys: ["AI_GATEWAY_API_KEY"] },
  { name: "Replicate (many image/video models)", keys: ["REPLICATE_API_TOKEN", "REPLICATE_API_KEY"] },
  { name: "fal.ai (many image/video models)", keys: ["FAL_KEY", "FAL_API_KEY"] },
  { name: "Black Forest Labs (FLUX)", keys: ["BFL_API_KEY"] },
  { name: "Stability AI", keys: ["STABILITY_API_KEY"] },
  { name: "Ideogram", keys: ["IDEOGRAM_API_KEY"] },
  { name: "Leonardo", keys: ["LEONARDO_API_KEY"] },
  { name: "Runway (video)", keys: ["RUNWAYML_API_SECRET", "RUNWAY_API_KEY"] },
  { name: "Luma (video)", keys: ["LUMAAI_API_KEY", "LUMA_API_KEY"] },
  { name: "Kling (video)", keys: ["KLING_ACCESS_KEY", "KLING_API_KEY"] },
  { name: "MiniMax / Hailuo (video)", keys: ["MINIMAX_API_KEY"] },
];

const FILES = [".env", ".env.local", ".env.development", ".env.development.local", ".env.production", ".env.production.local"];

/** name -> where it was found; values are read only to check they are non-empty, then dropped. */
const found = new Map();
for (const file of FILES) {
  if (!existsSync(file)) continue;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*(?:export\s+)?([A-Z][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (m && m[2].replace(/^["']|["']$/g, "").trim()) found.set(m[1], file);
  }
}
for (const [k, v] of Object.entries(process.env)) if (v && !found.has(k)) found.set(k, "environment");

// A variable name the user typed: report whether it is set, and where. Still never its value.
const asked = process.argv.slice(2).map((a) => a.trim().replace(/=.*$/, "")).filter(Boolean);
if (asked.length) {
  for (const name of asked) {
    console.log(found.has(name) ? `${name}: set (${found.get(name)})` : `${name}: not set or empty (checked ${FILES.join(", ")} and the environment)`);
  }
  process.exit(0);
}

const hits = PROVIDERS.map((p) => ({ ...p, present: p.keys.filter((k) => found.has(k)) })).filter((p) => p.present.length);
if (!hits.length) {
  console.log("media keys: none found (checked " + FILES.join(", ") + " and the environment)");
} else {
  console.log("media keys found:");
  for (const p of hits) console.log(`  - ${p.name}: ${p.present.map((k) => `${k} (${found.get(k)})`).join(", ")}`);
}
