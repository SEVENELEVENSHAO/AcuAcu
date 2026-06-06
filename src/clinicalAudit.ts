import type {
  ClinicalSummary,
  LungConditionDetail,
  LungPatternDetail,
  PointAddition,
  SourceAudit,
} from "./lungContent";

type ConditionIdentity = {
  courseNumber: number;
  diseaseName: string;
  organSystem: string;
  sourceFile: string;
};

const locationBySystem: Record<string, string> = {
  "Lung System Disorders": "Lung and defensive exterior, with frequent involvement of Spleen and Kidney",
  "Heart and Mind Disorders": "Heart, vessels, and Shen, often involving Liver, Spleen, Kidney, or Phlegm",
  "Spleen and Stomach Disorders": "Middle burner, Spleen, Stomach, and intestines",
  "Liver and Gallbladder Disorders": "Liver, Gallbladder, channels, and clear orifices",
  "Kidney and Bladder Disorders": "Kidney, Bladder, lower burner, and water pathways",
  "Qi, Blood, and Fluid Disorders": "Qi, Blood, and body-fluid movement across multiple organ systems",
  "Channel and Body Disorders": "Channels, collaterals, sinews, joints, and limbs",
  "Gynecology and Obstetrics (Fu Ke)": "Uterus, Chong and Ren vessels, Kidney, Liver, Spleen, Qi, and Blood",
};

// Representative treatment pages found in the supplied course PDFs.
const sourcePageByCourse: Record<number, number> = {
  1: 6, 2: 15, 3: 22, 4: 17, 5: 21, 6: 29, 7: 8, 8: 11, 9: 11,
  10: 2, 11: 11, 12: 12, 13: 6, 14: 13, 15: 18, 16: 4, 17: 13, 18: 20,
  19: 12, 20: 13, 21: 23, 22: 3, 23: 18, 24: 22, 25: 6, 26: 13, 27: 16,
  28: 4, 29: 12, 30: 20, 31: 2, 32: 8, 33: 10, 34: 3, 35: 9, 36: 15,
  37: 3, 38: 9, 39: 13, 40: 4, 41: 14, 42: 19, 43: 6, 44: 10, 45: 19,
  46: 5, 47: 11, 76: 20, 77: 14, 78: 19, 79: 25, 80: 8, 81: 11, 82: 15,
  83: 10, 84: 17, 85: 17, 86: 4, 87: 7, 88: 11, 89: 3, 90: 5, 91: 10,
  92: 3, 93: 13, 94: 20, 95: 2, 96: 9, 97: 11, 98: 3, 99: 8, 100: 12,
  101: 15,
};

const exactPatternAudits: Record<string, Partial<LungPatternDetail>> = {
  "6|Invasion of Wind-Cold": {
    points: "LU 7, LI 20, SI 7, BL 12, GB 20, LI 4",
    pointAdditions: [
      { indication: "Headache", points: "Yintang, Taiyang" },
      { indication: "Upper backache", points: "BL 13" },
    ],
    techniques: ["Use reducing method.", "Apply cupping to BL 13 for upper backache."],
    sourceAudit: {
      document: "LEC 02 Bleeding, chest Bi, Common cold.pdf",
      page: 27,
      section: "Invasion of Wind-Cold - Common Cold",
    },
  },
  "6|Invasion of Wind-Heat": {
    techniques: ["Use reducing method."],
    sourceAudit: {
      document: "LEC 02 Bleeding, chest Bi, Common cold.pdf",
      page: 27,
      section: "Invasion of Wind-Heat - Common Cold",
    },
  },
  "6|Invasion of Summer-Heat Damp": {
    pointAdditions: [
      { indication: "Prominent Heat", points: "GV 14" },
      { indication: "Prominent Dampness", points: "SP 9" },
      { indication: "Abdominal distention and loose stool", points: "ST 25" },
    ],
    techniques: ["Use reducing method."],
    sourceAudit: {
      document: "LEC 02 Bleeding, chest Bi, Common cold.pdf",
      page: 28,
      section: "Invasion of Summer-Heat Damp - Common Cold",
    },
  },
  "6|Cold with Underlying Qi Deficiency": {
    sourceAudit: {
      document: "LEC 02 Bleeding, chest Bi, Common cold.pdf",
      page: 28,
      section: "Cold with Underlying Qi Deficiency - Common Cold",
    },
  },
  "6|Cold with Underlying Yin Deficiency": {
    sourceAudit: {
      document: "LEC 02 Bleeding, chest Bi, Common cold.pdf",
      page: 29,
      section: "Cold with Underlying Yin Deficiency - Common Cold",
    },
  },
  "77|Liver-Kidney Deficiency": {
    principle: "Tonify Kidney, nourish Liver, and regulate menstruation.",
    points: "BL 18, BL 23, BL 17, CV 4, SP 6",
    techniques: ["Use reinforcing method; add moxa."],
    sourceAudit: {
      document: "LEC 17 amenorrhea, unstable pregnancy, dysmenorrhea.pdf",
      page: 12,
      section: "Liver and Kidney deficiency - Amenorrhea",
    },
  },
  "77|Depletion of Yin and Dryness of Blood": {
    principle: "Nourish Yin, clear Heat, and regulate menstruation.",
    points: "BL 18, BL 23, BL 17, SP 6, KI 6",
    pointAdditions: [{ indication: "Tidal fever, cough, or night sweating", points: "BL 43, KI 2" }],
    techniques: ["Use reinforcing method."],
    sourceAudit: {
      document: "LEC 17 amenorrhea, unstable pregnancy, dysmenorrhea.pdf",
      page: 12,
      section: "Depletion of Yin and dryness of Blood - Amenorrhea",
    },
  },
  "77|Qi and Blood Deficiency": {
    principle: "Tonify Qi, nourish Blood, and regulate menstruation.",
    points: "CV 4, BL 20, ST 36, SP 6, SP 10",
    techniques: ["Use reinforcing method; add moxa."],
    sourceAudit: {
      document: "LEC 17 amenorrhea, unstable pregnancy, dysmenorrhea.pdf",
      page: 13,
      section: "Deficiency of Qi and Blood - Amenorrhea",
    },
  },
  "77|Qi Stagnation with Blood Stasis": {
    principle: "Regulate Qi, invigorate Blood, dispel stasis, and free menstruation.",
    points: "CV 3, SP 8, LI 4, SP 6, LR 3, SP 10",
    pointAdditions: [
      { indication: "Lower abdominal distention or pain", points: "CV 6, KI 14" },
      { indication: "Chest or hypochondrial distention and fullness", points: "LR 14, TE 6" },
    ],
    techniques: ["Use reducing method."],
    sourceAudit: {
      document: "LEC 17 amenorrhea, unstable pregnancy, dysmenorrhea.pdf",
      page: 13,
      section: "Qi stagnation and Blood stasis - Amenorrhea",
    },
  },
  "77|Phlegm-Damp Obstruction in Uterus": {
    principle: "Transform Phlegm, dispel Dampness, regulate Qi and Blood, and free menstruation.",
    points: "CV 3, SP 8, ST 40, SP 6, LI 4, ST 36",
    pointAdditions: [{ indication: "Excessive white vaginal discharge", points: "BL 32" }],
    techniques: ["Use even method; add moxa."],
    sourceAudit: {
      document: "LEC 17 amenorrhea, unstable pregnancy, dysmenorrhea.pdf",
      page: 14,
      section: "Phlegm-Damp obstruction - Amenorrhea",
    },
  },
};

function cleanSentence(value: string) {
  return value.trim().replace(/\.$/, "").trim();
}

function parsePointText(pointsText: string) {
  const segments = pointsText
    .split(/(?:\.\s+|;\s*)/)
    .map(cleanSentence)
    .filter(Boolean);
  const core: string[] = [];
  const pointAdditions: PointAddition[] = [];
  const techniques: string[] = [];

  for (const segment of segments) {
    const forAdd = segment.match(/^For (.+?),\s*add (.+)$/i);
    const addFor = segment.match(/^Add (.+?) for (.+)$/i);
    const supporting = segment.match(/^Supporting:\s*(.+)$/i);

    if (forAdd) {
      pointAdditions.push({ indication: forAdd[1], points: forAdd[2] });
    } else if (addFor) {
      pointAdditions.push({ indication: addFor[2], points: addFor[1] });
    } else if (supporting) {
      pointAdditions.push({ indication: "Supporting points", points: supporting[1] });
    } else if (/\b(moxa|moxibustion|cupping|bleed|reducing|reinforcing|even method|needl)/i.test(segment)) {
      techniques.push(`${segment}.`);
    } else {
      core.push(segment);
    }
  }

  return {
    points: core.join(". ") || cleanSentence(pointsText),
    pointAdditions,
    techniques,
  };
}

function summarizeCauses(patterns: LungPatternDetail[]) {
  const names = Array.from(new Set(patterns.map((pattern) => pattern.name)));
  const selected = names.slice(0, 3);
  return `${selected.join(", ")}${names.length > selected.length ? ", and others" : ""}.`;
}

function summarizeTreatment(patterns: LungPatternDetail[]) {
  const principles = Array.from(new Set(patterns.map((pattern) => pattern.principle)));
  return principles[0] ?? "Treat according to the presenting pattern.";
}

function clinicalPearl(content: LungConditionDetail) {
  if (content.tcmNotes?.[0]) return content.tcmNotes[0];
  const sections = Array.from(
    new Set(content.patterns.map((pattern) => pattern.section).filter((section): section is string => Boolean(section))),
  );
  if (sections.length > 1) return `Differentiate ${sections.join(" from ")} before selecting treatment.`;
  if (content.redFlags?.[0]) return `Clinical safety: ${content.redFlags[0].replace(/\.$/, "")}.`;
  return "Differentiate excess, deficiency, Heat, Cold, Phlegm, Dampness, and Blood stasis before treatment.";
}

function makeClinicalSummary(identity: ConditionIdentity, content: LungConditionDetail): ClinicalSummary {
  return {
    definition: content.overview,
    causes: summarizeCauses(content.patterns),
    locationAndMechanism: locationBySystem[identity.organSystem] ?? identity.organSystem,
    treatmentRule: summarizeTreatment(content.patterns),
    clinicalPearl: clinicalPearl(content),
  };
}

function auditPattern(
  identity: ConditionIdentity,
  pattern: LungPatternDetail,
): LungPatternDetail {
  const parsed = parsePointText(pattern.points);
  const sourceAudit: SourceAudit = {
    document: identity.sourceFile,
    page: sourcePageByCourse[identity.courseNumber],
    section: pattern.name,
  };
  const normalized = {
    ...pattern,
    ...parsed,
    pointAdditions: pattern.pointAdditions ?? parsed.pointAdditions,
    techniques: pattern.techniques ?? parsed.techniques,
    sourceAudit: pattern.sourceAudit ?? sourceAudit,
  };

  return {
    ...normalized,
    ...exactPatternAudits[`${identity.courseNumber}|${pattern.name}`],
  };
}

export function auditConditionContent(
  identity: ConditionIdentity,
  content: LungConditionDetail,
): LungConditionDetail {
  const patterns = content.patterns.map((pattern) => auditPattern(identity, pattern));
  const auditedContent = { ...content, patterns };
  const sourceAudit: SourceAudit = {
    document: identity.sourceFile,
    page: sourcePageByCourse[identity.courseNumber],
    section: identity.diseaseName,
  };

  return {
    ...auditedContent,
    clinicalSummary: content.clinicalSummary ?? makeClinicalSummary(identity, auditedContent),
    sourceAudit: content.sourceAudit ?? sourceAudit,
  };
}
