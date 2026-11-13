/* YuuZ Scripts — independent interface powered by the public ScriptBlox API. */
(() => {
  'use strict';

  const API = 'https://scriptblox.com/api/script';
  const EXECUTOR_API = 'https://scriptblox.com/api/executor/list';
  const el = (id) => document.getElementById(id);
  const state = { view: 'discover', query: '', filter: 'all', scope: 'all', gameTerm: '', year: 'all', sort: 'updatedAt:desc', page: 1, totalPages: 1, scripts: [], trending: [], saved: readSaved(), requestId: 0, selected: null, selectedCode: '', trendingLoaded: false, catalogCountLoading: false, catalogCountValue: null, catalogCountAt: 0, catalogCountSource: 'none', catalogCountPrecision: 'none', executors: [], executorsLoaded: false, executorFilter: 'all', executorQuery: '', executorRequestId: 0 };
  let numberFormat = new Intl.NumberFormat(window.YuuZI18n?.locale() || 'id-ID', { notation: 'compact', maximumFractionDigits: 1 });
  let integerFormat = new Intl.NumberFormat(window.YuuZI18n?.locale() || 'id-ID');
  let dateFormat = new Intl.DateTimeFormat(window.YuuZI18n?.locale() || 'id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
  let toastTimer = 0;
  let searchTimer = 0;
  let modalRequestId = 0;
  const motionEnabled = window.matchMedia?.('(prefers-reduced-motion: no-preference)').matches ?? true;
  const canHover = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? false;
  const introStartedAt = performance.now();
  let introClosing = false;
  const counterFrames = new Map();

  function finishIntro() {
    if (introClosing) return;
    introClosing = true;
    const wait = Math.max(0, 900 - (performance.now() - introStartedAt));
    window.setTimeout(() => {
      const loader = el('introLoader');
      if (!loader) return;
      loader.classList.add('is-hidden');
      window.setTimeout(() => loader.remove(), 800);
    }, wait);
  }
  // A slow/blocked API must never leave the UI covered by the intro screen.
  window.setTimeout(finishIntro, 4800);

  function setCounter(id, target) {
    const element = el(id);
    if (!element || !Number.isFinite(target) || target < 0) return;
    const value = Math.floor(target);
    if (counterFrames.has(id)) cancelAnimationFrame(counterFrames.get(id));
    const previous = Number(element.dataset.value || 0);
    const suffix = element.dataset.suffix || '';
    const prefix = element.dataset.prefix || '';
    element.dataset.value = String(value);
    if (!motionEnabled || document.visibilityState !== 'visible' || previous === value) {
      element.textContent = prefix + integerFormat.format(value) + suffix;
      return;
    }
    const start = performance.now();
    const duration = 650;
    const frame = now => {
      const ratio = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - ratio, 3);
      element.textContent = prefix + integerFormat.format(Math.round(previous + (value - previous) * eased)) + suffix;
      if (ratio < 1) counterFrames.set(id, requestAnimationFrame(frame));
      else counterFrames.delete(id);
    };
    counterFrames.set(id, requestAnimationFrame(frame));
  }

  // V18: Verify count via Vercel server-side function. A partial API response is
  // displayed as a labeled approximation, NEVER as an invented exact total.
  const CATALOG_REFRESH_INTERVAL = 120000;
  const CATALOG_CACHE_KEY = 'yuuz-catalog-v18';
  const catalogCopy = {
    id: ['Sinkronisasi katalog…', 'Tersinkron', 'Data terakhir tersimpan', 'API belum tersedia', 'Perbarui jumlah script', 'Perkiraan dari halaman API', 'Menghitung data terbaru…', 'Jumlah tepat dari API', 'Mengecek jumlah tepat…'],
    en: ['Syncing catalog…', 'Synced', 'Last saved count', 'API unavailable', 'Refresh script count', 'Estimated from API pages', 'Checking latest data…', 'Exact count from API', 'Checking exact count…'],
    th: ['กำลังซิงก์…', 'ซิงก์แล้ว', 'ข้อมูลเดิม', 'API ไม่พร้อม', 'อัปเดตจำนวน', 'ประมาณจากจำนวนหน้า', 'กำลังตรวจสอบ…', 'จำนวนจริงจาก API', 'ตรวจสอบจำนวนจริง…'],
    fil: ['Nagsi-sync…', 'Na-sync', 'Huling na-save', 'Hindi available ang API', 'I-refresh ang bilang', 'Tantya mula sa mga pahina', 'Sinusuri…', 'Eksaktong bilang mula sa API', 'Sinusuri ang eksakto…'],
    ja: ['同期中…', '同期済み', '保存済みの値', 'API 利用不可', '件数を更新', 'ページ数から推定', '確認中…', 'API の正確な件数', '正確な件数を確認中…'],
    'zh-CN': ['同步中…', '已同步', '上次保存', 'API 暂不可用', '刷新数量', '根据页数估计', '正在检查…', 'API 精确数量', '正在核实精确数量…'],
    ko: ['동기화 중…', '동기화됨', '저장된 값', 'API 사용 불가', '개수 새로고침', '페이지 수 기반 추정', '확인 중…', 'API 정확한 개수', '정확한 개수 확인 중…'],
    vi: ['Đang đồng bộ…', 'Đã đồng bộ', 'Dữ liệu đã lưu', 'API chưa sẵn sàng', 'Cập nhật số lượng', 'Ước tính theo trang', 'Đang kiểm tra…', 'Số lượng chính xác', 'Đang kiểm tra chính xác…'],
    es: ['Sincronizando…', 'Sincronizado', 'Último dato guardado', 'API no disponible', 'Actualizar total', 'Estimación por páginas', 'Comprobando…', 'Total exacto de la API', 'Comprobando total exacto…']
  };
  let catalogSyncMode = 'loading';
  function catalogWords() { return catalogCopy[window.YuuZI18n?.language()] || catalogCopy.id; }
  function formattedClock(at) {
    try { return new Intl.DateTimeFormat(window.YuuZI18n?.locale() || 'id-ID', { hour: '2-digit', minute: '2-digit' }).format(new Date(at)); }
    catch { return ''; }
  }
  function updateCatalogStatus(mode) {
    catalogSyncMode = mode;
    const w = catalogWords();
    const tile = el('catalogTile');
    const label = el('catalogSyncText');
    const button = el('catalogRefreshBtn');
    const badge = el('catalogPrecision');
    const note = el('catalogNote');
    if (!tile || !label || !button) return;
    tile.dataset.sync = mode;
    button.disabled = mode === 'loading' || mode === 'checking';
    button.setAttribute('aria-label', w[4]);
    button.title = w[4];
    const stamp = state.catalogCountAt ? formattedClock(state.catalogCountAt) : '';
    const hasData = Number.isSafeInteger(state.catalogCountValue);
    if (mode === 'live') label.textContent = w[1] + (stamp ? ' · ' + stamp : '');
    else if (mode === 'estimated') label.textContent = w[5] + (stamp ? ' · ' + stamp : '');
    else if (mode === 'checking') label.textContent = w[8];
    else if (mode === 'cached') label.textContent = w[2] + (stamp ? ' · ' + stamp : '');
    else if (mode === 'error') label.textContent = w[3];
    else label.textContent = w[0];
    if (badge) {
      badge.hidden = !hasData;
      badge.textContent = state.catalogCountPrecision === 'exact' ? 'EXACT' : state.catalogCountPrecision === 'approximate' ? 'ESTIMATE' : 'CACHED';
    }
    if (note) note.textContent = mode === 'live' ? w[7] : mode === 'checking' ? w[8] :
      mode === 'estimated' ? w[5] : mode === 'cached' ? w[2] : w[6];
  }
  function persistCount() {
    if (!Number.isSafeInteger(state.catalogCountValue)) return;
    try { localStorage.setItem(CATALOG_CACHE_KEY, JSON.stringify({value:state.catalogCountValue, at:state.catalogCountAt, precision:state.catalogCountPrecision})); }
    catch { /* Storage may be disabled. */ }
  }
  function showCatalogCount(count, at = Date.now(), precision = 'exact', persist = true) {
    if (!Number.isSafeInteger(count) || count < 0) return;
    state.catalogCountValue = count;
    state.catalogCountAt = at;
    state.catalogCountPrecision = precision;
    const number = el('catalogCount');
    number.dataset.suffix = '';
    number.dataset.prefix = precision === 'approximate' ? '≈ ' : '';
    number.title = precision === 'approximate' ? 'Perkiraan berdasarkan jumlah halaman API; bukan angka pasti' : 'Jumlah terverifikasi dari data ScriptBlox';
    setCounter('catalogCount', count);
    if (persist) persistCount();
  }
  function estimateFromFirst(result, requestedMax = 20) {
    const pages = Number(result?.totalPages);
    const size = Number(result?.max) || Number(requestedMax);
    if (!Number.isSafeInteger(pages) || pages < 1 || pages > 10000000 ||
        !Number.isSafeInteger(size) || size < 1 || size > 20 || !Array.isArray(result?.scripts)) return null;
    if (pages === 1) return {count: result.scripts.length, precision: 'exact'};
    const lo = (pages - 1) * size + 1, hi = pages * size;
    return {count: Math.round((lo + hi) / 2), precision: 'approximate'};
  }
  function initializeCachedCount() {
    try {
      let cached = JSON.parse(localStorage.getItem(CATALOG_CACHE_KEY) || 'null');
      if (!cached) cached = JSON.parse(sessionStorage.getItem('yuuz-catalog-v17') || 'null');
      if (cached && Number.isSafeInteger(cached.value) && cached.value >= 0 &&
          Number.isFinite(cached.at) && Date.now() - cached.at < 86400000) {
        showCatalogCount(cached.value, cached.at, cached.precision === 'approximate' ? 'approximate' : 'cached', false);
        state.catalogCountSource = 'cached';
        updateCatalogStatus('cached');
      }
    } catch { /* Live API still works. */ }
  }
  async function refreshCatalogCount(options = {}) {
    const { force = false, firstResult = null, requestedMax = 20 } = options;
    if (state.catalogCountLoading || document.hidden) return;
    if (!navigator.onLine) { updateCatalogStatus(state.catalogCountValue == null ? 'error' : 'cached'); return; }
    if (!force && state.catalogCountSource === 'live' && Date.now() - state.catalogCountAt < CATALOG_REFRESH_INTERVAL) return;
    state.catalogCountLoading = true;
    const fallback = estimateFromFirst(firstResult, requestedMax);
    if (fallback && state.catalogCountSource !== 'live') {
      showCatalogCount(fallback.count, Date.now(), fallback.precision);
      state.catalogCountSource = 'estimate';
      updateCatalogStatus('checking');
    } else updateCatalogStatus('loading');
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 9000);
      let result;
      try {
        const response = await fetch('/api/catalog-count' + (force ? '?refresh=1' : ''), {
          signal: controller.signal,
          headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error('Catalog proxy HTTP ' + response.status);
        result = await response.json();
      } finally { clearTimeout(timeout); }
      if (!result?.ok || !Number.isSafeInteger(Number(result.count)) || Number(result.count) < 0) {
        throw new Error('Data catalog proxy tidak valid');
      }
      const precision = result.precision === 'exact' ? 'exact' : 'approximate';
      const timestamp = Date.parse(result.updatedAt) || Date.now();
      showCatalogCount(Number(result.count), timestamp, precision);
      state.catalogCountSource = result.stale ? 'cached' : precision === 'exact' ? 'live' : 'estimate';
      updateCatalogStatus(result.stale ? 'cached' : precision === 'exact' ? 'live' : 'estimated');
    } catch (error) {
      console.warn('Count API not ready:', error.message);
      if (!fallback && state.catalogCountValue == null) {
        try {
          const direct = await apiGet('/fetch', {page:1,max:20});
          const estimated = estimateFromFirst(direct?.result, 20);
          if (estimated) {
            showCatalogCount(estimated.count, Date.now(), estimated.precision);
            state.catalogCountSource = 'estimate';
          }
        } catch { /* No data source currently accessible. */ }
      }
      if (state.catalogCountSource === 'estimate') updateCatalogStatus('estimated');
      else if (state.catalogCountValue != null) updateCatalogStatus('cached');
      else updateCatalogStatus('error');
    } finally {
      state.catalogCountLoading = false;
      el('catalogRefreshBtn').disabled = false;
    }
  }
  const revealObserver = motionEnabled && 'IntersectionObserver' in window
    ? new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: .08, rootMargin: '0px 0px -18px 0px' })
    : null;

  function revealNewCards() {
    if (!revealObserver) return;
    document.querySelectorAll('.script-card:not(.will-reveal), .trend-card:not(.will-reveal), .executor-card:not(.will-reveal)').forEach((card, index) => {
      card.style.setProperty('--reveal-delay', Math.min(index % 6, 5) * 65 + 'ms');
      card.classList.add('will-reveal');
      revealObserver.observe(card);
    });
  }

  function enableCardSpotlight(card) {
    if (!canHover) return;
    let frame = 0;
    card.addEventListener('pointermove', event => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.setProperty('--pointer-x', (x * 100).toFixed(1) + '%');
        card.style.setProperty('--pointer-y', (y * 100).toFixed(1) + '%');
        card.style.setProperty('--tilt-x', ((.5 - y) * 3).toFixed(2) + 'deg');
        card.style.setProperty('--tilt-y', ((x - .5) * 3).toFixed(2) + 'deg');
        frame = 0;
      });
    }, { passive: true });
    card.addEventListener('pointerleave', () => {
      if (frame) cancelAnimationFrame(frame);
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  }

  function readSaved() {
    try {
      const value = JSON.parse(localStorage.getItem('yuuz-scripts-saved') || '{}');
      return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    } catch { return {}; }
  }
  function persistSaved() {
    try { localStorage.setItem('yuuz-scripts-saved', JSON.stringify(state.saved)); }
    catch { toast('Penyimpanan browser tidak tersedia.'); }
  }
  function scriptId(script) { return String(script?._id || script?.slug || ''); }
  function isSaved(script) { return Boolean(state.saved[scriptId(script)]); }
  function saveSnapshot(script) {
    return { _id: script._id, title: script.title, slug: script.slug, game: script.game, image: script.image, verified: script.verified, key: script.key, views: script.views, scriptType: script.scriptType, isUniversal: script.isUniversal, isPatched: script.isPatched, createdAt: script.createdAt, updatedAt: script.updatedAt, features: script.features, tags: script.tags, owner: script.owner, likeCount: script.likeCount, dislikeCount: script.dislikeCount, keyLink: script.keyLink, visibility: script.visibility };
  }
  function toggleSaved(script) {
    const id = scriptId(script);
    if (!id) return;
    if (state.saved[id]) { delete state.saved[id]; toast('Dihapus dari tersimpan'); }
    else { state.saved[id] = saveSnapshot(script); toast('Script berhasil disimpan'); }
    persistSaved();
    updateSavedCount();
    renderFilteredPage();
    if (!el('modalBackdrop').hidden && state.selected && scriptId(state.selected) === id) updateModalSave();
  }
  function updateSavedCount() {
    const amount = Object.keys(state.saved).length;
    if (el('savedCount')) el('savedCount').textContent = amount;
    setCounter('savedStatCount', amount);
  }

  function toast(message) {
    const node = el('toast');
    node.textContent = message;
    node.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('show'), 2800);
  }
  function icon(name) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '#i-' + name);
    svg.append(use);
    return svg;
  }
  function node(tag, className, content) {
    const result = document.createElement(tag);
    if (className) result.className = className;
    if (content != null) result.textContent = String(content);
    return result;
  }
  function imageUrl(script) {
    const value = script?.image || script?.game?.imageUrl;
    if (!value || typeof value !== 'string') return '';
    try {
      const uri = new URL(value, 'https://scriptblox.com/');
      return ['https:', 'http:'].includes(uri.protocol) ? uri.href : '';
    } catch { return ''; }
  }
  function addImage(host, script) {
    const url = imageUrl(script);
    if (!url) return;
    const img = node('img');
    img.loading = 'lazy';
    img.alt = 'Cover ' + (script?.game?.name || 'Roblox');
    img.referrerPolicy = 'no-referrer';
    img.src = url;
    img.addEventListener('error', () => img.remove());
    host.append(img);
  }
  function gameName(script) { return script?.isUniversal ? 'Universal Script' : (script?.game?.name || 'Roblox'); }
  function displayViews(views) { return Number.isFinite(Number(views)) ? numberFormat.format(Number(views)) : '0'; }
  function displayDate(value) { try { return value ? dateFormat.format(new Date(value)) : 'Tanggal tidak diketahui'; } catch { return 'Tanggal tidak diketahui'; } }
  function badgesFor(script) {
    const values = [];
    if (script.verified) values.push(['verified', 'Verified', 'shield']);
    if (script.scriptType === 'free') values.push(['free', 'Gratis']);
    if (script.key === false || (script.key == null && !script.keyLink)) values.push(['nokey', 'No Key']);
    if (script.key === true || script.keyLink) values.push(['key', 'Key Required']);
    if (script.isUniversal) values.push(['universal', 'Universal']);
    if (script.isPatched) values.push(['patched', 'Patched']);
    return values.slice(0, 4);
  }
  function badgeElements(script, host) {
    for (const [type, label, iconName] of badgesFor(script)) {
      const badge = node('span', 'badge ' + type, label);
      if (iconName) badge.prepend(icon(iconName));
      host.append(badge);
    }
  }
  function createCard(script) {
    const card = node('article', 'script-card');
    const cover = node('div', 'card-cover');
    addImage(cover, script);
    cover.append(node('span', 'cover-label', script.isUniversal ? 'UNIVERSAL' : 'ROBLOX'));
    const bookmark = node('button', 'card-bookmark' + (isSaved(script) ? ' saved' : ''));
    bookmark.type = 'button';
    bookmark.setAttribute('aria-label', isSaved(script) ? 'Hapus dari tersimpan' : 'Simpan script');
    bookmark.append(icon('bookmark'));
    bookmark.addEventListener('click', () => toggleSaved(script));
    cover.append(bookmark);
    card.append(cover);

    const body = node('div', 'card-body');
    body.append(node('div', 'game-name', gameName(script)));
    const title = node('h3', 'card-title', script.title || 'Untitled Script');
    title.title = script.title || 'Untitled Script';
    body.append(title);
    const badges = node('div', 'badges');
    badgeElements(script, badges);
    body.append(badges);
    const dateStamp = node('div', 'card-created');
    dateStamp.append(icon('calendar'), node('span', '', 'Dibuat'), node('time', '', displayDate(script.createdAt)));
    if (script.createdAt && Number.isFinite(Date.parse(script.createdAt))) dateStamp.querySelector('time').dateTime = new Date(script.createdAt).toISOString();
    body.append(dateStamp, node('hr', 'card-divider'));
    const bottom = node('div', 'card-bottom');
    const views = node('span', 'card-views');
    views.append(icon('eye'), document.createTextNode(displayViews(script.views) + ' views'));
    const open = node('button', 'card-view', 'Lihat Script');
    open.type = 'button';
    open.append(icon('arrow'));
    open.addEventListener('click', () => openModal(script));
    bottom.append(views, open);
    body.append(bottom);
    card.append(body);
    enableCardSpotlight(card);
    return card;
  }
  function createTrending(script, index) {
    const card = node('button', 'trend-card');
    card.type = 'button';
    card.setAttribute('aria-label', 'Detail ' + (script.title || 'script'));
    const background = node('div', 'trend-background');
    addImage(background, script);
    card.append(background, node('span', 'trend-rank', '#' + String(index + 1).padStart(2, '0')));
    card.append(node('span', 'trend-game', gameName(script)), node('strong', 'trend-title', script.title || 'Untitled Script'));
    const foot = node('div', 'trend-foot');
    const views = node('span');
    views.append(icon('eye'), document.createTextNode(displayViews(script.views) + ' views'));
    const badge = node('span');
    badge.append(icon(script.verified ? 'check' : 'code'), document.createTextNode(script.verified ? 'Verified' : 'Script'));
    foot.append(views, badge);
    card.append(foot);
    card.addEventListener('click', () => openModal(script));
    return card;
  }
  function skeletons() {
    const grid = el('scriptGrid');
    grid.replaceChildren();
    for (let i = 0; i < 6; i++) {
      const card = node('div', 'card-skeleton');
      card.append(node('div', 'sk-cover'), node('div', 'sk-line short'), node('div', 'sk-line medium'), node('div', 'sk-line'), node('div', 'sk-line bottom'));
      grid.append(card);
    }
    el('resultCount').textContent = 'Mengambil data dari ScriptBlox...';
    el('emptyState').hidden = true;
    el('pagination').hidden = true;
  }
  async function apiGet(path, params) {
    const url = new URL(API + path);
    if (params) for (const [key, value] of Object.entries(params)) if (value != null && value !== '') url.searchParams.set(key, value);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 14000);
    try {
      const response = await fetch(url.toString(), { mode: 'cors', signal: controller.signal, headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('API mengembalikan status ' + response.status);
      const data = await response.json();
      if (data?.message && !data?.result && !data?.script) throw new Error(data.message);
      setApiStatus(true);
      return data;
    } finally { clearTimeout(timeout); }
  }
  function setApiStatus(ok) {
    const label = document.querySelector('.source-box strong');
    const led = document.querySelector('.source-led');
    if (label) label.textContent = ok ? 'Live API Connected' : 'API tidak terhubung';
    if (led) led.style.background = ok ? '#a6ee62' : '#f3a574';
    document.querySelector('.api-status')?.classList.toggle('offline', !ok);
  }
  function safeExternalLink(value) {
    if (typeof value !== 'string' || !value.trim()) return '';
    try {
      const input = value.trim();
      const parsed = new URL(/^https?:\/\//i.test(input) ? input : 'https://' + input);
      return ['https:', 'http:'].includes(parsed.protocol) && parsed.hostname ? parsed.href : '';
    } catch { return ''; }
  }
  function executorTier(executor) {
    const type = String(executor?.type || '').toLowerCase().trim();
    if (type === 'free') return 'free';
    if (type === 'paid') return 'paid';
    if (type.includes('free') && type.includes('paid')) return 'both';
    return 'unknown';
  }
  function executorTypeLabel(tier) {
    return tier === 'free' ? 'Gratis' : tier === 'paid' ? 'Berbayar' : tier === 'both' ? 'Gratis & Berbayar' : 'Tipe belum diketahui';
  }
  function makeExecutorSkeletons() {
    const grid = el('executorGrid');
    grid.replaceChildren();
    for (let i = 0; i < 6; i++) {
      const box = node('div', 'executor-skeleton');
      box.append(node('span', 'exec-sk-logo'), node('span', 'exec-sk-line'), node('span', 'exec-sk-line short'), node('span', 'exec-sk-bottom'));
      grid.append(box);
    }
    el('executorEmpty').hidden = true;
    el('executorResultCount').textContent = 'Mengambil daftar executor dari ScriptBlox...';
  }
  function createExecutorCard(executor) {
    const tier = executorTier(executor);
    const card = node('article', 'executor-card');
    const header = node('div', 'executor-card-header');
    const logo = node('span', 'executor-logo');
    logo.append(icon('terminal'));
    const image = safeExternalLink(executor.thumbnail);
    if (image) {
      const picture = node('img');
      picture.loading = 'lazy';
      picture.decoding = 'async';
      picture.referrerPolicy = 'no-referrer';
      picture.alt = '';
      picture.src = image;
      picture.addEventListener('error', () => picture.remove());
      logo.append(picture);
    }
    const badge = node('span', 'executor-type-badge ' + tier, executorTypeLabel(tier));
    badge.prepend(icon(tier === 'paid' ? 'wallet' : 'check'));
    header.append(logo, badge);
    const name = node('h3', 'executor-name', executor.name || 'Executor tanpa nama');
    name.title = executor.name || '';
    const platform = node('span', 'executor-platform');
    platform.append(icon('monitor'), document.createTextNode(String(executor.platform || 'Platform tidak diketahui')));
    const details = node('div', 'executor-card-details');
    const version = node('div', 'executor-detail');
    version.append(node('span', '', 'VERSI'), node('strong', '', executor.version || 'Belum tersedia'));
    const status = node('div', 'executor-detail');
    const patched = executor.patched === true;
    const knownStatus = typeof executor.patched === 'boolean';
    const statusText = patched ? 'Patched' : knownStatus ? 'Belum patched' : 'Belum diketahui';
    const statusLabel = node('strong', 'executor-status ' + (patched ? 'is-patched' : knownStatus ? 'is-active' : ''), statusText);
    statusLabel.prepend(node('i', 'executor-status-dot'));
    status.append(node('span', '', 'STATUS'), statusLabel);
    details.append(version, status);
    const foot = node('div', 'executor-card-footer');
    const updated = node('span', 'executor-updated');
    updated.append(icon('refresh'), document.createTextNode(executor.versionDate ? displayDate(executor.versionDate) : 'Update belum diketahui'));
    const url = safeExternalLink(executor.website) || safeExternalLink(executor.store);
    if (url) {
      const open = node('a', 'executor-open');
      open.href = url;
      open.target = '_blank';
      open.rel = 'noopener noreferrer';
      open.append(document.createTextNode('Website'), icon('external'));
      foot.append(updated, open);
    } else foot.append(updated, node('span', 'executor-link-unavailable', 'Link tidak tersedia'));
    card.append(header, name, platform, details, foot);
    enableCardSpotlight(card);
    return card;
  }
  function renderExecutors() {
    if (!state.executorsLoaded) return;
    const source = state.executors;
    const filter = state.executorFilter;
    const query = state.executorQuery.toLocaleLowerCase('id-ID').trim();
    const filtered = source.filter(item => {
      const tier = executorTier(item);
      if (filter !== 'all' && tier !== filter && tier !== 'both') return false;
      if (!query) return true;
      return [item.name, item.platform, item.version].some(value => String(value || '').toLocaleLowerCase('id-ID').includes(query));
    });
    el('executorGrid').replaceChildren(...filtered.map(createExecutorCard));
    el('executorResultCount').textContent = integerFormat.format(filtered.length) + ' dari ' + integerFormat.format(source.length) + ' executor';
    el('executorEmpty').hidden = filtered.length !== 0;
    el('executorEmptyTitle').textContent = 'Executor tidak ditemukan';
    el('executorEmptyDescription').textContent = 'Coba filter lain atau ubah kata kunci pencarianmu.';
    el('executorRetry').textContent = 'Reset filter';
    el('executorRetry').append(icon('refresh'));
    revealNewCards();
  }
  async function loadExecutors(force = false) {
    if (state.executorsLoaded && !force) return renderExecutors();
    const current = ++state.executorRequestId;
    makeExecutorSkeletons();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 14000);
    try {
      const response = await fetch(EXECUTOR_API, { mode: 'cors', signal: controller.signal, headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('API executor mengembalikan status ' + response.status);
      const data = await response.json();
      if (data?.message) throw new Error(data.message);
      const items = Array.isArray(data) ? data : Array.isArray(data?.executors) ? data.executors : Array.isArray(data?.result?.executors) ? data.result.executors : null;
      if (!items) throw new Error('Format daftar executor tidak dikenali');
      if (current !== state.executorRequestId) return;
      state.executors = items.filter(item => item && typeof item === 'object' && item.name);
      state.executorsLoaded = true;
      setCounter('executorTotal', state.executors.length);
      setCounter('executorFree', state.executors.filter(item => ['free', 'both'].includes(executorTier(item))).length);
      setCounter('executorPaid', state.executors.filter(item => ['paid', 'both'].includes(executorTier(item))).length);
      setApiStatus(true);
      renderExecutors();
    } catch (error) {
      if (current !== state.executorRequestId) return;
      console.warn('Executor directory:', error);
      el('executorGrid').replaceChildren();
      el('executorEmpty').hidden = false;
      el('executorEmptyTitle').textContent = 'Daftar executor belum tersedia';
      el('executorEmptyDescription').textContent = 'Tidak berhasil mengambil data dari API ScriptBlox. Periksa koneksi atau coba lagi nanti.';
      el('executorRetry').textContent = 'Coba lagi';
      el('executorRetry').append(icon('refresh'));
      el('executorResultCount').textContent = 'Gagal memuat daftar executor';
      setApiStatus(false);
    } finally { clearTimeout(timeout); }
  }
  function sortSetting() {
    const [candidate, direction] = String(state.sort || 'updatedAt:desc').split(':');
    const field = ['createdAt','updatedAt','views','likeCount'].includes(candidate) ? candidate : 'updatedAt';
    return { field, order: direction === 'asc' ? 'asc' : 'desc' };
  }
  function getFilters() {
    const extra = {};
    if (state.filter === 'free') extra.mode = 'free';
    if (state.filter === 'nokey') extra.key = '0';
    if (state.filter === 'verified') extra.verified = '1';
    if (state.filter === 'working') extra.patched = '0';
    if (state.scope === 'universal') extra.universal = '1';
    if (state.scope === 'game' || state.gameTerm) extra.universal = '0';
    if (/^\d{4,20}$/.test(state.gameTerm)) extra.placeId = state.gameTerm;
    return extra;
  }
  function applyPageFilters(scripts) {
    const year = state.year;
    const gameNameTerm = state.gameTerm && !/^\d{4,20}$/.test(state.gameTerm)
      ? state.gameTerm.toLocaleLowerCase() : '';
    return scripts.filter(script => {
      if (year !== 'all') {
        const time = Date.parse(script.createdAt || '');
        if (!Number.isFinite(time) || String(new Date(time).getUTCFullYear()) !== year) return false;
      }
      if (state.scope === 'game' && script.isUniversal) return false;
      if (state.scope === 'universal' && !script.isUniversal) return false;
      if (gameNameTerm && !String(script.game?.name || '').toLocaleLowerCase().includes(gameNameTerm)) return false;
      if (gameNameTerm && state.query) {
        const query = state.query.toLocaleLowerCase();
        if (![script.title,script.owner?.username,script.features].some(v => String(v || '').toLocaleLowerCase().includes(query))) return false;
      }
      return true;
    });
  }
  function updateFilterHint() {
    const notices = [];
    if (state.year !== 'all') notices.push('Tahun dipilih hanya menyaring script pada halaman hasil ini. Gunakan urutan terbaru/terlama untuk mengurutkan seluruh katalog.');
    if (state.gameTerm && !/^\d{4,20}$/.test(state.gameTerm)) notices.push('Nama game/map dicocokkan pada hasil pencarian halaman ini. Untuk filter game paling akurat, gunakan Place ID.');
    el('filterHint').hidden = notices.length === 0;
    el('filterHintText').textContent = notices.join(' ');
  }
  function renderFilteredPage() {
    if (state.view === 'discover') renderResults(applyPageFilters(state.scripts), state.totalPages);
    else renderLocalCollection();
    updateFilterHint();
  }
  function refreshScopeButtons() {
    document.querySelectorAll('[data-scope]').forEach(button => {
      const active = button.dataset.scope === state.scope;
      button.classList.toggle('active',active);
      button.setAttribute('aria-pressed',String(active));
    });
    el('gameField').classList.toggle('is-active',state.scope === 'game');
  }
  async function loadScripts() {
    const current = ++state.requestId;
    skeletons();
    const { field, order } = sortSetting();
    const params = { page: state.page, max: 18, sortBy: field, order, ...getFilters() };
    // ScriptBlox supports exact Place ID; a game name uses the public search endpoint.
    const gameSearch = state.gameTerm && !/^\d{4,20}$/.test(state.gameTerm) ? state.gameTerm : '';
    const searchTerm = gameSearch || state.query;
    const path = searchTerm ? '/search' : '/fetch';
    if (searchTerm) params.q = searchTerm;
    try {
      const data = await apiGet(path, params);
      if (path === '/fetch' && params.page === 1 && !['mode', 'key', 'verified', 'universal', 'patched', 'placeId'].some(key => key in params)) {
        void refreshCatalogCount({ firstResult: data?.result, requestedMax: params.max });
      } else if (state.catalogCountValue === null) {
        void refreshCatalogCount();
      }
      if (current !== state.requestId || state.view !== 'discover') return;
      const list = Array.isArray(data?.result?.scripts) ? data.result.scripts : [];
      state.scripts = list;
      state.totalPages = Math.max(1, Number(data?.result?.totalPages) || 1);
      renderFilteredPage();
      if (!state.trendingLoaded && list.length) renderTrending(list.slice(0, 3));
    } catch (error) {
      if (current !== state.requestId || state.view !== 'discover') return;
      console.error('ScriptBlox API:', error);
      setApiStatus(false);
      state.scripts = [];
      renderError('Tidak bisa terhubung ke ScriptBlox', 'API sedang tidak tersedia, koneksi terputus, atau browser memblokir akses lintas domain. Coba beberapa saat lagi.');
      if (state.catalogCountValue == null) void refreshCatalogCount();
    } finally { finishIntro(); }
  }
  async function loadTrending() {
    try {
      const data = await apiGet('/trending');
      const list = Array.isArray(data?.result?.scripts) ? data.result.scripts : [];
      if (!list.length) throw new Error('Tidak ada data trending');
      state.trending = list;
      state.trendingLoaded = true;
      setCounter('trendingCount', list.length);
      renderTrending(list.slice(0, 3));
      if (state.view === 'trending') renderLocalCollection();
    } catch (error) {
      console.warn('Trending API:', error);
      if (state.scripts.length) renderTrending(state.scripts.slice(0, 3));
      else el('trendingGrid').replaceChildren(node('p', 'trending-fallback', 'Trending belum dapat dimuat.'));
      if (state.view === 'trending') renderError('Trending belum tersedia', 'Coba muat ulang beberapa saat lagi.');
    }
  }
  function renderTrending(list) {
    el('trendingGrid').replaceChildren(...list.map((script, i) => createTrending(script, i)));
    revealNewCards();
  }
  function renderResults(list, totalPages = 1) {
    const grid = el('scriptGrid');
    grid.replaceChildren(...list.map(createCard));
    revealNewCards();
    const empty = el('emptyState');
    empty.hidden = list.length !== 0;
    if (!list.length) {
      el('emptyTitle').textContent = 'Belum ada hasil';
      el('emptyDescription').textContent = state.view === 'saved' ? 'Belum ada script tersimpan. Jelajahi dan tekan ikon bookmark.' : state.year !== 'all' || state.gameTerm ? 'Belum ada script yang cocok di halaman ini. Ubah filter atau coba halaman berikutnya.' : 'Coba kata kunci lain atau ubah filter pencarian.';
    }
    const pagination = el('pagination');
    pagination.hidden = state.view !== 'discover' || totalPages <= 1;
    el('prevBtn').disabled = state.page <= 1;
    el('nextBtn').disabled = state.page >= totalPages;
    el('paginationText').textContent = 'Halaman ' + state.page + ' dari ' + totalPages;
    el('pageLabel').textContent = state.view === 'discover' ? 'Halaman ' + state.page + ' / ' + totalPages : state.view === 'saved' ? 'Koleksi pribadi' : 'Live trending';
    el('resultCount').textContent = list.length + (state.view === 'discover' ? ' script di halaman ini' : ' script ditemukan');
  }
  function renderError(title, message) {
    el('scriptGrid').replaceChildren();
    el('pagination').hidden = true;
    el('emptyState').hidden = false;
    el('emptyTitle').textContent = title;
    el('emptyDescription').textContent = message;
    el('resultCount').textContent = 'Tidak dapat memuat data';
    el('pageLabel').textContent = '—';
  }
  function matchesLocal(script) {
    const q = state.query.trim().toLowerCase();
    const queryMatch = !q || [script.title, script.game?.name, script.owner?.username].some(x => String(x || '').toLowerCase().includes(q));
    if (!queryMatch) return false;
    if (state.filter === 'free' && script.scriptType !== 'free') return false;
    if (state.filter === 'nokey' && script.key !== false) return false;
    if (state.filter === 'verified' && !script.verified) return false;
    if (state.scope === 'universal' && !script.isUniversal) return false;
    if (state.scope === 'game' && script.isUniversal) return false;
    if (state.filter === 'working' && script.isPatched) return false;
    return true;
  }
  function renderLocalCollection() {
    const source = state.view === 'saved' ? Object.values(state.saved) : state.trending;
    const { field, order } = sortSetting();
    const direction = order === 'asc' ? 1 : -1;
    const sorted = applyPageFilters(source.filter(matchesLocal)).sort((a, b) => {
      if (field === 'views' || field === 'likeCount') return direction * ((Number(a[field]) || 0) - (Number(b[field]) || 0));
      return direction * ((Date.parse(a[field]) || 0) - (Date.parse(b[field]) || 0));
    });
    renderResults(sorted, 1);
  }
  function setView(view) {
    if (!['discover', 'trending', 'saved', 'executors', 'credits'].includes(view)) return;
    state.requestId++;
    state.view = view;
    state.page = 1;
    state.query = '';
    el('searchInput').value = '';
    document.querySelectorAll('[data-view]').forEach(button => {
      const active = button.dataset.view === view;
      button.classList.toggle('active', active);
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    requestAnimationFrame(syncDockGlow);
    const titles = { discover: ['Discover', 'LIBRARY', 'Jelajahi semua script', 'Temukan script terbaru dari seluruh komunitas.'], trending: ['Trending', 'TRENDING', 'Script paling trending', 'Script yang sedang populer di komunitas saat ini.'], saved: ['Tersimpan', 'YOUR COLLECTION', 'Script tersimpan', 'Koleksi script favoritmu disimpan di browser ini.'], executors: ['Executors', 'EXECUTORS', 'Direktori executor', 'Daftar executor terbaru dari ScriptBlox.'], credits: ['Credits', 'OUR TEAM', 'Tim YuuZ Scripts', 'Developer dan kontributor di balik website ini.'] };
    const [label, kicker, title, subtitle] = titles[view];
    el('currentPage').textContent = label;
    el('resultKicker').textContent = kicker;
    el('resultsTitle').textContent = title;
    el('resultsSubtitle').textContent = subtitle;
    document.querySelector('.hero').hidden = view !== 'discover';
    document.querySelector('.site-stats').hidden = view === 'executors' || view === 'credits';
    el('explore').hidden = view === 'executors' || view === 'credits';
    el('trendingSection').hidden = view !== 'discover';
    el('resultsSection').hidden = view === 'executors' || view === 'credits';
    el('executorsSection').hidden = view !== 'executors';
    el('creditsSection').hidden = view !== 'credits';
    if (view === 'discover') loadScripts(); else if (view === 'executors') loadExecutors(); else if (view !== 'credits') renderLocalCollection();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function submitSearch(query) {
    const value = String(query || '').trim();
    if (state.view !== 'discover') setView('discover');
    state.query = value;
    state.page = 1;
    el('searchInput').value = value;
    el('resultsTitle').textContent = value ? 'Hasil untuk “' + value + '”' : 'Jelajahi semua script';
    el('resultsSubtitle').textContent = value ? 'Script yang cocok dengan pencarianmu.' : 'Temukan script terbaru dari seluruh komunitas.';
    loadScripts();
    el('resultsSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function updateModalSave() {
    el('modalSave').classList.toggle('saved', isSaved(state.selected));
    el('modalSave').setAttribute('aria-label', isSaved(state.selected) ? 'Hapus dari tersimpan' : 'Simpan script');
  }
  function detailedNumber(value) {
    return (typeof value === 'number' && Number.isFinite(value)) || (typeof value === 'string' && value.trim() && Number.isFinite(Number(value)))
      ? integerFormat.format(Number(value)) : '—';
  }
  function detailedDate(value) {
    if (!value) return 'Tidak tersedia';
    const date = new Date(value);
    return Number.isFinite(date.getTime()) ? dateFormat.format(date) : 'Tidak tersedia';
  }
  function renderModalDetails(script, status = 'loading') {
    const cover = el('modalCover');
    cover.replaceChildren();
    addImage(cover, script);
    el('modalGame').textContent = gameName(script);
    el('modalTitle').textContent = script.title || 'Untitled Script';
    el('modalBadges').replaceChildren();
    badgeElements(script, el('modalBadges'));
    const description = typeof script.features === 'string' && script.features.trim()
      ? script.features.trim()
      : (typeof script.description === 'string' && script.description.trim() ? script.description.trim() : 'Creator belum menambahkan deskripsi fitur untuk script ini.');
    el('modalDescription').textContent = description;
    const longDescription = description.length > 260 || description.split(/\r\n|\n|\r/).length > 6;
    el('modalDescription').classList.toggle('is-collapsed', longDescription);
    el('modalDescriptionToggle').hidden = !longDescription;
    el('modalDescriptionToggle').setAttribute('aria-expanded', 'false');
    el('modalDescriptionToggle').firstChild.textContent = 'Baca deskripsi lengkap ';
    el('modalViews').textContent = detailedNumber(script.views);
    el('modalLikes').textContent = detailedNumber(script.likeCount);
    el('modalDislikes').textContent = detailedNumber(script.dislikeCount);

    const owner = script.owner && typeof script.owner === 'object' ? script.owner : null;
    const creator = typeof owner?.username === 'string' && owner.username.trim() ? owner.username.trim() : 'Creator belum tersedia';
    el('modalOwner').textContent = creator;
    el('modalOwnerVerified').hidden = !Boolean(owner?.verified);
    el('modalOwnerStatus').textContent = owner?.verified ? 'Terverifikasi oleh ScriptBlox' : (typeof owner?.status === 'string' && owner.status ? owner.status : 'Akun komunitas ScriptBlox');
    const ownerAvatar = el('modalOwnerAvatar');
    ownerAvatar.replaceChildren();
    ownerAvatar.append(node('span', '', creator === 'Creator belum tersedia' ? '?' : Array.from(creator)[0].toUpperCase()));
    const ownerImage = safeExternalLink(owner?.profilePicture);
    if (ownerImage) {
      const img = node('img');
      img.src = ownerImage;
      img.alt = '';
      img.loading = 'lazy';
      img.referrerPolicy = 'no-referrer';
      img.addEventListener('error', () => img.remove());
      ownerAvatar.prepend(img);
    }

    const type = typeof script.scriptType === 'string' ? script.scriptType.toLowerCase() : '';
    el('modalType').textContent = type === 'free' ? 'Gratis' : type === 'paid' || type === 'premium' ? 'Berbayar' : type || 'Tidak tersedia';
    el('modalKey').textContent = script.key === true || Boolean(script.keyLink) ? 'Key diperlukan' : script.key === false ? 'Tanpa key' : 'Tidak diketahui';
    el('modalPatch').textContent = script.isPatched === true ? 'Patched' : script.isPatched === false ? 'Tidak ditandai patched' : 'Tidak tersedia';
    el('modalUniversal').textContent = script.isUniversal === true ? 'Universal' : script.isUniversal === false ? 'Game tertentu' : 'Tidak tersedia';
    el('modalDate').textContent = detailedDate(script.createdAt);
    el('modalUpdated').textContent = detailedDate(script.updatedAt);
    el('modalGameName').textContent = script.game?.name || (script.isUniversal ? 'Universal Script' : 'Tidak tersedia');
    el('modalScriptId').textContent = script._id || scriptId(script) || 'Tidak tersedia';

    const tags = Array.isArray(script.tags) ? script.tags.filter(tag => typeof tag === 'string' && tag.trim()).slice(0, 24) : [];
    el('modalTags').replaceChildren(...tags.map(tag => node('span', '', tag)));
    el('modalTagsWrap').hidden = tags.length === 0;
    const keyLink = safeExternalLink(script.keyLink);
    el('modalKeyLink').hidden = !keyLink;
    if (keyLink) el('modalKeyLink').href = keyLink;

    el('modalCode').textContent = state.selectedCode || (status === 'loading' ? 'Memuat kode script dari ScriptBlox...' : 'Kode tidak tersedia dari API. Silakan buka script aslinya.');
    const lines = state.selectedCode ? state.selectedCode.split(/\r\n|\n|\r/).length : 0;
    el('modalCodeMeta').textContent = state.selectedCode ? `Lua · ${integerFormat.format(lines)} baris · ${integerFormat.format(state.selectedCode.length)} karakter` : 'Lua · kode belum tersedia';
    el('modalDataStatus').textContent = status === 'ready' ? 'Detail terbaru' : status === 'error' ? 'Data terbatas' : 'Memuat detail...';
    el('modalDataStatus').dataset.state = status;
    const slug = script.slug || scriptId(script);
    el('originalLink').href = slug ? 'https://scriptblox.com/script/' + encodeURIComponent(slug) : 'https://scriptblox.com';
    updateModalSave();
  }
  function openModal(script) {
    modalRequestId++;
    const current = modalRequestId;
    state.selected = { ...script };
    state.selectedCode = typeof script.script === 'string' ? script.script : '';
    el('modalBackdrop').hidden = false;
    document.body.style.overflow = 'hidden';
    const modalBody = el('modalBackdrop').querySelector('.modal-body');
    if (modalBody) modalBody.scrollTop = 0;
    renderModalDetails(state.selected, scriptId(script) ? 'loading' : 'error');
    el('modalClose').focus();
    // Always hydrate detail data, even when the search card already has code:
    // the detail endpoint exposes owner, description, votes, tags and key link.
    if (scriptId(script)) {
      apiGet('/' + encodeURIComponent(scriptId(script))).then(data => {
        if (current !== modalRequestId) return;
        const details = data?.script || data?.result?.script || data?.result || data;
        if (!details || typeof details !== 'object') throw new Error('Respons detail tidak dikenali');
        state.selected = { ...state.selected, ...Object.fromEntries(Object.entries(details).filter(([, value]) => value !== undefined && value !== null)) };
        if (typeof details.script === 'string') state.selectedCode = details.script;
        renderModalDetails(state.selected, 'ready');
      }).catch(error => {
        if (current !== modalRequestId) return;
        console.error('Script details:', error);
        renderModalDetails(state.selected, 'error');
      });
    }
  }
  function closeModal() {
    modalRequestId++;
    el('modalBackdrop').hidden = true;
    document.body.style.overflow = '';
  }

  function syncDockGlow() {
    const dock = el('bottomDock');
    const active = dock?.querySelector('.mobile-nav-item.active');
    const highlight = el('dockActiveGlow');
    if (!active || !highlight) return;
    highlight.style.width = active.offsetWidth + 'px';
    highlight.style.transform = 'translate3d(' + active.offsetLeft + 'px,0,0)';
  }

  // Wire page interactions.
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
  el('homeBtn').addEventListener('click', () => setView('discover'));
  document.querySelectorAll('[data-exec-filter]').forEach(button => button.addEventListener('click', () => {
    state.executorFilter = button.dataset.execFilter;
    document.querySelectorAll('[data-exec-filter]').forEach(item => item.classList.toggle('active', item === button));
    renderExecutors();
  }));
  el('executorSearch').addEventListener('input', event => {
    state.executorQuery = event.target.value;
    renderExecutors();
  });
  el('executorRefresh').addEventListener('click', () => loadExecutors(true));
  el('executorRetry').addEventListener('click', () => {
    if (!state.executorsLoaded) return loadExecutors(true);
    state.executorFilter = 'all';
    state.executorQuery = '';
    el('executorSearch').value = '';
    document.querySelectorAll('[data-exec-filter]').forEach(item => item.classList.toggle('active', item.dataset.execFilter === 'all'));
    renderExecutors();
  });
  document.querySelectorAll('[data-query]').forEach(button => button.addEventListener('click', () => submitSearch(button.dataset.query)));
  // V16: one compact filter drawer belongs to the search area, not the results list.
  const filterToggle = el('filterToggle');
  const searchFilters = el('searchFilters');
  const activeFilterCount = el('filterActiveCount');
  const setFilterOpen = (open) => {
    const expanded = Boolean(open);
    searchFilters.hidden = !expanded;
    filterToggle.setAttribute('aria-expanded', String(expanded));
  };
  const updateFilterCount = () => {
    const count = Number(state.scope !== 'all') + Number(state.filter !== 'all') +
      Number(state.year !== 'all') + Number(state.sort !== 'updatedAt:desc') +
      Number(Boolean(state.gameTerm));
    activeFilterCount.textContent = String(count);
    activeFilterCount.hidden = count === 0;
    filterToggle.classList.toggle('has-filters', count > 0);
  };
  filterToggle.addEventListener('click', () => setFilterOpen(searchFilters.hidden));
  el('filterViewResults').addEventListener('click', () => {
    // Flush any pending game-name debounce before moving to the result cards.
    if (state.gameTerm !== el('gameFilterInput').value.trim()) {
      clearTimeout(gameFilterTimer);
      applyGameTerm();
    }
    setFilterOpen(false);
    el('resultsSection').scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto', block: 'start' });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !searchFilters.hidden) { setFilterOpen(false); filterToggle.focus(); }
  });
  updateFilterCount();

  // Filters: cross-catalog scope and exact game Place ID are server-side.
  document.querySelectorAll('[data-scope]').forEach(button => button.addEventListener('click', () => {
    state.scope = button.dataset.scope;
    state.page = 1;
    if (state.scope !== 'game') { state.gameTerm = ''; el('gameFilterInput').value = ''; }
    refreshScopeButtons();
    if (state.view === 'discover') loadScripts(); else renderLocalCollection();
    updateFilterHint(); updateFilterCount();
  }));
  let gameFilterTimer = 0;
  const applyGameTerm = () => {
    state.gameTerm = el('gameFilterInput').value.trim();
    if (state.gameTerm) state.scope = 'game';
    state.page = 1;
    refreshScopeButtons();
    if (state.view === 'discover') loadScripts(); else renderLocalCollection();
    updateFilterHint(); updateFilterCount();
  };
  el('gameFilterInput').addEventListener('input', () => {
    clearTimeout(gameFilterTimer);
    gameFilterTimer = setTimeout(applyGameTerm, 450);
  });
  el('gameFilterInput').addEventListener('keydown', event => {
    if (event.key === 'Enter') { event.preventDefault(); clearTimeout(gameFilterTimer); applyGameTerm(); }
  });
  for (let year = new Date().getFullYear(); year >= 2016; year--) {
    el('yearSelect').append(new Option(String(year), String(year)));
  }
  el('yearSelect').addEventListener('change', event => {
    state.year = event.target.value;
    renderFilteredPage(); updateFilterCount();
  });
  function resetScriptFilters() {
    clearTimeout(gameFilterTimer);
    state.scope = 'all'; state.gameTerm = ''; state.year = 'all';
    state.filter = 'all'; state.sort = 'updatedAt:desc'; state.page = 1;
    state.query = ''; el('searchInput').value = '';
    el('resultsTitle').textContent = 'Jelajahi semua script';
    el('resultsSubtitle').textContent = 'Temukan script terbaru dari seluruh komunitas.';
    el('gameFilterInput').value = ''; el('yearSelect').value = 'all'; el('sortSelect').value = state.sort;
    document.querySelectorAll('[data-filter]').forEach(button => button.classList.toggle('selected', button.dataset.filter === 'all'));
    refreshScopeButtons(); updateFilterHint(); updateFilterCount();
    if (state.view === 'discover') loadScripts(); else renderLocalCollection();
  }
  el('clearAllFilters').addEventListener('click', resetScriptFilters);
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    state.filter = button.dataset.filter;
    state.page = 1;
    document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('selected', item === button));
    updateFilterCount();
    if (state.view === 'discover') loadScripts(); else renderLocalCollection();
  }));
  el('searchForm').addEventListener('submit', event => { event.preventDefault(); clearTimeout(searchTimer); submitSearch(el('searchInput').value); });
  el('searchInput').addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { if (el('searchInput').value.trim() || state.query) submitSearch(el('searchInput').value); }, 700);
  });
  el('sortSelect').addEventListener('change', event => {
    state.sort = event.target.value;
    state.page = 1; updateFilterCount();
    if (state.view === 'discover') loadScripts(); else renderLocalCollection();
  });
  el('catalogRefreshBtn').addEventListener('click', () => { void refreshCatalogCount({ force: true }); });
  el('refreshBtn').addEventListener('click', () => { if (state.view === 'discover') loadScripts(); else if (state.view === 'trending') loadTrending(); else renderLocalCollection(); });
  el('resetBtn').addEventListener('click', () => {
    if (state.view === 'saved') { setView('discover'); return; }
    resetScriptFilters();
    el('resultsSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  el('viewAllTrending').addEventListener('click', () => setView('trending'));
  el('prevBtn').addEventListener('click', () => { if (state.page > 1) { state.page--; loadScripts(); el('resultsSection').scrollIntoView(); } });
  el('nextBtn').addEventListener('click', () => { if (state.page < state.totalPages) { state.page++; loadScripts(); el('resultsSection').scrollIntoView(); } });
  el('modalClose').addEventListener('click', closeModal);
  el('modalDescriptionToggle').addEventListener('click', () => {
    const description = el('modalDescription');
    const expanded = description.classList.toggle('is-collapsed') === false;
    el('modalDescriptionToggle').setAttribute('aria-expanded', String(expanded));
    el('modalDescriptionToggle').firstChild.textContent = expanded ? 'Ringkas deskripsi ' : 'Baca deskripsi lengkap ';
  });
  el('modalBackdrop').addEventListener('click', event => { if (event.target === el('modalBackdrop')) closeModal(); });
  el('modalSave').addEventListener('click', () => state.selected && toggleSaved(state.selected));
  el('copyBtn').addEventListener('click', async () => {
    if (!state.selectedCode) return toast('Kode script belum tersedia');
    try { await navigator.clipboard.writeText(state.selectedCode); toast('Kode berhasil disalin!'); }
    catch { toast('Salin gagal. Pilih kode secara manual.'); }
  });
  el('downloadBtn').addEventListener('click', () => {
    if (!state.selectedCode) return toast('Kode script belum tersedia');
    const blob = new Blob([state.selectedCode], { type: 'text/plain;charset=utf-8' });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.download = (state.selected?.slug || 'roblox-script').replace(/[^a-z0-9_-]/gi, '-').slice(0, 70) + '.lua';
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
    toast('Download dimulai');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { if (!el('modalBackdrop').hidden) closeModal(); window.YuuZI18n?.closeMenu(); }
    if ((event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')) {
      event.preventDefault();
      (state.view === 'executors' ? el('executorSearch') : el('searchInput')).focus();
    }
  });

  // Thin reading-progress glow at the top of the viewport.
  let scrollFrame = 0;
  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el('scrollProgress').style.transform = `scaleX(${progress})`;
      scrollFrame = 0;
    });
  }, { passive: true });

  // Stop decorative motion while the page is in a background tab.
  document.addEventListener('visibilitychange', () => {
    document.body.classList.toggle('tab-idle', document.hidden);
    if (!document.hidden && Date.now() - state.catalogCountAt >= CATALOG_REFRESH_INTERVAL) void refreshCatalogCount({ force: true });
  });

  // No request while the page is hidden; resume when visible.
  window.setInterval(() => { if (!document.hidden) void refreshCatalogCount(); }, CATALOG_REFRESH_INTERVAL);
  window.addEventListener('online', () => { void refreshCatalogCount({ force: true }); });

  let dockResizeFrame = 0;
  window.addEventListener('resize', () => {
    if (dockResizeFrame) return;
    dockResizeFrame = requestAnimationFrame(() => { syncDockGlow(); dockResizeFrame = 0; });
  }, { passive: true });

  window.addEventListener('yuuz:languagechange', () => {
    const locale = window.YuuZI18n?.locale() || 'id-ID';
    numberFormat = new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 });
    integerFormat = new Intl.NumberFormat(locale);
    dateFormat = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric' });
    for (const key of counterFrames.keys()) cancelAnimationFrame(counterFrames.get(key));
    counterFrames.clear();
    updateSavedCount();
    if (state.catalogCountValue !== null) setCounter('catalogCount', state.catalogCountValue);
    updateCatalogStatus(catalogSyncMode);
    // Preserve the current filters, query and selected tab while applying locale formatting.
    if (state.view === 'executors' && state.executorsLoaded) renderExecutors();
    else if (state.view === 'discover' && state.scripts.length) renderFilteredPage();
    else if (state.view === 'trending' || state.view === 'saved') renderLocalCollection();
    if (!el('modalBackdrop').hidden && state.selected) renderModalDetails(state.selected, 'ready');
    window.YuuZI18n?.refresh();
    requestAnimationFrame(syncDockGlow);
  });

  updateSavedCount();
  refreshScopeButtons();
  updateFilterHint();
  initializeCachedCount();
  if (state.catalogCountValue === null) updateCatalogStatus('loading');
  skeletons();
  requestAnimationFrame(syncDockGlow);
  loadScripts();
  loadTrending();
})();
