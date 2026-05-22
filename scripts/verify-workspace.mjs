import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

const requiredPaths = [
  "apps",
  "apps/api",
  "apps/api/package.json",
  "apps/api/tsconfig.json",
  "packages",
  "packages/config/tsconfig.base.json",
  "packages/contracts/package.json",
  "packages/contracts/tsconfig.json",
  "packages/ui/package.json",
  "packages/ui/tsconfig.json",
  "tsconfig.workspaces.json",
  "eslint.config.mjs",
  "vitest.config.ts",
  "lint-staged.config.mjs",
  "scripts/pre-commit-verify.mjs",
  ".husky/pre-commit",
];

const missing = requiredPaths.filter((relativePath) => {
  const absolutePath = path.join(rootDir, relativePath);
  return !fs.existsSync(absolutePath);
});

if (missing.length > 0) {
  console.error("Workspace bootstrap check failed. Missing required paths:");
  for (const entry of missing) {
    console.error(`- ${entry}`);
  }
  process.exit(1);
}

console.log("Workspace bootstrap check passed.");
