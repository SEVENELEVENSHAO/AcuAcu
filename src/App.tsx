import { ArrowLeft, BookOpen, ChevronRight, Search } from "lucide-react";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import acuData from "../data/acu3-course-organ-system-chart.json";
import { heartContent } from "./heartContent";
import { liverContent } from "./liverContent";
import { lungContent, type FormulaDetail } from "./lungContent";
import { spleenContent } from "./spleenContent";
import { extractPoints, getPointMeta, type PointAction } from "./pointMeta";

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

const dataset = acuData as AcuDataset;
const expandedContentByCourse = {
  ...lungContent,
  ...heartContent,
  ...spleenContent,
  ...liverContent,
};
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

function pointGroupsFor(principle: string, pointsText: string) {
  const relevant = principleStyles.filter((style) => style.match.test(principle));
  const groups = new Map<string, { label: string; color?: string; points: string[] }>();

  function addPoint(key: string, label: string, color: string | undefined, point: string) {
    const group = groups.get(key) ?? { label, color, points: [] };
    group.points.push(point);
    groups.set(key, group);
  }

  for (const point of extractPoints(pointsText)) {
    const meta = getPointMeta(point);
    const matched = relevant.find((style) => meta.actions.includes(style.action));
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
  穿山甲: "cool",
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

function actionForPointInPattern(point: string, principle: string) {
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
      const actionStyle = actionForPointInPattern(point, pattern.principle);
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
        const firstAction = actionForPointInPattern(pair[0], pattern.principle)?.action;
        const secondAction = actionForPointInPattern(pair[1], pattern.principle)?.action;
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

export function App() {
  const [query, setQuery] = useState("");
  const [activeSystem, setActiveSystem] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    const items = [...dataset.items].sort((a, b) => a.courseNumber - b.courseNumber);
    if (!query.trim()) return items;
    return items.filter((item) => matchesSearch(item, query));
  }, [query]);

  const groups = useMemo(() => groupBySystem(filteredItems), [filteredItems]);
  const selectedCondition =
    filteredItems.find((item) => item.courseNumber === selectedId) ??
    dataset.items.find((item) => item.courseNumber === selectedId) ??
    null;

  const activeGroup = groups.find((group) => group.name === activeSystem);
  const mobilePanel = selectedCondition ? "detail" : activeGroup ? "diseases" : "systems";

  function chooseSystem(systemName: string) {
    setActiveSystem(systemName);
    setSelectedId(null);
  }

  function clearQuery() {
    setQuery("");
    setActiveSystem(null);
    setSelectedId(null);
  }

  return (
    <main className="app-shell">
      <section className="workspace">
        <header className="app-header">
          <button className="logo-button" onClick={clearQuery} type="button">
            AcuAcu
          </button>
        </header>

        <div className="search-wrap">
          <Search aria-hidden="true" size={18} />
          <input
            aria-label="Search conditions and patterns"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveSystem(null);
              setSelectedId(null);
            }}
            placeholder="Search disease, pinyin, pattern..."
          />
          {query && (
            <button className="text-button" onClick={clearQuery} type="button">
              Clear
            </button>
          )}
        </div>

        <div className={`content-grid is-${mobilePanel}`}>
          <nav className="systems-panel" aria-label="Organ systems">
            {groups.length === 0 ? (
              <div className="empty-state">No matching condition or pattern.</div>
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
                      <strong>{group.name}</strong>
                      <small>{group.items.length} conditions</small>
                    </span>
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}
          </nav>

          <section className="diseases-panel" aria-label="Diseases">
            <button className="back-button" onClick={() => setActiveSystem(null)} type="button">
              <ArrowLeft size={18} aria-hidden="true" />
              Systems
            </button>
            <div className="panel-title">
              <BookOpen size={18} aria-hidden="true" />
              <h2>{activeGroup?.name ?? "Choose a system"}</h2>
            </div>

            {!activeGroup ? (
              <div className="empty-state">Choose an organ system to view its conditions.</div>
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
                      <strong>{condition.diseaseName}</strong>
                      <small>{condition.pinyin}</small>
                      <em>{condition.subPatterns.length} patterns</em>
                    </span>
                    <ChevronRight className="disease-arrow" size={18} aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}
          </section>

          <article className="detail-panel" aria-label="Disease details">
            {selectedCondition ? (
              <DiseaseDetail
                condition={selectedCondition}
                onBack={() => setSelectedId(null)}
              />
            ) : (
              <div className="detail-placeholder">
                <BookOpen size={28} aria-hidden="true" />
                <h2>Choose a condition</h2>
                <p>Open any organ system, then select a disease to review its Acu 3 sub-patterns.</p>
              </div>
            )}
          </article>
        </div>
      </section>
    </main>
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

  function togglePattern(patternName: string) {
    setOpenPattern((current) => (current === patternName ? null : patternName));
  }

  return (
    <div className="detail-card">
      <button className="back-button detail-back" onClick={onBack} type="button">
        <ArrowLeft size={18} aria-hidden="true" />
        Conditions
      </button>

      <div className="detail-kicker">
        <span>#{condition.courseNumber}</span>
        <span>{condition.organSystem}</span>
      </div>
      <h2>{condition.diseaseName}</h2>
      <p className="pinyin">{condition.pinyin}</p>

      {expandedContent && (
        <section className="content-section">
          <h3>Overview</h3>
          <p>{expandedContent.overview}</p>
        </section>
      )}

      {expandedContent && <CommonStrategy content={expandedContent} />}

      {expandedContent?.redFlags && (
        <section className="red-flag-section">
          <h3>Red Flags</h3>
          <ul>
            {expandedContent.redFlags.map((flag) => (
              <li key={flag}>{flag}</li>
            ))}
          </ul>
        </section>
      )}

      {expandedContent?.tcmNotes && (
        <section className="content-section">
          <h3>Clinical Notes</h3>
          <ul>
            {expandedContent.tcmNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="pattern-section">
        <h3>Patterns</h3>
        {expandedContent ? (
          <div className="expanded-pattern-list">
            {expandedContent.patterns.map((pattern, index) => (
              <article
                className="expanded-pattern-card"
                key={pattern.name}
                data-open={openPattern === pattern.name}
                style={cardStyle(index)}
              >
                <button
                  className="pattern-card-summary"
                  onClick={() => togglePattern(pattern.name)}
                  type="button"
                >
                  <span>{displayPatternTitle(pattern.name)}</span>
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
                {openPattern === pattern.name && (
                  <div className="pattern-card-body">
                    {displayPatternTitle(pattern.name) !== pattern.name && (
                      <p className="full-pattern-name">{pattern.name}</p>
                    )}
                    <p>
                      <strong>Principle:</strong> {pattern.principle}
                    </p>
                    <PointPrescription principle={pattern.principle} pointsText={pattern.points} />
                    {pattern.formula && (
                      <FormulaCard formula={pattern.formula} color={colorForPrinciple(pattern.principle)} />
                    )}
                    {pattern.notes && <p>{pattern.notes}</p>}
                  </div>
                )}
              </article>
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
                  <span>{displayPatternTitle(pattern)}</span>
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
                {openPattern === pattern && (
                  <div className="pattern-card-body">
                    {displayPatternTitle(pattern) !== pattern && (
                      <p className="full-pattern-name">{pattern}</p>
                    )}
                    <p>Expanded clinical content has not been added for this pattern yet.</p>
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
  if (groups.length === 0) return null;

  return (
    <section className="common-strategy-section">
      <h3>Common Strategy</h3>
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
              <div className="strategy-group-head">{label}</div>
              {group.points.length > 0 && (
                <div className="strategy-block">
                  <span>Common points</span>
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
                  <span>Common pairings</span>
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
  return (
    <div className="formula-card" style={{ "--formula-color": color } as CSSProperties}>
      <div className="formula-card-head">
        <strong>{formula.chineseName}</strong>
        <span>{formula.pinyin}</span>
        {formula.englishName && <small>{formula.englishName}</small>}
      </div>
      <div className="formula-card-body">
        {formula.ingredients && (
          <div className="formula-ingredient-section">
            <span>Ingredients</span>
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
          <span>Actions</span>
          <p>{formula.actions.join("; ")}</p>
        </div>
        <div>
          <span>Indications</span>
          <p>{formula.indications}</p>
        </div>
      </div>
    </div>
  );
}

function PointPrescription({
  principle,
  pointsText,
}: {
  principle: string;
  pointsText: string;
}) {
  const groups = pointGroupsFor(principle, pointsText);

  return (
    <div className="point-prescription">
      <strong>Points</strong>
      {groups.map((group) => (
        <div className="point-group" key={group.label}>
          <div className="point-group-label">{group.label}</div>
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
    </div>
  );
}
