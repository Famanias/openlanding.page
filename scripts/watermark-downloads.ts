import fs from "node:fs";
import path from "node:path";
import { validateWatermarkedDocument, watermarkHtml } from "./standalone/watermark";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parseArgs(argv: string[]): { directory: string; check: boolean; slugs: string[] } {
  const args = [...argv];
  const checkIndex = args.indexOf("--check");
  const check = checkIndex !== -1;
  if (check) args.splice(checkIndex, 1);

  let directory = path.resolve("public/downloads");
  for (const flag of ["--output", "--dir"]) {
    const idx = args.indexOf(flag);
    if (idx !== -1) {
      const next = args[idx + 1];
      if (!next || next.startsWith("--")) throw new Error(`${flag} requires a directory`);
      directory = path.resolve(next);
      args.splice(idx, 2);
    }
  }

  for (const arg of args) {
    if (arg.startsWith("--")) throw new Error(`Unknown option: ${arg}`);
    if (!SLUG_PATTERN.test(arg)) throw new Error(`Invalid template slug: ${arg}`);
  }

  return { directory, check, slugs: [...new Set(args)] };
}

function main() {
  const { directory, check, slugs } = parseArgs(process.argv.slice(2));
  if (!fs.existsSync(directory)) {
    throw new Error(`Downloads directory not found: ${directory}`);
  }

  const targets =
    slugs.length > 0
      ? slugs.map((slug) => ({ slug, file: path.join(directory, `${slug}.html`) }))
      : fs
          .readdirSync(directory, { withFileTypes: true })
          .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
          .map((entry) => ({
            slug: entry.name.slice(0, -5),
            file: path.join(directory, entry.name),
          }))
          .sort((a, b) => a.slug.localeCompare(b.slug));

  let updated = 0;
  let unchanged = 0;
  const failures: string[] = [];

  for (const { slug, file } of targets) {
    if (!fs.existsSync(file)) {
      failures.push(`${slug}: missing file ${file}`);
      continue;
    }
    const original = fs.readFileSync(file, "utf8");
    const watermarked = watermarkHtml(original, { slug });
    const validation = validateWatermarkedDocument(watermarked);
    if (!validation.ok) {
      failures.push(`${slug}: ${validation.errors.join("; ")}`);
      continue;
    }
    if (watermarked !== original) {
      updated++;
      if (!check) {
        fs.writeFileSync(file, watermarked, "utf8");
      }
    } else {
      unchanged++;
    }
  }

  if (failures.length > 0) {
    for (const msg of failures) console.error(msg);
    process.exitCode = 1;
    return;
  }

  if (check && updated > 0) {
    console.error(`watermark check failed: ${updated} of ${targets.length} files are not watermarked.`);
    process.exitCode = 1;
    return;
  }

  console.log(
    JSON.stringify({
      directory: path.relative(process.cwd(), directory).replace(/\\/g, "/") || ".",
      total: targets.length,
      updated,
      unchanged,
      check,
    }),
  );
}

main();
