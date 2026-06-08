import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, extname, join, relative } from "node:path";
import process from "node:process";

const root = process.cwd();
const datasetPath = join(root, "data", "acu3-course-organ-system-chart.json");
const ledgerPath = join(root, "data", "clinical-content-audit.json");
const reportPath = join(root, "docs", "clinical-content-audit-progress.md");
const referenceRoot = join(root, "references");
const referenceFolders = {
  course: join(referenceRoot, "course"),
  textbooks: join(referenceRoot, "textbooks"),
};
const statuses = new Set(["not_started", "sources_reviewed", "awaiting_approval", "approved"]);
const organSystemOrder = [
  "Lung System Disorders",
  "Heart and Mind Disorders",
  "Spleen and Stomach Disorders",
  "Liver and Gallbladder Disorders",
  "Kidney and Bladder Disorders",
  "Qi, Blood, and Fluid Disorders",
  "Channel and Body Disorders",
  "Gynecology and Obstetrics (Fu Ke)",
];
const publishedPatternOverrides = new Map([
  [6, [
    "Invasion of Wind-Cold",
    "Invasion of Wind-Heat",
    "Invasion of Summer-Heat Damp",
    "Cold with Underlying Qi Deficiency",
    "Cold with Underlying Yin Deficiency",
  ]],
]);

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function pdfInventory(folder) {
  if (!existsSync(folder)) return [];
  return readdirSync(folder, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && extname(entry.name).toLowerCase() === ".pdf")
    .map((entry) => {
      const absolutePath = join(entry.parentPath, entry.name);
      return relative(root, absolutePath).replaceAll("\\", "/");
    })
    .sort((a, b) => a.localeCompare(b));
}

function patternKey(pattern) {
  return `${pattern.section ? `${pattern.section}: ` : ""}${pattern.name}`;
}

function sourceFile(source) {
  return source?.document ?? source?.file ?? "";
}

function citesInventoryFile(source, inventoryFile) {
  const citedFile = sourceFile(source).replaceAll("\\", "/");
  return citedFile === inventoryFile || basename(citedFile) === basename(inventoryFile);
}

function makePattern(name, existing) {
  return {
    name,
    status: existing?.status ?? "not_started",
    sourcesChecked: existing?.sourcesChecked ?? [],
    differences: existing?.differences ?? [],
    decisions: existing?.decisions ?? [],
    openQuestions: existing?.openQuestions ?? [],
    approvedAt: existing?.approvedAt ?? null,
    appVerification: existing?.appVerification ?? {
      status: "not_run",
      verifiedAt: null,
      notes: "",
    },
  };
}

function syncLedger() {
  mkdirSync(referenceFolders.course, { recursive: true });
  mkdirSync(referenceFolders.textbooks, { recursive: true });

  const dataset = readJson(datasetPath);
  const previous = existsSync(ledgerPath) ? readJson(ledgerPath) : null;
  const previousConditions = new Map(
    (previous?.conditions ?? []).map((condition) => [condition.courseNumber, condition]),
  );

  const orderedItems = [...dataset.items].sort((a, b) => {
    const organDifference = organSystemOrder.indexOf(a.organSystem) - organSystemOrder.indexOf(b.organSystem);
    return organDifference || a.courseNumber - b.courseNumber;
  });
  const conditions = orderedItems.map((item) => {
    const existing = previousConditions.get(item.courseNumber);
    const existingPatterns = new Map(
      (existing?.patterns ?? []).map((pattern) => [pattern.name, pattern]),
    );
    return {
      courseNumber: item.courseNumber,
      organSystem: item.organSystem,
      condition: item.diseaseName,
      status: existing?.status ?? "not_started",
      sourcesChecked: existing?.sourcesChecked ?? [],
      differences: existing?.differences ?? [],
      decisions: existing?.decisions ?? [],
      openQuestions: existing?.openQuestions ?? [],
      approvedAt: existing?.approvedAt ?? null,
      appVerification: existing?.appVerification ?? {
        status: "not_run",
        verifiedAt: null,
        notes: "",
      },
      patterns: (publishedPatternOverrides.get(item.courseNumber) ?? item.subPatterns)
        .map((name) => makePattern(name, existingPatterns.get(name))),
    };
  });

  const ledger = {
    schemaVersion: 1,
    auditName: "AcuAcu Clinical Content Audit",
    policy: {
      order: "organ_system_then_course_number",
      sourceAuthority: "lecture_core_textbooks_enrich_with_approval",
      approvalRequired: true,
      applyChanges: "after_condition_approval",
      formulaContentExcluded: true,
      pointRoles: "pattern_specific_with_global_fallback",
    },
    sourceInventory: {
      course: pdfInventory(referenceFolders.course),
      textbooks: pdfInventory(referenceFolders.textbooks),
    },
    progress: previous?.progress ?? {
      status: "active",
      pausedAt: null,
      currentOrganSystem: "Lung System Disorders",
      currentCondition: "Common Cold",
      currentPattern: "Invasion of Wind-Cold",
      resumeNote: "",
    },
    conditions,
  };

  writeFileSync(ledgerPath, `${JSON.stringify(ledger, null, 2)}\n`);
  console.log(
    `Synced ${conditions.length} conditions and ${conditions.reduce((sum, item) => sum + item.patterns.length, 0)} patterns.`,
  );
  console.log(
    `Found ${ledger.sourceInventory.course.length} course PDFs and ${ledger.sourceInventory.textbooks.length} textbook PDFs.`,
  );
}

function checkLedger() {
  if (!existsSync(ledgerPath)) throw new Error("Audit ledger is missing. Run npm run audit:sync.");
  const dataset = readJson(datasetPath);
  const ledger = readJson(ledgerPath);
  const errors = [];

  if (ledger.conditions.length !== dataset.items.length) {
    errors.push(`Expected ${dataset.items.length} conditions, found ${ledger.conditions.length}.`);
  }

  const ledgerConditions = new Map(ledger.conditions.map((item) => [item.courseNumber, item]));
  const expectedCourse = pdfInventory(referenceFolders.course);
  const expectedTextbooks = pdfInventory(referenceFolders.textbooks);
  for (const source of dataset.items) {
    const condition = ledgerConditions.get(source.courseNumber);
    if (!condition) {
      errors.push(`Missing condition #${source.courseNumber} ${source.diseaseName}.`);
      continue;
    }
    if (!statuses.has(condition.status)) {
      errors.push(`Invalid status for #${source.courseNumber}: ${condition.status}.`);
    }
    const sourcePatterns = new Set(publishedPatternOverrides.get(source.courseNumber) ?? source.subPatterns);
    const ledgerPatterns = new Set(condition.patterns.map((pattern) => pattern.name));
    for (const name of sourcePatterns) {
      if (!ledgerPatterns.has(name)) errors.push(`Missing pattern #${source.courseNumber}: ${name}.`);
    }
    for (const pattern of condition.patterns) {
      if (!statuses.has(pattern.status)) {
        errors.push(`Invalid pattern status #${source.courseNumber} ${patternKey(pattern)}.`);
      }
      if (pattern.status === "approved" && !pattern.approvedAt) {
        errors.push(`Approved pattern lacks approvedAt: #${source.courseNumber} ${pattern.name}.`);
      }
      if (pattern.status !== "not_started") {
        const checkedSources = pattern.sourcesChecked ?? [];
        if (!expectedCourse.some((file) => checkedSources.some((item) => citesInventoryFile(item, file)))) {
          errors.push(`Reviewed pattern lacks a course source: #${source.courseNumber} ${pattern.name}.`);
        }
        for (const textbook of expectedTextbooks) {
          if (!checkedSources.some((item) => citesInventoryFile(item, textbook))) {
            errors.push(
              `Reviewed pattern lacks textbook ${basename(textbook)}: #${source.courseNumber} ${pattern.name}.`,
            );
          }
        }
      }
    }
  }

  if (JSON.stringify(ledger.sourceInventory.course) !== JSON.stringify(expectedCourse)) {
    errors.push("Course PDF inventory is stale. Run npm run audit:sync.");
  }
  if (JSON.stringify(ledger.sourceInventory.textbooks) !== JSON.stringify(expectedTextbooks)) {
    errors.push("Textbook PDF inventory is stale. Run npm run audit:sync.");
  }

  if (errors.length) {
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Audit ledger valid: ${ledger.conditions.length} conditions.`);
}

function countByStatus(items) {
  return Object.fromEntries(
    [...statuses].map((status) => [status, items.filter((item) => item.status === status).length]),
  );
}

function progressReport() {
  if (!existsSync(ledgerPath)) throw new Error("Audit ledger is missing. Run npm run audit:sync.");
  const ledger = readJson(ledgerPath);
  const patterns = ledger.conditions.flatMap((condition) =>
    condition.patterns.map((pattern) => ({ ...pattern, condition })),
  );
  const conditionCounts = countByStatus(ledger.conditions);
  const patternCounts = countByStatus(patterns);
  const reviewedPatternCount = patterns.length - patternCounts.not_started;
  const awaiting = patterns.filter((pattern) => pattern.status === "awaiting_approval");

  const organRows = organSystemOrder
    .map((organSystem) => {
      const conditions = ledger.conditions.filter((condition) => condition.organSystem === organSystem);
      if (!conditions.length) return null;
      const organPatterns = conditions.flatMap((condition) => condition.patterns);
      const reviewed = organPatterns.filter((pattern) => pattern.status !== "not_started").length;
      const approved = organPatterns.filter((pattern) => pattern.status === "approved").length;
      return `| ${organSystem} | ${conditions.length} | ${reviewed}/${organPatterns.length} | ${approved}/${organPatterns.length} |`;
    })
    .filter(Boolean);

  const awaitingRows = awaiting.length
    ? awaiting.map(
        (pattern) =>
          `| ${pattern.condition.courseNumber} | ${pattern.condition.condition} | ${pattern.name} | ${pattern.openQuestions.length} |`,
      )
    : ["| - | None | - | 0 |"];

  const lines = [
    "# AcuAcu Clinical Content Audit Progress",
    "",
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    "",
    "## Audit Status",
    "",
    `- Status: ${ledger.progress.status ?? "active"}`,
    ...(ledger.progress.pausedAt ? [`- Paused: ${ledger.progress.pausedAt}`] : []),
    `- Organ system: ${ledger.progress.currentOrganSystem}`,
    `- Condition: ${ledger.progress.currentCondition}`,
    `- Pattern: ${ledger.progress.currentPattern}`,
    ...(ledger.progress.resumeNote ? [`- Resume note: ${ledger.progress.resumeNote}`] : []),
    "",
    "## Totals",
    "",
    `- Conditions: ${ledger.conditions.length}`,
    `- Patterns reviewed: ${reviewedPatternCount}/${patterns.length}`,
    `- Patterns awaiting approval: ${patternCounts.awaiting_approval}`,
    `- Patterns approved: ${patternCounts.approved}`,
    `- Conditions approved: ${conditionCounts.approved}`,
    "",
    "## Organ Systems",
    "",
    "| Organ system | Conditions | Patterns reviewed | Patterns approved |",
    "|---|---:|---:|---:|",
    ...organRows,
    "",
    "## Awaiting Approval",
    "",
    "| Course # | Condition | Pattern | Open questions |",
    "|---:|---|---|---:|",
    ...awaitingRows,
    "",
    "This page is generated from `data/clinical-content-audit.json`. Clinical decisions remain authoritative only in the ledger.",
    "",
  ];

  mkdirSync(join(root, "docs"), { recursive: true });
  writeFileSync(reportPath, `${lines.join("\n")}\n`);
  console.log(`Wrote ${relative(root, reportPath)}.`);
}

const mode = process.argv[2];
if (mode === "--sync") syncLedger();
else if (mode === "--check") checkLedger();
else if (mode === "--report") progressReport();
else throw new Error("Use --sync, --check, or --report.");
