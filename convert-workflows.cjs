const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");

const workflowDir = process.argv[2] || "workflows";
const absoluteWorkflowDir = path.resolve(workflowDir);

function isDocxWorkflow(fileName) {
  return fileName.toLowerCase().endsWith(".docx") && !fileName.startsWith("~$");
}

function markdownTitle(fileName) {
  return path.basename(fileName, path.extname(fileName));
}

function markdownOutputName(fileName) {
  return `${path.basename(fileName, path.extname(fileName))}.md`;
}

async function convertFile(fileName) {
  const inputPath = path.join(absoluteWorkflowDir, fileName);
  const stats = fs.statSync(inputPath);

  if (stats.size === 0) {
    return { fileName, status: "skipped", reason: "empty file" };
  }

  const outputPath = path.join(
    absoluteWorkflowDir,
    markdownOutputName(fileName),
  );

  const result = await mammoth.convertToMarkdown({ path: inputPath });
  const body = (result.value || "").trim();
  const output = [
    `# ${markdownTitle(fileName)}`,
    "",
    `Source: ${fileName}`,
    "",
    body,
    "",
  ].join("\n");

  fs.writeFileSync(outputPath, output, "utf8");

  return {
    fileName,
    status: "converted",
    output: path.relative(process.cwd(), outputPath),
    warnings: (result.messages || []).map((message) => message.message),
  };
}

async function main() {
  if (!fs.existsSync(absoluteWorkflowDir)) {
    throw new Error(`Workflow directory not found: ${absoluteWorkflowDir}`);
  }

  const files = fs.readdirSync(absoluteWorkflowDir).filter(isDocxWorkflow);
  const results = [];

  for (const fileName of files) {
    try {
      results.push(await convertFile(fileName));
    } catch (error) {
      results.push({
        fileName,
        status: "failed",
        reason: error.message,
      });
    }
  }

  const converted = results.filter((result) => result.status === "converted");
  const skipped = results.filter((result) => result.status === "skipped");
  const failed = results.filter((result) => result.status === "failed");

  for (const result of results) {
    if (result.status === "converted") {
      console.log(`converted ${result.fileName} -> ${result.output}`);
      for (const warning of result.warnings) {
        console.log(`  warning: ${warning}`);
      }
    } else {
      console.log(`${result.status} ${result.fileName}: ${result.reason}`);
    }
  }

  console.log("");
  console.log(
    `done: ${converted.length} converted, ${skipped.length} skipped, ${failed.length} failed`,
  );

  if (failed.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
