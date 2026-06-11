// ===================================================================
// 中国 AI 司法实践案例图 · 主程序 (v5)
// 编辑说明：一般不需改此文件
// v5 更新（在 v4 基础上）：
//   1. 删除地图图例（has-cases 单色块没有代表性）
//   2. 配色改为浅色 14 色（北京暖珊瑚 vs 河北淡青对比明显）
//   3. 搜索框新增可点击的 [搜索/Search] 按钮 + AI 风格 sparkle 装饰
//   4. EN eyebrow 删 'Digital Economy & AI'，中英姓名统一为 Seagull Song
//   5. COLUMN_ARTICLES 替换为 26 篇真实文章；专栏列表新增分类徽章
//   6. 页脚新增律师名片：头像 + 联系方式 + 二维码
// v4 更新：
//   1. 地图配色改为"每个有案件的省份独立一色"（PROVINCE_COLORS）
//   2. 案号在 EN 模式下转写为拼音/罗马字
//      例：(2024)京0491民初19067号 → (2024) Jing 0491 Min Chu No. 19067
//   3. 搜索框真正可用：任何视图下打字都触发跨全国扁平搜索结果列表
// v3 更新：
//   1. 案件卡左侧增加"头像位"——有 image 字段时显示图片，否则显示占位
//   2. 中英切换完全干净——选定语言后不再混入另一种语言
//   3. 第四个统计变成"宋律师专栏"入口，点开弹窗显示文章列表
// ===================================================================

// ---- 状态 ----
const state = {
  view: 'overview',          // 'overview' | 'province' | 'court'
  selectedProvince: null,
  selectedCourt: null,
  lang: 'zh',
  filterYear: 'all',
  filterIssue: new Set(),
  filterTech: new Set(),
  searchText: ''
};

// ---- 工具函数 ----

// 当前语言
function L() { return state.lang; }

// 获取省份在地图上的可见案件数（北京特殊：含最高法）
function getProvinceMapCount(provinceName) {
  if (provinceName === '北京市') {
    return CASES.filter(c => c.province === '北京市' || c.province === '中华人民共和国最高人民法院').length;
  }
  return CASES.filter(c => c.province === provinceName).length;
}

// 获取省份下的所有案件（北京特殊：含最高法）
function getCasesInProvince(provinceName) {
  if (provinceName === '北京市') {
    return CASES.filter(c => c.province === '北京市' || c.province === '中华人民共和国最高人民法院');
  }
  return CASES.filter(c => c.province === provinceName);
}

// 获取省份下的法院列表（按案件数排序）
function getCourtsInProvince(provinceName) {
  const cases = getCasesInProvince(provinceName);
  const grouped = {};
  cases.forEach(c => {
    const key = c.city || c.province;
    if (!grouped[key]) grouped[key] = { name: key, cases: [], special: c.province === '中华人民共和国最高人民法院' };
    grouped[key].cases.push(c);
  });
  return Object.values(grouped).sort((a, b) => {
    if (a.special) return -1;  // 最高法置顶
    if (b.special) return 1;
    return b.cases.length - a.cases.length;
  });
}

// 当前是否启用了 tag 类筛选（年份 / 争议焦点 / AI 技术）
// 用来判断 overview 是否要切到"扁平列表"模式（否则点 chip 没反馈）
function hasActiveTagFilter() {
  return state.filterYear !== 'all'
    || state.filterIssue.size > 0
    || state.filterTech.size > 0;
}

// 应用筛选
function applyFilters(pool) {
  if (state.filterYear !== 'all') {
    pool = pool.filter(c => String(c.year) === state.filterYear);
  }
  if (state.filterIssue.size > 0) {
    pool = pool.filter(c => state.filterIssue.has(c.issue));
  }
  if (state.filterTech.size > 0) {
    pool = pool.filter(c => c.tech.some(t => state.filterTech.has(t)));
  }
  if (state.searchText.trim()) {
    const q = state.searchText.trim().toLowerCase();
    pool = pool.filter(c => {
      // tag 关联词：tech 和 issue 的中文 key + 英文翻译都要参与匹配
      // 这样搜 "AI陪伴" / "AI Companion" / "AIGC 可版权性" / "AIGC Copyrightability" 都能命中
      const issueZh = (c.issue || '').toLowerCase();
      const issueEn = (ISSUE_I18N[c.issue] || '').toLowerCase();
      const techMatch = (c.tech || []).some(t =>
        t.toLowerCase().includes(q) ||
        (TECH_I18N[t] || '').toLowerCase().includes(q)
      );
      return (
        c.title_zh.toLowerCase().includes(q) ||
        (c.title_en || '').toLowerCase().includes(q) ||
        (c.caseNumber || '').toLowerCase().includes(q) ||
        caseNumberDisplay(c.caseNumber || '').toLowerCase().includes(q) ||  // EN 模式下转写后的案号也参与匹配
        (c.city || '').toLowerCase().includes(q) ||
        (c.province || '').toLowerCase().includes(q) ||
        provinceName(c.province || '').toLowerCase().includes(q) ||
        courtName(c.city || c.province || '').toLowerCase().includes(q) ||
        issueZh.includes(q) ||
        issueEn.includes(q) ||
        techMatch
      );
    });
  }
  return pool;
}

// 取最终展示案件列表
// 搜索模式 或 overview + tag 筛选模式 ⇒ 跨全国扁平列表，不受当前选中省/法院限制
function getDisplayCases() {
  let pool;
  const isSearching = state.searchText.trim().length > 0;
  const isOverviewFiltered = state.view === 'overview' && hasActiveTagFilter();
  if (isSearching || isOverviewFiltered) {
    pool = [...CASES];
  } else if (state.view === 'court' && state.selectedCourt) {
    pool = getCasesInProvince(state.selectedProvince).filter(c =>
      (c.city || c.province) === state.selectedCourt
    );
  } else if (state.view === 'province' && state.selectedProvince) {
    pool = getCasesInProvince(state.selectedProvince);
  } else {
    pool = [...CASES];
  }
  pool = applyFilters(pool);
  return pool.sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return (a.title_zh || '').localeCompare(b.title_zh || '', 'zh');
  });
}

// 名称翻译
function provinceName(zhName) {
  const entry = PROVINCE_I18N[zhName];
  if (!entry) return zhName;
  return L() === 'en' ? entry.en : entry.zh;
}
function courtName(zhName) {
  if (!zhName) return '';
  if (L() === 'en') return COURT_I18N[zhName] || zhName;
  return zhName;
}
function issueName(zh) {
  if (L() === 'en') return ISSUE_I18N[zh] || zh;
  return zh;
}
function techName(zh) {
  if (L() === 'en') return TECH_I18N[zh] || zh;
  return zh;
}

// ============================================================
// 案号显示（中文模式原样；英文模式按 COURT_CODE_I18N + CASE_TYPE_I18N 转拼音/罗马字）
// 例：(2024)京0491民初19067号  →  (2024) Jing 0491 Min Chu No. 19067
// ============================================================
function caseNumberDisplay(zhCaseNum) {
  if (!zhCaseNum) return '';
  if (L() !== 'en') return zhCaseNum;

  let s = String(zhCaseNum).trim();

  // 1) 去掉末尾的"号"（之后会在最后一段数字前加 "No. "）
  s = s.replace(/号\s*$/, '');

  // 2) 替换法院代字（按长度倒序，避免"最高法"被"高"截断之类）
  Object.keys(COURT_CODE_I18N)
    .sort((a, b) => b.length - a.length)
    .forEach(zh => {
      // 在两侧加空格，便于后续清理
      s = s.split(zh).join(' ' + COURT_CODE_I18N[zh] + ' ');
    });

  // 3) 替换审判程序代字（同样按长度倒序，3 字组合先于 2 字）
  Object.keys(CASE_TYPE_I18N)
    .sort((a, b) => b.length - a.length)
    .forEach(zh => {
      s = s.split(zh).join(' ' + CASE_TYPE_I18N[zh] + ' ');
    });

  // 4) 在末尾的数字串前加 "No. "
  s = s.replace(/(\D)(\d+)\s*$/, '$1No. $2');

  // 5) 在 ")" 后保证一个空格
  s = s.replace(/\)\s*/g, ') ');

  // 6) 合并多余空格
  s = s.replace(/\s+/g, ' ').trim();

  return s;
}

// 案件标题（按语言）
function caseTitle(c) {
  if (L() === 'en' && c.title_en) return c.title_en;
  return c.title_zh;
}
// 案件裁判要旨（按语言）
function caseNote(c) {
  if (L() === 'en' && c.note_en) return c.note_en;
  if (L() === 'zh') return c.note_zh || '';
  // 英文模式但没有英文备注 → 不显示中文，保持干净
  return c.note_en || '';
}

// 案件头像 / 占位
function caseImageHTML(c) {
  if (c.image && c.image.trim()) {
    return `<img class="case-headshot-img" src="${c.image}" alt="" loading="lazy" />`;
  }
  // 占位：用案件中文标题首字 + 争议焦点配色
  const titleChar = (c.title_zh || c.title_en || '案').trim().charAt(0);
  const bg = ISSUE_COLOR[c.issue] || '#888888';
  return `<div class="case-headshot-placeholder" style="background:${bg};">${titleChar}</div>`;
}

// ============================================================
// 渲染：顶部统计
// ============================================================
function renderStats() {
  document.getElementById('stat-cases').textContent = CASES.length;
  const courts = new Set(CASES.map(c => c.city || c.province));
  document.getElementById('stat-courts').textContent = courts.size;
  // stat-issues 动态从 ISSUE_I18N 取数（不再硬编码）
  document.getElementById('stat-issues').textContent = Object.keys(ISSUE_I18N).length;
  // stat-column 是按钮，不需要数字
}

// ============================================================
// 渲染：地图（按地理大区分色）
// ============================================================
function renderMap() {
  const svg = d3.select('#china-map');
  svg.selectAll('*').remove();

  const isCompact = state.view !== 'overview';
  const width = 800;
  const height = isCompact ? 500 : 600;

  svg.attr('viewBox', `0 0 ${width} ${height}`);

  const projection = d3.geoMercator()
    .center([104, 36])
    .scale(isCompact ? 540 : 620)
    .translate([width / 2, height / 2 + 20]);

  const path = d3.geoPath().projection(projection);

  const g = svg.append('g');

  // 主图只渲染有名字的省级面；九段线面（adcode 100000_JD）单独进右下角南海诸岛插图
  const provinceFeatures = CHINA_GEO.features.filter(f => f.properties.name);

  const groups = g.selectAll('.province-group')
    .data(provinceFeatures)
    .enter()
    .append('g')
    .attr('class', 'province-group');

  groups.append('path')
    .attr('class', d => {
      const name = d.properties.name;
      const count = getProvinceMapCount(name);
      const cls = ['province'];
      if (count === 0) cls.push('empty');
      if (state.selectedProvince === name) cls.push('active');
      return cls.join(' ');
    })
    // 按省填色：每个有案件的省一种颜色（被选中时由 .active 覆盖）
    .attr('fill', d => {
      const name = d.properties.name;
      const count = getProvinceMapCount(name);
      if (count === 0) return null;  // 让 CSS .empty 接管
      if (state.selectedProvince === name) return null;  // 让 CSS .active 接管
      return PROVINCE_COLORS[name] || '#B8956A';
    })
    .attr('d', path)
    .attr('data-name', d => d.properties.name)
    .on('mouseover', function(event, d) {
      const name = d.properties.name;
      const count = getProvinceMapCount(name);
      if (count === 0) return;
      showTooltip(event, provinceName(name), count);
    })
    .on('mousemove', function(event) { moveTooltip(event); })
    .on('mouseout', function() { hideTooltip(); })
    .on('click', function(event, d) {
      const name = d.properties.name;
      const count = getProvinceMapCount(name);
      if (count === 0) return;

      if (state.selectedProvince === name) {
        state.selectedProvince = null;
        state.selectedCourt = null;
        state.view = 'overview';
      } else {
        state.selectedProvince = name;
        state.selectedCourt = null;
        state.view = 'province';
      }
      hideTooltip();
      updateAll();
    });

  // 标签
  groups.append('text')
    .attr('class', d => {
      return state.selectedProvince === d.properties.name ? 'province-label active' : 'province-label';
    })
    .attr('x', d => projection(d.properties.cp)[0])
    .attr('y', d => projection(d.properties.cp)[1])
    .text(d => {
      const count = getProvinceMapCount(d.properties.name);
      if (count === 0) return '';
      return provinceName(d.properties.name);
    });

  // 案件数徽章
  const withCases = groups.filter(d => getProvinceMapCount(d.properties.name) > 0);

  withCases.append('circle')
    .attr('cx', d => projection(d.properties.cp)[0])
    .attr('cy', d => projection(d.properties.cp)[1] + 12)
    .attr('r', 8)
    .attr('fill', d => state.selectedProvince === d.properties.name ? '#B8956A' : '#1A1A1A')
    .attr('stroke', '#FFFFFF')
    .attr('stroke-width', 1.5)
    .style('pointer-events', 'none');

  withCases.append('text')
    .attr('x', d => projection(d.properties.cp)[0])
    .attr('y', d => projection(d.properties.cp)[1] + 15)
    .attr('text-anchor', 'middle')
    .attr('font-family', 'Trebuchet MS, Microsoft YaHei, 微软雅黑, sans-serif')
    .attr('font-size', '9.5px')
    .attr('font-weight', '600')
    .attr('fill', '#FFFFFF')
    .text(d => getProvinceMapCount(d.properties.name))
    .style('pointer-events', 'none');

  // 北京特别标记：在省心上方画一颗金色五角星，老板钦点要"够显眼"
  const beijingFeature = CHINA_GEO.features.find(f => f.properties.name === '北京市');
  if (beijingFeature) {
    const [bx, by] = projection(beijingFeature.properties.cp);
    // 5 点星形：外半径 6, 内半径 2.5；起点向上 (angle = -90°)
    const r1 = 6.5, r2 = 2.6;
    const starPoints = [];
    for (let i = 0; i < 10; i++) {
      const angle = (-Math.PI / 2) + (i * Math.PI / 5);
      const r = (i % 2 === 0) ? r1 : r2;
      starPoints.push(`${bx + r * Math.cos(angle)},${by - 8 + r * Math.sin(angle)}`);
    }
    g.append('polygon')
      .attr('class', 'beijing-star')
      .attr('points', starPoints.join(' '))
      .style('pointer-events', 'none');
  }

  // ============================================================
  // 南海诸岛插图盒（右下角）：九段线 + 南海区域，合规标准要素
  // ============================================================
  const nineDash = CHINA_GEO.features.find(f => f.properties.adcode === '100000_JD');
  if (nineDash) {
    const boxW = 108, boxH = 162;
    const boxX = width - boxW - 14;
    const boxY = height - boxH - 14;
    const pad = 6;
    const clipId = 'nanhai-clip';

    // 裁剪到盒内
    svg.append('clipPath').attr('id', clipId)
      .append('rect')
      .attr('x', boxX).attr('y', boxY)
      .attr('width', boxW).attr('height', boxH);

    // 插图专用投影：以九段线范围取景（含海南、华南南端）
    const insetProjection = d3.geoMercator()
      .fitExtent([[boxX + pad, boxY + pad], [boxX + boxW - pad, boxY + boxH - pad]], nineDash);
    const insetPath = d3.geoPath().projection(insetProjection);

    const insetG = svg.append('g').attr('clip-path', `url(#${clipId})`);

    // 盒底白
    insetG.append('rect')
      .attr('x', boxX).attr('y', boxY)
      .attr('width', boxW).attr('height', boxH)
      .attr('fill', '#FFFFFF');

    // 盒内陆地（海南/华南南端等）
    insetG.selectAll('.inset-land')
      .data(provinceFeatures)
      .enter().append('path')
      .attr('class', 'inset-land')
      .attr('d', insetPath)
      .attr('fill', 'var(--map-empty, #E8E6E0)')
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 0.4)
      .style('pointer-events', 'none');

    // 九段线（合规核心要素，需清晰可辨）
    insetG.append('path')
      .attr('d', insetPath(nineDash))
      .attr('fill', 'none')
      .attr('stroke', '#4A4A4A')
      .attr('stroke-width', 1.3)
      .attr('stroke-linecap', 'round')
      .style('pointer-events', 'none');

    // 南海主要岛礁标注（对照 GS(2023)2767 标准地图）
    // anchor: 'end' 表示标签放在点左侧，避免贴右边框被裁
    const insetIslands = [
      { name: '万山群岛', cp: [113.75, 21.95], anchor: 'end', dx: -3, dy: 2 },
      { name: '东沙群岛(东沙岛)', cp: [116.72, 20.70], anchor: 'end', dx: -3, dy: 2 },
      { name: '中沙群岛', cp: [114.20, 16.10], anchor: 'start', dx: 3, dy: 2 },
      { name: '西沙群岛', cp: [112.33, 16.83], anchor: 'end', dx: -3, dy: 2 },
      { name: '黄岩岛', cp: [117.75, 15.13], anchor: 'start', dx: 3, dy: 2 },
      { name: '南沙群岛', cp: [114.30, 10.50], anchor: 'start', dx: 3, dy: 2 },
      { name: '曾母暗沙', cp: [112.28, 3.97], anchor: 'start', dx: 3, dy: 2 },
    ];
    insetIslands.forEach(is => {
      const [ix, iy] = insetProjection(is.cp);
      insetG.append('circle')
        .attr('cx', ix).attr('cy', iy).attr('r', 1)
        .attr('fill', '#4A4A4A').style('pointer-events', 'none');
      insetG.append('text')
        .attr('x', ix + is.dx).attr('y', iy + is.dy)
        .attr('text-anchor', is.anchor)
        .attr('font-family', 'Trebuchet MS, Microsoft YaHei, 微软雅黑, sans-serif')
        .attr('font-size', '5.5px').attr('fill', '#2A2A2A')
        .style('pointer-events', 'none')
        .text(is.name);
    });

    // 盒边框
    svg.append('rect')
      .attr('x', boxX).attr('y', boxY)
      .attr('width', boxW).attr('height', boxH)
      .attr('fill', 'none')
      .attr('stroke', '#1A1A1A')
      .attr('stroke-width', 1)
      .style('pointer-events', 'none');

    // 盒标签
    svg.append('text')
      .attr('x', boxX + boxW / 2).attr('y', boxY + boxH - 5)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'Trebuchet MS, Microsoft YaHei, 微软雅黑, sans-serif')
      .attr('font-size', '7.5px')
      .attr('fill', '#1A1A1A')
      .style('pointer-events', 'none')
      .text('南海诸岛');
  }

  // 沿海小岛点（对照 GS(2023)2767：浙江/福建/广东/辽宁等沿岸的无名小岛）
  if (typeof ISLAND_DOTS !== 'undefined') {
    g.selectAll('.coast-islet')
      .data(ISLAND_DOTS)
      .enter().append('circle')
      .attr('class', 'coast-islet')
      .attr('cx', d => projection(d)[0])
      .attr('cy', d => projection(d)[1])
      .attr('r', 0.7)
      .attr('fill', '#9A968E')
      .style('pointer-events', 'none');
  }

  // 东海/台湾附属岛屿标注（对照 GS(2023)2767 标准地图）
  const mainIslands = [
    { name: '长山群岛', cp: [122.60, 39.25], anchor: 'start', dx: 3, dy: 2 },
    { name: '舟山群岛', cp: [122.20, 30.00], anchor: 'start', dx: 3, dy: 2 },
    { name: '钓鱼岛', cp: [123.47, 25.74], anchor: 'end', dx: -3, dy: -2 },
    { name: '赤尾屿', cp: [124.57, 25.92], anchor: 'start', dx: 3, dy: 5 },
    { name: '澎湖列岛', cp: [119.58, 23.57], anchor: 'end', dx: -3, dy: 2 },
    { name: '绿岛', cp: [121.49, 22.66], anchor: 'start', dx: 3, dy: -1 },
    { name: '兰屿', cp: [121.55, 22.05], anchor: 'start', dx: 3, dy: 5 },
    { name: '七星岩', cp: [120.82, 21.76], anchor: 'end', dx: -3, dy: 7 },
  ];
  mainIslands.forEach(is => {
    const [ix, iy] = projection(is.cp);
    g.append('circle')
      .attr('cx', ix).attr('cy', iy).attr('r', 1.3)
      .attr('fill', '#4A4A4A').style('pointer-events', 'none');
    g.append('text')
      .attr('x', ix + is.dx).attr('y', iy + is.dy)
      .attr('text-anchor', is.anchor)
      .attr('font-family', 'Trebuchet MS, Microsoft YaHei, 微软雅黑, sans-serif')
      .attr('font-size', '7px').attr('fill', '#2A2A2A')
      .style('pointer-events', 'none')
      .text(is.name);
  });

  // 审图号标注（合规标识）：底图边界依据自然资源部标准地图绘制
  svg.append('text')
    .attr('x', 14).attr('y', height - 10)
    .attr('font-family', 'Trebuchet MS, Microsoft YaHei, 微软雅黑, sans-serif')
    .attr('font-size', '8px')
    .attr('fill', '#B5B5B5')
    .style('pointer-events', 'none')
    .text('底图边界依据自然资源部标准地图 GS(2023)2767 号绘制');
}

// （v4 已删除地图图例 —— 用户认为 has-cases 单色块不具备代表性）

function showTooltip(event, name, count) {
  const tt = document.getElementById('map-tooltip');
  tt.innerHTML = `${name} <span class="count">${count}</span>`;
  tt.classList.add('visible');
  moveTooltip(event);
}
function moveTooltip(event) {
  const tt = document.getElementById('map-tooltip');
  const wrap = document.querySelector('.map-wrapper');
  const rect = wrap.getBoundingClientRect();
  tt.style.left = (event.clientX - rect.left + 12) + 'px';
  tt.style.top = (event.clientY - rect.top + 12) + 'px';
}
function hideTooltip() {
  document.getElementById('map-tooltip').classList.remove('visible');
}

// ============================================================
// 渲染：筛选 chips
// ============================================================

// 点 chip 之后把"筛选结果"面板滚到视口里。
// 窄屏（< 1024px）下 panel 跑到地图下方，不滚的话用户看不到反馈等于"没反应"。
// 注：用旧式 window.scrollTo(x, y) 数值签名，options 形式在部分环境下不可靠。
function scrollPanelIntoView() {
  // 短延迟让 panel 重新渲染完毕；50ms 比 rAF 在非前台标签下更可靠
  setTimeout(() => {
    const panel = document.getElementById('panel-section');
    if (!panel || !hasActiveTagFilter()) return;
    const rect = panel.getBoundingClientRect();
    const targetY = Math.max(0, window.scrollY + rect.top - 16);
    if (Math.abs(targetY - window.scrollY) < 24) return;  // 已经在视口里就别动
    window.scrollTo(0, targetY);
  }, 50);
}

function renderFilters() {
  // 年份
  const years = [...new Set(CASES.map(c => c.year))].sort((a, b) => b - a);
  const yearContainer = document.getElementById('filter-year-chips');
  yearContainer.innerHTML = '';

  const allYearChip = document.createElement('button');
  allYearChip.className = 'chip' + (state.filterYear === 'all' ? ' active' : '');
  allYearChip.textContent = I18N[L()].filterAll;
  allYearChip.onclick = () => { state.filterYear = 'all'; updateAll(); scrollPanelIntoView(); };
  yearContainer.appendChild(allYearChip);

  years.forEach(y => {
    const chip = document.createElement('button');
    chip.className = 'chip' + (state.filterYear === String(y) ? ' active' : '');
    chip.textContent = y;
    chip.onclick = () => { state.filterYear = String(y); updateAll(); scrollPanelIntoView(); };
    yearContainer.appendChild(chip);
  });

  // 争议焦点
  const issueContainer = document.getElementById('filter-issue-chips');
  issueContainer.innerHTML = '';
  Object.keys(ISSUE_I18N).forEach(issue => {
    const chip = document.createElement('button');
    chip.className = 'chip' + (state.filterIssue.has(issue) ? ' active' : '');
    chip.textContent = issueName(issue);
    chip.onclick = () => {
      if (state.filterIssue.has(issue)) state.filterIssue.delete(issue);
      else state.filterIssue.add(issue);
      updateAll();
      scrollPanelIntoView();
    };
    issueContainer.appendChild(chip);
  });

  // （AI 技术 tag 已删除：原 mentor 指出归类逻辑不清晰）
}

// ============================================================
// 渲染：右侧 panel
// ============================================================
function renderPanel() {
  const panel = document.getElementById('panel-section');
  const viewport = document.getElementById('viewport');
  const isSearching = state.searchText.trim().length > 0;
  const isOverviewFiltered = state.view === 'overview' && hasActiveTagFilter();

  // 搜索 或 overview+tag筛选 均视为 detail 视图（让右侧 panel 展开）
  viewport.classList.remove('view-overview', 'view-detail');
  viewport.classList.add((state.view === 'overview' && !isSearching && !isOverviewFiltered) ? 'view-overview' : 'view-detail');

  if (state.view === 'overview' && !isSearching && !isOverviewFiltered) {
    panel.innerHTML = '';
    return;
  }

  const lang = L();
  let html = '';

  // ----- 搜索 / Tag 筛选 结果分支：跨全部案件，覆盖 province/court 视图 -----
  if (isSearching || isOverviewFiltered) {
    const cases = getDisplayCases();

    // 组装提示文案：搜索 / 筛选 标签的人类可读摘要
    let queryLabel;
    if (isSearching) {
      queryLabel = lang === 'zh'
        ? `正在跨全部案件搜索 "${state.searchText.trim()}"`
        : `Searching all cases for "${state.searchText.trim()}"`;
    } else {
      const parts = [];
      if (state.filterYear !== 'all') parts.push(state.filterYear);
      state.filterIssue.forEach(k => parts.push(issueName(k)));
      state.filterTech.forEach(k => parts.push(techName(k)));
      queryLabel = lang === 'zh'
        ? `按标签筛选：${parts.join(' · ')}`
        : `Filtered by: ${parts.join(' · ')}`;
    }

    const clearLabel = isSearching
      ? (lang === 'zh' ? '× 清空搜索' : '× Clear search')
      : (lang === 'zh' ? '× 清空筛选' : '× Clear filters');
    const titleLabel = isSearching
      ? (lang === 'zh' ? '搜索结果' : 'Search Results')
      : (lang === 'zh' ? '筛选结果' : 'Filtered Results');

    html += `
      <div class="panel-header">
        <button class="back-link" id="clear-search">${clearLabel}</button>
        <div class="panel-title">
          <h2>${titleLabel}</h2>
          <span class="panel-count">${cases.length} ${I18N[lang].countSuffix || I18N[lang].statCases}</span>
        </div>
        <div class="panel-search-hint">${queryLabel}</div>
      </div>
    `;

    if (cases.length === 0) {
      html += `<div class="empty-state">${I18N[lang].emptyState}</div>`;
    } else {
      html += '<div class="cases-list">';
      cases.forEach(c => {
        const title = caseTitle(c);
        const note = caseNote(c);
        const courtZh = c.city || c.province;
        const courtDisplay = courtName(courtZh);
        const provinceDisplay = provinceName(c.province === '中华人民共和国最高人民法院' ? '北京市' : c.province);

        let tags = '';
        tags += `<span class="case-tag">${issueName(c.issue)}</span>`;
        if (c.status === 'pending') tags += `<span class="case-tag status-pending">${I18N[lang].statusPending}</span>`;

        html += `
          <div class="case-card" data-case-id="${cases.indexOf(c)}">
            <div class="case-headshot">${caseImageHTML(c)}</div>
            <div class="case-body">
              <div class="case-card-row1">
                <div class="case-title">${title}</div>
                <div class="case-year">${c.year}</div>
              </div>
              <div class="case-court-line">${provinceDisplay} · ${courtDisplay}</div>
              ${c.caseNumber ? `<div class="case-number">${caseNumberDisplay(c.caseNumber)}</div>` : ''}
              <div class="case-meta">${tags}</div>
              ${note ? `<div class="case-note">${note}</div>` : ''}
            </div>
          </div>
        `;
      });
      html += '</div>';
    }

    panel.innerHTML = html;

    // 绑定：清空搜索按钮 —— 回到搜索前的视图（state.view 没动过）
    panel.querySelectorAll('.case-card').forEach(el => {
      el.onclick = () => {
        const all = getDisplayCases();
        const c = all[parseInt(el.dataset.caseId)];
        if (c) openModal(c);
      };
    });
    const clearSearchBtn = document.getElementById('clear-search');
    if (clearSearchBtn) clearSearchBtn.onclick = () => {
      // 同时清空搜索 + tag 筛选，避免两种模式互相残留
      state.searchText = '';
      state.filterYear = 'all';
      state.filterIssue.clear();
      state.filterTech.clear();
      const input = document.getElementById('search-input');
      if (input) input.value = '';
      hideSuggestions();
      updateAll();
    };
    return;
  }

  if (state.view === 'province') {
    const courts = getCourtsInProvince(state.selectedProvince);
    const totalCases = getCasesInProvince(state.selectedProvince).length;

    html += `
      <div class="panel-header">
        <button class="back-link" id="back-to-overview">${I18N[lang].backToOverview}</button>
        <div class="panel-title">
          <h2>${provinceName(state.selectedProvince)}</h2>
          <span class="panel-count">${totalCases} ${I18N[lang].countSuffix || I18N[lang].statCases}</span>
        </div>
      </div>
      <div class="courts-list">
    `;

    courts.forEach(court => {
      const isSpecial = court.special;
      // 名称按语言显示——干净，不混排
      const displayName = courtName(court.name);
      html += `
        <div class="court-card ${isSpecial ? 'special' : ''}" data-court="${court.name}">
          <div class="court-card-info">
            ${isSpecial ? `<div class="court-special-badge">${lang === 'zh' ? '最高司法机关' : 'Supreme Court'}</div>` : ''}
            <div class="court-name">${displayName}</div>
          </div>
          <div class="court-card-meta">
            <div class="court-count">${court.cases.length}</div>
            <div class="court-arrow">→</div>
          </div>
        </div>
      `;
    });

    html += '</div>';

  } else if (state.view === 'court') {
    const cases = getDisplayCases();
    const courtZh = state.selectedCourt;
    const courtDisplay = courtName(courtZh);

    html += `
      <div class="panel-header">
        <button class="back-link" id="back-to-courts">${I18N[lang].backToCourts}</button>
        <div class="panel-title">
          <h2>${courtDisplay}</h2>
          <span class="panel-count">${cases.length} ${I18N[lang].countSuffix || I18N[lang].statCases}</span>
        </div>
      </div>
    `;

    if (cases.length === 0) {
      html += `<div class="empty-state">${I18N[lang].emptyState}</div>`;
    } else {
      html += '<div class="cases-list">';
      cases.forEach(c => {
        const title = caseTitle(c);
        const note = caseNote(c);

        let tags = '';
        tags += `<span class="case-tag">${issueName(c.issue)}</span>`;
        if (c.status === 'pending') tags += `<span class="case-tag status-pending">${I18N[lang].statusPending}</span>`;

        html += `
          <div class="case-card" data-case-id="${cases.indexOf(c)}">
            <div class="case-headshot">${caseImageHTML(c)}</div>
            <div class="case-body">
              <div class="case-card-row1">
                <div class="case-title">${title}</div>
                <div class="case-year">${c.year}</div>
              </div>
              ${c.caseNumber ? `<div class="case-number">${caseNumberDisplay(c.caseNumber)}</div>` : ''}
              <div class="case-meta">${tags}</div>
              ${note ? `<div class="case-note">${note}</div>` : ''}
            </div>
          </div>
        `;
      });
      html += '</div>';
    }
  }

  panel.innerHTML = html;

  // 绑定事件
  panel.querySelectorAll('.court-card').forEach(el => {
    el.onclick = () => {
      state.selectedCourt = el.dataset.court;
      state.view = 'court';
      updateAll();
    };
  });

  panel.querySelectorAll('.case-card').forEach(el => {
    el.onclick = () => {
      const cases = getDisplayCases();
      const c = cases[parseInt(el.dataset.caseId)];
      if (c) openModal(c);
    };
  });

  const backOverview = document.getElementById('back-to-overview');
  if (backOverview) backOverview.onclick = () => {
    state.view = 'overview';
    state.selectedProvince = null;
    state.selectedCourt = null;
    updateAll();
  };

  const backCourts = document.getElementById('back-to-courts');
  if (backCourts) backCourts.onclick = () => {
    state.view = 'province';
    state.selectedCourt = null;
    updateAll();
  };
}

// ============================================================
// 案件详情弹窗
// ============================================================
function openModal(c) {
  const lang = L();
  const backdrop = document.getElementById('modal-backdrop');

  const courtZh = c.city || c.province;
  const courtLabel = courtName(courtZh);

  const title = caseTitle(c);
  const note = caseNote(c);

  let tags = '';
  tags += `<span class="case-tag">${issueName(c.issue)}</span>`;
  if (c.status === 'pending') tags += `<span class="case-tag status-pending">${I18N[lang].statusPending}</span>`;

  const provinceDisplay = provinceName(c.province === '中华人民共和国最高人民法院' ? '北京市' : c.province);

  document.getElementById('modal-body').innerHTML = `
    <div class="modal-eyebrow">${provinceDisplay} · ${courtLabel}</div>
    <div class="modal-header-flex">
      <div class="modal-headshot">${caseImageHTML(c)}</div>
      <div class="modal-header-text">
        <div class="modal-title">${title}</div>
        <div class="modal-tags">${tags}</div>
      </div>
    </div>
    <div class="modal-meta">
      ${c.caseNumber ? `
        <div class="modal-meta-label">${I18N[lang].caseNumberLabel}</div>
        <div class="modal-meta-value mono">${caseNumberDisplay(c.caseNumber)}</div>
      ` : ''}
      <div class="modal-meta-label">${I18N[lang].yearLabel}</div>
      <div class="modal-meta-value">${c.year}</div>
      <div class="modal-meta-label">${I18N[lang].statusLabel}</div>
      <div class="modal-meta-value">${c.status === 'pending' ? I18N[lang].statusPending : I18N[lang].statusDecided}</div>
      <div class="modal-meta-label">${I18N[lang].issueLabel}</div>
      <div class="modal-meta-value">${issueName(c.issue)}</div>
    </div>
    ${note ? `<div class="modal-note">${note}</div>` : ''}
    <a class="modal-link-btn" href="${c.url}" target="_blank" rel="noopener">
      ${I18N[lang].viewSource}
    </a>
  `;
  backdrop.classList.add('visible');
}

function closeModal() {
  document.getElementById('modal-backdrop').classList.remove('visible');
}

// ============================================================
// 宋律师专栏弹窗
// ============================================================
function openColumnModal() {
  const lang = L();
  const articles = COLUMN_ARTICLES || [];

  let listHtml = '';
  if (articles.length === 0) {
    listHtml = `<div class="empty-state">${I18N[lang].columnEmpty}</div>`;
  } else {
    listHtml = '<ul class="column-list">';
    articles.forEach(a => {
      const title = lang === 'en' && a.title_en ? a.title_en : a.title_zh;
      const summary = lang === 'en' && a.summary_en ? a.summary_en : a.summary_zh;
      const category = lang === 'en'
        ? (a.category_en || a.category_zh || '')
        : (a.category_zh || a.category_en || '');
      listHtml += `
        <li class="column-item">
          <div class="column-date">${a.date}</div>
          <div class="column-text">
            ${category ? `<span class="column-category">${category}</span>` : ''}
            <a class="column-title" href="${a.url}" target="_blank" rel="noopener">${title}</a>
            ${summary ? `<div class="column-summary">${summary}</div>` : ''}
            <a class="column-readmore" href="${a.url}" target="_blank" rel="noopener">${I18N[lang].columnReadMore}</a>
          </div>
        </li>
      `;
    });
    listHtml += '</ul>';
  }

  document.getElementById('column-body').innerHTML = `
    <h2 class="column-h2">${I18N[lang].columnModalTitle}</h2>
    <p class="column-lede">${I18N[lang].columnModalLede}</p>
    ${listHtml}
  `;
  document.getElementById('column-backdrop').classList.add('visible');
}

function closeColumnModal() {
  document.getElementById('column-backdrop').classList.remove('visible');
}

// ============================================================
// 国际化：刷新所有 data-i18n 文本
// ============================================================
function applyI18n() {
  const lang = L();
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = I18N[lang][key] || key;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = I18N[lang][key] || key;
  });
  // 图片 alt 翻译（页脚二维码）
  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const key = el.getAttribute('data-i18n-alt');
    el.alt = I18N[lang][key] || key;
  });

  // 语言切换按钮高亮
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// ============================================================
// 搜索：建议下拉 + 提交（v6 新增）
// 行为：打字 → 显示建议；回车 / 点搜索按钮 / 点建议 → commitSearch → 才真正执行搜索
// ============================================================

// 常用搜索关键词（标题里高频出现但不在 ISSUE/TECH 字典里的词）
const COMMON_SEARCH_TERMS = {
  zh: ["著作权", "侵权", "训练数据", "Deepfake", "AIGC", "声音克隆", "肖像权",
       "人格权", "知识产权", "数据合规", "标识义务", "互联网法院", "中级人民法院"],
  en: ["copyright", "infringement", "training data", "Deepfake", "AIGC",
       "voice cloning", "portrait rights", "personality rights",
       "intellectual property", "data compliance", "labelling",
       "internet court", "intermediate court"]
};

// 构建建议池：争议焦点 + AI技术 + 法院 + 省份 + 常用词
function buildSuggestionPool() {
  const lang = L();
  const pool = new Set();
  Object.keys(ISSUE_I18N).forEach(k => pool.add(lang === 'en' ? ISSUE_I18N[k] : k));
  Object.keys(TECH_I18N).forEach(k => pool.add(lang === 'en' ? TECH_I18N[k] : k));
  Object.keys(COURT_I18N).forEach(k => pool.add(lang === 'en' ? COURT_I18N[k] : k));
  // 只列有案件的省份（避免大量无关省份噪音）
  const provincesWithCases = [...new Set(CASES.map(c => c.province === '中华人民共和国最高人民法院' ? '北京市' : c.province))];
  provincesWithCases.forEach(p => pool.add(provinceName(p)));
  COMMON_SEARCH_TERMS[lang].forEach(t => pool.add(t));
  return [...pool];
}

// 按用户输入过滤建议
function getMatchingSuggestions(query, max = 8) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const pool = buildSuggestionPool();
  const matches = pool.filter(s => s && s.toLowerCase().includes(q));
  // 完全前缀匹配优先；其次按长度短优先
  matches.sort((a, b) => {
    const aPrefix = a.toLowerCase().startsWith(q) ? 0 : 1;
    const bPrefix = b.toLowerCase().startsWith(q) ? 0 : 1;
    if (aPrefix !== bPrefix) return aPrefix - bPrefix;
    return a.length - b.length;
  });
  return matches.slice(0, max);
}

function escapeHtml(s) {
  return String(s).replace(/[<>&"']/g, c =>
    ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&#39;'})[c]);
}

// 高亮建议项里命中的部分
function highlightMatch(text, query) {
  const q = query.trim();
  if (!q) return escapeHtml(text);
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0) return escapeHtml(text);
  return escapeHtml(text.slice(0, idx)) +
         '<mark>' + escapeHtml(text.slice(idx, idx + q.length)) + '</mark>' +
         escapeHtml(text.slice(idx + q.length));
}

function renderSuggestions() {
  const input = document.getElementById('search-input');
  const dropdown = document.getElementById('search-suggestions');
  if (!dropdown || !input) return;
  const matches = getMatchingSuggestions(input.value);
  if (matches.length === 0) {
    hideSuggestions();
    return;
  }
  dropdown.innerHTML = matches.map(s =>
    `<li class="suggest-item" data-value="${escapeHtml(s)}">${highlightMatch(s, input.value)}</li>`
  ).join('');
  dropdown.classList.add('visible');
  // 用 mousedown 而非 click，赶在 input.blur 之前触发
  dropdown.querySelectorAll('.suggest-item').forEach(item => {
    item.addEventListener('mousedown', (e) => {
      e.preventDefault();
      input.value = item.dataset.value;
      commitSearch();
    });
  });
}

function hideSuggestions() {
  const dropdown = document.getElementById('search-suggestions');
  if (dropdown) {
    dropdown.classList.remove('visible');
    dropdown.innerHTML = '';
  }
}

function commitSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;
  state.searchText = input.value;
  hideSuggestions();
  renderPanel();
}

// ============================================================
// 事件
// ============================================================
function setupEvents() {
  // 案件详情弹窗
  document.getElementById('modal-close').onclick = closeModal;
  document.getElementById('modal-backdrop').onclick = (e) => {
    if (e.target.id === 'modal-backdrop') closeModal();
  };
  // 专栏弹窗
  document.getElementById('column-close').onclick = closeColumnModal;
  document.getElementById('column-backdrop').onclick = (e) => {
    if (e.target.id === 'column-backdrop') closeColumnModal();
  };
  document.getElementById('stat-column').onclick = openColumnModal;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeModal(); closeColumnModal(); }
  });

  // 搜索框：打字 → 只刷新建议下拉，不直接搜索
  // 回车 / 点搜索按钮 / 点建议项 → 才提交搜索（commitSearch）
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', () => {
    renderSuggestions();
  });
  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) renderSuggestions();
  });
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commitSearch();
      searchInput.blur();
    } else if (e.key === 'Escape') {
      hideSuggestions();
      searchInput.blur();
    }
  });

  // 搜索按钮：有内容则提交，无内容则聚焦输入框
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.onclick = () => {
      if (searchInput.value.trim()) {
        commitSearch();
      } else {
        searchInput.focus();
      }
    };
  }

  // 点击页面其他区域关闭建议
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrap')) {
      hideSuggestions();
    }
  });

  document.getElementById('reset-btn').onclick = () => {
    state.view = 'overview';
    state.selectedProvince = null;
    state.selectedCourt = null;
    state.filterYear = 'all';
    state.filterIssue.clear();
    state.filterTech.clear();
    state.searchText = '';
    document.getElementById('search-input').value = '';
    hideSuggestions();
    updateAll();
  };

  // 语言切换
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.onclick = () => {
      state.lang = btn.dataset.lang;
      updateAll();
    };
  });
}

// ============================================================
// 主刷新
// ============================================================
function updateAll() {
  applyI18n();
  renderMap();
  renderFilters();
  renderPanel();
}

function init() {
  renderStats();
  setupEvents();
  updateAll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
