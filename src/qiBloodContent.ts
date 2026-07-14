import type { FormulaDetail, FormulaIngredient, LungConditionDetail } from "./lungContent";

const h = (chineseName: string, pinyin: string, dose: string): FormulaIngredient => ({
  chineseName, pinyin, englishName: "", dose,
});
const f = (chineseName: string, pinyin: string, actions: string[], indications: string, ingredients: FormulaIngredient[]): FormulaDetail => ({
  chineseName, pinyin, actions, indications, ingredients,
});

const formulas = {
  sangJuYin: f("桑菊饮", "Sang Ju Yin", ["Disperses Wind-Heat", "Clears Lung", "Stops bleeding"], "Coughing blood after Wind-Dry Heat with dry cough and thirst.", [
    h("桑叶", "Sang Ye", "7.5 g"), h("菊花", "Ju Hua", "3 g"), h("杏仁", "Xing Ren", "6 g"), h("连翘", "Lian Qiao", "5 g"), h("薄荷", "Bo He", "2.5 g"), h("苦桔梗", "Ku Jie Geng", "6 g"), h("生甘草", "Sheng Gan Cao", "2.5 g"), h("苇根", "Wei Gen", "6 g"),
  ]),
  yuNuJian: f("玉女煎", "Yu Nu Jian", ["Clears Stomach Heat", "Nourishes Yin", "Stops bleeding"], "Nose or gum bleeding with thirst, toothache, and a red tongue.", [
    h("石膏", "Shi Gao", "15 g"), h("熟地黄", "Shu Di Huang", "15 g"), h("麦冬", "Mai Dong", "6 g"), h("知母", "Zhi Mu", "5 g"), h("牛膝", "Niu Xi", "5 g"),
  ]),
  longDanXieGanTang: f("龙胆泻肝汤", "Long Dan Xie Gan Tang", ["Drains Liver Fire", "Cools Blood", "Stops bleeding"], "Bleeding with irritability, bitter taste, red eyes, and wiry rapid pulse.", [
    h("龙胆草", "Long Dan Cao", "6 g"), h("黄芩", "Huang Qin", "9 g"), h("栀子", "Zhi Zi", "9 g"), h("泽泻", "Ze Xie", "12 g"), h("木通", "Mu Tong", "9 g"), h("车前子", "Che Qian Zi", "9 g"), h("当归", "Dang Gui", "3 g"), h("生地黄", "Sheng Di Huang", "9 g"), h("柴胡", "Chai Hu", "6 g"), h("生甘草", "Sheng Gan Cao", "6 g"),
  ]),
  baiHeGuJinTang: f("百合固金汤", "Bai He Gu Jin Tang", ["Nourishes Lung and Kidney Yin", "Cools Blood", "Stops cough"], "Coughing blood with dry throat, night sweating, and a red dry tongue.", [
    h("熟地黄", "Shu Di Huang", "9 g"), h("生地黄", "Sheng Di Huang", "9 g"), h("当归", "Dang Gui", "9 g"), h("白芍", "Bai Shao", "9 g"), h("甘草", "Gan Cao", "3 g"), h("桔梗", "Jie Geng", "6 g"), h("玄参", "Xuan Shen", "3 g"), h("贝母", "Bei Mu", "6 g"), h("麦冬", "Mai Dong", "9 g"), h("百合", "Bai He", "12 g"),
  ]),
  guiPiTang: f("归脾汤", "Gui Pi Tang", ["Tonifies Spleen Qi", "Nourishes Blood", "Controls bleeding"], "Chronic pale bleeding with fatigue, poor appetite, palpitations, and weak pulse.", [
    h("白术", "Bai Zhu", "9 g"), h("茯神", "Fu Shen", "9 g"), h("黄芪", "Huang Qi", "12 g"), h("龙眼肉", "Long Yan Rou", "12 g"), h("酸枣仁", "Suan Zao Ren", "12 g"), h("人参", "Ren Shen", "6 g"), h("木香", "Mu Xiang", "6 g"), h("炙甘草", "Zhi Gan Cao", "3 g"), h("当归", "Dang Gui", "9 g"), h("远志", "Yuan Zhi", "6 g"), h("生姜", "Sheng Jiang", "3片"), h("大枣", "Da Zao", "3枚"),
  ]),
  xieXinTang: f("泻心汤", "Xie Xin Tang", ["Clears Fire", "Cools Blood", "Stops bleeding"], "Vomiting blood or nosebleed from blazing Heat with restlessness and constipation.", [
    h("大黄", "Da Huang", "6 g"), h("黄连", "Huang Lian", "3 g"), h("黄芩", "Huang Qin", "3 g"),
  ]),
  shiHuiSan: f("十灰散", "Shi Hui San", ["Cools Blood", "Stops bleeding"], "Acute upper-body bleeding caused by Heat entering the Blood.", [
    h("大蓟", "Da Ji", "9 g"), h("小蓟", "Xiao Ji", "9 g"), h("荷叶", "He Ye", "9 g"), h("侧柏叶", "Ce Bai Ye", "9 g"), h("白茅根", "Bai Mao Gen", "9 g"), h("茜草根", "Qian Cao Gen", "9 g"), h("大黄", "Da Huang", "9 g"), h("牡丹皮", "Mu Dan Pi", "9 g"), h("棕榈皮", "Zong Lu Pi", "9 g"), h("栀子", "Zhi Zi", "9 g"),
  ]),
  huangTuTang: f("黄土汤", "Huang Tu Tang", ["Warms Yang", "Strengthens Spleen", "Stops bleeding"], "Blood in stool or vomiting blood with cold limbs, pale tongue, and weak pulse.", [
    h("灶心黄土", "Zao Xin Huang Tu", "30 g"), h("甘草", "Gan Cao", "9 g"), h("干地黄", "Gan Di Huang", "9 g"), h("白术", "Bai Zhu", "9 g"), h("附子", "Fu Zi", "9 g"), h("阿胶", "E Jiao", "9 g"), h("黄芩", "Huang Qin", "9 g"),
  ]),
  xiaoJiYinZi: f("小蓟饮子", "Xiao Ji Yin Zi", ["Cools Blood", "Stops urinary bleeding", "Clears Heat"], "Bright bloody urine with burning, urgency, and dark urine.", [
    h("生地黄", "Sheng Di Huang", "12 g"), h("小蓟", "Xiao Ji", "15 g"), h("滑石", "Hua Shi", "12 g"), h("木通", "Mu Tong", "6 g"), h("蒲黄", "Pu Huang", "9 g"), h("藕节", "Ou Jie", "9 g"), h("淡竹叶", "Dan Zhu Ye", "6 g"), h("当归", "Dang Gui", "9 g"), h("栀子", "Zhi Zi", "9 g"), h("炙甘草", "Zhi Gan Cao", "6 g"),
  ]),
  zhiBaiDiHuangWan: f("知柏地黄丸", "Zhi Bai Di Huang Wan", ["Nourishes Kidney Yin", "Clears empty Heat", "Stops bleeding"], "Bleeding with night sweating, dry mouth, tinnitus, and red peeled tongue.", [
    h("熟地黄", "Shu Di Huang", "24 g"), h("山茱萸", "Shan Zhu Yu", "12 g"), h("山药", "Shan Yao", "12 g"), h("泽泻", "Ze Xie", "9 g"), h("牡丹皮", "Mu Dan Pi", "9 g"), h("茯苓", "Fu Ling", "9 g"), h("知母", "Zhi Mu", "6 g"), h("黄柏", "Huang Bai", "6 g"),
  ]),
  wuZiYanZongWan: f("五子衍宗丸", "Wu Zi Yan Zong Wan", ["Tonifies Kidney Qi", "Secures Essence and Blood"], "Chronic urinary bleeding with weak back, frequent urination, and Kidney deficiency.", [
    h("枸杞子", "Gou Qi Zi", "240 g"), h("菟丝子", "Tu Si Zi", "240 g"), h("覆盆子", "Fu Pen Zi", "120 g"), h("五味子", "Wu Wei Zi", "30 g"), h("车前子", "Che Qian Zi", "60 g"),
  ]),
  qingYingTang: f("清营汤", "Qing Ying Tang", ["Clears nutritive-level Heat", "Cools Blood", "Stops purpura"], "Petechiae with fever, irritability, dry mouth, and a crimson tongue.", [
    h("犀角", "Xi Jiao", "3 g"), h("生地黄", "Sheng Di Huang", "15 g"), h("玄参", "Xuan Shen", "9 g"), h("竹叶心", "Zhu Ye Xin", "3 g"), h("麦冬", "Mai Dong", "9 g"), h("丹参", "Dan Shen", "6 g"), h("黄连", "Huang Lian", "5 g"), h("金银花", "Jin Yin Hua", "9 g"), h("连翘", "Lian Qiao", "6 g"),
  ]),
  siJunZiTang: f("四君子汤", "Si Jun Zi Tang", ["Tonifies Qi", "Strengthens Spleen"], "Fatigue, poor appetite, loose stool, pale tongue, and weak pulse.", [
    h("人参", "Ren Shen", "9 g"), h("白术", "Bai Zhu", "9 g"), h("茯苓", "Fu Ling", "9 g"), h("炙甘草", "Zhi Gan Cao", "6 g"),
  ]),
  siWuTang: f("四物汤", "Si Wu Tang", ["Nourishes Blood", "Regulates circulation"], "Pale complexion, dizziness, palpitations, dry skin, and fine pulse.", [
    h("熟地黄", "Shu Di Huang", "12 g"), h("当归", "Dang Gui", "9 g"), h("白芍", "Bai Shao", "9 g"), h("川芎", "Chuan Xiong", "6 g"),
  ]),
  zuoGuiWan: f("左归丸", "Zuo Gui Wan", ["Nourishes Yin and Essence"], "Emaciation, dry mouth, night sweating, weak back, and red tongue.", [
    h("熟地黄", "Shu Di Huang", "240 g"), h("山药", "Shan Yao", "120 g"), h("山茱萸", "Shan Zhu Yu", "120 g"), h("枸杞子", "Gou Qi Zi", "120 g"), h("鹿角胶", "Lu Jiao Jiao", "120 g"), h("菟丝子", "Tu Si Zi", "120 g"), h("龟甲胶", "Gui Jia Jiao", "120 g"), h("川牛膝", "Chuan Niu Xi", "90 g"),
  ]),
  youGuiWan: f("右归丸", "You Gui Wan", ["Warms Yang", "Replenishes Essence"], "Cold limbs, fatigue, weak back, edema, and deep weak pulse.", [
    h("熟地黄", "Shu Di Huang", "240 g"), h("山药", "Shan Yao", "120 g"), h("山茱萸", "Shan Zhu Yu", "90 g"), h("枸杞子", "Gou Qi Zi", "120 g"), h("菟丝子", "Tu Si Zi", "120 g"), h("杜仲", "Du Zhong", "120 g"), h("当归", "Dang Gui", "90 g"), h("鹿角胶", "Lu Jiao Jiao", "120 g"), h("肉桂", "Rou Gui", "60 g"), h("附子", "Fu Zi", "60 g"),
  ]),
  danZhiXiaoYaoSan: f("丹栀逍遥散", "Dan Zhi Xiao Yao San", ["Moves Liver Qi", "Clears constrained Heat"], "Low fever related to emotional constraint with irritability and wiry pulse.", [
    h("柴胡", "Chai Hu", "6 g"), h("当归", "Dang Gui", "6 g"), h("白芍", "Bai Shao", "6 g"), h("白术", "Bai Zhu", "6 g"), h("茯苓", "Fu Ling", "6 g"), h("炙甘草", "Zhi Gan Cao", "3 g"), h("薄荷", "Bo He", "3 g"), h("生姜", "Sheng Jiang", "3片"), h("牡丹皮", "Mu Dan Pi", "6 g"), h("栀子", "Zhi Zi", "6 g"),
  ]),
  xueFuZhuYuTang: f("血府逐瘀汤", "Xue Fu Zhu Yu Tang", ["Moves Blood", "Clears stasis fever"], "Persistent low fever with fixed pain, dark complexion, and purple tongue.", [
    h("桃仁", "Tao Ren", "12 g"), h("红花", "Hong Hua", "9 g"), h("当归", "Dang Gui", "9 g"), h("生地黄", "Sheng Di Huang", "9 g"), h("川芎", "Chuan Xiong", "4.5 g"), h("赤芍", "Chi Shao", "6 g"), h("牛膝", "Niu Xi", "9 g"), h("桔梗", "Jie Geng", "4.5 g"), h("柴胡", "Chai Hu", "3 g"), h("枳壳", "Zhi Ke", "6 g"), h("甘草", "Gan Cao", "3 g"),
  ]),
  buZhongYiQiTang: f("补中益气汤", "Bu Zhong Yi Qi Tang", ["Tonifies Qi", "Raises clear Yang", "Clears deficiency fever"], "Low fever worse with exertion, fatigue, shortness of breath, and weak pulse.", [
    h("黄芪", "Huang Qi", "18 g"), h("炙甘草", "Zhi Gan Cao", "9 g"), h("人参", "Ren Shen", "6 g"), h("当归", "Dang Gui", "3 g"), h("陈皮", "Chen Pi", "6 g"), h("升麻", "Sheng Ma", "6 g"), h("柴胡", "Chai Hu", "6 g"), h("白术", "Bai Zhu", "9 g"),
  ]),
  qingHaoBieJiaTang: f("青蒿鳖甲汤", "Qing Hao Bie Jia Tang", ["Nourishes Yin", "Clears empty Heat"], "Night fever, night sweating, emaciation, and a red peeled tongue.", [
    h("青蒿", "Qing Hao", "6 g"), h("鳖甲", "Bie Jia", "15 g"), h("细生地", "Xi Sheng Di", "12 g"), h("知母", "Zhi Mu", "6 g"), h("牡丹皮", "Mu Dan Pi", "9 g"),
  ]),
  lingGuiZhuGanTang: f("苓桂术甘汤", "Ling Gui Zhu Gan Tang", ["Warms Yang", "Transforms Phlegm-Fluids"], "Chest and epigastric fullness, dizziness, palpitations, and clear fluids.", [
    h("茯苓", "Fu Ling", "12 g"), h("桂枝", "Gui Zhi", "9 g"), h("白术", "Bai Zhu", "6 g"), h("炙甘草", "Zhi Gan Cao", "6 g"),
  ]),
  shiZaoTang: f("十枣汤", "Shi Zao Tang", ["Drives out retained fluid", "Relieves chest and flank fullness"], "Excess suspended fluid with severe chest/flank pain and shortness of breath.", [
    h("芫花", "Yuan Hua", "1 g"), h("甘遂", "Gan Sui", "1 g"), h("大戟", "Da Ji", "1 g"), h("大枣", "Da Zao", "10枚"),
  ]),
  xiaoQingLongTang: f("小青龙汤", "Xiao Qing Long Tang", ["Warms Lung", "Transforms Cold-Fluid", "Stops cough"], "Cough, wheeze, clear sputum, chills, and no thirst.", [
    h("麻黄", "Ma Huang", "9 g"), h("芍药", "Shao Yao", "9 g"), h("细辛", "Xi Xin", "3 g"), h("干姜", "Gan Jiang", "9 g"), h("炙甘草", "Zhi Gan Cao", "9 g"), h("桂枝", "Gui Zhi", "9 g"), h("五味子", "Wu Wei Zi", "6 g"), h("半夏", "Ban Xia", "9 g"),
  ]),
  zhenWuTang: f("真武汤", "Zhen Wu Tang", ["Warms Spleen-Kidney Yang", "Moves water"], "Fluid retention with cold limbs, edema, scant urine, and deep weak pulse.", [
    h("茯苓", "Fu Ling", "9 g"), h("芍药", "Shao Yao", "9 g"), h("生姜", "Sheng Jiang", "9 g"), h("白术", "Bai Zhu", "6 g"), h("附子", "Fu Zi", "9 g"),
  ]),
};

const p = (
  section: string | undefined,
  name: string,
  principle: string,
  points: string,
  formula?: FormulaDetail,
  techniques?: string[],
) => ({ section, name, principle, points, formula, techniques });

export const qiBloodContent: Record<number, LungConditionDetail> = {
  4: {
    overview: "Bleeding Disorders (Xue Zheng) are organized by bleeding location, then differentiated by Heat, Fire, Yin deficiency, Qi deficiency, or deficient Cold.",
    redFlags: ["Heavy or uncontrolled bleeding", "Vomiting or coughing blood", "Black tarry stool", "Blood in urine with clots", "Dizziness, fainting, pallor, or shortness of breath"],
    patterns: [
      p("Epistaxis", "Lung Heat", "Clear Lung Heat, cool Blood, stop nosebleed.", "LU 5, LU 10, LI 4, LI 11, GV 23, Bitong.", formulas.sangJuYin),
      p("Epistaxis", "Stomach Heat", "Clear Stomach Heat, cool Blood, stop bleeding.", "ST 44, LI 11, ST 36, GV 23, LI 20, SP 10.", formulas.yuNuJian),
      p("Epistaxis", "Liver Fire", "Drain Liver Fire, cool Blood, stop bleeding.", "LR 2, LR 3, GB 20, LI 11, GV 23, SP 10.", formulas.longDanXieGanTang),
      p("Epistaxis", "Liver-Kidney Yin Deficiency", "Nourish Liver-Kidney Yin, clear empty Heat, stop bleeding.", "KI 3, KI 6, SP 6, LR 8, GV 23, HT 6.", formulas.zhiBaiDiHuangWan),
      p("Epistaxis", "Spleen Qi Failing to Control Blood", "Tonify Spleen Qi, contain Blood, stop bleeding.", "ST 36, BL 20, CV 6, SP 6, SP 10, GV 20.", formulas.guiPiTang),
      p("Coughing Blood", "Wind-Dry Heat", "Disperse Wind-Dry Heat, moisten Lung, stop bleeding.", "LU 5, LU 10, LU 7, LI 4, BL 13, SP 10.", formulas.sangJuYin),
      p("Coughing Blood", "Liver Fire Invading Lung", "Drain Liver Fire, clear Lung, cool Blood.", "LR 2, LR 3, LU 5, LU 10, BL 13, SP 10.", formulas.longDanXieGanTang),
      p("Coughing Blood", "Lung Yin Deficiency with Empty Heat", "Nourish Lung Yin, clear empty Heat, stop bleeding.", "LU 9, KI 6, SP 6, BL 13, HT 6, SP 10.", formulas.baiHeGuJinTang),
      p("Vomiting Blood", "Stomach Heat", "Clear Stomach Fire, cool Blood, stop vomiting blood.", "ST 44, LI 11, CV 12, PC 6, SP 10, BL 17.", formulas.xieXinTang),
      p("Vomiting Blood", "Liver Fire Invading Stomach", "Drain Liver Fire, harmonize Stomach, stop bleeding.", "LR 2, LR 3, ST 44, CV 12, PC 6, SP 10.", formulas.longDanXieGanTang),
      p("Vomiting Blood", "Spleen-Stomach Qi Deficiency", "Tonify middle Qi, contain Blood, stop bleeding.", "ST 36, BL 20, CV 6, CV 12, SP 6, SP 10.", formulas.guiPiTang),
      p("Blood in Stool", "Damp-Heat in Intestines", "Clear intestinal Damp-Heat, cool Blood, stop bleeding.", "ST 25, ST 37, LI 11, SP 9, SP 10, BL 17.", formulas.shiHuiSan),
      p("Blood in Stool", "Spleen-Stomach Deficient Cold", "Warm middle, strengthen Spleen, stop bleeding.", "CV 6, CV 12, ST 36, BL 20, SP 6, GV 4.", formulas.huangTuTang),
      p("Blood in Urine", "Bladder Heat / Heart Fire", "Clear Heart and Bladder Heat, cool Blood, promote urination.", "HT 8, CV 3, BL 28, SP 9, SP 10, KI 10.", formulas.xiaoJiYinZi),
      p("Blood in Urine", "Kidney Yin Deficiency with Empty Heat", "Nourish Kidney Yin, clear empty Heat, stop bleeding.", "KI 3, KI 6, SP 6, CV 4, SP 10, BL 23.", formulas.zhiBaiDiHuangWan),
      p("Blood in Urine", "Spleen Failing to Control Blood", "Tonify Spleen Qi, contain Blood, support urination.", "ST 36, BL 20, CV 6, SP 6, CV 3, SP 10.", formulas.guiPiTang),
      p("Blood in Urine", "Kidney Qi Not Firm", "Tonify Kidney Qi, secure lower burner, stop bleeding.", "KI 3, BL 23, CV 4, GV 4, CV 3, SP 6.", formulas.wuZiYanZongWan),
      p("Petechiae", "Blood Heat", "Clear Heat, cool Blood, disperse purpura.", "LI 11, GV 14, SP 10, BL 17, PC 8, LR 2.", formulas.qingYingTang),
      p("Petechiae", "Yin Deficiency with Empty Heat", "Nourish Yin, clear empty Heat, cool Blood.", "KI 3, KI 6, SP 6, HT 6, SP 10, BL 17.", formulas.zhiBaiDiHuangWan),
      p("Petechiae", "Qi Deficiency Not Holding Blood", "Tonify Qi, strengthen Spleen, contain Blood.", "ST 36, BL 20, CV 6, SP 6, SP 10, GV 20.", formulas.guiPiTang),
      p("Bleeding Gums", "Stomach Heat", "Clear Stomach Fire, cool Blood, stop gum bleeding.", "ST 44, LI 11, ST 6, ST 7, SP 10, CV 12.", formulas.yuNuJian),
      p("Bleeding Gums", "Stomach Yin Deficiency with Empty Heat", "Nourish Stomach Yin, clear empty Heat, stop bleeding.", "ST 36, SP 6, KI 6, CV 12, ST 44, SP 10.", formulas.zhiBaiDiHuangWan),
      p("Bleeding Gums", "Stomach-Spleen Deficiency", "Tonify Spleen-Stomach Qi, contain Blood.", "ST 36, BL 20, CV 12, CV 6, SP 6, SP 10.", formulas.guiPiTang),
    ],
  },
  8: {
    overview: "Consumptive Disease (Xu Lao) is chronic depletion of Qi, Blood, Yin, or Yang affecting multiple organ systems.",
    redFlags: ["Unexplained weight loss", "Persistent fever or night sweats", "Severe fatigue with shortness of breath", "Blood in stool or sputum"],
    patterns: [
      p("Qi Deficiency", "Lung Qi Deficiency", "Tonify and benefit Lung Qi.", "ST 36, CV 6, BL 13, LU 5, CV 17", undefined, ["Reinforcing method."]),
      p("Qi Deficiency", "Spleen Qi Deficiency", "Strengthen the Spleen and supplement Qi.", "ST 36, CV 6, BL 20, SP 9, SP 15, LR 13", undefined, ["Reinforcing method."]),
      p("Blood Deficiency", "Heart Blood Deficiency", "Nourish Blood and calm the spirit.", "BL 15, CV 14, PC 6, HT 5, BL 17", undefined, ["Reinforcing method."]),
      p("Blood Deficiency", "Liver Blood Deficiency", "Nourish Blood and nourish the Liver.", "BL 18, LR 14, SP 10, GB 8, ST 36", undefined, ["Reinforcing method."]),
      p("Yin Deficiency", "Lung Yin Deficiency", "Nourish Yin and moisten the Lung.", "BL 13, LU 9, LU 6, LU 10, SP 6"),
      p("Yin Deficiency", "Heart Yin Deficiency", "Nourish Yin and reinforce the Heart.", "HT 6, PC 6, SP 6, BL 15, CV 14"),
      p("Yin Deficiency", "Spleen-Stomach Yin Deficiency", "Nourish Yin and harmonize the Stomach.", "SP 6, SP 9, ST 36, CV 12, ST 25, BL 20, BL 21"),
      p("Yin Deficiency", "Liver Yin Deficiency", "Nourish Liver Yin.", "SP 6, BL 18, LR 3, LR 14, BL 2"),
      p("Yin Deficiency", "Kidney Yin Deficiency", "Nourish Kidney Yin.", "BL 23, KI 3, TE 21, SP 6, KI 10"),
      p("Yang Deficiency", "Heart Yang Deficiency", "Supplement and warm Heart Yang.", "BL 15, BL 14, PC 6, CV 14, HT 6, CV 4", undefined, ["Moxa is specified by the course protocol."]),
      p("Yang Deficiency", "Spleen Yang Deficiency", "Warm the middle jiao and strengthen the Spleen.", "BL 20, CV 12, CV 8, CV 4, ST 36, SP 8", undefined, ["Moxa is specified by the course protocol."]),
      p("Yang Deficiency", "Kidney Yang Deficiency", "Warm and reinforce Kidney Yang; nourish Essence and Blood.", "BL 23, BL 21, GV 4, BL 28, CV 8, CV 4", undefined, ["Moxa is specified by the course protocol."]),
    ],
  },
  29: {
    overview: "Internal Damage Fever (Nei Shang Fa Re) is persistent or recurrent fever arising from constraint, stasis, or deficiency rather than an external pathogen.",
    redFlags: ["Persistent unexplained fever", "Severe night sweats or weight loss", "Immunocompromised patient", "Confusion or breathing difficulty"],
    patterns: [
      p(undefined, "Qi Stagnation Fever", "Move Liver Qi, clear constrained Heat.", "LR 3, GB 34, PC 6, CV 17, LI 11, GV 14.", formulas.danZhiXiaoYaoSan),
      p(undefined, "Blood Stasis Fever", "Move Blood, disperse stasis, clear lingering fever.", "SP 10, BL 17, LR 3, PC 6, LI 11, GV 14.", formulas.xueFuZhuYuTang),
      p(undefined, "Qi Deficiency Fever", "Tonify Qi, raise clear Yang, clear deficiency fever.", "ST 36, CV 6, BL 20, GV 20, SP 6, LI 11.", formulas.buZhongYiQiTang),
      p(undefined, "Blood Deficiency Fever", "Nourish Blood, harmonize nutritive Qi, clear deficiency fever.", "SP 6, ST 36, BL 17, LR 8, HT 7, LI 11.", formulas.siWuTang),
      p(undefined, "Yin Deficiency Fever", "Nourish Yin, clear empty Heat, reduce night fever.", "KI 3, KI 6, SP 6, HT 6, LI 11, GV 14.", formulas.qingHaoBieJiaTang),
    ],
  },
  45: {
    overview: "Watery Phlegm (Tan Yin) describes pathogenic fluid retained in the stomach, chest, hypochondrium, skin, or Lung due to impaired Yang transformation.",
    redFlags: ["Sudden shortness of breath", "Chest pain", "Coughing pink frothy sputum", "Rapidly increasing swelling", "Low oxygen or confusion"],
    patterns: [
      p("Tan Yin", "Spleen Yang Deficiency", "Warm the Spleen and transform fluids.", "CV 12, CV 8, ST 24, SP 17, PC 6, ST 36, SP 9, BL 20, BL 21", undefined, ["Moxa is applicable according to the course protocol."]),
      p("Tan Yin", "Fluid Retention in Stomach and Intestines", "Promote urination or bowel movement to expel fluids.", "CV 12, SP 14, ST 24, ST 25, ST 28, ST 37, SP 9, ST 44"),
      p("Xuan Yin", "Pathogenic Factors Attacking Chest and Lung", "Harmonize, disperse the Lung, and open the chest.", "LR 13, LR 14, TE 5, LU 7, CV 17, CV 12"),
      p("Xuan Yin", "Fluid Retention in Chest and Hypochondrium", "Drain the Lung and remove fluids.", "LR 13, LR 14, TE 5, LU 7, KI 5, CV 22"),
      p("Xuan Yin", "Obstructed Flow of Qi in Collaterals", "Regulate Qi and harmonize the collaterals.", "LR 13, LR 14, LU 7, CV 22, LI 4, LR 3", undefined, ["Reducing method."]),
      p("Xuan Yin", "Internal Heat Due to Yin Deficiency", "Nourish Yin and clear Heat.", "LR 13, LR 14, LU 7, HT 6, KI 7, SP 9, SP 6", undefined, ["Reinforcing method."]),
      p("Yi Yin", "Subcutaneous Fluid Retention", "Release the exterior and transform fluids.", "PC 6, SP 9, ST 36, LU 5, LU 7, SP 4", undefined, ["Reinforcing method."]),
      p("Zhi Yin", "Cold-Fluid Retention in Lung", "Warm the Lung and resolve water retention.", "LU 7, LU 5, Dingchuan, CV 17, SP 9, ST 40", undefined, ["Reducing method."]),
      p("Zhi Yin", "Spleen-Kidney Yang Deficiency", "Warm Spleen and Kidney Yang and transform retained fluids.", "LU 7, LU 5, Dingchuan, CV 17, CV 12, SP 9, ST 40, SP 4, BL 20, BL 23", undefined, ["Reinforcing method.", "Moxa is specified by the course protocol."]),
    ],
  },
};
