/* Portfolio interactions. Content lives in data.js. */
(function () {
  'use strict';

  const S = window.SITE;
  const I = window.I18N;
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let lang = root.lang === 'ko' ? 'ko' : 'en';
  let firstRender = true;

  const t = (key) => (I[lang] && I[lang][key]) || I.en[key] || key;
  const L = (v) => (v && typeof v === 'object' ? v[lang] || v.en : v);
  const fmt = (n, d = 0) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };
  const session = {
    get(k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };

  // Element builder. `html` is only ever fed trusted strings from data.js / i18n.
  function h(tag, props, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(props || {})) {
      if (v == null || v === false) continue;
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else if (k === 'html') n.innerHTML = v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? '' : v);
    }
    for (const c of kids.flat()) {
      if (c == null || c === false) continue;
      n.append(c.nodeType ? c : document.createTextNode(String(c)));
    }
    return n;
  }
  const ICONS = {
    integrate: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h4l6 7h8M3 19h4l6-7M3 12h10"/></svg>',
    recover: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="4" stroke-dasharray="3 3"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>',
    constrain: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h18M3 20h18M3 12c2.2-5 4.4-5 6.6 0s4.4 5 6.6 0 3.1-3 4.8-1"/></svg>',
    contextualize: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></svg>',
    tool: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m5 7 5 5-5 5M13 18h6"/></svg>',
    research: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6l-5.4 9.2A1.9 1.9 0 0 0 6.2 21h11.6a1.9 1.9 0 0 0 1.6-2.8L14 9V3"/><path d="M7.5 15h9"/></svg>',
    data: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5.5" rx="7.5" ry="2.8"/><path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8"/></svg>',
    arrow: '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10m-4-4 4 4-4 4"/></svg>'
  };

  /* ------------------------------------------------------------------
     Toast
     ------------------------------------------------------------------ */
  const toastEl = $('#toast');
  let toastTimer = 0;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
  }
  async function copy(text, msg) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = h('textarea', { style: 'position:fixed;opacity:0' });
      ta.value = text; document.body.append(ta); ta.select();
      try { document.execCommand('copy'); } catch (err) { /* ignore */ }
      ta.remove();
    }
    toast(msg);
  }

  /* ------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------ */
  const revealIO = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('in');
      revealIO.unobserve(e.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) : null;

  function reveal(node, i = 0) {
    node.classList.add('reveal');
    if (!firstRender || !revealIO || reduce) {
      node.classList.add('in');
      return node;
    }
    node.style.transitionDelay = Math.min(i, 8) * 60 + 'ms';
    revealIO.observe(node);
    return node;
  }

  /* ------------------------------------------------------------------
     i18n + theme
     ------------------------------------------------------------------ */
  function applyI18n() {
    root.lang = lang;
    $$('[data-i18n]').forEach((n) => { n.textContent = t(n.dataset.i18n); });
    $$('[data-i18n-html]').forEach((n) => { n.innerHTML = t(n.dataset.i18nHtml); });
    $$('[data-i18n-placeholder]').forEach((n) => { n.placeholder = t(n.dataset.i18nPlaceholder); });
    document.title = lang === 'ko' ? '이준혁 — 의료영상 AI' : 'Junhyeok Lee — Medical Imaging AI';
    $('#langToggle').setAttribute('aria-label', lang === 'ko' ? 'Switch to English' : '한국어로 보기');
    $$('[data-zoom]').forEach((n) => n.setAttribute('aria-label', t('method.enlarge')));
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    store.set('lang', lang);
    const url = new URL(location.href);
    if (lang === 'ko') url.searchParams.set('lang', 'ko'); else url.searchParams.delete('lang');
    history.replaceState(null, '', url);
    applyI18n();
    renderAll();
  }

  function setTheme(next) {
    root.setAttribute('data-theme', next);
    store.set('theme', next);
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'dark' ? '#07090d' : '#fbfbfc');
    document.dispatchEvent(new Event('themechange'));
  }

  $('#langToggle').addEventListener('click', () => setLang(lang === 'en' ? 'ko' : 'en'));
  $('#themeToggle').addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

  /* ------------------------------------------------------------------
     Nav: scrolled state, progress, active section, mobile menu
     ------------------------------------------------------------------ */
  const nav = $('#nav');
  const progress = $('#progress');
  const navLinks = $('#navLinks');
  const menuBtn = $('#menuBtn');

  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navLinks.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = window.scrollY;
      nav.classList.toggle('scrolled', y > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      updateTimeline();
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  if ('IntersectionObserver' in window) {
    const links = $$('a', navLinks);
    const spy = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      }
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['research', 'open-source', 'papers', 'recognition', 'journey', 'about', 'contact']
      .forEach((id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  // Live repo stats (GitHub stars, npm downloads), filled in by loadStars / loadNpm.
  const live = { npmByPkg: {}, stars: {} };

  /* ------------------------------------------------------------------
     Research directions: fill each tab's title and each panel's intro
     ------------------------------------------------------------------ */
  function renderCaps() {
    S.capabilities.forEach((c) => {
      const title = $(`[data-cap-title="${c.id}"]`);
      if (title) title.textContent = L(c.title);
      const intro = $(`[data-cap-intro="${c.id}"]`);
      if (!intro) return;
      intro.textContent = '';
      intro.append(
        h('span', { class: 'dir-icon', html: ICONS[c.id] }),
        h('p', { class: 'dir-body', text: L(c.body) }),
        h('p', { class: 'dir-related' }, h('span', { class: 'dir-related-k', text: t('research.related') }), c.works.join(' · '))
      );
    });
  }

  /* ------------------------------------------------------------------
     Figure lightbox
     ------------------------------------------------------------------ */
  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightboxImg');
  document.addEventListener('click', (e) => {
    const z = e.target.closest('[data-zoom]');
    if (!z) return;
    if (!lightbox || typeof lightbox.showModal !== 'function') { window.open(z.dataset.zoom, '_blank', 'noopener'); return; }
    const img = $('img', z);
    lightboxImg.src = z.dataset.zoom;
    lightboxImg.alt = img ? img.alt : '';
    lightbox.showModal();
  });
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.closest('[data-close]')) lightbox.close();
    });
  }

  /* ------------------------------------------------------------------
     Case studies — tabs
     ------------------------------------------------------------------ */
  const tabs = $$('#caseTabs [role="tab"]');

  function selectCase(id, focusTab) {
    tabs.forEach((tab) => {
      const on = tab.dataset.case === id;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      if (on && focusTab) tab.focus();
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      panel.hidden = !on;
      if (on) {
        panel.classList.remove('enter');
        void panel.offsetWidth;
        panel.classList.add('enter');
      }
    });
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectCase(tab.dataset.case));
    tab.addEventListener('keydown', (e) => {
      let j = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') j = 0;
      if (e.key === 'End') j = tabs.length - 1;
      if (j !== null) { e.preventDefault(); selectCase(tabs[j].dataset.case, true); }
    });
  });

  /* ------------------------------------------------------------------
     Open source
     ------------------------------------------------------------------ */
  let ossFilter = 'all';
  function renderRepos() {
    const box = $('#repos');
    box.textContent = '';
    S.repos.forEach((r, i) => {
      const gh = r.repo ? `https://github.com/${r.repo}` : null;
      const npmUrl = r.npm ? `https://www.npmjs.com/package/${r.npm}` : null;
      const href = r.url || gh || npmUrl;
      const kindLabel = { tool: t('oss.tool'), research: t('oss.research'), data: t('oss.data') }[r.kind];
      const stars = r.repo ? live.stars[r.repo.toLowerCase()] : 0;
      const dl = r.npm ? live.npmByPkg[r.npm] : null;

      const meta = h('div', { class: 'repo-meta' },
        h('span', {}, h('i', { class: 'lang-dot ' + r.lang }), r.lang),
        stars ? h('span', { class: 'stars', title: 'GitHub stars' }, `★ ${stars}`) : null,
        dl ? h('span', { class: 'dl' }, `↓ ${fmt(dl)} ${lang === 'ko' ? '/ 년' : '/ yr'}`) : null,
        gh ? h('a', { href: gh, target: '_blank', rel: 'noopener' }, 'GitHub ↗') : null,
        npmUrl ? h('a', { href: npmUrl, target: '_blank', rel: 'noopener' }, 'npm ↗') : null,
        r.demo ? h('a', { href: r.demo, target: '_blank', rel: 'noopener' }, t('oss.demo') + ' ↗') : null,
        r.data ? h('a', { href: r.data, target: '_blank', rel: 'noopener' }, 'Hugging Face ↗') : null
      );

      let cmd = null;
      if (r.cmd) {
        const btn = h('button', { type: 'button', text: t('oss.copy') });
        btn.addEventListener('click', () => {
          copy(r.cmd, t('oss.copied'));
          btn.textContent = t('oss.copied');
          setTimeout(() => { btn.textContent = t('oss.copy'); }, 1500);
        });
        cmd = h('div', { class: 'repo-cmd' }, h('code', { text: r.cmd }), btn);
      }

      const card = h('article', { class: 'card repo', 'data-kind': r.kind },
        h('div', { class: 'repo-top' },
          h('span', { class: 'repo-icon', html: ICONS[r.kind] }),
          h('h3', { class: 'repo-name' }, h('a', { href, target: '_blank', rel: 'noopener' }, r.name)),
          h('span', { class: 'repo-kind', text: kindLabel })),
        h('p', { text: L(r.desc) }),
        cmd,
        meta
      );
      card.hidden = ossFilter !== 'all' && ossFilter !== r.kind;
      box.append(reveal(card, i % 3));
    });
  }
  $$('#ossFilters .chip').forEach((chip) => chip.addEventListener('click', () => {
    ossFilter = chip.dataset.f;
    $$('#ossFilters .chip').forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    $$('#repos .repo').forEach((card) => { card.hidden = ossFilter !== 'all' && card.dataset.kind !== ossFilter; card.classList.add('in'); });
  }));

  /* ------------------------------------------------------------------
     Publications
     ------------------------------------------------------------------ */
  let pubFilter = 'all';
  let pubQuery = '';
  const AXES = ['integrate', 'recover', 'constrain', 'contextualize', 'translate'];
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  function renderPubFilters() {
    const box = $('#pubFilters');
    box.textContent = '';
    const count = (fn) => S.publications.filter(fn).length;
    const opts = [
      ['all', `${t('pubs.all')} ${S.publications.length}`],
      ['journal', `${t('pubs.journal')} ${count((p) => p.type === 'journal')}`],
      ['conference', `${t('pubs.conference')} ${count((p) => p.type === 'conference')}`],
      ...AXES.map((a) => ['axis:' + a, cap(a)])
    ];
    opts.forEach(([val, text]) => {
      box.append(h('button', {
        type: 'button', class: 'chip', 'aria-pressed': String(val === pubFilter),
        onclick: () => { pubFilter = val; renderPubFilters(); renderPubs(); }
      }, text));
    });
  }

  // Wrap query matches in <mark> without using innerHTML.
  function highlight(text, q) {
    const frag = document.createDocumentFragment();
    if (!q) { frag.append(text); return frag; }
    const lower = text.toLowerCase();
    let i = 0, j;
    while ((j = lower.indexOf(q, i)) !== -1) {
      frag.append(text.slice(i, j), h('mark', { text: text.slice(j, j + q.length) }));
      i = j + q.length;
    }
    frag.append(text.slice(i));
    return frag;
  }

  function renderPubs() {
    const box = $('#pubs');
    box.textContent = '';
    const q = pubQuery.trim().toLowerCase();
    const list = S.publications.filter((p) => {
      if (pubFilter === 'journal' || pubFilter === 'conference') { if (p.type !== pubFilter) return false; }
      else if (pubFilter.startsWith('axis:') && p.axis !== pubFilter.slice(5)) return false;
      if (!q) return true;
      return (p.title + ' ' + p.venue + ' ' + p.authors.join(' ') + ' ' + p.year).toLowerCase().includes(q);
    });
    $('#pubsEmpty').hidden = list.length > 0;

    list.forEach((p, i) => {
      const authors = h('p', { class: 'pub-authors' });
      p.authors.forEach((a, k) => {
        if (k) authors.append(', ');
        const me = a.replace('*', '') === 'Junhyeok Lee';
        authors.append(me ? h('b', {}, highlight(a, q)) : highlight(a, q));
      });
      const badge = p.badge ? L(p.badge) : null;
      const links = h('div', { class: 'pub-links' },
        p.links.paper ? h('a', { href: p.links.paper, target: '_blank', rel: 'noopener' }, t('work.paper')) : null,
        p.links.code ? h('a', { href: p.links.code, target: '_blank', rel: 'noopener' }, t('work.code')) : null,
        p.links.data ? h('a', { href: p.links.data, target: '_blank', rel: 'noopener' }, t('work.data')) : null
      );
      const li = h('li', { class: 'pub' },
        h('span', { class: 'pub-year', text: p.year }),
        h('div', {},
          h('h3', { class: 'pub-title' }, h('a', { href: p.links.paper, target: '_blank', rel: 'noopener' }, highlight(p.title, q))),
          authors,
          h('div', { class: 'pub-venue' },
            h('span', { class: 'tag venue-tag' }, highlight(p.venue, q)),
            badge ? h('span', { class: 'tag badge', text: badge }) : null,
            h('span', { class: 'tag axis', text: p.axis }),
            p.note ? h('span', { class: 'tag axis', text: L(p.note) }) : null
          )
        ),
        links
      );
      box.append(firstRender ? reveal(li, i) : li);
    });
  }
  let searchTimer = 0;
  $('#pubSearch').addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { pubQuery = e.target.value; renderPubs(); }, 80);
  });

  /* ------------------------------------------------------------------
     Recognition, journey, stack
     ------------------------------------------------------------------ */
  function renderAwards() {
    const box = $('#awards');
    box.textContent = '';
    S.awards.forEach((a, i) => {
      box.append(reveal(h('article', { class: 'card award' },
        h('span', { class: 'award-medal', 'aria-hidden': 'true' }),
        h('span', { class: 'award-year', text: a.year }),
        h('h3', { text: L(a.title) }),
        h('p', { text: L(a.org) })
      ), i));
    });
  }

  function renderTimeline() {
    const box = $('#tlList');
    box.textContent = '';
    S.timeline.forEach((it, i) => {
      box.append(reveal(h('li', { class: 'tl-item' + (it.next ? ' next' : '') },
        h('span', { class: 'tl-year', text: it.year }),
        h('div', {}, h('h3', { text: L(it.title) }), h('p', { text: L(it.body) }))
      ), i));
    });
    updateTimeline();
  }
  function updateTimeline() {
    const rail = $('.tl-rail');
    const fill = $('#tlFill');
    if (!rail || !fill) return;
    const r = rail.getBoundingClientRect();
    const mark = window.innerHeight * 0.62;
    const hgt = Math.max(0, Math.min(r.height, mark - r.top));
    fill.style.height = hgt + 'px';
    $$('#tlList .tl-item').forEach((li) => {
      const top = li.getBoundingClientRect().top + 26;
      li.classList.toggle('lit', !li.classList.contains('next') && top < mark);
    });
  }

  function renderStack() {
    const box = $('#stack');
    box.textContent = '';
    S.stack.forEach((s) => box.append(h('li', { text: s })));
  }

  /* ------------------------------------------------------------------
     Contact
     ------------------------------------------------------------------ */
  $('#copyEmail').addEventListener('click', () => copy(S.person.email, t('contact.copied')));

  /* ------------------------------------------------------------------
     Command palette
     ------------------------------------------------------------------ */
  const cmdk = $('#cmdk');
  const cmdInput = $('#cmdInput');
  const cmdList = $('#cmdList');
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  $('#cmdKey').textContent = isMac ? '⌘K' : 'Ctrl K';
  let cmdItems = [];
  let cmdSel = 0;
  let lastFocus = null;

  function go(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }
  const openUrl = (u) => window.open(u, '_blank', 'noopener');

  function commands() {
    const sec = [
      ['about', t('nav.about')], ['journey', t('journey.eyebrow')], ['research', t('nav.research')],
      ['papers', t('nav.papers')], ['recognition', t('rec.eyebrow')], ['open-source', t('nav.oss')], ['contact', t('nav.contact')]
    ];
    const list = [];
    sec.forEach(([id, label]) => list.push({ group: t('cmd.go'), label, hint: '#' + id, run: () => go(id) }));
    S.capabilities.forEach((c) => list.push({
      group: t('research.eyebrow'), label: `${c.name} — ${c.works[0]}`, hint: c.n,
      run: () => { selectCase(c.id); go('research'); }
    }));
    list.push(
      { group: t('cmd.open'), label: 'Google Scholar', hint: '↗', run: () => openUrl(S.person.links.scholar) },
      { group: t('cmd.open'), label: 'GitHub', hint: '↗', run: () => openUrl(S.person.links.github) },
      { group: t('cmd.open'), label: 'Hugging Face', hint: '↗', run: () => openUrl(S.person.links.huggingface) },
      { group: t('cmd.open'), label: 'AICON Lab', hint: '↗', run: () => openUrl(S.person.links.lab) },
      { group: t('cmd.action'), label: t('cmd.lang'), hint: 'EN/KO', run: () => setLang(lang === 'en' ? 'ko' : 'en') },
      { group: t('cmd.action'), label: t('cmd.theme'), hint: '◐', run: () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark') },
      { group: t('cmd.action'), label: t('cmd.copyEmail'), hint: '@', run: () => copy(S.person.email, t('contact.copied')) }
    );
    S.publications.forEach((p) => list.push({
      group: t('nav.papers'), label: p.title, hint: `${p.venue} ${p.year}`, run: () => openUrl(p.links.paper)
    }));
    return list;
  }

  function renderCmd() {
    const q = cmdInput.value.trim().toLowerCase();
    cmdItems = commands().filter((c) => !q || (c.label + ' ' + c.hint + ' ' + c.group).toLowerCase().includes(q));
    if (!q) cmdItems = cmdItems.filter((c) => c.group !== t('nav.papers'));
    cmdSel = Math.min(cmdSel, Math.max(0, cmdItems.length - 1));
    cmdList.textContent = '';
    if (!cmdItems.length) {
      cmdInput.removeAttribute('aria-activedescendant');
      cmdList.append(h('li', { class: 'cmdk-empty', text: t('cmd.empty') }));
      return;
    }
    let group = null;
    cmdItems.forEach((c, i) => {
      if (c.group !== group) { group = c.group; cmdList.append(h('li', { class: 'cmdk-group', role: 'presentation', text: group })); }
      const item = h('li', { class: 'cmdk-item', role: 'option', id: 'cmd-' + i, 'aria-selected': String(i === cmdSel) },
        h('span', { text: c.label }), h('span', { class: 'hint', text: c.hint }));
      item.addEventListener('mousemove', () => { if (cmdSel !== i) { cmdSel = i; paintSel(); } });
      item.addEventListener('click', () => runCmd(i));
      cmdList.append(item);
    });
    cmdInput.setAttribute('aria-activedescendant', 'cmd-' + cmdSel);
  }
  function paintSel() {
    $$('.cmdk-item', cmdList).forEach((el) => el.setAttribute('aria-selected', String(el.id === 'cmd-' + cmdSel)));
    cmdInput.setAttribute('aria-activedescendant', 'cmd-' + cmdSel);
    const cur = document.getElementById('cmd-' + cmdSel);
    if (cur) cur.scrollIntoView({ block: 'nearest' });
  }
  function runCmd(i) {
    const c = cmdItems[i];
    if (!c) return;
    closeCmd();
    c.run();
  }
  function openCmd() {
    lastFocus = document.activeElement;
    cmdk.hidden = false;
    cmdInput.value = '';
    cmdSel = 0;
    renderCmd();
    cmdInput.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeCmd() {
    cmdk.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $('#cmdOpen').addEventListener('click', openCmd);
  cmdk.addEventListener('click', (e) => { if (e.target.hasAttribute('data-close')) closeCmd(); });
  cmdInput.addEventListener('input', () => { cmdSel = 0; renderCmd(); });
  cmdInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); cmdSel = (cmdSel + 1) % Math.max(1, cmdItems.length); paintSel(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); cmdSel = (cmdSel - 1 + cmdItems.length) % Math.max(1, cmdItems.length); paintSel(); }
    else if (e.key === 'Enter') { e.preventDefault(); runCmd(cmdSel); }
    else if (e.key === 'Escape') { e.preventDefault(); closeCmd(); }
    else if (e.key === 'Tab') { e.preventDefault(); }
  });
  document.addEventListener('keydown', (e) => {
    const typing = /INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || '');
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); cmdk.hidden ? openCmd() : closeCmd(); }
    else if (e.key === '/' && !typing && cmdk.hidden) { e.preventDefault(); openCmd(); }
  });

  /* ------------------------------------------------------------------
     Live data (best effort; static values remain if offline / rate-limited)
     ------------------------------------------------------------------ */
  async function loadNpm() {
    const pkgs = S.repos.filter((r) => r.npm).map((r) => r.npm);
    const cached = session.get('npm-dl');
    let byPkg = cached && Date.now() - cached.ts < 36e5 ? cached.data : null;
    if (!byPkg) {
      const res = await Promise.all(pkgs.map((p) =>
        fetch(`https://api.npmjs.org/downloads/point/last-year/${p}`).then((r) => (r.ok ? r.json() : null)).catch(() => null)));
      byPkg = {};
      res.forEach((r, i) => { if (r && typeof r.downloads === 'number') byPkg[pkgs[i]] = r.downloads; });
      if (Object.keys(byPkg).length) session.set('npm-dl', { ts: Date.now(), data: byPkg });
    }
    const sum = Object.values(byPkg).reduce((a, b) => a + b, 0);
    if (!sum) return;
    live.npmByPkg = byPkg;
    renderRepos();
  }

  async function loadStars() {
    const cached = session.get('gh-stars');
    let map = cached && Date.now() - cached.ts < 36e5 ? cached.data : null;
    if (!map) {
      const urls = ['https://api.github.com/users/jhlee0619/repos?per_page=100', 'https://api.github.com/orgs/snuh-rad-aicon/repos?per_page=100'];
      const res = await Promise.all(urls.map((u) => fetch(u).then((r) => (r.ok ? r.json() : [])).catch(() => [])));
      map = {};
      res.flat().forEach((r) => { if (r && r.full_name) map[r.full_name.toLowerCase()] = r.stargazers_count; });
      if (Object.keys(map).length) session.set('gh-stars', { ts: Date.now(), data: map });
    }
    if (!Object.keys(map).length) return;
    live.stars = map;
    renderRepos();
  }

  /* ------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------ */
  function renderAll() {
    renderCaps();
    renderRepos();
    renderPubFilters();
    renderPubs();
    renderAwards();
    renderTimeline();
    renderStack();
  }

  applyI18n();
  renderAll();
  $$('.reveal').forEach((n) => { if (!n.classList.contains('in')) reveal(n); });
  firstRender = false;
  $('#year').textContent = new Date().getFullYear();
  onScroll();

  let resizeTimer = 0;
  let lastW = window.innerWidth;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      updateTimeline();
    }, 150);
  });

  // Fetch live counters after first paint.
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 600));
  idle(() => { loadNpm(); loadStars(); });
})();
