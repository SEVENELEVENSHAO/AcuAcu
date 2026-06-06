export type FormulaDetail = {
  chineseName: string;
  pinyin: string;
  englishName?: string;
  actions: string[];
  indications: string;
  ingredients?: FormulaIngredient[];
};

export type FormulaIngredient = {
  chineseName: string;
  pinyin: string;
  englishName: string;
  dose: string;
};

export type LungPatternDetail = {
  name: string;
  section?: string;
  principle: string;
  points: string;
  pointAdditions?: PointAddition[];
  techniques?: string[];
  formula?: FormulaDetail;
  notes?: string;
  sourceAudit?: SourceAudit;
};

export type PointAddition = {
  indication: string;
  points: string;
};

export type SourceAudit = {
  document: string;
  page?: number;
  section: string;
};

export type ClinicalSummary = {
  definition: string;
  causes: string;
  locationAndMechanism: string;
  treatmentRule: string;
  clinicalPearl: string;
};

export type LungConditionDetail = {
  overview: string;
  clinicalSummary?: ClinicalSummary;
  tcmNotes?: string[];
  redFlags?: string[];
  patterns: LungPatternDetail[];
  sourceAudit?: SourceAudit;
};

const formulas = {
  jingFangBaiDuSan: {
    chineseName: "荆防败毒散",
    pinyin: "Jing Fang Bai Du San",
    englishName: "Schizonepeta and Siler Formula to Overcome Pathogenic Influences",
    actions: ["Releases exterior Wind-Cold", "Resolves toxicity", "Stops cough and body ache"],
    indications: "Wind-Cold exterior pattern with chills, fever, headache, body aches, nasal obstruction, and cough.",
    ingredients: [
      { chineseName: "荆芥", pinyin: "Jing Jie", englishName: "Schizonepeta", dose: "4.5 g" },
      { chineseName: "防风", pinyin: "Fang Feng", englishName: "Siler Root", dose: "4.5 g" },
      { chineseName: "羌活", pinyin: "Qiang Huo", englishName: "Notopterygium", dose: "4.5 g" },
      { chineseName: "独活", pinyin: "Du Huo", englishName: "Pubescent Angelica Root", dose: "4.5 g" },
      { chineseName: "柴胡", pinyin: "Chai Hu", englishName: "Bupleurum", dose: "4.5 g" },
      { chineseName: "川芎", pinyin: "Chuan Xiong", englishName: "Sichuan Lovage", dose: "4.5 g" },
      { chineseName: "前胡", pinyin: "Qian Hu", englishName: "Peucedanum", dose: "4.5 g" },
      { chineseName: "桔梗", pinyin: "Jie Geng", englishName: "Platycodon", dose: "4.5 g" },
      { chineseName: "枳壳", pinyin: "Zhi Ke", englishName: "Bitter Orange", dose: "4.5 g" },
      { chineseName: "茯苓", pinyin: "Fu Ling", englishName: "Poria", dose: "4.5 g" },
      { chineseName: "甘草", pinyin: "Gan Cao", englishName: "Licorice Root", dose: "1.5 g" },
    ],
  },
  yinQiaoSan: {
    chineseName: "银翘散",
    pinyin: "Yin Qiao San",
    englishName: "Honeysuckle and Forsythia Powder",
    actions: ["Releases Wind-Heat", "Clears Heat toxin", "Benefits throat"],
    indications: "Early Wind-Heat with fever, slight chills, sore throat, thirst, cough, and floating rapid pulse.",
    ingredients: [
      { chineseName: "金银花", pinyin: "Jin Yin Hua", englishName: "Honeysuckle Flower", dose: "30 g" },
      { chineseName: "连翘", pinyin: "Lian Qiao", englishName: "Forsythia Fruit", dose: "30 g" },
      { chineseName: "桔梗", pinyin: "Jie Geng", englishName: "Platycodon", dose: "18 g" },
      { chineseName: "牛蒡子", pinyin: "Niu Bang Zi", englishName: "Arctium Fruit", dose: "18 g" },
      { chineseName: "薄荷", pinyin: "Bo He", englishName: "Mint", dose: "18 g" },
      { chineseName: "淡豆豉", pinyin: "Dan Dou Chi", englishName: "Prepared Soybean", dose: "15 g" },
      { chineseName: "淡竹叶", pinyin: "Dan Zhu Ye", englishName: "Lophatherum", dose: "12 g" },
      { chineseName: "荆芥", pinyin: "Jing Jie", englishName: "Schizonepeta", dose: "12 g" },
      { chineseName: "芦根", pinyin: "Lu Gen", englishName: "Reed Rhizome", dose: "18 g" },
      { chineseName: "甘草", pinyin: "Gan Cao", englishName: "Licorice Root", dose: "15 g" },
    ],
  },
  huoXiangZhengQiSan: {
    chineseName: "藿香正气散",
    pinyin: "Huo Xiang Zheng Qi San",
    englishName: "Agastache Powder to Rectify the Qi",
    actions: ["Transforms Dampness", "Releases exterior", "Harmonizes middle burner"],
    indications: "Summer-Heat Damp or exterior Damp with nausea, chest/epigastric oppression, abdominal discomfort, loose stool, and greasy coat.",
    ingredients: [
      { chineseName: "藿香", pinyin: "Huo Xiang", englishName: "Agastache", dose: "90 g" },
      { chineseName: "厚朴", pinyin: "Hou Po", englishName: "Magnolia Bark", dose: "60 g" },
      { chineseName: "陈皮", pinyin: "Chen Pi", englishName: "Tangerine Peel", dose: "60 g" },
      { chineseName: "紫苏叶", pinyin: "Zi Su Ye", englishName: "Perilla Leaf", dose: "30 g" },
      { chineseName: "白芷", pinyin: "Bai Zhi", englishName: "Angelica Dahurica", dose: "30 g" },
      { chineseName: "半夏曲", pinyin: "Ban Xia Qu", englishName: "Medicated Pinellia", dose: "60 g" },
      { chineseName: "大腹皮", pinyin: "Da Fu Pi", englishName: "Areca Peel", dose: "30 g" },
      { chineseName: "白术", pinyin: "Bai Zhu", englishName: "Atractylodes", dose: "60 g" },
      { chineseName: "茯苓", pinyin: "Fu Ling", englishName: "Poria", dose: "30 g" },
      { chineseName: "桔梗", pinyin: "Jie Geng", englishName: "Platycodon", dose: "60 g" },
      { chineseName: "生姜", pinyin: "Sheng Jiang", englishName: "Fresh Ginger", dose: "3片" },
      { chineseName: "大枣", pinyin: "Da Zao", englishName: "Jujube", dose: "1枚" },
      { chineseName: "炙甘草", pinyin: "Zhi Gan Cao", englishName: "Honey-fried Licorice", dose: "75 g" },
    ],
  },
  shenSuYin: {
    chineseName: "参苏饮",
    pinyin: "Shen Su Yin",
    englishName: "Ginseng and Perilla Decoction",
    actions: ["Boosts Qi", "Releases exterior", "Transforms Phlegm"],
    indications: "Exterior Wind-Cold with underlying Qi deficiency, fatigue, cough with sputum, and weak constitution.",
    ingredients: [
      { chineseName: "人参", pinyin: "Ren Shen", englishName: "Ginseng", dose: "9 g" },
      { chineseName: "紫苏叶", pinyin: "Zi Su Ye", englishName: "Perilla Leaf", dose: "9 g" },
      { chineseName: "陈皮", pinyin: "Chen Pi", englishName: "Tangerine Peel", dose: "6 g" },
      { chineseName: "甘草", pinyin: "Gan Cao", englishName: "Licorice Root", dose: "6 g" },
      { chineseName: "葛根", pinyin: "Ge Gen", englishName: "Kudzu Root", dose: "9 g" },
      { chineseName: "前胡", pinyin: "Qian Hu", englishName: "Peucedanum", dose: "9 g" },
      { chineseName: "半夏", pinyin: "Ban Xia", englishName: "Pinellia", dose: "9 g" },
      { chineseName: "茯苓", pinyin: "Fu Ling", englishName: "Poria", dose: "9 g" },
      { chineseName: "枳壳", pinyin: "Zhi Ke", englishName: "Bitter Orange", dose: "6 g" },
      { chineseName: "桔梗", pinyin: "Jie Geng", englishName: "Platycodon", dose: "6 g" },
      { chineseName: "木香", pinyin: "Mu Xiang", englishName: "Aucklandia", dose: "6 g" },
      { chineseName: "生姜", pinyin: "Sheng Jiang", englishName: "Fresh Ginger", dose: "7片" },
      { chineseName: "大枣", pinyin: "Da Zao", englishName: "Jujube", dose: "1枚" },
    ],
  },
  jiaJianWeiRuiTang: {
    chineseName: "加减葳蕤汤",
    pinyin: "Jia Jian Wei Rui Tang",
    englishName: "Modified Solomon's Seal Decoction",
    actions: ["Nourishes Yin", "Releases exterior", "Clears mild Heat"],
    indications: "Exterior invasion with underlying Yin deficiency, dry throat, thirst, slight fever, and dry cough.",
    ingredients: [
      { chineseName: "玉竹", pinyin: "Yu Zhu", englishName: "Solomon's Seal", dose: "9 g" },
      { chineseName: "葱白", pinyin: "Cong Bai", englishName: "Scallion Bulb", dose: "6 g" },
      { chineseName: "桔梗", pinyin: "Jie Geng", englishName: "Platycodon", dose: "4.5 g" },
      { chineseName: "淡豆豉", pinyin: "Dan Dou Chi", englishName: "Prepared Soybean", dose: "12 g" },
      { chineseName: "薄荷", pinyin: "Bo He", englishName: "Mint", dose: "4.5 g" },
      { chineseName: "白薇", pinyin: "Bai Wei", englishName: "Cynanchum Root", dose: "3 g" },
      { chineseName: "炙甘草", pinyin: "Zhi Gan Cao", englishName: "Honey-fried Licorice", dose: "1.5 g" },
      { chineseName: "大枣", pinyin: "Da Zao", englishName: "Jujube", dose: "2枚" },
    ],
  },
  xingSuSan: {
    chineseName: "杏苏散",
    pinyin: "Xing Su San",
    englishName: "Apricot Kernel and Perilla Leaf Powder",
    actions: ["Lightly releases exterior Cold-Dryness", "Regulates Lung Qi", "Stops cough"],
    indications: "Wind-Cold or cool-dry cough with thin sputum, nasal congestion, no thirst, and floating pulse.",
  },
  sangJuYin: {
    chineseName: "桑菊饮",
    pinyin: "Sang Ju Yin",
    englishName: "Mulberry Leaf and Chrysanthemum Drink",
    actions: ["Disperses Wind-Heat", "Ventilates Lung Qi", "Stops cough"],
    indications: "Wind-Heat cough with mild fever, thirst, sore throat, and yellow or sticky sputum.",
  },
  sangXingTang: {
    chineseName: "桑杏汤",
    pinyin: "Sang Xing Tang",
    englishName: "Mulberry Leaf and Apricot Kernel Decoction",
    actions: ["Clears warm Dryness", "Moistens Lung", "Stops cough"],
    indications: "Warm-Dryness injuring Lung with dry cough, scant sticky sputum, dry throat, and thirst.",
  },
  erChenTangSanZi: {
    chineseName: "二陈汤合三子养亲汤",
    pinyin: "Er Chen Tang He San Zi Yang Qin Tang",
    englishName: "Two-Cured Decoction with Three-Seed Decoction",
    actions: ["Dries Dampness", "Transforms Phlegm", "Regulates Qi and descends Lung Qi"],
    indications: "Phlegm-Damp cough or wheeze with copious white sputum, chest oppression, poor appetite, and greasy coat.",
  },
  qingQiHuaTanTang: {
    chineseName: "清气化痰汤",
    pinyin: "Qing Qi Hua Tan Tang",
    englishName: "Clear the Qi and Transform Phlegm Decoction",
    actions: ["Clears Lung Heat", "Transforms Phlegm", "Stops cough"],
    indications: "Phlegm-Heat cough with thick yellow sputum, chest oppression, thirst, and rapid slippery pulse.",
  },
  xiaoQingLongTang: {
    chineseName: "小青龙汤",
    pinyin: "Xiao Qing Long Tang",
    englishName: "Minor Bluegreen Dragon Decoction",
    actions: ["Releases exterior Cold", "Warms Lung", "Transforms thin fluids"],
    indications: "Exterior Cold with interior thin fluids: cough, wheeze, watery sputum, chills, and absence of thirst.",
  },
  shaShenMaiDongTang: {
    chineseName: "沙参麦冬汤",
    pinyin: "Sha Shen Mai Dong Tang",
    englishName: "Glehnia and Ophiopogon Decoction",
    actions: ["Nourishes Lung and Stomach Yin", "Generates fluids", "Moistens Dryness"],
    indications: "Lung Yin deficiency or dry cough with scant sputum, dry mouth/throat, and red dry tongue.",
  },
  xieBaiSan: {
    chineseName: "泻白散",
    pinyin: "Xie Bai San",
    englishName: "Drain the White Powder",
    actions: ["Clears Lung Heat", "Stops cough and wheeze"],
    indications: "Lung Heat with cough, wheezing, steaming skin sensation, thirst, and yellow tongue coat.",
  },
  daiGeSan: {
    chineseName: "黛蛤散",
    pinyin: "Dai Ge San",
    englishName: "Indigo and Clam Shell Powder",
    actions: ["Clears Liver Fire", "Drains Lung Heat", "Stops cough"],
    indications: "Liver Fire attacking Lung with cough, chest/hypochondriac pain, irritability, bitter taste, and red eyes.",
  },
  buFeiTang: {
    chineseName: "补肺汤",
    pinyin: "Bu Fei Tang",
    englishName: "Tonify the Lung Decoction",
    actions: ["Tonifies Lung Qi", "Stops cough", "Supports Wei Qi"],
    indications: "Lung Qi deficiency with weak cough, shortness of breath, spontaneous sweating, fatigue, and weak voice.",
  },
  suZiJiangQiTang: {
    chineseName: "苏子降气汤",
    pinyin: "Su Zi Jiang Qi Tang",
    englishName: "Perilla Fruit Decoction for Directing Qi Downward",
    actions: ["Descends rebellious Lung Qi", "Transforms Phlegm", "Warms and supports Kidney"],
    indications: "Excess above and deficiency below with wheeze, cough, copious sputum, chest fullness, and weak lower back/knees.",
  },
  sangBaiPiTang: {
    chineseName: "桑白皮汤",
    pinyin: "Sang Bai Pi Tang",
    englishName: "Mulberry Bark Decoction",
    actions: ["Clears Lung Heat", "Descends Qi", "Transforms Phlegm"],
    indications: "Phlegm-Heat obstructing Lung with panting, cough, thick yellow sputum, thirst, and rapid pulse.",
  },
  sanZiYangQinTang: {
    chineseName: "三子养亲汤",
    pinyin: "San Zi Yang Qin Tang",
    englishName: "Three-Seed Decoction to Nourish One's Parents",
    actions: ["Warms and transforms Phlegm", "Descends Qi", "Promotes digestion"],
    indications: "Turbid Phlegm with cough, wheeze, copious sputum, chest fullness, and food stagnation tendency.",
  },
  zhenWuTang: {
    chineseName: "真武汤",
    pinyin: "Zhen Wu Tang",
    englishName: "True Warrior Decoction",
    actions: ["Warms Yang", "Promotes water metabolism", "Strengthens Spleen and Kidney"],
    indications: "Yang deficiency with water retention, edema, cold limbs, palpitations, dizziness, and loose stool.",
  },
  ruJinJieDuSan: {
    chineseName: "如金解毒散",
    pinyin: "Ru Jin Jie Du San",
    actions: ["Clears Heat toxin", "Resolves abscess", "Transforms Phlegm"],
    indications: "Early pulmonary abscess with fever, cough, chest pain, and turbid foul sputum beginning to form.",
  },
  qianJinWeiJingTang: {
    chineseName: "千金苇茎汤",
    pinyin: "Qian Jin Wei Jing Tang",
    englishName: "Reed Decoction from the Thousand Ducat Formulas",
    actions: ["Clears Lung Heat", "Expels pus", "Transforms Phlegm and stasis"],
    indications: "Pulmonary abscess with cough, chest pain, foul purulent sputum, fever, and constrained Lung Qi.",
  },
  yueHuaWan: {
    chineseName: "月华丸",
    pinyin: "Yue Hua Wan",
    englishName: "Moonlight Pill",
    actions: ["Nourishes Yin", "Clears deficiency Heat", "Stops cough and bleeding"],
    indications: "Pulmonary consumption with cough, hemoptysis, tidal fever, night sweats, and emaciation.",
  },
  qinJiaoBieJiaSan: {
    chineseName: "秦艽鳖甲散",
    pinyin: "Qin Jiao Bie Jia San",
    englishName: "Gentiana Macrophylla and Soft-Shelled Turtle Shell Powder",
    actions: ["Nourishes Yin", "Clears steaming bones", "Relieves deficiency Heat"],
    indications: "Yin deficiency with effulgent Fire, tidal fever, night sweats, irritability, and red tongue.",
  },
  shengMaiSan: {
    chineseName: "生脉散",
    pinyin: "Sheng Mai San",
    englishName: "Generate the Pulse Powder",
    actions: ["Augments Qi", "Nourishes Yin", "Generates fluids"],
    indications: "Qi and Yin deficiency with fatigue, shortness of breath, dry mouth, spontaneous sweating, and weak pulse.",
  },
  yuPingFengSan: {
    chineseName: "玉屏风散",
    pinyin: "Yu Ping Feng San",
    englishName: "Jade Windscreen Powder",
    actions: ["Tonifies Qi", "Consolidates exterior", "Stops spontaneous sweating"],
    indications: "Lung Qi deficiency with spontaneous sweating, aversion to wind, recurrent colds, and weak pulse.",
  },
  guiZhiTang: {
    chineseName: "桂枝汤",
    pinyin: "Gui Zhi Tang",
    englishName: "Cinnamon Twig Decoction",
    actions: ["Harmonizes Ying and Wei", "Releases exterior", "Regulates nutritive and defensive Qi"],
    indications: "Ying-Wei disharmony with sweating, aversion to wind, mild fever, and floating moderate pulse.",
  },
  dangGuiLiuHuangTang: {
    chineseName: "当归六黄汤",
    pinyin: "Dang Gui Liu Huang Tang",
    englishName: "Tangkuei and Six-Yellow Decoction",
    actions: ["Nourishes Yin and Blood", "Clears Fire", "Stops night sweating"],
    indications: "Yin deficiency Fire with night sweats, heat sensations, red tongue, and rapid pulse.",
  },
  dingChuanTang: {
    chineseName: "定喘汤",
    pinyin: "Ding Chuan Tang",
    englishName: "Arrest Wheezing Decoction",
    actions: ["Descends Lung Qi", "Clears Heat", "Transforms Phlegm and stops wheezing"],
    indications: "Wheezing with Phlegm-Heat constrained by exterior Wind-Cold: labored breathing, thick yellow sputum, and chest oppression.",
  },
  jinKuiShenQiWan: {
    chineseName: "金匮肾气丸",
    pinyin: "Jin Gui Shen Qi Wan",
    englishName: "Kidney Qi Pill from the Golden Cabinet",
    actions: ["Warms and tonifies Kidney Yang", "Assists Qi grasping", "Promotes water transformation"],
    indications: "Kidney Yang deficiency with wheeze on exertion, cold lower body, edema tendency, weak low back/knees, and deep weak pulse.",
  },
} satisfies Record<string, FormulaDetail>;

export const lungContent: Record<number, LungConditionDetail> = {
  6: {
    overview:
      "Common externally contracted disorder due to invasion of exterior Wind. Main signs include aversion to cold, fever, stuffy or runny nose, sore throat, sneezing, cough, headache, and general malaise.",
    tcmNotes: [
      "Identify the exterior pathogen first: Wind-Cold, Wind-Heat, Summer-Heat Damp, or an exterior pattern with underlying deficiency.",
      "Check whether anti-pathogenic Qi is deficient, especially when the patient is prone to catching colds.",
    ],
    patterns: [
      {
        name: "Invasion of Wind-Cold",
        principle: "Dispel Wind, dissipate Cold, resolve the exterior.",
        formula: formulas.jingFangBaiDuSan,
        points: "LU 7, LI 20, SI 7, BL 12, GB 20, LI 4. Add Yintang/Taiyang for headache; cup BL 13 for upper backache.",
      },
      {
        name: "Invasion of Wind-Heat",
        principle: "Dispel Wind, clear Heat, resolve the exterior.",
        formula: formulas.yinQiaoSan,
        points: "LU 5, GB 20, LI 11, LI 4, GV 14, TE 5.",
      },
      {
        name: "Invasion of Summer-Heat Damp",
        principle: "Clear Summer-Heat, transform Dampness, resolve the exterior.",
        formula: formulas.huoXiangZhengQiSan,
        points: "LU 6, LI 4, CV 12, ST 36, TE 6. Add GV 14 for prominent Heat; SP 9 for prominent Damp; ST 25 for abdominal distention and loose stool.",
      },
      {
        name: "Cold with Underlying Qi Deficiency",
        principle: "Dispel Wind-Cold, boost Qi, resolve the exterior.",
        formula: formulas.shenSuYin,
        points: "LU 7, LI 20, SI 7, BL 12, GB 20, LI 4, plus ST 36 and BL 13.",
      },
      {
        name: "Cold with Underlying Yin Deficiency",
        principle: "Dispel Wind, clear Heat, nourish Yin, resolve the exterior.",
        formula: formulas.jiaJianWeiRuiTang,
        points: "LU 5, GB 20, LI 11, LI 4, GV 14, TE 5, plus BL 43 and KI 7.",
      },
    ],
  },
  11: {
    overview:
      "Cough is the rapid expulsion of air from the Lung. In TCM, Ke is cough with sound and little phlegm, Sou is cough with phlegm and little sound, and Ke Sou includes both sound and phlegm.",
    redFlags: ["Dyspnea", "Hemoptysis", "Weight loss", "Persistent fever", "Risk factors for TB or HIV infection"],
    tcmNotes: [
      "Assess sound, timing, sputum amount, sputum consistency, and presence of blood.",
      "Differentiate exterior invasion, Phlegm retention, Heat, deficiency, and Liver Fire attacking Lung.",
    ],
    patterns: [
      {
        name: "Wind-Cold Invading Lung",
        principle: "Release exterior, restore Lung dispersing/descending, expel Wind, scatter Cold, stop cough.",
        formula: formulas.xingSuSan,
        points: "LU 7, BL 12, BL 13, LI 4, KI 7, LU 6. Cupping may be used on BL 12 and BL 13.",
      },
      {
        name: "Wind-Heat Invading Lung",
        principle: "Release exterior, expel Wind, clear Heat, restore Lung descending, stop cough.",
        formula: formulas.sangJuYin,
        points: "LU 7, LI 4, BL 12, BL 13, LI 11, LU 11, GV 14, LU 6.",
      },
      {
        name: "Wind-Dryness Invading Lung",
        principle: "Release exterior, restore Lung descending, generate fluids, stop cough.",
        formula: formulas.sangXingTang,
        points: "LU 7, LU 9, CV 12, KI 6, SP 6.",
      },
      {
        name: "Phlegm-Damp Retention in Lung",
        principle: "Dry Dampness, resolve Phlegm, tonify Spleen, restore Lung descending, stop cough.",
        formula: formulas.erChenTangSanZi,
        points: "LU 5, CV 12, CV 9, ST 40, SP 6, BL 20, ST 36, BL 13. Moxa applicable.",
      },
      {
        name: "Phlegm-Heat Retention in Lung",
        principle: "Clear Lung Heat, resolve Phlegm, restore Lung descending, stop cough.",
        formula: formulas.qingQiHuaTanTang,
        points: "LU 5, LU 1, CV 12, CV 9, ST 40, SP 6, LU 6, GV 14, LI 11, TE 6, SP 15. No moxa.",
      },
      {
        name: "Phlegm-Fluid Retention in Lung",
        principle: "Drain Dampness, resolve Phlegm, scatter Cold, tonify Spleen and Kidney, stop cough.",
        formula: formulas.xiaoQingLongTang,
        points: "LU 5, CV 12, CV 9, ST 40, SP 6, BL 20, ST 36, BL 13, GV 4, BL 23, BL 22. Moxa applicable.",
      },
      {
        name: "Lung Heat",
        principle: "Clear Lung Heat, restore Lung descending, stop cough.",
        formula: formulas.xieBaiSan,
        points: "LU 5, LU 1, GV 14, LU 6, LI 11.",
      },
      {
        name: "Lung Qi Deficiency",
        principle: "Tonify Lung Qi, restore Lung descending.",
        formula: formulas.buFeiTang,
        points: "LU 9, BL 13, BL 43, CV 12, ST 36, SP 6. Moxa applicable.",
      },
      {
        name: "Lung Yin Deficiency",
        principle: "Nourish Lung Yin, moisten Lung, clear empty Heat, restore Lung descending, stop cough.",
        formula: formulas.shaShenMaiDongTang,
        points: "LU 9, LU 10, CV 12, LU 1, ST 36, SP 6, LU 7, KI 6. No moxa.",
      },
      {
        name: "Liver Fire Attacking Lung",
        principle: "Clear Lung, clear Liver Fire, restore Lung descending, stop cough.",
        formula: formulas.daiGeSan,
        points: "LR 2, GB 34, LI 11, LU 5, LU 1, CV 17, GB 21.",
      },
    ],
  },
  17: {
    overview:
      "Dyspnea is difficult or laboured breathing. Acu 3 differentiates excess obstruction of Lung Qi from deficiency of Lung, Kidney, Heart, Yang, or Yin.",
    tcmNotes: [
      "Excess patterns include Wind-Cold, Cold exterior with Heat interior, Phlegm-Heat, Turbid Phlegm, Lung Qi obstruction, and Liver Fire attacking Lung.",
      "Deficiency patterns include Lung Qi deficiency, Lung-Kidney Yang deficiency, Lung-Heart-Kidney Yang deficiency, Lung Yin deficiency, and Lung-Kidney Yin deficiency.",
    ],
    patterns: [
      {
        name: "Invasion of Wind-Cold",
        principle: "Release exterior, restore Lung dispersing/descending, expel Wind-Cold.",
        formula: formulas.xingSuSan,
        points: "LU 7, LU 6, BL 12, BL 13, Dingchuan. Cupping on BL 12/13; direct moxa on BL 12 after needling and cupping.",
      },
      {
        name: "Wind-Cold Exterior with Phlegm-Fluid Interior",
        principle: "Release exterior, expel Wind-Cold, restore Lung descending, resolve Phlegm.",
        formula: formulas.xiaoQingLongTang,
        points: "LU 7, LU 6, LU 5, BL 12, BL 13, Dingchuan, PC 6, ST 40, CV 22.",
      },
      {
        name: "Cold Exterior, Heat Interior",
        principle: "Clear Heat, restore Lung descending.",
        formula: formulas.dingChuanTang,
        points: "LU 7, LU 6, LU 10, LI 11, LU 1.",
      },
      {
        name: "Phlegm-Heat in Lungs",
        principle: "Clear Heat, resolve Phlegm, clear Lungs.",
        formula: formulas.sangBaiPiTang,
        points: "LU 5, LU 1, LI 11, ST 40, GV 14. No moxa.",
      },
      {
        name: "Turbid Phlegm in Lungs",
        principle: "Resolve Phlegm, restore Lung descending.",
        formula: formulas.sanZiYangQinTang,
        points: "LU 5, LU 7, LU 1, PC 6, ST 40, BL 13, BL 20.",
      },
      {
        name: "Lung Qi Obstructed",
        principle: "Soothe Liver, move Qi, restore Lung descending, stop breathlessness.",
        points: "LR 3, LR 14, SP 4, PC 6, LU 1, CV 17, LU 7, HT 7, ST 40.",
      },
      {
        name: "Liver Fire Attacking Lungs",
        principle: "Soothe Liver, drain Fire, restore Lung descending.",
        formula: formulas.daiGeSan,
        points: "LR 2, LR 14, LU 7, CV 17, LU 1, BL 18, BL 13.",
      },
      {
        name: "Lung Qi Deficiency",
        principle: "Tonify Lungs, strengthen Qi, restore Lung descending.",
        formula: formulas.buFeiTang,
        points: "LU 7, LU 9, BL 13, GV 12, CV 12, CV 6, ST 36.",
      },
      {
        name: "Lung-Kidney Yang Deficiency",
        principle: "Tonify and warm Kidneys, stimulate Lung descending.",
        formula: formulas.jinKuiShenQiWan,
        points: "BL 23, BL 13, GV 4, KI 7, KI 25, KI 3, LU 7. Use moxa.",
      },
      {
        name: "Lung-Heart-Kidney Yang Deficiency",
        principle: "Tonify and warm Lung, Heart, and Kidney; resolve Phlegm; move Blood; restore Lung descending.",
        points: "LU 7, LI 6, CV 17, CV 12, CV 9, KI 7, CV 6, SP 6, ST 40, PC 6, BL 20, BL 23, BL 22, BL 13, BL 15, BL 17, SP 10. Moxa.",
      },
      {
        name: "Lung Yin Deficiency",
        principle: "Nourish Lung Yin, restore Lung descending.",
        formula: formulas.shaShenMaiDongTang,
        points: "LU 9, LU 7, KI 6, BL 43, CV 4, BL 13, GV 12.",
      },
      {
        name: "Lung-Kidney Yin Deficiency",
        principle: "Nourish Yin, strengthen Lung and Kidney, calm breathlessness.",
        points: "LU 9, CV 17, ST 36, SP 6, CV 12, CV 4, KI 3, LU 7, KI 6, KI 25.",
      },
    ],
  },
  33: {
    overview:
      "Lung Distention (Fei Zhang) presents with distention/fullness of the chest, phlegm-drool congestion, cough, panting, agitation, and in chronic cases dark complexion, purple lips/nails, and edema.",
    tcmNotes: ["Corresponds clinically to chronic bronchitis, emphysema, chronic pulmonary heart disease, and COPD."],
    patterns: [
      {
        name: "Phlegm-Turbidity Obstructing Lung",
        principle: "Transform Phlegm, downbear Qi, fortify Spleen, boost Lung.",
        formula: formulas.sanZiYangQinTang,
        points: "LU 7, LU 5, ST 40, SP 9, CV 22, BL 13, CV 17.",
      },
      {
        name: "Phlegm-Heat Accumulating in Lung",
        principle: "Clear Lung, transform Phlegm, downbear Qi, calm panting.",
        formula: formulas.sangBaiPiTang,
        points: "LU 5, LU 1, PC 6, ST 40, LI 4, ST 44, CV 17, GV 14. Bleed GV 14.",
      },
      {
        name: "Phlegm Veiling Heart Orifice",
        principle: "Flush Phlegm, open orifices, arouse spirit, extinguish Wind.",
        points: "PC 6, GV 26, PC 8, LR 3, ST 40, 12 Jing-well points. Bleed 12 well points.",
      },
      {
        name: "Qi Deficiency of Lung and Kidney",
        principle: "Supplement Lung, boost Kidney, promote Qi absorption, nourish Yin.",
        formula: formulas.shengMaiSan,
        points: "LU 9, KI 3, ST 36, CV 6, BL 13, BL 23, BL 43.",
      },
      {
        name: "Water Retention due to Yang Deficiency",
        principle: "Warm Kidney, fortify Spleen, disinhibit water, move Qi.",
        formula: formulas.zhenWuTang,
        points: "LU 9, KI 3, CV 6, CV 4, PC 6, SP 9, BL 20, GV 4. Use moxa. Add ST 36, SP 6, CV 17 for chest fullness/pain, purple lips/nails, or tongue stasis spots.",
      },
    ],
  },
  37: {
    overview:
      "Pulmonary abscess is a pus-filled cavity in the Lung caused by infection. TCM diagnosis focuses on acute cough, chest pain, fever, and profuse turbid foul-smelling sputum.",
    tcmNotes: [
      "Chronic stage may show incomplete removal of pus, persistent cough, bloody phlegm with strong odour, low-grade fever, sweating, and weight loss.",
    ],
    patterns: [
      {
        name: "Initial Stage",
        principle: "Clear Lung Heat, resolve Phlegm, relieve exterior, stop cough.",
        formula: formulas.ruJinJieDuSan,
        points: "BL 13, BL 12, GB 20, LU 7, LU 5, CV 22.",
      },
      {
        name: "Suppurative Stage",
        principle: "Clear Lung Heat, detoxify, remove Blood stasis, subdue abscess.",
        formula: formulas.qianJinWeiJingTang,
        points: "BL 13, LU 5, LU 7, LU 10, LU 11, LI 4, LI 11, ST 40, CV 22.",
      },
      {
        name: "Perforating Stage",
        principle: "Detoxify, remove Blood stasis, eliminate pus retention.",
        formula: formulas.qianJinWeiJingTang,
        points: "LU 5, LU 6, LU 10, CV 22, LU 11, ST 36, ST 44.",
      },
      {
        name: "Recovery Stage",
        principle: "Nourish Yin, tonify Lung, dispel lingering toxins.",
        formula: formulas.shaShenMaiDongTang,
        points: "BL 13, BL 20, LU 5, LU 7, CV 17, SP 8, ST 36.",
      },
    ],
  },
  38: {
    overview:
      "Pulmonary Tuberculosis (Fei Lao) is understood as pulmonary consumption: a chronic consumptive Lung disease with cough, spitting blood, tidal fever, night sweating, and emaciation.",
    tcmNotes: ["The core pathogenesis emphasized in the slides is depletion of Yin."],
    patterns: [
      {
        name: "Lung Yin Deficiency",
        principle: "Nourish Yin, clear empty Fire, moisten Lung, strengthen middle burner.",
        formula: formulas.yueHuaWan,
        points: "LU 9, LU 5, BL 13, BL 43, ST 36, Jie He Xue. Add BL 20/CV 12 for poor appetite; GV 14/KI 3 for hectic fever; HT 6/KI 7 for night sweating; LU 10/BL 17/LU 6 for hemoptysis.",
      },
      {
        name: "Yin Deficiency with Effulgent Fire",
        principle: "Nourish Yin, moisten Lung, clear Fire, relieve cough.",
        formula: formulas.qinJiaoBieJiaSan,
        points: "BL 13, BL 23, BL 43, KI 3, LU 10, LR 2. Add GV 14/PC 5 for tidal fever.",
      },
      {
        name: "Qi and Yin Deficiency",
        principle: "Benefit Qi, nourish Yin, supplement deficiency.",
        formula: formulas.shengMaiSan,
        points: "BL 13, BL 20, BL 43, ST 36, SP 6. Add BL 21 and CV 12 for poor appetite and abdominal distention.",
      },
      {
        name: "Deficiency of Yin and Yang",
        principle: "Nourish Yin, warm Yang, supplement deficiency.",
        formula: formulas.jinKuiShenQiWan,
        points: "BL 13, BL 20, BL 23, BL 43, CV 4, ST 36. Moxa applicable.",
      },
    ],
  },
  40: {
    overview:
      "Spontaneous sweat is excessive daytime sweating or sweating with slight exertion. Night sweat occurs during sleep and stops when the patient wakes.",
    tcmNotes: [
      "Spontaneous sweating is often Qi/Yang deficiency but may also involve Blood deficiency, Phlegm obstruction, Dampness, or pathogenic Heat.",
      "Night sweating generally points toward Yin deficiency.",
    ],
    patterns: [
      {
        name: "Lung Qi Deficiency Spontaneous Sweat",
        principle: "Tonify Lung Qi, secure exterior Wei Qi, arrest abnormal sweating.",
        formula: formulas.yuPingFengSan,
        points: "GV 14, GV 20, LU 9, BL 12, BL 13, ST 36. Supporting: KI 1, BL 42, Jingbailao.",
      },
      {
        name: "Disharmony between Ying and Wei",
        principle: "Harmonize Ying and Wei, expel pathogen in exterior layer, strengthen middle.",
        formula: formulas.guiZhiTang,
        points: "LI 4, GV 14, KI 7, GB 12, SP 6, ST 36. Supporting: BL 12, HT 6.",
      },
      {
        name: "Accumulation of Excess Heat",
        principle: "Clear Heat, resolve Dampness, harmonize Ying and Wei.",
        points: "LI 11, PC 6, KI 7, ST 40, GB 12, LR 2, GB 43. Supporting: ST 37, BL 28.",
      },
      {
        name: "Heart Blood Deficiency Night Sweat",
        principle: "Nourish Heart Qi, nourish Blood, arrest sweating.",
        points: "LR 3, ST 36, BL 17, BL 15, HT 3, HT 7. Supporting: Yintang, SP 6.",
      },
      {
        name: "Yin Deficiency with Empty Fire Night Sweat",
        principle: "Nourish Yin and body fluids, clear deficient Fire, arrest abnormal sweating.",
        formula: formulas.dangGuiLiuHuangTang,
        points: "LI 6, LR 3, KI 7, SP 6, KI 3, HT 6, BL 13. Supporting: LU 5, BL 43.",
      },
    ],
  },
  46: {
    overview:
      "Wheezing is a high-pitched whistling sound produced by narrowed or compressed small airways. TCM differentiates acute Cold/Hot Phlegm from chronic Lung, Spleen, or Kidney deficiency.",
    redFlags: ["Laboured breathing", "Weakening effort to breathe", "Decreased level of consciousness", "Swelling of face or tongue"],
    patterns: [
      {
        name: "Cold Phlegm",
        principle: "Warm Lung, scatter Cold, resolve Phlegm, relieve breathlessness.",
        formula: formulas.xiaoQingLongTang,
        points: "LU 7, BL 13, LU 1, LU 6, CV 22, CV 17, ST 40, PC 6. Moxa applicable.",
      },
      {
        name: "Hot Phlegm",
        principle: "Clear Heat, restore Lung descending, resolve Phlegm, stop wheezing.",
        formula: formulas.dingChuanTang,
        points: "LU 5, LU 10, LU 6, BL 13, LU 1, LI 11, PC 5, ST 40, CV 22.",
      },
      {
        name: "Lung Deficiency",
        principle: "Tonify Lung and consolidate exterior.",
        formula: formulas.buFeiTang,
        points: "LU 9, ST 36, CV 6, BL 13, GV 12, LU 7.",
      },
      {
        name: "Spleen Deficiency",
        principle: "Tonify Spleen and resolve Phlegm.",
        formula: formulas.erChenTangSanZi,
        points: "ST 36, SP 3, BL 20, BL 21, CV 12, ST 40, LU 7, LU 9, BL 13, CV 6. Moxa applicable.",
      },
      {
        name: "Kidney Deficiency",
        principle: "Tonify Kidney and strengthen Kidney grasping of Qi.",
        formula: formulas.jinKuiShenQiWan,
        points: "KI 3, SP 6, CV 4, BL 23, BL 13, GV 12, KI 25. Use moxa for Kidney Yang deficiency.",
      },
    ],
  },
};
