const fs = require("fs");
const path = require("path");

const sourceDir = path.resolve(process.argv[2] || "workflows");
const outputDir = path.resolve(process.argv[3] || "workflows-cleaned");

function normalizeContent(content) {
  return content
    .replace(/\u00a0/g, " ")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{4,}/g, "\n\n\n")
    .trimEnd();
}

function getKind(content) {
  const trimmed = content.trim();

  if (!trimmed) {
    return "txt";
  }

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      JSON.parse(trimmed);
      return "json";
    } catch {
      // Not valid JSON, continue classification.
    }
  }

  if (/^User-agent:/im.test(content) && /^Disallow:/im.test(content)) {
    return "txt";
  }

  if (/^\s*<\?xml/i.test(trimmed) || /^\s*<urlset[\s>]/i.test(trimmed)) {
    return "xml";
  }

  const hasImportExport =
    /(^|\n)\s*import\s.+from\s+["']/m.test(content) ||
    /(^|\n)\s*export\s+(default|const|function|class)\b/m.test(content);
  const hasJsx =
    /<\s*[A-Z][A-Za-z0-9]*/.test(content) ||
    /<\/\s*[A-Za-z][A-Za-z0-9]*\s*>/.test(content) ||
    /className\s*=/.test(content);

  if (hasImportExport && hasJsx) {
    return "jsx";
  }

  if (
    hasImportExport ||
    /(^|\n)\s*(const|let|var|function)\s+\w+/m.test(content)
  ) {
    return "js";
  }

  return "txt";
}

function extensionForKind(kind) {
  switch (kind) {
    case "json":
      return ".json";
    case "xml":
      return ".xml";
    case "jsx":
      return ".jsx";
    case "js":
      return ".js";
    default:
      return ".txt";
  }
}

function cleanPyFile(fileName) {
  const inputPath = path.join(sourceDir, fileName);
  const raw = fs.readFileSync(inputPath, "utf8");
  const cleaned = `${normalizeContent(raw)}\n`;
  const kind = getKind(cleaned);
  const outputName = `${path.basename(fileName, ".py")}${extensionForKind(kind)}`;
  const outputPath = path.join(outputDir, outputName);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, cleaned, "utf8");

  return { fileName, outputName, kind };
}

function main() {
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Source directory not found: ${sourceDir}`);
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const pyFiles = fs
    .readdirSync(sourceDir)
    .filter((fileName) => fileName.toLowerCase().endsWith(".py"))
    .sort((a, b) => a.localeCompare(b));

  const kindCount = { json: 0, xml: 0, jsx: 0, js: 0, txt: 0 };

  for (const fileName of pyFiles) {
    const result = cleanPyFile(fileName);
    kindCount[result.kind] += 1;
    console.log(
      `cleaned ${result.fileName} -> ${path.join("workflows-cleaned", result.outputName)} (${result.kind})`,
    );
  }

  console.log("");
  console.log(
    `done: ${pyFiles.length} .py files cleaned (${kindCount.jsx} jsx, ${kindCount.js} js, ${kindCount.json} json, ${kindCount.xml} xml, ${kindCount.txt} txt)`,
  );
}

main();
