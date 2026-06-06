import type { FormulaDetail, FormulaIngredient, LungConditionDetail } from "./lungContent";

const h = (chineseName: string, pinyin: string, dose: string): FormulaIngredient => ({
  chineseName, pinyin, englishName: "", dose,
});
const f = (chineseName: string, pinyin: string, actions: string[], indications: string, ingredients: FormulaIngredient[]): FormulaDetail => ({
  chineseName, pinyin, actions, indications, ingredients,
});

const formulas = {
  qingZaoJiuFeiTang: f("清燥救肺汤", "Qing Zao Jiu Fei Tang", ["Clears Lung Heat", "Nourishes fluids", "Benefits sinews"], "Limb weakness after febrile disease with dry cough, thirst, and dry skin.", [
    h("桑叶", "Sang Ye", "9 g"), h("石膏", "Shi Gao", "8 g"), h("甘草", "Gan Cao", "3 g"), h("人参", "Ren Shen", "2 g"), h("胡麻仁", "Hu Ma Ren", "3 g"), h("阿胶", "E Jiao", "3 g"), h("麦冬", "Mai Dong", "4 g"), h("杏仁", "Xing Ren", "2 g"), h("枇杷叶", "Pi Pa Ye", "3 g"),
  ]),
  jiaWeiErMiaoSan: f("加味二妙散", "Jia Wei Er Miao San", ["Clears Damp-Heat", "Strengthens sinews"], "Heavy weak lower limbs with heat, swelling, and yellow greasy coat.", [
    h("苍术", "Cang Zhu", "9 g"), h("黄柏", "Huang Bai", "9 g"), h("牛膝", "Niu Xi", "9 g"), h("薏苡仁", "Yi Yi Ren", "15 g"), h("萆薢", "Bi Xie", "9 g"), h("防己", "Fang Ji", "9 g"), h("当归", "Dang Gui", "9 g"), h("龟板", "Gui Ban", "12 g"),
  ]),
  yiYiRenTang: f("薏苡仁汤", "Yi Yi Ren Tang", ["Warms channels", "Dispels Cold-Damp", "Relieves weakness"], "Heavy painful weak limbs worse in cold damp weather.", [
    h("薏苡仁", "Yi Yi Ren", "30 g"), h("当归", "Dang Gui", "9 g"), h("芍药", "Shao Yao", "9 g"), h("麻黄", "Ma Huang", "6 g"), h("桂枝", "Gui Zhi", "6 g"), h("苍术", "Cang Zhu", "9 g"), h("甘草", "Gan Cao", "3 g"), h("生姜", "Sheng Jiang", "5片"),
  ]),
  shenLingBaiZhuSan: f("参苓白术散", "Shen Ling Bai Zhu San", ["Tonifies Spleen", "Drains Dampness", "Strengthens limbs"], "Gradual weakness with fatigue, poor appetite, loose stool, and pale tongue.", [
    h("莲子", "Lian Zi", "15 g"), h("薏苡仁", "Yi Yi Ren", "15 g"), h("砂仁", "Sha Ren", "6 g"), h("桔梗", "Jie Geng", "6 g"), h("白扁豆", "Bai Bian Dou", "12 g"), h("茯苓", "Fu Ling", "15 g"), h("人参", "Ren Shen", "15 g"), h("甘草", "Gan Cao", "9 g"), h("白术", "Bai Zhu", "15 g"), h("山药", "Shan Yao", "15 g"),
  ]),
  guiPiTang: f("归脾汤", "Gui Pi Tang", ["Tonifies Heart and Spleen", "Nourishes Qi and Blood"], "Severe weakness with palpitations, poor memory, fatigue, and poor appetite.", [
    h("白术", "Bai Zhu", "9 g"), h("茯神", "Fu Shen", "9 g"), h("黄芪", "Huang Qi", "12 g"), h("龙眼肉", "Long Yan Rou", "12 g"), h("酸枣仁", "Suan Zao Ren", "12 g"), h("人参", "Ren Shen", "6 g"), h("木香", "Mu Xiang", "6 g"), h("炙甘草", "Zhi Gan Cao", "3 g"), h("当归", "Dang Gui", "9 g"), h("远志", "Yuan Zhi", "6 g"), h("生姜", "Sheng Jiang", "3片"), h("大枣", "Da Zao", "3枚"),
  ]),
  huQianWan: f("虎潜丸", "Hu Qian Wan", ["Nourishes Liver and Kidney", "Strengthens sinews and bones"], "Chronic lower-limb weakness, weak back and knees, and Yin-Essence deficiency.", [
    h("黄柏", "Huang Bai", "120 g"), h("龟板", "Gui Ban", "120 g"), h("知母", "Zhi Mu", "60 g"), h("熟地黄", "Shu Di Huang", "60 g"), h("陈皮", "Chen Pi", "60 g"), h("白芍", "Bai Shao", "60 g"), h("锁阳", "Suo Yang", "45 g"), h("虎骨", "Hu Gu", "30 g"), h("干姜", "Gan Jiang", "15 g"),
  ]),
  buYangHuanWuTang: f("补阳还五汤", "Bu Yang Huan Wu Tang", ["Tonifies Qi", "Moves Blood", "Unblocks channels"], "Weak or numb limbs with Qi deficiency and clear Blood stasis signs.", [
    h("黄芪", "Huang Qi", "120 g"), h("当归尾", "Dang Gui Wei", "6 g"), h("赤芍", "Chi Shao", "4.5 g"), h("地龙", "Di Long", "3 g"), h("川芎", "Chuan Xiong", "3 g"), h("红花", "Hong Hua", "3 g"), h("桃仁", "Tao Ren", "3 g"),
  ]),
  fangFengTang: f("防风汤", "Fang Feng Tang", ["Expels Wind", "Unblocks channels", "Relieves migrating pain"], "Pain that moves from joint to joint with aversion to wind.", [
    h("防风", "Fang Feng", "9 g"), h("当归", "Dang Gui", "9 g"), h("赤茯苓", "Chi Fu Ling", "9 g"), h("杏仁", "Xing Ren", "9 g"), h("黄芩", "Huang Qin", "9 g"), h("秦艽", "Qin Jiao", "9 g"), h("葛根", "Ge Gen", "9 g"), h("桂枝", "Gui Zhi", "9 g"), h("甘草", "Gan Cao", "3 g"), h("生姜", "Sheng Jiang", "5片"), h("大枣", "Da Zao", "3枚"),
  ]),
  wuTouTang: f("乌头汤", "Wu Tou Tang", ["Warms channels", "Dispels Cold", "Stops severe pain"], "Fixed severe joint pain relieved by warmth and aggravated by cold.", [
    h("麻黄", "Ma Huang", "9 g"), h("芍药", "Shao Yao", "9 g"), h("黄芪", "Huang Qi", "9 g"), h("炙甘草", "Zhi Gan Cao", "9 g"), h("川乌", "Chuan Wu", "6 g"), h("蜂蜜", "Feng Mi", "30 g"),
  ]),
  yiYiRenTangBi: f("薏苡仁汤", "Yi Yi Ren Tang", ["Dispels Dampness", "Unblocks joints", "Relieves fixed pain"], "Heavy fixed joint pain with swelling and numbness.", [
    h("薏苡仁", "Yi Yi Ren", "30 g"), h("当归", "Dang Gui", "9 g"), h("芍药", "Shao Yao", "9 g"), h("麻黄", "Ma Huang", "6 g"), h("桂枝", "Gui Zhi", "6 g"), h("苍术", "Cang Zhu", "9 g"), h("甘草", "Gan Cao", "3 g"), h("生姜", "Sheng Jiang", "5片"),
  ]),
  baiHuJiaGuiZhiTang: f("白虎加桂枝汤", "Bai Hu Jia Gui Zhi Tang", ["Clears Heat", "Unblocks joints", "Relieves painful swelling"], "Red hot swollen joints with fever, thirst, and rapid pulse.", [
    h("知母", "Zhi Mu", "18 g"), h("石膏", "Shi Gao", "48 g"), h("炙甘草", "Zhi Gan Cao", "6 g"), h("粳米", "Jing Mi", "9 g"), h("桂枝", "Gui Zhi", "9 g"),
  ]),
  taoHongYin: f("桃红饮", "Tao Hong Yin", ["Transforms Phlegm", "Moves Blood", "Unblocks chronic Bi"], "Long-standing fixed joint pain, deformity, numbness, and stasis signs.", [
    h("桃仁", "Tao Ren", "9 g"), h("红花", "Hong Hua", "6 g"), h("当归尾", "Dang Gui Wei", "9 g"), h("川芎", "Chuan Xiong", "6 g"), h("威灵仙", "Wei Ling Xian", "9 g"),
  ]),
  duHuoJiShengTang: f("独活寄生汤", "Du Huo Ji Sheng Tang", ["Dispels Wind-Damp", "Tonifies Qi and Blood", "Strengthens Liver and Kidney"], "Chronic Bi with weakness, numbness, cold pain, and deficient Qi and Blood.", [
    h("独活", "Du Huo", "9 g"), h("桑寄生", "Sang Ji Sheng", "6 g"), h("杜仲", "Du Zhong", "6 g"), h("牛膝", "Niu Xi", "6 g"), h("细辛", "Xi Xin", "6 g"), h("秦艽", "Qin Jiao", "6 g"), h("茯苓", "Fu Ling", "6 g"), h("肉桂", "Rou Gui", "6 g"), h("防风", "Fang Feng", "6 g"), h("川芎", "Chuan Xiong", "6 g"), h("人参", "Ren Shen", "6 g"), h("甘草", "Gan Cao", "6 g"), h("当归", "Dang Gui", "6 g"), h("白芍", "Bai Shao", "6 g"), h("干地黄", "Gan Di Huang", "6 g"),
  ]),
};

export const channelContent: Record<number, LungConditionDetail> = {
  3: {
    overview: "Atrophy-Flaccidity (Wei Zheng) is weakness, wasting, or loss of motor function caused by Heat, Dampness, deficiency, or Blood stasis failing to nourish the sinews.",
    redFlags: ["Sudden weakness or paralysis", "New breathing or swallowing difficulty", "Rapidly progressive weakness", "Loss of bowel or bladder control"],
    patterns: [
      { section: "Excess", name: "Heat in Lungs Injuring Yin Fluids", principle: "Clear Lung Heat, nourish fluids, moisten sinews.", points: "LU 5, LU 9, ST 36, SP 6, LI 11, BL 13.", formula: formulas.qingZaoJiuFeiTang },
      { section: "Excess", name: "Damp-Heat Invasion", principle: "Clear Damp-Heat, unblock channels, strengthen limbs.", points: "SP 9, ST 36, LI 11, GB 34, ST 40, SP 6.", formula: formulas.jiaWeiErMiaoSan },
      { section: "Excess", name: "Cold-Damp Invasion", principle: "Warm channels, dispel Cold-Damp, restore movement.", points: "GV 14, BL 23, ST 36, SP 9, GB 34, LI 4. Use moxa.", formula: formulas.yiYiRenTang },
      { section: "Deficiency", name: "Stomach and Spleen Deficiency", principle: "Tonify Spleen and Stomach Qi, nourish limbs.", points: "ST 36, BL 20, BL 21, CV 12, SP 6, GB 34.", formula: formulas.shenLingBaiZhuSan },
      { section: "Deficiency", name: "Spleen and Heart Collapse", principle: "Tonify Heart and Spleen, nourish Qi and Blood.", points: "HT 7, BL 15, BL 20, ST 36, SP 6, CV 6.", formula: formulas.guiPiTang },
      { section: "Deficiency", name: "Kidney and Liver Deficiency", principle: "Nourish Liver and Kidney, strengthen sinews and bones.", points: "KI 3, LR 8, BL 18, BL 23, GB 39, SP 6.", formula: formulas.huQianWan },
      { section: "Deficiency", name: "Blood Stasis in Channels", principle: "Tonify Qi, move Blood, unblock channels.", points: "ST 36, SP 10, BL 17, LI 11, GB 34, LR 3.", formula: formulas.buYangHuanWuTang },
    ],
  },
  26: {
    overview: "Impediment Syndrome (Bi Zheng) is pain, heaviness, numbness, or restricted movement caused by Wind, Cold, Dampness, Heat, Phlegm, stasis, or deficiency obstructing channels.",
    redFlags: ["Hot swollen joint with fever", "Sudden inability to bear weight", "Major trauma or deformity", "Progressive weakness or numbness"],
    patterns: [
      { section: "Acute Bi", name: "Migratory Bi / Wind Bi", principle: "Expel Wind, unblock channels, relieve migrating pain.", points: "GB 20, LI 4, BL 12, GB 34, SP 10, Ashi points.", formula: formulas.fangFengTang },
      { section: "Acute Bi", name: "Painful Bi / Cold Bi", principle: "Warm channels, disperse Cold, stop severe pain.", points: "GV 14, CV 4, ST 36, BL 23, Ashi points, local Jing-river points. Use moxa.", formula: formulas.wuTouTang },
      { section: "Acute Bi", name: "Fixed Bi / Damp Bi", principle: "Transform Dampness, unblock channels, relieve heaviness.", points: "SP 9, ST 36, ST 40, GB 34, BL 20, Ashi points.", formula: formulas.yiYiRenTangBi },
      { section: "Acute Bi", name: "Heat Bi", principle: "Clear Heat, cool channels, relieve swollen painful joints.", points: "LI 11, GV 14, SP 10, ST 44, Ashi points, local Ying-spring points.", formula: formulas.baiHuJiaGuiZhiTang },
      { section: "Chronic Bi", name: "Phlegm Accumulation with Blood Stasis", principle: "Transform Phlegm, move Blood, soften fixed obstruction.", points: "ST 40, SP 10, BL 17, GB 34, LR 3, Ashi points.", formula: formulas.taoHongYin },
      { section: "Chronic Bi", name: "Qi and Blood Deficiency", principle: "Tonify Qi and Blood, nourish channels, dispel lingering Wind-Damp.", points: "ST 36, SP 6, BL 17, BL 20, BL 23, GB 34.", formula: formulas.duHuoJiShengTang },
    ],
  },
};
