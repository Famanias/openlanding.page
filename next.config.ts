import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Cap static-generation workers: the default (one per core) ran out of memory on shared dev machines.
  experimental: { cpus: 1 },
  partialPrefetching: true,
  turbopack: {
    // Each managed checkout has its own dependencies; avoid scanning sibling worktrees.
    root: process.cwd(),
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
    return [
      {
        source: "/cairn",
        destination: "/keytu",
        permanent: true,
      },
      {
        source: "/cairn/:path*",
        destination: "/keytu/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
