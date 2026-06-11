// ===================================================================
// 中英双语词典 · Bilingual Dictionary
// 编辑说明：如要修改某条翻译，找到对应键名修改后保存即可
// v3 更新：法院名升级为"法院全名"；新增"宋律师专栏"相关文案
// ===================================================================

const I18N = {
  zh: {
    // ---- 顶部 ----
    siteTitle: "中国AI司法实践案例地图",
    lede: "以地图形式定期更新全国各级法院涉人工智能案件，点击省份即可探索该地各级法院的案件信息及报道链接，同时提供年份及争议焦点多维筛选。",

    // ---- 统计 ----
    statCases: "案件",
    statCourts: "管辖法院",
    statIssues: "争议焦点",
    statColumn: "团队文章",
    statColumnHint: "点击查看 →",

    // ---- 筛选 ----
    filterYear: "年份",
    filterIssue: "争议焦点",
    filterTech: "AI 技术",
    filterAll: "全部",
    searchPlaceholder: "搜索案件名 / 案号 / 法院…",
    searchButton: "搜索",
    resetFilters: "清空筛选",

    // ---- 视图标签 ----
    overviewTitle: "全国案件分布",
    overviewSubtitle: "Nationwide Distribution",
    backToOverview: "← 返回全图",
    courtsInProvince: "管辖法院",
    casesInCourt: "案件",
    countSuffix: "案",
    backToCourts: "← 返回法院列表",

    // ---- 案件卡 ----
    statusDecided: "已审结",
    statusPending: "审理中",
    caseNumberLabel: "案号",
    yearLabel: "年份",
    statusLabel: "状态",
    issueLabel: "争议焦点",
    techLabel: "AI 技术",
    courtLabel: "管辖法院",
    noteLabel: "裁判要旨",
    viewSource: "查看原文 →",
    imagePlaceholder: "图",  // 头像位的占位字符

    // ---- 地图 ----
    legendEmpty: "暂无案件",
    legendActive: "有案件",
    legendSelected: "已选中",
    mapHint: "点击有案件的省份开始探索",

    // ---- 状态 ----
    emptyState: "当前筛选条件下没有匹配案件",
    loading: "载入中…",

    // ---- 团队文章 KW Insights ----
    columnModalTitle: "团队文章",
    columnModalSubtitle: "深度评注",
    columnModalLede: "宋海燕律师及团队就 AI 法律前沿议题撰写的专栏文章。点击篇目阅读全文。",
    columnReadMore: "阅读全文 →",
    columnEmpty: "（文章占位，敬请期待）",

    // ---- 页脚 ----
    footerNote: "数据来源于公开判决、新闻报道及团队整理。本图供研究与学习用途，非正式法律意见。",
    footerCredit: "© 宋海燕 2026 · 金杜律师事务所",
    footerUpdate: "案例更新至 2026 年 5 月",

    // ---- 页脚名片（律师简介） ----
    bioName: "宋海燕",
    bioRole: "知识产权部 · 北京 · 国际合伙人",
    bioPhoneLabel: "电话",
    bioEmailLabel: "邮箱",
    bioQrAlt: "扫码联系宋律师"
  },

  en: {
    siteTitle: "China AI Legal Case Map",
    lede: "A regularly updated selection of AI-related cases before Chinese courts. Click a province to explore the cases and source links from its courts at every level, with filters for year and key issues.",

    statCases: "Cases",
    statCourts: "Courts",
    statIssues: "Key Issues",
    statColumn: "KW Insights",
    statColumnHint: "View articles →",

    filterYear: "Year",
    filterIssue: "Key Issue",
    filterTech: "AI Tech",
    filterAll: "All",
    searchPlaceholder: "Search title, docket no., court…",
    searchButton: "Search",
    resetFilters: "Clear filters",

    overviewTitle: "Nationwide Distribution",
    overviewSubtitle: "全国案件分布",
    backToOverview: "← Back to map",
    courtsInProvince: "Courts",
    casesInCourt: "Cases",
    countSuffix: "",
    backToCourts: "← Back to courts",

    statusDecided: "Decided",
    statusPending: "Pending",
    caseNumberLabel: "Docket No.",
    yearLabel: "Year",
    statusLabel: "Status",
    issueLabel: "Key Issue",
    techLabel: "AI Tech",
    courtLabel: "Court",
    noteLabel: "Holding",
    viewSource: "View Source →",
    imagePlaceholder: "Img",

    legendEmpty: "No cases",
    legendActive: "Has cases",
    legendSelected: "Selected",
    mapHint: "Click a province with cases to explore",

    emptyState: "No cases match the current filters",
    loading: "Loading…",

    columnModalTitle: "KW Insights",
    columnModalSubtitle: "In-Depth Commentary",
    columnModalLede: "Articles by Seagull Song and her team on the AI-law frontier. Click a piece to read in full.",
    columnReadMore: "Read more →",
    columnEmpty: "(Articles to be added — coming soon.)",

    footerNote: "Data compiled from public judgments, news reports and team research. For research purposes only; not legal advice.",
    footerCredit: "© Seagull Song 2026 · King & Wood",
    footerUpdate: "Cases updated through May 2026",

    // ---- 页脚名片（律师简介） ----
    bioName: "Seagull Song",
    bioRole: "International Partner · IP Department · Beijing",
    bioPhoneLabel: "Phone",
    bioEmailLabel: "Email",
    bioQrAlt: "Scan to connect with Seagull Song"
  }
};

// ===================================================================
// 法院/城市名 中英对照
// 命名规则（按宋律师 mentor 要求统一）：
//   1. 最高人民法院 → 全称 "中华人民共和国最高人民法院"
//   2. 地方各级人民法院：行政区划 + 层级
//      · 中级人民法院：{市}市中级人民法院
//      · 基层人民法院：{市}市{区/县}人民法院（直辖市照旧 {直辖市}{区}人民法院）
//      不再添加省级前缀（如 "江苏省xx市中级人民法院" → "xx市中级人民法院"）
//   3. 专门人民法院：互联网/知识产权/金融/海事/铁路运输/自贸区/军事 等放最后
//   4. 仲裁机关单独归类
// 排序：最高人民法院 → 中级 → 基层 → 专门 → 仲裁机关
// ===================================================================
const COURT_I18N = {
  // ========== 最高人民法院 ==========
  "中华人民共和国最高人民法院": "Supreme People's Court of the People's Republic of China",

  // ========== 中级人民法院 ==========
  "广州市中级人民法院": "Guangzhou Intermediate People's Court",
  "杭州市中级人民法院": "Hangzhou Intermediate People's Court",
  "成都市中级人民法院": "Chengdu Intermediate People's Court",
  "长沙市中级人民法院": "Changsha Intermediate People's Court",
  "南京市中级人民法院": "Nanjing Intermediate People's Court",
  "扬州市中级人民法院": "Yangzhou Intermediate People's Court",
  "无锡市中级人民法院": "Wuxi Intermediate People's Court",
  "镇江市中级人民法院": "Zhenjiang Intermediate People's Court",

  // ========== 基层人民法院 ==========
  // 北京（直辖市）
  "北京市通州区人民法院": "Tongzhou District People's Court (Beijing)",
  // 上海（直辖市）
  "上海市浦东新区人民法院": "Pudong New Area People's Court (Shanghai)",
  "上海市黄浦区人民法院": "Huangpu District People's Court (Shanghai)",
  "上海市金山区人民法院": "Jinshan District People's Court (Shanghai)",
  "上海市嘉定区人民法院": "Jiading District People's Court (Shanghai)",
  "上海市徐汇区人民法院": "Xuhui District People's Court (Shanghai)",
  "上海市青浦区人民法院": "Qingpu District People's Court (Shanghai)",
  // 重庆（直辖市）
  "重庆市渝中区人民法院": "Yuzhong District People's Court (Chongqing)",
  // 江苏
  "张家港市人民法院": "Zhangjiagang City People's Court",
  "常熟市人民法院": "Changshu City People's Court",
  // 浙江
  "杭州市滨江区人民法院": "Binjiang District People's Court (Hangzhou)",
  // 江西
  "鹰潭市月湖区人民法院": "Yuehu District People's Court (Yingtan)",
  // 湖北
  "武汉东湖新技术开发区人民法院": "Wuhan East-Lake High-Tech Zone People's Court",
  "大悟县人民法院": "Dawu County People's Court",
  // 广东
  "深圳市南山区人民法院": "Nanshan District People's Court (Shenzhen)",
  // 内蒙古
  "呼和浩特市新城区人民法院": "Xincheng District People's Court (Hohhot)",
  // 河北
  "秦皇岛市山海关区人民法院": "Shanhaiguan District People's Court (Qinhuangdao)",
  // 广西
  "桂林市叠彩区人民法院": "Diecai District People's Court (Guilin)",
  // 新疆
  "乌鲁木齐市天山区人民法院": "Tianshan District People's Court (Ürümqi)",

  // ========== 专门人民法院 ==========
  // 互联网法院
  "北京互联网法院": "Beijing Internet Court",
  "杭州互联网法院": "Hangzhou Internet Court",
  "广州互联网法院": "Guangzhou Internet Court",
  "成都互联网法庭": "Chengdu Internet Court Tribunal",
  // 知识产权法院
  "北京知识产权法院": "Beijing Intellectual Property Court",
  "上海知识产权法院": "Shanghai Intellectual Property Court",
  "广州知识产权法院": "Guangzhou Intellectual Property Court",
  // 自贸区人民法院
  "四川自由贸易试验区人民法院": "Sichuan Pilot Free Trade Zone People's Court",
  // 铁路运输法院
  "成都铁路运输第一法院": "Chengdu Railway Transport Court No. 1",

  // ========== 仲裁机关（非法院） ==========
  "北京市劳动仲裁委": "Beijing Labour Arbitration Commission"
};

// ===================================================================
// 省份名 中英对照（短名 + 全名）
// ===================================================================
const PROVINCE_I18N = {
  "北京市": { zh: "北京", en: "Beijing" },
  "上海市": { zh: "上海", en: "Shanghai" },
  "天津市": { zh: "天津", en: "Tianjin" },
  "重庆市": { zh: "重庆", en: "Chongqing" },
  "河北省": { zh: "河北", en: "Hebei" },
  "山西省": { zh: "山西", en: "Shanxi" },
  "辽宁省": { zh: "辽宁", en: "Liaoning" },
  "吉林省": { zh: "吉林", en: "Jilin" },
  "黑龙江省": { zh: "黑龙江", en: "Heilongjiang" },
  "江苏省": { zh: "江苏", en: "Jiangsu" },
  "浙江省": { zh: "浙江", en: "Zhejiang" },
  "安徽省": { zh: "安徽", en: "Anhui" },
  "福建省": { zh: "福建", en: "Fujian" },
  "江西省": { zh: "江西", en: "Jiangxi" },
  "山东省": { zh: "山东", en: "Shandong" },
  "河南省": { zh: "河南", en: "Henan" },
  "湖北省": { zh: "湖北", en: "Hubei" },
  "湖南省": { zh: "湖南", en: "Hunan" },
  "广东省": { zh: "广东", en: "Guangdong" },
  "海南省": { zh: "海南", en: "Hainan" },
  "四川省": { zh: "四川", en: "Sichuan" },
  "贵州省": { zh: "贵州", en: "Guizhou" },
  "云南省": { zh: "云南", en: "Yunnan" },
  "陕西省": { zh: "陕西", en: "Shaanxi" },
  "甘肃省": { zh: "甘肃", en: "Gansu" },
  "青海省": { zh: "青海", en: "Qinghai" },
  "台湾省": { zh: "台湾", en: "Taiwan" },
  "内蒙古自治区": { zh: "内蒙古", en: "Inner Mongolia" },
  "广西壮族自治区": { zh: "广西", en: "Guangxi" },
  "西藏自治区": { zh: "西藏", en: "Tibet" },
  "宁夏回族自治区": { zh: "宁夏", en: "Ningxia" },
  "新疆维吾尔自治区": { zh: "新疆", en: "Xinjiang" },
  "香港特别行政区": { zh: "香港", en: "Hong Kong" },
  "澳门特别行政区": { zh: "澳门", en: "Macau" }
};

// ===================================================================
// 省份配色 · Per-Province Colour Palette
// 配色参考：宋律师原始 PPT 图文版（鲜亮多色：粉/蓝/绿/紫/橙系）。
// 北京：鲜红 (额外渲染五角星标记，见 app.js renderMap)。
// 邻接省份之间使用对比色，避免视觉混淆。
// ===================================================================
const PROVINCE_COLORS = {
  "北京市":               "#E53935",  // 鲜红（+ 五角星标记）
  "河北省":               "#F5A845",  // 暖橙黄（与北京鲜红邻接对比）
  "内蒙古自治区":          "#F28A89",  // 珊瑚粉（取自 PPT）
  "新疆维吾尔自治区":      "#A3BCE0",  // 淡蓝紫（取自 PPT）
  "四川省":               "#386AB1",  // 宝蓝（取自 PPT）
  "重庆市":               "#9B5DB7",  // 紫色（取自 PPT）
  "湖北省":               "#84E0C0",  // 薄荷绿（取自 PPT）
  "湖南省":               "#BD96D6",  // 浅紫
  "广西壮族自治区":        "#7E5DAE",  // 深紫
  "广东省":               "#5BBC4B",  // 鲜绿（取自 PPT）
  "江西省":               "#F08885",  // 桃粉
  "江苏省":               "#F0B232",  // 橙黄（东部沿海）
  "上海市":               "#5EB0DF",  // 亮天蓝（取自 PPT）
  "浙江省":               "#7CC576",  // 翠绿
  // 最高人民法院（虚拟键，地图不渲染）—— 留键避免 undefined
  "中华人民共和国最高人民法院": "#E53935"
};

// ===================================================================
// 案号翻译字典 · Case Number Pinyin/Roman Conversion
// 中文案号格式: (年份)+法院代字+审判程序+案件序号+号
//   例: (2024)京0491民初19067号  →  (2024) Jing 0491 Min Chu No. 19067
// 注：转换由 app.js 的 caseNumberDisplay() 完成，仅在 EN 模式启用
// ===================================================================

// 法院代字（省/直辖市/自治区简称 + 最高法）
const COURT_CODE_I18N = {
  // 多字代字放前面（caseNumberDisplay 会按长度倒序匹配）
  "最高法": "SPC",
  // 直辖市
  "京": "Jing",   // 北京
  "津": "Jin",    // 天津
  "沪": "Hu",     // 上海
  "渝": "Yu",     // 重庆
  // 省
  "冀": "Ji",     // 河北
  "晋": "Jin",    // 山西
  "辽": "Liao",   // 辽宁
  "吉": "Ji",     // 吉林
  "黑": "Hei",    // 黑龙江
  "苏": "Su",     // 江苏
  "浙": "Zhe",    // 浙江
  "皖": "Wan",    // 安徽
  "闽": "Min",    // 福建
  "赣": "Gan",    // 江西
  "鲁": "Lu",     // 山东
  "豫": "Yu",     // 河南
  "鄂": "E",      // 湖北
  "湘": "Xiang",  // 湖南
  "粤": "Yue",    // 广东
  "桂": "Gui",    // 广西
  "琼": "Qiong",  // 海南
  "川": "Chuan",  // 四川
  "贵": "Gui",    // 贵州
  "云": "Yun",    // 云南
  "陕": "Shaan",  // 陕西
  "甘": "Gan",    // 甘肃
  "宁": "Ning",   // 宁夏
  "青": "Qing",   // 青海
  "藏": "Zang",   // 西藏
  "新": "Xin",    // 新疆
  "蒙": "Meng"    // 内蒙古
};

// 审判程序代字（先匹配长串，避免"民"被先吃掉）
const CASE_TYPE_I18N = {
  // 知识产权类（3 字）
  "知民初":   "Zhi Min Chu",
  "知民终":   "Zhi Min Zhong",
  "知行初":   "Zhi Xing Chu",
  "知行终":   "Zhi Xing Zhong",
  "知民申":   "Zhi Min Shen",
  // 民事
  "民初":     "Min Chu",
  "民终":     "Min Zhong",
  "民申":     "Min Shen",
  "民再":     "Min Zai",
  "民特":     "Min Te",
  "民监":     "Min Jian",
  // 刑事
  "刑初":     "Xing Chu",
  "刑终":     "Xing Zhong",
  "刑申":     "Xing Shen",
  "刑再":     "Xing Zai",
  // 行政
  "行初":     "Xing Chu",
  "行终":     "Xing Zhong",
  "行申":     "Xing Shen",
  // 执行
  "执":       "Zhi",
  // 国家赔偿
  "赔":       "Pei"
};

// ===================================================================
// 争议焦点 · Key Issues  中英对照
// 分类依据：宋海燕律师团队 2026 Thomson Reuters Practical Law UK
// "AI-Generated Content and Copyright (China)" 第二级目录的争议焦点小节。
// ===================================================================
const ISSUE_I18N = {
  "AIGC 可版权性": "Copyrightability for AIGC Outputs",
  "AIGC 著作权归属": "Ownership of Copyright in AIGC Outputs",
  "AIGC 相关著作权侵权": "Copyright Infringement Associated with AIGC",
  "AIGC 人格权保护": "Protection of Personality Rights in AIGC",
  "AI 幻觉责任": "AI Service Provider's Liability in Generating AI Hallucinations",
  "其他": "Other Issues"
};

// 争议焦点的色彩编码（图谱用）
const ISSUE_COLOR = {
  "AIGC 可版权性":          "#B8956A",  // 金
  "AIGC 著作权归属":        "#7B8B6A",  // 橄榄
  "AIGC 相关著作权侵权":     "#8B6A4A",  // 棕
  "AIGC 人格权保护":        "#A87878",  // 玫瑰
  "AI 幻觉责任":            "#6A7B8B",  // 蓝灰
  "其他":                  "#888888"   // 中性灰
};

// ===================================================================
// AI 技术类型 · AI Technology  中英对照
// ===================================================================
const TECH_I18N = {
  "AI文生图": "Text-to-Image",
  "AI图生图": "Image-to-Image",
  "AI生文": "AI-Generated Text",
  "AI文案": "AI Copywriting",
  "AI剪辑": "AI Video Editing",
  "AI声音": "AI Voice Cloning",
  "AI音频": "AI-Generated Audio",
  "AI换脸": "AI Face Swap",
  "AI数字人": "Virtual Avatar",
  "AI视频": "AI-Generated Video",
  "AI伪造": "AI Deepfake",
  "AI幻觉": "AI Hallucination",
  "AI陪伴": "AI Companion",
  "AI爬取": "AI Web Scraping",
  "AI训练": "AI Model Training",
  "AI提示词": "AI Prompt",
  "AI标识": "AI Labelling",
  "AI引流": "AI Traffic Diversion",
  "AI替代": "AI Replacement",
  "AI大模型": "Large Language Model"
};

// ===================================================================
// 团队文章 (KW Insights) · 文章数据
// 数据来源：
//   1) 宋海燕律师官方文章列表 PDF（KWM AI Articles updated as of April 30, 2025）
//      —— 仅选取 Seagull Song 主笔/合著的 19 篇
//   2) 截止 2026.05，post-April-2025 由网站维护方提供的 5 篇新文章
// 字段：date / category_zh / category_en / title_zh / title_en / url
// 备注：英文标题以宋律师官方 PDF 中的英文标题为准；中文标题缺失的由
//      团队基于 PDF 英文标题翻译补全。
// 排序：按发布日期降序（最新在前）。
// ===================================================================
const COLUMN_ARTICLES = [
  // ----- post-April-2025（网站维护方提供，PDF 未覆盖） -----
  {
    date: "2026.02.25",
    category_zh: "出版物",
    category_en: "Publication",
    title_zh: "金杜受邀撰稿汤森路透《生成式人工智能与版权：中国篇（2026）》",
    title_en: "KWM Contributes 2026 China Chapter to Thomson Reuters Practical Law on AI-Generated Content and Copyright",
    url: "https://www.kingandwood.com/content/kwm/cn/zh/insights/latest-thinking/publication/king-and-wood-mallesons-delighted-to-contribute-to-2026-china-chapter-of-aigc-and-copyright-published-by-thomson-reuters-practical-law.html"
  },
  {
    date: "2025.11.26",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "从风险识别到透明度义务：全球AI治理动态",
    title_en: "Global AI Governance: From Risk Identification to Transparency Obligations",
    url: "https://www.kingandwood.com/content/kwm/cn/zh/insights/latest-thinking/global-ai-governance-from-risk-identification-to-transparency-obligations.html"
  },
  {
    date: "2025.08.21",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "欧盟AI模型训练数据透明度规定最新落地——浅析欧盟与美国立法动态",
    title_en: "EU's Latest Transparency Mandate for AI Training Data — A Comparison of EU and US Legislations",
    url: "https://www.kingandwood.com/content/kwm/cn/zh/insights/latest-thinking/eu-latest-transparency-mandate-for-ai-training-data-and-a-comparison-of-eu-and-us-legislations.html"
  },
  {
    date: "2025.06.10",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "浅析AI大模型开源新趋势——AI大模型开源许可协议条款分析",
    title_en: "Analysis of Open-Source License Agreement Clauses for AI Large Models",
    url: "https://www.kingandwood.com/content/kwm/cn/zh/insights/latest-thinking/analysis-of-open-source-license-agreement-clauses-for-ai-large-models.html"
  },
  {
    date: "2025.06.04",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "浅析AI训练数据中著作权人的选择退出（Opt-Out）机制",
    title_en: "Opt-Out Mechanism for Copyright Holders in AI Training Data",
    url: "https://www.kingandwood.com/content/kwm/cn/zh/insights/latest-thinking/opt-out-mechanism-in-ai-training.html"
  },

  // ----- 宋律师官方 PDF（截止 April 30, 2025，按宋律师 approve 的标题） -----
  {
    date: "2025.04.27",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "中国法院认定AI生成图片不构成作品——与美国司法标准的趋同？",
    title_en: "Chinese Court Found AI-Generated Pictures Not Copyrightable – Convergence with the US Standard?",
    url: "https://www.kwm.com/cn/en/insights/latest-thinking/chinese-court-found-ai-generated-pictures-not-copyrightable-convergence-with-the-us-standard.html"
  },
  {
    date: "2025.03.18",
    category_zh: "出版物",
    category_en: "Publication",
    title_zh: "金杜受邀撰稿汤森路透《生成式人工智能与版权：中国篇（2025）》",
    title_en: "AI-Generated Content and Copyright (China) (2025)",
    url: "https://www.kwm.com/cn/en/insights/latest-thinking/publication/king-wood-mallesons-delighted-to-contribute-to-china-chapter-of-ai-generated-content-and-copyright-published-by-thomson-reuters-practical-law-in-2025.html"
  },
  {
    date: "2025.03.03",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "中国AIGC平台被认定承担著作权侵权间接责任",
    title_en: "Chinese AIGC Platform Found Secondarily Liable for Copyright Infringement",
    url: "https://www.kwm.com/cn/en/insights/latest-thinking/chinese-aigc-platform-found-secondarily-liable-for-copyright-infringement.html"
  },
  {
    date: "2025.02.26",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "差异中寻找共识：浅析中美欧 AIGC 服务商的标识义务",
    title_en: "Labelling Obligation of AIGC Service Providers in China, the US and the EU",
    url: "https://www.kwm.com/cn/zh/insights/latest-thinking/labelling-obligation-of-aigc-service-providers-in-china-us-and-eu.html"
  },
  {
    date: "2025.01.21",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "机遇与困境并存：浅谈自动驾驶汽车行业的数据共享",
    title_en: "Data Sharing in the Autonomous Driving Industry",
    url: "https://www.kwm.com/cn/zh/insights/latest-thinking/data-sharing-in-the-autonomous-driving-industry.html"
  },
  {
    date: "2024.09.11",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "真假难辨：再议 AI 深度伪造（Deepfake）之法律边界",
    title_en: "Revisiting the Legal Boundaries of Deepfake in the US and China",
    url: "https://www.kwm.com/cn/zh/insights/latest-thinking/legal-issues-concerning-deepfake.html"
  },
  {
    date: "2024.08.06",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "从\"不正当竞争\"角度思考 AI 模型训练中\"爬虫行为\"的违法边界——欧盟与中国之比较",
    title_en: "Competition Law Risks in Web Crawling for AI Training: A Comparison between China and the EU",
    url: "https://www.kwm.com/cn/zh/insights/latest-thinking/competition-law-risks-in-crawl-for-ai-training-a-comparison-between-china-and-eu.html"
  },
  {
    date: "2024.06.12",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "浅析 AI 克隆艺人声音的侵权问题——中美新近立法与司法实践对比",
    title_en: "Infringement Risks in Voice Cloning: A Comparison of Legal Practices in China and the US",
    url: "https://www.kwm.com/cn/zh/insights/latest-thinking/infringement-risks-concerning-ai--voice-cloning-a-comparison-of-china-and-us-practice.html"
  },
  {
    date: "2024.04.27",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "中国首例AI生成声音侵权案",
    title_en: "China's First Case regarding AI-generated Voice Infringement",
    url: "https://www.kwm.com/cn/en/insights/latest-thinking/china-s-first-case-regarding-ai-generated-voice-infringement.html"
  },
  {
    date: "2024.04.07",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "再论 AIGC 的可版权性——中美司法实践剖析与比较",
    title_en: "Revisiting AIGC Copyrightability: Comparison of Legal Practices in China and the US",
    url: "https://www.kwm.com/cn/zh/insights/latest-thinking/copyright-issue-related-to-aigc-a-comparison-of-chinese-and-us-legal-practices.html"
  },
  {
    date: "2024.02.28",
    category_zh: "出版物",
    category_en: "Publication",
    title_zh: "金杜受邀撰稿汤森路透《生成式人工智能（AIGC）与版权：中国篇（2024）》",
    title_en: "AI-Generated Content and Copyright (China) (2024)",
    url: "https://www.kwm.com/cn/en/insights/latest-thinking/publication/king-wood-mallesons-delighted-to-contribute-to-china-chapter-of-ai-generated-content-and-copyright-published-by-thomson-reuters-practical-law-in-2024.html"
  },
  {
    date: "2024.02.28",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "中国首例AIGC输出物侵权案——奥特曼案",
    title_en: "China's First Case on AIGC Output Infringement—Ultraman",
    url: "https://www.kwm.com/cn/en/insights/latest-thinking/china-s-first-case-on-aigc-output-infringement-ultraman.html"
  },
  {
    date: "2023.12.07",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "中国首例AI生成图片可版权性案",
    title_en: "China's First Case on Copyrightability of AI-Generated Picture",
    url: "https://www.kwm.com/cn/en/insights/latest-thinking/china-s-first-case-on-copyrightability-of-ai-generated-picture.html"
  },
  {
    date: "2023.07.20",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "中国首部生成式人工智能管理规定",
    title_en: "China's First Regulation on the Management of Generative AI",
    url: "https://www.kwm.com/cn/en/insights/latest-thinking/china-first-regulation-on-management-of-generative-ai.html"
  },
  {
    date: "2023.06.16",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "中国首例数字人案",
    title_en: "The First Digital Avatar Case in China",
    url: "https://www.kwm.com/cn/en/insights/latest-thinking/the-first-digital-avatar-case-in-china.html"
  },
  {
    date: "2023.05.08",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "相由 AI 生：浅谈深度伪造（Deepfake）与个人形象权",
    title_en: "Deepfake and Right of Publicity: A Comparison between the US and China",
    url: "https://www.kwm.com/cn/zh/insights/latest-thinking/deepfake-and-right-to-personal-image.html"
  },
  {
    date: "2023.04.25",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "浅析 ChatGPT 训练数据之合理使用",
    title_en: "ChatGPT's Training Data: Fair Use or Not?",
    url: "https://www.kwm.com/cn/zh/insights/latest-thinking/reasonable-use-of-chatgpt-training-data.html"
  },
  {
    date: "2023.04.17",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "《生成式人工智能服务管理办法》征求意见稿浅析",
    title_en: "The Latest Draft Measures on the Management of Generative AI",
    url: "https://www.kwm.com/cn/en/insights/latest-thinking/the-latest-draft-measures-on-management-of-generative-ai.html"
  },
  {
    date: "2023.03.31",
    category_zh: "前沿观察",
    category_en: "Latest Thinking",
    title_zh: "浅谈 AIGC 的可版权性——美国、欧盟、英国与中国之比较",
    title_en: "On AIGC Copyrightability: A Comparison among the US, the EU, UK and China",
    url: "https://www.kwm.com/cn/zh/insights/latest-thinking/aigc-copyright-capabilities-a-comparison-among-us-eu-uk-and-china.html"
  }
];

// 工具函数：获取当前语言的字符串
function t(key, lang) {
  return I18N[lang || 'zh'][key] || key;
}
