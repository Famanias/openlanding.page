import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Cap static-generation workers: the default (one per core) ran out of memory on shared dev machines.
  experimental: { cpus: 4 },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
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
