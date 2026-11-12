import type { NextConfig } from "next";
import path from "node:path";
import { RAW_TEMPLATES } from "./src/app/(index)/data/templates";
import { createTemplateRouting } from "./src/lib/template-routing";

const templateRouting = createTemplateRouting(RAW_TEMPLATES.map(template => template.slug));

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Cap static-generation workers: the default (one per core) ran out of memory on shared dev machines.
  experimental: { cpus: 1 },
  partialPrefetching: true,
  turbopack: {
    // Allow resolving dependencies when run from a worktree.
    root: path.resolve(__dirname, ".."),
    rules: {
      "*.css": {
        // Utilities come from application components, not generated copy bundles or QA artifacts.
        loaders: [
          {
            loader: "@tailwindcss/turbopack",
            options: { base: `${process.cwd()}/src` },
          },
        ],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return templateRouting.redirects;
  },
  async rewrites() {
    // Existing public/templates media must resolve before the page mounts.
    return { beforeFiles: [], afterFiles: templateRouting.rewrites, fallback: [] };
  },
};

export default nextConfig;
