const fs = require("fs");
const path = require("path");

const sourceDir = path.resolve(process.argv[2] || "workflows");
const outputDir = path.resolve(process.argv[3] || "workflows-cleaned");

const MARKDOWN_ESCAPES = /\\([\\`*_{}\[\]()#+\-.!|<>])/g;

function normalizeWordArtifacts(content) {
  return content
    .replace(/\u00a0/g, " ")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(MARKDOWN_ESCAPES, "$1")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{4,}/g, "\n\n\n")
    .trimEnd();
}

function cleanMarkdown(content) {
  const cleaned = normalizeWordArtifacts(content);
  return `${cleaned}\n`;
}

function copyCleanedFile(fileName) {
  const inputPath = path.join(sourceDir, fileName);
  const outputPath = path.join(outputDir, fileName);
  const content = fs.readFileSync(inputPath, "utf8");

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, cleanMarkdown(content), "utf8");

  return outputPath;
}

function main() {
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Source directory not found: ${sourceDir}`);
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const files = fs
    .readdirSync(sourceDir)
    .filter((fileName) => fileName.toLowerCase().endsWith(".md"))
    .sort((a, b) => a.localeCompare(b));

  for (const fileName of files) {
    const outputPath = copyCleanedFile(fileName);
    console.log(
      `cleaned ${fileName} -> ${path.relative(process.cwd(), outputPath)}`,
    );
  }

  console.log("");
  console.log(`done: ${files.length} Markdown files cleaned`);
}

main();
