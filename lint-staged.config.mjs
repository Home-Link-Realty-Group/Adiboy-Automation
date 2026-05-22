export default {
  "*.{js,cjs}": ["eslint --fix", "prettier --write"],
  "scripts/**/*.mjs": ["eslint --fix", "prettier --write"],
  "apps/**/*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "packages/**/*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "eslint.config.mjs": ["eslint --fix", "prettier --write"],
  "vitest.config.ts": ["eslint --fix", "prettier --write"],
  "package.json": ["prettier --write"],
  "tsconfig*.json": ["prettier --write"],
  "apps/**/*.json": ["prettier --write"],
  "packages/**/*.json": ["prettier --write"],
  ".github/workflows/*.{yml,yaml}": ["prettier --write"],
};
