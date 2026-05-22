import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@home-link/contracts": path.join(
        rootDir,
        "packages/contracts/src/index.ts",
      ),
    },
  },
  test: {
    environment: "node",
    include: ["apps/**/*.test.ts", "packages/**/*.test.ts"],
    passWithNoTests: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary"],
      include: ["apps/**/src/**/*.ts", "packages/**/src/**/*.ts"],
      exclude: ["**/*.test.ts", "**/node_modules/**", "**/dist/**"],
      thresholds: {
        statements: 82,
        branches: 82,
        functions: 90,
        lines: 82,
      },
    },
  },
});
