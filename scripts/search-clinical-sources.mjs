import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const PAGES_DIR = path.join(ROOT, ".clinical-cache", "source-pages");
const terms = process.argv.slice(2).map((term) => term.trim()).filter(Boolean);

if (!terms.length) {
  process.stderr.write("Usage: npm run sources:search -- \"condition\" \"pattern\" [synonym ...]\n");
  process.exit(1);
}

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const normalizedTerms = terms.map(normalize);

function scorePage(text) {
  const normalizedText = normalize(text);
  let score = 0;
  for (const term of normalizedTerms) {
    if (!term) continue;
    const exactMatches = normalizedText.split(term).length - 1;
    score += exactMatches * (20 + term.split(" ").length * 5);
    for (const word of term.split(" ").filter((word) => word.length > 3)) {
      score += (normalizedText.split(word).length - 1) * 2;
    }
  }
  return score;
}

function excerpt(text) {
  const normalizedText = normalize(text);
  const firstTerm = normalizedTerms.find((term) => normalizedText.includes(term));
  const index = firstTerm ? normalizedText.indexOf(firstTerm) : 0;
  const start = Math.max(0, index - 180);
  return text.slice(start, start + 700).replace(/\s+/g, " ").trim();
}

const manifest = JSON.parse(await fs.readFile(path.join(PAGES_DIR, "manifest.json"), "utf8"));
const matches = [];

for (const source of manifest.sources) {
  const document = JSON.parse(await fs.readFile(path.join(PAGES_DIR, source.output), "utf8"));
  for (const page of document.pages) {
    const score = scorePage(page.text);
    if (score > 0) matches.push({ source: source.source, page: page.page, score, text: page.text });
  }
}

for (const match of matches.sort((a, b) => b.score - a.score).slice(0, 30)) {
  process.stdout.write(`\n${match.source} — page ${match.page} — score ${match.score}\n${excerpt(match.text)}\n`);
}

if (!matches.length) process.stdout.write("No matching source pages found.\n");
