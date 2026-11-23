import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "scripts/**/*.test.ts",
      "src/**/*.test.ts",
      "src/**/*.test.tsx",
      "figma-plugin/tests/**/*.test.ts",
    ],
    environment: "node",
  },
});
