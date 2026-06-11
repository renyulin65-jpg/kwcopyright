// ===================================================================
// 中国 AI 司法实践案例数据
// ===================================================================
// 编辑说明：
//   添加新案件：复制下面任一个 { ... } 块，粘贴到列表中，修改内容即可
//
// 字段说明:
//   province     - 省份/直辖市全名（与地图匹配）。最高法填 "中华人民共和国最高人民法院"
//   city         - 法院全名（中文，与 i18n.js 中 COURT_I18N 的 key 一致）
//                  如新增法院记得在 i18n.js 的 COURT_I18N 里加一条翻译
//   image        - 案件配图路径（相对于 index.html）。例如 "images/li-spring-breeze.jpg"
//                  留空字符串 "" 时会显示占位头像（用案件首字 + 配色）
//   title_zh     - 案件中文名
//   title_en     - 案件英文名（如不填则英文版页面回退显示中文）
//   caseNumber   - 案号（没有就填 ""）
//   year         - 年份（数字）
//   issue        - 争议焦点，必须是以下之一:
//                  "AIGC 可版权性"
//                  "AI 训练数据合规"
//                  "AI 服务提供者责任"
//                  "人格权数字化保护"
//                  "AI 不正当竞争"
//                  "AI 内容真实性"
//                  "其他"
//   tech         - AI 技术类型，数组（详见 i18n.js）
//   note_zh      - 中文裁判要旨/备注
//   note_en      - 英文裁判要旨/备注（可空字符串）
//   status       - "decided"（已审结）或 "pending"（审理中）
//   url          - 原文链接
// ===================================================================

const CASES = [
  // ============= 中华人民共和国最高人民法院 =============
  {
    province: "中华人民共和国最高人民法院",
    city: "中华人民共和国最高人民法院",
    image: "images/case-01.jpg",
    title_zh: "翎腾公司诉纸上觉知公司及张某等四人技术秘密侵权案",
    title_en: "Lingteng v. Zhishang Juezhi & Zhang et al. (AI Trade Secret)",
    caseNumber: "(2023)最高法知民终1503号",
    year: 2023,
    issue: "AIGC 相关著作权侵权",
    tech: ["AI大模型"],
    note_zh: "AI 模型开发涉技术秘密保护",
    note_en: "Trade secret protection in AI model development",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/fHUYfWTIwSA0Juvh9YwiFw"
  },

  // ============= 北京互联网法院 =============
  {
    province: "北京市",
    city: "北京互联网法院",
    image: "images/case-02.jpg",
    title_zh: "某直播机构诉某视频发布者AI生文名誉权侵权案",
    title_en: "Live-stream Co. v. Video Publisher (AI-Generated Defamation)",
    caseNumber: "",
    year: 2026,
    issue: "其他",
    tech: ["AI生文"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/jujGk66UwMiB17KV4WFYvw"
  },
  {
    province: "北京市",
    city: "北京互联网法院",
    image: "images/case-03.jpg",
    title_zh: "某演员诉某短剧制作公司AI\"撞脸\"侵权案",
    title_en: "Actor v. Short-drama Producer (AI Face Likeness)",
    caseNumber: "",
    year: 2026,
    issue: "AIGC 人格权保护",
    tech: ["AI视频"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/ozK2gbbifQYKzwXi_hCvFA"
  },
  {
    province: "北京市",
    city: "北京互联网法院",
    image: "images/case-04.jpg",
    title_zh: "魏某虚假陈述AI生成内容案",
    title_en: "Wei (False Representation of AI Content)",
    caseNumber: "",
    year: 2025,
    issue: "其他",
    tech: ["AI生文"],
    note_zh: "虚假陈述AI生成内容",
    note_en: "False representation of AI-generated content",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/gu_8JtxqkzwoLdUcp_8IpQ"
  },
  {
    province: "北京市",
    city: "北京互联网法院",
    image: "images/case-05.jpg",
    title_zh: "周某诉某科技公司AI图片著作权侵权案",
    title_en: "Zhou v. Tech Co. (AI Image Copyright)",
    caseNumber: "",
    year: 2025,
    issue: "AIGC 可版权性",
    tech: ["AI文生图"],
    note_zh: "AI生成图片不构成作品",
    note_en: "AI-generated image held NOT to constitute a work",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/fHUYfWTIwSA0Juvh9YwiFw"
  },
  {
    province: "北京市",
    city: "北京互联网法院",
    image: "images/case-06.jpg",
    title_zh: "程某诉孙某AI恶搞肖像侵权案",
    title_en: "Cheng v. Sun (AI Portrait Parody)",
    caseNumber: "",
    year: 2025,
    issue: "AIGC 人格权保护",
    tech: ["AI视频"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/_adfEu-y7UOdyNaWr3lewQ"
  },
  {
    province: "北京市",
    city: "北京互联网法院",
    image: "images/case-07.jpg",
    title_zh: "李某某诉某文化传媒有限公司AI合成声音侵权案",
    title_en: "Li v. Media Co. (AI Voice Synthesis)",
    caseNumber: "",
    year: 2025,
    issue: "AIGC 人格权保护",
    tech: ["AI声音"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/Ekr9UNkBYOVffeQXxzweKQ"
  },
  {
    province: "北京市",
    city: "北京互联网法院",
    image: "images/case-08.jpg",
    title_zh: "聚为公司等诉孙某某等数字虚拟人著作权侵权案",
    title_en: "Juwei v. Sun et al. (Virtual Avatar Copyright)",
    caseNumber: "",
    year: 2025,
    issue: "AIGC 可版权性",
    tech: ["AI数字人"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/N7gmFingb4Jgyj8jkU64zQ"
  },
  {
    province: "北京市",
    city: "北京互联网法院",
    image: "images/case-09.jpg",
    title_zh: "唐某某诉某网络信息传播服务平台AI标识争议案",
    title_en: "Tang v. Platform (AI Content Labelling)",
    caseNumber: "",
    year: 2025,
    issue: "其他",
    tech: ["AI标识"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/XBCO8fYfynz5RDVWe6O30Q"
  },
  {
    province: "北京市",
    city: "北京互联网法院",
    image: "images/case-10.jpg",
    title_zh: "画师诉小红书Trik AI训练数据著作权侵权案",
    title_en: "Illustrator v. Xiaohongshu Trik (AI Training Data Copyright)",
    caseNumber: "",
    year: 2024,
    issue: "AIGC 相关著作权侵权",
    tech: ["AI训练"],
    note_zh: "",
    note_en: "",
    status: "pending",
    url: "https://mp.weixin.qq.com/s?__biz=MzU1NDk0NjE3MA==&mid=2247522164&idx=1&sn=7d9c3fd8ae894b6a59f354f3a181c75a&poc_token=HGOQBWqjEV52nmfNswsAWK0uOA4Gxt0oaR2qpeCI"
  },
  {
    province: "北京市",
    city: "北京互联网法院",
    image: "images/case-11.jpg",
    title_zh: "殷某诉某公司AI声音侵权案",
    title_en: "Yin v. Company (AI Voice Cloning)",
    caseNumber: "(2023)京0491民初12142号",
    year: 2023,
    issue: "AIGC 人格权保护",
    tech: ["AI声音"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/_GxGaG6Q2NYHJWQuOtMyrQ"
  },
  {
    province: "北京市",
    city: "北京互联网法院",
    image: "images/case-12.jpg",
    title_zh: "廖某及吴某诉某公司AI\"换脸\"侵权案",
    title_en: "Liao & Wu v. Company (AI Face Swap)",
    caseNumber: "(2023)京0491民初3821号",
    year: 2023,
    issue: "AIGC 人格权保护",
    tech: ["AI换脸"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/tSmtCARKjqg6mGHE70UDHw"
  },
  {
    province: "北京市",
    city: "北京互联网法院",
    image: "images/case-13.jpg",
    title_zh: "李某诉刘某\"春风送来了温柔\"AI文生图著作权侵权案",
    title_en: "Li v. Liu \"Spring Breeze\" (AI Text-to-Image Copyright)",
    caseNumber: "(2023)京0491民初11279号",
    year: 2023,
    issue: "AIGC 可版权性",
    tech: ["AI文生图"],
    note_zh: "AI 生成图片构成作品（中国首案）",
    note_en: "AI-generated image held to constitute a work (China's first ruling)",
    status: "decided",
    url: "https://mp.weixin.qq.com/s?__biz=MzAwNDE3MjA5NA==&mid=2677385275&idx=1&sn=a8ccdbb118604473d8fd198f82df7e30"
  },
  {
    province: "北京市",
    city: "北京互联网法院",
    image: "images/case-14.jpg",
    title_zh: "何某诉某公司\"AI陪伴\"人格权侵权案",
    title_en: "He v. Company (AI Companion Personality Rights)",
    caseNumber: "(2020)京0491民初9526号",
    year: 2020,
    issue: "AIGC 人格权保护",
    tech: ["AI陪伴"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://www.chinacourt.cn/article/detail/2022/04/id/6626182.shtml"
  },

  // ============= 北京知识产权法院 =============
  {
    province: "北京市",
    city: "北京知识产权法院",
    image: "images/case-15.jpg",
    title_zh: "抖音诉亿睿科AI大模型不正当竞争案",
    title_en: "Douyin v. Yiruike (LLM Unfair Competition)",
    caseNumber: "(2023)京73民终3802号",
    year: 2023,
    issue: "AIGC 相关著作权侵权",
    tech: ["AI大模型"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/0ryGs8-97p0sObhjwpl-jg"
  },
  {
    province: "北京市",
    city: "北京知识产权法院",
    image: "images/case-16.jpg",
    title_zh: "菲林律所诉百度AI生文著作权侵权案",
    title_en: "Feilin Law Firm v. Baidu (AI-Generated Text Copyright)",
    caseNumber: "(2019)京73民终2030号",
    year: 2019,
    issue: "AIGC 可版权性",
    tech: ["AI生文"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/tNqAA98sPTkRk8r5hkhClw"
  },

  // ============= 北京其他法院与仲裁委 =============
  {
    province: "北京市",
    city: "北京市劳动仲裁委",
    image: "images/case-17.jpg",
    title_zh: "刘某与某科技公司AI替代岗位劳动纠纷案",
    title_en: "Liu v. Tech Co. (AI Job Displacement)",
    caseNumber: "",
    year: 2025,
    issue: "其他",
    tech: ["AI替代"],
    note_zh: "AI 替代岗位的劳动法适用",
    note_en: "Labour-law treatment of AI-driven job displacement",
    status: "decided",
    url: "https://rsj.beijing.gov.cn/bm/ztzl/dxal/202512/t20251226_4366546.html"
  },
  {
    province: "北京市",
    city: "北京市通州区人民法院",
    image: "images/case-18.jpg",
    title_zh: "AI数字人主播合同纠纷案",
    title_en: "AI Virtual Anchor Contract Dispute",
    caseNumber: "",
    year: 2025,
    issue: "其他",
    tech: ["AI数字人"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/bl-DEY39oXu0eIBw913fVg"
  },
  {
    province: "北京市",
    city: "北京市通州区人民法院",
    image: "images/case-19.jpg",
    title_zh: "某律师援引AI编造案例",
    title_en: "Lawyer Sanctioned for Citing AI-Fabricated Cases",
    caseNumber: "(2024)京0112民初19067号",
    year: 2024,
    issue: "其他",
    tech: ["AI幻觉"],
    note_zh: "律师援引 AI 幻觉编造的判例",
    note_en: "Lawyer cited AI-hallucinated precedents",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/qfEx83W_Ru7FdnUsMvjpuA"
  },
  {
    province: "北京市",
    city: "北京市通州区人民法院",
    image: "images/case-20.jpg",
    title_zh: "AI图生图侵犯著作权刑事案件",
    title_en: "Criminal Case: Image-to-Image Copyright Infringement",
    caseNumber: "",
    year: 2025,
    issue: "AIGC 相关著作权侵权",
    tech: ["AI图生图"],
    note_zh: "首例 AI 图生图刑事案件",
    note_en: "First AI image-to-image criminal copyright case",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/1ci3IOL9rV63gE5flwIqNQ"
  },

  // ============= 上海 =============
  {
    province: "上海市",
    city: "上海市浦东新区人民法院",
    image: "images/case-21.jpg",
    title_zh: "君澜公司诉汉庭公司、百度公司AI客服商标权侵权案",
    title_en: "Junlan v. Hanting & Baidu (AI Chatbot Trade-mark)",
    caseNumber: "(2024)沪0115民初95826号",
    year: 2024,
    issue: "其他",
    tech: ["AI大模型"],
    note_zh: "AI 客服回复涉商标权侵权",
    note_en: "Trade-mark infringement via AI chatbot responses",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/vmeHtHaMKv1HZLJ97U0U6Q"
  },
  {
    province: "上海市",
    city: "上海市黄浦区人民法院",
    image: "images/case-22.jpg",
    title_zh: "成都绘素文化传播有限公司诉朱某、盛某AI提示词著作权侵权案",
    title_en: "Huisu v. Zhu & Sheng (AI Prompt Copyright)",
    caseNumber: "(2025)沪0101民初14775号",
    year: 2025,
    issue: "AIGC 可版权性",
    tech: ["AI提示词"],
    note_zh: "简单 AI 提示词不构成作品",
    note_en: "Simple AI prompts do NOT constitute a work",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/fBMndcZlcyIyVk-HK3KvJA"
  },
  {
    province: "上海市",
    city: "上海市金山区人民法院",
    image: "images/case-23.jpg",
    title_zh: "阅文集团诉LiblibAI平台\"美杜莎\"著作权侵权案（一审）",
    title_en: "China Literature v. LiblibAI \"Medusa\" — First Instance (Copyright)",
    caseNumber: "(2025)沪0116民初2354号",
    year: 2025,
    issue: "AIGC 相关著作权侵权",
    tech: ["AI图生图"],
    note_zh: "上诉至上海知识产权法院，二审已审结（详见上海知识产权法院\"美杜莎案\"二审条目）",
    note_en: "Appealed to Shanghai Intellectual Property Court; appellate judgment rendered (see the appellate entry under Shanghai IP Court)",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/Plae0snaOEsqqmodLU9j4g"
  },
  {
    province: "上海市",
    city: "上海市徐汇区人民法院",
    image: "images/case-24.jpg",
    title_zh: "爱奇艺诉MiniMax海螺AI模型训练及内容生成著作权侵权案",
    title_en: "iQiyi v. MiniMax Hailuo (AI Training & Output Copyright)",
    caseNumber: "",
    year: 2025,
    issue: "AIGC 相关著作权侵权",
    tech: ["AI训练"],
    note_zh: "",
    note_en: "",
    status: "pending",
    url: "https://www.cls.cn/detail/1909890"
  },
  {
    province: "上海市",
    city: "上海市嘉定区人民法院",
    image: "images/case-25.jpg",
    title_zh: "陈某诉上海易某网络科技公司AI\"换脸\"著作权权属侵权案",
    title_en: "Chen v. Shanghai Yi Tech (AI Face-Swap on Existing Work — Copyright)",
    caseNumber: "(2024)沪0114民初1326号",
    year: 2024,
    issue: "AIGC 可版权性",
    tech: ["AI换脸"],
    note_zh: "利用AI\"换脸\"对他人作品局部合成处理是否构成著作权侵权",
    note_en: "Whether AI face-swap that partially composites another's work constitutes copyright infringement",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/XTF-E9hvIOmEXVMmTcaWAQ"
  },

  // ============= 河北 =============
  {
    province: "河北省",
    city: "秦皇岛市山海关区人民法院",
    image: "images/case-26.jpg",
    title_zh: "于某诉某公司AI文生图著作权侵权案",
    title_en: "Yu v. Company (AI Text-to-Image Copyright)",
    caseNumber: "",
    year: 2025,
    issue: "AIGC 可版权性",
    tech: ["AI文生图"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/Mv8IP5wv4oGX6RDtJEEjcg"
  },

  // ============= 江西 =============
  {
    province: "江西省",
    city: "鹰潭市月湖区人民法院",
    image: "images/case-27.jpg",
    title_zh: "崔某诉某公司AI文生图著作权侵权案",
    title_en: "Cui v. Company (AI Text-to-Image Copyright)",
    caseNumber: "(2025)赣0602知民初47号",
    year: 2025,
    issue: "AIGC 可版权性",
    tech: ["AI文生图"],
    note_zh: "AI 生成图片不构成作品",
    note_en: "AI-generated image held NOT to constitute a work",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/vvOb8Xeh4q8kaw7q1ZfYjA"
  },

  // ============= 浙江 =============
  {
    province: "浙江省",
    city: "杭州互联网法院",
    image: "images/case-28.jpg",
    title_zh: "杭州市人民检察院诉胡某AI伪造活体认证视频侵犯个人信息权益民事公益诉讼案",
    title_en: "Hangzhou Procuratorate v. Hu (Deepfake Identity Verification, Public-Interest Action)",
    caseNumber: "",
    year: 2026,
    issue: "AIGC 人格权保护",
    tech: ["AI伪造", "AI视频"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/-GrZD4Bp0SB9P3Hcx60tsw"
  },
  {
    province: "浙江省",
    city: "杭州互联网法院",
    image: "images/case-29.jpg",
    title_zh: "梁某诉某科技公司生成式人工智能\"幻觉\"侵权案",
    title_en: "Liang v. Tech Co. (GenAI Hallucination)",
    caseNumber: "",
    year: 2025,
    issue: "AI 幻觉责任",
    tech: ["AI幻觉"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/riMkHOiBhDra1xe70wQcRA"
  },
  {
    province: "浙江省",
    city: "杭州市中级人民法院",
    image: "images/case-30.jpg",
    title_zh: "行吟公司诉合肥名某公司AI文案仿写不正当竞争案",
    title_en: "Xingyin v. Hefei Co. (AI Copy Imitation, Unfair Competition)",
    caseNumber: "(2025)浙01民终3998号",
    year: 2025,
    issue: "其他",
    tech: ["AI文案"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/3jerp4isZZZU1cjcIjoobg"
  },
  {
    province: "浙江省",
    city: "杭州市滨江区人民法院",
    image: "images/case-31.jpg",
    title_zh: "阿里巴巴诉李某AI生成文章不正当竞争纠纷案",
    title_en: "Alibaba v. Li (AI-Generated Article Unfair Competition)",
    caseNumber: "(2024)浙0108民初10311号",
    year: 2024,
    issue: "其他",
    tech: ["AI生文"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/eFsFQgp798CKQNNy4zBOYg"
  },
  {
    province: "浙江省",
    city: "杭州市中级人民法院",
    image: "images/case-32.jpg",
    title_zh: "上海新创华诉杭州水母AI平台\"奥特曼\"著作权侵权案",
    title_en: "Xinchuanghua v. Hangzhou Shuimu \"Ultraman\" (AI Platform Copyright)",
    caseNumber: "(2024)浙01民终10332号",
    year: 2024,
    issue: "AIGC 相关著作权侵权",
    tech: ["AI图生图"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/ADNBb7MDyIuLrd_guaayxQ"
  },
  {
    province: "浙江省",
    city: "杭州市中级人民法院",
    image: "images/case-33.jpg",
    title_zh: "杭州四海诉上海魔珐涉虚拟数字人侵权案",
    title_en: "Hangzhou Sihai v. Shanghai Mofa (Virtual Avatar Infringement)",
    caseNumber: "(2023)浙01民终4722号",
    year: 2023,
    issue: "AIGC 可版权性",
    tech: ["AI数字人"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/eTAb1LmSyF8H0suxPlE9ZA"
  },

  // ============= 重庆 =============
  {
    province: "重庆市",
    city: "重庆市渝中区人民法院",
    image: "images/case-34.jpg",
    title_zh: "广东原创动力文化公司诉重庆某公司AI生成音频侵权案",
    title_en: "Original Force v. Chongqing Co. (AI-Generated Audio Copyright)",
    caseNumber: "(2025)渝0103民初748号",
    year: 2025,
    issue: "AIGC 相关著作权侵权",
    tech: ["AI音频"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/gwY29Ca_sBco2o1P0K98Rw"
  },

  // ============= 江苏 =============
  // 注：扬州中院"万某诉江苏扬州某公司AI玩偶设计图案"原本在此处有一个占位条目（案号缺失、
  // 年份 2026 误标），与下方 5 月新增的完整版重复，已删除（同案不要重复登记）。
  {
    province: "江苏省",
    city: "无锡市中级人民法院",
    image: "images/case-36.jpg",
    title_zh: "无锡AI引流不正当竞争案",
    title_en: "Wuxi AI Traffic-Diversion Unfair Competition",
    caseNumber: "",
    year: 2025,
    issue: "其他",
    tech: ["AI引流"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/FqRrq1DielKhOJgTXUrw_w"
  },
  {
    province: "江苏省",
    city: "张家港市人民法院",
    image: "images/case-37.jpg",
    title_zh: "丰某诉东山公司AI文生图著作权侵权案",
    title_en: "Feng v. Dongshan Co. (AI Text-to-Image Copyright)",
    caseNumber: "(2024)苏0582民初9015号",
    year: 2024,
    issue: "AIGC 可版权性",
    tech: ["AI文生图"],
    note_zh: "AI 生成图片不构成作品",
    note_en: "AI-generated image held NOT to constitute a work",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/CwFl3luPKqDbpO3iT8ScWw"
  },
  {
    province: "江苏省",
    city: "常熟市人民法院",
    image: "images/case-38.jpg",
    title_zh: "林某诉某公司AI文生图著作权侵权案",
    title_en: "Lin v. Company (AI Text-to-Image Copyright)",
    caseNumber: "(2024)苏0581民初6697号",
    year: 2024,
    issue: "AIGC 可版权性",
    tech: ["AI文生图"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/SmVaxXLKXwNvW_rn3YMrLw"
  },

  // ============= 广西 =============
  {
    province: "广西壮族自治区",
    city: "桂林市叠彩区人民法院",
    image: "images/case-39.jpg",
    title_zh: "桂林AI文生图著作权侵权案",
    title_en: "Guilin AI Text-to-Image Copyright Case",
    caseNumber: "",
    year: 2025,
    issue: "AIGC 可版权性",
    tech: ["AI文生图"],
    note_zh: "AI 生成图片不构成作品",
    note_en: "AI-generated image held NOT to constitute a work",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/NiOsQNPqbrU-9shiBbnu8g"
  },

  // ============= 广东 =============
  {
    province: "广东省",
    city: "广州互联网法院",
    image: "images/case-40.jpg",
    title_zh: "某公司诉曹某AI生成文章传播侵权信息案",
    title_en: "Company v. Cao (AI-Generated Infringing Article)",
    caseNumber: "",
    year: 2026,
    issue: "其他",
    tech: ["AI生文"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/6QX7TgmYleBTanbmQQ2kAQ"
  },
  {
    province: "广东省",
    city: "广州市中级人民法院",
    image: "images/case-41.jpg",
    title_zh: "钟某诉某服装公司AI生成图片消费欺诈案",
    title_en: "Zhong v. Apparel Co. (AI Image Consumer Fraud)",
    caseNumber: "",
    year: 2026,
    issue: "其他",
    tech: ["AI文生图"],
    note_zh: "AI 生成图片用于销售构成欺诈",
    note_en: "Use of AI image in sales held to be consumer fraud",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/P09d1Oovb3Ov8iMQ0oKhmA"
  },
  {
    province: "广东省",
    city: "深圳市南山区人民法院",
    image: "images/case-42.jpg",
    title_zh: "雪球公司诉深圳航宇公司AI爬取数据不正当竞争案",
    title_en: "Xueqiu v. Hangyu (AI Web-Scraping Unfair Competition)",
    caseNumber: "(2023)粤03民初6844号",
    year: 2023,
    issue: "AIGC 相关著作权侵权",
    tech: ["AI爬取"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/R7s8UEZR560ZL_BE1ch4oQ"
  },
  {
    province: "广东省",
    city: "广州互联网法院",
    image: "images/case-43.jpg",
    title_zh: "张某诉某公司AI\"换脸\"侵权案",
    title_en: "Zhang v. Company (AI Face Swap)",
    caseNumber: "",
    year: 2024,
    issue: "AIGC 人格权保护",
    tech: ["AI换脸"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/fHUn-Xb-N4P85p2Yu5t7zw"
  },
  {
    province: "广东省",
    city: "广州互联网法院",
    image: "images/case-44.jpg",
    title_zh: "上海新创华诉广州年光AI平台\"奥特曼\"著作权侵权案",
    title_en: "Xinchuanghua v. Guangzhou Nianguang \"Ultraman\" (AI Platform Copyright)",
    caseNumber: "(2024)粤0192民初113号",
    year: 2024,
    issue: "AIGC 相关著作权侵权",
    tech: ["AI图生图"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/3v9K8B78ryVl0qaRDMV6Rg"
  },
  {
    province: "广东省",
    city: "深圳市南山区人民法院",
    image: "images/case-45.jpg",
    title_zh: "腾讯诉盈讯\"Dreamwriter\"AI生文侵权案",
    title_en: "Tencent v. Yingxun \"Dreamwriter\" (AI-Generated Text Copyright)",
    caseNumber: "(2019)粤0305民初14010号",
    year: 2019,
    issue: "AIGC 可版权性",
    tech: ["AI生文"],
    note_zh: "AI 生成文章构成作品",
    note_en: "AI-generated article held to constitute a work",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/km9ncrUE6Ui-KnFLu3XINA"
  },

  // ============= 湖南 =============
  {
    province: "湖南省",
    city: "长沙市中级人民法院",
    image: "images/case-46.jpg",
    title_zh: "腾讯诉百度AI剪辑\"庆余年\"著作权侵权案",
    title_en: "Tencent v. Baidu \"Joy of Life\" (AI Video-Editing Copyright)",
    caseNumber: "(2024)湘01民终18114号",
    year: 2024,
    issue: "AIGC 相关著作权侵权",
    tech: ["AI剪辑"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/YEv7DXVJgRfuGeV1CGwUow"
  },

  // ============= 四川 =============
  {
    province: "四川省",
    city: "成都铁路运输第一法院",
    image: "images/case-47.jpg",
    title_zh: "孙某诉成都某餐饮公司AI视频侵犯人格权案",
    title_en: "Sun v. Chengdu Restaurant Co. (AI Video Personality Rights)",
    caseNumber: "",
    year: 2026,
    issue: "AIGC 人格权保护",
    tech: ["AI视频"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://www.rmfyb.com/content/202602/24/article_1013811_1391663331_6496771.html"
  },
  {
    province: "四川省",
    city: "成都市中级人民法院",
    image: "images/case-48.jpg",
    title_zh: "曹某诉某旅游学院AI文生图著作权侵权案",
    title_en: "Cao v. Tourism Institute (AI Text-to-Image Copyright)",
    caseNumber: "",
    year: 2025,
    issue: "AIGC 可版权性",
    tech: ["AI文生图"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/9c7Rmuy7TpGjlPWHIsmrFQ"
  },
  {
    province: "四川省",
    city: "成都互联网法庭",
    image: "images/case-49.jpg",
    title_zh: "某配音员诉声入人心公司AI声音侵权案",
    title_en: "Voice Actor v. Shengrurenxin Co. (AI Voice Cloning)",
    caseNumber: "(2024)川7101民初8969号",
    year: 2024,
    issue: "AIGC 人格权保护",
    tech: ["AI声音"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/TYDNIXzVzBwyCD0iJngIdQ"
  },

  // ============= 湖北 =============
  {
    province: "湖北省",
    city: "武汉东湖新技术开发区人民法院",
    image: "images/case-50.jpg",
    title_zh: "王某诉某公司AI文生图著作权侵权案",
    title_en: "Wang v. Company (AI Text-to-Image Copyright)",
    caseNumber: "(2024)鄂0192知民初968号",
    year: 2024,
    issue: "AIGC 可版权性",
    tech: ["AI文生图"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/XGS-JDGXgVqsw9oXPhpoaA"
  },
  {
    province: "湖北省",
    city: "大悟县人民法院",
    image: "images/case-51.jpg",
    title_zh: "诉讼原告李某提交AI生成图片作为证据的处理案例",
    title_en: "Li (Treatment of AI-Generated Image as Evidence)",
    caseNumber: "(2025)鄂0922民初4170号",
    year: 2025,
    issue: "其他",
    tech: ["AI文生图"],
    note_zh: "AI 生成图片作为证据的认定规则",
    note_en: "Evidentiary treatment of AI-generated images",
    status: "decided",
    url: "https://xgzy.hbfy.gov.cn/DocManage/ViewDoc?docId=16872b78-1b18-45e4-b3d2-1a10bd2391de"
  },

  // ============= 新疆 =============
  {
    province: "新疆维吾尔自治区",
    city: "乌鲁木齐市天山区人民法院",
    image: "images/case-52.jpg",
    title_zh: "胡某诉新疆某单位AI文生图著作权侵权案",
    title_en: "Hu v. Xinjiang Entity (AI Text-to-Image Copyright)",
    caseNumber: "",
    year: 2025,
    issue: "AIGC 可版权性",
    tech: ["AI文生图"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/_R8QXwwwBElNxinp1Je-4w"
  },

  // ============= 内蒙古 =============
  {
    province: "内蒙古自治区",
    city: "呼和浩特市新城区人民法院",
    image: "images/case-53.jpg",
    title_zh: "\"虚拟数字人\"演唱会著作权侵权案",
    title_en: "Virtual Avatar Concert Copyright Case",
    caseNumber: "",
    year: 2025,
    issue: "AIGC 可版权性",
    tech: ["AI数字人"],
    note_zh: "",
    note_en: "",
    status: "decided",
    url: "http://hsxcfy.nmgfy.gov.cn/article/detail/2025/09/id/8984109.shtml"
  },

  // ============= 5 月新增案例（2025 年 5 月） =============
  // 数据来源：5月新增案例带图.docx（团队内部整理）

  // ----- 江苏 -----
  {
    province: "江苏省",
    city: "扬州市中级人民法院",
    image: "images/case-yangzhou-doll.png",
    title_zh: "万某诉江苏扬州某公司AI玩偶设计图著作权侵权案",
    title_en: "Wan v. Yangzhou Co. (AI-Generated Doll Design Copyright)",
    caseNumber: "(2025)苏10民终2904号",
    year: 2025,
    issue: "AIGC 可版权性",
    tech: ["AI文生图"],
    note_zh: "使用AI生成玩偶设计图是否构成作品",
    note_en: "Whether an AI-generated doll design constitutes a copyrightable work",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/FnjSQlO_zAl5qJhpciPiDg"
  },
  {
    province: "江苏省",
    city: "无锡市中级人民法院",
    image: "images/case-wuxi-ai-reviews.png",
    title_zh: "辛某公司诉帆某公司AI批量生成测评文章不正当竞争案",
    title_en: "Xin Co. v. Fan Co. (Mass AI-Generated Reviews — Unfair Competition)",
    caseNumber: "",
    year: 2025,
    issue: "其他",
    tech: ["AI生文", "AI文案"],
    note_zh: "利用AI批量生成测评文章是否构成不正当竞争",
    note_en: "Whether mass-producing review articles via AI constitutes unfair competition",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/9WffzpKzRBmXu8n9knX-Ig"
  },
  {
    province: "江苏省",
    city: "南京市中级人民法院",
    image: "images/case-nanjing-llm-trademark.jpeg",
    title_zh: "某云计算公司诉某电子商务公司知名大模型商标侵权及不正当竞争案",
    title_en: "Cloud Co. v. E-Commerce Co. (Well-Known LLM Trademark Infringement & Unfair Competition)",
    caseNumber: "(2025)苏01民初1208号",
    year: 2025,
    issue: "其他",
    tech: ["AI大模型"],
    note_zh: "擅自使用知名大模型商标及近似标识是否构成商标侵权",
    note_en: "Whether unauthorised use of a well-known LLM trademark and similar marks constitutes infringement",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/XlvFDo0VWcx5k3TvkBz-zw"
  },
  {
    province: "江苏省",
    city: "镇江市中级人民法院",
    image: "images/case-zhenjiang-ai-image-original.jpeg",
    title_zh: "杨某某、明某公司诉被告AI生成图片独创性著作权侵权案",
    title_en: "Yang & Ming Co. v. Defendant (Originality of AI-Generated Image)",
    caseNumber: "",
    year: 2025,
    issue: "AIGC 可版权性",
    tech: ["AI文生图"],
    note_zh: "AI生成图片能体现作者独创性智力投入时能否构成作品",
    note_en: "Whether AI-generated images embodying the author's original intellectual input qualify as copyrightable works",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/A71FHERXB7syxDDZ-M3SCw"
  },

  // ----- 上海 -----
  {
    province: "上海市",
    city: "上海市徐汇区人民法院",
    image: "images/case-xuhui-pirated-search.jpeg",
    title_zh: "佳某公司诉秘某公司AI搜索盗版链接信息网络传播权侵权案",
    title_en: "Jia Co. v. Mi Co. (AI Search Platform — Pirated Streaming Links)",
    caseNumber: "",
    year: 2025,
    issue: "AIGC 相关著作权侵权",
    tech: ["AI生文"],
    note_zh: "AI搜索平台提供盗版影视下载链接是否侵害信息网络传播权",
    note_en: "Whether an AI search platform providing pirated movie download links infringes the right of communication",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/ZD6ZF7tEKGk_dJX-q74o4A"
  },
  {
    province: "上海市",
    city: "上海市青浦区人民法院",
    image: "images/case-qingpu-fake-evidence.png",
    title_zh: "山东速迈数控诉震坤行（上海）商标权属、侵权纠纷案——人为诱导AI虚假取证",
    title_en: "Shandong Sumai CNC v. Zhenkunhang (Inducing False AI Evidence)",
    caseNumber: "(2025)沪0118民初22645号",
    year: 2025,
    issue: "其他",
    tech: ["AI幻觉"],
    note_zh: "人为诱导AI系统生成虚假取证是否构成权利滥用",
    note_en: "Whether inducing an AI system to generate false evidence constitutes abuse of rights",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/ZMs8rFfeROpyVF-jJ2fiYQ"
  },

  // ----- 浙江 -----
  {
    province: "浙江省",
    city: "杭州互联网法院",
    image: "images/case-hangzhou-multi-cast.png",
    title_zh: "某科技公司诉某信息集团AI辅助\"一人多播\"不正当竞争案",
    title_en: "Tech Co. v. Media Group (AI-Assisted Multi-Streaming — Unfair Competition)",
    caseNumber: "",
    year: 2025,
    issue: "其他",
    tech: ["AI视频", "AI数字人"],
    note_zh: "使用AI辅助\"一人多播\"是否构成不正当竞争",
    note_en: "Whether AI-assisted \"one-person multi-cast\" constitutes unfair competition",
    status: "pending",
    url: "https://mp.weixin.qq.com/s/x3Xni_TNX73LrUUMalI_Ng"
  },
  {
    province: "浙江省",
    city: "杭州市中级人民法院",
    image: "images/case-hangzhou-traffic-hijack.jpeg",
    title_zh: "某智能体公司诉某输入法开发公司AI智能体\"流量劫持\"不正当竞争案",
    title_en: "AI Agent Co. v. IME Developer (AI Agent Traffic Hijacking — Unfair Competition)",
    caseNumber: "",
    year: 2025,
    issue: "其他",
    tech: ["AI引流", "AI大模型"],
    note_zh: "AI智能体\"流量劫持\"是否构成不正当竞争",
    note_en: "Whether AI agent traffic hijacking constitutes unfair competition",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/83z3xr1i1kwSXykhBTJT_A"
  },
  {
    province: "浙江省",
    city: "杭州互联网法院",
    image: "images/case-hangzhou-internet-t2i.jpeg",
    title_zh: "孙某某诉杭州某农业公司AI\"文生图\"信息网络传播权案",
    title_en: "Sun v. Hangzhou Agri Co. (AI Text-to-Image Communication Right)",
    caseNumber: "",
    year: 2025,
    issue: "AIGC 可版权性",
    tech: ["AI文生图"],
    note_zh: "利用AI\"文生图\"功能生成图片是否构成作品",
    note_en: "Whether AI text-to-image generated images constitute copyrightable works",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/GKnSsCA3AWHHNCFfyAuPVA"
  },
  {
    province: "浙江省",
    city: "杭州互联网法院",
    image: "images/case-hangzhou-internet-virtual-host.jpeg",
    title_zh: "上海新创华公司诉杭州某文化传媒公司虚拟数字主播变装特效著作权侵权案",
    title_en: "Shanghai Xinchuanghua v. Hangzhou Media (Virtual Digital Host Costume FX Copyright)",
    caseNumber: "",
    year: 2025,
    issue: "AIGC 可版权性",
    tech: ["AI数字人", "AI视频"],
    note_zh: "虚拟数字主播在变装特效中使用他人作品是否构成著作权侵权",
    note_en: "Whether a virtual digital host's use of others' works in costume effects constitutes copyright infringement",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/GKnSsCA3AWHHNCFfyAuPVA"
  },
  {
    province: "浙江省",
    city: "杭州市中级人民法院",
    image: "images/case-hangzhou-layoff.jpeg",
    title_zh: "某网讯科技公司与周某AI冲击降薪调岗解除劳动合同争议案",
    title_en: "Tech Co. v. Zhou (AI-Driven Pay Cut, Reassignment & Termination Dispute)",
    caseNumber: "",
    year: 2025,
    issue: "其他",
    tech: ["AI替代"],
    note_zh: "企业因AI冲击对劳动者降薪调岗并解除劳动合同是否构成违法解除",
    note_en: "Whether an employer's AI-driven pay cut, reassignment and termination constitute wrongful dismissal",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/2Mmmy4j5O8kXQlnNpqzPmg"
  },

  // ----- 广东 -----
  {
    province: "广东省",
    city: "广州知识产权法院",
    image: "images/case-guangzhou-ipc-avatar-secret.jpeg",
    title_zh: "赛某公司诉德某科技公司等\"虚拟数字人\"技术秘密侵权案",
    title_en: "Sai Co. v. De Tech et al. (Virtual Avatar Trade Secret)",
    caseNumber: "",
    year: 2025,
    issue: "其他",
    tech: ["AI数字人"],
    note_zh: "\"虚拟数字人\"技术秘密保护",
    note_en: "Trade secret protection of virtual avatar technology",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/SQZHJrnm5zjHppVLNrneEA"
  },
  {
    province: "广东省",
    city: "广州互联网法院",
    image: "images/case-guangzhou-internet-ai-image.jpeg",
    title_zh: "李某诉某幼儿园、张某诉某学校疑似AI生成图片著作权侵权案",
    title_en: "Li v. Kindergarten & Zhang v. School (Suspected AI-Generated Image Copyright)",
    caseNumber: "",
    year: 2025,
    issue: "AIGC 可版权性",
    tech: ["AI文生图"],
    note_zh: "疑似AI生成图片是否构成作品",
    note_en: "Whether suspected AI-generated pictures constitute copyrightable works",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/tdD2heuPpO9kgDk5uX56_Q"
  },
  {
    province: "广东省",
    city: "广州互联网法院",
    image: "images/case-guangzhou-internet-bot-automation.jpeg",
    title_zh: "某科技公司诉某科技有限公司AI智能体自动化操作网络不正当竞争案",
    title_en: "Tech Co. v. Tech Ltd. (AI Agent Automated Operations — Unfair Competition)",
    caseNumber: "",
    year: 2025,
    issue: "其他",
    tech: ["AI大模型", "AI爬取"],
    note_zh: "AI智能体对网络平台实施自动化操作是否构成不正当竞争",
    note_en: "Whether AI agent's automated operations on online platforms constitute unfair competition",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/HDZONqPeNl5neUm6wyWeZA"
  },

  // ----- 四川 -----
  {
    province: "四川省",
    city: "四川自由贸易试验区人民法院",
    image: "images/case-sichuan-ftz-ai-video.jpeg",
    title_zh: "深圳某文化传媒公司诉成都某科技公司人机协同AI视频信息网络传播权案",
    title_en: "Shenzhen Media Co. v. Chengdu Tech Co. (Human-AI Collaborative Video Copyright)",
    caseNumber: "(2025)川0193民初16756号",
    year: 2025,
    issue: "AIGC 可版权性",
    tech: ["AI视频"],
    note_zh: "人机协同创作的AI生成视频是否构成作品",
    note_en: "Whether a human-AI collaboratively generated video constitutes a copyrightable work",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/-L8KeK3p3x80Y5r5KJ_2wA"
  },

  // ============= 2026 年新增（二审 / 专门法院判决） =============
  {
    province: "上海市",
    city: "上海知识产权法院",
    image: "images/case-23.jpg",
    title_zh: "阅文集团诉LiblibAI平台\"美杜莎\"著作权侵权案（二审）",
    title_en: "China Literature v. LiblibAI \"Medusa\" — Appeal (Copyright)",
    caseNumber: "",
    year: 2026,
    issue: "AIGC 相关著作权侵权",
    tech: ["AI图生图"],
    note_zh: "2026 年 4 月 29 日宣判；与金山区人民法院一审同案的二审结果",
    note_en: "Appellate judgment rendered on 29 April 2026; appeal of the first-instance Jinshan District judgment",
    status: "decided",
    url: "https://mp.weixin.qq.com/s/SPhQx1BSYRl0lITvgiaGng"
  }
];
