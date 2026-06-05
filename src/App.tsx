import { ArrowLeft, BookOpen, ChevronRight, Search } from "lucide-react";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import acuData from "../data/acu3-course-organ-system-chart.json";
import { heartContent } from "./heartContent";
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

function colorForPrinciple(principle: string) {
  return principleStyles.find((style) => style.match.test(principle))?.color ?? "#26312d";
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
          <h1>AcuAcu</h1>
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

      <section className="source-section">
        <h3>Source Lecture</h3>
        <p>{condition.sourceFile}</p>
      </section>
    </div>
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
                  className={`point-tile ${group.color ? "" : "neutral"}`}
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
