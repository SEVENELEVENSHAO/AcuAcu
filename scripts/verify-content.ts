import fs from "node:fs";
import { contentByCourseForVerification } from "../src/App";

type AuditPattern = { status: string };
type AuditCondition = { courseNumber: number; patterns: AuditPattern[] };
type AuditLedger = { conditions: AuditCondition[] };

const audit = JSON.parse(fs.readFileSync("data/clinical-content-audit.json", "utf8")) as AuditLedger;
const problems: string[] = [];
const nonBlank = (value: unknown) => typeof value === "string" && value.trim().length > 0;

if (audit.conditions.length !== 73) problems.push(`Expected 73 audited conditions; found ${audit.conditions.length}.`);

const auditPatterns = audit.conditions.flatMap((condition) => condition.patterns);
if (auditPatterns.length !== 398) problems.push(`Expected 398 audited source rows; found ${auditPatterns.length}.`);
const incompleteAuditRows = auditPatterns.filter((pattern) =>
  !["sources_reviewed", "approved", "awaiting_approval"].includes(pattern.status)
);
if (incompleteAuditRows.length > 0) problems.push(`${incompleteAuditRows.length} audit rows have not completed source review.`);

for (const condition of audit.conditions) {
  const content = contentByCourseForVerification[condition.courseNumber as keyof typeof contentByCourseForVerification];
  if (!content) {
    problems.push(`Course ${condition.courseNumber} has no app content.`);
    continue;
  }
  if (!nonBlank(content.overview)) problems.push(`Course ${condition.courseNumber} has no overview.`);
  if (!Array.isArray(content.redFlags) || content.redFlags.length === 0 || content.redFlags.some((flag) => !nonBlank(flag))) {
    problems.push(`Course ${condition.courseNumber} has incomplete red flags.`);
  }
  if (!Array.isArray(content.patterns) || content.patterns.length === 0) {
    problems.push(`Course ${condition.courseNumber} has no displayed protocols.`);
    continue;
  }

  const seen = new Set<string>();
  for (const pattern of content.patterns) {
    const key = `${pattern.section ?? ""}|${pattern.name}`.toLowerCase();
    if (seen.has(key)) problems.push(`Course ${condition.courseNumber} duplicates protocol ${key}.`);
    seen.add(key);
    if (!nonBlank(pattern.name)) problems.push(`Course ${condition.courseNumber} has an unnamed protocol.`);
    if (!nonBlank(pattern.principle)) problems.push(`Course ${condition.courseNumber}/${pattern.name} has no principle.`);
    if (!nonBlank(pattern.points)) problems.push(`Course ${condition.courseNumber}/${pattern.name} has no point guidance or safety gate.`);
    if (pattern.techniques?.some((technique) => !nonBlank(technique))) {
      problems.push(`Course ${condition.courseNumber}/${pattern.name} has an empty technique note.`);
    }
  }
}

const structuralCounts: Record<number, number> = { 4: 23, 8: 12, 45: 9 };
for (const [courseText, expected] of Object.entries(structuralCounts)) {
  const course = Number(courseText);
  const found = contentByCourseForVerification[course as keyof typeof contentByCourseForVerification]?.patterns.length ?? 0;
  if (found !== expected) problems.push(`Course ${course} should expose ${expected} source-specific protocols; found ${found}.`);
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log(`Content verification passed: ${audit.conditions.length} conditions and ${auditPatterns.length} source-reviewed audit rows.`);
