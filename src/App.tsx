import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Search,
} from "lucide-react";
import type { CSSProperties } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import acuData from "../data/acu3-course-organ-system-chart.json";
import { channelContent } from "./channelContent";
import { clinicalLecturePoints } from "./clinicalLecturePoints";
import { clinicalLectureTechniques } from "./clinicalLectureTechniques";
import { translateClinicalList, translateClinicalText } from "./clinicalTranslations";
import { auditConditionContent } from "./clinicalAudit";
import { gyneContent } from "./gyneContent";
import { heartContent } from "./heartContent";
import { kidneyContent } from "./kidneyContent";
import {
  conditionNames,
  localizedCondition,
  localizedSystem,
  type Language,
  uiText,
} from "./i18n";
import { liverContent } from "./liverContent";
import { lungContent, type FormulaDetail } from "./lungContent";
import { qiBloodContent } from "./qiBloodContent";
import { sectionLecturePoints, sectionLectureTechniques } from "./sectionLecturePoints";
import { spleenContent } from "./spleenContent";
import { extractPoints, getPointMeta, type PointAction } from "./pointMeta";

const LanguageContext = createContext<Language>("en");

function useLanguageText() {
  const language = useContext(LanguageContext);
  return { language, text: uiText[language] };
}

type AcuCondition = {
  courseNumber: number;
  organSystem: string;
  diseaseName: string;
  pinyin: string;
  subPatterns: string[];
  sourceFile: string;
};

type AcuDataset = {
  conditionCount: number;
  internalMedicineCount: number;
  obGynCount: number;
  items: AcuCondition[];
};

type SystemGroup = {
  name: string;
  items: AcuCondition[];
};

type BigPattern = {
  name: string;
  key: string;
  diseaseCount: number;
  occurrences: Array<{
    condition: AcuCondition;
    pattern: NonNullable<(typeof expandedContentByCourse)[number]>["patterns"][number];
  }>;
};

const bigPatternsSystem = "Big Patterns";
const dataset = acuData as AcuDataset;
const rawContentByCourse = {
  ...lungContent,
  ...heartContent,
  ...spleenContent,
  ...liverContent,
  ...kidneyContent,
  ...qiBloodContent,
  ...channelContent,
  ...gyneContent,
};

const unmatchedLectureMappings: string[] = [];
for (const [key, points] of Object.entries(clinicalLecturePoints)) {
  const separator = key.indexOf("|");
  const courseNumber = Number(key.slice(0, separator));
  const patternName = key.slice(separator + 1);
  const content = rawContentByCourse[courseNumber as keyof typeof rawContentByCourse];
  const pattern = content?.patterns.find((candidate) => candidate.name.toLowerCase() === patternName);

  if (!pattern) {
    unmatchedLectureMappings.push(key);
    continue;
  }

  if (courseNumber === 47 && pattern.name.startsWith("Attack of")) {
    continue;
  }

  pattern.points = points;
  const techniques = clinicalLectureTechniques[key];
  if (techniques) pattern.techniques = techniques;
  pattern.notes = `${pattern.notes ?? ""} Core points are aligned to the reviewed course lecture; technique, additions, and clinical suitability still require practitioner judgment.`.trim();
}

if (unmatchedLectureMappings.length > 0) {
  throw new Error(`Unmatched lecture point mappings: ${unmatchedLectureMappings.join(", ")}`);
}

const unmatchedSectionMappings: string[] = [];
for (const [key, points] of Object.entries(sectionLecturePoints)) {
  const [coursePart, sectionPart, ...patternParts] = key.split("|");
  const courseNumber = Number(coursePart);
  const patternName = patternParts.join("|");
  const content = rawContentByCourse[courseNumber as keyof typeof rawContentByCourse];
  const pattern = content?.patterns.find((candidate) =>
    candidate.section?.toLowerCase() === sectionPart && candidate.name.toLowerCase() === patternName
  );
  if (!pattern) {
    unmatchedSectionMappings.push(key);
    continue;
  }
  pattern.points = points;
  const techniques = sectionLectureTechniques[key];
  if (techniques) pattern.techniques = techniques;
  pattern.notes = `${pattern.notes ?? ""} Section-specific core points are aligned to the reviewed course lecture.`.trim();
}

if (unmatchedSectionMappings.length > 0) {
  throw new Error(`Unmatched section-specific lecture mappings: ${unmatchedSectionMappings.join(", ")}`);
}

const patternsWithoutDedicatedLectureProtocol = [
  "22|qi stagnation with spleen qi deficiency and phlegm",
  "23|turbid phlegm-wind",
];

for (const key of patternsWithoutDedicatedLectureProtocol) {
  const separator = key.indexOf("|");
  const courseNumber = Number(key.slice(0, separator));
  const patternName = key.slice(separator + 1);
  const content = rawContentByCourse[courseNumber as keyof typeof rawContentByCourse];
  const pattern = content?.patterns.find((candidate) => candidate.name.toLowerCase() === patternName);
  if (!pattern) throw new Error(`Missing unsupported-pattern gate: ${key}`);

  pattern.points = "No dedicated course point prescription is published for this named pattern.";
  pattern.formula = undefined;
  pattern.notes = "The mechanism is retained for differentiation, but the prior app-generated point and formula treatment is withheld pending an approved source.";
}

const expandedContentByCourse = Object.fromEntries(
  dataset.items.flatMap((condition) => {
    const content = rawContentByCourse[condition.courseNumber];
    return content
      ? [[condition.courseNumber, auditConditionContent(condition, content)]]
      : [];
  }),
) as typeof rawContentByCourse;

export const contentByCourseForVerification = expandedContentByCourse;
const categoryOrder = [
  "Lung System Disorders",
  "Heart and Mind Disorders",
  "Spleen and Stomach Disorders",
  "Liver and Gallbladder Disorders",
  "Kidney and Bladder Disorders",
  "Qi, Blood, and Fluid Disorders",
  "Channel and Body Disorders",
  "Gynecology and Obstetrics (Fu Ke)",
];

const categoryIcons: Record<string, string> = {
  "Lung System Disorders": "💨",
  "Heart and Mind Disorders": "❤️",
  "Spleen and Stomach Disorders": "🍞",
  "Liver and Gallbladder Disorders": "🌿",
  "Kidney and Bladder Disorders": "💧",
  "Qi, Blood, and Fluid Disorders": "🩸",
  "Channel and Body Disorders": "🧍",
  "Gynecology and Obstetrics (Fu Ke)": "🌙",
  [bigPatternsSystem]: "🧩",
};

const cardColors = ["#f0bf32", "#089b78", "#ff6b5f", "#367395", "#8a74ff", "#91c8f5"];

function cardColor(index: number) {
  return cardColors[index % cardColors.length];
}

function cardStyle(index: number): CSSProperties {
  return { "--card-color": cardColor(index) } as CSSProperties;
}

function displayPatternTitle(patternName: string) {
  return patternName
    .replace(/^Invasion of the Lung by /, "")
    .replace(/^Invasion of /, "")
    .replace(/ Invading Lung$/, "")
    .replace(/ Retention in Lung$/, "")
    .replace(/ in Lungs$/, "")
    .replace(/ in Lung$/, "")
    .replace(/ of Lung and Kidney$/, "")
    .replace(/ due to /, " due to ")
    .replace(/\bLU\b/g, "Lung")
    .replace(/\bLR\b/g, "Liver")
    .replace(/\bKI\b/g, "Kidney")
    .replace(/\bKD\b/g, "Kidney")
    .replace(/\bHT\b/g, "Heart")
    .replace(/\bSP\b/g, "Spleen")
    .replace(/\bST\b/g, "Stomach")
    .trim();
}

const principleStyles: Array<{
  action: PointAction;
  label: string;
  color: string;
  match: RegExp;
}> = [
  { action: "release", label: "Release Exterior", color: "#f0bf32", match: /release|exterior|wind|scatter|dispel|expel/i },
  { action: "clearHeat", label: "Clear Heat", color: "#ff6b5f", match: /clear|heat|fire|toxin|detox/i },
  { action: "resolvePhlegm", label: "Resolve Phlegm/Damp", color: "#089b78", match: /phlegm|damp|turbid/i },
  { action: "descendLung", label: "Descend Lung Qi", color: "#367395", match: /descend|downbear|breath|pant|cough|wheez/i },
  { action: "regulateQi", label: "Regulate Qi", color: "#0f9f9a", match: /regulate|move qi|soothe|qi obstruction|stagnation/i },
  { action: "tonifyQi", label: "Tonify Qi", color: "#5b7cfa", match: /tonify|boost|supplement|benefit|strengthen|fortify|consolidate/i },
  { action: "nourishYin", label: "Nourish Yin/Fluids", color: "#8a74ff", match: /nourish|yin|fluid|moisten/i },
  { action: "warmYang", label: "Warm Yang", color: "#ff8a3d", match: /warm|yang|moxa/i },
  { action: "moveBlood", label: "Move Blood", color: "#d94f7c", match: /blood|stasis/i },
  { action: "openOrifices", label: "Open Orifices", color: "#292929", match: /orifice|spirit|arouse/i },
  { action: "calmShen", label: "Calm Shen", color: "#6f647a", match: /mind|heart|spirit|shen/i },
  { action: "stopSweat", label: "Stop Sweating", color: "#a77a33", match: /sweat/i },
  { action: "promoteWater", label: "Move Water", color: "#42a5d6", match: /water|fluid|disinhibit|urine/i },
];

function pointGroupsFor(
  principle: string,
  pointsText: string,
  pointRoles: Record<string, PointAction> = {},
) {
  const relevant = principleStyles.filter((style) => style.match.test(principle));
  const groups = new Map<string, { label: string; color?: string; points: string[] }>();

  function addPoint(key: string, label: string, color: string | undefined, point: string) {
    const group = groups.get(key) ?? { label, color, points: [] };
    group.points.push(point);
    groups.set(key, group);
  }

  for (const point of extractPoints(pointsText)) {
    const meta = getPointMeta(point);
    const approvedRole = pointRoles[point];
    const matched = approvedRole
      ? styleForAction(approvedRole)
      : relevant.find((style) => meta.actions.includes(style.action));
    if (matched) {
      addPoint(matched.action, matched.label, matched.color, point);
    } else {
      addPoint("neutral", "General Prescription", undefined, point);
    }
  }

  return Array.from(groups.values());
}

function pointTileClass(code: string, extraClass = "") {
  const meta = getPointMeta(code);
  const isWide = meta.code.length > 9 || meta.chineseName.length > 4;
  return `point-tile ${extraClass} ${isWide ? "wide" : ""}`.trim();
}

function styleForAction(action: PointAction) {
  return principleStyles.find((style) => style.action === action);
}

function colorForPrinciple(principle: string) {
  return principleStyles.find((style) => style.match.test(principle))?.color ?? "#26312d";
}

type HerbProperty = "hot" | "warm" | "neutral" | "cool" | "cold";

const herbProperties: Record<string, HerbProperty> = {
  荆芥: "warm",
  防风: "warm",
  羌活: "warm",
  独活: "warm",
  柴胡: "cool",
  川芎: "warm",
  前胡: "cool",
  桔梗: "neutral",
  枳壳: "cool",
  茯苓: "neutral",
  甘草: "neutral",
  金银花: "cold",
  连翘: "cool",
  牛蒡子: "cold",
  薄荷: "cool",
  淡豆豉: "cool",
  淡竹叶: "cold",
  芦根: "cold",
  藿香: "warm",
  厚朴: "warm",
  陈皮: "warm",
  紫苏叶: "warm",
  白芷: "warm",
  半夏曲: "warm",
  大腹皮: "warm",
  白术: "warm",
  生姜: "warm",
  大枣: "warm",
  炙甘草: "warm",
  人参: "warm",
  葛根: "cool",
  半夏: "warm",
  木香: "warm",
  玉竹: "cool",
  葱白: "warm",
  白薇: "cold",
  桃仁: "neutral",
  红花: "warm",
  当归: "warm",
  当归尾: "warm",
  生地黄: "cold",
  熟地黄: "warm",
  赤芍: "cool",
  牛膝: "neutral",
  怀牛膝: "neutral",
  川牛膝: "neutral",
  生甘草: "neutral",
  生甘草梢: "neutral",
  瓜蒌实: "cold",
  薤白: "warm",
  白酒: "warm",
  枳实: "cool",
  桂枝: "warm",
  丹参: "cool",
  玄参: "cold",
  茯神: "neutral",
  五味子: "warm",
  远志: "warm",
  天冬: "cold",
  麦冬: "cool",
  柏子仁: "neutral",
  酸枣仁: "neutral",
  朱砂: "cold",
  黄芪: "warm",
  龙眼肉: "warm",
  石菖蒲: "warm",
  龙齿: "neutral",
  黄连: "cold",
  黄芩: "cold",
  芍药: "cool",
  白芍: "cool",
  阿胶: "neutral",
  鸡子黄: "neutral",
  竹茹: "cool",
  龙胆草: "cold",
  栀子: "cold",
  泽泻: "cold",
  木通: "cold",
  车前子: "cold",
  竹叶: "cold",
  苏叶: "warm",
  香附: "neutral",
  牡丹皮: "cool",
  小麦: "cool",
  天麻: "neutral",
  川贝母: "cool",
  胆南星: "cool",
  全蝎: "neutral",
  僵蚕: "neutral",
  琥珀: "neutral",
  山药: "neutral",
  山茱萸: "warm",
  枸杞子: "neutral",
  鹿角胶: "warm",
  菟丝子: "warm",
  龟甲胶: "cool",
  苏合香: "warm",
  安息香: "neutral",
  冰片: "cool",
  麝香: "warm",
  沉香: "warm",
  丁香: "warm",
  诃子: "neutral",
  荜茇: "hot",
  乳香: "warm",
  石膏: "cold",
  寒水石: "cold",
  滑石: "cold",
  磁石: "cold",
  羚羊角: "cold",
  升麻: "cool",
  朴硝: "cold",
  硝石: "cold",
  黄金: "neutral",
  附子: "hot",
  干姜: "hot",
  礞石: "neutral",
  大黄: "cold",
  南星: "warm",
  橘红: "warm",
  赤茯苓: "neutral",
  代赭石: "cold",
  龙骨: "neutral",
  牡蛎: "cool",
  龟板: "cool",
  川楝子: "cold",
  生麦芽: "neutral",
  茵陈: "cool",
  地龙: "cold",
  白扁豆: "warm",
  白头翁: "cold",
  北沙参: "cool",
  补骨脂: "warm",
  苍术: "warm",
  草豆蔻: "warm",
  当归身: "warm",
  高良姜: "hot",
  荷叶蒂: "neutral",
  黄柏: "cold",
  火麻仁: "neutral",
  粳米: "neutral",
  莱菔子: "neutral",
  莲子: "neutral",
  芒硝: "cold",
  蒲黄: "neutral",
  秦皮: "cold",
  肉苁蓉: "warm",
  肉豆蔻: "warm",
  肉桂: "hot",
  桑叶: "cold",
  沙参: "cool",
  砂仁: "warm",
  山楂: "warm",
  神曲: "warm",
  生扁豆: "cool",
  柿蒂: "neutral",
  天花粉: "cool",
  吴茱萸: "hot",
  五灵脂: "warm",
  杏仁: "warm",
  旋覆花: "warm",
  饴糖: "warm",
  薏苡仁: "cool",
  罂粟壳: "neutral",
  郁金: "cold",
  白豆蔻: "warm",
  贝母: "cool",
  常山: "cold",
  杜仲: "warm",
  藁本: "warm",
  钩藤: "cool",
  瓜蒌根: "cold",
  海带: "cold",
  海藻: "cold",
  何首乌: "warm",
  红枣: "warm",
  菊花: "cool",
  昆布: "cold",
  老葱: "warm",
  蔓荆子: "cool",
  青蒿: "cold",
  青皮: "warm",
  桑寄生: "neutral",
  射干: "cold",
  石决明: "cold",
  煨生姜: "warm",
  犀角: "cold",
  细辛: "warm",
  鲜姜: "warm",
  夜交藤: "neutral",
  益母草: "cool",
  知母: "cold",
  巴戟天: "warm",
  萆薢: "neutral",
  萹蓄: "cool",
  槟榔: "warm",
  草果: "warm",
  赤小豆: "neutral",
  灯心草: "cold",
  冬葵子: "cold",
  茯苓皮: "neutral",
  椒目: "warm",
  橘皮: "warm",
  莲须: "neutral",
  麻黄: "warm",
  没药: "neutral",
  木瓜: "warm",
  藕节: "neutral",
  芡实: "neutral",
  秦艽: "neutral",
  瞿麦: "cold",
  桑白皮: "cold",
  沙苑蒺藜: "warm",
  山栀子仁: "cold",
  商陆: "cold",
  生姜皮: "cool",
  生梓白皮: "cold",
  石韦: "cool",
  王不留行: "neutral",
  乌药: "warm",
  小蓟: "cool",
  益智仁: "warm",
  猪苓: "neutral",
  白茅根: "cold",
  百合: "cold",
  鳖甲: "cool",
  侧柏叶: "cold",
  大戟: "cold",
  大蓟: "cool",
  覆盆子: "warm",
  甘遂: "cold",
  干地黄: "cold",
  荷叶: "neutral",
  苦桔梗: "neutral",
  茜草根: "cold",
  苇根: "cold",
  细生地: "cold",
  芫花: "warm",
  灶心黄土: "warm",
  竹叶心: "cold",
  棕榈皮: "neutral",
  川乌: "hot",
  防己: "cold",
  蜂蜜: "neutral",
  胡麻仁: "neutral",
  虎骨: "warm",
  枇杷叶: "cool",
  锁阳: "warm",
  威灵仙: "warm",
  白果: "neutral",
  椿根皮: "cold",
  地骨皮: "cold",
  官桂: "hot",
  黑芥穗: "warm",
  漏芦: "cold",
  蒲公英: "cold",
  七孔猪蹄: "neutral",
  全当归: "warm",
  通草: "cool",
  小茴香: "warm",
  续断: "warm",
  延胡索: "warm",
  野菊花: "cool",
  紫背天葵子: "cold",
  紫花地丁: "cold",
};

function propertyForIngredient(chineseName: string): HerbProperty {
  return herbProperties[chineseName] ?? "neutral";
}

function propertyLabel(property: HerbProperty) {
  return property[0].toUpperCase() + property.slice(1);
}

function pointPairStyle(firstPoint: string, secondPoint: string): CSSProperties {
  const palette = [
    "#ff6b5f",
    "#2f9cf4",
    "#f0bf32",
    "#08b98f",
    "#8a74ff",
    "#f05aa5",
    "#5b7cfa",
    "#ff8a3d",
    "#1aa37a",
    "#ff5757",
    "#6c63ff",
    "#d79b25",
  ];

  function colorIndexForPoint(point: string) {
    const total = Array.from(point).reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return total % palette.length;
  }

  const firstIndex = colorIndexForPoint(firstPoint);
  let secondIndex = colorIndexForPoint(secondPoint);
  const distance = Math.abs(firstIndex - secondIndex);
  if (distance < 3 || distance > palette.length - 3) {
    secondIndex = (secondIndex + Math.floor(palette.length / 2)) % palette.length;
  }

  const first = palette[firstIndex];
  const second = palette[secondIndex];

  return { "--pair-color-a": first, "--pair-color-b": second } as CSSProperties;
}

function actionForPointInPattern(
  point: string,
  principle: string,
  pointRoles: Record<string, PointAction> = {},
) {
  const approvedRole = pointRoles[point];
  if (approvedRole) return styleForAction(approvedRole) ?? null;

  const meta = getPointMeta(point);
  const relevant = principleStyles.filter((style) => style.match.test(principle));
  const matched = relevant.find((style) => meta.actions.includes(style.action));
  if (matched) return matched;

  const fallback = meta.actions.map(styleForAction).find(Boolean);
  return fallback ?? null;
}

function commonPointStrategy(content: (typeof expandedContentByCourse)[number]) {
  const pointMap = new Map<
    string,
    {
      code: string;
      count: number;
      actions: Map<PointAction | "neutral", number>;
    }
  >();
  const pairMap = new Map<
    string,
    {
      points: [string, string];
      count: number;
      actions: Map<PointAction | "neutral", number>;
    }
  >();

  for (const pattern of content.patterns) {
    const points = extractPoints(pattern.points);

    for (const point of points) {
      const actionStyle = actionForPointInPattern(point, pattern.principle, pattern.pointRoles);
      const action = actionStyle?.action ?? "neutral";
      const entry = pointMap.get(point) ?? { code: point, count: 0, actions: new Map() };
      entry.count += 1;
      entry.actions.set(action, (entry.actions.get(action) ?? 0) + 1);
      pointMap.set(point, entry);
    }

    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const pair = [points[i], points[j]].sort() as [string, string];
        const key = pair.join("|");
        const firstAction = actionForPointInPattern(pair[0], pattern.principle, pattern.pointRoles)?.action;
        const secondAction = actionForPointInPattern(pair[1], pattern.principle, pattern.pointRoles)?.action;
        const action = firstAction && firstAction === secondAction
          ? firstAction
          : principleStyles.find((style) => style.match.test(pattern.principle))?.action ?? "neutral";
        const entry = pairMap.get(key) ?? { points: pair, count: 0, actions: new Map() };
        entry.count += 1;
        entry.actions.set(action, (entry.actions.get(action) ?? 0) + 1);
        pairMap.set(key, entry);
      }
    }
  }

  const commonPoints = Array.from(pointMap.values())
    .sort((a, b) => b.count - a.count || a.code.localeCompare(b.code))
    .filter((point, index) => point.count > 1 || index < 6);

  const commonPairs = Array.from(pairMap.values())
    .sort((a, b) => b.count - a.count || a.points.join(" ").localeCompare(b.points.join(" ")))
    .filter((pair, index) => pair.count > 1 || index < 6)
    .slice(0, 12);

  function dominantAction(actions: Map<PointAction | "neutral", number>) {
    return Array.from(actions.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "neutral";
  }

  const groups = new Map<
    string,
    {
      label: string;
      color?: string;
      points: typeof commonPoints;
      pairs: typeof commonPairs;
    }
  >();

  function groupFor(action: PointAction | "neutral") {
    const style = action === "neutral" ? null : styleForAction(action);
    const key = action;
    const group = groups.get(key) ?? {
      label: style?.label ?? "General Strategy",
      color: style?.color,
      points: [],
      pairs: [],
    };
    groups.set(key, group);
    return group;
  }

  for (const point of commonPoints) {
    groupFor(dominantAction(point.actions)).points.push(point);
  }

  for (const pair of commonPairs) {
    groupFor(dominantAction(pair.actions)).pairs.push(pair);
  }

  return Array.from(groups.values()).filter((group) => group.points.length || group.pairs.length);
}

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function expandedSearchText(condition: AcuCondition) {
  const content = expandedContentByCourse[condition.courseNumber];
  if (!content) return "";

  return [
    content.overview,
    ...(content.tcmNotes ?? []),
    ...(content.redFlags ?? []),
    ...content.patterns.flatMap((pattern) => [
      pattern.name,
      pattern.principle,
      pattern.points,
      pattern.formula?.chineseName ?? "",
      pattern.formula?.pinyin ?? "",
      pattern.formula?.englishName ?? "",
      ...(pattern.formula?.actions ?? []),
      pattern.formula?.indications ?? "",
      pattern.notes ?? "",
    ]),
  ].join(" ");
}

function matchesSearch(condition: AcuCondition, query: string) {
  const haystack = [
    condition.courseNumber.toString(),
    condition.organSystem,
    condition.diseaseName,
    condition.pinyin,
    condition.sourceFile,
    condition.subPatterns.join(" "),
    conditionNames[condition.courseNumber] ?? "",
    expandedSearchText(condition),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalize(query));
}

function groupBySystem(items: AcuCondition[]) {
  const groups = new Map<string, AcuCondition[]>();

  for (const item of items) {
    const existing = groups.get(item.organSystem) ?? [];
    existing.push(item);
    groups.set(item.organSystem, existing);
  }

  return Array.from(groups.entries())
    .map(([name, groupItems]) => ({
      name,
      items: groupItems.sort((a, b) => a.courseNumber - b.courseNumber),
    }))
    .sort((a, b) => {
      const aIndex = categoryOrder.indexOf(a.name);
      const bIndex = categoryOrder.indexOf(b.name);
      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    });
}

function bigPatternKey(name: string) {
  return displayPatternTitle(name)
    .toLowerCase()
    .replace(/\s*\/\s*/g, " / ")
    .replace(/\s+/g, " ")
    .trim();
}

const deficiencyMasters = [
  "Qi Deficiency",
  "Blood Deficiency",
  "Yin Deficiency",
  "Yang Deficiency",
] as const;

function bigPatternMaster(name: string) {
  const title = displayPatternTitle(name);
  if (/\b(Qi|Blood|Yin|Yang)\s+and\s+(Qi|Blood|Yin|Yang)\s+Deficiency\b/i.test(title)) {
    return title;
  }

  const classificationTitle = title.replace(/\bYang Qi Deficiency\b/gi, "Yang Deficiency");
  const matchingMasters = deficiencyMasters.filter((master) =>
    new RegExp(`\\b${master}\\b`, "i").test(classificationTitle),
  );

  return matchingMasters.length === 1 ? matchingMasters[0] : title;
}

function collectBigPatterns() {
  const patternMap = new Map<string, BigPattern>();

  for (const condition of dataset.items) {
    const content = expandedContentByCourse[condition.courseNumber];
    if (!content) continue;

    for (const pattern of content.patterns) {
      const masterName = bigPatternMaster(pattern.name);
      const key = bigPatternKey(masterName);
      const entry = patternMap.get(key) ?? {
        name: masterName,
        key,
        diseaseCount: 0,
        occurrences: [],
      };
      entry.occurrences.push({ condition, pattern });
      patternMap.set(key, entry);
    }
  }

  return Array.from(patternMap.values())
    .map((entry) => ({
      ...entry,
      diseaseCount: new Set(entry.occurrences.map(({ condition }) => condition.courseNumber)).size,
    }))
    .filter((entry) => entry.diseaseCount >= 2)
    .sort((a, b) => b.diseaseCount - a.diseaseCount || a.name.localeCompare(b.name));
}

export function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [query, setQuery] = useState("");
  const [activeSystem, setActiveSystem] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedBigPattern, setSelectedBigPattern] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    const items = [...dataset.items].sort((a, b) => a.courseNumber - b.courseNumber);
    if (!query.trim()) return items;
    return items.filter((item) => matchesSearch(item, query));
  }, [query]);

  const groups = useMemo(() => groupBySystem(filteredItems), [filteredItems]);
  const bigPatterns = useMemo(() => collectBigPatterns(), []);
  const activeBigPattern = bigPatterns.find((pattern) => pattern.key === selectedBigPattern) ?? null;
  const selectedCondition =
    filteredItems.find((item) => item.courseNumber === selectedId) ??
    dataset.items.find((item) => item.courseNumber === selectedId) ??
    null;

  const activeGroup = groups.find((group) => group.name === activeSystem);
  const isBigPatterns = activeSystem === bigPatternsSystem;
  const mobilePanel = selectedCondition || activeBigPattern
    ? "detail"
    : activeGroup || isBigPatterns
      ? "diseases"
      : "systems";
  const text = uiText[language];
  const canGoBack = Boolean(query || selectedCondition || activeBigPattern || activeGroup || isBigPatterns);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = language === "zh" ? "针灸三参考" : "Acu 3 Reference";
  }, [language]);

  function chooseSystem(systemName: string) {
    setActiveSystem(systemName);
    setSelectedId(null);
    setSelectedBigPattern(null);
  }

  function clearQuery() {
    setQuery("");
    setActiveSystem(null);
    setSelectedId(null);
    setSelectedBigPattern(null);
  }

  function goBack() {
    if (selectedCondition) {
      setSelectedId(null);
      return;
    }
    if (activeBigPattern) {
      setSelectedBigPattern(null);
      return;
    }
    if (activeGroup || isBigPatterns) {
      setActiveSystem(null);
      return;
    }
    if (query) setQuery("");
  }

  return (
    <LanguageContext.Provider value={language}>
      <main className="app-shell">
        <section className="workspace">
        <header className="app-header">
          <button className="logo-button" onClick={clearQuery} type="button">
            AcuAcu
          </button>
          <button
            aria-label={language === "en" ? "Switch to Chinese" : "切换到英文"}
            className="language-button"
            onClick={() => setLanguage((current) => current === "en" ? "zh" : "en")}
            type="button"
          >
            {language === "en" ? "中文" : "EN"}
          </button>
        </header>

        <div className="search-wrap">
          {canGoBack && (
            <button
              aria-label={text.back}
              className="search-back-button"
              onClick={goBack}
              type="button"
            >
              <ArrowLeft size={19} aria-hidden="true" />
            </button>
          )}
          <Search aria-hidden="true" size={18} />
          <input
            aria-label={text.searchLabel}
            value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveSystem(null);
                setSelectedId(null);
                setSelectedBigPattern(null);
            }}
            placeholder={text.searchPlaceholder}
          />
          {query && (
            <button className="text-button" onClick={clearQuery} type="button">
              {text.clear}
            </button>
          )}
        </div>

        <div className={`content-grid is-${mobilePanel}`}>
          <nav className="systems-panel" aria-label={text.systems}>
            {groups.length === 0 ? (
              <div className="empty-state">{text.noMatches}</div>
            ) : (
              <div className="system-list">
                {groups.map((group) => (
                  <button
                    className={`system-row ${group.name === activeSystem ? "active" : ""}`}
                    key={group.name}
                    onClick={() => chooseSystem(group.name)}
                    type="button"
                  >
                    <span className="system-icon" aria-hidden="true">
                      {categoryIcons[group.name] ?? "📚"}
                    </span>
                    <span>
                      <strong>{localizedSystem(group.name, language)}</strong>
                      <small>{group.items.length} {text.conditions}</small>
                    </span>
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                ))}
                {!query && (
                  <button
                    className={`system-row ${isBigPatterns ? "active" : ""}`}
                    onClick={() => chooseSystem(bigPatternsSystem)}
                    type="button"
                  >
                    <span className="system-icon" aria-hidden="true">🧩</span>
                    <span>
                      <strong>{text.bigPatterns}</strong>
                      <small>{bigPatterns.length} {text.sharedPatterns}</small>
                    </span>
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                )}
              </div>
            )}
          </nav>

          <section className="diseases-panel" aria-label={text.conditionList}>
            <button className="back-button" onClick={() => setActiveSystem(null)} type="button">
              <ArrowLeft size={18} aria-hidden="true" />
              {text.systems}
            </button>
            <div className="panel-title">
              <BookOpen size={18} aria-hidden="true" />
              <h2>
                {isBigPatterns
                  ? text.bigPatterns
                  : activeGroup
                    ? localizedSystem(activeGroup.name, language)
                    : text.chooseSystem}
              </h2>
            </div>

            {isBigPatterns ? (
              <div className="disease-list">
                {bigPatterns.map((pattern, index) => (
                  <button
                    className={`disease-row big-pattern-row ${
                      pattern.key === selectedBigPattern ? "active" : ""
                    }`}
                    style={cardStyle(index)}
                    key={pattern.key}
                    onClick={() => setSelectedBigPattern(pattern.key)}
                    type="button"
                  >
                    <span className="big-pattern-count">{pattern.diseaseCount}</span>
                    <span>
                      <strong>{translateClinicalText(pattern.name, language)}</strong>
                      <small>{text.sharedAcross} {pattern.diseaseCount} {text.diseases}</small>
                    </span>
                    <ChevronRight className="disease-arrow" size={18} aria-hidden="true" />
                  </button>
                ))}
              </div>
            ) : !activeGroup ? (
              <div className="empty-state">{text.chooseSystemPrompt}</div>
            ) : (
              <div className="disease-list">
                {activeGroup.items.map((condition, index) => (
                  <button
                    className={`disease-row ${
                      condition.courseNumber === selectedCondition?.courseNumber ? "active" : ""
                    }`}
                    style={cardStyle(index)}
                    key={condition.courseNumber}
                    onClick={() => setSelectedId(condition.courseNumber)}
                    type="button"
                  >
                    <span className="course-number">{condition.courseNumber}</span>
                    <span>
                      <strong>{localizedCondition(condition, language)}</strong>
                      <small>{condition.pinyin}</small>
                      <em>
                        {expandedContentByCourse[condition.courseNumber]?.patterns.length ??
                          condition.subPatterns.length} {text.patternCount}
                      </em>
                    </span>
                    <ChevronRight className="disease-arrow" size={18} aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}
          </section>

          <article className="detail-panel" aria-label={text.conditionList}>
            {activeBigPattern ? (
              <BigPatternDetail
                key={activeBigPattern.key}
                bigPattern={activeBigPattern}
                onBack={() => setSelectedBigPattern(null)}
              />
            ) : selectedCondition ? (
              <DiseaseDetail
                condition={selectedCondition}
                onBack={() => setSelectedId(null)}
              />
            ) : (
              <div className="detail-placeholder">
                <BookOpen size={28} aria-hidden="true" />
                <h2>{isBigPatterns ? text.chooseBigPattern : text.chooseCondition}</h2>
                <p>
                  {isBigPatterns
                    ? text.bigPatternPrompt
                    : text.conditionPrompt}
                </p>
              </div>
            )}
          </article>
        </div>
        </section>
      </main>
    </LanguageContext.Provider>
  );
}

function BigPatternDetail({
  bigPattern,
  onBack,
}: {
  bigPattern: BigPattern;
  onBack: () => void;
}) {
  const [openComparison, setOpenComparison] = useState<string | null>(null);
  const { language, text } = useLanguageText();

  return (
    <div className="detail-card big-pattern-detail">
      <button className="back-button detail-back" onClick={onBack} type="button">
        <ArrowLeft size={18} aria-hidden="true" />
        {text.bigPatterns}
      </button>

      <div className="detail-kicker">
        <span>{text.sharedPattern}</span>
        <span>{bigPattern.diseaseCount} {text.diseases}</span>
      </div>
      <h2>{translateClinicalText(bigPattern.name, language)}</h2>
      <p className="pinyin">{text.crossDisease}</p>

      <section className="pattern-section">
        <h3>{text.appearsIn}</h3>
        <div className="big-pattern-comparisons">
          {bigPattern.occurrences.map(({ condition, pattern }, index) => {
            const comparisonKey = `${condition.courseNumber}-${pattern.section ?? ""}-${pattern.name}`;
            const isOpen = openComparison === comparisonKey;

            return (
              <article
                className="big-pattern-comparison"
                data-open={isOpen}
                key={comparisonKey}
                style={cardStyle(index)}
              >
                <button
                  aria-expanded={isOpen}
                  className="big-pattern-comparison-summary"
                  onClick={() => setOpenComparison(isOpen ? null : comparisonKey)}
                  type="button"
                >
                  <span className="comparison-course">#{condition.courseNumber}</span>
                  <span className="comparison-condition">
                    <strong>{localizedCondition(condition, language)}</strong>
                    <small>{localizedSystem(condition.organSystem, language)}</small>
                  </span>
                  <ChevronRight size={18} aria-hidden="true" />
                </button>

                {isOpen && (
                  <div className="big-pattern-comparison-body">
                    {pattern.section && (
                      <div className="comparison-section">
                        {translateClinicalText(pattern.section, language)}
                      </div>
                    )}
                    {displayPatternTitle(pattern.name) !== bigPattern.name && (
                      <div className="comparison-specific-pattern">
                        <span>{text.pattern}</span>
                        <strong>
                          {translateClinicalText(displayPatternTitle(pattern.name), language)}
                        </strong>
                      </div>
                    )}
                    <p>
                      <strong>{text.principle}</strong>{" "}
                      {translateClinicalText(pattern.principle, language)}
                    </p>
                    <PointPrescription
                      additions={pattern.pointAdditions}
                      principle={pattern.principle}
                      pointsText={pattern.points}
                      techniques={pattern.techniques}
                    />
                    {pattern.formula && (
                      <div className="comparison-formula">
                        <strong>{pattern.formula.chineseName}</strong>
                        <span>{pattern.formula.pinyin}</span>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}



function DiseaseDetail({
  condition,
  onBack,
}: {
  condition: AcuCondition;
  onBack: () => void;
}) {
  const expandedContent = expandedContentByCourse[condition.courseNumber];
  const [openPattern, setOpenPattern] = useState<string | null>(null);
  const { language, text } = useLanguageText();

  function togglePattern(patternKey: string) {
    setOpenPattern((current) => (current === patternKey ? null : patternKey));
  }

  return (
    <div className="detail-card">
      <button className="back-button detail-back" onClick={onBack} type="button">
        <ArrowLeft size={18} aria-hidden="true" />
        {text.conditionList}
      </button>

      <div className="detail-kicker">
        <span>#{condition.courseNumber}</span>
        <span>{localizedSystem(condition.organSystem, language)}</span>
      </div>
      <h2>{localizedCondition(condition, language)}</h2>
      <p className="pinyin">{condition.pinyin}</p>

      {expandedContent && <CommonStrategy content={expandedContent} />}

      {expandedContent?.redFlags && (
        <section className="red-flag-section">
          <h3>{text.redFlags}</h3>
          <ul>
            {translateClinicalList(expandedContent.redFlags, language).map((flag) => (
              <li key={flag}>{flag}</li>
            ))}
          </ul>
        </section>
      )}

      {expandedContent?.tcmNotes && (
        <section className="content-section">
          <h3>{text.clinicalNotes}</h3>
          <ul>
            {translateClinicalList(expandedContent.tcmNotes, language).map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="pattern-section">
        <h3>{text.patterns}</h3>
        {expandedContent ? (
          <div className="expanded-pattern-list">
            {Array.from(
              expandedContent.patterns.reduce((groups, pattern) => {
                const section = pattern.section ?? "";
                const items = groups.get(section) ?? [];
                items.push(pattern);
                groups.set(section, items);
                return groups;
              }, new Map<string, typeof expandedContent.patterns>()),
            ).map(([section, patterns]) => (
              <section className="pattern-subsection" key={section || "all-patterns"}>
                {section && <h4>{translateClinicalText(section, language)}</h4>}
                {patterns.map((pattern) => {
                  const index = expandedContent.patterns.indexOf(pattern);
                  const patternKey = `${section}|${pattern.name}`;
                  return (
                    <article
                      className="expanded-pattern-card"
                      key={patternKey}
                      data-open={openPattern === patternKey}
                      style={cardStyle(index)}
                    >
                      <button
                        className="pattern-card-summary"
                        onClick={() => togglePattern(patternKey)}
                        type="button"
                      >
                        <span>
                          {translateClinicalText(displayPatternTitle(pattern.name), language)}
                        </span>
                        <ChevronRight size={18} aria-hidden="true" />
                      </button>
                      {openPattern === patternKey && (
                        <div className="pattern-card-body">
                          <p>
                            <strong>{text.principle}</strong>{" "}
                            {translateClinicalText(pattern.principle, language)}
                          </p>
                          <PointPrescription
                            additions={pattern.pointAdditions}
                            pointRoles={pattern.pointRoles}
                            principle={pattern.principle}
                            pointsText={pattern.points}
                            techniques={pattern.techniques}
                          />
                          {pattern.formula && (
                            <FormulaCard formula={pattern.formula} color={colorForPrinciple(pattern.principle)} />
                          )}
                          {pattern.notes && (
                            <p>{translateClinicalText(pattern.notes, language)}</p>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
              </section>
            ))}
          </div>
        ) : (
          <div className="expanded-pattern-list">
            {condition.subPatterns.map((pattern, index) => (
              <article
                className="expanded-pattern-card compact-pattern-card"
                key={pattern}
                data-open={openPattern === pattern}
                style={cardStyle(index)}
              >
                <button
                  className="pattern-card-summary"
                  onClick={() => togglePattern(pattern)}
                  type="button"
                >
                  <span>{translateClinicalText(displayPatternTitle(pattern), language)}</span>
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
                {openPattern === pattern && (
                  <div className="pattern-card-body">
                    {displayPatternTitle(pattern) !== pattern && (
                      <p className="full-pattern-name">
                        {translateClinicalText(pattern, language)}
                      </p>
                    )}
                    <p>{text.contentPending}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

function CommonStrategy({ content }: { content: (typeof expandedContentByCourse)[number] }) {
  const groups = commonPointStrategy(content);
  const { language, text } = useLanguageText();
  if (groups.length === 0) return null;

  return (
    <section className="common-strategy-section">
      <h3>{text.commonStrategy}</h3>
      <div className="strategy-groups">
        {groups.map((group) => {
          const isCompact = group.points.length <= 2 && group.pairs.length === 0;
          const label = isCompact
            ? group.label.replace("Resolve Phlegm/Damp", "Resolve Damp")
            : group.label;

          return (
            <article
              className={`strategy-group ${group.color ? "" : "neutral"} ${isCompact ? "compact" : ""}`}
              key={group.label}
              style={{ "--strategy-color": group.color ?? "#ece7de" } as CSSProperties}
            >
              <div className="strategy-group-head">
                {translateClinicalText(label, language)}
              </div>
              {group.points.length > 0 && (
                <div className="strategy-block">
                  <span>{text.commonPoints}</span>
                  <div className="strategy-point-grid">
                    {group.points.map((point) => {
                      const meta = getPointMeta(point.code);
                      return (
                        <span
                          className={pointTileClass(
                            point.code,
                            `strategy-point-tile ${group.color ? "" : "neutral"}`,
                          )}
                          key={`${group.label}-${point.code}`}
                          style={{ "--point-color": group.color ?? "#ece7de" } as CSSProperties}
                        >
                          <span className="point-name">{meta.chineseName}</span>
                          <span className="point-code">{meta.code}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
              {group.pairs.length > 0 && (
                <div className="strategy-block">
                  <span>{text.commonPairings}</span>
                  <div className="strategy-pair-list">
                    {group.pairs.map((pair) => (
                      <span
                        className={`strategy-pair-tile ${group.color ? "" : "neutral"}`}
                        key={`${group.label}-${pair.points.join("-")}`}
                        style={pointPairStyle(pair.points[0], pair.points[1])}
                      >
                        <span>{getPointMeta(pair.points[0]).code}</span>
                        <b aria-hidden="true">+</b>
                        <span>{getPointMeta(pair.points[1]).code}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function FormulaCard({
  formula,
  color,
}: {
  formula: FormulaDetail;
  color: string;
}) {
  const { language, text } = useLanguageText();
  const ingredientNames = new Set(formula.ingredients?.map((ingredient) => ingredient.pinyin) ?? []);
  const safetyWarnings: Array<{ title: string; body: string }> = [];
  if (["Fu Zi", "Chuan Wu", "Cao Wu"].some((name) => ingredientNames.has(name))) {
    safetyWarnings.push({
      title: "Aconite safety warning.",
      body: "Aconite can cause life-threatening heart and neurologic toxicity if the species, processing, dose, preparation, or combination is unsafe. This is reference content only and requires a qualified prescriber and regulated product. Do not self-prepare or self-dose.",
    });
  }
  if (ingredientNames.has("Zhu Sha")) {
    safetyWarnings.push({
      title: "Mercury-containing historical ingredient.",
      body: "Zhu Sha (cinnabar) contains mercury. Do not ingest or self-prepare this formula. The composition is shown only as a historical reference and requires jurisdiction-specific professional and regulatory review.",
    });
  }
  if (ingredientNames.has("Bai Guo")) {
    safetyWarnings.push({
      title: "Ginkgo seed toxicity warning.",
      body: "Bai Guo seeds can cause serious poisoning, especially when raw, improperly prepared, or taken in excess. Exact-dose use requires a qualified prescriber and a regulated, correctly processed product.",
    });
  }
  if (ingredientNames.has("Ma Huang")) {
    safetyWarnings.push({
      title: "Ephedra cardiovascular warning.",
      body: "Ma Huang can raise heart rate and blood pressure and has important medication and cardiovascular risks. Do not self-dose; screen for heart disease, hypertension, pregnancy, stimulant use, and drug interactions.",
    });
  }
  if (ingredientNames.has("Ban Xia")) {
    safetyWarnings.push({
      title: "Processing required.",
      body: "Ban Xia must be correctly identified and professionally processed; raw or improperly prepared material is irritating and toxic. Use only a regulated product under qualified supervision.",
    });
  }

  return (
    <div className="formula-card" style={{ "--formula-color": color } as CSSProperties}>
      <div className="formula-card-head">
        <strong>{formula.chineseName}</strong>
        <span>{formula.pinyin}</span>
        {language === "en" && formula.englishName && <small>{formula.englishName}</small>}
      </div>
      <div className="formula-card-body">
        <div className="formula-reference-notice" role="note">
          <BookOpen size={18} aria-hidden="true" />
          <p>
            <strong>Reference, not a prescription.</strong> Listed quantities describe source material and are not individualized dosing instructions. A qualified prescriber must verify the diagnosis, preparation, product quality, interactions, allergies, pregnancy or lactation, age, and liver or kidney function.
          </p>
        </div>
        {safetyWarnings.map((warning) => (
          <div className="formula-safety-warning" role="note" key={warning.title}>
            <AlertTriangle size={18} aria-hidden="true" />
            <p>
              <strong>{warning.title}</strong> {warning.body}
            </p>
          </div>
        ))}
        {formula.ingredients && (
          <div className="formula-ingredient-section">
            <span>{text.ingredients}</span>
            <div className="formula-ingredient-grid">
              {formula.ingredients.map((ingredient) => {
                const property = propertyForIngredient(ingredient.chineseName);

                return (
                  <article
                    className={`formula-ingredient-tile property-${property}`}
                    key={`${formula.pinyin}-${ingredient.pinyin}`}
                    title={`${ingredient.chineseName} ${ingredient.pinyin}: ${propertyLabel(property)}`}
                  >
                    <div className="formula-ingredient-name">
                      <strong>{ingredient.chineseName}</strong>
                      <small>{ingredient.pinyin}</small>
                    </div>
                    <div className="formula-ingredient-dose">{ingredient.dose}</div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
        <div>
          <span>{text.actions}</span>
          <p>{translateClinicalList(formula.actions, language).join("；")}</p>
        </div>
        <div>
          <span>{text.indications}</span>
          <p>{translateClinicalText(formula.indications, language)}</p>
        </div>
      </div>
    </div>
  );
}

function PointPrescription({
  additions = [],
  pointRoles = {},
  principle,
  pointsText,
  techniques = [],
}: {
  additions?: NonNullable<(typeof expandedContentByCourse)[number]>["patterns"][number]["pointAdditions"];
  pointRoles?: NonNullable<(typeof expandedContentByCourse)[number]>["patterns"][number]["pointRoles"];
  principle: string;
  pointsText: string;
  techniques?: NonNullable<(typeof expandedContentByCourse)[number]>["patterns"][number]["techniques"];
}) {
  const groups = pointGroupsFor(principle, pointsText, pointRoles);
  const additionColor = colorForPrinciple(principle);
  const { language, text } = useLanguageText();

  return (
    <div className="point-prescription">
      <strong>{text.corePoints}</strong>
      {groups.map((group) => (
        <div className="point-group" key={group.label}>
          <div className="point-group-label">
            {translateClinicalText(group.label, language)}
          </div>
          <div className="point-grid">
            {group.points.map((point) => {
              const meta = getPointMeta(point);
              return (
                <span
                  className={pointTileClass(point, group.color ? "" : "neutral")}
                  key={`${group.label}-${point}`}
                  style={{ "--point-color": group.color ?? "#ece7de" } as CSSProperties}
                >
                  <span className="point-name">{meta.chineseName}</span>
                  <span className="point-code">{meta.code}</span>
                </span>
              );
            })}
          </div>
        </div>
      ))}
      {extractPoints(pointsText).length === 0 && <p>{pointsText}</p>}
      {additions.length > 0 && (
        <div className="point-additions">
          <strong>{text.additions}</strong>
          {additions.map((addition) => (
            <div className="point-addition" key={`${addition.indication}-${addition.points}`}>
              <span>{translateClinicalText(addition.indication, language)}</span>
              <div className="point-grid">
                {extractPoints(addition.points).map((point) => {
                  const meta = getPointMeta(point);
                  return (
                    <span
                      className={pointTileClass(point)}
                      key={`${addition.indication}-${point}`}
                      style={{ "--point-color": additionColor } as CSSProperties}
                    >
                      <span className="point-name">{meta.chineseName}</span>
                      <span className="point-code">{meta.code}</span>
                    </span>
                  );
                })}
              </div>
              {extractPoints(addition.points).length === 0 && <p>{addition.points}</p>}
            </div>
          ))}
        </div>
      )}
      {techniques.length > 0 && (
        <div className="technique-notes">
          <strong>{text.technique}</strong>
          <ul>
            {techniques.map((technique) => (
              <li key={technique}>{translateClinicalText(technique, language)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
