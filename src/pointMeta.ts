export type PointAction =
  | "release"
  | "clearHeat"
  | "resolvePhlegm"
  | "tonifyQi"
  | "nourishYin"
  | "warmYang"
  | "regulateQi"
  | "moveBlood"
  | "calmShen"
  | "openOrifices"
  | "stopSweat"
  | "promoteWater"
  | "descendLung";

export type PointMeta = {
  code: string;
  chineseName: string;
  actions: PointAction[];
};

export const pointMeta: Record<string, PointMeta> = {
  "LU 1": { code: "LU 1", chineseName: "中府", actions: ["descendLung", "clearHeat"] },
  "LU 5": { code: "LU 5", chineseName: "尺泽", actions: ["clearHeat", "resolvePhlegm", "descendLung"] },
  "LU 6": { code: "LU 6", chineseName: "孔最", actions: ["descendLung", "clearHeat"] },
  "LU 7": { code: "LU 7", chineseName: "列缺", actions: ["release", "descendLung", "regulateQi"] },
  "LU 9": { code: "LU 9", chineseName: "太渊", actions: ["tonifyQi", "nourishYin", "descendLung"] },
  "LU 10": { code: "LU 10", chineseName: "鱼际", actions: ["clearHeat", "nourishYin"] },
  "LU 11": { code: "LU 11", chineseName: "少商", actions: ["clearHeat", "release"] },
  "LI 4": { code: "LI 4", chineseName: "合谷", actions: ["release", "regulateQi"] },
  "LI 6": { code: "LI 6", chineseName: "偏历", actions: ["promoteWater", "regulateQi"] },
  "LI 11": { code: "LI 11", chineseName: "曲池", actions: ["clearHeat"] },
  "LI 20": { code: "LI 20", chineseName: "迎香", actions: ["release"] },
  "BL 12": { code: "BL 12", chineseName: "风门", actions: ["release"] },
  "BL 13": { code: "BL 13", chineseName: "肺俞", actions: ["tonifyQi", "descendLung", "resolvePhlegm"] },
  "BL 14": { code: "BL 14", chineseName: "厥阴俞", actions: ["regulateQi", "calmShen"] },
  "BL 15": { code: "BL 15", chineseName: "心俞", actions: ["tonifyQi", "calmShen"] },
  "BL 17": { code: "BL 17", chineseName: "膈俞", actions: ["moveBlood"] },
  "BL 18": { code: "BL 18", chineseName: "肝俞", actions: ["regulateQi", "clearHeat"] },
  "BL 19": { code: "BL 19", chineseName: "胆俞", actions: ["regulateQi", "calmShen"] },
  "BL 20": { code: "BL 20", chineseName: "脾俞", actions: ["tonifyQi", "resolvePhlegm", "promoteWater"] },
  "BL 21": { code: "BL 21", chineseName: "胃俞", actions: ["tonifyQi"] },
  "BL 22": { code: "BL 22", chineseName: "三焦俞", actions: ["promoteWater", "resolvePhlegm"] },
  "BL 23": { code: "BL 23", chineseName: "肾俞", actions: ["warmYang", "nourishYin", "tonifyQi"] },
  "BL 25": { code: "BL 25", chineseName: "大肠俞", actions: ["regulateQi"] },
  "BL 27": { code: "BL 27", chineseName: "小肠俞", actions: ["regulateQi"] },
  "BL 28": { code: "BL 28", chineseName: "膀胱俞", actions: ["promoteWater"] },
  "BL 42": { code: "BL 42", chineseName: "魄户", actions: ["tonifyQi", "stopSweat"] },
  "BL 43": { code: "BL 43", chineseName: "膏肓", actions: ["tonifyQi", "nourishYin"] },
  "CV 4": { code: "CV 4", chineseName: "关元", actions: ["tonifyQi", "nourishYin", "warmYang"] },
  "CV 6": { code: "CV 6", chineseName: "气海", actions: ["tonifyQi", "regulateQi", "warmYang"] },
  "CV 9": { code: "CV 9", chineseName: "水分", actions: ["promoteWater"] },
  "CV 10": { code: "CV 10", chineseName: "下脘", actions: ["regulateQi", "resolvePhlegm"] },
  "CV 12": { code: "CV 12", chineseName: "中脘", actions: ["tonifyQi", "resolvePhlegm"] },
  "CV 13": { code: "CV 13", chineseName: "上脘", actions: ["regulateQi"] },
  "CV 14": { code: "CV 14", chineseName: "巨阙", actions: ["regulateQi", "calmShen"] },
  "CV 17": { code: "CV 17", chineseName: "膻中", actions: ["regulateQi", "descendLung"] },
  "CV 22": { code: "CV 22", chineseName: "天突", actions: ["descendLung", "resolvePhlegm"] },
  "GV 4": { code: "GV 4", chineseName: "命门", actions: ["warmYang"] },
  "GV 12": { code: "GV 12", chineseName: "身柱", actions: ["tonifyQi", "descendLung"] },
  "GV 14": { code: "GV 14", chineseName: "大椎", actions: ["release", "clearHeat"] },
  "GV 15": { code: "GV 15", chineseName: "哑门", actions: ["openOrifices", "calmShen"] },
  "GV 16": { code: "GV 16", chineseName: "风府", actions: ["openOrifices", "release"] },
  "GV 20": { code: "GV 20", chineseName: "百会", actions: ["tonifyQi", "calmShen"] },
  "GV 24": { code: "GV 24", chineseName: "神庭", actions: ["calmShen"] },
  "GV 26": { code: "GV 26", chineseName: "水沟", actions: ["openOrifices"] },
  "GB 12": { code: "GB 12", chineseName: "完骨", actions: ["release", "calmShen"] },
  "GB 13": { code: "GB 13", chineseName: "本神", actions: ["calmShen"] },
  "GB 20": { code: "GB 20", chineseName: "风池", actions: ["release", "clearHeat"] },
  "GB 21": { code: "GB 21", chineseName: "肩井", actions: ["regulateQi"] },
  "GB 34": { code: "GB 34", chineseName: "阳陵泉", actions: ["regulateQi"] },
  "GB 39": { code: "GB 39", chineseName: "悬钟", actions: ["nourishYin"] },
  "GB 43": { code: "GB 43", chineseName: "侠溪", actions: ["clearHeat"] },
  "SI 7": { code: "SI 7", chineseName: "支正", actions: ["release", "calmShen"] },
  "TE 5": { code: "TE 5", chineseName: "外关", actions: ["release", "clearHeat"] },
  "TE 6": { code: "TE 6", chineseName: "支沟", actions: ["regulateQi", "clearHeat"] },
  "ST 25": { code: "ST 25", chineseName: "天枢", actions: ["regulateQi"] },
  "ST 21": { code: "ST 21", chineseName: "梁门", actions: ["regulateQi"] },
  "ST 36": { code: "ST 36", chineseName: "足三里", actions: ["tonifyQi", "resolvePhlegm", "warmYang"] },
  "ST 34": { code: "ST 34", chineseName: "梁丘", actions: ["regulateQi", "clearHeat"] },
  "ST 37": { code: "ST 37", chineseName: "上巨虚", actions: ["clearHeat", "promoteWater"] },
  "ST 39": { code: "ST 39", chineseName: "下巨虚", actions: ["regulateQi", "clearHeat"] },
  "ST 40": { code: "ST 40", chineseName: "丰隆", actions: ["resolvePhlegm"] },
  "ST 41": { code: "ST 41", chineseName: "解溪", actions: ["clearHeat", "resolvePhlegm"] },
  "ST 44": { code: "ST 44", chineseName: "内庭", actions: ["clearHeat"] },
  "ST 45": { code: "ST 45", chineseName: "厉兑", actions: ["clearHeat", "openOrifices"] },
  "SP 1": { code: "SP 1", chineseName: "隐白", actions: ["tonifyQi", "moveBlood"] },
  "SP 3": { code: "SP 3", chineseName: "太白", actions: ["tonifyQi", "resolvePhlegm"] },
  "SP 4": { code: "SP 4", chineseName: "公孙", actions: ["regulateQi"] },
  "SP 6": { code: "SP 6", chineseName: "三阴交", actions: ["nourishYin", "tonifyQi", "promoteWater"] },
  "SP 8": { code: "SP 8", chineseName: "地机", actions: ["moveBlood"] },
  "SP 9": { code: "SP 9", chineseName: "阴陵泉", actions: ["promoteWater", "resolvePhlegm"] },
  "SP 10": { code: "SP 10", chineseName: "血海", actions: ["moveBlood", "clearHeat"] },
  "SP 14": { code: "SP 14", chineseName: "腹结", actions: ["regulateQi"] },
  "SP 15": { code: "SP 15", chineseName: "大横", actions: ["regulateQi"] },
  "KI 1": { code: "KI 1", chineseName: "涌泉", actions: ["nourishYin", "openOrifices"] },
  "KI 3": { code: "KI 3", chineseName: "太溪", actions: ["nourishYin", "warmYang", "tonifyQi"] },
  "KI 6": { code: "KI 6", chineseName: "照海", actions: ["nourishYin"] },
  "KI 7": { code: "KI 7", chineseName: "复溜", actions: ["stopSweat", "warmYang", "promoteWater"] },
  "KI 25": { code: "KI 25", chineseName: "神藏", actions: ["descendLung", "tonifyQi"] },
  "PC 4": { code: "PC 4", chineseName: "郄门", actions: ["moveBlood", "calmShen"] },
  "PC 5": { code: "PC 5", chineseName: "间使", actions: ["resolvePhlegm", "calmShen"] },
  "PC 6": { code: "PC 6", chineseName: "内关", actions: ["regulateQi", "calmShen", "resolvePhlegm"] },
  "PC 7": { code: "PC 7", chineseName: "大陵", actions: ["calmShen", "clearHeat", "resolvePhlegm"] },
  "PC 8": { code: "PC 8", chineseName: "劳宫", actions: ["clearHeat", "openOrifices"] },
  "PC 9": { code: "PC 9", chineseName: "中冲", actions: ["clearHeat", "openOrifices"] },
  "LR 2": { code: "LR 2", chineseName: "行间", actions: ["clearHeat", "regulateQi"] },
  "LR 3": { code: "LR 3", chineseName: "太冲", actions: ["regulateQi", "clearHeat", "calmShen"] },
  "LR 14": { code: "LR 14", chineseName: "期门", actions: ["regulateQi"] },
  "HT 3": { code: "HT 3", chineseName: "少海", actions: ["calmShen", "nourishYin"] },
  "HT 5": { code: "HT 5", chineseName: "通里", actions: ["calmShen", "regulateQi"] },
  "HT 6": { code: "HT 6", chineseName: "阴郄", actions: ["stopSweat", "nourishYin"] },
  "HT 7": { code: "HT 7", chineseName: "神门", actions: ["calmShen"] },
  "HT 8": { code: "HT 8", chineseName: "少府", actions: ["clearHeat", "calmShen"] },
  "HT 9": { code: "HT 9", chineseName: "少冲", actions: ["clearHeat", "openOrifices"] },
  "Yintang": { code: "Yintang", chineseName: "印堂", actions: ["calmShen", "release"] },
  "Taiyang": { code: "Taiyang", chineseName: "太阳", actions: ["release", "clearHeat"] },
  "Dingchuan": { code: "Dingchuan", chineseName: "定喘", actions: ["descendLung"] },
  "Jingbailao": { code: "Jingbailao", chineseName: "颈百劳", actions: ["tonifyQi"] },
  "Jie He Xue": { code: "Jie He Xue", chineseName: "结核穴", actions: ["nourishYin"] },
  "12 Jing-well points": { code: "12 Jing-well", chineseName: "十二井穴", actions: ["openOrifices", "clearHeat"] },
  "Jing-well points": { code: "Jing-well", chineseName: "井穴", actions: ["openOrifices", "clearHeat"] },
};

export const pointPattern =
  /\b(?:LU|LI|BL|GB|SI|TE|GV|CV|ST|SP|KI|PC|LR|HT)\s?\d+\b|\bDingchuan\b|\bYintang\b|\bTaiyang\b|\bJingbailao\b|\bJie He Xue\b|\b12 Jing-well points\b|\bJing-well points\b/g;

export function extractPoints(text: string) {
  const seen = new Set<string>();
  return Array.from(text.matchAll(pointPattern))
    .map((match) => match[0].replace(/\s+/g, " "))
    .filter((code) => {
      if (seen.has(code)) return false;
      seen.add(code);
      return true;
    });
}

export function getPointMeta(code: string): PointMeta {
  return pointMeta[code] ?? { code, chineseName: "穴位", actions: [] };
}
