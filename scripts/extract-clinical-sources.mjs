import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const ROOT = process.cwd();
const REFERENCES_DIR = path.join(ROOT, "references");
const OUTPUT_DIR = path.join(ROOT, ".clinical-cache", "source-pages");

async function findPdfs(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) results.push(...await findPdfs(fullPath));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".pdf")) results.push(fullPath);
  }
  return results.sort((a, b) => a.localeCompare(b));
}

function cleanText(items) {
  return items
    .map((item) => item.str)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

async function extractPdf(filePath) {
  const bytes = new Uint8Array(await fs.readFile(filePath));
  const document = await getDocument({ data: bytes, useSystemFonts: true }).promise;
  const pages = [];
  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push({ page: pageNumber, text: cleanText(content.items) });
  }
  return pages;
}

await fs.mkdir(OUTPUT_DIR, { recursive: true });
const pdfs = await findPdfs(REFERENCES_DIR);
const manifest = [];

for (const [index, filePath] of pdfs.entries()) {
  const relativePath = path.relative(ROOT, filePath).replaceAll("\\", "/");
  const outputName = `${relativePath.replaceAll(/[\\/:*?\"<>|]/g, "_")}.json`;
  const pages = await extractPdf(filePath);
  await fs.writeFile(
    path.join(OUTPUT_DIR, outputName),
    `${JSON.stringify({ source: relativePath, pages }, null, 2)}\n`,
    "utf8",
  );
  manifest.push({ source: relativePath, output: outputName, pages: pages.length });
  process.stdout.write(`[${index + 1}/${pdfs.length}] ${relativePath} (${pages.length} pages)\n`);
}

await fs.writeFile(
  path.join(OUTPUT_DIR, "manifest.json"),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), sources: manifest }, null, 2)}\n`,
  "utf8",
);

process.stdout.write(`Extracted ${pdfs.length} PDFs to ${path.relative(ROOT, OUTPUT_DIR)}.\n`);
