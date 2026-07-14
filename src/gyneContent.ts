import type { FormulaDetail, FormulaIngredient, LungConditionDetail, LungPatternDetail } from "./lungContent";
import { gyneLecturePoints } from "./gyneLecturePoints";
import { gyneLectureTechniques } from "./gyneLectureTechniques";

const h = (chineseName: string, pinyin: string, dose: string): FormulaIngredient => ({ chineseName, pinyin, englishName: "", dose });
const f = (chineseName: string, pinyin: string, actions: string[], ingredients: FormulaIngredient[]): FormulaDetail => ({
  chineseName, pinyin, actions, indications: actions.join("; "), ingredients,
});

const formulas = {
  chaiHuShuGanSan: f("柴胡疏肝散", "Chai Hu Shu Gan San", ["Spreads Liver Qi", "Relieves constraint"], [h("陈皮", "Chen Pi", "6 g"), h("柴胡", "Chai Hu", "6 g"), h("川芎", "Chuan Xiong", "4.5 g"), h("枳壳", "Zhi Ke", "4.5 g"), h("芍药", "Shao Yao", "4.5 g"), h("炙甘草", "Zhi Gan Cao", "1.5 g"), h("香附", "Xiang Fu", "4.5 g")]),
  xueFuZhuYuTang: f("血府逐瘀汤", "Xue Fu Zhu Yu Tang", ["Moves Blood", "Dispels stasis"], [h("桃仁", "Tao Ren", "12 g"), h("红花", "Hong Hua", "9 g"), h("当归", "Dang Gui", "9 g"), h("生地黄", "Sheng Di Huang", "9 g"), h("川芎", "Chuan Xiong", "4.5 g"), h("赤芍", "Chi Shao", "6 g"), h("牛膝", "Niu Xi", "9 g"), h("桔梗", "Jie Geng", "4.5 g"), h("柴胡", "Chai Hu", "3 g"), h("枳壳", "Zhi Ke", "6 g"), h("甘草", "Gan Cao", "3 g")]),
  cangFuDaoTanWan: f("苍附导痰丸", "Cang Fu Dao Tan Wan", ["Dries Dampness", "Transforms Phlegm", "Regulates menstruation"], [h("苍术", "Cang Zhu", "9 g"), h("香附", "Xiang Fu", "9 g"), h("陈皮", "Chen Pi", "6 g"), h("半夏", "Ban Xia", "9 g"), h("茯苓", "Fu Ling", "9 g"), h("胆南星", "Dan Nan Xing", "6 g"), h("枳壳", "Zhi Ke", "6 g"), h("甘草", "Gan Cao", "3 g")]),
  siWuTang: f("四物汤", "Si Wu Tang", ["Nourishes Blood", "Regulates menstruation"], [h("熟地黄", "Shu Di Huang", "12 g"), h("当归", "Dang Gui", "9 g"), h("白芍", "Bai Shao", "9 g"), h("川芎", "Chuan Xiong", "6 g")]),
  baZhenTang: f("八珍汤", "Ba Zhen Tang", ["Tonifies Qi and Blood"], [h("人参", "Ren Shen", "9 g"), h("白术", "Bai Zhu", "9 g"), h("茯苓", "Fu Ling", "9 g"), h("炙甘草", "Zhi Gan Cao", "6 g"), h("熟地黄", "Shu Di Huang", "12 g"), h("当归", "Dang Gui", "9 g"), h("白芍", "Bai Shao", "9 g"), h("川芎", "Chuan Xiong", "6 g")]),
  guiPiTang: f("归脾汤", "Gui Pi Tang", ["Tonifies Heart and Spleen", "Nourishes Blood", "Controls bleeding"], [h("白术", "Bai Zhu", "9 g"), h("茯神", "Fu Shen", "9 g"), h("黄芪", "Huang Qi", "12 g"), h("龙眼肉", "Long Yan Rou", "12 g"), h("酸枣仁", "Suan Zao Ren", "12 g"), h("人参", "Ren Shen", "6 g"), h("木香", "Mu Xiang", "6 g"), h("炙甘草", "Zhi Gan Cao", "3 g"), h("当归", "Dang Gui", "9 g"), h("远志", "Yuan Zhi", "6 g")]),
  zuoGuiWan: f("左归丸", "Zuo Gui Wan", ["Nourishes Kidney Yin and Essence"], [h("熟地黄", "Shu Di Huang", "240 g"), h("山药", "Shan Yao", "120 g"), h("山茱萸", "Shan Zhu Yu", "120 g"), h("枸杞子", "Gou Qi Zi", "120 g"), h("鹿角胶", "Lu Jiao Jiao", "120 g"), h("菟丝子", "Tu Si Zi", "120 g"), h("龟甲胶", "Gui Jia Jiao", "120 g"), h("川牛膝", "Chuan Niu Xi", "90 g")]),
  youGuiWan: f("右归丸", "You Gui Wan", ["Legacy reference only; formula is withheld pending safety review"], []),
  wenJingTang: f("温经汤", "Wen Jing Tang", ["Warms uterus", "Moves Blood", "Nourishes Blood"], [h("吴茱萸", "Wu Zhu Yu", "9 g"), h("当归", "Dang Gui", "6 g"), h("川芎", "Chuan Xiong", "6 g"), h("芍药", "Shao Yao", "6 g"), h("人参", "Ren Shen", "6 g"), h("桂枝", "Gui Zhi", "6 g"), h("阿胶", "E Jiao", "6 g"), h("牡丹皮", "Mu Dan Pi", "6 g"), h("生姜", "Sheng Jiang", "6 g"), h("甘草", "Gan Cao", "6 g"), h("半夏", "Ban Xia", "6 g"), h("麦冬", "Mai Dong", "9 g")]),
  shaoFuZhuYuTang: f("少腹逐瘀汤", "Shao Fu Zhu Yu Tang", ["Warms uterus", "Moves Blood", "Stops pain"], [h("小茴香", "Xiao Hui Xiang", "7粒"), h("干姜", "Gan Jiang", "0.6 g"), h("延胡索", "Yan Hu Suo", "3 g"), h("没药", "Mo Yao", "6 g"), h("当归", "Dang Gui", "9 g"), h("川芎", "Chuan Xiong", "6 g"), h("官桂", "Guan Gui", "3 g"), h("赤芍", "Chi Shao", "6 g"), h("蒲黄", "Pu Huang", "9 g"), h("五灵脂", "Wu Ling Zhi", "6 g")]),
  qingJingSan: f("清经散", "Qing Jing San", ["Clears Blood Heat", "Regulates menstruation"], [h("牡丹皮", "Mu Dan Pi", "9 g"), h("地骨皮", "Di Gu Pi", "15 g"), h("白芍", "Bai Shao", "9 g"), h("熟地黄", "Shu Di Huang", "9 g"), h("青蒿", "Qing Hao", "6 g"), h("黄柏", "Huang Bai", "3 g"), h("茯苓", "Fu Ling", "3 g")]),
  liangDiTang: f("两地汤", "Liang Di Tang", ["Nourishes Yin", "Clears empty Heat", "Stops bleeding"], [h("生地黄", "Sheng Di Huang", "30 g"), h("地骨皮", "Di Gu Pi", "9 g"), h("玄参", "Xuan Shen", "30 g"), h("麦冬", "Mai Dong", "15 g"), h("阿胶", "E Jiao", "9 g"), h("白芍", "Bai Shao", "15 g")]),
  guJingWan: f("固经丸", "Gu Jing Wan", ["Nourishes Yin", "Clears Heat", "Stops uterine bleeding"], [h("黄芩", "Huang Qin", "30 g"), h("白芍", "Bai Shao", "30 g"), h("龟板", "Gui Ban", "30 g"), h("黄柏", "Huang Bai", "9 g"), h("椿根皮", "Chun Gen Pi", "22.5 g"), h("香附", "Xiang Fu", "7.5 g")]),
  shouTaiWan: f("寿胎丸", "Shou Tai Wan", ["Tonifies Kidney", "Secures pregnancy"], [h("菟丝子", "Tu Si Zi", "120 g"), h("桑寄生", "Sang Ji Sheng", "60 g"), h("续断", "Xu Duan", "60 g"), h("阿胶", "E Jiao", "60 g")]),
  taiYuanYin: f("胎元饮", "Tai Yuan Yin", ["Tonifies Qi and Blood", "Secures pregnancy"], [h("人参", "Ren Shen", "6 g"), h("当归", "Dang Gui", "6 g"), h("杜仲", "Du Zhong", "6 g"), h("白芍", "Bai Shao", "6 g"), h("熟地黄", "Shu Di Huang", "9 g"), h("白术", "Bai Zhu", "4.5 g"), h("陈皮", "Chen Pi", "3 g"), h("炙甘草", "Zhi Gan Cao", "3 g")]),
  baoYinJian: f("保阴煎", "Bao Yin Jian", ["Clears Heat", "Nourishes Yin", "Stops uterine bleeding"], [h("生地黄", "Sheng Di Huang", "9 g"), h("熟地黄", "Shu Di Huang", "9 g"), h("白芍", "Bai Shao", "6 g"), h("山药", "Shan Yao", "6 g"), h("续断", "Xu Duan", "4.5 g"), h("黄芩", "Huang Qin", "4.5 g"), h("黄柏", "Huang Bai", "4.5 g"), h("生甘草", "Sheng Gan Cao", "3 g")]),
  xiaoYaoSan: f("逍遥散", "Xiao Yao San", ["Spreads Liver Qi", "Strengthens Spleen", "Nourishes Blood"], [h("柴胡", "Chai Hu", "9 g"), h("当归", "Dang Gui", "9 g"), h("白芍", "Bai Shao", "9 g"), h("白术", "Bai Zhu", "9 g"), h("茯苓", "Fu Ling", "9 g"), h("炙甘草", "Zhi Gan Cao", "4.5 g"), h("薄荷", "Bo He", "3 g"), h("生姜", "Sheng Jiang", "3片")]),
  danZhiXiaoYaoSan: f("丹栀逍遥散", "Dan Zhi Xiao Yao San", ["Spreads Liver Qi", "Clears Heat"], [h("柴胡", "Chai Hu", "6 g"), h("当归", "Dang Gui", "6 g"), h("白芍", "Bai Shao", "6 g"), h("白术", "Bai Zhu", "6 g"), h("茯苓", "Fu Ling", "6 g"), h("炙甘草", "Zhi Gan Cao", "3 g"), h("牡丹皮", "Mu Dan Pi", "6 g"), h("栀子", "Zhi Zi", "6 g")]),
  wanDaiTang: f("完带汤", "Wan Dai Tang", ["Tonifies Spleen", "Dries Dampness", "Stops discharge"], [h("白术", "Bai Zhu", "30 g"), h("山药", "Shan Yao", "30 g"), h("人参", "Ren Shen", "6 g"), h("白芍", "Bai Shao", "15 g"), h("车前子", "Che Qian Zi", "9 g"), h("苍术", "Cang Zhu", "9 g"), h("甘草", "Gan Cao", "3 g"), h("陈皮", "Chen Pi", "1.5 g"), h("黑芥穗", "Hei Jie Sui", "1.5 g"), h("柴胡", "Chai Hu", "1.8 g")]),
  yiHuangTang: f("易黄汤", "Yi Huang Tang", ["Clears Damp-Heat", "Stops discharge"], [h("山药", "Shan Yao", "30 g"), h("芡实", "Qian Shi", "30 g"), h("黄柏", "Huang Bai", "6 g"), h("车前子", "Che Qian Zi", "3 g"), h("白果", "Bai Guo", "10枚")]),
  wuWeiXiaoDuYin: f("五味消毒饮", "Wu Wei Xiao Du Yin", ["Clears toxic Heat", "Resolves swelling"], [h("金银花", "Jin Yin Hua", "9 g"), h("野菊花", "Ye Ju Hua", "3.6 g"), h("蒲公英", "Pu Gong Ying", "3.6 g"), h("紫花地丁", "Zi Hua Di Ding", "3.6 g"), h("紫背天葵子", "Zi Bei Tian Kui Zi", "3.6 g")]),
  buZhongYiQiTang: f("补中益气汤", "Bu Zhong Yi Qi Tang", ["Tonifies Qi", "Raises clear Yang"], [h("黄芪", "Huang Qi", "18 g"), h("炙甘草", "Zhi Gan Cao", "9 g"), h("人参", "Ren Shen", "6 g"), h("当归", "Dang Gui", "3 g"), h("陈皮", "Chen Pi", "6 g"), h("升麻", "Sheng Ma", "6 g"), h("柴胡", "Chai Hu", "6 g"), h("白术", "Bai Zhu", "9 g")]),
  shengHuaTang: f("生化汤", "Sheng Hua Tang", ["Nourishes and moves Blood", "Clears lochia", "Stops postpartum pain"], [h("全当归", "Quan Dang Gui", "24 g"), h("川芎", "Chuan Xiong", "9 g"), h("桃仁", "Tao Ren", "6 g"), h("干姜", "Gan Jiang", "2 g"), h("炙甘草", "Zhi Gan Cao", "2 g")]),
  tongRuDan: f("通乳丹", "Tong Ru Dan", ["Tonifies Qi and Blood", "Promotes lactation"], [h("人参", "Ren Shen", "30 g"), h("黄芪", "Huang Qi", "30 g"), h("当归", "Dang Gui", "60 g"), h("麦冬", "Mai Dong", "15 g"), h("木通", "Mu Tong", "9 g"), h("桔梗", "Jie Geng", "9 g"), h("七孔猪蹄", "Qi Kong Zhu Ti", "2个")]),
  xiaRuYongQuanSan: f("下乳涌泉散", "Xia Ru Yong Quan San", ["Legacy reference only; formula is withheld because the historical source contains a prohibited wildlife ingredient"], []),
  wenDanTang: f("温胆汤", "Wen Dan Tang", ["Transforms Phlegm-Heat", "Calms Shen"], [h("半夏", "Ban Xia", "6 g"), h("竹茹", "Zhu Ru", "6 g"), h("枳实", "Zhi Shi", "6 g"), h("陈皮", "Chen Pi", "9 g"), h("甘草", "Gan Cao", "3 g"), h("茯苓", "Fu Ling", "4.5 g"), h("生姜", "Sheng Jiang", "5片"), h("大枣", "Da Zao", "1枚")]),
  tianMaGouTengYin: f("天麻钩藤饮", "Tian Ma Gou Teng Yin", ["Subdues Liver Yang", "Extinguishes Wind"], [h("天麻", "Tian Ma", "9 g"), h("钩藤", "Gou Teng", "12 g"), h("石决明", "Shi Jue Ming", "18 g"), h("栀子", "Zhi Zi", "9 g"), h("黄芩", "Huang Qin", "9 g"), h("川牛膝", "Chuan Niu Xi", "12 g"), h("杜仲", "Du Zhong", "9 g"), h("益母草", "Yi Mu Cao", "9 g"), h("桑寄生", "Sang Ji Sheng", "9 g"), h("夜交藤", "Ye Jiao Teng", "9 g"), h("茯神", "Fu Shen", "9 g")]),
  huangLianEJiaoTang: f("黄连阿胶汤", "Huang Lian E Jiao Tang", ["Clears Heart Fire", "Nourishes Kidney Yin"], [h("黄连", "Huang Lian", "12 g"), h("黄芩", "Huang Qin", "6 g"), h("芍药", "Shao Yao", "6 g"), h("阿胶", "E Jiao", "9 g"), h("鸡子黄", "Ji Zi Huang", "2枚")]),
  juPiZhuRuTang: f("橘皮竹茹汤", "Ju Pi Zhu Ru Tang", ["Clears Stomach Heat", "Descends rebellious Qi"], [h("橘皮", "Ju Pi", "12 g"), h("竹茹", "Zhu Ru", "12 g"), h("大枣", "Da Zao", "5枚"), h("生姜", "Sheng Jiang", "9 g"), h("甘草", "Gan Cao", "6 g"), h("人参", "Ren Shen", "3 g")]),
  liuJunZiTang: f("六君子汤", "Liu Jun Zi Tang", ["Tonifies Spleen Qi", "Transforms Phlegm"], [h("人参", "Ren Shen", "9 g"), h("白术", "Bai Zhu", "9 g"), h("茯苓", "Fu Ling", "9 g"), h("炙甘草", "Zhi Gan Cao", "6 g"), h("陈皮", "Chen Pi", "3 g"), h("半夏", "Ban Xia", "4.5 g")]),
  baoHeWan: f("保和丸", "Bao He Wan", ["Reduces food stagnation", "Harmonizes Stomach"], [h("山楂", "Shan Zha", "180 g"), h("神曲", "Shen Qu", "60 g"), h("半夏", "Ban Xia", "90 g"), h("茯苓", "Fu Ling", "90 g"), h("陈皮", "Chen Pi", "30 g"), h("连翘", "Lian Qiao", "30 g"), h("莱菔子", "Lai Fu Zi", "30 g")]),
};

type FormulaKey = keyof typeof formulas;
type PatternSpec = [name: string, formula: FormulaKey, section?: string];

function treatment(name: string) {
  const n = name.toLowerCase();
  if (/stomach qi deficiency with empty cold/.test(n)) return { principle: "Tonify Stomach Qi, warm the middle, and descend rebellious Qi.", points: "ST 36, CV 12, CV 13, PC 6, BL 20, BL 21. Reinforcing method; moxa only when clinically appropriate." };
  if (/heart qi deficiency/.test(n)) return { principle: "Tonify Heart Qi, calm the Mind, and descend rebellious Qi.", points: "HT 5, BL 15, PC 6, CV 14, ST 36, CV 6. Reinforcing method; moxa only when clinically appropriate." };
  if (/kidney-liver yin deficiency with liver yang rising|liver yang rising/.test(n)) return { principle: "Nourish Liver and Kidney Yin, subdue Liver Yang, and calm the Mind.", points: "KI 3, LR 8, CV 4, LU 7, KI 6, LR 3, GV 24, GB 13, GB 20, PC 7. Reinforce KI 3, LR 8, CV 4; reduce the remaining points. Do not apply a warming Yang-deficiency protocol." };
  if (/kidney yin and yang deficiency/.test(n)) return { principle: "Nourish Kidney Yin, gently support Kidney Yang, and calm the Mind.", points: "KI 3, LU 7, KI 6, CV 7, HT 6, CV 4, BL 23, BL 52, SP 6. Reinforcing method; moxa only if Yang deficiency clearly predominates." };
  if (/kidney-heart disharmony/.test(n)) return { principle: "Nourish Kidney Yin, clear empty Heat, and harmonize Heart and Kidney.", points: "LU 7 (right), KI 6 (left), KI 3, CV 4, SP 6, KI 13, HT 6, KI 7, HT 8, PC 7, CV 15, GV 24. Reduce or use even method on HT 6, HT 8, PC 7; reinforce the others." };
  if (/injury to bladder/.test(n)) return { principle: "Suspected postpartum urinary-tract injury requires urgent obstetric/urologic assessment; supportive treatment must not delay bladder decompression or repair.", points: "After medical clearance only: BL 28, CV 3, BL 32, BL 63, BL 53, LU 7 (right), KI 6 (left), GV 20. Reinforcing method; moxa only when appropriate." };
  if (/steaming breast/.test(n)) return { principle: "Assess for mastitis or abscess first; then move Qi, clear obstruction, and support lactation.", points: "SP 4 (right), PC 6 (left), BL 51, GB 41, TE 6, ST 18, SI 1, LR 3. Reducing or even method." };
  if (/invasion of external wind/.test(n)) return { principle: "Exclude postpartum infection first; then nourish Blood and release the exterior.", points: "LU 7, LI 4, TE 5, LU 11, GV 14, BL 12, BL 17. Reduce except reinforce BL 17." };
  if (/food retention/.test(n)) return { principle: "After excluding postpartum infection, ileus, obstruction, or surgical complications, reduce food accumulation and harmonize the Stomach.", points: "CV 11, CV 10, ST 21, ST 19, LI 4, ST 40, LI 11, ST 44, ST 34. Reducing or even method; no moxa." };
  if (/heat|fire|toxic/.test(n)) return { principle: "Clear Heat, cool Blood, and regulate the uterus.", points: "LR 2, LI 11, SP 10, SP 6, CV 4, CV 6." };
  if (/stasis|trauma/.test(n)) return { principle: "Move Blood, dispel stasis, and regulate the uterus.", points: "SP 10, BL 17, LR 3, SP 6, CV 4, ST 29." };
  if (/qi stagnation|liver qi/.test(n)) return { principle: "Spread Liver Qi, regulate Chong and Ren, and relieve constraint.", points: "LR 3, GB 34, PC 6, SP 6, CV 17, CV 4." };
  if (/phlegm|damp/.test(n)) return { principle: "Transform Damp-Phlegm, strengthen Spleen, and regulate the lower burner.", points: "ST 40, SP 9, ST 36, CV 12, SP 6, CV 4." };
  if (/yang|cold|kidney deficiency/.test(n)) return { principle: "Warm and tonify Kidney Yang, regulate Chong and Ren.", points: "CV 4, GV 4, BL 23, KI 3, SP 6, ST 36. Use moxa." };
  if (/yin|dryness/.test(n)) return { principle: "Nourish Yin and Blood, clear empty Heat, regulate menstruation.", points: "KI 3, KI 6, SP 6, LR 8, CV 4, HT 6." };
  if (/blood deficiency|qi and blood|depletion/.test(n)) return { principle: "Tonify Qi and Blood, nourish Chong and Ren.", points: "ST 36, SP 6, CV 6, BL 17, BL 20, LR 8." };
  if (/spleen|qi deficiency|heart qi/.test(n)) return { principle: "Tonify Qi, strengthen Spleen, and secure the lower burner.", points: "ST 36, BL 20, CV 6, SP 6, GV 20, CV 4." };
  return { principle: "Regulate Qi and Blood, harmonize Chong and Ren.", points: "LR 3, SP 6, ST 36, CV 4, CV 6, BL 17." };
}

function patterns(specs: PatternSpec[]): LungPatternDetail[] {
  return specs.map(([name, formulaKey, section]) => {
    void formulaKey;
    return {
      name,
      section,
      ...treatment(name),
      notes: "Herbal formula dosing is withheld pending condition-specific safety and approval review.",
    };
  });
}

const redFlags = ["Heavy vaginal bleeding", "Severe pelvic or abdominal pain", "Fainting or marked weakness", "Fever or foul discharge", "Any concerning symptom during pregnancy or postpartum"];
const condition = (overview: string, specs: PatternSpec[], safety: string[] = []): LungConditionDetail => ({ overview, redFlags: [...safety, ...redFlags], patterns: patterns(specs) });

const pregnancyEmergency = ["Pregnancy bleeding, one-sided pain, shoulder pain, fainting, severe vomiting, fever, or reduced urination requires urgent obstetric assessment", "Do not delay emergency or evidence-based pregnancy care for acupuncture or herbs"];
const postpartumEmergency = ["Call emergency services for collapse, seizure, heavy bleeding, chest pain, shortness of breath, confusion, focal weakness, or severe headache after childbirth", "Urgent same-day postpartum assessment is required for fever, worsening abdominal or pelvic pain, foul lochia, urinary retention, wound redness, or a painful red breast", "Do not give oral herbs during a seizure, altered consciousness, persistent vomiting, or suspected surgical emergency"];

export const gyneContent: Record<number, LungConditionDetail> = {
  76: condition("Abdominal masses in gynecology arise from Qi stagnation, Blood stasis, or Phlegm-Damp accumulation.", [["Stagnation of Qi", "chaiHuShuGanSan"], ["Blood Stasis", "xueFuZhuYuTang"], ["Phlegm-Dampness", "cangFuDaoTanWan"]]),
  77: condition("Amenorrhea is absence of menstruation from deficiency of Essence, Blood, Qi, or obstruction of Chong and Ren.", [["Liver-Kidney Deficiency", "zuoGuiWan"], ["Depletion of Yin and Dryness of Blood", "liangDiTang"], ["Qi and Blood Deficiency", "baZhenTang"], ["Qi Stagnation with Blood Stasis", "xueFuZhuYuTang"], ["Phlegm-Damp Obstruction in Uterus", "cangFuDaoTanWan"]]),
  78: condition("Bleeding during pregnancy requires urgent obstetric assessment before supportive pattern treatment.", [["Kidney Deficiency", "shouTaiWan"], ["Qi and Blood Deficiency", "taiYuanYin"], ["Blood Heat", "baoYinJian"], ["Blood Stasis / Trauma", "xueFuZhuYuTang"]], pregnancyEmergency),
  79: condition("Dysmenorrhea is menstrual pain from Cold, Qi-Blood obstruction, Damp-Heat, or deficiency.", [["Cold-Damp Coagulation", "shaoFuZhuYuTang"], ["Liver Qi Stagnation", "chaiHuShuGanSan"], ["Damp-Heat Descending", "yiHuangTang"], ["Yang Deficiency with Internal Cold", "wenJingTang"], ["Liver-Kidney Deficiency", "zuoGuiWan"], ["Qi and Blood Deficiency", "baZhenTang"]]),
  80: condition("Infertility warrants evaluation of both partners, including ovulation and ovarian reserve when appropriate, semen factors, tubal and uterine factors, age, timing, medications, and relevant medical conditions before adjunctive pattern care.", [["Kidney Yang Deficiency", "youGuiWan"], ["Kidney Yin Deficiency", "zuoGuiWan"], ["Blood Deficiency", "siWuTang"], ["Cold in Uterus", "wenJingTang"], ["Dampness in Lower Burner", "cangFuDaoTanWan"], ["Blood Stasis", "xueFuZhuYuTang"], ["Qi Stagnation", "xiaoYaoSan"], ["Blood Heat", "qingJingSan"]], ["Prompt reproductive assessment is important with severe pelvic pain, abnormal bleeding, prior ectopic pregnancy, recurrent pregnancy loss, known pelvic infection, cancer treatment, or suspected pregnancy complications", "Do not delay age-sensitive fertility evaluation or evidence-based reproductive treatment"]),
  81: condition("Low milk supply requires assessment of feeding technique, milk transfer, infant hydration and growth, maternal health, medications, and breast inflammation before adjunctive pattern care.", [["Qi and Blood Deficiency", "tongRuDan"], ["Liver Qi Stagnation", "xiaRuYongQuanSan"]], ["Urgent infant assessment is needed for poor feeding, lethargy, dehydration, jaundice, or inadequate weight gain", "A painful red breast with fever may be mastitis or abscess and needs prompt medical assessment"]),
  82: condition("Bleeding between periods requires pregnancy assessment when possible and evaluation for hormonal causes, infection, medication effects, structural lesions, and cervical or endometrial disease before adjunctive pattern care.", [["Liver-Kidney Yin Deficiency with Empty Heat", "liangDiTang"], ["Damp-Heat", "yiHuangTang"], ["Blood Stasis", "xueFuZhuYuTang"], ["Spleen-Kidney Yang Deficiency", "youGuiWan"]], ["Urgent assessment is needed for possible pregnancy, heavy bleeding, fainting, severe or one-sided pelvic pain, shoulder pain, fever, or marked weakness", "Any bleeding after menopause requires medical evaluation"]),
  83: condition("Irregular menstruation includes early, late, and unpredictable cycles, each with distinct excess and deficiency patterns.", [
    ["Blood Heat", "qingJingSan", "Early Periods"], ["Full Heat", "qingJingSan", "Early Periods"], ["Heat Accumulation", "baoYinJian", "Early Periods"], ["Liver Qi Turning into Fire with Blood Heat", "danZhiXiaoYaoSan", "Early Periods"], ["Empty Heat", "liangDiTang", "Early Periods"], ["Qi Deficiency", "guiPiTang", "Early Periods"], ["Spleen Qi Deficiency", "buZhongYiQiTang", "Early Periods"], ["Kidney Qi Deficiency", "shouTaiWan", "Early Periods"],
    ["Blood Deficiency", "siWuTang", "Late Periods"], ["Excess Cold", "shaoFuZhuYuTang", "Late Periods"], ["Deficiency Cold", "wenJingTang", "Late Periods"], ["Qi Stagnation", "chaiHuShuGanSan", "Late Periods"],
    ["Liver Qi Stagnation", "xiaoYaoSan", "Unpredictable Periods"], ["Kidney Deficiency", "zuoGuiWan", "Unpredictable Periods"],
  ]),
  84: condition("A change in vaginal discharge requires assessment for physiologic causes, vaginitis, sexually transmitted infection, cervicitis, pelvic infection, retained foreign body, fistula, pregnancy-related causes, and malignancy before adjunctive pattern care.", [["Spleen Qi Deficiency", "wanDaiTang"], ["Kidney Yang Deficiency", "youGuiWan"], ["Kidney Yin Deficiency", "zuoGuiWan"], ["Damp-Heat Pouring Downward", "yiHuangTang"], ["Toxic Heat", "wuWeiXiaoDuYin"], ["Liver Qi Stagnation", "xiaoYaoSan"]], ["Prompt assessment is needed for fever, yellow-green or foul discharge, severe pelvic pain, pus, pregnancy, genital sores, urinary pain, or possible sexually transmitted infection", "Stool or gas from the vagina and any bloody discharge after menopause require urgent medical evaluation"]),
  85: condition("Persistent or abnormal postpartum lochia requires assessment for hemorrhage, retained products, infection, and delayed uterine involution before supportive pattern care.", [["Qi Deficiency", "buZhongYiQiTang"], ["Blood Stasis", "shengHuaTang"], ["Blood Heat", "baoYinJian"]], postpartumEmergency),
  86: condition("Menstrual breast aching reflects Liver Qi/Blood obstruction, Phlegm, or Liver-Kidney deficiency.", [["Liver Qi Stagnation", "chaiHuShuGanSan"], ["Liver Blood Stasis", "xueFuZhuYuTang"], ["Phlegm with Qi Stagnation", "cangFuDaoTanWan"], ["Liver-Kidney Yin Deficiency", "zuoGuiWan"]]),
  87: condition("Cyclical swelling may accompany menstruation, but new or marked edema requires assessment for cardiac, kidney, liver, thyroid, medication, pregnancy, and venous causes before adjunctive pattern care.", [["Spleen-Kidney Yang Deficiency", "youGuiWan"], ["Qi Stagnation", "xiaoYaoSan"]], ["Emergency assessment is needed for shortness of breath, chest pain, fainting, coughing blood, facial or tongue swelling, pregnancy with headache or visual symptoms, or sudden one-sided leg swelling", "Rapid weight gain, reduced urination, or swelling that persists outside the menstrual window needs medical evaluation"]),
  88: condition("Menstrual headache follows cyclical Blood deficiency, Liver Fire/Yang, or Blood stasis.", [["Blood Deficiency", "siWuTang"], ["Liver Fire Blazing", "danZhiXiaoYaoSan"], ["Liver Yang Rising", "tianMaGouTengYin"], ["Blood Stasis", "xueFuZhuYuTang"]]),
  89: condition("Vomiting blood is a medical emergency and recurrent or heavy nosebleeding requires medical assessment; a menstrual association must not delay evaluation for gastrointestinal, nasal, blood, liver, medication, or pregnancy-related causes.", [["Stagnant Liver Qi Turning into Fire", "danZhiXiaoYaoSan"], ["Lung-Kidney Yin Deficiency", "liangDiTang"]], ["Call emergency services for vomiting blood, black stool, fainting, confusion, breathing difficulty, rapid bleeding, or bleeding that does not stop with firm nasal pressure", "Do not needle or give oral herbs during active major bleeding or unstable symptoms"]),
  90: condition("Cyclical mood or behavioral symptoms require assessment for premenstrual disorders, depression, bipolar disorder, psychosis, substance or medication effects, endocrine illness, and other medical causes before adjunctive pattern care.", [["Liver Qi Stagnation", "xiaoYaoSan"], ["Phlegm-Fire Harassing Upward", "wenDanTang"], ["Liver Blood Deficiency", "siWuTang"], ["Liver-Kidney Yin Deficiency", "zuoGuiWan"], ["Spleen-Kidney Yang Deficiency", "youGuiWan"]], ["Immediate crisis or emergency help is required for suicidal thoughts, self-harm, risk to others, psychosis, severe agitation, inability to care for basic needs, or days without sleep", "Do not stop psychiatric medication abruptly; coordinate herbs and adjunctive care with the prescribing clinician"]),
  91: condition("Recurrent oral ulcers require assessment for trauma, dental disease, infection, nutritional deficiency, medication effects, gastrointestinal or immune disease, and malignancy warning signs before adjunctive pattern care.", [["Kidney Yin Deficiency with Empty Heat", "liangDiTang"], ["Stomach Fire or Stomach Damp-Heat", "qingJingSan"], ["Stomach Damp-Heat with Spleen Deficiency", "yiHuangTang"]], ["Prompt assessment is needed for an ulcer lasting more than two weeks, a hard or enlarging lesion, neck lump, unexplained weight loss, difficulty swallowing, dehydration, eye or genital ulcers, high fever, or immune suppression"]),
  92: condition("Heavy, prolonged, or irregular uterine bleeding requires pregnancy assessment and evaluation for anemia, structural lesions, ovulatory or endocrine causes, bleeding disorders, medication effects, infection, and malignancy before adjunctive pattern care.", [["Blood Heat", "qingJingSan"], ["Liver Qi Stagnation Turning into Heat", "danZhiXiaoYaoSan"], ["Blood Empty Heat", "liangDiTang"], ["Blood Stasis", "xueFuZhuYuTang"], ["Damp-Heat in Uterus", "yiHuangTang"], ["Spleen Not Holding Blood", "guiPiTang"], ["Kidney Yang Deficiency", "youGuiWan"], ["Kidney Yin Deficiency", "guJingWan"]], ["Emergency assessment is needed for soaking pads rapidly, large repeated clots, fainting, chest pain, shortness of breath, marked weakness, severe pelvic pain, pregnancy possibility, or bleeding with fever", "Any bleeding after menopause requires medical evaluation; do not use Blood-moving treatment during uncontrolled bleeding"]),
  93: condition("Recurrent pregnancy loss requires obstetric evaluation for genetic, anatomic, endocrine, immune, thrombotic, and other causes before supportive pattern care.", [["Kidney Yang Deficiency", "youGuiWan"], ["Kidney Yin Deficiency", "zuoGuiWan"], ["Blood Heat", "baoYinJian"], ["Spleen Qi Deficiency", "shouTaiWan"], ["Blood Deficiency", "taiYuanYin"], ["Blood Stasis", "xueFuZhuYuTang"]], pregnancyEmergency),
  94: condition("Nausea and vomiting in pregnancy require hydration, weight, gestational, medication, and obstetric assessment; severe or atypical symptoms may represent hyperemesis or another urgent disorder.", [["Stomach Qi Deficiency with Empty Cold", "liuJunZiTang"], ["Stomach Yin Deficiency", "liangDiTang"], ["Stagnant Liver Qi Invading Stomach", "xiaoYaoSan"], ["Stomach Heat", "juPiZhuRuTang"], ["Accumulation of Phlegm", "wenDanTang"], ["Heart Qi Deficiency", "guiPiTang"], ["Heart Fire", "huangLianEJiaoTang"]], [...pregnancyEmergency, "Urgent assessment is needed for inability to retain fluids, reduced urination, weight loss, blood or bile in vomit, severe pain, fever, jaundice, neurologic symptoms, or late-onset vomiting"]),
  95: condition("Perimenopausal symptoms may reflect hormonal transition, but atypical symptoms require assessment for pregnancy, thyroid or other endocrine disease, medication effects, cardiovascular risk, mood disorders, and gynecologic disease.", [["Kidney Yin Deficiency", "zuoGuiWan"], ["Kidney Yang Deficiency", "youGuiWan"], ["Kidney Yin and Yang Deficiency", "youGuiWan"], ["Kidney-Liver Yin Deficiency with Liver Yang Rising", "tianMaGouTengYin"], ["Kidney-Heart Disharmony", "huangLianEJiaoTang"], ["Phlegm Accumulation with Qi Stagnation", "wenDanTang"], ["Blood Stasis", "xueFuZhuYuTang"]], ["Any bleeding after 12 months without a period requires medical evaluation", "Emergency assessment is needed for heavy bleeding, fainting, chest pain, focal neurologic symptoms, a sudden severe headache, or suicidal thoughts"]),
  96: condition("Postpartum abdominal pain requires assessment for hemorrhage, retained products, infection, uterine or surgical injury, urinary or bowel complications, and hypertensive disease before supportive pattern care.", [["Blood Deficiency", "siWuTang"], ["Blood Stasis", "shengHuaTang"], ["Food Retention", "baoHeWan"]], postpartumEmergency),
  97: condition("Postpartum convulsion is a medical emergency. Call emergency services, protect the person from injury, place them on their side when possible, time the seizure, and do not restrain them or put anything in their mouth.", [["Blood and Yin Deficiency with Empty Wind", "tianMaGouTengYin"], ["Exterior Invasion of Toxin", "wuWeiXiaoDuYin"]], [...postpartumEmergency, "Postpartum eclampsia can occur after delivery even without previously recognized hypertension; acupuncture and herbs must not delay emergency treatment"]),
  98: condition("Severe postpartum dizziness, fainting, or collapse can signal hemorrhage, shock, embolism, cardiomyopathy, hypertensive disease, arrhythmia, stroke, sepsis, or medication complications and requires urgent assessment.", [["Blood Depletion with Qi Desertion", "baZhenTang"], ["Blood Stasis with Qi Blockage", "shengHuaTang"]], postpartumEmergency),
  99: condition("Postpartum fever requires prompt medical assessment for uterine, wound, urinary, breast, respiratory, or bloodstream infection and for venous thromboembolism; supportive pattern care must not delay antibiotics, drainage, or anticoagulation when indicated.", [["Invasion of External Toxins", "wuWeiXiaoDuYin"], ["Invasion of External Wind", "xiaoYaoSan"], ["Blood Deficiency", "siWuTang"], ["Blood Stasis", "shengHuaTang"], ["Steaming Breast", "wuWeiXiaoDuYin"], ["Food Retention", "baoHeWan"]], postpartumEmergency),
  100: condition("Postpartum inability to void, painful bladder distension, repeated small voids, or overflow leakage requires prompt bladder assessment and decompression when indicated; suspected urinary-tract injury needs obstetric or urologic care.", [["Spleen Qi Deficiency", "buZhongYiQiTang"], ["Lung-Spleen Qi Deficiency", "buZhongYiQiTang"], ["Kidney Qi Deficiency", "youGuiWan"], ["Injury to Bladder", "xueFuZhuYuTang"]], postpartumEmergency),
  101: condition("Uterine prolapse is a structural pelvic-support disorder. Pelvic examination, pelvic-floor care, pessary options, and gynecologic or urogynecologic management should be considered; adjunctive treatment does not restore damaged support structures.", [["Spleen Qi Deficiency", "buZhongYiQiTang"], ["Kidney Deficiency", "youGuiWan"]], ["Urgent assessment is needed for inability to urinate or pass stool, severe pain, heavy bleeding, fever, ulceration, dark tissue, or an irreducible prolapse"]),
};

const manuallyAlignedLecturePatterns = new Set([
  "95|kidney yin and yang deficiency",
  "95|kidney-liver yin deficiency with liver yang rising",
  "95|kidney-heart disharmony",
]);

const missingLectureTreatments: string[] = [];
const pregnancyGateCourses = new Set([78, 93, 94]);
const postpartumGateCourses = new Set([85, 96, 98, 99, 100]);
const medicalAssessmentGateCourses = new Set([80, 82, 84, 87, 89, 90, 91, 92, 95, 101]);

function sourceQualifiers(points: string): string[] {
  const right = new Set<string>();
  const left = new Set<string>();
  const pointCode = "(?:CV|GV|BL|KI|LR|SP|ST|LI|LU|PC|TE|HT|GB|SI)\\s*\\d+";

  for (const match of points.matchAll(new RegExp(`right\\s+(${pointCode})|(${pointCode})\\s+right`, "gi"))) {
    right.add((match[1] ?? match[2]).toUpperCase().replace(/([A-Z]+)\\s*(\\d+)/, "$1 $2"));
  }
  for (const match of points.matchAll(new RegExp(`left\\s+(${pointCode})|(${pointCode})\\s+left`, "gi"))) {
    left.add((match[1] ?? match[2]).toUpperCase().replace(/([A-Z]+)\\s*(\\d+)/, "$1 $2"));
  }

  const qualifiers: string[] = [];
  if (right.size || left.size) {
    qualifiers.push(`Laterality: ${right.size ? `right ${[...right].join(", ")}` : ""}${right.size && left.size ? "; " : ""}${left.size ? `left ${[...left].join(", ")}` : ""}.`);
  }
  if (/only if within three months/i.test(points)) {
    qualifiers.push("CV 12 is included only within the first three months, as specified by the course source; pregnancy care and point selection require obstetric context.");
  }
  return qualifiers;
}

for (const [courseNumber, content] of Object.entries(gyneContent)) {
  const numericCourse = Number(courseNumber);
  for (const pattern of content.patterns) {
    const key = `${courseNumber}|${pattern.name.toLowerCase()}`;
    const lecturePoints = gyneLecturePoints[key];
    const lectureTechniques = gyneLectureTechniques[key];
    const qualifiers = lecturePoints ? sourceQualifiers(lecturePoints) : [];
    if (lectureTechniques || qualifiers.length) pattern.techniques = [...(lectureTechniques ?? []), ...qualifiers];
    if (!lecturePoints) {
      if (!manuallyAlignedLecturePatterns.has(key)) missingLectureTreatments.push(key);
      continue;
    }

    pattern.points = lecturePoints;
    pattern.notes = `${pattern.notes ?? ""} Core points are aligned to the reviewed course lecture; technique, additions, and clinical suitability still require practitioner judgment.`.trim();

    if (pregnancyGateCourses.has(numericCourse)) {
      pattern.principle = `Only after pregnancy-related emergencies and required obstetric care are addressed: ${pattern.principle}`;
    }
    if (postpartumGateCourses.has(numericCourse)) {
      pattern.principle = `Only after urgent postpartum causes and required medical treatment are addressed: ${pattern.principle}`;
    }
    if (medicalAssessmentGateCourses.has(numericCourse)) {
      pattern.principle = `Only after relevant medical assessment and urgent causes are addressed: ${pattern.principle}`;
    }
  }
}

for (const pattern of gyneContent[97].patterns) {
  pattern.principle = "Acute postpartum convulsion is an emergency: activate emergency services and provide seizure first aid. Do not delay hospital treatment for pattern differentiation.";
  pattern.points = "No routine acupuncture prescription is shown during an acute postpartum convulsion.";
  pattern.techniques = ["Do not needle or give oral herbs during an active seizure or altered consciousness."];
  pattern.notes = "The lecture protocol is retained in the clinical audit for source review, but is intentionally suppressed from the acute-care screen.";
}

if (missingLectureTreatments.length > 0) {
  throw new Error(`Missing condition-specific gynecology lecture treatments: ${missingLectureTreatments.join(", ")}`);
}
