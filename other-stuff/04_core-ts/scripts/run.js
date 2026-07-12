import { execSync } from "child_process";
import path from "path";
import fs from "fs";

// Get the filename from CLI args (e.g., `npm run exec main3`)
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("❌ Please provide a TypeScript file name (without extension).");
  console.log("👉 Example: npm run exec main3");
  process.exit(1);
}

const fileName = args[0];
const srcFile = path.join("src", `${fileName}.ts`);
const distFile = path.join("dist", `${fileName}.js`);

if (!fs.existsSync(srcFile)) {
  console.error(`❌ File not found: ${srcFile}`);
  process.exit(1);
}

try {
  console.log(`🌀 Compiling ${srcFile}...`);
  execSync(`npx tsc ${srcFile} --outDir dist`, { stdio: "inherit" });

  console.log(`🚀 Running ${distFile}...\n`);
  execSync(`node ${distFile}`, { stdio: "inherit" });
} catch (err) {
  console.error(`❌ Error: ${err.message}`);
}
